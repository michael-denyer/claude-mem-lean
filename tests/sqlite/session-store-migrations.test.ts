import { describe, it, expect, afterEach } from 'bun:test';
import { Database } from 'bun:sqlite';
import { SessionStore } from '../../src/services/sqlite/SessionStore.js';
import { SessionSearch } from '../../src/services/sqlite/SessionSearch.js';
import { SQLITE_BUSY_TIMEOUT_MS, SQLITE_JOURNAL_SIZE_LIMIT_BYTES } from '../../src/services/sqlite/connection.js';
import { queryObservationsMulti } from '../../src/services/context/ObservationCompiler.js';
import type { ContextConfig } from '../../src/services/context/types.js';

function seedLegacyContentHashScenario(db: Database): void {
  db.run(`
    CREATE TABLE IF NOT EXISTS schema_versions (
      id INTEGER PRIMARY KEY,
      version INTEGER UNIQUE NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sdk_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT UNIQUE NOT NULL,
      memory_session_id TEXT UNIQUE,
      project TEXT NOT NULL,
      platform_source TEXT NOT NULL DEFAULT 'claude',
      user_prompt TEXT,
      started_at TEXT NOT NULL,
      started_at_epoch INTEGER NOT NULL,
      completed_at TEXT,
      completed_at_epoch INTEGER,
      status TEXT CHECK(status IN ('active', 'completed', 'failed')) NOT NULL DEFAULT 'active'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      text TEXT,
      type TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      facts TEXT,
      narrative TEXT,
      concepts TEXT,
      files_read TEXT,
      files_modified TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      content_hash TEXT,
      FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE
    )
  `);

  const now = new Date().toISOString();
  const epoch = Date.now();
  db.prepare(`
    INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
    VALUES (?, ?, ?, ?, ?, 'active')
  `).run('content-a', 'session-a', 'legacy-project', now, epoch);
  db.prepare(`
    INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
    VALUES (?, ?, ?, ?, ?, 'active')
  `).run('content-b', 'session-b', 'legacy-project', now, epoch + 1);

  db.prepare('INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)').run(22, now);

  const insertObs = db.prepare(`
    INSERT INTO observations (memory_session_id, project, type, created_at, created_at_epoch, content_hash)
    VALUES (?, ?, 'discovery', ?, ?, ?)
  `);
  insertObs.run('session-a', 'legacy-project', now, epoch, null);
  insertObs.run('session-a', 'legacy-project', now, epoch + 1, null);
  insertObs.run('session-a', 'legacy-project', now, epoch + 2, null);
  insertObs.run('session-b', 'legacy-project', now, epoch + 3, null);
  insertObs.run('session-b', 'legacy-project', now, epoch + 4, null);
  insertObs.run('session-a', 'legacy-project', now, epoch + 5, 'non-null-duplicate');
  insertObs.run('session-a', 'legacy-project', now, epoch + 6, 'non-null-duplicate');
}

function getIndexColumns(db: Database, indexName: string): string[] {
  return (db.query(`PRAGMA index_info(${JSON.stringify(indexName)})`).all() as Array<{ name: string }>).map(col => col.name);
}

function hasUniqueIndexOnColumns(db: Database, table: string, columns: string[]): boolean {
  const indexes = db.query(`PRAGMA index_list(${table})`).all() as Array<{ name: string; unique: number }>;
  return indexes.some(index => {
    if (index.unique !== 1) return false;
    const indexColumns = getIndexColumns(db, index.name);
    return indexColumns.length === columns.length
      && indexColumns.every((column, i) => column === columns[i]);
  });
}

const SYNC_TABLES = [
  'sync_outbox',
  'sync_content_outbox',
  'sync_entity_heads',
  'sync_dead_letter',
  'sync_pull_quarantine',
  'sync_launch_exclusions',
  'sync_state',
];
const SYNC_COLUMNS = ['synced_at', 'origin_device_id', 'origin_local_id', 'sync_rev'];
const SYNCED_TABLES = ['observations', 'session_summaries', 'user_prompts'];

/** Recreate the schema the removed cloud sync migrations (v39–v48) left on disk. */
function addLegacySyncSchema(db: Database): void {
  for (const table of SYNCED_TABLES) {
    db.run(`ALTER TABLE ${table} ADD COLUMN synced_at INTEGER`);
    db.run(`ALTER TABLE ${table} ADD COLUMN origin_device_id TEXT`);
    db.run(`ALTER TABLE ${table} ADD COLUMN origin_local_id TEXT`);
    db.run(`ALTER TABLE ${table} ADD COLUMN sync_rev TEXT NOT NULL DEFAULT '1'`);
    db.run(`CREATE INDEX idx_${table}_unsynced ON ${table}(id) WHERE synced_at IS NULL`);
    db.run(`CREATE UNIQUE INDEX ux_${table}_origin ON ${table}(origin_device_id, origin_local_id) WHERE origin_device_id IS NOT NULL`);
  }
  db.run('CREATE TABLE sync_state (k TEXT PRIMARY KEY, v TEXT)');
  db.run(`CREATE TABLE sync_outbox (id INTEGER PRIMARY KEY AUTOINCREMENT, op_uuid TEXT NOT NULL UNIQUE,
    rev TEXT NOT NULL DEFAULT '1', body TEXT NOT NULL, canonical_body TEXT, operation_sha256 TEXT,
    created_at_epoch INTEGER NOT NULL)`);
  db.run(`CREATE TABLE sync_entity_heads (entity_id TEXT PRIMARY KEY, kind TEXT NOT NULL,
    origin_device_id TEXT NOT NULL, origin_local_id TEXT NOT NULL, entity_rev TEXT NOT NULL,
    operation_sha256 TEXT NOT NULL, deleted INTEGER NOT NULL, updated_at_epoch INTEGER NOT NULL)`);
  db.run(`CREATE TABLE sync_content_outbox (id INTEGER PRIMARY KEY AUTOINCREMENT, entity_id TEXT NOT NULL,
    kind TEXT NOT NULL, origin_local_id TEXT NOT NULL, entity_rev TEXT NOT NULL, body TEXT NOT NULL,
    operation_sha256 TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0, created_at_epoch INTEGER NOT NULL,
    UNIQUE(entity_id, entity_rev))`);
  db.run(`CREATE TABLE sync_dead_letter (id INTEGER PRIMARY KEY AUTOINCREMENT, lane TEXT NOT NULL,
    queue_key TEXT NOT NULL, kind TEXT, origin_local_id TEXT, entity_rev TEXT, reason TEXT NOT NULL,
    raw_body TEXT, created_at_epoch INTEGER NOT NULL, UNIQUE(lane, queue_key, entity_rev, reason))`);
  db.run(`CREATE TABLE sync_pull_quarantine (id INTEGER PRIMARY KEY AUTOINCREMENT, epoch TEXT NOT NULL,
    seq TEXT NOT NULL, kind TEXT, entity_id TEXT, origin_device_id TEXT, origin_local_id TEXT,
    entity_rev TEXT, operation_sha256 TEXT, reason TEXT NOT NULL, raw_body TEXT NOT NULL,
    retryable INTEGER NOT NULL DEFAULT 0, created_at_epoch INTEGER NOT NULL, UNIQUE(epoch, seq))`);
  db.run(`CREATE TABLE sync_launch_exclusions (kind TEXT NOT NULL, origin_local_id TEXT NOT NULL,
    through_rev TEXT NOT NULL, PRIMARY KEY (kind, origin_local_id))`);

  db.run("INSERT INTO sync_state (k, v) VALUES ('cursor', '42')");
  db.run("INSERT INTO sync_outbox (op_uuid, body, created_at_epoch) VALUES ('op-1', '{}', 1)");
  db.run(`INSERT INTO sync_entity_heads VALUES ('entity-1', 'observation', 'dev-1', '1', '1', 'sha', 0, 1)`);
  db.run(`INSERT INTO sync_content_outbox (entity_id, kind, origin_local_id, entity_rev, body, operation_sha256, created_at_epoch)
    VALUES ('entity-2', 'prompt', '1', '1', '{}', 'sha', 1)`);
  db.run(`INSERT INTO sync_dead_letter (lane, queue_key, reason, created_at_epoch) VALUES ('content', 'q', 'too big', 1)`);
  db.run(`INSERT INTO sync_pull_quarantine (epoch, seq, reason, raw_body, created_at_epoch) VALUES ('e', '1', 'bad', '{}', 1)`);
  db.run(`INSERT INTO sync_launch_exclusions VALUES ('observation', '1', '1')`);
}

function columnNames(db: Database, table: string): string[] {
  return (db.query(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(column => column.name);
}

function insertSchemaVersions(db: Database, throughVersion: number): void {
  const now = new Date().toISOString();
  for (let version = 4; version <= throughVersion; version++) {
    db.prepare('INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)').run(version, now);
  }
}

function seedHistoricalSdkSchema(
  db: Database,
  throughVersion: number,
  options: { customTitle?: boolean; platformSource?: boolean; deadPendingColumns?: boolean } = {},
): void {
  const now = new Date().toISOString();
  const epoch = Date.now();

  db.run(`
    CREATE TABLE schema_versions (
      id INTEGER PRIMARY KEY,
      version INTEGER UNIQUE NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE sdk_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT UNIQUE NOT NULL,
      memory_session_id TEXT UNIQUE,
      project TEXT NOT NULL,
      ${options.platformSource ? "platform_source TEXT NOT NULL DEFAULT 'claude'," : ''}
      user_prompt TEXT,
      started_at TEXT NOT NULL,
      started_at_epoch INTEGER NOT NULL,
      completed_at TEXT,
      completed_at_epoch INTEGER,
      status TEXT CHECK(status IN ('active', 'completed', 'failed')) NOT NULL DEFAULT 'active',
      worker_port INTEGER,
      prompt_counter INTEGER DEFAULT 0
      ${options.customTitle ? ', custom_title TEXT' : ''}
    )
  `);

  db.run(`
    CREATE TABLE observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      text TEXT,
      type TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      facts TEXT,
      narrative TEXT,
      concepts TEXT,
      files_read TEXT,
      files_modified TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER DEFAULT 0,
      content_hash TEXT,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE session_summaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      request TEXT,
      investigated TEXT,
      learned TEXT,
      completed TEXT,
      next_steps TEXT,
      files_read TEXT,
      files_edited TEXT,
      notes TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE
    )
  `);

  if (throughVersion >= 10) {
    db.run(`
      CREATE TABLE user_prompts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_session_id TEXT NOT NULL,
        prompt_number INTEGER NOT NULL,
        prompt_text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        created_at_epoch INTEGER NOT NULL,
        FOREIGN KEY(content_session_id) REFERENCES sdk_sessions(content_session_id) ON DELETE CASCADE
      )
    `);
  }

  if (throughVersion >= 16) {
    db.run(`
      CREATE TABLE pending_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_db_id INTEGER NOT NULL,
        content_session_id TEXT NOT NULL,
        message_type TEXT NOT NULL CHECK(message_type IN ('observation', 'summarize')),
        tool_name TEXT,
        tool_input TEXT,
        tool_response TEXT,
        cwd TEXT,
        last_user_message TEXT,
        last_assistant_message TEXT,
        prompt_number INTEGER,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing')),
        created_at_epoch INTEGER NOT NULL
        ${options.deadPendingColumns ? ', retry_count INTEGER DEFAULT 0, failed_at_epoch INTEGER, completed_at_epoch INTEGER' : ''},
        FOREIGN KEY (session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
      )
    `);
  }

  insertSchemaVersions(db, throughVersion);

  db.prepare(`
    INSERT INTO sdk_sessions (
      id, content_session_id, memory_session_id, project,
      ${options.platformSource ? 'platform_source,' : ''}
      user_prompt, started_at, started_at_epoch, status
    ) VALUES (?, ?, ?, ?, ${options.platformSource ? '?, ' : ''}?, ?, ?, 'active')
  `).run(
    7,
    'historical-content',
    'historical-memory',
    'historical-project',
    ...(options.platformSource ? [''] : []),
    'historical prompt',
    now,
    epoch,
  );

  db.prepare(`
    INSERT INTO observations (
      memory_session_id, project, text, type, content_hash, created_at, created_at_epoch
    ) VALUES (?, ?, ?, 'discovery', ?, ?, ?)
  `).run('historical-memory', 'historical-project', 'historical observation', 'historical-hash', now, epoch + 1);

  if (throughVersion >= 10) {
    db.prepare(`
      INSERT INTO user_prompts (content_session_id, prompt_number, prompt_text, created_at, created_at_epoch)
      VALUES (?, 1, ?, ?, ?)
    `).run('historical-content', 'historical user prompt', now, epoch + 2);
  }

  if (throughVersion >= 16) {
    db.prepare(`
      INSERT INTO pending_messages (
        session_db_id, content_session_id, message_type, status, created_at_epoch
      ) VALUES (?, ?, 'observation', 'pending', ?)
    `).run(7, 'historical-content', epoch + 3);
  }
}

function seedLegacyGlobalContentIdentityScenario(db: Database): void {
  const now = new Date().toISOString();
  const epoch = Date.now();

  db.run(`
    CREATE TABLE schema_versions (
      id INTEGER PRIMARY KEY,
      version INTEGER UNIQUE NOT NULL,
      applied_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE sdk_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT UNIQUE NOT NULL,
      memory_session_id TEXT UNIQUE,
      project TEXT NOT NULL,
      platform_source TEXT NOT NULL DEFAULT 'claude',
      user_prompt TEXT,
      started_at TEXT NOT NULL,
      started_at_epoch INTEGER NOT NULL,
      completed_at TEXT,
      completed_at_epoch INTEGER,
      status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'completed', 'failed')),
      worker_port INTEGER,
      prompt_counter INTEGER DEFAULT 0,
      custom_title TEXT
    )
  `);

  db.run(`
    CREATE TABLE observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      text TEXT,
      type TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      facts TEXT,
      narrative TEXT,
      concepts TEXT,
      files_read TEXT,
      files_modified TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER DEFAULT 0,
      content_hash TEXT,
      agent_type TEXT,
      agent_id TEXT,
      merged_into_project TEXT,
      generated_by_model TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE session_summaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      request TEXT,
      investigated TEXT,
      learned TEXT,
      completed TEXT,
      next_steps TEXT,
      files_read TEXT,
      files_edited TEXT,
      notes TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER DEFAULT 0,
      merged_into_project TEXT,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      FOREIGN KEY(memory_session_id) REFERENCES sdk_sessions(memory_session_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE user_prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT NOT NULL,
      prompt_number INTEGER NOT NULL,
      prompt_text TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL,
      FOREIGN KEY(content_session_id) REFERENCES sdk_sessions(content_session_id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE pending_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_db_id INTEGER NOT NULL,
      content_session_id TEXT NOT NULL,
      tool_use_id TEXT,
      message_type TEXT NOT NULL CHECK(message_type IN ('observation', 'summarize')),
      tool_name TEXT,
      tool_input TEXT,
      tool_response TEXT,
      cwd TEXT,
      last_user_message TEXT,
      last_assistant_message TEXT,
      prompt_number INTEGER,
      status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing')),
      created_at_epoch INTEGER NOT NULL,
      agent_type TEXT,
      agent_id TEXT,
      FOREIGN KEY (session_db_id) REFERENCES sdk_sessions(id) ON DELETE CASCADE
    )
  `);
  db.run(`
    CREATE UNIQUE INDEX ux_pending_session_tool
    ON pending_messages(content_session_id, tool_use_id)
    WHERE tool_use_id IS NOT NULL
  `);

  for (let version = 4; version <= 32; version++) {
    db.prepare('INSERT INTO schema_versions (version, applied_at) VALUES (?, ?)').run(version, now);
  }

  db.prepare(`
    INSERT INTO sdk_sessions (
      id, content_session_id, memory_session_id, project, platform_source,
      user_prompt, started_at, started_at_epoch, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')
  `).run(101, 'shared-raw-id', 'memory-legacy', 'legacy-project', '', 'legacy prompt', now, epoch);

  db.prepare(`
    INSERT INTO observations (
      memory_session_id, project, text, type, title, narrative,
      content_hash, created_at, created_at_epoch
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run('memory-legacy', 'legacy-project', null, 'discovery', 'legacy observation', 'kept', 'legacy-hash', now, epoch + 1);

  db.prepare(`
    INSERT INTO session_summaries (
      memory_session_id, project, request, completed, created_at, created_at_epoch
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).run('memory-legacy', 'legacy-project', 'legacy request', 'done', now, epoch + 2);

  db.prepare(`
    INSERT INTO user_prompts (
      content_session_id, prompt_number, prompt_text, created_at, created_at_epoch
    ) VALUES (?, ?, ?, ?, ?)
  `).run('shared-raw-id', 1, 'legacy user prompt', now, epoch + 3);

  db.prepare(`
    INSERT INTO pending_messages (
      session_db_id, content_session_id, tool_use_id, message_type,
      tool_name, status, created_at_epoch
    ) VALUES (?, ?, ?, 'observation', 'Read', 'pending', ?)
  `).run(101, 'shared-raw-id', 'tool-1', epoch + 4);
}

describe('SessionStore migrations', () => {
  let store: SessionStore | undefined;

  afterEach(() => {
    store?.close();
    store = undefined;
  });

  it('preserves legacy NULL content_hash rows, dedupes non-NULL duplicates, and creates the UNIQUE index (v29)', () => {
    const db = new Database(':memory:');
    try {
      seedLegacyContentHashScenario(db);
      new SessionStore(db);

      const totals = db.prepare('SELECT COUNT(*) as count FROM observations').get() as { count: number };
      expect(totals.count).toBe(6);

      const remainingNulls = db.prepare('SELECT COUNT(*) as count FROM observations WHERE content_hash IS NULL').get() as { count: number };
      expect(remainingNulls.count).toBe(0);

      const sessionANulls = db.prepare(`
        SELECT COUNT(*) as count FROM observations
         WHERE memory_session_id = 'session-a' AND content_hash GLOB '__null_migration_*__'
      `).get() as { count: number };
      expect(sessionANulls.count).toBe(3);

      const sessionBNulls = db.prepare(`
        SELECT COUNT(*) as count FROM observations
         WHERE memory_session_id = 'session-b' AND content_hash GLOB '__null_migration_*__'
      `).get() as { count: number };
      expect(sessionBNulls.count).toBe(2);

      const duplicateHashRows = db.prepare(`
        SELECT COUNT(*) as count FROM observations
         WHERE memory_session_id = 'session-a' AND content_hash = 'non-null-duplicate'
      `).get() as { count: number };
      expect(duplicateHashRows.count).toBe(1);

      const index = db.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'index' AND name = 'ux_observations_session_hash'
      `).get() as { name: string } | undefined;
      expect(index?.name).toBe('ux_observations_session_hash');
    } finally {
      db.close();
    }
  });

  it('is idempotent: constructing twice over the same db does not throw and leaves data unchanged', () => {
    const db = new Database(':memory:');
    try {
      new SessionStore(db);
      const first = new SessionStore(db);
      first.createSDKSession('content-idem', 'project', 'prompt');

      const versionsBefore = db.prepare('SELECT COUNT(*) as n FROM schema_versions').get() as { n: number };

      expect(() => new SessionStore(db)).not.toThrow();

      const versionsAfter = db.prepare('SELECT COUNT(*) as n FROM schema_versions').get() as { n: number };
      const sessions = db.prepare('SELECT COUNT(*) as n FROM sdk_sessions').get() as { n: number };

      expect(versionsAfter.n).toBe(versionsBefore.n);
      expect(sessions.n).toBe(1);
    } finally {
      db.close();
    }
  });

  it('v66 drops the cloud sync tables, indexes and columns from an old database, keeping every row', () => {
    const db = new Database(':memory:');
    try {
      new SessionStore(db);
      addLegacySyncSchema(db);
      db.run('DELETE FROM schema_versions WHERE version = 66');

      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
        VALUES ('content-v66', 'mem-v66', 'proj-v66', ?, 1751234567000, 'active')
      `).run(now);
      const insertObservation = db.prepare(`
        INSERT INTO observations
          (memory_session_id, project, type, title, created_at, created_at_epoch, synced_at, origin_device_id, origin_local_id, sync_rev)
        VALUES ('mem-v66', 'proj-v66', 'discovery', ?, ?, 1751234567001, ?, ?, ?, ?)
      `);
      insertObservation.run('native', now, 123, null, null, '3');
      insertObservation.run('replica', now, 456, 'other-device', '77', '5');
      db.prepare(`
        INSERT INTO session_summaries
          (memory_session_id, project, request, created_at, created_at_epoch, synced_at, origin_device_id, origin_local_id, sync_rev)
        VALUES ('mem-v66', 'proj-v66', 'replica summary', ?, 1751234567002, 789, 'other-device', '78', '2')
      `).run(now);
      db.prepare(`
        INSERT INTO user_prompts
          (session_db_id, content_session_id, prompt_number, prompt_text, created_at, created_at_epoch, synced_at, sync_rev)
        VALUES (1, 'content-v66', 1, 'native prompt', ?, 1751234567003, -1, '4')
      `).run(now);

      new SessionStore(db);

      expect(db.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'table' AND name IN (${SYNC_TABLES.map(() => '?').join(', ')})
      `).all(...SYNC_TABLES)).toEqual([]);
      for (const table of SYNCED_TABLES) {
        for (const column of SYNC_COLUMNS) expect(columnNames(db, table)).not.toContain(column);
        expect(db.prepare(`SELECT name FROM sqlite_master WHERE type = 'index' AND name IN (?, ?)`)
          .all(`idx_${table}_unsynced`, `ux_${table}_origin`)).toEqual([]);
      }
      // Rows pulled from another device stay as ordinary local rows.
      expect(db.prepare('SELECT title FROM observations ORDER BY id').all())
        .toEqual([{ title: 'native' }, { title: 'replica' }]);
      expect(db.prepare('SELECT request FROM session_summaries').all()).toEqual([{ request: 'replica summary' }]);
      expect(db.prepare('SELECT prompt_text FROM user_prompts').all()).toEqual([{ prompt_text: 'native prompt' }]);
      expect(db.prepare('SELECT version FROM schema_versions WHERE version = 66').get()).toEqual({ version: 66 });

      const schemaAfterUpgrade = db.prepare('SELECT type, name, sql FROM sqlite_master ORDER BY type, name').all();
      expect(() => new SessionStore(db)).not.toThrow();
      expect(db.prepare('SELECT type, name, sql FROM sqlite_master ORDER BY type, name').all()).toEqual(schemaAfterUpgrade);
    } finally {
      db.close();
    }
  });

  it('fresh-DB init creates the SessionStore core tables', () => {
    store = new SessionStore(':memory:');
    const expected = ['schema_versions', 'sdk_sessions', 'observations', 'session_summaries', 'user_prompts', 'pending_messages'];

    for (const table of expected) {
      const row = store.db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?`).get(table) as { name: string } | undefined;
      expect(row?.name).toBe(table);
    }
  });

  it('applies required SQLite pragmas to injected worker and search connections', () => {
    const db = new Database(':memory:');
    try {
      db.run('PRAGMA busy_timeout = 0');
      db.run('PRAGMA foreign_keys = OFF');

      new SessionStore(db);

      expect((db.query('PRAGMA busy_timeout').get() as { timeout: number }).timeout).toBe(SQLITE_BUSY_TIMEOUT_MS);
      expect((db.query('PRAGMA foreign_keys').get() as { foreign_keys: number }).foreign_keys).toBe(1);
      expect((db.query('PRAGMA synchronous').get() as { synchronous: number }).synchronous).toBe(1);
      expect((db.query('PRAGMA journal_size_limit').get() as { journal_size_limit: number }).journal_size_limit)
        .toBe(SQLITE_JOURNAL_SIZE_LIMIT_BYTES);
      expect((db.query('PRAGMA auto_vacuum').get() as { auto_vacuum: number }).auto_vacuum).toBe(2);

      db.run('PRAGMA busy_timeout = 0');
      db.run('PRAGMA foreign_keys = OFF');
      new SessionSearch(db);

      expect((db.query('PRAGMA busy_timeout').get() as { timeout: number }).timeout).toBe(SQLITE_BUSY_TIMEOUT_MS);
      expect((db.query('PRAGMA foreign_keys').get() as { foreign_keys: number }).foreign_keys).toBe(1);
    } finally {
      db.close();
    }
  });

  it('a fresh observations FK uses ON UPDATE CASCADE and ON DELETE CASCADE', () => {
    store = new SessionStore(':memory:');
    const fks = store.db.query('PRAGMA foreign_key_list(observations)').all() as Array<{ table: string; on_update: string; on_delete: string }>;
    const sessionFk = fks.find(fk => fk.table === 'sdk_sessions');
    expect(sessionFk?.on_update).toBe('CASCADE');
    expect(sessionFk?.on_delete).toBe('CASCADE');
  });

  it('a fresh session_summaries FK uses ON UPDATE CASCADE and ON DELETE CASCADE', () => {
    store = new SessionStore(':memory:');
    const fks = store.db.query('PRAGMA foreign_key_list(session_summaries)').all() as Array<{ table: string; on_update: string; on_delete: string }>;
    const sessionFk = fks.find(fk => fk.table === 'sdk_sessions');
    expect(sessionFk?.on_update).toBe('CASCADE');
    expect(sessionFk?.on_delete).toBe('CASCADE');
  });

  it('fresh DB uses composite sdk session identity and session-scoped prompt/pending indexes', () => {
    store = new SessionStore(':memory:');

    expect(hasUniqueIndexOnColumns(store.db, 'sdk_sessions', ['content_session_id'])).toBe(false);
    expect(hasUniqueIndexOnColumns(store.db, 'sdk_sessions', ['platform_source', 'content_session_id'])).toBe(true);
    expect(hasUniqueIndexOnColumns(store.db, 'pending_messages', ['session_db_id', 'tool_use_id'])).toBe(true);

    const promptCols = new Set((store.db.query('PRAGMA table_info(user_prompts)').all() as Array<{ name: string }>).map(col => col.name));
    expect(promptCols.has('session_db_id')).toBe(true);

    const promptFks = store.db.query('PRAGMA foreign_key_list(user_prompts)').all() as Array<{ table: string; from: string; to: string }>;
    expect(promptFks.some(fk => fk.table === 'sdk_sessions' && fk.from === 'session_db_id' && fk.to === 'id')).toBe(true);
    expect(promptFks.some(fk => fk.table === 'sdk_sessions' && fk.from === 'content_session_id')).toBe(false);
  });

  it('directly upgrades a v23-era schema before platform_source existed', () => {
    const db = new Database(':memory:');
    try {
      seedHistoricalSdkSchema(db, 23, { customTitle: true, platformSource: false });

      new SessionStore(db);

      const sessionCols = new Set((db.query('PRAGMA table_info(sdk_sessions)').all() as Array<{ name: string }>).map(col => col.name));
      expect(sessionCols.has('custom_title')).toBe(true);
      expect(sessionCols.has('platform_source')).toBe(true);

      const session = db.prepare('SELECT platform_source FROM sdk_sessions WHERE id = 7').get() as { platform_source: string };
      expect(session.platform_source).toBe('claude');
      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['platform_source', 'content_session_id'])).toBe(true);
    } finally {
      db.close();
    }
  });

  it('directly upgrades a v24-era schema with old global content-session uniqueness', () => {
    const db = new Database(':memory:');
    try {
      seedHistoricalSdkSchema(db, 24, { customTitle: true, platformSource: true });

      new SessionStore(db);

      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['content_session_id'])).toBe(false);
      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['platform_source', 'content_session_id'])).toBe(true);
      expect((db.prepare('SELECT session_db_id FROM user_prompts WHERE content_session_id = ?').get('historical-content') as { session_db_id: number }).session_db_id).toBe(7);
      expect((db.prepare('SELECT session_db_id FROM pending_messages WHERE content_session_id = ?').get('historical-content') as { session_db_id: number }).session_db_id).toBe(7);
    } finally {
      db.close();
    }
  });

  it('directly upgrades a v31-era schema with dead pending columns and old tool indexes', () => {
    const db = new Database(':memory:');
    try {
      seedHistoricalSdkSchema(db, 31, { customTitle: true, platformSource: true, deadPendingColumns: true });

      new SessionStore(db);

      const pendingCols = new Set((db.query('PRAGMA table_info(pending_messages)').all() as Array<{ name: string }>).map(col => col.name));
      expect(pendingCols.has('retry_count')).toBe(false);
      expect(pendingCols.has('failed_at_epoch')).toBe(false);
      expect(pendingCols.has('completed_at_epoch')).toBe(false);
      expect(pendingCols.has('tool_use_id')).toBe(true);
      expect(hasUniqueIndexOnColumns(db, 'pending_messages', ['session_db_id', 'tool_use_id'])).toBe(true);
    } finally {
      db.close();
    }
  });

  it('repairs missing v35-era invariants even when version rows already exist', () => {
    const db = new Database(':memory:');
    try {
      seedHistoricalSdkSchema(db, 35, { customTitle: false, platformSource: false });

      new SessionStore(db);

      const sessionCols = new Set((db.query('PRAGMA table_info(sdk_sessions)').all() as Array<{ name: string }>).map(col => col.name));
      expect(sessionCols.has('custom_title')).toBe(true);
      expect(sessionCols.has('platform_source')).toBe(true);
      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['platform_source', 'content_session_id'])).toBe(true);
      expect(hasUniqueIndexOnColumns(db, 'pending_messages', ['session_db_id', 'tool_use_id'])).toBe(true);
    } finally {
      db.close();
    }
  });

  it('migrates a single-platform DB without losing observations, summaries, prompts, or pending rows', () => {
    const db = new Database(':memory:');
    try {
      seedLegacyGlobalContentIdentityScenario(db);

      const migrated = new SessionStore(db);

      const legacySession = db.prepare(`
        SELECT id, platform_source
        FROM sdk_sessions
        WHERE content_session_id = 'shared-raw-id' AND platform_source = 'claude'
      `).get() as { id: number; platform_source: string } | undefined;
      expect(legacySession?.id).toBe(101);
      expect(legacySession?.platform_source).toBe('claude');

      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['content_session_id'])).toBe(false);
      expect(hasUniqueIndexOnColumns(db, 'sdk_sessions', ['platform_source', 'content_session_id'])).toBe(true);
      expect(hasUniqueIndexOnColumns(db, 'pending_messages', ['session_db_id', 'tool_use_id'])).toBe(true);

      expect((db.prepare("SELECT COUNT(*) AS n FROM observations WHERE memory_session_id = 'memory-legacy'").get() as { n: number }).n).toBe(1);
      expect((db.prepare("SELECT COUNT(*) AS n FROM session_summaries WHERE memory_session_id = 'memory-legacy'").get() as { n: number }).n).toBe(1);
      expect((db.prepare('SELECT session_db_id FROM user_prompts WHERE content_session_id = ?').get('shared-raw-id') as { session_db_id: number }).session_db_id).toBe(101);
      expect((db.prepare('SELECT session_db_id FROM pending_messages WHERE content_session_id = ?').get('shared-raw-id') as { session_db_id: number }).session_db_id).toBe(101);

      const cursorId = migrated.createSDKSession('shared-raw-id', 'cursor-project', 'cursor prompt', undefined, 'cursor');
      expect(cursorId).not.toBe(101);

      expect(migrated.getPromptNumberFromUserPrompts('shared-raw-id', 101)).toBe(1);
      expect(migrated.getPromptNumberFromUserPrompts('shared-raw-id', cursorId)).toBe(0);

      migrated.saveUserPrompt('shared-raw-id', 1, 'cursor user prompt', cursorId);
      expect(migrated.getPromptNumberFromUserPrompts('shared-raw-id', 101)).toBe(1);
      expect(migrated.getPromptNumberFromUserPrompts('shared-raw-id', cursorId)).toBe(1);

      db.prepare(`
        INSERT INTO pending_messages (
          session_db_id, content_session_id, tool_use_id, message_type, status, created_at_epoch
        ) VALUES (?, ?, ?, 'observation', 'pending', ?)
      `).run(cursorId, 'shared-raw-id', 'tool-1', Date.now());

      expect((db.prepare("SELECT COUNT(*) AS n FROM pending_messages WHERE content_session_id = 'shared-raw-id'").get() as { n: number }).n).toBe(2);
    } finally {
      db.close();
    }
  });

  it('drops the dead pending_messages columns (retry_count / failed_at_epoch / completed_at_epoch / worker_pid) on a legacy db', () => {
    const db = new Database(':memory:');
    try {
      db.run(`
        CREATE TABLE schema_versions (id INTEGER PRIMARY KEY, version INTEGER UNIQUE NOT NULL, applied_at TEXT NOT NULL)
      `);
      db.run(`
        CREATE TABLE pending_messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_db_id INTEGER NOT NULL,
          content_session_id TEXT NOT NULL,
          message_type TEXT NOT NULL,
          status TEXT NOT NULL,
          created_at_epoch INTEGER NOT NULL,
          retry_count INTEGER DEFAULT 0,
          failed_at_epoch INTEGER,
          completed_at_epoch INTEGER,
          worker_pid INTEGER
        )
      `);

      new SessionStore(db);

      const cols = new Set((db.query('PRAGMA table_info(pending_messages)').all() as Array<{ name: string }>).map(c => c.name));
      expect(cols.has('retry_count')).toBe(false);
      expect(cols.has('failed_at_epoch')).toBe(false);
      expect(cols.has('completed_at_epoch')).toBe(false);
      expect(cols.has('worker_pid')).toBe(false);
    } finally {
      db.close();
    }
  });

  it('v49 truncates prefixed concept tags so the injection query matches them again (#3379)', () => {
    const db = new Database(':memory:');
    try {
      new SessionStore(db);

      db.prepare(`
        INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
        VALUES ('content-v49', 'mem-v49', 'proj-v49', ?, 1751234567000, 'active')
      `).run(new Date().toISOString());
      const insertObs = db.prepare(`
        INSERT INTO observations (memory_session_id, project, type, title, concepts, created_at, created_at_epoch)
        VALUES ('mem-v49', 'proj-v49', 'discovery', ?, ?, ?, ?)
      `);
      const now = new Date().toISOString();
      insertObs.run('MIXED_CONCEPTS', '["how-it-works","gotcha: x"]', now, 1_700_000_000_000);
      insertObs.run('CLEAN_CONCEPTS', '["pattern"]', now, 1_700_000_001_000);

      // The fresh DB is already at v49; rewind it so the constructor re-runs
      // the backfill over the rows above (which mimic pre-v49 data).
      db.run('DELETE FROM schema_versions WHERE version = 49');
      const migrated = new SessionStore(db);

      const mixed = db.prepare("SELECT concepts FROM observations WHERE title = 'MIXED_CONCEPTS'").get() as { concepts: string };
      expect(mixed.concepts).toBe('["how-it-works","gotcha"]');

      // Rows without a ':' are untouched byte-for-byte (WHERE clause skip).
      const clean = db.prepare("SELECT concepts FROM observations WHERE title = 'CLEAN_CONCEPTS'").get() as { concepts: string };
      expect(clean.concepts).toBe('["pattern"]');

      // The healed row is now returned by the exact-match injection query.
      const config: ContextConfig = {
        totalObservationCount: 20,
        fullObservationCount: 3,
        sessionCount: 20,
        showReadTokens: true,
        showWorkTokens: true,
        observationTypes: new Set(['discovery']),
        observationConcepts: new Set(['gotcha']),
        fullObservationField: 'narrative',
        showLastSummary: true,
        showLastMessage: false,
        mainAgentOnly: true,
      };
      const injected = queryObservationsMulti(migrated, ['proj-v49'], config);
      expect(injected.map(obs => obs.title)).toEqual(['MIXED_CONCEPTS']);
    } finally {
      db.close();
    }
  });

  it('v49 is idempotent: once recorded, a second construction leaves concepts untouched', () => {
    const db = new Database(':memory:');
    try {
      new SessionStore(db);

      db.prepare(`
        INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
        VALUES ('content-v49-idem', 'mem-v49-idem', 'proj-v49-idem', ?, 1751234567000, 'active')
      `).run(new Date().toISOString());
      // Inserted AFTER v49 was recorded — the version gate must make the
      // second construction a no-op, so this row stays exactly as written.
      db.prepare(`
        INSERT INTO observations (memory_session_id, project, type, title, concepts, created_at, created_at_epoch)
        VALUES ('mem-v49-idem', 'proj-v49-idem', 'discovery', 'POST_V49_ROW', '["gotcha: x"]', ?, ?)
      `).run(new Date().toISOString(), 1_700_000_000_000);

      const versionsBefore = (db.prepare('SELECT COUNT(*) AS n FROM schema_versions').get() as { n: number }).n;
      new SessionStore(db);
      const versionsAfter = (db.prepare('SELECT COUNT(*) AS n FROM schema_versions').get() as { n: number }).n;
      expect(versionsAfter).toBe(versionsBefore);

      const row = db.prepare("SELECT concepts FROM observations WHERE title = 'POST_V49_ROW'").get() as { concepts: string };
      expect(row.concepts).toBe('["gotcha: x"]');
    } finally {
      db.close();
    }
  });

  it('v49 normalizes prefixed concept tags and skips invalid JSON', () => {
    const db = new Database(':memory:');
    try {
      new SessionStore(db);

      db.prepare(`
        INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at, started_at_epoch, status)
        VALUES ('content-v49', 'mem-v49', 'proj-v49', ?, 1751234567000, 'active')
      `).run(new Date().toISOString());
      const now = new Date().toISOString();
      const insertObs = db.prepare(`
        INSERT INTO observations (memory_session_id, project, type, title, concepts, created_at, created_at_epoch)
        VALUES ('mem-v49', 'proj-v49', 'discovery', ?, ?, ?, ?)
      `);
      insertObs.run('CHANGED', '["gotcha: x"]', now, 1_700_000_000_000);
      insertObs.run('CLEAN', '["pattern"]', now, 1_700_000_002_000);
      // Non-JSON concepts text containing a colon: json_each would throw —
      // the json_valid guard must skip it so the migration (and worker boot)
      // completes, leaving the row byte-identical.
      insertObs.run('INVALID_JSON', 'gotcha: not json', now, 1_700_000_003_000);

      db.run('DELETE FROM schema_versions WHERE version = 49');
      new SessionStore(db);

      const v49 = db.prepare('SELECT version FROM schema_versions WHERE version = 49').get() as { version: number } | undefined;
      expect(v49?.version).toBe(49);

      const concepts = (title: string) =>
        (db.prepare('SELECT concepts FROM observations WHERE title = ?').get(title) as { concepts: string }).concepts;
      expect(concepts('CHANGED')).toBe('["gotcha"]');
      expect(concepts('CLEAN')).toBe('["pattern"]');
      expect(concepts('INVALID_JSON')).toBe('gotcha: not json');
    } finally {
      db.close();
    }
  });
});

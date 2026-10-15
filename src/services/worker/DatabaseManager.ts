
import { Database } from 'bun:sqlite';
import { SessionStore } from '../sqlite/SessionStore.js';
import { SessionSearch } from '../sqlite/SessionSearch.js';
import { openGuardedSqliteDatabase } from '../sqlite/connection.js';
import { ChromaSync } from '../sync/ChromaSync.js';
import { SettingsDefaultsManager } from '../../shared/SettingsDefaultsManager.js';
import { USER_SETTINGS_PATH, DB_PATH } from '../../shared/paths.js';
import { logger } from '../../utils/logger.js';
import { purgeUndrainableSyncOutbox } from '../sync/outbox-purge.js';
import { purgeLinkedToolUses, resolveToolUsesRetentionDays } from '../sqlite/tool-uses.js';
import type { DBSession } from '../worker-types.js';

export class DatabaseManager {
  private db: Database | null = null;
  private sessionStore: SessionStore | null = null;
  private sessionSearch: SessionSearch | null = null;
  private chromaSync: ChromaSync | null = null;

  async initialize(): Promise<void> {
    // Guard before pragmas: journal_mode = WAL persistently rewrites the file,
    // so a database whose schema is newer than this binary's chain must be
    // refused before the shared open touches it (#3609 step 2).
    this.db = openGuardedSqliteDatabase(DB_PATH);

    const settings = SettingsDefaultsManager.loadFromFile(USER_SETTINGS_PATH);

    this.sessionStore = new SessionStore(this.db);
    this.sessionSearch = new SessionSearch(this.db);

    const chromaEnabled = settings.CLAUDE_MEM_CHROMA_ENABLED !== 'false';
    if (chromaEnabled) {
      this.chromaSync = new ChromaSync('claude-mem');
    } else {
      logger.info('DB', 'Chroma disabled via CLAUDE_MEM_CHROMA_ENABLED=false, using SQLite-only search');
    }

    // Ops queued while cloud sync existed can never upload now (#4228).
    purgeUndrainableSyncOutbox(this.db);

    purgeLinkedToolUses(this.db, resolveToolUsesRetentionDays(settings.CLAUDE_MEM_TOOL_USES_RETENTION_DAYS));

    logger.info('DB', 'Database initialized (shared connection)');
  }

  async close(): Promise<void> {
    this.chromaSync = null;

    this.sessionStore = null;
    this.sessionSearch = null;

    if (this.db) {
      this.db.close();
      this.db = null;
    }
    logger.info('DB', 'Database closed');
  }

  getSessionStore(): SessionStore {
    if (!this.sessionStore) {
      throw new Error('Database not initialized');
    }
    return this.sessionStore;
  }

  getSessionSearch(): SessionSearch {
    if (!this.sessionSearch) {
      throw new Error('Database not initialized');
    }
    return this.sessionSearch;
  }

  getChromaSync(): ChromaSync | null {
    return this.chromaSync;
  }

  getConnection(): Database {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  getSessionById(sessionDbId: number): {
    id: number;
    content_session_id: string;
    memory_session_id: string | null;
    project: string;
    platform_source: string;
    user_prompt: string;
    custom_title: string | null;
    status: string;
    observed_model: string | null;
    observed_billing: string | null;
  } {
    const session = this.getSessionStore().getSessionById(sessionDbId);
    if (!session) {
      throw new Error(`Session ${sessionDbId} not found`);
    }
    return session;
  }

}

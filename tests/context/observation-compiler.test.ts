import { describe, it, expect } from 'bun:test';
import { Database } from 'bun:sqlite';
import { SessionStore } from '../../src/services/sqlite/SessionStore.js';
import {
  buildTimeline,
  countObservationsByProjects,
  dedupeObservationsByTitle,
  queryObservationsMulti,
  queryObservationsNewest,
  querySummariesMulti,
} from '../../src/services/context/ObservationCompiler.js';
import type { ContextConfig, Observation, SummaryTimelineItem } from '../../src/services/context/types.js';

function createTestObservation(overrides: Partial<Observation> = {}): Observation {
  return {
    id: 1,
    memory_session_id: 'session-123',
    type: 'discovery',
    title: 'Test Observation',
    subtitle: null,
    narrative: 'A test narrative',
    facts: '["fact1"]',
    concepts: '["concept1"]',
    files_read: null,
    files_modified: null,
    discovery_tokens: 100,
    created_at: '2025-01-01T12:00:00.000Z',
    created_at_epoch: 1735732800000,
    ...overrides,
  };
}

function createTestSummaryTimelineItem(overrides: Partial<SummaryTimelineItem> = {}): SummaryTimelineItem {
  return {
    id: 1,
    memory_session_id: 'session-123',
    request: 'Test Request',
    investigated: 'Investigated things',
    learned: 'Learned things',
    completed: 'Completed things',
    next_steps: 'Next steps',
    created_at: '2025-01-01T12:00:00.000Z',
    created_at_epoch: 1735732800000,
    displayEpoch: 1735732800000,
    displayTime: '2025-01-01T12:00:00.000Z',
    shouldShowLink: false,
    ...overrides,
  };
}

describe('buildTimeline', () => {
    it('should combine observations and summaries into timeline', () => {
      const observations = [
        createTestObservation({ id: 1, created_at_epoch: 1000 }),
      ];
      const summaries = [
        createTestSummaryTimelineItem({ id: 1, displayEpoch: 2000 }),
      ];

      const timeline = buildTimeline(observations, summaries);

      expect(timeline).toHaveLength(2);
    });

    it('should sort timeline items chronologically by epoch', () => {
      const observations = [
        createTestObservation({ id: 1, created_at_epoch: 3000 }),
        createTestObservation({ id: 2, created_at_epoch: 1000 }),
      ];
      const summaries = [
        createTestSummaryTimelineItem({ id: 1, displayEpoch: 2000 }),
      ];

      const timeline = buildTimeline(observations, summaries);

      expect(timeline).toHaveLength(3);
      expect(timeline[0].type).toBe('observation');
      expect((timeline[0].data as Observation).id).toBe(2);
      expect(timeline[1].type).toBe('summary');
      expect(timeline[2].type).toBe('observation');
      expect((timeline[2].data as Observation).id).toBe(1);
    });

    it('should handle empty observations array', () => {
      const summaries = [
        createTestSummaryTimelineItem({ id: 1, displayEpoch: 1000 }),
      ];

      const timeline = buildTimeline([], summaries);

      expect(timeline).toHaveLength(1);
      expect(timeline[0].type).toBe('summary');
    });

    it('should handle empty summaries array', () => {
      const observations = [
        createTestObservation({ id: 1, created_at_epoch: 1000 }),
      ];

      const timeline = buildTimeline(observations, []);

      expect(timeline).toHaveLength(1);
      expect(timeline[0].type).toBe('observation');
    });

    it('should handle both empty arrays', () => {
      const timeline = buildTimeline([], []);

      expect(timeline).toHaveLength(0);
    });

    it('should correctly tag items with their type', () => {
      const observations = [createTestObservation()];
      const summaries = [createTestSummaryTimelineItem()];

      const timeline = buildTimeline(observations, summaries);

      const observationItem = timeline.find(item => item.type === 'observation');
      const summaryItem = timeline.find(item => item.type === 'summary');

      expect(observationItem).toBeDefined();
      expect(summaryItem).toBeDefined();
      expect(observationItem!.data).toHaveProperty('narrative');
      expect(summaryItem!.data).toHaveProperty('request');
    });

    it('should use displayEpoch for summary sorting, not created_at_epoch', () => {
      const observations = [
        createTestObservation({ id: 1, created_at_epoch: 2000 }),
      ];
      const summaries = [
        createTestSummaryTimelineItem({
          id: 1,
          created_at_epoch: 3000, // Created later
          displayEpoch: 1000,     // But displayed earlier
        }),
      ];

      const timeline = buildTimeline(observations, summaries);

      expect(timeline[0].type).toBe('summary');
      expect(timeline[1].type).toBe('observation');
    });
});

describe('context compiler platform scoping', () => {
  const config: ContextConfig = {
    totalObservationCount: 20,
    fullObservationCount: 3,
    sessionCount: 20,
    showReadTokens: true,
    showWorkTokens: true,
    showSavingsAmount: true,
    showSavingsPercent: true,
    observationTypes: new Set(['discovery']),
    observationConcepts: new Set(['platform-scope']),
    fullObservationField: 'narrative',
    showLastSummary: true,
    showLastMessage: false,
  };

  function seed(
    store: SessionStore,
    input: {
      project: string;
      contentSessionId: string;
      memorySessionId: string;
      platformSource: string;
      title: string;
      summaryRequest: string;
      createdAtEpoch: number;
    },
  ): void {
    const sessionDbId = store.createSDKSession(
      input.contentSessionId,
      input.project,
      `${input.platformSource} prompt`,
      undefined,
      input.platformSource,
    );
    store.ensureMemorySessionIdRegistered(sessionDbId, input.memorySessionId);
    store.storeObservation(
      input.memorySessionId,
      input.project,
      {
        type: 'discovery',
        title: input.title,
        subtitle: null,
        facts: [],
        narrative: `${input.platformSource} context narrative`,
        concepts: ['platform-scope'],
        files_read: [],
        files_modified: [],
      },
      1,
      0,
      input.createdAtEpoch,
    );
    store.storeSummary(
      input.memorySessionId,
      input.project,
      {
        request: input.summaryRequest,
        investigated: 'investigated',
        learned: 'learned',
        completed: 'completed',
        next_steps: 'next',
        notes: null,
      },
      1,
      0,
      input.createdAtEpoch,
    );
  }

  it('filters observations, summaries, and project counts by platformSource when supplied', () => {
    const store = new SessionStore(':memory:');
    try {
      seed(store, {
        project: 'context-platform-project',
        contentSessionId: 'shared-context-id',
        memorySessionId: 'codex-context-memory',
        platformSource: 'codex',
        title: 'CODEX_CONTEXT_OBS',
        summaryRequest: 'CODEX_CONTEXT_SUMMARY',
        createdAtEpoch: 1_700_000_000_000,
      });
      seed(store, {
        project: 'context-platform-project',
        contentSessionId: 'shared-context-id',
        memorySessionId: 'claude-context-memory',
        platformSource: 'claude',
        title: 'CLAUDE_CONTEXT_OBS',
        summaryRequest: 'CLAUDE_CONTEXT_SUMMARY',
        createdAtEpoch: 1_700_000_001_000,
      });

      const codexObservations = queryObservationsMulti(store, ['context-platform-project'], config, 'codex');
      expect(codexObservations.map(obs => obs.title)).toEqual(['CODEX_CONTEXT_OBS']);
      expect(codexObservations[0].platform_source).toBe('codex');

      const codexSummaries = querySummariesMulti(store, ['context-platform-project'], config, 'codex');
      expect(codexSummaries.map(summary => summary.request)).toEqual(['CODEX_CONTEXT_SUMMARY']);
      expect(codexSummaries[0].platform_source).toBe('codex');

      expect(countObservationsByProjects(store, ['context-platform-project'], 'codex')).toBe(1);
      expect(countObservationsByProjects(store, ['context-platform-project'], 'claude')).toBe(1);
      expect(countObservationsByProjects(store, ['context-platform-project'])).toBe(2);
    } finally {
      store.close();
    }
  });

  it('applies platformSource across multi-project context queries', () => {
    const store = new SessionStore(':memory:');
    try {
      seed(store, {
        project: 'context-parent',
        contentSessionId: 'parent-codex',
        memorySessionId: 'parent-codex-memory',
        platformSource: 'codex',
        title: 'PARENT_CODEX_OBS',
        summaryRequest: 'PARENT_CODEX_SUMMARY',
        createdAtEpoch: 1_700_000_000_000,
      });
      seed(store, {
        project: 'context-worktree',
        contentSessionId: 'worktree-codex',
        memorySessionId: 'worktree-codex-memory',
        platformSource: 'codex',
        title: 'WORKTREE_CODEX_OBS',
        summaryRequest: 'WORKTREE_CODEX_SUMMARY',
        createdAtEpoch: 1_700_000_001_000,
      });
      seed(store, {
        project: 'context-worktree',
        contentSessionId: 'worktree-claude',
        memorySessionId: 'worktree-claude-memory',
        platformSource: 'claude',
        title: 'WORKTREE_CLAUDE_OBS',
        summaryRequest: 'WORKTREE_CLAUDE_SUMMARY',
        createdAtEpoch: 1_700_000_002_000,
      });

      const projects = ['context-parent', 'context-worktree'];
      expect(queryObservationsMulti(store, projects, config, 'codex').map(obs => obs.title)).toEqual([
        'WORKTREE_CODEX_OBS',
        'PARENT_CODEX_OBS',
      ]);
      expect(querySummariesMulti(store, projects, config, 'codex').map(summary => summary.request)).toEqual([
        'WORKTREE_CODEX_SUMMARY',
        'PARENT_CODEX_SUMMARY',
      ]);
    } finally {
      store.close();
    }
  });
});

describe('concept exact-match injection (#3379)', () => {
  const config: ContextConfig = {
    totalObservationCount: 20,
    fullObservationCount: 3,
    sessionCount: 20,
    showReadTokens: true,
    showWorkTokens: true,
    showSavingsAmount: true,
    showSavingsPercent: true,
    observationTypes: new Set(['discovery']),
    observationConcepts: new Set(['gotcha']),
    fullObservationField: 'narrative',
    showLastSummary: true,
    showLastMessage: false,
  };

  it('excludes a row whose stored concept carries a "keyword: description" prefix', () => {
    // The injection query matches concepts exactly (`WHERE value IN (...)`).
    // A row stored as "gotcha: x" must NOT match — this is the #3379 defect
    // that the parser normalization and the v49 backfill remove at the write
    // side; the query itself intentionally stays exact-match.
    const db = new Database(':memory:');
    try {
      const store = new SessionStore(db);
      const sessionDbId = store.createSDKSession('content-3379', 'concept-project', 'prompt');
      store.ensureMemorySessionIdRegistered(sessionDbId, 'mem-3379');
      // Insert directly: the fresh store is already past v49, so this mimics
      // a malformed row written before the migration existed.
      db.prepare(`
        INSERT INTO observations (memory_session_id, project, type, title, concepts, created_at, created_at_epoch)
        VALUES ('mem-3379', 'concept-project', 'discovery', 'MALFORMED_CONCEPT_OBS', '["gotcha: x"]', ?, ?)
      `).run(new Date().toISOString(), 1_700_000_000_000);

      expect(queryObservationsMulti(store, ['concept-project'], config)).toEqual([]);
    } finally {
      db.close();
    }
  });
});

describe('queryObservationsNewest house feed', () => {
  const config: ContextConfig = {
    totalObservationCount: 20,
    fullObservationCount: 3,
    sessionCount: 20,
    showReadTokens: true,
    showWorkTokens: true,
    showSavingsAmount: true,
    showSavingsPercent: true,
    observationTypes: new Set(['discovery']),
    observationConcepts: new Set(['platform-scope']),
    fullObservationField: 'narrative',
    showLastSummary: true,
    showLastMessage: false,
  };

  it('returns newest rows across projects when no project filter is passed', () => {
    const store = new SessionStore(':memory:');
    try {
      const seat = store.createSDKSession('seat-content', 'cmem_work_thin', 'seat', undefined, 'grok-bot');
      store.ensureMemorySessionIdRegistered(seat, 'seat-mem');
      store.storeObservation('seat-mem', 'cmem_work_thin', {
        type: 'discovery',
        title: 'SEAT_ONLY',
        subtitle: null,
        facts: [],
        narrative: 'thin diary',
        concepts: ['platform-scope'],
        files_read: [],
        files_modified: [],
      }, 1, 0, 1_700_000_000_000);

      const house = store.createSDKSession('house-content', 'claude-mem', 'house', undefined, 'claude');
      store.ensureMemorySessionIdRegistered(house, 'house-mem');
      store.storeObservation('house-mem', 'claude-mem', {
        type: 'discovery',
        title: 'HOUSE_NEWEST',
        subtitle: null,
        facts: [],
        narrative: 'house feed',
        concepts: ['platform-scope'],
        files_read: [],
        files_modified: [],
      }, 1, 0, 1_700_000_100_000);

      const scoped = queryObservationsNewest(store, config, {
        limit: 10,
        projects: ['cmem_work_thin'],
      });
      expect(scoped.map(obs => obs.title)).toEqual(['SEAT_ONLY']);

      const houseFeed = queryObservationsNewest(store, config, { limit: 10 });
      expect(houseFeed.map(obs => obs.title)).toEqual(['HOUSE_NEWEST', 'SEAT_ONLY']);
    } finally {
      store.close();
    }
  });
});

describe('dedupeObservationsByTitle', () => {
  const HOUR = 60 * 60 * 1000;
  const t0 = 1789593509261;

  it('keeps the newest of two rows whose titles differ by one clause within the hour', () => {
    const newer = createTestObservation({
      id: 26958,
      title: 'Code Review Findings: Stale Docstrings, Missing Annotations, and Behavior Changes in PRs #184–186',
      created_at_epoch: t0,
    });
    const older = createTestObservation({
      id: 26947,
      title: 'Code Review Findings: Stale Docstrings, Collapsible Functions, and Behavior Changes in PRs #184-186',
      created_at_epoch: t0 - 8 * 60 * 1000,
    });

    expect(dedupeObservationsByTitle([newer, older]).map(o => o.id)).toEqual([26958]);
  });

  it('keeps rows that only share a PR scope label', () => {
    const rows = [
      createTestObservation({ id: 26951, title: 'PR #186: Restore Literal "nan" Handling in Cohort Sex Column Validation', created_at_epoch: t0 }),
      createTestObservation({ id: 26950, title: 'PR #186: Consolidate Keyed-Diff Helpers into Single Function', created_at_epoch: t0 - 1000 }),
      createTestObservation({ id: 26930, title: 'PR #186: Consolidate Duplicated Keyed-Diff Logic into Generic Primitives', created_at_epoch: t0 - 5 * 60 * 1000 }),
    ];

    expect(dedupeObservationsByTitle(rows).map(o => o.id)).toEqual([26951, 26950, 26930]);
  });

  it('keeps both when the repeat is older than the window', () => {
    const newer = createTestObservation({ id: 2, title: 'Full test suite passes', created_at_epoch: t0 });
    const older = createTestObservation({ id: 1, title: 'Full test suite passes', created_at_epoch: t0 - HOUR - 1 });

    expect(dedupeObservationsByTitle([newer, older]).map(o => o.id)).toEqual([2, 1]);
  });

  it('measures the window from the row it kept, not from the row it dropped', () => {
    const a = createTestObservation({ id: 3, title: 'Full test suite passes', created_at_epoch: t0 });
    const b = createTestObservation({ id: 2, title: 'Full test suite passes', created_at_epoch: t0 - 50 * 60 * 1000 });
    const c = createTestObservation({ id: 1, title: 'Full test suite passes', created_at_epoch: t0 - 100 * 60 * 1000 });

    expect(dedupeObservationsByTitle([a, b, c]).map(o => o.id)).toEqual([3, 1]);
  });

  it('leaves untitled rows alone', () => {
    const rows = [
      createTestObservation({ id: 3, title: 'PR #184 Review Requested from wisemdaya', created_at_epoch: t0 }),
      createTestObservation({ id: 2, title: null, created_at_epoch: t0 - 1000 }),
      createTestObservation({ id: 1, title: null, created_at_epoch: t0 - 2000 }),
    ];

    expect(dedupeObservationsByTitle(rows).map(o => o.id)).toEqual([3, 2, 1]);
  });
});

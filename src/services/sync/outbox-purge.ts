// SPDX-License-Identifier: Apache-2.0

import type { Database } from 'bun:sqlite';
import { logger } from '../../utils/logger.js';

/**
 * #4228: databases that once ran cloud sync can carry millions of sync_outbox
 * rows (1.2 GB / 3.6M rows reported). Nothing drains the table any more, so it
 * is emptied at worker start. Returns the number of rows removed.
 */
export function purgeUndrainableSyncOutbox(db: Database): number {
  try {
    const row = db.prepare('SELECT COUNT(*) AS n FROM sync_outbox').get() as { n: number } | null;
    const count = row?.n ?? 0;
    if (count === 0) return 0;
    db.prepare('DELETE FROM sync_outbox').run();
    logger.info('DB', 'Cleared sync_outbox: cloud sync was removed, so these queued ops can never upload', {
      rows: count,
      hint: count > 100_000 ? 'Run VACUUM while claude-mem is idle to return the disk space' : undefined,
    });
    return count;
  } catch (error) {
    logger.debug('DB', 'sync_outbox purge skipped', {},
      error instanceof Error ? error : new Error(String(error)));
    return 0;
  }
}

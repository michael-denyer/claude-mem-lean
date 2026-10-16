import { logger } from '../../utils/logger.js';

export type ContentKind = 'observation' | 'summary' | 'prompt';

const CANONICAL_DECIMAL = /^(?:0|[1-9][0-9]*)$/;
const UINT64_MAX = 18_446_744_073_709_551_615n;

function jsonError(message: string): never {
  logger.debug('CLOUD_SYNC', 'Rejected invalid canonical content', { reason: message });
  throw new Error(`canonical content: ${message}`);
}

export function assertCanonicalDecimal(value: unknown, options: { positive?: boolean } = {}): string {
  if (typeof value !== 'string' || !CANONICAL_DECIMAL.test(value)) {
    return jsonError('decimal values must be unsigned base-10 strings without leading zeroes');
  }
  if (BigInt(value) > UINT64_MAX) jsonError('decimal value exceeds uint64');
  if (options.positive && value === '0') jsonError('decimal value must be positive');
  return value;
}

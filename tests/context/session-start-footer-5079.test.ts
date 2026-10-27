import { describe, expect, it } from 'bun:test';
import { composeSessionStartSystemMessage } from '../../src/cli/handlers/context.js';
import { CONTEXT_OUTPUT_LIMIT } from '../../src/services/context/ContextBudget.js';
import { fitContextForDelivery } from '../../src/services/context/ContextBuilder.js';
import type { ContextConfig, Observation } from '../../src/services/context/types.js';

// The SessionStart hook joins the worker-outage notice and the terminal preview
// into one `systemMessage`, which Claude Code caps at 10,000 characters (#5079).
describe('SessionStart systemMessage stays within the field cap (#5079)', () => {
  const fullPreview = () => {
    const observations = Array.from({ length: 200 }, (_, i) => ({ id: i }) as unknown as Observation);
    const config = { fullObservationCount: 0, showLastSummary: false, showLastMessage: false, sessionCount: 0 } as ContextConfig;
    const render = (items: Observation[]) => items.map(() => 'x'.repeat(80)).join('\n');
    return fitContextForDelivery(
      observations, [], config, '', render, CONTEXT_OUTPUT_LIMIT, false,
      (items) => items.map(() => 'y'.repeat(120)).join('\n'),
    ).text;
  };
  const longOutageNotice = `claude-mem worker unreachable for 12 consecutive hooks — memory features are degraded, but your prompts are not blocked. ${'Port 37777 is held by an unreachable process that no PID file claims. '.repeat(6)}`;

  it('keeps a full preview and a long outage notice within the limit', () => {
    const preview = fullPreview();
    expect(longOutageNotice.length + 2 + preview.length).toBeGreaterThan(CONTEXT_OUTPUT_LIMIT);
    const systemMessage = composeSessionStartSystemMessage(preview, '', longOutageNotice)!;
    expect(systemMessage.length).toBeLessThanOrEqual(CONTEXT_OUTPUT_LIMIT);
    expect(systemMessage.startsWith(`${longOutageNotice}\n\n`)).toBe(true);
    // Cut at a line boundary: the kept preview is a prefix of whole lines.
    const keptPreview = systemMessage.slice(longOutageNotice.length + 2);
    expect(preview.startsWith(`${keptPreview}\n`)).toBe(true);
  });

  it('leaves a message that already fits unchanged, and sends the notice alone without a banner', () => {
    expect(composeSessionStartSystemMessage('short preview', '', 'notice')).toBe('notice\n\nshort preview');
    expect(composeSessionStartSystemMessage('short preview', '', null)).toBe('short preview');
    expect(composeSessionStartSystemMessage(null, '', 'notice')).toBe('notice');
    expect(composeSessionStartSystemMessage(null, '', null)).toBeUndefined();
  });
});

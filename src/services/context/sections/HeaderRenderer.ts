import type { ContextConfig, TokenEconomics } from '../types.js';
import { shouldShowContextEconomics } from '../TokenCalculator.js';
import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

// The agent copy is paid for on every session start, so it carries only the
// title line: glyphs read in context, and the MCP tools are already in the
// model's tool list. Legend, column key, and stats stay on the human copy.
export function renderHeader(
  project: string,
  economics: TokenEconomics,
  config: ContextConfig,
  forHuman: boolean
): string[] {
  if (!forHuman) {
    return Agent.renderAgentHeader(project);
  }

  const output = [
    ...Human.renderHumanHeader(project),
    ...Human.renderHumanLegend(),
    ...Human.renderHumanColumnKey(),
    ...Human.renderHumanContextIndex(),
  ];

  if (shouldShowContextEconomics(config)) {
    output.push(...Human.renderHumanContextEconomics(economics, config));
  }

  return output;
}

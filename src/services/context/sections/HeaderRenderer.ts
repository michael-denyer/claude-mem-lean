import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

// The agent copy is paid for on every session start, so it carries only the
// title and mode lines. The human copy is shown on every start and compaction,
// so it carries only the title line.
export function renderHeader(project: string, forHuman: boolean): string[] {
  return forHuman ? Human.renderHumanHeader(project) : Agent.renderAgentHeader(project);
}

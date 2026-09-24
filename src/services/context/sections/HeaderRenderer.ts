import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

// Both copies carry only the title: the agent copy is paid for on every
// session start, and the human copy is shown on every start and compaction.
export function renderHeader(project: string, forHuman: boolean): string[] {
  return forHuman ? Human.renderHumanHeader(project) : Agent.renderAgentHeader(project);
}

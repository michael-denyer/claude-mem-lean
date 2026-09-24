import type { PriorMessages } from '../types.js';
import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

export function renderPreviouslySection(
  priorMessages: PriorMessages,
  forHuman: boolean
): string[] {
  if (forHuman) {
    return Human.renderHumanPreviouslySection(priorMessages);
  }
  return Agent.renderAgentPreviouslySection(priorMessages);
}

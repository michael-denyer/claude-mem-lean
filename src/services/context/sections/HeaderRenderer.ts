import { loadProjectEnvironments } from '../../../utils/project-name.js';
import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

/**
 * A named environment spans several directories; say so in the header so the
 * model does not read the project name as one folder. The name only: the glob
 * patterns would cost tokens on every session and add nothing for the model.
 */
function projectHeaderLabel(project: string): string {
  return loadProjectEnvironments().some(environment => environment.name === project)
    ? `${project} (environment)`
    : project;
}

// The agent copy is paid for on every session start, so it carries only the
// title and mode lines. The human copy is shown on every start and compaction,
// so it carries only the title line.
export function renderHeader(
  project: string,
  forHuman: boolean,
  /** The header's date and time; a placeholder when the block is cached (context-cache.ts). */
  headerTime?: string
): string[] {
  const projectDisplay = projectHeaderLabel(project);
  return forHuman
    ? Human.renderHumanHeader(projectDisplay, headerTime)
    : Agent.renderAgentHeader(projectDisplay, headerTime);
}

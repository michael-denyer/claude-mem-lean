
import type { ContextConfig, Observation, SessionSummary } from '../types.js';
import { colors } from '../types.js';
import * as Agent from '../formatters/AgentFormatter.js';
import * as Human from '../formatters/HumanFormatter.js';

export function shouldShowSummary(
  config: ContextConfig,
  mostRecentSummary: SessionSummary | undefined,
  mostRecentObservation: Observation | undefined
): boolean {
  if (!config.showLastSummary || !mostRecentSummary) {
    return false;
  }

  const hasContent = !!(
    mostRecentSummary.investigated ||
    mostRecentSummary.learned ||
    mostRecentSummary.completed ||
    mostRecentSummary.next_steps
  );

  if (!hasContent) {
    return false;
  }

  if (mostRecentObservation && mostRecentSummary.created_at_epoch <= mostRecentObservation.created_at_epoch) {
    return false;
  }

  return true;
}

export function renderSummaryFields(
  summary: SessionSummary,
  forHuman: boolean
): string[] {
  const output: string[] = [];

  if (forHuman) {
    output.push(...Human.renderHumanSummaryField('Investigated', summary.investigated, colors.blue));
    output.push(...Human.renderHumanSummaryField('Learned', summary.learned, colors.yellow));
    output.push(...Human.renderHumanSummaryField('Completed', summary.completed, colors.green));
    output.push(...Human.renderHumanSummaryField('Next Steps', summary.next_steps, colors.magenta));
  } else {
    // Investigated, Learned, and Completed restate the timeline rows above;
    // Next Steps is the only field that points forward.
    output.push(...Agent.renderAgentSummaryField('Next Steps', summary.next_steps));
  }

  return output;
}

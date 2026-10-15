
import type {
  ContextConfig,
  Observation,
  SessionSummary,
  PriorMessages,
} from '../types.js';
import { ModeManager } from '../../domain/ModeManager.js';
import { formatObservationTokenDisplay } from '../TokenCalculator.js';
import { formatHeaderDateTime } from '../../../shared/timeline-formatting.js';
import { formatContextReferenceId } from './id-display.js';

function formatActiveMode(): string {
  const manager = ModeManager.getInstance();
  const mode = manager.getActiveMode();
  return `${mode.name} (${manager.getActiveModeId()})`;
}

export function renderAgentHeader(project: string, headerTime: string = formatHeaderDateTime()): string[] {
  return [
    `# [${project}] recent context, ${headerTime}`,
    `Mode: ${formatActiveMode()}`,
    ''
  ];
}

export function renderAgentDayHeader(day: string): string[] {
  return [
    `### ${day}`,
  ];
}

function compactTime(time: string): string {
  return time.toLowerCase().replace(' am', 'a').replace(' pm', 'p');
}

export function renderAgentTableRow(
  obs: Observation,
  timeDisplay: string,
  config: ContextConfig
): string {
  const title = obs.title || 'Untitled';
  const icon = ModeManager.getInstance().getTypeIcon(obs.type);
  const time = timeDisplay ? compactTime(timeDisplay) : '"';
  const refId = formatContextReferenceId(obs.id, config);

  return `${refId} ${time} ${icon} ${title}`;
}

export function renderAgentFullObservation(
  obs: Observation,
  timeDisplay: string,
  detailField: string | null,
  config: ContextConfig
): string[] {
  const output: string[] = [];
  const title = obs.title || 'Untitled';
  const icon = ModeManager.getInstance().getTypeIcon(obs.type);
  const time = timeDisplay ? compactTime(timeDisplay) : '"';
  const { readTokens, discoveryDisplay } = formatObservationTokenDisplay(obs, config);
  const refId = formatContextReferenceId(obs.id, config);

  output.push(`**${refId}** ${time} ${icon} **${title}**`);
  if (detailField) {
    output.push(detailField);
  }

  const tokenParts: string[] = [];
  if (config.showReadTokens) {
    tokenParts.push(`~${readTokens}t`);
  }
  if (config.showWorkTokens) {
    tokenParts.push(discoveryDisplay);
  }
  if (tokenParts.length > 0) {
    output.push(tokenParts.join(' '));
  }
  output.push('');

  return output;
}

export function renderAgentSummaryItem(
  summary: { id: number | string; request: string | null },
  formattedTime: string,
  config: Pick<ContextConfig, 'fetchByIdSupported'> = {}
): string[] {
  return [
    `S${formatContextReferenceId(summary.id, config)} ${summary.request || 'Session started'} (${formattedTime})`,
  ];
}

export function renderAgentSummaryField(label: string, value: string | null): string[] {
  if (!value) return [];
  return [`**${label}**: ${value}`, ''];
}

export function renderAgentPreviouslySection(priorMessages: PriorMessages): string[] {
  if (!priorMessages.assistantMessage) return [];

  return [
    '',
    '---',
    '',
    `**Previously**`,
    '',
    `A: ${priorMessages.assistantMessage}`,
    ''
  ];
}

export function renderAgentEmptyState(project: string, headerTime: string = formatHeaderDateTime()): string {
  return `# [${project}] recent context, ${headerTime}\nMode: ${formatActiveMode()}\n\nNo previous sessions found.`;
}

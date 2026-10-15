import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolveInstallerProviderChoice } from '../../src/npx-cli/installer-provider-choice';

const repoRoot = join(__dirname, '..', '..');

describe('grok-bot install default provider', () => {
  it('defaults --ide grok-bot with no --provider to CMEM Pro', () => {
    expect(resolveInstallerProviderChoice({ ide: 'grok-bot' })).toBe('cmem');
  });

  it('keeps --provider host as an explicit grok-bot opt-in', () => {
    expect(resolveInstallerProviderChoice({ ide: 'grok-bot', provider: 'host' })).toBe('host');
  });

  it('does not invent a non-interactive default for other IDEs', () => {
    expect(resolveInstallerProviderChoice({ ide: 'cursor' })).toBeUndefined();
    expect(resolveInstallerProviderChoice({ ide: 'claude-code' })).toBeUndefined();
    expect(resolveInstallerProviderChoice({})).toBeUndefined();
  });

  it('keeps installer provider-cutover and does not recycle a healthy worker from settings POST', () => {
    const source = readFileSync(join(repoRoot, 'src/npx-cli/commands/install.ts'), 'utf-8');
    expect(source).toContain("'provider-cutover'");
    expect(source).toContain('POST /api/settings still must not recycle a healthy worker');
  });

  it('keeps the grok-bot cmem default out of the non-interactive claude fallback', () => {
    // index.ts resolves grok-bot to 'cmem' before install.ts runs, so the
    // claude default must key on options.provider being undefined inside
    // validateNonInteractiveProvider and never fire for grok-bot.
    expect(resolveInstallerProviderChoice({ ide: 'grok-bot' })).toBe('cmem');
    const install = readFileSync(join(repoRoot, 'src/npx-cli/commands/install.ts'), 'utf-8');
    const fnStart = install.indexOf('function validateNonInteractiveProvider(');
    const fnEnd = install.indexOf('\n}\n', fnStart);
    const fn = install.slice(fnStart, fnEnd);
    expect(fn).toContain('if (!options.provider) {');
    expect(fn).toContain("options.providerSource = 'default'");
    expect(fn).not.toContain('grok-bot');
  });

  it('applies the grok-bot CMEM Pro default at the CLI boundary for non-TTY installs', () => {
    const cli = readFileSync(join(repoRoot, 'src/npx-cli/index.ts'), 'utf-8');
    const install = readFileSync(join(repoRoot, 'src/npx-cli/commands/install.ts'), 'utf-8');
    const grokInstaller = readFileSync(join(repoRoot, 'src/services/integrations/GrokBotInstaller.ts'), 'utf-8');
    expect(cli).toContain("from './installer-provider-choice.js'");
    expect(cli).toContain('resolveInstallerProviderChoice');
    expect(cli).toContain('process.stdin.isTTY');
    expect(install).toContain("initialValues: ['claude']");
    expect(grokInstaller).toContain('GROK_BOT_AGENT_DATA');
  });
});

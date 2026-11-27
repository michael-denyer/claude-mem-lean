import { expect, test } from 'bun:test';

const read = (path) => Bun.file(new URL(path, import.meta.url));
const root = await read('../../package.json').json();
const plugin = await read('../../plugin/package.json').json();
const lock = Bun.JSONC.parse(await read('../../plugin/bun.lock').text());

test('the build and the installed plugin use the same patched shell-quote pin', () => {
  const pin = root.devDependencies['shell-quote'];
  expect(pin).toBe(plugin.dependencies['shell-quote']);
  expect(Bun.semver.satisfies(pin, '>=1.11.0')).toBe(true);
  expect(lock.packages['shell-quote'][0]).toBe('shell-quote@' + pin);
});

test('all locked copies of adm-zip and zod meet the upstream security floors', () => {
  for (const [name, floor] of Object.entries({ 'adm-zip': '0.6.1', zod: '4.6.6' })) {
    const prefix = name + '@';
    const versions = Object.values(lock.packages).map(entry => entry[0]).filter(id => id.startsWith(prefix));
    expect(versions.length).toBeGreaterThan(0);
    for (const id of versions) {
      expect(Bun.semver.satisfies(id.slice(prefix.length), '>=' + floor), id).toBe(true);
    }
  }
});

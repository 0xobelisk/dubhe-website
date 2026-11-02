import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const origin = 'http://127.0.0.1:3281';
const locales = ['en', 'id', 'vi', 'ko', 'zh-TW', 'ja', 'fr', 'ru', 'hi', 'ha', 'ur', 'uk', 'tr', 'th', 'pt', 'bn'];
const pages = ['', '/labs', '/grants', '/incubation', '/team', '/ambassador', '/moderators', '/proposal', '/token', '/portal', '/investor', '/engine', '/channel', '/events'];
const paths = locales.flatMap((locale) => pages.map((page) => `/${locale}${page}`));
paths.push('/mediakit/dubhe/png/a.png');
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < paths.length) {
    const path = paths[next++];
    try {
      const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30000) });
      const html = path.endsWith('.png') ? '' : await response.text();
      const errorFrame = /(?:\n|\\n)[0-9a-f]+:E\{/.test(html) || html.includes('"digest":"NEXT_HTTP_ERROR_FALLBACK;500"');
      const oldPlayerClaim = /12K\+/.test(html);
      const metadata = html.match(/<(?:meta|link)\b[^>]*(?:og:|twitter:|canonical)[^>]*>/g) ?? [];
      const staleSeoOrigin = metadata.some((tag) => tag.includes('https://dubhe.network'));
      results.push({ path, status: response.status, errorFrame, oldPlayerClaim, staleSeoOrigin, pass: response.ok && !errorFrame && !oldPlayerClaim && !staleSeoOrigin });
    } catch (error) {
      results.push({ path, pass: false, error: String(error) });
    }
  }
}));

const base = 'fa2e3ed3368aea78e046221c24d1c0c4e666d249';
const tracked = execFileSync('git', ['diff', '--name-only', base, '--', 'apps/web'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const untracked = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '--', 'apps/web'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const files = [...new Set([...tracked, ...untracked])].sort();
const sourceFingerprint = createHash('sha256').update(files.map((path) => `${path}\0${createHash('sha256').update(readFileSync(path)).digest('hex')}`).join('\n')).digest('hex');
const failed = results.filter((result) => !result.pass);
const report = {
  checkedAt: new Date().toISOString(), origin, base,
  buildId: readFileSync('apps/web/.next/BUILD_ID', 'utf8').trim(), sourceFingerprint,
  summary: { total: results.length, passed: results.length - failed.length, failed: failed.length },
  scope: 'HTTP/server-render checks only; final browser screenshots and collision checks are performed separately by the root agent.',
  results: results.sort((a, b) => a.path.localeCompare(b.path)),
};
writeFileSync('YC-HTTP-CHECKS.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ...report.summary, buildId: report.buildId, sourceFingerprint, failures: failed }));
if (failed.length) process.exitCode = 1;

import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const base = 'fa2e3ed3368aea78e046221c24d1c0c4e666d249';
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const original = (path) => execFileSync('git', ['show', `${base}:${path}`], { encoding: 'utf8' });
const messages = 'apps/web/messages';
const locales = readdirSync(messages).filter((name) => name.endsWith('.json'));

for (const file of locales) {
  const current = JSON.parse(read(`${messages}/${file}`));
  const before = JSON.parse(original(`${messages}/${file}`));
  const game = current.home.ecosystem.projects.numeron;
  assert.equal(game.players, '', `${file}: unverified player count`);
  for (const key of ['status', 'development', 'validation', 'history']) {
    assert.ok(game[key]?.trim(), `${file}: missing current Numeron ${key}`);
  }
  assert.ok(!/2026|২০২৬/.test(game.validation), `${file}: start date must be separate from current verification`);
  assert.ok(!/12K\+/.test(JSON.stringify(current)), `${file}: old player count remains`);
  assert.ok(current.contentReview.rules && current.contentReview.people && current.contentReview.demo);
  for (const [id, member] of Object.entries(before.team.members ?? {})) {
    assert.equal(current.team.members[id].name, member.name, `${file}: roster name removed`);
    assert.equal(current.team.members[id].bio, '', `${file}: unverified credential remains`);
    assert.equal(current.team.members[id].role, current.contentReview.pending);
  }
  for (const key of ['members', 'events', 'countries']) {
    assert.equal(current.home.community.stats[key].value, '', `${file}: unsupported aggregate remains`);
  }
  for (const [key, program] of Object.entries(current.incubation.programs)) {
    assert.equal(program.funding, current.contentReview.pending, `${file}: ${key} must not promise unconfirmed funding`);
  }
  assert.ok(Array.isArray(current.labs.labsList.dubheos.contributions));
  assert.ok(Array.isArray(current.labs.labsList.numeron.contributions));
  for (const area of Object.values(current.labs.research.areas)) {
    assert.ok(!area.teams.includes('Numeron OS'), `${file}: historical lab identity must be marked as unconfirmed`);
  }
}

const ecosystem = read('apps/web/components/ecosystem.tsx');
assert.ok(ecosystem.includes('https://numeron.obelisk.build'));
assert.ok(!ecosystem.includes('testnet.numeron.world'));
assert.ok(!ecosystem.includes("t('metrics.players')"));
assert.ok(ecosystem.includes('data-field="development-start"'));
assert.ok(ecosystem.includes('data-field="current-validation"'));

for (const [page, names] of Object.entries({
  ambassador: ['DfilipenKov', 'artems11', 'cevin'],
  moderators: ['Purple_Rain_', 'EREN', 'Jenny', 'Myzulll', 'Mira', 'oleksiichumachenko', 'SHAHID HASAN'],
})) {
  const path = `apps/web/app/[locale]/${page}/page.tsx`;
  const source = read(path);
  for (const name of names) assert.ok(source.includes(`name: "${name}"`), `community identity lost: ${name}`);
}

const hrefs = (source) => source.match(/href="[^"]+"/g) ?? [];
for (const page of ['team', 'ambassador', 'moderators']) {
  const path = `apps/web/app/[locale]/${page}/page.tsx`;
  assert.deepEqual(hrefs(read(path)), hrefs(original(path)), `${page}: recruitment/community link changed`);
}
assert.equal(read('apps/web/components/footer.tsx'), original('apps/web/components/footer.tsx'), 'original footer channels/links must remain');

const portalPath = 'apps/web/app/[locale]/portal/page.tsx';
const portal = read(portalPath);
const portalBefore = original(portalPath);
const handler = (source) => source.match(/  const handleClaim = \(\) => \{[\s\S]*?\n  \}/)?.[0];
const buttons = (source) => source.match(/<Button\b[^>]*>[\s\S]*?<\/Button>/g);
assert.equal(handler(portal), handler(portalBefore), 'claim handler changed');
assert.deepEqual(buttons(portal), buttons(portalBefore), 'claim/rules buttons changed');
assert.ok(portal.includes('<ContentReviewNotice kind="demo" />'));
assert.ok(!read('apps/web/components/network-stats.tsx').includes('Math.random'));
assert.ok(!read('apps/web/app/[locale]/moderators/page.tsx').includes('>24/7<'), 'unverified around-the-clock service claim');
assert.ok(!read('apps/web/components/investor/team-execution.tsx').includes('>100%<'), 'unverified execution success rate');

for (const name of execFileSync('git', ['diff', '--name-only', base], { encoding: 'utf8' }).trim().split('\n')) {
  assert.ok(!/apps\/web\/app\/api\/|\/wallet\/page\.tsx|components\/(?:providers|wallet)/.test(name), `functional path changed: ${name}`);
}
for (const path of ['apps/web/app/[locale]/layout.tsx', 'apps/web/components/seo-head.tsx']) {
  const source = read(path);
  assert.ok(!source.includes('/og-image.png'), 'missing social image remains');
  assert.ok(!source.includes('https://dubhe.network'), 'old SEO origin remains');
}
const brand = 'apps/web/public/mediakit/dubhe/png/a.png';
assert.ok(existsSync(brand));
const png = readFileSync(brand);
assert.equal(png.readUInt32BE(16), 3821);
assert.equal(png.readUInt32BE(20), 906);
console.log(`PASS: ${locales.length} locales; separate Numeron dates/status; all community names/recruitment links preserved; claim buttons/handler unchanged; no auth/wallet/API logic changes; real social image dimensions.`);

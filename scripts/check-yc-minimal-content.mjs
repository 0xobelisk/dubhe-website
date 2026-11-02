import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const base = 'fa2e3ed3368aea78e046221c24d1c0c4e666d249';
const read = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const original = (path) => execFileSync('git', ['show', `${base}:${path}`], { encoding: 'utf8' });
const messages = 'apps/web/messages';
const locales = readdirSync(messages).filter((name) => name.endsWith('.json'));
// Confirmed invitation status; this does not claim public access or a launch.
const invitedPlaytest = {
  bn: [
    'বাহ্যিক খেলোয়াড়দের প্লেটেস্টে আমন্ত্রণ জানানো হয়েছে',
    'বাহ্যিক খেলোয়াড়দের প্লেটেস্টে আমন্ত্রণ জানানো হয়েছে। গেম ও রিচার্জের অভ্যন্তরীণ প্রক্রিয়া পরীক্ষা করা হয়েছে; অভ্যন্তরীণ রিচার্জ পরীক্ষাকে আয় হিসেবে ধরা যায় না।',
  ],
  en: [
    'External players invited to playtest',
    'External players have been invited to playtest. Internal game and recharge flows have been tested; internal recharge tests do not represent revenue.',
  ],
  fr: [
    'Joueurs externes invités à tester le jeu',
    'Des joueurs externes ont été invités à tester le jeu. Les parcours internes de jeu et de recharge ont été testés ; les tests de recharge internes ne constituent pas des revenus.',
  ],
  ha: [
    "An gayyaci 'yan wasa na waje don gwajin wasa",
    "An gayyaci 'yan wasa na waje don gwajin wasa. An gwada hanyoyin wasa da caji a ciki; gwajin caji na ciki ba kuɗin shiga ba ne.",
  ],
  hi: [
    'बाहरी खिलाड़ियों को खेल परीक्षण के लिए आमंत्रित किया गया',
    'बाहरी खिलाड़ियों को खेल परीक्षण के लिए आमंत्रित किया गया है। गेम और रिचार्ज के आंतरिक प्रवाह का परीक्षण हुआ है; आंतरिक रिचार्ज परीक्षण राजस्व नहीं है।',
  ],
  id: [
    'Pemain eksternal diundang untuk uji coba',
    'Pemain eksternal telah diundang untuk uji coba. Alur permainan dan isi ulang internal telah diuji; uji isi ulang internal bukan pendapatan.',
  ],
  ja: [
    '外部プレイヤーをプレイテストに招待済み',
    '外部プレイヤーをプレイテストに招待しました。ゲームとチャージの内部フローをテスト済みですが、内部チャージテストは収益を意味しません。',
  ],
  ko: [
    '외부 플레이어를 플레이테스트에 초대함',
    '외부 플레이어를 플레이테스트에 초대했습니다. 게임과 충전 흐름을 내부에서 테스트했으며, 내부 충전 테스트는 수익을 의미하지 않습니다.',
  ],
  pt: [
    'Jogadores externos convidados para testar o jogo',
    'Jogadores externos foram convidados para testar o jogo. Os fluxos internos de jogo e recarga foram testados; os testes internos de recarga não representam receita.',
  ],
  ru: [
    'Внешние игроки приглашены на тестирование',
    'Внешние игроки приглашены на тестирование. Внутренние игровые сценарии и пополнение протестированы; внутренние тесты пополнения не являются выручкой.',
  ],
  th: [
    'เชิญผู้เล่นภายนอกเข้าร่วมทดสอบแล้ว',
    'เชิญผู้เล่นภายนอกเข้าร่วมทดสอบแล้ว มีการทดสอบขั้นตอนเกมและเติมเงินภายใน การทดสอบเติมเงินภายในไม่ถือเป็นรายได้',
  ],
  tr: [
    'Harici oyuncular oyun testine davet edildi',
    'Harici oyuncular oyun testine davet edildi. Oyun ve yükleme akışları içeride test edildi; dahili yükleme testleri gelir anlamına gelmez.',
  ],
  uk: [
    'Зовнішніх гравців запрошено на тестування',
    'Зовнішніх гравців запрошено на тестування. Внутрішні ігрові сценарії та поповнення протестовано; внутрішні тести поповнення не є доходом.',
  ],
  ur: [
    'بیرونی کھلاڑیوں کو پلے ٹیسٹ کے لیے مدعو کیا گیا ہے',
    'بیرونی کھلاڑیوں کو پلے ٹیسٹ کے لیے مدعو کیا گیا ہے۔ گیم اور ریچارج کے اندرونی طریقوں کو جانچا گیا ہے؛ اندرونی ریچارج ٹیسٹ آمدنی نہیں ہیں۔',
  ],
  vi: [
    'Đã mời người chơi bên ngoài tham gia thử nghiệm',
    'Đã mời người chơi bên ngoài tham gia thử nghiệm. Các luồng chơi và nạp tiền nội bộ đã được kiểm thử; kiểm thử nạp tiền nội bộ không phải là doanh thu.',
  ],
  'zh-TW': [
    '已邀請外部玩家參加測試',
    '已邀請外部玩家參加測試；已完成遊戲及內部充值流程測試，內部充值測試不代表收入。',
  ],
};

for (const file of locales) {
  const current = JSON.parse(read(`${messages}/${file}`));
  const before = JSON.parse(original(`${messages}/${file}`));
  const game = current.home.ecosystem.projects.numeron;
  const lab = current.labs.labsList.numeron;
  const expected = invitedPlaytest[file.slice(0, -5)];
  assert.ok(expected, `${file}: missing confirmed playtest invitation copy`);
  assert.equal(game.status, expected[0], `${file}: Numeron must reflect invited external players`);
  assert.equal(game.validation, expected[1], `${file}: invitation and internal recharge status changed`);
  assert.equal(lab.status, game.status, `${file}: Labs invitation status must match home`);
  assert.equal(lab.description, game.validation, `${file}: Labs verification must match home`);
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
const traction = read('apps/web/components/investor/traction-metrics.tsx');
assert.ok(traction.includes('description: "External players have been invited to playtest Numeron"'), 'investor copy must reflect invited external players');
assert.ok(!traction.includes('has not launched or started external playtesting'), 'outdated external playtesting denial');

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
console.log(`PASS: ${locales.length} locales; confirmed external playtest invitations; separate Numeron dates/status; all community names/recruitment links preserved; claim buttons/handler unchanged; no auth/wallet/API logic changes; real social image dimensions.`);

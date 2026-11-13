// 레어 합성 시험 (v3.51) — 서버와 같은 규칙 문맥(server/rules.js)에서. node tools/upgrade/fuse_test.js
// 고급 3장 → 같은 깃발 레어 1장 · 확률은 센(카드 점수 높은) 카드일수록 낮음 · 덱 보호 · 다 가진 레어는 빠짐 · 서버 OPS · net.js 목록
const fs = require('fs'), path = require('path');
const R = require('../../server/rules.js').load();
const { Store, CARDS, CARD_LIST } = R;
const ev = s => require('vm').runInContext(s, R.ctx);
const srv0 = () => fs.readFileSync(path.join(__dirname, '../../server/server.js'), 'utf8'), net0 = () => fs.readFileSync(path.join(__dirname, '../../js/net.js'), 'utf8');
let n = 0, fail = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
const gradeOf = c => ev(`gradeOf(${JSON.stringify(c)})`);
Store.data = Store.data || {}; Store.data.users = Store.data.users || {};
const mk = (id, groups) => { const u = { id, pw: 'x', created: Date.now(), group: groups[0], owned: Object.fromEntries(groups.map(g => [g, true])), collection: {}, decks: {}, drafts: {}, gold: 0, stats: { w: 0, l: 0 } }; Store.data.users[id] = u; return u; };
const u = mk('합성이', ['B1']);
Store.user = () => u;
// 풀 · 확률
for (const g of ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3']) {
  const unc = CARD_LIST.find(c => c.group === g && !c.retired && gradeOf(c.id) === 'uncommon');
  const odds = ev(`rareFuseOdds(${JSON.stringify(unc.id)})`);
  ok(odds.length >= 4, g + ' 레어 풀 ' + odds.length);
  ok(odds.every(o => CARDS[o.id].group === g && gradeOf(o.id) === 'rare' && !CARDS[o.id].retired), g + ' 같은 깃발 · 레어 · 레거시 아님');
  ok(Math.abs(odds.reduce((s, o) => s + o.p, 0) - 1) < 1e-9, g + ' 확률 합 1');
  for (const a of odds) for (const b of odds) if (a.score < b.score) ok(a.p > b.p, `${g} 점수 낮은 ${a.id}(${a.score}) > 높은 ${b.id}(${b.score})`);
  if (g === 'B1') console.log('  B1 확률: ' + odds.map(o => `${CARDS[o.id].name}(Lv${CARDS[o.id].lv}) ${(o.p * 100).toFixed(1)}%`).join(' · '));
}
// 합성
const base = CARD_LIST.find(c => c.group === 'B1' && !c.retired && c.type === 'unit' && gradeOf(c.id) === 'uncommon').id;
u.collection[base] = 2;
let r = Store.fuseRare(u, base); ok(!r.ok && u.collection[base] === 2, '2장이면 안 됨: ' + r.msg);
const common = CARD_LIST.find(c => c.group === 'B1' && !c.retired && gradeOf(c.id) === 'common').id;
u.collection[common] = 5; r = Store.fuseRare(u, common); ok(!r.ok && u.collection[common] === 5, '일반 카드는 레어 합성 안 됨');
const g2 = CARD_LIST.find(c => c.group === 'B2' && !c.retired && gradeOf(c.id) === 'uncommon').id;
u.collection[g2] = 3; r = Store.fuseRare(u, g2); ok(!r.ok && u.collection[g2] === 3, '없는 깃발은 안 됨: ' + r.msg);
r = Store.fuseRare(u, 'nope'); ok(!r.ok, '없는 카드 ID');
u.collection[base] = 4;
u.decks.B1 = { cards: { [base]: 2 } };
r = Store.fuseRare(u, base); ok(!r.ok && u.collection[base] === 4, '덱에 든 2장은 재료로 못 씀: ' + r.msg);
u.decks.B1 = {};
r = Store.fuseRare(u, base);
ok(r.ok && u.collection[base] === 1 && gradeOf(r.got) === 'rare' && CARDS[r.got].group === 'B1' && u.collection[r.got] === 1 && u.fresh[r.got], '자유 4장 → 1장 남고 레어 1장: ' + (r.got && CARDS[r.got].name));
// 다 가진 레어는 빠짐
const odds0 = ev(`rareFuseOdds(${JSON.stringify(base)})`);
for (const o of odds0.slice(1)) u.collection[o.id] = 4;
u.collection[odds0[0].id] = 0;
u.collection[base] = 3; r = Store.fuseRare(u, base); ok(r.ok && r.got === odds0[0].id && r.p === 1, '남은 레어 하나만 나옴');
u.collection[base] = 3; r = Store.fuseRare(u, base); ok(r.ok, '4장 미만이면 또 나옴');
u.collection[odds0[0].id] = 4; u.collection[base] = 3; r = Store.fuseRare(u, base); ok(!r.ok && u.collection[base] === 3, '모두 4장이면 안 됨: ' + r.msg);
// 큰 수로 분포 (평균이 확률표와 맞는지)
{ for (const o of odds0) u.collection[o.id] = 0; const cnt = {}; const N = 20000;
  for (let k = 0; k < N; k++) { u.collection[base] = 3; for (const o of odds0) u.collection[o.id] = 0; const x = Store.fuseRare(u, base); cnt[x.got] = (cnt[x.got] || 0) + 1; }
  for (const o of odds0) ok(Math.abs(cnt[o.id] / N - o.p) < 0.015, `분포 ${o.id} ${(cnt[o.id] / N * 100).toFixed(1)}% ≈ ${(o.p * 100).toFixed(1)}%`); }
// v3.54 운명의 구슬: 좋은 레어 · 유니크
{ const v = mk('구슬이', ['B1']); Store.user = () => v;
  const odds = ev(`rareFuseOdds(${JSON.stringify(base)}, null, true)`);
  const rs = odds.filter(o => o.grade === 'rare'), uq = odds.filter(o => o.grade === 'unique');
  const allR = ev(`rareFuseOdds(${JSON.stringify(base)})`), minS = Math.min(...allR.map(o => o.score));
  ok(rs.length >= 1 && rs.every(o => o.score > minS), '구슬: 가장 약한 레어는 안 나옴 ' + rs.map(o => CARDS[o.id].name).join(','));
  ok(uq.length >= 1 && Math.abs(uq.reduce((t, o) => t + o.p, 0) - ev('ORB.unique')) < 1e-9, '구슬: 유니크 확률 합 = ORB.unique');
  console.log('  B1 구슬 확률: ' + odds.map(o => `${CARDS[o.id].name}(${o.grade === 'unique' ? '유니크' : 'Lv' + CARDS[o.id].lv}) ${(o.p * 100).toFixed(1)}%`).join(' · '));
  v.collection[base] = 3; let x = Store.fuseRare(v, base, true); ok(!x.ok && x.needOrb && v.collection[base] === 3, '구슬이 없으면 안 됨: ' + x.msg);
  v.orbs = 1; x = Store.fuseRare(v, base, true); ok(x.ok && Store.orbs(v) === 0 && odds.some(o => o.id === x.got), '구슬 1개 씀 → ' + (x.got && CARDS[x.got].name));
  const cnt = { rare: 0, unique: 0 }; for (let k = 0; k < 6000; k++) { v.collection = { [base]: 3 }; v.orbs = 1; const y = Store.fuseRare(v, base, true); cnt[y.grade]++; }
  ok(Math.abs(cnt.unique / 6000 - ev('ORB.unique')) < 0.015, `유니크 ${(cnt.unique / 60).toFixed(1)}% ≈ ${ev('ORB.unique') * 100}%`);
  Store.user = () => u; }
// v3.54 상점 값 · 스페셜 · 인장
{ const price = g => ev(`shopPrice(CARD_LIST.find(c => !c.base && !c.retired && gradeOf(c) === "${g}"))`);
  ok(price('common') === 100 && price('uncommon') === 200 && price('rare') === 500 && price('epic') === 700 && price('unique') === 800, '등급별 값 100 · 200 · 500 · 700 · 800');
  const sp = CARD_LIST.find(c => !c.base && !c.retired && gradeOf(c.id) === 'special');
  const w = mk('상점이', [sp.group]); w.gold = 99999; Store.user = () => w;
  ok(!Store.buyCard(w, sp.id, 1).ok, '스페셜은 살 수 없음'); w.collection[sp.id] = 1; ok(!Store.sellCard(w, sp.id).ok && Store.sellable(w, sp.id) === 0, '스페셜은 팔 수 없음');
  const upc = CARD_LIST.find(c => c.base && !c.retired); ok(!Store.buyCard(w, upc.id, 1).ok, '강화 카드는 살 수 없음');
  Store.user = () => u; }
// 서버만 바꾸는 칸 · 서버가 주는 보상
{ ok(/PROTECTED = new Set\([^)]*"seals", "orbs"/.test(srv0()) && /NET_PROTECTED = \[[^\]]*"seals", "orbs"/.test(net0()), 'seals · orbs는 서버만 (PROTECTED · NET_PROTECTED)');
  ok(!/\n  (addSeals|addOrbs):/.test(srv0()), '기기가 addSeals · addOrbs를 부르는 OPS 없음');
  const rw = fs.readFileSync(path.join(__dirname, '../../js/rewards.js'), 'utf8');
  ok(/rewardOrb\(u, today/.test(rw) && /ORB\.daily/.test(rw), '파친코 · 수레바퀴 구슬은 서버 rewardOrb (하루 상한)');
  // 하루 상한: 확률을 1로 두고 여러 번
  ev('ORB.p = 1'); const g = mk('파친코', ['B1']); const t = ev('rewardToday')(g);
  let n = 0; for (let k = 0; k < 10; k++) n += ev('rewardOrb')(g, t, '시험');
  ok(n === ev('ORB.daily') && Store.orbs(g) === n, `하루 ${n}개까지`); ev('ORB.p = 0.004');
  const gu = mk('필멸자·시험', ['B1']); gu.guest = true; ev('ORB.p = 1'); ok(ev('rewardOrb')(gu, ev('rewardToday')(gu), 't') === 0, '필멸자는 구슬 없음'); ev('ORB.p = 0.004'); }
// 관리자 · 손님
{ const a = mk('관', ['B1']); a.admin = true; a.collection[base] = 9; ok(!Store.fuseRare(a, base).ok, '관리자는 안 됨'); }
// 서버 · 기기 연결
const srv = srv0(), net = net0();
ok(/\n  fuseRare: \{\}/.test(srv), 'server.js OPS fuseRare');
ok(/NET_SYNC_OPS = \[[^\]]*"fuseRare"/.test(net), 'net.js NET_SYNC_OPS fuseRare (결과는 서버가 정함)');
ok(R.files.includes('js/fusion.js'), '서버가 js/fusion.js를 읽음');
console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exit(fail ? 1 : 0);

// 업그레이드(강화) 카드 시험 (v3.28) — 화면 없이. node tools/upgrade/test.js
// 데이터(50장 — v3.29 6레벨 결과 13장 없앰 · 레벨 +1 · 유지비 최대(v3.30) · 5레벨 이하 원래 카드) · 등급 · 덱 1장 · 아무 아이템 장착 · 합치기(덱 보호 · 3장 소모) · 사고팔기 막힘 · 실제 대전
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js', 'trade.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
const ev = s => ctx.ev(s);
(async () => {
  const ups = ev('CARD_LIST.filter(c => c.base).map(c => ({ id: c.id, base: c.base, lv: c.lv, up: c.up, g: c.group, limit: c.limit, any: c.anyItem, cl: c.cl, grade: gradeOf(c) }))');
  ok(ups.length === 50, '강화 카드 50장: ' + ups.length);
  ok(ups.every(u => u.lv <= 5), 'v3.29 강화 결과는 5레벨까지');
  { const rt = ev('UPGRADE_RETIRED'); ok(Object.keys(rt).length === 13 && Object.keys(rt).every(id => !ev(`CARDS["${id}"]`) && ev(`CARDS["${rt[id]}"]`)), 'v3.29 없앤 13장은 CARDS에 없고 원래 카드는 있음'); }
  for (const u of ups) {
    const b = ev(`(c => ({ lv: c.lv, up: c.up, g: c.group, t: c.type, gr: gradeOf(c) }))(CARDS["${u.base}"])`);
    ok(b.t === 'unit' && b.lv <= 5 && b.up >= 1 && ['common', 'uncommon'].includes(b.gr), u.id + ' 원래 카드 조건(5레벨 이하 · 유지비 · 일반/고급)');
    ok(u.lv === b.lv + 1 && u.up === u.lv - 1 && u.g === b.g, u.id + ' 레벨 +1 · 유지비는 늘 최대(레벨 − 1, v3.30) · 같은 깃발');
    ok(u.limit === 1 && u.any && u.cl === '' && u.grade === 'upgrade', u.id + ' 덱 1장 · 클래스 없음 · 강화 등급');
    ok(u.up <= u.lv - 1, u.id + ' 유지비 상한');
    ok(ev(`UPGRADE_OF["${u.base}"]`) === u.id, u.id + ' 원래 → 강화 연결');
  }
  { const names = ev('CARD_LIST.map(c => c.name)'), upn = ev('CARD_LIST.filter(c => c.base).map(c => c.name)'); ok(upn.every(x => names.filter(y => y === x).length === 1), '강화 카드 이름이 다른 카드와 겹치지 않음'); }
  ok(ev('GRADES.upgrade.name') === '강화' && ev('DECK_GRADE_PT.upgrade') === 18 && ev('GRADES.rare.rank < GRADES.upgrade.rank && GRADES.upgrade.rank < GRADES.epic.rank'), '등급 강화 · 18점 · 레어와 에픽 사이');
  ok(ev('cardScore(CARDS["UP-B1-12"])') === 18 + 3, '덱 점수 18 + 레벨');
  // 아이템: 전용 아이템도 장착
  const only = ev('CARD_LIST.filter(c => c.type === "item" && !isAllClass(c)).map(c => c.id)');
  ok(only.length > 10 && only.every(id => ev(`canEquip(CARDS["${id}"], CARDS["UP-A3-12"])`)), '클래스 전용 아이템 ' + only.length + '장 모두 장착');
  ok(only.some(id => !ev(`canEquip(CARDS["${id}"], CARDS["A3-12"])`)), '원래 카드는 클래스 제한 그대로');
  // 새 모험가 시작 카드 · 기본 덱에는 없다
  ev('Store.register("합치는이", "pw", ["B1"])');
  ok(ev('Object.keys(Store.user().collection).every(id => !CARDS[id].base)'), '시작 카드에 강화 카드 없음');
  ok(ev('GROUP_IDS.every(g => Object.keys(STARTER_DECKS[g]).every(id => !CARDS[id].base))'), '기본 덱에 강화 카드 없음');
  // 합치기
  const col = id => ev(`Store.user().collection["${id}"] || 0`);
  ev('Store.user().collection["B1-17"] = 2');
  let r = ev('Store.upgradeCard(null, "UP-B1-17")'); ok(!r.ok && col('B1-17') === 2, '2장이면 안 됨: ' + r.msg);
  ev('Store.user().collection["B1-17"] = 4');
  // 덱 만들기: 기본 덱에서 같은 종류(유닛) 카드를 빼고 id를 n장 (40장 유지)
  const mk = (g, put) => { const dk = ev(`Object.assign({}, STARTER_DECKS["${g}"])`);
    for (const [id, cnt] of Object.entries(put)) { let need = cnt - (dk[id] || 0); dk[id] = cnt;
      while (need > 0) { const v = Object.keys(dk).filter(x => !(x in put) && ev(`CARDS["${x}"].type`) === 'unit').sort((a, b) => dk[b] - dk[a])[0]; dk[v]--; if (!dk[v]) delete dk[v]; need--; } }
    return dk; };
  ctx.__d = mk('B1', { 'B1-17': 2 }); r = ev('Store.saveDeck(Store.user(), "B1", __d)'); ok(r.ok, '덱에 원래 카드 2장 저장: ' + (r.msg || ''));
  r = ev('Store.upgradeCard(null, "UP-B1-17")'); ok(!r.ok && col('B1-17') === 4, '덱에 든 2장은 재료로 못 씀 (4장 중 2장만 자유): ' + r.msg);
  ctx.__d = mk('B1', { 'B1-17': 1 }); ev('Store.saveDeck(Store.user(), "B1", __d)');
  r = ev('Store.upgradeCard(null, "UP-B1-17")'); ok(r.ok && col('B1-17') === 1 && col('UP-B1-17') === 1, '자유 3장 → 원래 1장 남고 강화 1장');
  ok(ev('Store.deck(Store.user(), "B1").cards["B1-17"]') === 1 && ev('Store.validateDeck(Store.user(), "B1", Store.deck(Store.user(), "B1").cards).ok'), '저장한 덱은 그대로 쓸 수 있음');
  r = ev('Store.upgradeCard(null, "UP-B1-17")'); ok(!r.ok, '강화 카드는 1장까지: ' + r.msg);
  ok(!ev('Store.buyCard(null, "UP-B1-17", 1).ok') && !ev('Store.sellCard(null, "UP-B1-17").ok') && ev('Store.sellable(Store.user(), "UP-B1-17")') === 0, '강화 카드는 사고팔 수 없음');
  // 덱에 1장
  ctx.__d2 = mk('B1', { 'B1-17': 1, 'UP-B1-17': 2 });
  ok(/1장까지/.test(ev('Store.validateDeck(Store.user(), "B1", __d2).msg') || ''), '덱에 2장 넣으면 거절');
  ctx.__d2 = mk('B1', { 'B1-17': 1, 'UP-B1-17': 1 });
  ok(ev('Store.validateDeck(Store.user(), "B1", __d2).ok'), '덱에 1장은 됨');
  ok(!ev('Store.upgradeCard(null, "UP-G2-22").ok'), '없는 깃발의 강화 카드는 안 됨');
  // 실제 대전: 강화 카드를 넣은 덱(전용 아이템도 장착하게)
  let errs = 0, games = 0, equipped = 0;
  for (const g of ['B1', 'A3', 'G2']) {
    const deck = Object.assign({}, STARTER_DECKS_OF(g));
    function STARTER_DECKS_OF(x) { return ev(`STARTER_DECKS["${x}"]`); }
    const upIds = ups.filter(u => u.g === g).map(u => u.id).slice(0, 3);
    for (const id of upIds) { const v = Object.keys(deck).filter(x => ev(`CARDS["${x}"].type`) === 'unit' && !ev(`CARDS["${x}"].limit`)).sort((a, b) => deck[b] - deck[a])[0]; deck[v]--; if (!deck[v]) delete deck[v]; deck[id] = 1; }
    for (let s = 0; s < 6; s++) {
      ctx.seed(500 + s + g.charCodeAt(0));
      try {
        const opp = ['G1', 'B2', 'A1'][s % 3];
        const gm = await ctx.playHeadless({ p0: { name: 'A', group: g, cards: deck, isAI: true, ai: 'normal' }, p1: { name: 'B', group: opp, cards: ev(`STARTER_DECKS["${opp}"]`), isAI: true, ai: 'normal' } });
        games++; if (gm.winner == null) errs++;
        for (const p of gm.players) for (const z of [p.field, p.burn || [], p.grave || []]) for (const it of z || []) if (it && it.item && ev(`!!CARDS["${it.id}"].base`)) equipped++;
      } catch (e) { errs++; console.log('   대전 오류', g, e.message); }
    }
  }
  // v3.29 없앤 강화 카드 돌려받기: 강화 1장 → 원래 카드 3장, 덱 · 초안의 강화 카드는 원래 카드로
  { ev('Store.register("돌려받는이", "pw", ["G1"])'); const u = 'Store.user()';
    ev(`${u}.collection["UP-G1-27"] = 1; ${u}.collection["G1-27"] = 1; ${u}.decks.G1.cards["UP-G1-27"] = 1; ${u}.drafts = { G1: { cards: { "UP-G1-27": 1 }, name: "", at: 0 } }; ${u}.fresh = { "UP-G1-27": 1 }`);
    const n1 = ev('Store.refundAllRetiredUpgrades()'), c = ev(`${u}.collection`), d = ev(`${u}.decks.G1.cards`), dr = ev(`${u}.drafts.G1.cards`);
    ok(n1 >= 1 && !c['UP-G1-27'] && c['G1-27'] === 1 + 3, '없앤 강화 카드 1장 → 원래 카드 3장: ' + c['G1-27']);
    ok(!d['UP-G1-27'] && d['G1-27'] >= 1 && !dr['UP-G1-27'] && dr['G1-27'] === 1 && !ev(`${u}.fresh["UP-G1-27"]`), '덱 · 초안의 강화 카드는 원래 카드로');
    ok(ev('Store.refundAllRetiredUpgrades()') === 0 && ev(`${u}.collection["G1-27"]`) === 4, '두 번째에는 할 일 없음'); }
  // v3.29.1 아주 뺀 8레벨 카드: 보유 · 덱에서 빠지고 상점 값을 돌려받음, 덱 자리는 같은 깃발 7레벨 카드로
  { ev('Store.register("8레벨이", "pw", ["B1"])'); const u = 'Store.user()';
    ok(ev('CARD_LIST.every(c => c.lv < 8 || gradeOf(c) === "special")'), '8레벨은 스페셜만(상점 · 보관함 목록)');
    ok(ev('GROUP_IDS.every(g => Object.keys(STARTER_DECKS[g]).every(id => !GONE_CARDS[id]) && Object.keys(HARD_DECKS[g] || {}).every(id => !GONE_CARDS[id]))'), '기본 덱 · 정예 덱에 뺀 카드 없음');
    ok(ev('GROUP_IDS.every(g => Object.values(STARTER_DECKS[g]).reduce((a, b) => a + b, 0) === 40)'), '기본 덱 40장');
    const g0 = ev(`Store.gold(${u})`), price = ev('shopPrice(CARDS["B1-38"])');
    ev(`${u}.collection["B1-38"] = 2; ${u}.collection["B1-36"] = 4; ${u}.decks.B1.cards["B1-38"] = 1; ${u}.decks.B1.cards["B1-36"] = 1`);
    const n1 = ev('Store.refundGoneCards(Store.user())');
    ok(n1 === 2 && !ev(`${u}.collection["B1-38"]`) && ev(`Store.gold(${u})`) === g0 + 2 * price, '뺀 카드 2장 → 상점 값 돌려받음: ' + (ev(`Store.gold(${u})`) - g0));
    ok(!ev(`${u}.decks.B1.cards["B1-38"]`) && ev(`${u}.decks.B1.cards["B1-36"]`) === 2, '덱의 뺀 카드 자리는 가진 7레벨 카드로');
    ok(ev('Store.refundGoneCards(Store.user())') === 0, '두 번째에는 할 일 없음'); }
  ok(errs === 0 && games === 18, `강화 카드 덱으로 실제 대전 ${games}판 오류 없음`);
  console.log(fail ? `실패 ${fail} / ${n}` : `모두 통과 (${n}개)`);
  process.exit(fail ? 1 : 0);
})();

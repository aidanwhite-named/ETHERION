// 성로 순례(js/pilgrim.js · js/pilgrim-rules.js, v3.25 · v3.26) 규칙 시험 — 화면 없이. node tools/pilgrim/test.js
// 날짜 넘김 · 수요일 리셋 · 첫 승 보상(받기 / 뽑기) · 하루 9판 · 완주 · 이정표 · 상대 덱 · 뽑기 확률 · 실제 한 판
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js', 'level.js', 'pilgrim-rules.js', 'aideck.js', 'pilgrimtext.js', 'pilgrim.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
const ev = s => ctx.ev(s);
const at = (y, mo, d, h) => new Date(y, mo - 1, d, h == null ? 12 : h).getTime();
const setNow = t => { ctx.__now = t; ev('Pilgrim.now = () => __now'); };
const fight = (f, won) => { const cfg = ev(`Pilgrim.begin("${f}")`); if (!cfg) return null; ctx.__g = { winner: won ? 0 : 1, cfg }; ev('Pilgrim.onEnd(__g)'); return cfg; };
(async () => {
  ev('Store.register("순례자", "pw", ["B1", "G2"])');
  const gold0 = ev('Store.gold()');
  // 2026-11-10은 화요일, 11은 수요일
  ok(ev('pilWeekKey(' + at(2026, 11, 10) + ')') === '2026-11-04', '화요일의 주 = 지난 수요일(11-04): ' + ev('pilWeekKey(' + at(2026, 11, 10) + ')'));
  ok(ev('pilWeekKey(' + at(2026, 11, 11, 0) + ')') === '2026-11-11', '수요일 0시부터 새 주');
  ok(ev('pilWeekKey(' + at(2026, 11, 17, 23) + ')') === '2026-11-11', '다음 화요일 밤까지 같은 주');

  // ── 첫날(수요일): 길 · 상대 덱 · 첫 승
  setNow(at(2026, 11, 11));
  let p = ev('Pilgrim.get()');
  ok(p.stage === 0 && p.fights === 0 && !p.route && p.week === '2026-11-11', '새 상태');
  let cfg = fight('B1', false);
  p = ev('Pilgrim.get()');
  ok(p.route.length === 8 && !p.route.includes('B1') && new Set(p.route).size === 8, '길 = 내 깃발을 뺀 여덟 깃발');
  ok(p.route.slice(0, 6).every(g => g[0] !== 'B') && p.route.slice(6).every(g => g[0] === 'B'), '다른 두 진영 여섯 → 내 진영 둘: ' + p.route.join(','));
  ok(p.fights === 1 && p.stage === 0 && !p.pend && p.steps === 0, '진 판: 판 수만 세고 제자리');
  ok(cfg.pil && cfg.econRate === 0.01 && cfg.p1.ai === 'hard' && cfg.p1.group === p.route[0], '대전 설정');
  const cnt = c => Object.values(c).reduce((a, b) => a + b, 0);
  ok(cnt(cfg.p1.cards) === 40 && Object.keys(cfg.p1.cards).every(id => ev(`CARDS["${id}"].group`) === p.route[0]), '상대 덱 40장 · 그 깃발 카드만');
  const sc = ev(`deckScore(${JSON.stringify(cfg.p1.cards)}).total / deckScore(STARTER_DECKS["${p.route[0]}"]).total`);
  ok(Math.abs(sc - 1.00) < 0.02, '첫 관문 상대 = 기본 덱의 100% (내 덱 100%, v3.35): ' + sc.toFixed(3));
  const cfg2 = fight('B1', true);
  ok(JSON.stringify(cfg2.p1.cards) === JSON.stringify(cfg.p1.cards), '같은 관문에 다시 서면 같은 상대 덱');
  p = ev('Pilgrim.get()');
  ok(p.stage === 1 && p.first && p.pend && p.pend.gold === 500 && p.steps === 1, '첫 승: 보상 대기 · 1걸음');
  ok(ev('Pilgrim.begin("B1")') === null, '보상을 고르기 전에는 다음 판을 못 시작');
  ev('Pilgrim.keep()');
  ok(ev('Store.gold()') === gold0 + 500, '받기 = +500');
  ev('Pilgrim.keep()'); ok(ev('Store.gold()') === gold0 + 500, '두 번 받을 수 없음');
  ok(ev('Pilgrim.gamble()') === null, '받은 뒤에는 뽑기 없음');
  // 다른 깃발 덱으로도 싸울 수 있다
  cfg = fight('G2', true); ok(cfg && cfg.p0.group === 'G2' && ev('Pilgrim.get()').stage === 2, '다른 깃발 덱으로 다음 관문');
  for (let i = 0; i < 6; i++) fight('B1', true);
  p = ev('Pilgrim.get()'); ok(p.stage === 8 && p.fights === 9, '여덟 관문 통과에 9판(1패 포함): stage ' + p.stage + ' fights ' + p.fights);
  const cap = ev('PILGRIM.fights'); ok(cap === 12, '하루 판 수 12');
  while (ev('Pilgrim.get()').fights < cap) fight('B1', false);
  p = ev('Pilgrim.get()'); ok(p.fights === cap && p.stage === 8, '숲에서 계속 지면 판 수만 준다');
  ok(ev('Pilgrim.begin("B1")') === null && !ev('Pilgrim.canFight(Pilgrim.get())'), '하루 판 수를 다 쓰면 끝');
  ok(ev('Store.gold()') === gold0 + 500, '둘째 판부터는 순례 보너스 없음(전투 정산만)');

  // ── 둘째 날: 한 번도 안 지고 완주, 첫 승은 고르지 않고 둠
  setNow(at(2026, 11, 12));
  p = ev('Pilgrim.get()'); ok(p.stage === 0 && p.fights === 0 && !p.route && p.steps === 1, '자정이 지나면 새 길, 걸음은 그대로');
  let g1 = ev('Store.gold()');
  fight('B1', true); ev('Pilgrim.keep()');
  for (let i = 0; i < 7; i++) fight('B1', true);
  cfg = ev('Pilgrim.begin("B1")');
  { const r = cfg && ev('deckScore')(cfg.p1.cards).total / ev('deckScore')(cfg.p0.cards).total;
    ok(cfg && cfg.p1.name === '비친 나' && cfg.p1.group === 'B1' && Math.abs(r - 1.05) < 0.03, '아홉째 = 내 깃발 · 내 덱의 105%인 비친 나 (v3.35): ' + (r || 0).toFixed(3)); }
  ctx.__g = { winner: 0, cfg }; ev('Pilgrim.onEnd(__g)');
  p = ev('Pilgrim.get()');
  ok(p.stage === 9 && p.tot.done === 1 && ev('Store.gold()') === g1 + 500 + 300, '완주 보너스 +300 (뽑기 없음)');
  ok(!ev('Pilgrim.canFight(Pilgrim.get())'), '완주하면 그날은 끝');

  // ── 셋째 날: 첫 승 보상을 고르지 않고 다음 날로 → 조각으로 들어옴. 3걸음 이정표
  setNow(at(2026, 11, 13)); g1 = ev('Store.gold()');
  fight('B1', true); p = ev('Pilgrim.get()');
  ok(p.steps === 3 && p.claimed.includes(3) && ev('Store.gold()') === g1 + 300, '3걸음 이정표 +300');
  setNow(at(2026, 11, 14)); p = ev('Pilgrim.get()');
  ok(!p.pend && ev('Store.gold()') === g1 + 300 + 500, '고르지 않은 첫 승 보상은 다음 날 조각으로');
  // ── 4 · 5걸음(고급 카드) · 6 · 7걸음(레어 이상)
  const colN = () => ev('Object.values(Store.user().collection).reduce((a, b) => a + b, 0)');
  fight('B1', true); ev('Pilgrim.keep()');
  setNow(at(2026, 11, 15)); let c0 = colN(); fight('B1', true); ev('Pilgrim.keep()');
  p = ev('Pilgrim.get()'); let nw = p.news.find(x => x.k === 'step' && x.n === 5);
  ok(p.steps === 5 && nw && nw.grade === 'uncommon' && ev(`gradeOf("${nw.card}")`) === 'uncommon' && colN() === c0 + 1, '5걸음: 고급 카드 1장');
  ok(nw && ['B1', 'G2'].includes(ev(`CARDS["${nw.card}"].group`)), '가진 깃발의 카드: ' + (nw && nw.card));
  setNow(at(2026, 11, 16)); fight('B1', true); ev('Pilgrim.keep()');
  setNow(at(2026, 11, 17)); c0 = colN(); fight('B1', true); ev('Pilgrim.keep()');
  p = ev('Pilgrim.get()'); nw = p.news.find(x => x.k === 'step' && x.n === 7);
  ok(p.steps === 7 && nw && ['rare', 'epic', 'unique'].includes(nw.grade) && colN() === c0 + 1, '7걸음: 레어 이상 1장 (' + (nw && nw.grade) + ')');
  // ── 수요일: 새 주
  setNow(at(2026, 11, 18)); p = ev('Pilgrim.get()');
  ok(p.week === '2026-11-18' && p.steps === 0 && p.claimed.length === 0 && p.weekN === 1 && p.tot.days === 7, '수요일에 걸음 · 이정표 리셋, 주 번호 +1');

  // ── 뽑기(v3.26): 꽝 없이 늘 카드 한 장, 스페셜 없음
  let hit = 0; g1 = ev('Store.gold()'); c0 = colN(); const seen = {};
  for (let d = 0; d < 400; d++) {
    setNow(at(2027, 1, 1) + d * 86400e3); fight('B1', true);
    const r = ev('Pilgrim.gamble()');
    ok(r && r.k === 'card' && ['common', 'uncommon', 'rare', 'epic', 'unique'].includes(r.grade) && r.id && ev(`gradeOf("${r.id}")`) === r.grade, '뽑기는 늘 카드: ' + JSON.stringify(r));
    if (r && r.k === 'card') { hit++; seen[r.grade] = (seen[r.grade] || 0) + 1; }
  }
  console.log(`  뽑기 400번: 카드 ${hit} · 등급 ${JSON.stringify(seen)}`);
  ok(hit === 400, '400번 모두 카드');
  ok(ev('Pilgrim.get().tot.rolls') >= 400, '뽑기 횟수 기록');
  ok(ev('Store.user().ledger.every(x => x.why !== "순례 첫 승" || x.at < ' + at(2027, 1, 1, 0) + ')'), '걸면 첫 승 조각은 받지 않음');
  // 확률표 자체 (20만 번)
  const dist = ev('(function () { const o = {}; for (let i = 0; i < 200000; i++) { const g = pilRollGrade(PILGRIM.gamble) || "none"; o[g] = (o[g] || 0) + 1; } return o; })()');
  const pc = g => (dist[g] || 0) / 2000;
  console.log(`  확률표 20만 번: 일반 ${pc('common').toFixed(2)}% · 고급 ${pc('uncommon').toFixed(2)}% · 레어 ${pc('rare').toFixed(2)}% · 에픽 ${pc('epic').toFixed(2)}% · 유니크 ${pc('unique').toFixed(3)}% · 없음 ${pc('none')}%`);
  ok(Math.abs(pc('common') - 80) < 0.6 && Math.abs(pc('uncommon') - 14.5) < 0.5 && Math.abs(pc('rare') - 4) < 0.3 && Math.abs(pc('epic') - 1.2) < 0.15 && Math.abs(pc('unique') - 0.3) < 0.08 && !dist.none && !dist.special, '확률 80 / 14.5 / 4 / 1.2 / 0.3, 꽝 · 스페셜 없음');
  ok(Math.abs(ev('Object.values(PILGRIM.gamble).reduce((a, b) => a + b, 0)') - 1) < 1e-9, '확률 합 = 1');

  // ── 하루 한 번 검사(Store.pilgrimClaim): 같은 날 두 번 · 서버의 오늘/어제 밖 · 시계를 돌려도
  ev('Store.register("시계꾼", "pw", ["A1"])');
  let gc = ev('Store.gold()');
  let r = ev('Store.pilgrimClaim(null, "keep", "2030-05-05", ["2030-05-05", "2030-05-04"])');
  ok(r.ok && r.k === 'gold' && ev('Store.gold()') === gc + 500, '서버의 오늘: 받음');
  r = ev('Store.pilgrimClaim(null, "gamble", "2030-05-05", ["2030-05-05", "2030-05-04"])');
  ok(!r.ok && r.dup && ev('Store.gold()') === gc + 500, '같은 날 두 번째(뽑기로 바꿔도): 거절');
  r = ev('Store.pilgrimClaim(null, "keep", "2030-05-06", ["2030-05-05", "2030-05-04"])');
  ok(!r.ok && r.clock, '기기 시계를 내일로: 거절 — ' + r.msg);
  r = ev('Store.pilgrimClaim(null, "keep", "2030-05-01", ["2030-05-05", "2030-05-04"])');
  ok(!r.ok && r.clock, '기기 시계를 며칠 전으로: 거절');
  r = ev('Store.pilgrimClaim(null, "gamble", "2030-05-04", ["2030-05-05", "2030-05-04"])');
  ok(r.ok && r.k === 'card', '어제 고르지 않고 넘긴 보상(어제 날짜): 받음');
  r = ev('Store.pilgrimClaim(null, "keep", "2030-05-04", ["2030-05-05", "2030-05-04"])');
  ok(!r.ok && r.dup, '어제 것도 두 번은 안 됨');
  ok(ev('JSON.stringify(Store.user().pilClaim.days)') === '["2030-05-04","2030-05-05"]', '받은 날 기록');
  // 화면 쪽: 서버가 거절하면 보상이 사라지고 이유가 남는다
  ev('Store.login("순례자", "pw")');
  setNow(at(2031, 2, 2)); fight('B1', true);
  ctx.__realClaim = ev('Store.pilgrimClaim');
  ev('Store.pilgrimClaim = () => ({ ok: false, dup: true, msg: "이미 받았습니다(서버)" })');
  gc = ev('Store.gold()'); r = ev('Pilgrim.keep()');
  p = ev('Pilgrim.get()');
  ok(r.ok === false && !p.pend && p.firstResult.k === 'denied' && ev('Store.gold()') === gc, '서버 거절 → 보상 사라짐 · 이유 남음');
  setNow(at(2031, 2, 3)); fight('B1', true);
  ev('Store.pilgrimClaim = () => ({ ok: false, net: true, msg: "서버에 닿지 않음" })');
  r = ev('Pilgrim.gamble()'); p = ev('Pilgrim.get()');
  ok(r.ok === false && p.pend, '서버에 닿지 않음 → 보상을 그대로 둠(다시 누를 수 있음)');
  ev('Store.pilgrimClaim = __realClaim');
  r = ev('Pilgrim.gamble()'); ok(r && r.k === 'card', '다시 누르면 받음');

  // ── 순례기: 소문 · 숲 · 동쪽의 기록 · 지난 주
  ev('Store.register("이야기꾼", "pw", ["G2"])');
  setNow(at(2032, 6, 2));
  for (let i = 0; i < 9; i++) { fight('G2', true); if (i === 0) ev('Pilgrim.keep()'); }
  p = ev('Pilgrim.get()');
  ok(p.stage === 9 && ev('Pilgrim.heard(Pilgrim.get())') === 8 && p.lore.forest && !p.lore.G2, '하루 완주: 소문 8 (내 깃발 G2 빼고) · 숲');
  ok(p.lore.truth === p.day && p.news.some(n => n.k === 'truth') && p.news.filter(n => n.k === 'lore').length === 8, '소문 8 + 숲 → 동쪽의 기록 열림');
  setNow(at(2032, 6, 9)); p = ev('Pilgrim.get()');
  ok(p.book.length === 1 && p.book[0].steps === 1 && p.book[0].week === '2032-06-02' && p.steps === 0, '수요일: 지난 주의 걸음이 순례기로');
  ok(p.lore.B1 && p.lore.truth, '소문은 주가 바뀌어도 남음');
  ev('if (typeof groupEmblem === "undefined") globalThis.groupEmblem = g => "<span class=emblem>" + g + "</span>"; if (typeof esc === "undefined") globalThis.esc = x => String(x).replace(/[&<>"]/g, "");');   // 화면 도구 대신
  const bookHTML = ev('pilBookHTML(Pilgrim.get())');
  ok(/동쪽의 기록/.test(bookHTML) && /들은 소문/.test(bookHTML) && !/undefined|NaN/.test(bookHTML), '순례기 글에 빈 값 없음');
  const mapHTML = ev('pilMapHTML(Pilgrim.get(), "G2")');
  ok(/pg-map-svg/.test(mapHTML) && !/undefined|NaN/.test(mapHTML), '지도(길 전) 빈 값 없음');
  fight('G2', false);
  const mapHTML2 = ev('pilMapHTML(Pilgrim.get(), "G2")');
  ok((mapHTML2.match(/pgm-leg/g) || []).length === 9 && (mapHTML2.match(/pgm-node /g) || []).length + (mapHTML2.match(/pgm-node"/g) || []).length >= 8 && !/undefined|NaN/.test(mapHTML2), '지도(길 위): 환석 → 여덟 관문 → 숲 = 길 9개');

  // ── 판 끝의 행운(v3.27): 0.1% 카드 · 0.7% 500 조각
  {
    ev('LevelUI.levelUp = () => {}; LevelUI.banner = () => {}; LevelUI.paint = () => {};');   // 화면 없음
    const g0 = ev('Store.gold()');
    let r = ev('econLucky(Store.user(), 0.0005)'); ok(r && r.k === 'card' && r.id && ['common', 'uncommon', 'rare', 'epic', 'unique'].includes(r.grade), '행운 0.1%: 카드 ' + JSON.stringify(r));
    const g1 = ev('Store.gold()') - (r.gold || 0);
    r = ev('econLucky(Store.user(), 0.004)'); ok(r && r.k === 'gold' && r.gold === 500 && ev('Store.gold()') === g1 + 500 + 0, '행운 0.7%: 500 조각');
    ok(ev('econLucky(Store.user(), 0.0081)') === null && ev('econLucky(Store.user(), 0.5)') === null, '나머지는 없음');
    const d = ev('(function () { const o = { card: 0, gold: 0, none: 0 }; const u = Store.user(); const real = Store.grantCard; Store.grantCard = () => true; for (let i = 0; i < 100000; i++) { const x = econLucky(u); o[x ? x.k : "none"]++; } Store.grantCard = real; return o; })()');
    console.log(`  행운 10만 판: 카드 ${d.card} (기대 100) · 500 조각 ${d.gold} (기대 700)`);
    ok(d.card > 60 && d.card < 145 && d.gold > 610 && d.gold < 790, '행운 확률 범위');
  }
  // ── 전투 조각 배수(v3.26): 컴퓨터 0.1% · 온라인 0.5% · 순례 0.5%, 경험치는 그대로
  ok(ev('econRate({ cfg: {}, mode: "ai" })') === 0.005 && ev('econRate({ cfg: {}, mode: "online", online: true })') === 0.01 && ev('econRate({ cfg: {}, mode: "hotseat" })') === 0.005 && ev('econRate({ cfg: { econRate: PILGRIM.battleRate }, mode: "ai" })') === 0.01, '배수: 컴퓨터 0.5% · 온라인 1% · 한 화면 0.5% · 순례 1%');
  {
    const xp0 = ev('Store.xp()'), gd0 = ev('Store.gold()');
    ctx.__eg = { cfg: { mode: 'ai' }, mode: 'ai', winner: 0, econ: ev('newEcon()') };
    ev('econBreak(__eg, [{ id: "B1-07" }, { id: "B1-15" }, { id: "B1-26" }])');
    const st = ev('econSettle(__eg)');
    const broken = st.broken, full = broken * 0.02 + broken * 2;
    ok(st.rate === 0.005 && st.xp === Math.round(broken * 2) + Math.round(broken * 0.02), '정산: 배수 · 경험치 기록 ' + JSON.stringify(st));
    const lk = st.lucky && st.lucky.k === 'gold' ? st.lucky.gold : 0;
    ok(Math.abs((ev('Store.gold()') - gd0 - lk) - full * 0.005) <= 2, `컴퓨터 판 조각 = 0.5% (${ev('Store.gold()') - gd0} ≈ ${(full * 0.005).toFixed(1)})`);
    ok(Math.abs((ev('Store.xp()') - xp0 - lk) - full) <= 2, `경험치는 원래 값 (${ev('Store.xp()') - xp0} ≈ ${full})`);
  }

  ev('Store.login("순례자", "pw")');
  // ── 전투 중에 나감 · 자정을 넘긴 판
  setNow(at(2028, 3, 1, 23)); ev('Pilgrim.get()'); cfg = ev('Pilgrim.begin("B1")');
  setNow(at(2028, 3, 2, 0)); p = ev('Pilgrim.get()'); ok(p.day === '2028-03-01' && p.cur, '싸우는 중에는 날을 넘기지 않음');
  ctx.__g = { winner: 0, cfg }; ev('Pilgrim.onEnd(__g)'); p = ev('Store.user().pilgrim'); ok(p.pend && p.stage === 1, '자정을 넘겨 끝난 판은 시작한 날의 것');
  p = ev('Pilgrim.get()'); ok(p.day === '2028-03-02' && p.stage === 0 && !p.pend, '그다음에 새 길 (보상은 조각으로)');
  ev('Pilgrim.begin("B1")'); ev('Pilgrim.dropCur()'); p = ev('Pilgrim.get()'); ok(!p.cur && p.fights === 1 && p.stage === 0 && p.last.left, '전투 중에 나가면 진 판');

  // ── 실제 한 판: 순례 설정으로 화면 없이 (사람 자리는 어려움 컴퓨터가 대신)
  setNow(at(2029, 1, 3)); ev('Pilgrim.get()');
  let w = 0, br = 0; const N = 12;
  for (let i = 0; i < N; i++) {
    setNow(at(2029, 1, 3) + i * 86400e3); ctx.seed(300 + i);
    cfg = ev('Pilgrim.begin("B1")'); cfg.p0.isAI = true; cfg.p0.ai = 'hard';
    const g = await ctx.playHeadless(cfg); ctx.__g = g; ev('Pilgrim.onEnd(__g)'); ev('Pilgrim.keep()');
    if (g.winner === 0) w++; br += g.econ.broken * (g.winner === 0 ? 2 : 0.5) * 0.01;   // 순례 배수
  }
  console.log(`  실제 대전 ${N}판(첫 관문, 내 덱 = 기본 덱, 양쪽 어려움): 내 쪽 ${w}승 · 판당 전투 정산 평균 ${Math.round(br / N)} 조각`);
  ok(w >= 3, '첫 관문(상대 90%)은 이길 만함');
  console.log('  점수 구간별 기록:', JSON.stringify(ev('Pilgrim.report()').slice(0, 3)));
  console.log(fail ? `실패 ${fail} / ${n}` : `모두 통과 (${n}개)`);
  process.exit(fail ? 1 : 0);
})();

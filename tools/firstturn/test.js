/* 2026-11-22 첫 턴 규칙 시험: 시작 에테르 0 · 첫 턴부터 결정화 · 결정 최대 13 · 턴 시간 46초
   node tools/firstturn/test.js
   - 판이 시작되면 양쪽 에테르 0 · 결정 0 · 결정화 한도 1
   - 결정화하면 바로 에테르 +1, 그 에테르로 Lv 1 카드를 낼 수 있다. 결정화 전에는 못 낸다(이유 글에 결정화 안내)
   - 컴퓨터(보통 · 어려움)는 선공이든 후공이든 첫 턴에 결정화한다. 판은 끝까지 간다(멈추지 않는다) */
const fs = require("fs"), path = require("path");
const { load } = require("../balance/harness");
const dir = path.join(__dirname, "..", "..", "js");
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log("FAIL", m); } };

const H = load(dir, `
  this.T = { RULES, etherTotal: p => etherTotal(p), ether: p => ether(p), crysLeft: p => crysLeft(p), crysOpen: p => crysOpen(p), canPlay: (p, id) => canPlay(p, CARDS[id] || C({ id })),
    actCrystal: (p, uid) => actCrystal(p, uid), C: it => C(it), start: cfg => startMatch(Object.assign({ mode: "ai", speed: 0, headless: true }, cfg)) };
  this.FIRST = [];
  const _ac = actCrystal; actCrystal = function (p, uid) { const r = _ac(p, uid); if (r) FIRST.push({ turn: G.turn, idx: p.idx }); return r; };`);
const T = H.T, D = H.ev("STARTER_DECKS"), GIDS = H.ev("GROUP_IDS");

// 규칙 값
ok(T.RULES.essence === 0, "RULES.essence = 0");
ok(T.RULES.maxCrystals === 13, "RULES.maxCrystals = 13 (에테르 최대 13 그대로)");
const src = fs.readFileSync(path.join(dir, "game.js"), "utf8");
ok(/const TURN_LIMIT_MS = 46000;/.test(src), "턴 시간 46초");
ok(!/준비 단계마다 30초\./.test(src), "설정 글에 30초가 남아 있지 않다");

(async () => {
  // 판 시작 상태 (멀리건 전 — startMatch 직후)
  H.seed(7);
  const g = T.start({ seed: 4242, p0: { name: "A", group: "B1", cards: D.B1, isAI: true }, p1: { name: "B", group: "G1", cards: D.G1, isAI: true } });
  for (const p of g.players) {
    ok(p.crystals.length === 0, `P${p.idx} 시작 결정 0`);
    ok(T.etherTotal(p) === 0, `P${p.idx} 시작 에테르 0 (실제 ${T.etherTotal(p)})`);
    ok(T.crysLeft(p) === 1, `P${p.idx} 첫 턴 결정화 한도 1 (실제 ${T.crysLeft(p)})`);
  }
  ok(g.phase === "atkPrep" && g.turn === 1, "1턴 공격 준비로 시작");
  const A = g.players[g.attacker], Dn = g.players[1 - g.attacker];
  ok(T.crysOpen(A) && !T.crysOpen(Dn), "공격 준비: 공격자만 결정화할 수 있다");
  // 결정화 전에는 아무 유닛도 못 내고, 이유 글이 결정화를 알려 준다
  const lv1 = A.hand.find(it => { const c = T.C(it); return c.type === "unit" && c.lv === 1; }), any = A.hand.find(it => T.C(it).type === "unit");
  if (any) { const why = H.ev("canPlay")(A, T.C(any)); ok(/에테르가 부족/.test(why || "") && /결정화하면/.test(why || ""), "에테르 0: 낼 수 없고 결정화 안내가 붙는다 — " + why); }
  // 결정화 → 바로 에테르 1
  const burnIt = A.hand.filter(it => it !== lv1).sort((x, y) => T.C(y).lv - T.C(x).lv)[0];
  ok(T.actCrystal(A, burnIt.uid) === true, "첫 턴 결정화 성공");
  ok(T.etherTotal(A) === 1 && T.ether(A) === 1, "결정화 뒤 바로 에테르 1");
  ok(T.crysLeft(A) === 0 && !T.crysOpen(A), "한 턴 1장 — 한도 다 씀");
  ok(A.burn.length === 1 && A.hand.length === T.RULES.handSize - 1, "바친 카드는 소각장으로");
  if (lv1) ok(!H.ev("canPlay")(A, T.C(lv1)), "에테르 1로 Lv 1 유닛을 낼 수 있다");
  ok(T.actCrystal(A, A.hand[0].uid) === false, "같은 턴 두 번째 결정화는 안 됨");

  // 컴퓨터끼리 끝까지: 양쪽 다 첫 준비 차례(1턴)에 결정화한다 · 판이 끝난다
  let games = 0, bothFirst = 0, ended = 0, t1Play = 0;
  for (const ai of ["normal", "hard"]) for (let i = 0; i < 9; i++) {
    const a = GIDS[i], b = GIDS[(i * 4 + 3) % 9];
    H.seed(300 + i); H.FIRST.length = 0;
    const r = await H.playHeadless({ seed: 9000 + i * 13, p0: { name: "A", group: a, cards: D[a], isAI: true, ai }, p1: { name: "B", group: b, cards: D[b], isAI: true, ai } });
    games++;
    const f = H.FIRST.filter(e => e.turn === 1).map(e => e.idx);
    if (f.includes(0) && f.includes(1)) bothFirst++; else console.log(`  ${ai} ${a} vs ${b}: 1턴 결정화 ${JSON.stringify(f)}`);
    if (r.phase === "over" && (r.winner === 0 || r.winner === 1)) ended++;
    if (r.players.some(p => p.crystals.length > T.RULES.maxCrystals)) ok(false, "결정이 최대를 넘음");
  }
  ok(bothFirst === games, `컴퓨터가 1턴에 양쪽 다 결정화 ${bothFirst}/${games}`);
  ok(ended === games, `판이 끝까지 감 ${ended}/${games}`);
  console.log(fail ? `✗ 실패 ${fail}개 / ${n}개` : `✓ ${n}개 모두 통과`);
  process.exit(fail ? 1 : 0);
})();

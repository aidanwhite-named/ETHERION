/* v3.40 서버 검산 시험: 컴퓨터끼리 한 판을 기록하며 두고(0번의 수를 G.vlog에), 그 기록으로 0번을 "사람"으로 다시 둬서 같은 판이 나오는지 본다.
   node tools/replay_check.js [판 수=20] [hard]  →  승패 · 턴 · 부서진 카드가 모두 같으면 통과 */
const path = require("path");
const { load } = require("./balance/harness");
const N = +(process.argv[2] || 20), AI = process.argv.includes("hard") ? "hard" : "normal";
const ctx = load(path.join(__dirname, "..", "js"), `
  /* 0번 = 무작위를 쓰지 않는 단순한 사람 흉내: 낼 수 있는 유닛 · 아이템을 앞에서부터, 결정화 한 장 */
  humanPrep = async function (p) {
    if (crysLeft(p) > 0 && p.hand.length > 3) { const c = p.hand.slice().sort((x, y) => C(y).lv - C(x).lv)[0]; actCrystal(p, c.uid); }
    for (const it of p.hand.slice()) {
      const c = C(it); if (canPlay(p, c)) continue;
      if (c.type === "unit") actPlace(p, it.uid, null);
      else if (c.type === "item") { const s = p.field.findIndex(u => u && C(u).type === "unit" && !u.item); if (s >= 0) actEquip(p, it.uid, s); }
    }
  };
  this.getG = () => G;`);
const D = ctx.ev("STARTER_DECKS"), GIDS = ctx.ev("GROUP_IDS");
(async () => {
  let ok = 0;
  for (let i = 0; i < N; i++) {
    const a = GIDS[i % 9], b = GIDS[(i * 4 + 3) % 9], seed = (123457 + i * 7919) >>> 0;
    ctx.seed(1000 + i);
    const g1 = await ctx.playHeadless({ seed, verify: true, p0: { name: "A", group: a, cards: D[a], isAI: false }, p1: { name: "B", group: b, cards: D[b], isAI: true, ai: AI } });
    const log = g1.vlog.slice(), r1 = { w: g1.winner, t: g1.turn, b: g1.broken.join(",") };
    ctx.seed(55555 + i);   // 다른 Math.random 흐름 — 판 결과에 Math.random이 섞이면 어긋난다
    const g2 = await ctx.playHeadless({ seed, verify: true, replay: log.slice(), replayAll: log.slice(), p0: { name: "A", group: a, cards: D[a], isAI: false }, p1: { name: "B", group: b, cards: D[b], isAI: true, ai: AI } });
    const r2 = { w: g2.winner, t: g2.turn, b: g2.broken.join(",") };
    const same = r1.w === r2.w && r1.t === r2.t && r1.b === r2.b;
    if (same) ok++; else console.log(`✗ ${i} ${a} vs ${b}: 기록 판 승자 ${r1.w} 턴 ${r1.t} 부서짐 ${g1.broken.length} / 다시 둔 판 승자 ${r2.w} 턴 ${r2.t} 부서짐 ${g2.broken.length}`);
  }
  console.log(`${AI}: ${ok} / ${N}판 같음`);
  process.exit(ok === N ? 0 : 1);
})();

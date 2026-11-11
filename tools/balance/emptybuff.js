// 컴퓨터가 헛되이 놓은 마법을 센다 (v3.24.4)
//  - 빈 전장: 아군 유닛이 하나도 없는데 아군에게 거는 효과가 든 마법을 놓고 준비를 끝냄
//  - 헛마법: 준비가 끝난 판에서 그 마법을 빼고 같은 씨앗으로 굴려도 결과가 같거나 더 좋음 (이득 ≤ 0.05)
// node tools/balance/emptybuff.js [js dir] [단체 쌍마다 판 수=2] [난이도=normal] [단체들]
const path = require('path'); const { load } = require('./harness');
(async () => {
  const dir = path.resolve(process.argv[2] || path.join(__dirname, '../../js')); const N = +process.argv[3] || 2;
  const diff = process.argv[4] || 'normal'; const GS = (process.argv[5] || 'B1,B2,B3,G1,G2,G3,A1,A2,A3').split(',');
  const ctx = load(dir);
  ctx.ev(`var EB = { preps: 0, empty: 0, placed: 0, waste: 0, names: {} };
    (function () {
      const hasAlly = c => c.ops && c.ops.some(o => o.side === "ally");
      const run = (p, seeds) => { let s = 0; for (const seed of seeds) { const before = G.players.map(q => cloneSide(q, false)); const P = JSON.parse(JSON.stringify(before)); runCombatCore(ctx(P, G.attacker, G.turn, null, { seed, rules: G.rules })); s += evalScore(before, P, p.idx); } resetRng(); return s / seeds.length; };
      const wrap = f => async function (p) {
        const had = new Set(p.field.filter(it => it && isSpell(it)).map(it => it.uid));
        const r = await f(p); EB.preps++;
        const sp = p.field.filter(it => it && isSpell(it) && !had.has(it.uid));
        if (!sp.length) return r;
        EB.placed += sp.length;
        const noUnit = !p.field.some(it => isUnit(it));
        const seeds = [11, 7930, 15849, 23768, 31687, 39606];
        const withAll = run(p, seeds);
        for (const it of sp) {
          const _e = noUnit && hasAlly(C(it));
          const s = p.field.indexOf(it); p.field[s] = null; const g = withAll - run(p, seeds); p.field[s] = it;
          if (g <= 0.05) { if (_e) EB.empty++; EB.waste++; EB.names[C(it).name] = (EB.names[C(it).name] || 0) + 1; }
        }
        return r;
      };
      aiPrep = wrap(aiPrep); if (typeof aiPrepHard !== "undefined") aiPrepHard = wrap(aiPrepHard);
    })();`);
  let games = 0; const t0 = Date.now();
  for (const a of GS) for (const b of GS) for (let i = 0; i < N; i++) {
    ctx.seed(5000 + i); const S = ctx.ev('STARTER_DECKS');
    await ctx.playHeadless({ p0: { name: 'A', group: a, cards: S[a], isAI: true, ai: diff }, p1: { name: 'B', group: b, cards: S[b], isAI: true, ai: diff } });
    games++;
  }
  const EB = ctx.ev('EB');
  console.log(`${diff} · ${games}판 · 놓은 마법 ${EB.placed}장 · 헛마법 ${EB.waste}장 (${(EB.waste / Math.max(1, EB.placed) * 100).toFixed(1)}%) · 그중 빈 전장 ${EB.empty}장 · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log('  ' + Object.entries(EB.names).sort((x, y) => y[1] - x[1]).slice(0, 12).map(([n, k]) => `${n} ${k}`).join(' · '));
})();

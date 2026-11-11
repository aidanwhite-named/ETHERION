// 컴퓨터 '어려움'의 생각하는 시간(js/aihard.js THINK, v3.24.4)을 화면 없이 재 본다.
// node tools/balance/think.js [js dir] [판 수=12] [기기 느림 배수=1] [상대 난이도=normal]
//  - 느림 배수 8 = 이 컴퓨터보다 8배 느린 기기인 척(시계를 8배 빨리 돌림). 턴마다 쓴 계산 시간 · 굴린 횟수 · 경우의 수를 찍는다.
//  - 맨 끝 줄: 시간 맞춤 어려움이 상대를 이긴 비율(같은 씨앗으로 고정 10번 굴림과 견줄 때는 배수 0).
const path = require('path'); const { load } = require('./harness');
(async () => {
  const dir = path.resolve(process.argv[2] || path.join(__dirname, '../../js')); const N = +process.argv[3] || 12;
  const slow = process.argv[4] == null ? 1 : +process.argv[4]; const other = process.argv[5] || 'normal';
  const ctx = load(dir);
  if (process.env.THINK) ctx.ev('(function(o){ Object.assign(THINK, o); })')(JSON.parse(process.env.THINK));
  if (slow > 0) { ctx.performance = { now: () => Number(process.hrtime.bigint()) / 1e6 * slow }; }
  ctx.ev(`var TH = { turns: [], picks: [] };
    (function () {
      ${slow > 0 ? 'HT.live = true;' : ''}
      const s0 = hardSims; hardSims = function (K) { const n = s0(K); TH.picks.push([K, n]); return n; };
      const p0 = aiPrepHard; aiPrepHard = async function (p) { const r = await p0(p); TH.turns.push(HT.used); return r; };
    })();`);
  const GS = ['B1', 'B2', 'B3', 'G1', 'G2', 'G3', 'A1', 'A2', 'A3']; let w = 0; const t0 = Date.now();
  for (let i = 0; i < N; i++) {
    ctx.seed(9000 + i); const S = ctx.ev('STARTER_DECKS'); const a = GS[i % 9], b = GS[(i * 4 + 3) % 9], swap = i % 2 === 1;
    const pa = { name: 'A', group: a, cards: S[a], isAI: true, ai: 'hard' }, pb = { name: 'B', group: b, cards: S[b], isAI: true, ai: other };
    const g = await ctx.playHeadless(swap ? { p0: pb, p1: pa } : { p0: pa, p1: pb });
    if (g.winner === (swap ? 1 : 0)) w++;
  }
  const TH = ctx.ev('TH'), q = (xs, f) => { const s = xs.slice().sort((x, y) => x - y); return s.length ? s[Math.min(s.length - 1, Math.floor(s.length * f))] : 0; };
  const tu = TH.turns, ks = TH.picks.map(x => x[0]), ns = TH.picks.map(x => x[1]);
  console.log(`느림 ×${slow} · ${N}판 · 실제 ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log(`  한 턴 계산 시간(ms, 그 기기 기준): 중앙 ${q(tu, .5).toFixed(0)} · 90% ${q(tu, .9).toFixed(0)} · 최대 ${q(tu, 1).toFixed(0)}  (턴 ${tu.length}번)`);
  console.log(`  경우의 수: 중앙 ${q(ks, .5)} · 90% ${q(ks, .9)} · 최대 ${q(ks, 1)}   굴린 횟수: 중앙 ${q(ns, .5)} · 가장 적게 ${q(ns, 0)} · 가장 많이 ${q(ns, 1)}`);
  const big = TH.picks.filter(x => x[0] >= 20), small = TH.picks.filter(x => x[0] > 0 && x[0] <= 6);
  const avg = xs => xs.length ? (xs.reduce((s, x) => s + x[1], 0) / xs.length).toFixed(1) : '-';
  console.log(`  경우의 수 6 이하일 때 평균 ${avg(small)}번 · 20 이상일 때 평균 ${avg(big)}번`);
  console.log(`  어려움 vs ${other}: ${w}/${N} (${Math.round(w / N * 100)}%)`);
})();

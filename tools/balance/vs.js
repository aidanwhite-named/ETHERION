// 컴퓨터 난이도 비교: node tools/balance/vs.js <js dir> <판 수(단체 쌍마다, 선후공 바꿔 두 번)> [A난이도=hard] [B난이도=normal] [단체들]
// 9단체 × 9단체(같은 단체끼리 포함) 쌍마다 A가 0번 · 1번 자리로 한 번씩. A의 승률을 찍는다.
const { fork } = require('child_process'); const os = require('os'); const path = require('path');
if (process.argv[2] === '--worker') {
  const { load } = require('./harness'); const ctx = load(process.argv[3]);
  process.on('message', async ({ jobs, da, db, opt }) => {
    if (opt) ctx.ev('(function(o){ Object.assign(HARD, o); })')(opt);
    const out = [];
    for (const [a, b, seed] of jobs) {
      ctx.seed(seed);
      const S = ctx.ev('STARTER_DECKS');
      const swap = seed % 2 === 1;   // A가 1번 자리
      const pa = { name: 'A', group: a, cards: S[a], isAI: true, ai: da }, pb = { name: 'B', group: b, cards: S[b], isAI: true, ai: db };
      const t0 = Date.now();
      const g = await ctx.playHeadless(swap ? { p0: pb, p1: pa } : { p0: pa, p1: pb });
      const aw = g.winner === (swap ? 1 : 0);
      out.push([a, b, aw ? 1 : 0, g.turn, Date.now() - t0]);
    }
    process.send(out);
  });
  return;
}
async function main() {
  const dir = path.resolve(process.argv[2] || path.join(__dirname, '../../js')); const N = +process.argv[3] || 2;
  const da = process.argv[4] || 'hard', db = process.argv[5] || 'normal';
  const GS = (process.argv[6] || 'B1,B2,B3,G1,G2,G3,A1,A2,A3').split(',');
  const opt = process.env.HARD ? JSON.parse(process.env.HARD) : null;
  const base = +(process.env.SEED || 1000);
  const jobs = []; for (const a of GS) for (const b of GS) for (let i = 0; i < N * 2; i++) jobs.push([a, b, base + i]);
  const W = Math.min(os.cpus().length, 16); const ch = Array.from({ length: W }, () => []); jobs.forEach((j, i) => ch[i % W].push(j));
  const t0 = Date.now();
  const res = (await Promise.all(ch.map(c => new Promise(r => { const k = fork(__filename, ['--worker', dir]); k.on('message', m => { r(m); k.kill(); }); k.send({ jobs: c, da, db, opt }); })))).flat();
  const by = {}; let w = 0, t = 0, ms = 0;
  for (const [a, b, x, tu, m] of res) { by[a] = by[a] || [0, 0]; by[a][0] += x; by[a][1]++; w += x; t += tu; ms += m; }
  const n = res.length, p = w / n, se = Math.sqrt(p * (1 - p) / n);
  console.log(`${da} vs ${db}: ${(p * 100).toFixed(1)}% ± ${(se * 196).toFixed(1)} (${w}/${n}) · 평균 턴 ${(t / n).toFixed(1)} · 판당 ${(ms / n / 1000).toFixed(2)}s · 전체 ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log('  A단체별: ' + GS.map(g => `${g} ${Math.round(by[g][0] / by[g][1] * 100)}`).join(' · '));
}
main();

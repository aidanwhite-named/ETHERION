// 9단체 라운드 로빈. node rr.js <js dir> <games per ordered pair> [decks.json]
const { fork } = require('child_process'); const os = require('os'); const fs = require('fs');
if (process.argv[2] === '--worker') {
  const { load } = require('./harness'); const dir = process.argv[3]; const ctx = load(dir);
  process.on('message', async ({ decks, jobs }) => {
    if (decks) { const D = decks; ctx.ev('(function(D){ for (const g in D) STARTER_DECKS[g] = D[g]; })')(D); }
    const out = [];
    for (const [a, b, n] of jobs) { let w = 0, turns = 0, life = 0;
      for (let i = 0; i < n; i++) { const g = await ctx.playHeadless({ p0: { name: 'A', group: a, cards: ctx.ev('STARTER_DECKS')[a], isAI: true }, p1: { name: 'B', group: b, cards: ctx.ev('STARTER_DECKS')[b], isAI: true } });
        if (g.winner === 0) w++; turns += g.turn; }
      out.push([a, b, w, n, turns]); }
    process.send(out);
  });
  return;
}
async function run(dir, N, decks) {
  const G = ['B1','B2','B3','G1','G2','G3','A1','A2','A3']; const jobs = [];
  for (const a of G) for (const b of G) if (a !== b) jobs.push([a, b, N]);
  const W = Math.min(os.cpus().length, 16); const chunks = Array.from({ length: W }, () => []); jobs.forEach((j, i) => chunks[i % W].push(j));
  const res = await Promise.all(chunks.map(ch => new Promise(r => { const c = fork(__filename, ['--worker', dir]); c.on('message', m => { r(m); c.kill(); }); c.send({ decks, jobs: ch }); })));
  const M = {}; let T = 0, NG = 0; for (const a of G) M[a] = {};
  for (const [a, b, w, n, t] of res.flat()) { M[a][b] = (M[a][b] || { w: 0, n: 0 }); M[a][b].w += w; M[a][b].n += n; M[b][a] = (M[b][a] || { w: 0, n: 0 }); M[b][a].w += n - w; M[b][a].n += n; T += t; NG += n; }
  const rate = {}; for (const a of G) { let w = 0, n = 0; for (const b of G) if (M[a][b]) { w += M[a][b].w; n += M[a][b].n; } rate[a] = w / n; }
  return { M, rate, avgTurns: T / NG, G };
}
function print(r) {
  const { M, rate, G } = r;
  console.log('      ' + G.map(g => g.padStart(5)).join('') + '   전체');
  for (const a of G) console.log(a.padEnd(6) + G.map(b => a === b ? '    -' : String(Math.round(M[a][b].w / M[a][b].n * 100)).padStart(5)).join('') + '  ' + (rate[a] * 100).toFixed(1));
  console.log('평균 턴', r.avgTurns.toFixed(1));
}
module.exports = { run, print };
if (require.main === module) { process.argv[2] = require('path').resolve(process.argv[2] || require('path').join(__dirname, '../../js')); const decks = process.argv[4] ? JSON.parse(fs.readFileSync(process.argv[4], 'utf8')) : null;
  const t0 = Date.now(); run(process.argv[2], +process.argv[3] || 20, decks).then(r => { print(r); console.log(((Date.now() - t0) / 1000).toFixed(0) + 's'); }); }

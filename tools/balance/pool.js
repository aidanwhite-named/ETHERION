// 작업자 풀: 덱 묶음과 경기 목록을 받아 승수 반환 (시드 고정 → 같은 시드 비교 가능)
const { fork } = require('child_process'); const os = require('os');
if (process.argv[2] === '--worker') {
  const { load } = require('./harness'); const ctx = load(process.argv[3]);
  process.on('message', async ({ id, decks, games }) => {
    const out = [];
    for (const [a, b, seed] of games) { ctx.seed(seed);
      const g = await ctx.playHeadless({ p0: { name: 'A', group: a, cards: decks[a], isAI: true }, p1: { name: 'B', group: b, cards: decks[b], isAI: true } });
      out.push(g.winner === 0 ? 1 : 0); }
    process.send({ id, out });
  });
} else {
  let workers = [], dirCur = null, nextId = 1; const waiting = {};
  function init(dir) { if (dirCur === dir && workers.length) return; close(); dirCur = dir; const n = Math.max(1, os.cpus().length);
    workers = Array.from({ length: n }, () => { const w = fork(__filename, ['--worker', dir]); w.on('message', m => { waiting[m.id](m.out); delete waiting[m.id]; }); return w; }); }
  function close() { workers.forEach(w => w.kill()); workers = []; }
  async function play(decks, games) {
    const n = workers.length, parts = Array.from({ length: n }, () => []); games.forEach((g, i) => parts[i % n].push(g));
    const res = await Promise.all(parts.map((p, k) => new Promise(r => { const id = nextId++; waiting[id] = r; workers[k].send({ id, decks, games: p }); })));
    const out = new Array(games.length); res.forEach((r, k) => r.forEach((v, j) => { out[j * n + k] = v; })); return out;
  }
  module.exports = { init, close, play };
}

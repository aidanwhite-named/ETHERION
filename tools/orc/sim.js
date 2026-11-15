// node tools/orc/sim.js [판 수=40] [덱=base|elite|기본덱 json] [js 폴더]
//   v3.67 바위주먹 오크 승률: G1 덱 대 다른 8깃발 기본 덱, 깃발마다 선 · 후공 N판씩(보통 컴퓨터끼리). tools/abyss/sim.js를 본떴다.
//   바꾸기 전과 견주려면 js 폴더를 복사해 orc.js를 뺀 곳을 세 번째 인자로. SEED= 로 판 묶음을 바꾼다(같은 씨앗끼리 견준다).
const { fork } = require('child_process'); const os = require('os'); const path = require('path');
if (process.argv[2] === '--worker') {
  const { load } = require('../balance/harness'); const ctx = load(process.argv[3]);
  process.on('message', async ({ deck, cfg, jobs, seed }) => {
    const SD = ctx.ev('STARTER_DECKS'), ED = ctx.ev('HARD_DECKS'); const out = [];
    for (const [b, first, n, s0] of jobs) { let w = 0, life = 0, turns = 0;
      for (let i = 0; i < n; i++) {
        ctx.seed(seed + s0 + i);
        const me = { name: 'A', group: 'G1', cards: deck === 'elite' ? ED.G1 : deck || SD.G1, isAI: true }, foe = { name: 'B', group: b, cards: SD[b], isAI: true };
        const g = await ctx.playHeadless(first ? { p0: me, p1: foe } : { p0: foe, p1: me });
        const mi = first ? 0 : 1; if (g.winner === mi) w++; turns += g.turn; life += g.players[mi].life; }
      out.push([b, w, n, turns, life]); }
    process.send(out);
  });
  return;
}
const N = +process.argv[2] || 40, deckArg = process.argv[3] || 'base';
const dir = path.resolve(process.argv[4] || path.join(__dirname, '../../js'));
const deck = deckArg === 'base' ? null : deckArg === 'elite' ? 'elite' : JSON.parse(deckArg);
const cfg = null, seed = +process.env.SEED || 1000;
const G = ['B1', 'B2', 'B3', 'G2', 'G3', 'A1', 'A2', 'A3'];
const jobs = []; const per = Math.max(1, Math.ceil(N / 4));
for (const b of G) for (const first of [1, 0]) for (let s = 0; s < N; s += per) jobs.push([b, first, Math.min(per, N - s), (G.indexOf(b) * 2 + first) * 100000 + s]);
const W = Math.min(os.cpus().length, 10); const ch = Array.from({ length: W }, () => []); jobs.forEach((j, i) => ch[i % W].push(j));
const t0 = Date.now();
Promise.all(ch.map(c => new Promise(r => { const p = fork(__filename, ['--worker', dir]); p.on('message', m => { r(m); p.kill(); }); p.send({ deck, cfg, jobs: c, seed }); }))).then(res => {
  const M = {}; let w = 0, n = 0, t = 0;
  for (const [b, ww, nn, tt] of res.flat()) { M[b] = M[b] || [0, 0]; M[b][0] += ww; M[b][1] += nn; w += ww; n += nn; t += tt; }
  console.log(`G1(${deckArg}${cfg ? ' ' + JSON.stringify(cfg) : ''}) 승률 ${(w / n * 100).toFixed(1)}% · ${n}판 · 평균 ${(t / n).toFixed(1)}턴 · ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log('  ' + G.map(b => `${b} ${Math.round(M[b][0] / M[b][1] * 100)}`).join(' · '));
});

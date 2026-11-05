// 단체별 덱 다듬기: 같은 시드로 바꿔 보고 좋아지면 채택 (언덕 오르기)
const fs = require('fs'); const pool = require('./pool'); const { load } = require('./harness');
const DIR = require('path').resolve(process.argv[2] || require('path').join(__dirname, '../../js')); const ITERS = +(process.argv[3] || 30); const SEEDS = +(process.argv[4] || 10);
const ONLY = process.argv[5] ? process.argv[5].split(',') : null;
const ctx = load(DIR); const CARD_LIST = ctx.ev('CARD_LIST'); const G = ctx.ev('GROUP_IDS');
let decks = fs.existsSync('decks.json') ? JSON.parse(fs.readFileSync('decks.json', 'utf8')) : {};
for (const g of G) if (!decks[g]) decks[g] = Object.assign({}, ctx.ev('STARTER_DECKS')[g]);
const cnt = d => Object.values(d).reduce((a, b) => a + b, 0);
let seedBase = 1000;
function gamesFor(g, seeds) { const out = []; for (const h of G) if (h !== g) for (const s of seeds) { out.push([g, h, s]); out.push([h, g, s + 7777]); } return out; }
async function score(g, deck, seeds) { const D = Object.assign({}, decks, { [g]: deck }); const games = gamesFor(g, seeds); const r = await pool.play(D, games);
  let w = 0; games.forEach((x, i) => { w += x[0] === g ? r[i] : 1 - r[i]; }); return w / games.length; }
const R = Math.random;
function propose(g, deck) {
  const d = Object.assign({}, deck); const ids = Object.keys(d); const poolc = CARD_LIST.filter(c => c.group === g);
  const rm = ids[(R() * ids.length) | 0]; d[rm]--; if (!d[rm]) delete d[rm];
  let add; for (let k = 0; k < 50; k++) { const c = poolc[(R() * poolc.length) | 0]; if ((d[c.id] || 0) < 4 && c.id !== rm) { add = c.id; break; } }
  d[add] = (d[add] || 0) + 1;
  const C = ctx.ev('CARDS'); let u = 0, sp = 0, it = 0; for (const k in d) { const t = C[k].type; if (t === 'unit') u += d[k]; else if (t === 'item') it += d[k]; else sp += d[k]; }
  if (u < 20 || u > 28 || sp < 6 || sp > 14 || it < 2 || it > 8) return propose(g, deck);
  return { d, rm, add };
}
(async () => {
  pool.init(DIR);
  for (const g of G) {
    if (ONLY && !ONLY.includes(g)) continue;
    let seeds = Array.from({ length: SEEDS }, (_, i) => seedBase + i); seedBase += 1000;
    let cur = await score(g, decks[g], seeds); const start = cur; let acc = 0;
    for (let it = 0; it < ITERS; it++) {
      const p = propose(g, decks[g]); const v = await score(g, p.d, seeds);
      if (v > cur + 0.012) { decks[g] = p.d; cur = v; acc++; const N = n => (ctx.ev('CARDS')[n] || {}).name; console.log(`  ${g} #${it} −${N(p.rm)} +${N(p.add)} → ${(v * 100).toFixed(1)}%`); }
      if (it % 10 === 9) { seeds = Array.from({ length: SEEDS }, (_, i) => seedBase + i); seedBase += 1000; cur = await score(g, decks[g], seeds); }
    }
    console.log(g, 'start', (start * 100).toFixed(1), '→', (cur * 100).toFixed(1), 'accepted', acc, 'size', cnt(decks[g]));
    fs.writeFileSync('decks.json', JSON.stringify(decks, null, 1));
  }
  pool.close();
})();

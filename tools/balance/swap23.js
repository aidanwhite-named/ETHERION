// v2.3 기본 덱 아이템 바꾸기: 클래스가 맞지 않아 쓰기 어려워진 아이템을 후보와 바꿔 같은 시드로 비교한다.
// node tools/balance/swap23.js [seeds]   결과는 tools/balance/swap23.json
const fs = require('fs'), path = require('path'); const pool = require('./pool'); const { load } = require('./harness');
const DIR = path.resolve(__dirname, '../../js'); const SEEDS = +(process.argv[2] || 60);
const FROM = +(process.argv[3] || 0), TO = +(process.argv[4] || 99);   // 단계 나눠 돌리기 (이어서 하면 swap23.json에서 덱을 읽음)
const ctx = load(DIR); const G = ctx.ev('GROUP_IDS'); const C = ctx.ev('CARDS');
const base = {}; for (const g of G) base[g] = Object.assign({}, ctx.ev('STARTER_DECKS')[g]);
// [단체, 뺄 카드, 넣을 후보들]
const PLAN = [
  ['B2', 'IB2-5', ['M3-1', 'IB2-4', 'IB2-2', 'IB2-3']],
  ['G1', 'IG1-4', ['IG1-2', 'IG1-3', 'M2-1', 'IG1-1']],
  ['G2', 'IG2-3', ['IG2-2', 'IG2-1', 'IG2-5', 'IG2-4']],
  ['G2', 'I3-3',  ['IG2-5', 'IG2-4', 'IG2-6', 'M4-1']],
  ['B3', 'IB3-6', ['IB3-5', 'IB3-4', 'IB3-2', 'IB3-1']]
];
function games(g, seeds) { const out = []; for (const h of G) if (h !== g) for (const s of seeds) { out.push([g, h, s]); out.push([h, g, s + 7777]); } return out; }
async function score(decks, g, seeds) { const gs = games(g, seeds); const r = await pool.play(decks, gs); let w = 0; gs.forEach((x, i) => { w += x[0] === g ? r[i] : 1 - r[i]; }); return w / gs.length; }
(async () => {
  pool.init(DIR); const decks = JSON.parse(JSON.stringify(base)); let log = [];
  const OUT = path.join(__dirname, 'swap23.json');
  if (FROM > 0 && fs.existsSync(OUT)) { const o = JSON.parse(fs.readFileSync(OUT, 'utf8')); log = o.log.slice(0, FROM); Object.assign(decks, o.decks); }
  let sb = 5000 + FROM * 1000;
  for (const [g, rm, cands] of PLAN.slice(FROM, TO)) {
    const seeds = Array.from({ length: SEEDS }, (_, i) => sb + i); sb += 1000;
    const res = [['(그대로)', await score(decks, g, seeds)]];
    for (const add of cands) {
      const d = Object.assign({}, decks[g]); if (!d[rm]) continue; d[rm]--; if (!d[rm]) delete d[rm];
      if ((d[add] || 0) >= 4) continue; d[add] = (d[add] || 0) + 1;
      res.push([add, await score(Object.assign({}, decks, { [g]: d }), g, seeds)]);
    }
    const best = res.slice(1).sort((a, b) => b[1] - a[1])[0];
    const line = `${g} −${rm} ${C[rm].name}: ` + res.map(([k, v]) => `${k === '(그대로)' ? k : k + ' ' + C[k].name} ${(v * 100).toFixed(1)}%`).join(' | ') + `  → +${best[0]}`;
    console.log(line); log.push({ g, rm, res, pick: best[0] });
    decks[g][rm]--; if (!decks[g][rm]) delete decks[g][rm]; decks[g][best[0]] = (decks[g][best[0]] || 0) + 1;
    fs.writeFileSync(path.join(__dirname, 'swap23.json'), JSON.stringify({ log, decks: Object.fromEntries(['B2','G1','G2','B3'].map(k => [k, decks[k]])) }, null, 1));
  }
  pool.close(); console.log('done');
})();

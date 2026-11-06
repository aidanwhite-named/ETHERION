// v3.2 기본 덱에 유니크 1장 + 스페셜 1장 넣고 다시 짜기.  node tools/uniques/build.js [시드=60] [단체들=B1,...]
// 1) 처음 덱: 기본 덱에서 같은 종류 · 가장 가까운 레벨 · 대전 값(tools/cardsim/out_v15/cards.csv)이 가장 낮은 카드를 뺀다(v2.9와 같은 규칙).
//    스페셜은 승천자(유닛). 비술 세 단체는 삼좌 유물(아이템)도 후보로 견준다.
// 2) 단체마다 차례로, 뺄 카드 후보(같은 종류 · 레벨 ±1~2 · 대전 값이 낮은 쪽)를 바꿔 보며 같은 시드로 상대 8단체(지금 덱)와 겨뤄 가장 많이 이기는 쪽을 남긴다.
// 결과는 out/build.json (이어서 돌릴 수 있다). 마음에 들면 js/decks.js로 옮긴다.
const fs = require('fs'), path = require('path');
const pool = require('../balance/pool'); const { load } = require('../balance/harness');
const ROOT = path.resolve(__dirname, '../..'), DIR = path.join(ROOT, 'js'), OUT = path.join(__dirname, 'out', 'build.json');
const SEEDS = +(process.argv[2] || 60), ONLY = process.argv[3] ? process.argv[3].split(',') : null;
const ctx = load(DIR); const G = ctx.ev('GROUP_IDS'); const C = ctx.ev('CARDS');
const val = {}; for (const l of fs.readFileSync(path.join(ROOT, 'tools/cardsim/out_v15/cards.csv'), 'utf8').split('\n').slice(1)) { const t = l.split(','); if (t[0]) val[t[0].replace(/^﻿/, '')] = +t[8]; }
const typ = id => C[id].type === 'unit' ? 'unit' : C[id].type === 'item' ? 'item' : 'spell';
const base = {}; for (const g of G) base[g] = Object.assign({}, ctx.ev('STARTER_DECKS')[g]);
const uniq = g => C['UN-' + g].id, asc = g => 'SP-' + g, relic = g => C['SR-' + g] ? 'SR-' + g : null;
function outCands(d, inId, k) {   // 뺄 후보: 같은 종류, 레벨이 가까운 순 → 대전 값이 낮은 순
  return Object.keys(d).filter(x => d[x] > 0 && typ(x) === typ(inId) && !C[x].special && !C[x].unique && !C[x].comeback)
    .sort((x, y) => Math.abs(C[x].lv - C[inId].lv) - Math.abs(C[y].lv - C[inId].lv) || (val[x] ?? 0) - (val[y] ?? 0)).slice(0, k);
}
const swap = (d, out, inn) => { d = Object.assign({}, d); d[out]--; if (!d[out]) delete d[out]; d[inn] = 1; return d; };
function games(g, seeds) { const o = []; for (const h of G) if (h !== g) for (const s of seeds) { o.push([g, h, s]); o.push([h, g, s + 7777]); } return o; }
async function score(decks, g, seeds) { const gs = games(g, seeds); const r = await pool.play(decks, gs); let w = 0; gs.forEach((x, i) => { w += x[0] === g ? r[i] : 1 - r[i]; }); return w / gs.length; }
const N = id => C[id].name, pct = v => (v * 100).toFixed(1);
(async () => {
  let st = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : null;
  if (!st) {   // 처음 덱
    st = { seeds: SEEDS, decks: {}, picks: {}, log: [] };
    for (const g of G) { let d = base[g]; const u = uniq(g), s = asc(g);
      const ou = outCands(d, u, 1)[0]; d = swap(d, ou, u); const os = outCands(d, s, 1)[0]; d = swap(d, os, s);
      st.decks[g] = d; st.picks[g] = { special: s, outU: ou, outS: os, done: false }; }
    fs.writeFileSync(OUT, JSON.stringify(st, null, 1));
  }
  pool.init(DIR); let sb = 20000;
  for (const g of G) {
    if (ONLY && !ONLY.includes(g)) continue; if (st.picks[g].done) continue;
    const seeds = Array.from({ length: SEEDS }, (_, i) => sb + G.indexOf(g) * 1000 + i);
    const u = uniq(g); let res = [];
    // ① 유니크 자리: 스페셜 쪽은 처음 덱 그대로 두고, 유니크 대신 뺄 카드를 바꿔 본다
    const p = st.picks[g]; const pre = Object.assign({}, base[g]);
    const withS = (dd, s, os) => swap(dd, os, s);
    for (const ou of outCands(pre, u, 5)) {
      const d0 = swap(pre, ou, u); const os = outCands(d0, p.special, 1)[0]; const d = withS(d0, p.special, os);
      const v = await score(Object.assign({}, st.decks, { [g]: d }), g, seeds); res.push({ slot: 'U', out: ou, special: p.special, outS: os, v, d });
      console.log(`${g} U −${N(ou)}(Lv${C[ou].lv}) → ${pct(v)}%`);
    }
    const bu = res.sort((a, b) => b.v - a.v)[0];
    // ② 스페셜 자리: 유니크 쪽은 ①에서 고른 대로, 스페셜(승천자 · 유물)과 뺄 카드를 바꿔 본다
    const d0 = swap(pre, bu.out, u); const res2 = [];
    for (const s of [asc(g), relic(g)].filter(Boolean)) for (const os of outCands(d0, s, 4)) {
      const d = swap(d0, os, s); const v = await score(Object.assign({}, st.decks, { [g]: d }), g, seeds);
      res2.push({ slot: 'S', out: os, special: s, v, d }); console.log(`${g} S +${N(s)} −${N(os)}(Lv${C[os].lv}) → ${pct(v)}%`);
    }
    const bs = res2.sort((a, b) => b.v - a.v)[0];
    st.decks[g] = bs.d; st.picks[g] = { special: bs.special, outU: bu.out, outS: bs.out, vU: bu.v, vS: bs.v, done: true };
    st.log.push({ g, U: res.map(({ d, ...r }) => r), S: res2.map(({ d, ...r }) => r) });
    console.log(`${g} 고름: +${N(u)} −${N(bu.out)} · +${N(bs.special)} −${N(bs.out)} → ${pct(bs.v)}%`);
    fs.writeFileSync(OUT, JSON.stringify(st, null, 1));
  }
  pool.close(); console.log('done');
})();

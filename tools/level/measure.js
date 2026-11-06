// 한 판 수입 측정: node measure.js [판 수]
const { load } = require('../balance/harness'); const path = require('path');
const ctx = load(path.join(__dirname, '../../js'), `function econBreak(g, items){ if(!g.econ) g.econ={broken:0,earned:0}; for(const b of items){const p=cardPrice(b.id)||0; g.econ.broken+=p; g.econ.earned+=Math.round(p*0.02);} }
 function cardPrice(c){ c=typeof c==="string"?CARDS[c]:c; if(!c) return 0; const b=c.lv*100; return c.type==="unit"?b:c.type==="item"?Math.round(b*0.9):Math.round(b*1.1); }
 const _sm=startMatch; startMatch=function(cfg){ const g=_sm(cfg); g.econ={broken:0,earned:0}; return g; };`);
const G = ['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
(async () => { const N = +process.argv[2] || 200; const W = [], L = [];
  for (let i = 0; i < N; i++) { const a = G[i % 9], b = G[(i * 4 + 1) % 9]; const D = ctx.ev('STARTER_DECKS');
    const g = await ctx.playHeadless({ p0: { name: 'A', group: a, cards: D[a], isAI: true }, p1: { name: 'B', group: b, cards: D[b], isAI: true } });
    const e = g.econ; W.push(e.broken * 2 + e.earned); L.push(e.broken * 0.5 + e.earned); }
  const st = a => { a.sort((x, y) => x - y); return { avg: Math.round(a.reduce((s, x) => s + x, 0) / a.length), p10: a[Math.floor(a.length * .1)], med: a[a.length >> 1], p90: a[Math.floor(a.length * .9)] }; };
  console.log('승리 판 수입', st(W)); console.log('패배 판 수입', st(L));
})();

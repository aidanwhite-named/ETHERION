// node tools/highcards/analyze.js <cardsim 결과 result_1of1.json> [바꿔 쓸 카드 값 json]
// 새 카드의 대전 값: 바꾼 덱 승률 − 기본 덱 승률에, 뺀(넣은) 카드의 값(tools/cardsim/out_v15/cards.csv, 없으면 0)을 더해 카드 1장 값을 풀고 2장으로 적는다
const fs=require('fs');
const r=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const csv=fs.readFileSync(require('path').join(__dirname,'../cardsim/out_v15/cards.csv'),'utf8').replace(/^﻿/,'').trim().split('\n').map(l=>l.split(','));
const H=csv[0], V={}; for(const row of csv.slice(1)) V[row[0]]=+row[H.indexOf('대전 값 2장(%p)')]||0;
if(process.argv[3]) Object.assign(V, JSON.parse(fs.readFileSync(process.argv[3],'utf8')));
const {load}=require('../balance/harness'); const ctx=load(require('path').join(__dirname,'../../js'));
const ST=ctx.ev('STARTER_DECKS'), C=ctx.ev('CARDS');
const base={}; for(const [k,v] of Object.entries(r.res)) if(k.startsWith('BASE:')) base[k.slice(5)]=v.w/v.n;
const out=[];
for(const [id,m] of Object.entries(r.meta)){ const v=r.res[id]; if(!v) continue; const c=C[id], g=c.group;
  const wr=v.w/v.n, raw=(wr-base[g])*100;
  // 뺀 카드: 기본 덱 - 바꾼 덱
  let corr=0; const rem=[]; for(const k of new Set([...Object.keys(ST[g]),...Object.keys(m.deck)])){ const d=(ST[g][k]||0)-(m.deck[k]||0); if(d!==0&&k!==id){ corr+=d*(V[k]||0)/2; rem.push(k+'×'+d);} }
  const per=(raw+corr)/m.m; const s=v.st[id]||{};
  const se=Math.sqrt(wr*(1-wr)/v.n + base[g]*(1-base[g])/r.res['BASE:'+g].n)*100;
  out.push({id,name:c.name,type:c.type==='unit'?'유닛':c.type==='item'?'아이템':'마법',lv:c.lv,m:m.m,raw:+raw.toFixed(1),corr:+corr.toFixed(1),v2:+(per*2).toFixed(1),se:+(se*2/m.m).toFixed(1),
    played: s.d? +(100*s.p/s.d).toFixed(0):0, pw: s.pn? +(100*s.pw/s.pn).toFixed(1):null, rem:rem.join(' ')});
}
out.sort((a,b)=>a.id<b.id?-1:1);
for(const o of out) console.log(`${o.id.padEnd(8)} ${o.name.padEnd(12)} ${o.type} L${o.lv} m${o.m}  raw ${String(o.raw).padStart(5)}  +뺀값 ${String(o.corr).padStart(4)}  → 2장값 ${String(o.v2).padStart(5)} ±${o.se}  낸% ${o.played} 냈을때승률 ${o.pw}  [${o.rem}]`);
console.log('base', Object.fromEntries(Object.entries(base).map(([k,v])=>[k,(v*100).toFixed(1)])));
fs.writeFileSync(process.argv[2].replace(/\.json$/,'_an.json'), JSON.stringify(out,null,1));

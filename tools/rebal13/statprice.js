// 스탯 1점의 값: 교전에서 목표 유닛에 공+1/방+1/체+1 → 팀 승률 변화. 목표 유닛의 지금 방어로 나눠 본다.
const {make}=require('./tsim');const fs=require('fs');
const N=+(process.argv[2]||4000), SIZE=+(process.argv[3]||3);
const ctx=make();const U=ctx.ev('CARD_LIST').filter(c=>c.type==='unit'&&!c.rev);
const V={base:{},a:{a:1},d:{d:1},h:{h:1},d2:{d:2},h2:{h:2},a2:{a:2}};
for(const k in V)ctx.mkTest('T_'+k,V[k]);
let s=12345;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};
const pick=a=>a[(R()*a.length)|0];
const res={};
for(let i=0;i<N;i++){
  const L=2+((R()*6)|0); const pool=U.filter(u=>u.lv===L&&u.up===0); if(pool.length<3)continue;
  const A=Array.from({length:SIZE},()=>({id:pick(pool).id,item:null})),B=Array.from({length:SIZE},()=>({id:pick(pool).id,item:null}));
  const ti=(R()*SIZE)|0;const tgt=ctx.ev('CARDS')[A[ti].id];const bk=Math.max(-2,Math.min(3,tgt.d));
  const seed=(R()*1e9)|0;
  const r={};
  for(const k in V){A[ti].item='T_'+k;r[k]=(ctx.battle(A,B,seed)+ (1-ctx.battle(B,A,seed+7)))/2;}
  for(const key of [bk,'all']){const o=res[key]=res[key]||{n:0};o.n++;for(const k in V)o[k]=(o[k]||0)+r[k];}
}
const out={};
for(const key in res){const o=res[key];const b=o.base/o.n;const row={n:o.n,base:+(b*100).toFixed(1)};for(const k in V)if(k!=='base')row[k]=+((o[k]/o.n-b)*100).toFixed(2);row['d/h']=+(row.d/row.h).toFixed(2);row['a/h']=+(row.a/row.h).toFixed(2);out[key]=row;}
console.log(JSON.stringify(out));

// node tools/highcards/lab.js [판 수=1500] [결과 파일]
// 마법 실험실 (v3.18, 지금 엔진 그대로): 내 2~4기 대 상대 2~4기(레벨 = 판 레벨 ±1)에 마법 한 장을 내 무작위 칸에 넣었을 때 섬멸전 승률 변화.
// 잣대: 같은 판들에서 같은 레벨의 기존 마법을 모두 재어, 새 마법이 그 가운데 몇 위인지(z = (값 − 평균) / 표준편차)를 본다.
//   (data.js의 환산 레벨 e는 v0.9 · v1.4 엔진에서 잰 값이라 지금 엔진의 값과 잘 맞지 않아 쓰지 않는다. 생명 대가 1 = −1.5, 얻는 생명 1 = +1.5, 장전 1 = −6)
const fs=require('fs'); const {load}=require('../balance/harness');
const ctx=load(require('path').join(__dirname,'../../js'));
ctx.ev(`var TUID=3e6;
function labBattle(A,B,seed,first){
  const mk=(arr,idx)=>({idx,name:'P'+idx,life:99,crystals:[],burn:[],reload:0,bonus:0,field:arr.map(x=>({uid:++TUID,id:x.id})).concat(Array(RULES.slots-arr.length).fill(null))});
  const P=[mk(A,0),mk(B,1)];
  for(let t=0;t<12;t++){const ai=(t+first)%2;
    for(const p of P)for(const it of p.field)if(it&&isUnit(it))resetTurn(it);
    if(t>=1)for(const p of P)p.field=p.field.map(it=>it&&isSpell(it)?null:it);
    for(const p of P){const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}
    runCombatCore(ctx(P,ai,t,null,{seed:seed*131+t}));
    for(const p of P){p.field=p.field.map(it=>(it&&((isUnit(it)&&(!it.t||!it.t.alive))||it.tokTemp))?null:it);const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}
    const la=liveUnits(P[0]).length,lb=liveUnits(P[1]).length;
    if(!lb&&la)return 1;if(!la&&lb)return 0;if(!la&&!lb)return 0.5;}
  const s=p=>liveUnits(p).reduce((s,u)=>s+C(u).lv,0);const a=s(P[0]),b=s(P[1]);return a>b?1:a<b?0:0.5;}
this.labBattle=labBattle;`);
const CL=ctx.ev('CARD_LIST'), CARDS=ctx.ev('CARDS');
const U=CL.filter(c=>c.type==='unit'&&!c.rev&&c.up===0&&!c.gift);
const pools={};for(let l=1;l<=8;l++)pools[l]=U.filter(u=>u.lv===l);
function value(sid,L,role,N,seed0){
  let s=seed0||4242;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
  let d=0;for(let i=0;i<N;i++){const n=2+((R()*3)|0),m=2+((R()*3)|0);const lv=()=>Math.max(1,Math.min(8,L-1+((R()*3)|0)));
    const A=Array.from({length:n},()=>({id:pick(pools[lv()]).id})),B=Array.from({length:m},()=>({id:pick(pools[lv()]).id}));
    const pos=(R()*(n+1))|0;const A2=A.slice();A2.splice(pos,0,{id:sid});const seed=(R()*1e9)|0;const first=role==='atk'?0:1;
    d+=ctx.labBattle(A2,B,seed,first)-ctx.labBattle(A,B,seed,first);}
  const c=CARDS[sid];return d/N*100-1.5*((c.cost&&c.cost.life)||0)+1.5*((c.gain&&c.gain.life)||0)-6*((c.cost&&c.cost.ether)||0);}
const roles=c=>c.type==='atk'?['atk']:c.type==='def'?['def']:['atk','def'];
const N=+process.argv[2]||1500;
const S=CL.filter(c=>c.type!=='unit'&&c.type!=='item'&&c.type!=='hand'&&!c.comeback);
const old=S.filter(c=>!/^US-/.test(c.id)), nw=S.filter(c=>/^US-/.test(c.id));
const out={};
const LV=[...new Set(nw.map(c=>c.lv))].sort();
for(const L of LV){
  const rows=old.filter(c=>c.lv===L).map(c=>({id:c.id,name:c.name,v:Math.max(...roles(c).map(r=>value(c.id,L,r,N)))})).sort((a,b)=>b.v-a.v);
  const vs=rows.map(r=>r.v), mean=vs.reduce((a,b)=>a+b,0)/vs.length, sd=Math.sqrt(vs.reduce((s,x)=>s+(x-mean)**2,0)/vs.length);
  console.log(`L${L}: 기존 같은 레벨 마법 ${rows.length}장  평균 ${mean.toFixed(1)} · 표준편차 ${sd.toFixed(1)} · 최고 ${rows.slice(0,3).map(r=>r.name+' '+r.v.toFixed(1)).join(', ')}`);
  for(const c of nw.filter(c=>c.lv===L)){const v=Math.max(...roles(c).map(r=>value(c.id,L,r,N)));const rank=1+vs.filter(x=>x>v).length;
    out[c.id]={lv:L,v:+v.toFixed(1),mean:+mean.toFixed(1),sd:+sd.toFixed(1),z:+((v-mean)/sd).toFixed(2),rank,of:rows.length+1,best:rows[0].name+' '+rows[0].v.toFixed(1)};
    console.log(`   ${c.id} ${c.name.padEnd(8)} v ${v.toFixed(1)}  z ${((v-mean)/sd).toFixed(2)}  순위 ${rank}/${rows.length+1}`);}
}
fs.mkdirSync(require('path').join(__dirname,'out'),{recursive:true}); require('fs').writeFileSync(process.argv[3]||require('path').join(__dirname,'out/lab.json'),JSON.stringify(out,null,1));

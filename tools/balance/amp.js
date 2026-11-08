// node tools/balance/amp.js [판 수=3000] [카드ID,…]   (v3.18.3)
// 증폭 실험실: 내 2~4기 대 상대 2~4기(레벨 = 마법 레벨 ±1)에 공격 마법 한 장을 넣었을 때 섬멸전 승률 이득을, 내 증폭 0과 증폭 2(AMP=)로 같은 판에서 잰다.
// 증폭이득 = 이득(증폭) − 이득(없음). 아이템 스탯이 섞이지 않게 amplify만 바꾼다. DIR=로 다른 js 폴더(백업)를, OUT=로 결과 json을.
const path=require('path'),fs=require('fs');const {load}=require('./harness');
const dir=process.env.DIR||path.join(__dirname,'../../js'); const ctx=load(dir);
ctx.ev(`var TUID=3e6;
function labBattle(A,B,seed,first){
  const mk=(arr,idx)=>({idx,name:'P'+idx,life:99,crystals:[],burn:[],reload:0,bonus:0,field:arr.map(x=>Object.assign({uid:++TUID},x)).concat(Array(RULES.slots-arr.length).fill(null))});
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
this.labBattle=labBattle; var AMPX=0; const _amp=amplify; amplify=function(p){return (p.idx===0?AMPX:0)+_amp(p);}; this.setAmp=v=>{AMPX=v};`);
const CL=ctx.ev('CARD_LIST');const U=CL.filter(c=>c.type==='unit'&&!c.rev&&c.up===0&&!c.gift);
const pools={};for(let l=1;l<=8;l++)pools[l]=U.filter(u=>u.lv===l);
function gains(sid,L,N){let s=4242;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
  let g0=0,g1=0;for(let i=0;i<N;i++){const n=2+((R()*3)|0),m=2+((R()*3)|0);const lv=()=>Math.max(1,Math.min(8,L-1+((R()*3)|0)));
    const A=Array.from({length:n},()=>({id:pick(pools[lv()]).id})),B=Array.from({length:m},()=>({id:pick(pools[lv()]).id}));
    const pos=(R()*(n+1))|0, seed=(R()*1e9)|0;const ins=a=>{const b=a.slice();b.splice(pos,0,{id:sid});return b;};
    ctx.setAmp(0);g0+=ctx.labBattle(ins(A),B,seed,0)-ctx.labBattle(A,B,seed,0);
    ctx.setAmp(+process.env.AMP||2);g1+=ctx.labBattle(ins(A),B,seed,0)-ctx.labBattle(A,B,seed,0);}
  return [g0/N*100,g1/N*100];}
const N=+process.argv[2]||400, ids=(process.argv[3]||'').split(',').filter(Boolean);
const S=ids.length?ids.map(i=>CL.find(c=>c.id===i)):CL.filter(c=>c.type==='atk'&&!c.comeback&&c.lv>=3&&c.lv<=6&&c.ops.some(o=>['dmg','multi','chain','blast','echo','sumDef','perAlly'].includes(o.op)));
const rows=[];for(const c of S){const [a,b]=gains(c.id,c.lv,N);rows.push({id:c.id,n:c.name,lv:c.lv,g0:+a.toFixed(1),g1:+b.toFixed(1),amp:+(b-a).toFixed(1)});}
rows.sort((x,y)=>y.amp-x.amp);for(const r of rows)console.log(`${r.id}\t${r.n}\tL${r.lv}\t없음 ${r.g0}\t깃펜 ${r.g1}\t증폭이득 ${r.amp}`);
if(process.env.OUT)fs.writeFileSync(process.env.OUT,JSON.stringify(rows));

// 마법 실험실: 게임 엔진에 새 효과를 덧붙여(이 도구 안에서만) 마법 한 장의 값을 잰다.
// 새 효과: pdmg(물리 피해: 방어를 거침) · summon(이 자리에 유닛 소환, stay=남음/이번 턴만) · multi(무작위 대상 n발)
//          chain(맨 앞부터 차례로 xs) · swapPos(상대 맨 앞↔맨 뒤) · tauntLow(상대 공격 최저 유닛 [수호]) · fate(아군 코인: 양수 앞면·음수 뒷면)
//          echo(이 마법이 부서진 자리에 작은 마법 k장을 남겨 차례에 발동)
const path=require('path');const {load}=require('../balance/harness');
function make(){
  const ctx=load(path.join(__dirname,'../../js'));
  ctx.ev(`
  var TUID=2e6, TOKN=0;
  function mkSpell(id,spec){CARDS[id]={id,type:spec.kind==='com'?'any':spec.kind,name:spec.n||id,group:'X',lv:spec.lv||3,up:0,a:0,d:0,h:0,co:[],ops:spec.ops,cost:spec.cost||{},gain:spec.gain||{},text:spec.text||''};return id;}
  function mkTok(t){const id='TOK'+(++TOKN);CARDS[id]={id,type:'unit',name:t.n||'소환물',group:'X',lv:t.lv||1,up:0,a:t.a,d:t.d,h:t.h,co:t.co||[],tok:true};return id;}
  const _orig=castSpell;
  castSpell=function(X,caster,it,k){
    const c=C(it);const NEW=['pdmg','summon','multi','chain','swapPos','tauntLow','fate','echo','guard'];
    const old=c.ops.filter(o=>!NEW.includes(o.op));const nw=c.ops.filter(o=>NEW.includes(o.op));
    if(old.length||!nw.length){const save=c.ops;c.ops=old;_orig(X,caster,it,k);c.ops=save;} else {
      const p=X.P[caster];if(c.cost.life)p.life-=c.cost.life;if(c.cost.ether)p.reload+=c.cost.ether;}
    const p=X.P[caster],o=X.P[1-caster];
    for(const op of nw){
      const x=coinX(op);
      switch(op.op){
      case 'pdmg': for(const u of pickTargets(X,caster,op.side,op.area,k)) hurt(X,u,hit(x,u.t.d),'물리'); break;
      case 'multi': for(let i=0;i<op.n;i++){const L=(op.side==='both'?liveUnits(p).concat(liveUnits(o)):liveUnits(op.side==='ally'?p:o));if(!L.length)break;const u=L[Math.floor(RNG()*L.length)];hurt(X,u,op.phys?hit(op.x,u.t.d):op.x);} break;
      case 'chain': {const Q=queueOf(o);op.xs.forEach((v,i)=>{if(Q[i])hurt(X,Q[i],op.phys?hit(v,Q[i].t.d):v);});break;}
      case 'swapPos': {const L=o.field.map((u,i)=>[u,i]).filter(([u])=>isUnit(u)&&u.t.alive);if(L.length>1){const a=L[0][1],b=L[L.length-1][1];[o.field[a],o.field[b]]=[o.field[b],o.field[a]];}break;}
      case 'tauntLow': {const L=liveUnits(o).sort((x,y)=>x.t.a-y.t.a);if(L[0])L[0].t.taunt=true;break;}
      case 'guard': {const L=liveUnits(p).sort((x,y)=>(y.t.d*3+y.t.h)-(x.t.d*3+x.t.h));if(L[0]){L[0].t.taunt=true;if(op.d)L[0].t.d+=op.d;}break;}
      case 'fate': for(const u of liveUnits(p))u.t.fate=true; break;
      case 'summon': {const s=p.field.indexOf(it);if(s<0)break;const id=mkTok(op.tok);const u={uid:++TUID,id,item:null,temp:!op.stay};resetTurn(u);if(op.tok.lock)u.t.floor=Object.assign({},op.tok.lock==='all'?{a:op.tok.a,d:op.tok.d,h:op.tok.h}:{[op.tok.lock]:op.tok[op.tok.lock]});
        p.field[s]=u;X.summoned=(X.summoned||[]);X.summoned.push(u);break;}
      case 'echo': {X.echo=(X.echo||[]);for(let i=0;i<op.k;i++)X.echo.push({caster,spec:op.spec});break;}
      }
    }
  };
  const _cc=clashCoins;
  clashCoins=function(X,u){const r=_cc(X,u);if(u.t.fate)return r.map(k=>Object.assign({},k,{heads:k.v>0}));return r;};
  // 공격 순서를 그때그때 다시 읽는 전투 (소환물이 그 턴에 공격할 수 있게). 나머지는 원본과 같다
  runCombatCore=function(X){
    const A=X.P[X.ai],D=X.P[1-X.ai];const pend=[];
    for(const [p,who] of [[A,'atk'],[D,'def']])p.field.forEach((it,i)=>{if(isSpell(it))pend.push({p,it,who,k:i+1});});
    const acted=new Set();
    const ready=q=>q.who==='atk'?A.field.every((u,i)=>!isUnit(u)||i+1>=q.k||acted.has(u)||!u.t.alive):!D.field.some((u,i)=>isUnit(u)&&u.t.alive&&i+1<q.k);
    const sweep=()=>{for(const p of X.P){p.field.forEach((it,s)=>{if(isUnit(it)&&!it.t.alive)p.field[s]=null;});const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}for(const q of pend)q.k=q.p.field.indexOf(q.it)+1;};
    const fire=all=>{for(;;){let q=null;for(const w of ['atk','def']){const L=pend.filter(z=>z.who===w&&(all||ready(z))).sort((a,b)=>a.k-b.k);if(L.length){q=L[0];break;}}
      if(!q)return;pend.splice(pend.indexOf(q),1);castSpell(X,q.p.idx,q.it,q.k);const s=q.p.field.indexOf(q.it);if(s>=0)q.p.field[s]=null;
      while(X.echo&&X.echo.length){const e=X.echo.shift();const tmp={uid:++TUID,id:mkSpell('ECHO'+TUID,e.spec)};castSpell(X,e.caster,tmp,0);}
      sweep();}};
    fire(false);throwPhase(X);sweep();
    for(;;){const Au=A.field.find(u=>isUnit(u)&&u.t.alive&&!acted.has(u));if(!Au)break;acted.add(Au);if(!Au.t.rest){attackOne(X,Au);sweep();}fire(false);}
    fire(true);sweep();return X.direct;};
  function battle(A,B,seed,maxT,first){ // A,B: [{id}|{spell:id}] — 마법은 그 쪽 첫 턴(공격이든 방어든)에만 놓인다
    const mk=(arr,idx)=>({idx,name:'P'+idx,life:99,crystals:[],burn:[],reload:0,bonus:0,field:arr.map(x=>({uid:++TUID,id:x.id})).concat(Array(RULES.slots-arr.length).fill(null))});
    const P=[mk(A,0),mk(B,1)];
    for(let t=0;t<(maxT||12);t++){const ai=(t+first)%2;
      for(const p of P)for(const it of p.field)if(it&&isUnit(it))resetTurn(it);
      if(t===2)for(const p of P)p.field=p.field.map(it=>it&&isSpell(it)?null:it);
      runCombatCore(ctx(P,ai,t,null,{seed:seed*131+t}));
      for(const p of P){p.field=p.field.map(it=>(it&&(it.temp||(isSpell(it))))?null:it);const xs=p.field.filter(Boolean);p.field=xs.concat(Array(RULES.slots-xs.length).fill(null));}
      const la=liveUnits(P[0]).length,lb=liveUnits(P[1]).length;
      if(!lb&&la)return 1;if(!la&&lb)return 0;if(!la&&!lb)return 0.5;}
    const s=p=>liveUnits(p).reduce((s,u)=>s+C(u).lv,0);const a=s(P[0]),b=s(P[1]);return a>b?1:a<b?0:0.5;}
  this.battle=battle;this.mkSpell=mkSpell;`);
  return ctx;}
// 마법 sid의 값: 같은 판(2~4 대 2~4, 레벨 L±1)에서 내 쪽에 마법을 무작위 칸에 넣었을 때 승률 − 안 넣었을 때.
// role atk: 내가 먼저 공격하는 턴에 놓임 / def: 상대가 먼저 공격하는 턴에 놓임. 생명 대가는 1 = 승률 1.5%p로 뺀다
function value(ctx,sid,L,role,N,seed0){const CL=ctx.ev('CARD_LIST');const U=CL.filter(c=>c.type==='unit'&&!c.rev&&c.up===0);
  let s=seed0||4242;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
  const pools={};for(let l=1;l<=8;l++)pools[l]=U.filter(u=>u.lv===l);
  let d=0;for(let i=0;i<N;i++){const n=2+((R()*3)|0),m=2+((R()*3)|0);const lv=()=>Math.max(1,Math.min(8,L-1+((R()*3)|0)));
    const A=Array.from({length:n},()=>({id:pick(pools[lv()]).id})),B=Array.from({length:m},()=>({id:pick(pools[lv()]).id}));
    const pos=(R()*(n+1))|0;const A2=A.slice();A2.splice(pos,0,{id:sid});const seed=(R()*1e9)|0;const first=role==='atk'?0:1;
    d+=ctx.battle(A2,B,seed,12,first)-ctx.battle(A,B,seed,12,first);}
  const c=ctx.ev('CARDS')[sid];return d/N*100-1.5*((c.cost&&c.cost.life)||0)+1.5*((c.gain&&c.gain.life)||0)-6*((c.cost&&c.cost.ether)||0);}
module.exports={make,value};
// 유닛 곡선: 같은 판에 레벨 ℓ 유닛(무작위)을 넣었을 때의 값 (ℓ=1..8). 마법의 레벨 = 이 곡선 위에서 같은 값이 나오는 ℓ
function unitCurve(ctx,L,role,N,seed0){const CL=ctx.ev('CARD_LIST');const U=CL.filter(c=>c.type==='unit'&&!c.rev&&c.up===0);const out=[];
  for(let l=1;l<=8;l++){let s=seed0||4242;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
    const pools={};for(let q=1;q<=8;q++)pools[q]=U.filter(u=>u.lv===q);let d=0;
    for(let i=0;i<N;i++){const n=2+((R()*3)|0),m=2+((R()*3)|0);const lv=()=>Math.max(1,Math.min(8,L-1+((R()*3)|0)));
      const A=Array.from({length:n},()=>({id:pick(pools[lv()]).id})),B=Array.from({length:m},()=>({id:pick(pools[lv()]).id}));
      const pos=(R()*(n+1))|0;const A2=A.slice();A2.splice(pos,0,{id:pick(pools[l]).id});const seed=(R()*1e9)|0;const first=role==='atk'?0:1;
      d+=ctx.battle(A2,B,seed,12,first)-ctx.battle(A,B,seed,12,first);}
    out.push(d/N*100);}return out;}
function toLevel(T,g){if(g<=T[0]){const s=Math.max(1e-6,T[1]-T[0]);return 1+(g-T[0])/s;}for(let i=0;i<7;i++)if(g<=T[i+1])return i+1+(g-T[i])/Math.max(1e-6,T[i+1]-T[i]);const s=Math.max(1e-6,T[7]-T[6]);return 8+(g-T[7])/s;}
// 마법의 환산 레벨: 판 레벨 = 마법 레벨(stage). 대가: 장전 1 = 1레벨, 생명 1 = 0.3레벨, 얻는 생명 1 = 0.3레벨
function rawValue(ctx,sid,L,role,N,seed0){const save=ctx.ev('CARDS')[sid];const c={cost:save.cost,gain:save.gain};save.cost={};save.gain={};const v=value(ctx,sid,L,role,N,seed0);save.cost=c.cost;save.gain=c.gain;return v;}
function levelOf(ctx,sid,stage,N,curves){const c=ctx.ev('CARDS')[sid];const roles=c.type==='atk'?['atk']:c.type==='def'?['def']:['atk','def'];const per={};
  for(const r of roles){const key=stage+r;curves[key]=curves[key]||unitCurve(ctx,stage,r,N);per[r]=toLevel(curves[key],rawValue(ctx,sid,stage,r,N));}
  const cost=((c.cost&&c.cost.ether)||0)+0.3*((c.cost&&c.cost.life)||0)-0.3*((c.gain&&c.gain.life)||0);
  const best=Math.max(...Object.values(per));return {e:+(best-cost).toFixed(2),per,cost};}
module.exports.unitCurve=unitCurve;module.exports.toLevel=toLevel;module.exports.levelOf=levelOf;module.exports.rawValue=rawValue;

const C=require('./common.js');const T=require('./spelltext.js');const {makeEval}=require('./spell_eval.js');const fs=require('fs');
const [,,shard,nsh,out,idsArg]=process.argv;const N=1000,SEEDS=[0,1];
const ev=makeEval(C.UNITS,C.durOf(C.UNITS),C.SPELLS,N,SEEDS,false);
const clone=o=>JSON.parse(JSON.stringify(o));
const AR={back:[1,5],front:[1,3],maxA:[1,3]};
const DUR=C.durOf(C.UNITS);const AT=[];for(let lv=1;lv<=8;lv++){const Z=C.UNITS.filter(u=>u.lv===lv&&u.up===0&&!u.rev);AT.push(Z.reduce((t,u)=>t+u.a+C.ev(u,'a'),0)/Z.length);}
const CAP=(lv,k)=>k==='x'?Math.ceil(DUR[lv-1])+1:k==='a'?Math.ceil(AT[lv-1])+1:k==='d'?3:k==='h'?Math.ceil(DUR[lv-1])+1:3;
// 움직임: [이름, 벌점, (s)=>새 s 또는 null]
function moves(s,s0){const M=[];
  s.ops.forEach((op,i)=>{
    const num=(k,lo,hi)=>{for(const dv of [-1,1])M.push([i+k+dv,0.04,t=>{const o=t.ops[i];const v=Math.abs(o[k])+dv;if(v<lo||v>hi)return null;o[k]=Math.sign(o[k]||1)*v;return t;}]);};
    if(op.op==='dmg')num('x',1,CAP(s.lv,'x'));if(op.op==='thorns')num('x',1,3);
    if(op.op==='mod')for(const st of ['a','d','h'])if(op[st])num(st,1,Math.max(Math.abs(op[st]),CAP(s.lv,st)));
    if(['dmg','thorns','mod'].includes(op.op)){
      if(op.coin){for(const dv of [-1,1])M.push([i+'c'+dv,0.05,t=>{const o=t.ops[i];const n=o.coin[0]+dv;if(n>4)return null;if(n===0){if(o.op==='mod'&&!(o.a||o.d||o.h))return null;delete o.coin;delete o.cs;}else o.coin=[n,o.coin[1]];return t;}]);}
      else{const cand=op.op==='mod'?['a','d','h'].filter(st=>op[st]).map(st=>[st,Math.sign(op[st])]):[[null,1]];
        for(const [st,sg] of cand)M.push([i+'+c'+st,0.06,t=>{const o=t.ops[i];o.coin=[1,sg];if(st)o.cs=st;return t;}]);}}
    if(op.area&&AR[op.area.t]){const g=op.side+op.area.t+op.area.n;const first=s.ops.findIndex(o=>o.area&&o.side+o.area.t+o.area.n===g);
      if(first===i)for(const dv of [-1,1])M.push([i+'n'+dv,0.08,t=>{const n=op.area.n+dv;const [lo,hi]=AR[op.area.t];if(n<lo||n>hi)return null;t.ops.forEach(o=>{if(o.area&&o.side+o.area.t+o.area.n===g)o.area.n=n;});return t;}]);}
  });
  if(s.cost&&s.cost.life)for(const dv of [-1,1])M.push(['L'+dv,0.1,t=>{const v=t.cost.life+dv;if(v<1)return null;t.cost.life=v;return t;}]);
  if(s.gain&&s.gain.life)for(const dv of [-1,1])M.push(['G'+dv,0.1,t=>{const v=t.gain.life+dv;if(v<1)return null;t.gain.life=v;return t;}]);
  return M;}
const res={};const ids=idsArg?idsArg.split(','):null;
const list=C.SPELLS.filter((s,j)=>ids?ids.includes(s.id):j%+nsh===+shard);
for(const s0 of list){let s=clone(s0);const r0=ev.evalSpell(s);let cur=r0.e;let pen=0;const hist=[+cur.toFixed(2)];const tag=[];
  const cost=(e,p)=>Math.abs(e-s0.lv)+p;
  let cc=cost(cur,0);
  for(let step=0;step<12&&Math.abs(cur-s0.lv)>0.25;step++){let best=null;
    for(const [nm,p,f] of moves(s,s0)){const t=f(clone(s));if(!t)continue;const e=ev.evalSpell(t).e;const c=cost(e,pen+p);if(c<cc-0.05&&(!best||c<best.c))best={t,e,c,nm,p};}
    if(!best&&Math.abs(cur-s0.lv)>0.3){ // 두 수 함께
      const M=moves(s,s0);for(let a=0;a<M.length;a++)for(let b=a+1;b<M.length;b++){let t=M[a][2](clone(s));if(!t)continue;
        const Mb=moves(t,s0).find(m=>m[0]===M[b][0]);if(!Mb)continue;t=Mb[2](t);if(!t)continue;const e=ev.evalSpell(t).e;const c=cost(e,pen+M[a][1]+M[b][1]);if(c<cc-0.05&&(!best||c<best.c))best={t,e,c,nm:M[a][0]+'&'+M[b][0],p:M[a][1]+M[b][1]};}}
    if(!best)break;s=best.t;cur=best.e;cc=best.c;pen+=best.p;hist.push(+cur.toFixed(2));tag.push(best.nm);}
  const text=T.rewrite2(s0,s);const chk=T.check(Object.assign({},s,{text}));
  res[s0.id]={e0:+r0.e.toFixed(2),e:+cur.toFixed(2),ops:s.ops,cost:s.cost,gain:s.gain,text,chk,hist,tag};
  console.log(s0.id,s0.lv,r0.e.toFixed(2),'→',cur.toFixed(2),tag.join(','),'|',text,chk.length?'TEXTBAD':'');
  fs.writeFileSync(out,JSON.stringify(res));}
console.log('END');

// 남은 오차 > 3 카드: 코인 하나 빼기/바꾸기까지 허용해 마무리
const L=require('./lib.js');const fs=require('fs');const R=JSON.parse(fs.readFileSync('units_v08p.json'));const N=R.units;
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const poolOf=(A,P)=>A.filter(v=>v.lv===P&&v.up===0);const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));
const key=u=>u.lv+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(u.co);
const cap=lv=>lv<=2?2:3, vcap=lv=>lv<=4?1:2;
function coinVariants(co,lv){const out=[co];const flat=[];co.forEach(([s,n,v])=>{for(let i=0;i<n;i++)flat.push([s,v]);});
  const pack=f=>{const m=new Map();f.forEach(([s,v])=>m.set(s+','+v,(m.get(s+','+v)||0)+1));return [...m].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v]});};
  for(let i=0;i<flat.length;i++){const f=flat.slice();f.splice(i,1);out.push(pack(f));for(const s of ['a','d','h']){const g=flat.slice();g[i]=[s,flat[i][1]];out.push(pack(g));}}
  if(flat.length<cap(lv))for(const s of ['a','d','h'])out.push(pack([...flat,[s,vcap(lv)]]));
  return out;}
const before=N.map(u=>u.w);
for(const u of N){const pool=poolOf(N,PL(u));const e0=Math.abs(u.w-u.tgt);if(e0<=3)continue;
  const keys=new Set(N.filter(v=>v!==u&&v.lv===u.lv).map(key));const E0={a:u.a+ev(u,'a'),d:u.d+ev(u,'d'),h:u.h+ev(u,'h')};
  let best=null,bs=e0;
  for(const co of coinVariants(u.co,u.lv))for(const da of [-1,0,1])for(const dd of [-1,0,1])for(const dh of [-1,0,1]){
    const c={...u,co,a:u.a+da,d:u.d+dd,h:u.h+dh};if(c.a<1||c.h<1||keys.has(key(c)))continue;
    const E={a:c.a+ev(c,'a'),d:c.d+ev(c,'d'),h:c.h+ev(c,'h')};const mv=Math.abs(E.a-E0.a)+Math.abs(E.h-E0.h)+2*Math.abs(E.d-E0.d);
    const e=Math.abs(L.winVs(c,pool)-u.tgt);const s=e+0.4*mv;if(s<bs){bs=s;best=c;}}
  if(best){Object.assign(u,{a:best.a,d:best.d,h:best.h,co:best.co});}}
for(const u of N)u.w=+L.winVs(u,poolOf(N,PL(u))).toFixed(1);
const errs=N.map(u=>Math.abs(u.w-u.tgt));console.error('mean',(errs.reduce((a,b)=>a+b)/errs.length).toFixed(2),'>2',errs.filter(e=>e>2).length,'>3',errs.filter(e=>e>3).length,'max',Math.max(...errs).toFixed(1));
const X={};for(let P=1;P<=7;P++){const up=poolOf(N,P+1),lo=poolOf(N,P);X[P]=up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length;}X[8]=X[7];R.Xnew=X;console.error('X',Object.values(X).map(x=>x.toFixed(1)).join(' '));
let nd=0;const ss=new Set();N.forEach(u=>{if(ss.has(key(u)))nd++;ss.add(key(u));});console.error('dups',nd,'maxcoins',Math.max(...N.map(u=>u.co.reduce((s,c)=>s+c[1],0))));
fs.writeFileSync('units_v08q.json',JSON.stringify(R));

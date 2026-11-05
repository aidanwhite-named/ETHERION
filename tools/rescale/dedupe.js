const L=require('./lib.js');const fs=require('fs');const R=JSON.parse(fs.readFileSync(process.argv[2]));const N=R.units;
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const poolOf=(A,P)=>A.filter(v=>v.lv===P&&v.up===0);const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));
const SO={a:0,d:1,h:2};const canon=co=>co.filter(c=>c[1]>0).slice().sort((x,y)=>SO[x[0]]-SO[y[0]]||y[2]-x[2]);
const ck=u=>u.lv+'|'+u.up+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(canon(u.co));
const cap=lv=>lv<=2?2:3, vcap=lv=>lv<=4?1:2;
function coinVariants(co,lv){const out=[co];const flat=[];co.forEach(([s,n,v])=>{for(let i=0;i<n;i++)flat.push([s,v]);});
  const pack=f=>{const m=new Map();f.forEach(([s,v])=>m.set(s+','+v,(m.get(s+','+v)||0)+1));return canon([...m].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v]}));};
  for(let i=0;i<flat.length;i++){const f=flat.slice();f.splice(i,1);out.push(pack(f));for(const s of ['a','d','h']){const g=flat.slice();g[i]=[s,flat[i][1]];out.push(pack(g));}}
  if(flat.length<cap(lv))for(const s of ['a','d','h'])out.push(pack([...flat,[s,vcap(lv)]]));return out;}
N.forEach(u=>u.co=canon(u.co));
const seen=new Set();let fixed=0;
for(const u of N){if(!seen.has(ck(u))){seen.add(ck(u));continue;}
  const pool=poolOf(N,PL(u));const E0={a:u.a+ev(u,'a'),d:u.d+ev(u,'d'),h:u.h+ev(u,'h')};let best=null,bs=1e9;
  const all=new Set(N.filter(v=>v!==u).map(ck));
  for(const co of coinVariants(u.co,u.lv))for(const da of [-1,0,1])for(const dd of [-1,0,1])for(const dh of [-1,0,1]){
    const c={...u,co,a:u.a+da,d:u.d+dd,h:u.h+dh};if(c.a<1||c.h<1||all.has(ck(c))||seen.has(ck(c)))continue;
    const E={a:c.a+ev(c,'a'),d:c.d+ev(c,'d'),h:c.h+ev(c,'h')};const mv=Math.abs(E.a-E0.a)+Math.abs(E.h-E0.h)+2*Math.abs(E.d-E0.d);
    const s=Math.abs(L.winVs(c,pool)-u.tgt)+0.4*mv;if(s<bs){bs=s;best=c;}}
  Object.assign(u,{a:best.a,d:best.d,h:best.h,co:best.co});seen.add(ck(u));fixed++;}
for(const u of N)u.w=+L.winVs(u,poolOf(N,PL(u))).toFixed(1);
const errs=N.map(u=>Math.abs(u.w-u.tgt));console.error('fixed',fixed,'mean',(errs.reduce((a,b)=>a+b)/errs.length).toFixed(2),'>2',errs.filter(e=>e>2).length,'>3',errs.filter(e=>e>3).length,'max',Math.max(...errs).toFixed(1));
const s2=new Set();let nd=0;N.forEach(u=>{if(s2.has(ck(u)))nd++;s2.add(ck(u))});console.error('dups',nd);
const X={};for(let P=1;P<=7;P++){const up=poolOf(N,P+1),lo=poolOf(N,P);X[P]=up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length;}X[8]=X[7];R.Xnew=X;console.error('X',Object.values(X).map(x=>x.toFixed(1)).join(' '));
fs.writeFileSync(process.argv[3],JSON.stringify(R));

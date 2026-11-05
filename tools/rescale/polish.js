// 오차 큰 카드 마무리: 모양 벌점을 낮추고, 코인 하나를 기본 스탯으로 옮기는 수도 허용
const L=require('./lib.js');const fs=require('fs');const R=JSON.parse(fs.readFileSync('units_v08.json'));const N=R.units;
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const poolOf=(A,P)=>A.filter(v=>v.lv===P&&v.up===0);const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));
const evs=(a,d,h,co)=>{const u={a,d,h,co};return {a:a+ev(u,'a'),h:h+ev(u,'h'),d:d+ev(u,'d')};};
const share=(u)=>{const e=evs(u.a,u.d,u.h,u.co);return e.a/Math.max(0.5,e.a+e.h);};
const oshare=u=>{const e=evs(u.prev[0],u.prev[1],u.prev[2],u.prevCo);return e.a/Math.max(0.5,e.a+e.h);};
const OLDM={},NEWM={};for(let lv=1;lv<=8;lv++){const Z=N.filter(u=>u.lv===lv&&u.up===0);OLDM[lv]=Z.reduce((t,u)=>{const e=evs(u.prev[0],u.prev[1],u.prev[2],u.prevCo);return t+e.a+e.h},0)/Z.length;NEWM[lv]=Z.reduce((t,u)=>{const e=evs(u.a,u.d,u.h,u.co);return t+e.a+e.h},0)/Z.length;}
const sizeDev=(c,u)=>{const e=evs(c.a,c.d,c.h,c.co),o=evs(u.prev[0],u.prev[1],u.prev[2],u.prevCo);return Math.abs(e.a+e.h-(o.a+o.h)*NEWM[u.lv]/OLDM[u.lv]);};
const key=u=>u.lv+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(u.co);
for(let pass=0;pass<4;pass++){let fixed=0;
 for(const u of N){const pool=poolOf(N,PL(u));let e0=Math.abs(L.winVs(u,pool)-u.tgt);const d0=Math.abs(share(u)-oshare(u));const z0=sizeDev(u,u);if(e0<=1.5&&d0<=0.1&&z0<=1.5)continue;
  const keys=new Set(N.filter(v=>v!==u&&v.lv===u.lv).map(key));
  const cands=[];const D=d0>0.1?[-3,-2,-1,0,1,2,3]:[-2,-1,0,1,2];
  for(const da of D)for(const dd of [-1,0,1])for(const dh of D){if(!da&&!dd&&!dh)continue;const c={...u,a:u.a+da,d:u.d+dd,h:u.h+dh};cands.push([c,Math.abs(da)+Math.abs(dh)+2*Math.abs(dd)]);}
  for(const c0 of cands.slice()){} 
  let best=null,bs=e0+6*d0+0.5*z0;
  for(const [c,mv] of cands){if(c.a<1||c.h<1||Math.abs(c.d-Math.round(u.prev[1]*(u.lv<=4?0.8:0.65)))>1||c.d<(u.lv<=2?-2:u.lv<=5?-3:-4)||keys.has(key(c)))continue;const e=Math.abs(L.winVs(c,pool)-u.tgt);const ds=Math.abs(share(c)-oshare(u));if(ds>Math.max(0.1,d0>0.1?0.1:0.12))continue;const zd=sizeDev(c,u);if(zd>Math.max(1.5,z0))continue;const s=e+6*ds+0.5*zd+0.15*mv;if((e<e0-0.5||d0>0.1||z0>1.5)&&s<bs){bs=s;best=c;}}
  if(best){u.a=best.a;u.d=best.d;u.h=best.h;fixed++;}}
 for(const u of N)u.w=+L.winVs(u,poolOf(N,PL(u))).toFixed(1);
 console.error('pass',pass,'fixed',fixed);if(!fixed)break;}
const errs=N.map(u=>Math.abs(u.w-u.tgt));
const z=N.filter(u=>u.up===0).map(u=>Math.abs(u.w-u.tgt)),k=N.filter(u=>u.up>0).map(u=>Math.abs(u.w-u.tgt));
console.error('mean',(errs.reduce((a,b)=>a+b)/errs.length).toFixed(2),'>2',errs.filter(e=>e>2).length,'>3',errs.filter(e=>e>3).length,'| up0 mean',(z.reduce((a,b)=>a+b)/z.length).toFixed(2),'>3',z.filter(e=>e>3).length,'| upkeep mean',(k.reduce((a,b)=>a+b)/k.length).toFixed(2),'>3',k.filter(e=>e>3).length);
// X 재측정
const X={};for(let P=1;P<=7;P++){const up=poolOf(N,P+1),lo=poolOf(N,P);X[P]=up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length;}X[8]=X[7];R.Xnew=X;
console.error('X',Object.values(X).map(x=>x.toFixed(1)).join(' '));
fs.writeFileSync('units_v08p.json',JSON.stringify(R));

const sh=N.map(u=>Math.abs(share(u)-oshare(u)));console.error('share drift mean',(sh.reduce((a,b)=>a+b)/sh.length).toFixed(3),'>0.12',sh.filter(x=>x>0.12).length,'>0.2',sh.filter(x=>x>0.2).length);
const zz=N.map(u=>sizeDev(u,u));console.error('size dev mean',(zz.reduce((a,b)=>a+b)/zz.length).toFixed(2),'>1.5',zz.filter(x=>x>1.5).length,'>2.5',zz.filter(x=>x>2.5).length);

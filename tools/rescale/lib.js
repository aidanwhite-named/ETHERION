// 유닛 1:1 계산 (코인 카드 시뮬레이터 재현)
const fs=require('fs');
function loadUnits(file){const src=fs.readFileSync(file,'utf8');return JSON.parse(src.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);}
function outcomes(u){ // [{a,d,h,p}]
  let o=[{a:u.a,d:u.d,h:u.h,p:1}];
  for(const [st,n,v] of u.co) for(let i=0;i<n;i++){const nx=[];for(const x of o){nx.push({...x,p:x.p/2});const y={...x,p:x.p/2};y[st]+=v;nx.push(y);}o=nx;}
  const m=new Map();for(const x of o){const k=x.a+','+x.d+','+x.h;const e=m.get(k);if(e)e.p+=x.p;else m.set(k,{...x});}
  return [...m.values()];
}
const HMIN=1;
// A가 B를 공격: [A승, B승] 확률
function attack(OA,OB){let wa=0,wb=0;for(const x of OA)for(const y of OB){const p=x.p*y.p;const dmg=Math.max(0,x.a-y.d);if(dmg>=Math.max(HMIN,y.h)){wa+=p;continue;}const c=Math.max(0,y.a-x.d);if(c>=Math.max(HMIN,x.h))wb+=p;}return [wa,wb];}
function duel(OA,OB){const [a1,b1]=attack(OA,OB);const [b2,a2]=attack(OB,OA);const wa=(a1+a2)/2,wb=(b1+b2)/2;return {w:wa+(1-wa-wb)/2,kill:(a1+b2)/2,decide:(a1+b1+a2+b2)/2};}
function winVs(u,pool,cache){const OA=outcomes(u);let s=0,n=0;for(const v of pool){if(v===u)continue;const OB=cache?cache.get(v)||(cache.set(v,outcomes(v)),cache.get(v)):outcomes(v);s+=duel(OA,OB).w;n++;}return s/n*100;}
module.exports={loadUnits,outcomes,attack,duel,winVs};

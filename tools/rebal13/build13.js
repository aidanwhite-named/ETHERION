// units_v13.json + 단체 체력 보정(offsets13.json) → js/data.js. node build13.js
const fs=require('fs'),path=require('path');const L=require('../rescale/lib.js');
const R=p=>path.join(__dirname,p);
// 마법·아이템·머리말은 지금 js/data.js에서(다른 작업을 덮지 않게), 바꾸기 전 유닛 값(v12)은 _backup_v1.2에서
const base=fs.readFileSync(R('../../js/data.js'),'utf8');const base12=fs.readFileSync(R('../../_backup_v1.2/js/data.js'),'utf8');
const old=JSON.parse(base12.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);const O=Object.fromEntries(old.map(u=>[u.id,u]));
const U=JSON.parse(fs.readFileSync(R('units_v13.json')));
const off=fs.existsSync(R('offsets13.json'))?JSON.parse(fs.readFileSync(R('offsets13.json'))).off:{};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return ((h>>>0)%1000)/1000;};
const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));const cache=new Map();
const out=U.map(u0=>{const u={...u0,co:u0.co.map(c=>c.slice())};for(const k of Object.keys(u))if(k[0]==='_')delete u[k];return u;});
// 단체 체력 보정: 3레벨 이상(역행 제외)에 평균 o만큼. 정수 몫은 모두에게, 소수 몫은 1:1 승률이 50에서 먼 쪽(빼면 센 카드, 더하면 약한 카드)부터
const w1=Object.fromEntries(out.map(u=>[u.id,L.winVs(u,out.filter(v=>v.lv===PL(u)&&v.up===0),cache)]));
for(const g in off){const o=off[g];if(!o)continue;const Z=out.filter(u=>u.g===g&&!u.rev&&u.lv>=3);const f=Math.floor(o),k=Math.round((o-f)*Z.length);
  for(const u of Z)u.h=Math.max(1,u.h+f);
  Z.slice().sort((x,y)=>w1[x.id]-w1[y.id]).slice(0,k).forEach(u=>{u.h+=1;});}
// 같은 레벨·유지비에 스탯·코인이 똑같은 카드가 없게: 값 차이가 가장 작은 비틀기 (공↔체 코인 하나 바꾸기 ±0.1, 공+1·체−1 +0.2, 공−1·체+1 −0.2)
const Wa=1.2;const key=u=>u.lv+'|'+u.up+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(u.co);
const norm=co=>{const mm=new Map();for(const [s,n,v] of co){const k=s+','+v;mm.set(k,(mm.get(k)||0)+n);}return [...mm].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v];}).sort((x,y)=>(x[0]+x[2]).localeCompare(y[0]+y[2]));};
const seen=new Set();let ndup=0;
for(const u of out){if(!seen.has(key(u))){seen.add(key(u));continue;}ndup++;
  const C=[];
  u.co.forEach((c,i)=>{if(c[0]==='a'||c[0]==='h'){const t=c[0]==='a'?'h':'a';const co=u.co.map(x=>x.slice());co[i][1]--;co.push([t,1,c[2]]);C.push({...u,co:norm(co.filter(x=>x[1]>0)),dv:(t==='a'?1:-1)*(Wa-1)*0.5*c[2]});}});
  u.co.forEach((c,i)=>{if(c[0]==='d'){const co=u.co.map(x=>x.slice());co[i][1]--;co.push(['h',1,c[2]]);C.push({...u,co:norm(co.filter(x=>x[1]>0)),dv:-0.15*c[2]});}});
  u.co.forEach((c,i)=>{if(c[0]==='h'&&c[2]>0){const co=u.co.map(x=>x.slice());co[i][1]--;co.push(['d',1,c[2]]);C.push({...u,co:norm(co.filter(x=>x[1]>0)),dv:0.15*c[2]});}});
  if(u.d===0){C.push({...u,a:u.a-1,d:1,dv:1.3-Wa});C.push({...u,a:u.a-1,d:1,co:norm(u.co.map(c=>c[0]==='d'?['h',c[1],c[2]]:c.slice())),dv:1.3-Wa-0.15});}
  C.push({...u,a:u.a+1,h:u.h-1,dv:Wa-1},{...u,a:u.a-1,h:u.h+1,dv:1-Wa},{...u,a:u.a+1,h:u.h-2,dv:Wa-2},{...u,a:u.a-1,h:u.h+2,dv:2-Wa});
  const pool=out.filter(v=>v.lv===PL(u)&&v.up===0);const w0=L.winVs(u,pool,cache);
  const ok=C.filter(c=>c.h>=1&&c.a>=(u.rev?0:1)&&!seen.has(key(c))).map(c=>({...c,sc:Math.abs(c.dv)+0.05*Math.abs(L.winVs(c,pool,new Map())-w0)})).sort((x,y)=>x.sc-y.sc);
  if(ok.length){const c=ok[0];u.a=c.a;u.d=c.d;u.h=c.h;u.co=c.co;}seen.add(key(u));}
for(const u of out){const p=O[u.id];if(p.a!==u.a||p.d!==u.d||p.h!==u.h||JSON.stringify(p.co)!==JSON.stringify(u.co)){u.v12=[p.a,p.d,p.h];u.v12Co=p.co;}else{delete u.v12;delete u.v12Co;}}
// 1:1 승률 다시 (같은 환산 레벨, 유지비 0 유닛 상대)
for(const u of out){const pool=out.filter(v=>v.lv===PL(u)&&v.up===0);u.w=+L.winVs(u,pool,cache).toFixed(1);}
const a=base.indexOf('const SIM_UNITS=');const b=base.indexOf('];',a)+2;
let txt=base.slice(0,a)+'const SIM_UNITS='+JSON.stringify(out)+';'+base.slice(b);
if(!txt.includes('v1.3: 음수 방어'))txt=txt.replace('카드별 1:1 재조정(v0.3 단체 밸런스로 벗어난 몫은 레벨 단위로 옮김). tools/rescale 참고.','카드별 1:1 재조정(v0.3 단체 밸런스로 벗어난 몫은 레벨 단위로 옮김). tools/rescale 참고.\n       v1.3: 음수 방어 없앰(방어 −1 = 체력 1), 가격표 공 1.2 · 방어 계단(0 아래 1.0, 0→1 1.3, 그 위 1.5) · 체력 1로 체력 재조정, 단체 체력 보정. v12/v12Co = 바꾸기 전 값. tools/rebal13');
fs.writeFileSync(R('../../js/data.js'),txt);
const S2=new Set(out.map(key));console.log('written; offsets',JSON.stringify(off),'neg d',out.filter(u=>u.d<0).length,'dups fixed',ndup,'left',out.length-S2.size);

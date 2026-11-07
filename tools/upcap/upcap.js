// 유지비 상한 (v3.12.7): 유닛의 유지비는 레벨 − 1까지. 넘는 카드는 유지비를 레벨 − 1로 내리고 스탯을 다시 맞춘다.
//   node upcap.js          → 계획만 출력
//   node upcap.js --write  → js/data.js에 쓴다 (바꾸기 전 값은 카드의 preUp = [유지비, 공, 방, 체, 코인])
// 목표 1:1 승률 = 옛 승률 − (옛 레벨·유지비 칸 평균) + (새 레벨·유지비 칸 평균). 칸 평균은 규칙 안 카드(역행 제외)로.
// 1:1은 같은 환산 레벨(floor(레벨 + 유지비/2)) 유지비 0 카드 상대 (rebal13/build13.js와 같은 계산)
const fs=require('fs'),path=require('path');const L=require('../rescale/lib.js');
const R=p=>path.join(__dirname,p);const FILE=R('../../js/data.js');
const src=fs.readFileSync(FILE,'utf8');const U=JSON.parse(src.match(/const SIM_UNITS=(\[.*?\]);/s)[1]);
const MAXUP=lv=>Math.max(0,lv-1);
const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));const cache=new Map();
const pool=lv=>U.filter(v=>v.lv===lv&&v.up===0&&!bad(v));
const bad=u=>u.up>MAXUP(u.lv);
const win=u=>L.winVs(u,pool(PL(u)),new Map());
const Wa=1.2;const price=u=>{let ea=u.a,ed=u.d,eh=u.h;for(const [s,n,v] of u.co){const e=n*v*0.5;if(s==='a')ea+=e;else if(s==='d')ed+=e;else eh+=e;}
  const dv=ed<=0?ed:ed<=1?1.3*ed:1.3+1.5*(ed-1);return Wa*ea+dv+eh;};
// 칸 평균
const cell={},cellP={};for(const u of U){if(u.rev)continue;const k=u.lv+'|'+u.up;(cell[k]=cell[k]||[]).push(u.w);(cellP[k]=cellP[k]||[]).push(price(u));}
const mean=a=>a&&a.length?a.reduce((s,x)=>s+x,0)/a.length:null;
const avg=k=>mean(cell[k])??50;const avgP=k=>mean(cellP[k]);
// 같은 카드 금지
const key=u=>u.lv+'|'+u.up+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(u.co);
const taken=new Set(U.filter(u=>!bad(u)).map(key));
// 코인 후보: 원래 코인 그대로 + 개수·스탯을 조금 바꾼 것. 1~2레벨 2개, 3레벨 이상 3개, 값 1~4레벨 ±1
const coinLim=lv=>lv<=2?2:3;
function coinSets(u){
  // 원래 코인 + 개수 한도 안의 모든 +1 코인 묶음 (원래 음수 코인은 그대로 둔다)
  const neg=u.co.filter(c=>c[2]<0).map(c=>c.slice());const nneg=neg.reduce((s,c)=>s+c[1],0);
  const out=[u.co.map(c=>c.slice())];const S=['a','d','h'];const lim=coinLim(u.lv)-nneg;
  const rec=(i,left,acc)=>{if(i===S.length){out.push(norm([...neg,...acc]));return;}for(let k=0;k<=left;k++)rec(i+1,left-k,k?[...acc,[S[i],k,1]]:acc);};
  rec(0,Math.max(0,lim),[]);
  const seen=new Set();return out.filter(co=>{const k=JSON.stringify(sortCo(co));if(seen.has(k))return false;seen.add(k);return true;}).map(sortCo);
}
const ORD={a:0,d:1,h:2};const sortCo=co=>co.slice().sort((x,y)=>ORD[x[0]]-ORD[y[0]]||y[2]-x[2]);
function norm(co){const mm=new Map();for(const [s,n,v] of co){const k=s+','+v;mm.set(k,(mm.get(k)||0)+n);}return [...mm].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v];});}
const coinDist=(x,y)=>{const m={};for(const [s,n,v] of x)m[s+v]=(m[s+v]||0)+n;for(const [s,n,v] of y)m[s+v]=(m[s+v]||0)-n;return Object.values(m).reduce((s,v)=>s+Math.abs(v),0);};
const plan=[];
// 1) 카드마다 후보 40개 (규칙 안 카드와 겹치는 것은 뺌)  2) 순서를 바꿔 가며 서로 겹치지 않게 골라 점수 합이 가장 작은 배치
let rs=12345;const rnd=()=>(rs=(Math.imul(rs,1103515245)+12345)>>>0)/4294967296;
const BAD=U.filter(bad);const CAND={},META={};
for(const u of BAD){const nu={...u,up:MAXUP(u.lv)};
  const target=u.w-avg(u.lv+'|'+u.up)+avg(nu.lv+'|'+nu.up);
  const p0=price(u);const ko=u.lv+'|'+u.up,kn=nu.lv+'|'+nu.up;
  // 가격 목표: 옛 칸 평균에서 벗어난 만큼을 새 칸 평균에 옮긴다. 옛 칸에 카드가 하나뿐이면(저주 꼬마) 벗어남 0
  const tP=avgP(kn)+((cellP[ko]||[]).length>1?p0-avgP(ko):0);const ra=u.a/(u.a+u.h+u.d);
  const L0=[];
  for(const co of coinSets(u))for(let a=1;a<=12;a++)for(let d=0;d<=3;d++)for(let h=1;h<=12;h++){
    const c={...nu,a,d,h,co};if(taken.has(key(c)))continue;
    const pc=price(c);if(Math.abs(pc-tP)>2)continue;
    const w=win(c);
    const sc=2*Math.abs(pc-tP)+0.12*Math.abs(w-target)+6*Math.abs(a/(a+h+d)-ra)+1.5*Math.abs(d-u.d)+coinDist(co,u.co)*0.35;
    L0.push({...c,w:+w.toFixed(1),sc});}
  CAND[u.id]=L0.sort((x,y)=>x.sc-y.sc).slice(0,40);META[u.id]={target,p0,tP};}
let bestTot=1e9,bestPick=null;
for(let it=0;it<3000;it++){const ord=BAD.slice();if(it)for(let i=ord.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[ord[i],ord[j]]=[ord[j],ord[i]];}
  const used=new Set();let tot=0;const pick={};let ok=true;
  for(const u of ord){const c=CAND[u.id].find(c=>!used.has(key(c)));if(!c){ok=false;break;}used.add(key(c));pick[u.id]=c;tot+=c.sc;}
  if(ok&&tot<bestTot){bestTot=tot;bestPick=pick;}}
for(const u of BAD){const best=bestPick[u.id],m=META[u.id];taken.add(key(best));
  plan.push({id:u.id,n:u.n,from:[u.lv,u.up,u.a,u.d,u.h,u.co,u.w],to:[best.lv,best.up,best.a,best.d,best.h,best.co,best.w],target:+m.target.toFixed(1),p:[+m.p0.toFixed(2),+price(best).toFixed(2),+m.tP.toFixed(2)]});
  Object.assign(u,{preUp:[u.up,u.a,u.d,u.h,u.co],up:best.up,a:best.a,d:best.d,h:best.h,co:best.co,w:best.w});}
console.log('점수 합',bestTot.toFixed(2));
const cs=co=>co.map(([s,n,v])=>({a:'공',d:'방',h:'체'})[s]+(v>0?'+':'')+v+(n>1?'×'+n:'')).join(' ')||'-';
for(const p of plan)console.log(`${p.id} ${p.n}\tLv${p.from[0]} 유지${p.from[1]} ${p.from[2]}/${p.from[3]}/${p.from[4]} ${cs(p.from[5])} (${p.from[6]}%)  →  유지${p.to[1]} ${p.to[2]}/${p.to[3]}/${p.to[4]} ${cs(p.to[5])} (${p.to[6]}%, 목표 ${p.target})  가격 ${p.p[0]}→${p.p[1]} (목표 ${p.p[2]})`);
console.log('cellsP',JSON.stringify(Object.fromEntries(Object.keys(cellP).filter(k=>+k.split('|')[0]<=5).sort().map(k=>[k,+avgP(k).toFixed(2)]))));console.log('cells',JSON.stringify(Object.fromEntries(Object.keys(cell).filter(k=>+k.split('|')[0]<=5).sort().map(k=>[k,+avg(k).toFixed(1)]))));
const left=U.filter(bad).length;console.log('남은 위반',left,'중복',U.length-new Set(U.map(key)).size);
if(process.argv.includes('--write')){
  const a=src.indexOf('const SIM_UNITS=');const b=src.indexOf('];',a)+2;
  let txt=src.slice(0,a)+'const SIM_UNITS='+JSON.stringify(U)+';'+src.slice(b);
  const note='v1.3: 음수 방어 없앰';const add='\n       v3.12.7: 유지비 상한 = 레벨 − 1 (레벨 아이콘에 꽉 찬 칸이 적어도 하나). 넘던 19장은 유지비를 내리고 스탯을 다시 맞춤. preUp = 바꾸기 전 [유지비, 공, 방, 체, 코인]. tools/upcap';
  if(!txt.includes('v3.12.7: 유지비 상한')){const i=txt.indexOf('\n',txt.indexOf(note));txt=txt.slice(0,i)+add+txt.slice(i);}
  fs.writeFileSync(FILE,txt);fs.writeFileSync(R('plan.json'),JSON.stringify(plan,null,1));console.log('written');}

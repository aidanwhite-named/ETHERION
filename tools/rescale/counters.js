// 단체마다 역행 유닛. 벽: 공격 0~1 고정, 방어 고정, 체력을 찾음. 유리대포: 방어·체력 고정, 공격을 찾음.
const fs=require('fs');const L=require('./lib.js');const T=require('./teamsim.js');
const R=JSON.parse(fs.readFileSync('units_v08r.json'));const N=R.units;
const poolOf=P=>N.filter(v=>v.lv===P&&v.up===0);
// [id, 이름, 클래스, 레벨, 종류, 공, 방, 체, 코인]  (찾을 값은 null)
const SPEC=[
 ['B1-41','모래주머니 참호병','무장',2,'wall',0,2,null,[]],
 ['B1-42','방폭 갑주병','무장',4,'wall',1,2,null,[]],
 ['B1-43','포르탄 철갑 보루','무장',6,'wall',1,3,null,[]],
 ['B2-41','폭주 증기 골렘','무도',2,'glass',null,-1,1,[]],
 ['B2-42','과열 압착기','무도',4,'glass',null,-2,2,[]],
 ['B2-43','자폭 오토마톤','무도',6,'glass',null,-2,3,[]],
 ['B3-41','절연 방호기','무도',3,'wall',0,3,null,[]],
 ['B3-42','접지탑 파수꾼','마도',5,'wall',1,2,null,[]],
 ['G1-41','거북등 수인','무도',2,'wall',0,1,null,[]],
 ['G1-42','바위껍질 곰수인','무도',4,'wall',1,0,null,[]],
 ['G1-43','대지 장벽 주술사','기도',6,'wall',0,1,null,[]],
 ['G2-41','엘프 저격수','무장',2,'glass',null,0,1,[]],
 ['G2-42','독가시 말벌떼','무도',4,'glass',null,-1,2,[]],
 ['G2-43','벼락 맞은 분노목','무도',6,'glass',null,-1,3,[]],
 ['G3-41','물살 돌격 인어','무장',3,'glass',null,-1,1,[]],
 ['G3-42','해일 폭류 술사','마도',5,'glass',null,-2,2,[]],
 ['A1-41','계약의 볼모','기도',2,'wall',0,0,null,[]],
 ['A1-42','흑요 갑주 문지기','무장',4,'wall',1,3,null,[]],
 ['A1-43','심연 결계 수호자','마도',6,'wall',0,2,null,[]],
 ['A2-41','광신 돌격병','무장',2,'glass',null,-2,1,[]],
 ['A2-42','천벌의 집행자','기도',4,'glass',null,-1,1,[]],
 ['A2-43','불꽃 날개 순교자','기도',6,'glass',null,-3,4,[]],
 ['A3-41','고요의 결계사','마도',3,'wall',0,2,null,[]],
 ['A3-42','폭풍의 눈 수호령','마도',5,'wall',1,3,null,[]],
];
const out=[];
for(const [id,n,cl,lv,kind,a,d,h,co] of SPEC){const pool=poolOf(lv);const g=id.slice(0,2);
  const mk=x=>({id,n,g,lv,up:0,a:kind==='wall'?a:x,d,h:kind==='wall'?x:h,co,cl,kind});
  let rows=[];for(let x=1;x<=40;x++){const c=mk(x);const tw=(T.teamWin(c,pool,2500,11).avg+T.teamWin(c,pool,2500,23).avg)/2;rows.push([x,tw]);if(tw>56||(kind==='glass'&&x>=2*Math.max(...pool.map(v=>v.h+v.d))))break;}
  let best=rows.reduce((b,r)=>Math.abs(r[1]-50)<Math.abs(b[1]-50)?r:b);if(kind==='glass'){const nx=rows.find(r=>r[0]===best[0]+1);if(nx&&Math.abs(nx[1]-50)<=2.5)best=nx;}const c=mk(best[0]);const tw=T.teamWin(c,pool,4000,99);
  const one=L.winVs(c,pool);const OA=L.outcomes(c);let kill=0,die=0;for(const v of pool){const r=L.attack(OA,L.outcomes(v));kill+=r[0];const r2=L.attack(L.outcomes(v),OA);die+=r2[0];}
  c.team=+tw.avg.toFixed(1);c.teamK=Object.values(tw.res).map(x=>+x.toFixed(1));c.w=+one.toFixed(1);c.kill=+(kill/pool.length*100).toFixed(0);c.die=+(die/pool.length*100).toFixed(0);
  out.push(c);console.log(id,n,'L'+lv,kind,c.a+'/'+c.d+'/'+c.h,'team',c.team,c.teamK.join('/'),'1:1',c.w,'solo-kill',c.kill+'%','killed-by-one',c.die+'%');}
fs.writeFileSync('counters.json',JSON.stringify(out));

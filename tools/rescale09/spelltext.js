// 마법 문구 속 숫자 ↔ 효과 수치 대응. 종류별 k번째 등장끼리 맞춘다.
const RX=[
 ['life',/생명 (\d+)(을|를) 내고/g],
 ['coin',/([+−-])(\d+)C(?:×(\d+))?/g],
 ['dmg',/피해 (\d+)(?!C)/g],
 ['stat',/(공격|방어|체력) ([+−-]\d+)(?!C|\d)/g],
 ['thorns',/\[가시 (\d+)/g],
 ['gain',/생명 \+(\d+)/g],
 ['eth',/\[장전 (\d+)\]/g],
];
const SN={a:'공격',d:'방어',h:'체력'};
function expected(s){const E={life:[],coin:[],dmg:[],stat:[],thorns:[],gain:[],eth:[]};
  if(s.cost&&s.cost.life)E.life.push({v:s.cost.life});
  for(const [i,op] of s.ops.entries()){
    if(op.op==='dmg'){E.dmg.push({v:op.x,ref:[i,'x']});if(op.coin)E.coin.push({v:op.coin[1],n:op.coin[0],ref:[i,'coin']});}
    else if(op.op==='mod'){for(const st of ['a','d','h']){if(op[st])E.stat.push({st:SN[st],v:op[st],ref:[i,st]});if(op.coin&&(op.cs||'a')===st)E.coin.push({v:op.coin[1],n:op.coin[0],ref:[i,'coin']});}}
    else if(op.op==='thorns'){E.thorns.push({v:op.x,ref:[i,'x']});if(op.coin)E.coin.push({v:op.coin[1],n:op.coin[0],ref:[i,'coin']});}
  }
  if(s.gain&&s.gain.life)E.gain.push({v:s.gain.life});
  if(s.cost&&s.cost.ether)E.eth.push({v:s.cost.ether});return E;}
function found(text){const F={};for(const [k,rx] of RX){F[k]=[];let m;rx.lastIndex=0;while((m=rx.exec(text))){F[k].push({m:m[0],i:m.index,g:m.slice(1)});}}
  // 스탯 토큰 중 바로 뒤가 코인인 'C' 앞 숫자는 제외됨. 공격 −1 −1C 처럼 스탯+코인 둘 다 있는 경우 OK
  return F;}
const num=g=>+(g.replace('−','-'));
function check(s){const E=expected(s),F=found(s.text);const bad=[];
  for(const k in E){if(k==='stat'){ // 스탯은 이름과 값 모두
      if(E.stat.length!==F.stat.length){bad.push(k+' count '+E.stat.length+'/'+F.stat.length);continue;}
      E.stat.forEach((e,j)=>{const f=F.stat[j];if(f.g[0]!==e.st||num(f.g[1])!==e.v)bad.push('stat '+j+' '+e.st+e.v+' vs '+f.m);});continue;}
    if(k==='coin'){ // 'X개가 앞면' 등은 coin 정규식에 안 걸림. shield coin 은 expected 에 없음
      if(E.coin.length!==F.coin.length){bad.push('coin count '+E.coin.length+'/'+F.coin.length);continue;}
      E.coin.forEach((e,j)=>{const f=F.coin[j];const v=(f.g[0]==='+'?1:-1)*+f.g[1],n=f.g[2]?+f.g[2]:1;if(v!==e.v||n!==e.n)bad.push('coin '+j);});continue;}
    if(E[k].length!==F[k].length){bad.push(k+' count '+E[k].length+'/'+F[k].length);continue;}
    E[k].forEach((e,j)=>{if(num(F[k][j].g[0])!==e.v)bad.push(k+' '+j+' '+e.v+' vs '+F[k][j].m);});}
  return bad;}
// 새 수치로 문구 고치기 (뒤에서부터 치환)
const josa=(n,a,b)=>([0,1,3,6,7,8,10].includes(n%10===0&&n>=10?10:n%10)?a:b); // 받침 있으면 a(을)
function rewrite(s,ns){const E=expected(s),N=expected(ns),F=found(s.text);const reps=[];
  const fmt=v=>(v<0?'−':'+')+Math.abs(v);
  N.dmg.forEach((e,j)=>{const f=F.dmg[j];if(e.v!==E.dmg[j].v)reps.push([f.i,f.m.length,'피해 '+e.v]);});
  N.thorns.forEach((e,j)=>{const f=F.thorns[j];if(e.v!==E.thorns[j].v)reps.push([f.i,f.m.length,'[가시 '+e.v]);});
  N.stat.forEach((e,j)=>{const f=F.stat[j];if(e.v!==E.stat[j].v)reps.push([f.i,f.m.length,e.st+' '+fmt(e.v)]);});
  N.coin.forEach((e,j)=>{const f=F.coin[j];const o=E.coin[j];if(e.v!==o.v||e.n!==o.n)reps.push([f.i,f.m.length,fmt(e.v)+'C'+(e.n>1?'×'+e.n:'')]);});
  let t=s.text;reps.sort((a,b)=>b[0]-a[0]).forEach(([i,l,r])=>{t=t.slice(0,i)+r+t.slice(i+l);});
  t=t.replace(/피해 (\d+)(을|를) /g,(m,n)=>'피해 '+n+josa(+n,'을','를')+' ');
  return t;}
module.exports={expected,found,check,rewrite};
// ---- v2: 참조 기반 문구 고치기 (코인 추가·삭제, 범위, 생명) ----
const AREA_RX=/(상대|아군) (?:유닛 중 공격이 가장 높은 (\d+)기|맨 앞 (유닛|\d+기)|뒤 (\d+)칸)/g;
function areaTokens(text){const out=[];let m;AREA_RX.lastIndex=0;while((m=AREA_RX.exec(text))){const side=m[1]==='상대'?'foe':'ally';
  if(m[2])out.push({side,t:'maxA',n:+m[2],i:m.index,m:m[0]});else if(m[3])out.push({side,t:'front',n:m[3]==='유닛'?1:parseInt(m[3]),i:m.index,m:m[0]});else out.push({side,t:'back',n:+m[4],i:m.index,m:m[0]});}return out;}
const areaText=(side,t,n)=>(side==='foe'?'상대':'아군')+' '+(t==='maxA'?'유닛 중 공격이 가장 높은 '+n+'기':t==='front'?'맨 앞 '+(n===1?'유닛':n+'기'):'뒤 '+n+'칸');
function rewrite2(s,ns){
  const E=expected(s),N=expected(ns),F=found(s.text);const fmt=v=>(v<0?'−':'+')+Math.abs(v);
  const key=r=>r?r.join('|'):'';const OM={};
  for(const k in E)E[k].forEach((e,j)=>{if(e.ref)OM[k+':'+key(e.ref)]=F[k][j];});
  const edits=[]; // [pos,len,text]
  for(const k of ['dmg','thorns'])N[k].forEach(e=>{const f=OM[k+':'+key(e.ref)];const o=E[k].find(x=>key(x.ref)===key(e.ref));if(o.v!==e.v)edits.push([f.i,f.m.length,(k==='dmg'?'피해 ':'[가시 ')+e.v]);});
  N.stat.forEach(e=>{const f=OM['stat:'+key(e.ref)];const o=E.stat.find(x=>key(x.ref)===key(e.ref));if(!o)throw 'new stat';if(o.v!==e.v)edits.push([f.i,f.m.length,e.st+' '+fmt(e.v)]);});
  // 코인
  const ownerOf=(ref,op)=>{if(op.op==='mod')return OM['stat:'+ref[0]+'|'+(op.cs||'a')];return OM[(op.op==='dmg'?'dmg':'thorns')+':'+ref[0]+'|x'];};
  N.coin.forEach(e=>{const f=OM['coin:'+key(e.ref)];const txt=fmt(e.v)+'C'+(e.n>1?'×'+e.n:'');
    if(f){const o=E.coin.find(x=>key(x.ref)===key(e.ref));if(o.v!==e.v||o.n!==e.n)edits.push([f.i,f.m.length,txt]);}
    else{const ow=ownerOf(e.ref,ns.ops[e.ref[0]]);if(!ow)throw 'no owner '+s.id;edits.push([ow.i+ow.m.length,0,' '+txt]);}});
  E.coin.forEach(e=>{if(!N.coin.find(x=>key(x.ref)===key(e.ref))){const f=OM['coin:'+key(e.ref)];const sp=s.text[f.i-1]===' '?1:0;edits.push([f.i-sp,f.m.length+sp,'']);}});
  // 생명
  if(E.life.length&&N.life[0].v!==E.life[0].v){const f=F.life[0];edits.push([f.i,f.m.length,'생명 '+N.life[0].v+josa(N.life[0].v,'을','를')+' 내고']);}
  if(E.gain.length&&N.gain[0].v!==E.gain[0].v){const f=F.gain[0];edits.push([f.i,f.m.length,'생명 +'+N.gain[0].v]);}
  // 범위: 같은 (side,t,n) 묶음이 바뀌면 그 토큰 하나를 고친다
  const A=areaTokens(s.text);const seen=new Set();
  s.ops.forEach((op,i)=>{const nop=ns.ops[i];if(!op.area||!nop.area||op.area.n===nop.area.n)return;const k=op.side+op.area.t+op.area.n;if(seen.has(k))return;seen.add(k);
    const toks=A.filter(a=>a.side===op.side&&a.t===op.area.t&&a.n===op.area.n);if(toks.length!==1)throw 'area token '+s.id;edits.push([toks[0].i,toks[0].m.length,areaText(op.side,op.area.t,nop.area.n)]);});
  let t=s.text;edits.sort((a,b)=>b[0]-a[0]||a[1]-b[1]).forEach(([i,l,r])=>{t=t.slice(0,i)+r+t.slice(i+l);});
  t=t.replace(/(피해|생명) (\d+)(을|를) /g,(m,w,n)=>w+' '+n+josa(+n,'을','를')+' ');
  return t;}
module.exports.rewrite2=rewrite2;module.exports.areaTokens=areaTokens;

/* ETHERION v3.49.0 — 유닛 등급 · 스탯 재정비 계산 (js/rebalance.js를 만든다)
   node tools/balance4/regrade.js            바뀔 카드 수 · 깃발별 등급 수만 보인다
   node tools/balance4/regrade.js --write    js/rebalance.js를 새로 쓴다 (계획은 tools/balance4/regrade_plan.json)
   rebalance.js를 뺀 카드 데이터(data.js ~ upgrades.js · decks.js · cards.js · grades.js)에서 시작하므로 몇 번을 돌려도 같다.
   기준과 규칙은 js/rebalance.js 머리말 · docs/GRADES.md 5장. */
const vm=require('vm'),fs=require('fs'),path=require('path'),ROOT=path.join(__dirname,'../..');
const C={console:{log(){},error(){},warn(){}},Math,JSON,Object,Array,Set,Map,parseInt,parseFloat,isNaN};C.window=C;C.document={querySelector(){return null},querySelectorAll(){return[]},addEventListener(){}};vm.createContext(C);
for(const f of ['data.js','names.js','retired.js','specials.js','uniques.js','highcards.js','pincards.js','rarespells.js','counterspells.js','upgrades.js','decks.js','cards.js','grades.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,'js',f),'utf8'),C,{filename:f});
const ev=s=>vm.runInContext(s,C);
const OFF=JSON.parse(fs.readFileSync(path.join(__dirname,'offsets_v330.json'),'utf8'));
/* v3.49 깃발 세기 되돌림: 재정비 뒤 기본 덱 리그전(tools/balance/rr.js)으로 맞춘 깃발별 덧보정(점수) */
const EXTRA=(()=>{try{return JSON.parse(fs.readFileSync(path.join(__dirname,'regrade_offsets.json'),'utf8'))}catch(e){return {}}})();
// 등급 판정에는 쓰지 않고 스탯 목표에만 더한다(3레벨 이상 · 역행 아님)
const P=lv=>4+2*lv,V=u=>{let s=0;for(let k=1;k<=u;k++)s+=1.25+.25*k;return s};
const dv=d=>d<=0?d:d<=1?1.3*d:1.3+1.5*(d-1);
const cx=(co,k)=>(co||[]).filter(x=>x[0]===k).reduce((s,[,n,v])=>s+.5*n*v,0);
const price=(a,d,h,co)=>1.2*(a+cx(co,'a'))+dv(d+cx(co,'d'))+(h+cx(co,'h'));
const share=(a,h,co)=>{const A=1.2*Math.max(0,a+cx(co,'a')),H=Math.max(0,h+cx(co,'h'));return A+H>0?A/(A+H):0};
const band=(lv,a)=>a[lv<=3?0:lv<=5?1:2];
function abil(g,lv){if(!g)return{v:0,tier:0,n:[]};const L=[],add=(n,v,t)=>L.push({n,v,t});
 if(g.shred)add('관통',.2,1);if(g.ranged)add('원거리',.3,1);
 if(g.magic){if(g.magic===true)add('마력 전부',band(lv,[.5,.5,.8]),2);else if(g.magic>=2)add('마력 2',.6,2);else add('마력 1',.4,1);}
 if(g.thorns){if(g.thorns>=2)add('가시 '+g.thorns,band(lv,[1.3,.9,.6]),2);else add('가시 1',band(lv,[.6,.3,.3]),1);}
 if(g.throw){if(g.every){if(g.throw>=2)add('사격 '+g.throw,band(lv,[1.7,1.6,1.4]),3);else add('사격 1',band(lv,[1.1,.8,.9]),2);}else{if(g.throw>=3)add('투척 3',band(lv,[1.6,1.9,1.8]),3);else if(g.throw==2)add('투척 2',band(lv,[1.3,1.1,1.0]),2);else add('투척 1',band(lv,[.9,.6,.6]),1);}}
 if(g.crit)add('치명',band(lv,[.5,.8,1.1]),2);if(g.chain)add('연쇄',1.0,2);
 if(g.ward){if(g.ward>=2)add('가호 '+g.ward,band(lv,[1.9,2,2]),3);else add('가호 1',1.0,2);}
 if(g.shield)add('보호막',band(lv,[1.4,2.2,2.8]),3);
 if(g.evName){if(/증폭 2/.test(g.evName))add(g.evName,1.5,3);else if(/증폭/.test(g.evName))add(g.evName,.8,2);else add(g.evName,1.0,2);}
 let tier=Math.max(0,...L.map(x=>x.t));if(L.length>=2)tier=Math.max(tier,3);return{v:L.reduce((s,x)=>s+x.v,0),tier,n:L.map(x=>x.n)};}
const PV={U:{a:.6,d:.4,h:.4},L:{a:.2,d:.4,h:.4},D:{a:-.5,d:-.3,h:-.5}};
const pinv=p=>{let s=0;if(p)for(const k in p)s+=PV[p[k]][k];return s};
const BON={common:0,uncommon:.08,rare:.16,epic:.24};
/* 고급 하급 능력: 깃발 · 직업 · 이름 */
const RANGED_NAME=/사수|포수|궁수|명궁|투창|작살|척탄|총병|사냥|저격|포병|포대|포문|사격|투척/;
function pickAbility(c){
  if(c.rev) return c.rev==='벽'?{thorns:1}:{shred:true};
  const g=c.group,cl=c.cl,nm=c.name;
  if(cl==='마도') return {magic:1};
  if(RANGED_NAME.test(nm)) return {ranged:true};
  if(['B2','G3','A2'].includes(g)&&/기사|방패|수호|파수|성벽|문지기|골렘/.test(nm)) return {thorns:1};
  if(g==='B2'&&/망치|해머|도끼|분쇄|대장장이/.test(nm)) return {shred:true};
  const T={B1:{무장:{ranged:true},무도:{shred:true},기도:{magic:1}},B2:{무도:{thorns:1},무장:{thorns:1},기도:{thorns:1}},B3:{무장:{ranged:true},무도:{magic:1},기도:{magic:1}},
   G1:{무도:{shred:true},무장:{shred:true},기도:{magic:1}},G2:{무도:{thorns:1},무장:{ranged:true},기도:{magic:1}},G3:{기도:{magic:1},무장:{ranged:true},무도:{thorns:1}},
   A1:{기도:{shred:true},무장:{shred:true},무도:{shred:true}},A2:{무장:{thorns:1},기도:{magic:1},무도:{thorns:1}},A3:{무장:{ranged:true},무도:{ranged:true},기도:{magic:1}}};
  return Object.assign({},T[g][cl]||{shred:true});
}
const CAP_A=13,CAP_H=14;
function solve(u,target,lockShare){ // target = 스탯 몫 점수 (pin · 능력 · 유지비 빼고 Δ 기준이 아니라 가격 그 자체)
  const s0=share(u.a,u.h,u.co);let best=null;
  for(let a=Math.max(0,u.a-4);a<=Math.min(Math.max(CAP_A,u.a),u.a+4);a++){ if(u.a===0&&a>0)break; if(u.a>0&&a<1)continue;
   for(let h=Math.max(1,u.h-6);h<=Math.min(Math.max(CAP_H,u.h),u.h+6);h++){
    const p=price(a,u.d,h,u.co),e=p-target,sd=(share(a,h,u.co)-s0)*target,ch=Math.abs(a-u.a)+Math.abs(h-u.h);
    const cost=e*e+0.5*sd*sd+0.05*ch; if(!best||cost<best.cost)best={a,h,p,e,cost};}}
  return best;}
const ALL=ev('CARD_LIST').filter(c=>c.type==='unit'&&BON[c.grade]!=null);
const UPB={};for(const c of ev('CARD_LIST'))if(c.base)UPB[c.base]=c.id;
const ST=ev('STARTER_DECKS');
const out=[];
for(const c of ALL){
  const gr0=c.grade,rev=!!c.rev,off=(!rev&&c.lv>=3)?(OFF[c.group]||0):0,base=P(c.lv)+V(c.up);
  const gift0=c.gift?JSON.parse(JSON.stringify(c.gift)):null; const a0=abil(gift0,c.lv),pv=pinv(c.pin),pr=price(c.a,c.d,c.h,c.co);
  const D=pr+a0.v+pv-base-off; // 깃발 보정 뺀 일반 대비 점수
  const U=BON.uncommon*P(c.lv);let gr=gr0;
  if(!rev&&gr0==='common'&&D>=Math.max(.6,U-.3)&&!UPB[c.id])gr='uncommon';   // 강화 카드의 바탕은 일반에 둔다(강화는 일반 3장으로) — 세면 스탯을 일반 기준으로
  if(!rev&&gr0==='uncommon'&&D<U-.8)gr='common';
  let gift=gift0, note=[];
  if(c.id==='EP-B1-1'){gift=Object.assign({},gift0,{ranged:true});note.push('에픽 능력 둘: [원거리] 더함');}
  if(gr==='uncommon'&&!gift){gift=pickAbility(c);}
  if(gr==='common'&&gr0==='uncommon'&&gift0&&!c.pin){/* 고급에서 내려온 카드 — 지금 능력 없음 */}
  const a1=abil(gift,c.lv);
  let tgt; // 목표 D
  if(rev) tgt=(gr==='uncommon')?D:null; // 역행: 세기 그대로 (고급이면 능력 몫만큼 스탯에서)
  else tgt=BON[gr]*P(c.lv)+(c.lv>=3?(EXTRA[c.group]||0):0);
  const tol=(gr==='rare'||gr==='epic')?1.0:(gr==='common'?.8:.5);
  const Dnew=pr+a1.v+pv-base-off;
  let a=c.a,h=c.h;
  if(tgt!=null&&Math.abs(Dnew-tgt)>tol){const s=solve(c,tgt-a1.v-pv+base+off);a=s.a;h=s.h;}
  const D2=price(a,c.d,h,c.co)+a1.v+pv-base-off;
  const changed=gr!==gr0||a!==c.a||h!==c.h||JSON.stringify(gift)!==JSON.stringify(gift0);
  out.push({id:c.id,n:c.name,g:c.group,cl:c.cl,lv:c.lv,up:c.up,d:c.d,co:(c.co||[]).map(x=>x.join('')).join(' '),rev:c.rev||'',pin:c.pin||null,
    gr0,gr,a0:c.a,h0:c.h,a,h,gift0,gift,ab0:a0.n.join(' '),ab:a1.n.join(' '),D:+D.toFixed(2),D2:+D2.toFixed(2),tgt:tgt==null?null:+tgt.toFixed(2),
    starter:ST[c.group]&&ST[c.group][c.id]||0,up_card:UPB[c.id]||'',changed,note:note.join(' ')});
}

/* ---------- v3.50 카드 풀 정리 (사용자 결정 2026-11-13) ----------
   깃발마다 유닛(강화 카드 제외) 일반 21~24장 · 고급 6~9장, 고급은 레벨마다 2장까지 · 레벨에 치우치지 않게.
   ① 고급이 없는 레벨은 그 레벨 일반을 고급으로 올려 채운다 — 스탯이 거의 같은 짝이 있으면 그 짝의 점수 낮은 쪽, 없으면 점수가 가장 낮은 카드
      (올린 카드는 하급 능력을 받고 고급 기준으로 스탯을 맞춘다). 고급이 6장보다 적으면 일반이 가장 많은 레벨에서 더 올린다.
   ② 넘치는 고급 · 일반은 뺀다: 같은 레벨에 스탯 모양이 거의 같은 카드가 있는 것(겹침)부터, 그다음 같은 레벨에서 점수가 가장 낮은 카드.
      레벨마다 일반 2장은 남긴다. 역행 유닛(벽 · 돌격)은 빼거나 올리지 않는다. 강화 카드의 바탕도 뺄 수 있다(그 강화 카드도 레거시).
      강화 카드의 바탕은 고급으로 올리지 않는다(강화판과 능력이 어긋나므로).
   뺀 카드는 "레거시": js/rebalance.js가 RETIRED_CARDS에 적어 CARD_LIST(상점 · 덱 · 보상)에서 빠지고 CARDS에는 흔적으로 남는다. */
const POOL={C_MAX:24,C_MIN:21,U_MAX:9,U_MIN:6,U_PER_LV:2,C_MIN_LV:2,DUP:1.5};
const RAW={};for(const c of ev('CARD_LIST'))RAW[c.id]=c;
const shapeOf=o=>{const c=RAW[o.id];return [1.2*(o.a+cx(c.co,'a')),dv(o.d+cx(c.co,'d')),o.h+cx(c.co,'h')];};
const dist=(x,y)=>{const a=shapeOf(x),b=shapeOf(y),cx_=RAW[x.id],cy=RAW[y.id];return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2])+(cx_.cl!==cy.cl?1:0)+(!!cx_.pin!==!!cy.pin?1.5:0)+Math.abs(cx_.up-cy.up);};
function promote(o){const c=RAW[o.id];o.gr='uncommon';o.gift=pickAbility(c);const a1=abil(o.gift,c.lv),pv=pinv(c.pin),off=c.lv>=3?(OFF[c.group]||0):0,base=P(c.lv)+V(c.up);
  const tgt=BON.uncommon*P(c.lv)+(c.lv>=3?(EXTRA[c.group]||0):0);const s=solve(c,tgt-a1.v-pv+base+off);o.a=s.a;o.h=s.h;o.ab=a1.n.join(' ');
  o.D2=+(price(o.a,c.d,o.h,c.co)+a1.v+pv-base-off).toFixed(2);o.tgt=+tgt.toFixed(2);o.changed=true;o.pool='고급으로 올림(빈 레벨 채우기)';}
const LEGACY=[];
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){
  const live=()=>out.filter(o=>o.g===g&&(o.gr==='common'||o.gr==='uncommon')&&!o.legacy);
  const of=(gr,lv)=>live().filter(o=>o.gr===gr&&(lv==null||o.lv===lv));
  const pickCommon=lv=>{const cs=of('common',lv).filter(o=>!o.rev&&!o.up_card);if(cs.length<=POOL.C_MIN_LV&&of('common',lv).length<=POOL.C_MIN_LV)return null;
    let best=null;for(const o of cs){const others=of('common',lv).filter(x=>x!==o);const d=others.length?Math.min(...others.map(x=>dist(o,x))):9;const dup=d<=POOL.DUP;
      const k=[dup?0:1,o.D2];if(!best||k[0]<best.k[0]||(k[0]===best.k[0]&&k[1]<best.k[1]))best={o,k};}return best&&best.o;};
  // ① 빈 레벨 채우기
  for(let lv=1;lv<=7;lv++){if(of('uncommon',lv).length)continue;const o=pickCommon(lv);if(o)promote(o);}
  while(of('uncommon').length<POOL.U_MIN){let lvs=[1,2,3,4,5,6,7].filter(l=>of('uncommon',l).length<POOL.U_PER_LV).sort((a,b)=>of('common',b).length-of('common',a).length);let done=false;
    for(const lv of lvs){const o=pickCommon(lv);if(o){promote(o);done=true;break;}}if(!done)break;}
  // ② 빼기
  const drop=(o,why)=>{o.legacy=why;o.changed=true;LEGACY.push(o);if(o.up_card)LEGACY.push({id:o.up_card,n:RAW[o.up_card].name,g,legacy:'바탕 '+o.id+' '+o.n+'이(가) 레거시가 되어 함께',upgrade:true});};
  const victim=(gr,lvOk)=>{const cs=live().filter(o=>o.gr===gr&&!o.rev&&lvOk(o.lv));let best=null;
    for(const o of cs){const others=live().filter(x=>x!==o&&x.lv===o.lv);const near=others.map(x=>({x,d:dist(o,x)})).sort((p,q)=>p.d-q.d)[0];const dup=near&&near.d<=POOL.DUP;
      // 겹치는 짝이면 그 짝에서 점수가 낮은 쪽만 후보
      if(dup&&near.x.gr===o.gr&&near.x.D2<o.D2)continue;
      const k=[dup?0:1,o.D2];if(!best||k[0]<best.k[0]||(k[0]===best.k[0]&&k[1]<best.k[1]))best={o,k,near};}
    return best;};
  while(true){const u=of('uncommon');const over=[1,2,3,4,5,6,7].filter(l=>of('uncommon',l).length>POOL.U_PER_LV);
    if(u.length<=POOL.U_MAX&&!over.length)break;
    const maxLv=Math.max(...[1,2,3,4,5,6,7].map(l=>of('uncommon',l).length));const b=victim('uncommon',l=>over.length?over.includes(l):of('uncommon',l).length===maxLv&&maxLv>1)||victim('uncommon',l=>of('uncommon',l).length>1);
    if(!b)break;drop(b.o,(b.k[0]===0?'겹침: '+b.near.x.id+' '+b.near.x.n:'같은 레벨에서 점수가 가장 낮음')+' (고급 '+u.length+'장 → 9장 이하)');}
  while(of('common').length>POOL.C_MAX){const b=victim('common',l=>of('common',l).length>POOL.C_MIN_LV&&of('common',l).length===Math.max(...[1,2,3,4,5,6,7].map(x=>of('common',x).length))) || victim('common',l=>of('common',l).length>POOL.C_MIN_LV);
    if(!b)break;drop(b.o,(b.k[0]===0?'겹침: '+b.near.x.id+' '+b.near.x.n:'같은 레벨에서 점수가 가장 낮음'));}
}
/* v3.50 강화 카드는 깃발마다 5장까지(사용자 결정): 넘는 깃발은 레벨이 몰린 칸에서 강화 카드끼리 스탯 모양이 가장 가까운 것(같으면 강화 예산보다 더 센 것)을 레거시로.
   바탕 카드는 일반 카드로 그대로 남고, 강화로만 이어지지 않는다. */
const UP_MAX=5;
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){
  const legIds=new Set(LEGACY.map(x=>x.id));
  let ups=Object.values(RAW).filter(c=>c.base&&c.group===g&&!legIds.has(c.id)&&!legIds.has(c.base));
  const ratio=c=>price(c.a,c.d,c.h,c.co)/(P(c.lv)*1.2+V(c.up));
  const sh=c=>[1.2*(c.a+cx(c.co,'a')),dv(c.d+cx(c.co,'d')),c.h+cx(c.co,'h')];
  while(ups.length>UP_MAX){
    const byLv={};for(const c of ups)(byLv[c.lv]=byLv[c.lv]||[]).push(c);
    const lv=Object.keys(byLv).sort((a,b)=>byLv[b].length-byLv[a].length||b-a)[0];const cs=byLv[lv];
    let best=null;for(const c of cs){const o=cs.filter(x=>x!==c);const d=o.length?Math.min(...o.map(x=>{const a=sh(c),b=sh(x);return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2]);})):9;
      const k=[d,-ratio(c)];if(!best||k[0]<best.k[0]-1e-9||(Math.abs(k[0]-best.k[0])<1e-9&&k[1]<best.k[1]))best={c,k};}
    const c=best.c;LEGACY.push({id:c.id,n:c.name,g,legacy:`강화 카드는 깃발마다 5장까지 — ${lv}레벨 강화가 몰려 뺌(바탕 ${c.base} ${RAW[c.base].name} — 일반 카드로 남음)`,upgrade:true});ups=ups.filter(x=>x!==c);
  }
}
/* v3.56 덱 50장 · 생명 50 뒤의 깃발 세기 손질(regrade_tune.json, 점수): 등급 · 레거시 · 능력이 다 정해진 뒤 스탯(공 · 체)만 맞춘다.
   regrade_offsets.json(v3.49 덧보정)을 바꾸면 레거시 고르기까지 흔들리므로 그 뒤에 따로 둔다. 3레벨 이상 · 역행 아님 · 레거시 아님. */
const TUNE=(()=>{try{return JSON.parse(fs.readFileSync(path.join(__dirname,'regrade_tune.json'),'utf8'))}catch(e){return {}}})();
for(const o of out){const T=TUNE[o.g]||0;if(!T||o.legacy||o.rev||o.lv<3||o.tgt==null)continue;
  const c=RAW[o.id],a1=abil(o.gift,c.lv),pv=pinv(c.pin),off=OFF[c.group]||0,base=P(c.lv)+V(c.up),tgt=o.tgt+T;
  const s2=solve(c,tgt-a1.v-pv+base+off);if(s2.a===o.a&&s2.h===o.h)continue;
  o.a=s2.a;o.h=s2.h;o.tgt=+tgt.toFixed(2);o.D2=+(price(o.a,c.d,o.h,c.co)+a1.v+pv-base-off).toFixed(2);o.changed=o.gr!==o.gr0||o.a!==o.a0||o.h!==o.h0||JSON.stringify(o.gift)!==JSON.stringify(o.gift0);o.tune=T;}
console.log('v3.50 정리: 레거시',LEGACY.length,'장(강화 카드',LEGACY.filter(x=>x.upgrade).length,'포함) · 고급으로 올림',out.filter(o=>o.pool).length,'장');
for(const g of ['B1','B2','B3','G1','G2','G3','A1','A2','A3']){const L=out.filter(o=>o.g===g&&!o.legacy);const n=k=>L.filter(o=>o.gr===k).length;
  console.log(g,'일반',n('common'),'고급',n('uncommon'),'고급 레벨별',[1,2,3,4,5,6,7].map(l=>L.filter(o=>o.gr==='uncommon'&&o.lv===l).length).join('·'),'일반 레벨별',[1,2,3,4,5,6,7].map(l=>L.filter(o=>o.gr==='common'&&o.lv===l).length).join('·'),'| 레거시',LEGACY.filter(x=>x.g===g).map(x=>x.id).join(','));}
if(process.argv.includes('--write')){fs.writeFileSync(path.join(__dirname,'regrade_plan.json'),JSON.stringify(out));writeRebal(out);fs.writeFileSync(path.join(__dirname,'pool_plan.json'),JSON.stringify(LEGACY.map(x=>({id:x.id,n:x.n,g:x.g,why:x.legacy,gr:x.gr||'upgrade',lv:x.lv,starter:x.starter||0}))));}
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'],K=['common','uncommon','rare','epic'];
console.log('깃발  지금 c/u/r/e -> 바꾼 뒤');for(const g of G)console.log(g,K.map(k=>out.filter(o=>o.g===g&&o.gr0===k).length).join('/'),'->',K.map(k=>out.filter(o=>o.g===g&&o.gr===k).length).join('/'));
const cat=o=>o.gr0===o.gr?(o.gr+(o.a!==o.a0||o.h!==o.h0?' 스탯':'')+(JSON.stringify(o.gift)!==JSON.stringify(o.gift0)?' 능력':'')):(o.gr0+'→'+o.gr+(o.a!==o.a0||o.h!==o.h0?' +스탯':''));
const cc={};for(const o of out.filter(o=>o.changed)){const k=cat(o);cc[k]=(cc[k]||0)+1}console.log(cc,'바뀌는 카드',out.filter(o=>o.changed).length);
const err=out.filter(o=>o.tgt!=null&&Math.abs(o.D2-o.tgt)>(o.gr==='common'?.8:o.gr==='uncommon'?.6:1.0));console.log('목표에서 벗어난 채 남은 카드',err.length,err.map(o=>o.id+' '+o.D2+'/'+o.tgt).join(', '));
function writeRebal(all){
  const O=all.filter(o=>o.changed&&!o.legacy),G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
  const L=[`/* ETHERION v3.49 · v3.50 — 유닛 등급 · 스탯 재정비와 카드 풀 정리 (docs/GRADES.md 9 · 10장)
   손으로 고치지 말 것: node tools/balance4/regrade.js --write 가 쓴다. upgrades.js 다음, decks.js · cards.js 앞에 읽는다.
   v3.49 스탯 기준 등급
   - 카드 점수 = 1.2 × 기대 공 + 방어값 + 기대 체 (코인 값 × 0.5) + 능력 값 + 표시 값. 일반 기준 = 4 + 2 × 레벨 + 유지비 몫 + 깃발 보정(v3.30, 3레벨 이상).
   - 고급 = 일반 기준 + 8% (레벨 몫에) 이고 **하급 능력 하나**(관통 · 원거리 · 마력 1 · 가시 1)를 가진다. 능력 값은 그 8% 안에서 낸다.
   - 일반보다 0.6점 이상(또는 고급 몫 가까이) 센 일반 → 고급, 고급 몫보다 0.8점 넘게 모자란 고급 → 일반. 역행 유닛(벽 · 돌격)은 등급 그대로, 세기 그대로.
     강화 카드의 바탕은 고급으로 올리지 않는다.
   - 일반은 기준에서 0.8점, 고급은 0.5점, 레어 · 에픽은 1점 넘게 벗어나면 공 · 체를 고쳐 맞춘다(방어 · 코인 · 표시는 그대로).
   v3.50 카드 풀 정리
   - 깃발마다 유닛 일반 21~24장 · 고급 6~9장(레벨마다 2장까지). 고급이 없는 레벨은 일반을 올려 채우고, 넘치는 카드는 겹치는 것 · 점수 낮은 것부터 뺀다.
   - 뺀 카드는 레거시(REBAL_LEGACY): RETIRED_CARDS에 적어 상점 · 덱 · 보상에서 빠지고 CARDS에 흔적만 남는다. 바탕이 빠진 강화 카드도 레거시이고, 더는 합칠 수 없다.
   g: 바꾼 등급 · a/h: 바꾼 공 · 체 · gift: 더한 능력 · was: 바꾸기 전 [등급, 공, 체] */
"use strict";
const REBAL_V349 = {`];
  for(const g of G){const a=O.filter(o=>o.g===g);if(!a.length)continue;L.push(`  /* ${g} */`);
    for(const o of a){const r={};if(o.gr!==o.gr0)r.g=o.gr;if(o.a!==o.a0)r.a=o.a;if(o.h!==o.h0)r.h=o.h;
      const add={},g0=o.gift0||{};for(const k in (o.gift||{}))if(JSON.stringify(g0[k])!==JSON.stringify(o.gift[k]))add[k]=o.gift[k];if(Object.keys(add).length)r.gift=add;
      r.was=[o.gr0,o.a0,o.h0];L.push(`  ${JSON.stringify(o.id)}: ${JSON.stringify(r).replace(/"(\w+)":/g,'$1: ')},   // ${o.n} L${o.lv}${o.ab?' ['+o.ab+']':''}${o.pool?' — v3.50 '+o.pool:''}`);}}
  L.push('};','/* v3.50 레거시 — 게임에서 빠지고 흔적만 남는 카드 */','const REBAL_LEGACY = {');
  for(const g of G){const a=LEGACY.filter(x=>x.g===g);if(!a.length)continue;L.push(`  /* ${g} */`);for(const x of a)L.push(`  ${JSON.stringify(x.id)}: ${JSON.stringify('레거시 (v3.50) — '+x.n+' · '+x.legacy)},`);}
  L.push(`};
const REBAL_GRADES = {};
(function () {
  for (const u of SIM_UNITS) {
    const r = REBAL_V349[u.id]; if (!r) continue;
    if (r.a != null) u.a = r.a;
    if (r.h != null) u.h = r.h;
    if (r.gift) u.gift = Object.assign({}, u.gift || {}, r.gift);
    if (r.g) REBAL_GRADES[u.id] = r.g;
  }
  /* 레거시: CARD_LIST에서 빼고(js/cards.js RETIRED_CARDS) 강화로 이어지지 않게 */
  if (typeof RETIRED_CARDS !== "undefined") for (const id in REBAL_LEGACY) RETIRED_CARDS[id] = REBAL_LEGACY[id];
  if (typeof UPGRADE_OF !== "undefined") for (const b in UPGRADE_OF) if (REBAL_LEGACY[b] || REBAL_LEGACY[UPGRADE_OF[b]]) delete UPGRADE_OF[b];
})();
`);
  fs.writeFileSync(path.join(ROOT,'js/rebalance.js'),L.join('\n'));console.log('js/rebalance.js 씀:',O.length,'장 · 레거시',LEGACY.length,'장');
}

// 새 마법 설계안: 수치 p를 바꿔 가며 잣대 위 레벨이 목표 레벨에 가장 가까운 p를 고른다.
// 레벨 = (판 L의 기존 마법 평균 레벨+대가) + (값 − 판 L의 기존 마법 평균 값) / 2.5 − 대가
const lab=require('./lab');const fs=require('fs');const ctx=lab.make();const CAL=require('./calib3.json');const N=+(process.argv[2]||2500);const ONLY=process.argv[3]?process.argv[3].split(','):null;
const K=2.5;
const costOf=s=>((s.cost&&s.cost.ether)||0)+0.3*((s.cost&&s.cost.life)||0)-0.3*((s.gain&&s.gain.life)||0);
function levelAt(id,spec,L){const c=CAL[Math.max(2,Math.min(7,L))];const R=c.rows;const my=R.reduce((s,r)=>s+r.lv+r.cost,0)/R.length,mx=R.reduce((s,r)=>s+r.v,0)/R.length;
  const roles=spec.kind==='com'?['atk','def']:[spec.kind];const v=Math.max(...roles.map(r=>lab.rawValue(ctx,id,L,r,N)));return {lv:my+(v-mx)/K-costOf(spec),v};}
const D=require('./designs14.js');const out={};const F=__dirname+'/spells14.json';const prev=fs.existsSync(F)?JSON.parse(fs.readFileSync(F)):{};
for(const d of D){if(ONLY&&!ONLY.includes(d.id)){if(prev[d.id])out[d.id]=prev[d.id];continue;}let best=null;
  for(const p of d.ps){const spec=d.make(p);const id=d.id+'_'+p;ctx.mkSpell(id,spec);let r=levelAt(id,spec,d.lv);
    if(Math.abs(r.lv-d.lv)<=1.2&&Math.round(r.lv)!==d.lv){/* 판 레벨을 맞춰 한 번 더 */}
    const e={p,e:+r.lv.toFixed(2),v:+r.v.toFixed(2),text:d.text(p),cost:spec.cost||{}};(d._all=d._all||[]).push(p+':'+e.e);if(!best||Math.abs(e.e-d.lv)<Math.abs(best.e-d.lv))best=e;}
  out[d.id]={...best,id:d.id,n:d.n,g:d.g,lv:d.lv,kind:d.kind,ops:d.make(best.p).ops,tag:d.tag};
  console.log(d.id.padEnd(6),d.g,'Lv'+d.lv,d.n.padEnd(10),'p='+best.p,'→ 환산',best.e,'| 전체',d._all.join(' '),'|',best.text);}
fs.writeFileSync(F,JSON.stringify(out,null,1));

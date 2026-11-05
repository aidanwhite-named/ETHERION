// 잣대: 판 레벨 L에서 레벨 L−1..L+1 기존 마법의 "대가 없는 값"과 (적힌 레벨 + 대가) 사이 직선. 대가 = 장전 + 0.3×생명 − 0.3×얻는 생명
const lab=require('./lab');const fs=require('fs');const ctx=lab.make();const N=+(process.argv[2]||1000);const Ls=(process.argv[3]||'2').split(',').map(Number);
const F=__dirname+'/calib3.json';const out=fs.existsSync(F)?JSON.parse(fs.readFileSync(F)):{};
const S=ctx.ev('CARD_LIST').filter(c=>c.type!=='unit'&&c.type!=='item'&&!c.comeback);
const roles=c=>c.type==='atk'?['atk']:c.type==='def'?['def']:['atk','def'];
const costOf=c=>((c.cost&&c.cost.ether)||0)+0.3*((c.cost&&c.cost.life)||0)-0.3*((c.gain&&c.gain.life)||0);
for(const L of Ls){const rows=S.filter(c=>Math.abs(c.lv-L)<=1).map(c=>({id:c.id,lv:c.lv,cost:costOf(c),v:Math.max(...roles(c).map(r=>lab.rawValue(ctx,c.id,L,r,N)))}));
  const y=r=>r.lv+r.cost;const n=rows.length,mx=rows.reduce((s,r)=>s+r.v,0)/n,my=rows.reduce((s,r)=>s+y(r),0)/n;
  const sxy=rows.reduce((s,r)=>s+(r.v-mx)*(y(r)-my),0),sxx=rows.reduce((s,r)=>s+(r.v-mx)**2,0),syy=rows.reduce((s,r)=>s+(y(r)-my)**2,0);
  const b=sxy/sxx,a=my-b*mx;const sd=Math.sqrt(rows.reduce((s,r)=>s+(y(r)-a-b*r.v)**2,0)/n);
  out[L]={a,b,sd,corr:sxy/Math.sqrt(sxx*syy),rows};console.log('L',L,'n',n,'lv+대가 = '+a.toFixed(2)+' + '+b.toFixed(3)+'·v','corr',(sxy/Math.sqrt(sxx*syy)).toFixed(2),'sd',sd.toFixed(2),'v by lv',[L-1,L,L+1].map(l=>{const z=rows.filter(r=>r.lv===l);return z.length?(z.reduce((s,r)=>s+r.v,0)/z.length).toFixed(1):'-';}).join('/'));}
fs.writeFileSync(F,JSON.stringify(out));

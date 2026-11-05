// 기존 마법으로 잣대 만들기: 판 레벨 L에서 레벨 L−1..L+1 마법의 값 → 환산 레벨(e) = α + β·값
const {make,value}=require('./lab');const fs=require('fs');const ctx=make();
const N=+(process.argv[2]||1200);const Ls=(process.argv[3]||'2,3').split(',').map(Number);
const S=ctx.ev('CARD_LIST').filter(c=>c.type!=='unit'&&c.type!=='item'&&!c.comeback);
const F=__dirname+'/calib.json';const out=fs.existsSync(F)?JSON.parse(fs.readFileSync(F)):{};
const roles=c=>c.type==='atk'?['atk']:c.type==='def'?['def']:['atk','def'];
for(const L of Ls){const rows=[];for(const c of S.filter(c=>Math.abs(c.lv-L)<=1)){const v=roles(c).map(r=>value(ctx,c.id,L,r,N));rows.push({id:c.id,lv:c.lv,e:c.e!=null?c.e:c.lv,v:Math.max(...v)});}
  const n=rows.length,mx=rows.reduce((s,r)=>s+r.v,0)/n,my=rows.reduce((s,r)=>s+r.e,0)/n;
  const b=rows.reduce((s,r)=>s+(r.v-mx)*(r.e-my),0)/rows.reduce((s,r)=>s+(r.v-mx)**2,0);const a=my-b*mx;
  const res=rows.map(r=>r.e-(a+b*r.v));const sd=Math.sqrt(res.reduce((s,x)=>s+x*x,0)/n);
  const corr=rows.reduce((s,r)=>s+(r.v-mx)*(r.e-my),0)/Math.sqrt(rows.reduce((s,r)=>s+(r.v-mx)**2,0)*rows.reduce((s,r)=>s+(r.e-my)**2,0));
  out[L]={a,b,sd,corr,n,mean:[L-1,L,L+1].map(l=>{const z=rows.filter(r=>r.lv===l);return z.length?+(z.reduce((s,r)=>s+r.v,0)/z.length).toFixed(2):null;}),rows};
  console.log('L',L,'n',n,'e = '+a.toFixed(2)+' + '+b.toFixed(3)+'·v','sd',sd.toFixed(2),'corr',corr.toFixed(2),'mean by lv',out[L].mean);}
fs.writeFileSync(F,JSON.stringify(out));

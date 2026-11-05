// 기존 마법을 유닛 곡선 잣대로 재서, 게임에 적힌 레벨과 얼마나 맞는지 본다
const lab=require('./lab');const fs=require('fs');const ctx=lab.make();const N=+(process.argv[2]||800);const Ls=(process.argv[3]||'2').split(',').map(Number);
const F=__dirname+'/calib2.json';const out=fs.existsSync(F)?JSON.parse(fs.readFileSync(F)):{curves:{},rows:{}};
for(const c of ctx.ev('CARD_LIST').filter(c=>c.type!=='unit'&&c.type!=='item'&&!c.comeback&&Ls.includes(c.lv))){out.rows[c.id]={lv:c.lv,e9:c.e,...lab.levelOf(ctx,c.id,c.lv,N,out.curves)};}
fs.writeFileSync(F,JSON.stringify(out));
for(const L of Ls){const R=Object.values(out.rows).filter(r=>r.lv===L);const m=R.reduce((s,r)=>s+r.e,0)/R.length;const sd=Math.sqrt(R.reduce((s,r)=>s+(r.e-m)**2,0)/R.length);
  console.log('lv',L,'n',R.length,'mean e',m.toFixed(2),'sd',sd.toFixed(2),'curve atk',out.curves[L+'atk'].map(x=>x.toFixed(1)).join(' '));}

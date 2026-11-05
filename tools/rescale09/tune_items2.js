const C=require('./common.js');const I=require('./item_common.js');const fs=require('fs');
const [,,shard,nsh,out,offFile]=process.argv;
const E=I.engine(C.UNITS);const clone=o=>JSON.parse(JSON.stringify(o));
const OFF=offFile&&fs.existsSync(offFile)?JSON.parse(fs.readFileSync(offFile)):{};
const dval=it=>E.itemDuel(I.engItem(it)).avg+I.assumed(it)+(OFF[it.id]||0);
const R=v=>Math.round(v);
function scaled(o,f,ab){const it=clone(o);
  if(it.set){it.set.a=Math.max(1,R(o.set.a*f));it.set.h=Math.max(1,R(o.set.h*f));if(o.set.d>0)it.set.d=Math.max(0,R(o.set.d*Math.sqrt(f)));}
  else{if(o.a)it.a=R(o.a*f);if(o.h)it.h=R(o.h*f);if(o.d>1)it.d=Math.max(1,R(o.d*Math.sqrt(f)));
    if(o.magic&&o.a&&!it.a)it.a=1;} // 마력 공격 아이템은 공격을 남긴다
  for(const k of ['throw','ward','thorns'])if(o[k]&&ab[k])it[k]=Math.max(1,o[k]-ab[k]);
  if(typeof o.magic==='number'&&o.magic&&ab.magic)it.magic=Math.max(1,o.magic-ab.magic);
  if(ab.coin&&it.co&&it.co.length){it.co=it.co.map(c=>[c[0],Math.max(0,c[1]-1),c[2]]).filter(c=>c[1]>0);}
  return it;}
const res={};
for(const o of C.ITEMS.filter((x,j)=>j%+nsh===+shard)){const t=I.target(o);
  const abOpts=[{}];for(const k of ['throw','ward','thorns','magic'])if(o[k]&&typeof o[k]==='number'&&o[k]>1)abOpts.push({[k]:1});if(o.co&&o.co.length)abOpts.push({coin:1});
  let best=null;
  for(const ab of abOpts)for(let f=0.3;f<=1.001;f+=0.05){const it=scaled(o,f,ab);const v=dval(it);const pen=Object.keys(ab).length*0.06;const c=Math.abs(v-t)+pen;if(!best||c<best.c)best={it,v,c,f,ab};}
  // 다듬기: a/h/d ±1 (원래 값 넘지 않게), 비례안에서 멀어질수록 벌점
  let it=best.it,v=best.v;const base=clone(it);const devPen=x=>0.04*(['a','h','d'].reduce((s,k)=>s+Math.abs(((x.set||x)[k]||0)-((base.set||base)[k]||0)),0));
  for(let s=0;s<6&&Math.abs(v-t)>0.06;s++){let nb=null;const c0=Math.abs(v-t)+devPen(it);
    for(const k of ['a','h','d'])for(const dv of [-1,1]){const x=clone(it);const tgt=x.set||x;const ov=(o.set||o)[k]||0;const nv=(tgt[k]||0)+dv;
      if(nv<Math.min(0,ov)||nv>Math.max(0,ov)||(x.set&&k!=='d'&&nv<1)||(o.magic&&o.a&&k==='a'&&nv<1))continue;tgt[k]=nv;const vv=dval(x);const c=Math.abs(vv-t)+devPen(x);if(c<c0-0.02&&(!nb||c<nb.c))nb={x,vv,c};}
    if(!nb)break;it=nb.x;v=nb.vv;}
  res[o.id]={it,d:+v.toFixed(3),t:+t.toFixed(2),f:+best.f.toFixed(2),ab:best.ab};
  console.log(o.id,o.lv,'f',best.f.toFixed(2),JSON.stringify(best.ab),'v',v.toFixed(2),'t',t.toFixed(2));fs.writeFileSync(out,JSON.stringify(res));}
console.log('END');

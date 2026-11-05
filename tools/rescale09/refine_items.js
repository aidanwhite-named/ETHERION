const C=require('./common.js');const I=require('./item_common.js');const fs=require('fs');
const [,,shard,nsh,out]=process.argv;
const BU=Object.assign({},require('./ic0.json'),require('./ic1.json')),UU=Object.assign({},require('./iu0.json'),require('./iu1.json'));
const BV=Object.assign({},require('./id0.json'),require('./id1.json')),UV=Object.assign({},require('./iv0.json'),require('./iv1.json'));
const E=I.engine(C.UNITS);const clone=o=>JSON.parse(JSON.stringify(o));const res={};
(async()=>{
 const ids=Object.keys(BV).filter((x,j)=>j%+nsh===+shard);
 for(const id of ids){const o=C.ITEMS.find(x=>x.id===id);
  // 모양을 지킨 쪽(iv)을 기본으로, 0.3 넘게 벗어나고 iu가 낫다면 iu
  let it=UV[id].it,v=BV[id].v;const t=BV[id].t;
  if(Math.abs(v-t)>0.3&&Math.abs(BU[id].v-t)<Math.abs(v-t)){it=UU[id].it;v=BU[id].v;}
  const steps=[];
  for(let s=0;s<3&&Math.abs(v-t)>0.15;s++){let best=null;const cand=[];
    const T=it.set?'set':null;
    for(const k of ['a','h','d'])for(const dv of [-1,1]){const x=clone(it);const tg=T?x.set:x;const ov=(o.set||o)[k]||0;const nv=(tg[k]||0)+dv;
      if(nv<Math.min(0,ov)||nv>Math.max(0,ov))continue;if(T&&k!=='d'&&nv<1)continue;if(o.magic&&o.a&&k==='a'&&nv<1)continue;
      // 방향: 세면 줄이고 약하면 늘린다
      if((v>t&&dv>0)||(v<t&&dv<0))continue;tg[k]=nv;cand.push([k+dv,x]);}
    for(const k of ['ward','throw','thorns'])if(it[k]&&it[k]>1&&v>t){const x=clone(it);x[k]--;cand.push([k+'-1',x]);}
    for(const [nm,x] of cand){const r=await I.value(E,x,400);const c=Math.abs(r.v-t);if(!best||c<best.c)best={x,v:r.v,c,nm};}
    if(!best||best.c>=Math.abs(v-t)-0.03)break;it=best.x;v=best.v;steps.push(best.nm);}
  res[id]={it,v:+v.toFixed(3),t};console.log(id,'v',v.toFixed(2),'t',t.toFixed(2),steps.join(','));fs.writeFileSync(out,JSON.stringify(res));}
 console.log('END');})();

// 팀 교전 시뮬: 게임 엔진(runCombatCore)으로 n대n 섬멸전. 피해는 턴 끝 회복(엔진 규칙). 마법 없음.
const path=require('path');const {load}=require('../balance/harness');
function make(dir){
  const ctx=load(dir||path.join(__dirname,'../../js'));
  ctx.ev(`
  var TUID=1e6;
  function mkTest(id,spec){CARDS[id]={id,type:'item',lv:0,up:0,a:spec.a||0,d:spec.d||0,h:spec.h||0,co:spec.co||[],item:Object.assign({a:0,d:0,h:0,co:[]},spec)};return id;}
  function battle(A,B,seed,maxT){ // A,B: [{id, item:specId|null}]
    const mk=(arr,idx)=>({idx,name:'P'+idx,life:99,crystals:[],burn:[],reload:0,bonus:0,field:arr.map(x=>({uid:++TUID,id:x.id,item:x.item?{id:x.item,equipped:-1,coins:[]}:null})).concat(Array(RULES.slots-arr.length).fill(null))});
    const P=[mk(A,0),mk(B,1)];
    for(let t=0;t<(maxT||12);t++){
      const ai=t%2;
      for(const p of P)for(const it of p.field)if(it&&it.item&&it.item.equipped<0&&p.idx===ai)it.item.equipped=t;
      for(const p of P)for(const it of p.field)if(it)resetTurn(it);
      runCombatCore(ctx(P,ai,t,null,{seed:seed*131+t}));
      const la=liveUnits(P[0]).length,lb=liveUnits(P[1]).length;
      if(!lb&&la)return 1; if(!la&&lb)return 0; if(!la&&!lb)return 0.5;
    }
    // 판정: 남은 유닛 레벨 합
    const s=p=>liveUnits(p).reduce((s,u)=>s+C(u).lv,0);const a=s(P[0]),b=s(P[1]);return a>b?1:a<b?0:0.5;
  }
  this.battle=battle;this.mkTest=mkTest;`);
  return ctx;
}
module.exports={make};

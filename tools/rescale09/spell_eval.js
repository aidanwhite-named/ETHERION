const C=require('./common.js');
function makeEval(units,DUR,spellsForOpp,N,seeds,groupMode){
  const E=C.spellEngine(DUR);const P=E.pools(units.map(C.toSimUnit),true);
  // 단체 마법(S로 시작): 내 유닛을 그 단체에서만 뽑는다
  const PG={};const poolFor=(sp)=>{if(!groupMode||!/^S/.test(sp.id))return P;const g=sp.g;if(PG[g])return PG[g];
    const Q=E.pools(units.filter(u=>(u.g||u.f)===g).map(C.toSimUnit),true);const R=Object.assign({},P,{byCampLv:Object.assign({},P.byCampLv,{[sp.camp]:Q.byCampLv[sp.camp]}),byCampClsLv:Object.assign({},P.byCampClsLv,{[sp.camp]:Q.byCampClsLv[sp.camp]})});return PG[g]=R;};
  const OPT={nMin:2,nMax:4,spread:2,W:0.5,pVs:0.3};
  const opp=spellsForOpp.map(C.toSimSpell);
  const oppList=(role,lv)=>opp.filter(x=>x.lv===lv&&(x.kind==='com'||x.kind===(role==='atk'?'def':'atk')));
  const optFor=sp=>{const o=Object.assign({},OPT);if(sp.dir==='강화')o.focus={cls:sp.ccl,p:0.6};return o;};
  const seedOf=(s,camp,role)=>7000+s*10+(role==='atk'?0:5)+'BGA'.indexOf(camp)*100;
  const CV={};
  const curve=(s,camp,role,seed,PP,tag)=>{const k=[s,camp,role,seed,tag].join();if(CV[k])return CV[k];const pool=oppList(role,Math.min(s,5));const out=[];for(let L=1;L<=8;L++)out.push(E.spellGain(PP,E.refSpell(role,L),s,camp,role,N,OPT,seed,pool));return CV[k]=out;};
  function evalSpell(s,stage,extra){const sp=C.toSimSpell(s);sp.g=s.g;stage=stage||sp.lv;const PP=poolFor(sp);const tag=PP===P?'camp':sp.g;const eq={};
    for(const role of (sp.kind==='com'?['atk','def']:[sp.kind])){let t=0;for(const sd of seeds){const seed=seedOf(stage,sp.camp,role)+sd;const cv=curve(stage,sp.camp,role,seed,PP,tag);
      const g=E.spellGain(PP,sp,stage,sp.camp,role,N,Object.assign(optFor(sp),extra||{}),seed,oppList(role,Math.min(stage,5)));t+=E.toLevel(cv,1,g)-((sp.cost&&sp.cost.ether)||0);}eq[role]=t/seeds.length;}
    return {eqA:eq.atk,eqD:eq.def,e:Math.max(...Object.values(eq))};}
  return {evalSpell,E};}
module.exports={makeEval};

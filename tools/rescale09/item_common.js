const C=require('./common.js');const makeEngine=require('./item_engine.js');
function norm(it){ return {lv:it.lv,cls:(it.cls&&it.cls.length?it.cls.slice().sort():["공용"]),a:it.a||0,d:it.d||0,h:it.h||0,co:it.co||[],magic:it.magic===true?true:(+it.magic||0),shred:!!it.shred,ward:it.ward||0,shield:!!it.shield,crit:!!it.crit,ranged:!!it.ranged,ev:it.ev||0,throw:it.throw||0,every:!!it.every,lock:it.lock?{a:!!it.lock.a,d:!!it.lock.d,h:!!it.lock.h}:null,set:it.set||null}; }
const engItem=it=>{ const n=norm(it); const o={lv:n.lv,co:n.co,cls:n.cls}; if(n.magic) o.magic=n.magic; if(n.shred) o.shred=1; if(n.ward) o.ward=n.ward; if(n.shield) o.shield=1; if(n.set){o.set=n.set;} else {o.a=n.a;o.d=n.d;o.h=n.h; if(n.lock&&(n.lock.a||n.lock.d||n.lock.h)) o.lock={a:n.lock.a?1:0,d:n.lock.d?1:0,h:n.lock.h?1:0};}
  if(n.crit) o.crit=1; if(n.throw){o.throw=n.throw; if(n.every) o.every=1;} return o; };
const S={q:.2,mag:2,weight:"deck",N:2000,rw:.5,adj2:.15,adjAll:.2};
const isAll=it=>!it.cls||!it.cls.length||it.cls.includes("공용");
const rangeAdj=it=>isAll(it)?S.adjAll:(it.cls.length>=2?S.adj2:0);
const assumed=it=>(it.ranged?S.rw:0)+(it.ev||0)+0.25*(it.thorns||0);
const BASE=(1.311+4*1.274)/5; // 옛 잣대의 기준 아이템 종합 = 2레벨 아이템 목표 (레벨 단위라 곡선이 바뀌어도 그대로)
const target=it=>BASE+(it.lv-2)-rangeAdj(it);
function engine(units){return makeEngine(units.map(u=>({n:u.n,lv:u.lv,up:u.up,a:u.a,d:u.d,h:u.h,co:u.co,cl:u.cl})),S);}
async function value(E,it,N){const ei=engItem(it);const d=E.itemDuel(ei).avg;let b=NaN;if(N){const r=await E.itemBoard(ei,N,null);b=r.avg;}
  const v=(isNaN(b)?d:(d+4*b)/5)+assumed(it);return {d,b,v,t:target(it),diff:v-target(it)};}
module.exports={norm,engItem,S,target,value,engine,BASE,assumed};

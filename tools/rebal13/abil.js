// 특수능력의 값: 교전(3대3, 같은 레벨)에서 목표 유닛에 능력만 붙였을 때의 승률 변화 → 체력 몇 점, 공격 몇 점과 같은지
const {make}=require('./tsim');const N=+(process.argv[2]||6000);
const ctx=make();const U=ctx.ev('CARD_LIST').filter(c=>c.type==='unit'&&!c.rev&&c.up===0);
const AB={
 base:{}, h1:{h:1},h2:{h:2},h3:{h:3},h4:{h:4},h6:{h:6}, a1:{a:1},a2:{a:2},a3:{a:3},a4:{a:4}, d1:{d:1},d2:{d:2},
 '투척1':{throw:1},'투척2':{throw:2},'투척3':{throw:3},'사격1':{throw:1,every:1},'사격2':{throw:2,every:1},
 '관통':{shred:1},'치명':{crit:1},'마력1':{magic:1},'마력2':{magic:2},'마력3':{magic:3},'마력(전부)':{magic:true},
 '가시1':{thorns:1},'가시2':{thorns:2},'원거리':{ranged:1},'보호막':{shield:1},'가호1':{ward:1},'가호2':{ward:2},
 '고정(방)':{lock:{d:1}},'고정(체)':{lock:{h:1}},'고정(공방체)':{lock:{a:1,d:1,h:1}},
};
for(const k in AB)ctx.mkTest('T_'+k,AB[k]);
let s=777;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
const band=L=>L<=3?'저(2~3)':L<=5?'중(4~5)':'고(6~7)';const acc={};
for(let i=0;i<N;i++){const L=2+((R()*6)|0);const pool=U.filter(u=>u.lv===L);
 const A=[0,1,2].map(()=>({id:pick(pool).id,item:null})),B=[0,1,2].map(()=>({id:pick(pool).id,item:null}));const ti=(R()*3)|0;const seed=(R()*1e9)|0;
 for(const bk of [band(L),'전체']){const o=acc[bk]=acc[bk]||{n:0};o.n++;
  for(const k in AB){A[ti].item='T_'+k;o[k]=(o[k]||0)+(ctx.battle(A,B,seed)+1-ctx.battle(B,A,seed+7))/2;}}}
// 환산: 체력 곡선(0,1,2,3,4,6)과 공격 곡선(0..4) 위에서 선형 보간
function equiv(o,keys,vals,x){const pts=keys.map((k,i)=>[vals[i],k==='base'?o.base/o.n:o[k]/o.n]);if(x<=pts[0][1])return 0;for(let i=1;i<pts.length;i++)if(x<=pts[i][1]){const [v0,y0]=pts[i-1],[v1,y1]=pts[i];return v0+(x-y0)/(y1-y0)*(v1-v0);}const [v0,y0]=pts[pts.length-2],[v1,y1]=pts[pts.length-1];return v1+(x-y1)/(y1-y0)*(v1-v0);}
const res={};for(const bk in acc){const o=acc[bk];res[bk]={};for(const k in AB){if(k==='base')continue;const x=o[k]/o.n;
  res[bk][k]={dw:+((x-o.base/o.n)*100).toFixed(2),hp:+equiv(o,['base','h1','h2','h3','h4','h6'],[0,1,2,3,4,6],x).toFixed(2),atk:+equiv(o,['base','a1','a2','a3','a4'],[0,1,2,3,4],x).toFixed(2)};}}
console.log(JSON.stringify(res));

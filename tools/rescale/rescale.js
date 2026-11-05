// v0.7 유닛 재조정: 코인 축소 + 곡선 압축 + 카드별 1:1 재조정
// node rescale.js <data.js> [레벨당 비율 1.19] [1레벨 합 5.3] [공격 비중 0.95]
const L=require('./lib.js');const fs=require('fs');
const U=L.loadUnits(process.argv[2]);
const R_STEP=+(process.argv[3]||1.19), SUM1=+(process.argv[4]||5.3), AH=+(process.argv[5]||0.95);
const CNT_CAP=lv=>lv<=2?2:3, VAL_CAP=lv=>lv<=4?1:2;
const NEW_SUM=lv=>SUM1*Math.pow(R_STEP,lv-1);   // 유지비 0 평균 (기대 공격 + 기대 체력)
const ev=(u,s)=>u.co.filter(c=>c[0]===s).reduce((t,c)=>t+c[1]*c[2]*0.5,0);
const poolOf=(A,P)=>A.filter(v=>v.lv===P&&v.up===0);
const PL=u=>Math.min(8,Math.floor(u.lv+u.up/2));
const key=u=>u.lv+'|'+u.a+'/'+u.d+'/'+u.h+'|'+JSON.stringify(u.co);
function Xcurve(A){const X={};for(let P=1;P<=7;P++){const up=poolOf(A,P+1),lo=poolOf(A,P);X[P]=up.reduce((s,u)=>s+L.winVs(u,lo),0)/up.length;}X[8]=X[7];return X;}
const Xold=Xcurve(U);
const delta={};for(const u of U){const P=PL(u);delta[u.id]=(L.winVs(u,poolOf(U,P))-50)/(Xold[P]-50);}
const oldSum={};for(let lv=1;lv<=8;lv++){const Z=poolOf(U,lv);oldSum[lv]=Z.reduce((s,u)=>s+u.a+ev(u,'a')+u.h+ev(u,'h'),0)/Z.length;}
// 코인 축소 (카드마다 한 번)
const COINS={};for(const u of U){
  let coins=[];for(const [s,n,v] of u.co)for(let i=0;i<n;i++)coins.push([s,Math.sign(v)*Math.min(Math.abs(v),VAL_CAP(u.lv))]);
  while(coins.length>CNT_CAP(u.lv)){const cnt={};coins.forEach(c=>cnt[c[0]]=(cnt[c[0]]||0)+1);
    const order=['h','d','a'];const st=order.reduce((b,s)=>(cnt[s]||0)>(cnt[b]||0)?s:b,order.find(s=>cnt[s]));
    let i=coins.findIndex(c=>c[0]===st&&c[1]>0);if(i<0)i=coins.findIndex(c=>c[0]===st);coins.splice(i,1);}
  const m=new Map();for(const [s,v] of coins){const k=s+','+v;m.set(k,(m.get(k)||0)+1);}
  COINS[u.id]=[...m.entries()].map(([k,n])=>{const [s,v]=k.split(',');return [s,n,+v];});}
const CORR={1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1};
function RUN(){
  const N=U.map(u=>{const f=NEW_SUM(u.lv)/oldSum[u.lv]*CORR[u.lv];
    const E={a:u.a+ev(u,'a'),d:u.d+ev(u,'d'),h:u.h+ev(u,'h')};
    const nu={...u,co:COINS[u.id],prev:[u.a,u.d,u.h],prevCo:u.co};
    nu.T={a:E.a*f*AH,d:E.d*f,h:E.h*f*(2-AH)};
    nu.a=Math.max(1,Math.round(nu.T.a-ev(nu,'a')));nu.d=Math.round(nu.T.d-ev(nu,'d'));nu.h=Math.max(1,Math.round(nu.T.h-ev(nu,'h')));return nu;});
  let Xnew=Xcurve(N);
  for(let pass=0;pass<8;pass++){let moved=0;
    for(const u of N){const pool=poolOf(N,PL(u));const t=50+delta[u.id]*(Xnew[PL(u)]-50);
      const cost=c=>{if(c.a<1||c.h<1||c.d<(u.lv<=2?-2:u.lv<=5?-3:-4)||Math.abs(c.d+ev(c,'d')-u.T.d)>1.01)return 1e9;const e=Math.abs(L.winVs(c,pool)-t);
        const sh=Math.abs(c.a+ev(c,'a')-u.T.a)+Math.abs(c.h+ev(c,'h')-u.T.h)+1.5*Math.abs(c.d+ev(c,'d')-u.T.d);return e+0.3*sh;};
      let cur=cost(u);
      for(let it=0;it<10;it++){let best=null,bc=cur;
        for(const [s,dv] of [['a',1],['a',-1],['h',1],['h',-1],['d',1],['d',-1]]){const c={...u,[s]:u[s]+dv};const cc=cost(c);if(cc<bc-1e-9){bc=cc;best=c;}}
        if(!best)break;u.a=best.a;u.d=best.d;u.h=best.h;cur=bc;moved++;}}
    Xnew=Xcurve(N);if(!moved)break;}
  // 같은 레벨 중복 해소
  for(let r=0;r<3;r++){const seen=new Map();for(const u of N){if(seen.has(key(u))){const pool=poolOf(N,PL(u));const t=50+delta[u.id]*(Xnew[PL(u)]-50);let best=null,be=1e9;
    for(const [da,dd,dh] of [[1,0,-1],[-1,0,1],[0,1,-1],[0,-1,1],[1,-1,0],[-1,1,0],[1,0,0],[0,0,1],[-1,0,0],[0,0,-1]]){const c={...u,a:u.a+da,d:u.d+dd,h:u.h+dh};if(c.a<1||c.h<1||seen.has(key(c)))continue;const e=Math.abs(L.winVs(c,pool)-t);if(e<be){be=e;best=c;}}
    if(best){u.a=best.a;u.d=best.d;u.h=best.h;}}seen.set(key(u),u);}}
  return {N,Xnew:Xcurve(N)};}
let N,Xnew,best=null;
for(let o=0;o<10;o++){const r=RUN();let msg='',dev=0;const ratio={};for(let lv=1;lv<=8;lv++){const Z=poolOf(r.N,lv);const s=Z.reduce((t,u)=>t+u.a+ev(u,'a')+u.h+ev(u,'h'),0)/Z.length;ratio[lv]=NEW_SUM(lv)/s;dev+=Math.abs(Math.log(ratio[lv]));msg+=s.toFixed(1)+'/'+NEW_SUM(lv).toFixed(1)+' ';}
  const xs=Object.values(r.Xnew).slice(0,7);const xdev=Math.max(...xs)-Math.min(...xs);
  console.error('outer',o,msg,'| X',xs.map(x=>x.toFixed(1)).join(' '),'dev',dev.toFixed(3),'xr',xdev.toFixed(1));
  const score=dev+xdev/100;if(!best||score<best.score)best={score,...r};
  for(let lv=1;lv<=8;lv++)CORR[lv]*=Math.pow(ratio[lv],0.5);}
({N,Xnew}=best);console.error('best score',best.score.toFixed(3));
const out=N.map(u=>{const P=PL(u);const t=50+delta[u.id]*(Xnew[P]-50);const w=L.winVs(u,poolOf(N,P));delete u.T;return {...u,w:+w.toFixed(1),tgt:+t.toFixed(1)};});
fs.writeFileSync(process.argv[6]||'units_v08.json',JSON.stringify({units:out,Xold,Xnew,delta}));
const errs=out.map(u=>Math.abs(u.w-u.tgt));console.error('mean err',(errs.reduce((a,b)=>a+b)/errs.length).toFixed(2),'max',Math.max(...errs).toFixed(1),'>2:',errs.filter(e=>e>2).length,'>3:',errs.filter(e=>e>3).length);
const dup=new Set();let nd=0;out.forEach(u=>{const k=key(u);if(dup.has(k))nd++;dup.add(k);});console.error('dups',nd);

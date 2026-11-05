// 역행 유닛 교전 승률: 같은 레벨 무작위 카드 대신 이 카드를 넣은 3인 팀 vs 같은 레벨 무작위 3인 팀 (50% = 평균 카드)
const {make}=require('./tsim');const path=require('path');const dir=process.argv[2];const N=+(process.argv[3]||3000);
const ctx=make(path.resolve(dir));const CL=ctx.ev('CARD_LIST');const U=CL.filter(c=>c.type==='unit'&&!c.rev&&c.up===0);
let s=99;const R=()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296;};const pick=a=>a[(R()*a.length)|0];
const out={};for(const c of CL.filter(c=>c.type==='unit'&&c.rev)){s=99;const pool=U.filter(u=>u.lv===c.lv);let w=0;
 for(let i=0;i<N;i++){const A=[0,1,2].map(()=>({id:pick(pool).id})),B=[0,1,2].map(()=>({id:pick(pool).id}));const ti=(R()*3)|0;const seed=(R()*1e9)|0;
  const A2=A.slice();A2[ti]={id:c.id};w+=(ctx.battle(A2,B,seed)+1-ctx.battle(B,A2,seed+7))/2-(ctx.battle(A,B,seed)+1-ctx.battle(B,A,seed+7))/2;}
 out[c.id]=+(50+w/N*100).toFixed(1);}
console.log(JSON.stringify(out));

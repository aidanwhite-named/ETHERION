// k대k 교전 (게임 엔진 규칙): 공격 턴에 모든 유닛이 순서대로 상대 맨 앞과 싸움, 맞붙을 때마다 코인, 살아남으면 반격, 피해는 턴 끝에 회복
function rng(seed){let s=seed>>>0;return ()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function roll(u,R){let a=u.a,d=u.d,h=u.h;for(const [s,n,v] of u.co)for(let i=0;i<n;i++)if(R()<0.5){if(s==='a')a+=v;else if(s==='d')d+=v;else h+=v;}return {a,d,h:Math.max(1,h)};}
function battle(TA,TB,R,firstA){const S=[TA.map(u=>({u,dmg:0,alive:true})),TB.map(u=>({u,dmg:0,alive:true}))];let atk=firstA?0:1;
  for(let turn=0;turn<40;turn++){const A=S[atk],D=S[1-atk];
    for(const x of A){if(!x.alive)continue;const y=D.find(z=>z.alive);if(!y)break;const ca=roll(x.u,R),cd=roll(y.u,R);
      const dm=Math.max(0,ca.a-cd.d);y.dmg+=dm;if(y.dmg>=cd.h){y.alive=false;continue;}
      const bk=Math.max(0,cd.a-ca.d);x.dmg+=bk;if(x.dmg>=ca.h)x.alive=false;}
    for(const s of S)for(const x of s)x.dmg=0;
    const la=S[0].some(x=>x.alive),lb=S[1].some(x=>x.alive);if(!la&&!lb)return 0.5;if(!lb)return 1;if(!la)return 0;atk=1-atk;}
  return 0.5;}
// 후보 c를 넣은 팀의 승률 (같은 레벨 유지비 0 카드 풀에서 무작위)
function teamWin(c,pool,games=1500,seed=7){const R=rng(seed);const pick=()=>pool[Math.floor(R()*pool.length)];let tot=0,res={};
  for(let k=2;k<=5;k++){let w=0;for(let g=0;g<games;g++){const TA=[c];for(let i=1;i<k;i++)TA.push(pick());for(let i=TA.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[TA[i],TA[j]]=[TA[j],TA[i]];}
    const TB=[];for(let i=0;i<k;i++)TB.push(pick());w+=battle(TA,TB,R,g%2===0);}res[k]=w/games*100;tot+=res[k];}
  return {avg:tot/4,res};}
module.exports={teamWin,battle,rng};

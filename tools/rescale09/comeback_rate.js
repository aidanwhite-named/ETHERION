// 역전률: 7턴 시작 때 지고 있던 쪽(생명차×0.5 + 전장 유닛 가치 차)이 이긴 비율. 역전 마법 덱 vs 원래 카드 덱
const {load}=require('/home/claude/w/game/tools/balance/harness.js');
const SWAP={B1:['RB1-1','B1-33'],B2:['RB2-1','B2-25'],B3:['RB3-1','B3-33'],G1:['RG1-1','G1-29'],G2:['RG2-1','G2-33'],G3:['RG3-1','G3-39'],A1:['RA1-1','A1-33'],A2:['RA2-1','A2-38'],A3:['RA3-1','A3-34']};
const ctx=load('/home/claude/w/game/js',`this.SNAP=null;const _nt=typeof nextTurn!=='undefined'?nextTurn:null;`);
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];const N=+(process.argv[2]||10);const T0=+(process.argv[3]||7);
function deckFor(g,withCB){const d=Object.assign({},ctx.ev('STARTER_DECKS')[g]);if(!withCB){const [cb,orig]=SWAP[g];if(d[cb]){delete d[cb];d[orig]=(d[orig]||0)+1;}}return d;}
(async()=>{
 // 매 턴 상태를 엿보기: loop 안에서 G.turn이 바뀔 때를 잡기 위해 짧은 주기로 확인할 수 없으니, 엔진 runCombatCore를 감싸 턴 시작 전 스냅샷
 ctx.ev(`const _rc=runCombatCore;runCombatCore=function(X){if(X.P===G.players&&G.turn===${T0}&&!G._snap){const sc=p=>0.5*p.life+liveUnits(p).reduce((s,u)=>s+unitWorth(u),0);G._snap=[sc(G.players[0]),sc(G.players[1])];}return _rc(X);}`);
 for(const withCB of [true,false]){let trail=0,comeback=0,games=0;
  for(const a of G)for(const b of G){if(a===b)continue;for(let i=0;i<N;i++){ctx.seed(i*131+G.indexOf(a)*17+G.indexOf(b)*3+(withCB?0:7));
   const g=await ctx.playHeadless({p0:{name:'A',group:a,cards:deckFor(a,withCB),isAI:true},p1:{name:'B',group:b,cards:deckFor(b,withCB),isAI:true}});games++;
   if(!g._snap)continue;const d=g._snap[0]-g._snap[1];if(Math.abs(d)<3)continue;trail++;const loser=d<0?0:1;if(g.winner===loser)comeback++;}}
  console.log(withCB?'역전 마법 있음':'역전 마법 없음','판',games,'7턴에 3점 이상 뒤진 판',trail,'역전률',(comeback/trail*100).toFixed(1)+'%');}})();

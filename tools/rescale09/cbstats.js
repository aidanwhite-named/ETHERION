// 역전 마법 통계: 실제 발동(시뮬레이션 제외) 때의 생명·유닛 수와 승패
const {load}=require('/home/claude/w/game/tools/balance/harness.js');
const ctx=load('/home/claude/w/game/js',`
  this.CB_LOG=[];const _cs=castSpell;castSpell=function(X,caster,it,k){const c=C(it);
    if(c.comeback&&X.P===G.players){const me=X.P[caster],o=X.P[1-caster];CB_LOG.push({g:me.group,turn:G.turn,myLife:me.life,oLife:o.life,myU:liveUnits(me).length,oU:liveUnits(o).length,caster});}
    return _cs(X,caster,it,k);};`);
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];const N=+(process.argv[2]||20);
(async()=>{const per={};let games=0;
 for(const a of G)for(const b of G){if(a===b)continue;for(let i=0;i<N;i++){ctx.seed(i*97+G.indexOf(a)*13+G.indexOf(b));ctx.ev('CB_LOG.length=0');
   const g=await ctx.playHeadless({p0:{name:'A',group:a,cards:ctx.ev('STARTER_DECKS')[a],isAI:true},p1:{name:'B',group:b,cards:ctx.ev('STARTER_DECKS')[b],isAI:true}});games++;
   for(const e of ctx.ev('CB_LOG')){const won=g.winner===e.caster;const behind=e.myLife<e.oLife||e.myU<e.oU;const s=per[e.g]=per[e.g]||{n:0,won:0,behind:0,behindWon:0,lifeDiff:0,unitDiff:0,turn:0};
     s.n++;s.won+=won;s.behind+=behind;s.behindWon+=behind&&won;s.lifeDiff+=e.myLife-e.oLife;s.unitDiff+=e.myU-e.oU;s.turn+=e.turn;}}}
 console.log('games',games);
 for(const g of G){const s=per[g];if(!s){console.log(g,'not cast');continue;}
   console.log(g,'cast',s.n,'(판당',(s.n/(games*2/9)).toFixed(2)+')','시전자승률',(s.won/s.n*100).toFixed(0)+'%','지는중 시전',(s.behind/s.n*100).toFixed(0)+'%','지는중 승률',s.behind?(s.behindWon/s.behind*100).toFixed(0)+'%':'-','평균 생명차',(s.lifeDiff/s.n).toFixed(1),'유닛차',(s.unitDiff/s.n).toFixed(1),'턴',(s.turn/s.n).toFixed(1));}})();

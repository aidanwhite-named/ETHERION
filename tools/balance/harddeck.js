// 사용: node tools/balance/harddeck.js [단체들=전부] [시도=140] [시드=14] → 지금 폴더 hard.json. 마음에 들면 js/decks.js HARD_DECK_LISTS로 옮긴다 (v3.19.3)
// 어려움 덱 다듬기: 기본 덱에서 시작해 단체의 모든 카드(레어·에픽·유니크·스페셜 포함)로 언덕 오르기.
// 상대: 9단체 기본 덱(선·후공). 후보가 이기면 새 시드로 한 번 더 확인하고 채택.
const fs=require('fs'),path=require('path'),{fork}=require('child_process'),os=require('os');
const DIR=path.resolve(process.env.JS||path.join(__dirname,'../../js'));const EXTRA=fs.readFileSync(path.join(DIR,'grades.js'),'utf8');
if(process.argv[2]==='--worker'){const {load}=require('./harness');const ctx=load(DIR,EXTRA);
  process.on('message',async({id,jobs})=>{const out=[];for(const j of jobs){ctx.seed(j.seed);
    const pa={name:'A',group:j.a,cards:j.da,isAI:true,ai:j.ai},pb={name:'B',group:j.b,cards:j.db,isAI:true,ai:j.ai};
    const g=await ctx.playHeadless(j.swap?{p0:pb,p1:pa}:{p0:pa,p1:pb});out.push(g.winner===(j.swap?1:0)?1:0);}process.send({id,out});});return;}
const {load}=require('./harness');const ctx=load(DIR,EXTRA);
const CL=ctx.ev('CARD_LIST'),CARDS=ctx.ev('CARDS'),S=ctx.ev('STARTER_DECKS'),GI=ctx.ev('GROUP_IDS'),mc=ctx.ev('maxCopiesOf'),gr=ctx.ev('gradeOf');
const W=os.cpus().length;const ws=Array.from({length:W},()=>{const w=fork(__filename,['--worker']);return w;});let nid=1;const wait={};ws.forEach(w=>w.on('message',m=>{wait[m.id](m.out);delete wait[m.id];}));
async function run(jobs){const parts=Array.from({length:W},()=>[]);jobs.forEach((j,i)=>parts[i%W].push(j));const r=await Promise.all(parts.map((p,k)=>new Promise(res=>{const id=nid++;wait[id]=res;ws[k].send({id,jobs:p});})));let s=0;r.forEach(x=>x.forEach(v=>s+=v));return s/jobs.length;}
const AI=process.env.AI||'normal';
function jobs(g,deck,seeds){const J=[];for(const h of GI)for(const s of seeds){J.push({a:g,b:h,da:deck,db:S[h],seed:s,swap:false,ai:AI});J.push({a:g,b:h,da:deck,db:S[h],seed:s+7777,swap:true,ai:AI});}return J;}
const score=(g,d,seeds)=>run(jobs(g,d,seeds));
const typeOf=id=>{const t=CARDS[id].type;return t==='unit'?'u':t==='item'?'i':'s';};
function ok(d){let u=0,i=0,s=0;for(const k in d){const t=typeOf(k);if(t==='u')u+=d[k];else if(t==='i')i+=d[k];else s+=d[k];}return u>=18&&u<=30&&s>=5&&s<=15&&i>=1&&i<=10;}
const R=Math.random;
function propose(g,deck){const pool=CL.filter(c=>c.group===g);const hi=pool.filter(c=>GRADE_RANK(c)>=2);
  for(let t=0;t<200;t++){const d=Object.assign({},deck);const ids=Object.keys(d);
    // 빼기: 일반 카드 쪽으로 기울임
    let rm;for(let k=0;k<4;k++){rm=ids[(R()*ids.length)|0];if(GRADE_RANK(CARDS[rm])<=1||R()<0.3)break;}
    d[rm]--;if(!d[rm])delete d[rm];
    const src=R()<0.45?hi:pool;const c=src[(R()*src.length)|0];if(c.id===rm||(d[c.id]||0)>=mc(c))continue;
    d[c.id]=(d[c.id]||0)+1;if(!ok(d))continue;return{d,rm,add:c.id};}
  return null;}
function GRADE_RANK(c){return ctx.ev('GRADES')[gr(c)].rank;}
const N=id=>CARDS[id].name+'('+id+')';
(async()=>{
  const GS=(process.argv[2]||GI.join(',')).split(',');const IT=+(process.argv[3]||100),SE=+(process.argv[4]||12);
  const out=fs.existsSync('hard.json')?JSON.parse(fs.readFileSync('hard.json','utf8')):{};
  let sb=+(process.env.SEED||50000);
  for(const g of GS){let deck=Object.assign({},out[g]||S[g]);let seeds=Array.from({length:SE},(_,i)=>sb+i);sb+=1000;
    const t0=Date.now();const base0=await score(g,S[g],seeds);let cur=await score(g,deck,seeds);console.log(`${g} 기본 ${(base0*100).toFixed(1)} 시작 ${(cur*100).toFixed(1)}`);let acc=0;
    for(let it=0;it<IT;it++){const p=propose(g,deck);if(!p)continue;const v=await score(g,p.d,seeds);
      if(v>cur+0.008){const s2=Array.from({length:SE},(_,i)=>sb+i);sb+=1000;const a=await score(g,deck,s2),b=await score(g,p.d,s2);
        if(b>a){deck=p.d;acc++;cur=v;console.log(`  ${g}#${it} −${N(p.rm)} +${N(p.add)}  ${(v*100).toFixed(1)} (확인 ${(a*100).toFixed(1)}→${(b*100).toFixed(1)})`);}}
      if(it%20===19){seeds=Array.from({length:SE},(_,i)=>sb+i);sb+=1000;cur=await score(g,deck,seeds);}}
    out[g]=deck;fs.writeFileSync('hard.json',JSON.stringify(out,null,1));
    const fin=Array.from({length:30},(_,i)=>900000+i);const fb=await score(g,S[g],fin),fn=await score(g,deck,fin);
    console.log(`${g} 끝: 채택 ${acc} · 검증(30시드) 기본 ${(fb*100).toFixed(1)} → 새 덱 ${(fn*100).toFixed(1)} · ${((Date.now()-t0)/60000).toFixed(1)}분`);}
  ws.forEach(w=>w.kill());})();

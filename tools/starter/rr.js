// node rr.js decks.json|old [games per pair]
const P=require('./pool');const {ctx}=require('./rules');const fs=require('fs');
const G=['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const D=process.argv[2]==='old'?ctx.ev('STARTER_DECKS'):JSON.parse(fs.readFileSync(process.argv[2]));
const N=+process.argv[3]||200, base=+process.env.SEED||7000;
(async()=>{const jobs=[],meta=[];
 for(let i=0;i<9;i++)for(let j=i+1;j<9;j++)for(let k=0;k<N;k++){jobs.push({a:{g:G[i],cards:D[G[i]]},b:{g:G[j],cards:D[G[j]]},seed:base+i*100003+j*1009+k*2+ (k%2)});meta.push([i,j]);}
 const r=await P.run(jobs);P.stop();
 const M=G.map(()=>G.map(()=>[0,0]));
 r.forEach((v,x)=>{const [i,j]=meta[x];M[i][j][0]+=v;M[i][j][1]++;M[j][i][0]+=1-v;M[j][i][1]++;});
 console.log('     '+G.join('    ')+'   ALL');
 const all={};
 G.forEach((g,i)=>{let w=0,n=0;const row=G.map((h,j)=>{if(i===j)return ' -- ';w+=M[i][j][0];n+=M[i][j][1];return (M[i][j][0]/M[i][j][1]*100).toFixed(0).padStart(4);});all[g]=w/n*100;console.log(g+' '+row.join(' ')+'  '+(w/n*100).toFixed(1));});
 fs.writeFileSync((process.argv[4]||'rr_last')+'.json',JSON.stringify(all));
})();

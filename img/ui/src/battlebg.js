const fs=require('fs'); const r=d=>d*Math.PI/180, f=n=>n.toFixed(1);
let seed=20261107; const rnd=()=>{seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296;};
const W=1920,H=1080, HZ=430, VX=960;
// stars
let stars=''; for(let i=0;i<260;i++){ const x=rnd()*W, y=rnd()*HZ*0.95, s=rnd(); const rr=s>.97?1.6:s>.85?1.1:.6; const c=s>.93?'#ffe9c0':(s>.8?'#cfe8ff':'#e8eeff'); stars+=`<circle cx="${f(x)}" cy="${f(y)}" r="${rr}" fill="${c}" opacity="${f(.35+rnd()*.6)}"/>`; if(rr>1.5) stars+=`<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="${c}" opacity=".18" filter="url(#b3)"/>`; }
// mountains (giant spine) left, ridge with peaks
const ridge=(x0,x1,base,amp,n,jag)=>{ let d=`M${x0} ${base}`; for(let i=0;i<=n;i++){ const x=x0+(x1-x0)*i/n; const env=Math.sin(Math.PI*i/n); const y=base-amp*env*(0.55+0.45*rnd())-(i%2?jag*rnd():0); d+=`L${f(x)} ${f(y)}`; } return d+`L${x1} ${base}Z`; };
const mtnFar=ridge(-40,820,HZ+8,150,26,18), mtnNear=ridge(-60,560,HZ+14,230,18,26), hillsR=ridge(1180,1980,HZ+8,70,22,8);
let forge=''; for(let i=0;i<9;i++){ const x=80+i*38+rnd()*12, y=HZ-30-i*14-rnd()*10; forge+=`<circle cx="${f(x)}" cy="${f(y)}" r="1.6" fill="#ffb35a"/><circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#ff7a2c" opacity=".35" filter="url(#b3)"/>`; }
// arcane spires right
const spire=(x,h,w)=>`<path d="M${x-w} ${HZ+6} L${x-w*.6} ${HZ-h*.55} L${x} ${HZ-h} L${x+w*.6} ${HZ-h*.55} L${x+w} ${HZ+6}Z" fill="#0b0a14"/><circle cx="${x}" cy="${HZ-h+8}" r="2" fill="#e6dcff"/><circle cx="${x}" cy="${HZ-h+8}" r="9" fill="#a57ae6" opacity=".4" filter="url(#b3)"/>`;
const spires=spire(1540,190,16)+spire(1588,150,12)+spire(1500,120,10)+spire(1630,110,9);
// trees (verdant) far right low
let trees=''; for(let i=0;i<34;i++){ const x=1680+i*8+rnd()*6, h=24+rnd()*28; trees+=`<path d="M${f(x-7)} ${HZ+8} Q${f(x)} ${f(HZ-h)} ${f(x+7)} ${HZ+8}Z" fill="#090d0b"/>`; }
// floor perspective: rings as ellipses centered at VX, cy
const FCY=760;
const ring=(rx,ry,sw,op,dash='')=>`<ellipse cx="${VX}" cy="${FCY}" rx="${rx}" ry="${ry}" fill="none" stroke="#d9b46a" stroke-opacity="${op}" stroke-width="${sw}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
// dragon ring seats on ellipse rx 760 ry 230
const SEATS=[[-90,'#b88a5a'],[-45,'#9fe3d6'],[0,null],[45,'#ff6b3d'],[90,'#4fb3ff'],[135,'#58b85f'],[180,'#a9b4c2'],[-135,'#ffd84a']];
let seats=''; for(const [a,c] of SEATS){ const x=VX+760*Math.cos(r(a)), y=FCY+230*Math.sin(r(a)); const sc=0.6+0.6*((y-(FCY-230))/460);
  if(!c){ seats+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(26*sc)}" ry="${f(8*sc)}" fill="#05050a" stroke="#d9b46a" stroke-opacity=".5" stroke-dasharray="4 4"/>`; continue; }
  seats+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(90*sc)}" ry="${f(30*sc)}" fill="${c}" opacity=".22" filter="url(#b12)"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(22*sc)}" ry="${f(7*sc)}" fill="${c}" opacity=".9"/><ellipse cx="${f(x)}" cy="${f(y-3*sc)}" rx="${f(10*sc)}" ry="${f(3*sc)}" fill="#fff" opacity=".6"/><path d="M${f(x)} ${f(y-6*sc)} L${f(x)} ${f(y-90*sc)}" stroke="${c}" stroke-width="${f(10*sc)}" opacity=".12" filter="url(#b6)"/>`; }
// floor radial lines (tiles) from vanishing
let tiles=''; for(let i=-14;i<=14;i++){ const xb=VX+i*170; tiles+=`<path d="M${VX+i*14} ${HZ+20} L${xb} ${H+40}" stroke="#d9b46a" stroke-opacity=".05" stroke-width="1.2"/>`; }
for(let k=1;k<9;k++){ const t=k/9, y=HZ+20+(H-HZ)*Math.pow(t,1.7); tiles+=`<path d="M0 ${f(y)} H${W}" stroke="#d9b46a" stroke-opacity="${f(.03+.03*t)}" stroke-width="1"/>`; }
// god halo top center
const star=[]; for(let k=0;k<10;k++){ const a=r(-90+k*36), rr=k%2?52:130; star.push([VX+rr*Math.cos(a), 210+rr*Math.sin(a)]); }
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14112a"/><stop offset=".6" stop-color="#0d0c1c"/><stop offset="1" stop-color="#161126"/></linearGradient>
 <radialGradient id="skyGlow" cx="50%" cy="15%" r="55%"><stop offset="0" stop-color="#3b2b63" stop-opacity=".55"/><stop offset="1" stop-color="#3b2b63" stop-opacity="0"/></radialGradient>
 <linearGradient id="horizon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a30" stop-opacity="0"/><stop offset=".5" stop-color="#4a2a2a" stop-opacity=".45"/><stop offset="1" stop-color="#2a1a30" stop-opacity="0"/></linearGradient>
 <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121020"/><stop offset=".4" stop-color="#0b0a14"/><stop offset="1" stop-color="#05050a"/></linearGradient>
 <radialGradient id="vig" cx="50%" cy="52%" r="72%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>
 <radialGradient id="center" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#05050a" stop-opacity=".55"/><stop offset="1" stop-color="#05050a" stop-opacity="0"/></radialGradient>
 <radialGradient id="ether" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#8fdcff" stop-opacity=".16"/><stop offset="1" stop-color="#8fdcff" stop-opacity="0"/></radialGradient>
 <filter id="b3" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
 <filter id="b6" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>
 <filter id="b12" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="12"/></filter>
 <filter id="b30" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter>
 <filter id="nebula" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".0016 .004" numOctaves="5" seed="21"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .32  0 0 0 0 .8  0 0 0 1.4 -.62"/></filter>
 <filter id="stoneTex" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".006 .03" numOctaves="5" seed="8" result="n"/><feDiffuseLighting in="n" surfaceScale="6" lighting-color="#8a82a8" result="l"><feDistantLight azimuth="250" elevation="35"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${HZ+40}" filter="url(#nebula)" opacity=".55"/>
<rect width="${W}" height="${H}" fill="url(#skyGlow)"/>
${stars}
<!-- god halo -->
<g opacity=".22"><circle cx="${VX}" cy="210" r="170" fill="none" stroke="#f6e2a8" stroke-opacity=".35" stroke-width="1.4"/><circle cx="${VX}" cy="210" r="150" fill="none" stroke="#a57ae6" stroke-opacity=".5" stroke-width="1" stroke-dasharray="3 6"/>
 <path d="M${star.map(p=>f(p[0])+' '+f(p[1])).join('L')}Z" fill="none" stroke="#a57ae6" stroke-width="1.6"/><circle cx="${VX}" cy="210" r="140" fill="#a57ae6" opacity=".08" filter="url(#b30)"/></g>
<rect y="${HZ-60}" width="${W}" height="120" fill="url(#horizon)"/>
<path d="${mtnFar}" fill="#16122a"/><path d="${mtnFar}" fill="none" stroke="#8fdcff" stroke-opacity=".12" stroke-width="1.2"/>
<path d="${mtnNear}" fill="#0a0912"/><path d="${mtnNear}" fill="none" stroke="#a57ae6" stroke-opacity=".25" stroke-width="1.4"/>
${forge}
<path d="${hillsR}" fill="#0c0b14"/>
${spires}${trees}
<!-- floor -->
<rect y="${HZ+6}" width="${W}" height="${H-HZ}" fill="url(#floor)"/>
<rect y="${HZ+6}" width="${W}" height="${H-HZ}" fill="#fff" filter="url(#stoneTex)" opacity=".16"/>
${tiles}<rect y="${HZ-10}" width="${W}" height="90" fill="#3b2b63" opacity=".18" filter="url(#b30)"/>
<ellipse cx="${VX}" cy="${FCY}" rx="900" ry="300" fill="url(#ether)"/>
${ring(760,230,3,.32)}${ring(735,222,1.2,.2)}${ring(790,240,1,.14,'6 10')}${ring(520,158,1,.12)}${ring(300,90,1,.1,'4 8')}
<path d="M${f(VX+760*Math.cos(r(-24)))} ${f(FCY+230*Math.sin(r(-24)))} A760 230 0 0 1 ${f(VX+760*Math.cos(r(24)))} ${f(FCY+230*Math.sin(r(24)))}" fill="none" stroke="#05050a" stroke-width="6"/>
${(()=>{let o='';for(let i=0;i<96;i++){const a=r(i*3.75); if(Math.abs(((i*3.75+180)%360)-180)<22) continue; const x=VX+748*Math.cos(a), y=FCY+226*Math.sin(a); const sc=0.6+0.6*((y-(FCY-230))/460); o+=`<path d="M${f(x-3*sc)} ${f(y)} L${f(x)} ${f(y-4*sc)} L${f(x+3*sc)} ${f(y)}" fill="none" stroke="#d9b46a" stroke-opacity="${f(.18+.12*sc)}" stroke-width="${f(1.1*sc)}"/>`;}return o;})()}
${seats}
<rect width="${W}" height="${H}" fill="url(#center)"/>
<rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
fs.writeFileSync('battle_bg.svg',svg); console.log('ok');

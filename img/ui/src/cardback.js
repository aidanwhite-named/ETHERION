const fs=require('fs'); const r=d=>d*Math.PI/180; const f=n=>n.toFixed(1);
const cx=125, cy=175;
// giant stones (7, from north)
let stones=''; for(let k=0;k<7;k++){ const a=-90+k*360/7; const pts=[[-9,96],[9,96],[7,82],[-7,82]].map(([da,rr])=>{const aa=r(a+da*0.62); return [cx+rr*Math.cos(aa), cy+rr*Math.sin(aa)];});
  stones+=`<path d="M${pts.map(p=>f(p[0])+' '+f(p[1])).join('L')}Z" fill="url(#stone)" stroke="#d4893a" stroke-width="1.2" filter="url(#rough)"/>`;
  const m1=[cx+89*Math.cos(r(a-4)),cy+89*Math.sin(r(a-4))], m2=[cx+89*Math.cos(r(a+4)),cy+89*Math.sin(r(a+4))];
  stones+=`<path d="M${f(m1[0])} ${f(m1[1])}L${f(m2[0])} ${f(m2[1])}" stroke="#3a2412" stroke-width="1.4"/>`; }
// dragon ring gems at 8 compass seats
const SEATS=[['N',-90,'#b88a5a'],['NE',-45,'#9fe3d6'],['E',0,null],['SE',45,'#ff6b3d'],['S',90,'#4fb3ff'],['SW',135,'#58b85f'],['W',180,'#a9b4c2'],['NW',-135,'#ffd84a']];
let gems=''; for(const [n,a,c] of SEATS){ const x=cx+68*Math.cos(r(a)), y=cy+68*Math.sin(r(a));
  if(!c){ gems+=`<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#05040a" stroke="#d9b46a" stroke-width="1.2" stroke-dasharray="1.6 1.6"/><circle cx="${f(x)}" cy="${f(y)}" r="2" fill="#8fdcff" opacity=".7" filter="url(#glow)"/>`; continue; }
  gems+=`<circle cx="${f(x)}" cy="${f(y)}" r="10" fill="${c}" opacity=".45" filter="url(#glow)"/><circle cx="${f(x)}" cy="${f(y)}" r="6.4" fill="url(#goldR)" stroke="#3a2a0c" stroke-width=".8"/><circle cx="${f(x)}" cy="${f(y)}" r="4.6" fill="${c}"/><circle cx="${f(x)}" cy="${f(y)}" r="4.6" fill="url(#gemShade)"/><circle cx="${f(x-1.4)}" cy="${f(y-1.6)}" r="1.3" fill="#fff" opacity=".85"/>`; }
// diamonds between seats
let dia=''; for(let k=0;k<8;k++){ const a=-67.5+k*45; if(k===0||k===7) {} const x=cx+68*Math.cos(r(a)), y=cy+68*Math.sin(r(a)); dia+=`<path d="M${f(x)} ${f(y-2.4)}L${f(x+2)} ${f(y)}L${f(x)} ${f(y+2.4)}L${f(x-2)} ${f(y)}Z" fill="#f6e2a8"/>`; }
// god star (5 points)
const star=[]; for(let k=0;k<10;k++){ const a=r(-90+k*36), rr=k%2?20:46; star.push([cx+rr*Math.cos(a), cy+rr*Math.sin(a)]); }
const starD='M'+star.map(p=>f(p[0])+' '+f(p[1])).join('L')+'Z';
const pent=[]; for(let k=0;k<5;k++){ const a=r(-90+36+k*72); pent.push([cx+20*Math.cos(a), cy+20*Math.sin(a)]); }
let tips=''; for(let k=0;k<5;k++){ const a=r(-90+k*72); tips+=`<circle cx="${f(cx+46*Math.cos(a))}" cy="${f(cy+46*Math.sin(a))}" r="1.8" fill="#f6e2a8"/>`; }
const corner=(sx,sy)=>{ const x=sx<0?230:20, y=sy<0?330:20, X=v=>x+(sx<0?-v:v), Y=v=>y+(sy<0?-v:v);
  return `<path d="M${X(0)} ${Y(40)}V${Y(0)}H${X(40)}" fill="none" stroke="url(#gold)" stroke-width="3.4"/>
  <path d="M${X(6)} ${Y(28)}C${X(6)} ${Y(14)} ${X(14)} ${Y(6)} ${X(28)} ${Y(6)}" fill="none" stroke="#d9b46a" stroke-opacity=".7" stroke-width="1.2"/>
  <path d="M${X(10)} ${Y(22)}C${X(14)} ${Y(16)} ${X(16)} ${Y(14)} ${X(22)} ${Y(10)}" fill="none" stroke="#d9b46a" stroke-opacity=".45" stroke-width="1"/>
  <path d="M${X(13)} ${Y(7)}L${X(19)} ${Y(13)} ${X(13)} ${Y(19)} ${X(7)} ${Y(13)}Z" fill="url(#gold)" stroke="#07050c" stroke-width=".9"/>
  <circle cx="${X(13)}" cy="${Y(13)}" r="1.8" fill="#8fdcff"/>`; };
const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350" width="250" height="350">
<defs>
 <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3cc"/><stop offset=".2" stop-color="#e2bd70"/><stop offset=".45" stop-color="#7a5418"/><stop offset=".68" stop-color="#f0d088"/><stop offset="1" stop-color="#5a3f12"/></linearGradient>
 <radialGradient id="goldR" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff3c9"/><stop offset=".5" stop-color="#d6aa52"/><stop offset="1" stop-color="#5a3f12"/></radialGradient>
 <radialGradient id="gemShade" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <radialGradient id="field" cx="50%" cy="50%" r="72%"><stop offset="0" stop-color="#2c2458"/><stop offset=".5" stop-color="#16122e"/><stop offset="1" stop-color="#07060f"/></radialGradient>
 <radialGradient id="aura" cx="50%" cy="50%" r="50%"><stop offset=".35" stop-color="#8fdcff" stop-opacity=".3"/><stop offset=".7" stop-color="#6a4fc0" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
 <radialGradient id="medal" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#1c2a50"/><stop offset=".7" stop-color="#110e24"/><stop offset="1" stop-color="#06050c"/></radialGradient>
 <linearGradient id="stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a5232"/><stop offset=".5" stop-color="#3a2412"/><stop offset="1" stop-color="#1a0f06"/></linearGradient>
 <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/><stop offset=".72" stop-color="#fff" stop-opacity=".06"/><stop offset=".8" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <pattern id="lattice" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(125 175) rotate(45)"><path d="M0 0H20M0 0V20" stroke="#d9b46a" stroke-opacity=".09" stroke-width="1.1"/><circle cx="10" cy="10" r="1.1" fill="#d9b46a" fill-opacity=".18"/></pattern>
 <filter id="nebula" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .42  0 0 0 0 .32  0 0 0 0 .85  0 0 0 1.1 -.42"/></filter>
 <filter id="hammer" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="2" seed="4" result="n"/><feDiffuseLighting in="n" surfaceScale="1.6" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="55"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in" result="lc"/><feBlend in="SourceGraphic" in2="lc" mode="multiply"/></filter>
 <filter id="rough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="2" result="n"/><feDiffuseLighting in="n" surfaceScale="1.2" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="50"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in" result="lc"/><feBlend in="SourceGraphic" in2="lc" mode="multiply"/></filter>
 <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="2.6"/></filter>
 <filter id="glowS" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>
 <clipPath id="inner"><rect x="13" y="13" width="224" height="324" rx="8"/></clipPath>
</defs>
<rect width="250" height="350" rx="17" fill="#07050c"/>
<rect x="4" y="4" width="242" height="342" rx="14" fill="url(#gold)" filter="url(#hammer)"/>
<rect x="5.5" y="5.5" width="239" height="339" rx="13" fill="none" stroke="#fff6da" stroke-opacity=".55" stroke-width="1"/>
<rect x="9" y="9" width="232" height="332" rx="10" fill="none" stroke="#5a3f12" stroke-width="1"/>
<g clip-path="url(#inner)">
 <rect x="13" y="13" width="224" height="324" fill="url(#field)"/>
 <rect x="13" y="13" width="224" height="324" filter="url(#nebula)" opacity=".7"/>
 <rect x="13" y="13" width="224" height="324" fill="url(#lattice)"/>
 ${Array.from({length:40},(_,i)=>{const x=(i*53.7)%224+13, y=(i*97.3)%324+13, rr=(i%5===0)?1:.55; return `<circle cx="${f(x)}" cy="${f(y)}" r="${rr}" fill="#e8f4ff" opacity="${(0.35+(i%4)*0.15).toFixed(2)}"/>`;}).join('')}
 <circle cx="125" cy="175" r="118" fill="url(#aura)"/>
</g>
<rect x="13" y="13" width="224" height="324" rx="8" fill="none" stroke="#07050c" stroke-width="2.6"/>
<rect x="24" y="24" width="202" height="302" rx="3" fill="none" stroke="#d9b46a" stroke-opacity=".75" stroke-width="1.3"/>
<rect x="29" y="29" width="192" height="292" rx="2" fill="none" stroke="#d9b46a" stroke-opacity=".32" stroke-width="1" stroke-dasharray="2 3.2"/>
${corner(1,1)}${corner(-1,1)}${corner(1,-1)}${corner(-1,-1)}
<path d="M125 36V70M125 280V314" stroke="url(#gold)" stroke-width="2.2"/>
<path d="M125 32 131 40 125 48 119 40Z M125 302 131 310 125 318 119 310Z" fill="url(#gold)" stroke="#07050c" stroke-width="1"/>
<path d="M30 175H22M220 175H228" stroke="#d9b46a" stroke-opacity=".6" stroke-width="2"/>
<!-- sigil -->
<circle cx="125" cy="175" r="100" fill="#07050c" opacity=".55" filter="url(#glow)"/>
<circle cx="125" cy="175" r="89" fill="none" stroke="#d4893a" stroke-opacity=".5" stroke-width="1"/>
${stones}
<circle cx="125" cy="175" r="78" fill="url(#medal)" stroke="#07050c" stroke-width="2"/>
<circle cx="125" cy="175" r="68" fill="none" stroke="url(#gold)" stroke-width="3"/>
<path d="M${f(cx+68*Math.cos(r(-22)))} ${f(cy+68*Math.sin(r(-22)))} A68 68 0 0 1 ${f(cx+68*Math.cos(r(22)))} ${f(cy+68*Math.sin(r(22)))}" fill="none" stroke="#120e1d" stroke-width="4.4"/>
<path d="M${f(cx+68*Math.cos(r(-22)))} ${f(cy+68*Math.sin(r(-22)))} A68 68 0 0 1 ${f(cx+68*Math.cos(r(22)))} ${f(cy+68*Math.sin(r(22)))}" fill="none" stroke="#d9b46a" stroke-width="1.2" stroke-dasharray="2 2.4"/>
${dia}${gems}
<circle cx="125" cy="175" r="52" fill="none" stroke="#a57ae6" stroke-opacity=".7" stroke-width="1.2"/>
<path d="${starD}" fill="#a57ae6" fill-opacity=".14" stroke="#a57ae6" stroke-width="2" stroke-linejoin="round"/>
<path d="${starD}" fill="none" stroke="#c9a8ff" stroke-width="4" opacity=".35" filter="url(#glowS)"/>
<path d="M${pent.map(p=>f(p[0])+' '+f(p[1])).join('L')}Z" fill="none" stroke="#a57ae6" stroke-opacity=".8" stroke-width="1.1"/>
${tips}
<circle cx="125" cy="175" r="11" fill="#8fdcff" opacity=".35" filter="url(#glow)"/>
<circle cx="125" cy="175" r="9" fill="#05040a" stroke="#f3dfa6" stroke-width="2"/>
<rect x="4" y="4" width="242" height="342" rx="14" fill="url(#sheen)"/>
</svg>`;
fs.writeFileSync('card_back.svg', svg); console.log('ok');

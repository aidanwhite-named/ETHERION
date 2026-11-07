const fs=require('fs');
const O='M20 2 36 14 36 30 20 50 4 30 4 14Z', I='M20 10 30 17 30 28 20 40 10 28 10 17Z';
const facets=[ // outer vertex, next outer, next inner, inner
 ['M20 2 36 14 30 17 20 10Z',.95],['M36 14 36 30 30 28 30 17Z',.6],['M36 30 20 50 20 40 30 28Z',.4],
 ['M20 50 4 30 10 28 20 40Z',.5],['M4 30 4 14 10 17 10 28Z',.75],['M4 14 20 2 20 10 10 17Z',1]];
const defs=`<defs>
 <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3cc"/><stop offset=".3" stop-color="#e2bd70"/><stop offset=".55" stop-color="#7a5418"/><stop offset=".8" stop-color="#f0d088"/><stop offset="1" stop-color="#5a3f12"/></linearGradient>
 <linearGradient id="blood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a99"/><stop offset=".35" stop-color="#e0405a"/><stop offset="1" stop-color="#7c0f22"/></linearGradient>
 <radialGradient id="core" cx="45%" cy="40%" r="55%"><stop offset="0" stop-color="#ffd0d6" stop-opacity=".9"/><stop offset=".4" stop-color="#ff5a72" stop-opacity=".5"/><stop offset="1" stop-color="#7c0f22" stop-opacity="0"/></radialGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e0c16"/><stop offset="1" stop-color="#0c0206"/></linearGradient>
 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.4"/></filter>
 <filter id="hammer" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" result="n"/><feDiffuseLighting in="n" surfaceScale=".8" lighting-color="#fff" result="l"><feDistantLight azimuth="225" elevation="55"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="in" result="lc"/><feBlend in="SourceGraphic" in2="lc" mode="multiply"/></filter>
 <clipPath id="gem"><path d="${O}"/></clipPath>
</defs>`;
const wrap=s=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 48 60" width="48" height="60">${defs}${s}</svg>`;
const facetFill=(base,dark)=>facets.map(([d,l])=>`<path d="${d}" fill="${base}"/><path d="${d}" fill="${l>.8?'#fff':'#000'}" opacity="${l>.8?((l-.8)*0.8).toFixed(2):((1-l)*dark).toFixed(2)}"/>`).join('');
const lines=`<path d="${I}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width=".55"/><path d="M20 2 20 10 M36 14 30 17 M36 30 30 28 M20 50 20 40 M4 30 10 28 M4 14 10 17" stroke="#fff" stroke-opacity=".2" stroke-width=".5"/>`;
// empty glass
const glass=`<g clip-path="url(#gem)">${facetFill('url(#glass)',.6)}<path d="${I}" fill="#1a060c"/>${lines}
  <path d="M8 16 C12 10 17 7 20 6" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.4" stroke-linecap="round"/></g>`;
// full blood ruby
const full=`<g clip-path="url(#gem)">${facetFill('url(#blood)',.75)}<path d="${I}" fill="url(#blood)"/><path d="${I}" fill="url(#core)"/>
  <ellipse cx="20" cy="26" rx="8" ry="10" fill="#ff7d8e" opacity=".35" filter="url(#glow)"/>${lines}</g>`;
// top: bezel + claws + highlights
const claw=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 -4.6 C2.4 -3 3.4 -.6 2.6 1.8 L0 3.6 L-2.6 1.8 C-3.4 -.6 -2.4 -3 0 -4.6Z" fill="url(#gold)" stroke="#3a2a0c" stroke-width=".45"/><path d="M0 -3.4 0 2.4" stroke="#fff3c9" stroke-opacity=".7" stroke-width=".4"/><circle cx="0" cy="-1" r=".8" fill="#ff5a72"/></g>`;
const top=`<path d="${O}" fill="none" stroke="#07050c" stroke-width="2.4" stroke-linejoin="round"/>
 <path d="${O}" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-linejoin="round"/>
 <path d="${O}" fill="none" stroke="#fff3c9" stroke-opacity=".5" stroke-width=".35" stroke-linejoin="round" transform="translate(-.25 -.25)"/>
 ${claw(20,0.4,0)}${claw(37.6,30.2,120)}${claw(2.4,30.2,-120)}${claw(20,51.2,180)}
 <g clip-path="url(#gem)"><path d="M7.5 15.5 C11 10.5 15.5 7.5 19.5 6.2" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="1.5" stroke-linecap="round"/><circle cx="11" cy="12.6" r="1.1" fill="#fff" opacity=".9"/>
 <path d="M30 34 C27 39 24 43 21.5 45.5" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width=".9" stroke-linecap="round"/></g>`;
fs.writeFileSync('heart_glass.svg',wrap(glass)); fs.writeFileSync('heart_blood.svg',wrap(full)); fs.writeFileSync('heart_top.svg',wrap(top));
// preview: 60% fill
fs.writeFileSync('heart_preview.svg',wrap(glass+`<g clip-path="url(#half)">${full}</g><clipPath id="half"><rect x="-4" y="22" width="48" height="40"/></clipPath>`+top));
console.log('ok');

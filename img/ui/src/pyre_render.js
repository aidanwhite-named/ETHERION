const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const svg = fs.readFileSync('pyre.svg','utf8');
  const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:400,height:560}, deviceScaleFactor:2 });
  const shots = { full:[], back:['fire','front','halo-el'], fire:['back','front'], front:['back','fire'], empty:['fire'] };
  for (const [name, hide] of Object.entries(shots)) {
    await p.setContent(`<html><body style="margin:0;background:transparent"><style>${hide.map(h=>`#${h}{display:none}`).join('')}</style>${svg}</body></html>`);
    await p.screenshot({ path:`pyre_${name}.png`, omitBackground:true, clip:{x:0,y:0,width:400,height:560} });
  }
  const d = n => 'data:image/png;base64,'+fs.readFileSync(`pyre_${n}.png`).toString('base64');
  await p.setViewportSize({width:900,height:620});
  await p.setContent(`<html><body style="margin:0;background:radial-gradient(ellipse at 50% 0%,#1a1630,#0b0d17 60%,#07080d);display:flex;gap:30px;align-items:center;justify-content:center;height:620px;font:14px serif;color:#d9b46a">
   <figure style="margin:0;text-align:center"><img src="${d('full')}" style="width:300px"><figcaption>불이 붙었을 때</figcaption></figure>
   <figure style="margin:0;text-align:center"><img src="${d('empty')}" style="width:300px"><figcaption>비었을 때 (잔불만)</figcaption></figure>
   <figure style="margin:0;text-align:center"><img src="${d('full')}" style="width:96px"><figcaption>전장 크기</figcaption></figure>
  </body></html>`);
  await p.screenshot({ path:'preview.png' }); await b.close();
})();

const { chromium } = require('playwright'); const fs = require('fs');
// usage: node render.js in.svg out.png scale [jpeg]
(async () => {
  const [inp, out, scale='3', jpg] = process.argv.slice(2);
  const svg = fs.readFileSync(inp, 'utf8');
  const vb = svg.match(/width="(\d+)" height="(\d+)"/); const w=+vb[1], h=+vb[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:+scale });
  await p.setContent(`<html><body style="margin:0;background:${jpg||process.env.BG?'#0b0d17':'transparent'}">${svg}</body></html>`);
  await p.waitForTimeout(200);
  await p.screenshot({ path: out, omitBackground: !jpg && !process.env.BG, type: jpg ? 'jpeg' : 'png', quality: jpg ? 88 : undefined, clip:{x:0,y:0,width:w,height:h} });
  await b.close();
})();

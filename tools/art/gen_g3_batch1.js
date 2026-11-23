const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CARDS = [
  {
    id: 'CS-G3',
    name: '씻김의 노래',
    saveAs: 'CS-G3 씻김의 노래.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of a spell — the magic itself is the subject. What is left a moment after the song passed: a wide stone court awash in a finger of clear water, and across it the wreck of a great spell-circle that had been drawn in glowing amber lines — its arcs now running like wet chalk, bleeding into milky ribbons that drain between the flagstones. One last curved segment still glows, already softening at the edges. Flecks of gold leaf and a loosened wax seal drift on the runoff toward the lower edge. Pale, windless morning after rain; flat grey light mirrored in the standing water, with the dying amber of the last line as the only warmth.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-G3 씻김의 노래.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G3-01',
    name: '석호 수습 무녀',
    saveAs: 'G3-01 석호 수습 무녀.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. Tight close-up at the waterline: a young tree frog novice, chin-deep in the lagoon on the right of the frame, sings her first note with eyes wide and anxious, glancing left, her pale throat swelled into a small trembling bubble. Her skin is wet leaf-green and a sprig of red seaweed lies draped across her brow. The surface in front of her lips carries her voice leftward as a row of fine standing ripples — and they wobble, uneven and trembling, exactly as her note does. High clear sun through shallow turquoise water throws dancing light up under her chin; a soft rim from the bright sand behind.
Colour: sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-01 석호 수습 무녀.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G3-08',
    name: '물결의 메아리',
    saveAs: 'G3-08 물결의 메아리.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. Through a ragged hole in a fishing net hung to dry on mangrove roots, we glimpse the lagoon beyond: on the right a faint singing figure made only of upright rings of water and light glides leftward, each ring trailing a paler copy of itself, and a paler one after that. Where its soft glow falls through the mesh, the torn strands around the hole are quietly knitting themselves closed, knot by knot. Moonlight and mist over still water; the figure's own cool glow rims the wet net strands from behind.
Colour: glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-08 물결의 메아리.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G3-19',
    name: '셀레네아 무녀장',
    saveAs: 'G3-19 셀레네아 무녀장.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. From close behind her: a white beluga choir-mistress rises upright from the water at the bottom of the frame, back to us, a mantle of knotted cord and sea-glass over her smooth pale shoulders, one flipper lifted like a conductor's hand. Before her the whole storm-roughened lagoon has obeyed the first note — every whitecap, every ripple, every reed and strand of floating weed lies combed flat in one direction, away from her, like fur stroked by a hand. Slate sky with one bright break ahead of her; cold light edges her back and every combed wave crest.
Colour: storm sea — heavy green-blue (#4fb3ff), white spray and slate grey.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-19 셀레네아 무녀장.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G3-27',
    name: '해구 투구게',
    saveAs: 'G3-27 해구 투구게.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. At eye level on the seabed, where a shelf of rock ends at a black drop. On the right crouches a horseshoe crab as large as a hay wagon, domed olive carapace rimmed with spines, long spike tail raised, facing left toward the abyss it guards. In the layered cliff behind it, picked out by the dim light, are the stone imprints of others exactly like it — the same dome, the same tail — pressed into rock a hundred strata deep. Dim blue light sifts down from far above; a second, colder glow rises from the drop and rims each spine.
Colour: deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow.
Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G3-27 해구 투구게.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  }
];

const DOWNLOADS_DIR = path.join(process.env.HOME, 'Downloads');
const OUT_DIR = path.join(__dirname, 'pending_uncommon');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ChromeClient {
  constructor() {
    this.ws = null;
    this.msgId = 1;
    this.sessionId = null;
  }

  async connect() {
    const portFile = fs.readFileSync('/Users/aidan/Library/Application Support/Google/Chrome/DevToolsActivePort', 'utf8').trim().split('\n');
    const wsUrl = `ws://127.0.0.1:${portFile[0]}${portFile[1]}`;
    console.log('[CDP] Connecting to', wsUrl);
    this.ws = new WebSocket(wsUrl);

    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    console.log('[CDP] Connected to browser');

    await this.send('Browser.setDownloadBehavior', {
      behavior: 'allowAndName',
      downloadPath: DOWNLOADS_DIR,
      eventsEnabled: true
    });

    const targets = await this.send('Target.getTargets');
    const geminiTarget = targets.targetInfos.find(t => t.type === 'page' && t.url.includes('gemini'));
    if (!geminiTarget) {
      throw new Error('Gemini tab not found!');
    }
    console.log('[CDP] Found Gemini target:', geminiTarget.targetId, geminiTarget.title);

    const attachRes = await this.send('Target.attachToTarget', { targetId: geminiTarget.targetId, flatten: true });
    this.sessionId = attachRes.sessionId;
    console.log('[CDP] Attached with sessionId:', this.sessionId);

    await this.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOADS_DIR
    }, this.sessionId);
  }

  send(method, params = {}, sessionId = null) {
    return new Promise((resolve, reject) => {
      const id = this.msgId++;
      const handler = (e) => {
        const data = JSON.parse(e.data);
        if (data.id === id) {
          this.ws.removeEventListener('message', handler);
          if (data.error) {
            reject(new Error(`${method} error: ${JSON.stringify(data.error)}`));
          } else {
            resolve(data.result);
          }
        }
      };
      this.ws.addEventListener('message', handler);
      const payload = { id, method, params };
      const sId = sessionId || this.sessionId;
      if (sId) payload.sessionId = sId;
      this.ws.send(JSON.stringify(payload));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result ? res.result.value : null;
  }
}

async function startNewChat(client) {
  console.log('[Workflow] Navigating to new chat...');
  await client.send('Page.navigate', { url: 'https://gemini.google.com/app' });
  
  for (let i = 0; i < 30; i++) {
    await sleep(500);
    const hasEditor = await client.eval(`!!document.querySelector('div.ql-editor')`);
    if (hasEditor) {
      console.log('[Workflow] New chat ready.');
      return;
    }
  }
  throw new Error('Timeout waiting for editor in new chat');
}

async function ensureImageTool(client) {
  console.log('[Workflow] Checking Image tool...');
  for (let i = 0; i < 5; i++) {
    const isSelected = await client.eval(`!!document.querySelector('button[aria-label="이미지 선택 해제"]')`);
    if (isSelected) {
      console.log('[Workflow] Image tool is already selected.');
      return;
    }

    console.log('[Workflow] Opening tools menu...');
    await client.eval(`(() => {
      const btn = document.querySelector('button[aria-label="업로드 및 도구"]');
      if (btn) btn.click();
    })()`);
    await sleep(600);

    console.log('[Workflow] Clicking 이미지 만들기...');
    await client.eval(`(() => {
      const items = Array.from(document.querySelectorAll('gem-menu-item, [role="menuitem"], [role="menuitemcheckbox"]'));
      const imgItem = items.find(el => el.innerText.includes('이미지 만들기'));
      if (imgItem) imgItem.click();
    })()`);

    await sleep(800);
    const verifySelected = await client.eval(`!!document.querySelector('button[aria-label="이미지 선택 해제"]')`);
    if (verifySelected) {
      console.log('[Workflow] Image tool successfully selected.');
      return;
    }
    await sleep(500);
  }
  throw new Error('Failed to enable Image tool');
}

async function submitPrompt(client, promptText) {
  console.log('[Workflow] Focusing and inserting prompt...');
  await client.eval(`(() => {
    const editor = document.querySelector('div.ql-editor');
    editor.focus();
    document.execCommand('selectAll');
    document.execCommand('delete');
  })()`);
  await sleep(300);

  await client.send('Input.insertText', { text: promptText });
  await sleep(600);

  console.log('[Workflow] Clicking submit button...');
  const submitted = await client.eval(`(() => {
    const btn = document.querySelector('button[aria-label="메시지 보내기"], button.send-button');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  })()`);

  if (!submitted) {
    console.log('[Workflow] Send button not found directly, sending Enter key...');
    await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  }
  console.log('[Workflow] Prompt submitted.');
}

async function waitForGenerationAndDownload(client, targetFilename) {
  console.log('[Workflow] Waiting for image generation to complete...');
  let startWait = Date.now();
  let foundDownloadBtn = false;

  while (Date.now() - startWait < 180000) {
    await sleep(2500);
    const status = await client.eval(`(() => {
      const downloadBtn = document.querySelector('button[aria-label="원본 크기 이미지 다운로드"]');
      const stopBtn = document.querySelector('button[aria-label*="생성 중지"], button[aria-label*="답변 생성 중지"]');
      const img = document.querySelector('img.image, img[src*="blob:"]');
      return {
        hasDownloadBtn: !!downloadBtn && !downloadBtn.disabled,
        isGenerating: !!stopBtn,
        hasImg: !!img && img.complete && img.naturalWidth > 0
      };
    })()`);

    const elapsed = Math.round((Date.now() - startWait) / 1000);
    console.log(`[Workflow] ${elapsed}s: downloadBtn=${status.hasDownloadBtn}, generating=${status.isGenerating}, img=${status.hasImg}`);

    if (status.hasDownloadBtn && !status.isGenerating && status.hasImg) {
      foundDownloadBtn = true;
      break;
    }
  }

  if (!foundDownloadBtn) {
    throw new Error('Timeout waiting for image generation to complete');
  }

  const beforeFiles = new Set(fs.readdirSync(DOWNLOADS_DIR));

  console.log('[Workflow] Getting download button coordinates...');
  const coords = await client.eval(`(() => {
    const btn = document.querySelector('button[aria-label="원본 크기 이미지 다운로드"]');
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);

  console.log('[Workflow] Clicking download button via trusted CDP mouse event at', coords);
  const { x, y } = coords;
  await client.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await sleep(100);
  await client.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await sleep(100);
  await client.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });

  console.log('[Workflow] Waiting for download to complete in ~/Downloads...');
  let downloadedFile = null;
  const startDlWait = Date.now();

  while (Date.now() - startDlWait < 60000) {
    await sleep(1000);
    const currentFiles = fs.readdirSync(DOWNLOADS_DIR);
    for (const f of currentFiles) {
      if (!beforeFiles.has(f) && f.endsWith('.png') && !f.endsWith('.crdownload')) {
        const p = path.join(DOWNLOADS_DIR, f);
        const s1 = fs.statSync(p).size;
        if (s1 > 1000000) {
          await sleep(1000);
          const s2 = fs.statSync(p).size;
          if (s1 === s2) {
            downloadedFile = p;
            break;
          }
        }
      }
    }
    if (downloadedFile) break;
  }

  if (!downloadedFile) {
    throw new Error('Downloaded file not detected in ~/Downloads');
  }

  console.log('[Workflow] Downloaded file detected:', downloadedFile);
  const outPath = path.join(OUT_DIR, targetFilename);
  fs.copyFileSync(downloadedFile, outPath);

  const dims = execSync(`sips -g pixelWidth -g pixelHeight "${outPath}"`).toString();
  console.log(`[Workflow] Successfully saved to ${outPath}\n${dims.trim()}`);
  return outPath;
}

async function main() {
  const client = new ChromeClient();
  await client.connect();

  for (let i = 0; i < CARDS.length; i++) {
    const card = CARDS[i];
    const targetFile = `${card.id} ${card.name}.png`;
    const finalPath = path.join(OUT_DIR, targetFile);

    console.log(`\n========================================`);
    console.log(`[Card ${i + 1}/${CARDS.length}] ${card.id} (${card.name})`);
    console.log(`========================================`);

    if (fs.existsSync(finalPath)) {
      console.log(`[Workflow] File already exists at ${finalPath}, skipping.`);
      continue;
    }

    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Workflow] Attempt ${attempt} for ${card.id}...`);
        await startNewChat(client);
        await sleep(1000);
        await ensureImageTool(client);
        await sleep(500);
        await submitPrompt(client, card.prompt);
        await waitForGenerationAndDownload(client, targetFile);
        success = true;
        break;
      } catch (err) {
        console.error(`[Workflow] Attempt ${attempt} failed:`, err.message);
        await sleep(5000);
      }
    }

    if (!success) {
      console.error(`[FATAL] Failed to generate card ${card.id} after 3 attempts.`);
      process.exit(1);
    }
  }

  console.log('\n[DONE] All 5 cards in G3 Batch 1 generated and saved successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

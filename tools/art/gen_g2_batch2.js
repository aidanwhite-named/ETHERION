const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CARDS = [
  {
    id: 'G2-43',
    name: '벼락 맞은 분노목',
    saveAs: 'G2-43 벼락 맞은 분노목.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. Behind and below the shoulder of a huge treant on the right of the frame — one half of its trunk living bark, the other half split and burnt to charcoal, with a pale lightning scar down the seam — we see what it is striding toward on the left: a small abandoned campfire with a kettle still on it. One great branch-arm is already raised over the flames. Behind it lie a flattened lantern and a crushed iron brazier. Golden-green morning shafts cut through the mist behind the giant; the little fire is a single warm spark in its shadow.
Colour: canopy light — golden-green (#58b85f) shafts through drifting mist.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-43 벼락 맞은 분노목.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'IG2-3',
    name: '이끼 부적',
    saveAs: 'IG2-3 이끼 부적.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of one object — the object itself is the subject. The wet top of an old boulder, seen from directly above: in the lower part of the frame lies a charm barely bigger than a palm — a tight ring braided from living moss, bound with bark cord, with three snail-shell beads on its tassel. Above it on the stone is the pale bare patch the moss was lifted from, the same size and shape, and around them the maker's things are laid out in a row: a bone needle, a coil of cord, a wooden comb. Soft silver rain-light from directly above; beads of water on the moss and the bone needle catch fine bright glints.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG2-3 이끼 부적.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'IG2-6',
    name: '베르단의 뿌리',
    saveAs: 'IG2-6 베르단의 뿌리.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of one object — the object itself is the subject. On a slab of wood in a root-walled workshop, a living root is being trained into shape: wooden pegs stand in the branching pattern of the veins of an arm, and a pale, scale-barked root has been led through half of them, gripping each peg as it goes, its growing tip still nosing toward the next. The far half of the pattern is bare pegs. On the right, a steel arm-guard used for testing lies split along its seam, a root-tip still wedged in the gap. Night in the workshop; blue-green fungus lamps on the wall give a cold glow, with a fine bright edge along the root's scales.
Colour: spore night — black dark lit by blue-green and mushroom-pale luminescence against dark wood.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: IG2-6 베르단의 뿌리.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'M4-1',
    name: '트렌트의 나이테',
    saveAs: 'M4-1 트렌트의 나이테.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of one object — the object itself is the subject. A slice of ancient trunk cut so thin that light passes through it hangs by three red cords from a low branch, as wide as a doorway, in the middle of the frame. Lit from behind, its thousand rings show as fine dark lines in glowing wood, tight as the grooves of a shell, with the outermost ring thicker and paler than the rest. Below it, on a flat stone, wait a bowl of ink and a bundle of thorn needles for copying the pattern onto skin. Near-dark forest; a low green skylight behind the slice makes it glow like stained glass, edged with a thin bright rim.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: M4-1 트렌트의 나이테.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'MC-11',
    name: '침묵',
    saveAs: 'MC-11 침묵.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of a spell — the magic itself is the subject. Straight down onto a flooded stretch of forest floor in rain: across the whole frame the water is dimpled with overlapping raindrop rings — except for one perfect circle in the middle where the surface lies flat as glass and the raindrops hang as round beads just above it. Inside that circle two swords rest where they were let fall, crossed, half under water, and a war horn lies beside them, its mouth full of still water. Soft silver rain-light from above; the still circle reflects the pale sky like a mirror while the rest of the water glitters.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: MC-11 침묵.png — this is the name of the downloaded file only; the painting itself stays wordless.`
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

  console.log('\n[DONE] All 5 cards in G2 Batch 2 generated and saved successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

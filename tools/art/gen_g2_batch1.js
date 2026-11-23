const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CARDS = [
  {
    id: 'CS-G2',
    name: '이끼 덮기',
    saveAs: 'CS-G2 이끼 덮기.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of a spell — the magic itself is the subject. A hostile spell-circle of burning lines lies on a stone floor, left of centre, and moss is closing over it from every side at once: ring after ring of thick green cushion creeping inward, hissing where it meets the fire. Only a hand-wide eye of orange light is left in the middle, guttering, with a thread of smoke rising straight up from it. Across the mossed-over outer rings two deep footprints are already filling with tiny new shoots. Grey overcast light on wet moss; the last orange glow underlights the smoke and the innermost green ring.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: CS-G2 이끼 덮기.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G2-04',
    name: '어린 드라이어드',
    saveAs: 'G2-04 어린 드라이어드.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. A bird's view, straight down: a small dryad of smooth pale bark sleeps curled around the foot of a sapling, leaf-hair fanned over the moss. Thorny vines spiral outward from her across the whole frame like the arms of a galaxy — and on the right side three of them have lifted off the ground, thorns bared, toward the toe of a boot just entering the picture. She sleeps on. Soft green shade with one warm fleck of sun on her cheek; dew along the raised vines catches a clean rim of light.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-04 어린 드라이어드.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G2-27',
    name: '베르단의 레쉬',
    saveAs: 'G2-27 베르단의 레쉬.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. Far off between autumn trunks, a trail of footprints through fallen leaves runs in one wide loop and returns to its own beginning, where a small traveller stands staring at a rag tied to a twig — the marker they left an hour ago. On the right, taller than the saplings and almost one of them, a gaunt figure of bark and twigs with a stag's antlers and a beard of grey lichen watches, turned to the left, two green eyes alight. Dull amber dusk seeps through bare branches; the green glow of its eyes and a fine bright rim on the antlers set it apart from the trunks.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-27 베르단의 레쉬.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G2-35',
    name: '고목 장로회',
    saveAs: 'G2-35 고목 장로회.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. Sunk to shoulder height in dark mulch: three ancient tree trunks stand close together in a triangle, filling the frame, their grey bark grown into folded faces whose half-closed eyes look across at one another, not at us. Between their roots in the centre of the triangle, in the hollow of mulch, one small white mushroom is lifting its cap, the only thing awake. A grey, wet dawn sifts down between crowns; silver light catches the slick cap of the mushroom and traces the deep furrows of the faces.
Colour: rain mist — grey-green (#58b85f) haze and soft silver light.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-35 고목 장로회.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G2-41',
    name: '대벌레 투창수',
    saveAs: 'G2-41 대벌레 투창수.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. The long twig-jointed foreleg of a giant stick insect in extreme close-up, at the left of the frame, knuckles like knots of bark, at the instant its hooked tip opens: a rough javelin snapped from a living branch is leaving its grip toward the left, twigs trimmed, one stubborn leaf still on the shaft — limb and javelin almost twins. Out of focus behind, a row of earlier javelins stands stuck in the ground at odd angles, each one already sprouting leaves. Deep shade in a thorn thicket; a low green skylight from behind rims the jointed limb and the flying shaft, and red berries dot the dark.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-41 대벌레 투창수.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'G2-42',
    name: '독가시 말벌떼',
    saveAs: 'G2-42 독가시 말벌떼.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. The whole frame is wasps: finger-long bodies striped amber and black, glassy wings blurred, each tail ending in a hooked thorn, all diving away from us in one slanting direction. Through the gaps in the swarm we glimpse, below, the grey papery dome of their nest wedged in a thorn tree, and the forest path beneath it, which swings out in a wide, careful half-circle around the tree before continuing. Near-dark thorn forest with a narrow blade of green daylight from above striking wings and thorn-tips; red rosehips glint in the briars.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: G2-42 독가시 말벌떼.png — this is the name of the downloaded file only; the painting itself stays wordless.`
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

  // Poll for up to 180 seconds
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

  // Get current files in Downloads to detect new file
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

  // Wait for new file in Downloads
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

  console.log('\n[DONE] All 6 cards in G2 Batch 1 generated and saved successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

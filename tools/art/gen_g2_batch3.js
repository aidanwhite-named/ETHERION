const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CARDS = [
  {
    id: 'PN-G2-C2',
    name: '가시덤불 덩굴귀',
    saveAs: 'PN-G2-C2 가시덤불 덩굴귀.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. A cutaway through the bank of a rust-stained swamp: above the ground line, in the upper third, a low beast of knotted bramble and thistle crawls toward the right, spines raised. Below the line the frame is all earth in layers — peat, clay, gravel — and through every layer its roots plunge straight down like anchor cables, the deepest still pushing into bedrock. Beside the creature a snapped rope and an iron grapple lie where someone gave up pulling. Dim overcast above the bank; underground the cut earth is near-black, the roots pale, with a few blood-red thistle heads on the beast.
Colour: thorn dark — near-black with deep green (#58b85f) and a few points of blood red.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-C2 가시덤불 덩굴귀.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'PN-G2-U1',
    name: '덩굴손 픽시',
    saveAs: 'PN-G2-U1 덩굴손 픽시.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. A wide stretch of autumn forest floor seen from snail height — acorn cups like basins, a red toadstool rising like a tower, a fallen leaf as big as a tent. Small in the very centre, a pixie with leaf wings hovers facing us, its whole body wound in curling green tendrils like bandages; only the right arm is bare, drawing a twig bow with a thorn for an arrow, aimed straight at the viewer. One loose tendril is knotting itself around a scratch on its knee. Amber late light floods the leaf litter from behind the toadstool, with a bright rim on the leaf wings and the thorn's tip.
Colour: autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f).
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-U1 덩굴손 픽시.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'PN-G2-U2',
    name: '균사 뿌리지기',
    saveAs: 'PN-G2-U2 균사 뿌리지기.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting. High above the floor between the giant roots of a tree-city, the view drops onto a stout mushroom-keeper with a broad spotted cap standing on the left, turned leftward, both stubby hands paying out white threads. The threads spread from its feet across the whole ground like a spider's web laid flat, running from root to root to root, and along them small beads of light are sliding in both directions — messages passing between the trees. Thorn-like spurs stud the rim of its cap. Night under the canopy; the web of threads and the travelling beads glow pale lime, lighting the keeper's cap from below.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PN-G2-U2 균사 뿌리지기.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'PS-G2-1',
    name: '나이테',
    saveAs: 'PS-G2-1 나이테.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of a spell — the magic itself is the subject. After the blows have stopped: the flank of a living trunk fills the frame, bearing a dozen shallow cuts, and in each cut the same thing shows — tight growth rings, and around them one new ring, pale and wet, already grown across the wound like a seal. On the roots below lie three blunted spearheads and one snapped haft. A last curl of bark settles to the ground. Heavy green shade; the fresh rings shine pale and wet as if lit from inside the wood.
Colour: deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: PS-G2-1 나이테.png — this is the name of the downloaded file only; the painting itself stays wordless.`
  },
  {
    id: 'US-G2-1',
    name: '재생의 숲',
    saveAs: 'US-G2-1 재생의 숲.png',
    prompt: `Generate a dark-fantasy painting illustration for this scene:
Landscape 5:4 painting of a spell — the magic itself is the subject. Side-on through a hacked grove at night, something unseen is passing from left to right, marked only by a drifting line of pollen at head height. To the left, where it has been, every lopped bough is whole again, each join wearing a tight collar of new thorns. To the right, branches still hang broken. And exactly at the front of the pollen line a fallen bough is rising off the ground toward the place it was cut from, splinters turning to fit. The drifting pollen glows pale lime and lights each mended bough as it passes; ahead of it the grove is still black.
Colour: spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence.
Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
Save the image file as: US-G2-1 재생의 숲.png — this is the name of the downloaded file only; the painting itself stays wordless.`
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

  console.log('\n[DONE] All 5 cards in G2 Batch 3 generated and saved successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PAIRS = [
  ['A1-15', 'UP-A1-15'],
  ['B3-12', 'UP-B3-12'],
  ['B3-18', 'UP-B3-18'],
  ['B3-22', 'UP-B3-22'],
  ['B3-23', 'UP-B3-23'],
  ['PN-B3-C2', 'UP-PN-B3-C2'],
  ['G1-11', 'UP-G1-11'],
  ['G1-18', 'UP-G1-18'],
  ['G1-24', 'UP-G1-24'],
  ['G2-17', 'UP-G2-17'],
  ['G2-22', 'UP-G2-22'],
  ['G2-23', 'UP-G2-23'],
  ['G3-11', 'UP-G3-11'],
  ['G3-12', 'UP-G3-12'],
  ['G3-17', 'UP-G3-17'],
  ['G3-18', 'UP-G3-18'],
  ['G3-24', 'UP-G3-24']
];

const STYLE = JSON.parse(fs.readFileSync(path.join(__dirname, 'art_style.json'), 'utf8'));
const CARDS_MAP = {};
for (const line of fs.readFileSync(path.join(__dirname, 'prompts', 'cards.jsonl'), 'utf8').split('\n')) {
  if (!line.trim()) continue;
  const d = JSON.parse(line);
  CARDS_MAP[d.id] = d;
}

const DOWNLOADS_DIR = path.join(process.env.HOME, 'Downloads');
const OUT_DIR = path.join(__dirname, 'pending_upgrade_pairs');

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

async function pasteImageIntoEditor(client, imagePath) {
  console.log('[Workflow] Pasting reference image into editor:', imagePath);
  const b64 = fs.readFileSync(imagePath).toString('base64');
  const res = await client.eval(`(async () => {
    try {
      const b64 = "${b64}";
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const file = new File([arr], "reference.png", { type: "image/png" });
      const dt = new DataTransfer();
      dt.items.add(file);
      const editor = document.querySelector('div.ql-editor');
      editor.focus();
      const ev = new ClipboardEvent('paste', {
        clipboardData: dt,
        bubbles: true,
        cancelable: true
      });
      editor.dispatchEvent(ev);
      return true;
    } catch (e) {
      return String(e);
    }
  })()`);
  console.log('[Workflow] Paste dispatch result:', res);
  await sleep(2500);
}

async function submitPrompt(client, promptText, keepExistingAttachments = false) {
  console.log('[Workflow] Focusing and inserting prompt...');
  if (!keepExistingAttachments) {
    await client.eval(`(() => {
      const editor = document.querySelector('div.ql-editor');
      editor.focus();
      document.execCommand('selectAll');
      document.execCommand('delete');
    })()`);
    await sleep(300);
  } else {
    await client.eval(`(() => {
      const editor = document.querySelector('div.ql-editor');
      editor.focus();
    })()`);
    await sleep(300);
  }

  await client.send('Input.insertText', { text: promptText });
  await sleep(600);

  console.log('[Workflow] Clicking submit button...');
  const submitted = await client.eval(`(() => {
    const btn = document.querySelector('button[aria-label="메시지 보내기"], button.send-button');
    if (btn && !btn.disabled) {
      btn.click();
      return true;
    }
    return false;
  })()`);

  if (!submitted) {
    console.log('[Workflow] Send button not ready or not found directly, waiting 1.5s and trying again...');
    await sleep(1500);
    const submitted2 = await client.eval(`(() => {
      const btn = document.querySelector('button[aria-label="메시지 보내기"], button.send-button');
      if (btn && !btn.disabled) {
        btn.click();
        return true;
      }
      return false;
    })()`);
    if (!submitted2) {
      await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
      await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    }
  }
  console.log('[Workflow] Prompt submitted.');
}

async function getDownloadButtonCount(client) {
  return await client.eval(`document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]').length`) || 0;
}

async function waitForGenerationAndDownload(client, targetFilename, prevDownloadBtnCount) {
  console.log(`[Workflow] Waiting for image generation (expecting download buttons > ${prevDownloadBtnCount})...`);
  let startWait = Date.now();
  let foundDownloadBtn = false;

  while (Date.now() - startWait < 180000) {
    await sleep(2500);
    const status = await client.eval(`((prevCount) => {
      const downloadBtns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
      const lastBtn = downloadBtns[downloadBtns.length - 1];
      const stopBtn = document.querySelector('button[aria-label*="생성 중지"], button[aria-label*="답변 생성 중지"]');
      const imgs = Array.from(document.querySelectorAll('img.image, img[src*="blob:"], model-response img'));
      const lastImg = imgs[imgs.length - 1];
      return {
        btnCount: downloadBtns.length,
        hasNewDownloadBtn: downloadBtns.length > prevCount && !!lastBtn && !lastBtn.disabled,
        isGenerating: !!stopBtn,
        hasImg: !!lastImg && lastImg.complete && lastImg.naturalWidth > 200
      };
    })(${prevDownloadBtnCount})`);

    const elapsed = Math.round((Date.now() - startWait) / 1000);
    console.log(`[Workflow] ${elapsed}s: btnCount=${status.btnCount}, newBtn=${status.hasNewDownloadBtn}, generating=${status.isGenerating}, img=${status.hasImg}`);

    if (status.hasNewDownloadBtn && !status.isGenerating && status.hasImg) {
      foundDownloadBtn = true;
      break;
    }
  }

  if (!foundDownloadBtn) {
    throw new Error('Timeout waiting for image generation to complete');
  }

  await sleep(1000);
  const beforeFiles = new Set(fs.readdirSync(DOWNLOADS_DIR));

  console.log('[Workflow] Getting LAST download button coordinates...');
  const coords = await client.eval(`(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
    const btn = btns[btns.length - 1];
    btn.scrollIntoView({ block: 'center', inline: 'center' });
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);

  await sleep(400);
  const coordsAfterScroll = await client.eval(`(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
    const btn = btns[btns.length - 1];
    const r = btn.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);

  console.log('[Workflow] Clicking download button via trusted CDP mouse event at', coordsAfterScroll);
  const { x, y } = coordsAfterScroll;
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
      if (!beforeFiles.has(f) && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) && !f.endsWith('.crdownload')) {
        const p = path.join(DOWNLOADS_DIR, f);
        const s1 = fs.statSync(p).size;
        if (s1 > 500000) {
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

function buildPromptText(cardObj, isUpgradeWithRef) {
  let p = cardObj.prompt;
  if (isUpgradeWithRef && STYLE.upgradeNoRef && STYLE.upgradeRef) {
    p = p.replace(STYLE.upgradeNoRef, STYLE.upgradeRef);
  }
  return `Generate a dark-fantasy painting illustration for this scene:\n${p}`;
}

async function main() {
  const client = new ChromeClient();
  await client.connect();

  for (let i = 0; i < PAIRS.length; i++) {
    const [baseId, upId] = PAIRS[i];
    const baseCard = CARDS_MAP[baseId];
    const upCard = CARDS_MAP[upId];

    if (!baseCard || !upCard) {
      throw new Error(`Missing card metadata for pair ${baseId} / ${upId}`);
    }

    const baseTargetFile = `${baseCard.id} ${baseCard.name}.png`;
    const upTargetFile = `${upCard.id} ${upCard.name}.png`;
    const baseFinalPath = path.join(OUT_DIR, baseTargetFile);
    const upFinalPath = path.join(OUT_DIR, upTargetFile);

    console.log(`\n======================================================`);
    console.log(`[Pair ${i + 1}/${PAIRS.length}] ${baseId} (${baseCard.name}) -> ${upId} (${upCard.name})`);
    console.log(`======================================================`);

    if (fs.existsSync(baseFinalPath) && fs.existsSync(upFinalPath)) {
      console.log(`[Workflow] Both ${baseId} and ${upId} already exist in ${OUT_DIR}, skipping pair.`);
      continue;
    }

    let pairSuccess = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Workflow] Pair Attempt ${attempt} for ${baseId} -> ${upId}...`);
        await startNewChat(client);
        await sleep(1000);

        // 1) Base card
        let prevBtnCount = 0;
        if (!fs.existsSync(baseFinalPath)) {
          console.log(`[Workflow] Generating BASE card: ${baseId} (${baseCard.name})`);
          await ensureImageTool(client);
          await sleep(500);
          const basePrompt = buildPromptText(baseCard, false);
          await submitPrompt(client, basePrompt);
          await waitForGenerationAndDownload(client, baseTargetFile, prevBtnCount);
          prevBtnCount = await getDownloadButtonCount(client);
        } else {
          console.log(`[Workflow] BASE card ${baseId} already exists at ${baseFinalPath}. Attaching it to new chat for UPGRADE card...`);
          await ensureImageTool(client);
          await sleep(500);
          await pasteImageIntoEditor(client, baseFinalPath);
        }

        // 2) Upgrade card (in the same chat if base was just generated, or with pasted base image)
        if (!fs.existsSync(upFinalPath)) {
          console.log(`[Workflow] Generating UPGRADE card: ${upId} (${upCard.name}) based on ${baseId}`);
          await sleep(1000);
          // Also paste the base image so Gemini has explicit attachment reference as well as chat context
          if (prevBtnCount > 0) {
            await pasteImageIntoEditor(client, baseFinalPath);
          }
          const upPrompt = buildPromptText(upCard, true);
          await submitPrompt(client, upPrompt, true);
          await waitForGenerationAndDownload(client, upTargetFile, prevBtnCount);
        }

        pairSuccess = true;
        break;
      } catch (err) {
        console.error(`[Workflow] Pair Attempt ${attempt} failed:`, err.message);
        await sleep(5000);
      }
    }

    if (!pairSuccess) {
      console.error(`[FATAL] Failed to generate pair ${baseId} -> ${upId} after 3 attempts.`);
      process.exit(1);
    }
  }

  console.log('\n[DONE] All 17 pairs (34 cards) generated and saved successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

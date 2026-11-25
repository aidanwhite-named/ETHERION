// node tools/art/gen_common.js [--group A1] [--ids A1-04,A1-05] [--limit N] [--import]
// 일반(common) 등급 카드 중 아직 일러스트가 없는 카드를 웹 Gemini(사용자 Chrome의 Gemini 탭, CDP)로 그려
// tools/art/pending_common/<ID> <이름>.png 와 tools/art/inbox/<ID> <이름>.png 로 저장한다.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '../..');
const CARDS_JSONL = path.join(__dirname, 'prompts', 'cards.jsonl');
const IMG_CARDS_DIR = path.join(ROOT_DIR, 'img', 'cards');
const DOWNLOADS_DIR = path.join(process.env.HOME, 'Downloads');
const OUT_DIR = path.join(__dirname, 'pending_common');
const INBOX_DIR = path.join(__dirname, 'inbox');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(INBOX_DIR)) fs.mkdirSync(INBOX_DIR, { recursive: true });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { group: null, ids: null, limit: 0, autoImport: true, listOnly: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--group' && args[i + 1]) opts.group = args[++i];
    else if (a === '--ids' && args[i + 1]) opts.ids = new Set(args[++i].split(',').map(s => s.trim()));
    else if (a === '--limit' && args[i + 1]) opts.limit = parseInt(args[++i], 10) || 0;
    else if (a === '--no-import') opts.autoImport = false;
    else if (a === '--list') opts.listOnly = true;
  }
  return opts;
}

function getExistingCardIds() {
  const set = new Set();
  if (fs.existsSync(IMG_CARDS_DIR)) {
    for (const f of fs.readdirSync(IMG_CARDS_DIR)) {
      const m = f.match(/^(.+)\.(jpg|jpeg|png)$/i);
      if (m) set.add(m[1]);
    }
  }
  return set;
}

function loadCommonCards(opts) {
  const existing = getExistingCardIds();
  const lines = fs.readFileSync(CARDS_JSONL, 'utf8').split('\n').filter(Boolean);
  let list = [];
  for (const line of lines) {
    const c = JSON.parse(line);
    if (c.grade !== 'common') continue;
    if (!c.prompt) continue;
    if (opts.group && c.group !== opts.group) continue;
    if (opts.ids && !opts.ids.has(c.id)) continue;
    const safeName = (c.name || '').replace(/[\/\\:*?"<>|·]/g, '').replace(/\s+/g, ' ').trim();
    const targetFile = `${c.id} ${safeName}.png`;
    const inPending = fs.existsSync(path.join(OUT_DIR, targetFile));
    if (existing.has(c.id) || inPending) continue;
    list.push({ ...c, targetFile });
  }
  if (opts.limit > 0) list = list.slice(0, opts.limit);
  return list;
}

class ChromeClient {
  constructor() {
    this.ws = null;
    this.msgId = 1;
    this.sessionId = null;
  }

  async connect() {
    const portFilePath = '/Users/aidan/Library/Application Support/Google/Chrome/DevToolsActivePort';
    if (!fs.existsSync(portFilePath)) {
      throw new Error(`DevToolsActivePort not found at ${portFilePath}`);
    }
    const portFile = fs.readFileSync(portFilePath, 'utf8').trim().split('\n');
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
    let geminiTarget = targets.targetInfos.find(t => t.type === 'page' && t.url.includes('gemini.google.com'));
    if (!geminiTarget) {
      console.log('[CDP] Gemini tab not found, opening a new tab to https://gemini.google.com/app ...');
      const created = await this.send('Target.createTarget', { url: 'https://gemini.google.com/app' });
      await sleep(3000);
      const attachRes = await this.send('Target.attachToTarget', { targetId: created.targetId, flatten: true });
      this.sessionId = attachRes.sessionId;
    } else {
      console.log('[CDP] Found Gemini target:', geminiTarget.targetId, geminiTarget.title);
      const attachRes = await this.send('Target.attachToTarget', { targetId: geminiTarget.targetId, flatten: true });
      this.sessionId = attachRes.sessionId;
    }
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

  for (let i = 0; i < 40; i++) {
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
      const imgItem = items.find(el => el.innerText && el.innerText.includes('이미지 만들기'));
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
    if (btn && !btn.disabled) {
      btn.click();
      return true;
    }
    return false;
  })()`);

  if (!submitted) {
    await sleep(1000);
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

async function waitForGenerationAndDownload(client, targetFilename) {
  console.log('[Workflow] Waiting for image generation to complete...');
  const startWait = Date.now();
  let foundDownloadBtn = false;

  while (Date.now() - startWait < 180000) {
    await sleep(2500);
    const status = await client.eval(`(() => {
      const downloadBtns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
      const lastBtn = downloadBtns[downloadBtns.length - 1];
      const stopBtn = document.querySelector('button[aria-label*="생성 중지"], button[aria-label*="답변 생성 중지"]');
      const imgs = Array.from(document.querySelectorAll('img.image, img[src*="blob:"], model-response img'));
      const lastImg = imgs[imgs.length - 1];
      return {
        hasDownloadBtn: !!lastBtn && !lastBtn.disabled,
        isGenerating: !!stopBtn,
        hasImg: !!lastImg && lastImg.complete && lastImg.naturalWidth > 200
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

  await sleep(1000);
  const beforeFiles = new Set(fs.readdirSync(DOWNLOADS_DIR));

  await client.eval(`(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
    const btn = btns[btns.length - 1];
    btn.scrollIntoView({ block: 'center', inline: 'center' });
  })()`);
  await sleep(400);

  const coords = await client.eval(`(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-label="원본 크기 이미지 다운로드"]'));
    const btn = btns[btns.length - 1];
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
      if (!beforeFiles.has(f) && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) && !f.endsWith('.crdownload')) {
        const p = path.join(DOWNLOADS_DIR, f);
        const s1 = fs.statSync(p).size;
        if (s1 > 100000) {
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
  const inboxPath = path.join(INBOX_DIR, targetFilename);
  fs.copyFileSync(downloadedFile, outPath);
  fs.copyFileSync(downloadedFile, inboxPath);

  const dims = execSync(`sips -g pixelWidth -g pixelHeight "${outPath}"`).toString();
  console.log(`[Workflow] Saved to ${outPath} & inbox\n${dims.trim()}`);
  return outPath;
}

function buildPrompt(card) {
  return `Generate a dark-fantasy painting illustration for this scene:\n${card.prompt}`;
}

async function main() {
  const opts = parseArgs();
  const cards = loadCommonCards(opts);
  console.log(`[Common Art Gen] Remaining common cards to generate: ${cards.length}`);

  if (opts.listOnly) {
    for (const c of cards) {
      console.log(`  ${c.id.padEnd(10)} [${c.group}] ${c.name}`);
    }
    return;
  }

  if (cards.length === 0) {
    console.log('[Common Art Gen] Nothing to generate!');
    return;
  }

  const client = new ChromeClient();
  await client.connect();

  let doneCount = 0;
  const failed = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    console.log(`\n========================================`);
    console.log(`[Card ${i + 1}/${cards.length}] ${card.id} (${card.name}) [${card.group}]`);
    console.log(`========================================`);

    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Workflow] Attempt ${attempt} for ${card.id}...`);
        await startNewChat(client);
        await sleep(1000);
        await ensureImageTool(client);
        await sleep(500);
        await submitPrompt(client, buildPrompt(card));
        await waitForGenerationAndDownload(client, card.targetFile);
        success = true;
        doneCount++;
        break;
      } catch (err) {
        console.error(`[Workflow] Attempt ${attempt} failed for ${card.id}:`, err.message);
        await sleep(4000);
      }
    }

    if (!success) {
      console.error(`[ERROR] Skipping ${card.id} after 3 failed attempts.`);
      failed.push(card.id);
    }

    // Import each card right away so img/cards and art_index.js stay up to date
    if (opts.autoImport && success) {
      try {
        console.log('[Workflow] Running artmap.py import --model gemini...');
        const out = execSync('python3 tools/art/artmap.py import --model gemini', { cwd: ROOT_DIR }).toString();
        console.log(out.trim());
      } catch (e) {
        console.error('[Workflow] artmap.py import error:', e.message);
      }
    }
  }

  console.log(`\n[DONE] Generated ${doneCount}/${cards.length} common cards.`);
  if (failed.length) {
    console.log(`[FAILED] ${failed.join(', ')}`);
  }
  process.exit(0);
}

main().catch(err => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});

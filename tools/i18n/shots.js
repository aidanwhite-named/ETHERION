/* ETHERION i18n — 말마다 화면 찍기 (headless Chrome · CDP, npm 없음)
   node tools/i18n/shots.js [폴더] [--langs=en,ja,zh] [--pc] [--phone] [--miss]
   리포를 임시 포트의 정적 서버로 띄우고(게임 서버 · server/data는 건드리지 않음) 말마다 PC 1440×900 · 폰 844×390에서
   대기실 → 설정 창 → 컴퓨터 대전(핸드) → 크게 보기 → 덱 조정실을 찍는다. 소리는 끈다(etherion.pref.bgm/sfx "off").
   --tour: 상점 · 퀘스트 · 교역소 · 순례 · 원정 · 규칙 요약 · 매뉴얼 · 룰북(모든 장) · 결과 창도 돈다.
   --miss: 화면에서 사전에 없어 한국어로 남은 글(I18N.miss)을 <폴더>/miss.<말>.json 에 모은다. */
"use strict";
const { spawn } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const argv = process.argv.slice(2);
const OUT = path.resolve(argv.find(a => !a.startsWith("--")) || path.join(os.tmpdir(), "etherion-i18n-shots"));
const LANGS = (argv.find(a => a.startsWith("--langs=")) || "--langs=en,ja,zh").slice(8).split(",");
const PC = !argv.includes("--phone") || argv.includes("--pc"), PHONE = !argv.includes("--pc") || argv.includes("--phone");
const MISS = argv.includes("--miss"), TOUR = argv.includes("--tour");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PORT = 23000 + Math.floor(Math.random() * 1000), BASE = `http://127.0.0.1:${PORT}/index.html`;
const kids = [];
fs.mkdirSync(OUT, { recursive: true });
async function main() {
  kids.push(spawn("python3", ["-m", "http.server", String(PORT), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: "ignore" }));
  const cport = 9800 + Math.floor(Math.random() * 150), dir = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-i18n-chrome-"));
  kids.push(spawn(CHROME, ["--headless=new", `--remote-debugging-port=${cport}`, `--user-data-dir=${dir}`, "--mute-audio", "--no-first-run", "--no-default-browser-check", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "about:blank"], { stdio: "ignore" }));
  let tgt = null;
  for (let i = 0; i < 80 && !tgt; i++) { await sleep(200); try { tgt = (await (await fetch(`http://127.0.0.1:${cport}/json`)).json()).find(t => t.type === "page"); } catch (e) {} }
  if (!tgt) throw new Error("크롬이 뜨지 않았습니다");
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const wait = new Map(), logs = [];
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { const [res, rej] = wait.get(m.id); wait.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method === "Runtime.exceptionThrown") logs.push("EXC " + (m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description || m.params.exceptionDetails.text).slice(0, 300)); };
  const send = (method, params) => new Promise((res, rej) => { const i = ++id; wait.set(i, [res, rej]); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => { const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error("evaluate: " + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text)); return r.result.value; };
  const until = async (expr, ms) => { const t0 = Date.now(); for (;;) { const v = await ev(expr).catch(() => null); if (v) return v; if (Date.now() - t0 > (ms || 15000)) throw new Error("기다리다 멈춤: " + expr); await sleep(200); } };
  const shot = async name => { const r = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(path.join(OUT, name + ".png"), Buffer.from(r.data, "base64")); console.log("  찍음 " + name); };
  await send("Runtime.enable"); await send("Page.enable"); await send("Network.enable"); await send("Network.setCacheDisabled", { cacheDisabled: true });
  const result = {};
  for (const lang of LANGS) for (const dev of [PC && "pc", PHONE && "phone"].filter(Boolean)) {
    const phone = dev === "phone";
    await send("Emulation.setDeviceMetricsOverride", phone ? { width: 844, height: 390, deviceScaleFactor: 2, mobile: true, screenWidth: 844, screenHeight: 390 } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Emulation.setTouchEmulationEnabled", { enabled: phone, maxTouchPoints: 5 });
    await send("Emulation.setUserAgentOverride", { userAgent: phone ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" });
    await send("Page.navigate", { url: BASE }); await sleep(800);
    await ev(`localStorage.clear(); for (const [k,v] of Object.entries({ "etherion.pref.lang": ${JSON.stringify(JSON.stringify(lang))}, "etherion.pref.bgm": '"off"', "etherion.pref.sfx": '"off"', "etherion.pref.guideDone": "true", "etherion.pref.guideOff": "true", "etherion.pref.logOpen": "false" })) localStorage.setItem(k, v); true`);
    await send("Page.navigate", { url: BASE });
    await until(`typeof Store !== "undefined" && typeof showLobby === "function" && document.readyState === "complete"`);
    await sleep(1200);
    const tag = `${lang}-${dev}`;
    await shot(`${tag}-0-title`);
    await ev(`Store.guest(); showLobby(); true`); await sleep(1500);
    await shot(`${tag}-1-lobby`);
    await ev(`showSettings(); true`); await sleep(700);
    await shot(`${tag}-2-settings`);
    await ev(`document.querySelectorAll(".modal-wrap").forEach(w => w.remove()); true`);
    await ev(`(() => { const u = Store.user(), f = "B1", ag = "A2", my = Store.deck(u, f).cards;
      launch({ mode: "ai", p0: { name: u.id, group: f, cards: my }, p1: { name: GROUPS[ag].ai, group: ag, cards: aiDeckFor(ag, f, my).cards, isAI: true, ai: "normal" } }); return true; })()`);
    await until(`document.querySelectorAll(".hand-me .card").length > 0`, 20000).catch(() => null);
    await sleep(2500);
    await ev(`document.querySelectorAll(".modal-wrap").forEach(w => w.remove()); true`);
    await shot(`${tag}-3-battle`);
    for (const [i, cid] of [["a", "MB-04"], ["b", "B1-03"], ["c", "IB1-1"]]) {
      await ev(`showCardModal(CARDS[${JSON.stringify(cid)}]); true`); await sleep(600);
      await shot(`${tag}-4${i}-card-${cid}`);
      await ev(`document.querySelectorAll(".modal-wrap").forEach(w => w.remove()); true`);
    }
    await ev(`if (typeof G !== "undefined") { G = null; } showLobby(); true`).catch(() => null); await sleep(800);
    await ev(`showEditor ? (showEditor("B1"), true) : false`).catch(() => null); await sleep(1800);
    await shot(`${tag}-5-editor`);
    if (TOUR) {   // 그 밖의 화면: 상점 · 퀘스트 · 교역소 · 순례 · 규칙 요약 · 매뉴얼 · 룰북(모든 장) · 결과
      const close = `document.querySelectorAll(".modal-wrap, .man-wrap, .hx-wrap").forEach(w => w.remove()); document.querySelectorAll(".man [data-close], [data-close]").forEach(b => { try { b.click(); } catch (e) {} }); true`;
      for (const [nm, js] of [["shop", "showShop()"], ["journal", "showJournal()"], ["trade", "showTrade()"], ["pilgrim", "showPilgrim()"], ["expedition", "showExpedition()"]]) {
        await ev(`try { ${js}; true } catch (e) { false }`).catch(() => null); await sleep(1500);
        await shot(`${tag}-6-${nm}`);
        await ev(`[...document.querySelectorAll("[data-tab],[data-jt],.tabs button")].slice(0, 8).forEach((b, i) => setTimeout(() => b.click(), i * 250)); true`).catch(() => null); await sleep(2400);
        await ev(close).catch(() => null); await ev(`showLobby(); true`).catch(() => null); await sleep(600);
      }
      await ev(`showRules(); true`).catch(() => null); await sleep(600); await shot(`${tag}-7-rules`); await ev(close).catch(() => null);
      for (const [nm, js] of [["manual", "Help.Manual.open()"], ["rulebook", "RulebookUI.open()"]]) {
        await ev(`${js}; true`).catch(() => null); await sleep(900); await shot(`${tag}-8-${nm}`);
        await ev(`[...document.querySelectorAll("[data-go]")].forEach((a, i) => setTimeout(() => a.click(), i * 120)); true`).catch(() => null); await sleep(6000);
        await ev(close).catch(() => null); await sleep(300);
      }
      await ev(`(() => { const u = Store.user(), f = "B1", ag = "G2", my = Store.deck(u, f).cards;
        launch({ mode: "ai", p0: { name: u.id, group: f, cards: my }, p1: { name: GROUPS[ag].ai, group: ag, cards: aiDeckFor(ag, f, my).cards, isAI: true, ai: "normal" } }); return true; })()`).catch(() => null);
      await sleep(2500); await ev(`document.querySelectorAll(".modal-wrap").forEach(w => w.remove()); G.winner = 0; G.over = true; showResult(); true`).catch(e => console.log("결과 창: " + e.message)); await sleep(1500);
      await shot(`${tag}-9-result`);
      await ev(close).catch(() => null);
    }
    if (MISS) result[lang] = [...new Set([...(result[lang] || []), ...await ev(`[...I18N.miss]`)])];
  }
  if (MISS) for (const [l, arr] of Object.entries(result)) fs.writeFileSync(path.join(OUT, `miss.${l}.json`), JSON.stringify(arr.sort(), null, 1));
  if (logs.length) console.log("페이지 오류:\n  " + [...new Set(logs)].slice(0, 20).join("\n  "));
  console.log("폴더: " + OUT);
}
main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => { for (const k of kids) try { k.kill(); } catch (e) {} });

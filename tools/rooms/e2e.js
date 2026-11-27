/* 온라인 대전 방 — 화면까지 통째 시험 (headless Chrome 두 개 · CDP)
   node tools/rooms/e2e.js [스크린샷 폴더] [--no-match] [--peerjs] [--dbl]
   임시 포트 · 임시 데이터로 서버를 띄우고(진짜 server/data · 8787은 건드리지 않음), 크롬 창 두 개가 두 모험가로 들어와
   방 만들기 → 목록 → 틀린 비밀번호 → 입장 → 채팅 → 깃발 · 덱 점수 → 준비 → 대전 시작 → 한 판 끝까지 → 결과 · 전적 → 내보내기 · 나가기를 해 본다.
   두 창을 잇는 길은 기본이 게임에 든 시험용 통로(BroadcastChannel)이고, --peerjs 를 주면 진짜 PeerJS(WebRTC · 인터넷 필요)로 잇는다.
   PC 1440×900 · 폰 844×390 스크린샷을 남긴다. */
"use strict";
const { spawn } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const SHOTS = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : path.join(os.tmpdir(), "etherion-rooms-shots"));
const NO_MATCH = process.argv.includes("--no-match"), PEERJS = process.argv.includes("--peerjs"), DBL = process.argv.includes("--dbl");   // --dbl: 코인 "넘어가기"를 마구 누르는 손(같은 단추를 연달아 · 250ms마다 다시)
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-rooms-e2e-"));
const PORT = 22000 + Math.floor(Math.random() * 1000), BASE = `http://127.0.0.1:${PORT}`;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0, srvOut = "";
const ok = (c, name) => { if (c) { pass++; console.log("  ✓ " + name); } else { fail++; console.log("  ✗ " + name); } };
const kids = [];

async function api(p, body, token) {
  const r = await fetch(BASE + p, { method: body ? "POST" : "GET", headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}), body: body ? JSON.stringify(body) : undefined });
  return r.json();
}
/* 크롬 하나에 창 둘(두 모험가). 로그인 토큰은 창마다 메모리에 따로 있으므로(같은 저장소를 쓰지만 읽는 것은 처음 한 번) 창을 차례로 연다 */
let CH = null;
async function chrome() {
  const port = 9400 + Math.floor(Math.random() * 400), dir = path.join(TMP, "chrome");
  const ch = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, "--mute-audio", "--no-first-run", "--no-default-browser-check",
    "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows", "--window-size=1440,900", "about:blank"], { stdio: "ignore" });
  kids.push(ch);
  let ver = null;
  for (let i = 0; i < 80 && !ver; i++) { await sleep(200); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch (e) {} }
  if (!ver) throw new Error("크롬이 뜨지 않았습니다");
  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const wait = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m.result); wait.delete(m.id); } };
  CH = { port, send: (method, params) => new Promise(res => { const i = ++id; wait.set(i, res); ws.send(JSON.stringify({ id: i, method, params: params || {} })); }) };
}
async function browser(token) {
  const made = await CH.send("Target.createTarget", { url: "about:blank", newWindow: true });
  let target = null;
  for (let i = 0; i < 40 && !target; i++) { await sleep(150); target = (await (await fetch(`http://127.0.0.1:${CH.port}/json`)).json()).find(t => t.id === made.targetId); }
  if (!target) throw new Error("창을 열지 못했습니다");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const wait = new Map(), logs = [];
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { const [res, rej] = wait.get(m.id); wait.delete(m.id); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    else if (m.method === "Runtime.exceptionThrown") logs.push("EXC " + (m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description || m.params.exceptionDetails.text));
    else if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error" || m.params.type === "warning")) logs.push(m.params.type + " " + m.params.args.map(a => a.value || a.description || "").join(" ")); };
  const send = (method, params) => new Promise((res, rej) => { const i = ++id; wait.set(i, [res, rej]); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const B = { send, logs,
    async ev(expr) { const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error("evaluate: " + (r.exceptionDetails.exception && r.exceptionDetails.exception.description || r.exceptionDetails.text) + "\n  " + expr.slice(0, 200)); return r.result.value; },
    async until(expr, ms, what) { const t0 = Date.now(); for (;;) { const v = await B.ev(expr).catch(() => null); if (v) return v; if (Date.now() - t0 > (ms || 10000)) throw new Error("기다리다 멈춤: " + (what || expr)); await sleep(150); } },
    async shot(name) { const r = await send("Page.captureScreenshot", { format: "png" }); fs.mkdirSync(SHOTS, { recursive: true }); fs.writeFileSync(path.join(SHOTS, name + ".png"), Buffer.from(r.data, "base64")); },
    async open(phone) {
      await send("Emulation.setDeviceMetricsOverride", phone ? { width: 844, height: 390, deviceScaleFactor: 2, mobile: true, screenWidth: 844, screenHeight: 390 } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
      await send("Emulation.setTouchEmulationEnabled", { enabled: !!phone, maxTouchPoints: 5 });
      await send("Emulation.setUserAgentOverride", { userAgent: phone ? "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" });
      await send("Page.navigate", { url: BASE + "/" });
      await B.until(`typeof Store !== "undefined" && typeof showLobby === "function" && typeof Rooms !== "undefined" && document.readyState === "complete"`, 30000, "게임 읽기");
      await sleep(600);
      await B.ev(`showLobby(); 1`);
      await B.until(`App.screen === "lobby" && !!Store.user()`, 8000, "대기실");
      /* 두 기기를 잇는 길: 기본은 게임에 든 시험용 통로(같은 브라우저의 두 창, BroadcastChannel — online.js openLocal). --peerjs 를 주면 진짜 PeerJS(WebRTC) */
      if (!PEERJS) await B.ev(`Online.local = () => true; Rooms.on = () => typeof Net !== "undefined" && Net.on && !!Net.token; 1`);
    } };
  await send("Page.enable"); await send("Runtime.enable"); await send("Network.enable"); await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `try { localStorage.setItem("etherion.pref.bgm", '"off"'); localStorage.setItem("etherion.pref.sfx", '"off"'); localStorage.setItem("etherion.pref.guideDone", "true"); localStorage.setItem("etherion.pref.guideOff", "true"); localStorage.setItem("etherion.pref.logOpen", "false"); localStorage.setItem("etherion.net.token", ${JSON.stringify(token)}); } catch (e) {}` });
  return B;
}
/* 판을 대신 두는 손: 멀리건은 그대로, 코인은 넘기고, 내 준비 차례에는 결정화 한 장 + 낼 수 있는 유닛을 내고 준비 완료 */
const BOT = `(() => { if (window.__bot) return; const DBL_ON = ${DBL}; window.__busy = false; window.__bot = setInterval(async () => {
  if (typeof G === "undefined" || !G || !G.online || G.phase === "over") return;
  if (G.speed !== 0 && G.speed < 3) G.speed = 3;
  const mb = document.querySelector(".mull-modal .modal-btns .btn"); if (mb) { if (!mb.__hit) { mb.__hit = 1; mb.click(); } return; }
  if (!window.__coin) { window.__coin = []; const os = Online.send.bind(Online); Online.send = m => { if (m && m.t === "coin") window.__coin.push(m.k + (m.flip == null ? "" : "!") ); return os(m); }; }
  const cp = [...document.querySelectorAll(".cs-pass")].find(b => (DBL_ON || !b.__hit) && b.isConnected); if (cp) { cp.__hit = 1; cp.click(); if (DBL_ON) { cp.click(); document.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true })); } return; }
  if (G.ready && G.control === G.me && !window.__busy) {
    window.__busy = true; const myG = G;
    try {   // 사람이 둘 수 있는 수만 둔다(결정화 한 장 · 낼 수 있는 유닛) — 상대에게 그대로 전해진다. 컴퓨터의 수(aiPrep)는 판 난수를 써서 두 기기가 어긋난다
      const p = G.players[G.me];
      if (crysLeft(p) > 0 && p.hand.length) { actCrystal(p, p.hand[p.hand.length - 1].uid); render(); await wait(150); }
      for (let n = 0; n < 6 && G === myG; n++) {
        const it = p.hand.find(x => { const c = C(x); return c.type === "unit" && !canPlay(p, c); }); if (!it) break;
        if (!actPlace(p, it.uid, null)) break;
        render(); await wait(150);
      }
    } catch (e) { console.error("bot", e); }
    if (G === myG && G.ready) { G.sel = null; G.inspect = null; const r = G.ready; G.ready = null; G.control = null; render(); r(); }
    window.__busy = false;
  } }, 250); })(); 1`;
const txt = sel => `(document.querySelector(${JSON.stringify(sel)}) || {}).textContent || ""`;
const click = sel => `(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return false; e.click(); return true; })()`;
const modalBtn = label => `(() => { const b = [...document.querySelectorAll(".modal-wrap .modal-btns .btn")].find(x => x.textContent.trim() === ${JSON.stringify(label)}); if (!b) return false; b.click(); return true; })()`;

(async () => {
  const CONFIG = path.join(TMP, "config.json"), DB = path.join(TMP, "db.json");
  fs.writeFileSync(CONFIG, JSON.stringify({ port: PORT, host: "127.0.0.1", adminPassword: "test-admin-password", openBrowser: false, codeGapSec: 0 }));
  const srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", CONFIG, "--data", DB, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  kids.push(srv); srv.stdout.on("data", d => srvOut += d); srv.stderr.on("data", d => srvOut += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await api("/api/hello")).ok) break; } catch (e) {} }
  let A, B;
  try {
    const AGREE = { terms: true, privacy: true, age14: true };
    const ra = await api("/api/register", { id: "가람", pw: "longpassword", groups: ["B1", "G1"], agree: AGREE });
    const rb = await api("/api/register", { id: "미라", pw: "longpassword", groups: ["A1", "B2"], agree: AGREE });
    if (!ra.ok || !rb.ok) throw new Error("등록 실패");
    await chrome();
    A = await browser(ra.token); B = await browser(rb.token);

    /* ===== PC 1440×900 ===== */
    console.log("PC 1440×900");
    await A.open(false); await B.open(false);
    ok(await A.ev(`Store.user().id`) === "가람" && await B.ev(`Store.user().id`) === "미라", "두 창이 서로 다른 모험가로 들어옴");
    await A.ev(`startOnline(App.lobbyGroup); 1`); await B.ev(`startOnline(App.lobbyGroup); 1`);
    await A.until(`App.screen === "rooms" && /열린 방 0개/.test(${txt("#rm-count")})`, 8000, "A 방 목록");
    ok(await A.ev(`!!document.querySelector(".rm-empty") && document.querySelectorAll(".rm-pick").length === 2`), "A: 빈 방 목록 · 내 깃발 둘");
    /* A: 비밀번호 방 만들기 (깃발 공개) */
    await A.ev(click('[data-rm="create"]')); await A.until(`!!document.querySelector("#rm-f-title")`);
    await A.ev(`document.querySelector("#rm-f-title").value = "불꽃과 서리의 결투 <b>굵게</b>"; document.querySelector("#rm-f-pw").value = "열쇠1234"; 1`);
    await A.ev(modalBtn("방 만들기"));
    await A.until(`App.screen === "room" && !!Rooms.room`, 8000, "A 방 대기실");
    ok(await A.ev(`Rooms.room.lock === true && Rooms.amHost() && document.querySelector(".rr-seat.is-empty") && !document.querySelector("#rr-title b b")`), "A: 방 만들기(잠김) · 빈 자리 · 제목은 글자로만");
    await B.ev(click('[data-rm="refresh"]'));
    await B.until(`document.querySelectorAll(".rm-row").length === 1`, 8000, "B 목록에 방");
    const row = await B.ev(`document.querySelector(".rm-row").innerText.replace(/\\s+/g, " ")`);
    ok(/불꽃과 서리의 결투/.test(row) && /가람/.test(row) && /LV ?1/.test(row) && /대기 중/.test(row) && /1 ?\/ ?2/.test(row) && await B.ev(`!!document.querySelector(".rm-row .rm-lock") && !!document.querySelector(".rm-row .rm-seal img")`), "B: 목록 한 줄(제목 · 🔒 · 방장 · 레벨 · 깃발 · 상태 · 인원) — " + row);
    await A.ev(`Rooms.act("chat", { text: "어서 오세요" }); 1`);
    await B.shot("pc-1-rooms-list");
    /* B: 틀린 비밀번호 → 거절, 맞는 비밀번호 → 입장 */
    await B.ev(click(".rm-row")); await B.until(`!!document.querySelector("#rm-j-pw")`);
    await B.ev(`document.querySelector("#rm-j-pw").value = "틀린번호"; 1`); await B.ev(modalBtn("들어가기"));
    await B.until(`/맞지 않습니다/.test(${txt(".modal-wrap .err")})`, 8000, "틀린 비밀번호 안내");
    ok(await B.ev(`App.screen === "rooms" && !Rooms.room`), "B: 틀린 비밀번호 거절");
    await B.ev(`document.querySelector("#rm-j-pw").value = "열쇠1234"; 1`); await B.ev(modalBtn("들어가기"));
    await B.until(`App.screen === "room" && Rooms.room && Rooms.room.members.length === 2`, 8000, "B 입장");
    await A.until(`Rooms.room.members.length === 2 && document.querySelectorAll(".rr-seat:not(.empty)").length === 2`, 8000, "A가 B를 봄");
    ok(true, "B: 맞는 비밀번호로 입장 · A 화면에 바로 보임(long-poll)");
    /* 채팅 */
    await B.ev(`document.querySelector("#rr-in").value = "잘 부탁드립니다 <script>alert(1)</script>"; document.querySelector("#rr-form").requestSubmit(); 1`);
    await A.until(`/잘 부탁드립니다/.test(${txt("#rr-log")})`, 8000, "A가 채팅을 받음");
    await A.ev(`document.querySelector("#rr-in").value = "좋은 승부 합시다"; document.querySelector("#rr-form").requestSubmit(); 1`);
    await B.until(`/좋은 승부 합시다/.test(${txt("#rr-log")})`, 8000, "B가 채팅을 받음");
    ok(await A.ev(`!document.querySelector("#rr-log script") && /<script>/.test(${txt("#rr-log")})`), "채팅 주고받기 · HTML은 글자로만");
    /* 깃발 · 덱 점수 */
    const seatA = await B.ev(`document.querySelector("#rr-foe").innerText.replace(/\\s+/g, " ")`);
    ok(/가람/.test(seatA) && /방장/.test(seatA) && /LV ?1/.test(seatA) && /0 ?승 0 ?패/.test(seatA) && /덱 점수 ?\d+/.test(seatA) && /준비 중/.test(seatA), "B가 보는 상대 자리(아이디 · 방장 · 레벨 · 전적 · 깃발 · 덱 점수 · 준비) — " + seatA);
    const before = await A.ev(`Rooms.me().flag + ":" + Rooms.me().score`);
    await A.ev(click('#rr-pick .rm-pick:not(.on)'));
    await A.until(`Rooms.me().flag + ":" + Rooms.me().score !== ${JSON.stringify(before)}`, 8000, "A 깃발 바꿈");
    const after = await A.ev(`Rooms.me().flag + ":" + Rooms.me().score`);
    await B.until(`Rooms.foe().flag === ${JSON.stringify(after.split(":")[0])}`, 8000, "B가 바뀐 깃발을 봄");
    ok(before !== after && await B.ev(`String(Rooms.foe().score) === ${JSON.stringify(after.split(":")[1])} && /덱 점수/.test(document.querySelector("#rr-foe").innerText)`), `깃발 고르기 · 덱 점수 갱신 (${before} → ${after})`);
    /* 준비 */
    ok(await A.ev(`document.querySelector('[data-act="start"]').disabled === true`) && await B.ev(`!document.querySelector('[data-act="start"]')`), "준비 전: 방장 시작 단추 꺼짐 · 도전자에게는 없음");
    await B.ev(click('[data-act="ready"]')); await A.until(`Rooms.foe().ready`, 8000, "B 준비");
    await A.shot("pc-2-room-waiting");
    await A.ev(click('[data-act="ready"]')); await A.until(`Rooms.me().ready && !document.querySelector('[data-act="start"]').disabled`, 8000, "A 준비");
    await B.until(`Rooms.foe().ready && Rooms.me().ready`, 8000);
    ok(true, "둘 다 준비 → 방장 시작 단추 켜짐");
    await B.shot("pc-3-room-ready-guest");

    if (!NO_MATCH) {
      /* 대전 시작 → 한 판 끝까지 */
      await A.ev(click('[data-act="start"]'));
      await Promise.all([A.until(`App.screen === "game" && typeof G !== "undefined" && G && G.online`, 45000, "A 대전 화면(PeerJS 연결)"), B.until(`App.screen === "game" && typeof G !== "undefined" && G && G.online`, 45000, "B 대전 화면(PeerJS 연결)")]);
      ok(await A.ev(`G.me === 0 && G.players[1].name === "미라"`) && await B.ev(`G.me === 1 && G.players[0].name === "가람"`), "대전 시작: 방장 0번 · 도전자 1번, 번호를 주고받지 않고 연결" + (PEERJS ? " (PeerJS)" : " (시험용 통로)"));
      const mid = await api("/api/room", { a: "list" }, ra.token);
      ok(mid.rooms[0].status === "play", "목록에 대전 중으로 보임");
      await A.ev(BOT); await B.ev(BOT);
      const t0 = Date.now(); let last = "", lastAt = Date.now(), lastTurn = "";
      for (;;) {
        const s = await A.ev(`G ? G.phase + " t" + G.turn + " " + G.players.map(p => p.life).join(":") : "null"`).catch(() => "?");
        if (s !== last) { const tn = (/t(\d+) /.exec(s) || [])[1]; if (tn !== lastTurn) { lastTurn = tn; console.log("    … " + s + " (" + Math.round((Date.now() - t0) / 1000) + "초)"); } last = s; lastAt = Date.now(); }
        else if (Date.now() - lastAt > 60000) {
          const diag = `JSON.stringify({ ph: G && G.phase, turn: G && G.turn, me: G && G.me, control: G && G.control, ready: !!(G && G.ready), busy: window.__busy, q: Online.q.map(m => m.t), waiters: Online.waiters.length, conn: !!Online.conn, warned: Online.warned, modal: [...document.querySelectorAll(".modal-wrap .modal")].map(m => m.className + ":" + m.innerText.slice(0, 80)), coin: (document.querySelector(".coinstage") || {}).innerText, toast: [...document.querySelectorAll(".toast")].map(t => t.textContent) })`;
          console.log("    멈춤 A", await A.ev(diag)); console.log("    멈춤 B", await B.ev(diag)); await A.shot("stall-A"); await B.shot("stall-B");
          throw new Error("판이 60초 동안 나아가지 않습니다: " + s);
        }
        if (await A.ev(`Online.warned`) || await B.ev(`Online.warned`)) {
          console.log("    어긋남 A 보낸 코인", await A.ev(`JSON.stringify(window.__coin)`)); console.log("    어긋남 B 보낸 코인", await B.ev(`JSON.stringify(window.__coin)`));
          console.log("    알림", await A.ev(`[...document.querySelectorAll(".toast, .modal")].map(t => t.innerText.slice(0, 160)).join(" / ")`), "//", await B.ev(`[...document.querySelectorAll(".toast, .modal")].map(t => t.innerText.slice(0, 160)).join(" / ")`));
          throw new Error("판이 어긋났습니다: " + s);
        }
        if (await A.ev(`!!document.querySelector(".result")`) && await B.ev(`!!document.querySelector(".result")`)) break;
        if (Date.now() - t0 > 20 * 60e3) throw new Error("판이 20분 안에 끝나지 않았습니다: " + s);
        await sleep(1500);
      }
      const resA = await A.ev(`({ w: G.winner, turn: G.turn, reason: G.reason, title: ${txt(".result .res-title")}, btn: [...document.querySelectorAll(".result .res-btns .btn")].map(b => b.textContent).join("|") })`);
      const resB = await B.ev(`({ w: G.winner, turn: G.turn, title: ${txt(".result .res-title")} })`);
      console.log("    결과", JSON.stringify(resA), JSON.stringify(resB), Math.round((Date.now() - t0) / 1000) + "초");
      ok(resA.w === resB.w && resA.turn === resB.turn && resA.title !== resB.title, "한 판 끝: 두 기기의 승패 · 턴이 같다");
      ok(/방으로/.test(resA.btn), "결과 창 단추 = 방으로");
      const coins = [].concat(await A.ev(`window.__coin || []`), await B.ev(`window.__coin || []`));
      ok(new Set(coins).size === coins.length, `코인 결정은 교전마다 한 번만 전해짐 (${coins.length}번${DBL ? " · 넘어가기를 마구 눌러도" : ""})`);
      ok(!(await A.ev(`Online.warned`)) && !(await B.ev(`Online.warned`)), "판이 어긋나지 않음(턴마다 요약 일치)");
      await A.shot("pc-4-result");
      /* 전적 · 보상: 서버가 두 보고를 맞대어 정한다 */
      await sleep(2500);
      const ma = await api("/api/me", null, ra.token), mb = await api("/api/me", null, rb.token);
      const wA = resA.w === 0;
      ok(ma.me.stats.w === (wA ? 1 : 0) && ma.me.stats.l === (wA ? 0 : 1) && mb.me.stats.w === (wA ? 0 : 1) && mb.me.stats.l === (wA ? 1 : 0), `전적 반영: 가람 ${ma.me.stats.w}승 ${ma.me.stats.l}패 · 미라 ${mb.me.stats.w}승 ${mb.me.stats.l}패`);
      ok((ma.me.xp || 0) > 0 && (mb.me.xp || 0) > 0, `보상(조각 · 경험치)이 양쪽에 들어옴: ${ma.me.xp} · ${mb.me.xp}`);
      /* 방으로 */
      await A.ev(click('.result [data-r="lobby"]'));
      await A.until(`App.screen === "room" && !!Rooms.room`, 8000, "A 방으로");
      ok(await A.ev(`Rooms.room.status === "play" || Rooms.room.status === "wait"`), "A: 결과 → 방으로 돌아옴");
      await B.ev(click('.result [data-r="lobby"]'));
      await B.until(`App.screen === "room" && Rooms.room && Rooms.room.status === "wait"`, 8000, "B 방으로");
      await A.until(`Rooms.room.status === "wait" && !Rooms.me().ready`, 8000, "방이 대기로");
      const seat2 = await B.ev(`document.querySelector("#rr-me").innerText.replace(/\\s+/g, " ")`);
      ok(new RegExp(`${mb.me.stats.w} ?승 ${mb.me.stats.l} ?패`).test(seat2), "방 자리의 전적이 새로 고쳐짐 — " + seat2);
    }
    /* 내보내기 */
    await A.ev(click('[data-act="kick"]')); await A.until(`!!document.querySelector(".modal-wrap")`); await A.ev(modalBtn("내보내기"));
    await B.until(`App.screen === "rooms" && !Rooms.room`, 8000, "B가 내보내짐");
    ok(await A.ev(`Rooms.room.members.length === 1`), "방장이 내보내기 → 도전자는 방 목록으로");
    await B.ev(click('[data-rm="refresh"]')); await B.until(`document.querySelectorAll(".rm-row").length === 1`, 8000);
    await B.ev(click(".rm-row")); await B.until(`!!document.querySelector("#rm-j-pw")`);
    await B.ev(`document.querySelector("#rm-j-pw").value = "열쇠1234"; 1`); await B.ev(modalBtn("들어가기"));
    await sleep(900);
    ok(await B.ev(`App.screen === "rooms" && !Rooms.room`), "내보내진 방에는 다시 못 들어감");
    await B.ev(`document.querySelectorAll(".modal-wrap").forEach(e => e.remove()); 1`);
    /* 나가기 */
    await A.ev(click('[data-act="leave"]'));
    await A.until(`App.screen === "rooms"`, 8000, "A 나가기");
    await sleep(500);
    ok((await api("/api/room", { a: "list" }, ra.token)).rooms.length === 0, "방장이 나가면 빈 방은 사라짐");

    /* ===== 폰 844×390 ===== */
    console.log("폰 844×390");
    await A.open(true); await B.open(true);
    ok(await A.ev(`document.documentElement.classList.contains("mobile")`), "폰 화면으로 읽힘(html.mobile)");
    /* 목록을 채워 본다: 다른 모험가 셋이 방을 열어 둔다 */
    const extra = [];
    for (const [id, g, title, pw, show] of [["도윤", "G2", "초보 환영 · 천천히 둡니다", "", true], ["서하", "A3", "고수만", "1234", false], ["라온", "B3", "한 판 빠르게", "", true]]) {
      const r = await api("/api/register", { id, pw: "longpassword", groups: [g], agree: AGREE }); extra.push(r.token);
      await api("/api/room", { a: "create", title, pw, showFlag: show, flag: g }, r.token);
    }
    await A.ev(`startOnline(App.lobbyGroup); 1`); await B.ev(`startOnline(App.lobbyGroup); 1`);
    await A.until(`App.screen === "rooms"`, 8000);
    await A.ev(click('[data-rm="create"]')); await A.until(`!!document.querySelector("#rm-f-title")`);
    await A.ev(`document.querySelector("#rm-f-title").value = "달빛 아래 한 판"; 1`); await A.ev(modalBtn("방 만들기"));
    await A.until(`App.screen === "room"`, 8000);
    await B.ev(click('[data-rm="refresh"]')); await B.until(`document.querySelectorAll(".rm-row").length === 4`, 8000, "폰 B 목록");
    await sleep(400); await B.shot("phone-1-rooms-list");
    await A.shot("phone-2-room-empty");
    await B.ev(`Rooms.joinUI(Rooms.list.find(r => r.host.id === "가람").id); 1`);
    await B.until(`App.screen === "room" && Rooms.room.members.length === 2`, 8000, "폰 B 입장");
    await B.ev(`Rooms.act("chat", { text: "안녕하세요, 한 판 부탁드립니다" }); 1`); await sleep(300);
    await A.ev(`Rooms.act("chat", { text: "반갑습니다. 준비되면 시작할게요" }); 1`);
    await B.ev(click('[data-act="ready"]')); await A.until(`Rooms.foe() && Rooms.foe().ready`, 8000);
    await sleep(500); await A.shot("phone-3-room-host"); await B.shot("phone-4-room-guest");
    const fit = await A.ev(`(() => { const r = document.querySelector(".room").getBoundingClientRect(), a = document.querySelector("#rr-acts").getBoundingClientRect(); return { top: Math.round(document.querySelector(".topbar").getBoundingClientRect().bottom), roomTop: Math.round(r.top), vh: innerHeight, vw: innerWidth, acts: Math.round(a.bottom), room: Math.round(r.bottom), sw: document.documentElement.scrollWidth }; })()`);
    console.log("    폰 배치", JSON.stringify(fit));
    ok(fit.acts <= fit.vh + 1 && fit.sw <= fit.vw + 1, "폰: 준비 · 시작 단추가 한 화면 안에 있고 가로로 넘치지 않음");
    /* 빠른 입장: 비밀번호 없는 대기 방으로 */
    await B.ev(click('[data-act="leave"]')); await B.until(`App.screen === "rooms"`, 8000);
    await B.ev(click('[data-rm="quick"]')); await B.until(`App.screen === "room"`, 8000, "빠른 입장");
    ok(await B.ev(`Rooms.room.lock === false && Rooms.room.members.length === 2`), "빠른 입장: 열린 대기 방으로 — " + await B.ev(`Rooms.room.title`));
    const errs = [...A.logs, ...B.logs].filter(x => /^EXC/.test(x) || /rooms\.js|online\.js/.test(x));
    ok(!errs.length, "화면 오류 없음" + (errs.length ? " — " + errs.slice(0, 5).join(" / ") : ""));
    ok(!/놓친 오류|TypeError|ReferenceError/.test(srvOut), "서버 오류 기록 없음");
  } catch (e) {
    fail++; console.log("  ✗ 시험이 멈춤:", e.message);
    try { if (A) { await A.shot("fail-A"); console.log("    A", (await A.ev(`App.screen + " " + JSON.stringify(Rooms.room && { st: Rooms.room.status, n: Rooms.room.members.length }) + " " + [...document.querySelectorAll(".toast")].map(t => t.textContent).join("|")`)), A.logs.slice(-6).join(" / ")); } if (B) { await B.shot("fail-B"); console.log("    B", (await B.ev(`App.screen + " " + JSON.stringify(Rooms.room && { st: Rooms.room.status, n: Rooms.room.members.length }) + " " + [...document.querySelectorAll(".toast")].map(t => t.textContent).join("|")`)), B.logs.slice(-6).join(" / ")); } } catch (_) {}
    console.log(srvOut.split("\n").slice(-12).join("\n"));
  }
  for (const k of kids) try { k.kill(); } catch (e) {}
  await sleep(400);
  try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) {}
  console.log(`방 화면 시험: ${pass}개 통과${fail ? ` · ${fail}개 실패` : ""} · 스크린샷 ${SHOTS}`);
  process.exit(fail ? 1 : 0);
})();

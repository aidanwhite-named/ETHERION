/* ETHERION PC 앱 (Electron) — 게임 폴더(index.html · css · js · img · audio · fonts)를 창 하나에 띄운다.
   이 파일은 tools/desktop/build_exe.py 가 게임 파일과 함께 app.asar 에 묶는다(맨 위에 이 파일 · package.json).
   - 출시용(기본): 개발자 도구 · F12 · 새로고침 · 메뉴 없음. 원격 디버깅 · --inspect 로 띄우면 바로 꺼진다.
   - 개발용(build_exe.py --dev 로 만든 것): F12 · Ctrl+Shift+I 개발자 도구, F5 · Ctrl+R 새로고침.
   - 공통: F11 · Alt+Enter 전체화면. 창 크기 · 위치 · 전체화면은 기억했다가 다음에 그대로 연다.
   - 배경음이 첫 화면부터 나오게 자동재생 제한을 끈다(ETHERION 실행.bat 의 --autoplay-policy 와 같은 일).
   - 게임 밖 주소(http · https)로 가는 링크는 이 창에서 열지 않고 기본 브라우저로 넘긴다.
   - 저장(localStorage)은 브라우저와 따로다: %APPDATA%\ETHERION (맥 ~/Library/Application Support/ETHERION). */
"use strict";
const { app, BrowserWindow, Menu, shell, screen } = require("electron");
const path = require("path");
const fs = require("fs");

const PKG = require("./package.json");
const DEV = !!PKG.etherionDev;

app.setName("ETHERION");
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

/* 출시용은 디버깅 문을 닫는다 */
if (!DEV && ["remote-debugging-port", "remote-debugging-pipe", "inspect", "inspect-brk", "js-flags"].some(s => app.commandLine.hasSwitch(s))) {
  app.exit(0);
}

/* 한 번에 하나만 (둘이 뜨면 저장을 서로 덮는다) */
if (!app.requestSingleInstanceLock()) app.exit(0);

let win = null;
const STATE = path.join(app.getPath("userData"), "window.json");
function loadState() { try { return JSON.parse(fs.readFileSync(STATE, "utf8")) || {}; } catch (e) { return {}; } }
function saveState() {
  if (!win || win.isDestroyed()) return;
  const s = { full: win.isFullScreen(), max: win.isMaximized() };
  if (!s.full && !s.max) { const b = win.getBounds(), [w, h] = win.getContentSize(); s.bounds = { x: b.x, y: b.y, width: w, height: h }; }
  else s.bounds = loadState().bounds || null;
  try { fs.writeFileSync(STATE, JSON.stringify(s)); } catch (e) { /* 못 적어도 게임은 된다 */ }
}

function create() {
  const st = loadState();
  /* 모니터를 뺐거나 바꿔서 기억한 자리가 화면 밖이면 자리는 잊는다(크기만) */
  if (st.bounds && st.bounds.x != null) {
    const b = st.bounds, on = screen.getAllDisplays().some(d => { const a = d.workArea; return b.x + 80 > a.x && b.x + 80 < a.x + a.width && b.y + 20 > a.y && b.y + 20 < a.y + a.height; });
    if (!on) { delete b.x; delete b.y; }
  }
  win = new BrowserWindow({
    width: 1600, height: 900, useContentSize: true,
    minWidth: 1024, minHeight: 640,
    ...(st.bounds || {}),
    show: false, title: "ETHERION", backgroundColor: "#07080d",
    icon: path.join(__dirname, "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      devTools: DEV,
      contextIsolation: true, nodeIntegration: false, sandbox: true,
      spellcheck: false, backgroundThrottling: false,
    },
  });
  if (st.max) win.maximize();
  if (st.full) win.setFullScreen(true);
  win.once("ready-to-show", () => win.show());
  win.on("page-title-updated", e => e.preventDefault());   // 창 제목은 늘 ETHERION
  ["resize", "move"].forEach(ev => win.on(ev, () => { clearTimeout(win._st); win._st = setTimeout(saveState, 400); }));
  win.on("close", saveState);

  const wc = win.webContents;
  /* 단축키 */
  wc.on("before-input-event", (e, i) => {
    if (i.type !== "keyDown") return;
    const k = i.key, ctrl = i.control || i.meta;
    if (k === "F11" || (i.alt && k === "Enter")) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); return; }
    if (DEV) {
      if (k === "F12" || (ctrl && i.shift && (k === "I" || k === "i"))) { wc.toggleDevTools(); e.preventDefault(); return; }
      if (k === "F5" || (ctrl && (k === "r" || k === "R"))) { wc.reloadIgnoringCache(); e.preventDefault(); return; }
    }
  });
  /* 게임 밖 주소는 기본 브라우저로 */
  const outside = url => /^https?:/i.test(url);
  wc.setWindowOpenHandler(({ url }) => { if (outside(url)) shell.openExternal(url); return { action: "deny" }; });
  wc.on("will-navigate", (e, url) => {
    if (url.startsWith("file:") && url.split(/[?#]/)[0] === wc.getURL().split(/[?#]/)[0]) return;  // 같은 화면의 #주소 바꾸기 · 새로고침
    e.preventDefault();
    if (outside(url)) shell.openExternal(url);
  });
  if (!DEV) wc.on("devtools-opened", () => wc.closeDevTools());

  win.loadFile(path.join(__dirname, "index.html"));
  win.on("closed", () => { win = null; });
}

app.on("second-instance", () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  /* 메뉴: 윈도우는 없음. 맥은 끝내기 · 붙여넣기 같은 기본 단축키가 메뉴에 달려 있어 최소한만 */
  if (process.platform === "darwin") {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { label: "ETHERION", submenu: [{ role: "hide" }, { role: "hideOthers" }, { type: "separator" }, { role: "quit" }] },
      { role: "editMenu" },
      { label: "보기", submenu: [{ role: "togglefullscreen" }] },
    ]));
  } else {
    Menu.setApplicationMenu(null);
  }
  create();
});

app.on("window-all-closed", () => app.quit());

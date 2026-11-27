/* v3.15 폰 · 태블릿 (안드로이드 앱 android/ 과 폰 브라우저)
   - 이 게임은 높이 720px 이상의 넓은 화면에 맞춰 그렸다. 폰 가로 화면(대개 높이 360~430px)에서는
     화면을 다시 짜지 않고, 레이아웃 폭을 넓혀(meta viewport width) 데스크톱 화면을 그대로 줄여 보인다.
     예) 915×412 폰 → 폭 1600 · 높이 720으로 계산하고 0.57배로 보인다.
   - 높이가 이미 맞춤 높이 이상인 태블릿 · 데스크톱은 건드리지 않는다.
   - 앱(file:///android_asset/)에서는 늘 켜고, 브라우저에서는 손가락 기기(pointer: coarse)이면서 화면이 작을 때만.
   - <html class="mobile">: css/mobile.css 의 터치용 손질(누를 때 파란 칠 · 길게 눌러 고르기 막기 등)
   - 세로로 들면 앱은 가로로 고정(AndroidManifest). 브라우저에서는 세로 화면용 기존 배치(760px 이하)를 그대로 쓴다.
   v3.20.4 글자 크기: 720으로 줄이면 0.57배라 글자가 너무 작았다. 맞춤 높이를 설정 "폰 글자 크기"로 고른다
     (Prefs "mtext" — 보통 720 = 예전 · 크게 620(기본) · 아주 크게 580). 낮을수록 덜 줄여 글자 · 단추가 커진다.
     게임 화면은 높이 640(PC 앱 최소 창)까지 맞춰 그렸고, 그 아래는 css/mobile.css 의 html.mobile 손질로 맞춘다.
     <html data-mtext="m|l|xl">: 단계별 CSS 손질에 쓴다. MobileFit.set(id)로 바로 바꾼다(js/game.js 설정 창). */
/* v3.32.3 앱식 배치(<html class="appui">): 폰 · 앱에서 만든 배치(대기실은 깃발만 · 누르면 출정 창, 덱 조정실 탭,
     시작 핸드 3+3, 얇은 전장 띠)를 PC에서도 쓴다. css/mobile.css 의 v3.32.1 이후 절은 html.appui 로 적는다.
     PC는 설정 "화면 배치"(localStorage etherion.pref.layout2: "classic" 기본(v3.32.6~) · "app" 앱식)로 고르고, 폰 · 앱은 늘 앱식이다.
     html.mobile 은 폰의 화면 줄임 · 글자 키움 · 터치 손질에만 쓴다. */
(function () {
  const root = document.documentElement;
  /* v3.32.6 PC 기본을 예전 배치로 되돌렸다. 저장 키도 새로(layout2): 전에 앱식을 골라 둔 PC도 한 번은 예전 배치로 열린다 */
  const KEY = "etherion.pref.layout2";
  /* 2026-11-27 아이패드(손가락으로 쓰는 큰 화면): 고른 적이 없으면 앱식이 기본 — PC 배치는 대기실이 아주 길게 늘어나 굴려야 한다(1024×768에서 8700px).
     설정 "화면 배치"에서 PC 배치를 고르면 그것을 따른다 */
  const IPAD = (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || /iPad/.test(navigator.userAgent);
  const read = () => { try { const v = JSON.parse(localStorage.getItem(KEY)); return v === "app" || (v == null && IPAD) ? "app" : "classic"; } catch (e) { return IPAD ? "app" : "classic"; } };
  window.AppUI = {
    get on() { return root.classList.contains("appui"); },
    get pref() { return read(); },
    set(v) {
      v = v === "classic" ? "classic" : "app";
      try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
      root.classList.toggle("appui", v === "app" || root.classList.contains("mobile"));
    }
  };
  if (read() === "app") root.classList.add("appui");
})();
(function () {
  /* 2026-11-27 아이폰 · 아이패드: iOS 앱(ios/, WKWebView)은 문서가 열리기 전에 window.ETHERION_SHELL = "ios" 를 넣는다 → 안드로이드 앱과 같이 다룬다.
     아이패드 사파리는 맥인 척하므로(MacIntel) 손가락 수로 가린다. 홈 화면에서 연 웹 앱(standalone)은 주소창이 없다 */
  const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const SHELL = window.ETHERION_SHELL === "ios";
  const STANDALONE = navigator.standalone === true || !!(window.matchMedia && matchMedia("(display-mode: standalone), (display-mode: fullscreen)").matches);
  const APP = (location.protocol === "file:" && location.pathname.indexOf("/android_asset/") === 0) || SHELL;
  if (IOS) document.documentElement.classList.add("ios");
  if (STANDALONE) document.documentElement.classList.add("standalone");
  const coarse = !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);
  const small = Math.min(screen.width, screen.height) < 720;
  if (!APP && !(coarse && small)) return;
  document.documentElement.classList.add("appui");   /* 폰 · 앱은 늘 앱식 배치 */
  const LEVELS = { m: 720, l: 620, xl: 580 };   /* 이 높이(CSS px)가 되도록 줄인다 */
  const pref = () => { try { const v = JSON.parse(localStorage.getItem("etherion.pref.mtext")); return LEVELS[v] ? v : "l"; } catch (e) { return "l"; } };
  let lv = pref();
  const root = document.documentElement;
  root.classList.add("mobile", "fx-lite", "fx-low");   /* 폰 · 앱은 늘 연출 저사양(js/impact.js applyFx) — 첫 화면부터 가벼운 CSS(css/mobile-lite.css)가 걸리게 여기서 붙인다 */
  if (APP) root.classList.add("app");
  root.dataset.mtext = lv;
  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "viewport"; document.head.appendChild(meta); }
  let last = "";
  function fit() {
    const a = screen.width, b = screen.height, H0 = LEVELS[lv];
    const land = APP || (window.matchMedia ? matchMedia("(orientation: landscape)").matches : a > b);
    const W = land ? Math.max(a, b) : Math.min(a, b);
    let H = land ? Math.min(a, b) : Math.max(a, b);
    /* 아이폰 사파리(앱 · 홈 화면 웹 앱 말고): 가로로 들어도 위에 주소창이 남아 보이는 높이가 화면보다 작다(390 → 약 340).
       screen 높이로 줄이면 아래가 잘리니, 보이는 칸의 가로세로 비(배율과 상관없음)로 실제 높이를 잰다 */
    if (IOS && !APP && !STANDALONE && land && innerWidth > 0 && innerHeight > 0) H = Math.min(H, Math.round(W * innerHeight / innerWidth));
    const content = land && H < H0
      ? "width=" + Math.round(W * H0 / H) + ", user-scalable=no, viewport-fit=cover"
      : "width=device-width, initial-scale=1, viewport-fit=cover";
    if (content === last) return;
    last = content; meta.setAttribute("content", content);
  }
  fit();
  addEventListener("orientationchange", () => setTimeout(fit, 120));
  addEventListener("resize", fit);
  /* 2026-11-25 세로로 든 폰: 대기실 · 전장 · 덱 조정실 …은 가로 화면에 맞춘 앱식 배치라 세로에서는 깨진다(깃발 칸 폭 17px, 준비 완료가 화면 밖).
     첫 화면 · 로그인은 세로에서도 멀쩡하니 그대로 두고, 그 밖의 화면에서는 "가로로 돌려 주세요" 안내로 덮는다(css/mobile.css .rotate-ask).
     어느 화면인지는 #app 바로 아래 칸이 바뀔 때만 본다(<html class="rot-free"> = 세로에서도 쓰는 화면). 앱은 가로로 고정이라 뜨지 않는다 */
  function rotateAsk() {
    const app = document.getElementById("app"); if (!app || !document.body) return;
    const ask = document.createElement("div");
    ask.className = "rotate-ask"; ask.setAttribute("role", "alert");
    ask.innerHTML = '<div class="ra-in"><svg class="ra-ico" viewBox="0 0 64 64" aria-hidden="true"><rect class="ra-ph" x="22" y="8" width="20" height="36" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 50a22 22 0 0 0 40 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M52 50l1.5-8M52 50l-8-1" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg><b>폰을 가로로 돌려 주세요</b><span>ETHERION의 대기실과 전장은 가로 화면에 맞춰져 있습니다.<br>화면 회전 잠금이 켜져 있으면 풀어 주세요.</span></div>';
    document.body.appendChild(ask);
    const sync = () => root.classList.toggle("rot-free", !!app.querySelector(":scope > .screen-title, :scope > .screen-login") || !app.firstElementChild);
    new MutationObserver(sync).observe(app, { childList: true });
    sync();
  }
  if (document.body && document.getElementById("app")) rotateAsk(); else addEventListener("DOMContentLoaded", rotateAsk);
  /* 2026-11-27 (사용자) 폰 브라우저: 접속하면 가로로 — 웹페이지는 폰을 마음대로 돌릴 수 없고, 전체 화면일 때만 방향을 고정할 수 있다(안드로이드 크롬).
     그래서 첫 터치(브라우저가 사용자 동작일 때만 허락) 때 전체 화면 + 가로 고정을 해 본다. 아이폰 사파리는 이 기능이 없어 조용히 넘어가고 "가로로 돌려 주세요" 안내가 그대로 뜬다.
     사용자가 뒤로 가기로 전체 화면을 나가면 다시 조르지 않는다 — 돌려 달라는 안내를 누를 때만 다시 해 본다. 앱은 원래 가로 고정이라 하지 않는다 */
  /* iOS(아이폰 · 아이패드 사파리)는 문서 전체 화면 · 방향 고정이 없거나(아이폰) 반쪽이라(아이패드: 전체 화면은 되나 방향 고정은 안 됨) 아예 하지 않는다 —
     세로면 "가로로 돌려 주세요" 안내가 맡는다. 홈 화면 웹 앱도 이미 주소창이 없으니 하지 않는다 */
  if (!APP && !IOS && !STANDALONE) {
    const el = root, so = screen.orientation;
    const can = !!(el.requestFullscreen && so && typeof so.lock === "function");
    let left = false;   // 사용자가 전체 화면을 스스로 나갔다
    const go = () => {
      if (!can || document.fullscreenElement) return;
      let p; try { p = el.requestFullscreen({ navigationUI: "hide" }); } catch (e) { return; }
      if (p && p.then) p.then(() => { try { const q = so.lock("landscape"); if (q && q.catch) q.catch(() => {}); } catch (e) {} }).catch(() => {});
    };
    addEventListener("click", e => { const ask = e.target && e.target.closest && e.target.closest(".rotate-ask"); if (ask) left = false; if (!left) go(); }, true);
    document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) left = true; setTimeout(fit, 120); });
  }
  window.MobileFit = {
    LEVELS, get level() { return lv; },
    set(id) {
      if (!LEVELS[id]) return;
      lv = id; root.dataset.mtext = id;
      try { localStorage.setItem("etherion.pref.mtext", JSON.stringify(id)); } catch (e) {}
      fit(); setTimeout(() => dispatchEvent(new Event("resize")), 60);
    }
  };
})();

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
(function () {
  const APP = location.protocol === "file:" && location.pathname.indexOf("/android_asset/") === 0;
  const coarse = !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);
  const small = Math.min(screen.width, screen.height) < 720;
  if (!APP && !(coarse && small)) return;
  const LEVELS = { m: 720, l: 620, xl: 580 };   /* 이 높이(CSS px)가 되도록 줄인다 */
  const pref = () => { try { const v = JSON.parse(localStorage.getItem("etherion.pref.mtext")); return LEVELS[v] ? v : "l"; } catch (e) { return "l"; } };
  let lv = pref();
  const root = document.documentElement;
  root.classList.add("mobile");
  if (APP) root.classList.add("app");
  root.dataset.mtext = lv;
  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "viewport"; document.head.appendChild(meta); }
  let last = "";
  function fit() {
    const a = screen.width, b = screen.height, H0 = LEVELS[lv];
    const land = APP || (window.matchMedia ? matchMedia("(orientation: landscape)").matches : a > b);
    const W = land ? Math.max(a, b) : Math.min(a, b), H = land ? Math.min(a, b) : Math.max(a, b);
    const content = land && H < H0
      ? "width=" + Math.round(W * H0 / H) + ", user-scalable=no, viewport-fit=cover"
      : "width=device-width, initial-scale=1, viewport-fit=cover";
    if (content === last) return;
    last = content; meta.setAttribute("content", content);
  }
  fit();
  addEventListener("orientationchange", () => setTimeout(fit, 120));
  addEventListener("resize", fit);
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

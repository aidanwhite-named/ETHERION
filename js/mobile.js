/* v3.15 폰 · 태블릿 (안드로이드 앱 android/ 과 폰 브라우저)
   - 이 게임은 높이 720px 이상의 넓은 화면에 맞춰 그렸다. 폰 가로 화면(대개 높이 360~430px)에서는
     화면을 다시 짜지 않고, 레이아웃 폭을 넓혀(meta viewport width) 데스크톱 화면을 그대로 줄여 보인다.
     예) 915×412 폰 → 폭 1600 · 높이 720으로 계산하고 0.57배로 보인다.
   - 높이가 이미 720 이상인 태블릿 · 데스크톱은 건드리지 않는다.
   - 앱(file:///android_asset/)에서는 늘 켜고, 브라우저에서는 손가락 기기(pointer: coarse)이면서 화면이 작을 때만.
   - <html class="mobile">: css/mobile.css 의 터치용 손질(누를 때 파란 칠 · 길게 눌러 고르기 막기 등)
   - 세로로 들면 앱은 가로로 고정(AndroidManifest). 브라우저에서는 세로 화면용 기존 배치(760px 이하)를 그대로 쓴다. */
(function () {
  const APP = location.protocol === "file:" && location.pathname.indexOf("/android_asset/") === 0;
  const coarse = !!(window.matchMedia && matchMedia("(pointer: coarse)").matches);
  const small = Math.min(screen.width, screen.height) < 720;
  if (!APP && !(coarse && small)) return;
  const H0 = 720;   /* 이 높이(CSS px)가 되도록 줄인다 */
  const root = document.documentElement;
  root.classList.add("mobile");
  if (APP) root.classList.add("app");
  let meta = document.querySelector('meta[name="viewport"]');
  if (!meta) { meta = document.createElement("meta"); meta.name = "viewport"; document.head.appendChild(meta); }
  let last = "";
  function fit() {
    const a = screen.width, b = screen.height;
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
})();

/* ETHERION — 메뉴와 카드의 3D 움직임 (css/depth.css와 짝, docs/STYLE_GUIDE.md 2.10)
   - 양옆 패널은 바깥쪽이 앞으로 나온 세 폭 병풍. 어느 패널이 옆인지는 화면 위치로 저절로 정한다(새 화면도 그대로 된다).
   - 마우스를 따라 패널이 살짝 돌고, 마우스 밑 카드는 기울며 빛이 따라온다.
   - 상점(v3.5.2) · 대기실 · 덱 조정실(v3.5.3)의 패널은 기울이지 않는다(카드 목록이 기울거나 밀려 보였다).
   - 대기실 덱 보기의 카드는 마우스 밑에서도 기울지 않는다(v3.7.4).
   - 패널은 transform만 바꾼다(글자 다시 그리기 없음). 움직임이 멎으면 계산도 멈춘다. */
"use strict";

const Depth = (() => {
  const PANELS = ".vault-preview,.users,.xp-head,.xp-route,.xp-card,.gate";
  const SIDE_DEG = 3.2, FOLLOW_DEG = 1.8, CARD_DEG = 13, CARD_LIFT = 26, NARROW = 900;
  const reduced = () => !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const off = () => innerWidth <= NARROW || document.documentElement.classList.contains("mobile");   // v3.46 폰 · 앱은 기울이기 없음
  let mx = 0, my = 0, tx = 0, ty = 0, raf = 0, frame = null, glare = null;
  const info = new WeakMap();

  /* 패널 자리 나누기: -1 왼쪽 · 0 가운데 · 1 오른쪽 */
  function classify(el) {
    let d = info.get(el);
    if (d && d.vw === innerWidth) return d;
    const r = el.getBoundingClientRect(), w = innerWidth, cx = (r.left + r.right) / 2, narrow = r.width < w * .42;
    d = { vw: w, side: narrow && cx < w * .4 ? -1 : narrow && cx > w * .6 ? 1 : 0, tall: r.height > innerHeight * 1.15 };
    el.style.transformOrigin = d.side < 0 ? "100% 50%" : d.side > 0 ? "0% 50%" : "50% 50%";
    info.set(el, d);
    return d;
  }
  function applyPanels() {
    const list = document.querySelectorAll(PANELS);
    if (off()) { list.forEach(el => { el.style.transform = ""; el.style.transformOrigin = ""; info.delete(el); }); return; }
    list.forEach(el => {
      const { side, tall } = classify(el), k = tall ? .22 : 1;   /* 긴 패널은 조금만: 위아래 끝이 크게 휘지 않게 */
      const ry = -side * SIDE_DEG + mx * FOLLOW_DEG * k, rx = -my * FOLLOW_DEG * .8 * k;
      el.style.transform = `perspective(1700px) translate3d(${(-mx * 7).toFixed(2)}px,${(-my * 4).toFixed(2)}px,0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
    });
    const logo = document.querySelector(".screen-title:not(.awaken):not(.has-art) .t-center"), ring = document.querySelector(".screen-title:not(.awaken) .t-ring");
    if (logo) logo.style.transform = `rotateX(${(-my * 5).toFixed(2)}deg) rotateY(${(mx * 7).toFixed(2)}deg) translateZ(40px)`;
    if (ring) ring.style.transform = `translate(-50%,-50%) rotateX(${(16 - my * 8).toFixed(2)}deg) rotateY(${(mx * 10).toFixed(2)}deg)`;
  }
  function tick() {
    raf = 0;
    mx += (tx - mx) * .12; my += (ty - my) * .12;
    applyPanels();
    if (Math.abs(tx - mx) + Math.abs(ty - my) > .002) raf = requestAnimationFrame(tick);
  }
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

  /* 마우스 밑 카드 */
  function release() {
    if (!frame) return;
    const f = frame; frame = null;
    f.classList.remove("d3-tilt"); f.classList.add("d3-back"); f.style.transform = "";
    if (glare) { glare.remove(); glare = null; }
    setTimeout(() => f.classList.remove("d3-back"), 340);
  }
  function tiltCard(e) {
    if (document.body.classList.contains("is-dragging")) { release(); return; }
    const card = e.target.closest && e.target.closest(".card");
    const f = card && !card.matches(".item-front,.dying,.c-under .card,.deck-view .card") && !card.closest(".hand-card.dragging") ? card.querySelector(":scope > .c-frame") : null;
    if (f !== frame) {
      release();
      if (f) { frame = f; f.classList.remove("d3-back"); f.classList.add("d3-tilt"); glare = document.createElement("i"); glare.className = "d3-glare"; f.appendChild(glare); }
    }
    if (!frame) return;
    const r = card.getBoundingClientRect(), x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    frame.style.transform = `perspective(calc(var(--cw, 150px) * 5 + 300px)) translateZ(${CARD_LIFT}px) rotateX(${((.5 - y) * CARD_DEG).toFixed(2)}deg) rotateY(${((x - .5) * CARD_DEG).toFixed(2)}deg)`;
    glare.style.setProperty("--gx", (x * 100).toFixed(1) + "%"); glare.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
  }

  return {
    init() {
      const app = document.getElementById("app");
      new MutationObserver(wake).observe(app, { childList: true });
      addEventListener("resize", wake);
      wake();
      if (reduced()) return;
      addEventListener("pointermove", e => {
        if (e.pointerType === "touch") return;
        tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; wake();
        tiltCard(e);
      }, { passive: true });
      document.addEventListener("pointerleave", release);
      addEventListener("blur", release);
    }
  };
})();
document.addEventListener("DOMContentLoaded", () => Depth.init());

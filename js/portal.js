/* ETHERION — 이세계 입장 연출 (타이틀 → 입장/대기실)
   누르면: 고리의 일곱 자리에 불이 붙고 → 글자가 타며 가운데로 빨려 들고 → 고리 가운데 소용돌이 문이 열려
   그 안으로 들어간다(별이 뒤로 흐름) → 금빛 섬광 → 다음 화면이 어둠에서 떠오른다.
   - 그림은 캔버스(#portal 안), 소리는 파일 없이 WebAudio 합성(효과음 설정을 따른다)
   - 연출 중 다시 누르거나 Enter/Space/Esc를 누르면 건너뛴다
   - 움직임 줄이기 설정이면 짧은 어둠 전환만 한다
   시간 값은 PORTAL_T 한곳에 있다 (ms) */
"use strict";

const PORTAL_T = {
  ignite: 0,      // 자리에 불 붙기 시작
  open: 450,      // 문이 열리기 시작
  hold: 1500,     // 문이 다 열려 소용돌이 (이때부터 빨려 듦)
  flash: 2500,    // 섬광
  dark: 2850,     // 완전한 어둠 — 이때 다음 화면으로 바꾼다
  words: 3000,    // 어둠 속 먼 범종 (글귀는 v1.4.8에서 뺐다)
  reveal: 3250,   // 다음 화면이 떠오르기 시작
  end: 4350
};

const Portal = {
  busy: false,

  enter(next, center) {
    if (this.busy) return;
    this.busy = true;
    const reduced = (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) || document.documentElement.classList.contains("mobile");   // v3.46 폰 · 앱은 캔버스 연출 없이 어둠 전환만
    const el = document.createElement("div");
    el.id = "portal";
    el.innerHTML = `<canvas aria-hidden="true"></canvas><div class="pt-veil"></div>`;
    document.body.appendChild(el);
    const cv = el.querySelector("canvas"), ctx = cv.getContext("2d"), veil = el.querySelector(".pt-veil");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = innerWidth, H = innerHeight;
    const size = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size(); addEventListener("resize", size);
    const cx = () => (center ? center.x : W / 2), cy = () => (center ? center.y : H * 0.46);

    let swapped = false, t0 = performance.now(), skipAt = 0, raf = 0;
    const swap = () => { if (swapped) return; swapped = true; try { next(); } catch (e) { console.error(e); } };
    let onKey = null;   // v3.46.1 아래(움직임 있는 길)에서 정한다 — 움직임 줄이기 · 폰 길의 finish가 선언 전 const를 건드려 멈추던 것(캔버스가 화면을 덮음)
    const finish = () => {
      cancelAnimationFrame(raf); removeEventListener("resize", size); if (onKey) removeEventListener("keydown", onKey, true);
      if (typeof Bg !== "undefined") { Bg.warp = 0; Bg.pull = 0; }
      el.remove(); this.busy = false;
    };

    /* 움직임 줄이기: 어둠으로 닫았다가 연다 */
    if (reduced) {
      veil.style.background = "#000"; veil.style.transition = "opacity .35s"; veil.style.opacity = 0;
      requestAnimationFrame(() => { veil.style.opacity = 1; });
      setTimeout(() => { swap(); veil.style.transition = "opacity .6s"; veil.style.opacity = 0; }, 400);
      setTimeout(finish, 1100);
      return;
    }

    this.sound();
    /* 건너뛰기: 아직 어둠 전이면 바로 어둠으로, 이미 어둠이면 바로 떠오르기로 */
    const skip = () => { const t = performance.now() - t0; if (t < PORTAL_T.dark - 200) { skipAt = t; t0 -= (PORTAL_T.dark - 200 - t); } else if (t < PORTAL_T.reveal) t0 -= (PORTAL_T.reveal - t); };
    onKey = e => { if (["Enter", " ", "Escape"].includes(e.key)) { e.preventDefault(); e.stopPropagation(); skip(); } };
    addEventListener("keydown", onKey, true);
    el.addEventListener("pointerdown", skip);

    /* 소용돌이 입자 */
    const hues = ["246,206,120", "255,236,190", "165,122,230", "143,220,255", "255,150,80"];
    const parts = Array.from({ length: 520 }, () => ({ a: Math.random() * 6.283, d: Math.random() * 1.3 + 0.05, v: Math.random() * 0.35 + 0.18, w: Math.random() * 0.8 + 0.6, s: Math.random() * 1.8 + 0.5, c: hues[Math.random() < 0.55 ? 0 : (Math.random() * hues.length) | 0], al: Math.random() * 0.6 + 0.35 }));
    const ease = (x, p) => Math.pow(Math.min(1, Math.max(0, x)), p);
    const sm = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
    let last = performance.now();

    const frame = now => {
      const T = now - t0, dt = Math.min(0.05, (now - last) / 1000); last = now;
      const X = cx(), Y = cy(), base = Math.min(W, H), diag = Math.hypot(W, H);
      const P = PORTAL_T;

      /* 문의 반지름: 작게 열려 소용돌이 → 화면 너머로 커짐 */
      const open = sm((T - P.open) / (P.hold - P.open));
      const rush = ease((T - P.hold) / (P.flash - P.hold), 2.2);
      const R = base * 0.2 * open + diag * 0.9 * rush;
      const spin = 1 + rush * 5;

      /* 배경 별·에테르 입자: 문으로 빨려 들고, 별은 뒤로 흐른다 */
      if (typeof Bg !== "undefined") { Bg.pull = sm((T - 200) / 900); Bg.warp = ease((T - P.open) / (P.flash - P.open), 1.6); Bg.cx = X; Bg.cy = Y; }

      ctx.clearRect(0, 0, W, H);
      if (T > P.open - 50 && T < P.dark + 100 && R > 1) {
        ctx.globalCompositeOperation = "lighter";
        /* 바깥 빛무리 */
        let g = ctx.createRadialGradient(X, Y, 0, X, Y, R * 1.9);
        g.addColorStop(0, `rgba(255,244,214,${0.55 * open})`);
        g.addColorStop(0.28, `rgba(246,206,120,${0.32 * open})`);
        g.addColorStop(0.55, `rgba(150,110,230,${0.2 * open})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(X, Y, R * 1.9, 0, 6.283); ctx.fill();
        /* 소용돌이 팔 */
        ctx.lineCap = "round";
        for (const p of parts) {
          p.a += p.w * dt * spin * (1.2 + 1.4 / (p.d + 0.25));
          p.d -= p.v * dt * (0.6 + rush * 3);
          if (p.d < 0.04) { p.d = 1.1 + Math.random() * 0.3; p.a = Math.random() * 6.283; }
          const r1 = p.d * R, tail = Math.min(1.2, 0.25 + 0.5 / (p.d + 0.3)) * (0.6 + rush);
          const fade = Math.min(1, (1.4 - p.d) * 1.5) * open;
          ctx.strokeStyle = `rgba(${p.c},${p.al * fade})`;
          ctx.lineWidth = p.s * (0.5 + p.d * 0.9);
          ctx.beginPath(); ctx.arc(X, Y, Math.max(0.5, r1), p.a - tail, p.a); ctx.stroke();
        }
        /* 테두리: 돌아가는 룬 눈금 */
        const ticks = 64, rot = T / 900 * spin;
        ctx.strokeStyle = `rgba(246,226,168,${0.55 * open * (1 - rush * 0.6)})`; ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < ticks; i++) {
          const a = rot + i / ticks * 6.283, l = i % 8 === 0 ? 0.14 : i % 2 ? 0.04 : 0.08;
          ctx.moveTo(X + Math.cos(a) * R * 1.02, Y + Math.sin(a) * R * 1.02);
          ctx.lineTo(X + Math.cos(a) * R * (1.02 + l), Y + Math.sin(a) * R * (1.02 + l));
        }
        ctx.stroke();
        ctx.strokeStyle = `rgba(255,236,190,${0.5 * open})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(X, Y, R, 0, 6.283); ctx.stroke();
        /* 가운데 눈: 뜨거운 금빛 */
        g = ctx.createRadialGradient(X, Y, 0, X, Y, R * 0.55);
        g.addColorStop(0, `rgba(255,252,240,${0.95 * open})`);
        g.addColorStop(0.4, `rgba(255,224,160,${0.6 * open})`);
        g.addColorStop(1, "rgba(255,200,120,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(X, Y, R * 0.55, 0, 6.283); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      /* 장막: 섬광(금빛 흰색) → 어둠 → 다음 화면이 어둠에서 떠오름 */
      const fl = sm((T - (P.flash - 260)) / 260), toDark = sm((T - P.flash) / (P.dark - P.flash));
      const up = sm((T - P.reveal) / (P.end - P.reveal));
      if (T < P.dark) {
        veil.style.background = `rgb(${Math.round(255 * (1 - toDark))},${Math.round(244 * (1 - toDark))},${Math.round(214 * (1 - toDark))})`;
        veil.style.opacity = Math.max(fl, toDark).toFixed(3);
      } else {
        swap();
        veil.style.background = "#000";
        veil.style.opacity = (1 - up).toFixed(3);
        el.style.pointerEvents = up > 0.4 ? "none" : "";
      }
      if (T >= P.end) { finish(); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  },

  /* 기존 WebAudio 합성 효과음 제거됨 */
  sound() {}
};

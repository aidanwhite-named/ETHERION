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
    const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const finish = () => {
      cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("keydown", onKey, true);
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
    const onKey = e => { if (["Enter", " ", "Escape"].includes(e.key)) { e.preventDefault(); e.stopPropagation(); skip(); } };
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

  /* 소리 (v1.4.2): 낮고 은은한 범종 한 번과 다섯도 울림 → 아래로 가라앉으며 빨려 드는 저음과 깊은 바람 → 섬광의 묵직한 쿵.
     모두 긴 잔향(합성한 공간 울림)을 지나 나온다. 높은 딩동 화음·톱니파 저음(오토바이처럼 들림)은 뺐다 */
  sound() {
    if (typeof FEEL === "undefined") return;
    const lv = FEEL.vol[FEEL.level]; if (!lv) return;
    const ac = FEEL.ctx(); if (!ac) return;
    FEEL.mark();   // v3.7.2 시작 단추의 메뉴 소리와 겹치지 않게
    const t = ac.currentTime + 0.03, P = PORTAL_T, at = ms => t + ms / 1000;
    const noiseBuf = sec => { const n = Math.floor(ac.sampleRate * sec), b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; };
    const osc = (type, f, start, stop) => { const o = ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, start); o.start(start); o.stop(stop); return o; };
    /* 천천히 차오르고 천천히 사라지는 소리 모양 (딱 끊기는 소리가 없게) */
    const swell = (g, a, peak, rise, hold, rel) => { g.gain.setValueAtTime(0.0001, a); g.gain.exponentialRampToValueAtTime(peak, a + rise); g.gain.setValueAtTime(peak, a + rise + hold); g.gain.exponentialRampToValueAtTime(0.0001, a + rise + hold + rel); };

    /* 공간: 마른 소리(dry) + 큰 석조 전당 같은 잔향(wet, 4.5초) */
    const master = ac.createGain(); master.gain.value = 0.9 * lv;
    const warm = ac.createBiquadFilter(); warm.type = "lowpass"; warm.frequency.value = 2400; warm.Q.value = 0.5;   // 날카로운 고음을 깎는다
    master.connect(warm).connect(ac.destination);
    const dry = ac.createGain(); dry.gain.value = 0.55; dry.connect(master);
    const rev = ac.createConvolver();
    const len = Math.floor(ac.sampleRate * 4.5), ir = ac.createBuffer(2, len, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) { const x = i / len; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - x, 2.6) * (i < 400 ? i / 400 : 1); } }
    rev.buffer = ir;
    const wet = ac.createGain(); wet.gain.value = 0.75; rev.connect(wet).connect(master);
    const send = node => { node.connect(dry); node.connect(rev); };

    /* 1. 범종: 아주 낮은 바탕음(D1 ≈ 55Hz)과 어긋난 배음, 부드러운 타격(나무 당목). 길게 웅- 하고 맥놀이한다 */
    const bell = ac.createGain(); send(bell);
    const F = 55;
    [[F, 0.34, 6.5, 0], [F * 1.003, 0.2, 6.0, 0], [F * 2.0, 0.16, 5.0, 0.3], [F * 2.76, 0.07, 3.6, 0], [F * 3.98, 0.045, 2.8, 0], [F * 5.2, 0.022, 1.8, 0]].forEach(([f, v, d, vib]) => {
      const o = osc("sine", f, t, t + d + 0.2), g = ac.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.07); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      if (vib) { const l = osc("sine", 0.9, t, t + d); const lg = ac.createGain(); lg.gain.value = vib; l.connect(lg).connect(o.frequency); }
      o.connect(g).connect(bell);
    });
    // 당목이 닿는 둔탁한 첫소리 (아주 낮게 거른 잡음)
    const hit = ac.createBufferSource(); hit.buffer = noiseBuf(0.5);
    const hl = ac.createBiquadFilter(); hl.type = "lowpass"; hl.frequency.value = 260;
    const hg = ac.createGain(); swell(hg, t, 0.22, 0.012, 0.01, 0.35);
    hit.connect(hl).connect(hg).connect(bell); hit.start(t); hit.stop(t + 0.5);

    /* 2. 다섯도 울림: 문이 열릴 때 낮은 D–A–D가 천천히 차오른다 (오르간·합창 같은 바탕) */
    const pad = ac.createBiquadFilter(); pad.type = "lowpass"; pad.frequency.setValueAtTime(320, at(P.open)); pad.frequency.exponentialRampToValueAtTime(700, at(P.hold)); pad.Q.value = 0.4;
    const padG = ac.createGain(); swell(padG, at(P.open), 0.16, (P.hold - P.open) / 1000, (P.flash - P.hold) / 1000 - 0.1, 0.5);
    pad.connect(padG); send(padG);
    [73.4, 110, 146.8, 73.4 * 1.004, 110 * 0.997].forEach(f => { const o = osc("triangle", f, at(P.open), at(P.flash + 600)); o.connect(pad); });

    /* 3. 빨려 듦: 아래로 가라앉는 깊은 저음 (사인 둘, 맥놀이) + 낮게 거른 바람 소리가 무겁게 차오른다 */
    const sub = ac.createGain(); swell(sub, at(P.hold - 300), 0.42, (P.flash - P.hold + 300) / 1000 - 0.05, 0.04, 0.35); send(sub);
    [[49, 31], [49.6, 31.3], [98, 62]].forEach(([f0, f1], k) => {
      const o = osc("sine", f0, at(P.hold - 300), at(P.flash + 600)); o.frequency.exponentialRampToValueAtTime(f1, at(P.flash));
      const g = ac.createGain(); g.gain.value = k === 2 ? 0.35 : 1; o.connect(g).connect(sub);
    });
    const wind = ac.createBufferSource(); wind.buffer = noiseBuf(3.5);
    const wl = ac.createBiquadFilter(); wl.type = "lowpass"; wl.Q.value = 2.5;
    wl.frequency.setValueAtTime(140, at(P.open)); wl.frequency.exponentialRampToValueAtTime(520, at(P.flash - 150)); wl.frequency.exponentialRampToValueAtTime(90, at(P.flash + 300));
    const wg = ac.createGain(); swell(wg, at(P.open), 0.32, (P.flash - P.open) / 1000 - 0.15, 0.1, 0.5);
    // 바람이 소용돌이처럼 천천히 일렁인다
    const wob = osc("sine", 0.45, at(P.open), at(P.flash + 600)); const wobG = ac.createGain(); wobG.gain.value = 0.08; wob.connect(wobG).connect(wg.gain);
    wind.connect(wl).connect(wg); send(wg); wind.start(at(P.open)); wind.stop(at(P.flash + 600));

    /* 4. 섬광의 쿵: 아주 낮은 북처럼 떨어지는 사인 + 묵직한 저역 잡음. 잔향이 길게 남는다 */
    const boom = ac.createGain(); send(boom);
    const b = osc("sine", 62, at(P.flash), at(P.flash + 2.6)); b.frequency.exponentialRampToValueAtTime(24, at(P.flash + 1.8));
    const bg = ac.createGain(); swell(bg, at(P.flash), 0.7, 0.025, 0.08, 2.0); b.connect(bg).connect(boom);
    const nb = ac.createBufferSource(); nb.buffer = noiseBuf(1.6);
    const nl = ac.createBiquadFilter(); nl.type = "lowpass"; nl.frequency.setValueAtTime(380, at(P.flash)); nl.frequency.exponentialRampToValueAtTime(60, at(P.flash + 1.2));
    const nbg = ac.createGain(); swell(nbg, at(P.flash), 0.32, 0.02, 0.03, 1.1);
    nb.connect(nl).connect(nbg).connect(boom); nb.start(at(P.flash)); nb.stop(at(P.flash + 1.6));
    // 쿵 뒤로 아주 낮은 범종 울림 한 번 더 (멀리서)
    [[F, 0.12, 4], [F * 2, 0.05, 3]].forEach(([f, v, d]) => {
      const s = at(P.words), o = osc("sine", f, s, s + d + 0.2), g = ac.createGain(); swell(g, s, v, 0.4, 0.2, d); o.connect(g).connect(bell);
    });
  }
};

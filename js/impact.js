/* ETHERION — 타격감 (v3.14)
   공격 · 반격 · 투척 · 마법 · 막기 · 부서짐 · 착지가 "맞는 순간"을 한곳에서 꾸민다. 판의 결과는 건드리지 않는다(연출만, Math.random 써도 됨).
   맞는 순간 한 번에 겹치는 것:
     1) 히트 스톱  — 세기만큼(55~210ms) 공격한 캐릭터가 맞은 자리에 붙어 멈춘다 (js/game.js strikeHit가 stopMs를 받아 쓴다)
     2) 흰 번쩍임  — 맞은 카드가 하얗게 한 번 타오른다 (filter, composite add)
     3) 밀려남     — 맞은 카드가 친 방향으로 밀렸다가 탄력 있게 돌아온다 (translate, composite add: 기존 흔들림과 더해진다)
     4) 충격파     — 캔버스 한 장에 고리 · 불꽃 줄기 · 파편 · 불티 (가산 합성)
     5) 화면 흔들림 — 트라우마 방식: 쌓였다 줄어들고, 친 방향으로 먼저 튄다. 작은 기울기 포함
     6) 임팩트 프레임 — 쓰러뜨림 · 치명 · 생명 타격은 한두 프레임 화면이 고대비 흑백으로 번쩍 (backdrop-filter)
     7) 소리       — js/feel.js imp_* (밑바닥 킥 + 왜곡된 몸통 + 부서지는 결), 배경음은 잠깐 눌러 준다(BGM.duck)
   세기 p(0~1.6) = 피해 / 6 (최소 0.2) + 쓰러뜨림 0.35 + 치명 0.3 + 생명 0.3. 숫자는 이 파일 위쪽 TUNE에서 고친다.
   움직임 줄이기 설정 · 배속 0 · 화면 없는 대전이면 아무것도 하지 않는다
   v3.16.1 폰(<html class="mobile">, js/mobile.js)에서는 가볍게: 캔버스 해상도 1배 · 불티는 미리 그린 그림 찍기 ·
   카드 번쩍임에 drop-shadow 없음 · 화면 기울기와 판 눌림 없음. 화면 덮개의 가벼운 모양은 css/mobile.css. PC는 그대로 */
"use strict";

/* v3.17 연출 가볍게/화려하게 (설정 창). 가볍게(기본)면 <html class="fx-lite"> — 폰과 같은 가벼운 방식 + 큰 흐림 · 그림자 필터를 뺀다.
   css/impact.css 'fx-lite' 절, js/game.js arenaArt · trail · shatterCard, js/titans.js 와 짝 */
function applyFx(v) {
  v = v || (typeof Prefs !== "undefined" ? Prefs.get("fx", "lite") : "lite");
  document.documentElement.classList.toggle("fx-lite", v !== "rich");
}
applyFx();

const IMPACT = (() => {
  const TUNE = {
    stopMin: 55, stopMax: 170, stopKill: 40,  // 히트 스톱 ms (배속을 따른다)
    knock: 26,                               // 밀려나는 최대 거리 px
    shake: 26,                               // 화면 흔들림 최대 px (트라우마 1)
    tilt: 1.4,                               // 화면 기울기 최대 도
    duck: 0.55,                              // 배경음을 누르는 깊이 (0~1)
    screenMove: false,                       // v3.16.3 화면 전체 흔들림 · 판 눌림 (끔)
    killFlash: false                         // v3.16.5 부서질 때 화면 전체 번쩍임(흑백 임팩트 프레임 · 밝은 빛) (끔)
  };
  const live = () => typeof G !== "undefined" && G && G.cfg && !G.cfg.headless && G.speed !== 0;
  const RMx = () => typeof RM === "function" ? RM() : !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const on = () => live() && !RMx();
  const lite = () => { const c = document.documentElement.classList; return c.contains("mobile") || c.contains("fx-lite"); };   // v3.16.1 폰 · 안드로이드 앱, v3.17 설정 '연출: 가볍게'(기본)
  const K = () => (typeof kSpeed === "function" ? Math.max(0.35, kSpeed()) : 1);
  const layer = () => document.getElementById("fx-layer");
  const ctr = r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const snd = (n, v) => { if (typeof FEEL !== "undefined" && live()) FEEL.play(n, v); };
  const duck = (d, ms) => { if (typeof BGM !== "undefined" && BGM.duck) BGM.duck(d, ms); };

  /* ---------- 세기 ---------- */
  function power(o) {
    o = o || {};
    if (o.blocked) return 0.25;
    let p = Math.max(0.2, (o.dmg || 0) / 6);
    if (o.kill) p += 0.35;
    if (o.crit) p += 0.3;
    if (o.life) p += 0.3;
    return clamp(p, 0.2, 1.6);
  }
  function stopMs(o) {
    const p = power(o);
    const ms = TUNE.stopMin + (TUNE.stopMax - TUNE.stopMin) * Math.min(1, p) + (o && o.kill ? TUNE.stopKill : 0);
    return Math.round(ms * K());
  }

  /* ---------- 캔버스 파티클 ---------- */
  let cv = null, cx = null, parts = [], rings = [], raf = 0, dpr = 1;
  function canvas() {
    if (document.documentElement.classList.contains("mobile")) return null;   // v3.46 폰 · 앱: 충격파 캔버스(고리 · 불꽃 · 파편)를 그리지 않는다 — 번쩍임 · 밀려남만
    const L = layer(); if (!L) return null;
    if (cv && cv.isConnected && cv.parentNode === L) { fit(); return cx; }
    cv = document.createElement("canvas");
    cv.className = "imp-canvas";
    L.appendChild(cv);
    cx = cv.getContext("2d");
    fit();
    return cx;
  }
  function fit() {
    dpr = lite() ? 1 : Math.min(2, window.devicePixelRatio || 1);
    const w = Math.round(innerWidth * dpr), h = Math.round(innerHeight * dpr);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }
  /* v3.16.1 폰: 불티 그림을 색마다 한 번만 그려 둔다 */
  let LITE_NOW = false;
  const sprites = new Map();
  function emberSprite(col) {
    let c = sprites.get(col);
    if (c) return c;
    c = document.createElement("canvas"); c.width = c.height = 32;
    const g = c.getContext("2d"), gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, "#fff"); gr.addColorStop(0.3, col); gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 32, 32);
    sprites.set(col, c);
    return c;
  }
  function kick() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }
  let last = 0;
  function tick(now) {
    raf = 0;
    if (!cv || !cv.isConnected) { parts = []; rings = []; return; }
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)) / K(); last = now;   // v3.32 rAF 시각이 kick()의 performance.now()보다 이를 수 있어 dt가 음수 → 고리 반지름이 음수가 되어 arc 오류
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, innerWidth, innerHeight);
    cx.globalCompositeOperation = "lighter";
    LITE_NOW = lite();
    // 고리
    rings = rings.filter(r => (r.t += dt) < r.life);
    for (const r of rings) {
      const k = r.t / r.life, e = 1 - Math.pow(1 - k, 3);
      const rad = r.r0 + (r.r1 - r.r0) * e;
      cx.globalAlpha = (1 - k) * r.a;
      cx.lineWidth = Math.max(1, r.w * (1 - k * 0.8));
      cx.strokeStyle = r.col;
      cx.beginPath();
      if (r.flat) cx.ellipse(r.x, r.y, rad, rad * 0.32, 0, 0, Math.PI * 2); else cx.arc(r.x, r.y, rad, 0, Math.PI * 2);
      cx.stroke();
      if (r.fill) { cx.globalAlpha = (1 - k) * (1 - k) * r.fill; cx.fillStyle = r.col; cx.fill(); }
    }
    // 입자
    parts = parts.filter(p => (p.t += dt) < p.life);
    for (const p of parts) {
      p.vx *= Math.pow(p.drag, dt * 60); p.vy *= Math.pow(p.drag, dt * 60);
      p.vy += p.g * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.rot += p.vr * dt;
      const k = p.t / p.life, a = (1 - k) * p.a;
      if (p.kind === "streak") {
        const sp = Math.hypot(p.vx, p.vy), L = Math.min(p.len, sp * 0.05 + 2);
        const ux = p.vx / (sp || 1), uy = p.vy / (sp || 1);
        cx.globalCompositeOperation = "lighter";
        cx.globalAlpha = a;
        cx.strokeStyle = p.col; cx.lineCap = "round";
        cx.lineWidth = p.size * (1 - k * 0.6);
        cx.beginPath(); cx.moveTo(p.x - ux * L, p.y - uy * L); cx.lineTo(p.x, p.y); cx.stroke();
        cx.globalAlpha = a * 0.9; cx.strokeStyle = "#fff"; cx.lineWidth = p.size * 0.4 * (1 - k);
        cx.beginPath(); cx.moveTo(p.x - ux * L * 0.5, p.y - uy * L * 0.5); cx.lineTo(p.x, p.y); cx.stroke();
      } else if (p.kind === "chunk") {   // 파편: 어두운 조각은 일반 합성으로
        cx.globalCompositeOperation = "source-over";
        cx.globalAlpha = Math.min(1, a * 1.4);
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
        cx.fillStyle = p.col; const s = p.size;
        cx.beginPath(); cx.moveTo(-s, -s * 0.6); cx.lineTo(s * 0.8, -s); cx.lineTo(s, s * 0.7); cx.lineTo(-s * 0.5, s); cx.closePath(); cx.fill();
        cx.restore();
        cx.globalCompositeOperation = "lighter";
      } else if (LITE_NOW) {   // 불티(폰): 미리 그린 둥근 빛을 찍는다 — 매 프레임 그라데이션을 만들지 않음
        cx.globalCompositeOperation = "lighter";
        cx.globalAlpha = a;
        const s = p.size * (1 - k * 0.5) * 2.4;
        cx.drawImage(emberSprite(p.col), p.x - s, p.y - s, s * 2, s * 2);
      } else {   // 불티: 둥근 빛
        cx.globalCompositeOperation = "lighter";
        cx.globalAlpha = a;
        const s = p.size * (1 - k * 0.5);
        const gr = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s * 2.4);
        gr.addColorStop(0, "#fff"); gr.addColorStop(0.3, p.col); gr.addColorStop(1, "rgba(0,0,0,0)");
        cx.fillStyle = gr; cx.beginPath(); cx.arc(p.x, p.y, s * 2.4, 0, Math.PI * 2); cx.fill();
      }
    }
    cx.globalAlpha = 1; cx.globalCompositeOperation = "source-over";
    if (parts.length || rings.length) raf = requestAnimationFrame(tick);
    else cx.clearRect(0, 0, innerWidth, innerHeight);
  }
  /* 불꽃 줄기 n개. ang/spread(도)로 방향을 모은다 */
  function sparks(x, y, o) {
    if (!canvas()) return;
    const n = Math.ceil((o.n || 12) * (LITE_NOW || lite() ? 0.6 : 1)), sp = o.speed || 600;   // v3.17 가볍게: 불꽃 · 파편 60%
    for (let i = 0; i < n; i++) {
      const a = (o.ang != null ? o.ang + rnd(-1, 1) * (o.spread || 180) / 2 : rnd(0, 360)) * Math.PI / 180;
      const v = sp * rnd(0.35, 1.1);
      parts.push({ kind: o.kind || "streak", x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: o.g != null ? o.g : 900, drag: o.drag || 0.9,
        size: (o.size || 3) * rnd(0.6, 1.3), len: o.len || 40, col: o.col || "#ffd27a", a: o.a || 1, life: (o.life || 0.45) * rnd(0.6, 1.2), t: 0, rot: rnd(0, 6.3), vr: rnd(-14, 14) });
    }
    kick();
  }
  function ringAt(x, y, o) {
    if (!canvas()) return;
    rings.push({ x, y, r0: o.r0 || 6, r1: o.r1 || 120, w: o.w || 6, col: o.col || "#fff", a: o.a || 0.9, life: o.life || 0.4, t: 0, fill: o.fill || 0, flat: !!o.flat });
    kick();
  }

  /* ---------- 화면 흔들림 (트라우마) ---------- */
  let trauma = 0, push = { x: 0, y: 0 }, sraf = 0, seed = Math.random() * 100, tPrev = 0;
  function shake(amount, dir) {
    if (!TUNE.screenMove) return;   // v3.16.3 화면 전체 흔들림은 끔 (PC · 폰 모두). 다시 켜려면 TUNE.screenMove = true
    if (!on() || !amount) return;
    trauma = Math.min(1.15, trauma + amount);
    if (dir) { push.x += dir.x * amount * TUNE.shake * 0.8; push.y += dir.y * amount * TUNE.shake * 0.8; }
    if (!sraf) { tPrev = performance.now(); sraf = requestAnimationFrame(shTick); }
  }
  function noise1(t, s) { return Math.sin(t * 1.7 + s) * 0.5 + Math.sin(t * 3.1 + s * 1.3) * 0.3 + Math.sin(t * 7.3 + s * 0.7) * 0.2; }
  function shTick(now) {
    sraf = 0;
    const g = document.getElementById("game");
    const dt = Math.min(0.05, (now - tPrev) / 1000); tPrev = now;
    trauma = Math.max(0, trauma - dt * 2.4);
    push.x *= Math.pow(0.0008, dt); push.y *= Math.pow(0.0008, dt);
    if (!g) { trauma = 0; return; }
    const s = trauma * trauma, t = now / 1000 * 38;
    const x = noise1(t, seed) * s * TUNE.shake + push.x, y = noise1(t, seed + 40) * s * TUNE.shake * 0.8 + push.y, r = noise1(t, seed + 90) * s * TUNE.tilt;
    if (trauma <= 0.002 && Math.abs(push.x) < 0.3 && Math.abs(push.y) < 0.3) { g.style.removeProperty("translate"); g.style.removeProperty("rotate"); trauma = 0; push = { x: 0, y: 0 }; return; }
    g.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
    if (!lite()) g.style.rotate = `${r.toFixed(3)}deg`;   // 폰은 기울기 없이 위치만
    sraf = requestAnimationFrame(shTick);
  }
  /* 예전 shakeScreen(px)과 같은 크기 감: px 14 ≈ 트라우마 0.6 */
  const pxToTrauma = px => clamp(px / 24, 0, 1);

  /* ---------- 화면 덮개 ---------- */
  function overlay(cls, ms, vars) {
    const L = layer(); if (!L) return null;
    const d = document.createElement("div");
    d.className = "imp-ov " + cls;
    if (vars) for (const n in vars) d.style.setProperty(n, vars[n]);
    L.appendChild(d);
    setTimeout(() => d.remove(), ms + 60);
    return d;
  }
  function screenFlash(col, op, ms) {
    const d = overlay("imp-glow", ms, { "--c": col }); if (!d) return;
    d.animate([{ opacity: op }, { opacity: 0 }], { duration: ms, easing: "cubic-bezier(.1,.7,.3,1)", fill: "forwards" });
  }
  /* 임팩트 프레임: 한두 프레임 고대비 흑백 → 원래대로 */
  function impactFrame(ms) {
    const d = overlay("imp-frame", ms); if (!d) return;
    d.animate([{ opacity: 1 }, { opacity: 1, offset: 0.45 }, { opacity: 0 }], { duration: ms, easing: "steps(3, end)", fill: "forwards" });
  }
  function vignette(col, ms, op) {
    const d = overlay("imp-vig", ms, { "--c": col }); if (!d) return;
    d.animate([{ opacity: 0 }, { opacity: op || 1, offset: 0.08 }, { opacity: 0 }], { duration: ms, easing: "ease-out", fill: "forwards" });
  }

  /* ---------- 카드 반응 ---------- */
  function flashEl(el, p, col) {
    if (!el || !el.isConnected) return;
    const b = 1.8 + p * 1.6;
    if (lite()) {   // 폰: drop-shadow 없이 밝기만 (그림자 필터는 매 프레임 다시 그림)
      try { el.animate([{ filter: `brightness(${b}) saturate(.2)` }, { filter: `brightness(${1 + p * 0.5})`, offset: 0.35 }, { filter: "brightness(1)" }], { duration: 150 + p * 160, easing: "ease-out" }); } catch (e) {}
      return;
    }
    try {
      el.animate([
        { filter: `brightness(${b}) saturate(.15) contrast(1.3) drop-shadow(0 0 ${8 + p * 14}px ${col || "#fff"})` },
        { filter: `brightness(${1 + p * 0.5}) saturate(.8) drop-shadow(0 0 ${4 + p * 8}px ${col || "#fff"})`, offset: 0.35 },
        { filter: "brightness(1) saturate(1) drop-shadow(0 0 0 transparent)" }
      ], { duration: 150 + p * 160, easing: "ease-out", composite: "add" });
    } catch (e) {}
  }
  function knock(el, dir, p, delay) {
    if (!el || !el.isConnected) return;
    const d = TUNE.knock * Math.min(1.2, p), dx = dir.x * d, dy = dir.y * d;
    try {
      el.animate([
        { translate: "0px 0px", rotate: "0deg" },
        { translate: `${dx}px ${dy}px`, rotate: `${(dir.x >= 0 ? 1 : -1) * p * 4}deg`, offset: 0.18 },
        { translate: `${-dx * 0.28}px ${-dy * 0.28}px`, rotate: `${(dir.x >= 0 ? -1 : 1) * p * 1.6}deg`, offset: 0.5 },
        { translate: `${dx * 0.1}px ${dy * 0.1}px`, rotate: "0deg", offset: 0.75 },
        { translate: "0px 0px", rotate: "0deg" }
      ], { duration: 360 + p * 140, delay: delay || 0, easing: "cubic-bezier(.2,.7,.3,1)", composite: "add" });
    } catch (e) {}
  }
  function dirOf(fromEl, toEl, fb) {
    if (!fromEl || !toEl) return fb || { x: 0, y: 1 };
    const a = ctr(fromEl.getBoundingClientRect()), b = ctr(toEl.getBoundingClientRect());
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1;
    return { x: dx / L, y: dy / L };
  }

  /* ---------- 맞는 순간: 유닛 · 생명 ----------
     from = 친 쪽 엘리먼트, to = 맞은 쪽(카드 또는 생명 패널), o = { dmg, kill, crit, blocked, life, col, light(투척 · 꿰뚫기 같은 곁타) } */
  function strike(from, to, o) {
    o = o || {};
    if (!on() || !to) return stopMs(o);
    const p = power(o) * (o.light ? 0.55 : 1), r = to.getBoundingClientRect(), c = ctr(r), cw = Math.max(60, r.width);
    const dir = dirOf(from, to, { x: 0, y: o.life ? -1 : 1 });
    const col = o.col || "#ffd27a";
    const hs = stopMs(o) * (o.light ? 0.5 : 1);
    if (o.blocked) { block(from, to, col); return Math.round(hs * 0.7); }
    // 1) 번쩍 · 밀려남 (밀려남은 히트 스톱이 끝난 뒤)
    flashEl(to, Math.min(1, p), col);
    knock(to, dir, Math.min(1.3, p), hs * 0.6);
    // 2) 충격파 · 불꽃
    const ang = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
    ringAt(c.x, c.y, { r0: cw * 0.1, r1: cw * (0.9 + p * 0.7), w: 4 + p * 8, col: "#fff", a: 0.85, life: 0.28 + p * 0.12, fill: 0.25 });
    ringAt(c.x, c.y, { r0: cw * 0.2, r1: cw * (1.3 + p * 0.9), w: 2 + p * 4, col, a: 0.7, life: 0.42 + p * 0.15 });
    sparks(c.x, c.y, { n: Math.round(10 + p * 18), ang, spread: 130, speed: 520 + p * 700, size: 2.2 + p * 2.4, len: 30 + p * 50, col, g: 700, life: 0.32 + p * 0.2 });
    sparks(c.x, c.y, { n: Math.round(4 + p * 8), speed: 260 + p * 300, size: 2.4 + p * 2, col: "#fff2c8", kind: "ember", g: 300, drag: 0.88, life: 0.5 + p * 0.3 });
    if (p > 0.55) sparks(c.x, c.y + r.height * 0.1, { n: Math.round(p * 7), ang: ang - 20, spread: 160, speed: 380 + p * 260, size: cw * 0.035 + 2, col: "#2a211c", kind: "chunk", g: 1500, drag: 0.94, life: 0.8 });
    // 3) 흔들림 · 화면
    shake(0.18 + p * 0.42 + (o.life ? 0.15 : 0), dir);
    const kf = !o.kill || TUNE.killFlash;   // v3.16.5 쓰러뜨리는 타격은 화면 전체 번쩍임 없음 (카드 번쩍임 · 충격파는 그대로)
    if (kf && !o.life && (o.kill || o.crit)) setTimeout(() => impactFrame(o.kill ? 110 : 80), 0);   // v3.17.3 생명 타격은 흑백 프레임 없음
    const red = o.life && !o.foeLife;   // v3.17.3 내가 상대 생명을 칠 때는 빨간 화면 없음 (내 생명이 맞을 때만)
    if (red) vignette("rgba(190,10,20,.75)", 520 + p * 200, Math.min(1, 0.55 + p * 0.3));
    if (kf && (p >= 0.9 || o.kill) && !o.foeLife) screenFlash(red ? "rgba(255,70,60,.5)" : "rgba(255,248,225,.5)", 0.55, 200);
    punchBoard(p);
    // 4) 소리 · 진동
    snd(o.life ? "imp_life" : o.kill ? "imp_kill" : "imp_hit", clamp(0.45 + p * 0.55, 0.4, 1.25));
    if (o.crit) snd("imp_crit", 0.9);
    duck(TUNE.duck * Math.min(1, 0.4 + p * 0.6), 260 + p * 260);
    if (typeof FEEL !== "undefined") FEEL.buzz(Math.round(18 + p * 30));
    return hs;
  }
  /* 막힘(피해 0 · 보호막 · 가호): 쇠가 튕겨 내는 반달 빛 + 쇠 불꽃 + 친 쪽이 튕김 */
  function block(from, to, col) {
    if (!on() || !to) return;
    const r = to.getBoundingClientRect(), c = ctr(r), cw = Math.max(60, r.width);
    const dir = dirOf(from, to);
    const back = { x: -dir.x, y: -dir.y };
    const hit = { x: c.x - dir.x * cw * 0.32, y: c.y - dir.y * r.height * 0.3 };
    const sh = overlay("imp-shield", 420, { "--c": "#bfe8ff" });
    if (sh) {
      const s = cw * 1.25;
      Object.assign(sh.style, { left: hit.x + "px", top: hit.y + "px", width: s + "px", height: s + "px", rotate: (Math.atan2(back.y, back.x) * 180 / Math.PI) + "deg" });
      sh.animate([{ opacity: 0, scale: "0.5" }, { opacity: 1, scale: "1.05", offset: 0.15 }, { opacity: 0, scale: "1.25" }], { duration: 420, easing: "ease-out", fill: "forwards" });
    }
    ringAt(hit.x, hit.y, { r0: 4, r1: cw * 0.7, w: 5, col: "#dff3ff", a: 0.9, life: 0.25 });
    sparks(hit.x, hit.y, { n: 16, ang: Math.atan2(back.y, back.x) * 180 / Math.PI, spread: 150, speed: 700, size: 2, len: 34, col: "#e8f6ff", g: 1200, life: 0.35 });
    flashEl(to, 0.35, "#bfe8ff");
    knock(to, dir, 0.25, 0);
    if (from) knock(from, back, 0.55, 40);
    shake(0.16, back);
    snd("imp_block", 1);
    if (typeof FEEL !== "undefined") FEEL.buzz(14);
  }
  /* 판 전체가 아주 잠깐 앞으로 눌렸다 돌아옴 (센 타격만) */
  function punchBoard(p) {
    if (!TUNE.screenMove || p < 0.6 || lite()) return;   // v3.16.3 판 전체 확대는 끔 (폰은 v3.16.1부터)
    const b = document.getElementById("board"); if (!b) return;
    try { b.animate([{ scale: "1" }, { scale: String(1 + Math.min(0.022, p * 0.014)), offset: 0.2 }, { scale: "1" }], { duration: 260, easing: "ease-out", composite: "add" }); } catch (e) {}
  }

  /* ---------- 마법이 맞음 (js/spellfx.js의 shake 자리) ---------- */
  function spell(el, n, col) {
    if (!on() || !el || !el.isConnected) return;
    const p = clamp(n / 12, 0.2, 1.2), r = el.getBoundingClientRect(), c = ctr(r), cw = Math.max(60, r.width);
    flashEl(el, p, col || "#fff");
    knock(el, { x: rnd(-0.3, 0.3), y: 1 }, p * 0.8, 30);
    ringAt(c.x, c.y, { r0: cw * 0.15, r1: cw * (1 + p * 0.6), w: 3 + p * 5, col: col || "#fff", a: 0.75, life: 0.35, fill: 0.18 });
    shake(0.12 + p * 0.3, { x: 0, y: 1 });
    snd("imp_spell", 0.5 + p * 0.5);
    duck(TUNE.duck * 0.7, 300);
  }

  /* ---------- 카드가 부서짐 ---------- */
  function shatter(c, w, col, heavy) {
    if (!on()) return;
    const cw = Math.max(60, w);
    if (!heavy) {   // 쓴 마법 · 아이템이 부서짐: 가볍게
      ringAt(c.x, c.y, { r0: cw * 0.2, r1: cw * 1.2, w: 4, col: col || "#d9c2ff", a: 0.6, life: 0.32 });
      sparks(c.x, c.y, { n: 10, speed: 420, size: 2.2, len: 26, col: col || "#d9c2ff", g: 500, life: 0.4 });
      shake(0.14, { x: 0, y: 1 });
      return;
    }
    ringAt(c.x, c.y, { r0: cw * 0.2, r1: cw * 1.6, w: 7, col: "#fff", a: 0.8, life: 0.35, fill: 0.3 });
    ringAt(c.x, c.y + cw * 0.5, { r0: cw * 0.3, r1: cw * 1.8, w: 5, col: col || "#ffb070", a: 0.6, life: 0.6, flat: true });
    sparks(c.x, c.y, { n: 14, speed: 520, size: cw * 0.05 + 3, col: "#3a2e26", kind: "chunk", g: 1600, drag: 0.95, life: 0.9 });
    sparks(c.x, c.y, { n: 18, speed: 700, size: 2.6, len: 40, col: col || "#ffb070", g: 800, life: 0.45 });
    sparks(c.x, c.y, { n: 8, speed: 220, size: 3, col: "#ffdf9a", kind: "ember", g: -120, drag: 0.9, life: 0.9 });
    shake(0.42, { x: 0, y: 1 });
    if (TUNE.killFlash) impactFrame(90);   // v3.16.5 끔
    snd("imp_kill", 0.45);   // v3.16.3 묵직한 쿵은 줄이고 파사삭(js/feel.js shatter)이 들리게
    duck(TUNE.duck, 450);
  }

  /* ---------- 내 카드가 칸에 내려앉음 ---------- */
  function land(el) {
    if (!on() || !el || !el.isConnected) return;
    const r = el.getBoundingClientRect(), cw = Math.max(60, r.width), x = r.left + r.width / 2, y = r.bottom - r.height * 0.06;
    ringAt(x, y, { r0: cw * 0.25, r1: cw * 1.1, w: 4, col: "#f3dca0", a: 0.55, life: 0.4, flat: true });
    sparks(x, y, { n: 10, ang: -90, spread: 170, speed: 260, size: 2.4, col: "#c9b48a", kind: "ember", g: 500, drag: 0.86, life: 0.5 });
    snd("imp_land", 0.9);
  }

  /* ---------- 뛰쳐나가는 순간: 발밑 먼지 + 묵직한 휙 ---------- */
  function launch(el, dir) {
    if (!on() || !el || !el.isConnected) return;
    const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height * 0.75;
    const ang = Math.atan2(-(dir ? dir.y : 1), -(dir ? dir.x : 0)) * 180 / Math.PI;
    sparks(x, y, { n: 9, ang, spread: 90, speed: 300, size: 3, col: "#d8c49a", kind: "ember", g: 200, drag: 0.85, life: 0.45, a: 0.7 });
    snd("imp_whoosh", 0.8);
  }

  return { TUNE, power, stopMs, strike, block, spell, shatter, land, launch, shake, pxToTrauma, screenFlash, impactFrame, sparks, ringAt };
})();

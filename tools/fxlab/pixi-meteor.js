/* ETHERION 연출 실험실 — PixiJS(WebGL) 메테오 (tools/fxlab, 비교용 시험작)
   지금 게임의 js/spellfx.js(DOM + Web Animations)와 같은 자리 · 같은 타이밍 틀에서 WebGL로 그리면 어디까지 되는지 보는 시험이다.
   - 그림 파일 없이 캔버스로 만든 질감(빛 · 연기 · 불티 · 바위 · 룬 고리)만 쓴다. 효과용 그림(스프라이트 시트)을 쓰면 더 좋아진다
   - 카드는 지금처럼 DOM이고, 이 캔버스는 그 위에 투명하게 덮인다(pointer-events 없음) → 게임 규칙 · UI 코드는 손대지 않아도 된다
   - 화려하게: 빛 번짐(AdvancedBloom) + 충격파 일그러짐(Shockwave) + 히트 스톱. 가볍게: 입자 절반 · 필터 없음 · 해상도 1배
   - 판의 결과와 상관없는 연출이라 Math.random을 쓴다(AGENTS.md 온라인 대전 규칙과 맞음)
   쓰는 법: await PixiFX.init(); PixiFX.meteor(대상 중심 {x,y}, 대상 DOMRect, { lite, onHit }) → 맞기까지 ms */
"use strict";

const PixiFX = (() => {
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const easeOut = (t, p) => 1 - Math.pow(1 - t, p || 2);
  /* 원소색 · 효과색 (docs/STYLE_GUIDE.md 1.2 · 2.9와 같은 값) */
  const C = { fire: 0xff6b3d, spark: 0xffd27a, hot: 0xffc04d, white: 0xfff6d8, ember: 0xffe9a8 };
  const FIRE = [[0, 0xfff0c0], [0.1, 0xffc060], [0.3, 0xff8a30], [0.6, 0xc8381a], [1, 0x401008]];
  const TRAIL = [[0, 0xfff6d8], [0.15, 0xffc04d], [0.45, 0xff6b3d], [0.8, 0x8a1e0c], [1, 0x3a0a04]];
  const SPARK = [[0, 0xffffff], [0.3, 0xffd27a], [0.7, 0xff6b3d], [1, 0x801a08]];

  let app = null, world, L = {}, lite = false, freeze = 0, peak = 0, failed = null;
  const P = [], TX = {}, shocks = [];
  let bloom = null;
  const recent = [];

  /* ---------- 질감: 캔버스로 한 번 그려 둔다 ---------- */
  function tex(w, h, draw) {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    draw(c.getContext("2d"), w, h);
    return PIXI.Texture.from(c);
  }
  function radial(ctx, w, h, stops) {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function makeTextures() {
    TX.glow = tex(128, 128, (c, w, h) => radial(c, w, h, [[0, "rgba(255,255,255,1)"], [0.22, "rgba(255,255,255,.6)"], [0.55, "rgba(255,255,255,.14)"], [1, "rgba(255,255,255,0)"]]));
    TX.core = tex(64, 64, (c, w, h) => radial(c, w, h, [[0, "rgba(255,255,255,1)"], [0.5, "rgba(255,255,255,.85)"], [1, "rgba(255,255,255,0)"]]));
    TX.dot = tex(32, 32, (c, w, h) => radial(c, w, h, [[0, "rgba(255,255,255,1)"], [0.35, "rgba(255,255,255,.8)"], [1, "rgba(255,255,255,0)"]]));
    TX.spark = tex(64, 8, (c, w, h) => {
      const g = c.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.7, "rgba(255,255,255,.75)"); g.addColorStop(1, "rgba(255,255,255,1)");
      c.fillStyle = g; c.beginPath(); c.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, TAU); c.fill();
    });
    TX.smoke = [0, 1, 2].map(() => tex(128, 128, (c, w, h) => {
      for (let i = 0; i < 10; i++) {
        const x = w / 2 + rnd(-22, 22), y = h / 2 + rnd(-22, 22), r = rnd(20, 42);
        const g = c.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(255,255,255,.5)"); g.addColorStop(1, "rgba(255,255,255,0)");
        c.fillStyle = g; c.fillRect(0, 0, w, h);
      }
    }));
    TX.rock = [0, 1, 2].map(() => tex(64, 64, (c, w, h) => {
      const n = 9, pts = [];
      for (let i = 0; i < n; i++) { const a = i / n * TAU, r = w * 0.42 * rnd(0.7, 1); pts.push([w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r]); }
      c.beginPath(); pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath();
      const g = c.createRadialGradient(w * 0.38, h * 0.34, 2, w / 2, h / 2, w * 0.5);
      g.addColorStop(0, "#6e5848"); g.addColorStop(0.6, "#2e241f"); g.addColorStop(1, "#120c0a");
      c.fillStyle = g; c.fill(); c.strokeStyle = "rgba(0,0,0,.6)"; c.lineWidth = 1.5; c.stroke();
      c.save(); c.clip();
      c.strokeStyle = "#ff8a3d"; c.lineWidth = 1.6; c.shadowColor = "#ff6b3d"; c.shadowBlur = 5;
      for (let k = 0; k < 3; k++) {
        let x = w / 2 + rnd(-8, 8), y = h / 2 + rnd(-8, 8);
        c.beginPath(); c.moveTo(x, y);
        for (let j = 0; j < 3; j++) { x += rnd(-10, 10); y += rnd(-10, 10); c.lineTo(x, y); }
        c.stroke();
      }
      c.restore();
    }));
    TX.ring = tex(256, 256, (c, w, h) => {
      c.strokeStyle = "#fff"; c.shadowColor = "#fff"; c.shadowBlur = 16; c.lineWidth = 9;
      c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 20, 0, TAU); c.stroke();
      c.shadowBlur = 0; c.lineWidth = 3; c.stroke();
    });
    /* 룬 고리: 마법이 뒤집힐 때의 고리(스타일 가이드 2.9)와 같은 문법 — 점선 바깥 원 · 가는 원 · 끊긴 안쪽 원 · 열두 점과 마름모 */
    TX.rune = tex(512, 512, (c, w) => {
      const R = w / 2, arc = (r) => { c.beginPath(); c.arc(R, R, r, 0, TAU); c.stroke(); };
      c.strokeStyle = "#fff"; c.fillStyle = "#fff"; c.shadowColor = "#fff"; c.shadowBlur = 10;
      c.lineWidth = 6; c.setLineDash([22, 12]); arc(R - 18); c.setLineDash([]);
      c.lineWidth = 2.5; arc(R - 38);
      c.lineWidth = 5;
      for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(R, R, R - 84, i / 6 * TAU + 0.12, (i + 1) / 6 * TAU - 0.12); c.stroke(); }
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * TAU, x = R + Math.cos(a) * (R - 60), y = R + Math.sin(a) * (R - 60);
        c.beginPath();
        if (i % 3 === 0) { c.moveTo(x, y - 11); c.lineTo(x + 7, y); c.lineTo(x, y + 11); c.lineTo(x - 7, y); c.closePath(); }
        else c.arc(x, y, 4.5, 0, TAU);
        c.fill();
      }
      c.lineWidth = 3;
      for (let k = 0; k < 2; k++) {
        c.beginPath();
        for (let i = 0; i <= 3; i++) { const a = (i / 3 + k / 6) * TAU - Math.PI / 2, x = R + Math.cos(a) * (R - 112), y = R + Math.sin(a) * (R - 112); i ? c.lineTo(x, y) : c.moveTo(x, y); }
        c.stroke();
      }
      c.lineWidth = 2; arc(46);
    });
    TX.scorch = tex(128, 128, (c, w, h) => radial(c, w, h, [[0, "rgba(8,4,2,.9)"], [0.5, "rgba(18,9,5,.6)"], [1, "rgba(0,0,0,0)"]]));
    TX.ray = tex(64, 256, (c, w, h) => {
      const g = c.createLinearGradient(0, h, 0, 0);
      g.addColorStop(0, "rgba(255,255,255,.95)"); g.addColorStop(0.5, "rgba(255,255,255,.3)"); g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g; c.beginPath(); c.moveTo(w / 2 - 2, h); c.lineTo(0, 0); c.lineTo(w, 0); c.lineTo(w / 2 + 2, h); c.closePath(); c.fill();
    });
  }

  /* ---------- 입자 ---------- */
  function grad(stops, t) {
    let i = 1;
    while (i < stops.length - 1 && stops[i][0] < t) i++;
    const [t0, a] = stops[i - 1], [t1, b] = stops[i];
    const u = Math.max(0, Math.min(1, (t - t0) / ((t1 - t0) || 1)));
    const r = ((a >> 16) & 255) + ((((b >> 16) & 255) - ((a >> 16) & 255)) * u);
    const g = ((a >> 8) & 255) + ((((b >> 8) & 255) - ((a >> 8) & 255)) * u);
    const bl = (a & 255) + (((b & 255) - (a & 255)) * u);
    return (r << 16) | (g << 8) | bl;
  }
  /* o: tex | obj, x y, layer, blend, life, delay, vx vy g drag floor bounce vr, sc:[from,to], se(ease), sx sy, al:[peak, fadeIn, power], col(stops) | tint, face, upd */
  function add(o) {
    const s = o.obj || new PIXI.Sprite(o.tex);
    if (!o.obj) s.anchor.set(o.ax != null ? o.ax : 0.5, o.ay != null ? o.ay : 0.5);
    if (!o.obj) s.blendMode = o.blend || "add";
    if (o.tint != null) s.tint = o.tint;
    s.rotation = o.rot || 0;
    (o.layer || L.fire).addChild(s);
    const p = Object.assign({ s, age: 0, vx: 0, vy: 0, g: 0, drag: 1, vr: 0, life: 1, delay: 0 }, o);
    s.visible = !(p.delay > 0);
    P.push(p); peak = Math.max(peak, P.length);
    if (p.upd) p.upd(p, 0, 0);   // 히트 스톱으로 첫 프레임이 멈춰 있어도 처음 모양으로 보이게
    apply(p, 0);
    return p;
  }
  function apply(p, t) {
    const s = p.s;
    s.x = p.x; s.y = p.y;
    if (p.sc) { const k = p.sc[0] + (p.sc[1] - p.sc[0]) * (p.se ? easeOut(t, p.se) : t); s.scale.set(k * (p.sx || 1), k * (p.sy || 1)); }
    if (p.al) { const [pk, fi, pw] = p.al; s.alpha = t < fi ? pk * t / fi : pk * Math.pow(Math.max(0, 1 - (t - fi) / (1 - fi || 1)), pw || 1); }
    if (p.flick) s.alpha *= 0.55 + 0.45 * Math.sin(p.age * p.flick + p.ph);
    if (p.col) s.tint = grad(p.col, t);
    if (p.face) {
      const sp = Math.hypot(p.vx, p.vy);
      s.rotation = Math.atan2(p.vy, p.vx);
      s.scale.x = p.len * (0.25 + sp / p.lenK); s.scale.y = p.thick;
    }
  }
  function tick() {
    const dt = Math.min(0.05, app.ticker.deltaMS / 1000);
    for (const sh of shocks) sh.f.time += freeze > 0 ? 0 : dt;
    for (let i = shocks.length - 1; i >= 0; i--) if (shocks[i].f.time > shocks[i].dur) shocks.splice(i, 1);
    if (freeze > 0) { freeze -= dt; setFilters(); return; }   // 히트 스톱: 맞는 순간 한두 프레임 모두 멈춘다
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      if (p.delay > 0) { p.delay -= dt; if (p.delay > 0) continue; p.s.visible = true; if (p.start) p.start(p); }
      p.age += dt;
      const t = p.age / p.life;
      if (t >= 1 || (p.upd && p.upd(p, dt, t) === false)) { p.s.destroy({ children: true }); P.splice(i, 1); continue; }
      if (!p.upd || p.phys) {
        const dr = Math.pow(p.drag, dt * 60);
        p.vx *= dr; p.vy *= dr; p.vy += p.g * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.floor != null && p.y > p.floor && p.vy > 0) { p.y = p.floor; p.vy *= -p.bounce; p.vx *= 0.6; p.vr *= 0.6; }
        p.s.rotation += p.vr * dt;
      }
      apply(p, t);
    }
    setFilters();
  }
  /* 필터는 입자가 있을 때만 건다 (가만히 있을 때 GPU를 쓰지 않게) */
  function setFilters() {
    const want = [];
    if (P.length && !lite) { shocks.forEach(s => want.push(s.f)); want.push(bloom); }
    const cur = world.filters || [];
    if (cur.length !== want.length || cur.some((f, i) => f !== want[i])) world.filters = want.length ? want : null;
  }

  /* ---------- 메테오 ---------- */
  function meteor(b, r, o) {
    if (!app) return 0;
    o = o || {};
    lite = !!o.lite;
    const cw = r.width, n = lite ? 0.45 : 1;
    const from = { x: b.x + innerHeight * 0.42, y: -70 };   // js/spellfx.js HIT.meteor와 같은 하늘 자리
    const ground = r.bottom - r.height * 0.06;
    const TELE = 0.18, FALL = 0.46, HIT = TELE + FALL, t0 = performance.now();
    const dx = b.x - from.x, dy = b.y - from.y, ang = Math.atan2(dy, dx), ux = dx / Math.hypot(dx, dy), uy = dy / Math.hypot(dx, dy);

    /* 1) 예고: 대상 발밑 룬 고리가 차오르고, 하늘 자리가 달아오른다 */
    const runeWrap = new PIXI.Container(), rune = new PIXI.Sprite(TX.rune);
    rune.anchor.set(0.5); rune.blendMode = "add"; runeWrap.addChild(rune); runeWrap.blendMode = "add";
    const rs = cw * 1.9 / 512;
    add({ obj: runeWrap, layer: L.ground, x: b.x, y: ground, tint: C.fire, life: 99, upd(p) {
      const a = (performance.now() - t0) / 1000; let k, al;
      if (a > HIT + 0.55) return false;
      if (a < HIT) { const u = a / HIT; k = 0.55 + 0.45 * easeOut(u, 3); al = 0.9 * Math.min(1, u * 2.4); }
      else { const u = (a - HIT) / 0.55; k = 1 + 0.55 * easeOut(u, 2); al = 0.95 * (1 - u); rune.tint = grad([[0, 0xffffff], [0.3, C.hot], [1, C.fire]], u); }
      runeWrap.scale.set(rs * k, rs * k * 0.34); runeWrap.alpha = al; rune.rotation += 0.05 + (a < HIT ? a * 0.08 : 0);
      runeWrap.x = p.x; runeWrap.y = p.y;
    } });
    add({ tex: TX.glow, layer: L.top, x: Math.min(innerWidth - 10, from.x - 40), y: 0, tint: C.hot, life: HIT + 0.1, sc: [cw * 1.2 / 128, cw * 2.6 / 128], al: [0.75, 0.6, 1.5] });

    /* 2) 낙하: 불타는 바위 + 불꼬리 + 연기 + 튀는 불티 */
    const head = new PIXI.Container();
    const mk = (t, tint, size, blend, alpha) => { const s = new PIXI.Sprite(t); s.anchor.set(0.5); s.tint = tint; s.blendMode = blend || "add"; s.width = s.height = size; s.alpha = alpha == null ? 1 : alpha; head.addChild(s); return s; };
    const streak = new PIXI.Sprite(TX.spark); streak.anchor.set(1, 0.5); streak.blendMode = "add"; streak.tint = 0xffb050; streak.rotation = ang;
    streak.scale.set(cw * 2.6 / 64, cw * 0.34 / 8); streak.alpha = 0.9; head.addChild(streak);
    mk(TX.glow, C.fire, cw * 1.7, "add", 0.95);
    mk(TX.glow, C.hot, cw * 0.85);
    mk(TX.core, 0xfff3c0, cw * 0.44);
    const rock = mk(TX.rock[0], 0xffffff, cw * 0.32, "normal");
    const front = mk(TX.core, 0xffe2a0, cw * 0.2, "add", 0.6);
    front.x = ux * cw * 0.06; front.y = uy * cw * 0.06;
    let prev = null;
    const step = lite ? 11 : 5;
    /* 머리는 실제 시계로 움직인다: 프레임이 밀려도(느린 폰 · 히트 스톱) 맞는 때가 돌려준 ms와 어긋나지 않고, 맞는 순간은 도착할 때 한 번 */
    let hit = false;
    head.visible = false;
    add({ obj: head, layer: L.top, x: from.x, y: from.y, life: 99, upd(p) {
      const a = (performance.now() - t0) / 1000 - TELE;
      if (a < 0) return;
      if (a >= FALL) { if (!hit) { hit = true; boom(b, ground, cw, n, o); } return false; }
      head.visible = true;
      const u = a / FALL, e = Math.pow(u, 1.9);
      p.x = from.x + dx * e; p.y = from.y + dy * e;
      head.x = p.x; head.y = p.y; head.scale.set(0.7 + 0.45 * u);
      rock.rotation += 0.35;
      if (prev) {
        const seg = Math.hypot(p.x - prev.x, p.y - prev.y), k = Math.max(1, Math.floor(seg / step));
        for (let i = 0; i < k; i++) {
          const q = (i + Math.random()) / k, x = prev.x + (p.x - prev.x) * q, y = prev.y + (p.y - prev.y) * q;
          add({ tex: TX.glow, layer: L.fire, x: x + rnd(-3, 3), y: y + rnd(-3, 3), vx: -ux * rnd(30, 90) + rnd(-30, 30), vy: -uy * rnd(30, 90) - rnd(10, 40), drag: 0.94,
            life: rnd(0.25, 0.48), sc: [cw * rnd(0.26, 0.4) / 128, cw * rnd(0.55, 0.9) / 128], se: 2, al: [0.9, 0.05, 1.4], col: TRAIL });
          if (!lite && Math.random() < 0.5) add({ tex: TX.smoke[i % 3], blend: "normal", layer: L.smoke, x, y, vx: rnd(-20, 20), vy: rnd(-40, -10), drag: 0.97, rot: rnd(0, TAU), vr: rnd(-1, 1),
            life: rnd(0.8, 1.25), sc: [cw * 0.25 / 128, cw * rnd(0.8, 1.2) / 128], se: 2, al: [0.42, 0.15, 1.2], col: [[0, 0x4a2a1a], [1, 0x2c2826]] });
          if (Math.random() < (lite ? 0.35 : 0.55)) {
            const a = ang + Math.PI + rnd(-0.9, 0.9), sp = rnd(120, 360);
            add({ tex: TX.spark, ax: 0.85, layer: L.top, x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 520, drag: 0.95, face: true, len: cw * 0.14 / 64, lenK: 300, thick: 0.5,
              life: rnd(0.3, 0.6), al: [1, 0, 1.2], col: SPARK });
          }
        }
      }
      prev = { x: p.x, y: p.y };
    } });

    return Math.round(HIT * 1000);
  }

  function boom(b, ground, cw, n, o) {
    if (!app) return;
    // 여럿이 한꺼번에 맞으면(세 장) 빛이 겹쳐 하얗게 타 버리지 않게 하나하나를 줄인다
    const now = performance.now();
    while (recent.length && now - recent[0] > 400) recent.shift();
    const m = 1 / (1 + 0.7 * recent.length); recent.push(now);
    const N = k => Math.max(1, Math.round(k * n * (0.5 + 0.5 * m)));
    // 번쩍 + 주변을 비추는 큰 빛 (아래 카드들이 잠깐 불빛에 물든다)
    if (!lite) {
      const scr = new PIXI.Graphics().rect(0, 0, innerWidth, innerHeight).fill(0xffffff); scr.blendMode = "add";
      add({ obj: scr, layer: L.flash, x: 0, y: 0, life: 0.16, al: [0.12 * m, 0, 2] });
    }
    add({ tex: TX.glow, layer: L.flash, x: b.x, y: b.y, tint: 0xff9a50, life: 0.75, sc: [cw * 2.6 / 128, cw * 4 / 128], se: 2, al: [0.5 * m, 0, 1.6] });
    add({ tex: TX.glow, layer: L.flash, x: b.x, y: b.y, tint: 0xfff0c8, life: 0.2, sc: [cw * 0.9 / 128, cw * 2 / 128], se: 3, al: [0.85 * (0.4 + 0.6 * m), 0, 1.6] });
    // 빛살
    for (let i = 0, k = lite ? 0 : 9; i < k; i++) {
      const s = cw * rnd(1.8, 3) / 256;
      add({ tex: TX.ray, ay: 1, layer: L.flash, x: b.x, y: b.y, rot: rnd(0, TAU), tint: i % 2 ? C.spark : C.white, life: rnd(0.28, 0.42),
        sc: [0.25, 1], se: 3, sx: cw * rnd(0.25, 0.45) / 64 / 1, sy: s, al: [0.75, 0.08, 1.6] });
    }
    // 고리: 땅 위 납작한 고리 (공중의 고리는 충격파 일그러짐이 맡는다)
    const gw = new PIXI.Container(), gr = new PIXI.Sprite(TX.ring); gr.anchor.set(0.5); gr.blendMode = "add"; gw.addChild(gr);
    add({ obj: gw, layer: L.flash, x: b.x, y: ground, life: 0.55, tint: 0xffa050, upd(p, dt, t) { const k = (cw * 0.4 + cw * 3.2 * easeOut(t, 3)) / 256; gw.scale.set(k, k * 0.3); gw.alpha = 0.95 * (1 - t); gw.x = p.x; gw.y = p.y; gr.tint = 0xffa050; } });
    // 불덩이: 터져 부풀며 연기로 식는다
    for (let i = 0, k = N(16); i < k; i++) {
      const a = rnd(0, TAU), sp = cw * rnd(0.8, 2.6);
      add({ tex: i % 2 ? TX.glow : TX.smoke[i % 3], layer: L.fire, x: b.x + rnd(-0.12, 0.12) * cw, y: b.y + rnd(-0.12, 0.12) * cw,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.75 - cw * 0.8, drag: 0.9, rot: rnd(0, TAU), vr: rnd(-2, 2),
        life: rnd(0.45, 0.85), sc: [cw * 0.35 / 128, cw * rnd(0.9, 1.5) / 128], se: 2, al: [0.75 * (0.45 + 0.55 * m), 0, 1.3], col: FIRE });
    }
    // 연기 기둥
    for (let i = 0, k = N(16); i < k; i++) {
      add({ tex: TX.smoke[i % 3], blend: "normal", layer: L.smoke, delay: rnd(0.04, 0.22), x: b.x + rnd(-0.35, 0.35) * cw, y: b.y + rnd(-0.1, 0.25) * cw,
        vx: rnd(-0.5, 0.5) * cw, vy: -cw * rnd(0.6, 1.2), drag: 0.965, rot: rnd(0, TAU), vr: rnd(-0.6, 0.6),
        life: rnd(1.0, 1.6), sc: [cw * 0.5 / 128, cw * rnd(1.6, 2.4) / 128], se: 2, al: [0.5, 0.18, 1.6], col: [[0, 0x5a3420], [0.3, 0x3a2e28], [1, 0x2a2826]] });
    }
    // 바위 파편: 튀어 올랐다 떨어져 땅에서 한 번 튄다
    for (let i = 0, k = N(20); i < k; i++) {
      const a = (-90 + rnd(-78, 78)) * Math.PI / 180, sp = cw * rnd(2.6, 7), sz = cw * rnd(0.05, 0.13);
      add({ tex: TX.rock[i % 3], blend: "normal", layer: L.debris, x: b.x + rnd(-0.1, 0.1) * cw, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        g: cw * 15, drag: 0.99, floor: ground + rnd(0, 0.12) * cw, bounce: 0.35, vr: rnd(-14, 14), rot: rnd(0, TAU),
        life: rnd(0.9, 1.35), sc: [sz / 64, sz / 64], al: [1, 0, 4] });
    }
    // 불꽃 줄기: 속도만큼 길게 늘어난다
    for (let i = 0, k = N(130); i < k; i++) {
      const a = (-90 + rnd(-110, 110)) * Math.PI / 180, sp = cw * rnd(2, 9);
      add({ tex: TX.spark, ax: 0.85, layer: L.top, x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: cw * 6, drag: 0.93,
        face: true, len: cw * 0.22 / 64, lenK: cw * 6, thick: rnd(0.4, 0.8), life: rnd(0.35, 0.9), al: [1, 0, 1.2], col: SPARK });
    }
    // 오래 떠도는 불티
    for (let i = 0, k = N(36); i < k; i++) {
      add({ tex: TX.dot, layer: L.top, delay: rnd(0, 0.3), x: b.x + rnd(-0.4, 0.4) * cw, y: b.y + rnd(-0.2, 0.3) * cw,
        vx: rnd(-0.35, 0.35) * cw, vy: -cw * rnd(0.3, 1.1), drag: 0.97, g: -cw * 0.15, life: rnd(1, 2.2),
        sc: [cw * rnd(0.04, 0.07) / 32, cw * 0.02 / 32], al: [1, 0.1, 1], flick: rnd(18, 34), ph: rnd(0, TAU), col: [[0, C.ember], [0.5, 0xff8a3d], [1, 0xa02010]] });
    }
    // 그을음 + 용암 금: 땅에 오래 남는다
    const sw = new PIXI.Container(), sc = new PIXI.Sprite(TX.scorch); sc.anchor.set(0.5); sw.addChild(sc);
    sw.scale.set(cw * 1.8 / 128, cw * 1.8 / 128 * 0.36);
    add({ obj: sw, layer: L.ground, x: b.x, y: ground, life: 2.4, al: [0.9, 0.04, 2] });
    const cr = new PIXI.Graphics();
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * TAU + rnd(-0.3, 0.3), len = cw * rnd(0.35, 0.75);
      let x = 0, y = 0; cr.moveTo(0, 0);
      for (let j = 1; j <= 4; j++) { const q = j / 4; x = Math.cos(a) * len * q + rnd(-6, 6); y = (Math.sin(a) * len * q + rnd(-6, 6)) * 0.34; cr.lineTo(x, y); }
    }
    cr.stroke({ width: Math.max(2, cw * 0.025), color: 0xffffff, cap: "round", join: "round" });
    cr.blendMode = "add";
    add({ obj: cr, layer: L.ground, x: b.x, y: ground, life: 1.7, al: [1, 0, 1.6], col: [[0, 0xffffff], [0.15, C.hot], [0.6, 0xff4a18], [1, 0x801a08]] });
    // 충격파 일그러짐 + 히트 스톱 (화려하게만)
    if (!lite && PIXI.filters && PIXI.filters.ShockwaveFilter) {
      const f = new PIXI.filters.ShockwaveFilter({ center: { x: b.x, y: b.y }, speed: cw * 7, amplitude: 26, wavelength: cw * 1.1, brightness: 1, radius: cw * 3.4 });
      f.time = 0; shocks.push({ f, dur: 0.6 });
      freeze = Math.max(freeze, 0.055);
    }
    if (o.onHit) o.onHit();
  }

  /* ---------- 준비 ---------- */
  async function init() {
    if (app || failed) return !!app;
    try {
      app = new PIXI.Application();
      await app.init({ resizeTo: window, backgroundAlpha: 0, antialias: false, autoDensity: true, resolution: Math.min(2, window.devicePixelRatio || 1), preference: "webgl" });
      const cv = app.canvas;
      cv.id = "pixi-fx";
      Object.assign(cv.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "80" });
      document.body.appendChild(cv);
      world = new PIXI.Container();
      app.stage.addChild(world);
      ["ground", "smoke", "fire", "debris", "top", "flash"].forEach(k => { L[k] = new PIXI.Container(); world.addChild(L[k]); });
      const fit = () => { world.filterArea = new PIXI.Rectangle(0, 0, innerWidth, innerHeight); };
      fit(); addEventListener("resize", fit);
      if (PIXI.filters && PIXI.filters.AdvancedBloomFilter) bloom = new PIXI.filters.AdvancedBloomFilter({ threshold: 0.42, bloomScale: 0.85, brightness: 1, blur: 7, quality: 5 });
      makeTextures();
      app.ticker.add(tick);
      return true;
    } catch (e) { failed = e; app = null; console.error(e); return false; }
  }

  return {
    init, meteor,
    stats: () => ({ active: P.length, peak }),
    resetPeak: () => { peak = P.length; },
    error: () => failed
  };
})();

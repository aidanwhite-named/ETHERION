/* ETHERION — 마법 연출 (v1.9.5)
   전투에서 마법이 발동하면 그 마법의 원소(단체)에 맞는 모양으로 날아가 터진다. 파일 없이 DOM + Web Animations로만 그린다.
   - themeOf(카드 ID): 단체의 원소(GROUPS.el)로 기본 모양을 정하고, 이름에 든 말(메테오·화살·해일…)로 바꾼다 (THEME_BY_NAME)
   - reveal(uid, ms): 마법이 뒤집힐 때 카드 둘레에 원소색 룬 고리 + 빨려 드는 빛 + 차오르는 소리
   - cast(기록 한 수, 발동 중인 마법): 그 수에 뜨는 숫자(floats)를 보고 대상마다 효과를 낸다.
       피해 → 원소별 발사체가 날아가 맞는 순간 터짐 / 강화 → 마법 카드에서 빛이 날아가 빛기둥과 떠오르는 입자
       약화 → 가라앉는 어둠 / 보호막·고정 → 빛 방울 / 생명 회복 → 초록 반짝임 / 대가(생명 −) → 핏방울
     돌려주는 값: Map(대상 → 숫자를 띄울 때까지 기다릴 ms). 숫자는 맞는 순간에 뜬다
   - 소리는 js/feel.js의 sp_* (발사 소리 LAUNCH, 맞는 소리는 각 효과 안에서)
   - 움직임 줄이기 설정이면 아무것도 하지 않는다(숫자만 바로 뜬다). 시간은 연출 속도(배속)를 따른다 */
"use strict";

const SpellFX = (() => {
  const NS = "http://www.w3.org/2000/svg";
  /* 원소색 (docs/STYLE_GUIDE.md 1.2 `--el`) + 효과 전용 색 (2.9) */
  const EL_COL = { fire: "#ff6b3d", metal: "#a9b4c2", lightning: "#ffd84a", earth: "#b88a5a", forest: "#58b85f", water: "#4fb3ff", dark: "#8b5cf6", light: "#ffe9a8", wind: "#9fe3d6" };
  const FXC = { blood: "#e0344a", shield: "#9be8ff", heal: "#7fe39c", curse: "#3a1858", spark: "#ffd27a" };
  const KIND_OF_EL = { fire: "shell", metal: "steel", lightning: "bolt", earth: "rock", forest: "thorn", water: "water", dark: "shadow", light: "holy", wind: "wind" };
  const THEME_BY_NAME = [
    [/메테오|별똥별|화염탄/, "meteor"], [/화염구|불씨/, "fireball"], [/화살/, "arrows"],
    [/해일|대해류|조수|물결/, "wave"], [/대지|땅울림|산사태|붕괴|진동|울림/, "quake"],
    [/피의|영혼|만찬|아귀|대가/, "blood"], [/창$/, "spear"]
  ];
  /* 떠오르는 입자 모양 (강화·룬 고리) */
  const P_OF_EL = { fire: "p-ember", metal: "p-sq", lightning: "p-dia", earth: "p-sq", forest: "p-leaf", water: "p-ring", dark: "p-wisp", light: "p-dia", wind: "p-streak" };
  const LAUNCH = { shell: "sp_cannon", meteor: "sp_meteor", fireball: "sp_fire", steel: "sp_shoot", rock: "sp_heave", arrows: "sp_arrows", water: "sp_water", wave: "sp_wave", shadow: "sp_dark", blood: "sp_dark", holy: "sp_holy", spear: "sp_holy", wind: "sp_wind" };

  const layer = () => document.getElementById("fx-layer");
  const K = () => (typeof kSpeed === "function" ? kSpeed() : 1);
  const off = () => !layer() || (typeof RM === "function" && RM()) || typeof G === "undefined" || !G || G.speed === 0 || (G.cfg && G.cfg.headless);
  const ctr = r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  const rnd = (a, b) => a + Math.random() * (b - a);
  const snd = (n, v) => { if (n && typeof sfx === "function") sfx(n, v); };
  const later = (fn, ms) => (ms > 4 ? setTimeout(() => { if (layer()) fn(); }, ms) : fn());
  const px = v => v.toFixed(1) + "px";

  function themeOf(id) {
    const c = id && typeof CARDS !== "undefined" ? CARDS[id] : null;
    const el = (c && (c.el || (GROUPS[c.group] || {}).el)) || "dark";
    let k = KIND_OF_EL[el] || "wind";
    const n = (c && c.name) || "";
    for (const [re, kk] of THEME_BY_NAME) if (re.test(n)) { k = kk; break; }
    let col = EL_COL[el] || "#b99bff";
    if (k === "meteor" || k === "fireball") col = EL_COL.fire;
    if (k === "blood") col = FXC.blood;
    return { k, el, col };
  }

  /* ---------- 조각 ---------- */
  function mk(cls, x, y, vars) {
    const d = document.createElement("div");
    d.className = "sfx " + cls;
    d.style.left = px(x); d.style.top = px(y);
    if (vars) for (const n in vars) d.style.setProperty(n, vars[n]);
    layer().appendChild(d);
    return d;
  }
  /* 한 번 움직이고 사라지는 조각 */
  function anim(el, kf, ms, o) {
    const a = el.animate(kf, Object.assign({ duration: Math.max(16, ms), easing: "ease-out", fill: "both" }, o || {}));
    a.onfinish = () => el.remove();
    setTimeout(() => el.remove(), ms + ((o && o.delay) || 0) + 400);   // 탭이 멈춰도 남지 않게
    return a;
  }
  /* 사방(또는 한쪽)으로 흩어지는 입자. o: col size dist dur grav cls ang spread face delay end n */
  function sparks(x, y, o) {
    const k = K();
    for (let i = 0; i < o.n; i++) {
      const a = (o.ang != null ? o.ang : 0) + (o.spread != null ? rnd(-o.spread, o.spread) : rnd(0, 360));
      const rad = a * Math.PI / 180, d = rnd(0.45, 1) * o.dist;
      const dx = Math.cos(rad) * d, dy = Math.sin(rad) * d, g = (o.grav || 0) * rnd(0.7, 1.2);
      const p = mk("sfx-p " + (o.cls || ""), x, y, { "--c": o.col, "--z": px(o.size * rnd(0.6, 1.25)) });
      const rot = o.face ? a.toFixed(0) + "deg" : (o.spin ? rnd(-o.spin, o.spin).toFixed(0) + "deg" : "0deg");
      anim(p, [
        { translate: "0px 0px", opacity: 1, scale: "1", rotate: o.face ? rot : "0deg" },
        { offset: 0.55, translate: `${px(dx * 0.82)} ${px(dy * 0.82 + g * 0.25)}`, opacity: 0.95 },
        { translate: `${px(dx)} ${px(dy + g)}`, opacity: 0, scale: String(o.end != null ? o.end : 0.3), rotate: rot }
      ], o.dur * rnd(0.75, 1.15) * k, { easing: "cubic-bezier(.15,.7,.35,1)", delay: (o.delay || 0) + rnd(0, o.jit || 0) * k });
    }
  }
  /* 떠오르거나 가라앉는 입자 (강화·약화·회복) */
  function rise(r, o) {
    const k = K();
    for (let i = 0; i < o.n; i++) {
      const x = r.left + r.width * rnd(0.12, 0.88), y = o.down ? r.top + r.height * rnd(0, 0.25) : r.bottom - r.height * rnd(0.02, 0.3);
      const dy = (o.down ? 1 : -1) * r.height * rnd(0.45, 0.85), dx = rnd(-1, 1) * r.width * 0.12;
      const p = mk("sfx-p " + (o.cls || ""), x, y, { "--c": o.col, "--z": px(o.size * rnd(0.6, 1.3)) });
      anim(p, [
        { translate: "0px 0px", opacity: 0, scale: "0.4", rotate: "0deg" },
        { offset: 0.2, opacity: 1, scale: "1" },
        { translate: `${px(dx)} ${px(dy)}`, opacity: 0, scale: "0.6", rotate: `${rnd(-160, 160).toFixed(0)}deg` }
      ], o.dur * rnd(0.8, 1.2) * k, { easing: "cubic-bezier(.2,.6,.4,1)", delay: rnd(0, o.spread || 260) * k + (o.delay || 0) });
    }
  }
  function flash(x, y, s, col, ms, o) {
    const f = mk("sfx-flash", x, y, { "--c": col, "--s": px(s) });
    anim(f, [{ scale: "0.2", opacity: 1 }, { offset: 0.22, scale: "1", opacity: 0.95 }, { scale: String((o && o.to) || 1.35), opacity: 0 }], ms * K(), { delay: (o && o.delay) || 0 });
  }
  function ring(x, y, s, col, ms, o) {
    o = o || {};
    const f = mk("sfx-ring " + (o.cls || ""), x, y, { "--c": col, "--s": px(s) });
    const kf = [{ scale: String(o.from != null ? o.from : 0.3), opacity: o.op0 != null ? o.op0 : 1, rotate: "0deg" }, { scale: String(o.to != null ? o.to : 1.25), opacity: 0, rotate: (o.rot || 0) + "deg" }];
    anim(f, kf, ms * K(), { easing: o.ease || "cubic-bezier(.1,.7,.3,1)", delay: o.delay || 0 });
  }
  function screenFlash(col, op, ms) {
    const f = mk("sfx-screen", 0, 0, { "--c": col });
    anim(f, [{ opacity: op }, { opacity: 0 }], ms * K(), { easing: "ease-out" });
  }
  function shake(el, n) { if (el && typeof shakeEl === "function") shakeEl(el, n); if (typeof IMPACT !== "undefined") IMPACT.spell(el, n); }   // v3.14 맞는 순간 번쩍 · 밀려남 · 쿵
  function quakeScreen(n) { if (typeof shakeScreen === "function") shakeScreen(n); }
  function glow(el, col, ms, dark) {
    if (!el || !el.animate) return;
    el.animate(dark
      ? [{ filter: "none" }, { filter: "brightness(.5) saturate(.45)", offset: 0.3 }, { filter: "none" }]
      : [{ filter: "none" }, { filter: `brightness(1.55) drop-shadow(0 0 10px ${col})`, offset: 0.3 }, { filter: "none" }], { duration: ms * K(), easing: "ease-out" });
  }

  /* 경로를 따라 날린다: 직선 + 포물선(arc) + 흔들림(wob). face면 날아가는 쪽을 바라보고, spin이면 돈다 */
  function fly(el, a, b, ms, o) {
    o = o || {};
    const N = 18, dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, w = o.wob ? Math.sin(t * Math.PI * (o.wobN || 2)) * o.wob * (1 - t) : 0;
      pts.push({ t, x: dx * t + nx * w, y: dy * t - (o.arc || 0) * 4 * t * (1 - t) + ny * w });
    }
    const kf = pts.map((p, i) => {
      const q = pts[Math.min(N, i + 1)], pr = pts[Math.max(0, i - 1)];
      const f = { offset: p.t, translate: `${px(p.x)} ${px(p.y)}` };
      if (o.face) f.rotate = (Math.atan2(q.y - pr.y, q.x - pr.x) * 180 / Math.PI).toFixed(1) + "deg";
      else if (o.spin) f.rotate = (o.spin * p.t).toFixed(0) + "deg";
      if (o.scale) f.scale = String(o.scale[0] + (o.scale[1] - o.scale[0]) * p.t);
      return f;
    });
    el.animate(kf, { duration: ms, easing: o.ease || "linear", fill: "forwards" });
    if (o.trail) trail(el, ms, o.trail, o.every);
    setTimeout(() => el.remove(), ms + 20);
  }
  function trail(el, ms, fn, every) {
    const t0 = performance.now();
    const id = setInterval(() => {
      if (!el.isConnected || performance.now() - t0 > ms) { clearInterval(id); return; }
      const r = el.getBoundingClientRect();
      fn(r.left + r.width / 2, r.top + r.height / 2);
    }, every || 30);
  }
  function puff(x, y, s, col, ms, dy) {
    const p = mk("sfx-p p-smoke", x, y, { "--c": col || "#5a524c", "--z": px(s) });
    anim(p, [{ scale: "0.5", opacity: 0.8, translate: "0px 0px" }, { scale: "1.6", opacity: 0, translate: `${px(rnd(-8, 8))} ${px(dy != null ? dy : -s * 0.6)}` }], ms * K(), { easing: "ease-out" });
  }
  function svgLayer() {
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("class", "sfx-svg");
    svg.setAttribute("width", innerWidth); svg.setAttribute("height", innerHeight);
    svg.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
    layer().appendChild(svg);
    return svg;
  }
  function jag(a, b, seg, jit) {
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    let d = `M${a.x.toFixed(1)} ${a.y.toFixed(1)}`, mids = [];
    for (let i = 1; i < seg; i++) {
      const t = i / seg, j = rnd(-jit, jit) * (1 - Math.abs(t - 0.5) * 0.6);
      const x = a.x + dx * t + nx * j, y = a.y + dy * t + ny * j;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; mids.push({ x, y });
    }
    return { d: d + ` L${b.x.toFixed(1)} ${b.y.toFixed(1)}`, mids };
  }
  function path(svg, d, cls, col, w) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d); p.setAttribute("class", cls);
    p.style.setProperty("--c", col); p.style.strokeWidth = w;
    svg.appendChild(p);
    return p;
  }

  /* ---------- 맞는 순간 ---------- */
  function explode(b, cw, col, big, el) {
    const s = cw * big;
    flash(b.x, b.y, s * 1.7, col, 460);
    flash(b.x, b.y, s * 0.9, "#fff6d8", 220);
    ring(b.x, b.y, s * 1.9, col, 560, { from: 0.25 });
    sparks(b.x, b.y, { n: 16, col: FXC.spark, size: Math.max(4, cw * 0.045), dist: s * 1.15, dur: 650, grav: s * 0.5, cls: "p-ember" });
    for (let i = 0; i < 6; i++) later(() => puff(b.x + rnd(-s, s) * 0.4, b.y + rnd(-s, s) * 0.3, s * rnd(0.45, 0.7), "#4a423d", 900), i * 40 * K());
    shake(el, 10); glow(el, col, 320); quakeScreen(big > 1 ? 9 : 6);
  }
  function block(b, cw, el) {
    ring(b.x, b.y, cw * 0.9, "#c9d2de", 380, { from: 0.4, to: 1.1 });
    sparks(b.x, b.y, { n: 8, col: "#e8eef5", size: 3, dist: cw * 0.55, dur: 360, cls: "p-streak", face: true });
    if (el && typeof shakeEl === "function") shakeEl(el, 4);
    if (typeof IMPACT !== "undefined") IMPACT.block(null, el);   // v3.14 막힘 "캉!" + 빛 반달
    snd("sp_block");
  }

  /* ---------- 원소별 피해 연출: at(o) = 맞기까지 ms, run(a, b, r, el, o) ---------- */
  const HIT = {
    shell: { at: o => o.fl * 1.05, run(a, b, r, el, o) {   // 잿불 고블린: 쇳덩이 포탄이 높이 날아가 폭발
      const cw = r.width, T = this.at(o);
      const sh = mk("sfx-shell", a.x, a.y, { "--z": px(Math.max(16, cw * 0.2)) });
      fly(sh, a, b, T, { arc: Math.min(240, Math.hypot(b.x - a.x, b.y - a.y) * 0.45 + 80), spin: 540, ease: "cubic-bezier(.3,.1,.6,1)", trail: (x, y) => puff(x, y, cw * 0.16, "#6a605a", 520, -6) });
      later(() => { explode(b, cw, o.col, 1, el); if (!o.blocked) snd("sp_boom", o.v); else block(b, cw, el); }, T);
    } },
    meteor: { at: o => Math.max(260, o.fl * 0.95), run(a, b, r, el, o) {   // 메테오·별똥별: 하늘 오른쪽 위에서 불꼬리를 달고 내리꽂힘
      const cw = r.width, T = this.at(o), from = { x: b.x + innerHeight * 0.42, y: -70 };
      const m = mk("sfx-meteor", from.x, from.y, { "--z": px(Math.max(20, cw * 0.3)) });
      fly(m, from, b, T, { face: true, ease: "cubic-bezier(.55,0,1,.7)", scale: [0.7, 1.15], every: 22, trail: (x, y) => sparks(x, y, { n: 2, col: o.col, size: Math.max(3, cw * 0.04), dist: cw * 0.25, dur: 420, grav: cw * 0.3, cls: "p-ember" }) });
      later(() => { explode(b, cw, o.col, 1.3, el); ring(b.x, b.y + r.height * 0.3, cw * 1.6, "#1d1410", 700, { cls: "ell dark", from: 0.4, to: 1.2, op0: 0.8 }); if (!o.blocked) snd("sp_boom", o.v); else block(b, cw, el); }, T);
    } },
    fireball: { at: o => o.fl * 0.9, run(a, b, r, el, o) {   // 화염구·불씨: 낮게 날아가는 불덩이
      const cw = r.width, T = this.at(o);
      const f = mk("sfx-meteor small", a.x, a.y, { "--z": px(Math.max(16, cw * 0.22)) });
      fly(f, a, b, T, { face: true, arc: 70, ease: "cubic-bezier(.4,.1,.7,1)", every: 26, trail: (x, y) => sparks(x, y, { n: 1, col: o.col, size: 4, dist: cw * 0.18, dur: 380, grav: -cw * 0.2, cls: "p-ember" }) });
      later(() => { explode(b, cw, o.col, 0.75, el); if (!o.blocked) snd("sp_boom", 0.6 * o.v); else block(b, cw, el); }, T);
    } },
    bolt: { at: () => 70 * K(), run(a, b, r, el, o) {   // 번개 노움: 하늘에서 갈지자 번개가 내리꽂힘
      const cw = r.width;
      later(() => {
        const svg = svgLayer(), top = { x: b.x + rnd(-cw * 0.7, cw * 0.7), y: -20 };
        const main = jag(top, b, 11, Math.max(18, cw * 0.22));
        const ds = [main.d];
        for (let i = 0; i < 2; i++) { const m = main.mids[3 + Math.floor(Math.random() * (main.mids.length - 4))]; if (m) ds.push(jag(m, { x: m.x + rnd(-cw, cw) * 0.8, y: m.y + rnd(30, 90) }, 4, 12).d); }
        ds.forEach((d, i) => { const w = Math.max(2.5, cw * 0.045) * (i ? 0.55 : 1); path(svg, d, "bolt-glow", o.col, w * 2.6); path(svg, d, "bolt-core", "#fffbe6", w * 0.7); });
        anim(svg, [{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 0.2, offset: 0.25 }, { opacity: 1, offset: 0.36 }, { opacity: 0.55, offset: 0.62 }, { opacity: 0 }], 380 * K(), { easing: "linear" });
        flash(b.x, b.y, cw * 1.5, o.col, 340); flash(b.x, b.y, cw * 0.7, "#ffffff", 160);
        sparks(b.x, b.y, { n: 12, col: o.col, size: Math.max(3, cw * 0.04), dist: cw * 0.85, dur: 420, cls: "p-streak", face: true });
        shake(el, 8); glow(el, o.col, 300);
        if (!o.blocked) snd("sp_zap", o.v); else block(b, cw, el);
      }, 0);
    } },
    steel: { at: o => o.fl * 0.7, run(a, b, r, el, o) {   // 무쇠수염 드워프: 리벳이 곧게 박힘 + 불꽃
      const cw = r.width, T = this.at(o);
      const rv = mk("sfx-rivet", a.x, a.y, { "--z": px(Math.max(8, cw * 0.09)) });
      fly(rv, a, b, T, { face: true, ease: "cubic-bezier(.5,0,.9,.6)" });
      later(() => {
        flash(b.x, b.y, cw * 0.9, "#e6edf5", 240);
        sparks(b.x, b.y, { n: 14, col: "#ffe7a0", size: 3, dist: cw * 0.9, dur: 480, grav: cw * 0.6, cls: "p-streak", face: true });
        shake(el, 7); glow(el, "#e6edf5", 220);
        if (!o.blocked) snd("sp_clang", o.v); else block(b, cw, el);
      }, T);
    } },
    rock: { at: o => o.fl * 1.05, run(a, b, r, el, o) {   // 바위주먹 오크: 바위가 돌며 날아가 부서짐
      const cw = r.width, T = this.at(o);
      const rk = mk("sfx-rock", a.x, a.y, { "--z": px(Math.max(20, cw * 0.32)) });
      fly(rk, a, b, T, { arc: Math.min(200, Math.hypot(b.x - a.x, b.y - a.y) * 0.4 + 60), spin: 620, ease: "cubic-bezier(.35,.1,.65,1)", trail: (x, y) => puff(x, y, cw * 0.12, "#7a5d40", 420, 4) });
      later(() => {
        flash(b.x, b.y, cw * 1.1, o.col, 300);
        sparks(b.x, b.y, { n: 10, col: "#9a7350", size: Math.max(5, cw * 0.07), dist: cw * 0.9, dur: 620, grav: cw * 0.9, cls: "p-sq", spin: 300 });
        for (let i = 0; i < 4; i++) puff(b.x + rnd(-cw, cw) * 0.35, b.y + r.height * 0.15, cw * 0.5, "#6e5a45", 760, -cw * 0.2);
        shake(el, 11); quakeScreen(5);
        if (!o.blocked) snd("sp_rock", o.v); else block(b, cw, el);
      }, T);
    } },
    quake: { at: () => 50 * K(), run(a, b, r, el, o) {   // 대지 진동·붕괴: 대상 발밑이 갈라지고 흙먼지
      const cw = r.width;
      later(() => {
        const svg = svgLayer(), base = { x: b.x, y: r.bottom - r.height * 0.1 };
        for (let i = 0; i < 6; i++) {
          const ang = (-180 + i * 36 + rnd(-12, 12)) * Math.PI / 180, L = cw * rnd(0.45, 0.8);
          const d = jag(base, { x: base.x + Math.cos(ang) * L, y: base.y + Math.abs(Math.sin(ang)) * L * 0.25 }, 5, 7).d;
          path(svg, d, "crack-glow", o.col, 5); path(svg, d, "crack", "#1a1008", 2.4);
        }
        anim(svg, [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], 900 * K(), { easing: "ease-out" });
        for (let i = 0; i < 5; i++) puff(base.x + rnd(-0.5, 0.5) * cw, base.y, cw * rnd(0.4, 0.65), "#7a6045", 900, -cw * 0.35);
        sparks(base.x, base.y, { n: 8, col: "#8a6a48", size: Math.max(4, cw * 0.05), dist: cw * 0.7, dur: 600, grav: cw * 0.8, cls: "p-sq", ang: -90, spread: 70, spin: 200 });
        shake(el, 14);
        if (!o.blocked) snd("sp_quake", o.v); else block(b, cw, el);
      }, 0);
    } },
    thorn: { at: () => 150 * K(), run(a, b, r, el, o) {   // 이끼 트롤: 발밑에서 가시 덩굴이 솟아 찌름
      const cw = r.width, k = K();
      for (let i = 0; i < 5; i++) {
        const x = r.left + r.width * (0.14 + i * 0.18 + rnd(-0.04, 0.04)), h = r.height * rnd(0.5, 0.9);
        const t = mk("sfx-thorn", x, r.bottom + r.height * 0.04, { "--w": px(cw * rnd(0.12, 0.17)), "--h": px(h) });
        const rot = rnd(-16, 16).toFixed(0) + "deg";
        anim(t, [{ scale: "1 0", rotate: rot, opacity: 1 }, { offset: 0.22, scale: "1 1.12", rotate: rot }, { offset: 0.34, scale: "1 1", rotate: rot }, { offset: 0.8, scale: "1 1", opacity: 1, rotate: rot }, { scale: "0.6 0", opacity: 0, rotate: rot }], 700 * k, { easing: "cubic-bezier(.2,.8,.3,1)", delay: i * 22 * k });
      }
      later(() => {
        sparks(b.x, b.y, { n: 9, col: o.col, size: Math.max(6, cw * 0.07), dist: cw * 0.8, dur: 700, grav: cw * 0.4, cls: "p-leaf", spin: 360 });
        shake(el, 8); glow(el, o.col, 260);
        if (!o.blocked) snd("sp_thorn", o.v); else block(b, cw, el);
      }, 150 * k);
    } },
    arrows: { at: () => 300 * K(), run(a, b, r, el, o) {   // 화살비: 화살이 왼쪽 위에서 비처럼 쏟아짐
      const cw = r.width, k = K();
      for (let i = 0; i < 6; i++) {
        const to = { x: r.left + r.width * rnd(0.15, 0.85), y: r.top + r.height * rnd(0.3, 0.8) };
        const from = { x: to.x - innerHeight * 0.32, y: to.y - innerHeight * 0.62 };
        later(() => {
          const ar = mk("sfx-arrow", from.x, from.y, { "--w": px(Math.max(34, cw * 0.42)) });
          fly(ar, from, to, 300 * k, { face: true, ease: "cubic-bezier(.4,0,1,.8)" });
          later(() => { puff(to.x, to.y, cw * 0.18, "#7a6a50", 380, -4); snd("sp_thunk", 0.5); }, 300 * k);
        }, i * 55 * k);
      }
      later(() => { shake(el, 6); if (o.blocked) block(b, cw, el); }, 300 * k);
    } },
    water: { at: o => o.fl, run(a, b, r, el, o) {   // 푸른비늘 인어: 물덩이가 날아가 첨벙
      const cw = r.width, T = this.at(o);
      const w = mk("sfx-orb", a.x, a.y, { "--c": o.col, "--z": px(Math.max(18, cw * 0.28)) });
      fly(w, a, b, T, { arc: 90, ease: "cubic-bezier(.4,.1,.6,1)", scale: [0.8, 1.1], every: 34, trail: (x, y) => sparks(x, y, { n: 1, col: "#bfe9ff", size: 5, dist: cw * 0.12, dur: 420, grav: cw * 0.35, cls: "p-ring" }) });
      later(() => splash(b, r, el, o), T);
    } },
    wave: { at: () => 240 * K(), run(a, b, r, el, o) {   // 해일·조수: 물마루가 대상을 덮치며 지나감
      const cw = r.width, k = K(), dir = a && a.x > b.x ? -1 : 1;
      const wv = mk("sfx-wave", b.x - dir * cw * 0.9, b.y, { "--c": o.col, "--w": px(cw * 1.5), "--h": px(r.height * 0.85) });
      if (dir < 0) wv.style.scale = "-1 1";
      anim(wv, [{ translate: "0px 0px", opacity: 0 }, { offset: 0.2, opacity: 0.95 }, { offset: 0.75, opacity: 0.9 }, { translate: `${px(dir * cw * 1.9)} 0px`, opacity: 0 }], 560 * k, { easing: "cubic-bezier(.3,.2,.4,1)" });
      later(() => splash(b, r, el, o), 240 * k);
    } },
    shadow: { at: o => o.fl * 1.1, run(a, b, r, el, o) {   // 심연 마족: 어둠 덩이가 구불구불 날아가 할퀴고 빨려 듦
      const cw = r.width, T = this.at(o);
      const v = mk("sfx-void", a.x, a.y, { "--c": o.col, "--z": px(Math.max(18, cw * 0.28)) });
      fly(v, a, b, T, { wob: Math.min(60, cw * 0.5), wobN: 2, ease: "cubic-bezier(.45,.05,.55,.95)", every: 28, trail: (x, y) => sparks(x, y, { n: 1, col: o.col, size: Math.max(8, cw * 0.1), dist: cw * 0.1, dur: 520, cls: "p-wisp" }) });
      later(() => {
        if (typeof slash === "function") slash(b.x, b.y, Math.max(120, cw * 1.3), o.col);
        ring(b.x, b.y, cw * 1.5, FXC.curse, 520, { cls: "dark", from: 1.4, to: 0.2, ease: "cubic-bezier(.6,0,.4,1)" });
        sparks(b.x, b.y, { n: 10, col: o.col, size: Math.max(6, cw * 0.08), dist: cw * 0.7, dur: 560, cls: "p-wisp" });
        shake(el, 9); glow(el, o.col, 360, true);
        if (!o.blocked) snd("sp_slash", o.v); else block(b, cw, el);
      }, T);
    } },
    blood: { at: o => o.fl * 0.85, run(a, b, r, el, o) {   // 피의 칼날·영혼 착취: 붉은 초승달 칼날이 돌며 날아가 벰
      const cw = r.width, T = this.at(o);
      const c = mk("sfx-crescent", a.x, a.y, { "--c": o.col, "--z": px(Math.max(26, cw * 0.5)) });
      fly(c, a, b, T, { arc: 40, spin: 1080, ease: "cubic-bezier(.3,.1,.7,1)", every: 30, trail: (x, y) => sparks(x, y, { n: 1, col: o.col, size: 4, dist: cw * 0.1, dur: 420, grav: cw * 0.4, cls: "p-drop" }) });
      later(() => {
        if (typeof slash === "function") { slash(b.x, b.y, Math.max(130, cw * 1.4), o.col); later(() => slash(b.x, b.y, Math.max(110, cw * 1.2), "#ff7a8a"), 70 * K()); }
        sparks(b.x, b.y, { n: 12, col: o.col, size: Math.max(4, cw * 0.05), dist: cw * 0.7, dur: 620, grav: cw * 0.9, cls: "p-drop" });
        shake(el, 10); glow(el, o.col, 300);
        if (!o.blocked) snd("sp_slash", o.v); else block(b, cw, el);
      }, T);
    } },
    holy: { at: () => 180 * K(), run(a, b, r, el, o) {   // 성광 천족: 하늘에서 빛기둥이 내리꽂힘
      const cw = r.width, k = K(), w = cw * 0.8;
      const p = mk("sfx-pillar", b.x - w / 2, 0, { "--c": o.col, "--w": px(w), "--h": px(r.bottom - r.height * 0.05) });
      anim(p, [{ scale: "1 0", opacity: 0.9 }, { offset: 0.2, scale: "1 1", opacity: 1 }, { offset: 0.55, scale: "1.25 1", opacity: 0.8 }, { scale: "0.2 1", opacity: 0 }], 720 * k, { easing: "cubic-bezier(.3,.7,.3,1)" });
      later(() => {
        ring(b.x, r.bottom - r.height * 0.08, cw * 1.6, o.col, 520, { cls: "ell", from: 0.3, to: 1.3 });
        flash(b.x, b.y, cw * 1.4, o.col, 380); flash(b.x, b.y, cw * 0.6, "#ffffff", 180);
        rise(r, { n: 8, col: o.col, size: Math.max(6, cw * 0.06), dur: 700, cls: "p-dia", spread: 120 });
        shake(el, 8); glow(el, o.col, 320);
        if (!o.blocked) snd("sp_smite", o.v); else block(b, cw, el);
      }, 180 * k);
    } },
    spear: { at: () => 240 * K(), run(a, b, r, el, o) {   // 천벌의 창·태양의 창: 빛의 창이 비스듬히 꽂힘
      const cw = r.width, k = K(), from = { x: b.x - innerHeight * 0.35, y: b.y - innerHeight * 0.55 };
      const s = mk("sfx-spear", from.x, from.y, { "--c": o.col, "--w": px(Math.max(80, cw * 1.1)) });
      fly(s, from, b, 240 * k, { face: true, ease: "cubic-bezier(.6,0,1,.6)" });
      later(() => {
        flash(b.x, b.y, cw * 1.5, o.col, 380);
        const st = mk("sfx-star", b.x, b.y, { "--c": o.col, "--s": px(cw * 1.6) });
        anim(st, [{ scale: "0.2", rotate: "0deg", opacity: 1 }, { offset: 0.3, scale: "1", opacity: 1 }, { scale: "1.2", rotate: "45deg", opacity: 0 }], 520 * k);
        shake(el, 10); glow(el, o.col, 300);
        if (!o.blocked) snd("sp_smite", o.v); else block(b, cw, el);
      }, 240 * k);
    } },
    wind: { at: o => o.fl + 70 * K(), run(a, b, r, el, o) {   // 폭풍 하이엘프: 바람 칼날 두 개가 휘어 날아가 휘감음
      const cw = r.width, T = o.fl, k = K();
      for (let i = 0; i < 2; i++) later(() => {
        const bl = mk("sfx-crescent wind", a.x, a.y, { "--c": o.col, "--z": px(Math.max(24, cw * 0.42)) });
        fly(bl, a, b, T, { wob: (i ? -1 : 1) * Math.min(50, cw * 0.45), wobN: 1, spin: 900, ease: "cubic-bezier(.35,.1,.6,1)" });
      }, i * 70 * k);
      later(() => {
        ring(b.x, b.y, cw * 1.3, o.col, 520, { cls: "swirl", from: 0.4, to: 1.2, rot: 220 });
        ring(b.x, b.y, cw * 0.9, "#e9fffb", 460, { cls: "swirl", from: 0.6, to: 1.1, rot: -260, delay: 60 * k });
        sparks(b.x, b.y, { n: 10, col: "#e9fffb", size: 4, dist: cw * 0.8, dur: 460, cls: "p-streak", face: true });
        shake(el, 7);
        if (!o.blocked) snd("sp_gust", o.v); else block(b, cw, el);
      }, T + 70 * k);
    } }
  };
  function splash(b, r, el, o) {
    const cw = r.width;
    ring(b.x, b.y, cw * 1.4, o.col, 520, { from: 0.3 });
    flash(b.x, b.y, cw * 1.2, "#bfe9ff", 300);
    sparks(b.x, b.y, { n: 14, col: "#bfe9ff", size: Math.max(4, cw * 0.05), dist: cw * 0.9, dur: 640, grav: cw * 0.8, cls: "p-ring", ang: -90, spread: 110 });
    shake(el, 8); glow(el, o.col, 280);
    if (!o.blocked) snd("sp_splash", o.v); else block(b, cw, el);
  }

  /* ---------- 강화·약화·보호막·회복 ---------- */
  function mote(a, b, col, ms, dark) {
    const m = mk("sfx-mote" + (dark ? " dark" : ""), a.x, a.y, { "--c": col });
    fly(m, a, b, ms, { arc: 50, ease: "cubic-bezier(.4,.1,.5,1)", every: 34, trail: (x, y) => sparks(x, y, { n: 1, col, size: 4, dist: 10, dur: 300, cls: dark ? "p-wisp" : "" }) });
  }
  function aura(el, r, th) {
    const k = K(), base = { x: r.left + r.width / 2, y: r.bottom - r.height * 0.04 };
    const c = mk("sfx-col", base.x, base.y, { "--c": th.col, "--w": px(r.width * 0.95), "--h": px(r.height * 1.12) });
    anim(c, [{ scale: "1 0.1", opacity: 0 }, { offset: 0.3, scale: "1 1", opacity: 0.9 }, { scale: "1.15 1.08", opacity: 0 }], 780 * k);
    ring(base.x, base.y, r.width * 1.25, th.col, 600, { cls: "ell", from: 0.3, to: 1.2 });
    rise(r, { n: 11, col: th.col, size: Math.max(5, r.width * 0.055), dur: 760, cls: P_OF_EL[th.el] || "" });
    glow(el, th.col, 620);
  }
  function curse(el, r, th) {
    const k = K(), top = { x: r.left + r.width / 2, y: r.top + r.height * 0.02 };
    const c = mk("sfx-col down", top.x, top.y, { "--c": th.col, "--w": px(r.width * 0.95), "--h": px(r.height * 1.0) });
    anim(c, [{ scale: "1 0.1", opacity: 0 }, { offset: 0.35, scale: "1 1", opacity: 0.85 }, { scale: "0.9 1", opacity: 0 }], 800 * k);
    ring(r.left + r.width / 2, r.top + r.height / 2, r.width * 1.3, th.col, 640, { cls: "dark", from: 1.3, to: 0.35, ease: "cubic-bezier(.6,0,.4,1)" });
    rise(r, { n: 9, col: "#7a54b8", size: Math.max(7, r.width * 0.07), dur: 760, cls: "p-wisp", down: true });
    glow(el, th.col, 700, true);
  }
  function bubble(el, r, col) {
    const k = K(), c = ctr(r), s = Math.max(r.width, r.height) * 1.08;
    const bb = mk("sfx-bubble", c.x, c.y, { "--c": col, "--s": px(s) });
    anim(bb, [{ scale: "0.4", opacity: 0 }, { offset: 0.25, scale: "1.08", opacity: 1 }, { offset: 0.4, scale: "1", opacity: 1 }, { offset: 0.78, scale: "1", opacity: 0.85 }, { scale: "1.12", opacity: 0 }], 980 * k);
    sparks(c.x, c.y, { n: 8, col, size: Math.max(5, r.width * 0.05), dist: s * 0.55, dur: 600, cls: "p-dia", delay: 120 * k });
  }
  function heal(el, r) {
    const c = ctr(r);
    ring(c.x, c.y, Math.max(r.width, r.height) * 1.5, FXC.heal, 620, { from: 0.4, to: 1.2 });
    rise({ left: r.left - r.width * 0.3, right: r.right + r.width * 0.3, top: r.top - r.height * 0.4, bottom: r.bottom + r.height * 0.2, width: r.width * 1.6, height: r.height * 1.6 }, { n: 12, col: FXC.heal, size: 7, dur: 800, cls: "p-dia" });
    glow(el, FXC.heal, 600);
  }
  function bleed(el, r) {   // 대가: 생명에서 핏방울이 떨어진다
    const c = ctr(r);
    ring(c.x, c.y, Math.max(r.width, r.height) * 1.4, FXC.blood, 520, { cls: "dark", from: 1.2, to: 0.5 });
    sparks(c.x, c.y, { n: 9, col: FXC.blood, size: 6, dist: Math.max(r.width, 40) * 0.8, dur: 720, grav: 70, cls: "p-drop", ang: 90, spread: 70 });
    glow(el, FXC.blood, 500, true);
  }

  /* ---------- 마법이 뒤집힐 때 ---------- */
  const RUNE_SVG = `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 2.2"/><circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" stroke-width=".6"/><circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width=".5" stroke-dasharray="10 4"/>${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180, x = 50 + Math.cos(a) * 45.5, y = 50 + Math.sin(a) * 45.5; return i % 3 ? `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r=".9" fill="currentColor"/>` : `<path d="M${x.toFixed(2)} ${(y - 2.6).toFixed(2)} L${(x + 1.8).toFixed(2)} ${y.toFixed(2)} L${x.toFixed(2)} ${(y + 2.6).toFixed(2)} L${(x - 1.8).toFixed(2)} ${y.toFixed(2)}Z" fill="currentColor"/>`; }).join("")}</svg>`;
  function reveal(uid, ms) {
    if (off()) return;
    const el = typeof uidEl === "function" ? uidEl(uid) : null; if (!el) return;
    const it = G.reg && G.reg[uid], th = themeOf(it ? it.id : null), k = K();
    const r = el.getBoundingClientRect(), c = ctr(r), S = Math.max(r.width, r.height) * 1.55 * 1.12;
    const rg = mk("sfx-runes", c.x, c.y, { "--c": th.col, "--s": px(S) });
    rg.innerHTML = RUNE_SVG;
    anim(rg, [
      { opacity: 0, scale: "0.55", rotate: "-50deg" },
      { offset: 0.24, opacity: 0.95, scale: "1", rotate: "0deg" },
      { offset: 0.78, opacity: 0.75, scale: "1.04", rotate: "55deg" },
      { opacity: 0, scale: "1.3", rotate: "85deg" }
    ], ms * 1.45, { easing: "ease-out" });
    for (let i = 0; i < 14; i++) {
      const a = rnd(0, Math.PI * 2), d = S * rnd(0.5, 0.75);
      const p = mk("sfx-p " + (P_OF_EL[th.el] || ""), c.x + Math.cos(a) * d, c.y + Math.sin(a) * d, { "--c": th.col, "--z": px(rnd(4, 8)) });
      anim(p, [{ translate: "0px 0px", opacity: 0, scale: "1" }, { offset: 0.3, opacity: 1 }, { translate: `${px(-Math.cos(a) * d)} ${px(-Math.sin(a) * d)}`, opacity: 0, scale: "0.3" }], ms * 0.5, { easing: "cubic-bezier(.5,0,.8,.5)", delay: rnd(0, ms * 0.3) });
    }
    snd("sp_reveal");
  }

  /* ---------- 마법 효과 한 수 ---------- */
  function cast(s, ctx) {
    const out = new Map();
    if (off() || !s || !s.floats || !s.floats.length) return out;
    const k = K(), fx = s.fx || {};
    const th = themeOf(fx.spell || (ctx && ctx.id));
    const srcEl = typeof uidEl === "function" ? uidEl(fx.shown || (ctx && ctx.uid)) : null;
    const src = srcEl ? ctr(srcEl.getBoundingClientRect()) : null;
    const dur = (s.dur || 450) * k;
    const fl = Math.min(440 * k, Math.max(170 * k, dur * 0.42));
    // 대상마다 무엇을 받았는지 (숫자의 class로 가른다)
    const by = new Map();
    for (const f of s.floats) {
      const key = String(f[0]), c = f[2] || "";
      const kind = /\bdmg\b/.test(c) ? "dmg" : /\bheal\b/.test(c) ? "heal" : /\bblock\b/.test(c) ? "block" : /\bshield\b/.test(c) ? "shield" : /\bdebuff\b/.test(c) ? "debuff" : /\bmiss\b/.test(c) ? "miss" : "buff";
      if (!by.has(key)) by.set(key, new Set());
      by.get(key).add(kind);
    }
    const heard = {};
    const once = (name, v, at) => { if (!name || heard[name]) return; heard[name] = 1; later(() => snd(name, v), at || 0); };
    const gap = (th.k === "quake" ? 35 : th.k === "bolt" ? 95 : 80) * k;
    const go = HIT[th.k] || HIT.wind;
    let n = 0;
    for (const [key, kinds] of by) {
      const life = /^(life|crys)/.test(key);
      const el = life ? document.getElementById(key) : (typeof uidEl === "function" ? uidEl(+key) : null);
      if (!el) continue;
      const r = el.getBoundingClientRect(), b = ctr(r);
      if (r.width < 2) continue;
      let at = 0;
      // v3.62.1 "block" = 보호막 · 가호가 피해를 막음: 공격은 대상까지 날아가고(막힘 연출), 남은 피해가 있으면(보호막 코인 절반) 맞은 뒤 막는 빛을 더한다
      const hitIt = kinds.has("dmg") || kinds.has("miss") || kinds.has("block");
      if (hitIt && !life) {
        const st = n * gap, o = { col: th.col, el: th.el, fl, blocked: !kinds.has("dmg"), v: n ? 0.65 : 1 };
        const a = src || { x: b.x, y: -60 };
        once(LAUNCH[th.k], 0.9);
        later(() => go.run(a, b, r, el, o), st);
        at = st + go.at(o);
        if (kinds.has("block") && kinds.has("dmg")) later(() => block(b, r.width, el), at);
        n++;
      } else if (hitIt && life && /^life/.test(key)) {
        bleed(el, r); once("sp_debuff", 0.6); at = 120 * k;
      }
      const viaMote = !hitIt && src && !life;
      const mt = viaMote ? 240 * k : 0;
      if (viaMote) mote(src, b, kinds.has("debuff") ? "#9b7ad8" : kinds.has("shield") ? FXC.shield : th.col, mt, kinds.has("debuff"));
      if (kinds.has("buff") && !hitIt) { later(() => aura(el, r, th), mt); once("sp_buff", 0.9, mt); at = Math.max(at, mt + 160 * k); }
      if (kinds.has("debuff")) { later(() => curse(el, r, th), mt); once("sp_debuff", 0.9, mt); at = Math.max(at, mt + 200 * k); }
      if (kinds.has("shield")) { later(() => bubble(el, r, th.k === "holy" ? th.col : FXC.shield), mt); once("sp_shield", 0.9, mt); at = Math.max(at, mt + 220 * k); }
      if (kinds.has("heal")) { later(() => (life ? heal(el, r) : aura(el, r, { col: FXC.heal, el: "light" })), mt); once("sp_heal", 0.9, mt); at = Math.max(at, mt + 150 * k); }
      out.set(key, at);
    }
    if (n && th.k === "bolt") screenFlash("#fff8d0", 0.22, 260);
    if (n && th.k === "quake") later(() => quakeScreen(11), 50 * k);
    return out;
  }

  /* v3.9.10 핸드에서 걸린 저주가 전장에서 드러날 때(js/game.js curseFx): 약화와 같은 어둠 + 암흑 원소색 */
  function hex(el) {
    if (off() || !el || !el.isConnected) return;
    curse(el, el.getBoundingClientRect(), { col: EL_COL.dark, el: "dark" });
    snd("sp_debuff", 0.9);
  }

  return { themeOf, reveal, cast, hex };
})();

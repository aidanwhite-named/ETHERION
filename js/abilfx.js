/* ETHERION — 능력 전용 연출 (2026-11-24): [연쇄] · [꿰뚫기] · [너울]
   엔진(js/engine.js)은 맞는 수에 표시만 남긴다 — attackOne의 맞는 수 fx.chain · fx.pierce = 남은 피해 · 꿰뚫은 피해를 받은 유닛 uid,
   mrSwell의 수 fx.swell = { by 너울 유닛, u 밀려난 유닛, w 앞으로 나온 유닛 }. 판 셈과 무관(연출만, Math.random 써도 됨).
   [연쇄]   쓰러진 유닛에서 다음 유닛으로 번개 불꽃 줄기가 튀어 간다. 닿는 때 = 수 길이 × CHAIN_AT (js/game.js runCombat이 그 유닛의 숫자 · 글자를 그때 바꿈)
   [꿰뚫기] 맞선 유닛을 뚫고 나온 빛의 창이 바로 뒤 유닛까지 뻗는다. 닿는 때 = × PIERCE_AT
   [너울]   물마루가 밀려난 유닛을 덮치며 지나가고, 카드는 물살에 들려 뒤로 미끄러진다(js/game.js flipAll의 kind "swell" · "swellIn" → animFrom)
   연출 단계(js/impact.js applyFx): 기본(저사양 · 중간) = 줄기 하나 · 불꽃 · 고리 / 고사양(fx-high) = 갈래 번개 · 잔광 · 충격 고리 · 물보라를 더함.
   연출 끄기(fx-off) · 움직임 줄이기 · 배속 0 · 화면 없는 대전이면 아무것도 그리지 않는다(RM()). 색은 친 유닛의 원소색(--el) */
"use strict";
const AbilFX = (() => {
  const CHAIN_AT = 0.5, PIERCE_AT = 0.4;
  const NS = "http://www.w3.org/2000/svg";
  const root = document.documentElement.classList;
  const rich = () => root.contains("fx-high") && !root.contains("mobile");
  const low = () => root.contains("fx-low");
  const off = () => (typeof RM === "function" && RM()) || typeof G === "undefined" || !G || !G.cfg || G.cfg.headless || G.speed === 0 || !fxLayer();
  const cOf = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; };
  const rnd = (a, b) => a + Math.random() * (b - a);
  const later = (fn, ms) => { const g = G; setTimeout(() => { if (G === g) fn(); }, Math.max(0, ms)); };
  function mk(cls, css, html) {
    const d = document.createElement("div"); d.className = cls;
    if (css) d.style.cssText = css;
    if (html) d.innerHTML = html;
    fxLayer().appendChild(d); return d;
  }
  function svgLayer(cls) {
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("class", "abx-svg " + (cls || ""));
    s.setAttribute("viewBox", `0 0 ${innerWidth} ${innerHeight}`);
    fxLayer().appendChild(s); return s;
  }
  function pathEl(svg, d, cls, col, w) {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d); p.setAttribute("class", cls);
    if (col) p.style.stroke = col;
    if (w) p.style.strokeWidth = w;
    svg.appendChild(p); return p;
  }
  /* 두 점 사이 들쭉날쭉한 줄기(위로 휜 활). bend: 휘는 높이(px), amp: 지그재그 세기 */
  function boltPts(a, b, n, amp, bend) {
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, arc = Math.sin(Math.PI * t) * bend, j = i && i < n ? rnd(-amp, amp) : 0;
      pts.push({ x: a.x + dx * t + nx * (arc + j), y: a.y + dy * t + ny * (arc + j) });
    }
    return pts;
  }
  const dOf = pts => "M" + pts.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L");
  function ring(x, y, size, col, ms, cls) {
    const r = mk("abx-ring " + (cls || ""), `left:${x}px;top:${y}px;--s:${size}px;--c:${col}`);
    r.animate([{ scale: "0.2", opacity: 0.95 }, { scale: "1", opacity: 0 }], { duration: ms, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }).onfinish = () => r.remove();
  }
  function sparks(x, y, n, col, dist, ang, spread, ms) {   // ang 방향으로 spread(도) 안에서 튀는 불티
    for (let i = 0; i < n; i++) {
      const a = (ang + rnd(-spread / 2, spread / 2)) * Math.PI / 180, d = dist * rnd(0.45, 1);
      const s = mk("abx-spark", `left:${x}px;top:${y}px;--c:${col}`);
      s.animate([{ translate: "0px 0px", scale: "1", opacity: 1 }, { translate: `${Math.cos(a) * d}px ${Math.sin(a) * d}px`, scale: "0.3", opacity: 0 }],
        { duration: ms * rnd(0.7, 1.1), easing: "cubic-bezier(.15,.7,.3,1)", fill: "forwards" }).onfinish = () => s.remove();
    }
  }
  const colOf = uid => { const el = uidEl(uid); return (el && el.style.getPropertyValue("--el")) || "#ffd27a"; };

  /* ---------- [연쇄] 쓰러진 맞선 유닛 → 다음 유닛: 튀어 가는 번개 불꽃 ---------- */
  function chain(actUid, fromUid, toUid, dur) {
    if (off()) return;
    const fe = uidEl(fromUid), te = uidEl(toUid); if (!fe || !te) return;
    const col = colOf(actUid), R = rich(), t0 = dur * 0.16, travel = dur * CHAIN_AT - t0;
    later(() => {
      if (!fe.isConnected && !te.isConnected) return;
      const a = cOf(fe), b = cOf(te.isConnected ? te : fe), L = Math.hypot(b.x - a.x, b.y - a.y);
      // 떠나는 자리: 쓰러진 카드에서 불꽃이 한 번 튄다
      ring(a.x, a.y, a.w * 0.9, col, 360);
      sparks(a.x, a.y, R ? 12 : 7, col, a.w * 0.55, Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI, 110, 420);
      const svg = svgLayer("abx-chain" + (low() ? " lo" : ""));
      const bend = -Math.min(70, L * 0.22), n = Math.max(6, Math.round(L / 26));
      const main = boltPts(a, b, n, 9, bend), d = dOf(main);
      const glow = low() ? null : pathEl(svg, d, "abx-bolt-glow", col);
      const core = pathEl(svg, d, "abx-bolt", col), hot = pathEl(svg, d, "abx-bolt-core");
      const len = core.getTotalLength ? core.getTotalLength() : L;
      for (const p of [glow, core, hot]) if (p) { p.style.strokeDasharray = `${len} ${len}`; p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: travel, easing: "cubic-bezier(.5,0,.75,1)", fill: "forwards" }); }
      // 머리: 줄기 끝을 달리는 불덩이
      const head = mk("abx-chain-head", `--c:${col}`);
      head.animate(main.map((p, i) => ({ left: p.x + "px", top: p.y + "px", offset: i / (main.length - 1) })), { duration: travel, easing: "cubic-bezier(.5,0,.75,1)", fill: "forwards" }).onfinish = () => head.remove();
      if (R) {   // 고사양: 곁가지 번개 둘 + 한 번 다시 번쩍
        for (let k = 0; k < 2; k++) {
          const br = pathEl(svg, dOf(boltPts(a, b, n, 16, bend * rnd(0.4, 1.5))), "abx-bolt thin", col);
          br.style.strokeDasharray = `${len * 1.1} ${len * 1.1}`;
          br.animate([{ strokeDashoffset: len * 1.1, opacity: 0.8 }, { strokeDashoffset: 0, opacity: 0.8 }, { opacity: 0 }], { duration: travel + 160, delay: 40 * k, easing: "ease-in", fill: "forwards" });
        }
        later(() => { if (core.isConnected) { const d2 = dOf(boltPts(a, b, n, 11, bend)); core.setAttribute("d", d2); hot.setAttribute("d", d2); if (glow) glow.setAttribute("d", d2); } }, travel + 70);
      }
      svg.animate([{ opacity: 1 }, { opacity: 1, offset: (travel + 60) / (travel + 300) }, { opacity: 0 }], { duration: travel + 300, fill: "forwards" }).onfinish = () => svg.remove();
      later(() => {   // 닿는 순간
        const c = te.isConnected ? cOf(te) : b;
        if (typeof burst === "function") burst(c.x, c.y, "hit", Math.max(90, c.w * 1.4), col);
        ring(c.x, c.y, c.w * 1.25, col, 420, "abx-ring-bolt");
        if (R) { ring(c.x, c.y, c.w * 1.9, col, 620); sparks(c.x, c.y, 14, col, c.w * 0.8, 0, 360, 520); }
        if (te.isConnected) { te.animate([{ filter: "brightness(1)" }, { filter: "brightness(2.1) saturate(1.4)", offset: 0.25 }, { filter: "brightness(1)" }], { duration: 360, easing: "ease-out" }); if (typeof shakeEl === "function") shakeEl(te, 8); }
      }, travel);
    }, t0);
  }

  /* ---------- [꿰뚫기] 맞선 유닛을 뚫고 나온 빛의 창이 바로 뒤 유닛까지 ---------- */
  function pierce(actUid, fromUid, toUid, dur) {
    if (off()) return;
    const fe = uidEl(fromUid), te = uidEl(toUid); if (!fe || !te) return;
    const col = colOf(actUid), R = rich(), t0 = dur * 0.1, travel = dur * PIERCE_AT - t0;
    later(() => {
      if (!te.isConnected) return;
      const a = cOf(fe.isConnected ? fe : te), b = cOf(te), dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, ang = Math.atan2(dy, dx) * 180 / Math.PI;
      // 뚫린 자리: 앞 유닛 등 쪽에서 빛이 터져 나온다
      ring(a.x, a.y, a.w * 0.7, col, 300, "abx-ring-hole");
      sparks(a.x + dx / L * a.w * 0.35, a.y + dy / L * a.w * 0.35, R ? 12 : 6, col, a.w * 0.6, ang, 50, 380);
      const th = Math.max(6, a.h * 0.07);
      const sp = mk("abx-spear" + (low() ? " lo" : ""), `left:${a.x}px;top:${a.y}px;width:${L}px;--th:${th}px;--c:${col};rotate:${ang.toFixed(1)}deg`, "<i></i>");
      sp.animate([{ scale: "0 1", opacity: 1, easing: "cubic-bezier(.5,0,.8,.6)" }, { scale: "1 1", opacity: 1, offset: travel / (travel + 300), easing: "ease-in" }, { scale: "1 0.15", opacity: 0, translate: `${dx * 0.06}px ${dy * 0.06}px` }],
        { duration: travel + 300, fill: "forwards" }).onfinish = () => sp.remove();   // 곡선은 키프레임마다(창이 닿을 때까지 또렷하게)
      if (R) {   // 고사양: 창 둘레 넓은 잔광 + 길을 따라 터지는 작은 충격 고리
        const gl = mk("abx-spear glow", `left:${a.x}px;top:${a.y}px;width:${L}px;--th:${th * 4}px;--c:${col};rotate:${ang.toFixed(1)}deg`);
        gl.animate([{ scale: "0 1", opacity: 0.55, easing: "cubic-bezier(.5,0,.8,.6)" }, { scale: "1 1", opacity: 0.55, offset: travel / (travel + 420), easing: "ease-out" }, { scale: "1 1.6", opacity: 0 }], { duration: travel + 420, fill: "forwards" }).onfinish = () => gl.remove();
        for (let k = 1; k <= 3; k++) later(() => ring(a.x + dx * k / 4, a.y + dy * k / 4, th * 7, col, 380, "abx-ring-thin"), travel * k / 4);
      }
      later(() => {   // 닿는 순간: 창끝이 꽂혀 뒤 유닛이 같은 쪽으로 밀린다
        if (!te.isConnected) return;
        const c = cOf(te);
        if (typeof burst === "function") burst(c.x, c.y, "hit", Math.max(90, c.w * 1.3), col);
        ring(c.x, c.y, c.w * 1.1, col, 380, "abx-ring-hole");
        sparks(c.x, c.y, R ? 14 : 8, col, c.w * 0.7, ang, R ? 120 : 80, 460);
        const k = Math.min(18, c.w * 0.14);
        te.animate([{ translate: "0px 0px", filter: "brightness(1)" }, { translate: `${dx / L * k}px ${dy / L * k}px`, filter: "brightness(1.9)", offset: 0.2 }, { translate: "0px 0px", filter: "brightness(1)" }], { duration: 380, easing: "cubic-bezier(.2,.7,.3,1)", composite: "add" });
        te.classList.add("struck");
      }, travel);
    }, t0);
  }

  /* ---------- [너울] 물마루가 밀려난 유닛을 덮치며 지나간다 ----------
     rs = { a: 밀려난 유닛의 옛 자리, b: 새 자리 } (flipAll이 남긴 rect). 카드 움직임은 animFrom "swell" · "swellIn" */
  const WAVE_SVG = '<svg viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="abxSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8fdff" stop-opacity=".95"/><stop offset=".35" stop-color="#5fe0ee" stop-opacity=".85"/><stop offset="1" stop-color="#0f6f96" stop-opacity="0"/></linearGradient></defs>'
    + '<path d="M0 120 C30 104 46 70 84 46 C116 26 150 18 172 30 C188 39 186 58 170 60 C156 61 152 48 162 44 C140 40 118 58 104 82 C94 100 70 114 0 120Z" fill="url(#abxSea)"/>'
    + '<path d="M84 46 C116 26 150 18 172 30 C188 39 186 58 170 60" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/></svg>';
  function swell(info, dur, rs) {
    if (off() || !info) return;
    const ue = uidEl(info.u); if (!ue) return;
    const R = rich(), now = cOf(ue);
    const A = rs && rs.a ? { x: rs.a.left + rs.a.width / 2, y: rs.a.top + rs.a.height / 2, w: rs.a.width, h: rs.a.height } : now;
    const B = rs && rs.b ? { x: rs.b.left + rs.b.width / 2, y: rs.b.top + rs.b.height / 2 } : now;
    let dx = B.x - A.x, dy = B.y - A.y; if (Math.hypot(dx, dy) < 4) { dx = 1; dy = 0; }
    const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, ang = Math.atan2(uy, ux) * 180 / Math.PI, flip = Math.abs(ang) > 90;
    const w = A.w * 1.5, h = A.h * 0.9, go = Math.max(dur * 0.95, 520);
    if (typeof sfx === "function") sfx("sc_wave", 0.45);
    const mkWave = (delay, sc, op) => {
      const wv = mk("abx-wave" + (low() ? " lo" : ""), `left:${A.x - w / 2}px;top:${A.y - h * 0.55}px;width:${w}px;height:${h}px;rotate:${flip ? ang - 180 : ang}deg`, `<div style="transform:scaleX(${flip ? -1 : 1})">${WAVE_SVG}</div>`);
      const sx = -ux * A.w * 0.9, sy = -uy * A.w * 0.9, ex = dx + ux * A.w * 0.35, ey = dy + uy * A.w * 0.35;
      wv.animate([
        { translate: `${sx}px ${sy}px`, scale: `${0.5 * sc} ${0.4 * sc}`, opacity: 0 },
        { offset: 0.22, translate: `${sx * 0.3}px ${sy * 0.3}px`, scale: `${sc} ${sc}`, opacity: op },
        { offset: 0.7, translate: `${ex * 0.85}px ${ey * 0.85}px`, scale: `${sc * 1.05} ${sc * 0.95}`, opacity: op },
        { translate: `${ex}px ${ey}px`, scale: `${sc * 1.1} ${sc * 0.5}`, opacity: 0 }
      ], { duration: go, delay, easing: "cubic-bezier(.35,.1,.35,1)", fill: "both" }).onfinish = () => wv.remove();
    };
    mkWave(0, 1, 0.95);
    if (R) mkWave(go * 0.16, 0.75, 0.6);   // 고사양: 뒤따르는 둘째 물결
    // 물보라: 덮치는 순간(앞자리) · 내려앉는 순간(새 자리)
    const foam = (x, y, n, a0, spread, at) => later(() => sparks(x, y, n, "#dffbff", A.w * 0.55, a0, spread, 520), at);
    foam(A.x - ux * A.w * 0.3, A.y - uy * A.w * 0.3, R ? 14 : 8, ang - 90, 140, go * 0.2);
    foam(B.x + ux * A.w * 0.3, B.y + uy * A.w * 0.3, R ? 12 : 6, ang, 160, go * 0.78);
    if (R) {   // 고사양: 두 자리에 납작한 물결 고리
      later(() => ring(A.x, A.y + A.h * 0.35, A.w * 1.4, "#7ae8f4", 640, "abx-ring-flat"), go * 0.25);
      later(() => ring(B.x, B.y + A.h * 0.35, A.w * 1.4, "#7ae8f4", 640, "abx-ring-flat"), go * 0.8);
    }
    ue.classList.add("abx-wet"); later(() => ue.classList.remove("abx-wet"), go + 300);
  }
  return { CHAIN_AT, PIERCE_AT, chain, pierce, swell };
})();

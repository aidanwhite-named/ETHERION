/* ETHERION — 화면: 타이틀, 입장, 대기실(덱·채팅), 덱 조정실, 관리자 보관소 */
"use strict";

const App = { screen: null, lobbyGroup: null };

/* ---------- 배경 (에테르 입자) ---------- */
const Bg = {
  cv: null, ctx: null, motes: [], stars: [], mode: "title", raf: 0, w: 0, h: 0, mx: 0, my: 0, reduced: false,
  init() {
    this.cv = $("#bg-canvas"); this.ctx = this.cv.getContext("2d");
    this.reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rs = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.w = innerWidth; this.h = innerHeight;
      this.cv.width = this.w * dpr; this.cv.height = this.h * dpr; this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.stars = Array.from({ length: Math.round(this.w * this.h / 5200) }, () => ({ x: Math.random() * this.w, y: Math.random() * this.h * 0.8, r: Math.random() * 1.2 + 0.2, p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.005 }));
      this.stillDrawn = false;   // 멈춘 하늘도 창 크기가 바뀌면 한 번 다시 그린다
    };
    rs(); addEventListener("resize", rs);
    addEventListener("pointermove", e => { this.mx = e.clientX / this.w - 0.5; this.my = e.clientY / this.h - 0.5; });
    for (let i = 0; i < 90; i++) this.motes.push(this.mote(true));
    const loop = () => { this.draw(); this.raf = requestAnimationFrame(loop); };
    loop();
    if (typeof Titans !== "undefined") Titans.init(); /* 배경의 세 존재 (js/titans.js) */
  },
  mote(any) {
    const hues = ["255,214,140", "140,220,255", "200,170,255", "255,180,120"];
    return { x: Math.random() * this.w, y: any ? Math.random() * this.h : this.h + 10, r: Math.random() * 2.2 + 0.4, v: Math.random() * 0.45 + 0.12, sway: Math.random() * 6.28, c: pick(hues), a: Math.random() * 0.6 + 0.25 };
  },
  /* 빛방울 그림은 색마다 한 번만 만든다 (프레임마다 그라데이션을 새로 만들면 느리다) */
  moteSprite(c) {
    this.sprites = this.sprites || {};
    if (this.sprites[c]) return this.sprites[c];
    const cv = document.createElement("canvas"); cv.width = cv.height = 64;
    const x = cv.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, `rgba(${c},1)`); g.addColorStop(1, `rgba(${c},0)`);
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return this.sprites[c] = cv;
  },
  set(mode) { this.still = false; this.mode = mode; this.cv.style.opacity = mode === "off" ? 0 : mode === "calm" ? 0.55 : 1; if (typeof Titans !== "undefined") Titans.mode(mode); },
  /* v3.9 멈춘 하늘(상점): 별과 입자를 지금 자리에서 한 번만 그리고 더는 그리지 않는다. 다음 Bg.set에서 풀린다 */
  freeze() { this.still = true; this.stillDrawn = false; },
  draw() {
    const { ctx, w, h } = this;
    if (this.mode === "off") return;
    if (this.still) { if (this.stillDrawn) return; this.stillDrawn = true; }
    ctx.clearRect(0, 0, w, h);
    const t = performance.now() / 1000;
    const wp = this.warp || 0, pl = this.pull || 0, cx = this.cx || w / 2, cy = this.cy || h * 0.46;
    for (const s of this.stars) {
      const a = 0.35 + 0.45 * Math.sin(t * 2 * s.s * 30 + s.p);
      if (wp > 0.01) {
        /* 입장 연출: 별이 가운데에서 바깥으로 흐른다(문 안으로 날아드는 느낌) */
        const dx = s.x - cx, dy = s.y - cy, k = 0.012 + wp * 0.07;
        s.x += dx * k; s.y += dy * k;
        if (s.x < -40 || s.x > w + 40 || s.y < -40 || s.y > h + 40) { const an = Math.random() * 6.283, r0 = Math.random() * 60 + 8; s.x = cx + Math.cos(an) * r0; s.y = cy + Math.sin(an) * r0; continue; }
        ctx.strokeStyle = `rgba(235,228,255,${Math.min(1, a + wp * 0.5)})`; ctx.lineWidth = s.r * (1 + wp);
        ctx.beginPath(); ctx.moveTo(s.x - dx * wp * 0.22, s.y - dy * wp * 0.22); ctx.lineTo(s.x, s.y); ctx.stroke();
        continue;
      }
      ctx.fillStyle = `rgba(230,225,255,${a * 0.8})`;
      ctx.beginPath(); ctx.arc(s.x + this.mx * -8, s.y + this.my * -6, s.r, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = "lighter";
    for (const m of this.motes) {
      if (!this.reduced && !this.still) { m.y -= m.v; m.sway += 0.01; m.x += Math.sin(m.sway) * 0.3; }
      if (pl > 0.01) {
        /* 입장 연출: 에테르 입자가 소용돌이치며 문으로 빨려 든다 */
        const dx = cx - m.x, dy = cy - m.y, dist = Math.hypot(dx, dy) || 1, f = pl * (2 + 900 / (dist + 60));
        m.x += (dx / dist * 0.8 + -dy / dist * 0.9) * f; m.y += (dy / dist * 0.8 + dx / dist * 0.9) * f;
        if (dist < 14) Object.assign(m, this.mote(true), { y: Math.random() < 0.5 ? -10 : h + 10 });
      }
      if (m.y < -10 && pl <= 0.01) Object.assign(m, this.mote(false));
      const px = m.x + this.mx * 18 * m.r, py = m.y + this.my * 12 * m.r;
ctx.globalAlpha = m.a; const R = m.r * 6; ctx.drawImage(this.moteSprite(m.c), px - R, py - R, R * 2, R * 2); ctx.globalAlpha = 1;
    }
    ctx.globalCompositeOperation = "source-over";
  }
};

/* ---------- 타이틀 ---------- */
const SEATS = [
  { ang: 0,   el: "earth",     name: "GORBAS" },
  { ang: 45,  el: "wind",      name: "SYREL" },
  { ang: 90,  el: null,        name: "?" },
  { ang: 135, el: "fire",      name: "IGNAL" },
  { ang: 180, el: "water",     name: "MARENSIA" },
  { ang: 225, el: "forest",    name: "VERDAN" },
  { ang: 270, el: "metal",     name: "FEROS" },
  { ang: 315, el: "lightning", name: "ASTRAK" }
];
/* v2.7 에테리온 문장 — 근원신 아르케가 나눈 에테르의 세 갈래(docs/WORLD.md 1장)를 한 문장에.
   바깥 테 = 거인 일곱(몸, 세계의 틀, 구리빛 돌) · 고리 = 용 일곱(힘, 원소색 보석, 동쪽 여덟 번째 자리는 비어 ?) · 가운데 = 신 다섯(뜻, 보라 별과 금빛 끝점) · 한가운데 = 아르케.
   거인은 7등분, 용은 8방위라 두 겹의 자리가 서로 맞지 않는다(셋은 동격, 서로 다른 짜임). 타이틀(ringSVG)과 코인 앞면(COIN_CREST)이 같은 짜임을 쓴다. */
const SIGIL = {
  GIANTS: ["ORDUUN", "THALAKUS", "AURAGON", "DORMAK", "SORGRIM", "KERAUN", "ASHAR"],
  GODS: ["SOLANTE", "MORKAS", "SYLVARE", "VELUMIR", "KRONEA"],
  f: n => +n.toFixed(2),
  pt(deg, r) { const a = (deg - 90) * Math.PI / 180; return [this.f(Math.cos(a) * r), this.f(Math.sin(a) * r)]; },
  arc(a0, a1, R) { const [x0, y0] = this.pt(a0, R), [x1, y1] = this.pt(a1, R); return `M${x0},${y0}A${R},${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1},${y1}`; },
  // 거인의 돌: r0~r1 사이, 각도 폭 w0(안)·w1(밖)인 쐐기
  stone(a, r0, r1, w0, w1) { const p = [this.pt(a - w0, r0), this.pt(a - w1, r1), this.pt(a + w1, r1), this.pt(a + w0, r0)]; return "M" + p.map(q => q.join(",")).join("L") + "Z"; },
  // 신의 별: 꼭짓점 다섯(위가 0°), 안쪽 오각형 꼭짓점
  star(r, ri) { const out = [0, 1, 2, 3, 4].map(k => this.pt(k * 72, r)), inn = [0, 1, 2, 3, 4].map(k => this.pt(36 + k * 72, ri)); return { out, inn }; }
};

/* 타이틀 고리 (viewBox -270..270). .seat · .seat.empty(첫 circle) · .runes · .ring-rot는 입장 연출(css)과 지도 비밀(kailan.js armTitle)이 쓴다 */
function ringSVG() {
  const S = SIGIL, R = 176, f = S.f;
  const GOLD = "#d9b46a", HI = "#f6e2a8", BRASS = "#d4893a", BRASS_DEEP = "#3a2412", ARC = "#a57ae6";   // 금 · 금빛 끝 · 거인(아다만트 --brass, 짙은 바탕) · 신(비술 --arcane)
  // 용 일곱 (힘)
  const seats = SEATS.map((s, k) => {
    const [x, y] = S.pt(s.ang, R), [lx, ly] = S.pt(s.ang, R + 23);
    if (!s.el) return `<g class="seat empty" style="--k:${k}"><circle cx="${x}" cy="${y}" r="12" fill="#07080d" fill-opacity=".6" stroke="#6d6a80" stroke-dasharray="2 3"/><text x="${x}" y="${f(y + 5)}" text-anchor="middle">?</text></g>`;
    const col = ELEMENTS[s.el].color;
    return `<g class="seat" style="--c:${col};--k:${k}"><circle cx="${x}" cy="${y}" r="24" fill="url(#seatGlow)" style="color:${col}" opacity=".9"/><circle cx="${x}" cy="${y}" r="12" fill="#07080d" fill-opacity=".7" stroke="${GOLD}" stroke-opacity=".75" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="7.5" fill="${col}"/><circle cx="${x}" cy="${y}" r="7.5" fill="url(#gemShade)"/><circle cx="${f(x - 2.4)}" cy="${f(y - 2.6)}" r="1.8" fill="#fff" fill-opacity=".85"/><text x="${lx}" y="${f(ly + 4)}" text-anchor="middle">${s.name}</text></g>`;
  }).join("");
  const studs = [0, 3, 4, 5, 6, 7].map(k => { const a = 22.5 + k * 45, [x, y] = S.pt(a, R); return `<path d="M${x},${f(y - 4.5)}L${f(x + 3)},${y}L${x},${f(y + 4.5)}L${f(x - 3)},${y}Z" transform="rotate(${a} ${x} ${y})"/>`; }).join("");
  // 거인 일곱 (몸): 바깥 테의 돌
  const giants = S.GIANTS.map((n, k) => {
    const a = k * 360 / 7, [mx, my] = S.pt(a, 223), [ix, iy] = S.pt(a, 216), [ox, oy] = S.pt(a, 230);
    return `<path d="${S.stone(a, 211, 235, 5.4, 4.6)}" fill="${BRASS_DEEP}" stroke="${BRASS}" stroke-opacity=".85" stroke-width="1.3" stroke-linejoin="round"/><path d="${S.stone(a, 214, 232, 4.2, 3.6)}" fill="none" stroke="${BRASS}" stroke-opacity=".28"/><path d="M${S.pt(a - 2.6, 223).join(",")}L${S.pt(a + 2.6, 223).join(",")}" stroke="${BRASS}" stroke-opacity=".7" stroke-width="1.2"/><circle cx="${ix}" cy="${iy}" r="1.3" fill="${BRASS}" fill-opacity=".8"/><circle cx="${ox}" cy="${oy}" r="1.3" fill="${BRASS}" fill-opacity=".8"/>`;
  }).join("");
  // 신 다섯 (뜻): 별 + 금빛 끝점
  const st = S.star(112, 43);
  const starPath = "M" + [0, 2, 4, 1, 3].map(k => st.out[k].join(",")).join("L") + "Z";
  const pent = "M" + st.inn.map(q => q.join(",")).join("L") + "Z";
  const tips = st.out.map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="9" fill="url(#godGlow)"/><circle cx="${x}" cy="${y}" r="3.4" fill="${HI}"/>`).join("");
  const runes = "ARCHE ✦ IVEL ✦ HARGAN ✦ SEREN ✦ " + S.GIANTS.join(" ✦ ") + " ✦ " + S.GODS.join(" ✦ ") + " ✦ ";
  return `<svg viewBox="-270 -270 540 540" class="ring-svg sigil" aria-hidden="true">
    <defs>
      <radialGradient id="seatGlow"><stop offset="0" stop-color="currentColor" stop-opacity=".7"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient>
      <radialGradient id="gemShade" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
      <radialGradient id="godGlow"><stop offset="0" stop-color="${HI}" stop-opacity=".6"/><stop offset="1" stop-color="${HI}" stop-opacity="0"/></radialGradient>
      <radialGradient id="coreGlow"><stop offset="0" stop-color="#ffe7b0" stop-opacity=".35"/><stop offset=".5" stop-color="#9b7bff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <path id="runePath" d="M0,-252 a252,252 0 1,1 -.1,0"/>
    </defs>
    <circle r="262" fill="url(#coreGlow)"/>
    <g class="ring-rot">
      <circle r="263" fill="none" stroke="${GOLD}" stroke-opacity=".2"/>
      <text class="runes"><textPath href="#runePath">${runes}</textPath></text>
      <circle r="243" fill="none" stroke="${GOLD}" stroke-opacity=".3" stroke-dasharray="1 7"/>
    </g>
    <g class="sg-giants">
      <circle r="218" fill="none" stroke="${BRASS}" stroke-opacity=".35"/><circle r="228" fill="none" stroke="${BRASS}" stroke-opacity=".22"/>
      ${giants}
    </g>
    <g class="sg-dragons">
      <path d="${S.arc(142, 398, R)}" fill="none" stroke="${GOLD}" stroke-opacity=".6" stroke-width="2"/>
      <path d="${S.arc(52, 128, R)}" fill="none" stroke="#6d6a80" stroke-opacity=".8" stroke-width="2" stroke-dasharray=".1 8" stroke-linecap="round"/>
      <circle r="${R - 9}" fill="none" stroke="${GOLD}" stroke-opacity=".14"/>
      <g fill="${GOLD}" fill-opacity=".7">${studs}</g>
    </g>
    <g class="sg-gods ring-rot2">
      <circle r="124" fill="none" stroke="${ARC}" stroke-opacity=".3"/>
      <path d="${starPath}" fill="none" stroke="${ARC}" stroke-opacity=".55" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="${pent}" fill="none" stroke="${HI}" stroke-opacity=".25"/>
      ${tips}
    </g>
    <circle r="18" fill="none" stroke="${HI}" stroke-opacity=".22"/>
    <!-- 아르케: 빈 원 — "아무것도 그려지지 않은 원" (docs/WORLD.md 3장). 속은 비워 둔다 -->
    <circle r="9" fill="#07080d" fill-opacity=".55" stroke="#f3dfa6" stroke-opacity=".9" stroke-width="1.8"/>
    ${seats}
  </svg>`;
}
/* 타이틀 그림 (가이드 0.2 · 2.17): 배경 · 세 존재 · 로고가 모두 들어 있는 그림 한 장. null이면 예전 타이틀(코드로 그린 고리와 로고).
   w · h는 그림의 비율, focus는 그림 속 로고 가운데(0~1) — 입장 연출의 문이 여기서 열린다. 더 큰 그림으로 바꿀 때 비율이 같으면 src만 고친다 */
const TITLE_ART = { src: "img/title/title_art.jpg?v=4k", w: 3840, h: 2160, focus: [.49, .5] };
function showTitle() {
  App.screen = "title"; Bg.set("title");
  if (TITLE_ART && typeof Titans !== "undefined") Titans.mode(0);   /* 그림이 덮으므로 3D 세 존재는 쉬게 한다 */
  const word = "ETHERION", A = TITLE_ART;
  $("#app").innerHTML = `<section class="screen screen-title${A ? " has-art" : ""}" id="title">
    ${A ? `<div class="t-art" aria-hidden="true" style="--art:url('${new URL(A.src, location.href).href}');--fx:${A.focus[0] * 100}%;--fy:${A.focus[1] * 100}%"></div>` : ""}
    <div class="t-ring">${ringSVG()}</div>
    <svg class="t-mountains" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 320V210l70-30 60 22 90-70 70 40 60-26 80-86 70 62 50-18 60 46 90-120 40 34 50-20 60 60 70-48 80 70 60-30 90 56 70-22 70 40 60-30 60 28 70-40v192z" fill="#0c0e18"/>
      <path d="M0 320V250l110-24 90 30 120-50 100 36 130-60 90 34 120-48 110 44 120-36 110 40 120-30 120 30 100-12v136z" fill="#07080e"/>
    </svg>
    <div class="t-center">
      <p class="t-eyebrow">Chronicles of the Seven-Dragon Ring</p>
      <h1 class="t-title" aria-label="${word}">${typeof LOGO !== "undefined" ? LOGO.html(word) : [...word].map((ch, i) => { const c = (word.length - 1) / 2; return `<span style="--i:${i};--d:${(c - Math.abs(i - c)).toFixed(1)};--dx:${((c - i) * 14).toFixed(0)}px">${ch}</span>`; }).join("")}</h1>
      <p class="t-sub"><span>The Land Where Ether Flows</span><span class="ko">에테르가 흐르는 땅, 카일란</span></p>
      <button class="t-start" id="t-start" type="button">Press to Begin</button>
      ${typeof BGM !== "undefined" ? `<div class="t-snd" id="t-snd">${BGM.tbHTML()}</div>` : ""}
    </div>
    <p class="t-foot">Prototype v1.0${OPEN_PLAY ? " · 시험 모드: 로그인 없이 모든 카드 사용" : ""} · 모든 이름은 가칭</p>
  </section>`;
  /* 누르면 이세계 입장 연출(js/portal.js): 고리가 깨어나고 가운데 문으로 들어간다 */
  const go = () => {
    if (App.screen !== "title") return;
    /* v3.9.7 브라우저가 소리를 막아 둔 채 처음 누르면: 그 누름으로 타이틀 음악만 켜고 타이틀에 머문다(js/bgm.js unlockedAt) */
    if (typeof BGM !== "undefined" && performance.now() - (BGM.unlockedAt || 0) < 700) return;
    App.screen = "leaving";
    const ring = $("#title .t-ring").getBoundingClientRect();
    let at = { x: ring.left + ring.width / 2, y: ring.top + ring.height / 2 };
    if (TITLE_ART) {   /* 그림이 화면을 덮도록(cover) 늘어난 뒤의 로고 자리 */
      const W = innerWidth, H = innerHeight, A = TITLE_ART, tall = W < H;   /* 세로 화면은 css/title-art.css처럼 가로폭 2.05배, 49% · 45% 자리 */
      const k = tall ? 2.05 * W / A.w : Math.max(W / A.w, H / A.h), bx = tall ? .49 : .5, by = tall ? .45 : .5;
      at = { x: (W - A.w * k) * bx + A.focus[0] * A.w * k, y: (H - A.h * k) * by + A.focus[1] * A.h * k };
    }
    $("#title").classList.add("awaken");
    const next = () => { Store.ensureOpen(); Store.user() ? showLobby() : showLogin(); };
    if (typeof Portal !== "undefined") Portal.enter(next, at);
    else setTimeout(next, 900);
  };
  if (typeof LOGO !== "undefined" && LOGO.tilt) LOGO.tilt($("#title .t-title"));
  $("#t-start").addEventListener("click", go);
  /* v3.9.7 소리 단추 둘(시작 단추 바로 아래): 오른쪽 아래 떠 있는 단추 대신 */
  const snd = $("#t-snd");
  if (snd) snd.addEventListener("click", e => {
    const b = e.target.closest("[data-act^='snd-']"); if (!b) return;
    e.stopPropagation();
    if (b.dataset.act === "snd-music") BGM.toggleMusic(); else BGM.toggleSfx();
  });
  $("#title").addEventListener("click", e => { if (!e.target.closest("button")) go(); });
  App.titleGo = go;
}
document.addEventListener("keydown", e => {
  if (App.screen === "title" && App.titleGo && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); App.titleGo(); }
});

/* ---------- 입장 (로그인 / 등록) ---------- */
function factionEmblem(f) {
  const g = { brass: "golem", verdant: "elder", arcane: "radiant" }[f];
  return `<span class="emblem fac-${f}">${glyphSVG(g)}</span>`;
}
/* 단체 문장: 단체 색 원 안에 단체 그림 */
function groupEmblem(g, cls) {
  const G = GROUPS[g];
  return `<span class="emblem gem-${g} fac-${G.faction}${cls ? " " + cls : ""}" style="--gc:${G.color}">${glyphSVG(G.glyph)}</span>`;
}
/* 단체 고르기 칸: 진영별로 세 단체씩 */
function groupGridHTML(opts) {
  opts = opts || {};
  return `<div class="grp-pick${opts.small ? " small" : ""}">${opts.random ? `<button type="button" class="grp-tile rnd on" data-g="random"><span class="emblem q">?</span><b>무작위</b><span class="en">Random</span></button>` : ""}
    ${Object.values(FACTIONS).map(F => `<div class="grp-col fac-${F.id}"><p class="grp-fac">${F.name}<small>${F.en}</small></p>
      ${F.groups.map(g => { const G = GROUPS[g]; return `<button type="button" class="grp-tile" data-g="${g}" style="--gc:${G.color}">${groupEmblem(g)}<b>${G.name}</b><span class="en">${G.en}</span><span class="role">${G.role} · ${ELEMENTS[G.el].name}</span>${opts.motto ? `<span class="motto">${G.motto}</span>` : ""}</button>`; }).join("")}
    </div>`).join("")}</div>`;
}
/* 새 모험가: 진영(세로 열)마다 하나까지, 1~3개를 무료로 고른다. 같은 진영의 다른 깃발을 누르면 바뀌고, 고른 깃발을 다시 누르면 풀린다(v3.23) */
function bindFactionPicks(wrap, sumEl) {
  const pick = {};
  const show = () => {
    $$(".grp-tile", wrap).forEach(x => x.classList.toggle("on", pick[GROUPS[x.dataset.g].faction] === x.dataset.g));
    if (sumEl) { const n = Object.keys(pick).length; sumEl.innerHTML = Object.values(FACTIONS).map(F => `<span class="${pick[F.id] ? "ok" : ""}">${F.name}: <b>${pick[F.id] ? GROUPS[pick[F.id]].name : "고르지 않음"}</b></span>`).join(" · ") + ` <small>(${n}/3 · 무료)</small>`; }
  };
  $$(".grp-tile", wrap).forEach(b => b.addEventListener("click", () => { const f = GROUPS[b.dataset.g].faction; if (pick[f] === b.dataset.g) delete pick[f]; else pick[f] = b.dataset.g; show(); }));
  show();
  return () => Object.keys(FACTIONS).map(f => pick[f]).filter(Boolean);
}
function bindGroupGrid(wrap, def) {
  let v = def;
  $$(".grp-tile", wrap).forEach(b => b.addEventListener("click", () => { v = b.dataset.g; $$(".grp-tile", wrap).forEach(x => x.classList.toggle("on", x === b)); }));
  if (def) { const t = wrap.querySelector(`.grp-tile[data-g="${def}"]`); if (t) t.classList.add("on"); }
  return () => v;
}
function showLogin(tab) {
  App.screen = "login"; Bg.set("title");
  tab = tab || "login";
  let chosen = null;
  $("#app").innerHTML = `<section class="screen screen-login">
    <div class="gate">
      <p class="gate-eyebrow">The Lindear Ringstone</p>
      <h2 class="gate-title">린데어 환석</h2>
      <p class="gate-lead">성로의 중심 관문에 이름을 새기고 들어가세요.</p>
      <div class="tabs" role="tablist">
        <button class="tab ${tab === "login" ? "on" : ""}" data-tab="login" role="tab">로그인</button>
        <button class="tab ${tab === "new" ? "on" : ""}" data-tab="new" role="tab">새 모험가</button>
      </div>
      <form id="f-login" class="gate-form" ${tab === "login" ? "" : "hidden"}>
        <label>이름<input id="li-id" autocomplete="username" maxlength="16" required></label>
        <label>암호<input id="li-pw" type="password" autocomplete="current-password" required></label>
        <p class="err" id="li-err"></p>
        <button class="btn primary wide" type="submit">관문 통과</button>
      </form>
      <form id="f-new" class="gate-form" ${tab === "new" ? "" : "hidden"}>
        <div class="two"><label>이름<input id="nw-id" maxlength="16" required placeholder="2~16자"></label>
        <label>암호<input id="nw-pw" type="password" required placeholder="2자 이상"></label></div>
        <p class="pick-label">깃발을 최대 3개까지 무료로 고릅니다 — 진영마다 하나까지, 적어도 하나. 고른 깃발마다 기본 덱 40장과 그 단체의 다른 카드를 1장씩 받습니다. 고르지 않은 깃발은 쓸 수 없습니다. (고른 깃발을 다시 누르면 풀립니다)</p>
        ${groupGridHTML({ motto: true })}
        <p class="pick-sum" id="nw-sum"></p>
        <p class="err" id="nw-err"></p>
        <button class="btn primary wide" type="submit">모험가 등록</button>
      </form>
      <div class="gate-or" aria-hidden="true"><span>또는</span></div>
      <button class="btn wide gate-guest" id="gate-guest" type="button">로그인 없이 시작<small>등록 없이 손님으로 · 9개 단체 덱과 모든 카드</small></button>
      ${Store.ok ? "" : '<p class="err">이 브라우저에서는 저장소를 쓸 수 없어 진행 상황이 저장되지 않습니다.</p>'}
    </div>
  </section>`;
  $$(".tab").forEach(b => b.addEventListener("click", () => showLogin(b.dataset.tab)));
  const getChosen = bindFactionPicks($("#f-new"), $("#nw-sum"));
  $("#gate-guest").addEventListener("click", () => { Store.guest(); toast("손님으로 들어왔습니다. 모든 덱을 쓸 수 있습니다."); showLobby(); });
  $("#f-login").addEventListener("submit", e => {
    e.preventDefault();
    const err = Store.login($("#li-id").value, $("#li-pw").value);
    if (err) { $("#li-err").textContent = err; return; }
    toast(`환영합니다, ${Store.user().id}.`); showLobby();
  });
  $("#f-new").addEventListener("submit", e => {
    e.preventDefault();
    chosen = getChosen();
    const err = Store.register($("#nw-id").value, $("#nw-pw").value, chosen);
    if (err) { $("#nw-err").textContent = err; return; }
    toast(`${chosen.map(g => GROUPS[g].name).join(" · ")}의 깃발로 등록되었습니다.`); showLobby();
  });
}

/* ---------- 대기실 ---------- */
function sortDeckCards(ids) {
  const order = { unit: 0, atk: 1, def: 2, any: 3, hand: 4, item: 5 };   /* v3.10.8 계략(hand)이 빠져 순서가 섞이던 것 */
  return ids.sort((a, b) => { const x = CARDS[a], y = CARDS[b]; return order[x.type] - order[y.type] || x.lv - y.lv || a.localeCompare(b); });
}
function expandDeck(cards) { const out = []; for (const id in cards) for (let i = 0; i < cards[id]; i++) out.push(id); return sortDeckCards(out); }

/* 메뉴 아이콘 (24×24 선 그림, 색은 바깥에서) */
const MENU_ICON = {
  hall: '<path d="M4 21V10.5L12 4l8 6.5V21"/><path d="M9.5 21v-5a2.5 2.5 0 015 0v5"/><path d="M2.5 21h19"/>',
  trade: '<path d="M4 8.5h13.5l-3.4-3.4M20 15.5H6.5l3.4 3.4"/><path d="M12 10.3l1.7 1.7-1.7 1.7-1.7-1.7z"/>',   /* v3.21 교역소 = 맞바꾸는 두 화살표 + 가운데 마름모 */
  shop: '<path d="M12 4.5V20M7.5 20h9M4.5 7.5h15"/><path d="M4.5 7.5 2.4 13M4.5 7.5 6.6 13M19.5 7.5 17.4 13M19.5 7.5 21.6 13"/><path d="M2.2 13h4.6a2.3 2.3 0 01-4.6 0zM17.2 13h4.6a2.3 2.3 0 01-4.6 0z"/><circle cx="12" cy="3.8" r="1.2" fill="currentColor"/>',
  book: '<path d="M12 6.6C9.6 5 6.6 4.6 3.6 5.3v13c3-.7 6-.3 8.4 1.3 2.4-1.6 5.4-2 8.4-1.3v-13c-3-.7-6-.3-8.4 1.3z"/><path d="M12 6.6v13M6.2 9.2c1.4-.1 2.7.2 3.8.8M6.2 12.4c1.4-.1 2.7.2 3.8.8M14 10c1.1-.6 2.4-.9 3.8-.8"/>',   /* v3.7 연대기 = 펼친 책 */
  map: '<circle cx="12" cy="12" r="8.5"/><path d="M12 5.2l2 6.8-2 6.8-2-6.8z" fill="currentColor" stroke="none"/><path d="M5.2 12h2.2M16.6 12h2.2" />',
  vault: '<circle cx="8" cy="12" r="3.6"/><path d="M11.6 12H21M17.6 12v3M20.2 12v2.4"/>',
  exit: '<path d="M10 4H5.5v16H10"/><path d="M9.5 12h10M15.5 8l4 4-4 4"/>',
  quill: '<path d="M19.5 4.5C12.8 5 8 10 6.6 17.4L5.2 20.5"/><path d="M19.5 4.5c-.4 6.3-5.3 11-11.1 12.2M10.2 13.6l-2.6-.4"/>',
  duel: '<path d="M5 4l9.6 9.6M19 4l-9.6 9.6M4.2 19.8l3.3-3.3M19.8 19.8l-3.3-3.3M6.3 14.3l3.4 3.4M17.7 14.3l-3.4 3.4"/>',
  road: '<path d="M8.5 3.5 4.5 20.5M15.5 3.5l4 17"/><path d="M12 4.5v2.4M12 10v2.8M12 16v3.4"/>',   /* v3.25 성로 순례 = 멀어지는 길(가운데 점선) */
  ring: '<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="4.4" r="1.7" fill="currentColor"/><circle cx="19.6" cy="12" r="1.7" fill="currentColor"/><circle cx="4.4" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="19.6" r="1.7" fill="#0d0e17" stroke-dasharray="1.2 1.2"/>',
  banners: '<path d="M3.5 5h7v6.4c0 3.1-3.5 5.1-3.5 5.1s-3.5-2-3.5-5.1z"/><path d="M13.5 7.5h7v6.4c0 3.1-3.5 5.1-3.5 5.1s-3.5-2-3.5-5.1z"/>',
  guide: '<path d="M12 3v18M8.5 21h7"/><path d="M12 5.2h6.4l2.1 2.3-2.1 2.3H12"/><path d="M12 11.6H5.6l-2.1 2.3 2.1 2.3H12"/><circle cx="12" cy="3" r=".9" fill="currentColor"/>',   /* v3.9 튜토리얼 = 갈림길 이정표 */
  tome: '<path d="M5.5 4.5h11a2 2 0 012 2V20h-11a2 2 0 01-2-2z"/><path d="M5.5 18a2 2 0 012-2h11"/><path d="M12 7.4l1.9 1.9-1.9 1.9-1.9-1.9z"/>'   /* v3.9 매뉴얼 = 닫힌 규칙서(가운데 마름모) */
};
const menuIcon = k => `<svg class="m-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MENU_ICON[k]}</svg>`;

/* 상단 문장 띠: 왼쪽 날개 = 길(메뉴), 가운데 = 늘어뜨린 쐐기돌 문장(로고 + 지금 있는 곳), 오른쪽 날개 = 지갑 · 모험가 인장 · 나가기 */
/* v3.9.15 모험가 인장 = 레벨 판: 구슬에 레벨(머리글자 대신), 이름 옆에 전적 · 승률, 그 아래 경험치 막대.
   환석 조각은 인장 바로 왼쪽(.tb-shard, 누르면 상점). 지도 · 연대기는 길이라 왼쪽 날개로 옮겼다(오른쪽 날개 폭 확보). 값이 바뀌면 js/level.js LevelUI.paint가 고쳐 쓴다 */
function sealRecord(u) {
  const w = u.stats.w || 0, l = u.stats.l || 0, n = w + l;
  return { w, l, n, rate: n ? Math.round(w / n * 100) : null };
}
function sealHTML(u) {
  const R = sealRecord(u), I = typeof LEVEL !== "undefined" ? LEVEL.info(Store.xp(u)) : null;
  const num = x => x.toLocaleString("ko-KR");
  return `<span class="user-chip seal${I ? " lv" : ""}${I && I.top ? " top" : ""}" title="${esc(sealTitle(u, R, I))}">
          <i class="seal-mark" aria-hidden="true">${I ? `<small>LV</small><b class="sl-lv">${I.lv}</b>` : esc([...u.id][0] || "?").toUpperCase()}</i>
          <span class="seal-txt">
            <span class="seal-row">${u.admin ? '<span class="admin-badge">ADMIN</span>' : ""}<b class="sl-name">${esc(u.id)}</b><span class="seal-rec"><span><em class="sl-w">${num(R.w)}</em>승 <em class="sl-l">${num(R.l)}</em>패</span><i aria-hidden="true"></i><span><span class="sl-rl">승률 </span><em class="sl-rate">${R.rate == null ? "—" : R.rate + "%"}</em></span></span></span>
            ${I ? `<span class="seal-xp" aria-hidden="true"><i style="--p:${I.p.toFixed(4)}"></i></span>` : ""}
          </span>
        </span>`;
}
function sealTitle(u, R, I) {
  const num = x => Math.round(x).toLocaleString("ko-KR");
  return `${u.id}${u.admin ? " (관리자)" : ""}${I ? ` · 모험가 레벨 ${I.lv}${I.top ? " (최대)" : ""}` : ""}\n`
    + `${num(R.w)}승 ${num(R.l)}패 · 승률 ${R.rate == null ? "— (아직 대전 기록 없음)" : R.rate + "%"}`
    + (I ? `\n경험치 ${I.top ? "최대 레벨" : `${num(I.into)} / ${num(I.need)} · 다음 레벨까지 ${num(I.left)}`}\n벌어들인 환석 조각이 곧 경험치입니다. 카드를 사도 줄지 않고, 판 값은 경험치가 되지 않습니다.` : "");
}
function shardChipHTML(u) {
  const admin = Store.isAdmin(u);
  return `<button type="button" class="tb-shard" data-nav="shop" title="환석 조각 ${admin ? "∞ (관리자)" : fmtGold(Store.gold(u))}\n전투 · 순례 · 수레바퀴로 모아 상점에서 카드를 삽니다. 누르면 상점으로.">
          <i class="shard" aria-hidden="true"></i><b>${admin ? "∞" : Store.gold(u).toLocaleString("ko-KR")}</b><small>조각</small></button>`;
}
function headerHTML(title) {
  const u = Store.user();
  const cur = { lobby: "lobby", shop: "shop", trade: "trade", admin: "admin" }[App.screen] || (title === "관리자 보관소" ? "admin" : "");
  const nav = (k, ico, label, tip, extra) => `<button type="button" class="tb-nav${cur === k ? " on" : ""}" data-nav="${k}"${cur === k ? ' aria-current="page"' : ""}${tip ? ` title="${tip}"` : ""}>${menuIcon(ico)}<span>${label}</span>${extra || ""}</button>`;
  const div = '<i class="tb-div" aria-hidden="true"></i>';
  return `<header class="topbar realm">
    <div class="tb-inner realm">
      <nav class="tb-wing tbw-left" aria-label="주 메뉴">
        ${nav("lobby", "hall", "대기실")}${div}${nav("shop", "shop", "상점", "린데어 상점 — 카드 사고팔기")}${typeof showTrade === "function" ? div + nav("trade", "trade", "교역소", "린데어 교역소 — 모험가끼리 카드 맞바꾸기", typeof TradeUI !== "undefined" ? TradeUI.badgeHTML() : "") : ""}${u.admin ? div + nav("admin", "vault", "보관소", "관리자 보관소") : ""}${div}${nav("map", "map", "지도", "카일란 대륙 전도")}${nav("chronicle", "book", "연대기", "에테리온 연대기")}
      </nav>
      <button type="button" class="tb-crest${typeof CREST !== "undefined" ? " has-art" : ""}" data-nav="lobby" title="대기실로">${typeof CREST !== "undefined" ? CREST.svg() : ""}<span class="crest-word">ETHERION</span>${title ? `<span class="crest-sub">${title}</span>` : ""}</button>
      <div class="tb-wing tbw-right">
        ${typeof showSettings === "function" ? `<button type="button" class="tb-nav tb-set" data-nav="settings" title="설정 — 화면 배치 · 연출 · 소리" aria-label="설정">${typeof uiIcon === "function" ? uiIcon("settings") : "⚙"}</button>` : ""}
        <button type="button" class="tb-nav tb-sound" data-nav="sound" title="소리 — 배경음 · 효과음 켜기/끄기와 음량" aria-label="소리">${typeof BGM !== "undefined" ? BGM.navIcon() : ""}</button>
        ${typeof Weather !== "undefined" ? Weather.chipHTML() : ""}
        ${typeof LevelUI !== "undefined" ? shardChipHTML(u) : ""}
        ${sealHTML(u)}
        <button type="button" class="tb-nav tb-exit" data-nav="logout" title="${OPEN_PLAY ? "처음으로" : "나가기"}">${menuIcon("exit")}<span>${OPEN_PLAY ? "처음으로" : "나가기"}</span></button>
      </div>
    </div>
  </header>${typeof LevelUI !== "undefined" ? "" : `
  <div class="gold-dock"><span class="gold-chip" title="환석 조각 — 전투와 수레바퀴로 모아 상점에서 카드를 산다"><b>${fmtGold(Store.gold(u))}</b></span></div>`}`;   /* v3.1.4 환석 조각은 화면 아래 가운데 (css/hud.css). v3.6: 레벨 판(js/level.js LevelUI)이 있으면 그 판이 조각과 레벨을 함께 보인다 */
}
function bindHeader(root, guard) {
  root.querySelector(".topbar").addEventListener("click", async e => {
    const b = e.target.closest("[data-nav]"); if (!b) return;
    if (b.dataset.nav === "settings") { if (typeof showSettings === "function") showSettings(); return; }   /* v3.20.4 폰 · 앱: 대기실에서도 설정(폰 글자 크기) */
    if (b.dataset.nav === "sound") { if (typeof BGM !== "undefined") BGM.openPanel(b); return; }   /* v3.1.4 소리 창 (js/bgm.js) */
    if (guard && !(await guard())) return;
    if (b.dataset.nav === "lobby") showLobby();
    if (b.dataset.nav === "admin") showAdmin();
    if (b.dataset.nav === "shop") showShop();
    if (b.dataset.nav === "trade" && typeof showTrade === "function") showTrade();   /* v3.21 린데어 교역소 (js/trade-ui.js) */
    if (b.dataset.nav === "map") { if (typeof Kailan !== "undefined") Kailan.open(); }
    if (b.dataset.nav === "chronicle") { if (typeof Chronicle !== "undefined") { const r = b.getBoundingClientRect(); Chronicle.open(r.left + r.width / 2, r.top + r.height / 2); } }   /* v3.7 연대기 (js/chronicle.js) */
    if (b.dataset.nav === "logout") { Store.logout(); showTitle(); }
  });
}

/* v3.1 덱 보관함의 덱 상자 (가이드 2.16): 단체 문장 뒤에 부채꼴로 펼친 카드 뒷면 셋 = "덱", 고른 덱은 문장 둘레에 점선 고리가 돈다 */
function deckSealHTML(g) {
  return `<span class="dt-seal" aria-hidden="true"><i class="dt-fan"><i></i><i></i><i></i></i>${groupEmblem(g)}<svg class="dt-ring" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 4.2"/><path d="M32 .5l2.2 2.2-2.2 2.2-2.2-2.2z" fill="currentColor"/></svg></span>`;
}
/* 덱 장수 계기판 10칸(한 칸 = 4장). 덱 조정실 계기판과 같은 색 규칙: 모자람 = 에테르 하늘빛, 저장된 40장 = 금 */
function vaultGaugeHTML(n, ready) {
  const per = RULES.deckSize / 10;
  return `<i class="dt-gauge${ready ? " full" : ""}" title="${n} / ${RULES.deckSize}장">${Array.from({ length: 10 }, (_, i) => `<i style="--f:${Math.max(0, Math.min(1, (n - i * per) / per)).toFixed(2)}"></i>`).join("")}</i>`;
}
const LOCK_MINI = '<svg class="lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

function showLobby() {
  App.screen = "lobby"; Bg.set("calm");
  if (typeof Titans !== "undefined") Titans.mode(0);   /* v3.5.8: 대기실에는 배경 그림(3D 세 존재)을 두지 않는다 */
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  if (!App.lobbyGroup || !Store.ownsGroup(u, App.lobbyGroup)) App.lobbyGroup = Store.ownsGroup(u, u.group) ? u.group : GROUP_IDS.find(g => Store.ownsGroup(u, g));
  const f = App.lobbyGroup;
  $("#app").innerHTML = `<section class="screen screen-lobby">
    ${headerHTML("대기실")}
    <div class="lobby">
      <nav class="decks" aria-label="내 덱">
        <h3 class="panel-title">덱 보관함 <small>단체마다 덱 하나</small><em class="dk-hint">깃발을 누르면 출정 · 덱 조정</em></h3>
        ${Object.values(FACTIONS).map(F => `<div class="deck-fac fac-${F.id}"><p class="df-head"><span class="df-crest">${typeof factionCrestSVG === "function" ? factionCrestSVG(F.id) : ""}</span>${F.name}<small>${F.en}</small></p>
        ${F.groups.map(g => {
          const G = GROUPS[g], own = Store.ownsGroup(u, g);
          const d = own ? Store.deck(u, g) : null;
          const n = d ? countMap(d.cards) : 0;
          const playable = own && Store.deckPlayable(u, g);
          return `<button class="deck-tile rq fac-${F.id}${g === f ? " on" : ""}${own ? "" : " locked"}${playable ? " dt-ready" : ""}" data-g="${g}" style="--gc:${G.color}" ${own ? "" : 'aria-disabled="true"'}>
            <i class="rq-plate" aria-hidden="true"></i><span class="dt-mark" aria-hidden="true">${glyphSVG(G.glyph)}</span>
            ${deckSealHTML(g)}
            <span class="dt-body"><b>${own ? esc(d.name) : G.name}</b><span class="en">${G.name} · ${G.role}</span>
            <span class="dt-state">${own ? `${vaultGaugeHTML(n, playable)}<span class="dt-st ${playable ? "ok" : "bad"}"><b>${n}</b>/${RULES.deckSize} · ${playable ? "출전 가능" : "저장 필요"}</span>` : `<span class="dt-st lock">${LOCK_MINI} 보유하지 않은 덱</span>`}</span></span>
          </button>`;
        }).join("")}</div>`).join("")}
        <p class="note">${u.admin ? "관리자는 9개 단체의 덱과 모든 카드를 가지고 있습니다." : u.guest ? "손님으로 들어왔습니다. 9개 단체의 덱과 모든 카드를 쓸 수 있습니다. 내 깃발과 카드를 모으려면 나가서 '새 모험가'로 등록하세요." : "등록할 때 고른 깃발(최대 3개)의 덱만 쓸 수 있습니다. 순례 · 컴퓨터와 대전에서 카드를 얻고, 상점에서 사고팔 수도 있습니다."}</p>
      </nav>
      <main class="deck-view" id="deck-view"></main>
      <aside class="side-col">
      <div class="wheel-host" id="wheel-host"></div>
      <aside class="chat" aria-label="대기실 채팅">
        <div class="chat-head"><h3 class="panel-title">대기실 채팅</h3><span class="net off" title="서버 미연결: 메시지는 이 기기에만 저장됩니다">● 오프라인</span></div>
        <div class="chat-log" id="chat-log"></div>
        <form class="chat-form" id="chat-form"><input id="chat-in" maxlength="300" placeholder="메시지 입력…" autocomplete="off" aria-label="채팅 메시지"><button class="btn sm primary" type="submit">보내기</button></form>
      </aside>
      </aside>
    </div>
    ${typeof Help !== "undefined" ? Help.dockHTML() : ""}
  </section>`;   /* v3.9 오른쪽 아래 튜토리얼 · 매뉴얼 (js/manual.js) */
  const root = $(".screen-lobby");
  bindHeader(root);
  if (typeof Help !== "undefined") Help.bindDock(root);
  $$(".deck-tile", root).forEach(b => b.addEventListener("click", () => {
    if (b.classList.contains("locked")) { toast("보유하지 않은 덱입니다.", "warn"); return; }
    App.lobbyGroup = b.dataset.g;
    if (lobbyCompact()) { $$(".deck-tile", root).forEach(x => x.classList.toggle("on", x === b)); openDeckSheet(b.dataset.g); return; }
    showLobby();
  }));
  renderDeckView();
  renderChat();
  if (typeof Pachinko !== "undefined") Pachinko.mount($("#wheel-host"));
  $("#chat-form").addEventListener("submit", e => {
    e.preventDefault(); const v = $("#chat-in").value.trim(); if (!v) return;
    ChatNet.send(v); $("#chat-in").value = "";
  });
}
function renderDeckView() {
  if (lobbyCompact()) { $("#deck-view").innerHTML = ""; return; }   /* v3.32.2 폰 · 앱: 덱 보기 · 출정의 단은 깃발을 누르면 뜨는 출정 창에 */
  const u = Store.user(), f = App.lobbyGroup, F = GROUPS[f], FA = FACTIONS[F.faction];
  const d = Store.deck(u, f);
  const ids = expandDeck(d.cards);
  const playable = Store.deckPlayable(u, f);
  const curve = [1, 2, 3, 4, 5, 6, 7, 8].map(l => ids.filter(id => CARDS[id].lv === l).length);
  const mx = Math.max(...curve, 1);
  $("#deck-view").innerHTML = `
    <div class="dv-head fac-${F.faction}" style="--gc:${F.color}">
      ${groupEmblem(f, "big")}
      <div class="dv-title"><p class="eyebrow">${F.en} · ${FA.name}</p><h2>${esc(d.name)}</h2><p class="muted">${F.name} · ${F.role} · ${F.motto}</p><p class="dv-blurb">${F.blurb}</p></div>
      <div class="dv-curve" title="레벨별 장수">${curve.map((n, i) => `<span><i style="height:${n / mx * 100}%"></i><em>${i + 1}</em></span>`).join("")}</div>
    </div>
    <div class="dv-meta dv-filter">
      <div class="dv-kinds" role="group" aria-label="카드 종류로 거르기">${DV_KINDS.map(([k, l]) => { const n = k === "all" ? ids.length : ids.filter(id => kindOf(CARDS[id]) === k).length;
        return `<button type="button" class="dv-k k-${k}" data-dk="${k}" ${n || k === "all" ? "" : "disabled"} title="${k === "all" ? "덱의 모든 카드" : `${l}만 보기`}"><span>${l}</span><b>${n}</b>${k === "all" ? `<small>/ ${RULES.deckSize}장</small>` : ""}</button>`; }).join("")}
        <span class="dv-st ${playable ? "ok" : "bad"}">${playable ? "저장된 덱 · 출전 가능" : "출전 불가 · 덱 조정실에서 40장을 저장하세요"}</span></div>
      <div class="dv-grades" id="dv-grades" role="group" aria-label="등급으로 거르기"></div>
    </div>
    <div class="dv-cards" id="dv-cards">${ids.map(id => cardHTML(CARDS[id], { size: "md", brief: true })).join("")}</div>
    ${altarHTML(f)}`;
  $("#dv-cards").addEventListener("click", e => { const c = e.target.closest("[data-card]"); if (c) showCardModal(CARDS[c.dataset.card]); });
  $(".dv-filter").addEventListener("click", e => {
    const k = e.target.closest("[data-dk]"), g = e.target.closest("[data-dg]");
    if (k && !k.disabled) { App.deckFilter = { type: k.dataset.dk, grade: "" }; applyDeckFilter(ids); }
    else if (g) { const v = g.dataset.dg; App.deckFilter.grade = App.deckFilter.grade === v ? "" : v; applyDeckFilter(ids); }
  });
  applyDeckFilter(ids);
  bindAltar($("#deck-view"), f);
  fitLobbyCards();
}
/* 출정의 단: 덱 조정실 · 컴퓨터와 대전 · 순례 · (원정 계속) · 대전. PC는 덱 보기 아래, 폰 · 앱은 깃발을 누르면 뜨는 출정 창(openDeckSheet) */
function altarHTML(f) {
  const playable = Store.deckPlayable(Store.user(), f);
  const expOn = typeof Exp !== "undefined" && Exp.get() && !Exp.get().over;   /* v3.26 대기실의 원정 자리는 순례로. 원정은 하던 것을 마칠 때만 보인다 */
  return `<div class="dv-actions altar">
      <button class="btn rite-side" id="go-edit">${menuIcon("quill")}<span>덱 조정실</span></button>
      <div class="altar-gates${expOn ? " n4" : ""}">
        <button class="btn primary rite" id="go-ai" ${playable ? "" : "disabled"}>${menuIcon("duel")}<b>컴퓨터와 대전</b><small>SPARRING</small></button>
        <button class="btn primary gold rite" id="go-pil" title="성로 순례 — 하루에 한 번 열리는 길. 여덟 관문과 망각의 숲">${menuIcon("road")}<b>순례</b><small>PILGRIMAGE</small></button>
        ${expOn ? `<button class="btn primary rite" id="go-exp" title="칠룡의 고리 원정 — 하던 원정을 마저 한다 (새 원정은 열리지 않음)">${menuIcon("ring")}<b>원정 계속</b><small>EXPEDITION</small></button>` : ""}
        <button class="btn primary alt rite" id="go-pvp" ${playable ? "" : "disabled"}>${menuIcon("banners")}<b>대전</b><small>DUEL</small></button>
      </div>
    </div>`;
}
function bindAltar(box, f, before) {
  const on = (sel, fn) => { const b = $(sel, box); if (b) b.addEventListener("click", () => { if (b.disabled) return; if (before) before(); fn(); }); };
  on("#go-edit", () => showEditor(f));
  on("#go-ai", () => startVsAI(f));
  on("#go-exp", () => showExpedition(f));
  on("#go-pil", () => { if (typeof showPilgrim === "function") showPilgrim(f); });
  on("#go-pvp", () => startPvP(f));
}
/* v3.32.2 폰 · 앱(html.mobile): 대기실에는 깃발만. 깃발을 누르면 출정 창 — 덱 이름 · 장수 · 레벨 곡선과 출정의 단.
   덱의 카드는 덱 조정실에서 본다(대기실에서는 40장을 그리지 않아 대기실이 빨리 뜬다) */
const lobbyCompact = () => document.documentElement.classList.contains("appui");   /* v3.32.3 PC도 앱식 배치(설정 "화면 배치")면 */
function openDeckSheet(f) {
  const u = Store.user(), G_ = GROUPS[f], FA = FACTIONS[G_.faction], d = Store.deck(u, f), dr = Store.draft(u, f);
  const n = countMap(d.cards), playable = Store.deckPlayable(u, f);
  const ids = expandDeck(d.cards), curve = [1, 2, 3, 4, 5, 6, 7, 8].map(l => ids.filter(id => CARDS[id].lv === l).length), mx = Math.max(...curve, 1);
  const kinds = [["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]].map(([k, l]) => `<span class="k-${k}">${l} <b>${ids.filter(id => kindOf(CARDS[id]) === k).length}</b></span>`).join("");
  $$(".deck-sheet-wrap").forEach(w => w.remove());
  const wrap = document.createElement("div");
  wrap.className = "modal-wrap deck-sheet-wrap";
  wrap.innerHTML = `<div class="modal deck-sheet fac-${G_.faction}" role="dialog" aria-modal="true" aria-label="${esc(d.name)} 출정" style="--gc:${G_.color}">
    <button type="button" class="ds-x" aria-label="닫기">✕</button>
    <div class="ds-head">
      ${groupEmblem(f, "big")}
      <div class="ds-title"><p class="eyebrow">${G_.en} · ${FA.name}</p><h3>${esc(d.name)}</h3><p class="muted">${G_.name} · ${G_.role} · ${G_.motto}</p>
        <p class="ds-st"><span class="dt-st ${playable ? "ok" : "bad"}"><b>${n}</b>/${RULES.deckSize} · ${playable ? "출전 가능" : "저장 필요 — 덱 조정실에서 40장을 저장하세요"}</span><span class="ds-kinds">${kinds}</span>${dr ? '<span class="ds-draft">고치던 초안 있음</span>' : ""}</p></div>
      <div class="dv-curve" title="레벨별 장수">${curve.map((k, i) => `<span><i style="height:${k / mx * 100}%"></i><em>${i + 1}</em></span>`).join("")}</div>
    </div>
    ${altarHTML(f)}
  </div>`;
  document.body.appendChild(wrap);
  const close = () => wrap.remove();
  wrap.addEventListener("click", e => { if (e.target === wrap || e.target.closest(".ds-x")) close(); });
  bindAltar(wrap, f, close);
  const onKey = e => { if (!wrap.isConnected) { removeEventListener("keydown", onKey); return; } if (e.key === "Escape") close(); };
  addEventListener("keydown", onKey);
}
/* v3.7.3 대기실 덱 보기: 세로 크기를 덱 보관함 판과 같게 맞추고, 남는 높이만큼 카드를 키운다.
   덱 보기 판의 아래 끝이 덱 보관함 판의 아래 끝에 닿도록 그 안에 들어가는 가장 큰 카드 폭을 고른 뒤, 판 높이를 덱 보관함 높이로 맞춘다.
   기본 폭(--card-md 138px)보다 작게는 줄이지 않는다 — 덱 보기가 이미 더 길면 그대로. 두 단 이하(1180px 이하)에서는 쓰지 않는다. */
/* v3.7.5 대기실 덱 보기 거르기: 종류(전체 · 유닛 · 마법 · 아이템)를 누르면 그 종류만, 그 아래 등급 칸(일반 · 고급 · 레어 …, 장수)을 누르면 그 등급만.
   등급 칸은 지금 고른 종류 안에 있는 등급만, 등급 차례(GRADES rank)대로 보인다. 같은 등급을 다시 누르면 모든 등급으로.
   카드는 지우지 않고 숨기기만 한다(.dv-off) — 카드 크기(fitLobbyCards)는 덱 전체 장수로 정한 그대로라 거를 때 카드가 커졌다 작아졌다 하지 않는다.
   고른 종류는 덱을 바꿔도 남고, 새 덱에 그 종류나 등급이 없으면 '전체'로 돌아간다. */
const DV_KINDS = [["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]];
function applyDeckFilter(ids) {
  const F = App.deckFilter = App.deckFilter || { type: "all", grade: "" };
  const ofKind = id => F.type === "all" || kindOf(CARDS[id]) === F.type;
  if (F.type !== "all" && !ids.some(ofKind)) { F.type = "all"; F.grade = ""; }
  const inKind = ids.filter(ofKind);
  const gN = {}; for (const id of inKind) { const g = gradeOf(id); gN[g] = (gN[g] || 0) + 1; }
  if (F.grade && !gN[F.grade]) F.grade = "";
  $$(".dv-k", $("#deck-view")).forEach(b => { const on = b.dataset.dk === F.type; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  const kindName = (DV_KINDS.find(([k]) => k === F.type) || [])[1];
  $("#dv-grades").innerHTML = `<span class="dv-gl">${F.type === "all" ? "등급" : kindName + " 등급"}</span>`
    + `<button type="button" class="dv-g g-all${F.grade ? "" : " on"}" data-dg="" aria-pressed="${!F.grade}"><span>모든 등급</span><b>${inKind.length}</b></button>`
    + GRADE_IDS.filter(g => gN[g]).map(g => { const G = GRADES[g], on = F.grade === g;
      return `<button type="button" class="dv-g grade-${g}${on ? " on" : ""}" data-dg="${g}" style="--gr:${G.color}" aria-pressed="${on}" title="${G.name} (${G.en}) ${gN[g]}장만 보기"><span>${G.name}</span><b>${gN[g]}</b></button>`; }).join("");
  const grid = $("#dv-cards");
  grid.classList.toggle("dv-filtered", F.type !== "all" || !!F.grade);
  for (const el of grid.children) { const id = el.dataset.card; el.classList.toggle("dv-off", !(ofKind(id) && (!F.grade || gradeOf(id) === F.grade))); }
}
function fitLobbyCards() {
  const grid = $("#dv-cards"), dv = $("#deck-view"), vault = $(".screen-lobby .decks");
  if (!grid || !dv || !vault) return;
  grid.style.removeProperty("--card-md"); dv.style.removeProperty("min-height"); dv.classList.remove("dv-fit");
  if (matchMedia("(max-width: 1180px)").matches) return;
  const first = grid.querySelector(":scope > :not(.dv-off)"); if (!first) return;   /* v3.7.5 거르기로 숨긴 카드는 크기가 0이라 보이는 첫 카드로 잰다 */
  const base = first.getBoundingClientRect().width, ratio = first.getBoundingClientRect().height / base;
  const vb = vault.getBoundingClientRect(), room = vb.bottom - dv.getBoundingClientRect().bottom;
  if (!(room > 0) || !(base > 0)) return;
  const cs = getComputedStyle(grid), gx = parseFloat(cs.columnGap) || 0, gy = parseFloat(cs.rowGap) || 0;
  const W = grid.clientWidth, n = grid.children.length, avail = grid.getBoundingClientRect().height + room;
  let best = base;
  for (let w = Math.ceil(base); w <= Math.min(base * 1.8, 260); w++) {
    const cols = Math.max(1, Math.floor((W + gx) / (w + gx))), rows = Math.ceil(n / cols);
    if (rows * w * ratio + (rows - 1) * gy <= avail) best = w;
  }
  if (best > base) grid.style.setProperty("--card-md", best + "px");
  dv.classList.add("dv-fit"); dv.style.minHeight = vb.height + "px";
}
addEventListener("resize", () => { clearTimeout(fitLobbyCards.t); fitLobbyCards.t = setTimeout(() => { if (App.screen === "lobby") fitLobbyCards(); }, 120); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (App.screen === "lobby") fitLobbyCards(); });
function renderChat() {
  const box = $("#chat-log"); if (!box) return;
  const sys = `<div class="msg sys">◈ 대기실에 입장했습니다. 지금은 서버에 연결되어 있지 않아 메시지가 이 기기에만 남습니다.</div>`;
  box.innerHTML = sys + ChatNet.history().slice(-80).map(m => `<div class="msg${m.from === Store.data.session ? " mine" : ""}"><span class="who">${m.admin ? '<i class="crown">♛</i>' : ""}${esc(m.from)}</span><span class="txt">${esc(m.text)}</span><time>${fmtTime(m.at)}</time></div>`).join("");
  box.scrollTop = box.scrollHeight;
}
ChatNet.onMessage(() => { if (App.screen === "lobby") renderChat(); });

/* ---------- 대전 시작 ---------- */
async function startVsAI(f, opts) {   // opts.practice = 튜토리얼 ③ 연습 대전 (v3.24.3, 결정화 손짓은 이 판에서만)
  const u = Store.user();
  if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 대전할 수 있습니다.", "warn"); return; }
  let get;
  /* v3.16 난이도: 보통(예전 컴퓨터) · 어려움(js/aihard.js — 모든 수를 전투로 미리 굴려 본다). 마지막 고른 것을 기억한다
     v3.19.3: 어려움은 덱도 정예 덱(HARD_DECKS ← js/decks.js HARD_DECK_LISTS) */
  let diff = Prefs.get("aiDiff", "normal") === "hard" ? "hard" : "normal";
  const diffHTML = `<div class="ai-diff" role="radiogroup" aria-label="난이도">
      <button type="button" class="ai-diff-btn${diff === "normal" ? " on" : ""}" data-d="normal" role="radio"><b>보통</b><small>가끔 실수하는 상대</small></button>
      <button type="button" class="ai-diff-btn hard${diff === "hard" ? " on" : ""}" data-d="hard" role="radio"><b>어려움</b><small>정예 덱 · 모든 수를 미리 굴려 보고 둔다</small></button>
    </div>`;
  const ok = await modal(`<h3>컴퓨터와 대전</h3>${diffHTML}<p class="muted">상대 단체를 고르세요. 컴퓨터는 보통이면 그 단체의 기본 덱, 어려움이면 등급 높은 카드까지 골라 다듬은 정예 덱을 씁니다.</p>${groupGridHTML({ small: true, random: true })}`,
    [{ label: "취소", value: false }, { label: "전투 시작", value: true, cls: "primary" }], { cls: "wide-modal", onOpen: w => {
      get = bindGroupGrid(w, "random");
      w.addEventListener("click", e => { const b = e.target.closest(".ai-diff-btn"); if (!b) return; diff = b.dataset.d; w.querySelectorAll(".ai-diff-btn").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); });
    } });
  if (!ok) return;
  Prefs.set("aiDiff", diff);
  let ag = get(); if (ag === "random") ag = pick(GROUP_IDS.filter(g => g !== f));
  launch({ mode: "ai", practice: !!(opts && opts.practice), p0: { name: u.id, group: f, cards: Store.deck(u, f).cards }, p1: { name: GROUPS[ag].ai, group: ag, cards: diff === "hard" ? HARD_DECKS[ag] : STARTER_DECKS[ag], isAI: true, ai: diff } });
}
async function startPvP(f) {
  const u = Store.user();
  if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 대전할 수 있습니다.", "warn"); return; }
  let get;
  const ok = await modal(`<h3>대전</h3>
    <button type="button" class="ol-entry" id="go-online"><b>온라인 대전</b><span>친구와 각자의 컴퓨터에서 · 방 코드로 연결</span></button>
    <div class="notice">아래는 <b>한 화면에서 두 사람이 번갈아</b> 하는 대전입니다. 준비 단계가 바뀔 때마다 화면을 넘겨주세요.</div>
    <label class="field">상대 이름<input id="p2-name" maxlength="16" value="도전자"></label>
    <p class="pick-label">상대 단체 (기본 덱 사용)</p>${groupGridHTML({ small: true })}`,
    [{ label: "취소", value: false }, { label: "대전 시작", value: true, cls: "primary" }], { cls: "wide-modal", onOpen: w => { get = bindGroupGrid(w, f === "G1" ? "B1" : "G1");
      const ob = w.querySelector("#go-online"); if (ob) ob.addEventListener("click", () => { w.remove(); startOnline(f); }); } });
  if (!ok) return;
  const pg = get() || "G1";
  const name = ($("#p2-name") ? $("#p2-name").value : "") || "도전자";
  launch({ mode: "hotseat", p0: { name: u.id, group: f, cards: Store.deck(u, f).cards }, p1: { name: name.trim().slice(0, 16) || "도전자", group: pg, cards: STARTER_DECKS[pg] } });
}
function launch(cfg) {
  App.screen = "game"; Bg.set("off");
  cfg.onExit = () => { App.screen = null; showLobby(); };
  startMatch(cfg);
}
/* 경기 종료 시 호출 (game.js) — 기록과 보상 */
function onMatchEnd(g) {
  const u = Store.user(); if (!u || g._recorded) return g._reward || null;
  g._recorded = true;
  if (g.mode !== "ai") return null;
  const won = g.winner === 0;
  u.stats[won ? "w" : "l"]++;
  u.spins = (u.spins || 0) + 1;   // 크로네아의 수레바퀴 표 1장
  if (g.cfg.exp && typeof Exp !== "undefined") { Exp.onEnd(g); Store.save(); g._reward = null; return null; }
  if (g.cfg.pil && typeof Pilgrim !== "undefined") { Pilgrim.onEnd(g); Store.save(); g._reward = null; return null; }   // v3.25 성로 순례: 보상은 순례 화면에서
  let reward = null;
  if (won && !Store.allCards(u)) {
    const pool = cardsOfGroup(g.players[0].group).filter(c => !c.base && (u.collection[c.id] || 0) < maxCopiesOf(c));   // v3.28 강화 카드는 합쳐서만
    if (pool.length) { const weights = pool.map(c => 9 - c.lv); let r = Math.random() * weights.reduce((a, b) => a + b, 0); for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) { reward = pool[i].id; break; } } reward = reward || pool[0].id; Store.grantCard(u, reward); }
  }
  Store.save();
  g._reward = reward;
  return reward;
}

/* ---------- 덱 조정실 ---------- */
/* v3.0 덱 조정실
   - 넣기: 카드를 누르면 1장 · Shift+누르기는 최대 장수까지 · 카드 아래 마름모를 누르면 그 장수로 맞춤 · 덱 칸으로 끌어다 놓기
   - 빼기: 오른쪽 누르기(우클릭) · 덱 목록의 − 또는 줄 누르기 · 덱 줄을 보유 카드 쪽으로 끌어다 놓기
   - 40장 규칙: 위 띠의 40칸 계기판. 40장이 넘게 넣으려 하면 경보(붉은 띠 · 흔들림 · 소리). 정확히 40장일 때만 저장 단추가 켜진다
   - 덱 초안(Store.draft): 고치는 중인 덱은 저장 전에도 남는다. 상점에서 산 카드도 이 초안에 들어온다(js/shop.js)
   - 배경: v3.10.7부터 타이틀 그림(img/title/title_art.jpg) 한 장을 멈춘 채 깐다(css/title-art.css .ed-art). 예전의 운명의 감실(js/scenes.js)은 쓰지 않는다 */
/* v3.10.8 카드 보관함 종류 거르기: 한 줄에 하나만 켜진다. 공격 · 방어 · 공용 · 계략은 '마법' 칸에 붙은 작은 칸.
   예전에는 종류(전체 · 유닛 · 마법 · 아이템)와 마법 종류(모든 마법 · 공격 …)가 따로 켜져서, 유닛을 켠 채 공격을 누르면 0장이 나왔다 */
const POOL_TYPES = [["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"], ["upgrade", "업그레이드"]];   // v3.28 업그레이드 = 강화 카드(js/upgrades.js)
const SPELL_KINDS = [["atk", "공격", "내 공격 턴에만"], ["def", "방어", "내 방어 턴에만"], ["any", "공용", "어느 턴에든"], ["hand", "계략", "칸 없이 바로 발동"]];
/* 보관함 묶음 제목 (여러 종류가 함께 보일 때) */
const POOL_SECS = { unit: ["유닛", ""], atk: ["공격 마법", "내 공격 턴 · 뒷면으로 칸에"], def: ["방어 마법", "내 방어 턴 · 뒷면으로 칸에"], any: ["공용 마법", "어느 턴이든 · 뒷면으로 칸에"], hand: ["계략 마법", "칸 없이 내는 즉시 발동"], item: ["아이템", ""] };
function poolTypeMatch(c, type, kind) {
  if (type === "upgrade") return !!c.base;
  if (type === "unit") return c.type === "unit";
  if (type === "item") return c.type === "item";
  if (type === "spell") return c.type !== "unit" && c.type !== "item" && (kind === "all" || c.type === kind);
  return true;
}
function poolMatch(c, E) {
  if (!poolTypeMatch(c, E.type, E.kind)) return false;
  if (E.lv && c.lv !== E.lv) return false;
  if (E.q && !c.name.includes(E.q)) return false;
  return true;
}
const kindOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
/* v3.12.1 덱 점수(DECK_GRADE_PT · cardScore · deckScore)는 v3.24.4에 js/grades.js로 옮겼다(컴퓨터 맞춤 덱 js/aideck.js와 함께 쓴다).
   덱 평가(S~D)는 그 단체 기본 덱 점수에 견준 비율이다(기본 덱 = B 한가운데). 나눈 법은 docs/GRADES.md */
const DECK_TIERS = [[1.25, "S"], [1.12, "A"], [0.95, "B"], [0.8, "C"], [0, "D"]];
/* 40칸 계기판: 칸마다 유닛(금) · 마법(보라) · 아이템(황동) 색, 10칸마다 마디. 넘친 칸은 붉게 */
function deckGaugeHTML(cards) {
  const ids = sortDeckCards(Object.keys(cards).filter(k => cards[k] > 0)), seq = [];
  for (const id of ids) for (let i = 0; i < cards[id]; i++) seq.push(kindOf(CARDS[id]));
  const N = RULES.deckSize, n = seq.length, cells = [];
  for (let i = 0; i < Math.max(N, n); i++) cells.push(`<i class="g-cell ${i < n ? "k-" + seq[i] : ""}${i >= N ? " over" : ""}${i % 10 === 9 && i < N - 1 ? " notch" : ""}"></i>`);
  return `<div class="g-cells" style="--n:${Math.max(N, n)}">${cells.join("")}</div>`;
}
function showEditor(f, focusId) {
  let u = Store.user();
  if (!Store.ownsGroup(u, f)) { toast("보유하지 않은 덱입니다.", "warn"); return; }
  App.screen = "editor"; Bg.set("calm"); Bg.freeze(); Bg.cv.style.opacity = 0; if (typeof Titans !== "undefined") Titans.mode("off");   /* v3.10.7 움직이는 하늘 · 세 존재 · 감실 장면 대신 타이틀 그림 한 장(컴퓨터 자원) */
  const all = Store.allCards(u);
  const fromStore = () => { const d = Store.draft(u, f) || Store.deck(u, f); return { cards: Object.assign({}, d.cards), name: d.name || Store.deck(u, f).name }; };
  const st = fromStore();
  const E = { f, cards: st.cards, name: st.name, type: "all", kind: "all", lv: 0, grade: "", q: "", hideOut: false, own: "have", scope: lobbyCompact() && !focusId ? "deck" : "pool", dType: "all", dKind: "all", dGrade: "" };
  const dirty = () => !!Store.draft(u, f);
  const persist = () => Store.setDraft(u, f, E.cards, E.name);
  const F = GROUPS[f];
  const freshN = () => cardsOfGroup(f).filter(c => u.fresh && u.fresh[c.id]).length;
  const boughtN = () => cardsOfGroup(f).filter(c => (u.collection[c.id] || 0) > 0).length;
  const ownChips = () => (all
    ? [["have", "모든 카드"], ["bought", `상점에서 산 카드 ${boughtN()}`], ["fresh", `새로 산 카드 ${freshN()}`]]
    : [["have", "가진 카드"], ["fresh", `새로 산 카드 ${freshN()}`], ["every", "모든 카드 (못 가진 것도)"]])
    .map(([k, l]) => `<button class="chip${E.own === k ? " on" : ""}${k === "fresh" && freshN() ? " has-new" : ""}" data-own="${k}">${l}</button>`).join("");
  $("#app").innerHTML = `<section class="screen screen-editor">
    <div class="ed-art" aria-hidden="true"></div>
    ${headerHTML("덱 조정실")}
    <div class="ed-bar fac-${F.faction}" style="--gc:${F.color}">
      <div class="ed-name rq" style="--gc:${F.color}"><i class="rq-plate" aria-hidden="true"></i>${groupEmblem(f)}<label class="sr" for="ed-name">덱 이름</label><input id="ed-name" maxlength="24" value="${esc(E.name)}"></div>
      <div class="ed-gauge" id="ed-gauge" role="status" aria-live="polite"></div>
      <div class="ed-btns">
        <button class="btn ghost" id="ed-back">대기실로</button>
        <button class="btn" id="ed-revert" title="초안을 버리고 마지막으로 저장한 덱으로 되돌립니다">되돌리기</button>
        <button class="btn ghost" id="ed-starter" title="이 단체의 기본 덱 40장으로 바꿉니다 (저장해야 반영)">기본 덱</button>
        <button class="btn primary ed-save" id="ed-save">저장</button>
        <button class="btn primary alt" id="ed-play">이 덱으로 대전</button>
      </div>
    </div>
    <div class="editor">
      <section class="ed-deck" id="ed-drop">
        <h3 class="panel-title">운명의 서 <span id="ed-deck-n"></span></h3>
        <div class="ed-alarm" id="ed-alarm" hidden></div>
        <div id="ed-mix" class="ed-mix"></div>
        <div id="ed-curve" class="ed-curve" aria-label="레벨별 장수"></div>
        <div id="ed-deck-list" class="deck-list"></div>
        <div class="ed-deck-foot"><span class="muted small">줄을 누르면 1장 뺍니다 · 오른쪽으로 끌어내도 뺍니다</span><button class="btn xs ghost" id="ed-clear" title="덱을 모두 비웁니다 (저장 전에는 되돌리기로 돌아옵니다)">비우기</button></div>
      </section>
      <section class="ed-pool" id="ed-pool-panel">
        <div class="pool-head"><h3 class="panel-title">${all ? "카드 보관함" : "보유 카드"} <small>${F.name}의 유닛·마법·아이템만 넣을 수 있습니다</small></h3>
          <input id="ed-q" class="ed-q" placeholder="이름 검색" aria-label="카드 이름 검색"></div>
        <div class="chips" id="ed-own">${ownChips()}<span class="sep"></span><button class="chip ghost" data-goshop="1" title="이 단체의 카드를 상점에서 삽니다">상점에서 사기 →</button></div>
        <div class="ed-filts">
          <div class="ed-filt ed-filt-pool" id="ed-filt-pool">
            <div class="edf-head"><button type="button" class="edf-tab" data-scope="pool">카드 보관함</button><small>가진 카드 전체</small></div>
            <div class="dv-kinds ed-kinds" id="ed-filter" role="group" aria-label="카드 종류로 거르기"></div>
            <div class="chips dv-grades ed-grades" id="ed-grades" role="group" aria-label="등급으로 거르기"></div>
            <div class="chips" id="ed-filter2">
              <button class="chip on" data-lv="0">모든 레벨</button>${[1, 2, 3, 4, 5, 6, 7, 8].map(l => `<button class="chip" data-lv="${l}">Lv${l}</button>`).join("")}
              <span class="sep"></span>
              <label class="chip tog"><input type="checkbox" id="ed-hideout"> 남은 카드만</label>
            </div>
          </div>
          <div class="ed-filt ed-filt-deck" id="ed-filt-deck">
            <div class="edf-head"><button type="button" class="edf-tab" data-scope="deck">내 덱</button><small>운명의 서에 든 카드만</small></div>
            <div class="ed-score" id="ed-score" role="status" aria-live="polite"></div>
            <div class="dv-kinds ed-kinds" id="ed-dfilter" role="group" aria-label="내 덱 카드 종류로 거르기"></div>
            <div class="chips dv-grades ed-grades" id="ed-dgrades" role="group" aria-label="내 덱 카드 등급으로 거르기"></div>
          </div>
        </div>
        <p class="ed-help"><span><kbd>누르기</kbd> 1장 넣기</span><span><kbd>Shift</kbd>+누르기 가득</span><span><kbd>우클릭</kbd> 1장 빼기</span><span><b>◆</b> 마름모로 장수 맞추기</span><span>끌어서 왼쪽 서에 놓기</span><span><b>⌕</b> 크게 보기</span></p>
        <div id="ed-pool" class="pool-grid"></div>
      </section>
    </div>
  </section>`;
  const root = $(".screen-editor");
  bindHeader(root);
  bindPreview($("#ed-deck-list"));

  let lastN = -1;
  const draw = () => {
    u = Store.user();
    const n = countMap(E.cards), N = RULES.deckSize, isDirty = dirty(), valid = n === N;
    const status = n > N ? { c: "bad", t: `${n - N}장 초과 — 빼야 저장할 수 있습니다` } : n < N ? { c: "need", t: `${N - n}장 더 넣어야 저장할 수 있습니다` } : isDirty ? { c: "ready", t: "40장 완성 — 저장할 수 있습니다" } : { c: "ok", t: "저장됨 · 출전 준비 완료" };
    $("#ed-gauge").className = `ed-gauge st-${status.c}`;
    $("#ed-gauge").innerHTML = `<div class="g-num"><b>${n}</b><span>/ ${N}</span></div><div class="g-body">${deckGaugeHTML(E.cards)}<em class="g-msg">${status.t}</em></div>`;
    $("#ed-deck-n").textContent = `${n} / ${N}`;
    const save = $("#ed-save");
    save.disabled = !valid || !isDirty;
    save.innerHTML = !valid ? `저장 <small>${n < N ? N - n + "장 부족" : n - N + "장 초과"}</small>` : isDirty ? "저장" : "저장됨";
    save.title = !valid ? `덱은 정확히 ${N}장이어야 저장할 수 있습니다 (지금 ${n}장)` : isDirty ? "덱을 저장합니다 (Ctrl+S)" : "바뀐 것이 없습니다";
    save.classList.toggle("ready", valid && isDirty);
    const canPlayNow = !isDirty && Store.deckPlayable(u, f);
    $("#ed-play").disabled = !canPlayNow;
    $("#ed-play").title = canPlayNow ? "" : "40장을 채우고 저장해야 게임에 들어갈 수 있습니다.";
    $("#ed-revert").disabled = !isDirty;
    $("#ed-clear").disabled = !n;
    const ids = sortDeckCards(Object.keys(E.cards).filter(k => E.cards[k] > 0));
    const by = t => ids.filter(id => t(CARDS[id])).reduce((s, id) => s + E.cards[id], 0);
    $("#ed-mix").innerHTML = `<span class="k-unit">유닛 <b>${by(c => c.type === "unit")}</b></span><span class="k-spell">마법 <b>${by(c => c.type !== "unit" && c.type !== "item")}</b></span><span class="k-item">아이템 <b>${by(c => c.type === "item")}</b></span>`;
    const lvN = [1, 2, 3, 4, 5, 6, 7, 8].map(l => by(c => c.lv === l)), lvMax = Math.max(4, ...lvN);
    $("#ed-curve").innerHTML = lvN.map((k, i) => `<button class="cv-col${E.lv === i + 1 ? " on" : ""}" data-lv="${i + 1}" title="레벨 ${i + 1} · ${k}장 (누르면 보유 카드를 이 레벨로 거름)"><span class="cv-candle" style="--h:${(k / lvMax * 100).toFixed(0)}%">${k ? '<i class="cv-flame"></i>' : ""}</span><b>${k || ""}</b><small>${i + 1}</small></button>`).join("");
    $("#ed-deck-list").innerHTML = ids.map(id => {
      const c = CARDS[id];
      const sub = c.type === "unit" ? `${c.a}/${c.d}/${c.h}${c.up ? " ◆" + c.up : ""}` : c.type === "item" ? "아이템" : TYPES[c.type].name;
      const canAdd = (E.cards[id] || 0) < Math.min(maxCopiesOf(id), Store.ownedCount(u, id)) && !(typeof uniqueBlock === "function" && uniqueBlock(E.cards, id));
      return `<div class="dl-row k-${kindOf(c)} ${c.faction ? "fac-" + c.faction : "fac-item"}" data-card="${id}" draggable="true" style="--el:${ELEMENTS[c.el].color}">
        <button class="dl-main" data-rm="${id}" title="누르면 1장 뺍니다"><span class="dl-lv">${c.lv}</span><span class="dl-name">${esc(c.name)}</span><span class="dl-type">${sub}</span></button>
        <span class="dl-ctl"><button class="dl-b" data-rm="${id}" aria-label="${esc(c.name)} 1장 빼기">−</button><span class="dl-n">×${E.cards[id]}</span><button class="dl-b" data-add="${id}" ${canAdd ? "" : "disabled"} aria-label="${esc(c.name)} 1장 넣기">+</button></span></div>`;
    }).join("") || '<p class="empty">운명의 서가 비어 있습니다.<br>오른쪽 카드를 누르거나 끌어 오세요.</p>';
    const order = { unit: 0, atk: 1, def: 2, any: 3, hand: 4, item: 5 };
    /* v3.10.8 종류 칸의 수: 종류를 뺀 다른 거르기(보유 · 레벨 · 검색 · 남은 카드 · 등급)를 거친 카드 중 그 종류의 수 = 누르면 보일 장수 */
    const pre = cardsOfGroup(f).filter(c => poolMatch(c, { type: "all", kind: "all", lv: E.lv, q: E.q }))
      .filter(c => (E.type === "upgrade" && c.base) || E.own === "every" ? true : E.own === "bought" ? (u.collection[c.id] || 0) > 0 : E.own === "fresh" ? !!(u.fresh && u.fresh[c.id]) : Store.ownedCount(u, c.id) > 0)
      .filter(c => !E.hideOut || Store.ownedCount(u, c.id) - (E.cards[c.id] || 0) > 0);
    /* v3.12.1 종류 · 등급 줄 그리기 (카드 보관함과 내 덱이 같은 모양을 쓴다).
       cnt = 장수 셈법(보관함은 종 수, 내 덱은 덱에 든 장수), pkA · grA = 누르기 속성, unit = 제목의 단위 */
    const filterRows = (list, cnt, S, kindSel, gradeSel, pkA, grA, unit) => {
      const sum = arr => arr.reduce((s, c) => s + cnt(c), 0);
      const base = list.filter(c => poolTypeMatch(c, S.type, S.kind));
      const preG = list.filter(c => !S.grade || gradeOf(c) === S.grade);
      const btn = (t, k, label, tip, cls) => { const n = sum(preG.filter(c => poolTypeMatch(c, t, k || "all"))), on = S.type === t && (t !== "spell" || S.kind === (k || "all"));
        return `<button type="button" class="dv-k ${cls}${on ? " on" : ""}" data-${pkA}="${t}${k ? ":" + k : ""}" aria-pressed="${on}" ${n || on ? "" : "disabled"} title="${tip}"><span>${label}</span><b>${n}</b></button>`; };
      $(kindSel).innerHTML = `<span class="dv-gl">종류</span>`
        + btn("all", "", "전체", "모든 종류", "k-all") + btn("unit", "", "유닛", "유닛만 보기", "k-unit")
        + `<span class="ed-spell-grp${S.type === "spell" ? " on" : ""}">${btn("spell", "", "마법", "모든 마법 보기", "k-spell")}<span class="ed-sub">${SPELL_KINDS.map(([k, l, tip]) => btn("spell", k, l, `${l} 마법만 보기 — ${tip}`, "k-" + k)).join("")}</span></span>`
        + btn("item", "", "아이템", "아이템만 보기", "k-item")
        + btn("upgrade", "", "업그레이드", "강화 카드 — 같은 카드 3장을 합쳐 만든다 (못 가진 것도 보임)", "k-upgrade");
      /* v3.7.6 등급 칸: 다른 거르기를 다 거친 카드 안의 등급과 그 수. 고른 등급이 사라지면 '모든 등급'으로 */
      const gN = {}; for (const c of base) { const g = gradeOf(c); gN[g] = (gN[g] || 0) + cnt(c); }
      if (S.grade && !gN[S.grade]) S.grade = "";
      $(gradeSel).innerHTML = `<span class="dv-gl">등급</span><button type="button" class="dv-g g-all${S.grade ? "" : " on"}" data-${grA}="" aria-pressed="${!S.grade}"><span>모든 등급</span><b>${sum(base)}</b></button>`
        + GRADE_IDS.filter(g => gN[g]).map(g => { const G = GRADES[g], on = S.grade === g;
          return `<button type="button" class="dv-g grade-${g}${on ? " on" : ""}" data-${grA}="${g}" style="--gr:${G.color}" aria-pressed="${on}" title="${G.name} (${G.en}) ${gN[g]}${unit}만 보기"><span>${G.name}</span><b>${gN[g]}</b></button>`; }).join("");
      return base.filter(c => !S.grade || gradeOf(c) === S.grade);
    };
    const PS = { type: E.type, kind: E.kind, grade: E.grade };
    const poolSel = filterRows(pre, () => 1, PS, "#ed-filter", "#ed-grades", "pk", "gr", "종");
    E.grade = PS.grade;
    /* v3.12.1 내 덱 거르기: 덱에 든 카드만 (검색은 함께 적용, 레벨 · 보유 · 남은 카드는 쓰지 않는다). 수는 덱에 든 장수 */
    const deckList = ids.map(id => CARDS[id]).filter(c => c && (!E.q || c.name.includes(E.q)));
    const DS = { type: E.dType, kind: E.dKind, grade: E.dGrade };
    const deckSel = filterRows(deckList, c => E.cards[c.id] || 0, DS, "#ed-dfilter", "#ed-dgrades", "dpk", "dgr", "장");
    E.dGrade = DS.grade;
    {
      const sc = deckScore(E.cards), st = deckScore(Store.starter(f).cards), full = sc.n === N;
      const ratio = st.total ? sc.total * (N / Math.max(1, sc.n)) / st.total : 1;   /* 40장이 안 되면 같은 평균으로 채웠다고 보고 견준다 */
      const tier = sc.n ? DECK_TIERS.find(([r]) => ratio >= r)[1] : "–";
      const diff = Math.round((ratio - 1) * 100);
      $("#ed-score").innerHTML = `<span class="sc-tier t-${tier === "–" ? "none" : tier}" title="덱 평가 — 기본 덱(${st.total}점)에 견준 비율"><i>${tier}</i></span>
        <span class="sc-main"><em>덱 점수</em><b>${sc.total}</b><small>점${full ? "" : ` · ${sc.n}/${N}장`}</small></span>
        <span class="sc-sub"><span>등급 <b>${sc.grade}</b> + 레벨 <b>${sc.lv}</b></span><span>기본 덱 ${st.total}점 ${sc.n ? (diff >= 0 ? "대비 +" : "대비 ") + diff + "%" : ""}</span></span>`;
      $("#ed-score").title = `카드 한 장 점수 = 등급 점수 + 레벨\n등급 점수: ${GRADE_IDS.map(g => GRADES[g].name + " " + DECK_GRADE_PT[g]).join(" · ")}\n평가: 기본 덱 대비 S 125%↑ · A 112%↑ · B 95%↑ · C 80%↑ · D 그 아래${full ? "" : "\n(40장이 안 되면 지금 평균으로 40장을 채웠다고 보고 평가)"}`;
    }
    $("#ed-filt-pool").classList.toggle("active", E.scope === "pool");
    $("#ed-filt-deck").classList.toggle("active", E.scope === "deck");
    $$(".edf-tab", root).forEach(b => b.setAttribute("aria-pressed", b.dataset.scope === E.scope));
    $("#ed-pool-panel").classList.toggle("scope-deck", E.scope === "deck");
    const pool = (E.scope === "deck" ? deckSel : poolSel)
      .sort((a, b) => order[a.type] - order[b.type] || a.lv - b.lv || a.id.localeCompare(b.id));
    /* v3.10.8 여러 종류가 함께 보이면 종류마다 제목 줄을 넣는다 (유닛 → 공격 → 방어 → 공용 → 계략 → 아이템). 내 덱에서는 장수 */
    const secN = {}; for (const c of pool) secN[c.type] = (secN[c.type] || 0) + (E.scope === "deck" ? E.cards[c.id] || 0 : 1);
    const showSec = Object.keys(secN).length > 1;
    let lastSec = "";
    $("#ed-pool").innerHTML = pool.map(c => {
      let head = "";
      if (showSec && c.type !== lastSec) { lastSec = c.type; const [t, sub] = POOL_SECS[c.type] || [c.type, ""];
        head = `<div class="pool-sec k-${c.type}"><span class="ps-name">${t}</span><b>${secN[c.type]}</b>${sub ? `<small>${sub}</small>` : ""}</div>`; }
      return head + poolCardHTML(c);
    }).join("") || `<p class="empty">${E.scope === "deck" ? (countMap(E.cards) ? "내 덱에 이 조건의 카드가 없습니다." : "운명의 서가 비어 있습니다. 카드 보관함에서 카드를 넣으세요.") : E.own === "fresh" ? "새로 산 카드가 없습니다. 상점에서 카드를 사면 여기 NEW로 나옵니다." : E.own === "bought" ? "상점에서 산 이 단체의 카드가 없습니다." : "조건에 맞는 카드가 없습니다."}</p>`;
    function poolCardHTML(c) {
      const own = Store.ownedCount(u, c.id), inDeck = E.cards[c.id] || 0, cap = Math.min(maxCopiesOf(c), own), left = own - inDeck;
      const bought = u.collection[c.id] || 0, fresh = u.fresh && u.fresh[c.id];
      if (!own) return `<div class="pool-card locked" data-pc="${c.id}">
        <div class="pc-face" aria-label="${esc(c.name)} (가지고 있지 않음)">${cardHTML(c, { size: "md", brief: true })}<span class="pc-lock">가지고 있지 않음</span></div>
        <button class="btn xs gold pc-shop" data-goshop="${c.id}">상점에서 사기</button></div>`;
      const pips = Array.from({ length: maxCopiesOf(c) }, (_, k) => `<button class="pip${k < inDeck ? " on" : ""}${k >= cap ? " no" : ""}" data-set="${c.id}" data-k="${k + 1}" ${k >= cap ? "disabled" : ""} aria-label="덱에 ${k + 1}장으로"></button>`).join("");
      return `<div class="pool-card${left <= 0 ? " out" : ""}${inDeck ? " in-deck" : ""}${fresh ? " fresh" : ""}" data-pc="${c.id}">
        <button class="pc-face" data-add="${c.id}" draggable="true" title="누르기: 1장 넣기 · Shift: 가득 · 우클릭: 1장 빼기" aria-label="${esc(c.name)} 덱에 넣기">${cardHTML(c, { size: "md", brief: true })}${inDeck ? `<span class="pc-badge">${inDeck}</span>` : ""}${fresh ? '<span class="pc-new">NEW</span>' : ""}</button>
        <button class="pc-zoom" data-show="${c.id}" aria-label="${esc(c.name)} 크게 보기" title="크게 보기">⌕</button>
        <div class="pc-ctrl">
          <button class="pc-btn pc-minus" data-rm="${c.id}" ${inDeck ? "" : "disabled"} aria-label="${esc(c.name)} 덱에서 1장 빼기">−</button>
          <span class="pc-pips" role="group" aria-label="덱에 ${inDeck}장">${pips}</span>
          <button class="pc-btn pc-plus" data-add="${c.id}" ${left <= 0 || inDeck >= cap ? "disabled" : ""} aria-label="${esc(c.name)} 덱에 1장 넣기">+</button>
        </div>
        <span class="pc-meta">${all ? (bought ? `상점에서 산 것 <b>${bought}</b>` : "관리자 카드") : `남음 <b>${Math.max(0, left)}</b> · 보유 ${bought}`}</span></div>`;
    }
    $("#ed-own").innerHTML = ownChips() + '<span class="sep"></span><button class="chip ghost" data-goshop="1" title="이 단체의 카드를 상점에서 삽니다">상점에서 사기 →</button>';
    if (typeof Scenes !== "undefined") Scenes.editorState(n, lvN);
    if (lastN !== -1 && n === N && lastN !== N) { $("#ed-gauge").classList.add("complete"); if (typeof FEEL !== "undefined") FEEL.play("confirm", .55); }
    lastN = n;
  };
  /* 경보: 40장이 넘게 넣으려 할 때 등 */
  let alarmT = 0;
  const alarm = (msg, kind) => {
    const a = $("#ed-alarm"); a.hidden = false; a.className = "ed-alarm " + (kind || "bad");
    a.innerHTML = `<i class="al-ico" aria-hidden="true">!</i><span>${msg}</span>`;
    a.classList.remove("ring"); void a.offsetWidth; a.classList.add("ring");
    const g = $("#ed-gauge"); g.classList.remove("shake"); void g.offsetWidth; g.classList.add("shake");
    if (typeof FEEL !== "undefined") FEEL.play("deny", .9);
    clearTimeout(alarmT); alarmT = setTimeout(() => { a.hidden = true; }, 3600);
  };
  const tile = id => $(`.pool-card[data-pc="${id}"]`, root);
  const row = id => $(`.dl-row[data-card="${id}"]`, root);
  /* 넣은 카드가 서(덱 목록)로 날아간다 */
  const fly = id => {
    if (Bg.reduced) return;
    const t = tile(id), src = t && t.querySelector(".pc-face .card"), dst = row(id);
    if (!src || !dst) { if (dst) { dst.classList.remove("flash"); void dst.offsetWidth; dst.classList.add("flash"); } return; }
    const a = src.getBoundingClientRect(), b = dst.getBoundingClientRect();
    const w = document.createElement("div"); w.className = "ed-fly"; w.style.left = a.left + "px"; w.style.top = a.top + "px";
    const cl = src.cloneNode(true); w.appendChild(cl); document.body.appendChild(w);
    const s0 = a.width / (cl.getBoundingClientRect().width || a.width);
    const dx = b.left + b.width * .5 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    w.animate([
      { transform: `translate(0,0) scale(${s0})`, opacity: 1, filter: "brightness(1.2)" },
      { transform: `translate(${dx * .45}px,${dy * .45 - 60}px) scale(${s0 * .7}) rotate(-6deg)`, opacity: 1, offset: .45 },
      { transform: `translate(${dx}px,${dy}px) scale(${s0 * .16}) rotate(4deg)`, opacity: 0, filter: "brightness(2.2)" }
    ], { duration: 520, easing: "cubic-bezier(.4,.1,.3,1)" }).onfinish = () => { w.remove(); dst.classList.remove("flash"); void dst.offsetWidth; dst.classList.add("flash"); };
  };
  const setCount = (id, k, silent) => {
    const c = CARDS[id], inDeck = E.cards[id] || 0, own = Store.ownedCount(u, id), cap = Math.min(maxCopiesOf(c), own);
    k = Math.max(0, k);
    if (k > inDeck) {
      if (inDeck >= own) { alarm(all ? "이 카드는 더 넣을 수 없습니다." : `덱 밖에 남은 「${esc(c.name)}」가 없습니다. 상점에서 더 사세요.`, "warn"); return false; }
      if (inDeck >= maxCopiesOf(c)) { alarm(maxCopiesOf(c) < RULES.maxCopies ? `「${esc(c.name)}」는 덱에 ${maxCopiesOf(c)}장만 넣을 수 있습니다.` : `같은 카드는 ${RULES.maxCopies}장까지입니다.`, "warn"); return false; }
      { const ub = typeof uniqueBlock === "function" ? uniqueBlock(E.cards, id) : null; if (ub) { alarm(ub + " 다른 유니크를 빼고 넣으세요.", "warn"); return false; } }   // v3.31
      const room = RULES.deckSize - countMap(E.cards);
      if (room <= 0) { alarm(`<b>덱이 가득 찼습니다 (${RULES.deckSize} / ${RULES.deckSize})</b> — ${RULES.deckSize}장을 넘길 수 없습니다. 다른 카드를 빼고 넣으세요.`); return false; }
      const want = k;
      k = Math.min(k, cap, inDeck + room);
      if (want > k && inDeck + room < want && !silent) setTimeout(() => alarm(`${RULES.deckSize}장까지만 넣었습니다. 더 넣으려면 다른 카드를 빼세요.`), 0);
    }
    if (k === inDeck) return false;
    if (k) E.cards[id] = k; else delete E.cards[id];
    if (k > inDeck && u.fresh && u.fresh[id]) { delete u.fresh[id]; }
    persist(); draw();
    if (k > inDeck) { fly(id); if (typeof FEEL !== "undefined") FEEL.play("pick", .5); }
    else if (typeof FEEL !== "undefined") FEEL.play("unselect", .5);
    return true;
  };
  const addCard = (id, n) => setCount(id, (E.cards[id] || 0) + (n || 1));
  const rmCard = id => setCount(id, (E.cards[id] || 0) - 1);
  const fillCard = id => setCount(id, Math.min(maxCopiesOf(id), Store.ownedCount(u, id)));
  // 크게 보기 창에서도 넣고 뺄 수 있다
  const showPoolCard = async id => {
    const own = Store.ownedCount(u, id), inDeck = E.cards[id] || 0, left = own - inDeck;
    const btns = [];
    if (inDeck) btns.push({ label: "− 1장 빼기", value: "rm" });
    if (left > 0) btns.push({ label: "+ 1장 넣기", value: "add", cls: "primary" });
    if (left > 1 && inDeck < maxCopiesOf(id)) btns.push({ label: "가득 넣기", value: "fill" });
    const ub = typeof Upgrade !== "undefined" ? Upgrade.button(id) : null; if (ub) btns.push(ub);   // v3.28 업그레이드(원래 카드 · 강화 카드 어느 쪽에서든)
    btns.push({ label: "닫기", value: null });
    const v = await showCardModal(CARDS[id], btns, `덱 <b>${inDeck}</b>장 · 남음 <b>${left}</b> · 보유 ${all ? "모두" : own}${typeof Upgrade !== "undefined" && Upgrade.upOf(id) ? "<br>" + Upgrade.note(id) : ""}`);
    if (v === "upgrade") { const r = await Upgrade.run(Upgrade.upOf(id)); if (r && r.ok) { u = Store.user(); draw(); } return; }
    if (v === "rm") rmCard(id); else if (v === "add") addCard(id); else if (v === "fill") fillCard(id);
  };
  const goShop = id => { SHOP.node = f; SHOP.open[GROUPS[f].faction] = true; showShop(); if (id && id !== "1") setTimeout(() => shopCardModal(id), 60); };
  root.addEventListener("click", e => {
    const gs = e.target.closest("[data-goshop]"); if (gs) { goShop(gs.dataset.goshop); return; }
    const show = e.target.closest("[data-show]"); if (show) { showPoolCard(show.dataset.show); return; }
    const set = e.target.closest("[data-set]");
    if (set) { const k = +set.dataset.k, cur = E.cards[set.dataset.set] || 0; setCount(set.dataset.set, k === cur ? k - 1 : k); return; }
    const rm = e.target.closest("[data-rm]"); if (rm) { rmCard(rm.dataset.rm); return; }
    const add = e.target.closest("[data-add]"); if (add) { if (e.shiftKey) fillCard(add.dataset.add); else addCard(add.dataset.add); return; }
    const top = () => { const pg = $("#ed-pool"); if (pg) pg.scrollTop = 0; };
    /* v3.12.1 카드 보관함 쪽 거르기를 누르면 보관함을, 내 덱 쪽을 누르면 내 덱만 보인다 */
    const sc = e.target.closest("[data-scope]");
    if (sc) { E.scope = sc.dataset.scope; top(); draw(); return; }
    const own = e.target.closest("[data-own]");
    if (own) { E.own = own.dataset.own; E.scope = "pool"; draw(); return; }
    const gr = e.target.closest("[data-gr]");
    if (gr) { E.grade = E.scope === "pool" && E.grade === gr.dataset.gr ? "" : gr.dataset.gr; E.scope = "pool"; draw(); return; }
    const pk = e.target.closest("[data-pk]");
    if (pk) { const [t, k] = pk.dataset.pk.split(":"); const again = E.scope === "pool" && t === "spell" && k && E.type === "spell" && E.kind === k;
      E.type = t; E.kind = t === "spell" && k && !again ? k : "all"; E.scope = "pool"; top(); draw(); return; }
    const dgr = e.target.closest("[data-dgr]");
    if (dgr) { E.dGrade = E.scope === "deck" && E.dGrade === dgr.dataset.dgr ? "" : dgr.dataset.dgr; E.scope = "deck"; top(); draw(); return; }
    const dpk = e.target.closest("[data-dpk]");
    if (dpk) { const [t, k] = dpk.dataset.dpk.split(":"); const again = E.scope === "deck" && t === "spell" && k && E.dType === "spell" && E.dKind === k;
      E.dType = t; E.dKind = t === "spell" && k && !again ? k : "all"; E.scope = "deck"; top(); draw(); return; }
    const chip = (attr, key, conv) => { const b = e.target.closest(`[data-${attr}]`); if (!b) return false; E.scope = "pool"; E[key] = conv(b.dataset[attr]); if (b.classList.contains("cv-col") && E[key] && E[key] === +$(`#ed-filter2 .chip.on`, root).dataset.lv) E[key] = 0; $$(`#ed-filter [data-${attr}], #ed-filter2 [data-${attr}]`, root).forEach(x => x.classList.toggle("on", x.dataset[attr] == E[key])); draw(); return true; };
    if (chip("lv", "lv", Number)) return;
  });
  // 우클릭 = 1장 빼기 (보유 카드 · 덱 줄)
  root.addEventListener("contextmenu", e => {
    const t = e.target.closest(".pool-card[data-pc], .dl-row[data-card]"); if (!t || !$(".editor", root).contains(t)) return;
    e.preventDefault(); rmCard(t.dataset.pc || t.dataset.card);
  });
  // 끌어다 놓기: 보유 카드 → 운명의 서 = 넣기, 서의 줄 → 보유 카드 쪽 = 빼기
  root.addEventListener("dragstart", e => {
    const face = e.target.closest(".pc-face[data-add]"), r = e.target.closest(".dl-row[data-card]");
    if (face) { e.dataTransfer.setData("text/plain", "add:" + face.dataset.add); e.dataTransfer.effectAllowed = "copy"; root.classList.add("dragging-add"); }
    else if (r) { e.dataTransfer.setData("text/plain", "rm:" + r.dataset.card); e.dataTransfer.effectAllowed = "move"; root.classList.add("dragging-rm"); }
  });
  root.addEventListener("dragend", () => { root.classList.remove("dragging-add", "dragging-rm"); $$(".drop-on", root).forEach(x => x.classList.remove("drop-on")); });
  for (const [sel, kind] of [["#ed-drop", "add"], ["#ed-pool-panel", "rm"]]) {
    const z = $(sel, root);
    z.addEventListener("dragover", e => { if (root.classList.contains("dragging-" + kind)) { e.preventDefault(); z.classList.add("drop-on"); } });
    z.addEventListener("dragleave", e => { if (!z.contains(e.relatedTarget)) z.classList.remove("drop-on"); });
    z.addEventListener("drop", e => {
      e.preventDefault(); z.classList.remove("drop-on");
      const [k, id] = (e.dataTransfer.getData("text/plain") || "").split(":");
      if (k === kind && CARDS[id]) { if (k === "add") addCard(id); else rmCard(id); }
    });
  }
  // 덱 조정실은 1.5배로 보인다(css zoom). 덱 목록과 보유 카드 칸이 화면 높이에 맞게 스크롤되도록 높이를 잰다
  const fit = () => {
    const ed = $(".editor", root); if (!ed || !ed.isConnected) { removeEventListener("resize", fit); return; }
    const z = parseFloat(getComputedStyle(ed).zoom) || 1;
    const top = ed.getBoundingClientRect().top;
    ed.style.setProperty("--avail", Math.max(lobbyCompact() ? 240 : 320, (innerHeight - top - (lobbyCompact() ? 8 : 14)) / z - (lobbyCompact() ? 14 : 32)) + "px");   /* v3.32.2 폰 · 앱은 아래 여백을 줄인다 */
  };
  addEventListener("resize", fit); fit();
  const onKey = e => {
    if (!root.isConnected) { removeEventListener("keydown", onKey); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); $("#ed-save").click(); }
  };
  addEventListener("keydown", onKey);
  $("#ed-hideout").addEventListener("change", e => { E.hideOut = e.target.checked; E.scope = "pool"; draw(); });
  $("#ed-q").addEventListener("input", e => { E.q = e.target.value.trim(); draw(); });
  $("#ed-name").addEventListener("input", e => { E.name = e.target.value; persist(); draw(); });
  $("#ed-save").addEventListener("click", () => {
    const n = countMap(E.cards);
    if (n !== RULES.deckSize) { alarm(n < RULES.deckSize ? `덱은 정확히 ${RULES.deckSize}장이어야 저장할 수 있습니다. <b>${RULES.deckSize - n}장</b>이 더 필요합니다.` : `<b>${n - RULES.deckSize}장 초과</b> — ${RULES.deckSize}장으로 줄여야 저장할 수 있습니다.`); return; }
    const r = Store.saveDeck(u, f, E.cards, E.name);
    if (!r.ok) { alarm(esc(r.msg)); return; }
    E.name = Store.deck(u, f).name; $("#ed-name").value = E.name;
    toast("덱을 저장했습니다. 이제 이 덱으로 대전할 수 있습니다.", "good");
    if (typeof FEEL !== "undefined") FEEL.play("confirm", .8);
    if (typeof Scenes !== "undefined") Scenes.seal();
    draw();
  });
  $("#ed-revert").addEventListener("click", () => { Store.clearDraft(u, f); const d = Store.deck(u, f); E.cards = Object.assign({}, d.cards); E.name = d.name; $("#ed-name").value = E.name; draw(); toast("마지막으로 저장한 덱으로 되돌렸습니다."); });
  $("#ed-clear").addEventListener("click", async () => {
    if (!(await modal(`<h3>운명의 서 비우기</h3><p>덱의 카드 ${countMap(E.cards)}장을 모두 뺍니다. 저장하기 전에는 <b>되돌리기</b>로 돌아올 수 있습니다.</p>`, [{ label: "취소", value: false }, { label: "비우기", value: true, cls: "danger" }]))) return;
    E.cards = {}; persist(); draw();
  });
  $("#ed-starter").addEventListener("click", () => { const d = Store.starter(f); const own = {}; for (const id in d.cards) own[id] = Math.min(d.cards[id], Store.ownedCount(u, id)); E.cards = own; E.name = d.name; $("#ed-name").value = E.name; persist(); draw(); toast("기본 덱을 불러왔습니다. 저장해야 반영됩니다."); });
  $("#ed-back").addEventListener("click", () => { if (dirty()) toast("고치던 덱은 초안으로 남아 있습니다. 다시 오면 이어서 고칠 수 있습니다."); showLobby(); });
  $("#ed-play").addEventListener("click", async () => {
    if (dirty() || !Store.deckPlayable(u, f)) { alarm("40장을 채우고 저장해야 게임에 들어갈 수 있습니다.", "warn"); return; }
    const v = await modal(`<h3>대전 방식</h3><p>저장된 「${esc(Store.deck(u, f).name)}」로 출전합니다.</p>`, [{ label: "취소", value: null }, { label: "대전 (2인)", value: "pvp" }, { label: "컴퓨터와 대전", value: "ai", cls: "primary" }]);
    if (v === "ai") startVsAI(f); else if (v === "pvp") startPvP(f);
  });
  // 다른 탭에서 상점으로 카드를 사면(같은 브라우저 저장소) 여기에도 바로 들어온다
  App.refresh = () => {
    if (App.screen !== "editor" || !root.isConnected) return;
    u = Store.user(); if (!u) return;
    const d = fromStore(); E.cards = d.cards; if (document.activeElement !== $("#ed-name")) { E.name = d.name; $("#ed-name").value = E.name; }
    draw();
  };
  draw();
  if (focusId && CARDS[focusId]) {
    if (!tile(focusId)) { E.own = all ? "have" : "every"; draw(); }
    const t = tile(focusId);
    if (t) { t.scrollIntoView({ block: "center", behavior: "smooth" }); t.classList.add("focus"); setTimeout(() => t.classList.remove("focus"), 2400); }
  }
}
function sortObj(o) { const r = {}; Object.keys(o).filter(k => o[k] > 0).sort().forEach(k => r[k] = o[k]); return r; }

/* ---------- 관리자 보관소 ---------- */
function showAdmin(tab) {
  const u = Store.user(); if (!u || !u.admin) return showLobby();
  App.screen = "admin"; Bg.set("calm");
  tab = tab || "B1";
  const users = Object.values(Store.data.users).filter(x => !x.admin);
  const sec = (title, sub, cards) => `<div class="vault-group"><h4>${title} <small>${sub}</small></h4><div class="vault-cards">${cards.map(c => cardHTML(c, { size: "md" })).join("")}</div></div>`;
  let body = "";
  if (GROUPS[tab]) {
    const G = GROUPS[tab], cs = cardsOfGroup(tab);
    const sp = cs.filter(c => c.type !== "unit" && c.type !== "item").sort((a, b) => a.lv - b.lv);
    const deck = STARTER_DECKS[tab], deckIds = sortDeckCards(Object.keys(deck));
    body = `<section class="vault-fac fac-${G.faction}" style="--gc:${G.color}"><h3>${groupEmblem(tab)}<span>${G.name}</span><small>${G.en} · ${FACTIONS[G.faction].name} · ${G.role}</small><button class="btn sm" data-edit="${tab}">${G.name} 덱 조정실</button></h3>
      <p class="muted small vault-blurb">${G.blurb} 카드 ${cs.length}종: 유닛 40 · 마법 ${sp.length} · 아이템 ${cs.filter(c => c.type === "item").length}</p>
      ${sec("기본 덱", `40장 · 컴퓨터끼리 대전시켜 다듬은 덱 (${deckIds.map(id => deck[id]).reduce((a, b) => a + b, 0)}장)`, deckIds.map(id => CARDS[id]))}
      ${sec("유닛", "40장 · 코인 카드 시뮬레이터", cs.filter(c => c.type === "unit"))}
      ${sec("마법", `${sp.length}장 · 마법 카드 시뮬레이터 v0.3 잣대`, sp)}
      ${sec("아이템", `${cs.filter(c => c.type === "item").length}장 · 아이템 카드 시뮬레이터 잣대`, cs.filter(c => c.type === "item"))}
    </section>`;
  } else {
    body = `<div class="users">${users.length ? `<table class="utable"><thead><tr><th>모험가</th><th>시작 단체</th>${GROUP_IDS.map(g => `<th>${GROUPS[g].name}</th>`).join("")}<th>보유 카드</th><th>레벨</th><th>전적</th><th></th></tr></thead><tbody>
        ${users.map(x => `<tr><td><b>${esc(x.id)}</b></td><td>${GROUPS[x.group] ? GROUPS[x.group].name : "-"}</td>
          ${GROUP_IDS.map(g => `<td><button class="btn xs ${x.owned[g] ? "on" : ""}" data-u="${esc(x.id)}" data-tog="${g}" ${x.group === g ? "disabled" : ""}>${x.owned[g] ? "보유" : "미보유"}</button></td>`).join("")}
          <td>${countMap(x.collection)}장</td><td>${typeof LEVEL !== "undefined" ? "Lv " + Store.level(x) : "-"}</td><td>${x.stats.w}승 ${x.stats.l}패</td>
          <td><button class="btn xs" data-u="${esc(x.id)}" data-all="1">모든 카드 지급</button></td></tr>`).join("")}
        </tbody></table>` : '<p class="empty">아직 등록된 모험가가 없습니다. 로그아웃한 뒤 "새 모험가"로 등록하면 여기에 나타납니다.</p>'}
        <p class="note">${typeof Net !== "undefined" && Net.on ? "서버에 등록된 모든 모험가입니다. 지급 · 회수는 서버에 바로 반영됩니다." : "이 목록은 이 브라우저에 저장된 계정입니다. 서버(ETHERION 서버.bat)로 열면 서버의 전체 계정을 관리합니다."}</p></div>`;
  }
  const tabs = GROUP_IDS.map(g => [g, `${GROUPS[g].name} (${cardsOfGroup(g).length})`, GROUPS[g].faction]).concat([["users", `모험가 관리 (${users.length})`, ""]]);
  $("#app").innerHTML = `<section class="screen screen-admin">
    ${headerHTML("관리자 보관소")}
    <div class="admin">
      <div class="tabs">${tabs.map(([k, l, fa]) => `<button class="tab ${tab === k ? "on" : ""}${fa ? " fac-" + fa : ""}" data-tab="${k}">${l}</button>`).join("")}</div>
      ${tab === "users" ? body : `<div class="vault">${body}</div>`}
    </div>
  </section>`;
  const root = $(".screen-admin");
  bindHeader(root);
  $$(".tab", root).forEach(b => b.addEventListener("click", () => showAdmin(b.dataset.tab)));
  if (tab !== "users") {
    bindPreview(root);
    root.addEventListener("click", e => { const b = e.target.closest("[data-edit]"); if (b) showEditor(b.dataset.edit); });
  } else {
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-u]"); if (!b) return;
      const x = Store.data.users[b.dataset.u]; if (!x) return;
      if (b.dataset.tog) { const g = b.dataset.tog; if (x.owned[g]) Store.revokeGroup(x, g); else Store.grantGroup(x, g); toast(`${x.id}: ${GROUPS[g].name} 덱 ${x.owned[g] ? "지급" : "회수"}`); }
      if (b.dataset.all) { Store.grantAllCards(x); toast(`${x.id}: 보유 단체의 모든 카드를 ${RULES.maxCopies}장씩 지급`); }
      showAdmin("users");
    });
  }
}

/* ---------- 시작 ---------- */
function boot() {
  Store.load();
  Store.ensureOpen();
  applyFont();
  // 카드 그림(img/cards/<카드ID>.png)이 있는지 한 번 확인해 두고, 확인이 끝나면 지금 화면을 다시 그린다
  Art.probe(Object.keys(CARDS), () => { if (Art.ok.size) { if (typeof render === "function" && G) render(); } });
  Bg.init();
  if (typeof Weather !== "undefined") Weather.init();
  ChatNet.connect();
  /* v3.0 상점과 덱 조정실을 다른 탭에 띄워도 같은 저장소를 쓴다: 한쪽에서 사거나 고치면 다른 쪽이 바로 다시 그린다 */
  addEventListener("storage", e => { if (e.key !== STORE_KEY) return; Store.load(); if (typeof App.refresh === "function") App.refresh(); });
  showTitle();
}
document.addEventListener("DOMContentLoaded", boot);

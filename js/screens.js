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
    };
    rs(); addEventListener("resize", rs);
    addEventListener("pointermove", e => { this.mx = e.clientX / this.w - 0.5; this.my = e.clientY / this.h - 0.5; });
    for (let i = 0; i < 90; i++) this.motes.push(this.mote(true));
    const loop = () => { this.draw(); this.raf = requestAnimationFrame(loop); };
    loop();
  },
  mote(any) {
    const hues = ["255,214,140", "140,220,255", "200,170,255", "255,180,120"];
    return { x: Math.random() * this.w, y: any ? Math.random() * this.h : this.h + 10, r: Math.random() * 2.2 + 0.4, v: Math.random() * 0.45 + 0.12, sway: Math.random() * 6.28, c: pick(hues), a: Math.random() * 0.6 + 0.25 };
  },
  set(mode) { this.mode = mode; this.cv.style.opacity = mode === "off" ? 0 : mode === "calm" ? 0.55 : 1; },
  draw() {
    const { ctx, w, h } = this;
    if (this.mode === "off") return;
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
      if (!this.reduced) { m.y -= m.v; m.sway += 0.01; m.x += Math.sin(m.sway) * 0.3; }
      if (pl > 0.01) {
        /* 입장 연출: 에테르 입자가 소용돌이치며 문으로 빨려 든다 */
        const dx = cx - m.x, dy = cy - m.y, dist = Math.hypot(dx, dy) || 1, f = pl * (2 + 900 / (dist + 60));
        m.x += (dx / dist * 0.8 + -dy / dist * 0.9) * f; m.y += (dy / dist * 0.8 + dx / dist * 0.9) * f;
        if (dist < 14) Object.assign(m, this.mote(true), { y: Math.random() < 0.5 ? -10 : h + 10 });
      }
      if (m.y < -10 && pl <= 0.01) Object.assign(m, this.mote(false));
      const px = m.x + this.mx * 18 * m.r, py = m.y + this.my * 12 * m.r;
      const g = ctx.createRadialGradient(px, py, 0, px, py, m.r * 6);
      g.addColorStop(0, `rgba(${m.c},${m.a})`); g.addColorStop(1, `rgba(${m.c},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, m.r * 6, 0, 6.283); ctx.fill();
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
function ringSVG() {
  const R = 190;
  const seats = SEATS.map(s => {
    const a = (s.ang - 90) * Math.PI / 180, x = Math.cos(a) * R, y = Math.sin(a) * R;
    const lx = Math.cos(a) * (R + 34), ly = Math.sin(a) * (R + 34);
    if (!s.el) return `<g class="seat empty" style="--k:${SEATS.indexOf(s)}"><circle cx="${x}" cy="${y}" r="11" fill="none" stroke="#6d6a80" stroke-dasharray="2 3"/><text x="${lx}" y="${ly + 4}" text-anchor="middle">?</text></g>`;
    const col = ELEMENTS[s.el].color;
    return `<g class="seat" style="--c:${col};--k:${SEATS.indexOf(s)}"><circle cx="${x}" cy="${y}" r="22" fill="url(#seatGlow)" style="color:${col}" opacity=".9"/><circle cx="${x}" cy="${y}" r="7" fill="${col}"/><text x="${lx}" y="${ly + 4}" text-anchor="middle">${s.name}</text></g>`;
  }).join("");
  const runes = "ARCHE ✦ IVEL ✦ HARGAN ✦ SEREN ✦ ORDUUN ✦ THALAKUS ✦ AURAGON ✦ SOLANTE ✦ MORKAS ✦ SYLVARE ✦ VELUMIR ✦ KRONEA ✦ ";
  return `<svg viewBox="-270 -270 540 540" class="ring-svg" aria-hidden="true">
    <defs>
      <radialGradient id="seatGlow"><stop offset="0" stop-color="currentColor" stop-opacity=".7"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient>
      <radialGradient id="coreGlow"><stop offset="0" stop-color="#ffe7b0" stop-opacity=".35"/><stop offset=".5" stop-color="#9b7bff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
      <path id="runePath" d="M0,-238 a238,238 0 1,1 -.1,0"/>
    </defs>
    <circle r="250" fill="url(#coreGlow)"/>
    <g class="ring-rot">
      <circle r="238" fill="none" stroke="#d9b46a" stroke-opacity=".25"/>
      <text class="runes"><textPath href="#runePath">${runes}${runes}</textPath></text>
      <circle r="226" fill="none" stroke="#d9b46a" stroke-opacity=".35" stroke-dasharray="1 7"/>
    </g>
    <g class="ring-rot2">
      <circle r="${R}" fill="none" stroke="#d9b46a" stroke-opacity=".45"/>
      <polygon points="${SEATS.map(s => { const a = (s.ang - 90) * Math.PI / 180; return (Math.cos(a) * R).toFixed(1) + "," + (Math.sin(a) * R).toFixed(1); }).join(" ")}" fill="none" stroke="#d9b46a" stroke-opacity=".12"/>
      <polygon points="${[0, 135, 270, 45, 180, 315, 90, 225].map(d => { const a = (d - 90) * Math.PI / 180; return (Math.cos(a) * R).toFixed(1) + "," + (Math.sin(a) * R).toFixed(1); }).join(" ")}" fill="none" stroke="#d9b46a" stroke-opacity=".1"/>
    </g>
    <circle r="120" fill="none" stroke="#d9b46a" stroke-opacity=".2"/>
    <circle r="6" fill="none" stroke="#f3dfa6" stroke-opacity=".8"/>
    ${seats}
  </svg>`;
}
function showTitle() {
  App.screen = "title"; Bg.set("title");
  const word = "ETHERION";
  $("#app").innerHTML = `<section class="screen screen-title" id="title">
    <div class="t-ring">${ringSVG()}</div>
    <svg class="t-mountains" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 320V210l70-30 60 22 90-70 70 40 60-26 80-86 70 62 50-18 60 46 90-120 40 34 50-20 60 60 70-48 80 70 60-30 90 56 70-22 70 40 60-30 60 28 70-40v192z" fill="#0c0e18"/>
      <path d="M0 320V250l110-24 90 30 120-50 100 36 130-60 90 34 120-48 110 44 120-36 110 40 120-30 120 30 100-12v136z" fill="#07080e"/>
    </svg>
    <div class="t-center">
      <p class="t-eyebrow">Chronicles of the Seven-Dragon Ring</p>
      <h1 class="t-title" aria-label="${word}">${[...word].map((ch, i) => { const c = (word.length - 1) / 2; return `<span style="--i:${i};--d:${(c - Math.abs(i - c)).toFixed(1)};--dx:${((c - i) * 14).toFixed(0)}px">${ch}</span>`; }).join("")}</h1>
      <p class="t-sub"><span>The Land Where Ether Flows</span><span class="ko">에테르가 흐르는 땅, 카일란</span></p>
      <button class="t-start" id="t-start" type="button">Press to Begin</button>
    </div>
    <p class="t-foot">Prototype v1.0${OPEN_PLAY ? " · 시험 모드: 로그인 없이 모든 카드 사용" : ""} · 모든 이름은 가칭</p>
  </section>`;
  /* 누르면 이세계 입장 연출(js/portal.js): 고리가 깨어나고 가운데 문으로 들어간다 */
  const go = () => {
    if (App.screen !== "title") return;
    App.screen = "leaving";
    const ring = $("#title .t-ring").getBoundingClientRect();
    $("#title").classList.add("awaken");
    const next = () => { Store.ensureOpen(); Store.user() ? showLobby() : showLogin(); };
    if (typeof Portal !== "undefined") Portal.enter(next, { x: ring.left + ring.width / 2, y: ring.top + ring.height / 2 });
    else setTimeout(next, 900);
  };
  $("#t-start").addEventListener("click", go);
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
/* 새 모험가: 진영(세로 열)마다 하나씩 고른다. 같은 진영의 다른 깃발을 누르면 바뀐다 */
function bindFactionPicks(wrap, sumEl) {
  const pick = {};
  const show = () => {
    $$(".grp-tile", wrap).forEach(x => x.classList.toggle("on", pick[GROUPS[x.dataset.g].faction] === x.dataset.g));
    if (sumEl) { const n = Object.keys(pick).length; sumEl.innerHTML = Object.values(FACTIONS).map(F => `<span class="${pick[F.id] ? "ok" : ""}">${F.name}: <b>${pick[F.id] ? GROUPS[pick[F.id]].name : "아직"}</b></span>`).join(" · ") + ` <small>(${n}/3)</small>`; }
  };
  $$(".grp-tile", wrap).forEach(b => b.addEventListener("click", () => { pick[GROUPS[b.dataset.g].faction] = b.dataset.g; show(); }));
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
        <p class="pick-label">진영마다 깃발 하나씩 — 세 진영에서 하나씩, 모두 셋을 고릅니다. 고른 깃발마다 기본 덱 40장과 그 단체의 다른 카드를 1장씩 받습니다. 다른 깃발은 쓸 수 없습니다.</p>
        ${groupGridHTML({ motto: true })}
        <p class="pick-sum" id="nw-sum"></p>
        <p class="err" id="nw-err"></p>
        <button class="btn primary wide" type="submit">모험가 등록</button>
      </form>
      ${Store.ok ? "" : '<p class="err">이 브라우저에서는 저장소를 쓸 수 없어 진행 상황이 저장되지 않습니다.</p>'}
    </div>
  </section>`;
  $$(".tab").forEach(b => b.addEventListener("click", () => showLogin(b.dataset.tab)));
  const getChosen = bindFactionPicks($("#f-new"), $("#nw-sum"));
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
  const order = { unit: 0, atk: 1, def: 2, any: 3, item: 4 };
  return ids.sort((a, b) => { const x = CARDS[a], y = CARDS[b]; return order[x.type] - order[y.type] || x.lv - y.lv || a.localeCompare(b); });
}
function expandDeck(cards) { const out = []; for (const id in cards) for (let i = 0; i < cards[id]; i++) out.push(id); return sortDeckCards(out); }

/* 메뉴 아이콘 (24×24 선 그림, 색은 바깥에서) */
const MENU_ICON = {
  hall: '<path d="M4 21V10.5L12 4l8 6.5V21"/><path d="M9.5 21v-5a2.5 2.5 0 015 0v5"/><path d="M2.5 21h19"/>',
  shop: '<path d="M12 4.5V20M7.5 20h9M4.5 7.5h15"/><path d="M4.5 7.5 2.4 13M4.5 7.5 6.6 13M19.5 7.5 17.4 13M19.5 7.5 21.6 13"/><path d="M2.2 13h4.6a2.3 2.3 0 01-4.6 0zM17.2 13h4.6a2.3 2.3 0 01-4.6 0z"/><circle cx="12" cy="3.8" r="1.2" fill="currentColor"/>',
  map: '<circle cx="12" cy="12" r="8.5"/><path d="M12 5.2l2 6.8-2 6.8-2-6.8z" fill="currentColor" stroke="none"/><path d="M5.2 12h2.2M16.6 12h2.2" />',
  vault: '<circle cx="8" cy="12" r="3.6"/><path d="M11.6 12H21M17.6 12v3M20.2 12v2.4"/>',
  exit: '<path d="M10 4H5.5v16H10"/><path d="M9.5 12h10M15.5 8l4 4-4 4"/>',
  quill: '<path d="M19.5 4.5C12.8 5 8 10 6.6 17.4L5.2 20.5"/><path d="M19.5 4.5c-.4 6.3-5.3 11-11.1 12.2M10.2 13.6l-2.6-.4"/>',
  duel: '<path d="M5 4l9.6 9.6M19 4l-9.6 9.6M4.2 19.8l3.3-3.3M19.8 19.8l-3.3-3.3M6.3 14.3l3.4 3.4M17.7 14.3l-3.4 3.4"/>',
  ring: '<circle cx="12" cy="12" r="7.6"/><circle cx="12" cy="4.4" r="1.7" fill="currentColor"/><circle cx="19.6" cy="12" r="1.7" fill="currentColor"/><circle cx="4.4" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="19.6" r="1.7" fill="#0d0e17" stroke-dasharray="1.2 1.2"/>',
  banners: '<path d="M3.5 5h7v6.4c0 3.1-3.5 5.1-3.5 5.1s-3.5-2-3.5-5.1z"/><path d="M13.5 7.5h7v6.4c0 3.1-3.5 5.1-3.5 5.1s-3.5-2-3.5-5.1z"/>'
};
const menuIcon = k => `<svg class="m-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${MENU_ICON[k]}</svg>`;

/* 상단 문장 띠: 왼쪽 날개 = 길(메뉴), 가운데 = 늘어뜨린 쐐기돌 문장(로고 + 지금 있는 곳), 오른쪽 날개 = 지갑 · 모험가 인장 · 나가기 */
function headerHTML(title) {
  const u = Store.user();
  const cur = { lobby: "lobby", shop: "shop", admin: "admin" }[App.screen] || (title === "관리자 보관소" ? "admin" : "");
  const nav = (k, ico, label, tip) => `<button type="button" class="tb-nav${cur === k ? " on" : ""}" data-nav="${k}"${cur === k ? ' aria-current="page"' : ""}${tip ? ` title="${tip}"` : ""}>${menuIcon(ico)}<span>${label}</span></button>`;
  const div = '<i class="tb-div" aria-hidden="true"></i>';
  return `<header class="topbar realm">
    <div class="tb-inner realm">
      <nav class="tb-wing tbw-left" aria-label="주 메뉴">
        ${nav("lobby", "hall", "대기실")}${div}${nav("shop", "shop", "교역소", "린데어 교역소")}${u.admin ? div + nav("admin", "vault", "보관소", "관리자 보관소") : ""}
      </nav>
      <button type="button" class="tb-crest" data-nav="lobby" title="대기실로"><span class="crest-word">ETHERION</span>${title ? `<span class="crest-sub">${title}</span>` : ""}</button>
      <div class="tb-wing tbw-right">
        ${nav("map", "map", "지도", "카일란 대륙 전도")}
        ${typeof Weather !== "undefined" ? Weather.chipHTML() : ""}
        <span class="gold-chip" title="환석 조각 — 전투와 수레바퀴로 모아 교역소에서 카드를 산다"><b>${fmtGold(Store.gold(u))}</b></span>
        <span class="user-chip seal" title="${esc(u.id)} · ${u.stats.w}승 ${u.stats.l}패"><i class="seal-mark" aria-hidden="true">${esc([...u.id][0] || "?").toUpperCase()}</i><span class="seal-txt">${u.admin ? '<span class="admin-badge">ADMIN</span>' : ""}<b>${esc(u.id)}</b><small>${u.stats.w}승 ${u.stats.l}패</small></span></span>
        <button type="button" class="tb-nav tb-exit" data-nav="logout" title="${OPEN_PLAY ? "처음으로" : "나가기"}">${menuIcon("exit")}<span>${OPEN_PLAY ? "처음으로" : "나가기"}</span></button>
      </div>
    </div>
  </header>`;
}
function bindHeader(root, guard) {
  root.querySelector(".topbar").addEventListener("click", async e => {
    const b = e.target.closest("[data-nav]"); if (!b) return;
    if (guard && !(await guard())) return;
    if (b.dataset.nav === "lobby") showLobby();
    if (b.dataset.nav === "admin") showAdmin();
    if (b.dataset.nav === "shop") showShop();
    if (b.dataset.nav === "map") { if (typeof Kailan !== "undefined") Kailan.open(); }
    if (b.dataset.nav === "logout") { Store.logout(); showTitle(); }
  });
}

function showLobby() {
  App.screen = "lobby"; Bg.set("calm");
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  if (!App.lobbyGroup || !Store.ownsGroup(u, App.lobbyGroup)) App.lobbyGroup = Store.ownsGroup(u, u.group) ? u.group : GROUP_IDS.find(g => Store.ownsGroup(u, g));
  const f = App.lobbyGroup;
  $("#app").innerHTML = `<section class="screen screen-lobby">
    ${headerHTML("대기실")}
    <div class="lobby">
      <nav class="decks" aria-label="내 덱">
        <h3 class="panel-title">덱 보관함 <small>단체마다 덱 하나</small></h3>
        ${Object.values(FACTIONS).map(F => `<div class="deck-fac fac-${F.id}"><p class="df-head"><span class="df-crest">${typeof factionCrestSVG === "function" ? factionCrestSVG(F.id) : ""}</span>${F.name}<small>${F.en}</small></p>
        ${F.groups.map(g => {
          const G = GROUPS[g], own = Store.ownsGroup(u, g);
          const d = own ? Store.deck(u, g) : null;
          const n = d ? countMap(d.cards) : 0;
          const playable = own && Store.deckPlayable(u, g);
          return `<button class="deck-tile fac-${F.id}${g === f ? " on" : ""}${own ? "" : " locked"}" data-g="${g}" style="--gc:${G.color}" ${own ? "" : 'aria-disabled="true"'}>
            ${groupEmblem(g)}
            <span class="dt-body"><b>${own ? esc(d.name) : G.name}</b><span class="en">${G.name} · ${G.role}</span>
            <span class="dt-state">${own ? (playable ? `<i class="ok">●</i> ${n}장 · 출전 가능` : `<i class="bad">●</i> ${n}장 · 저장 필요`) : "🔒 보유하지 않은 덱"}</span></span>
          </button>`;
        }).join("")}</div>`).join("")}
        <p class="note">${u.admin ? "관리자는 9개 단체의 덱과 모든 카드를 가지고 있습니다." : "진영마다 고른 깃발 하나씩, 세 덱만 쓸 수 있습니다. 원정에서 이기면 카드를 골라 얻고, 교역소에서 사고팔 수도 있습니다."}</p>
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
  </section>`;
  const root = $(".screen-lobby");
  bindHeader(root);
  $$(".deck-tile", root).forEach(b => b.addEventListener("click", () => {
    if (b.classList.contains("locked")) { toast("보유하지 않은 덱입니다.", "warn"); return; }
    App.lobbyGroup = b.dataset.g; showLobby();
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
  const u = Store.user(), f = App.lobbyGroup, F = GROUPS[f], FA = FACTIONS[F.faction];
  const d = Store.deck(u, f);
  const ids = expandDeck(d.cards);
  const playable = Store.deckPlayable(u, f);
  const nU = ids.filter(id => CARDS[id].type === "unit").length;
  const curve = [1, 2, 3, 4, 5, 6, 7, 8].map(l => ids.filter(id => CARDS[id].lv === l).length);
  const mx = Math.max(...curve, 1);
  $("#deck-view").innerHTML = `
    <div class="dv-head fac-${F.faction}" style="--gc:${F.color}">
      ${groupEmblem(f, "big")}
      <div class="dv-title"><p class="eyebrow">${F.en} · ${FA.name}</p><h2>${esc(d.name)}</h2><p class="muted">${F.name} · ${F.role} · ${F.motto}</p><p class="dv-blurb">${F.blurb}</p></div>
      <div class="dv-curve" title="레벨별 장수">${curve.map((n, i) => `<span><i style="height:${n / mx * 100}%"></i><em>${i + 1}</em></span>`).join("")}</div>
    </div>
    <div class="dv-meta"><span><b>${ids.length}</b> / ${RULES.deckSize}장</span><span>유닛 <b>${nU}</b></span><span>마법 <b>${ids.filter(id => !["unit", "item"].includes(CARDS[id].type)).length}</b></span><span>아이템 <b>${ids.filter(id => CARDS[id].type === "item").length}</b></span>
      <span class="${playable ? "ok" : "bad"}">${playable ? "저장된 덱 · 출전 가능" : "출전 불가 · 덱 조정실에서 40장을 저장하세요"}</span></div>
    <div class="dv-cards" id="dv-cards">${ids.map(id => cardHTML(CARDS[id], { size: "md" })).join("")}</div>
    <div class="dv-actions altar">
      <button class="btn rite-side" id="go-edit">${menuIcon("quill")}<span>덱 조정실</span></button>
      <div class="altar-gates">
        <button class="btn primary rite" id="go-ai" ${playable ? "" : "disabled"}>${menuIcon("duel")}<b>컴퓨터와 대전</b><small>SPARRING</small></button>
        <button class="btn primary gold rite" id="go-exp" ${playable || (typeof Exp !== "undefined" && Exp.get()) ? "" : "disabled"} title="칠룡의 고리 원정 — 여섯 번 싸우며 카드를 모은다">${menuIcon("ring")}<b>${typeof Exp !== "undefined" && Exp.get() && !Exp.get().over ? "원정 계속" : "원정"}</b><small>EXPEDITION</small></button>
        <button class="btn primary alt rite" id="go-pvp" ${playable ? "" : "disabled"}>${menuIcon("banners")}<b>대전</b><small>DUEL</small></button>
      </div>
    </div>`;
  $("#dv-cards").addEventListener("click", e => { const c = e.target.closest("[data-card]"); if (c) showCardModal(CARDS[c.dataset.card]); });
  $("#go-edit").addEventListener("click", () => showEditor(f));
  $("#go-ai").addEventListener("click", () => startVsAI(f));
  $("#go-exp").addEventListener("click", () => showExpedition(f));
  $("#go-pvp").addEventListener("click", () => startPvP(f));
}
function renderChat() {
  const box = $("#chat-log"); if (!box) return;
  const sys = `<div class="msg sys">◈ 대기실에 입장했습니다. 지금은 서버에 연결되어 있지 않아 메시지가 이 기기에만 남습니다.</div>`;
  box.innerHTML = sys + ChatNet.history().slice(-80).map(m => `<div class="msg${m.from === Store.data.session ? " mine" : ""}"><span class="who">${m.admin ? '<i class="crown">♛</i>' : ""}${esc(m.from)}</span><span class="txt">${esc(m.text)}</span><time>${fmtTime(m.at)}</time></div>`).join("");
  box.scrollTop = box.scrollHeight;
}
ChatNet.onMessage(() => { if (App.screen === "lobby") renderChat(); });

/* ---------- 대전 시작 ---------- */
async function startVsAI(f) {
  const u = Store.user();
  if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 대전할 수 있습니다.", "warn"); return; }
  let get;
  const ok = await modal(`<h3>컴퓨터와 대전</h3><p class="muted">상대 단체를 고르세요. 컴퓨터는 그 단체의 기본 덱을 씁니다. 난이도: 보통</p>${groupGridHTML({ small: true, random: true })}`,
    [{ label: "취소", value: false }, { label: "전투 시작", value: true, cls: "primary" }], { cls: "wide-modal", onOpen: w => { get = bindGroupGrid(w, "random"); } });
  if (!ok) return;
  let ag = get(); if (ag === "random") ag = pick(GROUP_IDS.filter(g => g !== f));
  launch({ mode: "ai", p0: { name: u.id, group: f, cards: Store.deck(u, f).cards }, p1: { name: GROUPS[ag].ai, group: ag, cards: STARTER_DECKS[ag], isAI: true } });
}
async function startPvP(f) {
  const u = Store.user();
  if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 대전할 수 있습니다.", "warn"); return; }
  let get;
  const ok = await modal(`<h3>대전</h3>
    <div class="notice">온라인 대전 서버가 아직 연결되지 않았습니다. 지금은 <b>한 화면에서 두 사람이 번갈아</b> 플레이합니다. 준비 단계가 바뀔 때마다 화면을 넘겨주세요.</div>
    <label class="field">상대 이름<input id="p2-name" maxlength="16" value="도전자"></label>
    <p class="pick-label">상대 단체 (기본 덱 사용)</p>${groupGridHTML({ small: true })}`,
    [{ label: "취소", value: false }, { label: "대전 시작", value: true, cls: "primary" }], { cls: "wide-modal", onOpen: w => { get = bindGroupGrid(w, f === "G1" ? "B1" : "G1"); } });
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
  let reward = null;
  if (won && !u.admin) {
    const pool = cardsOfGroup(g.players[0].group).filter(c => (u.collection[c.id] || 0) < maxCopiesOf(c));
    if (pool.length) { const weights = pool.map(c => 9 - c.lv); let r = Math.random() * weights.reduce((a, b) => a + b, 0); for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) { reward = pool[i].id; break; } } reward = reward || pool[0].id; Store.grantCard(u, reward); }
  }
  Store.save();
  g._reward = reward;
  return reward;
}

/* ---------- 덱 조정실 ---------- */
const POOL_TYPES = [["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]];
const SPELL_KINDS = [["all", "모든 마법"], ["atk", "공격"], ["def", "방어"], ["any", "공용"], ["hand", "계략"]];
function poolMatch(c, E) {
  if (E.type === "unit" && c.type !== "unit") return false;
  if (E.type === "spell" && (c.type === "unit" || c.type === "item")) return false;
  if (E.type === "item" && c.type !== "item") return false;
  if (E.kind !== "all" && c.type !== E.kind) return false;
  if (E.lv && c.lv !== E.lv) return false;
  if (E.q && !c.name.includes(E.q)) return false;
  return true;
}
function showEditor(f) {
  const u = Store.user();
  if (!Store.ownsGroup(u, f)) { toast("보유하지 않은 덱입니다.", "warn"); return; }
  App.screen = "editor"; Bg.set("calm");
  const saved = Store.deck(u, f);
  const E = { f, cards: Object.assign({}, saved.cards), name: saved.name, type: "all", kind: "all", lv: 0, q: "", hideOut: false };
  const dirty = () => E.name !== Store.deck(u, f).name || JSON.stringify(sortObj(E.cards)) !== JSON.stringify(sortObj(Store.deck(u, f).cards));
  const guard = async () => {
    if (!dirty()) return true;
    return await modal(`<h3>저장하지 않은 변경 사항</h3><p>덱 조정실에서 바꾼 내용이 저장되지 않았습니다. 저장하지 않고 나가면 마지막으로 저장한 덱이 그대로 남습니다.</p>`,
      [{ label: "계속 편집", value: false }, { label: "저장하지 않고 나가기", value: true, cls: "danger" }]);
  };
  const F = GROUPS[f];
  $("#app").innerHTML = `<section class="screen screen-editor">
    ${headerHTML("덱 조정실")}
    <div class="ed-bar fac-${F.faction}" style="--gc:${F.color}">
      <div class="ed-name">${groupEmblem(f)}<label class="sr" for="ed-name">덱 이름</label><input id="ed-name" maxlength="24" value="${esc(E.name)}"></div>
      <div class="ed-count" id="ed-count"></div>
      <div class="ed-btns">
        <button class="btn ghost" id="ed-back">대기실로</button>
        <button class="btn" id="ed-revert">되돌리기</button>
        <button class="btn ghost" id="ed-starter" title="이 단체의 기본 덱 40장으로 바꿉니다 (저장해야 반영)">기본 덱</button>
        <button class="btn primary" id="ed-save">저장</button>
        <button class="btn primary alt" id="ed-play">이 덱으로 대전</button>
      </div>
    </div>
    <div class="editor">
      <section class="ed-deck"><h3 class="panel-title">덱 <span id="ed-deck-n"></span></h3><p class="muted small">누르면 덱에서 1장 뺍니다.</p><div id="ed-mix" class="ed-mix"></div><div id="ed-deck-list" class="deck-list"></div></section>
      <section class="ed-pool">
        <div class="pool-head"><h3 class="panel-title">보유 카드 <small>${F.name}의 유닛·마법·아이템만 넣을 수 있습니다</small></h3>
          <input id="ed-q" class="ed-q" placeholder="이름 검색" aria-label="카드 이름 검색"></div>
        <div class="chips" id="ed-filter">
          ${POOL_TYPES.map(([k, l]) => `<button class="chip ${k === "all" ? "on" : ""}" data-k="${k}">${l}</button>`).join("")}
          <span class="sep"></span>
          ${SPELL_KINDS.map(([k, l]) => `<button class="chip ${k === "all" ? "on" : ""}" data-sk="${k}">${l}</button>`).join("")}
        </div>
        <div class="chips" id="ed-filter2">
          <button class="chip on" data-lv="0">모든 레벨</button>${[1, 2, 3, 4, 5, 6, 7, 8].map(l => `<button class="chip" data-lv="${l}">Lv${l}</button>`).join("")}
          <span class="sep"></span>
          <label class="chip tog"><input type="checkbox" id="ed-hideout"> 남은 카드만</label>
        </div>
        <p class="muted small"><b>+</b>를 누르면 덱에 1장 넣고, <b>−</b>를 누르면 1장 뺍니다. 카드를 누르면 원본 카드가 크게 열리고, 거기서도 넣고 뺄 수 있습니다. 같은 카드는 ${RULES.maxCopies}장까지, 덱은 ${RULES.deckSize}장입니다. 덱은 한 단체의 카드로만 만듭니다 (다른 단체와 섞는 규칙은 나중에).</p>
        <div id="ed-pool" class="pool-grid"></div>
      </section>
    </div>
  </section>`;
  const root = $(".screen-editor");
  bindHeader(root, guard);
  bindPreview(root);
  const draw = () => {
    const n = countMap(E.cards);
    const isDirty = dirty();
    const valid = n === RULES.deckSize;
    $("#ed-count").innerHTML = `<b class="${valid ? "ok" : "bad"}">${n}</b><span>/ ${RULES.deckSize}</span>
      <em class="${valid ? (isDirty ? "warn" : "ok") : "bad"}">${!valid ? (n < RULES.deckSize ? `${RULES.deckSize - n}장 부족` : `${n - RULES.deckSize}장 초과`) : isDirty ? "저장하지 않음" : "저장됨"}</em>`;
    $("#ed-deck-n").textContent = `${n} / ${RULES.deckSize}`;
    const canPlayNow = !isDirty && Store.deckPlayable(u, f);
    $("#ed-play").disabled = !canPlayNow;
    $("#ed-play").title = canPlayNow ? "" : "40장을 채우고 저장해야 게임에 들어갈 수 있습니다.";
    $("#ed-revert").disabled = !isDirty;
    const ids = sortDeckCards(Object.keys(E.cards).filter(k => E.cards[k] > 0));
    const by = t => ids.filter(id => t(CARDS[id])).reduce((s, id) => s + E.cards[id], 0);
    $("#ed-mix").innerHTML = `<span>유닛 <b>${by(c => c.type === "unit")}</b></span><span>마법 <b>${by(c => c.type !== "unit" && c.type !== "item")}</b></span><span>아이템 <b>${by(c => c.type === "item")}</b></span>`;
    $("#ed-deck-list").innerHTML = ids.map(id => {
      const c = CARDS[id];
      const sub = c.type === "unit" ? `${c.a}/${c.d}/${c.h}${c.up ? " ◆" + c.up : ""}` : c.type === "item" ? "아이템" : TYPES[c.type].name;
      return `<button class="dl-row ${c.faction ? "fac-" + c.faction : "fac-item"}" data-card="${id}" data-rm="${id}" style="--el:${ELEMENTS[c.el].color}">
        <span class="dl-lv">${c.lv}</span><span class="dl-name">${esc(c.name)}</span><span class="dl-type">${sub}</span><span class="dl-n">×${E.cards[id]}</span></button>`;
    }).join("") || '<p class="empty">덱이 비어 있습니다. 오른쪽에서 카드를 넣으세요.</p>';
    const order = { unit: 0, atk: 1, def: 2, any: 3, item: 4 };
    const pool = cardsOfGroup(f).filter(c => Store.ownedCount(u, c.id) > 0 && poolMatch(c, E))
      .filter(c => !E.hideOut || Store.ownedCount(u, c.id) - (E.cards[c.id] || 0) > 0)
      .sort((a, b) => order[a.type] - order[b.type] || a.lv - b.lv || a.id.localeCompare(b.id));
    $("#ed-pool").innerHTML = pool.map(c => {
      const own = Store.ownedCount(u, c.id), inDeck = E.cards[c.id] || 0, left = own - inDeck;
      return `<div class="pool-card${left <= 0 ? " out" : ""}${inDeck ? " in-deck" : ""}">
        <button class="pc-face" data-show="${c.id}" aria-label="${esc(c.name)} 원본 카드 보기">${cardHTML(c, { size: "md" })}</button>
        <div class="pc-ctrl">
          <button class="pc-btn pc-minus" data-rm="${c.id}" ${inDeck ? "" : "disabled"} aria-label="${esc(c.name)} 덱에서 1장 빼기">−</button>
          <span class="pc-n" aria-label="덱에 ${inDeck}장"><b>${inDeck}</b><small>덱</small></span>
          <button class="pc-btn pc-plus" data-add="${c.id}" ${left <= 0 ? "disabled" : ""} aria-label="${esc(c.name)} 덱에 1장 넣기">+</button>
        </div>
        <span class="pc-meta">남음 <b>${left}</b> · 보유 ${own}</span></div>`;
    }).join("") || '<p class="empty">조건에 맞는 카드가 없습니다.</p>';
  };
  const rmCard = id => { if (!E.cards[id]) return; E.cards[id]--; if (E.cards[id] <= 0) delete E.cards[id]; draw(); };
  const addCard = id => {
    const own = Store.ownedCount(u, id), inDeck = E.cards[id] || 0;
    if (inDeck >= own) { toast("덱 밖에 남은 카드가 없습니다.", "warn"); return; }
    if (inDeck >= maxCopiesOf(id)) { toast(maxCopiesOf(id) < RULES.maxCopies ? `역전 마법은 덱에 ${maxCopiesOf(id)}장만 넣을 수 있습니다.` : `같은 카드는 ${RULES.maxCopies}장까지 넣을 수 있습니다.`, "warn"); return; }
    if (countMap(E.cards) >= RULES.deckSize) { toast(`덱은 ${RULES.deckSize}장까지입니다. 먼저 다른 카드를 빼세요.`, "warn"); return; }
    E.cards[id] = inDeck + 1; draw();
  };
  // 보유 카드를 누르면 원본 카드를 크게 연다. 창 안에서도 넣고 뺄 수 있다
  const showPoolCard = async id => {
    const own = Store.ownedCount(u, id), inDeck = E.cards[id] || 0, left = own - inDeck;
    const btns = [];
    if (inDeck) btns.push({ label: "− 덱에서 빼기", value: "rm" });
    if (left > 0) btns.push({ label: "+ 덱에 넣기", value: "add", cls: "primary" });
    btns.push({ label: "닫기", value: null });
    const v = await showCardModal(CARDS[id], btns, `덱 <b>${inDeck}</b>장 · 남음 <b>${left}</b> · 보유 ${own}`);
    if (v === "rm") rmCard(id); else if (v === "add") addCard(id);
  };
  root.addEventListener("click", e => {
    const show = e.target.closest("[data-show]");
    if (show) { showPoolCard(show.dataset.show); return; }
    const rm = e.target.closest("[data-rm]");
    if (rm) { rmCard(rm.dataset.rm); return; }
    const add = e.target.closest("[data-add]");
    if (add) { addCard(add.dataset.add); return; }
    const chip = (attr, key, conv) => { const b = e.target.closest(`[data-${attr}]`); if (!b) return false; E[key] = conv(b.dataset[attr]); $$(`[data-${attr}]`, root).forEach(x => x.classList.toggle("on", x === b)); draw(); return true; };
    if (chip("k", "type", String)) return;
    if (chip("sk", "kind", String)) return;
    if (chip("lv", "lv", Number)) return;
  });
  // 덱 조정실은 1.5배로 보인다(css zoom). 덱 목록과 보유 카드 칸이 화면 높이에 맞게 스크롤되도록 높이를 잰다
  const fit = () => {
    const ed = $(".editor", root); if (!ed || !ed.isConnected) { removeEventListener("resize", fit); return; }
    const z = parseFloat(getComputedStyle(ed).zoom) || 1;
    const top = ed.getBoundingClientRect().top;
    ed.style.setProperty("--avail", Math.max(320, (innerHeight - top - 14) / z - 32) + "px");
  };
  addEventListener("resize", fit); fit();
  $("#ed-hideout").addEventListener("change", e => { E.hideOut = e.target.checked; draw(); });
  $("#ed-q").addEventListener("input", e => { E.q = e.target.value.trim(); draw(); });
  $("#ed-name").addEventListener("input", e => { E.name = e.target.value; draw(); });
  $("#ed-save").addEventListener("click", () => {
    const n = countMap(E.cards);
    if (n < RULES.deckSize) {
      modal(`<h3 class="bad">카드가 부족합니다</h3><p>덱은 정확히 ${RULES.deckSize}장이어야 저장할 수 있습니다. 지금 <b>${n}장</b>이라 <b>${RULES.deckSize - n}장</b>이 더 필요합니다.</p><p class="muted">저장하지 않으면 게임에 들어갈 수 없습니다.</p>`, [{ label: "확인", value: 1, cls: "primary" }]);
      toast(`카드가 부족합니다 (${n}/${RULES.deckSize})`, "bad");
      return;
    }
    const r = Store.saveDeck(u, f, E.cards, E.name);
    if (!r.ok) { toast(r.msg, "bad"); return; }
    E.name = Store.deck(u, f).name; $("#ed-name").value = E.name;
    toast("덱을 저장했습니다. 이제 이 덱으로 대전할 수 있습니다.", "good");
    draw();
  });
  $("#ed-revert").addEventListener("click", () => { const d = Store.deck(u, f); E.cards = Object.assign({}, d.cards); E.name = d.name; $("#ed-name").value = E.name; draw(); });
  $("#ed-starter").addEventListener("click", () => { const d = Store.starter(f); const own = {}; for (const id in d.cards) own[id] = Math.min(d.cards[id], Store.ownedCount(u, id)); E.cards = own; E.name = d.name; $("#ed-name").value = E.name; draw(); toast("기본 덱을 불러왔습니다. 저장해야 반영됩니다."); });
  $("#ed-back").addEventListener("click", async () => { if (await guard()) showLobby(); });
  $("#ed-play").addEventListener("click", async () => {
    if (dirty() || !Store.deckPlayable(u, f)) { toast("40장을 채우고 저장해야 게임에 들어갈 수 있습니다.", "warn"); return; }
    const v = await modal(`<h3>대전 방식</h3><p>저장된 「${esc(Store.deck(u, f).name)}」로 출전합니다.</p>`, [{ label: "취소", value: null }, { label: "대전 (2인)", value: "pvp" }, { label: "컴퓨터와 대전", value: "ai", cls: "primary" }]);
    if (v === "ai") startVsAI(f); else if (v === "pvp") startPvP(f);
  });
  draw();
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
    body = `<div class="users">${users.length ? `<table class="utable"><thead><tr><th>모험가</th><th>시작 단체</th>${GROUP_IDS.map(g => `<th>${GROUPS[g].name}</th>`).join("")}<th>보유 카드</th><th>전적</th><th></th></tr></thead><tbody>
        ${users.map(x => `<tr><td><b>${esc(x.id)}</b></td><td>${GROUPS[x.group] ? GROUPS[x.group].name : "-"}</td>
          ${GROUP_IDS.map(g => `<td><button class="btn xs ${x.owned[g] ? "on" : ""}" data-u="${esc(x.id)}" data-tog="${g}" ${x.group === g ? "disabled" : ""}>${x.owned[g] ? "보유" : "미보유"}</button></td>`).join("")}
          <td>${countMap(x.collection)}장</td><td>${x.stats.w}승 ${x.stats.l}패</td>
          <td><button class="btn xs" data-u="${esc(x.id)}" data-all="1">모든 카드 지급</button></td></tr>`).join("")}
        </tbody></table>` : '<p class="empty">아직 등록된 모험가가 없습니다. 로그아웃한 뒤 "새 모험가"로 등록하면 여기에 나타납니다.</p>'}
        <p class="note">이 목록은 이 브라우저에 저장된 계정입니다. 서버가 생기면 같은 화면에서 전체 계정을 관리하게 됩니다.</p></div>`;
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
      if (b.dataset.all) { CARD_LIST.forEach(c => { if (x.owned[c.group]) x.collection[c.id] = maxCopiesOf(c); }); Store.save(); toast(`${x.id}: 보유 단체의 모든 카드를 ${RULES.maxCopies}장씩 지급`); }
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
  showTitle();
}
document.addEventListener("DOMContentLoaded", boot);

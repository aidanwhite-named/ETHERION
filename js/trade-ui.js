/* ETHERION v3.21 — 린데어 교역소 화면 (규칙 · 저장은 js/trade.js, 실시간 거래 연결은 js/trade-live.js)
   왼쪽 = 교역소 명판 · 길 넷(거래 게시판 · 내 거래 · 실시간 거래 · 소식) · 거래 올리기 · 맡겨 둔 것.
   오른쪽 = 고른 길. 거래 칸을 누르면 거래 창(상세)이 열리고, 내놓은 카드는 원본 카드 크기로 보인다.
   카드마다 등급 칩(js/grades.js 색)과 등급 색 테두리를 붙인다(가이드 2.21).
   화면은 TradeAPI(Promise)만 부른다 — 서버가 생겨도 이 파일은 고칠 것이 없다. */
"use strict";

const TradeUI = {
  tab: "board",
  f: { kind: "", grade: "", q: "", sort: "end" },
  timer: null,
  /* 상단 띠 '교역소' 옆 안 읽은 소식 점 */
  badge() {
    const n = TradeAPI.unread();
    for (const b of document.querySelectorAll('.tb-nav[data-nav="trade"]')) {
      let i = b.querySelector(".tb-badge");
      if (!n) { if (i) i.remove(); continue; }
      if (!i) { i = document.createElement("i"); i.className = "tb-badge"; b.appendChild(i); }
      i.textContent = n > 99 ? "99+" : n;
      i.title = `안 읽은 교역소 소식 ${n}개`;
    }
  },
  badgeHTML() { const n = TradeAPI.unread(); return n ? `<i class="tb-badge" title="안 읽은 교역소 소식 ${n}개">${n > 99 ? "99+" : n}</i>` : ""; }
};

/* ---------- 작은 조각들 ---------- */
const TRADE_ICON = {
  trade: '<path d="M4 8.5h13.5l-3.4-3.4M20 15.5H6.5l3.4 3.4"/><path d="M12 10.3l1.7 1.7-1.7 1.7-1.7-1.7z"/>',
  board: '<rect x="4" y="4.5" width="16" height="15" rx="1"/><path d="M7.5 9h9M7.5 12.5h9M7.5 16h5"/>',
  mine: '<path d="M12 3.5l7 3v5.2c0 4.3-3 7.4-7 8.8-4-1.4-7-4.5-7-8.8V6.5z"/><path d="M9 12l2.2 2.2L15.4 10"/>',
  live: '<circle cx="7" cy="12" r="3"/><circle cx="17" cy="12" r="3"/><path d="M10 12h4"/><path d="M3.5 6.5c1.8-1.5 3.6-2 5-2M20.5 17.5c-1.8 1.5-3.6 2-5 2"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 1.5h-15z"/><path d="M10 20a2 2 0 004 0"/>',
  hourglass: '<path d="M7 3.5h10M7 20.5h10M8 3.5c0 4.5 8 4.5 8 8.5s-8 4-8 8.5M16 3.5c0 4.5-8 4.5-8 8.5s8 4 8 8.5"/>'
};
const tIcon = k => `<svg class="t-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${TRADE_ICON[k]}</svg>`;
const KIND = { offer: { name: "교환 제안", en: "Exchange" }, auction: { name: "경매", en: "Auction" } };

/* 남은 시간: 3일 4시간 · 5시간 12분 · 12:09 */
function tLeft(ms) {
  if (ms <= 0) return "마감";
  const s = Math.ceil(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), ss = s % 60;
  if (d) return `${d}일 ${h}시간`;
  if (h) return `${h}시간 ${m}분`;
  return `${m}:${String(ss).padStart(2, "0")}`;
}
function tAgo(at) {
  const s = Math.max(0, Math.round((Date.now() - at) / 1000));
  if (s < 60) return "방금"; if (s < 3600) return Math.floor(s / 60) + "분 전"; if (s < 86400) return Math.floor(s / 3600) + "시간 전";
  return Math.floor(s / 86400) + "일 전";
}
const tShards = n => `<span class="t-shards"><i class="shard" aria-hidden="true"></i><b>${Math.round(n).toLocaleString("ko-KR")}</b><small>조각</small></span>`;
const tTimer = (ends, cls) => `<span class="t-timer${cls ? " " + cls : ""}" data-ends="${ends}">${tIcon("hourglass")}<b>${tLeft(ends - Date.now())}</b></span>`;
const tKind = k => `<span class="t-kind k-${k}">${KIND[k].name}</span>`;

/* 거래 카드 한 장: 등급 칩 + 등급 색 테두리 빛. o.size "full"(원본) | "md"(노멀), o.w 카드 폭(px), o.n 장수, o.x 빼기 단추 */
function tCardHTML(id, o) {
  o = o || {};
  const c = CARDS[id]; if (!c) return "";
  const G = GRADES[gradeOf(c)], full = o.size === "full";
  const style = `--gr:${G.color};${full ? `--card-full:${o.w || 280}px` : `--card-md:${o.w || 150}px`}`;
  return `<div class="tcard${full ? " full" : ""} grade-${G.id}${o.cls ? " " + o.cls : ""}" style="${style}" data-tcard="${id}">
    <span class="tc-top">${gradeBadgeHTML(c, "tc-grade")}${o.n > 1 ? `<b class="tc-n">×${o.n}</b>` : ""}</span>
    ${full ? cardHTML(c, { size: "full" }) : cardHTML(c, { size: "md", brief: true })}
    ${o.x ? `<button type="button" class="tc-x" data-unpick="${o.x}:${id}" title="한 장 빼기" aria-label="한 장 빼기">−</button>` : ""}
    ${o.lockTag ? `<span class="tc-lock">${o.lockTag}</span>` : ""}
  </div>`;
}
/* 꾸러미 보이기: 카드들 + 조각 판 */
function tAssetsHTML(a, o) {
  o = o || {};
  const ids = TA.ids(a);
  const cards = ids.map((id, i) => tCardHTML(id, { size: o.size, w: i === 0 && o.lead ? o.lead : o.w, n: a.cards[id], cls: i === 0 && o.lead ? "lead" : "" })).join("");
  const sh = a.shards ? `<div class="t-plate">${tShards(a.shards)}</div>` : "";
  return `<div class="t-assets${o.cls ? " " + o.cls : ""}">${cards}${sh}${!ids.length && !a.shards ? `<p class="t-none">${o.none || "없음"}</p>` : ""}</div>`;
}

/* ---------- 화면 ---------- */
function showTrade(tab) {
  Store.ensureOpen();
  const u = Store.user(); if (!u) return showLogin();
  App.screen = "trade"; Bg.set("calm"); Bg.freeze(); if (typeof Titans !== "undefined") Titans.mode("off");
  if (tab) TradeUI.tab = tab;
  $("#app").innerHTML = `<section class="screen screen-shop screen-trade">
    ${typeof Scenes !== "undefined" ? Scenes.html("shop") : ""}
    ${headerHTML("린데어 교역소")}
    <div class="trade">
      <aside class="trade-side" id="trade-side"></aside>
      <main class="trade-main" id="trade-main"></main>
    </div>
  </section>`;
  const root = $(".screen-trade");
  bindHeader(root);
  if (typeof Scenes !== "undefined") Scenes.bind(root, "shop");
  tradeRender();
  App.refresh = () => { if (App.screen === "trade" && root.isConnected) tradeRender(); };
  root.addEventListener("click", async e => {
    const t = e.target.closest("[data-ttab]");
    if (t) { TradeUI.tab = t.dataset.ttab; tradeRender(); return; }
    if (e.target.closest("[data-tnew]")) { tradeCompose("new"); return; }
    const lid = e.target.closest("[data-lid]");
    if (lid && !e.target.closest("button:not([data-lid])")) { tradeOpen(lid.dataset.lid); return; }
    const fk = e.target.closest("[data-tf]");
    if (fk) { const [k, v] = fk.dataset.tf.split(":"); TradeUI.f[k] = v; tradeMain(); return; }
    if (e.target.closest("[data-tread]")) { await TradeAPI.readAll(); TradeUI.badge(); tradeRender(); return; }
  });
  root.addEventListener("input", e => {
    if (e.target.id === "tf-q") { TradeUI.f.q = e.target.value; clearTimeout(TradeUI._qt); TradeUI._qt = setTimeout(() => tradeBoardList(), 150); }
  });
  clearInterval(TradeUI.timer);
  TradeUI.timer = setInterval(() => {
    if (!root.isConnected) { clearInterval(TradeUI.timer); return; }
    tradeTick(document);
  }, 1000);
}
/* 1초마다: 남은 시간 글자를 고치고, 마감된 것이 보이면 다시 그린다 */
function tradeTick(scope) {
  let due = false;
  for (const el of scope.querySelectorAll("[data-ends]")) {
    const ms = +el.dataset.ends - Date.now(), b = el.querySelector("b");
    if (b) b.textContent = tLeft(ms);
    el.classList.toggle("soon", ms > 0 && ms < 600000);
    if (ms <= 0 && !el.dataset.done) { el.dataset.done = "1"; due = true; }
  }
  if (due) { TradeAPI.tick(); if (App.screen === "trade") tradeRender(); for (const w of TradeWins) if (w.refresh) w.refresh(); }
}

async function tradeRender() { await tradeSide(); await tradeMain(); TradeUI.badge(); }

async function tradeSide() {
  const box = $("#trade-side"); if (!box) return;
  const u = Store.user(), block = Store.tradeBlock(u);
  const [board, mine, held] = await Promise.all([TradeAPI.board(), TradeAPI.mine(), TradeAPI.held()]);
  const unread = TradeAPI.unread(), h = held.held;
  const tab = (k, ico, name, en, n) => `<button type="button" class="org-node rq t-tab${TradeUI.tab === k ? " on" : ""}" data-ttab="${k}"><i class="rq-plate" aria-hidden="true"></i>${tIcon(ico)}<b>${name}</b><span class="en">${en}</span>${n ? `<em class="t-count">${n}</em>` : ""}</button>`;
  box.innerHTML = `
    <div class="org-node rq root t-root"><i class="rq-plate" aria-hidden="true"></i><span class="emblem big q">${tIcon("trade")}</span><b>린데어 교역소</b><span class="en">Lindear Exchange</span><span class="role">모험가끼리 카드 · 조각 맞바꾸기</span></div>
    <nav class="t-tabs">
      ${tab("board", "board", "거래 게시판", "Board", board.list.length)}
      ${tab("mine", "mine", "내 거래", "My Trades", mine.open.length)}
      ${tab("live", "live", "실시간 거래", "Live Trade", TradeLive.state === "open" ? "●" : 0)}
      ${tab("notices", "bell", "소식", "Notices", unread)}
    </nav>
    <button type="button" class="btn primary t-new" data-tnew="1" ${block ? `disabled title="${esc(block)}"` : ""}>${tIcon("trade")}<span>거래 올리기</span></button>
    ${block ? `<p class="t-block">${esc(block)}</p>` : `<div class="t-held" title="거래에 걸려 교역소가 맡아 둔 것. 성사되면 상대에게 가고, 닫히면 돌려받습니다.">
      <p class="eyebrow">맡겨 둔 것</p>
      <b>카드 ${TA.n(h)}장 · ${fmtGold(h.shards)}</b>
      ${TA.n(h) ? `<span class="t-held-list">${TA.ids(h).map(id => `${esc(CARDS[id].name)}${h.cards[id] > 1 ? " ×" + h.cards[id] : ""}`).join(" · ")}</span>` : ""}
    </div>`}
    <p class="t-note">덱 조정실에 저장한 덱 · 초안에 든 장수는 걸 수 없습니다. ${typeof Net !== "undefined" && Net.on ? "서버에 연결되어 거래 게시판은 <b>이 서버의 모든 모험가</b>와 함께 씁니다. 실시간 거래는 <b>방 코드로 이은 친구와</b> 합니다." : "지금은 서버 연결 전이라 거래 게시판은 <b>이 기기의 모험가끼리</b>, 실시간 거래는 <b>방 코드로 이은 친구와</b> 합니다."}</p>`;
}

async function tradeMain() {
  const box = $("#trade-main"); if (!box) return;
  const t = TradeUI.tab;
  if (t === "board") return tradeBoard(box);
  if (t === "mine") return tradeMine(box);
  if (t === "live") return tradeLiveView(box);
  if (t === "notices") return tradeNotices(box);
}
function tHead(eyebrow, title, sub, right) {
  return `<div class="t-head"><div><p class="eyebrow">${eyebrow}</p><h2>${title}${sub ? ` <small>${sub}</small>` : ""}</h2></div>${right || ""}</div>`;
}

/* ----- 거래 게시판 ----- */
async function tradeBoard(box) {
  const F = TradeUI.f;
  const chip = (k, v, label, extra) => `<button type="button" class="chip${F[k] === v ? " on" : ""}" data-tf="${k}:${v}"${extra || ""}>${label}</button>`;
  box.innerHTML = `${tHead("LINDEAR EXCHANGE · BOARD", "거래 게시판", "", `<div class="t-wallet"><span class="eyebrow">환석 조각</span><b>${Store.isAdmin() ? "∞" : fmtGold(Store.gold())}</b></div>`)}
    <div class="t-filters">
      <div class="chips"><span class="sf-label">방식</span>${chip("kind", "", "모두")}${chip("kind", "offer", "교환 제안")}${chip("kind", "auction", "경매")}</div>
      <div class="chips"><span class="sf-label">등급</span>${chip("grade", "", "모든 등급")}${GRADE_IDS.map(g => chip("grade", g, GRADES[g].name, ` style="--gr:${GRADES[g].color}"`)).join("")}</div>
      <div class="chips"><span class="sf-label">정렬</span>${chip("sort", "end", "마감 임박")}${chip("sort", "new", "새로 올라온")}${chip("sort", "hot", "참여 많은")}
        <input id="tf-q" class="t-q" type="search" placeholder="카드 이름 · 모험가 찾기" value="${esc(F.q)}" autocomplete="off"></div>
    </div>
    <div class="t-list" id="t-list"></div>`;
  for (const b of box.querySelectorAll('.t-filters .chip[style*="--gr"]')) b.classList.add("sf-grade");
  await tradeBoardList();
}
async function tradeBoardList() {
  const el = $("#t-list"); if (!el) return;
  const F = TradeUI.f, r = await TradeAPI.board({ kind: F.kind || null });
  const q = F.q.trim().toLowerCase();
  let list = r.list.filter(L => (!F.grade || L.top === F.grade)
    && (!q || L.owner.toLowerCase().includes(q) || L.note.toLowerCase().includes(q) || [...TA.ids(L.give), ...TA.ids(L.want)].some(id => CARDS[id].name.toLowerCase().includes(q))));
  list.sort(F.sort === "new" ? (a, b) => b.created - a.created : F.sort === "hot" ? (a, b) => b.open - a.open || a.ends - b.ends : (a, b) => a.ends - b.ends);
  el.innerHTML = list.length ? list.map(L => tTileHTML(L)).join("")
    : `<div class="t-empty">${tIcon("board")}<p>${r.list.length ? "조건에 맞는 거래가 없습니다." : "아직 올라온 거래가 없습니다."}</p><p class="muted small">왼쪽 <b>거래 올리기</b>로 내 카드를 걸고 원하는 카드나 조각을 적어 보세요. 다른 모험가는 이 게시판에서 참여합니다.</p></div>`;
}
/* 거래 칸: 위 = 방식 · 남은 시간 · 올린 이, 가운데 = 내놓은 것(첫 카드를 크게) ⇄ 원하는 것 / 최고 입찰 */
function tTileHTML(L) {
  const G = L.top ? GRADES[L.top] : null;
  const wantSide = L.kind === "auction"
    ? `<div class="tt-bid"><span class="eyebrow">${L.best ? "최고 입찰" : "시작가"}</span>${tShards(L.best ? L.best.shards : L.want.shards)}<small>${L.best ? `${esc(L.best.by)} · 입찰 ${L.offers.length}번` : "아직 입찰 없음"}</small>
        ${TA.n(L.want) ? `<span class="tt-req">꼭 함께: ${TA.ids(L.want).map(id => esc(CARDS[id].name)).join(" · ")}</span>` : ""}</div>`
    : L.openWant ? `<div class="tt-bid"><span class="eyebrow">원하는 것</span><b class="tt-open">조건 없이 제안 받기</b></div>`
    : `<div class="tt-want"><span class="eyebrow">원하는 것</span>${tAssetsHTML(L.want, { w: 84 })}</div>`;
  return `<article class="t-tile k-${L.kind}${L.mine ? " mine" : ""}${L.myOffer ? " joined" : ""}" data-lid="${L.id}" style="--gr:${G ? G.color : "var(--gold)"}" tabindex="0">
    <header>${tKind(L.kind)}${tTimer(L.ends)}<span class="tt-by">${L.mine ? "<b>내 거래</b>" : esc(L.owner)}</span></header>
    <div class="tt-body">
      <div class="tt-give">${tAssetsHTML(L.give, { w: 96, lead: 168 })}</div>
      <div class="tt-arrow" aria-hidden="true">${tIcon("trade")}</div>
      ${wantSide}
    </div>
    <footer>${L.note ? `<q>${esc(L.note)}</q>` : `<span class="muted">#${L.id}</span>`}<span class="tt-join">${L.myOffer ? '<b class="ok">참여 중</b> · ' : ""}참여 ${L.open}</span></footer>
  </article>`;
}

/* ----- 내 거래 ----- */
async function tradeMine(box) {
  const r = await TradeAPI.mine();
  const owned = r.open.filter(L => L.mine), joined = r.open.filter(L => !L.mine);
  const res = L => {
    if (L.state === "done") { const won = L.result.by === TradeAPI.me(); return `<b class="ok">성사</b> · ${L.mine ? `${esc(L.result.by)}님과` : won ? "내가 가져감" : `${esc(L.result.by)}님이 가져감`}`; }
    return L.state === "cancelled" ? "<b>내림</b>" : "<b class=\"bad\">닫힘</b> · 성사 안 됨";
  };
  const row = L => `<div class="t-row" data-lid="${L.id}">${tKind(L.kind)}<span class="tr-what">${TA.ids(L.give).slice(0, 3).map(id => tCardHTML(id, { w: 56, n: L.give.cards[id] })).join("")}${L.give.shards ? tShards(L.give.shards) : ""}</span>
    <span class="tr-txt"><b>${esc(TA.text(L.give))}</b><small>${L.mine ? "내가 올림" : esc(L.owner) + "님 거래"} · #${L.id}${L.state === "open" ? ` · 참여 ${L.open}` : ""}</small></span>
    <span class="tr-st">${L.state === "open" ? tTimer(L.ends) : `${res(L)}<small>${tAgo(L.closed)}</small>`}</span></div>`;
  const live = TradeLive.history;
  box.innerHTML = `${tHead("LINDEAR EXCHANGE · MY TRADES", "내 거래")}
    <h3 class="panel-title">올린 거래 <small>${owned.length} / ${TRADE.maxOpen}</small></h3>
    <div class="t-rows">${owned.map(row).join("") || '<p class="t-none">올려 둔 거래가 없습니다.</p>'}</div>
    <h3 class="panel-title">참여한 거래 <small>${joined.length}</small></h3>
    <div class="t-rows">${joined.map(row).join("") || '<p class="t-none">참여 중인 거래가 없습니다.</p>'}</div>
    <h3 class="panel-title">지난 거래 <small>최근 ${r.closed.length}</small></h3>
    <div class="t-rows">${r.closed.map(row).join("") || '<p class="t-none">아직 끝난 거래가 없습니다.</p>'}</div>
    ${live.length ? `<h3 class="panel-title">이번 접속의 실시간 거래</h3><div class="t-rows">${live.map(x => `<div class="t-row"><span class="t-kind k-live">실시간</span><span class="tr-txt"><b>내줌 ${esc(TA.text(x.give))} / 받음 ${esc(TA.text(x.get))}</b><small>${esc(x.peer)}님과 · ${tAgo(x.at)}</small></span></div>`).join("")}</div>` : ""}`;
}

/* ----- 소식 ----- */
async function tradeNotices(box) {
  const r = await TradeAPI.notices();
  const ico = { done: "✦", join: "＋", out: "↺", lost: "↺", expired: "⌛", cancel: "✕" };
  box.innerHTML = `${tHead("LINDEAR EXCHANGE · NOTICES", "소식", "", r.list.some(n => !n.read) ? '<button type="button" class="btn xs" data-tread="1">모두 읽음</button>' : "")}
    <div class="t-notices">${r.list.map(n => `<div class="t-notice n-${n.kind}${n.read ? "" : " unread"}"${n.lid ? ` data-lid="${n.lid}"` : ""}><i>${ico[n.kind] || "◆"}</i><p>${esc(n.text)}</p><small>${tAgo(n.at)}</small></div>`).join("") || '<p class="t-none">아직 소식이 없습니다. 거래가 성사되거나 누가 참여하면 여기 남습니다.</p>'}</div>`;
  if (r.list.some(n => !n.read)) setTimeout(async () => { if (TradeUI.tab === "notices") { await TradeAPI.readAll(); TradeUI.badge(); const s = $("#trade-side"); if (s) tradeSide(); } }, 1500);
}

/* ---------- 거래 창(겹쳐 뜨는 창) ---------- */
const TradeWins = new Set();
function tradeWin(html, cls) {
  const wrap = document.createElement("div"); wrap.className = "modal-wrap t-wrap";
  wrap.innerHTML = `<div class="modal trade-win ${cls || ""}" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(wrap);
  const key = e => { if (e.key === "Escape" && [...TradeWins].pop() === w) w.close(); };
  const w = { el: wrap, box: wrap.firstElementChild, refresh: null, onClose: null,
    close() { if (!TradeWins.has(w)) return; TradeWins.delete(w); wrap.remove(); document.removeEventListener("keydown", key); if (w.onClose) w.onClose(); } };
  TradeWins.add(w);
  document.addEventListener("keydown", key);
  wrap.addEventListener("click", e => { if (e.target === wrap || e.target.closest("[data-wclose]")) w.close(); });
  return w;
}

/* ----- 거래 상세: 내놓은 카드를 원본 크기로, 참여 목록, 참여 · 수락 · 내리기 ----- */
async function tradeOpen(lid) {
  const w = tradeWin(`<div class="t-detail" id="t-detail"></div>`, "wide");
  const draw = async () => {
    const r = await TradeAPI.get(lid);
    const box = w.box.querySelector("#t-detail"); if (!box) return;
    if (!r.ok) { box.innerHTML = `<p>${esc(r.msg)}</p><div class="modal-btns"><button type="button" class="btn" data-wclose="1">닫기</button></div>`; return; }
    box.innerHTML = tDetailHTML(r.listing);
  };
  w.refresh = draw;
  w.box.addEventListener("click", async e => {
    const b = e.target.closest("[data-tact]"); if (!b) { const cd = e.target.closest("[data-tcard]"); if (cd && !e.target.closest("button")) showCardModal(CARDS[cd.dataset.tcard]); return; }
    const act = b.dataset.tact, me = await TradeAPI.get(lid); if (!me.ok) { toast(me.msg, "warn"); return draw(); }
    const L = me.listing;
    let r = null;
    if (act === "join") { const ok = await tradeCompose("offer", L); if (ok) draw(); return; }
    if (act === "withdraw") r = await TradeAPI.withdraw(lid);
    if (act === "accept") {
      const o = L.offers.find(x => x.id === b.dataset.oid);
      const yes = await modal(`<h3>이 참여와 맞바꿀까요?</h3><p>받음: <b>${esc(TA.text(TA.clean(o)))}</b> (${esc(o.by)}님)<br>내줌: <b>${esc(TA.text(L.give))}</b></p><p class="muted small">다른 참여는 모두 돌려받습니다. 되돌릴 수 없습니다.</p>`, [{ label: "취소", value: false }, { label: "맞바꾸기", value: true, cls: "primary" }]);
      if (!yes) return;
      r = await TradeAPI.accept(lid, o.id);
    }
    if (act === "cancel") {
      const yes = await modal(`<h3>거래를 내릴까요?</h3><p>맡긴 것을 돌려받습니다: <b>${esc(TA.text(L.give))}</b>${L.open ? `<br>참여 ${L.open}개도 모두 돌려줍니다.` : ""}</p>`, [{ label: "그대로 두기", value: false }, { label: "내리기", value: true, cls: "danger" }]);
      if (!yes) return;
      r = await TradeAPI.cancel(lid);
    }
    if (act === "force") r = await TradeAPI.forceEnd(lid);
    if (r) {
      if (!r.ok) toast(r.msg, "warn");
      else { toast(act === "withdraw" ? "참여를 거두고 맡긴 것을 돌려받았습니다." : act === "accept" ? "거래가 성사되었습니다." : act === "cancel" ? "거래를 내렸습니다." : "지금 마감했습니다.", "good"); if (act === "accept" && typeof FEEL !== "undefined") FEEL.play("coinHeads", .7); }
      draw(); if (App.screen === "trade") tradeRender();
    }
  });
  await draw();
  return w;
}
function tDetailHTML(L) {
  const u = Store.user(), block = Store.tradeBlock(u), open = L.state === "open";
  const stTxt = { done: "성사됨", expired: "성사 안 되고 닫힘", cancelled: "내려짐" }[L.state];
  const wantHTML = L.kind === "auction"
    ? `<div class="td-auction">
        <div><span class="eyebrow">${L.best ? "최고 입찰" : "시작가"}</span>${tShards(L.best ? L.best.shards : L.want.shards)}${L.best ? `<small>${esc(L.best.by)} · ${tAgo(L.best.at)}</small>` : ""}</div>
        ${open ? `<div><span class="eyebrow">다음 입찰</span>${tShards(L.minBid)}<small>최고가 + 5% (최소 ${TRADE.stepMin})</small></div>` : ""}
        ${TA.n(L.want) ? `<div class="td-req"><span class="eyebrow">꼭 함께 낼 카드</span>${tAssetsHTML({ cards: L.want.cards, shards: 0 }, { w: 120 })}</div>` : ""}
      </div>`
    : L.openWant ? `<p class="td-open">조건 없이 제안을 받습니다. 올린 사람이 마음에 드는 제안을 골라 성사시킵니다. 기한까지 고르지 않으면 닫힙니다.</p>`
    : `${tAssetsHTML(L.want, { w: 150 })}<p class="td-rule">이 조건을 <b>모두</b> 채운 참여 중 <b>가장 먼저</b> 들어온 것이 기한에 성사됩니다. 조건과 다른 제안도 낼 수 있고, 올린 사람은 기한 전에 아무 참여나 골라 바로 성사시킬 수 있습니다.</p>`;
  const offers = L.offers.slice().sort((a, b) => L.kind === "auction" ? b.shards - a.shards || a.at - b.at : a.at - b.at);
  const ost = { open: "", out: "밀림", withdrawn: "거둠", won: "성사", lost: "돌려받음" };
  const offerRow = o => `<div class="td-offer${o.state === "open" ? "" : " off"}${o.by === u.id ? " me" : ""}${o.state === "won" ? " won" : ""}">
      <span class="to-by"><b>${esc(o.by)}</b><small>${tAgo(o.at)}</small></span>
      <span class="to-what">${TA.ids(o).map(id => tCardHTML(id, { w: 78, n: o.cards[id] })).join("")}${o.shards ? tShards(o.shards) : ""}</span>
      <span class="to-tag">${L.kind === "offer" && !L.openWant ? (o.meets ? '<em class="meet">조건 충족</em>' : '<em class="other">다른 제안</em>') : ""}${ost[o.state] ? `<em class="st">${ost[o.state]}</em>` : ""}</span>
      <span class="to-btn">${open && L.mine && o.state === "open" && (L.kind === "offer" || (L.best && L.best.id === o.id)) ? `<button type="button" class="btn xs gold" data-tact="accept" data-oid="${o.id}">${L.kind === "auction" ? "지금 낙찰" : "이 참여와 성사"}</button>` : ""}</span>
    </div>`;
  const btns = [];
  if (open && !L.mine && !block) {
    if (L.myOffer && L.kind === "offer") btns.push(`<button type="button" class="btn" data-tact="withdraw">내 참여 거두기</button>`);
    if (!(L.kind === "auction" && L.best && L.best.by === u.id)) btns.push(`<button type="button" class="btn primary" data-tact="join">${L.kind === "auction" ? "입찰하기" : L.myOffer ? "참여 바꾸기" : "참여하기"}</button>`);
  }
  if (open && L.mine && !(L.kind === "auction" && L.best)) btns.push(`<button type="button" class="btn danger" data-tact="cancel">거래 내리기</button>`);
  if (open && Store.isAdmin(u)) btns.push(`<button type="button" class="btn ghost" data-tact="force" title="관리자 시험 도구: 기한을 지금으로 당겨 바로 정산합니다">지금 마감 (시험)</button>`);
  return `<header class="td-head">
      <div>${tKind(L.kind)}<span class="td-id">#${L.id}</span>${open ? tTimer(L.ends, "big") : `<span class="td-state s-${L.state}">${stTxt}</span>`}</div>
      <h3>${L.mine ? "내가 올린 거래" : `${esc(L.owner)}님의 거래`}</h3>
      ${L.note ? `<q class="td-note">${esc(L.note)}</q>` : ""}
      <button type="button" class="td-x" data-wclose="1" aria-label="닫기">✕</button>
    </header>
    <div class="td-cols">
      <section class="td-give"><h4 class="panel-title">내놓은 것 <small>교역소가 맡아 둠 · 카드를 누르면 크게</small></h4>${tAssetsHTML(L.give, { size: "full", w: 270 })}</section>
      <div class="td-arrow" aria-hidden="true">${tIcon("trade")}</div>
      <section class="td-want"><h4 class="panel-title">${L.kind === "auction" ? "경매" : "원하는 것"}</h4>${wantHTML}</section>
    </div>
    <section class="td-offers"><h4 class="panel-title">${L.kind === "auction" ? "입찰" : "참여"} <small>${L.offers.length}</small></h4>
      ${offers.map(offerRow).join("") || `<p class="t-none">아직 ${L.kind === "auction" ? "입찰이" : "참여가"} 없습니다.</p>`}</section>
    ${block && open && !L.mine ? `<p class="t-block">${esc(block)}</p>` : ""}
    <div class="modal-btns"><button type="button" class="btn" data-wclose="1">닫기</button>${btns.join("")}</div>`;
}

/* ---------- 거래 창: 올리기 · 참여하기 ----------
   mode "new": 내놓을 것(내 카드 + 조각) ⇄ 받고 싶은 것(모든 카드 + 조각). 방식 · 기한 · 한마디.
   mode "offer": 거래 L에 참여 — 내가 맡길 것만 고른다(원하는 것을 미리 채워 둠). 경매는 꼭 낼 카드가 고정되고 조각이 입찰가.
   돌려주는 값: 성공하면 true */
function tradeCompose(mode, L) {
  const u = Store.user(), block = Store.tradeBlock(u);
  if (block) { toast(block, "warn"); return Promise.resolve(false); }
  const S = {
    kind: "offer", minutes: TRADE.defDur, note: "", open: false,
    give: { cards: {}, shards: 0 }, want: { cards: {}, shards: 0 },
    pg: { src: "mine", type: "all", grade: "", q: "", lim: 60 }, pw: { src: "all", type: "all", grade: "", q: "", lim: 60 }
  };
  const lockCards = {};   // 경매 참여: 꼭 낼 카드(뺄 수 없음)
  if (mode === "offer") {
    for (const id of TA.ids(L.want)) { const k = Math.min(L.want.cards[id], Store.tradeable(u, id)); if (k) S.give.cards[id] = k; if (L.kind === "auction") lockCards[id] = L.want.cards[id]; }
    S.give.shards = L.kind === "auction" ? L.minBid : L.openWant ? 0 : L.want.shards;
    if (L.myOffer && L.kind === "offer") S.give = TA.clean(L.myOffer);
  }
  return new Promise(resolve => {
    const w = tradeWin(`<div class="t-compose${mode === "offer" ? " is-offer" : ""}" id="tco"></div>`, "wide compose");
    let done = false;
    w.onClose = () => { if (!done) resolve(false); };
    const box = w.box.querySelector("#tco");
    const sideName = s => s === "give" ? (mode === "offer" ? "내가 맡길 것" : "내가 내놓는 것") : (S.kind === "auction" ? "꼭 함께 낼 카드 · 시작가" : "받고 싶은 것");
    const room = (side, id) => side === "give" ? Store.tradeable(u, id) - (S.give.cards[id] || 0) : maxCopiesOf(CARDS[id]) - (S.want.cards[id] || 0);
    const draw = () => {
      const top = mode === "new" ? `
        <div class="tco-opts">
          <div class="chips"><span class="sf-label">방식</span>
            <button type="button" class="chip${S.kind === "offer" ? " on" : ""}" data-kind="offer" title="원하는 것을 적어 두고, 조건을 채운 참여 중 가장 먼저 들어온 것과 기한에 성사">교환 제안</button>
            <button type="button" class="chip${S.kind === "auction" ? " on" : ""}" data-kind="auction" title="시작가를 정하고, 기한에 가장 높은 조각을 낸 입찰과 성사">경매</button></div>
          <div class="chips"><span class="sf-label">기한</span>${TRADE.durations.map(([m, n]) => `<button type="button" class="chip${S.minutes === m ? " on" : ""}" data-min="${m}">${n}</button>`).join("")}</div>
          <label class="tco-note"><span class="sf-label">한마디</span><input id="tco-note" maxlength="${TRADE.noteMax}" placeholder="예: 비술 덱 짜는 중, 레어 마법 구해요" value="${esc(S.note)}"></label>
        </div>` : `
        <div class="tco-target">
          <div><span class="eyebrow">${esc(L.owner)}님이 내놓은 것</span>${tAssetsHTML(L.give, { w: 132 })}</div>
          <div class="tco-cond">${L.kind === "auction" ? `<span class="eyebrow">입찰 조건</span><p>조각 <b>${fmtGold(L.minBid)}</b> 이상${TA.n(L.want) ? " + 꼭 함께: " + TA.ids(L.want).map(id => `「${esc(CARDS[id].name)}」${L.want.cards[id] > 1 ? " ×" + L.want.cards[id] : ""}`).join(" · ") : ""}</p><p class="muted small">더 높은 입찰이 들어오면 맡긴 것을 바로 돌려받습니다.</p>`
            : L.openWant ? `<span class="eyebrow">조건 없음</span><p>무엇이든 제안하세요. 올린 사람이 골라야 성사됩니다.</p>`
            : `<span class="eyebrow">원하는 것</span><div class="tco-check" id="tco-check"></div><p class="muted small">조건과 달라도 제안할 수 있습니다(올린 사람이 골라야 성사).</p>`}</div>
        </div>`;
      box.innerHTML = `<header class="td-head"><div><span class="t-kind k-${mode === "new" ? S.kind : L.kind}">${mode === "new" ? "거래 올리기" : L.kind === "auction" ? "입찰" : "참여"}</span></div>
          <h3>${mode === "new" ? "거래 창" : `${esc(L.owner)}님의 거래에 ${L.kind === "auction" ? "입찰" : "참여"}`}</h3>
          <button type="button" class="td-x" data-wclose="1" aria-label="닫기">✕</button></header>
        ${top}
        <div class="tco-cols${mode === "offer" ? " one" : ""}">
          ${sideHTML("give")}
          ${mode === "new" ? `<div class="td-arrow" aria-hidden="true">${tIcon("trade")}</div>${sideHTML("want")}` : ""}
        </div>
        <footer class="tco-foot"><p id="tco-sum"></p><div class="modal-btns"><button type="button" class="btn" data-wclose="1">취소</button><button type="button" class="btn primary" id="tco-go">${mode === "new" ? "거래 올리기" : L.kind === "auction" ? "입찰하기" : "참여하기"}</button></div></footer>`;
      for (const s of mode === "new" ? ["give", "want"] : ["give"]) { slots(s); pick(s); }
      sum();
    };
    const sideHTML = s => `<section class="tco-side s-${s}">
        <h4 class="panel-title">${sideName(s)} <small id="tco-n-${s}"></small>${s === "want" && S.kind === "offer" ? `<label class="tco-openchk" title="원하는 것을 정하지 않고 제안을 받습니다. 기한 전에 마음에 드는 제안을 골라야 성사됩니다"><input type="checkbox" id="tco-open" ${S.open ? "checked" : ""}> 조건 없이 제안 받기</label>` : ""}</h4>
        <div class="tco-slots" id="tco-slots-${s}"></div>
        <div class="tco-shards"><span class="sf-label">${s === "want" && S.kind === "auction" ? "시작가" : mode === "offer" && L.kind === "auction" ? "입찰가" : "조각"}</span>
          <input type="number" min="0" step="10" inputmode="numeric" id="tco-sh-${s}" value="${S[s].shards || ""}" placeholder="0">
          ${[10, 100, 1000].map(n => `<button type="button" class="btn xs" data-add="${s}:${n}">+${n}</button>`).join("")}
          ${s === "give" ? `<span class="muted small">지갑 ${fmtGold(Store.gold(u))}</span>` : ""}</div>
        <div class="tco-pick" id="tco-pick-${s}"></div>
      </section>`;
    const slots = s => {
      const el = box.querySelector("#tco-slots-" + s); if (!el) return;
      const a = S[s], ids = TA.ids(a);
      el.innerHTML = ids.map(id => tCardHTML(id, { w: 150, n: a.cards[id], x: lockCards[id] && s === "give" && a.cards[id] <= lockCards[id] ? null : s, lockTag: lockCards[id] && s === "give" ? "꼭 낼 카드" : "" })).join("")
        || `<p class="t-none">${s === "want" && S.open ? "조건 없이 제안을 받습니다. 참여한 제안 중 하나를 골라 성사시키세요(기한까지 고르지 않으면 닫힘)." : s === "give" ? "아래에서 카드를 눌러 넣으세요." : S.kind === "auction" ? "입찰자가 꼭 함께 내야 할 카드가 있으면 넣으세요(없어도 됩니다)." : "받고 싶은 카드를 아래에서 찾아 넣으세요."}</p>`;
      const n = box.querySelector("#tco-n-" + s); if (n) n.textContent = `카드 ${TA.n(a)} / ${TRADE.maxCards}`;
    };
    const pick = s => {
      const el = box.querySelector("#tco-pick-" + s); if (!el) return;
      const P = s === "give" ? S.pg : S.pw, keep = el.querySelector(".tp-grid") ? el.querySelector(".tp-grid").scrollTop : 0;
      let list = P.src === "mine" ? Object.keys(u.collection || {}).filter(id => CARDS[id] && u.collection[id] > 0).map(id => CARDS[id]) : CARD_LIST;
      if (P.type === "unit") list = list.filter(c => c.type === "unit");
      if (P.type === "spell") list = list.filter(c => isSpellType(c.type));
      if (P.type === "item") list = list.filter(c => c.type === "item");
      if (P.grade) list = list.filter(c => gradeOf(c) === P.grade);
      const q = P.q.trim().toLowerCase(); if (q) list = list.filter(c => c.name.toLowerCase().includes(q) || (GROUPS[c.group] && GROUPS[c.group].name.includes(q)));
      const canT = c => s === "give" && P.src === "mine" ? (Store.tradeable(u, c.id) > 0 ? 0 : 1) : 0;   /* 내 카드는 걸 수 있는 것부터 */
      list = list.slice().sort((a, b) => canT(a) - canT(b) || GRADES[gradeOf(b)].rank - GRADES[gradeOf(a)].rank || GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group) || a.lv - b.lv || a.id.localeCompare(b.id));
      const shown = list.slice(0, P.lim);
      const tile = c => {
        const r = room(s, c.id), have = (u.collection || {})[c.id] || 0, inDeck = Math.max(Store.deckUse(u, c.id), Store.draftUse(u, c.id));
        const meta = s === "give" ? (Store.tradeable(u, c.id) ? `거래 가능 <b>${Math.max(0, r)}</b> / 보유 ${have}` : `덱에 ${inDeck}장 · 걸 수 없음`) : `보유 ${have}`;
        return `<button type="button" class="tp-card${r > 0 ? "" : " off"}" data-pick="${s}:${c.id}" ${r > 0 ? "" : "disabled"} title="${esc(c.name)} — ${GRADES[gradeOf(c)].name}">${tCardHTML(c.id, { w: 104 })}<small>${meta}</small></button>`;
      };
      el.innerHTML = `<div class="tp-bar">
          ${[["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]].map(([k, l]) => `<button type="button" class="chip${P.type === k ? " on" : ""}" data-pt="${s}:type:${k}">${l}</button>`).join("")}
          <select data-pg="${s}" aria-label="등급"><option value="">모든 등급</option>${GRADE_IDS.map(g => `<option value="${g}"${P.grade === g ? " selected" : ""}>${GRADES[g].name}</option>`).join("")}</select>
          <input type="search" data-pq="${s}" placeholder="${P.src === "mine" ? "내 카드 찾기" : "모든 카드에서 찾기"}" value="${esc(P.q)}" autocomplete="off">
        </div>
        <div class="tp-grid">${shown.map(tile).join("") || `<p class="t-none">${P.src === "mine" ? "거래에 걸 수 있는 카드가 없습니다." : "찾는 카드가 없습니다."}</p>`}
          ${list.length > shown.length ? `<button type="button" class="btn xs tp-more" data-more="${s}">${list.length - shown.length}장 더 보기</button>` : ""}</div>`;
      const g = el.querySelector(".tp-grid"); if (g) g.scrollTop = keep;
    };
    const sum = () => {
      const el = box.querySelector("#tco-sum"); if (!el) return;
      const go = box.querySelector("#tco-go");
      let msg = "", ok = true;
      if (mode === "new") {
        msg = `내놓음 <b>${esc(TA.text(S.give))}</b> ⇄ ${S.kind === "auction" ? `경매 시작가 <b>${fmtGold(S.want.shards)}</b>${TA.n(S.want) ? " + 꼭 함께 " + esc(TA.text({ cards: S.want.cards, shards: 0 })) : ""}` : S.open ? "<b>조건 없이 제안 받기</b>" : `원함 <b>${esc(TA.text(S.want))}</b>`} · 기한 ${TRADE.durations.find(d => d[0] === S.minutes)[1]}`;
        if (TA.empty(S.give)) ok = false;
        if (S.kind === "auction" && (!TA.n(S.give) || S.want.shards < TRADE.minStart)) ok = false;
      } else {
        msg = `맡김 <b>${esc(TA.text(S.give))}</b>${L.kind === "offer" && !L.openWant ? (TA.covers(S.give, L.want) ? ' · <b class="ok">조건 충족</b>' : ' · <b class="warn">다른 제안</b>') : ""}`;
        if (TA.empty(S.give)) ok = false;
        if (L.kind === "auction" && S.give.shards < L.minBid) ok = false;
        const ck = box.querySelector("#tco-check");
        if (ck) ck.innerHTML = TA.ids(L.want).map(id => { const has = (S.give.cards[id] || 0) >= L.want.cards[id]; return `<span class="${has ? "ok" : "no"}">${has ? "✓" : "✗"} 「${esc(CARDS[id].name)}」${L.want.cards[id] > 1 ? " ×" + L.want.cards[id] : ""}</span>`; }).join("") + (L.want.shards ? `<span class="${S.give.shards >= L.want.shards ? "ok" : "no"}">${S.give.shards >= L.want.shards ? "✓" : "✗"} ${fmtGold(L.want.shards)}</span>` : "");
      }
      const e = Store.escrowCheck(u, S.give); if (e) { msg += ` · <b class="bad">${esc(e)}</b>`; ok = false; }
      el.innerHTML = msg; if (go) go.disabled = !ok;
    };
    w.box.addEventListener("click", async e => {
      const t = e.target;
      const k = t.closest("[data-kind]"); if (k) { S.kind = k.dataset.kind; if (S.kind === "auction" && S.want.shards < TRADE.minStart) S.want.shards = 100; draw(); return; }
      const m = t.closest("[data-min]"); if (m) { S.minutes = +m.dataset.min; for (const b of box.querySelectorAll("[data-min]")) b.classList.toggle("on", b === m); sum(); return; }
      const p = t.closest("[data-pick]");
      if (p) {
        const [s, id] = p.dataset.pick.split(":"), a = S[s];
        if (TA.n(a) >= TRADE.maxCards) { toast(`한쪽에 카드는 ${TRADE.maxCards}장까지입니다.`, "warn"); return; }
        if (room(s, id) <= 0) return;
        if (s === "want" && S.give.cards[id]) { toast("내놓는 카드와 같은 카드는 원할 수 없습니다.", "warn"); return; }
        if (s === "give" && S.want.cards[id]) { toast("원하는 카드와 같은 카드는 내놓을 수 없습니다.", "warn"); return; }
        a.cards[id] = (a.cards[id] || 0) + 1; if (s === "want") S.open = false;
        slots(s); pick(s); sum(); return;
      }
      const un = t.closest("[data-unpick]");
      if (un) { const [s, id] = un.dataset.unpick.split(":"); const a = S[s]; if (lockCards[id] && s === "give" && a.cards[id] <= lockCards[id]) return; a.cards[id]--; if (!a.cards[id]) delete a.cards[id]; slots(s); pick(s); sum(); return; }
      const ad = t.closest("[data-add]");
      if (ad) { const [s, n] = ad.dataset.add.split(":"); S[s].shards = Math.min(TRADE.maxShards, (S[s].shards || 0) + +n); const inp = box.querySelector("#tco-sh-" + s); if (inp) inp.value = S[s].shards; sum(); return; }
      const pt = t.closest("[data-pt]"); if (pt) { const [s, key, v] = pt.dataset.pt.split(":"); (s === "give" ? S.pg : S.pw)[key] = v; pick(s); return; }
      const mo = t.closest("[data-more]"); if (mo) { const P = mo.dataset.more === "give" ? S.pg : S.pw; P.lim += 60; pick(mo.dataset.more); return; }
      const cd = t.closest(".tco-slots [data-tcard]"); if (cd && !t.closest("button")) { showCardModal(CARDS[cd.dataset.tcard]); return; }
      if (t.closest("#tco-open")) { S.open = !S.open; if (S.open) S.want = { cards: {}, shards: 0 }; draw(); return; }
      if (t.closest("#tco-go")) {
        const go = t.closest("#tco-go"); go.disabled = true;
        const r = mode === "new"
          ? await TradeAPI.create({ kind: S.kind, minutes: S.minutes, note: S.note, open: S.open, give: S.give, want: S.want })
          : await TradeAPI.offer(L.id, S.give);
        if (!r.ok) { toast(r.msg, "warn"); go.disabled = false; return; }
        done = true; resolve(true); w.close();
        toast(mode === "new" ? `거래 #${r.listing.id} — 올렸습니다. 맡긴 것은 교역소가 지킵니다.` : L.kind === "auction" ? `${fmtGold(S.give.shards)}으로 입찰했습니다.` : "참여했습니다. 기한까지 기다리거나 올린 사람이 고르면 성사됩니다.", "good");
        if (typeof FEEL !== "undefined") FEEL.play("coinHeads", .5);
        if (App.screen === "trade") { if (mode === "new") TradeUI.tab = "mine"; tradeRender(); }
      }
    });
    w.box.addEventListener("input", e => {
      const t = e.target;
      if (t.id && t.id.startsWith("tco-sh-")) {
        const s = t.id.slice(7); S[s].shards = Math.max(0, Math.min(TRADE.maxShards, Math.floor(+t.value || 0)));
        if (s === "want" && S.open && S.want.shards) { S.open = false; const c = box.querySelector("#tco-open"); if (c) c.checked = false; slots("want"); }
        sum(); return;
      }
      if (t.id === "tco-note") { S.note = t.value; return; }
      if (t.dataset.pq) { const s = t.dataset.pq; (s === "give" ? S.pg : S.pw).q = t.value; clearTimeout(S._qt); S._qt = setTimeout(() => { pick(s); const inp = box.querySelector(`[data-pq="${s}"]`); if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } }, 160); }
    });
    w.box.addEventListener("change", e => { const t = e.target; if (t.dataset.pg) { (t.dataset.pg === "give" ? S.pg : S.pw).grade = t.value; pick(t.dataset.pg); } });
    draw();
  });
}

/* ---------- 실시간 거래 ---------- */
const TL_UI = { pg: { src: "mine", type: "all", grade: "", q: "", lim: 48 } };
function tradeLiveView(box) {
  const T = TradeLive, u = Store.user(), block = Store.tradeBlock(u);
  T.onChange = () => { if (App.screen === "trade" && TradeUI.tab === "live" && $("#trade-main")) { tradeLiveView($("#trade-main")); tradeSide(); } };
  const status = { idle: "", connecting: "잇는 중…", wait: "상대를 기다리는 중", open: "이어짐", closed: "끊김" }[T.state];
  if (T.state === "idle" || T.state === "connecting" || T.state === "closed" || T.state === "wait") {
    box.innerHTML = `${tHead("LINDEAR EXCHANGE · LIVE", "실시간 거래", status)}
      ${T.err ? `<p class="t-err">${esc(T.err)}</p>` : ""}
      ${block ? `<p class="t-block">${esc(block)}</p>` : `<div class="tl-gate">
        <div class="tl-door">
          <h3>방 만들기</h3>
          ${T.state === "wait" ? `<p>친구에게 이 코드를 알려 주세요.</p><b class="tl-code">${esc(T.code)}</b><p class="muted small">친구가 들어오면 거래 창이 열립니다.</p><button type="button" class="btn" data-live="leave">방 닫기</button>`
            : `<p>방을 열고 코드를 친구에게 알려 줍니다.</p><button type="button" class="btn primary" data-live="host" ${T.state === "connecting" ? "disabled" : ""}>방 만들기</button>`}
        </div>
        <div class="tl-door">
          <h3>코드로 들어가기</h3>
          <p>친구가 알려 준 다섯 글자</p>
          <input id="tl-join-code" class="tl-code-in" maxlength="5" placeholder="ABCDE" autocomplete="off" ${T.state === "wait" ? "disabled" : ""}>
          <button type="button" class="btn primary alt" data-live="join" ${T.state === "connecting" || T.state === "wait" ? "disabled" : ""}>들어가기</button>
        </div>
      </div>`}
      <ol class="tl-how">
        <li>양쪽이 거래 창에 카드 · 조각을 놓습니다. 놓은 것은 상대 화면에 바로 보입니다.</li>
        <li>둘 다 <b>확인</b>을 누르면 <b>교환</b> 단추가 열립니다. 어느 쪽이든 놓은 것을 바꾸면 확인이 풀립니다.</li>
        <li>둘 다 <b>교환</b>을 누르면 맞바꿉니다. 받은 카드는 덱 조정실에 NEW로 나옵니다.</li>
      </ol>
      <p class="t-note">지금은 서버 없이 두 기기를 바로 잇습니다(온라인 대전과 같은 방식, 인터넷 필요). 각 기기가 자기 쪽을 반영하는 친선 거래입니다. 같은 컴퓨터에서 시험하려면 주소 끝에 <code>#local</code>을 붙이고 두 탭에서 여세요.</p>`;
  } else {
    const myLock = T.myLock(), foeLock = T.foeLock(), myGo = T.myGo(), foeGo = T.foeGo(), both = myLock && foeLock;
    const lamp = (on, txt) => `<span class="tl-lamp${on ? " on" : ""}">${txt}</span>`;
    box.innerHTML = `${tHead("LINDEAR EXCHANGE · LIVE", "실시간 거래", `방 ${esc(T.code)} · ${status}`, `<button type="button" class="btn xs danger" data-live="leave">거래 방 나가기</button>`)}
      ${T.err ? `<p class="t-err">${esc(T.err)}</p>` : ""}
      ${T.flash ? `<div class="tl-flash"><b>교환 완료</b> 내줌 ${esc(TA.text(T.flash.give))} · 받음 ${esc(TA.text(T.flash.get))}${T.flash.over && T.flash.over.length ? ` (최대 장수를 넘은 카드는 ${fmtGold(T.flash.extra)}으로)` : ""}</div>` : ""}
      <div class="tl-table">
        <section class="tl-side me${myLock ? " locked" : ""}">
          <h4 class="panel-title">나 <small>${esc(u.id)}</small>${lamp(myLock, myLock ? "확인함" : "확인 전")}${myGo ? lamp(true, "교환 누름") : ""}</h4>
          <div class="tl-offer">${TA.ids(T.me.offer).map(id => tCardHTML(id, { w: 170, n: T.me.offer.cards[id], x: "live" })).join("") || '<p class="t-none">아래 내 카드에서 눌러 놓으세요.</p>'}</div>
          <div class="tco-shards"><span class="sf-label">조각</span><input type="number" min="0" step="10" id="tl-sh" value="${T.me.offer.shards || ""}" placeholder="0">${[10, 100, 1000].map(n => `<button type="button" class="btn xs" data-ladd="${n}">+${n}</button>`).join("")}<span class="muted small">지갑 ${fmtGold(Store.gold(u))}</span></div>
        </section>
        <div class="td-arrow" aria-hidden="true">${tIcon("trade")}</div>
        <section class="tl-side foe${foeLock ? " locked" : ""}">
          <h4 class="panel-title">${esc(T.foe.name || "상대")} <small>${T.foe.lv ? "Lv " + T.foe.lv : ""}</small>${lamp(foeLock, foeLock ? "확인함" : "확인 전")}${foeGo ? lamp(true, "교환 누름") : ""}</h4>
          <div class="tl-offer">${tAssetsHTML(T.foe.offer, { w: 170, none: "상대가 아직 놓지 않았습니다." })}</div>
        </section>
      </div>
      <div class="tl-acts">
        <button type="button" class="btn${myLock ? " on" : ""}" data-live="lock">${myLock ? "확인 풀기" : "확인 (이대로 좋음)"}</button>
        <button type="button" class="btn primary" data-live="go" ${both && !myGo ? "" : "disabled"} title="${both ? "둘 다 교환을 누르면 맞바꿉니다" : "둘 다 확인해야 열립니다"}">${myGo ? "상대의 교환을 기다리는 중" : "교환"}</button>
      </div>
      <h4 class="panel-title">내 카드 <small>거래에 걸 수 있는 카드</small></h4>
      <div class="tco-pick" id="tl-pick"></div>`;
    tlPick();
  }
  box.onclick = async e => {
    const b = e.target.closest("[data-live]");
    if (b) {
      const a = b.dataset.live;
      if (a === "host") await T.host();
      if (a === "join") await T.join(($("#tl-join-code") || {}).value);
      if (a === "leave") T.leave();
      if (a === "lock") T.lock(!T.myLock());
      if (a === "go") T.go();
      return;
    }
    const p = e.target.closest("[data-pick]");
    if (p) { const id = p.dataset.pick.split(":")[1], o = TA.clean(T.me.offer); if (TA.n(o) >= TRADE.maxCards) { toast(`카드는 ${TRADE.maxCards}장까지입니다.`, "warn"); return; } if (Store.tradeable(u, id) - (o.cards[id] || 0) <= 0) return; o.cards[id] = (o.cards[id] || 0) + 1; T.put(o); return; }
    const un = e.target.closest("[data-unpick]");
    if (un) { const id = un.dataset.unpick.split(":")[1], o = TA.clean(T.me.offer); o.cards[id]--; T.put(o); return; }
    const ad = e.target.closest("[data-ladd]"); if (ad) { const o = TA.clean(T.me.offer); o.shards = Math.min(TRADE.maxShards, o.shards + +ad.dataset.ladd); T.put(o); return; }
    const pt = e.target.closest("[data-pt]"); if (pt) { TL_UI.pg.type = pt.dataset.pt.split(":")[2]; tlPick(); return; }
    const mo = e.target.closest("[data-more]"); if (mo) { TL_UI.pg.lim += 48; tlPick(); return; }
  };
  box.onchange = e => {
    if (e.target.id === "tl-sh") { const o = TA.clean(T.me.offer); o.shards = Math.max(0, Math.floor(+e.target.value || 0)); T.put(o); }
    if (e.target.dataset && e.target.dataset.pg) { TL_UI.pg.grade = e.target.value; tlPick(); }
  };
  box.oninput = e => { if (e.target.dataset && e.target.dataset.pq) { TL_UI.pg.q = e.target.value; clearTimeout(TL_UI._qt); TL_UI._qt = setTimeout(() => { tlPick(); const i = $('#tl-pick [data-pq]'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 160); } };
  box.onkeydown = e => { if (e.target.id === "tl-join-code" && e.key === "Enter") T.join(e.target.value); };
}
function tlPick() {
  const el = $("#tl-pick"); if (!el) return;
  const u = Store.user(), P = TL_UI.pg, o = TradeLive.me.offer;
  let list = Object.keys(u.collection || {}).filter(id => CARDS[id] && Store.tradeable(u, id) > 0).map(id => CARDS[id]);
  if (P.type === "unit") list = list.filter(c => c.type === "unit");
  if (P.type === "spell") list = list.filter(c => isSpellType(c.type));
  if (P.type === "item") list = list.filter(c => c.type === "item");
  if (P.grade) list = list.filter(c => gradeOf(c) === P.grade);
  const q = P.q.trim().toLowerCase(); if (q) list = list.filter(c => c.name.toLowerCase().includes(q));
  list.sort((a, b) => GRADES[gradeOf(b)].rank - GRADES[gradeOf(a)].rank || a.lv - b.lv || a.id.localeCompare(b.id));
  const shown = list.slice(0, P.lim), keep = el.querySelector(".tp-grid") ? el.querySelector(".tp-grid").scrollTop : 0;
  el.innerHTML = `<div class="tp-bar">${[["all", "전체"], ["unit", "유닛"], ["spell", "마법"], ["item", "아이템"]].map(([k, l]) => `<button type="button" class="chip${P.type === k ? " on" : ""}" data-pt="live:type:${k}">${l}</button>`).join("")}
      <select data-pg="live" aria-label="등급"><option value="">모든 등급</option>${GRADE_IDS.map(g => `<option value="${g}"${P.grade === g ? " selected" : ""}>${GRADES[g].name}</option>`).join("")}</select>
      <input type="search" data-pq="live" placeholder="내 카드 찾기" value="${esc(P.q)}" autocomplete="off"></div>
    <div class="tp-grid">${shown.map(c => { const r = Store.tradeable(u, c.id) - (o.cards[c.id] || 0); return `<button type="button" class="tp-card${r > 0 ? "" : " off"}" data-pick="live:${c.id}" ${r > 0 ? "" : "disabled"}>${tCardHTML(c.id, { w: 104 })}<small>거래 가능 <b>${Math.max(0, r)}</b></small></button>`; }).join("") || '<p class="t-none">거래에 걸 수 있는 카드가 없습니다. 덱에 든 카드는 걸 수 없습니다.</p>'}
      ${list.length > shown.length ? `<button type="button" class="btn xs tp-more" data-more="live">${list.length - shown.length}장 더 보기</button>` : ""}</div>`;
  const g = el.querySelector(".tp-grid"); if (g) g.scrollTop = keep;
}

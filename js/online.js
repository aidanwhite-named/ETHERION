/* ETHERION v3.10 — 온라인 대전 (친구와 두 기기에서)
   - 서버 없이 두 브라우저를 바로 잇는다(WebRTC). 처음 서로를 찾는 일만 PeerJS의 공개 중계(0.peerjs.com)를 빌린다.
     PeerJS 스크립트는 처음 온라인 대전을 열 때 CDN에서 받는다 — 인터넷이 있어야 한다.
   - 방을 만든 쪽(host)이 0번, 들어온 쪽(guest)이 1번 플레이어. 두 기기는 같은 시드로 같은 판을 계산하고(js/game.js GRand · shuffleG),
     서로 '둔 수'만 주고받는다: 준비 단계의 행동(act) · 준비 완료(ready) · 멀리건(mull) · 코인 다시 던지기(coin).
   - 받은 수는 도착한 차례대로 줄(q)에 쌓였다가 그 수를 기다리는 곳(상대 준비 · 멀리건 · 코인 창)이 하나씩 꺼낸다.
     항복 · 나가기 · 한 번 더 · 점검(sum)은 줄을 거치지 않고 바로 처리한다.
   - 턴마다 판의 요약(sum)을 맞대어, 두 기기의 판이 달라지면 알려 준다.
   - 시험: 주소 끝에 #local 을 붙이면 같은 컴퓨터의 두 탭끼리 BroadcastChannel로 잇는다(인터넷 없이). */
"use strict";

const ONLINE_VER = "3.10";
const PEER_PREFIX = "etherion-v310-";
const PEER_SRC = ["https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js", "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js"];
const ROOM_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";   // 헷갈리는 글자(0 O 1 I L) 뺌
const ACT_FNS = ["actPlace", "actEquip", "actCrystal", "actBurnHand", "actBurnField", "actMove", "actShuffle"];

/* 내 쪽에서 둔 행동은 상대에게도 보낸다. 상대가 보낸 행동은 원래 함수(ORIG)로 둔다 */
const ORIG_ACT = {};
for (const name of ACT_FNS) {
  const f = window[name]; ORIG_ACT[name] = f;
  window[name] = function (p, ...a) {
    const r = f(p, ...a);
    if (r && typeof G !== "undefined" && G && G.online && p && p.idx === G.me && !Online.applying) Online.send({ t: "act", fn: name, a });
    return r;
  };
}

const Online = {
  peer: null, conn: null, role: null, code: "", deck: null, foeDeck: null, foeName: "",
  q: [], waiters: [], applying: false, wantAgain: false, foeAgain: false, sums: {}, warned: false,
  ui: null, lastSeed: 0,

  local() { return /#local\b/.test(location.hash); },
  sig() {   // 카드 데이터가 같은지 (두 사람의 게임 파일 버전이 다르면 판이 어긋난다)
    const s = ONLINE_VER + JSON.stringify(RULES) + JSON.stringify(CARDS);
    let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  },
  newCode() { let c = ""; for (let i = 0; i < 5; i++) c += ROOM_ABC[Math.floor(Math.random() * ROOM_ABC.length)]; return c; },

  /* ---------- 잇기 ---------- */
  loadPeer() {
    if (window.Peer) return Promise.resolve(window.Peer);
    if (this._loading) return this._loading;
    const tryOne = i => new Promise((res, rej) => {
      if (i >= PEER_SRC.length) { rej(new Error("load")); return; }
      const s = document.createElement("script"); s.src = PEER_SRC[i]; s.async = true;
      s.onload = () => (window.Peer ? res(window.Peer) : tryOne(i + 1).then(res, rej));
      s.onerror = () => { s.remove(); tryOne(i + 1).then(res, rej); };
      document.head.appendChild(s);
    });
    this._loading = tryOne(0).catch(e => { this._loading = null; throw e; });
    return this._loading;
  },
  /* host: 방을 열고 기다린다. onStatus(text)로 상태를 알린다 */
  async host(deck, onStatus) {
    this.reset(); this.role = "host"; this.deck = deck;
    if (this.local()) { this.code = this.newCode(); this.openLocal(); onStatus("ready"); return this.code; }
    const Peer = await this.loadPeer();
    for (let tries = 0; tries < 4; tries++) {
      const code = this.newCode();
      const ok = await new Promise(res => {
        const peer = new Peer(PEER_PREFIX + code, { debug: 0 });
        peer.on("open", () => { this.peer = peer; this.code = code; res(true); });
        peer.on("error", e => {
          if (!this.peer) { peer.destroy(); res(e && e.type === "unavailable-id" ? false : e); return; }
          this.peerError(e);
        });
        peer.on("connection", c => {
          if (this.conn && this.conn.open) { c.on("open", () => { c.send({ t: "deny", why: "이 방에는 이미 상대가 있습니다." }); setTimeout(() => c.close(), 300); }); return; }
          this.bind(c);
        });
        peer.on("disconnected", () => { if (this.peer === peer && !peer.destroyed) try { peer.reconnect(); } catch (e) {} });
      });
      if (ok === true) { onStatus("ready"); return this.code; }
      if (ok !== false) throw ok;
    }
    throw new Error("code");
  },
  /* guest: 코드로 방에 들어간다 */
  async join(code, deck) {
    this.reset(); this.role = "guest"; this.deck = deck; this.code = code;
    if (this.local()) { this.openLocal(); this.send({ t: "hello", v: ONLINE_VER, sig: this.sig(), deck }); return; }
    const Peer = await this.loadPeer();
    await new Promise((res, rej) => {
      const peer = new Peer({ debug: 0 }); this.peer = peer;
      let opened = false;
      peer.on("open", () => {
        const c = peer.connect(PEER_PREFIX + code, { reliable: true, serialization: "json" });
        this.bind(c, () => { opened = true; this.send({ t: "hello", v: ONLINE_VER, sig: this.sig(), deck }); res(); });
        setTimeout(() => { if (!opened) rej(new Error("timeout")); }, 15000);
      });
      peer.on("error", e => { if (!opened) rej(e); else this.peerError(e); });
    });
  },
  bind(c, onOpen) {
    c.on("open", () => { this.conn = c; if (onOpen) onOpen(); });
    c.on("data", m => this.recv(m));
    c.on("close", () => { if (this.conn === c) this.lost(); });
    c.on("error", () => {});
  },
  /* 시험용: 같은 컴퓨터의 두 탭 */
  openLocal() {
    const me = Math.random().toString(36).slice(2);
    const bc = new BroadcastChannel("etherion-room-" + this.code);
    let other = null;
    bc.onmessage = e => {
      const { from, m } = e.data || {};
      if (from === me) return;
      if (!other) other = from;
      if (from !== other) return;
      if (m && m.t === "__close") { this.lost(); return; }
      this.recv(m);
    };
    this.conn = { open: true, local: true, send: m => bc.postMessage({ from: me, m: JSON.parse(JSON.stringify(m)) }), close: () => { try { bc.postMessage({ from: me, m: { t: "__close" } }); } catch (e) {} bc.close(); } };
  },
  peerError(e) { console.warn("[online] peer", e && e.type, e); },
  send(m) { try { if (this.conn && this.conn.open !== false) this.conn.send(m); } catch (e) { console.warn("[online] send", e); } },
  reset() {
    this.close();
    Object.assign(this, { role: null, code: "", foeDeck: null, foeName: "", q: [], waiters: [], wantAgain: false, foeAgain: false, sums: {}, warned: false, byeSeen: false });
  },
  close() {
    const c = this.conn, p = this.peer; this.conn = null; this.peer = null;
    try { if (c) c.close(); } catch (e) {}
    try { if (p) p.destroy(); } catch (e) {}
    this.flush();
  },
  /* 경기를 떠날 때 (대기실로) */
  leave() { this.send({ t: "bye" }); setTimeout(() => this.reset(), 150); },

  /* ---------- 받기 ---------- */
  recv(m) {
    if (!m || typeof m !== "object") return;
    switch (m.t) {
      case "hello": return this.onHello(m);
      case "start": return this.onStart(m);
      case "deny": toast(m.why || "들어갈 수 없습니다.", "warn"); if (this.ui) this.ui.fail(m.why); this.reset(); return;
      case "surrender": return this.foeGone(`${this.foeName || "상대"}이(가) 항복했습니다.`);
      case "bye":
        this.foeAgain = false; this.byeSeen = true;
        if (this.inMatch() && G.phase !== "over") this.foeGone(`${this.foeName || "상대"}이(가) 경기를 떠났습니다.`);
        else if (this.ui) this.ui.fail("상대가 나갔습니다.");
        else toast(`${this.foeName || "상대"}이(가) 대기실로 돌아갔습니다.`, "warn");
        return;
      case "again": this.foeAgain = true; toast(`${this.foeName || "상대"}이(가) 한 번 더 하자고 합니다.`, "good"); this.tryAgain(); return;
      case "sum": return this.onSum(m);
    }
    this.q.push(m);
    if (this.waiters.length) this.waiters.shift()(this.q.shift());
  },
  /* 줄에서 다음 수를 꺼낸다. 경기가 끝나면 null */
  next(type) {
    if (this.q.length) {
      const m = this.q.shift();
      if (type && m.t !== type) this.desync(`expected ${type}, got ${m.t}`);
      return Promise.resolve(m);
    }
    if (!this.inMatch() || G.phase === "over") return Promise.resolve(null);
    return new Promise(res => this.waiters.push(m => { if (m && type && m.t !== type) this.desync(`expected ${type}, got ${m.t}`); res(m); }));
  },
  flush() { const w = this.waiters; this.waiters = []; for (const f of w) f(null); },
  inMatch() { return typeof G !== "undefined" && !!G && !!G.online; },
  lost() {
    this.conn = null;
    if (this.inMatch() && G.phase !== "over") this.foeGone("상대와 연결이 끊어졌습니다.");
    else if (this.ui) this.ui.fail("연결이 끊어졌습니다.");
    else if (this.inMatch() && !this.byeSeen) toast("상대와 연결이 끊어졌습니다.", "warn");
    this.foeAgain = false;
  },
  foeGone(reason) {
    if (!this.inMatch() || G.phase === "over") return;
    G.winner = G.me; G.reason = reason; G.phase = "over";
    log(`◆ ${reason}`, "turn");
    const mb = document.querySelector(".mull-modal .modal-btns .btn"); if (mb) mb.click();   // 멀리건 창은 '그대로 시작'으로 닫는다
    if (G.ready) { const r = G.ready; G.ready = null; G.control = null; r(); }
    this.flush();
    render();
  },

  /* ---------- 경기 시작 ---------- */
  onHello(m) {
    if (this.role !== "host") return;
    if (m.v !== ONLINE_VER || m.sig !== this.sig()) {
      this.send({ t: "deny", why: "두 사람의 게임 버전이 다릅니다. 같은 ETHERION 폴더(같은 버전)로 해 주세요." });
      if (this.ui) this.ui.status("상대의 게임 버전이 달라 들어오지 못했습니다. 기다리는 중…");
      setTimeout(() => { if (this.conn && !this.conn.local) { const c = this.conn; this.conn = null; c.close(); } }, 400);
      return;
    }
    if (!this.validDeck(m.deck)) { this.send({ t: "deny", why: "덱을 읽을 수 없습니다." }); return; }
    this.foeDeck = m.deck;
    this.startNew();
  },
  startNew() {
    const seed = (Math.random() * 4294967296) >>> 0;
    const decks = [this.deck, this.foeDeck];
    this.send({ t: "start", seed, decks, v: ONLINE_VER });
    this.begin(seed, decks);
  },
  onStart(m) {
    if (this.role !== "guest") return;
    this.begin(m.seed, m.decks);
  },
  validDeck(d) { return d && typeof d === "object" && GROUPS[d.group] && d.cards && Object.keys(d.cards).every(id => CARDS[id]); },
  begin(seed, decks) {
    this.me = this.role === "host" ? 0 : 1;
    this.foeName = decks[1 - this.me].name;
    this.q = []; this.waiters = []; this.sums = {}; this.wantAgain = this.foeAgain = false; this.warned = false; this.lastSeed = seed;
    if (this.ui) { this.ui.close(); this.ui = null; }
    document.querySelectorAll(".result, .modal-wrap").forEach(e => e.remove());
    const name = (d, i) => String(d.name || (i ? "도전자" : "방장")).slice(0, 16);
    const p0 = { name: name(decks[0], 0), group: decks[0].group, cards: decks[0].cards };
    const p1 = { name: name(decks[1], 1), group: decks[1].group, cards: decks[1].cards };
    if (p0.name === p1.name) p1.name += " ②";
    const cfg = { mode: "online", seed, me: this.me, p0, p1 };
    if (typeof App !== "undefined") { App.screen = "game"; if (typeof Bg !== "undefined") Bg.set("off"); }
    cfg.onExit = () => { if (typeof App !== "undefined") App.screen = null; if (typeof showLobby === "function") showLobby(); };
    startMatch(cfg);
    toast(`${this.foeName}와(과) 연결되었습니다. 행운을!`, "good");
  },

  /* ---------- 경기 중 ---------- */
  async mulligan(myG) {
    const me = G.players[G.me];
    G.viewer = G.me; render();
    const mine = await mulliganUI(me);
    if (G !== myG || G.phase === "over") return;
    this.send({ t: "mull", uids: mine });
    if (!this.q.length) toast("상대가 시작 핸드를 고르는 중…", "");
    const m = await this.next("mull");
    if (G !== myG || !m || G.phase === "over") return;
    // 두 사람 것을 0번 → 1번 차례로 (덱 섞기 난수의 차례를 맞춘다)
    for (const p of G.players) { const u = p.idx === G.me ? mine : (m.uids || []); if (u.length) actMulligan(p, u); }
    if (mine.length) toast(`${mine.length}장을 새로 뽑았습니다.`, "good");
    render();
  },
  async remotePrep(p) {
    const myG = G;
    G.control = null; G.sel = null; render();
    for (;;) {
      const m = await this.next();
      if (!m || G !== myG || G.phase === "over") return;
      if (m.t === "ready") return;
      if (m.t !== "act") { this.desync("prep got " + m.t); continue; }
      this.apply(p, m);
      render();
      await wait(140);
      if (G !== myG) return;
    }
  },
  apply(p, m) {
    if (m.fn === "order") {
      const by = new Map(p.hand.map(x => [x.uid, x])), nh = (m.a[0] || []).map(u => by.get(u)).filter(Boolean);
      if (nh.length === p.hand.length) p.hand = nh; else this.desync("order");
      return;
    }
    const f = ORIG_ACT[m.fn]; if (!f) { this.desync("fn " + m.fn); return; }
    this.applying = true;
    let ok = false;
    try { ok = f(p, ...(m.a || [])); } catch (e) { console.error(e); } finally { this.applying = false; }
    if (!ok) this.desync(`${m.fn}(${JSON.stringify(m.a)}) 실패`);
  },
  /* 판 요약: 두 기기가 같은 판을 보고 있는지 */
  digest() {
    const s = JSON.stringify([G.turn, G.attacker, UID, G.players.map(p => [p.life, p.deck, p.hand.map(x => x.uid + ":" + x.id), p.field.map(x => (x ? x.uid + ":" + x.id + ":" + (x.item ? x.item.id : "") : 0)), p.crystals, p.burn.length, p.reload, p.bonus || 0])]);
    let h = 5381; for (let i = 0; i < s.length; i++) h = (h * 33 + s.charCodeAt(i)) >>> 0;
    return h;
  },
  checkTurn() {
    if (!this.inMatch() || G.phase === "over") return;
    const h = this.digest(), k = G.turn;
    this.sums[k] = Object.assign(this.sums[k] || {}, { mine: h });
    this.send({ t: "sum", turn: k, h });
    this.cmpSum(k);
  },
  onSum(m) { this.sums[m.turn] = Object.assign(this.sums[m.turn] || {}, { theirs: m.h }); this.cmpSum(m.turn); },
  cmpSum(k) { const s = this.sums[k]; if (s && s.mine != null && s.theirs != null && s.mine !== s.theirs) this.desync("turn " + k + " sum"); },
  desync(why) {
    console.warn("[online] 판이 어긋남:", why);
    if (this.warned) return; this.warned = true;
    toast("두 기기의 판이 어긋났습니다. 이 판은 정확하지 않을 수 있어요 — 끝나면 다시 시작해 주세요.", "warn");
  },

  /* ---------- 한 번 더 ---------- */
  rematch() {
    if (!this.conn) { toast("상대와 연결이 끊어져 있습니다. 대기실에서 다시 방을 만들어 주세요.", "warn"); return; }
    this.wantAgain = true; this.send({ t: "again" });
    toast(this.foeAgain ? "새 판을 시작합니다." : `${this.foeName || "상대"}에게 한 번 더를 청했습니다. 상대도 누르면 시작합니다.`, "good");
    this.tryAgain();
  },
  tryAgain() { if (this.role === "host" && this.wantAgain && this.foeAgain && this.foeDeck) this.startNew(); }
};

/* 턴이 시작될 때마다 판 요약을 맞댄다 */
(() => {
  const bt = window.beginTurn;
  window.beginTurn = function () { const r = bt.apply(this, arguments); if (typeof G !== "undefined" && G && G.online) Online.checkTurn(); return r; };
})();

/* ---------- 대기실 창 ---------- */
async function startOnline(f) {
  const u = Store.user();
  if (!Store.deckPlayable(u, f)) { toast("저장된 40장 덱이 있어야 대전할 수 있습니다.", "warn"); return; }
  const deck = { name: u.id, group: f, cards: Store.deck(u, f).cards };
  const v = await modal(`<h3>온라인 대전</h3>
    <p class="muted">친구와 각자의 컴퓨터에서 겨룹니다. 한 사람이 방을 만들고, 받은 <b>방 코드</b>를 친구에게 알려 주세요. 덱은 지금 고른 <b>${esc(GROUPS[f].name)}</b> 덱을 씁니다.</p>
    <div class="ol-choose">
      <button type="button" class="ol-pick" data-v="host"><b>방 만들기</b><span>코드를 받아 친구를 기다립니다</span></button>
      <div class="ol-pick ol-join"><b>방 들어가기</b><span>친구에게 받은 코드</span><input id="ol-code" maxlength="5" placeholder="ABCDE" autocomplete="off" spellcheck="false"><button type="button" class="btn primary" data-v="join">들어가기</button></div>
    </div>
    <p class="ol-note">인터넷이 필요합니다. 두 사람 모두 <b>같은 버전의 ETHERION</b>이어야 합니다.${Online.local() ? " <b>· 시험 모드(#local): 같은 컴퓨터의 두 탭</b>" : ""}</p>`,
    [{ label: "취소", value: false }], { cls: "ol-modal", onOpen: w => {
      const inp = w.querySelector("#ol-code");
      inp.addEventListener("input", () => { inp.value = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); });
      inp.addEventListener("keydown", e => { if (e.key === "Enter") w.querySelector('[data-v="join"]').click(); });
      w.addEventListener("click", e => {
        const b = e.target.closest("[data-v]"); if (!b) return;
        const code = inp.value.trim();
        if (b.dataset.v === "join" && code.length < 5) { toast("다섯 글자 방 코드를 넣어 주세요.", "warn"); inp.focus(); return; }
        w.remove(); (b.dataset.v === "host" ? onlineHostUI : onlineJoinUI)(deck, code);
      });
    } });
  if (v === false) return;
}
/* 기다리는 창: 상태 글을 바꾸고, 경기가 시작되면 닫힌다 */
function onlineWaitUI(title, body, onCancel) {
  const wrap = document.createElement("div");
  wrap.className = "modal-wrap";
  wrap.innerHTML = `<div class="modal ol-modal" role="dialog" aria-modal="true"><h3>${title}</h3>${body}<p class="ol-status"><i class="ol-spin"></i><span>연결하는 중…</span></p><div class="modal-btns"><button type="button" class="btn" data-x>취소</button></div></div>`;
  document.body.appendChild(wrap);
  const ui = {
    el: wrap,
    status(t) { const s = wrap.querySelector(".ol-status span"); if (s) s.textContent = t; },
    fail(t) { const s = wrap.querySelector(".ol-status"); if (s) { s.classList.add("bad"); s.innerHTML = `<span>${esc(t || "연결하지 못했습니다.")}</span>`; } wrap.querySelector("[data-x]").textContent = "닫기"; },
    close() { wrap.remove(); }
  };
  wrap.querySelector("[data-x]").addEventListener("click", () => { ui.close(); if (Online.ui === ui) Online.ui = null; onCancel(); });
  return ui;
}
async function onlineHostUI(deck) {
  const ui = onlineWaitUI("방 만들기", `<div class="ol-code-box"><span class="ol-code-label">방 코드</span><b class="ol-code">· · · · ·</b><button type="button" class="btn xs ghost ol-copy" disabled>복사</button></div>
    <p class="muted">이 코드를 친구에게 알려 주세요. 친구가 <b>대전 → 온라인 대전 → 방 들어가기</b>에 넣으면 바로 시작합니다.</p>`, () => Online.reset());
  Online.ui = ui;
  try {
    const code = await Online.host(deck, () => {});
    if (Online.ui !== ui) return;
    ui.el.querySelector(".ol-code").textContent = code;
    const cp = ui.el.querySelector(".ol-copy"); cp.disabled = false;
    cp.addEventListener("click", () => { try { navigator.clipboard.writeText(code).then(() => toast("방 코드를 복사했습니다.", "good"), () => {}); } catch (e) {} });
    ui.status("친구를 기다리는 중…");
  } catch (e) {
    console.warn(e);
    if (Online.ui === ui) ui.fail(e && e.message === "load" ? "온라인 연결 도구를 받지 못했습니다. 인터넷 연결을 확인해 주세요." : "방을 열지 못했습니다. 잠시 뒤 다시 해 주세요.");
  }
}
async function onlineJoinUI(deck, code) {
  const ui = onlineWaitUI("방 들어가기", `<div class="ol-code-box"><span class="ol-code-label">방 코드</span><b class="ol-code">${esc(code)}</b></div>`, () => Online.reset());
  Online.ui = ui;
  try {
    await Online.join(code, deck);
    if (Online.ui === ui) ui.status("연결되었습니다. 방장의 응답을 기다리는 중…");
  } catch (e) {
    console.warn(e);
    if (Online.ui !== ui) return;
    const t = e && e.type === "peer-unavailable" ? "그 코드의 방이 없습니다. 코드를 다시 확인해 주세요."
      : e && e.message === "load" ? "온라인 연결 도구를 받지 못했습니다. 인터넷 연결을 확인해 주세요."
      : e && e.message === "timeout" ? "방장과 연결하지 못했습니다. (네트워크가 막혀 있을 수 있어요)"
      : "연결하지 못했습니다. 잠시 뒤 다시 해 주세요.";
    ui.fail(t); Online.reset();
  }
}

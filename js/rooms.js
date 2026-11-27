/* ETHERION — 온라인 대전 방 (2026-11-26): 방 목록 → 방 대기실 → 대전
   서버 모드에서만 쓴다(방 목록 · 입장 · 준비 · 채팅은 서버 server/rooms.js가 맡는다 — POST /api/room).
   실제 대전은 예전처럼 두 기기가 PeerJS로 바로 잇는다(js/online.js). 방장이 시작을 누르면 Peer 코드를 열어 서버에 맡기고,
   도전자는 방 소식(long-poll)으로 그 코드를 받아 붙는다 — 번호를 사람이 주고받지 않는다.
   파일로 연 게임(서버 없음) · #local 시험은 예전 "번호로 직접 연결" 창(online.js onlineDirect)을 그대로 쓴다.

   - 방 목록 화면 showRooms(): 5초마다 다시 묻는다(새로고침 단추는 바로). 방 만들기 · 빠른 입장 · 비밀번호 방 입장.
   - 방 대기실 showRoom(): 왼쪽 = 나, 오른쪽 = 상대. 아이디 · 레벨 · 전적 · 깃발 · 덱 점수(평가) · 준비. 깃발 고르기, 채팅, 준비 · 시작 · 내보내기 · 나가기.
   - 깃발의 점수 = 덱 조정실의 덱 점수(js/grades.js deckScore)와 평가 S~D(DECK_TIERS). 서버가 저장된 덱으로 계산해 보낸다.
   - 이름 · 방 제목 · 채팅은 모두 esc()를 거쳐 넣는다. */
"use strict";

const Rooms = {
  flag: null, trial: false,          // 내가 고른 깃발 (trial = 친구 초대 체험 덱)
  room: null, list: [], total: 0,
  gen: 0, ctl: null, listTimer: 0, chatN: 0,
  starting: false, connecting: false, lastPeer: "", linkTimer: 0, busy: false,

  on() { return typeof Net !== "undefined" && Net.on && !!Net.token && !(typeof Online !== "undefined" && Online.local()); },
  api(a, body) { return Net.fetch("POST", "/api/room", Object.assign({ a }, body || {})); },
  inRoom() { return !!this.room; },
  me() { const u = Store.user(); return this.room && u ? this.room.members.find(m => m.id === u.id) : null; },
  foe() { const u = Store.user(); return this.room && u ? this.room.members.find(m => m.id !== u.id) : null; },
  amHost() { const u = Store.user(); return !!(this.room && u && this.room.host === u.id); },

  /* ---------- 내 깃발 ---------- */
  options(u) {   // 고를 수 있는 덱: 가진 깃발 가운데 저장된 덱이 있는 것 + 체험 덱
    const out = GROUP_IDS.filter(g => Store.ownsGroup(u, g) && Store.deckPlayable(u, g)).map(g => ({ g, trial: false, cards: Store.deck(u, g).cards, name: Store.deck(u, g).name }));
    const T = typeof trialDeckOf === "function" ? trialDeckOf(u) : null;
    if (T) out.push({ g: T.group, trial: true, cards: T.cards, name: "체험 덱 · " + T.name });
    return out;
  },
  pickDefault(u, f, trial) {
    const ops = this.options(u);
    const cur = ops.find(o => o.g === f && o.trial === !!trial) || ops.find(o => o.g === this.flag && o.trial === this.trial) || ops.find(o => o.g === f) || ops[0];
    if (!cur) return false;
    this.flag = cur.g; this.trial = cur.trial; return true;
  },
  deck() {   // 대전에 들고 갈 덱 (online.js가 상대에게 보낸다)
    const u = Store.user(), T = this.trial && typeof trialDeckOf === "function" ? trialDeckOf(u) : null;
    return { name: u.id, group: this.flag, cards: T ? T.cards : Store.deck(u, this.flag).cards, trial: !!T, rec: { w: (u.stats && u.stats.w) || 0, l: (u.stats && u.stats.l) || 0 } };
  },
  tier(flag, score) {
    if (!flag || score == null || typeof DECK_TIERS === "undefined" || !STARTER_DECKS[flag]) return "";
    const r = score / deckScore(STARTER_DECKS[flag]).total;
    return (DECK_TIERS.find(t => r >= t[0]) || DECK_TIERS[DECK_TIERS.length - 1])[1];
  },

  /* ---------- 들어가기 ---------- */
  async open(f, opts) {
    const u = Store.user(); if (!u) return;
    if (!this.pickDefault(u, f, opts && opts.trial)) { toast(`저장된 ${RULES.deckSize}장 덱이 있어야 대전할 수 있습니다.`, "warn"); return; }
    showRooms();
  },
  stopList() { clearInterval(this.listTimer); this.listTimer = 0; },
  async refresh(manual) {
    const r = await this.api("list");
    if (App.screen !== "rooms") return;
    if (!r || !r.ok) { if (manual || !this.list.length) this.paintList(r && r.msg ? r.msg : "방 목록을 받지 못했습니다."); return; }
    this.list = r.rooms || []; this.total = r.total || this.list.length;
    if (r.mine && !this.room && !this.busy) {   // 새로 고침 · 다른 화면에 다녀온 뒤: 있던 방으로 돌아간다
      const j = await this.api("join", { id: r.mine, flag: this.flag, trial: this.trial });
      if (j && j.ok && j.room && App.screen === "rooms") return this.enter(j.room);
    }
    this.paintList();
  },
  enter(room) {
    this.stopList();
    this.room = room; this.chatN = 0; this.starting = this.connecting = false; this.lastPeer = "";
    const me = this.me(); if (me && me.flag) { this.flag = me.flag; this.trial = !!me.trial; }
    showRoom();
    this.loop();
  },

  /* ---------- 방 목록 그리기 ---------- */
  emblem(g) {
    if (!g) return `<span class="rm-seal sealed" title="깃발 비공개" aria-label="깃발 비공개"><i>?</i></span>`;
    const art = typeof flagArt === "function" ? flagArt("emblem", g) : "";
    return `<span class="rm-seal" style="--gc:${GROUPS[g].color}" title="${esc(GROUPS[g].name)}">${art ? `<img src="${art}" alt="" draggable="false">` : groupEmblem(g)}</span>`;
  },
  rowHTML(r) {
    const full = r.n >= r.max, play = r.status === "play";
    return `<button type="button" class="rm-row${play ? " is-play" : full ? " is-full" : ""}" data-id="${esc(r.id)}">
      ${this.emblem(r.flag && GROUPS[r.flag] ? r.flag : null)}
      <span class="rm-title"><b>${r.lock ? `<i class="rm-lock" title="비밀번호 방" aria-label="비밀번호 방">${LOCK_MINI}</i>` : ""}${esc(r.title)}</b><small>${r.flag && GROUPS[r.flag] ? esc(GROUPS[r.flag].name) : "깃발 비공개"}</small></span>
      <span class="rm-host"><i class="rm-lv"><small>LV</small>${r.host ? +r.host.lv || 1 : "?"}</i><b>${esc(r.host ? r.host.id : "?")}</b></span>
      <span class="rm-st ${play ? "s-play" : "s-wait"}">${play ? "대전 중" : "대기 중"}</span>
      <span class="rm-n"><b>${+r.n}</b>/${+r.max}</span>
    </button>`;
  },
  paintList(err) {
    const box = $("#rm-table"); if (!box) return;
    const cnt = $("#rm-count"); if (cnt) cnt.textContent = err ? "" : `열린 방 ${this.total}개`;
    if (err) { box.innerHTML = `<div class="rm-empty is-bad"><i class="rm-gate" aria-hidden="true"></i><b>${esc(err)}</b><small>잠시 뒤 새로고침을 눌러 주세요.</small></div>`; return; }
    box.innerHTML = this.list.length ? this.list.map(r => this.rowHTML(r)).join("")
      : `<div class="rm-empty"><i class="rm-gate" aria-hidden="true"></i><b>아직 열린 방이 없습니다</b><small>첫 방을 열어 도전자를 기다려 보세요.</small></div>`;
  },
  pickHTML(u) {
    return this.options(u).map(o => {
      const G = GROUPS[o.g], sc = deckScore(o.cards).total, on = o.g === this.flag && o.trial === this.trial;
      return `<button type="button" class="rm-pick${on ? " on" : ""}" data-g="${o.g}" data-tr="${o.trial ? 1 : 0}" style="--gc:${G.color}" aria-pressed="${on}" title="${esc(o.name)}">
        ${this.emblem(o.g)}<span class="rp-txt"><b>${esc(G.name)}${o.trial ? " <em>체험</em>" : ""}</b><small>덱 점수 ${sc} · ${this.tier(o.g, sc)}</small></span></button>`;
    }).join("");
  },
  bindPick(root, after) {
    root.addEventListener("click", e => {
      const b = e.target.closest(".rm-pick"); if (!b || b.disabled) return;
      const g = b.dataset.g, trial = b.dataset.tr === "1";   // data-trial은 체험 덱 띠(js/deckcode.js)가 쓰는 이름이라 피한다
      if (g === this.flag && trial === this.trial) return;
      if (typeof FEEL !== "undefined") FEEL.play("flag_pick", .7);
      after(g, trial);
    });
  },

  /* ---------- 방 만들기 · 입장 ---------- */
  async createUI() {
    const u = Store.user(); let v = null;
    const ok = await modal(`<h3>방 만들기</h3>
      <div class="rm-form">
        <label class="field">방 제목<input id="rm-f-title" maxlength="24" value="${esc((u.id + "의 방").slice(0, 24))}" autocomplete="off" spellcheck="false"></label>
        <label class="field">비밀번호 <small class="muted">(비워 두면 누구나 들어옵니다)</small><input id="rm-f-pw" maxlength="32" placeholder="없음" autocomplete="off" spellcheck="false"></label>
        <label class="rm-check"><input type="checkbox" id="rm-f-flag" checked><span><b>깃발 공개</b><small>켜면 방 목록에 내 깃발이 보이고, 방 안에서 서로의 깃발 · 덱 점수가 보입니다. 끄면 대전이 시작될 때까지 서로 가려집니다.</small></span></label>
      </div>
      <p class="muted small">덱은 지금 고른 <b>${esc(GROUPS[this.flag].name)}</b>${this.trial ? " 체험 덱" : ""}입니다. 방 안에서 바꿀 수 있습니다.</p>`,
      [{ label: "취소", value: false }, { label: "방 만들기", value: true, cls: "primary", onClick: w => { v = { title: w.querySelector("#rm-f-title").value, pw: w.querySelector("#rm-f-pw").value, showFlag: w.querySelector("#rm-f-flag").checked }; } }],
      { cls: "rm-modal", onOpen: w => w.querySelector("#rm-f-title").addEventListener("keydown", e => { if (e.key === "Enter") w.querySelector(".btn.primary").click(); }) });
    if (!ok || !v || this.busy) return;
    this.busy = true;
    const r = await this.api("create", Object.assign(v, { flag: this.flag, trial: this.trial }));
    this.busy = false;
    if (!r || !r.ok) { toast((r && r.msg) || "방을 만들지 못했습니다.", "warn"); return; }
    this.enter(r.room);
  },
  async joinUI(id) {
    const row = this.list.find(r => r.id === id); if (!row || this.busy) return;
    if (row.status === "play") { toast("대전 중인 방입니다.", "warn"); return; }
    if (row.n >= row.max) { toast("방이 가득 찼습니다.", "warn"); return; }
    let pw = "", note = "";
    for (;;) {
      if (row.lock) {
        let typed = null;
        const ok = await modal(`<h3>비밀번호 방</h3><p>「${esc(row.title)}」 — 방장 <b>${esc(row.host ? row.host.id : "")}</b></p>
          <label class="field">비밀번호<input id="rm-j-pw" maxlength="32" autocomplete="off" spellcheck="false"></label><p class="err">${esc(note)}</p>`,
          [{ label: "취소", value: false }, { label: "들어가기", value: true, cls: "primary", onClick: w => { typed = w.querySelector("#rm-j-pw").value; } }],
          { cls: "rm-modal", onOpen: w => w.querySelector("#rm-j-pw").addEventListener("keydown", e => { if (e.key === "Enter") w.querySelector(".btn.primary").click(); }) });
        if (!ok) return;
        pw = typed || "";
        if (!pw) { note = "비밀번호를 넣어 주세요."; continue; }
      }
      this.busy = true;
      const r = await this.api("join", { id, pw, flag: this.flag, trial: this.trial });
      this.busy = false;
      if (r && r.ok && r.room) return this.enter(r.room);
      if (r && r.needPw && row.lock) { note = r.wrongPw ? r.msg : ""; if (/여러 번/.test(r.msg || "")) { toast(r.msg, "warn"); return; } continue; }
      toast((r && r.msg) || "들어가지 못했습니다.", "warn"); this.refresh(true); return;
    }
  },
  async quick() {
    if (this.busy) return; this.busy = true;
    const r = await this.api("quick", { flag: this.flag, trial: this.trial });
    this.busy = false;
    if (r && r.ok && r.room) return this.enter(r.room);
    if (r && r.ok && r.none) {
      if (await modal(`<h3>빠른 입장</h3><p>지금 바로 들어갈 수 있는 열린 방이 없습니다. 방을 만들어 도전자를 기다릴까요?</p>`, [{ label: "취소", value: false }, { label: "방 만들기", value: true, cls: "primary" }])) this.createUI();
      return;
    }
    toast((r && r.msg) || "들어가지 못했습니다.", "warn");
  },

  /* ---------- 방 소식 (long-poll) ---------- */
  async loop() {
    const gen = ++this.gen; let fails = 0;
    while (gen === this.gen && this.room) {
      let r = null, status = 0;
      try {
        this.ctl = new AbortController();
        const res = await fetch(Net.base + "/api/room", { method: "POST", signal: this.ctl.signal,
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + Net.token }, body: JSON.stringify({ a: "poll", ver: this.room.ver }) });
        status = res.status; r = await res.json();
      } catch (e) { r = null; }
      if (gen !== this.gen || !this.room) return;
      if (r && r.ok && r.room) { fails = 0; this.apply(r.room); continue; }
      if (r && r.gone) return this.out(r.gone);
      if (status === 401) { this.room = null; if (typeof Net !== "undefined") Net.lost(); return; }
      if (++fails >= 10) return this.out("net");
      await new Promise(res => setTimeout(res, status === 429 ? 4000 : 1500));
    }
  },
  stopLoop() { this.gen++; try { if (this.ctl) this.ctl.abort(); } catch (e) {} this.ctl = null; },
  apply(room) {
    if (!room || !this.room || room.id !== this.room.id || room.ver < this.room.ver) return;
    const u = Store.user();
    this.room = room;
    const me = this.me();
    if (me && me.flag) { this.flag = me.flag; this.trial = !!me.trial; }
    /* 도전자: 방장이 시작했다 → 받은 코드로 붙는다 */
    if (room.status === "play" && room.peer && me && me.inGame && !this.amHost() && room.peer !== this.lastPeer && !this.connecting && !(typeof Online !== "undefined" && Online.inMatch())) this.connect(room.peer);
    if (room.status === "wait" && (this.starting || this.connecting) && !(typeof Online !== "undefined" && Online.inMatch())) this.unlink();   // 상대가 연결 실패를 알렸다
    if (App.screen === "room") this.paint();
    else { const last = room.chat[room.chat.length - 1]; if (last) this.chatN = Math.max(this.chatN, last.n); }
    void u;
  },
  /* 방에서 빠졌다: kick 내보내짐 · drop 응답 없음 · net 서버에 닿지 않음 */
  out(why) {
    this.stopLoop(); this.unlink(true); this.room = null;
    const msg = why === "kick" ? "방장이 내보냈습니다." : why === "drop" ? "오래 응답이 없어 방에서 나왔습니다." : why === "net" ? "서버에 닿지 않아 방에서 나왔습니다." : "";
    if (App.screen === "room") { showRooms(); if (msg) toast(msg, "warn"); }
    else if (msg && App.screen !== "game") toast(msg, "warn");
  },
  async leave(stay) {
    this.stopLoop(); this.unlink(true);
    const had = this.room; this.room = null;
    if (had) await this.api("leave");
    if (!stay) showRooms();
  },

  /* ---------- 대전 잇기 ---------- */
  linkUI() { return { status() {}, close() {}, fail: t => Rooms.failLink(t || "상대와 연결하지 못했습니다.") }; },
  async start() {   // 방장
    if (this.starting || !this.amHost()) return;
    const foe = this.foe(); if (!foe) return;
    this.starting = true; this.paintActs();
    try {
      const p = Online.host(this.deck(), () => {});
      Online.expect = foe.id; Online.ui = this.linkUI();
      const code = await p;
      if (!this.starting || !this.room) { Online.reset(); return; }
      const r = await this.api("start", { peer: code });
      if (!r || !r.ok) { Online.reset(); this.starting = false; toast((r && r.msg) || "시작하지 못했습니다.", "warn"); this.paintActs(); return; }
      this.apply(r.room);
      clearTimeout(this.linkTimer);
      this.linkTimer = setTimeout(() => { if (this.starting && !Online.inMatch()) this.failLink("상대와 연결하지 못했습니다. (네트워크가 막혀 있을 수 있어요)"); }, 30000);
    } catch (e) {
      console.warn(e);
      this.starting = false; Online.reset();
      toast(e && e.message === "load" ? "온라인 연결 도구를 받지 못했습니다. 인터넷 연결을 확인해 주세요." : "대전을 열지 못했습니다. 잠시 뒤 다시 해 주세요.", "warn");
      this.paintActs();
    }
  },
  async connect(peer) {   // 도전자
    this.connecting = true; this.lastPeer = peer; this.paintActs();
    clearTimeout(this.linkTimer);
    this.linkTimer = setTimeout(() => { if (this.connecting && !Online.inMatch()) this.failLink("방장과 연결하지 못했습니다. (네트워크가 막혀 있을 수 있어요)"); }, 30000);
    try {
      const p = Online.join(peer, this.deck());
      Online.ui = this.linkUI();
      await p;
    } catch (e) {
      console.warn(e);
      if (this.connecting) this.failLink(e && e.message === "load" ? "온라인 연결 도구를 받지 못했습니다. 인터넷 연결을 확인해 주세요." : "방장과 연결하지 못했습니다. 다시 준비해 주세요.");
    }
  },
  unlink(quiet) {
    clearTimeout(this.linkTimer); this.linkTimer = 0;
    const was = this.starting || this.connecting;
    this.starting = this.connecting = false;
    if (was && typeof Online !== "undefined" && !Online.inMatch()) Online.reset();
    if (!quiet && App.screen === "room") this.paintActs();
  },
  failLink(msg) {
    if (!this.starting && !this.connecting) return;
    this.unlink();
    toast(msg, "warn");
    if (this.room) this.api("back", { fail: true }).then(r => { if (r && r.ok && r.room) this.apply(r.room); });
  },
  onBegin() { clearTimeout(this.linkTimer); this.linkTimer = 0; this.starting = this.connecting = false; },   // online.js begin: 판이 열렸다
  /* 대전 화면에서 나왔다 → 방으로 */
  back() {
    if (!this.room) { showRooms(); return; }
    showRoom();
    this.api("back").then(r => {
      if (r && r.ok && r.room) this.apply(r.room);
      else if (r && r.gone) this.out(r.gone);
    });
  },

  /* ---------- 방 대기실 그리기 ---------- */
  recHTML(m) {
    const n = m.w + m.l, num = x => (+x || 0).toLocaleString("ko-KR");
    return `<span class="rs-rec"><em>${num(m.w)}</em>승 <em>${num(m.l)}</em>패<i aria-hidden="true"></i>승률 <em>${n ? Math.round(m.w / n * 100) + "%" : "—"}</em></span>`;
  },
  seatHTML(m, mine) {
    if (!m) return `<div class="rr-seat is-empty"><div class="rs-cloth"><i class="rs-ghost" aria-hidden="true"></i></div><div class="rs-body"><b class="rs-wait">빈 자리</b><small>도전자를 기다리는 중…</small><i class="rs-dots" aria-hidden="true"><i></i><i></i><i></i></i></div></div>`;
    const R = this.room, G = m.flag && GROUPS[m.flag] ? GROUPS[m.flag] : null, plate = G && typeof flagArt === "function" ? flagArt("plate", m.flag) : "";
    const st = R.status === "play" ? (m.inGame ? ["s-play", "대전 중"] : ["s-back", "방에서 기다리는 중"]) : m.ready ? ["s-ready", "준비 완료"] : ["s-idle", "준비 중"];
    const tier = G ? this.tier(m.flag, m.score) : "", em = G && typeof flagArt === "function" ? flagArt("emblem", m.flag) : "";
    return `<div class="rr-seat${mine ? " is-mine" : ""}${m.ready && R.status === "wait" ? " is-ready" : ""}${G ? "" : " is-sealed"}" style="--gc:${G ? G.color : "#8a8577"}">
      <div class="rs-cloth"${plate ? ` style="background-image:url('${plate}')"` : ""}>
        ${this.emblem(G ? m.flag : null)}
        <div class="rs-who"><span class="rs-tag">${mine ? "나" : "상대"}${m.host ? ' · <i class="rs-crown">♛ 방장</i>' : ""}</span>
          <b class="rs-name">${m.admin ? '<span class="admin-badge">ADMIN</span>' : ""}${esc(m.id)}</b></div>
        <span class="rs-lv" title="모험가 레벨"><small>LV</small><b>${+m.lv || 1}</b></span>
      </div>
      <div class="rs-body">${em ? `<i class="rs-mark" style="background-image:url('${em}')" aria-hidden="true"></i>` : ""}
        ${this.recHTML(m)}
        <div class="rs-flag">${G ? `<b>${esc(G.name)}</b><small>${esc(G.role || "")}${m.trial ? " · 체험 덱" : ""}</small>` : `<b>깃발 비공개</b><small>대전이 시작되면 드러납니다</small>`}</div>
        <div class="rs-score" title="덱 점수 = 덱에 든 카드의 등급 점수 + 레벨의 합. 평가(S~D)는 그 깃발 기본 덱에 견준 세기입니다.">${G && m.score != null ? `<em>덱 점수</em><b>${+m.score}</b>${tier ? `<i class="rs-tier t-${tier}">${tier}</i>` : ""}` : `<em>덱 점수</em><b>?</b>`}</div>
        <div class="rs-state ${st[0]}"><i aria-hidden="true"></i>${st[1]}</div>
        ${!mine && this.amHost() && R.status === "wait" ? `<button type="button" class="btn xs danger rs-kick" data-act="kick">내보내기</button>` : ""}
      </div>
    </div>`;
  },
  paint() {
    const R = this.room, root = $(".screen-room"); if (!R || !root) return;
    const me = this.me(), foe = this.foe();
    $("#rr-title", root).innerHTML = `<b>${R.lock ? `<i class="rm-lock" title="비밀번호 방">${LOCK_MINI}</i>` : ""}${esc(R.title)}</b>
      <span class="rr-chips"><i class="rr-chip">${R.showFlag ? "깃발 공개" : "깃발 비공개"}</i><i class="rr-chip ${R.status === "play" ? "s-play" : "s-wait"}">${R.status === "play" ? "대전 중" : "대기 중"}</i><i class="rr-chip">${R.members.length}/${R.max}</i></span>`;
    $("#rr-me", root).innerHTML = this.seatHTML(me, true);
    $("#rr-foe", root).innerHTML = this.seatHTML(foe, false);
    const pick = $("#rr-pick", root);
    pick.innerHTML = this.pickHTML(Store.user());
    const lock = R.status !== "wait" || this.starting || this.connecting;
    $$(".rm-pick", pick).forEach(b => { b.disabled = lock; });
    this.paintActs(); this.paintChat();
  },
  paintActs() {
    const R = this.room, box = $("#rr-acts"); if (!R || !box) return;
    const me = this.me(), foe = this.foe(), host = this.amHost(), both = !!(me && foe && me.ready && foe.ready);
    const link = this.starting || this.connecting;
    let hint;
    if (link) hint = `<i class="ol-spin"></i>두 기기를 잇는 중…`;
    else if (R.status === "play") hint = me && me.inGame ? "대전이 진행 중입니다." : "상대가 대전 화면에서 돌아오기를 기다립니다.";
    else if (!foe) hint = "도전자를 기다리는 중입니다.";
    else if (both) hint = host ? "두 사람 모두 준비했습니다. 대전을 시작하세요." : "방장이 대전을 시작하기를 기다립니다.";
    else if (me && me.ready) hint = "상대의 준비를 기다립니다.";
    else hint = "깃발을 고르고 준비를 눌러 주세요.";
    const wait = R.status === "wait" && !link;
    box.innerHTML = `<p class="rr-hint${both && wait ? " is-go" : ""}">${hint}</p>
      <div class="rr-btns">
        <button type="button" class="btn ghost" data-act="leave">나가기</button>
        <button type="button" class="btn rr-ready${me && me.ready ? " on" : ""}" data-act="ready" ${wait ? "" : "disabled"}>${me && me.ready ? "준비 취소" : "준비"}</button>
        ${host ? `<button type="button" class="btn primary rr-start" data-act="start" ${wait && both ? "" : "disabled"}>대전 시작</button>` : ""}
      </div>`;
    const pick = $("#rr-pick"); if (pick) $$(".rm-pick", pick).forEach(b => { b.disabled = !wait; });
  },
  paintChat() {
    const R = this.room, box = $("#rr-log"); if (!R || !box) return;
    const u = Store.user(), fresh = R.chat.filter(m => m.n > this.chatN);
    if (!fresh.length) return;
    const near = box.scrollHeight - box.scrollTop - box.clientHeight < 60;
    const time = t => { const d = new Date(t), p = n => String(n).padStart(2, "0"); return `${p(d.getHours())}:${p(d.getMinutes())}`; };
    box.insertAdjacentHTML("beforeend", fresh.map(m => m.from
      ? `<div class="msg${m.from === u.id ? " mine" : ""}"><span class="who" data-i18n-skip>${esc(m.from)}</span><time>${time(m.at)}</time><span class="txt" data-i18n-skip>${esc(m.text)}</span></div>`
      : `<div class="msg sys">${esc(m.text)}</div>`).join(""));
    if (this.chatN && fresh.some(m => m.from && m.from !== u.id) && typeof FEEL !== "undefined") FEEL.play("chat", .6);
    this.chatN = fresh[fresh.length - 1].n;
    while (box.children.length > 120) box.firstElementChild.remove();
    if (near || fresh.some(m => m.from === u.id)) box.scrollTop = box.scrollHeight;
  },
  async act(a, body) {
    const r = await this.api(a, body);
    if (r && r.ok && r.room) this.apply(r.room);
    else if (r && r.gone) this.out(r.gone);
    else if (r && r.msg) toast(r.msg, "warn");
    return r;
  }
};

/* ---------- 화면: 방 목록 ---------- */
function showRooms() {
  const u = Store.user(); if (!u) return showLogin();
  if (!Rooms.on()) return showLobby();
  if (!Rooms.pickDefault(u, Rooms.flag || App.lobbyGroup, Rooms.trial)) { showLobby(); toast(`저장된 ${RULES.deckSize}장 덱이 있어야 대전할 수 있습니다.`, "warn"); return; }
  App.screen = "rooms"; Bg.set("calm");
  const R = sealRecord(u), lv = typeof LEVEL !== "undefined" ? LEVEL.info(Store.xp(u)).lv : 1;
  $("#app").innerHTML = `<section class="screen screen-rooms">
    ${headerHTML("온라인 대전")}
    <div class="rooms">
      <main class="rm-frame rm-list" aria-label="방 목록">
        <div class="rm-head">
          <h3 class="panel-title">방 목록 <small id="rm-count"></small></h3>
          <div class="rm-tools">
            <button type="button" class="btn sm ghost" data-rm="refresh" title="방 목록을 다시 받습니다">새로고침</button>
            <button type="button" class="btn sm" data-rm="quick" title="비밀번호 없는 대기 방에 바로 들어갑니다">빠른 입장</button>
            <button type="button" class="btn sm primary" data-rm="create">방 만들기</button>
          </div>
        </div>
        <div class="rm-cols" aria-hidden="true"><span></span><span>방</span><span>방장</span><span>상태</span><span>인원</span></div>
        <div class="rm-table" id="rm-table"><div class="rm-empty"><i class="ol-spin"></i><small>방 목록을 받는 중…</small></div></div>
      </main>
      <aside class="rm-frame rm-side" aria-label="내 출전 깃발">
        <div class="rm-me"><span class="rs-lv"><small>LV</small><b>${lv}</b></span><span><b class="rm-me-name">${esc(u.id)}</b>${Rooms.recHTML(R)}</span></div>
        <h3 class="panel-title">출전 깃발</h3>
        <div class="rm-picks" id="rm-picks">${Rooms.pickHTML(u)}</div>
        <div class="rm-side-foot">
          <button type="button" class="btn sm ghost" data-rm="direct" title="예전 방식: 다섯 글자 번호를 주고받아 바로 잇습니다">번호로 직접 연결</button>
          <button type="button" class="btn sm" data-rm="back">대기실로</button>
        </div>
      </aside>
    </div>
  </section>`;
  const root = $(".screen-rooms");
  bindHeader(root);
  root.addEventListener("click", e => {
    const row = e.target.closest(".rm-row"); if (row) return Rooms.joinUI(row.dataset.id);
    const b = e.target.closest("[data-rm]"); if (!b) return;
    const k = b.dataset.rm;
    if (k === "refresh") { b.disabled = true; Rooms.refresh(true).then(() => { b.disabled = false; }); }
    else if (k === "quick") Rooms.quick();
    else if (k === "create") Rooms.createUI();
    else if (k === "back") showLobby();
    else if (k === "direct" && typeof onlineDirect === "function") onlineDirect(Rooms.flag, { trial: Rooms.trial });
  });
  Rooms.bindPick($("#rm-picks"), (g, trial) => { Rooms.flag = g; Rooms.trial = trial; $("#rm-picks").innerHTML = Rooms.pickHTML(u); });
  Rooms.stopList();
  Rooms.listTimer = setInterval(() => { if (App.screen !== "rooms") return Rooms.stopList(); if (!document.hidden && !document.querySelector(".modal-wrap")) Rooms.refresh(); }, 5000);
  Rooms.refresh(true);
}

/* ---------- 화면: 방 대기실 ---------- */
function showRoom() {
  const u = Store.user(); if (!u) return showLogin();
  if (!Rooms.room) return showRooms();
  App.screen = "room"; Bg.set("calm");
  Rooms.chatN = 0;
  $("#app").innerHTML = `<section class="screen screen-room">
    ${headerHTML("온라인 대전")}
    <div class="room">
      <div class="rr-main">
        <div class="rm-frame rr-titlebar" id="rr-title"></div>
        <div class="rr-duel">
          <div class="rr-side" id="rr-me"></div>
          <div class="rr-vs" aria-hidden="true"><i></i><b>VS</b><i></i></div>
          <div class="rr-side" id="rr-foe"></div>
        </div>
        <div class="rm-frame rr-deck">
          <h3 class="panel-title">내 깃발 <small>바꾸면 준비가 풀립니다</small></h3>
          <div class="rm-picks is-row" id="rr-pick"></div>
        </div>
        <div class="rm-frame rr-acts" id="rr-acts"></div>
      </div>
      <aside class="rm-frame rr-chat" aria-label="방 채팅">
        <div class="chat-head"><h3 class="panel-title">방 채팅</h3></div>
        <div class="chat-log" id="rr-log"></div>
        <form class="chat-form" id="rr-form"><input id="rr-in" maxlength="200" placeholder="메시지 입력…" autocomplete="off" aria-label="채팅 메시지"><button class="btn sm primary" type="submit">보내기</button></form>
      </aside>
    </div>
  </section>`;
  const root = $(".screen-room");
  bindHeader(root, async () => {   // 상단 띠로 다른 화면에 가면 방에서 나간다
    if (!Rooms.room) return true;
    if (!(await modal(`<h3>방 나가기</h3><p>다른 화면으로 가면 이 방에서 나갑니다.</p>`, [{ label: "머무르기", value: false }, { label: "나가기", value: true, cls: "primary" }]))) return false;
    await Rooms.leave(true); return true;
  });
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b || b.disabled) return;
    const a = b.dataset.act, me = Rooms.me();
    if (a === "leave") Rooms.leave();
    else if (a === "ready") { if (typeof FEEL !== "undefined") FEEL.play("ui_open", .5); Rooms.act("ready", { v: !(me && me.ready) }); }
    else if (a === "start") Rooms.start();
    else if (a === "kick") { const foe = Rooms.foe(); if (foe) modal(`<h3>내보내기</h3><p><b>${esc(foe.id)}</b> 님을 방에서 내보냅니다. 내보낸 모험가는 이 방에 다시 들어올 수 없습니다.</p>`, [{ label: "취소", value: false }, { label: "내보내기", value: true, cls: "danger" }]).then(ok => { if (ok) Rooms.act("kick"); }); }
  });
  Rooms.bindPick($("#rr-pick"), (g, trial) => Rooms.act("flag", { flag: g, trial }));
  $("#rr-form").addEventListener("submit", e => {
    e.preventDefault(); const inp = $("#rr-in"), v = inp.value.trim(); if (!v) return;
    inp.value = ""; Rooms.act("chat", { text: v });
  });
  Rooms.paint();
}

/* 창을 닫거나 새로 고칠 때: 방에서 나간다고 알린다(대전 중이면 그대로 둔다 — 응답이 없으면 서버가 정리) */
addEventListener("pagehide", () => {
  if (!Rooms.room || App.screen === "game" || typeof Net === "undefined" || !Net.token) return;
  try { fetch(Net.base + "/api/room", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json", Authorization: "Bearer " + Net.token }, body: JSON.stringify({ a: "leave" }) }); } catch (e) {}
});

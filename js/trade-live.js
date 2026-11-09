/* ETHERION v3.21 — 실시간 거래: 방 코드로 이어진 두 모험가가 한 거래 창에서 바로 맞바꾼다
   - 잇기는 온라인 대전(js/online.js)과 같다: PeerJS(WebRTC)로 두 기기를 바로 잇고, 처음 서로를 찾는 일만 공개 중계를 빌린다.
     주소 끝에 #local 을 붙이면 같은 컴퓨터의 두 탭끼리 BroadcastChannel로 잇는다(인터넷 없이 시험).
   - 주고받는 말(모두 JSON):
       hi   { name, lv, sig }        처음 인사(카드 데이터가 같은지 sig로 맞대 본다)
       put  { cards, shards }        내 쪽에 놓은 것(바뀔 때마다 통째로)
       lock { on, k }                "이대로 좋다" — k = 지금 두 쪽 꾸러미의 열쇠. 어느 쪽이든 놓은 것이 바뀌면 k가 달라져 확인이 저절로 풀린다
       go   { k }                    "교환" — 두 쪽의 go가 같은 k이면 각자 반영한다(TradeAPI.liveSettle)
       done { k, ok, msg }           반영 결과 알림
       bye  { why }                  나감
   - 서버가 생기면: 방은 서버가 갖고(WebSocket), lock · go를 서버가 모아 양쪽 보유를 한 번에 바꾼다. 화면(js/trade-ui.js)은 그대로 이 객체를 본다.
     지금처럼 각 기기가 자기 쪽을 반영하는 방식은 한쪽이 반영 직전에 끊기면 어긋날 수 있다 — 친선 거래로만 쓴다. */
"use strict";

const TRADE_PEER_PREFIX = "etherion-trade-v321-";
const TRADE_ABC = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

const TradeLive = {
  state: "idle",         // idle · connecting · wait(방을 열고 기다림) · open(이어짐) · closed
  role: null, code: "", peer: null, link: null, err: "",
  me: null, foe: null, flash: null, history: [],
  onChange: null,        // 화면이 다시 그릴 때 부르는 함수
  /* 시험용: 연결 방법을 바꿔 끼울 수 있다 (role, code, handlers) => link */
  transport: null,

  local() { return /#local\b/.test(location.hash); },
  newCode() { let c = ""; for (let i = 0; i < 5; i++) c += TRADE_ABC[Math.floor(Math.random() * TRADE_ABC.length)]; return c; },
  blank() { return { offer: { cards: {}, shards: 0 }, lock: "", go: "" }; },
  reset() {
    this.state = "idle"; this.role = null; this.code = ""; this.err = ""; this.flash = null;
    this.me = this.blank(); this.foe = Object.assign(this.blank(), { name: "", lv: 0, here: false });
  },
  changed() { if (typeof this.onChange === "function") try { this.onChange(); } catch (e) { console.error(e); } },
  /* 두 쪽 꾸러미의 열쇠 — 방을 연 쪽(host)이 앞 */
  pairKey() {
    const a = TA.key(this.me.offer), b = TA.key(this.foe.offer);
    return this.role === "host" ? a + "|" + b : b + "|" + a;
  },
  myLock() { return this.me.lock === this.pairKey(); },
  foeLock() { return this.foe.lock === this.pairKey(); },
  myGo() { return this.me.go === this.pairKey(); },
  foeGo() { return this.foe.go === this.pairKey(); },

  /* ---------- 잇기 ---------- */
  async host() {
    this.leave(true); this.reset(); this.role = "host"; this.state = "connecting"; this.changed();
    try {
      if (this.transport) { this.code = this.newCode(); this.link = this.transport("host", this.code, this.handlers()); this.state = "wait"; this.changed(); return this.code; }
      if (this.local()) { this.code = this.newCode(); this.link = this.openLocal(); this.state = "wait"; this.changed(); return this.code; }
      const Peer = await Online.loadPeer();
      for (let tries = 0; tries < 4; tries++) {
        const code = this.newCode();
        const ok = await new Promise(res => {
          const peer = new Peer(TRADE_PEER_PREFIX + code, { debug: 0 });
          peer.on("open", () => { this.peer = peer; this.code = code; res(true); });
          peer.on("error", e => { if (!this.peer) { peer.destroy(); res(e && e.type === "unavailable-id" ? false : e); return; } this.fail(e); });
          peer.on("connection", c => {
            if (this.link && this.link.open) { c.on("open", () => { c.send({ t: "bye", why: "이 방에는 이미 거래 상대가 있습니다." }); setTimeout(() => c.close(), 300); }); return; }
            this.link = this.wrapConn(c);
          });
          peer.on("disconnected", () => { if (this.peer === peer && !peer.destroyed) try { peer.reconnect(); } catch (e) {} });
        });
        if (ok === true) { this.state = "wait"; this.changed(); return this.code; }
        if (ok !== false) throw ok;
      }
      throw new Error("code");
    } catch (e) { this.fail(e); return null; }
  },
  async join(code) {
    code = String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (code.length !== 5) { this.err = "방 코드는 다섯 글자입니다."; this.changed(); return false; }
    this.leave(true); this.reset(); this.role = "guest"; this.code = code; this.state = "connecting"; this.changed();
    try {
      if (this.transport) { this.link = this.transport("guest", code, this.handlers()); this.sendHi(); return true; }
      if (this.local()) { this.link = this.openLocal(); this.sendHi(); return true; }
      const Peer = await Online.loadPeer();
      await new Promise((res, rej) => {
        const peer = new Peer(undefined, { debug: 0 }); this.peer = peer;
        const timer = setTimeout(() => rej(new Error("timeout")), 15000);
        peer.on("open", () => {
          const c = peer.connect(TRADE_PEER_PREFIX + code, { reliable: true });
          this.link = this.wrapConn(c, () => { clearTimeout(timer); res(); });
        });
        peer.on("error", e => { clearTimeout(timer); if (this.state === "connecting") rej(e); else this.fail(e); });
      });
      return true;
    } catch (e) { this.fail(e); return false; }
  },
  handlers() { return { msg: m => this.receive(m), open: () => { if (this.role === "guest") this.sendHi(); }, close: () => this.lost() }; },
  wrapConn(c, onOpen) {
    const link = { open: false, send: m => { try { if (link.open) c.send(m); } catch (e) {} }, close: () => { try { c.close(); } catch (e) {} } };
    c.on("open", () => { link.open = true; if (onOpen) onOpen(); if (this.role === "guest") this.sendHi(); });
    c.on("data", m => this.receive(m));
    c.on("close", () => { link.open = false; this.lost(); });
    c.on("error", () => {});
    return link;
  },
  openLocal() {
    const ch = new BroadcastChannel("etherion-trade-" + this.code), from = this.role;
    const link = { open: true, send: m => ch.postMessage({ from, m }), close: () => { link.open = false; try { ch.close(); } catch (e) {} } };
    ch.onmessage = e => { if (e.data && e.data.from !== from) this.receive(e.data.m); };
    return link;
  },
  send(m) { if (this.link) this.link.send(m); },
  sendHi() {
    const u = Store.user();
    this.send({ t: "hi", name: u ? u.id : "?", lv: u && typeof Store.level === "function" ? Store.level(u) : 0, sig: typeof Online !== "undefined" ? Online.sig() : "" });
  },
  fail(e) {
    const t = e && e.type;
    this.err = t === "peer-unavailable" ? "그 코드의 방을 찾지 못했습니다. 코드를 확인해 주세요."
      : t === "network" || t === "server-error" || t === "socket-error" || (e && e.message === "load") ? "인터넷 연결(중계)에 닿지 못했습니다. 같은 컴퓨터에서 시험하려면 주소 끝에 #local 을 붙이세요."
      : e && e.message === "timeout" ? "상대 방에 닿지 못했습니다(15초)."
      : "연결에 실패했습니다.";
    this.state = "closed"; this.changed();
  },
  lost() {
    if (this.state === "closed" || this.state === "idle") return;
    this.err = this.err || "상대와의 연결이 끊겼습니다. 놓아 둔 것은 그대로 내 보유에 있습니다.";
    this.state = "closed"; this.foe.here = false; this.changed();
  },
  leave(quiet) {
    if (this.link) { this.send({ t: "bye", why: "상대가 거래 방을 나갔습니다." }); const l = this.link; this.link = null; setTimeout(() => l.close(), 150); }
    if (this.peer) { const p = this.peer; this.peer = null; setTimeout(() => { try { p.destroy(); } catch (e) {} }, 200); }
    if (!quiet) { this.reset(); this.changed(); }
  },

  /* ---------- 받은 말 ---------- */
  receive(m) {
    if (!m || typeof m !== "object") return;
    if (m.t === "hi") {
      const first = !this.foe.here;
      this.foe.name = String(m.name || "?").slice(0, 16); this.foe.lv = +m.lv || 0; this.foe.here = true;
      if (typeof Online !== "undefined" && m.sig && m.sig !== Online.sig()) this.err = "두 기기의 게임 버전(카드 데이터)이 다릅니다. 같은 버전으로 맞춘 뒤 거래하세요.";
      this.state = "open";
      if (first && this.role === "host") this.sendHi();
      if (first) this.send({ t: "put", cards: this.me.offer.cards, shards: this.me.offer.shards });
    } else if (m.t === "put") {
      const a = TA.clean(m);
      if (TA.n(a) > TRADE.maxCards) return;
      this.foe.offer = a; this.flash = null;
    } else if (m.t === "lock") {
      this.foe.lock = m.on ? String(m.k || "") : "";
    } else if (m.t === "go") {
      this.foe.go = String(m.k || "");
      this.trySettle();
    } else if (m.t === "done") {
      if (!m.ok) this.err = "상대 쪽 반영이 실패했습니다: " + String(m.msg || "").slice(0, 80);
    } else if (m.t === "bye") {
      this.err = String(m.why || "상대가 나갔습니다.").slice(0, 80);
      this.state = "closed"; this.foe.here = false; if (this.link) { this.link.close(); this.link = null; }
    }
    this.changed();
  },

  /* ---------- 내 쪽 ---------- */
  /* 놓은 것 바꾸기: 확인 · 교환은 열쇠가 바뀌어 저절로 풀린다 */
  put(offer) {
    this.me.offer = TA.clean(offer); this.me.lock = ""; this.me.go = ""; this.flash = null;
    this.send({ t: "put", cards: this.me.offer.cards, shards: this.me.offer.shards });
    this.changed();
  },
  lock(on) {
    if (on) { const e = Store.escrowCheck(Store.user(), this.me.offer); if (e) { this.err = e; this.changed(); return false; } }
    if (on && TA.empty(this.me.offer) && TA.empty(this.foe.offer)) { this.err = "양쪽 모두 비어 있습니다."; this.changed(); return false; }
    this.err = "";
    this.me.lock = on ? this.pairKey() : ""; if (!on) this.me.go = "";
    this.send({ t: "lock", on: !!on, k: this.me.lock });
    this.changed(); return true;
  },
  go() {
    if (!this.myLock() || !this.foeLock()) return false;
    const e = Store.escrowCheck(Store.user(), this.me.offer); if (e) { this.err = e; this.changed(); return false; }
    this.me.go = this.pairKey();
    this.send({ t: "go", k: this.me.go });
    this.trySettle(); this.changed(); return true;
  },
  async trySettle() {
    const k = this.pairKey();
    if (!(this.me.go === k && this.foe.go === k && this.me.lock === k && this.foe.lock === k)) return;
    if (this._settling === k) return; this._settling = k;
    const give = this.me.offer, get = this.foe.offer;
    const r = await TradeAPI.liveSettle(give, get, this.foe.name, this.code + ":" + k);
    this.send({ t: "done", k, ok: r.ok, msg: r.msg || "" });
    if (r.ok) {
      this.history.unshift({ at: Date.now(), peer: this.foe.name, give, get, id: r.id });
      this.flash = { give, get, over: r.over, extra: r.extra };
      this.me = this.blank(); this.foe.offer = { cards: {}, shards: 0 }; this.foe.lock = ""; this.foe.go = "";
      if (typeof FEEL !== "undefined") FEEL.play("coinHeads", .7);
    } else this.err = r.msg;
    this._settling = null;
    this.changed();
  }
};
TradeLive.reset();

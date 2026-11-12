/* ETHERION v3.22 — 서버 연결 (온라인 모드)
   게임을 서버 주소(예: http://localhost:8787)로 열면 저절로 온라인 모드가 된다. index.html을 파일로 열면(ETHERION 실행.bat · PC 앱 · 안드로이드 앱)
   예전처럼 이 기기 저장소(localStorage)만 쓴다. 주소 끝에 ?offline 을 붙이면 서버에서 열어도 로컬로.
   서버 쪽은 server/server.js, 설명은 docs/SERVER.md.

   하는 일: Store의 함수를 감싸 서버에 보낸다. 서버는 게임과 **같은 Store 코드**(server/rules.js)로 처리하고 정본을 갖는다.
   - 서버에 묻고 답을 기다리는 것(동기): 등록 · 로그인 · 손님 · 덱 저장 · 상점 사고팔기 · 관리자 도구.
     화면 코드가 결과를 바로 쓰므로(예: const r = Store.buyCard(…)) 동기 요청으로 답을 받아 그대로 돌려준다 — 화면 코드는 고칠 것이 없다.
     로컬 PC · 같은 와이파이에서는 몇 ms라 멈춤이 느껴지지 않는다. 화면 쪽을 await로 바꾸면 이 동기 요청은 뺄 수 있다(SERVER_PLAN 4장).
   - 먼저 이 기기에서 하고 뒤에 서버에 알리는 것(비동기): 덱 초안 · 전투 · 수레바퀴 · 원정 보상(조각 · 카드).
   - 그 밖에 기기가 정하는 칸(전적 · 수레바퀴 표 · 원정 진행 · 경험치)은 Store.save 때 모아 보낸다(soft).
     카드 · 지갑 · 덱 · 장부 · NEW 표시는 서버만 바꾼다(server.js PROTECTED) — 응답의 스냅샷으로 이 기기의 사본을 맞춘다.
   - 교역소: TradeAPI.backend = TradeHttp(서버의 TradeLocal을 그대로 부름). 상단 띠의 소식 점은 서버가 알려 준 수.
   작업마다 번호(seq)를 붙여 차례를 지키고, 같은 작업을 두 번 보내도 서버가 한 번만 처리한다. */
"use strict";

const NET_KEY = "etherion.net.token";      // 이 브라우저의 로그인 토큰
const NET_SERVER_KEY = "etherion.server";   // (선택) 파일로 연 게임이 붙을 서버 주소. 예: localStorage["etherion.server"] = "http://192.168.0.10:8787"
const NET_PROTECTED = ["id", "admin", "guest", "created", "group", "owned", "collection", "gold", "ledger", "decks", "drafts", "fresh", "pilClaim", "spins", "pilSrv", "rewardDay", "rewardLog"];   // v3.39 spins · pilSrv · rewardDay: 서버가 정하는 보상
const NET_SYNC_OPS = ["saveDeck", "buyCard", "sellCard", "draftAdd", "grantGroup", "revokeGroup", "grantAllCards", "restock", "pilgrimClaim", "upgradeCard", "shopSet", "shopStock", "matchStart", "matchArcade", "matchEnd", "wheelSpin"];   // pilgrimClaim(v3.26): 순례 첫 승 — 서버가 날짜를 보고 추첨까지
const NET_ASYNC_OPS = ["setDraft", "clearDraft", "grantCard", "addGold"];   // v3.39 grantCard · addGold는 손님만 (로그인한 모험가의 보상은 서버가 정한다 — 아래 install)   // v3.39 grantCard · addGold는 보내지 않는다 — 보상은 서버가 정한다(js/rewards.js)

const Net = {
  on: false, base: "", info: null, token: null,
  cid: Math.random().toString(36).slice(2, 10) + Date.now().toString(36),   // 이 탭의 번호 (탭마다 작업 번호를 따로 센다)
  seq: 0, pending: [], inflight: false, flushTimer: 0, softTimer: 0,
  depth: 0, rev: -1, unread: 0, freshBase: {}, lostShown: false,

  /* ---------- 요청 ---------- */
  headers(x) { x.setRequestHeader("Content-Type", "application/json"); if (this.token) x.setRequestHeader("Authorization", "Bearer " + this.token); },
  /* 동기 요청: 답을 받을 때까지 기다린다 */
  xhr(method, path, body, base) {
    const x = new XMLHttpRequest();
    try { x.open(method, (base || this.base) + path, false); this.headers(x); x.send(body == null ? null : JSON.stringify(body)); }
    catch (e) { return { ok: false, net: true, msg: "서버에 닿지 않습니다. 서버 창이 켜져 있는지 확인해 주세요." }; }
    return this.parse(x.status, x.responseText);
  },
  /* 비동기 요청 */
  async fetch(method, path, body) {
    let res;
    try {
      res = await fetch(this.base + path, { method, headers: Object.assign({ "Content-Type": "application/json" }, this.token ? { Authorization: "Bearer " + this.token } : {}), body: body == null ? undefined : JSON.stringify(body) });
    } catch (e) { return { ok: false, net: true, msg: "서버에 닿지 않습니다. 서버 창이 켜져 있는지 확인해 주세요." }; }
    return this.parse(res.status, await res.text());
  },
  parse(status, text) {
    let j = null;
    try { j = JSON.parse(text); } catch (e) { return { ok: false, net: true, msg: `서버 응답을 읽지 못했습니다. (${status})` }; }
    if (status === 401 && j && j.auth === false) this.lost();
    return j;
  },

  /* ---------- 서버가 준 스냅샷을 이 기기의 사본에 맞춘다 ---------- */
  apply(r, first) {
    if (!r || !r.me) return false;
    if (typeof r.unread === "number" && r.unread !== this.unread) { this.unread = r.unread; if (typeof TradeUI !== "undefined") TradeUI.badge(); }
    if (r.rev < this.rev) return false;                // 늦게 도착한 옛 응답
    if (this.pending.length && !first) return false;   // 아직 서버에 가지 않은 작업이 있으면 다음 응답에 맞춘다
    this.rev = r.rev;
    const D = Store.data, me = r.me;
    let u = D.users[me.id];
    const before = u ? JSON.stringify(NET_PROTECTED.map(k => u[k])) : "";
    if (!u) u = D.users[me.id] = {};
    /* 이 기기에서 지운 NEW 표시(아직 서버에 알리지 않은 것)는 지운 채로 둔다 */
    const dropped = Object.keys(this.freshBase).filter(k => !(u.fresh && k in u.fresh));
    for (const k of NET_PROTECTED) { if (k in me) u[k] = me[k]; else delete u[k]; }
    if (first) for (const k in me) if (!NET_PROTECTED.includes(k)) u[k] = me[k];
    this.freshBase = Object.assign({}, me.fresh || {});
    if (dropped.length && u.fresh) for (const k of dropped) delete u.fresh[k];
    /* 관리자: 모든 모험가(보관소의 모험가 관리). 화면이 쥐고 있는 객체가 그대로 새 값을 보도록 제자리에서 고친다 */
    const others = {}; for (const x of r.others || []) others[x.id] = x;
    for (const id of Object.keys(D.users)) if (id !== me.id && !others[id]) delete D.users[id];
    for (const id in others) {
      const o = D.users[id];
      if (!o) { D.users[id] = others[id]; continue; }
      for (const k of Object.keys(o)) if (!(k in others[id])) delete o[k];
      Object.assign(o, others[id]);
    }
    D.session = me.id;
    D.stock = r.stock || {};
    if (r.shop) D.shop = r.shop;   // v3.37 관리자 상점 설정 (서버가 정본)
    if (first) return true;
    if (before !== JSON.stringify(NET_PROTECTED.map(k => u[k]))) {   // 다른 데서 바뀜(거래 성사 · 관리자 지급 …) → 화면을 다시 그린다
      if (typeof LevelUI !== "undefined") LevelUI.paint();
      if (typeof App !== "undefined" && typeof App.refresh === "function") try { App.refresh(); } catch (e) { console.error(e); }
    }
    return true;
  },
  /* 로그인 · 등록 · 손님 */
  auth(path, body) {
    const r = this.xhr("POST", path, body);
    if (!r || !r.ok) return r || { ok: false, msg: "서버가 답하지 않습니다." };
    this.setToken(r.token);
    this.reset();
    this.apply(r, true);
    return r;
  },
  setToken(t) { this.token = t || null; try { if (t) localStorage.setItem(NET_KEY, t); else localStorage.removeItem(NET_KEY); } catch (e) {} },
  reset() { this.seq = 0; this.pending = []; this.rev = -1; this.unread = 0; this.freshBase = {}; this.cid = Math.random().toString(36).slice(2, 10) + Date.now().toString(36); Store.data.users = {}; Store.data.session = null; Store.data.stock = {}; },
  /* 서버가 토큰을 모름(서버 데이터를 지웠거나 오래돼 끝남) → 로그인 화면으로 */
  lost() {
    if (!this.token) return;
    this.setToken(null); this.reset();
    if (this.lostShown) return; this.lostShown = true;
    setTimeout(() => {
      this.lostShown = false;
      if (typeof toast === "function") toast("서버의 로그인이 끝났습니다. 다시 로그인해 주세요.", "warn");
      if (typeof showLogin === "function") showLogin();
    }, 0);
  },

  /* ---------- 작업 보내기 ---------- */
  op(fn, u, args) { return { fn, target: u ? u.id : null, args }; },
  /* 동기: 밀린 작업까지 한꺼번에 보내고 이 작업의 결과를 돌려준다 */
  run(op) {
    this.softFlush();
    op.seq = ++this.seq; this.pending.push(op);
    const r = this.xhr("POST", "/api/ops", { cid: this.cid, ops: this.pending });
    if (!r || !r.ok) { this.pending = this.pending.filter(x => x !== op); return { ok: false, msg: (r && r.msg) || "서버가 답하지 않습니다." }; }
    this.ack(r.ack);
    this.apply(r);
    const res = r.results ? r.results[op.seq] : undefined;
    return res === null ? undefined : res;
  },
  /* 비동기: 줄을 세워 두었다가 보낸다 */
  queue(op) {
    const last = this.pending[this.pending.length - 1];
    if (last && !last.sent && last.fn === op.fn && (op.fn === "setDraft" || op.fn === "soft") && (op.fn === "soft" || last.args[0] === op.args[0])) { last.args = op.args; last.target = op.target; }   // 같은 덱의 초안 · soft는 마지막 것만
    else { op.seq = ++this.seq; this.pending.push(op); }
    if (!this.flushTimer) this.flushTimer = setTimeout(() => { this.flushTimer = 0; this.flush(); }, 60);
  },
  ack(n) { this.pending = this.pending.filter(x => x.seq > n); },
  async flush() {
    if (this.inflight || !this.pending.length || !this.token) return;
    this.inflight = true;
    const ops = this.pending.slice(); ops.forEach(x => { x.sent = true; });
    const r = await this.fetch("POST", "/api/ops", { cid: this.cid, ops });
    this.inflight = false;
    if (r && r.ok) {
      this.ack(r.ack);
      for (const op of ops) { const x = r.results && r.results[op.seq]; if (x && x.ok === false && x.msg && typeof toast === "function") toast("서버: " + x.msg, "warn"); }
      this.apply(r);
      if (this.pending.length) this.flush();
    } else if (r && r.net) { ops.forEach(x => { x.sent = false; }); setTimeout(() => this.flush(), 3000); }   // 서버가 잠깐 꺼짐 → 다시
    else this.ack(Math.max(...ops.map(x => x.seq)));
  },
  /* 모든 작업이 서버에 닿을 때까지 기다린다(거래 요청 전에) */
  async settle() {
    this.softFlush();
    for (let i = 0; i < 50 && this.pending.length; i++) { if (!this.inflight) await this.flush(); else await new Promise(r => setTimeout(r, 60)); }
  },
  /* soft: 서버가 정본을 갖지 않는 칸(전적 · 수레바퀴 표 · 원정 · 경험치 …)을 모아 보낸다 */
  softSoon() { if (!this.on || !this.token) return; clearTimeout(this.softTimer); this.softTimer = setTimeout(() => { this.softTimer = 0; this.softFlush(true); }, 500); },
  softFlush(force) {
    if (!force && !this.softTimer) return;
    clearTimeout(this.softTimer); this.softTimer = 0;
    const u = Store.user(); if (!u || !this.token) return;
    const fields = {};
    for (const k in u) if (!NET_PROTECTED.includes(k) && k !== "pw") fields[k] = u[k];
    const freshDrop = Object.keys(this.freshBase).filter(k => !(u.fresh && k in u.fresh));
    for (const k of freshDrop) delete this.freshBase[k];
    this.queue({ fn: "soft", target: u.id, args: [{ fields: JSON.parse(JSON.stringify(fields)), freshDrop }] });
  },
  /* 가끔 서버에서 새로 받는다(거래 성사 · 소식 · 재고) */
  async sync() {
    if (!this.token || this.pending.length || this.inflight) return;
    const r = await this.fetch("GET", "/api/me");
    if (r && r.ok) this.apply(r);
  },
  async trade(fn, args) {
    await this.settle();
    const r = await this.fetch("POST", "/api/trade", { fn, args });
    if (!r || !r.ok) return { ok: false, msg: (r && r.msg) || "서버가 답하지 않습니다." };
    this.apply(r);
    return r.result;
  },

  /* ---------- 게임에 끼우기 ---------- */
  install() {
    const N = this;
    Store.load = function () {
      this.data = { users: {}, session: null, chat: (this.data && this.data.chat) || [], stock: {} };
      this.ok = true;
      let t = null; try { t = localStorage.getItem(NET_KEY); } catch (e) {}
      if (!t) return;
      N.token = t;
      const r = N.xhr("GET", "/api/me");
      if (r && r.ok) { N.reset(); N.apply(r, true); }
      else if (r && r.net) { N.token = null; setTimeout(() => typeof toast === "function" && toast("서버에 닿지 않습니다. 서버를 켠 뒤 새로고침해 주세요.", "warn"), 500); }
    };
    Store.save = function () { N.softSoon(); if (typeof LevelUI !== "undefined") LevelUI.paint(); };
    Store.login = (id, pw) => { const r = N.auth("/api/login", { id, pw }); return r.ok ? null : r.msg || "로그인하지 못했습니다."; };
    Store.register = (id, pw, groups) => { const r = N.auth("/api/register", { id, pw, groups: Array.isArray(groups) ? groups : [groups] }); return r.ok ? null : r.msg || "등록하지 못했습니다."; };
    Store.guest = () => {
      const r = N.auth("/api/guest", {});
      if (!r.ok) { setTimeout(() => typeof toast === "function" && toast(r.msg || "서버에 닿지 않습니다.", "warn"), 0); return r.msg; }
      return null;
    };
    Store.logout = function () {
      N.softFlush(); const pend = N.pending.slice();
      if (pend.length) N.xhr("POST", "/api/ops", { cid: N.cid, ops: pend });
      if (N.token) N.fetch("POST", "/api/logout");
      N.setToken(null); N.reset();
    };
    for (const fn of NET_SYNC_OPS) {
      const orig = Store[fn]; if (typeof orig !== "function") continue;
      Store[fn] = function (...a) {
        if (N.depth || !N.token) return orig.apply(this, a);
        if (fn === "restock" || fn === "shopSet" || fn === "shopStock") return N.run({ fn, target: null, args: a });   // 대상 모험가가 없는 관리자 작업
        const u = a[0] || this.user();
        return N.run(N.op(fn, u, a.slice(1)));
      };
    }
    for (const fn of NET_ASYNC_OPS) {
      const orig = Store[fn]; if (typeof orig !== "function") continue;
      Store[fn] = function (...a) {
        if (N.depth || !N.token) return orig.apply(this, a);
        const u = a[0] || this.user();
        let r; N.depth++;
        try { r = orig.apply(this, a); } finally { N.depth--; }   // 이 기기에서 먼저(화면이 바로 바뀌게), 서버는 같은 작업을 다시 해 정본을 맞춘다
        N.queue(N.op(fn, u, a.slice(1)));
        return r;
      };
    }
    /* v3.39 보상은 서버가 정한다 (js/rewards.js). 이 기기에서는 조각 · 카드를 직접 늘리지 않고, 서버의 결과(스냅샷)로만 바뀐다 */
    /* 손님은 예전처럼 이 기기가 센 보상을 받는다(상점 · 거래 · 온라인 대전을 못 하므로) — 손님이 아니면 이 기기에서 늘리지 않는다 */
    { const ag = Store.addGold, gc = Store.grantCard;
      Store.addGold = function (u, n, why) { u = u || this.user(); if (!u) return 0; if (u.guest || N.depth) return ag.apply(this, arguments); return u.gold || 0; };
      Store.grantCard = function (u) { u = u || this.user(); if (u && (u.guest || N.depth)) return gc.apply(this, arguments); return true; }; }
    const srvRewards = () => { const u = Store.user(); return !!(u && !u.guest && N.token); };
    const curMid = () => (typeof G !== "undefined" && G && G.cfg && G.cfg.mid && App.screen === "game" ? G.cfg.mid : null);
    if (typeof startMatch === "function") {
      const sm0 = startMatch;
      startMatch = function (cfg) {
        try {
          const u = Store.user(), mode = cfg && !cfg.headless ? (cfg.pil ? "pil" : cfg.exp ? "exp" : cfg.online || cfg.mode === "online" ? "online" : cfg.mode === "ai" ? "ai" : null) : null;
          if (u && mode && srvRewards()) {
            const stage = cfg.pil && typeof Pilgrim !== "undefined" && Pilgrim.get() ? Pilgrim.get().stage : 0;
            const r = Store.matchStart(u, { mode, group: (cfg.p0 && cfg.p0.group) || App.lobbyGroup, stage });
            if (r && r.ok) { cfg.mid = r.id; if (r.verify && r.seed != null) { cfg.seed = r.seed; cfg.verify = true; } }   // v3.40 서버가 준 시드로 두고, 사람 쪽 수를 기록한다(G.vlog)
          }
        } catch (e) { console.warn(e); }
        return sm0.apply(this, arguments);
      };
    }
    if (typeof pachinkoRoll === "function") {
      const miss = { kind: "miss", gold: 0 }, pr0 = pachinkoRoll;
      pachinkoRoll = function () {
        const u = Store.user(); if (!u || !N.token) return miss;
        if (u.guest) return pr0();   // 손님: 이 기기에서 굴림
        const mid = curMid();
        const r = mid ? Store.matchArcade(u, mid, "slot", typeof roundOf === "function" ? roundOf(G.turn) : Math.ceil(G.turn / 2)) : Store.wheelSpin(u);
        if (!r || r.ok === false) { if (r && r.msg && typeof toast === "function") toast(r.msg, "warn"); return miss; }
        return r;
      };
    }
    if (typeof Crystal !== "undefined" && Crystal.water) {
      const w0 = Crystal.water;
      Crystal.water = function () {
        const mid = curMid(), u = Store.user();
        if (mid && u && this.can && this.can()) Store.matchArcade(u, mid, "water", this.round());
        return w0.apply(this, arguments);
      };
    }
    const endOf = g => {
      if (!g || !g.cfg || !g.cfg.mid || !N.token) return null;
      if (!g._srv) {
        const u = Store.user(), c = g.cfg;
        g._srv = u ? Store.matchEnd(u, c.mid, { won: g.winner === (g.online ? g.me : 0), turns: g.turn, broken: ((g.econ && g.econ.list) || []).map(b => b.id),
          log: g.vlog || null, p0: { cards: c.p0 && c.p0.cards }, p1: { group: c.p1 && c.p1.group, cards: c.p1 && c.p1.cards, ai: c.p1 && c.p1.ai } }) : null;   // v3.40 검산: 기록 · 두 덱
      }
      return g._srv && g._srv.ok !== false ? g._srv : null;
    };
    if (typeof onMatchEnd === "function") {
      const om0 = onMatchEnd;
      onMatchEnd = function (g) {
        const s = endOf(g);
        if (typeof Pilgrim !== "undefined") Pilgrim._srv = s;
        const u0 = Store.user(), sp = u0 && u0.spins;
        const r = om0.apply(this, arguments);
        if (s && u0) u0.spins = sp;   // 수레바퀴 표는 서버가 이미 넣었다 (이 기기의 +1은 되돌림)
        if (typeof Pilgrim !== "undefined") Pilgrim._srv = null;
        if (s && g.cfg.pil && typeof Pilgrim !== "undefined") { const p = Pilgrim.get(); if (p && !s.done) p.news = (p.news || []).filter(n => n.k !== "done"); }
        if (s && g.mode === "ai" && !g.cfg.pil && !g.cfg.exp) { g._reward = s.winCard || null; return g._reward; }
        return r;
      };
    }
    if (typeof Pilgrim !== "undefined" && Pilgrim._milestone) {
      const ml0 = Pilgrim._milestone;
      Pilgrim._milestone = function (u, p) {
        const s = Pilgrim._srv; if (!s) return ml0.apply(this, arguments);
        if (!p.claimed.includes(p.steps)) p.claimed.push(p.steps);
        for (const x of s.mile || []) p.news.push(x);   // 서버가 준 이정표 보상
      };
    }
    if (typeof econSettle === "function") {
      const es0 = econSettle;
      econSettle = function (g) {
        const s = endOf(g); if (!s || (g.econ && g.econ.settled)) return es0.apply(this, arguments);
        const L0 = econLucky; econLucky = () => s.lucky;   // 행운은 서버가 굴린 것
        let out; try { out = es0.apply(this, arguments); } finally { econLucky = L0; }
        if (out) {
          const lg = s.lucky && s.lucky.k === "gold" ? s.lucky.gold : 0;
          if (s.pending) Object.assign(out, { lucky: null, pending: true, skip: "서버가 판을 다시 두어 확인하고 있습니다 — 보상은 확인이 끝나면 들어옵니다." });   // v3.40 검산 중: 이 기기의 셈은 예상
          else Object.assign(out, { bonus: s.bonus, earned: s.brokenGold, pach: s.arcade || 0, lucky: s.lucky, total: s.brokenGold + s.bonus + (s.arcade || 0) + lg, skip: s.skip || null });
        }
        return out;
      };
    }
    /* v3.40 판 검산 결과(me.rewardLog)가 새로 오면 알림 */
    { const ap0 = N.apply.bind(N); let seen = null;
      N.apply = function (r, ...rest) {
        const out = ap0(r, ...rest), L = r && r.me && Array.isArray(r.me.rewardLog) ? r.me.rewardLog : null;
        if (L) {
          if (!seen) seen = new Set(L.map(x => x.id + ":" + x.at));
          for (const x of L) { const k = x.id + ":" + x.at; if (seen.has(k)) continue; seen.add(k);
            if (typeof toast !== "function") continue;
            if (!x.ok) { toast(`판 확인: ${x.msg || "보상 없음"}`, "warn"); continue; }
            const parts = [`+${typeof fmtGold === "function" ? fmtGold(x.gold) : x.gold}`];
            if (x.winCard && CARDS[x.winCard]) parts.push(`카드 「${CARDS[x.winCard].name}」`);
            if (x.lucky && x.lucky.k === "card" && CARDS[x.lucky.id]) parts.push(`행운 「${CARDS[x.lucky.id].name}」`);
            for (const m of x.mile || []) if (m.card && CARDS[m.card]) parts.push(`이정표 「${CARDS[m.card].name}」`);
            toast(`판 확인 완료 (${x.won ? "승리" : "패배"}) · ${parts.join(" · ")}`, "good");
          }
        }
        return out;
      }; }
    /* 교역소: 서버의 TradeLocal을 그대로 부른다 */
    const TradeHttp = {};
    for (const fn of ["board", "get", "mine", "held", "notices", "readAll", "create", "offer", "withdraw", "accept", "cancel", "forceEnd", "liveSettle"]) TradeHttp[fn] = (uid, ...a) => N.trade(fn, a);
    if (typeof TradeAPI !== "undefined") {
      TradeAPI.backend = TradeHttp;
      TradeAPI.unread = () => N.unread;
    }
    setInterval(() => this.sync(), 15000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) this.sync(); });
    addEventListener("pagehide", () => { this.softFlush(); if (this.pending.length && this.token) try { fetch(this.base + "/api/ops", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json", Authorization: "Bearer " + this.token }, body: JSON.stringify({ cid: this.cid, ops: this.pending }) }); } catch (e) {} });
    /* 로그인 화면에 서버 표시 · 관리자 보관소 안내 */
    if (typeof showLogin === "function") {
      const sl = showLogin;
      showLogin = function (...a) {
        const out = sl.apply(this, a);
        const box = document.querySelector(".gate-guest");
        if (box && !document.querySelector(".net-note")) box.insertAdjacentHTML("afterend", `<p class="net-note muted small" style="text-align:center;margin-top:10px">● 서버 연결됨 — 모험가 정보는 서버(${esc(N.base.replace(/^https?:\/\//, ""))})에 저장됩니다</p>`);
        return out;
      };
    }
  }
};

/* 서버에서 열렸는지 확인하고 온라인 모드를 켠다 (게임이 시작되기 전, 이 파일을 읽을 때) */
(function () {
  if (typeof location === "undefined") return;
  if (/[?&]offline\b/.test(location.search)) return;
  let base = null;
  try { base = localStorage.getItem(NET_SERVER_KEY); } catch (e) {}
  { const m = /[?&]server=([^&#]+)/.exec(location.search); if (m) base = decodeURIComponent(m[1]); }   // v3.37 PC 앱: 빌드 때 넣은 서버 주소 (desktop/main.js)
  if (!base && /^https?:$/.test(location.protocol)) base = location.origin;
  if (!base) return;
  base = base.replace(/\/+$/, "");
  const r = Net.xhr("GET", "/api/hello", null, base);
  if (!r || !r.etherion) return;   // 다른 웹 서버(예: 그냥 파일 서버)에서 열림 → 로컬 모드
  Net.on = true; Net.base = base; Net.info = r;
  Net.install();
})();

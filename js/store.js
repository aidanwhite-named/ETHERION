/* ETHERION — 로컬 저장소: 계정, 컬렉션, 덱, 채팅
   파일로 열면 브라우저 localStorage에 저장한다. v3.22: 서버(ETHERION 서버.bat)로 열면 js/net.js가 이 Store 함수들을 감싸 서버로 보내고,
   서버는 이 파일을 그대로 읽어(server/rules.js) 같은 규칙으로 처리한다. 그래서 Store에 새 함수를 만들면 서버에도 저절로 있다
   — 데이터를 바꾸는 함수라면 server/server.js의 OPS와 js/net.js의 NET_SYNC_OPS · NET_ASYNC_OPS에 이름을 넣는다(docs/SERVER.md). */
"use strict";

const ADMIN_ID = "admin";
const ADMIN_PW = "etherion";   // 로컬 시제품용. 실제 서비스에서는 서버 인증으로 교체할 것.
const STORE_KEY = "etherion.v3";   // v3: 덱이 진영이 아니라 단체(9개) 단위가 되면서 저장 형식을 새로 시작
/* 시험 모드: 로그인 화면을 건너뛰고 관리자(9개 단체 덱·모든 카드 보유)로 바로 들어간다. 정식 계정 흐름으로 돌리려면 false
   v1.4.4: false — 새 모험가는 고른 깃발(v3.23: 진영마다 하나까지, 1~3개)만 쓴다. 관리자는 admin / etherion으로 로그인한다 */
const OPEN_PLAY = false;
/* v2.1 손님 입장: 로그인 화면의 "로그인 없이 시작"으로 들어오는 계정. 등록·암호 없이 9개 단체 덱과 모든 카드를 쓴다.
   관리자와 달리 보관소·ADMIN 표시는 없다. 진행(승패·환석 조각)은 이 브라우저에 남는다 */
const GUEST_ID = "손님";

/* 신규 모험가의 보유 카드: 고른 단체의 기본 덱 40장 + 그 단체의 다른 카드 1장씩 */
function starterCollection(g) {
  const col = {};
  for (const k in STARTER_DECKS[g]) col[k] = STARTER_DECKS[g][k];
  for (const c of cardsOfGroup(g)) if (!c.special && !isHighGrade(c)) col[c.id] = Math.min(maxCopiesOf(c), Math.max(col[c.id] || 0, 1));   // v2.9 기본 덱 밖의 스페셜은 시작 카드에서 뺀다 (v3.2: 기본 덱의 유니크 · 스페셜 1장씩은 위에서 들어간다)
  return col;
}
/* v3.18 레어 이상(레어 · 에픽 · 유니크 · 스페셜)은 기본 덱에 든 것 말고는 시작 카드에 넣지 않는다 — 상점 · 원정 · 보상으로 얻는다 (docs/GRADES.md 2장) */
function isHighGrade(c) { return typeof gradeOf === "function" && GRADES[gradeOf(c)].rank >= 3; }
const starterDeckName = g => (typeof DECK_LISTS !== "undefined" && DECK_LISTS[g] ? DECK_LISTS[g].name : GROUPS[g].name + " 기본 덱");
const freshDeck = g => ({ name: starterDeckName(g), cards: Object.assign({}, STARTER_DECKS[g]), savedAt: Date.now() });

const Store = {
  data: { users: {}, session: null, chat: [] },
  ok: true,
  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) this.data = Object.assign({ users: {}, session: null, chat: [] }, JSON.parse(raw));
    } catch (e) { this.ok = false; }
  },
  save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); } catch (e) { this.ok = false; }
  },
  user() { return this.data.session ? this.data.users[this.data.session] : null; },
  isAdmin(u) { u = u || this.user(); return !!(u && u.admin); },
  isGuest(u) { u = u || this.user(); return !!(u && u.guest); },
  /* 모든 카드를 가진 계정(관리자 · 손님) */
  allCards(u) { u = u || this.user(); return !!(u && (u.admin || u.guest)); },

  /* 계정 */
  /* 새 모험가 (v1.4.4, v3.23): 깃발(단체)을 1~3개 무료로 고른다 — 진영마다 하나까지. 고른 단체의 덱만 쓸 수 있다.
     groups = [단체, …] (문자열 하나를 주면 그 단체 하나) */
  register(id, pw, groups) {
    id = (id || "").trim();
    groups = Array.isArray(groups) ? groups : [groups];
    if (id.length < 2 || id.length > 16) return "이름은 2~16자로 정해 주세요.";
    if (id.toLowerCase() === ADMIN_ID || id === GUEST_ID) return "이 이름은 쓸 수 없습니다.";
    if (this.data.users[id]) return "이미 있는 이름입니다. 로그인해 주세요.";
    if (!pw || pw.length < 2) return "암호는 2자 이상으로 정해 주세요.";
    groups = groups.filter((g, i) => groups.indexOf(g) === i);
    if (!groups.length) return "깃발을 하나 이상 골라 주세요. (최대 3개까지 무료)";
    if (groups.some(g => !GROUPS[g])) return "없는 깃발입니다. 다시 골라 주세요.";
    if (groups.length > 3) return "깃발은 3개까지 고를 수 있습니다.";
    if (Object.keys(FACTIONS).some(f => groups.filter(g => GROUPS[g].faction === f).length > 1)) return "한 진영에서는 깃발을 하나만 고를 수 있습니다.";
    const collection = {}, owned = {}, decks = {};
    for (const g of groups) { Object.assign(collection, starterCollection(g)); owned[g] = true; decks[g] = freshDeck(g); }
    this.data.users[id] = {
      id, pw, admin: false, created: Date.now(), group: groups[0],
      owned,
      collection,
      decks,
      stats: { w: 0, l: 0 }, gold: ECON.startGold
    };
    this.data.session = id;
    this.save();
    return null;
  },
  login(id, pw) {
    id = (id || "").trim();
    if (id.toLowerCase() === ADMIN_ID) {
      if (pw !== ADMIN_PW) return "관리자 암호가 맞지 않습니다.";
      if (!this.data.users[ADMIN_ID]) {
        const decks = {}, owned = {};
        for (const g of GROUP_IDS) { decks[g] = freshDeck(g); owned[g] = true; }
        this.data.users[ADMIN_ID] = { id: ADMIN_ID, pw: ADMIN_PW, admin: true, created: Date.now(), group: "B1", owned, collection: {}, decks, stats: { w: 0, l: 0 } };
      }
      this.data.session = ADMIN_ID; this.save(); return null;
    }
    const u = this.data.users[id];
    if (!u || u.guest) return "등록되지 않은 이름입니다. '새 모험가'로 등록하거나 '로그인 없이 시작'을 눌러 주세요.";
    if (u.pw !== pw) return "암호가 맞지 않습니다.";
    this.data.session = id; this.save(); return null;
  },
  /* 로그인 없이 시작: 손님 계정을 (없으면 만들고) 연다 */
  guest() {
    let u = this.data.users[GUEST_ID];
    if (!u) {
      const decks = {}, owned = {};
      for (const g of GROUP_IDS) { decks[g] = freshDeck(g); owned[g] = true; }
      u = this.data.users[GUEST_ID] = { id: GUEST_ID, pw: null, admin: false, guest: true, created: Date.now(), group: "B1", owned, collection: {}, decks, stats: { w: 0, l: 0 }, gold: ECON.startGold };
    }
    this.data.session = GUEST_ID; this.save(); return null;
  },
  logout() { this.data.session = null; this.save(); },
  /* 시험 모드: 관리자 세션이 아니면 관리자로 들어간다 */
  ensureOpen() { if (OPEN_PLAY && !this.isAdmin()) this.login(ADMIN_ID, ADMIN_PW); },

  /* 컬렉션: 관리자는 모든 카드를 최대 장수만큼 가진다 */
  ownedCount(u, cardId) { return this.allCards(u) ? maxCopiesOf(cardId) : Math.min(maxCopiesOf(cardId), u.collection[cardId] || 0); },
  ownsGroup(u, g) { return this.allCards(u) || !!u.owned[g]; },
  deck(u, g) {
    if (!u.decks[g] && this.ownsGroup(u, g)) u.decks[g] = freshDeck(g);
    return u.decks[g];
  },
  /* 기본 덱으로 되돌리기 (덱 조정실의 "기본 덱" 버튼) */
  starter(g) { return freshDeck(g); },
  /* 덱 검증: 저장 가능한 덱인지 */
  validateDeck(u, f, cards) {
    const n = countMap(cards);
    if (n < RULES.deckSize) return { ok: false, msg: `카드가 부족합니다. (${n} / ${RULES.deckSize}장)` };
    if (n > RULES.deckSize) return { ok: false, msg: `카드가 너무 많습니다. (${n} / ${RULES.deckSize}장)` };
    for (const id in cards) {
      const c = CARDS[id];
      if (!c || !deckable(c, f)) return { ok: false, msg: "다른 단체의 카드는 넣을 수 없습니다. 덱은 한 단체의 카드로만 만듭니다." };
      if (cards[id] > maxCopiesOf(c)) return { ok: false, msg: `같은 카드는 ${maxCopiesOf(c)}장까지입니다: ${c.name}` };
      if (cards[id] > this.ownedCount(u, id)) return { ok: false, msg: `보유하지 않은 카드가 있습니다: ${c.name}` };
    }
    return { ok: true };
  },
  saveDeck(u, f, cards, name) {
    const v = this.validateDeck(u, f, cards);
    if (!v.ok) return v;
    const clean = {}; for (const k in cards) if (cards[k] > 0) clean[k] = cards[k];
    u.decks[f] = { name: (name || "").trim() || GROUPS[f].name + " 덱", cards: clean, savedAt: Date.now() };
    if (u.drafts) delete u.drafts[f];   // v3.0 저장하면 초안은 덱이 된다
    this.save();
    return { ok: true };
  },
  /* v3.0 덱 초안: 덱 조정실에서 고치는 중인(아직 저장하지 않은) 덱. 상점에 다녀오거나 다른 화면에 가도 남는다.
     저장(saveDeck)하면 덱이 되고, 되돌리기(clearDraft)하면 지워진다. 대전에는 저장한 덱만 나간다 */
  draft(u, g) { return (u.drafts && u.drafts[g]) || null; },
  setDraft(u, g, cards, name) {
    const d = this.deck(u, g), clean = {};
    for (const k in cards) if (cards[k] > 0) clean[k] = cards[k];
    const same = (name || "") === (d.name || "") && JSON.stringify(Object.keys(clean).sort().map(k => [k, clean[k]])) === JSON.stringify(Object.keys(d.cards).filter(k => d.cards[k] > 0).sort().map(k => [k, d.cards[k]]));
    u.drafts = u.drafts || {};
    if (same) delete u.drafts[g]; else u.drafts[g] = { cards: clean, name: name || "", at: Date.now() };
    this.save();
  },
  clearDraft(u, g) { if (u.drafts && u.drafts[g]) { delete u.drafts[g]; this.save(); } },
  /* 상점에서 산 카드를 그 단체의 덱 초안에 넣는다 (40장 · 같은 카드 최대 장수 · 쓸 수 있는 장수 안에서).
     돌려주는 값: { g, added, why } — why: "full"(40장이 찼다) · "copies"(같은 카드 최대) · "group"(쓸 수 없는 단체) */
  draftAdd(u, id, n) {
    const c = CARDS[id]; if (!c) return { added: 0, why: "none" };
    const g = c.group;
    if (!GROUPS[g] || !this.ownsGroup(u, g)) return { g, added: 0, why: "group" };
    const cur = this.draft(u, g) || this.deck(u, g);
    const cards = Object.assign({}, cur.cards), inDeck = cards[id] || 0;
    const room = RULES.deckSize - countMap(cards), cap = Math.min(maxCopiesOf(c), this.ownedCount(u, id)) - inDeck;
    const add = Math.max(0, Math.min(n || 1, room, cap));
    if (add) { cards[id] = inDeck + add; this.setDraft(u, g, cards, cur.name); }
    return { g, added: add, why: add ? "" : room <= 0 ? "full" : "copies" };
  },
  deckPlayable(u, f) {
    const d = u.decks[f];
    return !!(d && this.ownsGroup(u, f) && this.validateDeck(u, f, d.cards).ok);
  },
  grantCard(u, cardId) {
    if (this.allCards(u)) return false;
    const now = u.collection[cardId] || 0;
    if (now >= maxCopiesOf(cardId)) return false;
    u.collection[cardId] = now + 1; this.save(); return true;
  },
  grantGroup(u, g) {
    if (u.owned[g]) return;
    u.owned[g] = true;
    const extra = starterCollection(g);
    for (const k in extra) u.collection[k] = Math.max(u.collection[k] || 0, extra[k]);
    u.decks[g] = freshDeck(g);
    this.save();
  },
  revokeGroup(u, g) {
    if (u.group === g) return;
    delete u.owned[g]; this.save();
  },
  /* 관리자 보관소 "모든 카드 지급": 보유한 단체의 모든 카드를 최대 장수만큼 (v3.22 서버가 같은 함수를 돌리도록 Store로 옮김) */
  grantAllCards(u) {
    for (const c of CARD_LIST) if (u.owned[c.group]) u.collection[c.id] = maxCopiesOf(c);
    this.save();
  }
};

/* 채팅 전송 계층. 지금은 로컬 루프백이다.
   서버를 붙일 때: connect()에서 WebSocket을 열고, send()에서 서버로 보내고, 받은 메시지는 receive()로 넘긴다. */
const ChatNet = {
  online: false,
  endpoint: null,          // 예: "wss://chat.etherion.example/lobby"
  listeners: [],
  channel: "lobby",
  connect() { this.online = false; },
  onMessage(fn) { this.listeners.push(fn); },
  send(text) {
    const u = Store.user(); if (!u) return;
    const msg = { id: Date.now() + Math.random(), ch: this.channel, from: u.id, admin: !!u.admin, text: String(text).slice(0, 300), at: Date.now(), local: true };
    // TODO(서버): 여기서 socket.send(JSON.stringify(msg)) 하고, 서버가 되돌려준 것을 receive로 받는다.
    this.receive(msg);
  },
  receive(msg) {
    Store.data.chat.push(msg);
    if (Store.data.chat.length > 200) Store.data.chat.splice(0, Store.data.chat.length - 200);
    Store.save();
    this.listeners.forEach(fn => fn(msg));
  },
  history() { return Store.data.chat.filter(m => m.ch === this.channel); }
};

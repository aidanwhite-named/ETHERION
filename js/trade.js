/* ETHERION v3.21 — 린데어 교역소: 모험가끼리 카드 · 조각을 맞바꾸는 곳 (사고파는 곳은 상점, js/shop.js)
   거래는 두 가지다.
   - 거래 게시판(올려 두는 거래): 내놓을 것(카드 · 조각)을 맡기고 기한을 정해 올린다. 다른 모험가가 자기 것을 맡기며 참여하고,
     기한이 지나면 저절로 성사된다.
       · 교환 제안: 원하는 것(카드 · 조각)을 적어 둔다. 조건을 채운 참여 중 가장 먼저 들어온 것이 기한에 성사된다.
         조건과 다른 제안도 받을 수 있고, 올린 사람은 기한 전에 아무 참여나 골라 바로 성사시킬 수 있다.
       · 경매: 시작가(조각)와 함께 꼭 내야 할 카드를 정할 수 있다. 더 높은 입찰이 들어오면 앞 입찰은 바로 돌려받고, 기한에 가장 높은 입찰이 가져간다.
   - 실시간 거래(js/trade-live.js): 방 코드로 친구와 이어 양쪽이 놓고, 둘 다 확인하면 바로 맞바꾼다.

   층 셋 — 서버가 생겨도 화면은 그대로 두려고 나눴다 (docs/TRADE_API.md).
   1) TradeAPI   화면이 부르는 유일한 창구. 모두 Promise를 돌려준다. 서버가 생기면 TradeAPI.backend만 TradeHttp로 바꾼다.
   2) TradeLocal 지금의 '서버 흉내'. 이 브라우저 저장소(Store.data.trade)를 서버 DB처럼 쓴다 — 같은 브라우저의 모든 모험가가 한 게시판을 본다.
                 사람 쪽 데이터(보유 카드 · 지갑)는 Store 확장(아래 escrow…)으로만 고친다. 서버에서는 이 파일의 TradeLocal 규칙을 서버가 그대로 맡는다.
   3) 화면       js/trade-ui.js (교역소 화면 · 거래 창)

   맡김(에스크로): 거래에 건 카드 · 조각은 올리거나 참여하는 순간 보유에서 빠져 교역소가 맡는다(덱 조정실 · 상점에서도 빠져 보인다).
   성사되면 상대에게 가고, 닫히거나 밀리면 돌려받는다. 저장한 덱 · 덱 초안에 든 장수는 걸 수 없다(덱이 깨지지 않게, Store.tradeable).
   받은 카드가 같은 카드 최대 장수를 넘으면 넘친 장수는 상점 값(shopPrice)의 조각으로 바뀐다. 거래로 오가는 조각은 경험치가 아니다(level.js noXp). */
"use strict";

const TRADE = {
  maxCards: 6,            // 한쪽에 거는 카드 장수 (모두 합쳐)
  maxShards: 1000000,
  maxOpen: 5,             // 한 모험가가 동시에 올려 둘 수 있는 거래
  minStart: 10,           // 경매 시작가 최소
  stepRate: 0.05,         // 경매: 다음 입찰은 최고가 + 5% (최소 10 조각)
  stepMin: 10,
  noteMax: 60,
  durations: [[10, "10분"], [60, "1시간"], [360, "6시간"], [1440, "1일"], [4320, "3일"]],   // 분
  defDur: 1440,
  keepClosed: 40,         // 닫힌 거래를 남겨 두는 수(내 거래 기록)
  noticeMax: 100
};

/* ---------- 거래 꾸러미: { cards: {카드ID: 장수}, shards: 조각 } ---------- */
const TA = {
  clean(a) {
    const cards = {};
    const src = (a && a.cards) || {};
    for (const id in src) { const k = Math.floor(+src[id] || 0); if (k > 0 && CARDS[id]) cards[id] = k; }
    let s = Math.floor(+((a && a.shards) || 0)); if (!isFinite(s) || s < 0) s = 0;
    return { cards, shards: Math.min(TRADE.maxShards, s) };
  },
  n(a) { return countMap(a.cards || {}); },
  empty(a) { return !TA.n(a) && !a.shards; },
  /* a가 want의 카드를 모두(장수까지) 담고 조각도 그 이상인가 */
  covers(a, want) {
    for (const id in want.cards) if ((a.cards[id] || 0) < want.cards[id]) return false;
    return a.shards >= want.shards;
  },
  key(a) { return JSON.stringify([Object.keys(a.cards).sort().map(k => [k, a.cards[k]]), a.shards]); },
  ids(a) { return Object.keys(a.cards); },
  /* 글로: 「불씨 수습생」 ×2 · 「참호 사격」 · 300 조각 */
  text(a) {
    const out = TA.ids(a).map(id => `「${CARDS[id] ? CARDS[id].name : id}」${a.cards[id] > 1 ? " ×" + a.cards[id] : ""}`);
    if (a.shards) out.push(fmtGold(a.shards));
    return out.join(" · ") || "없음";
  },
  /* 가장 높은 등급(거르기 · 테두리 빛) */
  topGrade(a) {
    let best = null;
    for (const id of TA.ids(a)) { const g = GRADES[gradeOf(CARDS[id])]; if (!best || g.rank > best.rank) best = g; }
    return best;
  }
};

/* ---------- Store 확장: 거래가 보유 카드 · 지갑을 고치는 유일한 곳 ---------- */
Object.assign(Store, {
  /* 거래할 수 없는 계정이면 까닭을 돌려준다. 관리자 · 손님은 '모든 카드를 가진 계정'이라 카드를 만들어 낼 수 있어 막는다 */
  tradeBlock(u) {
    u = u || this.user();
    if (!u) return "로그인이 필요합니다.";
    if (u.admin) return "관리자 계정은 모든 카드를 가진 계정이라 거래에 참여할 수 없습니다. 둘러보기와 시험 도구(지금 마감)만 쓸 수 있습니다.";
    if (u.guest) return "손님 계정은 모든 카드를 빌려 쓰는 계정이라 거래할 수 없습니다. '새 모험가'로 등록하면 거래할 수 있습니다.";
    return null;
  },
  draftUse(u, id) { const c = CARDS[id], d = c && u.drafts && u.drafts[c.group]; return d && d.cards ? d.cards[id] || 0 : 0; },
  /* 거래에 걸 수 있는 장수 = 보유 − (저장한 덱 · 덱 초안 중 더 많이 쓰는 장수) */
  tradeable(u, id) { const have = (u.collection || {})[id] || 0; return Math.max(0, have - Math.max(this.deckUse(u, id), this.draftUse(u, id))); },
  /* 맡길 수 있는지: null이면 된다 */
  escrowCheck(u, a) {
    const b = this.tradeBlock(u); if (b) return b;
    for (const id of TA.ids(a)) {
      const can = this.tradeable(u, id);
      if (a.cards[id] > can) {
        const inDeck = Math.max(this.deckUse(u, id), this.draftUse(u, id));
        return `걸 수 없는 카드: 「${CARDS[id].name}」 ${a.cards[id]}장 (거래 가능 ${can}장${inDeck ? ` · 덱에 ${inDeck}장` : ""}). 덱에 든 장수는 걸 수 없습니다.`;
      }
    }
    if (a.shards > this.gold(u)) return `환석 조각이 부족합니다. (${fmtGold(a.shards)} 필요, 지갑 ${fmtGold(this.gold(u))})`;
    return null;
  },
  /* 맡기기: 보유에서 뺀다(escrowCheck를 먼저 통과한 것만) */
  escrowTake(u, a, why) {
    for (const id of TA.ids(a)) {
      u.collection[id] = (u.collection[id] || 0) - a.cards[id];
      if (u.collection[id] <= 0) { delete u.collection[id]; if (u.fresh) delete u.fresh[id]; }
    }
    if (a.shards) this.addGold(u, -a.shards, why); else this.save();
  },
  /* 주기 · 돌려주기: 보유에 넣는다. 같은 카드 최대 장수를 넘는 장수는 상점 값의 조각으로. 새로 들어온 카드는 NEW(u.fresh) */
  escrowGive(u, a, why, fresh) {
    let extra = 0; const over = [];
    for (const id of TA.ids(a)) {
      const c = CARDS[id], have = u.collection[id] || 0, room = Math.max(0, maxCopiesOf(c) - have), put = Math.min(room, a.cards[id]);
      if (put) { u.collection[id] = have + put; if (fresh) { u.fresh = u.fresh || {}; u.fresh[id] = Date.now(); } }
      if (a.cards[id] > put) { const k = a.cards[id] - put; over.push({ id, n: k }); extra += k * shopPrice(c); }
    }
    const sh = a.shards + extra;
    if (sh) this.addGold(u, sh, why + (extra ? ` (최대 장수 넘침 ${fmtGold(extra)})` : "")); else this.save();
    return { extra, over };
  }
});

/* ---------- 서버 흉내 ----------
   거래(listing)  { id, owner, kind: "offer"|"auction", created, ends, note,
                   give: 꾸러미(맡겨 둠), want: 꾸러미(교환 제안 = 희망 조건, 경매 = 꼭 낼 카드 + 시작가), step,
                   offers: [{ id, by, at, cards, shards, meets, state: "open"|"out"|"withdrawn"|"won"|"lost" }],
                   state: "open"|"done"|"expired"|"cancelled", closed, result: { oid, by, why } }
   소식(notice)   { id, at, kind, text, lid, read } — 모험가마다
   모든 함수의 첫 인자 uid = 요청한 모험가(서버에서는 로그인 토큰이 대신한다). 돌려주는 값은 { ok, msg?, … }. */
const TradeLocal = {
  db() {
    const d = Store.data;
    if (!d.trade || d.trade.v !== 1) d.trade = { v: 1, seq: 1, listings: {}, notices: {}, live: {} };
    return d.trade;
  },
  now() { return Date.now(); },
  user(uid) { return uid ? Store.data.users[uid] || null : null; },
  copy(x) { return JSON.parse(JSON.stringify(x)); },
  fail(msg) { return { ok: false, msg }; },
  name(uid) { return uid || "?"; },
  notify(uid, kind, text, lid) {
    const db = this.db(), box = db.notices[uid] = db.notices[uid] || [];
    box.push({ id: db.seq++, at: this.now(), kind, text, lid: lid || null, read: false });
    if (box.length > TRADE.noticeMax) box.splice(0, box.length - TRADE.noticeMax);
  },
  bestOf(L) {
    let b = null;
    for (const o of L.offers) if (o.state === "open" && (!b || o.shards > b.shards || (o.shards === b.shards && o.at < b.at))) b = o;
    return b;
  },
  minBid(L) {
    const b = this.bestOf(L);
    if (!b) return Math.max(L.want.shards, 0);
    return b.shards + Math.max(TRADE.stepMin, Math.ceil(b.shards * TRADE.stepRate / 10) * 10);
  },
  /* 화면에 보낼 모습: 원본을 건드리지 못하게 복사하고, 계산한 값을 붙인다 */
  view(L, uid) {
    const v = this.copy(L), best = L.kind === "auction" ? this.bestOf(L) : null;
    v.left = Math.max(0, L.ends - this.now());
    v.mine = L.owner === uid;
    v.open = v.offers.filter(o => o.state === "open").length;
    v.myOffer = v.offers.find(o => o.by === uid && o.state === "open") || null;
    v.joined = v.offers.some(o => o.by === uid);
    v.best = best ? this.copy(best) : null;
    v.minBid = L.kind === "auction" ? this.minBid(L) : null;
    v.top = (TA.topGrade(L.give) || {}).id || null;
    return v;
  },

  /* 기한이 지난 거래를 정산한다 (서버에서는 시계 작업이 맡는다). 무엇이든 부르기 전에 먼저 돈다 */
  sweep() {
    const db = this.db(), now = this.now(); let n = 0;
    for (const id in db.listings) { const L = db.listings[id]; if (L.state === "open" && L.ends <= now) { this.close(L, "deadline"); n++; } }
    if (n) this.prune();
    if (n) Store.save();
    return n;
  },
  prune() {
    const db = this.db(), closed = Object.values(db.listings).filter(L => L.state !== "open").sort((a, b) => b.closed - a.closed);
    for (const L of closed.slice(TRADE.keepClosed * 4)) delete db.listings[L.id];
  },
  /* 거래 닫기. why: "accept"(올린 사람이 골라 성사) · "deadline"(기한) · "cancel"(내림). oid: 고른 참여 */
  close(L, why, oid) {
    const owner = this.user(L.owner), open = L.offers.filter(o => o.state === "open");
    let win = null;
    if (why === "accept") win = open.find(o => o.id === oid) || null;
    else if (why === "deadline") win = L.kind === "auction" ? this.bestOf(L) : open.filter(o => o.meets).sort((a, b) => a.at - b.at)[0] || null;
    const tag = `#${L.id}`;
    if (win) {
      const winner = this.user(win.by), got = TA.clean(win), gave = TA.clean(L.give);
      const r1 = Store.escrowGive(owner, got, `거래 받음 ${tag}`, true);
      const r2 = Store.escrowGive(winner, gave, `거래 받음 ${tag}`, true);
      win.state = "won";
      for (const o of open) if (o !== win) { o.state = "lost"; Store.escrowGive(this.user(o.by), TA.clean(o), `거래 돌려받음 ${tag}`); this.notify(o.by, "lost", `${L.kind === "auction" ? "경매" : "교환 제안"} ${tag} — ${this.name(win.by)}님과 성사되어 맡긴 것을 돌려받았습니다: ${TA.text(TA.clean(o))}`, L.id); }
      L.state = "done"; L.result = { oid: win.id, by: win.by, why };
      const how = why === "accept" ? "올린 사람이 골라" : L.kind === "auction" ? "경매 마감으로" : "기한이 되어";
      const ov = r => r.over.length ? ` (최대 장수를 넘은 ${r.over.map(x => `「${CARDS[x.id].name}」 ${x.n}장`).join(" · ")}은 ${fmtGold(r.extra)}으로)` : "";
      this.notify(L.owner, "done", `거래 성사 ${tag} — ${how} ${this.name(win.by)}님과 맞바꿨습니다. 내줌: ${TA.text(gave)} / 받음: ${TA.text(got)}${ov(r1)}`, L.id);
      this.notify(win.by, "done", `거래 성사 ${tag} — ${how} ${this.name(L.owner)}님과 맞바꿨습니다. 내줌: ${TA.text(got)} / 받음: ${TA.text(gave)}${ov(r2)}`, L.id);
    } else {
      Store.escrowGive(owner, TA.clean(L.give), `거래 돌려받음 ${tag}`);
      for (const o of open) { o.state = "lost"; Store.escrowGive(this.user(o.by), TA.clean(o), `거래 돌려받음 ${tag}`); this.notify(o.by, "lost", `거래 ${tag} — ${why === "cancel" ? "올린 사람이 내려" : "성사되지 않고 닫혀"} 맡긴 것을 돌려받았습니다: ${TA.text(TA.clean(o))}`, L.id); }
      L.state = why === "cancel" ? "cancelled" : "expired";
      L.result = { oid: null, by: null, why };
      this.notify(L.owner, why === "cancel" ? "cancel" : "expired", why === "cancel" ? `거래 ${tag} — 내렸습니다. 맡긴 것을 돌려받았습니다: ${TA.text(TA.clean(L.give))}` : `거래 ${tag} — 기한까지 성사되지 않아 닫혔습니다. ${L.kind === "offer" && open.length ? "조건을 채운 참여가 없었습니다. " : ""}맡긴 것을 돌려받았습니다.`, L.id);
    }
    L.closed = this.now();
  },

  /* ----- 읽기 ----- */
  board(uid, q) {
    this.sweep(); q = q || {};
    const list = Object.values(this.db().listings).filter(L => L.state === "open" && (!q.kind || L.kind === q.kind));
    return { ok: true, list: list.map(L => this.view(L, uid)), now: this.now() };
  },
  get(uid, lid) {
    this.sweep();
    const L = this.db().listings[lid]; if (!L) return this.fail("없는 거래입니다.");
    return { ok: true, listing: this.view(L, uid), now: this.now() };
  },
  /* 내가 올렸거나 참여한 거래 (닫힌 것은 최근 TRADE.keepClosed개) */
  mine(uid) {
    this.sweep();
    const all = Object.values(this.db().listings).filter(L => L.owner === uid || L.offers.some(o => o.by === uid));
    const open = all.filter(L => L.state === "open"), closed = all.filter(L => L.state !== "open").sort((a, b) => b.closed - a.closed).slice(0, TRADE.keepClosed);
    return { ok: true, open: open.map(L => this.view(L, uid)), closed: closed.map(L => this.view(L, uid)), now: this.now() };
  },
  /* 지금 맡겨 둔 것 모두 (올린 거래의 내놓은 것 + 열린 참여) */
  held(uid) {
    this.sweep();
    const out = { cards: {}, shards: 0 };
    const add = a => { for (const id in a.cards) out.cards[id] = (out.cards[id] || 0) + a.cards[id]; out.shards += a.shards; };
    for (const L of Object.values(this.db().listings)) {
      if (L.state !== "open") continue;
      if (L.owner === uid) add(L.give);
      for (const o of L.offers) if (o.by === uid && o.state === "open") add(o);
    }
    return { ok: true, held: out };
  },
  notices(uid) { this.sweep(); return { ok: true, list: this.copy((this.db().notices[uid] || []).slice().reverse()) }; },
  readAll(uid) { for (const n of this.db().notices[uid] || []) n.read = true; Store.save(); return { ok: true }; },

  /* ----- 쓰기 ----- */
  create(uid, spec) {
    this.sweep();
    const u = this.user(uid), b = Store.tradeBlock(u); if (b) return this.fail(b);
    spec = spec || {};
    const kind = spec.kind === "auction" ? "auction" : "offer";
    const give = TA.clean(spec.give), want = TA.clean(spec.want);
    const dur = TRADE.durations.find(d => d[0] === +spec.minutes) ? +spec.minutes : TRADE.defDur;
    const db = this.db();
    if (Object.values(db.listings).filter(L => L.owner === uid && L.state === "open").length >= TRADE.maxOpen) return this.fail(`거래는 한 번에 ${TRADE.maxOpen}개까지 올려 둘 수 있습니다.`);
    if (!TA.n(give) && kind === "auction") return this.fail("경매에는 카드를 한 장 이상 올려야 합니다.");
    if (TA.empty(give)) return this.fail("내놓을 카드나 조각을 넣어 주세요.");
    if (TA.n(give) > TRADE.maxCards || TA.n(want) > TRADE.maxCards) return this.fail(`한쪽에 카드는 ${TRADE.maxCards}장까지입니다.`);
    if (TA.ids(want).some(id => give.cards[id])) return this.fail("같은 카드를 내놓으면서 원할 수는 없습니다.");
    if (kind === "offer" && TA.empty(want) && !spec.open) return this.fail("원하는 카드나 조각을 적어 주세요. (조건 없이 제안만 받으려면 '조건 없이 제안 받기'를 켜세요)");
    if (kind === "offer" && !TA.n(give) && !TA.n(want)) return this.fail("조각만 서로 바꿀 수는 없습니다. 어느 한쪽에 카드를 넣어 주세요.");
    if (kind === "auction" && want.shards < TRADE.minStart) return this.fail(`경매 시작가는 ${fmtGold(TRADE.minStart)} 이상입니다.`);
    const e = Store.escrowCheck(u, give); if (e) return this.fail(e);
    const id = "T" + db.seq++, now = this.now();
    Store.escrowTake(u, give, `거래 맡김 #${id}`);
    db.listings[id] = { id, owner: uid, kind, created: now, ends: now + dur * 60000, minutes: dur, note: String(spec.note || "").trim().slice(0, TRADE.noteMax),
      give, want, openWant: kind === "offer" && TA.empty(want), offers: [], state: "open", closed: null, result: null };
    Store.save();
    return { ok: true, listing: this.view(db.listings[id], uid) };
  },
  offer(uid, lid, assets) {
    this.sweep();
    const L = this.db().listings[lid], u = this.user(uid);
    if (!L || L.state !== "open") return this.fail("이미 닫힌 거래입니다.");
    if (L.owner === uid) return this.fail("내가 올린 거래에는 참여할 수 없습니다.");
    const b = Store.tradeBlock(u); if (b) return this.fail(b);
    const a = TA.clean(assets);
    if (TA.empty(a)) return this.fail("맡길 카드나 조각을 넣어 주세요.");
    if (TA.n(a) > TRADE.maxCards) return this.fail(`카드는 ${TRADE.maxCards}장까지입니다.`);
    if (L.kind === "auction") {
      if (!TA.covers({ cards: a.cards, shards: Infinity }, L.want)) return this.fail("이 경매에 꼭 함께 내야 할 카드가 빠졌습니다.");
      const need = this.minBid(L), best = this.bestOf(L);
      if (best && best.by === uid) return this.fail("이미 최고 입찰입니다.");
      if (a.shards < need) return this.fail(`입찰은 ${fmtGold(need)} 이상이어야 합니다.`);
    }
    const tag = `#${L.id}`, prev = L.offers.find(o => o.by === uid && o.state === "open");
    if (prev) Store.escrowGive(u, TA.clean(prev), `거래 돌려받음 ${tag} (새 참여로 바꿈)`);
    const e = Store.escrowCheck(u, a);
    if (e) { if (prev) Store.escrowTake(u, TA.clean(prev), `거래 맡김 ${tag}`); return this.fail(e); }
    if (prev) prev.state = "withdrawn";
    if (L.kind === "auction") {
      const best = this.bestOf(L);
      if (best) { best.state = "out"; Store.escrowGive(this.user(best.by), TA.clean(best), `거래 돌려받음 ${tag} (더 높은 입찰)`); this.notify(best.by, "out", `경매 ${tag} — 더 높은 입찰(${fmtGold(a.shards)})이 들어와 맡긴 것을 돌려받았습니다: ${TA.text(TA.clean(best))}`, L.id); }
    }
    Store.escrowTake(u, a, `거래 맡김 ${tag}`);
    const o = { id: L.id + "-" + (L.offers.length + 1), by: uid, at: this.now(), cards: a.cards, shards: a.shards, meets: !L.openWant && TA.covers(a, L.want), state: "open" };
    L.offers.push(o);
    this.notify(L.owner, "join", L.kind === "auction" ? `경매 ${tag}에 ${uid}님이 ${fmtGold(a.shards)}으로 입찰했습니다.` : `교환 제안 ${tag}에 ${uid}님이 ${o.meets ? "조건을 채워" : "다른 제안으로"} 참여했습니다: ${TA.text(a)}`, L.id);
    Store.save();
    return { ok: true, listing: this.view(L, uid), offer: this.copy(o) };
  },
  withdraw(uid, lid) {
    this.sweep();
    const L = this.db().listings[lid];
    if (!L || L.state !== "open") return this.fail("이미 닫힌 거래입니다.");
    const o = L.offers.find(x => x.by === uid && x.state === "open"); if (!o) return this.fail("거둘 참여가 없습니다.");
    if (L.kind === "auction") return this.fail("경매의 최고 입찰은 거둘 수 없습니다. 더 높은 입찰이 들어오면 저절로 돌려받습니다.");
    o.state = "withdrawn";
    Store.escrowGive(this.user(uid), TA.clean(o), `거래 돌려받음 #${L.id} (거둠)`);
    Store.save();
    return { ok: true, listing: this.view(L, uid) };
  },
  accept(uid, lid, oid) {
    this.sweep();
    const L = this.db().listings[lid];
    if (!L || L.state !== "open") return this.fail("이미 닫힌 거래입니다.");
    if (L.owner !== uid) return this.fail("올린 사람만 고를 수 있습니다.");
    const o = L.offers.find(x => x.id === oid && x.state === "open"); if (!o) return this.fail("그 참여는 이미 거둬졌습니다.");
    if (L.kind === "auction" && o !== this.bestOf(L)) return this.fail("경매는 최고 입찰만 받을 수 있습니다.");
    this.close(L, "accept", oid); Store.save();
    return { ok: true, listing: this.view(L, uid) };
  },
  cancel(uid, lid) {
    this.sweep();
    const L = this.db().listings[lid];
    if (!L || L.state !== "open") return this.fail("이미 닫힌 거래입니다.");
    if (L.owner !== uid) return this.fail("올린 사람만 내릴 수 있습니다.");
    if (L.kind === "auction" && this.bestOf(L)) return this.fail("입찰이 들어온 경매는 내릴 수 없습니다. 지금 받으려면 '최고 입찰 받기'를 누르세요.");
    this.close(L, "cancel"); Store.save();
    return { ok: true, listing: this.view(L, uid) };
  },
  /* 관리자 시험 도구: 기한을 지금으로 당긴다 */
  forceEnd(uid, lid) {
    const u = this.user(uid); if (!u || !u.admin) return this.fail("관리자만 쓸 수 있습니다.");
    const L = this.db().listings[lid]; if (!L || L.state !== "open") return this.fail("이미 닫힌 거래입니다.");
    L.ends = this.now(); this.sweep();
    return { ok: true, listing: this.view(L, uid) };
  },

  /* ----- 실시간 거래의 반영 -----
     서버 없이 두 기기가 바로 이어진 지금은 각 기기가 자기 쪽만 반영한다(내준 것 빼고 받은 것 넣기).
     서버가 생기면 서버가 방이 되어 양쪽을 한 번에 바꾼다(docs/TRADE_API.md 4장). */
  liveSettle(uid, give, get, peer, key) {
    const u = this.user(uid), b = Store.tradeBlock(u); if (b) return this.fail(b);
    give = TA.clean(give); get = TA.clean(get);
    if (TA.n(give) > TRADE.maxCards || TA.n(get) > TRADE.maxCards) return this.fail(`한쪽에 카드는 ${TRADE.maxCards}장까지입니다.`);
    const db = this.db(), done = db.live[uid] = db.live[uid] || [];
    if (key && done.some(x => x.key === key)) return this.fail("이미 반영한 거래입니다.");
    const e = Store.escrowCheck(u, give); if (e) return this.fail(e);
    const id = "L" + db.seq++, tag = `#${id}`;
    Store.escrowTake(u, give, `거래(실시간) 내줌 ${tag}`);
    const r = Store.escrowGive(u, get, `거래(실시간) 받음 ${tag}`, true);
    done.push({ id, key: key || null, at: this.now(), peer: String(peer || "").slice(0, 16), give, get });
    if (done.length > TRADE.keepClosed) done.splice(0, done.length - TRADE.keepClosed);
    this.notify(uid, "done", `실시간 거래 ${tag} — ${peer}님과 맞바꿨습니다. 내줌: ${TA.text(give)} / 받음: ${TA.text(get)}${r.over.length ? ` (최대 장수를 넘은 카드는 ${fmtGold(r.extra)}으로)` : ""}`);
    Store.save();
    return { ok: true, id, over: r.over, extra: r.extra };
  }
};

/* ---------- 화면이 부르는 창구 ----------
   지금: backend = TradeLocal (같은 기기 안에서 바로 처리).
   서버가 생기면: backend = TradeHttp — 같은 이름의 함수가 fetch로 서버에 묻고, 응답의 내 보유 · 지갑 변화를 Store에 반영한다.
   화면은 TradeAPI만 부르고 응답을 기다리므로(await) 바꿀 것이 없다. 요청 · 응답 모양은 docs/TRADE_API.md */
const TradeAPI = {
  backend: TradeLocal,
  me() { const u = Store.user(); return u ? u.id : null; },
  call(fn, ...a) {
    return new Promise(res => {
      let r;
      try { r = this.backend[fn](this.me(), ...a); }
      catch (e) { console.error(e); r = { ok: false, msg: "거래 처리 중 문제가 생겼습니다." }; }
      res(r);
    });
  },
  board(q) { return this.call("board", q); },
  get(lid) { return this.call("get", lid); },
  mine() { return this.call("mine"); },
  held() { return this.call("held"); },
  notices() { return this.call("notices"); },
  readAll() { return this.call("readAll"); },
  create(spec) { return this.call("create", spec); },
  offer(lid, assets) { return this.call("offer", lid, assets); },
  withdraw(lid) { return this.call("withdraw", lid); },
  accept(lid, oid) { return this.call("accept", lid, oid); },
  cancel(lid) { return this.call("cancel", lid); },
  forceEnd(lid) { return this.call("forceEnd", lid); },
  liveSettle(give, get, peer, key) { return this.call("liveSettle", give, get, peer, key); },
  /* 안 읽은 소식 수 — 상단 띠 '교역소' 옆 점. 서버 시대에는 로그인 때 받은 값을 쓴다(동기 함수라 지금 값만) */
  unread() { const id = this.me(); if (!id || !Store.data.trade) return 0; return (Store.data.trade.notices[id] || []).filter(n => !n.read).length; },
  /* 기한 정산을 가끔 돌린다(교역소 밖에서도 소식이 쌓이게). 서버 시대에는 서버 시계가 맡고, 여기서는 소식만 받아 온다 */
  tick() { try { if (this.backend === TradeLocal && TradeLocal.sweep() && typeof TradeUI !== "undefined") TradeUI.badge(); } catch (e) { console.error(e); } }
};

document.addEventListener("DOMContentLoaded", () => {
  TradeAPI.tick();
  setInterval(() => TradeAPI.tick(), 20000);
});

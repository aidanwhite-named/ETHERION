/* ETHERION v3.39 — 서버가 정하는 보상 (서버 규칙 묶음 server/rules.js EXTRA에 들어간다 · 게임에서는 서버 모드일 때 js/net.js가 부른다)
   예전에는 판이 끝나면 기기가 "조각 N개 · 카드 X를 받았다"고 서버에 알리고 서버는 그대로 믿었다(addGold · grantCard trust).
   이제 기기는 무슨 일이 있었는지(이겼나 · 몇 턴 · 어떤 카드가 부서졌나 · 몇 라운드에 파친코를 돌렸나)만 알리고,
   조각과 카드의 양 · 추첨은 모두 서버가 이 파일의 규칙(게임과 같은 ECON · PILGRIM 값)으로 정한다. 서버는 기기가 보낸 addGold · grantCard를 받지 않는다.
   남은 한계: 승패 · 부서진 카드는 아직 기기의 말이다(판을 서버가 다시 돌려 보지는 않음). 그래서 판마다 상한 · 최소 시간 · 하루 상한을 둔다(REWARD). */
"use strict";
if (typeof pick === "undefined") globalThis.pick = a => a[Math.floor(Math.random() * a.length)];   // 서버에는 view.js가 없다
const REWARD = {
  minMs: 15000, perTurnMs: 2500,   // 판의 최소 시간: 15초 + 턴마다 2.5초 (빨리 끝낸 척한 판은 보상 없음)
  maxTurns: 80, maxBroken: 80,     // 한 판에 셀 수 있는 턴 · 부서진 카드 상한
  dailyMatches: 80,                // 하루에 보상을 받는 판 수 (넘으면 기록만)
  keepMs: 6 * 3600e3,              // 끝내지 않은 판은 6시간 뒤에 지운다
  crystal: 300, crystalTurns: 5,   // 결정 키우기 (js/minigames.js ARCADE_PRIZE와 같은 값)
  /* v3.44 작은 게임 · 판 시작을 판 밖에서 몰아 부르던 구멍 막기 */
  roundMs: 5000,                   // 라운드 N의 작은 게임은 판을 시작하고 (N−1) × 5초가 지나야 (판을 두지 않고 1~80라운드를 한꺼번에 부르면 거절)
  arcadeDaily: 3000,               // 하루에 작은 게임(파친코 · 결정)으로 받는 조각 상한 (넘으면 꽝)
  dailyStarts: 200,                // 하루에 시작할 수 있는 판
  pairMs: 10 * 60e3,               // 온라인 대전: 상대의 판 끝 보고를 기다리는 시간 (안 오면 보상 없음)
  pairDaily: 5                     // 온라인 대전: 같은 상대와 하루에 보상을 받는 판 수 (두 계정끼리 짜고 치기 막기)
};
/* v3.44 원정의 판 규칙: 용 · 빈 자리의 규칙(js/expedition.js) 가운데 하나여야 한다 (서버 검산에 그대로 넣는다) */
function rewardExpRule(r) {
  const core = {}; if (r && typeof r === "object") for (const k of Object.keys(r)) if (!["name", "text", "who"].includes(k)) core[k] = r[k];
  const okRules = [{}].concat(typeof DRAGONS !== "undefined" ? Object.values(DRAGONS).map(d => d.rule) : [], typeof VOID_SEAT !== "undefined" ? [VOID_SEAT.rule] : []);
  const key = o => JSON.stringify(Object.keys(o).sort().map(k => [k, o[k]]));
  const hit = okRules.find(o => key(o) === key(core));
  return hit ? Object.assign({}, hit, r && typeof r === "object" ? { name: String(r.name || "").slice(0, 30), text: String(r.text || "").slice(0, 120), who: String(r.who || "").slice(0, 30) } : {}) : null;
}
/* 오늘 셈 (u.rewardDay: 서버만 바꿈) */
function rewardToday(u, t) {
  const day = pilDayKey(t || Date.now());
  if (!u.rewardDay || u.rewardDay.day !== day) u.rewardDay = { day, n: 0 };
  const c = u.rewardDay; c.starts = c.starts || 0; c.arcade = c.arcade || 0; c.pairs = c.pairs || {};
  return c;
}
const roundOfTurn = t => Math.ceil(t / 2);   // js/game.js roundOf와 같은 셈 (서버에는 game.js가 없다)
const rewardRid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
/* 행운 · 파친코 결과를 실제로 준다 (서버에서만) */
function rewardPach(u, res, why) {
  if (!res || res.kind === "miss") return res;
  if (res.kind === "card") { if (!Store.allCards(u) && !Store.grantCard(u, res.card)) { res.gold = shopPrice(res.card); Store.addGold(u, res.gold, why + ": 이미 다 가진 카드"); } }
  else if (res.gold) Store.addGold(u, res.gold, why);
  return res;
}
/* v3.54 운명의 구슬(js/fusion.js ORB): 파친코 · 수레바퀴 한 번마다 서버가 따로 굴린다. 하루 ORB.daily개까지, 필멸자 · 관리자는 없음.
   전장 파친코에서 얻은 것은 판 기록(m.orb)에 남겨, 판이 실제로 간 라운드보다 뒤를 불렀으면 _settle이 되돌린다 */
function rewardOrb(u, today, why, m) {
  if (typeof ORB === "undefined" || !u || u.guest || u.admin || !Store.addOrbs) return 0;
  if ((today.orbs || 0) >= ORB.daily || Math.random() >= ORB.p) return 0;
  today.orbs = (today.orbs || 0) + 1;
  Store.addOrbs(u, 1, why);
  if (m) m.orb = (m.orb || 0) + 1;
  return 1;
}
Object.assign(Store, {
  _matches() {
    const D = this.data.matches = this.data.matches || {}, now = Date.now();
    for (const id in D) if (now - D[id].at > REWARD.keepMs) delete D[id];
    return D;
  },
  /* 판 시작: 서버가 판 번호를 준다. info = { mode: "ai"|"pil"|"exp"|"online", group, stage } */
  matchStart(u, info) {
    u = u || this.user(); if (!u) return { ok: false, msg: "모험가가 없습니다." };
    info = info || {};
    const D = this._matches(), mine = Object.keys(D).filter(k => D[k].uid === u.id && !D[k].end).sort((a, b) => D[a].at - D[b].at);
    const today = rewardToday(u);
    if (!u.guest && today.starts >= REWARD.dailyStarts) return { ok: false, msg: `오늘 시작할 수 있는 판(${REWARD.dailyStarts}판)을 다 썼습니다.` };   // v3.44
    today.starts++;
    while (mine.length >= 3) delete D[mine.shift()];   // 끝내지 않은 판은 셋까지
    const id = rewardRid();
    const mode = ["ai", "pil", "exp", "online"].includes(info.mode) ? info.mode : "ai";
    const verify = !u.guest && (mode === "ai" || mode === "pil" || mode === "exp");   // v3.40 컴퓨터와 대전 · 순례는 서버가 판을 다시 돌려 검산한다 · v3.44 원정도
    const trial = !!info.trial && (mode === "ai" || mode === "online") && typeof trialDeckOf === "function" && trialDeckOf(u) && trialDeckOf(u).group === info.group;   // v3.48 친구 초대 체험 덱
    D[id] = { uid: u.id, mode, trial, group: GROUPS[info.group] ? info.group : u.group,
      stage: Math.max(0, Math.min(20, +info.stage || 0)), at: Date.now(), slot: {}, water: [], arcade: 0,
      seed: verify ? (Math.random() * 4294967296) >>> 0 : null };
    this.save();
    return { ok: true, id, seed: D[id].seed, verify };
  },
  _match(u, id) { const m = this._matches()[id]; return m && m.uid === u.id && !m.end ? m : null; },
  /* 전장의 작은 게임: kind "slot"(파친코, 라운드마다 한 번) · "water"(결정 키우기에 물 — 다섯 라운드 이어지면 서버가 준다) */
  matchArcade(u, id, kind, round) {
    u = u || this.user(); const m = u && this._match(u, id); round = Math.floor(+round || 0);
    if (!m) return { ok: false, msg: "끝났거나 없는 판입니다." };
    if (round < 1 || round > REWARD.maxTurns) return { ok: false, msg: "라운드가 올바르지 않습니다." };
    if (!u.guest && Date.now() - m.at < (round - 1) * REWARD.roundMs) return { ok: false, msg: "아직 그 라운드가 아닙니다." };   // v3.44 판을 두지 않고 몰아 부르기 막기
    const today = rewardToday(u), full = !u.guest && today.arcade >= REWARD.arcadeDaily;
    m.top = Math.max(m.top || 0, round);
    if (kind === "slot") {
      if (m.slot[round]) return { ok: false, msg: "이 라운드에는 이미 돌렸습니다." };
      m.slot[round] = 1;
      if (full) { this.save(); return { ok: true, kind: "miss", gold: 0, cap: true }; }
      const res = rewardPach(u, pachinkoRoll(), "파친코");
      if (rewardOrb(u, today, "파친코: " + (typeof ORB !== "undefined" ? ORB.name : ""), m)) res.orb = 1;   // v3.54
      m.arcade += res && res.gold || 0; today.arcade += res && (res.gold || (res.kind === "card" ? 100 : 0)) || 0; this.save();
      return Object.assign({ ok: true }, res);
    }
    if (kind === "water") {
      if (m.water.includes(round)) return { ok: false, msg: "이 라운드에는 이미 물을 주었습니다." };
      const last = m.water[m.water.length - 1];
      m.water = last === round - 1 ? m.water.concat(round) : [round];
      let gold = 0;
      if (m.water.length >= REWARD.crystalTurns) { m.water = []; if (!full) { gold = REWARD.crystal; this.addGold(u, gold, "에테르 결정이 여물었다"); m.arcade += gold; today.arcade += gold; } }
      this.save();
      return { ok: true, gold, streak: m.water.length };
    }
    return { ok: false, msg: "모르는 작은 게임입니다." };
  },
  /* 대기실 수레바퀴: 표(u.spins, 서버만 바꿈)를 하나 쓰고 서버가 굴린다 */
  wheelSpin(u) {
    u = u || this.user(); if (!u) return { ok: false, msg: "모험가가 없습니다." };
    if (!((u.spins || 0) > 0)) return { ok: false, msg: "수레바퀴 표가 없습니다. 대전을 한 판 마치면 1장." };
    u.spins--;
    const res = rewardPach(u, pachinkoRoll(), "수레바퀴");
    if (rewardOrb(u, rewardToday(u), "수레바퀴: " + (typeof ORB !== "undefined" ? ORB.name : ""))) res.orb = 1;   // v3.54
    this.save();
    return Object.assign({ ok: true, spins: u.spins }, res);
  },
  /* 판 끝: rep = { won, turns, broken: [카드 ID …] }. 조각 · 행운 · 승리 카드 · 수레바퀴 표 · 순례 완주 · 순례 이정표를 서버가 정해 준다 */
  matchEnd(u, id, rep) {
    u = u || this.user(); const m = u && this._match(u, id);
    if (!m) return { ok: false, msg: "끝났거나 없는 판입니다." };
    rep = rep && typeof rep === "object" ? rep : {}; m.end = Date.now();
    if (m.mode === "online" && !u.guest) return this._pairEnd(u, m, id, rep);   // v3.44 온라인: 두 사람의 보고가 맞물려야
    if (m.seed != null) {   // v3.40 검산할 판: 덱을 확인하고 서버 일꾼(server/replay.js)에 맡긴다 — 보상은 matchSettle이 나중에
      const bad = this._checkDecks(u, m, rep);
      if (bad) { m.state = "bad"; this._rewardNote(u, { id, ok: false, msg: bad }); this.save(); return { ok: true, pending: false, skip: bad, gold: 0, bonus: 0, brokenGold: 0, arcade: m.arcade, mile: [] }; }
      m.state = "queued"; m.ai = rep.p1 && ["normal", "hard"].includes(rep.p1.ai) ? rep.p1.ai : null;   // v3.46 퀘스트(어려움 승리)
      m.job = { seed: m.seed, p0: { name: u.id, group: m.group, cards: rep.p0 && rep.p0.cards, isAI: false }, p1: { name: "AI", group: rep.p1.group, cards: rep.p1.cards, isAI: true, ai: m.mode === "exp" ? undefined : rep.p1.ai },
        rules: m.mode === "exp" ? rewardExpRule(rep.rules) : undefined,
        log: Array.isArray(rep.log) ? rep.log.slice(0, 5000) : [], claim: { won: !!rep.won, turns: +rep.turns || 0 } };
      this.save();
      return { ok: true, pending: true, id, arcade: m.arcade };
    }
    return this._settle(u, m, id, rep);
  },
  /* v3.40 서버 일꾼이 판을 다시 둔 결과로 보상 (server.js가 부른다). res = { winner, turn, broken } */
  matchSettle(u, id, res) {
    const m = this._matches()[id]; if (!m || m.uid !== u.id || m.state !== "queued") return null;
    m.state = "done"; delete m.job;
    if (!res || res.error) { const msg = "판을 다시 두지 못했습니다" + (res && res.error ? ` (${res.error})` : ""); this._rewardNote(u, { id, ok: false, msg }); this.save(); return { ok: false, msg }; }
    const out = this._settle(u, m, id, { won: res.winner === 0, turns: res.turn, broken: res.broken, kills: res.kills, verified: true });
    this._rewardNote(u, Object.assign({ id, ok: !out.skip }, out));
    return out;
  },
  /* 판 끝 소식(검산 결과) — 이 기기가 다음 동기화 때 알림으로 보인다 (u.rewardLog, 서버만 바꿈) */
  _rewardNote(u, o) {
    const L = u.rewardLog = Array.isArray(u.rewardLog) ? u.rewardLog : [];
    L.push({ at: Date.now(), id: o.id, ok: !!o.ok, msg: o.msg || o.skip || "", won: !!o.won, gold: o.gold || 0, winCard: o.winCard || null, lucky: o.lucky || null, mile: o.mile || [], done: o.done || 0 });
    if (L.length > 20) L.splice(0, L.length - 20);
  },
  /* 검산할 판의 덱 확인: 내 덱 = 서버에 저장한 덱, 상대 덱 = 그 깃발 카드 RULES.deckSize장 · 세기가 내 덱 비율 × 관문 배수보다 약하지 않을 것 */
  _checkDecks(u, m, rep) {
    if (m.mode === "exp") return this._checkExp(u, m, rep);
    const p0 = rep.p0 && rep.p0.cards, p1 = rep.p1 || {}, saved = m.trial ? trialDeckOf(u, m.at) : this.deck(u, m.group);   // v3.48 체험 덱이면 그 덱과 맞춰 본다
    const same = (a, b) => { const ka = Object.keys(a || {}).filter(k => a[k] > 0), kb = Object.keys(b || {}).filter(k => b[k] > 0); return ka.length === kb.length && ka.every(k => a[k] === b[k]); };
    if (!saved || !same(p0, saved.cards)) return "저장한 덱과 다른 덱으로 둔 판입니다.";
    if (!GROUPS[p1.group] || !p1.cards) return "상대 덱이 올바르지 않습니다.";
    let n = 0; for (const id in p1.cards) { const k = p1.cards[id], c = CARDS[id]; if (!(k > 0)) continue; if (!c || c.group !== p1.group || k > maxCopiesOf(c)) return "상대 덱이 올바르지 않습니다."; n += k; }
    if (n !== RULES.deckSize) return "상대 덱이 올바르지 않습니다.";
    let scale = 1, ai = ["normal", "hard"].includes(p1.ai) ? p1.ai : null;
    if (m.mode === "pil" && typeof PILGRIM !== "undefined") { const forest = m.stage >= PILGRIM.gates - 1; scale = forest ? PILGRIM.forestScale || 1 : PILGRIM.scale[m.stage] || 1; if (p1.ai !== PILGRIM.ai) ai = null; if (forest && p1.group !== m.group) return "숲의 상대 깃발이 올바르지 않습니다."; }
    if (!ai) return "컴퓨터 난이도가 올바르지 않습니다.";
    const ratio = deckScore(saved.cards).total / deckScore(STARTER_DECKS[m.group]).total;
    const want = deckScore(STARTER_DECKS[p1.group]).total * ratio * scale;
    if (deckScore(p1.cards).total < want * 0.97) return "상대 덱이 정해진 세기보다 약합니다.";
    return null;
  },
  /* v3.44 원정 판의 덱 확인: 내 원정 덱 = 그 깃발 카드 RULES.deckSize ~ +6장(저장한 덱 + 원정에서 고른 카드), 보유를 넘는 장수는 원정에서 고른 만큼(6장)까지.
     상대 = 그 깃발의 기본 덱 그대로, 판 규칙 = 용 · 빈 자리 규칙 가운데 하나 */
  _checkExp(u, m, rep) {
    const p0 = cleanCards(rep.p0 && rep.p0.cards), p1 = rep.p1 || {};
    let n = 0, over = 0;
    for (const id in p0) { const c = CARDS[id]; if (!deckable(c, m.group) || p0[id] > maxCopiesOf(c)) return "원정 덱이 올바르지 않습니다."; n += p0[id]; over += Math.max(0, p0[id] - this.ownedCount(u, id)); }
    const len = typeof EXP_LEN !== "undefined" ? EXP_LEN : 6;
    if (n < RULES.deckSize || n > RULES.deckSize + len || over > len) return "원정 덱이 올바르지 않습니다.";
    if (!GROUPS[p1.group] || !STARTER_DECKS[p1.group] || JSON.stringify(cleanCards(p1.cards)) !== JSON.stringify(cleanCards(STARTER_DECKS[p1.group]))) return "원정 상대 덱이 올바르지 않습니다.";
    if (!rewardExpRule(rep.rules)) return "원정 판 규칙이 올바르지 않습니다.";
    rep.p0 = { cards: p0 };
    return null;
  },
  /* v3.44 온라인 대전: 서버가 판을 볼 수 없으니, 두 사람이 각자 보낸 판 끝 보고가 서로 맞물릴 때만 보상한다.
     rep.room = { seed, foe }(같은 판의 시드 · 상대 모험가 이름), rep.p0.cards = 내 덱(서버에 저장한 덱과 같아야).
     맞물림 = 같은 시드 · 서로를 상대로 · 한쪽만 이김 · 같은 턴 · 같은 부서진 카드. 부서진 카드는 두 덱 안의 카드여야 한다.
     먼저 끝낸 쪽은 기다리고(pending), REWARD.pairMs 안에 상대 보고가 오지 않으면 보상 없음(matchSweep) */
  _pairEnd(u, m, id, rep) {
    const room = rep.room || {}, seed = room.seed >>> 0, foe = String(room.foe || "");
    const mine = cleanCards(rep.p0 && rep.p0.cards), saved = m.trial ? trialDeckOf(u, m.at) : this.deck(u, m.group);   // v3.48 체험 덱
    const skip = msg => { m.state = "bad"; this._rewardNote(u, { id, ok: false, msg }); this.save(); return { ok: true, pending: false, skip: msg, gold: 0, bonus: 0, brokenGold: 0, arcade: m.arcade, mile: [] }; };
    if (!foe || foe === u.id || !this.data.users[foe] || !room.seed) return skip("상대를 알 수 없는 판입니다.");
    if (!saved || JSON.stringify(cleanCards(saved.cards)) !== JSON.stringify(mine)) return skip("저장한 덱과 다른 덱으로 둔 판입니다.");
    const broken = (Array.isArray(rep.broken) ? rep.broken : []).filter(isCardId).slice(0, REWARD.maxBroken);
    const kn = x => x == null ? null : Math.max(0, Math.min(REWARD.maxBroken, Math.floor(+x || 0)));   // v3.46 쓰러뜨린 유닛 (내 쪽 · 상대 쪽)
    m.state = "pair"; m.claim = { seed, foe, won: !!rep.won, turns: Math.floor(+rep.turns || 0), broken, deck: mine, kills: kn(rep.kills), killsFoe: kn(rep.killsFoe) };
    const D = this._matches();
    const oid = Object.keys(D).find(k => { const o = D[k]; return o.mode === "online" && o.state === "pair" && o.uid === foe && o.claim && o.claim.seed === seed && o.claim.foe === u.id; });
    if (!oid) { this.save(); return { ok: true, pending: true, id, arcade: m.arcade }; }
    const o = D[oid], v = this.data.users[foe], a = m.claim, b = o.claim;
    const bag = L => L.slice().sort().join(",");
    let bad = null;
    if (a.won === b.won || a.turns !== b.turns || bag(a.broken) !== bag(b.broken)) bad = "두 사람이 보낸 판 결과가 다릅니다.";
    else if (a.kills != null && b.killsFoe != null && (a.kills !== b.killsFoe || a.killsFoe !== b.kills)) bad = "두 사람이 보낸 판 결과가 다릅니다.";   // v3.46
    else {   // 부서진 카드는 두 덱에 든 카드 · 장수 안에서
      const pool = Object.assign({}, a.deck); for (const k in b.deck) pool[k] = (pool[k] || 0) + b.deck[k];
      const cnt = {}; for (const k of a.broken) { cnt[k] = (cnt[k] || 0) + 1; if (cnt[k] > (pool[k] || 0)) { bad = "두 덱에 없는 카드가 부서졌다고 합니다."; break; } }
    }
    m.state = o.state = "done";
    if (bad) { for (const [x, mid] of [[u, id], [v, oid]]) this._rewardNote(x, { id: mid, ok: false, msg: bad }); this.save(); return { ok: true, pending: false, skip: bad, gold: 0, bonus: 0, brokenGold: 0, arcade: m.arcade, mile: [] }; }
    const pairOk = x => { const t = rewardToday(x, m.end), other = x === u ? foe : u.id; t.pairs[other] = (t.pairs[other] || 0) + 1; return t.pairs[other] <= REWARD.pairDaily; };
    const okU = pairOk(u), okV = pairOk(v);
    const both = a.kills != null && b.kills != null;   // 예전 기기(쓰러뜨린 수를 안 보냄)면 0
    const outV = okV ? this._settle(v, o, oid, { won: b.won, turns: b.turns, broken: b.broken, kills: both ? b.kills : 0, verified: true }) : { skip: `같은 상대와는 하루 ${REWARD.pairDaily}판까지 보상을 받습니다.`, won: b.won };
    this._rewardNote(v, Object.assign({ id: oid, ok: !outV.skip }, outV));
    const outU = okU ? this._settle(u, m, id, { won: a.won, turns: a.turns, broken: a.broken, kills: both ? a.kills : 0, verified: true }) : { ok: true, skip: `같은 상대와는 하루 ${REWARD.pairDaily}판까지 보상을 받습니다.`, won: a.won, gold: 0, bonus: 0, brokenGold: 0, arcade: m.arcade, mile: [] };
    /* v3.46 온라인 등급: 두 사람 모두 보상을 받은 판만 (짜고 치기 막는 하루 판 수 제한 그대로) */
    if (okU && okV && this.rankMatch && !outU.skip && !outV.skip) { const ru = { rank: Object.assign({}, u.rank) }, rv = { rank: Object.assign({}, v.rank) }; outU.rank = this.rankMatch(u, rv, a.won); outV.rank = this.rankMatch(v, ru, b.won); }
    this.save();
    return outU;
  },
  /* v3.44 시계 작업(server.js 20초마다): 상대 보고가 오지 않은 온라인 판을 닫는다 */
  matchSweep() {
    const D = this._matches(), now = Date.now(); let n = 0;
    for (const id in D) {
      const m = D[id]; if (m.state !== "pair" || now - m.end < REWARD.pairMs) continue;
      m.state = "done"; n++;
      const u = this.data.users[m.uid]; if (u) this._rewardNote(u, { id, ok: false, msg: "상대의 판 끝 보고가 오지 않아 보상이 없습니다." });
    }
    if (n) this.save();
    return n;
  },
  _settle(u, m, id, rep) {
    rep = rep || {};
    const won = !!rep.won, turns = Math.max(0, Math.min(REWARD.maxTurns, Math.floor(+rep.turns || 0)));
    const out = { ok: true, won, gold: 0, bonus: 0, brokenGold: 0, lucky: null, winCard: null, spins: 0, done: 0, mile: [], arcade: m.arcade };
    const day = pilDayKey(m.end), cnt = rewardToday(u, m.end);
    if (m.end - m.at < REWARD.minMs + turns * REWARD.perTurnMs || turns < 1) { out.skip = "판이 너무 짧아 보상이 없습니다."; this.save(); return out; }
    /* v3.44 전적은 서버가 센다(기기가 보낸 stats는 받지 않음). 서버가 확인한 판(검산 · 온라인 맞물림)만 */
    if (rep.verified || u.guest) { u.stats = u.stats || { w: 0, l: 0 }; if (won) u.stats.w = (u.stats.w || 0) + 1; else u.stats.l = (u.stats.l || 0) + 1; }
    /* v3.44 판이 실제로 간 라운드보다 뒤의 작은 게임을 불렀으면 그 판의 작은 게임 조각을 되돌린다 */
    if (rep.verified && m.top && m.top > roundOfTurn(turns) + 1 && m.arcade > 0) { this.addGold(u, -m.arcade, "작은 게임 되돌림: 판에 없던 라운드"); out.arcade = m.arcade = 0; }
    if (rep.verified && m.top && m.top > roundOfTurn(turns) + 1 && m.orb > 0 && this.addOrbs) { this.addOrbs(u, -m.orb, "작은 게임 되돌림: 판에 없던 라운드"); m.orb = 0; }   // v3.54 운명의 구슬도
    if (cnt.n >= REWARD.dailyMatches) { out.skip = `오늘 보상을 받는 판(${REWARD.dailyMatches}판)을 다 썼습니다.`; this.save(); return out; }
    cnt.n++;
    const rate = m.mode === "pil" && typeof PILGRIM !== "undefined" ? PILGRIM.battleRate : m.mode === "online" ? ECON.rate.online : ECON.rate.ai;
    let price = 0;
    for (const bid of (Array.isArray(rep.broken) ? rep.broken : []).slice(0, REWARD.maxBroken)) price += CARDS[bid] ? cardPrice(bid) : 0;
    out.brokenGold = Math.round(price * ECON.breakRate * rate);
    out.bonus = Math.round(price * (won ? ECON.winMul : ECON.loseMul) * rate);
    if (out.brokenGold > 0) this.addGold(u, out.brokenGold, "전투: 부서진 카드");
    if (out.bonus > 0) this.addGold(u, out.bonus, won ? "승리 정산" : "패배 정산");
    out.lucky = econLucky(u);   // 서버의 행운 (카드면 pilPickCard가 이미 넣음)
    if (m.mode === "ai" || m.mode === "pil" || m.mode === "exp") { u.spins = (u.spins || 0) + 1; out.spins = 1; }
    /* 컴퓨터와 대전에서 이기면 그 깃발 카드 한 장 (레벨 낮을수록 잘 나옴) */
    if (m.mode === "ai" && won && !this.allCards(u)) {
      const pool = cardsOfGroup(m.group).filter(c => !c.base && (u.collection[c.id] || 0) < maxCopiesOf(c));
      if (pool.length) { const w = pool.map(c => 9 - c.lv); let r = Math.random() * w.reduce((a, b) => a + b, 0), pickc = pool[0]; for (let i = 0; i < pool.length; i++) { r -= w[i]; if (r <= 0) { pickc = pool[i]; break; } } this.grantCard(u, pickc.id); out.winCard = pickc.id; }
    }
    /* 순례: 그날 첫 승 = 이번 주 한 걸음 → 이정표(PILGRIM.steps), 숲(마지막 관문)을 이기면 완주 보너스(하루 한 번) */
    if (m.mode === "pil" && won && typeof PILGRIM !== "undefined") {
      const P = u.pilSrv = u.pilSrv || {}, week = pilWeekKey(m.end);
      if (P.week !== week) { P.week = week; P.days = []; P.mile = []; }
      if (!P.days.includes(day)) {
        P.days.push(day);
        const n = P.days.length, ms = PILGRIM.steps[n];
        if (ms && !P.mile.includes(n)) {
          P.mile.push(n);
          if (ms.gold) { this.addGold(u, ms.gold, "순례 이정표"); out.mile.push({ k: "step", n, gold: ms.gold }); }
          if (ms.card) { const grade = pilRollGrade(ms.card) || Object.keys(ms.card).pop(), r = pilPickCard(u, grade); out.mile.push({ k: "step", n, card: r.id, grade, gold: r.gold }); }
        }
      }
      if (PILGRIM.seal && this.addSeals) { out.seals = PILGRIM.seal.win; this.addSeals(u, PILGRIM.seal.win, "순례 관문 승리"); }   // v3.54 순례의 인장
      if (m.stage >= PILGRIM.gates - 1 && P.doneDay !== day) { P.doneDay = day; this.addGold(u, PILGRIM.done, "순례 완주"); out.done = PILGRIM.done; if (PILGRIM.seal && this.addSeals) { out.seals = (out.seals || 0) + PILGRIM.seal.done; this.addSeals(u, PILGRIM.seal.done, "순례 완주"); } }
    }
    out.gold = out.brokenGold + out.bonus + (out.lucky && out.lucky.k === "gold" ? out.lucky.gold : 0) + out.done + out.mile.reduce((a, x) => a + (x.gold || 0), 0);
    /* v3.46 퀘스트(js/quests.js): 서버가 확인한 판만 퀘스트 · 업적에 센다 */
    if (rep.verified && this.questMatch) this.questMatch(u, { mode: m.mode, won, turns, kills: rep.kills, group: m.group, ai: m.ai, forest: m.mode === "pil" && typeof PILGRIM !== "undefined" && m.stage >= PILGRIM.gates - 1 });
    this.save();
    return out;
  }
});

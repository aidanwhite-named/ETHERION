/* ETHERION 서버 — 온라인 대전 방 (2026-11-26)
   방 목록 · 방 만들기 · 입장 · 준비 · 채팅 · 내보내기를 서버가 맡는다. 실제 대전은 예전처럼 두 기기가 PeerJS(WebRTC)로 바로 잇고(js/online.js),
   서버는 그 연결 번호(방장이 연 Peer 코드)를 도전자에게 대신 전해 줄 뿐이다. 보상 · 전적은 예전 그대로 두 사람의 판 끝 보고가 맞물려야 한다(js/rewards.js _pairEnd).

   - 방은 메모리에만 둔다(db.json에 쓰지 않음). 서버를 다시 켜면 방은 사라진다.
   - 한 방에 두 사람. 한 모험가는 한 방에만 있다(다른 방을 만들거나 들어가면 앞의 방에서 나간다).
   - 비밀번호는 서버에서만 검사하고 scrypt 해시로만 갖고 있다. 기기에는 "잠긴 방"이라는 것만 간다.
   - 깃발 공개(showFlag): 켜면 목록에 방장 깃발이 보이고 방 안에서도 서로의 깃발 · 덱 점수가 보인다.
     끄면 대전이 시작되기 전까지 상대의 깃발 · 덱 점수는 가려진다(둘 다 — 한쪽만 보고 맞춰 고르지 못하게).
   - 레벨 · 전적 · 덱 점수는 서버가 가진 값으로 계산한다(기기가 보낸 값은 쓰지 않는다).
   - 갱신: 방 안은 long-poll(POST /api/room {a:"poll", ver} — 방이 바뀌면 바로, 아니면 20초 뒤 답), 방 목록은 기기가 몇 초마다 다시 묻는다.
   - 응답 없는 사람은 내보낸다(대기 45초 · 대전 중 90초). 방장이 나가면 남은 사람이 방장이 되고, 아무도 없으면 방을 지운다.

   요청: POST /api/room { a, … }
     list                              → { rooms: [...], mine: 내 방 id | null }
     create { title, pw, showFlag, flag, trial }  → { room }
     join   { id, pw, flag, trial }    → { room }
     quick  { flag, trial }            → { room } | { none: true }
     poll   { ver }                    → { room } (long-poll) | { gone: "kick" | "drop" | "left" }
     flag   { flag, trial } · ready { v } · chat { text } · kick · leave
     start  { peer }                   방장: 둘 다 준비 → 대전 중, 도전자에게 peer 코드가 간다
     back   { fail }                   대전 화면에서 방으로 돌아옴(fail: 연결 실패) · ping 대전 중 살아 있음 알림 */
"use strict";
const crypto = require("crypto");

const ROOM = {
  max: 200,            // 서버 전체 방 수
  title: 24,           // 방 제목 글자 수
  pw: 32,              // 비밀번호 글자 수
  chat: 200,           // 채팅 한 줄 글자 수
  chatKeep: 60,        // 방마다 남기는 채팅 줄 수
  holdMs: 20000,       // long-poll을 붙잡는 시간
  idleMs: 45000,       // 대기 중: 이만큼 소식이 없으면 내보냄
  playMs: 90000,       // 대전 중: 이만큼 소식이 없으면 내보냄
  startMs: 60000,      // 시작을 눌렀는데 이만큼 지나도 도전자가 연결을 알리지 않으면 대기로 되돌림은 기기가 한다(back fail) — 서버는 기록만
  oldMs: 6 * 3600e3    // 아무리 오래돼도 6시간이면 지운다
};
const ROOM_LIMITS = {
  roomCreate: { n: 6, ms: 60e3 },     // 한 사람 1분에 방 6개
  roomChat: { n: 8, ms: 10e3 },       // 한 사람 10초에 채팅 8줄
  roomPw: { n: 8, ms: 60e3 },         // 한 사람 1분에 틀린 비밀번호 8번
  roomJoin: { n: 20, ms: 60e3 }       // 한 사람 1분에 입장 20번
};

function makeRooms({ R, log, limited, hit, hashPw, checkPw }) {
  const { Store, GROUPS, LEVEL } = R;
  const deckScore = R.ctx.deckScore, trialDeckOf = R.ctx.trialDeckOf;
  const rooms = new Map();      // id → room
  const where = new Map();      // uid → room id
  const gone = new Map();       // uid → { why, at } (내보내진 사람이 다음에 물을 때 까닭을 알려 준다)
  const waiters = new Map();    // room id → [{ uid, done }]

  /* ---------- 글 다듬기 ---------- */
  const CTRL = new RegExp("[\\u0000-\\u001f\\u007f\\u200b-\\u200f\\u2028-\\u202f\\ufeff]", "g");   // 제어 글자 · 보이지 않는 글자 · 글 방향 뒤집기
  const clean = (s, n) => String(s == null ? "" : s).replace(CTRL, " ").replace(/\s+/g, " ").trim().slice(0, n);
  const newId = () => { let id; do id = crypto.randomBytes(4).toString("hex"); while (rooms.has(id)); return id; };

  /* ---------- 모험가 · 깃발 ---------- */
  function profile(u) {
    const s = u.stats || {};
    return { id: u.id, lv: LEVEL && LEVEL.table ? LEVEL.of(Math.max(0, Math.floor(u.xp || 0))) : 1, w: Math.max(0, Math.floor(+s.w || 0)), l: Math.max(0, Math.floor(+s.l || 0)), admin: !!u.admin };
  }
  /* 고른 깃발: 가진 깃발이고 저장한 덱이 있어야 한다. trial = 친구 초대 체험 덱(v3.48) */
  function flagOf(u, flag, trial) {
    flag = String(flag || "");
    if (!Object.prototype.hasOwnProperty.call(GROUPS, flag)) return { msg: "없는 깃발입니다." };
    if (trial) {
      const T = typeof trialDeckOf === "function" ? trialDeckOf(u) : null;
      if (!T || T.group !== flag) return { msg: "체험 기간이 끝났습니다." };
      return { flag, trial: true, score: deckScore(T.cards).total };
    }
    if (!Store.ownsGroup(u, flag)) return { msg: "보유하지 않은 깃발입니다." };
    if (!Store.deckPlayable(u, flag)) return { msg: "저장된 덱이 있어야 대전할 수 있습니다." };
    return { flag, trial: false, score: deckScore(Store.deck(u, flag).cards).total };
  }
  function member(u, f) { return Object.assign(profile(u), { flag: f.flag, trial: f.trial, score: f.score, ready: false, inGame: false, seen: Date.now() }); }

  /* ---------- 알림 ---------- */
  function bump(room) {
    room.ver++;
    const list = waiters.get(room.id); if (!list) return;
    waiters.delete(room.id);
    for (const w of list) w.done();
  }
  function say(room, text, from) {
    room.chat.push({ n: ++room.chatN, from: from || null, text, at: Date.now() });
    if (room.chat.length > ROOM.chatKeep) room.chat.splice(0, room.chat.length - ROOM.chatKeep);
  }
  /* 내가 보는 방: 깃발 비공개 방은 대전이 시작되기 전까지 상대의 깃발 · 덱 점수를 가린다. peer 코드는 대전 중에 방 안 사람에게만 */
  function view(room, uid) {
    const hide = !room.showFlag && room.status === "wait";
    return {
      id: room.id, title: room.title, lock: !!room.pw, showFlag: room.showFlag, status: room.status, host: room.host, ver: room.ver, max: 2,
      members: room.members.map(m => ({ id: m.id, lv: m.lv, w: m.w, l: m.l, admin: m.admin, ready: m.ready, inGame: m.inGame, host: m.id === room.host,
        flag: hide && m.id !== uid ? null : m.flag, score: hide && m.id !== uid ? null : m.score, trial: m.id === uid ? m.trial : undefined })),
      chat: room.chat.slice(-ROOM.chatKeep),
      peer: room.status === "play" ? room.peer : null, startAt: room.startAt || 0
    };
  }
  function listRow(room) {
    const h = room.members.find(m => m.id === room.host) || room.members[0];
    return { id: room.id, title: room.title, lock: !!room.pw, status: room.status, n: room.members.length, max: 2, showFlag: room.showFlag,
      host: h ? { id: h.id, lv: h.lv } : null, flag: room.showFlag && h ? h.flag : null, at: room.at };
  }

  /* ---------- 방에서 빼기 ---------- */
  function drop(room, uid, why) {
    const i = room.members.findIndex(m => m.id === uid); if (i < 0) return;
    room.members.splice(i, 1); where.delete(uid);
    if (why !== "left") gone.set(uid, { why, at: Date.now() });
    /* 그 사람의 long-poll은 바로 끝낸다 */
    const list = waiters.get(room.id);
    if (list) { const rest = []; for (const w of list) (w.uid === uid ? w.done() : rest.push(w)); if (rest.length) waiters.set(room.id, rest); else waiters.delete(room.id); }
    if (!room.members.length) { rooms.delete(room.id); waiters.delete(room.id); log("방", `닫힘 「${room.title}」`); return; }
    say(room, why === "kick" ? `${uid} 님을 내보냈습니다.` : why === "drop" ? `${uid} 님의 연결이 끊어졌습니다.` : `${uid} 님이 나갔습니다.`);
    if (room.host === uid) { room.host = room.members[0].id; say(room, `${room.host} 님이 방장이 되었습니다.`); }
    settle(room);
    bump(room);
  }
  /* 대전 중이던 방: 남은 사람이 모두 방 화면으로 돌아왔으면 대기로 */
  function settle(room) {
    if (room.status !== "play" || room.members.some(m => m.inGame)) return;
    room.status = "wait"; room.peer = null; room.startAt = 0;
    for (const m of room.members) m.ready = false;
  }
  function leaveAll(uid) { const id = where.get(uid), room = id && rooms.get(id); if (room) drop(room, uid, "left"); else where.delete(uid); }

  /* ---------- 요청 ---------- */
  const fail = msg => ({ ok: false, msg });
  function roomOf(uid) { const room = rooms.get(where.get(uid)); return room && room.members.some(m => m.id === uid) ? room : null; }
  function refresh(room, u) {   // 레벨 · 전적은 물을 때마다 서버 값으로 (판이 끝나면 바뀐다)
    const m = room.members.find(x => x.id === u.id); if (!m) return null;
    const p = profile(u); let ch = false;
    for (const k of ["lv", "w", "l"]) if (m[k] !== p[k]) { m[k] = p[k]; ch = true; }
    m.seen = Date.now();
    return ch;
  }

  function create(u, b) {
    if (limited("roomCreate", u.id)) return fail("방을 너무 자주 만들었습니다. 잠시 뒤에 다시 해 주세요.");
    const title = clean(b.title, ROOM.title) || `${u.id}의 방`.slice(0, ROOM.title);
    const pw = String(b.pw == null ? "" : b.pw);
    if (pw.length > ROOM.pw) return fail(`비밀번호는 ${ROOM.pw}자까지입니다.`);
    const f = flagOf(u, b.flag, b.trial); if (f.msg) return fail(f.msg);
    leaveAll(u.id);
    if (rooms.size >= ROOM.max) return fail("방이 가득 찼습니다. 잠시 뒤에 다시 해 주세요.");
    hit("roomCreate", u.id);
    const room = { id: newId(), title, pw: pw ? hashPw(pw) : null, showFlag: b.showFlag !== false, host: u.id, members: [member(u, f)], status: "wait", peer: null, startAt: 0,
      chat: [], chatN: 0, ver: 1, at: Date.now(), banned: new Set() };
    rooms.set(room.id, room); where.set(u.id, room.id); gone.delete(u.id);
    say(room, `「${title}」 방이 열렸습니다. 도전자를 기다립니다.`);
    log("방", `열림 「${title}」`, u.id, room.pw ? "(잠김)" : "", room.showFlag ? "" : "(깃발 비공개)");
    return { ok: true, room: view(room, u.id) };
  }
  function enter(u, room, f) {
    leaveAll(u.id);
    if (!rooms.has(room.id)) return fail("방이 방금 닫혔습니다.");
    room.members.push(member(u, f)); where.set(u.id, room.id); gone.delete(u.id);
    say(room, `${u.id} 님이 들어왔습니다.`);
    bump(room);
    return { ok: true, room: view(room, u.id) };
  }
  function joinable(u, room) {
    if (!room) return "없는 방입니다. 목록을 새로 고쳐 주세요.";
    if (room.members.some(m => m.id === u.id)) return null;
    if (room.banned.has(u.id)) return "이 방에는 다시 들어갈 수 없습니다.";
    if (room.status !== "wait") return "대전 중인 방입니다.";
    if (room.members.length >= 2) return "방이 가득 찼습니다.";
    return null;
  }
  function join(u, b) {
    if (limited("roomJoin", u.id)) return fail("입장이 너무 잦습니다. 잠시 뒤에 다시 해 주세요.");
    hit("roomJoin", u.id);
    const room = rooms.get(String(b.id || ""));
    const bad = joinable(u, room); if (bad) return fail(bad);
    if (room.members.some(m => m.id === u.id)) return { ok: true, room: view(room, u.id) };   // 이미 그 방에 있다(새로 고침)
    if (room.pw) {
      if (limited("roomPw", u.id)) return fail("비밀번호를 여러 번 틀렸습니다. 잠시 뒤에 다시 해 주세요.");
      if (b.pw == null || b.pw === "") return { ok: false, needPw: true, msg: "비밀번호가 필요한 방입니다." };
      if (!checkPw(String(b.pw).slice(0, ROOM.pw), room.pw)) { hit("roomPw", u.id); return { ok: false, needPw: true, wrongPw: true, msg: "비밀번호가 맞지 않습니다." }; }
    }
    const f = flagOf(u, b.flag, b.trial); if (f.msg) return fail(f.msg);
    return enter(u, room, f);
  }
  function quick(u, b) {
    if (limited("roomJoin", u.id)) return fail("입장이 너무 잦습니다. 잠시 뒤에 다시 해 주세요.");
    hit("roomJoin", u.id);
    const f = flagOf(u, b.flag, b.trial); if (f.msg) return fail(f.msg);
    const open = [...rooms.values()].filter(r => !r.pw && r.status === "wait" && r.members.length === 1 && r.host !== u.id && !r.banned.has(u.id)).sort((a, c) => a.at - c.at)[0];
    if (!open) return { ok: true, none: true };
    return enter(u, open, f);
  }
  function inRoom(u, b, fn) {
    const room = roomOf(u.id);
    if (!room) { const g = gone.get(u.id); gone.delete(u.id); return { ok: false, gone: (g && g.why) || "left", msg: "방에 있지 않습니다." }; }
    refresh(room, u);
    return fn(room, room.members.find(m => m.id === u.id));
  }
  const ACTS = {
    flag: (u, b) => inRoom(u, b, (room, me) => {
      if (room.status !== "wait") return fail("대전 중에는 깃발을 바꿀 수 없습니다.");
      const f = flagOf(u, b.flag, b.trial); if (f.msg) return fail(f.msg);
      Object.assign(me, { flag: f.flag, trial: f.trial, score: f.score, ready: false });
      bump(room); return { ok: true, room: view(room, u.id) };
    }),
    ready: (u, b) => inRoom(u, b, (room, me) => {
      if (room.status !== "wait") return fail("대전 중입니다.");
      if (b.v) { const f = flagOf(u, me.flag, me.trial); if (f.msg) return fail(f.msg); me.score = f.score; }   // 준비할 때 덱을 한 번 더 본다(다른 기기에서 덱을 고쳤을 수 있다)
      me.ready = !!b.v;
      bump(room); return { ok: true, room: view(room, u.id) };
    }),
    chat: (u, b) => inRoom(u, b, room => {
      const text = clean(b.text, ROOM.chat); if (!text) return fail("빈 글입니다.");
      if (limited("roomChat", u.id)) return fail("채팅이 너무 잦습니다. 잠깐 쉬었다가 보내 주세요.");
      hit("roomChat", u.id);
      say(room, text, u.id);
      bump(room); return { ok: true, room: view(room, u.id) };
    }),
    kick: (u, b) => inRoom(u, b, room => {
      if (room.host !== u.id) return fail("방장만 내보낼 수 있습니다.");
      if (room.status !== "wait") return fail("대전 중에는 내보낼 수 없습니다.");
      const t = room.members.find(m => m.id !== u.id); if (!t) return fail("내보낼 상대가 없습니다.");
      room.banned.add(t.id);
      drop(room, t.id, "kick");
      log("방", `내보냄 「${room.title}」`, u.id, "→", t.id);
      return { ok: true, room: view(room, u.id) };
    }),
    leave: u => { leaveAll(u.id); gone.delete(u.id); return { ok: true }; },
    start: (u, b) => inRoom(u, b, room => {
      if (room.host !== u.id) return fail("방장만 시작할 수 있습니다.");
      if (room.status !== "wait") return fail("이미 대전 중입니다.");
      if (room.members.length < 2) return fail("상대가 아직 없습니다.");
      if (room.members.some(m => !m.ready)) return fail("두 사람 모두 준비해야 시작할 수 있습니다.");
      const peer = String(b.peer || ""); if (!/^[A-Z0-9]{5}$/.test(peer)) return fail("연결 번호가 올바르지 않습니다.");
      room.status = "play"; room.peer = peer; room.startAt = Date.now();
      for (const m of room.members) { m.inGame = true; m.seen = Date.now(); }
      say(room, "대전을 시작합니다.");
      log("방", `대전 시작 「${room.title}」`, room.members.map(m => m.id).join(" vs "));
      bump(room); return { ok: true, room: view(room, u.id) };
    }),
    back: (u, b) => inRoom(u, b, (room, me) => {
      if (room.status !== "play") return { ok: true, room: view(room, u.id) };
      if (b.fail) {   // 연결하지 못함: 방 전체를 대기로 되돌린다
        for (const m of room.members) m.inGame = false;
        say(room, "두 기기를 잇지 못했습니다. 다시 준비해 주세요.");
      } else if (me.inGame) { me.inGame = false; say(room, `${u.id} 님이 방으로 돌아왔습니다.`); }
      settle(room);
      bump(room); return { ok: true, room: view(room, u.id) };
    }),
    ping: (u, b) => inRoom(u, b, room => ({ ok: true, ver: room.ver, status: room.status }))
  };

  /* long-poll: 방이 바뀌었으면 바로, 아니면 바뀔 때까지(최대 holdMs) 기다린다 */
  function poll(u, b, req) {
    const first = inRoom(u, b, room => (room.ver !== (+b.ver || 0) ? { ok: true, room: view(room, u.id) } : null));
    if (first) return first;
    const room = roomOf(u.id);
    return new Promise(res => {
      let ended = false;
      const w = { uid: u.id, done: () => {
        if (ended) return; ended = true; clearTimeout(timer);
        const now = roomOf(u.id);
        if (!now || now.id !== room.id) { const g = gone.get(u.id); gone.delete(u.id); return res({ ok: false, gone: (g && g.why) || "left", msg: "방에 있지 않습니다." }); }
        const me = now.members.find(m => m.id === u.id); if (me) me.seen = Date.now();
        res({ ok: true, room: view(now, u.id) });
      } };
      const timer = setTimeout(() => { const list = waiters.get(room.id); if (list) { const i = list.indexOf(w); if (i >= 0) list.splice(i, 1); if (!list.length) waiters.delete(room.id); } w.done(); }, ROOM.holdMs);
      const list = waiters.get(room.id) || []; list.push(w); waiters.set(room.id, list);
      if (req) req.on("close", () => { if (ended) return; ended = true; clearTimeout(timer); const l = waiters.get(room.id); if (l) { const i = l.indexOf(w); if (i >= 0) l.splice(i, 1); if (!l.length) waiters.delete(room.id); } res(null); });
    });
  }

  function handle(u, body, req) {
    if (!u || u.guest) return fail("필멸자로는 온라인 대전을 할 수 없습니다. '새 모험가'로 등록해 주세요.");   // v3.37 정책 그대로
    const b = body && typeof body === "object" ? body : {}, a = String(b.a || "");
    if (a === "list") {
      const mine = roomOf(u.id);
      const all = [...rooms.values()].sort((x, y) => (x.status === y.status ? y.at - x.at : x.status === "wait" ? -1 : 1)).slice(0, 100).map(listRow);
      return { ok: true, rooms: all, mine: mine ? mine.id : null, total: rooms.size };
    }
    if (a === "create") return create(u, b);
    if (a === "join") return join(u, b);
    if (a === "quick") return quick(u, b);
    if (a === "poll") return poll(u, b, req);
    if (Object.prototype.hasOwnProperty.call(ACTS, a)) return ACTS[a](u, b);
    return fail("모르는 방 요청입니다.");
  }

  /* 응답 없는 사람 · 너무 오래된 방 정리 (5초마다) */
  function sweep() {
    const now = Date.now();
    for (const room of [...rooms.values()]) {
      if (now - room.at > ROOM.oldMs && room.status === "wait") { for (const m of [...room.members]) drop(room, m.id, "drop"); continue; }
      for (const m of [...room.members]) if (now - m.seen > (m.inGame ? ROOM.playMs : ROOM.idleMs)) drop(room, m.id, "drop");
    }
    for (const [k, g] of gone) if (now - g.at > 10 * 60e3) gone.delete(k);
  }
  const timer = setInterval(sweep, 5000); if (timer.unref) timer.unref();
  /* 계정을 지우거나 로그인이 모두 끊기면 방에서도 뺀다 */
  function forget(uid) { leaveAll(uid); gone.delete(uid); }

  return { handle, sweep, forget, count: () => rooms.size, ROOM };
}

module.exports = { makeRooms, ROOM, ROOM_LIMITS };

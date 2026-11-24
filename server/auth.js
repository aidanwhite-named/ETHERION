/* ETHERION 계정 — 이메일 인증 코드 · 비밀번호 두 가지 로그인, 이메일 연결, 탈퇴 (docs/ACCOUNT_PRIVACY.md 3장)

   무엇을 어떻게 저장하나 (db.json)
   - u.email = { k, enc, at }   k = HMAC(secret, 주소) — 찾기 · 중복 검사용 / enc = AES-256-GCM(주소) — 메일을 보낼 때만 푼다
                                 주소 원문은 db · 백업 · 기록 어디에도 없다. 열쇠(secret · emailEncKey)는 config.json에만 있다
   - u.pw     scrypt 해시 또는 null(메일 코드로만 로그인)
   - u.uid    바뀌지 않는 계정 번호 — 주문(결제) 기록은 이름이 아니라 이 번호를 가리킨다 (server/billing.js)
   - u.agree  { terms, privacy, age14, at } 동의한 문서 버전과 때
   - db.emails  { k: 모험가 이름 }            이메일 → 계정
   - db.codes   { 쓰임:열쇠: { h, exp, tries } } 코드는 HMAC만. 10분 · 한 번 · 5번 틀리면 버림
   - db.tickets { sha256(표): { k, enc, exp } }  메일을 확인한 새 사람이 이름 · 깃발을 고르는 동안(30분) 쓰는 표
   - db.nameHold { 이름: 풀리는 때 }           탈퇴한 이름은 30일 동안 다시 못 쓴다(사칭 막기)

   가입한 주소인지는 알려 주지 않는다: 코드 요청은 어떤 주소든 같은 답을 한다. */
"use strict";
const crypto = require("crypto");

const CODE_MIN = 10, CODE_TRIES = 5, TICKET_MIN = 30, NAME_HOLD_DAYS = 30, PW_MIN = 8;
const LEGAL = { terms: "2026-11-24", privacy: "2026-11-24" };   // 문서를 고치면 날짜를 올린다 (privacy.html · terms.html의 시행일과 같게)
const BAD_CODE = "코드가 맞지 않거나 시간이 지났습니다. 코드를 다시 받아 주세요.";

/* 코드 요청 · 틀림 횟수 제한 (server.js LIMITS에 합쳐진다) */
const AUTH_LIMITS = {
  codeGap: { n: 1, ms: 60e3 },                    // 같은 주소 · 같은 쓰임으로 1분에 1통 (로그인 코드를 받은 직후에도 본인 확인 코드는 받을 수 있게 쓰임별로)
  codeHour: { n: 5, ms: 3600e3 },                 // 같은 주소로 1시간에 5통
  codeDay: { n: 10, ms: 24 * 3600e3 },            // 같은 주소로 하루 10통
  codeIp: { n: 10, ms: 3600e3, local: 300 },      // 같은 접속 주소에서 1시간에 10통
  codeFail: { n: 30, ms: 15 * 60e3, local: 300 }  // 같은 접속 주소에서 코드 틀림 30번 → 15분 쉼
};

function makeAuth(env) {
  const { db, CFG, markDirty, log, limited, hit, mailer, hashPw, checkPw } = env;
  for (const k of ["emails", "codes", "tickets", "nameHold"]) if (!db[k] || typeof db[k] !== "object") db[k] = {};
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const hmac = s => crypto.createHmac("sha256", CFG.secret).update(s).digest("hex");
  const sha = s => crypto.createHash("sha256").update(String(s)).digest("hex");
  const encKey = () => Buffer.from(String(CFG.emailEncKey), "hex");

  /* ---------- 이메일 ---------- */
  function normEmail(s) {
    const e = String(s == null ? "" : s).trim().toLowerCase();
    if (e.length < 6 || e.length > 254 || !/^[^\s@<>"'\\,;:]+@[^\s@<>"'\\,;:]+\.[a-z0-9-]{2,}$/.test(e) || e.split("@")[0].length > 64) return null;
    return e;
  }
  const emailKey = e => hmac("email:" + e);
  function encEmail(e) {
    const iv = crypto.randomBytes(12), c = crypto.createCipheriv("aes-256-gcm", encKey(), iv);
    const ct = Buffer.concat([c.update(e, "utf8"), c.final()]);
    return ["v1", iv.toString("base64url"), c.getAuthTag().toString("base64url"), ct.toString("base64url")].join(".");
  }
  function decEmail(enc) {
    try {
      const [v, iv, tag, ct] = String(enc).split(".");
      if (v !== "v1") return null;
      const d = crypto.createDecipheriv("aes-256-gcm", encKey(), Buffer.from(iv, "base64url"));
      d.setAuthTag(Buffer.from(tag, "base64url"));
      return Buffer.concat([d.update(Buffer.from(ct, "base64url")), d.final()]).toString("utf8");
    } catch (e) { return null; }
  }
  const maskOf = u => { const e = u && u.email && decEmail(u.email.enc); return e ? mailer.mask(e) : null; };
  const userOfEmail = k => (own(db.emails, k) && own(db.users, db.emails[k]) ? db.users[db.emails[k]] : null);

  /* ---------- 코드 ---------- */
  async function sendCode(purpose, to, scope, k, ip) {
    if (limited("codeIp", ip)) return { ok: false, msg: "코드 요청이 너무 잦습니다. 잠시 뒤에 다시 해 주세요." };
    if (limited("codeGap", purpose + ":" + k)) return { ok: false, msg: "방금 코드를 보냈습니다. 1분 뒤에 다시 받을 수 있습니다." };
    if (limited("codeHour", k) || limited("codeDay", k)) return { ok: false, msg: "이 주소로 코드를 너무 많이 보냈습니다. 나중에 다시 해 주세요." };
    hit("codeIp", ip); hit("codeGap", purpose + ":" + k); hit("codeHour", k); hit("codeDay", k);
    if (to) {
      const code = String(crypto.randomInt(0, 1000000)).padStart(6, "0");
      db.codes[scope] = { h: hmac("code:" + scope + ":" + code), exp: Date.now() + CODE_MIN * 60e3, tries: 0 };
      markDirty();
      try { await mailer.sendCode(to, code, purpose, CODE_MIN); }
      catch (e) { delete db.codes[scope]; log("메일 실패", mailer.mask(to), e.message); return { ok: false, msg: "메일을 보내지 못했습니다. 잠시 뒤에 다시 해 주세요." }; }
    }
    return { ok: true, sent: true, minutes: CODE_MIN };
  }
  function checkCode(scope, code, ip) {
    if (limited("codeFail", ip)) return "코드를 여러 번 틀렸습니다. 15분 뒤에 다시 해 주세요.";
    const rec = own(db.codes, scope) ? db.codes[scope] : null;
    const bad = () => { hit("codeFail", ip); return BAD_CODE; };
    if (!rec) return bad();
    if (Date.now() > rec.exp || rec.tries >= CODE_TRIES) { delete db.codes[scope]; markDirty(); return bad(); }
    const a = Buffer.from(hmac("code:" + scope + ":" + String(code == null ? "" : code).replace(/\D/g, "").slice(0, 6))), b = Buffer.from(rec.h);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) { rec.tries++; markDirty(); return bad(); }
    delete db.codes[scope]; markDirty();   // 한 번 쓰면 끝
    return null;
  }

  /* ---------- 들어가기 (로그인 전) ---------- */
  /* POST /api/auth/code {email} — 가입했든 아니든 같은 답 */
  async function authCode(b, ip) {
    const e = normEmail(b.email); if (!e) return { ok: false, msg: "이메일 주소를 다시 확인해 주세요." };
    const k = emailKey(e);
    return sendCode("login", e, "login:" + k, k, ip);
  }
  /* POST /api/auth/verify {email, code} — 가입한 주소면 로그인, 아니면 가입 표(ticket) */
  function authVerify(b, ip) {
    const e = normEmail(b.email); if (!e) return { ok: false, msg: "이메일 주소를 다시 확인해 주세요." };
    const k = emailKey(e);
    const err = checkCode("login:" + k, b.code, ip); if (err) return { ok: false, msg: err };
    const u = userOfEmail(k);
    if (u) { log("로그인", u.id, "(메일 코드)"); return { ok: true, user: u }; }
    const ticket = crypto.randomBytes(24).toString("base64url");
    db.tickets[sha(ticket)] = { k, enc: encEmail(e), exp: Date.now() + TICKET_MIN * 60e3 };
    markDirty();
    return { ok: true, need: "signup", ticket, email: mailer.mask(e), minutes: TICKET_MIN };
  }
  function ticketOf(t) {
    const h = sha(t || ""), rec = t && own(db.tickets, h) ? db.tickets[h] : null;
    if (!rec || Date.now() > rec.exp) return null;
    return { h, k: rec.k, enc: rec.enc };
  }
  /* 등록 전에: 이름 · 암호 · 동의 · 이메일 표를 본다. 문제가 있으면 글, 없으면 { ticket } */
  function registerCheck(b, id) {
    if (id.includes("@")) return { msg: "이름에 @는 쓸 수 없습니다." };
    if (own(db.nameHold, id) && db.nameHold[id] > Date.now()) return { msg: "이 이름은 지금 쓸 수 없습니다. 다른 이름을 골라 주세요." };
    const a = b.agree || {};
    if (!a.terms || !a.privacy || !a.age14) return { msg: "이용약관 · 개인정보 수집 · 이용에 동의하고 만 14세 이상임을 확인해 주세요." };
    const tk = b.ticket ? ticketOf(b.ticket) : null;
    if (b.ticket && !tk) return { msg: "이메일 확인 시간이 지났습니다. 코드를 다시 받아 주세요." };
    if (tk && userOfEmail(tk.k)) return { msg: "이미 모험가가 있는 이메일입니다. 로그인해 주세요." };
    if (!tk && emailRequired()) return { msg: "이메일 확인이 필요합니다. 이메일로 코드를 받아 주세요." };
    const pw = String(b.pw || "");
    if (pw ? pw.length < PW_MIN : !tk) return { msg: `암호는 ${PW_MIN}자 이상으로 정해 주세요.` };
    if (pw.length > 200) return { msg: "암호가 너무 깁니다." };
    return { ticket: tk, pw };
  }
  /* 등록한 뒤에: 계정 번호 · 동의 · 이메일 · 암호를 적는다 */
  function registerDone(u, chk) {
    u.uid = newUid();
    u.agree = { terms: LEGAL.terms, privacy: LEGAL.privacy, age14: true, at: Date.now() };
    u.pw = chk.pw ? hashPw(chk.pw) : null;
    if (chk.ticket) { u.email = { k: chk.ticket.k, enc: chk.ticket.enc, at: Date.now() }; db.emails[chk.ticket.k] = u.id; delete db.tickets[chk.ticket.h]; }
    markDirty();
  }
  function newUid() {
    const used = new Set(Object.values(db.users).map(x => x.uid));
    let id; do id = "A" + crypto.randomBytes(8).toString("hex").toUpperCase().slice(0, 12); while (used.has(id) || (db.gone && db.gone[id]));
    return id;
  }
  /* 이름 또는 이메일 + 암호: 이메일이면 그 계정의 이름을 돌려준다(없으면 null) */
  function idOfLogin(typed) {
    if (!String(typed).includes("@")) return String(typed);
    const e = normEmail(typed), u = e ? userOfEmail(emailKey(e)) : null;
    return u ? u.id : null;
  }
  const emailRequired = () => (CFG.requireEmail == null ? mailer.real : !!CFG.requireEmail);

  /* ---------- 계정 관리 (로그인 뒤) ---------- */
  const plain = u => !u.guest && !u.admin;
  /* 본인 확인: 지금 암호 또는 내 메일로 받은 코드 */
  function reauth(u, b, ip) {
    if (b.cur != null && b.cur !== "") {
      if (limited("loginFail", ip)) return "암호를 여러 번 틀렸습니다. 15분 뒤에 다시 해 주세요.";
      if (u.pw && checkPw(String(b.cur), u.pw)) return null;
      hit("loginFail", ip); return "지금 암호가 맞지 않습니다.";
    }
    if (b.code != null && b.code !== "") return checkCode("confirm:" + u.id, b.code, ip);
    return u.email ? "지금 암호를 넣거나, 메일로 확인 코드를 받아 넣어 주세요." : "지금 암호를 넣어 주세요.";
  }
  /* POST /api/account/code {purpose: "link", email} 또는 {purpose: "confirm"} */
  async function accountCode(u, b, ip) {
    if (!plain(u)) return { ok: false, msg: "이 계정에서는 쓸 수 없습니다." };
    if (b.purpose === "confirm") {
      const e = u.email && decEmail(u.email.enc);
      if (!e) return { ok: false, msg: "연결된 이메일이 없습니다." };
      return sendCode("confirm", e, "confirm:" + u.id, u.email.k, ip);
    }
    const e = normEmail(b.email); if (!e) return { ok: false, msg: "이메일 주소를 다시 확인해 주세요." };
    const k = emailKey(e), taken = userOfEmail(k);
    if (taken && taken !== u) log("이메일 연결", u.id, "이미 쓰는 주소 — 보내지 않음");
    return sendCode("link", taken && taken !== u ? null : e, "link:" + u.id + ":" + k, k, ip);   // 남이 쓰는 주소여도 같은 답(보내지는 않는다)
  }
  /* POST /api/account/email {email, code, cur?} — 이메일 연결 · 바꾸기 (이미 이메일이 있으면 본인 확인도) */
  function accountEmail(u, b, ip, dropOthers) {
    if (!plain(u)) return { ok: false, msg: "이 계정에서는 쓸 수 없습니다." };
    const e = normEmail(b.email); if (!e) return { ok: false, msg: "이메일 주소를 다시 확인해 주세요." };
    const k = emailKey(e);
    const err = checkCode("link:" + u.id + ":" + k, b.code, ip); if (err) return { ok: false, msg: err };
    const taken = userOfEmail(k); if (taken && taken !== u) return { ok: false, msg: BAD_CODE };
    if (u.email) delete db.emails[u.email.k];
    u.email = { k, enc: encEmail(e), at: Date.now() };
    db.emails[k] = u.id;
    dropOthers(); markDirty();
    log("이메일 연결", u.id, mailer.mask(e));
    return { ok: true, email: mailer.mask(e) };
  }
  /* POST /api/account/password {pw, cur? | code?} — 암호 정하기 · 바꾸기. pw를 비우면 암호를 없앤다(이메일이 있을 때만) */
  function accountPassword(u, b, ip, dropOthers) {
    if (!plain(u)) return { ok: false, msg: "이 계정에서는 쓸 수 없습니다." };
    const pw = String(b.pw || "");
    if (!pw && !u.email) return { ok: false, msg: "이메일이 없는 계정은 암호를 없앨 수 없습니다." };
    if (pw && (pw.length < PW_MIN || pw.length > 200)) return { ok: false, msg: `암호는 ${PW_MIN}자 이상으로 정해 주세요.` };
    const err = reauth(u, b, ip); if (err) return { ok: false, msg: err };
    u.pw = pw ? hashPw(pw) : null;
    dropOthers(); markDirty();
    log("암호 바꿈", u.id, pw ? "" : "(없앰)");
    return { ok: true, hasPw: !!u.pw };
  }
  /* POST /api/account/delete {cur? | code?} — 탈퇴: 바로 지운다. 교역소에 맡긴 것이 있으면 먼저 거두게 한다 */
  function accountDelete(u, b, ip, held, wipe) {
    if (!plain(u)) return { ok: false, msg: "이 계정에서는 쓸 수 없습니다." };
    const err = reauth(u, b, ip); if (err) return { ok: false, msg: err };
    const h = held(u.id);
    if (h && (h.shards > 0 || Object.keys(h.cards || {}).length)) return { ok: false, msg: "교역소에 맡겨 둔 카드 · 조각이 있습니다. 올린 거래를 내리고 참여를 거둔 뒤에 다시 해 주세요." };
    if (u.email) delete db.emails[u.email.k];
    for (const s of Object.keys(db.codes)) if (s.startsWith("confirm:" + u.id) || s.startsWith("link:" + u.id + ":")) delete db.codes[s];
    db.nameHold[u.id] = Date.now() + NAME_HOLD_DAYS * 86400e3;
    wipe(u);
    markDirty();
    log("탈퇴", u.uid || u.id);
    return { ok: true, gone: true };
  }
  /* 화면에 주는 내 계정 정보 (주소는 가려서) */
  function publicOf(u) { return { uid: u.uid || null, email: maskOf(u), hasPw: !!u.pw, agree: u.agree || null, legal: LEGAL }; }
  /* 예전 계정(계정 번호가 없던 때) 채우기 · 이메일 찾기 표 고치기 — 켤 때 한 번 */
  function migrate() {
    let n = 0;
    for (const u of Object.values(db.users)) {
      if (!u.guest && !u.uid) { u.uid = newUid(); n++; }
      if (u.email && u.email.k && db.emails[u.email.k] !== u.id) { db.emails[u.email.k] = u.id; n++; }
    }
    for (const k of Object.keys(db.emails)) if (!own(db.users, db.emails[k])) { delete db.emails[k]; n++; }
    if (n) markDirty();
  }
  function prune() {
    const now = Date.now(); let n = 0;
    for (const k of Object.keys(db.codes)) if (now > db.codes[k].exp) { delete db.codes[k]; n++; }
    for (const k of Object.keys(db.tickets)) if (now > db.tickets[k].exp) { delete db.tickets[k]; n++; }
    for (const k of Object.keys(db.nameHold)) if (now > db.nameHold[k]) { delete db.nameHold[k]; n++; }
    if (n) markDirty();
  }
  return { LEGAL, PW_MIN, normEmail, emailKey, decEmail, maskOf, authCode, authVerify, registerCheck, registerDone, idOfLogin, emailRequired,
    accountCode, accountEmail, accountPassword, accountDelete, publicOf, migrate, prune, sha };
}
module.exports = { makeAuth, AUTH_LIMITS, LEGAL };

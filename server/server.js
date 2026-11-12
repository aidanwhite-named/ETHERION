/* ETHERION 서버 (v3.22) — 계정 · 보유 카드 · 덱 · 지갑 · 상점 재고 · 교역소의 정본을 갖는다.
   실행:  node server/server.js        (윈도우는 "ETHERION 서버.bat"를 두 번 누름)
   주소:  http://localhost:8787  — 게임 화면도 이 서버가 내준다. 같은 와이파이의 폰은 http://<이 PC의 IP>:8787

   만든 방식 (docs/SERVER_PLAN.md · docs/SERVER.md)
   - 규칙은 게임 파일을 그대로 쓴다(rules.js). 서버의 Store.data = 서버 DB(data/db.json), Store.save = 디스크에 쓰기.
   - Node는 요청을 하나씩 차례로 처리한다 → 같은 카드 마지막 1장 · 같은 거래에 겹친 요청도 저절로 차례대로(TRADE_API 3장 9).
   - 바깥 꾸러미 없이 Node 기본 기능만 쓴다(npm install 필요 없음). Node 18 이상.

   요청 (모두 JSON, 로그인 뒤에는 머리에 Authorization: Bearer <토큰>)
     GET  /api/hello                    서버인지 확인
     POST /api/register {id,pw,groups}  새 모험가 → { ok, token, me, … }
     POST /api/login    {id,pw}         로그인
     POST /api/guest    {}              손님(기기마다 하나)
     POST /api/logout
     GET  /api/me                       내 데이터 다시 받기(스냅샷)
     POST /api/ops      {cid, ops:[{seq, fn, target, args}]}   Store 작업(덱 저장 · 사기 · 팔기 · 보상 …)을 차례로
     POST /api/trade    {fn, args}      교역소(TradeLocal 함수 이름 그대로)
   스냅샷(모든 응답에 붙음): { me(암호 뺌), stock, unread, rev, now, others(관리자만) } */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { load } = require("./rules.js");

const VERSION = "3.26";
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const CONFIG_FILE = path.join(__dirname, "config.json");
const WEB_DIRS = ["css", "js", "img", "audio", "fonts"];   // tools/android/build_apk.py의 WEB_DIRS와 같게 (게임 파일만 내준다)

/* ---------- 설정 (처음 실행 때 config.json을 만든다) ---------- */
const DEFAULT_CONFIG = { port: 8787, host: "0.0.0.0", adminPassword: "etherion", openBrowser: true, backupKeep: 14 };
function loadConfig() {
  let c = {};
  try { c = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8")); } catch (e) { if (e.code !== "ENOENT") console.error("config.json을 읽지 못했습니다:", e.message); }
  const cfg = Object.assign({}, DEFAULT_CONFIG, c);
  if (!fs.existsSync(CONFIG_FILE)) fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2) + "\n");
  if (process.env.PORT) cfg.port = +process.env.PORT;
  if (process.argv.includes("--no-open")) cfg.openBrowser = false;
  const pi = process.argv.indexOf("--port"); if (pi > 0) cfg.port = +process.argv[pi + 1];
  const di = process.argv.indexOf("--data"); if (di > 0) cfg.dataFile = path.resolve(process.argv[di + 1]);
  return cfg;
}
const CFG = loadConfig();
const DB_PATH = CFG.dataFile || DB_FILE;
const BACKUP_DIR = path.join(path.dirname(DB_PATH), "backup");   // 데이터 파일 옆 backup/

/* ---------- 규칙 (게임 파일) ---------- */
const R = load();
const { Store, TradeLocal } = R;

/* ---------- DB ---------- */
function emptyDB() { return { v: 1, created: Date.now(), users: {}, session: null, chat: [], stock: {}, shop: null, trade: null, sessions: {}, rev: 0 }; }
function readDB() {
  try {
    const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    return Object.assign(emptyDB(), db);
  } catch (e) {
    if (e.code === "ENOENT") return emptyDB();
    console.error(`\n!! ${DB_PATH} 를 읽지 못했습니다: ${e.message}\n   data/backup/ 의 최근 파일을 db.json으로 복사하면 되살릴 수 있습니다. 서버를 멈춥니다.`);
    process.exit(1);
  }
}
const db = readDB();
Store.data = db;
let current = null;                                 // 지금 처리 중인 요청의 모험가 (요청은 하나씩 차례로 돈다)
Store.user = () => current;
Store.load = () => {};

let saveTimer = null, dirty = false;
/* v3.29 없앤 강화 카드(6레벨 결과 13장)는 원래 카드 3장씩, v3.29.1 아주 뺀 카드(8레벨 35장)는 상점 값으로 돌려준다 — 한 번 돌려주면 그 뒤로는 0 */
{ const n = Store.refundAllRetiredUpgrades ? Store.refundAllRetiredUpgrades() : 0; if (n > 0) { console.log(`없앤 강화 카드 · 뺀 카드 ${n}장을 돌려줌`); markDirty(); } }
function writeNow() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  if (!dirty) return;
  dirty = false;
  db.session = null;
  const json = JSON.stringify(db);
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const tmp = DB_PATH + ".tmp";
  fs.writeFileSync(tmp, json);
  try { fs.renameSync(tmp, DB_PATH); }
  catch (e) { fs.copyFileSync(tmp, DB_PATH); try { fs.unlinkSync(tmp); } catch (_) {} }   // 윈도우에서 다른 프로그램이 파일을 잡고 있을 때
  backupDaily();
}
function markDirty() { dirty = true; db.rev = (db.rev || 0) + 1; if (!saveTimer) saveTimer = setTimeout(writeNow, 300); }
Store.save = markDirty;

/* 하루에 한 번 data/backup/db-YYYY-MM-DD.json — 최근 backupKeep개만 남긴다 */
function backupDaily() {
  try {
    if (!fs.existsSync(DB_PATH)) return;
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const d = new Date(), day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const f = path.join(BACKUP_DIR, `db-${day}.json`);
    if (!fs.existsSync(f)) {
      fs.copyFileSync(DB_PATH, f);
      const all = fs.readdirSync(BACKUP_DIR).filter(x => /^db-\d{4}-\d\d-\d\d\.json$/.test(x)).sort();
      for (const x of all.slice(0, Math.max(0, all.length - CFG.backupKeep))) fs.unlinkSync(path.join(BACKUP_DIR, x));
    }
  } catch (e) { console.error("백업 실패:", e.message); }
}

/* ---------- 암호 · 토큰 ---------- */
function hashPw(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  return "scrypt$" + salt + "$" + crypto.scryptSync(String(pw), salt, 32).toString("hex");
}
function checkPw(pw, stored) {
  if (!stored || !stored.startsWith("scrypt$")) return false;
  const [, salt, hex] = stored.split("$");
  const a = crypto.scryptSync(String(pw), salt, 32), b = Buffer.from(hex, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function newSession(uid) {
  const token = crypto.randomBytes(24).toString("base64url");
  db.sessions[token] = { uid, at: Date.now(), seen: Date.now(), clients: {} };
  markDirty();
  return token;
}
function sessionOf(req) {
  const h = req.headers.authorization || "";
  const m = /^Bearer\s+(\S+)$/.exec(h);
  const s = m && db.sessions[m[1]];
  if (!s || !db.users[s.uid]) return null;
  s.seen = Date.now();
  return { token: m[1], s, u: db.users[s.uid] };
}

/* ---------- 스냅샷: 응답마다 붙이는 내 데이터 ---------- */
const strip = u => { const o = JSON.parse(JSON.stringify(u)); delete o.pw; return o; };
function unreadOf(uid) { const box = db.trade && db.trade.notices && db.trade.notices[uid]; return box ? box.filter(n => !n.read).length : 0; }
function snapshot(u) {
  const out = { me: strip(u), stock: db.stock || {}, shop: Store.shopCfg(), unread: unreadOf(u.id), rev: db.rev || 0, now: Date.now() };
  if (u.admin) out.others = Object.values(db.users).filter(x => x.id !== u.id).map(strip);
  return out;
}

/* ---------- 계정 ---------- */
const GUEST_RE = /^손님/;
function register(b) {
  const id = String(b.id || "").trim();
  if (GUEST_RE.test(id)) return { ok: false, msg: "이 이름은 쓸 수 없습니다." };
  const err = Store.register(id, String(b.pw || ""), b.groups);
  db.session = null;
  if (err) return { ok: false, msg: err };
  const u = db.users[id];
  u.pw = hashPw(b.pw);
  log("등록", id, (b.groups || []).join(" · "));
  return Object.assign({ ok: true, token: newSession(id) }, snapshot(u));
}
function login(b) {
  const id = String(b.id || "").trim(), pw = String(b.pw || "");
  if (id.toLowerCase() === R.ADMIN_ID) {
    if (pw !== String(CFG.adminPassword)) return { ok: false, msg: "관리자 암호가 맞지 않습니다." };
    if (!db.users[R.ADMIN_ID]) { Store.login(R.ADMIN_ID, R.ADMIN_PW); db.session = null; }   // 게임과 같은 모양으로 관리자 계정을 만든다
    const u = db.users[R.ADMIN_ID]; delete u.pw;
    log("로그인", "admin");
    return Object.assign({ ok: true, token: newSession(R.ADMIN_ID) }, snapshot(u));
  }
  const u = db.users[id];
  if (!u || u.guest) return { ok: false, msg: "등록되지 않은 이름입니다. '새 모험가'로 등록하거나 '로그인 없이 시작'을 눌러 주세요." };
  if (!checkPw(pw, u.pw)) return { ok: false, msg: "암호가 맞지 않습니다." };
  log("로그인", id);
  return Object.assign({ ok: true, token: newSession(id) }, snapshot(u));
}
/* 손님: 기기(브라우저)마다 하나씩. 모든 카드를 빌려 쓰는 계정이라 거래는 못 한다(게임 규칙 그대로) */
function guest() {
  let id;
  do id = "손님·" + crypto.randomBytes(3).toString("hex").toUpperCase().slice(0, 4); while (db.users[id]);
  const decks = {}, owned = {};
  for (const g of R.GROUP_IDS) { decks[g] = R.freshDeck(g); owned[g] = true; }
  db.users[id] = { id, pw: null, admin: false, guest: true, created: Date.now(), group: "B1", owned, collection: {}, decks, stats: { w: 0, l: 0 }, gold: R.ECON.startGold };
  markDirty();
  log("손님", id);
  return Object.assign({ ok: true, token: newSession(id) }, snapshot(db.users[id]));
}

/* ---------- Store 작업 ----------
   게임의 Store 함수를 서버에서 그대로 부른다. target = 대상 모험가(보통 나, 관리자는 다른 모험가도).
   trust: 지금은 기기가 정한 보상을 믿고 받는 것(전투 정산 · 수레바퀴 · 원정 보상). 보상 추첨을 서버로 옮기면 빠진다(SERVER_PLAN 2장).
   today: 서버 시계의 오늘 · 어제를 셋째 인자로 넣어 부른다(v3.26 순례 첫 승 — 추첨도 서버). */
const OPS = {
  saveDeck: {}, setDraft: {}, clearDraft: {}, draftAdd: {}, buyCard: {}, sellCard: {},
  grantCard: { trust: true },
  addGold: { trust: true, check: a => +a[0] > 0 && +a[0] <= 1000000 ? null : "보상으로 받을 수 있는 조각이 아닙니다." },
  pilgrimClaim: { today: true },
  upgradeCard: {},   // v3.28 같은 카드 3장 → 강화 카드 1장 (Store.upgradeCard, js/economy.js)   // v3.26 성로 순례 그날 첫 승(받기 / 뽑기): 날짜는 서버 시계로 검사, 같은 날 두 번은 거절. 카드 추첨도 서버가 한다
  grantGroup: { admin: true }, revokeGroup: { admin: true }, grantAllCards: { admin: true },
  restock: { admin: true, noTarget: true },
  shopSet: { admin: true, noTarget: true }, shopStock: { admin: true, noTarget: true }   // v3.37 관리자 상점: 공개 · 내림 · 기간 판매 · 재고 (js/economy.js)
};
/* 기기가 정하는 칸(전적 · 수레바퀴 표 · 원정 · 경험치 · 설정 따위). 이 밖의 칸(PROTECTED)은 서버만 바꾼다 */
const PROTECTED = new Set(["id", "pw", "admin", "guest", "created", "group", "owned", "collection", "gold", "ledger", "decks", "drafts", "fresh", "pilClaim"]);
function softUpdate(u, a) {
  const fields = (a && a.fields) || {};
  if (JSON.stringify(fields).length > 300000) return { ok: false, msg: "너무 큽니다." };
  for (const k of Object.keys(u)) if (!PROTECTED.has(k) && !(k in fields)) delete u[k];
  for (const k in fields) if (!PROTECTED.has(k)) u[k] = fields[k];
  for (const id of (a.freshDrop || [])) if (u.fresh) delete u.fresh[id];
  markDirty();
  return { ok: true };
}
function runOp(me, op) {
  const fn = String(op.fn || "");
  let args = Array.isArray(op.args) ? op.args : [];
  if (fn === "soft") return softUpdate(me, args[0] || {});
  const spec = OPS[fn];
  if (!spec || typeof Store[fn] !== "function") return { ok: false, msg: "모르는 작업입니다: " + fn };
  if (spec.admin && !me.admin) return { ok: false, msg: "관리자만 할 수 있습니다." };
  if (spec.check) { const e = spec.check(args); if (e) return { ok: false, msg: e }; }
  if (spec.today) args = [args[0], args[1], R.pilOkDays(Date.now())];   // 기기가 보낸 오늘의 날짜는 서버의 오늘 · 어제여야 한다 (기기가 보낸 셋째 값은 버림)
  if (spec.noTarget) return Store[fn](...args);
  const T = op.target ? db.users[op.target] : me;
  if (!T) return { ok: false, msg: "없는 모험가입니다." };
  if (T !== me && !me.admin) return { ok: false, msg: "다른 모험가의 데이터는 바꿀 수 없습니다." };
  const r = Store[fn](T, ...args);
  if (spec.trust || spec.today || fn === "upgradeCard" || fn === "buyCard" || fn === "sellCard") logOp(me, fn, args, r);
  return r === undefined ? null : r;
}
function ops(sess, body) {
  const cid = String(body.cid || "").slice(0, 40) || "x";
  const clients = sess.s.clients = sess.s.clients || {};
  const last = clients[cid] ? clients[cid].seq : 0;
  const results = {}; let ack = last;
  for (const op of (Array.isArray(body.ops) ? body.ops.slice(0, 200) : [])) {
    const seq = +op.seq || 0;
    if (seq <= ack) continue;                       // 이미 처리한 작업(다시 보낸 것)은 건너뛴다
    let r;
    try { r = runOp(sess.u, op); } catch (e) { console.error(e); r = { ok: false, msg: "서버에서 처리하다 문제가 생겼습니다." }; }
    results[seq] = r; ack = seq;
  }
  clients[cid] = { seq: ack, at: Date.now() };
  const ids = Object.keys(clients); if (ids.length > 12) { ids.sort((a, b) => clients[a].at - clients[b].at); for (const k of ids.slice(0, ids.length - 12)) delete clients[k]; }
  markDirty();
  return Object.assign({ ok: true, results, ack }, snapshot(sess.u));
}

/* ---------- 교역소: TradeLocal 함수를 그대로 (uid = 로그인한 모험가) ---------- */
const TRADE_FNS = new Set(["board", "get", "mine", "held", "notices", "readAll", "create", "offer", "withdraw", "accept", "cancel", "forceEnd", "liveSettle"]);
function trade(sess, body) {
  const fn = String(body.fn || "");
  if (!TRADE_FNS.has(fn)) return { ok: false, msg: "모르는 거래 요청입니다." };
  const args = Array.isArray(body.args) ? body.args : [];
  let result;
  try { result = TradeLocal[fn](sess.u.id, ...args); }
  catch (e) { console.error(e); result = { ok: false, msg: "거래 처리 중 문제가 생겼습니다." }; }
  if (["create", "offer", "withdraw", "accept", "cancel", "forceEnd", "liveSettle"].includes(fn)) log("거래", sess.u.id, fn, result && result.ok ? "→ 됨" : "→ " + (result && result.msg));
  return Object.assign({ ok: true, result }, snapshot(sess.u));
}
/* 기한 정산 시계: 20초마다 (거래 게시판의 기한이 지난 거래를 성사 · 닫기) */
setInterval(() => { current = null; try { const n = TradeLocal.sweep(); if (n) log("거래", `기한 정산 ${n}건`); } catch (e) { console.error(e); } }, 20000);

/* ---------- 기록 ---------- */
const t = () => { const d = new Date(), p = n => String(n).padStart(2, "0"); return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; };
function log(...a) { console.log(`[${t()}]`, ...a); }
function logOp(me, fn, args, r) {
  const ok = r && r.ok === false ? "→ " + r.msg : "";
  const name = id => (R.CARDS[id] ? R.CARDS[id].name : id);
  if (fn === "buyCard") log("상점", me.id, `구매 ${name(args[0])}`, r && r.ok ? `×${r.n} (${r.price} 조각)` : ok);
  else if (fn === "sellCard") log("상점", me.id, `판매 ${name(args[0])}`, ok);
  else if (fn === "addGold") log("보상", me.id, `+${args[0]} 조각 (${args[1] || ""})`);
  else if (fn === "grantCard") log("보상", me.id, `카드 ${name(args[0])}`, r ? "" : "(이미 최대)");
  else if (fn === "upgradeCard") log("강화", me.id, `${name(args[0])}`, r && r.ok ? "→ 됨" : "→ " + (r && r.msg));
  else if (fn === "pilgrimClaim") log("순례", me.id, `첫 승 ${args[1]} ${args[0] === "gamble" ? "뽑기" : "받기"}`, r && r.ok ? (r.k === "card" ? `→ ${r.grade} ${name(r.id)}${r.gold ? ` (다 가져서 ${r.gold} 조각)` : ""}` : `→ ${r.gold} 조각`) : "→ 거절: " + (r && r.msg));
}

/* ---------- HTTP ---------- */
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".ogg": "audio/ogg", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf" };
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
}
function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}
function readBody(req) {
  return new Promise((ok, bad) => {
    let n = 0; const chunks = [];
    req.on("data", c => { n += c.length; if (n > 1e6) { bad(new Error("too big")); req.destroy(); } else chunks.push(c); });
    req.on("end", () => { if (!n) return ok({}); try { ok(JSON.parse(Buffer.concat(chunks).toString("utf8"))); } catch (e) { bad(e); } });
    req.on("error", bad);
  });
}
function serveFile(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0]);
  if (rel === "/" || rel === "") rel = "/index.html";
  const norm = path.normalize(rel).replace(/^[/\\]+/, "");
  const top = norm.split(/[/\\]/)[0];
  if (norm !== "index.html" && !WEB_DIRS.includes(top)) { res.writeHead(404); return res.end("Not found"); }
  const full = path.join(ROOT, norm);
  if (!full.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  fs.stat(full, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(full).toLowerCase()] || "application/octet-stream", "Content-Length": st.size, "Cache-Control": "no-cache" });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(full).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  cors(res);
  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
  const url = req.url || "/";
  if (!url.startsWith("/api/")) return serveFile(req, res, url);
  const route = url.split("?")[0];
  let body = {};
  if (req.method === "POST") { try { body = await readBody(req); } catch (e) { return send(res, 400, { ok: false, msg: "요청을 읽지 못했습니다." }); } }
  current = null;
  try {
    if (route === "/api/hello") return send(res, 200, { ok: true, etherion: true, version: VERSION, now: Date.now() });
    if (route === "/api/register" && req.method === "POST") return send(res, 200, register(body));
    if (route === "/api/login" && req.method === "POST") return send(res, 200, login(body));
    if (route === "/api/guest" && req.method === "POST") return send(res, 200, guest());
    const sess = sessionOf(req);
    if (!sess) return send(res, 401, { ok: false, auth: false, msg: "로그인이 필요합니다. (서버의 세션이 끝났습니다)" });
    current = sess.u;
    if (route === "/api/logout" && req.method === "POST") { delete db.sessions[sess.token]; markDirty(); log("나감", sess.u.id); return send(res, 200, { ok: true }); }
    if (route === "/api/me") return send(res, 200, Object.assign({ ok: true }, snapshot(sess.u)));
    if (route === "/api/ops" && req.method === "POST") return send(res, 200, ops(sess, body));
    if (route === "/api/trade" && req.method === "POST") return send(res, 200, trade(sess, body));
    return send(res, 404, { ok: false, msg: "없는 주소입니다." });
  } catch (e) {
    console.error(e);
    return send(res, 500, { ok: false, msg: "서버 오류: " + e.message });
  } finally { current = null; }
});

function lanAddrs() {
  const out = [];
  for (const list of Object.values(os.networkInterfaces())) for (const a of list || []) if (a.family === "IPv4" && !a.internal) out.push(a.address);
  return out;
}
function shutdown() { console.log("\n저장하고 끝냅니다…"); try { dirty = true; writeNow(); } catch (e) { console.error(e); } process.exit(0); }
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

server.on("error", e => {
  if (e.code === "EADDRINUSE") console.error(`\n!! ${CFG.port}번 포트를 이미 쓰고 있습니다. 서버가 이미 켜져 있는지 보거나, server/config.json의 port를 바꾸세요.`);
  else console.error(e);
  process.exit(1);
});
server.listen(CFG.port, CFG.host, () => {
  backupDaily();
  const url = `http://localhost:${CFG.port}`;
  console.log(`\n  ETHERION 서버 v${VERSION}`);
  console.log(`  게임 주소   ${url}`);
  for (const ip of lanAddrs()) console.log(`  같은 와이파이  http://${ip}:${CFG.port}`);
  console.log(`  데이터      ${DB_PATH}  (모험가 ${Object.keys(db.users).length}명)`);
  console.log(`  규칙        게임 파일 ${R.files.length}개 · 카드 ${R.CARD_LIST.length}종`);
  console.log(`  관리자      admin / server/config.json의 adminPassword`);
  console.log(`  끄기        이 창에서 Ctrl + C\n`);
  if (CFG.openBrowser) {
    const cmd = process.platform === "win32" ? `start "" "${url}"` : process.platform === "darwin" ? `open "${url}"` : null;
    if (cmd) require("child_process").exec(cmd);
  }
});

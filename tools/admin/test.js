/* 관리자 계정 · 백업 시험 (server/admin.js · server/backup.js · server.js의 관리자 로그인)
   node tools/admin/test.js     임시 폴더의 설정 · 데이터로 시험 서버를 띄운다. 진짜 server/config.json · server/data/ 는 건드리지 않는다.
   시험 암호는 그때그때 무작위로 만든다(파일에 적힌 암호 없음). */
"use strict";
const { spawn, spawnSync } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..", "..");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-admin-"));
const PORT = 20000 + Math.floor(Math.random() * 2000), BASE = `http://127.0.0.1:${PORT}`;
const SRV = path.join(TMP, "server"), CONFIG = path.join(SRV, "config.json"), DB = path.join(SRV, "data", "db.json");
const PW = "t" + crypto.randomBytes(5).toString("hex"), PW2 = "u" + crypto.randomBytes(6).toString("hex"), OLDPW = "old-" + crypto.randomBytes(8).toString("hex");
const NAME = "aidan";
let pass = 0, fail = 0, out = "", srv = null;
const ok = (c, name) => { if (c) pass++; else { fail++; console.log("  ✗ " + name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(method, p, body, token) {
  const r = await fetch(BASE + p, { method, headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}), body: body ? JSON.stringify(body) : undefined });
  const j = await r.json(); j.status = r.status; return j;
}
const post = (p, b, t) => api("POST", p, b || {}, t), get = (p, t) => api("GET", p, null, t);
let seq = 0;
const op = async (t, fn, args, target) => { const s = ++seq; const r = await post("/api/ops", { cid: "t" + t.slice(0, 6), ops: [{ seq: s, fn, args, target }] }, t); return Object.assign({ res: r.results && r.results[s] }, r); };
const node = (args, env) => spawnSync(process.execPath, args, { encoding: "utf8", env: Object.assign({}, process.env, env || {}) });
const adminSet = (id, pw, extra) => node([path.join(ROOT, "server/admin.js"), "set", id, "--config", CONFIG, "--data", DB].concat(extra || []), { ETHERION_ADMIN_PW: pw });
async function start() {
  out = "";
  srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", CONFIG, "--data", DB, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  srv.stdout.on("data", d => out += d); srv.stderr.on("data", d => out += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) return; } catch (e) {} }
  throw new Error("시험 서버가 켜지지 않았습니다\n" + out);
}
async function stop() { if (!srv) return; const p = srv; srv = null; p.kill("SIGTERM"); await new Promise(r => p.on("exit", r)); }
const AGREE = { terms: true, privacy: true, age14: true };

(async () => {
  fs.mkdirSync(path.dirname(DB), { recursive: true });
  /* 1. 옛 방식(admin + adminPassword 원문)으로 한 번 켜서 관리자 덱을 고쳐 둔다 */
  fs.writeFileSync(CONFIG, JSON.stringify({ port: PORT, host: "127.0.0.1", adminPassword: OLDPW, openBrowser: false, codeGapSec: 0 }));
  await start();
  try {
    const a0 = await post("/api/login", { id: "admin", pw: OLDPW });
    ok(a0.ok && a0.me.admin && a0.me.id === "admin", "옛 방식 관리자 로그인 (admin + adminPassword)");
    ok(out.includes("admin / server/config.json의 adminPassword"), "서버 창: 옛 방식 표시");
    const u1 = await post("/api/register", { id: "가람", pw: "longpassword", groups: ["B1"], agree: AGREE });
    ok(u1.ok && !u1.me.admin, "모험가 등록");
    /* 관리자 덱: 모험가가 갖지 못한 카드(기본 덱 밖의 레어 이상)를 넣어 저장 */
    const deck = Object.assign({}, a0.me.decks.B1.cards);
    const rules = require(path.join(ROOT, "server/rules.js")).load();
    const have = u1.me.collection, extra = rules.CARD_LIST.filter(c => c.group === "B1" && !c.retired && !c.base && !have[c.id] && !deck[c.id] && rules.ctx.gradeOf(c) !== "unique");
    ok(extra.length > 0, "모험가에게 없는 B1 카드가 있다");
    const out1 = Object.keys(deck).find(k => deck[k] > 0); deck[out1]--; if (!deck[out1]) delete deck[out1]; deck[extra[0].id] = 1;
    const sv = await op(a0.token, "saveDeck", ["B1", deck, "관리자 시험 덱"]);
    ok(sv.res && sv.res.ok && sv.me.decks.B1.cards[extra[0].id] === 1, "관리자: 보유하지 않은 카드로 덱 저장 (모든 카드)");
    const sv2 = await op(u1.token, "saveDeck", ["B1", deck, "x"]);
    ok(sv2.res && sv2.res.ok === false, "모험가: 같은 덱은 거절 (보유하지 않은 카드)");
    ok(Object.keys(a0.me.collection || {}).length === 0, "관리자의 보유 칸은 비어 있다 (역할로 모든 카드)");
    /* 살아 있는 모든 카드를 관리자가 덱에 넣을 수 있는가: 깃발마다 카드 하나씩 validateDeck 대신 ownedCount로 */
    rules.Store.data = { users: {} };
    const live = rules.CARD_LIST.filter(c => !c.retired && !c.base), adm = { admin: true, collection: {}, owned: {}, decks: {} };
    ok(live.length > 300 && live.every(c => rules.Store.ownedCount(adm, c.id) === rules.maxCopiesOf(c.id) && rules.maxCopiesOf(c.id) >= 1), `관리자: 살아 있는 카드 ${live.length}종 모두 최대 장수`);
    ok(rules.GROUP_IDS.every(g => rules.Store.ownsGroup(adm, g)), "관리자: 모든 깃발");
  } finally { await stop(); }

  /* 2. admin.js: 이름 · 암호 해시 */
  ok(adminSet("가람", PW).status !== 0, "admin.js: 이미 있는 모험가 이름은 거절");
  ok(adminSet(NAME, "short").status !== 0, "admin.js: 짧은 암호 거절");
  ok(adminSet("a<b", PW).status !== 0, "admin.js: 이상한 이름 거절");
  const set = adminSet(NAME, PW);
  ok(set.status === 0, "admin.js set");
  const raw = fs.readFileSync(CONFIG, "utf8"), cfg = JSON.parse(raw);
  ok(cfg.adminId === NAME && /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{64}$/.test(cfg.adminHash), "config: adminId · adminHash(scrypt)");
  ok(!raw.includes(PW) && cfg.adminPassword === undefined && !raw.includes(OLDPW), "config: 암호 원문 없음 · 옛 adminPassword 지움");
  ok(!(set.stdout + set.stderr).includes(PW), "admin.js 출력에 암호 없음");
  ok(/^[0-9a-f]{64}$/.test(cfg.secret) && cfg.port === PORT, "config: 다른 값(열쇠 · 포트)은 그대로");
  ok((fs.statSync(CONFIG).mode & 0o077) === 0 || process.platform === "win32", "config: 나만 읽는 파일(600)");
  const show = node([path.join(ROOT, "server/admin.js"), "show", "--config", CONFIG]);
  ok(show.status === 0 && show.stdout.includes(NAME) && !show.stdout.includes("scrypt$"), "admin.js show: 이름만, 해시는 안 찍음");

  /* 3. 새 방식으로 켜기 */
  await start();
  let adminTok = null, userTok = null, before = null;
  try {
    ok(out.includes(NAME + " / 암호 해시"), "서버 창: 관리자 이름 표시");
    ok(!out.includes(PW), "서버 기록에 암호 없음");
    ok(!(await post("/api/login", { id: "admin", pw: OLDPW })).ok, "옛 이름 · 옛 암호 거절");
    ok(!(await post("/api/login", { id: "admin", pw: PW })).ok, "옛 이름 + 새 암호 거절");
    ok(!(await post("/api/login", { id: NAME, pw: OLDPW })).ok, "새 이름 + 옛 암호 거절");
    ok(!(await post("/api/login", { id: NAME, pw: "" })).ok, "빈 암호 거절");
    const a = await post("/api/login", { id: NAME, pw: PW });
    ok(a.ok && a.me.admin === true && a.me.id === NAME && a.me.pw === undefined, "관리자 로그인 (이름 + 암호 해시)");
    ok((await post("/api/login", { id: "AIDAN", pw: PW })).ok, "관리자 이름은 대소문자 무시");
    adminTok = a.token;
    ok(a.me.decks.B1.name === "관리자 시험 덱", "옛 admin 계정의 덱이 새 이름으로 옮겨짐");
    ok(Array.isArray(a.others) && a.others.some(x => x.id === "가람") && !a.others.some(x => x.id === "admin"), "관리자 스냅샷: 모험가 목록, 옛 admin 계정 없음");
    ok(!JSON.stringify(a).includes("scrypt$"), "응답에 해시 없음");
    for (const id of [NAME, "Aidan", "admin"]) ok(!(await post("/api/register", { id, pw: "longpassword", groups: ["B1"], agree: AGREE })).ok, `관리자 이름으로 등록 거절: ${id}`);
    const u = await post("/api/login", { id: "가람", pw: "longpassword" }); userTok = u.token;
    /* 관리자 작업은 서버가 계정으로 판단 */
    const card = Object.keys(a.shop.c).length ? Object.keys(a.shop.c)[0] : a.shop.known[0];
    for (const [fn, args] of [["shopSet", [[card], { off: 1 }]], ["shopStock", [[card], 3]], ["restock", [[card]]], ["grantAllCards", []], ["grantGroup", ["G1"]], ["addGold", [500, "x"]]])
      ok(((await op(userTok, fn, args)).res || {}).ok === false, `모험가는 거절: ${fn}`);
    ok(((await op(userTok, "saveDeck", ["B1", a.me.decks.B1.cards, "x"], NAME)).res || {}).ok === false, "모험가는 관리자 데이터를 못 바꿈");
    { const r = await post("/api/ops", { cid: "soft", ops: [{ seq: 1, fn: "soft", args: [{ fields: { admin: true, id: NAME } }] }] }, userTok); ok(r.me.admin === false && r.me.id === "가람", "모험가: admin 칸을 스스로 켜지 못함"); }
    const s1 = await op(adminTok, "shopSet", [[card], { off: 1 }]);
    ok(s1.res && s1.res.ok && s1.shop.c[card] && s1.shop.c[card].off === 1, "관리자: 상점에서 카드 내림");
    ok(((await op(userTok, "buyCard", [card, 1])).res || {}).ok === false, "내린 카드는 모험가가 못 삼");
    const s2 = await op(adminTok, "shopSet", [[card], { off: null }]);
    ok(s2.res && s2.res.ok && !(s2.shop.c[card] || {}).off, "관리자: 다시 판매");
    const s3 = await op(adminTok, "shopStock", [[card], 7]);
    ok(s3.res && s3.res.ok && s3.stock[card] === 7, "관리자: 재고 정하기");
    const g1 = await op(adminTok, "grantGroup", ["G1"], "가람");
    ok(g1.others.find(x => x.id === "가람").owned.G1 === true, "관리자: 모험가에게 깃발 지급");
    ok(!(await post("/api/auth/code", { email: "x@example.com" })).token, "메일 코드로는 관리자 토큰이 나오지 않음");
    before = adminTok;
  } finally { await stop(); }

  /* 4. 백업 → 다른 곳에 되살리기 → 그 서버로 로그인 (서버 옮기기) */
  const TMP2 = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-admin-bk-")), OUT = path.join(TMP2, "bk"), NEW = path.join(TMP2, "moved");
  const mk = node([path.join(ROOT, "server/backup.js"), "--root", TMP, "--out", OUT]);
  ok(mk.status === 0, "backup.js: 묶음 만들기");
  const files = fs.existsSync(OUT) ? fs.readdirSync(OUT) : [];
  ok(files.length === 1 && /^etherion-server-\d{8}-\d{6}\.tar\.gz$/.test(files[0]), "묶음 이름");
  const ARC = path.join(OUT, files[0] || "x");
  ok((fs.statSync(ARC).mode & 0o077) === 0 || process.platform === "win32", "묶음: 나만 읽는 파일(600)");
  const ls = node([path.join(ROOT, "server/backup.js"), "list", ARC]).stdout;
  ok(ls.includes("server/config.json") && ls.includes("server/data/db.json"), "묶음 안: config.json · data/db.json");
  ok(node([path.join(ROOT, "server/backup.js"), "--root", TMP, "--out", path.join(TMP, "server", "x")]).status !== 0 && !fs.existsSync(path.join(TMP, "server", "x")), "묶음을 게임 폴더 안에 두는 것은 거절") ;
  fs.mkdirSync(NEW);
  const rs = node([path.join(ROOT, "server/backup.js"), "restore", ARC, "--root", NEW, "--running"]);
  ok(rs.status === 0 && fs.existsSync(path.join(NEW, "server/config.json")) && fs.existsSync(path.join(NEW, "server/data/db.json")), "새 폴더에 되살리기");
  ok(fs.readFileSync(path.join(NEW, "server/config.json"), "utf8") === fs.readFileSync(CONFIG, "utf8"), "되살린 config가 같다");
  fs.writeFileSync(path.join(NEW, "server/data/db.json"), fs.readFileSync(path.join(NEW, "server/data/db.json")));
  const rs2 = node([path.join(ROOT, "server/backup.js"), "restore", ARC, "--root", NEW, "--running"]);
  ok(rs2.status === 0 && fs.readdirSync(NEW).some(x => /^_backup_restore_/.test(x)), "다시 되살리면 있던 것은 _backup_restore_ 로 옮김");
  { const bad = path.join(TMP, "bad.tar.gz"); fs.mkdirSync(path.join(TMP, "evil/js"), { recursive: true }); fs.writeFileSync(path.join(TMP, "evil/js/x.js"), "x");
    spawnSync("tar", ["-czf", bad, "-C", path.join(TMP, "evil"), "js"]);
    ok(node([path.join(ROOT, "server/backup.js"), "restore", bad, "--root", NEW, "--running"]).status !== 0 && !fs.existsSync(path.join(NEW, "js")), "뜻밖의 파일이 든 묶음은 거절"); }
  /* 옮긴 곳에서 켜기 */
  const C2 = path.join(NEW, "server/config.json"), D2 = path.join(NEW, "server/data/db.json");
  srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", C2, "--data", D2, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  srv.stdout.on("data", d => out += d); srv.stderr.on("data", d => out += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) break; } catch (e) {} }
  try {
    const a = await post("/api/login", { id: NAME, pw: PW });
    ok(a.ok && a.me.admin && a.me.decks.B1.name === "관리자 시험 덱", "옮긴 서버: 같은 관리자 이름 · 암호로 로그인, 덱 그대로");
    ok((await post("/api/login", { id: "가람", pw: "longpassword" })).ok, "옮긴 서버: 모험가 로그인 그대로");
    ok((await get("/api/me", before)).ok, "옮긴 서버: 예전 관리자 로그인(토큰)도 이어짐");
  } finally { await stop(); }
  /* 5. 암호를 바꾸면 예전 관리자 로그인이 끊긴다 */
  ok(node([path.join(ROOT, "server/admin.js"), "set", NAME, "--config", C2, "--data", D2], { ETHERION_ADMIN_PW: PW2 }).status === 0, "admin.js: 암호 바꾸기 (같은 이름)");
  srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", C2, "--data", D2, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  srv.stdout.on("data", d => out += d); srv.stderr.on("data", d => out += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) break; } catch (e) {} }
  try {
    await sleep(300);
    ok((await get("/api/me", before)).status === 401, "암호를 바꾸면 예전 관리자 로그인은 끊김");
    ok(!(await post("/api/login", { id: NAME, pw: PW })).ok && (await post("/api/login", { id: NAME, pw: PW2 })).ok, "새 암호만 통함");
    ok(!fs.readFileSync(D2 , "utf8").includes(PW2) && !out.includes(PW2), "db · 기록에 암호 없음");
  } finally { await stop(); }
  console.log(`\n관리자 · 백업 시험: ${pass}개 통과, ${fail}개 실패`);
  fs.rmSync(TMP, { recursive: true, force: true }); fs.rmSync(TMP2, { recursive: true, force: true });
  process.exit(fail ? 1 : 0);
})().catch(async e => { console.error(e); console.log(out.slice(-2000)); await stop(); process.exit(1); });

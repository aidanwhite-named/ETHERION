/* 계정 시험 — 메일 코드 · 비밀번호 로그인, 이메일 연결, 탈퇴, 결제 대비 틀 (server/auth.js · billing.js · mailer.js)
   node tools/auth/test.js     시험용 서버를 임시 폴더의 설정 · 데이터로 띄워 HTTP로 두드린다. 진짜 db.json은 건드리지 않는다. */
"use strict";
const { spawn } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..", "..");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-auth-"));
const PORT = 18000 + Math.floor(Math.random() * 2000), BASE = `http://127.0.0.1:${PORT}`;
const CONFIG = path.join(TMP, "config.json"), DB = path.join(TMP, "db.json");
let pass = 0, fail = 0, out = "";
const ok = (c, name) => { if (c) pass++; else { fail++; console.log("  ✗ " + name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(method, p, body, token) {
  const r = await fetch(BASE + p, { method, headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}), body: body ? JSON.stringify(body) : undefined });
  const j = await r.json(); j.status = r.status; return j;
}
const post = (p, b, t) => api("POST", p, b || {}, t), get = (p, t) => api("GET", p, null, t);
const lastCode = () => { const m = [...out.matchAll(/코드 (\d{6})/g)].pop(); return m ? m[1] : null; };
const wrong = c => String((+c + 1) % 1000000).padStart(6, "0");
const AGREE = { terms: true, privacy: true, age14: true }, FLAGS = ["B1"];
const dbText = async () => { await sleep(500); return fs.readFileSync(DB, "utf8"); };

(async () => {
  /* 예전 모양의 db: 암호 계정 하나 + 토큰 원문이 열쇠인 로그인 */
  const salt = crypto.randomBytes(16).toString("hex"), oldTok = "old-raw-token-ABCDEFGH";
  fs.writeFileSync(CONFIG, JSON.stringify({ port: PORT, host: "127.0.0.1", adminPassword: "test-admin-password", openBrowser: false, codeGapSec: 0 }));
  const first = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", CONFIG, "--data", DB, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  first.stdout.on("data", d => out += d); first.stderr.on("data", d => out += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) break; } catch (e) {} }
  let srv = first;
  try {
    const h = await get("/api/hello");
    ok(h.auth && h.auth.code && h.auth.mail === false && h.auth.emailRequired === false && h.auth.pwMin === 8, "hello: auth 알림");
    ok(h.legal && h.legal.terms && h.legal.privacy, "hello: 문서 버전");
    const cfg = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
    ok(/^[0-9a-f]{64}$/.test(cfg.secret) && /^[0-9a-f]{64}$/.test(cfg.emailEncKey) && cfg.adminPassword === "test-admin-password", "config: 열쇠를 만들고 다른 값은 그대로");

    /* 등록: 동의 · 암호 */
    ok(!(await post("/api/register", { id: "가람", pw: "longpassword", groups: FLAGS })).ok, "동의 없이 등록 거절");
    ok(!(await post("/api/register", { id: "가람", pw: "short", groups: FLAGS, agree: AGREE })).ok, "짧은 암호 거절");
    ok(!(await post("/api/register", { id: "가@람", pw: "longpassword", groups: FLAGS, agree: AGREE })).ok, "이름에 @ 거절");
    const r1 = await post("/api/register", { id: "가람", pw: "longpassword", groups: FLAGS, agree: AGREE });
    ok(r1.ok && r1.token && r1.me.account && r1.me.account.hasPw && r1.me.account.email === null && /^A[0-9A-F]{12}$/.test(r1.me.account.uid), "암호로 등록 (이메일 없이)");
    ok(r1.me.pw === undefined && r1.me.email === undefined && r1.me.agree && r1.me.agree.age14, "스냅샷에 암호 · 이메일 없음, 동의 기록 있음");
    ok((await post("/api/login", { id: "가람", pw: "longpassword" })).ok, "이름 + 암호 로그인");
    ok(!(await post("/api/login", { id: "가람", pw: "nope-nope" })).ok, "틀린 암호 거절");

    /* 메일 코드: 새 사람 → 가입 표 → 등록(암호 없이) */
    const E1 = "Mira.Test@Example.com";
    ok(!(await post("/api/auth/code", { email: "not-an-email" })).ok, "이상한 주소 거절");
    const c1 = await post("/api/auth/code", { email: E1 });
    ok(c1.ok && c1.sent && c1.minutes === 10, "코드 요청");
    const code1 = lastCode(); ok(/^\d{6}$/.test(code1 || ""), "코드가 서버 창(시험 발송)에 찍힘");
    ok(!out.includes("example.com") && !out.toLowerCase().includes("mira.test"), "서버 기록에 주소 원문 없음");
    ok(!(await post("/api/auth/verify", { email: E1, code: wrong(code1) })).ok, "틀린 코드 거절");
    const v1 = await post("/api/auth/verify", { email: " mira.test@example.com ", code: code1 });
    ok(v1.ok && v1.need === "signup" && v1.ticket && !v1.token, "새 주소 → 가입 표 (대소문자 · 공백 무시)");
    ok(!(await post("/api/auth/verify", { email: E1, code: code1 })).ok, "쓴 코드는 다시 못 씀");
    ok(!(await post("/api/register", { id: "미라", groups: FLAGS, agree: AGREE, ticket: "bogus" })).ok, "가짜 표 거절");
    ok(!(await post("/api/register", { id: "가람", groups: FLAGS, agree: AGREE, ticket: v1.ticket })).ok, "있는 이름이면 실패(표는 남음)");
    const r2 = await post("/api/register", { id: "미라", groups: FLAGS, agree: AGREE, ticket: v1.ticket });
    ok(r2.ok && r2.me.account.email && r2.me.account.email.includes("***") && !r2.me.account.hasPw, "표로 등록 — 암호 없이, 가린 주소만");
    ok(!(await post("/api/register", { id: "미라2", groups: FLAGS, agree: AGREE, ticket: v1.ticket })).ok, "쓴 표는 다시 못 씀");
    ok(!(await post("/api/login", { id: "미라", pw: "" })).ok && !(await post("/api/login", { id: E1, pw: "anything1" })).ok, "암호 없는 계정은 암호 로그인 불가");

    /* 메일 코드 로그인 */
    await post("/api/auth/code", { email: E1 });
    const v2 = await post("/api/auth/verify", { email: E1, code: lastCode() });
    ok(v2.ok && v2.token && v2.me.id === "미라", "가입한 주소 → 코드로 로그인");
    const tA = r2.token, tB = v2.token;

    /* 암호 정하기(메일 확인 코드) → 이메일 + 암호 로그인, 다른 기기 로그인 끊김 */
    ok(!(await post("/api/account/password", { pw: "newpassword1" }, tB)).ok, "본인 확인 없이 암호 못 정함");
    ok((await post("/api/account/code", { purpose: "confirm" }, tB)).ok, "확인 코드 요청");
    const p1 = await post("/api/account/password", { pw: "newpassword1", code: lastCode() }, tB);
    ok(p1.ok && p1.hasPw && p1.me.account.hasPw, "코드로 암호 정함");
    ok((await get("/api/me", tA)).status === 401 && (await get("/api/me", tB)).ok, "다른 기기 로그인은 끊기고 이 기기는 남음");
    ok((await post("/api/login", { id: E1, pw: "newpassword1" })).ok && (await post("/api/login", { id: "미라", pw: "newpassword1" })).ok, "이메일 + 암호 · 이름 + 암호 로그인");
    const m1 = await post("/api/login", { id: E1, pw: "wrongwrong" }), m2 = await post("/api/login", { id: "nobody@example.com", pw: "wrongwrong" });
    ok(!m1.ok && !m2.ok && m1.msg === m2.msg, "이메일 로그인 실패는 가입 여부와 상관없이 같은 답");
    ok((await post("/api/account/password", { pw: "newpassword2", cur: "newpassword1" }, tB)).ok && !(await post("/api/account/password", { pw: "x", cur: "newpassword2" }, tB)).ok, "지금 암호로 바꿈 · 짧은 암호 거절");

    /* 이메일 연결 (암호 계정) · 남의 주소 */
    const tG = (await post("/api/login", { id: "가람", pw: "longpassword" })).token, E2 = "garam@example.org";
    ok((await post("/api/account/code", { purpose: "link", email: E2 }, tG)).ok, "연결 코드 요청");
    const l1 = await post("/api/account/email", { email: E2, code: lastCode() }, tG);
    ok(l1.ok && l1.me.account.email.includes("***"), "이메일 연결");
    const before = (out.match(/코드 \d{6}/g) || []).length;
    const l2 = await post("/api/account/code", { purpose: "link", email: E1 }, tG);
    ok(l2.ok && (out.match(/코드 \d{6}/g) || []).length === before, "남이 쓰는 주소: 같은 답이지만 코드는 보내지 않음");
    ok(!(await post("/api/account/email", { email: E1, code: "123456" }, tG)).ok, "남의 주소로는 못 바꿈");
    const sA = await post("/api/auth/code", { email: "ghost@example.net" }), sB = await post("/api/auth/code", { email: E2 });
    ok(JSON.stringify(sA) === JSON.stringify(sB), "코드 요청의 답은 가입 여부와 상관없이 같음");

    /* 5번 틀리면 코드 버림 · 한 주소 1시간 5통 */
    const E3 = "tries@example.com"; await post("/api/auth/code", { email: E3 }); const code3 = lastCode();
    for (let i = 0; i < 5; i++) await post("/api/auth/verify", { email: E3, code: wrong(code3) });
    ok(!(await post("/api/auth/verify", { email: E3, code: code3 })).ok, "5번 틀리면 맞는 코드도 버려짐");
    let lastR; for (let i = 0; i < 5; i++) lastR = await post("/api/auth/code", { email: E3 });
    ok(!lastR.ok, "같은 주소로 1시간 5통까지");

    /* db.json: 주소 원문 · 토큰 원문 · 코드 · 암호 원문이 없다 */
    const txt = await dbText();
    ok(!/example\.(com|org|net)/i.test(txt) && !txt.includes("mira.test") && !txt.includes("garam@"), "db에 이메일 원문 없음");
    ok(!txt.includes(tB) && !txt.includes(tG), "db에 로그인 토큰 원문 없음");
    ok(!txt.includes("newpassword2") && !txt.includes("longpassword") && !txt.includes(`"${code3}"`), "db에 암호 · 코드 원문 없음");
    const D = JSON.parse(txt);
    ok(D.users["미라"].email.k && D.users["미라"].email.enc.startsWith("v1.") && D.emails[D.users["미라"].email.k] === "미라", "이메일은 찾기 열쇠 + 암호문으로");

    /* 기기가 보호 칸을 바꾸지 못함 */
    await post("/api/ops", { cid: "t", ops: [{ seq: 1, fn: "soft", args: [{ fields: { uid: "HACK", agree: null, adult: true, email: { k: "x" }, xp_note: 1 } }] }] }, tG);
    const meG = (await get("/api/me", tG)).me;
    ok(meG.account.uid !== "HACK" && meG.agree && !meG.adult, "기기가 계정 번호 · 동의 · 성인 표시를 못 바꿈");

    /* 결제는 꺼져 있다 */
    const cat = await get("/api/billing/catalog");
    ok(cat.ok && cat.enabled === false && cat.items.length === 0 && !(await post("/api/billing/order", { sku: "x" }, tG)).ok, "결제 꺼짐: 목록 비어 있고 주문 거절");
    const acc = await get("/api/account", tG);
    ok(acc.ok && Array.isArray(acc.orders) && acc.account.email && acc.mail === false, "내 계정 정보");

    /* 모든 기기에서 나가기 */
    const tG2 = (await post("/api/login", { id: "가람", pw: "longpassword" })).token;
    await post("/api/account/logoutAll", {}, tG2);
    ok((await get("/api/me", tG)).status === 401 && (await get("/api/me", tG2)).ok, "모든 기기에서 나가기");

    /* 관리자 사본에 남의 이메일이 없다 */
    const ad = await post("/api/login", { id: "admin", pw: "test-admin-password" });
    ok(ad.ok && ad.others.length >= 2 && ad.others.every(o => o.email === undefined && o.account === undefined && o.pw === undefined), "관리자 보관소 사본에 이메일 · 암호 없음");

    /* 탈퇴 */
    ok(!(await post("/api/account/delete", {}, tB)).ok && !(await post("/api/account/delete", { cur: "wrongwrong" }, tB)).ok, "본인 확인 없이 탈퇴 못 함");
    const del = await post("/api/account/delete", { cur: "newpassword2" }, tB);
    ok(del.ok && del.gone && (await get("/api/me", tB)).status === 401, "탈퇴 → 로그인 끊김");
    ok(!(await post("/api/login", { id: "미라", pw: "newpassword2" })).ok, "탈퇴한 계정으로 로그인 불가");
    const D2 = JSON.parse(await dbText());
    ok(!D2.users["미라"] && !Object.values(D2.emails).includes("미라") && D2.nameHold["미라"] > Date.now() && Object.keys(D2.gone).length === 0, "탈퇴: 계정 · 이메일 흔적 없음, 이름 30일 잠금, 주문이 없으니 남는 것 없음");
    ok(!(await post("/api/register", { id: "미라", pw: "longpassword", groups: FLAGS, agree: AGREE })).ok, "잠긴 이름으로 등록 불가");

    /* 서버를 껐다 켜도: 예전 모양(토큰 원문 열쇠) 로그인이 해시로 옮겨져 이어진다 */
    srv.kill("SIGTERM"); await sleep(700);
    const D3 = JSON.parse(fs.readFileSync(DB, "utf8"));
    D3.users["옛모험가"] = Object.assign({}, D3.users["가람"], { id: "옛모험가", pw: "scrypt$" + salt + "$" + crypto.scryptSync("oldpassword", salt, 32).toString("hex") });
    delete D3.users["옛모험가"].uid; delete D3.users["옛모험가"].email; delete D3.users["옛모험가"].agree;
    D3.sessions[oldTok] = { uid: "옛모험가", at: Date.now(), seen: Date.now(), clients: {} };
    fs.writeFileSync(DB, JSON.stringify(D3));
    srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", CONFIG, "--data", DB, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
    srv.stdout.on("data", d => out += d); srv.stderr.on("data", d => out += d);
    for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) break; } catch (e) {} }
    const old = await get("/api/me", oldTok);
    ok(old.ok && old.me.id === "옛모험가" && /^A[0-9A-F]{12}$/.test(old.me.account.uid), "예전 로그인이 이어지고 계정 번호가 채워짐");
    ok((await post("/api/login", { id: "옛모험가", pw: "oldpassword" })).ok, "예전 암호 계정 로그인");
    ok(!(await dbText()).includes(oldTok), "옮긴 뒤 db에 토큰 원문 없음");
    ok((await post("/api/login", { id: "garam@example.org", pw: "longpassword" })).ok, "껐다 켜도 이메일 + 암호 로그인(열쇠가 config에 남음)");
    for (const f of ["privacy.html", "terms.html"]) { const r = await fetch(BASE + "/" + f); ok(r.status === 200, f + " 열림"); }
    ok((await fetch(BASE + "/server/config.json")).status === 404 && (await fetch(BASE + "/AGENTS.md")).status === 404, "서버 폴더 · 다른 문서는 내주지 않음");
  } finally { srv.kill("SIGTERM"); }

  /* ---------- 결제 대비 틀 (서버 없이 모듈만) ---------- */
  {
    const { makeBilling } = require(path.join(ROOT, "server/billing.js"));
    const db = { users: { 가: { id: "가", uid: "A1", gold: 0, email: { k: "k", enc: "v1.x" }, adult: true }, 손: { id: "손", guest: true } } }, CFG = { billing: { enabled: true, catalog: { shard100: { title: "조각 100", amount: 1100, give: { gold: 100 } } } } };
    const B = makeBilling({ db, CFG, markDirty() {}, log() {}, grant: (u, g) => { u.gold += g.gold; }, takeBack: (u, g) => { if (u.gold < g.gold) return false; u.gold -= g.gold; return true; } });
    ok(B.catalog().items.length === 1, "결제: 목록");
    ok(!B.create(db.users.손, "shard100").ok && !B.create(db.users.가, "none").ok, "결제: 필멸자 · 없는 상품 거절");
    db.users.가.adult = false; ok(!B.create(db.users.가, "shard100").ok, "결제: 성인 확인 없으면 거절"); db.users.가.adult = true;
    const o = B.create(db.users.가, "shard100").order;
    ok(o && o.amount === 1100 && o.state === "created" && B.list("A1").length === 0, "결제: 주문 만듦(아직 안 냄)");
    ok(!B.markPaid(o.oid, { pg: "t", tid: "T1", amount: 1 }).ok && db.users.가.gold === 0, "결제: 금액이 다르면 거절");
    ok(B.markPaid(o.oid, { pg: "t", tid: "T1", amount: 1100 }).ok && db.users.가.gold === 100, "결제: 돈이 들어오면 한 번 줌");
    ok(B.markPaid(o.oid, { pg: "t", tid: "T1", amount: 1100 }).again && db.users.가.gold === 100, "결제: 같은 알림이 또 와도 한 번만");
    const o2 = B.create(db.users.가, "shard100").order;
    ok(!B.markPaid(o2.oid, { pg: "t", tid: "T1", amount: 1100 }).ok, "결제: 한 거래를 다른 주문에 못 씀");
    ok(B.list("A1").length === 1 && B.list("A1")[0].state === "granted" && !("uid" in B.list("A1")[0]), "결제: 내 주문 목록");
    ok(B.refund(o.oid, "시험").ok && db.users.가.gold === 0 && !B.refund(o.oid).ok, "결제: 환불은 한 번, 준 것을 거둠");
    ok(B.detach(db.users.가) === true && db.gone.A1 && db.gone.A1.enc === "v1.x" && db.orders[o2.oid].state === "canceled", "결제: 낸 주문이 있는 사람이 떠나면 계정 번호 · 암호화한 이메일만 5년");
    ok(!JSON.stringify(db.orders).includes('"가"'), "결제: 주문 장부에 이름 없음");
  }
  console.log(`\n계정 시험: ${pass} 통과${fail ? ` · ${fail} 실패` : ""}`);
  try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) {}
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); console.log(out.slice(-2000)); process.exit(1); });

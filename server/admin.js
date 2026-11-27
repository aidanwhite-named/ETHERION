/* ETHERION 관리자 계정 정하기 (2026-11-27)
   node server/admin.js set <이름>     관리자 이름 · 암호를 정한다 (암호는 물어본다 — 화면에 보이지 않음, 두 번)
   node server/admin.js show           지금 관리자 이름 · 암호가 정해졌는지
   덧붙임: --config 다른곳/config.json   (기본 server/config.json)
           --data 다른곳/db.json         (같은 이름의 모험가가 이미 있는지 볼 db, 기본 server/data/db.json)
   암호를 물어볼 수 없는 곳(스크립트)에서는 환경 변수 ETHERION_ADMIN_PW 로 준다.

   적는 곳은 config.json 한 파일뿐이다(git에 올리지 않는 파일): adminId = 이름, adminHash = scrypt 해시(소금 포함).
   암호 원문은 어디에도 남기지 않고, 옛 방식의 adminPassword(원문)는 지운다. 서버를 다시 켜야 반영된다.
   서버를 옮길 때는 config.json을 옮기면 관리자도 같이 간다(node server/backup.js). 암호를 잊었으면 이 명령으로 다시 정한다. */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const CONFIG = path.resolve(arg("--config") || path.join(__dirname, "config.json"));
const DB = path.resolve(arg("--data") || path.join(__dirname, "data", "db.json"));
const PW_MIN = 8;
const NAME_RE = /^[\p{L}\p{N}\p{M} _\-·.]+$/u;   // server.js NAME_RE와 같게

/* server.js hashPw와 같은 모양: scrypt$소금$해시 */
function hashPw(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  return "scrypt$" + salt + "$" + crypto.scryptSync(String(pw), salt, 32).toString("hex");
}
function readJSON(f) { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { if (e.code === "ENOENT") return null; throw e; } }
function die(msg) { console.error("!! " + msg); process.exit(1); }

/* 암호를 화면에 찍지 않고 한 줄 받는다 */
function ask(q) {
  return new Promise(ok => {
    const inp = process.stdin; let s = "";
    process.stdout.write(q);
    inp.setRawMode(true); inp.resume(); inp.setEncoding("utf8");
    const on = ch => {
      for (const c of ch) {
        if (c === "\r" || c === "\n" || c === "\u0004") { inp.setRawMode(false); inp.pause(); inp.removeListener("data", on); process.stdout.write("\n"); return ok(s); }
        if (c === "\u0003") { inp.setRawMode(false); process.stdout.write("\n"); process.exit(130); }
        if (c === "\u007f" || c === "\b") s = s.slice(0, -1); else s += c;
      }
    };
    inp.on("data", on);
  });
}

(async () => {
  const cmd = process.argv[2];
  const cfg = readJSON(CONFIG);
  if (cmd === "show") {
    if (!cfg) die(`${CONFIG} 이 없습니다. 서버를 한 번 켜면 만들어집니다.`);
    console.log(`관리자 이름: ${cfg.adminId || "admin"}`);
    console.log(`암호: ${cfg.adminHash ? "해시로 정해짐 (adminHash)" : cfg.adminPassword ? "옛 방식 — config.json의 adminPassword(원문)" : "정해지지 않음"}`);
    console.log(`들어올 수 있는 곳: ${cfg.adminFrom === "tailnet" ? "이 컴퓨터와 Tailscale 안에서만" : "어디서나 (adminFrom: any)"}`);
    return;
  }
  if (cmd !== "set" || !process.argv[3] || process.argv[3].startsWith("--")) {
    console.log("쓰는 법:\n  node server/admin.js set <이름>   관리자 이름 · 암호 정하기\n  node server/admin.js show         지금 설정 보기");
    process.exit(cmd ? 1 : 0);
  }
  const id = String(process.argv[3]).trim();
  if (id.length < 2 || id.length > 16 || !NAME_RE.test(id) || /^(손님|필멸자)/.test(id)) die("이름은 2~16자, 글자 · 숫자 · 띄어쓰기와 _ - · . 만 쓸 수 있습니다.");
  const db = readJSON(DB);
  if (db && db.users) {
    const hit = Object.keys(db.users).find(k => k.toLowerCase() === id.toLowerCase() && !db.users[k].admin);
    if (hit) die(`「${hit}」은 이미 있는 모험가 이름입니다. 다른 이름을 고르세요.`);
  }
  let pw = process.env.ETHERION_ADMIN_PW;
  if (pw == null) {
    if (!process.stdin.isTTY) die("암호를 물어볼 수 없습니다. 터미널에서 실행하거나 환경 변수 ETHERION_ADMIN_PW 로 주세요.");
    pw = await ask(`관리자 「${id}」의 새 암호 (${PW_MIN}자 이상, 화면에 보이지 않습니다): `);
    if (await ask("한 번 더: ") !== pw) die("두 암호가 다릅니다. 바뀐 것은 없습니다.");
  }
  if (pw.length < PW_MIN) die(`암호는 ${PW_MIN}자 이상으로 정해 주세요.`);
  if (pw === "etherion" || pw.toLowerCase() === id.toLowerCase()) die("너무 쉬운 암호입니다.");
  const next = Object.assign({}, cfg || {}, { adminId: id, adminHash: hashPw(pw) });
  delete next.adminPassword;   // 옛 방식의 원문 암호는 남기지 않는다
  fs.mkdirSync(path.dirname(CONFIG), { recursive: true });
  const tmp = CONFIG + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(next, null, 2) + "\n", { mode: 0o600 });
  fs.renameSync(tmp, CONFIG);
  try { fs.chmodSync(CONFIG, 0o600); } catch (e) {}
  console.log(`관리자 「${id}」의 암호 해시를 ${CONFIG} 에 적었습니다 (adminId · adminHash).`);
  if (pw.length < 12) console.log("  알림: 암호가 짧은 편입니다. 바깥에 연 서버라면 12자 이상이나 config.json의 \"adminFrom\": \"tailnet\"(이 컴퓨터 · Tailscale 안에서만 관리자)을 권합니다.");
  console.log("  서버를 껐다 켜면 반영됩니다. 예전 관리자 로그인은 그때 모두 끊깁니다.");
})().catch(e => die(e.message));

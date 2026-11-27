/* ETHERION 서버 백업 · 되살리기 (2026-11-27) — 서버를 다른 컴퓨터로 옮길 때도 이것을 쓴다 (docs/SERVER.md 7장)
   node server/backup.js                      묶음 만들기 → ~/ETHERION-backup/etherion-server-YYYYMMDD-HHMMSS.tar.gz
   node server/backup.js --out 다른폴더        다른 곳에 (외장 디스크 · 클라우드 동기화 폴더)
   node server/backup.js --signing            안드로이드 서명 열쇠(android/signing/)도 함께
   node server/backup.js list <묶음>          묶음 안의 파일 보기
   node server/backup.js restore <묶음>       이 폴더에 되살리기 (서버를 끈 뒤에. 있던 것은 _backup_restore_<때>/ 로 옮겨 둠)

   묶음에 든 것 (모두 git에 올리지 않는 것 — 이것만 있으면 코드는 git에서 받아 서버를 그대로 되살린다)
     server/config.json   관리자 이름 · 암호 해시, 계정 열쇠(secret · emailEncKey), 메일 설정
     server/data/         db.json(모험가 · 덱 · 상점 · 거래) + 하루 백업
   묶음은 비밀이다: 남에게 주지 말고, 공개 저장소 · 공유 폴더에 두지 않는다. 묶음 파일은 나만 읽게(600) 만든다.
   Node 기본 기능 + 컴퓨터의 tar(맥 · 리눅스 · 윈도우 10 이상에 들어 있음)만 쓴다. */
"use strict";
const fs = require("fs"), path = require("path"), os = require("os");
const { execFileSync } = require("child_process");
const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const ROOT = path.resolve(opt("--root") || path.join(__dirname, ".."));   // --root: 시험용 (tools/admin/test.js)
const KEEP = Math.max(1, +(opt("--keep") || 30));   // 백업 폴더에 남길 묶음 수
const ALLOWED = ["server/config.json", "server/data", "android/signing"];
function die(msg) { console.error("!! " + msg); process.exit(1); }
const stamp = () => { const d = new Date(), p = n => String(n).padStart(2, "0"); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`; };
function listOf(file) {
  return execFileSync("tar", ["-tzf", file], { encoding: "utf8", maxBuffer: 64e6 }).split("\n").map(x => x.trim()).filter(Boolean);
}
/* 묶음 안의 길은 server/config.json · server/data/ · android/signing/ 아래여야 한다 (.. · 절대 길은 거절) */
function safe(names) {
  for (const n of names) {
    const c = n.replace(/\\/g, "/").replace(/\/+$/, "");
    if (c.startsWith("/") || c.split("/").includes("..") || !ALLOWED.some(a => c === a || c.startsWith(a + "/"))) die(`묶음에 뜻밖의 파일이 있습니다: ${n}`);
  }
}

function make() {
  const outDir = path.resolve(opt("--out") || path.join(os.homedir(), "ETHERION-backup"));
  if (outDir === ROOT || outDir.startsWith(ROOT + path.sep)) {
    const rel = path.relative(ROOT, outDir).split(path.sep)[0];
    if (!/^_backup_/.test(rel)) die("묶음을 게임 폴더 안에 두지 마세요(git에 딸려 올라갈 수 있습니다). --out 으로 바깥 폴더를 고르세요.");
  }
  const what = ["server/config.json", "server/data"].concat(args.includes("--signing") ? ["android/signing"] : []).filter(p => fs.existsSync(path.join(ROOT, p)));
  if (!what.includes("server/config.json")) die("server/config.json 이 없습니다. 서버를 한 번 켠 뒤에 백업하세요.");
  if (!what.includes("server/data")) console.log("  알림: server/data/ 가 아직 없습니다. 설정만 묶습니다.");
  fs.mkdirSync(outDir, { recursive: true, mode: 0o700 });
  const file = path.join(outDir, `etherion-server-${stamp()}.tar.gz`);
  /* db.json은 서버가 새 파일을 쓰고 이름을 바꾸는 식으로 저장하므로, 켜진 채로 묶어도 반쯤 쓰인 파일이 들어가지 않는다 */
  execFileSync("tar", ["-czf", file, "--exclude", "*.tmp", "-C", ROOT].concat(what), { stdio: ["ignore", "inherit", "inherit"] });
  try { fs.chmodSync(file, 0o600); } catch (e) {}
  const names = listOf(file); safe(names);
  const all = fs.readdirSync(outDir).filter(x => /^etherion-server-\d{8}-\d{6}\.tar\.gz$/.test(x)).sort();
  for (const x of all.slice(0, Math.max(0, all.length - KEEP))) fs.unlinkSync(path.join(outDir, x));
  console.log(`백업 묶음: ${file}`);
  console.log(`  ${what.join(" · ")}  (파일 ${names.filter(n => !n.endsWith("/")).length}개, ${(fs.statSync(file).size / 1024).toFixed(1)} KB)`);
  console.log("  이 파일은 비밀입니다(계정 열쇠 · 관리자 암호 해시 · 모험가 데이터). 다른 디스크나 암호가 걸린 저장소에도 한 벌 두세요.");
}

function restore(file) {
  if (!file || !fs.existsSync(file)) die("되살릴 묶음 파일을 주세요: node server/backup.js restore <묶음.tar.gz>");
  file = path.resolve(file);
  const names = listOf(file); safe(names);
  if (!names.some(n => n.replace(/\/+$/, "") === "server/config.json")) die("이 묶음에는 server/config.json 이 없습니다.");
  /* 켜져 있는 서버 위에 되살리면 서버가 곧 옛 데이터로 덮어쓴다 — 먼저 끈다 */
  let port = 8787; try { port = +JSON.parse(fs.readFileSync(path.join(ROOT, "server/config.json"), "utf8")).port || 8787; } catch (e) {}
  const up = (() => { try { execFileSync(process.execPath, ["-e", `require("http").get("http://127.0.0.1:${port}/api/hello",r=>process.exit(r.statusCode===200?0:1)).on("error",()=>process.exit(1)).setTimeout(1500,()=>process.exit(1))`], { stdio: "ignore" }); return true; } catch (e) { return false; } })();
  if (up && !args.includes("--running")) die(`이 컴퓨터의 ${port}번 포트에 서버가 켜져 있습니다. 서버를 끈 뒤에 되살리세요.`);
  const tops = ALLOWED.filter(a => names.some(n => { const c = n.replace(/\/+$/, ""); return c === a || c.startsWith(a + "/"); }));
  const had = tops.filter(p => fs.existsSync(path.join(ROOT, p)));
  if (had.length) {
    const keep = path.join(ROOT, `_backup_restore_${stamp()}`);   // .gitignore의 _backup_*/
    for (const p of had) { const to = path.join(keep, p); fs.mkdirSync(path.dirname(to), { recursive: true }); fs.renameSync(path.join(ROOT, p), to); }
    console.log(`있던 ${had.join(" · ")} 은(는) ${keep} 로 옮겨 두었습니다.`);
  }
  execFileSync("tar", ["-xzf", file, "-C", ROOT], { stdio: ["ignore", "inherit", "inherit"] });
  try { fs.chmodSync(path.join(ROOT, "server/config.json"), 0o600); } catch (e) {}
  console.log(`되살렸습니다: ${tops.join(" · ")}`);
  console.log("  이제 서버를 켜세요. 관리자 이름 · 암호, 모험가 계정이 예전 그대로입니다.");
}

const cmd = args[0] && !args[0].startsWith("--") ? args[0] : "make";
try {
  if (cmd === "make") make();
  else if (cmd === "list") { if (!args[1]) die("묶음 파일을 주세요."); for (const n of listOf(path.resolve(args[1]))) console.log(n); }
  else if (cmd === "restore") restore(args[1]);
  else die("쓰는 법: node server/backup.js [--out 폴더] [--signing]  ·  list <묶음>  ·  restore <묶음>");
} catch (e) { die(e.message); }

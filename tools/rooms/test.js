/* 온라인 대전 방 시험 — 방 목록 · 만들기 · 입장 · 비밀번호 · 준비 · 채팅 · 내보내기 · 시작 · 돌아오기 (server/rooms.js)
   node tools/rooms/test.js     시험용 서버를 임시 폴더의 설정 · 데이터로 띄워 HTTP로 두드린다. 진짜 db.json · 8787 서버는 건드리지 않는다. */
"use strict";
const { spawn } = require("child_process");
const fs = require("fs"), os = require("os"), path = require("path");
const ROOT = path.join(__dirname, "..", "..");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "etherion-rooms-"));
const PORT = 20000 + Math.floor(Math.random() * 2000), BASE = `http://127.0.0.1:${PORT}`;
const CONFIG = path.join(TMP, "config.json"), DB = path.join(TMP, "db.json");
let pass = 0, fail = 0, out = "";
const ok = (c, name) => { if (c) pass++; else { fail++; console.log("  ✗ " + name); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(method, p, body, token) {
  const r = await fetch(BASE + p, { method, headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: "Bearer " + token } : {}), body: body ? JSON.stringify(body) : undefined });
  const j = await r.json(); j.status = r.status; return j;
}
const post = (p, b, t) => api("POST", p, b || {}, t), get = (p, t) => api("GET", p, null, t);
const AGREE = { terms: true, privacy: true, age14: true };

(async () => {
  fs.writeFileSync(CONFIG, JSON.stringify({ port: PORT, host: "127.0.0.1", adminPassword: "test-admin-password", openBrowser: false, codeGapSec: 0 }));
  const srv = spawn(process.execPath, [path.join(ROOT, "server/server.js"), "--config", CONFIG, "--data", DB, "--no-open"], { stdio: ["ignore", "pipe", "pipe"] });
  srv.stdout.on("data", d => out += d); srv.stderr.on("data", d => out += d);
  for (let i = 0; i < 100; i++) { await sleep(150); try { if ((await get("/api/hello")).ok) break; } catch (e) {} }
  try {
    const reg = async (id, groups) => { const r = await post("/api/register", { id, pw: "longpassword", groups, agree: AGREE }); if (!r.ok) throw new Error("등록 실패 " + id + ": " + r.msg); return r.token; };
    const A = await reg("가람", ["B1", "G1"]), B = await reg("미라", ["A1"]), C = await reg("도윤", ["B2"]);
    const room = (t, b) => post("/api/room", b, t);

    /* 필멸자 · 로그인 없이 */
    const g = await post("/api/guest", {});
    ok(!(await room(g.token, { a: "list" })).ok, "필멸자는 방 목록을 못 본다");
    ok((await post("/api/room", { a: "list" })).status === 401, "로그인 없이는 401");

    /* 만들기 */
    let L = await room(A, { a: "list" });
    ok(L.ok && L.rooms.length === 0 && L.mine === null, "처음엔 빈 목록");
    ok(!(await room(A, { a: "create", title: "x", flag: "A1" })).ok, "가지지 않은 깃발로는 못 만든다");
    ok(!(await room(A, { a: "create", title: "x", flag: "ZZ" })).ok, "없는 깃발 거절");
    ok(!(await room(A, { a: "create", title: "x", flag: "__proto__" })).ok, "이상한 깃발 이름 거절");
    let r = await room(A, { a: "create", title: "  <b>불꽃</b>\u0000의   결투  " + "가".repeat(40), pw: "", showFlag: true, flag: "B1" });
    ok(r.ok && r.room.title.length <= 24 && !/[\u0000]/.test(r.room.title) && !/\s{2}/.test(r.room.title), "제목: 길이 제한 · 제어 글자 · 겹친 공백 정리");
    ok(r.room.host === "가람" && r.room.members.length === 1 && r.room.members[0].flag === "B1" && r.room.members[0].score > 0 && r.room.members[0].lv === 1, "방장 정보(깃발 · 덱 점수 · 레벨)");
    ok(r.room.status === "wait" && r.room.lock === false && r.room.peer === null, "대기 중 · 열린 방");
    L = await room(B, { a: "list" });
    ok(L.rooms.length === 1 && L.rooms[0].host.id === "가람" && L.rooms[0].host.lv === 1 && L.rooms[0].flag === "B1" && L.rooms[0].n === 1 && L.rooms[0].status === "wait" && L.rooms[0].pw === undefined, "목록: 방장 · 레벨 · 깃발 · 인원 · 상태");
    const rid = L.rooms[0].id;

    /* 입장 · 깃발 · 준비 · 채팅 */
    ok(!(await room(B, { a: "join", id: "nope", flag: "A1" })).ok, "없는 방 거절");
    ok(!(await room(B, { a: "join", id: rid, flag: "B1" })).ok, "가지지 않은 깃발로 입장 거절");
    r = await room(B, { a: "join", id: rid, flag: "A1" });
    ok(r.ok && r.room.members.length === 2 && r.room.members[1].id === "미라" && r.room.members[0].flag === "B1", "입장 · 공개 방은 상대 깃발이 보인다");
    ok(!(await room(C, { a: "join", id: rid, flag: "B2" })).ok, "가득 찬 방 거절");
    ok(!(await room(B, { a: "kick" })).ok, "도전자는 내보낼 수 없다");
    ok(!(await room(B, { a: "start", peer: "ABCDE" })).ok, "도전자는 시작할 수 없다");
    ok(!(await room(A, { a: "start", peer: "ABCDE" })).ok, "준비하지 않으면 시작할 수 없다");

    /* long-poll: 바뀔 때까지 기다렸다가 바로 답한다 */
    const ver = r.room.ver, t0 = Date.now();
    const lp = room(A, { a: "poll", ver });
    await sleep(400);
    r = await room(B, { a: "chat", text: "  안녕하세요 <img src=x onerror=alert(1)>  " + "ㅋ".repeat(300) });
    ok(r.ok, "채팅 보내기");
    const pr = await lp;
    ok(pr.ok && Date.now() - t0 < 3000 && pr.room.ver > ver, "long-poll이 채팅에 바로 깬다");
    const last = pr.room.chat[pr.room.chat.length - 1];
    ok(last.from === "미라" && last.text.length <= 200 && last.text.startsWith("안녕하세요 <img"), "채팅: 길이 제한, 글은 그대로(화면에서 esc)");
    ok(!(await room(B, { a: "chat", text: "   " })).ok, "빈 채팅 거절");
    let lim = 0; for (let i = 0; i < 12; i++) if (!(await room(B, { a: "chat", text: "도배 " + i })).ok) lim++;
    ok(lim >= 3, "채팅 빈도 제한");
    ok(!(await room(C, { a: "chat", text: "밖에서" })).ok, "방 밖에서는 채팅 못 함");

    r = await room(A, { a: "flag", flag: "G1" });
    ok(r.ok && r.room.members[0].flag === "G1" && r.room.members[0].ready === false, "깃발 바꾸기");
    ok(!(await room(A, { a: "flag", flag: "A2" })).ok, "가지지 않은 깃발로 못 바꾼다");
    await room(A, { a: "ready", v: true }); r = await room(B, { a: "ready", v: true });
    ok(r.room.members.every(m => m.ready), "둘 다 준비");
    r = await room(B, { a: "flag", flag: "A1" });
    ok(r.room.members[1].ready === false, "깃발을 다시 고르면 준비가 풀린다");
    await room(B, { a: "ready", v: true });
    ok(!(await room(A, { a: "start", peer: "abc" })).ok, "이상한 연결 번호 거절");
    r = await room(A, { a: "start", peer: "ABCDE" });
    ok(r.ok && r.room.status === "play" && r.room.peer === "ABCDE", "시작 → 대전 중");
    r = await room(B, { a: "poll", ver: 0 });
    ok(r.room.status === "play" && r.room.peer === "ABCDE", "도전자가 연결 번호를 받는다");
    L = await room(C, { a: "list" });
    ok(L.rooms[0].status === "play" && L.rooms[0].peer === undefined && JSON.stringify(L).indexOf("ABCDE") < 0, "목록에는 연결 번호가 없다 · 대전 중 표시");
    ok(!(await room(C, { a: "join", id: rid, flag: "B2" })).ok, "대전 중인 방 입장 거절");
    ok(!(await room(A, { a: "kick" })).ok, "대전 중에는 내보낼 수 없다");
    ok((await room(A, { a: "ping" })).ok, "대전 중 ping");
    r = await room(A, { a: "back" });
    ok(r.room.status === "play" && r.room.members[0].inGame === false, "한 사람만 돌아오면 아직 대전 중");
    r = await room(B, { a: "back" });
    ok(r.room.status === "wait" && r.room.peer === null && r.room.members.every(m => !m.ready && !m.inGame), "둘 다 돌아오면 대기 · 준비 풀림");

    /* 내보내기 · 방장 넘기기 */
    r = await room(A, { a: "kick" });
    ok(r.ok && r.room.members.length === 1, "방장이 내보냄");
    r = await room(B, { a: "poll", ver: 0 });
    ok(!r.ok && r.gone === "kick", "내보내진 사람은 까닭을 받는다");
    ok(!(await room(B, { a: "join", id: rid, flag: "A1" })).ok, "내보내진 방에는 다시 못 들어간다");
    r = await room(C, { a: "join", id: rid, flag: "B2" });
    ok(r.ok, "다른 사람은 들어온다");
    await room(A, { a: "leave" });
    r = await room(C, { a: "poll", ver: 0 });
    ok(r.ok && r.room.host === "도윤" && r.room.members.length === 1, "방장이 나가면 남은 사람이 방장");
    await room(C, { a: "leave" });
    ok((await room(C, { a: "list" })).rooms.length === 0, "아무도 없으면 방이 사라진다");

    /* 비밀번호 · 깃발 비공개 · 빠른 입장 */
    r = await room(A, { a: "create", title: "비밀의 방", pw: "열쇠1234", showFlag: false, flag: "B1" });
    ok(r.ok && r.room.lock === true && r.room.showFlag === false, "잠긴 · 깃발 비공개 방");
    const rid2 = r.room.id;
    L = await room(B, { a: "list" });
    ok(L.rooms[0].lock === true && L.rooms[0].flag === null && JSON.stringify(L).indexOf("열쇠") < 0 && JSON.stringify(L).indexOf("scrypt") < 0, "목록: 🔒 · 깃발 가림 · 비밀번호(해시) 없음");
    ok((await room(B, { a: "quick", flag: "A1" })).none === true, "빠른 입장은 잠긴 방에 들어가지 않는다");
    r = await room(B, { a: "join", id: rid2, flag: "A1" });
    ok(!r.ok && r.needPw && !r.wrongPw, "비밀번호 없이 → 물어봄");
    r = await room(B, { a: "join", id: rid2, flag: "A1", pw: "틀림" });
    ok(!r.ok && r.wrongPw, "틀린 비밀번호 거절");
    r = await room(B, { a: "join", id: rid2, flag: "A1", pw: "열쇠1234" });
    ok(r.ok && r.room.members[0].flag === null && r.room.members[0].score === null && r.room.members[1].flag === "A1", "맞는 비밀번호 입장 · 비공개 방은 상대 깃발 · 점수가 가려진다");
    r = await room(A, { a: "poll", ver: 0 });
    ok(r.room.members[1].flag === null && r.room.members[0].flag === "B1", "방장 쪽에서도 상대 깃발이 가려진다");
    await room(A, { a: "ready", v: true }); await room(B, { a: "ready", v: true });
    r = await room(A, { a: "start", peer: "QWERT" });
    ok(r.room.members[1].flag === "A1", "대전이 시작되면 깃발이 보인다");
    r = await room(B, { a: "back", fail: true });
    ok(r.room.status === "wait" && r.room.members.every(m => !m.inGame), "연결 실패 알림 → 방 전체가 대기로");
    await room(B, { a: "leave" });
    let wrong = 0; for (let i = 0; i < 10; i++) { const x = await room(C, { a: "join", id: rid2, flag: "B2", pw: "추측" + i }); if (/여러 번/.test(x.msg || "")) wrong++; }
    ok(wrong >= 1, "틀린 비밀번호 빈도 제한");
    await room(A, { a: "leave" });

    r = await room(A, { a: "create", title: "", flag: "B1" });
    ok(r.ok && r.room.title === "가람의 방", "제목을 비우면 기본 제목");
    r = await room(B, { a: "quick", flag: "A1" });
    ok(r.ok && r.room && r.room.members.length === 2, "빠른 입장");
    /* 다른 방을 만들면 앞의 방에서 나간다 */
    r = await room(B, { a: "create", title: "새 방", flag: "A1" });
    L = await room(C, { a: "list" });
    ok(r.ok && L.rooms.length === 2 && L.rooms.every(x => x.n === 1) && (await room(B, { a: "list" })).mine === r.room.id, "한 사람은 한 방에만");
    ok(!fs.existsSync(DB) || fs.readFileSync(DB, "utf8").indexOf("새 방") < 0, "방은 db.json에 쓰지 않는다");
    ok(!(await room(A, { a: "nope" })).ok, "모르는 요청 거절");
    ok(!/Error|놓친 오류/.test(out), "서버 오류 기록 없음");
  } catch (e) { fail++; console.log("  ✗ 시험이 멈춤:", e); }
  srv.kill();
  await sleep(200);
  try { fs.rmSync(TMP, { recursive: true, force: true }); } catch (e) {}
  console.log(`방 시험: ${pass}개 통과${fail ? ` · ${fail}개 실패` : ""}`);
  if (fail) { console.log(out.split("\n").slice(-15).join("\n")); process.exit(1); }
})();

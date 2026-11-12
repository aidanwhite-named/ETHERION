/* ETHERION 서버 일꾼 (v3.40) — 컴퓨터와 대전 · 순례 판을 화면 없이 다시 둬서 검산한다.
   server.js가 child_process.fork로 띄운다. 게임 규칙(js/engine.js · js/game.js의 화면 앞까지 · js/aihard.js)은 균형 도구와 같은 방식(tools/balance/harness.js)으로 읽는다.
   받는 일: { jid, seed, p0, p1, log }  →  돌려주는 것: { jid, winner, turn, broken: [카드 ID …] } 또는 { jid, error }
   판 결과에 쓰이는 무작위는 모두 판 시드(GRand · 엔진 RNG · 코인 다시 던지기 reflipRand)라, 같은 시드와 같은 사람 쪽 기록이면 같은 판이 나온다.
   시험: node tools/replay_check.js */
"use strict";
const path = require("path");
const { load } = require("../tools/balance/harness");
const ctx = load(path.join(__dirname, "..", "js"));

process.on("message", async job => {
  const out = { jid: job && job.jid };
  try {
    ctx.seed(1);   // 판 결과와 상관없는 Math.random(연출 · 시드 없는 곳)을 늘 같게
    const log = Array.isArray(job.log) ? job.log : [];
    const g = await ctx.playHeadless({ seed: job.seed >>> 0, verify: true, replay: log.slice(), replayAll: log.slice(), p0: job.p0, p1: job.p1 });
    Object.assign(out, { winner: g.winner, turn: g.turn, broken: (g.broken || []).slice() });
  } catch (e) {
    out.error = String(e && e.message || e).slice(0, 200);
  }
  process.send(out);
});
process.send({ ready: true });

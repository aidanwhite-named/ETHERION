/* 카드 한국어 원문 지문: 이름 · 마법 글 · 짧은 문구 · 서사 · 종류가 바뀌면 달라진다 */
"use strict";
function hashOf(e) {
  const s = [e.n, e.t, e.b, e.f, e.k].map(x => x || "").join("\u0001");
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h.toString(36);
}
module.exports = { hashOf };

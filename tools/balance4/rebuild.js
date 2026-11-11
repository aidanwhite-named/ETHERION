/* ETHERION 밸런스 v4 — 유닛 수치 다시 맞추기 (v3.30, docs/BALANCE_v4_draft.md)
   node tools/balance4/rebuild.js [--from 원본폴더] [--to 쓸폴더] [--offsets 파일] [--write] [--report 파일]
     --from  바꾸기 전 카드 파일이 있는 폴더(없는 파일은 js/에서 읽음). 기본 _backup_v3.30_rebal/js — 몇 번을 돌려도 같은 원본에서 시작
     --to    고친 data.js · pincards.js · highcards.js · uniques.js · upgrades.js를 쓸 폴더(기본 js). --write가 있어야 씀
     --offsets  깃발별 보정(점수) JSON {B1: 0.3, …} — 3레벨 이상 · 역행이 아닌 카드의 목표에 더함
   규칙
   - 새 기준 T(레벨, 유지비) = (4 + 2 × 레벨) + V(유지비), V = 1.5 · 3.25 · 5.25 · 7.5 (칸마다 +0.25)
   - 유지비: 0은 그대로, 1 이상은 1. 강화 카드(base 있음)만 레벨 − 1. 스페셜 · 소환물은 건드리지 않음
   - 카드마다 지금 자리를 살린다: 새 가격 = T(레벨, 새 유지비) + (지금 가격 − 옛 기준(레벨, 지금 유지비)) + 깃발 보정
       옛 기준 = 같은 레벨 · 유지비 일반 유닛(역행 제외) 평균(장수가 적으면 지수 곡선 쪽으로 당김)
       그래서 등급의 세기(고급 · 레어 · 에픽 · 유니크 · 강화가 같은 자리 일반보다 센 몫)와 깃발 보정(v1.3)이 그대로 옮겨진다
   - 스탯: 방어 · 코인 · 표시는 그대로, 적힌 공 · 체만 정수로 고친다 — 가격 오차와 "공/체 몫"(1.2 × 기대 공 ÷ (1.2 × 기대 공 + 기대 체))이
     지금과 달라지는 몫을 함께 가장 작게. 공 13 · 체 14 위로는 올리지 않음(지금 그보다 큰 카드는 그 값까지). 체 1 · 공 0 아래로는 내리지 않음
   - 같은 깃발 · 레벨 · 유지비에 공/방/체 · 코인 · 표시 · 능력이 똑같은 카드가 생기면 다음으로 좋은 값을 쓴다 */
"use strict";
const fs = require("fs"), vm = require("vm"), path = require("path");
const ROOT = path.join(__dirname, "../.."), JS = path.join(ROOT, "js");
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const FROM = path.resolve(ROOT, arg("--from", "_backup_v3.30_rebal/js")), TO = path.resolve(ROOT, arg("--to", "js"));
const WRITE = process.argv.includes("--write");
const OFF = arg("--offsets") ? JSON.parse(fs.readFileSync(arg("--offsets"), "utf8")) : {};
const FILES = ["data.js", "names.js", "retired.js", "specials.js", "uniques.js", "highcards.js", "pincards.js", "rarespells.js", "counterspells.js", "upgrades.js", "decks.js", "cards.js", "grades.js"];
const src = f => fs.existsSync(path.join(FROM, f)) ? path.join(FROM, f) : path.join(JS, f);
const ctx = { console: { log() {}, error() {}, warn() {} }, Math, JSON, Object, Array, Set, Map, parseInt, parseFloat, isNaN };
ctx.window = ctx; ctx.document = { querySelector() { return null; }, querySelectorAll() { return []; }, addEventListener() {} };
vm.createContext(ctx);
for (const f of FILES) vm.runInContext(fs.readFileSync(src(f), "utf8"), ctx, { filename: f });
const ev = s => vm.runInContext(s, ctx);

const P = lv => 4 + 2 * lv;
const V = u => { let s = 0; for (let k = 1; k <= u; k++) s += 1.25 + 0.25 * k; return s; };
const T = (lv, up) => P(lv) + V(up);
const dv = d => d <= 0 ? d : d <= 1 ? 1.3 * d : 1.3 + 1.5 * (d - 1);
const cexp = (co, k) => (co || []).filter(x => x[0] === k).reduce((s, [, n, v]) => s + 0.5 * n * v, 0);
const price = (a, d, h, co) => 1.2 * (a + cexp(co, "a")) + dv(d + cexp(co, "d")) + (h + cexp(co, "h"));
const share = (a, h, co) => { const A = 1.2 * Math.max(0, a + cexp(co, "a")), H = Math.max(0, h + cexp(co, "h")); return A + H > 0 ? A / (A + H) : 0; };

const units = ev(`CARD_LIST.filter(c => c.type === "unit" && gradeOf(c) !== "special").map(c => ({ id: c.id, n: c.name, g: c.group, lv: c.lv, up: c.up, a: c.a, d: c.d, h: c.h, co: c.co || [], pin: c.pin || null, gift: c.gift || null, rev: c.rev || "", base: c.base || null, gr: gradeOf(c) }))`);
for (const u of units) u.p = price(u.a, u.d, u.h, u.co);

/* 옛 기준: 일반 · 역행 제외, (레벨, 유지비) 칸 평균. 칸 장수 n이 적으면 지수 곡선(로그 회귀) 쪽으로 (n · 평균 + 4 · 곡선) / (n + 4) */
const com = units.filter(u => u.gr === "common" && !u.rev);
const lsq = (X, y) => { const n = X[0].length, A = Array.from({ length: n }, () => Array(n).fill(0)), b = Array(n).fill(0);
  X.forEach((x, i) => { for (let p = 0; p < n; p++) { b[p] += x[p] * y[i]; for (let q = 0; q < n; q++) A[p][q] += x[p] * x[q]; } });
  for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) if (k !== i) { const m = A[k][i] / A[i][i]; for (let j = 0; j < n; j++) A[k][j] -= m * A[i][j]; b[k] -= m * b[i]; }
  return b.map((v, i) => v / A[i][i]); };
const fit = lsq(com.map(u => [1, u.lv, u.up]), com.map(u => Math.log(u.p)));
const curve = (lv, up) => Math.exp(fit[0] + fit[1] * lv + fit[2] * up);
const OLD = {};
const oldBase = (lv, up) => { const k = lv + "/" + up; if (OLD[k] != null) return OLD[k];
  const c = com.filter(u => u.lv === lv && u.up === up), n = c.length, m = n ? c.reduce((s, u) => s + u.p, 0) / n : 0;
  return OLD[k] = (n * m + 4 * curve(lv, up)) / (n + 4); };

/* 스탯 풀기 */
const CAP_A = 13, CAP_H = 14;
function solve(u, up2, target) {
  const s0 = share(u.a, u.h, u.co), out = [];
  const capA = Math.max(CAP_A, u.a), capH = Math.max(CAP_H, u.h);
  for (let a = Math.max(0, u.a - 6); a <= Math.min(capA, u.a + 6); a++) {
    if (u.a === 0 && a > 0) break;                     // 공격 0 유닛(벽)은 0 그대로
    for (let h = Math.max(1, u.h - 8); h <= Math.min(capH, u.h + 8); h++) {
      const p = price(a, u.d, h, u.co), e = p - target, sd = (share(a, h, u.co) - s0) * target;
      out.push({ a, h, p, cost: e * e + 0.5 * sd * sd });
    }
  }
  return out.sort((x, y) => x.cost - y.cost);
}

const res = [];
const key = (u, up, a, h) => [u.g, u.lv, up, a, u.d, h, JSON.stringify(u.co), JSON.stringify(u.pin), JSON.stringify(u.gift)].join("|");
const taken = new Set();
// 바뀌지 않는 카드부터 자리를 차지하지 않도록: 모두 푼 뒤 겹침을 고친다
for (const u of units) {
  const up2 = u.base ? Math.max(0, u.lv - 1) : (u.up >= 1 ? 1 : 0);
  const dev = u.p - oldBase(u.lv, u.up);
  const off = (!u.rev && u.lv >= 3 && OFF[u.g]) ? OFF[u.g] : 0;
  const target = T(u.lv, up2) + dev + off;
  const cand = solve(u, up2, target);
  let pick = cand[0];
  for (const c of cand) { if (!taken.has(key(u, up2, c.a, c.h))) { pick = c; break; } }
  taken.add(key(u, up2, pick.a, pick.h));
  res.push(Object.assign({}, u, { up2, dev, target, a2: pick.a, h2: pick.h, p2: pick.p, s0: share(u.a, u.h, u.co), s2: share(pick.a, pick.h, u.co) }));
}

/* 보고 */
const f1 = x => (Math.round(x * 10) / 10).toFixed(1);
const out = [];
out.push(`옛 곡선(일반): 레벨마다 ×${Math.exp(fit[1]).toFixed(3)}, 유지비마다 ×${Math.exp(fit[2]).toFixed(3)}`);
out.push("옛 기준 → 새 기준 (레벨/유지비): " + Object.keys(OLD).sort().map(k => { const [l, u] = k.split("/").map(Number); return `${k} ${f1(OLD[k])}→${f1(T(l, u >= 1 ? 1 : 0))}`; }).join(" · "));
const changed = res.filter(r => r.up2 !== r.up || r.a2 !== r.a || r.h2 !== r.h);
out.push(`바뀐 유닛 ${changed.length} / ${res.length} · 유지비 바뀜 ${res.filter(r => r.up2 !== r.up).length} · 가격 오차 평균 ${f1(res.reduce((s, r) => s + Math.abs(r.p2 - r.target), 0) / res.length)} · 공/체 몫 차이 평균 ${(res.reduce((s, r) => s + Math.abs(r.s2 - r.s0), 0) / res.length).toFixed(3)}`);
const G = ["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"];
out.push("깃발별 평균 가격 변화: " + G.map(g => { const a = res.filter(r => r.g === g); return g + " " + (a.reduce((s, r) => s + r.p2 - r.p, 0) / a.length >= 0 ? "+" : "") + f1(a.reduce((s, r) => s + r.p2 - r.p, 0) / a.length); }).join(" · "));
for (let lv = 1; lv <= 7; lv++) { const a = res.filter(r => r.lv === lv && r.gr === "common" && !r.rev); if (a.length) out.push(`  ${lv}레벨 일반 평균 가격 ${f1(a.reduce((s, r) => s + r.p, 0) / a.length)} → ${f1(a.reduce((s, r) => s + r.p2, 0) / a.length)} (${a.length}장)`); }
for (const gr of ["common", "uncommon", "rare", "upgrade", "epic", "unique"]) { const a = res.filter(r => r.gr === gr); if (a.length) out.push(`  ${gr.padEnd(8)} 새 기준보다 평균 ${f1(a.reduce((s, r) => s + r.p2 - T(r.lv, r.up2), 0) / a.length)}점 (${a.length}장)`); }
const big = res.filter(r => r.a2 > 10 || r.h2 > 10).length;
out.push(`적힌 공 · 체가 10을 넘는 유닛 ${big}장 (공 최대 ${Math.max(...res.map(r => r.a2))} · 체 최대 ${Math.max(...res.map(r => r.h2))})`);
const dup = res.length - new Set(res.map(r => key(r, r.up2, r.a2, r.h2))).size;
out.push(`겹치는 카드 ${dup}장`);
const rep = arg("--report");
const table = res.map(r => ({ id: r.id, n: r.n, g: r.g, gr: r.gr, lv: r.lv, old: [r.up, r.a, r.d, r.h], new: [r.up2, r.a2, r.d, r.h2], p: +r.p.toFixed(2), p2: +r.p2.toFixed(2), target: +r.target.toFixed(2) }));
if (rep) fs.writeFileSync(rep, JSON.stringify({ summary: out, cards: table }, null, 1));
console.log(out.join("\n"));

/* 쓰기 */
if (WRITE) {
  const byId = {}; for (const r of res) byId[r.id] = r;
  fs.mkdirSync(TO, { recursive: true });
  // data.js: SIM_UNITS 줄을 다시 씀 (바뀐 카드에 v329 = 바꾸기 전 [유지비, 공, 방, 체])
  let d = fs.readFileSync(src("data.js"), "utf8");
  const m = d.match(/^const SIM_UNITS=(\[.*\]);$/m);
  const arr = JSON.parse(m[1]);
  for (const u of arr) { const r = byId[u.id]; if (!r) continue;
    if (r.up2 !== u.up || r.a2 !== u.a || r.h2 !== u.h) { u.v329 = [u.up, u.a, u.d, u.h]; u.up = r.up2; u.a = r.a2; u.h = r.h2; } }
  d = d.replace(m[0], "const SIM_UNITS=" + JSON.stringify(arr) + ";");
  if (!/v3\.30: 밸런스 v4/.test(d)) d = d.replace("       v3.12.7: 유지비 상한", "       v3.30: 밸런스 v4 — 레벨 직선 4 + 2 × 레벨 · 유지비 1 이상은 1 · 카드마다 자리와 공/체 몫을 살려 다시 맞춤. v329 = 바꾸기 전 [유지비, 공, 방, 체]. tools/balance4/rebuild.js, docs/BALANCE_v4_draft.md\n       v3.12.7: 유지비 상한");
  fs.writeFileSync(path.join(TO, "data.js"), d);
  // 손으로 쓴 파일: { id: "X" … up: N, a: N, d: N, h: N
  for (const f of ["pincards.js", "highcards.js", "uniques.js", "upgrades.js"]) {
    let s = fs.readFileSync(src(f), "utf8");
    s = s.replace(/(\{ id: "([^"]+)"[^\n]*?\bup: )(\d+)(, a: )(-?\d+)(, d: -?\d+, h: )(-?\d+)/g, (all, p1, id, up, p2, a, p3, h) => {
      const r = byId[id]; if (!r) return all; return p1 + r.up2 + p2 + r.a2 + p3 + r.h2; });
    fs.writeFileSync(path.join(TO, f), s);
  }
  console.log("썼다: " + TO);
}

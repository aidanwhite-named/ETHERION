// 카드 대전 시뮬레이터 결과 정리: out/result_*.json 을 모두 합쳐 표(cards.csv)·요약(summary.json)·보고서(report.md)를 만든다.
//   node tools/cardsim/report.js [--out DIR]
const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const OUT = path.resolve(arg('out', path.join(__dirname, 'out')));
const { load } = require(path.join(ROOT, 'tools/balance/harness'));
const ctx = load(path.join(ROOT, 'js'));
const CARDS = ctx.ev('CARDS'), GROUPS = ctx.ev('GROUP_IDS'), GINFO = ctx.ev('GROUPS'), STARTER = ctx.ev('STARTER_DECKS');

/* ---------- 합치기 ---------- */
const res = {}, meta = {}; let GAMES = null, BASE = null;
for (const f of fs.readdirSync(OUT).filter(f => /^result_.*\.json$/.test(f))) {
  const j = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  GAMES = j.games; BASE = j.base; Object.assign(meta, j.meta);
  for (const k in j.res) { if (!res[k]) res[k] = j.res[k]; }
}
const kind = c => c.type === 'unit' ? '유닛' : c.type === 'item' ? '아이템' : '마법';
const itemTarget = it => 1.28 + (it.lv - 2) - (it.cls.includes('공용') ? 0.2 : it.cls.length >= 2 ? 0.15 : 0);
function iso(c) { // 단독 시뮬레이터가 매긴 값 (0 = 딱 레벨만큼)
  if (c.type === 'unit') return { v: (c.w || 50) - 50, txt: `1:1 승률 ${(c.w || 50).toFixed(1)}%` };
  if (c.type === 'item') { const t = itemTarget(c.item); return { v: (c.item.ev9 - t) * 10, txt: `종합 상승 ${c.item.ev9} (목표 ${t.toFixed(2)})` }; }
  if (c.comeback) return { v: null, txt: `역전 마법 (보통 판 ${c.e})` };
  return { v: (c.e - c.lv) * 10, txt: `환산 레벨 ${c.e} (Lv ${c.lv})` };
}
const pct = x => (x * 100);

/* ---------- 카드 값 풀기 ----------
   바꾼 덱의 승률 변화 = (넣은 카드 값 × 장수) − (뺀 카드 값 × 장수) + 잡음. 센 카드를 빼고 넣으면 넣은 카드가 약해 보이므로
   모든 실험을 한꺼번에 놓고 카드 1장의 값을 푼다. 레벨이 가까운 카드끼리만 바꿨기 때문에 이 식만으로는 값이 하나로 정해지지
   않는 묶음이 생겨서, "카드 값은 대개 0 근처(보통 카드)"라는 약한 가정(정규 사전분포, 폭 τ)을 함께 둔다 (능형 회귀).
   τ는 결과가 가장 그럴듯해지는 값을 고른다(주변 우도). 값 0 = 그 단체·종류의 보통 카드. 값 = 보통 카드 대신 넣을 때의 승률 변화 */
const ids = Object.keys(meta).filter(id => res[id] && CARDS[id] && res['BASE:' + CARDS[id].group]);
const IX = Object.fromEntries(ids.map((id, i) => [id, i])); const N = ids.length;
const EQ = ids.map(id => { const g = CARDS[id].group, r = res[id], b = res['BASE:' + g], d = meta[id].deck, s0 = STARTER[g];
  const pv = r.w / r.n, pb = b.w / b.n, s2 = pv * (1 - pv) / r.n + pb * (1 - pb) / b.n;
  const coef = []; for (const k of new Set([...Object.keys(d), ...Object.keys(s0)])) { const x = (d[k] || 0) - (s0[k] || 0); if (x && IX[k] != null) coef.push([IX[k], x]); }
  return { coef, y: pv - pb, s2 }; });
function cholSolve(M, n) { // M: n×n 대칭 양의 정부호 → {L, logdet}
  const L = Array.from({ length: n }, () => new Float64Array(n)); let ld = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) { let s = M[i][j]; const Li = L[i], Lj = L[j]; for (let k = 0; k < j; k++) s -= Li[k] * Lj[k];
    if (i === j) { L[i][i] = Math.sqrt(s); ld += 2 * Math.log(L[i][i]); } else L[i][j] = s / L[j][j]; }
  return { L, ld }; }
function cholInvVec(L, n, v) { const z = new Float64Array(n); for (let i = 0; i < n; i++) { let s = v[i]; for (let k = 0; k < i; k++) s -= L[i][k] * z[k]; z[i] = s / L[i][i]; }
  const x = new Float64Array(n); for (let i = n - 1; i >= 0; i--) { let s = z[i]; for (let k = i + 1; k < n; k++) s -= L[k][i] * x[k]; x[i] = s / L[i][i]; } return x; }
// 주변 우도: y ~ N(0, τ²·A·Aᵀ + 잡음) — 실험 사이의 겹침 AAᵀ
const AAt = Array.from({ length: N }, () => new Float64Array(N));
{ const dense = EQ.map(e => { const m = new Map(); for (const [k, x] of e.coef) m.set(k, x); return m; });
  for (let i = 0; i < N; i++) for (let j = 0; j <= i; j++) { let s = 0; for (const [k, x] of dense[i]) { const y = dense[j].get(k); if (y) s += x * y; } AAt[i][j] = AAt[j][i] = s; } }
let best = null;
for (const tau of [0.004, 0.006, 0.008, 0.01, 0.012, 0.015, 0.02, 0.025, 0.03]) {
  const K = AAt.map((row, i) => { const r = Float64Array.from(row, v => v * tau * tau); r[i] += EQ[i].s2; return r; });
  const { L, ld } = cholSolve(K, N); const y = Float64Array.from(EQ, e => e.y); const a = cholInvVec(L, N, y);
  const ll = -0.5 * (y.reduce((s, v, i) => s + v * a[i], 0) + ld);
  if (!best || ll > best.ll) best = { tau, ll }; }
const TAU = best.tau;
// 사후 평균과 오차: (AᵀΣ⁻¹A + I/τ²) v = AᵀΣ⁻¹y
const HM = Array.from({ length: N }, (_, i) => { const r = new Float64Array(N); r[i] = 1 / (TAU * TAU); return r; }), g = new Float64Array(N);
for (const e of EQ) { const w = 1 / e.s2; for (const [i, x] of e.coef) { g[i] += w * x * e.y; for (const [j, z] of e.coef) HM[i][j] += w * x * z; } }
const { L: HL } = cholSolve(HM, N); const vhat = cholInvVec(HL, N, g);
const VAL = {}; for (const id of ids) { const i = IX[id]; const e = new Float64Array(N); e[i] = 1; const col = cholInvVec(HL, N, e); VAL[id] = { v: vhat[i], se: Math.sqrt(col[i]) }; }
const compOf = {};

const rows = [];
for (const id in meta) {
  const r = res[id]; const c = CARDS[id]; if (!r || !c) continue;
  const b = res['BASE:' + c.group]; if (!b) continue;
  const m = meta[id].m, pv = r.w / r.n, pb = b.w / b.n;
  const se = Math.sqrt(pv * (1 - pv) / r.n + pb * (1 - pb) / b.n);
  const k = 2 / Math.abs(m), sgn = m > 0 ? 1 : -1;
  const raw2 = sgn * (pv - pb) * k, rawSe2 = se * k; // 바꿔 넣은 그대로의 결과 (뺀 카드 값이 섞임)
  const d2 = VAL[id].v * 2, se2 = VAL[id].se * 2;  // 풀어낸 값: 평균 카드 2장 대신 이 카드 2장
  // 사용 통계: 2장 더 넣은 덱에서 잰 것. 이미 최대 장수라 빼서 잰 카드는 기본 덱 대전에서 잰 것
  const st = m > 0 ? r.st[id] : b.st[id]; const nG = m > 0 ? r.n : b.n;
  const u = st ? { drawn: st.d / nG, play: st.d ? st.p / st.d : 0, crys: st.d ? st.c / st.d : 0, burn: st.d ? st.b / st.d : 0,
    act: st.p && c.type !== 'unit' && c.type !== 'item' ? st.a / st.p : null, turn: st.pn ? st.t / st.pn : null, winPlayed: st.pn ? st.pw / st.pn : null, winHeld: st.hn ? st.hw / st.hn : null, pn: st.pn } :
    { drawn: 0, play: 0, crys: 0, burn: 0, act: null, turn: null, winPlayed: null, winHeld: null, pn: 0 };
  const I = iso(c);
  const flags = [];
  if (d2 / se2 >= 2) flags.push('강함');
  if (d2 / se2 <= -2) flags.push('약함');
  if (u.drawn > 0.3 && u.play < 0.25) flags.push('잘 안 냄');
  if (u.drawn > 0.3 && u.crys > 0.6) flags.push('결정화 감');
  if (c.type !== 'unit' && c.type !== 'item' && u.act != null && u.act < 0.6 && u.pn >= 20) flags.push('발동 적음');
  rows.push({ id, name: c.name, group: c.group, gname: GINFO[c.group].name, kind: kind(c), lv: c.lv, up: c.up || 0, inDeck: STARTER[c.group][id] || 0, m,
    winVar: pv, winBase: pb, d2, se2, z: d2 / se2, raw2, rawSe2, comp: compOf[id], iso: I.v, isoTxt: I.txt, ...u, flags, n: r.n,
    byOpp: Object.fromEntries(Object.entries(r.byOpp).map(([h, o]) => [h, o.w / o.n])) });
}
rows.sort((a, b) => b.d2 - a.d2);

/* ---------- 상관: 단독 시뮬레이터 값 vs 대전 승률 변화 ---------- */
function pearson(xs, ys) { const n = xs.length; if (n < 3) return null; const mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; } return sxy / Math.sqrt(sxx * syy); }
const corr = {};
for (const t of ['유닛', '마법', '아이템']) { const R = rows.filter(r => r.kind === t && r.iso != null); corr[t] = { n: R.length, r: pearson(R.map(r => r.iso), R.map(r => r.d2)) }; }
// 측정 잡음만으로 생기는 흩어짐과 실제 흩어짐 비교 (카드 간 차이가 잡음보다 큰가)
const sd = a => { const m = a.reduce((x, y) => x + y, 0) / a.length; return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / a.length); };
const spread = { observed: sd(rows.map(r => r.raw2)), noise: Math.sqrt(rows.reduce((s, r) => s + r.rawSe2 ** 2, 0) / rows.length) }; // 바꿔 넣은 그대로의 결과 기준
spread.real = Math.sqrt(Math.max(0, spread.observed ** 2 - spread.noise ** 2));
// 레벨별 평균 (높은 레벨이 덱에서 손해인지)
const byLv = {}; for (const r of rows) { const k = r.kind + ' ' + r.lv; (byLv[k] = byLv[k] || []).push(r.d2); }
const byKindLv = Object.fromEntries(Object.entries(byLv).map(([k, a]) => [k, { n: a.length, mean: a.reduce((x, y) => x + y, 0) / a.length }]));
const usage = {}; for (const t of ['유닛', '마법', '아이템']) { const R = rows.filter(r => r.kind === t && r.drawn > 0.3); usage[t] = { play: R.reduce((s, r) => s + r.play, 0) / R.length, crys: R.reduce((s, r) => s + r.crys, 0) / R.length }; }

/* ---------- 쓰기 ---------- */
const f1 = x => x == null ? '' : (Math.round(x * 10) / 10).toFixed(1);
const head = ['ID', '이름', '단체', '종류', 'Lv', '유지비', '기본덱 장수', '바꾼 장수', '대전 값 2장(%p)', '오차(±%p)', 'z', '바꿔 넣은 그대로(%p)', '단독 시뮬 값', '단독 시뮬', '판당 뽑음', '낸 비율(%)', '결정화(%)', '발동(%)', '첫 사용 턴', '냈을 때 승률(%)', '쥐고만 있을 때 승률(%)', '표시'];
const csv = [head.join(',')].concat(rows.map(r => [r.id, r.name, r.gname, r.kind, r.lv, r.up, r.inDeck, r.m, f1(pct(r.d2)), f1(pct(r.se2)), r.z.toFixed(2), f1(pct(r.raw2)), r.iso == null ? '' : r.iso.toFixed(1), '"' + r.isoTxt + '"',
  r.drawn.toFixed(2), f1(pct(r.play)), f1(pct(r.crys)), r.act == null ? '' : f1(pct(r.act)), f1(r.turn), r.winPlayed == null ? '' : f1(pct(r.winPlayed)), r.winHeld == null ? '' : f1(pct(r.winHeld)), r.flags.join(' ')].join(',')));
fs.writeFileSync(path.join(OUT, 'cards.csv'), '﻿' + csv.join('\r\n'));
const summary = { tau: TAU, games: GAMES, base: BASE, cards: rows.length, totalGames: Object.values(res).reduce((s, r) => s + r.n, 0),
  baseWin: Object.fromEntries(GROUPS.filter(g => res['BASE:' + g]).map(g => [g, res['BASE:' + g].w / res['BASE:' + g].n])), corr, spread, byKindLv, usage, rows };
fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary));

const line = r => `| ${r.id} | ${r.name} | ${r.gname} | ${r.kind} | ${r.lv} | ${pct(r.d2) >= 0 ? '+' : ''}${f1(pct(r.d2))} ±${f1(pct(r.se2))} | ${r.isoTxt} | ${f1(pct(r.play))}% · 결정화 ${f1(pct(r.crys))}% | ${r.flags.join(' ')} |`;
const H = '| ID | 이름 | 단체 | 종류 | Lv | 대전 값 (2장) | 단독 시뮬레이터 | 낸 비율 | 표시 |\n|---|---|---|---|---|---|---|---|---|';
let md = `# 카드 대전 시뮬레이션 결과\n\n카드 ${rows.length}장 · 카드마다 ${GAMES * 8}판(상대 8단체 × ${GAMES}) · 기준 덱 단체마다 ${BASE * 8}판 · 총 ${summary.totalGames}판\n\n`;
md += `대전 값 = 그 단체 기본 덱의 같은 종류 평균 카드 2장 대신 이 카드 2장을 넣을 때의 승률 변화(%p). 실험마다 이 카드 2장을 넣고 레벨이 가까운 같은 종류 카드를 뺀 덱으로 대전한 뒤, 뺀 카드의 값이 섞이지 않게 모든 실험을 한꺼번에 풀었다. 오차는 1표준오차.\n\n`;
md += `(풀이에 쓴 사전분포 폭 τ = 1장당 ${(TAU * 100).toFixed(1)}%p, 주변 우도로 고름)\n\n`;
md += `## 단독 시뮬레이터 값과의 관계\n\n| 종류 | 카드 수 | 상관계수 |\n|---|---|---|\n` + Object.entries(corr).map(([t, x]) => `| ${t} | ${x.n} | ${x.r == null ? '-' : x.r.toFixed(2)} |`).join('\n') + '\n\n';
md += `바꿔 넣은 그대로의 승률 변화 흩어짐 ${f1(pct(spread.observed))}%p 중 측정 잡음 ${f1(pct(spread.noise))}%p, 실제 차이 약 ${f1(pct(spread.real))}%p.\n\n`;
md += `## 가장 센 카드 20\n\n${H}\n` + rows.slice(0, 20).map(line).join('\n') + '\n\n';
md += `## 가장 약한 카드 20\n\n${H}\n` + rows.slice(-20).reverse().map(line).join('\n') + '\n\n';
const flagged = rows.filter(r => r.flags.length);
md += `## 표시가 붙은 카드 ${flagged.length}장\n\n${H}\n` + flagged.map(line).join('\n') + '\n';
fs.writeFileSync(path.join(OUT, 'report.md'), md);
console.log(`카드 ${rows.length}장 정리 → ${OUT}`);
console.log('상관', JSON.stringify(corr), '흩어짐', JSON.stringify(spread));

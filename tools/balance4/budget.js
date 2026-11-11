/* ETHERION 밸런스 v4 기준 (초안) — docs/BALANCE_v4_draft.md 의 표를 다시 계산한다.
   node tools/balance4/budget.js        지금 카드 측정 + 새 기준 표
   가격표는 v1.3 그대로: 1.2 × 기대 공 + 방어값(기대 방) + 기대 체 (코인은 값 × 0.5) */
const vm = require('vm'), C = require('./load.js'), ev = s => vm.runInContext(s, C);
const P = lv => 4 + 2 * lv;                                            // 일반 · 유지비 0 기준 가격 (선형)
const V = u => { let s = 0; for (let k = 1; k <= u; k++) s += 1.25 + 0.25 * k; return s; };   // 유지비 값 1.5 · 1.75 · 2.0 · 2.25 …
const MUL = { common: 1, uncommon: 1.08, rare: 1.16, upgrade: 1.20, unique: 1.20, epic: 1.24 };  // 등급 배율 (레벨 몫에만)
const RHO = { B1: .66, B2: .45, B3: .55, G1: .64, G2: .36, G3: .45, A1: .70, A2: .40, A3: .62 };  // 방어 뺀 예산 가운데 공격 몫
const DT = { B2: [1,1,2,2,2,3,3,3], A2: [1,1,1,2,2,2,3,3], G3: [0,0,0,1,1,1,1,1], B3: [0,0,0,0,1,1,1,1] };   // 레벨별 방어 계단
const dv = d => d <= 0 ? d : d <= 1 ? 1.3 * d : 1.3 + 1.5 * (d - 1);
const ex = (c, k) => c[k] + (c.co || []).filter(x => x[0] === k).reduce((s, [, n, v]) => s + 0.5 * n * v, 0);
const price = c => 1.2 * ex(c, 'a') + dv(ex(c, 'd')) + ex(c, 'h');
const split = (g, lv, B) => { const d = (DT[g] || [])[lv - 1] || 0, r = B - dv(d); return { a: RHO[g] * r / 1.2, d, h: (1 - RHO[g]) * r }; };
const f = x => x.toFixed(1), F = Object.keys(RHO);
function ols(X, y) { const n = X[0].length, A = Array.from({ length: n }, () => Array(n).fill(0)), b = Array(n).fill(0);
  X.forEach((x, i) => { for (let p = 0; p < n; p++) { b[p] += x[p] * y[i]; for (let q = 0; q < n; q++) A[p][q] += x[p] * x[q]; } });
  for (let i = 0; i < n; i++) { for (let k = 0; k < n; k++) if (k !== i) { const m = A[k][i] / A[i][i]; for (let j = 0; j < n; j++) A[k][j] -= m * A[i][j]; b[k] -= m * b[i]; } }
  return b.map((v, i) => v / A[i][i]); }
const U = ev('CARD_LIST.filter(c=>c.type==="unit")').map(c => ({ g: c.group, lv: c.lv, up: c.up, ea: ex(c,'a'), ed: ex(c,'d'), eh: ex(c,'h'), p: price(c), gr: ev(`gradeOf(${JSON.stringify(c.id)})`), rev: c.rev }));
const base = U.filter(r => (r.gr === 'common' || r.gr === 'uncommon') && !r.rev);
console.log('== 지금: 깃발별 레벨당 증가 (일반+고급, 역행 제외, 유지비 보정 회귀)');
for (const g of F) { const a = base.filter(r => r.g === g), X = a.map(r => [1, r.lv, r.up]); const k = ['ea','ed','eh','p'].map(s => ols(X, a.map(r => r[s])));
  console.log(g, '공 +' + k[0][1].toFixed(2), '방 +' + k[1][1].toFixed(2), '체 +' + k[2][1].toFixed(2), '| 가격/레벨 ' + k[3][1].toFixed(2), '| 가격/유지비 ' + k[3][2].toFixed(2)); }
const lg = ols(base.map(r => [1, r.lv, r.up]), base.map(r => Math.log(r.p)));
console.log('전체 곡선: 레벨당 x' + Math.exp(lg[1]).toFixed(3) + ', 유지비당 x' + Math.exp(lg[2]).toFixed(3));
console.log('\n== 새 기준: 깃발별 일반 · 유지비 0 기대 공/방/체');
for (const g of F) { let s = g + ' '; for (let lv = 1; lv <= 7; lv++) { const x = split(g, lv, P(lv)); s += `L${lv} ${f(x.a)}/${x.d}/${f(x.h)}  `; } console.log(s); }
console.log('\n== 지금 일반 평균 → 새 기준 (레벨 × 유지비)');
const com = U.filter(r => r.gr === 'common' && !r.rev);
for (let lv = 1; lv <= 8; lv++) { let s = 'L' + lv + ' '; for (let u = 0; u < lv && u <= 4; u++) { const a = com.filter(r => r.lv === lv && r.up === u); if (!a.length) continue; s += `u${u} ${f(a.reduce((x, r) => x + r.p, 0) / a.length)}→${f(P(lv) + V(u))}(${a.length})  `; } console.log(s); }
console.log('\n== 등급 예산 (유지비 0) L3 / L5 / L7 — v3.29 스페셜만 8레벨');
for (const k in MUL) console.log(k.padEnd(9), [3, 5, 7].map(lv => f(P(lv) * MUL[k])).join(' / '));
console.log('\n== 강화 카드 예산 (유지비 = 레벨 − 1, v3.29 5레벨까지)');
for (const l of [3, 4, 5]) console.log(`L${l}/${l - 1}: ${f(P(l) * 1.2 + V(l - 1))}`, F.map(g => { const x = split(g, l, P(l) * 1.2 + V(l - 1)); return `${g} ${f(x.a)}/${x.d}/${f(x.h)}`; }).join('  '));

// sim.js 결과(out/state.json)를 표로. node tools/specials/report.js → out/report.md, out/summary.json
const fs = require('fs'), path = require('path');
const st = JSON.parse(fs.readFileSync(path.join(__dirname, 'out/state.json'), 'utf8'));
const G = ['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const NAME = { B1: '잿불 고블린', B2: '무쇠수염 드워프', B3: '번개 노움', G1: '바위주먹 오크', G2: '이끼 트롤', G3: '푸른비늘 인어', A1: '심연 마족', A2: '성광 천족', A3: '폭풍 하이엘프' };
const M = { R1: {}, R2: {}, R3: {} }, turns = { R1: [0, 0], R2: [0, 0], R3: [0, 0] }, used = {};
const add = (R, me, op, w, n) => { const k = me + '>' + op; M[R][k] = M[R][k] || [0, 0]; M[R][k][0] += w; M[R][k][1] += n; };
for (const { job, w, turns: t, used: u } of st.done) {
  const [R, da, ga, db, gb, , n] = job; turns[R][0] += t; turns[R][1] += n;
  // 기록은 "덱 종류:단체" 기준으로 쌓는다
  add(R, da + ':' + ga, db + ':' + gb, w, n); add(R, db + ':' + gb, da + ':' + ga, n - w, n);
  for (const [k, [p, win]] of Object.entries(u)) { const [side, id] = k.split(':'); const deck = side === 'A' ? da : db, g = side === 'A' ? ga : gb;
    const key = id; used[key] = used[key] || { played: 0, won: 0, games: 0 }; used[key].played += p; used[key].won += win; }
  for (const [deck, g] of [[da, ga], [db, gb]]) if (deck === 'SPEC') { /* 스페셜 덱이 낀 판 수 */ for (const id of Object.keys(st.decks.SPEC[g])) if (/^S[PR]-/.test(id)) { used[id] = used[id] || { played: 0, won: 0, games: 0 }; used[id].games += n; } }
}
const rate = (R, me, ops) => { let w = 0, n = 0; for (const op of ops) { const x = M[R][me + '>' + op]; if (x) { w += x[0]; n += x[1]; } } return n ? [w / n, n] : [NaN, 0]; };
const pct = x => (x * 100).toFixed(1);
const se = (p, n) => Math.sqrt(p * (1 - p) / n) * 100;
const rows = [], S = { swaps: st.swaps, factions: {} };
for (const g of G) {
  const others = G.filter(x => x !== g);
  const [r1, n1] = rate('R1', 'BASE:' + g, others.map(x => 'BASE:' + x));
  const [r2, n2] = rate('R2', 'SPEC:' + g, others.map(x => 'BASE:' + x));
  const [mir, nm] = rate('R2', 'SPEC:' + g, ['BASE:' + g]);
  const [r3, n3] = rate('R3', 'SPEC:' + g, others.map(x => 'SPEC:' + x));
  // R2에서 상대가 스페셜일 때 이 단체(기본 덱)가 당한 몫
  const [r2d, n2d] = rate('R2', 'BASE:' + g, others.map(x => 'SPEC:' + x));
  S.factions[g] = { base: r1, spec: r2, mirror: mir, allSpec: r3, vsSpec: r2d, n: { base: n1, spec: n2, mirror: nm, allSpec: n3 } };
  rows.push(`| ${NAME[g]} | ${pct(r1)} | ${pct(r2)} | **${(r2 - r1 >= 0 ? '+' : '') + pct(r2 - r1)}** | ${pct(mir)} | ${pct(r3)} | ${(r3 - r1 >= 0 ? '+' : '') + pct(r3 - r1)} |`);
}
const L = [];
L.push(`판 수: 단체 짝마다(선후공 각각) ${st.N}판. 기본 대 기본 · 스페셜 대 스페셜은 단체마다 ${2 * 8 * st.N}판, 스페셜 대 기본은 단체마다 ${2 * 8 * st.N}판 + 거울전 ${st.N}판. 같은 단체 짝 · 같은 판 번호는 같은 시드.`);
L.push(`승률 하나의 오차(1표준오차) ≈ ±${se(0.5, 2 * 8 * st.N).toFixed(1)}%p, 거울전 ±${se(0.5, st.N).toFixed(1)}%p.\n`);
L.push('| 단체 | ① 기본 덱 승률 | ② 스페셜 덱 대 기본 덱 | ②−① | ③ 거울전(스페셜 대 같은 단체 기본) | ④ 모두 스페셜 | ④−① |');
L.push('|---|---|---|---|---|---|---|');
L.push(...rows);
L.push(`\n평균 턴: 기본 대 기본 ${(turns.R1[0] / turns.R1[1]).toFixed(1)} · 스페셜 대 기본 ${(turns.R2[0] / turns.R2[1]).toFixed(1)} · 모두 스페셜 ${(turns.R3[0] / turns.R3[1]).toFixed(1)}`);
const r1s = G.map(g => S.factions[g].base), r3s = G.map(g => S.factions[g].allSpec);
L.push(`승률 폭: 기본 대 기본 ${pct(Math.min(...r1s))}~${pct(Math.max(...r1s))} · 모두 스페셜 ${pct(Math.min(...r3s))}~${pct(Math.max(...r3s))}\n`);
L.push('### 스페셜 카드를 실제로 낸 판');
L.push('| 카드 | 단체 | 뺀 카드 | 스페셜 덱 판 수 | 낸 판 | 낸 비율 | 냈을 때 승률 |');
L.push('|---|---|---|---|---|---|---|');
for (const g of G) for (const s of st.swaps[g]) { const u = used[s.in] || { played: 0, won: 0, games: 0 };
  L.push(`| ${s.inName} | ${NAME[g]} | ${s.outName} (Lv${s.outLv}) | ${u.games} | ${u.played} | ${pct(u.played / u.games)}% | ${pct(u.won / u.played)}% |`); S.factions[g]['used_' + s.in] = u; }
L.push('\n### 단체 짝 표 — ④ 모두 스페셜 (행이 이긴 비율 %)');
L.push('| | ' + G.join(' | ') + ' |'); L.push('|' + '---|'.repeat(G.length + 1));
for (const a of G) L.push(`| ${a} | ` + G.map(b => a === b ? '-' : Math.round(rate('R3', 'SPEC:' + a, ['SPEC:' + b])[0] * 100)).join(' | ') + ' |');
L.push('\n### 단체 짝 표 — ① 기본 대 기본');
L.push('| | ' + G.join(' | ') + ' |'); L.push('|' + '---|'.repeat(G.length + 1));
for (const a of G) L.push(`| ${a} | ` + G.map(b => a === b ? '-' : Math.round(rate('R1', 'BASE:' + a, ['BASE:' + b])[0] * 100)).join(' | ') + ' |');
fs.writeFileSync(path.join(__dirname, 'out/report.md'), L.join('\n') + '\n');
fs.writeFileSync(path.join(__dirname, 'out/summary.json'), JSON.stringify(S, null, 1));
console.log(L.join('\n'));

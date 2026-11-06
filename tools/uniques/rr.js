// v3.2 유니크 · 스페셜 기본 덱 라운드 로빈.  node tools/uniques/rr.js [판수=200] [새 덱 파일=out/build.json]
//   R1 옛 기본 대 옛 기본 (v3.1 js/decks.js 그대로 — 새 덱 파일의 base)
//   R3 새 기본 대 새 기본 (유니크 1 + 스페셜 1이 든 덱)
// 같은 단체 짝 · 같은 판 번호는 같은 시드(tools/specials/sim.js와 같은 hash). 유니크 · 스페셜을 낸 판도 센다.
// 결과는 out/rr.json, 표는 out/rr.md
const { fork } = require('child_process'); const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '../..'), JS = path.join(ROOT, 'js'), OUT = path.join(__dirname, 'out');
const G = ['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const hash = (...xs) => { let h = 2166136261; for (const c of xs.join('|')) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h % 1000000007 + 1; };

if (process.argv[2] === '--worker') {
  const { load } = require('../balance/harness');
  const ctx = load(JS, `
    var PLAYED = { A: new Set(), B: new Set() };
    const __WATCH = SPECIAL_UNITS.concat(SPECIAL_ITEMS, UNIQUE_UNITS);
    const __log = log; log = function (t, c) { const m = /^([AB]): (.*)$/.exec(t);
      if (m) for (const s of __WATCH) if (m[2].includes(s.n + " 소환") || m[2].includes("「" + s.n + "」 장착")) PLAYED[m[1]].add(s.id);
      return __log(t, c); };
    this.resetPlayed = () => { PLAYED = { A: new Set(), B: new Set() }; }; this.getPlayed = () => ({ A: [...PLAYED.A], B: [...PLAYED.B] });`);
  process.on('message', async ({ decks, job }) => {
    if (!job) return process.exit(0);
    const [run, da, ga, db, gb, i0, n] = job; let w = 0, turns = 0; const used = {};
    for (let i = i0; i < i0 + n; i++) {
      ctx.seed(hash(ga, gb, i)); ctx.resetPlayed();
      const g = await ctx.playHeadless({ p0: { name: 'A', group: ga, cards: decks[da][ga], isAI: true }, p1: { name: 'B', group: gb, cards: decks[db][gb], isAI: true } });
      if (g.winner === 0) w++; turns += g.turn;
      const pl = ctx.getPlayed();
      for (const side of ['A', 'B']) for (const id of pl[side]) { const k = side + ':' + id; used[k] = used[k] || [0, 0]; used[k][0]++; if ((g.winner === 0) === (side === 'A')) used[k][1]++; }
    }
    process.send({ job, w, turns, used });
  });
  return;
}

async function main() {
  const N = +process.argv[2] || 200, NEWF = path.resolve(__dirname, process.argv[3] || 'out/build.json');
  const { load } = require('../balance/harness'); const ctx = load(JS);
  const base = ctx.ev('JSON.parse(JSON.stringify(STARTER_DECKS))');
  const nw = JSON.parse(fs.readFileSync(NEWF, 'utf8'));
  const decks = { BASE: nw.base || base, NEW: nw.decks };
  const jobs = []; const runs = (process.argv[4] || 'R1,R3').split(',');
  for (const a of G) for (const b of G) if (a !== b) for (let i = 0; i < N; i += 25) {
    if (runs.includes('R1')) jobs.push(['R1', 'BASE', a, 'BASE', b, i, Math.min(25, N - i)]);
    if (runs.includes('R3')) jobs.push(['R3', 'NEW', a, 'NEW', b, i, Math.min(25, N - i)]);
  }
  const done = []; const W = require('os').cpus().length; const t0 = Date.now();
  await Promise.all(Array.from({ length: W }, () => new Promise(res => {
    const c = fork(__filename, ['--worker']);
    const next = () => { const job = jobs.shift(); if (!job) { c.send({}); return res(); } c.send({ decks, job }); };
    c.on('message', m => { done.push(m); next(); }); next();
  })));
  // 집계
  const C = ctx.ev('CARDS'); const tab = {}, tot = {}, turns = {}, used = {};
  for (const r of runs) { tab[r] = {}; tot[r] = {}; turns[r] = [0, 0]; used[r] = {}; for (const g of G) { tab[r][g] = {}; tot[r][g] = [0, 0]; } }
  for (const m of done) {
    const [run, , ga, , gb, , n] = m.job; const t = tab[run];
    t[ga][gb] = t[ga][gb] || [0, 0]; t[ga][gb][0] += m.w; t[ga][gb][1] += n;
    t[gb][ga] = t[gb][ga] || [0, 0]; t[gb][ga][0] += n - m.w; t[gb][ga][1] += n;
    tot[run][ga][0] += m.w; tot[run][ga][1] += n; tot[run][gb][0] += n - m.w; tot[run][gb][1] += n;
    turns[run][0] += m.turns; turns[run][1] += n;
    for (const [k, [p, w]] of Object.entries(m.used)) { const [side, id] = k.split(':'); const grp = side === 'A' ? ga : gb;
      const u = used[run][id] = used[run][id] || { g: grp, played: 0, won: 0, games: 0 }; u.played += p; u.won += w; }
  }
  for (const r of runs) for (const id in used[r]) used[r][id].games = tot[r][used[r][id].g][1];
  const pct = (a) => (100 * a[0] / a[1]).toFixed(1);
  let md = `# 라운드 로빈 (쌍마다 선후공 각각 ${N}판, ${((Date.now() - t0) / 1000).toFixed(0)}초)\n\n`;
  md += '| 단체 | ' + runs.join(' | ') + (runs.length > 1 ? ' | 차 |' : ' |') + '\n|---|' + runs.map(() => '---|').join('') + (runs.length > 1 ? '---|' : '') + '\n';
  for (const g of G) { const v = runs.map(r => pct(tot[r][g])); md += `| ${g} | ${v.join(' | ')}` + (runs.length > 1 ? ` | ${(v[1] - v[0]).toFixed(1)} |` : ' |') + '\n'; }
  for (const r of runs) { const v = G.map(g => 100 * tot[r][g][0] / tot[r][g][1]); md += `\n${r} 폭 ${Math.min(...v).toFixed(1)}~${Math.max(...v).toFixed(1)} · 표준편차 ${Math.sqrt(v.reduce((s, x) => s + (x - 50) ** 2, 0) / 9).toFixed(2)} · 평균 턴 ${(turns[r][0] / turns[r][1]).toFixed(1)}\n`; }
  for (const r of runs) {
    md += `\n## ${r} 짝 표 (행이 이긴 비율 %)\n| | ${G.join(' | ')} |\n|---|${G.map(() => '---|').join('')}\n`;
    for (const a of G) md += `| ${a} | ` + G.map(b => a === b ? '-' : (100 * tab[r][a][b][0] / tab[r][a][b][1]).toFixed(0)).join(' | ') + ' |\n';
    const ids = Object.keys(used[r]); if (ids.length) { md += `\n### ${r} 낸 판\n| 카드 | 단체 | 낸 비율 | 냈을 때 승률 |\n|---|---|---|---|\n`;
      for (const id of ids.sort()) { const u = used[r][id]; md += `| ${C[id].name} (${id}) | ${u.g} | ${(100 * u.played / u.games).toFixed(1)}% | ${(100 * u.won / u.played).toFixed(1)}% |\n`; } }
  }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'rr.json'), JSON.stringify({ N, tab, tot, turns, used }, null, 1)); fs.writeFileSync(path.join(OUT, 'rr.md'), md);
  console.log(md);
}
main();

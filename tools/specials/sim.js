// 스페셜 카드 대전 시뮬레이션 (v2.9). node tools/specials/sim.js [판수=200] [--time 150]
// 세 가지를 같은 시드로 돌린다(같은 단체 짝 · 같은 판 번호 · 같은 선후공은 같은 시드):
//   R1 기본 대 기본     — 9단체 기본 덱끼리 (js/decks.js 그대로)
//   R2 스페셜 대 기본   — 한 단체만 스페셜 덱, 상대는 기본 덱 (다른 8단체 + 같은 단체 거울전)
//   R3 스페셜 대 스페셜 — 9단체 모두 스페셜 덱
// 스페셜 덱 = 기본 덱에서 같은 종류(유닛/아이템)·레벨이 가장 가까운 카드 중 대전 값(tools/cardsim/out_v15/cards.csv)이 가장 낮은 1장을 빼고 스페셜 1장을 넣는다.
// 시간 제한(--time)이 지나면 out/state.json에 저장하고 멈춘다. 다시 실행하면 이어서 한다. 다 끝나면 report.js로 표를 만든다.
const { fork } = require('child_process'); const fs = require('fs'); const path = require('path');
// --only G1,A1 : 그 단체의 스페셜 대 기본(R2)만 다시 돌린다 (결과 out/state_only.json)
const OI = process.argv.indexOf('--only'), ONLY = OI > 0 ? process.argv[OI + 1].split(',') : null;
const ROOT = path.resolve(__dirname, '../..'), JS = path.join(ROOT, 'js'), OUT = path.join(__dirname, 'out');
const G = ['B1','B2','B3','G1','G2','G3','A1','A2','A3'];
const hash = (...xs) => { let h = 2166136261; for (const c of xs.join('|')) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h % 1000000007 + 1; };

if (process.argv[2] === '--worker') {
  const { load } = require('../balance/harness');
  const ctx = load(JS, `
    var PLAYED = { A: new Set(), B: new Set() };
    const __log = log; log = function (t, c) { const m = /^([AB]): (.*)$/.exec(t);
      if (m) for (const s of SPECIAL_UNITS.concat(SPECIAL_ITEMS)) if (m[2].includes(s.n + " 소환") || m[2].includes("「" + s.n + "」 장착")) PLAYED[m[1]].add(s.id);
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

function specialDecks() {
  const { load } = require('../balance/harness'); const ctx = load(JS);
  const base = ctx.ev('JSON.parse(JSON.stringify(STARTER_DECKS))');
  const cards = ctx.ev('(()=>{const o={};for(const c of CARD_LIST)o[c.id]={lv:c.lv,type:c.type==="unit"?"unit":c.type==="item"?"item":"spell",g:c.group,special:!!c.special,name:c.name};return o})()');
  const val = {}; for (const l of fs.readFileSync(path.join(ROOT, 'tools/cardsim/out_v15/cards.csv'), 'utf8').split('\n').slice(1)) { const t = l.split(','); if (t[0]) val[t[0].replace(/^﻿/, '')] = +t[8]; }
  const spec = {}, swaps = {};
  for (const g of G) {
    const d = Object.assign({}, base[g]); swaps[g] = [];
    for (const [id, c] of Object.entries(cards)) if (c.special && c.g === g) {
      const cand = Object.keys(d).filter(x => d[x] > 0 && cards[x].type === c.type && !cards[x].special)
        .sort((x, y) => Math.abs(cards[x].lv - c.lv) - Math.abs(cards[y].lv - c.lv) || (val[x] ?? 0) - (val[y] ?? 0));
      const out = cand[0]; d[out]--; if (!d[out]) delete d[out]; d[id] = 1;
      swaps[g].push({ in: id, inName: c.name, out, outName: cards[out].name, outLv: cards[out].lv, outVal: val[out] ?? null });
    }
    spec[g] = d;
  }
  return { decks: { BASE: base, SPEC: spec }, swaps };
}
function makeJobs(N, B) {
  const jobs = [];
  for (const a of G) for (const b of G) {
    if (a !== b) { for (let i = 0; i < N; i += B) jobs.push(['R1', 'BASE', a, 'BASE', b, i, Math.min(B, N - i)]); }
    for (let i = 0; i < N; i += B) { jobs.push(['R2', 'SPEC', a, 'BASE', b, i, Math.min(B, N - i)]); if (a !== b) jobs.push(['R2', 'BASE', b, 'SPEC', a, i, Math.min(B, N - i)]); }
    if (a !== b) for (let i = 0; i < N; i += B) jobs.push(['R3', 'SPEC', a, 'SPEC', b, i, Math.min(B, N - i)]);
  }
  // R2 거울전(같은 단체)은 SPEC a 대 BASE a 한 방향으로 선후공은 무작위
  return jobs;
}
async function main() {
  const N = +process.argv[2] || 200, ti = process.argv.indexOf('--time'), limit = ti > 0 ? +process.argv[ti + 1] * 1000 : Infinity;
  fs.mkdirSync(OUT, { recursive: true }); const SF = path.join(OUT, ONLY ? 'state_only.json' : 'state.json');
  let st = fs.existsSync(SF) ? JSON.parse(fs.readFileSync(SF, 'utf8')) : null;
  if (!st || st.N !== N) { const sd = specialDecks(); st = { N, decks: sd.decks, swaps: sd.swaps, todo: makeJobs(N, 25).filter(j => !ONLY || (j[0] === 'R2' && ONLY.includes(j[1] === 'SPEC' ? j[2] : j[4]))), done: [] }; }
  const t0 = Date.now(), W = Math.min(require('os').cpus().length, 16); let saving = false;
  const save = () => fs.writeFileSync(SF, JSON.stringify(st));
  await Promise.all(Array.from({ length: W }, () => new Promise(res => {
    const c = fork(__filename, ['--worker']);
    const next = () => { const job = (Date.now() - t0 < limit) ? st.todo.shift() : null; if (!job) { c.send({}); return res(); } c.send({ decks: st.decks, job }); };
    c.on('message', m => { st.done.push(m); next(); }); next();
  })));
  save();
  console.log(`끝난 묶음 ${st.done.length} · 남은 묶음 ${st.todo.length} · ${((Date.now() - t0) / 1000).toFixed(0)}초`);
}
main();

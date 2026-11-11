// ETHERION 카드 대전 시뮬레이터 (v0.1)
// 모든 카드를 단체 기본 덱에 넣어 컴퓨터끼리 실제 게임(js/ 의 규칙·AI 그대로)으로 대전시키고,
// "기본 덱에 이 카드를 2장 더 넣으면 승률이 몇 %p 바뀌나"와 실제로 뽑고·내고·발동한 횟수를 잰다.
//
//   node tools/cardsim/cardsim.js [옵션]
//     --games N     카드마다 상대 단체 1곳당 판 수 (기본 60 → 카드당 480판)
//     --base N      기본 덱 기준 승률: 상대 1곳당 판 수 (기본 240 → 단체당 1920판)
//     --groups B1,G2  이 단체 카드만
//     --cards ID,ID   이 카드만
//     --part i/n    카드 목록을 n개로 나눠 i번째만 (여러 컴퓨터에 나눠 돌릴 때, 1부터)
//     --out DIR     결과 폴더 (기본 tools/cardsim/out)
//     --workers N   동시에 돌릴 프로세스 수 (기본 CPU 수)
//     --salt X      시드를 바꿔 같은 실험을 다른 판들로 다시 돌릴 때 (검증용)
//     --time S      S초가 지나면 새 카드를 더 시작하지 않고 저장 후 끝낸다 (다시 실행하면 이어서 한다)
//   결과: out/result_<part>.json  →  node tools/cardsim/report.js 로 표와 보고서를 만든다.
const { fork } = require('child_process'); const os = require('os'); const fs = require('fs'); const path = require('path');
const ROOT = path.resolve(__dirname, '../..'); const JS = process.env.ETHERION_JS ? path.resolve(process.env.ETHERION_JS) : path.join(ROOT, 'js');   // v3.30 다른 폴더의 카드로 잴 때 ETHERION_JS

/* 게임 안에 계측 코드를 끼워 넣는다: 뽑기·소환/장착·결정화·소각·마법 발동을 카드별로 센다 */
const HOOK = `
var ST = null;
function _st(pi, id) { const m = ST[pi]; return m[id] || (m[id] = { d: 0, p: 0, c: 0, b: 0, a: 0, t: 0 }); }
const _draw = draw; draw = function (p, n, free) { const h0 = p.hand.length; const k = _draw(p, n, free); if (ST) for (let i = h0; i < p.hand.length; i++) _st(p.idx, p.hand[i].id).d++; return k; };
function _wrapHand(fn, key) { return function (p, uid, slot) { const it = p.hand.find(x => x.uid === uid); const ok = fn(p, uid, slot); if (ok && ST && it) { const s = _st(p.idx, it.id); s[key]++; if (key === 'p' && !s.t) s.t = G.turn; } return ok; }; }
actPlace = _wrapHand(actPlace, 'p'); actEquip = _wrapHand(actEquip, 'p'); actCrystal = _wrapHand(actCrystal, 'c'); actBurnHand = _wrapHand(actBurnHand, 'b');
const _cast = castSpell; castSpell = function (X, caster, it, k) { if (X.rec && ST) _st(caster, C(it).id).a++; return _cast(X, caster, it, k); };
async function playTracked(cfg) { ST = [{}, {}]; const g = await playHeadless(cfg); const r = { winner: g.winner, turn: g.turn, st: ST, life: g.players.map(p => p.life) }; ST = null; return r; }
this.playTracked = playTracked;`;

function hashStr(s) { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }

/* ---------- 작업자 ---------- */
if (process.argv[2] === '--worker') {
  const { load } = require(path.join(ROOT, 'tools/balance/harness'));
  const ctx = load(JS, HOOK); const D = ctx.ev('STARTER_DECKS'); const G = ctx.ev('GROUP_IDS');
  process.on('message', async (task) => {
    // task: { key, g, deck, track: [id...] | 'all', games, seedKey }
    const out = { key: task.key, n: 0, w: 0, turns: 0, byOpp: {}, st: {}, playedW: 0, playedN: 0, heldW: 0, heldN: 0 };
    const opps = G.filter(h => h !== task.g); const seed0 = hashStr(task.seedKey);
    for (let oi = 0; oi < opps.length; oi++) { const h = opps[oi]; const bo = out.byOpp[h] = { n: 0, w: 0 };
      for (let s = 0; s < task.games; s++) {
        ctx.seed((seed0 + oi * 100003 + s * 7919) >>> 0);
        const me = s % 2; // 선후공 좌석을 번갈아
        const P = [{ name: 'A', group: task.g, cards: task.deck, isAI: true }, { name: 'B', group: h, cards: D[h], isAI: true }];
        const r = await ctx.playTracked({ p0: P[me], p1: P[1 - me] });
        const win = r.winner === me ? 1 : 0; out.n++; out.w += win; out.turns += r.turn; bo.n++; bo.w += win;
        const mine = r.st[me];
        const ids = task.track === 'all' ? Object.keys(mine) : task.track;
        for (const id of ids) { const s1 = mine[id]; if (!s1) continue; const a = out.st[id] || (out.st[id] = { games: 0, d: 0, p: 0, c: 0, b: 0, a: 0, t: 0, pw: 0, pn: 0, hw: 0, hn: 0 });
          a.games++; a.d += s1.d; a.p += s1.p; a.c += s1.c; a.b += s1.b; a.a += s1.a; if (s1.p) { a.pn++; a.pw += win; a.t += s1.t; } else if (s1.d) { a.hn++; a.hw += win; } }
      }
    }
    process.send(out);
  });
  return;
}

/* ---------- 지휘 ---------- */
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const GAMES = +arg('games', 60), BASE = +arg('base', 240), OUT = path.resolve(arg('out', path.join(__dirname, 'out')));
const WORKERS = +arg('workers', os.cpus().length); const PART = arg('part', '1/1').split('/').map(Number);
const { load } = require(path.join(ROOT, 'tools/balance/harness'));
const ctx = load(JS); const CARDS = ctx.ev('CARDS'), CARD_LIST = ctx.ev('CARD_LIST'), GROUPS = ctx.ev('GROUP_IDS'), STARTER = ctx.ev('STARTER_DECKS'), maxCopies = ctx.ev('maxCopiesOf');
const kind = c => c.type === 'unit' ? 'unit' : c.type === 'item' ? 'item' : 'spell';
const SALT = arg('salt', '');
const onlyG = arg('groups') ? arg('groups').split(',') : null, onlyC = arg('cards') ? arg('cards').split(',') : null;

/* 바꾼 덱: 이 카드를 2장 더 넣고(최대 장수까지), 같은 종류에서 레벨이 가장 가까운 카드를 그만큼 뺀다.
   이미 최대 장수면 반대로 2장(역전 마법은 1장)을 빼고 가까운 카드로 채운다. m = 바꾼 장수(빼면 음수) */
function variant(id) {
  const c = CARDS[id], g = c.group, d = Object.assign({}, STARTER[g]), have = d[id] || 0, L = maxCopies(id);
  const sameKind = x => kind(CARDS[x]) === kind(c) && x !== id && !CARDS[x].comeback;
  const near = (a, b) => Math.abs(CARDS[a].lv - c.lv) - Math.abs(CARDS[b].lv - c.lv);
  let m = Math.min(2, L - have);
  if (m > 0) {
    for (let i = 0; i < m; i++) {
      let cand = Object.keys(d).filter(x => d[x] > 0 && sameKind(x));
      if (!cand.length) cand = Object.keys(d).filter(x => d[x] > 0 && x !== id && !CARDS[x].comeback);
      cand.sort((a, b) => near(a, b) || (d[b] - d[a]) || (a < b ? -1 : 1));
      const r = cand[0]; d[r]--; if (!d[r]) delete d[r];
    }
    d[id] = have + m;
  } else {
    m = -Math.min(2, have);
    for (let i = 0; i < -m; i++) {
      const cand = CARD_LIST.filter(x => x.group === g && sameKind(x.id) && (d[x.id] || 0) < maxCopies(x.id)).map(x => x.id);
      cand.sort((a, b) => near(a, b) || ((d[b] || 0) - (d[a] || 0)) || (a < b ? -1 : 1));
      d[cand[0]] = (d[cand[0]] || 0) + 1;
    }
    d[id] = have + m; if (!d[id]) delete d[id];
  }
  const total = Object.values(d).reduce((a, b) => a + b, 0); if (total !== 40) throw new Error(id + ' deck ' + total);
  return { deck: d, m };
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let ids = CARD_LIST.filter(c => (!onlyG || onlyG.includes(c.group)) && (!onlyC || onlyC.includes(c.id))).map(c => c.id);
  ids = ids.filter((_, i) => i % PART[1] === PART[0] - 1);
  const groups = [...new Set(ids.map(id => CARDS[id].group))];
  const tasks = [];
  for (const g of groups) tasks.push({ key: 'BASE:' + g, g, deck: STARTER[g], track: 'all', games: BASE, seedKey: 'BASE' + g + SALT });
  const meta = {};
  for (const id of ids) { const v = variant(id); meta[id] = { m: v.m, deck: v.deck }; tasks.push({ key: id, g: CARDS[id].group, deck: v.deck, track: [id], games: GAMES, seedKey: id + SALT }); }
  const file = path.join(OUT, `result_${PART[0]}of${PART[1]}.json`);
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  const res = prev && prev.games === GAMES && prev.base === BASE ? prev.res : {};
  const todo = tasks.filter(t => !res[t.key]); tasks.length = 0; tasks.push(...todo);
  const totalGames = tasks.reduce((s, t) => s + t.games * 8, 0); const TIME = +arg('time', 0);
  console.log(`카드 ${ids.length}장 + 기준 덱 ${groups.length}개 · 남은 작업 ${tasks.length}개 · ${totalGames}판 · 작업자 ${WORKERS}`);
  const t0 = Date.now(); let done = 0, doneGames = 0, q = 0;
  const save = () => fs.writeFileSync(file, JSON.stringify({ version: 1, games: GAMES, base: BASE, made: new Date().toISOString(), meta, res }));
  await Promise.all(Array.from({ length: Math.min(WORKERS, tasks.length) }, () => new Promise(resolve => {
    const w = fork(__filename, ['--worker']);
    const next = () => { if (q >= tasks.length || (TIME && (Date.now() - t0) / 1000 > TIME)) { w.kill(); return resolve(); } w.send(tasks[q++]); };
    w.on('message', m => { res[m.key] = m; done++; doneGames += m.n;
      if (done % 10 === 0 || done === tasks.length) { const s = (Date.now() - t0) / 1000; console.log(`${done}/${tasks.length}  ${doneGames}판  ${s.toFixed(0)}s  남은 시간 약 ${((totalGames - doneGames) / (doneGames / s) / 60).toFixed(1)}분`); save(); }
      next(); });
    next();
  })));
  save(); const left = Object.keys(meta).length + groups.length - Object.keys(res).length;
  console.log('저장:', file, ((Date.now() - t0) / 1000).toFixed(0) + 's', left ? `· 남은 작업 ${left}개 (다시 실행하면 이어서)` : '· 완료');
})();

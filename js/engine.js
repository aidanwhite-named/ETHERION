/* ETHERION — 전투 엔진 (화면과 분리된 순수 계산)
   규칙 출처
   - 전투·마법 발동 순서: 마법 카드 시뮬레이터의 resolve/cast (문서 07 마법 v0.3)
       마법도 대기열의 한 자리. 앞에 유닛이 없어지는 순간 발동한다.
       공격 마법: 앞 칸의 공격 유닛이 모두 공격을 마치면 / 방어 마법: 앞 칸의 방어 유닛이 모두 쓰러지면
       끝까지 막히면 유닛 전투가 끝난 뒤 발동. 같은 때면 공격 마법 → 방어 마법, 같은 쪽이면 칸 번호 순
   - 아이템 능력: 아이템 카드 시뮬레이터 (문서 07 아이템 v0.1)
   - 직접 공격: 피해는 모두 생명에서. 맞은 쪽은 다음 턴 에테르 +1 (일시, 한 턴에 한 번)
   - 유닛: 코인은 소환할 때 한 번 던진다. 받은 피해는 턴이 끝나면 회복 (문서 06)
   이 파일은 실제 대전과 컴퓨터의 수 읽기(시뮬레이션)에 같이 쓰인다. */
"use strict";

const C = it => CARDS[it.id];
const itemOf = it => (it && it.item ? CARDS[it.item.id].item : null);
/* v2.9 전투 능력 = 장착 아이템 능력 + 스페셜 유닛의 타고난 능력(gift). 수치는 더하고, 있음/없음은 하나만 있어도 된다.
   [사격]은 snipe, [증폭]은 amp로 모은다. [투척](장착한 턴 한 번)은 아이템에만 있으므로 itemOf로 따로 본다 */
/* v3.18 능력 합치기: 수치는 더하고(마력 공격 전부 = true는 그대로), 있음/없음은 하나만 있어도 */
function mergeAbil(a, b) {
  const o = Object.assign({}, a);
  for (const k in b) { const v = b[k]; if (v === true || o[k] === true) o[k] = true; else if (typeof v === "number") o[k] = (+o[k] || 0) + v; else if (v) o[k] = v; }
  return o;
}
function abilOf(it) {
  const im = itemOf(it) || {}, g0 = (it && C(it).gift) || {};
  // v3.18 마법이 이번 턴 걸어 준 능력(t.gx, 효과 grant)은 타고난 능력과 같은 자리에서 더한다. 턴이 바뀌면 resetTurn이 지운다
  const gx = it && it.t && it.t.gx, g = gx ? mergeAbil(g0, gx) : g0;
  const num = k => (+im[k] || 0) + (+g[k] || 0), any = k => !!(im[k] || g[k]);
  const amp = o => (o.evName && /^증폭/.test(o.evName) ? parseInt(o.evName.replace(/\D/g, "")) || 0 : 0);
  return { shield: any("shield"), ward: num("ward"), thorns: num("thorns"), shred: any("shred"), crit: any("crit"), chain: any("chain"), ranged: any("ranged"),
    magic: (im.magic === true || g.magic === true) ? true : num("magic"),
    snipe: (im.every ? +im.throw || 0 : 0) + (g.every ? +g.throw || 0 : 0), amp: amp(im) + amp(g), u: g0.u || null };   // v3.31 u: 유니크의 강화 특수능력 (js/uniques.js, 아래 "v3.31 강화 특수능력")
}
const isUnit = it => it && C(it).type === "unit";
const isSpell = it => it && !isUnit(it);
const hit = (a, d) => (a > d ? a - d : 0);
/* 난수: 기본은 Math.random. 실제 대전에서는 시드를 준 난수를 써서, 코인 뒤집기 뒤에 같은 전투를 다시 굴려도
   그 지점까지는 똑같이 흘러가게 한다 (ctx.rng). */
const RNG_GAME = () => (typeof GRand === "function" ? GRand() : Math.random());   // v3.40 기본은 판 시드(GRand, 시드가 없으면 Math.random)
let RNG = RNG_GAME;
/* 판 규칙 (원정의 용): defAll 방어 +N, hpAll 체력 +N, coinMul 코인 값 배수. 양쪽 모두에게 */
let CRULES = {};
function setCombatRules(r) { CRULES = r || {}; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const flip = () => RNG() < RULES.coinP;
function resetRng() { RNG = RNG_GAME; }   // v3.40 전투 밖의 코인(보호막 코인 · 계략)도 판 시드로 — 온라인 · 서버 검산이 같은 판을 낸다

/* 코인 굴리기: [스탯, 개수, 값] → [{st, v, heads}] */
function rollCoins(co) {
  const out = [];
  for (const [st, n, v] of co || []) for (let i = 0; i < n; i++) out.push({ st, v, heads: flip() });
  return out;
}

/* v3.20 이 유닛의 표시(고정 L · 버팀 U · 눌림 D): 유닛 카드 + 장착 아이템(겹치면 아이템). cards.js pinModesOf */
function pinModes(it) { const im = itemOf(it); return Object.assign(pinModesOf(C(it)), im ? pinModesOf(im, true) : {}); }
/* 저주(핸드 mod) 한 칸이 표시에 막히는가: 고정은 모두, 버팀은 깎기, 눌림은 올리기 */
const pinBlocks = (m, v) => m === "L" || (m === "U" && v < 0) || (m === "D" && v > 0);
/* 유닛의 이번 턴 기본값 (코인·아이템 반영, 마법 효과 전). clean = 코인을 모두 뒷면으로 본 값 */
function printedStats(it) {
  const c = C(it), im = itemOf(it);
  if (im && im.set) return { a: im.set.a, d: im.set.d, h: im.set.h };
  const s = { a: c.a + (im ? im.a || 0 : 0), d: c.d + (im ? im.d || 0 : 0), h: c.h + (im ? im.h || 0 : 0) };
  if (im && im.to) for (const k in im.to) s[k] = im.to[k];   // v3.20 아이템 절대값: 유닛 값과 상관없이 그 값
  // v1.4: 카드 한 장에 남는 스탯 변화 (핸드에 걸린 저주 등). v3.20 표시에 막히는 몫은 붙지 않는다(예전 "카드에 적힌 고정 스탯은 깎이지 않는다"와 같은 규칙)
  if (it.mod) { const pm = pinModes(it); for (const k in it.mod) if (!pinBlocks(pm[k], it.mod[k])) s[k] += it.mod[k]; }
  return s;
}
function baseStats(it, clean) {
  const im = itemOf(it);
  const s = printedStats(it);
  if (CRULES.defAll) s.d += CRULES.defAll;
  if (CRULES.hpAll) s.h += CRULES.hpAll;
  if (!clean) {
    if (!(im && im.set)) for (const k of it.coins || []) if (k.heads) s[k.st] += k.v;
    if (it.item) for (const k of it.item.coins || []) if (k.heads) s[k.st] += k.v;
  }
  clampPins(s, floorOf(it));
  s.h = Math.max(1, s.h);
  return s;
}
/* v3.20 표시와 기준값: { 스탯: { m: "L"|"U"|"D", v: 기준값 } }. 기준값 = 카드에 적힌 값(아이템 포함).
   이름은 예전 그대로 floorOf · t.floor · applyFloor(예전에는 버팀 하나뿐이라 "바닥"이었다). 마법이 이번 턴 건 표시도 t.floor에 들어간다(tmp) */
function floorOf(it) {
  const pm = pinModes(it), ks = Object.keys(pm);
  if (!ks.length) return {};
  const pr = printedStats(it), out = {};
  for (const k of ks) out[k] = pinBound(pm[k], pr[k]);
  return out;
}
/* 표시 하나 = 아래 경계 lo · 위 경계 hi (고정은 둘이 같다). m은 화면에 보일 표시, v는 기준값 */
function pinBound(m, v) { return { m, v, lo: m === "L" || m === "U" ? v : null, hi: m === "L" || m === "D" ? v : null }; }
function clampPins(s, P) {
  for (const k in P) { const { lo, hi } = P[k]; if (lo != null && s[k] < lo) s[k] = lo; if (hi != null && s[k] > hi) s[k] = hi; }
}
function applyFloor(u) { clampPins(u.t, u.t.floor || {}); }
/* 마법 하나가 끝날 때마다 전장의 모든 유닛에 표시를 다시 지킨다(효과가 직접 스탯을 바꿔도 새지 않게). 체력이 0이 되면 쓰러진다 */
function pinPass(X) {
  for (const p of X.P) for (const u of p.field) if (isUnit(u) && u.t && u.t.alive) {
    applyFloor(u);
    if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
  }
}

/* 턴이 시작될 때: 피해 회복, 마법 효과 해제. (보호막 코인은 v3.61.1부터 전투가 시작될 때 — shieldCoinsAtCombat)
   코인은 여기서 던지지 않는다 — 유닛끼리 맞붙을 때 던진다(clashCoins). 그 전까지는 적힌 값 그대로.
   v3.5.6: 방어하는 쪽 유닛은 한 전투에서 코인이 한 번 정해지면 그 전투가 끝날 때까지 다시 던지지 않는다.
   v3.5.7: 한 번 정해진 코인은 마법(코인 뒷면 · 운명)으로도 바뀌지 않는다 */
function resetTurn(it, atk) {   // atk: 이 유닛 편이 이번 턴 공격하는지(v3.57.4). 보호막 코인을 여기서 던지지 않으므로 쓰지 않는다(부르는 곳은 그대로 넘김)
  const keep = (it.t && it.t.keep) || {};   // v3.31 턴이 지나도 남는 값(충전 · 고철 · 낙인 · 불씨 …)
  if (it.t) it.t.gx = null;   // v3.18 지난 턴 마법이 걸어 준 능력은 남지 않는다
  const b = baseStats(it, true), ab = abilOf(it);
  if (keep.grow) for (const k in keep.grow) b[k] += keep.grow[k];   // v3.31 [전리품]으로 판 동안 자란 스탯
  // v3.61.1 [보호막 코인]은 여기(턴 시작 · 장착)서 던지지 않는다 — 전투가 시작될 때 던진다(shieldCoinsAtCombat). 준비하는 동안은 보호막 없음
  it.t = { a: b.a, d: b.d, h: b.h, rb: b, floor: floorOf(it), dmg: 0, alive: true,
    shield: false, sroll: null, ward: ab.ward, wardUsed: false,
    thorns: ab.thorns, taunt: false, lock: false, rest: false, thrown: false,
    cb: { a: 0, d: 0, h: 0 }, coins: coinDefs(it), noCoin: false, keep };
}
const hpLeft = u => u.t.h - u.t.dmg;
/* v3.61.1 [보호막 코인]: 전투가 시작될 때(양쪽 준비가 끝나고 첫 마법 · 공격보다 먼저) 전장의 보호막 유닛마다 한 번 던진다.
   앞면이면 이번 전투에서 처음 받는 피해 한 번의 절반(올림)을 막는다(t.shield = "half"). 매 턴 전투마다 다시 던진다.
   전투 도중에 불려 나온 유닛은 던지지 않는다. 이미 통째로 막는 [보호막](t.shield === true)이 있으면 그대로 둔다.
   번호 n은 턴 · 유닛으로 정한다 — 코인 다시 던지기로 같은 시드의 전투를 처음부터 다시 굴려도 화면이 같은 던짐을 두 번 보이지 않게 */
function shieldCoinsAtCombat(X) {
  let any = false;
  for (const p of X.P) for (const u of p.field) {
    if (!isUnit(u) || !u.t || !u.t.alive || !abilOf(u).shield) continue;
    const h = flip();
    if (h && !u.t.shield) u.t.shield = "half";
    u.t.sroll = { h, n: "c" + X.turn + ":" + u.uid };
    lg(X, `[보호막 코인] ${p.name}의 ${C(u).name}: ${h ? "앞면 — 이번 전투 처음 받는 피해 절반을 막음" : "뒷면 — 이번 전투는 보호막 없음"}`, h ? "good" : "sys");
    any = true;
  }
  if (any) step(X, {}, 700);   // 화면이 동전을 던질 틈 (js/game.js shieldCoinFx)
}

/* ---------- 코인: 유닛과 유닛이 맞붙을 때 던진다 (방어 쪽은 전투마다 한 번, X.defFix) ----------
   coinDefs: 이 유닛이 가진 코인(카드 코인 + 아이템 코인). heads가 null이면 아직 던지지 않은 것 */
const COIN_MAX = 5;
function coinDefs(it) {
  const c = C(it), im = itemOf(it), out = [];
  // v3.20 고정(L) 스탯의 코인과, 아이템 절대값(to) 스탯의 유닛 코인은 던지지 않는다
  const pm = pinModes(it), to = (im && im.to) || {};
  if (!(im && im.set)) for (const [st, n, v] of c.co || []) if (pm[st] !== "L" && to[st] == null) for (let i = 0; i < n; i++) out.push({ st, v, heads: null, src: "u" });
  if (it.item) for (const [st, n, v] of CARDS[it.item.id].co || []) if (pm[st] !== "L") for (let i = 0; i < n; i++) out.push({ st, v, heads: null, src: "i" });
  // v1.6.1: 공·방·체 코인은 순번이 같으면 동전 하나다 (g). 공·방·체에 코인이 하나씩이면 동전 하나를 던져
  // 앞면이면 셋 모두에 붙는다. 공격에 둘·방어에 하나면 동전 둘: 첫째는 공격·방어, 둘째는 공격에만.
  // 유닛 카드 코인과 장착 아이템 코인도 함께 센다(유닛 공격 코인 1 + 아이템 공격 코인 1 = 공격 코인 2).
  // 동전은 최대 COIN_MAX개. 그보다 많은 순번의 코인은 첫째 동전부터 차례로 얹힌다(값은 그대로 붙음)
  const nth = {};
  for (const k of out) { const i = nth[k.st] = (nth[k.st] || 0) + 1; k.g = (i - 1) % COIN_MAX; }
  return out;
}
/* 새로 던진 코인을 적용: 이전 코인 몫을 빼고 이번 몫을 더한다 (마법 효과·누적 피해는 그대로) */
function applyCoins(u, coins) {
  const old = u.t.cb || { a: 0, d: 0, h: 0 }, nb = { a: 0, d: 0, h: 0 };
  const mul = CRULES.coinMul || 1;
  for (const k of coins) if (k.heads) nb[k.st] += k.v * mul;
  const delta = { a: nb.a - old.a, d: nb.d - old.d, h: nb.h - old.h };
  const b = { a: u.t.a, d: u.t.d, h: u.t.h };
  u.t.a = Math.max(0, u.t.a + delta.a);
  // v3.62.1 [저주 면역]은 방어가 깎이는 것만 막는다 — + 코인 앞면은 붙고, 앞서 붙은 코인 몫을 걷는 것(다시 던져 뒷면)까지만 내려간다
  if (u.t.lock && delta.d < 0) delta.d = Math.max(delta.d, -Math.max(0, old.d));
  u.t.d += delta.d;
  // v1.4: 코인으로 체력이 0 이하가 되면 쓰러진다 (카드가 부서져 소각 더미로)
  u.t.h = u.t.h + delta.h;
  applyFloor(u);
  // v3.20 코인 몫(cb)은 실제로 붙은 값으로 적는다. 공격 0 · 버팀 · 눌림에 막힌 몫까지 적으면, 다시 던질 때 그만큼을 빼거나 더해
  // 스탯이 처음보다 커지거나 작아졌다(예: 공격 1에 −2 코인 앞면 → 0, 다시 던져 뒷면 → 2)
  const got = { a: u.t.a - b.a, d: u.t.d - b.d, h: u.t.h - b.h };
  u.t.cb = { a: old.a + got.a, d: old.d + got.d, h: old.h + got.h }; u.t.coins = coins;
  if (u.t.alive && hpLeft(u) <= 0) { u.t.alive = false; u.t.coinDeath = true; }
  return got;
}
/* 맞붙을 때 코인을 던진다. 동전(g)마다 한 번 던지고, 그 동전에 묶인 공·방·체 코인이 같은 면을 받는다.
   X.over["교전번호:유닛uid:동전번호"]에 값이 있으면 그 동전은 그 값으로 (코인 뒤집기).
   keep = 방어하는 쪽: v3.5.6 이 전투에서 이미 정해진 코인(다시 던진 결과 포함)이 있으면 그대로 쓰고 새로 던지지 않는다.
   v3.5.7: 그 사이 마법(코인 뒷면 · 운명)을 받아도 정해진 코인은 그대로 */
function clashCoins(X, u, keep) {
  const fix = keep && X.defFix ? X.defFix : null;
  if (fix && fix[u.uid]) return fix[u.uid].map(k => Object.assign({}, k, { kept: true }));
  const defs = coinDefs(u), face = {}, sum = {};
  for (const k of defs) sum[k.g] = (sum[k.g] || 0) + k.v;
  const out = defs.map(k => {
    if (face[k.g] == null) {
      let heads = u.t.noCoin ? false : flip();
      const key = X.clashN + ":" + u.uid + ":" + k.g;
      if (X.over && X.over[key] != null && !u.t.noCoin) heads = X.over[key];
      if (u.t.fate && !u.t.noCoin) heads = sum[k.g] > 0;   // [운명]: 합이 + 인 동전은 앞면, − 동전은 뒷면
      if (u.t.jam && !u.t.noCoin) heads = sum[k.g] < 0;    // v3.31 [자기장 교란]: 손해 보는 면 (+ 동전 뒷면, − 동전 앞면)
      face[k.g] = heads;
    }
    // v2.4.4 앞면 확률 p: 보통 RULES.coinP(50%). 코인 뒷면 마법은 −50%라 0%, [운명]은 + 동전 100% · − 동전 0%
    const p = u.t.noCoin ? 0 : u.t.jam ? (sum[k.g] < 0 ? 1 : 0) : u.t.fate ? (sum[k.g] > 0 ? 1 : 0) : RULES.coinP;
    return { st: k.st, v: k.v, src: k.src, g: k.g, heads: face[k.g], p, clean: !!u.t.noCoin, fate: (!!u.t.fate || !!u.t.jam) && !u.t.noCoin, jam: !!u.t.jam && !u.t.noCoin };
  });
  if (fix && out.length) fix[u.uid] = out.map(k => Object.assign({}, k));
  return out;
}

/* 동전 단위로 묶은 코인 [{g, heads, parts:[{st, v}]}] — 화면과 기록이 쓴다 */
function coinGroups(cs) {
  const out = [], at = {};
  for (const k of cs || []) { const g = k.g != null ? k.g : out.length; if (at[g] == null) { at[g] = out.length; out.push({ g, heads: k.heads, p: k.p != null ? k.p : RULES.coinP, parts: [] }); } const ps = out[at[g]].parts, same = ps.find(x => x.st === k.st); if (same) same.v += k.v; else ps.push({ st: k.st, v: k.v }); }
  out.sort((x, y) => x.g - y.g);
  return out;
}
function coinLogText(cs) {
  if (!cs.length) return "없음";
  return coinGroups(cs).map(o => o.heads ? o.parts.map(k => STAT_KO[k.st][0] + sgnNum(k.v)).join("") : "뒷면").join(" ");
}

/* ---------- 컨텍스트: X = { P: 플레이어 2명, ai: 공격자 번호, turn, rec: 기록(애니메이션용) 또는 null } ---------- */
function ctx(P, ai, turn, rec, opts) {
  opts = opts || {};
  RNG = opts.seed != null ? mulberry32(opts.seed) : RNG_GAME;
  return { P, ai, turn, rec, floats: [], logs: [], direct: 0, broke: [false, false], broken: [], clashN: 0, defFix: {}, over: opts.over || null, rules: opts.rules || {}, toks: {}, tokN: 0, deaths: [] };
}
/* 전투로 부서진 카드(유닛 결투·마법 사용·마법으로 파괴) 기록. 소각장으로 보낸 것은 적지 않는다 (economy.js가 돈으로 바꾼다) */
function brokeCard(X, p, id, how) { if (X.rec) X.broken.push({ p: p.idx, id, how }); }
function fl(X, target, text, cls) { if (X.rec) X.floats.push([target, text, cls]); }
function lg(X, text, cls) { if (X.rec) X.logs.push([text, cls || ""]); }
/* v3.9.11 "OO 쓰러짐"은 그 수의 다른 기록(공격 · 사격 · 반격 줄) 뒤에 남긴다. 피해를 먼저 계산하고 원인 줄을 나중에 쓰는 곳이 많아
   예전에는 "쓰러짐"이 원인보다 먼저 찍혔다. step이 기록을 넘길 때 맨 뒤에 붙인다 */
function lgDeath(X, u) { if (X.rec) X.deaths.push([`${C(u).name} 쓰러짐`, "bad"]); }
function step(X, fx, dur) {
  if (!X.rec) return;
  const units = {};
  for (const p of X.P) for (const it of p.field) if (it && it.t) units[it.uid] = JSON.parse(JSON.stringify(it.t));
  X.rec.push({ fx: Object.assign({}, fx), dur: dur || 450, floats: X.floats, logs: X.logs.concat(X.deaths),
    snap: { players: X.P.map(p => ({ field: p.field.map(i => (i ? i.uid : null)), life: p.life, crystals: p.crystals.slice(), burn: p.burn.slice(), reload: p.reload, bonus: p.bonus || 0 })), units, toks: Object.assign({}, X.toks) } });
  X.floats = []; X.logs = []; X.deaths = [];
}

/* v3.62.1 피해를 막은 글자(보호막 · 보호막 코인 · 가호)는 cls "shield block" — 보호막을 얻은 글자("shield")와 갈라,
   마법 연출(js/spellfx.js cast)이 공격을 대상까지 날려 보내고 막는 모습을 보이게 한다 */
function hurt(X, u, x, tag) {
  if (!u.t.alive || x <= 0) return 0;
  { const w = uWings(X, u, x); if (w) return hurt(X, w, x, "대신"); }   // v3.31 [날개 그늘]
  if (u.t.shield === "half") {   // v3.57.5 [보호막 코인] 앞면: 처음 받는 피해의 절반(올림)을 막는다. 남은 피해는 가호 · 사슬을 거쳐 그대로 들어간다
    u.t.shield = false; const b = Math.ceil(x / 2); x -= b;
    fl(X, u.uid, "보호막 −" + b, "shield block"); lg(X, `[보호막 코인] ${C(u).name}이(가) 피해 ${b}를 막았다`, "good");
    if (x <= 0) return 0;
  } else if (u.t.shield) { u.t.shield = false; fl(X, u.uid, "보호막", "shield block"); lg(X, `[보호막] ${C(u).name}이(가) 피해를 막았다`, "good"); return 0; }
  if (u.t.ward && !u.t.wardUsed) {
    u.t.wardUsed = true; const r = Math.min(x, u.t.ward); x -= r;
    if (x <= 0) { fl(X, u.uid, "가호", "shield block"); return 0; }
  }
  x = uLinkSplit(X, u, x);   // v3.31 [강철 사슬]: 짝에게 나눠 준 몫을 뺀 피해
  if (x <= 0) return 0;
  u.t.dmg += x;
  fl(X, u.uid, (tag ? tag + " " : "") + "−" + x, "dmg");
  // v3.11 [불굴]: 이번 턴 쓰러질 피해를 처음 받으면 체력 1로 버틴다 (한 번)
  if (hpLeft(u) <= 0 && u.t.endure) { u.t.endure = false; u.t.dmg = u.t.h - 1; fl(X, u.uid, "불굴 ♥1", "shield"); lg(X, `[불굴] ${C(u).name}이(가) 체력 1로 버텼다`, "good"); return x; }
  if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
  return x;
}

/* 대기열: [수호] 먼저, 그다음 칸 번호 순 */
const colOf = (p, it) => p.field.indexOf(it) + 1;
function liveUnits(p) { return p.field.filter(it => isUnit(it) && it.t && it.t.alive); }
function queueOf(p) {
  return liveUnits(p).sort((x, y) => (y.t.taunt - x.t.taunt) || colOf(p, x) - colOf(p, y));
}

/* 마법 범위: side foe/ally/both, area back n / all / front n / maxA n / behind */
function pickTargets(X, caster, side, area, k) {
  const mine = X.P[caster], theirs = X.P[1 - caster];
  const pools = side === "foe" ? [theirs] : side === "ally" ? [mine] : [mine, theirs];
  let out = [];
  for (const P of pools) {
    let L = liveUnits(P);
    // v3.62 "back N"(화면 글 "아군 유닛 N" · "적 유닛 N")은 칸이 아니라 유닛을 센다 — 사이에 놓인 마법 칸은 건너뛴다.
    //   아군: 이 마법보다 뒤에 있는 아군 유닛 N기(가까운 것부터). 상대: 상대 대기열의 맨 앞 N기(front N과 같음)
    if (area.t === "back") L = P === theirs
      ? queueOf(P).slice(0, area.n)
      : L.filter(u => colOf(P, u) > k).sort((x, y) => colOf(P, x) - colOf(P, y)).slice(0, area.n);
    else if (area.t === "front") L = queueOf(P).slice(0, area.n);
    else if (area.t === "maxA") L = L.slice().sort((x, y) => y.t.a - x.t.a || C(y).lv - C(x).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);
    else if (area.t === "minA") L = L.slice().sort((x, y) => x.t.a - y.t.a || C(x).lv - C(y).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);   // v3.20 공격이 가장 낮은 n기
    else if (area.t === "minH") L = L.slice().sort((x, y) => hpLeft(x) - hpLeft(y) || C(x).lv - C(y).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);   // v3.11 남은 체력이 가장 낮은 n기
    else if (area.t === "behind") L =L.filter(u => colOf(P, u) > k).sort((x, y) => colOf(P, x) - colOf(P, y)).slice(0, 1);
    if (P === theirs) L = uEyeFilter(X, P, L);   // v3.31 [폭풍의 눈]: 상대 마법이 겨눈 내 유닛이 코인 앞면이면 빗나감
    out = out.concat(L);
  }
  return out;
}
/* faces: 미리 던진 코인 면 [true/false ...] (castSpell이 넘긴다). 없으면 여기서 던진다 */
function coinX(op, faces) {
  let x = op.x || 0;
  if (op.coin) for (let i = 0; i < op.coin[0]; i++) if (faces ? faces[i] : flip()) x += op.coin[1];
  return x;
}
/* v3.18 grant 효과가 카드 위에 띄우는 글 */
const GRANT_KO = { crit: "치명", chain: "연쇄", shred: "관통", ranged: "원거리", magic: "마력 공격" };
function grantLabel(op) {
  const xs = Object.keys(op.ab || {}).map(k => GRANT_KO[k] || k);
  if (op.ward) xs.push("가호 " + op.ward);
  return xs.join(" · ");
}
/* v3.9.2 마법 코인 창에 적는 이름. gate = 앞면이 하나라도 나와야 효과가 나는 코인 */
function spellCoinLabel(op) {
  if (op.op === "dmg") return { label: "피해" };
  if (op.op === "mod") return { label: STAT_KO[op.cs || "a"] };
  if (op.op === "thorns") return { label: "가시" };
  const g = { shield: "보호막", destroy: "파괴", atk0: "공격 0" }[op.op];
  return g ? { label: g, gate: true } : { label: "효과" };
}
/* [증폭 N]: 이 유닛이 전장에 있으면 내 공격 마법의 피해 +N */
function amplify(p) { return liveUnits(p).reduce((s, u) => s + abilOf(u).amp, 0); }

function castSpell(X, caster, it, k) {
  const c = C(it), p = X.P[caster], o = X.P[1 - caster];
  X.eyeCast = {}; uOnCast(X, caster);   // v3.31 [폭풍의 눈] 이번 마법에서 정한 빗나감 · [축전] · [마력 흡수]
  lg(X, `✦ ${p.name}: ${c.name} 발동 (${k}번 칸) — ${c.text}`, "spell");
  const ops = c.ops.filter(op => op.op !== "lock").concat(c.ops.filter(op => op.op === "lock"));
  /* v3.9.2 마법 코인은 효과마다 한 번, 효과를 내기 전에 먼저 던진다(대상 모두 같은 값 — 문서 07 마법 "코인 표기").
     예전에는 coinX 안에서 조용히 던져 화면에 코인이 돌지 않았다. 이제 결과를 기록(spellCoin)으로 넘겨 화면이 돌려 보인다.
     대상이 없는 효과의 코인은 던지되 보이지 않는다. 마법 코인은 에테르로 다시 던지지 않는다 */
  const faces = new Map(), sets = [];
  for (const op of ops) {
    if (!op.coin || SPELL_OPS[op.op] || op.op === "copy") continue;
    const fs = [];
    for (let i = 0; i < op.coin[0]; i++) fs.push(flip());
    faces.set(op, fs);
    if (pickTargets(X, caster, op.side, op.area, k).length) sets.push(Object.assign({ v: op.coin[1], faces: fs }, spellCoinLabel(op)));
  }
  if (sets.length) {
    lg(X, `코인: ${sets.map(o => { const h = o.faces.filter(Boolean).length; return `${o.label} ${o.gate ? "" : sgnNum(o.v) + " "}× ${o.faces.length} → ${h ? "앞면 " + h : "모두 뒷면"}`; }).join(" · ")}`, "sys");
    step(X, { spellCoin: { uid: it.uid, id: it.id, sets } }, 1400);
  }
  if (c.cost.life) { p.life -= c.cost.life; fl(X, "life" + p.idx, "대가 −" + c.cost.life, "dmg"); }
  if (c.cost.ether) { p.reload += c.cost.ether; lg(X, `[장전 ${c.cost.ether}] ${p.name}의 다음 턴 에테르 −${c.cost.ether}`, "sys"); }
  if (c.gain.life) { const b = p.life; p.life = Math.min(RULES.lifeCap, p.life + c.gain.life); if (p.life > b) fl(X, "life" + p.idx, "+" + (p.life - b), "heal"); }
  const amp = c.type === "atk" ? amplify(p) : 0;
  // v3.20 효과 하나가 끝날 때마다 표시(고정 · 버팀 · 눌림)를 다시 지킨다 (pinPass)
  const castOp = op => {
    if (SPELL_OPS[op.op]) { SPELL_OPS[op.op](X, caster, it, k, op); return; }
    if (op.op === "copy") {
      const src = pickTargets(X, caster, "ally", { t: "behind" }, k)[0];
      if (!src) { lg(X, "바로 뒤에 아군 유닛이 없어 효과가 없다", "sys"); return; }
      const sa = src.t.a, sd = src.t.d, sh = src.t.h;
      for (const u of pickTargets(X, caster, op.side || "both", { t: "all" }, k)) {
        u.t.a = sa; if (!u.t.lock) u.t.d = sd; u.t.h = sh; applyFloor(u);
        if (hpLeft(u) <= 0) u.t.alive = false;
        fl(X, u.uid, `${sa}/${sd}/${sh}`, "buff");
      }
      return;
    }
    const T = pickTargets(X, caster, op.side, op.area, k);
    const x = coinX(op, faces.get(op)) + (op.op === "dmg" && op.side === "foe" ? amp : 0);
    for (const u of T) {
      switch (op.op) {
        case "dmg": if (op.phys) { const r = hit(x, u.t.d); if (r > 0) hurt(X, u, r, "물리"); else fl(X, u.uid, "막음", "miss"); } else hurt(X, u, x); break;
        case "mod": {
          let ma = op.a || 0, md = op.d || 0, mh = op.h || 0;
          if (op.coin) { const cx = x - (op.x || 0); if (op.cs === "d") md += cx; else if (op.cs === "h") mh += cx; else ma += cx; }
          const b0 = { a: u.t.a, d: u.t.d, h: u.t.h };
          if (ma) u.t.a = Math.max(0, u.t.a + ma);
          if (md && !(u.t.lock && md < 0)) u.t.d += md;   // v3.62.1 [저주 면역]은 깎기만 막음
          if (mh) u.t.h += mh;
          applyFloor(u);
          if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
          // v3.20 실제로 바뀐 값을 띄운다. 표시(고정 · 버팀 · 눌림)에 막힌 스탯은 그 이름을
          const ra = u.t.a - b0.a, rd = u.t.d - b0.d, rh = u.t.h - b0.h;
          const tx = [ra ? "⚔" + sgnNum(ra) : "", rd ? "⛨" + sgnNum(rd) : "", rh ? "♥" + sgnNum(rh) : ""].filter(Boolean).join(" ");
          if (tx) fl(X, u.uid, tx, ra < 0 || rd < 0 || rh < 0 ? "debuff" : "buff");
          const blk = [["a", ma, ra], ["d", md, rd], ["h", mh, rh]].find(([s, want, got]) => want && got !== want && u.t.floor[s]);
          if (blk) fl(X, u.uid, PIN_KO[u.t.floor[blk[0]].m] + " " + STAT_KO[blk[0]], "miss");
          break; }
        case "atk0": if (!op.coin || x > 0) { u.t.a = 0; applyFloor(u); fl(X, u.uid, u.t.a ? PIN_KO[u.t.floor.a.m] : "공격 0", u.t.a ? "miss" : "debuff"); } break;
        case "swap": if (!u.t.lock) { const t = u.t.a; u.t.a = Math.max(0, u.t.d); u.t.d = t; applyFloor(u); fl(X, u.uid, "공방 교환", "debuff"); } break;
        case "shield": if (!op.coin || x > 0) { u.t.shield = true; fl(X, u.uid, "보호막", "shield"); } break;
        case "thorns": u.t.thorns += x; fl(X, u.uid, "가시 +" + x, "buff"); break;
        case "taunt": u.t.taunt = true; break;
        case "lock": u.t.lock = true; if (u.t.d < u.t.rb.d) u.t.d = u.t.rb.d; fl(X, u.uid, "저주 면역", "shield"); break;
        case "destroy": if (!op.coin || x > 0) { u.t.alive = false; u.t.dmg = u.t.h; fl(X, u.uid, "파괴", "dmg big"); lg(X, `${C(u).name} 파괴`, "bad"); } break;
        case "clean": {
          // 코인을 모두 뒷면으로: 이 턴에 던지는 코인은 앞면이 나오지 않는다.
          // v3.5.7 이미 던져 정해진 코인은 마법으로 바뀌지 않는다 (예전에는 앞면 몫을 빼고 뒷면으로 돌렸다)
          if ((u.t.coins || []).some(c => c.heads != null)) { fl(X, u.uid, "코인 고정", "miss"); break; }
          u.t.noCoin = true;
          fl(X, u.uid, "코인 뒷면", "debuff"); break; }
        case "rest": u.t.rest = true; fl(X, u.uid, "행동 불가", "debuff"); break;
        case "strip": u.t.shield = false; u.t.thorns = 0; u.t.lock = false; u.t.taunt = false; fl(X, u.uid, "강화 해제", "debuff"); break;
        /* v3.11 새 효과 (소환 마법을 바꾼 카드들) */
        case "def0": if (!u.t.lock) { u.t.d = 0; applyFloor(u); fl(X, u.uid, u.t.d > 0 ? PIN_KO[u.t.floor.d.m] : "방어 0", u.t.d > 0 ? "miss" : "debuff"); } else fl(X, u.uid, "저주 면역", "miss"); break;
        case "d2a": { const v = Math.max(0, u.t.d); if (v) addStat(X, u, "a", v); break; }
        case "endure": u.t.endure = true; fl(X, u.uid, "불굴", "shield"); break;
        case "pierce": u.t.pierce = true; fl(X, u.uid, "꿰뚫기", "buff"); break;
        /* v3.18 유니크 마법 (js/highcards.js) */
        case "grant": {   // 이번 턴 능력을 걸어 준다: { ab: {crit, chain, magic, ranged, shred ...}, ward: N }
          if (op.ab) u.t.gx = mergeAbil(u.t.gx || {}, op.ab);
          if (op.ward) u.t.ward = (u.t.ward || 0) + op.ward;
          fl(X, u.uid, grantLabel(op), "buff"); break; }
        case "rage": {   // 체력을 1로, 깎인 만큼 공격 + (이번 턴 · 받은 피해처럼 턴이 끝나면 돌아온다)
          const cut = hpLeft(u) - 1;
          if (cut > 0) { u.t.dmg += cut; const b = u.t.a; u.t.a += cut; applyFloor(u); fl(X, u.uid, "♥1 ⚔" + sgnNum(u.t.a - b), "buff"); }
          break; }
      }
    }
  };
  for (const op of ops) { castOp(op); pinPass(X); }
}

/* v3.57.0 [사격]의 대상: 남은 체력이 가장 낮은 유닛, 같으면 대기열 앞의 유닛 (레벨은 보지 않는다).
   (v3.34~v3.56: 같으면 레벨이 높은 유닛 먼저. v3.33까지: 쓰러뜨릴 수 있는 유닛 중 레벨이 가장 높은 유닛, 없으면 맨 앞) */
function snipeTarget(D, foes) {
  return queueOf(D).filter(f => foes.includes(f))
    .reduce((b, f) => !b || hpLeft(f) < hpLeft(b) ? f : b, null);
}
/* v3.34 [투척]의 대상: 맞선 유닛에서 칸이 가장 먼 상대 유닛(같은 거리면 전장 번호가 큰 쪽). 맞선 유닛뿐이면 없음 */
function throwTarget(D, Du) {
  const c0 = colOf(D, Du), far = f => Math.abs(colOf(D, f) - c0);
  return liveUnits(D).filter(f => f !== Du)
    .reduce((b, f) => !b || far(f) > far(b) || (far(f) === far(b) && colOf(D, f) > colOf(D, b)) ? f : b, null);
}
/* [사격]: 공격 턴에 이 유닛의 차례가 오면, 맞붙기 바로 전에 상대 유닛 하나에게 방어 무시 피해.
   v3.17.5 예전에는 전투가 시작되자마자 모든 사격 유닛이 한꺼번에 쐈다(앞 칸 유닛이 싸우기도 전에). 이제 자기 칸 차례에 쏜다.
   v1.6.2: [투척]은 여기서 빠지고, 그 유닛이 공격을 시작할 때 함께 던진다 (attackOne) */
function snipeOne(X, u) {
  const A = X.P[X.ai], D = X.P[1 - X.ai];
  const sn = abilOf(u).snipe; if (!sn || u.t.rest || !u.t.alive) return;
  const foes = liveUnits(D); if (!foes.length) return;
  const tg = snipeTarget(D, foes);
  fl(X, tg.uid, "◎ " + C(tg).name, "aim");   // v3.9.11 겨눌 때 대상 이름을 카드 위에 띄운다 (맞고 부서져 칸이 당겨져도 무엇을 맞혔는지 보이게)
  step(X, { act: u.uid, tgt: tg.uid, sn: 1 }, 380);   // sn: 화면이 [사격] 소리를 고르는 표시 (규칙과 무관)
  lg(X, `${C(u).name}의 [사격 ${sn}] → ${C(tg).name}`);
  if (!uEyeDodge(X, D, tg)) hurt(X, tg, sn, "사격");   // v3.31 [폭풍의 눈]
  step(X, { act: u.uid, tgt: tg.uid, hit: true, sn: 1 }, 520);
  // v3.57.6 사격으로 상대 유닛이 모두 쓰러져도 남은 공격 유닛은 생명을 직접 공격한다 (v3.12.4~v3.57.5: 그 전투에서는 아무도 생명을 치지 않았다)
}

function attackOne(X, Au) {
  const A = X.P[X.ai], D = X.P[1 - X.ai];
  const Du = queueOf(D)[0];
  const ca = C(Au);
  if (!Du) {
    const dmg = ca.lv;
    step(X, { act: Au.uid, tgt: "life" + D.idx }, 380);
    // 직접 공격: 피해는 모두 생명에서 빠진다. 대신 맞은 쪽은 다음 턴에 에테르 +1 (한 턴에 한 번, 역전 기회)
    D.life -= dmg; X.direct += dmg;
    fl(X, "life" + D.idx, "−" + dmg, "dmg big");
    const first = !D.bonus;
    D.bonus = 1;
    if (first) fl(X, "crys" + D.idx, "다음 턴 에테르 +1", "heal");
    lg(X, `${ca.name}의 직접 공격 ${dmg} → ${D.name} 생명 −${dmg}${first ? ` · ${D.name}의 다음 턴 에테르 +1` : ""}`, "bad");
    step(X, { act: Au.uid, tgt: "life" + D.idx, hit: true }, 560);
    return;
  }
  const cd = C(Du), im = itemOf(Au), ab = abilOf(Au);
  const behind = Au.t.pierce ? queueOf(D).find(f => f !== Du) : null;   // v3.11 [꿰뚫기]: 맞선 유닛 바로 뒤의 유닛
  // 유닛과 유닛이 맞붙는다: 공격 쪽 코인을 던진다. 방어 쪽은 이 전투에서 처음 맞붙을 때만 던지고,
  // 그 뒤로는 전투가 끝날 때까지 정해진 코인 그대로 (v3.5.6, clashCoins의 keep).
  // 화면에서는 돌고 있는 코인을 사용자가 멈추면 결과가 드러나고, 그 결과대로 스탯이 바뀐 뒤에 공격·반격이 이어진다
  X.clashN++;
  Au.t.jam = abilOf(Du).u === "jam"; Du.t.jam = abilOf(Au).u === "jam";   // v3.31 [자기장 교란]
  if (Au.t.jam || Du.t.jam) lg(X, `[자기장 교란] ${C(Au.t.jam ? Au : Du).name}의 코인은 손해 보는 면으로 정해진다`, "sys");
  const ca_ = clashCoins(X, Au), cd_ = clashCoins(X, Du, true);
  const keptD = cd_.length > 0 && !!cd_[0].kept;
  if (ca_.length || (cd_.length && !keptD)) {
    step(X, { coin: { n: X.clashN, a: Au.uid, d: Du.uid, coinsA: ca_, coinsD: cd_, keptD, pa: A.idx, pd: D.idx } }, 0);
    for (const [u, cs] of [[Au, ca_], [Du, cd_]]) {
      if (!cs.length || (u === Du && keptD)) continue;   // 고정된 방어 코인은 이미 스탯에 들어가 있다
      const dl = applyCoins(u, cs);
      const hn = cs.filter(k => k.heads).length;
      // v1.9.5 바뀐 스탯마다 따로: 오르면 +N(연두, cpop up), 내리면 −N(빨강, cpop down) — 화면이 캐릭터 위에 쌓아 띄운다
      let any = false;
      for (const st of ["a", "d", "h"]) if (dl[st]) { any = true; fl(X, u.uid, { a: "⚔", d: "⛨", h: "♥" }[st] + sgnNum(dl[st]), "cpop " + (dl[st] > 0 ? "up" : "down")); }
      if (!any) fl(X, u.uid, hn ? "코인 그대로" : "코인 뒷면", "miss");
    }
    for (const u of [Au, Du]) if (!u.t.alive && u.t.coinDeath) { fl(X, u.uid, "코인에 쓰러짐", "dmg big"); lg(X, `${C(u).name}이(가) 코인 때문에 쓰러짐`, "bad"); }
    lg(X, `코인: ${ca.name} ${coinLogText(ca_)} · ${cd.name} ${coinLogText(cd_)}${keptD ? " (방어 코인 고정)" : ""}`, "sys");
    // v1.9.5 코인으로 바뀐 숫자를 볼 틈 (공격이 시작되기 전에)
    step(X, { coinRes: true }, 440);
    if (!Au.t.alive) return;
    if (!Du.t.alive) return attackOne(X, Au);
  }
  if (!Au.t.alive) { step(X, {}, 420); return; }
  if (!Du.t.alive) { step(X, {}, 420); return attackOne(X, Au); }   // 맞설 상대가 코인에 쓰러지면 다음 상대에게
  // [투척] v3.34: 내 공격 턴마다(예전에는 장착한 그 턴에 한 번), 이 유닛이 공격을 시작할 때 맞선 유닛에서 칸이 가장 먼 상대 유닛에게 함께 던진다.
  // 그 유닛의 방어만큼 줄어든다(예전에는 방어 무시). 맞선 유닛뿐이면 던지지 않는다(예전에는 그 유닛에게 투척 → 공격 두 번)
  let thr = null;
  if (im && im.throw && !im.every && !Au.t.thrown) {
    thr = throwTarget(D, Du);
    if (thr) Au.t.thrown = true;
  }
  step(X, thr ? { act: Au.uid, tgt: Du.uid, thr: thr.uid } : { act: Au.uid, tgt: Du.uid }, 380);
  if (thr) {
    const td = hit(im.throw, thr.t.d);
    lg(X, `${ca.name}의 [투척 ${im.throw}] → ${C(thr).name}(방 ${thr.t.d}): 피해 ${td}`);
    if (uEyeDodge(X, D, thr)) {}   // v3.31 [폭풍의 눈]
    else if (td > 0) hurt(X, thr, td, "투척");
    else fl(X, thr.uid, "투척 막음", "miss");
  }
  let dd = Du.t.d;
  if (ab.magic) dd = dd > 0 ? Math.max(0, dd - (ab.magic === true ? 99 : ab.magic)) : dd;
  let dealt = hit(Au.t.a, dd), crit = false, got = 0;
  if (dealt > 0 && Du.t.alive && uHas(Du, "eye") && uK(Du).dodgeT !== X.turn && (uK(Du).dodgeT = X.turn, flip())) { dealt = 0; fl(X, Du.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] ${ca.name}의 공격이 바람에 빗나갔다`, "good"); }   // v3.31
  if (!Du.t.alive) lg(X, `${cd.name}이(가) 투척에 쓰러져 공격은 빗나갔다`, "sys");
  else {
    const hpBefore = hpLeft(Du);
    got = dealt > 0 ? hurt(X, Du, dealt) : (fl(X, Du.uid, "0", "miss"), 0);
    // v3.9.6 [치명]: 코인 없이, 피해가 들어갔고(보호막 · 가호에 다 막히지 않음) 상대가 살아 있으면 남은 체력을 1로.
    // 원래 피해로 쓰러지면 그대로 쓰러진다. 예전에는 코인 앞면이면 피해 2배라 공격이 큰 유닛에게 너무 셌다
    if (ab.crit && got > 0 && Du.t.alive && hpLeft(Du) > 1) { const cut = hpLeft(Du) - 1; Du.t.dmg += cut; got += cut; crit = true; fl(X, Du.uid, "치명 ♥1", "dmg big"); }
    if (ab.shred && Du.t.d > 0) { const red = Math.min(Au.t.a, Du.t.d); Du.t.d -= red; applyFloor(Du); if (red) fl(X, Du.uid, "관통 ⛨−" + red, "debuff"); }
    lg(X, `${ca.name}(공 ${Au.t.a}) → ${cd.name}(방 ${dd}): 피해 ${got}${crit ? " (치명)" : ""}`);
    // v3.13.2 [연쇄]: 이 공격으로 맞선 유닛을 쓰러뜨리고 피해가 남으면, 남은 피해로 대기열의 다음 상대 유닛 하나를 친다.
    // 그 유닛의 방어만큼 줄고(마력 공격은 여기에도 적용), 반격 · 가시는 없다. 가호에 줄어든 몫은 남은 피해에서 빠진다
    if (ab.chain && !Du.t.alive && got > hpBefore) {
      const nx = queueOf(D)[0];
      if (nx) {
        let nd = nx.t.d;
        if (ab.magic && nd > 0) nd = Math.max(0, nd - (ab.magic === true ? 99 : ab.magic));
        const left = got - hpBefore, ch = hit(left, nd);
        lg(X, `[연쇄] ${ca.name}의 남은 피해 ${left} → ${C(nx).name}(방 ${nd})`);
        if (ch > 0) hurt(X, nx, ch, "연쇄"); else fl(X, nx.uid, "연쇄 막음", "miss");
      }
    }
    if (behind && behind.t.alive) {
      const pr = hit(Au.t.a, behind.t.d);
      lg(X, `[꿰뚫기] ${ca.name}의 공격이 ${C(behind).name}까지 꿰뚫었다 (공 ${Au.t.a} → 방 ${behind.t.d})`);
      if (pr > 0) hurt(X, behind, pr, "꿰뚫기"); else fl(X, behind.uid, "막음", "miss");
    }
    uOnHit(X, Au, Du, got);   // v3.31 [불씨 전염] · [계약의 낙인] 표시, 쓰러뜨린 유닛 기록
    if (Du.t.thorns && Au.t.alive) { const t = hurt(X, Au, Du.t.thorns, "가시"); if (t) lg(X, `[가시] ${ca.name} 피해 ${t}`); }
  }
  step(X, thr ? { act: Au.uid, tgt: Du.uid, hit: true, thr: thr.uid } : { act: Au.uid, tgt: Du.uid, hit: true }, 520);
  if (Du.t.alive && Au.t.alive && !Du.t.rest && !C(Du).still) {
    if (ab.ranged) { lg(X, `[원거리] ${ca.name}은(는) 반격을 받지 않는다`, "sys"); return; }
    const back = hit(Du.t.a, Au.t.d);
    const g = back > 0 ? hurt(X, Au, back, "반격") : (fl(X, Au.uid, "반격 0", "miss"), 0);
    uOnHit(X, Du, Au, g);   // v3.31 반격도 맞붙은 피해
    lg(X, `↺ ${cd.name}의 반격 → ${ca.name}: 피해 ${g}`);
    step(X, { act: Au.uid, counter: Du.uid }, 460);
  }
}

/* 한 턴의 전투 전체.
   쓰러진 유닛과 쓴 마법은 그 자리에서 부서지고(sweep), 남은 카드는 바로 좌측으로 당겨진다.
   마법의 "앞 칸·뒤 N칸"은 정렬 뒤에도 같은 카드 순서를 가리킨다 (k를 새 칸 번호로 고친다) */
/* v3.11 빼앗긴 카드(from = 원래 주인 번호)는 부서지면 원래 주인의 소각장으로 간다 */
function ownerOf(X, it, p) { return it && it.from != null ? (X.P.find(q => q.idx === it.from) || p) : p; }
function runCombatCore(X) {
  const A = X.P[X.ai], D = X.P[1 - X.ai];
  const pend = [];
  X.pend = pend; X.A = A;   // v3.11 빼앗기(steal)가 대기 중인 마법의 주인을 바꿀 때 쓴다
  for (const [p, who] of [[A, "atk"], [D, "def"]]) p.field.forEach((it, i) => { if (isSpell(it)) pend.push({ p, it, who, k: i + 1 }); });
  const acted = new Set();
  // v1.9: 누구든 생명이 다하는 순간 전투(와 경기)는 그 자리에서 끝난다. 남은 공격·마법은 하지 않는다
  // v3.19.6: 생명 0은 아직 살아 있다(공격 · 방어 가능). 0에서 더 깎여 0 아래가 되는 순간 끝
  const dead = () => X.P.some(p => p.life < 0);
  // v3.18.2 opening 마법(수비형 깃발의 유니크 공격 마법)은 놓인 칸과 상관없이 전투가 시작될 때 먼저 발동한다
  const ready = q => C(q.it).opening ? true : q.who === "atk"
    ? A.field.every((u, i) => !isUnit(u) || i + 1 >= q.k || acted.has(u) || !u.t.alive)
    : !D.field.some((u, i) => isUnit(u) && u.t.alive && i + 1 < q.k);
  // 부서진 카드 치우고 좌측 정렬. 치운 게 있으면 한 수로 기록한다
  const sweep = (extraUids, dur) => {
    const gone = extraUids ? extraUids.slice() : [];
    uPreSweep(X);   // v3.31 쓰러지기 전에: 세이렌의 노래 · 전리품 · 영혼 강탈 · 늑대 · 화약통 · 뿌리 · 고철 · 물결
    for (const p of X.P) {
      p.field.forEach((it, s) => { if (isUnit(it) && !it.t.alive) { gone.push(it.uid); p.field[s] = null; const bp = ownerOf(X, it, p); if (!C(it).tok) uBury(X, it, p, bp); else if (it.t.keep && it.t.keep.rev) { bp.burn.push(it.t.keep.rev); brokeCard(X, bp, it.t.keep.rev, "unit"); } if (it.item) { const ip = it.item.from != null ? (X.P.find(q => q.idx === it.item.from) || bp) : bp; ip.burn.push(it.item.id); brokeCard(X, ip, it.item.id, "item"); } } });   // v3.31 uBury: 소각장 · 핸드(영혼 강탈) · 덱 맨 위(돌아오는 물결), 빼앗은 아이템은 원래 주인에게
      const xs = p.field.filter(Boolean);
      p.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    }
    for (const q of pend) q.k = q.p.field.indexOf(q.it) + 1;
    if (gone.length) step(X, { shatter: gone }, dur || 520);
    if (uPostSweep(X)) for (const q of pend) q.k = q.p.field.indexOf(q.it) + 1;   // v3.31 쓰러진 뒤 부르는 소환물
  };
  const fire = all => {
    for (;;) {
      let q = null;
      for (const w of ["atk", "def"]) {
        const L = pend.filter(z => z.who === w && (all || ready(z))).sort((a, b) => a.k - b.k);
        if (L.length) { q = L[0]; break; }
      }
      if (!q || dead()) return;
      pend.splice(pend.indexOf(q), 1);
      step(X, { act: q.it.uid, reveal: q.it.uid }, 950);   // 뒤집기 + 크게 들고 읽을 틈 (v1.2: 700 → 950)
      castSpell(X, q.p.idx, q.it, q.k);
      step(X, { spell: q.it.id, shown: q.it.uid }, 800);   // 효과 숫자를 볼 틈 (v1.2: 650 → 800)
      const s = q.p.field.indexOf(q.it); if (s >= 0) q.p.field[s] = null;
      const bp = ownerOf(X, q.it, q.p); bp.burn.push(q.it.id); brokeCard(X, bp, q.it.id, "spell");
      sweep([q.it.uid], 560);
    }
  };
  shieldCoinsAtCombat(X);   // v3.61.1 보호막 코인 (전투가 시작될 때, 다른 무엇보다 먼저)
  uCombatStart(X, sweep);   // v3.31 불씨 · 뿌리 · 축전 (전투가 시작될 때)
  fire(false);
  if (!dead() && uBombs(X, sweep)) fire(false);   // v3.31.4 화약통은 시작 때 마법이 모두 발동한 뒤에 터진다(그 마법에 부서지면 불발). 터져서 앞 유닛이 쓰러지면 풀린 방어 마법이 이어서 발동
  // v1.4: 공격 순서를 그때그때 다시 읽는다 — 마법이 부른 유닛도 차례가 오면 공격한다
  for (;;) {
    if (dead()) break;
    const Au = A.field.find(u => isUnit(u) && u.t.alive && !acted.has(u));
    if (!Au) break;
    acted.add(Au);
    if (!Au.t.rest && !C(Au).still) {
      if (abilOf(Au).snipe) { snipeOne(X, Au); sweep(); if (dead()) break; }   // v3.17.5 [사격]은 자기 차례에, 맞붙기 바로 전에
      if (Au.t.alive) { attackOne(X, Au); sweep(); }
    }
    fire(false);
  }
  if (dead()) { lg(X, "생명이 다해 전투가 그 자리에서 끝났다", "bad"); step(X, {}, 300); return X.direct; }
  fire(true);
  sweep();
  uCombatEnd(X, sweep);   // v3.31 고철 골렘 · 씨앗 · 새벽의 부활 · 늑대 흩어짐 (전투가 끝날 때)
  // "이번 턴만" 부른 유닛은 전투가 끝나면 사라진다
  let fade = false;
  for (const p of X.P) for (const u of p.field) if (isUnit(u) && u.tokTemp && u.t.alive) { u.t.alive = false; fade = true; lg(X, u.from != null ? `빼앗은 ${C(u).name}이(가) 그림자로 흩어져 원래 주인의 소각장으로 갔다` : `${C(u).name}이(가) 사라졌다`, "sys"); }
  if (fade) sweep();
  step(X, {}, 300);
  return X.direct;
}

/* ---------- 컴퓨터의 수 읽기용: 상태 복제와 점수 ---------- */
function cloneSide(p, hideSpells) {
  return { idx: p.idx, name: p.name, life: p.life, crystals: p.crystals.slice(), burn: [], reload: 0, bonus: p.bonus || 0,
    field: p.field.map(it => (!it ? null : (hideSpells && isSpell(it)) ? null : JSON.parse(JSON.stringify(it)))) };
}
/* 유닛의 값: 환산 레벨(레벨 + 유지비 0.5) + 아이템 레벨 */
function unitWorth(it) { const c = C(it); return c.lv + 0.5 * c.up + (it.item ? CARDS[it.item.id].lv * 0.8 : 0); }
/* me 쪽 점수: 상대 손실 − 내 손실 + 0.5 × (생명 차이 변화) − 장전 */
function evalScore(before, after, me) {
  const lost = (b, a) => b.field.filter(isUnit).reduce((s, u) => s + (a.field.some(v => v && v.uid === u.uid) ? 0 : unitWorth(u)), 0);
  const o = 1 - me;
  return lost(before[o], after[o]) - lost(before[me], after[me])
    + 0.5 * ((after[me].life - before[me].life) - (after[o].life - before[o].life)) - 0.8 * (after[me].reload - before[me].reload)
    + 0.6 * ((after[me].bonus || 0) - (before[me].bonus || 0) - (after[o].bonus || 0) + (before[o].bonus || 0));
}
/* 지금 배치로 전투를 n번 굴려 평균 점수 (me 기준). hideOf: 그 플레이어의 마법은 모르는 것으로 */
function simulate(players, attacker, turn, me, hideOf, n) {
  let s = 0;
  for (let i = 0; i < n; i++) {
    // 이번 턴 코인(유닛 코인, 보호막 코인 등)은 이미 정해진 값을 그대로 쓴다
    const before = players.map(p => cloneSide(p, p.idx === hideOf));
    const P = before.map(p => JSON.parse(JSON.stringify(p)));
    runCombatCore(ctx(P, attacker, turn, null));
    s += evalScore(before, P, me);
  }
  return s / n;
}

/* ---------- v1.4 마법 효과 등록부 ----------
   새 효과는 여기에 이름: function (X, 시전자 번호, 마법 카드, 놓인 칸 번호 k, op) 를 더하면 된다.
   data.js 마법의 ops에 { op: "이름", ... } 로 적으면 castSpell이 여기로 보낸다.
   기존 효과(dmg·mod·shield ...)는 castSpell 안의 switch, 물리 피해는 dmg의 phys: true.
   부르는 유닛·작은 마법(소환물)은 data.js SIM_TOKENS (cards.js가 CARDS에만 넣고, 덱·상점에는 나오지 않는다) */
const sideUnits = (X, caster, side) => side === "ally" ? liveUnits(X.P[caster]) : side === "both" ? liveUnits(X.P[0]).concat(liveUnits(X.P[1])) : liveUnits(X.P[1 - caster]);
/* ---------- 소환 규칙 (v1.5) ----------
   전장 위에는 보이지 않는 "소환 영역"이 있다. 마법·능력이 카드를 소환하면 카드는 먼저 그곳에 나타나고,
   - 전장에 빈 칸이 하나라도 있으면: 소환한 카드 바로 다음 칸에 내려앉는다. 그 뒤의 카드는 한 칸씩 밀려난다.
   - 빈 칸이 없으면: 나타나자마자 흐려지며 부서진다. 효과도 없다.
   "이 칸에 부른다"(summon, free 없음)는 소환 마법이 부서진 자리에 앉으므로 빈 칸이 필요 없다.
   소환 없이 전장 위에서 바로 쏘는 효과(echo: 토네이도의 돌개바람 등)는 칸과 상관없다. */
function tokUid(X) { return 900000 + (X.turn % 1000) * 100 + (++X.tokN); }
/* 소환된 카드가 내려앉을 칸 번호(0부터). 빈 칸이 없으면 -1 */
function landSlot(p, from) {
  if (!p.field.includes(null)) return -1;
  const s = from ? p.field.indexOf(from) : -1;
  return s >= 0 ? s + 1 : p.field.indexOf(null);
}
/* at 칸에 끼워 넣고, 뒤쪽에서 가장 가까운 빈 칸 하나를 없앤다 (없으면 앞쪽의 마지막 빈 칸) */
function landAt(p, at, card) {
  const f = p.field.slice(0, at).concat([card], p.field.slice(at));
  let j = f.indexOf(null, at + 1);
  if (j < 0) j = f.lastIndexOf(null);
  f.splice(j, 1);
  p.field = f;
}
function packField(p) { const xs = p.field.filter(Boolean); p.field = xs.concat(Array(RULES.slots - xs.length).fill(null)); }
/* 빈 칸이 없어 소환 영역에서 부서짐 */
function fizzle(X, p, id, from, i, n) {
  lg(X, `↳ ${C({ id }).name} 소환${n > 1 ? ` (${i}/${n})` : ""} — 전장에 빈 칸이 없어 나타나자마자 부서진다`, "bad");
  step(X, { fizzle: { p: p.idx, id, from: from ? from.uid : null } }, 820);
}

const dmgOf = (u, x, phys) => (phys ? hit(x, u.t.d) : x);
/* v3.20 스탯 하나에 v를 더하고 표시를 지킨다. 실제로 바뀐 값을 띄우고 돌려준다 */
function addStat(X, u, k, v) {
  const b = u.t[k];
  if (k === "d" && u.t.lock && v < 0) { fl(X, u.uid, "저주 면역", "miss"); return 0; }
  u.t[k] = k === "a" ? Math.max(0, b + v) : b + v;
  applyFloor(u);
  const r = u.t[k] - b;
  if (r) fl(X, u.uid, STAT_ICON[k] + sgnNum(r), r > 0 ? "buff" : "debuff");
  else if (v && u.t.floor[k]) fl(X, u.uid, PIN_KO[u.t.floor[k].m] + " " + STAT_KO[k], "miss");
  return r;
}
/* v3.20 공 · 방 · 체를 한꺼번에 새 값으로(순환 · 맞바꿈 · 평균 · 본뜨기). nv.h는 "남은 체력": 받은 피해를 지우고 체력이 그 값이 된다.
   그 뒤 표시를 지키고(고정은 그대로, 버팀 · 눌림은 기준값까지), 체력이 0 이하면 쓰러진다. [불굴]은 통하지 않는다 */
function setStats(X, u, nv, tag) {
  const b = { a: u.t.a, d: u.t.d, h: hpLeft(u) };
  if (nv.a != null) u.t.a = Math.max(0, nv.a);
  if (nv.d != null && !(u.t.lock && nv.d < u.t.d)) u.t.d = nv.d;
  if (nv.h != null) { u.t.h = nv.h; u.t.dmg = 0; }
  applyFloor(u);
  const hl = hpLeft(u);
  if (u.t.alive && hl <= 0) { u.t.alive = false; fl(X, u.uid, (tag || "") + " 체력 0", "dmg big"); lg(X, `${C(u).name}의 체력이 0이 되어 쓰러졌다`, "bad"); lgDeath(X, u); }
  else fl(X, u.uid, `${tag ? tag + " " : ""}${u.t.a}/${u.t.d}/${Math.max(0, hl)}`, (u.t.a < b.a || hl < b.h) ? "debuff" : "buff");
  return { a: u.t.a - b.a, d: u.t.d - b.d, h: hl - b.h };
}
const statNow = (u, k) => (k === "h" ? hpLeft(u) : u.t[k]);
const SPELL_OPS = {
  /* 무작위 대상에게 n번: { side, n, x, phys } */
  multi(X, caster, it, k, op) {
    // v3.18.3 [증폭]: 공격 마법이 상대를 칠 때 한 번 맞을 때마다 +N (토네이도의 돌개바람 · 별똥별 조각도 공격 마법)
    const amp = C(it).type === "atk" && (op.side || "foe") === "foe" ? amplify(X.P[caster]) : 0;
    for (let i = 0; i < op.n; i++) {
      const L = sideUnits(X, caster, op.side || "foe"); if (!L.length) break;
      const u = L[Math.floor(RNG() * L.length)], r = dmgOf(u, op.x + amp, op.phys);
      if (r > 0) hurt(X, u, r, op.phys ? "물리" : ""); else fl(X, u.uid, "막음", "miss");
      step(X, {}, 260);
    }
  },
  /* 상대 대기열 맨 앞부터 차례로: { xs: [3, 2, 1], phys } */
  chain(X, caster, it, k, op) {
    const Q = queueOf(X.P[1 - caster]), amp = C(it).type === "atk" ? amplify(X.P[caster]) : 0;   // v3.18.3 [증폭]: 맞는 유닛마다 +N
    op.xs.forEach((v, i) => { const u = Q[i]; if (!u || !u.t.alive) return; const r = dmgOf(u, v + amp, op.phys); if (r > 0) hurt(X, u, r, "연쇄"); step(X, {}, 240); });
  },
  /* 이 마법이 작은 마법 k장을 불러 바로 발동: { id: 작은 마법 카드 ID, k } */
  echo(X, caster, it, k, op) {
    for (let i = 0; i < op.k; i++) {
      lg(X, `↳ ${C({ id: op.id }).name} (${i + 1}/${op.k})`, "spell");
      castSpell(X, caster, { uid: it.uid, id: op.id, echo: true }, k);
      step(X, { spell: op.id, shown: it.uid }, 420);
    }
  },
  /* v1.5 카드 소환: 작은 마법 k장을 한 장씩 소환한다 { id, k }.
     한 장마다: 소환 영역에 나타남 → 빈 칸이 있으면 이 마법 바로 다음 칸에 내려앉아 발동하고 부서짐 / 없으면 그대로 부서짐 */
  conjure(X, caster, it, k, op) {
    const p = X.P[caster];
    for (let i = 1; i <= op.k; i++) {
      const at = landSlot(p, it);
      if (at < 0) { fizzle(X, p, op.id, it, i, op.k); continue; }
      const card = { uid: tokUid(X), id: op.id, conj: true };
      landAt(p, at, card); X.toks[card.uid] = op.id;
      lg(X, `↳ ${C(card).name} 소환${op.k > 1 ? ` (${i}/${op.k})` : ""} → ${p.field.indexOf(card) + 1}번 칸`, "spell");
      step(X, { conjure: card.uid, shown: card.uid }, 700);
      castSpell(X, caster, card, p.field.indexOf(card) + 1);
      step(X, { spell: op.id, shown: card.uid }, 650);
      const s = p.field.indexOf(card); if (s >= 0) p.field[s] = null;
      packField(p);
      step(X, { shatter: [card.uid] }, 520);
    }
  },
  /* 이 칸에 유닛을 부른다: { tok: 소환물 카드 ID, stay: 남는지 } */
  summon(X, caster, it, k, op) {
    const p = X.P[caster];
    let u;
    if (op.free) {
      /* v1.5 그냥 "부른다": 빈 칸이 있어야 한다. 이 마법 바로 다음 칸에 내려앉는다 */
      const at = landSlot(p, it.echo ? null : it);
      if (at < 0) { fizzle(X, p, op.tok, it, 1, 1); return; }
      u = { uid: tokUid(X), id: op.tok, item: null, summoned: X.turn, tokTemp: !op.stay };
      resetTurn(u);
      landAt(p, at, u); X.toks[u.uid] = op.tok;
      step(X, { conjure: u.uid }, 650);
    } else {
      /* "이 칸에 부른다": 소환 마법이 부서진 그 자리에 앉는다 */
      let s = it.echo ? -1 : p.field.indexOf(it);
      if (s < 0) s = p.field.indexOf(null);
      if (s < 0) { fizzle(X, p, op.tok, it, 1, 1); return; }
      u = { uid: tokUid(X), id: op.tok, item: null, summoned: X.turn, tokTemp: !op.stay };
      resetTurn(u);
      if (!it.echo && p.field[s] === it) X.tokFrom = it.uid;
      p.field[s] = u; X.toks[u.uid] = op.tok;
    }
    const uid = u.uid;
    fl(X, uid, op.stay ? "소환" : "소환 · 이번 턴", "buff");
    lg(X, `${C(u).name}(${C(u).a}${C(u).lock && C(u).lock.a ? "*" : ""}/${C(u).d}/${C(u).h}) 소환${op.stay ? "" : " — 이번 턴이 끝나면 사라진다"}`, "good");
  },
  /* 상대 맨 앞 유닛과 맨 뒤 유닛의 자리를 바꾼다 */
  swapPos(X, caster, it, k, op) {
    const o = X.P[1 - caster];
    const L = o.field.map((u, i) => [u, i]).filter(([u]) => isUnit(u) && u.t.alive);
    if (L.length < 2) return;
    const a = L[0][1], b = L[L.length - 1][1];
    [o.field[a], o.field[b]] = [o.field[b], o.field[a]];
    fl(X, o.field[a].uid, "앞으로", "debuff"); lg(X, `${C(o.field[a]).name} ↔ ${C(o.field[b]).name} 자리 바꿈`, "sys");
  },
  /* 아군 중 가장 단단한 유닛이 [수호]로 맨 앞에, 방어 +d: { d } */
  guard(X, caster, it, k, op) {
    const L = liveUnits(X.P[caster]).sort((x, y) => (y.t.d * 3 + hpLeft(y)) - (x.t.d * 3 + hpLeft(x)));
    const u = L[0]; if (!u) return;
    u.t.taunt = true; if (op.d && !(u.t.lock && op.d < 0)) u.t.d += op.d;
    fl(X, u.uid, "수호" + (op.d ? " ⛨+" + op.d : ""), "shield");
  },
  /* v3.11 아군 유닛 수 × per 만큼 상대 유닛 전체에게 피해: { per, side } */
  perAlly(X, caster, it, k, op) {
    const n = liveUnits(X.P[caster]).length, x = n * (op.per || 1) + (C(it).type === "atk" ? amplify(X.P[caster]) : 0);
    lg(X, `아군 유닛 ${n}기 × ${op.per || 1} → 피해 ${x}`, "sys");
    if (!x) return;
    for (const u of sideUnits(X, caster, op.side || "foe")) hurt(X, u, x);
  },
  /* v3.11 빼앗기 (v3.19.7: 칸은 이 마법이 놓인 칸, 가져온 카드는 내 전장 맨 뒤)
     이 마법과 같은 칸 번호에 놓인 상대 카드를 빼앗아 내 전장의 맨 뒤(마지막 카드 다음)에 놓는다. 이 마법은 쓰이고 부서지므로 그 칸은 비우고 당긴다.
     유닛이면 이번 턴 내 유닛이 되고(공격 턴이면 내 다른 유닛들 다음에 공격, 방어 턴이면 내 방어 줄 맨 뒤), 전투가 끝나면 흩어져 원래 주인의 소각장으로 간다.
     뒷면 마법이면 내 마법으로 발동한다(맨 뒤 칸 차례에, 쓴 뒤 원래 주인의 소각장으로) */
  steal(X, caster, it, k, op) {
    const p = X.P[caster], o = X.P[1 - caster];
    const mine = it.echo ? -1 : p.field.indexOf(it);
    const col = mine >= 0 ? mine : k - 1, tg = o.field[col];
    if (!tg || (isUnit(tg) && !(tg.t && tg.t.alive))) { lg(X, `상대 ${col + 1}번 칸이 비어 빼앗을 카드가 없다`, "sys"); return; }
    const xs = p.field.filter(u => u && u !== it);
    if (xs.length >= RULES.slots) { lg(X, "내 전장에 놓을 칸이 없어 빼앗지 못했다", "bad"); return; }
    o.field[col] = null;
    xs.push(tg);
    p.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    if (tg.from == null) tg.from = o.idx;   // 원래 주인 (이미 빼앗긴 카드면 처음 주인을 그대로)
    if (isUnit(tg)) { tg.tokTemp = true; if (tg.t) tg.t.stolen = true; }   // 빼앗은 유닛은 이번 턴만 내 편 — 전투가 끝나면 흩어져 원래 주인의 소각장으로
    if (X.pend) {
      const q = isSpell(tg) && X.pend.find(z => z.it === tg);
      if (q) { q.p = p; q.who = p === X.A ? "atk" : "def"; }
      for (const z of X.pend) if (z.p === p) z.k = p.field.indexOf(z.it) + 1;   // 당겨진 내 마법들의 칸 번호
    }
    fl(X, tg.uid, "빼앗김", "debuff");
    lg(X, `${p.name}이(가) 상대 ${col + 1}번 칸의 ${isSpell(tg) ? "마법 " : ""}${C(tg).name}을(를) 빼앗아 내 전장 맨 뒤(${xs.length}번 칸)에 놓았다`, "good");
    step(X, { act: tg.uid }, 520);
  },
  /* v3.11 대칭: 상대 전장의 카드 배치를 좌우로 뒤집는다 (맨 앞 ↔ 맨 뒤). 대기 중인 마법의 칸도 함께 바뀐다 */
  mirror(X, caster, it, k, op) {
    const o = X.P[1 - caster];
    const xs = o.field.filter(Boolean);
    if (xs.length < 2) { lg(X, "상대 전장에 카드가 둘보다 적어 바뀌지 않았다", "sys"); return; }
    xs.reverse();
    o.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    if (X.pend) for (const q of X.pend) q.k = q.p.field.indexOf(q.it) + 1;
    for (const u of xs) if (isUnit(u)) fl(X, u.uid, "⇄", "debuff");
    lg(X, `${o.name}의 전장 배치가 거꾸로 뒤집혔다`, "sys");
    step(X, {}, 520);
  },
  /* v3.18 유폭: 상대 맨 앞 유닛에게 피해 x. 그 유닛이 쓰러지면 남은 상대 유닛 전체에게 피해 splash { x, splash } */
  blast(X, caster, it, k, op) {
    const amp = C(it).type === "atk" ? amplify(X.P[caster]) : 0;
    const u = queueOf(X.P[1 - caster])[0]; if (!u) return;
    hurt(X, u, op.x + amp);
    if (u.t.alive) return;
    step(X, {}, 260);
    lg(X, `↳ 유폭 — 상대 유닛 전체에게 피해 ${op.splash + amp}`, "spell");
    for (const v of liveUnits(X.P[1 - caster])) hurt(X, v, op.splash + amp, "유폭");
  },
  /* v3.18 아군 유닛 방어의 합만큼 상대 맨 앞 유닛에게 피해. 쓰러뜨리고 남은 피해는 대기열의 다음 유닛에게 넘어간다 { mul } */
  sumDef(X, caster, it, k, op) {
    const n = liveUnits(X.P[caster]).reduce((s, u) => s + Math.max(0, u.t.d), 0) * (op.mul || 1);
    let x = n + (C(it).type === "atk" ? amplify(X.P[caster]) : 0);
    lg(X, `아군 방어의 합 → 피해 ${x}`, "sys");
    for (const u of queueOf(X.P[1 - caster])) {
      if (x <= 0) break;
      const need = hpLeft(u) + (u.t.ward && !u.t.wardUsed ? u.t.ward : 0);
      const blocked = u.t.shield === true;   // v3.57.5 보호막 코인(절반)은 멈추지 않는다 — 남은 피해가 들어가므로
      hurt(X, u, x, "강철");
      if (blocked || u.t.alive) break;   // 보호막에 막히거나 버티면 거기서 멈춘다
      x -= need; step(X, {}, 240);
    }
  },
  /* v3.18.2 아군 유닛 수에 비례한 강화: 대상마다 공격 +(아군 유닛 수 × a) { side, area, a } */
  rally(X, caster, it, k, op) {
    const n = liveUnits(X.P[caster]).length, x = n * (op.a || 1);
    lg(X, `아군 유닛 ${n}기 → 공격 +${x}`, "sys");
    if (!x) return;
    for (const u of pickTargets(X, caster, op.side || "ally", op.area || { t: "all" }, k)) addStat(X, u, "a", x);
  },
  /* v3.18.2 대상마다 공격 +(자기 남은 체력 ÷ div, 올림) { side, area, div } */
  hp2a(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "ally", op.area || { t: "all" }, k)) {
      const x = Math.ceil(Math.max(0, hpLeft(u)) / (op.div || 2));
      if (x > 0) addStat(X, u, "a", x);
    }
  },
  /* v3.18 결투: 아군 맨 앞 유닛 공격 +a. 그 뒤 그 유닛이 상대 유닛 중 공격이 가장 높은 1기를 먼저 치고(물리), 살아남으면 그 유닛이 되친다 { a } */
  duel(X, caster, it, k, op) {
    const me = queueOf(X.P[caster])[0], foe = pickTargets(X, caster, "foe", { t: "maxA", n: 1 }, k)[0];
    if (!me) { lg(X, "아군 유닛이 없어 결투가 열리지 않았다", "sys"); return; }
    if (op.a) addStat(X, me, "a", op.a);
    if (!foe) return;
    step(X, { act: me.uid, tgt: foe.uid }, 380);
    lg(X, `결투: ${C(me).name}(공 ${me.t.a}) → ${C(foe).name}(공 ${foe.t.a})`, "spell");
    const x1 = hit(me.t.a, foe.t.d);
    if (x1 > 0) hurt(X, foe, x1, "결투"); else fl(X, foe.uid, "막음", "miss");
    step(X, { act: me.uid, tgt: foe.uid, hit: true }, 420);
    if (!foe.t.alive || foe.t.rest) return;
    const x2 = hit(foe.t.a, me.t.d);
    if (x2 > 0) hurt(X, me, x2, "결투"); else fl(X, me.uid, "막음", "miss");
  },
  /* ---------- v3.20 스탯을 옮기고 맞바꾸는 마법 · 표시를 거는 마법 (js/pincards.js, docs/PINS_v3.20.md) ----------
     대상은 { side, area }(pickTargets). 체력은 "남은 체력"으로 읽고, 체력이 새 값이 되면 받은 피해는 지워진다(setStats).
     체력이 0이 되는 유닛은 쓰러진다. 고정된 스탯은 제자리에 남고(그 스탯이 내보내는 값은 그대로 옮겨 간다), 버팀 · 눌림은 기준값까지 */
  /* v3.62.1 방어 합을 공격으로 (철벽 진격 RS-B2-4): 아군 유닛 전체의 방어를 더한 값 S를, 아군 맨 앞(대기열 순서)부터 S, S−1, S−2 … 공격에 더한다.
     { step: 줄어드는 몫(기본 1) }. 0 이하가 되면 거기서 멈춘다. 방어가 음수인 유닛은 0으로 센다 */
  dsumA(X, caster, it, k, op) {
    const Q = queueOf(X.P[caster]), S = Q.reduce((s, u) => s + Math.max(0, u.t.d), 0), st = op.step || 1;
    Q.forEach((u, i) => { const v = S - i * st; if (v > 0) addStat(X, u, "a", v); });
  },
  /* 순환 { dir: 1 } 공격 → 방어 → 체력 → 공격 / { dir: -1 } 공격 → 체력 → 방어 → 공격 */
  rot(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "foe", op.area || { t: "front", n: 1 }, k)) {
      const a = u.t.a, d = u.t.d, h = hpLeft(u);
      setStats(X, u, op.dir === -1 ? { a: Math.max(0, d), d: h, h: a } : { a: h, d: a, h: d }, op.dir === -1 ? "역순환" : "순환");
    }
  },
  /* 두 스탯 맞바꾸기 { x: "a", y: "h" } */
  swapSt(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "foe", op.area || { t: "front", n: 1 }, k)) {
      if (op.gt && !(statNow(u, op.x) > statNow(u, op.y))) continue;   // gt: x가 y보다 클 때만 (물의 거울: 공격이 체력보다 높은 유닛)
      const nv = {}; nv[op.x] = statNow(u, op.y); nv[op.y] = statNow(u, op.x);
      if (nv.d != null) nv.d = nv.d; if (nv.a != null) nv.a = Math.max(0, nv.a);
      setStats(X, u, nv, STAT_KO[op.x][0] + STAT_KO[op.y][0] + " 교환");
    }
  },
  /* 이번 턴 표시를 건다 { st: ["a"], m: "L"|"U"|"D", v } — v가 있으면 그 값으로 바꾼 뒤(카드 · 아이템 표시가 막으면 거기까지) 지금 값에 건다.
     카드 · 아이템 표시와 겹치면 두 경계를 함께 지킨다(카드의 고정은 그대로 고정). 체력의 고정은 버팀으로 */
  pin(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "ally", op.area || { t: "front", n: 1 }, k)) {
      const sts = [].concat(op.st || ["a"]);
      u.t.floor = Object.assign({}, u.t.floor);
      for (const s of sts) {
        const m = s === "h" && op.m === "L" ? "U" : op.m;
        if (op.v != null && s !== "h" && !(s === "d" && u.t.lock)) { u.t[s] = op.v; applyFloor(u); }
        const nb = pinBound(m, u.t[s]), ob = u.t.floor[s];
        if (ob) { const lo = ob.lo != null ? (nb.lo != null ? Math.max(ob.lo, nb.lo) : ob.lo) : nb.lo, hi = ob.hi != null ? (nb.hi != null ? Math.min(ob.hi, nb.hi) : ob.hi) : nb.hi;
          nb.lo = lo; nb.hi = hi; nb.m = lo != null && lo === hi ? "L" : hi == null ? "U" : lo == null ? "D" : m; }
        nb.tmp = true; u.t.floor[s] = nb;
      }
      fl(X, u.uid, PIN_KO[op.m] + " " + sts.map(s => STAT_KO[s][0]).join("") + (op.v != null ? " " + op.v : ""), op.side === "foe" ? "debuff" : "shield");
    }
  },
  /* 역화: 대상이 자기 공격만큼 자기에게 피해 { phys } */
  selfHit(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "foe", op.area || { t: "maxA", n: 1 }, k)) {
      const x = Math.max(0, u.t.a), r = op.phys ? hit(x, u.t.d) : x;
      lg(X, `${C(u).name}이(가) 제 공격 ${x}에 맞는다`, "spell");
      if (r > 0) hurt(X, u, r, "역화"); else fl(X, u.uid, "막음", "miss");
    }
  },
  /* 아군 맨 앞 유닛과 상대 유닛 하나(area, 기본 맨 앞)의 스탯 맞바꾸기 { st: "a", area } */
  xchg(X, caster, it, k, op) {
    const me = op.mine ? pickTargets(X, caster, "ally", op.mine, k)[0] : queueOf(X.P[caster])[0], foe = pickTargets(X, caster, "foe", op.area || { t: "front", n: 1 }, k)[0], s = op.st || "a";
    if (!me || !foe) { lg(X, "맞바꿀 유닛이 없다", "sys"); return; }
    const vm = statNow(me, s), vf = statNow(foe, s);
    lg(X, `${C(me).name}의 ${STAT_KO[s]} ${vm} ↔ ${C(foe).name}의 ${STAT_KO[s]} ${vf}`, "spell");
    const a = {}, b = {}; a[s] = vf; b[s] = vm;
    setStats(X, me, a, "교환"); setStats(X, foe, b, "교환");
  },
  /* 무리의 분노: 대상 아군의 공격이 아군 가운데 가장 높은 공격보다 낮으면 그 값이 된다 { area } */
  matchA(X, caster, it, k, op) {
    const lead = liveUnits(X.P[caster]).sort((x, y) => y.t.a - x.t.a)[0]; if (!lead) return;
    for (const u of pickTargets(X, caster, "ally", op.area || { t: "back", n: 2 }, k)) if (u !== lead && u.t.a < lead.t.a) addStat(X, u, "a", lead.t.a - u.t.a);
  },
  /* 스탯 옮기기: from의 값(0 아래는 0)을 to에 더하고 from은 0 { from: "a", to: "h" } */
  move(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "ally", op.area || { t: "front", n: 1 }, k)) {
      const v = Math.max(0, statNow(u, op.from)); if (!v) continue;
      const nv = {}; nv[op.from] = 0; nv[op.to] = statNow(u, op.to) + v;
      if (op.to === "h") { u.t.h += v; delete nv.h; }   // 체력으로 옮길 때는 받은 피해를 지우지 않고 체력만 늘린다
      setStats(X, u, nv, STAT_KO[op.from][0] + "→" + STAT_KO[op.to][0]);
    }
  },
  /* 착취: 상대 대상의 공격을 x 깎고, 실제로 깎인 만큼 아군 맨 앞 유닛 공격 + { x, area } */
  drain(X, caster, it, k, op) {
    const me = queueOf(X.P[caster])[0];
    let got = 0;
    for (const u of pickTargets(X, caster, "foe", op.area || { t: "front", n: 1 }, k)) got += -addStat(X, u, "a", -op.x);
    if (me && got > 0) { step(X, {}, 240); addStat(X, me, "a", got); }
  },
  /* 질서: 대상들의 공격이 그 가운데 가장 낮은 공격과 같아진다 { side, area } */
  levelA(X, caster, it, k, op) {
    const T = pickTargets(X, caster, op.side || "foe", op.area || { t: "all" }, k); if (T.length < 2) return;
    const lo = Math.min(...T.map(u => u.t.a));
    lg(X, `가장 낮은 공격 ${lo}에 맞춘다`, "spell");
    for (const u of T) if (u.t.a > lo) addStat(X, u, "a", lo - u.t.a);
  },
  /* 평균: 공 · 방(0 아래는 0) · 남은 체력의 평균(내림)으로 셋 다 { side, area } */
  avg(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "foe", op.area || { t: "front", n: 1 }, k)) {
      const v = Math.floor((u.t.a + Math.max(0, u.t.d) + Math.max(0, hpLeft(u))) / 3);
      setStats(X, u, { a: v, d: v, h: v }, "평균");
    }
  },
  /* 본뜨기: 아군 맨 앞 n기의 공 · 방 · 체 가운데 상대 대상보다 낮은 것은 그 값이 된다 { n, area } */
  mimic(X, caster, it, k, op) {
    const src = pickTargets(X, caster, "foe", op.area || { t: "maxA", n: 1 }, k)[0];
    const mine = queueOf(X.P[caster]).slice(0, op.n || 1);
    if (!mine.length || !src) { lg(X, "본뜰 유닛이 없다", "sys"); return; }
    for (const me of mine) {
      const nv = {};
      for (const s of ["a", "d", "h"]) if (statNow(src, s) > statNow(me, s)) nv[s] = statNow(src, s);
      lg(X, `${C(me).name}이(가) ${C(src).name}을(를) 본뜬다`, "spell");
      if (Object.keys(nv).length) setStats(X, me, nv, "본뜨기"); else fl(X, me.uid, "그대로", "miss");
    }
  },
  /* [운명] 이번 턴 아군 코인: + 코인은 앞면, − 코인은 뒷면. 이미 던져 정해진 코인은 그대로 (v3.5.7) */
  fate(X, caster, it, k, op) {
    for (const u of liveUnits(X.P[caster])) { u.t.fate = true; fl(X, u.uid, "운명", "buff"); }
  },
  /* v3.32 [무효] (js/counterspells.js): 상대 전장에서 아직 발동하지 않은 마법 중 맨 앞 n장이 발동하지 않고 부서진다 { n }.
     공격 마법은 같은 때 발동할 수 있는 상대 마법보다 먼저 발동한다(runCombatCore fire의 atk → def 순서) — 1번 칸에 두면 전투가 시작되자마자,
     상대 1번 칸 방어 마법 · opening 마법보다도 먼저. 이미 발동한 마법은 겨누지 않고 다음 마법을 겨눈다.
     부서진 마법은 원래 주인의 소각장으로(빼앗긴 마법이면 처음 주인). 칸은 이 마법이 끝난 뒤 sweep이 당긴다 */
  negate(X, caster, it, k, op) {
    const o = X.P[1 - caster];
    const L = (X.pend || []).filter(q => q.p === o && q.it !== it).sort((a, b) => a.k - b.k).slice(0, op.n || 1);
    if (!L.length) { lg(X, `상대 전장에 무효로 할 마법이 없다`, "sys"); fl(X, it.uid, "무효 — 대상 없음", "miss"); return; }
    for (const q of L) {
      X.pend.splice(X.pend.indexOf(q), 1);
      step(X, { tgt: q.it.uid, shown: q.it.uid }, 620);   // 무효로 할 마법을 앞면으로 보이고 겨눔 표시
      fl(X, q.it.uid, "무효", "debuff");
      lg(X, `${C(it).name}: 상대 ${q.k}번 칸의 마법 ${C(q.it).name}을(를) 무효로 했다 — 발동하지 않고 부서진다`, "bad");
      const s = q.p.field.indexOf(q.it); if (s >= 0) q.p.field[s] = null;
      const bp = ownerOf(X, q.it, q.p); bp.burn.push(q.it.id); brokeCard(X, bp, q.it.id, "spell");
      step(X, { shatter: [q.it.uid], shown: q.it.uid }, 560);
      X.negated = (X.negated || 0) + 1;
    }
  }
};


/* ===================== v3.31 강화 특수능력 (유니크, js/uniques.js UNIQUE_ABIL) =====================
   유니크 유닛의 gift.u. 이 블록의 함수를 엔진 곳곳(hurt · pickTargets · castSpell · attackOne · runCombatCore의 sweep)이 부른다.
   - 턴이 지나도 남는 값은 유닛의 t.keep (resetTurn이 지우지 않음, 전투 기록 snap에 함께 실려 실제 카드로 돌아간다)
   - 핸드 · 덱으로 가는 카드(영혼 강탈 · 돌아오는 물결)는 전투 복제본의 p.gain · p.deckTop에 모았다가 game.js runCombat이 전투 뒤 실제 핸드 · 덱에 넣는다
   - 난수는 엔진의 flip()만 (실제 대전은 시드 난수라 두 기기 · 다시 굴리기에서 같다)
   - 컴퓨터의 수 읽기(simulate)도 같은 runCombatCore라 능력이 저절로 들어간다 */
const uK = u => (u.t.keep = u.t.keep || {});
const uHas = (u, key) => !!(u && isUnit(u) && u.t && u.t.alive && abilOf(u).u === key);
const uSideOf = (X, u) => X.P.find(p => p.field.includes(u));
const uLive = (p, key) => liveUnits(p).filter(u => abilOf(u).u === key);
const uTokName = id => (CARDS[id] ? CARDS[id].name : id);
/* 소환물(또는 되살린 카드)을 p의 빈 칸에 놓는다. after가 있으면 그 유닛 바로 다음 칸. 빈 칸이 없으면 부서짐. 놓은 유닛을 돌려준다 */
function uSpawn(X, p, id, after, keep, why, src) {   // src "burn": 소각장에서 꺼낸 카드 — 연출만 소각장에서 날아온다(fx.pyre)
  const at = landSlot(p, after || null);
  if (at < 0) { fizzle(X, p, id, after || null, 1, 1); return null; }
  const u = { uid: tokUid(X), id, item: null, summoned: X.turn };
  resetTurn(u); u.t.keep = keep || {};
  landAt(p, at, u); X.toks[u.uid] = id;
  fl(X, u.uid, why || "소환", "buff");
  lg(X, `${why ? "[" + why + "] " : ""}${C(u).name}(${C(u).a}/${C(u).d}/${C(u).h}) — ${p.name}의 ${at + 1}번 칸`, "good");
  step(X, src === "burn" ? { conjure: u.uid, pyre: p.idx } : { conjure: u.uid }, src === "burn" ? 800 : 650);
  return u;
}
/* [날개 그늘]: u가 쓰러질 피해를 받으면, 같은 편의 날개 유닛(턴마다 한 번)을 돌려준다 */
function uWings(X, u, x) {
  if (u.t.shield === true || u.t.endure) return null;
  const xh = u.t.shield === "half" ? x - Math.ceil(x / 2) : x;   // v3.57.5 보호막 코인(절반)을 거친 피해
  const left = hpLeft(u) - (u.t.ward && !u.t.wardUsed ? Math.max(0, xh - u.t.ward) : xh);
  if (left > 0) return null;
  const p = uSideOf(X, u); if (!p) return null;
  const w = uLive(p, "wings").find(v => v !== u && (uK(v).wingT !== X.turn || (uK(v).wingN || 0) < 2));
  if (!w) return null;
  if (uK(w).wingT !== X.turn) { uK(w).wingT = X.turn; uK(w).wingN = 0; }
  uK(w).wingN++;
  fl(X, u.uid, "날개 그늘", "shield");
  lg(X, `[날개 그늘] ${C(w).name}이(가) ${C(u).name} 대신 피해 ${x}를 받는다`, "good");
  return w;
}
/* [강철 사슬]: 바로 앞의 내 유닛이 받는 피해의 절반(올림)을 사슬 유닛이 대신 받는다. 짝에게 준 몫을 뺀 피해를 돌려준다 */
function uLinkSplit(X, u, x) {
  if (x < 2) return x;
  const p = uSideOf(X, u); if (!p) return x;
  const L = liveUnits(p), at = L.indexOf(u);
  let chain = null, mate = null;
  if (at >= 0 && uHas(L[at + 1], "link")) { chain = L[at + 1]; mate = u; }   // 바로 앞 유닛이 맞을 때 (v3.31 조정: 사슬 유닛 자신이 맞을 때는 나누지 않음)
  if (!chain || !mate) return x;
  const cs = Math.ceil(x / 2), ms = x - cs, other = chain, give = cs;
  if (give > 0) {
    other.t.dmg += give;
    fl(X, other.uid, "사슬 −" + give, "dmg");
    if (hpLeft(other) <= 0) { other.t.alive = false; lgDeath(X, other); }
  }
  lg(X, `[강철 사슬] 피해 ${x}를 ${C(chain).name} ${cs} · ${C(mate).name} ${ms}로 나눔`, "sys");
  return x - give;
}
/* [폭풍의 눈]: 상대 마법(castSpell 안, X.eyeCast)이 겨눈 내 유닛마다 코인 한 번 — 앞면이면 빗나감 */
function uEyeFilter(X, P, L) {
  if (!X.eyeCast || !L.length) return L;
  // [마력 흡수] 유닛은 상대 마법에 맞지 않는다
  L = L.filter(u => { if (!uHas(u, "absorb")) return true; if (!X.eyeCast["a" + u.uid]) { X.eyeCast["a" + u.uid] = 1; fl(X, u.uid, "흡수", "miss"); } return false; });
  if (!uLive(P, "eye").length) return L;
  return L.filter(u => {
    if (X.eyeCast[u.uid] == null) {
      X.eyeCast[u.uid] = flip();
      if (X.eyeCast[u.uid]) { fl(X, u.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] 마법이 ${C(u).name}을(를) 빗나갔다`, "good"); }
    }
    return !X.eyeCast[u.uid];
  });
}
/* [폭풍의 눈]: 상대의 사격 · 투척이 내 유닛을 겨누면 코인 — 앞면이면 빗나감 */
function uEyeDodge(X, P, u) {
  if (!uLive(P, "eye").length || !flip()) return false;
  fl(X, u.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] ${C(u).name}을(를) 겨눈 화살이 바람에 빗나갔다`, "good");
  return true;
}
/* 마법이 발동할 때: 내 [축전] 충전 +1, 상대 [마력 흡수] 마력 +1 */
function uOnCast(X, caster) {
  for (const u of uLive(X.P[caster], "charge")) { const k = uK(u); k.charge = Math.min(2, (k.charge || 0) + 1); fl(X, u.uid, "충전 " + k.charge, "buff"); }
  for (const u of uLive(X.P[1 - caster], "absorb")) { const k = uK(u); k.mana = Math.min(4, (k.mana || 0) + 1); fl(X, u.uid, "마력 " + k.mana, "buff"); }
}
/* 맞붙어 피해를 준 뒤(공격 · 반격): 불씨 · 낙인 표시, 쓰러뜨렸으면 누가 쓰러뜨렸는지 */
function uOnHit(X, src, tgt, got) {
  if (!src || !tgt) return;
  if (got > 0 && tgt.t.alive && !C(tgt).tok) {
    if (uHas(src, "ember") && uK(tgt).ember == null) { uK(tgt).ember = X.turn; fl(X, tgt.uid, "불씨", "debuff"); lg(X, `[불씨 전염] ${C(tgt).name}에 불씨가 붙었다 — 다음 전투부터 매 턴 피해 2`, "sys"); }
    if (uHas(src, "brand") && !uK(tgt).brand) { uK(tgt).brand = true; fl(X, tgt.uid, "낙인 · 유지비 +1", "debuff"); lg(X, `[계약의 낙인] ${C(tgt).name}의 유지비가 판이 끝날 때까지 1 늘었다`, "sys"); }
  }
  if (!tgt.t.alive && src.t.alive) tgt.t.killer = src.uid;
}
/* 쓰러진 유닛을 치우기 전에 */
function uPreSweep(X) {
  X.uAfter = X.uAfter || [];
  for (const p of X.P) for (const v of p.field) {
    if (!isUnit(v) || v.t.alive || v.t.uDone) continue;
    v.t.uDone = true;
    const o = X.P.find(q => q !== p);
    const killer = v.t.killer != null ? o.field.find(x => x && x.uid === v.t.killer) : null;
    // [세이렌의 노래]: 판에 한 번, 쓰러지지 않고 넘어온다
    if (killer && uHas(killer, "siren") && (uK(killer).sang || 0) < 1 && o.field.includes(null) && !C(v).tok) {
      uK(killer).sang = (uK(killer).sang || 0) + 1;
      v.t.alive = true; v.t.dmg = v.t.h - 1; v.t.killer = null; v.t.uDone = false; v.tokTemp = false;
      if (v.from == null) v.from = p.idx;
      p.field[p.field.indexOf(v)] = null;
      const xs = o.field.filter(Boolean); xs.push(v); o.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
      packField(p);
      fl(X, v.uid, "세이렌의 노래", "debuff");
      lg(X, `[세이렌의 노래] ${C(v).name}이(가) 쓰러지지 않고 ${o.name}의 편으로 넘어왔다 (체력 1, 판이 끝날 때까지)`, "good");
      step(X, {}, 600);
      continue;
    }
    if (killer && killer.t.alive) {
      // [전리품]
      if (uHas(killer, "loot") && !v.item && !C(v).tok) {
        const k = uK(killer); k.grow = k.grow || {}; if ((k.grow.a || 0) < 3) { k.grow.a = (k.grow.a || 0) + 1; killer.t.a += 1; fl(X, killer.uid, "전리품 ⚔+1", "buff"); lg(X, `[전리품] ${C(killer).name}의 공격이 판이 끝날 때까지 +1 (지금 +${k.grow.a})`, "good"); }
      }
      if (uHas(killer, "loot") && v.item) {
        const it = v.item; v.item = null;
        if (it.from == null) it.from = ownerOf(X, v, p).idx;
        const old = killer.item;
        if (!old || CARDS[it.id].lv > CARDS[old.id].lv) {
          if (old) { const op = old.from != null ? (X.P.find(q => q.idx === old.from) || o) : ownerOf(X, killer, o); op.burn.push(old.id); brokeCard(X, op, old.id, "item"); }
          const b0 = baseStats(killer, true); killer.item = it; const b1 = baseStats(killer, true);
          for (const k of ["a", "d", "h"]) if (b1[k] !== b0[k]) { killer.t[k] += b1[k] - b0[k]; killer.t.rb[k] = b1[k]; }
          killer.t.floor = floorOf(killer); applyFloor(killer);
          fl(X, killer.uid, "전리품 · " + CARDS[it.id].name, "buff");
          lg(X, `[전리품] ${C(killer).name}이(가) ${C(v).name}의 「${CARDS[it.id].name}」을(를) 빼앗아 장착했다`, "good");
        } else {
          const ip = X.P.find(q => q.idx === it.from) || p; ip.burn.push(it.id); brokeCard(X, ip, it.id, "item");
          lg(X, `[전리품] ${C(killer).name}은(는) 「${CARDS[it.id].name}」보다 지금 아이템이 높아 그대로 둔다`, "sys");
        }
      }
      // [영혼 강탈]: 판에 두 번
      if (uHas(killer, "soul") && !C(v).tok && (uK(killer).souls || 0) < 2) {
        uK(killer).souls = (uK(killer).souls || 0) + 1; v.t.soul = ownerOf(X, killer, o).idx;
        fl(X, v.uid, "영혼 강탈", "debuff");
      }
      // [늑대 무리]: 쓰러뜨릴 때마다
      if (uHas(killer, "wolves")) { X.uAfter.push({ p: o, id: "TK-U-WOLF", after: killer, keep: { expire: X.turn + 1 }, why: "늑대 무리" }); }
    }
    // [시한 화약] · [다시 자라는 뿌리]: 자기가 쓰러질 때
    const ab = abilOf(v).u;
    if (ab === "timebomb") X.uAfter.push({ p, id: "TK-U-BOMB", keep: { fuse: X.turn }, why: "시한 화약" });
    if (ab === "root" && !uK(v).rooted && v.t.soul == null) { v.t.rootNow = true; X.uAfter.push({ p, id: "TK-U-ROOT", keep: { born: X.turn, rev: v.id }, why: "다시 자라는 뿌리" }); }   // 카드는 뿌리에 남는다(소각장 아님), 뿌리가 부서지면 그때 소각장
    // [고철 골렘]: 내 유닛(소환물 빼고)이 쓰러질 때마다
    if (!C(v).tok) for (const s of uLive(p, "scrap")) { const k = uK(s); k.scrap = (k.scrap || 0) + 1; fl(X, s.uid, "고철 " + k.scrap, "buff"); }
    // [돌아오는 물결]: 판에 두 번
    if (!C(v).tok && v.t.soul == null && ownerOf(X, v, p) === p) {
      const t = uLive(p, "tide").find(x => x !== v && (uK(x).tide || 0) < 2);
      if (t) { uK(t).tide = (uK(t).tide || 0) + 1; v.t.toDeck = true; fl(X, v.uid, "돌아오는 물결", "heal"); }
    }
  }
}
/* 쓰러진 카드를 보낸다: 영혼 강탈 → 빼앗은 쪽 핸드, 돌아오는 물결 → 주인 덱 맨 위, 그 밖 → 주인 소각장 */
function uBury(X, v, p, bp) {
  if (v.t.soul != null) {
    const q = X.P.find(z => z.idx === v.t.soul) || bp;
    (q.gain = q.gain || []).push(v.id);
    lg(X, `[영혼 강탈] ${C(v).name} 카드가 ${q.name}의 핸드로 갔다`, "good");
    brokeCard(X, bp, v.id, "unit");
    return;
  }
  if (v.t.rootNow) return;   // [다시 자라는 뿌리]: 카드는 뿌리에 남는다
  if (v.t.toDeck) {
    (bp.deckTop = bp.deckTop || []).push(v.id);
    lg(X, `[돌아오는 물결] ${C(v).name}이(가) ${bp.name}의 덱 맨 위로 돌아갔다`, "good");
    return;
  }
  bp.burn.push(v.id); brokeCard(X, bp, v.id, "unit");
  X.died = X.died || {}; (X.died[bp.idx] = X.died[bp.idx] || []).push(v.id);
}
/* 치운 뒤: 모아 둔 소환(늑대 · 화약통 · 뿌리) */
function uPostSweep(X) {
  const L = X.uAfter || []; X.uAfter = [];
  for (const q of L) {
    const after = q.after && q.p.field.includes(q.after) && q.after.t.alive ? q.after : null;
    uSpawn(X, q.p, q.id, after, q.keep, q.why);
  }
  return L.length > 0;
}
/* v3.31.4 불붙은 화약통: 놓인 다음 턴, 전투 시작 때 발동하는 마법이 모두 발동한 뒤 · 첫 공격 전에 터진다 */
function uBombs(X, sweep) {
  let any = false;
  for (const p of X.P) {
    const o = X.P.find(q => q !== p);
    for (const u of p.field.slice()) {
      if (!isUnit(u) || !u.t.alive || u.id !== "TK-U-BOMB") continue;
      const k = uK(u);
      if (k.fuse == null || k.fuse >= X.turn) continue;
      step(X, { act: u.uid }, 400);
      const tg = queueOf(o).slice(0, 3);
      lg(X, `[시한 화약] 불붙은 화약통이 터졌다 → ${tg.map(x => C(x).name).join(" · ") || "맞은 유닛 없음"}`, "bad");
      for (const x of tg) hurt(X, x, 3, "화약");
      u.t.alive = false; any = true;
      step(X, { act: u.uid, hit: true }, 520);
    }
  }
  if (any) sweep();
  return any;
}
/* 전투가 시작될 때 */
function uCombatStart(X, sweep) {
  let any = false;
  for (const p of X.P) {
    const o = X.P.find(q => q !== p);
    for (const u of p.field.slice()) {
      if (!isUnit(u) || !u.t.alive) continue;
      const k = uK(u);
      // 뿌리: 다음 턴에 되살아남
      if (u.id === "TK-U-ROOT" && k.born != null && k.born < X.turn && k.rev && CARDS[k.rev]) {
        const s = p.field.indexOf(u);
        const nu = { uid: tokUid(X), id: k.rev, item: null, summoned: X.turn };
        resetTurn(nu); nu.t.keep = { rooted: true };
        p.field[s] = nu; X.toks[nu.uid] = k.rev;
        fl(X, nu.uid, "다시 자람", "heal");
        lg(X, `[다시 자라는 뿌리] ${C(nu).name}이(가) 뿌리에서 되살아났다`, "good");
        step(X, { conjure: nu.uid }, 650);
      }
      // [축전]: 충전 3
      if (abilOf(u).u === "charge" && (k.charge || 0) >= 2) {
        k.charge = 0;
        const tg = liveUnits(o);
        step(X, { act: u.uid }, 380);
        lg(X, `[축전] ${C(u).name}이(가) 모은 번개를 풀었다 → 상대 유닛 모두 피해 2`, "spell");
        for (const x of tg) hurt(X, x, 2, "축전");
        step(X, { act: u.uid, hit: true }, 520); any = true;
      }
    }
    // 불씨: 붙은 다음 턴에 탐
    for (const u of p.field.slice()) {
      if (!isUnit(u) || !u.t.alive) continue;
      const k = uK(u);
      if (k.ember != null && k.ember < X.turn) {
        lg(X, `[불씨 전염] ${C(u).name}의 불씨가 탄다 — 피해 2`, "bad");
        hurt(X, u, 2, "불씨"); any = true;
        if (!u.t.alive) {
          const nx = queueOf(p).find(x => x !== u && !C(x).tok && uK(x).ember == null);
          if (nx) { uK(nx).ember = X.turn; fl(X, nx.uid, "불씨 옮겨붙음", "debuff"); lg(X, `[불씨 전염] 불씨가 ${C(nx).name}에 옮겨 붙었다`, "sys"); }
        }
      }
    }
  }
  if (any) sweep();
}
/* 전투가 끝날 때 */
function uCombatEnd(X, sweep) {
  let any = false;
  for (const p of X.P) {
    // 잿빛 늑대: 부른 다음 턴 전투가 끝나면 흩어짐
    for (const u of p.field) if (isUnit(u) && u.t.alive && u.id === "TK-U-WOLF" && (uK(u).expire || 0) <= X.turn) { u.t.alive = false; lg(X, "잿빛 늑대가 초원으로 돌아갔다", "sys"); any = true; }
    // [고철 골렘]
    for (const s of uLive(p, "scrap")) { const k = uK(s); while ((k.scrap || 0) >= 4) { k.scrap -= 4; if (!uSpawn(X, p, "TK-U-SCRAP", s, {}, "고철 골렘")) break; } }
    // [씨앗]: 자라기 → 심기
    for (const s of uLive(p, "seed")) {
      for (const u of p.field.slice()) if (isUnit(u) && u.t.alive && u.id === "TK-U-SAPLING" && uK(u).seed === s.uid && uK(u).born < X.turn) {
        const i = p.field.indexOf(u), nu = { uid: tokUid(X), id: "TK-U-TREE", item: null, summoned: X.turn };
        resetTurn(nu); p.field[i] = nu; X.toks[nu.uid] = nu.id;
        fl(X, nu.uid, "자람", "buff"); lg(X, `[씨앗] 묘목이 어린 고목으로 자랐다`, "good"); step(X, { conjure: nu.uid }, 600);
      }
      const n = p.field.filter(u => isUnit(u) && u.t.alive && u.id === "TK-U-SAPLING" && uK(u).seed === s.uid).length;
      if (n < 2) uSpawn(X, p, "TK-U-SAPLING", s, { seed: s.uid, born: X.turn }, "씨앗");
    }
    // [새벽의 부활]: 판에 두 번
    for (const s of uLive(p, "dawn")) {
      const k = uK(s); if ((k.dawn || 0) >= 2) continue;
      const pool = ((X.died || {})[p.idx] || []).filter(id => CARDS[id] && CARDS[id].lv < C(s).lv && p.burn.lastIndexOf(id) >= 0);
      if (!pool.length || !p.field.includes(null)) continue;
      const id = pool.slice().sort((a, b) => CARDS[b].lv - CARDS[a].lv)[0];
      p.burn.splice(p.burn.lastIndexOf(id), 1);
      X.died[p.idx].splice(X.died[p.idx].indexOf(id), 1);
      k.dawn = (k.dawn || 0) + 1;
      uSpawn(X, p, id, null, {}, "새벽의 부활", "burn");
    }
  }
  if (any) sweep();
}
/* game.js가 쓰는 것: 낙인으로 늘어난 유지비 */
const uUpkeepOf = it => (C(it).up || 0) + (it.t && it.t.keep && it.t.keep.brand ? 1 : 0);

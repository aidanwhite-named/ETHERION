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
function abilOf(it) {
  const im = itemOf(it) || {}, g = (it && C(it).gift) || {};
  const num = k => (+im[k] || 0) + (+g[k] || 0), any = k => !!(im[k] || g[k]);
  const amp = o => (o.evName && /^증폭/.test(o.evName) ? parseInt(o.evName.replace(/\D/g, "")) || 0 : 0);
  return { shield: any("shield"), ward: num("ward"), thorns: num("thorns"), shred: any("shred"), crit: any("crit"), ranged: any("ranged"),
    magic: (im.magic === true || g.magic === true) ? true : num("magic"),
    snipe: (im.every ? +im.throw || 0 : 0) + (g.every ? +g.throw || 0 : 0), amp: amp(im) + amp(g) };
}
const isUnit = it => it && C(it).type === "unit";
const isSpell = it => it && !isUnit(it);
const hit = (a, d) => (a > d ? a - d : 0);
/* 난수: 기본은 Math.random. 실제 대전에서는 시드를 준 난수를 써서, 코인 뒤집기 뒤에 같은 전투를 다시 굴려도
   그 지점까지는 똑같이 흘러가게 한다 (ctx.rng). */
let RNG = Math.random;
/* 판 규칙 (원정의 용): defAll 방어 +N, hpAll 체력 +N, coinMul 코인 값 배수. 양쪽 모두에게 */
let CRULES = {};
function setCombatRules(r) { CRULES = r || {}; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const flip = () => RNG() < RULES.coinP;
function resetRng() { RNG = Math.random; }

/* 코인 굴리기: [스탯, 개수, 값] → [{st, v, heads}] */
function rollCoins(co) {
  const out = [];
  for (const [st, n, v] of co || []) for (let i = 0; i < n; i++) out.push({ st, v, heads: flip() });
  return out;
}

/* 유닛의 이번 턴 기본값 (코인·아이템 반영, 마법 효과 전). clean = 코인을 모두 뒷면으로 본 값 */
function printedStats(it) {
  const c = C(it), im = itemOf(it);
  if (im && im.set) return { a: im.set.a, d: im.set.d, h: im.set.h };
  const s = { a: c.a + (im ? im.a || 0 : 0), d: c.d + (im ? im.d || 0 : 0), h: c.h + (im ? im.h || 0 : 0) };
  // v1.4: 카드 한 장에 남는 스탯 변화 (핸드에 걸린 저주 등). 카드에 적힌 고정 스탯(4*)은 깎이지 않는다
  if (it.mod) for (const k in it.mod) if (!(it.mod[k] < 0 && c.lock && c.lock[k])) s[k] += it.mod[k];
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
  const fl = floorOf(it);
  for (const k in fl) s[k] = Math.max(s[k], fl[k]);
  s.h = Math.max(1, s.h);
  return s;
}
/* [고정: 스탯]: 카드·아이템에 적힌 값 아래로 내려가지 않는다. [고정 공/방/체]는 셋 다 */
function floorOf(it) {
  const im = itemOf(it), c = C(it);
  const lock = Object.assign({}, c.lock || {}, im ? (im.set ? { a: 1, d: 1, h: 1 } : im.lock || {}) : {});
  if (!Object.keys(lock).length) return {};
  const pr = printedStats(it), out = {};
  for (const k in lock) out[k] = pr[k];
  return out;
}
function applyFloor(u) { const f = u.t.floor; for (const k in f) if (u.t[k] < f[k]) u.t[k] = f[k]; }

/* 턴이 시작될 때: 피해 회복, 마법 효과 해제, 보호막 코인.
   코인은 여기서 던지지 않는다 — 유닛끼리 맞붙을 때 던진다(clashCoins). 그 전까지는 적힌 값 그대로.
   v3.5.6: 방어하는 쪽 유닛은 한 전투에서 코인이 한 번 정해지면 그 전투가 끝날 때까지 다시 던지지 않는다.
   v3.5.7: 한 번 정해진 코인은 마법(코인 뒷면 · 운명)으로도 바뀌지 않는다 */
function resetTurn(it) {
  const b = baseStats(it, true), ab = abilOf(it);
  it.t = { a: b.a, d: b.d, h: b.h, rb: b, floor: floorOf(it), dmg: 0, alive: true,
    shield: !!(ab.shield && flip()), ward: ab.ward, wardUsed: false,
    thorns: ab.thorns, taunt: false, lock: false, rest: false, thrown: false,
    cb: { a: 0, d: 0, h: 0 }, coins: coinDefs(it), noCoin: false };
}
const hpLeft = u => u.t.h - u.t.dmg;

/* ---------- 코인: 유닛과 유닛이 맞붙을 때 던진다 (방어 쪽은 전투마다 한 번, X.defFix) ----------
   coinDefs: 이 유닛이 가진 코인(카드 코인 + 아이템 코인). heads가 null이면 아직 던지지 않은 것 */
const COIN_MAX = 5;
function coinDefs(it) {
  const c = C(it), im = itemOf(it), out = [];
  if (!(im && im.set)) for (const [st, n, v] of c.co || []) for (let i = 0; i < n; i++) out.push({ st, v, heads: null, src: "u" });
  if (it.item) for (const [st, n, v] of CARDS[it.item.id].co || []) for (let i = 0; i < n; i++) out.push({ st, v, heads: null, src: "i" });
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
  u.t.a = Math.max(0, u.t.a + delta.a);
  if (u.t.lock) delta.d = 0; else u.t.d += delta.d;
  // v1.4: 코인으로 체력이 0 이하가 되면 쓰러진다 (카드가 부서져 소각 더미로)
  u.t.h = u.t.h + delta.h;
  u.t.cb = nb; u.t.coins = coins;
  applyFloor(u);
  if (u.t.alive && hpLeft(u) <= 0) { u.t.alive = false; u.t.coinDeath = true; }
  return delta;
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
      face[k.g] = heads;
    }
    // v2.4.4 앞면 확률 p: 보통 RULES.coinP(50%). 코인 뒷면 마법은 −50%라 0%, [운명]은 + 동전 100% · − 동전 0%
    const p = u.t.noCoin ? 0 : u.t.fate ? (sum[k.g] > 0 ? 1 : 0) : RULES.coinP;
    return { st: k.st, v: k.v, src: k.src, g: k.g, heads: face[k.g], p, clean: !!u.t.noCoin, fate: !!u.t.fate && !u.t.noCoin };
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
  RNG = opts.seed != null ? mulberry32(opts.seed) : Math.random;
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

function hurt(X, u, x, tag) {
  if (!u.t.alive || x <= 0) return 0;
  if (u.t.shield) { u.t.shield = false; fl(X, u.uid, "보호막", "shield"); lg(X, `[보호막] ${C(u).name}이(가) 피해를 막았다`, "good"); return 0; }
  if (u.t.ward && !u.t.wardUsed) {
    u.t.wardUsed = true; const r = Math.min(x, u.t.ward); x -= r;
    if (x <= 0) { fl(X, u.uid, "가호", "shield"); return 0; }
  }
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
    if (area.t === "back") L = L.filter(u => { const c = colOf(P, u); return c > k && c <= k + area.n; });
    else if (area.t === "front") L = queueOf(P).slice(0, area.n);
    else if (area.t === "maxA") L = L.slice().sort((x, y) => y.t.a - x.t.a || C(y).lv - C(x).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);
    else if (area.t === "minH") L = L.slice().sort((x, y) => hpLeft(x) - hpLeft(y) || C(x).lv - C(y).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);   // v3.11 남은 체력이 가장 낮은 n기
    else if (area.t === "behind") L =L.filter(u => colOf(P, u) > k).sort((x, y) => colOf(P, x) - colOf(P, y)).slice(0, 1);
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
  for (const op of ops) {
    if (SPELL_OPS[op.op]) { SPELL_OPS[op.op](X, caster, it, k, op); continue; }
    if (op.op === "copy") {
      const src = pickTargets(X, caster, "ally", { t: "behind" }, k)[0];
      if (!src) { lg(X, "바로 뒤에 아군 유닛이 없어 효과가 없다", "sys"); continue; }
      const sa = src.t.a, sd = src.t.d, sh = src.t.h;
      for (const u of pickTargets(X, caster, op.side || "both", { t: "all" }, k)) {
        u.t.a = sa; if (!u.t.lock) u.t.d = sd; u.t.h = sh; applyFloor(u);
        if (hpLeft(u) <= 0) u.t.alive = false;
        fl(X, u.uid, `${sa}/${sd}/${sh}`, "buff");
      }
      continue;
    }
    const T = pickTargets(X, caster, op.side, op.area, k);
    const x = coinX(op, faces.get(op)) + (op.op === "dmg" && op.side === "foe" ? amp : 0);
    for (const u of T) {
      switch (op.op) {
        case "dmg": if (op.phys) { const r = hit(x, u.t.d); if (r > 0) hurt(X, u, r, "물리"); else fl(X, u.uid, "막음", "miss"); } else hurt(X, u, x); break;
        case "mod": {
          let ma = op.a || 0, md = op.d || 0, mh = op.h || 0;
          if (op.coin) { const cx = x - (op.x || 0); if (op.cs === "d") md += cx; else if (op.cs === "h") mh += cx; else ma += cx; }
          if (ma) u.t.a = Math.max(0, u.t.a + ma);
          if (md && !u.t.lock) u.t.d += md;
          if (mh) u.t.h += mh;
          applyFloor(u);
          if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
          const tx = [ma ? "⚔" + sgnNum(ma) : "", md && !u.t.lock ? "⛨" + sgnNum(md) : "", mh ? "♥" + sgnNum(mh) : ""].filter(Boolean).join(" ");
          if (tx) fl(X, u.uid, tx, ma < 0 || md < 0 || mh < 0 ? "debuff" : "buff");
          break; }
        case "atk0": if (!op.coin || x > 0) { u.t.a = Math.max(0, u.t.floor.a || 0); fl(X, u.uid, "공격 0", "debuff"); } break;
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
        case "def0": if (!u.t.lock) { u.t.d = Math.max(0, u.t.floor.d || 0); fl(X, u.uid, "방어 0", "debuff"); } else fl(X, u.uid, "저주 면역", "miss"); break;
        case "d2a": { const v = Math.max(0, u.t.d); if (v) { u.t.a += v; fl(X, u.uid, "⚔+" + v, "buff"); } break; }
        case "endure": u.t.endure = true; fl(X, u.uid, "불굴", "shield"); break;
        case "pierce": u.t.pierce = true; fl(X, u.uid, "꿰뚫기", "buff"); break;
        case "rage": {   // 체력을 1로, 깎인 만큼 공격 + (이번 턴 · 받은 피해처럼 턴이 끝나면 돌아온다)
          const cut = hpLeft(u) - 1;
          if (cut > 0) { u.t.dmg += cut; u.t.a += cut; fl(X, u.uid, "♥1 ⚔+" + cut, "buff"); }
          break; }
      }
    }
  }
}

/* 투척·사격의 대상: 이 피해로 쓰러뜨릴 수 있는 유닛 중 레벨이 가장 높은 유닛, 없으면 대기열 맨 앞 */
function throwTarget(D, n, foes) {
  const kill = foes.filter(f => !f.t.shield && hpLeft(f) <= n - (f.t.wardUsed ? 0 : f.t.ward)).sort((a, b) => C(b).lv - C(a).lv)[0];
  return kill || queueOf(D).find(f => foes.includes(f));
}
/* [사격]: 공격 턴마다 맞붙기 전에 상대 유닛 하나에게 방어 무시 피해.
   v1.6.2: [투척]은 여기서 빠지고, 그 유닛이 공격을 시작할 때 함께 던진다 (attackOne) */
function throwPhase(X) {
  const A = X.P[X.ai], D = X.P[1 - X.ai];
  // v3.12.4 사격이 상대 유닛을 모두 쓰러뜨리면 X.sniped: 이번 전투에서는 직접 공격(생명 피해)을 하지 않는다 (attackOne)
  const had = liveUnits(D).length > 0;
  try { throwOnce(X, A, D); } finally { if (had && !liveUnits(D).length) X.sniped = true; }
}
function throwOnce(X, A, D) {
  for (const u of liveUnits(A)) {
    const sn = abilOf(u).snipe; if (!sn || u.t.rest) continue;
    const foes = liveUnits(D); if (!foes.length) return;
    const tg = throwTarget(D, sn, foes);
    fl(X, tg.uid, "◎ " + C(tg).name, "aim");   // v3.9.11 겨눌 때 대상 이름을 카드 위에 띄운다 (맞고 부서져 칸이 당겨져도 무엇을 맞혔는지 보이게)
    step(X, { act: u.uid, tgt: tg.uid, sn: 1 }, 380);   // sn: 화면이 [사격] 소리를 고르는 표시 (규칙과 무관)
    lg(X, `${C(u).name}의 [사격 ${sn}] → ${C(tg).name}`);
    hurt(X, tg, sn, "사격");
    step(X, { act: u.uid, tgt: tg.uid, hit: true, sn: 1 }, 520);
  }
}

function attackOne(X, Au) {
  const A = X.P[X.ai], D = X.P[1 - X.ai];
  const Du = queueOf(D)[0];
  const ca = C(Au);
  if (!Du && X.sniped) {
    // v3.12.4 이번 전투의 상대는 유닛이었는데 [사격]에 모두 쓰러졌다 → 공격할 대상이 없을 뿐, 생명을 치지 않는다
    lg(X, `${ca.name}: 맞설 유닛이 [사격]에 모두 쓰러져 공격할 대상이 없다`, "sys");
    fl(X, Au.uid, "대상 없음", "miss");
    step(X, {}, 300);
    return;
  }
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
  // v1.6.2 [투척]: 장착한 그 턴, 이 유닛이 공격을 시작할 때 함께 던진다.
  // 맞선 유닛 말고 다른 상대 유닛이 있으면 그 유닛에게 동시에, 맞선 유닛뿐이면 그 유닛에게 투척 피해 → 공격 피해 순서로 두 번
  let thr = null;
  if (im && im.throw && !im.every && Au.item.equipped === X.turn && !Au.t.thrown) {
    Au.t.thrown = true;
    const others = liveUnits(D).filter(f => f !== Du);
    thr = others.length ? throwTarget(D, im.throw, others) : Du;
  }
  step(X, thr ? { act: Au.uid, tgt: Du.uid, thr: thr.uid } : { act: Au.uid, tgt: Du.uid }, 380);
  if (thr) {
    hurt(X, thr, im.throw, "투척");
    lg(X, `${ca.name}의 [투척 ${im.throw}] → ${C(thr).name}${thr === Du ? " (맞선 유닛뿐이라 함께 맞힘)" : ""}`);
  }
  let dd = Du.t.d;
  if (ab.magic) dd = dd > 0 ? Math.max(0, dd - (ab.magic === true ? 99 : ab.magic)) : dd;
  let dealt = hit(Au.t.a, dd), crit = false, got = 0;
  if (!Du.t.alive) lg(X, `${cd.name}이(가) 투척에 쓰러져 공격은 빗나갔다`, "sys");
  else {
    got = dealt > 0 ? hurt(X, Du, dealt) : (fl(X, Du.uid, "0", "miss"), 0);
    // v3.9.6 [치명]: 코인 없이, 피해가 들어갔고(보호막 · 가호에 다 막히지 않음) 상대가 살아 있으면 남은 체력을 1로.
    // 원래 피해로 쓰러지면 그대로 쓰러진다. 예전에는 코인 앞면이면 피해 2배라 공격이 큰 유닛에게 너무 셌다
    if (ab.crit && got > 0 && Du.t.alive && hpLeft(Du) > 1) { const cut = hpLeft(Du) - 1; Du.t.dmg += cut; got += cut; crit = true; fl(X, Du.uid, "치명 ♥1", "dmg big"); }
    if (ab.shred && Du.t.d > 0) { const red = Math.min(Au.t.a, Du.t.d); Du.t.d -= red; applyFloor(Du); if (red) fl(X, Du.uid, "관통 ⛨−" + red, "debuff"); }
    lg(X, `${ca.name}(공 ${Au.t.a}) → ${cd.name}(방 ${dd}): 피해 ${got}${crit ? " (치명)" : ""}`);
    if (behind && behind.t.alive) {
      const pr = hit(Au.t.a, behind.t.d);
      lg(X, `[꿰뚫기] ${ca.name}의 공격이 ${C(behind).name}까지 꿰뚫었다 (공 ${Au.t.a} → 방 ${behind.t.d})`);
      if (pr > 0) hurt(X, behind, pr, "꿰뚫기"); else fl(X, behind.uid, "막음", "miss");
    }
    if (Du.t.thorns && Au.t.alive) { const t = hurt(X, Au, Du.t.thorns, "가시"); if (t) lg(X, `[가시] ${ca.name} 피해 ${t}`); }
  }
  step(X, thr ? { act: Au.uid, tgt: Du.uid, hit: true, thr: thr.uid } : { act: Au.uid, tgt: Du.uid, hit: true }, 520);
  if (Du.t.alive && Au.t.alive && !Du.t.rest) {
    if (ab.ranged) { lg(X, `[원거리] ${ca.name}은(는) 반격을 받지 않는다`, "sys"); return; }
    const back = hit(Du.t.a, Au.t.d);
    const g = back > 0 ? hurt(X, Au, back, "반격") : (fl(X, Au.uid, "반격 0", "miss"), 0);
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
  // v1.9: 누구든 생명이 0 이하가 되는 순간 전투(와 경기)는 그 자리에서 끝난다. 남은 공격·마법은 하지 않는다
  const dead = () => X.P.some(p => p.life <= 0);
  const ready = q => q.who === "atk"
    ? A.field.every((u, i) => !isUnit(u) || i + 1 >= q.k || acted.has(u) || !u.t.alive)
    : !D.field.some((u, i) => isUnit(u) && u.t.alive && i + 1 < q.k);
  // 부서진 카드 치우고 좌측 정렬. 치운 게 있으면 한 수로 기록한다
  const sweep = (extraUids, dur) => {
    const gone = extraUids ? extraUids.slice() : [];
    for (const p of X.P) {
      p.field.forEach((it, s) => { if (isUnit(it) && !it.t.alive) { gone.push(it.uid); p.field[s] = null; const bp = ownerOf(X, it, p); if (!C(it).tok) { bp.burn.push(it.id); brokeCard(X, bp, it.id, "unit"); } if (it.item) { bp.burn.push(it.item.id); brokeCard(X, bp, it.item.id, "item"); } } });
      const xs = p.field.filter(Boolean);
      p.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    }
    for (const q of pend) q.k = q.p.field.indexOf(q.it) + 1;
    if (gone.length) step(X, { shatter: gone }, dur || 520);
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
  fire(false);
  if (!dead()) { throwPhase(X); sweep(); }
  // v1.4: 공격 순서를 그때그때 다시 읽는다 — 마법이 부른 유닛도 차례가 오면 공격한다
  for (;;) {
    if (dead()) break;
    const Au = A.field.find(u => isUnit(u) && u.t.alive && !acted.has(u));
    if (!Au) break;
    acted.add(Au);
    if (!Au.t.rest) { attackOne(X, Au); sweep(); }
    fire(false);
  }
  if (dead()) { lg(X, "생명이 다해 전투가 그 자리에서 끝났다", "bad"); step(X, {}, 300); return X.direct; }
  fire(true);
  sweep();
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
   소환 없이 전장 위에서 바로 쏘는 효과(echo: 메테오의 화염탄 등)는 칸과 상관없다. */
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
const SPELL_OPS = {
  /* 무작위 대상에게 n번: { side, n, x, phys } */
  multi(X, caster, it, k, op) {
    for (let i = 0; i < op.n; i++) {
      const L = sideUnits(X, caster, op.side || "foe"); if (!L.length) break;
      const u = L[Math.floor(RNG() * L.length)], r = dmgOf(u, op.x, op.phys);
      if (r > 0) hurt(X, u, r, op.phys ? "물리" : ""); else fl(X, u.uid, "막음", "miss");
      step(X, {}, 260);
    }
  },
  /* 상대 대기열 맨 앞부터 차례로: { xs: [3, 2, 1], phys } */
  chain(X, caster, it, k, op) {
    const Q = queueOf(X.P[1 - caster]);
    op.xs.forEach((v, i) => { const u = Q[i]; if (!u || !u.t.alive) return; const r = dmgOf(u, v, op.phys); if (r > 0) hurt(X, u, r, "연쇄"); step(X, {}, 240); });
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
    u.t.taunt = true; if (op.d && !u.t.lock) u.t.d += op.d;
    fl(X, u.uid, "수호" + (op.d ? " ⛨+" + op.d : ""), "shield");
  },
  /* v3.11 아군 유닛 수 × per 만큼 상대 유닛 전체에게 피해: { per, side } */
  perAlly(X, caster, it, k, op) {
    const n = liveUnits(X.P[caster]).length, x = n * (op.per || 1) + (C(it).type === "atk" ? amplify(X.P[caster]) : 0);
    lg(X, `아군 유닛 ${n}기 × ${op.per || 1} → 피해 ${x}`, "sys");
    if (!x) return;
    for (const u of sideUnits(X, caster, op.side || "foe")) hurt(X, u, x);
  },
  /* v3.11 빼앗기: 아군 맨 앞 유닛과 같은 칸 번호에 놓인 상대 카드를 이 마법의 칸으로 가져온다.
     유닛이면 이번 턴 내 유닛이 되고(공격 턴이면 아직 공격하지 않은 그 유닛이 내 차례에 공격한다), 전투가 끝나면 흩어져 원래 주인의 소각장으로 간다.
     뒷면 마법이면 내 마법으로 발동한다(쓴 뒤 원래 주인의 소각장으로) */
  steal(X, caster, it, k, op) {
    const p = X.P[caster], o = X.P[1 - caster];
    const front = p.field.find(u => isUnit(u) && u.t && u.t.alive);
    if (!front) { lg(X, "아군 유닛이 없어 빼앗을 칸을 정하지 못했다", "sys"); return; }
    const col = p.field.indexOf(front), tg = o.field[col];
    if (!tg || (isUnit(tg) && !(tg.t && tg.t.alive))) { lg(X, `상대 ${col + 1}번 칸이 비어 빼앗을 카드가 없다`, "sys"); return; }
    let s = it.echo ? -1 : p.field.indexOf(it);
    if (s < 0) s = p.field.indexOf(null);
    if (s < 0) { lg(X, "내 전장에 놓을 칸이 없어 빼앗지 못했다", "bad"); return; }
    o.field[col] = null;
    p.field[s] = tg;
    tg.from = o.idx;
    if (isUnit(tg)) { tg.tokTemp = true; if (tg.t) tg.t.stolen = true; }   // 빼앗은 유닛은 이번 턴만 내 편 — 전투가 끝나면 흩어져 원래 주인의 소각장으로
    if (isSpell(tg) && X.pend) {
      const q = X.pend.find(z => z.it === tg);
      if (q) { q.p = p; q.who = p === X.A ? "atk" : "def"; q.k = s + 1; }
    }
    fl(X, tg.uid, "빼앗김", "debuff");
    lg(X, `${p.name}이(가) 상대 ${col + 1}번 칸의 ${isSpell(tg) ? "마법 " : ""}${C(tg).name}을(를) 빼앗아 왔다`, "good");
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
  /* [운명] 이번 턴 아군 코인: + 코인은 앞면, − 코인은 뒷면. 이미 던져 정해진 코인은 그대로 (v3.5.7) */
  fate(X, caster, it, k, op) {
    for (const u of liveUnits(X.P[caster])) { u.t.fate = true; fl(X, u.uid, "운명", "buff"); }
  }
};

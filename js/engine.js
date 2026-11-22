/* ETHERION — 전투 엔진 (화면과 분리된 순수 계산)
   규칙 출처
   - 전투·마법 발동 순서: 마법 카드 시뮬레이터의 resolve/cast (문서 07 마법 v0.3)
       마법도 대기열의 한 자리. 앞에 유닛이 없어지는 순간 발동한다.
       공격 마법: 앞 칸의 공격 유닛이 모두 공격을 마치면 / 방어 마법: 앞 칸의 방어 유닛이 모두 쓰러지면
       끝까지 막히면 유닛 전투가 끝난 뒤 발동. 같은 때면 공격 마법 → 방어 마법 → 공격 마법 … 번갈아(2026-11-16), 같은 쪽이면 칸 번호 순
   - 아이템 능력: 아이템 카드 시뮬레이터 (문서 07 아이템 v0.1)
   - 직접 공격: 피해는 모두 생명에서. 맞은 쪽은 다음 턴 에테르 +1 (일시, 한 턴에 한 번)
   - 유닛: 코인은 소환할 때 한 번 던진다. 받은 피해는 턴이 끝나면 회복 (문서 06)
   이 파일은 실제 대전과 컴퓨터의 수 읽기(시뮬레이션)에 같이 쓰인다. */
"use strict";

const C = it => CARDS[(it.t && it.t.look) || it.id];   // v3.90 t.look: 이번 턴만 다른 카드가 된 유닛(구원의 빛 → 작은 성상). 이름 · 레벨 · 그림 · 능력이 그 카드를 따른다. 소각장 · 주인 셈은 it.id 그대로
const itemOf = it => (it && it.item ? CARDS[it.item.id].item : null);
/* v2.9 전투 능력 = 장착 아이템 능력 + 스페셜 유닛의 타고난 능력(gift). 수치는 더하고, 있음/없음은 하나만 있어도 된다.
   [사격]은 snipe, [증폭]은 amp로 모은다. [투척](장착한 턴 한 번)은 아이템에만 있으므로 itemOf로 따로 본다 */
/* v3.18 능력 합치기: 수치는 더하고(마력 공격 전부 = true는 그대로), 있음/없음은 하나만 있어도 */
function mergeAbil(a, b) {
  const o = Object.assign({}, a);
  for (const k in b) { const v = b[k]; if (v === true || o[k] === true) o[k] = true; else if (typeof v === "number") o[k] = (+o[k] || 0) + v; else if (v) o[k] = v; }
  return o;
}
/* v3.65.2 능력 끄기(효과 strip): 맞은 유닛의 t.off에 꺼진 능력 이름을 모은다(이번 턴만, resetTurn이 지움).
   op.abs가 없으면 STRIP_DEF(파문과 같은 넷). 끈 능력은 abilOf에서도 0이 되고, 화면은 같은 이름의 칩을 감춘다(js/view.js chipOff).
   [가호]는 기본 목록에 없다 — 끄려면 마법의 op.abs에 적는다. 새 마법도 op.abs로 끄는 능력을 고르고, 글에 그 이름을 적는다 */
const STRIP_DEF = ["보호막", "가시", "저주 면역", "수호"];
const ABIL_KEY = { "보호막": "shield", "가시": "thorns", "가호": "ward", "관통": "shred", "치명": "crit", "연쇄": "chain", "원거리": "ranged",
  "방어무시": "magic", "마력 공격": "arcane", "치유": "heal", "바다의 보호": "calm", "사격": "snipe", "증폭": "amp", "강탈": "rob", "흡혈": "leech", "그림자 걸음": "veil", "피의 계약": "pact", "출혈": "bleed", "점화": "ignite", "화염 갑주": "farmor",
  "재생": "regen", "방패 반격": "bash", "수호": "taunt", "정화": "purify", "굳건": "firm", "매혹": "mesmer", "전도": "conduct", "감전": "shock",
  "불꽃 사냥": "huntfire", "되받기": "riposte", "과부하": "overload", "포식": "devour", "뿌리 흡수": "drain", "밀물": "flow", "심판": "judge", "경계의 화살": "sentry", "표식": "mark" };   // v3.81 스페셜 아이템 능력 (이 파일 끝 "v3.81 스페셜 아이템 능력" 절)   // v3.74 새 능력 (js/newabil.js, 이 파일 끝 "v3.74 새 능력" 절)
function abilOf(it) {
  const ab = abilRaw(it), off = it && it.t && it.t.off;
  if (off) for (const n of off) { const k = ABIL_KEY[n]; if (k) ab[k] = typeof ab[k] === "number" ? 0 : false; }
  return ab;
}
function abilRaw(it) {
  const im = itemKept(it) || {}, g0 = (it && C(it).gift) || {};   // v3.84 아이템은 남은 능력 칸만큼만(itemKept)
  // v3.18 마법이 이번 턴 걸어 준 능력(t.gx, 효과 grant)은 타고난 능력과 같은 자리에서 더한다. 턴이 바뀌면 resetTurn이 지운다
  const gx = it && it.t && it.t.gx, g = gx ? mergeAbil(g0, gx) : g0;
  const num = k => (+im[k] || 0) + (+g[k] || 0), any = k => !!(im[k] || g[k]);
  const amp = o => (o.evName && /^증폭/.test(o.evName) ? parseInt(o.evName.replace(/\D/g, "")) || 0 : 0);
  const au = (it && it.t && it.t.au) || {};   // v3.69 레어 오라가 준 몫(rareAuraSync가 t.au에 적음). 가호 · 가시 · 스탯은 t에 바로 더했으므로 여기서는 사격 · 증폭 · 방어무시 · 흡혈만
  return { shield: any("shield"), ward: num("ward"), thorns: num("thorns"), shred: any("shred"), crit: any("crit"), chain: any("chain"), ranged: any("ranged"),
    magic: any("magic") || !!au.magic, aura: num("aura"),   // 2026-11-16 [방어무시]는 수치 없이 방어를 전부 무시한다(데이터의 magic 수치는 있음/없음으로만 본다)
    arcane: num("arcane"), heal: num("heal"), calm: num("calm"),
    ignite: num("ignite"), farmor: num("farmor"), shock: num("shock"), conduct: any("conduct"),   // 2026-11-22 케라운 [감전 N] · [전도] (이 파일 끝 "케라운 [전도] · [감전]" 절)
    regen: num("regen"), bash: any("bash"), taunt: any("taunt"), purify: any("purify"), firm: any("firm"), mesmer: any("mesmer"),
    huntfire: any("huntfire"), riposte: any("riposte"), overload: any("overload"), devour: any("devour"), drain: any("drain"), flow: any("flow"), judge: any("judge"), sentry: any("sentry"), mark: any("mark"),   // v3.81 스페셜 아이템 능력   // v3.74 [재생 N] · [방패 반격] · [수호] · [정화] · [굳건] · [요격] — js/newabil.js, 이 파일 끝 "v3.74 새 능력" 절   // v3.73 잿불 고블린: [점화 N] · [화염 갑주 N] — js/goblin.js, 이 파일 끝 "v3.73 잿불 고블린" 절
    // v3.68 푸른비늘 인어: [마력 공격 N] · [치유 N] · [바다의 보호 N](오라) — js/mermaid.js, 이 파일 끝 "v3.68 인어" 절
    snipe: (im.every ? +im.throw || 0 : 0) + (g.every ? +g.throw || 0 : 0) + (au.snipe || 0), amp: amp(im) + amp(g) + (au.amp || 0) + (gx ? +gx.amp || 0 : 0), u: g0.u || null,   /* v3.95 노움: 증폭 회로가 이번 턴 건 [증폭 N](t.gx.amp) */
    rob: abOn("rob") && any("rob"), leech: abOn("leech") && (any("leech") || !!au.leech), veil: abOn("veil") && any("veil"), pact: abOn("pact") ? num("pact") : 0, bleed: abOn("bleed") ? num("bleed") : 0 };   // v3.65 심연 마족: [강탈] · [흡혈] · [그림자 걸음] · [피의 계약 N] (아래 "v3.65 심연 마족")   // v3.31 u: 유니크의 강화 특수능력 (js/uniques.js, 아래 "v3.31 강화 특수능력")
}
/* v3.84 유닛 특수능력 상한 (규칙 글은 js/cards.js ABIL_CAP): 장착 아이템 데이터에서 잘린 능력 키를 지운 사본(붙는 능력만).
   유닛 카드 + 아이템 카드 짝마다 한 번 만들어 둔다(카드 데이터는 판 동안 바뀌지 않음). 잘린 능력이 없으면 아이템 데이터 그대로 */
const IM_KEPT = new Map();
function itemKept(it) {
  const im = itemOf(it); if (!im) return null;
  const key = it.id + "|" + it.item.id;
  let o = IM_KEPT.get(key); if (o) return o;
  const cut = typeof unitAbilSlots === "function" ? unitAbilSlots(C(it), im).cut : [];
  o = im;
  if (cut.length) {
    o = Object.assign({}, im);
    for (const sl of cut) { delete o[sl.k]; if (sl.k === "throw") delete o.every; if (sl.k === "aura") delete o.auraG; if (sl.k === "evName") delete o.evText; }
  }
  IM_KEPT.set(key, o);
  return o;
}
/* v3.84 같은 능력은 합치지 않는다 — 칸마다 따로 발동한다. abilPieces(it, k) = 그 능력의 칸별 수치 [유닛, 아이템, 마법(✦), 오라(◎)] (0은 빼고).
   abilOf가 주는 합계(꺼진 능력 · 끄기 반영)를 넘지 않게 fitPieces로 맞춘다. 칸이 하나면 예전과 똑같이 한 번에 발동한다 */
const PIECE_MS = 460, WARD_MS = 300;   // 칸마다 차례로 보일 때 한 칸의 박자(ms): 사격 · 가시 다음 칸 / 가호 한 칸
const PIECE_VAL = { snipe: o => (o && o.every ? +o.throw || 0 : 0) };
function fitPieces(list, tot) {
  const out = []; let left = tot > 0 ? tot : 0;
  for (const v of list) { if (left <= 0) break; const x = Math.min(v, left); if (x > 0) { out.push(x); left -= x; } }
  if (left > 0) out.push(left);   // 마법 · 오라가 t에 바로 더한 몫(가호 · 가시)은 한 칸으로
  return out;
}
function abilPieceList(it, k) {
  const val = PIECE_VAL[k] || (o => (o ? +o[k] || 0 : 0)), t = it.t || {};
  const out = [val(C(it).gift), val(itemKept(it)), val(t.gx)];
  if (k === "snipe" && t.au) out.push(+t.au.snipe || 0);
  return out.filter(v => v > 0);
}
function abilPieces(it, k, tot) {
  if (tot == null) tot = abilOf(it)[k];
  return tot > 0 ? fitPieces(abilPieceList(it, k), tot) : [];
}
const isUnit = it => it && C(it).type === "unit";
const isSpell = it => it && !isUnit(it);
const hit = (a, d) => { if (a < 0) a = 0; return a > d ? a - d : 0; };   // v3.66 공격이 0 아래여도 피해는 0 밑으로 가지 않는다(공 0과 같게 친다)
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
  if (it.t) { it.t.gx = null; it.t.off = null; it.t.look = null; }   // v3.90 바뀐 모습(t.look)도 이번 턴만 · v3.65.2 꺼진 능력(t.off)도 이번 턴만 · v3.18 지난 턴 마법이 걸어 준 능력은 남지 않는다
  const b = baseStats(it, true), ab = abilOf(it);
  if (keep.grow) for (const k in keep.grow) b[k] += keep.grow[k];   // v3.31 [전리품]으로 판 동안 자란 스탯
  // v3.61.1 [보호막 코인]은 여기(턴 시작 · 장착)서 던지지 않는다 — 전투가 시작될 때 던진다(shieldCoinsAtCombat). 준비하는 동안은 보호막 없음
  it.t = { a: b.a, d: b.d, h: b.h, rb: b, floor: floorOf(it), dmg: 0, alive: true,
    shield: false, sroll: null, ward: ab.ward, wardUsed: false, wardP: abilPieceList(it, "ward"), thornsP: abilPieceList(it, "thorns"),   // v3.84 칸별 가호 · 가시(쓸 때 fitPieces로 t.ward · t.thorns에 맞춘다)
    thorns: ab.thorns, taunt: !!ab.taunt, lock: false, rest: false, thrown: false,
    cb: { a: 0, d: 0, h: 0 }, coins: coinDefs(it), noCoin: false, keep };
  if (keep.blood && keep.blood.v) it.t.a += g1BloodSum(it);
  if (keep.shock && keep.shock.n > 0) { it.t.a = Math.max(0, it.t.a - keep.shock.n); clampPins(it.t, it.t.floor); }   // 2026-11-22 [감전 N]: 지난 턴 감전된 유닛은 이번 턴 공격 −N (kzShockEnd가 지움)
  if (it.hc) a1HandCurseIn(it);   // v3.95 핸드에서 걸린 [저주](손끝 저주 · 저주 전염)가 전장에 오른 유닛에 옮는다   // v3.87 [피의 맹세]: 지난 턴 받은 피 → 이번 턴 공격 + (전투가 끝나면 g1OathEnd가 지운다)
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
  u.t.a = u.t.a + delta.a;   // v3.66 공격은 0 아래(−)로도 내려간다(피해는 hit이 0으로 막음)
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
  rareAuraSync(X);   // v3.69 마법이 부른 유닛 · 걸어 준 [치명]도 바로 오라에 들어가게
  if (!X.rec) return;
  /* 2026-11-16 서순이 보이게: 이 수에서 새로 켜지거나 커진 레어 오라(X.auraFx, rareAuraSync → auraNote)는 이 수의 그림에서 빼 두고
     (수치 · ◎ 칩이 아직 오르지 않은 모습), 이 수를 기록한 바로 다음에 "오라 ⚔+2" 수를 따로 남긴다 — 마법이 [치명]을 걸면
     발동(✦ 치명) → 마법 카드가 부서짐 → 오라 +2 차례로 보인다. 마법이 발동하는 동안(공개 · 코인 · 효과 수, castSpell 안)은 미뤄
     그 마법 카드가 부서지는 수 뒤에 보인다. 판 상태 · 셈은 예전과 같고(셈은 위에서 이미 끝남) 기록만 하나 는다 */
  const pend = X.auraFx && X.auraFx.length ? X.auraFx : null;
  if (!pend) { recPush(X, fx, dur, null); return; }
  const now = !X.casting && !fx.reveal && !fx.spell && !fx.spellCoin;
  const live = new Set(); for (const p of X.P) for (const it of p.field) if (isUnit(it) && it.t && it.t.alive) live.add(it.uid);
  const show = now ? pend.filter(n => live.has(n.uid) && Object.keys(n.d).length) : [];
  recPush(X, fx, dur, now && !show.length ? null : pend);   // 보일 글자가 없으면 빼 두지 않는다(마지막 수가 늘 참값이 되게 — 화면은 마지막 그림을 판에 쓴다)
  if (!now) return;
  X.auraFx = [];
  if (!show.length) return;
  for (const n of show) fl(X, n.uid, auraFloatText(n.d), "aura");
  lg(X, show.map(n => `◎ ${n.by.map(b => `[${b.nm}]`).filter((x, i, a) => a.indexOf(x) === i).join(" ") || "오라"} → ${n.name} ${auraFloatText(n.d).replace(/^오라 ?/, "")}`).join(" · "), "good");
  const src = []; for (const n of show) for (const b of n.by) if (!src.includes(b.u)) src.push(b.u);
  recPush(X, { aura: show.map(n => n.uid), auraSrc: src }, 620, null);
}
/* 기록 한 수(step의 몸통). sub: 아직 보이지 않을 오라 몫 — 그 유닛 그림에서 t 차이를 빼고 t.au를 앞 값으로 */
function recPush(X, fx, dur, sub) {
  const units = {};
  for (const p of X.P) for (const it of p.field) if (it && it.t) units[it.uid] = JSON.parse(JSON.stringify(it.t));
  if (sub) for (const n of sub) { const t = units[n.uid]; if (!t) continue; for (const k in n.tv) t[k] -= n.tv[k]; t.au = n.prev ? JSON.parse(JSON.stringify(n.prev)) : null; }
  X.rec.push({ fx: Object.assign({}, fx), dur: dur || 450, floats: X.floats, logs: X.logs.concat(X.deaths),
    snap: { players: X.P.map(p => ({ field: p.field.map(i => (i ? i.uid : null)), life: p.life, crystals: p.crystals.slice(), burn: p.burn.slice(), reload: p.reload, bonus: p.bonus || 0, light: p.light })), units, toks: Object.assign({}, X.toks) } });
  X.floats = []; X.logs = []; X.deaths = [];
}

/* v3.62.1 피해를 막은 글자(보호막 · 보호막 코인 · 가호)는 cls "shield block" — 보호막을 얻은 글자("shield")와 갈라,
   마법 연출(js/spellfx.js cast)이 공격을 대상까지 날려 보내고 막는 모습을 보이게 한다 */
function hurt(X, u, x, tag) {
  if (!u.t.alive || x <= 0) return 0;
  if (X.castBy != null && X.P[1 - X.castBy].field.includes(u)) u.t.zap = true;   // 2026-11-22 [전도]: 이번 턴 상대 마법에 맞음(막혔어도)
  { const w = uWings(X, u, x); if (w) return hurt(X, w, x, "대신"); }   // v3.31 [날개 그늘]
  { const cm = mrCalm(X, u); if (cm) { x -= cm; if (x <= 0) { fl(X, u.uid, "바다의 보호", "shield block"); return 0; } } }   // v3.68 [바다의 보호] 오라: 받는 피해 −1(맞붙음 · 마법 모두)
  if (u.t.shield === "half") {   // v3.57.5 [보호막 코인] 앞면: 처음 받는 피해의 절반(올림)을 막는다. 남은 피해는 가호 · 사슬을 거쳐 그대로 들어간다
    u.t.shield = false; const b = Math.ceil(x / 2); x -= b; a2Blk(X, u, b);   // v3.77 [응보의 빛]이 세는 막은 피해
    fl(X, u.uid, "보호막 −" + b, "shield block"); lg(X, `[보호막 코인] ${C(u).name}이(가) 피해 ${b}를 막았다`, "good");
    if (x <= 0) return 0;
  } else if (u.t.shield) { u.t.shield = false; a2Blk(X, u, x); fl(X, u.uid, "보호막", "shield block"); lg(X, `[보호막] ${C(u).name}이(가) 피해를 막았다`, "good"); return 0; }
  if (u.t.ward && !u.t.wardUsed) {
    u.t.wardUsed = true;
    const ps = fitPieces(u.t.wardP || [], u.t.ward);
    if (ps.length > 1) {   // v3.84 가호 여러 칸: 첫 [가호]가 줄이고 사라지면 곧바로 다음 [가호]가 남은 피해를 또 줄인다(합과 같은 값, 연출은 칸마다)
      for (const n of ps) { if (x <= 0) break; const r = Math.min(x, n); x -= r; a2Blk(X, u, r); fl(X, u.uid, "가호 −" + r, "shield block"); step(X, { tgt: u.uid }, WARD_MS); }
      if (x <= 0) return 0;
    } else {
      const r = Math.min(x, u.t.ward); x -= r; a2Blk(X, u, r);
      if (x <= 0) { fl(X, u.uid, "가호", "shield block"); return 0; }
    }
  }
  x = uLinkSplit(X, u, x);   // v3.31 [강철 사슬]: 짝에게 나눠 준 몫을 뺀 피해
  if (x <= 0) return 0;
  a2WoundLight(X, u, Math.min(x, hpLeft(u)));   // 2026-11-22 [성흔]: 아군 유닛이 실제로 잃은 체력만큼 새벽빛
  u.t.dmg += x;
  fl(X, u.uid, (tag ? tag + " " : "") + "−" + x, "dmg");
  // v3.11 [불굴]: 이번 턴 쓰러질 피해를 처음 받으면 체력 1로 버틴다 (한 번)
  if (hpLeft(u) <= 0 && u.t.endure) { u.t.endure = false; u.t.dmg = u.t.h - 1; fl(X, u.uid, "불굴 ♥1", "shield"); lg(X, `[불굴] ${C(u).name}이(가) 체력 1로 버텼다`, "good"); return x; }
  if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
  return x;
}

/* 대기열: [수호] 먼저, 그다음 칸 번호 순.
   2026-11-22(사용자): [수호]는 상대의 공격 · 상대 마법에만 듣는다 — 내 마법이 "아군 맨 앞 N기"를 고를 때는 [수호]를 무시하고 칸 순서(liveUnits)로 고른다 */
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
    else if (area.t === "front") L = (P === theirs ? queueOf(P) : L).slice(0, area.n);   // 아군 쪽은 칸 순서([수호] 무시)
    else if (area.t === "maxA") L = L.slice().sort((x, y) => y.t.a - x.t.a || C(y).lv - C(x).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);
    else if (area.t === "minA") L = L.slice().sort((x, y) => x.t.a - y.t.a || C(x).lv - C(y).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);   // v3.20 공격이 가장 낮은 n기
    else if (area.t === "minH") L = L.slice().sort((x, y) => hpLeft(x) - hpLeft(y) || C(x).lv - C(y).lv || colOf(P, x) - colOf(P, y)).slice(0, area.n);   // v3.11 남은 체력이 가장 낮은 n기
    else if (area.t === "behind") L =L.filter(u => colOf(P, u) > k).sort((x, y) => colOf(P, x) - colOf(P, y)).slice(0, 1);
    if (P === theirs) L = uEyeFilter(X, P, L);   // v3.31 [폭풍의 눈]: 상대 마법이 겨눈 내 유닛이 코인 앞면이면 빗나감
    if (P === theirs && X.offerNow && X.offerNow.p === caster) for (const u of L) abMark(X, u);   // 2026-11-17 [제물] 증표
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
const GRANT_KO = { crit: "치명", chain: "연쇄", shred: "관통", ranged: "원거리", magic: "방어무시", arcane: "마력 공격", heal: "치유", rob: "강탈", leech: "흡혈", veil: "그림자 걸음", pact: "피의 계약", bleed: "출혈", ignite: "점화", farmor: "화염 갑주", regen: "재생", bash: "방패 반격", taunt: "수호", purify: "정화", firm: "굳건", conduct: "전도", shock: "감전", amp: "증폭" };   // v3.95 amp: 증폭 회로
function grantLabel(op) {
  const xs = Object.keys(op.ab || {}).map(k => (GRANT_KO[k] || k) + ((k === "heal" || k === "arcane" || k === "amp") && typeof op.ab[k] === "number" ? " " + op.ab[k] : ""));   // v3.78 [치유 N] · [마력 공격 N]은 수치까지
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
/* [증폭 N]: 이 유닛이 전장에 있으면 내 마법이 상대 유닛에게 주는 피해 +N (맞는 유닛마다).
   v3.72 번개 노움 대표 능력: 공격 마법만이 아니라 공용 · 방어 마법의 피해도 받는다(핸드 마법은 빼고). js/gnome.js */
const AMP_KINDS = { atk: 1, any: 1, def: 1 };   // CARDS의 type: 공격 atk · 공용 any · 방어 def (핸드 hand는 뺌)
const ampKind = c => !!(c && AMP_KINDS[c.type]);
function amplify(p) { return liveUnits(p).reduce((s, u) => s + abilOf(u).amp, 0); }
/* 2026-11-22(사용자) [증폭] 몫은 물리: 먼저 맞는 유닛의 방어를 그만큼 깎고(이번 턴 — resetTurn이 되돌림, [저주 면역] · 고정 방어는 안 깎임)
   방어를 넘긴 만큼만 피해에 더한다. 마법의 기본 피해는 그대로(방어 무시 마법은 방어 무시, 물리 마법은 깎인 방어를 거침).
   물리 마법은 (기본 + 증폭) − 방어와 같은 값이 나오고 방어만 더 깎인다. ampHit = 더할 피해, spellDmg = 기본 + 증폭을 합친 피해 */
function ampHit(X, u, amp) {
  if (!(amp > 0)) return 0;
  const d = Math.max(0, u.t.d), cut = Math.min(amp, d);
  if (cut && !u.t.lock) {
    u.t.d -= cut; applyFloor(u);
    const real = d - Math.max(0, u.t.d);
    if (real) fl(X, u.uid, "증폭 ⛨−" + real, "debuff");
  }
  return amp - cut;
}
function spellDmg(X, u, x, amp, phys) { const left = ampHit(X, u, amp); return (phys ? hit(x, u.t.d) : x) + left; }

function castSpell(X, caster, it, k) {
  X.casting = (X.casting || 0) + 1;   // 2026-11-16 마법이 발동하는 동안 새 오라 연출은 미룬다(step)
  const prevOffer = X.offerNow; X.offerNow = null;   // 2026-11-17 [제물] 증표: 이 마법이 겨눈 상대 유닛 (abOfferOpen · pickTargets · abOfferClose)
  const prevBy = X.castBy; X.castBy = caster;   // 2026-11-22 [전도]: 이 마법이 피해를 겨눈 상대 유닛에 표시(hurt → t.zap)
  const hp0 = nwHpMark(X);   // 2026-11-22 [재생]: 이 마법으로 체력이 깎인 유닛은 바로 다음 맞붙음의 재생을 쉰다(nwRegenHold)
  try { return castSpellCore(X, caster, it, k); } finally { X.casting--; X.castBy = prevBy; abOfferClose(X, caster); X.offerNow = prevOffer; nwRegenHold(hp0); }
}
function castSpellCore(X, caster, it, k) {
  const c = C(it), p = X.P[caster], o = X.P[1 - caster];
  X.eyeCast = {}; uOnCast(X, caster, it);   // v3.31 [폭풍의 눈] 이번 마법에서 정한 빗나감 · [축전] · [마력 흡수]
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
  if (c.cost.life) { p.life -= c.cost.life; fl(X, "life" + p.idx, "제물 −" + c.cost.life, "dmg"); abPaid(X, caster, c.cost.life); abOfferOpen(X, caster, c.cost.life, c.name); }   // v3.65 [제물]: 이번 턴 바친 생명 · [피의 계약]
  if (c.cost.ether) { p.reload += c.cost.ether; lg(X, `[장전 ${c.cost.ether}] ${p.name}의 다음 턴 에테르 −${c.cost.ether}`, "sys"); }
  if (c.gain.life) { const b = p.life; p.life = Math.min(RULES.lifeCap, p.life + c.gain.life); if (p.life > b) fl(X, "life" + p.idx, "+" + (p.life - b), "heal"); }
  const amp = ampKind(c) ? amplify(p) : 0;
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
    const x = coinX(op, faces.get(op)), ax = op.op === "dmg" && op.side === "foe" ? amp : 0;
    for (const u of T) {
      switch (op.op) {
        case "dmg": { const r = spellDmg(X, u, x, ax, op.phys); if (op.phys) { if (r > 0) hurt(X, u, r, "물리"); else fl(X, u.uid, "막음", "miss"); } else hurt(X, u, r); break; }
        case "mod": {
          let ma = op.a || 0, md = op.d || 0, mh = op.h || 0;
          if (op.coin) { const cx = x - (op.x || 0); if (op.cs === "d") md += cx; else if (op.cs === "h") mh += cx; else ma += cx; }
          const b0 = { a: u.t.a, d: u.t.d, h: u.t.h };
          if (ma) u.t.a = u.t.a + ma;
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
        case "swap": if (!u.t.lock) { const t = u.t.a; u.t.a = Math.max(0, u.t.d); u.t.d = t; applyFloor(u); fl(X, u.uid, "공방 교환", "debuff"); if (op.side === "foe") mrCharm(X, u); } break;   // v3.78 환상에 걸린 상대는 [홀림]
        case "shield": if (!op.coin || x > 0) { u.t.shield = true; fl(X, u.uid, "보호막", "shield"); } break;
        case "thorns": u.t.thorns += x; fl(X, u.uid, "가시 +" + x, "buff"); break;
        case "taunt": u.t.taunt = true; break;
        case "lock": { u.t.lock = true; if (u.t.d < u.t.rb.d) u.t.d = u.t.rb.d; const cw = a1CurseWash(u); fl(X, u.uid, cw.length ? "저주 면역 · " + cw.join(" · ") + " 사라짐" : "저주 면역", "shield"); break; }   // v3.95 [저주 면역]은 걸려 있던 [저주]도 지운다
        case "destroy": if (!op.coin || x > 0) { u.t.alive = false; u.t.dmg = u.t.h; fl(X, u.uid, "파괴", "dmg big"); lg(X, `${C(u).name} 파괴`, "bad"); } break;
        case "clean": {
          // 코인을 모두 뒷면으로: 이 턴에 던지는 코인은 앞면이 나오지 않는다.
          // v3.5.7 이미 던져 정해진 코인은 마법으로 바뀌지 않는다 (예전에는 앞면 몫을 빼고 뒷면으로 돌렸다)
          if ((u.t.coins || []).some(c => c.heads != null)) { fl(X, u.uid, "코인 고정", "miss"); break; }
          u.t.noCoin = true;
          fl(X, u.uid, "코인 뒷면", "debuff"); if (op.side === "foe") mrCharm(X, u); break; }   // v3.78 코인이 뒷면이 된 상대는 [홀림]
        case "rest": if (nwFirmVs(X, caster, u)) break; u.t.rest = true; fl(X, u.uid, "행동 불가", "debuff"); break;   // v3.74 [굳건]은 상대의 행동 불가를 받지 않는다
        case "strip": {   // v3.65.2 끄는 능력은 op.abs(없으면 STRIP_DEF) — 위 abilOf 설명
          const abs = op.abs || STRIP_DEF; u.t.off = Array.from(new Set((u.t.off || []).concat(abs)));
          if (abs.includes("보호막")) u.t.shield = false;
          if (abs.includes("가시")) u.t.thorns = 0;
          if (abs.includes("가호")) u.t.ward = 0;
          if (abs.includes("저주 면역")) u.t.lock = false;
          if (abs.includes("수호")) u.t.taunt = false;
          fl(X, u.uid, "강화 해제", "debuff"); break; }
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
  const neg0 = X.negated || 0;   // v3.68 ifNeg: 이 마법의 [무효]가 상대 마법을 부쉈을 때만 내는 효과 (씻김의 노래)
  ops.forEach((op, i) => { if (op.ifNeg && !((X.negated || 0) > neg0)) return; castOp(op); pinPass(X); if (i < ops.length - 1) opBeat(X, it); });
}
/* 2026-11-22 (사용자) 효과가 여럿인 마법은 효과 하나가 끝날 때마다 화면 기록을 한 수 끊는다 — 철골 해머처럼 아군 방어 +1이 보인 다음에 상대 체력이 깎이게.
   기록(recPush)만 남기고 step처럼 오라를 다시 세지 않으므로 판 셈은 예전과 같다. 띄울 글자가 없으면 끊지 않는다 */
const OP_BEAT_MS = 650;
function opBeat(X, it) {
  if (!X.rec || !X.floats.length) return;
  recPush(X, { spell: it.id, shown: it.uid }, OP_BEAT_MS, X.auraFx && X.auraFx.length ? X.auraFx : null);
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
  // v3.84 같은 능력은 칸마다 따로: [사격 1] [사격 1]은 두 발 — 발마다 대상을 새로 고르고(첫 발에 쓰러지면 다음 유닛), [폭풍의 눈] · [표식]도 발마다
  const ps = abilPieces(u, "snipe", sn);
  ps.forEach((n, i) => {
    const foes = liveUnits(D); if (!foes.length || !u.t.alive) return;
    const tg = snipeTarget(D, foes);
    fl(X, tg.uid, "◎ " + C(tg).name, "aim");   // v3.9.11 겨눌 때 대상 이름을 카드 위에 띄운다 (맞고 부서져 칸이 당겨져도 무엇을 맞혔는지 보이게)
    step(X, { act: u.uid, tgt: tg.uid, sn: 1 }, i ? 300 : 380);   // sn: 화면이 [사격] 소리를 고르는 표시 (규칙과 무관). 둘째 발부터 조금 짧게
    lg(X, `${C(u).name}의 [사격 ${n}] → ${C(tg).name}`);
    if (!uEyeDodge(X, D, tg)) { hurt(X, tg, n, "사격"); spMark(X, u, tg); }   // v3.31 [폭풍의 눈] · v3.81 [표식]
    if (!tg.t.alive) tg.t.killer = u.uid;   // v3.65 [강탈]: 사격으로 쓰러뜨려도
    step(X, { act: u.uid, tgt: tg.uid, hit: true, sn: 1 }, i < ps.length - 1 ? PIECE_MS : 520);
  });
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
    X.dhit = X.dhit || [0, 0];
    const first = !X.dhit[D.idx];   // v3.65 한 턴에 한 번. [강탈]이 쌓은 다음 턴 에테르(bonus)에 더한다
    if (first) { X.dhit[D.idx] = 1; D.bonus = (D.bonus || 0) + 1; }
    if (first) fl(X, "crys" + D.idx, "다음 턴 에테르 +1", "heal");
    lg(X, `${ca.name}의 직접 공격 ${dmg} → ${D.name} 생명 −${dmg}${first ? ` · ${D.name}의 다음 턴 에테르 +1` : ""}`, "bad");
    step(X, { act: Au.uid, tgt: "life" + D.idx, hit: true }, 560);
    return;
  }
  const cd = C(Du), im = itemKept(Au), ab = abilOf(Au);   // v3.84 투척도 능력 칸 안에 들 때만
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
    else if (td > 0) { hurt(X, thr, td, "투척"); if (!thr.t.alive) thr.t.killer = Au.uid; }
    else fl(X, thr.uid, "투척 막음", "miss");
  }
  if (ab.mesmer) mrCharm(X, Du);   // v3.80 [매혹](노래 에픽 마렌시아의 비늘): 맞붙는 상대를 이번 턴 [홀림]으로 — 이 맞붙음의 [마력 공격]부터 셈
  let dd = Du.t.d;
  if (ab.magic) dd = 0;   // 2026-11-16 [방어무시]: 공격할 때 상대 방어를 전부 무시한다
  const arc = mrArc(Au.t.a, ab.arcane > 0 ? Du.t.d : dd, ab.arcane, Du.t.charm);   // v3.95 [마력 공격 N]: 공격 + 상대 방어(N까지) · v3.78 [홀림] 상대면 방어 전부
  let dealt = arc.dmg + spHunt(X, Au, Du) + kzConduct(X, Au, Du), crit = false, got = 0;   // v3.81 [불꽃 사냥]
  const blocked = ab.arcane > 0 && Au.t.a > 0 ? 0 : Math.min(Math.max(0, Au.t.a), Math.max(0, dd));   // v3.95 [마력 공격]은 방어에 막히지 않는다   // v3.81 [되받기]: 상대 방어가 막아 낸 몫
  X.clash = [Au, Du];   // v3.68 [치유]: 이 맞붙음에서 살아남은 쪽이 체력을 채운다(runCombatCore가 attackOne 뒤에)
  if (dealt > 0 && Du.t.alive && uEyeTry(X, Du)) { dealt = 0; fl(X, Du.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] ${ca.name}의 공격이 바람에 빗나갔다`, "good"); }   // v3.31
  dealt = abVeil(X, Au, Du, dealt);   // v3.65 [그림자 걸음]
  let thSplit = false;   // v3.84 가시가 여러 칸이면 맞붙은 피해를 먼저 보이고 가시를 칸마다 차례로
  if (!Du.t.alive) lg(X, `${cd.name}이(가) 투척에 쓰러져 공격은 빗나갔다`, "sys");
  else {
    const hpBefore = hpLeft(Du);
    got = dealt > 0 ? hurt(X, Du, dealt) : (fl(X, Du.uid, "0", "miss"), 0);
    abLeech(X, Au, got, hpBefore);   // v3.65 [흡혈]: 맞붙어 준 피해의 절반(올림) · 2026-11-17 맞선 앞 유닛이 맞기 전 체력까지만(연쇄 · 꿰뚫기 몫은 세지 않음)
    // v3.9.6 [치명]: 코인 없이, 피해가 들어갔고(보호막 · 가호에 다 막히지 않음) 상대가 살아 있으면 남은 체력을 1로.
    // 원래 피해로 쓰러지면 그대로 쓰러진다. 예전에는 코인 앞면이면 피해 2배라 공격이 큰 유닛에게 너무 셌다
    if (ab.crit && got > 0 && Du.t.alive && hpLeft(Du) > 1) { const cut = hpLeft(Du) - 1; Du.t.dmg += cut; got += cut; crit = true; fl(X, Du.uid, "치명 ♥1", "dmg big"); }
    if (ab.shred && Du.t.d > 0 && Au.t.a > 0) { const red = Math.min(Au.t.a, Du.t.d); Du.t.d -= red; applyFloor(Du); if (red) fl(X, Du.uid, "관통 ⛨−" + red, "debuff"); }
    lg(X, `${ca.name}(공 ${Au.t.a}) → ${cd.name}(방 ${dd}): 피해 ${got}${crit ? " (치명)" : ""}${arc.bonus ? ` [마력 공격 +${arc.bonus}${Du.t.charm ? " · 홀림" : ""}]` : ""}`);
    // v3.13.2 [연쇄]: 이 공격으로 맞선 유닛을 쓰러뜨리고 피해가 남으면, 남은 피해로 대기열의 다음 상대 유닛 하나를 친다.
    // 그 유닛의 방어만큼 줄고(마력 공격은 여기에도 적용), 반격 · 가시는 없다. 가호에 줄어든 몫은 남은 피해에서 빠진다
    if (ab.chain && !Du.t.alive && got > hpBefore) {
      const nx = queueOf(D)[0];
      if (nx) {
        let nd = nx.t.d;
        if (ab.magic) nd = 0;
        const left = got - hpBefore, ch = hit(left, nd);
        lg(X, `[연쇄] ${ca.name}의 남은 피해 ${left} → ${C(nx).name}(방 ${nd})`);
        if (ch > 0) { hurt(X, nx, ch, "연쇄"); if (!nx.t.alive) { nx.t.killer = Au.uid; nx.t.killVia = "chain"; } } else fl(X, nx.uid, "연쇄 막음", "miss");
      }
    }
    if (behind && behind.t.alive) {
      const pr = hit(Au.t.a, behind.t.d);
      lg(X, `[꿰뚫기] ${ca.name}의 공격이 ${C(behind).name}까지 꿰뚫었다 (공 ${Au.t.a} → 방 ${behind.t.d})`);
      if (pr > 0) { hurt(X, behind, pr, "꿰뚫기"); if (!behind.t.alive) { behind.t.killer = Au.uid; behind.t.killVia = "pierce"; } } else fl(X, behind.uid, "막음", "miss");
    }
    uOnHit(X, Au, Du, got);   // v3.31 [불씨 전염] · [계약의 낙인] 표시, 쓰러뜨린 유닛 기록
    if (Du.t.thorns && Au.t.alive) {   // v3.84 같은 능력은 칸마다 따로: [가시 1] [가시 1]은 피해 1이 두 번(가시 2 한 번이 아님)
      const ps = fitPieces(Du.t.thornsP || [], Du.t.thorns);
      if (ps.length > 1) { thSplit = true; step(X, thr ? { act: Au.uid, tgt: Du.uid, hit: true, thr: thr.uid } : { act: Au.uid, tgt: Du.uid, hit: true }, 520); }
      ps.forEach((n, i) => { if (!Au.t.alive) return; if (i) step(X, { tgt: Au.uid }, PIECE_MS); const t = hurt(X, Au, n, "가시"); if (t) lg(X, `[가시${ps.length > 1 ? " " + n : ""}] ${ca.name} 피해 ${t}`); });
    }
    spRiposte(X, Au, Du, blocked); spDrain(X, Au, Du);   // v3.81 [되받기] · [뿌리 흡수]: 맞붙어 공격받을 때(이 유닛이 쓰러져도)
    if (got > 0) spMark(X, Au, Du);   // v3.81 [표식]
    gbIgnite(X, Au, Du);   // v3.92 [점화]: 공격한 상대에 화상을 남긴다(공격으로 쓰러지면 없음)
    gbArmor(X, Au, Du);   // v3.73 [화염 갑주]: 공격해 온 유닛에 화상
    kzShock(X, Au, Du);   // 2026-11-22 [감전 N]: 공격해 온 유닛의 공격 −N(이번 턴)
  }
  if (thSplit) step(X, { tgt: Au.uid }, PIECE_MS);
  else step(X, thr ? { act: Au.uid, tgt: Du.uid, hit: true, thr: thr.uid } : { act: Au.uid, tgt: Du.uid, hit: true }, 520);
  if (Du.t.alive && Au.t.alive && !Du.t.rest && !C(Du).still && !Du.t.noCounter) {   // noCounter: 반격하지 않는 유닛 (v3.65 환각이 쓰다가 뺐다 — 지금 거는 곳 없음)
    if (ab.ranged) { lg(X, `[원거리] ${ca.name}은(는) 반격을 받지 않는다`, "sys"); return; }   // 2026-11-22 [요격](원거리에게도 반격)은 걷어냄 → 케라운 [전도]
    if (abilOf(Du).mesmer) mrCharm(X, Au);   // v3.80 [매혹]: 반격할 때도 맞붙은 상대를 [홀림]으로
    const bash = abilOf(Du).bash ? Math.max(0, Du.t.d) : 0;   // v3.74 [방패 반격]: 반격 피해에 지금 방어를 더한다(관통에 깎인 뒤의 값)
    if (bash) lg(X, `[방패 반격] ${cd.name}의 반격에 방어 ${bash}를 더한다`, "sys");
    const cMagic = !!abilOf(Du).magic;   // v3.95 (사용자): [방어무시]는 반격에도 — 공격한 유닛의 방어를 0으로 친다
    const back = abVeil(X, Du, Au, hit(Du.t.a + bash, cMagic ? 0 : Au.t.d) + spHunt(X, Du, Au) + kzConduct(X, Du, Au));   // 2026-11-22 [전도]도 반격에 · v3.81 [불꽃 사냥]은 반격에도 · v3.65 [그림자 걸음] · v3.95 [마력 공격]은 반격에 붙지 않는다(사용자)
    const auHp = hpLeft(Au);   // 2026-11-17 [흡혈]: 반격 맞기 전 체력 (흡혈 상한)
    const g = back > 0 ? hurt(X, Au, back, "반격") : (fl(X, Au.uid, "반격 0", "miss"), 0);
    abLeech(X, Du, g, auHp);   // v3.65 [흡혈]: 반격도 맞붙은 피해
    if (g > 0) spMark(X, Du, Au);   // v3.81 [표식]: 반격으로 피해를 줘도
    // v3.65 [치명]은 반격에도: 피해가 들어갔고 공격한 유닛이 살아 있으면 남은 체력을 1로 ([연쇄]는 공격할 때만)
    let gc = g, ccrit = false;
    if (abilOf(Du).crit && g > 0 && Au.t.alive && hpLeft(Au) > 1) { const cut = hpLeft(Au) - 1; Au.t.dmg += cut; gc += cut; ccrit = true; fl(X, Au.uid, "치명 ♥1", "dmg big"); }
    lg(X, `↺ ${cd.name}의 반격 → ${ca.name}: 피해 ${gc}${ccrit ? " (치명)" : ""}${cMagic && Au.t.d > 0 ? " [방어무시]" : ""}`);
    uOnHit(X, Du, Au, gc);   // v3.31 반격도 맞붙은 피해 (v3.65 기록 뒤에 — [출혈]이 반격 줄 다음에 찍히게)
    // v3.84.3 [가시]는 반격도 공격으로 친다(사용자): 반격받은 공격자에게 가시가 있으면 반격한 유닛이 가시만큼 체력을 잃는다(공격받을 때와 같이 칸마다 따로)
    if (Au.t.thorns && Du.t.alive) {
      const ps = fitPieces(Au.t.thornsP || [], Au.t.thorns);
      if (ps.length) step(X, { act: Au.uid, counter: Du.uid }, 460);
      ps.forEach((n, i) => { if (!Du.t.alive) return; if (i) step(X, { tgt: Du.uid }, PIECE_MS); const t = hurt(X, Du, n, "가시"); if (t) lg(X, `[가시${ps.length > 1 ? " " + n : ""}] 반격한 ${cd.name} 피해 ${t}`); });
      if (ps.length) { step(X, { tgt: Du.uid }, PIECE_MS); return; }
    }
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
  // v3.65 [제물]: 마법으로 바친 생명이 아직 돌아올 수 있으면(이번 턴 바친 것 − 돌아온 것) 그만큼은 빌린 것으로 본다 —
  // 생명이 0 아래여도 제물이 돌아오면 0 이상이 될 수 있는 동안은 전투가 이어진다. 끝까지 0 아래면 전투 뒤 checkEnd가 패배로 친다
  const dead = () => X.P.some(p => p.life + abOwed(X, p.idx) < 0);
  // v3.18.2 opening 마법(수비형 깃발의 유니크 공격 마법)은 놓인 칸과 상관없이 전투가 시작될 때 먼저 발동한다
  const ready = q => C(q.it).opening ? true : q.who === "atk"
    ? A.field.every((u, i) => !isUnit(u) || i + 1 >= q.k || acted.has(u) || !u.t.alive)
    : !D.field.some((u, i) => isUnit(u) && u.t.alive && i + 1 < q.k);
  // 부서진 카드 치우고 좌측 정렬. 치운 게 있으면 한 수로 기록한다
  const sweep = (extraUids, dur) => {
    const gone = extraUids ? extraUids.slice() : [];
    uPreSweep(X);   // v3.31 쓰러지기 전에: 세이렌의 노래 · 전리품 · 영혼 강탈 · 늑대 · 화약통 · 뿌리 · 고철 · 물결
    a2MartyrSweep(X);   // v3.86 [순교의 서약]: 쓰러진 아군 양옆에 보호막
    g1OathSweep(X);   // v3.87 [피의 맹세]: 쓰러진 결속 유닛의 피가 바로 뒤 아군에게
    for (const p of X.P) {
      p.field.forEach((it, s) => { if (isUnit(it) && !it.t.alive) { gone.push(it.uid); p.field[s] = null; const bp = ownerOf(X, it, p); if (it.phantom) {} else if (!C(it).tok) uBury(X, it, p, bp); else if (it.t.keep && it.t.keep.rev) { bp.burn.push(it.t.keep.rev); brokeCard(X, bp, it.t.keep.rev, "unit"); } if (it.item) { const ip = it.item.from != null ? (X.P.find(q => q.idx === it.item.from) || bp) : bp; ip.burn.push(it.item.id); brokeCard(X, ip, it.item.id, "item"); } } });   // v3.31 uBury: 소각장 · 핸드(영혼 강탈) · 덱 맨 위(돌아오는 물결), 빼앗은 아이템은 원래 주인에게
      const xs = p.field.filter(Boolean);
      p.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    }
    for (const q of pend) q.k = q.p.field.indexOf(q.it) + 1;
    rareAuraSync(X);   // v3.69 쓰러져 당겨지면 오라 이웃이 바뀐다
    if (gone.length) step(X, { shatter: gone }, dur || 520);
    if (uPostSweep(X)) for (const q of pend) q.k = q.p.field.indexOf(q.it) + 1;   // v3.31 쓰러진 뒤 부르는 소환물
  };
  // 2026-11-16 같은 때 양쪽 마법이 모두 발동할 수 있으면 번갈아: 공격 → 방어 → 공격 … (예전: 공격 마법을 다 쓴 뒤 방어 마법). 한쪽만 남으면 그쪽을 칸 번호 순으로
  const fire = all => {
    let last = null;
    for (;;) {
      let q = null;
      const L = w => pend.filter(z => z.who === w && (all || ready(z))).sort((a, b) => a.k - b.k);
      const La = L("atk"), Ld = L("def");
      if (La.length && Ld.length) q = last === "atk" ? Ld[0] : La[0];
      else q = La[0] || Ld[0] || null;
      if (q) last = q.who;
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
  rareAuraSync(X);   // v3.69 레어 오라 (전투가 시작될 때, 그 뒤 칸이 바뀔 때마다 — sweep · step)
  a2LightStart(X);   // v3.86 [새벽빛]: 이번 턴 깎인 생명을 셀 기준
  shieldCoinsAtCombat(X);   // v3.61.1 보호막 코인 (전투가 시작될 때, 다른 무엇보다 먼저)
  nwPurify(X);   // v3.74 [정화]: 불씨 · 화상이 타기 전에 지운다
  a1CurseTick(X, sweep);   // v3.95 [저주]: 지난 턴까지 걸린 [공포] · [역병]이 발동하고 꺼진다([정화] 다음)
  spCombatStart(X);   // v3.81 [밀물] · [경계의 화살]
  uCombatStart(X, sweep);   // v3.31 불씨 · 뿌리 · 축전 (전투가 시작될 때)
  gbBurnTick(X, sweep);   // v3.73 화상: 지난 턴까지 붙은 화상이 한 번 터지고 꺼진다
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
      if (Au.t.alive && queueOf(D).length) nwRegenTick(X);   // v3.74 [재생 N]: 맞붙음이 시작될 때마다
      if (Au.t.alive) {
        const clash = queueOf(D).length > 0;   // 직접 공격은 맞붙음이 아니다 — 출혈이 깎지 않는다
        X.clash = null; attackOne(X, Au); mrHeal(X); sweep();
        if (dead()) break;
        if (clash && abBleedTick(X)) { sweep(); if (dead()) break; }   // 2026-11-22 [출혈]: 맞붙음이 끝날 때마다([치유] 다음) 전장의 출혈 유닛 체력 −N — 그 맞붙음에서 막 걸린 출혈도
      }
    }
    fire(false);
  }
  if (dead()) { lg(X, "생명이 다해 전투가 그 자리에서 끝났다", "bad"); step(X, {}, 300); return X.direct; }
  fire(true);
  sweep();
  g1VictoryEnd(X);   // v3.82 [승전의 함성]: 살아남은 아군 수만큼 상대 생명 −
  a2RetribEnd(X, sweep);   // v3.77 [응보의 빛]: 이번 턴 막은 피해를 되돌린다(고철 골렘 · 새벽의 부활보다 먼저)
  a2LightEnd(X);   // v3.86 [새벽빛]: 깎인 생명의 절반을 모으고 이번 턴 모은 양을 알린다
  uCombatEnd(X, sweep);   // v3.31 고철 골렘 · 씨앗 · 새벽의 부활 · 늑대 흩어짐 (전투가 끝날 때)
  kzShockEnd(X);   // 2026-11-22 [감전]: 이번 턴에 쓴 감전을 지운다(이번 전투에 새로 걸린 것은 다음 턴까지)
  g1OathEnd(X);   // v3.87 [피의 맹세]: 받은 피를 머금고 살아남은 유닛 → 다음 턴 공격 +
  // "이번 턴만" 부른 유닛은 전투가 끝나면 사라진다
  a1MindEnd(X);   // v3.95 [정신 지배]: 살아남은 지배 유닛은 원래 주인의 전장 맨 뒤로
  let fade = false;
  for (const p of X.P) for (const u of p.field) if (isUnit(u) && u.tokTemp && u.t.alive) { u.t.alive = false; fade = true; lg(X, u.from != null ? `빼앗은 ${C(u).name}이(가) 그림자로 흩어져 원래 주인의 소각장으로 갔다` : `${C(u).name}이(가) 사라졌다`, "sys"); }
  if (fade) sweep();
  step(X, {}, 300);
  return X.direct;
}

/* ---------- 컴퓨터의 수 읽기용: 상태 복제와 점수 ---------- */
function cloneSide(p, hideSpells) {
  return { idx: p.idx, name: p.name, life: p.life, crystals: p.crystals.slice(), burn: (p.burn || []).slice(), reload: 0, bonus: p.bonus || 0, light: p.light,   // v3.86 새벽빛 · v3.65 소각장도 복제 — 되살리는 마법(심연의 부름 · 새벽의 부활)을 수 읽기가 본다
    field: p.field.map(it => (!it ? null : (hideSpells && isSpell(it)) ? null : JSON.parse(JSON.stringify(it)))) };
}
/* 유닛의 값: 환산 레벨(레벨 + 유지비 0.5) + 아이템 레벨 */
function unitWorth(it) { const c = C(it); return c.lv + 0.5 * c.up + (it.item ? CARDS[it.item.id].lv * 0.8 : 0); }
/* v3.88 다음 턴 p의 유닛이 받을 화상(붙은 화상 + 상대가 깔아 둔 화약통) */
function gbFireSum(p, foe) { return p.field.reduce((s, u) => s + (isUnit(u) && u.t && u.t.alive && u.t.keep && u.t.keep.scorch > 0 ? u.t.keep.scorch : 0), 0) + foe.field.reduce((s, u) => s + (isUnit(u) && u.t && u.t.alive && u.t.keep && u.t.keep.face > 0 ? u.t.keep.face : 0), 0); }
/* me 쪽 점수: 상대 손실 − 내 손실 + 0.5 × (생명 차이 변화) − 장전 */
function evalScore(before, after, me) {
  const lost = (b, a) => b.field.filter(isUnit).reduce((s, u) => s + (a.field.some(v => v && v.uid === u.uid) ? 0 : unitWorth(u)), 0);
  const o = 1 - me;
  return lost(before[o], after[o]) - lost(before[me], after[me])
    + 0.5 * ((after[me].life - before[me].life) - (after[o].life - before[o].life)) - 0.8 * (after[me].reload - before[me].reload)
    + 0.6 * ((after[me].bonus || 0) - (before[me].bonus || 0) - (after[o].bonus || 0) + (before[o].bonus || 0))
    + 0.25 * (after[me].field.reduce((s, u) => s + g1BloodSum(u), 0) - after[o].field.reduce((s, u) => s + g1BloodSum(u), 0))   // v3.87 [피의 맹세]: 다음 턴 오를 공격
    + 0.25 * (gbFireSum(after[o], after[me]) - gbFireSum(after[me], after[o]))   // v3.88 화상 · 화약통: 다음 턴 깎일 체력
    + 0.25 * (a1CurseSum(after[o]) - a1CurseSum(after[me]));   // v3.95 [저주]: 다음 턴 발동할 공포 · 역병
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

/* v3.20 스탯 하나에 v를 더하고 표시를 지킨다. 실제로 바뀐 값을 띄우고 돌려준다 */
function addStat(X, u, k, v) {
  const b = u.t[k];
  if (k === "d" && u.t.lock && v < 0) { fl(X, u.uid, "저주 면역", "miss"); return 0; }
  u.t[k] = b + v;
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
    const amp = ampKind(C(it)) && (op.side || "foe") === "foe" ? amplify(X.P[caster]) : 0;
    for (let i = 0; i < op.n; i++) {
      const L = sideUnits(X, caster, op.side || "foe"); if (!L.length) break;
      const u = L[Math.floor(RNG() * L.length)], r = spellDmg(X, u, op.x, amp, op.phys);
      if (r > 0) hurt(X, u, r, op.phys ? "물리" : ""); else fl(X, u.uid, "막음", "miss");
      step(X, {}, 260);
    }
  },
  /* 상대 대기열 맨 앞부터 차례로: { xs: [3, 2, 1], phys } */
  chain(X, caster, it, k, op) {
    const Q = queueOf(X.P[1 - caster]), amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;   // v3.18.3 [증폭]: 맞는 유닛마다 +N
    op.xs.forEach((v, i) => { const u = Q[i]; if (!u || !u.t.alive) return; const r = spellDmg(X, u, v, amp, op.phys); if (r > 0) hurt(X, u, r, "연쇄"); step(X, {}, 240); });
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
    const L = o.field.map((u, i) => [u, i]).filter(([u]) => isUnit(u) && u.t.alive && !nwFirm(u));   // v3.74 [굳건] 유닛은 자리를 지킨다
    if (L.length < 2) return;
    const a = L[0][1], b = L[L.length - 1][1];
    [o.field[a], o.field[b]] = [o.field[b], o.field[a]];
    mrCharm(X, o.field[a]); mrCharm(X, o.field[b]);   // v3.78 [홀림]
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
    const n = liveUnits(X.P[caster]).length, x = n * (op.per || 1), amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    lg(X, `아군 유닛 ${n}기 × ${op.per || 1} → 피해 ${x}${amp ? " +증폭 " + amp : ""}`, "sys");
    if (!x && !amp) return;
    for (const u of sideUnits(X, caster, op.side || "foe")) hurt(X, u, spellDmg(X, u, x, amp));
  },
  /* v3.11 빼앗기 (v3.19.7: 칸은 이 마법이 놓인 칸, 가져온 카드는 내 전장 맨 뒤)
     이 마법과 같은 칸 번호에 놓인 상대 카드를 빼앗아 내 전장의 맨 뒤(마지막 카드 다음)에 놓는다. 이 마법은 쓰이고 부서지므로 그 칸은 비우고 당긴다.
     유닛이면 이번 턴 내 유닛이 되고(공격 턴이면 내 다른 유닛들 다음에 공격, 방어 턴이면 내 방어 줄 맨 뒤), 2026-11-22(사용자) 살아남으면 전투가 끝날 때 원래 주인의 전장 맨 뒤로 돌아간다(정신 지배와 같은 a1MindEnd).
     뒷면 마법이면 내 마법으로 발동한다(맨 뒤 칸 차례에, 쓴 뒤 원래 주인의 소각장으로) */
  steal(X, caster, it, k, op) {
    const p = X.P[caster], o = X.P[1 - caster];
    const mine = it.echo ? -1 : p.field.indexOf(it);
    const col = mine >= 0 ? mine : k - 1, tg = o.field[col];
    if (!tg || (isUnit(tg) && !(tg.t && tg.t.alive))) { lg(X, `상대 ${col + 1}번 칸이 비어 빼앗을 카드가 없다`, "sys"); return; }
    stealCard(X, caster, it, tg);
    if (isUnit(tg) && !o.field.includes(tg)) tg.t.mind = "그림자 강탈";   // a1MindEnd가 돌려보낸다(문자열 = 기록에 쓸 이름)
  },
  /* v3.65 그림자 손아귀(SA1-02): 상대 유닛 가운데 레벨이 (이번 턴 낸 생명 + plus) 이하인 것 중 레벨이 가장 높은 1기(같으면 공격이 높은 · 앞의 유닛)를 빼앗는다 */
  paidSteal(X, caster, it, k, op) {
    const o = X.P[1 - caster], cap = ((X.paid && X.paid[caster]) || 0) + (op.plus || 0);
    const L = queueOf(o).filter(u => !u.t.stolen && !nwFirm(u) && C(u).lv <= cap);   // v3.74 [굳건]은 빼앗기지 않는다
    if (!L.length) { lg(X, `레벨 ${cap} 이하 상대 유닛이 없어 그림자가 허공을 쥐었다`, "sys"); fl(X, it.uid, "빼앗을 유닛 없음", "miss"); return; }
    let tg = L[0]; for (const u of L) if (C(u).lv > C(tg).lv || (C(u).lv === C(tg).lv && u.t.a > tg.t.a)) tg = u;
    stealCard(X, caster, it, tg);
  },
  /* v3.65 환각(MC-05): 상대 맨 앞 유닛이 바로 뒤 제 편 유닛을 제 공격으로 친다(물리, 맞는 유닛의 방어만큼 준다). 반격은 막지 않는다(v3.65 사용자 요청으로 뺌) */
  confuse(X, caster, it, k, op) {
    const Q = queueOf(X.P[1 - caster]), u = Q[0];
    if (!u) { lg(X, "환각에 빠뜨릴 상대 유닛이 없다", "sys"); return; }
    fl(X, u.uid, "환각", "debuff"); mrCharm(X, u);   // v3.78 [홀림]
    const v = Q[1];
    if (!v) { lg(X, `${C(u).name}이(가) 환각에 빠졌지만 곁에 칠 아군이 없다`, "sys"); return; }
    step(X, { act: u.uid, tgt: v.uid }, 380);
    const x = hit(u.t.a, v.t.d);
    lg(X, `[환각] ${C(u).name}(공 ${u.t.a})이(가) 제 편 ${C(v).name}(방 ${v.t.d})을(를) 쳤다`, "spell");
    if (x > 0) hurt(X, v, x, "환각"); else fl(X, v.uid, "막음", "miss");
    step(X, { act: u.uid, tgt: v.uid, hit: true }, 420);
  },
  /* v3.65 거울 환영(SA1-04): 상대 유닛 중 공격이 가장 높은 1기와 같은 카드(아이템 · 코인 결과 · 마법 효과 없이 카드 그대로)를 이 칸에 이번 턴 부른다.
     환영은 쓰러지거나 사라져도 소각장에 가지 않는다(어느 쪽 카드도 아니다) */
  phantom(X, caster, it, k, op) {
    const p = X.P[caster], src = pickTargets(X, caster, "foe", { t: "maxA", n: 1 }, k)[0];
    if (!src) { lg(X, "비출 상대 유닛이 없다", "sys"); fl(X, it.uid, "비출 유닛 없음", "miss"); return; }
    let s = it.echo ? -1 : p.field.indexOf(it);
    if (s < 0) s = p.field.indexOf(null);
    if (s < 0) { fizzle(X, p, src.id, it, 1, 1); return; }
    const u = { uid: tokUid(X), id: src.id, item: null, summoned: X.turn, tokTemp: true, phantom: true };
    resetTurn(u);
    if (!it.echo && p.field[s] === it) X.tokFrom = it.uid;
    p.field[s] = u; X.toks[u.uid] = src.id;
    fl(X, u.uid, "환영 · 이번 턴", "buff");
    lg(X, `[거울 환영] ${C(src).name}의 환영(${C(u).a}/${C(u).d}/${C(u).h})이 ${p.name}의 ${s + 1}번 칸에 나타났다 — 이번 턴이 끝나면 사라진다`, "good");
    step(X, { conjure: u.uid }, 650);
  }
};
/* 빼앗기 본체 (steal · paidSteal): tg를 내 전장 맨 뒤로. it는 이 마법(칸에서 빠질 것) */
function stealCard(X, caster, it, tg) {
  const p = X.P[caster], o = X.P[1 - caster], col = o.field.indexOf(tg);
  if (nwFirm(tg)) { fl(X, tg.uid, "굳건", "shield block"); lg(X, `[굳건] ${C(tg).name}은(는) 빼앗기지 않는다`, "good"); return; }   // v3.74
  {
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
  }
}
const SPELL_OPS_2 = {
  /* v3.11 대칭: 상대 전장의 카드 배치를 좌우로 뒤집는다 (맨 앞 ↔ 맨 뒤). 대기 중인 마법의 칸도 함께 바뀐다 */
  mirror(X, caster, it, k, op) {
    const o = X.P[1 - caster];
    const xs = o.field.filter(Boolean);
    if (xs.length < 2) { lg(X, "상대 전장에 카드가 둘보다 적어 바뀌지 않았다", "sys"); return; }
    const old = o.field.slice();
    xs.reverse();
    o.field = nwFirmArrange(old, xs.concat(Array(RULES.slots - xs.length).fill(null)));   // v3.74 [굳건] 유닛은 제자리
    if (X.pend) for (const q of X.pend) q.k = q.p.field.indexOf(q.it) + 1;
    for (const u of xs) if (isUnit(u)) fl(X, u.uid, "⇄", "debuff");
    lg(X, `${o.name}의 전장 배치가 거꾸로 뒤집혔다`, "sys");
    step(X, {}, 520);
  },
  /* v3.18 유폭: 상대 맨 앞 유닛에게 피해 x. 그 유닛이 쓰러지면 남은 상대 유닛 전체에게 피해 splash { x, splash } */
  blast(X, caster, it, k, op) {
    const amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    const u = queueOf(X.P[1 - caster])[0]; if (!u) return;
    hurt(X, u, spellDmg(X, u, op.x, amp));
    if (u.t.alive) return;
    step(X, {}, 260);
    lg(X, `↳ 유폭 — 상대 유닛 전체에게 피해 ${op.splash}${amp ? " +증폭 " + amp : ""}`, "spell");
    for (const v of liveUnits(X.P[1 - caster])) hurt(X, v, spellDmg(X, v, op.splash, amp), "유폭");
  },
  /* v3.18 아군 유닛 방어의 합만큼 상대 맨 앞 유닛에게 피해. 쓰러뜨리고 남은 피해는 대기열의 다음 유닛에게 넘어간다 { mul } */
  sumDef(X, caster, it, k, op) {
    const n = liveUnits(X.P[caster]).reduce((s, u) => s + Math.max(0, u.t.d), 0) * (op.mul || 1);
    let x = n, amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;   // [증폭]은 처음 맞는 유닛에 한 번(ampHit) — 남으면 피해와 함께 넘어간다
    lg(X, `아군 방어의 합 → 피해 ${x}${amp ? " +증폭 " + amp : ""}`, "sys");
    for (const u of queueOf(X.P[1 - caster])) {
      if (amp) { x += ampHit(X, u, amp); amp = 0; }
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
    const me = liveUnits(X.P[caster])[0], foe = pickTargets(X, caster, "foe", { t: "maxA", n: 1 }, k)[0];
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
  /* v3.62.1 방어 합을 공격으로 (철벽 진격 RS-B2-4): 아군 유닛 전체의 방어를 더한 값 S를, 아군 맨 앞(칸 순서, [수호] 무시)부터 S, S−1, S−2 … 공격에 더한다.
     { step: 줄어드는 몫(기본 1) }. 0 이하가 되면 거기서 멈춘다. 방어가 음수인 유닛은 0으로 센다 */
  dsumA(X, caster, it, k, op) {
    const Q = liveUnits(X.P[caster]), S = Q.reduce((s, u) => s + Math.max(0, u.t.d), 0), st = op.step || 1;
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
      if ((op.side || "foe") === "foe") mrCharm(X, u);   // v3.78 [홀림]
    }
  },
  /* v3.67 뼈 부수기(js/orc.js): 방어가 0 이하인 상대 유닛 가운데 공격이 가장 높은 n기의 방어와 남은 체력을 맞바꾼다 —
     체력이 0이 되어 쓰러진다(체력 표시가 막으면 거기까지). [관통]에 방어가 깎인 유닛도 이번 턴 0이면 대상 */
  d0Swap(X, caster, it, k, op) {
    const L = pickTargets(X, caster, "foe", { t: "maxA", n: 99 }, k).filter(u => u.t.d <= 0).slice(0, op.n || 1);
    if (!L.length) { lg(X, "방어가 0인 상대 유닛이 없어 효과가 없다", "sys"); return; }
    for (const u of L) setStats(X, u, { d: hpLeft(u), h: Math.max(0, u.t.d) }, "방체 교환");
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
    const me = op.mine ? pickTargets(X, caster, "ally", op.mine, k)[0] : liveUnits(X.P[caster])[0], foe = pickTargets(X, caster, "foe", op.area || { t: "front", n: 1 }, k)[0], s = op.st || "a";
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
    const me = liveUnits(X.P[caster])[0];
    let got = 0;
    // v3.65 0까지만 깎는다: 공격이 3이면 −3만, 0 이하면 깎지 않는다. 실제로 깎인 양만 합친다 (흡혈 장막 · 영혼 착취)
    for (const u of pickTargets(X, caster, "foe", op.area || { t: "front", n: 1 }, k)) { const cut = Math.min(op.x, Math.max(0, u.t.a)); if (cut > 0) got += -addStat(X, u, "a", -cut); }
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
    const mine = liveUnits(X.P[caster]).slice(0, op.n || 1);
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
  /* ---------- v3.65 심연 마족 (js/abyss.js) ---------- */
  /* 피의 제물: 아군 유닛마다 체력 −per(방어 · 보호막 무시, 제가 내는 대가). 깎인 체력 합 × mul만큼 상대 맨 앞 유닛부터 체력을 깎고, 쓰러뜨리고 남은 몫은 다음 유닛에게 { per, mul } */
  tithe(X, caster, it, k, op) {
    const p = X.P[caster]; let sum = 0;
    for (const u of liveUnits(p)) {
      const cut = Math.min(op.per || 1, Math.max(0, hpLeft(u))); if (!cut) continue;
      u.t.dmg += cut; sum += cut; fl(X, u.uid, "제물 ♥−" + cut, "dmg");
      if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); }
    }
    let x = sum * (op.mul || 2), amp = sum && ampKind(C(it)) ? amplify(p) : 0;   // [증폭]은 처음 맞는 유닛에 한 번(ampHit)
    lg(X, `[피의 제물] 아군이 체력 ${sum}을 바쳤다 → 피해 ${x}${amp ? " +증폭 " + amp : ""}`, "spell");
    if (sum) step(X, {}, 300);
    for (const u of queueOf(X.P[1 - caster])) {
      if (amp) { x += ampHit(X, u, amp); amp = 0; }
      if (x <= 0) break;
      const need = hpLeft(u) + (u.t.ward && !u.t.wardUsed ? u.t.ward : 0), blocked = u.t.shield === true;
      hurt(X, u, x, "제물");
      if (blocked || u.t.alive) break;
      x -= need; step(X, {}, 240);
    }
  },
  /* 피의 공명: 대상에게 피해 (이번 턴 낸 생명 × mul + plus) { area, mul, plus } */
  paidHit(X, caster, it, k, op) {
    const paid = (X.paid && X.paid[caster]) || 0, x = paid * (op.mul || 1) + (op.plus || 0), amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    lg(X, `이번 턴 바친 제물 ${paid} → 피해 ${x}${amp ? " +증폭 " + amp : ""}`, "sys");
    if (x > 0 || amp > 0) for (const u of pickTargets(X, caster, "foe", op.area || { t: "maxA", n: 1 }, k)) hurt(X, u, spellDmg(X, u, x, amp), "공명");
  },
  /* 심연의 부름: 내 소각장의 유닛 가운데 레벨이 이번 턴 낸 생명 이하인 것 중 레벨이 가장 높은 1장을 이 칸에 되살린다(남음) */
  rebirth(X, caster, it, k, op) {
    const p = X.P[caster], cap = (X.paid && X.paid[caster]) || 0;
    const pool = (p.burn || []).filter(id => CARDS[id] && CARDS[id].type === "unit" && !CARDS[id].tok && CARDS[id].lv <= cap);
    if (!pool.length) { lg(X, `소각장에 레벨 ${cap} 이하 유닛이 없어 아무도 일어서지 않았다`, "sys"); fl(X, it.uid, "되살릴 유닛 없음", "miss"); return; }
    let id = pool[0]; for (const x of pool) if (CARDS[x].lv > CARDS[id].lv) id = x;
    let s = it.echo ? -1 : p.field.indexOf(it);
    if (s < 0) s = p.field.indexOf(null);
    if (s < 0) { fizzle(X, p, id, it, 1, 1); return; }
    p.burn.splice(p.burn.lastIndexOf(id), 1);
    if (X.died && X.died[p.idx]) { const j = X.died[p.idx].lastIndexOf(id); if (j >= 0) X.died[p.idx].splice(j, 1); }
    const u = { uid: tokUid(X), id, item: null, summoned: X.turn };
    resetTurn(u);
    if (!it.echo && p.field[s] === it) X.tokFrom = it.uid;
    p.field[s] = u; X.toks[u.uid] = id;
    fl(X, u.uid, "심연의 부름", "buff");
    lg(X, `[심연의 부름] ${C(u).name}(${C(u).a}/${C(u).d}/${C(u).h})이(가) 소각장에서 일어섰다 — ${p.name}의 ${s + 1}번 칸`, "good");
    step(X, { conjure: u.uid, pyre: p.idx }, 800);
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
      (X.negBy = X.negBy || {})[it.uid] = ((X.negBy || {})[it.uid] || 0) + 1;   // v3.85 이 마법이 무효로 한 장수(negBuff가 본다)
    }
  }
};
Object.assign(SPELL_OPS, SPELL_OPS_2);   // v3.65 빼앗기 본체(stealCard)를 함수로 뺀 자리에서 나뉜 뒤쪽 효과들


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
/* [폭풍의 눈] (v3.31 · 2026-11-23 이 유닛만 · 턴에 한 번): 상대의 마법 · 사격 · 투척 · 공격이 이 유닛에 맞을 때 그 턴 처음 한 번만 코인 — 앞면이면 빗나감 */
function uEyeTry(X, u) {
  if (!uHas(u, "eye") || !u.t.alive) return false;
  const k = uK(u);
  if (k.dodgeT === X.turn) return false;
  k.dodgeT = X.turn;
  return flip();
}
/* 상대 마법(castSpell 안, X.eyeCast)이 겨눈 내 유닛 — [마력 흡수]는 맞지 않고, [폭풍의 눈] 유닛은 위 코인 */
function uEyeFilter(X, P, L) {
  if (!X.eyeCast || !L.length) return L;
  // [마력 흡수] 유닛은 상대 마법에 맞지 않는다
  L = L.filter(u => { if (!uHas(u, "absorb")) return true; if (!X.eyeCast["a" + u.uid]) { X.eyeCast["a" + u.uid] = 1; fl(X, u.uid, "흡수", "miss"); } return false; });
  return L.filter(u => {
    if (!uHas(u, "eye")) return true;
    if (X.eyeCast[u.uid] == null) {
      X.eyeCast[u.uid] = uEyeTry(X, u);
      if (X.eyeCast[u.uid]) { fl(X, u.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] 마법이 ${C(u).name}을(를) 빗나갔다`, "good"); }
    }
    return !X.eyeCast[u.uid];
  });
}
/* 상대의 사격 · 투척이 겨눈 유닛 — [폭풍의 눈] 유닛이면 위 코인 */
function uEyeDodge(X, P, u) {
  if (!uEyeTry(X, u)) return false;
  fl(X, u.uid, "빗나감", "miss"); lg(X, `[폭풍의 눈] ${C(u).name}을(를) 겨눈 화살이 바람에 빗나갔다`, "good");
  return true;
}
/* 마법이 발동할 때: 내 [축전] 충전 +1, 상대 [마력 흡수] 마력 +1 */
function uOnCast(X, caster, it) {
  spOverload(X, caster);   // v3.81 [과부하]
  // v3.66.2 쌓인 충전의 화면 이름은 "플라즈마". cls의 from-<마법 uid>로 화면이 마법 카드에서 이 유닛으로 빨려 드는 빛을 그린다(js/game.js plasmaDrain)
  for (const u of uLive(X.P[caster], "charge")) { const k = uK(u); k.charge = Math.min(2, (k.charge || 0) + 1); fl(X, u.uid, "플라즈마 " + k.charge, "buff plasma" + (it && it.uid != null ? " from-" + it.uid : "")); }
  for (const u of uLive(X.P[1 - caster], "absorb")) { const k = uK(u); k.mana = Math.min(4, (k.mana || 0) + 1); fl(X, u.uid, "마력 " + k.mana, "buff"); }
}
/* 맞붙어 피해를 준 뒤(공격 · 반격): 불씨 · 낙인 표시, 쓰러뜨렸으면 누가 쓰러뜨렸는지 */
function uOnHit(X, src, tgt, got) {
  if (!src || !tgt) return;
  if (got > 0 && tgt.t.alive && !C(tgt).tok) {
    if (uHas(src, "ember") && uK(tgt).ember == null && uK(src).emberT !== X.turn) { uK(src).emberT = X.turn; uK(tgt).ember = X.turn;   /* v3.92 한 턴에 한 번만 (사용자) */ fl(X, tgt.uid, "불씨", "debuff"); lg(X, `[불씨 전염] ${C(tgt).name}에 불씨가 붙었다 — 다음 전투부터 매 턴 피해 2`, "sys"); }
    abBleedOn(X, src, tgt);   // v3.65 [출혈 N]: 맞붙어(공격 · 반격) 피해를 준 상대가 살아남으면 출혈 +N(쌓인다)
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
    if (v.phantom) continue;   // v3.65 거울 환영은 어느 쪽 카드도 아니다
    const o = X.P.find(q => q !== p);
    const killer = v.t.killer != null ? (o.field.find(x => x && x.uid === v.t.killer) || (v.t.bledOut && X.bleedSrc && X.bleedSrc[v.t.killer]) || null) : null;   // v3.65 [출혈]로 쓰러뜨린 유닛은 출혈을 건 유닛이 먼저 쓰러져 치워졌어도 그 유닛의 몫(강탈 · 제물)
    // [세이렌의 노래]: 판에 한 번, 쓰러지지 않고 넘어온다
    if (killer && uHas(killer, "siren") && (uK(killer).sang || 0) < 1 && o.field.includes(null) && !C(v).tok && !nwFirm(v)) {   // v3.74 [굳건]은 넘어가지 않는다
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
    abOffer(X, o, v);   // 2026-11-17 [제물]: 제물 증표가 붙은 상대 유닛이 쓰러지면 그 마법에 바친 생명이 돌아오고 카드는 내 소각장으로
    // v3.65 [강탈] → 다음 턴 에테르 (쓰러뜨린 유닛이 같이 쓰러졌어도). 연쇄 · 꿰뚫기로 뒤 유닛을 쓰러뜨린 것은 세지 않는다(사용자 결정 — 한 번 맞붙어 두 몫을 받지 않게)
    if (killer && abilOf(killer).rob && !v.t.killVia) abRob(X, o, killer, v);
    spOnKill(X, o, killer, v);   // v3.81 [심판] · [포식]
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
      if (uHas(killer, "wolves")) { X.uAfter.push({ p: o, id: "TK-U-WOLF", after: killer, keep: { expire: X.turn + 1 }, why: "먼지 짐승 무리" }); }
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
  if (v.t.sacTo != null) {   // 2026-11-17 [제물]이 된 상대 유닛은 제물을 바친 쪽의 소각장으로
    const q = X.P.find(z => z.idx === v.t.sacTo) || bp;
    q.burn.push(v.id); brokeCard(X, bp, v.id, "unit");
    X.died = X.died || {}; (X.died[q.idx] = X.died[q.idx] || []).push(v.id);
    lg(X, `[제물] ${C(v).name} 카드가 ${q.name}의 소각장으로 갔다`, "sys");
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
      gbKegBurst(X, p, u); any = true;   // v3.88 화약통 깔기로 놓인 것(keep.face)은 마주 보는 상대에게 화상
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
        lg(X, `[축전] ${C(u).name}이(가) 모은 플라즈마를 풀었다 → 상대 유닛 모두 피해 2`, "spell");
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
    for (const u of p.field) if (isUnit(u) && u.t.alive && u.id === "TK-U-WOLF" && (uK(u).expire || 0) <= X.turn) { u.t.alive = false; lg(X, "잿빛 먼지 짐승이 흙먼지로 흩어졌다", "sys"); any = true; }
    // [고철 골렘]
    for (const s of uLive(p, "scrap")) { const k = uK(s); while ((k.scrap || 0) >= 4) { k.scrap -= 4; if (!uSpawn(X, p, "TK-U-SCRAP", s, {}, "고철 골렘")) break; } }
    // [씨앗]: 자라기 → 심기
    for (const s of uLive(p, "seed")) {
      for (const u of p.field.slice()) if (isUnit(u) && u.t.alive && u.id === "TK-U-SAPLING" && uK(u).seed === s.uid && uK(u).born < X.turn) {
        const i = p.field.indexOf(u), nu = { uid: tokUid(X), id: "TK-U-TREE", item: null, summoned: X.turn };
        resetTurn(nu); p.field[i] = nu; X.toks[nu.uid] = nu.id;
        fl(X, nu.uid, "자람", "buff"); lg(X, `[씨앗] 묘목이 어린 고목으로 자랐다`, "good"); step(X, { conjure: nu.uid }, 600);
      }
      uSpawn(X, p, "TK-U-SAPLING", s, { seed: s.uid, born: X.turn }, "씨앗");   // v3.84.2 "묘목은 2기까지"를 뺐다(자라기가 먼저라 늘 1기뿐이어서 뜻이 없었다)
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

/* ===================== v3.65 심연 마족 (js/abyss.js · docs/ABYSS_v3.65.md) =====================
   수치는 ABYSS(js/abyss.js). 능력은 abilOf의 rob · leech · veil · pact — 유닛 gift · 아이템 · 마법 grant(이번 턴) 어느 쪽이든 */
/* ABYSS.off = { rob: true … }: 그 능력을 끈 채 재 본다(tools/abyss/sim.js 전용, 게임에서는 비어 있음) */
function abOn(k) { return !(typeof ABYSS !== "undefined" && ABYSS.off && ABYSS.off[k]); }
const abCfg = () => (typeof ABYSS !== "undefined" ? ABYSS : { robCond: "any", robGain: "lv", leech: 0.5, leechOver: true });
/* 마법이 생명을 냈다: 이번 턴 낸 대가(X.paid)에 더하고, [피의 계약 N] 유닛마다 공격 +N (이번 턴) */
function abPaid(X, caster, n) {
  X.paid = X.paid || [0, 0]; X.paid[caster] += n;
  for (const u of liveUnits(X.P[caster])) { const v = abilOf(u).pact; if (v) { const r = addStat(X, u, "a", v); if (r) lg(X, `[피의 계약] ${C(u).name} 공격 +${r} (이번 턴 바친 제물 ${X.paid[caster]})`, "good"); } }
}
/* [흡혈]: 맞붙어 준 피해의 절반(올림)만큼 체력을 채운다 — 맞선 상대가 맞기 전 남은 체력보다 많이는 아니다(2026-11-17 사용자 결정, 연쇄로 친 뒤 유닛은 세지 않음).
   다 찬 뒤 남는 몫은 이번 턴 체력 +. 체력에 눌림(▼)이 있으면 차지 않는다 */
function abLeech(X, u, got, foeHp) {
  if (!(got > 0) || !u.t.alive || !abilOf(u).leech) return;
  if (u.t.floor && u.t.floor.h && u.t.floor.h.hi != null) { fl(X, u.uid, "눌림 체력", "miss"); return; }
  const A = abCfg(), amt = Math.min(Math.ceil(got * A.leech), foeHp != null ? Math.max(0, foeHp) : Infinity), heal = Math.min(amt, u.t.dmg);
  u.t.dmg -= heal;
  const over = A.leechOver ? amt - heal : 0;
  if (over > 0) u.t.h += over;
  if (heal + over > 0) { fl(X, u.uid, "흡혈 ♥+" + (heal + over), "heal"); lg(X, `[흡혈] ${C(u).name} 체력 +${heal + over}`, "good"); }
}
/* [출혈 N]: 맞붙어(공격 · 반격) 피해를 준 상대가 살아남으면 그 유닛에 출혈 +N — 걸 때마다 쌓인다(t.bleed, 이번 턴만 · resetTurn이 지움).
   그 뒤 전장에서 맞붙음이 하나 끝날 때마다([치유] 다음, 그 맞붙음에서 막 걸린 출혈도 — 2026-11-22 사용자. abBleedTick, runCombatCore) 출혈 유닛마다 체력 −출혈(방어 · 보호막 · 바다의 보호와 상관없이. v3.74 [가호 N]만 틱마다 N 줄인다).
   출혈로 쓰러지면 마지막으로 출혈을 건 유닛이 쓰러뜨린 것으로 친다 — [강탈] · [제물] 모두 센다(사용자 결정). 그 유닛이 먼저 쓰러져 치워졌어도 X.bleedSrc로 찾는다 */
const A2_HOLY_CUT = 1;   // v3.90 빛의 몸: 천족 유닛이 받는 출혈 −1
const a2Holy = u => !!(u && isUnit(u) && C(u) && (C(u).g === "A2" || /(^|-)A2(-|$)/.test(u.id)));
function abBleedOn(X, src, tgt) {
  const n = abilOf(src).bleed;
  if (!(n > 0) || !tgt.t.alive) return;
  if (tgt.t.noBleed) { fl(X, tgt.uid, "정화 · 출혈 없음", "shield block"); return; }   // v3.89 마법이 이번 턴 걸어 준 [정화](mrPurge)만 출혈을 막는다 — v3.90 유닛의 [정화]는 막지 않음(사용자 결정)
  if (a2Holy(tgt)) {   // v3.90 빛의 몸: 천족 유닛은 출혈이 1 적게 붙는다(0이면 안 붙음) — 마렌시아의 물의 몸(화상 −1)과 같은 꼴
    const m = n - A2_HOLY_CUT;
    if (!(m > 0)) { fl(X, tgt.uid, "빛의 몸 · 출혈 없음", "shield block"); lg(X, `[출혈] ${C(tgt).name}은(는) 빛의 몸이라 출혈이 붙지 않았다`, "sys"); return; }
    tgt.t.bleed = (tgt.t.bleed || 0) + m; tgt.t.bleedBy = src.uid;
    X.bleedSrc = X.bleedSrc || {}; X.bleedSrc[src.uid] = src;
    fl(X, tgt.uid, "출혈 " + tgt.t.bleed, "debuff");
    lg(X, `[출혈 ${n}] ${C(tgt).name}에 출혈 ${m}이 걸렸다(빛의 몸 −${A2_HOLY_CUT}) — 맞붙음이 끝날 때마다 체력 −${tgt.t.bleed}`, "sys");
    return;
  }
  tgt.t.bleed = (tgt.t.bleed || 0) + n; tgt.t.bleedBy = src.uid;
  X.bleedSrc = X.bleedSrc || {}; X.bleedSrc[src.uid] = src;
  fl(X, tgt.uid, "출혈 " + tgt.t.bleed, "debuff");
  lg(X, `[출혈 ${n}] ${C(tgt).name}에 출혈이 걸렸다 — 맞붙음이 끝날 때마다 체력 −${tgt.t.bleed}`, "sys");
}
/* 맞붙음이 끝난 뒤: 출혈 유닛마다 체력 −출혈. 쓰러진 유닛이 있으면 true(부른 곳이 치운다) */
function abBleedTick(X) {
  let any = false, died = false;
  for (const p of X.P) for (const u of liveUnits(p)) {
    const b = u.t.bleed; if (!(b > 0)) continue;
    any = true;
    // v3.74 마족 ↔ 천족 상극: [가호 N]은 출혈을 틱마다 N 줄인다(가호를 쓰지 않음 — 이미 썼어도). 보호막 · 바다의 보호는 여전히 못 막는다
    const w = Math.min(b, Math.max(0, u.t.ward || 0)), n = b - w;
    if (!n) { fl(X, u.uid, "가호 · 출혈 막음", "shield block"); lg(X, `[가호] ${C(u).name}이(가) 출혈 ${b}를 막았다`, "good"); continue; }
    u.t.dmg += n; fl(X, u.uid, "출혈 −" + n, "dmg");
    lg(X, `[출혈] ${C(u).name} 체력 −${n}${w ? ` (가호 −${w})` : ""}`, "bad");
    if (hpLeft(u) <= 0 && u.t.endure) { u.t.endure = false; u.t.dmg = u.t.h - 1; fl(X, u.uid, "불굴 ♥1", "shield"); lg(X, `[불굴] ${C(u).name}이(가) 체력 1로 버텼다`, "good"); continue; }
    if (hpLeft(u) <= 0) { u.t.alive = false; u.t.killer = u.t.bleedBy; u.t.bledOut = true; lgDeath(X, u); died = true; }
  }
  if (any) step(X, {}, 420);
  return died;
}
/* [그림자 걸음]: 맞붙어 받는 피해가 상대와의 레벨 차이만큼 바뀐다 — 나보다 레벨이 높은 유닛에게는 차이만큼 덜(0까지), 낮은 유닛에게는 차이만큼 더. 같은 레벨이면 그대로 (2026-11-22 사용자 결정) */
function abVeil(X, src, tgt, x) {
  if (!(x > 0) || !tgt.t.alive || !abilOf(tgt).veil) return x;
  const gap = C(src).lv - C(tgt).lv;
  if (!gap) return x;
  const y = Math.max(0, x - gap);
  fl(X, tgt.uid, gap > 0 ? "그림자 걸음 −" + (x - y) : "그림자 걸음 +" + (y - x), gap > 0 ? "miss" : "debuff");
  lg(X, `[그림자 걸음] ${C(tgt).name}이(가) ${C(src).name}에게 받는 피해 ${x} → ${y} (레벨 차이 ${Math.abs(gap)})`, gap > 0 ? "good" : "bad");
  return y;
}
/* [강탈]: 이 유닛이 상대 유닛을 쓰러뜨리면 내 다음 턴 에테르 + (쓰러뜨린 유닛 레벨의 절반(올림) — ABYSS.robCond · robGain).
   v3.65 사용자 결정: 생명을 채우던 것을 다음 턴 에테르로(직접 공격 보너스와 같은 p.bonus에 쌓임) */
function abRob(X, o, killer, v) {
  const A = abCfg(), lk = C(killer).lv, lv = C(v).lv;
  if ((A.robCond === "ge" && lv < lk) || (A.robCond === "le" && lv > lk)) return;
  const g = A.robGain === "lv" ? lv : A.robGain === "half" ? Math.ceil(lv / 2) : (+A.robGain || 0);
  if (!(g > 0)) return;
  o.bonus = (o.bonus || 0) + g;
  fl(X, "crys" + o.idx, "강탈 · 다음 턴 에테르 +" + g, "heal");
  lg(X, `[강탈] ${C(killer).name}이(가) ${C(v).name}을(를) 쓰러뜨려 ${o.name}의 다음 턴 에테르 +${g}`, "good");
}
/* [제물] (v3.65 · 2026-11-17 사용자 결정으로 바꿈): 마법이 낸 생명(cost.life)은 제물이다.
   그 마법이 겨눈 상대 유닛마다 [제물 증표](t.sac = 제물 번호들, 이번 턴)가 붙는다. 상대 유닛을 겨누지 않는 마법(아군 강화 · 되살리기 · 핸드)은
   그때 상대 맨 앞 유닛에 붙인다. 증표가 붙은 유닛이 이번 전투에서 쓰러지면(무엇에 쓰러지든) 그 마법에 바친 생명이 돌아오고,
   그 유닛 카드는 주인이 아니라 제물을 바친 쪽의 소각장으로 간다(uBury, t.sacTo). 한 마법의 제물은 한 번만 — 증표 유닛이 여럿이면 처음 쓰러진 것이 제물,
   나머지 유닛의 그 마법 증표는 힘을 잃는다. 돌아올 제물(증표 유닛이 살아 있는 제물)이 있는 동안은 생명이 0 아래여도 전투가 이어진다(runCombatCore dead) */
function abOfferOpen(X, caster, n, name) {
  X.offers = X.offers || [];
  X.offerNow = { id: X.offers.length, p: caster, n, name, uids: [], done: false };
  X.offers.push(X.offerNow);
}
function abMark(X, u) {
  const off = X.offerNow; if (!off || !u || !u.t || !u.t.alive || off.uids.includes(u.uid)) return;
  off.uids.push(u.uid);
  u.t.sac = (u.t.sac || []).concat(off.id);
  fl(X, u.uid, "제물 증표", "debuff");
  lg(X, `[제물 증표] ${C(u).name} — 쓰러지면 바친 생명을 되찾는다 (+${off.n})`, "sys");
}
function abOfferClose(X, caster) {
  const off = X.offerNow; if (!off || off.p !== caster) return;
  if (!off.uids.length) { const u = queueOf(X.P[1 - caster])[0]; if (u) abMark(X, u); }   // 상대 유닛을 겨누지 않은 마법: 상대 맨 앞 유닛
  X.offerNow = null;
}
function abOwed(X, i) {
  let n = 0;
  for (const off of X.offers || []) if (off.p === i && !off.done && X.P[1 - i].field.some(u => isUnit(u) && u.t.alive && off.uids.includes(u.uid))) n += off.n;
  return n;
}
function abOffer(X, o, v) {
  const ids = v.t.sac; if (!ids || !ids.length) return;
  let back = 0, to = null;
  const doneIds = [];
  for (const id of ids) { const off = (X.offers || [])[id]; if (!off || off.done || off.p !== o.idx) continue; off.done = true; back += off.n; to = off.p; doneIds.push(id); }
  if (to == null) return;
  for (const q of X.P) for (const u of q.field) if (isUnit(u) && u !== v && u.t && u.t.sac) { u.t.sac = u.t.sac.filter(id => !doneIds.includes(id)); if (!u.t.sac.length) delete u.t.sac; }   // 같은 마법의 다른 증표는 힘을 잃는다(칩도 지움)
  v.t.sacTo = to;
  const b = o.life; o.life = Math.min(RULES.lifeCap, o.life + back);
  fl(X, "life" + o.idx, "제물 +" + (o.life - b), "heal");
  lg(X, `[제물] ${C(v).name} 쓰러짐 — 제물이 받아들여졌다. ${o.name}의 생명 +${o.life - b}`, "good");
}

/* ---------- v3.68 푸른비늘 인어: 마력 공격 · 치유 · 바다의 보호 (카드 데이터는 js/mermaid.js) ----------
   [마력 공격 N] 맞붙을 때(공격 · 반격) 상대 방어 가운데 N까지는 막지 못하고 오히려 피해에 더해진다.
     공 4 → 방 3(N ≥ 3): 4 + 3 = 7. 방 0인 상대에게는 보통 공격과 같다. 옛 마력 공격(방어를 무시)은 [방어무시](magic, 2026-11-16부터 수치 없이 전부).
   [치유 N] 맞붙음(공격 · 반격)에서 살아남으면 받은 피해를 N만큼 채운다(원래 체력까지). 한 턴에 여러 번 맞붙으면 그때마다.
   [바다의 보호 N] 오라: 이 유닛이 전장에 살아 있는 동안 양옆 N칸 안의 아군 유닛(마법 칸은 세지 않음)이 받는 피해 −1.
     맞붙음 · 마법 · 가시 모두. 한 번 쓰고 사라지지 않는다. 오라가 여럿이면 더한다. */
const MR_CALM_CUT = 1;
function mrArc(a, d, n, charm) {   // charm: 상대가 [홀림]이면 N과 상관없이 방어 전부(v3.78)
  // v3.95 (사용자): [마력 공격 N]은 상대 방어에 막히지 않고, 상대 방어(N까지 · 홀리면 전부)를 공격에 더해 체력을 깎는다. 공 5 · 방 2(N ≥ 2) → 7. 반격에는 붙지 않는다(attackOne)
  if (!(n > 0 && a > 0)) return { dmg: hit(a, d), bonus: 0 };
  const bonus = charm ? Math.max(0, d) : Math.min(n, Math.max(0, d));
  return { dmg: a + bonus, bonus };
}
/* v3.78 [홀림]: 인어의 환상에 걸린 상대 유닛(이번 턴). 코인을 뒷면으로 만드는 마법(clean) · 공방 교환(swap) · 공체 교환(swapSt · randSwap) ·
   자리 바꿈(swapPos · sortFoe에서 자리가 바뀐 유닛) · 환각(confuse). [마력 공격 N]은 홀린 상대에게 N과 상관없이 방어 전부를 피해에 더한다.
   t.charm은 resetTurn이 t를 새로 만들 때 사라진다. 무작위 없음 */
function mrCharm(X, u) {
  if (!u || !u.t || !u.t.alive || u.t.charm) return;
  u.t.charm = true; fl(X, u.uid, "홀림", "debuff");
}
function mrCalm(X, u) {
  if (!X || !X.P) return 0;
  const p = X.P.find(q => q.field.includes(u)); if (!p) return 0;
  const us = p.field.filter(it => isUnit(it) && it.t && it.t.alive), i = us.indexOf(u); if (i < 0) return 0;
  let cut = 0;
  us.forEach((v, j) => { if (v === u) return; const r = abilOf(v).calm; if (r > 0 && Math.abs(i - j) <= r) cut += MR_CALM_CUT; });
  return Math.max(cut, ((u.t.au && u.t.au.calm) || 0) * MR_CALM_CUT)   // 2026-11-15 이번 턴 받은 [바다의 보호]는 인어 레어가 쓰러져도 남는다(rareAuraSync가 t.au.calm에 적음)
    + (u.t.calmT || 0) * MR_CALM_CUT;   // v3.95 인어 물의 장막(mrVeil)이 이번 턴 걸어 준 몫 — 오라와 따로 더한다(t.calmT, resetTurn이 지움)
}
function mrHeal(X) {
  const xs = X.clash; X.clash = null; if (!xs) return;
  for (const u of xs) {
    if (!u || !u.t || !u.t.alive || u.t.dmg <= 0) continue;
    const n = abilOf(u).heal; if (!n) continue;
    abilPieces(u, "heal", n).forEach((m, i) => {   // v3.84 [치유]가 여러 칸이면 칸마다 따로
      if (u.t.dmg <= 0) return;
      if (i) step(X, { tgt: u.uid }, PIECE_MS);
      const r = Math.min(m, u.t.dmg); u.t.dmg -= r;
      fl(X, u.uid, "치유 +" + r, "heal"); lg(X, `[치유] ${C(u).name}의 체력 +${r}`, "good");
    });
  }
}

/* v3.89 물의 몸: 마렌시아의 노래(G3) 카드인 유닛은 받는 [화상]이 붙을 때마다 1 줄어든다(0이면 안 붙음) — gbScorch.
   빼앗은 · 넘어온 유닛도 카드 깃발로 본다. 무작위 없음 */
const MR_WET_CUT = 1;
const mrWet = u => !!(u && isUnit(u) && C(u) && (C(u).g === "G3" || /(^|-)G3(-|$)/.test(u.id)));
/* v3.68 인어 마법 효과 (카드는 js/mermaid.js)
   randSwap { n }: 상대 유닛 가운데 무작위 n기의 공격과 (남은) 체력을 맞바꾼다 — 판 시드(RNG)로 고른다. 공격이 0이던 유닛은 체력 0이 되어 쓰러진다.
   mindCapture: 이 마법 바로 뒤 내 카드와 이름 글자 수(띄어쓰기 빼고)가 같은 상대 카드 가운데 맨 앞 1장을 빼앗는다(유닛 · 아직 발동하지 않은 마법).
     유닛은 판이 끝날 때까지 내 유닛(쓰러지면 원래 주인의 소각장), 마법은 내 마법으로 발동한다. 뒤에 카드가 없거나 같은 글자 수가 없으면 헛것.
   sortFoe: 상대 유닛을 (방어 + 남은 체력)이 높은 순으로 맨 앞부터 다시 세운다. 마법 칸은 그대로, 같으면 원래 차례.
     asc: 낮은 순. by:"hp": 방어는 빼고 남은 체력만 본다(v3.95 오크 사냥감 몰이). */
const mrNameLen = c => String(c.name || "").replace(/\s/g, "").length;
Object.assign(SPELL_OPS, {
  randSwap(X, caster, it, k, op) {
    const L = liveUnits(X.P[1 - caster]).slice(), pick = [];
    while (L.length && pick.length < (op.n || 1)) pick.push(L.splice(Math.floor(RNG() * L.length), 1)[0]);
    if (!pick.length) { lg(X, "공격과 체력을 바꿀 상대 유닛이 없다", "sys"); return; }
    for (const u of pick) { setStats(X, u, { a: Math.max(0, hpLeft(u)), h: Math.max(0, u.t.a) }, "공체 교환"); mrCharm(X, u); }
  },
  mindCapture(X, caster, it, k, op) {
    const p = X.P[caster], o = X.P[1 - caster];
    const s = it.echo ? -1 : p.field.indexOf(it), bk = s >= 0 ? p.field[s + 1] : null;
    if (!bk || (isUnit(bk) && !(bk.t && bk.t.alive))) { lg(X, "이 마법 바로 뒤에 카드가 없어 환각이 닿지 않았다", "sys"); fl(X, it.uid, "뒤에 카드 없음", "miss"); return; }
    const n = mrNameLen(C(bk));
    const tg = o.field.find(c => c && (isUnit(c) ? c.t && c.t.alive && !nwFirm(c) : (X.pend || []).some(q => q.it === c)) && mrNameLen(C(c)) === n);   // v3.74 [굳건] 유닛은 붙잡히지 않는다
    if (!tg) { lg(X, `이름이 ${n}글자인 상대 카드가 없어 환각이 닿지 않았다 (뒤 카드 ${C(bk).name})`, "sys"); fl(X, it.uid, `${n}글자 없음`, "miss"); return; }
    lg(X, `[환각의 통제] 뒤 카드 ${C(bk).name}(${n}글자) — 같은 글자 수의 ${C(tg).name}을(를) 붙잡는다`, "spell");
    const before = o.field.includes(tg);
    stealCard(X, caster, it, tg);
    if (before && !o.field.includes(tg) && isUnit(tg)) { tg.tokTemp = false; if (tg.t) tg.t.stolen = false; fl(X, tg.uid, "포획", "debuff"); }   // 판이 끝날 때까지 내 유닛
  },
  /* v3.89 mrPurge { area }: 아군에게 이번 턴 [정화] — 지금 붙은 화상 · 불씨 · 계약의 낙인을 바로 지우고(전투 시작의 정화는 이미 지나서),
     이번 턴 [출혈]이 붙지 않는다(abilOf purify). 다음 턴에는 남지 않는다 */
  mrPurge(X, caster, it, k, op) {
    const L = pickTargets(X, caster, "ally", op.area || { t: "all" }, k);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    for (const u of L) {
      u.t.gx = mergeAbil(u.t.gx || {}, { purify: true }); u.t.noBleed = true;   // v3.90 출혈 막기는 이 마법의 [정화]에만(t.noBleed — 유닛의 [정화]는 이제 출혈을 막지 않는다)
      const kp = u.t.keep, had = [];
      if (kp) {
        if (kp.scorch > 0) { had.push("화상 " + kp.scorch); kp.scorch = 0; kp.scorchT = null; kp.burns = []; }
        if (kp.ember != null) { had.push("불씨"); kp.ember = null; }
        if (kp.brand) { had.push("낙인"); kp.brand = false; }
        had.push(...a1CurseWash(u));   // v3.95 [정화]는 [저주]를 씻는다
      }
      fl(X, u.uid, had.length ? "정화 · " + had.join(" · ") : "정화", "heal");
      if (had.length) lg(X, `[정화] ${C(u).name}의 ${had.join(" · ")}을(를) 씻었다`, "good");
    }
  },
  /* v3.95 mrVeil { area, n }: 아군에게 이번 턴 [바다의 보호] — 받는 피해 −n(맞붙음 · 마법 · 가시 모두, mrCalm이 t.calmT를 더함).
     오라가 아니라 옆으로 번지지 않는다. 다음 턴에는 남지 않는다(인어 물의 장막 SG3-03) */
  mrVeil(X, caster, it, k, op) {
    const L = pickTargets(X, caster, "ally", op.area || { t: "front", n: 2 }, k);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    const n = op.n || 1;
    for (const u of L) { u.t.calmT = (u.t.calmT || 0) + n; fl(X, u.uid, "바다의 보호 −" + n, "shield"); }
    lg(X, `[물의 장막] ${L.map(u => C(u).name).join(" · ")} — 이번 턴 받는 피해 −${n}`, "good");
  },
  sortFoe(X, caster, it, k, op) {
    const o = X.P[1 - caster], slots = [], us = [];
    o.field.forEach((c, i) => { if (isUnit(c) && c.t && c.t.alive && !nwFirm(c)) { slots.push(i); us.push(c); } });   // v3.74 [굳건] 유닛은 제자리(나머지만 다시 세운다)
    if (us.length < 2) { lg(X, "상대 유닛이 둘보다 적어 물길이 바뀌지 않았다", "sys"); return; }
    const byHp = op.by === "hp", w = u => byHp ? hpLeft(u) : u.t.d + hpLeft(u), sg = op.asc ? -1 : 1,   /* v3.95 오크 by:"hp": 남은 체력만 본다(사냥감 몰이) */ sorted = us.map((u, i) => [u, i]).sort((a, b) => sg * (w(b[0]) - w(a[0])) || (a[1] - b[1])).map(x => x[0]);   // v3.82 asc: 낮은 순(사냥감 몰이)
    slots.forEach((s, i) => { o.field[s] = sorted[i]; if (sorted[i] !== us[i] && !op.asc) mrCharm(X, sorted[i]); });   // v3.78 자리가 바뀐 유닛은 [홀림](인어 뒤바뀐 물길만)
    lg(X, `상대 유닛을 ${byHp ? "남은 체력이" : "방어 + 체력이"} ${op.asc ? "낮은" : "높은"} 순으로 다시 세웠다: ${sorted.map(u => `${C(u).name}(${w(u)})`).join(" → ")}`, "sys");
    fl(X, sorted[0].uid, "맨 앞으로", "debuff");
    step(X, {}, 520);
  }
});

/* ---------- v3.69 레어 오라 (카드 데이터는 js/rares.js, 설계 docs/FLAG_IDENTITY_draft.md) ----------
   레어 유닛은 스탯과 오라만 가진다(gift.aura = 오라 범위). 이 유닛이 전장에 살아 있는 동안 양옆 N칸 안의 아군 유닛
   (마법 칸은 세지 않음, 자기는 빼고)에게 깃발마다 정한 것을 준다(RARE_AURA): 방어 · 공격 · 가호 · 가시는 수치 +, 사격 · 증폭 · 방어무시는 수치 +(없으면 생김), 흡혈은 부여.
   오크 [격노의 함성]은 내 전장에 [치명] 또는 [관통] 유닛(레어 자신은 둘 다 없음, 마법이 걸어 준 것도 셈)이 하나라도 있을 때만(2026-11-16 관통도 셈).
   오라가 여럿이면 더한다(인어 [바다의 보호]와 같다). 표시(▼ · 고정)가 막는 스탯은 오르지 않는다.
   셈은 t.au에 적고, 스탯 · 가호 · 가시는 지난번 몫과의 차이만 t에 더하거나 뺀다(resetTurn이 t를 새로 만들면 처음부터).
   전투가 시작될 때 · 치운 뒤(sweep) · 기록(step)마다 다시 센다 — 쓰러져 이웃이 바뀌면 오라도 옮겨 간다. 무작위 없음. */
function rareAuraSync(X, live) {   // live: 준비 단계(js/game.js prepAura) — 지금 칸 그대로 센다(남기지 않음). 카드를 옮기고 소각할 수 있어서
  if (!X || !X.P || typeof RARE_AURA === "undefined") return;
  for (const p of X.P) {
    // 빠른 길: 오라는 레어 카드의 gift에만 있다(아이템 · 마법이 주지 않음). 오라 유닛도, 지난번에 받은 몫(t.au)도 없으면 셀 것이 없다 —
    // step마다 불리고 컴퓨터 어려움의 미리 굴리기(hardEval) 안에서도 돌아서, abilOf를 부르지 않고 넘어가야 느려지지 않는다
    let need = false;
    for (const it of p.field) if (it && it.t && isUnit(it) && (it.t.au || (C(it).gift && (C(it).gift.aura > 0 || C(it).gift.calm > 0)))) { need = true; break; }
    if (!need) continue;
    const us = p.field.filter(it => isUnit(it) && it.t && it.t.alive);
    const want = us.map(() => ({})), srcs = us.map(() => []), bys = us.map(() => []);   // bys: 준 레어마다 { u: uid, g: 깃발 · "calm", n: 이름, e: 준 것 } — 마우스를 올리면 "오라 [격노의 함성] +2 (카르노를 쫓는 자)"
    let critOn = null;
    us.forEach((r, i) => {
      const g = C(r).gift || {};
      if (g.calm > 0) us.forEach((v, j) => { if (v !== r && Math.abs(i - j) <= g.calm) { want[j].calm = (want[j].calm || 0) + 1; srcs[j].push("calm"); bys[j].push({ u: r.uid, g: "calm", n: C(r).name, e: { calm: 1 } }); } });   // 인어 레어 [바다의 보호] (mrCalm)
      const n = g.aura || 0; if (!(n > 0)) return;
      const A = RARE_AURA[C(r).group]; if (!A) return;
      if (A.need === "crit") { if (critOn === null) critOn = us.some(v => { const b = abilOf(v); return b.crit || b.shred; }); if (!critOn) return; }
      us.forEach((v, j) => {
        if (v === r || Math.abs(i - j) > n) return;
        const w = want[j];
        for (const k in A.eff) { const e = A.eff[k]; if (e === true) w[k] = true; else w[k] = (w[k] || 0) + e; }
        srcs[j].push(C(r).group); bys[j].push({ u: r.uid, g: C(r).group, n: C(r).name, e: A.eff });
      });
    });
    // 2026-11-15 전투가 시작된 뒤 한 번 받은 오라는 그 턴이 끝날 때까지 남는다(레어가 쓰러지거나 칸이 바뀌어 범위를 벗어나도 줄지 않음, 더 커지면 커진 만큼).
    //   준비 단계(live)에서는 지금 칸 그대로 — 준비하는 동안에도 카드 숫자 · 오라 칩에 보인다.
    //   resetTurn이 t를 새로 만들면 처음부터. 받은 오라 이름(src: 깃발 열쇠 · "calm")은 전장 카드의 오라 칩(js/game.js auraChipsHTML)이 읽는다
    us.forEach((u, j) => {
      const old = u.t.au || {}, w = want[j], pm = pinModes(u), keep = live ? {} : old, tv = {};
      for (const k in keep) if (k !== "src" && k !== "by" && keep[k] && !(k in w)) w[k] = keep[k];
      for (const k in w) if (k !== "a" && k !== "d" && typeof w[k] === "number" && typeof keep[k] === "number") w[k] = Math.max(w[k], keep[k]);
      for (const k of ["a", "d"]) {
        const nv = (pm[k] === "L" || pm[k] === "D") ? 0 : Math.max(w[k] || 0, keep[k] || 0), dv = nv - (old[k] || 0);
        if (dv) { u.t[k] += dv; tv[k] = dv; }
        if (nv) w[k] = nv; else delete w[k];
      }
      for (const k of ["ward", "thorns"]) { const dv = (w[k] || 0) - (old[k] || 0); if (dv) { const b = u.t[k] || 0; u.t[k] = Math.max(0, b + dv); if (u.t[k] !== b) tv[k] = u.t[k] - b; } }
      const src = (keep.src || []).slice(); for (const g of srcs[j]) if (!src.includes(g)) src.push(g);
      const by = (keep.by || []).slice(); for (const b of bys[j]) if (!by.some(x => x.u === b.u && x.g === b.g)) by.push(b);
      if (Object.keys(w).length) { if (src.length) w.src = src; if (by.length) w.by = by; u.t.au = w; } else u.t.au = null;
      // 2026-11-16 전투 중(live 아님) 오라가 새로 켜지거나 커지면 연출로 남긴다(auraNote) — step이 그 수를 기록한 뒤 "오라 ⚔+2" 수를 따로 보인다
      if (!live && X.rec) auraNote(X, u, old, w, tv, bys[j]);
    });
  }
}

/* 2026-11-16 전투 중 오라 연출 기록: 이번 셈에서 새로 생기거나 커진 몫(d)과 실제로 바뀐 t(tv), 바뀌기 전 t.au(prev).
   같은 유닛이 step 전에 여러 번 바뀌면(sweep → step) 하나로 합친다. 화면용 기록일 뿐 판 상태는 건드리지 않는다 */
const AURA_FL_KO = { ward: "가호", thorns: "가시", snipe: "사격", amp: "증폭", magic: "방어무시", leech: "흡혈", calm: "바다의 보호" };
function auraNote(X, u, old, w, tv, by) {
  const d = {};
  for (const k in w) {
    if (k === "src" || k === "by") continue;
    if (typeof w[k] === "number") { const dv = w[k] - (typeof old[k] === "number" ? old[k] : 0); if (dv > 0) d[k] = dv; }
    else if (w[k] === true && !old[k]) d[k] = true;
  }
  if (!Object.keys(d).length && !Object.keys(tv).length) return;
  // d가 비어도(표시가 막아 수치만 되돌림 등) 남긴다 — 글자 없이 그림만 맞춘다
  const bl = by.map(b => ({ u: b.u, nm: b.g === "calm" ? "바다의 보호" : (RARE_AURA[b.g] ? RARE_AURA[b.g].n : "오라") }));
  X.auraFx = X.auraFx || [];
  const n = X.auraFx.find(z => z.uid === u.uid);
  if (!n) { X.auraFx.push({ uid: u.uid, name: C(u).name, d, tv: Object.assign({}, tv), prev: Object.keys(old).length ? JSON.parse(JSON.stringify(old)) : null, by: bl }); return; }
  for (const k in d) n.d[k] = d[k] === true ? true : (typeof n.d[k] === "number" ? n.d[k] : 0) + d[k];
  for (const k in tv) n.tv[k] = (n.tv[k] || 0) + tv[k];
  for (const b of bl) if (!n.by.some(x => x.u === b.u)) n.by.push(b);
}
/* "오라 ⚔+2" · "오라 ⛨+1" · "오라 · 흡혈" · "오라 · 가시 +1" (떠오르는 글자 → js/game.js floatAt 명판, cls "aura") */
function auraFloatText(d) {
  const st = ["a", "d"].filter(k => typeof d[k] === "number").map(k => (k === "a" ? "⚔" : "⛨") + "+" + d[k]).join(" ");
  if (st) return "오라 " + st;
  const k = Object.keys(d).find(z => AURA_FL_KO[z]);
  if (!k) return "오라";
  return "오라 · " + AURA_FL_KO[k] + (d[k] === true || k === "magic" ? "" : " +" + d[k]);
}

/* ---------- v3.70 바람 궁수 엘프 (카드 데이터는 js/elf.js) ----------
   retreat { ab }: 내 맨 앞 유닛(칸 순, [수호] 무시)이 내 전장 맨 뒤로 물러선다(후퇴) — 그 뒤 유닛이 맨 앞에 선다.
     공격 턴이면 물러선 유닛은 맨 뒤 차례에 공격하고, 방어 턴이면 앞의 아군이 모두 쓰러질 때까지 맞지 않는다.
     ab가 있으면 물러선 유닛에게 이번 턴 그 능력(grant와 같음). 내 유닛이 하나뿐이면 물러서지 않고 능력만 받는다.
   volley { x, skip }: 상대 대기열 맨 앞 skip기(기본 1)를 뺀 나머지 상대 유닛 모두에게 피해 x — 뒷줄을 노리는 화살.
     [증폭]은 맞는 유닛마다 더한다. 무작위 없음. */
Object.assign(SPELL_OPS, {
  retreat(X, caster, it, k, op) {
    const p = X.P[caster], u = liveUnits(p)[0];
    if (!u) { lg(X, "아군 유닛이 없어 물러설 자가 없다", "sys"); return; }
    if (op.ab) { u.t.gx = mergeAbil(u.t.gx || {}, op.ab); fl(X, u.uid, grantLabel(op), "buff"); }
    if (liveUnits(p).length < 2) { lg(X, `${C(u).name} 뒤에 설 아군이 없어 물러서지 않았다`, "sys"); return; }
    const xs = p.field.filter(c => c && c !== u); xs.push(u);
    p.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    if (X.pend) for (const q of X.pend) q.k = q.p.field.indexOf(q.it) + 1;
    fl(X, u.uid, "후퇴", "shield");
    lg(X, `[후퇴] ${C(u).name}이(가) 맨 뒤(${xs.length}번 칸)로 물러섰다`, "sys");
    step(X, {}, 520);
  },
  volley(X, caster, it, k, op) {
    const o = X.P[1 - caster], amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    const L = uEyeFilter(X, o, queueOf(o).slice(op.skip == null ? 1 : op.skip));
    if (!L.length) { lg(X, "맨 앞 뒤에 상대 유닛이 없어 화살이 닿지 않았다", "sys"); return; }
    for (const u of L) if (u.t.alive) hurt(X, u, spellDmg(X, u, op.x, amp));
    step(X, {}, 300);
  }
});

/* ---------- v3.73 잿불 고블린 (카드 데이터는 js/goblin.js) ----------
   화상(v3.88): 유닛의 keep.burns = [{ n, t, by }] — [화상 N]이 [가시]처럼 따로따로 쌓인다(N이 더해지지 않음). n 수치 · t 붙은 턴 · by 붙인 유닛 uid.
     keep.scorch = 모두 더한 값 · keep.scorchT = 마지막으로 붙은 턴(다른 규칙이 읽는 값: 재생 멈춤 · [정화] · [불꽃 사냥]). 다른 곳이 scorch를 0으로 지우면 burns도 꺼진다(gbBurns).
     전투가 시작될 때(gbBurnTick, 불씨 다음 · 첫 마법 전) 지난 턴까지 붙은 [화상 N]마다 체력 −N(방어 무시 — 보호막 · 가호 · 바다의 보호는 막음) 뒤 꺼지고,
     N이 2 이상이면 양옆 아군 유닛(대기열 바로 앞 · 뒤)에게 [화상 N−1]이 옮겨붙는다(옮겨붙은 화상은 다음 턴에 터짐). 화상으로 쓰러지면 처음 붙인 유닛이 쓰러뜨린 것으로 친다.
   [점화 N](ignite): 내 공격 차례에 맞붙기 바로 전에(사격과 같은 때) 남은 체력이 가장 높은 상대 유닛(같으면 앞)에게 [화상 N]. 피해는 없다.
   [화염 갑주 N](farmor): 이 유닛을 맞붙어 공격한 상대 유닛에게 [화상 N](공격자가 살아 있으면. v3.88 원거리 공격자는 빼고 — 사용자 결정).
   마법 효과: scorch { side, area, n } [화상 n] · detonate { bonus } 상대 유닛의 화상을 지금 모두 터뜨린다(화상마다 피해 + 유닛마다 bonus, 번짐도 그대로) ·
     scorchMod { side, area, a } 그 범위에서 화상이 있는 유닛만 공격 +a · gbKegs { n } 화약통 깔기 · gbBlast { per, n } 화약고 폭파. 무작위 없음. */
function gbBurns(u) {   // 지금 붙은 화상 목록(옛 기록 · 숫자만 고친 경우를 하나로 맞춤)
  const k = uK(u);
  if (!(k.scorch > 0)) { k.burns = []; k.scorch = 0; k.scorchT = null; return k.burns; }
  const sum = Array.isArray(k.burns) ? k.burns.reduce((a, b) => a + b.n, 0) : -1;
  if (sum !== k.scorch) k.burns = [{ n: k.scorch, t: k.scorchT == null ? -1 : k.scorchT, by: k.scorchBy != null ? k.scorchBy : null }];
  return k.burns;
}
function gbSync(u) {
  const k = uK(u), L = k.burns || [];
  k.scorch = L.reduce((a, b) => a + b.n, 0);
  if (!k.scorch) { k.burns = []; k.scorchT = null; } else k.scorchT = L.reduce((m, b) => Math.max(m, b.t), -1);
}
const gbBurnText = u => gbBurns(u).map(b => "화상 " + b.n).join(" · ");
function gbScorch(X, u, n, by, cls) {   // cls: 떠오르는 글자에 덧붙일 갈래(소리 고르기용, 예: [화염 갑주] "farmor" · 번짐 "spread")
  if (!u || !u.t || !u.t.alive || !(n > 0)) return;
  if (mrWet(u)) { n -= MR_WET_CUT; if (!(n > 0)) { fl(X, u.uid, "물에 꺼짐", "miss"); lg(X, `[화상] ${C(u).name}은(는) 물의 몸이라 불이 붙지 않았다`, "sys"); return; } }   // v3.89 마렌시아의 노래 유닛은 화상 −1
  const L = gbBurns(u); L.push({ n, t: X.turn, by: by != null ? by : null }); gbSync(u);
  if (by != null) uK(u).scorchBy = by;
  fl(X, u.uid, "화상 " + n, "debuff" + (cls ? " " + cls : ""));
  lg(X, `[화상 ${n}] ${C(u).name}${cls === "spread" ? "에 불이 번졌다" : ""} (${gbBurnText(u)}) — 다음 턴 전투가 시작될 때 터진다`, "sys");
}
function gbIgnite(X, u, tg) {   // v3.92 [점화 N]: 공격한 상대에 [화상 N] (예전: 맞붙기 전에 체력이 가장 높은 상대를 겨눔)
  const n0 = abilOf(u).ignite;
  if (!(n0 > 0) || !tg || !tg.t.alive) return;
  abilPieces(u, "ignite", n0).forEach((n, i) => {   // v3.84 [점화]가 여러 칸이면 칸마다 따로 붙는다
    if (i) step(X, { tgt: tg.uid }, PIECE_MS);
    lg(X, `${C(u).name}의 [점화 ${n}] → ${C(tg).name}`);
    gbScorch(X, tg, n, u.uid, "ignite");   // "ignite" = 효과음을 [점화] 불씨로 (game.js floatSfx)
  });
}
function gbArmor(X, Au, Du) {
  const n0 = abilOf(Du).farmor;
  if (!(n0 > 0) || !Au.t.alive || abilOf(Au).ranged) return;   // v3.88 원거리 공격자에게는 옮겨붙지 않는다
  abilPieces(Du, "farmor", n0).forEach((n, i) => {   // v3.84 [화염 갑주]가 여러 칸이면 칸마다 따로
    if (i) step(X, { tgt: Au.uid }, PIECE_MS);
    lg(X, `[화염 갑주 ${n}] ${C(Du).name}을(를) 친 ${C(Au).name}에 불이 옮겨붙었다`, "sys");
    gbScorch(X, Au, n, Du.uid, "farmor");
  });
}
/* 화상 터뜨리기: 고른 [화상]들이 체력을 깎고 꺼진 뒤, N ≥ 2면 양옆에 [화상 N−1]. due(b) = 이번에 터질 화상인지. extra = 유닛마다 한 번 더하는 피해(기폭) */
function gbBurnUnits(X, p, units, due, extra) {
  const Q = queueOf(p), jobs = [];
  for (const u of units) {
    if (!u.t.alive) continue;
    const L = gbBurns(u), go = L.filter(due);
    if (!go.length && !extra) continue;
    uK(u).burns = L.filter(b => !go.includes(b)); gbSync(u);
    const i = Q.indexOf(u);
    jobs.push({ u, go, nb: [Q[i - 1], Q[i + 1]].filter(Boolean) });
  }
  for (const j of jobs) {
    const u = j.u, o = X.P.find(q => q !== p);
    j.go.concat(extra ? [{ n: extra, by: null, bonus: true }] : []).forEach((b, i) => {
      if (!u.t.alive) return;
      if (i) step(X, { tgt: u.uid }, PIECE_MS);
      lg(X, b.bonus ? `[기폭] ${C(u).name} 체력 −${b.n} 더` : `[화상 ${b.n}] ${C(u).name}의 화상이 터졌다 — 체력 −${b.n}`, "bad");
      hurt(X, u, b.n, "화상");
      if (!u.t.alive && b.by != null && o && o.field.some(x => x && x.uid === b.by)) u.t.killer = b.by;
    });
  }
  for (const j of jobs) for (const b of j.go) if (b.n >= 2) for (const v of j.nb) gbScorch(X, v, b.n - 1, b.by, "spread");
  return jobs.length > 0;
}
function gbBurn(X, p, u, extra) { gbBurnUnits(X, p, [u], () => true, extra); }   // 옛 이름(기폭 · 다른 규칙이 부름)
function gbBurnTick(X, sweep) {
  let any = false;
  for (const p of X.P) any = gbBurnUnits(X, p, liveUnits(p), b => b.t < X.turn) || any;
  if (any) { step(X, {}, 420); sweep(); }
}
/* v3.88 화약통 깔기(TK-U-BOMB, keep.face = 화상 수치): 터질 때 마주 보는 상대 유닛(대기열 같은 차례, 없으면 가장 가까운 뒤쪽 유닛)에게 [화상 face] */
function gbKegFace(X, p, keg) {   // 화약통의 차례 = 아군 전장 유닛 가운데 몇째인지(먼저 터진 화약통도 센다 — 같은 때 터지므로)
  const o = X.P.find(q => q !== p), Q = queueOf(o);
  if (!Q.length) return null;
  const col = Math.max(0, p.field.filter(x => isUnit(x) && x.t && (x.t.alive || x.id === "TK-U-BOMB")).indexOf(keg));
  return Q[Math.min(col, Q.length - 1)];
}
function gbKegBurst(X, p, keg) {
  const k = uK(keg), o = X.P.find(q => q !== p);
  if (k.face > 0) {
    const tg = gbKegFace(X, p, keg);
    lg(X, `[화약통] 불붙은 화약통이 터졌다 → ${tg ? C(tg).name : "맞은 유닛 없음"}`, "bad");
    step(X, tg ? { act: keg.uid, tgt: tg.uid } : { act: keg.uid }, 360);
    if (tg && !uEyeDodge(X, o, tg)) gbScorch(X, tg, k.face, null);
  } else {
    const tg = queueOf(o).slice(0, 3);
    lg(X, `[시한 화약] 불붙은 화약통이 터졌다 → ${tg.map(x => C(x).name).join(" · ") || "맞은 유닛 없음"}`, "bad");
    for (const x of tg) hurt(X, x, 3, "화약");
  }
  keg.t.alive = false;
  step(X, { act: keg.uid, hit: true }, 420);
}
Object.assign(SPELL_OPS, {
  scorch(X, caster, it, k, op) {
    let L = pickTargets(X, caster, op.side || "foe", op.area, k);
    if ((op.side || "foe") === "foe") L = uEyeFilter(X, X.P[1 - caster], L);
    for (const u of L) gbScorch(X, u, op.n || 1, null);
  },
  detonate(X, caster, it, k, op) {
    const o = X.P[1 - caster];
    const L = liveUnits(o).filter(u => u.t.keep && u.t.keep.scorch > 0);
    if (!L.length) { lg(X, "화상이 붙은 상대 유닛이 없다", "sys"); return; }
    gbBurnUnits(X, o, L, () => true, op.bonus || 0);
    step(X, {}, 360);
  },
  /* v3.88 화약통 깔기: 이 마법 자리와 아군 빈 칸마다 불붙은 화약통(0/0/2, 공격 · 반격 안 함). 다음 턴 첫 공격 전에 터져 마주 보는 상대에게 [화상 n] */
  gbKegs(X, caster, it, k, op) {
    const p = X.P[caster]; let n = 0;
    const own = it.echo ? -1 : p.field.indexOf(it);
    for (let s = 0; s < p.field.length; s++) {
      if (p.field[s] !== null && s !== own) continue;
      const u = { uid: tokUid(X), id: "TK-U-BOMB", item: null, summoned: X.turn };
      resetTurn(u); u.t.keep = { fuse: X.turn, face: op.n || 3 };
      if (s === own) X.tokFrom = it.uid;
      p.field[s] = u; X.toks[u.uid] = u.id; n++;
      fl(X, u.uid, "화약통", "buff");
    }
    lg(X, n ? `[화약통 깔기] 불붙은 화약통 ${n}개 — 다음 턴 첫 공격 전에 터져 마주 보는 상대 유닛에게 [화상 ${op.n || 3}]` : "화약통을 놓을 빈 칸이 없다", n ? "good" : "sys");
    if (n) step(X, { conjure: p.field.filter(x => x && x.id === "TK-U-BOMB" && x.summoned === X.turn).map(x => x.uid)[0] }, 650);
  },
  /* v3.88 화약고 폭파(사용자 설계): 아군 화약통 N개를 모두 터뜨려 부순다(화약통마다의 화상은 없음).
     상대 맨 앞부터 N기에게 체력 −N² · [화상 n](기본 2), 아군 유닛 전체에게 체력 −N(부서진 화약통 자신은 이미 없으므로 맞지 않음). 화약통이 없으면 아무 일도 없다 */
  gbBlast(X, caster, it, k, op) {
    const p = X.P[caster], o = X.P[1 - caster];
    const kegs = liveUnits(p).filter(u => u.id === "TK-U-BOMB"), n = kegs.length;
    if (!n) { lg(X, "[화약고 폭파] 터뜨릴 화약통이 없다", "sys"); return; }
    for (const kg of kegs) { kg.t.alive = false; fl(X, kg.uid, "폭발", "debuff"); }
    step(X, { shatter: kegs.map(x => x.uid) }, 420);
    const L = uEyeFilter(X, o, queueOf(o).slice(0, n)), mine = liveUnits(p);
    lg(X, `[화약고 폭파] 화약통 ${n}개가 한꺼번에 터졌다 → ${L.map(x => C(x).name).join(" · ") || "맞은 상대 없음"} 체력 −${n * n} · [화상 ${op.n || 2}], 아군 전체 체력 −${n}`, "bad");
    for (const tg of L) { if (!tg.t.alive) continue; step(X, { tgt: tg.uid }, 220); hurt(X, tg, n * n, "화약"); gbScorch(X, tg, op.n || 2, null); }
    for (const u of mine) if (u.t.alive) hurt(X, u, n, "화약");
    step(X, {}, 360);
  },
  scorchMod(X, caster, it, k, op) {
    for (const u of pickTargets(X, caster, op.side || "foe", op.area, k)) {
      if (!(u.t.keep && u.t.keep.scorch > 0)) continue;
      const b = u.t.a; u.t.a += op.a || 0; applyFloor(u);
      const d = u.t.a - b; fl(X, u.uid, d ? "⚔" + sgnNum(d) : (u.t.floor && u.t.floor.a ? PIN_KO[u.t.floor.a.m] + " 공격" : "그대로"), d < 0 ? "debuff" : d ? "buff" : "miss");
    }
  }
});

/* ---------- v3.74 새 능력 (카드 데이터는 js/newabil.js, 사전 docs/ABILITIES.md 7장) ----------
   [재생 N](regen, 트롤): 전장에서 맞붙음이 하나 시작될 때마다 살아 있는 이 유닛은 받은 피해를 N 채우고(원래 체력까지),
     이번 턴 깎인 방어를 N 되돌린다(카드 기준 방어 t.rb.d까지). 화상(keep.scorch) · 불씨(keep.ember)가 붙어 있으면 재생하지 않는다(트롤은 불에 약하다).
     체력 ▼눌림이면 체력은 차지 않는다(흡혈과 같음). 받은 피해는 어차피 턴이 끝나면 낫기 때문에 전투 도중에만 뜻이 있다.
     2026-11-22(사용자): 마법으로 체력이 깎인 유닛은 그 마법 바로 다음 맞붙음의 재생을 한 번 쉰다 — 누구의 마법이든(고목 내려찍기 · 수액 몰아주기로 낸 체력도,
     상대 마법 피해도). castSpell이 발동 앞뒤의 남은 체력을 견줘 t.regenHold를 켜고(nwHpMark · nwRegenHold), 다음 nwRegenTick이 끄면서 그 유닛만 건너뛴다. 그다음 맞붙음부터는 예전대로.
   [방패 반격](bash, 드워프): 반격할 때 피해에 지금 방어를 더한다(attackOne 반격 줄). 공격할 때는 보통.
   [수호](taunt, 드워프): 마법 [수호]와 같은 규칙을 늘 가진다 — resetTurn이 t.taunt를 켠다. 능력 끄기 "수호"로 꺼진다.
   [정화](purify, 천족): 전투가 시작될 때(불씨 · 화상이 타기 전) 이 유닛 자신의 화상 · 불씨 · 계약의 낙인을 지운다(v3.90 자기만 · 출혈은 막지 않음 — 대신 천족 유닛 전체가 빛의 몸으로 출혈 −1, abBleedOn).
   [굳건](firm, 드워프): 상대가 자리를 바꾸거나(swapPos · mirror · sortFoe) 빼앗거나(stealCard · paidSteal · mindCapture · 세이렌의 노래) 행동 불가(rest)로 묶지 못한다. 내 마법(후퇴 · 수호 마법)은 그대로.
   [요격](intercept)은 2026-11-22에 걷어냈다 → 케라운 [전도](이 파일 끝 "케라운 [전도] · [감전]" 절). */
const nwFirm = u => !!(u && isUnit(u) && u.t && abilOf(u).firm);
const nwFirmVs = (X, caster, u) => nwFirm(u) && !X.P[caster].field.includes(u) && (fl(X, u.uid, "굳건", "shield block"), true);
/* 새 배치 want를 쓰되 [굳건] 유닛은 old 칸 그대로 두고, 나머지 카드를 want 순서대로 빈 칸에 채운다 */
function nwFirmArrange(old, want) {
  if (!old.some(nwFirm)) return want;
  const res = Array(old.length).fill(null), rest = want.filter(c => c && !(nwFirm(c) && old.includes(c)));
  old.forEach((c, i) => { if (nwFirm(c)) res[i] = c; });
  for (let i = 0; i < res.length && rest.length; i++) if (!res[i]) res[i] = rest.shift();
  return res;
}
function nwHpMark(X) { const m = new Map(); for (const p of X.P) for (const u of liveUnits(p)) m.set(u, hpLeft(u)); return m; }
function nwRegenHold(m) { for (const [u, h] of m) if (u.t && u.t.alive && hpLeft(u) < h) u.t.regenHold = true; }
function nwRegenTick(X) {
  let any = false;
  for (const p of X.P) for (const u of liveUnits(p)) {
    const hold = u.t.regenHold; if (hold) delete u.t.regenHold;   // 마법 바로 다음 맞붙음 한 번만 쉰다
    const n0 = abilOf(u).regen; if (!(n0 > 0)) continue;
    const k = u.t.keep || {};
    if (k.scorch > 0 || k.ember != null) { if (u.t.dmg > 0 || u.t.d < u.t.rb.d) fl(X, u.uid, "불길 · 재생 멈춤", "miss"); continue; }
    if (hold) { if (u.t.dmg > 0 || u.t.d < u.t.rb.d) lg(X, `[재생] ${C(u).name} — 마법에 체력이 깎인 직후라 이번 맞붙음은 쉰다`, "sys"); continue; }
    const capH = !(u.t.floor && u.t.floor.h && u.t.floor.h.hi != null);
    let done = 0;
    for (const n of abilPieces(u, "regen", n0)) {   // v3.84 [재생]이 여러 칸이면 칸마다 따로
      const h = capH ? Math.min(n, u.t.dmg) : 0, d = Math.max(0, Math.min(n, u.t.rb.d - u.t.d));
      if (!h && !d) break;
      if (done++) step(X, { tgt: u.uid }, PIECE_MS);
      u.t.dmg -= h; if (d) { u.t.d += d; applyFloor(u); }
      fl(X, u.uid, "재생" + (h ? " ♥+" + h : "") + (d ? " ⛨+" + d : ""), "heal");
      lg(X, `[재생 ${n}] ${C(u).name}${h ? ` 체력 +${h}` : ""}${d ? ` 방어 +${d}` : ""}`, "good");
      any = true;
    }
  }
  if (any) step(X, {}, 300);
}
function nwPurify(X) {
  for (const p of X.P) {
    const us = liveUnits(p).sort((a, b) => colOf(p, a) - colOf(p, b));
    const hit = new Set();
    us.forEach(u => { if (abilOf(u).purify) hit.add(u); });   // v3.90 자기만 씻는다(전: 양옆 1칸까지 — 사용자 결정)
    { let got = 0; for (const u of hit) got += a2LightAdd(X, X.P.indexOf(p), 1, "정화 유닛", u.uid);   // v3.90 새벽빛 잇기: 전투가 시작될 때 살아 있는 [정화] 유닛 하나마다 [새벽빛] +1(천족 깃발 · 씻을 것이 없어도) — 유닛마다 빛 알갱이
      if (got) lg(X, `[새벽빛] [정화] 유닛 ${hit.size}기 — 새벽빛 +${got} (${p.light})`, "good"); }
    for (const v of hit) {
      const k = v.t.keep; if (!k) continue;
      const had = [];
      if (k.scorch > 0) { had.push("화상 " + k.scorch); k.scorch = 0; k.scorchT = null; }
      if (k.ember != null) { had.push("불씨"); k.ember = null; }
      if (k.brand) { had.push("낙인"); k.brand = false; }
      had.push(...a1CurseWash(v));   // v3.95 [정화]는 [저주]를 씻는다 — 공포 · 역병이 함께 사라진다
      if (!had.length) continue;
      a2LightAdd(X, X.P.indexOf(p), had.length, "정화", v.uid);   // v3.86 [새벽빛]: 씻은 것 하나마다 1
      fl(X, v.uid, "정화", "heal");
      lg(X, `[정화] ${C(v).name}의 ${had.join(" · ")}을(를) 지웠다`, "good");
    }
  }
}

/* ---------- v3.75 이끼 트롤: 갑옷째 조이기 (카드 데이터는 js/troll.js) ----------
   armorCrush { area: { t: "maxD" | "all", n }, need, mul, base, min, zero }: 상대 유닛에게 그 유닛 방어에 비례한 피해(마법 피해라 방어로 막지 못함).
     피해 = base + mul × 지금 방어(min보다 작으면 min). maxD = 방어가 가장 높은 n기(같으면 레벨 높은 쪽 · 앞 칸), all = 전체(need = 방어가 need 이상인 유닛만).
     zero = 피해를 준 뒤 그 유닛의 방어를 이번 턴 0으로([저주 면역]이면 방어는 그대로 · 피해는 들어감). 덩굴과 뿌리가 갑옷 틈으로 파고들어, 갑옷이 두꺼울수록 깊이 박힌다. */
Object.assign(SPELL_OPS, {
  armorCrush(X, caster, it, k, op) {
    const P = X.P[1 - caster], ar = op.area || { t: "maxD", n: 1 };
    let L = liveUnits(P).filter(u => Math.max(0, u.t.d) >= (op.need || 0));
    if (ar.t === "maxD") L = L.sort((x, y) => y.t.d - x.t.d || C(y).lv - C(x).lv || colOf(P, x) - colOf(P, y)).slice(0, ar.n || 1);
    L = uEyeFilter(X, P, L);
    if (!L.length) { fl(X, it.uid, "조일 갑옷 없음", "miss"); lg(X, "방어를 가진 상대 유닛이 없어 덩굴이 헛돌았다", "sys"); return; }
    for (const u of L) {
      const d = Math.max(0, u.t.d), x = Math.max(op.min || 0, (op.base || 0) + (op.mul || 1) * d);
      lg(X, `[갑옷 조이기] ${C(u).name}(방 ${d}) → 피해 ${x}`);
      if (x > 0) hurt(X, u, x, "조이기");
      if (op.zero && u.t.alive && d > 0) {
        if (u.t.lock) fl(X, u.uid, "저주 면역", "miss");
        else { u.t.d = 0; applyFloor(u); fl(X, u.uid, u.t.d > 0 ? PIN_KO[u.t.floor.d.m] : "방어 0", u.t.d > 0 ? "miss" : "debuff"); }
      }
    }
  }
});

/* ---------- v3.76 이끼 트롤: 콤보 한 쌍 — 수액 몰아주기 · 고목 내려찍기 (카드 데이터는 js/troll.js) ----------
   hpGather { bonus, taunt }: 아군 유닛 가운데 남은 체력이 가장 높은 1기(같으면 앞 칸)가 받는 쪽. 나머지 아군 유닛은 남은 체력이 1이 되고
     (줄어든 만큼을 받은 피해로 친다 → [재생]이 맞붙음마다 도로 채운다 · 턴이 끝나면 낫는다), 줄어든 체력의 합 + (체력을 내준 유닛 수 × bonus)를
     받는 쪽의 체력에 더한다. taunt = 받는 쪽이 이번 턴 [수호](상대가 먼저 친다).
   hpSlam { half, need } (v3.84.1 카드가 쓰는 꼴): 체력이 가장 높은 아군 1기의 체력이 절반(내림)이 되고, 줄어든 만큼 방어가 need 이상인 상대 유닛마다 피해. 맞을 상대가 없으면 체력도 그대로.
   hpSlam { sapMul } (예전 꼴): 아군 유닛 가운데 남은 체력이 가장 높은 1기가 남은 체력만큼의 피해를 상대 유닛 전체에 나눠 준다 — 한 기마다 피해 = 남은 체력 ÷ 상대 유닛 수(내림).
     이번 턴 수액 몰아주기로 받은 체력(t.sap, 남은 체력까지만)은 sapMul 번 센다(콤보 보상).
     마법 피해라 방어로 막지 못한다. 그 뒤 그 유닛의 남은 체력은 1(줄어든 만큼은 받은 피해). 상대 유닛이 없으면 아무 일도 없다.
   둘을 한 턴에 차례로 쓰면(몰아주기가 먼저) 아군 체력 전부가 한 번에 상대에게 떨어진다. 대신 아군이 모두 체력 1로 남아 상대 마법 · 반격에 약하다. */
const trHpTop = P => liveUnits(P).sort((x, y) => hpLeft(y) - hpLeft(x) || colOf(P, x) - colOf(P, y))[0];
Object.assign(SPELL_OPS, {
  hpGather(X, caster, it, k, op) {
    const P = X.P[caster], top = trHpTop(P);
    if (!top) { fl(X, it.uid, "아군 없음", "miss"); return; }
    let sum = 0, cnt = 0;
    for (const u of liveUnits(P)) {
      if (u === top) continue;
      const x = hpLeft(u) - 1; if (x <= 0) continue;
      u.t.dmg += x; sum += x; cnt++;
      fl(X, u.uid, "♥ → 1", "debuff");
    }
    const add = sum + cnt * (op.bonus || 0);
    lg(X, `[수액 몰아주기] 아군 ${cnt}기의 체력 ${sum}${op.bonus ? ` + ${cnt * op.bonus}` : ""} → ${C(top).name} 체력 +${add}`, "spell");
    if (add > 0) { top.t.h += add; top.t.sap = (top.t.sap || 0) + add; applyFloor(top); fl(X, top.uid, "♥+" + add, "buff"); }
    if (op.taunt) { top.t.taunt = true; fl(X, top.uid, "수호", "buff"); }
  },
  hpSlam(X, caster, it, k, op) {
    const me = trHpTop(X.P[caster]), F = X.P[1 - caster];
    const L = uEyeFilter(X, F, liveUnits(F).filter(u => Math.max(0, u.t.d) >= (op.need || 0)));   // v3.84.1 need: 방어가 need 이상인 상대만
    if (!me || !L.length) { fl(X, it.uid, me ? "칠 상대 없음" : "아군 없음", "miss"); return; }
    const hp = hpLeft(me);
    if (op.half) {   // v3.82 혼자 써도 되게 · v3.84.1 그 아군의 체력이 절반(내림)이 되고, 줄어든 만큼(= 남은 체력 − 절반) 상대마다 체력 −
      const y = hp - Math.floor(hp / 2);
      lg(X, `[고목 내려찍기] ${C(me).name}의 체력 ${hp} → ${hp - y} · 줄어든 ${y}만큼 상대 ${L.length}기 체력 −${y}`, "spell");
      me.t.sap = 0;
      if (y > 0) { me.t.dmg += y; fl(X, me.uid, "♥−" + y, "debuff"); }
      step(X, { act: me.uid }, 300);
      if (y > 0) for (const u of L) hurt(X, u, y, "내려찍기");
      return;
    }
    const sap = Math.min(hp, me.t.sap || 0) * ((op.sapMul || 1) - 1), x = Math.floor((hp + sap) / L.length);
    lg(X, `[고목 내려찍기] ${C(me).name}의 체력 ${hp}${sap ? ` + 몰아 받은 몫 ${sap} 더` : ""} ÷ 상대 ${L.length}기 → 한 기마다 피해 ${x}`, "spell");
    me.t.sap = 0;
    if (hp > 1) { me.t.dmg += hp - 1; fl(X, me.uid, "♥ → 1", "debuff"); }
    step(X, { act: me.uid }, 300);
    if (x > 0) for (const u of L) hurt(X, u, x, "내려찍기");
  }
});

/* ---------- v3.77 성광 천족: 무력화 · 구원 · 심판 · 응보 (카드 데이터는 js/celestial.js) ----------
   a2Hush { n }: 상대 맨 앞 n기(아군에 [정화] 유닛이 살아 있으면 상대 전체)의 특수능력을 이번 턴 끈다 — t.off에 모든 능력 이름(ABIL_KEY)을 넣는 strip.
     걸린 보호막 · 가시 · 가호 · 수호도 함께 꺼진다. 레어 오라 · 유니크 능력(gift.u)은 끄지 않는다.
   a2Redeem { into }: 아군 맨 앞 유닛보다 레벨이 낮고 특수능력이 있는 상대 유닛 중 맨 앞 1기를 이번 턴 into 카드의 스탯(공 · 방 · 체)으로 만들고 능력을 모두 끈다.
     받은 피해는 그대로(새 체력에서 1은 남긴다 — 쓰러뜨리는 마법이 아니다). [저주 면역]이면 막힌다. 카드 그림 · 이름은 그대로, 떠오르는 글로 알린다.
   a2Scale: 상대 유닛의 능력 열쇠를 세어, 같은 능력을 가진 유닛이 둘 이상인 열쇠가 하나라도 있는 유닛은 공격 − 자기 레벨(0 아래로는 안 내려감. v3.90 사용자 결정 — 전: 레벨보다 높으면 레벨로).
   a2Retrib: 이번 턴 이 마법 주인 쪽 유닛이 보호막 · 보호막 코인 · 가호로 막은 피해(hurt가 a2Blk로 셈 — 마법을 쓰기 전에 막은 것도)를
     전투가 끝날 때(runCombatCore의 a2RetribEnd) 체력이 가장 높은 상대 유닛에게 체력 −로 되돌린다(v3.90 상한 없음 — 전: 최대 8, 여러 장이면 장마다). */
const A2_ALL_ABS = Object.keys(ABIL_KEY);
function a2HasAbil(u) {
  const ab = abilOf(u);
  return !!ab.u || Object.values(ABIL_KEY).some(k => ab[k] === true || ab[k] > 0);
}
function a2Silence(X, u) {
  u.t.off = Array.from(new Set((u.t.off || []).concat(A2_ALL_ABS)));
  u.t.shield = false; u.t.thorns = 0; u.t.ward = 0; u.t.taunt = false;
}
function a2SideIdx(X, u) { return X.P.findIndex(p => p.field.includes(u)); }
function a2Blk(X, u, v) {   // hurt가 부른다: 보호막 · 가호로 막은 피해
  if (!(v > 0)) return;
  const i = a2SideIdx(X, u); if (i < 0) return;
  if (!X.a2Blk || X.a2Blk.turn !== X.turn) X.a2Blk = { turn: X.turn, v: [0, 0] };
  X.a2Blk.v[i] += v;
  a2LightAdd(X, i, v, "막음", u.uid);   // v3.86 [새벽빛]
}
function a2RetribEnd(X, sweep) {
  const R = X.a2Ret; if (!R) return;
  X.a2Ret = null;
  for (let i = 0; i < 2; i++) for (const _ of (R[i] || [])) {
    const x = (X.a2Blk && X.a2Blk.turn === X.turn) ? X.a2Blk.v[i] : 0;   // v3.90 상한 없음(전: 최대 8)
    const F = X.P[1 - i], tg = liveUnits(F).sort((a, b) => hpLeft(b) - hpLeft(a) || colOf(F, a) - colOf(F, b))[0];
    if (!x || !tg) { lg(X, `[응보의 빛] ${x ? "되돌릴 상대가 없다" : "이번 턴 막은 피해가 없어 빛이 흩어졌다"}`, "sys"); continue; }
    lg(X, `[응보의 빛] ${X.P[i].name}이(가) 이번 턴 막은 피해 ${x} → ${C(tg).name} 체력 −${x}`, "spell");
    tg.t.dmg += x; fl(X, tg.uid, "응보 −" + x, "dmg big");
    if (hpLeft(tg) <= 0) { tg.t.alive = false; lgDeath(X, tg); }
    step(X, { act: tg.uid }, 520);
  }
  sweep();
}
Object.assign(SPELL_OPS, {
  a2Hush(X, caster, it, k, op) {
    const F = X.P[1 - caster], pure = liveUnits(X.P[caster]).some(u => abilOf(u).purify);
    let L = liveUnits(F); if (!pure) L = L.slice(0, op.n || 2);
    L = uEyeFilter(X, F, L);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    if (pure) lg(X, "[정화] 아군의 정화 유닛이 기도를 넓혀 상대 전체가 침묵한다", "good");
    for (const u of L) { a2Silence(X, u); fl(X, u.uid, "침묵 · 능력 꺼짐", "debuff"); }
    lg(X, `[침묵의 기도] ${L.map(u => C(u).name).join(" · ")}의 특수능력이 이번 턴 꺼졌다`, "spell");
  },
  a2Redeem(X, caster, it, k, op) {
    const me = liveUnits(X.P[caster])[0], F = X.P[1 - caster], into = CARDS[op.into];
    if (!me || !into) { fl(X, it.uid, "아군 없음", "miss"); return; }
    const lv = C(me).lv;
    const L = uEyeFilter(X, F, liveUnits(F).filter(u => C(u).lv < lv && a2HasAbil(u)));
    const u = L[0];
    if (!u) { fl(X, it.uid, "구원할 상대 없음", "miss"); lg(X, `[구원의 빛] ${C(me).name}(레벨 ${lv})보다 레벨이 낮고 능력이 있는 상대 유닛이 없다`, "sys"); return; }
    if (u.t.lock) { fl(X, u.uid, "저주 면역", "miss"); return; }
    const was = C(u).name;
    u.t.look = op.into;   // v3.90 카드 자체가 이번 턴 작은 성상이 된다(이름 · 레벨 · 그림 · 능력 — C(u)가 t.look을 따름). 다음 턴 resetTurn이 되돌린다
    u.t.a = into.a; u.t.d = into.d; u.t.h = into.h; u.t.rb = { a: into.a, d: into.d, h: into.h };
    u.t.floor = floorOf(u); u.t.ward = 0; u.t.wardP = []; u.t.thorns = 0; u.t.thornsP = []; u.t.taunt = false;   // 성상은 능력이 없다(아이템 능력은 아래 침묵이 끈다)
    if (u.t.dmg > u.t.h - 1) u.t.dmg = Math.max(0, u.t.h - 1);
    a2Silence(X, u); u.t.redeemed = op.into;
    applyFloor(u);
    fl(X, u.uid, `구원 · ${into.name}`, "debuff");
    lg(X, `[구원의 빛] ${was}이(가) 이번 턴 ${into.name}(${into.a}/${into.d}/${into.h}, 능력 없음)이 되었다`, "spell");
  },
  a2Scale(X, caster, it, k, op) {
    const F = X.P[1 - caster], L = liveUnits(F), keys = new Map(), cnt = {};
    for (const u of L) {
      const ab = abilOf(u), ks = Object.values(ABIL_KEY).filter(q => ab[q] === true || ab[q] > 0);
      if (ab.u) ks.push("u:" + ab.u);
      keys.set(u, ks); for (const q of ks) cnt[q] = (cnt[q] || 0) + 1;
    }
    const T = uEyeFilter(X, F, L.filter(u => keys.get(u).some(q => cnt[q] >= 2)));
    if (!T.length) { fl(X, it.uid, "같은 능력 없음", "miss"); lg(X, "[심판의 저울] 같은 특수능력을 가진 상대 유닛이 둘 이상 없다", "sys"); return; }
    for (const u of T) {
      const lv = C(u).lv;
      if (!(u.t.a > 0)) { fl(X, u.uid, "저울 · 그대로", "miss"); continue; }
      const b = u.t.a; u.t.a = Math.max(0, b - lv); applyFloor(u);   // v3.90 공격 − 레벨
      fl(X, u.uid, u.t.a < b ? "⚔ −" + (b - u.t.a) + " (레벨)" : PIN_KO[u.t.floor.a.m] + " 공격", u.t.a < b ? "debuff" : "miss");
    }
    lg(X, `[심판의 저울] ${T.map(u => `${C(u).name} 공 → ${u.t.a}`).join(" · ")}`, "spell");
  },
  a2Retrib(X, caster, it, k, op) {
    X.a2Ret = X.a2Ret || {}; (X.a2Ret[caster] = X.a2Ret[caster] || []).push(1);   // v3.90 상한 없음(전: op.cap 8)
    fl(X, it.uid, "응보 준비", "buff");
    lg(X, "[응보의 빛] 전투가 끝날 때 이번 턴 막은 피해만큼 되돌린다", "sys");
  }
});

/* ---------- v3.86 성광 천족: 새벽빛 · 순교 (카드 데이터는 js/celestial.js) ----------
   천족의 역전 콤보 — 트롤(체력) · 드워프(방어)는 지금 가진 스탯을 바로 공격으로 바꾸지만, 천족은 "버틴 시간"을 모았다가 한 번에 돌려준다.
   [새벽빛] p.light: 판 내내 남는 플레이어 몫(없음 = undefined, 켜지면 0 이상, 최대 A2_LIGHT_CAP). 전투 복제(cloneForCombat · cloneSide) · 기록(recPush snap) · applySnap이 실어 나른다.
     모이는 곳: 아군 유닛이 보호막 · 보호막 코인 · 가호로 막은 피해(a2Blk) · [정화]가 지운 화상 · 불씨 · 낙인 하나마다 1(nwPurify) ·
     전투가 끝날 때 이번 턴 깎인 생명(켜진 때부터, 회복을 뺀 순손실)의 절반(내림, a2LightEnd).
   켜는 곳: 2026-11-22 천족(A2) 깃발 플레이어는 판 처음부터 0으로 켜져 있다(js/game.js mkPlayer). 전에는 인내의 기도(a2Vigil)로 켰다.
   a2Dawn: 새벽빛을 모두 쓴다 — 새벽빛 + 내 생명이 상대보다 적은 만큼(새벽빛이 켜진 쪽만)을, 공격이 가장 높은 상대 유닛부터(같으면 앞 칸) 그만큼 체력을 깎고(방어 · 보호막 무시), 쓰러뜨리면 남은 몫은 다음 유닛에게.
     (v3.86 잰 값: 밀린 생명을 더하지 않으면 생명 10~19 밀린 판 승률이 그대로 8~9% — 막은 피해가 거의 다라서 앞설 때나 밀릴 때나 똑같이 모였다. 더하면 11%, 전체 승률 그대로)
     그래도 남은 몫은 내 생명으로(생명 상한까지). 새벽빛은 0이 되고 켜진 채 다시 모인다.
   a2Martyr: 이번 턴(이 전투) 이 마법 주인 쪽 유닛이 쓰러질 때마다 양옆(칸 순서로 가장 가까운 살아 있는 아군 유닛)에게 [보호막].
     sweep이 쓰러진 유닛을 치우기 전에(uPreSweep 다음) a2MartyrSweep이 본다. 이미 보호막이 있으면 그대로. */
const A2_LIGHT_CAP = 37;   // v3.90 12 → 37 (사용자)
function a2LightAdd(X, i, v, why, src) {   // src: 빛이 난 곳(유닛 uid · "life"+i) — 화면이 거기서 새벽빛 칸으로 빛 알갱이를 날린다(js/game.js lightMote)
  const p = X.P[i]; if (!p || p.light == null || !(v > 0)) return 0;
  const b = p.light; p.light = Math.min(A2_LIGHT_CAP, b + v);
  const got = p.light - b;
  if (got) { X.a2LightGot = X.a2LightGot || [0, 0]; X.a2LightGot[i] += got; }
  if (got && src != null) fl(X, src, "새벽빛 +" + got, "lightmote to-" + i);   // v3.90 빛 알갱이 (화면 전용 — 판 셈과 상관없음)
  return got;
}
function a2LightStart(X) {
  X.a2LifeAt = X.P.map(p => (p.light != null ? p.life : null));
}
function a2LightEnd(X) {
  for (let i = 0; i < 2; i++) {
    const p = X.P[i]; if (p.light == null) continue;
    const at = X.a2LifeAt && X.a2LifeAt[i];
    if (at != null && at - p.life >= 2) a2LightAdd(X, i, Math.floor((at - p.life) / 2), "생명", "life" + i);
    const got = X.a2LightGot ? X.a2LightGot[i] : 0;
    if (got) { lg(X, `[새벽빛] ${p.name}이(가) 이번 턴 새벽빛 ${got}을 모았다 (지금 ${p.light} / ${A2_LIGHT_CAP})`, "good"); }   // v3.90 "새벽빛 +N" 글자 대신 빛 알갱이가 칸에 닿을 때 +N이 뜬다
  }
  X.a2LightGot = null;
}
function a2MartyrSweep(X) {
  const M = X.a2Mar; if (!M) return;
  for (let i = 0; i < 2; i++) {
    if (!M[i]) continue;
    const p = X.P[i], us = p.field.filter(it => isUnit(it) && it.t);
    us.forEach((v, k) => {
      if (v.t.alive || v.t.a2Mar || v.phantom) return;
      v.t.a2Mar = true;
      const got = [];
      for (const d of [-1, 1]) {
        let j = k + d; while (us[j] && !us[j].t.alive) j += d;
        const w = us[j]; if (!w || w.t.shield === true) continue;
        w.t.shield = true; got.push(w); fl(X, w.uid, "순교 · 보호막", "shield");
      }
      if (got.length) lg(X, `[순교의 서약] 쓰러진 ${C(v).name}의 빛이 ${got.map(w => C(w).name).join(" · ")}에게 [보호막]이 되었다`, "good");
    });
  }
}
Object.assign(SPELL_OPS, {
  a2Dawn(X, caster, it, k, op) {
    const p = X.P[caster], F = X.P[1 - caster], L0 = p.light || 0;
    const behind = p.light == null ? 0 : Math.max(0, F.life - p.life);   // 가장 어두울 때 새벽이 가장 밝다: 내 생명이 상대보다 적은 만큼 더 푼다
    if (!(L0 + behind)) { fl(X, it.uid, "새벽빛 없음", "miss"); lg(X, `[새벽의 해방] ${p.light == null ? "모으던 새벽빛이 없다(천족 깃발만 모은다)" : "모은 새벽빛이 0이고 생명도 밀리지 않았다"}`, "sys"); return; }
    p.light = 0;
    let rem = L0 + behind;
    const T = uEyeFilter(X, F, liveUnits(F)).sort((a, b) => b.t.a - a.t.a || colOf(F, a) - colOf(F, b));
    const hit = [];
    for (const tg of T) {
      if (rem <= 0) break;
      const x = Math.min(rem, hpLeft(tg)); if (x <= 0) continue;
      rem -= x; tg.t.dmg += x; hit.push(`${C(tg).name} −${x}`);
      fl(X, tg.uid, "새벽빛 −" + x, "dmg big");
      if (hpLeft(tg) <= 0) { tg.t.alive = false; lgDeath(X, tg); }
    }
    let heal = 0;
    if (rem > 0) { const b = p.life; p.life = Math.min(RULES.lifeCap, p.life + rem); heal = p.life - b; if (heal) fl(X, "life" + caster, "+" + heal, "heal"); }
    lg(X, `[새벽의 해방] 새벽빛 ${L0}${behind ? ` + 밀린 생명 ${behind}` : ""}을 모두 풀었다${hit.length ? " → " + hit.join(" · ") : ""}${heal ? ` · 남은 빛으로 ${p.name} 생명 +${heal}` : ""}`, "spell");
  },
  a2Martyr(X, caster, it, k, op) {
    X.a2Mar = X.a2Mar || [false, false]; X.a2Mar[caster] = true;
    fl(X, it.uid, "순교의 서약", "buff");
    lg(X, "[순교의 서약] 이번 턴 아군이 쓰러질 때마다 양옆 아군에게 [보호막]", "sys");
  }
});

/* ---------- v3.81 스페셜 아이템 능력 (카드 데이터 js/itemrework.js, 설계 docs/ITEM_BALANCE.md 5절) ----------
   스페셜 아이템은 능력 2개 — 첫째가 아래 새 능력, 둘째가 그 깃발의 기존 능력(능력 차례 it.abOrder). 첫째는 둘째 없이도 일한다.
   [불꽃 사냥] huntfire   화상이 붙은 상대와 맞붙으면(공격 · 반격) 피해 + 그 화상 수치.
   [되받기] riposte       맞붙어 공격받을 때 내 방어가 막아 낸 피해만큼 공격자 체력 −(방어 무시, 2026-11-22 상한 3을 없앰 — 사용자). 이 유닛이 쓰러져도.
   [과부하] overload      내 마법이 발동할 때마다 이 유닛 공격 +1(이번 턴, +3까지).
   [포식] devour          상대 유닛을 쓰러뜨릴 때마다(연쇄 · 꿰뚫기 빼고) 공격 +1 · 체력 +1(판 끝까지, 각 +3까지 — keep.grow).
   [뿌리 흡수] drain      이 유닛을 맞붙어 공격한 상대 체력 −1, 이 유닛 체력 +1(받은 피해가 있을 때, 살아 있으면).
   [밀물] flow            전투가 시작될 때 받은 피해가 가장 큰 아군 하나(자기 포함) 체력 +2.
   [심판] judge           상대 유닛을 쓰러뜨리면(연쇄 · 꿰뚫기 빼고) 내 생명 +1(턴에 한 번).
   [경계의 화살] sentry   전투가 시작될 때 이번 턴 상대 전장에 새로 놓인(낸 · 소환된) 유닛마다 체력 −3(방어 무시).
   [표식] mark            이 유닛이 피해를 준 상대(맞붙음 · 사격)는 이번 턴 방어 −2(유닛마다 턴에 한 번, 표시 ▲ · 🔒이면 깎이지 않음). */
const SP_GROW_CAP = 3, SP_OVERLOAD_CAP = 3, SP_SENTRY = 3, SP_JUDGE = 1;   // [경계의 화살] 1이면 새벽 −4.5%p, 2면 −3.4%p
function spHunt(X, src, tgt) {
  if (!abilOf(src).huntfire || !tgt || !tgt.t) return 0;
  const s = (tgt.t.keep && tgt.t.keep.scorch) || 0; if (!(s > 0)) return 0;
  fl(X, tgt.uid, "불꽃 사냥 +" + s, "debuff");
  return s;
}
function spRiposte(X, atk, def, blocked) {
  if (!abilOf(def).riposte || !atk.t.alive) return;
  const n = Math.max(0, blocked); if (!n) return;
  const t = hurt(X, atk, n, "되받기");
  if (t) lg(X, `[되받기] ${C(def).name}의 방어가 막은 ${n}을(를) ${C(atk).name}에게 되돌렸다`);
  if (!atk.t.alive) atk.t.killer = def.uid;
}
function spDrain(X, atk, def) {
  if (!abilOf(def).drain || !atk.t.alive) return;
  hurt(X, atk, 1, "뿌리 흡수");
  if (!atk.t.alive) atk.t.killer = def.uid;
  if (def.t.alive && def.t.dmg > 0) { def.t.dmg -= 1; fl(X, def.uid, "뿌리 흡수 ♥+1", "heal"); }
  lg(X, `[뿌리 흡수] ${C(def).name}이(가) ${C(atk).name}의 체력 1을 빨아들였다`);
}
function spOverload(X, caster) {
  for (const u of liveUnits(X.P[caster])) {
    if (!abilOf(u).overload || (u.t.ovl || 0) >= SP_OVERLOAD_CAP) continue;
    u.t.ovl = (u.t.ovl || 0) + 1; u.t.a += 1; fl(X, u.uid, "과부하 ⚔+1", "buff");
  }
}
function spOnKill(X, o, killer, v) {
  if (!killer || v.t.killVia) return;
  const ab = abilOf(killer);
  if (ab.judge && uK(killer).judgeT !== X.turn) {   // 턴에 한 번 (v3.81 잼: 레벨의 절반으로도 그믐 +5.7%p, 심판 몫 +3.3)
    uK(killer).judgeT = X.turn;
    const lv = SP_JUDGE, b = o.life; o.life = Math.min(RULES.lifeCap, o.life + lv);   // 레벨만큼은 그믐 +8%p, 레벨의 절반(턴에 한 번)도 +5.7%p — 그믐은 생명을 마법에 써서 생명 회복이 크게 일한다
    if (o.life > b) { fl(X, "life" + o.idx, "심판 +" + (o.life - b), "heal"); lg(X, `[심판] ${C(killer).name}이(가) ${C(v).name}을(를) 쓰러뜨려 ${o.name}의 생명 +${o.life - b}`, "good"); }
  }
  if (ab.devour && killer.t.alive) {
    const k = uK(killer); k.grow = k.grow || {};
    let up = "";
    if ((k.grow.a || 0) < SP_GROW_CAP) { k.grow.a = (k.grow.a || 0) + 1; killer.t.a += 1; up += "⚔+1 "; }
    if ((k.grow.h || 0) < SP_GROW_CAP) { k.grow.h = (k.grow.h || 0) + 1; killer.t.h += 1; up += "♥+1"; }
    if (up) { fl(X, killer.uid, "포식 " + up.trim(), "buff"); lg(X, `[포식] ${C(killer).name}이(가) ${C(v).name}을(를) 삼켜 판이 끝날 때까지 ${up.trim()}`, "good"); }
  }
}
function spCombatStart(X) {
  for (const p of X.P) {
    const flows = liveUnits(p).filter(u => abilOf(u).flow);
    for (const f of flows) {
      const hurtOnes = liveUnits(p).filter(u => u.t.dmg > 0).sort((a, b) => b.t.dmg - a.t.dmg);
      const u = hurtOnes[0]; if (!u) break;
      const n = Math.min(2, u.t.dmg); u.t.dmg -= n;
      fl(X, u.uid, "밀물 ♥+" + n, "heal"); lg(X, `[밀물] ${C(f).name} — ${C(u).name} 체력 +${n}`, "good");
    }
    const sentries = liveUnits(p).filter(u => abilOf(u).sentry);
    if (!sentries.length) continue;
    const o = X.P.find(q => q !== p);
    for (const s of sentries) for (const u of liveUnits(o)) {
      if (u.summoned !== X.turn) continue;
      hurt(X, u, SP_SENTRY, "경계의 화살");
      lg(X, `[경계의 화살] ${C(s).name} → 새로 놓인 ${C(u).name} 체력 −${SP_SENTRY}`);
      if (!u.t.alive) u.t.killer = s.uid;
    }
  }
}
function spMark(X, src, tgt) {
  if (!abilOf(src).mark || !tgt || !tgt.t || !tgt.t.alive || tgt.t.marked) return;
  tgt.t.marked = true;
  const before = tgt.t.d; tgt.t.d -= 2; applyFloor(tgt);
  const red = before - tgt.t.d;
  if (red > 0) { fl(X, tgt.uid, "표식 ⛨−" + red, "debuff"); lg(X, `[표식] ${C(src).name}이(가) ${C(tgt).name}에 표식 — 이번 턴 방어 −${red}`); }
}

/* ---------- v3.82 고르바스의 발톱(G1) · 베르단의 뿔(G2) 마법 (카드 데이터는 js/orc.js · js/troll.js · js/spelltune.js) ----------
   g1Victory { per }: 전투가 끝날 때(g1VictoryEnd) 살아남은 아군 유닛 수 × per만큼 상대 생명 −.
   g1Ram { mul }: 아군 유닛 수 n → 상대 유닛 전체 체력 −(n × mul, [증폭]은 더함), 그 뒤 아군 유닛마다 체력 −n.
   g2Weight: 아군 유닛 남은 체력(또는 공격, pool: "a")의 합을 몫으로, 상대 대기열 맨 앞 유닛부터 공격 → 방어 → 체력 순으로 깎는다(공격 · 방어는 이번 턴, v3.83).
     몫은 깎을 만큼(그 스탯 값까지) 쓰인다 — 고정 · 저주 면역으로 덜 깎여도 그 몫은 쓰인다. 체력까지 다 깎아 쓰러뜨리면 남은 몫이 다음 유닛에게.
     보호막에 막히거나 상대가 버티면 거기서 멈춘다. */
function g1VictoryEnd(X) {
  const V = X.g1Vic; if (!V) return;
  X.g1Vic = null;
  for (let i = 0; i < 2; i++) for (const per of (V[i] || [])) {
    const n = liveUnits(X.P[i]).length * per, o = X.P[1 - i];
    if (!n) { lg(X, "[승전의 함성] 살아남은 아군이 없어 함성이 흩어졌다", "sys"); continue; }
    o.life -= n; fl(X, "life" + o.idx, "함성 −" + n, "dmg big");
    lg(X, `[승전의 함성] 살아남은 아군 ${n / per}기 → ${o.name} 생명 −${n}`, "spell");
    step(X, {}, 420);
  }
}
Object.assign(SPELL_OPS, {
  /* v3.95 오크 웅크린 늑대(MC-01) g1Crouch: 아군 유닛 전체의 공격을 이번 턴 1로 고정(pin L 1)하고,
     그래서 줄어든 공격의 합 D만큼 상대 유닛 전체 공격 −D(이번 턴). 공격이 1 이하던 유닛은 D에 보태지 않는다(올라간 몫은 빼지 않음) */
  g1Crouch(X, caster, it, k, op) {
    const M = liveUnits(X.P[caster]);
    if (!M.length) { fl(X, it.uid, "아군 없음", "miss"); return; }
    const b = M.map(u => u.t.a);
    SPELL_OPS.pin(X, caster, it, k, { side: "ally", area: { t: "all" }, st: ["a"], m: "L", v: 1 });
    const D = M.reduce((s, u, i) => s + Math.max(0, b[i] - u.t.a), 0);
    if (!D) { lg(X, "[웅크린 늑대] 줄어든 아군 공격이 없어 상대 공격도 그대로", "sys"); fl(X, it.uid, "줄어든 공격 0", "miss"); return; }
    lg(X, `[웅크린 늑대] 아군 공격이 1로 묶이며 줄어든 ${D}만큼 상대 유닛 전체 공격 −${D}`, "spell");
    step(X, {}, 260);
    const F = X.P[1 - caster];
    for (const v of uEyeFilter(X, F, liveUnits(F))) { const c = Math.min(D, Math.max(0, v.t.a)); if (c > 0) addStat(X, v, "a", -c); }   // 0 아래로는 내리지 않는다
  },
  g1Victory(X, caster, it, k, op) {
    X.g1Vic = X.g1Vic || {}; (X.g1Vic[caster] = X.g1Vic[caster] || []).push(op.per || 1);
    fl(X, it.uid, "함성 준비", "buff");
    lg(X, "[승전의 함성] 전투가 끝날 때 살아남은 아군 수만큼 상대 생명을 깎는다", "sys");
  },
  g1Ram(X, caster, it, k, op) {
    const M = liveUnits(X.P[caster]), n = M.length, F = X.P[1 - caster];
    if (!n) { fl(X, it.uid, "아군 없음", "miss"); return; }
    const x = n * (op.mul || 2), amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    lg(X, `[몸통 박치기] 아군 ${n}기 → 상대 유닛 전체 체력 −${x}${amp ? " +증폭 " + amp : ""}, 아군마다 체력 −${n}`, "spell");
    for (const v of uEyeFilter(X, F, liveUnits(F))) hurt(X, v, spellDmg(X, v, x, amp), "박치기");
    step(X, {}, 300);
    for (const u of M) { if (!u.t.alive) continue; u.t.dmg += n; fl(X, u.uid, "박치기 ♥−" + n, "debuff"); if (hpLeft(u) <= 0) { u.t.alive = false; lgDeath(X, u); } }
  },
  g2Weight(X, caster, it, k, op) {
    const byA = op.pool === "a", tag = op.tag || "숲의 무게";   // v3.95 오크 궁지의 송곳니: pool "a" = 아군 공격의 합
    let x = liveUnits(X.P[caster]).reduce((s, u) => s + Math.max(0, byA ? u.t.a : hpLeft(u)), 0);
    if (!x) { fl(X, it.uid, byA ? "아군 공격 0" : "아군 없음", "miss"); return; }
    lg(X, `[${tag}] 아군 ${byA ? "공격" : "체력"}의 합 ${x} → 상대 맨 앞부터 공격 → 방어 → 체력 순으로 깎는다`, "spell");
    for (const u of queueOf(X.P[1 - caster])) {
      if (x <= 0) break;
      for (const st of ["a", "d"]) {   // v3.83 공 → 방 → 체: 깎을 몫만큼 쓴다(고정 · 저주 면역으로 덜 깎여도 그 스탯이 몫을 받아 낸다)
        const v = Math.min(x, Math.max(0, u.t[st]));
        if (v > 0) { addStat(X, u, st, -v); x -= v; }
        if (x <= 0) break;
      }
      if (x <= 0) break;
      const need = hpLeft(u) + (u.t.ward && !u.t.wardUsed ? u.t.ward : 0), blocked = u.t.shield === true;
      hurt(X, u, x, tag);
      if (blocked || u.t.alive) break;
      x -= need; step(X, {}, 240);
    }
  }
});

/* ---------- v3.85 이끼 덮기(CS-G2): 무효로 했을 때만 강화 ----------
   negBuff { side, area, a, d, h }: 같은 마법의 negate가 이번에 마법을 1장 이상 무효로 했으면(X.negBy[이 마법 uid]) 대상에 a · d · h를 더한다. 아니면 아무 일도 없다. */
Object.assign(SPELL_OPS, {
  negBuff(X, caster, it, k, op) {
    if (!(X.negBy && X.negBy[it.uid] > 0)) { lg(X, `${C(it).name}: 무효로 한 마법이 없어 강화도 없다`, "sys"); return; }
    for (const u of pickTargets(X, caster, op.side || "ally", op.area || { t: "front", n: 2 }, k)) {   // mod와 같이 한 번에 띄운다("⚔+1 ♥+2")
      const b0 = { a: u.t.a, d: u.t.d, h: u.t.h };
      if (op.a) u.t.a += op.a; if (op.d) u.t.d += op.d; if (op.h) u.t.h += op.h;
      applyFloor(u);
      const ra = u.t.a - b0.a, rd = u.t.d - b0.d, rh = u.t.h - b0.h;
      const tx = [ra ? "⚔" + sgnNum(ra) : "", rd ? "⛨" + sgnNum(rd) : "", rh ? "♥" + sgnNum(rh) : ""].filter(Boolean).join(" ");
      if (tx) fl(X, u.uid, tx, "buff");
    }
  }
});

/* ---------- v3.87 바위주먹 오크: 피의 맹세(RS-G1-2) · 원한의 일격(MG-04) (카드 데이터 js/orc.js, 사용자 설계) ----------
   g1Oath: 방어 마법이 발동하면 그때 살아 있는 아군 유닛마다 피 하나(🩸, t.blood = [{u, n, a}])를 맺는다.
     결속한 유닛이 쓰러지면(sweep 직전 g1OathSweep) 자기 피 + 받은 피가 모두 바로 뒤 유닛에게 옮겨 간다. 그 유닛도 쓰러지면 또 뒤로.
     옮길 유닛이 없으면 흩어진다. 피의 값 = 그 피 주인이 쓰러질 때의 공격(코인 몫 cb는 빼고, 0 아래는 0).
     전투가 끝날 때(g1OathEnd) 살아남은 유닛이 남의 피를 가졌으면 t.keep.blood = { turn: 다음 턴, v: [{a, n}] }.
     다음 턴 준비(resetTurn)에서 그 턴 동안 공격 + 합. 다음 턴 전투가 끝나면 지운다. 자기 피(쓰러지지 않음)는 값이 없다.
   g1Grudge { area }: 대상 공격 + (내 소각장의 유닛 카드 수). */
function g1BloodSum(it) { const b = it && it.t && it.t.keep && it.t.keep.blood; return b && b.v ? b.v.reduce((s, e) => s + e.a, 0) : 0; }
function g1OathSweep(X) {
  if (!X.g1Oath) return;
  for (const p of X.P) {
    const F = p.field;
    for (let s = 0; s < F.length; s++) {
      const v = F[s];
      if (!isUnit(v) || !v.t || v.t.alive || v.phantom || v.t.bloodGone || !(v.t.blood && v.t.blood.length)) continue;
      v.t.bloodGone = true;
      for (const e of v.t.blood) if (e.u === v.uid && e.a == null) e.a = Math.max(0, v.t.a);
      let w = null;
      for (let j = s + 1; j < F.length && !w; j++) if (isUnit(F[j]) && F[j].t && !F[j].phantom && !F[j].tokTemp && !F[j].t.bloodGone) w = F[j];
      const L = v.t.blood; v.t.blood = [];
      if (!w) { lg(X, `[피의 맹세] ${C(v).name}의 피 ${L.length}개가 이어 줄 아군이 없어 흩어졌다`, "sys"); continue; }
      w.t.blood = (w.t.blood || []).concat(L);
      fl(X, w.uid, "🩸+" + L.length, "buff blood");
      lg(X, `[피의 맹세] 쓰러진 ${C(v).name}의 피 ${L.length}개가 ${C(w).name}에게 옮겨 갔다 (지금 ${w.t.blood.length}개)`, "spell");
    }
  }
}
function g1OathEnd(X) {
  for (const p of X.P) for (const u of p.field) {
    if (!isUnit(u) || !u.t) continue;
    const k = u.t.keep;
    if (k && k.blood && k.blood.turn <= X.turn) delete k.blood;   // 지난 턴 피는 이번 턴에 썼다
    if (!u.t.alive || u.tokTemp || !u.t.blood) continue;
    const got = u.t.blood.filter(e => e.a != null);
    if (!got.length) continue;
    uK(u).blood = { turn: X.turn + 1, v: got.map(e => ({ a: e.a, n: e.n })) };
    lg(X, `[피의 맹세] ${C(u).name}이(가) 피 ${got.length}개를 머금었다 — 다음 턴 공격 +${got.reduce((s, e) => s + e.a, 0)} (${got.map(e => e.n + " " + e.a).join(" · ")})`, "good");
  }
}
Object.assign(SPELL_OPS, {
  g1Oath(X, caster, it, k, op) {
    const L = liveUnits(X.P[caster]).filter(u => !u.phantom && !(u.t.blood && u.t.blood.some(e => e.u === u.uid)));
    if (!L.length) { fl(X, it.uid, "결속할 아군 없음", "miss"); lg(X, "[피의 맹세] 결속할 아군이 없다", "sys"); return; }
    X.g1Oath = true;
    for (const u of L) { u.t.blood = (u.t.blood || []).concat([{ u: u.uid, n: C(u).name, a: null }]); fl(X, u.uid, "🩸 피의 결속", "buff blood"); }
    lg(X, `[피의 맹세] 아군 ${L.length}기가 피로 결속했다 — 쓰러지면 피가 뒤 아군에게 옮겨 가고, 피를 받고 살아남은 유닛은 다음 턴 그 공격만큼 강해진다`, "spell");
  },
  g1Grudge(X, caster, it, k, op) {
    const p = X.P[caster], n = (p.burn || []).filter(id => CARDS[id] && CARDS[id].type === "unit").length;
    const L = pickTargets(X, caster, "ally", op.area || { t: "back", n: 1 }, k);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    if (!n) { fl(X, it.uid, "소각장에 유닛 없음", "miss"); lg(X, "[원한의 일격] 소각장에 유닛이 없어 원한이 없다", "sys"); return; }
    for (const u of L) addStat(X, u, "a", n);
    lg(X, `[원한의 일격] 소각장의 유닛 ${n}장 → ${L.map(u => C(u).name).join(" · ")} 공격 +${n}`, "spell");
  }
});

/* ---------- v3.93 벨루미르의 별: 활 · 별빛 연사 (카드 데이터 js/elf.js, 사용자 설계) ----------
   [활] = 활을 든 유닛: 활 아이템(아이콘 bow)을 장착했거나, 활을 든 사수 유닛(ELF_BOW_UNITS), 또는 궁사회 무기고로 활을 받은 유닛(keep.bow — 쓰러질 때까지 판 내내).
   a3Arm { a }: 아이템을 장착하지 않은 아군 유닛 전체(마법이 부른 유닛 빼고)가 활을 받는다 + 이번 턴 공격 +a · [원거리].
   a3Volley { per }: 살아 있는 아군 [활] 유닛 수 × per를 상대 유닛 전체에게 피해(방어를 보지 않음 · [증폭]은 맞는 유닛마다). 무작위 없음. */
function a3HasBow(u) {
  if (!isUnit(u) || !u.t) return false;
  if (u.t.keep && u.t.keep.bow) return true;
  if (typeof ELF_BOW_UNITS !== "undefined" && ELF_BOW_UNITS[u.id]) return true;
  const ic = u.item && CARDS[u.item.id] && CARDS[u.item.id].item;
  return !!(ic && ic.icon === "bow");
}
Object.assign(SPELL_OPS, {
  a3Arm(X, caster, it, k, op) {
    const L = liveUnits(X.P[caster]).filter(u => !u.item && !u.phantom && !C(u).tok);
    if (!L.length) { fl(X, it.uid, "활을 받을 아군 없음", "miss"); lg(X, "[궁사회 무기고] 아이템이 없는 아군 유닛이 없어 활을 나눠 주지 못했다", "sys"); return; }
    for (const u of L) {
      uK(u).bow = true;
      addStat(X, u, "a", op.a == null ? 2 : op.a);
      u.t.gx = mergeAbil(u.t.gx || {}, { ranged: true });
      fl(X, u.uid, "활 · 원거리", "buff");
    }
    lg(X, `[궁사회 무기고] ${L.map(u => C(u).name).join(" · ")}이(가) 활을 들었다 — 이번 턴 공격 +${op.a == null ? 2 : op.a} · [원거리], 활은 판 내내`, "spell");
    step(X, {}, 360);
  },
  a3Volley(X, caster, it, k, op) {
    const me = X.P[caster], o = X.P[1 - caster];
    const B = liveUnits(me).filter(a3HasBow), n = B.length;
    if (!n) { fl(X, it.uid, "활 든 아군 없음", "miss"); lg(X, "[별빛 연사] 활을 든 아군이 없어 화살이 나가지 않았다", "sys"); return; }
    const L = uEyeFilter(X, o, queueOf(o));
    if (!L.length) { lg(X, "[별빛 연사] 맞을 상대 유닛이 없다", "sys"); return; }
    const x = n * (op.per == null ? 2 : op.per), amp = ampKind(C(it)) ? amplify(me) : 0;
    for (const u of B) fl(X, u.uid, "활 시위", "buff");
    lg(X, `[별빛 연사] 활을 든 아군 ${n}기(${B.map(u => C(u).name).join(" · ")}) → 상대 유닛 전체에게 피해 ${x}${amp ? " +증폭 " + amp : ""}`, "spell");
    step(X, {}, 300);
    for (const u of L) if (u.t.alive) hurt(X, u, spellDmg(X, u, x, amp));
    step(X, {}, 300);
  }
});

/* ---------- v3.95 천족: 빛의 심판 · 성흔 (카드 데이터는 js/spelltune.js "v3.95 천족") ----------
   a2Judge { n }: 아군 맨 앞 n기(칸 순, [수호] 무시)의 방어가 이번 턴 0이 된다. 실제로 깎인 방어의 합만큼 상대 대기열 맨 앞부터 체력을 깎는다.
     쓰러뜨리고 남은 몫은 다음 유닛에게(보호막 · 가호에 막힌 몫은 사라진다 — [연쇄]와 같은 셈). [저주 면역] · 버팀/고정 방어는 깎이지 않아 셈에서 빠진다.
   a2Wound(2026-11-22 성흔, 전 대신 속죄 a2Sub — 사용자: 자리만 옮기면 되는 효과라 바꿈): 이번 턴(이 전투) 이 마법 주인 쪽 아군 유닛이 실제로 잃은 체력만큼
     [새벽빛]이 모인다(X.a2Wound[i], hurt가 a2WoundLight로 센다 — 보호막 · 가호 · 사슬을 거친 뒤 남은 체력까지만, 넘친 피해는 안 셈). 같은 마법의 grant가 맨 앞 2기 [가호 1].
     막은 피해는 원래대로 a2Blk가 센다. 새벽빛이 없는 쪽(천족 깃발 아님)은 아무것도 모이지 않는다. */
function a2WoundLight(X, u, v) {
  if (!X.a2Wound || !(v > 0)) return;
  const p = uSideOf(X, u), i = p ? X.P.indexOf(p) : -1;
  if (i >= 0 && X.a2Wound[i]) a2LightAdd(X, i, v, "성흔", u.uid);
}
Object.assign(SPELL_OPS, {
  a2Judge(X, caster, it, k, op) {
    const me = X.P[caster], o = X.P[1 - caster];
    const A = liveUnits(me).slice(0, op.n || 2);
    if (!A.length) { fl(X, it.uid, "아군 없음", "miss"); lg(X, "[빛의 심판] 방어를 바칠 아군이 없다", "sys"); return; }
    let pool = 0;
    for (const u of A) {
      const b = Math.max(0, u.t.d);
      if (u.t.lock) { fl(X, u.uid, "저주 면역", "miss"); continue; }
      u.t.d = 0; applyFloor(u);
      const cut = b - Math.max(0, u.t.d); pool += cut;
      fl(X, u.uid, cut ? "방어 0" : (u.t.floor.d ? PIN_KO[u.t.floor.d.m] + " 방어" : "방어 0"), cut ? "debuff" : "miss");
    }
    const amp = pool > 0 && ampKind(C(it)) ? amplify(me) : 0;
    let left = pool, ampLeft = amp;   // [증폭]은 처음 맞는 유닛에 한 번(ampHit)
    lg(X, `[빛의 심판] 아군 ${A.map(u => C(u).name).join(" · ")}의 방어 ${pool}${amp ? " +증폭 " + amp : ""} → 상대 맨 앞부터 체력 −${left}`, "spell");
    if (left <= 0) return;
    step(X, {}, 300);
    for (const u of uEyeFilter(X, o, queueOf(o))) {
      if (left <= 0) break;
      if (!u.t.alive) continue;
      if (ampLeft) { left += ampHit(X, u, ampLeft); ampLeft = 0; }
      const hp = hpLeft(u), got = hurt(X, u, left, "심판");
      if (u.t.alive) break;
      left = Math.max(0, got - hp);
    }
    step(X, {}, 300);
  },
  a2Wound(X, caster, it, k, op) {
    X.a2Wound = X.a2Wound || [false, false]; X.a2Wound[caster] = true;
    fl(X, it.uid, "성흔", "buff");
    lg(X, "[성흔] 이번 턴 아군 유닛이 잃은 체력만큼 새벽빛이 모인다", "sys");
  }
});

/* ---------- v3.95 엘프: 혼란의 바람 (카드 데이터는 js/spelltune.js 끝 "v3.95 엘프" 절) ----------
   a3Confuse { n }: 상대 맨 앞 n기의 방어와 남은 체력을 맞바꾼다. 방어가 0이던 유닛은 체력 0이 되어 쓰러진다(사용자 — 뼈 부수기와 같은 결, 대신 맨 앞 1기 · 공격 마법).
     방어가 커지고 체력이 작아지므로 [방어무시] · [사격] · 마법 피해(방어 무시)로 마무리하는 엘프 콤보. 찢는 바람(방어 0)을 먼저 쓰면 맨 앞 유닛이 쓰러진다.
     [저주 면역]은 혼란을 막지 않는다(혼란은 [저주]가 아니다 — 순환 · 맞바꾸기와 같은 스탯 옮기기). 다만 "방어가 깎이지 않는다"는 원래 규칙대로,
     방어가 체력보다 높아 방어가 내려갈 [저주 면역] 유닛은 그대로 둔다(반쪽만 바뀌어 체력이 오르는 일을 막는다). */
Object.assign(SPELL_OPS, {
  a3Confuse(X, caster, it, k, op) {
    const L = pickTargets(X, caster, "foe", { t: "front", n: op.n || 1 }, k);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    for (const u of L) {
      const d = u.t.d, h = hpLeft(u);
      if (u.t.lock && h < d) { fl(X, u.uid, "저주 면역", "miss"); continue; }
      setStats(X, u, { d: h, h: Math.max(0, d) }, "혼란");
    }
    lg(X, `[혼란의 바람] ${L.map(u => `${C(u).name}(방 ${u.t.d} · 체 ${Math.max(0, hpLeft(u))})`).join(" · ")}`, "spell");
  }
});

/* ---------- v3.95 마족: [저주] — 공포 · 역병 · 지옥불 · 빙의 · 정신 지배 (카드 데이터는 js/spelltune.js "v3.95 마족" 절, 사용자 결정) ----------
   [저주]는 묶음 이름이다. 그 아래 능력은 A1_CURSE에 적는다(지금 [공포 N] · [역병 N]) — 새 저주 능력은 여기에 한 줄 더하고 tick을 만들면
     [저주 면역] · [정화] · 칩 · 컴퓨터 판단이 저절로 따라온다.
   걸린 저주: 유닛의 keep.curse = { fear: [{ n, t, by }], plague: [...] } — [화상]처럼 따로따로 쌓인다(t = 걸린 턴, by = 건 쪽 플레이어 번호).
     다음 턴 전투가 시작될 때(a1CurseTick — [정화] 다음 · 불씨 · 화상 전 · 첫 마법 전) 지난 턴까지 걸린 저주가 발동하고 꺼진다.
     발동한 저주는 이번 턴 t.cursed = { fear: N, plague: true }로 남는다(정신 지배의 조건 · 화면).
   [공포 N]: 이번 턴 공격 −N(0 아래로는 안 내려감) · 방어 −⌈N/3⌉ (공 3 : 방 1). 드워프(B2) 유닛은 방어 −1 더. 같은 유닛의 공포는 N을 모두 더해 한 번에 깎는다.
   [역병 N]: 이번 턴 특수능력을 모두 끈다(a2Silence와 같음 — 레어 오라 · 유니크 능력은 그대로). N ≥ 2면 꺼질 때 양옆 유닛(대기열 바로 앞 · 뒤)에
     [역병 N−1]이 옮는다(다음 턴에 발동 — 고블린 [화상] 번짐과 같은 방식).
   [저주 면역]: 저주가 걸리지 않고, 이번 턴 [저주 면역]을 받으면 걸려 있던 저주도 사라진다(lock 효과 · a1CurseOn).
   [정화]: [저주]를 씻는다 — 공포 · 역병이 함께 사라진다(nwPurify · mrPurge가 a1CurseWash를 부른다).
   핸드의 저주(손끝 저주 · 저주 전염, game.js HAND_OPS.handCurse): 핸드 카드의 it.hc = { fear: n, plague: n } — 전장에 오를 때(resetTurn) keep.curse로 옮겨
     그 유닛의 첫 전투가 시작될 때 발동한다.
   마법 효과:
     curse { side, area, kind, n } — 그 범위에 [공포 n] / [역병 n]. 이번 턴 공격도 깎으려면 따로 mod를 붙인다.
     a1Hellfire {}  지옥불 — 방어가 가장 높은 상대 유닛 1기(같으면 앞)의 방어 D가 −D가 되고 체력 −D(방어 무시 · 증폭 더함). 방어가 두터울수록 뜨겁게 탄다.
                    [저주 면역]이면 방어는 그대로 · 피해는 들어간다(지옥불은 저주가 아니다). D가 0 이하면 불이 붙지 않는다.
     a1Possess {}   빙의 — 남은 체력이 가장 높은 상대 유닛 1기의 남은 체력이, 전장(양쪽)에서 레벨이 가장 낮은 다른 유닛의 남은 체력이 된다(더 낮을 때만).
                    [저주 면역]이면 막힌다(빙의는 저주 묶음의 혼을 빼는 술법).
     a1Dominate { lv } 정신 지배 — [저주]가 든(걸려 있거나 이번 턴 발동한) 상대 유닛, 또는 레벨 lv 이하인 상대 유닛 가운데 공격이 가장 높은 1기를
                    이번 턴 내 전장 맨 뒤로 데려와 내 편으로 싸우게 한다. 살아남으면 전투가 끝날 때 상대 전장 맨 뒤로 돌아간다(a1MindEnd).
                    [굳건] · [저주 면역]은 막는다. 내 전장에 빈 칸이 없으면 못 데려온다.
   ※ 이 절은 engine.js 맨 끝에 있다. 다른 절을 고칠 때 파일 끝을 잘라 내지 말 것(2026-11-18 한 번 지워져 다시 붙임). */
const A1_CURSE = {
  fear:   { ko: "공포", tip: n => `공포 ${n}\n다음 턴 전투가 시작될 때 공격 −${n} · 방어 −${Math.ceil(n / 3)} (드워프는 방어 −1 더). 그 뒤 꺼진다.\n[저주] — [저주 면역]이면 걸리지 않고 [정화]로 씻긴다.` },
  plague: { ko: "역병", tip: n => `역병 ${n}\n다음 턴 전투가 시작될 때 이번 턴 특수능력이 모두 꺼진다.${n >= 2 ? `\n꺼지면서 양옆 유닛에게 [역병 ${n - 1}]이 옮는다.` : ""}\n[저주] — [저주 면역]이면 걸리지 않고 [정화]로 씻긴다.` }
};
const A1_DWARF = "B2";
function a1Curses(u) {   // 걸린 저주 { kind: [{n,t,by}] } (없으면 빈 것)
  const k = u && u.t && u.t.keep;
  return (k && k.curse) || {};
}
function a1CurseList(u) {   // 칩 · 글: [{ kind, n }] 저주마다
  const c = a1Curses(u), out = [];
  for (const kind in A1_CURSE) for (const e of (c[kind] || [])) out.push({ kind, n: e.n, ko: A1_CURSE[kind].ko });
  return out;
}
function a1Cursed(u) { return a1CurseList(u).length > 0 || !!(u && u.t && u.t.cursed); }
function a1CurseOn(X, u, kind, n, by, cls) {
  if (!u || !u.t || !u.t.alive || !(n > 0) || !A1_CURSE[kind]) return false;
  const ko = A1_CURSE[kind].ko;
  if (u.t.lock) { fl(X, u.uid, "저주 면역", "miss"); lg(X, `[저주 면역] ${C(u).name}에게 [${ko} ${n}]이 걸리지 않았다`, "good"); return false; }
  const k = uK(u), c = k.curse = k.curse || {};
  (c[kind] = c[kind] || []).push({ n, t: X.turn, by: by == null ? null : by });
  fl(X, u.uid, ko + " " + n, "debuff curse" + (cls ? " " + cls : ""));
  lg(X, `[${ko} ${n}] ${C(u).name}${cls === "spread" ? "에 역병이 옮았다" : "에게 저주가 걸렸다"} — 다음 턴 전투가 시작될 때 발동`, "sys");
  return true;
}
function a1CurseWash(u) {   // [정화] · [저주 면역]: 걸린 저주를 모두 지우고 지운 이름 목록을 돌려준다
  const k = u && u.t && u.t.keep;
  if (!k || !k.curse) return [];
  const had = a1CurseList(u).map(e => e.ko + " " + e.n);
  k.curse = null;
  return had;
}
function a1CurseTick(X, sweep) {
  let any = false;
  const spread = [];
  for (const p of X.P) {
    const Q = queueOf(p);
    for (const u of liveUnits(p)) {
      const c = a1Curses(u); if (!u.t.keep || !u.t.keep.curse) continue;
      const due = {}, left = {};
      for (const kind in c) { const L = c[kind] || []; due[kind] = L.filter(e => e.t < X.turn); left[kind] = L.filter(e => e.t >= X.turn); }
      const has = Object.keys(due).some(kd => due[kd].length);
      if (!has) continue;
      u.t.keep.curse = Object.keys(left).some(kd => left[kd].length) ? left : null;
      u.t.cursed = u.t.cursed || {};
      any = true;
      const fear = (due.fear || []).reduce((s, e) => s + e.n, 0);
      if (fear > 0) {
        const da = Math.min(fear, Math.max(0, u.t.a)), dd = Math.ceil(fear / 3) + (C(u).group === A1_DWARF ? 1 : 0);
        step(X, { tgt: u.uid }, 260);
        lg(X, `[공포 ${fear}] ${C(u).name}이(가) 공포에 질렸다 — 공격 −${fear} · 방어 −${dd}${C(u).group === A1_DWARF ? " (드워프 −1 더)" : ""}`, "bad");
        if (da) addStat(X, u, "a", -da);
        addStat(X, u, "d", -dd);
        u.t.cursed.fear = fear;
      }
      if ((due.plague || []).length) {
        a2Silence(X, u); u.t.cursed.plague = true;
        fl(X, u.uid, "역병 · 능력 꺼짐", "debuff curse");
        lg(X, `[역병] ${C(u).name}의 특수능력이 이번 턴 꺼졌다`, "bad");
        const i = Q.indexOf(u), nb = [Q[i - 1], Q[i + 1]].filter(Boolean);
        for (const e of due.plague) if (e.n >= 2) for (const v of nb) spread.push([v, e.n - 1, e.by]);
      }
    }
  }
  for (const [v, n, by] of spread) a1CurseOn(X, v, "plague", n, by, "spread");
  if (any) { rareAuraSync(X); step(X, {}, 380); sweep(); }
}
/* 핸드에서 걸린 저주(it.hc)를 전장에 오른 유닛의 keep.curse로 옮긴다(resetTurn이 부른다). t: −1 = 첫 전투에 발동.
   it.hc는 지우지 않고 keep.hcIn으로 한 번만 옮긴다 — 컴퓨터(어려움)가 핸드 카드를 미리 놓아 보고 it.t를 되돌려도 저주가 남게 */
function a1HandCurseIn(it) {
  if (!it || !it.hc || !it.t) return;
  const k = it.t.keep = it.t.keep || {};
  if (k.hcIn) return;
  k.hcIn = true;
  const c = k.curse = k.curse || {};
  for (const kind in it.hc) if (A1_CURSE[kind] && it.hc[kind] > 0) (c[kind] = c[kind] || []).push({ n: it.hc[kind], t: -1, by: null });
}
/* 컴퓨터 판단: p의 유닛에 걸린 저주의 무게(공포 N × 0.5 · 역병 1 + (N−1) × 0.5) */
function a1CurseSum(p) {
  return p.field.reduce((s, u) => {
    if (!isUnit(u) || !u.t || !u.t.alive) return s;
    return s + a1CurseList(u).reduce((t, e) => t + (e.kind === "fear" ? e.n * 0.5 : 1 + (e.n - 1) * 0.5), 0);
  }, 0);
}
/* 정신 지배로 데려온 유닛: 살아남았으면 전투가 끝날 때 원래 주인의 전장 맨 뒤로(칸이 없으면 흩어져 소각장으로 — 빼앗기와 같음)
   2026-11-22 그림자 강탈로 빼앗은 유닛도(t.mind = "그림자 강탈") */
function a1MindEnd(X) {
  let any = false;
  for (const p of X.P) for (const u of p.field.slice()) {
    if (!isUnit(u) || !u.t || !u.t.alive || !u.t.mind) continue;
    const o = X.P.find(q => q.idx === u.from);
    if (!o || o === p) continue;
    const nm = typeof u.t.mind === "string" ? u.t.mind : "정신 지배";
    const xs = o.field.filter(Boolean);
    if (xs.length >= RULES.slots) { lg(X, `[${nm}] ${C(u).name}이(가) 돌아갈 칸이 없어 흩어졌다`, "sys"); continue; }
    p.field[p.field.indexOf(u)] = null;
    const mine = p.field.filter(Boolean); p.field = mine.concat(Array(RULES.slots - mine.length).fill(null));
    xs.push(u); o.field = xs.concat(Array(RULES.slots - xs.length).fill(null));
    u.from = null; u.tokTemp = false; u.t.stolen = false; u.t.mind = false;
    fl(X, u.uid, nm === "정신 지배" ? "정신 돌아옴" : "돌아감", "heal");
    lg(X, nm === "정신 지배" ? `[정신 지배] ${C(u).name}이(가) 정신을 차리고 ${o.name}의 전장 맨 뒤로 돌아갔다` : `[${nm}] ${C(u).name}이(가) ${o.name}의 전장 맨 뒤로 돌아갔다`, "sys");
    any = true;
  }
  if (any) step(X, {}, 420);
}
Object.assign(SPELL_OPS, {
  curse(X, caster, it, k, op) {
    const L = pickTargets(X, caster, op.side || "foe", op.area || { t: "front", n: 1 }, k);
    if (!L.length) { fl(X, it.uid, "대상 없음", "miss"); return; }
    for (const u of L) a1CurseOn(X, u, op.kind, op.n, caster);
  },
  a1Hellfire(X, caster, it, k, op) {
    const F = X.P[1 - caster];
    const L = uEyeFilter(X, F, liveUnits(F).sort((a, b) => b.t.d - a.t.d || colOf(F, a) - colOf(F, b)));
    const u = L[0];
    if (!u) { fl(X, it.uid, "대상 없음", "miss"); return; }
    const D = u.t.d;
    if (!(D > 0)) { fl(X, u.uid, "불이 붙지 않음", "miss"); lg(X, `[지옥불] ${C(u).name}은(는) 방어가 없어 지옥불이 붙지 않았다`, "sys"); return; }
    const amp = ampKind(C(it)) ? amplify(X.P[caster]) : 0;
    lg(X, `[지옥불] ${C(u).name}의 방어 ${D}가 불길이 되었다 — 방어 ${D} → −${D}, 체력 −${D}${amp ? " +증폭 " + amp : ""}`, "spell");
    if (u.t.lock) fl(X, u.uid, "저주 면역", "miss"); else { u.t.d = -D; applyFloor(u); fl(X, u.uid, "⛨ " + u.t.d, "debuff"); }
    hurt(X, u, D + ampHit(X, u, amp), "지옥불");
  },
  a1Possess(X, caster, it, k, op) {
    const F = X.P[1 - caster];
    const L = uEyeFilter(X, F, liveUnits(F).sort((a, b) => hpLeft(b) - hpLeft(a) || colOf(F, a) - colOf(F, b)));
    const u = L[0];
    if (!u) { fl(X, it.uid, "대상 없음", "miss"); return; }
    const all = X.P.flatMap(p => liveUnits(p)).filter(v => v !== u);
    const ref = all.sort((a, b) => C(a).lv - C(b).lv || hpLeft(a) - hpLeft(b))[0];
    if (!ref) { fl(X, u.uid, "빙의할 혼 없음", "miss"); return; }
    if (u.t.lock) { fl(X, u.uid, "저주 면역", "miss"); lg(X, `[저주 면역] ${C(u).name}은(는) 빙의되지 않았다`, "good"); return; }
    const v = hpLeft(ref);
    if (hpLeft(u) <= v) { fl(X, u.uid, "빙의 · 그대로", "miss"); lg(X, `[빙의] ${C(u).name}의 체력이 이미 ${C(ref).name}(L${C(ref).lv})의 체력 ${v} 이하다`, "sys"); return; }
    lg(X, `[빙의] ${C(ref).name}(L${C(ref).lv})의 혼이 ${C(u).name}에 깃들었다 — 남은 체력 ${hpLeft(u)} → ${v}`, "spell");
    setStats(X, u, { h: v }, "빙의");
  },
  a1Dominate(X, caster, it, k, op) {
    const F = X.P[1 - caster], lv = op.lv == null ? 3 : op.lv;
    const L = uEyeFilter(X, F, liveUnits(F).filter(u => a1Cursed(u) || C(u).lv <= lv)
      .sort((a, b) => b.t.a - a.t.a || C(b).lv - C(a).lv || colOf(F, a) - colOf(F, b)));
    const u = L[0];
    if (!u) { fl(X, it.uid, "대상 없음", "miss"); lg(X, `[정신 지배] [저주]가 들었거나 레벨 ${lv} 이하인 상대 유닛이 없다`, "sys"); return; }
    if (u.t.lock) { fl(X, u.uid, "저주 면역", "miss"); lg(X, `[저주 면역] ${C(u).name}은(는) 지배되지 않았다`, "good"); return; }
    const before = F.field.includes(u);
    stealCard(X, caster, it, u);
    if (before && !F.field.includes(u)) { u.t.mind = true; fl(X, u.uid, "정신 지배", "debuff curse"); }
  }
});

/* ---------- 2026-11-22 케라운 [전도] · [감전] (사용자: [요격] · 즈라크의 번개 병 [화염 갑주]를 바꿈) ----------
   [전도](conduct): 이번 턴 내 마법에 맞은 상대 유닛과 맞붙으면(공격 · 반격) 피해 +2. 맞은 표시 t.zap은 castSpell 동안 hurt가 상대 유닛에 남긴다
     (피해를 겨눈 순간 — 보호막 · 가호에 막혀도 맞은 것). t는 턴마다 새로 만들어지므로 이번 턴만.
   [감전 N](shock): 이 유닛을 맞붙어 공격한 상대 유닛은 다음 턴 공격 −N(공격이 턴마다 번갈아 가므로 다음 턴 그 유닛의 반격이 약해진다).
     이 유닛이 쓰러져도 · 원거리 공격자에게도 걸린다. 여러 번 걸려도 더하지 않고 큰 값 하나. keep.shock = { turn: 다음 턴, n } — resetTurn이 공격에서 빼고(▲ · 🔒 공격이면 안 빠짐),
     그 턴 전투가 끝날 때 kzShockEnd가 지운다. */
const KZ_CONDUCT = 2;
function kzConduct(X, src, tgt) {
  if (!abilOf(src).conduct || !tgt || !tgt.t || !tgt.t.zap) return 0;
  fl(X, tgt.uid, "전도 +" + KZ_CONDUCT, "debuff");
  return KZ_CONDUCT;
}
function kzShock(X, Au, Du) {
  const n = abilOf(Du).shock;
  if (!(n > 0) || !Au.t.alive) return;
  const k = uK(Au), was = k.shock && k.shock.turn > X.turn ? k.shock.n : 0;
  k.shock = { turn: X.turn + 1, n: Math.max(was, n) };
  fl(X, Au.uid, "감전 " + n, "debuff");
  lg(X, `[감전 ${n}] ${C(Du).name}을(를) 친 ${C(Au).name} — 다음 턴 공격 −${k.shock.n}`, "sys");
}
function kzShockEnd(X) {
  for (const p of X.P) for (const u of p.field) { const k = isUnit(u) && u.t && u.t.keep; if (k && k.shock && k.shock.turn <= X.turn) delete k.shock; }
}

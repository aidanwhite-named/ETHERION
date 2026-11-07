/* ETHERION — 컴퓨터 '어려움' (v3.16)
   보통(js/game.js aiPrep)은 카드마다 대충 매긴 값에 흔들림을 더해 고른다. 어려움은 흔들림 없이
   둘 수 있는 수(카드 · 칸 · 장착할 유닛 · 자리 바꾸기)를 하나하나 전투 엔진으로 여러 번 미리 굴려 보고,
   전투가 끝난 뒤의 판 값(남은 유닛 · 생명 · 승패)이 가장 커지는 수를 고른다.
   - 공정하게: 상대의 뒷면 마법 · 핸드 · 덱은 보지 않는다. 사람이 볼 수 있는 것만 본다.
     (계략 마법의 값은 보통과 같은 HAND_OPS[].ai를 쓴다)
   - 같은 난수 씨앗 묶음으로 모든 수를 굴려(공통 난수) 코인 운의 차이가 판단을 흔들지 않게 한다.
   - 수치(HARD)는 tools/balance/vs.js로 보통과 수백 판씩 붙여 맞췄다(보통에게 약 80% 승). 결과는 docs/CHANGELOG.md v3.16.
   - 판의 결과를 바꾸는 난수(GRand)는 쓰지 않는다. 미리 굴리기는 엔진의 시드 난수(ctx seed) 위에서만 돈다. */
"use strict";

const HARD = {
  sims: 10,        // 수 하나를 굴려 보는 횟수
  unitW: 1.0,      // 전투 뒤 남은 유닛 값(unitWorth)의 무게
  lifeW: 0.5,      // 생명 1의 값
  lowLife: 10,     // 생명이 이 아래로 내려가면 생명 값이 커진다
  lowW: 0.5,       // 그 아래 생명 1당 더하는 값
  win: 60,         // 이번 전투에서 상대 생명이 다하면 / 내가 다하면
  handW: 0.9,      // 핸드 카드 한 장을 쓰는 값 (다음 보충 때 생명 −1 + 남겨 둘 값)
  upW: 0.35,       // 전장에 남는 유닛의 유지비 1당 깎는 값 (다음 턴부터 에테르가 빠진다)
  reloadW: 0.8,    // 장전(다음 턴 에테르 −) 1
  bonusW: 0.6,     // 직접 공격 보너스(맞은 쪽 다음 턴 에테르 +1)
  minGain: 0.05,   // 이보다 덜 좋아지면 두지 않는다
  upSlack: 1,      // 다음 턴 에테르 − 유지비가 이만큼은 남게
  crysTo: 9,       // 결정 목표
  keepHand: 2,     // 결정화하고도 핸드에 남길 장수
  mullLv: 5,       // 멀리건: 이 레벨 이상은 되돌린다(낮은 카드가 모자랄 때)
  spendW: 0.15,    // 에테르를 쓰는 값 (남은 에테르는 넘어가지 않는다)
  handOpt: null,   // 핸드 카드를 남겨 둘 값 (null이면 handW 하나로)
  phantom: 0.5,    // 공격할 때 상대가 더 낼 '그림자' 유닛 (값의 무게, 0 = 안 씀)
  pairs: 5,        // 혼자서 이득인 수가 없을 때 짝지어 볼 위쪽 수의 개수 (0 = 안 함)
  shuf: 2,         // 지금 낼 만한 카드가 이 장수보다 적으면 셔플 (0 = 안 함)
  shufLife: 10,    // 셔플은 생명이 이보다 많을 때만
  look2: 0.4       // 다음 턴 전투까지 한 번 더 굴려 섞는 비율
};

const hardYield = () => (G && !G.cfg.headless && G.speed !== 0) ? wait(0) : null;

/* 생명의 값: 낮을수록 1이 더 귀하다 */
function hardLife(x) { return x <= 0 ? -HARD.win : HARD.lifeW * x - HARD.lowW * Math.max(0, HARD.lowLife - x); }
/* 전투가 끝난 판의 값 (me 기준) */
function hardState(P, me) {
  const o = 1 - me;
  const board = p => p.field.reduce((s, u) => s + (isUnit(u) && u.t && u.t.alive ? (unitWorth(u) * HARD.unitW - C(u).up * HARD.upW) * (u.phantom ? HARD.phantom : 1) : 0), 0);
  return board(P[me]) - board(P[o]) + hardLife(P[me].life) - hardLife(P[o].life)
    - HARD.reloadW * (P[me].reload || 0) + HARD.reloadW * (P[o].reload || 0)
    + HARD.bonusW * ((P[me].bonus || 0) - (P[o].bonus || 0));
}
/* 지금 판으로 이번 전투를 HARD.sims번 굴린 평균 (상대 뒷면 마법은 모름) */
function hardEval(p, seeds) {
  const me = p.idx, hide = 1 - me;
  // 내 마법은 아직 뒷면이지만 나는 안다. 상대 마법은 준비 단계 동안 뒷면이라 빼고 굴린다
  const base = G.players.map(q => cloneSide(q, q.idx === hide && prepIdx() === me));
  const ph = HARD.phantom ? hardPhantom(p) : null;
  let s = 0;
  for (const seed of seeds) {
    const P = JSON.parse(JSON.stringify(base));
    if (ph && seed % 2 === 0) { const f = P[hide].field, k = f.indexOf(null); if (k >= 0) f[k] = JSON.parse(JSON.stringify(ph)); }
    runCombatCore(ctx(P, G.attacker, G.turn, null, { seed, rules: G.rules }));
    let v = hardState(P, me);
    // 다음 턴도 한 번: 공수가 바뀌고, 남은 유닛은 회복한 채로 (양쪽이 새로 낼 카드는 모른다)
    if (HARD.look2 && P[0].life > 0 && P[1].life > 0) {
      for (const q of P) { q.field = q.field.filter(u => u && isUnit(u) && u.t && u.t.alive && !u.tokTemp); for (const u of q.field) resetTurn(u); while (q.field.length < RULES.slots) q.field.push(null); q.bonus = 0; }
      runCombatCore(ctx(P, 1 - G.attacker, G.turn + 1, null, { seed: seed ^ 0x5bd1e995, rules: G.rules }));
      v = v * (1 - HARD.look2) + hardState(P, me) * HARD.look2;
    }
    s += v;
  }
  resetRng();
  return s / seeds.length;
}

/* 내가 공격할 때 상대는 내 배치를 본 뒤에 막을 유닛을 더 낸다. 상대 핸드는 모르므로, 상대 단체의 유닛 중
   상대가 낼 수 있을 만한 레벨의 것 하나를 '그림자'로 세워 굴림의 절반에 넣는다 (상대 단체 · 에테르 · 핸드 장수는 사람도 보는 것) */
function hardPhantom(p) {
  const o = opp(p);
  if (G.attacker !== p.idx || prepIdx() !== p.idx || !o.group || !o.hand.length || !o.field.includes(null)) return null;
  const est = ether(o) + (crysLeft(o) > 0 && o.crystals.length < RULES.maxCrystals ? 1 : 0);
  const L = Math.min(est, 6); if (L < 1) return null;
  const pool = cardsOfGroup(o.group).filter(c => c.type === "unit" && !c.tok && c.lv <= L && !c.gift);
  if (!pool.length) return null;
  const top = Math.max(...pool.map(c => c.lv));
  const xs = pool.filter(c => c.lv === top).sort((a, b) => (a.a + a.d + a.h) - (b.a + b.d + b.h) || (a.id < b.id ? -1 : 1));
  const c = xs[Math.floor(xs.length / 2)];
  const it = { uid: 990001, id: c.id, item: null, summoned: G.turn, phantom: true };
  resetTurn(it);
  return it;
}

/* ---------- 미리 두어 보기 (실제 판을 잠깐 바꿨다가 되돌린다) ---------- */
function hardTry(p, a, seeds) {
  const undo = hardApply(p, a);
  const v = hardEval(p, seeds);
  undo();
  return v;
}
function hardApply(p, a) {
  if (a.kind === "unit" || a.kind === "spell") {
    const it = a.it, keep = { t: it.t, summoned: it.summoned, item: it.item }, f0 = p.field;
    p.field = hardInsert(f0, it, a.at);
    if (a.kind === "unit") { it.summoned = G.turn; it.item = null; resetTurn(it); }
    return () => { p.field = f0; it.t = keep.t; it.summoned = keep.summoned; it.item = keep.item; };
  }
  if (a.kind === "item") {
    const host = p.field[a.s], keep = { t: host.t, item: host.item };
    host.item = { id: a.it.id, equipped: G.turn };
    const dmg = host.t ? host.t.dmg : 0; resetTurn(host); host.t.dmg = dmg;
    return () => { host.t = keep.t; host.item = keep.item; };
  }
  if (a.kind === "move") {
    const f = p.field; p.field = moveField(f, a.from, a.to);
    return () => { p.field = f; };
  }
  return () => {};
}

/* 전장 카드 사이 at번째(0 = 맨 앞)에 끼운 새 전장 (빈 칸은 뒤로) */
function hardInsert(f, it, at) { const xs = f.filter(Boolean); xs.splice(at, 0, it); return xs.concat(Array(RULES.slots - xs.length).fill(null)); }
/* 핸드 한 장을 쓰는 값: 다음 보충은 모자란 만큼 뽑고 생명이 그만큼(최소 1) 준다. 핸드가 꽉 차 있으면 첫 장은 생명이 들지 않는다 */
function hardHandCost(p) {
  if (HARD.handOpt == null) return HARD.handW;
  const size = (G.rules && G.rules.handSize) || RULES.handSize;
  return (size - p.hand.length + 1 > 1 ? HARD.lifeW : 0) + HARD.handOpt;
}
/* 다음 턴에 낼 수 있는 에테르 (결정 하나 더 · 장전 빼고) */
function hardNextEther(p) { return RULES.essence + Math.min(RULES.maxCrystals, p.crystals.length + 1) - (p.reload || 0); }
const hardFieldUp = p => p.field.reduce((s, u) => s + (isUnit(u) ? C(u).up : 0), 0);

/* 둘 수 있는 수 모두 (같은 카드는 한 번만) */
function hardOptions(p) {
  const out = [], seen = new Set();
  const n = p.field.filter(Boolean).length, ats = Array.from({ length: n + 1 }, (_, i) => i);
  for (const it of p.hand) {
    const c = C(it);
    if (c.type === "hand" || seen.has(c.id)) continue;
    if (canPlay(p, c)) continue;
    seen.add(c.id);
    if (c.type === "unit") {
      if (c.up && hardFieldUp(p) + c.up > hardNextEther(p) - HARD.upSlack) continue;
      for (const at of ats) out.push({ kind: "unit", it, at });
    } else if (c.type === "item") {
      for (const h of equipHosts(p, c)) out.push({ kind: "item", it, s: h.s });
    } else {
      for (const at of ats) out.push({ kind: "spell", it, at });
    }
  }
  return out;
}

/* 전장 카드의 순서: 모든 순열(최대 5! = 120)을 굴려 보고 가장 좋은 것. 지금보다 나을 때만 돌려준다 */
function hardPerms(xs) {
  if (xs.length <= 1) return [xs];
  const out = [], used = new Set();
  xs.forEach((x, i) => {
    const key = x.id + ":" + (x.item ? x.item.id : ""); if (used.has(key)) return; used.add(key);
    for (const r of hardPerms(xs.slice(0, i).concat(xs.slice(i + 1)))) out.push([x].concat(r));
  });
  return out;
}
function hardBestOrder(p, seeds, cur) {
  const xs = p.field.filter(Boolean); if (xs.length < 2) return null;
  const f0 = p.field; let best = null;
  for (const ord of hardPerms(xs)) {
    p.field = ord.concat(Array(RULES.slots - ord.length).fill(null));
    const v = hardEval(p, seeds);
    if (!best || v > best.v) best = { v, f: p.field };
  }
  p.field = f0;
  return best && best.v - cur >= HARD.minGain ? best.f : null;
}

/* ---------- 결정화 ---------- */
function hardCrystalPlan(p) {
  const cr = p.crystals.length;
  if (cr >= Math.min(HARD.crysTo, RULES.maxCrystals) || p.hand.length <= HARD.keepHand) return [];
  let want = Math.min(crysLeft(p), Math.min(HARD.crysTo, RULES.maxCrystals) - cr, p.hand.length - HARD.keepHand);
  if (want <= 0) return [];
  // 쌓인 한도가 여럿이어도, 핸드에 지금 낼 만한 카드가 많으면 하나만
  const eth = ether(p);
  const keepV = (it, after) => {
    const c = C(it), cost = costOf(c);
    if (c.type === "hand") return 1.5;
    if (cost <= after) return 2 + c.lv * 0.5;
    if (cost <= after + 2) return 1 + c.lv * 0.2;
    return 0.3 - cost * 0.05;   // 한참 못 낼 카드부터 결정으로
  };
  const out = [], hand = p.hand.slice();
  for (let k = 0; k < want; k++) {
    const after = eth + k + 1;
    hand.sort((a, b) => keepV(a, after) - keepV(b, after));
    const x = hand[0];
    if (k > 0 && keepV(x, after) > 1.5) break;   // 두 번째부터는 버려도 되는 카드일 때만
    out.push(x.uid); hand.shift();
  }
  return out;
}

/* ---------- 멀리건 ---------- */
function aiMulliganHard(p) {
  const low = p.hand.filter(it => C(it).lv <= 3).length;
  let back = p.hand.filter(it => C(it).lv >= HARD.mullLv);
  if (low >= 4) back = p.hand.filter(it => C(it).lv >= 7);
  if (back.length) actMulligan(p, back.map(it => it.uid));
}

/* ---------- 준비 단계 ---------- */
async function aiPrepHard(p) {
  const myG = G;
  render(); await T(500); if (G !== myG) return;
  const seedBase = (Math.random() * 1e9) >>> 0;
  const seeds = Array.from({ length: HARD.sims }, (_, i) => (seedBase + i * 7919) >>> 0);

  // 핸드에 이번 턴 · 다음 턴에 낼 카드가 거의 없으면 셔플 (생명 −1)
  if (HARD.shuf && !shuffleBlock(p) && p.life > HARD.shufLife) {
    const e = ether(p) + Math.min(crysLeft(p), 1);
    const live = p.hand.filter(it => costOf(C(it)) <= e + 1).length;
    if (live <= HARD.shuf - 1 && p.hand.length >= 4) { actShuffle(p); render(); await T(420); if (G !== myG) return; }
  }
  for (const uid of hardCrystalPlan(p)) { actCrystal(p, uid); render(); await T(320); if (G !== myG) return; }

  // 계략 마법: 보통과 같은 값 매김. 이득이 분명할 때만
  for (let n = 0; n < 4; n++) {
    const hs = p.hand.filter(it => C(it).type === "hand" && !canPlay(p, C(it)) && !(C(it).cost && C(it).cost.life && p.life <= C(it).cost.life + 6))
      .map(it => ({ it, v: handSpellValue(p, C(it)) - HARD.handW })).sort((a, b) => b.v - a.v);
    if (!hs.length || hs[0].v <= 0.3) break;
    actPlace(p, hs[0].it.uid, null); render(); await T(420); if (G !== myG) return;
  }

  // 전장이 꽉 찼고 핸드에 훨씬 강한 유닛이 있으면 약한 유닛을 소각 (보통과 같은 기준)
  if (!p.field.includes(null)) {
    const weakest = p.field.map((it, s) => ({ it, s })).filter(x => isUnit(x.it)).sort((a, b) => unitWorth(a.it) - unitWorth(b.it))[0];
    const best = p.hand.map(it => C(it)).filter(c => c.type === "unit" && cardCost(c) <= ether(p)).sort((a, b) => b.lv - a.lv)[0];
    if (weakest && best && best.lv >= unitWorth(weakest.it) + 3) { actBurnField(p, weakest.s); render(); await T(320); }
  }

  let cur = hardEval(p, seeds);
  for (let n = 0; n < 10; n++) {
    if (G !== myG) return;
    const opts = hardOptions(p);
    let best = null;
    for (const a of opts) {
      a.v = hardTry(p, a, seeds) - hardHandCost(p) + HARD.spendW * costOf(C(a.it));
      if (!best || a.v > best.v) best = a;
    }
    await hardYield(); if (G !== myG) return;
    // 혼자서는 손해인 카드도 다른 카드와 함께면 이득일 수 있다 (마법 + 유닛, 아이템 + 유닛): 위쪽 몇 수와 그 다음 수를 짝지어 본다
    if (HARD.pairs && (!best || best.v - cur < HARD.minGain) && opts.length > 1) {
      const top = opts.slice().sort((a, b) => b.v - a.v).slice(0, HARD.pairs);
      for (const a1 of top) {
        const undo = hardApply(p, a1), hi = p.hand.indexOf(a1.it), c1 = costOf(C(a1.it));
        p.hand.splice(hi, 1); p.spent += c1;
        const hc = hardHandCost(p);
        let b2 = -Infinity;
        for (const a2 of hardOptions(p)) b2 = Math.max(b2, hardTry(p, a2, seeds) - hc);
        p.spent -= c1; p.hand.splice(hi, 0, a1.it); undo();
        const v = b2 - hardHandCost(p);
        if (v - cur >= HARD.minGain && (!best || best.pv == null || v > best.pv)) best = Object.assign({}, a1, { pv: v, v });
      }
      await hardYield(); if (G !== myG) return;
    }
    if (!best || best.v - cur < HARD.minGain) break;
    let ok;
    if (best.kind === "item") ok = actEquip(p, best.it.uid, best.s);
    else { const f = hardInsert(p.field, best.it, best.at); ok = actPlace(p, best.it.uid, null); if (ok) p.field = f; }
    if (!ok) break;
    cur = hardEval(p, seeds);
    render(); await T(420);
  }

  // 자리 바꾸기: 전장 카드의 모든 순서를 굴려 보고 가장 좋은 순서로 (빈 칸은 뒤로)
  const best = hardBestOrder(p, seeds, cur);
  if (best) { p.field = best; render(); await T(260); }
  settleUpkeep(p);
  render(); await T(350);
}

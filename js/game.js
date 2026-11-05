/* ETHERION — 대전 흐름, 전장 화면, 컴퓨터 인공지능
   - 생명·덱 40, 시작 핸드 6장(생명 34). 매 턴 두 플레이어 모두 6장까지 보충(뽑은 장수만큼, 최소 1 생명 감소)
   - 공격 준비 → 방어 준비 → 전투 → 정리
   - 에테르 = 위대한 정수 1 + 결정 수. 결정화는 턴마다 1장씩 쌓이는 한도 안에서(안 쓰면 다음 턴으로 넘어감), 결정 최대 9. Lv N 카드 비용은 에테르 N (규칙 문서 6)
   - 유지비: 레벨 아이콘 중 빈 칸의 수. 소환할 때는 레벨만큼 내고, 살아남으면 다음 턴부터 에테르가 유지비만큼 빠진다.
     준비를 마칠 때 에테르가 모자라면 유지비가 큰 유닛부터 소각된다
   - 아이템: 공격·방어 준비 때 전장의 내 유닛 하나에 장착 (유닛 하나에 하나)
   - 마법은 뒷면으로 놓여 상대에게 보이지 않는다
   - 직접 공격을 받으면 다음 턴 에테르 +1 (일시). 결정은 깨지지 않는다
   - 생명 0 또는 덱 0이면 패배. 양쪽 동시면 다음 턴에 공격하는 쪽이 패배 (문서 06) */
"use strict";

let G = null;
let UID = 0;
const AI_NOISE = 0.9;      // 컴퓨터 판단의 흔들림. '보통' 수준
const AI_THRESHOLD = 0.8;  // 이 값보다 낮은 수는 두지 않음
const PACE = 1.75;         // 전투 한 수의 기본 길이 배율 (엔진이 적은 ms × PACE). 배속(×0.5~×3)은 그 위에 곱한다
const SPEEDS = [0.5, 1, 1.5, 2, 3];
const Prefs = {
  get(k, d) { try { const v = localStorage.getItem("etherion.pref." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("etherion.pref." + k, JSON.stringify(v)); } catch (e) {} }
};

const opp = p => G.players[1 - p.idx];
const T = ms => (G && G.speed === 0) ? Promise.resolve() : wait(ms / (G ? G.speed : 1));
/* 손맛 (js/feel.js). 균형 도구처럼 feel.js 없이 돌 때는 기본값과 무음 */
const FT = typeof FEEL !== "undefined" ? FEEL.t : { press: 70, pick: 140, place: 360, move: 300, draw: 480, drawGap: 95, away: 520, back: 260, select: 200, hitStop: 65 };
const sfx = (name, v) => { if (typeof FEEL !== "undefined" && G && !G.cfg.headless && G.speed !== 0) FEEL.play(name, v); };

function mkInst(id) { const it = { uid: ++UID, id }; if (G && G.reg) G.reg[it.uid] = it; return it; }
function mkPlayer(idx, cfg) {
  const deck = [];
  for (const id in cfg.cards) for (let i = 0; i < cfg.cards[id]; i++) deck.push(id);
  shuffle(deck);
  const group = cfg.group || null;
  return { idx, name: cfg.name, group, faction: group ? GROUPS[group].faction : cfg.faction, isAI: !!cfg.isAI, deck, hand: [], field: Array(RULES.slots).fill(null),
    burn: [], crystals: [], life: RULES.startLife, made: 0, crysBank: 0, spent: 0, reload: 0, reloadNow: 0, bonus: 0, bonusNow: 0 };
}

/* ---------- 에테르 ---------- */
function upkeepOf(p) { return p.field.filter(it => isUnit(it) && it.summoned < G.turn).reduce((s, it) => s + C(it).up, 0); }
function etherTotal(p) { return RULES.essence + p.crystals.length + (p.bonusNow || 0); }
function ether(p) { return etherTotal(p) - p.reloadNow - upkeepOf(p) - p.spent; }
/* v1.8 라운드: 공격 턴과 방어 턴이 한 번씩 지나가면 한 라운드 (두 플레이어가 한 번씩 공격) */
const roundOf = t => Math.ceil(t / 2);
const roundStep = t => ((t - 1) % 2) + 1;   // 이 라운드의 몇 번째 턴인가 (1 또는 2)
function role(p) { return p.idx === G.attacker ? "atk" : "def"; }
function prepIdx() { return G.phase === "atkPrep" ? G.attacker : G.phase === "defPrep" ? 1 - G.attacker : -1; }

function log(text, cls) { G.log.push({ text, cls: cls || "" }); if (G.log.length > 300) G.log.shift(); }

/* ---------- 행동 ---------- */
/* 비용: 레벨. 판 규칙(원정의 용 페로스)이 있으면 아이템은 0 */
function costOf(c) { return c.type === "item" && G && G.rules && G.rules.freeItem ? 0 : cardCost(c); }
function equipHosts(p, c) { return p.field.map((it, s) => ({ it, s })).filter(x => isUnit(x.it) && !x.it.item && canEquip(c, C(x.it))); }
function canPlay(p, c) {
  if (prepIdx() !== p.idx) return "지금은 카드를 낼 수 없습니다.";
  const r = role(p);
  if (c.type === "atk" && r !== "atk") return "공격 마법은 내 공격 턴에만 쓸 수 있습니다.";
  if (c.type === "def" && r !== "def") return "방어 마법은 내 방어 턴에만 쓸 수 있습니다.";
  if (G.rules && G.rules.noSpell && c.type !== "unit" && c.type !== "item") return "이 땅에서는 마법이 지워집니다. (판 규칙 · 오블리온)";
  const cost = costOf(c), e = ether(p);
  if (cost > e) return `에테르가 부족합니다. (필요 ${cost}, 남은 에테르 ${Math.max(0, e)})`;
  if (c.type === "item") { if (!equipHosts(p, c).length) return "장착할 유닛이 없습니다. (아이템이 없는 내 유닛)"; return null; }
  if (c.cost && c.cost.life && p.life <= c.cost.life) return "대가로 낼 생명이 부족합니다.";
  if (c.type === "hand") return null;   // 계략 마법: 칸 없이 바로 발동
  if (!p.field.includes(null)) return "빈 전장이 없습니다.";
  if (c.cost && c.cost.life && p.life <= c.cost.life) return "대가로 낼 생명이 부족합니다.";
  return null;
}
function draw(p, n, free) {
  let k = 0;
  for (let i = 0; i < n; i++) { if (!p.deck.length) break; p.hand.push(mkInst(p.deck.pop())); k++; }
  if (!free) p.life -= k;
  return k;
}
function refill(p) {
  const need = Math.max(0, ((G.rules && G.rules.handSize) || RULES.handSize) - p.hand.length);
  const k = draw(p, need, true);
  const loss = Math.max(1, k);
  p.life -= loss;
  log(`${p.name}: ${k}장 보충 · 생명 −${loss}`, "sys");
}
function actPlace(p, uid, slot) {
  const i = p.hand.findIndex(x => x.uid === uid); if (i < 0) return false;
  const it = p.hand[i], c = C(it);
  if (c.type === "item") return false;
  const why = canPlay(p, c); if (why) { if (!p.isAI) toast(why, "warn"); return false; }
  if (c.type === "hand") return castHand(p, i);
  if (slot == null || p.field[slot]) slot = p.field.indexOf(null);
  if (slot < 0) return false;
  p.hand.splice(i, 1);
  p.spent += costOf(c);
  p.committed = true;   // 전장에 카드를 올렸으면 이번 턴 셔플은 막힌다
  it.summoned = G.turn;
  p.field[slot] = it;
  if (c.type === "unit") {
    it.item = null; resetTurn(it);
    log(`${p.name}: ${c.name} 소환 (${slot + 1}번 전장)${c.co.length ? " · 코인 " + coinList(c.co) + " (맞붙을 때마다 던짐)" : ""}`);
  } else {
    log(`${p.name}: 마법 카드를 ${slot + 1}번 전장에 뒷면으로 놓음`);
  }
  return true;
}
function actEquip(p, uid, slot) {
  const i = p.hand.findIndex(x => x.uid === uid); if (i < 0) return false;
  const card = p.hand[i], c = C(card);
  const why = canPlay(p, c); if (why) { if (!p.isAI) toast(why, "warn"); return false; }
  const host = p.field[slot];
  if (!isUnit(host) || host.item || !canEquip(c, C(host))) { if (!p.isAI) toast("이 유닛에는 장착할 수 없습니다. (이미 아이템이 있음)", "warn"); return false; }
  p.hand.splice(i, 1); p.spent += costOf(c); p.committed = true;
  if (G.leave) G.leave[card.uid] = "uid:" + host.uid;
  host.item = { id: c.id, equipped: G.turn };
  const dmg = host.t ? host.t.dmg : 0; resetTurn(host); host.t.dmg = dmg;
  log(`${p.name}: ${C(host).name}에게 「${c.name}」 장착`);
  if (c.item.evName && /^치유/.test(c.item.evName)) { const n = parseInt(c.item.evName.replace(/\D/g, "")) || 0; const b = p.life; p.life = Math.min(RULES.lifeCap, p.life + n); if (p.life > b) { log(`[${c.item.evName}] ${p.name} 생명 +${p.life - b}`, "good"); floatAt("life" + p.idx, "+" + (p.life - b), "heal"); } }
  return true;
}
/* v1.9.1: 결정화 한도는 턴마다 RULES.crystalsPerTurn(1)장씩 쌓인다. 3턴 동안 하지 않았으면 한 번에 3장까지 */
function crysLeft(p) { return p.crysBank || 0; }
function actCrystal(p, uid) {
  if (prepIdx() !== p.idx) return false;
  if (crysLeft(p) <= 0) { if (!p.isAI) toast(`지금은 결정화할 수 있는 장수가 없습니다. (한 턴에 ${RULES.crystalsPerTurn}장씩 쌓입니다)`, "warn"); return false; }
  if (p.crystals.length >= RULES.maxCrystals) { if (!p.isAI) toast(`결정은 최대 ${RULES.maxCrystals}개입니다.`, "warn"); return false; }
  const i = p.hand.findIndex(x => x.uid === uid); if (i < 0) return false;
  const it = p.hand.splice(i, 1)[0];
  p.crystals.push(it.id); p.made++; p.crysBank = crysLeft(p) - 1;
  if (G.leave) G.leave[it.uid] = "crys" + p.idx;
  log(`${p.name}: 카드 1장을 결정화 (결정 ${p.crystals.length})`);
  return true;
}
function actBurnHand(p, uid) {
  if (prepIdx() !== p.idx) return false;
  const i = p.hand.findIndex(x => x.uid === uid); if (i < 0) return false;
  const it = p.hand.splice(i, 1)[0]; p.burn.push(it.id); p.committed = true;
  if (G.leave) G.leave[it.uid] = "burn" + p.idx;
  log(`${p.name}: 핸드 「${C(it).name}」 소각`);
  return true;
}
/* 셔플: 핸드를 모두 덱에 넣고 섞어 같은 장수를 다시 뽑는다. 한 턴에 한 번, 생명 −1.
   v1.4.1: 이번 턴에 카드를 전장에 올렸거나(소환·마법·장착·계략) 소각했으면 셔플할 수 없다 */
function shuffleBlock(p) {
  if (p.shuffled) return "셔플은 한 턴에 한 번만 할 수 있습니다.";
  if (p.committed) return "이번 턴에 카드를 전장에 올리거나 소각해서 셔플할 수 없습니다.";
  if (!p.hand.length) return "핸드가 없습니다.";
  if (p.life <= 1) return "생명이 1이면 셔플할 수 없습니다.";
  return null;
}
function actShuffle(p) {
  if (prepIdx() !== p.idx) return false;
  if (p.shuffled) { if (!p.isAI) toast("셔플은 한 턴에 한 번만 할 수 있습니다.", "warn"); return false; }
  if (p.committed) { if (!p.isAI) toast("이번 턴에 카드를 전장에 올리거나 소각해서 셔플할 수 없습니다.", "warn"); return false; }
  if (!p.hand.length) { if (!p.isAI) toast("핸드가 없습니다.", "warn"); return false; }
  if (p.life <= 1) { if (!p.isAI) toast("생명이 1이면 셔플할 수 없습니다.", "warn"); return false; }
  const n = p.hand.length;
  for (const it of p.hand) { p.deck.push(it.id); if (G.leave) G.leave[it.uid] = "deck" + p.idx; }
  p.hand = [];
  shuffle(p.deck);
  draw(p, n, true);
  p.life -= 1; p.shuffled = true;
  if (!p.isAI && typeof FX !== "undefined") FX.shuffled = p.idx;   // v1.9: 섞는 연출 뒤에 뽑기
  log(`${p.name}: 셔플 — 핸드 ${n}장을 덱에 섞고 ${p.hand.length}장 다시 뽑음 · 생명 −1`, "sys");
  if (!p.isAI) floatAt("life" + p.idx, "−1", "dmg");
  return true;
}
function burnFieldAt(p, slot, why) {
  const it = p.field[slot]; if (!it) return false;
  p.field[slot] = null; if (!C(it).tok) p.burn.push(it.id); if (it.item) p.burn.push(it.item.id);
  log(`${p.name}: 전장의 「${isUnit(it) ? C(it).name : "마법 카드"}」 소각${why ? " — " + why : ""}`);
  return true;
}
function actBurnField(p, slot) { if (prepIdx() !== p.idx) return false; const ok = burnFieldAt(p, slot); if (ok) p.committed = true; return ok; }
/* v1.9 자리 옮기기: 빈 칸이면 그 칸으로 옮기기만 하고, 카드가 있는 칸이면 그 칸에 끼워 넣고 사이의 카드가 한 칸씩 밀린다
   (2번 → 4번: 3번은 2번으로, 4번은 3번으로). 예전에는 두 카드를 맞바꿨다 */
function moveField(field, from, to) {
  const f = field.slice();
  if (!f[to]) { f[to] = f[from]; f[from] = null; return f; }
  const [it] = f.splice(from, 1); f.splice(to, 0, it);
  return f;
}
function actMove(p, from, to) {
  if (prepIdx() !== p.idx || from === to || !p.field[from]) return false;
  p.field = moveField(p.field, from, to);
  return true;
}
/* 준비를 마칠 때 유지비를 낼 수 없으면 유지비가 큰 유닛부터 소각 */
function settleUpkeep(p) {
  while (ether(p) < 0) {
    let best = -1, up = 0;
    p.field.forEach((it, s) => { if (isUnit(it) && it.summoned < G.turn && C(it).up > up) { up = C(it).up; best = s; } });
    if (best < 0) break;
    burnFieldAt(p, best, `유지비 ${up}를 낼 에테르가 없음`);
  }
}

/* ---------- v1.4 계략 마법 (핸드를 겨냥하는 마법) ----------
   준비 단계에서 내는 즉시 발동하고 소각 더미로 간다. 새 효과는 HAND_OPS에 이름: { run(나, 상대, op, 카드), ai(나, 상대, op) } 를 더한다.
   run은 결과 문구를 돌려준다. ai는 컴퓨터가 보는 값(레벨 단위, 0 이하면 쓰지 않음). 카드에 남는 스탯 변화는 it.mod (engine.js printedStats) */
const lvOf = it => C(it).lv;
const handUnits = p => p.hand.filter(it => C(it).type === "unit");
function handName(it) { return `「${C(it).name}」(${lvOf(it)}레벨)`; }
function modCard(it, ch) {
  const c = C(it), out = [];
  it.mod = it.mod || {};
  for (const k in ch) { if (ch[k] < 0 && c.lock && c.lock[k]) { out.push(STAT_KO[k] + " 고정"); continue; } it.mod[k] = (it.mod[k] || 0) + ch[k]; out.push(STAT_KO[k] + sgnNum(ch[k])); }
  return out.join(" ");
}
const HAND_OPS = {
  /* 내 핸드에서 가장 낮은 레벨 ↔ 상대 핸드에서 가장 높은 레벨 */
  swapLowHigh: {
    run(p, o) {
      if (!p.hand.length || !o.hand.length) return "맞바꿀 카드가 없다";
      const i = p.hand.reduce((b, it, j) => (lvOf(it) < lvOf(p.hand[b]) ? j : b), 0);
      const j = o.hand.reduce((b, it, k) => (lvOf(it) > lvOf(o.hand[b]) ? k : b), 0);
      const a = p.hand[i], b = o.hand[j]; p.hand[i] = b; o.hand[j] = a;
      return `${handName(a)} ↔ ${handName(b)}`;
    },
    ai(p, o) { if (!p.hand.length || !o.hand.length) return 0; return (Math.max(...o.hand.map(lvOf)) - Math.min(...p.hand.map(lvOf))) * 0.8 - 0.8; }
  },
  /* 내 핸드 맨 왼쪽 ↔ 상대 핸드 맨 왼쪽 */
  swapLeft: {
    run(p, o) { if (!p.hand.length || !o.hand.length) return "맞바꿀 카드가 없다"; const a = p.hand[0], b = o.hand[0]; p.hand[0] = b; o.hand[0] = a; return `${handName(a)} ↔ ${handName(b)}`; },
    ai(p, o) { if (!p.hand.length || !o.hand.length) return 0; return (lvOf(o.hand[0]) - lvOf(p.hand[0])) * 0.4; }
  },
  /* 카드 n장 뽑기 (생명 소모 없음) */
  draw: { run(p, o, op) { const k = draw(p, op.n || 1, true); return `카드 ${k}장 뽑음`; }, ai(p, o, op) { return p.deck.length > 3 ? 1.5 * (op.n || 1) : -5; } },
  /* 내 핸드 맨 왼쪽 카드 → 덱 맨 아래 */
  leftToBottom: { run(p) { if (!p.hand.length) return ""; const it = p.hand.shift(); p.deck.unshift(it.id); return `${handName(it)}을(를) 덱 맨 아래로`; }, ai(p) { return p.hand.length && lvOf(p.hand[0]) > ether(p) + 2 ? 0.4 : 0; } },
  /* 상대 핸드에 이름이 같은 카드 2장 → 1장을 가져와 내 전장에. 없으면 1장 뽑기 */
  mirrorTwin: {
    pair(o) { const cnt = {}; for (const it of o.hand) cnt[C(it).name] = (cnt[C(it).name] || 0) + 1; return o.hand.filter(it => cnt[C(it).name] >= 2).sort((a, b) => lvOf(b) - lvOf(a))[0] || null; },
    run(p, o) {
      const it = this.pair(o);
      if (!it) { const k = draw(p, 1, true); return `상대 핸드에 짝이 없다 — 카드 ${k}장 뽑음`; }
      o.hand.splice(o.hand.indexOf(it), 1);
      const c = C(it), s = p.field.indexOf(null);
      if (c.type === "item" || c.type === "hand" || s < 0) { p.hand.push(it); return `${handName(it)}을(를) 가져와 핸드에`; }
      it.summoned = G.turn; p.field[s] = it;
      if (c.type === "unit") { it.item = null; resetTurn(it); return `${handName(it)}을(를) 가져와 ${s + 1}번 칸에 소환`; }
      return `${handName(it)}을(를) 가져와 ${s + 1}번 칸에 놓음 (이번 전투에 발동)`;
    },
    ai(p, o) { const it = this.pair(o); return it ? lvOf(it) + 0.3 : (p.deck.length > 3 ? 1.4 : -5); }
  },
  /* 상대 핸드 유닛의 스탯을 이 판 내내 바꾼다: { which: first|all, a, d, h } */
  handMod: {
    run(p, o, op) {
      const L = op.which === "all" ? handUnits(o) : handUnits(o).slice(0, 1);
      if (!L.length) return "상대 핸드에 유닛이 없다";
      const ch = {}; for (const k of ["a", "d", "h"]) if (op[k]) ch[k] = op[k];
      const out = [];
      for (const it of L) {
        const t = modCard(it, ch);
        if (printedStats(it).h <= 0) { o.hand.splice(o.hand.indexOf(it), 1); o.burn.push(it.id); out.push(`${handName(it)} 소각`); }
        else out.push(`${handName(it)} ${t}`);
      }
      return out.join(", ");
    },
    ai(p, o, op) { const L = handUnits(o); if (!L.length) return 0; if (op.which === "all") return L.length * 0.6; const it = L[0]; return printedStats(it).h + (op.h || 0) <= 0 ? lvOf(it) * 0.6 + 0.5 : 1.2; }
  },
  /* 상대 핸드 무작위 n장 소각 */
  handBurn: {
    run(p, o, op) { const out = []; for (let i = 0; i < (op.n || 1) && o.hand.length; i++) { const it = o.hand.splice(Math.floor(Math.random() * o.hand.length), 1)[0]; o.burn.push(it.id); out.push(handName(it)); } return out.length ? out.join(", ") + " 소각" : "상대 핸드가 비었다"; },
    ai(p, o) { return o.hand.length ? 2 + o.hand.reduce((s, it) => s + lvOf(it), 0) / o.hand.length * 0.15 : -5; }
  }
};
function castHand(p, i) {
  const it = p.hand[i], c = C(it), o = opp(p);
  p.hand.splice(i, 1);
  p.spent += costOf(c); p.committed = true;
  if (c.cost && c.cost.life) { p.life -= c.cost.life; if (!p.isAI) floatAt("life" + p.idx, "대가 −" + c.cost.life, "dmg"); }
  if (c.cost && c.cost.ether) p.reload += c.cost.ether;
  const res = c.ops.map(op => (HAND_OPS[op.op] ? HAND_OPS[op.op].run(p, o, op, it) : "")).filter(Boolean);
  p.burn.push(it.id);
  if (G.leave) G.leave[it.uid] = "burn" + p.idx;
  log(`✦ ${p.name}: 「${c.name}」 — ${res.join(" · ") || c.text}`, "spell");
  if (!p.isAI) toast(`${c.name}: ${res.join(" · ")}`, "good");
  return true;
}
function handSpellValue(p, c) { const o = opp(p); return c.ops.reduce((s, op) => s + (HAND_OPS[op.op] ? HAND_OPS[op.op].ai(p, o, op) : 0), 0) - 0.3 * ((c.cost && c.cost.life) || 0); }

/* ---------- 턴 진행 ---------- */
function beginTurn() {
  for (const p of G.players) {
    p.made = 0; p.crysBank = crysLeft(p) + RULES.crystalsPerTurn; p.spent = 0; p.shuffled = false; p.committed = false; p.reloadNow = p.reload; p.reload = 0; p.bonusNow = p.bonus || 0; p.bonus = 0;
    for (const it of p.field) if (isUnit(it)) { const dmg = it.t ? it.t.dmg : 0; resetTurn(it); if (G.rules && G.rules.noHeal && dmg) it.t.dmg = Math.min(dmg, it.t.h - 1); }
    if (G.rules && G.rules.lifeTide && G.turn > 1) p.life = Math.min(RULES.lifeCap, p.life + G.rules.lifeTide);
  }
  const A = G.players[G.attacker], D = opp(A);
  log(`── 라운드 ${roundOf(G.turn)} · 턴 ${G.turn} · ${A.name}의 공격 ──`, "turn");
  if (G.turn > 1) { refill(A); refill(D); }
  for (const p of G.players) {
    const up = upkeepOf(p);
    if (up || p.reloadNow || p.bonusNow) log(`${p.name}: 이번 턴 에테르 ${etherTotal(p)}${p.bonusNow ? ` (직접 공격 보너스 +${p.bonusNow} 포함)` : ""}${up ? ` − 유지비 ${up}` : ""}${p.reloadNow ? ` − 장전 ${p.reloadNow}` : ""}`, "sys");
  }
  if (checkEnd()) return;
  G.phase = "atkPrep";
}
function checkEnd() {
  if (G.phase === "over") return true;
  const lost = G.players.map(p => p.life <= 0 || p.deck.length === 0);
  if (!lost[0] && !lost[1]) return false;
  // 양쪽이 동시에 0이면 다음 턴에 공격하는 쪽(지금의 방어자)이 진다
  const loser = lost[0] && lost[1] ? 1 - G.attacker : (lost[0] ? 0 : 1);
  const L = G.players[loser];
  G.reason = L.life <= 0 ? `${L.name}의 생명이 다했습니다.` : `${L.name}의 덱이 바닥났습니다.`;
  if (lost[0] && lost[1]) G.reason += " (동시 소진 — 다음 턴 공격자가 패배)";
  G.winner = 1 - loser; G.phase = "over";
  log(`◆ ${G.players[G.winner].name} 승리 — ${G.reason}`, "turn");
  return true;
}

/* 전투: 엔진으로 끝까지 계산하면서 단계마다 기록하고, 기록을 차례로 보여 준다.
   v1.0 코인 뒤집기: 맞붙을 때 코인이 멈춘 뒤, 그 유닛의 주인은 에테르 1을 내고 뒷면 코인 하나를 다시 던질 수 있다(교전마다 한 번).
   엔진은 실제 상태의 복제본 위에서 시드 난수로 돌므로, 뒤집은 뒤 같은 시드로 처음부터 다시 굴리면 그 교전까지는 똑같이 흘러가고
   그 코인만 바뀐 채 이어진다. 화면은 새 기록의 그 지점부터 이어서 보여 준다. */
function cloneForCombat(p) {
  return JSON.parse(JSON.stringify({ idx: p.idx, name: p.name, life: p.life, crystals: p.crystals, burn: p.burn, reload: p.reload, bonus: p.bonus || 0, field: p.field }));
}
async function runCombat() {
  const myG = G;
  G.sel = null;
  log("⚔ 전투 개시", "sys");
  const seed = (Math.random() * 4294967296) >>> 0, over = {};
  const run = () => {
    const rec = [];
    const X = ctx(G.players.map(cloneForCombat), G.attacker, G.turn, rec, { seed, over, rules: G.rules });
    runCombatCore(X);
    resetRng();
    return { rec, X };
  };
  let { rec, X } = run();
  if (!G.cfg.headless && G.speed !== 0) {
    // 기록을 처음 상태부터 다시 보여 준다 (한 수의 길이 = 엔진 ms × PACE ÷ 배속)
    let i = 0, casting = null;   // v1.9.5 casting: 지금 발동 중인 마법 (뒤집힐 때부터 부서질 때까지) — js/spellfx.js 연출에 쓴다
    while (i < rec.length) {
      if (G !== myG) return;
      const s = rec[i];
      s.dur = Math.round(s.dur * PACE);
      applySnap(s.snap);
      G.fx = Object.assign({ dying: [] }, s.fx, { dur: s.dur });
      for (const [t, c] of s.logs) log(t, c);
      render();
      // v1.9.5 마법 연출: 원소에 맞는 효과가 날아가 맞는 순간에 숫자가 뜬다 (js/spellfx.js)
      if (s.fx.reveal) { const sp = G.reg[s.fx.reveal]; casting = sp ? { uid: sp.uid, id: sp.id } : null; }
      const fxSpell = typeof SpellFX !== "undefined" && casting && !s.fx.reveal && !s.fx.coin && !s.fx.shatter && !s.fx.conjure && !s.fx.fizzle;
      const delays = fxSpell ? SpellFX.cast(s, casting) : null;
      for (const f of s.floats) {
        const d = delays && delays.get(String(f[0]));
        if (d > 30) setTimeout(() => { if (G === myG) floatAt(f[0], f[1], f[2]); }, d); else floatAt(f[0], f[1], f[2]);
      }
      if (casting && s.fx.shatter && s.fx.shatter.includes(casting.uid)) casting = null;
      if (s.fx.coin) {
        const flips = await coinClash(s.fx.coin);
        if (G !== myG) return;
        if (flips && flips.length) {
          for (const f of flips) {
            over[`${s.fx.coin.n}:${f.uid}:${f.idx}`] = f.heads;
            G.players[f.p].spent += 1;
            log(`${G.players[f.p].name}: 에테르 1로 코인을 다시 던짐 → ${f.heads ? "앞면" : "뒷면"}`, "sys");
          }
          ({ rec, X } = run());
          const j = rec.findIndex(z => z.fx.coin && z.fx.coin.n === s.fx.coin.n);
          i = j >= 0 ? j : i;
        }
        i++; continue;
      }
      await T(s.dur); i++;
    }
    G.fx = { dying: [] };
  } else {
    for (const s of rec) for (const [t, c] of s.logs) log(t, c);
    if (rec.length) applySnap(rec[rec.length - 1].snap);
  }
  // 부서진 카드 → 가격의 2% (economy.js). 소각은 포함되지 않는다
  const gotGold = typeof econBreak === "function" ? econBreak(G, X.broken) : 0;
  if (gotGold) log(`부서진 카드 ${X.broken.length}장 · +${fmtGold(gotGold)}`, "sys");
  // 턴이 끝나면 전장을 항상 좌측부터 정렬한다
  if (compactFields()) log("전장 정렬: 남은 카드를 좌측부터 채움", "sys");
  if (checkEnd()) { render(); return; }
  render(); await T(700);
  G.turn++; G.attacker = 1 - G.attacker;
  beginTurn();
}
function compactFields() {
  let moved = false;
  for (const p of G.players) {
    const xs = p.field.filter(Boolean);
    const nf = xs.concat(Array(RULES.slots - xs.length).fill(null));
    if (nf.some((x, i) => x !== p.field[i])) moved = true;
    p.field = nf;
  }
  return moved;
}
function applySnap(sn) {
  // v1.4: 전투 중 마법이 부른 유닛은 엔진 복제본에서 태어나므로 여기서 실제 카드로 만든다
  for (const uid in sn.toks || {}) if (!G.reg[uid]) G.reg[uid] = { uid: +uid, id: sn.toks[uid], item: null, summoned: G.turn };
  sn.players.forEach((s, i) => {
    const p = G.players[i];
    p.field = s.field.map(uid => (uid ? G.reg[uid] : null));
    p.life = s.life; p.crystals = s.crystals.slice(); p.burn = s.burn.slice(); p.reload = s.reload; p.bonus = s.bonus || 0;
  });
  for (const uid in sn.units) if (G.reg[uid]) G.reg[uid].t = JSON.parse(JSON.stringify(sn.units[uid]));
}

/* ---------- 컴퓨터 ---------- */
function unitValue(p, c, r) {
  // 환산 레벨 + 1:1 승률 보정 + 역할 보정
  let v = c.lv + 0.5 * c.up + ((c.w || 50) - 50) / 25;
  if (r === "def") v += (c.d * 0.4 + c.h * 0.1) - c.a * 0.1;
  else v += c.a * 0.1;
  return v * 0.9;
}
function bestHost(p, c) {
  const hs = equipHosts(p, c); if (!hs.length) return null;
  if (c.item.set) return hs.filter(x => C(x.it).lv <= 2).sort((a, b) => C(a.it).lv - C(b.it).lv)[0] || null;
  return hs.sort((a, b) => (C(b.it).lv + C(b.it).a * 0.1) - (C(a.it).lv + C(a.it).a * 0.1))[0];
}
function aiCrystalPlan(p) {
  const cr = p.crystals.length;
  if (cr >= RULES.maxCrystals || p.hand.length <= 2) return [];
  const up = upkeepOf(p);
  let want = cr < 5 ? 1 : cr < 7 ? (Math.random() < 0.7 ? 1 : 0) : (Math.random() < 0.3 ? 1 : 0);
  if (ether(p) < 0 || up >= cr) want = 1;
  want = Math.min(want, crysLeft(p), RULES.maxCrystals - cr, p.hand.length - 2);
  if (want <= 0) return [];
  const after = ether(p) + want;
  const prio = it => {
    const c = C(it), cost = cardCost(c);
    if (cost > after + 2) return 6 + cost;
    if (cost > after) return 2;
    return 3 - c.lv / 3;
  };
  return p.hand.slice().sort((a, b) => prio(b) - prio(a) + (Math.random() - 0.5)).slice(0, want).map(it => it.uid);
}
/* 마법을 각 빈 칸에 놓아 보고 전투를 미리 굴려, 가장 이득인 칸과 이득을 구한다 */
function spellGain(p, hit) {
  const o = opp(p), r = role(p);
  const hide = o.idx; // 상대 마법은 뒷면이라 모른다
  const base = simulate(G.players, G.attacker, G.turn, p.idx, hide, 2);
  let best = null;
  p.field.forEach((x, s) => {
    if (x) return;
    p.field[s] = hit;
    const v = simulate(G.players, G.attacker, G.turn, p.idx, hide, 3) - base;
    p.field[s] = null;
    if (!best || v > best.v) best = { v, s };
  });
  return best;
}
async function aiPrep(p) {
  const myG = G, r = role(p);
  render(); await T(500); if (G !== myG) return;
  for (const uid of aiCrystalPlan(p)) { actCrystal(p, uid); render(); await T(320); if (G !== myG) return; }
  // 전장이 꽉 찼고 핸드에 훨씬 강한 유닛이 있으면 약한 유닛을 소각
  if (!p.field.includes(null)) {
    const weakest = p.field.map((it, s) => ({ it, s })).filter(x => isUnit(x.it)).sort((a, b) => unitWorth(a.it) - unitWorth(b.it))[0];
    const best = p.hand.map(it => C(it)).filter(c => c.type === "unit" && cardCost(c) <= ether(p)).sort((a, b) => b.lv - a.lv)[0];
    if (weakest && best && best.lv >= unitWorth(weakest.it) + 3) { actBurnField(p, weakest.s); render(); await T(320); }
  }
  for (let n = 0; n < 10; n++) {
    if (G !== myG) return;
    const opts = [];
    for (const it of p.hand) {
      const c = C(it);
      if (canPlay(p, c)) continue;
      if (c.type === "unit") {
        // 유지비를 감당할 수 있을 때만
        if (c.up && upkeepOf(p) + c.up > etherTotal(p) - p.reload - 1) continue;
        opts.push({ it, kind: "unit", v: unitValue(p, c, r) });
      } else if (c.type === "item") {
        const h = bestHost(p, c); if (!h) continue;
        opts.push({ it, kind: "item", s: h.s, v: c.lv * 1.05 + (C(h.it).lv <= 2 && !c.item.set ? 0.3 : 0) });
      } else if (c.type === "hand") {
        if (c.cost && c.cost.life && p.life <= c.cost.life + 4) continue;
        const v = handSpellValue(p, c); if (v <= 0) continue;
        opts.push({ it, kind: "hand", v: Math.min(v, c.lv + 1.5) });
      } else {
        const g = spellGain(p, it); if (!g) continue;
        opts.push({ it, kind: "spell", s: g.s, v: g.v * 1.1 - (c.cost.life || 0) * 0.15 });
      }
    }
    for (const o of opts) o.score = o.v + (Math.random() * 2 - 1) * AI_NOISE;
    opts.sort((a, b) => b.score - a.score);
    const o = opts[0];
    if (!o || o.score < AI_THRESHOLD) break;
    if (o.kind === "item") actEquip(p, o.it.uid, o.s);
    else actPlace(p, o.it.uid, o.kind === "spell" ? o.s : null);
    render(); await T(420);
  }
  // 유닛 순서: 공격이면 강한 유닛을 앞으로, 방어면 단단한 유닛을 앞으로. 마법 칸은 그대로 둔다
  const unitSlots = p.field.map((it, s) => (isUnit(it) ? s : -1)).filter(s => s >= 0);
  const us = unitSlots.map(s => p.field[s]);
  const key = it => (r === "atk" ? it.t.a * 2 + hpLeft(it) * 0.3 : it.t.d * 2 + hpLeft(it));
  us.sort((a, b) => key(b) - key(a));
  unitSlots.forEach((s, i) => { p.field[s] = us[i]; });
  settleUpkeep(p);
  render(); await T(350);
}

/* ---------- 경기 시작/흐름 ---------- */
function startMatch(cfg) {
  UID = 0;
  if (typeof FX !== "undefined") FX.itemFront.clear();
  G = {
    mode: cfg.mode, turn: 1, attacker: Math.random() < 0.5 ? 0 : 1, phase: "setup", log: [], sel: null, reg: {},
    fx: { dying: [] }, viewer: 0, control: null, speed: cfg.speed != null ? cfg.speed : Prefs.get("speed", 1), winner: null, reason: "",
    onExit: cfg.onExit, cfg, players: null, ready: null, handoff: false, leave: {}, inspect: null, showLog: false,
    econ: typeof newEcon === "function" ? newEcon() : null, rules: cfg.rules || {}
  };
  setCombatRules(G.rules);
  G.players = [mkPlayer(0, cfg.p0), mkPlayer(1, cfg.p1)];
  for (const p of G.players) draw(p, RULES.handSize);
  const gname = p => (p.group ? GROUPS[p.group].name : FACTIONS[p.faction].name);
  log(`${G.players[0].name}(${gname(G.players[0])}) vs ${G.players[1].name}(${gname(G.players[1])})`, "sys");
  log(`선공: ${G.players[G.attacker].name} (무작위)`, "sys");
  if (!cfg.headless && typeof Weather !== "undefined") { Weather.roll(); log(`날씨: ${Weather.info().name} — ${Weather.info().line}`, "sys"); }
  if (G.rules.text) log(`판 규칙 · ${G.rules.name}: ${G.rules.text}`, "turn");
  log(`── 라운드 1 · 턴 1 · ${G.players[G.attacker].name}의 공격 ──`, "turn");
  G.phase = "atkPrep";
  if (cfg.headless) return G;
  mountBoard();
  loop(G);
  return G;
}
/* 멀리건: 시작 핸드 중 고른 카드를 덱에 되돌리고 같은 장수를 다시 뽑는다 (한 번, 생명 소모 없음) */
function actMulligan(p, uids) {
  const back = p.hand.filter(it => uids.includes(it.uid));
  if (!back.length) return 0;
  p.hand = p.hand.filter(it => !uids.includes(it.uid));
  for (const it of back) p.deck.push(it.id);
  shuffle(p.deck);
  draw(p, back.length, true);
  log(`${p.name}: 멀리건 — ${back.length}장을 바꿈`, "sys");
  return back.length;
}
async function mulliganUI(p) {
  const picked = new Set();
  const html = `<h3>시작 핸드</h3><p class="muted">마음에 들지 않는 카드를 눌러 고르면 덱에 되돌리고 같은 장수를 새로 뽑습니다. 한 번만 할 수 있고, 생명은 줄지 않습니다.</p>
    <div class="mull-cards">${p.hand.map(it => `<button type="button" class="mull-card" data-uid="${it.uid}">${cardHTML(C(it), { size: "md" })}<span class="mull-tag">되돌림</span></button>`).join("")}</div>
    <p class="mull-tip">기준: 1~3레벨 카드가 서너 장은 있어야 첫 턴부터 낼 수 있습니다. 에테르는 1에서 시작해 결정을 만들수록 늘어납니다.</p>`;
  let btnEl = null;
  const r = await modal(html, [{ label: "그대로 시작", value: "keep" }, { label: "바꾸기", value: "swap", cls: "primary" }], { cls: "wide-modal mull-modal", dismiss: false, onOpen: w => {
    btnEl = w.querySelectorAll(".modal-btns .btn")[1];
    const upd = () => { btnEl.textContent = picked.size ? `${picked.size}장 바꾸기` : "바꾸기"; btnEl.disabled = !picked.size; };
    upd();
    w.addEventListener("click", e => { const b = e.target.closest(".mull-card"); if (!b) return; const id = +b.dataset.uid; if (picked.has(id)) picked.delete(id); else picked.add(id); b.classList.toggle("on", picked.has(id)); upd(); });
  } });
  if (r === "swap" && picked.size) { actMulligan(p, [...picked]); toast(`${picked.size}장을 새로 뽑았습니다.`, "good"); }
}
function aiMulligan(p) {
  const back = p.hand.filter(it => C(it).lv >= 6).map(it => it.uid);
  if (back.length) actMulligan(p, back);
}
async function loop(myG) {
  let shown = null;
  if (!G.cfg.headless && G.speed !== 0) {
    // 멀리건 (사람 플레이어마다 한 번)
    for (const p of G.players) {
      if (G !== myG) return;
      if (p.isAI) { aiMulligan(p); continue; }
      if (G.mode === "hotseat" && G.players.indexOf(p) === 1) await modal(`<h3>${esc(p.name)}의 시작 핸드</h3><p>${esc(p.name)}이(가) 화면을 볼 차례입니다.</p>`, [{ label: "보기", value: 1, cls: "primary" }], { dismiss: false });
      G.viewer = p.idx; render();
      await mulliganUI(p);
    }
    G.viewer = G.mode === "ai" ? 0 : G.attacker; render();
    const first = G.players[G.attacker];
    await phaseBanner(G.mode === "ai" ? (G.attacker === 0 ? "선공" : "후공") : "선공", `동전 던지기 결과: ${first.name}이(가) 먼저 공격합니다`, "coin", 1500);
  } else for (const p of G.players) if (p.isAI) aiMulligan(p);
  while (G === myG && G.phase !== "over") {
    const bk = G.turn + ":" + G.phase;
    if (!G.cfg.headless && G.speed !== 0 && bk !== shown && G.phase !== "over") { shown = bk; const b = bannerFor(G.phase); if (b) await phaseBanner(b[0], b[1], b[2]); if (G !== myG) break; }
    if (G.phase === "atkPrep" || G.phase === "defPrep") {
      const p = G.players[prepIdx()];
      if (p.isAI) { G.control = null; await aiPrep(p); }
      else await humanPrep(p);
      if (G !== myG || G.phase === "over") break;
      settleUpkeep(p);
      if (G.phase === "atkPrep") { G.phase = "defPrep"; log(`${p.name} 공격 준비 완료`, "sys"); }
      else { G.phase = "combat"; log(`${p.name} 방어 준비 완료`, "sys"); }
    } else if (G.phase === "combat") {
      G.control = null; render();
      await runCombat();
    } else break;
  }
  if (G === myG) { render(); await T(500); if (G === myG && !G.cfg.headless) showResult(); }
}
function humanPrep(p) {
  return new Promise(res => {
    G.control = p.idx; G.sel = null;
    if (G.mode === "hotseat" && G.viewer !== p.idx) { G.handoff = true; G.viewer = p.idx; }
    else G.viewer = p.idx;
    G.ready = res;
    render();
    Guide.maybe(G.phase, p);
  });
}

/* ---------- 첫 판 안내 ----------
   처음 하는 사람에게 단계마다 말풍선 하나씩. 다 보거나 "안내 끄기"를 누르면 다시 보이지 않는다 (Prefs guideDone).
   안내는 화면 요소에 붙어 따라다니고(place), 사람의 조작을 막지 않는다. */
const Guide = {
  el: null, queue: [], seen: {}, cur: null,
  on() { return !Prefs.get("guideDone", false); },
  steps(phase, p) {
    const me = p.idx;
    if (phase === "atkPrep" || phase === "defPrep") {
      const L = [];
      if (!this.seen.hand) L.push({ key: "hand", sel: ".hand-me", side: "top", title: "핸드", text: "마우스를 올리면 크게 보이고, <b>더블클릭</b>하면 전장에 올라갑니다. 카드 왼쪽 세로 숫자는 위부터 공격 · 방어 · 체력. 숫자 옆 <b>+</b>와 겹친 동전은 맞붙을 때마다 던지는 코인 — 동전 하나에 앞면이면 +1, <b>+2●</b>처럼 앞에 숫자가 있으면 앞면마다 그 값입니다(동전 수가 곧 코인 수). 공격·방어·체력에 동전이 하나씩 있으면 <b>동전 하나</b>를 던져 셋에 함께 붙습니다." });
      if (!this.seen.ether) L.push({ key: "ether", sel: "#crys" + me, side: "right", title: "에테르", text: "카드를 내는 힘입니다. <b>레벨 N 카드 = 에테르 N</b>. 핸드 1장을 여기로 끌어 놓으면 <b>결정</b>이 되어 매 턴 에테르가 1 늘어납니다 (턴마다 1장씩 할 수 있고, 안 하면 쌓여서 나중에 한꺼번에 해도 됩니다). 쓰지 않은 에테르는 다음 턴으로 넘어가지 않으니, 전투 때 <b>코인 뒤집기</b>에 쓰세요." });
      if (!this.seen.front) L.push({ key: "front", sel: `.frow-bot .slot[data-s="0"]`, side: "top", title: "맞붙는 순서", text: "내 유닛은 <b>1번 칸부터</b> 차례로 <b>상대의 맨 앞 유닛</b>과 맞붙습니다 (같은 번호끼리가 아닙니다). 피해 = 공격 − 방어. 체력이 0이 되면 쓰러지고, 남은 피해는 턴이 끝나면 낫습니다." });
      if (phase === "defPrep" && !this.seen.def) L.push({ key: "def", sel: ".frow-top .slots", side: "bottom", title: "방어", text: "상대의 배치가 보입니다. 상대 1번 칸 유닛이 내 맨 앞 유닛과 먼저 맞붙습니다. 막지 못한 공격은 생명으로 가지만, 대신 <b>다음 턴 에테르 +1</b>을 받습니다." });
      if (!this.seen.ready) L.push({ key: "ready", sel: ".ready-btn", side: "left", title: "준비 완료", text: "다 놓았으면 누르세요 (Enter). 양쪽이 준비를 마치면 전투가 자동으로 진행됩니다." });
      return L;
    }
    return [];
  },
  maybe(phase, p) {
    if (!this.on() || G.cfg.headless || G.mode === "hotseat" && p.idx !== 0) return;
    const L = this.steps(phase, p);
    if (!L.length) return;
    this.queue = L; this.next();
  },
  next() {
    this.hide();
    const st = this.queue.shift();
    if (!st) { if (this.seen.ready && this.seen.def) Prefs.set("guideDone", true); return; }
    this.seen[st.key] = true; this.cur = st;
    const el = document.createElement("div");
    el.className = "guide gd-" + st.side;
    el.innerHTML = `<p class="gd-eyebrow">첫 판 안내 · ${esc(st.title)}</p><p class="gd-text">${st.text}</p><div class="gd-btns"><button type="button" class="btn xs ghost" data-g="off">안내 끄기</button><button type="button" class="btn xs primary" data-g="next">${this.queue.length ? "다음" : "알겠어요"}</button></div><i class="gd-arrow"></i>`;
    el.addEventListener("click", e => { const b = e.target.closest("[data-g]"); if (!b) return; if (b.dataset.g === "off") { Prefs.set("guideDone", true); this.queue = []; this.hide(); } else this.next(); });
    document.body.appendChild(el); this.el = el;
    this.place();
  },
  hide() { if (this.el) { this.el.remove(); this.el = null; } this.cur = null; document.querySelectorAll(".guide-target").forEach(x => x.classList.remove("guide-target")); },
  place() {
    if (!this.el || !this.cur || !boardEl) return;
    const t = boardEl.querySelector(this.cur.sel);
    if (!t) { this.el.style.visibility = "hidden"; return; }
    document.querySelectorAll(".guide-target").forEach(x => x.classList.remove("guide-target"));
    t.classList.add("guide-target");
    const r = t.getBoundingClientRect(), w = this.el.offsetWidth, h = this.el.offsetHeight, m = 14;
    let x, y;
    if (this.cur.side === "top") { x = r.left + r.width / 2 - w / 2; y = r.top - h - m; }
    else if (this.cur.side === "bottom") { x = r.left + r.width / 2 - w / 2; y = r.bottom + m; }
    else if (this.cur.side === "left") { x = r.left - w - m; y = r.top + r.height / 2 - h / 2; }
    else { x = r.right + m; y = r.top + r.height / 2 - h / 2; }
    x = Math.max(8, Math.min(innerWidth - w - 8, x)); y = Math.max(8, Math.min(innerHeight - h - 8, y));
    this.el.style.left = x + "px"; this.el.style.top = y + "px"; this.el.style.visibility = "";
  }
};
if (typeof addEventListener === "function") addEventListener("resize", () => Guide.place());

/* ---------- 화면 ----------
   배치 (내 시점, 아래쪽이 나)
     상단 줄: 상대 에테르 · 상대 핸드(뒷면) · 상대 정보
     상대 전장: 소각장(맨 왼쪽) · 칸 1~5 · 덱(오른쪽)
     가운데 띠: 단계 · 안내 · 준비 완료 · 메뉴
     내 전장: 소각장(맨 왼쪽) · 칸 1~5 · 덱(오른쪽)
     하단 줄: 내 에테르(좌측 하단) · 내 핸드(부채꼴) · 내 정보
   연출: 화면을 다시 그릴 때 카드 위치를 기억했다가(FLIP) 이전 자리에서 새 자리로 부드럽게 옮긴다.
         덱에서 뽑힌 카드는 덱에서 날아오고, 소각·결정화된 카드는 그 자리로 날아간다. */
let boardEl = null;
const FX = { itemFront: new Set(), last: null, pd: null, drag: null, suppress: false, from: {}, sprite: null, charOut: new Set(), focusKey: null, zoomEl: null, zoomT: 0, arena: null, coinStop: null,
  drawing: new Set(), handHold: 0, handT: 0, clockHold: 0, shuffled: null, pin: null };
const RM = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const kSpeed = () => 1 / ((G && G.speed) || 1);
const uidEl = uid => (boardEl ? boardEl.querySelector(`[data-uid="${uid}"]`) : null);
const fxLayer = () => $("#fx-layer");
const ctrOf = r => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

/* 소각장 구덩이(css/depth.css): 네 벽 + 불 바닥 위의 마지막 카드 + 떠오르는 불티 */
const PIT_SPARKS = [[22, 62, 3.1, 0, 8], [70, 48, 3.8, 1.1, -7], [46, 70, 2.7, .6, 4], [34, 40, 4.3, 2, -5], [62, 66, 3.4, 1.7, 9], [52, 34, 4.9, .3, -9]].map(([x, y, t, d, dx]) => `<i class="pit-spark" style="--x:${x}%;--y:${y}%;--t:${t}s;--d:-${d}s;--dx:${dx}px"></i>`).join("");
const pitHTML = top => `<div class="pit"><div class="pit-floor">${top ? `<div class="burn-top">${cardHTML(top, { size: "md", cls: "ashen" })}</div>` : ""}</div><i class="pit-w l"></i><i class="pit-w r"></i><i class="pit-w t"></i><i class="pit-w b"></i>${PIT_SPARKS}</div>`;

function mountBoard() {
  $("#app").innerHTML = `<section class="screen screen-game" id="game"><div id="board"></div><div id="fx-layer" aria-hidden="true"></div><div id="zoom" class="zoom" hidden></div></section>`;
  boardEl = $("#board");
  FX.last = null; FX.sprite = null; FX.charOut.clear(); FX.drag = null; FX.pd = null; FX.focusKey = null;
  boardEl.addEventListener("click", onBoardClick);
  boardEl.addEventListener("dblclick", onDblClick);
  boardEl.addEventListener("pointerdown", onPointerDown);
  boardEl.addEventListener("mouseover", onHover);
  boardEl.addEventListener("mouseleave", () => { if (FX.pin) showPin(); else hideZoom(); });
  applyFont();
  render();
}
/* 핸드 더블클릭(또는 번호 키 두 번): 유닛·마법은 왼쪽부터 첫 빈 칸에 올라간다.
   아이템은 장착할 유닛을 골라야 하므로 안내만 (장착할 수 있는 유닛이 하나뿐이면 바로 장착) */
/* v1.8: 더블클릭은 onBoardClick에서 같은 카드를 두 번 누른 간격으로 알아낸다.
   첫 클릭에 화면을 다시 그려 카드 요소가 바뀌므로, 브라우저의 dblclick은 떨어지지 않거나 옆으로 밀려 온 카드에 떨어진다 */
const DBL_MS = 420;
function onDblClick(e) { if (e.target.closest(".hand-me")) e.preventDefault(); }
function placeSelected(me, it) {
  const c = C(it);
  if (c.type === "item") {
    const why = canPlay(me, c); if (why) { toast(why, "warn"); return; }
    const hosts = equipHosts(me, c);
    if (hosts.length === 1) { if (actEquip(me, it.uid, hosts[0].s)) G.sel = null; render(); return; }
    toast("장착할 유닛이 여럿입니다. 빛나는 유닛 위로 끌어다 놓거나 칸 단축키(Q~T)로 고르세요.", "warn"); return;
  }
  if (c.type !== "hand" && !me.field.includes(null)) { toast("빈 전장이 없습니다.", "warn"); return; }
  if (actPlace(me, it.uid, null)) { G.sel = null; G.inspect = null; }
  render();
}
/* 글꼴 선택 (설정): 한글 후보 글꼴은 Google Fonts에서 받아오고, 인터넷이 없으면 기기 바탕체로 돌아간다 */
const FONTS = [
  { id: "hahmlet", name: "함렛 (Hahmlet)", desc: "획이 또렷한 옛 명조. 기본값", family: '"Hahmlet"' },
  { id: "songmyung", name: "송명 (Song Myung)", desc: "납활자 느낌의 고전 명조", family: '"Song Myung"' },
  { id: "gowun", name: "고운바탕 (Gowun Batang)", desc: "부드럽고 읽기 편한 바탕", family: '"Gowun Batang"' },
  { id: "notoserif", name: "본명조 (Noto Serif KR)", desc: "단정한 현대 명조", family: '"Noto Serif KR"' },
  { id: "system", name: "기기 바탕체", desc: "인터넷 없이도 보이는 기본 글꼴", family: '"Batang", "바탕", "AppleMyungjo"' }
];
function applyFont(id) {
  id = id || Prefs.get("font", "hahmlet");
  const f = FONTS.find(x => x.id === id) || FONTS[0];
  document.documentElement.dataset.font = f.id;
  document.documentElement.style.setProperty("--kfont", f.family);
}
async function showSettings() {
  const cur = Prefs.get("font", "hahmlet");
  const html = `<h3>설정</h3>
    <p class="pick-label">연출 속도 <small class="muted">— 전투 장면·카드 이동·띠 모두 같이 빨라지거나 느려집니다 (전투 중에도 바꿀 수 있음)</small></p>
    <div class="speed set-speed">${SPEEDS.map(s => `<button type="button" class="btn xs ${G && G.speed === s ? "on" : ""}" data-sp="${s}">×${s}</button>`).join("")}</div>
    <p class="pick-label">효과음 <small class="muted">— 누르기·놓기·맞기 소리 (파일 없이 합성, 터치 기기에서는 짧은 진동)</small></p>
    <div class="speed set-sfx">${[["off", "끄기"], ["low", "작게"], ["mid", "보통"]].map(([v, n]) => `<button type="button" class="btn xs ${typeof FEEL !== "undefined" && FEEL.level === v ? "on" : ""}" data-sfx="${v}">${n}</button>`).join("")}</div>
    <p class="pick-label">한글 글꼴 <small class="muted">— 후보 글꼴은 처음 한 번 인터넷에서 받아옵니다. 받지 못하면 기기 바탕체로 보입니다</small></p>
    <div class="font-pick">${FONTS.map(f => `<label class="font-opt${f.id === cur ? " on" : ""}" style="font-family:${f.family}, serif"><input type="radio" name="font" value="${f.id}" ${f.id === cur ? "checked" : ""}><b>${f.name}</b><small>${f.desc} — 에테리온의 밤, 아다만트 연합과 푸른숲 맹약</small></label>`).join("")}</div>`;
  await modal(html, [{ label: "닫기", value: true, cls: "primary" }], { cls: "wide", onOpen: w => {
    w.addEventListener("click", e => {
      const b = e.target.closest("[data-sp]");
      if (b) { setSpeed(+b.dataset.sp); w.querySelectorAll("[data-sp]").forEach(x => x.classList.toggle("on", +x.dataset.sp === G.speed)); }
      const f = e.target.closest("[data-sfx]");
      if (f && typeof FEEL !== "undefined") { FEEL.setLevel(f.dataset.sfx); w.querySelectorAll("[data-sfx]").forEach(x => x.classList.toggle("on", x.dataset.sfx === FEEL.level)); }
    });
    w.addEventListener("change", e => {
      if (e.target.name === "font") { Prefs.set("font", e.target.value); applyFont(e.target.value); w.querySelectorAll(".font-opt").forEach(l => l.classList.toggle("on", l.querySelector("input").checked)); }
    });
  } });
}
function setSpeed(s) { if (!G) return; G.speed = s; Prefs.set("speed", s); render(); }
/* 단축키 (AETHELGARD 참고): 1~9 핸드 고르기 · Q W E R T 칸에 놓기/장착/자리 바꾸기 · C 결정화 · X 소각 · Enter 준비 완료 · Esc 취소 */
const SLOT_KEYS = ["q", "w", "e", "r", "t"];
document.addEventListener("keydown", e => {
  if (!G || !boardEl || !document.body.contains(boardEl)) return;
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  if (document.querySelector(".modal-wrap")) return;
  // v1.9: 키를 누르고 있어 자동 반복된 입력(준비 완료 Enter를 길게 누른 것 등)은 코인을 세우지 않는다
  if (FX.coinStop && (e.key === " " || e.key === "Enter")) { e.preventDefault(); if (!e.repeat) FX.coinStop(); return; }
  if (e.key === "Escape") { if (G.sel || G.inspect) { G.sel = null; G.inspect = null; render(); } return; }
  const me = G.players[G.viewer];
  if (G.control !== me.idx || G.handoff) return;
  const k = e.key.toLowerCase();
  if (handLocked() && /^[1-9sxc]$/.test(k)) return;   // v1.9: 카드를 뽑는 동안
  // 숫자 키: 처음 누르면 고르기, 고른 카드의 번호를 한 번 더 누르면(더블클릭처럼) 왼쪽부터 빈 칸에 올린다
  if (/^[1-9]$/.test(k)) {
    const it = me.hand[+k - 1]; if (!it) return; e.preventDefault(); G.inspect = null;
    if (G.sel && G.sel.kind === "hand" && G.sel.uid === it.uid) { placeSelected(me, it); return; }
    G.sel = { kind: "hand", uid: it.uid }; sfx("select"); render(); return;
  }
  const si = SLOT_KEYS.indexOf(k);
  if (si >= 0) { e.preventDefault(); const el = boardEl.querySelector(`.frow-bot .slot[data-s="${si}"]`); if (el) onBoardClick({ target: el }); return; }
  if (k === "c" && G.sel && G.sel.kind === "hand") { if (actCrystal(me, G.sel.uid)) G.sel = null; render(); return; }
  if (k === "x" && G.sel) { if (G.sel.kind === "hand" ? actBurnHand(me, G.sel.uid) : actBurnField(me, G.sel.slot)) G.sel = null; render(); return; }
  if (k === "s") { if (actShuffle(me)) { G.sel = null; G.inspect = null; } render(); return; }
  if (k === "enter") { e.preventDefault(); finishPrep(me); }
});

/* 단계가 바뀔 때 가운데에 크게 뜨는 띠 (AETHELGARD의 "내 턴" 띠를 참고) */
async function phaseBanner(title, sub, cls, ms) {
  if (!G || G.cfg.headless || G.speed === 0 || !fxLayer()) return;
  ms = (ms || 1150) / Math.max(1, G.speed * 0.75);
  const d = document.createElement("div");
  d.className = "pbanner " + (cls || "");
  d.innerHTML = `<b>${esc(title)}</b><small>${esc(sub || "")}</small>`;
  fxLayer().appendChild(d);
  if (RM()) { await wait(Math.min(ms, 600)); d.remove(); return; }
  const a = d.animate([
    { opacity: 0, transform: "translate(-50%, -50%) scaleX(.2)" },
    { opacity: 1, transform: "translate(-50%, -50%) scaleX(1)", offset: 0.18 },
    { opacity: 1, transform: "translate(-50%, -50%) scaleX(1)", offset: 0.78 },
    { opacity: 0, transform: "translate(-50%, -50%) scale(1.12)" }
  ], { duration: ms, easing: "cubic-bezier(.2,.8,.2,1)" });
  await a.finished.catch(() => {}); d.remove();
}
function bannerFor(phase) {
  const A = G.players[G.attacker], D = opp(A), me = G.players[G.viewer];
  const mine = p => G.mode === "ai" ? p.idx === 0 : true;
  if (phase === "atkPrep") return [`라운드 ${roundOf(G.turn)} · 공격 준비`, `${A.name}${A.group ? " · " + GROUPS[A.group].name : ""}`, mine(A) && G.mode === "ai" ? "me" : G.mode === "ai" ? "foe" : "atk"];
  if (phase === "defPrep") return ["방어 준비", `${D.name}${D.group ? " · " + GROUPS[D.group].name : ""}`, mine(D) && G.mode === "ai" ? "me" : G.mode === "ai" ? "foe" : "def"];
  if (phase === "combat") return ["전투", `${A.name} → ${D.name}`, "combat"];
  return null;
}
function instOfEl(el) { const u = el.closest("[data-uid]"); return u && G ? G.reg[+u.dataset.uid] : null; }
function statGlyphs(text) { return esc(String(text)).replace(/⚔/g, statIco("a")).replace(/⛨/g, statIco("d")).replace(/♥/g, statIco("h")); }
function floatAt(target, text, cls) {
  if (!G || G.cfg.headless || G.speed === 0) return;
  const el = typeof target === "number" ? uidEl(target) : $("#" + target);
  const layer = fxLayer();
  if (!el || !layer) return;
  const r = el.getBoundingClientRect();
  const f = document.createElement("div");
  f.className = "float " + (cls || "");
  // v1.4.4: 떠오르는 글자 속 ⚔ ⛨ ♥ 기호는 카드와 같은 아이콘(칼 · 음영 방패 · 핏방울)으로
  f.innerHTML = statGlyphs(text);
  if (/\bcpop\b/.test(cls || "")) {
    // v1.9.5 코인으로 바뀐 값: 캐릭터 위에 +N(연두) / −N(빨강). 같은 카드에 여러 개면 아래로 쌓고 0.12초씩 늦게
    const now = performance.now(), st = FX.popStack || (FX.popStack = {}), key = String(target);
    if (!st[key] || now - st[key].t > 400) st[key] = { n: 0, t: now };
    const n = st[key].n++; st[key].t = now;
    const art = el.querySelector(".c-art") || el, ar = art.getBoundingClientRect();
    f.style.left = (ar.left + ar.width / 2) + "px";
    f.style.top = (ar.top + ar.height * 0.4) + "px";
    f.style.setProperty("--pi", n);
    layer.appendChild(f);
    const sk = { "⚔": "a", "⛨": "d", "♥": "h" }[String(text).trim()[0]], up = !/\bdown\b/.test(cls), sb = sk && el.querySelector(".st-" + sk);
    if (sb && !RM()) setTimeout(() => sb.isConnected && sb.animate([{ scale: "1", filter: "none" }, { scale: "1.5", filter: `drop-shadow(0 0 8px ${up ? "#a6f04a" : "#ff4b3e"}) brightness(1.4)`, offset: 0.3 }, { scale: "1", filter: "none" }], { duration: 650, easing: "cubic-bezier(.2,.8,.3,1)" }), n * 120 + 120);
    setTimeout(() => f.remove(), 2400 + n * 120);
    return;
  }
  f.style.left = (r.left + r.width / 2 + (Math.random() * 20 - 10)) + "px";
  f.style.top = (r.top + r.height * 0.42 + (Math.random() * 20 - 10)) + "px";
  layer.appendChild(f);
  setTimeout(() => f.remove(), 1700);
}

/* ---------- 코인 던지기 화면 (유닛과 유닛이 맞붙을 때) ----------
   v1.6.1: 내 코인 창과 상대 코인 창이 따로 마주 선다 (내 창은 왼쪽, 상대 창은 오른쪽).
   결과는 엔진이 이미 정했다. 각 창의 코인은 그 주인이 세운다: 사람은 "운명 봉인"을 누르고(Space · Enter),
   컴퓨터는 스스로 잠시 뒤에 세운다. 누구든 6.5초가 지나면 저절로 멈춘다(창 아래 모래띠가 줄어든다, v1.9: 5초 → 8초, v1.9.1: 6.5초).
   양쪽이 다 멈추면 "코인 뒤집기": 뒷면이 나온 코인을 그 유닛의 주인이 누르면 에테르 1을 내고 그 코인만 다시 던진다 (교전마다 한 번).
   뒤집지 않으려면 "운명 수락". 컴퓨터도 같은 규칙으로 뒤집는다. 돌려주는 값: 뒤집은 코인 목록 [{p, uid, idx, heads}] */
const COIN_LIMIT_MS = 6500;   // v1.9: 5초 → 8초, v1.9.1: 8초 → 6.5초
function canReflip(pIdx) { const p = G.players[pIdx]; return !!p && ether(p) >= 1; }
function coinClash(info) {
  return new Promise(res => {
    const myG = G, layer = fxLayer();
    if (!layer || G.speed === 0) { res([]); return; }
    const k = kSpeed();
    const A = G.reg[info.a], D = G.reg[info.d];
    const human = pi => { const p = G.players[pi]; return !!p && !p.isAI && (G.mode !== "ai" || p.idx === 0); };
    const sides = [{ who: "a", u: A, coins: info.coinsA, p: info.pa }, { who: "d", u: D, coins: info.coinsD, p: info.pd }];
    // v1.6.1: 공·방·체 코인 중 같은 동전에 묶인 것은 동전 하나로 보인다 (engine.js coinGroups)
    sides.forEach(sd => { sd.human = human(sd.p); sd.stopped = false; sd.landed = false; sd.groups = coinGroups(sd.coins); });
    // 내 창이 왼쪽: 컴퓨터전이면 나(0번), 둘이 하면 지금 화면을 보는 사람
    const meIdx = G.mode === "ai" ? 0 : (G.viewer != null ? G.viewer : 0);
    const order = sides[1].p === meIdx ? [sides[1], sides[0]] : [sides[0], sides[1]];
    const auto = !!Prefs.get("coinAuto", false);
    let noFlip = !!Prefs.get("coinNoFlip", false);   // v1.9.1: 켜면 에테르로 다시 던지는 단계를 통째로 건너뛴다
    const autoBox = order.find(sd => sd.human && sd.coins.length);
    const partsHTML = o => o.parts.map(k => `<span class="cs-part st-${k.st}"><i>${statIco(k.st)}</i><b>${sgnNum(k.v)}</b></span>`).join("");
    const coinHTML = (sd, o, i) => `<div class="cs-coin spinning${o.parts.length > 1 ? " multi" : ""}" data-side="${sd.who}" data-i="${i}"><div class="cs-face cs-heads"></div><div class="cs-face cs-tails"></div></div>`;
    const ctlHTML = sd => !sd.coins.length ? "" : sd.human
      ? `<button type="button" class="btn primary cs-stop" data-side="${sd.who}">운명 봉인<small>Space · Enter</small></button>${sd === autoBox ? `<label class="cs-auto"><input type="checkbox" ${auto ? "checked" : ""}> 자동으로 봉인</label><label class="cs-auto cs-noflip"><input type="checkbox" ${noFlip ? "checked" : ""}> 다시 던지기 건너뛰기</label>` : ""}`
      : `<div class="cs-cpu-state">운명을 가늠하는 중…</div>`;
    const sideHTML = (sd, pos) => `<div class="cs-side cs-${sd.who} cs-${pos} ${sd.human ? "cs-human" : "cs-cpu"}${sd.coins.length ? "" : " no-coin"}" style="--cs-limit:${COIN_LIMIT_MS}ms">
      <div class="cs-banner">${esc(G.players[sd.p].name)}</div>
      <div class="cs-who"><i>${statIco(sd.who === "a" ? "a" : "d")}</i>${esc(C(sd.u).name)}<small>${sd.who === "a" ? "공격" : "방어"}</small></div>
      <div class="cs-coins">${sd.groups.length ? sd.groups.map((o, i) => coinHTML(sd, o, i)).join("") : `<div class="cs-none">코인 없음</div>`}</div>
      <div class="cs-res"></div><div class="cs-flip"></div>
      <div class="cs-ctl">${ctlHTML(sd)}</div>
      ${sd.coins.length ? `<div class="cs-sand"><i></i></div>` : ""}</div>`;
    const st = document.createElement("div");
    st.className = "coinstage";
    st.innerHTML = `${sideHTML(order[0], "left")}<div class="cs-mid"><div class="cs-vs">VS</div></div>${sideHTML(order[1], "right")}`;
    layer.appendChild(st);
    // v1.9.5 코인 창 1.5배. 화면이 작아 넘치면 들어갈 만큼만 키운다 (폭 760px 이하는 1배)
    const fitStage = () => { const z = Math.max(0.6, Math.min(innerWidth <= 760 ? 1 : 1.5, innerWidth * 0.97 / st.offsetWidth, innerHeight * 0.95 / st.offsetHeight)); st.style.setProperty("--csz", z.toFixed(3)); };
    fitStage();
    const panel = sd => st.querySelector(`.cs-side.cs-${sd.who}`);
    st.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 * k, easing: "ease-out" });
    order.forEach((sd, j) => panel(sd).animate([{ opacity: 0, transform: `translateX(${j ? 60 : -60}px)` }, { opacity: 1, transform: "none" }], { duration: 300 * k, easing: "cubic-bezier(.2,.8,.2,1)" }));
    st.querySelector(".cs-vs").animate([{ opacity: 0, transform: "scale(1.8)" }, { opacity: 1, transform: "scale(1)" }], { duration: 360 * k, delay: 120 * k, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
    let finished = false, phase = "spin";
    const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
    const clearAll = () => { timers.forEach(clearTimeout); timers.clear(); };
    const flips = [];
    const finish = () => {
      if (finished) return; finished = true; clearAll();
      st.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240 * k, fill: "forwards" }).onfinish = () => st.remove();
      FX.coinStop = null; res(flips);
    };
    const burstOn = (sd, kind, size) => { const r = panel(sd).querySelector(".cs-coins").getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, kind, size); };
    const landAnim = (el, heads, dur) => {
      el.classList.remove("spinning", "is-heads", "is-tails", "can-flip");
      const end = 1080 + (heads ? 0 : 180);
      el.animate([{ transform: "rotateY(0deg) scale(1.15)" }, { transform: `rotateY(${end}deg) scale(1)` }], { duration: dur, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
    };
    const resText = sd => {
      const r = panel(sd).querySelector(".cs-res"); if (!r) return;
      const hg = sd.groups.filter(o => o.heads), h = sd.coins.filter(x => x.heads);
      r.innerHTML = sd.groups.length ? (hg.length ? `앞면 ${hg.length} — ${h.map(x => STAT_KO[x.st] + " " + sgnNum(x.v)).join(" · ")}` : (sd.groups.length > 1 ? "모두 뒷면" : "뒷면")) : "";
    };
    /* v1.9.5 코인이 앞면이 되는 순간 "차창"(앞면이 여럿이면 0.12초씩 이어서), 뒷면이면 무딘 톡 */
    const coinRing = (el, faces, els) => {
      const cs = els || Array.from(el.querySelectorAll(".cs-coin"));
      let j = 0;
      faces.forEach((h, i) => { if (!h) return; const c = cs[i]; later(() => { sfx("coinHeads"); if (c) { c.classList.remove("ching"); void c.offsetWidth; c.classList.add("ching"); } }, j++ * 120); });
      if (!j && faces.length) sfx("coinTails");
    };
    /* 한쪽 창의 코인을 세운다 */
    const landSide = sd => {
      if (sd.stopped || finished) return; sd.stopped = true;
      const el = panel(sd); el.classList.add("stopping");
      Array.from(el.querySelectorAll(".cs-coin")).forEach((c, i) => landAnim(c, sd.groups[i].heads, 620 * k));
      later(() => {
        if (!st.isConnected) return;
        Array.from(el.querySelectorAll(".cs-coin")).forEach((c, i) => c.classList.add(sd.groups[i].heads ? "is-heads" : "is-tails"));
        coinRing(el, sd.groups.map(o => o.heads));
        resText(sd); el.classList.add("done"); fitStage();
        const cs = el.querySelector(".cs-cpu-state"); if (cs) cs.textContent = "운명이 봉인되었다";
        burstOn(sd, "slam", 220);
        sd.landed = true;
        if (sides.every(s => s.landed)) { st.classList.add("done"); decide(); }
      }, 640 * k);
    };
    // 코인이 없는 창은 처음부터 멈춘 것으로 친다
    sides.forEach(sd => { if (!sd.coins.length) { sd.stopped = sd.landed = true; panel(sd).classList.add("done"); } });
    /* 뒤집기 단계: 뒷면 코인을 누를 수 있는 쪽을 표시한다 */
    let left = new Set(), skipSide = () => {}, doFlip = () => {};
    const decide = () => {
      phase = "decide";
      const pending = [];
      for (const sd of sides) {
        const p = G.players[sd.p], el = panel(sd);
        el.classList.remove("stopping");
        const ctl = el.querySelector(".cs-ctl");
        const tails = sd.groups.map((o, i) => (!o.heads ? i : -1)).filter(i => i >= 0);
        if (!tails.length || !canReflip(sd.p) || (noFlip && sd.human)) { if (sd.human && ctl) ctl.innerHTML = ""; continue; }
        const box = el.querySelector(".cs-flip");
        pending.push(sd);
        if (sd.human) {
          tails.forEach(i => el.querySelector(`.cs-coin[data-i="${i}"]`).classList.add("can-flip"));
          box.innerHTML = `<span class="cf-hint"><i class="cf-eth"></i>뒷면 코인을 누르면 <b>에테르 1</b>로 다시 던집니다 <small>(남은 에테르 ${ether(p)} · 한 번)</small></span>`;
          ctl.innerHTML = `<button type="button" class="btn ghost cs-stop" data-side="${sd.who}">다시 안 던지고 넘기기<small>에테르 안 씀 · Space · Enter</small></button><label class="cs-auto cs-noflip"><input type="checkbox"> 이제 묻지 않기</label>`;
        } else {
          // 컴퓨터: 값이 가장 큰 뒷면 코인을 다시 던진다 (공격 때는 공격 코인, 방어 때는 방어·체력 코인을 먼저)
          const pref = sd.who === "a" ? { a: 2, h: 1, d: 0 } : { d: 2, h: 2, a: 0 };
          const worth = i => sd.groups[i].parts.reduce((s, k) => s + k.v + (k.v > 0 ? pref[k.st] : 0), 0);
          const best = tails.slice().sort((x, y) => worth(y) - worth(x))[0];
          if (worth(best) <= 0) { pending.pop(); box.innerHTML = ""; continue; }   // − 동전은 다시 던지지 않는다
          box.innerHTML = `<span class="cf-hint ai">${esc(p.name)}이(가) 코인을 다시 던집니다…</span>`;
          later(() => { if (!finished && st.isConnected) doFlip(sd, best); }, 650 * k);
        }
      }
      // v1.9.5 결과를 보여 주는 시간 2배: 1.1초 → 2.2초
      if (!pending.length) { later(() => { if (G === myG) finish(); else { st.remove(); res([]); } }, 2200 * k); return; }
      st.classList.add("deciding");
      left = new Set(pending.map(sd => sd.who));
      // v1.9.5 다시 던진 결과도 2배(0.9 → 1.8초). 사람이 "넘기기"를 누른 것은 그대로 0.9초
      const done = (who, ms) => { left.delete(who); if (!left.size) later(() => { if (G === myG) finish(); else { st.remove(); res(flips); } }, (ms || 1800) * k); };
      skipSide = sd => {
        if (!sd.human || !left.has(sd.who)) return;
        const el = panel(sd);
        el.querySelectorAll(".can-flip").forEach(e => e.classList.remove("can-flip"));
        el.querySelector(".cs-flip").innerHTML = ""; el.querySelector(".cs-ctl").innerHTML = "";
        done(sd.who, 900);
      };
      doFlip = (sd, i) => {
        if (!left.has(sd.who)) return;
        const el = panel(sd), c = el.querySelector(`.cs-coin[data-i="${i}"]`); if (!c) return;
        el.querySelectorAll(".can-flip").forEach(e => e.classList.remove("can-flip"));
        if (sd.human) el.querySelector(".cs-ctl").innerHTML = "";
        const heads = Math.random() < RULES.coinP;
        const o = sd.groups[i]; o.heads = heads;
        sd.coins = sd.coins.map(x => x.g === o.g ? Object.assign({}, x, { heads }) : x);
        flips.push({ p: sd.p, uid: sd.u.uid, idx: o.g, heads });
        floatAt("crys" + sd.p, "에테르 −1", "debuff");
        c.classList.add("spinning", "reflip");
        el.querySelector(".cs-flip").innerHTML = `<span class="cf-hint"><i class="cf-eth"></i>에테르 1 — 다시 던지는 중…</span>`;
        later(() => {
          if (!st.isConnected) return;
          landAnim(c, heads, 620 * k);
          later(() => { c.classList.add(heads ? "is-heads" : "is-tails"); c.classList.remove("reflip"); resText(sd); coinRing(null, [heads], [c]);
            el.querySelector(".cs-flip").innerHTML = `<span class="cf-hint ${heads ? "ok" : ""}">${heads ? "앞면! 값이 붙습니다" : "또 뒷면…"}</span>`;
            burstOn(sd, heads ? "slam" : "hit", 200); done(sd.who); }, 640 * k);
        }, 520 * k);
      };
      if (auto && pending.some(sd => sd.human)) later(() => pending.forEach(sd => skipSide(sd)), 3000 * k);
    };
    // 단추 · 코인 누르기
    st.addEventListener("click", e => {
      const b = e.target.closest(".cs-stop");
      if (b) { const sd = sides.find(x => x.who === b.dataset.side); if (!sd) return; if (phase === "spin") landSide(sd); else skipSide(sd); return; }
      const c = e.target.closest(".cs-coin.can-flip"); if (!c) return;
      const sd = sides.find(x => x.who === c.dataset.side); if (sd && sd.human) doFlip(sd, +c.dataset.i);
    });
    // Space · Enter: 아직 남은 사람 창 중 왼쪽 것부터
    const opened = performance.now();
    FX.coinStop = () => {
      // v1.9: 창이 막 뜬 0.4초 안의 키 입력은 앞 단계에서 넘어온 것으로 보고 무시한다
      if (phase === "spin" && performance.now() - opened < 400) return;
      if (phase === "spin") { const sd = order.find(s => s.human && !s.stopped); if (sd) landSide(sd); }
      else { const sd = order.find(s => s.human && left.has(s.who)); if (sd) skipSide(sd); }
    };
    // 컴퓨터는 스스로 세운다 (조금씩 다른 때에)
    sides.forEach(sd => { if (!sd.human && !sd.stopped) later(() => landSide(sd), Math.min((900 + Math.random() * 1400) * k, COIN_LIMIT_MS - 300)); });
    // 사람이 자동을 켰으면 잠시 뒤에
    if (auto) later(() => sides.forEach(sd => { if (sd.human) landSide(sd); }), 1000 * k);
    // 누구든 6.5초가 지나면 저절로 멈춘다
    later(() => sides.forEach(landSide), COIN_LIMIT_MS);
    if (sides.every(s => s.landed)) later(() => { st.classList.add("done"); decide(); }, 400 * k);
    st.addEventListener("change", e => {
      if (!e.target.closest(".cs-noflip")) return;
      noFlip = e.target.checked; Prefs.set("coinNoFlip", noFlip);
      if (noFlip && phase === "decide") sides.forEach(sd => skipSide(sd));
    });
    const ab = st.querySelector(".cs-auto:not(.cs-noflip) input");
    if (ab) ab.addEventListener("change", e => { Prefs.set("coinAuto", e.target.checked); if (e.target.checked && phase === "spin") later(() => sides.forEach(sd => { if (sd.human) landSide(sd); }), 500 * k); });
    // 경기가 끝나거나 나가면 그냥 닫는다
    const guard = setInterval(() => { if (G !== myG) { clearInterval(guard); clearAll(); st.remove(); FX.coinStop = null; if (!finished) { finished = true; res([]); } } else if (finished) clearInterval(guard); }, 200);
  });
}
/* 부서지는 카드: 조각으로 갈라져 흩어진다 (쓰러진 유닛, 쓴 마법) */
function shatterCard(b) {
  const layer = fxLayer(); if (!layer) return;
  const r = b.r, k = kSpeed();
  const g = document.createElement("div");
  g.className = "shatter";
  Object.assign(g.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
  const cols = 3, rows = 4;
  let h = "";
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const x0 = x / cols * 100, x1 = (x + 1) / cols * 100, y0 = y / rows * 100, y1 = (y + 1) / rows * 100;
    const jx = (Math.random() * 10 - 5).toFixed(1), jy = (Math.random() * 10 - 5).toFixed(1);
    h += `<div class="sh-piece" style="clip-path:polygon(${x0}% ${y0}%, ${x1}% ${(+y0 + +jy).toFixed(1)}%, ${(+x1 + +jx).toFixed(1)}% ${y1}%, ${x0}% ${y1}%);--dx:${((x - 1) * 60 + Math.random() * 40 - 20).toFixed(0)}px;--dy:${((y - 1.5) * 40 + 80 + Math.random() * 60).toFixed(0)}px;--rz:${(Math.random() * 80 - 40).toFixed(0)}deg;--dl:${(Math.random() * 90).toFixed(0)}ms">${b.html}</div>`;
  }
  g.innerHTML = h;
  g.querySelectorAll(".card, .card-back").forEach(c => { c.removeAttribute("data-uid"); ["acting", "targeted", "countering", "revealing", "selected", "flying", "drag-src", "fresh", "char-out", "struck", "dying"].forEach(x => c.classList.remove(x)); c.style.setProperty("--cw", r.width + "px"); });
  layer.appendChild(g);
  g.style.setProperty("--k", k);
  const c = ctrOf(r);
  burst(c.x, c.y, "burn", r.width * 1.5);
  shakeScreen(4);
  setTimeout(() => g.remove(), 1100 * k + 150);
}

/* ---------- 조각별 HTML ---------- */
function fieldCardHTML(it, p, s) {
  const c = C(it);
  const hidden = isSpell(it) && p.idx !== G.viewer;
  const cls = [];
  if (G.fx.act === it.uid) cls.push("acting");
  if (G.fx.tgt === it.uid || G.fx.thr === it.uid) cls.push("targeted");
  if (G.fx.counter === it.uid) cls.push("countering");
  if (G.fx.reveal === it.uid) cls.push("revealing");
  if ((G.sel && G.sel.kind === "field" && G.sel.p === p.idx && G.sel.slot === s) || G.inspect === it.uid) cls.push("selected");
  if (it.summoned === G.turn && G.phase !== "combat") cls.push("fresh");
  if ((FX.drag && FX.drag.uid === it.uid) || FX.returning === it.uid) cls.push("drag-src");
  if (FX.charOut.has(it.uid)) cls.push("char-out");
  if (it.item) cls.push("equipped");
  const attrs = `data-uid="${it.uid}" data-zone="field" data-p="${p.idx}" data-s="${s}"`;
  if (hidden && G.fx.reveal !== it.uid && G.fx.shown !== it.uid) return `<div class="card-back field-back ${cls.join(" ")}" ${attrs} title="상대가 뒷면으로 놓은 마법"><span>?</span><em>마법</em></div>`;
  if (isUnit(it) && it.t && !it.t.alive) cls.push("dying");
  let badges = "";
  if (isUnit(it) && it.t) {
    if (it.t.shield) badges += '<span class="bd bd-shield" title="보호막">◈</span>';
    if (it.t.taunt) badges += `<span class="bd bd-guard" title="수호">${statIco("d")}</span>`;
    if (it.t.lock) badges += '<span class="bd bd-lock" title="고정">⚓</span>';
    if (it.t.thorns) badges += `<span class="bd bd-thorn" title="가시">✶${it.t.thorns}</span>`;
    if (it.t.rest) badges += '<span class="bd bd-rest" title="이번 턴 행동 불가">✖</span>';
    if (c.tok) badges += `<span class="bd bd-tok" title="마법이 부른 유닛${it.tokTemp ? " · 이번 턴만" : ""}">✧</span>`;
    if (c.lock) badges += `<span class="bd bd-lock" title="고정: ${Object.keys(c.lock).map(k => STAT_KO[k]).join("·")}은(는) 내려가지 않음">${Object.keys(c.lock).map(k => STAT_KO[k][0]).join("")}*</span>`;
    if (it.mod) badges += `<span class="bd bd-mod" title="이 카드에 걸린 변화">${Object.keys(it.mod).filter(k => it.mod[k]).map(k => STAT_KO[k][0] + sgnNum(it.mod[k])).join(" ")}</span>`;
  }
  const live = isUnit(it) && it.t ? { a: it.t.a, d: it.t.d, h: Math.max(0, hpLeft(it)), max: it.t.h } : null;
  // v1.9.3: 장착한 아이템의 특수 능력을 캐릭터 그림 아래에 띠로 보인다(마우스를 올리면 뜻).
  //         아래에 겹쳐 깔린 아이템 카드(.c-under)는 진짜 카드 조각이라, 삐져나온 부분에 마우스를 올리거나 누르면 그 아이템이 보인다
  let item = "", under = "";
  if (it.item) {
    const ic = CARDS[it.item.id];
    // v1.9.4: 아래 카드 안에 진짜 아이템 카드를 그린다. 누르면 아이템이 앞으로, 유닛이 뒤로 (FX.itemFront, 전투 중에는 늘 유닛이 앞)
    under = `<div class="c-under" data-under="1">${cardHTML(ic, { size: "md", cls: "under-card" })}<span class="u-name">◆ ${esc(ic.name)}</span></div>`;
    if (FX.itemFront.has(it.uid) && G.phase !== "combat") cls.push("item-front");
    const chips = equipChipsHTML(ic);
    item = chips ? `<div class="c-equip">${chips}</div>` : "";
  }
  return cardHTML(c, { size: "md", live, badges, extra: item, under, cls: cls.join(" "), attrs, desc: "full" });
}
/* v1.9.3: 장착 아이템의 특수 능력 띠. 능력마다 한 칸, 마우스를 올리면 이름과 뜻. 능력이 없는 아이템(스탯만 올림)은 띠 없음 — 이름은 아래 카드에 보인다 */
function equipChipsHTML(ic) {
  const list = itemKwList(ic.item).filter(([k]) => k);
  if (ic.item.set) list[0] = [`[고정 ${ic.item.set.a}/${ic.item.set.d}/${ic.item.set.h}]`, list[0][1]];
  const chips = list.map(([k, v]) => `<span class="c-eq-ab" data-tip="${esc(k + "\n" + (v || ic.item.evText || "") + "\n— " + ic.name)}">${esc(k.replace(/^\[|\]$/g, ""))}</span>`);
  return chips.join("");
}
function selHandCard(p, ctrl) {
  const sel = G.sel;
  const it = ctrl && sel && sel.kind === "hand" ? p.hand.find(x => x.uid === sel.uid) : null;
  return it ? C(it) : null;
}
function fieldRowHTML(p, isMe, ctrlAll) {
  const ctrl = ctrlAll && isMe;
  const sel = G.sel, selC = selHandCard(p, ctrl);
  const fieldSel = ctrl && sel && sel.kind === "field";
  const slots = p.field.map((it, s) => {
    let cls = "slot";
    if (ctrl) {
      if (selC && selC.type !== "item" && !it && !canPlay(p, selC)) cls += " valid";
      if (selC && selC.type === "item" && isUnit(it) && !it.item && canEquip(selC, C(it)) && !canPlay(p, selC)) cls += " valid-equip";
      if (fieldSel && s !== sel.slot) cls += " valid-move";
    }
    if (s === 0) cls += " front";
    return `<div class="${cls}" data-act="slot" data-p="${p.idx}" data-s="${s}"><span class="slot-n">${s + 1}</span>${ctrl ? `<span class="hk hk-slot">${SLOT_KEYS[s].toUpperCase()}</span>` : ""}${it ? fieldCardHTML(it, p, s) : ""}</div>`;
  }).join("");
  const top = p.burn.length ? CARDS[p.burn[p.burn.length - 1]] : null;
  const burn = `<div class="zone burn${ctrl && sel ? " valid" : ""}" id="burn${p.idx}" data-act="burn" data-p="${p.idx}" title="소각장 ${p.burn.length}장">
      ${pitHTML(top)}
      <div class="zone-label">소각장</div><div class="zone-count">${p.burn.length}</div></div>`;
  const n = p.deck.length, layers = Math.min(20, Math.ceil(n / 2));
  const deck = `<div class="zone deck${n ? "" : " empty"}" id="deck${p.idx}" title="덱 ${n}장">
      <div class="deck-stack">${Array.from({ length: layers }, (_, i) => `<div class="deck-card" style="--i:${i}"></div>`).join("")}</div>
      <div class="zone-label">덱</div><div class="deck-n">${n}</div></div>`;
  // v1.4.1: 소각장은 왼쪽 열(상대 것은 위 끝, 내 것은 아래 끝), 오른쪽 열은 덱. 내 덱 왼쪽은 작은 게임(파친코·결정) 자리
  return `<div class="frow ${isMe ? "frow-bot" : "frow-top"}" data-p="${p.idx}"><div class="f-well">${burn}</div><div class="slots">${slots}</div><div class="f-piles">${isMe ? '<div class="arc-host"></div>' : ""}${deck}</div></div>`;
}
/* 셔플: 준비 완료 버튼 바로 아래의 작은 명판 (v1.4.1, 전에는 덱 더미 가운데).
   이번 턴에 카드를 전장에 올렸거나 소각했으면 흐려진다 */
function shuffleBtnHTML(p) {
  const why = shuffleBlock(p), off = !!why;
  // v1.9: 크게, 룬 인장 + 양 끝이 뾰족한 문양 명판 (css/battle-v19.css)
  const label = p.shuffled ? "셔플 사용함" : "셔플";
  return `<button type="button" class="shuffle-btn v19${off ? " used" : ""}" data-act="shuffle" ${off ? "disabled" : ""} data-tip="${esc("셔플 (S)\n핸드를 덱에 섞고 같은 장수를 다시 뽑습니다.\n한 턴에 한 번 · 생명 −1\n카드를 전장에 올리거나 소각한 턴에는 할 수 없습니다." + (why ? "\n\n지금: " + why : ""))}"><span class="sh-seal"><i class="sh-ring"></i>${uiIcon("shuffle")}</span><span class="sh-txt"><span class="sh-t">${label}</span><small>RESHUFFLE</small></span>${p.shuffled ? "" : `<span class="sh-cost">♥−1</span>`}<kbd>S</kbd></button>`;
}
function etherHTML(p, isMe, ctrlAll) {
  const ctrl = ctrlAll && isMe;
  const selC = selHandCard(p, ctrl);
  const up = upkeepOf(p), left = ether(p), tot = etherTotal(p);
  let gems = "";
  const usedN = Math.min(tot, tot - Math.max(0, left));
  const slotsN = RULES.essence + RULES.maxCrystals;
  for (let i = 0; i < slotsN; i++) {
    const ess = i < RULES.essence, has = i < tot, used = has && i >= tot - usedN;
    gems += `<span class="gem${ess ? " essence" : ""}${has ? " on" : ""}${used ? " used" : ""}" style="--a:${(360 / slotsN) * i}deg"></span>`;
  }
  const canCrys = ctrl && selC && crysLeft(p) > 0 && p.crystals.length < RULES.maxCrystals;
  const sub = [p.bonusNow ? `보너스 +${p.bonusNow}` : "", p.bonus ? `다음 턴 +${p.bonus}` : "", up ? `유지비 −${up}` : "", p.reloadNow ? `장전 −${p.reloadNow}` : ""].filter(Boolean).join(" · ");
  // 결정화 가능 여부: 이번 턴에 핸드를 결정으로 바칠 수 있는지 한눈에
  const maxed = p.crystals.length >= RULES.maxCrystals, done = crysLeft(p) <= 0;
  const myTurn = prepIdx() === p.idx;
  const crys = maxed ? `<span class="cry-state max" title="결정이 최대(${RULES.maxCrystals})입니다">결정 최대</span>`
    : done ? `<span class="cry-state done" title="결정화할 수 있는 장수를 다 썼습니다. 한 턴에 ${RULES.crystalsPerTurn}장씩 쌓입니다">결정화 완료</span>`
    : myTurn ? `<span class="cry-state ok" title="핸드를 에테르로 끌어 놓거나 C 키로 결정화. 한 턴에 ${RULES.crystalsPerTurn}장씩 쌓이고, 안 쓰면 다음 턴으로 넘어갑니다">결정화 가능 ${crysLeft(p)}</span>`
    : `<span class="cry-state" title="자기 준비 단계에만 결정화할 수 있습니다. 한 턴에 ${RULES.crystalsPerTurn}장씩 쌓입니다">결정화 ${crysLeft(p)}</span>`;
  // 에테르 제단: 가운데 정수 구슬(남은/이번 턴 에테르), 둘레의 마법진에 정수 1 + 결정 9칸이 박힌다
  return `<div class="ether altar${canCrys ? " valid" : ""}${left < 0 ? " short" : ""}${p.bonusNow ? " boosted" : ""}" data-act="ether" data-p="${p.idx}" id="crys${p.idx}" data-tip="${esc(`에테르 ${left} / ${tot}\n가운데 = 이번 턴 남은 에테르 / 이번 턴 에테르\n둘레 = 위대한 정수 1(금색, 깨지지 않음) + 결정 ${p.crystals.length}/${RULES.maxCrystals}\n빛나는 칸 = 쓸 수 있음 · 어두운 칸 = 이번 턴에 씀\n결정화: 핸드 1장을 여기로 끌어 놓기 (한 턴 ${RULES.crystalsPerTurn}장)`)}">
      <div class="eth-ring">
        <svg class="eth-circle" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" class="ec-out"/><circle cx="50" cy="50" r="42.5" class="ec-rune"/><circle cx="50" cy="50" r="36" class="ec-in"/>
          <path class="ec-star" d="M50 14 81.2 68 18.8 68Z M50 86 18.8 32 81.2 32Z"/></svg>
        ${gems}
        <div class="eth-orb"><b>${left}</b><span>/${tot}</span></div>
      </div>
      <div class="eth-foot">${crys}${sub ? `<span class="ether-sub">${sub}</span>` : ""}</div></div>`;
}
/* 명판: 아이디(온라인 대전에서 상대 아이디가 들어갈 자리)·단체·역할. 에테르 왼쪽에 놓인다 */
function nameplateHTML(p) {
  const gr = p.group ? GROUPS[p.group] : null, isAtk = p.idx === G.attacker;
  // 군기(軍旗): 장대에 걸린 단체의 깃발과 문장 방패. 내 깃발은 세로로 늘어지고, 상대 깃발은 가로로 펄럭인다
  const mine = p.idx === G.viewer;
  const cloth = mine ? "M5 6H95V88L50 78 5 88Z" : "M4 6H96L86 50 96 94H4Z";
  const trim = mine ? "M10 11H90V81L50 72 10 81Z" : "M8.5 12H88L80 50 88 88H8.5Z";
  const rod = mine ? "M0 4H100" : "M2 0V100";
  const emb = gr ? `<span class="np-shield" data-tip="${esc(`${gr.name} · ${gr.role}\n${gr.motto}`)}"><svg class="np-sh" viewBox="0 0 64 72" aria-hidden="true"><path d="M32 3 59 12v22c0 17-11 29-27 35C16 63 5 51 5 34V12z"/></svg>${glyphSVG(gr.glyph)}</span>` : "";
  return `<div class="nameplate banner ${mine ? "bn-v" : "bn-h"} fac-${p.faction}${p.isAI ? " ai" : ""}" id="np${p.idx}" style="${gr ? `--gc:${gr.color}` : ""}">
      <svg class="np-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="np-cloth" d="${cloth}"/><path class="np-trim" d="${trim}"/><path class="np-rod" d="${rod}"/></svg>
      ${emb}<div class="np-meta">
        <b class="np-id">${esc(p.name)}</b>
        <small class="np-sub">${gr ? gr.name : FACTIONS[p.faction].name}${p.isAI ? " · 컴퓨터" : ""}</small>
        <span class="pi-role ${isAtk ? "r-atk" : "r-def"}">${isAtk ? "공격" : "방어"}</span>
      </div></div>`;
}
/* 값이 바뀐 순간에만 붙는 클래스: 숫자가 한 번 튀어 오른다 (줄면 붉게, 늘면 금빛) */
const BUMP = {};
function bumpCls(key, v) { const was = BUMP[key]; BUMP[key] = v; return was != null && was !== v ? (v < was ? " bump dn" : " bump up") : ""; }
/* 생명 보석: 깎은 루비 (에테르 결정과 같은 마름모 문양) */
const RUBY_SVG = `<svg class="ruby" viewBox="0 0 24 24" aria-hidden="true"><path class="rb1" d="M12 1.5 17 9 12 12 7 9Z"/><path class="rb2" d="M12 1.5 7 9 3 12Z"/><path class="rb3" d="M12 1.5 17 9 21 12Z"/><path class="rb4" d="M3 12 7 9 12 12 12 22.5Z"/><path class="rb5" d="M21 12 17 9 12 12 12 22.5Z"/></svg>`;
/* 생명·장수: 위는 생명(루비 + 큰 숫자 + 눈금 막대), 아래는 덱·핸드·소각 */
function infoHTML(p) {
  const gr = p.group ? GROUPS[p.group] : null, top = p.idx !== G.viewer;
  const life = Math.max(0, p.life), pct = Math.min(100, life / RULES.lifeCap * 100);
  const stat = (k, ico, label, v, tip) => `<div class="ps ps-${k}" data-tip="${esc(tip)}">${uiIcon(ico)}<b class="${bumpCls(k + p.idx, v).trim()}">${v}</b><span>${label}</span></div>`;
  return `<div class="pinfo pv7 ${top ? "pv-top" : "pv-bot"} fac-${p.faction}${G.fx.tgt === "life" + p.idx ? " hit" : ""}${life <= 10 ? " low" : ""}" id="pinfo${p.idx}" style="${gr ? `--gc:${gr.color}` : ""}">
      <div class="pl" data-tip="${esc(`생명 ${life} / ${RULES.lifeCap}\n0이 되면 패배합니다.`)}">
        <div class="pl-head">${RUBY_SVG}<span>LIFE</span></div>
        <div class="pl-val"><b class="pl-num${bumpCls("life" + p.idx, life)}" id="life${p.idx}">${life}</b><small>/${RULES.lifeCap}</small></div>
        <div class="pl-bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="pstats">${stat("hand", "hand", "핸드", p.hand.length, `핸드 ${p.hand.length}장`)}</div>
    </div>`;
}
function handHTML(p, hidden, ctrl) {
  const n = p.hand.length, mid = (n - 1) / 2, d = Math.max(n - 1, 1);
  if (hidden) {
    return `<div class="hand hand-opp" data-p="${p.idx}">${p.hand.map((it, i) => {
      const k = i - mid;
      return `<div class="opp-back" data-uid="${it.uid}" data-zone="hand" data-p="${p.idx}" data-rot="0" style="--k:${k}"><div class="card-back"><span>◈</span></div></div>`;
    }).join("")}</div>`;
  }
  const sel = G.sel;
  return `<div class="hand hand-me" data-p="${p.idx}">${p.hand.map((it, i) => {
    const c = C(it), why = ctrl ? canPlay(p, c) : "x";
    const k = i - mid, rot = +(k * 4.2).toFixed(2), y = +(k * k * 1.1).toFixed(2);
    const cls = ["hand-slot"];
    if (why) cls.push("unplayable");
    if (sel && sel.kind === "hand" && sel.uid === it.uid) cls.push("selected");
    if ((FX.drag && FX.drag.uid === it.uid) || FX.returning === it.uid) cls.push("drag-src");
    if (FX.drawing.has(it.uid)) cls.push("drawing");
    const modTag = it.mod ? `<span class="hand-mod" title="이 카드에 걸린 변화 (이 판 내내)">${Object.keys(it.mod).filter(k => it.mod[k]).map(k => statIco(k) + sgnNum(it.mod[k])).join(" ")}</span>` : "";
    return `<div class="${cls.join(" ")}" data-act="hand" data-uid="${it.uid}" data-zone="hand" data-p="${p.idx}" data-rot="${rot}" style="--k:${k};--d:${d};--r:${rot}deg;--y:${y}%;z-index:${i + 1}" title="${why && ctrl ? esc(why) : "누르면 크게 보기 · 끌어서 내기"}"><div class="hand-card">${cardHTML(c, { size: "md", desc: "short" })}${modTag}${i < 9 ? `<span class="hk hk-hand">${i + 1}</span>` : ""}</div></div>`;
  }).join("") || '<div class="hand-empty">핸드 없음</div>'}</div>`;
}
function phaseText() {
  const A = G.players[G.attacker], D = opp(A);
  if (G.phase === "atkPrep") return { t: "공격 준비", who: A.name, icon: "⚔" };
  if (G.phase === "defPrep") return { t: "방어 준비", who: D.name, icon: "⛨" };
  if (G.phase === "combat") return { t: "전투", who: `${A.name} → ${D.name}`, icon: "✦" };
  return { t: "경기 종료", who: G.winner != null ? G.players[G.winner].name + " 승리" : "", icon: "◆" };
}
function actionBarHTML(me) {
  if (G.phase === "combat") { const l = G.log[G.log.length - 1]; return `<div class="hint live">${l ? esc(l.text) : "전투가 진행 중입니다…"}</div>`; }
  if (G.control !== me.idx || G.handoff) {
    if (G.phase === "over") return `<div class="hint">${esc(G.reason || "")}</div>`;
    const w = G.players[prepIdx()];
    return `<div class="hint">${esc(w ? w.name : "")}이(가) 준비하고 있습니다…</div>`;
  }
  const s = G.sel;
  if (s && s.kind === "hand") return `<div class="hint">끌어서 <b>빈 칸</b> · <b>에테르</b>(결정화) · <b>소각장</b>에 놓기 · <b>더블클릭</b> = 빈 칸에 올리기</div>`;
  if (s && s.kind === "field") return `<div class="hint">끌어서 자리 바꾸기 · <b>소각장</b>으로 보내기</div>`;
  const r = role(me);
  const short = ether(me) < 0 ? ` <b class="bad">유지비가 모자랍니다: 결정화하거나 유닛을 소각하세요.</b>` : "";
  return `<div class="hint">${r === "atk"
    ? "더블클릭 또는 끌어서 유닛·공격 마법 올리기 · 아이템은 유닛 위로"
    : "상대 배치를 보고 막기 · 막지 못한 공격은 생명 감소, 대신 다음 턴 에테르 +1"}${short}</div>`;
}
function onField(uid) { return G.players.some(p => p.field.some(x => x && x.uid === uid)); }
/* ---------- 판 위 버튼 문양 (viewBox 0 0 24 24) ---------- */
const UI_ICON = {
  settings: '<circle cx="12" cy="12" r="7.6" fill="none" stroke="currentColor" stroke-width="3.6" stroke-dasharray="2.98 2.99"/><circle cx="12" cy="12" r="5.6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.8"/>',
  log: '<path d="M5.5 4.5H18v13.2a2.3 2.3 0 01-2.3 2.3H6.8a2.3 2.3 0 01-2.3-2.3V16H14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M18 4.5a2 2 0 012 2V8h-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.5 8.5h6M8.5 11.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  rules: '<path d="M12 6.2C9.5 4.6 6.6 4.2 3.8 4.6v13.2c2.8-.4 5.7 0 8.2 1.6 2.5-1.6 5.4-2 8.2-1.6V4.6c-2.8-.4-5.7 0-8.2 1.6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6.4v12.8" stroke="currentColor" stroke-width="1.6"/>',
  flag: '<path d="M6 21V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6.6 4.6c3-1.8 5.4 1.7 8.4 0 2.2-1.2 4-.7 4-.7v8.4s-1.8-.5-4 .7c-3 1.7-5.4-1.8-8.4 0z"/>',
  exit: '<path d="M10 4H5.5v16H10" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9.5 12h10M15.5 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  hourglass: '<path d="M6 3h12M6 21h12M7.5 3c0 5 9 5 9 9s-9 4-9 9M16.5 3c0 5-9 5-9 9s9 4 9 9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M9.5 18.5h5l-2.5-2.2z"/>',
  shuffle: '<path d="M3 7h3.2c4.3 0 6.3 10 10.6 10H20M3 17h3.2c1.7 0 2.9-1.5 3.9-3.4M13.9 10.4C15 8.4 16.1 7 17.8 7H20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M17.6 4.2 20.6 7l-3 2.8M17.6 14.2l3 2.8-3 2.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  crystal: '<path d="M12 2.5 18.5 9 12 21.5 5.5 9z"/><path d="M5.5 9h13M12 2.5 9 9l3 12.5L15 9z" fill="none" stroke="#000" stroke-opacity=".38" stroke-width="1.2" stroke-linejoin="round"/>',
  burn: '<path d="M12 2c.8 3.6 6 5.8 6 11.6a6 6 0 01-12 0c0-2.8 1.4-4.4 2.9-5.4-.1 2 .9 3.4 2.4 3.6C10.4 8.5 11.3 5 12 2z"/><path d="M12 21c-1.8 0-3-1.2-3-3 0-1.6 1.2-2.6 2-3.4.1 1.2.7 2 1.6 2.1-.3-1.3.1-2.6.6-3.4 1 1.3 1.8 2.6 1.8 4.7 0 1.8-1.2 3-3 3z" fill="#000" fill-opacity=".3"/>',
  close: '<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  deck: '<rect x="8" y="2.8" width="11.5" height="15.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.2 6.2v12.4a2.6 2.6 0 002.6 2.6h8.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M13.75 7.2l2.2 3.3-2.2 3.3-2.2-3.3z"/>',
  hand: '<rect x="7.5" y="4" width="9" height="14" rx="1.6" transform="rotate(-22 12 21)" opacity=".42"/><rect x="7.5" y="4" width="9" height="14" rx="1.6" transform="rotate(22 12 21)" opacity=".42"/><rect x="7.5" y="3.2" width="9" height="14.8" rx="1.6" stroke="#0b0b12" stroke-width="1.1"/>',
  place: '<path d="M12 3v10.5M7.5 9 12 13.5 16.5 9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 15.5V20h16v-4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
};
const uiIcon = (k, cls) => `<svg class="ui-ico${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${UI_ICON[k]}</svg>`;

/* 고른 카드 패널: 위에 카드, 아래에 따로 떨어진 동작 상자(상태 한 줄 · 버튼 · 키워드 뜻) */
/* 낼 수 없는 이유를 [제목, 자세히] 두 조각으로 */
function shortWhy(why) {
  let m;
  if ((m = why.match(/필요 (\d+), 남은 에테르 (\d+)/))) return ["에테르 부족", `필요 ${m[1]} · 남음 ${m[2]}`];
  if (why.startsWith("지금은")) return ["지금은 낼 수 없음", ""];
  if (why.startsWith("공격 마법")) return ["공격 턴 전용", "내 공격 턴에만 사용"];
  if (why.startsWith("방어 마법")) return ["방어 턴 전용", "내 방어 턴에만 사용"];
  if (why.startsWith("장착할 수 있는")) return ["장착할 유닛 없음", ""];
  if (why.startsWith("빈 전장")) return ["빈 칸 없음", ""];
  if (why.startsWith("대가로")) return ["생명 부족", ""];
  return [why, ""];
}
function focusKws(c) {
  if (c.type === "item") return itemKwList(c.item).map(([k, v]) => [k.replace(/[\[\]]/g, ""), v]);
  if (c.type !== "unit" && c.cost && c.cost.ether) return [[`장전 ${c.cost.ether}`, `다음 턴 에테르 −${c.cost.ether}.`]];
  return [];
}
function focusInst(inst) {
  if (!inst || !inst.t) return [];
  const out = [];
  if (inst.item) {
    const ic = CARDS[inst.item.id];
    out.push(["장착", ic.name]);
    // v1.6.2: 장착한 아이템의 능력과 뜻을 유닛 설명 아래에 그대로 보여 준다
    for (const [k, v] of itemKwList(ic.item)) out.push([k.replace(/[\[\]]/g, ""), v]);
  }
  const cs = inst.t.coins || [];
  if (cs.length && cs[0].heads != null) out.push(["최근 코인", coinGroups(cs).map(o => `${o.parts.map(k => STAT_KO[k.st][0] + sgnNum(k.v)).join("")} ${o.heads ? "앞" : "뒤"}`).join(" · ")]);
  return out;
}
/* 고른 카드 패널 (v0.7)
   머리줄: 어디서 고른 카드인지 + 닫기(×, Esc) · 카드 · 상태 한 줄 · 주 버튼(전장에 올리기) · 보조 버튼 두 칸(결정화 · 소각) · 키워드 뜻 */
const fSub = (act, label, key, cls, off, ico, tip) => `<button type="button" class="f-sub ${cls}" data-act="${act}"${off ? " disabled" : ""}${tip ? ` data-tip="${esc(tip)}"` : ""}>${uiIcon(ico)}<span>${label}</span><kbd>${key}</kbd></button>`;
function focusHTML(me, ctrl) {
  let c = null, inst = null, main = "", btns = [], state = null, bad = false, key = null, head = "";
  if (ctrl && G.sel && G.sel.kind === "hand") {
    const it = me.hand.find(x => x.uid === G.sel.uid);
    if (it) {
      c = C(it); key = "h" + it.uid; head = `핸드 · ${me.hand.indexOf(it) + 1}번째`;
      const why = canPlay(me, c);
      const maxed = me.crystals.length >= RULES.maxCrystals, done = crysLeft(me) <= 0;
      if (c.type !== "item") main = `<button type="button" class="f-cta" data-act="do-place"${why ? " disabled" : ""}>${uiIcon("place")}<span>전장에 올리기</span><em class="f-cost" title="에테르 ${costOf(c)}"><i></i>${costOf(c)}</em></button>`;
      btns = [
        fSub("do-crystal", "결정화", "C", "f-cry", maxed || done, "crystal", maxed ? "결정이 최대입니다." : done ? `결정화할 수 있는 장수를 다 썼습니다.\n한 턴에 ${RULES.crystalsPerTurn}장씩 쌓입니다.` : `이 카드를 결정으로 바칩니다.\n다음 턴부터 에테르 +1\n(지금 ${crysLeft(me)}장 더 할 수 있음)`),
        fSub("do-burn", "소각", "X", "f-burn", false, "burn", "이 카드를 소각장에 버립니다.")
      ];
      bad = !!why;
      state = why ? shortWhy(why) : c.type === "item" ? ["장착 가능", "내 유닛 위로 끌어 놓기"] : c.type === "unit" ? ["낼 수 있음", "빈 칸으로 끌어 놓기"] : ["낼 수 있음", "앞 칸 유닛이 끝나면 발동"];
    }
  } else if (ctrl && G.sel && G.sel.kind === "field") {
    inst = me.field[G.sel.slot];
    if (inst) {
      c = C(inst); key = "f" + inst.uid; head = `내 전장 · ${G.sel.slot + 1}번 칸`;
      btns = [fSub("do-burnfield", "소각", "X", "f-burn", false, "burn", "이 카드를 소각장에 버립니다.")];
      state = ["자리 바꾸기", "다른 칸으로 끌어 놓기"];
    }
  } else if (G.inspect) {
    inst = G.reg[G.inspect];
    const owner = inst && G.players.find(p => p.field.includes(inst));
    if (inst && owner && !(isSpell(inst) && owner.idx !== G.viewer)) {
      c = C(inst); key = "i" + inst.uid;
      head = `${owner.idx === G.viewer ? "내 전장" : "상대 전장"} · ${owner.field.indexOf(inst) + 1}번 칸`;
    }
  }
  if (!c) { FX.focusKey = null; return focusIdleHTML(ctrl); }
  const enter = FX.focusKey !== key; FX.focusKey = key;
  const info = focusInst(inst).concat(focusKws(c));
  const box = state || main || btns.length || info.length;
  return `<aside class="focus v7${enter ? " enter" : ""}" data-focus>
    <div class="f-head"><span>${esc(head)}</span><button type="button" class="f-x" data-act="do-cancel" aria-label="닫기" data-tip="닫기 · Esc">${uiIcon("close")}<kbd>Esc</kbd></button></div>
    <div class="f-name"><span class="f-lv">${c.lv}</span><b>${esc(c.name)}</b></div>
    ${cardHTML(c, { size: "lg", cls: "f-card" })}
    ${box ? `<div class="f-box">
      ${state ? `<p class="f-state${bad ? " bad" : " ok"}"><i></i><b>${esc(state[0])}</b>${state[1] ? `<span>${esc(state[1])}</span>` : ""}</p>` : ""}
      ${main}
      ${btns.length ? `<div class="f-subs" style="--n:${btns.length}">${btns.join("")}</div>` : ""}
      ${info.length ? `<dl class="f-info">${info.map(([k, v]) => `${k ? `<dt>${esc(k)}</dt>` : ""}<dd${k ? "" : ' class="wide"'}>${esc(v)}</dd>`).join("")}</dl>` : ""}
    </div>` : ""}</aside>`;
}
/* 아무 카드도 고르지 않았을 때 왼쪽 열: 최근 전투 기록 + (접힌) 단축키 */
function focusIdleHTML(ctrl) {
  const keys = [["1–9", "핸드 고르기"], ["Q–T", "칸에 놓기 · 장착"], ["C", "결정화"], ["X", "소각"], ["S", "셔플"], ["Enter", "준비 완료"], ["Esc", "선택 풀기"]];
  const recent = G.log.slice(-9);
  return `<aside class="focus-idle${ctrl ? " live" : ""}" aria-hidden="true">
    <div class="fi-log"><p class="fi-head">최근 기록</p>${recent.map(l => `<div class="l ${l.cls}">${esc(l.text)}</div>`).join("")}</div>
    <details class="fi-keys-wrap"><summary>단축키</summary><dl class="fi-keys">${keys.map(([k, v]) => `<dt><kbd>${k}</kbd></dt><dd>${v}</dd>`).join("")}</dl></details></aside>`;
}
/* 고른 카드 패널은 왼쪽 열, 상대 소각장(위)과 내 소각장(아래) 사이에 맞춘다 (v1.4.1).
   카드 그림은 넣지 않는다: 마우스를 올리면 핸드에서 크게 보이고, 전장 카드는 옆에 원본이 뜬다 */
function placeFocus() {
  const fo = boardEl && boardEl.querySelector(".focus.v7, .focus-idle");
  if (!fo) return;
  if (!matchMedia("(min-width: 761px)").matches) { fo.removeAttribute("style"); return; }
  const top = boardEl.querySelector(".frow-top .f-well"), bot = boardEl.querySelector(".frow-bot .f-well");
  if (!top || !bot) return;
  const b = boardEl.getBoundingClientRect(), w = top.getBoundingClientRect();
  const bt = top.querySelector(".burn"), bb = bot.querySelector(".burn");
  const y0 = (bt ? bt.getBoundingClientRect().bottom : top.parentElement.getBoundingClientRect().top) + 10;
  const y1 = (bb ? bb.getBoundingClientRect().top : bot.parentElement.getBoundingClientRect().bottom) - 10;
  const W = Math.max(w.width, 220);
  fo.style.left = (w.left - b.left) + "px"; fo.style.top = (y0 - b.top) + "px";
  fo.style.width = W + "px";
  if (fo.classList.contains("focus-idle")) { fo.style.height = Math.max(80, y1 - y0) + "px"; return; }
  fo.style.height = ""; fo.style.maxHeight = Math.max(80, y1 - y0) + "px";
}
addEventListener("resize", () => { if (G && boardEl && document.body.contains(boardEl)) placeFocus(); });

function render() {
  if (!G || G.cfg.headless || !boardEl) return;
  const me = G.players[G.viewer], them = opp(me);
  const key = G.viewer + "|" + (G.handoff ? 1 : 0);
  const animOK = !!(FX.last && FX.last.g === G && FX.last.key === key && G.speed !== 0 && !RM());
  const before = animOK ? capture() : null;
  const ctrl = G.control === me.idx && !G.handoff;
  if (G.inspect && !onField(G.inspect)) G.inspect = null;
  const ph = phaseText();
  const atkDown = G.attacker !== me.idx;
  const hideMine = G.handoff || (G.mode === "ai" && me.isAI);
  boardEl.innerHTML = `
  <div class="b-main">
    <div class="prow prow-top"><div class="pside">${nameplateHTML(them)}${etherHTML(them, false, ctrl)}</div>${handHTML(them, true, false)}${infoHTML(them)}</div>
    ${fieldRowHTML(them, false, ctrl)}
    <div class="midbar v7">
      <div class="mb-well"></div>
      <div class="mb-center">
        <div class="phase ${G.phase === "atkPrep" ? "ph-atk" : G.phase === "defPrep" ? "ph-def" : "ph-etc"}"><span class="ph-turn ph-round" data-tip="${esc(`라운드 ${roundOf(G.turn)} · 이 라운드의 ${roundStep(G.turn)}번째 턴\n라운드 = 공격 턴과 방어 턴이 한 번씩 지나가는 것\n(전체 턴 ${G.turn})`)}">ROUND<b>${roundOf(G.turn)}</b><span class="rd-steps">${[1, 2].map(i => `<i class="${i < roundStep(G.turn) ? "done" : i === roundStep(G.turn) ? "now" : ""}"></i>`).join("")}</span></span><span class="ph-t">${ph.t}</span><span class="ph-who">${esc(ph.who)}</span>
          <span class="ph-dir ${atkDown ? "down" : "up"}" data-tip="공격 방향: ${atkDown ? "상대 → 나" : "나 → 상대"}">${atkDown ? "▼" : "▲"}</span></div>
        <div class="actionbar">${actionBarHTML(me)}</div>
      </div>
      <div class="mb-right">
        <div class="toolbar" role="toolbar" aria-label="메뉴">
          <button type="button" class="tb-btn tb-speed" data-act="speed-cycle" aria-label="연출 속도" data-tip="연출 속도 ×${G.speed}\n누를 때마다 ${SPEEDS.join(" → ")}">${uiIcon("hourglass")}<span>×${G.speed}</span></button>
          <i class="tb-sep"></i>
          <button type="button" class="tb-btn" data-act="settings" aria-label="설정" data-tip="설정\n글꼴·속도">${uiIcon("settings")}</button>
          <button type="button" class="tb-btn${G.showLog ? " on" : ""}" data-act="log" aria-label="기록" data-tip="전투 기록">${uiIcon("log")}</button>
          <button type="button" class="tb-btn" data-act="rules" aria-label="규칙" data-tip="규칙">${uiIcon("rules")}</button>
          <i class="tb-sep"></i>
          <button type="button" class="tb-btn tb-danger" data-act="surrender" aria-label="${G.phase === "over" ? "나가기" : "항복"}" data-tip="${G.phase === "over" ? "나가기" : "항복"}">${uiIcon(G.phase === "over" ? "exit" : "flag")}</button>
        </div>
        <div class="rd-wrap">${ctrl ? `${clockHTML()}<button type="button" class="ready-btn ${G.phase === "atkPrep" ? "rd-atk" : "rd-def"}" data-act="ready"><svg class="rd-ico" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${G.phase === "atkPrep" ? RITE_ICON.atk : RITE_ICON.def}</svg><span class="rd-t">${G.phase === "atkPrep" ? "공격 준비 완료" : "방어 준비 완료"}</span><kbd>Enter</kbd></button>${shuffleBtnHTML(me)}`
          : `<div class="ready-btn rd-wait" aria-hidden="true"><span class="rd-t">${G.phase === "combat" ? "전투 중" : G.phase === "over" ? "경기 종료" : "상대 준비 중"}</span></div>`}</div>
      </div>
    </div>
    ${fieldRowHTML(me, true, ctrl)}
    <div class="prow prow-bot"><div class="pside">${nameplateHTML(me)}${etherHTML(me, true, ctrl)}</div>${handHTML(me, hideMine, ctrl)}${infoHTML(me)}</div>
  </div>
  ${G.rules.text ? `<div class="rule-chip" data-tip="${esc(`판 규칙 · ${G.rules.who || ""}\n${G.rules.text}`)}"><i>◆</i><b>${esc(G.rules.name)}</b><span>${esc(G.rules.text)}</span></div>` : ""}
  ${focusHTML(me, ctrl)}
  <aside class="logdrawer${G.showLog ? " open" : ""}" id="logdrawer"><div class="ld-head"><b>전투 기록</b><button class="btn xs ghost" data-act="log">닫기</button></div>
    <div class="log" id="log">${G.log.slice(-120).map(l => `<div class="l ${l.cls}">${esc(l.text)}</div>`).join("")}</div></aside>
  ${G.handoff ? `<div class="handoff" data-act="handoff"><div><p class="ho-eyebrow">PASS THE SCROLL</p><h2>${esc(me.name)}의 차례</h2><p>${G.phase === "atkPrep" ? "공격 준비" : "방어 준비"}를 할 차례입니다. 상대가 화면을 보지 않을 때 눌러 주세요.</p><button class="btn primary">핸드 펼치기</button></div></div>` : ""}`;
  const lg_ = $("#log"); if (lg_) lg_.scrollTop = lg_.scrollHeight;
  if (typeof Arcade !== "undefined") { Arcade.mount(boardEl); Arcade.place(boardEl); }
  placeFocus();
  if (typeof fitDescs === "function") fitDescs(boardEl);
  if (G.phase === "combat") hideZoom();
  syncPin();
  Guide.place();
  FX.last = { g: G, key };
  if (before) flipAll(before);
  boardEl.classList.toggle("hand-locked", handLocked());
  FX.from = {}; G.leave = {};
  if (animOK) combatFx();
}

/* ---------- 움직임: FLIP ---------- */
function capture() {
  const m = new Map();
  if (!boardEl) return m;
  boardEl.querySelectorAll("[data-uid]").forEach(el => {
    const vis = el.matches(".card,.card-back") ? el : el.querySelector(".card,.card-back") || el;
    const hc = el.querySelector(".hand-card");
    m.set(el.dataset.uid, { r: el.getBoundingClientRect(), hc: hc ? hc.getBoundingClientRect() : null, zone: el.dataset.zone, p: +el.dataset.p, s: el.dataset.s, rot: +el.dataset.rot || 0, html: vis.outerHTML });
  });
  return m;
}
/* 내 준비 단계에서 내가 한 일인지: 그렇다면 손맛 리듬(kSpeedUI)을 쓴다 */
const kAct = () => (G && G.phase !== "combat" && G.control != null && G.control === G.viewer) ? kSpeedUI() : kSpeed();
function animFrom(el, from, to, rotDeg, kind, delay) {
  const k = kAct();
  const a = ctrOf(from), b = ctrOf(to);
  const dx = a.x - b.x, dy = a.y - b.y, sx = from.width / to.width, sy = from.height / to.height;
  const start = { translate: `${dx}px ${dy}px`, scale: `${sx} ${sy}`, rotate: `${rotDeg}deg` };
  const end = { translate: "0px 0px", scale: "1 1", rotate: "0deg" };
  let kf, dur, ease = "linear";
  if (kind === "rise") {
    // v1.8 올라가기: 손에서 들어 올려(빛나며 커짐) 칸 위로 떠올랐다가, v1.7 착지처럼 칸에 빨려 들어가 눌렸다 튀어 붙는다
    const lift = Math.max(70, to.height * 0.55), hit = 0.74;
    kf = [Object.assign({ filter: "brightness(1)", easing: "cubic-bezier(.25,.7,.35,1)" }, start),
      { offset: 0.16, translate: `${dx * 0.9}px ${dy * 0.9 - lift * 0.35}px`, scale: `${sx * 1.08} ${sy * 1.08}`, rotate: `${rotDeg * 0.4}deg`, filter: "brightness(1.25)", easing: "cubic-bezier(.3,.6,.35,1)" },
      { offset: 0.5, translate: `${dx * 0.15}px ${-lift}px`, scale: "1.3 1.3", rotate: `${rotDeg > 0 ? -4 : 4}deg`, filter: "brightness(1.45) drop-shadow(0 0 18px rgba(246,226,168,.9))", easing: "cubic-bezier(.55,.02,.85,.45)" },
      { offset: hit, translate: `0px ${to.height * 0.02}px`, scale: "1.07 0.9", rotate: "0deg", filter: "brightness(1.2)", easing: "cubic-bezier(.2,.75,.3,1)" },
      { offset: 0.87, translate: `0px ${-to.height * 0.012}px`, scale: "0.97 1.035", rotate: "0deg", filter: "brightness(1)", easing: "ease-out" },
      Object.assign({ filter: "brightness(1)" }, end)];
    dur = Math.round(FT.place * 2.1);
    sfx("swing", 0.75);
    setTimeout(() => sfx("suck"), (delay || 0) * k + dur * 0.5 * k);
    if (typeof suckRing === "function") suckRing(el, ((delay || 0) + dur * 0.5) * k, dur * (hit - 0.5) * k);
    setTimeout(() => {
      if (!el.isConnected) return;
      sfx("place");
      const r = el.getBoundingClientRect(), c = ctrOf(r);
      burst(c.x, c.y + r.height * 0.3, "slam", r.width * 1.6);
      shakeScreen(3);
    }, ((delay || 0) + dur * hit) * k);
  } else if (kind === "slam") {
    // v1.7 착지: 칸이 카드를 빨아들인다. 처음엔 머뭇거리다 점점 빨라져 들어오고(가속),
    // 닿는 순간 판에 눌려 납작해졌다가(찌그러짐) 쫀쫀하게 튀어 올라 붙는다. 칸 둘레 빛 고리가 안으로 조여든다
    const hit = 0.56;
    kf = [Object.assign({ easing: "cubic-bezier(.55,.02,.85,.45)" }, start),
      { offset: hit, translate: `0px ${to.height * 0.02}px`, scale: "1.07 0.9", rotate: "0deg", easing: "cubic-bezier(.2,.75,.3,1)" },
      { offset: 0.74, translate: `0px ${-to.height * 0.012}px`, scale: "0.97 1.035", rotate: "0deg", easing: "ease-in-out" },
      { offset: 0.88, translate: "0px 0px", scale: "1.012 0.992", rotate: "0deg", easing: "ease-out" }, end];
    dur = FT.place;
    sfx("suck");
    suckRing(el, (delay || 0) * k, dur * hit * k);
    setTimeout(() => {
      if (!el.isConnected) return;
      sfx("place");
      const r = el.getBoundingClientRect(), c = ctrOf(r);
      burst(c.x, c.y + r.height * 0.3, "slam", r.width * 1.5);
      shakeScreen(2.5);
    }, ((delay || 0) + dur * hit) * k);
  } else if (kind === "draw") {
    kf = [Object.assign({ opacity: 0.4, easing: "cubic-bezier(.3,.6,.4,1)" }, start), { offset: 0.55, translate: `${dx * 0.35}px ${dy * 0.35 - 48}px`, scale: "1.12 1.12", rotate: "0deg", opacity: 1, easing: "cubic-bezier(.3,0,.25,1)" }, Object.assign({ opacity: 1 }, end)];
    dur = FT.draw;
  } else if (kind === "under") {
    // v1.7 밀려나는 카드: 옮기는 카드의 뒤로 넘어간다. 가운데에서 작아지고 어두워져 아래로 가라앉았다가 제자리에서 떠오른다
    kf = [Object.assign({ filter: "brightness(1)" }, start),
      { offset: 0.5, translate: `${dx * 0.5}px ${dy * 0.5 + to.height * 0.05}px`, scale: `${(sx + 1) * 0.43} ${(sy + 1) * 0.43}`, rotate: `${rotDeg * 0.5}deg`, filter: "brightness(.6)" },
      Object.assign({ filter: "brightness(1)" }, end)];
    dur = FT.swap; ease = "cubic-bezier(.45,.05,.3,1)";
  } else {
    // 자리 옮기기: 처음에 바로 붙어 움직이고 끝에서 아주 살짝 넘쳤다가 멈춘다
    kf = [start, end]; dur = FT.move; ease = "cubic-bezier(.25,.85,.3,1.06)";
  }
  el.classList.add("flying");
  if (kind === "under") el.classList.add("under");
  if (kind === "lift") el.classList.add("lift");
  const an = el.animate(kf, { duration: dur * k, delay: (delay || 0) * k, easing: ease, fill: "backwards" });
  an.onfinish = () => {
    el.classList.remove("flying", "under", "lift");
    if (kind === "slam") el.querySelectorAll(".coin").forEach(x => x.classList.add("flip"));
  };
  an.oncancel = () => el.classList.remove("flying", "under", "lift");
}
/* v1.7 빨려 드는 고리: 칸 둘레에서 카드 크기로 조여들고, 닿는 순간 안쪽이 한 번 환해진다 */
function suckRing(el, delay, dur) {
  const layer = fxLayer(); if (!layer || !el.isConnected) return;
  const host = el.closest(".slot") || el;
  const r = host.getBoundingClientRect();
  const ring = document.createElement("div");
  ring.className = "suck-ring";
  Object.assign(ring.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
  layer.appendChild(ring);
  ring.animate([
    { opacity: 0, scale: "1.45" },
    { offset: 0.35, opacity: 0.85, scale: "1.22" },
    { offset: 1, opacity: 1, scale: "1" }
  ], { duration: dur, delay, easing: "cubic-bezier(.5,0,.8,.5)", fill: "both" }).onfinish = () => {
    ring.classList.add("hit");
    ring.animate([{ opacity: 1, scale: "1" }, { opacity: 0, scale: "1.06" }], { duration: 300, easing: "ease-out", fill: "forwards" }).onfinish = () => ring.remove();
  };
}
function flipAll(before) {
  const after = new Map();
  boardEl.querySelectorAll("[data-uid]").forEach(el => after.set(el.dataset.uid, el));
  let drawN = 0;
  const mine = [];
  for (const [uid, el] of after) {
    let b = before.get(uid);
    if (FX.from[uid]) b = Object.assign({}, b || {}, { r: FX.from[uid], rot: 0, fromGhost: true });
    const nr = el.getBoundingClientRect();
    const newRot = +el.dataset.rot || 0;
    if (!b) {
      if (el.dataset.zone === "hand") {
        const deck = $("#deck" + el.dataset.p);
        // v1.9: 내 핸드로 오는 카드는 drawFly (덱에서 뒷면으로 튀어 올라 날아오며 앞면으로 뒤집힌다)
        if (deck && el.closest(".hand-me")) mine.push(el);
        else if (deck) animFrom(el, deck.getBoundingClientRect(), nr, 0, "draw", drawN++ * FT.drawGap);
      } else if (el.dataset.zone === "field") {
        el.animate([{ opacity: 0, scale: "1.5" }, { opacity: 1, scale: "1" }], { duration: 380 * kSpeed(), easing: "ease-out" });
      }
      continue;
    }
    const moved = b.fromGhost || b.zone !== el.dataset.zone
      || (b.zone === "field" ? b.s !== el.dataset.s : Math.abs(b.r.left - nr.left) + Math.abs(b.r.top - nr.top) > 1);
    if (!moved) { if (b.hc) settleHand(el, b.hc); continue; }
    let kind = el.dataset.zone === "field" && b.zone !== "field" ? "slam" : "move";
    // v1.8: 핸드에서 끌지 않고(더블클릭·버튼·숫자 키) 올린 카드는 위로 떠올랐다가 내려앉는다
    if (kind === "slam" && b.zone === "hand" && !b.fromGhost) kind = "rise";
    const ff = b.zone === "field" && el.dataset.zone === "field";
    if (kind === "move" && ff && FX.lift != null) {
      // 내가 옮긴 카드는 위로(lift), 밀려난 카드는 그 뒤로(under). 끄는 동안 이미 비켜난 카드는 남은 길만 이어 간다
      if (+uid === FX.lift) kind = "lift";
      else if (!(FX.pvUids && FX.pvUids.has(+uid))) kind = "under";
    }
    if (kind === "move" && ff && !(FX.pvUids && FX.pvUids.has(+uid))) sfx("move");
    animFrom(el, b.r, nr, b.rot - newRot, kind, 0);
  }
  FX.lift = null; FX.pvUids = null;
  for (const [uid, b] of before) if (!after.has(uid)) vanish(uid, b);
  if (mine.length) drawHand(mine);
  FX.shuffled = null;
}
/* ---------- v1.9 드로우: 덱 → 핸드 ----------
   셔플이면 먼저 옛 핸드가 덱으로 날아가 섞이고(덱이 흔들리며 촤라락), 그다음 한 장씩 덱에서 튀어 올라
   뒷면으로 날아오다 반쯤 와서 앞면으로 뒤집히며 제자리에 착 앉는다.
   다 뽑힐 때까지 핸드는 마우스에 반응하지 않고(뽑기가 끝나고 0.5초 뒤부터), 턴 시간은 1초 뒤부터 다시 흐른다 */
const DRAW_T = { fly: 640, gap: 150, shuffleWait: 620, handAfter: 500, clockAfter: 1000 };
function drawHand(els) {
  const k = kAct();
  const p = +els[0].dataset.p, deck = $("#deck" + p);
  if (!deck) return;
  const shuffled = FX.shuffled === p;
  const base = shuffled ? DRAW_T.shuffleWait : 0;
  if (shuffled) setTimeout(() => shuffleDeckFx(deck), (DRAW_T.shuffleWait - 300) * k);
  // 왼쪽 카드부터
  els.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
  els.forEach((el, i) => drawFly(el, deck, (base + i * DRAW_T.gap) * k, DRAW_T.fly * k));
  const end = performance.now() + (base + (els.length - 1) * DRAW_T.gap + DRAW_T.fly) * k;
  holdHand(end);
}
function holdHand(end) {
  FX.handHold = Math.max(FX.handHold, end + DRAW_T.handAfter);
  FX.clockHold = Math.max(FX.clockHold, end + DRAW_T.clockAfter);
  if (boardEl) boardEl.classList.add("hand-locked");
  clearTimeout(FX.handT);
  FX.handT = setTimeout(() => { if (boardEl) boardEl.classList.remove("hand-locked"); }, Math.max(0, FX.handHold - performance.now()));
  clockTick();
}
const handLocked = () => performance.now() < FX.handHold;
function shuffleDeckFx(deck) {
  if (!deck.isConnected) return;
  sfx("shuffle");
  const st = deck.querySelector(".deck-stack") || deck;
  st.animate([{ translate: "0 0", rotate: "0deg" }, { translate: "-5px -2px", rotate: "-3deg", offset: 0.2 }, { translate: "5px -3px", rotate: "3deg", offset: 0.45 },
    { translate: "-3px -1px", rotate: "-2deg", offset: 0.7 }, { translate: "0 0", rotate: "0deg" }], { duration: 300 * kAct(), easing: "ease-in-out" });
  const r = deck.getBoundingClientRect(), c = ctrOf(r);
  burst(c.x, c.y, "crys", r.width * 1.2);
}
function drawFly(el, deck, delay, dur) {
  const uid = +el.dataset.uid, card = el.querySelector(".card"), layer = fxLayer();
  if (!card || !layer || !deck.isConnected) return;
  FX.drawing.add(uid); el.classList.add("drawing");
  const w = el.offsetWidth, h = el.offsetHeight;
  const tr = card.getBoundingClientRect(), dr = deck.getBoundingClientRect();
  const to = ctrOf(tr), from = ctrOf(dr);
  const rot = +el.dataset.rot || 0;
  const g = document.createElement("div");
  g.className = "draw-fly";
  Object.assign(g.style, { left: (to.x - w / 2) + "px", top: (to.y - h / 2) + "px", width: w + "px", height: h + "px" });
  const face = card.outerHTML.replace(/\s(data-uid)="[^"]*"/g, "");
  g.innerHTML = `<div class="df-trail"></div><div class="df-in"><div class="df-face">${face}</div><div class="df-back"><div class="card-back"><span>◈</span></div></div></div>`;
  const fc = g.querySelector(".df-face > .card"); if (fc) fc.style.setProperty("--cw", w + "px");
  g.style.visibility = "hidden";
  layer.appendChild(g);
  const dx = from.x - to.x, dy = from.y - to.y, s0 = Math.min(1, dr.width / w);
  const lift = Math.max(90, h * 0.75), side = (Math.random() * 16 - 8);
  const an = g.animate([
    { translate: `${dx}px ${dy}px`, scale: String(s0), rotate: "0deg", opacity: 0.6, easing: "cubic-bezier(.2,.75,.4,1)" },
    { offset: 0.14, translate: `${dx * 0.96}px ${dy - h * 0.35}px`, scale: String(s0 * 1.15), rotate: `${side * 0.5}deg`, opacity: 1, easing: "cubic-bezier(.35,0,.25,1)" },
    { offset: 0.55, translate: `${dx * 0.38}px ${Math.min(dy * 0.38, 0) - lift}px`, scale: "1.32", rotate: `${-side - 6}deg`, opacity: 1, easing: "cubic-bezier(.4,0,.6,1)" },
    { offset: 0.86, translate: `0px ${h * 0.03}px`, scale: "1.03", rotate: `${rot}deg`, opacity: 1, easing: "cubic-bezier(.2,.7,.3,1)" },
    { translate: "0px 0px", scale: "1", rotate: `${rot}deg`, opacity: 1 }
  ], { duration: dur, delay, fill: "both" });
  const inner = g.querySelector(".df-in");
  inner.animate([{ transform: "rotateY(180deg)" }, { offset: 0.3, transform: "rotateY(180deg)" }, { offset: 0.62, transform: "rotateY(0deg)" }, { transform: "rotateY(0deg)" }],
    { duration: dur, delay, fill: "both", easing: "ease-in-out" });
  const trail = g.querySelector(".df-trail");
  trail.animate([{ opacity: 0 }, { offset: 0.2, opacity: 1 }, { offset: 0.8, opacity: 0.7 }, { opacity: 0 }], { duration: dur, delay, fill: "both" });
  setTimeout(() => { g.style.visibility = ""; sfx("draw"); }, delay);
  const done = () => {
    g.remove(); FX.drawing.delete(uid);
    const cur = uidEl(uid); if (!cur) return;
    cur.classList.remove("drawing");
    sfx("select", 0.5);
    const hc = cur.querySelector(".hand-card");
    if (hc && !RM()) hc.animate([{ scale: "1.06", filter: "brightness(1.5)" }, { scale: "1", filter: "brightness(1)" }], { duration: 260, easing: "ease-out" });
  };
  an.onfinish = done; an.oncancel = done;
}
/* ---------- v1.9 턴 시간 (모래시계) ----------
   지금은 시간이 다 되어도 아무 일도 없다. 내 준비 단계에서만 흐르고, 드로우가 끝나고 1초 뒤부터 흐른다 */
const CLOCK_PERIOD = 8;   // 모래시계 한 번 뒤집히는 데 걸리는 초
function clockRunning() {
  if (!G || G.cfg.headless || G.phase === "over") return false;
  if (G.phase !== "atkPrep" && G.phase !== "defPrep") return false;
  if (G.control == null || G.control !== G.viewer || G.handoff) return false;
  return performance.now() >= FX.clockHold;
}
function clockState() {
  if (!G) return null;
  const key = G.turn + ":" + G.phase + ":" + G.control;
  const now = performance.now();
  if (!G.clock || G.clock.key !== key) G.clock = { key, ms: 0, last: now };
  if (clockRunning()) G.clock.ms += Math.min(500, now - G.clock.last);
  G.clock.last = now;
  return G.clock;
}
const clockText = ms => { const t = Math.floor(ms / 1000); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };
const HOURGLASS_SVG = `<svg class="tc-glass" viewBox="0 0 26 36" aria-hidden="true"><g class="tc-flip">
  <path d="M5.5 4c0 7.5 6 10.5 6 14s-6 6.5-6 14h15c0-7.5-6-10.5-6-14s6-6.5 6-14z" fill="rgba(143,220,255,.1)" stroke="#f6e2a8" stroke-width="1.3" stroke-linejoin="round"/>
  <path class="tc-top" d="M7.2 8.5h11.6c-.8 4.2-4.6 6.4-5.3 8.5h-1c-.7-2.1-4.5-4.3-5.3-8.5z" fill="#f0c766"/>
  <path class="tc-bot" d="M6.6 31c.9-4.3 4.4-6.6 6.4-6.6s5.5 2.3 6.4 6.6z" fill="#f0c766"/>
  <line class="tc-stream" x1="13" y1="17.5" x2="13" y2="30.5" stroke="#f0c766" stroke-width=".9" stroke-dasharray="1.6 1.4"/>
  <rect x="2" y="1.5" width="22" height="3" rx="1.2" fill="#d9b46a"/><rect x="2" y="31.5" width="22" height="3" rx="1.2" fill="#d9b46a"/>
</g></svg>`;
function clockHTML() {
  const c = clockState(); if (!c) return "";
  const run = clockRunning();
  return `<div class="turn-clock${run ? "" : " paused"}" data-tip="${esc("이번 준비 단계에 흐른 시간\n카드를 뽑는 동안은 멈춥니다.\n(아직 시간이 다 되어도 턴이 끝나지 않습니다)")}" style="--tc-period:${CLOCK_PERIOD}s;--tc-delay:${(-(c.ms / 1000) % CLOCK_PERIOD).toFixed(2)}s">${HOURGLASS_SVG}<b class="tc-num">${clockText(c.ms)}</b><span class="tc-state">멈춤</span></div>`;
}
function clockTick() {
  if (!G || !boardEl || G.cfg.headless) return;
  const c = clockState(), el = boardEl.querySelector(".turn-clock"); if (!c || !el) return;
  const run = clockRunning();
  const num = el.querySelector(".tc-num"), txt = clockText(c.ms);
  if (num.textContent !== txt) num.textContent = txt;
  if (el.classList.contains("paused") === run) {
    el.classList.toggle("paused", !run);
    el.style.setProperty("--tc-delay", (-(c.ms / 1000) % CLOCK_PERIOD).toFixed(2) + "s");
  }
}
setInterval(clockTick, 100);
/* 핸드 카드를 고르거나 풀 때: 카드 몸통(.hand-card)이 예전 모습에서 새 모습으로 탄력 있게 옮겨 간다.
   화면을 통째로 다시 그려도 '딱' 끊기지 않게 한다. 기준점은 카드 아래 가운데(transform-origin) */
function settleHand(el, old) {
  const hc = el.querySelector(".hand-card"); if (!hc) return;
  const nr = hc.getBoundingClientRect();
  const dx = (old.left + old.width / 2) - (nr.left + nr.width / 2), dy = old.bottom - nr.bottom, sc = old.width / nr.width;
  if (Math.abs(dx) + Math.abs(dy) < 2 && Math.abs(sc - 1) < 0.02) return;
  hc.animate([{ translate: `${dx}px ${dy}px`, scale: String(sc) }, { translate: "0px 0px", scale: "1" }],
    { duration: FT.select * kSpeedUI(), easing: "cubic-bezier(.25,.9,.3,1.12)" });
}
/* 내 손이 한 일(고르기·집기·놓기)은 배속에 크게 끌려가지 않는다. 느린 배속에서도 손맛은 그대로, 빠른 배속에서만 조금 짧게 */
const kSpeedUI = () => Math.min(1, kSpeed());
function ghostAt(r, html) {
  const g = document.createElement("div");
  g.className = "fly-ghost";
  Object.assign(g.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
  g.innerHTML = html;
  const c = g.firstElementChild;
  if (c) {
    ["acting", "targeted", "countering", "revealing", "selected", "flying", "drag-src", "fresh", "char-out", "struck"].forEach(x => c.classList.remove(x));
    c.removeAttribute("data-uid"); c.style.setProperty("--cw", r.width + "px");
  }
  fxLayer().appendChild(g);
  return g;
}
/* 사라진 카드: 소각장·에테르·장착한 유닛으로 날아간다 */
function vanish(uid, b) {
  const layer = fxLayer(); if (!layer) return;
  if (G.fx && G.fx.shatter && G.fx.shatter.includes(+uid)) { shatterCard(b); return; }
  const dest = (G.leave && G.leave[uid]) || "burn" + b.p;
  const target = dest.startsWith("uid:") ? uidEl(dest.slice(4)) : $("#" + dest);
  const from = FX.from[uid] || b.r;
  const g = ghostAt(from, b.html);
  const k = kAct();
  if (!target) { g.animate([{ opacity: 1 }, { opacity: 0, scale: "0.6" }], { duration: 400 * k, fill: "forwards" }).onfinish = () => g.remove(); return; }
  const tr = target.getBoundingClientRect();
  const kind = dest.startsWith("crys") ? "crys" : dest.startsWith("uid:") ? "equip" : dest.startsWith("deck") ? "deck" : "burn";
  const a = ctrOf(from), t = ctrOf(tr);
  const dx = t.x - a.x, dy = t.y - a.y;
  const sc = kind === "burn" ? Math.max(0.55, tr.width / from.width * 0.9) : 0.32;
  const filt = kind === "burn" ? "sepia(1) saturate(5) hue-rotate(-28deg) brightness(1.15)" : kind === "crys" ? "brightness(1.9) saturate(.3) hue-rotate(170deg)" : kind === "deck" ? "brightness(.7)" : "brightness(2) saturate(.6)";
  const spin = (Math.random() * 30 - 15).toFixed(1);
  const an = g.animate([
    { translate: "0px 0px", scale: "1", rotate: "0deg", opacity: 1, filter: "none" },
    { offset: 0.22, translate: `0px ${-from.height * 0.12}px`, scale: "1.1", rotate: "0deg", opacity: 1, filter: "brightness(1.3)" },
    { translate: `${dx}px ${dy}px`, scale: String(sc), rotate: `${spin}deg`, opacity: kind === "burn" ? 0.85 : 0.1, filter: filt }
  ], { duration: FT.away * k, easing: "cubic-bezier(.4,0,.25,1)", fill: "forwards" });
  an.onfinish = () => {
    sfx(kind === "crys" ? "crystal" : kind === "equip" ? "equip" : kind === "burn" ? "burn" : "move", 0.9);
    if (kind === "burn") g.animate([{ opacity: 0.85, filter: filt }, { opacity: 0, filter: "brightness(3) blur(6px)" }], { duration: 260 * k, fill: "forwards" }).onfinish = () => g.remove();
    else g.remove();
    burst(t.x, t.y, kind, tr.width * (kind === "burn" ? 1.6 : 1.3));
  };
}

/* ---------- 효과 조각 ---------- */
function burst(x, y, kind, size) {
  const layer = fxLayer(); if (!layer || RM()) return;
  const b = document.createElement("div");
  b.className = "burst b-" + kind;
  b.style.left = x + "px"; b.style.top = y + "px"; b.style.setProperty("--s", Math.max(60, size) + "px");
  const n = kind === "hit" ? 14 : kind === "spell" ? 18 : 10;
  let sp = "";
  for (let i = 0; i < n; i++) sp += `<i style="--a:${(360 / n) * i + Math.random() * 18}deg;--d:${(0.35 + Math.random() * 0.3) * Math.max(60, size)}px"></i>`;
  b.innerHTML = sp;
  layer.appendChild(b);
  setTimeout(() => b.remove(), 1000);
}
function slash(x, y, size, color) {
  const layer = fxLayer(); if (!layer || RM()) return;
  const s = document.createElement("div");
  s.className = "slash";
  s.style.left = x + "px"; s.style.top = y + "px";
  s.style.setProperty("--s", size + "px"); s.style.setProperty("--c", color || "#ff6a4d");
  s.style.setProperty("--rot", (Math.random() * 60 - 30).toFixed(0) + "deg");
  s.innerHTML = '<svg viewBox="0 0 100 100"><path d="M8 78 L88 12"/><path d="M18 92 L96 30"/><path d="M4 58 L72 4"/></svg>';
  layer.appendChild(s);
  setTimeout(() => s.remove(), 800);
}
function shakeScreen(px) {
  const g = $("#game"); if (!g || RM() || !px) return;
  g.animate([{ translate: "0 0" }, { translate: `${-px}px ${px * 0.5}px` }, { translate: `${px * 0.8}px ${-px * 0.6}px` }, { translate: `${-px * 0.5}px ${px * 0.3}px` }, { translate: `${px * 0.3}px 0px` }, { translate: "0 0" }], { duration: 320, easing: "ease-out" });
}
function shakeEl(el, px) {
  if (!el) return;
  el.animate([{ translate: "0 0" }, { translate: `${-px}px ${px * 0.3}px` }, { translate: `${px}px ${-px * 0.2}px` }, { translate: `${-px * 0.6}px 0px` }, { translate: `${px * 0.4}px 0px` }, { translate: "0 0" }], { duration: 400, easing: "ease-out" });
  el.classList.add("struck");
}
/* 잔상: 움직이는 캐릭터 뒤로 흐릿한 그림자를 남긴다 */
function trail(sp, ms) {
  const layer = fxLayer(); if (!layer) return;
  const t0 = performance.now();
  const id = setInterval(() => {
    if (!sp.isConnected || performance.now() - t0 > ms) { clearInterval(id); return; }
    const r = sp.getBoundingClientRect();
    const g = document.createElement("div");
    g.className = "sprite-trail";
    g.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;--el:${sp.style.getPropertyValue("--el")}`;
    g.innerHTML = sp.innerHTML;
    layer.appendChild(g);
    setTimeout(() => g.remove(), 320);
  }, 42);
}

/* ---------- 전투 연출: 카드 속 캐릭터가 뛰쳐나가 상대를 친다 ---------- */
function targetEl(t) { return typeof t === "number" ? uidEl(t) : $("#" + t); }
function elColor(el) { return (el && el.style.getPropertyValue("--el")) || "#ffd27a"; }
function makeSprite(cardEl) {
  const art = cardEl && cardEl.querySelector(".c-art > svg");
  if (!art) return null;
  const ar = art.getBoundingClientRect();
  const sp = document.createElement("div");
  sp.className = "sprite";
  sp.style.cssText = `left:${ar.left}px;top:${ar.top}px;width:${ar.width}px;height:${ar.height}px`;
  sp.style.setProperty("--el", elColor(cardEl));
  sp.innerHTML = art.outerHTML;
  fxLayer().appendChild(sp);
  return { el: sp, r: ar };
}
function setCharOut(uid, on) {
  if (on) FX.charOut.add(uid); else FX.charOut.delete(uid);
  const el = uidEl(uid); if (el) el.classList.toggle("char-out", on);
}
function clearSprite() {
  if (FX.sprite) { FX.sprite.el.remove(); setCharOut(FX.sprite.uid, false); FX.sprite = null; }
}
function strikeOut(actUid, tgt, dur) {
  clearSprite();
  const a = uidEl(actUid), t = targetEl(tgt);
  if (!a || !t) return;
  const s = makeSprite(a); if (!s) return;
  setCharOut(actUid, true);
  a.animate([{ scale: "1" }, { scale: "1.06" }, { scale: "1" }], { duration: dur, easing: "ease-out" });
  const tr = t.getBoundingClientRect(), from = ctrOf(s.r), to = ctrOf(tr);
  const stop = 0.86, dx = (to.x - from.x) * stop, dy = (to.y - from.y) * stop;
  const dir = dx >= 0 ? 1 : -1;
  const an = s.el.animate([
    { translate: "0px 0px", scale: "1", rotate: "0deg" },
    { offset: 0.28, translate: `${-dx * 0.06}px ${-dy * 0.06 - 26}px`, scale: "1.4", rotate: `${-14 * dir}deg` },
    { offset: 0.7, translate: `${dx * 0.62}px ${dy * 0.62 - Math.min(90, Math.abs(dx) * 0.25 + 30)}px`, scale: "1.85", rotate: `${8 * dir}deg` },
    { translate: `${dx}px ${dy}px`, scale: "2", rotate: `${22 * dir}deg` }
  ], { duration: dur * 0.95, easing: "cubic-bezier(.45,0,.6,1)", fill: "forwards" });
  trail(s.el, dur);
  setTimeout(() => sfx("swing", 0.8), dur * 0.3);
  FX.sprite = { el: s.el, uid: actUid, dx, dy, dir, an };
}
/* v1.6.2 [투척]: 공격하러 나가는 순간 같은 유닛에서 던진 것이 날아간다. 맞선 유닛과 같으면 그 유닛에게 */
function throwShot(actUid, tgt, dur) {
  const a = uidEl(actUid), t = uidEl(tgt), layer = fxLayer();
  if (!a || !t || !layer) return;
  const from = ctrOf(a.getBoundingClientRect()), to = ctrOf(t.getBoundingClientRect());
  const b = document.createElement("div");
  b.className = "throw-shot";
  b.style.left = from.x + "px"; b.style.top = from.y + "px";
  layer.appendChild(b);
  const dx = to.x - from.x, dy = to.y - from.y, arc = -Math.min(120, Math.abs(dx) * 0.3 + 40);
  b.animate([
    { translate: "0px 0px", rotate: "0deg", scale: "0.6" },
    { offset: 0.5, translate: `${dx * 0.5}px ${dy * 0.5 + arc}px`, rotate: "360deg", scale: "1.2" },
    { translate: `${dx}px ${dy}px`, rotate: "720deg", scale: "1" }
  ], { duration: dur * 0.9, easing: "cubic-bezier(.4,0,.7,1)", fill: "forwards" });
  setTimeout(() => b.remove(), dur * 0.9 + 60);
}
function throwHit(tgt) {
  const t = uidEl(tgt); if (!t) return;
  const r = t.getBoundingClientRect(), c = ctrOf(r);
  burst(c.x, c.y, "hit", Math.max(100, r.width * 1.6));
  shakeEl(t, 8);
}
function strikeHit(actUid, tgt, dur) {
  const t = targetEl(tgt);
  let s = FX.sprite;
  if (!s || s.uid !== actUid) { strikeOut(actUid, tgt, 1); s = FX.sprite; if (s) s.an.finish(); }
  if (!t) { clearSprite(); return; }
  const tr = t.getBoundingClientRect(), c = ctrOf(tr);
  const col = s ? s.el.style.getPropertyValue("--el") : "#ff6a4d";
  const isLife = typeof tgt !== "number";
  slash(c.x, c.y, Math.max(140, tr.width * 1.5), col);
  burst(c.x, c.y, "hit", Math.max(120, tr.width * 2));
  shakeEl(isLife ? $("#pinfo" + String(tgt).replace("life", "")) : t, isLife ? 14 : 10);
  shakeScreen(isLife ? 14 : 6);
  sfx(isLife ? "hitBig" : "hit");
  if (!s) return;
  s.an.cancel();
  // 맞는 순간 아주 잠깐 멈칫(히트 스톱): 캐릭터를 맞은 자리에 붙잡아 두었다가 튕겨 나간다
  s.el.style.translate = `${s.dx}px ${s.dy}px`; s.el.style.scale = "2.15"; s.el.style.rotate = `${22 * s.dir}deg`;
  const a = uidEl(actUid), art = a && a.querySelector(".c-art > svg");
  const base = { left: parseFloat(s.el.style.left), top: parseFloat(s.el.style.top) };
  const back = art ? (() => { const r = art.getBoundingClientRect(); return [r.left - base.left, r.top - base.top]; })() : [0, 0];
  const ret = s.el.animate([
    { translate: `${s.dx}px ${s.dy}px`, scale: "2", rotate: `${22 * s.dir}deg` },
    { offset: 0.16, translate: `${s.dx + 14 * s.dir}px ${s.dy + 16}px`, scale: "2.35", rotate: `${-34 * s.dir}deg` },
    { offset: 0.34, translate: `${s.dx * 0.94}px ${s.dy * 0.94}px`, scale: "1.8", rotate: "0deg" },
    { offset: 0.7, translate: `${(s.dx + back[0]) * 0.4}px ${(s.dy + back[1]) * 0.4 - 50}px`, scale: "1.35", rotate: `${-10 * s.dir}deg` },
    { translate: `${back[0]}px ${back[1]}px`, scale: "1", rotate: "0deg", opacity: 0.9 }
  ], { duration: Math.max(dur * 1.05, 380 * kSpeed()), delay: FT.hitStop * kSpeed(), easing: "cubic-bezier(.3,.6,.3,1)", fill: "forwards" });
  setTimeout(() => trail(s.el, dur), FT.hitStop * kSpeed());
  const mine = s; FX.sprite = null;
  ret.onfinish = () => { mine.el.remove(); setCharOut(mine.uid, false); };
}
function counterStrike(defUid, atkUid, dur) {
  const d = uidEl(defUid), a = uidEl(atkUid);
  if (!d || !a) return;
  const s = makeSprite(d); if (!s) return;
  setCharOut(defUid, true);
  const ar = a.getBoundingClientRect(), from = ctrOf(s.r), to = ctrOf(ar);
  const dx = (to.x - from.x) * 0.84, dy = (to.y - from.y) * 0.84, dir = dx >= 0 ? 1 : -1;
  const an = s.el.animate([
    { translate: "0px 0px", scale: "1", rotate: "0deg" },
    { offset: 0.38, translate: `${dx}px ${dy}px`, scale: "1.85", rotate: `${20 * dir}deg` },
    { offset: 0.52, translate: `${dx + 10 * dir}px ${dy + 12}px`, scale: "2.15", rotate: `${-30 * dir}deg` },
    { translate: "0px 0px", scale: "1", rotate: "0deg", opacity: 0.9 }
  ], { duration: dur * 1.15, easing: "cubic-bezier(.35,.1,.3,1)", fill: "forwards" });
  trail(s.el, dur);
  setTimeout(() => {
    const a2 = uidEl(atkUid); if (!a2) return;
    const r = a2.getBoundingClientRect(), c = ctrOf(r);
    slash(c.x, c.y, Math.max(120, r.width * 1.3), s.el.style.getPropertyValue("--el"));
    burst(c.x, c.y, "hit", r.width * 1.6);
    shakeEl(a2, 8);
    sfx("hit", 0.85);
  }, dur * 0.45);
  an.onfinish = () => { s.el.remove(); setCharOut(defUid, false); };
}
function revealFx(uid, dur) {
  const el = uidEl(uid); if (!el) return;
  el.classList.add("flying");
  el.animate([
    { rotate: "y 180deg", scale: "1" },
    { offset: 0.3, rotate: "y 0deg", scale: "1.55" },
    { offset: 0.82, rotate: "y 0deg", scale: "1.5" },
    { rotate: "y 0deg", scale: "1" }
  ], { duration: dur, easing: "cubic-bezier(.3,.7,.3,1)" }).onfinish = () => el.classList.remove("flying");
  const r = el.getBoundingClientRect(), c = ctrOf(r);
  setTimeout(() => burst(c.x, c.y, "spell", r.width * 3.2), dur * 0.26);
}
/* 마법 이름 띠: 마법이 뒤집히는 순간 화면 가운데 위에 이름이 떠서, 효과(숫자)가 뜨는 동안 머문다.
   길이 = 뒤집기 + 효과 한 수. 배속을 따른다 */
function spellTitle(uid, ms) {
  const layer = fxLayer(); if (!layer || RM()) return;
  const el = uidEl(uid), nm = el && el.querySelector(".c-name"); if (!nm) return;
  if (FX.spellTitle) FX.spellTitle.remove();
  const t = document.createElement("div");
  t.className = "spell-title";
  t.style.setProperty("--el", elColor(el));
  t.innerHTML = `<small>마법 발동</small><b>${esc(nm.textContent.replace("★", "").trim())}</b>`;
  layer.appendChild(t); FX.spellTitle = t;
  const an = t.animate([
    { opacity: 0, transform: "translate(-50%, -40%) scale(.92)", filter: "blur(6px)" },
    { opacity: 1, transform: "translate(-50%, -50%) scale(1)", filter: "blur(0)", offset: 0.14 },
    { opacity: 1, transform: "translate(-50%, -50%) scale(1)", filter: "blur(0)", offset: 0.84 },
    { opacity: 0, transform: "translate(-50%, -56%) scale(1.02)", filter: "blur(4px)" }
  ], { duration: Math.max(900, ms), easing: "ease-out", fill: "forwards" });
  an.onfinish = () => { t.remove(); if (FX.spellTitle === t) FX.spellTitle = null; };
}
/* 전장을 지배하는 일러스트: 공격·반격·마법 발동 때 그 카드의 그림이 화면 가운데에 크게,
   흐리게 떠올랐다가(페이드 인) 사라진다(페이드 아웃) */
function arenaArt(uid, kind, ms) {
  const layer = fxLayer(); if (!layer || RM()) return;
  const el = uidEl(uid), art = el && el.querySelector(".c-art > svg"); if (!art) return;
  if (FX.arena) { FX.arena.remove(); FX.arena = null; }
  const a = document.createElement("div");
  a.className = "arena-art " + (kind || "");
  a.style.setProperty("--el", elColor(el));
  a.innerHTML = art.outerHTML;
  layer.appendChild(a); FX.arena = a;
  ms = Math.max(700, ms);
  const dir = kind === "counter" ? -1 : 1;
  const an = a.animate([
    { opacity: 0, transform: `translate(-50%, -50%) scale(.6) rotate(${-6 * dir}deg)`, filter: "blur(18px)" },
    { opacity: 0.42, transform: "translate(-50%, -50%) scale(1) rotate(0deg)", filter: "blur(3px)", offset: 0.3 },
    { opacity: 0.36, transform: "translate(-50%, -50%) scale(1.06) rotate(0deg)", filter: "blur(4px)", offset: 0.72 },
    { opacity: 0, transform: `translate(-50%, -50%) scale(1.25) rotate(${4 * dir}deg)`, filter: "blur(22px)" }
  ], { duration: ms, easing: "ease-in-out", fill: "forwards" });
  an.onfinish = () => { a.remove(); if (FX.arena === a) FX.arena = null; };
}
/* v1.5 소환: 카드가 전장 위(소환 영역)에 나타나 칸으로 내려앉는다 */
function conjureFx(uid, dur) {
  const el = uidEl(uid); if (!el) return;
  const r = el.getBoundingClientRect();
  el.classList.add("flying");
  el.animate([
    { translate: `0px ${-r.height * 0.9}px`, scale: "1.12", opacity: 0, filter: "blur(10px) brightness(2)" },
    { offset: 0.38, translate: `0px ${-r.height * 0.75}px`, scale: "1.12", opacity: 1, filter: "blur(0) brightness(1.5)" },
    { offset: 0.8, translate: "0px 0px", scale: "1", opacity: 1, filter: "brightness(1.2)" },
    { translate: "0px 0px", scale: "1", opacity: 1, filter: "none" }
  ], { duration: dur, easing: "cubic-bezier(.4,.1,.3,1)" }).onfinish = () => el.classList.remove("flying");
  const c = ctrOf(r);
  setTimeout(() => burst(c.x, c.y, "spell", r.width * 1.6), dur * 0.8);
  if (el.matches(".card:not(.type-unit)")) spellTitle(uid, dur * 1.9);
}
/* v1.5 소환 실패: 전장에 빈 칸이 없어, 소환 영역에 나타난 카드가 흐려지며 부서진다 */
function fizzleFx(z, dur) {
  const layer = fxLayer(); if (!layer || !CARDS[z.id]) return;
  const row = boardEl && boardEl.querySelector(`.frow[data-p="${z.p}"] .slots`); if (!row) return;
  const slot = row.querySelector(".slot"); if (!slot) return;
  const sr = slot.getBoundingClientRect(), rr = row.getBoundingClientRect();
  const src = z.from != null ? uidEl(z.from) : null;
  const left = src ? src.getBoundingClientRect().left + sr.width * 0.55 : rr.left + rr.width / 2 - sr.width / 2;
  const top = rr.top - sr.height * 0.62;
  const r = { left, top, width: sr.width, height: sr.height };
  const html = cardHTML(CARDS[z.id], { size: "md" });
  const g = ghostAt(r, html);
  g.insertAdjacentHTML("beforeend", `<span class="fz-tag">빈 칸 없음</span>`);
  g.animate([
    { translate: `0px ${-sr.height * 0.25}px`, opacity: 0, filter: "blur(10px) brightness(2)" },
    { offset: 0.3, translate: "0px 0px", opacity: 1, filter: "blur(0) brightness(1.4)" },
    { offset: 0.45, opacity: 1, filter: "blur(0) brightness(1)" },
    { offset: 0.5, opacity: 0.55, filter: "blur(2px) grayscale(.6)" },
    { offset: 0.56, opacity: 0.9, filter: "blur(1px) grayscale(.4)" },
    { offset: 0.72, opacity: 0.45, filter: "blur(5px) grayscale(1) brightness(.8)" },
    { opacity: 0.4, filter: "blur(6px) grayscale(1) brightness(.7)" }
  ], { duration: dur * 0.72, easing: "ease-out", fill: "forwards" });
  setTimeout(() => {
    g.remove();
    const b = { r: new DOMRect(r.left, r.top, r.width, r.height), html: `<div style="filter:blur(3px) grayscale(1) brightness(.75);opacity:.6">${html}</div>` };
    shatterCard(b);
  }, dur * 0.72);
}
function combatFx() {
  const fx = G.fx;
  if (!fx || G.speed === 0 || RM()) return;
  const dur = (fx.dur || 450) * kSpeed();
  if (fx.fizzle) { fizzleFx(fx.fizzle, dur); return; }
  if (fx.conjure) { conjureFx(fx.conjure, dur); return; }
  if (fx.reveal) { arenaArt(fx.reveal, "spell", dur * 1.8); revealFx(fx.reveal, dur); spellTitle(fx.reveal, dur * 1.75); if (typeof SpellFX !== "undefined") SpellFX.reveal(fx.reveal, dur); return; }
  if (fx.counter) { arenaArt(fx.counter, "counter", dur * 1.3); counterStrike(fx.counter, fx.act, dur); return; }
  if (fx.act && fx.tgt != null && !fx.hit) { arenaArt(fx.act, "attack", dur * 2.5); strikeOut(fx.act, fx.tgt, dur); if (fx.thr != null) throwShot(fx.act, fx.thr, dur); }
  else if (fx.act && fx.tgt != null && fx.hit) { strikeHit(fx.act, fx.tgt, dur); if (fx.thr != null && fx.thr !== fx.tgt) throwHit(fx.thr); }
}

/* ---------- 카드 크게 보기 (마우스를 올렸을 때) ---------- */
function onHover(e) {
  if (FX.drag || FX.pd) return;
  // v1.8: 전투 중에는 크게 보기를 띄우지 않는다 (코인 멈추기 등을 누를 때 카드가 가리지 않게)
  // v1.9.3: 아래 아이템 카드를 눌러 띄운 확대 보기는, 마우스를 움직이기 전까지(화면이 다시 그려져도) 그대로 둔다
  if (FX.underPin) { if (Math.hypot(e.clientX - FX.underPin.x, e.clientY - FX.underPin.y) < 6) return; FX.underPin = null; }
  if (G && G.phase === "combat") { hideZoom(); return; }
  handHoverSelect(e);
  const el = e.target.closest("[data-card]");
  // v1.9.3: 능력 띠 위에서는 말풍선이 잘 보이게 큰 카드를 띄우지 않는다
  if (e.target.closest(".c-eq-ab")) { hideZoom(); return; }
  if (!el || el.closest(".hand-me") || el.closest("[data-focus]")) {
    // v1.9: 핸드 카드를 눌러 골라 두었으면 그 카드의 확대 보기로 돌아간다 (내 전장 칸 위에서는 칸이 보이게 감춘다)
    if (FX.pin && !e.target.closest(".slots")) showPin(); else hideZoom();
    return;
  }
  if (FX.zoomEl === el) return;
  FX.zoomEl = el; clearTimeout(FX.zoomT);
  FX.zoomT = setTimeout(() => showZoom(el), 260);
}
/* v1.4.1: 핸드 카드를 눌러 고른 채로 마우스를 옆 카드로 옮기면 그 카드가 골라진다.
   예전 카드는 핸드로 내려가고 새 카드가 올라온다(settleHand 연출). 지나가기만 할 때 바뀌지 않게 아주 잠깐(110ms) 머물러야 한다 */
function handHoverSelect(e) {
  const hs = e.target.closest(".hand-me .hand-slot");
  clearTimeout(FX.hoverSelT);
  if (!hs || !G || !G.sel || G.sel.kind !== "hand") return;
  const me = G.players[G.viewer];
  if (G.control !== me.idx || G.handoff) return;
  const uid = +hs.dataset.uid;
  if (uid === G.sel.uid || !me.hand.some(x => x.uid === uid)) return;
  FX.hoverSelT = setTimeout(() => {
    if (!G || FX.drag || FX.pd || !G.sel || G.sel.kind !== "hand" || G.sel.uid === uid) return;
    if (!hs.isConnected || !hs.matches(":hover")) return;
    G.sel = { kind: "hand", uid }; G.inspect = null;
    sfx("select"); render();
  }, 110);
}
function showZoom(el, force) {
  const z = $("#zoom");
  if (!z || !el.isConnected || FX.drag || (G && G.phase === "combat" && !force)) return;
  // v1.9.3: 아래에 깔린 아이템 카드는 아이템 카드 그대로 (유닛의 상태는 붙이지 않는다)
  z.innerHTML = cardDetailHTML(CARDS[el.dataset.card], el.closest(".c-under") ? null : instOfEl(el));
  z.hidden = false; z.classList.toggle("pinned", !!force);
  // v1.8: 화면 가운데에 띄운다 (가리킨 카드 바로 옆에 띄우면 이웃 카드를 가린다)
  const zr = z.getBoundingClientRect();
  const left = Math.max(8, (innerWidth - zr.width) / 2);
  const top = Math.max(8, Math.min(innerHeight - zr.height - 8, (innerHeight - zr.height) / 2));
  z.style.left = left + "px"; z.style.top = top + "px";
}
function hideZoom() { clearTimeout(FX.zoomT); FX.zoomEl = null; const z = $("#zoom"); if (z) { z.hidden = true; z.classList.remove("pinned"); } }
/* v1.9: 핸드 카드를 누르면(고르면) 상대 카드를 볼 때처럼 화면 가운데에 크게 보인다. 설명 전체가 보이는 원본 카드 */
function syncPin() {
  const me = G && G.players[G.viewer];
  const it = me && G.control === me.idx && !G.handoff && G.sel && G.sel.kind === "hand" && !FX.drag && G.phase !== "combat" ? me.hand.find(x => x.uid === G.sel.uid) : null;
  const was = FX.pin;
  FX.pin = it ? it.uid : null;
  if (FX.pin) { if (was !== FX.pin || !FX.zoomEl) showPin(); }
  else if (was) hideZoom();
}
function showPin() {
  const z = $("#zoom"); if (!z || !G || FX.pin == null) return;
  const me = G.players[G.viewer], it = me.hand.find(x => x.uid === FX.pin);
  if (!it) { FX.pin = null; hideZoom(); return; }
  if (FX.zoomEl === "pin" && !z.hidden && z.dataset.pin === String(FX.pin)) return;
  clearTimeout(FX.zoomT); FX.zoomEl = "pin"; z.dataset.pin = FX.pin;
  z.innerHTML = cardDetailHTML(C(it), null);
  z.hidden = false; z.classList.add("pinned");
  const zr = z.getBoundingClientRect();
  z.style.left = Math.max(8, (innerWidth - zr.width) / 2) + "px";
  z.style.top = Math.max(8, Math.min(innerHeight - zr.height - 8, (innerHeight - zr.height) / 2)) + "px";
}

/* ---------- 끌어서 놓기 ---------- */
function onPointerDown(e) {
  if (e.button !== 0 || !G || FX.drag) return;
  const me = G.players[G.viewer];
  if (G.control !== me.idx || G.handoff) return;
  const hs = e.target.closest(".hand-me .hand-slot");
  const fc = !hs && !e.target.closest(".c-under") && e.target.closest('.frow-bot [data-zone="field"]');
  if (!hs && !fc) return;
  FX.pd = { x: e.clientX, y: e.clientY, src: hs ? { kind: "hand", uid: +hs.dataset.uid } : { kind: "field", uid: +fc.dataset.uid, slot: +fc.dataset.s } };
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}
/* 끌기: 카드는 손가락을 '살짝 늦게' 따라오며(쫀쫀함), 놓을 수 있는 자리에 닿으면 그쪽으로 끌려 들어가고(자석),
   들려 있을 때는 조금 커졌다가 자리에 닿으면 판에 붙듯 낮아진다. 움직이는 방향으로 기울어진다 */
function onPointerMove(e) {
  const pd = FX.pd; if (!pd) return;
  if (!FX.drag) {
    if (Math.hypot(e.clientX - pd.x, e.clientY - pd.y) < 6) return;
    if (!startDrag(pd, e)) return;
  }
  const d = FX.drag;
  d.px = e.clientX; d.py = e.clientY;
  const under = document.elementFromPoint(d.px, d.py);
  const z = under && under.closest('[data-act="slot"],[data-act="ether"],[data-act="burn"]');
  const ok = z && +z.dataset.p === G.viewer && z.matches(".valid,.valid-move,.valid-equip") ? z : null;
  if (ok !== d.over) {
    if (d.over) d.over.classList.remove("drop-hover");
    if (ok) { ok.classList.add("drop-hover"); sfx("hover"); }
    d.over = ok; d.overR = ok ? ok.getBoundingClientRect() : null;
    d.ghost.classList.toggle("over", !!ok);
    if (d.kind === "field") swapPreview(d, ok);
  }
  if (d.kind === "hand" && !ok) handReorder(d);
}
/* v1.9 전장 자리 옮기기 미리 보기: 끄는 카드가 다른 카드 칸에 닿으면, 놓았을 때처럼 사이의 카드들이 한 칸씩
   끄는 카드의 뒤로 비켜난다(작아지고 어두워지며 가라앉았다 떠오름). 다른 칸으로 옮기면 지금 자리에서 새 자리로 이어서 움직이고,
   칸을 벗어나면 제자리로 돌아온다 */
function swapPreview(d, ok) {
  const me = G.players[G.viewer];
  const s = ok && ok.dataset.act === "slot" ? +ok.dataset.s : -1;
  const key = s >= 0 && s !== d.slot && me.field[s] ? s : -1;
  if (d.pv && d.pv.key === key) return;
  boardEl.querySelectorAll(".swap-hover").forEach(x => x.classList.remove("swap-hover"));
  const prev = d.pv ? d.pv.els : new Map();
  // 새 자리: 놓았을 때와 같은 규칙(moveField)
  const want = new Map();
  if (key >= 0 && !RM()) {
    ok.classList.add("swap-hover");
    const nf = moveField(me.field, d.slot, key);
    nf.forEach((it, i) => { if (it && it.uid !== d.uid && me.field[i] !== it) want.set(it.uid, i); });
  }
  const slotEl = i => boardEl.querySelector(`.frow-bot .slot[data-s="${i}"]`);
  const uids = new Set([...prev.keys(), ...want.keys()]);
  const els = new Map();
  for (const uid of uids) {
    const el = uidEl(uid); if (!el) continue;
    const old = prev.get(uid);
    // 지금 보이는 자리(움직이는 중이면 그 중간)에서 이어 간다
    const cur = old ? getComputedStyle(el).translate : "none";
    let cx = 0, cy = 0;
    if (cur && cur !== "none") { const m = cur.split(" "); cx = parseFloat(m[0]) || 0; cy = parseFloat(m[1]) || 0; }
    if (old) old.cancel();
    const homeI = me.field.findIndex(x => x && x.uid === uid);
    const to = want.has(uid) ? want.get(uid) : homeI;
    const a = ctrOf(slotEl(homeI).getBoundingClientRect()), b = ctrOf(slotEl(to).getBoundingClientRect());
    const tx = b.x - a.x, ty = b.y - a.y, h = el.getBoundingClientRect().height;
    if (!want.has(uid) && Math.abs(cx) + Math.abs(cy) < 1) { el.classList.remove("under"); continue; }
    el.classList.add("under");
    const an = el.animate([
      { translate: `${cx}px ${cy}px`, scale: "1", filter: "brightness(1)" },
      { offset: 0.5, translate: `${(cx + tx) / 2}px ${(cy + ty) / 2 + h * 0.05}px`, scale: "0.86", filter: "brightness(.6)" },
      { translate: `${tx}px ${ty}px`, scale: "1", filter: "brightness(1)" }
    ], { duration: FT.swap * kSpeedUI(), easing: "cubic-bezier(.45,.05,.3,1)", fill: "forwards" });
    if (want.has(uid)) els.set(uid, an);
    else an.onfinish = () => { an.cancel(); el.classList.remove("under"); };
  }
  if (want.size) sfx("move");
  d.pv = key >= 0 || els.size ? { key, els } : null;
}
/* v1.7 핸드 순서 바꾸기: 핸드 줄 안에서 좌우로 끌면 가장 가까운 자리로 끼어들고, 다른 카드는 비켜난다.
   자리 기준은 카드의 레이아웃 위치(offsetLeft)라 움직이는 중에도 흔들리지 않는다 */
function handReorder(d) {
  const me = G.players[G.viewer];
  const hand = boardEl.querySelector(".hand-me"); if (!hand) return;
  const hr = hand.getBoundingClientRect();
  if (d.py < hr.top - 40 || d.py > hr.bottom + 60 || d.px < hr.left - 60 || d.px > hr.right + 60) return;
  const cur = me.hand.findIndex(x => x.uid === d.uid); if (cur < 0) return;
  const lanes = Array.from(hand.querySelectorAll(".hand-slot")).map(el => {
    const pr = (el.offsetParent || hand).getBoundingClientRect();
    return pr.left + el.offsetLeft + el.offsetWidth / 2;
  });
  if (lanes.length !== me.hand.length) return;
  let best = cur, bd = Infinity;
  lanes.forEach((x, i) => { const v = Math.abs(d.px - x); if (v < bd) { bd = v; best = i; } });
  if (best === cur || Math.abs(d.px - lanes[cur]) - bd < 10) return;
  const [it] = me.hand.splice(cur, 1); me.hand.splice(best, 0, it);
  d.reordered = true;
  sfx("move", 0.6);
  render();
}
function startDrag(pd, e) {
  const src = uidEl(pd.src.uid); if (!src) return false;
  hideZoom();
  const vis = src.matches(".card,.card-back") ? src : src.querySelector(".card");
  if (!vis) return false;
  const vr = vis.getBoundingClientRect();
  const slot = boardEl.querySelector(".frow-bot .slot");
  const w = slot ? slot.getBoundingClientRect().width : vr.width;
  const g = document.createElement("div");
  g.className = "drag-ghost";
  g.style.width = w + "px"; g.style.height = (w * 1.4) + "px";
  g.innerHTML = vis.outerHTML;
  const c = g.firstElementChild;
  ["selected", "drag-src", "fresh", "flying", "struck"].forEach(x => c.classList.remove(x));
  c.removeAttribute("data-uid"); c.style.setProperty("--cw", w + "px");
  fxLayer().appendChild(g);
  // 카드가 있던 자리에서 출발해 손끝으로 따라붙는다 (갑자기 손끝으로 순간이동하지 않게)
  const vc = ctrOf(vr);
  FX.drag = Object.assign({}, pd.src, { ghost: g, w, h: w * 1.4, px: e.clientX, py: e.clientY, cx: vc.x, cy: vc.y, s: vr.width / w, over: null, overR: null, t: performance.now() });
  G.inspect = null;
  G.sel = pd.src.kind === "hand" ? { kind: "hand", uid: pd.src.uid } : { kind: "field", p: G.viewer, slot: pd.src.slot };
  document.body.classList.add("is-dragging");
  render();
  sfx("pick");
  dragTick(); requestAnimationFrame(dragTick);
  return true;
}
function dragTick() {
  const d = FX.drag; if (!d) return;
  const now = performance.now(), dt = Math.min(50, now - d.t); d.t = now;
  // 손끝 아래 카드 중심(카드 위쪽 42%를 잡은 느낌)
  let tx = d.px, ty = d.py + d.h * 0.08, ts = 1.08;
  if (d.overR) {
    const oc = ctrOf(d.overR), pull = d.over.dataset.act === "slot" ? 0.42 : 0.3;
    tx += (oc.x - tx) * pull; ty += (oc.y - ty) * pull; ts = 1.0;
  }
  const follow = 1 - Math.pow(1 - 0.42, dt / 16.7), grow = 1 - Math.pow(1 - 0.25, dt / 16.7);
  d.cx += (tx - d.cx) * follow; d.cy += (ty - d.cy) * follow; d.s += (ts - d.s) * grow;
  const lagX = tx - d.cx, lagY = ty - d.cy;
  const ry = Math.max(-16, Math.min(16, lagX * 0.45)), rx = Math.max(-16, Math.min(16, -lagY * 0.45));
  d.ghost.style.left = (d.cx - d.w / 2) + "px";
  d.ghost.style.top = (d.cy - d.h / 2) + "px";
  d.ghost.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${d.s.toFixed(3)})`;
  requestAnimationFrame(dragTick);
}
function onPointerUp() {
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("pointercancel", onPointerUp);
  FX.pd = null;
  const d = FX.drag; if (!d) return;
  FX.drag = null;
  document.body.classList.remove("is-dragging");
  FX.suppress = true; setTimeout(() => { FX.suppress = false; }, 0);
  const z = d.over; if (z) z.classList.remove("drop-hover");
  // 놓는 순간 기울기를 풀고 보이는 크기 그대로의 자리를 잰다
  d.ghost.style.transform = `scale(${d.s.toFixed(3)})`;
  const gr = d.ghost.getBoundingClientRect();
  const me = G.players[G.viewer];
  let ok = false;
  if (z) {
    const act = z.dataset.act;
    if (d.kind === "hand") {
      const it = me.hand.find(x => x.uid === d.uid), c = it && C(it);
      if (c) {
        if (act === "slot") {
          const s = +z.dataset.s;
          if (c.type === "item") ok = actEquip(me, d.uid, s);
          else if (me.field[s] && c.type !== "hand") toast("빈 칸에 올려 주세요.", "warn");
          else ok = actPlace(me, d.uid, s);
        } else if (act === "ether") ok = actCrystal(me, d.uid);
        else if (act === "burn") ok = actBurnHand(me, d.uid);
      }
    } else {
      if (act === "slot" && +z.dataset.s !== d.slot) ok = actMove(me, d.slot, +z.dataset.s);
      else if (act === "burn") ok = actBurnField(me, d.slot);
    }
  }
  if (ok) {
    FX.from[d.uid] = gr;
    if (d.kind === "field") { FX.lift = d.uid; FX.pvUids = d.pv ? new Set(d.pv.els.keys()) : null; }
    G.sel = null;
    d.ghost.remove();
    render();
    return;
  }
  // 놓을 수 없는 곳: 원래 자리로 되돌아간다 (자리에 놓으려다 막혔으면 툭툭, 그냥 놓았으면 조용히)
  if (d.pv) swapPreview(d, null);
  if (!z && !d.reordered) sfx("unselect", 0.7);
  G.sel = null; FX.returning = d.uid;
  render();
  const home = uidEl(d.uid);
  const hr = home ? home.getBoundingClientRect() : gr;
  const a = ctrOf(gr), b = ctrOf(hr);
  d.ghost.style.transform = "";
  const s0 = d.s, s1 = hr.width / (gr.width / s0);
  const an = d.ghost.animate([{ translate: "0px 0px", scale: String(s0) }, { translate: `${b.x - a.x}px ${b.y - a.y}px`, scale: String(s1) }], { duration: FT.back, easing: "cubic-bezier(.2,.75,.25,1.04)", fill: "forwards" });
  an.onfinish = () => { d.ghost.remove(); if (FX.returning === d.uid) FX.returning = null; const h = uidEl(d.uid); if (h) h.classList.remove("drag-src"); };
}

/* v1.9.4 장착 카드 앞뒤 바꾸기: 앞 카드가 옆으로 빠지며 뒤로 가고, 뒤 카드가 반대쪽으로 빠졌다가 앞으로 들어온다 */
function swapFront(uid) {
  if (!G || G.phase === "combat") return;
  const toItem = !FX.itemFront.has(uid);
  if (toItem) FX.itemFront.add(uid); else FX.itemFront.delete(uid);
  hideZoom(); sfx("move", 0.8);
  render();
  const card = boardEl.querySelector(`[data-uid="${uid}"].card`);
  if (!card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const under = card.querySelector(":scope > .c-under"), frame = card.querySelector(":scope > .c-frame");
  if (!under || !frame) return;
  const P = card.closest(".frow-bot") ? "-1.05em" : "1.05em", H = card.closest(".frow-bot") ? "-.5em" : ".5em";
  const dur = 460 / (G.speed || 1) ** 0.5, ease = "cubic-bezier(.45,.05,.3,1)";
  const back = `translateY(${P})`, out = (x, r) => `translate(${x}, ${H}) rotate(${r}deg) scale(1.04)`;
  // 앞으로 오는 카드: 뒤(z 0)에서 옆으로 빠졌다가, 가운데쯤에서 위로 올라와(z 2) 제자리로
  const rise = el => [{ transform: back, zIndex: 0 }, { transform: out("-34%", -7), zIndex: 0, offset: .48 }, { transform: out("-34%", -7), zIndex: 3, offset: .5 }, { transform: "none", zIndex: 3 }];
  // 뒤로 가는 카드: 앞에서 반대쪽으로 빠지며 어두워지고, 뒤 자리로 내려앉는다
  const sink = [{ transform: "none", filter: "brightness(1)" }, { transform: out("30%", 5), filter: "brightness(.85)", offset: .48 }, { transform: back, filter: "brightness(.7)" }];
  if (toItem) { under.animate(rise(), { duration: dur, easing: ease }); frame.animate(sink, { duration: dur, easing: ease }); }
  else { frame.animate(rise(), { duration: dur, easing: ease }); under.animate(sink, { duration: dur, easing: ease }); }
}
/* ---------- 누르기 ---------- */
function onBoardClick(e) {
  if (FX.suppress || !G) return;
  // v1.9.3: 장착한 유닛 아래로 삐져나온 아이템 카드를 누르면 그 아이템을 크게 본다 (유닛은 고르지 않는다)
  const und = e.target.closest(".c-under");
  // v1.9.4: 누르면 아이템 카드가 앞으로 오고 유닛이 뒤로 간다. 앞에 온 아이템이나 뒤로 간 유닛을 다시 누르면 되돌아온다
  const frontCard = e.target.closest(".card.item-front");
  if (und || frontCard) { swapFront(+(und || frontCard).closest("[data-uid]").dataset.uid); return; }
  const t = e.target.closest("[data-act]");
  if (!t) { if (G.inspect && !e.target.closest("[data-focus]")) { G.inspect = null; render(); } return; }
  const act = t.dataset.act;
  const me = G.players[G.viewer];
  const ctrl = G.control === me.idx && !G.handoff;
  if (act === "handoff") { G.handoff = false; render(); return; }
  if (act === "speed") { setSpeed(+t.dataset.v); return; }
  if (act === "speed-cycle") { const i = SPEEDS.indexOf(G.speed); setSpeed(SPEEDS[(i + 1) % SPEEDS.length]); return; }
  if (act === "settings") { showSettings(); return; }
  if (act === "rules") { showRules(); return; }
  if (act === "surrender") { surrender(); return; }
  if (act === "log") { G.showLog = !G.showLog; const d = $("#logdrawer"); if (d) d.classList.toggle("open", G.showLog); $$('[data-act="log"].tb-btn', boardEl).forEach(b => b.classList.toggle("on", G.showLog)); return; }
  if (act === "do-cancel") { G.sel = null; G.inspect = null; render(); return; }
  // 상대 카드나 내 차례가 아닐 때 누른 전장 카드: 크게 보기
  if (act === "slot" && (!ctrl || +t.dataset.p !== me.idx)) {
    const s = +t.dataset.s, p = G.players[+t.dataset.p], it = p.field[s];
    if (it && !(isSpell(it) && p.idx !== G.viewer)) { G.inspect = G.inspect === it.uid ? null : it.uid; G.sel = null; render(); }
    return;
  }
  if (!ctrl) return;
  if (act === "ready") { finishPrep(me); return; }
  if (act === "shuffle") { if (actShuffle(me)) { G.sel = null; G.inspect = null; } render(); return; }
  if (act === "hand") {
    const uid = +t.dataset.uid;
    G.inspect = null;
    const now = performance.now(), lc = FX.lastHand;
    if (lc && lc.uid === uid && now - lc.t < DBL_MS) {
      FX.lastHand = null;
      const it = me.hand.find(x => x.uid === uid);
      if (it) { G.sel = { kind: "hand", uid }; FX.rise = uid; placeSelected(me, it); FX.rise = null; }
      return;
    }
    FX.lastHand = { uid, t: now };
    G.sel = (G.sel && G.sel.kind === "hand" && G.sel.uid === uid) ? null : { kind: "hand", uid };
    sfx(G.sel ? "select" : "unselect");
    render(); return;
  }
  if (act === "do-place" && G.sel && G.sel.kind === "hand") { if (actPlace(me, G.sel.uid, null)) G.sel = null; render(); return; }
  if (act === "do-crystal" && G.sel && G.sel.kind === "hand") { if (actCrystal(me, G.sel.uid)) G.sel = null; render(); return; }
  if (act === "do-burn" && G.sel && G.sel.kind === "hand") { if (actBurnHand(me, G.sel.uid)) G.sel = null; render(); return; }
  if (act === "do-burnfield" && G.sel && G.sel.kind === "field") { if (actBurnField(me, G.sel.slot)) G.sel = null; render(); return; }
  if (act === "slot") {
    const s = +t.dataset.s;
    G.inspect = null;
    if (G.sel && G.sel.kind === "hand") {
      const hc = me.hand.find(x => x.uid === G.sel.uid);
      if (hc && C(hc).type === "item") { if (actEquip(me, G.sel.uid, s)) G.sel = null; render(); return; }
      if (me.field[s]) { G.sel = { kind: "field", p: me.idx, slot: s }; render(); return; }
      if (actPlace(me, G.sel.uid, s)) G.sel = null; render(); return;
    }
    if (G.sel && G.sel.kind === "field") {
      if (G.sel.slot === s) { G.sel = null; sfx("unselect"); render(); return; }
      const mv = me.field[G.sel.slot]; FX.lift = mv ? mv.uid : null;
      actMove(me, G.sel.slot, s); G.sel = null; render(); return;
    }
    if (me.field[s]) { G.sel = { kind: "field", p: me.idx, slot: s }; sfx("select"); render(); }
    return;
  }
  if (act === "ether" && +t.dataset.p === me.idx && G.sel && G.sel.kind === "hand") { if (actCrystal(me, G.sel.uid)) G.sel = null; render(); return; }
  if (act === "burn" && +t.dataset.p === me.idx && G.sel) {
    if (G.sel.kind === "hand") { if (actBurnHand(me, G.sel.uid)) G.sel = null; }
    else if (G.sel.kind === "field") { if (actBurnField(me, G.sel.slot)) G.sel = null; }
    render(); return;
  }
}
async function finishPrep(me) {
  if (ether(me) < 0) {
    const ok = await modal(`<h3>유지비가 모자랍니다</h3><p>이번 턴 에테르가 ${-ether(me)} 모자랍니다. 이대로 마치면 유지비가 큰 유닛부터 소각됩니다.</p><p class="muted">핸드를 결정으로 바꾸면 에테르가 늘어납니다.</p>`,
      [{ label: "돌아가기", value: false }, { label: "그대로 마치기", value: true, cls: "danger" }]);
    if (!ok || !G) return;
  }
  sfx("confirm");
  G.sel = null; G.inspect = null; Guide.hide(); const r = G.ready; G.ready = null; G.control = null; render(); if (r) r();
}

async function surrender() {
  if (G.phase === "over") { exitMatch(); return; }
  const v = await modal(`<h3>항복할까요?</h3><p>지금 항복하면 이 경기는 패배로 기록됩니다.</p>`, [{ label: "계속 싸우기", value: false }, { label: "항복", value: true, cls: "danger" }]);
  if (!v || !G || G.phase === "over") return;
  const loser = G.mode === "hotseat" ? (G.control != null ? G.control : G.viewer) : 0;
  G.winner = 1 - loser; G.reason = `${G.players[loser].name}이(가) 항복했습니다.`; G.phase = "over";
  if (G.ready) { const r = G.ready; G.ready = null; r(); }
  render();
}
function exitMatch() { const cb = G && G.onExit; Guide.hide(); setCombatRules({}); G = null; boardEl = null; if (cb) cb(); }

function showRules() {
  modal(`<h3>전투 규칙 요약</h3>
  <ol class="rules-list">
    <li><b>보충</b> — 턴이 시작되면 두 플레이어 모두 핸드를 6장까지 뽑고, 뽑은 장수만큼(최소 1) 생명이 줄어듭니다.</li>
    <li><b>에테르</b> — 위대한 정수가 매 턴 에테르 1을 주고, 핸드를 결정으로 바치면(턴당 1장, 최대 9개) 결정마다 매 턴 에테르 1을 더 냅니다. Lv N 카드의 비용은 에테르 N. 남은 에테르는 넘어가지 않습니다.</li>
    <li><b>유지비</b> — 레벨 아이콘의 빈 칸 수가 유지비입니다. 소환할 때는 레벨만큼 에테르를 내고, 유닛이 살아남으면 다음 턴부터 에테르가 유지비만큼 빠집니다. 준비를 마칠 때 모자라면 유지비가 큰 유닛부터 소각됩니다.</li>
    <li><b>공격 준비</b> — 공격자가 유닛·공격 마법·공용 마법을 빈 칸에 올립니다 (핸드 더블클릭 = 왼쪽부터 빈 칸). 아이템은 공격·방어 준비 어느 때나 내 유닛 아무에게나 장착하며, 유지비가 없습니다.</li>
    <li><b>방어 준비</b> — 방어자가 공격자의 유닛 배치를 보고 유닛·방어 마법·공용 마법을 올립니다. 마법은 뒷면이라 상대에게 보이지 않습니다.</li>
    <li><b>전투</b> — 공격 유닛이 1번 칸부터 차례로 상대의 맨 앞 유닛과 싸웁니다. <b>맞붙을 때마다 양쪽 코인을 새로 던집니다</b>(앞면 50%). 유닛의 공격·방어·체력 코인은 순번이 같으면 동전 하나라 함께 앞·뒷면이 됩니다(공격 2개·방어 1개면 동전 2개). 장착한 아이템의 코인도 함께 세고, 동전은 최대 5개입니다. 내 코인은 내가 <b>"운명 봉인"</b>으로, 상대 코인은 상대가 세웁니다(5초가 지나면 저절로 멈춤). 양쪽이 멈추면 나온 대로 스탯이 바뀐 뒤 공격 → 반격이 이어집니다. 피해 = 공격 − 방어(최소 0). 쓰러진 유닛과 쓴 마법은 그 자리에서 부서지고 남은 카드는 바로 왼쪽으로 당겨집니다. 피해는 그 턴 안에서만 쌓이고, 턴이 끝나면 회복됩니다.</li>
    <li><b>코인 뒤집기</b> — 코인이 멈춘 뒤, 내 유닛의 <b>뒷면 코인을 누르면 에테르 1</b>을 내고 그 코인만 다시 던집니다. 맞붙을 때마다 한 번. 준비 단계에서 남겨 둔 에테르를 여기에 씁니다 (남은 에테르는 다음 턴으로 넘어가지 않습니다).</li>
    <li><b>멀리건</b> — 경기 시작 때 한 번, 시작 핸드에서 고른 카드를 덱에 되돌리고 같은 장수를 새로 뽑습니다. 생명은 줄지 않습니다.</li>
    <li><b>마법 발동</b> — 마법도 대기열의 한 자리입니다. 맨 앞에 놓으면 전투 전에, 공격 마법은 앞 칸의 공격 유닛이 모두 공격을 마치면, 방어 마법은 앞 칸의 방어 유닛이 모두 쓰러지면 발동합니다. "뒤 N칸"은 마법이 놓인 칸 다음부터 N칸입니다.</li>
    <li><b>마법 피해와 물리 피해</b> — 마법의 "피해"는 방어를 무시하고 체력을 깎습니다. "물리 피해"는 공격처럼 방어를 거칩니다(피해 − 방어). 마법이 부른 유닛의 공격도 물리입니다.</li>
    <li><b>소환 · 메아리</b> — 소환 마법은 부서지며 그 칸에 유닛을 부르고, 공격 턴이면 차례가 왔을 때 그 유닛도 공격합니다("이번 턴만"은 전투가 끝나면 사라짐). 메아리 마법은 작은 마법을 불러 이어서 발동합니다. 부른 유닛은 부서져도 카드가 남지 않습니다.</li>
    <li><b>계략 마법</b> — 핸드를 겨냥하는 마법. 공격·방어 준비 어느 때나, 칸 없이 내는 즉시 발동하고 소각 더미로 갑니다. 핸드 카드에 건 스탯 변화는 그 카드가 전장에 나와도 이 판 내내 남습니다.</li>
    <li><b>고정 스탯 · 코인으로 쓰러짐</b> — <b>4*</b>처럼 별이 붙은 스탯은 마법·코인·저주로 내려가지 않습니다. 코인 때문에 체력이 0 이하가 되면 그 유닛은 쓰러져 소각 더미로 갑니다.</li>
    <li><b>직접 공격</b> — 막을 유닛이 없으면 공격 유닛의 레벨만큼 생명이 줄어듭니다. 대신 직접 공격을 받은 쪽은 <b>다음 턴에 에테르 +1</b>을 일시적으로 얻습니다 (한 턴에 한 번, 그 턴에만).</li>
    <li><b>셔플</b> — 내 준비 단계에 핸드 전부를 덱에 넣고 섞어 같은 장수를 다시 뽑습니다. 한 턴에 한 번, 생명 −1. 그 턴에 카드를 전장에 올렸거나 소각했으면 할 수 없습니다.</li>
    <li><b>승패</b> — 생명이나 덱이 0이 되면 패배합니다. 동시에 0이 되면 다음 턴에 공격하는 쪽이 패배합니다.</li>
  </ol>`, [{ label: "닫기", value: true, cls: "primary" }], { cls: "wide" });
}

function showResult() {
  const w = G.players[G.winner];
  const won = G.mode === "ai" ? G.winner === 0 : true;
  const reward = typeof onMatchEnd === "function" ? onMatchEnd(G) : null;
  const econ = econSettle(G);
  const wrap = document.createElement("div");
  wrap.className = "result " + (won ? "win" : "lose");
  wrap.innerHTML = `<div class="res-inner">
    <p class="res-eyebrow">${G.mode === "ai" ? (won ? "THE ETHER BENDS TO YOUR WILL" : "THE ETHER FADES") : "THE DUEL IS DECIDED"}</p>
    <h2 class="res-title">${won ? "VICTORY" : "DEFEAT"}</h2>
    <p class="res-sub">${G.mode === "hotseat" ? esc(w.name) + " 승리 · " : ""}${esc(G.reason)}</p>
    <div class="res-stats"><span>라운드 <b>${roundOf(G.turn)}</b></span><span>턴 <b>${G.turn}</b></span><span>${esc(G.players[0].name)} 생명 <b>${Math.max(0, G.players[0].life)}</b></span><span>${esc(G.players[1].name)} 생명 <b>${Math.max(0, G.players[1].life)}</b></span></div>
    ${econ ? `<div class="res-gold"><span>이번 판 수입</span><b>+${fmtGold(econ.total)}</b><div class="rg-rows"><span>부서진 카드 ${fmtGold(econ.broken)} × ${econ.won ? ECON.winMul : ECON.loseMul} = <i>${fmtGold(econ.bonus)}</i></span><span>전투 중 2% <i>${fmtGold(econ.earned)}</i></span>${econ.pach ? `<span>작은 게임 <i>${fmtGold(econ.pach)}</i></span>` : ""}<span>지갑 <i>${fmtGold(Store.gold())}</i></span></div></div>` : ""}
    ${reward ? `<div class="res-reward"><p>보상으로 카드 1장을 얻었습니다</p>${cardHTML(CARDS[reward], { size: "md" })}</div>` : ""}
    <div class="res-btns">${G.cfg.exp ? `<button class="btn primary" data-r="lobby">${won ? "원정 계속" : "원정으로"}</button>` : `<button class="btn primary" data-r="lobby">대기실로</button><button class="btn" data-r="again">한 번 더</button>`}<button class="btn ghost" data-r="board">전장 보기</button></div>
  </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener("click", e => {
    const b = e.target.closest("[data-r]"); if (!b) return;
    wrap.remove();
    if (b.dataset.r === "lobby") exitMatch();
    else if (b.dataset.r === "again") { const cfg = Object.assign({}, G.cfg); startMatch(cfg); }
  });
}

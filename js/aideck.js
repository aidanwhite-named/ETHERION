/* ETHERION — 컴퓨터 맞춤 덱 (v3.24.4)
   상대(사람)의 덱 점수에 맞춰 컴퓨터의 덱을 그 자리에서 꾸민다. 판을 시작하기 바로 전에 부르면 된다(한 번에 1ms 안팎).
   - 점수는 덱 조정실과 같은 덱 점수(js/grades.js deckScore: 카드 한 장 = 등급 점수 + 레벨).
   - 깃발마다 기본 덱 점수가 다르므로(434~471) 점수 그대로가 아니라 **기본 덱 대비 비율**을 맞춘다:
       사람 덱이 자기 깃발 기본 덱의 112%면, 컴퓨터도 자기 깃발 기본 덱의 112%짜리 덱.
   - 꾸미는 법: 목표에 가까운 쪽의 다듬은 덱(기본 덱 / 정예 덱)에서 시작해, 같은 종류(유닛 · 아이템 · 마법) · 같은 레벨(±1)의
     카드끼리 한 장씩 바꿔 점수를 목표 쪽으로 옮긴다. 레벨 곡선은 거의 그대로(레벨 합 ±AIDECK.lvDrift)라 덱이 굴러간다.
     같은 카드 장수 제한(유니크 · 스페셜 1장 등, maxCopiesOf)은 지킨다. 그 깃발의 카드만 쓴다.
   - 닿을 수 있는 점수에는 끝이 있다(모두 일반 카드로 바꿔도 기본 덱의 약 80~85%, 위로는 약 160%). 못 닿으면 가장 가까운 덱을 돌려주고 score에 실제 점수를 적는다.
   - 난수는 rnd(없으면 Math.random). 씨앗을 주면(aiDeckFor의 opt.seed) 같은 덱이 다시 나온다 — 같은 관문에 다시 도전할 때 같은 상대.
   쓰는 곳: 아직 없음(성로 순례에서 쓸 예정). 시험 · 수치 확인은 tools/balance/matchdeck.js */
"use strict";

const AIDECK = {
  tol: 2,        // 목표 점수와 이만큼 차이면 그만
  lvDrift: 4,    // 레벨 합이 시작 덱에서 이만큼까지만 달라진다
  steps: 400     // 바꾸기 시도 상한
};
const aiDeckKind = c => (c.type === "unit" ? "u" : c.type === "item" ? "i" : "s");

/* 깃발 g의 덱을 덱 점수 target에 맞춰 꾸민다 → { cards, score, base } */
function aiDeckBuild(g, target, rnd) {
  rnd = rnd || Math.random;
  const pool = cardsOfGroup(g);
  const sS = deckScore(STARTER_DECKS[g]).total, sH = deckScore(HARD_DECKS[g]).total;
  const fromHard = Math.abs(target - sH) < Math.abs(target - sS);
  const deck = Object.assign({}, fromHard ? HARD_DECKS[g] : STARTER_DECKS[g]);
  let total = fromHard ? sH : sS, lv = 0;
  for (let step = 0; step < AIDECK.steps; step++) {
    const gap = target - total;
    if (Math.abs(gap) <= AIDECK.tol) break;
    const moves = []; let sum = 0;
    for (const xid in deck) {
      if (!deck[xid]) continue;
      const x = CARDS[xid], kx = aiDeckKind(x), sx = cardScore(x);
      for (const y of pool) {
        if (y.id === xid || aiDeckKind(y) !== kx || (deck[y.id] || 0) >= maxCopiesOf(y) || (typeof uniqueBlock === "function" && uniqueBlock(Object.assign({}, deck, { [xid]: Math.max(0, (deck[xid] || 0) - 1) }), y.id))) continue;   // v3.31 유니크 2종까지
        const dl = y.lv - x.lv; if (dl > 1 || dl < -1 || Math.abs(lv + dl) > AIDECK.lvDrift) continue;
        const d = cardScore(y) - sx;
        if (d * gap <= 0 || Math.abs(d) > Math.abs(gap) + AIDECK.tol) continue;
        const w = (dl ? 0.25 : 1) * (y.type === x.type ? 1 : 0.5);   // 같은 레벨 · 같은 마법 종류를 먼저
        moves.push({ xid, yid: y.id, d, dl, w }); sum += w;
      }
    }
    if (!moves.length) break;
    let r = rnd() * sum, m = moves[moves.length - 1];
    for (const k of moves) { r -= k.w; if (r <= 0) { m = k; break; } }
    if (--deck[m.xid] <= 0) delete deck[m.xid];
    deck[m.yid] = (deck[m.yid] || 0) + 1;
    total += m.d; lv += m.dl;
  }
  return { cards: deck, score: total, base: fromHard ? "hard" : "starter" };
}

/* 사람 덱(myGroup · myCards)에 맞춘 상대 깃발 oppGroup의 덱.
   opt.scale: 난이도 배수(1 = 같은 비율, 0.9 = 조금 약하게, 1.05 = 조금 세게) · opt.seed: 씨앗(같으면 같은 덱)
   → { cards, score, target, ratio, base } */
function aiDeckFor(oppGroup, myGroup, myCards, opt) {
  opt = opt || {};
  const ratio = deckScore(myCards).total / deckScore(STARTER_DECKS[myGroup]).total;
  const target = Math.round(deckScore(STARTER_DECKS[oppGroup]).total * ratio * (opt.scale || 1));
  const r = aiDeckBuild(oppGroup, target, opt.seed != null ? mulberry32(opt.seed >>> 0) : null);
  r.target = target; r.ratio = ratio;
  return r;
}

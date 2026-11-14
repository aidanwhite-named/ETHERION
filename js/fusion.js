/* ETHERION — 승화(고급 3장 → 레어) (v3.52 · v3.54 운명의 구슬)
   같은 고급 카드 3장 → 같은 깃발의 레어 카드 1장(확률 뽑기). 일반 3장 → 강화 카드는 그대로 Store.upgradeCard(js/economy.js).
   - 풀: 재료와 같은 깃발(group)의 레어 카드 가운데 레거시가 아니고 아직 최대 장수(maxCopiesOf)를 다 갖지 않은 카드.
     같은 깃발인 까닭: 덱은 깃발 하나로 짜고(강화 카드도 같은 깃발), 그 깃발을 가진 모험가만 그 카드를 합칠 수 있다(ownsGroup).
   - 확률: 센 카드일수록 낮게. 세기 = 카드 점수(js/grades.js cardScore = 등급 점수 15 + 레벨, 덱 점수 · 컴퓨터 덱 맞춤과 같은 잣대).
     무게 = 1 ÷ (카드 점수 − RARE_FUSE.base)^RARE_FUSE.power → 레벨 2 : 3 : 4 : 5 = 1 : 0.56 : 0.36 : 0.25. 카드마다 손질하려면 RARE_FUSE.adj에 곱할 값.
   - 재료는 저장한 덱 · 덱 초안에 들지 않은 장수(Store.tradeable)에서만. 재료 3장은 사라진다.
   - 서버로 열면 서버가 이 함수로 뽑고 소모한다(server.js OPS fuseRare · net.js NET_SYNC_OPS). 기기가 결과를 정하지 않는다.
   화면 코드는 넣지 않는다 — 서버(server/rules.js EXTRA)가 함께 읽는다. 화면은 js/upgrade-ui.js(합성소). */
"use strict";

const RARE_FUSE = { cost: 3, from: "uncommon", to: "rare", base: 14, power: 2, adj: {} };
/* v3.54 운명의 구슬: 파친코(전장 작은 게임 · 대기실 수레바퀴)에서 낮은 확률로 — 서버가 굴리고 하루 상한(daily)까지만(js/rewards.js rewardOrb).
   승화(고급 3장)에 하나를 함께 넣으면 그 깃발의 "좋은 레어"(카드 점수가 깃발 레어의 가운데 값 이상)만 같은 확률로, unique 확률로 그 깃발 유니크.
   u.orbs는 서버만 바꾸는 칸(PROTECTED · NET_PROTECTED). 기기는 Store.addOrbs로 늘리지 못한다(net.js) */
const ORB = { name: "운명의 구슬", p: 0.004, daily: 1, unique: 0.08 };

/* 승화로 나올 수 있는 카드와 확률. orb면 운명의 구슬을 넣었을 때. u가 있으면 다 가진 카드는 빠진다. [{ id, w, p, full, grade }] */
function rareFuseOdds(baseId, u, orb) {
  const b = CARDS[baseId]; if (!b) return [];
  const all = u && Store.allCards(u);
  const full = c => !!u && !all && (Store.ownedCount(u, c.id) >= maxCopiesOf(c));
  const rares = CARD_LIST.filter(c => c.group === b.group && !c.retired && !c.base && gradeOf(c) === RARE_FUSE.to);
  let list;
  if (!orb) {
    list = rares.map(c => { const s = Math.max(1, cardScore(c) - RARE_FUSE.base), f = full(c);
      return { id: c.id, grade: RARE_FUSE.to, w: f ? 0 : Math.pow(s, -RARE_FUSE.power) * (RARE_FUSE.adj[c.id] || 1), full: f, score: cardScore(c) }; });
  } else {
    const sc = rares.map(cardScore).sort((x, y) => x - y), mid = sc.length ? sc[Math.floor((sc.length - 1) / 2)] : 0;
    const good = rares.filter(c => cardScore(c) >= mid && cardScore(c) > sc[0] || sc[0] === sc[sc.length - 1]);
    const uniq = CARD_LIST.filter(c => c.group === b.group && !c.retired && !c.base && gradeOf(c) === "unique");
    const gA = good.filter(c => !full(c)), uA = uniq.filter(c => !full(c));
    const pu = uA.length ? (gA.length ? ORB.unique : 1) : 0;
    list = good.map(c => ({ id: c.id, grade: RARE_FUSE.to, w: full(c) ? 0 : (1 - pu) / gA.length, full: full(c), score: cardScore(c) }))
      .concat(uniq.map(c => ({ id: c.id, grade: "unique", w: full(c) ? 0 : pu / uA.length, full: full(c), score: cardScore(c) })));
  }
  const sum = list.reduce((t, x) => t + x.w, 0);
  for (const x of list) x.p = sum ? x.w / sum : 0;
  return list.sort((a, c) => c.p - a.p || a.score - c.score || a.id.localeCompare(c.id));
}

Object.assign(Store, {
  orbs(u) { u = u || this.user(); const n = u && +u.orbs; return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0; },
  addOrbs(u, n, why) {
    u = u || this.user(); n = Math.trunc(+n || 0); if (!u || !n) return this.orbs(u);
    u.orbs = Math.max(0, this.orbs(u) + n);
    u.ledger = u.ledger || []; u.ledger.push({ at: Date.now(), n: 0, orbs: n, why: why || ORB.name });
    this.save();
    return u.orbs;
  },
  /* 승화를 할 수 있나: { ok, msg, base, free, odds, orb } (화면이 단추를 켜고 끌 때도 쓴다) */
  fuseCheck(u, baseId, orb) {
    u = u || this.user(); const b = isCardId(baseId) && CARDS[baseId]; orb = !!orb;
    if (!u || !b || b.base || gradeOf(b) !== RARE_FUSE.from) return { ok: false, msg: "승화는 고급 카드 3장으로 합니다." };
    if (b.retired) return { ok: false, msg: `「${b.name}」은 레거시 카드라 승화할 수 없습니다.` };
    const free = this.upgradeFree(u, b.id), r = { base: b.id, free, orb };
    if (this.allCards(u)) return Object.assign(r, { ok: false, msg: "관리자 · 필멸자는 모든 카드를 이미 쓸 수 있습니다." });
    if (!this.ownsGroup(u, b.group)) return Object.assign(r, { ok: false, msg: `${GROUPS[b.group].name} 깃발이 없습니다.` });
    const odds = rareFuseOdds(b.id, u, orb); r.odds = odds;
    if (!odds.length) return Object.assign(r, { ok: false, msg: "이 깃발에는 나올 카드가 없습니다." });
    if (!odds.some(x => x.w > 0)) return Object.assign(r, { ok: false, msg: orb ? "운명의 구슬로 나올 카드를 모두 최대 장수만큼 가지고 있습니다." : "이 깃발의 레어 카드를 모두 최대 장수만큼 가지고 있습니다." });
    if (free < RARE_FUSE.cost) {
      const have = u.collection[b.id] || 0;
      return Object.assign(r, { ok: false, msg: `「${b.name}」 ${RARE_FUSE.cost}장이 필요합니다. (가진 ${have}장${have > free ? ` 가운데 덱 · 초안에 든 ${have - free}장은 쓸 수 없음` : ""})` });
    }
    if (orb && this.orbs(u) < 1) return Object.assign(r, { ok: false, needOrb: true, msg: `${ORB.name}이 없습니다. (문양 맞추기 · 수레바퀴에서 낮은 확률로 얻습니다)` });
    return Object.assign(r, { ok: true });
  },
  /* 승화: 재료 3장(+ 운명의 구슬 1개)을 쓰고 한 장을 뽑아 준다. 뽑기는 이 함수를 부른 쪽(서버 모드면 서버)의 난수 */
  fuseRare(u, baseId, orb) {
    u = u || this.user(); orb = orb === true || orb === 1 || orb === "orb";
    const r = this.fuseCheck(u, baseId, orb); if (!r.ok) { delete r.odds; return r; }
    let x = Math.random() * r.odds.reduce((t, o) => t + o.w, 0), got = null;
    for (const o of r.odds) { if (o.w <= 0) continue; got = o; x -= o.w; if (x < 0) break; }
    const left = (u.collection[r.base] || 0) - RARE_FUSE.cost;
    if (left > 0) u.collection[r.base] = left; else delete u.collection[r.base];
    u.collection[got.id] = (u.collection[got.id] || 0) + 1;
    u.fresh = u.fresh || {}; u.fresh[got.id] = Date.now();
    if (orb) this.addOrbs(u, -1, "승화: " + CARDS[got.id].name); else this.save();
    return { ok: true, base: r.base, got: got.id, grade: got.grade, p: got.p, orb, used: RARE_FUSE.cost };
  }
});

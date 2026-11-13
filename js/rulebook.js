/* ETHERION — 룰북 (v3.55)
   튜토리얼은 "게임하는 법", 매뉴얼은 "대전 규칙 · 카드 읽기 · 능력 사전", 룰북은 "게임의 짜임" — 컨셉 · 등급 · 상점 · 합성 · 파친코 · 순례 · 보상 · 계정.
   대기실의 세 번째 명판(js/manual.js Help.dockHTML)이나 매뉴얼의 연결 글에서 연다.

   고치는 법 (이 파일 하나):
   ① 글을 고칠 때 → 맨 아래 RULEBOOK만. 섹션마다 { id, t(제목), en, sum(접었을 때 한 줄), parts }.
      parts 한 줄의 꼴:  { p: "문단" }  { h: "소제목" }  { li: ["…", "…"] }  { tip: "도움말 상자" }
                         { rows: [["머리", "글"], ["머리", "글", "opt"]] }  { table: "표 이름" }
      글 안에서:  {값 이름} = 게임 데이터에서 읽은 값,  **굵게**,  [[mn:combat|매뉴얼 전투]] = 매뉴얼 그 장,  [[rb:shop|상점]] = 룰북 그 섹션.
   ② 확률 · 가격 · 보상량 · 장수는 글에 숫자로 쓰지 않는다 → RB_VALUES에 이름을 붙여 게임 상수에서 읽는다.
      값을 읽지 못하면(그 상수가 아직 없거나 빠짐) 그 줄은 화면에 안 나온다. 끝에 "opt"를 붙인 줄만 그래도 되고,
      그 밖의 줄에서 값이 비면 `node tools/rulebook_check.js`가 실패한다(바뀐 상수 이름을 여기서 고치라는 뜻).
   ③ 행이 여러 개인 표(등급표 · 파친코표 · 순례 뽑기표 …)는 RB_TABLES에서 데이터로 만든다.
   화면 코드(RulebookUI)는 맨 끝, 브라우저에서만 돈다. 값 · 표 · 글은 node 검사가 서버 규칙 문맥에서 그대로 읽는다. */
"use strict";

const rbN = v => Math.round(v).toLocaleString("ko-KR");
const rbP = p => { const x = p * 100; return (x >= 10 ? +x.toFixed(1) : x >= 1 ? +x.toFixed(1) : x >= 0.1 ? +x.toFixed(2) : +x.toFixed(3)) + "%"; };
const rbG = g => (GRADES[g] ? GRADES[g].name : g);
const rbLive = () => CARD_LIST.filter(c => !c.retired);
const RB_DOW = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

/* ---------- ① 값: 이름 → 게임 데이터에서 읽는 함수 (글자로 돌려준다) ---------- */
const RB_VALUES = {
  /* 세계 · 대전 */
  "world.factions": () => Object.keys(FACTIONS).length,
  "world.flags": () => GROUP_IDS.length,
  "rules.deck": () => RULES.deckSize,
  "rules.copies": () => RULES.maxCopies,
  "rules.life": () => RULES.startLife,
  "rules.slots": () => RULES.slots,
  "rules.essence": () => RULES.essence,
  "rules.etherMax": () => RULES.essence + RULES.maxCrystals,
  /* 카드 · 덱 */
  "cards.total": () => rbLive().length,
  "cards.grades": () => GRADE_IDS.length,
  "deck.uniqueKinds": () => UNIQUE_DECK_MAX,
  "legacy.count": () => Object.values(CARDS).filter(c => c.retired).length,
  /* 상점 */
  "shop.notSold": () => GRADE_IDS.filter(g => SHOP_GRADE_PRICE[g] == null).map(rbG).join(" · "),
  /* 강화 · 승화 */
  "up.cost": () => UPGRADE_COST,
  "up.from": () => rbG("common"),
  "up.grade": () => rbG("upgrade"),
  "up.kinds": () => rbLive().filter(c => c.base).length,
  "up.seals": () => UPGRADE_SEALS,
  "fuse.cost": () => RARE_FUSE.cost,
  "fuse.from": () => rbG(RARE_FUSE.from),
  "fuse.to": () => rbG(RARE_FUSE.to),
  "orb.name": () => ORB.name,
  "orb.p": () => rbP(ORB.p),
  "orb.daily": () => ORB.daily,
  "orb.unique": () => rbP(ORB.unique),
  "orb.uniqueGrade": () => rbG("unique"),
  /* 파친코 · 작은 게임 */
  "arcade.daily": () => rbN(REWARD.arcadeDaily),
  "arcade.crystal": () => rbN(REWARD.crystal),
  "arcade.crystalTurns": () => REWARD.crystalTurns,
  /* 순례 */
  "pil.gates": () => PILGRIM.gates - 1,
  "pil.fights": () => PILGRIM.fights,
  "pil.first": () => rbN(PILGRIM.first),
  "pil.done": () => rbN(PILGRIM.done),
  "pil.rate": () => rbP(PILGRIM.battleRate),
  "pil.scale": () => { const s = [...new Set(PILGRIM.scale)]; return s.length === 1 ? rbP(s[0]) : rbP(Math.min(...s)) + " ~ " + rbP(Math.max(...s)); },
  "pil.forest": () => rbP(PILGRIM.forestScale),
  "pil.resetDay": () => RB_DOW[PILGRIM.resetDow],
  "pil.sealWin": () => PILGRIM.seal.win,
  "pil.sealDone": () => PILGRIM.seal.done,
  /* 대전 보상 */
  "econ.break": () => rbP(ECON.breakRate),
  "econ.win": () => ECON.winMul,
  "econ.lose": () => ECON.loseMul,
  "econ.unitPerLv": () => rbN(ECON.unitPerLv),
  "econ.itemMul": () => ECON.itemMul,
  "econ.spellMul": () => ECON.spellMul,
  "econ.luckyCard": () => rbP(ECON.lucky.card),
  "econ.luckyGold.p": () => rbP(ECON.lucky.gold.p),
  "econ.luckyGold": () => rbN(ECON.lucky.gold.gold),
  "reward.daily": () => REWARD.dailyMatches,
  /* 퀘스트 */
  "quest.daily": () => QUEST.daily,
  "quest.weekly": () => QUEST.weekly,
  "quest.dailyGold": () => { const g = QUEST_DAILY.map(q => q.gold); return rbN(Math.min(...g)) + " ~ " + rbN(Math.max(...g)); },
  "quest.weeklyGold": () => { const g = QUEST_WEEKLY.map(q => q.gold); return rbN(Math.min(...g)) + " ~ " + rbN(Math.max(...g)); },
  /* 교역소 */
  "trade.maxCards": () => TRADE.maxCards,
  "trade.maxOpen": () => TRADE.maxOpen,
  "trade.step": () => rbP(TRADE.stepRate),
  "trade.stepMin": () => rbN(TRADE.stepMin),
  "trade.durations": () => TRADE.durations[0][1] + " ~ " + TRADE.durations[TRADE.durations.length - 1][1],
  "trade.newHours": () => TRADE.newHours,
  "trade.newMatches": () => TRADE.newMatches,
  /* 계정 */
  "acct.guest": () => GUEST_ID,
  "acct.freeFlags": () => REG_MAX_FLAGS,
  "acct.startGold": () => rbN(ECON.startGold),
  "level.max": () => LEVEL.max
};

/* 값 하나 읽기: 없거나 틀리면 null (그 줄을 숨긴다) */
function rbVal(name) {
  const f = RB_VALUES[name]; if (!f) return null;
  try { const v = f(); return v == null || (typeof v === "number" && !Number.isFinite(v)) || /undefined|NaN/.test(String(v)) ? null : String(v); }
  catch (e) { return null; }
}

/* ---------- ② 표: 이름 → { cols, rows } (칸은 글자 · 짧은 HTML) ---------- */
const rbChip = g => `<span class="mn-grade" style="--gr:${GRADES[g].color}">${GRADES[g].name}</span>`;
const RB_TABLES = {
  /* 진영과 깃발 */
  factions: () => ({ cols: ["진영", "깃발"], rows: Object.values(FACTIONS).map(F => [`<b style="color:${F.color}">${F.name}</b>`, F.groups.map(g => GROUPS[g].name).join(" · ")]) }),
  /* 등급마다 카드 수 · 덱에 넣는 장수 */
  grades: () => ({ cols: ["등급", "카드", "덱에"], rows: GRADE_IDS.map(g => {
    const L = rbLive().filter(c => gradeOf(c) === g);
    const mx = L.length ? Math.max(...L.map(c => maxCopiesOf(c))) : RULES.maxCopies;
    return [rbChip(g), L.length + "종", mx + "장까지"]; }) }),
  /* 상점 값 · 처음 재고 */
  shop: () => ({ cols: ["등급", "사기 · 팔기", "재고"], rows: GRADE_IDS.map(g => [rbChip(g),
    SHOP_GRADE_PRICE[g] != null ? rbN(SHOP_GRADE_PRICE[g]) + " 조각" : "팔지 않음",
    SHOP_GRADE_PRICE[g] != null ? SHOP_STOCK[g] + "장" : "—"]) }),
  /* 승화: 레벨마다 나오는 정도 (레어 카드 점수 기준, js/fusion.js와 같은 셈) */
  fuseLevels: () => {
    const lv = [...new Set(rbLive().filter(c => gradeOf(c) === RARE_FUSE.to && !c.base).map(c => c.lv))].sort((a, b) => a - b);
    const w = l => Math.pow(Math.max(1, (DECK_GRADE_PT[RARE_FUSE.to] + l) - RARE_FUSE.base), -RARE_FUSE.power);
    const top = w(lv[0]);
    return { cols: ["레어 카드 레벨", "나오는 정도"], rows: lv.map(l => [`${l}레벨`, `×${(w(l) / top).toFixed(2)}`]) };
  },
  /* 파친코 · 수레바퀴 */
  pachinko: () => { const P = ECON.pachinko; return { cols: ["문양", "확률", "받는 것"], rows: [
    ["깃발 문양 셋", rbP(P.group.p), rbN(P.group.gold) + " 조각"],
    ["진영 문장 셋", rbP(P.faction.p), rbN(P.faction.gold) + " 조각"],
    ["세 진영 문장이 모두 다름", rbP(P.card.p), "카드 1장"],
    ["그 밖", rbP(1 - P.group.p - P.faction.p - P.card.p), "꽝"]] }; },
  /* 순례 첫 승 뽑기 */
  pilGamble: () => ({ cols: ["등급", "확률"], rows: Object.keys(PILGRIM.gamble).map(g => [rbChip(g), rbP(PILGRIM.gamble[g])]) }),
  /* 순례 한 주 이정표 */
  pilSteps: () => ({ cols: ["한 주 걸음", "보상"], rows: Object.keys(PILGRIM.steps).map(k => { const s = PILGRIM.steps[k], out = [];
    if (s.gold) out.push(rbN(s.gold) + " 조각");
    if (s.card) { const ks = Object.keys(s.card); out.push(ks.length === 1 && s.card[ks[0]] >= 1 ? `${rbG(ks[0])} 카드 1장` : "카드 1장 — " + ks.map(g => `${rbG(g)} ${rbP(s.card[g])}`).join(" · ")); }
    return [`${k}걸음`, out.join(" + ")]; }) }),
  /* 대전 방식마다 조각 배수 */
  modes: () => ({ cols: ["대전", "조각 배수", "더 받는 것"], rows: [
    ["컴퓨터와 대전", rbP(ECON.rate.ai), "이기면 내 깃발 카드 1장(낮은 레벨이 잘 나옴) · 수레바퀴 표 1장"],
    ["성로 순례", rbP(PILGRIM.battleRate), "수레바퀴 표 1장 · 순례 보상"],
    ["온라인 대전", rbP(ECON.rate.online), `같은 상대와는 하루 ${REWARD.pairDaily}판까지 보상`]] })
};

/* ---------- ③ 글 ---------- */
const RULEBOOK = [
  { id: "world", t: "세계와 컨셉", en: "The World", sum: "세 진영 · 깃발 · 에테르, 이기는 법",
    parts: [
      { p: "카일란 대륙에는 **{world.factions}개 진영**이 있고, 진영마다 깃발(단체)이 셋씩, 모두 **{world.flags}개 깃발**이 있습니다. 모험가는 깃발 하나의 카드로 덱을 짜서 싸웁니다." },
      { table: "factions" },
      { p: "대전은 덱 **{rules.deck}장**으로 합니다. 유닛을 전장 **{rules.slots}칸**에 세우고 마법 · 아이템으로 거들어, 상대 생명 **{rules.life}**을 먼저 다 깎으면 이깁니다." },
      { p: "카드를 내는 힘은 **에테르**입니다. 매 턴 위대한 정수가 {rules.essence}을 주고, 핸드 카드를 결정으로 바꾸면 에테르가 늘어납니다(최대 {rules.etherMax})." },
      { tip: "실제로 두는 법은 튜토리얼, 자세한 규칙은 [[mn:flow|매뉴얼 '대전의 흐름']] · [[mn:ether|'에테르']] · [[mn:combat|'전투와 코인']]. 깃발 소개는 [[mn:world|매뉴얼 '세 진영 아홉 단체']]." }
    ] },

  { id: "cards", t: "카드와 등급", en: "Cards & Grades", sum: "카드 종류와 등급, 등급마다 덱에 넣는 장수",
    parts: [
      { p: "카드는 **유닛 · 마법 · 아이템** 세 종류입니다. 지금 게임에 쓰이는 카드는 {cards.total}종, 등급은 {cards.grades}가지입니다." },
      { table: "grades" },
      { li: ["희귀한 등급일수록 세고, 상점 값이 비싸고, 재고가 적습니다.",
             "**강화** 등급은 합성으로만 얻습니다 — [[rb:upgrade|합성소]].",
             "**유니크**는 한 덱에 {deck.uniqueKinds}종까지 넣을 수 있습니다."] },
      { tip: "카드 읽는 법은 [[mn:cards|매뉴얼 '카드']]." }
    ] },

  { id: "deck", t: "덱", en: "Decks", sum: "덱을 짜는 규칙과 덱 보호",
    parts: [
      { rows: [["장수", "정확히 **{rules.deck}장**."],
               ["같은 카드", "**{rules.copies}장**까지. 한 장만 되는 등급은 [[rb:cards|등급표]]."],
               ["깃발", "한 깃발의 카드만. 내가 가진 깃발만 덱을 짤 수 있습니다."],
               ["저장", "덱 조정실에서 저장해야 대전 · 순례에 나갑니다."],
               ["덱 보호", "저장한 덱 · 덱 초안에 든 장수는 팔거나, 거래에 걸거나, 합성 재료로 쓸 수 없습니다."]] },
      { tip: "덱을 짜는 요령은 [[mn:deck|매뉴얼 '덱 만들기']]." }
    ] },

  { id: "shop", t: "상점", en: "Shop", sum: "등급별 값 · 재고 · 판매",
    parts: [
      { p: "상단 띠의 **상점**에서 환석 조각으로 카드를 사고팝니다. 값은 등급으로 정해집니다." },
      { table: "shop" },
      { li: ["팔면 **산 값 그대로** 돌려받고, 카드는 상점 재고로 돌아갑니다.",
             "재고는 모든 모험가가 함께 씁니다. 다 팔리면 누가 팔 때까지 기다립니다.",
             "{shop.notSold} 카드는 상점에서 사고팔 수 없습니다.",
             "새로 나온 카드는 관리자가 공개해야 상점에 나옵니다. 기간 판매 카드도 있습니다.",
             "상점에서 산 카드를 그 깃발 덱 초안에 바로 넣을 수 있습니다."] }
    ] },

  { id: "upgrade", t: "합성소 — 강화 · 승화", en: "The Forge", sum: "같은 카드를 모아 더 좋은 카드로",
    parts: [
      { p: "상점 · 덱 조정실의 **합성소**에서 같은 카드를 합칩니다. 카드 오른쪽 끝의 작은 표식에 모은 장수가 보이고, 누르면 합성소가 열립니다." },
      { h: "강화 — {up.from} {up.cost}장 → 강화 카드" },
      { rows: [["재료", "같은 {up.from} 유닛 **{up.cost}장**. 재료는 사라집니다."],
               ["순례의 인장", "인장 **{up.seals}개**도 함께 씁니다. 인장은 [[rb:pilgrim|순례]]에서 얻습니다.", "opt"],
               ["결과", "그 카드의 강화판 한 장 — 레벨이 하나 오르고 스탯이 크게 오릅니다. 등급 **{up.grade}**, 어떤 아이템이든 장착."],
               ["대상", "강화판이 있는 카드만 ({up.kinds}종)."],
               ["제한", "한 장만 가질 수 있고 사고팔 수 없습니다. 덱에 넣는 장수는 [[rb:cards|등급표]]."]] },
      { h: "승화 — {fuse.from} {fuse.cost}장 → {fuse.to} 뽑기" },
      { rows: [["재료", "같은 {fuse.from} 카드 **{fuse.cost}장**. 재료는 사라집니다."],
               ["결과", "재료와 **같은 깃발**의 {fuse.to} 카드 한 장(확률 뽑기)."],
               ["빠지는 카드", "레거시 카드와 이미 최대 장수만큼 가진 카드는 나오지 않고, 그 몫은 나머지가 나눕니다."]] },
      { p: "센 카드일수록 덜 나옵니다. 가장 낮은 레벨과 견주면:" },
      { table: "fuseLevels" },
      { rows: [["{orb.name}", "승화에 하나를 함께 넣으면 그 깃발의 좋은 {fuse.to}만 나오고, **{orb.unique}** 확률로 {orb.uniqueGrade}가 나옵니다. [[rb:pachinko|파친코]]에서 낮은 확률로 얻습니다.", "opt"]] },
      { tip: "정확한 카드별 확률은 합성소의 「확률 보기」에서, 내가 가진 카드에 맞춰 보여 줍니다." }
    ] },

  { id: "pachinko", t: "파친코 · 수레바퀴", en: "Pachinko", sum: "작은 게임에서 나오는 것",
    parts: [
      { p: "문양 셋이 맞으면 상을 받습니다. 두 곳에서 같은 표로 굴립니다." },
      { rows: [["전장 파친코", "대전 중 전장 옆 작은 게임 상자. 라운드마다 한 번."],
               ["크로네아의 수레바퀴", "대기실. 컴퓨터와 대전 · 순례를 한 판 마칠 때마다 표 한 장."]] },
      { table: "pachinko" },
      { rows: [["{orb.name}", "한 번 돌릴 때마다 따로 **{orb.p}** — 하루 {orb.daily}개까지. [[rb:upgrade|승화]]에 씁니다.", "opt"],
               ["결정 키우기", "같은 상자의 다른 게임. {arcade.crystalTurns}라운드 이어서 물을 주면 {arcade.crystal} 조각. 한 번 거르면 처음부터."],
               ["하루 상한", "작은 게임으로 받는 조각은 하루 {arcade.daily} 조각까지."]] },
      { tip: "카드가 나왔는데 이미 최대 장수만큼 가졌다면 그 카드의 상점 값만큼 조각을 받습니다." }
    ] },

  { id: "pilgrim", t: "성로 순례", en: "Pilgrimage", sum: "하루 한 번 열리는 길과 그 보상",
    parts: [
      { p: "하루에 한 번(자정) 새 길이 열립니다. 내 깃발을 뺀 **{pil.gates}개 관문**을 차례로 지나고, 마지막 **망각의 숲**에서 내 덱을 든 \"비친 나\"와 싸웁니다." },
      { rows: [["판 수", "하루 **{pil.fights}판**까지(지는 판도 셈)."],
               ["상대", "컴퓨터(어려움). 관문은 내 덱 세기의 {pil.scale}, 망각의 숲은 {pil.forest}로 꾸민 덱."],
               ["판마다", "전투 조각 배수 {pil.rate}."],
               ["순례의 인장", "관문을 이길 때마다 {pil.sealWin}개, 숲을 지나면(하루 한 번) {pil.sealDone}개 더. [[rb:upgrade|강화]]에 씁니다.", "opt"],
               ["완주", "망각의 숲을 이기면 {pil.done} 조각."]] },
      { h: "그날 첫 승" },
      { p: "**{pil.first} 조각**을 받거나, 그 조각을 걸고 **카드 한 장**(꽝 없음)을 뽑습니다." },
      { table: "pilGamble" },
      { h: "한 주의 걸음" },
      { p: "{pil.resetDay} 0시에 새 주가 시작됩니다. 첫 승을 한 날마다 한 걸음." },
      { table: "pilSteps" },
      { tip: "관문을 처음 지나면 그 깃발의 소문이 순례기에 남습니다." }
    ] },

  { id: "modes", t: "대전 방식과 보상", en: "Duels & Rewards", sum: "컴퓨터 · 순례 · 온라인, 판이 끝나면 받는 것",
    parts: [
      { p: "판마다 받는 환석 조각은 서버가 정합니다. 기본 셈은 모든 대전에 같고, 방식마다 배수가 다릅니다." },
      { rows: [["부서질 때", "카드가 싸워서 부서질 때마다 그 카드 값의 {econ.break}."],
               ["판이 끝나면", "부서진 카드(양쪽) 값의 합 × {econ.win}(승리) 또는 × {econ.lose}(패배)."],
               ["카드 값", "레벨 × {econ.unitPerLv}(유닛), 아이템은 × {econ.itemMul}, 마법은 × {econ.spellMul}."],
               ["행운", "판이 끝날 때마다 {econ.luckyCard}로 카드 한 장, {econ.luckyGold.p}로 {econ.luckyGold} 조각."],
               ["하루 상한", "보상을 받는 판은 하루 {reward.daily}판까지."]] },
      { p: "위 두 줄(부서질 때 · 판이 끝나면)에 방식마다 배수를 곱합니다." },
      { table: "modes" },
      { tip: "경험치는 배수 없이 원래 값 그대로 쌓입니다. 온라인 대전은 방 코드로 친구와 이어 각자의 기기에서 합니다." }
    ] },

  { id: "quests", t: "퀘스트", en: "Quests", sum: "매일 · 매주 받는 일거리",
    parts: [
      { rows: [["일일 퀘스트", "하루 {quest.daily}개. 마치면 {quest.dailyGold} 조각."],
               ["주간 퀘스트", "한 주 {quest.weekly}개. 마치면 {quest.weeklyGold} 조각."],
               ["그 밖", "업적 · 칭호 · 깃발 도감 보상도 퀘스트 화면에 있습니다."]] },
      { tip: "서버가 확인한 판만 셉니다." }
    ] },

  { id: "trade", t: "교역소", en: "Trading Post", sum: "모험가끼리 카드 · 조각 맞바꾸기",
    parts: [
      { rows: [["교환 제안", "내놓을 것과 원하는 것을 올리고 기한({trade.durations})을 정합니다. 한쪽에 카드 {trade.maxCards}장까지."],
               ["경매", "다음 입찰은 최고가 + {trade.step}(최소 {trade.stepMin} 조각). 밀린 입찰은 바로 돌려받습니다."],
               ["실시간 거래", "방 코드로 친구와 이어 바로 맞바꿉니다."],
               ["올려 두기", "한 사람이 동시에 {trade.maxOpen}건까지."],
               ["새 모험가", "등록하고 {trade.newHours}시간이 지나고 대전 {trade.newMatches}판을 마쳐야 거래할 수 있습니다."]] },
      { tip: "거래로 오간 조각은 경험치가 되지 않습니다." }
    ] },

  { id: "legacy", t: "레거시 카드", en: "Legacy Cards", sum: "게임에서 빠진 카드",
    parts: [
      { p: "카드 정리로 게임에서 빠진 카드를 **레거시**라 부릅니다(지금 {legacy.count}장)." },
      { li: ["레거시 카드는 어떤 덱에도 넣을 수 없고, 합성 재료 · 결과로도 쓰이지 않습니다.",
             "가지고 있던 레거시 카드는 상점 값만큼 조각으로 돌려받습니다.",
             "덱에 있던 자리는 같은 깃발 · 같은 종류의 가진 카드로 채워집니다."] }
    ] },

  { id: "account", t: "계정 — 등록 · 필멸자", en: "Accounts", sum: "등록한 모험가와 로그인 없이 들어온 계정",
    parts: [
      { rows: [["등록", "이름과 암호를 정하고, 깃발을 **{acct.freeFlags}개까지** 무료로 고릅니다(진영마다 하나까지). 고른 깃발마다 기본 덱을 받고, 지갑에는 {acct.startGold} 조각."],
               ["{acct.guest}", "로그인 없이 시작한 계정. 모든 깃발과 카드를 쓸 수 있지만 거래 · 합성은 할 수 없습니다."],
               ["레벨", "벌어들인 조각이 곧 경험치입니다(사도 줄지 않음, 판매 · 거래로 받은 조각은 빼고). 최대 Lv {level.max}."]] }
    ] }
];

/* ---------- 글 → HTML (브라우저 · node 검사가 같이 씀) ---------- */
const rbEsc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
/* 글 한 줄: 값을 채운다. 못 채운 값이 있으면 null */
function rbFill(s, miss) {
  let bad = false;
  const out = String(s).replace(/\{([\w.]+)\}/g, (m, k) => { const v = rbVal(k); if (v == null) { bad = true; if (miss) miss.push(k); return m; } return rbEsc(v); });
  if (bad) return null;
  return out.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/\[\[(mn|rb):([\w-]+)\|(.+?)\]\]/g, (m, kind, id, label) => `<a href="#" class="rb-link" data-${kind}="${id}">${label}</a>`);
}
function rbTable(name, miss) {
  const f = RB_TABLES[name]; let T = null;
  try { T = f && f(); } catch (e) { T = null; }
  if (!T || !T.rows || !T.rows.length || T.rows.some(r => r.some(x => x == null || /undefined|NaN/.test(String(x))))) { if (miss) miss.push("표:" + name); return ""; }
  return `<div class="rb-tbl"><table class="mn-table rb-data"><thead><tr>${T.cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>${T.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
/* 한 섹션의 본문. miss를 주면 못 채운 값 이름을 모은다(opt 줄은 모으지 않음) */
function rbSectionHTML(S, miss) {
  const req = s => rbFill(s, miss);
  const opt = s => rbFill(s, null);
  return S.parts.map(P => {
    if (P.p) { const x = req(P.p); return x == null ? "" : `<p>${x}</p>`; }
    if (P.h) { const x = req(P.h); return x == null ? "" : `<h3>${x}</h3>`; }
    if (P.tip) { const x = req(P.tip); return x == null ? "" : `<p class="mn-tip">${x}</p>`; }
    if (P.li) return `<ul class="mn-ul">${P.li.map(req).filter(x => x != null).map(x => `<li>${x}</li>`).join("")}</ul>`;
    if (P.table) return rbTable(P.table, miss);
    if (P.rows) {
      const rows = P.rows.map(([k, v, o]) => { const f = o === "opt" ? opt : req, a = f(k), b = f(v); return a == null || b == null ? "" : `<tr><th>${a}</th><td>${b}</td></tr>`; }).join("");
      return rows ? `<table class="mn-table rb-rows">${rows}</table>` : "";
    }
    return "";
  }).join("");
}

/* ---------- 화면 (브라우저에서만) ---------- */
const RulebookUI = (() => {
  const icon = '<svg class="m-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h11v13.5a2.5 2.5 0 01-2.5 2.5H6"/><path d="M7 4a2 2 0 00-2 2v1.5h2M6 20a2 2 0 002-2V4"/><path d="M10.5 9h4.5M10.5 12h4.5M10.5 15h3"/></svg>';   /* 두루마리 = 룰북 */
  function html() {
    return `<div class="man rb" role="dialog" aria-modal="true" aria-label="ETHERION 룰북">
      <header class="man-head"><p class="hx-eyebrow">THE BOOK OF RULES</p><h2>룰북</h2><button type="button" class="hx-x" data-close aria-label="닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></header>
      <div class="man-body">
        <nav class="man-toc" aria-label="목차">
          <label class="man-find"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg><input type="search" placeholder="찾기 — 예: 승화, 인장" aria-label="룰북에서 찾기"></label>
          <ol>${RULEBOOK.map((s, i) => `<li><a href="#rb-${s.id}" data-go="${s.id}"><span class="no">${String(i + 1).padStart(2, "0")}</span><span class="tt">${s.t}<small>${s.en}</small></span></a></li>`).join("")}</ol>
          <p class="man-none" hidden>찾는 말이 없습니다.</p>
        </nav>
        <div class="man-page rb-page" tabindex="0">
          <p class="rb-intro">게임의 짜임을 섹션별로 모았습니다. 제목을 누르면 펼쳐집니다. 숫자는 지금 게임의 값을 그대로 읽어 옵니다. <button type="button" class="rb-all">모두 펼치기</button></p>
          ${RULEBOOK.map((s, i) => `<details class="rb-sec" id="rb-${s.id}" data-ch="${s.id}"><summary><span class="no">${String(i + 1).padStart(2, "0")}</span><span class="rb-t"><b>${s.t}</b><small>${rbEsc(s.sum || "")}</small></span></summary><div class="rb-body">${rbSectionHTML(s)}</div></details>`).join("")}
          <p class="mn-end">— 끝 —</p>
        </div>
      </div>
    </div>`;
  }
  function open(id) {
    const w = Help.openWin("help-manual help-rulebook", html());
    const page = w.querySelector(".rb-page"), toc = w.querySelector(".man-toc");
    const links = [...toc.querySelectorAll("[data-go]")], secs = [...page.querySelectorAll(".rb-sec")];
    const setOn = k => links.forEach(a => a.classList.toggle("on", a.dataset.go === k));
    const go = k => { const s = page.querySelector("#rb-" + k); if (!s) return; s.open = true; page.scrollTop = s.offsetTop - 8; setOn(k); };
    toc.addEventListener("click", e => { const a = e.target.closest("[data-go]"); if (!a) return; e.preventDefault(); if (!a.closest("li").hidden) go(a.dataset.go); });
    page.addEventListener("toggle", e => { if (e.target.open) setOn(e.target.dataset.ch); }, true);
    page.addEventListener("click", e => {
      const a = e.target.closest(".rb-link");
      if (a) { e.preventDefault(); if (a.dataset.rb) go(a.dataset.rb); else if (a.dataset.mn) Help.Manual.open(a.dataset.mn); return; }
      const all = e.target.closest(".rb-all");
      if (all) { const on = secs.some(s => !s.open); secs.forEach(s => { s.open = on; }); all.textContent = on ? "모두 접기" : "모두 펼치기"; }
    });
    const inp = toc.querySelector("input"), none = toc.querySelector(".man-none");
    inp.addEventListener("input", () => {
      const q = inp.value.trim().toLowerCase(); let shown = 0;
      secs.forEach((s, i) => { const hit = !q || s.textContent.toLowerCase().includes(q); s.hidden = !hit; links[i].closest("li").hidden = !hit; if (hit) { shown++; if (q) s.open = true; } });
      none.hidden = shown > 0; page.scrollTop = 0;
    });
    requestAnimationFrame(() => { if (id) go(id); else setOn(RULEBOOK[0].id); });
    page.focus({ preventScroll: true });
  }
  return { open, icon };
})();

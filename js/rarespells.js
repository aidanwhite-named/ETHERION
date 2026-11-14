/* ETHERION — 레어 마법 (v3.24)
   깃발마다 3장, 모두 27장: 공격 마법 1 · 방어 마법 1 · 공용 마법 1. 그리고 v3.24.2에 유니크에서 내려온 그림자 계약(US-A1-2) — 모두 28장. 상점(재고 50) · 원정 · 전투 보상으로 얻는다.
   pincards.js 다음, decks.js · cards.js 앞에 읽는다(균형 도구가 data.js를 다시 써도 이 파일은 그대로 남는다). 등급은 js/grades.js가 여기 표(RARE_GRADES)를 읽는다.
   기본 덱(js/decks.js)에는 넣지 않는다. 새 모험가의 시작 카드에도 들어가지 않는다(js/store.js isHighGrade). 덱에는 다른 일반 카드처럼 4장까지.

   설계 기준 (docs/GRADES.md 2장 — 마법 레어 = 환산 레벨 +0.6쯤)
   - 효과는 모두 지금 엔진에 있는 것만 쓴다(새 효과 없음). 그 깃발의 강점 · 원소(docs/WORLD.md 6장)를 그대로 키운 꼴.
   - 레벨은 깃발마다 3 · 4 · 5를 하나씩. 공격 = 내 공격 턴에만, 방어 = 내 방어 턴에만, 공용 = 어느 턴에든.
   - 잰 값: 마법 실험실(tools/highcards/lab_rare.js, 섬멸전 2,000판, 같은 판에서 같은 레벨 일반 · 고급 마법과 비교).
       ① 같은 깃발 · 같은 레벨의 일반 · 고급 마법보다 모두 위(v3.24.1, 클래스를 잡는 고급 파문 · 침묵만 예외) — 두 판 묶음(시드 4242 · 777) 모두에서.
       ② 그 밖에는 같은 레벨 기존 마법보다 표준편차 약 1개 위(3레벨 12.5~15.5 · 4레벨 12.7~15.5 · 5레벨 16~20, 기존 평균 8.9 · 8.9 · 11.5).
       표와 고친 과정은 docs/RARESPELLS_v3.24.md
   이름은 새 고유명사 없이, 6글자 이하(띄어쓰기 제외). */
"use strict";

const RS_ALL = { t: "all" };
const RARE_SPELLS = [
  /* ---------- B1 잿불 고블린 — 화염 · 광역 화력 · 쏜 뒤 장전 ---------- */
  { id: "RS-B1-1", n: "불바다", g: "B1", camp: "B", lv: 3, kind: "atk",
    text: "상대 유닛 전체에게 피해 3. 상대 맨 앞 2기는 피해 3 더. [장전 1]",
    ops: [{ op: "dmg", side: "foe", area: RS_ALL, x: 3 }, { op: "dmg", side: "foe", area: { t: "front", n: 2 }, x: 3 }], cost: { ether: 1 },
    brief: "{적 전체} 피해3|{적 앞2} 피해3 더",
    desc: "포르탄 포병단은 계산하지 않는다. 화약을 있는 대로 쏟아붓고, 남은 것은 다음 날 다시 채운다." },
  { id: "RS-B1-2", n: "매설 지뢰", g: "B1", camp: "B", lv: 1, kind: "def",
    text: "상대 맨 앞 2기에게 피해 2.",
    ops: [{ op: "dmg", side: "foe", area: { t: "front", n: 2 }, x: 2 }],
    brief: "{적 앞2} 피해2",
    desc: "톱니 고개로 오르는 길에는 고블린만 아는 돌이 있다. 밟지 말아야 할 돌이다." },
  { id: "RS-B1-3", n: "불씨 탄막", g: "B1", camp: "B", lv: 2, kind: "com",
    text: "상대 유닛 전체에게 피해 1 +1C. 그 가운데 공격이 가장 높은 1기는 피해 2 더.",
    ops: [{ op: "dmg", side: "foe", area: RS_ALL, x: 1, coin: [1, 1] }, { op: "dmg", side: "foe", area: { t: "maxA", n: 1 }, x: 2 }],
    brief: "{적 전체} 피해1 +1C|{적 최강1} 피해2 더",
    desc: "도르마크의 심장불을 한 줌씩 나눠 담은 탄. 흩어진 불씨는 가장 크게 칼을 든 자에게 모여든다." },

  /* ---------- B2 무쇠수염 드워프 — 금속 · 단단함 · 골렘 (저주에 약함을 막는다) ---------- */
  { id: "RS-B2-1", n: "파쇄 망치", g: "B2", camp: "B", lv: 2, kind: "atk",
    text: "상대 맨 앞 2기 방어 −2, 피해 2.",
    ops: [{ op: "mod", side: "foe", area: { t: "front", n: 2 }, d: -2 }, { op: "dmg", side: "foe", area: { t: "front", n: 2 }, x: 2 }],
    brief: "{적 앞2} ⛨−2 피해2",
    desc: "두르크하임의 장인은 갑옷을 만들 줄 알기에 부술 줄도 안다. 이음매 하나만 치면 된다." },
  { id: "RS-B2-2", n: "골렘 방진", g: "B2", camp: "B", lv: 1, kind: "def",
    text: "아군 전체 방어 +1, 체력 +2, [가호 2], [저주 면역].",
    ops: [{ op: "mod", side: "ally", area: RS_ALL, d: 1, h: 2 }, { op: "grant", side: "ally", area: RS_ALL, ward: 2 }, { op: "lock", side: "ally", area: RS_ALL }],
    brief: "{아군 전체} ⛨+1 ♥+2|{아군 전체} [가호 2] [저주 면역]",
    desc: "골렘들이 어깨를 맞대면 철골 산맥의 한 자락이 된다. 주문 따위가 비집고 들 틈은 없다." },
  { id: "RS-B2-3", n: "리벳 폭풍", g: "B2", camp: "B", lv: 3, kind: "com",
    text: "아군 전체 방어 +1, 체력 +1. 상대 유닛 전체 방어 −1, 피해 2.",
    ops: [{ op: "mod", side: "ally", area: RS_ALL, d: 1, h: 1 }, { op: "mod", side: "foe", area: RS_ALL, d: -1 }, { op: "dmg", side: "foe", area: RS_ALL, x: 2 }],
    brief: "{아군 전체} ⛨+1 ♥+1|{적 전체} ⛨−1 피해2",
    desc: "공방의 리벳 기계가 한꺼번에 뒤집혔다. 박힐 곳을 찾던 리벳은 아군 갑옷에 박히고, 적의 갑옷은 뚫고 지나간다." },
  /* v3.62.1 네 번째 B2 레어(깃발마다 3장 규칙의 예외): 과부하 가동(NB2-1, 자기 방어만큼 공격)을 진형 전체로 키운 꼴. 효과 dsumA는 js/engine.js SPELL_OPS */
  { id: "RS-B2-4", n: "철벽 진격", g: "B2", camp: "B", lv: 4, kind: "atk",
    text: "아군 유닛 전체 방어 +1. 그 뒤 아군 유닛 전체의 방어를 모두 더한 값만큼, 아군 맨 앞 유닛부터 공격이 오른다 — 한 기 뒤로 갈 때마다 1씩 줄어든다.",
    ops: [{ op: "mod", side: "ally", area: RS_ALL, d: 1 }, { op: "dsumA", step: 1 }],
    brief: "{아군 전체} ⛨+1|{아군 전체} ⚔ + ⛨ 합 (앞부터 −1씩)",
    desc: "방패를 맞댄 두르크하임의 진은 물러서는 법이 없다. 앞으로 쏠리는 순간, 뒤에 선 모두의 무게가 맨 앞 방패를 망치로 만든다." },

  /* ---------- B3 번개 노움 — 번개 · 충전과 장치 · 코인 ---------- */
  { id: "RS-B3-1", n: "축전 해방", g: "B3", camp: "B", lv: 2, kind: "atk",
    text: "상대 대기열 맨 앞부터 차례로 피해 2 → 2 → 2.",
    ops: [{ op: "chain", xs: [2, 2, 2] }],
    brief: "{적 앞부터} 차례로 피해 2→2→2",
    desc: "볼타리움의 축전병 세 개를 한 줄로 이었다. 번개는 줄어들지 않고 다음 병으로 건너간다." },
  { id: "RS-B3-2", n: "감전 덫", g: "B3", camp: "B", lv: 3, kind: "def",
    text: "상대 유닛 전체 공격 −2, 피해 1 +1C×2.",
    ops: [{ op: "mod", side: "foe", area: RS_ALL, a: -2 }, { op: "dmg", side: "foe", area: RS_ALL, x: 1, coin: [2, 1] }],
    brief: "{적 전체} ⚔−2|{적 전체} 피해1 +1C×2",
    desc: "노움의 공방 문턱에는 구리선이 깔려 있다. 넘어온 자의 칼은 손에서 저절로 떨어진다." },
  { id: "RS-B3-3", n: "충전 완료", g: "B3", camp: "B", lv: 1, kind: "com",
    text: "이번 턴 아군 유닛의 코인: + 코인은 모두 앞면, − 코인은 모두 뒷면. 상대 맨 앞 2기에게 피해 2 +1C.",
    ops: [{ op: "fate" }, { op: "dmg", side: "foe", area: { t: "front", n: 2 }, x: 2, coin: [1, 1] }],
    brief: "{아군} 코인 모두 유리하게|{적 앞2} 피해2 +1C",
    desc: "눈금이 끝까지 찼다. 이런 날의 노움 장치는 한 번도 빗나가지 않는다." },

  /* ---------- G1 바위주먹 오크 — 대지 · 힘 · 늑대를 탐 · 몰릴수록 격노 ---------- */
  { id: "RS-G1-1", n: "늑대 기습", g: "G1", camp: "G", lv: 1, kind: "atk",
    text: "상대 맨 앞 유닛에게 피해 2. 아군 뒤 2칸의 유닛 공격 +1, [관통].",
    ops: [{ op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 2 }, { op: "mod", side: "ally", area: { t: "back", n: 2 }, a: 1 }, { op: "grant", side: "ally", area: { t: "back", n: 2 }, ab: { shred: 1 } }],
    brief: "{적 앞1} 피해2|{아군 뒤2} ⚔+1 [관통]",
    desc: "울부짖는 초원의 늑대가 먼저 물어뜯고, 그 등에 탄 오크가 벌어진 갑옷을 마저 찢는다." },
  { id: "RS-G1-2", n: "궁지의 포효", g: "G1", camp: "G", lv: 2, kind: "def",
    text: "아군 전체 공격 +3, 방어 +1, 체력 +2.",
    ops: [{ op: "mod", side: "ally", area: RS_ALL, a: 3, d: 1, h: 2 }],
    brief: "{아군 전체} ⚔+3 ⛨+1 ♥+2",
    desc: "가르운의 오크를 벼랑 끝까지 몰지 마라. 거기서부터가 그들의 싸움이다." },
  { id: "RS-G1-3", n: "대지 가르기", g: "G1", camp: "G", lv: 3, kind: "com",
    text: "상대 맨 앞 유닛 방어 −1. 상대 유닛 전체에게 물리 피해 3. 아군 전체 공격 +1.",
    ops: [{ op: "mod", side: "foe", area: { t: "front", n: 1 }, d: -1 }, { op: "dmg", side: "foe", area: RS_ALL, x: 3, phys: true }, { op: "mod", side: "ally", area: RS_ALL, a: 1 }],
    brief: "{적 앞1} ⛨−1|{적 전체} 물리 피해3|{아군 전체} ⚔+1",
    desc: "주먹 하나로 땅을 갈랐다는 오크의 노래는 과장이 아니다. 고르바스가 그 주먹을 허락했을 뿐이다." },

  /* ---------- G2 이끼 트롤 — 숲 · 재생 · 가시 ---------- */
  { id: "RS-G2-1", n: "뿌리 습격", g: "G2", camp: "G", lv: 2, kind: "atk",
    text: "상대 뒤 3칸의 유닛에게 피해 2. 아군 뒤 2칸의 유닛 체력 +2.",
    ops: [{ op: "dmg", side: "foe", area: { t: "back", n: 3 }, x: 2 }, { op: "mod", side: "ally", area: { t: "back", n: 2 }, h: 2 }],
    brief: "{적 뒤3} 피해2|{아군 뒤2} ♥+2",
    desc: "땅 밑을 기어간 뿌리는 적의 뒤에서 솟는다. 빨아올린 것은 고스란히 아군의 수액이 된다." },
  { id: "RS-G2-2", n: "가시 덤불", g: "G2", camp: "G", lv: 1, kind: "def",
    text: "아군 맨 앞 2기 체력 +3, [가시 2].",
    ops: [{ op: "mod", side: "ally", area: { t: "front", n: 2 }, h: 3 }, { op: "thorns", side: "ally", area: { t: "front", n: 2 }, x: 2 }],
    brief: "{아군 앞2} ♥+3 [가시 2]",
    desc: "실바니엘 바깥 숲길은 하룻밤 사이에 덤불로 닫힌다. 베고 들어온 자는 벤 만큼 찔린다." },
  { id: "RS-G2-3", n: "끈질긴 이끼", g: "G2", camp: "G", lv: 3, kind: "com",
    text: "아군 전체 체력 +2, [불굴]. 상대 유닛 전체에게 피해 1.",
    ops: [{ op: "mod", side: "ally", area: RS_ALL, h: 2 }, { op: "endure", side: "ally", area: RS_ALL }, { op: "dmg", side: "foe", area: RS_ALL, x: 1 }],
    brief: "{아군 전체} ♥+2 [불굴]|{적 전체} 피해1",
    desc: "트롤의 몸을 덮은 이끼는 주인이 쓰러지는 것을 허락하지 않는다. 날리는 포자는 적의 숨을 막는다." },

  /* ---------- G3 푸른비늘 인어 — 물 · 치유 · 강화를 씻어 내는 노래 ---------- */
  { id: "RS-G3-1", n: "작살 물살", g: "G3", camp: "G", lv: 1, kind: "atk",
    text: "상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 피해 3. 내 생명 +1.",
    ops: [{ op: "strip", side: "foe", area: { t: "front", n: 1 } }, { op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 3 }], gain: { life: 1 },
    brief: "{적 앞1} 해제 · 피해3 · 생명 +1",
    desc: "물살을 타고 날아간 작살은 방패도 축복도 씻어 내고 박힌다. 셀레네아의 사냥꾼은 두 번 던지지 않는다." },
  { id: "RS-G3-2", n: "포말 장막", g: "G3", camp: "G", lv: 2, kind: "def",
    text: "아군 맨 앞 유닛에게 [보호막]. 아군 전체 체력 +1. 내 생명 +2.",
    ops: [{ op: "shield", side: "ally", area: { t: "front", n: 1 } }, { op: "mod", side: "ally", area: RS_ALL, h: 1 }], gain: { life: 2 },
    brief: "{아군 앞1} [보호막]|{아군 전체} ♥+1 · 내 생명 +2",
    desc: "샘물 무녀단이 부르는 물거품의 노래. 첫 칼날은 거품에 미끄러지고, 상처는 물방울에 닫힌다." },
  { id: "RS-G3-3", n: "밀물의 노래", g: "G3", camp: "G", lv: 3, kind: "com",
    text: "상대 유닛 전체의 코인이 뒷면이 된다(이미 정해진 코인은 그대로). 상대 유닛 전체에게 피해 2. 아군 전체 체력 +1. 내 생명 +1.",
    ops: [{ op: "clean", side: "foe", area: RS_ALL }, { op: "dmg", side: "foe", area: RS_ALL, x: 2 }, { op: "mod", side: "ally", area: RS_ALL, h: 1 }], gain: { life: 1 },
    brief: "{적 전체} 코인 뒷면 · 피해2|{아군 전체} ♥+1|{나} 생명 +1",
    desc: "마렌시아의 바다가 차오르는 시각에 맞춰 부르는 노래. 밀려온 물은 적의 운을 쓸어 가고 아군의 발을 적신다." },

  /* ---------- A1 심연 마족 — 암흑 · 피를 바쳐 얻는 일격 ---------- */
  { id: "RS-A1-1", n: "피의 창", g: "A1", camp: "A", lv: 2, kind: "atk",
    text: "생명 2를 내고, 상대 유닛 중 공격이 가장 높은 1기에게 피해 6.",
    ops: [{ op: "dmg", side: "foe", area: { t: "maxA", n: 1 }, x: 6 }], cost: { life: 2 },
    brief: "{대가} 생명 2|{적 최강1} 피해6",
    desc: "제 피를 굳혀 벼린 창. 녹타르의 계약자는 가장 위험한 적부터 꿰뚫는다." },
  { id: "RS-A1-2", n: "흡혈 장막", g: "A1", camp: "A", lv: 1, kind: "def",
    text: "상대 맨 앞 2기 공격 −4. 실제로 깎인 만큼을 합쳐 아군 맨 앞 유닛 공격 +, 그 유닛 체력 +2.",
    ops: [{ op: "drain", area: { t: "front", n: 2 }, x: 4 }, { op: "mod", side: "ally", area: { t: "front", n: 1 }, h: 2 }],
    brief: "{적 앞2} ⚔−4|{아군 앞1} ⚔ + 깎인 만큼 ♥+2",
    desc: "모르크 협곡의 그림자는 다가오는 자의 힘을 빨아 문지기에게 먹인다. 대가는 늘 상대가 치른다." },
  { id: "RS-A1-3", n: "피의 저주", g: "A1", camp: "A", lv: 3, kind: "com",
    text: "생명 2를 내고, 상대 유닛 전체 방어 −1, 피해 3.",
    ops: [{ op: "mod", side: "foe", area: RS_ALL, d: -1 }, { op: "dmg", side: "foe", area: RS_ALL, x: 3 }], cost: { life: 2 },
    brief: "{대가} 생명 2|{적 전체} ⛨−1 피해3",
    desc: "모르카스의 저울에 피 한 방울을 올리면, 맞은편 접시의 모든 목숨이 조금씩 가벼워진다." },

  /* v3.24.2 유니크에서 내려온 카드 — 카드 ID는 유니크 때 그대로(US-A1-2), 덱 1장 제한이 풀려 다른 레어처럼 4장까지.
     유니크 때(생명 1, 뒤 3칸 공 +3 [치명] [연쇄])는 실험실 13.4 · 대전 값 −3.4로 같은 깃발 일반 마법보다도 낮아, 먼저 치는 피해 3을 붙였다 */
  { id: "US-A1-2", n: "그림자 계약", g: "A1", camp: "A", lv: 1, kind: "atk",
    text: "생명 1을 내고, 상대 유닛 중 공격이 가장 높은 1기에게 피해 3. 아군 뒤 3칸의 유닛 공격 +3, [치명], [연쇄].",
    ops: [{ op: "dmg", side: "foe", area: { t: "maxA", n: 1 }, x: 3 }, { op: "mod", side: "ally", area: { t: "back", n: 3 }, a: 3 }, { op: "grant", side: "ally", area: { t: "back", n: 3 }, ab: { crit: 1, chain: 1 } }], cost: { life: 1 },
    brief: "{적 최강1} 피해3 · 대가 생명 1|{아군 뒤3} ⚔+3 [치명] [연쇄]",
    desc: "그림자 없는 아즈라가 처음 맺었다는 계약의 사본. 원본에 무엇을 걸었는지는 적혀 있지 않다." },

  /* ---------- A2 성광 천족 — 빛 · 대신 맞는 날개 · 보호막 ---------- */
  { id: "RS-A2-1", n: "새벽 돌격", g: "A2", camp: "A", lv: 2, kind: "atk",
    text: "상대 맨 앞 유닛에게 피해 2. 아군 뒤 3칸의 유닛 공격 +2, [마력 공격 2].",
    ops: [{ op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 2 }, { op: "mod", side: "ally", area: { t: "back", n: 3 }, a: 2 }, { op: "grant", side: "ally", area: { t: "back", n: 3 }, ab: { magic: 2 } }],
    brief: "{적 앞1} 피해2|{아군 뒤3} ⚔+2 [마력 공격 2]",
    desc: "새벽성 엘라드의 기사들은 해가 뜨는 쪽에서 달려 나온다. 첫 햇살이 적의 눈을 멀게 하고, 창끝은 갑옷의 틈을 찾는다." },
  { id: "RS-A2-2", n: "수호 날개", g: "A2", camp: "A", lv: 3, kind: "def",
    text: "아군 중 가장 단단한 유닛이 맨 앞으로 나선다([수호]). 그 유닛 방어 +2, [보호막]. 아군 전체 방어 +1, 체력 +1.",
    ops: [{ op: "guard", d: 2 }, { op: "shield", side: "ally", area: { t: "front", n: 1 } }, { op: "mod", side: "ally", area: RS_ALL, d: 1, h: 1 }],
    brief: "{아군 수호1} ⛨+2 [보호막]|{아군 전체} ⛨+1 ♥+1",
    desc: "황혼의 장벽을 지키는 천족은 동료 앞에 날개를 편다. 그 날개 뒤에서는 누구도 먼저 쓰러지지 않는다." },
  { id: "RS-A2-3", n: "빛의 결계", g: "A2", camp: "A", lv: 1, kind: "com",
    text: "아군 맨 앞 유닛에게 [보호막]. 상대 맨 앞 유닛 공격 −3, 피해 1.",
    ops: [{ op: "shield", side: "ally", area: { t: "front", n: 1 } }, { op: "mod", side: "foe", area: { t: "front", n: 1 }, a: -3 }, { op: "dmg", side: "foe", area: { t: "front", n: 1 }, x: 1 }],
    brief: "{아군 앞1} [보호막]|{적 앞1} ⚔−3 피해1",
    desc: "솔란테에게 맹세한 자 앞에 빛의 원이 그려진다. 그 원을 넘는 칼은 빛에 눈이 멀어 힘을 잃는다." },

  /* ---------- A3 폭풍 하이엘프 — 바람 · 마법 재능 ---------- */
  { id: "RS-A3-1", n: "칼바람", g: "A3", camp: "A", lv: 1, kind: "atk",
    text: "상대 무작위 유닛에게 피해 2를 2번.",
    ops: [{ op: "multi", side: "foe", n: 2, x: 2 }],
    brief: "{적 무작위} 피해2 ×2번",
    desc: "폭풍탑의 견습생이 처음 배우는 주문. 그러나 하이엘프의 견습생은 이미 다른 종족의 대마법사다." },
  { id: "RS-A3-2", n: "역풍 장벽", g: "A3", camp: "A", lv: 2, kind: "def",
    text: "상대 맨 앞 3기 공격 −3, 피해 1.",
    ops: [{ op: "mod", side: "foe", area: { t: "front", n: 3 }, a: -3 }, { op: "dmg", side: "foe", area: { t: "front", n: 3 }, x: 1 }],
    brief: "{적 앞3} ⚔−3 피해1",
    desc: "바늘탑을 오르려는 자는 거꾸로 부는 바람을 먼저 만난다. 내지른 칼은 제 얼굴로 돌아온다." },
  { id: "RS-A3-3", n: "회오리 칼날", g: "A3", camp: "A", lv: 3, kind: "com",
    text: "상대 무작위 유닛에게 피해 2를 3번. 상대 유닛 전체 공격 −1.",
    ops: [{ op: "multi", side: "foe", n: 3, x: 2 }, { op: "mod", side: "foe", area: RS_ALL, a: -1 }],
    brief: "{적 무작위} 피해2 ×3번|{적 전체} ⚔−1",
    desc: "벨루미르의 바늘 꼭대기에서 내려온 회오리. 안에 든 바람의 칼날은 셀 수 없고, 휘말린 자는 서 있지도 못한다." }
];

/* 등급: 모두 레어 (js/grades.js가 읽는다). 짧은 문구는 SPELL_BRIEF에 */
const RARE_GRADES = {};
(function () {
  for (const s of RARE_SPELLS) {
    const c = Object.assign({}, s); delete c.brief;
    SIM_SPELLS.push(c); RARE_GRADES[s.id] = "rare";
    if (typeof SPELL_BRIEF !== "undefined" && s.brief) SPELL_BRIEF[s.id] = s.brief;
  }
})();

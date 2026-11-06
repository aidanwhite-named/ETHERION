/* ETHERION — 카드 등급 (v1.6)
   등급은 여섯: 일반 · 고급 · 레어 · 에픽 · 유니크 · 스페셜. 등급이 높을수록 같은 레벨이라도 스탯·특수능력·마법 효과가 더 좋다.
   지금 있는 카드는 일반과 고급뿐이다. 레어부터는 앞으로 새로 만드는 카드에 쓴다(설계 기준은 docs/GRADES.md).

   어떻게 나눴나 (tools/cardsim, 2026-11-04, v1.5 규칙, 카드마다 320판):
   - 대전 값 = 기본 덱에서 보통 카드 2장 대신 이 카드 2장을 넣었을 때의 승률 변화(%p).
   - 기본 덱마다 대전 값이 가장 높은 7종을 고급으로 했다. 덱마다 고급 수(7종)는 같고, 유닛·마법·아이템 중 무엇이 고급인지는 덱마다 다르다.
   - 기본 덱에 없는 카드는 그 단체 기본 덱의 7번째 고급 카드보다 대전 값이 높으면 고급이다.
   - 여기 없는 카드는 모두 일반. 등급을 바꾸려면 이 표만 고치면 된다. */
"use strict";

const GRADES = {
  common:   { id: "common",   rank: 1, name: "일반",   en: "Common",   color: "#f4f1ea" },
  uncommon: { id: "uncommon", rank: 2, name: "고급",   en: "Superior", color: "#f2cf3d" },
  rare:     { id: "rare",     rank: 3, name: "레어",   en: "Rare",     color: "#4ea8ff" },
  epic:     { id: "epic",     rank: 4, name: "에픽",   en: "Epic",     color: "#b46cff" },
  unique:   { id: "unique",   rank: 5, name: "유니크", en: "Unique",   color: "#ff8a2a" },
  special:  { id: "special",  rank: 6, name: "스페셜", en: "Special",  color: "#ff4d73" }
};
const GRADE_IDS = Object.keys(GRADES);

/* 카드 ID → 등급. 적지 않은 카드는 일반 */
const CARD_GRADES = {
  /* B1 기본 덱 */ "B1-43": "uncommon", "B1-42": "uncommon", "B1-15": "uncommon", "B1-36": "uncommon", "B1-07": "uncommon", "B1-26": "uncommon", "MB-04": "uncommon",
  /* B2 기본 덱 */ "B2-42": "uncommon", "IB2-6": "uncommon", "B2-40": "uncommon", "B2-30": "uncommon", "SB2-01": "uncommon", "B2-07": "uncommon", "B2-05": "uncommon",
  /* B3 기본 덱 */ "B3-25": "uncommon", "MC-08": "uncommon", "B3-07": "uncommon", "B3-19": "uncommon", "B3-04": "uncommon", "B3-42": "uncommon", "B3-10": "uncommon",
  /* G1 기본 덱 */ "G1-07": "uncommon", "G1-15": "uncommon", "G1-38": "uncommon", "MG-01": "uncommon", "IG1-4": "uncommon", "G1-21": "uncommon", "G1-14": "uncommon",
  /* G2 기본 덱 */ "G2-42": "uncommon", "M4-1": "uncommon", "G2-41": "uncommon", "G2-27": "uncommon", "G2-43": "uncommon", "IG2-3": "uncommon", "G2-09": "uncommon",
  /* G3 기본 덱 */ "G3-08": "uncommon", "G3-13": "uncommon", "IG3-4": "uncommon", "G3-10": "uncommon", "G3-39": "uncommon", "NG3-1": "uncommon", "G3-41": "uncommon",
  /* A1 기본 덱 */ "A1-41": "uncommon", "A1-13": "uncommon", "A1-14": "uncommon", "A1-01": "uncommon", "A1-19": "uncommon", "A1-30": "uncommon", "MC-05": "uncommon",
  /* A2 기본 덱 */ "A2-42": "uncommon", "A2-41": "uncommon", "A2-43": "uncommon", "A2-14": "uncommon", "A2-02": "uncommon", "A2-01": "uncommon", "S4-1": "uncommon",
  /* A3 기본 덱 */ "A3-20": "uncommon", "A3-19": "uncommon", "A3-25": "uncommon", "A3-42": "uncommon", "A3-07": "uncommon", "A3-01": "uncommon", "A3-32": "uncommon",
  /* 기본 덱 밖의 고급 카드 */
  /* A1 */ "A1-25": "uncommon", "S3-1": "uncommon", "IA1-5": "uncommon",
  /* A2 */ "SA2-03": "uncommon",
  /* A3 */ "A3-02": "uncommon", "A3-13": "uncommon", "A3-30": "uncommon", "MA-03": "uncommon", "SA3-02": "uncommon", "SA3-05": "uncommon", "NA3-1": "uncommon", "HA3-2": "uncommon",
  /* B1 */ "B1-16": "uncommon", "B1-40": "uncommon", "SB1-06": "uncommon", "SB1-08": "uncommon", "I4-3": "uncommon", "IB1-5": "uncommon",
  /* B2 */ "B2-14": "uncommon",
  /* B3 */ "IB3-3": "uncommon", "C4-1": "uncommon",
  /* G1 */ "SG1-09": "uncommon", "IG1-6": "uncommon",
  /* G2 */ "G2-04": "uncommon", "G2-26": "uncommon", "G2-36": "uncommon", "G2-39": "uncommon", "MC-11": "uncommon", "MG-14": "uncommon", "SG2-08": "uncommon", "SG2-09": "uncommon", "IG2-6": "uncommon",
  /* G3 */ "G3-20": "uncommon", "G3-30": "uncommon", "G3-32": "uncommon", "IG3-6": "uncommon",
};
/* v2.9 스페셜 카드(js/specials.js)는 모두 스페셜 등급 */
if (typeof SPECIAL_UNITS !== "undefined") for (const c of SPECIAL_UNITS.concat(SPECIAL_ITEMS)) CARD_GRADES[c.id] = "special";
/* v3.2 유니크 카드(js/uniques.js)는 모두 유니크 등급 */
if (typeof UNIQUE_UNITS !== "undefined") for (const c of UNIQUE_UNITS) CARD_GRADES[c.id] = "unique";

function gradeOf(c) { const id = typeof c === "string" ? c : c && c.id; return CARD_GRADES[id] || "common"; }
for (const c of CARD_LIST) c.grade = gradeOf(c);
function gradeBadgeHTML(c, cls) { const G = GRADES[gradeOf(c)]; return `<span class="${cls || "grade-badge"} grade-${G.id}" style="--gr:${G.color}" title="등급: ${G.name} (${G.en})">${G.name}</span>`; }

/* ETHERION — 공용 화면 도구: 카드 그리기, 토스트, 모달 */
"use strict";

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const wait = ms => new Promise(r => setTimeout(r, ms));
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

/* 문양 (viewBox 0 0 64 64) */
const GLYPH = {
  gun: '<circle cx="22" cy="45" r="10" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="22" cy="45" r="3"/><path d="M13 36 49 15l5 9-36 19z"/><circle cx="56" cy="12" r="3.5" opacity=".75"/><circle cx="50" cy="7" r="2" opacity=".5"/>',
  golem: '<rect x="20" y="8" width="24" height="18" rx="3"/><rect x="25" y="14" width="5" height="4" fill="#000" opacity=".55"/><rect x="34" y="14" width="5" height="4" fill="#000" opacity=".55"/><path d="M8 30h48v9h-6v18H39V46H25v11H14V39H8z"/><circle cx="32" cy="36" r="3" fill="#000" opacity=".4"/>',
  volt: '<path d="M38 3 13 36h15l-6 25 29-36H35z"/>',
  fang: '<path d="M12 6c14 12 18 30 10 52 2-18-2-34-10-52z"/><path d="M28 4c14 14 16 32 6 54 3-19 0-36-6-54z"/><path d="M44 8c12 13 13 28 4 48 2-17 0-32-4-48z"/>',
  elder: '<path d="M29 40h6v18h-6z"/><circle cx="32" cy="22" r="14"/><circle cx="20" cy="30" r="9"/><circle cx="44" cy="30" r="9"/><path d="M22 58c3-6 7-8 10-8s7 2 10 8z"/>',
  spring: '<path d="M32 5C21 22 14 31 14 40a18 18 0 0036 0c0-9-7-18-18-35z"/><path d="M20 42c4 3 8 3 12 0s8-3 12 0" fill="none" stroke="#000" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/>',
  abyss: '<path d="M3 32Q32 4 61 32 32 60 3 32z"/><path d="M32 14c4 6 5 12 5 18s-1 12-5 18c-4-6-5-12-5-18s1-12 5-18z" fill="#000" opacity=".7"/>',
  radiant: '<circle cx="32" cy="30" r="11"/><g stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M32 6v7M32 47v4M8 30h7M49 30h7M15 13l5 5M44 42l5 5M49 13l-5 5M20 42l-5 5"/></g><path d="M30 34h4v26h-4z"/><path d="M24 50h16v3H24z"/>',
  storm: '<path d="M33 10c13 0 22 8 22 18 0 8-6 14-14 14-6 0-10-4-10-9 0-4 3-7 7-7" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M31 54c-13 0-22-8-22-18 0-8 6-14 14-14 6 0 10 4 10 9 0 4-3 7-7 7" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" opacity=".7"/>',
  sword: '<path d="M50 6h8v8L30 42l-8-8z"/><path d="M16 36l12 12-4 4-3-3-7 7-4-4 7-7-3-3z"/><path d="M20 32l12 12" stroke="#000" stroke-opacity=".4" stroke-width="2"/>',
  shield: '<path d="M32 4 54 12v16c0 14-9 25-22 32C19 53 10 42 10 28V12z"/><path d="M32 12v40" stroke="#000" stroke-opacity=".35" stroke-width="3"/><path d="M18 26h28" stroke="#000" stroke-opacity=".35" stroke-width="3"/>',
  bow: '<path d="M16 6c26 6 36 26 30 52" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M16 6 46 58" stroke="currentColor" stroke-width="1.5"/><path d="M10 52 52 12l2 6-38 38z"/><path d="M52 12l6-2-2 6z"/>',
  rune: '<path d="M32 4 58 32 32 60 6 32z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 16v32M22 26l20 12M42 26 22 38" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>',
  orb: '<circle cx="32" cy="26" r="16"/><circle cx="26" cy="20" r="5" fill="#fff" opacity=".45"/><path d="M20 44h24l-4 14H24z"/>',
  // 성물: 성배 (십자가는 기도 클래스 아이콘과 헷갈려서 쓰지 않는다)
  holy: '<g stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".7"><path d="M32 2v5M20 5l2.5 4M44 5l-2.5 4M13 12l4 2.5M51 12l-4 2.5"/></g><path d="M14 16h36c0 13-7 21.5-18 23.5C21 37.5 14 29 14 16z"/><path d="M15.5 22h33" stroke="#000" stroke-opacity=".35" stroke-width="2.5"/><circle cx="32" cy="29" r="3.2" fill="#000" opacity=".3"/><path d="M28.5 39h7l-1 5.5h3.5v3h-3.5l1.2 5h-8.4l1.2-5h-3.5v-3h3.5z"/><path d="M17 61c1.5-5.5 7-8 15-8s13.5 2.5 15 8z"/>',
  armor: '<path d="M18 6h28l10 10-6 8v32H14V24l-6-8z"/><path d="M24 6c2 6 14 6 16 0" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="3"/><path d="M32 18v32" stroke="#000" stroke-opacity=".3" stroke-width="3"/>'
};
const ITEM_GLYPH = { sword: "sword", axe: "sword", dagger: "sword", spear: "sword", shield: "shield", bow: "bow", armor: "armor", rune: "rune", book: "orb", staff: "orb", orb: "orb", holy: "holy", seal: "holy" };
const RUNE_RING = '<circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 4" opacity=".7"/><circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" stroke-width="1" opacity=".5"/>';

function glyphSVG(key, spell) {
  return `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">${spell ? RUNE_RING + '<g transform="translate(14 14) scale(.56)">' + GLYPH[key] + "</g>" : GLYPH[key]}</svg>`;
}
function cardGlyph(c) {
  if (c.type === "item") return glyphSVG(ITEM_GLYPH[c.item.icon] || "sword");
  return glyphSVG(GROUPS[c.group].glyph, c.type !== "unit");
}
/* 일러스트 자리: img/cards/<카드ID>.png 파일이 있으면 그 그림을, 없으면 단체 문양을 보여 준다.
   파일이 있는지는 시작할 때 한 번만 확인한다(Art.probe). 그림을 넣고 새로 고치면 바로 보인다 */
const Art = {
  dir: "img/cards/", ok: new Set(), done: false,
  probe(ids, onDone) {
    let left = ids.length; if (!left) { this.done = true; return; }
    for (const id of ids) {
      const im = new Image();
      im.onload = () => { this.ok.add(id); if (!--left) { this.done = true; onDone && onDone(); } };
      im.onerror = () => { if (!--left) { this.done = true; onDone && onDone(); } };
      im.src = this.dir + id + ".png";
    }
  },
  has(id) { return this.ok.has(id); }
};
function artHTML(c) {
  return Art.has(c.id) ? `<img class="c-img" src="${Art.dir}${c.id}.png" alt="" draggable="false">${cardGlyph(c)}` : cardGlyph(c);
}
function coinCount(c) { return (c.co || []).reduce((s, x) => s + x[1], 0); }

/* 레벨 아이콘: 단체마다 모양이 다르다. 아이콘 개수 = 레벨, 그중 뒤쪽 유지비 수만큼은 속이 빈 아이콘 (viewBox 0 0 16 16) */
const PIP = {
  B1: "M8 1c1 3 5 5 5 9a5 5 0 01-10 0c0-2 1-3.2 2-4 0 1.8.8 2.8 2 3-.8-3 .2-5.6 1-8z",              // 화약: 불꽃
  B2: "M8 1l6 3.5v7L8 15l-6-3.5v-7z",                                                            // 골렘: 육각 볼트
  B3: "M9.5 1L3 9h4.2L6 15l7-8.5H8.6z",                                                          // 뇌전: 번개
  G1: "M4 1.5c6 2.5 8.5 8 4.5 13.5C9 10 7.5 5.5 4 1.5z",                                         // 바위송곳니: 송곳니
  G2: "M14 2C6.5 2 2 6.5 2 14c7.5 0 12-4.5 12-12z",                                              // 고목: 잎
  G3: "M8 1C5.2 5.6 3 8 3 10.6a5 5 0 0010 0C13 8 10.8 5.6 8 1z",                                // 샘물: 물방울
  A1: "M10.5 1.2a7 7 0 100 13.6A8.6 8.6 0 0110.5 1.2z",                                         // 심연: 초승달 (v3.12.7 안쪽 호를 펴서 도톰하게, 전 A5.8)
  A2: "M8 .5l1.9 5.6L15.5 8l-5.6 1.9L8 15.5 6.1 9.9.5 8l5.6-1.9z",                              // 성광: 빛 십자성
  A3: "M1.5 2.5h13l-3 3.2h-7zM3.5 7.2h9.5l-2.8 3H6.2zM6 11.7h5l-2.5 3z",                        // 폭풍탑: 회오리
  item: "M8 1l6 7-6 7-6-7z"                                                                       // 아이템: 마름모
};
/* v3.12.7: 유지비 칸 = 어두운 속 + 에테르 하늘빛 테두리(매 턴 에테르를 먹는 칸). 꽉 찬 금빛 소환 칸과 색으로 갈린다.
   (전에는 같은 금빛 테두리뿐이라 초승달 · 송곳니처럼 가는 모양은 속이 비어도 티가 안 났다.) 소환 칸보다 튀지 않게 테두리는 가늘게 */
function pipSVG(key, hollow) {
  const d = PIP[key] || PIP.item;
  return `<svg viewBox="0 0 16 16" aria-hidden="true">${hollow
    ? `<path d="${d}" fill="#07101e" fill-opacity=".9" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`
    : `<path d="${d}" fill="currentColor"/>`}</svg>`;
}
function levelPips(c) {
  const up = c.type === "unit" ? c.up || 0 : 0, full = c.lv - up;
  const key = PIP[c.group] ? c.group : "item";   // v3.19.8: 아이템도 유닛 · 마법처럼 자기 단체 모양(예전엔 아이템만 마름모)
  let h = "";
  for (let i = 0; i < c.lv; i++) h += `<i class="pip${i >= full ? " pip-up" : ""}">${pipSVG(key, i >= full)}</i>`;
  return `<div class="c-pips" style="--lvn:${Math.max(1, c.lv)}" data-tip="${esc(lvTip(c))}" data-tip-kw>${h}</div>`;
}

/* 오른쪽 위 배지: 정사각형 = 마법 종류 (칼·방패). 동그라미 = 클래스 (v2.3: 유닛과 아이템).
   유닛은 자기 클래스, 아이템은 장착할 수 있는 클래스 (여럿이면 여럿, 모두면 빈 동그라미 하나).
   유닛과 아이템의 동그라미가 하나라도 같으면 장착된다 (cards.js canEquip) */
const CLASS_ICON = {   // viewBox 0 0 24 24
  // 무도: 쥔 주먹 (손가락 넷 + 가로지른 엄지)
  "무도": '<rect x="4.6" y="5.2" width="3.7" height="8" rx="1.85"/><rect x="8.3" y="4" width="3.7" height="9" rx="1.85"/><rect x="12" y="4.4" width="3.7" height="8.6" rx="1.85"/><rect x="15.7" y="5.8" width="3.5" height="7.4" rx="1.75"/><path d="M4.6 10.5h14.6v6.3c0 2.8-2.2 4.7-5 4.7H9.6c-2.8 0-5-1.9-5-4.7z"/><path d="M8.3 6.5v5M12 5.5v6M15.7 6.5v5" stroke="#000" stroke-opacity=".42" stroke-width="1.1"/><path d="M5.6 14.6h7.6a1.9 1.9 0 010 3.8H7.4" fill="none" stroke="#000" stroke-opacity=".45" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>',
  // 무장: 엇갈린 두 검 (날 · 가드 · 손잡이 · 폼멜)
  "무장": '<g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M7.6 16.4 20.6 3.4" stroke-width="2.3"/><path d="M16.4 16.4 3.4 3.4" stroke-width="2.3"/><path d="M5.2 14 10 18.8M18.8 14 14 18.8" stroke-width="2"/><path d="M7.4 16.6 4.4 19.6M16.6 16.6l3 3" stroke-width="2.5"/></g><circle cx="3.6" cy="20.4" r="1.6"/><circle cx="20.4" cy="20.4" r="1.6"/>',
  // 마도: 네 갈래 마력의 별 + 작은 별
  "마도": '<path d="M11 2.5c.7 5.3 3.2 7.8 8.5 8.5-5.3.7-7.8 3.2-8.5 8.5-.7-5.3-3.2-7.8-8.5-8.5 5.3-.7 7.8-3.2 8.5-8.5z"/><path d="M19 15.2c.3 2.1 1.2 3 3.3 3.3-2.1.3-3 1.2-3.3 3.3-.3-2.1-1.2-3-3.3-3.3 2.1-.3 3-1.2 3.3-3.3z"/><circle cx="19.2" cy="4.6" r="1.3"/>',
  // 기도: 모은 두 손과 그 위의 빛
  "기도": '<path d="M11.4 6.2c-1.5 1.4-2.6 4.3-3 7.6l-3.6 4.4 3.4 3.4 3.2-3.5z"/><path d="M12.6 6.2c1.5 1.4 2.6 4.3 3 7.6l3.6 4.4-3.4 3.4-3.2-3.5z"/><path d="M12 6.6v11.4" stroke="#000" stroke-opacity=".45" stroke-width="1"/><path d="M12 1.2v2.6M7.6 2.8l1.2 1.8M16.4 2.8l-1.2 1.8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".85"/>'
};
const CLASS_INFO = {
  "무도": "자기 몸에서 나오는 힘. 골렘·수인·트렌트·정령·맹수",
  "무장": "무기와 도구의 힘. 병사·사수·기사·창·검",
  "마도": "자기 마력의 힘. 마법사·술사·학자",
  "기도": "초월자에게 빌린 힘. 사제·무녀·사도·계약자"
};
function cardClasses(c) {
  if (c.type === "unit") return c.cl ? [c.cl] : [];
  // v3.9.9: 아이템은 오른쪽 위 아이콘을 쓰지 않는다 — "마도 전용" 아이템에 마도 아이콘이 있으면 마도 카드로 읽혀서.
  //   장착할 수 있는 클래스는 이름 옆 꼬리표(": [마도 전용]" · ": [공용]")와 원본 카드 설명에 나온다
  return [];
}
function classTip(c, cl) {
  if (c.type === "unit") return `${cl} 유닛\n${CLASS_INFO[cl]}.\n장착할 수 있는 아이템: [${cl} 전용]이 적힌 아이템, [공용] 아이템.`;
  if (cl === "공용") return "공용 아이템\n모든 클래스의 유닛이 장착할 수 있습니다.";
  const all = itemClasses(c);
  return `${all.join(", ")} 전용 아이템\n${all.join(" · ")} 유닛만 장착할 수 있습니다. 유닛 오른쪽 위의 동그라미 아이콘이 ${all.join(" · ")}이어야 합니다.`;
}
function classCircleHTML(c, cl) {
  return `<i class="c-clsb clc-${cl}" data-tip="${esc(classTip(c, cl))}">${CLASS_ICON[cl] ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${CLASS_ICON[cl]}</svg>` : ""}</i>`;
}
/* 이름 + 클래스 꼬리표 (": [무도]", ": [무장, 기도 전용]") */
function nameHTML(c, extra) {
  const tag = classTagText(c);
  return `<span class="c-name"><span class="c-nm">${esc(c.name)}</span>${tag ? `<span class="c-cltag">: ${esc(tag)}</span>` : ""}${extra || ""}</span>`;
}
const ITEM_KIND_ICON = '<path d="M32 5 57 25 32 59 7 25z"/><path d="M7 25h50M20 25l12 34 12-34M20 25l12-20 12 20" fill="none" stroke="#000" stroke-opacity=".42" stroke-width="2.6" stroke-linejoin="round"/>';
function itemKindTip(c) {
  return `아이템 · ${c.cat}\n내 유닛에 장착해서 쓰는 카드입니다. 장착한 유닛에게 왼쪽 열의 값과 능력이 붙습니다.\n${equipWho(c)} 하나씩, 유지비 없음. 유닛이 쓰러지면 함께 소각.`;
}
function equipWho(c) {
  return isAllClass(c) ? "내 유닛 아무에게나" : `내 ${itemClasses(c).join("·")} 유닛에게만`;
}
function kindBadgeHTML(c) {
  if (c.type === "unit") return "";
  if (c.type === "item") return "";   // v2.3: 아이템의 보석 배지는 뺐다. 그 자리에 장착 클래스 동그라미
  return `<i class="c-kind kind-${c.type}" data-tip="${esc(RITE_TIP[c.type])}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${RITE_ICON[c.type]}</svg></i>`;
}
function classIconHTML(c) {
  const cs = cardClasses(c), kind = kindBadgeHTML(c);
  if (!cs.length && !kind) return "";
  return `<div class="c-clsico">${cs.map(cl => classCircleHTML(c, cl)).join("")}${kind}</div>`;
}

/* ---------- v3.19 판타지 마스터즈식 카드 배치 (css/fmcard.css) ----------
   왼쪽 위 = 카드 종류 아이콘, 그 옆 = 이름 / 왼쪽 세로 = 레벨 아이콘(소환 · 유지비) / 가운데 = 그림
   그림 아래 = 종족 줄(단체 · 등급) → 글 상자(코인 · 특수 능력 · 짧은 문구 · 설명) / 오른쪽 아래 열 = 클래스 아이콘 + 공 · 방 · 체 */
const TYPE_ICON_UNIT = '<path d="M12 2.4c-3.7 0-6.1 2.7-6.1 6.3v3.1l1.7 1.4V9.6h8.8v3.6l1.7-1.4V8.7c0-3.6-2.4-6.3-6.1-6.3z"/><path d="M8.7 10.9h6.6v2.9c0 2-1.5 3.6-3.3 3.6s-3.3-1.6-3.3-3.6z"/><path d="M3.8 21.6c.7-3.1 3.2-4.7 5.5-5L12 19.2l2.7-2.6c2.3.3 4.8 1.9 5.5 5z"/>';
const TYPE_KO = { unit: "유닛", item: "아이템" };
/* 공격 기술 줄 (v3.19, 판타지 마스터즈처럼): 유닛은 늘 한 줄 — 특수 능력이 있으면 그 이름(사격 2 · 투척 2 …), 없으면 "일반공격" */
const NORMAL_ATK_TIP = "일반공격\n특수 능력이 없는 공격입니다. 전투에서 자기 차례가 오면 상대 대기열 맨 앞 유닛과 맞붙고, 막을 유닛이 없으면 생명을 공격합니다.";
const normalAtkChip = () => `<span class="c-cls c-ab c-plain" data-tip="${esc(NORMAL_ATK_TIP)}">일반공격</span>`;
function typeIconHTML(c) {
  if (c.type === "unit") return `<i class="c-type t-unit" data-tip="유닛\n전장의 칸에 소환합니다. 레벨만큼 에테르, 살아남으면 매 턴 유지비."><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${TYPE_ICON_UNIT}</svg></i>`;
  if (c.type === "item") return `<i class="c-type t-item" data-tip="${esc(itemKindTip(c))}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${ITEM_KIND_ICON}</svg></i>`;
  return `<i class="c-type t-${c.type} c-kind kind-${c.type}" data-tip="${esc(RITE_TIP[c.type] || "마법")}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${RITE_ICON[c.type] || RITE_SWORD}</svg></i>`;
}
/* 코인 줄: 공 · 방 · 체 아이콘 + 그 스탯의 코인 (+2● +●) — 판타지 마스터즈의 "+2C1 / =C1 / +C1" 자리 */
function coinLineHTML(co) {
  const parts = ["a", "d", "h"].map(k => {
    const marks = coinMarks(co, k); if (!marks.length) return "";
    const tip = marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n");
    return `<span class="cl-s cl-${k}" data-tip="${esc(tip)}">${statIco(k)}${coinGroupsHTML(marks)}</span>`;
  }).filter(Boolean);
  return parts.length ? `<div class="c-coinline">${parts.join("")}</div>` : "";
}
/* 종족 줄(그림 바로 아래): 왼쪽 = 카드 종류 글씨(유닛 · 공격 마법 · 아이템, 종류 아이콘 색) + 유닛은 단체 · 아이템은 장착 클래스, 오른쪽 = 등급.
   v3.19.8: 맨 앞 종류 글씨를 굵고 조금 크게(.r-t). 아이템도 "아이템"이 보인다. 단체 온전한 이름 · 무구 · 각인 같은 아이템 종류는 말풍선으로 */
function raceLineHTML(c, gr) {
  const G = GROUPS[c.group], isU = c.type === "unit", isI = c.type === "item";
  const word = isU ? "유닛" : isI ? "아이템" : (RITE_TIP[c.type] || "마법");
  // 핸드 카드 폭에서도 잘리지 않게 짧게: 유닛은 종족 낱말만(바위주먹 오크 → 오크), 아이템은 장착 클래스만. 온전한 이름은 말풍선
  const rest = isU ? (G ? G.name.split(" ").pop() : "") : isI ? (isAllClass(c) ? "공용" : itemClasses(c).join("·")) : "";
  const tip = isU ? (G ? `유닛 · ${G.name}` : "") : isI ? `아이템 · ${c.cat || ""}\n${equipWho(c)} 장착` : "";
  return `<div class="c-race"><span class="r-l"${tip ? ` data-tip="${esc(tip)}"` : ""}><b class="r-t t-${c.type}">${esc(word)}</b>${rest ? `<span class="r-sep">·</span>${esc(rest)}` : ""}</span><span class="r-g" style="--gr:${gr.color}">${esc(gr.name)}</span></div>`;
}

/* 마법 종류 아이콘: 공격 = 칼, 방어 = 방패, 공용(둘 다) = 칼과 방패가 겹친 모양 (viewBox 0 0 64 64) */
const RITE_SWORD = '<path d="M52 4h8v8L31 41l-8-8z"/><path d="M15 35l14 14-4 4-3.5-3.5-7.5 7.5-4-4 7.5-7.5L14 42z"/>';
const RITE_SHIELD = '<path d="M32 4 55 12v16c0 15-9.5 26-23 33C18.5 54 9 43 9 28V12z"/><path d="M32 12v41M18 26h28" stroke="#000" stroke-opacity=".35" stroke-width="3"/>';
const RITE_ICON = {
  hand: `<path d="M4 32c8-12 18-18 28-18s20 6 28 18c-8 12-18 18-28 18S12 44 4 32z"/><circle cx="32" cy="32" r="10" fill="#0c0b12"/><circle cx="32" cy="32" r="5"/>`,
  atk: RITE_SWORD,
  def: RITE_SHIELD,
  any: `<g opacity=".5" transform="translate(-4 2) scale(.92)">${RITE_SHIELD}</g><g stroke="#0c0b12" stroke-width="4" stroke-linejoin="round" paint-order="stroke" transform="translate(2 0)">${RITE_SWORD}</g>`
};
const RITE_TIP = {
  atk: "공격 마법",
  def: "방어 마법",
  any: "공용 마법",
  hand: "계략 마법"
};
function riteIconHTML(type) {
  return `<span class="c-rite rite-${type}" data-tip="${esc(RITE_TIP[type])}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${RITE_ICON[type]}</svg></span>`;
}

/* 공·방·체 아이콘 (v1.4.3): 공격 = 곧은 칼, 방어 = 음영 넣은 민무늬 방패(가운데 십자 없음), 체력 = 핏방울(하트 대신) */
const STAT_SVG = {
  a: '<path d="M19 2.5h2.5V5L10 16.5 7.5 14z"/><path d="M5.2 13.2l5.6 5.6-1.4 1.4-1.6-1.6-2.6 2.6a1 1 0 01-1.4 0l-.4-.4a1 1 0 010-1.4l2.6-2.6-1.6-1.6z"/>',
  d: '<path d="M12 2.2 4 5v6.2c0 5.1 3.4 8.9 8 10.6z"/><path d="M12 2.2 20 5v6.2c0 5.1-3.4 8.9-8 10.6z" opacity=".5"/><path d="M12 2.2 20 5v6.2c0 5.1-3.4 8.9-8 10.6-4.6-1.7-8-5.5-8-10.6V5z" fill="none" stroke="currentColor" stroke-width="1.2"/>',
  h: '<path d="M12 2.5c3.2 4.6 7 8.7 7 12.6a7 7 0 01-14 0c0-3.9 3.8-8 7-12.6z"/><path d="M9.2 13.8a3.4 3.4 0 002.4 4.6" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.5" stroke-linecap="round"/>'
};
/* 고정 표시 (v2.3): 자물쇠. 고정된 스탯 숫자 옆에 금빛으로 */
const LOCK_SVG = '<svg class="st-lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 11V8a4.5 4.5 0 019 0v3" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect x="4.5" y="10.2" width="15" height="11.3" rx="2.4" fill="currentColor"/><path d="M12 14.2v3.4" stroke="#1a1408" stroke-width="2.4" stroke-linecap="round"/></svg>';
/* v3.20 스탯 표시 세 가지: 🔒 고정(자물쇠, 금빛) · ▲ 버팀(삼각형, 초록빛) · ▼ 눌림(역삼각형, 붉은빛). 뜻은 cards.js PIN_KO */
const PIN_SVG = {
  L: LOCK_SVG.replace('class="st-lock"', 'class="st-lock pin-L"'),
  U: '<svg class="st-lock pin-U" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 22 20.2H2z" fill="currentColor"/><path d="M12 8.6 17.2 17.6H6.8z" fill="#0c1a10" opacity=".35"/></svg>',
  D: '<svg class="st-lock pin-D" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.8 22 3.8H2z" fill="currentColor"/><path d="M12 15.4 17.2 6.4H6.8z" fill="#1d0c0a" opacity=".35"/></svg>'
};
const PIN_TIP = {
  L: k => `🔒 [고정: ${STAT_KO[k]}] 코인·마법·저주로 바뀌지 않습니다(올리기도 깎기도 막음). 받은 피해는 그대로 쌓입니다.`,
  U: k => `▲ [버팀: ${STAT_KO[k]}] 이 값 아래로는 내려가지 않습니다. 오르는 것은 됩니다. 받은 피해는 그대로 쌓입니다.`,
  D: k => `▼ [눌림: ${STAT_KO[k]}] 이 값 위로는 오르지 않습니다. 깎이는 것은 됩니다.`
};
const statIco = k => `<svg class="sti sti-${k}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${STAT_SVG[k]}</svg>`;
/* 코인 묶음: 앞면 값 글자(+ · +2 · −2) 뒤에 겹쳐 쌓은 빈 동전. 동전 수 = 코인 수, 앞의 글자 = 앞면마다 붙는 값.
   v1.9.1: 값을 동전 안(②)에 새기던 것을 동전 앞 글자로 옮겼다 — ②가 "코인 2개"로 읽혀서.
   예: +2● = 앞면이면 +2인 코인 1개 · +●● = 앞면마다 +1인 코인 2개 · +2● +● = 그 둘이 함께 */
function coinGroupsHTML(marks) {
  const dot = m => Array.from({ length: m.n }, () => `<i class="coin-dot${m.v < 0 ? " neg" : ""}"></i>`).join("");
  const pos = marks.filter(m => m.v > 0).sort((a, b) => b.v - a.v), neg = marks.filter(m => m.v < 0).sort((a, b) => a.v - b.v);
  const one = m => `<span class="cg${m.v < 0 ? " neg" : ""}"><small>${m.v > 0 ? "+" : "−"}${Math.abs(m.v) > 1 ? Math.abs(m.v) : ""}</small>${dot(m)}</span>`;
  return pos.map(one).join("") + neg.map(one).join("");
}
/* 아이템이 붙여 주는 공·방·체 (유닛과 같은 왼쪽 세로 열). 붙는 값이 없는 스탯은 비운다. 고정(set)은 그 값 그대로 */
function itemVstatsHTML(c, full) {
  const it = c.item; if (!it) return "";
  const pm = pinModesOf(it, true), to = it.to || {};
  if (!it.set && !it.a && !it.d && !it.h && !(it.co && it.co.length) && !Object.keys(pm).length) return "";   // 능력만 있는 아이템은 숫자 열이 없다
  const cells = ["a", "d", "h"].map(k => {
    const marks = coinMarks(it.co, k), coins = coinGroupsHTML(marks);
    // v3.20 절대값(to)은 부호 없이 그 값, 더하는 값은 +N. 표시(고정 · 버팀 · 눌림)는 숫자 옆 아이콘
    const val = it.set ? it.set[k] : to[k] != null ? String(to[k]) : it[k] ? sgnNum(it[k]) : "";
    const m = pm[k], pinCls = m ? ` st-pin${m}${m === "L" ? " st-locked" : ""}` : "", pinTip = m ? "\n" + PIN_TIP[m](k) + (to[k] == null && !it.set ? " (기준값 = 장착한 유닛의 값" + (it[k] ? ` ${sgnNum(it[k])}` : "") + ")" : "") : "";
    // v2.3: 붙는 값이 없는 스탯은 "·" 대신 흐린 +0 ("·"이 고정 표시로 읽혀서). v3.20 숫자 없이 표시만 있으면 아이콘만
    if (val === "" && !coins) return m
      ? `<span class="st st-${k} st-pinonly${pinCls}" data-tip="${esc(`장착한 유닛의 ${STAT_KO[k]}에 표시를 붙입니다` + pinTip)}">${full ? statIco(k) : ""}${PIN_SVG[m]}</span>`
      : `<span class="st st-${k} st-empty" data-tip="${esc(`장착해도 ${STAT_KO[k]}은(는) 그대로입니다 (+0)`)}">${full ? statIco(k) : ""}<b>+0</b></span>`;
    const tip = (it.set ? `장착하면 ${STAT_KO[k]}이(가) ${it.set[k]}이 됩니다` : to[k] != null ? `장착하면 ${STAT_KO[k]}이(가) 유닛 값과 상관없이 ${to[k]}이 됩니다` : `장착한 유닛 ${STAT_KO[k]} ${val || "+0"}`) + (marks.length ? "\n" + marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n") : "") + pinTip;
    return `<span class="st st-${k}${it.set || to[k] != null ? " st-set" : ""}${pinCls}" data-tip="${esc(tip)}">${full ? statIco(k) : ""}<b>${val}</b>${m ? PIN_SVG[m] : ""}${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
  }).join("");
  return `<div class="c-vstats c-istats">${cells}</div>`;
}
/* 공·방·체 한 칸. 원본 카드(full)는 아이콘 + 숫자 + 코인, 작은 카드(노멀·컴팩트·큰)는 숫자 + 코인만 */
function statCellHTML(c, k, live, co, full) {
  const base = c[k];
  let val = base, cls = "";
  if (live) { val = k === "h" ? live.h : live[k]; if (val > base) cls = " up"; else if (val < base) cls = " down"; if (k === "h" && live.h < live.max) cls = " hurt"; }
  const marks = coinMarks(co || c.co, k);
  // v3.20 표시: 전장에서는 이번 턴 표시(유닛 + 아이템 + 마법이 건 것, live.pins), 그 밖에는 카드에 새겨진 표시
  const m = live && live.pins ? live.pins[k] : pinModesOf(c)[k];
  const tip = `${STAT_KO[k]} ${val}` + (marks.length ? "\n" + marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n") : "") + (m ? "\n" + PIN_TIP[m](k) : "");
  const coins = coinGroupsHTML(marks);
  return `<span class="st st-${k}${cls}${m ? ` st-pin${m}${m === "L" ? " st-locked" : ""}` : ""}" data-tip="${esc(tip)}">${full ? statIco(k) : ""}<b>${val}</b>${m ? PIN_SVG[m] : ""}${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
}

/* v3.9.9: 카드 등급 (js/grades.js의 GRADES). grades.js가 없으면 일반 */
function cardGrade(c) {
  return typeof GRADES !== "undefined" && typeof gradeOf === "function" ? GRADES[gradeOf(c)] : { id: "common", name: "일반", en: "Common", color: "#f4f1ea" };
}
/* 카드 HTML — 카드는 세 단계로 보인다 (README "카드 표시 단계")
   size "full" = 원본: 가장 세밀한 모습. 능력·설명·코인·레벨·유지비 등 카드의 모든 것이 카드 안에 보인다
   size "md"   = 노멀: 조금 간략하게. 설명 글은 보이지 않는다
   size "sm"   = 컴팩트: 더 간단하게 (레벨·이름·그림·스탯만)
   size "lg"   = 전투 화면의 고른 카드 패널용 큰 카드(노멀 + 설명 글)
   opts: {size, live:{a,d,h,max}, badges, extra, count, cls, attrs} */
function cardHTML(c, opts) {
  opts = opts || {};
  const size = opts.size || "md";
  if (size === "full") return cardFullHTML(c, opts);
  const el = ELEMENTS[c.el];
  const live = opts.live;
  let foot = "", vstats = "";
  if (c.type === "unit") {
    vstats = `<div class="c-vstats">${statCellHTML(c, "a", live)}${statCellHTML(c, "d", live)}${statCellHTML(c, "h", live)}</div>`;
  } else if (c.type === "item") {
    vstats = itemVstatsHTML(c, false);   // v1.4.5: 아이템도 유닛처럼 왼쪽 세로 열 (아래 띠는 뺐다)
  }
  // slim = 전장 화면의 핸드 · 전장 카드 (v3.19부터 노멀 카드와 같은 판타지 마스터즈식 배치, 글 상자에 설명 대신 짧은 문구만)
  const slim = !!opts.slim && size === "md";
  const gr = cardGrade(c);
  // v1.8: 노멀 카드도 opts.desc가 있으면 그림 위에 설명이 겹쳐 보인다. "short" = 핸드(세 줄까지) · "full" = 전장(전체, fitDescs가 글자를 줄여 맞춤)
  const dk = opts.desc && size === "md" && !slim ? cardKwShort(c) : "";
  const desc = dk ? `<div class="c-desc d-${opts.desc}"><p>${dk.split("\n").map(kwHTML).join("<br>")}</p></div>` : "";
  // v3.19 판타지 마스터즈식 배치 (css/fmcard.css). 글 상자에 코인 · 특수 능력 · 마법 짧은 문구 · 설명(큰 카드만)
  const isU = c.type === "unit", isI = c.type === "item", isS = !isU && !isI;
  let chips = "";
  if (isU && c.gift) chips += itemGrants(c.gift).map(raw => `<span class="c-cls c-ab" data-tip="${esc(raw + " " + (itemKwDesc(raw) || c.gift.evText || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");
  if (isU && !chips) chips = normalAtkChip();   // 특수 능력이 없어도 같은 규격으로 "일반공격"
  if (isU) chips += pinAbilities(c).map(raw => `<span class="c-cls c-ab c-pin" data-tip="${esc(raw + " " + (itemKwDesc(raw) || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");   // v3.20 카드에 새겨진 표시
  if (isI) chips += itemAbilities(c.item).map(raw => `<span class="c-cls c-ab" data-tip="${esc(raw + " " + (itemKwDesc(raw) || c.item.evText || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");
  if (isS) chips += spellKwList(c).map(raw => `<span class="c-cls c-ab" data-tip="${esc(coinNotePlain(raw) + " " + (spellKwDesc(raw.replace(/^\[|\]$/g, "")) || ""))}">${coinNoteHTML(esc(raw.replace(/^\[|\]$/g, "")))}</span>`).join("");
  const sBrief = isS && size !== "lg" ? spellBriefHTML(c) : "";   // 큰 카드(lg)는 마법 글 전문
  const sText = isS && !sBrief ? `<p class="c-stext">${kwHTML(c.text || "")}</p>` : "";
  const flv = c.flavor || "";   // 카드 고유의 분위기 글만 (단체 소개 글은 원본 카드에)
  const box = (isU ? coinLineHTML(c.co) : isI && c.item ? coinLineHTML(c.item.co) : "") + (chips ? `<div class="c-chips">${chips}</div>` : "") + sBrief + sText + desc + (opts.extra || "") + (flv ? `<p class="c-flv">${esc(flv)}</p>` : "");
  const rcol = isU ? `<div class="c-rcol">${classIconHTML(c)}${vstats}</div>` : isI && vstats ? `<div class="c-rcol">${vstats}</div>` : "";
  return `<div class="card fm size-${size} ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${dk ? " has-desc" : ""}${slim ? " slim" : ""}${sBrief ? " has-brief" : ""}${rcol ? " has-rcol" : ""} grade-${gr.id}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color};--gr:${gr.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame">
      <div class="c-head">${typeIconHTML(c)}${nameHTML(c)}</div>
      <div class="c-mid">
        <div class="c-side">${levelPips(c)}</div>
        <div class="c-art">${artHTML(c)}${opts.badges ? `<div class="c-badges">${opts.badges}</div>` : ""}</div>
      </div>
      <div class="c-low">
        <div class="c-lowl">${raceLineHTML(c, gr)}<div class="c-box"><div class="c-boxin">${box}</div></div></div>
        ${rcol}
      </div>
      ${foot}
    </div>${opts.count != null ? `<span class="c-count">×${opts.count}</span>` : ""}
  </div>`;
}
/* v3.9.9: 마법 카드의 짧은 문구 (js/briefs.js SPELL_BRIEF). 핸드 · 전장 카드(slim)의 그림 아래쪽에 겹쳐 보인다.
   한 줄 = 효과 하나("|"로 나눔). {대상} = 색 칩, ⚔⛨♥ = 공·방·체 아이콘, +1C×2 = 코인(+●●), [키워드] = 말풍선 */
const BRIEF_TONE = { "적": "foe", "아군": "ally", "나": "ally", "뒤": "ally", "양쪽": "both", "대가": "cost", "핸드": "hand" };
function spellBriefLine(line) {
  const re = /\{([^}]+)\}|\[([^\[\]]+)\]|([+−])(\d+)C(?:×(\d+))?|([⚔⛨♥])/g;
  let out = "", at = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(at, m.index)); at = re.lastIndex;
    if (m[1]) out += `<b class="sb-t sb-${BRIEF_TONE[m[1].split(" ")[0]] || "foe"}">${esc(m[1])}</b>`;
    else if (m[2]) out += kwHTML(m[0]);
    else if (m[3]) out += coinGroupsHTML([{ v: (m[3] === "−" ? -1 : 1) * +m[4], n: +(m[5] || 1) }]);
    else out += statIco({ "⚔": "a", "⛨": "d", "♥": "h" }[m[6]]);
  }
  return out + esc(line.slice(at));
}
function spellBriefHTML(c) {
  const src = typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[c.id];
  if (!src) return "";
  return `<div class="c-brief">${src.split("|").map(l => `<p>${spellBriefLine(l)}</p>`).join("")}</div>`;
}
/* v3.9.8: 마법 카드의 능력 칩 — 글 속 [키워드](예: [장전 1])만. 효과 글은 원본 카드에서 */
function spellKwList(c) {
  const out = (c.text || "").match(/\[[^\]]+\]/g) || [];
  if (c.cost && c.cost.ether && !out.some(k => /^\[장전 /.test(k))) out.push(`[장전 ${c.cost.ether}]`);
  return Array.from(new Set(out));
}
/* v1.8: 전장 카드의 설명(전체)이 칸을 넘치면 글자를 조금씩 줄여 다 들어가게 한다 */
function fitDescs(root) {
  // v1.9: 핸드(d-short)도 줄로 자르지 않고 글자를 줄여 다 들어가게 한다
  (root || document).querySelectorAll(".c-desc.d-full, .c-desc.d-short").forEach(d => {
    const p = d.firstElementChild; if (!p) return;
    const min = d.classList.contains("d-short") ? 0.5 : 0.62;
    let f = d.classList.contains("d-short") ? 0.74 : 0.78; p.style.fontSize = "";
    for (let i = 0; i < 14 && d.scrollHeight > d.clientHeight + 1 && f > min; i++) { f -= 0.04; p.style.fontSize = f + "em"; }
  });
}
/* 레벨 아이콘·레벨 구슬 말풍선 (v2.3). 레벨과 유지비는 줄을 나눈다 (data-tip-kw: 두 줄을 같은 크기로) */
function lvTip(c) {
  const up = c.type === "unit" ? c.up || 0 : 0;
  return `[레벨 ${c.lv}] 소환할 때 에테르를 ${c.lv}만큼 소비합니다.` + (up ? `\n[유지비 ${up}] 전장에 올라와 있는 동안 매 턴 에테르를 ${up}만큼 소비합니다.` : "");
}
/* 아이템 아래 띠: 붙는 스탯과 코인 (⚔+2 +C1) */
function itemModsHTML(c) {
  const it = c.item;
  if (it.set) return `<span data-tip="장착한 유닛의 공·방·체가 이 값이 됩니다.">고정 ${it.set.a}/${it.set.d}/${it.set.h}</span>`;
  const parts = ["a", "d", "h"].map(k => {
    const marks = coinMarks(it.co, k);
    const m = pinModesOf(it, true)[k], to = it.to && it.to[k] != null ? String(it.to[k]) : "";
    if (!it[k] && !marks.length && !m && !to) return "";
    const coins = coinGroupsHTML(marks);
    return `<span class="im st-${k}">${statIco(k)}${to || (it[k] ? sgnNum(it[k]) : "")}${m ? PIN_MARK[m] : ""}${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
  }).filter(Boolean);
  return parts.join(" ") || "아이템";
}

/* ---------- 원본 카드 (size "full") ----------
   카드의 모든 것이 카드 안에 보인다: 레벨·유지비 아이콘, 공·방·체와 코인, 클래스, 종류, 능력 전문, 키워드 설명, 설명 글, 시뮬레이터 값 */
function cardFullHTML(c, opts) {
  opts = opts || {};
  const el = ELEMENTS[c.el], G = GROUPS[c.group];
  const live = opts.live;
  let vstats = "";
  if (c.type === "unit") vstats = `<div class="c-vstats">${statCellHTML(c, "a", live, null, true)}${statCellHTML(c, "d", live, null, true)}${statCellHTML(c, "h", live, null, true)}</div>`;
  else if (c.type === "item") vstats = itemVstatsHTML(c, true);
  const typeName = TYPES[c.type].name;
  const gr = cardGrade(c);
  // v3.9.9: 종류 글자 옆에 등급(일반 · 고급 · 레어 · 에픽 · 유니크 · 스페셜)을 등급 색으로
  const grTag = `<b class="f-grade c-hgrade grade-${gr.id}" style="--gr:${gr.color}" title="등급: ${gr.name} (${gr.en})">${gr.name}</b>`;   // v3.19.1: 오른쪽 위
  // v3.19.1: 종류 줄은 마법 · 아이템만(유닛은 왼쪽 위 아이콘으로 충분). 단체 이름 · 레벨 글자는 뺐다 — 레벨은 레벨 아이콘, 등급은 오른쪽 위
  const typeLine = c.type === "unit" ? [] : [c.type === "item" ? `아이템 · ${esc(c.cat)}` : typeName];
  const L = [];
  if (c.type === "unit") {
    // 공·방·체와 코인은 왼쪽 세로 열에 이미 있으므로 글로 다시 적지 않는다
    // v2.9 스페셜 유닛: 타고난 능력과 그 뜻, 카드 고유 설명
    const gifts = giftSummary(c);
    for (const s of gifts) L.push(`<p class="f-grant">${kwHTML(s)}</p>`);
    // v3.19.1: 특수 능력이 없는 유닛은 원본 카드에 "일반공격" 줄 · 뜻을 적지 않는다 (작은 카드의 일반공격 칩 말풍선에만)
    if (c.gift) for (const [k, v] of itemKwGenList(c.gift)) L.push(`<p class="f-kw"><b>${esc(k)}</b> ${esc(v)}</p>`);
    for (const [k, v] of pinKwGenList(c)) L.push(`<p class="f-kw"><b>${esc(k)}</b> ${esc(v)}</p>`);   // v3.20 표시의 뜻
    if (c.limit) L.push(`<p class="f-rule f-dim">덱에 ${c.limit}장까지.</p>`);
    L.push(`<p class="f-flavor">${esc(c.flavor || G.blurb)}</p>`);
    // v1.4.5: 시뮬레이터 승률·교전 승률·이전 수치(v0.7·v1.2) 같은 균형 작업용 값은 카드에 보이지 않는다 (data.js에만 남는다)
  } else if (c.type === "item") {
    // 붙는 값(⚔+4 등)은 왼쪽 세로 열에 있으므로 글에는 능력만. v2.2: 위 = 아이템이 하는 일("[관통] 능력 부여"), 아래 = 그 능력의 일반 뜻
    for (const s of itemSummary(c.item)) L.push(`<p class="f-grant">${kwHTML(s)}</p>`);
    for (const [k, v] of itemKwGenList(c.item)) L.push(`<p class="f-kw"><b>${esc(k)}</b> ${esc(v)}</p>`);
    L.push(`<p class="f-rule f-dim">${equipWho(c)} 장착. 유닛 하나에 하나, 유지비 없음. 유닛이 쓰러지면 함께 소각.${c.limit ? ` 덱에 ${c.limit}장까지.` : ""}</p>`);
    if (c.flavor) L.push(`<p class="f-flavor">${esc(c.flavor)}</p>`);
  } else {
    L.push(`<p class="f-rule f-big">${kwHTML(c.text)}</p>`);
    L.push(spellCoinNoteHTML(c.text));   // v3.9.12: +●● 코인 읽는 법
    if (c.cost && c.cost.ether) L.push(`<p class="f-kw"><b>[장전 ${c.cost.ether}]</b> 다음 턴 에테르 −${c.cost.ether}.</p>`);
    { const rule = (RITE_TIP[c.type] || "").split("\n")[1]; if (rule) L.push(`<p class="f-rule f-dim">${rule}</p>`); }
    if (c.limit && !c.comeback) L.push(`<p class="f-rule f-dim">덱에 ${c.limit}장까지.</p>`);   // v3.18 유니크 마법
    if (c.flavor) L.push(`<p class="f-flavor">${esc(c.flavor)}</p>`);   // v3.11.1: v3.10.6에 RITE_TIP이 한 줄이 되어 둘째 줄이 "undefined"로 나왔다   // v3.9.9: "뒤 N칸" 설명은 뺐다 — 카드 글("뒤 3칸")만으로 읽힌다. 규칙은 매뉴얼에
    // 역전 마법 표시·환산 레벨·이전 문구는 보이지 않는다 (v1.4.5)
  }
  // v3.19 판타지 마스터즈식 배치: 이름 → 레벨 아이콘 | 그림 → 종류 줄 → 글 상자(코인 · 능력 · 설명) | 오른쪽 열(클래스 · 공방체)
  const isU = c.type === "unit", isI = c.type === "item";
  const coinLine = isU ? coinLineHTML(c.co) : isI && c.item ? coinLineHTML(c.item.co) : "";
  const rcol = isU ? `<div class="c-rcol">${classIconHTML(c)}${vstats}</div>` : isI && vstats ? `<div class="c-rcol">${vstats}</div>` : "";
  const idTip = `${G.name} · ${G.en} · ${FACTIONS[c.faction].name}\n카드 ID ${c.id}`;   // v3.19.1: 맨 아래 단체 줄을 빼고 이름 말풍선으로
  return `<div class="card fm size-full ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${rcol ? " has-rcol" : ""} grade-${gr.id}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color};--gr:${gr.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame">
      <div class="c-head">${typeIconHTML(c)}<span class="c-hname" data-tip="${esc(idTip)}">${nameHTML(c, c.legend ? ' <small class="f-star">★</small>' : "")}</span>${grTag}</div>
      <div class="c-mid">
        <div class="c-side">${levelPips(c)}</div>
        <div class="c-art">${artHTML(c)}</div>
      </div>
      <div class="c-low">
        <div class="c-lowl">
          ${typeLine.length ? `<div class="f-type">${typeLine.map(t => `<span>${t}</span>`).join("")}</div>` : ""}
          <div class="c-box">${coinLine}<div class="f-text">${L.join("")}</div></div>
        </div>
        ${rcol}
      </div>
    </div>
  </div>`;
}

/* 큰 카드 + 설명 (전투 화면의 확대·모달). 카드 자체는 원본, inst가 있으면 전장 위의 실제 값도 보여 준다 */
function cardDetailHTML(c, inst) {
  const extra = instLines(inst);
  return `<div class="detail">${cardHTML(c, { size: "full" })}${extra ? `<div class="d-body">${extra}</div>` : ""}</div>`;
}
/* 원본 카드 창 (대기실 덱 보기·덱 조정실): 카드를 누르면 원본 카드를 화면 높이에 맞게 크게 연다.
   buttons를 주면 그 버튼들을, 없으면 닫기만. note는 카드 아래 한 줄 */
function showCardModal(c, buttons, note) {
  const pv = $("#card-preview"); if (pv) pv.hidden = true;
  const html = `<div class="detail">${cardHTML(c, { size: "full" })}${note ? `<p class="cm-note">${note}</p>` : ""}</div>`;
  return modal(html, buttons || [{ label: "닫기", value: null }], { cls: "card-modal" });
}
function instLines(inst) {
  if (!inst || !inst.t) return "";
  const lines = [];
  const cs = inst.t.coins || [];
  if (cs.length && cs[0].heads != null) lines.push(`<p class="d-coin">마지막으로 던진 코인: ${coinGroups(cs).map(o => `${o.parts.map(k => STAT_KO[k.st] + " " + sgnNum(k.v)).join("·")} ${o.heads ? "앞면" : "뒷면"}`).join(", ")}</p>`);
  if (inst.item) lines.push(`<p class="d-equip">장착 · ${esc(CARDS[inst.item.id].name)}<span>${esc(itemText(CARDS[inst.item.id].item))}</span></p>`);
  if (inst.item) for (const [k, v] of itemKwList(CARDS[inst.item.id].item)) if (v) lines.push(`<p class="d-type">${k ? `<b>${esc(k)}</b> ` : ""}${esc(v)}</p>`);
  return lines.join("");
}
function cardDetailBody(c, inst) {
  const el = ELEMENTS[c.el];
  const tags = [];
  if (c.group) tags.push(`<span class="tag grp" style="--gc:${GROUPS[c.group].color}">${GROUPS[c.group].name} · ${GROUPS[c.group].role}</span>`);
  if (c.faction) tags.push(`<span class="tag fac-${c.faction}">${FACTIONS[c.faction].name}</span>`);
  if (c.type === "item") tags.push(`<span class="tag">${esc(c.cat)} · ${esc(classTagText(c))}</span>`);
  if (c.type === "unit" && c.cl) tags.push(`<span class="tag">${esc(c.cl)}</span>`);
  const lines = [];
  if (c.type === "unit") {
    for (const s of giftSummary(c)) lines.push(`<p class="d-rules">${kwHTML(s)}</p>`);
    if (c.gift) for (const [k, v] of itemKwGenList(c.gift)) lines.push(`<p class="d-type"><b>${esc(k)}</b> ${esc(v)}</p>`);
    for (const [k, v] of pinKwGenList(c)) lines.push(`<p class="d-type"><b>${esc(k)}</b> ${esc(v)}</p>`);
    lines.push(`<p class="d-flavor">${esc(c.flavor || GROUPS[c.group].blurb)}</p>`);
  } else if (c.type === "item") {
    for (const s of itemSummary(c.item)) lines.push(`<p class="d-rules">${kwHTML(s)}</p>`);
    for (const [k, v] of itemKwGenList(c.item)) lines.push(`<p class="d-type"><b>${esc(k)}</b> ${esc(v)}</p>`);
    lines.push(`<p class="d-coin">공격·방어 준비 어느 때나 ${equipWho(c)} 장착합니다. 유닛 하나에 하나, 유지비 없음. 유닛이 쓰러지면 함께 소각.</p>`);
    if (c.flavor) lines.push(`<p class="d-flavor">${esc(c.flavor)}</p>`);
  } else {
    lines.push(`<p class="d-rules">${kwHTML(c.text.replace(/\s*\[장전 \d+\]/g, ""))}${c.cost.ether ? ` ${kwHTML("[장전 " + c.cost.ether + "]")} 다음 턴 에테르 −${c.cost.ether}.` : ""}</p>`);
    lines.push(spellCoinNoteHTML(c.text, "d-type"));
    if (c.flavor) lines.push(`<p class="d-flavor">${esc(c.flavor)}</p>`);   // v3.18 유니크 마법
  }
  lines.push(instLines(inst));
  if (Store.isAdmin()) lines.push(`<p class="d-type">그림 파일: <code>img/cards/${c.id}.png</code>${Art.has(c.id) ? "" : " (아직 없음 — 넣으면 자동으로 보입니다)"}</p>`);   // 관리자에게만
  return `<div class="d-body">
      <div class="d-tags">${tags.join("")}<span class="tag">${el.icon} ${el.name}</span></div>
      <p class="d-type">${TYPES[c.type].name} · 레벨 ${c.lv}${c.up ? ` · 유지비 ${c.up}` : ""}</p>
      ${lines.join("")}
    </div>`;
}

/* 토스트 */
function toast(msg, kind) {
  let box = $("#toasts");
  if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
  const t = document.createElement("div");
  t.className = "toast " + (kind || "");
  if (kind === "warn" && typeof FEEL !== "undefined") FEEL.play("deny", 0.8);
  t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => t.classList.add("out"), 2600);
  setTimeout(() => t.remove(), 3200);
}

/* 모달: html 내용과 버튼 목록. 버튼을 누르면 해당 값으로 resolve */
function modal(html, buttons, opts) {
  opts = opts || {};
  return new Promise(resolve => {
    const wrap = document.createElement("div");
    wrap.className = "modal-wrap";
    wrap.innerHTML = `<div class="modal ${opts.cls || ""}" role="dialog" aria-modal="true">${html}<div class="modal-btns">${(buttons || []).map((b, i) => `<button type="button" class="btn ${b.cls || ""}" data-i="${i}">${esc(b.label)}</button>`).join("")}</div></div>`;
    document.body.appendChild(wrap);
    const done = v => { wrap.remove(); resolve(v); };
    wrap.addEventListener("click", e => {
      const b = e.target.closest("[data-i]");
      if (b) { const btn = buttons[+b.dataset.i]; if (btn.onClick && btn.onClick(wrap) === false) return; done(btn.value); }
      else if (e.target === wrap && opts.dismiss !== false) done(null);
    });
    if (opts.onOpen) opts.onOpen(wrap);
    const first = wrap.querySelector("input,select,button.primary,button");
    if (first) setTimeout(() => first.focus(), 30);
  });
}

/* 원본 카드 미리보기 (덱 조정실·관리자 보관소): 카드에 마우스를 올리면 화면 오른쪽에 원본 카드가 크게 뜬다.
   마우스가 화면 오른쪽 절반에 있으면 가리지 않도록 왼쪽에 띄운다 */
function bindPreview(root) {
  let box = $("#card-preview");
  if (!box) { box = document.createElement("div"); box.id = "card-preview"; box.className = "card-preview"; box.hidden = true; document.body.appendChild(box); }
  let cur = null;
  const hide = () => { cur = null; box.hidden = true; };
  root.addEventListener("mouseover", e => {
    const el = e.target.closest("[data-card]");
    if (!el || !root.contains(el)) return;
    const c = CARDS[el.dataset.card]; if (!c) return;
    // v1.4.3: 화면 끝이 아니라 가운데 가까이에 띄운다. 마우스가 왼쪽 절반이면 가운데 조금 오른쪽, 오른쪽 절반이면 가운데 조금 왼쪽
    const left = e.clientX > innerWidth * 0.5;
    box.classList.toggle("on-left", left);
    if (cur !== c.id) { cur = c.id; box.innerHTML = cardHTML(c, { size: "full" }); }
    box.hidden = false;
    const gap = Math.max(24, innerWidth * 0.03);
    if (left) { box.style.left = ""; box.style.right = (innerWidth / 2 + gap) + "px"; }
    else { box.style.right = ""; box.style.left = (innerWidth / 2 + gap) + "px"; }
  });
  root.addEventListener("mouseout", e => {
    const from = e.target.closest("[data-card]"), to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest("[data-card]") : null;
    if (from && !to) hide();
  });
  // 화면이 바뀌면 미리보기를 닫는다
  const obs = new MutationObserver(() => { if (!root.isConnected) { hide(); obs.disconnect(); } });
  obs.observe(document.body, { childList: true, subtree: true });
}

/* 말풍선 설명: data-tip이 있는 요소에 마우스를 올리면 바로 보인다 (줄바꿈 \n) */
const Tip = {
  el: null,
  init() {
    if (this.el) return;
    this.el = document.createElement("div"); this.el.id = "tip"; this.el.hidden = true; document.body.appendChild(this.el);
    document.addEventListener("mouseover", e => {
      const t = e.target.closest && e.target.closest("[data-tip]");
      if (!t || document.body.classList.contains("hover-hold")) { this.el.hidden = true; return; }   // v3.9.4 hover-hold: 카드가 전장으로 올라가는 중 (js/game.js holdHover)
      const lines = t.dataset.tip.split("\n");
      // data-tip-kw: 줄마다 같은 크기로, 줄 앞의 [이름]만 금빛 굵게 (레벨·유지비 말풍선)
      const kw = t.hasAttribute("data-tip-kw");
      this.el.classList.toggle("tip-kw", kw);
      this.el.innerHTML = kw
        ? lines.map(l => `<span>${esc(l).replace(/^(\[[^\]]+\])/, "<b>$1</b>")}</span>`).join("")
        : `<b>${esc(lines[0])}</b>${lines.slice(1).map(l => `<span>${esc(l)}</span>`).join("")}`;
      this.el.hidden = false;
      const r = t.getBoundingClientRect(), w = this.el.offsetWidth, h = this.el.offsetHeight;
      let x = r.left + r.width / 2 - w / 2, y = r.top - h - 8;
      if (y < 6) y = r.bottom + 8;
      x = Math.max(6, Math.min(innerWidth - w - 6, x));
      this.el.style.left = x + "px"; this.el.style.top = y + "px";
    });
    document.addEventListener("scroll", () => { this.el.hidden = true; }, true);
  }
};
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => Tip.init()); else Tip.init();

function fmtTime(t) { const d = new Date(t); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }

/* ───────── v2.5 카드 뒷면 그림 (css/texture.css의 --card-back) ─────────
   상대 핸드 · 덱 맨 위 · 뽑힐 때 날아오는 카드가 함께 쓴다. 진짜 카드처럼: 검은 테두리 → 두꺼운 금테(금속 결) →
   남보라 바탕의 마름모 격자 → 안쪽 금 실선과 점선 · 네 모서리 꺾쇠 → 가운데 칠룡의 고리 메달(일곱 보석) 안의 에테르 결정 → 비스듬한 광택.
   글자는 넣지 않는다(그림 속 글꼴은 따로 불러올 수 없음). */
const CARD_BACK_SVG = (() => {
  const gems = Array.from({ length: 7 }, (_, k) => { const a = (-90 + k * 360 / 7) * Math.PI / 180, x = 125 + 57 * Math.cos(a), y = 175 + 57 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="url(#cbE)" stroke="#f6e2a8" stroke-width="1.4"/>`; }).join("");
  const corner = (sx, sy) => { const x = sx < 0 ? 230 : 20, y = sy < 0 ? 330 : 20, X = v => x + (sx < 0 ? -v : v), Y = v => y + (sy < 0 ? -v : v);
    return `<path d="M${X(0)} ${Y(34)}V${Y(0)}H${X(34)}" fill="none" stroke="url(#cbG)" stroke-width="3.2"/><path d="M${X(7)} ${Y(22)}V${Y(7)}H${X(22)}" fill="none" stroke="#d9b46a" stroke-opacity=".55" stroke-width="1.1"/><path d="M${X(14)} ${Y(8.5)}L${X(19.5)} ${Y(14)} ${X(14)} ${Y(19.5)} ${X(8.5)} ${Y(14)}Z" fill="url(#cbG)" stroke="#07050c" stroke-width=".9"/>`; };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350">
<defs>
<radialGradient id="cbB" cx="50%" cy="50%" r="72%"><stop offset="0" stop-color="#3a2d66"/><stop offset=".5" stop-color="#1c1638"/><stop offset="1" stop-color="#0a0816"/></radialGradient>
<pattern id="cbL" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="translate(125 175) rotate(45)"><path d="M0 0H22M0 0V22" stroke="#d9b46a" stroke-opacity=".11" stroke-width="1.3"/><circle cx="11" cy="11" r="1.3" fill="#d9b46a" fill-opacity=".16"/></pattern>
<linearGradient id="cbG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3cc"/><stop offset=".22" stop-color="#e2bd70"/><stop offset=".48" stop-color="#7a5418"/><stop offset=".7" stop-color="#f0d088"/><stop offset="1" stop-color="#6b4f1c"/></linearGradient>
<radialGradient id="cbM" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#1f3358"/><stop offset=".65" stop-color="#14112a"/><stop offset="1" stop-color="#08070f"/></radialGradient>
<radialGradient id="cbH" cx="50%" cy="50%" r="50%"><stop offset=".45" stop-color="#8fdcff" stop-opacity=".38"/><stop offset="1" stop-color="#8fdcff" stop-opacity="0"/></radialGradient>
<linearGradient id="cbC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4fdff"/><stop offset=".4" stop-color="#8fdcff"/><stop offset=".75" stop-color="#2f8ec4"/><stop offset="1" stop-color="#0f3d63"/></linearGradient>
<radialGradient id="cbE" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#9fe2ff"/><stop offset="1" stop-color="#1c6a99"/></radialGradient>
<linearGradient id="cbS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".32" stop-color="#fff" stop-opacity="0"/><stop offset=".66" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="250" height="350" rx="17" fill="#07050c"/>
<rect x="4" y="4" width="242" height="342" rx="14" fill="url(#cbG)"/>
<rect x="5.5" y="5.5" width="239" height="339" rx="13" fill="none" stroke="#fff6da" stroke-opacity=".5" stroke-width="1"/>
<rect x="12" y="12" width="226" height="326" rx="8" fill="url(#cbB)"/>
<rect x="12" y="12" width="226" height="326" rx="8" fill="url(#cbL)"/>
<rect x="12" y="12" width="226" height="326" rx="8" fill="none" stroke="#07050c" stroke-width="2.6"/>
<rect x="24" y="24" width="202" height="302" rx="3" fill="none" stroke="#d9b46a" stroke-opacity=".7" stroke-width="1.4"/>
<rect x="29" y="29" width="192" height="292" rx="2" fill="none" stroke="#d9b46a" stroke-opacity=".32" stroke-width="1" stroke-dasharray="2 3.2"/>
${corner(1, 1)}${corner(-1, 1)}${corner(1, -1)}${corner(-1, -1)}
<path d="M125 40V96M125 254V310" stroke="url(#cbG)" stroke-width="2.4"/>
<path d="M125 36 131 44 125 52 119 44Z M125 298 131 306 125 314 119 306Z" fill="url(#cbG)" stroke="#07050c" stroke-width="1"/>
<path d="M54 175H60M190 175H196" stroke="#d9b46a" stroke-opacity=".6" stroke-width="2"/>
<circle cx="125" cy="175" r="92" fill="url(#cbH)"/>
<circle cx="125" cy="175" r="69" fill="#07050c"/>
<circle cx="125" cy="175" r="66" fill="url(#cbM)" stroke="url(#cbG)" stroke-width="6"/>
<circle cx="125" cy="175" r="62.6" fill="none" stroke="#07050c" stroke-width="1.2"/>
<circle cx="125" cy="175" r="57" fill="none" stroke="#d9b46a" stroke-opacity=".45" stroke-width="1" stroke-dasharray="1.6 3"/>
${gems}
<path d="M125 129 157 175 125 221 93 175Z M96 146 154 146 154 204 96 204Z" fill="none" stroke="#d9b46a" stroke-opacity=".5" stroke-width="1.3"/>
<path d="M125 134 140 158 136 194 125 214 114 194 110 158Z" fill="url(#cbC)" stroke="#07050c" stroke-width="1.6"/>
<path d="M125 134V214M110 158 125 165 140 158M114 194 125 186 136 194" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1"/>
<path d="M118 150 125 140 129 152Z" fill="#fff" fill-opacity=".55"/>
<rect x="4" y="4" width="242" height="342" rx="14" fill="url(#cbS)"/>
</svg>`;
  return svg;
})();
(function setCardBack() {
  // v3.9.14: 카드 뒷면은 그림 한 장(img/ui/deck/card_back.png — 에테리온 문장 메달, 원본 img/ui/src/cardback.js).
  // 위의 CARD_BACK_SVG(v2.5 코드 그림)는 되돌릴 때를 위해 남겨 두고 쓰지 않는다. 주소는 문서 기준 절대 주소로(사용자 지정 속성 안의 상대 주소가 css 파일 기준으로 풀리지 않게)
  // v3.19.2: 그림 아래쪽에 ETHERION 글씨를 구워 넣었다(원본 card_back_plain.png + tools/art/cardback_text.py). ?v= 는 예전 그림 캐시를 피하려고
  const art = new URL("img/ui/deck/card_back.png?v=2", document.baseURI).href;
  const url = `url("${art}")`;
  document.documentElement.style.setProperty("--card-back", url);
})();

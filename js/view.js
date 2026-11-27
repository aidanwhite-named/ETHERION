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
/* 일러스트 자리: img/cards/<파일>이 있으면 그 그림을, 없으면 단체 문양을 보여 준다.
   v3.41 어떤 카드에 그림이 있는지는 목록 파일 img/cards/art_index.js(window.ART_INDEX = { 카드ID: 파일 이름 })로 안다 —
   예전처럼 시작할 때 모든 카드의 그림 파일을 하나씩 열어 보지 않는다(788장이면 폰 · 서버 접속에서 수백 MB). 목록은 tools/art/artmap.py가 만든다.
   그림은 화면에 보일 때만 받는다(loading="lazy" · decoding="async"). 목록이 없을 때만 예전처럼 열어 본다(개발 중) */
const Art = {
  dir: "img/cards/", ok: new Set(), file: {}, done: false,
  probe(ids, onDone) {
    if (typeof ART_INDEX !== "undefined" && ART_INDEX) {
      for (const id in ART_INDEX) if (ART_INDEX[id]) { this.ok.add(id); this.file[id] = ART_INDEX[id]; }
      this.done = true; if (onDone) onDone(); return;
    }
    let left = ids.length; if (!left) { this.done = true; return; }
    for (const id of ids) {
      const im = new Image();
      im.onload = () => { this.ok.add(id); this.file[id] = id + ".png"; if (!--left) { this.done = true; onDone && onDone(); } };
      im.onerror = () => { if (!--left) { this.done = true; onDone && onDone(); } };
      im.src = this.dir + id + ".png";
    }
  },
  has(id) { return this.ok.has(id); },
  src(id) { return this.dir + (this.file[id] || id + ".png"); }
};
function artHTML(c) {
  return Art.has(c.id) ? `<img class="c-img" src="${Art.src(c.id)}" alt="" draggable="false" loading="lazy" decoding="async">${cardGlyph(c)}` : cardGlyph(c);
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
/* 2026-11-20 그림 프레임 유닛 카드(css/frames.css)용: 깃발 프레임 그림이 있는 단체 · 레벨 아이콘 그림 · 왼쪽 위 에테르 레벨 문장 */
const FRAME_GROUPS = new Set(["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"]);   // img/ui/frames/frame_<ID>_unit.jpg
/* --dpx = 기기 픽셀 한 칸(CSS px). css/frames.css가 전장 · 핸드 카드의 테두리 두께를 브라우저가 그리는 값과 똑같이 깎는 데 쓴다(확대 · 축소를 바꾸면 resize가 온다) */
function syncDpx() { document.documentElement.style.setProperty("--dpx", 1 / (window.devicePixelRatio || 1) + "px"); }
syncDpx(); addEventListener("resize", syncDpx);
function framePips(c) {
  const up = c.type === "unit" ? c.up || 0 : 0, full = c.lv - up, img = `<img src="img/ui/pips/pip_${c.group}.png" alt="" draggable="false">`;
  let h = "";
  for (let i = 0; i < c.lv; i++) h += `<i class="pip${i >= full ? " pip-up" : ""}">${img}</i>`;
  return `<div class="c-pips" style="--lvn:${Math.max(1, c.lv)}" data-tip="${esc(lvTip(c))}" data-tip-kw>${h}</div>`;
}
/* 프레임 카드의 종류 띠: 종류 줄(raceLineHTML) 끝에 클래스 · 마법 종류 아이콘 */
function frameBandHTML(c, gr) {
  return raceLineHTML(c, gr).replace('class="c-race"', 'class="c-race c-band"').replace(/<\/div>$/, classIconHTML(c) + "</div>");
}
function frameBgAttr(c) { return ` style="background-image:url(img/ui/frames/frame_${c.group}_unit.jpg?v=2)"`; }
function frameEmblemHTML(c) {
  return `<div class="c-emb"><img src="img/ui/ether/ether_emb.png?v=1" alt="" draggable="false"><i class="c-orb"></i><i class="c-enum" data-tip="${esc(`레벨 ${c.lv || 0} · ${unitKindTip(c)}`)}"><b>${c.lv || 0}</b></i></div>`;
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
/* v3.28 업그레이드(강화) 마크: 육각 테두리 안의 겹친 위 화살 둘 + 꼭대기 별빛. 강화 카드(js/upgrades.js)의 클래스 동그라미 자리와 그림 왼쪽 위 */
const UPGRADE_MARK = '<path d="M12 1.6 21 6.8v10.4L12 22.4 3 17.2V6.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.2 12.6 12 8l4.8 4.6M7.2 17 12 12.4l4.8 4.6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="4.9" r="1.15"/>';
const upgradeTip = c => `강화 카드\n「${CARDS[c.base] ? CARDS[c.base].name : ""}」 3장을 합친 강화판입니다. 레벨 +1 · 유지비 +1, 스탯이 크게 오릅니다.\n클래스가 없어 어떤 아이템이든 장착할 수 있습니다.`;
/* v3.59 스페셜 광휘(css/fmcard.css 끝): 그림 둘레 금 · 진홍 두 겹 액자 + 네 모서리 금 장식 + 그림 위로 떠오르는 진홍 · 금 불티. 그림만 꾸미고 누르는 것은 막지 않는다 */
const specialFxHTML = (gr) => gr && gr.id === "special" ? '<i class="c-spfx" aria-hidden="true"></i>' : "";
function upgradeMarkHTML(c, cls) { return `<i class="${cls || "c-clsb c-upmark"}" data-tip="${esc(upgradeTip(c))}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${UPGRADE_MARK}</svg></i>`; }
function cardClasses(c) {
  if (c.type === "unit" && c.anyItem) return [];   // v3.28 강화 카드는 클래스가 없다 — 그 자리에 업그레이드 마크(classIconHTML)
  if (c.type === "unit") return c.cl ? [c.cl] : [];
  // v3.9.9: 아이템은 오른쪽 위 아이콘을 쓰지 않는다 — "마도 전용" 아이템에 마도 아이콘이 있으면 마도 카드로 읽혀서.
  //   장착할 수 있는 클래스는 이름 옆 꼬리표(": [마도 전용]" · ": [공용]")와 원본 카드 설명에 나온다
  return [];
}
function classTip(c, cl) {
  if (c.type === "unit") return `클래스: ${cl}\n${CLASS_INFO[cl]}.\n장착할 수 있는 아이템: [${cl} 전용]이 적힌 아이템, [공용] 아이템.`;
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
  const cs = cardClasses(c), kind = kindBadgeHTML(c), up = c.anyItem ? upgradeMarkHTML(c) : "";
  if (!cs.length && !kind && !up) return "";
  return `<div class="c-clsico">${up}${cs.map(cl => classCircleHTML(c, cl)).join("")}${kind}</div>`;
}

/* ---------- v3.19 판타지 마스터즈식 카드 배치 (css/fmcard.css) ----------
   왼쪽 위 = 카드 종류 아이콘, 그 옆 = 이름 / 왼쪽 세로 = 레벨 아이콘(소환 · 유지비) / 가운데 = 그림
   그림 아래 = 종족 줄(단체 · 등급) → 글 상자(코인 · 특수 능력 · 짧은 문구 · 설명) / 오른쪽 아래 열 = 클래스 아이콘 + 공 · 방 · 체 */
const TYPE_ICON_UNIT = '<path d="M12 2.4c-3.7 0-6.1 2.7-6.1 6.3v3.1l1.7 1.4V9.6h8.8v3.6l1.7-1.4V8.7c0-3.6-2.4-6.3-6.1-6.3z"/><path d="M8.7 10.9h6.6v2.9c0 2-1.5 3.6-3.3 3.6s-3.3-1.6-3.3-3.6z"/><path d="M3.8 21.6c.7-3.1 3.2-4.7 5.5-5L12 19.2l2.7-2.6c2.3.3 4.8 1.9 5.5 5z"/>';
const TYPE_KO = { unit: "유닛", item: "아이템" };
/* 공격 기술 줄 (v3.19, 판타지 마스터즈처럼): 유닛은 늘 한 줄 — 특수 능력이 있으면 그 이름(사격 2 · 투척 2 …), 없으면 "일반공격" */
const NORMAL_ATK_TIP = "일반공격\n특수 능력이 없는 공격입니다. 전투에서 자기 차례가 오면 상대 대기열 맨 앞 유닛과 맞붙고, 막을 유닛이 없으면 생명을 공격합니다.";
const normalAtkChip = () => `<span class="c-cls c-ab c-plain" data-tip="${esc(NORMAL_ATK_TIP)}">일반공격</span>`;
/* v3.31.1: 유닛 종류 아이콘 말풍선 첫 줄에 클래스 (핸드에서도 뜬다 — css/battle-v19.css) */
function unitClassWord(c) { return c.anyItem ? "강화 (클래스 없음)" : c.cl || ""; }
function unitKindTip(c) { const w = unitClassWord(c); return `유닛${w ? " · " + w : ""}\n전장의 칸에 소환합니다. 레벨만큼 에테르, 살아남으면 매 턴 유지비.`; }
/* v3.62.1 왼쪽 위 네모 = 레벨 숫자. 네모의 색(유닛 금 · 마법 종류색 · 아이템 바랜 금)이 카드 종류를 알린다.
   (v3.19 ~ v3.62.0: 네모 안에 종류 그림 — 유닛 투구 · 마법 칼/방패/겹침/눈 · 아이템 보석. TYPE_ICON_UNIT · ITEM_KIND_ICON · RITE_ICON은 다른 곳에서 그대로 씀) */
function typeIconHTML(c) {
  const lv = `<b class="c-tlv">${c.lv || 0}</b>`, tip = t => esc(`레벨 ${c.lv || 0} · ${t}`);
  if (c.type === "unit") return `<i class="c-type t-unit" data-tip="${tip(unitKindTip(c))}">${lv}</i>`;
  if (c.type === "item") return `<i class="c-type t-item" data-tip="${tip(itemKindTip(c))}">${lv}</i>`;
  return `<i class="c-type t-${c.type} c-kind kind-${c.type}" data-tip="${tip(RITE_TIP[c.type] || "마법")}">${lv}</i>`;
}
/* 코인 줄: 공 · 방 · 체 아이콘 + 그 스탯의 코인 (+2● +●) — 판타지 마스터즈의 "+2C1 / =C1 / +C1" 자리 */
/* 2026-11-25 코인 줄은 늘 한 줄: 공 · 방 · 체 세 칸이 다 있거나 코인 묶음이 여럿이면 셋째 칸이 다음 줄로 넘어갔다(핸드 14장).
   줄 폭을 글자 크기(em)로 어림해 --cw로 주고, CSS(css/frames.css "코인 줄 한 줄")가 글 상자 폭(cqw)에 맞춰 그 줄만 줄인다 — 화면마다 재지 않는다.
   어림: 칸 = 아이콘 .94 + 묶음마다 [부호 .55 + 숫자 .39(±2 이상) + 점 .74 + 겹친 점 .36 × (개수 − 1)], 묶음 사이 .08 */
function coinLineHTML(co) {
  let cw = 0;
  const parts = ["a", "d", "h"].map(k => {
    const marks = coinMarks(co, k); if (!marks.length) return "";
    const tip = marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n");
    cw += .94 + marks.reduce((s, m, i) => s + (i ? .08 : 0) + .55 + (Math.abs(m.v) > 1 ? .39 * String(Math.abs(m.v)).length : 0) + .74 + .36 * (m.n - 1), 0);
    return `<span class="cl-s cl-${k}" data-tip="${esc(tip)}">${statIco(k)}${coinGroupsHTML(marks)}</span>`;
  }).filter(Boolean);
  return parts.length ? `<div class="c-coinline${parts.length > 2 ? " cl-n3" : ""}" style="--cw:${cw.toFixed(2)};--cg:${parts.length - 1}">${parts.join("")}</div>` : "";
}
/* 종족 줄(그림 바로 아래): 왼쪽 = 카드 종류 글씨(유닛 · 공격 마법 · 아이템, 종류 아이콘 색) + 유닛은 단체 · 아이템은 장착 클래스, 오른쪽 = 등급.
   v3.19.8: 맨 앞 종류 글씨를 굵고 조금 크게(.r-t). 아이템도 "아이템"이 보인다. 단체 온전한 이름 · 무구 · 각인 같은 아이템 종류는 말풍선으로 */
function raceLineHTML(c, gr) {
  const G = GROUPS[c.group], isU = c.type === "unit", isI = c.type === "item";
  const word = isU ? "유닛" : isI ? "아이템" : (RITE_TIP[c.type] || "마법");
  // 핸드 카드 폭에서도 잘리지 않게 짧게: 유닛은 종류만(v3.79 js/kinds.js의 kin — 이프리트 · 골렘 …), 아이템은 장착 클래스만. 온전한 이름은 말풍선
  // v3.59 스페셜 유닛은 깃발마다 하나뿐인 존재 — 종족 낱말(고블린 · 드워프 · 노움 …)을 쓰지 않는다. 깃발은 말풍선에만
  const asc = isU && c.special;
  const rest = asc ? "" : isU ? (c.kin || "") : isI ? (isAllClass(c) ? "공용" : itemClasses(c).join("·")) : "";
  const tip = asc ? `유닛 · 스페셜 — 깃발마다 하나뿐인 존재${G ? `\n깃발: ${G.name}` : ""}` + (unitClassWord(c) ? `\n클래스: ${unitClassWord(c)}` : "")
    : isU ? (G ? `유닛 · ${G.name}` : "") + (c.kin ? `\n종류: ${c.kin}` : "") + (unitClassWord(c) ? `\n클래스: ${unitClassWord(c)}` : "") : isI ? `아이템 · ${c.cat || ""}\n${equipWho(c)} 장착` : "";
  return `<div class="c-race"><span class="r-l"${tip ? ` data-tip="${esc(tip)}"` : ""}><b class="r-t t-${c.type}">${esc(word)}</b>${rest ? `<span class="r-sep">·</span>${esc(rest)}` : ""}</span><span class="r-g" style="--gr:${gr.color}">${esc(gr.name)}</span></div>`;
}

/* 마법 종류 아이콘: 공격 = 칼, 방어 = 방패, 공용(둘 다) = 칼과 방패가 겹친 모양 (viewBox 0 0 64 64) */
const RITE_SWORD = '<path d="M52 4h8v8L31 41l-8-8z"/><path d="M15 35l14 14-4 4-3.5-3.5-7.5 7.5-4-4 7.5-7.5L14 42z"/>';
const RITE_SHIELD = '<path d="M32 4 55 12v16c0 15-9.5 26-23 33C18.5 54 9 43 9 28V12z"/><path d="M32 12v41M18 26h28" stroke="#000" stroke-opacity=".35" stroke-width="3"/>';
const RITE_ICON = {
  hand: `<path d="M4 32c8-12 18-18 28-18s20 6 28 18c-8 12-18 18-28 18S12 44 4 32z"/><circle cx="32" cy="32" r="10" fill="#0c0b12"/><circle cx="32" cy="32" r="5"/>`,
  atk: RITE_SWORD,
  def: RITE_SHIELD,
  any: `<g opacity=".5" transform="translate(2.56 2.6) scale(.92)">${RITE_SHIELD}</g><g stroke="#0c0b12" stroke-width="4" stroke-linejoin="round" paint-order="stroke" transform="translate(-1 0)">${RITE_SWORD}</g>`   // 2026-11-20 방패 · 칼 모두 가운데(32, 32.5)에 — 예전엔 방패가 왼쪽 위로 9.6 비켜 비뚤어 보였다
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
  L: k => `🔒 [고정: ${STAT_KO[k]}] 증가 · 감소 효과를 모두 받지 않습니다.`,
  U: k => `▲ [버팀: ${STAT_KO[k]}] 감소 효과를 받지 않습니다(피해 제외).`,
  D: k => `▼ [눌림: ${STAT_KO[k]}] 증가 효과를 받지 않습니다.`
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
  // 2026-11-16 레어 오라가 올린 스탯은 초록(올림) · 빨강(내림) 대신 오라 색(호박 --aura, css/cardtext.css .st.aura). 마우스를 올리면 어느 오라가 얼마나
  const auw = live && live.au && live.au[k] && typeof auraWhy === "function" ? auraWhy(live.au, k) : [];
  if (auw.length) cls = " aura";
  const marks = coinMarks(co || c.co, k);
  // v3.20 표시: 전장에서는 이번 턴 표시(유닛 + 아이템 + 마법이 건 것, live.pins), 그 밖에는 카드에 새겨진 표시
  const m = live && live.pins ? live.pins[k] : pinModesOf(c)[k];
  const tip = `${STAT_KO[k]} ${val}` + (auw.length ? "\n◎ " + auw.join("\n◎ ") + (val - live.au[k] !== base ? `\n(오라 빼면 ${val - live.au[k]} · 카드 ${base})` : "") : "") + (marks.length ? "\n" + marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n") : "") + (m ? "\n" + PIN_TIP[m](k) : "");
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
/* v3.65.2 능력 끄기(효과 strip)에 꺼진 칩인가: off = 유닛의 t.off(꺼진 능력 이름들). "[가시 2]" · "[보호막 코인]"처럼 이름 뒤에 수치 · 말이 붙어도 같은 능력 */
function chipOff(raw, off) {
  if (!off || !off.length) return false;
  const k = String(raw).replace(/^\[|\]$/g, "");
  return off.some(n => k === n || k.startsWith(n + " "));
}
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
  if (isU && c.gift) chips += itemGrants(c.gift).filter(raw => !chipOff(raw, live && live.off)).map(raw => `<span class="c-cls c-ab" data-tip="${esc(raw + " " + (itemKwDesc(raw) || c.gift.evText || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");
  if (isU && !chips) chips = normalAtkChip();   // 특수 능력이 없어도 같은 규격으로 "일반공격"
  // 2026-11-18 카드에 새겨진 표시(🔒 ▲ ▼)는 칩으로 적지 않는다 — 숫자 옆 아이콘과 그 말풍선이 뜻을 맡는다(사용자)
  if (isI) chips += itemAbilities(c.item).filter(raw => !isPinAb(raw)).map(raw => `<span class="c-cls c-ab" data-tip="${esc(raw + " " + (itemKwDesc(raw) || c.item.evText || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");
  // v3.60 짧은 문구가 있는 작은 카드: 문구에 이미 적힌 키워드 · "해제"로 적힌 끄는 키워드는 칩으로 다시 쓰지 않는다(칩 글자를 키운 만큼 자리를 아낌).
  // 2026-11-24 숫자 없는 키워드는 괄호 없이 적혀 있어도("· 수호") 뺀다 — 폰 핸드에서 칩 한 줄이 마법 문구를 상자 밖으로 밀었다
  const bsrc = isS && size !== "lg" && typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[c.id] || "";
  if (isS) { const off = spellKwOff(c); chips += spellKwList(c).filter(raw => !bsrc || !(bsrc.includes(raw) || !/\d/.test(raw) && bsrc.includes(raw.slice(1, -1)) || off.has(raw) && /해제/.test(bsrc))).map(raw => off.has(raw)   // v3.31.4 상대의 능력을 끄는 키워드는 빨간 칩
    ? `<span class="c-cls c-ab c-off" data-tip="${esc("상대 유닛의 " + raw + "을(를) 끈다.\n" + raw + " " + (spellKwDesc(raw.replace(/^\[|\]$/g, "")) || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`
    : `<span class="c-cls c-ab" data-tip="${esc(coinNotePlain(raw) + " " + (spellKwDesc(raw.replace(/^\[|\]$/g, "")) || ""))}">${coinNoteHTML(esc(raw.replace(/^\[|\]$/g, "")))}</span>`).join(""); }
  const sBrief = isS && size !== "lg" ? spellBriefHTML(c) : "";   // 큰 카드(lg)는 마법 글 전문
  const sText = isS && !sBrief ? `<p class="c-stext">${kwHTML(c.text || "")}</p>` : "";
  const flv = c.flavor || "";   // 카드 고유의 분위기 글만 (단체 소개 글은 원본 카드에)
  const framed = FRAME_GROUPS.has(c.group);   // 2026-11-20 그림 프레임(css/frames.css) — 아래 return 참고
  // 프레임 카드: 글 상자 맨 위에 종류 띠(끝에 아이콘), 분위기 글은 빼고 특수능력 · 코인 · 마법 효과만(크게 보기 · lg 패널은 그대로)
  const box = (framed ? frameBandHTML(c, gr) : "") + (isU ? coinLineHTML(c.co) : isI && c.item ? coinLineHTML(c.item.co) : "") + (chips ? `<div class="c-chips">${chips}</div>` : "") + sBrief + sText + desc + (opts.extra || "") + (flv && !(framed && size !== "lg") ? `<p class="c-flv">${esc(flv)}</p>` : "");
  // v3.63.1 마법도 유닛의 클래스 동그라미 자리(오른쪽 열 위)에 종류 아이콘: 공격 칼 · 방어 방패 · 공용 칼+방패 · 계략 눈 (네모)
  // 2026-11-20 그림 프레임(css/frames.css): 깃발 프레임 + 왼쪽 위 에테르 레벨 문장 + 그림 레벨 아이콘 — 유닛 · 마법 · 아이템, 전장 · 핸드(slim)도.
  // 아이콘은 종류 띠 끝(frameBandHTML)으로 옮겨 오른쪽 열에는 공 · 방 · 체만. 그 열이 없는 카드(마법 · 숫자 없는 아이템)는 글 상자가 오른쪽 끝까지(fr-wide)
  const rcol = framed ? (vstats ? `<div class="c-rcol">${vstats}</div>` : "") : isU ? `<div class="c-rcol">${classIconHTML(c)}${vstats}</div>` : isI && vstats ? `<div class="c-rcol">${vstats}</div>` : isS && RITE_ICON[c.type] ? `<div class="c-rcol r-sp">${classIconHTML(c)}</div>` : "";
  return `<div class="card fm size-${size} ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${dk ? " has-desc" : ""}${slim ? " slim" : ""}${sBrief ? " has-brief" : ""}${rcol ? " has-rcol" : ""}${framed ? " has-frame fr-" + c.group + (vstats ? "" : " fr-wide") : ""} grade-${gr.id}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color};--gr:${gr.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame"${framed ? frameBgAttr(c) : ""}>
      <div class="c-head">${typeIconHTML(c)}${nameHTML(c)}</div>
      <div class="c-mid">
        <div class="c-side">${framed ? framePips(c) : levelPips(c)}</div>
        <div class="c-art">${artHTML(c)}${specialFxHTML(gr)}${c.base ? upgradeMarkHTML(c, "c-upart") : ""}${opts.badges ? `<div class="c-badges">${opts.badges}</div>` : ""}${opts.artx || ""}</div>
      </div>
      <div class="c-low">
        <div class="c-lowl">${raceLineHTML(c, gr)}<div class="c-box"><div class="c-boxin${box.includes('class="c-equip"') ? " bx-eq" : ""}">${box}</div></div></div>
        ${rcol}
      </div>
      ${foot}${framed ? frameEmblemHTML(c) : ""}
    </div>${opts.count != null ? `<span class="c-count">×${opts.count}</span>` : ""}
  </div>`;
}
/* v3.9.9: 마법 카드의 짧은 문구 (js/briefs.js SPELL_BRIEF). 핸드 · 전장 카드(slim)의 그림 아래쪽에 겹쳐 보인다.
   한 줄 = 효과 하나("|"로 나눔). {대상} = 색 칩, ⚔⛨♥ = 공·방·체 아이콘, +1C×2 = 코인(+●●), [키워드] = 말풍선 */
const BRIEF_TONE = { "적": "foe", "아군": "ally", "나": "ally", "뒤": "ally", "양쪽": "both", "대가": "cost", "제물": "cost", "핸드": "hand" };
function spellBriefLine(line, tones) {   // tones: 2026-11-27 번역 문구일 때 대상 칩의 색(한국어 문구에서 읽은 차례대로)
  const re = /\{([^}]+)\}|\[([^\[\]]+)\]|([+−])(\d+)C(?:×(\d+))?|([⚔⛨♥])/g;
  let out = "", at = 0, m, ti = 0;
  while ((m = re.exec(line))) {
    out += esc(line.slice(at, m.index)); at = re.lastIndex;
    if (m[1]) out += `<b class="sb-t sb-${(tones && tones[ti++]) || BRIEF_TONE[m[1].split(" ")[0]] || "foe"}">${esc(m[1])}</b>`;
    else if (m[2]) out += kwHTML(m[0]);
    else if (m[3]) out += coinGroupsHTML([{ v: (m[3] === "−" ? -1 : 1) * +m[4], n: +(m[5] || 1) }]);
    else out += statIco({ "⚔": "a", "⛨": "d", "♥": "h" }[m[6]]);
  }
  return out + esc(line.slice(at));
}
function spellBriefHTML(c) {
  const src = typeof SPELL_BRIEF !== "undefined" && SPELL_BRIEF[c.id];
  if (!src) return "";
  const loc = typeof I18N !== "undefined" && I18N.on ? I18N.brief(c.id) : null;   // 2026-11-27 다국어: 카드 ID 번역 문구(cards.<말>.js b)
  if (loc) {
    const ko = src.split("|"), tones = l => (l.match(/\{([^}]+)\}/g) || []).map(x => BRIEF_TONE[x.slice(1, -1).split(" ")[0]] || "foe");
    return `<div class="c-brief">${loc.split("|").map((l, i) => `<p>${spellBriefLine(l, tones(ko[i] || ""))}</p>`).join("")}</div>`;
  }
  return `<div class="c-brief">${src.split("|").map(l => `<p>${spellBriefLine(l)}</p>`).join("")}</div>`;
}
/* v3.31.4: 마법 글에서 "[보호막]·[가시]…가 꺼지고"처럼 상대의 능력을 끄는 키워드 (빨간 칩으로) */
function spellKwOff(c) {
  const out = new Set(), re = /((?:\[[^\]]+\]\s*·?\s*)+)(?:이|가|을|를)?\s*(?:꺼지|꺼진|끈다|끄고|잃|사라지|없앤|없어지)/g;
  let m; while ((m = re.exec(c.text || ""))) for (const k of m[1].match(/\[[^\]]+\]/g) || []) out.add(k);
  return out;
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
  (root || document).querySelectorAll(".slot .card.fm > .c-frame .c-boxin, .hand-me .card.fm > .c-frame .c-boxin").forEach(fitFieldBox);   // 2026-11-24 핸드도
  fitBriefs(root);
}
/* 2026-11-15 마법 짧은 문구(.c-brief)는 글자를 키웠다(css/cardtext.css). 긴 문구가 글 상자 밑으로 넘치는 카드만 --bfs로 조금씩 줄인다.
   모두 먼저 재고(읽기) 넘친 것만 한꺼번에 고친다(쓰기) — 덱 조정실처럼 카드가 많아도 화면 다시 그리기를 몇 번만
   names: 맞출 카드 묶음(배열)을 받을 때 이름도 맞출지 (root를 받으면 예전처럼 마법 문구가 있을 때만) */
function fitBriefs(root, names) {
  const scope = fitScope(root);
  if (scope !== root) names = fitScope.names;
  const list = fitQ(scope, ".card.fm .c-box .c-brief");
  if (list.length) {
    for (const b of list) { if (b.style.getPropertyValue("--bfs")) b.style.removeProperty("--bfs"); b.parentElement.classList.remove("fit-nochip", "fit-noband"); }
    const over = b => { const box = b.closest(".c-boxin") || b.closest(".c-box"), p = b.lastElementChild;
      return box && p && p.getBoundingClientRect().bottom > box.getBoundingClientRect().bottom + 0.5; };
    const shrink = (arr, steps) => { for (const s of steps) { if (!arr.length) break; for (const b of arr) b.style.setProperty("--bfs", s); arr = arr.filter(over); } return arr; };
    // 2026-11-26 폰 핸드는 문구 글자를 키웠다(css/frames.css 1.14em) — 줄이는 단계도 그만큼 더 내려가 긴 문구는 예전 크기(.8배 = 지금 .67배, 끝 .7배 = .59배)에 닿는다
    const deep = document.documentElement.classList.contains("mobile") ? b => !!b.closest(".hand-me") : () => false;
    const S1 = [0.95, 0.9, 0.85, 0.8], S1D = S1.concat(0.78, 0.75, 0.71, 0.67);
    const shrink1 = arr => shrink(arr.filter(b => !deep(b)), S1).concat(shrink(arr.filter(deep), S1D));
    let bad = shrink1(list.filter(over));
    // 2026-11-24 폰 핸드(글 상자 37~48px): .8배로도 넘치면 ① 키워드 칩 줄 ② 종류 띠(유닛 · 마법 종류 · 등급 줄)를 차례로 숨기고(크게 보기에는 그대로)
    // 그때마다 처음 크기부터 다시 맞춘다. 끝까지 넘치면 .7배까지
    for (const [cls, sel] of [["fit-nochip", ":scope > .c-chips"], ["fit-noband", ":scope > .c-band"]]) {
      const hand = bad.filter(b => b.closest(".hand-me") && b.parentElement.querySelector(sel));
      for (const b of hand) { b.parentElement.classList.add(cls); b.style.removeProperty("--bfs"); }
      bad = bad.filter(b => !hand.includes(b)).concat(shrink1(hand.filter(over)));
    }
    shrink(bad.filter(b => !deep(b)), [0.75, 0.7]); shrink(bad.filter(deep), [0.63, 0.59]);
  }
  if (list.length || names) fitCardNames(scope);
}
/* 2026-11-22 메뉴 전환 빠르게: 메뉴의 카드 목록(덱 조정실 보관함 · 대기실 덱 보기 · 퀘스트 도감 …, css/perf.css)은 content-visibility:auto라
   화면 밖 카드는 브라우저가 배치 · 그리기를 건너뛴다. 글 맞춤이 그 카드들 속을 재면 건너뛴 일을 억지로 다 하게 되므로(덱 조정실 열기 0.5초),
   지금 화면 근처 카드만 바로 맞추고 나머지는 화면에 다가올 때(contentvisibilityautostatechange) 맞춘다. 이 기능이 없는 브라우저는 예전처럼 한꺼번에 잰다 */
const FIT_LAZY = typeof ContentVisibilityAutoStateChangeEvent !== "undefined";
const fitLater = new WeakMap();   // 화면 밖이라 미룬 카드 → 이름도 맞출지
function fitScope(root) {
  if (!FIT_LAZY || Array.isArray(root)) return root;
  const r = root || document, cards = r.querySelectorAll(".card.fm");
  if (!cards.length) return r;
  const vw = innerWidth, vh = innerHeight, near = [];
  let later = null;
  for (const c of cards) {
    if (getComputedStyle(c).contentVisibility !== "auto") { near.push(c); continue; }
    const b = c.getBoundingClientRect();   // 카드 자신의 자리만 읽는다(속은 재지 않음)
    if (b.width && b.bottom > -vh / 4 && b.top < vh * 1.25 && b.right > -vw / 4 && b.left < vw * 1.25) { near.push(c); fitLater.delete(c); }   // 보이는 곳 + 조금. 그 밖은 브라우저가 첫 그림 때 알려 준다
    else (later || (later = [])).push(c);
  }
  if (!later) return r;   // 모두 화면 근처 = 예전과 같다
  fitScope.names = !!r.querySelector(".card.fm .c-box .c-brief");
  for (const c of later) fitLater.set(c, fitScope.names);
  return near;
}
const fitQ = (scope, sel) => Array.isArray(scope) ? scope.flatMap(c => [...c.querySelectorAll(sel)]) : [...(scope || document).querySelectorAll(sel)];
if (FIT_LAZY) {
  const due = new Set(); let raf = 0;
  document.addEventListener("contentvisibilityautostatechange", e => {
    if (e.skipped || !fitLater.has(e.target)) return;
    due.add(e.target);
    if (!raf) raf = requestAnimationFrame(() => {   // 한 번에 들어온 카드들을 묶어 재기 · 고치기를 몇 번만
      raf = 0;
      const go = [[], []];
      for (const c of due) if (c.isConnected && fitLater.has(c)) { go[fitLater.get(c) ? 1 : 0].push(c); fitLater.delete(c); }
      due.clear();
      if (go[0].length) fitBriefs(go[0], false);
      if (go[1].length) fitBriefs(go[1], true);
    });
  }, true);
}
/* 작은 카드 이름 1줄 맞춤: 넘치는 카드만 ① 글자 살짝 축소 → ② 그래도 넘치면 "○○의 " 앞 수식어를 "…"로 생략 */
function fitCardNames(root) {
  const list = fitQ(root, ".card.fm:not(.size-full) .c-head .c-name");
  if (!list.length) return;
  for (const el of list) {
    if (el.dataset.fullName == null) el.dataset.fullName = el.textContent;
    if (el.textContent !== el.dataset.fullName) el.textContent = el.dataset.fullName;
    if (el.style.getPropertyValue("--ns")) el.style.removeProperty("--ns");
  }
  const over = el => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1;
  let bad = list.filter(over);
  for (const s of [0.92, 0.85]) {
    if (!bad.length) break;
    for (const el of bad) el.style.setProperty("--ns", s);
    bad = bad.filter(over);
  }
  for (const el of bad) {
    const full = el.dataset.fullName || "";
    const idx = full.indexOf("의 ");
    if (idx > 0 && idx < full.length - 3) {
      el.textContent = "…" + full.slice(idx + 2).trim();
      el.style.removeProperty("--ns");
    }
  }
  bad = bad.filter(over);
  for (const s of [0.92, 0.85, 0.78]) {
    if (!bad.length) break;
    for (const el of bad) el.style.setProperty("--ns", s);
    bad = bad.filter(over);
  }
}
/* v3.61.1 전장 칸 카드의 글 상자: 능력 칩은 핸드와 같은 크기(css/cardtext.css)로 두되, 아이템을 달아 칩이 넘치면
   ① 분위기 글(.c-flv)을 빼고 ② 그래도 넘치면 칩 글자(--chs)를 예전 전장 크기(.52em)까지 조금씩 줄인다. 다 들어가면 아래쪽 흐림(mask)도 끈다 */
function fitFieldBox(bi) {
  const chips = bi.querySelectorAll(".c-coinline, .c-cls, .c-eq-ab");
  const over = () => { const b = bi.getBoundingClientRect().bottom - 0.5; for (const c of chips) if (c.getBoundingClientRect().bottom > b) return true; return false; };
  if (bi.style.getPropertyValue("--chs")) bi.style.removeProperty("--chs");
  if (bi.classList.contains("fit-noflv")) bi.classList.remove("fit-noflv");
  if (chips.length && over()) {
    const flv = bi.querySelector(":scope > .c-flv");
    if (flv && getComputedStyle(flv).display !== "none") bi.classList.add("fit-noflv");
    for (let s = 1, i = 0; i < 9 && over() && s > 0.7; i++) { s -= 0.04; bi.style.setProperty("--chs", s.toFixed(2)); }
  }
  bi.classList.toggle("fit-all", bi.scrollHeight <= bi.clientHeight + 1 && !over());
}
/* 레벨 아이콘·레벨 구슬 말풍선 (v2.3). 레벨과 유지비는 줄을 나눈다 (data-tip-kw: 두 줄을 같은 크기로) */
function lvTip(c) {
  const up = c.type === "unit" ? c.up || 0 : 0;
  return `[레벨 ${c.lv}] 소환할 때 에테르를 ${c.lv}만큼 소비합니다.` + (up ? `\n[유지비 ${up}] 전장에 올라와 있는 동안 매 턴 에테르를 ${up}만큼 소비합니다.` : "");
}
/* 아이템 아래 띠: 붙는 스탯과 코인 (⚔+2 +C1) */
function itemModsHTML(c) {
  const it = c.item;
  if (it.set) return `<span data-tip="장착한 유닛의 공·방·체가 이 값이 됩니다.">${it.set.a}/${it.set.d}/${it.set.h}</span>`;
  const parts = ["a", "d", "h"].map(k => {
    const marks = coinMarks(it.co, k);
    const m = pinModesOf(it, true)[k], to = it.to && it.to[k] != null ? String(it.to[k]) : "";
    if (!it[k] && !marks.length && !m && !to) return "";
    const coins = coinGroupsHTML(marks);
    return `<span class="im st-${k}">${statIco(k)}${to || (it[k] ? sgnNum(it[k]) : "")}${m ? PIN_MARK[m] : ""}${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
  }).filter(Boolean);
  return parts.join(" ") || "아이템";
}

/* v3.57.0 카드 면의 능력 줄: "[사격 1] 공격 차례에 … 체력을 1 깎는다" (이름에 마우스를 올리면 자세한 규칙) */
/* v3.60 [능력] 이름 한 줄, 그 아래 줄에 뜻 (css/cardtext.css .kw-n) */
function cardKwLinesHTML(c, cls) {
  return cardKwList(c).map(([k, v]) => `<p class="${cls || "f-kw"}${k ? " kw-2l" : ""}">${k ? `<b class="kw-n">${kwHTML(k)}</b>` : ""}<span class="kw-d">${esc(v)}</span></p>`);
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
    // v3.57.0 능력은 한 줄씩 "[사격 1] … 체력을 1 깎는다" — 그 카드의 숫자를 넣은 짧은 뜻(cardKwList). 이름에 마우스를 올리면 자세한 규칙
    // v3.19.1: 특수 능력이 없는 유닛은 원본 카드에 "일반공격" 줄 · 뜻을 적지 않는다 (작은 카드의 일반공격 칩 말풍선에만)
    L.push(...cardKwLinesHTML(c));
    if (c.base && CARDS[c.base]) L.push(`<p class="f-grant f-upgrade"><b>강화</b> 「${esc(CARDS[c.base].name)}」 3장을 합친 카드. 어떤 아이템이든 장착할 수 있다.</p>`);   // v3.28
    // v3.59 "덱에 N장까지" 줄은 카드에서 뺐다 — 장수 제한은 덱 조정실(장수 칸 · 알림)과 룰북에서만
    L.push(`<p class="f-flavor">${esc(c.flavor || G.blurb)}</p>`);
    // v1.4.5: 시뮬레이터 승률·교전 승률·이전 수치(v0.7·v1.2) 같은 균형 작업용 값은 카드에 보이지 않는다 (data.js에만 남는다)
  } else if (c.type === "item") {
    // 붙는 값(⚔+4 등)은 왼쪽 세로 열에 있으므로 글에는 능력만. v3.57.0 능력 한 줄씩(숫자 넣은 짧은 뜻),
    // "○○ 유닛에게만 장착. 유닛 하나에 하나, 유지비 없음 …" 줄은 뺐다(규칙은 매뉴얼 · 종류 아이콘 말풍선)
    L.push(...cardKwLinesHTML(c));
    if (c.flavor) L.push(`<p class="f-flavor">${esc(c.flavor)}</p>`);
  } else {
    L.push(`<p class="f-rule f-big">${kwHTML(c.text)}</p>`);
    // v3.38 코인 읽는 법(spellCoinNoteHTML) 줄은 뺐다 — 그 자리에 카드 서사(c.flavor). 코인 읽는 법은 코인에 마우스를 올린 말풍선 · 매뉴얼에
    if (c.cost && c.cost.ether) L.push(`<p class="f-kw"><b>[장전 ${c.cost.ether}]</b> 다음 턴 에테르 −${c.cost.ether}.</p>`);
    { const rule = (RITE_TIP[c.type] || "").split("\n")[1]; if (rule) L.push(`<p class="f-rule f-dim">${rule}</p>`); }
    if (c.flavor) L.push(`<p class="f-flavor">${esc(c.flavor)}</p>`);   // v3.11.1: v3.10.6에 RITE_TIP이 한 줄이 되어 둘째 줄이 "undefined"로 나왔다   // v3.9.9: "뒤 N칸" 설명은 뺐다 — 카드 글("뒤 3칸")만으로 읽힌다. 규칙은 매뉴얼에
    // 역전 마법 표시·환산 레벨·이전 문구는 보이지 않는다 (v1.4.5)
  }
  // v3.19 판타지 마스터즈식 배치: 이름 → 레벨 아이콘 | 그림 → 종류 줄 → 글 상자(코인 · 능력 · 설명) | 오른쪽 열(클래스 · 공방체)
  const isU = c.type === "unit", isI = c.type === "item";
  const coinLine = isU ? coinLineHTML(c.co) : isI && c.item ? coinLineHTML(c.item.co) : "";
  // v3.31.1: 원본 카드(크게 보기)는 클래스 동그라미 아래에 클래스 이름 글자
  const clName = isU ? (c.anyItem ? `<b class="c-clname cln-up">강화</b>` : c.cl ? `<b class="c-clname clc-${c.cl}">${esc(c.cl)}</b>` : "") : "";
  const rcol = isU ? `<div class="c-rcol">${classIconHTML(c)}${clName}${vstats}</div>` : isI && vstats ? `<div class="c-rcol">${vstats}</div>` : !isI && RITE_ICON[c.type] ? `<div class="c-rcol r-sp">${classIconHTML(c)}</div>` : "";   // v3.63.1 마법 종류 아이콘
  const idTip = `${G.name} · ${G.en} · ${FACTIONS[c.faction].name}\n카드 ID ${c.id}`;   // v3.19.1: 맨 아래 단체 줄을 빼고 이름 말풍선으로
  // 2026-11-20 그림 프레임 크게 보기(css/frames.css): 5:7 고정 · 작은 카드와 같은 깃발 프레임. 종류 줄은 글 상자 맨 위 띠(c-band)로, 긴 글은 글 상자 안에서 스크롤
  if (FRAME_GROUPS.has(c.group)) {
    const fv = isU ? `<div class="c-vstats">${statCellHTML(c, "a", live)}${statCellHTML(c, "d", live)}${statCellHTML(c, "h", live)}</div>` : isI ? itemVstatsHTML(c, false) : "";   // 작은 카드와 같은 숫자 열
    const frcol = fv ? `<div class="c-rcol">${fv}</div>` : "";
    const band = frameBandHTML(c, gr);
    return `<div class="card fm size-full has-frame fr-${c.group}${fv ? "" : " fr-wide"} ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${frcol ? " has-rcol" : ""} grade-${gr.id}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color};--gr:${gr.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame"${frameBgAttr(c)}>
      <div class="c-head">${typeIconHTML(c)}<span class="c-hname" data-tip="${esc(idTip)}">${nameHTML(c, c.legend ? ' <small class="f-star">★</small>' : "")}</span></div>
      <div class="c-mid">
        <div class="c-side">${framePips(c)}</div>
        <div class="c-art">${artHTML(c)}${specialFxHTML(gr)}${c.base ? upgradeMarkHTML(c, "c-upart") : ""}</div>
      </div>
      <div class="c-low">
        <div class="c-lowl"><div class="c-box">${band}${coinLine}<div class="f-text">${L.join("")}</div></div></div>
        ${frcol}
      </div>
      ${frameEmblemHTML(c)}
    </div>
  </div>`;
  }
  return `<div class="card fm size-full ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${rcol ? " has-rcol" : ""} grade-${gr.id}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color};--gr:${gr.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame">
      <div class="c-head">${typeIconHTML(c)}<span class="c-hname" data-tip="${esc(idTip)}">${nameHTML(c, c.legend ? ' <small class="f-star">★</small>' : "")}</span></div>
      <div class="c-mid">
        <div class="c-side">${levelPips(c)}</div>
        <div class="c-art">${artHTML(c)}${specialFxHTML(gr)}${c.base ? upgradeMarkHTML(c, "c-upart") : ""}</div>
      </div>
      <div class="c-low">
        <div class="c-lowl">
          ${raceLineHTML(c, gr)}
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
/* v3.60 원본 카드는 그림을 자르지 않아 글이 길면 카드가 길어진다 — 화면 높이(maxH)를 넘으면 카드 폭(--card-full)을 줄여 맞춘다 */
function fitFullCard(card, maxH) {
  if (!card) return;
  card.style.removeProperty("--card-full");
  for (let i = 0; i < 3; i++) {
    const h = card.offsetHeight; if (!h || h <= maxH + 0.5) break;
    card.style.setProperty("--card-full", Math.max(220, Math.floor(card.offsetWidth * maxH / h)) + "px");
  }
}
/* 원본 카드 창 (대기실 덱 보기·덱 조정실): 카드를 누르면 원본 카드를 화면 높이에 맞게 크게 연다.
   buttons를 주면 그 버튼들을, 없으면 닫기만. note는 카드 아래 한 줄 */
function showCardModal(c, buttons, note) {
  if (typeof CardPreview !== "undefined") CardPreview.hide(); else { const pv = $("#card-preview"); if (pv) pv.hidden = true; }
  if (typeof FEEL !== "undefined") FEEL.play("ui_card", .6);
  const html = `<div class="detail">${cardHTML(c, { size: "full" })}${note ? `<p class="cm-note">${note}</p>` : ""}</div>`;
  return modal(html, buttons || [{ label: "닫기", value: null }], { cls: "card-modal", onOpen: fitCardModal });
}
function fitCardModal(wrap) {
  const m = wrap && wrap.querySelector(".modal"), card = m && m.querySelector(".card.size-full"); if (!card) return;
  card.style.removeProperty("--card-full");
  const minW = Math.min(300, innerWidth - 72);   // 이보다 좁히면 글이 너무 작아진다 — 낮은 화면(폰 가로)에서는 창을 스크롤
  for (let i = 0; i < 4; i++) {   // 창이 넘쳐 스크롤이 생기면 넘친 만큼 카드 폭을 줄인다
    const over = Math.max(m.scrollHeight - m.clientHeight, m.getBoundingClientRect().height - innerHeight + 16), h = card.offsetHeight;
    if (over <= 1 || !h) break;
    const w = Math.max(minW, Math.floor(card.offsetWidth * (h - over) / h) - 2);
    if (w >= card.offsetWidth) break;
    card.style.setProperty("--card-full", w + "px");
  }
}
function instLines(inst) {
  if (!inst || !inst.t) return "";
  const lines = [];
  const cs = inst.t.coins || [];
  if (cs.length && cs[0].heads != null) lines.push(`<p class="d-coin">마지막으로 던진 코인: ${coinGroups(cs).map(o => `${o.parts.map(k => STAT_KO[k.st] + " " + sgnNum(k.v)).join("·")} ${o.heads ? "앞면" : "뒷면"}`).join(", ")}</p>`);
  if (abilOf(inst).u === "charge") lines.push(`<p class="d-type"><b>⚡ 플라즈마 ${Math.min(2, (inst.t.keep && inst.t.keep.charge) || 0)} / 2</b> 내 마법이 발동할 때마다 1. 2가 되면 다음 전투에 상대 모두 체력 −2.</p>`);   // v3.66.2
  if (inst.t.keep && abilOf(inst).u === "scrap") lines.push(`<p class="d-type"><b>고철 ${Math.min(4, inst.t.keep.scrap || 0)} / 4</b> 4가 되면 전투가 끝날 때 빈 칸에 고철 골렘(3/2/5)을 세운다.</p>`);   // v3.31.1
  // v3.33 표시(고정 · 버팀 · 눌림)는 말과 뜻 대신 수치 앞의 기호로 (itemTextPinned)
  if (inst.item) lines.push(`<p class="d-equip">장착 · ${esc(CARDS[inst.item.id].name)}<span>${esc(itemTextPinned(CARDS[inst.item.id].item))}</span></p>`);
  if (inst.item) {   // v3.84 능력 상한: 유닛 능력이 칸을 다 차지해 붙지 않는 아이템 능력은 "붙지 않음"으로 (js/cards.js ABIL_CAP)
    const im = CARDS[inst.item.id].item, cut = typeof unitAbilSlots === "function" ? new Set(unitAbilSlots(CARDS[inst.id], im).cut.map(x => x.raw)) : new Set();
    for (const [k, v] of itemKwList(im)) if (v && !isPinAb(k)) lines.push(cut.has(k)
      ? `<p class="d-type d-cut"><b>${esc(k)}</b> 붙지 않음 — 유닛 특수능력은 ${ABIL_CAP}개까지(유닛 능력이 먼저)</p>`
      : `<p class="d-type">${k ? `<b>${esc(k)}</b> ` : ""}${esc(v)}</p>`);
  }
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
    lines.push(...cardKwLinesHTML(c, "d-type"));   // v3.57.0 숫자 넣은 짧은 뜻
    lines.push(`<p class="d-flavor">${esc(c.flavor || GROUPS[c.group].blurb)}</p>`);
  } else if (c.type === "item") {
    lines.push(...cardKwLinesHTML(c, "d-type"));   // v3.57.0 "유닛 하나에 하나, 유지비 없음 …" 줄은 뺐다
    if (c.flavor) lines.push(`<p class="d-flavor">${esc(c.flavor)}</p>`);
  } else {
    lines.push(`<p class="d-rules">${kwHTML(c.text.replace(/\s*\[장전 \d+\]/g, ""))}${c.cost.ether ? ` ${kwHTML("[장전 " + c.cost.ether + "]")} 다음 턴 에테르 −${c.cost.ether}.` : ""}</p>`);
    // v3.38 코인 읽는 법 줄은 뺐다 (말풍선 · 매뉴얼)
    if (c.flavor) lines.push(`<p class="d-flavor">${esc(c.flavor)}</p>`);   // v3.18 유니크 마법
  }
  lines.push(instLines(inst));
  if (Store.isAdmin()) lines.push(`<p class="d-type">그림 파일: <code>${Art.has(c.id) ? Art.src(c.id) : "img/cards/" + c.id + ".png"}</code>${Art.has(c.id) ? "" : " (아직 없음 — tools/art/inbox에 넣고 artmap.py import)"}</p>`);   // 관리자에게만
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
  if (typeof FEEL !== "undefined") { if (kind === "warn") FEEL.play("deny", 0.8); else if (kind !== "good") FEEL.play("toast", 0.45); }   // good 알림은 그 일의 소리가 따로 남
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
    if (typeof FEEL !== "undefined" && !/card-modal/.test(opts.cls || "") && !(typeof App !== "undefined" && App.screen === "game")) FEEL.play("ui_open", .6);
    wrap.innerHTML = `<div class="modal ${opts.cls || ""}" role="dialog" aria-modal="true">${html}<div class="modal-btns">${(buttons || []).map((b, i) => `<button type="button" class="btn ${b.cls || ""}" data-i="${i}">${esc(b.label)}</button>`).join("")}</div></div>`;
    document.body.appendChild(wrap);
    const done = v => { wrap.remove(); if (typeof FEEL !== "undefined" && !(typeof App !== "undefined" && App.screen === "game")) FEEL.play("ui_close", .5); resolve(v); };
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
/* v3.55.5 한 곳에서 판단한다: 마우스(또는 탭)가 지금 가리키는 [data-card]가 묶인 root 안에 있으면 그 카드, 아니면 닫기.
   예전에는 root 의 mouseover/mouseout 만 봐서, 덱 목록을 다시 그리면(1장 빼기 · 넣기) mouseout 이 오지 않아 큰 카드가 남고
   바깥을 눌러도 닫히지 않았다. 이제 누른 뒤 · 다시 그린 뒤 · 스크롤 뒤에 그 자리의 요소를 다시 읽는다. Esc 로도 닫힌다 */
/* v3.57.0 고정(pin): { pin: true }로 묶은 root(덱 조정실)에서는 카드를 한 번 누르면 큰 카드가 고정된다 — 마우스가 카드를 떠나도 남고,
   다른 카드에 마우스를 올리면 그 카드로 바뀌며(고정 풀림), 카드가 아닌 곳을 누르거나 Esc면 닫힌다 */
const CardPreview = {
  box: null, roots: new Set(), pinRoots: new Set(), noHover: new Set(), pinned: false, cur: null, el: null, x: null, y: null, touch: false, moved: false, dragging: false, spot: null,
  init() {
    if (this.box) return;
    let box = $("#card-preview");
    if (!box) { box = document.createElement("div"); box.id = "card-preview"; box.className = "card-preview"; box.hidden = true; document.body.appendChild(box); }
    this.box = box;
    const at = e => { this.x = e.clientX; this.y = e.clientY; };
    document.addEventListener("pointerdown", e => { this.touch = e.pointerType !== "mouse"; at(e); }, true);
    document.addEventListener("mouseover", e => {
      if (this.touch || this.dragging) return; at(e);
      { const el = this.pick(e.target); if (el && this.inSet(this.noHover, el)) return; }   // 2026-11-15 { hover: false } root(덱 조정실): 마우스를 올려도 큰 카드가 뜨거나 바뀌지 않는다 — 누를 때만
      if (this.pinned) {   // 고정 중: 다른 카드에 올릴 때만 그 카드로 바뀐다(고정 풀림). 빈 곳 · 같은 카드는 그대로
        const el = this.pick(e.target);
        if (el && CARDS[el.dataset.card] && el.dataset.card !== this.cur) { this.pinned = false; this.update(e.target); }
        return;
      }
      this.update(e.target);
    }, true);
    // 누른 뒤에는 화면이 다시 그려졌을 수 있으니, 클릭 처리가 끝난 다음 그 자리를 다시 읽는다 (탭도 같은 길: 누른 카드로 바뀌고 빈 곳이면 닫힘)
    document.addEventListener("click", e => {
      at(e);
      if (box.contains(e.target)) return;   // 고정된 큰 카드 자체를 누르거나 끌고 놓은 것은 닫지 않는다
      // 2026-11-16 카드 줄 안의 + · − 같은 단추는 카드를 누른 것이 아니다(덱 목록 줄 전체가 [data-card]라 넣고 뺄 때 큰 카드가 함께 떴다).
      // 고정은 누른 바로 그 카드일 때만 — 다시 그려져 그 자리에 다른 카드가 와도 고정하지 않는다
      const ctl = e.target.closest && e.target.closest("button:not([data-face]), input, select, label, a");
      const hit = ctl ? null : this.pick(e.target), hitId = hit && hit.dataset.card;
      if (e.detail <= 1) this.prePin = !!(hitId && this.pinned && this.cur === hitId);
      setTimeout(() => {
        const el = this.x == null ? null : this.pick(document.elementFromPoint(this.x, this.y));
        if (el && hitId && el.dataset.card === hitId && this.inPinRoot(el)) {
          if (e.detail > 1 && !this.prePin) return this.hide();   // 더블클릭(넣기 · 빼기): 첫 번째 누름이 띄운 큰 카드를 닫는다. 미리 고정해 둔 카드면 그대로
          this.pinned = true; this.update(el); return;
        }
        if (el && !hitId && this.inSet(this.noHover, el)) return this.hide();   // 단추를 누른 뒤 그 자리에 온 카드는 띄우지 않는다(마우스만 올려서는 안 뜨는 곳)
        this.pinned = false; this.refresh();
      }, 0);
    }, true);
    document.addEventListener("keydown", e => { if (e.key === "Escape") this.hide(); });
    // 2026-11-15 고정된 큰 카드는 마우스(손가락)로 끌어 옮긴다. 옮긴 자리(this.spot)는 기억해 두고, 다른 카드를 눌러 고정해도 그 자리에서 뜬다.
    // 자리는 페이지를 새로 열 때까지 남는다(덱 조정실을 다시 열어도). 마우스만 올려 보는 큰 카드는 늘 처음 자리
    box.addEventListener("pointerdown", e => {
      if (!this.pinned || e.button > 0) return;
      e.preventDefault();   // 그림의 기본 끌기(dragstart → 닫힘) · 글자 고르기를 막는다
      const r = box.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
      this.moved = this.dragging = true;
      box.classList.add("moved", "grabbing"); box.style.right = ""; box.style.left = r.left + "px"; box.style.top = r.top + "px";
      try { box.setPointerCapture(e.pointerId); } catch (er) {}
      const mv = ev => {
        const w = box.offsetWidth;
        box.style.left = Math.max(60 - w, Math.min(innerWidth - 60, ev.clientX - ox)) + "px";
        box.style.top = Math.max(0, Math.min(innerHeight - 60, ev.clientY - oy)) + "px";
      };
      const up = () => { this.dragging = false; this.spot = { left: parseFloat(box.style.left) || 0, top: parseFloat(box.style.top) || 0 }; box.classList.remove("grabbing"); box.removeEventListener("pointermove", mv); box.removeEventListener("pointerup", up); box.removeEventListener("pointercancel", up); };
      box.addEventListener("pointermove", mv); box.addEventListener("pointerup", up); box.addEventListener("pointercancel", up);
    });
    document.addEventListener("dragstart", () => this.hide(), true);
    document.addEventListener("scroll", () => { if (this.box.hidden || this.pinned) return; if (this.touch) this.hide(); else requestAnimationFrame(() => this.refresh()); }, true);
    addEventListener("blur", () => this.hide());
    document.documentElement.addEventListener("mouseleave", () => { if (!this.touch && !this.pinned) this.hide(); });
    // 보던 카드가 다시 그려져 사라지면(덱 목록 갱신 · 화면 바뀜) 그 자리를 다시 읽는다.
    // 고정 중이면 같은 카드를 다시 찾아 붙잡고(더블클릭으로 넣고 빼도 남음), 고정 root가 화면에서 사라졌으면 닫는다
    new MutationObserver(() => {
      if (this.box.hidden || !this.el || this.el.isConnected) return;
      if (!this.pinned) return this.refresh();
      const live = [...this.pinRoots].filter(r => r.isConnected);
      if (!live.length) return this.hide();
      for (const r of live) { const el = r.querySelector(`[data-card="${this.cur}"]`); if (el) { this.el = el; return; } }
    }).observe(document.body, { childList: true, subtree: true });
  },
  pick(t) {
    const el = t && t.closest ? t.closest("[data-card]") : null;
    if (!el || el.closest("#card-preview")) return null;
    for (const r of this.roots) { if (!r.isConnected) { this.roots.delete(r); continue; } if (r.contains(el)) return el; }
    return null;
  },
  inSet(set, el) { for (const r of set) { if (!r.isConnected) { set.delete(r); continue; } if (r.contains(el)) return true; } return false; },
  inPinRoot(el) { return this.inSet(this.pinRoots, el); },
  unmove() { this.moved = false; if (this.box) { this.box.classList.remove("moved", "grabbing"); this.box.style.top = ""; } },
  refresh() { if (this.x == null) return this.hide(); this.update(document.elementFromPoint(this.x, this.y)); },
  update(t) {
    const el = this.pick(t), c = el && CARDS[el.dataset.card];
    if (!c || document.querySelector(".modal-wrap")) return this.hide();
    const box = this.box;
    this.el = el;
    box.classList.toggle("pinned", this.pinned);
    if (this.cur !== c.id) { this.unmove(); this.cur = c.id; box.innerHTML = cardHTML(c, { size: "full" }); box.hidden = false; fitFullCard(box.querySelector(".card"), innerHeight - 24); }
    if (this.pinned && !this.moved && this.spot) {   // 끌어 옮겨 둔 자리에서 다시 뜬다(카드 크기가 달라도 화면 안에 들게 당김)
      const w = box.offsetWidth;
      this.moved = true; box.classList.add("moved"); box.classList.remove("on-left"); box.style.right = "";
      box.style.left = Math.max(60 - w, Math.min(innerWidth - 60, this.spot.left)) + "px";
      box.style.top = Math.max(0, Math.min(innerHeight - 60, this.spot.top)) + "px";
    }
    // v1.4.3: 화면 끝이 아니라 가운데 가까이에 띄운다. 마우스가 왼쪽 절반이면 가운데 조금 오른쪽, 오른쪽 절반이면 가운데 조금 왼쪽
    const left = (this.x == null ? innerWidth : this.x) > innerWidth * 0.5;
    box.hidden = false;
    if (this.moved) return;   // 끌어 옮긴 자리 그대로
    box.classList.toggle("on-left", left);
    const gap = Math.max(24, innerWidth * 0.03), w = box.offsetWidth;
    // 좁은 화면(폰)에서는 화면 밖으로 나가지 않게 안쪽으로 당긴다
    let x = left ? innerWidth / 2 - gap - w : innerWidth / 2 + gap;
    x = Math.max(8, Math.min(innerWidth - w - 8, x));
    box.style.right = ""; box.style.left = x + "px";
  },
  hide() { this.pinned = false; this.cur = null; this.el = null; this.dragging = false; this.unmove(); if (this.box) { this.box.hidden = true; this.box.classList.remove("pinned"); } }
};
function bindPreview(root, opts) {
  if (!root) return;
  CardPreview.init();
  CardPreview.roots.add(root);
  if (opts && opts.pin) CardPreview.pinRoots.add(root);   // v3.57.0 한 번 누르면 큰 카드 고정
  if (opts && opts.hover === false) CardPreview.noHover.add(root);   // 2026-11-15 마우스를 올려도 크게 보이지 않음(누를 때만) — 말풍선(data-tip)은 그대로
}

/* 2026-11-24 말풍선 줄이 [능력]으로 시작하면(앞에 ◎ · ✦ 같은 기호 몇 자는 괜찮음) 그 능력이 쓰이는 때를 작은 색 라벨로: 공격 · 방어 · 공방 (js/cards.js ABIL_WHEN) */
function tipWhenTag(line) {
  if (typeof abilWhen !== "function") return "";
  const m = String(line || "").match(/^[^\[\]]{0,3}\[([^\]]+)\]/); if (!m) return "";
  const w = abilWhen(m[1]); return w ? `<i class="tip-when w-${w}">${WHEN_KO[w]}</i>` : "";
}
/* 말풍선 설명: data-tip이 있는 요소에 마우스를 올리면 바로 보인다 (줄바꿈 \n) */
const Tip = {
  el: null,
  init() {
    if (this.el) return;
    this.el = document.createElement("div"); this.el.id = "tip"; this.el.hidden = true; document.body.appendChild(this.el);
    /* 2026-11-25 손가락: 누르면 브라우저가 가짜 mouseover를 보내 말풍선이 뜨고, 다음에 다른 곳을 누를 때까지 화면에 남았다("전투 기록" · "설정"이 창 위에 떠 있음).
       손가락으로 누른 직후에는 단추 · 누르는 칸(button · a · data-act) 위의 말풍선은 띄우지 않고, 그 밖의 것(스탯 · 능력 글)은 띄웠다가 2.6초 뒤 지운다. 다시 누르면 바로 지운다 */
    document.addEventListener("pointerdown", e => { if (e.pointerType === "touch") { this.touchAt = performance.now(); clearTimeout(this.touchT); this.el.hidden = true; } }, true);
    document.addEventListener("mouseover", e => {
      const t = e.target.closest && e.target.closest("[data-tip]");
      if (!t || document.body.classList.contains("hover-hold")) { this.el.hidden = true; return; }   // v3.9.4 hover-hold: 카드가 전장으로 올라가는 중 (js/game.js holdHover)
      const byTouch = performance.now() - (this.touchAt || -1e9) < 900;
      if (byTouch && t.closest("button, a, [data-act], [data-nav]")) { this.el.hidden = true; return; }
      clearTimeout(this.touchT);
      if (byTouch) this.touchT = setTimeout(() => { this.el.hidden = true; }, 2600);
      const lines = t.dataset.tip.split("\n");
      // data-tip-kw: 줄마다 같은 크기로, 줄 앞의 [이름]만 금빛 굵게 (레벨·유지비 말풍선)
      const kw = t.hasAttribute("data-tip-kw");
      this.el.classList.toggle("tip-kw", kw);
      this.el.innerHTML = kw
        ? lines.map(l => `<span>${tipWhenTag(l)}${esc(l).replace(/^(\[[^\]]+\])/, "<b>$1</b>")}</span>`).join("")
        : `<b>${tipWhenTag(lines[0])}${esc(lines[0])}</b>${lines.slice(1).map(l => `<span>${esc(l)}</span>`).join("")}`;
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
  const art = new URL(document.documentElement.classList.contains("mobile") ? "img/ui/deck/card_back_m.png?v=2" : "img/ui/deck/card_back.png?v=3", document.baseURI).href;   // v3.41 폰 · 앱은 500×700 판
  const url = `url("${art}")`;
  document.documentElement.style.setProperty("--card-back", url);
})();

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
  A1: "M10.5 1.2a7 7 0 100 13.6A5.8 5.8 0 0110.5 1.2z",                                         // 심연: 초승달
  A2: "M8 .5l1.9 5.6L15.5 8l-5.6 1.9L8 15.5 6.1 9.9.5 8l5.6-1.9z",                              // 성광: 빛 십자성
  A3: "M1.5 2.5h13l-3 3.2h-7zM3.5 7.2h9.5l-2.8 3H6.2zM6 11.7h5l-2.5 3z",                        // 폭풍탑: 회오리
  item: "M8 1l6 7-6 7-6-7z"                                                                       // 아이템: 마름모
};
function pipSVG(key, hollow) {
  const d = PIP[key] || PIP.item;
  return `<svg viewBox="0 0 16 16" aria-hidden="true">${hollow
    ? `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>`
    : `<path d="${d}" fill="currentColor"/>`}</svg>`;
}
function levelPips(c) {
  const up = c.type === "unit" ? c.up || 0 : 0, full = c.lv - up;
  const key = c.type === "item" ? "item" : c.group;
  let h = "";
  for (let i = 0; i < c.lv; i++) h += `<i class="pip${i >= full ? " pip-up" : ""}">${pipSVG(key, i >= full)}</i>`;
  return `<div class="c-pips" style="--lvn:${Math.max(1, c.lv)}" data-tip="${esc(`레벨 아이콘 ${c.lv}개 = 레벨 ${c.lv} · 소환 비용 에테르 ${c.lv}` + (up ? `\n속이 빈 아이콘 ${up}개 = 유지비 ${up}` : ""))}">${h}</div>`;
}

/* 오른쪽 위 배지: 정사각형 = 카드 종류 (마법 = 칼·방패, 아이템 = 보석). 유닛에는 없다. (v1.0: 클래스 동그라미는 뺐다) */
const ITEM_KIND_ICON = '<path d="M32 5 57 25 32 59 7 25z"/><path d="M7 25h50M20 25l12 34 12-34M20 25l12-20 12 20" fill="none" stroke="#000" stroke-opacity=".42" stroke-width="2.6" stroke-linejoin="round"/>';
function itemKindTip(c) {
  return `아이템 · ${c.cat}\n내 유닛에 장착해서 쓰는 카드입니다. 장착한 유닛에게 아래 띠의 값과 능력이 붙습니다.\n어느 유닛에나 하나씩, 유지비 없음. 유닛이 쓰러지면 함께 소각.`;
}
function kindBadgeHTML(c) {
  if (c.type === "unit") return "";
  if (c.type === "item") return `<i class="c-kind kind-item" data-tip="${esc(itemKindTip(c))}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${ITEM_KIND_ICON}</svg></i>`;
  return `<i class="c-kind kind-${c.type}" data-tip="${esc(RITE_TIP[c.type])}"><svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">${RITE_ICON[c.type]}</svg></i>`;
}
function classIconHTML(c) {
  const kind = kindBadgeHTML(c);
  return kind ? `<div class="c-clsico">${kind}</div>` : "";
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
  atk: "공격 마법\n내 공격 턴에만 씁니다. 앞 칸의 공격 유닛이 모두 공격을 마치면 발동합니다.",
  def: "방어 마법\n내 방어 턴에만 씁니다. 앞 칸의 방어 유닛이 모두 쓰러지면 발동합니다.",
  any: "공용 마법\n공격 턴과 방어 턴 어느 쪽에서나 씁니다.",
  hand: "계략 마법\n핸드를 겨냥합니다. 공격·방어 준비 어느 때나, 칸 없이 내는 즉시 발동합니다."
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
  if (!it.set && !it.a && !it.d && !it.h && !(it.co && it.co.length)) return "";   // 능력만 있는 아이템은 숫자 열이 없다
  const cells = ["a", "d", "h"].map(k => {
    const marks = coinMarks(it.co, k), coins = coinGroupsHTML(marks);
    const val = it.set ? it.set[k] : it[k] ? sgnNum(it[k]) : "";
    if (val === "" && !coins) return `<span class="st st-${k} st-empty">${full ? statIco(k) : ""}<b>·</b></span>`;
    const tip = it.set ? `장착하면 ${STAT_KO[k]}이(가) ${it.set[k]}이 됩니다` : `장착한 유닛 ${STAT_KO[k]} ${val || "+0"}` + (marks.length ? "\n" + marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n") : "");
    return `<span class="st st-${k}${it.set ? " st-set" : ""}" data-tip="${esc(tip)}">${full ? statIco(k) : ""}<b>${val}</b>${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
  }).join("");
  return `<div class="c-vstats c-istats">${cells}</div>`;
}
/* 공·방·체 한 칸. 원본 카드(full)는 아이콘 + 숫자 + 코인, 작은 카드(노멀·컴팩트·큰)는 숫자 + 코인만 */
function statCellHTML(c, k, live, co, full) {
  const base = c[k];
  let val = base, cls = "";
  if (live) { val = k === "h" ? live.h : live[k]; if (val > base) cls = " up"; else if (val < base) cls = " down"; if (k === "h" && live.h < live.max) cls = " hurt"; }
  const marks = coinMarks(co || c.co, k);
  const tip = `${STAT_KO[k]} ${val}` + (marks.length ? "\n" + marks.map(m => `코인 ${m.n}개 · 앞면마다 ${STAT_KO[k]} ${sgnNum(m.v)}`).join("\n") : "");
  const coins = coinGroupsHTML(marks);
  return `<span class="st st-${k}${cls}" data-tip="${esc(tip)}">${full ? statIco(k) : ""}<b>${val}</b>${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
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
  let tag = c.type === "item" ? `<span class="c-cls c-cat" data-tip="${esc(itemKindTip(c))}">${esc(c.cat)}</span>` : "";
  // v1.6.1: 노멀(핸드) 크기에서도 아이템 능력 이름이 보인다. 뜻은 마우스를 올리면 (큰 카드에는 설명 글로 나온다)
  if (c.type === "item" && size === "md") tag += itemAbilities(c.item).map(raw => `<span class="c-cls c-ab" data-tip="${esc(raw + " " + (itemKwDesc(raw) || c.item.evText || ""))}">${esc(raw.replace(/^\[|\]$/g, ""))}</span>`).join("");
  // 설명 글은 큰 카드(lg)에만. 노멀·컴팩트에는 보이지 않는다
  const kw = size === "lg" ? cardKwShort(c) : "";
  const text = kw ? `<div class="c-text">${kwHTML(kw)}</div>` : "";
  // v1.8: 노멀 카드도 opts.desc가 있으면 그림 위에 설명이 겹쳐 보인다. "short" = 핸드(세 줄까지) · "full" = 전장(전체, fitDescs가 글자를 줄여 맞춤)
  const dk = opts.desc && size === "md" ? cardKwShort(c) : "";
  const desc = dk ? `<div class="c-desc d-${opts.desc}"><p>${kwHTML(dk)}</p></div>` : "";
  return `<div class="card size-${size} ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${dk ? " has-desc" : ""}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame">
      <div class="c-head"><span class="c-lv" data-tip="${esc(lvTip(c))}">${c.lv}</span><span class="c-name">${esc(c.name)}</span></div>
      ${classIconHTML(c)}
      <div class="c-mid">
        <div class="c-side">${levelPips(c)}${vstats}</div>
        <div class="c-art">${artHTML(c)}${tag && size !== "sm" ? `<div class="c-tags">${tag}</div>` : ""}${opts.badges ? `<div class="c-badges">${opts.badges}</div>` : ""}${desc}</div>
      </div>
      ${size === "lg" ? `<div class="c-en">${esc(cardSubtitle(c))}</div>` : ""}
      ${text}
      ${opts.extra || ""}
      ${foot}
    </div>${opts.count != null ? `<span class="c-count">×${opts.count}</span>` : ""}
  </div>`;
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
function lvTip(c) {
  return `레벨 ${c.lv} · 소환 비용 에테르 ${c.lv}` + (c.type === "unit" && c.up ? `\n유지비 ${c.up} — 살아남으면 다음 턴부터 에테르가 ${c.up}만큼 빠집니다.` : "");
}
/* 아이템 아래 띠: 붙는 스탯과 코인 (⚔+2 +C1) */
function itemModsHTML(c) {
  const it = c.item;
  if (it.set) return `<span data-tip="장착한 유닛의 공·방·체가 이 값이 됩니다.">고정 ${it.set.a}/${it.set.d}/${it.set.h}</span>`;
  const parts = ["a", "d", "h"].map(k => {
    const marks = coinMarks(it.co, k);
    if (!it[k] && !marks.length) return "";
    const coins = coinGroupsHTML(marks);
    return `<span class="im st-${k}">${statIco(k)}${it[k] ? sgnNum(it[k]) : ""}${coins ? `<em class="cm">${coins}</em>` : ""}</span>`;
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
  const typeLine = [
    c.type === "unit" ? "유닛" : c.type === "item" ? `아이템 · ${esc(c.cat)}` : typeName,
    `레벨 ${c.lv}${c.type === "unit" && c.up ? ` · 유지비 ${c.up}` : ""}`
  ];
  const L = [];
  if (c.type === "unit") {
    // 공·방·체와 코인은 왼쪽 세로 열에 이미 있으므로 글로 다시 적지 않는다
    if (c.up) L.push(`<p class="f-rule">유지비 ${c.up}: 레벨 아이콘 ${c.lv}개 중 속이 빈 ${c.up}개. 살아남으면 다음 턴부터 에테르가 ${c.up}만큼 빠집니다.</p>`);
    L.push(`<p class="f-flavor">${esc(G.blurb)}</p>`);
    // v1.4.5: 시뮬레이터 승률·교전 승률·이전 수치(v0.7·v1.2) 같은 균형 작업용 값은 카드에 보이지 않는다 (data.js에만 남는다)
  } else if (c.type === "item") {
    // 붙는 값(⚔+4 등)은 그림 위 띠에 있으므로 글에는 능력과 그 뜻만 (이름을 두 번 적지 않는다)
    for (const [k, v] of itemKwList(c.item)) L.push(`<p class="f-kw">${k ? `<b>${esc(k)}</b> ` : ""}${esc(v)}</p>`);
    L.push(`<p class="f-rule f-dim">내 유닛 아무에게나 장착. 유닛 하나에 하나, 유지비 없음. 유닛이 쓰러지면 함께 소각.</p>`);
    if (c.flavor) L.push(`<p class="f-flavor">${esc(c.flavor)}</p>`);
  } else {
    L.push(`<p class="f-rule f-big">${kwHTML(c.text)}</p>`);
    if (c.cost && c.cost.ether) L.push(`<p class="f-kw"><b>[장전 ${c.cost.ether}]</b> 다음 턴 에테르 −${c.cost.ether}.</p>`);
    L.push(`<p class="f-rule f-dim">${RITE_TIP[c.type].split("\n")[1]} "뒤 N칸"은 이 마법이 놓인 칸 다음부터.</p>`);
    // 역전 마법 표시·환산 레벨·이전 문구는 보이지 않는다 (v1.4.5)
  }
  return `<div class="card size-full ${c.faction ? "fac-" + c.faction : "fac-item"} type-${c.type}${c.legend ? " legend" : ""}${opts.cls ? " " + opts.cls : ""}" style="--el:${el.color}" ${opts.attrs || ""} data-card="${c.id}">${opts.under || ""}
    <div class="c-frame">
      <div class="c-head"><span class="c-lv" data-tip="${esc(lvTip(c))}">${c.lv}</span><span class="c-name">${esc(c.name)}${c.legend ? ' <small class="f-star">★</small>' : ""}</span></div>
      ${classIconHTML(c)}
      <div class="c-mid">
        <div class="c-side">${levelPips(c)}${vstats}</div>
        <div class="c-art">${artHTML(c)}</div>
      </div>
      <div class="f-type">${typeLine.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="f-text">${L.join("")}</div>
      <div class="c-en">${esc(G.name)} · ${esc(G.en)} · ${esc(FACTIONS[c.faction].name)} <span class="f-id">${c.id}</span></div>
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
  if (c.type === "item") tags.push(`<span class="tag">${esc(c.cat)}</span>`);
  const lines = [];
  if (c.type === "unit") {
    if (c.up) lines.push(`<p class="d-coin">레벨 아이콘 ${c.lv}개 중 속이 빈 아이콘 ${c.up}개 = 유지비 ${c.up}. 소환할 때 에테르 ${c.lv}를 내고, 살아남으면 다음 턴부터 에테르가 ${c.up}만큼 빠집니다.</p>`);
    lines.push(`<p class="d-flavor">${esc(GROUPS[c.group].blurb)}</p>`);
  } else if (c.type === "item") {
    const ab = itemAbilityText(c.item); if (ab) lines.push(`<p class="d-rules">${esc(ab)}</p>`);
    for (const raw of itemAbilities(c.item)) { const d = itemKwDesc(raw); if (d) lines.push(`<p class="d-type"><b>${esc(raw)}</b> ${esc(d)}</p>`); }
    if (c.item.evText && !(c.item.evName && itemKwDesc(`[${c.item.evName}]`))) lines.push(`<p class="d-type">${esc(c.item.evText)}</p>`);
    lines.push(`<p class="d-coin">공격·방어 준비 어느 때나 내 유닛 아무에게나 장착합니다. 유닛 하나에 하나, 유지비 없음. 유닛이 쓰러지면 함께 소각.</p>`);
    if (c.flavor) lines.push(`<p class="d-flavor">${esc(c.flavor)}</p>`);
  } else {
    lines.push(`<p class="d-rules">${kwHTML(c.text.replace(/\s*\[장전 \d+\]/g, ""))}${c.cost.ether ? ` ${kwHTML("[장전 " + c.cost.ether + "]")} 다음 턴 에테르 −${c.cost.ether}.` : ""}</p>`);
    lines.push(`<p class="d-type">마법은 뒷면으로 칸을 차지합니다. 앞 칸의 유닛이 끝나야(공격 마법은 공격을 마치면, 방어 마법은 쓰러지면) 발동합니다. "뒤 N칸"은 이 마법이 놓인 칸 다음부터입니다.</p>`);
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
      if (!t) { this.el.hidden = true; return; }
      const lines = t.dataset.tip.split("\n");
      this.el.innerHTML = `<b>${esc(lines[0])}</b>${lines.slice(1).map(l => `<span>${esc(l)}</span>`).join("")}`;
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

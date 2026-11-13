/* ETHERION — 그림 AI용 프롬프트 만들기 (v2 · 등급별, 2026-11-10 · 스타일 가이드 6.7 · 6.8)
   게임 데이터(index.html과 같은 파일 · 같은 차례)를 읽어 카드마다 프롬프트 하나를 만든다.
   그림 말(등급 · 레벨 · 깃발 · 진영 · 종류)은 tools/art/art_style.json, 카드별 지시는 tools/art/art_notes.json.
   카드 이름 · 설명 · 등급을 고쳤거나 새 카드를 만들었거나 art_style.json을 고쳤으면 다시 돌린다.

   실행 (게임 폴더 맨 위에서):  node tools/art/build_prompts.js
   만드는 파일:
     tools/art/prompts/cards.jsonl        카드 그림 작업 목록 (gen.py · artmap.py가 읽음) — 한 줄 = 한 장
     tools/art/prompts/grades/<등급>.md    등급별 — 그 등급의 연출 틀 + 카드마다 프롬프트 (사람 · 다른 AI용)
     tools/art/prompts/cards/<깃발>.md     깃발별 — 같은 프롬프트를 깃발로 묶은 것
     tools/art/prompts/ui.jsonl · ui.md    전장 그림 (ui_assets.json을 펼친 것)
     tools/art/PROMPT_GUIDE.md             <!-- AUTO:… --> 칸만 새로 채운다(손으로 쓴 글은 그대로)
   뺀 카드(js/retired.js)는 만들지 않는다. 소환물(TK- · TS-)은 등급 "token". */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(__dirname, "prompts");
const S = JSON.parse(fs.readFileSync(path.join(__dirname, "art_style.json"), "utf8"));
const NOTES = (() => { try { return JSON.parse(fs.readFileSync(path.join(__dirname, "art_notes.json"), "utf8")); } catch (e) { return {}; } })();

/* ---------- 1. 게임 데이터 읽기 (index.html의 data.js ~ grades.js와 같은 차례) ---------- */
const DATA_FILES = ["data", "names", "retired", "briefs", "specials", "uniques", "highcards", "pincards", "rarespells", "counterspells", "upgrades", "rebalance", "decks", "cards", "grades"];
function loadGame() {
  const stub = () => null;
  const ctx = {
    console, navigator: {}, location: { search: "", hash: "" },
    localStorage: { getItem: stub, setItem: stub, removeItem: stub },
    document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }) },
    addEventListener: stub, setTimeout, clearTimeout
  };
  ctx.window = ctx; vm.createContext(ctx);
  let src = "";
  for (const f of DATA_FILES) {
    const p = path.join(ROOT, "js", f + ".js");
    if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n";
  }
  src += "this.__o = { CARDS, GROUPS, FACTIONS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}) };";
  vm.runInContext(src, ctx, { filename: "etherion-data" });
  return ctx.__o;
}

/* ---------- 2. 카드 → 등급 · 레벨 · 장면 ---------- */
const isToken = c => /^T[KS]-/.test(c.id);
const gradeKey = c => isToken(c) ? "token" : (c.grade || "common");
const kindOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
function levelText(c) {
  const t = S.levels[kindOf(c)], lv = c.lv || 1;
  const k = Object.keys(t).map(Number).sort((a, b) => a - b).filter(n => n <= lv).pop() || 1;
  return t[k];
}
function fill(str, F, c) {
  return String(str || "")
    .replace(/\{hint\}/g, F.hint).replace(/\{home\}/g, F.home).replace(/\{landmark\}/g, F.landmark)
    .replace(/\{source\}/g, F.source).replace(/\{mythic\}/g, F.mythic).replace(/\{base\}/g, (c && c.base) || "the base card");
}

/* 마법 효과(ops) → 장면 */
function spellScene(c, el) {
  const ops = c.ops || [];
  const has = o => ops.some(p => p.op === o);
  const foe = ops.some(p => p.side === "foe"), ally = ops.some(p => p.side === "ally"), both = ops.some(p => p.side === "both");
  const up = ops.some(p => p.op === "mod" && ["a", "d", "h"].some(k => (p[k] || 0) > 0));
  const down = ops.some(p => p.op === "mod" && ["a", "d", "h"].some(k => (p[k] || 0) < 0));
  const parts = [];
  if (has("dmg") || has("blast")) parts.push(both ? `a cataclysmic ${el.en} blast engulfing the whole battlefield` : `a destructive ${el.en} attack striking the enemy ranks`);
  if (has("destroy") || has("duel")) parts.push("an annihilating blow that erases a foe");
  if (up && (ally || !foe)) parts.push(`an empowering ${el.en} aura rising around allied warriors`);
  if (down && foe) parts.push("a weakening curse sinking over the enemies");
  if (has("shield") || has("guard") || has("lock") || has("sumDef")) parts.push("a protective barrier or ward shielding allies");
  if (has("thorns")) parts.push("a shell of thorns that punishes attackers");
  if (has("clean") || has("strip")) parts.push("a cleansing wave washing away enchantments");
  if (has("summon") || has("conjure") || has("copy") || has("echo") || has("mirrorTwin")) parts.push("a creature or double emerging from a rune circle");
  if (has("rest") || has("heal")) parts.push("a calm restoring light closing wounds");
  if (has("swap") || has("swapPos") || has("swapLowHigh") || has("swapLeft") || has("taunt")) parts.push("warriors forced to trade places by a trick of magic");
  if (has("draw") || has("leftToBottom") || has("fate")) parts.push("threads of fate and glowing cards being drawn");
  if (has("handMod") || has("handBurn")) parts.push("a sly hand reaching into the enemy's hidden plans");
  if (has("atk0")) parts.push("enemy weapons frozen and stopped mid-swing");
  if (has("chain") || has("multi")) parts.push(`chained ${el.en} strikes leaping from target to target`);
  if (has("rally") || has("grant")) parts.push("allies rallying as one under a shared surge of power");
  if (c.cost && c.cost.life) parts.push("paid for with the caster's own blood");
  if (!parts.length) parts.push(`a burst of ${el.en} power`);
  return parts.slice(0, 3).join("; ");
}

const ICON_LOOK = {
  sword: "a sword", dagger: "a dagger", spear: "a spear", bow: "a bow", axe: "an axe", armor: "a piece of armour",
  shield: "a shield", staff: "a staff", orb: "a glowing orb on a small stand", book: "a book",
  rune: "a carved stone or engraved plate", holy: "a sacred relic (chalice, reliquary or holy symbol — not a plain cross)",
  seal: "a wax seal, signet or sealed contract"
};
const CAT_LOOK = { "무구": "weapon/armour", "각인": "engraving", "촉매": "catalyst", "성물": "holy relic", "공용": "general gear" };

function subjectOf(c, F, G, D) {
  const el = S.elements[c.el] || S.elements.dark;
  if (c.type === "unit") {
    if (isToken(c)) return `a summoned creature or construct of the ${F.en}: ${G.unit}`;
    const rank = c.special ? "a mythic, ascended" : c.unique ? "a legendary, named" : c.lv >= 7 ? "a legendary, awe-inspiring" : c.lv >= 5 ? "an elite, commanding" : c.lv >= 3 ? "a seasoned, battle-hardened" : "a low-ranking, ordinary";
    const baseCard = c.base && D.CARDS[c.base];
    const clKey = c.cl || (baseCard && baseCard.cl) || "";
    const cls = (S.classes[clKey] || "a warrior").replace("{el}", el.en + " power");
    let s = NOTES[c.id] ? `${rank} member of the ${F.en} (see art direction)` : `${rank} member of the ${F.en} — ${cls}`;
    if (c.rev === "벽") s += "; a stubborn defender who stands like a wall";
    if (c.rev === "돌격") s += "; a reckless charging attacker";
    if (G.unit) s += `. ${G.unit}`;
    return s;
  }
  if (c.type === "item") {
    const it = c.item || {};
    const what = ICON_LOOK[it.icon] || "a single object";
    const cat = String(it.cat || "").split("·").map(k => CAT_LOOK[k]).filter(Boolean).join(" + ");
    return `the item the card name and lore describe — a single object made or kept by the ${F.en}${cat ? ` (${cat}; if unsure, ${what})` : ""}. ${G.item}`;
  }
  let s = `${S.types[c.type] || "spell"}. The moment it takes effect: ${spellScene(c, el)}`;
  if (G.spell) s += `. Scale and finish: ${G.spell}`;
  if (c.comeback) s += ". A desperate last-stand reversal that turns a losing battle";
  if (c.classSpell) s += `. A spell of the ${c.classSpell} class`;
  return s;
}

function promptOf(c, D) {
  const gk = gradeKey(c), G = S.grades[gk] || S.grades.common;
  const F = S.flags[c.group] || S.flags.A1;
  const el = S.elements[c.el] || S.elements[F.element] || S.elements.dark;
  const fac = (S.factions[c.faction] || S.factions[F.faction] || {}).text || "";
  const lore = (c.flavor || (c.item && c.item.desc) || "").trim();
  const text = (c.text || "").replace(/\s+/g, " ").trim();
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const L = [
    S.base,
    `Grade: ${G.tag}. ${cap(G.presence)}.`,
    S.quality,
    `Card name (Korean — read its meaning, never write it in the image): "${c.name}". Depict exactly what this name describes.`,
    `Subject: ${subjectOf(c, F, G, D)}.`
  ];
  if (NOTES[c.id]) L.push(`Art direction: ${NOTES[c.id]}`);
  if (gk === "upgrade" && G.reference) {
    const B = c.base && D.CARDS[c.base];
    L.push(fill(G.reference, F, c) + (B ? ` (base card: "${B.name}")` : ""));
    /* v3.46 강화 카드의 연속성: 참고 그림이 없어도 원래 카드와 같은 인물 · 같은 곳으로 그리게, 원래 카드의 이름 · 서사 · 배경을 함께 넣는다 */
    if (B) {
      const BF = S.flags[B.group] || F, blore = (B.flavor || "").trim(), place = gradeKey(B) === "common" ? BF.hint : BF.home;
      L.push(`Continuity with the base card: this is the very same individual as "${B.name}" (${B.id}) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher.` +
        (blore ? ` The base card's lore: ${blore}` : "") +
        ` The base card is set in ${place}; keep that same place, intensified.`);
    }
  }
  L.push(`Scale (level ${c.lv} of 8): ${levelText(c)}.`);
  if (isToken(c))
    L.push(`Banner — summoned by the ${F.en}; signature motifs: ${F.motifs}; palette: ${F.palette}.`);
  else if (c.type === "unit" || c.type === "item")
    L.push(`Banner — ${F.en}: ${F.who}. Silhouette: ${F.silhouette}. Materials: ${F.materials}. Signature motifs: ${F.motifs}.`);
  else
    L.push(`Banner — ${F.en}: magic of ${F.en.toLowerCase()}, signature motifs: ${F.motifs}; palette: ${F.palette}.`);
  L.push(`Faction: ${fac}.`);
  if (lore) L.push(`Lore (Korean, use for the scene): ${lore}`);
  if (text) L.push(`Game effect (Korean, mood only — never draw text or numbers): ${text}`);
  L.push(
    `Camera: ${G.camera}.`,
    `Lighting: ${G.lighting}; main light is ${el.en} (${el.hex}) from behind the subject, ${F.light}.`,
    `Background: very dark night-blue (#07080d) base; ${fill(G.background, F, c)}; ${el.cue}.`,
    `Detail: ${G.detail}.`
  );
  if (G.accent) L.push(`Grade accent: ${G.accent} — ${S.accentRule}.`);
  L.push(`Mood: ${G.mood}.`, `Stay true to the banner: ${F.never}.`, S.composition, S.notext, S.avoid);
  return L.join("\n");
}

/* ---------- 3. 전장 그림 (ui_assets.json) ---------- */
function loadUI() {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, "ui_assets.json"), "utf8"));
  const style = j.style.join("\n");
  return j.assets.map(a => Object.assign({}, a, { kind: "ui", prompt: [a.prompt.join("\n"), style, (a.avoid || j.avoid).join("\n")].join("\n") }));
}

/* ---------- 4. PROMPT_GUIDE.md 자동 칸 ---------- */
function autoBlocks(jobs, D) {
  const B = {};
  const cnt = {};
  for (const j of jobs) { cnt[j.grade] = cnt[j.grade] || { n: 0, unit: 0, spell: 0, item: 0 }; cnt[j.grade].n++; cnt[j.grade][j.type === "unit" ? "unit" : j.type === "item" ? "item" : "spell"]++; }
  B.COUNTS = [`프롬프트 버전 **${S.version}** (${S.updated}) · 카드 ${jobs.length}장 (뺀 카드 제외, 소환물 포함)`, "",
    "| 등급 | 색 | 장수 | 유닛 · 마법 · 아이템 | 등급별 프롬프트 파일 |", "|---|---|---|---|---|",
    ...S.gradeOrder.filter(g => cnt[g]).map(g => { const G = S.grades[g], k = cnt[g]; return `| ${G.ko} (${G.en}) | \`${G.color}\` | ${k.n} | ${k.unit} · ${k.spell} · ${k.item} | \`prompts/grades/${g}.md\` |`; })].join("\n");

  B.GRADES = S.gradeOrder.map(g => {
    const G = S.grades[g];
    const rows = [["존재감 presence", G.presence], ["카메라 camera", G.camera], ["빛 lighting", G.lighting], ["배경 background", G.background], ["디테일 detail", G.detail], ["등급 강조색 accent", G.accent || "없음 — 원소색만"], ["분위기 mood", G.mood]];
    if (G.spell) rows.push(["마법이면 spell", G.spell]);
    if (G.item) rows.push(["아이템이면 item", G.item]);
    if (G.reference) rows.push(["참고 그림 reference", G.reference]);
    return [`### ${G.ko} · ${G.en} — \`${g}\` (${G.color})`, "", G.idea_ko, "", "| 항목 | 넣을 말 (영어 그대로) |", "|---|---|", ...rows.map(r => `| ${r[0]} | ${String(r[1]).replace(/\|/g, "/")} |`), ""].join("\n");
  }).join("\n");

  B.LEVELS = ["| 레벨 | 유닛 | 마법 | 아이템 |", "|---|---|---|---|",
    ...Object.keys(S.levels.unit).map(k => `| ${k === "8" ? "8 (스페셜)" : k === "7" ? "7" : k + "~" + (+k + 1)} | ${S.levels.unit[k]} | ${S.levels.spell[k] || "↑"} | ${S.levels.item[k] || "↑"} |`)].join("\n");

  B.FLAGS = Object.keys(S.flags).map(id => {
    const F = S.flags[id], el = S.elements[F.element];
    return [`### ${id} ${F.ko} · ${F.en} — ${S.factions[F.faction].ko} · ${el.en} \`${el.hex}\``, "",
      "| 항목 | 넣을 말 |", "|---|---|",
      `| 누구 who | ${F.who} |`, `| 실루엣 silhouette | ${F.silhouette} |`, `| 재료 materials | ${F.materials} |`, `| 색 palette | ${F.palette} |`,
      `| 상징 motifs | ${F.motifs} |`, `| 빛 light | ${F.light} |`,
      `| 배경 (일반) hint | ${F.hint} |`, `| 배경 (고급 · 강화) home | ${F.home} |`, `| 배경 (레어 · 에픽 · 유니크) landmark | ${F.landmark} |`,
      `| 근원 (유니크) source | ${F.source} |`, `| 신화 배경 (스페셜) mythic | ${F.mythic} |`, `| 하지 말 것 never | ${F.never} |`, ""].join("\n");
  }).join("\n");

  B.TYPES = ["| 종류 | 넣을 말 |", "|---|---|", ...Object.keys(S.types).map(k => `| ${k} | ${S.types[k]} |`), "",
    "| 클래스 (유닛) | 넣을 말 |", "|---|---|", ...Object.keys(S.classes).map(k => `| ${k} | ${S.classes[k]} |`)].join("\n");

  const pick = { token: "TK-G1-1", common: "B1-01", uncommon: "A2-01", rare: "RS-G3-1", upgrade: "UP-B2-17", epic: "EP-A1-3", unique: "UN-G1", special: "SP-B2" };
  B.EXAMPLES = Object.keys(pick).filter(g => g !== "token").map(g => {
    const j = jobs.find(x => x.id === pick[g]) || jobs.find(x => x.grade === g); if (!j) return "";
    return [`#### 예: ${S.grades[g].ko} — ${j.id} ${j.name}`, "", "```", j.prompt, "```", ""].join("\n");
  }).join("\n");
  return B;
}
function fillGuide(B) {
  const p = path.join(__dirname, "PROMPT_GUIDE.md");
  if (!fs.existsSync(p)) return false;
  let md = fs.readFileSync(p, "utf8");
  for (const k of Object.keys(B)) {
    const re = new RegExp(`(<!-- AUTO:${k} -->)[\\s\\S]*?(<!-- /AUTO:${k} -->)`);
    md = md.replace(re, `$1\n${B[k]}\n$2`);
  }
  fs.writeFileSync(p, md);
  return true;
}

/* ---------- 5. 쓰기 ---------- */
const TYPE_KO = { unit: "유닛", atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "핸드 마법", item: "아이템" };
function cardMd(j) {
  return [`## ${j.id} · ${j.name}`,
    `${S.flags[j.group] ? S.flags[j.group].ko : j.group} · ${TYPE_KO[j.type] || j.type} · 레벨 ${j.lv} · ${S.grades[j.grade].ko}` +
    `${j.base ? ` · 원래 카드 \`${j.base}\`` + (j.refs ? " (참고 그림 함께 넣기)" : " — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습)") : ""} — 받은 그림은 \`tools/art/inbox/${j.id}.jpg\` → \`python3 tools/art/artmap.py import\` (게임 사본 \`${j.out}\` 600×750)`, "", "```", j.prompt, "```", ""].join("\n");
}
function main() {
  const D = loadGame();
  const ids = Object.keys(D.CARDS).filter(id => !D.RETIRED[id]).sort();
  fs.mkdirSync(path.join(OUT, "cards"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "grades"), { recursive: true });
  const jobs = [], byGroup = {}, byGrade = {};
  for (const id of ids) {
    const c = D.CARDS[id];
    const job = {
      id, kind: "card", out: `img/cards/${id}.jpg`, size: [600, 750], format: "jpg",   /* v3.41 카드 일러스트 = 600×750 JPG (artmap.py와 같음) */ background: "opaque",
      name: c.name, group: c.group, faction: c.faction, type: c.type, lv: c.lv, grade: gradeKey(c), prompt_ver: S.version
    };
    if (c.base) {
      job.base = c.base;
      if (fs.existsSync(path.join(ROOT, "img", "cards", c.base + ".jpg"))) job.refs = [`img/cards/${c.base}.jpg`];   // v3.46 카드 그림은 v3.41부터 .jpg
    }
    job.prompt = promptOf(c, D);
    jobs.push(job);
    (byGroup[c.group] = byGroup[c.group] || []).push(job);
    (byGrade[job.grade] = byGrade[job.grade] || []).push(job);
  }
  fs.writeFileSync(path.join(OUT, "cards.jsonl"), jobs.map(j => JSON.stringify(j)).join("\n") + "\n");

  for (const g of Object.keys(byGroup).sort()) {
    const F = S.flags[g] || {};
    const md = [`# ${g} ${F.ko || ""} — 카드 일러스트 프롬프트 (${byGroup[g].length}장, 버전 ${S.version})`, "",
      "각 카드: 아래 프롬프트를 그림 AI에 붙여 넣고, 나온 그림(4:5, 600×750 이상)을 `tools/art/inbox/<카드ID>.jpg`로 넣고 `python3 tools/art/artmap.py import` — 600×750 JPG로 `img/cards/`에 들어가고 게임 목록이 새로 쓰인다(v3.41). `img/cards/`에 바로 쓰지 않는다.",
      "등급별 연출 규칙은 `tools/art/PROMPT_GUIDE.md`. 이 파일은 `node tools/art/build_prompts.js`가 만든다 — 손으로 고치지 않는다.", ""];
    const order = c => S.gradeOrder.indexOf(c.grade);
    for (const j of byGroup[g].slice().sort((a, b) => order(b) - order(a) || a.id.localeCompare(b.id))) md.push(cardMd(j));
    fs.writeFileSync(path.join(OUT, "cards", g + ".md"), md.join("\n"));
  }
  for (const g of S.gradeOrder) {
    const list = byGrade[g]; if (!list) continue;
    const G = S.grades[g];
    const md = [`# ${G.ko} (${G.en}) — 카드 일러스트 프롬프트 (${list.length}장, 버전 ${S.version})`, "",
      `> ${G.idea_ko}`, "",
      "## 이 등급의 연출 틀", "", "```",
      `Grade: ${G.tag}. ${G.presence}.`, `Camera: ${G.camera}.`, `Lighting: ${G.lighting}.`, `Background: ${G.background}.`,
      `Detail: ${G.detail}.`, G.accent ? `Grade accent: ${G.accent}.` : "Grade accent: none (element colour only).", `Mood: ${G.mood}.`,
      "```", "", "아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다. 그대로 붙여 넣으면 된다.", ""];
    for (const j of list.slice().sort((a, b) => a.group.localeCompare(b.group) || a.lv - b.lv || a.id.localeCompare(b.id))) md.push(cardMd(j));
    fs.writeFileSync(path.join(OUT, "grades", g + ".md"), md.join("\n"));
  }

  const ui = loadUI();
  fs.writeFileSync(path.join(OUT, "ui.jsonl"), ui.map(j => JSON.stringify(j)).join("\n") + "\n");
  const um = ["# 전장 그림 프롬프트", "",
    "참고 그림(지금 게임 그림)을 함께 넣어야 자리가 맞는다. 층으로 나뉜 그림은 같은 묶음끼리 차례로 만든다.",
    "저장 크기 · 투명 처리는 각 항목의 설명대로. 자동으로 하려면 `tools/art/README.md`.", ""];
  for (const a of ui) {
    um.push(`## ${a.id} — ${a.title}`, `저장 파일 \`${a.out}\` · ${a.size[0]}×${a.size[1]} ${a.format.toUpperCase()}` +
      ` · 참고 그림: ${(a.refs || []).map(r => "`" + r + "`").join(", ") || "없음"}`, "", a.note || "", "", "```", a.prompt, "```", "");
  }
  fs.writeFileSync(path.join(OUT, "ui.md"), um.join("\n"));

  const guided = fillGuide(autoBlocks(jobs, D));
  const cnt = {};
  for (const j of jobs) cnt[j.grade] = (cnt[j.grade] || 0) + 1;
  const miss = jobs.filter(j => (j.grade === "special" || j.grade === "unique") && !NOTES[j.id]).map(j => j.id);
  console.log(`카드 ${jobs.length}장 (버전 ${S.version})`, cnt, `· 전장 그림 ${ui.length}장 → ${path.relative(ROOT, OUT)}${guided ? " · PROMPT_GUIDE.md 자동 칸 채움" : ""}`);
  if (miss.length) console.log("※ art_notes.json에 지시가 없는 스페셜 · 유니크:", miss.join(", "));
}
main();

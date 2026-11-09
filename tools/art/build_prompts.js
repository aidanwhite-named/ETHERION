/* ETHERION — 그림 AI용 프롬프트 만들기 (v3.9.15, 스타일 가이드 6.7)
   게임 데이터(js/data.js · names.js · specials.js · uniques.js · highcards.js · cards.js …)를 그대로 읽어
   카드마다 프롬프트 하나를 만든다. 카드 이름 · 설명을 고치면 이 스크립트를 다시 돌린다.

   실행 (게임 폴더 맨 위에서):  node tools/art/build_prompts.js
   만드는 파일:
     tools/art/prompts/cards.jsonl      카드 그림 작업 목록 (gen.py가 읽음) — 한 줄 = 한 장
     tools/art/prompts/ui.jsonl         전장 그림 작업 목록 (ui_assets.json을 펼친 것)
     tools/art/prompts/cards/<단체>.md   사람이 읽고 채팅창에 붙여 넣기 좋은 목록
     tools/art/prompts/ui.md            전장 그림 목록 (사람용)
   그림 규칙의 원본은 docs/STYLE_GUIDE.md (1.2 깃발 표 · 6장 카드 일러스트). 여기 문구를 바꾸면 가이드도 본다. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(__dirname, "prompts");

/* ---------- 1. 게임 데이터 읽기 (index.html과 같은 차례) ---------- */
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
  for (const f of ["data", "names", "briefs", "specials", "uniques", "highcards", "rarespells", "decks", "cards", "grades"])
    src += fs.readFileSync(path.join(ROOT, "js", f + ".js"), "utf8") + "\n;\n";
  src += "this.__o = { CARDS, GROUPS, FACTIONS };";
  vm.runInContext(src, ctx, { filename: "etherion-data" });
  return ctx.__o;
}

/* ---------- 2. 그림 말 (스타일 가이드 1.2 · docs/WORLD.md 6장) ---------- */
const EL = {   // 원소색 --el 과 빛의 모양
  fire:      { en: "fire",      hex: "#ff6b3d", cue: "embers, flame light, gunpowder smoke" },
  metal:     { en: "metal",     hex: "#a9b4c2", cue: "cold steel sheen, sparks from an anvil, rivets" },
  lightning: { en: "lightning", hex: "#ffd84a", cue: "crackling electric arcs, glowing coils" },
  earth:     { en: "earth",     hex: "#b88a5a", cue: "flying rock dust, cracked ground, ochre light" },
  forest:    { en: "forest",    hex: "#58b85f", cue: "glowing moss, thorny vines, drifting leaves" },
  water:     { en: "water",     hex: "#4fb3ff", cue: "clear water light, spray, ripples, bubbles" },
  dark:      { en: "darkness",  hex: "#8b5cf6", cue: "violet shadow smoke, blood-red accents, contract sigils" },
  light:     { en: "holy light",hex: "#ffe9a8", cue: "pale gold radiance, halo, feathers of light" },
  wind:      { en: "wind",      hex: "#9fe3d6", cue: "swirling teal wind, fluttering robes and pages" }
};
const FACTION_MOOD = {
  brass:   "Adamant Concord: copper, brass, steam, soot, gears, furnaces, black adamant ore mined from the bodies of sleeping giants. No gods, technology instead",
  verdant: "Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons",
  arcane:  "Arcane Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price"
};
const GROUP_LOOK = {  // 1.2 표의 "누가, 어떤 모습"
  B1: "Cinder Goblins — goblin and human artillerists: small bodies, big ears, scorched leather aprons, cannons, matchlock muskets, gunpowder smoke; the fortress-foundry of Fortan",
  B2: "Ironbeard Dwarves — dwarves and their golems/automatons: thick steel plate, rivets, braided iron-grey beards, underground forge-city of Durkheim",
  B3: "Thunder Gnomes — tiny clever gnome scholars: goggles, glass jars of captured lightning, copper coils, lightning-rod towers of Voltarium",
  G1: "Rockfist Orcs — orc warriors: huge fists, tusks, bone ornaments, riding wolves and bears, nomad camps on the howling steppe of Garun",
  G2: "Moss Trolls — moss trolls and treants: long moss-covered limbs, bark armour, thorns and vines, giant-tree forest city of Sylvaniel",
  G3: "Bluescale Merfolk — merfolk, water spirits and shrine maidens: blue scales, flowing fins, lagoon temple of Selenea, clear water light",
  A1: "Abyssal Fiends — demon contractors: horns, shadow, blood-paid pacts and contract scrolls, the shadow city of Noctar in a sunless canyon",
  A2: "Radiant Seraphs — seraphs and human knights: white wings, halos, great shields, white walls of the Dawn Citadel Elad",
  A3: "Storm High Elves — high-elf mages: long ears, silver hair, robes and book pages blowing in the wind, cloud-piercing spire towers"
};
const CLASS_LOOK = {  // 1.3 클래스
  "무장": "an armed fighter wielding a weapon typical of the group",
  "무도": "a close-combat brawler, beast or living war-machine — bare fists, claws, horns or sheer armoured bulk",
  "마도": "a spellcaster channelling {el} magic",
  "기도": "a devoted priest, ritualist or pact-bound servant, praying or offering"
};
const ICON_LOOK = {
  sword: "a sword", dagger: "a dagger", spear: "a spear", bow: "a bow", axe: "an axe", armor: "a piece of armour",
  shield: "a shield", staff: "a magic staff", orb: "a glowing orb on a small stand", book: "a spellbook",
  rune: "a carved rune stone or engraved rune plate", holy: "a sacred relic (chalice, reliquary or holy symbol — not a plain cross)",
  seal: "a wax seal, signet or sealed contract"
};
const CAT_LOOK = { "무구": "weapon/armour", "각인": "engraving/rune", "촉매": "magic catalyst", "성물": "holy relic", "공용": "general gear" };

function rankOf(lv) {
  if (lv <= 2) return "a low-ranking, ordinary";
  if (lv <= 4) return "a seasoned, battle-hardened";
  if (lv <= 6) return "an elite, commanding";
  return "a legendary, awe-inspiring, larger-than-life";
}

/* 마법 효과(ops) → 장면 */
function spellScene(c, el) {
  const ops = c.ops || [];
  const has = o => ops.some(p => p.op === o);
  const foe = ops.some(p => p.side === "foe"), ally = ops.some(p => p.side === "ally"), both = ops.some(p => p.side === "both");
  const up = ops.some(p => p.op === "mod" && ["a", "d", "h"].some(k => (p[k] || 0) > 0));
  const down = ops.some(p => p.op === "mod" && ["a", "d", "h"].some(k => (p[k] || 0) < 0));
  const parts = [];
  if (has("dmg")) parts.push(both ? `a cataclysmic ${el.en} blast engulfing the whole battlefield` : `a destructive ${el.en} attack striking the enemy ranks`);
  if (has("destroy")) parts.push("an annihilating blow that erases a foe");
  if (up && (ally || !foe)) parts.push(`an empowering ${el.en} aura rising around allied warriors`);
  if (down && foe) parts.push("a weakening curse sinking over the enemies");
  if (has("shield") || has("guard") || has("lock")) parts.push("a protective barrier or ward of light shielding allies");
  if (has("thorns")) parts.push("a shell of thorns that punishes attackers");
  if (has("clean") || has("strip")) parts.push("a cleansing wave washing away enchantments");
  if (has("summon") || has("conjure") || has("copy") || has("echo") || has("mirrorTwin")) parts.push("a creature or double emerging from a rune circle");
  if (has("rest")) parts.push("a calm restoring rest");
  if (has("swap") || has("swapPos") || has("swapLowHigh") || has("swapLeft") || has("taunt")) parts.push("warriors forced to trade places by a trick of magic");
  if (has("draw") || has("leftToBottom") || has("fate")) parts.push("threads of fate and glowing cards being drawn");
  if (has("handMod") || has("handBurn")) parts.push("a sly hand reaching into the enemy's hidden plans");
  if (has("atk0")) parts.push("enemy weapons frozen and stopped mid-swing");
  if (has("chain") || has("multi")) parts.push(`chained ${el.en} strikes leaping from target to target`);
  if (c.cost && c.cost.life) parts.push("paid for with the caster's own blood");
  if (!parts.length) parts.push(`a burst of ${el.en} magic`);
  return parts.slice(0, 3).join("; ");
}

const KIND_EN = { atk: "attack spell", def: "defense spell", any: "versatile spell", hand: "trick spell played on the opponent's hand" };

function subjectOf(c, G) {
  const el = EL[c.el] || EL.dark;
  if (c.type === "unit") {
    const token = /^T[KS]-/.test(c.id);
    let s = token
      ? `a summoned creature or conjured ally of the ${G.en}`
      : `${rankOf(c.lv)} member of the ${G.en} — ${(CLASS_LOOK[c.cl] || "a warrior").replace("{el}", el.en)}`;
    if (c.rev === "벽") s += "; a stubborn defender who stands like a wall";
    if (c.rev === "돌격") s += "; a reckless charging attacker";
    if (c.special) s += ". One of the Ascended: a mythic hero who reached near-divine power — the most iconic, ornate image of this group";
    else if (c.unique) s += ". A famous named character, distinct and memorable";
    s += `. Level ${c.lv} of 8 — make the power and scale match the level. Upper body to full body`;
    return s;
  }
  if (c.type === "item") {
    const it = c.item || {};
    const what = ICON_LOOK[it.icon] || "a single magical object";
    const cat = String(it.cat || "").split("·").map(k => CAT_LOOK[k]).filter(Boolean).join(" + ");
    return `the item the card name and lore describe — a single object made by the ${G.en}${cat ? ` (${cat}` + `; if unsure, ${what})` : ""}, centered and shown whole, softly glowing, lit by faded old-gold light. No person holding it`;
  }
  // 마법
  let s = `${KIND_EN[c.type] || "spell"} — the moment the spell takes effect: ${spellScene(c, el)}`;
  if (c.comeback) s += ". A desperate last-stand reversal that turns a losing battle";
  if (c.classSpell) s += `. A spell of the ${c.classSpell} class`;
  return s;
}

function promptOf(c, D) {
  const G = D.GROUPS[c.group] || {};
  const el = EL[c.el] || EL.dark;
  const lore = (c.flavor || (c.item && c.item.desc) || "").trim();
  const text = (c.text || "").replace(/\s+/g, " ").trim();
  const L = [
    "Dark fantasy trading card illustration, painterly digital art, dramatic lighting.",
    `Card name (Korean, read its meaning — never write it in the image): "${c.name}". Depict what this name describes.`,
    `Subject: ${subjectOf(c, G)}.`,
    `Who: ${GROUP_LOOK[c.group] || G.en}.`,
    `Faction mood: ${FACTION_MOOD[c.faction] || ""}.`
  ];
  if (lore) L.push(`Lore (Korean): ${lore}`);
  if (text) L.push(`Game effect (Korean, mood only — do not draw text or numbers): ${text}`);
  L.push(
    `Background: very dark night-blue (#07080d), glowing ${el.en} light (${el.hex}) behind the subject; ${el.cue}.`,
    "Composition: one main subject centered within the middle 70%; keep the top 15% and bottom 20% calm (the card name and numbers are drawn over them); edges may be cropped; portrait 4:5.",
    "No text, no letters, no numbers, no signature, no watermark, no card frame, no border, no UI.",
    "Avoid: bright or white background, thick cartoon outlines, photorealism, cute chibi style, likeness of real people or of characters from other games or films."
  );
  return L.join("\n");
}

/* ---------- 3. 전장 그림 (ui_assets.json) ---------- */
function loadUI() {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, "ui_assets.json"), "utf8"));
  const style = j.style.join("\n");
  return j.assets.map(a => Object.assign({}, a, {
    kind: "ui",
    prompt: [a.prompt.join("\n"), style, (a.avoid || j.avoid).join("\n")].join("\n")
  }));
}

/* ---------- 4. 쓰기 ---------- */
function main() {
  const D = loadGame();
  const ids = Object.keys(D.CARDS).sort();
  fs.mkdirSync(path.join(OUT, "cards"), { recursive: true });
  const jobs = [], byGroup = {};
  for (const id of ids) {
    const c = D.CARDS[id];
    const job = {
      id, kind: "card", out: `img/cards/${id}.png`, size: [800, 1000], format: "png", background: "opaque",
      name: c.name, group: c.group, type: c.type, lv: c.lv, grade: c.grade || "",
      prompt: promptOf(c, D)
    };
    jobs.push(job);
    (byGroup[c.group] = byGroup[c.group] || []).push(job);
  }
  fs.writeFileSync(path.join(OUT, "cards.jsonl"), jobs.map(j => JSON.stringify(j)).join("\n") + "\n");

  const TYPE_KO = { unit: "유닛", atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "핸드 마법", item: "아이템" };
  for (const g of Object.keys(byGroup).sort()) {
    const G = D.GROUPS[g] || {};
    const md = [`# ${g} ${G.name || ""} — 카드 일러스트 프롬프트 (${byGroup[g].length}장)`, "",
      "각 카드: 아래 프롬프트를 그림 AI에 붙여 넣고, 나온 그림을 `저장 파일` 이름 그대로 게임 폴더에 넣는다.",
      "세로 4:5(예 800×1000) PNG. 자동으로 만들려면 `tools/art/README.md`.", ""];
    for (const j of byGroup[g]) {
      md.push(`## ${j.id} · ${j.name}`, `${TYPE_KO[j.type] || j.type} · 레벨 ${j.lv}${j.grade ? " · " + j.grade : ""} — 저장 파일 \`${j.out}\``, "", "```", j.prompt, "```", "");
    }
    fs.writeFileSync(path.join(OUT, "cards", g + ".md"), md.join("\n"));
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

  const cnt = {};
  for (const j of jobs) cnt[j.type] = (cnt[j.type] || 0) + 1;
  console.log(`카드 ${jobs.length}장`, cnt, `· 전장 그림 ${ui.length}장 → ${path.relative(ROOT, OUT)}`);
}
main();

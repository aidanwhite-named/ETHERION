/* ETHERION — 그림 AI용 카드 일러스트 프롬프트 만들기 (n판 · 2026-11-20 처음부터 새로 씀 · n2 2026-11-21 등급 사다리 · 스타일 가이드 6장)

   프롬프트 = ① 카드 장면(카드마다 손으로 쓴 것 — tools/art/art_scenes/<깃발>.json)
            + ② 배색 한 줄(깃발의 배색 묶음 가운데 그 카드가 고른 것)
            + ③ 깃발 한 줄(원소의 재료 · 대기 — 종족이 아니다)
            + ④ 등급 줄(분위기 · 빛 · 채도 · 공기 · 재질 다섯 칸 — 일반 → 스페셜로 한 단계씩 더 신비롭고 화려하게. 시점은 정하지 않는다)
              + 사다리 한 줄(여섯 등급의 차례 — 모든 등급 같음, 소환물은 뺌)
            + ⑤ 화풍 한 줄(모든 카드 같음)
   카드끼리 달라야 하는 것(무엇을 · 어디서 보나 · 어디에 놓나 · 어느 쪽을 보나 · 빛)은 모두 ①에 있고,
   ②~⑤는 art_style.json의 짧은 말이다. 등급 · 깃발의 통일감은 ②~⑤가, 카드의 개성은 ①이 맡는다.

   스페셜 · 레어(art_style.json legacyGrades)는 옛 g4 프롬프트를 그대로 쓴다 — legacy_g4/prompts_special_rare.jsonl.

   실행 (게임 폴더 맨 위에서):  node tools/art/build_prompts.js
   만드는 파일:
     tools/art/prompts/cards.jsonl        카드 그림 작업 목록 (gen.py · artmap.py가 읽음) — 한 줄 = 한 장
     tools/art/prompts/grades/<등급>.md    등급별 · tools/art/prompts/cards/<깃발>.md 깃발별 (사람이 붙여 넣는 용)
     tools/art/prompts/ui.jsonl · ui.md    전장 그림 (ui_assets.json을 펼친 것)
     tools/art/PROMPT_GUIDE.md             <!-- AUTO:… --> 칸만 새로 채운다
   새 카드를 만들었으면: node tools/art/scene_tool.js todo → 장면을 쓰고 → lint → 이 파일.
   그리는 차례: 그림 없는 카드(art_style.json drawOrder 순) → 다시 그리기(장부 art_map.csv 상태 "다시") → 그림 있는 카드. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(__dirname, "prompts");
const S = JSON.parse(fs.readFileSync(path.join(__dirname, "art_style.json"), "utf8"));
const LEGACY = new Set(S.legacyGrades || []);

/* ---------- 1. 게임 데이터 (index.html의 data.js ~ grades.js와 같은 차례) ---------- */
const DATA_FILES = ["data", "names", "retired", "briefs", "specials", "uniques", "highcards", "pincards", "rarespells", "counterspells", "upgrades", "rebalance", "abyss", "gnome", "orc", "mermaid", "rares", "elf", "goblin", "newabil", "troll", "celestial", "kinds", "statguide", "itemtune", "itemrework", "spelltune", "decks", "cards", "wording", "lore", "grades"];
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
  for (const f of DATA_FILES) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n"; }
  src += "this.__o = { CARDS, GROUPS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}) };";
  vm.runInContext(src, ctx, { filename: "etherion-data" });
  return ctx.__o;
}

/* ---------- 2. 장면 · 옛 프롬프트 · 장부 ---------- */
function loadScenes() {
  const dir = path.join(__dirname, "art_scenes"), all = {};
  if (!fs.existsSync(dir)) return all;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith(".json")).sort()) {
    const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const id of Object.keys(j)) if (id[0] !== "_") all[id] = j[id];
  }
  return all;
}
function loadLegacy() {
  const p = path.join(__dirname, "legacy_g4", "prompts_special_rare.jsonl"), M = {};
  if (!fs.existsSync(p)) return M;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) if (line.trim()) { const j = JSON.parse(line); M[j.id] = j; }
  return M;
}
function loadArtMap() {   // 장부 art_map.csv (상태 · 메모) — 작은 CSV 읽기
  const p = path.join(__dirname, "art_map.csv");
  if (!fs.existsSync(p)) return {};
  const txt = fs.readFileSync(p, "utf8").replace(/^﻿/, ""), rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < txt.length; i++) {
    const ch = txt[i];
    if (q) { if (ch === '"') { if (txt[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && txt[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift() || [], M = {};
  for (const r of rows) { const o = {}; head.forEach((h, k) => o[h] = r[k] || ""); if (o.card_id) M[o.card_id] = o; }
  return M;
}
const SCENES = loadScenes(), OLD = loadLegacy(), ART_MAP = loadArtMap();
const hasArt = id => ["jpg", "png", "webp"].some(x => fs.existsSync(path.join(ROOT, "img", "cards", `${id}.${x}`)));
const artState = id => !hasArt(id) ? "new" : (ART_MAP[id] && ART_MAP[id].status === "다시") ? "redo" : "have";   // new 먼저 · redo 다시 그리기 · have 그리지 않음
const ART_RANK = { new: 0, redo: 1, have: 2 };
const ART_SECTION = {
  new: "## 1. 그림 없는 카드 — 먼저 그린다{n}",
  redo: "## 2. 다시 그리기{n}\n\n> 이미 그림이 있어 게임은 그대로 돌아간다. 1번을 다 그린 뒤 그린다.",
  have: "## 3. 그림 있음 — 그리지 않는다 (참고용){n}"
};

/* ---------- 3. 카드 → 프롬프트 ---------- */
const isToken = c => /^T[KS]-/.test(c.id);
const gradeKey = c => isToken(c) ? "token" : (c.grade || "common");
const typeOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
const sentence = s => { s = String(s || "").trim(); return s && !/[.!?]$/.test(s) ? s + "." : s; };

function promptOf(c, D) {
  const gk = gradeKey(c);
  if (LEGACY.has(gk)) return OLD[c.id] ? { prompt: OLD[c.id].prompt, ver: OLD[c.id].prompt_ver || S.legacyVersion } : { prompt: "", ver: S.legacyVersion, todo: "옛 프롬프트 없음" };
  const sc = SCENES[c.id], F = S.flags[c.group], G = S.grades[gk];
  if (!sc || !F || !G) return { prompt: "", ver: S.version, todo: "장면 없음" };
  const L = [
    `${S.lead[typeOf(c)]} ${sentence(sc.scene)} ${sentence(sc.light)}`.trim(),
    `Colour: ${sentence(F.palettes[sc.pal] || "")}`,
    F.world,
    G.finish
  ];
  if (S.gradeLadder && G.ladder !== false) L.push(S.gradeLadder);   // 여섯 등급의 차례 — 그림 AI가 이 등급의 화려함을 위아래 등급에 견주어 맞춘다
  if (gk === "upgrade" && S.upgradeRef) L.push(S.upgradeRef);   // 원래 카드 그림을 함께 넣는다(카드 머리말이 알려 준다)
  L.push(S.house);
  return { prompt: L.join("\n"), ver: S.version };
}

/* ---------- 4. 전장 그림 (ui_assets.json) ---------- */
function loadUI() {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, "ui_assets.json"), "utf8"));
  const style = j.style.join("\n");
  return j.assets.map(a => Object.assign({}, a, { kind: "ui", prompt: [a.prompt.join("\n"), style, (a.avoid || j.avoid).join("\n")].join("\n") }));
}

/* ---------- 5. PROMPT_GUIDE.md 자동 칸 ---------- */
const TYPE_KO = { unit: "유닛", atk: "공격 마법", def: "방어 마법", any: "공용 마법", hand: "핸드 마법", item: "아이템" };
function autoBlocks(jobs) {
  const B = {}, cnt = {};
  for (const j of jobs) { const k = cnt[j.grade] = cnt[j.grade] || { n: 0, unit: 0, spell: 0, item: 0, todo: 0 }; k.n++; k[j.type === "unit" ? "unit" : j.type === "item" ? "item" : "spell"]++; if (j.todo) k.todo++; }
  B.COUNTS = [`프롬프트 버전 **${S.version}** (${S.updated}) · 카드 ${jobs.length}장 (뺀 카드 제외, 소환물 포함)`, "",
    "| 등급 | 색 | 장수 | 유닛 · 마법 · 아이템 | 프롬프트 | 파일 |", "|---|---|---|---|---|---|",
    ...S.gradeOrder.filter(g => cnt[g]).map(g => { const G = S.grades[g], k = cnt[g]; return `| ${G.ko} (${G.en}) | \`${G.color}\` | ${k.n} | ${k.unit} · ${k.spell} · ${k.item} | ${G.legacy ? `옛 ${S.legacyVersion} 그대로` : `${S.version}${k.todo ? ` (장면 없음 ${k.todo})` : ""}`} | \`prompts/grades/${g}.md\` |`; })].join("\n");
  B.GRADES = ["| 등급 | 뜻 | 프롬프트에 들어가는 등급 줄 |", "|---|---|---|",
    ...S.gradeOrder.filter(g => !S.grades[g].legacy).map(g => { const G = S.grades[g]; return `| ${G.ko} \`${g}\` | ${G.idea_ko} | ${G.finish} |`; }),
    "", `사다리 한 줄(소환물을 뺀 모든 카드, 등급 줄 바로 다음): \`${S.gradeLadder || ""}\``].join("\n");
  B.FLAGS = Object.keys(S.flags).map(id => {
    const F = S.flags[id], el = S.elements[F.element];
    return [`### ${id} ${F.ko} — ${el.en} \`${el.hex}\``, "", `- 깃발 한 줄: ${F.world}`,
      `- 배색: ${Object.keys(F.palettes).map(k => `\`${k}\` ${F.palettes[k]}`).join(" / ")}`,
      `- 장소 낱말(장면을 쓸 때): ${F.locales.join(", ")}`,
      `- 처음 세운 무리 — 종류가 「${F.founderKo}」인 유닛에만: ${F.founder}`, ""].join("\n");
  }).join("\n");
  const tbl = t => ["| shot | 뜻 |", "|---|---|", ...Object.keys(S.shots[t]).map(k => `| \`${k}\` | ${S.shots[t][k].en} |`)].join("\n");
  B.SHOTS = ["**유닛**", "", tbl("unit"), "", "**마법**", "", tbl("spell"), "", "**아이템**", "", tbl("item"), "",
    `**dir** — ${Object.keys(S.dirs).filter(k => k[0] !== "_").map(k => `\`${k}\` ${S.dirs[k]}`).join(" · ")}`, "",
    `**place** — ${Object.keys(S.places).filter(k => k[0] !== "_").map(k => `\`${k}\` ${S.places[k]}`).join(" · ")}`].join("\n");
  const ex = [];
  for (const g of ["common", "uncommon", "rare", "epic", "unique", "special"]) for (const t of (g === "common" || g === "epic" ? ["unit", "spell", "item"] : ["unit"])) {   // 여섯 등급을 나란히 — 등급 줄만 달라지는 것이 보이게
    const j = jobs.find(x => x.grade === g && (x.type === "unit" ? "unit" : x.type === "item" ? "item" : "spell") === t && x.prompt);
    if (j) ex.push(`#### ${S.grades[g].ko} · ${TYPE_KO[j.type]} — ${j.id} ${j.name}`, "", "```", j.prompt, "```", "");
  }
  B.EXAMPLES = ex.join("\n");
  return B;
}
function fillGuide(B) {
  const p = path.join(__dirname, "PROMPT_GUIDE.md");
  if (!fs.existsSync(p)) return false;
  let md = fs.readFileSync(p, "utf8");
  for (const k of Object.keys(B)) md = md.replace(new RegExp(`(<!-- AUTO:${k} -->)[\\s\\S]*?(<!-- /AUTO:${k} -->)`), (m, a, z) => `${a}\n${B[k]}\n${z}`);
  fs.writeFileSync(p, md);
  return true;
}

/* ---------- 6. 쓰기 ---------- */
function cardMd(j) {
  const note = ((ART_MAP[j.id] || {}).note || "").trim();
  const st = j.art === "redo" ? ` — **다시 그리기**${note ? `: ${note}` : ""}` : j.art === "have" ? " — 그림 있음" : "";
  const frame = j.shot ? ` · 틀 \`${j.shot}\` ${j.dir || ""} ${j.place || ""} \`${j.pal || ""}\`` : "";
  const base = j.base ? ` · 원래 카드 \`${j.base}\`${j.refs ? " (그 그림을 함께 넣기)" : " — **원래 카드 그림을 먼저 그려 함께 넣을 것**"}` : "";
  return [`### ${j.id} · ${j.name}${st}`,
    `${S.flags[j.group] ? S.flags[j.group].ko : j.group} · ${TYPE_KO[j.type] || j.type} · 레벨 ${j.lv} · ${S.grades[j.grade].ko}${frame}${base} · 프롬프트 ${j.prompt_ver} → \`tools/art/inbox/${j.id}.jpg\``, "",
    ...(j.prompt ? ["```", j.prompt, "```"] : [`> **${j.todo}** — \`node tools/art/scene_tool.js todo ${j.group}\` 로 자료를 보고 \`tools/art/art_scenes/${j.group}.json\`에 장면을 쓴다.`]), ""].join("\n");
}
function main() {
  const D = loadGame();
  const ids = Object.keys(D.CARDS).filter(id => !D.RETIRED[id]).sort();
  fs.mkdirSync(path.join(OUT, "cards"), { recursive: true });
  fs.mkdirSync(path.join(OUT, "grades"), { recursive: true });
  const jobs = [], byGroup = {}, byGrade = {};
  for (const id of ids) {
    const c = D.CARDS[id], P = promptOf(c, D), sc = SCENES[id];
    const job = {
      id, kind: "card", out: `img/cards/${id}.jpg`, size: [750, 600], format: "jpg", background: "opaque",   // 가로 5:4, 750×600 JPG (artmap.py와 같음)
      name: c.name, group: c.group, faction: c.faction, type: c.type, lv: c.lv, grade: gradeKey(c), prompt_ver: P.ver
    };
    if (c.base) { job.base = c.base; if (hasArt(c.base)) job.refs = [`img/cards/${c.base}.jpg`]; }
    if (sc && !LEGACY.has(job.grade)) { job.shot = sc.shot; job.dir = sc.dir; job.place = sc.place; job.pal = sc.pal; }
    if (P.todo) job.todo = P.todo;
    job.art = artState(id);
    job.prompt = P.prompt;
    jobs.push(job);
    (byGroup[c.group] = byGroup[c.group] || []).push(job);
    (byGrade[job.grade] = byGrade[job.grade] || []).push(job);
  }
  const DRAW = S.drawOrder, drawRank = g => { const i = DRAW.indexOf(g); return i < 0 ? 99 : i; };
  const artOrder = (a, b) => ART_RANK[a.art] - ART_RANK[b.art];
  const sections = (list, inner) => {
    const out = [];
    for (const st of ["new", "redo", "have"]) {
      const part = list.filter(j => j.art === st).sort(inner);
      if (part.length) out.push(ART_SECTION[st].replace("{n}", ` · ${part.length}장`), "", ...part.map(cardMd));
    }
    return out;
  };
  const ORDER_NOTE = `**그리는 차례**: 1 그림 없는 카드(${DRAW.map(g => S.grades[g].ko).join(" → ")}) → 2 다시 그리기(장부 \`art_map.csv\` 상태 "다시") → 3 그림 있는 카드는 그리지 않는다. 강화는 원래 카드 그림을 먼저.`;
  const HOW = "카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 나온 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`.";
  fs.writeFileSync(path.join(OUT, "cards.jsonl"), jobs.slice().sort((a, b) => artOrder(a, b) || drawRank(a.grade) - drawRank(b.grade) || a.id.localeCompare(b.id)).map(j => JSON.stringify(j)).join("\n") + "\n");

  for (const g of Object.keys(byGroup).sort()) {
    const F = S.flags[g] || {};
    fs.writeFileSync(path.join(OUT, "cards", g + ".md"), [`# ${g} ${F.ko || ""} — 카드 일러스트 프롬프트 (${byGroup[g].length}장, ${S.version})`, "",
      HOW, "이 파일은 `node tools/art/build_prompts.js`가 만든다 — 손으로 고치지 않는다(장면은 `tools/art/art_scenes/" + g + ".json`, 규칙은 `tools/art/PROMPT_GUIDE.md`).", "", ORDER_NOTE, "",
      ...sections(byGroup[g], (a, b) => drawRank(a.grade) - drawRank(b.grade) || a.id.localeCompare(b.id))].join("\n"));
  }
  for (const g of S.gradeOrder) {
    const list = byGrade[g]; if (!list) continue;
    const G = S.grades[g];
    fs.writeFileSync(path.join(OUT, "grades", g + ".md"), [`# ${G.ko} (${G.en}) — 카드 일러스트 프롬프트 (${list.length}장, ${G.legacy ? "옛 " + S.legacyVersion : S.version})`, "",
      `> ${G.idea_ko}`, "", ...(G.finish ? [`등급 줄(모든 ${G.ko} 프롬프트에 들어 있다): \`${G.finish}\``, ""] : []),
      HOW, "", ORDER_NOTE, "",
      ...sections(list, (a, b) => a.group.localeCompare(b.group) || a.lv - b.lv || a.id.localeCompare(b.id))].join("\n"));
  }

  const ui = loadUI();
  fs.writeFileSync(path.join(OUT, "ui.jsonl"), ui.map(j => JSON.stringify(j)).join("\n") + "\n");
  const um = ["# 전장 그림 프롬프트", "",
    "참고 그림(지금 게임 그림)을 함께 넣어야 자리가 맞는다. 층으로 나뉜 그림은 같은 묶음끼리 차례로 만든다.",
    "저장 크기 · 투명 처리는 각 항목의 설명대로. 자동으로 하려면 `tools/art/README.md`.", ""];
  for (const a of ui) um.push(`## ${a.id} — ${a.title}`, `저장 파일 \`${a.out}\` · ${a.size[0]}×${a.size[1]} ${a.format.toUpperCase()} · 참고 그림: ${(a.refs || []).map(r => "`" + r + "`").join(", ") || "없음"}`, "", a.note || "", "", "```", a.prompt, "```", "");
  fs.writeFileSync(path.join(OUT, "ui.md"), um.join("\n"));

  const guided = fillGuide(autoBlocks(jobs));
  const cnt = {}; for (const j of jobs) cnt[j.grade] = (cnt[j.grade] || 0) + 1;
  const wc = jobs.filter(j => j.prompt && !LEGACY.has(j.grade)).map(j => j.prompt.split(/\s+/).length);
  console.log(`카드 ${jobs.length}장 (${S.version})`, cnt, `· 전장 그림 ${ui.length}장 → ${path.relative(ROOT, OUT)}${guided ? " · PROMPT_GUIDE.md 자동 칸 채움" : ""}`);
  if (wc.length) console.log(`새 프롬프트 ${wc.length}장 · 평균 ${Math.round(wc.reduce((a, b) => a + b, 0) / wc.length)}단어 (가장 긴 것 ${Math.max(...wc)})`);
  const miss = jobs.filter(j => j.todo);
  if (miss.length) console.log(`※ 프롬프트가 없는 카드 ${miss.length}장 (node tools/art/scene_tool.js todo): ${miss.slice(0, 40).map(j => j.id).join(", ")}${miss.length > 40 ? " …" : ""}`);
  const redo = jobs.filter(j => j.art === "redo");
  console.log(`그릴 차례: 그림 없음 ${jobs.filter(j => j.art === "new").length}장${redo.length ? ` → 다시 그리기 ${redo.length}장(${redo.map(j => j.id).join(", ")})` : ""} · 그림 있음 ${jobs.filter(j => j.art === "have").length}장`);
}
main();

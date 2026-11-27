/* ETHERION — 그림 AI용 카드 일러스트 프롬프트 만들기 (n판 · 2026-11-20 처음부터 새로 씀 · n2 2026-11-21 등급 사다리 · 스타일 가이드 6장)

   프롬프트 = ① 카드 장면(카드마다 손으로 쓴 것 — tools/art/art_scenes/<깃발>.json)
            + ② 배색 한 줄(깃발의 배색 묶음 가운데 그 카드가 고른 것)
            + ③ 깃발 한 줄(원소의 재료 · 대기 — 종족이 아니다)
            + ④ 등급 줄(분위기 · 빛 · 채도 · 공기 · 재질 다섯 칸 — 일반 → 스페셜로 한 단계씩 더 신비롭고 화려하게. 시점은 정하지 않는다)
              + 사다리 한 줄(여섯 등급의 차례 — 모든 등급 같음, 소환물은 뺌)
            + ⑤ 화풍 한 줄(모든 카드 같음)
            + ⑥ 파일 이름 줄(맨 끝 · art_style.json saveAs — "Save the image file as: <카드ID> <카드 이름>.png". 그림 내용이 아니라
              내려받을 파일 이름이다. artmap.py import가 파일 이름 앞의 카드 ID로 짝을 찾는다 · 2026-11-22)
   카드끼리 달라야 하는 것(무엇을 · 어디서 보나 · 어디에 놓나 · 어느 쪽을 보나 · 빛)은 모두 ①에 있고,
   ②~⑤는 art_style.json의 짧은 말이다. 등급 · 깃발의 통일감은 ②~⑤가, 카드의 개성은 ①이 맡는다.

   스페셜 · 레어(art_style.json legacyGrades)는 옛 g4 프롬프트를 그대로 쓴다 — legacy_g4/prompts_special_rare.jsonl.

   실행 (게임 폴더 맨 위에서):  node tools/art/build_prompts.js
   만드는 파일:
     tools/art/prompts/cards.jsonl        카드 그림 작업 목록 (gen.py · artmap.py가 읽음) — 한 줄 = 한 장
     tools/art/prompts/grades/<등급>.md    등급별 · tools/art/prompts/cards/<깃발>.md 깃발별 (사람이 붙여 넣는 용)
     tools/art/prompts/ui.jsonl · ui.md    전장 그림 (ui_assets.json을 펼친 것)
     tools/art/PROMPT_GUIDE.md             <!-- AUTO:… --> 칸만 새로 채운다
   새 카드를 만들었으면: node tools/art/scene_tool.js todo → 장면을 쓰고 → lint → 이 파일. */
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

/* ---------- 2. 장면 · 옛 프롬프트 ---------- */
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
const SCENES = loadScenes(), OLD = loadLegacy();
const hasArt = id => ["jpg", "png", "webp"].some(x => fs.existsSync(path.join(ROOT, "img", "cards", `${id}.${x}`)));

/* ---------- 3. 카드 → 프롬프트 ---------- */
const isToken = c => /^T[KS]-/.test(c.id);
const gradeKey = c => isToken(c) ? "token" : (c.grade || "common");
const typeOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
const sentence = s => { s = String(s || "").trim(); return s && !/[.!?]$/.test(s) ? s + "." : s; };

/* 등급 줄의 {banner} · {bannerName} → 그 카드 깃발의 색("violet (#8b5cf6)" · "violet"). 유니크 등급 줄이 쓴다(2026-11-22) —
   등급 줄이 색 하나(주황 금)를 못박으면 모든 깃발의 유니크가 불의 깃발처럼 붉어져서, 빛 · 입자의 색은 깃발을 따르게 했다. */
function bannerFill(text, F) {
  const el = S.elements[F.element] || {}, name = el.colour || el.en || "banner";
  return String(text || "").replace(/\{banner\}/g, `${name} (${el.hex})`).replace(/\{bannerName\}/g, name);
}

/* ⑥ 파일 이름 줄 — "<카드ID> <카드 이름>.png". 파일 이름에 못 쓰는 글자(/ \\ : * ? " < > |)는 빈칸으로. */
const fileNameOf = c => `${c.id} ${String(c.name || "").replace(/[\/\\:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim()}`.trim() + ".png";
const saveLine = c => S.saveAs ? S.saveAs.replace("{file}", fileNameOf(c)) : "";
const withSave = (prompt, c) => prompt && saveLine(c) ? `${prompt}\n${saveLine(c)}` : prompt;

function promptOf(c, D) {
  const P = promptBody(c, D);
  P.prompt = withSave(P.prompt, c);
  return P;
}
function promptBody(c, D) {
  const gk = gradeKey(c);
  if (LEGACY.has(gk)) return OLD[c.id] ? { prompt: OLD[c.id].prompt, ver: OLD[c.id].prompt_ver || S.legacyVersion } : { prompt: "", ver: S.legacyVersion, todo: "옛 프롬프트 없음" };
  const sc = SCENES[c.id], F = S.flags[c.group], G = S.grades[gk];
  const ver = (G && G.ver) || S.version;   // 등급마다 판을 따로 올릴 수 있다(에픽 · 유니크 · 스페셜 n3, 2026-11-28) — 다른 등급 그림이 "옛 프롬프트"로 바뀌지 않게
  if (!sc || !F || !G) return { prompt: "", ver, todo: "장면 없음" };
  /* look "rich" = 옛 g3(세로 4:5 시절) 색감 · 화풍(art_style.json richLook): 배색 줄은 깃발의 g3 배색 + 밤하늘 남색 바탕,
     화풍 줄은 g3 문장. 장면(구도 · 크기 · 시점 · 빛 한 문장)은 카드 장면 그대로다 — 2026-11-28 사용자. */
  const R = G.look === "rich" && S.richLook && S.richLook.palettes[c.group] ? S.richLook : null;
  const finish = (typeOf(c) === "item" && G.finishItem) || G.finish;
  const L = [
    `${S.lead[typeOf(c)]} ${sentence(sc.scene)} ${sentence(sc.light)}`.trim(),
    R ? R.colour.replace("{palette}", R.palettes[c.group]) : `Colour: ${sentence(F.palettes[sc.pal] || "")}`,
    F.world,
    bannerFill(finish, F)
  ];
  if (S.gradeLadder && G.ladder !== false) L.push(S.gradeLadder);   // 여섯 등급의 차례 — 그림 AI가 이 등급의 화려함을 위아래 등급에 견주어 맞춘다
  if (gk === "upgrade") { const ref = c.base && hasArt(c.base) ? S.upgradeRef : (S.upgradeNoRef || S.upgradeRef); if (ref) L.push(ref); }   // 원래 카드 그림이 있으면 함께 넣는 줄, 없으면 장면 글만으로 잇는 줄(2026-11-22, 카드 머리말이 알려 준다)
  L.push(R ? R.house : S.house);
  return { prompt: L.join("\n"), ver };
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
    ...S.gradeOrder.filter(g => cnt[g]).map(g => { const G = S.grades[g], k = cnt[g]; return `| ${G.ko} (${G.en}) | \`${G.color}\` | ${k.n} | ${k.unit} · ${k.spell} · ${k.item} | ${G.legacy ? `옛 ${S.legacyVersion} 그대로` : `${G.ver || S.version}${k.todo ? ` (장면 없음 ${k.todo})` : ""}`} | \`prompts/grades/${g}.md\` |`; })].join("\n");
  B.GRADES = ["| 등급 | 뜻 | 프롬프트에 들어가는 등급 줄 |", "|---|---|---|",
    ...S.gradeOrder.filter(g => !S.grades[g].legacy).map(g => { const G = S.grades[g]; return `| ${G.ko} \`${g}\` | ${G.idea_ko} | ${G.finish} |`; }),
    "", `사다리 한 줄(소환물을 뺀 모든 카드, 등급 줄 바로 다음): \`${S.gradeLadder || ""}\``].join("\n");
  B.FLAGS = Object.keys(S.flags).map(id => {
    const F = S.flags[id], el = S.elements[F.element];
    return [`### ${id} ${F.ko} — ${el.en} \`${el.hex}\``, "", `- 깃발 한 줄: ${F.world}`,
      `- 배색: ${Object.keys(F.palettes).map(k => `\`${k}\` ${F.palettes[k]}`).join(" / ")}`,
      `- 장소 낱말(장면을 쓸 때): ${F.locales.join(", ")}`, ""].join("\n");
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
  const frame = j.shot ? ` · 틀 \`${j.shot}\` ${j.dir || ""} ${j.place || ""} \`${j.pal || ""}\`` : "";
  const base = j.base ? ` · 원래 카드 \`${j.base}\`${j.refs ? " (그 그림을 함께 넣기)" : " — 원래 카드 그림이 아직 없다: 원래 카드를 먼저 그리고 같은 대화에서 이어 그리면 가장 닮는다(그 뒤 다시 만들면 참조 줄로 바뀐다)"}` : "";
  return [`### ${j.id} · ${j.name}`,
    `${S.flags[j.group] ? S.flags[j.group].ko : j.group} · ${TYPE_KO[j.type] || j.type} · 레벨 ${j.lv} · ${S.grades[j.grade].ko}${frame}${base} · 프롬프트 ${j.prompt_ver} → \`tools/art/inbox/${fileNameOf(j)}\``, "",
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
    job.prompt = P.prompt;
    if (P.prompt) job.save_as = fileNameOf(c);   // 프롬프트 맨 끝 줄이 알려 주는 파일 이름(gen.py는 이 줄을 빼고 보낸다)
    jobs.push(job);
    (byGroup[c.group] = byGroup[c.group] || []).push(job);
    (byGrade[job.grade] = byGrade[job.grade] || []).push(job);
  }
  const gradeRank = g => { const i = S.gradeOrder.indexOf(g); return i < 0 ? 99 : i; };
  const HOW = "카드 하나의 ``` 안 글만 그림 AI에 붙여 넣는다(카드마다 새 대화). 프롬프트 맨 끝 줄이 파일 이름(`<카드ID> <카드 이름>.png`)을 알려 준다 — 나온 그림(가로 5:4)을 그 이름으로 `tools/art/inbox/`에 두고(이름이 달라도 카드 ID만 앞에 있으면 된다) → `python3 tools/art/artmap.py import`.";
  fs.writeFileSync(path.join(OUT, "cards.jsonl"), jobs.map(j => JSON.stringify(j)).join("\n") + "\n");

  for (const g of Object.keys(byGroup).sort()) {
    const F = S.flags[g] || {};
    fs.writeFileSync(path.join(OUT, "cards", g + ".md"), [`# ${g} ${F.ko || ""} — 카드 일러스트 프롬프트 (${byGroup[g].length}장, ${S.version})`, "",
      HOW, "이 파일은 `node tools/art/build_prompts.js`가 만든다 — 손으로 고치지 않는다(장면은 `tools/art/art_scenes/" + g + ".json`, 규칙은 `tools/art/PROMPT_GUIDE.md`).", "",
      ...byGroup[g].slice().sort((a, b) => gradeRank(a.grade) - gradeRank(b.grade) || a.id.localeCompare(b.id)).map(cardMd)].join("\n"));
  }
  for (const g of S.gradeOrder) {
    const list = byGrade[g]; if (!list) continue;
    const G = S.grades[g];
    fs.writeFileSync(path.join(OUT, "grades", g + ".md"), [`# ${G.ko} (${G.en}) — 카드 일러스트 프롬프트 (${list.length}장, ${G.legacy ? "옛 " + S.legacyVersion : (G.ver || S.version)})`, "",
      `> ${G.idea_ko}`, "", ...(G.finish ? [`등급 줄(모든 ${G.ko} 프롬프트에 들어 있다${G.finishItem ? " — 아이템은 아래 아이템 줄" : ""}): \`${G.finish}\``, ""] : []),
      ...(G.finishItem ? [`아이템 등급 줄: \`${G.finishItem}\``, ""] : []),
      ...(G.look === "rich" && S.richLook ? [`배색 · 화풍 줄은 옛 g3 색감(\`art_style.json\` \`richLook\`): \`${S.richLook.colour}\` · \`${S.richLook.house}\``, ""] : []),
      HOW, "",
      ...list.slice().sort((a, b) => a.group.localeCompare(b.group) || a.lv - b.lv || a.id.localeCompare(b.id)).map(cardMd)].join("\n"));
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
  const wc = jobs.filter(j => j.prompt && !LEGACY.has(j.grade)).map(j => j.prompt.split(/\s+/).length - (saveLine(j) ? saveLine(j).split(/\s+/).length : 0));   // 파일 이름 줄은 세지 않는다
  console.log(`카드 ${jobs.length}장 (${S.version})`, cnt, `· 전장 그림 ${ui.length}장 → ${path.relative(ROOT, OUT)}${guided ? " · PROMPT_GUIDE.md 자동 칸 채움" : ""}`);
  if (wc.length) console.log(`새 프롬프트 ${wc.length}장 · 평균 ${Math.round(wc.reduce((a, b) => a + b, 0) / wc.length)}단어 (가장 긴 것 ${Math.max(...wc)})`);
  const miss = jobs.filter(j => j.todo);
  if (miss.length) console.log(`※ 프롬프트가 없는 카드 ${miss.length}장 (node tools/art/scene_tool.js todo): ${miss.slice(0, 40).map(j => j.id).join(", ")}${miss.length > 40 ? " …" : ""}`);
}
main();

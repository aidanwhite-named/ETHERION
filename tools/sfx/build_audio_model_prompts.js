/* GPT 오디오 모델용 게임 공용 효과음 프롬프트 생성기.
   카드별 공격·방어·발동·장착음은 의도적으로 제외한다.
   실행: node tools/sfx/build_audio_model_prompts.js */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(__dirname, "sfx_common.json");
const OUT = path.join(__dirname, "prompts/audio_model");
const common = JSON.parse(fs.readFileSync(SRC, "utf8"));
fs.mkdirSync(OUT, { recursive: true });
const clean = s => String(s).replace(/\s+/g, " ").trim().replace(/[.;]+$/, "");
const rows = common.groups.flatMap(g => g.items.map(it => ({ ...it, group: g.id, group_ko: g.ko })));

// The card prompts share the source-of-truth data loader and card notes with the Gemini prompt builder.
const vm = require("vm");
const S = JSON.parse(fs.readFileSync(path.join(__dirname, "sfx_style.json"), "utf8"));
const FLAGS = ["B1", "B2", "B3", "G1", "G2", "G3", "A1", "A2", "A3"];
const DATA_FILES = ["data", "names", "retired", "briefs", "specials", "uniques", "highcards", "pincards", "rarespells", "counterspells", "upgrades", "rebalance", "abyss", "gnome", "orc", "mermaid", "rares", "elf", "goblin", "newabil", "troll", "celestial", "kinds", "statguide", "itemtune", "itemrework", "spelltune", "decks", "cards", "grades"];
const stub = () => null;
const ctx = { console, navigator: {}, location: { search: "", hash: "" }, localStorage: { getItem: stub, setItem: stub, removeItem: stub }, document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }) }, addEventListener: stub, setTimeout, clearTimeout };
ctx.window = ctx; vm.createContext(ctx);
let source = "";
for (const f of DATA_FILES) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) source += fs.readFileSync(p, "utf8") + "\n;\n"; }
source += "this.__o = { CARDS, GROUPS, RETIRED: (typeof RETIRED_CARDS !== 'undefined' ? RETIRED_CARDS : {}), STARTER: (typeof STARTER_DECKS !== 'undefined' ? STARTER_DECKS : {}) };";
vm.runInContext(source, ctx, { filename: "etherion-data" });
const D = ctx.__o, NOTES = {};
for (const f of FLAGS) { const p = path.join(__dirname, "notes", f + ".json"); NOTES[f] = fs.existsSync(p) ? (JSON.parse(fs.readFileSync(p, "utf8")).cards || {}) : {}; }
const isToken = c => /^T[KS]-/.test(c.id);
const kindOf = c => c.type === "unit" ? "unit" : c.type === "item" ? "item" : "spell";
const gradeOf = c => isToken(c) ? "token" : (c.grade || "common");
const lvOf = c => Math.max(1, Math.min(8, c.lv || 1));
const cardRows = [];
const live = Object.values(D.CARDS).filter(c => !D.RETIRED[c.id] && FLAGS.includes(c.group));
const keyFor = { unit: [["atk", "공격"], ["def", "방어"]], spell: [["cast", "발동"]], item: [["equip", "장착"]] };
for (const c of live) {
  const n = NOTES[c.group][c.id], kind = kindOf(c);
  if (!n || !n.en || !n.ko || keyFor[kind].some(([k]) => !n[k])) continue;
  const lv = lvOf(c), len = kind === "unit" ? null : kind === "spell" ? Math.min(S.spell.max, S.spell.base + S.spell.per * lv) : S.item.len;
  for (const [role, roleKo] of keyFor[kind]) {
    const duration = kind === "unit" ? S.levels[String(lv)][role] : len;
    const gradeTail = S.grades[gradeOf(c)];
    let desc = n[role].trim().replace(/[.;]+$/, "");
    if (gradeTail) desc += `. ${gradeTail}`;
    const typeLabel = kind === "unit" ? `${S.levels[String(lv)].size} ${role === "atk" ? "attack" : "defense or hit-taken"} sound` : kind === "spell" ? "spell cast sound" : "item equip sound";
    const promptText = `Create one isolated ${typeLabel} for a dark-fantasy card game. Faction: ${S.flags[c.group].en} (${S.flags[c.group].world}). Card: ${n.en}. ${desc}. Duration: about ${duration} seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. No music, speech, or extra events.`;
    cardRows.push({ id: c.id, group: c.group, kind, role, role_ko: roleKo, name: c.name, name_en: n.en, summary_ko: n.ko, level: lv, grade: gradeOf(c), starter: !!(D.STARTER[c.group] && D.STARTER[c.group][c.id]), duration_sec: duration, classification: "card_sfx", output_file: `${c.id}_${role}.wav`, prompt: promptText });
  }
}

const prompt = it => {
  const music = !!it.music;
  const duration = `${it.len} seconds`;
  const style = music
    ? "Create a short instrumental fantasy game stinger, not a looping song. No voices."
    : "Create one isolated fantasy game sound effect. No music, speech, or ambience.";
  return `${style} ${clean(it.desc)}. Duration: about ${duration}. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.`;
};

const byGroup = common.groups.map(g => ({ ...g, items: g.items.map(it => ({
  id: it.id, when: it.when, now: it.now || "", duration_sec: it.len,
  classification: it.music ? "game_stinger" : "game_sfx",
  prompt: prompt(it)
})) }));
const records = byGroup.flatMap(g => g.items.map(it => JSON.stringify({
  id: it.id, group: g.id, group_ko: g.ko, when: it.when, now: it.now,
  duration_sec: it.duration_sec, classification: it.classification,
  output_file: `${it.id}.wav`, prompt: it.prompt
})));
fs.writeFileSync(path.join(OUT, "game_common.jsonl"), records.join("\n") + "\n");
const cardOut = path.join(OUT, "cards");
fs.mkdirSync(cardOut, { recursive: true });
const cardRecords = cardRows.map(r => JSON.stringify({ ...r, output_file: `cards/${r.output_file}` }));
fs.writeFileSync(path.join(OUT, "cards.jsonl"), cardRecords.join("\n") + "\n");
for (const f of FLAGS) {
  const cards = cardRows.filter(r => r.group === f);
  let cardMd = `# ${f} ${D.GROUPS[f].name} — GPT 오디오 모델 카드 효과음\n\n`;
  cardMd += `> 분류: **오디오 모델 버전 · 카드 효과음** · ${cards.length}개. 카드마다 유닛 공격·방어, 마법 발동, 아이템 장착음을 개별 생성한다.\n`;
  cardMd += `> 결과 저장 경로: \`audio/inbox/sfx/audio_model/cards/<카드ID>_<역할>.wav\` · 예: \`B1-02_atk.wav\`.\n`;
  cardMd += `> 이름 · 깃발 · 레벨 · 등급 · 소리 지시는 현재 게임 데이터와 \`tools/sfx/notes/${f}.json\`에서 읽는다.\n\n`;
  for (const r of cards) {
    cardMd += `### \`${r.id}\` ${r.name} (${r.name_en}) — ${r.role_ko}${r.starter ? " · ★기본 덱" : ""}\n`;
    cardMd += `Lv${r.level} · ${r.grade} · 약 ${r.duration_sec}s · 파일 \`audio/inbox/sfx/audio_model/cards/${r.output_file}\`\n\n\`\`\`text\n${r.prompt}\n\`\`\`\n\n`;
  }
  fs.writeFileSync(path.join(cardOut, `${f}.md`), cardMd);
}

let md = `# ETHERION 게임 효과음 — GPT 오디오 모델 버전\n\n`;
md += `> 분류: **오디오 모델 버전** · ${rows.length}개 게임 공용 사운드. 카드별 공격·방어·마법 발동·아이템 장착 사운드는 포함하지 않는다.\n`;
md += `> 원본은 \`tools/sfx/sfx_common.json\`, 생성기는 \`tools/sfx/build_audio_model_prompts.js\`. 각 프롬프트를 GPT 오디오 모델에 하나씩 넣고 결과를 \`audio/inbox/sfx/audio_model/<키>.wav\`로 저장한다.\n`;
md += `> 프롬프트 언어는 생성 모델의 지시 이해를 위해 영어로 유지했다. 길이는 원본 목록의 항목별 값이다.\n\n`;
for (const g of byGroup) {
  md += `## ${g.ko} (${g.items.length})\n\n`;
  for (const it of g.items) {
    md += `### \`${it.id}\` — ${it.when}\n`;
    md += `분류: ${it.classification === "game_stinger" ? "짧은 게임 음악 스팅어" : "게임 효과음"} · 약 ${it.duration_sec}초 · 파일 \`audio/inbox/sfx/audio_model/${it.id}.wav\`\n\n`;
    md += `\`\`\`text\n${it.prompt}\n\`\`\`\n\n`;
  }
}
md += `## 카드 효과음\n\n`;
md += `카드 효과음은 별도 파일로 분류했다: 카드 ${new Set(cardRows.map(r => r.id)).size}장, 개별 소리 ${cardRows.length}개. 깃발별 프롬프트는 \`cards/<깃발>.md\`, 기계용 목록은 \`cards.jsonl\`이다.\n\n`;
md += `유닛은 공격 · 방어, 마법은 발동, 아이템은 장착으로 저장한다. 출력 폴더는 \`audio/inbox/sfx/audio_model/cards/\`다.\n\n`;
for (const f of FLAGS) md += `- ${f}: [${f}.md](cards/${f}.md)\n`;
fs.writeFileSync(path.join(OUT, "common.md"), md);
console.log(`오디오 모델 공용 게임 사운드 ${rows.length}개 · 카드 소리 ${cardRows.length}개 (${new Set(cardRows.map(r => r.id)).size}장) → ${OUT}`);

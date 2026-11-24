/* ETHERION — 마법 효과음 빠짐 검사 (2026-11-24)
   node tools/sfx/test/spell_sfx.js
   - 덱에 넣을 수 있는 마법(유닛 · 아이템이 아닌 카드, 레거시 제외) 모두 <ID>.cast 가 목록(audio/sfx/index.json · index.js)과 파일(.ogg · .mp3)에 있는가
   - 마법이 맞는 순간 소리 sp_land_<원소>: 마법 연출이 고르는 원소(js/spellfx.js themeOf 와 같은 셈)마다 있는가
   - 연쇄 소리 sp_chain · sp_area · sp_finale, 그리고 코드가 그것들을 부르는가(계략 마법 발동 소리 포함) */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..", "..", "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const order = [...html.matchAll(/<script src="js\/([a-z0-9_]+)\.js/g)].map(m => m[1]);
const DATA = order.slice(order.indexOf("data"), order.indexOf("grades") + 1);
const stub = () => null;
const ctx = { console, navigator: {}, location: { search: "", hash: "" }, localStorage: { getItem: stub, setItem: stub, removeItem: stub },
  document: { getElementById: stub, querySelector: stub, querySelectorAll: () => [], addEventListener: stub, createElement: () => ({ style: {}, setAttribute: stub }), documentElement: { classList: { contains: () => false } } },
  addEventListener: stub, setTimeout, clearTimeout, matchMedia: () => ({ matches: false }) };
ctx.window = ctx; vm.createContext(ctx);
let src = "";
for (const f of DATA) { const p = path.join(ROOT, "js", f + ".js"); if (fs.existsSync(p)) src += fs.readFileSync(p, "utf8") + "\n;\n"; }
src += "this.__o = { CARDS, CARD_LIST, GROUPS: typeof GROUPS !== 'undefined' ? GROUPS : {} };";
vm.runInContext(src, ctx, { filename: "etherion-data" });
const { CARDS, CARD_LIST, GROUPS } = ctx.__o;
const idx = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "audio/sfx/index.json"), "utf8")));
const idxJs = fs.readFileSync(path.join(ROOT, "audio/sfx/index.js"), "utf8");
const has = k => idx.has(k) && idxJs.includes(`"${k}"`) && ["ogg", "mp3"].every(e => fs.existsSync(path.join(ROOT, "audio/sfx", k + "." + e)));
let bad = 0;
const fail = m => { bad++; console.log("✗ " + m); };
const spells = CARD_LIST.filter(c => c.type !== "unit" && c.type !== "item");
const byType = {}, byEl = {};
for (const c of spells) {
  byType[c.type] = (byType[c.type] || 0) + 1;
  if (!has(c.id + ".cast")) fail(`발동 소리 없음: ${c.id} ${c.name} (${c.type})`);
  const el = c.el || (GROUPS[c.group] || {}).el || "dark";
  byEl[el] = (byEl[el] || 0) + 1;
  if (!has("sp_land_" + el)) fail(`맞는 소리 없음: sp_land_${el} (${c.id})`);
}
for (const k of ["sp_chain", "sp_area", "sp_finale", "sp_reveal"]) if (!has(k)) fail("공용 소리 없음: " + k);
// 마법 장면 연출(js/spellscene.js)의 장면 소리 hook("sc_…") — 부르는 열쇠마다 파일이 있는가
const scKeys = [...new Set([...fs.readFileSync(path.join(ROOT, "js/spellscene.js"), "utf8").matchAll(/hook\("(sc_[a-z]+)"/g)].map(m => m[1]))];
for (const k of scKeys) if (!has(k)) fail("장면 소리 없음: " + k);
console.log(`장면 소리 ${scKeys.length}개`);
// 레거시 목록에 남아 있지만 다시 살릴 마법(tools/sfx/synth2/dump_cards.js MAKE_RETIRED)도 소리를 미리 갖춘다
for (const id of ["SG3-07", "SG3-08"]) if (!has(id + ".cast")) fail(`다시 살릴 마법의 발동 소리 없음: ${id}`);
const code = f => fs.readFileSync(path.join(ROOT, "js", f), "utf8");
const g = code("game.js"), sf = code("spellfx.js"), fe = code("feel.js");
if (!/function castHand[\s\S]{0,1200}FEEL\.card\(c\.id, "cast"/.test(g)) fail("계략 마법(castHand)이 발동 소리를 내지 않는다");
if (!/SpellFX\.reveal\(fx\.reveal, dur, fx\.chain\)/.test(g)) fail("연쇄 차례(fx.chain)가 SpellFX.reveal 로 가지 않는다");
if (!/FEEL\.spellFinale/.test(g)) fail("연쇄 마무리(spellFinale)를 부르지 않는다");
if (!/sp_land_/.test(sf) || !/sp_area/.test(sf)) fail("spellfx.js 가 맞는 순간 소리를 내지 않는다");
if (!/SND_CAST/.test(fe)) fail("feel.js SND_CAST(새 .cast 파일 캐시 깨기) 없음");
console.log(`마법 ${spells.length}장 (${Object.entries(byType).map(([k, v]) => k + " " + v).join(" · ")}) · 원소 ${Object.keys(byEl).length}가지 (${Object.entries(byEl).map(([k, v]) => k + " " + v).join(" · ")})`);
console.log(bad ? `실패 ${bad}개` : "모든 마법에 발동 · 맞는 · 연쇄 소리가 있다 ✓");
process.exit(bad ? 1 : 0);

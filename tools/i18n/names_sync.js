/* ETHERION i18n — 화면 글 속 카드 이름 맞추기: node tools/i18n/names_sync.js [--fix]
   화면 글(ui.<말>.js) 열쇠에 「카드 이름」 · [카드 이름] 꼴로 카드 이름이 들었는데 번역 쪽 같은 자리(n번째 「」 · [])가
   카드 번역(cards.<말>.js)의 이름과 다르면 알린다. --fix: 괄호 수가 같으면 그 자리를 카드 번역 이름으로 바꾼다. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..", "..");
const { liveCards } = require("./cards_src.js");
const { out: live } = liveCards();
const loadJs = (f, name) => { const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(ROOT, f), "utf8") + `;this.__=${name}`, ctx); return ctx.__; };
const byName = new Map(); for (const [id, e] of Object.entries(live)) if (!byName.has(e.n)) byName.set(e.n, id);
const fix = process.argv.includes("--fix");
const RE = /「([^」]+)」|\[([^\]]+)\]/g;
for (const l of ["en", "ja", "zh"]) {
  const U = loadJs(`js/i18n/ui.${l}.js`, "I18N_UI"), C = loadJs(`js/i18n/cards.${l}.js`, "I18N_CARDS");
  let n = 0, fixed = 0;
  for (const [k, v] of Object.entries(U)) {
    const ks = [...k.matchAll(RE)], vs = [...v.matchAll(RE)];
    if (!ks.some(m => byName.has(m[1] || m[2]))) continue;
    if (ks.length !== vs.length) { n++; continue; }
    let w = v, shift = 0;
    ks.forEach((m, i) => {
      const id = byName.get(m[1] || m[2]); if (!id) return;
      const want = C[id] && C[id].n; const vm_ = vs[i], got = vm_[1] || vm_[2];
      if (!want || got === want) return;
      n++;
      if (fix) { const open = vm_[0][0], close = vm_[0].slice(-1); const rep = open + want + close; const at = vm_.index + shift; w = w.slice(0, at) + rep + w.slice(at + vm_[0].length); shift += rep.length - vm_[0].length; fixed++; }
    });
    if (w !== v) U[k] = w;
  }
  if (fix && fixed) {
    const src = fs.readFileSync(path.join(ROOT, `js/i18n/ui.${l}.js`), "utf8"), head = src.slice(0, src.indexOf("const I18N_UI = {"));
    fs.writeFileSync(path.join(ROOT, `js/i18n/ui.${l}.js`), head + "const I18N_UI = {\n" + Object.entries(U).map(([a, b]) => `${JSON.stringify(a)}: ${JSON.stringify(b)}`).join(",\n") + "\n};\n");
  }
  console.log(`[${l}] 카드 이름이 다른 자리 ${n}개${fix ? ` · 고침 ${fixed}` : ""}`);
}

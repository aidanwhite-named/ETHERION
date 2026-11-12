/* v3.38 js/wording.js가 바꾼 카드 글을 모두 보인다: node tools/wording_check.js [--brief] */
const { load } = require("../server/rules.js");
const R = load(), vm = require("vm");
const W = vm.runInContext("WORDING", R.ctx), brief = process.argv.includes("--brief");
for (const [id, a, b] of W.changed) { if (!brief && id.includes("(핸드)")) continue; console.log(`${id}\n  전: ${a}\n  후: ${b}`); }
console.log(`\n바뀐 글 ${W.changed.length}개`);

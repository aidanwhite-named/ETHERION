// v3.72 번개 노움 시험 — 화면 없이. node tools/gnome/test.js
// 대표 능력 [증폭]: 공격 · 공용 · 방어 마법 피해에 붙고 핸드 마법엔 안 붙는다 · 노움에 [방어무시]가 남지 않았다(엘프 것).
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ctx.ok = ok;
ctx.ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); if (isUnit(it)) resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f }; }
/* 내 전장 [ally..., 마법], 상대 전장 foe — 마법을 한 번 쓰고 상대가 잃은 체력 합 */
function lost(spell, ally, foe, seed) {
  const sp = mk(spell), P = [side(0, ally.concat([sp])), side(1, foe)];
  const X = ctx(P, 0, 2, [], { seed: seed || 7 });
  const before = P[1].field.filter(u => u && isUnit(u)).reduce((s, u) => s + hpLeft(u), 0);
  castSpell(X, 0, sp, ally.length + 1); resetRng();
  const after = P[1].field.filter(u => u && isUnit(u)).reduce((s, u) => s + Math.max(0, hpLeft(u)), 0);
  return before - after;
}`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };

// 카드
T('방어무시 없음', `
  const B3 = CARD_LIST.filter(c => c.g === "B3" && (c.type === "unit" || c.type === "item"));
  const left = B3.filter(c => (c.gift && c.gift.magic) || (c.item && c.item.magic)).map(c => c.id);
  ok(!left.length, "노움 유닛 · 아이템에 [방어무시]가 없다: " + left.join(","));
  ok(abilRaw(mk("PN-B3-U1")).amp === 1 && abilRaw(mk("SP-B3")).amp === 2 && abilRaw(mk("EP-B3-2")).chain, "증폭으로 바뀐 유닛");
  ok(gradeOf("B3-04") === "common" && gradeOf("B3-33") === "common" && CARDS["B3-33"].a === 8, "스탯으로 돌린 유닛은 일반");
  ok(/공용/.test(ITEM_KW["증폭"]) && /상대 유닛에게 주는 피해/.test(CARDS["B3-29"].gift.evText), "증폭 글");
`);
// 규칙: 증폭 1 유닛이 있으면 맞는 유닛마다 +1 (같은 씨앗끼리 견줌)
T('증폭 범위', `
  const foe = () => ["B3-23", "B3-23", "B3-23"];   // 3/0/8 셋
  const d = id => lost(id, ["B3-29"], foe()) - lost(id, ["B3-02"], foe());
  ok(CARDS["SB3-01"].type === "atk" && d("SB3-01") === 3, "공격 마법(정전기, 뒤 3칸) +1 × 3: " + d("SB3-01"));
  ok(CARDS["SB3-06"].type === "any" && d("SB3-06") === 3, "공용 마법(뇌운 소환, 전체) +1 × 3: " + d("SB3-06"));
  ok(CARDS["SB3-04"].type === "def" && d("SB3-04") === 3, "방어 마법(전격 장막, 뒤 3칸) +1 × 3: " + d("SB3-04"));
  ok(ampKind(CARDS["HB3-1"]) === false, "핸드 마법은 증폭 없음");
  ok(lost("SB3-06", ["B3-29", "B3-34"], foe()) - lost("SB3-06", ["B3-02", "B3-02"], foe()) === 9, "증폭 1 + 2 = 맞는 유닛마다 +3");
`);
console.log(fail ? `노움 시험 ${n - fail}/${n} 통과 — ${fail} 실패` : `노움 시험 ${n}개 모두 통과`);
process.exit(fail ? 1 : 0);

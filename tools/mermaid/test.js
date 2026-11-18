// v3.68 푸른비늘 인어 시험 — 화면 없이. node tools/mermaid/test.js
// [마력 공격 N] · [치유 N] · 오라 [바다의 보호] · 환상 마법(물빛 신기루 · 환각의 통제 · 뒤바뀐 물길 · 씻김의 노래)을 전장을 직접 만들어 본다.
const fs = require('fs'), path = require('path'); const { load } = require('../balance/harness');
const dir = path.join(__dirname, '../../js'); const rd = f => fs.readFileSync(path.join(dir, f), 'utf8');
const ctx = load(dir, 'var localStorage = { getItem() { return null; }, setItem() {} };\n' + ['grades.js', 'store.js', 'economy.js'].map(rd).join('\n'));
let fail = 0, n = 0; const ok = (c, m) => { n++; if (!c) { fail++; console.log('  ✗ ' + m); } };
ctx.ok = ok;
ctx.ev(`var UIDN = 1000;
function mk(id, o) { const it = Object.assign({ uid: ++UIDN, id, item: null, summoned: 0 }, o || {}); if (isUnit(it)) resetTurn(it); return it; }
function side(idx, ids) { const f = ids.map(x => x ? (typeof x === "string" ? mk(x) : x) : null); while (f.length < RULES.slots) f.push(null); return { idx, name: "P" + idx, life: 30, crystals: [], burn: [], reload: 0, bonus: 0, field: f }; }
function fight(P, att, turn, seed) { const X = ctx(P, att, turn || 2, [], { seed: seed || 7 }); runCombatCore(X); resetRng(); return X; }
function logs(X) { return X.rec.flatMap(s => s.logs.map(l => l[0])).join("\\n"); }
function setT(u, a, d, h) { u.t.a = a; u.t.d = d; u.t.h = h; u.t.dmg = 0; return u; }`);
const T = (name, code) => { try { ctx.ev('{' + code + '}'); } catch (e) { fail++; n++; console.log('  ✗ ' + name + ' 오류: ' + e.message); } };

// 카드 · 글
ok(ctx.ev('CARDS["G3-01"].gift.arcane === 1 && !CARDS["G3-01"].gift.magic'), '인어 유닛: 옛 마력 공격 → 새 마력 공격');
ok(ctx.ev('CARDS["G3-19"].gift.arcane === 1 && CARDS["G3-32"].gift.arcane === 3 && CARDS["PN-G3-C3"].gift.arcane === 2'), 'v3.78 핵심 유닛 마력 공격 2~3');
ok(ctx.ev('CARDS["A3-01"].gift.magic === 1 && !CARDS["A3-01"].gift.arcane'), '엘프 유닛: 방어무시(magic) 그대로');   // v3.72 노움은 방어무시를 걷었다(js/gnome.js)
ok(ctx.ev('CARDS["PN-G3-R"].gift.calm === 1 && !CARDS["PN-G3-R"].gift.ward'), '레어: [바다의 보호 1]');
ok(ctx.ev('CARDS["IG3-2"].item.evName === "생명 +3"'), '장착 생명: [생명 +3]');
ok(ctx.ev('gradeOf("SG3-01") === "rare" && CARDS["SG3-01"].lv === 3 && gradeOf("SG3-02") === "uncommon" && gradeOf("CS-G3") === "uncommon"'), '마법 등급 · 레벨');
ok(ctx.ev('["SG3-01","SG3-02","MC-03","CS-G3"].every(id => CARDS[id].name.replace(/\\s/g, "").length <= 6)'), '마법 이름 6글자 이하');

// 마력 공격: 공 4 → 방 3 = 7 (N ≥ 3). v3.95(사용자) 반격에는 없다
T('마력 공격', `const a = setT(mk("G3-19"), 4, 0, 20); a.t.gx = null; CARDS["G3-19"].gift.arcane = 3;
  const d = setT(mk("B2-01"), 0, 3, 7); const X = fight([side(0, [a]), side(1, [d])], 0);
  CARDS["G3-19"].gift.arcane = 1; ok(!d.t.alive || d.t.dmg === 7, "공 4 · 방 3 · 마력 공격 3 → 피해 7 (" + d.t.dmg + ")");
  const a2 = setT(mk("B1-01"), 3, 2, 20), d2 = setT(mk("G3-19"), 4, 0, 20); const X2 = fight([side(0, [a2]), side(1, [d2])], 0);
  ok(a2.t.dmg === 4 - 2, "v3.95 반격엔 마력 공격 없음: 공 4 · 방 2 → 2 (" + a2.t.dmg + ")");`);
// 치유: 맞붙음에서 살아남으면 +2, 수비 쪽이 여러 번
T('치유', `const d = setT(mk("PN-G3-E"), 0, 0, 10); const a1 = setT(mk("B1-01"), 3, 0, 9), a2 = setT(mk("B1-01"), 3, 0, 9);
  const X = fight([side(0, [a1, a2]), side(1, [d])], 0); const got = [...logs(X).matchAll(/→ 우르보아 비늘 기사.방 0.: 피해 ([0-9]+)/g)].reduce((s, m) => s + +m[1], 0);
  ok(d.t.alive && got > 0 && d.t.dmg === got - 4, "두 번 맞고(" + got + ") 두 번 치유(2+2) → 피해 " + d.t.dmg);
  ok(/\\[치유\\]/.test(logs(X)), "치유 로그");`);
// 오라: 양옆 1칸(마법 칸은 세지 않음), 2칸 밖은 아님
T('바다의 보호', `const u1 = setT(mk("G3-01"), 0, 0, 10), r = setT(mk("PN-G3-R"), 0, 0, 10), u2 = setT(mk("G3-08"), 0, 0, 10), u3 = setT(mk("G3-03"), 0, 0, 10);
  const P = [side(0, ["NG3-1"]), side(1, [u1, "SG3-03", r, u2, u3])]; P[1].field[1] = null; P[1].field = [u1, mk("SG3-09"), r, u2, u3, null, null];
  const X = fight(P, 0); ok(u1.t.dmg === 2 && u2.t.dmg === 2 && u3.t.dmg === 3 && r.t.dmg === 3, "거센 파도 3: 양옆 2 · 2칸 밖 3 · 레어 자신 3 (" + [u1.t.dmg, u2.t.dmg, u3.t.dmg, r.t.dmg] + ")");`);
// 물빛 신기루: 무작위 2기 공 ↔ 체
T('물빛 신기루', `const fs = [0, 1, 2].map(i => setT(mk("B1-0" + (i + 1)), 2 + i, 0, 9)); const X = fight([side(0, ["SG3-02"]), side(1, fs)], 0);
  ok(fs.filter(u => u.t.a === 9 || u.t.h <= 4).length >= 2 && /공체 교환/.test(X.rec.flatMap(s => s.floats.map(f => f[1])).join(" ")), "무작위 2기 공체 교환");`);
// 환각의 통제: 뒤 카드 글자 수가 같으면 빼앗아 판 끝까지
T('환각의 통제', `const bk = mk("G3-01"); const n = CARDS["G3-01"].name.replace(/\\s/g, "").length;
  const same = Object.values(CARDS).find(c => c.type === "unit" && c.g !== "G3" && !c.special && c.name.replace(/\\s/g, "").length === n);
  const other = Object.values(CARDS).find(c => c.type === "unit" && c.name.replace(/\\s/g, "").length !== n);
  const o1 = mk(other.id), o2 = mk(same.id); const P = [side(0, ["SG3-01", bk]), side(1, [o1, o2])];
  const X = fight(P, 1); ok(P[0].field.includes(o2) && !P[1].field.includes(o2) && !o2.tokTemp, "같은 글자 수(" + n + ") 상대 유닛을 빼앗아 판 끝까지");
  const P2 = [side(0, ["SG3-01"]), side(1, [mk(same.id)])]; const X2 = fight(P2, 1); ok(/뒤에 카드가 없어/.test(logs(X2)), "뒤에 카드 없으면 헛것");`);
T('환각의 통제 마법', `const bk = mk("G3-01"); const n = CARDS["G3-01"].name.replace(/\\s/g, "").length;
  const sp = Object.values(CARDS).find(c => c.type === "def" && c.g !== "G3" && c.name.replace(/\\s/g, "").length === n && c.ops.every(o => o.op === "mod" || o.op === "dmg"));
  if (sp) { const s = mk(sp.id); const P = [side(0, ["SG3-01", bk]), side(1, [mk("B1-01"), s])]; const X = fight(P, 0);
    ok(P[1].burn.includes(sp.id) && new RegExp("P0: " + sp.name + " 발동").test(logs(X)), "마법도 빼앗아 내 마법으로 발동 (" + sp.name + ")"); } else ok(true, "");`);
// 뒤바뀐 물길: 방+체 높은 순
T('뒤바뀐 물길', `const a = setT(mk("B1-01"), 5, 0, 2), b = setT(mk("B1-02"), 1, 3, 8), c = setT(mk("B1-03"), 2, 1, 4);
  const P = [side(0, ["MC-03"]), side(1, [a, b, c])]; fight(P, 1);
  const L = P[1].field.filter(u => u && isUnit(u)); ok(L[0] === b && L[1] === c && L[2] === a, "방+체 순: " + L.map(u => u.t.d + hpLeft(u)));`);
// 씻김의 노래: 무효로 했을 때만 전체 해제 · 공격 −1
T('씻김의 노래', `const d1 = mk("A2-01"), d2 = mk("A2-01"); d1.t.shield = true; d2.t.shield = true; const a0 = d2.t.a;
  const P = [side(0, ["CS-G3", "A1-30"]), side(1, ["SB1-03", d1, d2])]; const X = fight(P, 0, 2);
  ok(/불의 장막.*무효/.test(logs(X)) && !d2.t.shield && d2.t.a === a0 - 1, "무효 → 상대 전체 해제 · 공격 −1");
  const e = mk("A2-01"); e.t.shield = true; const e0 = e.t.a; const P2 = [side(0, ["CS-G3", "A1-30"]), side(1, ["B1-01", e])]; fight(P2, 0, 2);
  ok(e.t.a === e0, "무효로 할 마법이 없으면 디버프 없음");`);

// v3.78 [홀림]: 코인 뒷면 마법에 걸린 상대에게 마력 공격은 방어 전부
T('홀림 · 코인 뒷면', `const a = setT(mk("G3-19"), 4, 0, 20), d = setT(mk("B2-01"), 0, 5, 30);
  const X = fight([side(0, ["MG-07", a]), side(1, [d])], 0);
  ok(/\\[마력 공격 \\+5 · 홀림\\]/.test(logs(X)), "홀린 방 5 상대 → 마력 공격 +5");
  const a2 = setT(mk("G3-19"), 4, 0, 20), d2 = setT(mk("B2-01"), 0, 5, 30);
  const X2 = fight([side(0, [a2]), side(1, [d2])], 0); ok(/\\[마력 공격 \\+1\\]/.test(logs(X2)), "홀리지 않으면 +1(마력 공격 1)까지");
  ok(/\\[홀림\\]/.test(CARDS["MG-07"].text) && /\\[홀림\\]/.test(CARDS["NG3-2"].text), "코인 뒷면 · 자리 바꿈 마법 글에 [홀림]");`);
// 뒤집힌 물거울: 상대 앞 2기 공 ↔ 방, 홀림 → 마력 공격이 바뀐 방어를 피해로
T('뒤집힌 물거울', `const a = setT(mk("G3-19"), 4, 0, 30), e1 = setT(mk("B1-01"), 5, 1, 30), e2 = setT(mk("B1-02"), 3, 0, 30), e3 = setT(mk("B1-03"), 2, 0, 30);
  const X = fight([side(0, ["MG-11", a]), side(1, [e1, e2, e3])], 0);
  ok(e1.t.charm && e2.t.charm && !e3.t.charm && e2.t.d === 3 && e2.t.a === 0, "앞 2기 공방 교환 · 홀림 (" + [e1.t.a, e1.t.d, e2.t.a, e2.t.d] + ")");
  ok(/\\[마력 공격 \\+5 · 홀림\\]/.test(logs(X)), "바뀐 방어 5가 마력 공격 피해로");`);
// 뒤바뀐 물길: 자리가 바뀐 유닛만 홀림
T('뒤바뀐 물길 홀림', `const a = setT(mk("B1-01"), 1, 3, 8), b = setT(mk("B1-02"), 5, 0, 2), c = setT(mk("B1-03"), 2, 1, 4);
  const P = [side(0, ["MC-03"]), side(1, [a, b, c])]; fight(P, 1);
  ok(!a.t.charm && b.t.charm && c.t.charm, "제자리 유닛은 홀리지 않음");`);
// 치유를 걸어 주는 마법
T('샘물 한 모금', `const d = setT(mk("G3-03"), 0, 0, 30), a1 = setT(mk("B1-01"), 3, 0, 9), a2 = setT(mk("B1-02"), 3, 0, 9);
  const X = fight([side(0, [a1, a2]), side(1, ["MG-03", d])], 0);
  ok(abilOf(d).heal === 2 && /\\[치유\\] 인어 소년/.test(logs(X)), "맨 앞 유닛 이번 턴 [치유 2]");`);
T('치유의 조수', `const u1 = setT(mk("G3-03"), 0, 0, 30), u2 = setT(mk("G3-04"), 0, 0, 30);
  const X = fight([side(0, [mk("B1-01")]), side(1, ["MG-15", u1, u2])], 0);
  ok(abilOf(u1).heal === 1 && abilOf(u2).heal === 1, "아군 전체 [치유 1]");`);

// v3.79 · v3.89 인어 마법은 생명을 주지 않는다 · 대해류 L3 · 대해일 L4 장전 없음
ok(ctx.ev('Object.values(CARDS).filter(c => c.type !== "unit" && c.type !== "item" && (c.g === "G3" || /G3/.test(c.id))).every(c => !(c.gain && c.gain.life) && !/내 생명 \\+/.test(c.text || ""))'), '인어 마법에 생명 회복 없음');
ok(ctx.ev('CARDS["SG3-09"].lv === 3 && CARDS["RG3-1"].lv === 4 && !(CARDS["RG3-1"].cost || {}).ether && !/장전/.test(CARDS["RG3-1"].text)'), '대해류 L3 · 대해일 L4 · 장전 없음');
// v3.89 물의 몸: 인어 유닛은 화상 −1
T('물의 몸', `const m = mk("G3-03"), m2 = mk("G3-04"), o = mk("B1-02"); const X = ctx([side(0, [m, m2]), side(1, [o])], 0, 2, [], { seed: 3 });
  gbScorch(X, m, 2); gbScorch(X, m2, 1); gbScorch(X, o, 2);
  ok(m.t.keep.scorch === 1 && !(m2.t.keep.scorch > 0) && o.t.keep.scorch === 2, "화상 2 → 1 · 화상 1 → 안 붙음 · 다른 깃발 2 (" + [m.t.keep.scorch, m2.t.keep.scorch, o.t.keep.scorch] + ")");`);
// v3.89 마법 [정화]: 지금 붙은 화상 · 낙인을 지우고 이번 턴 정화
T('마법 정화', `const u = mk("G3-03"), v = mk("G3-04"); const X = ctx([side(0, [u, v]), side(1, [mk("B1-02")])], 0, 2, [], { seed: 3 });
  u.t.keep.scorch = 3; u.t.keep.scorchT = 1; v.t.keep.brand = true;
  SPELL_OPS.mrPurge(X, 0, mk("MG-07"), null, { area: { t: "all" } });
  ok(!(u.t.keep.scorch > 0) && !v.t.keep.brand && abilOf(u).purify && abilOf(v).purify, "화상 · 낙인 지움 · 이번 턴 [정화]");`);
// v3.95 물의 장막(SG3-03): [보호막] 없이 이번 턴 맨 앞 2기 받는 피해 −1 · 맨 앞 1기 [정화]
ok(ctx.ev('CARDS["SG3-03"].name === "물의 장막" && !CARDS["SG3-03"].ops.some(o => o.op === "shield" || o.op === "mod") && CARDS["SG3-03"].ops.some(o => o.op === "mrVeil" && o.area.n === 2) && CARDS["SG3-03"].ops.some(o => o.op === "mrPurge" && o.area.n === 1) && !/보호막|생명/.test(CARDS["SG3-03"].text)'), 'v3.95 물의 장막: 보호막 · 공격 −2 없음, 앞 2기 피해 −1 · 앞 1기 정화');
ok(ctx.ev('CARDS["RS-G3-2"].ops.some(o => o.op === "shield")'), '포말 장막은 [보호막] 그대로');
T('물의 장막', `const u1 = setT(mk("G3-03"), 0, 0, 10), u2 = setT(mk("G3-04"), 0, 0, 10), u3 = setT(mk("G3-08"), 0, 0, 10);
  const X = ctx([side(0, [u1, u2, u3]), side(1, [mk("B1-02")])], 0, 2, [], { seed: 3 });
  u1.t.keep.scorch = 2; u1.t.keep.scorchT = 1;
  for (const o of CARDS["SG3-03"].ops) SPELL_OPS[o.op](X, 0, mk("SG3-03"), null, o);
  hurt(X, u1, 3); hurt(X, u2, 3); hurt(X, u3, 3);
  ok(u1.t.dmg === 2 && u2.t.dmg === 2 && u3.t.dmg === 3, "앞 2기 피해 3 → 2 · 셋째 3 (" + [u1.t.dmg, u2.t.dmg, u3.t.dmg] + ")");
  ok(!(u1.t.keep.scorch > 0) && abilOf(u1).purify && !abilOf(u2).purify, "맨 앞 1기만 [정화]");
  ok(!abilOf(u1).calm, "오라가 아니라 옆으로 번지지 않음");
  resetTurn(u1); ok(!u1.t.calmT, "다음 턴엔 사라짐");`);
T('대해일 치유',`const u = setT(mk("G3-33"), 0, 0, 30); const X = fight([side(0, [mk("B1-02")]), side(1, ["RG3-1", u])], 0);
  ok(abilOf(u).heal === 1, "대해일 뒤 아군 [치유 1]");`);

console.log(fail ? `✗ ${fail}/${n} 실패` : `✓ ${n}개 모두 통과`);
process.exitCode = fail ? 1 : 0;

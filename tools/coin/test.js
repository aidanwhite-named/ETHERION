// 코인 다시 굴리기: 손해인 면에서만 묻는다 (js/game.js coinSwap · coinNeg · coinBad)
// 2026-11-22 맞바꿈 코인(한 동전에 + · − 가 함께)은 공격할 때는 공격 몫, 방어할 때는 방어 · 체력 몫의 부호로 손해를 가린다
const fs = require('fs'), path = require('path');
const { load } = require('../balance/harness.js');
const dir = path.join(__dirname, '../../js');
const H = load(dir);
const src = fs.readFileSync(path.join(dir, 'game.js'), 'utf8');
const grab = name => { const m = src.match(new RegExp('^function ' + name + '\\(.*$', 'm')); if (!m) throw new Error('missing ' + name); return m[0]; };
H.ev(['coinSwap', 'coinNeg', 'coinBad'].map(grab).join('\n') + `
  this.T = { coinSwap, coinNeg, coinBad };`);
const { coinSwap, coinBad } = H.T;
// game.js decide()의 tails와 같은 셈 (who: "a" 공격하는 유닛 · "d" 방어하는 유닛)
const offered = (groups, who) => groups.map((o, i) => (coinBad(o, who) && o.p > 0 && o.p < 1 ? i : -1)).filter(i => i >= 0);
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m); } };
const G = (heads, parts, p = 0.5) => ({ g: 0, heads, p, parts });
const asks = (parts, who, heads) => offered([G(heads, parts)], who).length === 1;
// 순수 + · − 동전: 차례와 상관없이 + 동전은 뒷면, − 동전은 앞면에서만 묻는다 (예전 그대로)
for (const who of ['a', 'd']) {
  ok(!asks([{ st: 'a', v: 2 }], who, true) && asks([{ st: 'a', v: 2 }], who, false), 'pure + ' + who);
  ok(asks([{ st: 'h', v: -2 }], who, true) && !asks([{ st: 'h', v: -2 }], who, false), 'pure - ' + who);
}
// 맞바꿈 코인: [이름, 묶인 값, 공격할 때 묻는 면, 방어할 때 묻는 면] (true = 앞면에서 묻는다)
const SWAPS = [
  ['드워프 방 +1 · 공 −1', [{ st: 'd', v: 1 }, { st: 'a', v: -1 }], true, false],
  ['트롤 체 +2 · 공 −1', [{ st: 'h', v: 2 }, { st: 'a', v: -1 }], true, false],
  ['고블린 공 +2 · 체 −1', [{ st: 'a', v: 2 }, { st: 'h', v: -1 }], false, true],
  ['마족 공 +2 · 체 −2', [{ st: 'a', v: 2 }, { st: 'h', v: -2 }], false, true],
  ['인어 방 +2 · 체 −1 (공격 몫 없음 → 합 +)', [{ st: 'd', v: 2 }, { st: 'h', v: -1 }], false, false],
  ['방 +1 · 체 −1 (방어 몫 0 → 합 0 = + 동전처럼)', [{ st: 'd', v: 1 }, { st: 'h', v: -1 }], false, false],
];
for (const [name, parts, atkHeads, defHeads] of SWAPS) {
  ok(asks(parts, 'a', atkHeads) && !asks(parts, 'a', !atkHeads), name + ' — 공격 차례');
  ok(asks(parts, 'd', defHeads) && !asks(parts, 'd', !defHeads), name + ' — 방어 차례');
}
// 카드에 + 동전과 − 동전이 따로 있으면 동전마다 따로 본다 (이득인 면이 나온 동전은 묻지 않는다)
const sep = (h0, h1) => [G(h0, [{ st: 'a', v: 2 }]), Object.assign(G(h1, [{ st: 'd', v: -1 }]), { g: 1 })];
ok(offered(sep(true, false), 'a').length === 0, 'separate coins, both good');
ok(offered(sep(false, true), 'd').join() === '0,1', 'separate coins, both bad');
// 맞바꿈 동전 옆의 순수 동전: 공방 수호 골렘 꼴(방 +1 · 공 −1 / 공 +2 · 방 +1), 모두 앞면 → 공격 차례에는 맞바꿈 동전만
const golem = [G(true, [{ st: 'd', v: 1 }, { st: 'a', v: -1 }]), Object.assign(G(true, [{ st: 'a', v: 2 }, { st: 'd', v: 1 }]), { g: 1 })];
ok(offered(golem, 'a').join() === '0' && offered(golem, 'd').length === 0, 'swap coin next to pure coin');
// 확률 0 · 100% 동전은 여전히 뺀다
ok(offered([G(true, [{ st: 'd', v: 1 }, { st: 'a', v: -1 }], 1)], 'a').length === 0, 'fixed p');
// 실제 카드: 맞바꿈 동전마다 차례별로 꼭 한 면에서만 묻는다
const ids = H.ev('Object.keys(CARDS).filter(id => CARDS[id].co && CARDS[id].co.length)');
const groupsOf = (id, heads) => { const defs = H.ev(`coinDefs({ uid: 1, id: ${JSON.stringify(id)} })`).map(k => Object.assign(k, { heads, p: 0.5 })); return H.coinGroups ? H.coinGroups(defs) : H.ev('coinGroups')(defs); };
const face = (id, who) => { const hs = offered(groupsOf(id, true), who), ts = offered(groupsOf(id, false), who); return groupsOf(id, true).map((o, i) => (coinSwap(o) ? (hs.includes(i) === ts.includes(i) ? '!' : hs.includes(i) ? '앞' : '뒤') : '')).join(''); };
const rows = [];
for (const id of ids) {
  if (!groupsOf(id, true).some(coinSwap)) continue;
  const a = face(id, 'a'), d = face(id, 'd');
  ok(a.length === 1 && d.length === 1 && a !== '!' && d !== '!', 'card ' + id);
  rows.push(`${id} ${H.ev(`CARDS[${JSON.stringify(id)}].name`)}: 공격 ${a} · 방어 ${d}`);
}
// 강철 대장장이(방 +1 · 공 −1): 공격할 때는 앞면, 방어할 때는 뒷면에서 묻는다
ok(face('B2-15', 'a') === '앞' && face('B2-15', 'd') === '뒤', '강철 대장장이');
ok(rows.length >= 16, 'swap-coin cards ' + rows.length);
console.log('맞바꿈 코인 카드 ' + rows.length + '장 (다시 굴리기를 묻는 면)\n  ' + rows.join('\n  '));
console.log(fail ? `FAIL ${fail}` : 'ok — coin reflip');
process.exit(fail ? 1 : 0);

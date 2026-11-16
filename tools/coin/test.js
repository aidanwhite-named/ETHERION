// 2026-11-16 + · − 코인이 함께 붙은 카드는 면과 상관없이 다시 굴리기를 묻는다 (js/game.js coinMixed · coinBadFor)
const fs = require('fs'), path = require('path');
const { load } = require('../balance/harness.js');
const dir = path.join(__dirname, '../../js');
const H = load(dir);
const src = fs.readFileSync(path.join(dir, 'game.js'), 'utf8');
const grab = name => { const m = src.match(new RegExp('^function ' + name + '\\(.*$', 'm')); if (!m) throw new Error('missing ' + name); return m[0]; };
H.ev(['coinNeg', 'coinBad', 'coinMixed', 'coinVal', 'coinBadFor'].map(grab).join('\n') + `
  this.T = { coinNeg, coinBad, coinMixed, coinVal, coinBadFor };`);
const { coinMixed, coinBad, coinBadFor } = H.T;
// game.js decide()의 tails와 같은 셈
const offered = groups => { const mixed = coinMixed(groups); return groups.map((o, i) => ((mixed || coinBad(o)) && o.p > 0 && o.p < 1 ? i : -1)).filter(i => i >= 0); };
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m); } };
const G = (heads, parts, p = 0.5) => ({ g: 0, heads, p, parts });
// 순수 + 동전: 앞면이면 묻지 않음, 뒷면이면 묻는다 (예전 그대로)
ok(offered([G(true, [{ st: 'a', v: 2 }])]).length === 0, 'pure + heads');
ok(offered([G(false, [{ st: 'a', v: 2 }])]).length === 1, 'pure + tails');
ok(offered([G(false, [{ st: 'h', v: -2 }])]).length === 0, 'pure - tails');
// 섞인 동전: 어느 면이든 묻는다
ok(offered([G(true, [{ st: 'a', v: 3 }, { st: 'h', v: -2 }])]).length === 1, 'mixed heads');
ok(offered([G(false, [{ st: 'a', v: 3 }, { st: 'h', v: -2 }])]).length === 1, 'mixed tails');
// 카드에 + 동전과 − 동전이 따로 있어도 묻는다
ok(offered([G(true, [{ st: 'a', v: 2 }]), Object.assign(G(false, [{ st: 'd', v: -1 }]), { g: 1 })]).length === 2, 'mixed card, separate coins');
// 확률 0 · 100% 동전은 여전히 빼다
ok(offered([G(true, [{ st: 'a', v: 3 }, { st: 'h', v: -2 }], 1)]).length === 0, 'fixed p');
// 컴퓨터: 공격 +3 · 방어 −3 앞면 → 공격할 때는 이득(안 던짐), 막을 때는 손해(던짐)
const m = G(true, [{ st: 'a', v: 3 }, { st: 'd', v: -3 }]);
ok(!coinBadFor(m, 'a') && coinBadFor(m, 'd'), 'ai mixed by role');
// 실제 카드: 섞인 코인을 가진 카드를 찾아 coinGroups로 확인 (멈추지 않고 돌아야 함)
const ids = H.ev('Object.keys(CARDS).filter(id => CARDS[id].co && CARDS[id].co.length)');
let mixedIds = [];
for (const id of ids) {
  const defs = H.ev(`coinDefs({ uid: 1, id: ${JSON.stringify(id)} })`).map(k => Object.assign(k, { heads: true, p: 0.5 }));
  const gs = H.coinGroups ? H.coinGroups(defs) : H.ev('coinGroups')(defs);
  if (coinMixed(gs)) { mixedIds.push(id); ok(offered(gs).length > 0, 'card ' + id); }
}
console.log('mixed-coin cards:', mixedIds.length, mixedIds.slice(0, 12).join(' '));
console.log(fail ? `FAIL ${fail}` : 'ok — coin reflip');
process.exit(fail ? 1 : 0);

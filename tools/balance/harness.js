// Headless ETHERION: loads the game scripts into one vm context with DOM stubs.
const fs = require('fs'), vm = require('vm'), path = require('path');
function load(dir, extra) {
  const M2 = Object.create(Math); let _s = 1; M2.random = () => { _s ^= _s << 13; _s >>>= 0; _s ^= _s >>> 17; _s ^= _s << 5; _s >>>= 0; return _s / 4294967296; };
  const ctx = { console, Math: M2, JSON, setTimeout: (f)=>0, clearTimeout(){}, Promise, Date, Object, Array, Set, Map, parseInt, parseFloat, isNaN };
  ctx.window = ctx; ctx.document = { querySelector(){return null}, querySelectorAll(){return []}, addEventListener(){} };
  vm.createContext(ctx);
  // v3.18: highcards.js(레어 · 에픽 · 유니크 추가 카드)는 uniques.js 다음. v3.2: uniques.js(유니크 카드)는 specials.js 다음. v2.9: specials.js(스페셜 카드)도 names.js 다음에 읽는다. v1.5: names.js(이름·문구 고침, 소환 규칙으로 바뀐 마법의 동작)도 게임과 같은 순서로 읽는다
  const files = ['data.js'].concat(fs.existsSync(path.join(dir, 'names.js')) ? ['names.js'] : [], fs.existsSync(path.join(dir, 'specials.js')) ? ['specials.js'] : [], fs.existsSync(path.join(dir, 'uniques.js')) ? ['uniques.js'] : [], fs.existsSync(path.join(dir, 'highcards.js')) ? ['highcards.js'] : [], fs.existsSync(path.join(dir, 'decks.js')) ? ['decks.js'] : [], ['cards.js']);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx, { filename: f });
  vm.runInContext(`
    const $=()=>null,$$=()=>[],esc=s=>String(s),wait=()=>Promise.resolve();
    function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
    function pick(a){return a[Math.floor(Math.random()*a.length)];}
    function toast(){} `, ctx);
  vm.runInContext(fs.readFileSync(path.join(dir, 'engine.js'), 'utf8'), ctx, { filename: 'engine.js' });
  let g = fs.readFileSync(path.join(dir, 'game.js'), 'utf8');
  g = g.slice(0, g.indexOf('/* ---------- 화면 ----------'));
  vm.runInContext(g + `
    function render(){} function floatAt(){} function queueCurse(){} function mountBoard(){} function showResult(){}
    async function playHeadless(cfg){ const g=startMatch(Object.assign({mode:"ai",speed:0,headless:true},cfg)); await loop(g); return g; }
    this.playHeadless=playHeadless; this.getG=()=>G;`, ctx, { filename: 'game.js' });
  // v3.13 컴퓨터 '어려움' (js/aihard.js)
  if (fs.existsSync(path.join(dir, 'aihard.js'))) vm.runInContext(fs.readFileSync(path.join(dir, 'aihard.js'), 'utf8'), ctx, { filename: 'aihard.js' });
  if (extra) vm.runInContext(extra, ctx);
  ctx.ev = s => vm.runInContext(s, ctx);
  ctx.seed = v => { _s = (v * 2654435761) >>> 0 || 1; };
  return ctx;
}
module.exports = { load };

/* ETHERION 서버 — 게임의 규칙 파일을 Node 안에서 그대로 돌린다.
   브라우저가 읽는 js 파일(카드 데이터 · Store · 경제 · 교역소 · 레벨)을 vm 문맥 하나에 차례로 읽어 들인다.
   그래서 서버의 덱 검사 · 상점 사고팔기 · 거래 맡김 · 기한 정산은 게임과 **같은 코드**다 — 규칙을 두 번 짜지 않는다.

   읽는 파일은 index.html에서 고른다(게임과 같은 차례):
     ① js/data.js부터 js/economy.js까지 — 카드 데이터 · 이름 고침 · 뺀 카드 · 덱 · 등급 · Store · 경제 (새 데이터 파일을 이 사이에 넣으면 서버도 저절로 읽는다)
     ② EXTRA — 그 뒤에 있지만 Store를 넓히는 규칙 파일(교역소 · 레벨 · 순례 첫 승)
   화면 코드(view · game · screens …)는 읽지 않는다. 규칙 파일이 화면을 부르는 곳(LevelUI 등)은 아래 빈 껍데기가 받는다.
   ② 밖에 Store를 넓히는 새 파일(예: Store.recordMatch를 담은 파일)을 만들면 EXTRA에 넣는다. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const GAME = path.join(__dirname, "..");
const FIRST = "js/data.js", LAST = "js/economy.js";
const EXTRA = ["js/trade.js", "js/level.js", "js/pilgrim-rules.js"];   // v3.26 성로 순례의 첫 승 보상(Store.pilgrimClaim)

function scriptList() {
  const html = fs.readFileSync(path.join(GAME, "index.html"), "utf8");
  const all = [...html.matchAll(/<script[^>]*\ssrc="([^"?]+)(?:\?[^"]*)?"/g)].map(m => m[1]);
  const a = all.indexOf(FIRST), b = all.indexOf(LAST);
  if (a < 0 || b < a) throw new Error(`index.html에서 ${FIRST} ~ ${LAST}를 찾지 못했습니다.`);
  return all.slice(a, b + 1).concat(EXTRA.filter(f => all.includes(f)));
}

function load() {
  const noop = () => {};
  const el = () => ({ style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop }, addEventListener: noop, appendChild: noop, remove: noop, querySelector: () => null, querySelectorAll: () => [], setAttribute: noop });
  const sandbox = {
    console,
    setTimeout, clearTimeout, setInterval: () => 0, clearInterval: noop,   // 규칙 파일의 setInterval(20초 tick)은 서버가 따로 돌린다
    document: { addEventListener: noop, querySelector: () => null, querySelectorAll: () => [], createElement: el, body: el(), documentElement: el() },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    navigator: { userAgent: "node" },
    location: { protocol: "server:", hash: "", search: "" },
    addEventListener: noop
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  const ctx = vm.createContext(sandbox);
  const files = scriptList();
  for (const f of files) {
    const src = fs.readFileSync(path.join(GAME, f), "utf8");
    vm.runInContext(src, ctx, { filename: f });
  }
  /* const로 선언된 것은 문맥의 전역 객체에 붙지 않으므로 한 번 꺼내 온다 */
  const R = vm.runInContext(`({ Store, TradeLocal, TA, TRADE, CARDS, CARD_LIST, GROUPS, FACTIONS, GROUP_IDS, ECON, LEVEL,
    ADMIN_ID, ADMIN_PW, GUEST_ID, freshDeck, shopPrice, stockMax, maxCopiesOf, countMap,
    PILGRIM: typeof PILGRIM !== "undefined" ? PILGRIM : null, pilOkDays: typeof pilOkDays !== "undefined" ? pilOkDays : null,
    LevelUI: typeof LevelUI !== "undefined" ? LevelUI : null })`, ctx);
  /* 화면 쪽 부름은 서버에서 아무 일도 하지 않는다 */
  if (R.LevelUI) { R.LevelUI.paint = noop; R.LevelUI.levelUp = noop; R.LevelUI.banner = noop; }
  R.ctx = ctx;
  R.files = files;
  return R;
}

module.exports = { load, scriptList };

/* ETHERION 결제 대비 틀 — 지금은 꺼져 있다(config.json billing.enabled = false). 결제대행사(PG)는 아직 붙이지 않았다.
   나중에 돈을 받을 때 고칠 곳이 이 파일 한 곳이 되도록 주문 장부와 지킬 규칙만 먼저 만들어 둔다 (docs/ACCOUNT_PRIVACY.md 7장).

   주문 장부 db.orders { oid: { oid, uid, sku, title, amount, currency, state, at, paidAt, pg, tid, give, refundAt, refundWhy } }
   - uid는 바뀌지 않는 계정 번호(u.uid). 이름 · 이메일을 적지 않는다 → 탈퇴해도 장부는 5년 남길 수 있다(전자상거래법).
   - state: created(주문 만듦) → paid(돈이 들어옴) → granted(물건을 줌) → refunded(환불) / canceled(안 냄)
   - 카드 번호 같은 결제 수단 정보는 받지도 적지도 않는다. PG가 준 거래 번호(tid)만 적는다.
   지킬 규칙
   - 금액 · 물건은 서버의 목록(catalog)에서만 읽는다. 기기가 보낸 값은 믿지 않는다.
   - 돈이 들어왔다는 것은 PG 서버가 알려 준 것만 믿는다(markPaid는 PG 알림 처리에서만 부른다 — 기기가 부르는 길을 만들지 않는다).
   - 같은 PG 거래가 두 번 알려 와도 한 번만 준다(db.paidTid).
   - 탈퇴한 사람의 주문이 있으면 db.gone[uid] = { at, until, enc }로 5년만 남긴다(문의 · 분쟁 답변용, enc = 암호화한 이메일). */
"use strict";
const crypto = require("crypto");
const KEEP_MS = 5 * 365 * 86400e3, UNPAID_MS = 24 * 3600e3;

function makeBilling(env) {
  const { db, CFG, markDirty, log, grant, takeBack } = env;
  for (const k of ["orders", "paidTid", "gone"]) if (!db[k] || typeof db[k] !== "object") db[k] = {};
  const cfg = () => Object.assign({ enabled: false, catalog: {} }, CFG.billing || {});
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const userOf = uid => Object.values(db.users).find(u => u.uid === uid) || null;
  const view = o => ({ oid: o.oid, sku: o.sku, title: o.title, amount: o.amount, currency: o.currency, state: o.state, at: o.at, paidAt: o.paidAt || null, refundAt: o.refundAt || null });

  /* 파는 물건 목록: config.json billing.catalog { sku: { title, amount(원), give: { gold } } } */
  function catalog() {
    const c = cfg();
    return { ok: true, enabled: !!c.enabled, items: c.enabled ? Object.keys(c.catalog).map(sku => ({ sku, title: c.catalog[sku].title, amount: c.catalog[sku].amount, currency: "KRW" })) : [] };
  }
  /* 주문 만들기 (로그인한 모험가). PG 결제 창을 띄우기 전에 부른다 */
  function create(u, sku) {
    const c = cfg();
    if (!c.enabled) return { ok: false, msg: "지금은 결제를 받지 않습니다." };
    if (!u || u.guest || u.admin || !u.uid) return { ok: false, msg: "모험가로 등록한 뒤에 살 수 있습니다." };
    if (!u.email) return { ok: false, msg: "결제하려면 먼저 이메일을 연결해 주세요. (영수증 · 환불 안내를 받을 곳)" };
    if (!u.adult) return { ok: false, msg: "결제하려면 성인 확인이 필요합니다." };   // 미성년자 결제는 법정대리인 동의가 있어야 한다 — 확인 수단을 붙이기 전에는 막아 둔다
    const item = own(c.catalog, String(sku)) ? c.catalog[sku] : null;
    if (!item || !(item.amount > 0)) return { ok: false, msg: "없는 상품입니다." };
    const d = new Date(), oid = `O${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${crypto.randomBytes(5).toString("hex").toUpperCase()}`;
    db.orders[oid] = { oid, uid: u.uid, sku: String(sku), title: item.title, amount: item.amount, currency: "KRW", give: JSON.parse(JSON.stringify(item.give || {})), state: "created", at: Date.now() };
    markDirty(); log("주문", u.uid, oid, item.title, item.amount + "원");
    return { ok: true, order: view(db.orders[oid]) };
  }
  /* 돈이 들어옴 — PG 서버의 알림을 확인한 뒤에만 부른다. 같은 거래는 한 번만 */
  function markPaid(oid, pay) {
    const o = own(db.orders, oid) ? db.orders[oid] : null;
    if (!o) return { ok: false, msg: "없는 주문입니다." };
    const key = String(pay.pg) + ":" + String(pay.tid);
    if (own(db.paidTid, key)) return db.paidTid[key] === oid ? { ok: true, again: true, order: view(o) } : { ok: false, msg: "다른 주문에 쓰인 거래입니다." };
    if (o.state !== "created") return { ok: false, msg: "이미 처리한 주문입니다." };
    if (+pay.amount !== o.amount || (pay.currency || "KRW") !== o.currency) { log("주문", oid, `금액이 다름 — 주문 ${o.amount} · 낸 돈 ${pay.amount}`); return { ok: false, msg: "금액이 주문과 다릅니다." }; }
    Object.assign(o, { state: "paid", paidAt: Date.now(), pg: String(pay.pg), tid: String(pay.tid) });
    db.paidTid[key] = oid;
    const u = userOf(o.uid);
    if (u) { grant(u, o.give, `구매 ${o.oid}`); o.state = "granted"; }
    else log("주문", oid, "돈은 들어왔으나 계정이 없음 — 환불해야 함");
    markDirty(); log("주문", o.uid, oid, "결제됨", o.state);
    return { ok: true, order: view(o) };
  }
  /* 환불 — PG에서 환불한 뒤에 부른다. 준 것을 거둘 수 없으면(이미 씀) ok: false로 사람이 본다 */
  function refund(oid, why) {
    const o = own(db.orders, oid) ? db.orders[oid] : null;
    if (!o || (o.state !== "paid" && o.state !== "granted")) return { ok: false, msg: "환불할 수 없는 주문입니다." };
    if (o.state === "granted") { const u = userOf(o.uid); if (u && !takeBack(u, o.give, `환불 ${o.oid}`)) return { ok: false, msg: "이미 쓴 상품이라 거둘 수 없습니다." }; }
    Object.assign(o, { state: "refunded", refundAt: Date.now(), refundWhy: String(why || "").slice(0, 200) });
    markDirty(); log("주문", o.uid, oid, "환불");
    return { ok: true, order: view(o) };
  }
  const list = uid => (uid ? Object.values(db.orders).filter(o => o.uid === uid && o.state !== "created" && o.state !== "canceled").sort((a, b) => b.at - a.at).map(view) : []);
  /* 탈퇴할 때: 낸 주문이 있으면 계정 번호와 암호화한 이메일만 5년 남긴다. 없으면 아무것도 남기지 않는다 */
  function detach(u) {
    if (!u.uid) return false;
    for (const o of Object.values(db.orders)) if (o.uid === u.uid && o.state === "created") o.state = "canceled";
    if (!Object.values(db.orders).some(o => o.uid === u.uid && o.paidAt)) return false;
    db.gone[u.uid] = { at: Date.now(), until: Date.now() + KEEP_MS, enc: u.email ? u.email.enc : null };
    return true;
  }
  function prune() {
    const now = Date.now(); let n = 0;
    for (const o of Object.values(db.orders)) {
      if ((o.state === "created" || o.state === "canceled") && now - o.at > UNPAID_MS) { delete db.orders[o.oid]; n++; }
      else if (o.paidAt && now - o.paidAt > KEEP_MS && !userOf(o.uid)) { if (o.pg) delete db.paidTid[o.pg + ":" + o.tid]; delete db.orders[o.oid]; n++; }   // 5년이 지난, 떠난 사람의 주문
    }
    for (const k of Object.keys(db.gone)) if (now > db.gone[k].until) { delete db.gone[k]; n++; }
    if (n) markDirty();
  }
  return { catalog, create, markPaid, refund, list, detach, prune };
}
module.exports = { makeBilling };

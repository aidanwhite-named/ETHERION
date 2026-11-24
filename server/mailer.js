/* ETHERION 메일 보내기 — 인증 코드 메일 한 가지만 보낸다 (docs/ACCOUNT_PRIVACY.md 4.2)
   config.json의 mail: { provider, apiKey, from, fromName }
     provider "console"  (기본) 보내지 않고 서버 창에 코드를 찍는다 — 집 안 시험용. 바깥에 열 때는 아래 둘 중 하나로
     provider "resend"   https://resend.com   — apiKey, from(확인한 도메인의 주소)
     provider "brevo"    https://www.brevo.com — apiKey, from
   바깥 꾸러미 없이 Node 18의 fetch만 쓴다. 새 업체는 SENDERS에 함수 하나를 더한다.
   지킬 것: 메일에 링크를 넣지 않는다(피싱과 구별) · 서버 기록에 주소 원문을 남기지 않는다(가린 주소만). */
"use strict";

const SUBJECT = { login: "ETHERION 인증 코드", link: "ETHERION 이메일 확인 코드", confirm: "ETHERION 본인 확인 코드" };
const LEAD = { login: "ETHERION에 들어가려면 아래 코드를 입력하세요.", link: "이 주소를 ETHERION 모험가에 연결하려면 아래 코드를 입력하세요.", confirm: "계정 설정을 바꾸려면 아래 코드를 입력하세요." };

function mask(email) {
  const [a, d] = String(email).split("@");
  if (!d) return "***";
  const dot = d.lastIndexOf(".");
  return a.slice(0, 2) + "***@" + d.slice(0, 2) + "***" + (dot > 0 ? d.slice(dot) : "");
}
function bodyOf(purpose, code, minutes) {
  const lead = LEAD[purpose] || LEAD.login;
  const text = `${lead}\n\n    ${code}\n\n이 코드는 ${minutes}분 동안 한 번만 쓸 수 있습니다.\n요청한 적이 없다면 이 메일을 무시하세요. 코드를 누구에게도 알려 주지 마세요.\nETHERION은 메일로 링크를 보내지 않습니다.`;
  const html = `<div style="font-family:sans-serif;font-size:15px;line-height:1.6;color:#222"><p>${lead}</p><p style="font-size:30px;letter-spacing:.3em;font-weight:700;margin:18px 0">${code}</p><p>이 코드는 ${minutes}분 동안 한 번만 쓸 수 있습니다.<br>요청한 적이 없다면 이 메일을 무시하세요. 코드를 누구에게도 알려 주지 마세요.<br>ETHERION은 메일로 링크를 보내지 않습니다.</p></div>`;
  return { text, html };
}
async function post(url, headers, json) {
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 10000);
  try {
    const r = await fetch(url, { method: "POST", headers: Object.assign({ "Content-Type": "application/json" }, headers), body: JSON.stringify(json), signal: ctl.signal });
    if (!r.ok) throw new Error(`메일 서비스 응답 ${r.status}`);
  } finally { clearTimeout(timer); }
}
const SENDERS = {
  async resend(m, c) { await post("https://api.resend.com/emails", { Authorization: "Bearer " + c.apiKey }, { from: c.fromName ? `${c.fromName} <${c.from}>` : c.from, to: [m.to], subject: m.subject, text: m.text, html: m.html }); },
  async brevo(m, c) { await post("https://api.brevo.com/v3/smtp/email", { "api-key": c.apiKey }, { sender: { email: c.from, name: c.fromName || "ETHERION" }, to: [{ email: m.to }], subject: m.subject, textContent: m.text, htmlContent: m.html }); }
};

function makeMailer(cfg, log) {
  const c = Object.assign({ provider: "console" }, cfg || {});
  const real = !!SENDERS[c.provider] && !!c.apiKey && !!c.from;
  if (c.provider !== "console" && !real) log("메일", `설정이 모자랍니다(provider · apiKey · from) — 코드를 서버 창에 찍습니다`);
  return {
    real,                                   // 진짜로 메일이 나가는가
    provider: real ? c.provider : "console",
    mask,
    /* 코드 메일 한 통. 실패하면 던진다(부른 쪽이 "메일을 보내지 못했습니다"로 답함) */
    async sendCode(to, code, purpose, minutes) {
      const b = bodyOf(purpose, code, minutes);
      if (!real) { log("메일(시험)", mask(to), `코드 ${code}`, `(${purpose} · ${minutes}분) — 진짜 메일은 config.json의 mail을 채우면 나갑니다`); return; }
      await SENDERS[c.provider]({ to, subject: SUBJECT[purpose] || SUBJECT.login, text: b.text, html: b.html }, c);
      log("메일", mask(to), purpose);
    }
  };
}
module.exports = { makeMailer, mask };

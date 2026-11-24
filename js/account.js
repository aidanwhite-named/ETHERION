/* ETHERION 계정 관리 창 (v3.27, 서버 모드에서만) — 이메일 연결 · 바꾸기, 암호 정하기 · 바꾸기, 모든 기기에서 나가기, 탈퇴.
   서버 요청은 js/net.js Net.account, 규칙은 server/auth.js. 설정 창의 "계정 관리" 단추로 연다(Account.hook이 단추를 끼운다).
   이메일은 서버도 가린 모습(ab***@ex***.com)만 준다. 설명 docs/ACCOUNT_PRIVACY.md */
const Account = {
  ok() { const u = typeof Store !== "undefined" && Store.user(); return !!(u && !u.guest && !u.admin && typeof Net !== "undefined" && Net.authOn() && Net.token); },
  /* 설정 창이 열리면 단추를 끼운다 */
  hook() {
    if (!this.ok()) return;
    const m = [...document.querySelectorAll(".modal-wrap .modal")].pop(); if (!m || m.querySelector("#set-account")) return;
    const btns = m.querySelector(".modal-btns"); if (!btns) return;
    btns.insertAdjacentHTML("beforebegin", `<p class="pick-label">계정 <small class="muted">— 이메일 · 암호 · 로그인한 기기 · 탈퇴</small></p><div class="speed"><button type="button" class="btn xs" id="set-account">계정 관리</button></div>`);
    m.querySelector("#set-account").addEventListener("click", () => this.open());
  },
  open() {
    if (!this.ok()) return;
    const r = Net.account(); if (!r.ok) { toast(r.msg || "계정 정보를 받지 못했습니다.", "warn"); return; }
    let A = r.account, orders = r.orders || [];
    const pwMin = (Net.info.auth && Net.info.auth.pwMin) || 8;
    const body = () => `
      <p class="acc-row">모험가 <b>${esc(Store.user().id)}</b> <small class="muted">계정 번호 ${esc(A.uid || "-")}</small></p>
      <div class="acc-box"><h4>본인 확인 <small class="muted">— 암호 바꾸기 · 탈퇴에 필요합니다</small></h4>
        ${A.hasPw ? `<label>지금 암호<input id="ac-cur" type="password" autocomplete="current-password"></label>` : ""}
        ${A.email ? `<div class="acc-line"><label>${A.hasPw ? "또는 메일 확인 코드" : "메일 확인 코드"}<input id="ac-ccode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="6자리"></label><button type="button" class="btn xs" data-act="confirm">코드 받기</button></div>` : ""}
      </div>
      <div class="acc-box"><h4>이메일 <small class="muted">— ${A.email ? esc(A.email) : "연결되지 않음 (연결하면 메일 코드로 로그인하고 암호를 되찾을 수 있습니다)"}</small></h4>
        <div class="acc-line"><label>${A.email ? "새 이메일" : "이메일"}<input id="ac-mail" type="email" autocomplete="email" maxlength="254"></label><button type="button" class="btn xs" data-act="link">코드 받기</button></div>
        <div class="acc-line"><label>코드<input id="ac-lcode" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="6자리"></label><button type="button" class="btn xs" data-act="email">${A.email ? "이메일 바꾸기" : "이메일 연결"}</button></div>
      </div>
      <div class="acc-box"><h4>암호 <small class="muted">— ${A.hasPw ? "정해져 있음" : "없음 (메일 코드로만 로그인)"}</small></h4>
        <div class="acc-line"><label>새 암호<input id="ac-pw" type="password" autocomplete="new-password" placeholder="${pwMin}자 이상"></label><button type="button" class="btn xs" data-act="pw">${A.hasPw ? "암호 바꾸기" : "암호 정하기"}</button></div>
        ${A.hasPw && A.email ? `<button type="button" class="btn xs" data-act="nopw">암호 없애기 (메일 코드로만 로그인)</button>` : ""}
      </div>
      <div class="acc-box"><h4>로그인한 기기</h4><button type="button" class="btn xs" data-act="out">다른 기기에서 모두 나가기</button></div>
      ${orders.length ? `<div class="acc-box"><h4>구매 내역</h4>${orders.map(o => `<p class="acc-row small">${new Date(o.at).toLocaleDateString()} · ${esc(o.title)} · ${o.amount.toLocaleString()}원 · ${o.state === "refunded" ? "환불됨" : "결제됨"}</p>`).join("")}</div>` : ""}
      <div class="acc-box acc-danger"><h4>탈퇴 <small class="muted">— 모험가 · 보유 카드 · 조각 · 덱 · 이메일을 바로 지웁니다. 되돌릴 수 없습니다(백업에서는 14일 뒤 사라집니다)</small></h4>
        <button type="button" class="btn xs" data-act="del">모험가 지우기</button></div>
      <p class="acc-msg" id="ac-msg"></p>
      <p class="acc-row small"><a href="${Net.page("privacy.html")}" target="_blank" rel="noopener">개인정보 처리방침</a> · <a href="${Net.page("terms.html")}" target="_blank" rel="noopener">이용약관</a>${A.agree ? ` · ${new Date(A.agree.at).toLocaleDateString()} 동의` : ""}</p>`;
    modal(`<h3>계정 관리</h3><div class="acc-body">${body()}</div>`, [{ label: "닫기", value: null }], { cls: "acc-modal", onOpen: wrap => {
      const box = wrap.querySelector(".acc-body"), $q = s => box.querySelector(s), val = s => ($q(s) ? $q(s).value.trim() : "");
      const say = (m, good) => { const el = $q("#ac-msg"); el.textContent = m || ""; el.classList.toggle("good", !!good); };
      const who = () => (val("#ac-cur") ? { cur: $q("#ac-cur").value } : { code: val("#ac-ccode") });
      const redraw = (r, msg) => { if (r.me && r.me.account) A = r.me.account; box.innerHTML = body(); say(msg, true); };
      box.addEventListener("click", async e => {
        const b = e.target.closest("[data-act]"); if (!b) return;
        const act = b.dataset.act; let r;
        if (act === "confirm") { r = Net.account("/code", { purpose: "confirm" }); return say(r.ok ? "확인 코드를 메일로 보냈습니다(10분)." : r.msg, r.ok); }
        if (act === "link") { r = Net.account("/code", { purpose: "link", email: val("#ac-mail") }); return say(r.ok ? "그 주소로 코드를 보냈습니다(10분). 메일함 · 스팸함을 확인해 주세요." : r.msg, r.ok); }
        if (act === "email") { r = Net.account("/email", { email: val("#ac-mail"), code: val("#ac-lcode") }); return r.ok ? redraw(r, "이메일을 연결했습니다. 다른 기기의 로그인은 끊었습니다.") : say(r.msg); }
        if (act === "pw" || act === "nopw") {
          if (act === "pw" && !$q("#ac-pw").value) return say("새 암호를 넣어 주세요.");
          r = Net.account("/password", Object.assign({ pw: act === "pw" ? $q("#ac-pw").value : "" }, who()));
          return r.ok ? redraw(r, act === "pw" ? "암호를 바꿨습니다. 다른 기기의 로그인은 끊었습니다." : "암호를 없앴습니다. 이제 메일 코드로 로그인합니다.") : say(r.msg);
        }
        if (act === "out") { r = Net.account("/logoutAll", {}); return say(r.ok ? "다른 기기의 로그인을 모두 끊었습니다." : r.msg, r.ok); }
        if (act === "del") {
          const w = who(); if (!w.cur && !w.code) return say("위의 '본인 확인'에 지금 암호나 메일 확인 코드를 먼저 넣어 주세요.");
          const yes = await modal(`<h3>모험가 지우기</h3><p>「${esc(Store.user().id)}」의 보유 카드 · 조각 · 덱 · 전적 · 이메일이 바로 지워지고 되돌릴 수 없습니다. 이 이름은 30일 동안 다시 쓸 수 없습니다.</p>`, [{ label: "그만두기", value: false }, { label: "지우기", value: true, cls: "primary" }]);
          if (!yes) return;
          r = Net.account("/delete", w);
          if (!r.ok) return say(r.msg);
          Net.setToken(null); Net.reset();
          document.querySelectorAll(".modal-wrap").forEach(x => x.remove());
          toast("모험가를 지웠습니다. 그동안 고마웠습니다.");
          if (typeof showTitle === "function") showTitle();
        }
      });
    } });
  }
};

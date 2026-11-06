/* ETHERION — 상단 문장: 키 아트 띠 (가이드 2.15, 게임 v3.5.1)
   그림 = img/ui/etherion_keyart.jpg — 사용자가 고른 키 아트(이미지 생성 AI)의 위쪽 띠(1672×600, 거인 · 신 · 용 · ETHERION 글자).
   가이드 0.2의 세 번째 예외(2026-11-06 사용자 결정, 타이틀 그림과 같은 키 아트). 코드로 그리던 예전 문장(v3.1 · v3.4)은 지웠다.
   대기실 맨 위에서는 크게(1920px 화면에서 697×250), 아래로 내리거나 다른 화면에서는 작게(글자 둘레만) 보인다.
   ETHERION 글자는 그림 안에 있으므로 HTML 글자(.crest-word)는 화면 읽기용으로만 남긴다. */
const CREST = (() => {
  const SRC = "img/ui/etherion_keyart.jpg";
  const svg = () => `<span class="cr-kv" aria-hidden="true"></span>`;
  /* 대기실을 아래로 내리면 띠가 작아진다(가려지는 내용이 없게) */
  let compact = null;
  const sync = () => {
    const y = window.scrollY || (document.scrollingElement && document.scrollingElement.scrollTop) || 0;
    const c = y > 24;
    if (c !== compact) { compact = c; document.documentElement.classList.toggle("crest-compact", c); }
  };
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener("scroll", sync, { passive: true });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sync); else sync();
  }
  return { svg, SRC };
})();

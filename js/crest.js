/* ETHERION — 상단 문장: ETHERION 글자 / 이미지 (가이드 2.15, 게임 v3.10)
   img/ui/crest/crest_logo.png 그림이 있으면 그 그림을 쓰고, 없으면 코드로 된 ETHERION 글자(LOGO)를 쓴다.
   타이틀 로고와 같은 글자(js/logo.js LOGO: T = 거인의 돌, I = 신의 빛기둥, O = 에테리온 문장,
   E · H · R · N = Cinzel Decorative Black 윤곽, 입체 필터)를 상단 띠 높이 안에 멈춘 채로 넣는다.
   대기실 · 상점 · 덱 조정실 · 보관소 모두 같은 문장. 띠 위아래로 넘치지 않는다(css/crest.css). */
const CREST = (() => {
  let cache = "";
  const SRC = "img/ui/crest/crest_logo.png";
  const svg = () => {
    if (!cache) cache = typeof LOGO !== "undefined" ? LOGO.html("ETHERION") : "";
    return `<span class="cr-wrap">` +
      `<img class="cr-img" src="${SRC}" alt="ETHERION" onload="var p=this.parentElement;if(p)p.classList.add('has-img')" onerror="var p=this.parentElement;if(p)p.classList.remove('has-img');this.style.display='none'">` +
      `<span class="cr-word" aria-hidden="true">${cache}</span>` +
    `</span>`;
  };
  return { svg };
})();

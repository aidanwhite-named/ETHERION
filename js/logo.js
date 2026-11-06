/* ETHERION — 타이틀 로고 (v2.8)
   여덟 글자 중 셋을 세계의 세 갈래로 바꿨다 (docs/WORLD.md 1장 · 8장):
   - T = 거인의 돌(몸): 위가 넓은 상인방 + 아래로 굵어지는 돌기둥. 문장의 거인의 돌처럼 가로 홈 · 양끝 못 · 기둥의 룬 마름모
   - I = 신의 빛기둥(뜻): 위아래 받침 사이 빛줄기가 다섯 꼭짓점 별을 꿰뚫는다
   - O = 에테리온 문장: 바깥 테에 거인의 돌 일곱, 고리에 용의 보석 일곱(동쪽 빈 자리), 가운데 신의 별, 한가운데 아르케(빈 원)
   나머지 E · H · R · N은 Cinzel Decorative Black(fonts/)의 윤곽을 그대로 옮긴 길(path)이라 글꼴을 받지 못해도 모양이 같다.
   등장: 아무것도 없는 데서 빛의 선이 윤곽을 긋고(.lg-line) → 속이 차오르고(.lg-fill) → 보석이 박힌다(.lg-gem). 움직임은 css/logo.css.
   v3.0: 굴곡 · 질감 · 두께가 있는 입체(bevel 필터 셋: 금 글자 · 거인의 돌(T · O) · 신의 빛(I)), 마우스를 따라 조금 기운다(tilt).
   좌표: 1000 = 1em, 바탕선 y = 0, 대문자 높이 y = -700 (글꼴과 같은 단위). 글자마다 따로 된 svg라 타이틀의 기존 연출(burnAway, --d · --dx)이 그대로 붙는다. */
"use strict";

const LOGO_T = { start: .45, step: .2 };   // 첫 글자가 그려지기 시작하는 때(s), 글자 사이 간격(s)

const LOGO = (() => {
  const GLYPH = {"E":{"adv":712,"b":[30,0,713,718],"d":"M43 -10Q69 -10 88 -28Q106 -47 107 -73V-627Q106 -659 80 -678Q64 -690 43 -690H30V-700H363Q406 -700 440 -707Q473 -714 482 -718V-512H472V-520Q472 -579 439 -613Q406 -647 347 -649H312V-370H451Q499 -371 529 -402Q559 -432 559 -480V-484H569V-206H559V-211Q559 -258 529 -288Q499 -319 452 -320H312V-51H495Q568 -51 624 -99Q680 -147 703 -232H713L675 0H30V-10Z"},"H":{"adv":893,"b":[-23,-201,915,872],"d":"M516 -10Q543 -10 562 -28Q580 -47 581 -73V-325H313V-70Q313 29 265 106Q215 187 106 199Q95 201 82 201Q35 201 -23 182V172Q57 141 83 86Q101 49 104 19Q108 -20 108 -70V-628Q107 -654 88 -672Q70 -690 44 -690H31V-700H390V-690H377Q341 -690 323 -660Q314 -646 313 -629V-375H581V-610Q581 -667 605 -720Q629 -773 673 -811Q742 -872 837 -872Q874 -872 915 -862V-852Q867 -837 833 -803Q812 -783 796 -731Q788 -705 787 -672Q786 -638 786 -610V-73Q786 -38 817 -19Q832 -10 850 -10H862V0H504V-10Z"},"R":{"adv":783,"b":[35,-236,1174,700],"d":"M721 -504Q721 -450 692 -404Q662 -359 620 -340Q578 -322 537 -322Q525 -322 514 -323Q577 -310 629 -245Q653 -216 683 -170Q713 -125 725 -108Q785 -22 845 32Q973 148 1174 160V170Q1119 209 1036 226Q987 236 938 236Q890 236 836 222Q782 208 730 180Q678 152 624 99Q571 46 537 -10Q503 -65 478 -116Q453 -166 430 -215Q408 -264 403 -275Q374 -335 351 -342V-352H367Q432 -352 474 -403Q498 -432 502 -464Q506 -495 506 -504Q506 -579 462 -614Q418 -648 362 -648H318V-73Q318 -47 337 -28Q356 -10 382 -10H394V0H35V-10H48Q74 -10 92 -28Q111 -46 112 -72V-627Q111 -664 80 -682Q65 -690 48 -690H36V-700H426Q575 -700 652 -648Q721 -601 721 -504Z"},"N":{"adv":881,"b":[-230,-173,1142,840],"d":"M1142 135Q1081 173 1010 173Q948 173 881 136Q812 99 746 31L307 -423V-71Q307 -45 325 -28Q343 -10 368 -10H387V0H21V-10H40Q65 -10 83 -28Q101 -45 101 -71V-637Q-53 -801 -169 -801Q-198 -801 -225 -791L-230 -800Q-174 -840 -109 -840Q-66 -840 -22 -824Q23 -807 56 -786Q118 -745 166 -696L577 -271V-629Q576 -655 558 -672Q540 -690 515 -690H496V-700H862V-690H844Q819 -690 801 -672Q783 -655 782 -630V-59L800 -40Q800 -40 824 -15Q847 10 856 18Q864 26 890 50Q916 73 932 82Q948 92 976 108Q1004 123 1027 127Q1053 133 1082 133Q1111 133 1138 125Z"}};   // { adv, b: [xMin, yMin, xMax, yMax](글꼴 좌표, 위가 +), d }
  const VB_Y = -900, VB_H = 1160, SP = 60;   // 세로 범위(H·N의 위 꼬리, R·H의 아래 꼬리까지), 글자 사이 .06em
  const f = n => +n.toFixed(1);
  const pt = (deg, r, cx, cy) => { const a = (deg - 90) * Math.PI / 180; return [f(cx + Math.cos(a) * r), f(cy + Math.sin(a) * r)]; };
  const P = q => q.join(",");
  const poly = ps => "M" + ps.map(P).join("L") + "Z";
  const starPts = (cx, cy, R, ri) => [...Array(10)].map((_, k) => pt(k * 36, k % 2 ? ri : R, cx, cy));
  const circ = (cx, cy, r) => `M${f(cx - r)},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
  const line = (d, s = 0) => `<path class="lg-line" pathLength="100" style="--s:${s}s" d="${d}"/>`;
  const DARK = "#3a2412";

  /* T — 거인의 돌 */
  function giantT() {
    const out = "M-15,-672L12,-714L748,-714L775,-672L742,-592L488,-580L512,-40L548,-36L560,0L200,0L212,-36L248,-40L272,-580L18,-592Z";
    return { adv: 760, b: [-15, 775], body: `<g class="lg-fill">
      <path d="${out}" fill="url(#lgStone)"/>
      <path d="M16,-704L744,-704" stroke="#ffe0b8" stroke-opacity=".6" stroke-width="7"/>
      <path d="M80,-652L680,-652" stroke="${DARK}" stroke-opacity=".75" stroke-width="12" stroke-linecap="round"/>
      <circle cx="42" cy="-652" r="13" fill="${DARK}" fill-opacity=".8"/><circle cx="718" cy="-652" r="13" fill="${DARK}" fill-opacity=".8"/>
      <path d="M380,-536L380,-396M380,-244L380,-86" stroke="${DARK}" stroke-opacity=".55" stroke-width="10" stroke-linecap="round"/>
      <path d="M380,-372L410,-320L380,-268L350,-320Z" fill="none" stroke="${DARK}" stroke-opacity=".75" stroke-width="10" stroke-linejoin="round"/>
      <path d="M598,-714L586,-690L596,-670M274,-470L294,-450L290,-430" stroke="${DARK}" stroke-opacity=".5" stroke-width="6" fill="none"/>
    </g>${line(out)}` };
  }

  /* I — 신의 빛기둥 */
  function godI() {
    const cx = 250, cy = -352, star = poly(starPts(cx, cy, 150, 58)), inner = poly(starPts(cx, cy, 58, 58).filter((_, k) => k % 2));
    const cap = "M118,-698L250,-724L382,-698L360,-662L140,-662Z", up = "M206,-662L294,-662L262,-500L238,-500Z",
          low = "M238,-294L262,-294L294,-38L206,-38Z", base = "M128,-38L372,-38L388,0L112,0Z";
    return { adv: 500, b: [112, 388], body: `<g class="lg-fill">
      <path d="${cap}${up}${low}${base}" fill="url(#lgLight)"/>
      <path d="M250,-712L250,-505" stroke="#fff" stroke-opacity=".7" stroke-width="8" stroke-linecap="round"/>
      <path d="${star}" fill="url(#lgArc)" stroke="#fff1c8" stroke-width="8" stroke-linejoin="round"/>
      <path d="${inner}" fill="none" stroke="#fff1c8" stroke-opacity=".45" stroke-width="5"/>
    </g>${line(cap + up)}${line(star, .25)}${line(low + base, .45)}` };
  }

  /* O — 에테리온 문장 (js/screens.js SIGIL과 같은 짜임: 거인 7등분, 용 8방위) */
  function sigilO() {
    const cx = 465, cy = -352, R0 = 286, R1 = 372, W = 21, RG = 232;
    const at = (a, r) => P(pt(a, r, cx, cy));
    const arc = (a0, a1, r) => `M${at(a0, r)}A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0},1 ${at(a1, r)}`;
    const stone = a => `M${at(a - W, R0)}L${at(a - W, R1)}A${R1},${R1} 0 0,1 ${at(a + W, R1)}L${at(a + W, R0)}A${R0},${R0} 0 0,0 ${at(a - W, R0)}Z`;
    const angs = [...Array(7)].map((_, k) => k * 360 / 7);
    const stones = angs.map(stone);
    const grooves = angs.map(a => arc(a - 12, a + 12, 329)).join("");
    const star = poly(starPts(cx, cy, 168, 64));
    const seats = (typeof SEATS !== "undefined" ? SEATS : []);
    const gems = seats.map((s, k) => {
      const [x, y] = pt(s.ang, RG, cx, cy);
      if (!s.el) return `<g class="lg-gem" style="--s:${(k * .07).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="28" fill="#07080d" fill-opacity=".7" stroke="#8a86a0" stroke-width="6" stroke-dasharray="6 9"/></g>`;
      const col = (typeof ELEMENTS !== "undefined" && ELEMENTS[s.el]) ? ELEMENTS[s.el].color : "#d9b46a";
      return `<g class="lg-gem" style="--s:${(k * .07).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="36" fill="#07080d" stroke="#e8c47a" stroke-width="9"/><circle cx="${x}" cy="${y}" r="25" fill="${col}"/><circle cx="${x}" cy="${y}" r="25" fill="url(#lgGemShade)"/><circle cx="${f(x - 8)}" cy="${f(y - 9)}" r="7" fill="#fff" fill-opacity=".85"/></g>`;
    }).join("");
    return { adv: 930, b: [93, 837], body: `<g class="lg-fill">
      <circle cx="${cx}" cy="${cy}" r="329" fill="none" stroke="#8a4c1c" stroke-width="18"/>
      ${stones.map(d => `<path d="${d}" fill="url(#lgStone)" stroke="${DARK}" stroke-opacity=".55" stroke-width="6"/>`).join("")}
      <path d="${grooves}" fill="none" stroke="${DARK}" stroke-opacity=".7" stroke-width="10" stroke-linecap="round"/>
      <path d="${arc(142, 398, RG)}" fill="none" stroke="#e8c47a" stroke-width="12"/>
      <path d="${arc(52, 128, RG)}" fill="none" stroke="#8a86a0" stroke-width="10" stroke-dasharray=".1 26" stroke-linecap="round"/>
      <path d="${star}" fill="url(#lgArc)" stroke="#fff1c8" stroke-width="7" stroke-linejoin="round"/>
      <circle cx="${cx}" cy="${cy}" r="30" fill="#07080d" stroke="#f3dfa6" stroke-width="9"/>
    </g>${stones.map((d, k) => line(d, k * .07)).join("")}${line(circ(cx, cy, RG), .35)}${line(star, .6)}${line(circ(cx, cy, 30), .9)}${gems}` };
  }

  function plain(ch) { const g = GLYPH[ch]; return { adv: g.adv, b: [g.b[0], g.b[2]], body: `<g class="lg-fill"><path d="${g.d}" fill="url(#lgGold)"/></g>${line(g.d)}` }; }

  /* v3.0 입체: 빛(왼쪽 위)을 받은 굴곡 + 두드린 금속 · 돌결 질감 + 아래로 쌓인 두께(돌출) + 바닥 그림자.
     단위는 글자 좌표(1000 = 1em). blur = 모서리 둥글기, scale = 굴곡 높이, noise · amp · oct = 질감 결의 크기 · 깊이 · 겹,
     spec = 반사 빛 색, shade = 그늘 세기, depth → deep = 두께 앞쪽 → 뒤쪽 색 */
  function bevel(id, o) {
    const steps = 7, offs = [...Array(steps)].map((_, k) => {
      const t = (k + 1) / steps;
      return `<feOffset in="ex" dx="${f(t * 9)}" dy="${f(t * 42)}" result="e${k}"/>`;
    }).join("");
    return `<filter id="${id}" x="-10%" y="-12%" width="122%" height="140%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${o.blur}" result="b"/>
      <feTurbulence type="fractalNoise" baseFrequency="${o.noise}" numOctaves="${o.oct}" seed="11" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${o.amp} 0 0 0 0" result="na"/>
      <feComposite in="b" in2="na" operator="arithmetic" k2=".8" k3="1" result="bump"/>
      <feDiffuseLighting in="bump" surfaceScale="${o.scale}" diffuseConstant="1.1" lighting-color="#ffffff" result="dif"><feDistantLight azimuth="225" elevation="52"/></feDiffuseLighting>
      <feComposite in="SourceGraphic" in2="dif" operator="arithmetic" k1="${o.shade}" result="sh"/>
      <feComposite in="sh" in2="SourceAlpha" operator="in" result="shA"/>
      <feSpecularLighting in="bump" surfaceScale="${o.scale}" specularConstant=".95" specularExponent="24" lighting-color="${o.spec}" result="sp"><feDistantLight azimuth="225" elevation="40"/></feSpecularLighting>
      <feComposite in="sp" in2="SourceAlpha" operator="in" result="spA"/>
      <feComposite in="shA" in2="spA" operator="arithmetic" k2="1" k3=".75" result="lit"/>
      <feFlood flood-color="${o.deep}"/><feComposite in2="SourceAlpha" operator="in" result="ex"/>
      ${offs}
      <feFlood flood-color="${o.depth}"/><feComposite in2="SourceAlpha" operator="in"/><feOffset dx="1.5" dy="7" result="lip"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="22"/><feOffset dx="14" dy="70"/><feComponentTransfer><feFuncA type="linear" slope=".55"/></feComponentTransfer><feComposite in2="SourceAlpha" operator="out" result="drop"/>
      <feMerge><feMergeNode in="drop"/>${[...Array(steps)].map((_, k) => `<feMergeNode in="e${steps - 1 - k}"/>`).join("")}<feMergeNode in="lip"/><feMergeNode in="lit"/></feMerge>
    </filter>`;
  }

  /* 같은 단위(userSpaceOnUse)라 모든 글자가 대문자 높이에서 같은 띠를 공유한다 */
  const band = (id, stops, y1 = -720, y2 = 0) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;
  const DEFS = `<svg class="lg-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
    ${band("lgGold", [[0, "#fffbe8"], [.3, "#f6dc96"], [.5, "#c8963f"], [.52, "#7a5418"], [.75, "#d9ad5c"], [1, "#fff0bf"]])}
    ${band("lgStone", [[0, "#ffd6a6"], [.3, "#e39c55"], [.5, "#a85e24"], [.52, "#5a3010"], [.75, "#c27a3a"], [1, "#f0b47a"]])}
    ${band("lgLight", [[0, "#ffffff"], [.3, "#fff1c8"], [.5, "#e8c97a"], [.52, "#a8843a"], [.75, "#f2dca0"], [1, "#fffaf0"]])}
    ${band("lgArc", [[0, "#f6eeff"], [.45, "#c4a2f5"], [.55, "#7d52c9"], [1, "#c8a8f5"]], -520, -190)}
    ${bevel("lgBevelGold", { blur: 15, scale: 9, noise: .05, amp: .055, oct: 3, spec: "#fff6dc", shade: 1.12, depth: "#5a3a12", deep: "#24160a" })}
    ${bevel("lgBevelStone", { blur: 12, scale: 10, noise: .028, amp: .2, oct: 4, spec: "#ffe2c2", shade: 1.2, depth: "#4a2810", deep: "#1c0e06" })}
    ${bevel("lgBevelLight", { blur: 13, scale: 7, noise: .06, amp: .025, oct: 2, spec: "#ffffff", shade: 1.18, depth: "#6a5226", deep: "#2a2010" })}
    <radialGradient id="lgGemShade" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
  </defs></svg>`;

  function letter(ch, i, n) {
    const g = ch === "T" ? giantT() : ch === "I" ? godI() : ch === "O" ? sigilO() : plain(ch);
    g.body = g.body.replace('<g class="lg-fill"', `<g class="lg-fill" filter="url(#${ch === "T" || ch === "O" ? "lgBevelStone" : ch === "I" ? "lgBevelLight" : "lgBevelGold"})"`);
    const x0 = g.b[0] - 30, x1 = g.b[1] + 30, w = x1 - x0, c = (n - 1) / 2, em = v => (v / 1000).toFixed(3) + "em";
    const st = `--i:${i};--d:${(c - Math.abs(i - c)).toFixed(1)};--dx:${((c - i) * 14).toFixed(0)}px;--t:${(LOGO_T.start + i * LOGO_T.step).toFixed(2)}s;width:${em(w)};height:${em(VB_H)};margin-left:${em(x0)};margin-right:${em(g.adv + SP - x1)}`;
    return `<svg class="lg lg-${ch.toLowerCase()}" viewBox="${x0} ${VB_Y} ${w} ${VB_H}" style="${st}" aria-hidden="true" focusable="false">${g.body}</svg>`;
  }

  /* v3.0 마우스를 따라 로고가 조금 기운다(입체가 보이게). 움직임 줄이기면 하지 않는다 */
  function tilt(el) {
    if (!el || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const mv = e => {
      if (!el.isConnected) { removeEventListener("pointermove", mv); return; }
      const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
      el.style.setProperty("--tx", (x * 10).toFixed(2) + "deg"); el.style.setProperty("--ty", (-y * 8).toFixed(2) + "deg");
    };
    addEventListener("pointermove", mv);
  }
  return { html: (word = "ETHERION") => DEFS + [...word].map((ch, i) => letter(ch, i, word.length)).join(""), tilt };
})();

/* v3.0 상단 문장의 ETHERION(css/scenes.css .crest-word)이 쓰는 입체 필터. 단위는 화면 px.
   굴곡(빛 왼쪽 위) + 두드린 금속 결 + 4px 두께. 문서에 한 번만 넣는다 */
(function () {
  const put = () => {
    if (document.getElementById("eth-crest-defs")) return;
    const offs = [1, 2, 3, 4].map(k => `<feOffset in="ex" dx="${(k * .25).toFixed(2)}" dy="${k}" result="e${k}"/>`).join("");
    document.body.insertAdjacentHTML("beforeend", `<svg id="eth-crest-defs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>
      <filter id="ethBevelCrest" x="-6%" y="-30%" width="112%" height="190%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="b"/>
        <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="5" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .09 0 0 0 0" result="na"/>
        <feComposite in="b" in2="na" operator="arithmetic" k2=".8" k3="1" result="bump"/>
        <feDiffuseLighting in="bump" surfaceScale="2.6" diffuseConstant="1.1" lighting-color="#fff" result="dif"><feDistantLight azimuth="225" elevation="52"/></feDiffuseLighting>
        <feComposite in="SourceGraphic" in2="dif" operator="arithmetic" k1="1.22" result="sh"/>
        <feComposite in="sh" in2="SourceAlpha" operator="in" result="shA"/>
        <feSpecularLighting in="bump" surfaceScale="2.6" specularConstant="1" specularExponent="22" lighting-color="#fff6dc" result="sp"><feDistantLight azimuth="225" elevation="40"/></feSpecularLighting>
        <feComposite in="sp" in2="SourceAlpha" operator="in" result="spA"/>
        <feComposite in="shA" in2="spA" operator="arithmetic" k2="1" k3=".7" result="lit"/>
        <feFlood flood-color="#2a1a08"/><feComposite in2="SourceAlpha" operator="in" result="ex"/>${offs}
        <feFlood flood-color="#6b4a18"/><feComposite in2="SourceAlpha" operator="in"/><feOffset dy=".8" result="lip"/>
        <feMerge><feMergeNode in="e4"/><feMergeNode in="e3"/><feMergeNode in="e2"/><feMergeNode in="e1"/><feMergeNode in="lip"/><feMergeNode in="lit"/></feMerge>
      </filter></defs></svg>`);
  };
  if (document.body) put(); else document.addEventListener("DOMContentLoaded", put);
})();

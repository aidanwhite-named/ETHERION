/* ETHERION — 메뉴 화면의 장면 배경 (v3.0)
   그림은 모두 코드(SVG · CSS)로 그린다(docs/STYLE_GUIDE.md 0장). 하늘(별 · 에테르 입자 · 세 존재)은 그대로 두고,
   그 아래에 그 화면이 "어디인지"를 그린다. 글자와 카드보다 눈에 띄지 않게(불투명도 .35~.6).

   교역소 = 밤의 린데어 자유시 (docs/WORLD.md 10장 · 지도의 "린데어 자유시" · "린데어 환석")
     - 언덕 위 환석(돌고리 관문): 성로의 중심 관문. 하늘빛 에테르가 숨 쉬고, 보이지 않는 길(성로)이 점선으로 뻗는다
     - 하늘의 크로네아의 물레: 린데어에 신전이 있는, 어느 편도 들지 않는 운명의 신. 천천히 돈다
     - 항구 도시와 돛대, 물결에 비친 등불 · 세 진영의 깃발(세 진영이 유일하게 마주치는 곳)
     - 떠오르는 환석 조각(돈): 카드를 사고팔면 조각이 지갑과 카드 사이를 날아간다(shards)
   덱 조정실 = 운명의 감실 (전장의 덱 = "아직 오지 않은 운명"을 모신 아치 감실, STYLE_GUIDE 2.11)
     - 양옆 고딕 아치 열주와 단체 깃발(단체 색 · 문장)
     - 바닥의 마법진: 눈금 40개가 덱 장수만큼 켜진다. 40장이면 금빛으로 완성되어 돈다, 넘치면 붉다
     - 촛불 여덟 = 레벨 1~8. 그 레벨 카드가 많을수록 불꽃이 크다(덱의 레벨 곡선)
     - 저장하면 마법진이 한 번 봉인된다(seal) */
"use strict";

const Scenes = (() => {
  const f1 = n => +n.toFixed(1);
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();   // 고정 시드 (매번 같은 도시)

  /* ---------- 교역소: 밤의 린데어 ---------- */
  function harbor() {
    // 도시 지붕선 (가운데는 크로네아 신전의 둥근 지붕)
    let roofs = "M0,700", x = 0, wins = "";
    while (x < 1600) {
      const w = 34 + rnd() * 60, h = 560 + rnd() * 90 - (Math.abs(x - 800) < 260 ? 40 : 0);
      if (x > 735 && x < 865) { roofs += `L740,${f1(h)}L760,600A40,40 0 0,1 840,600L860,${f1(h)}`; x = 865; continue; }
      const peak = rnd() < .45;
      roofs += `L${f1(x)},${f1(h)}` + (peak ? `L${f1(x + w / 2)},${f1(h - 26 - rnd() * 30)}L${f1(x + w)},${f1(h)}` : `L${f1(x + w)},${f1(h)}`);
      if (rnd() < .7) for (let k = 0; k < 1 + rnd() * 3; k++) wins += `<rect class="sh-win" style="--d:${f1(rnd() * 9)}s" x="${f1(x + 6 + rnd() * (w - 16))}" y="${f1(h + 14 + rnd() * 40)}" width="5" height="8"/>`;
      x += w;
    }
    roofs += "L1600,700Z";
    // 탑 둘
    const towers = `<path d="M300,700V520L312,470L324,520V700Z"/><path d="M1268,700V500L1282,440L1296,500V700Z"/>`;
    // 신전 꼭대기의 작은 물레
    const spokes = [...Array(8)].map((_, k) => { const a = k * Math.PI / 4; return `M800,${528}L${f1(800 + Math.cos(a) * 18)},${f1(528 + Math.sin(a) * 18)}`; }).join("");
    // 돛대와 배
    const ships = [[180, 738, 1], [470, 744, .8], [1130, 740, .9], [1420, 736, 1.1]].map(([sx, sy, k]) =>
      `<g transform="translate(${sx},${sy}) scale(${k})"><g class="sh-ship" style="--d:${f1(sx / 300)}s"><path d="M-70,0Q0,22 70,0L60,-8H-60Z"/><path d="M-4,-8V-150M-34,-8V-110" stroke="#05060b" stroke-width="4"/><path d="M-4,-140L34,-60H-4ZM-34,-104L-8,-50H-34Z" fill="#0b0d16" stroke="rgba(217,180,106,.18)"/><circle class="sh-lamp" cx="-4" cy="-152" r="3"/></g></g>`).join("");
    // 물결 위 등불 반사
    const refl = [...Array(16)].map((_, k) => `<rect class="sh-refl" style="--d:${f1(rnd() * 4)}s" x="${f1(60 + k * 96 + rnd() * 40)}" y="${f1(770 + rnd() * 110)}" width="${f1(18 + rnd() * 40)}" height="2" rx="1"/>`).join("");
    // 환석 (언덕 위 돌고리 관문)
    const ring = [...Array(9)].map((_, k) => { const a = k / 9 * Math.PI * 2 - Math.PI / 2; return `<rect x="${f1(1180 + Math.cos(a) * 46 - 5)}" y="${f1(392 + Math.sin(a) * 46 - 11)}" width="10" height="22" rx="2" transform="rotate(${f1(a * 180 / Math.PI + 90)} ${f1(1180 + Math.cos(a) * 46)} ${f1(392 + Math.sin(a) * 46)})"/>`; }).join("");
    // 크로네아의 물레 (하늘)
    const wheel = `<g class="sh-wheel"><circle r="150"/><circle r="128" stroke-dasharray="2 9"/><circle r="22"/>${[...Array(12)].map((_, k) => { const a = k * Math.PI / 6; return `<path d="M${f1(Math.cos(a) * 22)},${f1(Math.sin(a) * 22)}L${f1(Math.cos(a) * 150)},${f1(Math.sin(a) * 150)}"/><circle cx="${f1(Math.cos(a) * 150)}" cy="${f1(Math.sin(a) * 150)}" r="3" class="sh-star"/>`; }).join("")}</g>
      <path class="sh-thread" d="M150,0C260,40 300,160 420,190S600,170 700,240"/>`;
    return `<svg class="sc-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      <defs>
        <radialGradient id="shGate" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e8f8ff" stop-opacity=".9"/><stop offset=".35" stop-color="#8fdcff" stop-opacity=".55"/><stop offset="1" stop-color="#8fdcff" stop-opacity="0"/></radialGradient>
        <linearGradient id="shSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1530"/><stop offset="1" stop-color="#05060b"/></linearGradient>
        <linearGradient id="shHill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121628"/><stop offset="1" stop-color="#07080d"/></linearGradient>
      </defs>
      <g transform="translate(250,230)" class="sh-sky">${wheel}</g>
      <path class="sh-road" d="M1180,392C1000,300 760,250 420,290M1180,392C1330,300 1460,250 1640,240M1180,392C1240,520 1100,620 980,700"/>
      <path d="M760,700C900,560 1060,420 1180,420S1460,560 1600,600V700Z" fill="url(#shHill)"/>
      <circle class="sh-gate" cx="1180" cy="392" r="110" fill="url(#shGate)"/>
      <g class="sh-stones">${ring}</g>
      <g class="sh-city">${towers}<path d="${roofs}"/><path d="${spokes}" stroke="rgba(217,180,106,.5)" stroke-width="2"/><circle cx="800" cy="528" r="18" fill="none" stroke="rgba(217,180,106,.55)" stroke-width="2"/>${wins}</g>
      <rect y="700" width="1600" height="200" fill="url(#shSea)"/>
      <rect class="sh-glint" y="704" width="1600" height="1.5"/>
      <g class="sh-refls">${refl}<ellipse class="sh-gate-refl" cx="1180" cy="760" rx="40" ry="90"/></g>
      <g class="sh-ships">${ships}</g>
    </svg>`;
  }
  /* 노점의 등불 줄과 세 진영 깃발 (HTML — 흔들리게) */
  function lanterns(side) {
    const n = 6, out = [];
    for (let k = 0; k < n; k++) out.push(`<i class="ln" style="--k:${k};--d:${(k * .37).toFixed(2)}s"></i>`);
    return `<div class="sh-string ${side}">${out.join("")}</div>`;
  }
  function shopHTML() {
    const fl = Object.keys(FACTIONS).map((f, i) => `<i class="sh-flag" style="--fc:${FACTIONS[f].color};--i:${i}">${typeof factionCrestSVG === "function" ? factionCrestSVG(f) : ""}</i>`).join("");
    const shards = [...Array(14)].map((_, k) => `<i class="sh-shard" style="--x:${(4 + k * 7 + rnd() * 4).toFixed(1)}%;--d:${(rnd() * 14).toFixed(1)}s;--t:${(11 + rnd() * 9).toFixed(1)}s;--s:${(.6 + rnd() * .8).toFixed(2)}"></i>`).join("");
    return `<div class="scene scene-shop" aria-hidden="true">${harbor()}${lanterns("l")}${lanterns("r")}<div class="sh-flags">${fl}</div>${shards}</div>`;
  }

  /* ---------- 덱 조정실: 운명의 감실 ---------- */
  function colonnade() {
    // 뾰족 아치 기둥 열 (양옆) — 사이로 하늘이 보인다
    const arch = (x, w, top) => `M${x},900V${top + w * .9}Q${x},${top} ${x + w / 2},${top - w * .25}Q${x + w},${top} ${x + w},${top + w * .9}V900`;
    const pillars = (x0, dir) => {
      let d = "";
      for (let k = 0; k < 3; k++) {
        const x = x0 + dir * k * 120, w = 90 - k * 12, top = 210 + k * 70;
        d += `<path class="ed-arch" d="${arch(x - (dir < 0 ? w : 0), w, top)}"/>`;
      }
      return d;
    };
    return `<svg class="sc-svg ed-cols" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      <defs><linearGradient id="edShaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e2a8" stop-opacity=".09"/><stop offset="1" stop-color="#f6e2a8" stop-opacity="0"/></linearGradient></defs>
      <g class="ed-shafts"><path d="M520,0L640,0L860,900L560,900Z" fill="url(#edShaft)"/><path d="M930,0L1010,0L1180,900L960,900Z" fill="url(#edShaft)" style="animation-delay:-6s"/></g>
      <g class="ed-pillars">
        <path d="M0,0H260V140Q130,200 0,150Z"/><path d="M1600,0H1340V140Q1470,200 1600,150Z"/>
        <path d="M0,900V160L40,150V900Z"/><path d="M1600,900V160L1560,150V900Z"/>
        ${pillars(70, 1)}${pillars(1530, -1)}
      </g>
      <path class="ed-floor" d="M0,770Q800,700 1600,770V900H0Z"/>
    </svg>`;
  }
  function circle40() {
    const N = RULES.deckSize, ticks = [];
    for (let k = 0; k < N; k++) {
      const a = k / N * Math.PI * 2 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      ticks.push(`<path class="tk" data-k="${k}" d="M${f1(c * 186)},${f1(s * 186)}L${f1(c * 208)},${f1(s * 208)}"/>`);
    }
    const star = [...Array(8)].map((_, k) => { const a = k * Math.PI / 4; return `${f1(Math.cos(a) * 150)},${f1(Math.sin(a) * 150)}`; });
    const oct = `M${star.join("L")}Z`, oct2 = `M${[0, 3, 6, 1, 4, 7, 2, 5].map(i => star[i]).join("L")}Z`;
    return `<div class="ed-circle"><svg viewBox="-240 -240 480 480">
      <circle class="rc-glow" r="214"/>
      <circle class="rc-l" r="226"/><circle class="rc-l" r="180" stroke-dasharray="3 7"/>
      <g class="rc-spin"><path class="rc-l" d="${oct}"/><path class="rc-l dim" d="${oct2}"/><circle class="rc-l" r="104"/><circle class="rc-l dim" r="62" stroke-dasharray="1 5"/></g>
      <g class="rc-ticks">${ticks.join("")}</g>
      <circle class="rc-core" r="30"/>
    </svg></div>`;
  }
  function candles() {
    return `<div class="ed-candles">${[1, 2, 3, 4, 5, 6, 7, 8].map(l => `<span class="cd" style="--i:${l}"><i class="cd-flame"></i><i class="cd-wax"></i><small>${l}</small></span>`).join("")}</div>`;
  }
  function editorHTML(o) {
    const G = GROUPS[o.f], em = typeof groupEmblem === "function" ? groupEmblem(o.f) : "";
    const banner = side => `<div class="ed-banner ${side}" style="--gc:${G.color}"><span class="bn-cloth">${em}<b>${esc(G.name)}</b></span></div>`;
    return `<div class="scene scene-editor" aria-hidden="true" style="--gc:${G.color}">${colonnade()}${banner("l")}${banner("r")}${circle40()}${candles()}</div>`;
  }

  /* ---------- 날아가는 환석 조각 (교역소: 지갑 ↔ 카드) ---------- */
  function shards(from, to, n) {
    if (!from || !to || (typeof Bg !== "undefined" && Bg.reduced)) return;
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const ax = a.left + a.width / 2, ay = a.top + a.height / 2, bx = b.left + b.width / 2, by = b.top + b.height * .45;
    for (let k = 0; k < n; k++) {
      const s = document.createElement("i"); s.className = "fly-shard";
      s.style.left = ax + "px"; s.style.top = ay + "px"; document.body.appendChild(s);
      const mx = (ax + bx) / 2 + (Math.random() - .5) * 220, my = Math.min(ay, by) - 60 - Math.random() * 120;
      s.animate([
        { transform: "translate(-50%,-50%) scale(.4) rotate(45deg)", opacity: 0 },
        { transform: `translate(calc(${mx - ax}px - 50%),calc(${my - ay}px - 50%)) scale(1.1) rotate(${200 + k * 30}deg)`, opacity: 1, offset: .45 },
        { transform: `translate(calc(${bx - ax + (Math.random() - .5) * 40}px - 50%),calc(${by - ay + (Math.random() - .5) * 40}px - 50%)) scale(.3) rotate(${400 + k * 40}deg)`, opacity: 0 }
      ], { duration: 640 + Math.random() * 260, delay: k * 34, easing: "cubic-bezier(.45,.05,.35,1)" }).onfinish = () => s.remove();
    }
  }

  let edRoot = null;
  return {
    html(kind, o) { return kind === "shop" ? shopHTML() : kind === "editor" ? editorHTML(o || {}) : ""; },
    bind(root, kind) {
      const sc = root.querySelector(".scene"); if (!sc) return;
      if (kind === "editor") edRoot = sc;
      // 마우스를 따라 아주 조금 움직인다(가까운 것일수록 많이)
      if (typeof Bg !== "undefined" && Bg.reduced) return;
      const mv = e => { if (!sc.isConnected) { removeEventListener("pointermove", mv); return; } sc.style.setProperty("--mx", (e.clientX / innerWidth - .5).toFixed(3)); sc.style.setProperty("--my", (e.clientY / innerHeight - .5).toFixed(3)); };
      addEventListener("pointermove", mv);
    },
    /* 덱 조정실: 마법진 눈금(덱 장수)과 촛불(레벨 곡선) */
    editorState(n, lvN) {
      const sc = edRoot; if (!sc || !sc.isConnected) return;
      const N = RULES.deckSize;
      sc.querySelectorAll(".tk").forEach((t, k) => t.classList.toggle("on", k < n));
      sc.classList.toggle("full", n === N); sc.classList.toggle("over", n > N);
      sc.style.setProperty("--fill", Math.min(1, n / N).toFixed(3));
      const mx = Math.max(4, ...lvN);
      sc.querySelectorAll(".cd").forEach((c, k) => { c.style.setProperty("--f", (lvN[k] / mx).toFixed(3)); c.classList.toggle("lit", lvN[k] > 0); });
    },
    seal() { const sc = edRoot; if (!sc || !sc.isConnected) return; sc.classList.remove("sealed"); void sc.offsetWidth; sc.classList.add("sealed"); },
    shards
  };
})();

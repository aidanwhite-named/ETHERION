# ETHERION — 기본 카드 프레임 일러스트 프롬프트 (v3 규격)

> **기준:** 2026-11-20 확정 v3 카드 레이아웃 (`css/cardtext.css` 끝 "v3 규격" 절, `js/view.js`) · `docs/STYLE_GUIDE.md` 1.1~1.2 · 3.1 · 3.3 · 6.6  
> **장수:** 깃발 9개 × (유닛 프레임 + 마법 프레임 + 아이템 프레임 + 레벨 아이콘) = **36장** (프레임 27 + 아이콘 9). 아이템 99장도 모두 깃발에 속한다(깃발마다 11장).  
> **게임 적용(2026-11-20, 유닛만):** `img/ui/frames/frame_<ID>_unit.jpg`(600×840, 그림 창을 게임 그림 자리에 맞춰 늘린 것 — `tools/art/frames_wip/fit_frame.py`) · 배치 `css/frames.css` · 규칙 STYLE_GUIDE 3.1(v6.25). 아래 1절의 좌표 중 레벨 문장 숫자는 "정가운데"로, 이름 자리는 y 1.6~7.7%로 바뀌었다. 종류 줄은 없앴다.  
> **저장 위치(예정):** 프레임 `img/ui/frames/frame_<ID>_unit.png` · `_spell.png` · `_item.png` (예: `frame_B1_unit.png` — 가운데 일러스트 창은 투명 컷아웃) · 아이콘 `img/ui/pips/pip_<ID>.png`  
> **색:** 깃발 색 · 재료는 **그림 자체에 담는다**(코드가 진영색을 얹지 않음). 등급 색 테두리만 코드가 맨 바깥에 얹는다(한 장을 모든 등급이 같이 쓰므로).  
> **카드 크기:** 작은 카드 sm · md · lg(96 · 138 · 220px)는 짜임이 같아 **한 장을 줄여 쓴다.** 크게 보기도 5:7로 고정하고 글이 넘치면 글 상자만 스크롤 → 같은 그림.  
> **카드 종류:** 짜임(창 · 글 자리)은 셋이 같고, 재료와 액자 마감으로 유닛 · 마법 · 아이템을 가른다(3절 끝 "카드 종류 줄"). 등급은 맨 바깥 테두리 색(코드)이라 겹치지 않는다.  
> **그리는 법:** **깃발마다 새 대화 하나.** 처음에 `COMMON BASE` + 그 깃발 블록 + `UNIT` 줄을 이어 붙여 유닛 프레임을 그리고, 같은 대화에서 `SPELL` 줄 → `ITEM` 줄을 차례로 넣어 같은 프레임의 다른 판을 받는다(셋이 한 벌로 맞게). ``` 안의 영어만 넣는다. 프롬프트에는 종족 이름을 쓰지 않는다 — 깃발 이름 · 원소 · 재료로만 그린다(`tools/art/PROMPT_GUIDE.md` v1.3).

---

## 1. 공통 규격 & 절대 규칙 (프레임 27장 동일)

- **비율 / 권장 해상도:** `5 : 7` 세로 직사각형 (`1000 × 1400 px` 원본 → 게임 적용 시 `600 × 840 px` 투명 PNG)
- **외곽:** 둥근 모서리(`border-radius: ~3.6%`), 화면 끝까지 꽉 차는 **완전 정면 2D UI 에셋** (원근 기울임 · 바깥 그림자 · 책상 배경 없음).
  - 맨 바깥 **약 1.5%(가로) · 1%(세로)는 코드가 등급 색 테두리(`--gr`, `.14em`, 핸드 `.2em`)로 덮는다.** 그림의 바깥 테두리는 이 안쪽에 얇게만 — 두꺼운 금속 테두리를 그리면 등급 테두리와 겹쳐 두 겹이 된다.
- **내부 네모칸 절대 금지:**
  - 상단 제목 칸, 왼쪽 레벨 핍 칸, 하단 종류 줄, 글 상자, 우측 공·방·체 칸에 **어떠한 테두리 선·네모 박스·칸막이도 그리지 않는다.** (종류 줄 밑 가는 금선은 코드가 긋는다.)
  - **테두리는 '바깥 카드 가장자리'와 '가운데 일러스트 창 액자' 두 곳만 존재한다.**
- **좌표 규격 (라이브 CSS 작은 카드 `.card.fm` 기준 — 카드 폭 = 10em, 키 = 14em, 등급 테두리 .14em 포함해 잰 값):**
  - **왼쪽 위 레벨 문장 (코드가 얹음, 2026-11-20 B1 시험 뒤 결정):** 에테르 제단 그림(`img/ui/ether/ether_back.png` — 위 신 · 왼쪽 아래 거인 · 오른쪽 용 + 룬 고리)을 폭의 28%(2.8em) 크기로, 고리 가운데를 `(x 6%, y 4.3%)`(.6em, .6em)에 둔다. 위 · 왼쪽이 카드 밖으로 잘리고(구슬도 살짝 잘림, 신은 날개 끝만) 오른쪽 용 · 고리 · 거인 어깨가 남는다. 고리 구멍(카드 폭의 약 10%) 안은 **깃발 원소색 구슬**(코드, `--el` 방사 그라데이션) + 레벨 숫자(Cinzel 900, .85em, 보이는 쪽으로 살짝 오른쪽 아래). 용이 그림창 왼쪽 위를 조금(가로 ~10% · 세로 ~5%) 넘는다 — 입체감으로 둔다. 문장에 그림자(`drop-shadow`). 프레임 그림은 이 자리(`x 0~19%`, `y 0~13%`)를 차분한 바탕으로 비워 둔다.
  - 상단 헤더 (1줄 이름): `y = 0% ~ 10%`, 이름 `x = 19.5% ~ 96.4%` — 이름 글자는 지금 크기(.84em) 그대로. 머리 위아래 틈만 줄여(.2 → .14em, 머리 뒤 .12 → .06em) 창 위를 10%에 맞춘다.
  - 왼쪽 레벨 아이콘 열: `x = 0% ~ 10%` — 아이콘은 지금 크기(.5em) 그대로 `x 3.6~8.6%`, 첫 칸 `y = 13.6%`(레벨 문장 아래)부터 한 칸 `.58em`(높이의 4.1%)씩, 8레벨이면 `y ≈ 47%`까지.
  - **가운데 일러스트 창 (유일한 내부 액자):** 창 안쪽 = `x = 10% ~ 96.5%`, `y = 10% ~ 64%`
    - **액자(bezel)는 창 바깥쪽으로만, 두께 1% 안팎.** 오른쪽 여백은 2.2%뿐이라 굵은 액자는 바깥 테두리와 겹친다. 창 모서리는 살짝 둥글게(`.3em` ≈ 폭의 3%).
  - **하단 통합 영역 (종류 · 설명 · 공방체):** `y = 64.9% ~ 97.4%` — 종류 줄 `y = 64.9% ~ 75.1%`, 글 상자 `y = 76.1% ~ 97.4%`, 유닛의 공방체 열 `x = 79.9% ~ 96.4%`. 네모 박스 없이 깃발 질감이 자연스럽게 이어지되, 밝은 글씨·숫자(초록 버프·빨강 디버프·호박 오라·하늘 능력 칩)가 선명히 읽히도록 **짙고 어두운 톤(`#090a10`~`#16141d` 명도)**으로 부드럽게 가라앉힌다.
- **등급 테두리:** 등급 색(`--gr`)과 스페셜 광휘(`.c-spfx`)는 코드가 위에 얹으므로, 프레임 바깥 테두리는 과하게 두껍지 않은 얇은 금속/석재 마감으로 유지한다.
- **문자/기호 금지:** 글자, 숫자, 아이콘, 캐릭터, 배경 일러스트 일절 없음.
- **게임 적용 메모 (그림과 별개, 코드 작업 때 볼 것):**
  - 이 좌표는 **작은 카드**(덱 보기 · 상점 · 덱 조정실, `.card.fm`)용이다. sm · md · lg는 모두 em(폭의 10%)으로 맞춰 비율이 같다.
  - **크게 보기(`size-full`)**: 지금은 그림 창이 4:5로 폭에 맞춰지고 글 상자가 글만큼 늘어나 **카드마다 키가 다르다**(글이 짧아도). 결정(2026-11-20): 5:7로 고정하고 창 · 헤더 · 핍 자리를 위 퍼센트에 맞추고, 글이 넘치는 몇 장만 글 상자 안에서 스크롤 → 같은 프레임 그림을 쓴다. (코드 작업 따로.)
  - **전장 · 핸드의 간단한 카드(`slim`)**: 글자가 밀리는 게 아니라 짜임이 다르다 — 그림이 카드 전체를 덮고 이름 · 레벨 아이콘 · 공방체가 그림 위에 얹힌다(`css/slim.css`). 일러스트 창이 없어 프레임 그림을 쓰지 않고 **지금 코드 그대로 둔다**(2026-11-20 — 작게 보이는 카드라 그림을 크게 보이는 쪽이 낫고, 누르면 프레임이 있는 크게 보기가 뜬다).
  - 지금 코드는 마법 틀을 진영색 18%로 어둡게, 아이템 틀을 바랜 금빛으로 칠해 종류를 가른다(`STYLE_GUIDE` 3.1). 그림 프레임으로 바꾸면 이 구분을 종류별 프레임이 맡는다.

---

## 2. 공통 프롬프트 틀 (각 깃발 프롬프트 앞에 글 전체를 붙여 넣는다)

```text
COMMON BASE:
Front-facing orthographic 2D dark-fantasy trading card game (TCG) blank card frame template, strict 5:7 vertical portrait aspect ratio (1000x1400), full bleed to edges with subtly rounded corners, NO outside background, NO 3D perspective tilt, NO drop shadow.
LAYOUT (CRITICAL — ONLY TWO BORDERS EXIST: a very thin outer card rim and the slim beveled artwork window frame):
- The outermost ~1.5% of the card is a plain dark edge (a colored border is added later in code); keep any outer rim very thin and inside it.
- Large rectangular artwork window with slightly rounded corners, its inner opening at x=10% to 96.5%, y=10% to 64% (on a 1000x1400 canvas: from pixel x=100 to x=965 and from y=140 to y=896). The window is BIG: it fills the whole upper two-thirds of the card and is almost as tall as it is wide (about 8:7). Its bottom edge sits at two-thirds of the card height. Fill the whole opening with pure flat solid neutral dark gray (#202020) so card art can be cut out cleanly. The window bezel is slim (about 1% of the card width) and sits just outside the opening.
- Top header strip (y=0% to 10%) and narrow left vertical margin (x=0% to 10%, alongside the artwork window): continuous dark faction-textured surface with NO boxes, NO rectangles, NO divider lines. Inside the left margin, the strip from x=3% to x=9% stays calm and dark (small icons go there later); any edge accents stay on the outer rim side of it.
- Top-left corner (x=0% to 19%, y=0% to 13%): calm, plain dark texture — a round emblem is placed there later. Small, delicate corner fittings sit tight in the other three corners, each within the outermost 5% of the width and height; the two bottom corners stay especially small so the bottom area stays open.
- Bottom third (y=65% to 100%): one seamless, open, dark faction-textured surface that softly fades darker (#0a0b12) toward the center-bottom for high text legibility — STRICTLY NO text box border, NO stat box border, NO internal frames, NO divider lines, NO bottom gem.
DEPTH: give the frame real physical depth — the artwork window bezel stands raised above the surface and casts a soft shadow onto it, the outer edge has a slightly raised border band, the surface has layered relief with gentle ambient occlusion in the recesses, and the banner's sculpted relief accents (below) rise along the left and right outer edges and sit small in the lower corners, catching a warm rim light from the upper right. The center of the bottom third stays smooth and dark for text.
RESTRICTIONS: ZERO text, ZERO letters, ZERO numbers, ZERO symbols, ZERO icons, ZERO illustrations inside the window. High-craft painterly dark-fantasy game UI material texture, refined and uncluttered.
```

---

## 3. 깃발 블록 9개 + 카드 종류 줄 3개

### B1 · 도르마크의 심장불 (아다만트 연합 · 화염 `#ff6b3d` / 구리 `#d4893a`)
- **질감/소재:** 그을린 검은 무쇠와 두드린 구리판, 작은 리벳, 은은한 용광로 잿불 기운
```text
FACTION THEME (Dormak's Heartfire banner — fire element, Adamant Union): Forged soot-darkened black iron and burnished dark copper-brass surface (#2a1a12 to #0e0b0c) with subtle hammered metal grain, tiny antique brass rivets along the outer corners, and a sleek beveled dark-gold/copper artwork window frame with faint warm ember-orange (#ff6b3d) inner hairline reflections. Bottom text area is deeply darkened smoked iron for crisp text contrast. Moody, tactile forge-crafted aesthetic, not cluttered. Sculpted relief accents: riveted iron bands like cannon-barrel hoops, flame-shaped forged metalwork, and molten ember seams glowing in deep cracks.
```

### B2 · 소르그림의 방패 (아다만트 연합 · 금속 `#a9b4c2` / 강철)
- **질감/소재:** 단단한 강철 장갑판, 기하학적 각인 선, 리벳과 황동 이음새
```text
FACTION THEME (Sorgrim's Shield banner — metal element, Adamant Union): Heavy brushed gunmetal steel and dark slate-iron armor plating (#222730 to #0c0e13) with crisp geometric fortress-forged chamfered edges, subtle recessed steel bolts at the outer corners, and a machined steel-and-aged-brass beveled artwork window frame with cool silver-steel (#a9b4c2) metallic highlights. Bottom text area is smooth dark brushed obsidian-steel. Solid, industrial, fortress-forged craft. Sculpted relief accents: interlocking gears, stamped steel crests, piston joints, and glowing forge seams between thick layered plates.
```

### B3 · 케라운의 벼락 (아다만트 연합 · 번개 `#ffd84a` / 황동·코일)
- **질감/소재:** 어두운 남색 에나멜 금속과 정교한 황동 구리선 세공, 미세한 호박빛 번개 문양
```text
FACTION THEME (Keraun's Thunder banner — lightning element, Adamant Union): Dark midnight-blue enameled metal and polished antique brass (#1c1d2a to #0b0c14) with delicate clockwork-like brass filigree hairline etchings and fine copper coil accents tucked subtly along the outer edges, framing a refined brass-and-gold beveled artwork window with faint electric-gold (#ffd84a) metallic sheen. Bottom area is smooth dark indigo-slate for crisp legibility. Sculpted relief accents: wound copper coils, small lightning-rod spires, brass gauges, and thin arcs of light leaping between electrodes.
```

### G1 · 고르바스의 발톱 (푸른숲 맹약 · 대지 `#b88a5a` / 돌·가죽·뼈)
- **질감/소재:** 거칠게 다듬은 어두운 현무암 돌판, 무두질한 짙은 가죽, 닳은 청동과 뼈 장식
```text
FACTION THEME (Gorvath's Claw banner — earth element, Verdant Covenant): Weathered dark basalt stone and heavy dark-brown oiled leather texture (#241b15 to #0e0c0a) with rugged chiseled stone edge wear, subtle aged bronze and carved bone-ivory corner accents, and a stout hammered-bronze beveled artwork window frame tinted with warm earth-ochre (#b88a5a). Bottom area is dark smoked leather-stone surface, clean and uncluttered for text. Sculpted relief accents: carved bone and fang ornaments, deep claw-gouges in the stone, knotted rope bindings, and cracked earth.
```

### G2 · 베르단의 뿔 (푸른숲 맹약 · 숲 `#58b85f` / 고목·이끼·덩굴)
- **질감/소재:** 깊은 밤숲의 어두운 고목 나무껍질, 촉촉한 비취빛 이끼, 가는 덩굴과 청동 장식
```text
FACTION THEME (Verdan's Antler banner — forest element, Verdant Covenant): Deep dark ancient-bark woodgrain and shadowed forest stone (#132118 to #090f0c) with subtle velvety dark-emerald moss nestled along the outer corners, slender organic vine-like aged-bronze filigree tracing the beveled artwork window frame with muted forest-green (#58b85f) accents. Bottom area is smooth deeply-shaded heartwood for clean text readability. Sculpted relief accents: twisting roots and antler-like branches, thorny briars, amber sap beads, and softly glowing moss.
```

### G3 · 마렌시아의 노래 (푸른숲 맹약 · 물 `#4fb3ff` / 진주·은세공·심해석)
- **질감/소재:** 깊은 석호빛 어두운 청록 대리석, 물결무늬 은세공, 은은한 자개·진주 광택
```text
FACTION THEME (Marencia's Song banner — water element, Verdant Covenant): Deep abyssal teal-navy polished lagoon stone (#10222e to #080f17) with graceful flowing wave-curved tarnished silver filigree along the outer edges, tiny mother-of-pearl sheen accents at the corners, and a sculpted silver-and-pale-gold beveled artwork window frame with soft cerulean waterlight (#4fb3ff) reflections. Bottom area is calm deep-sea navy slate. Sculpted relief accents: coral branches, spiral shells, pearls, and rippling water rings carved in layered stone.
```

### A1 · 모르카스의 그믐 (비술 성회 · 암흑 `#8b5cf6` / 흑요석·자수정)
- **질감/소재:** 날카롭게 깎은 흑요석과 어두운 자수정빛 쇠, 가느다란 고딕 뾰족 아치 세공
```text
FACTION THEME (Morkas's New Moon banner — dark element, Arcane Conclave): Dark volcanic obsidian and blackened wrought iron (#1d1329 to #0a0810) with sharp gothic-baroque dark-silver filigree hairlines and faint amethyst-violet (#8b5cf6) sheen along the sculpted artwork window bezel, subtle dark plum-violet shadow depth around the edges. Bottom area is deep velvety obsidian-indigo for high text readability. Sculpted relief accents: heavy chains, blood-wax seals on curled contract scrolls, crescent-moon sigils, and drifting shadow smoke.
```

### A2 · 솔란테의 새벽 (비술 성회 · 빛 `#ffe9a8` / 상아석·백금·금박)
- **질감/소재:** 밤빛을 머금은 어두운 남청 대리석과 성스러운 금박 세공, 가느다란 빛살 각인
```text
FACTION THEME (Solante's Dawn banner — light element, Arcane Conclave): Deep twilight-navy cathedral marble and dark antique ivory-slate (#1c1d2b to #0c0d16) inlaid with refined dawn-gold gold-leaf filigree and subtle sunburst corner engravings, framing a luminous burnished-gold beveled artwork window with soft pale-sunlight (#ffe9a8) inner highlights. Bottom area stays deeply shaded midnight-marble so light text reads clearly. Sculpted relief accents: layered feathers of light, small wings, sunburst rays, and a rising-sun shield motif.
```

### A3 · 벨루미르의 별 (비술 성회 · 바람 `#9fe3d6` / 백은·옥빛·깃털선)
- **질감/소재:** 차가운 밤하늘 청회색 석재와 유려한 백은(실버) 바람결 세공, 얇은 깃털 곡선
```text
FACTION THEME (Belumir's Star banner — wind element, Arcane Conclave): Sleek dark storm-slate and misty teal-charcoal stone (#142326 to #090e12) adorned with ultra-slender sweeping wind-curve white-silver filigree and delicate feather-like metallic flourishes at the outer corners, framing a crisp platinum-silver beveled artwork window with pale wind-mint (#9fe3d6) metallic highlights. Bottom area is smooth dark slate-teal. Sculpted relief accents: sweeping wind streaks, fletched arrows riding the wind, long feathers, and tiny constellation glyphs.
```

### 카드 종류 줄 (깃발 블록 뒤에 하나씩)
같은 깃발의 세 판은 재료 · 색 · 짜임이 같고, 마감만 다르다. (제안 문구 — 첫 시험에서 셋이 잘 갈리는지 보고 다듬는다.)
```text
CARD TYPE — UNIT: the banner's materials at their most solid and martial — a sturdy, weighty window bezel with strong forged or carved corners; the plainest and boldest of the three versions.
```
```text
CARD TYPE — SPELL: the same frame as before, now darker and more arcane — a deeper shadowed surface, fine glowing etched rune lines in the element color running along the window bezel, and a faint element-colored light seeping from the edges of the window.
```
```text
CARD TYPE — ITEM: the same frame as before, now worked into a crafted relic case — aged leather wrapping along the sides, antique gold corner fittings and small clasps, and finely engraved metal plates, like a treasured reliquary of this banner.
```

---

## 4. 레벨 아이콘 9장 (프레임과 같은 날 함께)

카드 왼쪽 세로 열에 **레벨 수만큼** 위에서 아래로 쌓이는 아이콘이다(`js/view.js` `PIP` · `pipSVG` · `levelPips`, `STYLE_GUIDE` 3.3). 지금은 코드가 SVG로 그린다.

- **장수:** 깃발마다 1장 = **9장**(소환 칸 모양). 유닛 · 마법 · 아이템 모두 자기 깃발의 아이콘을 쓴다.
  - **소환 칸** `pip_<ID>.png` — **그 깃발의 원소색으로 꽉 찬** 실루엣(금속 · 보석 같은 은은한 명암, 밝은 쪽은 같은 색의 옅은 빛) + 같은 색의 은은한 빛. 깃발마다 색이 다르다. 
  - **유지비 칸**(매 턴 에테르를 먹는 칸)은 같은 그림을 코드가 바꿔 보인다 — 어둡게 누르고(`brightness`) 하늘빛 `#7fc8e8` 가는 테두리 · 옅은 빛(`drop-shadow`).
- **모양(지금 SVG와 같게):** B1 불꽃 · B2 육각 볼트 · B3 번개 · G1 휜 송곳니 · G2 잎 하나 · G3 물방울 · A1 도톰한 초승달 · A2 네 갈래 빛 십자성 · A3 위에서 아래로 좁아지는 세 줄 회오리(역삼각 계단).
- **크기:** 1:1, 생성 `512 × 512` → 게임용 `128 × 128 px` 투명 PNG. 실루엣이 캔버스의 약 85%를 채우고 가운데 정렬. 화면에서는 10~30px로 작게 보이므로 굵고 단순하게(가는 선 · 잔무늬 없음).
- **투명 바탕:** 투명 PNG로 받는다. 투명이 안 되면 **평면 단색 `#FF00FF`(마젠타)** 바탕으로 그리게 하고 후처리에서 지운다.
- **자리 (코드가 놓는다):** 작은 카드 기준 `x = 3.6% ~ 8.6%`(폭 .5em, 지금 크기), 첫 칸 `y = 13.6%`(레벨 문장 아래)부터 한 칸에 `4.1%`씩 아래로(8레벨이면 `y ≈ 47%`까지). 소환 칸이 위, 유지비 칸이 그 아래.
- **레벨 숫자:** 왼쪽 위 레벨 문장(에테르 제단 그림)의 구슬 안에 코드가 쓴다(1절).
- **적용:** PNG로 바꾸려면 `pipSVG`를 `<img>` + 유지비 칸 필터로 바꾸는 코드 작업이 따로 필요하다.

```text
ICON BASE (paste before one icon line, one icon per image):
Single game UI icon, flat front view, 1:1 square 512x512, one bold simple silhouette centered and filling about 85% of the canvas, clean crisp edges readable at 16 pixels. Solid filled in the element color given below, like enamel or a polished gem of that color: subtle painterly shading from a lighter tint of the same color at the top-left to a deeper shade at the bottom-right, and a soft glow of the same color hugging the shape. Transparent background (if transparency is impossible, use a perfectly flat solid #FF00FF background).

B1: a single flame, element color #ff6b3d
B2: a hexagonal bolt head, element color #a9b4c2
B3: a zig-zag lightning bolt, element color #ffd84a
G1: a curved fang, element color #b88a5a
G2: a single pointed leaf, element color #58b85f
G3: a water droplet, element color #4fb3ff
A1: a plump crescent moon, element color #8b5cf6
A2: a four-pointed radiant star, element color #ffe9a8
A3: three stacked horizontal bars narrowing downward like a whirlwind, element color #9fe3d6
```

**한 장에 9개 (시트) — 2026-11-20, GPT 무료용.** 한 번에 그리면 크기 · 굵기 · 명암이 저절로 맞는다. 받은 시트는 3×3 칸으로 잘라 마젠타를 지우고 128px로 줄인다(후처리). 마젠타 위에 빛 번짐을 그리면 지울 때 분홍 테가 남으므로 시트는 테두리를 또렷하게 그리고, 빛은 코드(`drop-shadow`)가 얹는다. 모양이 틀린 칸만 위 한 장짜리 틀로 다시 그린다.
```text
Game UI icon sheet, flat front view, 1:1 square 1024x1024, perfectly flat solid #FF00FF magenta background. Nine icons arranged in an evenly spaced 3x3 grid (three rows of three), each icon centered in its own cell and filling about 75% of the cell, with plenty of empty magenta space between icons; all nine share the same size, line weight and style. Each icon is one bold simple silhouette readable at 16 pixels, solid filled in its element color like enamel or a polished gem: subtle painterly shading from a lighter tint of the same color at the top-left to a deeper shade at the bottom-right. Each shape ends at a crisp clean edge directly against the flat magenta (a glow is added later in code). Zero text, zero labels, zero grid lines.
Row 1, left to right: a single flame (#ff6b3d); a hexagonal bolt head (#a9b4c2); a zig-zag lightning bolt (#ffd84a).
Row 2, left to right: a curved fang (#b88a5a); a single pointed leaf (#58b85f); a water droplet (#4fb3ff).
Row 3, left to right: a plump crescent moon (#8b5cf6); a four-pointed radiant star (#ffe9a8); three stacked horizontal bars narrowing downward like a whirlwind (#9fe3d6).
```

---

## 4.5 시험 기록
- **2026-11-20 B1 유닛, GPT 무료 3장** → `tools/art/frames_wip/` (README에 잰 값). 실제로 난 문제: ① 창이 짧게 나옴(아래 끝 55~58%, 게임 64%), ② 아래 귀퉁이 장식이 커서 공방체 · 글 상자 침범, ③ 왼쪽 불꽃이 레벨 아이콘 열에 걸침, ④ 같은 대화에서 고칠수록 창이 엇나감. → 공통 틀에 창 크기(픽셀 · 8:7) · 귀퉁이 5% · 왼쪽 3~9% 띠를 적었다. 새 대화 4번 그림(고친 틀)이 가장 가까웠고, 늘린 `b1_unit_gpt_try4_stretched.png`가 지금 기준 후보.
- **레벨 아이콘:** GPT 무료 시트 첫 그림이 그대로 쓸 만해 `img/ui/pips/pip_<ID>.png` 9장으로 잘라 두었다(`frames_wip/cut_pips.py`).
- 창이 또 짧게 나오면 `frames_wip/stretch_window.py`로 늘려 맞출 수 있다(귀퉁이는 그대로 두고 창 가운데 · 아래 바탕만 늘리고 줄임).

## 5. 오늘 밤 작업 순서 (추천)
1. **시험 생성 1장:** `B1` 프롬프트로 1장 먼저 생성
2. **가운데 일러스트 창 투명 컷아웃 + 실제 게임 CSS에 얹어 확인:** `SR-B1` · `SP-B1` · 마법 카드 1장에 입혀 가독성/비율 검증 (창이 1절 좌표에 오는지, 바깥 테두리가 등급 테두리와 겹치지 않는지)
   - 다듬어 정한 그림은 `tools/art/ref/frame_ref.png`로 두고, 이후 모든 프레임 대화에 **첨부**해 배치 · 테두리 굵기를 맞춘다(글 좌표보다 그림을 더 잘 따라간다).
3. **B1의 마법 · 아이템 판**을 같은 대화에서 받고, 셋이 한눈에 갈리는지 확인
4. **규격 확정 후 나머지 8깃발 × 3장** (`B2`, `B3`, `G1`, `G2`, `G3`, `A1`, `A2`, `A3`) — 깃발마다 새 대화
5. **레벨 아이콘 9장** (4절 — 시트 한 장에 9개를 그려 잘라 쓴다. 틀린 칸만 한 장짜리로 다시)

# 깃발 대표 문장 · 전장 깃발 명판 — 그림 프롬프트 (게임 v3.47)

GPT(이미지) · Gemini에 그대로 붙여 넣는 프롬프트다. 아홉 깃발(단체)마다 두 장, 모두 18장이다.
- 서사는 `docs/WORLD.md`와 `tools/art/PROMPT_GUIDE.md`의 "깃발 9개" 표(누구 · 재료 · 상징 · 고향 · 근원)를 따른다.
- 그림 규칙은 `docs/STYLE_GUIDE.md` 0 · 1.2 · 2.11을 따른다.

- **지금 게임**:
  - 단체를 나타내는 그림은 코드로 그린 **임시 문양**(`js/view.js` 등의 `glyphSVG`)이다. 잿불 고블린 = 화포, 무쇠수염 = 골렘 머리, 번개 노움 = 번개 … 같은 작은 아이콘이다.
  - 전장의 **깃발 명판**(에테르 왼쪽, `js/game.js` `nameplateHTML` · `css/flags.css`)은 코드로 그린 천, 단체색, 그 임시 문양이다.
  - v3.47부터 명판 안에는 **아이디**가 나오고, 그 아래에 **전적과 승률**(예: `12승 8패 │ 승률 60%`)이 나온다. 컴퓨터 쪽은 단체 이름이 나온다.
- **두 장의 관계**:
  - 1번(대표 문장)은 단체의 얼굴이다. 명판의 문장 방패 자리에 들어가고, 나중에 대기실 · 덱 조정실 · 순례 관문 같은 곳에도 같은 그림을 쓸 수 있다.
  - 2번(명판 천)은 문장이 올라가는 깃발 천이다. **2번에는 문장을 그리지 않는다.** 게임이 왼쪽에 1번 그림을 얹는다. 그래야 칸 크기가 바뀌어도 문장이 찌그러지지 않는다.
- **넣는 법**: 아래 파일 이름으로 저장하고 Claude에게 "깃발 그림 넣어 줘"라고 하면 된다.
  - 코드는 `js/game.js`의 `FLAG_ART` 한 줄이다: `{ emblem: "img/ui/emblem/{id}.png", plate: "img/ui/banner/{id}.png" }`. 한 장만 먼저 와도 그 줄만 채우면 된다.
  - 그림이 없는 깃발이 생기지 않게 아홉 장을 한 벌로 받는다.
- **이 파일이 대신하는 것**: `tools/art/prompts/ether_class_flags.md` 3절(단체 깃발 9개, `img/ui/flags/<ID>.png`)이다.
  - 그 프롬프트는 문장을 천에 수놓고 작은 아이콘(대포 · 골렘 · 번개)을 그대로 옮긴 것이다.
  - `img/ui/flags/`의 그림은 코드로 찍은 임시 그림이고, 게임은 쓰지 않는다.
- **한 벌로 보이게**:
  - 먼저 **B1** 한 장을 만들고, 마음에 들면 나머지 여덟 장은 B1 그림을 참고 이미지로 함께 넣는다.
  - 이때 이 문장을 덧붙인다: `Match the attached reference exactly in rendering style, framing, scale, lighting and level of detail; only the subject, materials and colours change.`

---

## 1. 단체 대표 문장 9장 — `img/ui/emblem/<ID>.png`

### 무엇을 그리나
- 그 단체를 **한 장으로 알아보게 하는 문장(紋章) 그림**이다. 작은 아이콘이 아니라 카드 일러스트와 같은 붓질의 **그린 문장**이다.
- 짜임은 셋이다: **가운데 상징 하나 + 그 단체의 재료로 만든 틀 + 그 힘의 근원(거인 · 용 · 신)의 표시**.
- 깃발마다 지금 임시 문양의 뜻은 이어받는다. 예를 들어 잿불 고블린은 여전히 "대포"다. 다만 서사(고향 · 근원)를 더해 그 단체만의 그림으로 만든다.
- 명판에서는 **카드 폭의 1/4 남짓(약 40~70px)** 으로 작게 보인다. 대기실 같은 곳에서는 200px까지 커질 수 있다. 그래서 **굵은 실루엣 + 안쪽의 섬세한 붓질**로 그린다.
- 바깥 모양은 둥근 배지가 아니다. 상징과 틀이 만드는 **불규칙한 실루엣**이고, 방패 칸(세로가 조금 긴 8:9)에 들어가게 **세로로 살짝 긴 덩어리**로 그린다.

### 크기 · 바탕
- **1:1 정사각, 1024×1024 PNG, 투명 바탕.** 문장은 가운데에 두고, 폭은 약 80%, 높이는 약 90%를 채운다(위아래 여백이 좁다).
- GPT는 배경을 투명(transparent)으로 고른다. Gemini가 투명을 못 만들면 `plain flat very dark background (#07080d)`로 바꿔 그리게 하고, 넣을 때 바탕을 지운다(Claude에게 넘기면 된다).

### 공통 꼬리 (각 프롬프트 끝에 이미 들어 있음)
`Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.`

### B1 잿불 고블린 · Cinder Goblins (아다만트 · 화염 `#ff6b3d`) — 지금 문양: 화포
**서사**: 포르탄 요새 제철소의 고블린 포병이다. 근원은 화산 속 거인 도르막의 심장불이다. "쏘고, 장전하고, 또 쏜다."
```
Heraldic emblem of the Cinder Goblins, goblin gunpowder artillery of a brass-and-steam alliance.
Centre: a short, fat brass mortar-cannon tilted upward on a small riveted iron carriage, its muzzle just fired — a burst of orange flame and a thick curl of gunpowder smoke rising and wrapping the top of the emblem. Behind the cannon, a glowing ember shaped like a great heart (the heart-fire of the sleeping volcano giant Dormak), cracked and pulsing orange-red.
Frame: two crossed matchlock muskets behind, a powder keg and a coiled lit fuse at the bottom, blackened iron straps and brass rivets, a pair of soot-smeared goblin goggles hung from the carriage.
Palette: fire orange #ff6b3d, brass #d4893a, blackened iron, soot black, glowing ember red; sparks flying upward.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: gunpowder and engineering, no magic circles, no elegant armour.
```

### B2 무쇠수염 드워프 · Ironbeard Dwarves (아다만트 · 금속 `#a9b4c2`) — 지금 문양: 골렘
**서사**: 지하 제철 도시 두르크하임의 대장장이와 그들이 만든 골렘이다. 근원은 거인 소르그림의 쇠 힘줄(철골 산맥)이고, 거울 비늘의 금속 용 페로스가 지켜본다. "강철은 물러서지 않는다."
```
Heraldic emblem of the Ironbeard Dwarves, master smiths of an underground forge-city.
Centre: the square, riveted face-plate of an iron golem seen from the front, two narrow eye slits glowing molten orange, a heavy braided iron beard of chain links hanging below it like a dwarf's beard.
Frame: a great forge hammer and a second hammer crossed behind the face, an anvil forming the base, thick grey adamant (petrified giant bone) plates with stamped steel crest patterns, gears and piston joints at the sides; thin glowing forge seams run through the metal like veins.
Palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange in the seams; a cold steel sheen against forge glow, a few anvil sparks.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: no thorns or plants, no wizardry; golems are machines, not undead.
```

### B3 번개 노움 · Thunder Gnomes (아다만트 · 번개 `#ffd84a`) — 지금 문양: 번개
**서사**: 피뢰 도시 볼타리움의 노움 학자이자 발명가다. 근원은 땅속을 회로처럼 뻗은 거인 케라운의 번개 신경이다. "모은 만큼 터진다."
```
Heraldic emblem of the Thunder Gnomes, scholar-inventors of a lightning-rod city.
Centre: a tall glass jar of captured lightning, a bright jagged bolt trapped and crackling inside it, wrapped in a spiral copper coil; on top of the jar a spiked brass lightning rod, struck by a small arc.
Frame: two copper electrodes curving up on both sides with blue-white arcs leaping between them, small brass gauges and dials, a rolled blueprint and insulated cables at the base; beneath everything, thin glowing yellow lines branch out like a circuit (the lightning nerves of the sleeping giant Keraun).
Palette: electric yellow #ffd84a, copper, cobalt-blue sparks, dark brass; harsh flickering arc light.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: science and machines, no wands or spell circles.
```

### G1 바위주먹 오크 · Rockfist Orcs (푸른숲 · 대지 `#b88a5a`) — 지금 문양: 송곳니
**서사**: 울부짖는 초원 가룬의 유목 오크 전사다. 늑대와 곰을 탄다. 근원은 등에 바위와 숲이 자라는 가장 큰 용, 대지의 용 고르바스다. "몰릴수록 송곳니는 날카로워진다."
```
Heraldic emblem of the Rockfist Orcs, nomad warriors of the howling steppe.
Centre: a huge clenched orc fist seen from the front, grey-green scarred knuckles wrapped in rope and studded with stone and obsidian, rust-red war paint stripes across it; the fist is cracking a slab of rock beneath it, dust bursting out.
Frame: two great curved boar-like tusks rising on either side like horns, a snarling wolf head on the left and a bear head on the right in rough carved wood and bone, a string of bone trinkets and feathers hanging below; the base is a chunk of earth with tiny rocks and grass on it, as if broken from the back of the colossal earth dragon Gorbas.
Palette: earth ochre #b88a5a, rust-red war paint, bone white, grey-green skin; dusty ochre light, rock dust in the air.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: no machinery, no elegant plate armour, no magic circles.
```

### G2 이끼 트롤 · Moss Trolls (푸른숲 · 숲 `#58b85f`) — 지금 문양: 고목
**서사**: 거목 도시 실바니엘(에일렌 대삼림)의 이끼 트롤과 트렌트다. 잘려도 다시 자란다. 근원은 고목 가지 뿔을 단 숲의 용 베르단이다. "뿌리는 뽑히지 않는다."
```
Heraldic emblem of the Moss Trolls and treants of an ancient forest city.
Centre: the First Elder Tree — a thick gnarled trunk with a wide round crown of leaves and moss, and deep roots spreading and gripping a stone at the bottom; one broken branch is visibly regrowing with fresh green shoots.
Frame: a ring of thorny briars and vines wound around the tree, two great branching antlers of ancient wood rising from behind the crown (the antlers of the forest dragon Verdan), amber sap drops, small glowing mushrooms and bioluminescent spores floating around.
Palette: forest green #58b85f, deep moss, bark brown, amber; dappled green light and soft glowing spores.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: living wood and moss, no fire, no metal armour.
```

### G3 푸른비늘 인어 · Bluescale Merfolk (푸른숲 · 물 `#4fb3ff`) — 지금 문양: 샘
**서사**: 석호 신전 셀레네아의 인어와 샘의 합창단 무녀다. 치유하고 씻어 낸다. 근원은 날개 대신 지느러미를 단 투명한 물의 용 마렌시아다. "물은 모든 상처를 씻는다."
```
Heraldic emblem of the Bluescale Merfolk and the shrine maidens of a lagoon temple.
Centre: a single large luminous pearl resting in an open scallop shell, a clear drop of water falling onto it and sending out rippling rings (song made visible).
Frame: a long translucent water dragon with fins instead of wings curling around the shell in an S-shape (the water dragon Marencia), branches of coral rising on both sides, a crossed pair of slender harpoons behind, strings of small pearls and a few bubbles; curling wave crests at the base.
Palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy; caustic underwater light and shimmering reflections.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: water and song, no fire, no heavy plate armour.
```

### A1 심연 마족 · Abyssal Fiends (비술 · 암흑 `#8b5cf6`) — 지금 문양: 심연(눈)
**서사**: 해 없는 협곡의 그림자 도시 녹타르의 계약자다. 대가(생명)를 내고 무엇이든 얻는다. 근원은 눈을 감고 저울을 든 얼굴 없는 신, 침묵의 군주 모르카스다. "대가를 치르면 무엇이든 얻는다."
```
Heraldic emblem of the Abyssal Fiends, demon pact-makers of a shadow city in a sunless canyon.
Centre: a pair of balanced scales of black iron and obsidian, perfectly level; above the beam, a single large CLOSED eye drawn in thin violet light (the sign of the faceless Silent Lord Morkas).
Frame: two long curved demon horns sweeping up on both sides like a crown, a rolled contract scroll hanging from one pan of the scales and sealed with a drop of blood-red wax, fine chains draped between the horns, wisps of shadow smoke curling from below.
Palette: violet #8b5cf6, black, obsidian, blood-red accents; cold violet underlight and deep shadow.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: elegant and ominous, no holy light, no cartoon devils, no gore.
```

### A2 성광 천족 · Radiant Seraphs (비술 · 빛 `#ffe9a8`) — 지금 문양: 빛과 검
**서사**: 흰 성벽의 새벽성 엘라드에 사는 천족과 인간 기사다. 동료 대신 맞고 지킨다. 근원은 여섯 빛 날개를 단 새벽의 어머니, 여신 솔란테다. "빛은 등 뒤의 동료를 지킨다."
```
Heraldic emblem of the Radiant Seraphs and the holy knights of a white-walled dawn citadel.
Centre: a tall white-and-gold tower shield, on its face a rising sun disc with a longsword pointing straight down through it.
Frame: six great wings of pale light spread behind the shield, three on each side (the six wings of the dawn goddess Solante), a thin golden halo above the shield, white feathers of light drifting down, a pair of lances crossed low behind.
Palette: holy light #ffe9a8, white, pale gold, soft sky blue; warm radiant backlight like a sunrise.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: protective and righteous, no demonic elements, no gore.
```

### A3 폭풍 하이엘프 · Storm High Elves (비술 · 바람 `#9fe3d6`) — 지금 문양: 소용돌이
**서사**: 구름을 뚫는 벨루미르의 바늘 첨탑에 사는 하이엘프 마법사다. 패를 돌려 원하는 카드를 찾는다. 근원은 천 개의 눈이 달린 옷을 입고 책을 든 별을 읽는 신 벨루미르다. "바람은 계획을 흩어 놓는다."
```
Heraldic emblem of the Storm High Elves, proud mages of cloud-piercing spires.
Centre: an open spellbook seen from the front, its pages torn loose and flying upward into a tight spiral whirlwind; at the eye of the whirlwind, a small bright four-pointed star.
Frame: a single needle-thin white spire rising behind the book through the whirlwind, a few faint constellations drawn as dotted silver lines around it, many tiny eyes subtly embroidered along the book's silver-and-teal cover (the robe of a thousand eyes of the star-reader god Belumir), long white feathers caught in the wind.
Palette: wind teal #9fe3d6, silver, white, starry indigo; cool teal-white starlight and streaks of wind.
Style: dark fantasy card game art, painterly digital painting with rich texture, dramatic rim light in the banner's element colour, small gold accents; the same finish as a premium card illustration, not a flat icon. Bold readable silhouette that still reads at 48 pixels, fine painterly detail inside. Centred, the emblem fills about 80% of the width and 90% of the height, slightly taller than wide; isolated on a transparent background. No circle badge, no square frame, no shield outline unless described, no text, no letters, no numbers, no runes as text, no signature, no watermark.
Stay true to the banner: wind, stars and books, no heavy armour, no fire.
```

### 받은 뒤 확인
- 48px로 줄여도 무엇인지 알아보는가(B1 대포, G1 주먹, A1 저울 …).
- 바탕이 투명한가. 가장자리에 흰 테나 검은 번짐이 남지 않았는가.
- 글자 · 룬 글씨 · 서명이 없는가.
- 아홉 장의 크기 · 붓질 · 빛이 한 벌로 보이는가. 한 장만 혼자 크거나 평면 아이콘이 되지 않았는가.
- 둥근 배지나 네모 틀에 갇히지 않았는가. A2만 방패가 상징이라 방패가 있다.

---

## 2. 전장 깃발 명판 9장 — `img/ui/banner/<ID>.png`

### 무엇을 그리나
- 전장 에테르 왼쪽에 걸리는 **가로 깃발 천**이다. 나와 상대가 하나씩 건다.
- 모양은 지금 코드 그림과 같다: **왼쪽에 짧은 금 장대, 가로로 펄럭이는 천, 오른쪽 끝은 제비꼬리(V자 홈).**
- 천의 색과 재료가 그 단체를 나타낸다(대표 색 + 재료 + 상징 무늬). 대표 문장(1번)은 게임이 얹으므로 **천에는 문장을 그리지 않는다.**
- 게임이 천 위에 얹는 것(왼쪽부터):
  1. **왼쪽 1/5**: 대표 문장(1번 그림).
  2. **가운데**: 큰 **아이디**(밝은 크림색 `#fff3d6`, 굵은 바탕체)가 있고, 그 아래에 작은 **전적 · 승률**(`12승 8패 │ 승률 60%`)과 공격/방어 표가 있다.
  3. **오른쪽 끝**: 제비꼬리 홈. 에테르 구슬이 살짝 걸친다.
- 그래서 칸마다 이렇게 그린다.
  - **왼쪽 1/5**: 잔잔하고 조금 더 어둡게 둔다. 문장 · 틀 · 무늬를 넣지 않는다.
  - **가운데(약 20~85%)**: 글자가 잘 읽히게 **어둡고 고르게** 둔다. 단체색이 은은히 섞인 짙은 천이다. 무늬는 같은 색으로 짠 아주 옅은 무늬(대비 10% 이하)만 둔다.
  - **테두리 · 제비꼬리 끝(약 85~100%)**: 단체의 재료와 상징을 여기에 넣는다. 놋쇠 리벳, 그을린 끝, 진주, 이끼, 깃털, 술 장식 같은 것이다.
- 화면에서는 칸 크기에 맞춰 늘어난다(대체로 가로 3.5~4.5배). 그래서 **4:1로 그리면 거의 찌그러지지 않는다.**

### 크기 · 바탕
- **4:1 가로, 2400×600 PNG, 투명 바탕.** 장대와 천이 그림 거의 끝까지 닿게 그린다(위아래 여백 약 4%).
- GPT는 투명을 고른다. Gemini가 투명을 못 하면 `plain flat very dark background (#07080d)`로 받는다. 천이 어두우니 바탕 지우기는 Claude에게 맡긴다.

### 공통 앞부분 (각 프롬프트에 이미 들어 있음)
`Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.`

### 공통 꼬리
`Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.`

### B1 잿불 고블린 — 그을린 붉은 주황 캔버스 · 놋쇠 리벳
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Cinder Goblins, goblin gunpowder artillery. Cloth: heavy canvas dyed deep scorched red-orange (#f06a48 mixed down to about 25% over near-black), soot stains, faint tone-on-tone pattern of tiny crossed cannons. Trim: riveted brass strips along the top and bottom edges with a line of small brass rivets; a row of cartridge loops on the lower trim. Swallowtail end: singed, burnt and slightly smouldering edges with a few glowing embers and a wisp of gunpowder smoke, a short lit fuse cord dangling from one tip.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### B2 무쇠수염 드워프 — 강철 회색 두꺼운 천 · 리벳 판
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Ironbeard Dwarves, master smiths with iron golems. Cloth: thick woven cloth in dark gunmetal steel-grey (#a3afbd mixed down to about 25% over near-black), faint tone-on-tone pattern of interlocking gears. Trim: narrow riveted iron plates along the top and bottom edges with a thin glowing forge-orange seam between plate and cloth. Swallowtail end: each tip capped with a heavy riveted iron plate, a short length of chain hanging from one tip, a few tiny forge sparks.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### B3 번개 노움 — 짙은 남색 천 · 호박 노랑 테 · 구리 코일
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Thunder Gnomes, scholar-inventors of a lightning-rod city. Cloth: deep navy cloth, faint tone-on-tone pattern of branching circuit lines. Trim: amber-yellow (#e9bd3c) piping along the top and bottom edges studded with tiny copper coil rivets. Swallowtail end: each tip ends in a small copper electrode, a thin crackling yellow-and-blue arc leaping between the two tips, a few sparks.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### G1 바위주먹 오크 — 흙갈색 가죽 · 뼈와 늑대털
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Rockfist Orcs, nomad warriors of the howling steppe. Cloth: rough tanned hide in dark earth-brown (#c99260 mixed down to about 25% over near-black), stitched from several pieces with leather cord, faint rust-red war-paint hand smears very low in contrast. Trim: thick leather lacing along the top and bottom edges. Swallowtail end: a fringe of wolf fur, small bone fangs and beads hanging from the tips, ragged edges with dust.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### G2 이끼 트롤 — 짙은 녹색 나무껍질 천 · 살아 있는 이끼
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Moss Trolls and treants of an ancient forest city. Cloth: woven bark-cloth in deep forest green (#5fbf7a mixed down to about 25% over near-black), faint tone-on-tone pattern of leaf veins. Trim: thin vines and small thorns running along the top and bottom edges, patches of living moss. Swallowtail end: the tips grow into small leafy twigs and hanging roots, a few tiny glowing spores and a drop of amber sap.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### G3 푸른비늘 인어 — 바다빛 비단 · 진주 테
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Bluescale Merfolk and water shrine maidens of a lagoon temple. Cloth: flowing silk in deep sea-blue (#5cb3e0 mixed down to about 25% over deep-sea navy), shimmering softly like water, faint tone-on-tone fish-scale pattern. Trim: a line of small pearls along the top and bottom edges. Swallowtail end: translucent fin-like edges, tiny shells and coral beads hanging from the tips, a few bubbles and drops of water.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### A1 심연 마족 — 검보라 벨벳 · 핏빛 밀랍 봉인
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Abyssal Fiends, demon pact-makers of a shadow city. Cloth: near-black violet velvet (#ac82dc mixed down to about 20% over black), faint tone-on-tone pattern of tiny closed eyes and sigils. Trim: thin black-and-violet braided cord with fine chain links along the top and bottom edges. Swallowtail end: tattered edges dissolving into wisps of shadow smoke, a blood-red wax seal pressed on one tip with a short ribbon of contract parchment hanging from it.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### A2 성광 천족 — 흰 비단 위 금 자수 (글자 칸은 어둡게)
흰 천은 크림색 글자가 안 보인다. 그래서 **바탕은 깊은 남색**으로 두고, 흰 비단과 금 자수는 테두리와 제비꼬리에 넣는다.
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Radiant Seraphs and holy knights of a dawn citadel. Cloth: deep twilight navy silk with a very faint warm golden sheen (#f0cf6a at about 12%), faint tone-on-tone pattern of small sun rays. Trim: broad bands of white silk with gold (#f0cf6a) embroidery along the top and bottom edges. Swallowtail end: the tips are white silk edged in gold, each ending in a soft white feather of light, a faint warm radiance.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### A3 폭풍 하이엘프 — 은빛 청록 비단 · 바람에 날리는 책장
```
Wide 4:1 horizontal war banner cloth for a dark-fantasy card game, 2400x600, isolated on a transparent background, seen straight from the front. A short ornate gold pole runs down the LEFT edge (about 3% of the width) with small finials at top and bottom; the cloth hangs horizontally from it, almost filling the image height, and ends on the RIGHT in a swallowtail (a V-shaped notch about 10% of the width deep) with a gentle wave. Layout rules: the LEFT fifth of the cloth next to the pole is calm, slightly darker cloth with NO emblem, NO frame and NO pattern (the game places the banner's emblem there). The MIDDLE of the cloth (from about 20% to 85% of the width) is dark, even and quiet so that large light cream text (#fff3d6) placed on it by the game is easy to read — only a very faint tone-on-tone woven pattern, contrast under 10%. Put the decoration on the thin trim border along the top and bottom edges and on the swallowtail end.
Banner: Storm High Elves, mages of cloud-piercing spires. Cloth: silk in deep starry indigo blending to dark teal (#6cc9c1 mixed down to about 25%), billowing more strongly than the others, faint tone-on-tone pattern of tiny star glyphs and dotted constellations. Trim: fine silver thread along the top and bottom edges. Swallowtail end: torn page fragments and a white feather fluttering loose from the tips in a streak of teal wind.
Style: dark fantasy, painterly digital painting, rich fabric texture, soft rim light along the edges, overall dark so text reads on it. No emblem or crest on the cloth, no text, no letters, no numbers, no signature, no watermark.
```

### 받은 뒤 확인
- 가운데(20~85%)에 크림색 큰 글자를 얹어도 잘 읽히는가. 밝은 무늬나 빛줄기가 없는가. A2는 특히 확인한다.
- 왼쪽 1/5에 문장 · 틀 · 무늬가 없는가(문장은 게임이 얹는다).
- 장대가 왼쪽, 제비꼬리가 오른쪽인가. 위아래가 거의 꽉 차는가.
- 바탕이 투명한가. 천에 글자나 서명이 없는가.
- 아홉 장의 장대 · 천 모양 · 크기가 같은가(B1을 참고 그림으로 넣었는가).

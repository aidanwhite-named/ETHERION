# ETHERION 카드 일러스트 프롬프트 가이드 — 등급별 (v1.1, 2026-11-10)

> **For any AI reading this (GPT, Gemini, Claude…):** this is the rulebook for writing image prompts for ETHERION card illustrations.
> Every prompt = **base style + grade tier + banner identity + level scale + card name/lore + type rule + safe-area/negatives.**
> Grade decides *how precious and ornate* the picture is; level decides *how big and powerful* the subject is; the banner decides *who and what it looks like*.
> Ready-made prompts for every existing card are in `tools/art/prompts/grades/<grade>.md`. For a **new** card, follow section 7.
> Write prompts in English (image models follow English best); the Korean card name stays in quotes for meaning only.

이 문서는 그림 AI(GPT Image · Gemini)에 넣을 카드 일러스트 프롬프트를 **등급별로 통일**하는 규칙이다. 지금 카드의 프롬프트는 모두 만들어 두었고(`tools/art/prompts/`), 앞으로 생길 카드도 이 문서대로 쓰면 같은 결이 나온다.
그림체의 바탕은 `docs/STYLE_GUIDE.md` 6장, 세계관은 `docs/WORLD.md`. 이 문서와 다르면 스타일 가이드가 이긴다.

- `<!-- AUTO:… -->` 칸은 `node tools/art/build_prompts.js`가 `tools/art/art_style.json`에서 채운다. **고칠 때는 art_style.json을 고치고 다시 돌린다** — 이 문서의 표만 고치면 다음에 덮인다. 나머지 글은 손으로 고쳐도 된다.

<!-- AUTO:COUNTS -->
프롬프트 버전 **g2** (2026-11-10) · 카드 797장 (뺀 카드 제외, 소환물 포함)

| 등급 | 색 | 장수 | 유닛 · 마법 · 아이템 | 등급별 프롬프트 파일 |
|---|---|---|---|---|
| 소환물 (Summoned token) | `#8fdcff` | 17 | 13 · 4 · 0 | `prompts/grades/token.md` |
| 일반 (Common) | `#f4f1ea` | 468 | 266 · 149 · 53 | `prompts/grades/common.md` |
| 고급 (Superior) | `#f2cf3d` | 124 | 78 · 31 · 15 | `prompts/grades/uncommon.md` |
| 레어 (Rare) | `#4ea8ff` | 46 | 9 · 28 · 9 | `prompts/grades/rare.md` |
| 강화 (Empowered) | `#3fe0c0` | 50 | 50 · 0 · 0 | `prompts/grades/upgrade.md` |
| 에픽 (Epic) | `#b46cff` | 62 | 36 · 17 · 9 | `prompts/grades/epic.md` |
| 유니크 (Unique) | `#ff8a2a` | 18 | 18 · 0 · 0 | `prompts/grades/unique.md` |
| 스페셜 (Special) | `#ff4d73` | 12 | 9 · 0 · 3 | `prompts/grades/special.md` |
<!-- /AUTO:COUNTS -->

---

## 0. 한눈에 — 세 축과 한 빛

| 축 | 정하는 것 | 예 |
|---|---|---|
| **등급** (일반 → 스페셜) | 얼마나 웅장하고 화려한가: 카메라 · 빛의 연출 · 배경의 넓이 · 장식 · 등급 강조색. **공들인 정도는 모든 등급이 같다** | 일반 = 눈높이 · 가까운 한 구석 / 스페셜 = 하늘을 채운 근원 존재 · 금빛 룬 고리 |
| **레벨** (1 → 8) | 얼마나 크고 강한가: 몸집 · 위압감 · 효과의 범위 | 1레벨 = 평범한 몸 / 7레벨 = 주변이 휘는 거대함 |
| **깃발** (9개) | 누구이고 무엇으로 만들어졌나: 종족 · 실루엣 · 재료 · 상징 · 고향 · 근원 | 잿불 고블린 = 작은 몸 + 커다란 대포 + 화약 연기 |
| **빛** | 원소색이 늘 주광(약 60%), 등급 강조색은 보조(15% 이하) | 바위주먹 오크 에픽 = 황토 빛 + 보랏빛 알갱이 조금 |

- **완성도 바닥선**: 모든 등급이 완성된 카드 일러스트다 — 얼굴 · 손 · 재질 · 빛을 공들여 그리고, 성격이 보이는 표정과 분명한 동작, 실제로 보이는 장소. 높은 등급은 규모 · 볼거리 · 장식을 더할 뿐 정성을 더하지 않는다(프롬프트의 `Quality floor` 줄).
- 등급과 레벨은 따로 논다. **일반 7레벨**은 거대하지만 배경이 가깝고 장식이 실용적이다. **유니크 5레벨**은 사람 크기여도 포스터 같은 영웅 초상이다.
- 높은 등급일수록 배경이 "가까운 벽 → 고향 → 랜드마크 → 근원 존재 → 세계 전체"로 멀고 커진다(깃발 표의 hint · home · landmark · source · mythic).
- 모든 그림: 밤하늘 남색 바탕(`#07080d`), 글자 · 숫자 · 틀 없음, 주인공은 가운데 70%, 위 15% · 아래 20%는 비움(카드 이름 · 숫자가 덮는다).

## 1. 파일 지도

| 파일 | 무엇 | 누가 고치나 |
|---|---|---|
| `tools/art/art_style.json` | **그림 말의 원본** — 등급 8칸(소환물 포함) · 레벨 · 깃발 9 · 진영 3 · 원소 · 종류 · 클래스 | 사람 / AI. 고치면 `version`을 올린다 |
| `tools/art/art_notes.json` | 카드별 그림 지시(영어). 스페셜 · 유니크는 반드시, 이름만으로 모습이 애매한 카드도 | 사람 / AI |
| `tools/art/build_prompts.js` | 위 둘 + 게임 데이터 → 카드마다 완성 프롬프트 | 거의 안 고침 |
| `tools/art/prompts/grades/<등급>.md` | **등급별 프롬프트 모음**(그 등급의 연출 틀 + 카드마다 완성본) | 자동 |
| `tools/art/prompts/cards/<깃발>.md` | 같은 프롬프트를 깃발별로 | 자동 |
| `tools/art/prompts/cards.jsonl` | 프로그램용(gen.py · artmap.py가 읽음) | 자동 |
| `tools/art/inbox/` | **받은 그림을 넣는 곳** — 파일 이름에 카드 ID나 카드 이름 | 사람 |
| `tools/art/artmap.py` | inbox의 그림을 카드에 연결해 `img/cards/<ID>.png`로 넣고 장부 · 보드를 새로 만든다 | 거의 안 고침 |
| `tools/art/art_map.csv` | **카드 ↔ 일러스트 장부**(엑셀로 열림). 상태 · 출처 · 모델 · 메모 | 사람(상태 · 메모 칸) + 자동 |
| `tools/art/art_board.html` | 장부를 그림으로 보는 판 — 등급 · 깃발 · 상태로 거르고 프롬프트 복사 | 자동 |

## 2. 프롬프트 조립 순서

빈칸 `{…}`을 채운다. `{G.*}`는 3장 등급 표, `{F.*}`는 5장 깃발 표, `{L}`은 4장 레벨 표에서 그대로 가져온다.

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: {G.tag}. {G.presence}.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "{카드 이름}". Depict exactly what this name describes.
Subject: {누구/무엇 — 유닛이면 계급 + 클래스, 마법이면 효과가 터지는 순간, 아이템이면 물건 하나}. {G.unit | G.spell | G.item}.
Art direction: {art_notes.json의 지시 — 있으면}
Scale (level {레벨} of 8): {L}.
Banner — {F.en}: {F.who}. Silhouette: {F.silhouette}. Materials: {F.materials}. Signature motifs: {F.motifs}.
Faction: {진영 문구}.
Lore (Korean, use for the scene): {분위기 글}
Game effect (Korean, mood only — never draw text or numbers): {효과 글}
Camera: {G.camera}.
Lighting: {G.lighting}; main light is {원소} ({원소색}) from behind the subject, {F.light}.
Background: very dark night-blue (#07080d) base; {G.background — {hint}/{home}/{landmark}/{source}/{mythic}을 깃발 값으로}; {원소 cue}.
Detail: {G.detail}.
Grade accent: {G.accent} — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: {G.mood}.
Stay true to the banner: {F.never}.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

- 마법 · 아이템도 같은 틀이다. 마법은 Banner 줄을 "magic of …, signature motifs …, palette …"로 줄인다(사람을 그리지 않는 장면이 많아서).
- **강화 카드**는 Subject 다음에 참고 그림 줄을 넣고, 원래 카드 그림(`img/cards/<원래 ID>.png`)이 있으면 그림 AI에 **함께 첨부**한다.
- `Quality floor` 줄(모든 등급 같은 완성도)은 Grade 줄 바로 다음에 늘 넣는다.
- 일반 등급은 Grade accent 줄을 빼고, 소환물은 등급 `token`을 쓴다.

## 3. 등급 사다리

### 3.1 한 장으로 비교

| | 일반 | 고급 | 레어 | 강화 | 에픽 | 유니크 | 스페셜 |
|---|---|---|---|---|---|---|---|
| 한마디 | 생생한 전장의 한 사람 | 검증된 베테랑 | 정예 · 걸작 | 셋이 하나로, 한 단계 위 | 영화 같은 영웅 | 이름난 전설의 초상 | 신화 · 키 아트 |
| 카메라 | 눈높이 · 미디엄 | 살짝 아래 · 자신감 | 3/4 낮은 각 · 대각선 | 원래 카드보다 가깝고 낮게 | 낮은 광각 · 규모 단서 | 가운데 · 거의 대칭 | 기념비적 낮은 각 |
| 화면 속 크기 | 55% | 60% | 65% | 원래 + 한 걸음 | 70% + 환경 | 70% | 75% + 거대한 배경 |
| 배경 | 가까운 한 구석(hint), 분위기 있게 | 흐린 고향(home) | 고향 랜드마크(landmark) | 원래 카드 배경 + 충격파 | 랜드마크 + 날씨 · 전장 | 랜드마크 + 근원 존재 실루엣 | 하늘을 채운 근원(mythic) + 룬 고리 + 아르케의 빈 원 |
| 빛 | 원소 역광 + 얼굴 키 라이트 | + 따뜻한 키 라이트 | + 사파이어 테두리 · 안개 | + 아래에서 솟는 청록 | 빛줄기 · 높은 대비 · 블룸 | 명암 대가 · 후광 같은 역광 | 신성한 진홍 · 금 오라 |
| 장식 | 실용적인 장비, 손때 · 흠집까지 | 단순 각인 · 개인 소품 | 세공 · 각인 무늬 | 보강 장비 · 셋의 표시 | 여러 겹 갑주 · 에너지 | 문장 · 걸작 무기 · 금 상감 | 몸이 승천의 길대로 바뀜 · 성당급 세공 |
| 강조색 | 없음 | 금 `#f2cf3d` 조금 | 사파이어 `#4ea8ff` 알갱이 | 청록 `#3fe0c0` 이음매 | 보라 `#b46cff` 알갱이 | 주황 금 `#ff8a2a` 불티 | 진홍 `#ff4d73` + 금 + 에테르빛 |

- 강조색은 게임의 등급 테두리 색과 같다 — 틀(코드가 칠함)과 그림이 서로 이어 보이게. 원소색을 덮지 않는다.
- 스페셜 · 유니크 · 레어는 **확실히 고급스러워야 한다**: 깊이 층(앞 · 가운데 · 먼 배경), 재질 표현, 테두리 빛, 공기 원근을 꼭 넣는다. 일반 · 고급도 같은 정성으로 그리되 **규모**로 구분한다 — 주인공이 화면에서 조금 작고, 배경이 가깝고 아담하며, 신비한 장식 · 등급 강조색이 적다.

### 3.2 등급별 넣을 말
<!-- AUTO:GRADES -->
### 소환물 · Summoned token — `token` (#8fdcff)

마법이나 능력으로 잠깐 불려 나온 것. 작고 덧없지만 그림은 공들여 — 불려 나온 흔적(흩어지는 에테르 · 원소 빛)이 아름답게 보이게.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a creature, construct or effect called into being for a moment; simple and readable |
| 카메라 camera | eye-level medium shot, subject about 50% of the frame |
| 빛 lighting | an element-coloured glow from the summoning with a clean rim light, clear readable contrast |
| 배경 background | plain dark night-blue with a fading wisp of ether and element light where it was called forth |
| 디테일 detail | clear, well-rendered forms with slightly translucent, glowing edges where it was conjured |
| 등급 강조색 accent | faint ether sky-blue (#8fdcff) summoning traces |
| 분위기 mood | fleeting, conjured |
| 마법이면 spell | a small, single conjured effect |
| 아이템이면 item | a small conjured object |

### 일반 · Common — `common` (#f4f1ea)

그 깃발의 평범한 구성원 · 흔한 마법 · 손때 묻은 물건. 완성도는 다른 등급과 같다 — 얼굴 · 손 · 재질 · 빛을 공들여 그리고, 성격이 보이는 표정과 분명한 동작, 그 깃발 세상의 한 구석이 실제로 보이는 배경. 다른 점은 규모뿐: 몸집이 작고, 배경이 가깝고 아담하며, 신비한 장식 · 등급 강조색이 없다.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | an ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished |
| 카메라 camera | eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame |
| 빛 lighting | a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast |
| 배경 background | an intimate, painted corner of the banner's world ({hint}) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks |
| 디테일 detail | fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands |
| 등급 강조색 accent | 없음 — 원소색만 |
| 분위기 mood | lively, honest, frontline |
| 마법이면 spell | a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles |
| 아이템이면 item | a used, practical object rendered with loving detail (wear, scratches, stitching), resting on dark stone or cloth, warm low light |

### 고급 · Superior — `uncommon` (#f2cf3d)

검증된 베테랑 · 잘 만든 물건. 일반보다 장비가 좋고 자세가 자신 있다. 고향의 한 조각이 흐릿하게 보이고, 장식 끝에 따뜻한 금빛이 조금.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a seasoned veteran or a well-made thing, better equipped and more confident than the common rank |
| 카메라 camera | slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame |
| 빛 lighting | element backlight plus a warm key light, clearer rim light, a few glints on metal and edges |
| 배경 background | a recognisable slice of the banner's home ({home}) with atmosphere and depth, softly focused, light atmospheric particles |
| 디테일 detail | fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands |
| 등급 강조색 accent | a few small warm gold (#f2cf3d) highlights on trims and edges |
| 분위기 mood | proven, capable, confident |
| 마법이면 spell | a stronger effect with visible flow and a second layer of particles |
| 아이템이면 item | a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light |

### 레어 · Rare — `rare` (#4ea8ff)

정예 · 걸작. 팩에서 나오면 눈이 가는 카드. 역동적인 구도, 깊이 있는 배경에 고향의 랜드마크 하나, 사파이어빛 에테르 알갱이와 얇은 테두리 빛.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | an elite with a signature move, or a masterwork — clearly special |
| 카메라 camera | dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame |
| 빛 lighting | dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights |
| 배경 background | atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: {landmark} |
| 디테일 detail | fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn) |
| 등급 강조색 accent | drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette |
| 분위기 mood | precise, impressive, prized |
| 마법이면 spell | a sweeping effect that reshapes part of the battlefield, layered energies and motion trails |
| 아이템이면 item | a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles |

### 강화 · Empowered — `upgrade` (#3fe0c0)

원래 카드 3장을 합쳐 한 단계 오른 같은 인물. 원래 카드 그림이 있으면 참고 그림으로 넣어 같은 얼굴 · 종족 · 색을 지키고, 장비가 보강되고 셋이 하나가 된 표시(세 줄 띠 · 보석 셋 · 세 겹)와 아래에서 솟는 청록 에너지.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | the base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced |
| 카메라 camera | the same framing as the base card but one step closer and lower, a rising, upward pose |
| 빛 lighting | element backlight plus teal energy pouring up from below and glowing through seams of the gear |
| 배경 background | the same setting as the base card, intensified: more particles and a faint shockwave ring ({home}) |
| 디테일 detail | reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one |
| 등급 강조색 accent | teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen |
| 분위기 mood | ascending, refined, powered-up |
| 참고 그림 reference | If a reference image is attached, it is the base card ({base}): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. |

### 에픽 · Epic — `epic` (#b46cff)

영웅 · 괴물 · 초월자의 유물. 영화의 한 장면처럼 크고 강하다. 낮은 광각, 빛줄기, 날씨와 전장의 이야기, 보랏빛 비술 알갱이.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it |
| 카메라 camera | cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment |
| 빛 lighting | high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom |
| 배경 background | rich environmental storytelling: {landmark}; weather (storm, ash, spray, wind) and deep atmosphere |
| 디테일 detail | ornate, layered armour or garments, battle wear, magical energy wrapping the body |
| 등급 강조색 accent | violet (#b46cff) arcane particles and a faint violet edge to the aura |
| 분위기 mood | awe, momentum, overwhelming force |
| 마법이면 spell | a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting |
| 아이템이면 item | a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element |

### 유니크 · Unique — `unique` (#ff8a2a)

그 깃발의 이름난 전설(덱에 1장). 포스터에 걸 만한 상징적 초상. 가운데 영웅 구도, 뒤에 그 깃발의 근원(거인 · 용 · 신)이 거대한 실루엣으로, 녹은 주황 금빛 불티와 금 세공.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster |
| 카메라 camera | centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette |
| 빛 lighting | masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light |
| 배경 background | {landmark}; behind it, faint and colossal, the banner's source: {source} |
| 디테일 detail | masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay |
| 등급 강조색 accent | molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree |
| 분위기 mood | legendary, commanding, personal |
| 마법이면 spell | a legendary spell bearing the banner's source's mark, framed like an icon |
| 아이템이면 item | a legendary relic displayed like a treasure, the banner's source looming faintly behind |

### 스페셜 · Special — `special` (#ff4d73)

승천자(신화가 된 필멸자)와 삼좌의 유물. 깃발에서 가장 중요한 그림, 키 아트 급. 세계 크기의 배경(하늘을 채운 근원 존재), 금빛 룬 고리, 진홍 · 금의 신성한 빛, 몸이 그 길에 따라 바뀐 모습.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | mythic: an Ascended mortal who touched divinity, or a relic of the Three Thrones — the single most important image of its banner |
| 카메라 camera | monumental low angle, epic scale, subject about 75% of the frame against a colossal backdrop; light may spill to the margins but the face and core stay in the safe area |
| 빛 lighting | divine: a radiant crimson-and-gold aura, golden rune rings orbiting, rays falling from above, the element light at full intensity |
| 배경 background | world-scale: {mythic}; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring |
| 디테일 detail | transcendent: the body partly transformed by its path of ascension, intricate gold filigree, cathedral-level detail |
| 등급 강조색 accent | crimson-rose (#ff4d73) and gold divine light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks |
| 분위기 mood | sacred, transcendent, world-shaking |
| 마법이면 spell | a world-altering miracle |
| 아이템이면 item | a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below |

<!-- /AUTO:GRADES -->

## 4. 레벨 — 크기와 힘
<!-- AUTO:LEVELS -->
| 레벨 | 유닛 | 마법 | 아이템 |
|---|---|---|---|
| 1~2 | small and humble: an ordinary body, light gear | a small, local effect | a simple object |
| 3~4 | seasoned: a sturdier body, a bigger weapon, mount or machine | an effect over a few targets | a fine object with a faint aura |
| 5~6 | elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it | a battlefield-wide effect | a powerful object with a strong aura |
| 7 | towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power | a devastating, landscape-changing effect | an ancient object of great power |
| 8 (스페셜) | mythic, beyond mortal scale: even at human size its presence fills the sky and the world reacts to it | ↑ | ↑ |
<!-- /AUTO:LEVELS -->

- 8레벨은 스페셜만이다(v3.29.1). 새 카드도 7레벨까지.

## 5. 깃발 고유성 — 아홉 깃발

같은 깃발은 등급이 달라도 **같은 종족 · 같은 재료 · 같은 상징 · 같은 빛**이 보여야 한다. 등급이 오르면 그 위에 고향 → 랜드마크 → 근원이 더해질 뿐, 정체성은 바뀌지 않는다. "하지 말 것"은 다른 깃발의 컨셉이 섞이는 것을 막는다(`docs/RETIRED_v3.20.7.md` — 마력을 쓰는 노움, 가시를 쓰는 드워프 같은 카드를 뺐다).

| 진영 | 깃발 | 근원 | 공통 분위기 |
|---|---|---|---|
| 아다만트 연합 | 잿불 고블린 · 무쇠수염 드워프 · 번개 노움 | 잠든 거인을 **캔다** | 구리 · 놋쇠 · 증기 · 매연 · 톱니. 신 대신 기술 |
| 푸른숲 맹약 | 바위주먹 오크 · 이끼 트롤 · 푸른비늘 인어 | 용에게서 **빌린다** | 거목 · 이끼 · 초원 · 석호 · 노래 |
| 비술 성회 | 심연 마족 · 성광 천족 · 폭풍 하이엘프 | 신에게서 **받는다**, 늘 값을 치른다 | 흰 성벽 · 별 · 첨탑 · 마법진 · 협곡의 그림자 |

<!-- AUTO:FLAGS -->
### B1 잿불 고블린 · Cinder Goblins — 아다만트 연합 · fire `#ff6b3d`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up |
| 실루엣 silhouette | a small figure dwarfed by an oversized cannon, musket or powder keg |
| 재료 materials | scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages |
| 색 palette | fire orange #ff6b3d with brass #d4893a and soot black |
| 상징 motifs | cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks |
| 빛 light | flashes of cannon fire and glowing embers inside thick gunpowder smoke |
| 배경 (일반) hint | a soot-stained gun bastion wall |
| 배경 (고급 · 강화) home | the fortress-foundry of Fortan, chimneys and gun bastions |
| 배경 (레어 · 에픽 · 유니크) landmark | Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond |
| 근원 (유니크) source | the sleeping giant Dormak, whose heart-fire burns inside the volcano like a colossal ember in a mountain-sized chest |
| 신화 배경 (스페셜) mythic | the giant Dormak's mountain-sized chest with its heart-fire blazing through cracks of rock across the whole sky |
| 하지 말 것 never | no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords |

### B2 무쇠수염 드워프 · Ironbeard Dwarves — 아다만트 연합 · metal `#a9b4c2`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge |
| 실루엣 silhouette | broad, square and heavy — a walking wall of riveted steel |
| 재료 materials | thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams |
| 색 palette | steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams |
| 상징 motifs | forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls |
| 빛 light | cold steel sheen against molten forge glow, sparks from the anvil |
| 배경 (일반) hint | a riveted iron gate in a dim forge hall |
| 배경 (고급 · 강화) home | the underground forge-city of Durkheim |
| 배경 (레어 · 에픽 · 유니크) landmark | the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock |
| 근원 (유니크) source | the sleeping giant Sorgrim, whose iron sinews form the Ironbone mountains, watched by the mirror-scaled metal dragon Feros |
| 신화 배경 (스페셜) mythic | the giant Sorgrim's mountain-sized arm of iron sinew rising from the earth, and the metal dragon Feros's mirror scales reflecting a thousand forges |
| 하지 말 것 never | no thorns or plant armour, no wizardry or wands; golems are machines, not undead |

### B3 번개 노움 · Thunder Gnomes — 아다만트 연합 · lightning `#ffd84a`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets |
| 실루엣 silhouette | a tiny figure beside big contraptions — coils, lightning towers, walking machines |
| 재료 materials | copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps |
| 색 palette | electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass |
| 상징 motifs | lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints |
| 빛 light | harsh flickering arc light and crackling electricity |
| 배경 (일반) hint | a cluttered workshop bench with coils |
| 배경 (고급 · 강화) home | the lightning-rod city of Voltarium on the thundering plateau |
| 배경 (레어 · 에픽 · 유니크) landmark | the spiked lightning-rod towers of Voltarium crowned by a lightning storm |
| 근원 (유니크) source | the sleeping giant Keraun, whose lightning nerves branch through the ground like a vast glowing circuit |
| 신화 배경 (스페셜) mythic | the giant Keraun's lightning nerves blazing across the whole plateau and sky like a living circuit board of storms |
| 하지 말 것 never | no mystical magic or wands — their power is science and machines |

### G1 바위주먹 오크 · Rockfist Orcs — 푸른숲 맹약 · earth `#b88a5a`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair |
| 실루엣 silhouette | massive shoulders and oversized fists; riders on giant wolves or bears |
| 재료 materials | rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems |
| 색 palette | earth ochre #b88a5a, rust-red war paint, bone white |
| 상징 motifs | giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds |
| 빛 light | dusty ochre light and rock dust hanging in the air |
| 배경 (일반) hint | tall dry grass and a hide tent |
| 배경 (고급 · 강화) home | the howling steppe of Garun with its nomad camps |
| 배경 (레어 · 에픽 · 유니크) landmark | the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring |
| 근원 (유니크) source | the earth dragon Gorbas, the largest of the seven dragons, with rocks and forests growing on its back |
| 신화 배경 (스페셜) mythic | the earth dragon Gorbas, mountain-sized with forests on its back, rising behind Throne Peak with one great eye opening |
| 하지 말 것 never | no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth) |

### G2 이끼 트롤 · Moss Trolls — 푸른숲 맹약 · forest `#58b85f`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees) |
| 실루엣 silhouette | tall, hunched and long-armed; treants tower like ancient trees |
| 재료 materials | bark armour, moss, thorns, vines, roots, mushrooms, amber sap |
| 색 palette | forest green #58b85f, deep moss, bark brown, bioluminescent spores |
| 상징 motifs | thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots |
| 빛 light | dappled green light through the canopy and glowing spores |
| 배경 (일반) hint | mossy roots and ferns |
| 배경 (고급 · 강화) home | the giant-tree city of Sylvaniel in the great forest of Eilen |
| 배경 (레어 · 에픽 · 유니크) landmark | the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist |
| 근원 (유니크) source | the forest dragon Verdan, with antlers of ancient tree branches and moss-covered scales |
| 신화 배경 (스페셜) mythic | the forest dragon Verdan's antlers spreading as a canopy of ancient branches over the whole forest, the First Elder Tree glowing beneath |
| 하지 말 것 never | no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself) |

### G3 푸른비늘 인어 · Bluescale Merfolk — 푸른숲 맹약 · water `#4fb3ff`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir |
| 실루엣 silhouette | graceful flowing curves; long hair and fins drifting like silk |
| 재료 materials | blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons |
| 색 palette | water blue #4fb3ff, aquamarine, pearl white, deep-sea navy |
| 상징 motifs | water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles |
| 빛 light | caustic underwater light and shimmering reflections |
| 배경 (일반) hint | rippling lagoon water |
| 배경 (고급 · 강화) home | the lagoon temple of Selenea |
| 배경 (레어 · 에픽 · 유니크) landmark | the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray |
| 근원 (유니크) source | the water dragon Marencia, a long translucent body with fins instead of wings |
| 신화 배경 (스페셜) mythic | the water dragon Marencia's translucent serpentine body coiling through the sky like a river of light |
| 하지 말 것 never | no fire, no heavy plate armour |

### A1 심연 마족 · Abyssal Fiends — 비술 성회 · darkness `#8b5cf6`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire |
| 실루엣 silhouette | tall, sharp and elegant: curved horns, tattered capes, long blades or scythes |
| 재료 materials | black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian |
| 색 palette | violet #8b5cf6, black, blood-red accents |
| 상징 motifs | blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes |
| 빛 light | cold violet underlight, blood-red glints, deep shadows |
| 배경 (일반) hint | a dark canyon wall |
| 배경 (고급 · 강화) home | the shadow city of Noctar in a sunless canyon |
| 배경 (레어 · 에픽 · 유니크) landmark | the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns |
| 근원 (유니크) source | the god Morkas, the Silent Lord — a faceless shadow king holding balanced scales, eyes closed |
| 신화 배경 (스페셜) mythic | the faceless shadow king Morkas towering across the sky with his balanced scales, eyes closed |
| 하지 말 것 never | no holy light, no crude cartoon devils — they are elegant and ominous |

### A2 성광 천족 · Radiant Seraphs — 비술 성회 · holy light `#ffe9a8`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | seraphs with white feathered wings and halos, and human knights of the Radiant Order |
| 실루엣 silhouette | upright and protective; wings spread wide behind great shields |
| 재료 materials | white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems |
| 색 palette | holy light #ffe9a8, white, pale gold, soft sky blue |
| 상징 motifs | halos, wings, great shields, a rising sun with a sword, feathers of light, oaths |
| 빛 light | warm radiant backlight and sunrise glow |
| 배경 (일반) hint | a white stone parapet |
| 배경 (고급 · 강화) home | the white walls of the Dawn Citadel Elad |
| 배경 (레어 · 에픽 · 유니크) landmark | the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands |
| 근원 (유니크) source | the goddess Solante, Mother of Dawn — a radiant woman with six wings of light |
| 신화 배경 (스페셜) mythic | the goddess Solante's six vast wings of light spread across the whole sky above a rising sun |
| 하지 말 것 never | no demonic elements, no gore; they are defenders, so attacks look restrained and righteous |

### A3 폭풍 하이엘프 · Storm High Elves — 비술 성회 · wind `#9fe3d6`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | high-elf mages: long pointed ears, silver hair, slender and proud |
| 실루엣 silhouette | slender figures whose robes and hair are swept by strong wind, book pages flying around them |
| 재료 materials | flowing silver-white and teal robes with star embroidery, open spellbooks, crystal staffs, scrolls |
| 색 palette | wind teal #9fe3d6, silver, white, starry indigo |
| 상징 motifs | swirling wind, flying pages, abstract star glyphs, constellations, spire towers, feathers |
| 빛 light | cool teal-white starlight and streaks of wind |
| 배경 (일반) hint | wind-swept clouds |
| 배경 (고급 · 강화) home | the cloud-piercing spire towers of Belumir's Needle |
| 배경 (레어 · 에픽 · 유니크) landmark | the spires of Belumir's Needle piercing the clouds under a night sky full of stars |
| 근원 (유니크) source | the god Belumir, the Star-Reader — a robe with a thousand eyes, an open book and stars |
| 신화 배경 (스페셜) mythic | the god Belumir's robe of a thousand eyes unfolding across the night sky as constellations |
| 하지 말 것 never | no forest elves or nature druids, no bulky muscles; star glyphs are abstract shapes, never readable letters |

<!-- /AUTO:FLAGS -->

## 6. 카드 종류 · 클래스
<!-- AUTO:TYPES -->
| 종류 | 넣을 말 |
|---|---|
| unit | a character card: upper body to full body, pose fits its role |
| atk | attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small |
| def | defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected |
| any | versatile spell — a dual effect: a balanced composition with power flowing in two directions |
| hand | trick spell played on the opponent's hidden hand — cunning: hidden cards, eyes, threads of fate, a sly hand in shadow; quieter, mysterious lighting |
| item | a single object, centred and shown whole, no hands and no person holding it; lit by faded old-gold light plus the element glow |

| 클래스 (유닛) | 넣을 말 |
|---|---|
| 무장 | an armed fighter wielding a weapon typical of the banner |
| 무도 | a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk |
| 마도 | a spellcaster channelling {el} |
| 기도 | a devoted priest, ritualist or pact-bound servant, praying or offering |
<!-- /AUTO:TYPES -->

## 7. 새 카드가 생겼을 때

### 7.1 게임 데이터에 카드를 넣었다면 (보통)
1. 카드 이름 · 분위기 글(`desc`/`flavor`) · 등급(`js/grades.js`)이 들어갔는지 본다. 분위기 글이 그림의 장면이 되므로 비워 두지 않는다.
2. **스페셜 · 유니크면 `art_notes.json`에 그림 지시를 쓴다**(누가 · 무엇을 하는 순간 · 몸이 어떻게 바뀌었나 · 뒤에 무엇이 보이나, 2~3문장 영어). 에픽 · 레어도 이름만으로 모습이 애매하면 쓴다. 지시가 빠진 스페셜 · 유니크는 build_prompts.js가 알려 준다.
3. `node tools/art/build_prompts.js` → `prompts/grades/<등급>.md`에 새 카드 프롬프트가 생긴다.
4. `python tools/art/artmap.py` → 장부 · 보드에 새 카드 줄이 "없음"으로 생긴다.

### 7.2 게임 데이터 없이 AI가 손으로 프롬프트를 쓸 때
1. 카드 정보를 모은다: 카드 ID · 이름(한국어) · 깃발 · 종류(유닛 · 공격/방어/공용/핸드 마법 · 아이템) · 레벨 · 등급 · 클래스(유닛) · 분위기 글 · 효과.
2. 2장의 틀에 3장(등급) · 4장(레벨) · 5장(깃발) · 6장(종류) 표의 영어를 **그대로** 옮긴다. 말을 새로 지어내지 않는 것이 통일의 핵심이다.
3. 이름이 가리키는 모습을 Subject와 Art direction에 구체적으로 쓴다(무엇을 들고, 어떤 동작, 무엇이 특별한가). 이름의 낱말 하나하나가 그림에 보이게.
4. 세계관 고유명사(거인 · 용 · 신 · 도시)는 `docs/WORLD.md`의 모습 설명으로 풀어 쓴다(그림 AI는 이름을 모른다).
5. 맨 아래 세 줄(Composition · No text · Avoid)은 빼지 않는다.
6. 다 쓰면 8장의 확인 목록으로 점검하고, 게임에 넣을 카드면 7.1처럼 데이터와 `art_notes.json`에도 남긴다.

### 7.3 새 등급 · 새 깃발 · 새 원소가 생기면
- `art_style.json`의 `grades` · `gradeOrder` · `flags` · `elements`에 같은 칸을 모두 채워 넣고 `version`을 올린다. 새 등급은 3.1 표에도 한 줄.
- 새 등급의 자리는 기존 사다리 사이에 끼운다(예: 강화가 레어와 에픽 사이 3.5). 아래 등급보다 화려하고 위 등급보다 덜하게 — 카메라 · 배경 깊이 · 강조색 셋으로 구분한다.

## 8. 그림을 받은 뒤 — 카드와 연결하기

1. 받은 그림을 `tools/art/inbox/`에 넣는다. 파일 이름에 **카드 ID**(`EP-A1-3_v2.png`, `SP-B2 final.jpg`) 또는 **카드 이름**(`장막의 처형자.png`)이 있으면 된다.
2. `python tools/art/artmap.py import` (Windows는 `tools/art/그림 연결.bat`)
   - 맞는 카드를 찾아 4:5로 가운데를 잘라 800×1000 PNG로 `img/cards/<ID>.png`에 넣는다(Pillow 필요, 있던 그림은 `_backup_art/<시각>/`).
   - 넣은 파일은 `inbox/_done/`으로 옮기고, 장부에 출처 파일 · 날짜 · 프롬프트 버전을 적는다.
   - 이름으로 못 찾은 파일은 그대로 두고 알려 준다 → `python tools/art/artmap.py assign <파일> <카드ID>`로 직접 연결.
3. 게임을 새로 고치면 그림이 보인다(게임은 `img/cards/<ID>.png`를 그대로 읽는다 — 코드 수정 없음).
4. `tools/art/art_board.html`을 브라우저로 열어 등급 · 깃발별로 훑어본다. 마음에 안 들면 `art_map.csv`의 상태를 `다시`로 바꾸고 메모를 적는다.

장부 `art_map.csv` 칸: `card_id · name · grade · grade_ko · group · type · lv · base · status · image · art_ver · prompt_ver · source_file · model · added · note`
- `status`: `없음`(그림 없음) · `들어감`(그림 있음) · `채택`(확정) · `다시`(다시 그릴 것) · `빠진 카드`(게임에서 빠짐). `채택` · `다시`와 `model` · `note`는 사람이 적고, 나머지는 artmap.py가 채운다.
- `art_ver`가 지금 `prompt_ver`보다 옛 버전이면 보드에 "옛 프롬프트" 표시가 뜬다(규칙이 바뀐 뒤 그린 그림인지 알 수 있다).

## 9. 확인 목록

- [ ] 글자 · 숫자 · 틀 · 서명 없음, 주인공 가운데 70%, 위 · 아래 비움
- [ ] 밤하늘 남색 바탕, 원소색이 주광이고 등급 강조색은 보조
- [ ] 깃발의 종족 · 재료 · 상징이 한눈에 보이고 "하지 말 것"을 어기지 않았다
- [ ] 이름의 뜻이 그림에 보인다(이름만 듣고 그림을 고를 수 있을 정도)
- [ ] 등급이 보인다 — 일반: 공들였지만 아담한 규모 · 가까운 배경 / 레어: 랜드마크 · 사파이어 테두리 / 에픽: 영화 같은 규모 / 유니크: 영웅 초상 + 근원 실루엣 / 스페셜: 하늘을 채운 근원 + 금빛 룬 고리
- [ ] 레벨이 보인다 — 높을수록 크고 위압적
- [ ] 강화 카드: 원래 카드와 같은 인물로 보인다
- [ ] 같은 깃발 · 같은 등급 카드와 나란히 놓아도 결이 같다(보드에서 확인)

## 10. 그림 AI별 요령

- **공통**: 프롬프트를 통째로 붙여 넣는다. 스페셜 · 유니크는 2~4장 뽑아 고른다. 한국어 이름이 그림에 글자로 찍혀 나오면 같은 프롬프트로 다시 뽑는다(No text 줄은 지운 적 없이).
- **GPT Image (ChatGPT · gpt-image-1)**: 세로 1024×1536으로 받는다. 레어 이상은 품질 high. 강화 카드는 원래 카드 그림을 첨부하고 "edit this character into the empowered version"이라고 한 줄 붙여도 좋다.
- **Gemini (이미지 생성)**: 맨 앞에 "Portrait 4:5 image." 한 줄을 더하면 비율이 잘 맞는다. 참고 그림을 여러 장 받을 수 있으니 강화 카드는 원래 카드 그림을, 같은 깃발의 통일감이 필요하면 이미 채택한 같은 깃발 그림 1장을 함께 넣는다("match the style of the attached image").
- **한꺼번에**: `python tools/art/gen.py --provider openai --grade special` 처럼 등급으로 골라 API로 뽑을 수 있다(`tools/art/README.md`). gen.py로 만든 그림은 바로 `img/cards/`에 들어가고, `python tools/art/artmap.py`로 장부에 반영된다.

## 11. 예시 (실제 카드의 완성 프롬프트)
<!-- AUTO:EXAMPLES -->
#### 예: 일반 — B1-01 심지 당번

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "심지 당번". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Cinder Goblins — an armed fighter wielding a weapon typical of the banner.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Cinder Goblins: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Adamant Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (a soot-stained gun bastion wall) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; embers, flame light, gunpowder smoke.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Mood: lively, honest, frontline.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 고급 — A2-01 성광 견습생

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "성광 견습생". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Radiant Seraphs — an armed fighter wielding a weapon typical of the banner.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Radiant Seraphs: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Arcane Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 레어 — RS-G3-1 작살 물살

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "작살 물살". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive water attack striking the enemy ranks; a cleansing wave washing away enchantments. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Bluescale Merfolk: magic of bluescale merfolk, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물살을 타고 날아간 작살은 방패도 축복도 씻어 내고 박힌다. 셀레네아의 사냥꾼은 두 번 던지지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 피해 3. 내 생명 +1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: precise, impressive, prized.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 강화 — UP-B2-17 무쇠 성벽대장

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "무쇠 성벽대장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Ironbeard Dwarves — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
If a reference image is attached, it is the base card (B2-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "무쇠 성벽병")
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Ironbeard Dwarves: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Adamant Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 성벽병들이 그의 등 뒤로만 줄을 선다. 그 등이 성벽이다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: ascending, refined, powered-up.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 에픽 — EP-A1-3 장막의 처형자

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "장막의 처형자". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring member of the Abyssal Fiends — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Banner — Abyssal Fiends: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Arcane Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심연의 장막에서 걸어 나온 것. 무엇을 두고 나왔는지 묻는 자는 다음 차례가 된다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 유니크 — UN-G1 바위송곳니 대족장

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바위송곳니 대족장". Depict exactly what this name describes.
Subject: a legendary, named member of the Rockfist Orcs (see art direction).
Art direction: The great chief of the Rockfang tribe: an enormous orc with a stone-fang necklace, howling as his warband charges out of the dust behind him.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Rockfist Orcs: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운 바위송곳니 부족의 우두머리. 그가 적을 쓰러뜨리면 무리가 울부짖으며 달려온다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; behind it, faint and colossal, the banner's source: the earth dragon Gorbas, the largest of the seven dragons, with rocks and forests growing on its back; flying rock dust, cracked ground, ochre light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: legendary, commanding, personal.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 스페셜 — SP-B2 철심 브론

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — mythic, an Ascended or a relic of the Three Thrones, key-art quality. Mythic: an Ascended mortal who touched divinity, or a relic of the Three Thrones — the single most important image of its banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철심 브론". Depict exactly what this name describes.
Subject: a mythic, ascended member of the Ironbeard Dwarves (see art direction). One of the Ascended.
Art direction: Bron Ironheart, the dwarf smith who built the first golem: his chest is an open cage of brass gears around a glowing mechanical heart, a massive forge hammer on his shoulder. He ascended without any god, so instead of a halo a ring of slowly turning gears and golden runes circles behind his head. Silhouettes of golems stand behind him like an army.
Scale (level 8 of 8): mythic, beyond mortal scale: even at human size its presence fills the sky and the world reacts to it.
Banner — Ironbeard Dwarves: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Adamant Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 최초의 골렘을 만든 대장장이. 심장을 기계로 바꿔 신의 도움 없이 승천했다. 아다만트가 "증명된 가능성"으로 기린다.
Camera: monumental low angle, epic scale, subject about 75% of the frame against a colossal backdrop; light may spill to the margins but the face and core stay in the safe area.
Lighting: divine: a radiant crimson-and-gold aura, golden rune rings orbiting, rays falling from above, the element light at full intensity; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; world-scale: the giant Sorgrim's mountain-sized arm of iron sinew rising from the earth, and the metal dragon Feros's mirror scales reflecting a thousand forges; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; cold steel sheen, sparks from an anvil, rivets.
Detail: transcendent: the body partly transformed by its path of ascension, intricate gold filigree, cathedral-level detail.
Grade accent: crimson-rose (#ff4d73) and gold divine light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light (about 60%); the grade accent is a secondary touch (15% or less).
Mood: sacred, transcendent, world-shaking.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

<!-- /AUTO:EXAMPLES -->

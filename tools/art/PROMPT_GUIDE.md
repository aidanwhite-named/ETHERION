# ETHERION 카드 일러스트 프롬프트 가이드 — n판 (v2.1, 2026-11-21)

> 처음부터 새로 쓴 판이다. 모든 등급(706장)이 이 방식이다. 옛 등급별 사다리(g1~g4)는 `legacy_g4/`에 보관만 한다.
> v2.1 (프롬프트 n2, 2026-11-21): **등급 사다리** — 등급 줄을 다섯 칸(분위기 · 빛 · 채도 · 공기 · 재질)으로 늘리고 사다리 한 줄을 붙였다. 일반 → 고급 → 레어 → 에픽 → 유니크 → 스페셜로 한 단계씩 더 신비롭고 강렬하고 화려해진다(2장). 시점 · 구도는 여전히 카드마다 정한다.
> 2026-11-21 (프롬프트 판 n2 그대로): **깃발 기본 종류를 들어냄** — 깃발마다 있던 "처음 세운 무리" 줄(`art_style.json` `founder`)이 없어지고, 거기에 기대던 유닛 72장(강화 · 소환물 포함)이 제 종류를 얻어 장면을 다시 썼다(3.2). 목록은 `docs/UNIT_RENAME.md` 맨 아래.
> 2026-11-22 (프롬프트 판 n2 그대로): **유니크 18장 장면을 다시 씀** — 현실 동물의 몸(여우 · 사슴 · 황새 …)을 들어내고 신 · 용 · 마왕급의 거대한 판타지 존재로 바꿨다(3.2 등급의 결). 종류 이름과 서사도 같은 날 새 존재에 맞췄다(`js/kinds.js` — 11장과 소환물 1장, 목록은 `docs/UNIT_RENAME.md` 7.2).
> 2026-11-22 (프롬프트 판 n2 그대로): **유니크 등급 줄의 색 = 깃발 색** — 등급 줄에 못박혀 있던 주황 금(`#ff8a2a`) 불티 · 아지랑이 · "녹은 금속"이 모든 유니크를 불의 깃발처럼 붉게 만들어, 빛 · 입자 · 이음매의 색을 그 카드 깃발의 색으로 바꿨다(`art_style.json` `grades.unique.finish`의 `{banner}` · `{bannerName}`을 `build_prompts.js`가 `elements.<원소>.colour` · `hex`로 채운다). 같은 날 유니크 10장의 장면 · 빛 · 배색에서 깃발 색과 어긋나게 붉거나 주황으로 쏠리던 곳도 고쳤다(UN-A1-7은 심연의 뿔 달린 군주로 다시 씀).
> 2026-11-22 (프롬프트 판 n2 그대로): **강화 40장 장면을 다시 씀 — 원래 카드와 닮은 틀, 다음 순간**(사용자 결정). 옛 규칙 "틀은 원래 카드와 다르게"가 시점 · 자리 · 방향 · 배색을 모두 바꿔 작은 카드에서 다른 카드로 보였다. 이제 강화 장면은 원래 카드의 `dir · place · pal`(과 되도록 `shot`) · 장소 · 대표 소품을 그대로 쓰고, 그 이야기의 결실을 그린다(3.2 강화). 참조 줄은 둘(`upgradeRef` 원래 그림 있음 · `upgradeNoRef` 없음 — 생성기가 `img/cards/<원래 ID>`를 보고 고른다), 등급 줄의 청록빛은 장비 없는 짐승에게도 맞게 "무늬 · 뿔 · 갈기 · 이음매". `lint`는 강화 카드를 깃발의 쏠림 셈에서 빼고 원래 카드와 짝이 맞는지 본다. 좌우 균형을 맞추려 `A3-23` 별여우(와 강화)를 왼쪽 방향으로 뒤집었다.
> **For any AI writing or revising these prompts:** read sections 1–4. The scene (section 3) is the prompt; everything else is one short line.

## 0. 왜 새로 썼나

옛 프롬프트는 600~800단어 가운데 카드마다 다른 말이 거의 없었다. 등급이 카메라 · 조명 · 구도를 하나로 못박아 같은 등급 카드는 구도가 같았고, 깃발의 "누구" 줄이 처음 세운 종족(고블린 · 오크 · 노움 …)을 묘사해 종족이 아닌 유닛 · 마법 · 아이템에도 그 종족이 끼어들었다. 고칠 때마다 금지 줄만 늘었다.

n판은 반대로 짠다.

- **카드마다 다른 것은 모두 "장면"에 쓴다.** 무엇을, 어느 순간에, 어디서 보고, 화면 어디에 놓고, 어느 쪽을 향하고, 빛이 어떤지 — 카드마다 손으로 쓴다. 프롬프트의 맨 앞이고, 절반이 넘는다.
- **같은 것은 짧게.** 깃발 한 줄(원소의 재료와 대기 — 종족이 아니다) · 등급 줄 + 사다리 한 줄(얼마나 신비롭고 화려한가 — 시점을 정하지 않는다) · 화풍 한 줄.
- **있는 것만 긍정문으로.** 금지 줄은 실제로 문제가 된 것 하나(글자)만 화풍 줄에 있다.
- **겹침은 도구가 센다.** 한 깃발 안에서 같은 시점 · 같은 방향 · 같은 자리 · 같은 배색이 몰리면 `scene_tool.js lint`가 오류를 낸다.

## 1. 프롬프트의 짜임

```
Landscape 5:4 painting. [① 장면 — 카드마다 손으로 쓴 글] [빛 한 문장]
Colour: [② 배색 — 깃발의 배색 여섯 가운데 그 카드가 고른 것]
[③ 깃발 한 줄]
[④ 등급 줄 — Mood · Light · Saturation · Air · Surfaces 다섯 칸]
[④′ 사다리 한 줄 — 여섯 등급의 차례, 모든 등급 같음]
[⑤ 화풍 한 줄]
```

- 마법은 첫머리가 `Landscape 5:4 painting of a spell — the magic itself is the subject.`, 아이템은 `… of one object — the object itself is the subject.`
- 강화 카드는 ④′ 다음에 "원래 카드와 같은 개체" 줄이 하나 더 붙는다(원래 카드 그림이 있으면 함께 넣으라는 줄, 없으면 장면 글대로 이으라는 줄). 소환물에는 사다리 줄이 없다.
- 한 장 약 300단어(일반 약 300 · 스페셜 약 365 — 등급 줄 자체가 등급이 오를수록 길다). 장면이 여전히 가장 긴 덩어리다. 카드 이름 · 서사(한국어)는 프롬프트에 넣지 않는다 — 쓰는 사람이 읽고 장면으로 옮긴다.

| 파일 | 무엇 |
|---|---|
| `art_scenes/<깃발>.json` | **① 카드별 장면** — 이 체계의 중심. 카드 ID마다 `shot · dir · place · pal · scene · light` |
| `art_style.json` | ②~⑤의 문구, 틀 낱말(`shots` · `dirs` · `places`), 등급 색 · 그리는 차례 |
| `art_kinds.json` | 유닛 종류(kin)의 생김새 참고표 — 장면을 쓸 때 본다(생성기는 읽지 않음) |
| `scene_tool.js` | `todo` = 장면을 쓸 카드의 자료와 틀 제안 · `lint` = 검사 · `add` = 다른 곳에 써 둔 장면을 깃발 파일에 넣기 |
| `build_prompts.js` | 위를 합쳐 `prompts/`(cards.jsonl · grades/*.md · cards/*.md)를 만든다 |
| `legacy_g4/` | 옛 체계 보관(생성기 · 문구 · 카드별 지시 · 옛 스페셜 · 레어 프롬프트) — 지금은 쓰지 않는다 |

<!-- AUTO:COUNTS -->
프롬프트 버전 **n2** (2026-11-21) · 카드 706장 (뺀 카드 제외, 소환물 포함)

| 등급 | 색 | 장수 | 유닛 · 마법 · 아이템 | 프롬프트 | 파일 |
|---|---|---|---|---|---|
| 소환물 (Summoned) | `#8fdcff` | 17 | 13 · 4 · 0 | n2 | `prompts/grades/token.md` |
| 일반 (Common) | `#f4f1ea` | 362 | 212 · 110 · 40 | n2 | `prompts/grades/common.md` |
| 고급 (Superior) | `#f2cf3d` | 129 | 78 · 35 · 16 | n2 | `prompts/grades/uncommon.md` |
| 레어 (Rare) | `#4ea8ff` | 59 | 9 · 41 · 9 | n2 | `prompts/grades/rare.md` |
| 강화 (Empowered) | `#3fe0c0` | 40 | 40 · 0 · 0 | n2 | `prompts/grades/upgrade.md` |
| 에픽 (Epic) | `#b46cff` | 63 | 36 · 18 · 9 | n2 | `prompts/grades/epic.md` |
| 유니크 (Unique) | `#ff8a2a` | 18 | 18 · 0 · 0 | n2 | `prompts/grades/unique.md` |
| 스페셜 (Special) | `#ff4d73` | 18 | 9 · 0 · 9 | n2 | `prompts/grades/special.md` |
<!-- /AUTO:COUNTS -->

## 2. 통일감은 어디서 오나

**등급** — 얼마나 신비롭고 강렬하고 화려한가. 시점 · 구도 · 방향은 정하지 않는다.

같은 등급끼리는 분위기가 같고, 등급 사이는 한눈에 차이가 나야 한다. 그래서 모든 등급 줄이 **같은 다섯 칸을 같은 차례로** 쓰고, 칸마다 한 단계씩 오른다(스페셜이 가장 좋은 카드다). 낮은 등급도 허술한 그림이 아니다 — 정성은 모든 등급이 같고 화려함만 다르다(사다리 줄의 `Every tier is finished, beautiful work`).

| | 일반 1단 | 고급 2단 | 레어 3단 | 에픽 4단 | 유니크 5단 | 스페셜 6단 |
|---|---|---|---|---|---|---|
| 분위기 Mood | 담백 · 조용히 아름다움 | 자신 있고 말끔함 | 인상적 · 신비의 첫 기척 | 웅장 · 힘이 가득, 세계가 반응 | 전설적 · 맹렬 · 강렬 | 신화적 · 신비 · 압도, 경외 |
| 빛 Light | 장면에 쓴 광원뿐 | + 윤곽을 따는 두 번째 빛 | + 대담한 명암 · 사파이어 윤곽빛 | + 대기를 가르는 빛줄기 · 주변을 물들이는 기운 | + 연극 같은 명암 · 주인공이 제 힘으로 깃발 색으로 빛남 | 주인공이 광원 — 겹겹의 광휘(심 · 후광 · 화면을 가로지르는 고리와 빛살) |
| 채도 Saturation | 절제한 흙빛, 원소색은 강조 한 곳 | 조금 더 맑고 진하게 | 빛 받은 곳이 선명 | 깊고 진하게 빛남 | 보석처럼 선명하고 깊음 · 깃발 색이 가장 진하게 | 모든 카드 가운데 가장 빛나는 무지갯빛 |
| 공기 Air | 먼지 · 연기 · 안개까지 | 평범 + 금빛 몇 점 | 옅게 빛나는 안개 + 에테르 알갱이 몇 점 | 움직이는 날씨 + 흐르는 보랏빛 입자 | 소용돌이치는 깃발 색 빛 알갱이 · 불꽃 · 일렁이는 안개 · 금세공 빛줄 | 불티의 폭풍 · 에테르 빛의 장막, 땅과 하늘이 휨 |
| 재질 Surfaces | 닳고 꾸밈없는 것 | 잘 만들고 손질한 것 | 섬세한 장식 | 화려하고 귀한 세공 | 이음매마다 깃발 색 빛이 새는 장인의 세공 | 필멸의 솜씨를 넘어 안에서 빛남 |
| 강조색 | (없음) | 금 `#f2cf3d` 몇 점 | 사파이어 `#4ea8ff` 윤곽 | 보라 `#b46cff` 입자 | 그 깃발의 색(등급 색 주황은 그림에 쓰지 않는다) | 진홍 `#ff4d73` + 금 광휘 |

- 소환물은 사다리 밖(일반만큼 조용하고 에테르 푸른빛만), 강화는 레어와 에픽 사이(청록 `#3fe0c0`).
- **무엇을 그리나는 장면이, 얼마나 화려한가는 등급이 정한다.** 장면의 `light`가 "광원 하나"여도 높은 등급은 그 위에 등급의 빛(윤곽빛 · 기운 · 광휘)이 덧붙는다. 등급을 한 단계 더 벌리고 싶으면 장면이 아니라 `art_style.json` `grades.<등급>.finish`의 해당 칸을 고친다 — 한 등급만 고치지 말고 위아래 등급과 차례가 맞는지 본다.

<!-- AUTO:GRADES -->
| 등급 | 뜻 | 프롬프트에 들어가는 등급 줄 |
|---|---|---|
| 소환물 `token` | 사다리 밖 — 마법이 방금 불러낸 것. 일반처럼 조용하되 불려 나온 빛만 남는다. 단순하고 또렷하게, 아직 흩어지지 않은 에테르 푸른빛이 가장자리에 남아 있다. | Summoned — off the rarity ladder, as quiet as a common card but for its conjuring light. Simple and luminous: a thing called up a heartbeat ago, one clear shape in plain surroundings, its edges still trailing ether-blue (#8fdcff) light. |
| 일반 `common` | 1단 — 있는 그대로의 세계. 조용하고 담백하지만 정성껏 그린 그림. 빛은 장면에 쓴 광원뿐(덧붙인 빛 없음), 절제한 흙빛 색, 공기에는 먼지 · 연기 · 안개까지만, 닳고 손때 묻은 꾸밈없는 재질. 화려함이 아니라 관찰 · 질감 · 개성으로 좋은 그림. | Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed. |
| 고급 `uncommon` | 2단 — 솜씨와 숙련. 자신 있고 말끔하다. 장면의 빛에 윤곽을 따는 깨끗한 두 번째 빛, 조금 더 맑고 진한 색, 공기는 아직 평범하지만(마법 없음) 모서리 · 금속에 따뜻한 금빛이 몇 점, 잘 만들고 잘 손질한 재질과 더 또렷한 묘사. | Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail. |
| 레어 `rare` | 3단 — 처음으로 신비가 눈에 보인다. 되풀이해 이야기할 만한 인상적인 순간. 더 대담한 명암과 깊은 공간, 윤곽을 따라 차가운 사파이어 빛, 빛 받은 곳의 선명한 색, 주인공 둘레에 옅게 빛나는 안개와 떠도는 에테르 알갱이, 섬세한 장식과 반짝이는 묘사. | Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail. |
| 강화 `upgrade` | 레어와 에픽 사이(3.5단) — 원래 카드의 그 개체가 한 단계 오른 모습. 장면은 원래 카드와 같은 자리 · 방향 · 배색 · 장소에서 그 이야기의 다음 순간을 그린다(2026-11-22). 원래 카드 그림이 있으면 함께 넣는다(없어도 장면 글만으로 이어진다). 더 큰 몸 · 보강한 장비, 발밑에서 오르는 청록빛, 무늬 · 뿔 · 갈기 · 이음매를 따라 도는 빛, 선명한 색과 옅게 빛나는 안개. | Empowered — between rare and epic on the rarity ladder. Mood: risen and newly sure of its strength. The same individual a rank higher — sturdier body, reinforced gear, steadier bearing. Light: teal (#3fe0c0) energy rising from the ground beneath it and glowing along its markings, horns, mane or the seams of its gear. Saturation: vivid. Air: a faint luminous haze with a few rising teal sparks. |
| 에픽 `epic` | 4단 — 웅장하고 힘이 가득하다. 세계가 주인공에 반응한다. 깊은 대기를 가르는 빛줄기, 주인공을 감싸고 주변까지 물들이는 은은한 기운, 깊고 진하게 빛나는 색, 움직이는 날씨와 그 바람에 실려 흐르는 보랏빛 비술 입자, 화려하고 귀한 재질과 정교한 세공. | Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked. |
| 유니크 `unique` | 5단 — 전설적이고 맹렬하다. 그 깃발에서 가장 대담한 그림. 연극 같은 명암과 깊은 어둠을 가르는 눈부신 주광, 주인공이 제 힘으로 그 깃발의 색으로 빛난다. 보석처럼 선명하고 깊은 색(깃발 색이 가장 진하게), 소용돌이치는 깃발 색 빛 알갱이 · 불꽃 · 일렁이는 안개 · 주인공을 휘감는 가는 금세공 빛줄, 이음매마다 깃발 색 빛이 새는 장인의 세공. 등급 줄의 `{banner}` · `{bannerName}`은 생성기가 그 카드 깃발의 색(이름 + 색값 · 이름)으로 바꿔 넣는다(2026-11-22 — 주황 금 불티가 모든 유니크를 불의 깃발처럼 붉게 만들어 고침). | Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its banner colour, {banner}. Saturation: jewel-bright and deep, with {bannerName} at its fullest strength. Air: thick with swirling motes and sparks of {bannerName} light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing {bannerName} at the seams. |
| 스페셜 `special` | 6단(최고) — 눈에 보이는 신화. 가장 신비롭고 강렬하고 화려하다. 깃발마다 하나뿐인 존재(유닛)와 성소의 유물(아이템) — 주인공 자체가 광원이고 광휘가 겹겹이다(흰 불빛 심 · 넓은 후광 · 화면을 가로지르는 진홍과 금의 큰 고리와 긴 빛살). 모든 카드 가운데 가장 빛나는 무지갯빛 색, 불티의 폭풍과 에테르 빛의 장막이 공기를 채우고 땅 · 하늘 · 날씨가 주인공 쪽으로 휜다. 필멸의 솜씨를 넘어 안에서부터 빛나는 재질. | Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within. |

사다리 한 줄(소환물을 뺀 모든 카드, 등급 줄 바로 다음): `Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.`
<!-- /AUTO:GRADES -->

**깃발** — 원소의 재료 · 대기 · 색. 깃발은 종족이 아니라 절대자(거인 · 용 · 신)의 힘이 깨운 모든 것이다(`docs/WORLD.md` 6장). 배색은 깃발마다 여섯 가지이고 카드가 하나를 고른다 — 어느 배색이든 그 깃발의 원소색이 가장 또렷한 색으로 들어 있다.

<!-- AUTO:FLAGS -->
### B1 도르마크의 심장불 — fire `#ff6b3d`

- 깃발 한 줄: Banner of fire: a volcanic country warmed from below by a sleeping giant's heart-fire — basalt, obsidian, magma seams, drifting embers, soot and powder smoke.
- 배색: `ember` embers in the dark — near-black and soot-brown, with small fierce glows of fire-orange (#ff6b3d) / `whitehot` white-hot — a blinding yellow-white core falling through fire-orange (#ff6b3d) into deep crimson shadow / `ashfall` ashfall — pale ash-grey and bone-white, muted, with one fierce accent of fire-orange (#ff6b3d) / `magmadusk` magma dusk — wine-red and violet-brown gloom glowing fire-orange (#ff6b3d) from below / `coldnight` cold night against fire — deep blue-indigo dark cut by warm fire-orange (#ff6b3d) light / `brassglow` furnace warmth — brass, copper and amber tones in sooty brown gloom, fire-orange (#ff6b3d) at the heart
- 장소 낱말(장면을 쓸 때): crater rim, lava tube, obsidian field, ash plain, sulphur vents and hot springs, gun bastion of a fortress-foundry, powder magazine, forest of chimneys, cooled lava terraces, caldera lake, underground magma river, foundry floor

### B2 소르그림의 방패 — metal `#a9b4c2`

- 깃발 한 줄: Banner of metal: mountains whose ore veins are a sleeping giant's iron sinews — raw ore, hammered steel, rivets, slag, forge-glow and the cold of deep halls.
- 배색: `coldsteel` cold steel — blue-grey (#a9b4c2) and slate shadow with crisp white highlights / `forgeheart` forge heart — dark gunmetal and steel grey (#a9b4c2) with molten orange glowing in the seams / `patina` rust and verdigris — red-brown and green-blue patina over steel grey (#a9b4c2) in dim light / `snowlight` mountain daylight — overcast snow-white and granite grey with steel-grey (#a9b4c2) metal / `lamplit` lamplight underground — small warm pools of light in black, steel grey (#a9b4c2) glinting at the edges / `mirror` mirror polish — bright silver-grey (#a9b4c2) reflections of a dark world, almost monochrome
- 장소 낱말(장면을 쓸 때): mine gallery, underground forge city, exposed ore face, shield wall on a mountain pass, casting floor, armoury vault, scrapyard of broken golems, gate of riveted steel, cable lift over a chasm, quenching pools, slag heaps in snow, gear-works

### B3 케라운의 벼락 — lightning `#ffd84a`

- 깃발 한 줄: Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
- 배색: `thunderhead` thunderhead — black and rain-grey split by searing electric yellow (#ffd84a) / `cobalt` cobalt night — deep blue dark with electric-yellow (#ffd84a) arcs and violet-white coronas / `copperlab` copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow / `flash` the flash — bleached white-yellow (#ffd84a) overexposure with hard black shapes / `greensky` storm green — eerie flat yellow-green light before the strike, with a few electric-yellow (#ffd84a) sparks / `wetglass` rain grey — pale grey wet reflections with small electric-yellow (#ffd84a) sparks doubled in them
- 장소 낱말(장면을 쓸 때): top of a lightning-rod tower, rain-lashed plateau, field of fulgurite glass, academy laboratory, storehouse of lightning jars, coil hall, inside a storm cloud, wet cobbled street under hanging wires, observatory dome, generator pit, scorched moor

### G1 고르바스의 발톱 — earth `#b88a5a`

- 깃발 한 줄: Banner of earth: wind-scoured steppe and broken highlands on the back of a mountain-sized earth dragon — raw rock, dry clay, dust, bone, hide and tall dry grass.
- 배색: `ochredust` ochre dust — matte sandstone and clay browns (#b88a5a) in a sunlit dust haze / `bonemoon` bone and moon — bone-white and grey-blue night with dry ochre (#b88a5a) earth / `redearth` red earth — rust-red clay under slate-grey storm light, ochre (#b88a5a) dust in the air / `strawgold` dry-grass afternoon — pale straw and ochre (#b88a5a) with long umber shadows / `stormslate` steppe storm — slate grey and muted earth brown (#b88a5a), flying grit / `firelit` firelit dark — deep darkness with warm ochre (#b88a5a) surfaces lit by one small flame
- 장소 낱말(장면을 쓸 때): howling steppe, camp of hide tents, circle of standing stones, canyon, rockslide, the dragon's back — boulders and pines, mud wallow, salt flat, burial mounds, wolf den, cliff ledges, dry riverbed

### G2 베르단의 뿔 — forest `#58b85f`

- 깃발 한 줄: Banner of forest: a primeval wood kept by an antlered forest dragon — giant roots, moss, bark, thorns, fungi, vines and wounds that grow closed.
- 배색: `mossdeep` deep moss — saturated leaf-green (#58b85f) in heavy shade with wet bark browns / `sporeglow` spore night — black dark lit by blue-green and pale-lime (#58b85f) bioluminescence / `sunshaft` canopy light — golden-green (#58b85f) shafts through drifting mist / `autumnrot` autumn rot — russet, amber and mushroom-pale against dark leaf-green (#58b85f) / `rainmist` rain mist — grey-green (#58b85f) haze and soft silver light / `thorndark` thorn dark — near-black with deep green (#58b85f) and a few points of blood red
- 장소 낱말(장면을 쓸 때): city in the giant trees, cathedral of roots, bog, mushroom grove, thorn thicket, canopy walkways, fallen giant log, forest pool, seedling nursery, hollow of the first tree, burnt clearing growing back

### G3 마렌시아의 노래 — water `#4fb3ff`

- 깃발 한 줄: Banner of water: lagoons, tides and deep sea that answer a sea dragon's song — clear water, foam, pearl, coral, kelp and sound made visible as ripples.
- 배색: `lagoon` sunlit shallows — turquoise and water-blue (#4fb3ff) with pearl white, clear and bright over deep blue shadow / `trench` deep water — navy and black with small cold lights and a water-blue (#4fb3ff) glow / `moontide` moon tide — silver-blue (#4fb3ff) moonlight and pale mist / `coraldawn` coral dawn — coral pink and warm first light over water-blue (#4fb3ff) / `stormsea` storm sea — heavy green-blue (#4fb3ff), white spray and slate grey / `glasscalm` glass calm — mirror-still pale blue-grey (#4fb3ff) and fog, almost monochrome
- 장소 낱말(장면을 쓸 때): temple on a lagoon, tidal pools, kelp forest, coral reef, deep trench, sea cave, waterfall shrine, mangrove roots, open ocean swell, drowned ruins, spring pool, rain on still water

### A1 모르카스의 그믐 — darkness `#8b5cf6`

- 깃발 한 줄: Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
- 배색: `violetshade` violet shade — purple-black gloom with luminous violet (#8b5cf6) edges / `bloodink` blood and ink — black and deep crimson with a thread of violet (#8b5cf6) / `candle` candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows / `bonepale` bone pale — ash-grey and bone-white drained of colour, with one violet (#8b5cf6) glow / `eclipse` eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze / `frostindigo` indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver
- 장소 낱말(장면을 쓸 때): shadow city in a canyon, contract archive, scriptorium, vault of pawned things, gallows bridge, crypt, blood fountain, masked court, night market, hall of mirrors, bog of the dead

### A2 솔란테의 새벽 — light `#ffe9a8`

- 깃발 한 줄: Banner of light: a white citadel facing the first light of day, held together by oaths — pale stone, stained glass, candle wax, gilded shields, feathers and sunbeams with weight.
- 배색: `firstlight` first light — cool blue-grey before dawn with a low band of pale gold (#ffe9a8) / `whitegold` white and gold — sunlit ivory and soft pale gold (#ffe9a8), airy, with cool blue shadow / `stainedglass` stained glass — jewel-coloured patches of light on pale stone in deep shade, pale-gold (#ffe9a8) beams / `vigil` night vigil — darkness holding small warm flames with pale-gold (#ffe9a8) halos / `rosedawn` rose dawn — pink-gold (#ffe9a8) cloud light and lilac shadows / `glare` holy glare — blinding white-gold (#ffe9a8) light with dark shapes in front of it
- 장소 낱말(장면을 쓸 때): white citadel walls, cathedral nave, bell tower, cloister garden, battlements at dawn, hall of oaths, reliquary crypt, the long wall facing the empty land, pilgrim road, terrace above the clouds, candle chapel

### A3 벨루미르의 별 — wind `#9fe3d6`

- 깃발 한 줄: Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
- 배색: `starindigo` star indigo — deep indigo night full of stars, wind-teal (#9fe3d6) streaks and silver / `thinair` thin air — pale high-altitude daylight, white cloud and cool shadow, wind-teal (#9fe3d6) accents / `aurora` aurora — teal-green (#9fe3d6) and violet ribbons of light over darkness / `stormcloud` storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts / `duskrose` dusk above the clouds — rose and peach light with deep teal (#9fe3d6) shadows / `moonsilver` moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6)
- 장소 낱말(장면을 쓸 때): top of a needle spire, archers' lookout platform, drifting sky-islands, sea of clouds, star observatory, library of star charts, wind-tunnel canyon, rope bridges between spires, eyrie, edge of a storm front, frozen high pass

<!-- /AUTO:FLAGS -->

## 3. 장면 쓰는 법 (이 체계의 전부)

```json
"B1-10": {
  "shot": "ground", "dir": "L", "place": "R", "pal": "ember",
  "scene": "Ground-level view across wet cobblestones beneath a raised iron portcullis: a lean wolf-sized hound with smouldering ember-red fur lies on the right, chin on its soot-black paws, eyes fixed leftward on a pair of muddy boots striding past in the blurred foreground. Its half-open jaws leak a coal-red glow, and each breath lifts a curl of smoke toward the dark gate arch above.",
  "light": "The only light is the hound's own glowing throat and fur tips, warming the cobbles and the iron teeth of the gate from below."
}
```

### 3.1 모든 카드
1. **카메라가 보는 것만 쓴다.** 영어, `scene` 45~100단어. 눈에 보이는 명사와 한순간. epic · powerful · mysterious 같은 평가 말은 그림이 되지 않는다.
2. **틀을 글로 푼다.** `shot`(어디서 보나 — 4장 표) · `dir`(주인공이 향하는 쪽) · `place`(화면의 어느 자리)를 고르고, 그 뜻이 `scene` 안에 문장으로 들어가게 쓴다. 낱말만 적고 글은 평범하면 그림도 평범하다.
3. **`light`는 한 문장**(8~30단어): 광원이 무엇이고 어디서 오는지, 때와 날씨. 고른 `pal`과 맞아야 한다.
4. **카드 하나에 생각 하나.** 서사에서 그 카드만의 것(하는 짓 · 버릇 · 쓰임 · 농담)을 하나 골라 그림으로 옮긴다. 일반 카드일수록 서사의 재치가 개성이 된다.
5. **옆 카드와 다르게.** `scene_tool.js todo`의 제안 틀이 출발점이다(그 깃발에서 덜 쓴 것부터 나눠 준다). 더 맞는 틀이 있으면 바꾸되 `lint`를 통과시킨다. 같은 말로 시작하지 않는다("Seen from …"만 되풀이하지 않는다). 때 · 날씨 · 거리 · 장소도 바꾼다.
6. **파격을 섞는다.** 정면 초상만 쓰지 않는다 — 발자국 속 시점, 수면 아래, 그림자만, 눈동자에 비친 모습, 단면, 한 동작의 잔상 같은 틀을 깃발마다 여럿 쓴다. 다만 무엇을 그렸는지는 한눈에 읽혀야 한다.
7. **긍정문으로.** 없어야 할 것을 적지 말고 있는 것을 적는다.
8. **고유명사를 쓰지 않는다.** 그림 AI는 포르탄 · 도르마크를 모른다. 보이는 모습으로 푼다("a fortress-foundry of chimneys", "a mountain-sized sleeping giant's ribs").
9. **글자를 부르는 것을 피한다.** 간판 · 깃발의 문구 · 펼친 책의 글 · 숫자판 대신 봉랍 · 매듭 · 문양 · 눈금 없는 다이얼.

### 3.2 유닛
- **몸은 종류(kin)의 것이다.** 생김새는 `art_kinds.json`. 유닛마다 제 종류가 있다(`js/kinds.js` `KIND` — 깃발 기본 종류는 2026-11-21에 들어냈다). 불개는 불개, 깨어난 대포는 대포, 잿너구리는 잿너구리다 — 그 몸을 보이는 대로 직접 묘사한다.
- **레벨이 크기다.** 1~2 작고 소박 · 3~4 다부짐 · 5~6 크고 위압적 · 7 거대(작은 것을 곁에 두어 크기를 보인다).
- **하는 일을 보인다.** 능력 · 성향(벽 · 돌격 · 원거리 · 가시 · 재생 …)은 자세와 주변의 흔적으로.
- 화려함(빛 · 입자 · 광휘)은 등급 줄이 맡는다(2장) — 장면에 등급 강조색이나 "빛나는 오라"를 따로 쓰지 않는다. 장면은 아래 결대로 **무슨 순간인가**만 다르게 쓴다.
- 등급의 결: 일반 = 지켜본 듯한 평범한 한순간 / 고급 = 솜씨가 드러나는 순간과 말해 주는 소품 하나 / 에픽 = 세계가 반응하는 사건(날씨 · 규모) / 레어 = 되풀이해 이야기할 만한 순간(더 대담한 연출 · 깊은 공간. 레어 유닛은 오라의 영향이 주변에 보이게) / 유니크 = 그 전설을 정의하는 한 장면, 그 깃발에서 가장 대담한 그림 — 주인공은 신 · 용 · 마왕급의 거대한 판타지 존재다(탑 · 성벽 · 공성탑과 견줄 크기, 작은 병사 · 건물을 곁에 두어 크기를 보인다. 레벨 6이어도 이 크기로 쓰고, 카드의 종류가 동물이어도 몸은 그 급의 판타지 존재로 쓴다) / 스페셜 = 깃발마다 하나뿐인 신화적 존재(제 원소로 이루어진 몸, 요새 · 군대 · 용과 견줄 크기 — 종족 낱말을 쓰지 않고, 늘 올려다보는 정면으로 쓰지 않는다) / 강화 = 원래 카드와 같은 개체가 같은 틀에서 맞는 다음 순간(아래 "강화 장면 쓰는 법") / 소환물 = 단순하게, 막 불려 나온 순간.

### 3.3 마법
- **주인공은 마법 현상이다.** 이름 + 효과 + 서사에서 "이 마법이 실제로 무엇을 하는가"를 물리적인 한 장면으로 만든다 — 그 마법으로만 읽히게. 흔한 빛 폭발로 뭉개지 않는다.
- 사람은 필요할 때만 작고 이름 없는 것으로(무릎 아래의 장화, 방패 줄, 먼 실루엣). 시전자의 초상은 그리지 않는다.
- 마법이 생물로 이루어져 있으면(늑대 무리 · 덩굴 · 환영) 그 생물이 현상이다.
- 틀로 다양하게: 터지기 직전(`before`) · 지나간 자리(`after`) · 물건 하나로(`object`) · 위에서 본 자국(`top`) · 땅속 단면(`cut`) · 반쯤 바뀐 것(`transform`) · 상징 정물(`symbol`, 핸드 · 운명 · 교환 같은 추상 효과에).

### 3.4 아이템
- **주인공은 물건 하나다.** 재료 · 만듦새 · 크기 · 닳은 자리를 정확히 쓴다. 이야기는 놓인 자리가 한다 — 방금 쓴 자리(`used`), 두는 자리(`stored`), 잃어버린 자리(`found`), 만드는 중(`making`), 원소에 먹힌 모습(`nature`), 속 구조(`cut`).
- 주인은 화면 밖이다. 손 · 발톱은 `shot`이 `hand`일 때만, 손목에서 자른다(깃발마다 한두 장).
- 작업대 정물만 되풀이하지 않는다.
- 스페셜 아이템은 성소에 모신 하나뿐인 유물이다 — 주인 · 신 · 거인 · 용은 화면 밖에 두고 흔적과 크기 단서로만 느끼게 한다.

## 4. 틀 낱말

<!-- AUTO:SHOTS -->
**유닛**

| shot | 뜻 |
|---|---|
| `eye` | eye level at a natural distance, as if standing beside it |
| `close` | tight close-up — head or upper body fills the frame |
| `high` | from above, looking down at it |
| `back` | from behind it, seeing what it faces |
| `profile` | strict side view, flat like a frieze |
| `tilt` | tilted, off-balance frame caught mid-motion |
| `ground` | camera on the ground, through grass, rubble or feet |
| `far` | far away — the subject small inside a wide place |
| `over` | over the shoulder of it, or of whoever faces it |
| `front` | dead-on frontal, symmetrical, confrontational |
| `through` | glimpsed through an opening or obstruction — bars, reeds, flames, a doorway, ribs |
| `silhouette` | backlit black shape against light; the outline tells everything |
| `top` | straight overhead, map-like |
| `macro` | extreme close detail — an eye, a claw, a hand at work — the rest implied |
| `pov` | first person — the viewer is its prey, target or handler |
| `reflect` | seen as a reflection or a cast shadow — in a puddle, a blade, on a wall |
| `under` | from below a surface, looking up through water, a grate or a pit mouth |
| `cut` | cross-section — burrow, hollow trunk, tunnel or shell opened to view |
| `swarm` | many bodies fill the frame edge to edge as a pattern |
| `inside` | from inside something, looking out past it — a mouth, a barrel, a cave, a lantern |
| `echo` | one movement shown as several overlapping moments in a single frame |
| `low` | from low down, looking up — used sparingly |

**마법**

| shot | 뜻 |
|---|---|
| `impact` | the instant of impact at close range |
| `after` | the aftermath — what is left, still glowing or smoking |
| `object` | told through one affected object |
| `path` | its travel across the frame, seen from the side |
| `before` | the held breath just before it happens |
| `top` | straight overhead — its footprint on the ground |
| `far` | far away — the phenomenon against land and sky |
| `macro` | extreme close-up of the magic's own matter |
| `pov` | coming straight at the viewer |
| `origin` | looking along its line of travel from where it began |
| `through` | framed by an opening — a doorway, a breach, a ribcage of ruin |
| `reflect` | seen as a reflection or as shadows thrown on a wall |
| `cut` | cross-section of ground, water or air with the magic moving inside |
| `column` | one tall vertical — a pillar, a fall, an ascent |
| `ring` | radial and concentric, centred |
| `swarm` | many small elements filling the frame |
| `transform` | a thing caught half-changed |
| `symbol` | an emblematic arrangement of things that stands for the effect |
| `under` | from underneath, looking up at it |
| `inside` | from inside the phenomenon, looking out |

**아이템**

| shot | 뜻 |
|---|---|
| `used` | where it was just used — stuck, smoking, dripping, embedded |
| `stored` | in its place of keeping — hook, rack, chest, niche, saddlebag |
| `found` | lost or abandoned — half-buried, underwater, in grass |
| `macro` | extreme close-up of its one telling detail |
| `top` | straight overhead, laid out with its accessories |
| `hung` | hanging, lit from behind |
| `making` | half-made — on the anvil, in the mould, on the loom |
| `stand` | on a stand, post, statue or empty armour — the wearer implied |
| `through` | glimpsed through something — wrapping, bars, ice, a keyhole |
| `reflect` | the world reflected in its surface |
| `cut` | cutaway or exploded view of its inner workings |
| `nature` | claimed by its element — overgrown, encrusted, charged, half-melted |
| `pair` | beside the one thing that explains it |
| `motion` | caught in mid-air — thrown, falling, spinning |
| `bench` | on the maker's bench among tools |
| `hand` | one hand, claw or paw holding or wearing it, cropped at the wrist — used sparingly |
| `shrine` | set out ceremonially with offerings |

**dir** — `L` faces or moves left · `R` faces or moves right · `F` toward the viewer · `B` away from the viewer · `U` upward · `D` downward · `N` no facing — radial, still or all over

**place** — `C` centre · `L` left third · `R` right third · `T` upper part · `B` lower part · `X` spread across the whole frame
<!-- /AUTO:SHOTS -->

검사 기준(한 깃발 안, `node tools/art/scene_tool.js lint <깃발>`): 유닛은 같은 shot이 12%까지 · 올려다보기(`low`)는 2장까지 · 방향 L과 R이 각각 40%까지이고 서로 비슷 / 마법은 같은 shot이 15%까지 / 아이템은 같은 shot이 2장까지 / 가운데(`C`)는 40%까지 / 배색 여섯을 모두 쓰고 하나가 28%를 넘지 않음 / 종족 낱말 · 고유명사 · 한글은 오류, 부정 낱말과 마법 · 아이템의 인물 낱말은 주의.

## 5. 새 카드가 생겼을 때

1. `node tools/art/scene_tool.js todo` — 장면이 없는 카드의 자료(종류 · 서사 · 효과)와 제안 틀이 나온다.
2. `tools/art/art_scenes/<깃발>.json`에 장면을 쓴다(3장). 유닛의 종류가 새것이면 `art_kinds.json`에 생김새도.
3. `node tools/art/scene_tool.js lint <깃발>` → 오류 없음.
4. `node tools/art/build_prompts.js` → `python3 tools/art/artmap.py`(장부 · 보드).
- 카드 이름 · 효과가 바뀌면 그 카드의 장면을 다시 쓴다. 이미 그린 그림이 옛 카드 것이면 `tools/REMAKE.md`에 올린다.
- 문구(②~⑤)나 틀 낱말을 고치면 `art_style.json`의 `version`을 올린다(n1 → n2). 장부가 그림마다 그린 판을 적어 둔다.

## 6. 그린 뒤

- 카드 하나의 프롬프트만 붙여 넣는다. **카드마다 새 대화**(같은 대화의 앞 그림을 따라간다).
- 받은 그림(가로 5:4)은 `tools/art/inbox/<카드ID>.jpg` → `python3 tools/art/artmap.py import`. 장부 `art_map.csv`, 보드 `art_board.html`.
- 그림이 장면과 다르게 나오면 프롬프트에 금지 줄을 덧붙이지 말고 **장면 글을 고쳐 쓴다**(더 구체적으로, 앞쪽에). 같은 문제가 여러 카드에서 되풀이될 때만 `art_style.json`의 한 줄을 고친다.
- 강화 카드는 원래 카드 그림을 먼저 그려 함께 넣는다(편집이 아니라 "같은 개체 참고"로 넣고 새 그림을 그린다). 원래 그림이 아직 없으면 같은 대화에서 원래 카드 → 강화 카드 차례로 그린다. 두 그림을 100px 섬네일로 나란히 놓아 바로 짝으로 읽히면 된 것이다.
- **강화 장면 쓰는 법**(2026-11-22): ① `dir · place · pal`은 원래 카드와 같게(lint 오류), `shot`도 같게 — 바꾼다면 한 걸음 가까이만(lint 주의). ② 원래 장면의 몸 낱말(종류 · 털빛 · 흉터)과 대표 소품 · 장소를 그대로 다시 적고 "the same …"으로 잇는다 — 참조 그림 없이도 같은 개체로 그려지게. ③ 바꾸는 것은 순간이다: 원래 장면이 시작한 일의 결실(돌기 시작한 못 → 배를 삼키는 소용돌이), 더 큰 몸 · 늘어난 소품 · 따르는 무리 · 오른 계급. ④ 세 장을 합친 흔적을 한 가지("three …" — 잔 셋, 새 석축 세 단, 화살 셋). ⑤ 빛 문장은 원래 카드와 같은 광원으로 쓴다 — 청록빛 · 채도 · 안개는 등급 줄이 맡는다.

## 7. 예시 (지금 카드의 완성 프롬프트)

<!-- AUTO:EXAMPLES -->
#### 일반 · 유닛 — A1-02 그림자 도둑

```
Landscape 5:4 painting. From inside a street lantern, past its sooty glass panes and the flame at the bottom edge: on the wet cobbles below, a thin black cat with a nicked ear crouches at the right, just outside the circle of light, and peels the long shadow of a passing merchant off the stones like a strip of black cloth, gathering it in its teeth as it creeps left. The merchant walks on out of frame, purse still on his belt, the lit cobbles at his heels bare. Warm amber from the lantern flame pools on the cobbles; beyond its edge the alley is violet-black.
Colour: candle islands — small pools of amber light in vast dark, violet (#8b5cf6) in the shadows.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 일반 · 공격 마법 — GN-B3-1 번개 바늘

```
Landscape 5:4 painting of a spell — the magic itself is the subject. Extreme close-up of chain mail, each iron ring as big as a fist in the frame. One ring is rusted thin, and exactly through it passes a long copper needle travelling to the right, drawing behind it a thread of live lightning that has already stitched through a second weak ring further left. Around both punctures the links glow and begin to part. Warm amber gloom; the thread's yellow filament glare runs along the needle and beads on the oiled iron.
Colour: copper warmth — copper, amber glass and electric-yellow (#ffd84a) filament glow.
Banner of lightning: a storm plateau where a sleeping giant's nerves spark up through the ground — forked bolts, fulgurite glass, copper, glass jars of captive lightning, rain and ozone haze.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 일반 · 아이템 — C2-1 견습 단궁

```
Landscape 5:4 painting of one object — the object itself is the subject. A short, stubby bow of plain ash hangs by its hemp string from a wooden peg beside a narrow window, in the left of the frame, lit from behind. It is a learner's bow: barely an arm long, the grip wrapped in new cord over old, one limb tip chipped and mended with glue and thread, a row of small dents along the belly. The peg is one of a long row at child height, worn to a groove, and the draught through the window keeps the bow turning slowly on its string. Grey-violet storm daylight from the window behind it outlines the bow and string in silver; the wall beside it is in soft shade.
Colour: storm cloud — grey-violet cloud and silver rain with wind-teal (#9fe3d6) gusts.
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Common — the quietest of the six rarity tiers. Mood: grounded, honest, quietly beautiful. Light: only the light the scene itself names, natural and soft. Saturation: restrained and earthy, the banner colour its one clear accent. Air: clear and ordinary — dust, smoke or mist at most. Surfaces: plain, worn, well-used materials, lovingly observed.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 고급 · 유닛 — A1-01 계약의 저주 인형

```
Landscape 5:4 painting. Looking down onto a scribe's cluttered desk: a small burlap rag doll with mismatched button eyes sits slumped at the left edge, its back to us, a corner of folded parchment poking from a split seam like stuffing. One rusty pin already stands in its shoulder, and its own stubby hand is pushing a second pin into its other arm. Across the desk to the right lies a row of five sealed, ribboned scrolls, one of them twitching on the wood. A single guttering tallow stub at the top edge throws long black shadows from the pins across the desk; the wax seals glow deep crimson.
Colour: blood and ink — black and deep crimson with a thread of violet (#8b5cf6).
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Superior — second of the six rarity tiers, one clear step above common. Mood: assured, polished, capable. Light: the scene's light plus a clean second light tracing the subject's edges. Saturation: a little richer and clearer than everyday. Air: still ordinary, but a few warm-gold (#f2cf3d) glints catch on edges and metal. Surfaces: well-made and well-kept, crisper and finer in detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 레어 · 유닛 — PN-A1-R 그림자 계약 집행자

```
Landscape 5:4 painting. Far across a frost-white square in a canyon city, three small figures stand motionless in a row at the right. The middle one is a man-tall raven standing upright in a long dark coat, a folded contract with a dangling seal held flat to its breast under one wing. Shadow pours from the paper down its coat and along the ground to the guards on either side, climbing their halberds and edging the blades in violet. Before them one figure kneels, and above its bowed head hangs a single puff of white breath, the only one in the square. Moonless blue-violet night; frost on the paving and tarnished silver lamps along the canyon wall give a cold, even glimmer.
Colour: indigo frost — cold blue-violet (#8b5cf6) night air and tarnished silver.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Rare — third of the six rarity tiers, clearly above superior. Mood: striking and a little uncanny — the first visible touch of magic. Light: bolder contrast and deeper space, with a cool sapphire (#4ea8ff) rim light along the subject's contour. Saturation: clear and vivid wherever the light falls. Air: a thin luminous haze and a scattering of drifting ether motes close around the subject. Surfaces: fine ornament and precise, gleaming detail.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 에픽 · 유닛 — EP-A1-1 심연 칼날 무희

```
Landscape 5:4 painting. One turn of a dance shown as five overlapping moments across a small stage: the same tall black mantis in dark silk sashes repeats from left to right in fading afterimages, her two crescent blade-arms drawing one unbroken silver ribbon through all five. The last and sharpest figure, at the right, sinks into a bow with both blades folded behind her back. Along the bottom edge runs a dark row of spectators' heads, and in the middle of the row one seat stands empty, a feathered hat still settling onto its cushion. Violet footlights glow up from the stage edge and rim every afterimage; the house beyond the front row is purple-black.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 에픽 · 공용 마법 — NA3-4 바람의 사냥

```
Landscape 5:4 painting of a spell — the magic itself is the subject. At the left edge a huge ivory hunting horn banded in silver is chained to a rock ledge above the clouds, its bell pointing right, frost shaken from it in a ring. Out of the bell rolls a gale made visible: a long widening funnel of torn cloud running the whole width of the frame, with a hundred arrows riding inside it point-first like a shoal of fish. The front of the funnel has taken the shape of running hounds, mist-bodied and stretched flat out, baying toward the right. Full moon above the cloud sea: blue-silver light on the horn and the funnel's upper edge, sharp shadow beneath, teal in the hounds' wake.
Colour: moon silver — blue-silver monochrome under a full moon, sharp shadows, a breath of teal (#9fe3d6).
Banner of wind: needle spires and drifting sky-islands above the clouds, where the stars are read like a book — thin air, feathers, silver, taut bowstrings, star charts and open night sky.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 에픽 · 아이템 — PI-A1 모르카스의 저울추

```
Landscape 5:4 painting of one object — the object itself is the subject. In a bare stone niche at the left of the frame sits a single scale weight of black bronze, the size of a fist: a squat cone with a ring handle on top and a closed eye cast in its side, its foot worn bright where it once sat in a pan. The shelf beneath it has dented like soft wax, a crack running to the wall, and everything near leans toward it: a hanging plumb line pulled off true, a spider's thread, the falling dust. Above, the hook it was taken from hangs empty. A thin cold slit of light from behind rims the cone, its ring and the bent plumb line; the niche is black with violet haze.
Colour: eclipse — a thin cold rim of light with everything else in silhouette, violet (#8b5cf6) haze.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Epic — fourth of the six rarity tiers, clearly above rare. Mood: grand and charged with power; the world itself reacts to the subject. Light: volumetric shafts through deep atmosphere, and a soft aura of energy around the subject that spills its glow onto everything near it. Saturation: rich, deep and glowing. Air: moving weather, with streams of violet (#b46cff) arcane motes carried on it. Surfaces: ornate and precious, intricately worked.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 유니크 · 유닛 — UN-A1 피의 서약자

```
Landscape 5:4 painting. Through the eyes of the one he has struck: our dented shield rises along the bottom edge, a black wax seal smoking where he struck. A thin thread of blood-dark ink climbs from it to the tip of a greatsword long as a bridge. Filling the right of the hall stands a vampire lord tall as its pillars: bone-pale face under a crown of black iron thorns, violet eyes, membranous wings folded like a cloak. The same thread runs from his opened palm up the blade, and on a scroll long as a war banner a fresh line draws itself. Cold violet light falls from the high windows and gleams along wings, thorns and steel; the single wet thread of ink is the one dark-red line in the purple-black hall.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Unique — fifth of the six rarity tiers, second only to special. Mood: legendary, fierce and intense — the most daring picture of its banner. Light: theatrical chiaroscuro, a brilliant key light against deep black, and the subject radiant with a power of its own in its banner colour, violet (#8b5cf6). Saturation: jewel-bright and deep, with violet at its fullest strength. Air: thick with swirling motes and sparks of violet light, a shimmering haze and fine threads of filigree light winding around the subject. Surfaces: masterwork detail everywhere, inlaid and glowing violet at the seams.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

#### 스페셜 · 유닛 — SP-A1 그림자 없는 아즈라

```
Landscape 5:4 painting. Straight down from high above a canyon city: black roofs, bridges and stairs picked out by violet lamps. Every shadow in it, of towers, bridges and people small as grains, lies stretched toward one point in the left third, like compass needles toward a lodestone. There stands a figure taller than any spire: a body of gathered darkness under a thin crescent crown, face turned down and away, a train of night spilling from her shoulders through the streets like ink. Around her feet lies a ring of bare, bright paving, shadowless. Her crescent crown burns pale and the shadowless ring at her feet shines from within, the brightest things in the city; violet lamplight edges roofs and bridges in purple-black gloom.
Colour: violet shade — purple-black gloom with luminous violet (#8b5cf6) edges.
Banner of darkness: a sunless canyon under a moonless sky, ruled by a god of price — shadow, obsidian, candle smoke, wax seals, scales, chains and blood paid as coin.
Special — the highest of the six rarity tiers, unmistakably beyond every other. Mood: mythic, mysterious and overwhelming — sacred awe. Light: the subject is itself a source of light, radiance in layers — a white-hot core, a wide halo, great rings and long rays of crimson (#ff4d73) and gold crossing the whole picture, blooming and refracting through the haze. Saturation: the most luminous, iridescent colour of any card, from velvet black to blinding white-gold. Air: filled with storms of sparks and veils of ether light, while land, sky and weather bend toward the subject. Surfaces: matter beyond mortal craft, glowing from within.
Rarity ladder: common → superior → rare → epic → unique → special — each tier looks one clear step more radiant, mysterious and splendid than the tier below, and never outshines the tier above. Every tier is finished, beautiful work: the scene decides what is shown, the tier decides how splendid it looks.
ETHERION card art — painterly dark-fantasy illustration: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size. Painting only, edge to edge, no lettering — the game adds its own frame and text.
```

<!-- /AUTO:EXAMPLES -->

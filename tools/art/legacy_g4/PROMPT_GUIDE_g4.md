# ETHERION 카드 일러스트 프롬프트 가이드 — 등급별 (v1.4, 2026-11-20)

> v1.4 (프롬프트 g4, 게임 v3.96): **등급별 카메라 · 구도 · 조명 완전 분리 & 마법 · 아이템 자체 중심**. 모든 등급이 '로우 앵글 + 정가운데 + 역광'으로 겹치던 문제를 없애고 6단계 시각 문법을 갈랐다 — **일반** = 눈높이·살짝 위 50mm 현장 캔디드(비대칭 · 실용 측광, 로우 앵글 · 역광 금지) / **고급** = 눈높이 85mm 허리 위 인물 초상(얕은 심도 보케 · 렘브란트 측광) / **레어** = 3/4 로우 + 미세 틸트 대각선 액션(전경 파편 3단 깊이 · 교차광 + 사파이어 림) / **에픽** = 24mm 초광각 로우 와이드 전장 · 날씨 압도(역광 + 볼류메트릭 신광) / **유니크** = 카드별 파격 시그니처 시점(`_shot`, 부감 · 뒷모습 · 유리 너머 등) + 오프센터 이중 서사 + 장면 광원 키아로스쿠로 / **스페셜** = 지평선이 바닥 끝에 깔리는 극단적 웜즈아이 · 천공 성화(성채 · 산맥 미니어처 + 자체 발광 · 다중 룬 고리). **마법 · 아이템 분리**: 아이템 전용 `itemFocus` · `itemBackground` · `itemComposition` · `itemLightDir`를 신설하고 아이템 서사도 뜻·분위기 전용으로 바꿔 인물·손 출현을 차단(45° 작업대 정물 → 눈높이 공방 매크로 → 석단 로우 히어로 → 부양 성물 → 성소 대칭 성화). 마법은 `spellFocus` · `spellDetail` · `spellBackground` · `spellLightDir`를 전 등급에 통일해 마법 자체를 주광원이자 유일한 주인공으로 고정(국소 현상 → 3/4 측면 추적 → 대각선/전술 부감 → 초광각 재앙 파노라마).

> v1.3 (게임 v3.95): **스페셜 아이템은 물건용 말로** — 유닛용 줄(얼굴 · 손 · 제 힘으로 된 몸 · 요새보다 큰 키)과 깃발 종족의 몸 묘사를 빼고, `art_style.json` `grades.special`의 `itemQuality` · `itemScale` · `itemCamera` · `itemDetail` · `itemBanner`를 쓴다(종족은 손 · 팔 또는 멀리 작은 그림자까지만). 같은 깃발의 스페셜 유닛과 무대가 겹치지 않게 아이템은 **성소에 모신 유물**로 — `itemBackground`(고향 깊은 곳의 성소 · 제단, 근원은 먼 틈으로만) · `itemLighting`(유물 자체의 빛 + 위에서 한 줄기) · `itemSpectacle`(룬 고리 하나 · 빛줄기 하나) · `itemMood`. 유닛은 그대로 하늘을 채운 존재. 같은 깃발 유닛 · 아이템 프롬프트의 같은 문장이 48% → 27% 안팎. 그릴 때는 카드 프롬프트(``` 안)만 넣고, 카드마다 새 대화에서 그린다(같은 대화의 앞 그림을 따라감). **스페셜 18장은 짧은 틀**(`grades.special.compact*`): 등급 공통 줄(Quality · Lighting · Detail · Spectacle · Presence · Accent · 깃발 재료 · 상징 · 진영)을 Scale · Camera · Setting · Light and colour 네 줄로 묶고, 그림 지시 · 서사 바로 뒤에 "이 카드만의 지시가 먼저" 한 줄을 둔다. 프롬프트 약 900 → 500단어, 스페셜끼리 같은 문장 약 520 → 210단어. 카드마다 다른 것은 그림 지시 · 서사뿐이라 아이템처럼 그림 지시가 짧은 카드는 그림 지시를 길게 쓸수록 덜 닮는다. 그림 지시가 있으면 "애매하면 단검 · 구슬" 대체 말을 넣지 않고, 룬 고리는 등급 표시라는 한 줄만 붙인다. 스페셜(유닛 · 아이템)의 그림 지시 · 깃발 줄에서 종족 이름(고블린 · 오크 · 노움 · 엘프 …)을 부정문까지 모두 뺐다 — 깃발 이름과 원소로 그린다. 이름에 종족이 들어간 카드만 그 종족으로. **모든 등급 공통**: 깃발 금지 줄(`flags.<깃발>.never`)에서 깃발이 종족 이름이던 때 생긴 금지(드워프 대검 · 엘프 · 숲 엘프 · 거인 · 주문책 · "신비한 마법" 전부 금지)를 빼고 원소 · 정체성 금지만 남겼다. 종류(kin) 유닛의 "옛 종족으로 그리지 말 것" 문구를 뺐고, 종류 묘사의 종족 비교("오크보다 큰" · "오크 기수" · "엘프 아님")도 지웠다. 아이템의 깃발 줄에는 종족의 몸(who · silhouette)을 넣지 않는다. 종류가 바뀐 유니크 4장(UN-A1-7 망령 · UN-A3-7 나이트엘프 · UN-G2 · UN-G2-7 트렌트)의 그림 지시를 새 종류로 고쳤다.

> v1.2 (프롬프트 g3, 게임 v3.59): **화려함 사다리**(등급마다 `Spectacle` 줄 — 한 단계씩 더 화려하게, 강조색 몫도 5 → 30%로 커짐)와 **스페셜 = 깃발마다 하나뿐인 거대한 존재**(평범한 고블린 · 오크 · 마족으로 그리지 않음, 깃발은 색 · 재료 · 상징으로만, 반쯤 가려 상상하게 하는 기법 허용).

> **For any AI reading this (GPT, Gemini, Claude…):** this is the rulebook for writing image prompts for ETHERION card illustrations.
> Every prompt = **base style + grade tier + banner identity + level scale + card name/lore + type rule + safe-area/negatives.**
> Grade decides *how precious and ornate* the picture is; level decides *how big and powerful* the subject is; the banner decides *who and what it looks like*.
> Ready-made prompts for every existing card are in `tools/art/prompts/grades/<grade>.md`. For a **new** card, follow section 7.
> Write prompts in English (image models follow English best); the Korean card name stays in quotes for meaning only.

이 문서는 그림 AI(GPT Image · Gemini)에 넣을 카드 일러스트 프롬프트를 **등급별로 통일**하는 규칙이다. 지금 카드의 프롬프트는 모두 만들어 두었고(`tools/art/prompts/`), 앞으로 생길 카드도 이 문서대로 쓰면 같은 결이 나온다.
그림체의 바탕은 `docs/STYLE_GUIDE.md` 6장, 세계관은 `docs/WORLD.md`. 이 문서와 다르면 스타일 가이드가 이긴다.

- `<!-- AUTO:… -->` 칸은 `node tools/art/build_prompts.js`가 `tools/art/art_style.json`에서 채운다. **고칠 때는 art_style.json을 고치고 다시 돌린다** — 이 문서의 표만 고치면 다음에 덮인다. 나머지 글은 손으로 고쳐도 된다.

<!-- AUTO:COUNTS -->
프롬프트 버전 **g4** (2026-11-20) · 카드 706장 (뺀 카드 제외, 소환물 포함)

| 등급 | 색 | 장수 | 유닛 · 마법 · 아이템 | 등급별 프롬프트 파일 |
|---|---|---|---|---|
| 소환물 (Summoned token) | `#8fdcff` | 17 | 13 · 4 · 0 | `prompts/grades/token.md` |
| 일반 (Common) | `#f4f1ea` | 362 | 212 · 110 · 40 | `prompts/grades/common.md` |
| 고급 (Superior) | `#f2cf3d` | 130 | 78 · 36 · 16 | `prompts/grades/uncommon.md` |
| 레어 (Rare) | `#4ea8ff` | 58 | 9 · 40 · 9 | `prompts/grades/rare.md` |
| 강화 (Empowered) | `#3fe0c0` | 40 | 40 · 0 · 0 | `prompts/grades/upgrade.md` |
| 에픽 (Epic) | `#b46cff` | 63 | 36 · 18 · 9 | `prompts/grades/epic.md` |
| 유니크 (Unique) | `#ff8a2a` | 18 | 18 · 0 · 0 | `prompts/grades/unique.md` |
| 스페셜 (Special) | `#ff4d73` | 18 | 9 · 0 · 9 | `prompts/grades/special.md` |
<!-- /AUTO:COUNTS -->

---

## 0. 한눈에 — 세 축과 한 빛

| 축 | 정하는 것 | 예 |
|---|---|---|
| **등급** (일반 → 스페셜) | 얼마나 웅장하고 화려한가: 카메라 · 빛의 연출 · 배경의 넓이 · 장식 · 등급 강조색. **공들인 정도는 모든 등급이 같다** | 일반 = 눈높이 · 가까운 한 구석 / 스페셜 = 하늘을 채운 근원 존재 · 금빛 룬 고리 |
| **레벨** (1 → 8) | 얼마나 크고 강한가: 몸집 · 위압감 · 효과의 범위 | 1레벨 = 평범한 몸 / 7레벨 = 주변이 휘는 거대함 |
| **깃발** (9개) | 누구이고 무엇으로 만들어졌나: 종족 · 실루엣 · 재료 · 상징 · 고향 · 근원 | 잿불 고블린 = 작은 몸 + 커다란 대포 + 화약 연기 |
| **빛** | 원소색이 늘 주광, 등급 강조색은 보조 — 몫이 등급마다 커진다(고급 5% · 레어 10% · 에픽 15% · 유니크 20% · 스페셜 30%) | 바위주먹 오크 에픽 = 황토 빛 + 보랏빛 알갱이 조금 |

- **완성도 바닥선**: 모든 등급이 완성된 카드 일러스트다 — 얼굴 · 손 · 재질 · 빛을 공들여 그리고, 성격이 보이는 표정과 분명한 동작, 실제로 보이는 장소. 높은 등급은 규모 · 볼거리 · 장식을 더할 뿐 정성을 더하지 않는다(프롬프트의 `Quality floor` 줄).
- 등급과 레벨은 따로 논다. **일반 7레벨**은 거대하지만 배경이 가깝고 장식이 실용적이다. **유니크 5레벨**은 사람 크기여도 포스터 같은 영웅 초상이다.
- 높은 등급일수록 배경이 "가까운 벽 → 고향 → 랜드마크 → 근원 존재 → 세계 전체"로 멀고 커진다(깃발 표의 hint · home · landmark · source · mythic).
- **화려함 사다리**(g3): 등급마다 `Spectacle` 줄이 붙는다 — 일반 없음 → 고급 반짝임 몇 점 → 레어 에테르 알갱이 · 테두리 빛 · 안개 → 에픽 빛줄기 · 오라 · 날씨 → 유니크 대담한 구도 · 불티 · 금 세공 · 장면 속 근원의 흔적 → 스페셜 여러 겹 룬 고리 · 하늘을 가르는 빛기둥 · 진홍 금 오라. 늘 바로 아래 등급보다 한 단계 더, 위 등급보다는 덜.
- **유니크는 카드마다 다른 구도**(v3.96): 레어 · 에픽 · 스페셜이 모두 "아래에서 올려다보는 가운데 영웅"이라 유니크는 영화의 대표 장면 한 컷처럼 그린다. `art_notes.json` `_shot.<카드ID>` = `{ camera, light }`가 Camera 줄 전체와 원소 주광의 방향을 정한다 — 카메라는 눈높이나 위(부감 · 정면 평면 · 뒷모습 · 옆모습 · 망원 · 원경 · 유리 너머 등), 주인공은 한쪽에, 빛도 카드마다 다른 쪽. 근원은 뒤의 거대 실루엣 대신 장면 속 흔적(그림자 · 비친 모습 · 조각 · 구름 틈). 새 유니크를 만들면 `_shot`도 다른 유니크와 겹치지 않게 적는다.
- **스페셜은 깃발마다 하나뿐인 존재**(g3, `docs/WORLD.md` 5장): 깃발 이름과 원소로 그린다(v3.95부터 프롬프트에 종족 이름을 부정문으로도 넣지 않는다 — 그림 AI가 오히려 끌어온다). 제 힘으로 이루어진 몸(불 · 쇠 · 바위 · 물 · 그림자 · 빛 · 별빛)을 가진 거대한 존재로, 요새 · 군대 · 용과 견줄 크기이고 같은 깃발 에픽 · 유니크보다 확실히 강해 보여야 한다. 그림 지시(`art_notes.json`)에도 "한때 ○○였다" 같은 출신을 쓰지 않는다. 프롬프트의 Banner 줄은 `Banner — {깃발} ({원소}): draw this being from the banner's name and its element`(종족의 몸 · 실루엣은 빼고 색 · 재료 · 상징만)이고, 존재를 반쯤 가려 배경과 주변의 반응으로 크기를 상상하게 하는 `Presence technique` 줄이 붙는다.
- 모든 그림: 밤하늘 남색 바탕(`#07080d`), 글자 · 숫자 · 틀 없음, **가로 5:4**(2026-11-20부터, 750×600) — 깃발 프레임의 그림 창(≈1.16:1)에 그림 전체가 보이고 양옆만 3.5%씩 잘린다. 주인공은 가운데, 둘레에 여유. 옛 그림은 세로 4:5(600×750, 창에서 위아래 15%씩 잘림).

## 1. 파일 지도

| 파일 | 무엇 | 누가 고치나 |
|---|---|---|
| `tools/art/art_style.json` | **그림 말의 원본** — 등급 8칸(소환물 포함) · 레벨 · 깃발 9 · 진영 3 · 원소 · 종류 · 클래스 | 사람 / AI. 고치면 `version`을 올린다 |
| `tools/art/art_notes.json` | 카드별 그림 지시(영어). 스페셜 · 유니크는 반드시, 이름만으로 모습이 애매한 카드도 | 사람 / AI |
| `tools/art/build_prompts.js` | 위 둘 + 게임 데이터 → 카드마다 완성 프롬프트 | 거의 안 고침 |
| `tools/art/prompts/grades/<등급>.md` | **등급별 프롬프트 모음**(그 등급의 연출 틀 + 카드마다 완성본). 그리는 차례: **유니크 → 에픽 → 레어 → 강화 → 고급 → 일반 → 소환물** 순, 각 파일 안은 1 그림 없는 카드(먼저) → 2 다시 그리기(장부 상태 "다시") → 3 그림 있음 | 자동 |
| `tools/art/prompts/cards/<깃발>.md` | 같은 프롬프트를 깃발별로 | 자동 |
| `tools/art/prompts/cards.jsonl` | 프로그램용(gen.py · artmap.py가 읽음) | 자동 |
| `tools/art/inbox/` | **받은 그림을 넣는 곳** — 파일 이름에 카드 ID나 카드 이름 | 사람 |
| `tools/art/artmap.py` | inbox의 그림을 카드에 연결해 `img/cards/<ID>.jpg`(가로 750×600, 세로 그림은 600×750)로 넣고 목록 `art_index.js`를 쓰고 장부 · 보드를 새로 만든다 | 거의 안 고침 |
| `tools/art/art_map.csv` | **카드 ↔ 일러스트 장부**(엑셀로 열림). 상태 · 출처 · 모델 · 메모 | 사람(상태 · 메모 칸) + 자동 |
| `tools/art/art_board.html` | 장부를 그림으로 보는 판 — 등급 · 깃발 · 상태로 거르고 프롬프트 복사 | 자동 |

## 2. 프롬프트 조립 순서

빈칸 `{…}`을 채운다. `{G.*}`는 3장 등급 표, `{F.*}`는 5장 깃발 표, `{L}`은 4장 레벨 표에서 그대로 가져온다.

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
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
Spectacle: {G.spectacle}. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): {G.technique — 스페셜 유닛만}
Grade accent: {G.accent} — the element colour stays the main light; the grade accent is a secondary touch (about {G.accentShare} of the light).
Mood: {G.mood}.
Stay true to the banner: {F.never}.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

- 마법 · 아이템도 같은 틀이다. 마법은 Banner 줄을 "magic of …, signature motifs …, palette …"로 줄인다(사람을 그리지 않는 장면이 많아서).
- **강화 카드**는 Subject 다음에 참고 그림 줄을 넣고, 원래 카드 그림(`img/cards/<원래 ID>.jpg`)을 **먼저 받아 그림 AI에 함께 첨부**한다. 프롬프트에는 원래 카드의 이름 · 서사 · 배경이 "Continuity" 줄로 들어 있어, 첨부가 어려워도 같은 인물로 그리게 한다(v3.46).
- `Quality floor` 줄(모든 등급 같은 완성도)은 Grade 줄 바로 다음에 늘 넣는다.
- 일반 등급은 Grade accent 줄을 빼고, 소환물은 등급 `token`을 쓴다.
- **스페셜 유닛**은 Subject가 "a one-of-a-kind mythic being of the {F.en} (see art direction)"이고, Banner 줄은 `Banner — {F.en} ({원소}): draw this being from the banner's name and its element. Palette … Accents to borrow from …`(F.who · F.silhouette를 넣지 않음). 깃발 금지 줄(F.never) 대신 "The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting." 한 줄만 붙는다(v3.95 — 깃발이 더는 종족 이름이 아니라서 종족 이름을 부정문으로도 넣지 않는다. 이름을 넣으면 그림 AI가 오히려 그 종족을 끌어온다). 스페셜 아이템도 같고, 물건용 줄은 위 v1.3.

## 3. 등급 사다리

### 3.1 한 장으로 비교

| | 일반 | 고급 | 레어 | 강화 | 에픽 | 유니크 | 스페셜 |
|---|---|---|---|---|---|---|---|
| 한마디 | 현장 캔디드 · 다큐멘터리 | 베테랑 85mm 초상 | 결정적 대각선 액션 | 셋이 하나로, 상승 진화 | 24mm 초광각 블록버스터 | 거장의 시그니처 씬 | 천지를 가르는 신화 성화 |
| 카메라 (유닛) | 눈높이 · 살짝 위 50mm 캔디드(로우 금지, 비대칭) | 눈높이 85mm 허리 위 초상(얕은 심도 보케) | 3/4 로우 + 미세 틸트 · 대각선 포어쇼트닝 | 원래 카드보다 가깝고 낮게(상승) | 24mm 초광각 로우 와이드(전장 · 스케일 단서) | 카드별 파격 시점(`_shot`: 부감 · 뒷모습 · 유리 너머 · 망원 등) | 지평선이 바닥 끝인 극단적 웜즈아이 · 천공 성화 |
| 카메라 (마법) | 가까운 눈높이 국소 현상 | 3/4 측면 궤적 추적 | 대각선 로우 / 높은 전술 부감 | — | 24mm 초광각 재앙 파노라마 | 상징적 성화(예비) | 세계 변혁 기적(예비) |
| 카메라 (아이템) | 45° 위 작업대 정물 | 눈높이 3/4 공방 매크로(보케) | 석단 위 3/4 로우 히어로 | — | 24mm 로우 와이드 공중 부양 유물 | 보물 전시(예비) | 성소 제단 절대 대칭 성화 |
| 화면 속 크기 | 45~50% (배경 숨 쉼) | 60~65% (가까운 초상) | 65% (3단 깊이) | 원래 + 한 걸음 | 65~70% + 광대한 환경 | 45~60% + 오프센터 이중 서사 | 75~85% + 미니어처 성채 · 산맥 |
| 배경 | 가까운 일터 · 작업대(`hint`) | 흐린 고향 · 공방 보케(`home`) | 고향 랜드마크 3단 깊이(`landmark`) | 원래 카드 배경 + 충격파 | 랜드마크 + 격렬한 날씨 · 전장 | 랜드마크 + 장면 속 근원 흔적 | 하늘을 채운 근원(`mythic`) / 깊은 성소 제단 |
| 빛 | 실용 현장 측광(역광 · 후광 금지) | 렘브란트 3/4 측광 + 금 하이라이트 | 교차광 + 반대쪽 사파이어 림 · 안개 | 역광 + 아래서 솟는 청록 | 고대비 역광 + 볼류메트릭 신광 | 장면 속 단일 광원 키아로스쿠로 | 자체 발광 + 진홍 · 금 신성 빛기둥 |
| 장식 | 실용적인 장비, 손때 · 흠집까지 | 각인 장식 · 개인 소품 | 정교한 세공 · 각인 무늬 | 보강 장비 · 셋의 표시 | 여러 겹 갑주 · 에너지 | 문장 · 걸작 무기 · 금 상감 | 제 힘으로 이루어진 몸 · 성당급 세공 |
| 화려함 | 없음 | 금빛 반짝임 몇 점 · 옅은 입자 | 사파이어 에테르 알갱이 · 림라이트 · 안개 | 아래서 솟는 청록 · 충격파 | 신광 · 오라 · 폭풍 날씨 · 파편 | 파격 구도 · 불티 · 금 세공 · 근원 흔적 | 다중 룬 고리 · 빛기둥 · 진홍 금 오라 · 천지 반응 |
| 강조색 (빛의 몫) | 없음 | 금 `#f2cf3d` 조금 (5%) | 사파이어 `#4ea8ff` 알갱이 (10%) | 청록 `#3fe0c0` 이음매 (15%) | 보라 `#b46cff` 알갱이 (15%) | 주황 금 `#ff8a2a` 불티 (20%) | 진홍 `#ff4d73` + 금 + 에테르빛 (30%) |

- 강조색은 게임의 등급 테두리 색과 같다 — 틀(코드가 칠함)과 그림이 서로 이어 보이게. 원소색을 덮지 않는다.
- 스페셜 · 유니크 · 레어는 **확실히 고급스러워야 한다**: 깊이 층(앞 · 가운데 · 먼 배경), 재질 표현, 테두리 빛, 공기 원근을 꼭 넣는다. 일반 · 고급도 같은 정성으로 그리되 **규모**로 구분한다 — 주인공이 화면에서 조금 작고, 배경이 가깝고 아담하며, 신비한 장식 · 등급 강조색이 적다.

### 3.2 등급별 넣을 말
<!-- AUTO:GRADES -->
### 소환물 · Summoned token — `token` (#8fdcff)

마법이나 능력으로 잠깐 불려 나온 것. 작고 덧없지만 그림은 공들여 — 불려 나온 흔적(흩어지는 에테르 · 원소 빛)이 아름답게 보이게.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a creature, construct or effect called into being for a moment; simple and readable |
| 카메라 camera | eye-level medium study, centred, subject about 50% of the frame |
| 빛 lighting | an element-coloured glow from the summoning with a clean rim light, clear readable contrast |
| 배경 background | plain dark night-blue with a fading wisp of ether and element light where it was called forth |
| 디테일 detail | clear, well-rendered forms with slightly translucent, glowing edges where it was conjured |
| 화려함 spectacle | a soft conjuring shimmer only |
| 등급 강조색 accent | faint ether sky-blue (#8fdcff) summoning traces (빛의 약 10%) |
| 분위기 mood | fleeting, conjured |
| 마법 카메라 spellCamera | eye-level close-to-medium study of the small conjured phenomenon, centred, filling about 50% of the frame |
| 마법이면 spell | a small, single conjured effect |
| 아이템 카메라 itemCamera | eye-level close study of the small conjured object floating in dark air, centred, filling about 50% of the frame |
| 아이템이면 item | a small conjured object |

### 일반 · Common — `common` (#f4f1ea)

그 깃발의 평범한 구성원 · 흔한 마법 · 손때 묻은 물건. 완성도는 다른 등급과 같되 시점과 조명으로 완전히 갈린다 — 유닛은 로우 앵글 없이 눈높이 · 살짝 위 50mm 현장 캔디드(비대칭 · 자기 일에 몰두 · 실용 측광, 영웅 역광 금지), 마법은 한 지점의 작고 선명한 국소 현상, 아이템은 45도 위에서 내려다보는 작업대 정물 샷. 신비한 장식 · 등급 강조색 없음.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | an ordinary member of the banner caught in an unposed, vivid moment of their work — characterful, believable and beautifully painted; grounded in scale, never less finished |
| 카메라 camera | strictly eye-level or slightly elevated candid angle (never low angle), 50mm documentary lens, subject placed naturally off-centre on a rule-of-thirds line absorbed in its task rather than posing for the camera, filling about 45–50% of the frame with surrounding work environment |
| 빛 lighting | grounded, practical side-light (lantern, hearth, torch or daylight gap — no heroic backlight, no halo, no dramatic rim), honest readable shadows and natural contrast |
| 배경 background | an intimate, painted corner of the banner's world ({hint}) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks |
| 디테일 detail | fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands |
| 화려함 spectacle | none beyond the element glow — no magical ornaments, no aura, no floating particles |
| 등급 강조색 accent | 없음 — 원소색만 |
| 분위기 mood | lively, honest, frontline |
| 마법 카메라 spellCamera | intimate eye-level close-to-medium study of a single localised magical phenomenon occurring on one spot of ground, stone or air (never wide apocalyptic angle), the spell filling about 50–55% of the frame |
| 마법이면 spell | a single clean, localised magical phenomenon, small in scale but vivid and tactile |
| 아이템 카메라 itemCamera | high 45-degree tabletop still-life angle looking slightly down at the single practical object laid naturally on a dark surface, object filling about 55–60% of the frame |
| 아이템이면 item | a used, practical object rendered with loving tactile detail (wear, scratches, stitching), resting naturally on dark wood, stone or rough cloth |

### 고급 · Superior — `uncommon` (#f2cf3d)

검증된 베테랑 · 잘 만든 물건 · 숙련된 마법. 일반(현장 캔디드)보다 카메라가 확 가까워진다 — 유닛은 눈높이 85mm 허리 위 인물 초상(얕은 심도 보케 · 안정적 삼각형 구도 · 렘브란트 측광), 마법은 화면을 가로지르는 3/4 측면 추적 궤적, 아이템은 눈높이 3/4 공방 진열 매크로 샷. 장식 끝에 따뜻한 금빛(#f2cf3d)이 조금(5%).

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a seasoned veteran or a finely made thing, better equipped and more composed than the common rank |
| 카메라 camera | eye-level waist-up or chest-up portrait with an 85mm portrait lens and shallow depth of field (soft bokeh background), stable triangular stance facing three-quarters toward the viewer, subject filling about 60–65% of the frame |
| 빛 lighting | classic sculpted three-quarter Rembrandt key light modelling the face and crafted gear, crisp material highlights and subtle warm gold glints on trims and edges |
| 배경 background | a recognisable slice of the banner's home ({home}) softly out of focus in shallow depth of field, light atmospheric particles |
| 디테일 detail | fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands |
| 화려함 spectacle | a few warm gold glints on metal and a light haze of atmospheric particles — one clear step above common |
| 등급 강조색 accent | a few small warm gold (#f2cf3d) highlights on trims and edges (빛의 약 5%) |
| 분위기 mood | proven, capable, confident |
| 마법 카메라 spellCamera | crisp eye-level three-quarter tracking view following the spell's path cleanly across the frame from one side to the other, shallow foreground and background depth, the spell filling about 60% of the frame |
| 마법이면 spell | a disciplined, stronger magical effect with a clear sweeping trajectory and a second layer of sparks |
| 아이템 카메라 itemCamera | eye-level three-quarter macro showcase shot with shallow depth of field, the well-crafted object standing upright on a stand, rack or draped cloth, filling about 60–65% of the frame |
| 아이템이면 item | a well-crafted object presented upright on an armoury stand, workbench rack or draped cloth, gold-tinted trim catching the light |

### 레어 · Rare — `rare` (#4ea8ff)

정예 · 걸작 · 대표 마법. 일반(현장) · 고급(정적 초상)과 확연히 갈리는 역동적 액션 컷 — 유닛은 과감한 3/4 로우 앵글 + 미세 틸트 · 모서리 대각선 동세와 전경 파편(3단 깊이), 마법은 전장 구역을 비트는 사선 · 높은 비스듬한 전술 부감, 아이템은 조각된 석단 위 로우 3/4 히어로 샷. 교차광 + 사파이어(#4ea8ff) 림라이트와 에테르 알갱이(10%).

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | an elite with a signature move, or a masterwork — clearly special |
| 카메라 camera | dynamic three-quarter low angle with a subtle canted horizon and bold foreshortening, decisive action pose sweeping diagonally from corner to corner with blurred foreground debris for 3-layer depth, subject about 65% of the frame |
| 빛 lighting | high-drama cross-lighting: strong element key light from one side countered by a sharp cool sapphire rim light on the opposite silhouette, volumetric haze and sparkling highlights |
| 배경 background | atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: {landmark} |
| 디테일 detail | fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn) |
| 화려함 spectacle | drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior |
| 등급 강조색 accent | drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette (빛의 약 10%) |
| 분위기 mood | precise, impressive, prized |
| 마법 카메라 spellCamera | bold oblique angle — either a sweeping diagonal low shot or an elevated tactical three-quarter vantage looking across a stretch of uninhabited ground being reshaped by the spell, foreground sparks or debris for 3-layer depth, the spell filling about 65% of the frame |
| 마법이면 spell | a sweeping signature spell that reshapes a stretch of the battlefield with layered energies and motion trails |
| 아이템 카메라 itemCamera | dynamic three-quarter low hero angle looking slightly up at the masterwork object set upon a carved plinth, ledge or banner-draped stone, filling about 65% of the frame |
| 아이템이면 item | a masterwork object displayed on a carved pedestal or dramatic stone ledge, faint glowing engraved patterns, drifting sapphire ether motes |

### 강화 · Empowered — `upgrade` (#3fe0c0)

원래 카드 3장을 합쳐 한 단계 오른 같은 인물. 원래 카드 그림이 있으면 참고 그림으로 넣어 같은 얼굴 · 종족 · 색을 지키고, 장비가 보강되고 셋이 하나가 된 표시(세 줄 띠 · 보석 셋 · 세 겹)와 아래에서 솟는 청록 에너지.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | the base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced |
| 카메라 camera | the same framing as the base card but one step closer and lower, a rising, upward pose |
| 빛 lighting | element backlight plus teal energy pouring up from below and glowing through seams of the gear |
| 배경 background | the same setting as the base card, intensified: more particles and a faint shockwave ring ({home}) |
| 디테일 detail | reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one |
| 화려함 spectacle | teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic |
| 등급 강조색 accent | teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen (빛의 약 15%) |
| 분위기 mood | ascending, refined, powered-up |
| 참고 그림 reference | If a reference image is attached, it is the base card ({base}): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. |

### 에픽 · Epic — `epic` (#b46cff)

영웅 · 괴물 · 초월자의 유물 · 대재앙 마법. 레어(가까운 대각선 액션)에서 카메라를 뒤로 쭉 빼 24mm 초광각 로우 와이드로 전장 · 날씨 · 무너지는 건축물(스케일 단서)을 한 화면에 몰아넣는다. 아이템은 무너진 제단 위 공중 부양 유물, 마법은 하늘과 땅이 갈라지는 재앙 파노라마. 역광 실루엣 + 볼류메트릭 신광 + 보라(#b46cff) 비술 입자(15%).

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it |
| 카메라 camera | cinematic 24mm ultra-wide low angle pulled back to showcase overwhelming scale — heroic silhouette at the peak of action surrounded by a vast reacting battlefield, storm weather and tiny scale cues (distant figures, broken walls, flying stone), subject about 65–70% of the frame |
| 빛 lighting | high-contrast cinematic backlight and piercing volumetric god rays in the element colour cutting through storm and smoke, glowing eyes or weapon, soft bloom |
| 배경 background | rich environmental storytelling: {landmark}; violent weather (storm, ash, spray, wind) and deep atmosphere |
| 디테일 detail | ornate, layered armour or garments, battle wear, magical energy wrapping the body |
| 화려함 spectacle | cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare |
| 등급 강조색 accent | violet (#b46cff) arcane particles and a faint violet edge to the aura (빛의 약 15%) |
| 분위기 mood | awe, momentum, overwhelming force |
| 마법 카메라 spellCamera | monumental 24mm wide-angle cataclysm shot showing a deep horizon where sky and terrain split around the spell's vortex, shockwave or impact crater, scale cues (shattered walls, distant spires, flying debris), the spell dominating 70–75% of the frame |
| 마법이면 spell | a cataclysmic spell at full force — vortex, shockwave or impact crater — with sky and terrain reacting |
| 아이템 카메라 itemCamera | cinematic 24mm low wide angle looking up at the awakened relic levitating in mid-air above a cracked altar or shattered dais, wind-whipped debris and floating stone shards around it, the relic filling about 60–65% of the frame |
| 아이템이면 item | a relic of a transcendent being levitating in its own swirling aura above a ruined altar, radiating its element |

### 유니크 · Unique — `unique` (#ff8a2a)

그 깃발의 이름난 전설(덱에 1장). 영화 속 그 인물의 대표 장면 한 컷 — 카드마다 다른 파격적 시그니처 시점(art_notes.json _shot: 수직 부감 · 뒷모습 · 오버더숄더 · 유리 너머 · 망원 압축 · 극원경 등)으로 레어 · 에픽 · 스페셜의 '올려다보는 영웅' 구도를 의도적으로 깬다. 주체는 한쪽에 두고 사건의 다른 절반이 화면 나머지를 채우는 이중 서사 구도. 장면 속 실제 광원 하나에서 나오는 키아로스쿠로 명암 + 녹은 주황 금빛(#ff8a2a) 불티와 금 세공(20%).

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | a named legend of this banner — instantly recognisable by what it does, caught in the one moment that tells its story; a distinctive, auteur-composed image unlike the other cards |
| 카메라 camera | a signature shot composed for this card alone — unconventional auteur viewpoint (bird's-eye, over-the-shoulder, side profile, telephoto or wide establishing — deliberately breaking the low-angle hero trope), subject placed off-centre with the story's other half sharing the frame, subject about 45–60% of the frame |
| 빛 lighting | masterful chiaroscuro with one motivated key light from a specific in-scene source chosen for this card, deep shadow on the far side, molten orange-gold rim light |
| 배경 background | {landmark}; the banner's source ({source}) present as a trace inside the scene — a vast shadow across the land, a reflection, a carving, a glimpse through cloud — rather than a silhouette behind the subject |
| 디테일 detail | masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay |
| 화려함 spectacle | iconic: a bold, memorable composition, swirling embers, gleaming gold filigree and the banner's source felt in the scene — a step above epic |
| 등급 강조색 accent | molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree (빛의 약 20%) |
| 분위기 mood | legendary, commanding, personal |
| 마법이면 spell | a legendary spell bearing the banner's source's mark, framed like an icon |
| 아이템이면 item | a legendary relic displayed like a treasure, the banner's source felt as a trace in the scene |

### 스페셜 · Special — `special` (#ff4d73)

최고 등급. 깃발마다 하나뿐인 신화적 존재와 삼좌의 유물. 깃발에서 가장 중요한 키 아트. 유닛은 지평선이 바닥 끝에 깔리는 극단적 웜즈아이 · 천공 성화 시점 — 성채 · 산맥 · 군대 · 용이 발밑 미니어처로 보이고, 제 힘으로 이루어진 몸이 하늘을 가르며 다중 금빛 룬 고리와 진홍 · 금 신성한 빛(30%)이 쏟아진다. 유물은 어두운 성소 제단 한가운데 모신 절대 대칭 성화 컷 — 사람 · 손 없이 유물 자체에 위에서 떨어지는 빛기둥 하나와 금빛 룬 고리 하나, 먼 틈 너머 거대한 근원의 기운.

| 항목 | 넣을 말 (영어 그대로) |
|---|---|
| 존재감 presence | mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner |
| 카메라 camera | extreme monumental worm's-eye view with the horizon pressed low near the bottom edge — fortresses, armies, dragons or mountains sit miniature at the base while the mythic being towers across 75–85% of the frame into the heavens; light may spill to the margins but the face or heart stays in the safe area |
| 빛 lighting | divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity |
| 배경 background | world-scale: {mythic}; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring |
| 디테일 detail | transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail |
| 화려함 spectacle | the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject |
| 등급 강조색 accent | crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks (빛의 약 30%) |
| 분위기 mood | sacred, transcendent, world-shaking |
| 존재감 기법 technique (유닛) | the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it |
| 마법이면 spell | a world-altering miracle |
| 아이템 카메라 itemCamera | reverent symmetrical straight-on or slightly low shrine-icon view of the sacred relic alone on its altar at its true scale, filling about 60–65% of the frame; cathedral-like architectural framing and the faint colossal source through a distant opening show its world-shaking weight |
| 아이템이면 item | a sacred relic resting on or floating just above an ancient altar, lit by a shaft of divine light inside a ring of golden runes, an empty circle behind it |

<!-- /AUTO:GRADES -->

## 4. 레벨 — 크기와 힘
<!-- AUTO:LEVELS -->
| 레벨 | 유닛 | 마법 | 아이템 |
|---|---|---|---|
| 1~2 | small and humble: an ordinary body, light gear | a small, local effect | a simple object |
| 3~4 | seasoned: a sturdier body, a bigger weapon, mount or machine | an effect over a few targets | a fine object with a faint aura |
| 5~6 | elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it | a battlefield-wide effect | a powerful object with a strong aura |
| 7 | towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power | a devastating, landscape-changing effect | an ancient object of great power |
| 8 (스페셜) | mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky | ↑ | ↑ |
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
### B1 도르마크의 심장불 · Dormak's Heartfire — 거골 연합 · fire `#ff6b3d`

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
| 하지 말 것 never | no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour |

### B2 소르그림의 방패 · Sorgrim's Shield — 거골 연합 · metal `#a9b4c2`

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
| 하지 말 것 never | no wizardry or wands; golems and constructs are machines, not undead |

### B3 케라운의 벼락 · Keraun's Thunder — 거골 연합 · lightning `#ffd84a`

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
| 하지 말 것 never | no wands or wizard robes — their lightning comes from coils, machines and storm creatures |

### G1 고르바스의 발톱 · Gorvath's Claw — 용맥 맹약 · earth `#b88a5a`

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
| 근원 (유니크) source | the earth dragon Gorvath, the largest of the seven dragons, with rocks and forests growing on its back |
| 신화 배경 (스페셜) mythic | the earth dragon Gorvath, mountain-sized with forests on its back, rising behind Throne Peak with one great eye opening |
| 하지 말 것 never | no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth) |

### G2 베르단의 뿔 · Verdan's Antler — 용맥 맹약 · forest `#58b85f`

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
| 하지 말 것 never | no fire magic |

### G3 마렌시아의 노래 · Marencia's Song — 용맥 맹약 · water `#4fb3ff`

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

### A1 모르카스의 그믐 · Morkas's New Moon — 신탁 성회 · darkness `#8b5cf6`

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
| 하지 말 것 never | no holy light, no cartoonish devils — ominous and dread-filled |

### A2 솔란테의 새벽 · Solante's Dawn — 신탁 성회 · holy light `#ffe9a8`

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

### A3 벨루미르의 별 · Belumir's Star — 신탁 성회 · wind `#9fe3d6`

| 항목 | 넣을 말 |
|---|---|
| 누구 who | high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud |
| 실루엣 silhouette | slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind |
| 재료 materials | light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour |
| 색 palette | wind teal #9fe3d6, silver, white, starry indigo |
| 상징 motifs | arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms |
| 빛 light | cool teal-white starlight and streaks of wind |
| 배경 (일반) hint | wind-swept clouds |
| 배경 (고급 · 강화) home | the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms |
| 배경 (레어 · 에픽 · 유니크) landmark | the spires of Belumir's Needle piercing the clouds under a night sky full of stars |
| 근원 (유니크) source | the god Belumir, the Star-Reader — a robe with a thousand eyes, an open book and stars |
| 신화 배경 (스페셜) mythic | the god Belumir's robe of a thousand eyes unfolding across the night sky as constellations |
| 하지 말 것 never | no heavy plate armour; star glyphs are abstract shapes, never readable letters |

<!-- /AUTO:FLAGS -->

## 6. 카드 종류 · 클래스
<!-- AUTO:TYPES -->
| 종류 | 넣을 말 |
|---|---|
| unit | a character card: upper body to full body, pose fits its role |
| atk | offensive spell — raw elemental or arcane power unleashing its force across the scene (bolt, shockwave, surging flame, crushing strike, sharpened aura of light) as pure energy and physical aftermath; no character or caster in focus |
| def | defensive spell — a luminous protective manifestation (ward, barrier, dome, curtain of water, ring of thorns, wall of light) holding firm and deflecting incoming force into shattered sparks; no character in focus |
| any | versatile spell — a transformative magical phenomenon visibly shifting, reversing, binding or reshaping the field and its energies; no character in focus |
| hand | cunning hand-manipulation spell — blank-backed spectral cards, glowing threads of fate, creeping mist, wax seals or sigils shifting in shadow (no readable letters or numbers); no face or body in focus |
| item | a single physical object shown whole as a dedicated dark-fantasy still-life study — zero people, zero creatures, zero hands holding or wearing it |

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
   - 맞는 카드를 찾아 가운데를 잘라 JPG로(가로 그림 → 5:4 750×600, 세로 그림 → 4:5 600×750) `img/cards/<ID>.jpg`에 넣는다(Pillow 또는 맥 sips, 있던 그림은 `_backup_art/<시각>/`).
   - 넣은 파일은 `inbox/_done/`으로 옮기고, 장부에 출처 파일 · 날짜 · 프롬프트 버전을 적는다.
   - 이름으로 못 찾은 파일은 그대로 두고 알려 준다 → `python tools/art/artmap.py assign <파일> <카드ID>`로 직접 연결.
3. 게임을 새로 고치면 그림이 보인다(게임은 목록 `img/cards/art_index.js`에 있는 그림을 읽는다 — 코드 수정 없음).
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
- [ ] 스페셜: 같은 깃발의 에픽 · 유니크 그림과 나란히 놓으면 확실히 더 크고 강하고 화려하다. 깃발의 평범한 구성원으로 보이지 않는다
- [ ] 레벨이 보인다 — 높을수록 크고 위압적
- [ ] 강화 카드: 원래 카드와 같은 인물로 보인다
- [ ] 같은 깃발 · 같은 등급 카드와 나란히 놓아도 결이 같다(보드에서 확인)

## 10. 그림 AI별 요령

- **공통**: 프롬프트를 통째로 붙여 넣는다. 스페셜 · 유니크는 2~4장 뽑아 고른다. 한국어 이름이 그림에 글자로 찍혀 나오면 같은 프롬프트로 다시 뽑는다(No text 줄은 지운 적 없이).
- **GPT Image (ChatGPT · gpt-image-1)**: 가로 1536×1024로 받는다(3:2라 artmap이 양옆을 조금 자른다). 레어 이상은 품질 high. 강화 카드는 원래 카드 그림을 첨부하고 "edit this character into the empowered version"이라고 한 줄 붙여도 좋다.
- **Gemini (이미지 생성)**: 프롬프트 맨 앞의 "Landscape 5:4 image."가 비율을 정한다(2026-11-20부터 프롬프트에 들어 있음). 제미나이 앱에서 비율을 고를 수 있으면 5:4로. 참고 그림을 여러 장 받을 수 있으니 강화 카드는 원래 카드 그림을, 같은 깃발의 통일감이 필요하면 이미 채택한 같은 깃발 그림 1장을 함께 넣는다("match the style of the attached image").
- **한꺼번에**: `python tools/art/gen.py --provider openai --grade special` 처럼 등급으로 골라 API로 뽑을 수 있다(`tools/art/README.md`). gen.py로 만든 그림은 바로 `img/cards/`에 들어가고, `python tools/art/artmap.py`로 장부에 반영된다.

## 11. 예시 (실제 카드의 완성 프롬프트)
<!-- AUTO:EXAMPLES -->
#### 예: 일반 — A1-02 그림자 도둑

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in an unposed, vivid moment of their work — characterful, believable and beautifully painted; grounded in scale, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 도둑". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 등불 아래로는 다니지 않는다. 지갑보다 먼저 주인의 그림자를 훔쳐 가기 때문이다.
Camera: strictly eye-level or slightly elevated candid angle (never low angle), 50mm documentary lens, subject placed naturally off-centre on a rule-of-thirds line absorbed in its task rather than posing for the camera, filling about 45–50% of the frame with surrounding work environment.
Lighting: grounded, practical side-light (lantern, hearth, torch or daylight gap — no heroic backlight, no halo, no dramatic rim), honest readable shadows and natural contrast; main light is darkness (#8b5cf6) from one side (never heroic backlight), cold violet underlight, blood-red glints, deep shadows.
Colour fidelity: the whole image reads at a glance as the banner colour #8b5cf6 (violet #8b5cf6, black, blood-red accents); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (a dark canyon wall) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: landscape 5:4; candid off-centre rule-of-thirds placement showing the subject naturally at work inside its setting (not posing dead-centre at the viewer); the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 고급 — A2-01 견습생의 기도 촛불

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a finely made thing, better equipped and more composed than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "견습생의 기도 촛불". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Prayer Candle of the Solante's Dawn.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Prayer Candle: a small living prayer candle of white beeswax, a calm little face glowing inside its flame, wax drips hanging like a tiny robe. Silhouette: small and upright, a tall teardrop flame on top. Materials: white beeswax, warm gold flame, a brass candle dish.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성 엘라드의 견습생이 처음 올린 기도가 촛불이 되어 일어섰다. 불꽃은 아직 손가락만 하지만, 닿는 상처의 더러움은 빠짐없이 태운다.
Camera: eye-level waist-up or chest-up portrait with an 85mm portrait lens and shallow depth of field (soft bokeh background), stable triangular stance facing three-quarters toward the viewer, subject filling about 60–65% of the frame.
Lighting: classic sculpted three-quarter Rembrandt key light modelling the face and crafted gear, crisp material highlights and subtle warm gold glints on trims and edges; main light is holy light (#ffe9a8) from a three-quarter front-side angle, warm radiant backlight and sunrise glow.
Colour fidelity: the whole image reads at a glance as the banner colour #ffe9a8 (holy light #ffe9a8, white, pale gold, soft sky blue); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) softly out of focus in shallow depth of field, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few warm gold glints on metal and a light haze of atmospheric particles — one clear step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: landscape 5:4; classic waist-up portrait framing with a crisp, composed silhouette against a softly blurred background; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 레어 — RS-G3-1 작살 물살

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, elemental textures, atmosphere and lighting, the spell caught at its decisive moment with a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "작살 물살". Depict exactly what this name describes.
Subject: offensive spell — raw elemental or arcane power unleashing its force across the scene (bolt, shockwave, surging flame, crushing strike, sharpened aura of light) as pure energy and physical aftermath; no character or caster in focus. The moment it takes effect: a destructive water bolt or blast tearing across dark ground and shattering stone; a cleansing wave of clear light washing away flames, dark smoke and curse sigils; a shared surge of elemental power rising like a radiant banner of light over the field. Scale and finish: a sweeping signature spell that reshapes a stretch of the battlefield with layered energies and motion trails.
Spell card — depict the magic itself, NOT a unit or character. The visible magical phenomenon, elemental force, energy geometry, rune pattern or physical impact is the sole hero filling the frame, radiating its own light across an uninhabited dark battlefield, empty architecture or raw terrain. No characters, no faces, no bodies, no casters and no creatures in focus — show the spell's power through light, elemental matter, shattered stone, scorched earth, empty shields/weapons or swirling air alone. Only if the card's specific art direction explicitly asks for a tiny distant silhouette or a single hand at the frame's edge, keep it tiny, faceless and subordinate to the magic; otherwise keep the scene completely uninhabited.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: pure magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, meaning and mood only): 물살을 타고 날아간 작살은 방패도 축복도 씻어 내고 박힌다. 셀레네아의 사냥꾼은 두 번 던지지 않는다. — any people or warriors this lore mentions stay completely off-stage; depict only the spell phenomenon itself.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 체력 −3. 아군 맨 앞 유닛에게 이번 턴 [치유 1].
Camera: bold oblique angle — either a sweeping diagonal low shot or an elevated tactical three-quarter vantage looking across a stretch of uninhabited ground being reshaped by the spell, foreground sparks or debris for 3-layer depth, the spell filling about 65% of the frame.
Lighting: dramatic high-contrast illumination from the spell's own surging element core, edged by a crisp cool sapphire rim glow, volumetric haze and sparkling highlights; main light is water (#4fb3ff) blazing outward from the spell's surging core across the dark terrain, caustic underwater light and shimmering reflections.
Colour fidelity: the whole image reads at a glance as the banner colour #4fb3ff (water blue #4fb3ff, aquamarine, pearl white, deep-sea navy); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; an uninhabited stretch of battlefield in three depth layers (foreground debris, midground terrain, far landmark: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray) visibly reacting to the spell; clear water light, spray, ripples, bubbles.
Detail: layered ribbons of magical energy, sharp motion trails, cracked stone or disturbed air, crisp elemental textures and drifting ether motes.
Spectacle: drifting sapphire ether motes, crisp rim-lit energy trails, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim along the edges of the spell — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: landscape 5:4; bold diagonal or sweeping tactical composition where the spell visibly reshapes the field across three depth layers; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 강화 — UP-B2-17 무쇠뿔 산양왕

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "무쇠뿔 산양왕". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Iron-Horn Goat of the Sorgrim's Shield.
If a reference image is attached, it is the base card (B2-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "무쇠뿔 산양")
Continuity with the base card: this is the very same individual as "무쇠뿔 산양" (B2-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 철골 산맥의 드러난 광맥을 핥다가 뿔이 무쇠로 자란 산양. 그가 버티고 선 바위가 곧 성벽의 끝이다. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Iron-Horn Goat: a muscular mountain goat whose huge curled horns have grown into raw iron from licking exposed ore veins, with a shaggy grey coat and hard hooves. Silhouette: a goat planted on a rock under massive curled horns. Materials: raw iron horns, shaggy grey wool, ore-streaked rock.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 무쇠뿔 산양이 뿔을 몇 번 갈아 치우고 무리의 왕이 되었다. 무리는 그의 등 뒤로만 줄을 서고, 그 등이 성벽이다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind and pouring upward from below as rising teal energy, cold steel sheen against molten forge glow, sparks from the anvil.
Colour fidelity: the whole image reads at a glance as the banner colour #a9b4c2 (steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: landscape 5:4; follow the camera line for framing and placement, keeping the main subject readable inside the frame with breathing room around it; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 에픽 — EP-A1-3 장막의 처형자

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "장막의 처형자". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Wraith of the Morkas's New Moon.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Wraith: a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains. Silhouette: floating and hooded, legless, trailing chains. Materials: translucent grey-violet mist, rusted chains, a torn shroud.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심연의 장막에서 걸어 나온 것. 무엇을 두고 나왔는지 묻는 자는 다음 차례가 된다.
Camera: cinematic 24mm ultra-wide low angle pulled back to showcase overwhelming scale — heroic silhouette at the peak of action surrounded by a vast reacting battlefield, storm weather and tiny scale cues (distant figures, broken walls, flying stone), subject about 65–70% of the frame.
Lighting: high-contrast cinematic backlight and piercing volumetric god rays in the element colour cutting through storm and smoke, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) as a high-contrast cinematic backlight and volumetric god rays cutting through the weather, cold violet underlight, blood-red glints, deep shadows.
Colour fidelity: the whole image reads at a glance as the banner colour #8b5cf6 (violet #8b5cf6, black, blood-red accents); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violent weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: landscape 5:4; expansive wide-angle cinematic composition where the subject and the storm-swept environment lock together with dramatic scale cues; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 유니크 — UN-G1 바위송곳니 대족장

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, captured in its signature scene like a film still. A named legend of this banner — instantly recognisable by what it does, caught in the one moment that tells its story; a distinctive, auteur-composed image unlike the other cards.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바위송곳니 대족장". Depict exactly what this name describes.
Subject: a legendary, named member of the Gorvath's Claw (see art direction).
Art direction: The great chief of the Rockfang tribe: an enormous orc with a stone-fang necklace, howling as his warband charges out of the dust behind him.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운 바위송곳니 부족의 우두머리. 그가 적을 쓰러뜨리면 무리가 울부짖으며 달려온다.
Camera: long-lens telephoto shot at eye level straight down the line of the charge: the orc chief in the foreground, howling, mid-body crop, his warband compressed close behind him bursting out of the dust cloud.
Lighting: masterful chiaroscuro with one motivated key light from a specific in-scene source chosen for this card, deep shadow on the far side, molten orange-gold rim light; main light is earth (#b88a5a) hard sidelight from the left through the dust, deep shadow on his right side, dusty ochre light and rock dust hanging in the air.
Colour fidelity: the whole image reads at a glance as the banner colour #b88a5a (earth ochre #b88a5a, rust-red war paint, bone white) — dusty, matte ochre and sandstone brown like sunlit clay and weathered bone, a dry earthy glow clearly distinct from flame orange or bright gold; every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; the banner's source (the earth dragon Gorvath, the largest of the seven dragons, with rocks and forests growing on its back) present as a trace inside the scene — a vast shadow across the land, a reflection, a carving, a glimpse through cloud — rather than a silhouette behind the subject; flying rock dust, cracked ground, ochre light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a bold, memorable composition, swirling embers, gleaming gold filigree and the banner's source felt in the scene — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: landscape 5:4; follow the camera line for placement — the subject may sit off-centre or be seen from behind, in profile or from above, with the second half of the story filling the rest of the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

#### 예: 스페셜 — SP-B2 철의 심장을 삼킨 자

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: the single most important image of its banner, key-art quality, clearly grander than any epic or unique card.
Card name (Korean — read its meaning, never write it in the image): "철의 심장을 삼킨 자". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Sorgrim's Shield.
Art direction: The heart is the focus: an enormous iron heart forged from the giant Sorgrim's sinew-ore — polished silver and white-steel plates, bright silver valves and pistons like arteries, cold silver-white light pulsing through its seams with only a faint ember glow deep inside a few cracks — beating at the centre of the image, larger than a forge furnace. The one who swallowed it is a colossal armoured presence that is only partly seen: his vast shape is veiled in pale steam, shadow and silver-grey forge smoke and revealed only in glimpses — the edge of a riveted white-steel shoulder like a cliff, a giant gauntleted hand resting on an anvil the size of a house, two eyes glowing high above in the darkness. Hundreds of steel chains and pipes run from the heart up into the hidden body; let the viewer imagine the full titan from these clues. Around it stretches the underground forge-cathedral of Durkheim; rows of golems in silver-grey armour, tiny by comparison, kneel facing the heart, their own chest-lights waking in rhythm with its beat, the oldest and most patched golem kneeling closest. He ascended without any god: instead of a halo, slowly turning rings of silver gears and silver-white runes circle the heart. Composition (keep exactly as in the existing artwork): the giant heart floats at the upper centre wrapped in orbiting rune rings; the cliff-like shoulder and pipes on the left edge; the giant gauntlet resting on a house-sized anvil at the right; two eyes glowing at the top centre; the oldest golem kneeling seen from behind in the bottom centre foreground; rows of kneeling golems along the bottom; arched forge halls receding on the left; monumental low angle.
Lore (Korean, use for the scene): 거인 소르그림의 힘줄을 녹여 벼린 철의 심장을 제 가슴에 삼킨 존재. 그 심장이 처음 뛴 날, 두르크하임의 모든 골렘이 함께 눈을 떴다. 그의 이름이 브론이었다는 것을 기억하는 것은 이제 그가 처음 빚은 골렘뿐이다.
This card's own art direction and story come first — make it unlike any other card; the lines below only frame it.
Scale: colossal, far beyond mortal scale — fortresses, armies or dragons look small beside it; it may be partly veiled in smoke, light or darkness and revealed in glimpses, so the viewer imagines its full shape.
Camera: extreme monumental worm's-eye view with the horizon pressed low near the bottom edge — fortresses, armies, dragons or mountains sit miniature at the base while the mythic being towers across 75–85% of the frame into the heavens; its face or heart stays in the safe area.
Setting (unless the art direction already sets it): very dark night-blue (#07080d) base; the giant Sorgrim's mountain-sized arm of iron sinew rising from the earth, and the metal dragon Feros's mirror scales reflecting a thousand forges.
Light and colour: a whole-image silver glow — cold silver-white light radiating from the heart is the main light and washes every surface; base metals are polished silver and white steel with mirror-bright cold silver-white highlights; palette silver, white steel, pale platinum, cool steel grey #a9b4c2 and deep gunmetal shadows against the very dark night-blue; the rune rings shine silver-white with only a thin gold edge; small accents only (under 10% of the light): a few ember-orange sparks in the deepest heart seams, a thin trace of crimson-rose (#ff4d73) and ether sky-blue (#8fdcff) sparks in the swirling smoke; no brass, copper or orange-dominant areas; the silver radiance is this grade's mark, not banner spellcasting.
Mood: sacred, transcendent, world-shaking.
Composition: landscape 5:4; monumental sacred key-art composition with the horizon low at the bottom edge so the colossal being dominates the sky and vertical axis, its face or core readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

<!-- /AUTO:EXAMPLES -->

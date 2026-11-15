# 다시 만들 그림 · 소리 (REMAKE)

카드 효과 · 이름이 바뀌어서 **그림이나 소리를 새로 만들어야 하는 카드** 목록이다.
다른 세션은 이 파일을 열어 아래 항목을 만들고, 만들어 넣은 항목은 지운다(모두 끝나면 표만 남긴다).
프롬프트 원본은 `tools/art/prompts/cards/<깃발>.md` · `tools/sfx/prompts/cards/<깃발>.md` 이다. 카드를 또 바꾸면 `node tools/art/build_prompts.js` · `node tools/sfx/build_sfx_prompts.js` 로 다시 뽑고 여기에 옮긴다.

## 목록

소리는 2026-11-15에 모두 다시 만들어 넣었다(Stable Audio, 아래 "소리" 참고). **남은 것은 그림뿐이다.**
그림은 아직 거의 그리지 않았다 — `tools/art/prompts/cards.jsonl` 708장 가운데 그린 것은 17장(스페셜 · 일부 마족)이고, 나머지 691장은 처음 그릴 때 지금 프롬프트를 쓰면 된다.
아래 표는 **카드 효과 · 이름이 바뀌어 예전 프롬프트로 그리면 틀리는 카드**다. 그릴 때 꼭 `node tools/art/build_prompts.js`로 다시 뽑은 프롬프트(`tools/art/prompts/cards/<깃발>.md`)를 쓴다.

| 카드 | 바뀐 것 | 그림 | 소리 |
|---|---|---|---|
| SG1-02 숨통 끊기 | v3.67 예전 바위 가죽 → 상대 전체 체력 −1 | 새로 (아직 없음) · 프롬프트 아래 | 넣음 (2026-11-15) |
| SG1-08 송곳니 반격 | v3.67 예전 산사태 → 아군 전체 체력 +2, [치명] | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| MG-13 뼈 부수기 | v3.67 예전 대지의 분노 → 방어 0인 적 1기 방어 ↔ 체력 | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| M2-1 오크의 문신 | v3.67 방어 +1 체력 +2 → 공격 +1 체력 +1 [관통] | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| MC-03 뒤바뀐 물길 | v3.68 예전 마력 역류 → 상대 줄을 다시 세움 · 생명 +1 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| SG3-01 환각의 통제 | v3.68 예전 물보라 → 이름 글자 수가 같은 상대 카드를 빼앗음 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| SG3-02 물빛 신기루 | v3.68 예전 급류 → 무작위 2기 공격 ↔ 체력 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| CS-G3 씻김의 노래 | v3.68 맨 앞 1기 → 상대 전체 보호 끄기 · 공격 −1 | 새로 (아직 없음) · `G3.md` | 넣음 |
| SB1-03 불의 장막 | v3.73 예전 참호 사격 → 아군 2기 체력 +1 [화염 갑주 2] | 새로 (아직 없음) · `B1.md` | 넣음 |
| SB1-05 기폭 | v3.73 예전 집중포화 → 화상 2 · 화상 모두 터뜨림 | 새로 (아직 없음) · `B1.md` (그림 지시 art_notes) | 넣음 |
| MB-04 도화선 | v3.73 체력 −2 → 체력 −1 · 화상 3 | 새로 (아직 없음) · `B1.md` | 넣음 |
| NG2-3 트롤의 재생 | v3.74 [불굴] → [재생 1] | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 |

유닛 · 아이템은 능력이 바뀌어도 그림 프롬프트에 능력이 들어가지 않아(이름 · 등급 · 깃발 · 설명으로 그림) 따로 적지 않는다. 등급이 바뀐 카드(예: 노움 B3-04 · B3-10 · B3-20 · B3-25 · B3-32 · B3-33 이 일반으로)는 다시 뽑은 프롬프트에 이미 들어 있다.
이미 그린 17장 가운데 능력이 바뀐 스페셜(SP-B1 · SP-B2 · SP-B3 · SP-G2 · SP-G3)은 그림 지시가 능력과 상관없는 모습이라 다시 그리지 않아도 된다.

## 받은 파일 넣는 곳

- 그림: `tools/art/inbox/<카드 ID>.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/<카드 ID>.jpg` 600×750)
- 소리: 이 맥의 Stable Audio(`~/develop/stable-audio/gen.py`, AGENTS.md "소리 프롬프트")로 만든다. `tools/sfx/notes/<깃발>.json` 지시를 고치고 `node tools/sfx/build_sfx_prompts.js` → `SAO_KEYS=<키들> SAO_OUT=<폴더> .venv/bin/python gen.py 0 100 fp16 all --redo` → `audio/sfx/<키>.ogg · .mp3` 로 바꿔 넣는다(새 키면 `audio/sfx/index.json · index.js`, `index.html` 의 `index.js?v=`).

---

# 그림 프롬프트

### SG1-02 · 숨통 끊기
바위주먹 오크 · 방어 마법 · 레벨 1 · 일반 — 받은 그림은 `tools/art/inbox/SG1-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "숨통 끊기". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive earth attack striking the enemy ranks. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Finishing the staggering: on a rocky battlefield at dusk, several enemy soldiers (dark silhouettes) are already reeling and bloodied, barely standing after orc bites. A grim scarred orc walks down their line and drops each one with a short heavy chop of a stone-weighted fist; a thin ochre earth-glow pulses through the ground under all the wounded foes at once, as one last tremor finishes them. Mood: cold, decisive, no barrier or shield.
Scale (level 1 of 8): a small, local effect.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 오크는 비틀거리는 적에게 등을 보이지 않는다. 송곳니에 물려 버티던 자부터 차례로 숨통을 끊는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 체력 −1.
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG1-08 · 송곳니 반격
바위주먹 오크 · 방어 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/SG1-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 반격". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering earth aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Fang counterattack: a small band of cornered Rockfist orcs, backs to a cliff wall, bracing together; their grey-green skin swells and toughens with a warm ochre earth-glow (gaining toughness), tusks bared in a snarl. The nearest orc bites back into the arm of an attacker who has just struck him — the attacker (dark silhouette) recoils, still alive but drained to a thread. Feeling: wounded but defiant, the pack bites back.
Scale (level 3 of 8): an effect over a few targets.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 궁지에 몰린 오크는 물러서지 않고 문다. 덤벼든 자는 살아 돌아가도 숨이 한 가닥만 남는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체 체력 +2, [치명].
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-13 · 뼈 부수기
바위주먹 오크 · 공격 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/MG-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뼈 부수기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of earth power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Bone breaker: an enemy warrior whose armour has already been torn and peeled away (broken plates and straps hanging off, bare chest and shoulders exposed, dark silhouette) is struck by a massive orc fist encased in rough stone; at the point of impact a sharp crack of ochre earth-light spreads like fractures through the body. Close, diagonal, brutal composition; the orc mostly out of frame, only the fist and forearm.
Scale (level 3 of 8): an effect over a few targets.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 갑옷이 벗겨진 자에게 남은 것은 뼈뿐이다. 고르바스의 주먹은 그 뼈를 바위처럼 부순다.
Game effect (Korean, mood only — never draw text or numbers): 방어가 0인 상대 유닛 가운데 공격이 가장 높은 1기의 방어와 체력을 맞바꾼다(체력 0이 되어 쓰러진다).
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### M2-1 · 오크의 문신
바위주먹 오크 · 아이템 · 레벨 2 · 일반 — 받은 그림은 `tools/art/inbox/M2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/M2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "오크의 문신". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Rockfist Orcs (engraving; if unsure, a carved stone or engraved plate). a used, practical object rendered with loving detail (wear, scratches, stitching), resting on dark stone or cloth, warm low light.
Art direction: An orc's tattooed fist: a huge grey-green orc fist, knuckles freshly tattooed with dark fang-shaped marks in ochre and black pigment, beside a bone tattoo needle and a small stone pigment bowl on dark leather; the tattoo glows faintly like it could tear through armour. Show the fist and tools, not a carved plate.
Scale (level 2 of 8): a simple object.
Banner — Rockfist Orcs: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 바위송곳니 오크가 첫 사냥을 마치고 주먹에 새기는 송곳니 문신. 이 주먹은 갑옷부터 찢는다.
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```


# 강화 (Empowered) — 카드 일러스트 프롬프트 (40장, 버전 g3)

> 원래 카드 3장을 합쳐 한 단계 오른 같은 인물. 원래 카드 그림이 있으면 참고 그림으로 넣어 같은 얼굴 · 종족 · 색을 지키고, 장비가 보강되고 셋이 하나가 된 표시(세 줄 띠 · 보석 셋 · 세 겹)와 아래에서 솟는 청록 에너지.

## 이 등급의 연출 틀

```
Grade: EMPOWERED — the same warrior fused from three into one stronger self. the base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear.
Background: the same setting as the base card, intensified: more particles and a faint shockwave ring ({home}).
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen (about 15% of the light).
Mood: ascending, refined, powered-up.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다. 그대로 붙여 넣으면 된다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 40장

### UP-A1-09 · 모르크 거미 여왕
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 원래 카드 `A1-09` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A1-09.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A1-09.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르크 거미 여왕". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Shadow Spider of the Morkas's New Moon — a large black spider woven from shadow, with clusters of violet eyes and long jointed legs trailing threads of darkness.
If a reference image is attached, it is the base card (A1-09): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "모르크 그림자 거미")
Continuity with the base card: this is the very same individual as "모르크 그림자 거미" (A1-09) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 협곡 바닥으로 떨어진 것은 무엇이든 제 줄에 걸린 것이라 여긴다. 그림자로 짠 줄이라 등불을 비추면 보이지 않다가, 등불이 꺼지면 다시 팽팽해진다. The base card is set in a dark canyon wall; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Shadow Spider: a large black spider woven from shadow, with clusters of violet eyes and long jointed legs trailing threads of darkness. Silhouette: low and wide, many long angled legs. Materials: glossy black chitin, silk threads of shadow, violet eye clusters.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 협곡 벽 하나를 다 덮도록 줄을 쳤더니 새끼들이 생겼다. 이제 모르크 협곡으로 떨어지는 것은 무엇이든 그녀의 몫부터 뗀다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the shadow city of Noctar in a sunless canyon); violet shadow smoke, blood-red accents, contract sigils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A1-11 · 마족 선봉장
모르카스의 그믐 · 유닛 · 레벨 3 · 강화 · 원래 카드 `A1-11` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A1-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A1-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마족 선봉장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
If a reference image is attached, it is the base card (A1-11): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "마족 전사")
Continuity with the base card: this is the very same individual as "마족 전사" (A1-11) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a dark canyon wall; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 전사 셋 가운데 살아 돌아온 하나가 나머지 둘의 계약까지 짊어졌다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the shadow city of Noctar in a sunless canyon); violet shadow smoke, blood-red accents, contract sigils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A1-15 · 피를 마시는 마검
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 원래 카드 `A1-15` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A1-15.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A1-15.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피를 마시는 마검". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Cursed Blade of the Morkas's New Moon — a living cursed sword that floats and fights with no wielder, a black blade that swallows light, a closed eye carved on the guard, red smoke trailing from its edge.
If a reference image is attached, it is the base card (A1-15): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "피를 마시는 칼")
Continuity with the base card: this is the very same individual as "피를 마시는 칼" (A1-15) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 심연의 장막 가장자리에서 벼린 칼. 주인이 바뀔 때마다 앞 주인의 피 맛을 기억하고, 새 주인에게 같은 값을 요구한다. The base card is set in a dark canyon wall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Cursed Blade: a living cursed sword that floats and fights with no wielder, a black blade that swallows light, a closed eye carved on the guard, red smoke trailing from its edge. Silhouette: a single floating blade, point down, smoke trailing. Materials: light-swallowing black steel, red veins in the metal, a closed-eye guard, cracked leather grip.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 피를 마시던 칼이 세 주인의 피를 다 마시고 마검이 되었다. 이제는 휘두를 손을 기다리지 않는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the shadow city of Noctar in a sunless canyon); violet shadow smoke, blood-red accents, contract sigils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A1-18 · 그림자 학살자
모르카스의 그믐 · 유닛 · 레벨 4 · 강화 · 원래 카드 `A1-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A1-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A1-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 학살자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Shadow Beast of the Morkas's New Moon — a large wolf-like beast of living shadow with too many ivory fangs and violet eyes, its body fraying into smoke at the edges.
If a reference image is attached, it is the base card (A1-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "그림자 송곳니")
Continuity with the base card: this is the very same individual as "그림자 송곳니" (A1-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 녹타르 그림자 극장 뒤편에 사는 짐승. 무대 위의 비명이 연기가 아닐 때가 많은 까닭이다. The base card is set in a dark canyon wall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Shadow Beast: a large wolf-like beast of living shadow with too many ivory fangs and violet eyes, its body fraying into smoke at the edges. Silhouette: low lunging quadruped with an oversized jaw. Materials: black smoke fur, ivory fangs, violet eye glow.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 그림자 속에서 기다리지 않는다. 그림자를 끌고 다닌다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the shadow city of Noctar in a sunless canyon); violet shadow smoke, blood-red accents, contract sigils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A1-23 · 대낫 사신
모르카스의 그믐 · 유닛 · 레벨 5 · 강화 · 원래 카드 `A1-23` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A1-23.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A1-23.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "대낫 사신". Depict exactly what this name describes.
Subject: an elite, commanding Reaper of the Morkas's New Moon — a hooded skeletal reaper in a tattered black robe holding a great scythe, a ledger of due contracts chained to its belt.
If a reference image is attached, it is the base card (A1-23): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "계약 수확 사신")
Continuity with the base card: this is the very same individual as "계약 수확 사신" (A1-23) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 만기가 된 계약을 거두러 다닌다. 그의 낫이 지나간 자리에는 서명만 남는다. The base card is set in a dark canyon wall; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Reaper: a hooded skeletal reaper in a tattered black robe holding a great scythe, a ledger of due contracts chained to its belt. Silhouette: tall hooded figure with a huge curved scythe. Materials: tattered black robe, bone hands, dark iron scythe, chained ledger.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 거둔 계약서가 무릎까지 쌓였을 때 낫을 바꿨다. 이제는 이름을 하나씩 부르지 않고 한 줄씩 부른다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the shadow city of Noctar in a sunless canyon); violet shadow smoke, blood-red accents, contract sigils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A2-11 · 창뿔 유니콘
솔란테의 새벽 · 유닛 · 레벨 3 · 강화 · 원래 카드 `A2-11` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A2-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A2-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "창뿔 유니콘". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Unicorn of the Solante's Dawn — a white horse with a long spiral horn of pearly light and a golden mane that glows like sunrise.
If a reference image is attached, it is the base card (A2-11): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "어린 유니콘")
Continuity with the base card: this is the very same individual as "어린 유니콘" (A2-11) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 뿔이 아직 손가락 길이다. 그래도 그 뿔이 가리키는 곳에는 그림자가 오래 머물지 못한다. The base card is set in a white stone parapet; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Unicorn: a white horse with a long spiral horn of pearly light and a golden mane that glows like sunrise. Silhouette: an elegant horse with a single long straight horn. Materials: white coat, pearl-white spiral horn, gold mane, silver hooves.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 뿔이 창만큼 자랐다. 어둠은 그 뿔끝의 새벽빛이 닿기 전에 갈라진다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the white walls of the Dawn Citadel Elad); pale gold radiance, halo, feathers of light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A2-15 · 솔란테의 서약 기사
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 원래 카드 `A2-15` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A2-15.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A2-15.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 서약 기사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Solante's Dawn — a devoted priest, ritualist or pact-bound servant, praying or offering.
If a reference image is attached, it is the base card (A2-15): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "솔란테의 맹세자")
Continuity with the base card: this is the very same individual as "솔란테의 맹세자" (A2-15) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a white stone parapet; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 맹세를 세 번 지킨 자만이 서약의 갑주를 입는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the white walls of the Dawn Citadel Elad); pale gold radiance, halo, feathers of light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A2-17 · 황금 스핑크스
솔란테의 새벽 · 유닛 · 레벨 4 · 강화 · 원래 카드 `A2-17` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A2-17.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A2-17.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "황금 스핑크스". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Sphinx of the Solante's Dawn — a lion-bodied sphinx with a calm, solemn face, folded white wings and a sun-disk crown, guarding a question.
If a reference image is attached, it is the base card (A2-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "진실을 묻는 스핑크스")
Continuity with the base card: this is the very same individual as "진실을 묻는 스핑크스" (A2-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 엘라드로 들어오는 자에게 물음 하나를 던진다. 답이 틀린 것은 괜찮지만, 거짓이면 문이 열리지 않는다. The base card is set in a white stone parapet; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Sphinx: a lion-bodied sphinx with a calm, solemn face, folded white wings and a sun-disk crown, guarding a question. Silhouette: a couchant lion body, head raised, wings folded. Materials: pale gold fur, white feathers, a gold sun-disk headdress.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 물음을 던지던 스핑크스가 솔란테의 빛을 오래 쬐어 금빛이 되었다. 이제는 묻지 않아도 거짓이 그 앞에서 그림자를 잃는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the white walls of the Dawn Citadel Elad); pale gold radiance, halo, feathers of light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A2-22 · 솔란테의 대성종
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 원래 카드 `A2-22` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A2-22.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A2-22.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 대성종". Depict exactly what this name describes.
Subject: an elite, commanding Bell Spirit of the Solante's Dawn — a great living bronze cathedral bell that rings in the dawn, light pouring from its mouth, rising-sun engravings on its rim.
If a reference image is attached, it is the base card (A2-22): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "새벽을 울리는 성종")
Continuity with the base card: this is the very same individual as "새벽을 울리는 성종" (A2-22) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 새벽성의 아침 기도가 수백 년 동안 쌓여 종 하나에 깃들었다. 첫 종이 울리면 성벽 위로 해가 오른다고들 하고, 해도 대체로 그 말을 따른다. The base card is set in a white stone parapet; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Bell Spirit: a great living bronze cathedral bell that rings in the dawn, light pouring from its mouth, rising-sun engravings on its rim. Silhouette: a large bell hanging in the air. Materials: polished bronze, gold sun engravings, light from within.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 아침마다 울리던 종이 대성당 꼭대기로 옮겨 걸렸다. 이제 그 소리는 황혼의 장벽까지 닿는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the white walls of the Dawn Citadel Elad); pale gold radiance, halo, feathers of light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A2-24 · 빛의 대거울
솔란테의 새벽 · 유닛 · 레벨 5 · 강화 · 원래 카드 `A2-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A2-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A2-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "빛의 대거울". Depict exactly what this name describes.
Subject: an elite, commanding Mirror Spirit of the Solante's Dawn — a tall oval cathedral mirror in a gilt frame that has come alive, gathering dawn light and throwing it back.
If a reference image is attached, it is the base card (A2-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "빛을 되비추는 거울")
Continuity with the base card: this is the very same individual as "빛을 되비추는 거울" (A2-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 대성당 회랑에 걸려 새벽빛을 모으던 거울. 날아든 것은 빛이든 칼이든 온 길로 돌려보낸다. The base card is set in a white stone parapet; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Mirror Spirit: a tall oval cathedral mirror in a gilt frame that has come alive, gathering dawn light and throwing it back. Silhouette: a tall oval frame standing upright. Materials: silvered glass, gilt frame, bright reflections.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 회랑의 거울이 셋으로 겹쳐 자랐다. 뒷면의 은에는 황혼의 장벽에서 옮겨 온 돌가루가 섞여 있다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the white walls of the Dawn Citadel Elad); pale gold radiance, halo, feathers of light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A3-10 · 속사 하피
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 원래 카드 `A3-10` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A3-10.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A3-10.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "속사 하피". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Harpy of the Belumir's Star — storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves.
If a reference image is attached, it is the base card (A3-10): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "깃화살 하피")
Continuity with the base card: this is the very same individual as "깃화살 하피" (A3-10) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 제 날개깃을 뽑아 화살로 쏜다. 쏘는 법은 익혔지만 아끼는 법은 아직이라, 지나간 자리에 깃털이 눈처럼 쌓인다. The base card is set in wind-swept clouds; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Harpy: storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves. Silhouette: a bird-woman with wide wings and hooked talons, mid-swoop. Materials: storm-grey and teal feathers, sharp black talons, wild hair.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 깃을 아끼는 법은 끝내 배우지 않았다. 대신 빠지는 만큼 빨리 다시 나게 되었다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms); swirling teal wind, fluttering robes and pages.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A3-11 · 질풍 그리핀
벨루미르의 별 · 유닛 · 레벨 3 · 강화 · 원래 카드 `A3-11` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A3-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A3-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "질풍 그리핀". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Griffin of the Belumir's Star — a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion.
If a reference image is attached, it is the base card (A3-11): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "새끼 그리핀")
Continuity with the base card: this is the very same individual as "새끼 그리핀" (A3-11) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 고원의 성소와 바늘탑 사이를 오가며 날기를 배운다. 소식을 맡겨도 소식보다 제가 먼저 도착해 버린다. The base card is set in wind-swept clouds; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Griffin: a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion. Silhouette: an eagle-fronted lion with wings raised. Materials: teal-grey feathers, tawny fur, golden beak and talons.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새끼 때 소식보다 먼저 닿던 버릇이 그대로 자랐다. 이제는 바람보다 먼저 닿아 그 자체가 소식이 된다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms); swirling teal wind, fluttering robes and pages.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A3-18 · 쌍둥이자리 궁수장
벨루미르의 별 · 유닛 · 레벨 4 · 강화 · 원래 카드 `A3-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A3-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A3-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "쌍둥이자리 궁수장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Constellation of the Belumir's Star — a beast or archer drawn by stars: bright points joined by thin silver lines of light, the body between them only night sky.
If a reference image is attached, it is the base card (A3-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "쌍둥이자리 궁수")
Continuity with the base card: this is the very same individual as "쌍둥이자리 궁수" (A3-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 밤하늘의 쌍둥이 별이 활 두 자루를 들고 내려왔다. 한 별이 쏜 화살 길을 다른 별의 화살이 그대로 탄다. The base card is set in wind-swept clouds; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Constellation: a beast or archer drawn by stars: bright points joined by thin silver lines of light, the body between them only night sky. Silhouette: an outline traced by stars and connecting lines. Materials: starlight points, thin silver lines, night-blue void.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 두 별이 시위 소리를 하나로 맞추는 법을 익혔다. 이제 쌍둥이자리의 화살은 하나처럼 날아가 둘로 꽂힌다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms); swirling teal wind, fluttering robes and pages.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A3-23 · 별여우 순찰대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 원래 카드 `A3-23` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A3-23.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A3-23.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별여우 순찰대장". Depict exactly what this name describes.
Subject: an elite, commanding Star Fox of the Belumir's Star — a slim fox with indigo fur speckled with tiny stars and a long brush tail that trails starlight.
If a reference image is attached, it is the base card (A3-23): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "벨루미르의 별여우")
Continuity with the base card: this is the very same individual as "벨루미르의 별여우" (A3-23) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 이벨의 서고를 찾는 궁사들을 따라 성좌 고원을 평생 걸었다. 서고는 아직 못 찾았지만, 꼬리에 묻은 별빛으로 고원의 모든 길에 표시를 해 두었다. The base card is set in wind-swept clouds; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Star Fox: a slim fox with indigo fur speckled with tiny stars and a long brush tail that trails starlight. Silhouette: a slim running fox with a long glowing tail. Materials: indigo fur, silver star speckles, a starlight tail.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 고원의 길을 다 걸은 별여우가 이제 적이 어느 길로 올지 먼저 냄새 맡는다. 꼬리의 별빛도 그만큼 길어졌다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms); swirling teal wind, fluttering robes and pages.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-A3-24 · 번개 텐구 대장
벨루미르의 별 · 유닛 · 레벨 5 · 강화 · 원래 카드 `A3-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-A3-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-A3-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "번개 텐구 대장". Depict exactly what this name describes.
Subject: an elite, commanding Tengu of the Belumir's Star — black-feathered mountain sky spirits with crow beaks and broad wings, carrying bows and fans of storm feathers.
If a reference image is attached, it is the base card (A3-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "번개 화살 텐구")
Continuity with the base card: this is the very same individual as "번개 화살 텐구" (A3-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 번개를 품은 구름 아래에서만 활을 든다. 깃부채를 한 번 부치면 화살촉에 번개가 내려앉는다. The base card is set in wind-swept clouds; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Tengu: black-feathered mountain sky spirits with crow beaks and broad wings, carrying bows and fans of storm feathers. Silhouette: a winged humanoid with a beaked face and a raised feather fan. Materials: black glossy feathers, a storm-feather fan, a lacquered bow.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 번개를 화살에 싣는 것은 오래전에 익혔다. 이제 그것을 원하는 곳에만 떨어뜨리는 텐구는 바늘탑에 그 하나뿐이다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms); swirling teal wind, fluttering robes and pages.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B1-12 · 폭약 공병장
도르마크의 심장불 · 유닛 · 레벨 3 · 강화 · 원래 카드 `B1-12` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B1-12.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B1-12.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "폭약 공병장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Fire Rat of the Dormak's Heartfire — cat-sized rats whose silvery-red fur burns constantly without ever being consumed, with glowing whiskers and ember eyes, always in a swarm.
If a reference image is attached, it is the base card (B1-12): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "화서 무리")
Continuity with the base card: this is the very same individual as "화서 무리" (B1-12) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 화관 산맥의 식지 않는 바위틈에 사는 불쥐 떼. 털이 불에 들어가도 타지 않아서, 포르탄은 그 털로 화약고 장갑을 짠다. The base card is set in a soot-stained gun bastion wall; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Fire Rat: cat-sized rats whose silvery-red fur burns constantly without ever being consumed, with glowing whiskers and ember eyes, always in a swarm. Silhouette: a tide of small burning rats pouring over rubble. Materials: flaming silver-red fur, ember eyes, ash, gravel.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화서 무리 가운데 화약고 밑을 가장 깊이 판 우두머리. 포르탄 공병들은 그 굴을 따라 폭약을 묻다가, 끝내 그에게 공병장이라는 이름을 붙여 주었다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the fortress-foundry of Fortan, chimneys and gun bastions); embers, flame light, gunpowder smoke.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B1-17 · 거포 거북
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 원래 카드 `B1-17` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B1-17.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B1-17.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "거포 거북". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Lava Tortoise of the Dormak's Heartfire — a huge tortoise whose shell is cooled black lava split by glowing magma seams, with a smoking vent-crater rising from the middle of its back.
If a reference image is attached, it is the base card (B1-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "포대 거북")
Continuity with the base card: this is the very same individual as "포대 거북" (B1-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 등딱지 한가운데 작은 분화구를 지고 다니는 용암거북. 포르탄 포수들은 그 구멍이 대포보다 멀리 쏜다는 것을 인정하기 싫어한다. The base card is set in a soot-stained gun bastion wall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Lava Tortoise: a huge tortoise whose shell is cooled black lava split by glowing magma seams, with a smoking vent-crater rising from the middle of its back. Silhouette: a low massive dome with a smoking crater on top. Materials: black basalt shell, glowing magma cracks, scorched brass bands, smoke.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포대 거북이 백 년을 더 묵자 등딱지의 분화구가 셋으로 갈라졌다. 한 번 숨을 뱉으면 소리는 셋인데 땅은 한 번만 꺼진다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the fortress-foundry of Fortan, chimneys and gun bastions); embers, flame light, gunpowder smoke.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B1-18 · 불개미 철벽대
도르마크의 심장불 · 유닛 · 레벨 4 · 강화 · 원래 카드 `B1-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B1-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B1-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불개미 철벽대". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Fire Ant of the Dormak's Heartfire — dog-sized ants with glossy red-black carapaces glowing hot at the joints and mandibles that drip molten sparks, always in a tight column.
If a reference image is attached, it is the base card (B1-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "화약고 불개미")
Continuity with the base card: this is the very same individual as "화약고 불개미" (B1-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 포르탄 화약고 밑에 굴을 판 불개미 떼. 고블린들은 쫓아내기를 포기하고 화약고를 맡겼는데, 개미들은 원래 제 집이었다고 여긴다. The base card is set in a soot-stained gun bastion wall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Fire Ant: dog-sized ants with glossy red-black carapaces glowing hot at the joints and mandibles that drip molten sparks, always in a tight column. Silhouette: a packed phalanx of armoured ants. Materials: glossy red-black chitin, glowing joints, ember mandibles, charred powder-keg wood.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화약고를 지키던 불개미 떼가 등껍질을 맞대어 하나의 벽이 되었다. 맞을수록 껍질이 달아올라 더 단단해진다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the fortress-foundry of Fortan, chimneys and gun bastions); embers, flame light, gunpowder smoke.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B1-24 · 박격포 명사수
도르마크의 심장불 · 유닛 · 레벨 5 · 강화 · 원래 카드 `B1-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B1-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B1-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "박격포 명사수". Depict exactly what this name describes.
Subject: an elite, commanding member of the Dormak's Heartfire — an armed fighter wielding a weapon typical of the banner.
If a reference image is attached, it is the base card (B1-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "고블린 박격포수")
Continuity with the base card: this is the very same individual as "고블린 박격포수" (B1-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a soot-stained gun bastion wall; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄의 박격포수들이 그의 포탄 궤적을 보고 각도를 고친다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the fortress-foundry of Fortan, chimneys and gun bastions); embers, flame light, gunpowder smoke.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B2-12 · 단조 명장
소르그림의 방패 · 유닛 · 레벨 3 · 강화 · 원래 카드 `B2-12` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B2-12.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B2-12.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "단조 명장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Sorgrim's Shield — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
If a reference image is attached, it is the base card (B2-12): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "단조 견습장인")
Continuity with the base card: this is the very same individual as "단조 견습장인" (B2-12) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 견습의 망치 셋을 녹여 장인의 망치 하나를 벼렸다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B2-17 · 무쇠뿔 산양왕
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 원래 카드 `B2-17` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B2-17.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B2-17.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "무쇠뿔 산양왕". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Iron-Horn Goat of the Sorgrim's Shield — a muscular mountain goat whose huge curled horns have grown into raw iron from licking exposed ore veins, with a shaggy grey coat and hard hooves.
If a reference image is attached, it is the base card (B2-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "무쇠뿔 산양")
Continuity with the base card: this is the very same individual as "무쇠뿔 산양" (B2-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 철골 산맥의 드러난 광맥을 핥다가 뿔이 무쇠로 자란 산양. 그가 버티고 선 바위가 곧 성벽의 끝이다. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Iron-Horn Goat: a muscular mountain goat whose huge curled horns have grown into raw iron from licking exposed ore veins, with a shaggy grey coat and hard hooves. Silhouette: a goat planted on a rock under massive curled horns. Materials: raw iron horns, shaggy grey wool, ore-streaked rock.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 무쇠뿔 산양이 뿔을 몇 번 갈아 치우고 무리의 왕이 되었다. 무리는 그의 등 뒤로만 줄을 서고, 그 등이 성벽이다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B2-18 · 증기 황소 우두머리
소르그림의 방패 · 유닛 · 레벨 4 · 강화 · 원래 카드 `B2-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B2-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B2-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "증기 황소 우두머리". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Bronze Bull of the Sorgrim's Shield — a forged bull of bronze with a boiler in its belly, steam snorting from its nostrils and riveted plates along its flanks.
If a reference image is attached, it is the base card (B2-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "증기 콧김 황소")
Continuity with the base card: this is the very same individual as "증기 콧김 황소" (B2-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 두르크하임 장인들이 청동으로 빚고 배 속에 보일러를 앉힌 황소. 콧김 한 번에 지하 도시의 등불이 흔들린다. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Bronze Bull: a forged bull of bronze with a boiler in its belly, steam snorting from its nostrils and riveted plates along its flanks. Silhouette: a head-down charging bull puffing steam. Materials: polished bronze, rivets, boiler, steam.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 증기 콧김 황소가 배 속 보일러를 셋으로 늘리고 무리의 머리가 되었다. 한 번 땅을 구르면 갱도 끝까지 울린다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B2-22 · 쇠 먹는 불가사리 왕
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 원래 카드 `B2-22` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B2-22.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B2-22.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "쇠 먹는 불가사리 왕". Depict exactly what this name describes.
Subject: an elite, commanding Bulgasari (Iron-Eater) of the Sorgrim's Shield — a bear-sized iron-eating beast from Korean legend — bull-like head, short trunk-like snout, fur of bristling needles and a hide studded with half-swallowed nails and locks.
If a reference image is attached, it is the base card (B2-22): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "쇠 먹는 불가사리")
Continuity with the base card: this is the very same individual as "쇠 먹는 불가사리" (B2-22) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 처음엔 바늘 하나만 했다는 짐승이 두르크하임의 못과 자물쇠를 먹고 이만큼 컸다. 쓰러뜨리려면 성 하나를 허무는 만큼의 수고가 든다. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Bulgasari (Iron-Eater): a bear-sized iron-eating beast from Korean legend — bull-like head, short trunk-like snout, fur of bristling needles and a hide studded with half-swallowed nails and locks. Silhouette: a hulking shaggy beast chewing on a lump of metal. Materials: needle fur, iron-studded hide, swallowed nails and padlocks, rust.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 쇠 먹는 불가사리가 공방 고철 더미 하나를 통째로 삼키고 또 자랐다. 이제는 무리가 그의 뒤를 따라다니며 남은 부스러기를 줍는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B2-24 · 철골 가고일 수문장
소르그림의 방패 · 유닛 · 레벨 5 · 강화 · 원래 카드 `B2-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B2-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B2-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철골 가고일 수문장". Depict exactly what this name describes.
Subject: an elite, commanding Steel Gargoyle of the Sorgrim's Shield — a gargoyle with a skeletal frame of iron girders, bat-like wings of riveted sheet steel and hollow ribs the wind whistles through, living on rusted ore.
If a reference image is attached, it is the base card (B2-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "철골 가고일")
Continuity with the base card: this is the very same individual as "철골 가고일" (B2-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 철골 산맥 벼랑에서 녹슨 광맥을 갉아 먹고 사는 가고일. 갱도 입구에 앉아 있으면 석상인 줄 알다가, 바람이 뼈대 사이를 지날 때에야 낮은 울음을 듣는다. The base card is set in a riveted iron gate in a dim forge hall; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Steel Gargoyle: a gargoyle with a skeletal frame of iron girders, bat-like wings of riveted sheet steel and hollow ribs the wind whistles through, living on rusted ore. Silhouette: a crouching gargoyle on a ledge with folded steel wings. Materials: iron girders, riveted sheet steel, rust, hollow frame.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 철골 가고일이 두르크하임 맨 아래 갱도의 문 위에 자리를 잡았다. 그 너머에 무엇이 있는지는 말하지 않는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the underground forge-city of Durkheim); cold steel sheen, sparks from an anvil, rivets.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B3-12 · 방전 요정 여왕
케라운의 벼락 · 유닛 · 레벨 3 · 강화 · 원래 카드 `B3-12` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B3-12.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B3-12.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "방전 요정 여왕". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Spark Sprite of the Keraun's Thunder — a hand-sized sprite made of a single crackling spark, with a mischievous face, hair standing straight on end and wings like flickering arcs.
If a reference image is attached, it is the base card (B3-12): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "방전 요정")
Continuity with the base card: this is the very same individual as "방전 요정" (B3-12) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 모아 둔 번개가 한꺼번에 터지는 순간에만 모습을 드러내는 요정. 볼타리움 실험실 벽이 매번 새로 칠해지는 까닭이다. The base card is set in a cluttered workshop bench with coils; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Spark Sprite: a hand-sized sprite made of a single crackling spark, with a mischievous face, hair standing straight on end and wings like flickering arcs. Silhouette: a tiny figure with arc-wings and spiky hair. Materials: white-yellow spark light, cobalt-blue arcs, static haze.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 방전 요정이 세 번 터지고도 사라지지 않아 요정들의 여왕이 되었다. 네 번째는 터지지 않았고, 이제는 터질 때를 스스로 고른다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lightning-rod city of Voltarium on the thundering plateau); crackling electric arcs, glowing coils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B3-18 · 노움 수석공학자
케라운의 벼락 · 유닛 · 레벨 4 · 강화 · 원래 카드 `B3-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B3-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B3-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "노움 수석공학자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Keraun's Thunder — a spellcaster channelling lightning power.
If a reference image is attached, it is the base card (B3-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "노움 공학자")
Continuity with the base card: this is the very same individual as "노움 공학자" (B3-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a cluttered workshop bench with coils; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 공학자 셋이 다투던 설계를 하룻밤에 합쳐 버렸다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lightning-rod city of Voltarium on the thundering plateau); crackling electric arcs, glowing coils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B3-22 · 전격 수호거상
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 원래 카드 `B3-22` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B3-22.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B3-22.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "전격 수호거상". Depict exactly what this name describes.
Subject: an elite, commanding Lightning Engine of the Keraun's Thunder — a walking machine of brass, copper coils and riveted steel built by Voltarium scholars, studded with glass lightning jars and electrodes.
If a reference image is attached, it is the base card (B3-22): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "전격 수호기")
Continuity with the base card: this is the very same individual as "전격 수호기" (B3-22) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in a cluttered workshop bench with coils; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Lightning Engine: a walking machine of brass, copper coils and riveted steel built by Voltarium scholars, studded with glass lightning jars and electrodes. Silhouette: a boxy walking machine crowned with coils. Materials: copper coils, brass, riveted steel, glass jars, porcelain insulators.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 수호기 셋의 코일을 한 몸에 감았다. 다가오면 번개가 먼저 맞는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lightning-rod city of Voltarium on the thundering plateau); crackling electric arcs, glowing coils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-B3-23 · 병 속의 원로교수 두뇌
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 원래 카드 `B3-23` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-B3-23.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-B3-23.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "병 속의 원로교수 두뇌". Depict exactly what this name describes.
Subject: an elite, commanding Brain in a Jar of the Keraun's Thunder — a professor's brain floating in a large glass jar of glowing fluid, wired with copper and crackling with thought, carried on spindly mechanical legs.
If a reference image is attached, it is the base card (B3-23): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "병 속의 교수 두뇌")
Continuity with the base card: this is the very same individual as "병 속의 교수 두뇌" (B3-23) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 학술원에서 가장 긴 강의를 하던 교수가 몸을 버리고 병 속으로 들어갔다. 강의는 더 길어졌고, 졸던 학생은 여전히 번개를 맞고 깬다. The base card is set in a cluttered workshop bench with coils; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Brain in a Jar: a professor's brain floating in a large glass jar of glowing fluid, wired with copper and crackling with thought, carried on spindly mechanical legs. Silhouette: a glass jar with a brain inside on a walking stand. Materials: glass jar, glowing fluid, copper wires, brass base.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 병 속의 교수 두뇌가 다른 교수 둘의 병과 구리선으로 이어졌다. 셋이 다투던 학설은 이제 한 병 안에서 끝없이 다툰다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lightning-rod city of Voltarium on the thundering plateau); crackling electric arcs, glowing coils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-PN-B3-C2 · 길들인 축전기
케라운의 벼락 · 유닛 · 레벨 5 · 강화 · 원래 카드 `PN-B3-C2` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-PN-B3-C2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-PN-B3-C2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "길들인 축전기". Depict exactly what this name describes.
Subject: an elite, commanding Capacitor of the Keraun's Thunder — a big copper-banded glass storage jar of captured lightning, often fitted with mechanical legs, crackling at its terminals.
If a reference image is attached, it is the base card (PN-B3-C2): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "폭주 축전기")
Continuity with the base card: this is the very same individual as "폭주 축전기" (PN-B3-C2) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 한계까지 충전한 축전기에 다리를 달았다. 더 넣으면 터진다. 고칠 수도 없다. The base card is set in a cluttered workshop bench with coils; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Capacitor: a big copper-banded glass storage jar of captured lightning, often fitted with mechanical legs, crackling at its terminals. Silhouette: a tall jar or drum with terminal knobs on top. Materials: glass, copper bands, brass terminals, crackling charge.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 폭주하던 축전기에 고삐를 달았다. 이제는 필요한 만큼만 터진다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lightning-rod city of Voltarium on the thundering plateau); crackling electric arcs, glowing coils.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G1-11 · 흑요 창술사
고르바스의 발톱 · 유닛 · 레벨 3 · 강화 · 원래 카드 `G1-11` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G1-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G1-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "흑요 창술사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Gorvath's Claw — an armed fighter wielding a weapon typical of the banner.
If a reference image is attached, it is the base card (G1-11): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "흑요 창잡이")
Continuity with the base card: this is the very same individual as "흑요 창잡이" (G1-11) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in tall dry grass and a hide tent; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 흑요석 창끝을 세 번 갈아 끼우고서야 창이 손에 붙었다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the howling steppe of Garun with its nomad camps); flying rock dust, cracked ground, ochre light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G1-18 · 오우거 대주술사
고르바스의 발톱 · 유닛 · 레벨 4 · 강화 · 원래 카드 `G1-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G1-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G1-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "오우거 대주술사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Ogre of the Gorvath's Claw — hulking steppe ogres, huge and slow: pot-bellied, heavy-browed and small-eyed, with grey-ochre skin, wearing hides and bone charms.
If a reference image is attached, it is the base card (G1-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "오우거 주술사")
Continuity with the base card: this is the very same individual as "오우거 주술사" (G1-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 땅에 귀를 대고 그롬의 한 마디를 기다리는 오우거. 오크보다 귀가 커서 첫 음절의 반은 들었다고 우긴다. The base card is set in tall dry grass and a hide tent; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Ogre: hulking steppe ogres, huge and slow: pot-bellied, heavy-browed and small-eyed, with grey-ochre skin, wearing hides and bone charms. Silhouette: huge rounded body on thick short legs with long heavy arms. Materials: grey-ochre hide, furs, bone charms, crude wooden clubs, drums and turtle-shell shields.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 마침내 그롬의 첫 음절을 다 들은 오우거. 그 뒤로 그가 북을 치면 땅이 나머지를 대신 대답한다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the howling steppe of Garun with its nomad camps); flying rock dust, cracked ground, ochre light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G1-24 · 하이에나 대무리장
고르바스의 발톱 · 유닛 · 레벨 5 · 강화 · 원래 카드 `G1-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G1-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G1-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "하이에나 대무리장". Depict exactly what this name describes.
Subject: an elite, commanding Hyena of the Gorvath's Claw — spotted steppe hyenas of Garun with high shoulders sloping to low hips, heavy bone-crushing jaws, round ears and dust-grey hides with ochre spots.
If a reference image is attached, it is the base card (G1-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "하이에나 무리장")
Continuity with the base card: this is the very same individual as "하이에나 무리장" (G1-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 한 번 웃으면 흩어진 무리가 모이고, 두 번 웃으면 적이 흩어진다. The base card is set in tall dry grass and a hide tent; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Hyena: spotted steppe hyenas of Garun with high shoulders sloping to low hips, heavy bone-crushing jaws, round ears and dust-grey hides with ochre spots. Silhouette: sloping back from high shoulders to low hips, oversized head and jaws. Materials: coarse spotted fur, bristly mane along the spine, cracked teeth, steppe dust.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 무리장 셋을 꺾고 초원의 하이에나를 하나로 묶었다. 그가 웃으면 초원이 멎는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the howling steppe of Garun with its nomad camps); flying rock dust, cracked ground, ochre light.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G2-17 · 트롤 대주술사
베르단의 뿔 · 유닛 · 레벨 4 · 강화 · 원래 카드 `G2-17` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G2-17.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G2-17.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "트롤 대주술사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Verdan's Antler — a devoted priest, ritualist or pact-bound servant, praying or offering.
If a reference image is attached, it is the base card (G2-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "트롤 주술사")
Continuity with the base card: this is the very same individual as "트롤 주술사" (G2-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in mossy roots and ferns; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 겨울잠을 세 번 건너뛰고 주술을 익혔다. 이끼가 그의 말을 듣는다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the giant-tree city of Sylvaniel in the great forest of Eilen); glowing moss, thorny vines, drifting leaves.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G2-22 · 맨드레이크 수문장
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 원래 카드 `G2-22` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G2-22.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G2-22.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "맨드레이크 수문장". Depict exactly what this name describes.
Subject: an elite, commanding Mandrake of the Verdan's Antler — mandrakes: root creatures half pulled from the soil, with gnarled human-like root bodies, a leafy crown and a gaping screaming mouth.
If a reference image is attached, it is the base card (G2-22): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "가시숲 맨드레이크")
Continuity with the base card: this is the very same individual as "가시숲 맨드레이크" (G2-22) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 가시숲 안쪽 흙에 반쯤 묻혀 산다. 뽑으려 드는 자는 그 비명에 길을 잃고 다시는 숲 밖으로 나오지 못한다. The base card is set in mossy roots and ferns; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Mandrake: mandrakes: root creatures half pulled from the soil, with gnarled human-like root bodies, a leafy crown and a gaping screaming mouth. Silhouette: gnarled root body with a crown of leaves and limbs like forked roots. Materials: brown root skin, root hairs, soil clumps, leaves.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 흙에서 스스로 걸어 나와 가시숲의 문 앞에 섰다. 이제 비명 한 번이면 문이 닫힌다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the giant-tree city of Sylvaniel in the great forest of Eilen); glowing moss, thorny vines, drifting leaves.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G2-23 · 드리엔의 대사도
베르단의 뿔 · 유닛 · 레벨 5 · 강화 · 원래 카드 `G2-23` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G2-23.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G2-23.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "드리엔의 대사도". Depict exactly what this name describes.
Subject: an elite, commanding Dryad of the Verdan's Antler — dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (no pointed ears).
If a reference image is attached, it is the base card (G2-23): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "드리엔의 사도")
Continuity with the base card: this is the very same individual as "드리엔의 사도" (G2-23) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card is set in mossy roots and ferns; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Dryad: dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (no pointed ears). Silhouette: slender willowy figure with long leaf-hair flowing like branches. Materials: smooth pale bark, leaves, blossoms, vines, sap droplets.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 드리엔의 말씀을 세 갈래로 나르던 사도들이 하나의 목소리가 되었다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the giant-tree city of Sylvaniel in the great forest of Eilen); glowing moss, thorny vines, drifting leaves.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G3-11 · 조수 예언 문어
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 원래 카드 `G3-11` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G3-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G3-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "조수 예언 문어". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Octopus of the Marencia's Song — a tide-reading octopus with eight long arms, a bulbous mantle, wise golden eyes and skin that shifts colour with the tide.
If a reference image is attached, it is the base card (G3-11): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "조수 점술 문어")
Continuity with the base card: this is the very same individual as "조수 점술 문어" (G3-11) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 밀물과 썰물의 자리를 여덟 팔로 한꺼번에 짚어 내일을 점친다. 문어가 먹물을 뿜으면 그날 배는 뜨지 않는다. The base card is set in rippling lagoon water; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Octopus: a tide-reading octopus with eight long arms, a bulbous mantle, wise golden eyes and skin that shifts colour with the tide. Silhouette: bulbous mantle with eight curling arms. Materials: soft colour-shifting skin, suckers, ink clouds, shells.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 조수를 읽던 문어가 이제는 조수가 언제 돌아설지를 정한다. 여덟 팔 가운데 일곱을 그 일에 쓴다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lagoon temple of Selenea); clear water light, spray, ripples, bubbles.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G3-12 · 산호등 대거북
마렌시아의 노래 · 유닛 · 레벨 3 · 강화 · 원래 카드 `G3-12` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G3-12.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G3-12.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "산호등 대거북". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Sea Turtle of the Marencia's Song — great sea turtles whose shells grow living coral like a small reef.
If a reference image is attached, it is the base card (G3-12): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "산호등 거북")
Continuity with the base card: this is the very same individual as "산호등 거북" (G3-12) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 등딱지 위에 산호가 자라는 바다거북. 깨진 자리에는 다음 해 더 단단한 산호가 덮인다. The base card is set in rippling lagoon water; keep that same place, intensified.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Sea Turtle: great sea turtles whose shells grow living coral like a small reef. Silhouette: broad domed shell with paddle flippers. Materials: coral-encrusted shell, barnacles, leathery flippers, seaweed.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 등의 산호가 세 겹으로 자라 작은 바위섬처럼 되었다. 산호가 자라는 만큼 그도 느려지고 단단해진다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lagoon temple of Selenea); clear water light, spray, ripples, bubbles.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G3-17 · 석호 대치유 듀공
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 원래 카드 `G3-17` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G3-17.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G3-17.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "석호 대치유 듀공". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Dugong of the Marencia's Song — gentle dugongs of the Selenea lagoon with plump grey bodies, whiskered faces and fluked tails, whose warm breath heals wounds.
If a reference image is attached, it is the base card (G3-17): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "석호 치유 듀공")
Continuity with the base card: this is the very same individual as "석호 치유 듀공" (G3-17) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 석호의 따뜻한 물에 사는 듀공. 다친 자를 등에 태우고 한 바퀴 돌면, 죽어 가던 자도 숨을 고른다. The base card is set in rippling lagoon water; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Dugong: gentle dugongs of the Selenea lagoon with plump grey bodies, whiskered faces and fluked tails, whose warm breath heals wounds. Silhouette: plump rounded body with paddle flippers and a fluked tail. Materials: smooth grey skin, whiskers, seagrass, warm lagoon water.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 이제 한 번 숨을 내쉬면 석호의 물이 데워진다. 다친 자 셋을 한꺼번에 등에 태운다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lagoon temple of Selenea); clear water light, spray, ripples, bubbles.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G3-18 · 물기둥 산호 조율사
마렌시아의 노래 · 유닛 · 레벨 4 · 강화 · 원래 카드 `G3-18` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G3-18.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G3-18.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "물기둥 산호 조율사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Coral Spirit of the Marencia's Song — coral spirits: reef coral woken into a living branching figure that raises pillars of water, its polyps glowing.
If a reference image is attached, it is the base card (G3-18): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "물기둥 산호 정령")
Continuity with the base card: this is the very same individual as "물기둥 산호 정령" (G3-18) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 석호의 산호초가 깨어나 정령이 되었다. 가지를 한 번 들면 바다가 따라 일어서고, 무너질 때 적도 함께 쓸려 간다. The base card is set in rippling lagoon water; keep that same place, intensified.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Coral Spirit: coral spirits: reef coral woken into a living branching figure that raises pillars of water, its polyps glowing. Silhouette: branching coral figure with arms like antler coral. Materials: pink and orange coral, glowing polyps, shells, sea foam.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 산호 가지가 세 갈래로 자랐다. 이제 물기둥 셋의 높이를 맞춰 하나의 성벽처럼 세운다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lagoon temple of Selenea); clear water light, spray, ripples, bubbles.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UP-G3-24 · 검은 갈기 켈피
마렌시아의 노래 · 유닛 · 레벨 5 · 강화 · 원래 카드 `G3-24` — **원래 카드 그림을 먼저 받아 함께 넣고 그릴 것**(같은 인물이 한 단계 오른 모습) — 받은 그림은 `tools/art/inbox/UP-G3-24.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UP-G3-24.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EMPOWERED — the same warrior fused from three into one stronger self. The base card's unit evolved: three of the same warrior fused into one stronger self — same identity, visibly reinforced.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "검은 갈기 켈피". Depict exactly what this name describes.
Subject: an elite, commanding Kelpie of the Marencia's Song — kelpies: water horses with dark wet hides, streaming seaweed manes and hooves that churn whirlpools.
If a reference image is attached, it is the base card (G3-24): keep the same character, species, face, colours and silhouette and repaint it as the empowered version. (base card: "소용돌이 켈피")
Continuity with the base card: this is the very same individual as "소용돌이 켈피" (G3-24) after a promotion — same species, sex, age, face, hair or beard, colours, weapon type and fighting style, now one rank higher. The base card's lore: 갈기를 한 번 휘저으면 물이 감겨 돌기 시작하는 물말. 그 등에 올라탄 자는 바닥까지 끌려간다. The base card is set in rippling lagoon water; keep that same place, intensified.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Kelpie: kelpies: water horses with dark wet hides, streaming seaweed manes and hooves that churn whirlpools. Silhouette: rearing horse with a streaming seaweed mane. Materials: wet black-green hide, kelp mane, foam, shells.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 소용돌이를 수없이 돌린 끝에 갈기가 심해처럼 검어졌다. 이제 물살이 그 발굽을 따라 돈다.
Camera: the same framing as the base card but one step closer and lower, a rising, upward pose.
Lighting: element backlight plus teal energy pouring up from below and glowing through seams of the gear; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the same setting as the base card, intensified: more particles and a faint shockwave ring (the lagoon temple of Selenea); clear water light, spray, ripples, bubbles.
Detail: reinforced, upgraded gear (an extra plate, a heavier weapon, a bigger device) with a triple motif: three bands, three gems, three barrels or three braids fused into one.
Spectacle: teal energy rising from below, glowing seams and a faint shockwave ring — between rare and epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: teal (#3fe0c0) energy seams and upward-streaming light streaks, a flowing sheen — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: ascending, refined, powered-up.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

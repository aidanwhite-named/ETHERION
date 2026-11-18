# 에픽 (Epic) — 카드 일러스트 프롬프트 (63장, 버전 g3)

> 영웅 · 괴물 · 초월자의 유물. 영화의 한 장면처럼 크고 강하다. 낮은 광각, 빛줄기, 날씨와 전장의 이야기, 보랏빛 비술 알갱이.

## 이 등급의 연출 틀

```
Grade: EPIC — heroic and larger than life, cinematic. a heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom.
Background: rich environmental storytelling: {landmark}; weather (storm, ash, spray, wind) and deep atmosphere.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura (about 15% of the light).
Mood: awe, momentum, overwhelming force.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다. 그대로 붙여 넣으면 된다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 58장

### US-A3-1 · 그믐의 계약서
모르카스의 그믐 · 핸드 마법 · 레벨 1 · 에픽 — 받은 그림은 `tools/art/inbox/US-A3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그믐의 계약서". Depict exactly what this name describes.
Subject: trick spell played on the opponent's hidden hand — cunning: hidden cards, eyes, threads of fate, a sly hand in shadow; quieter, mysterious lighting. The moment it takes effect: threads of fate and glowing cards being drawn; a sly hand reaching into the enemy's hidden plans. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Art direction: Contract of the New Moon (v3.95, now a Morkas's New Moon card — demon, not elf): under a black new-moon sky above the canyon spires of Noctar, a long black-parchment contract unrolls in mid-air, sealed with blood-red wax and violet sigils; the enemy's name is inscribed on it in glowing blood ink (illegible, no real letters). Beneath it a fanned hand of enemy cards (blank backs) withers and greys like dying leaves, while one fresh card slides from the shadows into the caster's elegant clawed hand. Epic: violet light shafts, drifting ash, a faint faceless shadow king with balanced scales behind the moon.
Scale (level 1 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 그믐밤 녹타르에서 맺는 계약서에는 상대의 이름도 함께 적힌다. 서명한 자는 한 장을 더 쥐고, 적힌 자의 패는 손안에서 시들어 간다.
Game effect (Korean, mood only — never draw text or numbers): 상대 핸드의 유닛 전체 공격 −1, 체력 −1 (이 판 내내). 체력이 0이 되면 소각된다. 저주 면역인 스탯은 깎이지 않는다. 카드 1장을 뽑는다(생명 소모 없음).
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A1-3 · 장막의 처형자
모르카스의 그믐 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "장막의 처형자". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Wraith of the Morkas's New Moon — a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Wraith: a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains. Silhouette: floating and hooded, legless, trailing chains. Materials: translucent grey-violet mist, rusted chains, a torn shroud. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심연의 장막에서 걸어 나온 것. 무엇을 두고 나왔는지 묻는 자는 다음 차례가 된다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-A2-1 · 성광의 검
솔란테의 새벽 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-A2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "성광의 검". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering holy light aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽의 어머니 솔란테가 방패를 든 손에도 검을 쥐여 준 날. 빛으로 벼린 칼날은 갑옷을 보지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 공격 +2, [방어무시].
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A2-1 · 새벽성 문지기 라마수
솔란테의 새벽 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "새벽성 문지기 라마수". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Lamassu of the Solante's Dawn — a winged bull with a crowned, bearded calm face, carved in white stone at the Dawn Citadel gate and now awake.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Lamassu: a winged bull with a crowned, bearded calm face, carved in white stone at the Dawn Citadel gate and now awake. Silhouette: a massive winged bull standing square at a gate. Materials: white limestone, gold inlay, carved feathers. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 엘라드 성문 기둥에 새겨져 있던 날개 달린 황소. 성문이 처음 열린 날 깨어나, 그 뒤로 한 번도 문 앞을 비운 적이 없다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-A2 · 솔란테의 날개 깃
솔란테의 새벽 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 날개 깃". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Solante's Dawn (weapon/armour + holy relic; if unsure, a shield). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽의 어머니가 여섯 날개에서 뽑아 준 깃 하나. 두른 자의 방어는 그 깃의 두께가 되고, 깃 끝은 칼날처럼 베어 아물지 않는 상처를 남긴다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-A2-2 · 태양 심판
솔란테의 새벽 · 공용 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-A2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "태양 심판". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive holy light attack striking the enemy ranks; a protective barrier or ward shielding allies. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 해가 가장 높이 뜬 순간에만 내려지는 판결. 칼을 가장 높이 든 자부터 빛에 탄다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 중 공격이 가장 높은 2기에게 피해 4. 아군 맨 앞 유닛에게 [보호막].
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A2-2 · 황혼 장벽 파수장
솔란테의 새벽 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "황혼 장벽 파수장". Depict exactly what this name describes.
Subject: an elite, commanding member of the Solante's Dawn — an armed fighter wielding a weapon typical of the banner.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 빈 땅을 마주한 황혼의 장벽을 지키는 천족. 장벽 너머에서 무엇이 오든 먼저 맞는 것이 그의 일이다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A2-E · 황혼 장벽의 맹세자
솔란테의 새벽 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-A2-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A2-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "황혼 장벽의 맹세자". Depict exactly what this name describes.
Subject: an elite, commanding member of the Solante's Dawn — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 회색 감옥을 봉인한 고대의 성광 기사단 마지막 맹세자. 그날의 맹세를 아직 풀지 않았다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A2-3 · 황혼의 대천사
솔란테의 새벽 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "황혼의 대천사". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Archangel of the Solante's Dawn — a towering archangel of the dawn with many great white wings and gold armour, a lance of light in hand.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Archangel: a towering archangel of the dawn with many great white wings and gold armour, a lance of light in hand. Silhouette: a tall figure framed by vast spread wings. Materials: white and gold feathers, gold plate, radiant light. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 솔란테의 여섯 날개 가운데 하나를 받았다는 대천사. 그 날개 아래에 선 자는 해가 질 때까지 쓰러지지 않는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; weather (storm, ash, spray, wind) and deep atmosphere; pale gold radiance, halo, feathers of light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-A3 · 벨루미르의 별 시위
벨루미르의 별 · 아이템 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/PI-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "벨루미르의 별 시위". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Belumir's Star (catalyst; if unsure, a bow). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 2 of 8): a simple object.
Banner — Belumir's Star: high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud. Silhouette: slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 별을 읽는 신이 별빛을 꼬아 만든 시위. 당긴 자의 힘은 그 순간 그대로 굳고, 팽팽한 시위가 첫 화살을 튕겨 낸다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A3-1 · 바늘탑의 실프 사수
벨루미르의 별 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바늘탑의 실프 사수". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Sylph of the Belumir's Star — a slender wind spirit shaped like a half-transparent girl of moving air, her hair and limbs streaming off into gusts.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Sylph: a slender wind spirit shaped like a half-transparent girl of moving air, her hair and limbs streaming off into gusts. Silhouette: an airy figure dissolving into wind streaks at the edges. Materials: translucent air, teal swirls, caught leaves and feathers. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑 궁사회에서 활을 배운 바람 정령. 제 몸이 바람이라 화살 대신 별의 문자만 실어 보내도 과녁까지 간다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-A3-2 · 벨루미르의 눈
벨루미르의 별 · 공용 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-A3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "벨루미르의 눈". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive wind attack striking the enemy ranks; a weakening curse sinking over the enemies; a calm restoring light closing wounds. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 천 개의 눈이 박힌 로브의 신 벨루미르가 전장을 한 번 내려다본다. 칼을 든 손이 그 눈길에 멈춘다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 공격 −2, 피해 2. 상대 맨 앞 2기는 이번 턴 공격도 반격도 하지 않는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NA3-4 · 바람의 사냥
벨루미르의 별 · 공용 마법 · 레벨 4 · 에픽 — 받은 그림은 `tools/art/inbox/NA3-4.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NA3-4.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바람의 사냥". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive wind attack striking the enemy ranks; allies rallying as one under a shared surge of power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 4 of 8): an effect over a few targets.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 벨루미르의 바늘 꼭대기에서 사냥의 뿔피리가 울린다. 그날 하이엘프의 화살은 바람을 타고, 칼은 단 한 번도 그들에게 닿지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 체력 −3. 아군 유닛 전체 [원거리].
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A3-2 · 번개구름 고래
벨루미르의 별 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "번개구름 고래". Depict exactly what this name describes.
Subject: an elite, commanding Cloud Whale of the Belumir's Star — a whale made of cloud swimming slowly through the sky, its soft body billowing, sometimes dark with thunder.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Cloud Whale: a whale made of cloud swimming slowly through the sky, its soft body billowing, sometimes dark with thunder. Silhouette: a huge whale shape of billowing cloud. Materials: white or storm-grey cloud, wisps of mist, flickers of lightning. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 몸에 두른 번개구름이 첫 칼날을 흩는다. 그것이 머리 위를 지나는 동안에는 아군이 부른 번개도 더 굵게 떨어진다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A3-E · 이사크의 첫 제자
벨루미르의 별 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-A3-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A3-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "이사크의 첫 제자". Depict exactly what this name describes.
Subject: an elite, commanding member of the Belumir's Star — a high-elf archer whose arrows ride wind power — bow drawn or just loosed, aiming from afar.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Belumir's Star: high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud. Silhouette: slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 별의 문자를 해독한 이사크에게 처음 활을 배운 하이엘프. 스승이 별 사이로 떠난 뒤에도 같은 별을 겨눈다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A3-3 · 하늘 요람의 감시자
벨루미르의 별 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "하늘 요람의 감시자". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Star Owl of the Belumir's Star — an owl whose indigo plumage is dotted with silver star points like a night sky, with round eyes that glow like stars.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Star Owl: an owl whose indigo plumage is dotted with silver star points like a night sky, with round eyes that glow like stars. Silhouette: a round owl with huge eyes, wings folded or spread silently. Materials: indigo feathers with silver star dots, gold glowing eyes, soft down. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑 꼭대기 관문 너머, 하늘 요람을 지키는 커다란 별부엉이. 바람의 용 시렐도 그 눈과 마주치면 장난을 멈춘다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; weather (storm, ash, spray, wind) and deep atmosphere; swirling teal wind, fluttering robes and pages.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B1-1 · 유폭
도르마크의 심장불 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-B1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "유폭". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화약 짐꾼이 쓰러지면 짐도 함께 터진다. 포르탄 포병단은 그것을 전술이라 부른다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛에게 피해 4. 그 유닛이 쓰러지면 상대 유닛 전체에게 피해 2.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B1-1 · 포르탄 척탄수장
도르마크의 심장불 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "포르탄 척탄수장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Dormak's Heartfire — an armed fighter wielding a weapon typical of the banner.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 척탄병 백 명이 던질 것을 혼자 던진다. 화약 냄새가 나지 않는 날이 없다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-B1 · 도르마크의 심장불
도르마크의 심장불 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도르마크의 심장불". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Dormak's Heartfire (catalyst; if unsure, a staff). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화관 산맥 아래 거인의 식지 않은 심장불을 한 줌 떠 왔다. 쥔 자의 힘은 그날부터 그 불의 세기로 정해지고, 막아 낸 칼끝에도 불길이 되받아친다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B1-2 · 도르마크 포격
도르마크의 심장불 · 공격 마법 · 레벨 4 · 에픽 — 받은 그림은 `tools/art/inbox/US-B1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도르마크 포격". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 4 of 8): an effect over a few targets.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화관 산맥 아래 거인 도르마크의 심장불로 달군 포탄. 한 번 쏘면 두 번 터진다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 피해 2를 두 번. [장전 1]
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B1-2 · 화관의 불사조
도르마크의 심장불 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "화관의 불사조". Depict exactly what this name describes.
Subject: an elite, commanding Phoenix of the Dormak's Heartfire — a great bird of fire with long trailing plumes of flame, its feathers burning to ash and rekindling as it flies.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Phoenix: a great bird of fire with long trailing plumes of flame, its feathers burning to ash and rekindling as it flies. Silhouette: a fiery bird with outspread wings and a long tail. Materials: flame feathers, glowing ash, golden embers. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화관 산맥 꼭대기에서 타 죽고 다시 깨어나기를 되풀이하는 새. 산 아래 포대의 심지를 노려 내리꽂히고, 연기가 걷힐 즈음엔 이미 재가 되어 다른 둥지에 있다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B1-E · 뛰는 심장불 조각
도르마크의 심장불 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-B1-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B1-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뛰는 심장불 조각". Depict exactly what this name describes.
Subject: an elite, commanding Heart-fire Shard of the Dormak's Heartfire — a floating fragment of the giant Dormak's heart-fire — a jagged ember like a boulder of glowing crystal that still beats with pulses of light.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Heart-fire Shard: a floating fragment of the giant Dormak's heart-fire — a jagged ember like a boulder of glowing crystal that still beats with pulses of light. Silhouette: a jagged glowing shard pulsing like a heart. Materials: molten-core crystal, cracked rock rind, pulsing orange-white light. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 심장불에서 떨어져 나와 아직도 뛰는 조각. 탈라쿠스의 맥박이 빨라질수록 같이 빨라지는데, 포르탄은 그것이 좋은 일인지 묻지 않는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B1-3 · 용을 노린 거포
도르마크의 심장불 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "용을 노린 거포". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Awakened Cannon of the Dormak's Heartfire — a monstrous cast-iron cannon that has woken and moves by itself, its carriage wheels working like limbs and its muzzle glowing like a breathing mouth.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Awakened Cannon: a monstrous cast-iron cannon that has woken and moves by itself, its carriage wheels working like limbs and its muzzle glowing like a breathing mouth. Silhouette: a giant cannon rearing its barrel like a head. Materials: cast iron, riveted carriage, chains, glowing muzzle, soot. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄이 이그날을 쏘겠다며 부어 만든 거포가 어느 날 스스로 포구를 들었다. 아직 한 번도 용에게 쏜 적은 없지만, 화관 산맥 쪽만 보면 포신이 달아오른다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; weather (storm, ash, spray, wind) and deep atmosphere; embers, flame light, gunpowder smoke.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B2-2 · 강철 행군
소르그림의 방패 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-B2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "강철 행군". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: allies rallying as one under a shared surge of power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 두르크하임의 골렘들이 발을 맞추면 철골 산맥이 울린다. 한 기가 늘 때마다 모든 망치가 그만큼 무거워진다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 공격 + (아군 유닛 수).
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B2-1 · 가시철 고슴도치
소르그림의 방패 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "가시철 고슴도치". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Iron Hedgehog of the Sorgrim's Shield — a boar-sized hedgehog whose spines are iron rivets and nails it swallowed and grew back out.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Iron Hedgehog: a boar-sized hedgehog whose spines are iron rivets and nails it swallowed and grew back out. Silhouette: a round ball of iron spikes. Materials: iron spikes, rivets, rusty fur. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 공방에 버려진 리벳을 주워 먹다가 가시가 쇠로 돋은 고슴도치. 앞을 막고 웅크리는 것밖에 할 줄 모르는데, 그게 문제다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-B2 · 소르그림의 힘줄
소르그림의 방패 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "소르그림의 힘줄". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Sorgrim's Shield (engraving; if unsure, a piece of armour). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 철골 산맥에 드러난 광맥, 잠든 거인의 힘줄 한 가닥을 꼬아 몸에 감았다. 끊어진 적이 없고, 달아오르면 닿는 것마다 불이 붙는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B2-1 · 철골 해머
소르그림의 방패 · 공격 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-B2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철골 해머". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering metal aura rising around allied warriors; a protective barrier or ward shielding allies. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 골렘들이 한 줄로 서서 하나의 망치가 된다. 소르그림의 팔을 캐낸 쇠로 만들었다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 방어 +1. 그 뒤 아군 유닛 방어의 합만큼 상대 맨 앞 유닛에게 피해. 쓰러뜨리고 남은 피해는 다음 유닛에게 넘어간다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B2-2 · 강철 분쇄 골렘
소르그림의 방패 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "강철 분쇄 골렘". Depict exactly what this name describes.
Subject: an elite, commanding Golem of the Sorgrim's Shield — a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Golem: a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: riveted steel plate, stone, pistons, chains, glowing seams, steam. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 두르크하임 광산에서 바위를 깨던 골렘을 싸움에 내보냈다. 갑옷도 바위처럼 깬다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B2-E · 페로스를 본 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-B2-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B2-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "페로스를 본 골렘". Depict exactly what this name describes.
Subject: an elite, commanding Golem of the Sorgrim's Shield — a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Golem: a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: riveted steel plate, stone, pistons, chains, glowing seams, steam. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 광맥 깊은 곳에서 금속의 용 페로스와 마주쳤다가 돌아온 골렘. 그 뒤로 몸이 거울처럼 되비친다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B2-3 · 두르크하임 성문 거상
소르그림의 방패 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "두르크하임 성문 거상". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Colossus of the Sorgrim's Shield — a towering forged colossus of steel many times the height of a golem, with a furnace heart glowing through its chest plates.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Colossus: a towering forged colossus of steel many times the height of a golem, with a furnace heart glowing through its chest plates. Silhouette: a giant humanoid machine filling the frame. Materials: riveted steel plate, furnace glow, steam vents, chains. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 지하 도시의 성문 그 자체. 문이 걸어 나가면 도시가 비지 않느냐는 물음에 공방장은 "문이 돌아온다"고만 답했다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; weather (storm, ash, spray, wind) and deep atmosphere; cold steel sheen, sparks from an anvil, rivets.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-B3 · 즈라크의 번개 병
케라운의 벼락 · 아이템 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/PI-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "즈라크의 번개 병". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Keraun's Thunder (catalyst; if unsure, a staff). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 2 of 8): a simple object.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 번개의 대정령이 갇혔다 달아난 병. 남은 번개가 들쭉날쭉 손끝에서 튀고, 병을 깨뜨리려 덤빈 자는 그 불꽃에 덴다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B3-1 · 번개 폭주
케라운의 벼락 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-B3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "번개 폭주". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: chained lightning strikes leaping from target to target. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움의 병이 한꺼번에 깨진 날. 번개가 어디로 갈지는 번개도 모른다.
Game effect (Korean, mood only — never draw text or numbers): 상대 무작위 유닛에게 피해 1을 6번.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B3-1 · 볼타리움 방전 실험체
케라운의 벼락 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "볼타리움 방전 실험체". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Test Subject of the Keraun's Thunder — a creature woken by lightning in a Voltarium laboratory, stitched together with copper wire, bolts and electrodes that glow at the seams.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Test Subject: a creature woken by lightning in a Voltarium laboratory, stitched together with copper wire, bolts and electrodes that glow at the seams. Silhouette: a hunched figure with sparking electrodes. Materials: patched hide, copper wires, bolts, glass gauges, sparks. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움이 번개로 깨운 실험체. 몸에 남는 전기를 조금씩 흘려 날아오는 것을 떨어뜨리고, 그래도 남으면 아군 마법에 얹는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-B3-2 · 케라운의 신경
케라운의 벼락 · 공격 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-B3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-B3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운의 신경". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: chained lightning strikes leaping from target to target. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 뇌명 고원 아래 잠든 거인 케라운의 신경을 건드렸다. 번개가 땅 위로 줄지어 튀어 오른다.
Game effect (Korean, mood only — never draw text or numbers): 상대 대기열 맨 앞부터 차례로 피해 4 → 3 → 3 → 2.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B3-2 · 연쇄 번개뱀
케라운의 벼락 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "연쇄 번개뱀". Depict exactly what this name describes.
Subject: an elite, commanding Lightning Serpent of the Keraun's Thunder — a serpent whose body is a living chain of lightning that leaps from one target to the next.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Lightning Serpent: a serpent whose body is a living chain of lightning that leaps from one target to the next. Silhouette: a snake made of zigzag lightning. Materials: white-blue lightning scales, arcs, sparks. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 한 몸을 물면 그다음 몸으로 튀어 가는 번개뱀. 학자들이 평생 그 까닭을 쫓았지만, 뱀은 아직 한 번도 멈춘 적이 없다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B3-E · 케라운 신경 증폭기
케라운의 벼락 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-B3-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B3-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운 신경 증폭기". Depict exactly what this name describes.
Subject: an elite, commanding Capacitor of the Keraun's Thunder — a big copper-banded glass storage jar of captured lightning, often fitted with mechanical legs, crackling at its terminals.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Capacitor: a big copper-banded glass storage jar of captured lightning, often fitted with mechanical legs, crackling at its terminals. Silhouette: a tall jar or drum with terminal knobs on top. Materials: glass, copper bands, brass terminals, crackling charge. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 잠든 거인의 신경 한 가닥에 걸어 다니는 장치를 매달았다. 번개가 한 번 지나가면 줄지어 선 것이 모두 떤다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-B3-3 · 케라운의 피뢰탑
케라운의 벼락 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-B3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-B3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운의 피뢰탑". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Lightning Tower of the Keraun's Thunder — a tall lattice tower of steel and copper bristling with lightning rods, often walking on its own legs, crackling with arcs.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Lightning Tower: a tall lattice tower of steel and copper bristling with lightning rods, often walking on its own legs, crackling with arcs. Silhouette: a tall spiked tower. Materials: steel lattice, copper rods, porcelain insulators, arcs. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 뇌명 고원 아래 잠든 거인의 신경 위에 세운 탑. 걸어 다니게 만든 것은 노움들의 고집이다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; weather (storm, ash, spray, wind) and deep atmosphere; crackling electric arcs, glowing coils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G1-1 · 결투 신청
고르바스의 발톱 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-G1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "결투 신청". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an annihilating blow that erases a foe. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운의 오크는 가장 센 자에게 먼저 칼을 던진다. 잿갈기 카르노가 백 번의 결투로 남긴 법이다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 유닛 공격 +4. 그 유닛이 상대 유닛 중 공격이 가장 높은 1기를 먼저 친다(물리 피해). 그 유닛이 살아남으면 되친다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G1-1 · 흑요 사이클롭스 투사
고르바스의 발톱 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "흑요 사이클롭스 투사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Cyclops of the Gorvath's Claw — one-eyed cyclopes of the duel ring: towering grey-ochre pit fighters with a single great eye, heavy scars and black obsidian studded into their gauntlets.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Cyclops: one-eyed cyclopes of the duel ring: towering grey-ochre pit fighters with a single great eye, heavy scars and black obsidian studded into their gauntlets. Silhouette: towering broad-chested humanoid with one huge eye and oversized fists. Materials: grey-ochre skin, scars, obsidian studs, rough leather wraps. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 외눈에 흑요석 건틀릿 하나로 가르운 결투장에서 서른 번을 이겼다. 고르바스가 한쪽 눈을 뜨고 본 싸움이 그중 하나다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-G1 · 카르노의 결투 장갑
고르바스의 발톱 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "카르노의 결투 장갑". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw (weapon/armour; if unsure, a carved stone or engraved plate). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 잿갈기 카르노가 백 번째 결투에서 벗어 던진 장갑. 낀 손은 무슨 저주를 받아도 주먹이 작아지지 않고, 맞은 자리는 싸우는 사이 아문다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G1-2 · 대지의 격노
고르바스의 발톱 · 공격 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-G1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "대지의 격노". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering earth aura rising around allied warriors. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 무리가 한꺼번에 발을 구르면 대지의 용 고르바스가 잠결에 뒤척인다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 공격 +2. 상대 유닛 전체에게 피해 (아군 유닛 수).
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G1-2 · 털코뿔소 기수
고르바스의 발톱 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "털코뿔소 기수". Depict exactly what this name describes.
Subject: an elite, commanding Woolly Rhino of the Gorvath's Claw — a woolly rhinoceros of the high steppe with a long shaggy ochre-brown coat, a low heavy head and a great forward horn, ridden by an orc.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Woolly Rhino: a woolly rhinoceros of the high steppe with a long shaggy ochre-brown coat, a low heavy head and a great forward horn, ridden by an orc. Silhouette: massive low barrel body with a long forward horn and a rider on top. Materials: shaggy wool, cracked grey hide, horn, leather harness, dust. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 울부짖는 초원의 털코뿔소가 등을 허락한 유일한 오크. 하나를 들이받으면 멈추지 않고 다음 대열로 내달린다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G1-E · 왕좌봉 맘모스
고르바스의 발톱 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-G1-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G1-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "왕좌봉 맘모스". Depict exactly what this name describes.
Subject: an elite, commanding Mammoth of the Gorvath's Claw — a mammoth of the snowy passes of Throne Peak with long reddish wool, great spiralling tusks and a rock-crusted brow, carrying an orc rider.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Mammoth: a mammoth of the snowy passes of Throne Peak with long reddish wool, great spiralling tusks and a rock-crusted brow, carrying an orc rider. Silhouette: towering domed head and humped back with spiralling tusks. Materials: long shaggy wool, ivory tusks, rock crust, snow and dust. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 고르바스의 등 위, 눈 덮인 고개에서 사는 맘모스. 오크 하나를 태우고 왕좌봉을 내려오면 산사태가 뒤따른다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G1-3 · 왕좌봉 결투왕
고르바스의 발톱 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "왕좌봉 결투왕". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring member of the Gorvath's Claw — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 고르바스가 잠든 왕좌봉까지 올라가 결투를 청한 오크. 용은 깨지 않았지만, 그 길에서 만난 자는 모두 쓰러졌다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; weather (storm, ash, spray, wind) and deep atmosphere; flying rock dust, cracked ground, ochre light.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G2-2 · 고목의 분노
베르단의 뿔 · 공격 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-G2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고목의 분노". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of forest power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 용 베르단이 노하면 천 년을 버틴 고목이 뿌리째 걸어 나온다. 버텨 온 세월이 그대로 무게가 된다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛마다 공격 + (자기 남은 체력의 절반, 올림).
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G2-1 · 엉겅퀴 덩굴귀
베르단의 뿔 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "엉겅퀴 덩굴귀". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Vine Horror of the Verdan's Antler — vine horrors of the Rusty Swamp's edge: shambling tangles of thorny vines and briars that knot themselves into a beast-like shape.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Vine Horror: vine horrors of the Rusty Swamp's edge: shambling tangles of thorny vines and briars that knot themselves into a beast-like shape. Silhouette: hulking shambling mass of coiled vines with thorny lashing tendrils. Materials: thorny briars, rust-stained vines, thistle heads, sap, dead leaves. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 녹슨 늪 가장자리에서 엉겅퀴와 덩굴이 엉켜 일어선 것. 녹물을 마시고 가시가 쇠처럼 굳었다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-G2 · 드리엔의 씨앗
베르단의 뿔 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "드리엔의 씨앗". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler (holy relic; if unsure, a sacred relic (chalice, reliquary or holy symbol — not a plain cross)). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 대정령이 품은 첫 씨앗. 심은 몸에 고목의 수명이 깃든다. 베어도 같은 키로 다시 자라고, 뻗은 가지는 숨통을 노린다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG2-08 · 고목 내려찍기
베르단의 뿔 · 공용 마법 · 레벨 4 · 에픽 — 받은 그림은 `tools/art/inbox/SG2-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG2-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고목 내려찍기". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of forest power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Art direction: Ancient trunk slam: a huge gnarled tree-troll rearing up with its roots torn from the ground and bringing its whole trunk-like body crashing down onto a line of enemy silhouettes; a shockwave of soil, splinters and moss bursting outward, the ground caving in. The troll's bark is cracking and drained grey after the blow. Low angle, dramatic, dim green forest light.
Scale (level 4 of 8): an effect over a few targets.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 고목이 뿌리째 몸을 일으켜, 품은 수액의 무게를 실어 내리찍는다. 땅이 꺼지고, 고목은 껍질 절반을 잃는다.
Game effect (Korean, mood only — never draw text or numbers): 체력이 가장 높은 아군 유닛의 체력은 절반이 되고(내림), 감소한 만큼 방어력이 1 이상인 상대 유닛에게 피해.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G2-2 · 실바니엘의 활 드라이어드
베르단의 뿔 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "실바니엘의 활 드라이어드". Depict exactly what this name describes.
Subject: an elite, commanding Dryad of the Verdan's Antler — dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (never elves, no pointed ears).
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Dryad: dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (never elves, no pointed ears). Silhouette: slender willowy figure with long leaf-hair flowing like branches. Materials: smooth pale bark, leaves, blossoms, vines, sap droplets. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 거목 도시의 가장 높은 가지에 깃든 드라이어드. 화살이 떨어질 때쯤이면 쏜 자리는 잎에 덮여 있다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G2-E · 태고림 이끼뿔 사슴
베르단의 뿔 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-G2-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G2-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "태고림 이끼뿔 사슴". Depict exactly what this name describes.
Subject: an elite, commanding Antlered Stag of the Verdan's Antler — great forest stags whose antlers grow like living branches with leaves and moss, after the dragon Verdan's own.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Antlered Stag: great forest stags whose antlers grow like living branches with leaves and moss, after the dragon Verdan's own. Silhouette: proud stag with an enormous branching antler crown. Materials: russet hide with pale spots, mossy wooden antlers, new leaves. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 세계 최초의 숲에서 내려온 사슴. 베르단의 뿔 그늘에서 천 년을 잤고, 잠든 동안 뿔에 숲이 자랐다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G2-3 · 베르단의 고목 거인
베르단의 뿔 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 고목 거인". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Treant of the Verdan's Antler — treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Treant: treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks. Silhouette: towering trunk body with spreading branch arms and root feet. Materials: rough bark, moss, leaves, knotted roots, amber sap. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 태고림 산맥에서 내려온 고목. 베르단의 뿔에서 떨어진 가지가 자랐다는 말이 있다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; weather (storm, ash, spray, wind) and deep atmosphere; glowing moss, thorny vines, drifting leaves.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-G3 · 마렌시아의 비늘
마렌시아의 노래 · 아이템 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/PI-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마렌시아의 비늘". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Marencia's Song (holy relic; if unsure, a shield). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 2 of 8): a simple object.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 용이 맹약의 날 떨군 비늘 한 장. 지닌 자의 모습을 그날 그대로 지키고, 비늘에 비친 빛을 본 상대는 넋을 잃는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G3-1 · 넬리아의 노래
마렌시아의 노래 · 공용 마법 · 레벨 2 · 에픽 — 받은 그림은 `tools/art/inbox/US-G3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "넬리아의 노래". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive water attack striking the enemy ranks; a cleansing wave washing away enchantments. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 대정령 넬리아의 노래. 담긴 그릇에 따라 모습이 바뀌는 물처럼, 듣는 자의 모든 꾸밈을 씻어 낸다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 코인이 뒷면이 되고 [홀림]에 걸린다(이미 정해진 코인은 그대로). 상대 유닛 전체에게 피해 1. 아군 맨 앞 유닛에게 이번 턴 [정화].
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G3-1 · 진주빛 해파리
마렌시아의 노래 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "진주빛 해파리". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Jellyfish of the Marencia's Song — a pearl-luminous jellyfish with a softly glowing bell and long trailing tentacles strung with pearls.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Jellyfish: a pearl-luminous jellyfish with a softly glowing bell and long trailing tentacles strung with pearls. Silhouette: domed glowing bell over streaming tentacles. Materials: translucent bell, pearlescent glow, tentacles, bubbles. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 무녀단의 진주를 삼키고 빛을 얻은 해파리. 몸을 한 번 오므리면 물결이 일어서서 칼끝을 흘려보낸다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G3-2 · 조수의 귀환
마렌시아의 노래 · 공용 마법 · 레벨 4 · 에픽 — 받은 그림은 `tools/art/inbox/US-G3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "조수의 귀환". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive water attack striking the enemy ranks; an empowering water aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 4 of 8): an effect over a few targets.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 탈라쿠스의 맥박에 맞춰 물러갔던 바다가 돌아온다. 적은 쓸려 가고 아군은 씻긴다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 피해 2. 아군 전체 체력 +1. 아군 맨 앞 유닛에게 이번 턴 [치유 1].
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G3-2 · 심해 나가 작살 기사
마렌시아의 노래 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "심해 나가 작살 기사". Depict exactly what this name describes.
Subject: an elite, commanding Naga of the Marencia's Song — naga of Marencia's waters: a scaled human upper body joined to a long serpent tail, with fin crests along the head and armour of shell and coral.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Naga: naga of Marencia's waters: a scaled human upper body joined to a long serpent tail, with fin crests along the head and armour of shell and coral. Silhouette: upright torso rising from a long coiled serpent tail. Materials: teal serpent scales, fin crests, shell and coral armour, harpoons and spears. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 탈라쿠스 해구에서 우르보아의 비늘을 꿰뚫었다는 작살을 든 나가. 작살은 던지면 물살을 타고 돌아온다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G3-E · 우르보아 비늘 기사
마렌시아의 노래 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-G3-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G3-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "우르보아 비늘 기사". Depict exactly what this name describes.
Subject: an elite, commanding Naga of the Marencia's Song — naga of Marencia's waters: a scaled human upper body joined to a long serpent tail, with fin crests along the head and armour of shell and coral.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Naga: naga of Marencia's waters: a scaled human upper body joined to a long serpent tail, with fin crests along the head and armour of shell and coral. Silhouette: upright torso rising from a long coiled serpent tail. Materials: teal serpent scales, fin crests, shell and coral armour, harpoons and spears. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 심해의 거대 뱀 우르보아가 벗은 비늘로 갑옷을 지었다. 어떤 창도 그 비늘을 얇게 만들지 못했다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-G3-3 · 마렌시아의 대무녀
마렌시아의 노래 · 유닛 · 레벨 7 · 에픽 — 받은 그림은 `tools/art/inbox/EP-G3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-G3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마렌시아의 대무녀". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring member of the Marencia's Song — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 용 마렌시아와 맹약을 다시 맺는 의식을 이끄는 무녀. 그녀를 친 칼은 물을 벤 듯 손이 젖는다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; weather (storm, ash, spray, wind) and deep atmosphere; clear water light, spray, ripples, bubbles.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 5장

### EP-A1-1 · 심연 칼날 무희 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "심연 칼날 무희". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 녹타르의 그림자 극장에서 춤을 추는 마족. 춤이 끝나면 관객 하나가 줄어 있다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PI-A1 · 모르카스의 저울추 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/PI-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PI-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르카스의 저울추". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Morkas's New Moon (holy relic; if unsure, a wax seal, signet or sealed contract). a relic of a transcendent being floating in its own aura above a ruined altar, radiating its element.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 침묵의 군주의 저울에서 떼어 낸 추. 쥔 자의 칼은 무거워지고, 저울이 첫 칼날의 무게를 덜어 준다. 그러나 쥔 동안 제 상처는 아물지 않는다. 대가의 법칙이다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-A1-1 · 침묵의 저울 — 그림 있음
모르카스의 그믐 · 공용 마법 · 레벨 3 · 에픽 — 받은 그림은 `tools/art/inbox/US-A1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "침묵의 저울". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an annihilating blow that erases a foe; paid for with the caster's own blood. Scale and finish: a cataclysmic spell at full force — vortex, shockwave or impact crater — with the battlefield reacting.
Scale (level 3 of 8): an effect over a few targets.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 침묵의 군주 모르카스의 저울. 한쪽에 피를 올리면 다른 쪽에서 목숨 둘이 내려간다.
Game effect (Korean, mood only — never draw text or numbers): [제물 4] 상대 유닛 중 공격이 가장 높은 2기를 파괴한다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### EP-A1-2 · 녹타르 처형대장 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 5 · 에픽 — 받은 그림은 `tools/art/inbox/EP-A1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/EP-A1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "녹타르 처형대장". Depict exactly what this name describes.
Subject: an elite, commanding member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 계약을 어긴 자를 거두러 가는 처형인들의 우두머리. 한 번 휘두르면 줄 선 자들이 차례로 쓰러진다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A1-E · 심연 장막의 거래인 — 그림 있음
모르카스의 그믐 · 유닛 · 레벨 6 · 에픽 — 받은 그림은 `tools/art/inbox/PN-A1-E.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A1-E.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: EPIC — heroic and larger than life, cinematic. A heroic, larger-than-life figure, monster or relic whose power bends the whole scene around it.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "심연 장막의 거래인". Depict exactly what this name describes.
Subject: an elite, commanding member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심연의 장막에서 무언가를 두고 나온 마족. 무엇을 두고 왔는지는 그도 기억하지 못한다. 상처가 아물지 않는 것은 그 때문이다.
Camera: cinematic low wide angle, heroic pose at the peak of action, scale cues (tiny figures, broken walls, huge debris), subject about 70% of the frame with environment.
Lighting: high-contrast cinematic lighting, volumetric god rays in the element colour, glowing eyes or weapon, soft bloom; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; rich environmental storytelling: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; weather (storm, ash, spray, wind) and deep atmosphere; violet shadow smoke, blood-red accents, contract sigils.
Detail: ornate, layered armour or garments, battle wear, magical energy wrapping the body.
Spectacle: cinematic: volumetric god rays, an energy aura wrapping the body, weather, flying debris and soft bloom — a step above rare. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: violet (#b46cff) arcane particles and a faint violet edge to the aura — the element colour stays the main light; the grade accent is a secondary touch (about 15% of the light).
Mood: awe, momentum, overwhelming force.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

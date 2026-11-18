# 스페셜 (Special) — 카드 일러스트 프롬프트 (18장, 버전 g3)

> 최고 등급. 깃발마다 하나뿐인 신화적 존재(승천자 · 깨어난 기계 · 걸어 다니는 숲 · 용의 노래 …)와 삼좌의 유물. 깃발에서 가장 중요한 그림, 키 아트 급. 깃발의 평범한 구성원(고블린 · 오크 · 마족 …)으로 그리지 않는다 — 제 힘으로 이루어진 몸(불 · 쇠 · 바위 · 물 · 그림자 · 빛 · 별빛)을 가진 하나뿐인 존재. 요새 · 군대 · 용과 견줄 만큼 크고, 같은 깃발의 에픽 · 유니크보다 확실히 강하고 웅장해 보여야 한다. 세계 크기의 배경(하늘을 채운 근원 존재), 금빛 룬 고리 여러 겹, 하늘을 가르는 빛기둥, 진홍 · 금의 신성한 빛. 몸 전체를 다 보여 주지 않고 연기 · 빛 · 어둠에 반쯤 가려 배경과 주변의 반응으로 크기를 상상하게 해도 된다.

## 이 등급의 연출 틀

```
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity.
Background: world-scale: {mythic}; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject.
Presence technique (allowed, units): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다. 그대로 붙여 넣으면 된다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 6장

### SR-B1 · 도르마크의 갈비뼈 화로
도르마크의 심장불 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도르마크의 갈비뼈 화로". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Dormak's Heartfire. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: A furnace carved from one colossal rib bone of the sleeping giant Dormak: the curved ivory-black rib forms the body of a brazier, glowing heartfire roaring inside, flames leaping hungrily toward a burning ember on the ground, volcanic ash drifting.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Dormak's Heartfire (fire): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: fire orange #ff6b3d with brass #d4893a and soot black. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화관 산맥 밑에 누운 거인 도르마크의 갈비뼈 하나를 깎아 만든 화로. 안에서 식지 않는 심장불이 타고, 이미 불이 붙은 것을 보면 더 크게 일어난다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; world-scale: the giant Dormak's mountain-sized chest with its heart-fire blazing through cracks of rock across the whole sky; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; embers, flame light, gunpowder smoke.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-B2 · 소르그림의 첫 갑주
소르그림의 방패 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "소르그림의 첫 갑주". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Sorgrim's Shield. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The first armour of the sleeping giant Sorgrim: a huge breastplate made from a single giant rib segment fused with dark iron ore, a sword striking it bounces back with a shockwave of sparks thrown toward the attacker, iron ridge mountains behind.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Sorgrim's Shield (metal): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 잠든 거인 소르그림의 갈비 마디를 그대로 떼어 낸 갑주. 내리친 칼은 막히는 순간 그 무게 그대로 친 자에게 돌아간다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; world-scale: the giant Sorgrim's mountain-sized arm of iron sinew rising from the earth, and the metal dragon Feros's mirror scales reflecting a thousand forges; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; cold steel sheen, sparks from an anvil, rivets.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-B3 · 케라운의 벼락 심장
케라운의 벼락 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운의 벼락 심장". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Keraun's Thunder. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: A crackling heart fragment of the thunder giant Keraun, held in a brass-and-glass cage: the crystal heart pulses with branching blue lightning that races up the bearer's arm each time a spell circle flares nearby.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Keraun's Thunder (lightning): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 번개를 맞고도 멈추지 않은 거인 케라운의 심장 조각. 마법이 일 때마다 심장이 한 번씩 더 크게 뛰어 쥔 자의 팔에 벼락이 실린다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; world-scale: the giant Keraun's lightning nerves blazing across the whole plateau and sky like a living circuit board of storms; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; crackling electric arcs, glowing coils.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-G1 · 고르바스의 부러진 송곳니
고르바스의 발톱 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고르바스의 부러진 송곳니". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The broken fang of the earth dragon Gorvath: a massive cracked stone-and-bone fang strapped to a fist with hide cords, still stained, glowing amber veins pulsing as if it hungers, a fallen beast silhouette in the background.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Gorvath's Claw (earth): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: earth ochre #b88a5a, rust-red war paint, bone white. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 대지의 용 고르바스가 첫 사냥에서 부러뜨린 송곳니. 지닌 자는 쓰러뜨린 것을 삼킬 때마다 용처럼 커진다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; world-scale: the earth dragon Gorbas, mountain-sized with forests on its back, rising behind Throne Peak with one great eye opening; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; flying rock dust, cracked ground, ochre light.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-G2 · 베르단의 첫 뿔
베르단의 뿔 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 첫 뿔". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The first antler of the forest dragon Verdan: a great branching antler of living wood, roots snaking from its base and drinking a faint green glow out of a thorned attacker toward the bearer, moss and leaves sprouting along its tines.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Verdan's Antler (forest): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 용 베르단이 처음 갈아 낸 뿔. 뿔에서 뻗은 뿌리가 덤벼든 자의 숨을 빨아 주인의 상처를 메운다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; world-scale: the forest dragon Verdan's antlers spreading as a canopy of ancient branches over the whole forest, the First Elder Tree glowing beneath; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; glowing moss, thorny vines, drifting leaves.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-G3 · 마렌시아의 눈물 성배
마렌시아의 노래 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마렌시아의 눈물 성배". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Marencia's Song. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The chalice of the sea dragon Marencia's tears: a pearl-and-coral chalice overflowing with luminous blue water, a gentle tide spilling from its rim and flowing first toward a wounded figure, mist and soft light rising.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Marencia's Song (water): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 용 마렌시아가 맹약의 날 흘린 눈물을 받은 성배. 싸움이 시작되면 밀물이 가장 깊이 베인 자에게 먼저 닿는다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; world-scale: the water dragon Marencia's translucent serpentine body coiling through the sky like a river of light; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; clear water light, spray, ripples, bubbles.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

## 2. 맨 나중에 — 이미 그린 그림 다시 그리기 (Gemini 할당량이 남을 때만) · 9장

> 이미 그림이 있어 게임은 그대로 돌아간다. 1번(그림 없는 카드)을 다 그린 뒤, 할당량이 남을 때 그린다. "꼭"을 먼저, "선택"은 그 뒤.

### SP-A1 · 그림자 없는 아즈라 — **다시 그리기 (꼭 · 맨 나중)**: v3.59 다시 — 에픽 무희와 다르게: 녹타르 위에 선 거대한 아즈라, 모든 그림자가 그녀에게 기움
모르카스의 그믐 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 없는 아즈라". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Morkas's New Moon (see art direction).
Art direction: Azra the Shadowless at the height of her ascension — a colossal, regal figure standing above the sunless canyon city of Noctar, so tall that its violet-lit spires reach only to her knees. Her great curved horns form a dark crown framed by a total eclipse that serves as her halo; a vast cloak of living night spills from her shoulders down the canyon walls like a waterfall of shadow. Every shadow in the city — of towers, bridges and kneeling figures — stretches and bends toward her like supplicants, yet she herself casts none: the ground beneath her feet is bright and bare, make the missing shadow unmistakable. Her face is serene and half-veiled by drifting shadow-silk, eyes glowing violet. A burning contract scroll floats beside her open hand, its blood seal glowing. Above her in the sky the faceless shadow king Morkas holds his scales, one pan weighed down by something veiled — what she gave. Calm, still, overwhelming power — not an action pose.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Morkas's New Moon (darkness): draw this being from the banner's name and its element. Palette: violet #8b5cf6, black, blood-red accents. Accents to borrow from: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian; blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 침묵의 군주 모르카스와 마주 앉아 값을 치르고도 빚을 지지 않은 유일한 존재. 무엇을 저울에 올렸는지는 아무도 모른다. 그날부터 해가 떠도 그 발밑에는 그림자가 없고, 녹타르의 모든 그림자가 그녀 쪽으로 기운다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; world-scale: the faceless shadow king Morkas towering across the sky with his balanced scales, eyes closed; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; violet shadow smoke, blood-red accents, contract sigils.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-B1 · 불을 삼킨 자 — **다시 그리기 (꼭 · 맨 나중)**: v3.59 다시 — 고블린이 아니라 불이 된 거대한 존재로 (art_notes g3)
도르마크의 심장불 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불을 삼킨 자". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Dormak's Heartfire (see art direction).
Art direction: A colossal being of living fire who swallowed the sleeping giant Dormak's heart-fire whole — one of a kind: a towering, majestic titan of cracked black basalt and flowing magma, taller than Fortan's chimneys and gun bastions, which look like toys at his feet. In his open chest Dormak's heart-fire blazes like a furnace sun behind ribs of cooling rock, and molten light pours from his eyes and mouth. One arm is raised and a cannon-blast of fire erupts from his palm — each breath he exhales is a whole battery's volley — while pillars of smoke and ash rise around his head like a crown. Tiny gunners kneel on the bastion walls below, lit by his glow, not daring to speak his name. Behind him the volcano-chest of the giant Dormak splits open across the whole sky. Terrible grandeur, not a monster.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Dormak's Heartfire (fire): draw this being from the banner's name and its element. Palette: fire orange #ff6b3d with brass #d4893a and soot black. Accents to borrow from: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages; cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 잠든 거인 도르마크의 심장불을 통째로 삼킨 존재. 그가 내쉬는 숨 한 번이 포대 하나의 일제 사격이고, 화관 산맥은 그가 숨 쉴 때만 타오른다. 포르탄의 포수들은 그의 이름을 부르지 않는다 — 대답할까 봐.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; world-scale: the giant Dormak's mountain-sized chest with its heart-fire blazing through cracks of rock across the whole sky; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; embers, flame light, gunpowder smoke.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-B2 · 철의 심장을 삼킨 자 — **다시 그리기 (꼭 · 맨 나중)**: v3.59 다시 — 이름 바뀜(철의 심장을 삼킨 자), 커다란 심장 + 반쯤 가려진 거대한 존재
소르그림의 방패 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철의 심장을 삼킨 자". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Sorgrim's Shield (see art direction).
Art direction: The heart is the focus: an enormous iron heart forged from the giant Sorgrim's sinew-ore — dark adamant plates, brass valves and pistons like arteries, molten forge-light pulsing through its seams — beating at the centre of the image, larger than a forge furnace. The one who swallowed it is a colossal armoured presence that is only partly seen: his vast shape is veiled in steam, shadow and forge smoke and revealed only in glimpses — the edge of a riveted iron shoulder like a cliff, a giant gauntleted hand resting on an anvil the size of a house, two eyes glowing high above in the darkness. Hundreds of chains and pipes run from the heart up into the hidden body; let the viewer imagine the full titan from these clues. Around it stretches the underground forge-cathedral of Durkheim; rows of golems, tiny by comparison, kneel facing the heart, their own chest-lights waking in rhythm with its beat, the oldest and most patched golem kneeling closest. He ascended without any god: instead of a halo, slowly turning rings of gears and golden runes circle the heart.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Sorgrim's Shield (metal): draw this being from the banner's name and its element. Palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams. Accents to borrow from: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams; forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 거인 소르그림의 힘줄을 녹여 벼린 철의 심장을 제 가슴에 삼킨 존재. 그 심장이 처음 뛴 날, 두르크하임의 모든 골렘이 함께 눈을 떴다. 그의 이름이 브론이었다는 것을 기억하는 것은 이제 그가 처음 빚은 골렘뿐이다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; world-scale: the giant Sorgrim's mountain-sized arm of iron sinew rising from the earth, and the metal dragon Feros's mirror scales reflecting a thousand forges; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; cold steel sheen, sparks from an anvil, rivets.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-G1 · 잿갈기 카르노 — **다시 그리기 (꼭 · 맨 나중)**: v3.59 다시 — 오크가 아니라 바위와 잿불의 거대한 투사로
고르바스의 발톱 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "잿갈기 카르노". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Gorvath's Claw (see art direction).
Art direction: Karno Ashmane: a colossal duel-titan of living stone and ash, one of a kind. A towering warrior body of cracked dark granite and basalt with glowing ochre-orange magma seams, every one of his hundred duel scars a molten crack; a vast mane of grey ash and drifting embers streams from his head and shoulders like a volcanic plume (the 'ash mane'); fists like boulders bound in ancient leather straps; his face is a stern, noble mask of stone with burning eyes. He stands in a stone duel ring cracked into a crater, mid-stride and roaring a challenge, rock dust and embers exploding around his feet. Behind him the mountain-sized earth dragon Gorbas, forests on its back, lowers its great head to meet him eye to eye, as if for a hundred-and-first duel, while the standing stones and nomad camps of the Garun steppe lie tiny below and a trail of ash-grey smoke drifts across the plain behind him.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Gorvath's Claw (earth): draw this being from the banner's name and its element. Palette: earth ochre #b88a5a, rust-red war paint, bone white. Accents to borrow from: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems; giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 백 번의 결투 끝에 대지의 용 고르바스에게 인정받은 존재. 백한 번째 상대가 바로 그 용이었다는 말이 있다. 지금도 강한 자를 찾아 결투를 청하고, 그가 지나간 초원에는 잿빛 갈기 같은 연기가 오래 남는다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; world-scale: the earth dragon Gorbas, mountain-sized with forests on its back, rising behind Throne Peak with one great eye opening; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; flying rock dust, cracked ground, ochre light.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-A2 · 솔란테의 첫 기사 — **다시 그리기 (선택 · 맨 나중)**: v3.59 서사 손질로 프롬프트(그림 지시 · 서사) 바뀜, 지금 그림도 쓸 만함
솔란테의 새벽 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 첫 기사". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Solante's Dawn (see art direction).
Art direction: The First Knight of Solante, the first ever to swear an oath to the Mother of Dawn — a mythic champion: lifted by the goddess herself, vast wings of light bursting from his back, rising from one knee with his sword raised toward the dawn; where his blade is raised the night recoils and sunrise floods the sky. He is colossal: he kneels on the hills beyond the Dawn Citadel Elad, whose white walls and towers reach only to his knee, and the armies on its walls are tiny specks of light; each of his wings spans the whole horizon, and his face is lit high above the clouds.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Solante's Dawn (holy light): draw this being from the banner's name and its element. Palette: holy light #ffe9a8, white, pale gold, soft sky blue. Accents to borrow from: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems; halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽의 어머니 솔란테에게 처음으로 맹세한 존재. 솔란테는 그 맹세를 듣고 그를 직접 들어 올렸고, 성광 기사단의 모든 맹세는 지금도 그의 말을 따라 읊는다. 그가 검을 든 자리에는 밤이 오지 못한다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; world-scale: the goddess Solante's six vast wings of light spread across the whole sky above a rising sun; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; pale gold radiance, halo, feathers of light.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-A3 · 별을 푼 이사크 — **다시 그리기 (선택 · 맨 나중)**: v3.59 서사 손질로 프롬프트(그림 지시 · 서사) 바뀜, 지금 그림도 쓸 만함
벨루미르의 별 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별을 푼 이사크". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Belumir's Star (see art direction).
Art direction: Isaac who unravelled the stars, the first to read the star glyphs — a transcendent star-mage: he pulls threads of starlight down from the sky into an open book while a whole constellation unravels and re-weaves itself around him as abstract glyphs, and the sky obeys; silver hair and robes swept by star-wind. He is colossal: he stands among the clouds above Belumir's Needle, its tallest spires reaching only to his waist and tiny watchers on its lookout platforms looking up; the constellation he unravels covers the whole sky, and its threads of starlight fall into his book like rivers.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Belumir's Star (wind): draw this being from the banner's name and its element. Palette: wind teal #9fe3d6, silver, white, starry indigo. Accents to borrow from: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour; arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 별의 문자를 처음 읽어 낸 존재. 다 읽은 밤, 그는 별자리 하나를 풀어 다시 엮었고 하늘은 그대로 따랐다. 폭풍탑 마도회는 그가 남긴 첫 장을 아직 다 읽지 못했다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; world-scale: the god Belumir's robe of a thousand eyes unfolding across the night sky as constellations; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; swirling teal wind, fluttering robes and pages.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-B3 · 일곱 번째 — **다시 그리기 (선택 · 맨 나중)**: v3.59 서사 손질로 프롬프트(그림 지시 · 서사) 바뀜, 지금 그림도 쓸 만함
케라운의 벼락 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "일곱 번째". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Keraun's Thunder (see art direction).
Art direction: The Seventh: an automaton prototype that one day began to think. An elegant copper-and-glass body with seven glowing lightning nodes (no numerals), a lightning brain visible inside a glass dome head, one hand raised in wonder at a spark it made itself. Tiny scholars look up at it from its feet.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Keraun's Thunder (lightning): draw this being from the banner's name and its element. Palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass. Accents to borrow from: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps; lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움은 거인 케라운의 신경에 기계 여섯을 이었고, 여섯은 모두 타 버렸다. 일곱 번째는 눈을 떴다. 그 안에서 생각하는 것이 볼타리움의 설계인지 잠든 거인의 꿈인지 — 만든 자들조차 이제는 그를 올려다보며 답을 기다린다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; world-scale: the giant Keraun's lightning nerves blazing across the whole plateau and sky like a living circuit board of storms; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; crackling electric arcs, glowing coils.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-G2 · 은월 리시엘 — **다시 그리기 (선택 · 맨 나중)**: v3.59 서사 손질로 프롬프트(그림 지시 · 서사) 바뀜, 지금 그림도 쓸 만함
베르단의 뿔 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "은월 리시엘". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Verdan's Antler (see art direction).
Art direction: Lisiel Silvermoon, a walking forest that moves only on nights of the waxing moon — one of a kind: a tall being half figure and half tree, bark skin threaded with silver moonlit veins, branches for hair, ember-scarred bark with young green leaves regrowing from every scar, saplings sprouting wherever it steps. It once took a burning forest's fire into its own body and raised a thousand-year forest from the ashes in a single night. Silver moonlight mixed with green spore-light; the forest dragon Verdan's branch-antlers form a canopy above.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Verdan's Antler (forest): draw this being from the banner's name and its element. Palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores. Accents to borrow from: bark armour, moss, thorns, vines, roots, mushrooms, amber sap; thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 달이 차오르는 밤에만 걸어 다니는 숲. 불타던 에일렌 대삼림의 불길을 온몸으로 받아 내고, 그 재 위에 하룻밤 만에 천 년 숲을 다시 세웠다. 정령인지 승천자인지 학자들도 갈린다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; world-scale: the forest dragon Verdan's antlers spreading as a canopy of ancient branches over the whole forest, the First Elder Tree glowing beneath; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; glowing moss, thorny vines, drifting leaves.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SP-G3 · 바다를 잠재우는 자 — **다시 그리기 (선택 · 맨 나중)**: v3.59 서사 손질로 프롬프트(그림 지시 · 서사) 바뀜, 지금 그림도 쓸 만함
마렌시아의 노래 · 유닛 · 레벨 8 · 스페셜 — 받은 그림은 `tools/art/inbox/SP-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SP-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바다를 잠재우는 자". Depict exactly what this name describes.
Subject: a one-of-a-kind mythic being of the Marencia's Song (see art direction).
Art direction: She Who Lulls the Sea: the oldest song remembered by the water dragon Marencia, given a body — one of a kind. A serene woman-shaped being whose body from the waist down and through her flowing hair is living, translucent water; her hands are joined as she sings, and her song spreads over the dark sea as glowing rings of light; a blade passing through her becomes only ripples. Far below, in the black trench, the faint glow of the sleeping giant Talakus's colossal heart slows to the rhythm of her song. Behind her the translucent serpentine body of Marencia coils through the sky like a river of light, forming a halo. Calm, sacred and vast.
Scale (level 8 of 8): mythic and colossal, far beyond mortal scale: it towers over fortresses, armies or even dragons, the land cracks and bends around it and lesser creatures look tiny; its presence fills the sky.
Banner — Marencia's Song (water): draw this being from the banner's name and its element. Palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy. Accents to borrow from: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons; water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 용 마렌시아가 기억하는 가장 오래된 노래가 몸을 얻은 것. 그 노래가 바다 밑에 잠든 거인 탈라쿠스를 재운다. 칼이 물을 벨 수 없듯 그녀도 벨 수 없다. 요즘 그 노래가 점점 길어지고 있다.
Camera: monumental worm's-eye angle, epic scale — the subject towers and fills about 75–85% of the frame against a world-sized backdrop, with scale cues (fortresses, armies, dragons or mountains look small beside it); light may spill to the margins but the face or heart and the core stay in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; world-scale: the water dragon Marencia's translucent serpentine body coiling through the sky like a river of light; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; clear water light, spray, ripples, bubbles.
Detail: transcendent: a body made of its own power (fire, iron, stone, water, shadow, light or starlight); intricate gold filigree, cathedral-level detail.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Presence technique (allowed): the being may be partly veiled — half-hidden in smoke, light, storm or darkness, revealed by glimpses (an eye, a hand, a silhouette, a heart of light), so the viewer imagines the full colossal shape from those clues and from how the world reacts around it.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

## 3. 그림 있음 — 그리지 않는다 (참고용) · 3장

### SR-A1 · 하르간의 양손검 — 그림 있음
모르카스의 그믐 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "하르간의 양손검". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Morkas's New Moon. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The greatsword of Hargan the Judge, drawn only once to punish a god: a colossal two-handed sword of dark adamant and gold, scales of judgment engraved on the blade, standing point-down in a cracked divine altar under a beam of judgment light.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Morkas's New Moon (darkness): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: violet #8b5cf6, black, blood-red accents. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심판자 하르간의 검. 단 한 번, 신을 벌할 때 뽑혔다고 한다. 판결 앞에서 갑옷은 의미가 없다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; world-scale: the faceless shadow king Morkas towering across the sky with his balanced scales, eyes closed; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; violet shadow smoke, blood-red accents, contract sigils.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-A2 · 세렌의 활 — 그림 있음
솔란테의 새벽 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "세렌의 활". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Solante's Dawn. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The bow of Seren the Gatekeeper, who guards the edge of the world: a tall bow of pale silver and starlight, a nocked arrow of light drawn by no hand, aimed at a dark horizon where the world ends.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Solante's Dawn (holy light): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: holy light #ffe9a8, white, pale gold, soft sky blue. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 문지기 세렌이 세계의 경계 너머를 겨누던 활. 넘어오려는 것은 닿기 전에 쓰러진다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; world-scale: the goddess Solante's six vast wings of light spread across the whole sky above a rising sun; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; pale gold radiance, halo, feathers of light.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SR-A3 · 이벨의 깃펜 — 그림 있음
벨루미르의 별 · 아이템 · 레벨 4 · 스페셜 — 받은 그림은 `tools/art/inbox/SR-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SR-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SPECIAL — the highest grade: mythic, a one-of-a-kind being of the world or a relic of the Three Thrones, key-art quality. Mythic: a one-of-a-kind being, one of the great powers of the world, or a relic of the Three Thrones — the single most important image of its banner; it must look clearly stronger and grander than any epic or unique card of the same banner.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "이벨의 깃펜". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Belumir's Star. a sacred relic suspended in a pillar of divine light inside a ring of golden runes, an empty circle behind it, the world tiny below.
Art direction: The quill of Ivel the Recorder: a great feather quill whose ink is ether light, writing glowing abstract strokes in the air that turn into tiny real scenes; an endless library fades behind it.
Scale (special relic, level 4): a relic small enough to hold or wear, taken from a sleeping giant or a dragon — modest in size but ancient and immensely powerful: its aura reaches the sky and the world reacts to it, clearly beyond any rare or epic item.
Banner that forged or kept it — Belumir's Star (wind): draw the relic from the banner's name and its element; no full figures — at most a hand or arm holding it, or tiny distant silhouettes for scale. Palette: wind teal #9fe3d6, silver, white, starry indigo. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 기록자 이벨의 깃펜. 이 펜으로 적힌 일은 일어난 일이 된다.
Camera: low heroic angle on the relic, which fills about 55–65% of the frame at its true size, while the world-scale backdrop behind it (the giant or dragon it came from, mountains, the open sky) shows how much it matters; the relic's glowing core stays in the safe area.
Lighting: divine and overwhelming: a radiant crimson-and-gold aura, light bursting from the subject itself, rays falling from above, the element light at full intensity; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; world-scale: the god Belumir's robe of a thousand eyes unfolding across the night sky as constellations; the land and sky visibly bending and reacting to the subject; the night sky opening with stars and golden rune circles; a faint empty circle (the sigil of the lost source-god Arche) as a halo ring; swirling teal wind, fluttering robes and pages.
Detail: transcendent craftsmanship: the relic's own material (giant bone, adamant, storm crystal, dragon fang, living wood, pearl) rendered at cathedral-level detail, intricate gold filigree and wear that tells its age; the object itself has no face or body.
Spectacle: the most spectacular grade, clearly beyond unique: several orbiting golden rune rings at different angles, a pillar of light splitting the sky, a radiant crimson-and-gold aura, storms of embers and ether sparks, the ground and sky reacting to its presence, layered depth in front of and behind the subject. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: crimson-rose (#ff4d73) and gold divine light that may rival the element light, slowly turning golden rune circles, ether sky-blue (#8fdcff) sparks — the element colour stays the main light; the grade accent is a secondary touch (about 30% of the light).
Mood: sacred, transcendent, world-shaking.
The golden rune rings and divine light are this grade's mythic mark, not banner spellcasting.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

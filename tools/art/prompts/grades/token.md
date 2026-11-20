# 소환물 (Summoned token) — 카드 일러스트 프롬프트 (17장, 버전 g3)

> 마법이나 능력으로 잠깐 불려 나온 것. 작고 덧없지만 그림은 공들여 — 불려 나온 흔적(흩어지는 에테르 · 원소 빛)이 아름답게 보이게.

## 이 등급의 연출 틀 (설명용 — 그림 AI에 넣지 않는다)

```
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. a creature, construct or effect called into being for a moment; simple and readable.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast.
Background: plain dark night-blue with a fading wisp of ether and element light where it was called forth.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces (about 10% of the light).
Mood: fleeting, conjured.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다(스페셜은 v3.95부터 이 틀을 짧게 묶어 넣음). **그림 AI에는 카드 프롬프트(``` 안) 하나만 붙여 넣는다** — 위 틀을 함께 넣으면 같은 말이 두 번 들어가 그림끼리 닮는다. 카드마다 새 대화에서 그린다.

**그리는 차례**: 1 그림 없는 카드 먼저(**유니크 → 에픽 → 레어 → 강화 → 고급 → 일반 → 소환물** 순) → 2 다시 그리기 → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 17장

### TK-A1-1 · 계약 악마
모르카스의 그믐 · 유닛 · 레벨 4 · 소환물 — 받은 그림은 `tools/art/inbox/TK-A1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-A1-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "계약 악마". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Morkas's New Moon: the summoned creature itself, just materialised.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Morkas's New Moon; signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 생명을 받고 나타난 하급 악마.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Colour fidelity: the whole image reads at a glance as the banner colour #8b5cf6 (violet #8b5cf6, black, blood-red accents); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; violet shadow smoke, blood-red accents, contract sigils.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-A2-1 · 빛의 기사
솔란테의 새벽 · 유닛 · 레벨 4 · 소환물 — 받은 그림은 `tools/art/inbox/TK-A2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-A2-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "빛의 기사". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Solante's Dawn: the summoned creature itself, just materialised.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Solante's Dawn; signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 맹세 하나가 빛으로 빚어진 기사. 맹세가 꺾이지 않으니 그 검도 꺾이지 않는다.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Colour fidelity: the whole image reads at a glance as the banner colour #ffe9a8 (holy light #ffe9a8, white, pale gold, soft sky blue); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; pale gold radiance, halo, feathers of light.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TS-A3-1 · 별똥별 조각
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TS-A3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TS-A3-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A small conjured magical effect, simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별똥별 조각". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the spell's force (bolt, blast, blade of light, storm) travels across the frame and strikes the enemy side, shown as small dark silhouettes or their weapons and armour; any caster is out of frame or only a hand at the edge. The moment it takes effect: chained wind strikes leaping from target to target. Scale and finish: a small, single conjured effect.
Spell, not unit: this is a spell card, so the magic itself is the hero of the image — the visible force, phenomenon or symbol of the spell (a blast, a ward of light, a curse mark, a vortex, a rune circle, a rain of arrows, a reversed current) fills the centre and reads in one glance. People and creatures are absent or minimal: at most small dark silhouettes in the distance, a hand or arm at the edge of the frame, or empty armour, weapons and banners standing in for the targets. Show the effect on its targets through objects and light rather than through characters' faces and bodies. If the art direction or lore names a caster or warriors, keep them small, off-centre, half in shadow and seen from behind.
Scale (level 1 of 8): a small, local effect.
Banner — summoned by the Belumir's Star; signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 무작위 유닛 1기에게 피해 1.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Colour fidelity: the whole image reads at a glance as the banner colour #9fe3d6 (wind teal #9fe3d6, silver, white, starry indigo); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; swirling teal wind, drifting feathers and starlight streaks.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: landscape 5:4; the spell effect is the one main subject, centred with breathing room around it and readable as a single clear magical shape; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TS-A3-2 · 돌개바람
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TS-A3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TS-A3-2.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A small conjured magical effect, simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "돌개바람". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the spell's force (bolt, blast, blade of light, storm) travels across the frame and strikes the enemy side, shown as small dark silhouettes or their weapons and armour; any caster is out of frame or only a hand at the edge. The moment it takes effect: chained wind strikes leaping from target to target. Scale and finish: a small, single conjured effect.
Spell, not unit: this is a spell card, so the magic itself is the hero of the image — the visible force, phenomenon or symbol of the spell (a blast, a ward of light, a curse mark, a vortex, a rune circle, a rain of arrows, a reversed current) fills the centre and reads in one glance. People and creatures are absent or minimal: at most small dark silhouettes in the distance, a hand or arm at the edge of the frame, or empty armour, weapons and banners standing in for the targets. Show the effect on its targets through objects and light rather than through characters' faces and bodies. If the art direction or lore names a caster or warriors, keep them small, off-centre, half in shadow and seen from behind.
Scale (level 1 of 8): a small, local effect.
Banner — summoned by the Belumir's Star; signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 무작위 유닛 1기에게 피해 2.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Colour fidelity: the whole image reads at a glance as the banner colour #9fe3d6 (wind teal #9fe3d6, silver, white, starry indigo); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; swirling teal wind, drifting feathers and starlight streaks.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: landscape 5:4; the spell effect is the one main subject, centred with breathing room around it and readable as a single clear magical shape; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TS-A3-3 · 불씨
벨루미르의 별 · 공격 마법 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TS-A3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TS-A3-3.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A small conjured magical effect, simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불씨". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the spell's force (bolt, blast, blade of light, storm) travels across the frame and strikes the enemy side, shown as small dark silhouettes or their weapons and armour; any caster is out of frame or only a hand at the edge. The moment it takes effect: a destructive wind bolt or blast tearing across the field into the distant enemy line. Scale and finish: a small, single conjured effect.
Spell, not unit: this is a spell card, so the magic itself is the hero of the image — the visible force, phenomenon or symbol of the spell (a blast, a ward of light, a curse mark, a vortex, a rune circle, a rain of arrows, a reversed current) fills the centre and reads in one glance. People and creatures are absent or minimal: at most small dark silhouettes in the distance, a hand or arm at the edge of the frame, or empty armour, weapons and banners standing in for the targets. Show the effect on its targets through objects and light rather than through characters' faces and bodies. If the art direction or lore names a caster or warriors, keep them small, off-centre, half in shadow and seen from behind.
Scale (level 1 of 8): a small, local effect.
Banner — summoned by the Belumir's Star; signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛에게 피해 1.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Colour fidelity: the whole image reads at a glance as the banner colour #9fe3d6 (wind teal #9fe3d6, silver, white, starry indigo); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; swirling teal wind, drifting feathers and starlight streaks.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: landscape 5:4; the spell effect is the one main subject, centred with breathing room around it and readable as a single clear magical shape; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TS-A3-4 · 쌍둥이 메아리
벨루미르의 별 · 공용 마법 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TS-A3-4.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TS-A3-4.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A small conjured magical effect, simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "쌍둥이 메아리". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with the spell's power visibly flowing in two directions. The moment it takes effect: a destructive wind bolt or blast tearing across the field into the distant enemy line. Scale and finish: a small, single conjured effect.
Spell, not unit: this is a spell card, so the magic itself is the hero of the image — the visible force, phenomenon or symbol of the spell (a blast, a ward of light, a curse mark, a vortex, a rune circle, a rain of arrows, a reversed current) fills the centre and reads in one glance. People and creatures are absent or minimal: at most small dark silhouettes in the distance, a hand or arm at the edge of the frame, or empty armour, weapons and banners standing in for the targets. Show the effect on its targets through objects and light rather than through characters' faces and bodies. If the art direction or lore names a caster or warriors, keep them small, off-centre, half in shadow and seen from behind.
Scale (level 1 of 8): a small, local effect.
Banner — summoned by the Belumir's Star; signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 2기에게 피해 1.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Colour fidelity: the whole image reads at a glance as the banner colour #9fe3d6 (wind teal #9fe3d6, silver, white, starry indigo); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; swirling teal wind, drifting feathers and starlight streaks.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: landscape 5:4; the spell effect is the one main subject, centred with breathing room around it and readable as a single clear magical shape; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-BOMB · 불붙은 화약통
도르마크의 심장불 · 유닛 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-BOMB.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-BOMB.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불붙은 화약통". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Dormak's Heartfire: the summoned creature itself, just materialised.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Dormak's Heartfire; signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도화선이 타들어 간다. 다음 전투의 첫 마법들이 지나가면 터진다.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Colour fidelity: the whole image reads at a glance as the banner colour #ff6b3d (fire orange #ff6b3d with brass #d4893a and soot black); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; embers, flame light, gunpowder smoke.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-B2-1 · 파수 골렘
소르그림의 방패 · 유닛 · 레벨 3 · 소환물 — 받은 그림은 `tools/art/inbox/TK-B2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-B2-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "파수 골렘". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Sorgrim's Shield: the summoned creature itself, just materialised.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Sorgrim's Shield; signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 공방이 비상시에 기동하는 작은 파수 골렘.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Colour fidelity: the whole image reads at a glance as the banner colour #a9b4c2 (steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; cold steel sheen, sparks from an anvil, rivets.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-SCRAP · 고철 골렘
소르그림의 방패 · 유닛 · 레벨 3 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-SCRAP.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-SCRAP.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고철 골렘". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Sorgrim's Shield: the summoned creature itself, just materialised.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Sorgrim's Shield; signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 쓰러진 동료의 부품으로 지은 골렘.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Colour fidelity: the whole image reads at a glance as the banner colour #a9b4c2 (steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; cold steel sheen, sparks from an anvil, rivets.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-G1-1 · 그림자 하이에나
고르바스의 발톱 · 유닛 · 레벨 2 · 소환물 — 받은 그림은 `tools/art/inbox/TK-G1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-G1-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 하이에나". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Gorvath's Claw: the summoned creature itself, just materialised.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Gorvath's Claw; signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 그림자에서 뛰쳐나와 한 번 물고, 웃음소리만 남기고 사라지는 하이에나.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Colour fidelity: the whole image reads at a glance as the banner colour #b88a5a (earth ochre #b88a5a, rust-red war paint, bone white) — dusty, matte ochre and sandstone brown like sunlit clay and weathered bone, a dry earthy glow clearly distinct from flame orange or bright gold; every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; flying rock dust, cracked ground, ochre light.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-WOLF · 잿빛 하이에나
고르바스의 발톱 · 유닛 · 레벨 2 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-WOLF.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-WOLF.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "잿빛 하이에나". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Gorvath's Claw: the summoned creature itself, just materialised.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Gorvath's Claw; signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 대족장의 울음에 달려온 하이에나. 다음 싸움이 끝나면 뼈 하나를 물고 초원으로 돌아간다.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Colour fidelity: the whole image reads at a glance as the banner colour #b88a5a (earth ochre #b88a5a, rust-red war paint, bone white) — dusty, matte ochre and sandstone brown like sunlit clay and weathered bone, a dry earthy glow clearly distinct from flame orange or bright gold; every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; flying rock dust, cracked ground, ochre light.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-G1-2 · 우두머리 하이에나
고르바스의 발톱 · 유닛 · 레벨 4 · 소환물 — 받은 그림은 `tools/art/inbox/TK-G1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-G1-2.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "우두머리 하이에나". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Gorvath's Claw: the summoned creature itself, just materialised.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Gorvath's Claw; signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 부름에 답한 무리의 우두머리. 웃음소리가 가장 낮다.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Colour fidelity: the whole image reads at a glance as the banner colour #b88a5a (earth ochre #b88a5a, rust-red war paint, bone white) — dusty, matte ochre and sandstone brown like sunlit clay and weathered bone, a dry earthy glow clearly distinct from flame orange or bright gold; every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; flying rock dust, cracked ground, ochre light.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-G2-1 · 덩굴 방벽
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TK-G2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-G2-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "덩굴 방벽". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Verdan's Antler: the summoned creature itself, just materialised.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Verdan's Antler; signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 한 턴 동안 자라났다 시드는 덩굴 벽.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Colour fidelity: the whole image reads at a glance as the banner colour #58b85f (forest green #58b85f, deep moss, bark brown, bioluminescent spores); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; glowing moss, thorny vines, drifting leaves.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no fire magic.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-ROOT · 뿌리
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-ROOT.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-ROOT.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뿌리". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Verdan's Antler: the summoned creature itself, just materialised.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Verdan's Antler; signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 베어 낸 고목의 그루터기에서 하룻밤 만에 다시 솟은 뿌리. 쓰러진 자를 끌어안고 놓지 않는다.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Colour fidelity: the whole image reads at a glance as the banner colour #58b85f (forest green #58b85f, deep moss, bark brown, bioluminescent spores); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; glowing moss, thorny vines, drifting leaves.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no fire magic.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-SAPLING · 묘목
베르단의 뿔 · 유닛 · 레벨 1 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-SAPLING.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-SAPLING.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "묘목". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Verdan's Antler: the summoned creature itself, just materialised.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Verdan's Antler; signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 싸움이 끝난 자리에 심은 묘목.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Colour fidelity: the whole image reads at a glance as the banner colour #58b85f (forest green #58b85f, deep moss, bark brown, bioluminescent spores); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; glowing moss, thorny vines, drifting leaves.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no fire magic.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-U-TREE · 어린 고목
베르단의 뿔 · 유닛 · 레벨 3 · 소환물 — 받은 그림은 `tools/art/inbox/TK-U-TREE.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-U-TREE.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "어린 고목". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Verdan's Antler: the summoned creature itself, just materialised.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — summoned by the Verdan's Antler; signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 한 턴을 버틴 묘목이 자란 고목.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Colour fidelity: the whole image reads at a glance as the banner colour #58b85f (forest green #58b85f, deep moss, bark brown, bioluminescent spores); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; glowing moss, thorny vines, drifting leaves.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no fire magic.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### TK-G3-1 · 물의 정령
마렌시아의 노래 · 유닛 · 레벨 2 · 소환물 — 받은 그림은 `tools/art/inbox/TK-G3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/TK-G3-1.jpg` 750×600)

```
Landscape 5:4 image. Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUMMONED TOKEN — a conjured, temporary creature or effect. A creature, construct or effect called into being for a moment; simple and readable.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "물의 정령". Depict exactly what this name describes.
Subject: a summoned creature or construct of the Marencia's Song: the summoned creature itself, just materialised.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Banner — summoned by the Marencia's Song; signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 샘에서 일어선 작은 정령.
Camera: eye-level medium shot, subject about 50% of the frame.
Lighting: an element-coloured glow from the summoning with a clean rim light, clear readable contrast; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Colour fidelity: the whole image reads at a glance as the banner colour #4fb3ff (water blue #4fb3ff, aquamarine, pearl white, deep-sea navy); every glow, spark and highlight stays in that hue family.
Background: very dark night-blue (#07080d) base; plain dark night-blue with a fading wisp of ether and element light where it was called forth; clear water light, spray, ripples, bubbles.
Detail: clear, well-rendered forms with slightly translucent, glowing edges where it was conjured.
Spectacle: a soft conjuring shimmer only. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: faint ether sky-blue (#8fdcff) summoning traces — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: fleeting, conjured.
Stay true to the banner: no fire, no heavy plate armour.
Composition: landscape 5:4; one main subject centred with breathing room around it, the whole figure or object readable inside the frame; the full image is shown on the card, with only a thin sliver trimmed at the left and right edges.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

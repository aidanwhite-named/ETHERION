# 레어 (Rare) — 카드 일러스트 프롬프트 (58장, 버전 g3)

> 정예 · 걸작. 팩에서 나오면 눈이 가는 카드. 역동적인 구도, 깊이 있는 배경에 고향의 랜드마크 하나, 사파이어빛 에테르 알갱이와 얇은 테두리 빛.

## 이 등급의 연출 틀 (설명용 — 그림 AI에 넣지 않는다)

```
Grade: RARE — an elite specialist or a masterwork, the card people notice. an elite with a signature move, or a masterwork — clearly special.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights.
Background: atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: {landmark}.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette (about 10% of the light).
Mood: precise, impressive, prized.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다(스페셜은 v3.95부터 이 틀을 짧게 묶어 넣음). **그림 AI에는 카드 프롬프트(``` 안) 하나만 붙여 넣는다** — 위 틀을 함께 넣으면 같은 말이 두 번 들어가 그림끼리 닮는다. 카드마다 새 대화에서 그린다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 58장

### RS-A1-1 · 피의 창
모르카스의 그믐 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-A1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 창". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive darkness attack striking the enemy ranks; paid for with the caster's own blood. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 제 피를 굳혀 벼린 창. 녹타르의 계약자는 가장 위험한 적부터 꿰뚫는다.
Game effect (Korean, mood only — never draw text or numbers): [제물 2] 상대 유닛 중 공격이 가장 높은 유닛 1개에게 체력 −6.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A1-2 · 흡혈 장막
모르카스의 그믐 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-A1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "흡혈 장막". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: life-force siphoned from an enemy into an allied warrior; an empowering darkness aura rising around allied warriors. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모르크 협곡의 그림자는 다가오는 자의 힘을 빨아 문지기에게 먹인다. 대가는 늘 상대가 치른다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 2개 공격 −4(0까지만). 깎인 만큼을 합쳐 아군 맨 앞 유닛 공격 +, 그 유닛 체력 +2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A1-3 · 정신 지배
모르카스의 그믐 · 공용 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-A1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "정신 지배". Depict exactly what this name describes.
Subject: versatile spell of the Morkas's New Moon (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Mind Domination: an elegant horned demon contractor raises two fingers like a puppeteer; violet threads of light hook into the brow of an enemy warrior (dark silhouette, already marked by a faint curse sigil) whose eyes now glow the same violet; he has turned around on the battlefield and walks to stand at the back of the demon's own ranks, weapon pointing at his former comrades. Unsettling calm, closed-eye scales motif faint in the smoke above.
Scale (level 2 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 그믐의 속삭임은 겁먹은 마음부터 파고든다. 어제의 동료를 향해 칼을 든 병사는, 해가 지고서야 제 이름을 기억해 낸다.
Game effect (Korean, mood only — never draw text or numbers): [저주]가 들었거나 레벨 3 이하인 상대 유닛 가운데 공격이 가장 높은 유닛 1개를 이번 턴 내 전장 맨 뒤로 데려와 내 편으로 싸우게 한다. 살아남으면 전투가 끝날 때 상대 전장 맨 뒤로 돌아간다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-A1-2 · 그림자 계약
모르카스의 그믐 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/US-A1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-A1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 계약". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive darkness attack striking the enemy ranks; an empowering darkness aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 그림자 없는 아즈라가 처음 맺었다는 계약의 사본. 원본에 무엇을 걸었는지는 적혀 있지 않다.
Game effect (Korean, mood only — never draw text or numbers): [제물 1] 상대 유닛 중 공격이 가장 높은 유닛 1개에게 체력 −3. 아군 유닛 3 공격 +3, [치명], [연쇄].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-A1 · 녹타르 피의 가면
모르카스의 그믐 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "녹타르 피의 가면". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Morkas's New Moon (holy relic). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Morkas's New Moon (darkness): palette: violet #8b5cf6, black, blood-red accents. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 심연 계약단의 처형인이 쓰는 가면. 쓴 자는 벤 상처에서 흐르는 피를 제 숨으로 들이킨다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MA-16 · 피의 맹약
모르카스의 그믐 · 공격 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/MA-16.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MA-16.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 맹약". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering darkness aura rising around allied warriors; allies rallying as one under a shared surge of power; paid for with the caster's own blood. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모두가 한 잔의 피를 나눠 마셨다. 그 밤 녹타르의 군대는 두려움을 잃었다.
Game effect (Korean, mood only — never draw text or numbers): [제물 3] 아군 전체 공격 +3, [흡혈].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A1-R · 그림자 계약 집행자
모르카스의 그믐 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-A1-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A1-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그림자 계약 집행자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Morkas's New Moon — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 아즈라의 계약서 사본을 품고 다닌다. 계약을 어긴 자의 숨을 정확히 하나만 남긴다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; violet shadow smoke, blood-red accents, contract sigils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A2-3 · 빛의 결계
솔란테의 새벽 · 공용 마법 · 레벨 1 · 레어 — 받은 그림은 `tools/art/inbox/RS-A2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "빛의 결계". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive holy light attack striking the enemy ranks; a weakening curse sinking over the enemies; a protective barrier or ward shielding allies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 1 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 솔란테에게 맹세한 자 앞에 빛의 원이 그려진다. 그 원을 넘는 칼은 빛에 눈이 멀어 힘을 잃는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 유닛에게 [보호막]. 상대 맨 앞 유닛 공격 −3, 체력 −1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PS-A2-1 · 대신 속죄
솔란테의 새벽 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/PS-A2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PS-A2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "대신 속죄". Depict exactly what this name describes.
Subject: defense spell of the Solante's Dawn (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Atonement in Another's Stead: an enemy blade strikes the celestial soldier at the front of the line, but the wound appears instead on the winged comrade standing right behind him — a thread of golden light links the two, and the one behind is wrapped in a thin protective halo-ward, absorbing the blow with a calm, bowed head. Sacrificial, tender, warm gold on a grey battlefield.
Scale (level 2 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 천족은 형제의 상처를 제 몸에 옮겨 받는 법을 안다. 앞선 자가 칼을 휘두르는 동안, 뒤에 선 자가 묵묵히 그 값을 치른다.
Game effect (Korean, mood only — never draw text or numbers): 이번 턴 아군 맨 앞 유닛이 받는 피해를 바로 뒤의 아군 유닛이 대신 받는다. 대신 받는 유닛은 [가호 1].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A2-1 · 빛의 심판
솔란테의 새벽 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-A2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "빛의 심판". Depict exactly what this name describes.
Subject: attack spell of the Solante's Dawn (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Light of Judgment: two winged celestial knights at the front of the line lower and plant their shields and strip open their breastplates, offering their own armour up; the light of that surrendered armour rises from them as two beams of white-gold radiance that merge into one great descending blade of judgment striking the first enemy (dark silhouette) — and, piercing through, carries on into the enemy behind. Solemn sacrifice turned into a strike; dawn sky.
Scale (level 2 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성의 기사들은 심판의 날에 방패를 내려놓는다. 방패에 모였던 빛이 한 줄기 창이 되어 적의 대열을 꿰뚫는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 유닛 2개의 방어가 이번 턴 0이 된다. 깎인 방어의 합만큼 상대 맨 앞 유닛의 체력을 깎고, 쓰러뜨리고 남은 몫은 다음 유닛에게 준다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-A2 · 솔란테의 맹세 방패
솔란테의 새벽 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 맹세 방패". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Solante's Dawn (weapon/armour + holy relic). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Solante's Dawn (holy light): palette: holy light #ffe9a8, white, pale gold, soft sky blue. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성 엘라드의 기사가 맹세를 마친 날 받는 방패. 맹세를 지키는 동안 첫 칼날은 빛에 미끄러진다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A2-2 · 응보의 빛
솔란테의 새벽 · 방어 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-A2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "응보의 빛". Depict exactly what this name describes.
Subject: defense spell of the Solante's Dawn (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Light of Retribution: a celestial knight shelters behind spread white wings that catch a rain of enemy blades; the blocked strikes gather into a bright orb of light above the wings, then lance back as a single spear of radiance at the largest enemy. Defensive pose turning into a counterstrike.
Scale (level 3 of 8): an effect over a few targets.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 천족의 날개에 막힌 칼날은 사라지지 않는다. 빛으로 모였다가, 싸움이 끝나는 순간 그 칼날을 휘두른 자에게 돌아간다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체에게 [가호 1]. 전투가 끝날 때, 이번 턴 아군이 [보호막] · [가호]로 막은 피해만큼 체력이 가장 높은 상대 유닛의 체력을 깎는다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A2-R · 새벽빛 방패 사자
솔란테의 새벽 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-A2-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A2-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "새벽빛 방패 사자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Dawn Lion of the Solante's Dawn.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Dawn Lion: a great golden lion whose mane fans out like the rays of the rising sun. Silhouette: a powerful lion with a wide radiant mane. Materials: golden fur, a sunray mane, white claws.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 해 뜨는 쪽으로만 갈기를 세운다. 곁에 선 자를 노린 첫 칼날은 그 갈기의 새벽빛에 미끄러진다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; pale gold radiance, halo, feathers of light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A3-1 · 칼바람
벨루미르의 별 · 공격 마법 · 레벨 1 · 레어 — 받은 그림은 `tools/art/inbox/RS-A3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "칼바람". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: chained wind strikes leaping from target to target. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 1 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 폭풍탑의 견습생이 처음 배우는 주문. 그러나 하이엘프의 견습생은 이미 다른 종족의 대마법사다.
Game effect (Korean, mood only — never draw text or numbers): 상대 무작위 유닛에게 체력 −2를 2번.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A3-2 · 역풍 장벽
벨루미르의 별 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-A3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "역풍 장벽". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive wind attack striking the enemy ranks; a weakening curse sinking over the enemies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑을 오르려는 자는 거꾸로 부는 바람을 먼저 만난다. 내지른 칼은 제 얼굴로 돌아온다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 3개 공격 −3, 체력 −1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SA3-06 · 궁사회 무기고
벨루미르의 별 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/SA3-06.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SA3-06.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "궁사회 무기고". Depict exactly what this name describes.
Subject: attack spell of the Belumir's Star (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Archers' Armory: the great wooden doors of the Storm Tower archers' armory swing open on a windy high-elf spire; racks of slender wind-wrapped longbows are handed out one by one to a mixed line of sky creatures — a harpy, a young griffin, an owl-like beast and a wind sylph — each now gripping its own bow, strings glinting, wind curling around the limbs; no arrows flying yet, the moment of arming.
Scale (level 2 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 폭풍탑 궁사회의 무기고 문이 열린다. 칼을 쥐던 손에도, 발톱뿐이던 짐승에게도 바람을 감은 활이 한 자루씩 쥐어진다.
Game effect (Korean, mood only — never draw text or numbers): 아이템을 장착하지 않은 아군 유닛 전체가 [활]을 든다(이 판 내내). 활을 받은 유닛은 이번 턴 공격 +2, [원거리].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-A3 · 별 문자 화살
벨루미르의 별 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별 문자 화살". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Belumir's Star (archery gear). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Belumir's Star (wind): palette: wind teal #9fe3d6, silver, white, starry indigo. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 이사크가 해독한 별의 문자를 바늘탑 사수들이 화살대에 새겼다. 날아가는 동안 바람이 방향을 바꿔 과녁을 따라간다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-A3-3 · 회오리 칼날
벨루미르의 별 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-A3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-A3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "회오리 칼날". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a weakening curse sinking over the enemies; chained wind strikes leaping from target to target. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 벨루미르의 바늘 꼭대기에서 내려온 회오리. 안에 든 바람의 칼날은 셀 수 없고, 휘말린 자는 서 있지도 못한다.
Game effect (Korean, mood only — never draw text or numbers): 상대 무작위 유닛에게 체력 −2를 3번. 상대 유닛 전체 공격 −1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A3-R · 별빛 궁수장
벨루미르의 별 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-A3-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A3-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별빛 궁수장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Night Elf of the Belumir's Star.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Night Elf: night elves of the Storm Tower: dusky violet-blue skin, silver-white hair, very long swept-back ears and eyes glowing faintly like stars. Silhouette: a tall slender archer with long swept ears and a dark trailing cloak. Materials: dark indigo leather, silver star embroidery, a moon-silver bow, a night-blue cloak.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 천 개의 눈이 박힌 로브의 한 자락을 받았다. 곁에 선 사수들의 화살은 그 눈이 비춘 갑옷 틈으로 저절로 휘어 든다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spires of Belumir's Needle piercing the clouds under a night sky full of stars; swirling teal wind, drifting feathers and starlight streaks.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B1-2 · 매설 지뢰
도르마크의 심장불 · 방어 마법 · 레벨 1 · 레어 — 받은 그림은 `tools/art/inbox/RS-B1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "매설 지뢰". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 1 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 톱니 고개로 오르는 길에는 고블린만 아는 돌이 있다. 밟지 말아야 할 돌이다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 2개에게 체력 −2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B1-3 · 불씨 탄막
도르마크의 심장불 · 공용 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-B1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불씨 탄막". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 심장불을 한 줌씩 나눠 담은 탄. 흩어진 불씨는 가장 크게 칼을 든 자에게 모여든다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 체력 −1 −1C. 그 가운데 공격이 가장 높은 유닛 1개는 체력 −2 더.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-B1 · 명사수의 화승총
도르마크의 심장불 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "명사수의 화승총". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Dormak's Heartfire (weapon/armour). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Dormak's Heartfire (fire): palette: fire orange #ff6b3d with brass #d4893a and soot black. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄 포병단에서 백 발을 쏴 백 발을 맞힌 자에게만 내주는 총. 개머리판에 맞힌 수만큼 금이 그어져 있다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NB1-3 · 불바람
도르마크의 심장불 · 공격 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/NB1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NB1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불바람". Depict exactly what this name describes.
Subject: attack spell of the Dormak's Heartfire (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Fire Wind: a scorching wind born from Dormak's heart-fire roars across the enemy army (dark silhouettes); every soldier is licked by flames on cloaks and banners while the one at the very front is engulfed in a whirling pillar of fire. Heat haze, blowing sparks and ash, goblins on a bastion cheering in silhouette. Rare: ember particles and glowing rim light.
Scale (level 3 of 8): an effect over a few targets.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 심장불이 숨을 내쉬면 포르탄 고개에 뜨거운 바람이 분다. 그 바람이 지나간 자리마다 불씨가 내려앉는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 [화상 1]. 상대 맨 앞 유닛에게 [화상 3].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B1-1 · 불바다
도르마크의 심장불 · 공격 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-B1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불바다". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄 포병단은 계산하지 않는다. 화약을 있는 대로 쏟아붓고, 남은 것은 다음 날 다시 채운다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 체력 −3. 상대 맨 앞 유닛 2개는 체력 −3 더. [장전 1]
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B1-R · 포연 속의 불매
도르마크의 심장불 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-B1-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B1-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "포연 속의 불매". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Fire Hawk of the Dormak's Heartfire.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Fire Hawk: a sharp-winged hawk with dark feathers edged in embers that leaves a thin fire trail as it dives through gun smoke. Silhouette: a diving hawk streaking out of smoke. Materials: dark feathers edged with embers, smoke wisps, burning talons.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포연이 가장 짙을 때만 내려꽂히는 불매. 그 날갯짓이 연기 위를 맴도는 동안에는 포르탄의 포수들도 손이 빨라진다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; embers, flame light, gunpowder smoke.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NB2-1 · 과부하 가동
소르그림의 방패 · 공용 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/NB2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NB2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "과부하 가동". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an empowering metal aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 보일러의 압력을 한계 너머까지 올렸다. 단단한 놈일수록 더 거세게 달려 나갔다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체 방어 +1. 그 뒤 아군 유닛 전체의 공격이 자기 방어만큼 오른다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B2-2 · 골렘 방진
소르그림의 방패 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-B2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "골렘 방진". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering metal aura rising around allied warriors; a protective barrier or ward shielding allies; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 골렘들이 어깨를 맞대면 철골 산맥의 한 자락이 된다. 주문 따위가 비집고 들 틈은 없다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 방어 +1, 체력 +2, [가호 2], [저주 면역].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-B2 · 아다만트 장갑판
소르그림의 방패 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "아다만트 장갑판". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Sorgrim's Shield (engraving). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Sorgrim's Shield (metal): palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 잠든 거인의 뼈가 굳은 회색 금속을 두르크하임에서 얇게 편 것. 깨지지 않는다는 말이 과장이 아니다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B2-3 · 리벳 폭풍
소르그림의 방패 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-B2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "리벳 폭풍". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive metal attack striking the enemy ranks; an empowering metal aura rising around allied warriors; a weakening curse sinking over the enemies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 공방의 리벳 기계가 한꺼번에 뒤집혔다. 박힐 곳을 찾던 리벳은 아군 갑옷에 박히고, 적의 갑옷은 뚫고 지나간다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 방어 +1, 체력 +1. 상대 유닛 전체 방어 −1, 체력 −2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B2-R · 소르그림의 방패령
소르그림의 방패 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-B2-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B2-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "소르그림의 방패령". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Shield Spirit of the Sorgrim's Shield.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Shield Spirit: a spirit born from the memory of Sorgrim's raised arm: a ghostly figure of shimmering steel plates overlapping like a shield wall around a faint forge-glow core. Silhouette: a floating wall of overlapping shields around a glowing core. Materials: translucent steel plates, adamant grey, forge-orange glow.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 잠든 소르그림이 무언가를 막으려 들어 올렸던 팔의 기억이 쇠 위에 맺혔다. 그것이 선 줄에서는 방패들이 조금씩 더 단단해진다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B2-4 · 철벽 진격
소르그림의 방패 · 공격 마법 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/RS-B2-4.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B2-4.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철벽 진격". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering metal aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 4 of 8): an effect over a few targets.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 방패를 맞댄 두르크하임의 진은 물러서는 법이 없다. 앞으로 쏠리는 순간, 뒤에 선 모두의 무게가 맨 앞 방패를 망치로 만든다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체 방어 +1. 그 뒤 아군 유닛 전체의 방어를 모두 더한 값만큼, 아군 맨 앞 유닛부터 공격이 오른다 — 한 기 뒤로 갈 때마다 1씩 줄어든다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SB2-09 · 대공방
소르그림의 방패 · 공용 마법 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/SB2-09.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SB2-09.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "대공방". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an empowering metal aura rising around allied warriors; a protective barrier or ward shielding allies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 4 of 8): an effect over a few targets.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 두르크하임의 모든 용광로에 불이 들어왔다. 지하 도시 전체가 하나의 공방이 되어 싸움을 받친다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 방어 +1, 체력 +1 +1C. 아군 전체 [저주 면역].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; cold steel sheen, sparks from an anvil, rivets.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-B3 · 구리 피뢰봉
케라운의 벼락 · 아이템 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/IR-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "구리 피뢰봉". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Keraun's Thunder (catalyst). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 2 of 8): a simple object.
Banner — Keraun's Thunder (lightning): palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움 피뢰탑의 끝을 잘라 만든 지팡이. 쥔 손이 아니라 겨눈 곳으로 번개가 떨어진다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PS-B3-1 · 증폭 회로
케라운의 벼락 · 공용 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/PS-B3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PS-B3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "증폭 회로". Depict exactly what this name describes.
Subject: versatile spell of the Keraun's Thunder (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Amplifier Circuit: a goggled gnome engineer plugs two copper coils with glass tubes into the backpacks of the two allied soldiers at the front; thick blue-white lightning surges through the cables and makes the soldiers' own spells and weapons crackle twice as bright. Brass, copper wire, sparking capacitors, an excited grin; ally-boosting, not sabotage.
Scale (level 2 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움의 노움이 두 병사의 등에 구리 회로를 꽂았다. 하늘의 번개가 그 둘을 거쳐 한층 굵게 떨어진다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 유닛 2개에게 이번 턴 [증폭 1].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B3-1 · 축전 해방
케라운의 벼락 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-B3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "축전 해방". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: chained lightning strikes leaping from target to target. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움의 축전병 세 개를 한 줄로 이었다. 번개는 줄어들지 않고 다음 병으로 건너간다.
Game effect (Korean, mood only — never draw text or numbers): 상대 대기열 맨 앞부터 차례로 체력 −2 → −2 → −2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B3-3 · 충전 완료
케라운의 벼락 · 공용 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-B3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "충전 완료". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive lightning attack striking the enemy ranks; threads of fate and glowing cards cycling in motion. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 눈금이 끝까지 찼다. 이런 날의 노움 장치는 한 번도 빗나가지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 이번 턴 아군 유닛의 코인: + 코인은 모두 앞면, − 코인은 모두 뒷면. 상대 맨 앞 유닛 2개에게 체력 −2 −1C.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B3-2 · 감전 덫
케라운의 벼락 · 방어 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-B3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "감전 덫". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive lightning attack striking the enemy ranks; a weakening curse sinking over the enemies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 노움의 공방 문턱에는 구리선이 깔려 있다. 넘어온 자의 칼은 손에서 저절로 떨어진다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 공격 −2, 체력 −1 −1C×2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B3-R · 병 속의 번개 술사
케라운의 벼락 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-B3-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B3-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "병 속의 번개 술사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Keraun's Thunder — a spellcaster channelling lightning power.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 즈라크가 달아난 뒤 남은 빈 병마다 작은 번개를 다시 채워 다닌다. 병이 깨질 때마다 아군 마법이 커진다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the spiked lightning-rod towers of Voltarium crowned by a lightning storm; crackling electric arcs, glowing coils.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NG1-1 · 격노
고르바스의 발톱 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/NG1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NG1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "격노". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 상처가 깊을수록 오크의 눈은 붉어진다. 쓰러지기 직전의 오크만큼 무서운 것은 없다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체의 남은 체력이 1이 되고, 깎인 체력만큼 공격이 오른다(이번 턴).
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PS-G1-2 · 무리의 분노
고르바스의 발톱 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/PS-G1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PS-G1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "무리의 분노". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 우두머리가 울부짖으면 무리 전체가 우두머리만큼 사나워진다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체의 공격이 아군에서 가장 높은 공격과 같아진다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G1-2 · 피의 맹세
고르바스의 발톱 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-G1-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G1-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 맹세". Depict exactly what this name describes.
Subject: defense spell of the Gorvath's Claw (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Blood oath: a circle of Rockfist orc warriors at night, each slicing an open palm with a bone knife and clasping hands together over a stone war-drum; their mixed blood glows deep red and runs as one thread from hand to hand down the line toward the warrior at the back. Solemn, tense, a vow before battle; dark crimson and ochre light.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운의 오크는 손바닥을 갈라 피를 섞는다. 먼저 쓰러진 자의 분노는 뒤에 선 형제의 주먹에서 다시 깨어난다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛마다 피(🩸)로 결속한다. 결속한 유닛이 쓰러지면 가진 피가 모두 바로 뒤 아군에게 옮겨 간다. 전투가 끝날 때 남의 피를 머금고 살아남은 유닛은 다음 턴 준비 때 그 피 주인들이 쓰러질 때의 공격만큼 공격이 오른다(그 턴만).
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-G1 · 잿갈기 문신
고르바스의 발톱 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "잿갈기 문신". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw (engraving). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Gorvath's Claw (earth): palette: earth ochre #b88a5a, rust-red war paint, bone white. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 잿갈기 카르노의 결투를 지켜본 자만 새길 수 있는 문신. 새긴 날부터 칼끝이 급소를 찾는다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG1-03 · 궁지의 송곳니
고르바스의 발톱 · 공격 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/SG1-03.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-03.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "궁지의 송곳니". Depict exactly what this name describes.
Subject: attack spell of the Gorvath's Claw (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Cornered fang: a cornered pack of orcs and wolves surges forward as one at the foremost enemy (dark silhouette); in one sweep the bites tear away its weapon, then its armour plates, then reach its throat, and the leftover momentum already lunges at the next enemy behind. Motion-blurred fangs and claws, dust, brutal frontal composition.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 몰린 무리가 한꺼번에 송곳니를 박는다. 앞을 막은 놈부터 발톱 · 갑옷 · 숨통 순으로 뜯겨 나간다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛의 공격을 모두 더한 만큼, 상대 맨 앞 유닛부터 공격 → 방어 → 체력 순으로 깎는다(공격 · 방어는 이번 턴). 다 깎아 쓰러뜨리면 남은 몫은 다음 유닛에게 넘어간다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG1-08 · 송곳니 반격
고르바스의 발톱 · 방어 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/SG1-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 반격". Depict exactly what this name describes.
Subject: defense spell of the Gorvath's Claw (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Fang counterattack: a small band of cornered Rockfist orcs, backs to a cliff wall, bracing together; their grey-green skin swells and toughens with a warm ochre earth-glow (gaining toughness), tusks bared in a snarl. The nearest orc bites back into the arm of an attacker who has just struck him — the attacker (dark silhouette) recoils, still alive but drained to a thread. Feeling: wounded but defiant, the pack bites back.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 궁지에 몰린 오크는 물러서지 않고 문다. 덤벼든 자는 살아 돌아가도 숨이 한 가닥만 남는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체 체력 +2, [치명].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G1-R · 카르노를 쫓는 자
고르바스의 발톱 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-G1-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G1-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "카르노를 쫓는 자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Gorvath's Claw — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 잿갈기 카르노가 지나간 결투장마다 찾아가 그 자리의 승자에게 결투를 청한다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; flying rock dust, cracked ground, ochre light.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G2-1 · 뿌리 습격
베르단의 뿔 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-G2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뿌리 습격". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive forest attack striking the enemy ranks; an empowering forest aura rising around allied warriors. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 땅 밑을 기어간 뿌리는 적의 뒤에서 솟는다. 빨아올린 것은 고스란히 아군의 수액이 된다.
Game effect (Korean, mood only — never draw text or numbers): 적 유닛 3에게 체력 −2. 아군 유닛 2 체력 +2.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G2-2 · 가시 덤불
베르단의 뿔 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-G2-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G2-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "가시 덤불". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering forest aura rising around allied warriors; a shell of thorns that punishes attackers. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 실바니엘 바깥 숲길은 하룻밤 사이에 덤불로 닫힌다. 베고 들어온 자는 벤 만큼 찔린다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 체력 +3, [가시 2].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-G2 · 첫 고목의 껍질
베르단의 뿔 · 아이템 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/IR-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "첫 고목의 껍질". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler (engraving). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Verdan's Antler (forest): palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 실바니엘 첫 고목이 스스로 떨군 껍질. 베려는 칼날마다 가시가 되어 돌아온다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G2-3 · 끈질긴 이끼
베르단의 뿔 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-G2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "끈질긴 이끼". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an empowering forest aura rising around allied warriors; a protective barrier or ward shielding allies. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 트롤의 몸을 덮은 이끼는 주인이 쓰러지는 것을 허락하지 않는다. 날리는 포자는 적의 숨을 막는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 체력 +2, [불굴].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG2-09 · 베르단의 고목
베르단의 뿔 · 방어 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/SG2-09.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG2-09.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 고목". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering forest aura rising around allied warriors; a shell of thorns that punishes attackers. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 용의 뿔에서 떨어진 가지가 하룻밤 사이 고목으로 자란다. 그 가시 그늘 아래 맹약의 전사들이 선다.
Game effect (Korean, mood only — never draw text or numbers): 아군 전체 방어 +1, [가시 2].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G2-R · 드리엔의 이끼 거인
베르단의 뿔 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-G2-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G2-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "드리엔의 이끼 거인". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Verdan's Antler — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 대정령 드리엔이 지나간 자리에서 일어났다. 이끼 아래에 가시가, 가시 아래에 숲의 기억이 있다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; glowing moss, thorny vines, drifting leaves.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IR-G3 · 넬리아의 물방울
마렌시아의 노래 · 아이템 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/IR-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IR-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A masterwork object of the banner — finely crafted and clearly prized.
Quality floor for every grade: a finished, professional card illustration — carefully rendered materials, surfaces, wear and lighting, the object caught in a clear story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "넬리아의 물방울". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Marencia's Song (holy relic). a masterwork object on a carved pedestal, faint glowing engraved patterns, small floating particles.
Scale (level 2 of 8): a simple object.
Banner — Marencia's Song (water): palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 대정령 넬리아가 셀레네아 샘에 떨군 한 방울. 담긴 그릇의 상처부터 씻는다.
Camera: three-quarter slightly low hero shot of the masterwork object, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: finely wrought, impressive, prized.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G3-1 · 작살 물살
마렌시아의 노래 · 공격 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-G3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "작살 물살". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive water attack striking the enemy ranks; a cleansing wave washing away flames, curses and enchantments; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물살을 타고 날아간 작살은 방패도 축복도 씻어 내고 박힌다. 셀레네아의 사냥꾼은 두 번 던지지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고, 체력 −3. 아군 맨 앞 유닛에게 이번 턴 [치유 1].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G3-2 · 포말 장막
마렌시아의 노래 · 방어 마법 · 레벨 2 · 레어 — 받은 그림은 `tools/art/inbox/RS-G3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "포말 장막". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering water aura rising around allied warriors; a protective barrier or ward shielding allies; a cleansing wave washing away flames, curses and enchantments. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 샘물 무녀단이 부르는 물거품의 노래. 첫 칼날은 거품에 미끄러지고, 상처는 물방울에 닫힌다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 유닛에게 [보호막], 이번 턴 [정화]. 아군 전체 체력 +1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-15 · 치유의 조수
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/MG-15.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-15.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "치유의 조수". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an empowering water aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 따뜻한 밀물이 싸움터를 적신다. 물이 빠지고 나면 쓰러졌던 자들이 하나둘 일어선다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체에게 이번 턴 [치유 1]. 아군 전체 체력 +1.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G3-3 · 밀물의 노래
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/RS-G3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "밀물의 노래". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive water attack striking the enemy ranks; an empowering water aura rising around allied warriors; a cleansing wave washing away flames, curses and enchantments. Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Scale (level 3 of 8): an effect over a few targets.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 마렌시아의 바다가 차오르는 시각에 맞춰 부르는 노래. 밀려온 물은 적의 운을 쓸어 가고 아군의 발을 적신다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체의 코인이 뒷면이 되고 [홀림]에 걸린다(이미 정해진 코인은 그대로). 상대 유닛 전체에게 체력 −2. 아군 전체 체력 +1. 아군 맨 앞 유닛에게 이번 턴 [치유 1].
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG3-01 · 환각의 통제
마렌시아의 노래 · 공용 마법 · 레벨 3 · 레어 — 받은 그림은 `tools/art/inbox/SG3-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG3-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. A signature spell of the banner — sweeping, dramatic and clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered magical energy, materials, atmosphere and lighting, the spell caught at its decisive story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "환각의 통제". Depict exactly what this name describes.
Subject: versatile spell of the Marencia's Song (see art direction). Scale and finish: a sweeping effect that reshapes part of the battlefield, layered energies and motion trails.
Art direction: Illusion control: a Selenea priestess half-submerged in a moonlit lagoon sings; rings of pale light ripple out over the water. One enemy warrior (dark silhouette) on the far bank has lowered his weapon and walks into the water toward her side with dreamy, unseeing eyes, an illusory shimmer around his head, while his comrades behind reach after him too late. Mood: hypnotic, quiet, eerie — no explosion.
Scale (level 3 of 8): an effect over a few targets.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 셀레네아의 무녀는 이름을 노래한다. 같은 길이의 이름을 가진 자는 그 노래를 제 이름으로 듣고, 꿈결처럼 물속 진영으로 걸어 들어온다.
Game effect (Korean, mood only — never draw text or numbers): 이 마법 바로 뒤 내 카드와 이름 글자 수(띄어쓰기 빼고)가 같은 상대 카드 가운데 맨 앞 1장을 빼앗아 내 전장 맨 뒤에 놓는다. 유닛은 판이 끝날 때까지 내 유닛이 되고, 마법은 내 마법으로 발동한다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, sweeping, striking.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G3-R · 넬리아의 물그릇 무녀
마렌시아의 노래 · 유닛 · 레벨 4 · 레어 — 받은 그림은 `tools/art/inbox/PN-G3-R.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G3-R.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: RARE — an elite specialist or a masterwork, the card people notice. An elite with a signature move, or a masterwork — clearly special.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "넬리아의 물그릇 무녀". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Marencia's Song — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물의 대정령 넬리아를 담는 그릇을 받든다. 그릇에서 흘러나오는 심해의 노래가 곁에 선 자들을 감싸 칼끝을 무디게 한다.
Camera: dynamic three-quarter low angle, action pose or poised decisive moment, strong diagonal, subject about 65% of the frame.
Lighting: dramatic: strong element backlight plus a cool sapphire rim light, volumetric haze, sparkling highlights; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; atmospheric environment in depth layers (foreground debris, midground, far distance) with one landmark of the banner's home: the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; clear water light, spray, ripples, bubbles.
Detail: fine filigree and engraved patterns on gear, crisp material rendering (metal, scale, cloth, bark, horn).
Spectacle: drifting ether motes, a crisp rim light, volumetric haze and sparkling highlights — clearly a step above superior. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: drifting sapphire-blue (#4ea8ff) ether motes and a thin sapphire rim on the silhouette — the element colour stays the main light; the grade accent is a secondary touch (about 10% of the light).
Mood: precise, impressive, prized.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

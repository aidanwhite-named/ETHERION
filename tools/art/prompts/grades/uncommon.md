# 고급 (Superior) — 카드 일러스트 프롬프트 (130장, 버전 g3)

> 검증된 베테랑 · 잘 만든 물건. 일반보다 장비가 좋고 자세가 자신 있다. 고향의 한 조각이 흐릿하게 보이고, 장식 끝에 따뜻한 금빛이 조금.

## 이 등급의 연출 틀

```
Grade: SUPERIOR — a proven veteran, clearly a cut above. a seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges.
Background: a recognisable slice of the banner's home ({home}) with atmosphere and depth, softly focused, light atmospheric particles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges (about 5% of the light).
Mood: proven, capable, confident.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다. 그대로 붙여 넣으면 된다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 130장

### A1-01 · 계약의 저주 인형
모르카스의 그믐 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/A1-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "계약의 저주 인형". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Curse Doll of the Morkas's New Moon — a small stitched rag doll brought to life by a pact, with mismatched button eyes, a torn scrap of contract sewn into its chest and rusty pins stuck through its limbs.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Curse Doll: a small stitched rag doll brought to life by a pact, with mismatched button eyes, a torn scrap of contract sewn into its chest and rusty pins stuck through its limbs. Silhouette: small and slumped, limp floppy limbs with pins jutting out. Materials: coarse burlap, black thread stitches, rusty pins, a blood-wax seal, a parchment scrap. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 계약서 귀퉁이를 솜 대신 채워 꿰맨 인형. 바늘이 하나 꽂힐 때마다 녹타르 어딘가에서 서명한 누군가가 움찔한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MC-05 · 환각
모르카스의 그믐 · 공용 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/MC-05.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MC-05.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "환각". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of darkness power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 녹타르의 안개를 마신 자는 곁의 전우가 마족으로 보인다. 칼을 내리친 뒤에야 그 얼굴을 알아본다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛이 환각에 빠져, 바로 뒤의 제 편 유닛을 제 공격으로 친다. 환각에 빠진 유닛은 [홀림].
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A1-41 · 사슬에 묶인 망령
모르카스의 그믐 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/A1-41.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-41.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "사슬에 묶인 망령". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Wraith of the Morkas's New Moon — a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains; a stubborn defender who stands like a wall.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Wraith: a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains. Silhouette: floating and hooded, legless, trailing chains. Materials: translucent grey-violet mist, rusted chains, a torn shroud. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 갚지 못한 빚 대신 녹타르에 묶여 남은 혼. 칼은 들지 못하지만, 그를 해치면 계약이 해친 쪽에 값을 묻는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-A1 · 침묵의 빙의
모르카스의 그믐 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/CS-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "침묵의 빙의". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of darkness power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Possession of Silence (v3.95): left, a glowing enemy spell scroll is gagged shut by a ribbon of black smoke and goes dark. Centre, a huge, hale enemy champion (dark silhouette) stiffens as a small, frail, translucent ghost — the faint soul of the weakest little creature on the battlefield — slides into his chest; his mighty body suddenly looks as fragile as that ghost, knees buckling, eyes hollow. Violet underlight, whisper-thin smoke threads linking the two shapes. No blood.
Scale (level 2 of 8): a small, local effect.
Banner — Morkas's New Moon: magic of morkas's new moon, signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes; palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 주문을 외던 입이 멎고, 가장 굳센 자의 몸에 가장 여린 자의 혼이 깃든다. 모르카스의 그믐에는 둘 다 같은 값이다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다. 상대 유닛 중 남은 체력이 가장 높은 1기에 [빙의] — 남은 체력이 전장에서 레벨이 가장 낮은 다른 유닛의 남은 체력이 된다(더 낮을 때만).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A1-13 · 녹타르 듀라한
모르카스의 그믐 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/A1-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "녹타르 듀라한". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Dullahan of the Morkas's New Moon — a headless knight in black plate who paid with its own head, carrying the helmeted head under one arm and an executioner's axe in the other, violet ghost-flame rising from the empty neck.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Dullahan: a headless knight in black plate who paid with its own head, carrying the helmeted head under one arm and an executioner's axe in the other, violet ghost-flame rising from the empty neck. Silhouette: tall armoured figure with an empty neck, a head held at the hip. Materials: black iron plate, a chained ledger, a glowing head in a helm, violet ghost-flame. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 계약을 어긴 자의 이름을 장부에서 지우던 처형인이었다. 제 머리를 값으로 치른 뒤로는 옆구리에 낀 머리가 장부를 읽고, 몸은 빼앗을 것을 빼앗는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IA1-5 · 계약서 원본
모르카스의 그믐 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IA1-5.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IA1-5.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "계약서 원본". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Morkas's New Moon (holy relic; if unsure, a book). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모르카스와 맺은 계약서의 원본. 주인이 피로 값을 치를 때마다 서명한 자의 칼이 무거워진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A1-U1 · 피의 맹세 검사
모르카스의 그믐 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/PN-A1-U1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A1-U1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 맹세 검사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Death Knight of the Morkas's New Moon — an undead knight in blackened rusted plate holding a blood-fed sword, cold violet eyes glowing in the visor.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Death Knight: an undead knight in blackened rusted plate holding a blood-fed sword, cold violet eyes glowing in the visor. Silhouette: an armoured knight with a long sword held upright. Materials: black rusted plate, blood-red runes on the blade, a torn cape. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 검에 제 피를 먹여 맹세하고, 죽은 뒤에도 일어섰다. 맹세의 값이 다 치러지기 전에는 무덤이 그를 받아 주지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### S3-1 · 계약의 인장
모르카스의 그믐 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/S3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/S3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "계약의 인장". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Morkas's New Moon (holy relic; if unsure, a wax seal, signet or sealed contract). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모르카스와 맺은 계약의 인장. 대가를 미리 치렀기에, 자기보다 큰 자의 칼은 그림자처럼 비켜 간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A1-C2 · 모르크 협곡 셰이드
모르카스의 그믐 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/PN-A1-C2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A1-C2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르크 협곡 셰이드". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Shade of the Morkas's New Moon — a tall, wavering shadow-spirit risen from the canyon floor, thin as smoke, with long fingers and two faint violet eyes.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Shade: a tall, wavering shadow-spirit risen from the canyon floor, thin as smoke, with long fingers and two faint violet eyes. Silhouette: tall, thin and wavering like a column of smoke. Materials: dusky smoke, canyon dust, faint violet eyes. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모르크 협곡 바닥에서 올라온 주인 없는 그림자. 빛을 받으면 엷어져 보이지 않을 뿐, 사라진 적은 없다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A1-27 · 녹타르 피의 군주
모르카스의 그믐 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/A1-27.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-27.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "녹타르 피의 군주". Depict exactly what this name describes.
Subject: an elite, commanding Vampire of the Morkas's New Moon — a pale aristocratic vampire of Noctar with sharp fangs, red eyes and a high-collared black and crimson attire.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Vampire: a pale aristocratic vampire of Noctar with sharp fangs, red eyes and a high-collared black and crimson attire. Silhouette: tall and elegant, high collar, sweeping cape. Materials: black velvet, crimson silk, silver rings, a crystal goblet. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A1-U2 · 모르카스의 세리
모르카스의 그믐 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-A1-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A1-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르카스의 세리". Depict exactly what this name describes.
Subject: an elite, commanding Wraith of the Morkas's New Moon — a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Wraith: a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains. Silhouette: floating and hooded, legless, trailing chains. Materials: translucent grey-violet mist, rusted chains, a torn shroud. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 죽은 날에도 장부를 놓지 않아 그대로 망령이 되었다. 침묵의 군주에게 바칠 몫은 지금도 한 푼도 깎아 주지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A1-31 · 피의 공작
모르카스의 그믐 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/A1-31.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-31.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 공작". Depict exactly what this name describes.
Subject: an elite, commanding Vampire of the Morkas's New Moon — a pale aristocratic vampire of Noctar with sharp fangs, red eyes and a high-collared black and crimson attire.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Vampire: a pale aristocratic vampire of Noctar with sharp fangs, red eyes and a high-collared black and crimson attire. Silhouette: tall and elegant, high collar, sweeping cape. Materials: black velvet, crimson silk, silver rings, a crystal goblet. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A1-35 · 모르크의 나이트메어
모르카스의 그믐 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/A1-35.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A1-35.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르크의 나이트메어". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Nightmare of the Morkas's New Moon — a black horse made of nightmare smoke, with a flaming violet mane, burning hooves and eyes like coals.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Nightmare: a black horse made of nightmare smoke, with a flaming violet mane, burning hooves and eyes like coals. Silhouette: a rearing horse with a long smoke-trailing mane. Materials: black smoke hide, violet fire, iron-shod hooves. Do NOT draw it as one of the fiends unless the name says so.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 협곡의 아이들이 잠들기 전에 듣는 이야기 속 검은 말. 어른들이 이야기를 일부러 줄여서 들려주는 것은, 끝까지 들은 아이의 꿈에 말발굽 소리가 들리기 때문이다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the shadow city of Noctar in a sunless canyon) with atmosphere and depth, softly focused, light atmospheric particles; violet shadow smoke, blood-red accents, contract sigils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no holy light, no crude cartoon devils — they are elegant and ominous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-01 · 견습생의 기도 촛불
솔란테의 새벽 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/A2-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "견습생의 기도 촛불". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Prayer Candle of the Solante's Dawn — a small living prayer candle of white beeswax, a calm little face glowing inside its flame, wax drips hanging like a tiny robe.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Prayer Candle: a small living prayer candle of white beeswax, a calm little face glowing inside its flame, wax drips hanging like a tiny robe. Silhouette: small and upright, a tall teardrop flame on top. Materials: white beeswax, warm gold flame, a brass candle dish. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성 엘라드의 견습생이 처음 올린 기도가 촛불이 되어 일어섰다. 불꽃은 아직 손가락만 하지만, 닿는 상처의 더러움은 빠짐없이 태운다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-41 · 돌격 페가수스
솔란테의 새벽 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/A2-41.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-41.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "돌격 페가수스". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Pegasus of the Solante's Dawn — a white winged horse with broad feathered wings and a pale gold mane; a reckless charging attacker.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Pegasus: a white winged horse with broad feathered wings and a pale gold mane. Silhouette: a horse with big wings raised mid-gallop or mid-dive. Materials: white coat, white feathered wings, gold mane, silver hooves. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 날개를 접고 고원을 달린다. 날 수 있는데도 굳이 달려서 들이받는 쪽을 좋아한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-A2 · 정화의 빛
솔란테의 새벽 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/CS-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "정화의 빛". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering holy light aura rising around allied warriors; a protective barrier or ward shielding allies. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 솔란테의 빛 아래에서는 숨겨 둔 것이 남지 않는다. 드러난 함정은 사라지고, 앞장선 기사의 창끝에는 빛이 머문다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다. 아군 맨 앞 유닛 공격 +2, [보호막].
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SA2-03 · 침묵의 기도
솔란테의 새벽 · 방어 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SA2-03.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SA2-03.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "침묵의 기도". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a burst of holy light power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Prayer of Silence: a circle of robed celestial priests with folded white wings kneel in unison on a battlefield, heads bowed; a soft dome of pale golden quiet spreads from them, and inside it the glowing auras and weapon enchantments of the enemy front line fade out like snuffed candles. Still, hushed, gentle light.
Scale (level 2 of 8): a small, local effect.
Banner — Solante's Dawn: magic of solante's dawn, signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths; palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 천족 사제들이 한목소리로 기도를 올리면 전장의 소음이 가라앉는다. 그 침묵 속에서는 어떤 힘도 제 이름을 부르지 못한다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 2개의 특수능력을 이번 턴 끈다. 아군에 [정화] 유닛이 있으면 상대 유닛 전체.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-13 · 성광 색유리 기사
솔란테의 새벽 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/A2-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "성광 색유리 기사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Stained-Glass Knight of the Solante's Dawn — a knight-shaped figure stepped out of a cathedral window, its body made of coloured glass panes held together by dark lead lines, sunlight shining through it.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Stained-Glass Knight: a knight-shaped figure stepped out of a cathedral window, its body made of coloured glass panes held together by dark lead lines, sunlight shining through it. Silhouette: an upright knight with sword and shield, cut into glass segments. Materials: coloured glass panes, lead cames, gold light shining through. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성 대성당 창에 그려져 있던 기사가 유리째 걸어 나왔다. 햇빛이 그 몸을 지나면 일곱 빛깔로 갈라져 상처의 더러움을 씻는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A2-U1 · 맹세를 새긴 기사
솔란테의 새벽 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/PN-A2-U1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A2-U1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "맹세를 새긴 기사". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Oath Spirit of the Solante's Dawn — a sworn oath that outlived its speaker, taking the shape of a knight: hollow white-gold armour filled with light, the words of the oath glowing on its plates.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Oath Spirit: a sworn oath that outlived its speaker, taking the shape of a knight: hollow white-gold armour filled with light, the words of the oath glowing on its plates. Silhouette: a knight shape with an empty glowing visor. Materials: white-gold light, engraved glowing letters, hollow plate. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 기사는 오래전에 쓰러졌고, 갑옷 안쪽에 새긴 맹세만 남아 그 갑옷을 입고 일어섰다. 맹세가 지켜지는 동안 빈 갑옷은 꺾이지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### S4-1 · 솔란테의 성유물
솔란테의 새벽 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/S4-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/S4-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 성유물". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Solante's Dawn (holy relic; if unsure, a sacred relic (chalice, reliquary or holy symbol — not a plain cross)). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 태양신의 성유물. 신이 고개를 돌린 날에는 아무것도 막지 못한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-42 · 천벌의 집행자
솔란테의 새벽 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/A2-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "천벌의 집행자". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Solante's Dawn — a devoted priest, ritualist or pact-bound servant, praying or offering; a reckless charging attacker.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 맹세를 어긴 자에게 내려지는 빛. 단 한 번 내리치는 그의 칼은 마족에게서 거둔 것이라, 맞은 자의 피가 멎지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-25 · 엘라드의 성화
솔란테의 새벽 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/A2-25.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-25.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "엘라드의 성화". Depict exactly what this name describes.
Subject: an elite, commanding Sacred Flame of the Solante's Dawn — the never-extinguished sacred fire of Elad given a body: a white-gold flame in a vaguely human shape rising from a brass brazier.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Sacred Flame: the never-extinguished sacred fire of Elad given a body: a white-gold flame in a vaguely human shape rising from a brass brazier. Silhouette: a tall flame rising from a brazier. Materials: white-gold fire, a brass brazier, glowing embers. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 엘라드 대성당 제단에서 한 번도 꺼진 적 없는 불. 쓰러진 자의 곁에 옮겨 붙으면 상처에 스민 더러움부터 태운다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A2-U2 · 솔란테의 성가대
솔란테의 새벽 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-A2-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A2-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 성가대". Depict exactly what this name describes.
Subject: an elite, commanding Dawn Lark of the Solante's Dawn — small dawn larks with brown and gold-tipped feathers, always flying in a singing flock, sunrise light catching their wings.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Dawn Lark: small dawn larks with brown and gold-tipped feathers, always flying in a singing flock, sunrise light catching their wings. Silhouette: a loose flock of small birds in mid-song. Materials: brown and gold feathers, small sharp beaks, sun glints. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽마다 여섯 날개의 어머니에게 노래하는 종다리 무리. 노래가 끝나기 전에는 아무도 쓰러지지 않는다고 믿어서, 좀처럼 노래를 끝내지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-43 · 불꽃 날개 순교자
솔란테의 새벽 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/A2-43.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-43.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불꽃 날개 순교자". Depict exactly what this name describes.
Subject: an elite, commanding member of the Solante's Dawn — a devoted priest, ritualist or pact-bound servant, praying or offering; a reckless charging attacker.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A2-36 · 새벽의 천사장
솔란테의 새벽 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/A2-36.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A2-36.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "새벽의 천사장". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Archangel of the Solante's Dawn — a towering archangel of the dawn with many great white wings and gold armour, a lance of light in hand.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Archangel: a towering archangel of the dawn with many great white wings and gold armour, a lance of light in hand. Silhouette: a tall figure framed by vast spread wings. Materials: white and gold feathers, gold plate, radiant light. Do NOT draw it as one of the winged celestials unless the name says so.
Banner — Solante's Dawn: show the banner through element, palette and a few accents (halos, wings, great shields, a rising sun with a sword, feathers of light, oaths); palette: holy light #ffe9a8, white, pale gold, soft sky blue.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the white walls of the Dawn Citadel Elad) with atmosphere and depth, softly focused, light atmospheric particles; pale gold radiance, halo, feathers of light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-01 · 바늘탑 견습 사수
벨루미르의 별 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/A3-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바늘탑 견습 사수". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Elf of the Belumir's Star — elf archers of the Storm Tower guild: pointed ears shorter than a high elf's, lean and wind-weathered, brown or ash hair tied back, plain practical gear.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Elf: elf archers of the Storm Tower guild: pointed ears shorter than a high elf's, lean and wind-weathered, brown or ash hair tied back, plain practical gear. Silhouette: a lean archer with a plain longbow, hood pushed back, braced against the wind. Materials: worn grey-green leathers, a wool cloak, a plain pale-wood bow, grey goose fletching. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-02 · 어린 하피
벨루미르의 별 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/A3-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "어린 하피". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Harpy of the Belumir's Star — storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Harpy: storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves. Silhouette: a bird-woman with wide wings and hooked talons, mid-swoop. Materials: storm-grey and teal feathers, sharp black talons, wild hair. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑 처마에 둥지를 튼 하피의 새끼. 궁사회가 버린 화살깃을 주워 둥지를 짓다가, 깃 하나로 갑옷 틈을 찾는 법을 먼저 익혔다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-A3 · 주문 끊기
벨루미르의 별 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/CS-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "주문 끊기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of wind power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 폭풍탑의 견습생은 주문을 거는 법보다 끊는 법을 먼저 배운다. 남의 주문을 끊지 못하는 자는 탑에 오를 수 없다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### HA3-2 · 정찰
벨루미르의 별 · 핸드 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/HA3-2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/HA3-2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "정찰". Depict exactly what this name describes.
Subject: trick spell played on the opponent's hidden hand — cunning: hidden cards, eyes, threads of fate, a sly hand in shadow; quieter, mysterious lighting. The moment it takes effect: threads of fate and glowing cards being drawn; a sly hand reaching into the enemy's hidden plans. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바람 척후병이 적의 막사에서 가져온 소식. 가장 먼저 나설 적의 팔을 미리 묶어 둔다.
Game effect (Korean, mood only — never draw text or numbers): 상대 핸드의 첫 번째 유닛 공격 −2 (이 판 내내). 저주 면역인 공격은 깎이지 않는다. 카드 1장을 뽑는다(생명 소모 없음).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MA-03 · 무력화
벨루미르의 별 · 공용 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/MA-03.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MA-03.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "무력화". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a weakening curse sinking over the enemies. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 공격 −5.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-07 · 돌풍 임프
벨루미르의 별 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/A3-07.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-07.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "돌풍 임프". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Imp of the Belumir's Star — small mischievous sky imps with pointed ears and wide grins, one made of a swirling gust, another of a falling star trailing sparks.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Imp: small mischievous sky imps with pointed ears and wide grins, one made of a swirling gust, another of a falling star trailing sparks. Silhouette: tiny, gangly and flitting, small wings. Materials: wisps of air or white-hot sparks, tiny feathered wings. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 성미가 바람보다 급한 꼬마 정령. 궁사들이 시위를 다 당기기도 전에 화살을 채어 가서 제가 먼저 맞힌다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NA3-1 · 찢는 바람
벨루미르의 별 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/NA3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NA3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "찢는 바람". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive wind attack striking the enemy ranks. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체의 방어가 0이 된다(이번 턴). 상대 유닛 전체에게 피해 1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SA3-02 · 혼란의 바람
벨루미르의 별 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SA3-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SA3-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "혼란의 바람". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of wind power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Wind of Confusion (v3.95, formerly Wind Barrier): a twisting, disorienting gust hurled by a high-elf archer wraps the front enemy warrior (dark silhouette) in a spiral; his armour plates and his life-glow swap places in the whirl — steel pieces float out while a pale heartbeat light sinks inward — he staggers, vision warped, the air itself bent and crooked. Storm-grey and silver wind lines, no text.
Scale (level 2 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 엘프의 바람은 갑옷을 벗기지 않는다. 다만 몸이 갑옷인 줄, 갑옷이 몸인 줄 모르게 뒤섞는다. 그다음은 화살이 안다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛의 방어와 남은 체력을 맞바꾼다(방어가 0이던 유닛은 체력 0이 되어 쓰러진다).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SA3-05 · 되쏘는 바람
벨루미르의 별 · 방어 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SA3-05.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SA3-05.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "되쏘는 바람". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering wind aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Wind Recoil (v3.95, formerly Whirlwind Bulwark): two high-elf archers at the front stand braced inside a tight protective whirlwind that turns enemy blows aside; from within the cyclone they loose return arrows that slip straight through the gaps of the attackers' armour as if the plate were not there. Defensive and counter-striking at once; silver gusts, flying leaves, taut bowstrings.
Scale (level 2 of 8): a small, local effect.
Banner — Belumir's Star: magic of belumir's star, signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms; palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑 사수는 맞으며 물러서지 않는다. 몸을 감싼 회오리가 칼을 흘리는 동안, 시위는 이미 칼 주인의 갑옷 틈을 겨누고 있다.
Game effect (Korean, mood only — never draw text or numbers): 아군 맨 앞 2기 방어 +2, 체력 +2, [방어무시](이번 턴 — 반격할 때도 상대 방어를 무시한다).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-16 · 갑옷 틈 송골매
벨루미르의 별 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/A3-16.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-16.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "갑옷 틈 송골매". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Falcon of the Belumir's Star — a fierce storm falcon with slate-grey wings and sharp eyes, built for the stooping dive.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Falcon: a fierce storm falcon with slate-grey wings and sharp eyes, built for the stooping dive. Silhouette: a sleek falcon in a steep dive, wings swept back. Materials: slate-grey and white barred feathers, yellow talons, hooked beak. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 갑옷의 이음매만 본다. 발톱은 쇠를 뚫지 않고, 쇠가 비켜 준 틈으로 들어간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IA3-3 · 궁사회 망토
벨루미르의 별 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IA3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IA3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "궁사회 망토". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Belumir's Star (catalyst; if unsure, a piece of armour). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Belumir's Star: high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud. Silhouette: slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바람이 감싸 도는 폭풍탑 궁사회의 망토. 날아든 화살이 옷자락에서 길을 잃는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IA3-6 · 번개 깃 화살
벨루미르의 별 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IA3-6.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IA3-6.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "번개 깃 화살". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Belumir's Star (catalyst + engraving; if unsure, a bow). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Belumir's Star: high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud. Silhouette: slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 폭풍탑 꼭대기에서 번개를 모아 깃에 감은 화살. 쏠 때마다 번개가 함께 날아간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-20 · 벨루미르의 펼친 책
벨루미르의 별 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/A3-20.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-20.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "벨루미르의 펼친 책". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Grimoire of the Belumir's Star — Belumir's open book come alive: a great book floating open with its pages fanned by wind, abstract star glyphs lifting off the pages as light.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Grimoire: Belumir's open book come alive: a great book floating open with its pages fanned by wind, abstract star glyphs lifting off the pages as light. Silhouette: an open book floating with pages fanned out. Materials: pale vellum pages, silver clasps and corners, glowing abstract star glyphs. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 벨루미르의 상징인 펼친 책이 몸을 얻었다. 바람이 넘기는 쪽마다 별의 문자가 떠올라, 갑옷을 지나 그 속을 읽고 꿰뚫는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-42 · 폭풍의 눈동자
벨루미르의 별 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/A3-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "폭풍의 눈동자". Depict exactly what this name describes.
Subject: an elite, commanding Heaven's Eye of the Belumir's Star — a single great eye fallen from Belumir's robe of a thousand eyes, floating in the calm centre of a storm, ringed by swirling winds and a torn scrap of starry robe; a stubborn defender who stands like a wall.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Heaven's Eye: a single great eye fallen from Belumir's robe of a thousand eyes, floating in the calm centre of a storm, ringed by swirling winds and a torn scrap of starry robe. Silhouette: one big floating eye inside a ring of wind. Materials: a glassy star-flecked iris, silver lashes, starry indigo cloth, storm swirls. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 벨루미르의 로브에 박힌 천 개의 눈 가운데 하나가 떨어져 나왔다. 폭풍 한가운데에 떠서 바깥이 거셀수록 더 고요히 노려보고, 함부로 다가온 자는 바람이 베어 낸다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A3-U2 · 하늘 요람 그리핀
벨루미르의 별 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-A3-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A3-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "하늘 요람 그리핀". Depict exactly what this name describes.
Subject: an elite, commanding Griffin of the Belumir's Star — a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Griffin: a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion. Silhouette: an eagle-fronted lion with wings raised. Materials: teal-grey feathers, tawny fur, golden beak and talons. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 바늘탑 꼭대기 관문 앞에 둥지를 틀었다. 바람의 용 시렐이 장난을 걸어도 관문도 둥지도 흔들리지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-A3-C3 · 장궁 그리핀 기사
벨루미르의 별 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/PN-A3-C3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-A3-C3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "장궁 그리핀 기사". Depict exactly what this name describes.
Subject: an elite, commanding Griffin of the Belumir's Star — a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Griffin: a griffin with the head, wings and foreclaws of a storm eagle and the body of a tawny lion. Silhouette: an eagle-fronted lion with wings raised. Materials: teal-grey feathers, tawny fur, golden beak and talons. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 폭풍탑 궁사회에서 기사 서임을 받은 그리핀. 장궁을 당길 손은 없지만, 날갯짓 한 번에 바람 화살이 장궁 사거리만큼 날아간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### A3-34 · 하피 여왕
벨루미르의 별 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/A3-34.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/A3-34.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "하피 여왕". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Harpy of the Belumir's Star — storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Harpy: storm harpies: bird-women with wide feathered wings for arms, hooked talons for feet and wild wind-tossed hair, nesting under the Needle's eaves. Silhouette: a bird-woman with wide wings and hooked talons, mid-swoop. Materials: storm-grey and teal feathers, sharp black talons, wild hair. Do NOT draw it as one of the high elves unless the name says so.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 머리 위에 늘 번개구름이 왕관처럼 맴돈다. 바늘탑 처마의 하피들은 모두 그녀의 둥지에서 났다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the cloud-piercing spire towers of Belumir's Needle, with archers' galleries and lookout platforms) with atmosphere and depth, softly focused, light atmospheric particles; swirling teal wind, fluttering robes and pages.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no forest elves or nature druids (moss trolls own the forest), no bulky muscles or heavy plate, no spellbooks or staffs in a unit's hands (they are archers now); star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-03 · 타들어 가는 도화선
도르마크의 심장불 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/B1-03.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-03.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "타들어 가는 도화선". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Fuse Spirit of the Dormak's Heartfire — a living length of tarred fuse cord that slithers like a snake, its sputtering spark-head serving as a face and trailing a thin thread of smoke.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Fuse Spirit: a living length of tarred fuse cord that slithers like a snake, its sputtering spark-head serving as a face and trailing a thin thread of smoke. Silhouette: a coiling cord with a fizzing spark at its tip. Materials: tarred hemp cord, black powder grit, bright sparks, wisps of grey smoke. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄 화약고에서 누군가 불을 붙인 채 잊어버린 도화선이 스스로 기어 나왔다. 닿는 것마다 불을 옮기며, 제 끝에 무엇이 매달려 있는지는 묻지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MB-04 · 도화선
도르마크의 심장불 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/MB-04.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MB-04.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도화선". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 불붙은 심지가 땅을 기어 적의 발밑까지 간다. 터지는 것은 한참 뒤다 — 고블린은 그 기다림을 좋아한다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛에게 피해 1, 화상 3.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-41 · 잿껍질 달팽이
도르마크의 심장불 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/B1-41.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-41.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "잿껍질 달팽이". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Lava Snail of the Dormak's Heartfire — a large snail with a shell crusted in grey ash over a glowing molten core and a slimy body that leaves a smoking trail; a stubborn defender who stands like a wall.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Lava Snail: a large snail with a shell crusted in grey ash over a glowing molten core and a slimy body that leaves a smoking trail. Silhouette: a slow snail under a big ash-crusted shell. Materials: ash-crust shell, molten glow beneath, smoking slime. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 식은 재로 껍데기를 덮고 그 속에 불을 품은 달팽이. 하루에 한 뼘을 가지만, 껍데기를 건드린 손은 그날 밤새 욱신거린다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-B1 · 덫 태우기
도르마크의 심장불 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/CS-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "덫 태우기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 고블린은 덫을 해체하지 않는다. 불을 던져 넣고, 터지는 것을 구경한다. 덫 앞에 서 있던 자들이 함께 구경하게 된다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다. 상대 맨 앞 2기에게 피해 1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PS-B1-1 · 역화
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/PS-B1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PS-B1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "역화". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of fire power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄의 화약은 늘 조금씩 넘친다. 넘친 불은 가장 크게 휘두른 자의 손에서 터진다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 중 공격이 가장 높은 1기가 자기 공격만큼 물리 피해를 받는다(자기 방어만큼 줄어든다).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SB1-05 · 기폭
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SB1-05.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SB1-05.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "기폭". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of fire power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Detonation: a goblin sapper behind a sandbag crouches and slams down a crude plunger; across the battlefield every enemy (dark silhouettes) that was already smouldering with embers bursts into flame at the same instant — a line of fiery explosions popping one after another, sparks and black smoke. Fortan chimneys in the haze behind. Chaotic, loud, joyful for the goblin.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄의 공병은 불씨가 저절로 타오르기를 기다리지 않는다. 신호 하나에 붙여 둔 불이 한꺼번에 터진다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛에게 화상 2. 그다음 상대 유닛의 화상을 모두 지금 터뜨린다 — 화상이 있던 유닛은 피해 2 더.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SB1-06 · 방어 포대
도르마크의 심장불 · 방어 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SB1-06.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SB1-06.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "방어 포대". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive fire attack striking the enemy ranks. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Game effect (Korean, mood only — never draw text or numbers): 적 유닛 2에게 피해 3.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SB1-08 · 화약고 폭파
도르마크의 심장불 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SB1-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SB1-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "화약고 폭파". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of fire power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Blowing the depot: a goblin sapper, ears flattened, slams a crude plunger while a whole row of powder kegs planted along the goblins' own line goes up at once in a chain of roaring fireballs; the blast throws the front enemy warriors (dark silhouettes) back in flames, and the goblins' own fighters nearby are knocked off their feet too, singed and smoking. Mood: reckless, devastating, a price paid on both sides.
Scale (level 2 of 8): a small, local effect.
Banner — Dormak's Heartfire: magic of dormak's heartfire, signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks; palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 화약고에 불씨 하나가 떨어지면, 포르탄의 모든 화약통이 같은 숨으로 대답한다.
Game effect (Korean, mood only — never draw text or numbers): 아군 화약통을 모두 터뜨려 부순다. 터뜨린 화약통이 N개면 상대 맨 앞부터 N기에게 체력 −N², [화상 2]. 아군 유닛 전체에게 체력 −N.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-13 · 잿불 박쥐 떼
도르마크의 심장불 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/B1-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "잿불 박쥐 떼". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Ember Bat of the Dormak's Heartfire — bats whose leathery wings glow ember-orange along every vein and drip falling sparks, flying in a dense cloud.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Ember Bat: bats whose leathery wings glow ember-orange along every vein and drip falling sparks, flying in a dense cloud. Silhouette: a swirling cloud of glowing-winged bats. Materials: thin leathery wings with glowing veins, falling cinders, ash. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 분화구 천장에 매달려 잿불을 먹고 자란 박쥐들. 한꺼번에 날아오르면 날개에 묻은 불씨가 비처럼 떨어진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IB1-5 · 도르마크의 화염포
도르마크의 심장불 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IB1-5.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IB1-5.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도르마크의 화염포". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Dormak's Heartfire (weapon/armour; if unsure, a bow). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 거인 도르마크의 심장불 조각을 장전한 휴대 화포. 멀리서 쏘고 물러나, 쏠 때마다 땅만 그을린다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-22 · 불 뿜는 키메라
도르마크의 심장불 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/B1-22.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-22.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "불 뿜는 키메라". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Chimera of the Dormak's Heartfire — a fused beast with a lion's head, a goat's head and a serpent for a tail, all three breathing fire, its hide cracked with glowing heat.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Chimera: a fused beast with a lion's head, a goat's head and a serpent for a tail, all three breathing fire, its hide cracked with glowing heat. Silhouette: a three-headed beast rearing behind a jet of flame. Materials: singed mane, curled horn, scales, cracked glowing hide, fire jets. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 심장불 가까이에서 짐승 셋이 한 몸으로 녹아 붙었다. 세 머리가 서로 먼저 불을 뿜으려 다투는 통에 숲은 늘 세 번 탄다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-42 · 끓는 용암 슬라임
도르마크의 심장불 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/B1-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "끓는 용암 슬라임". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Lava Slime of the Dormak's Heartfire — a bubbling blob of molten rock that never cools or hardens, with black crust plates floating on it and a vaguely face-like hollow; a stubborn defender who stands like a wall.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Lava Slime: a bubbling blob of molten rock that never cools or hardens, with black crust plates floating on it and a vaguely face-like hollow. Silhouette: a bulging, wobbling molten blob. Materials: molten orange magma, black crust plates, steam bubbles. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 분화구 바닥에서 흘러나와 식지도 굳지도 않는 용암 덩어리. 포탄이 떨어져도 출렁하고 삼킬 뿐이고, 내리친 칼은 녹은 채 돌아온다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-25 · 공성 두꺼비
도르마크의 심장불 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/B1-25.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-25.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "공성 두꺼비". Depict exactly what this name describes.
Subject: an elite, commanding Fire Toad of the Dormak's Heartfire — a boulder-sized toad with warty volcanic skin and a huge throat sac glowing with molten lava ready to be spat.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Fire Toad: a boulder-sized toad with warty volcanic skin and a huge throat sac glowing with molten lava ready to be spat. Silhouette: a squat toad with a swollen glowing throat. Materials: warty basalt-grey skin, glowing throat sac, molten spit, steam. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 목 주머니에 용암을 머금었다가 성벽 너머로 뱉는 두꺼비. 한 번 뱉으려면 한나절을 부풀어야 해서, 포르탄은 그동안 두꺼비에게 노래를 불러 준다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-31 · 화관의 불뱀
도르마크의 심장불 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/B1-31.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-31.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "화관의 불뱀". Depict exactly what this name describes.
Subject: an elite, commanding Fire Serpent of the Dormak's Heartfire — a long serpent with scales of glowing coal and molten fangs that swims up lava rivers.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Fire Serpent: a long serpent with scales of glowing coal and molten fangs that swims up lava rivers. Silhouette: a coiling serpent rising out of lava. Materials: coal-black scales with glowing edges, molten fangs, dripping lava. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 화관 산맥의 용암 강을 거슬러 헤엄치는 뱀. 물린 자리는 뱀이 떠난 뒤에도 한참을 탄다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-43 · 포르탄 가마 정령
도르마크의 심장불 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/B1-43.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-43.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "포르탄 가마 정령". Depict exactly what this name describes.
Subject: an elite, commanding Kiln Spirit of the Dormak's Heartfire — a hulking fire-brick kiln with riveted iron doors that has stood up and walks, its furnace mouth glowing and its chimney head smoking; a stubborn defender who stands like a wall.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Kiln Spirit: a hulking fire-brick kiln with riveted iron doors that has stood up and walks, its furnace mouth glowing and its chimney head smoking. Silhouette: a squat walking kiln with a chimney for a head. Materials: fire-brick, riveted iron doors, glowing furnace mouth, soot. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄에서 가장 오래 꺼지지 않은 가마가 일어서서 톱니 고개를 막아섰다. 숲에서 온 자들은 그 아궁이 앞에서 그을린 채 돌아갔다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B1-33 · 도르마크의 분화구
도르마크의 심장불 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/B1-33.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B1-33.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "도르마크의 분화구". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Living Crater of the Dormak's Heartfire — a walking volcanic cone on stubby rock legs, its open caldera glowing with Dormak's heart-fire and belching smoke and stones.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Living Crater: a walking volcanic cone on stubby rock legs, its open caldera glowing with Dormak's heart-fire and belching smoke and stones. Silhouette: a cone of rock with a glowing open top. Materials: basalt rock, glowing caldera, lava bombs, ash plume. Do NOT draw it as one of the goblin gunners unless the name says so.
Banner — Dormak's Heartfire: show the banner through element, palette and a few accents (cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks); palette: fire orange #ff6b3d with brass #d4893a and soot black.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 도르마크의 심장불이 숨을 쉬던 구멍 하나가 산을 떠나 걸어 나왔다. 숨을 들이쉴 때는 조용하고, 내쉴 때는 멀리 하늘에서 돌이 떨어진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the fortress-foundry of Fortan, chimneys and gun bastions) with atmosphere and depth, softly focused, light atmospheric particles; embers, flame light, gunpowder smoke.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no magic circles or spellcasting (their fire is gunpowder and engineering), no elegant armour, no dwarven greatswords.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B2-05 · 두르크하임 견습공
소르그림의 방패 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/B2-05.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B2-05.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "두르크하임 견습공". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Sorgrim's Shield — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-B2 · 봉인 쐐기
소르그림의 방패 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/CS-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "봉인 쐐기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of metal power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 주문에 몇 번 데어 본 드워프는 쇠쐐기를 만들었다. 두르크하임의 쐐기가 박힌 주문은 다시 열리지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B2-07 · 걸어 다니는 리벳 방패
소르그림의 방패 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/B2-07.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B2-07.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "걸어 다니는 리벳 방패". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Awakened Shield of the Sorgrim's Shield — a heavy riveted tower shield that walks on its own on short iron feet, its dents studded with extra rivets.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Awakened Shield: a heavy riveted tower shield that walks on its own on short iron feet, its dents studded with extra rivets. Silhouette: a tall shield standing upright on little legs. Materials: riveted steel, dents, brass boss, worn leather straps. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 주인을 잃은 리벳 방패가 혼자 일어나 앞을 막는다. 찌그러진 자리에는 리벳이 저절로 하나 더 솟고, 막고 나면 그대로 내리친다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-B2-1 · 파쇄 망치
소르그림의 방패 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/RS-B2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-B2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "파쇄 망치". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive metal attack striking the enemy ranks; a weakening curse sinking over the enemies. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 두르크하임의 장인은 갑옷을 만들 줄 알기에 부술 줄도 안다. 이음매 하나만 치면 된다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 2기 방어 −2, 피해 2.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SB2-01 · 철갑 돌진
소르그림의 방패 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SB2-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SB2-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철갑 돌진". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering metal aura rising around allied warriors. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Sorgrim's Shield: magic of sorgrim's shield, signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls; palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Game effect (Korean, mood only — never draw text or numbers): 아군 뒤 2칸의 유닛 공격 +2, 방어 +1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B2-15 · 강철 대장장이
소르그림의 방패 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/B2-15.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B2-15.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "강철 대장장이". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Sorgrim's Shield — an armed fighter wielding a weapon typical of the banner.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IB2-6 · 골렘 핵
소르그림의 방패 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IB2-6.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IB2-6.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "골렘 핵". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Sorgrim's Shield (engraving; if unsure, a carved stone or engraved plate). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 거대 골렘에서 꺼낸 핵. 몸에 새기면 걸어 다니는 요새가 된다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B2-U1 · 두르크하임 방패공
소르그림의 방패 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/PN-B2-U1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B2-U1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "두르크하임 방패공". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Sorgrim's Shield — an armed fighter wielding a weapon typical of the banner.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Sorgrim's Shield: stocky dwarves with braided iron-grey beards, and the riveted golems and automatons they forge. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: thick steel plate, rivets, grey adamant (petrified giant bone), chains, forge hammers, glowing forge seams. Signature motifs: forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 제 손으로 두드린 방패만 든다. 방패에 남은 흠은 모두 그가 막아 낸 날의 수다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B2-42 · 과열 압착기
소르그림의 방패 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/B2-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B2-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "과열 압착기". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Automaton of the Sorgrim's Shield — a clockwork automaton of brass and steel built for a single task, with exposed gears, pistons and a ticking core; a reckless charging attacker.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Automaton: a clockwork automaton of brass and steel built for a single task, with exposed gears, pistons and a ticking core. Silhouette: an upright mechanical figure with exposed gears. Materials: brass, steel, gears, springs, pistons. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B2-U2 · 광맥 갑충
소르그림의 방패 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-B2-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B2-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "광맥 갑충". Depict exactly what this name describes.
Subject: an elite, commanding Ore Beetle of the Sorgrim's Shield — a large beetle whose shell has turned to raw ore — veins of iron and grey adamant — from gnawing Sorgrim's exposed sinew-veins.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Ore Beetle: a large beetle whose shell has turned to raw ore — veins of iron and grey adamant — from gnawing Sorgrim's exposed sinew-veins. Silhouette: a heavy domed beetle. Materials: raw ore shell, iron veins, grey adamant, rock dust. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 소르그림의 힘줄이 드러난 광맥을 갉아 먹다 껍질이 광석이 된 딱정벌레. 그 껍질은 녹지도 휘지도 않아서, 내리친 쪽 손목이 먼저 운다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B2-C3 · 철골 망치 거상
소르그림의 방패 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/PN-B2-C3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B2-C3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "철골 망치 거상". Depict exactly what this name describes.
Subject: an elite, commanding Colossus of the Sorgrim's Shield — a towering forged colossus of steel many times the height of a golem, with a furnace heart glowing through its chest plates.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Colossus: a towering forged colossus of steel many times the height of a golem, with a furnace heart glowing through its chest plates. Silhouette: a giant humanoid machine filling the frame. Materials: riveted steel plate, furnace glow, steam vents, chains. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 철골 산맥의 광맥에서 캔 쇠로만 빚은 거상. 두 팔이 통째로 망치라, 막고 나면 저절로 내리친다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B2-33 · 오르둔의 뼈 기사
소르그림의 방패 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/B2-33.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B2-33.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "오르둔의 뼈 기사". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Living Armour of the Sorgrim's Shield — an empty suit of heavy plate armour that moves on its own, hollow inside, with only a faint forge glow showing through the eye slit and the joints.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Living Armour: an empty suit of heavy plate armour that moves on its own, hollow inside, with only a faint forge glow showing through the eye slit and the joints. Silhouette: an armoured knight with nothing inside the visor. Materials: thick steel or grey adamant plate, rivets, chainmail, faint forge glow. Do NOT draw it as one of the dwarves unless the name says so.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 오르둔의 등뼈에서 캐낸 회색 아다만트로 지은 갑옷이 입을 사람 없이 일어섰다. 거인의 뼈로 된 기사는 무릎 꿇는 법을 모른다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the underground forge-city of Durkheim) with atmosphere and depth, softly focused, light atmospheric particles; cold steel sheen, sparks from an anvil, rivets.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no thorns or plant armour, no wizardry or wands; golems are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-05 · 볼타리움 학도
케라운의 벼락 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/B3-05.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-05.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "볼타리움 학도". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Keraun's Thunder — a spellcaster channelling lightning power.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-B3 · 합선
케라운의 벼락 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/CS-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "합선". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of lightning power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 어떤 주문이든 결국은 흐름이다. 볼타리움의 노움은 흐름의 길목에 구리선 한 가닥을 걸쳐 둘 뿐이다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IB3-3 · 피뢰 지팡이
케라운의 벼락 · 아이템 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/IB3-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IB3-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피뢰 지팡이". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Keraun's Thunder (catalyst; if unsure, a staff). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 2 of 8): a simple object.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 끝에 피뢰침을 단 지팡이. 모인 번개가 저절로 튄다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MC-08 · 파문
케라운의 벼락 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/MC-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MC-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "파문". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive lightning attack striking the enemy ranks; a cleansing wave washing away enchantments. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Keraun's Thunder: magic of keraun's thunder, signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints; palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Game effect (Korean, mood only — never draw text or numbers): 적 유닛 1에게 피해 2. 상대 맨 앞 2기는 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고 피해 2를 더 받는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-13 · 볼타리움 호문쿨루스
케라운의 벼락 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/B3-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "볼타리움 호문쿨루스". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Homunculus of the Keraun's Thunder — a small artificial person grown in a glass vat and woken by lightning, pale-skinned, with copper wires and electrodes still clipped to its body.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Homunculus: a small artificial person grown in a glass vat and woken by lightning, pale-skinned, with copper wires and electrodes still clipped to its body. Silhouette: a tiny figure stepping out of a glass jar. Materials: pale skin, copper electrodes, glass vat, glowing fluid, brass gauge. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 볼타리움 연구생들이 유리병 속에서 번개로 깨운 작은 사람. 밤새 번개의 흐름을 받아 적는데, 그 기록은 늘 "추가 실험이 필요하다"로 끝난다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### C4-1 · 별을 읽는 보주
케라운의 벼락 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/C4-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/C4-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "별을 읽는 보주". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Keraun's Thunder (catalyst; if unsure, a glowing orb on a small stand). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 이사크가 별의 문자를 읽을 때 쓴 보주. 한 번 튄 번개가 다음 과녁을 스스로 찾아간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-B3-U1 · 피뢰탑 자석령
케라운의 벼락 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/PN-B3-U1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-B3-U1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피뢰탑 자석령". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Magnet Spirit of the Keraun's Thunder — a spirit of iron struck by lightning countless times atop a lightning tower, with nails, keys and iron filings clinging to its body in magnetic swirls.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Magnet Spirit: a spirit of iron struck by lightning countless times atop a lightning tower, with nails, keys and iron filings clinging to its body in magnetic swirls. Silhouette: a figure surrounded by orbiting iron bits. Materials: magnetised iron, iron filings, nails, copper rod, blue sparks. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 피뢰탑 꼭대기에서 벼락을 수없이 맞은 쇠붙이가 정령이 되었다. 근처의 못과 열쇠가 그쪽으로 끌려가고, 아군의 마법도 그쪽으로 조금 더 세게 휜다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-42 · 가시촉수 구름해파리
케라운의 벼락 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/B3-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "가시촉수 구름해파리". Depict exactly what this name describes.
Subject: an elite, commanding Cloud Jellyfish of the Keraun's Thunder — a translucent jellyfish drifting in the sky, its bell like a small cloud and its long trailing tentacles conducting lightning down to the ground; a stubborn defender who stands like a wall.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Cloud Jellyfish: a translucent jellyfish drifting in the sky, its bell like a small cloud and its long trailing tentacles conducting lightning down to the ground. Silhouette: a floating bell with long hanging tentacles. Materials: translucent cloud bell, glowing tentacles, arcs. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 폭풍 구름 사이를 떠다니며 촉수로 벼락을 땅에 흘려보내는 해파리. 건드린 자는 그 벼락이 지나는 길이 된다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-29 · 케라운의 뇌운
케라운의 벼락 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/B3-29.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-29.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운의 뇌운". Depict exactly what this name describes.
Subject: an elite, commanding Thundercloud of the Keraun's Thunder — a brooding living storm cloud hanging low over the ground, lightning flickering inside and a vague face in its billows.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Thundercloud: a brooding living storm cloud hanging low over the ground, lightning flickering inside and a vague face in its billows. Silhouette: a dark heavy cloud with lightning flickering underneath. Materials: dark storm vapour, lightning flashes, rain. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 뇌명 고원 위에 걷히지 않고 머무는 먹구름. 그 아래서 쏘는 마법에는 구름이 번개를 한 줌씩 얹어 준다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-34 · 폭뢰 기관
케라운의 벼락 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/B3-34.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-34.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "폭뢰 기관". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Lightning Engine of the Keraun's Thunder — a walking machine of brass, copper coils and riveted steel built by Voltarium scholars, studded with glass lightning jars and electrodes.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Lightning Engine: a walking machine of brass, copper coils and riveted steel built by Voltarium scholars, studded with glass lightning jars and electrodes. Silhouette: a boxy walking machine crowned with coils. Materials: copper coils, brass, riveted steel, glass jars, porcelain insulators. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### B3-36 · 천둥 뇌수
케라운의 벼락 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/B3-36.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/B3-36.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "천둥 뇌수". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Raiju (Thunder Beast) of the Keraun's Thunder — a wolf-and-weasel-like beast from Japanese legend that falls to earth with lightning, with crackling blue-white fur and a jagged lightning-bolt tail.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Raiju (Thunder Beast): a wolf-and-weasel-like beast from Japanese legend that falls to earth with lightning, with crackling blue-white fur and a jagged lightning-bolt tail. Silhouette: a crouching beast with bristling fur and a zigzag tail. Materials: blue-white crackling fur, lightning tail, sparks. Do NOT draw it as one of the gnomes unless the name says so.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 벼락이 칠 때 하늘에서 함께 떨어진다는 짐승. 그가 웅크린 자리에서는 볼타리움의 장치들이 저절로 더 세게 돈다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lightning-rod city of Voltarium on the thundering plateau) with atmosphere and depth, softly focused, light atmospheric particles; crackling electric arcs, glowing coils.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no mystical magic or wands — their power is science and machines.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-G1 · 덫 짓밟기
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/CS-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "덫 짓밟기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of earth power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운의 오크는 덫을 피해 가는 법을 모른다. 대신 덫이 일어서기 전에 밟아 부수는 법은 안다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-03 · 돌 던지는 개코원숭이
고르바스의 발톱 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/G1-03.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-03.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "돌 던지는 개코원숭이". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Baboon of the Gorvath's Claw — a big steppe baboon with a dog-like muzzle, long yellowed canines, a grey-ochre mane over the shoulders and calloused hands that pick up and fling stones.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Baboon: a big steppe baboon with a dog-like muzzle, long yellowed canines, a grey-ochre mane over the shoulders and calloused hands that pick up and fling stones. Silhouette: hunched four-limbed ape with a maned shoulder hump and long throwing arms. Materials: coarse ochre-grey fur, bare leathery face and palms, yellowed fangs, pebbles. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 울부짖는 초원의 바위 언덕에 사는 개코원숭이. 가르운 아이들의 돌팔매를 흉내 내다가, 이제는 아이들보다 잘 던진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-01 · 송곳니 돌격
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/MG-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 돌격". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: an empowering earth aura rising around allied warriors. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Game effect (Korean, mood only — never draw text or numbers): 아군 뒤 2칸의 유닛 공격 +1 +1C.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G1-1 · 늑대 기습
고르바스의 발톱 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/RS-G1-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G1-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "늑대 기습". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a destructive earth attack striking the enemy ranks; an empowering earth aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 울부짖는 초원의 늑대가 먼저 물어뜯고, 그 등에 탄 오크가 벌어진 갑옷을 마저 찢는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛에게 피해 2. 아군 뒤 2칸의 유닛 공격 +1, [관통].
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-07 · 초원 켄타우로스
고르바스의 발톱 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/G1-07.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-07.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "초원 켄타우로스". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Centaur of the Gorvath's Claw — steppe centaurs: a weathered, war-painted human upper body with braided hair on a stocky dun horse body, carrying horn bows and obsidian-tipped arrows.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Centaur: steppe centaurs: a weathered, war-painted human upper body with braided hair on a stocky dun horse body, carrying horn bows and obsidian-tipped arrows. Silhouette: tall horse-bodied archer with a raised bow arm, mid-gallop. Materials: dun horsehide, braided mane and hair, rough leather, horn bow, obsidian arrowheads, bone beads. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 울부짖는 초원을 오크보다 먼저 달린 사냥꾼. 하루 종일 바람을 등지고 달리다가, 활시위는 단 한 번 당긴다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MC-01 · 웅크린 늑대
고르바스의 발톱 · 방어 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/MC-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MC-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "웅크린 늑대". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a burst of earth power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Crouching wolves (v3.95): a pack of grey wolves and Rockfist orc hunters press flat to the ground in tall dry grass, fangs hidden, ears back, coiled and silent; facing them a line of enemy warriors (dark silhouettes) hesitate, weapons lowered and wavering, unsure where to strike. Low eye-level, tense calm before the spring, ochre dusk light.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 늑대 무리가 이빨을 감추고 땅에 몸을 붙인다. 덤벼들던 적은 어디를 물어야 할지 몰라 머뭇거린다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체의 공격을 이번 턴 1로 고정한다. 그래서 줄어든 공격의 합만큼 상대 유닛 전체 공격 −(이번 턴).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G1-C1 · 바위송곳니 막내
고르바스의 발톱 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/PN-G1-C1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G1-C1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바위송곳니 막내". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Gorvath's Claw — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 부족에서 가장 어리지만 주먹은 형들과 같다. 누가 뭐라 해도 주먹은 줄지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG1-09 · 몸통 박치기
고르바스의 발톱 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SG1-09.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-09.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "몸통 박치기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of earth power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 무리가 한 덩어리로 몸을 던진다. 부딪친 쪽도 부서지지만, 맞은 쪽은 더 크게 부서진다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 체력 −(아군 유닛 수 × 2). 그 뒤 아군 유닛마다 체력 −(아군 유닛 수).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-14 · 돌격 미노타우로스
고르바스의 발톱 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/G1-14.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-14.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "돌격 미노타우로스". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Minotaur of the Gorvath's Claw — bull-headed giants of the steppe with great forward-curving horns, a shaggy mane, cloven hooves and scarred hide, who won Gorvath's notice in the duel ring.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Minotaur: bull-headed giants of the steppe with great forward-curving horns, a shaggy mane, cloven hooves and scarred hide, who won Gorvath's notice in the duel ring. Silhouette: towering bull-headed humanoid with forward-swept horns and a lowered head. Materials: dark bull hide, shaggy mane, cracked horns, iron nose ring, rough leather harness, stone-headed axes. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운 결투장에서 오크 열을 들이받고 고르바스의 눈에 들었다. 지금도 앞에 무엇이 있는지는 부딪친 뒤에 안다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG1-4 · 바위 주술 토템
고르바스의 발톱 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IG1-4.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG1-4.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바위 주술 토템". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw (holy relic; if unsure, a sacred relic (chalice, reliquary or holy symbol — not a plain cross)). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 주술사가 지고 다니는 작은 바위 토템. 저주는 멀리서 걸고, 되받는 주먹은 닿지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG1-6 · 송곳니 전쟁 도끼
고르바스의 발톱 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IG1-6.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG1-6.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 전쟁 도끼". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw (weapon/armour + engraving; if unsure, an axe). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 족장의 전쟁 도끼. 한 번 휘두르면 앞에 선 자를 넘어 그 뒤의 자까지 쪼갠다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### RS-G1-3 · 대지 가르기
고르바스의 발톱 · 공용 마법 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/RS-G1-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/RS-G1-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "대지 가르기". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive earth attack striking the enemy ranks; an empowering earth aura rising around allied warriors; a weakening curse sinking over the enemies. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 주먹 하나로 땅을 갈랐다는 오크의 노래는 과장이 아니다. 고르바스가 그 주먹을 허락했을 뿐이다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 유닛 방어 −1. 상대 유닛 전체에게 물리 피해 3. 아군 전체 공격 +1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-21 · 흑요 켄타우로스 궁수
고르바스의 발톱 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/G1-21.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-21.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "흑요 켄타우로스 궁수". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Centaur of the Gorvath's Claw — steppe centaurs: a weathered, war-painted human upper body with braided hair on a stocky dun horse body, carrying horn bows and obsidian-tipped arrows.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Centaur: steppe centaurs: a weathered, war-painted human upper body with braided hair on a stocky dun horse body, carrying horn bows and obsidian-tipped arrows. Silhouette: tall horse-bodied archer with a raised bow arm, mid-gallop. Materials: dun horsehide, braided mane and hair, rough leather, horn bow, obsidian arrowheads, bone beads. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 우두머리만 노리는 켄타우로스. 쓰러뜨릴 때마다 활대에 홈을 새겨, 이제 활대가 홈으로 덮였다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-26 · 전쟁군주 투르크
고르바스의 발톱 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/G1-26.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-26.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "전쟁군주 투르크". Depict exactly what this name describes.
Subject: an elite, commanding member of the Gorvath's Claw — a close-combat brawler, beast or living war machine — bare fists, claws, horns or sheer armoured bulk.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G1-U2 · 곰가죽 광전사
고르바스의 발톱 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-G1-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G1-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "곰가죽 광전사". Depict exactly what this name describes.
Subject: an elite, commanding Werebear of the Gorvath's Claw — a werebear: a warrior who wore a bear's hide until it grew into his own skin, now a hulking upright bear-man with claws, a bear's head and war paint in the fur.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Werebear: a werebear: a warrior who wore a bear's hide until it grew into his own skin, now a hulking upright bear-man with claws, a bear's head and war paint in the fur. Silhouette: upright hulking bear-man with a human fighting stance. Materials: coarse bear fur, hide, claws, bone charms, war paint. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 맨손으로 잡은 곰의 가죽을 쓰고 싸우다가, 어느 날 그 가죽이 벗겨지지 않았다. 그 뒤로 무엇으로도 기세를 꺾을 수 없다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-29 · 그롬의 바위 정령
고르바스의 발톱 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/G1-29.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-29.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "그롬의 바위 정령". Depict exactly what this name describes.
Subject: an elite, commanding Rock Spirit of the Gorvath's Claw — rock spirits of Grom: boulders drawn together by the great earth spirit's slow will into a powerful, roughly humanoid shape, with dust swirling at the seams and ochre light deep inside.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Rock Spirit: rock spirits of Grom: boulders drawn together by the great earth spirit's slow will into a powerful, roughly humanoid shape, with dust swirling at the seams and ochre light deep inside. Silhouette: loosely joined boulders hovering in a broad humanoid form. Materials: rough boulders, gravel, dust, faint ochre glow in the cracks. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 대지의 대정령 그롬이 백 년에 걸쳐 한 마디를 하자 바위들이 모여 일어섰다. 그 한 마디가 무엇이었는지는 바위들도 아직 모른다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G1-34 · 고르바스의 고르곤
고르바스의 발톱 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/G1-34.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G1-34.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고르바스의 고르곤". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring Gorgon of the Gorvath's Claw — a gorgon of Gorvath's crags: a tall woman half turned to grey stone, with living stone snakes for hair and ochre-glowing eyes whose stare petrifies.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — Gorgon: a gorgon of Gorvath's crags: a tall woman half turned to grey stone, with living stone snakes for hair and ochre-glowing eyes whose stare petrifies. Silhouette: tall figure crowned with a writhing mass of snakes. Materials: cracked grey stone skin, ochre-scaled stone snakes, rock dust, hide wraps. Do NOT draw it as one of the orcs unless the name says so.
Banner — Gorvath's Claw: show the banner through element, palette and a few accents (giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds); palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 고르바스의 잠을 깨우려는 자를 돌로 바꾼다. 왕좌봉 기슭에 늘어선 돌 무리는 대부분 한때 광부였다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the howling steppe of Garun with its nomad camps) with atmosphere and depth, softly focused, light atmospheric particles; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-04 · 어린 드라이어드
베르단의 뿔 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/G2-04.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-04.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "어린 드라이어드". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Dryad of the Verdan's Antler — dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (never elves, no pointed ears).
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Creature kind — Dryad: dryads of the Eilen forest: slender women of living wood with smooth bark skin, leaf-and-blossom hair and twig fingers, each bound to her own tree (never elves, no pointed ears). Silhouette: slender willowy figure with long leaf-hair flowing like branches. Materials: smooth pale bark, leaves, blossoms, vines, sap droplets. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 덩굴 감긴 어린 나무에서 막 걸어 나온 드라이어드. 누가 지나가면 잠든 그녀보다 덩굴이 먼저 깬다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PS-G2-1 · 나이테
베르단의 뿔 · 방어 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/PS-G2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PS-G2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "나이테". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering forest aura rising around allied warriors. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 고목은 한 해를 버틸 때마다 테를 하나 두른다. 두른 테는 벗겨지지 않는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 뒤 1칸의 유닛 체력 +2, 이번 턴 [버팀: 체력], 방어 +1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### US-G2-1 · 재생의 숲
베르단의 뿔 · 공용 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/US-G2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/US-G2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "재생의 숲". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: an empowering forest aura rising around allied warriors; a shell of thorns that punishes attackers. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 대정령 드리엔이 지나간 자리. 베인 가지가 그 자리에서 다시 붙고, 붙은 자리마다 가시가 돋는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 뒤 1칸의 유닛 체력 +3, [가시 2].
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-G2 · 이끼 덮기
베르단의 뿔 · 공격 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/CS-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "이끼 덮기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of forest power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 이끼는 무엇이든 덮는다. 덮인 주문은 숨이 막혀 꺼지고, 그 위를 밟고 가는 트롤의 상처는 이끼 밑에서 다시 자란다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다. 무효로 했으면 아군 맨 앞 2기 공격 +1, 체력 +2.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-41 · 트롤 투창수
베르단의 뿔 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/G2-41.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-41.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "트롤 투창수". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Verdan's Antler — an armed fighter wielding a weapon typical of the banner; a reckless charging attacker.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG2-3 · 이끼 부적
베르단의 뿔 · 아이템 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/IG2-3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG2-3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "이끼 부적". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler (holy relic; if unsure, a sacred relic (chalice, reliquary or holy symbol — not a plain cross)). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 2 of 8): a simple object.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 오래된 바위의 이끼를 엮은 부적.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MC-11 · 침묵
베르단의 뿔 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/MC-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MC-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "침묵". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive forest attack striking the enemy ranks; enemy weapons frozen and stopped mid-swing. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 2 of 8): a small, local effect.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 2기의 공격이 0이 되고, 피해 3을 받는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG2-6 · 베르단의 뿌리
베르단의 뿔 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IG2-6.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG2-6.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 뿌리". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler (engraving; if unsure, a carved stone or engraved plate). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲의 용 베르단의 뿌리가 혈관을 따라 자란다. 뻗은 뿌리는 갑옷의 틈을 비집고 들어가 벌린다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### M4-1 · 트렌트의 나이테
베르단의 뿔 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/M4-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/M4-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "트렌트의 나이테". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Verdan's Antler (engraving; if unsure, a carved stone or engraved plate). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 천 년 트렌트의 나이테를 몸에 새긴다. 해마다 한 겹씩 두꺼워진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-14 · 숲의 무게
베르단의 뿔 · 공용 마법 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/MG-14.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-14.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "숲의 무게". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of forest power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 3 of 8): an effect over a few targets.
Banner — Verdan's Antler: magic of verdan's antler, signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots; palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 숲 전체가 한쪽으로 기운다. 버텨 온 몸뚱이들의 무게가 그대로 쏟아져, 앞을 막은 것부터 차례로 짓눌린다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛의 남은 체력을 모두 더한 만큼, 상대 맨 앞 유닛부터 공격 → 방어 → 체력 순으로 깎는다(공격 · 방어는 이번 턴). 다 깎아 쓰러뜨리면 남은 몫은 다음 유닛에게 넘어간다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G2-U1 · 덩굴손 픽시
베르단의 뿔 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/PN-G2-U1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G2-U1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "덩굴손 픽시". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Pixie of the Verdan's Antler — tiny vine pixies with leaf wings and bodies wrapped in curling tendrils, shooting thorn darts from twig bows.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Pixie: tiny vine pixies with leaf wings and bodies wrapped in curling tendrils, shooting thorn darts from twig bows. Silhouette: tiny winged figure trailing curling tendrils. Materials: leaf wings, tendrils, petals, glowing pollen, twig bow. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 몸에 감은 덩굴손이 상처를 바로 묶는다. 가시 화살을 쏘는 손만 덩굴에서 빼 두었다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-42 · 독가시 말벌떼
베르단의 뿔 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/G2-42.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-42.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "독가시 말벌떼". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Wasp of the Verdan's Antler — venomthorn wasps of the thorn forest, each as long as a finger, with thorn-tipped stings and nests of chewed bark; a reckless charging attacker.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Wasp: venomthorn wasps of the thorn forest, each as long as a finger, with thorn-tipped stings and nests of chewed bark. Silhouette: a dense buzzing swarm around a papery nest. Materials: striped chitin, translucent wings, thorn stings, papery bark nest. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G2-C2 · 가시덤불 덩굴귀
베르단의 뿔 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/PN-G2-C2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G2-C2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "가시덤불 덩굴귀". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Vine Horror of the Verdan's Antler — vine horrors of the Rusty Swamp's edge: shambling tangles of thorny vines and briars that knot themselves into a beast-like shape.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Vine Horror: vine horrors of the Rusty Swamp's edge: shambling tangles of thorny vines and briars that knot themselves into a beast-like shape. Silhouette: hulking shambling mass of coiled vines with thorny lashing tendrils. Materials: thorny briars, rust-stained vines, thistle heads, sap, dead leaves. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 녹슨 늪 가장자리를 기어 다니는 가시덤불. 뽑으려 하면 뿌리가 한 뼘씩 더 깊어진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-27 · 베르단의 레쉬
베르단의 뿔 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/G2-27.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-27.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 레쉬". Depict exactly what this name describes.
Subject: an elite, commanding Leshy of the Verdan's Antler — the leshy of Verdan: a tall, gaunt forest lord with a stag-antlered head, a beard of moss and lichen, a body of bark and twigs and glowing green eyes.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Leshy: the leshy of Verdan: a tall, gaunt forest lord with a stag-antlered head, a beard of moss and lichen, a body of bark and twigs and glowing green eyes. Silhouette: tall gaunt figure crowned with stag antlers. Materials: bark, moss beard, lichen, antlers, leaves, twigs. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 사슴뿔을 쓴 숲의 주인. 베르단의 숲에 허락 없이 든 자는 한참을 걸은 뒤에야 제자리를 돌았음을 안다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G2-U2 · 균사 뿌리지기
베르단의 뿔 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-G2-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G2-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "균사 뿌리지기". Depict exactly what this name describes.
Subject: an elite, commanding Mushroom Folk of the Verdan's Antler — walking mushroom folk of the forest floor: squat stalk bodies under broad caps, with gills, glowing spores and white mycelium threads linking them to the roots and to each other.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Mushroom Folk: walking mushroom folk of the forest floor: squat stalk bodies under broad caps, with gills, glowing spores and white mycelium threads linking them to the roots and to each other. Silhouette: stubby stalk body under a wide cap. Materials: spongy pale flesh, gills, glowing spores, white mycelium threads, damp soil. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 거목 도시의 뿌리 사이에 균사를 뻗은 버섯족. 실바니엘의 뿌리들이 서로 소식을 나누는 것은 그 덕이다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-43 · 벼락 맞은 분노목
베르단의 뿔 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/G2-43.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-43.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "벼락 맞은 분노목". Depict exactly what this name describes.
Subject: an elite, commanding Treant of the Verdan's Antler — treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks; a reckless charging attacker.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Treant: treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks. Silhouette: towering trunk body with spreading branch arms and root feet. Materials: rough bark, moss, leaves, knotted roots, amber sap. Do NOT draw it as one of the trolls unless the name says so.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G2-35 · 고목 장로회
베르단의 뿔 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/G2-35.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G2-35.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "고목 장로회". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring member of the Verdan's Antler — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Banner — Verdan's Antler: tall moss trolls with long, lanky, moss-covered limbs, and treants (living trees). Silhouette: tall, hunched and long-armed; treants tower like ancient trees. Materials: bark armour, moss, thorns, vines, roots, mushrooms, amber sap. Signature motifs: thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the giant-tree city of Sylvaniel in the great forest of Eilen) with atmosphere and depth, softly focused, light atmospheric particles; glowing moss, thorny vines, drifting leaves.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no elves (elves belong to the Storm High Elves), no fire magic, no huge humanoid 'giants' (the giants are the land itself).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### CS-G3 · 씻김의 노래
마렌시아의 노래 · 공격 마법 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/CS-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/CS-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "씻김의 노래". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a weakening curse sinking over the enemies; a cleansing wave washing away enchantments. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 1 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 샘물 무녀단의 노래는 걸어 둔 것을 씻어 낸다. 펼치려던 주문이 물에 녹으면, 그 주문을 믿던 자들의 축복과 투지도 함께 씻겨 내려간다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞 마법 1장을 [무효]로 한다. 무효로 했으면 상대 유닛 전체의 [보호막]·[가시]·[저주 면역]·[수호]가 꺼지고 공격 −1.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-01 · 석호 수습 무녀
마렌시아의 노래 · 유닛 · 레벨 1 · 고급 — 받은 그림은 `tools/art/inbox/G3-01.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-01.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "석호 수습 무녀". Depict exactly what this name describes.
Subject: a low-ranking, ordinary member of the Marencia's Song — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 1 of 8): small and humble: an ordinary body, light gear.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-08 · 물결의 메아리
마렌시아의 노래 · 유닛 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/G3-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "물결의 메아리". Depict exactly what this name describes.
Subject: a low-ranking, ordinary Echo of the Marencia's Song — a living echo of Marencia's song: rings of rippling water and light shaped like a faint singing figure that repeats every note a little softer.
Scale (level 2 of 8): small and humble: an ordinary body, light gear.
Creature kind — Echo: a living echo of Marencia's song: rings of rippling water and light shaped like a faint singing figure that repeats every note a little softer. Silhouette: faint figure dissolving into expanding ring ripples. Materials: rippling water rings, light, foam, mist. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 무녀들이 부른 마렌시아의 노래가 석호를 한 바퀴 돌고 몸을 얻었다. 그 물결에 닿은 상처는 소리 없이 닫힌다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-11 · 뒤집힌 물거울
마렌시아의 노래 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/MG-11.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-11.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뒤집힌 물거울". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: warriors forced to trade places by a trick of magic. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Overturned water-mirror: two enemy warriors (dark silhouettes) at the front stand at the edge of a still lagoon pool; in the water their reflections are upside down and wrong — the shield-bearer's reflection holds a raised blade, the swordsman's reflection hides behind a shield — and the real men falter, their stances flipping to match, dazed eyes glazed by the shimmer. A Selenea songstress, small in frame, touches the water's surface. Mood: eerie, mesmerising, quiet; no wave, no explosion.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물거울에 비친 전사는 칼 대신 방패를 든 자신을 본다. 휘두르려던 힘은 껍질처럼 굳고, 무녀의 노래는 그 껍질째 꿰뚫는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 맨 앞부터 유닛 2기의 공격과 방어를 맞바꾸고 [홀림]으로 만든다([저주 면역] 유닛은 빼고).
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG3-02 · 물빛 신기루
마렌시아의 노래 · 공용 마법 · 레벨 2 · 고급 — 받은 그림은 `tools/art/inbox/SG3-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG3-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "물빛 신기루". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a burst of water power. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Art direction: Water mirage: over a glittering lagoon a heat-haze of water-light bends the air. Two enemy soldiers (dark silhouettes) are caught in it and their reflections in the water are swapped — a hulking brute's reflection is a frail reed-thin figure and a slight one's reflection is a towering giant — the real bodies stagger as they take on their reflections. Shimmering, disorienting, no explosion.
Scale (level 2 of 8): a small, local effect.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물빛이 일렁이면 눈에 비친 것이 뒤집힌다. 거인은 갈대처럼 휘청이고, 겁쟁이는 제 그림자에 놀라 칼을 휘두른다. 누가 그렇게 될지는 물결만 안다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 가운데 무작위 2기의 공격과 체력을 맞바꾸고 [홀림]으로 만든다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-41 · 물살 돌격 범고래
마렌시아의 노래 · 유닛 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/G3-41.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-41.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "물살 돌격 범고래". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened Orca of the Marencia's Song — orcas that ride the currents into battle, glossy black and white with tall dorsal fins; a reckless charging attacker.
Scale (level 3 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Creature kind — Orca: orcas that ride the currents into battle, glossy black and white with tall dorsal fins. Silhouette: sleek black-and-white body with a tall dorsal fin. Materials: glossy black and white skin, teeth, foam. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 물살을 등에 업고 단숨에 적진으로 파고드는 범고래. 뭍에서는 꼼짝 못 하지만, 그 전에 싸움이 끝난다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG3-4 · 진주 성표
마렌시아의 노래 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IG3-4.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG3-4.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "진주 성표". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Marencia's Song (holy relic; if unsure, a sacred relic (chalice, reliquary or holy symbol — not a plain cross)). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 깊은 바다의 진주를 박은 성표. 가슴에 달면 바다가 한 모금 숨을 불어넣는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### IG3-6 · 인어의 비늘
마렌시아의 노래 · 아이템 · 레벨 3 · 고급 — 받은 그림은 `tools/art/inbox/IG3-6.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/IG3-6.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "인어의 비늘". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Marencia's Song (holy relic; if unsure, a wax seal, signet or sealed contract). a well-crafted object on a workbench or simple stand, gold-tinted trim catching the light.
Scale (level 3 of 8): a fine object with a faint aura.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 인어 무녀가 벗어 준 비늘. 운이 좋으면 칼날이 미끄러진다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-19 · 셀레네아 무녀장
마렌시아의 노래 · 유닛 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/G3-19.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-19.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "셀레네아 무녀장". Depict exactly what this name describes.
Subject: a seasoned, battle-hardened member of the Marencia's Song — a devoted priest, ritualist or pact-bound servant, praying or offering.
Scale (level 4 of 8): seasoned: a sturdier body, a bigger weapon, mount or machine.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### NG3-1 · 거센 파도
마렌시아의 노래 · 공용 마법 · 레벨 4 · 고급 — 받은 그림은 `tools/art/inbox/NG3-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/NG3-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "거센 파도". Depict exactly what this name describes.
Subject: versatile spell — a dual effect: a balanced composition with power flowing in two directions. The moment it takes effect: a destructive water attack striking the enemy ranks. Scale and finish: a stronger effect with visible flow and a second layer of particles.
Scale (level 4 of 8): an effect over a few targets.
Banner — Marencia's Song: magic of marencia's song, signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles; palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체에게 피해 3.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-27 · 해구 투구게
마렌시아의 노래 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/G3-27.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-27.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "해구 투구게". Depict exactly what this name describes.
Subject: an elite, commanding Horseshoe Crab of the Marencia's Song — giant horseshoe crabs of the Talakus trench, ancient domed carapaces with spined rims and a long spike tail.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Horseshoe Crab: giant horseshoe crabs of the Talakus trench, ancient domed carapaces with spined rims and a long spike tail. Silhouette: low domed horseshoe shell with a long spike tail. Materials: olive-brown carapace, spines, barnacles, blue blood. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 탈라쿠스 해구 입구에서 우르보아가 올라오는 길목을 지키는 투구게. 거인들이 눕기 전부터 지금과 같은 모양으로 살았다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G3-U2 · 탈라쿠스의 아귀
마렌시아의 노래 · 유닛 · 레벨 5 · 고급 — 받은 그림은 `tools/art/inbox/PN-G3-U2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G3-U2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "탈라쿠스의 아귀". Depict exactly what this name describes.
Subject: an elite, commanding Anglerfish of the Marencia's Song — an anglerfish of the Talakus trench with a gaping fanged mouth and a glowing lure that pulses in time with the sleeping giant's heartbeat.
Scale (level 5 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Anglerfish: an anglerfish of the Talakus trench with a gaping fanged mouth and a glowing lure that pulses in time with the sleeping giant's heartbeat. Silhouette: huge-mouthed round fish with a dangling glowing lure. Materials: dark warty skin, needle teeth, glowing lure, black water. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 해구 밑바닥에서 거인의 맥박에 맞춰 등불을 깜빡이는 아귀. 맥박이 이어지는 한 그 불도 꺼지지 않는다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-32 · 심해 인어왕
마렌시아의 노래 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/G3-32.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-32.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "심해 인어왕". Depict exactly what this name describes.
Subject: an elite, commanding member of the Marencia's Song — a spellcaster channelling water power.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### PN-G3-C3 · 해구의 노래 고래
마렌시아의 노래 · 유닛 · 레벨 6 · 고급 — 받은 그림은 `tools/art/inbox/PN-G3-C3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/PN-G3-C3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "해구의 노래 고래". Depict exactly what this name describes.
Subject: an elite, commanding Whale of the Marencia's Song — a great song whale of the Talakus trench, barnacled and scarred, singing only to Marencia.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Whale: a great song whale of the Talakus trench, barnacled and scarred, singing only to Marencia. Silhouette: vast long body with a broad fluke. Materials: barnacled grey skin, scars, baleen, foam. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 탈라쿠스 해구에서 마렌시아에게 바치는 노래만 부르는 고래. 노래 한 곡이 끝나는 데 한 계절이 걸린다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### G3-34 · 마렌시아의 왕게
마렌시아의 노래 · 유닛 · 레벨 7 · 고급 — 받은 그림은 `tools/art/inbox/G3-34.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/G3-34.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: SUPERIOR — a proven veteran, clearly a cut above. A seasoned veteran or a well-made thing, better equipped and more confident than the common rank.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마렌시아의 왕게". Depict exactly what this name describes.
Subject: a legendary, awe-inspiring King Crab of the Marencia's Song — a great spiny king crab sworn as a knight of Marencia, with a red armoured carapace and massive raised claws.
Scale (level 7 of 8): towering and awe-inspiring: huge scale (giant creature, siege engine, archmage); the environment visibly bends to its power.
Creature kind — King Crab: a great spiny king crab sworn as a knight of Marencia, with a red armoured carapace and massive raised claws. Silhouette: wide spiky body with huge raised claws. Materials: spiny red carapace, claws, barnacles, coral. Do NOT draw it as one of the merfolk unless the name says so.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 마렌시아 앞에서 집게를 들어 맹세한 왕게. 그 맹세는 바다처럼 오래 기억되고, 집게는 그보다 단단하다.
Camera: slightly low angle, medium to cowboy shot, confident readied pose, subject about 60% of the frame.
Lighting: element backlight plus a warm key light, clearer rim light, a few glints on metal and edges; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; a recognisable slice of the banner's home (the lagoon temple of Selenea) with atmosphere and depth, softly focused, light atmospheric particles; clear water light, spray, ripples, bubbles.
Detail: fully rendered, better-crafted gear with engraved trim and one personal touch (trophy, badge, charm); expressive face and hands.
Spectacle: a few glints on metal and a light haze of atmospheric particles — one small step above common. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: a few small warm gold (#f2cf3d) highlights on trims and edges — the element colour stays the main light; the grade accent is a secondary touch (about 5% of the light).
Mood: proven, capable, confident.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

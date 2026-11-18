# 유니크 (Unique) — 카드 일러스트 프롬프트 (18장, 버전 g3)

> 그 깃발의 이름난 전설(덱에 1장). 포스터에 걸 만한 상징적 초상. 가운데 영웅 구도, 뒤에 그 깃발의 근원(거인 · 용 · 신)이 거대한 실루엣으로, 녹은 주황 금빛 불티와 금 세공.

## 이 등급의 연출 틀 (설명용 — 그림 AI에 넣지 않는다)

```
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. a named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light.
Background: {landmark}; behind it, faint and colossal, the banner's source: {source}.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree (about 20% of the light).
Mood: legendary, commanding, personal.
```

아래 카드 프롬프트는 이 틀 + 깃발 + 레벨 + 카드 이름 · 설명을 합친 완성본이다(스페셜은 v3.95부터 이 틀을 짧게 묶어 넣음). **그림 AI에는 카드 프롬프트(``` 안) 하나만 붙여 넣는다** — 위 틀을 함께 넣으면 같은 말이 두 번 들어가 그림끼리 닮는다. 카드마다 새 대화에서 그린다.

**그리는 차례**: 1 그림 없는 카드 먼저 → 2 이미 그린 그림 다시 그리기는 맨 나중(Gemini 할당량이 남을 때) → 3 그림 있는 카드는 그리지 않는다. (`node tools/art/build_prompts.js`가 장부 `art_map.csv`의 상태 "다시"를 읽어 이 차례로 놓는다.)

## 1. 그림 없는 카드 — 먼저 그린다 · 18장

### UN-A1 · 피의 서약자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "피의 서약자". Depict exactly what this name describes.
Subject: a legendary, named member of the Morkas's New Moon (see art direction).
Art direction: A demon writing his oath in his own blood with the edge of his blade; a crimson thread of the contract links his sword to his distant foe.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Morkas's New Moon: demon contractors: curved horns, ashen or pale skin, glowing eyes, elegant dark attire. Silhouette: tall, sharp and elegant: curved horns, tattered capes, long blades or scythes. Materials: black silk, dark lacquered armour, chains, contract scrolls sealed with blood wax, bone, obsidian. Signature motifs: blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 녹타르 심연 계약단에서 제 피로 서약서를 쓴 마족. 그 칼에 베인 자는 계약의 값을 함께 치른다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; behind it, faint and colossal, the banner's source: the god Morkas, the Silent Lord — a faceless shadow king holding balanced scales, eyes closed; violet shadow smoke, blood-red accents, contract sigils.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-A1-7 · 모르카스의 영혼 수확자
모르카스의 그믐 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A1-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A1-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "모르카스의 영혼 수확자". Depict exactly what this name describes.
Subject: a legendary, named Wraith of the Morkas's New Moon (see art direction) — a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains.
Art direction: A hooded wraith reaping souls with a great scythe; every soul he takes turns into a contract page fluttering into his hand.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Wraith: a hooded ghost of someone still bound to an unpaid price, a translucent legless body wrapped in rusted chains. Silhouette: floating and hooded, legless, trailing chains. Materials: translucent grey-violet mist, rusted chains, a torn shroud.
Banner — Morkas's New Moon: show the banner through element, palette and a few accents (blood-signed contracts, scales of judgment, closed eyes, sigils, shadow smoke, chains, scythes); palette: violet #8b5cf6, black, blood-red accents.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 모르카스에게 영혼을 바치고 몸을 잃은 자. 남의 영혼을 거둘 때마다 계약서 한 장이 손에 남지만, 제 것은 아직 돌려받지 못했다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is darkness (#8b5cf6) from behind the subject, cold violet underlight, blood-red glints, deep shadows.
Background: very dark night-blue (#07080d) base; the spires of Noctar carved into the walls of a sunless canyon, lit only by violet lanterns; behind it, faint and colossal, the banner's source: the god Morkas, the Silent Lord — a faceless shadow king holding balanced scales, eyes closed; violet shadow smoke, blood-red accents, contract sigils.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no holy light, no cartoonish devils — ominous and dread-filled.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-A2 · 엘라드의 날개 방패
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "엘라드의 날개 방패". Depict exactly what this name describes.
Subject: a legendary, named member of the Solante's Dawn (see art direction).
Art direction: A radiant knight of Elad spreading her wings like a shield in front of her comrades, arrows breaking against the feathers.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 새벽성 엘라드의 성광 기사. 동료 앞에 날개를 펼쳐 대신 맞는다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; behind it, faint and colossal, the banner's source: the goddess Solante, Mother of Dawn — a radiant woman with six wings of light; pale gold radiance, halo, feathers of light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-A2-7 · 솔란테의 새벽 사제
솔란테의 새벽 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A2-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A2-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "솔란테의 새벽 사제". Depict exactly what this name describes.
Subject: a legendary, named member of the Solante's Dawn (see art direction).
Art direction: A seraph priestess lifting the dawn light in both hands; fallen knights rise again behind her in the sunrise.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Solante's Dawn: seraphs with white feathered wings and halos, and human knights of the Radiant Order. Silhouette: upright and protective; wings spread wide behind great shields. Materials: white and gold plate armour, white feathers, tabards, great tower shields, lances, sun emblems. Signature motifs: halos, wings, great shields, a rising sun with a sword, feathers of light, oaths.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 솔란테의 새벽빛을 받드는 천족 사제. 해가 뜨면 쓰러진 기사가 다시 일어선다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is holy light (#ffe9a8) from behind the subject, warm radiant backlight and sunrise glow.
Background: very dark night-blue (#07080d) base; the white walls and towers of the Dawn Citadel Elad at sunrise, banners in the wind; the Twilight Wall facing the void lands; behind it, faint and colossal, the banner's source: the goddess Solante, Mother of Dawn — a radiant woman with six wings of light; pale gold radiance, halo, feathers of light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no demonic elements, no gore; they are defenders, so attacks look restrained and righteous.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-A3 · 바늘탑 별지기
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바늘탑 별지기". Depict exactly what this name describes.
Subject: a legendary, named member of the Belumir's Star (see art direction).
Art direction: A high-elf star-keeper archer on a lookout platform atop Belumir's Needle, bow half-drawn, reading abstract star glyphs carried on the wind before the enemy's spells arrive.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Belumir's Star: high-elf archers and wind-scouts: long pointed ears, silver hair, slender, light-footed and proud. Silhouette: slender, agile figures drawing long elegant bows or springing back mid-retreat, cloaks and hair swept by strong wind, arrows riding visible streaks of wind. Materials: light silver-white and teal leathers and short cloaks with star embroidery, long recurved bows of pale wood and silver, feather-fletched arrows, slim quivers; little or no armour. Signature motifs: arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 벨루미르의 바늘 꼭대기 망루에서 별과 바람을 함께 읽는 하이엘프 사수. 적의 주문이 바람을 타고 오기 전에 이미 과녁을 정해 둔다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the spires of Belumir's Needle piercing the clouds under a night sky full of stars; behind it, faint and colossal, the banner's source: the god Belumir, the Star-Reader — a robe with a thousand eyes, an open book and stars; swirling teal wind, fluttering robes and pages.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-A3-7 · 벨루미르의 주문 사냥꾼
벨루미르의 별 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-A3-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-A3-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "벨루미르의 주문 사냥꾼". Depict exactly what this name describes.
Subject: a legendary, named Night Elf of the Belumir's Star (see art direction) — night elves of the Storm Tower: dusky violet-blue skin, silver-white hair, very long swept-back ears and eyes glowing faintly like stars.
Art direction: A night-elf spell-hunter archer: his arrow pierces a glowing enemy spell mid-air, and streams of foreign-coloured magic are pulled along the arrow into his bow and swallowed as light.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Night Elf: night elves of the Storm Tower: dusky violet-blue skin, silver-white hair, very long swept-back ears and eyes glowing faintly like stars. Silhouette: a tall slender archer with long swept ears and a dark trailing cloak. Materials: dark indigo leather, silver star embroidery, a moon-silver bow, a night-blue cloak.
Banner — Belumir's Star: show the banner through element, palette and a few accents (arrows on streaks of wind, taut bowstrings, feathers and fletching, abstract star glyphs carved on bows and arrows, constellations, spire towers and lookout platforms); palette: wind teal #9fe3d6, silver, white, starry indigo.
Faction: Oracle Conclave: white citadels, stars, spires, magic circles, canyons of shadow; power received from gods, always for a price.
Lore (Korean, use for the scene): 남의 주문만 골라 쏘아 떨어뜨리는 나이트엘프. 밤눈이 밝아 주문의 빛을 가장 먼저 보고, 화살촉에 꿰인 주문은 그의 활로 빨려 든다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is wind (#9fe3d6) from behind the subject, cool teal-white starlight and streaks of wind.
Background: very dark night-blue (#07080d) base; the spires of Belumir's Needle piercing the clouds under a night sky full of stars; behind it, faint and colossal, the banner's source: the god Belumir, the Star-Reader — a robe with a thousand eyes, an open book and stars; swirling teal wind, fluttering robes and pages.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no heavy plate armour; star glyphs are abstract shapes, never readable letters.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B1 · 포르탄 포병대장
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "포르탄 포병대장". Depict exactly what this name describes.
Subject: a legendary, named member of the Dormak's Heartfire (see art direction).
Art direction: An old goblin artillery captain of Fortan with a long grey ear-tuft and a brass spyglass, commanding a battery of cannons; even while falling he grins and holds a lit fuse.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 포르탄 화약 포병단을 이끄는 늙은 고블린. 쓰러질 때도 도화선에 불을 붙여 놓는다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; behind it, faint and colossal, the banner's source: the sleeping giant Dormak, whose heart-fire burns inside the volcano like a colossal ember in a mountain-sized chest; embers, flame light, gunpowder smoke.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B1-7 · 탈라쿠스의 불씨 포수
도르마크의 심장불 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B1-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B1-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "탈라쿠스의 불씨 포수". Depict exactly what this name describes.
Subject: a legendary, named member of the Dormak's Heartfire (see art direction).
Art direction: A goblin gunner planting embers scooped from Talakus's black blood-pulse into his shells; behind him the struck ground keeps burning in long lines.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Dormak's Heartfire: goblins (and a few humans) of the gunpowder artillery corps: small wiry bodies, huge pointed ears, sharp grins, soot-smeared faces, goggles pushed up. Silhouette: a small figure dwarfed by an oversized cannon, musket or powder keg. Materials: scorched leather aprons, brass and blackened iron, bandoliers of cartridges, fuse cords, riveted gun carriages. Signature motifs: cannons, matchlock muskets, powder kegs, lit fuses, mortar shells, smoke plumes, sparks.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 탈라쿠스의 맥박에서 퍼 온 불씨를 포탄에 심는 고블린. 맞은 자리는 다음 날에도 탄다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is fire (#ff6b3d) from behind the subject, flashes of cannon fire and glowing embers inside thick gunpowder smoke.
Background: very dark night-blue (#07080d) base; Fortan's chimneys and gun bastions on volcanic slopes, the Crown range volcanoes glowing beyond; behind it, faint and colossal, the banner's source: the sleeping giant Dormak, whose heart-fire burns inside the volcano like a colossal ember in a mountain-sized chest; embers, flame light, gunpowder smoke.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wizard robes, wands or glowing magic circles — their fire comes from gunpowder, furnaces and living flame; no elegant armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B2 · 브론의 첫 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "브론의 첫 골렘". Depict exactly what this name describes.
Subject: a legendary, named Golem of the Sorgrim's Shield (see art direction) — a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart.
Art direction: Bron's first golem: an old, patched, riveted golem carefully building a new small golem from the parts of fallen comrades with gentle hands.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Golem: a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: riveted steel plate, stone, pistons, chains, glowing seams, steam.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 철의 심장을 삼킨 자가 처음 빚은 골렘. 주인이 브론이라 불리던 때를 기억하는 마지막 존재다. 쓰러진 동료의 부품을 주워 모아 새 골렘을 짓는다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; behind it, faint and colossal, the banner's source: the sleeping giant Sorgrim, whose iron sinews form the Ironbone mountains, watched by the mirror-scaled metal dragon Feros; cold steel sheen, sparks from an anvil, rivets.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B2-7 · 두르크하임 사슬 골렘
소르그림의 방패 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B2-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B2-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "두르크하임 사슬 골렘". Depict exactly what this name describes.
Subject: a legendary, named Golem of the Sorgrim's Shield (see art direction) — a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart.
Art direction: Two huge gate golems of Durkheim bound together by one massive steel chain, moving as one wall.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Golem: a massive forged golem of riveted steel plate and stone with piston joints, glowing forge seams and a boiler or furnace heart. Silhouette: broad, square and heavy — a walking wall of riveted steel. Materials: riveted steel plate, stone, pistons, chains, glowing seams, steam.
Banner — Sorgrim's Shield: show the banner through element, palette and a few accents (forge hammers, anvils, riveted golems, piston joints, gears, stamped steel crests, shield walls); palette: steel grey #a9b4c2, gunmetal, brass, molten forge orange inside the seams.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 두르크하임 성문을 지키는 두 골렘을 강철 사슬 하나로 묶었다. 하나가 맞으면 둘이 함께 버틴다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is metal (#a9b4c2) from behind the subject, cold steel sheen against molten forge glow, sparks from the anvil.
Background: very dark night-blue (#07080d) base; the colossal underground halls of Durkheim with lava channels, mine shafts and iron gates, glowing ore veins like sinews in the rock; behind it, faint and colossal, the banner's source: the sleeping giant Sorgrim, whose iron sinews form the Ironbone mountains, watched by the mirror-scaled metal dragon Feros; cold steel sheen, sparks from an anvil, rivets.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wizardry or wands; golems and constructs are machines, not undead.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B3 · 즈라크의 병지기
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "즈라크의 병지기". Depict exactly what this name describes.
Subject: a legendary, named member of the Keraun's Thunder (see art direction).
Art direction: The gnome researcher who once bottled the lightning spirit Zrak, holding the biggest empty jar while cracked empty jars around her refill with lightning.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Keraun's Thunder: tiny clever gnome scholars and engineers: big noses, wild hair, brass goggles, lab coats with many pockets. Silhouette: a tiny figure beside big contraptions — coils, lightning towers, walking machines. Materials: copper coils, glass jars of captured lightning, brass gauges, insulated cables, lab glass, leather straps. Signature motifs: lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 번개의 대정령 즈라크를 병에 가두었던 볼타리움의 연구자. 마법이 스칠 때마다 빈 병에 번개가 다시 고인다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the spiked lightning-rod towers of Voltarium crowned by a lightning storm; behind it, faint and colossal, the banner's source: the sleeping giant Keraun, whose lightning nerves branch through the ground like a vast glowing circuit; crackling electric arcs, glowing coils.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-B3-7 · 케라운 자기장 탑
케라운의 벼락 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-B3-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-B3-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "케라운 자기장 탑". Depict exactly what this name describes.
Subject: a legendary, named Lightning Tower of the Keraun's Thunder (see art direction) — a tall lattice tower of steel and copper bristling with lightning rods, often walking on its own legs, crackling with arcs.
Art direction: A walking tower wound with Keraun's lightning; its magnetic field bends the air — coins, dice and metal debris spin in orbit around it.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Lightning Tower: a tall lattice tower of steel and copper bristling with lightning rods, often walking on its own legs, crackling with arcs. Silhouette: a tall spiked tower. Materials: steel lattice, copper rods, porcelain insulators, arcs.
Banner — Keraun's Thunder: show the banner through element, palette and a few accents (lightning jars, copper coils, lightning-rod towers, dials and gauges, arcs leaping between electrodes, blueprints); palette: electric yellow #ffd84a with copper, cobalt-blue sparks and dark brass.
Faction: Titanbone Concord: copper, brass, steam, soot, gears, furnaces; they mine black adamant from the bodies of sleeping giants. No gods — technology instead.
Lore (Korean, use for the scene): 케라운의 번개를 감아 세운 걸어 다니는 탑. 다가오는 자의 행운까지 비틀어 놓는다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is lightning (#ffd84a) from behind the subject, harsh flickering arc light and crackling electricity.
Background: very dark night-blue (#07080d) base; the spiked lightning-rod towers of Voltarium crowned by a lightning storm; behind it, faint and colossal, the banner's source: the sleeping giant Keraun, whose lightning nerves branch through the ground like a vast glowing circuit; crackling electric arcs, glowing coils.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no wands or wizard robes — their lightning comes from coils, machines and storm creatures.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G1 · 바위송곳니 대족장
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "바위송곳니 대족장". Depict exactly what this name describes.
Subject: a legendary, named member of the Gorvath's Claw (see art direction).
Art direction: The great chief of the Rockfang tribe: an enormous orc with a stone-fang necklace, howling as his warband charges out of the dust behind him.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가르운 바위송곳니 부족의 우두머리. 그가 적을 쓰러뜨리면 무리가 울부짖으며 달려온다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; behind it, faint and colossal, the banner's source: the earth dragon Gorbas, the largest of the seven dragons, with rocks and forests growing on its back; flying rock dust, cracked ground, ochre light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G1-7 · 가르운 약탈왕
고르바스의 발톱 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G1-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G1-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "가르운 약탈왕". Depict exactly what this name describes.
Subject: a legendary, named member of the Gorvath's Claw (see art direction).
Art direction: An orc plunder-king wielding weapons he took from fallen foes, a heap of captured arms and banners at his feet.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 쓰러뜨린 적의 무기를 그 자리에서 집어 드는 오크. 가르운에서는 그것을 예의라고 부른다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; the endless howling steppe of Garun with standing stones, nomad camps and a stone duel ring; behind it, faint and colossal, the banner's source: the earth dragon Gorbas, the largest of the seven dragons, with rocks and forests growing on its back; flying rock dust, cracked ground, ochre light.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no glowing magic circles (their magic is drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G2 · 첫 고목의 가시지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G2.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G2.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "첫 고목의 가시지기". Depict exactly what this name describes.
Subject: a legendary, named Treant of the Verdan's Antler (see art direction) — treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks.
Art direction: An ancient treant keeper of thorns around the First Elder Tree; cut briars regrow from the roots all around him as he works.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Treant: treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks. Silhouette: towering trunk body with spreading branch arms and root feet. Materials: rough bark, moss, leaves, knotted roots, amber sap.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 실바니엘의 첫 고목 둘레에 가시덤불을 기르는 늙은 트렌트. 베어 내도 뿌리가 남는다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; behind it, faint and colossal, the banner's source: the forest dragon Verdan, with antlers of ancient tree branches and moss-covered scales; glowing moss, thorny vines, drifting leaves.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G2-7 · 베르단의 씨앗지기
베르단의 뿔 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G2-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G2-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "베르단의 씨앗지기". Depict exactly what this name describes.
Subject: a legendary, named Treant of the Verdan's Antler (see art direction) — treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks.
Art direction: An old treant with seed pouches hanging from his branches; wherever he walks after battle, a young forest springs up behind him.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Treant: treants of the Eilen forest: living trees that walk on knotted roots, with bark faces, branch arms and moss in the cracks. Silhouette: towering trunk body with spreading branch arms and root feet. Materials: rough bark, moss, leaves, knotted roots, amber sap.
Banner — Verdan's Antler: show the banner through element, palette and a few accents (thorns and briars, vines, regrowing limbs, glowing moss, seeds, giant roots); palette: forest green #58b85f, deep moss, bark brown, bioluminescent spores.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 가지마다 씨앗 주머니를 매달고 걷는 늙은 트렌트. 싸움이 끝난 자리마다 숲이 자란다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is forest (#58b85f) from behind the subject, dappled green light through the canopy and glowing spores.
Background: very dark night-blue (#07080d) base; the colossal trunks and hanging bridges of Sylvaniel around the First Elder Tree, in mist; behind it, faint and colossal, the banner's source: the forest dragon Verdan, with antlers of ancient tree branches and moss-covered scales; glowing moss, thorny vines, drifting leaves.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no fire magic.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G3 · 샘물의 노래꾼
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G3.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G3.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "샘물의 노래꾼". Depict exactly what this name describes.
Subject: a legendary, named member of the Marencia's Song (see art direction).
Art direction: A singer of the Spring Choir; her song spreads as glowing rings over the sea, and pale souls of the drowned ride the waves back toward the shore.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Banner — Marencia's Song: merfolk with blue scales and flowing fins, water spirits, and the shrine maidens of the Spring Choir. Silhouette: graceful flowing curves; long hair and fins drifting like silk. Materials: blue scales, pearls, coral, shells, translucent fins, flowing silk shrine robes, harpoons. Signature motifs: water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 셀레네아 샘물 무녀단의 노래꾼. 그 노래를 들은 죽은 자는 바다로 돌아갔다가 다시 밀려온다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; behind it, faint and colossal, the banner's source: the water dragon Marencia, a long translucent body with fins instead of wings; clear water light, spray, ripples, bubbles.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### UN-G3-7 · 마렌시아의 세이렌
마렌시아의 노래 · 유닛 · 레벨 6 · 유니크 — 받은 그림은 `tools/art/inbox/UN-G3-7.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/UN-G3-7.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: UNIQUE — a named legend of the banner, iconic hero portrait. A named legend of this banner — iconic and instantly recognisable, a hero image you would hang as a poster.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "마렌시아의 세이렌". Depict exactly what this name describes.
Subject: a legendary, named Siren of the Marencia's Song (see art direction) — sirens of Marencia: pale sea-singers rising from deep water, with long dark kelp-like hair, fin-webbed arms and a fish tail, whose song turns blades back.
Art direction: A siren risen from Marencia's deep waters, singing on a rock; in the distance enemy soldiers turn their swords around against themselves.
Scale (level 6 of 8): elite and imposing: a large silhouette, heavy gear or a big creature or machine; the scene starts to react to it.
Creature kind — Siren: sirens of Marencia: pale sea-singers rising from deep water, with long dark kelp-like hair, fin-webbed arms and a fish tail, whose song turns blades back. Silhouette: a singer rising from the water, arms spread and hair streaming. Materials: pale pearly skin, dark wet hair, fins, conch shells.
Banner — Marencia's Song: show the banner through element, palette and a few accents (water spirals, song shown as rippling rings, pearls, coral shields, harpoons, waves, bubbles); palette: water blue #4fb3ff, aquamarine, pearl white, deep-sea navy.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 마렌시아의 깊은 물에서 노래와 함께 올라온 세이렌. 그 노래를 끝까지 들은 적은 칼을 거꾸로 쥔다.
Camera: centred heroic portrait, near-symmetrical, subject about 70% of the frame, looking slightly down toward the viewer, a strong iconic silhouette.
Lighting: masterful chiaroscuro, a halo-like element backlight behind head and shoulders, molten orange-gold rim light; main light is water (#4fb3ff) from behind the subject, caustic underwater light and shimmering reflections.
Background: very dark night-blue (#07080d) base; the pillars of the Selenea temple rising from a moonlit lagoon, waves and spray; behind it, faint and colossal, the banner's source: the water dragon Marencia, a long translucent body with fins instead of wings; clear water light, spray, ripples, bubbles.
Detail: masterwork: heraldic ornaments of the banner, a signature personal weapon or relic, rich textures, gold inlay.
Spectacle: iconic: a halo-like backlight, swirling embers, gleaming gold filigree and the faint colossal silhouette of the banner's source behind — a step above epic. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Grade accent: molten orange-gold (#ff8a2a) embers and rim light, fine gold filigree — the element colour stays the main light; the grade accent is a secondary touch (about 20% of the light).
Mood: legendary, commanding, personal.
Stay true to the banner: no fire, no heavy plate armour.
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

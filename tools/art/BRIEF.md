# ETHERION — Art Brief for an image-generating AI

> Read this first if you are an AI asked to paint art for ETHERION. (Korean users: 사용법은 `README.md`.)
> Source of truth for style: `docs/STYLE_GUIDE.md` (sections 0, 1, 2.11, 3, 6). If this brief and the guide disagree, the guide wins.
> **For card illustrations, also read `tools/art/PROMPT_GUIDE.md`** — the grade-by-grade rules (Common → Special), the fixed identity of each of the nine banners, and how to write a prompt for a new card. Wording source: `tools/art/art_style.json`.

## 1. The game in one paragraph
ETHERION is a browser card-battle game set on the continent of Kailan. Long ago the source-god **Arche** split the world's ether three ways: the **seven sleeping giants** became the land (body), the **seven dragons** hold the elements (power), the **five gods** give will (meaning). Three mortal factions draw on one source each: the **Adamant Concord** mines the giants with technology (copper, steam, cannons), the **Verdant Covenant** borrows from dragons through pacts (forests, beasts, water), the **Arcane Conclave** receives from gods and always pays a price (light and darkness, stars, blood contracts). Each faction has three banners (groups) — nine in total.

## 2. Look and feel (all art)
- **Dark fantasy, painterly digital painting, dramatic lighting.** Theme: *night sky and golden runes*.
- Backgrounds are **very dark night-blue** (`#07080d`). The subject is lit from behind by its **element colour**.
- Gold (`#d9b46a`, `#f6e2a8`) for ornament, ether sky-blue (`#8fdcff`) for magic energy.
- **Never put text, letters, numbers, signatures, watermarks, card frames, borders or UI into a picture.** The game draws names, numbers, frames and grade colours itself.
- Avoid: bright/white backgrounds, thick cartoon outlines, photorealism, chibi/cute style, likeness of real people or of characters from other games/films.

| Group | Who / what they look like | Element colour |
|---|---|---|
| B1 Cinder Goblins | goblin & human artillerists, big ears, scorched aprons, cannons, muskets, smoke | fire `#ff6b3d` |
| B2 Ironbeard Dwarves | dwarves, golems, automatons, thick riveted steel | metal `#a9b4c2` |
| B3 Thunder Gnomes | tiny gnome scholars, goggles, lightning jars, coils | lightning `#ffd84a` |
| G1 Rockfist Orcs | orcs with huge fists, tusks, bone trinkets, wolf & bear riders | earth `#b88a5a` |
| G2 Moss Trolls | moss trolls & treants, bark armour, thorns, vines | forest `#58b85f` |
| G3 Bluescale Merfolk | merfolk, water spirits, shrine maidens | water `#4fb3ff` |
| A1 Abyssal Fiends | demon contractors, horns, shadow, blood pacts | darkness `#8b5cf6` |
| A2 Radiant Seraphs | seraphs & human knights, white wings, halos, shields | light `#ffe9a8` |
| A3 Storm High Elves | high-elf mages, silver hair, wind-blown robes & pages | wind `#9fe3d6` |

## 3. What to paint

### 3.1 Card illustrations — 788 cards
- One picture per card, portrait **4:5**. Generate at **at least 600×750** (larger is fine, e.g. 896×1200 or 1024×1280). Put the file in **`tools/art/inbox/`** (name it with the card ID, e.g. `B1-01.jpg`) and run `python3 tools/art/artmap.py import` — it center-crops to 4:5 and stores the game copy as **`img/cards/<CARD_ID>.jpg`, 600×750 JPG** (the fixed in-game size, v3.41), keeps your original in `inbox/_done/`, and updates the art index the game reads. Do not write into `img/cards/` directly.
- Every card's prompt is ready in `tools/art/prompts/cards.jsonl` (one JSON per line: `id`, `out`, `size`, `prompt`) and, human-readable, in `tools/art/prompts/cards/<GROUP>.md`.
- Composition: one main subject in the **middle 70%**; keep the **top 15%** (name) and **bottom 20%** (numbers) calm; edges get cropped.
- Units: upper body to full body; power and grandeur grow with level 1→8. Spells: the moment the effect hits. Items: one object, centred, faded-gold light, no hands.
- **Grade sets the finish, level sets the size.** Common = eye-level, simple background, element light only. Superior = small gold accents, blurred home. Rare = dynamic low angle, home landmark, sapphire rim. Empowered = the base card's same character, reinforced, teal energy (attach the base card's image if it exists). Epic = cinematic scale, weather, violet particles. Unique = iconic hero portrait with the banner's giant/dragon/god as a colossal silhouette, orange-gold embers. Special = mythic key art, the source being filling the sky, golden rune rings, crimson and gold. Grade accent colours stay secondary to the element light.
- Ready-made prompts grouped by grade: `tools/art/prompts/grades/<grade>.md`. Specials and uniques carry an extra "Art direction" line from `tools/art/art_notes.json`.
- Delivered images can have any file name containing the card ID or Korean card name: drop them in `tools/art/inbox/` and run `python tools/art/artmap.py import`.

### 3.2 Battle-screen art (the pictures behind the numbers) — 10 files
Prompts: `tools/art/prompts/ui.jsonl` / `ui.md`. **Always give the reference image(s)** listed for each asset (the ether altar is the exception — it has none): the game places live elements (crystals, numbers, the burning card, the blood level) at fixed spots, so **position, size and outline must match the reference exactly**; repaint only material, light and texture. References are frozen copies in `tools/art/ref/`.

| Asset | File | Size | Layer notes |
|---|---|---|---|
| Battle background | `img/ui/battle/battle_bg.jpg` | 1920×1080 | centre stays dark (cards sit there) |
| Card back / deck top | `img/ui/deck/card_back.png` | 1000×1400 (5:7) | ETHERION sigil; deck edges & count are code |
| Pyre (discard) – back | `img/ui/pyre/pyre_back.png` | 800×1120, transparent | bowl, embers, base — no flames |
| Pyre – fire | `img/ui/pyre/pyre_fire.png` | 800×1120, on **black** | blended with *screen*; black becomes transparent |
| Pyre – front rim | `img/ui/pyre/pyre_front.png` | 800×1120, transparent | only the gold front lip |
| Ether altar – back | `img/ui/ether/ether_back.png` | 720×720, transparent | **free design, no reference** (dragon, runes, ring…). Keep only the centre circle (35.8% of width) clear or softly glowing — code draws the orb, number, 9 crystals and gold essence on top |
| Ether altar – front (optional) | `img/ui/ether/ether_front.png` | 720×720, transparent | only what passes in front of the orb; reference = your back layer |
| Life heart – empty | `img/ui/life/heart_glass.png` | 480×600, transparent | dark drained gem |
| Life heart – blood | `img/ui/life/heart_blood.png` | 480×600, transparent | glowing blood gem; code crops from the top |
| Life heart – gold frame | `img/ui/life/heart_top.png` | 480×600, transparent | bezel + 4 prongs, hollow centre |

Layers of one set are stacked exactly on top of each other — paint them in order (back → middle → front) and give the earlier layer as an extra reference so they match.

## 4. Delivery
- Save with the exact file name and path above. PNG for cards and layers, JPG for the battle background.
- If you can only output another size or ratio, `tools/art/gen.py` (or a person) will crop and fit it; keep the subject inside the safe area.
- If transparency is impossible, paint on flat `#07080d` (or pure black for the fire); the pipeline replaces the outline with the reference's transparency.
- Do not overwrite anything else in the game folder.

## 5. Checklist
- [ ] No text, numbers, frame or UI inside the picture
- [ ] Dark night-blue background, element-coloured light behind the subject
- [ ] Subject centred in the middle 70%; top and bottom calm
- [ ] Battle-screen layers match their reference exactly in position and outline
- [ ] File name = card ID / asset path

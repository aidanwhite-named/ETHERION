# ETHERION — Art Brief for an image-generating AI

> Read this first if you are an AI asked to paint art for ETHERION. (Korean users: 사용법은 `README.md`.)
> Source of truth for style: `docs/STYLE_GUIDE.md` (sections 0, 1, 2.11, 3, 6). If this brief and the guide disagree, the guide wins.
> **Card illustrations use ready-made prompts** (`tools/art/prompts/`). Each prompt is a hand-written scene for that one card plus four short shared lines. How they are written: `tools/art/PROMPT_GUIDE.md`.

## 1. The game in one paragraph
ETHERION is a browser card-battle game set on the continent of Kailan. Long ago the source-god **Arche** split the world's ether three ways: the **seven sleeping giants** became the land (body), the **seven dragons** hold the elements (power), the **five gods** give will (meaning). Three mortal factions draw on one source each: the **Titanbone Concord** mines the giants, the **Dragonvein Covenant** borrows from dragons through pacts, the **Oracle Conclave** receives from gods and always pays a price. Each faction has three banners — nine in total. **A banner is an element, not a race**: its cards are everything that element's giant, dragon or god has woken — beasts, spirits, awakened objects, and the one folk who first raised the banner.

## 2. Look and feel
- **Painterly dark-fantasy illustration**: confident visible brushwork, deep shadow masses, luminous colour, a clear shape that reads at small size.
- **Every card is its own picture.** Viewpoint, placement, facing, time of day and weather change from card to card; follow the scene written in the prompt exactly.
- **A banner is recognised by its element** — its matter, its air and its colour — in whichever of the banner's six colour moods the prompt names.
- **Paint the picture only, edge to edge, with no lettering.** The game draws names, numbers, frames and grade colours itself.
- Battle-screen art (section 3.2) keeps the interface theme: *night sky and golden runes*, very dark night-blue (`#07080d`), gold (`#d9b46a`, `#f6e2a8`), ether sky-blue (`#8fdcff`).

| Banner | Element and its world | Element colour | First folk (only on cards of that kind) |
|---|---|---|---|
| B1 Dormak's Heartfire | fire — a volcanic country warmed by a sleeping giant's heart-fire: basalt, obsidian, magma, embers, powder smoke | `#ff6b3d` | goblin gunners |
| B2 Sorgrim's Shield | metal — mountains whose ore veins are a giant's iron sinews: raw ore, hammered steel, rivets, forge-glow | `#a9b4c2` | dwarves |
| B3 Keraun's Thunder | lightning — a storm plateau where a giant's nerves spark through the ground: bolts, fulgurite, copper, jars of lightning | `#ffd84a` | gnomes |
| G1 Gorvath's Claw | earth — steppe and broken highlands on an earth dragon's back: rock, clay, dust, bone, dry grass | `#b88a5a` | orcs |
| G2 Verdan's Antler | forest — a primeval wood kept by an antlered dragon: roots, moss, bark, thorns, fungi | `#58b85f` | moss trolls |
| G3 Marencia's Song | water — lagoons, tides and deep sea answering a sea dragon's song: clear water, pearl, coral, ripples of sound | `#4fb3ff` | merfolk |
| A1 Morkas's New Moon | darkness — a sunless canyon ruled by a god of price: shadow, candle smoke, wax seals, scales, blood as coin | `#8b5cf6` | demon contractors |
| A2 Solante's Dawn | light — a white citadel facing the first light, held by oaths: pale stone, stained glass, feathers, sunbeams | `#ffe9a8` | seraphs |
| A3 Belumir's Star | wind — needle spires above the clouds where stars are read: thin air, feathers, silver, bowstrings | `#9fe3d6` | high-elf archers |

## 3. What to paint

### 3.1 Card illustrations — 706 cards
- One picture per card, **landscape 5:4**. Generate at **at least 750×600** (larger is fine). Put the file in **`tools/art/inbox/`** (name it with the card ID, e.g. `B1-10.jpg`) and run `python3 tools/art/artmap.py import` — it stores the game copy as **`img/cards/<CARD_ID>.jpg`**, keeps your original in `inbox/_done/`, and updates the art index the game reads. Do not write into `img/cards/` directly.
- Every card's prompt is ready in `tools/art/prompts/cards.jsonl` (one JSON per line: `id`, `out`, `size`, `prompt`) and, human-readable, in `tools/art/prompts/cards/<BANNER>.md` and `prompts/grades/<grade>.md`. Use one prompt per image, in a fresh conversation each time.
- The prompt already says what is in the picture, from where it is seen, where it sits in the frame and how it is lit. **Units** are the creature named in the scene — not the banner's first folk unless the scene says so. **Spells** show the magic itself. **Items** show the one object.
- **Empowered** cards are the same individual as their base card: paint the base card first and attach its picture.
- **Special** cards are one-of-a-kind mythic beings (units) and enshrined relics (items), beyond mortal scale. Follow the viewpoint the scene gives rather than a default look-up pose.
- Delivered images can have any file name containing the card ID or Korean card name.

### 3.2 Battle-screen art (the pictures behind the numbers) — 10 files
Prompts: `tools/art/prompts/ui.jsonl` / `ui.md`. **Always give the reference image(s)** listed for each asset (the ether altar is the exception — it has none): the game places live elements (crystals, numbers, the burning card, the blood level) at fixed spots, so **position, size and outline must match the reference exactly**; repaint only material, light and texture. References are frozen copies in `tools/art/ref/`.

| Asset | File | Size | Layer notes |
|---|---|---|---|
| Battle background | `img/ui/battle/battle_bg.jpg` | 1920×1080 | centre stays dark (cards sit there) |
| Card back / deck top | `img/ui/deck/card_back.png` | 1000×1400 (5:7) | ETHERION sigil; deck edges & count are code |
| Pyre (discard) – back | `img/ui/pyre/pyre_back.png` | 800×1120, transparent | bowl, embers, base — no flames |
| Pyre – fire | `img/ui/pyre/pyre_fire.png` | 800×1120, on **black** | blended with *screen*; black becomes transparent |
| Pyre – front rim | `img/ui/pyre/pyre_front.png` | 800×1120, transparent | only the gold front lip |
| Ether altar – back | `img/ui/ether/ether_back.png` | 720×720, transparent | **free design, no reference** (dragon, runes, ring…). Keep only the centre circle (35.8% of width) clear or softly glowing — code draws the orb, number, crystals and gold essence on top |
| Ether altar – front (optional) | `img/ui/ether/ether_front.png` | 720×720, transparent | only what passes in front of the orb; reference = your back layer |
| Life heart – empty | `img/ui/life/heart_glass.png` | 480×600, transparent | dark drained gem |
| Life heart – blood | `img/ui/life/heart_blood.png` | 480×600, transparent | glowing blood gem; code crops from the top |
| Life heart – gold frame | `img/ui/life/heart_top.png` | 480×600, transparent | bezel + 4 prongs, hollow centre |

Layers of one set are stacked exactly on top of each other — paint them in order (back → middle → front) and give the earlier layer as an extra reference so they match.

## 4. Delivery
- Save with the exact file name and path above. JPG or PNG for cards, PNG for layers, JPG for the battle background.
- If you can only output another size or ratio, `tools/art/artmap.py` / `gen.py` (or a person) will crop and fit it.
- If transparency is impossible, paint on flat `#07080d` (or pure black for the fire); the pipeline replaces the outline with the reference's transparency.
- Do not overwrite anything else in the game folder.

## 5. Checklist
- [ ] The picture matches the scene in the prompt — subject, viewpoint, placement, light
- [ ] The banner's element colour is the clearest colour in the picture
- [ ] Picture only: no lettering, numbers, frame or interface
- [ ] Battle-screen layers match their reference exactly in position and outline
- [ ] File name = card ID / asset path

<!-- 자동 생성: node tools/sfx/build_sfx_prompts.js — 손으로 고치지 말 것. 고칠 곳은 tools/sfx/notes/ · sfx_common.json · sfx_style.json -->
# ETHERION 공용 효과음 프롬프트

> 130개. Gemini에 `text` 상자를 통째로 붙여 넣는다. 한 번에 같은 소리가 세 테이크(사이 무음) 나온다.
> 받은 파일은 항목의 **파일** 이름으로 `audio/inbox/sfx/`에 넣는다(예: `ui_click.mp3`). 설명은 `tools/sfx/PROMPT_SFX.md`.
> **지금** = 이 자리에서 지금 나는 소리 이름(`js/feel.js`). '새 자리'는 아직 소리가 없는 곳이라, 넣을 때 코드도 함께 고친다.

## 메뉴 · 화면 (12)

### ui_click — 메뉴 단추를 누를 때
지금: `ui_click` · 약 0.2초 · 파일 `ui_click`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a crisp, satisfying click of a small brass switch set in dark wood, with a tiny soft low thump underneath; clean and immediate, not sharp. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_hover — 단추 위에 커서가 올라갈 때 (아주 작게)
지금: 새 자리 · 약 0.1초 · 파일 `ui_hover`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an extremely soft, airy tick, like a fingertip brushing polished wood; barely there. About 0.1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_card — 메뉴 · 상점 · 도감에서 카드를 누를 때
지금: `ui_card` · 약 0.3초 · 파일 `ui_card`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a thick card lifted from a velvet tray: a soft papery snap and a faint warm glassy shimmer. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_deck — 덱을 고를 때
지금: `ui_deck` · 약 0.4초 · 파일 `ui_deck`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: the brass latch of a leather-bound deck case clicking open with a firm, tidy double click. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_open — 창이 열릴 때
지금: `ui_open` · 약 0.5초 · 파일 `ui_open`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy parchment panel unfolding with a soft whoosh and a gentle low wooden knock. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_close — 창이 닫힐 때
지금: `ui_close` · 약 0.4초 · 파일 `ui_close`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a parchment panel folding shut: a short reverse whoosh ending in a muted soft thud. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_tab — 탭을 바꿀 때
지금: 새 자리 · 약 0.2초 · 파일 `ui_tab`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a quick, light flick of a stiff paper tab, crisp and tidy. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_toggle — 설정의 켜기 · 끄기, 체크 상자
지금: 새 자리 · 약 0.2초 · 파일 `ui_toggle`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a small, precise metal toggle snapping into place with a clean click. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ui_slider — 음량 막대를 끌 때 (짧게 되풀이)
지금: 새 자리 · 약 0.1초 · 파일 `ui_slider`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a tiny, fine ratchet tick of a small brass dial. About 0.1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### page_turn — 룰북 · 매뉴얼 · 연대기의 책장을 넘길 때
지금: 새 자리 · 약 0.6초 · 파일 `page_turn`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: one heavy vellum page turning in an old book: a soft papery sweep and a gentle settle. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### toast — 알림 띠가 뜰 때
지금: 새 자리 · 약 0.4초 · 파일 `toast`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a soft, clear glassy ping of a small crystal, gentle and short. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deny — 안 됨 · 경고
지금: `deny` · 약 0.4초 · 파일 `deny`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: two quick, dull knocks on an iron-banded wooden door, low and firm, clearly a refusal but never harsh. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 입장 · 대기실 · 덱 조정실 (9)

### portal_open — 입장 관문이 열릴 때
지금: 새 자리 · 약 1.6초 · 파일 `portal_open`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an ancient stone gate grinding open with a deep rumble, then a rush of shimmering ethereal air pouring through. About 1.6 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### login_ok — 로그인 · 입장에 성공했을 때
지금: 새 자리 · 약 0.9초 · 파일 `login_ok`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a warm rising shimmer of crystal blooming into one soft, low resonant bell tone. About 0.9 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### flag_pick — 대기실에서 깃발을 고를 때
지금: 새 자리 · 약 0.5초 · 파일 `flag_pick`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy cloth banner unfurling with a strong snap of fabric and a creak of its wooden pole. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### sortie — 출정 — 대전을 시작하는 단추
지금: 새 자리 · 약 1초 · 파일 `sortie`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a sword drawn from its scabbard with a bright ringing scrape, followed by one deep, soft drum-like boom. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_add — 덱 조정실: 카드를 덱에 넣을 때
지금: `pick` · 약 0.3초 · 파일 `deck_add`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card slid neatly into a stack: a quick papery swish ending in a soft, crisp tap. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_remove — 덱 조정실: 카드를 덱에서 뺄 때
지금: `unselect` · 약 0.3초 · 파일 `deck_remove`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card pulled out of a stack with a light whisk and a soft flutter. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_full — 덱이 정해진 장수로 꽉 찼을 때
지금: `confirm` · 약 0.6초 · 파일 `deck_full`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a satisfying heavy latch closing, followed by one warm glassy chime. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_save — 덱을 저장할 때
지금: `confirm` · 약 0.6초 · 파일 `deck_save`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a wax seal pressed firmly onto parchment: a soft squish and a solid stamp. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_code — 덱 코드를 복사하거나 읽을 때
지금: 새 자리 · 약 0.4초 · 파일 `deck_code`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a quill scratching one quick flourish across parchment. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 전장 — 카드 다루기 (19)

### shuffle — 덱을 섞을 때
지금: `shuffle` · 약 1초 · 파일 `shuffle`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a thick deck of stiff cards riffle-shuffled and bridged: a fast ripple of cards and a final square tap. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### draw — 카드를 뽑을 때
지금: `draw` · 약 0.3초 · 파일 `draw`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a thick card slid off the top of a deck: a quick papery swish ending in a crisp snap. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### mulligan — 시작 핸드를 바꿀 때 (멀리건)
지금: 새 자리 · 약 0.8초 · 파일 `mulligan`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: several cards swept back into the deck with a broad papery whoosh, then new cards dealt in quick, soft snaps. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### handHover — 핸드에서 카드와 카드 사이를 넘나들 때
지금: `handHover` · 약 0.1초 · 파일 `handHover`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a very soft brush of a card edge, light and silky. About 0.1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### select — 카드를 고를 때
지금: `select` · 약 0.2초 · 파일 `select`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card lifted with a firm, soft click and a faint airy lift. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### unselect — 고르기를 풀 때
지금: `unselect` · 약 0.2초 · 파일 `unselect`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card set back down with a soft leathery pat. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pick — 카드를 끌기 시작할 때
지금: `pick` · 약 0.2초 · 파일 `pick`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card peeled up off the table with a faint whoosh. About 0.2 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### hover — 끌던 카드가 놓을 칸에 닿을 때
지금: `hover` · 약 0.1초 · 파일 `hover`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a tiny magnetic tick, precise and soft. About 0.1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### back — 놓을 수 없는 곳에서 카드가 제자리로 돌아갈 때
지금: 새 자리 · 약 0.3초 · 파일 `back`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card sliding back into the hand with a soft reverse swish. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### place — 유닛을 전장에 내려놓을 때
지금: `place` · 약 0.5초 · 파일 `place`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy card slammed onto a stone table: a deep soft thud with a crisp double latch click locking it in place. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### spell_set — 마법을 뒷면으로 칸에 놓을 때
지금: `place` · 약 0.4초 · 파일 `spell_set`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a face-down card set gently onto stone with a hushed, mysterious low whoosh and a faint tick. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### sp_reveal — 마법 카드가 뒤집혀 발동할 때
지금: `sp_reveal` · 약 0.5초 · 파일 `sp_reveal`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card flipped over with a bright whoosh and a burst of tiny magical sparks. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### move — 전장에서 자리를 바꿀 때
지금: `move` · 약 0.4초 · 파일 `move`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card sliding across stone with a smooth scrape, ending in a soft click. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### equip — 아이템 장착 (그 아이템의 소리가 아직 없을 때)
지금: `equip` · 약 0.6초 · 파일 `equip`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a piece of gear fitted onto a fighter: a leather strap tightened and a metal buckle snapping shut. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### crystal — 결정화
지금: `crystal` · 약 0.8초 · 파일 `crystal`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card dissolving into a clear crystal: a rising glassy resonance and a sprinkle of tiny sparkles. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### burn — 소각
지금: `burn` · 약 0.9초 · 파일 `burn`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card catching fire: a quick whoosh of flame, crackling embers and ash drifting away. About 0.9 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### ether_gain — 턴이 시작되며 에테르가 차오를 때
지금: 새 자리 · 약 0.6초 · 파일 `ether_gain`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a soft rising shimmer, like light pouring into a glass vessel. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### upkeep — 유지비로 에테르가 빠질 때
지금: 새 자리 · 약 0.5초 · 파일 `upkeep`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a faint descending glassy drain, like light seeping out of a crystal. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### upkeep_burn — 유지비가 모자라 유닛이 소각될 때
지금: 새 자리 · 약 0.8초 · 파일 `upkeep_burn`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a fading crystal hum collapsing into a dry crackle of embers. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 전장 — 흐름 (차례 · 코인 · 생명 · 결과) (20)

### banner_atk — '공격 준비' 띠 (내 공격 차례)
지금: 새 자리 · 약 1초 · 파일 `banner_atk`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a sword drawn with a ringing metallic scrape over a deep, soft swell; confident and clear. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### banner_def — '방어 준비' 띠 (내 방어 차례)
지금: 새 자리 · 약 1초 · 파일 `banner_def`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy shield raised and braced: a solid wood-and-iron thud followed by a low resonant hum. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### banner_foe — '상대 차례' 띠
지금: 새 자리 · 약 0.8초 · 파일 `banner_foe`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a distant, muffled low drum hit with a soft airy tail; calm. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### banner_combat — '전투' 띠
지금: 새 자리 · 약 1.2초 · 파일 `banner_combat`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: two great iron-bound doors swinging open together: a deep boom with a long metallic ring-out. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### first_turn — 선공 · 후공이 정해질 때
지금: 새 자리 · 약 0.8초 · 파일 `first_turn`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a coin slapped down onto the back of an armoured gauntlet with a bright ring. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### confirm_atk — 공격 완료 단추
지금: `confirm` · 약 0.8초 · 파일 `confirm_atk`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a sword struck flat against a shield with a decisive clang, then a bright rising metallic ring. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### confirm_def — 방어 완료 단추
지금: `confirm` · 약 0.8초 · 파일 `confirm_def`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a tower shield planted hard into the ground: a deep thud, a short chain rattle and a low steady ring. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### confirm_ready — 준비 완료 단추 (멀리건 · 그 밖의 준비)
지금: `confirm` · 약 0.6초 · 파일 `confirm_ready`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a firm double knock on a wooden table followed by a crisp brass latch. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### coin_flip — 코인을 던질 때 (공중에서 도는 소리)
지금: 새 자리 · 약 0.6초 · 파일 `coin_flip`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy coin flicked into the air: a sharp thumb flick and a fast spinning metallic whirr. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### coinHeads — 코인 앞면
지금: `coinHeads` · 약 0.7초 · 파일 `coinHeads`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a gold coin landing face up on stone: a bright, clear ring with a short shimmering decay. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### coinTails — 코인 뒷면
지금: `coinTails` · 약 0.4초 · 파일 `coinTails`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a coin landing flat with a dull, short thud and no ring. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### coin_reflip — 에테르 1로 코인을 다시 던질 때
지금: 새 자리 · 약 0.7초 · 파일 `coin_reflip`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a soft ethereal whoosh gathering, then a coin flicked back up with a spinning ring. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### shield_coin — 보호막 코인을 던질 때
지금: 새 자리 · 약 0.7초 · 파일 `shield_coin`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a coin spun on a metal shield: a metallic spin, then a glassy protective shimmer rising. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### life_hit — 생명(심장석)이 직접 깎일 때
지금: `hitBig` · 약 0.8초 · 파일 `life_hit`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a deep, heavy heartbeat thud with a crystal cracking sharply inside it. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### life_heal — 생명이 회복될 때
지금: 새 자리 · 약 0.7초 · 파일 `life_heal`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a warm rising glow, like a heartbeat steadying inside a crystal. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### life_low — 생명이 위험할 때 (한 번만)
지금: 새 자리 · 약 1.2초 · 파일 `life_low`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: two slow, deep, muffled heartbeats under a faint ominous hum. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### deck_low — 덱이 얼마 남지 않았을 때
지금: 새 자리 · 약 0.8초 · 파일 `deck_low`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a thin stack of cards riffled slowly with a hollow, uneasy tick. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### surrender — 항복할 때
지금: 새 자리 · 약 0.8초 · 파일 `surrender`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a banner pole dropped onto stone with a hollow clatter and a soft cloth flop. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### victory — 결과 화면 — 승리 (짧은 음악)
지금: 새 자리 · 약 4초 · 짧은 음악 · 파일 `victory`

```text
Short orchestral stinger for a fantasy card game, about 4 seconds long: a triumphant but warm flourish: rising strings, a golden French horn chord and sparkling harp, ending on a bright major chord.
[00:00] Version 1.
[00:07] Version 2: a different variation of the same idea.
[00:14] Version 3: another variation.
[00:21] Silence until the end.
Warm, natural concert-hall recording; no drums, no synths. Instrumental, no vocals.
```

### defeat — 결과 화면 — 패배 (짧은 음악)
지금: 새 자리 · 약 4초 · 짧은 음악 · 파일 `defeat`

```text
Short orchestral stinger for a fantasy card game, about 4 seconds long: a melancholy phrase: low strings descend slowly, a soft horn sighs, ending on a hollow, quiet minor chord.
[00:00] Version 1.
[00:07] Version 2: a different variation of the same idea.
[00:14] Version 3: another variation.
[00:21] Silence until the end.
Warm, natural concert-hall recording; no drums, no synths. Instrumental, no vocals.
```

## 전투 — 공용 (카드 소리가 없을 때 · 능력 효과) (25)

### swing — 공격 유닛이 뛰쳐나갈 때
지금: `swing` · 약 0.3초 · 파일 `swing`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a quick, clean whoosh of a body lunging forward. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### hit — 일반 타격 (그 카드의 공격 소리가 아직 없을 때)
지금: `hit` · 약 0.4초 · 파일 `hit`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a solid, punchy impact on armour and flesh: a tight thump with a short crack. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### crit — 치명타
지금: `imp_crit` · 약 0.6초 · 파일 `crit`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a razor-sharp crack layered over a deep bass boom, with a short bright ring. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### block — 막음 — 피해 0
지금: `imp_block` · 약 0.5초 · 파일 `block`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a solid shield block: a firm clang with a bright ringing deflection. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### miss — 빗나감
지금: 새 자리 · 약 0.3초 · 파일 `miss`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a fast whoosh passing close by and missing, with a faint airy flutter. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### shatter — 유닛 카드가 부서질 때
지금: `shatter` · 약 0.9초 · 파일 `shatter`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a stone-and-glass card plaque cracking apart: a heavy crack, a crumbling break and debris scattering to both sides. About 0.9 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### thorns — [가시] 피해를 되돌려 줄 때
지금: 새 자리 · 약 0.4초 · 파일 `thorns`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a thorny bramble snapping back with a sharp sting and a rustle. About 0.4 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### guard — [수호] 대신 맞으러 나설 때
지금: 새 자리 · 약 0.5초 · 파일 `guard`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an armoured fighter stepping in front: a heavy footstep and a shield slammed into place. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pierce — [관통]
지금: 새 자리 · 약 0.5초 · 파일 `pierce`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a sharp thrust punching straight through a target and out the other side with a tearing whoosh. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### chain — [연쇄] 피해가 옮겨 갈 때
지금: 새 자리 · 약 0.7초 · 파일 `chain`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: one strike leaping from target to target: three quick linked cracks, each a little lighter. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### throw — [투척]
지금: 새 자리 · 약 0.6초 · 파일 `throw`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an object hurled overhand: a spinning whoosh and a heavy thud on impact. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### snipe — [사격]
지금: 새 자리 · 약 0.6초 · 파일 `snipe`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a single sharp distant shot, a thin zip through the air and a precise, hard impact. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### summon — 소환
지금: 새 자리 · 약 1초 · 파일 `summon`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a rune circle humming to life, a swirling rush of air and a creature landing with a soft thump. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### negate — [무효] 마법이 지워질 때
지금: 새 자리 · 약 0.7초 · 파일 `negate`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a spell snapped in half: a sharp glassy shatter followed by a reversed, collapsing whoosh. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### steal — 빼앗길 때
지금: 새 자리 · 약 0.5초 · 파일 `steal`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a quick snatching whoosh with a short rattle of chain. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### buff — 강화 (공 · 방 · 체가 오름)
지금: `sp_buff` · 약 0.6초 · 파일 `buff`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a rising, empowering surge of warm energy with a bright shimmer at the top. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### debuff — 약화 · 저주
지금: `sp_debuff` · 약 0.6초 · 파일 `debuff`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a sinking, draining sound, like light being pulled down into a dark hollow. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### shield — 보호막이 생길 때
지금: `sp_shield` · 약 0.6초 · 파일 `shield`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a protective dome of glassy light forming with a smooth rising hum and a soft ring. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### shield_break — 보호막이 깨질 때
지금: 새 자리 · 약 0.5초 · 파일 `shield_break`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a dome of glassy light cracking and shattering into tinkling fragments. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### heal — 치유
지금: `sp_heal` · 약 0.7초 · 파일 `heal`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a warm, soothing glow: soft shimmering light and a gentle, breath-like swell. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### cleanse — 씻어냄 (강화 · 약화를 지움)
지금: 새 자리 · 약 0.7초 · 파일 `cleanse`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a clear wave of water washing over, rinsing away a fading magical hum. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### reload — 장전 (잿불 고블린)
지금: 새 자리 · 약 0.7초 · 파일 `reload`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a musket being reloaded: a ramrod scraping down the barrel and a firm flintlock click. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### charge — 충전 (번개 노움)
지금: 새 자리 · 약 0.6초 · 파일 `charge`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a rising electric whine charging up, ending in a small crisp spark. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### rage — 격노 (바위주먹 오크)
지금: 새 자리 · 약 0.7초 · 파일 `rage`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a deep beastly huff and an earth-shaking stomp, with loose stones rattling. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### regrow — 재생 (이끼 트롤)
지금: 새 자리 · 약 0.7초 · 파일 `regrow`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: wood creaking and knitting back together with a soft rustle of new leaves. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 파친코 · 크로네아의 수레바퀴 · 결정 키우기 (12)

### pach_spin — SPIN — 레버를 당겨 릴이 돌기 시작할 때
지금: `pach_spin` · 약 0.9초 · 파일 `pach_spin`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy brass lever pulled down with a solid clack, then mechanical reels whirring up to speed. About 0.9 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_tick — 릴이 도는 동안의 틱 (짧게 되풀이)
지금: `pach_tick` · 약 0.1초 · 파일 `pach_tick`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a tiny, crisp ratchet tick of a brass pin flicking past. About 0.1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
Takes: three takes at slightly different pitches.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_stop — 릴 하나가 멈출 때
지금: `pach_stop` · 약 0.3초 · 파일 `pach_stop`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a firm mechanical stopper clunk followed by a short, bright ting. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
Takes: three takes, each one a little higher in pitch than the last (one per reel).
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_reach — 두 칸이 맞고 마지막 릴이 돌 때 (리치)
지금: 새 자리 · 약 1.5초 · 파일 `pach_reach`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a tense, rising shimmer over a quickening ratchet, building anticipation. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_win1 — 단체 문양 셋 — 작은 당첨
지금: `pach_win` · 약 1.5초 · 파일 `pach_win1`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a cheerful payout: a short cascade of coins into a metal tray with a bright sparkling chime. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_win2 — 진영 문장 셋 — 큰 당첨
지금: `pach_win` · 약 2.5초 · 파일 `pach_win2`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a big payout: a long waterfall of coins, ringing bells and rising sparkles. About 2.5 seconds.
[00:05] Take 2: the same sound, slightly varied.
[00:10] Take 3: the same sound, slightly varied.
[00:15] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pach_win3 — 세 진영 문장이 모두 다르게 — 카드 대박 (짧은 음악)
지금: `pach_win` · 약 3.5초 · 짧은 음악 · 파일 `pach_win3`

```text
Short orchestral stinger for a fantasy card game, about 3.5 seconds long: a jackpot celebration: one bright orchestral hit with sparkling harp and bells over a flood of coins, ending in shimmering light.
[00:00] Version 1.
[00:07] Version 2: a different variation of the same idea.
[00:14] Version 3: another variation.
[00:21] Silence until the end.
Warm, natural concert-hall recording; no drums, no synths. Instrumental, no vocals.
```

### pach_miss — 꽝
지금: `pach_miss` · 약 0.6초 · 파일 `pach_miss`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a soft, dull clunk and a gently deflating mechanical whir. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### grow_water — 결정 키우기: 물을 줄 때
지금: 새 자리 · 약 0.6초 · 파일 `grow_water`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: water droplets falling onto a crystal: a clear drip, a tiny splash and a faint glassy ring. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### grow_up — 결정이 한 단계 자랄 때
지금: 새 자리 · 약 0.8초 · 파일 `grow_up`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a crystal growing: a soft crystalline creak and a rising shimmer. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### grow_ripe — 결정이 다 여물어 상금을 받을 때
지금: 새 자리 · 약 1.5초 · 파일 `grow_ripe`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a crystal blooming to full size: a bright glassy bloom and a cascade of chiming sparkles. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### grow_reset — 라운드를 걸러 결정이 처음으로 돌아갈 때
지금: 새 자리 · 약 0.6초 · 파일 `grow_reset`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a small crystal crumbling softly into fine glittering dust. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 상점 · 교역소 · 합성소 (12)

### shop_buy — 상점에서 카드를 살 때
지금: `coinHeads` · 약 0.8초 · 파일 `shop_buy`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: coins counted out onto a wooden counter, then a card slid across with a crisp snap. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### shop_sell — 상점에 카드를 팔 때
지금: 새 자리 · 약 0.8초 · 파일 `shop_sell`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card slid across a counter, then coins scooped into a leather pouch. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### trade_offer — 교역소: 교환 제안을 보낼 때
지금: 새 자리 · 약 0.6초 · 파일 `trade_offer`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a letter folded and sealed with wax, then sent off with a soft whoosh. About 0.6 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### trade_done — 교역소: 거래가 성사될 때
지금: `coinHeads` · 약 0.9초 · 파일 `trade_done`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: two wax seals stamped one after another, then a bright clink of coins. About 0.9 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### auction_bid — 경매에 입찰할 때
지금: 새 자리 · 약 0.3초 · 파일 `auction_bid`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: one firm tap of a wooden gavel. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### auction_win — 경매에서 낙찰받을 때
지금: 새 자리 · 약 0.8초 · 파일 `auction_win`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: three gavel taps, the last one ringing, with a soft jingle of coins. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### forge_open — 합성소를 열 때
지금: `ui_open` · 약 0.8초 · 파일 `forge_open`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy forge door creaking open with a warm roar of glowing coals. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### forge_merge — 재료 카드 셋이 하나로 모일 때
지금: 새 자리 · 약 1.2초 · 파일 `forge_merge`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: three cards drawn together into a swirling vortex of light, spinning faster and faster. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### forge_hammer — 강화의 망치질
지금: 새 자리 · 약 1.5초 · 파일 `forge_hammer`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: three hammer strikes on an anvil, each one ringing a little brighter, with sparks crackling. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### forge_success — 강화 · 승화 성공
지금: `levelUp` · 약 1.8초 · 파일 `forge_success`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a radiant burst: a bright crystalline bloom, a resonant low bell and a card snapping into existence. About 1.8 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### orb_insert — 운명의 구슬을 넣을 때
지금: 새 자리 · 약 0.7초 · 파일 `orb_insert`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a glass orb set into a brass socket with a click and a deep resonant hum. About 0.7 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### seal_get — 순례의 인장을 받을 때
지금: 새 자리 · 약 0.5초 · 파일 `seal_get`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy iron stamp pressed onto thick parchment with a solid thunk. About 0.5 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 보상 · 성장 (11)

### gold_get — 환석 조각을 받을 때
지금: `coinHeads` · 약 0.8초 · 파일 `gold_get`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a handful of crystal shards clinking into a leather pouch with a bright glassy jingle. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### card_get — 카드 한 장을 얻을 때
지금: 새 자리 · 약 1.2초 · 파일 `card_get`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a card materialising: a rising magical swell, a soft whoosh and a crisp paper snap. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### reveal_rare — 레어 카드가 나올 때
지금: 새 자리 · 약 1.2초 · 파일 `reveal_rare`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a cool blue shimmer rising, then one clear crystalline chime. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### reveal_epic — 에픽 카드가 나올 때
지금: 새 자리 · 약 1.6초 · 파일 `reveal_epic`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a deep violet swell building, then a rich resonant bloom with sparkling tails. About 1.6 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### reveal_unique — 유니크 카드가 나올 때
지금: 새 자리 · 약 2초 · 파일 `reveal_unique`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a golden surge: a rising shimmer, one deep resonant bell strike and glittering light. About 2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### reveal_special — 스페셜 카드가 나올 때
지금: 새 자리 · 약 2.4초 · 파일 `reveal_special`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a mythic arrival: a deep sub-bass bloom, one great resonant bell and cascading shimmering light. About 2.4 seconds.
[00:05] Take 2: the same sound, slightly varied.
[00:10] Take 3: the same sound, slightly varied.
[00:15] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### levelUp — 모험가 레벨 업 (짧은 음악)
지금: `levelUp` · 약 2초 · 짧은 음악 · 파일 `levelUp`

```text
Short orchestral stinger for a fantasy card game, about 2 seconds long: a bright level-up moment: an ascending harp sweep and a warm, celebratory orchestral chord with sparkling bells.
[00:00] Version 1.
[00:06] Version 2: a different variation of the same idea.
[00:12] Version 3: another variation.
[00:18] Silence until the end.
Warm, natural concert-hall recording; no drums, no synths. Instrumental, no vocals.
```

### xp_fill — 경험치 막대가 차오를 때
지금: 새 자리 · 약 0.8초 · 파일 `xp_fill`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a smooth rising glassy fill, like liquid light climbing a tube. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### quest_done — 퀘스트 완료
지금: `coinHeads` · 약 0.8초 · 파일 `quest_done`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a quill ticking off a line on parchment, followed by a soft bright chime. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### achievement — 업적 · 칭호를 얻을 때
지금: 새 자리 · 약 1.2초 · 파일 `achievement`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a metal medal pinned on: a bright ring, a shimmer and a soft swell. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### daily_reward — 하루 첫 승 보상을 받을 때
지금: 새 자리 · 약 1.2초 · 파일 `daily_reward`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a treasure chest lid creaking open with a warm shimmer and a jingle of crystal shards. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 순례 · 원정 · 지도 (6)

### map_open — 지도를 펼칠 때
지금: `ui_open` · 약 0.8초 · 파일 `map_open`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a large parchment map unrolled across a table with a broad, crackling rustle. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### map_step — 지도에서 다음 관문으로 걸어갈 때
지금: 새 자리 · 약 0.8초 · 파일 `map_step`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: two footsteps on a gravel road and the soft rustle of a travel cloak. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### gate_open — 관문이 열릴 때
지금: 새 자리 · 약 1.2초 · 파일 `gate_open`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an old iron gate creaking open on rusty hinges. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### gate_clear — 관문을 넘었을 때
지금: 새 자리 · 약 1.5초 · 파일 `gate_clear`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a deep bronze bell struck once, its resonance fading slowly. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### forest_enter — 망각의 숲에 들어설 때
지금: 새 자리 · 약 1.5초 · 파일 `forest_enter`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: an eerie wind through dark trees, distant creaking branches and a faint unsettling hum. About 1.5 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### pilgrim_done — 순례를 끝까지 마쳤을 때
지금: 새 자리 · 약 2초 · 파일 `pilgrim_done`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a great bronze bell struck twice with warm, glowing resonance and a rising shimmer. About 2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

## 온라인 (4)

### match_found — 상대를 찾았을 때 · 방에 상대가 들어왔을 때
지금: 새 자리 · 약 1초 · 파일 `match_found`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a crystal ball humming to life, followed by one soft, clear bell tone. About 1 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### chat — 채팅 · 알림이 왔을 때
지금: 새 자리 · 약 0.3초 · 파일 `chat`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a soft wooden tick followed by a tiny glassy chime. About 0.3 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### timer_warn — 남은 시간이 얼마 없을 때
지금: 새 자리 · 약 1.2초 · 파일 `timer_warn`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: three steady ticks of an old clock, the last one slightly louder. About 1.2 seconds.
[00:04] Take 2: the same sound, slightly varied.
[00:08] Take 3: the same sound, slightly varied.
[00:12] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```

### foe_left — 상대가 나갔을 때
지금: 새 자리 · 약 0.8초 · 파일 `foe_left`

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Fantasy card game, interface and battle sounds.
[00:00] Take 1: a heavy door closing far away with a muffled thud. About 0.8 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Each take is followed by complete silence.
```


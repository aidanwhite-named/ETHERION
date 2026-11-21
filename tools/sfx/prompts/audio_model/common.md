# ETHERION 게임 효과음 — GPT 오디오 모델 버전

> 분류: **오디오 모델 버전** · 157개 게임 공용 사운드. 카드별 공격·방어·마법 발동·아이템 장착 사운드는 포함하지 않는다.
> 원본은 `tools/sfx/sfx_common.json`, 생성기는 `tools/sfx/build_audio_model_prompts.js`. 각 프롬프트를 GPT 오디오 모델에 하나씩 넣고 결과를 `audio/inbox/sfx/audio_model/<키>.wav`로 저장한다.
> 프롬프트 언어는 생성 모델의 지시 이해를 위해 영어로 유지했다. 길이는 원본 목록의 항목별 값이다.

## 메뉴 · 화면 (12)

### `ui_click` — 메뉴 단추를 누를 때
분류: 게임 효과음 · 약 0.15초 · 파일 `audio/inbox/sfx/audio_model/ui_click.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a crisp, satisfying click of a small brass switch set in dark wood, with a tiny soft low thump underneath; clean and immediate, not sharp. Duration: about 0.15 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_hover` — 단추 위에 커서가 올라갈 때 (아주 작게)
분류: 게임 효과음 · 약 0.08초 · 파일 `audio/inbox/sfx/audio_model/ui_hover.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an extremely soft, airy tick, like a fingertip brushing polished wood; barely there. Duration: about 0.08 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_card` — 메뉴 · 상점 · 도감에서 카드를 누를 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/ui_card.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a thick card lifted from a velvet tray: a soft papery snap and a faint warm glassy shimmer. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_deck` — 덱을 고를 때
분류: 게임 효과음 · 약 0.35초 · 파일 `audio/inbox/sfx/audio_model/ui_deck.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. the brass latch of a leather-bound deck case clicking open with a firm, tidy double click. Duration: about 0.35 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_open` — 창이 열릴 때
분류: 게임 효과음 · 약 0.45초 · 파일 `audio/inbox/sfx/audio_model/ui_open.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy parchment panel unfolding with a soft whoosh and a gentle low wooden knock. Duration: about 0.45 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_close` — 창이 닫힐 때
분류: 게임 효과음 · 약 0.35초 · 파일 `audio/inbox/sfx/audio_model/ui_close.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a parchment panel folding shut: a short reverse whoosh ending in a muted soft thud. Duration: about 0.35 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_tab` — 탭을 바꿀 때
분류: 게임 효과음 · 약 0.2초 · 파일 `audio/inbox/sfx/audio_model/ui_tab.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quick, light flick of a stiff paper tab, crisp and tidy. Duration: about 0.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_toggle` — 설정의 켜기 · 끄기, 체크 상자
분류: 게임 효과음 · 약 0.15초 · 파일 `audio/inbox/sfx/audio_model/ui_toggle.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a small, precise metal toggle snapping into place with a clean click. Duration: about 0.15 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ui_slider` — 음량 막대를 끌 때 (짧게 되풀이)
분류: 게임 효과음 · 약 0.06초 · 파일 `audio/inbox/sfx/audio_model/ui_slider.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a tiny, fine ratchet tick of a small brass dial. Duration: about 0.06 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `page_turn` — 룰북 · 매뉴얼 · 연대기의 책장을 넘길 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/page_turn.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. one heavy vellum page turning in an old book: a soft papery sweep and a gentle settle. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `toast` — 알림 띠가 뜰 때
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/toast.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a soft, clear glassy ping of a small crystal, gentle and short. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deny` — 안 됨 · 경고
분류: 게임 효과음 · 약 0.35초 · 파일 `audio/inbox/sfx/audio_model/deny.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. two quick, dull knocks on an iron-banded wooden door, low and firm, clearly a refusal but never harsh. Duration: about 0.35 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 입장 · 대기실 · 덱 조정실 (9)

### `portal_open` — 입장 관문이 열릴 때
분류: 게임 효과음 · 약 1.6초 · 파일 `audio/inbox/sfx/audio_model/portal_open.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an ancient stone gate grinding open with a deep rumble, then a rush of shimmering ethereal air pouring through. Duration: about 1.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `login_ok` — 로그인 · 입장에 성공했을 때
분류: 게임 효과음 · 약 0.9초 · 파일 `audio/inbox/sfx/audio_model/login_ok.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a warm rising shimmer of crystal blooming into one soft, low resonant bell tone. Duration: about 0.9 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `flag_pick` — 대기실에서 깃발을 고를 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/flag_pick.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy cloth banner unfurling with a strong snap of fabric and a creak of its wooden pole. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `sortie` — 출정 — 대전을 시작하는 단추
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/sortie.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a sword drawn from its scabbard with a bright ringing scrape, followed by one deep, soft drum-like boom. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_add` — 덱 조정실: 카드를 덱에 넣을 때
분류: 게임 효과음 · 약 0.25초 · 파일 `audio/inbox/sfx/audio_model/deck_add.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card slid neatly into a stack: a quick papery swish ending in a soft, crisp tap. Duration: about 0.25 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_remove` — 덱 조정실: 카드를 덱에서 뺄 때
분류: 게임 효과음 · 약 0.25초 · 파일 `audio/inbox/sfx/audio_model/deck_remove.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card pulled out of a stack with a light whisk and a soft flutter. Duration: about 0.25 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_full` — 덱이 정해진 장수로 꽉 찼을 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/deck_full.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a satisfying heavy latch closing, followed by one warm glassy chime. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_save` — 덱을 저장할 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/deck_save.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a wax seal pressed firmly onto parchment: a soft squish and a solid stamp. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_code` — 덱 코드를 복사하거나 읽을 때
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/deck_code.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quill scratching one quick flourish across parchment. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 전장 — 카드 다루기 (19)

### `shuffle` — 덱을 섞을 때
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/shuffle.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a thick deck of stiff cards riffle-shuffled and bridged: a fast ripple of cards and a final square tap. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `draw` — 카드를 뽑을 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/draw.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a single thick card drawn from a deck: a short soft paper slide and a gentle muted tap; warm, low and dry, no hiss. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `mulligan` — 시작 핸드를 바꿀 때 (멀리건)
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/mulligan.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. several cards swept back into the deck with a broad papery whoosh, then new cards dealt in quick, soft snaps. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `handHover` — 핸드에서 카드와 카드 사이를 넘나들 때
분류: 게임 효과음 · 약 0.1초 · 파일 `audio/inbox/sfx/audio_model/handHover.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a very soft low paper touch, like a fingertip brushing thick card stock; muffled and warm, no high frequencies. Duration: about 0.1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `select` — 카드를 고를 때
분류: 게임 효과음 · 약 0.2초 · 파일 `audio/inbox/sfx/audio_model/select.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card lifted with a firm, soft click and a faint airy lift. Duration: about 0.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `unselect` — 고르기를 풀 때
분류: 게임 효과음 · 약 0.18초 · 파일 `audio/inbox/sfx/audio_model/unselect.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card set back down with a soft leathery pat. Duration: about 0.18 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pick` — 카드를 끌기 시작할 때
분류: 게임 효과음 · 약 0.2초 · 파일 `audio/inbox/sfx/audio_model/pick.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card peeled up off the table with a faint whoosh. Duration: about 0.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `hover` — 끌던 카드가 놓을 칸에 닿을 때
분류: 게임 효과음 · 약 0.08초 · 파일 `audio/inbox/sfx/audio_model/hover.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a tiny soft low wooden tock, muffled and gentle, no high frequencies. Duration: about 0.08 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `back` — 놓을 수 없는 곳에서 카드가 제자리로 돌아갈 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/back.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card sliding back into the hand with a soft reverse swish. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `place` — 유닛을 전장에 내려놓을 때
분류: 게임 효과음 · 약 0.35초 · 파일 `audio/inbox/sfx/audio_model/place.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy card set down firmly on a wooden table: a single deep soft thud, dry and short. Duration: about 0.35 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `spell_set` — 마법을 뒷면으로 칸에 놓을 때
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/spell_set.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a face-down card set gently onto stone with a hushed, mysterious low whoosh and a faint tick. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `sp_reveal` — 마법 카드가 뒤집혀 발동할 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/sp_reveal.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card flipped over with a bright whoosh and a burst of tiny magical sparks. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `move` — 전장에서 자리를 바꿀 때
분류: 게임 효과음 · 약 0.35초 · 파일 `audio/inbox/sfx/audio_model/move.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card sliding across stone with a smooth scrape, ending in a soft click. Duration: about 0.35 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `equip` — 아이템 장착 (그 아이템의 소리가 아직 없을 때)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/equip.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a piece of gear fitted onto a fighter: a leather strap tightened and a metal buckle snapping shut. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `crystal` — 결정화
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/crystal.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card dissolving into a clear crystal: a rising glassy resonance and a sprinkle of tiny sparkles. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `burn` — 소각
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/burn.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card dropped into a fire pit: a low soft whoomp of flame and a warm gentle crackle of burning wood; muffled and low, no hiss. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ether_gain` — 턴이 시작되며 에테르가 차오를 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/ether_gain.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a soft rising shimmer, like light pouring into a glass vessel. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `upkeep` — 유지비로 에테르가 빠질 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/upkeep.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a faint descending glassy drain, like light seeping out of a crystal. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `upkeep_burn` — 유지비가 모자라 유닛이 소각될 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/upkeep_burn.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a fading crystal hum collapsing into a dry crackle of embers. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 전장 — 흐름 (차례 · 코인 · 생명 · 결과) (20)

### `banner_atk` — '공격 준비' 띠 (내 공격 차례)
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/banner_atk.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a sword drawn with a ringing metallic scrape over a deep, soft swell; confident and clear. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `banner_def` — '방어 준비' 띠 (내 방어 차례)
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/banner_def.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy shield raised and braced: a solid wood-and-iron thud followed by a low resonant hum. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `banner_foe` — '상대 차례' 띠
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/banner_foe.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a distant, muffled low drum hit with a soft airy tail; calm. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `banner_combat` — '전투' 띠
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/banner_combat.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. two great iron-bound doors swinging open together: a deep boom with a long metallic ring-out. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `first_turn` — 선공 · 후공이 정해질 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/first_turn.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a coin slapped down onto the back of an armoured gauntlet with a bright ring. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `confirm_atk` — 공격 완료 단추
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/confirm_atk.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a sword struck flat against a shield: one short decisive clang that stops quickly; dry, no ringing tail, no reverb. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `confirm_def` — 방어 완료 단추
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/confirm_def.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a tower shield planted hard into the ground: one deep heavy thud with a short dull clank; dry and short, no ringing tail, no reverb. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `confirm_ready` — 준비 완료 단추 (멀리건 · 그 밖의 준비)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/confirm_ready.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a firm double knock on a wooden table followed by a crisp brass latch. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `coin_flip` — 코인을 던질 때 (공중에서 도는 소리)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/coin_flip.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy gold coin tossed up with a thumb: a soft dull flick, then two muffled low metallic tumbles in the air; warm and round, no whirring, no hiss. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `coinHeads` — 코인 앞면
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/coinHeads.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a gold coin landing face up on stone: a bright, clear ring with a short shimmering decay. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `coinTails` — 코인 뒷면
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/coinTails.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a coin landing flat with a dull, short thud and no ring. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `coin_reflip` — 에테르 1로 코인을 다시 던질 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/coin_reflip.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a soft low magical swell, then a heavy coin tossed up again with a dull flick and a short muted metallic tumble; warm and round, no whirring, no hiss. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shield_coin` — 보호막 코인을 던질 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/shield_coin.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a coin spun on a metal shield: a metallic spin, then a glassy protective shimmer rising. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `life_hit` — 생명(심장석)이 직접 깎일 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/life_hit.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a deep, heavy heartbeat thud with a crystal cracking sharply inside it. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `life_heal` — 생명이 회복될 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/life_heal.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a warm rising glow, like a heartbeat steadying inside a crystal. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `life_low` — 생명이 위험할 때 (한 번만)
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/life_low.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. two slow, deep, muffled heartbeats under a faint ominous hum. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `deck_low` — 덱이 얼마 남지 않았을 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/deck_low.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a thin stack of cards riffled slowly with a hollow, uneasy tick. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `surrender` — 항복할 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/surrender.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a banner pole dropped onto stone with a hollow clatter and a soft cloth flop. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `victory` — 결과 화면 — 승리 (짧은 음악)
분류: 짧은 게임 음악 스팅어 · 약 4초 · 파일 `audio/inbox/sfx/audio_model/victory.wav`

```text
Create a short instrumental fantasy game stinger, not a looping song. No voices. a triumphant but warm flourish: rising strings, a golden French horn chord and sparkling harp, ending on a bright major chord. Duration: about 4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `defeat` — 결과 화면 — 패배 (짧은 음악)
분류: 짧은 게임 음악 스팅어 · 약 4초 · 파일 `audio/inbox/sfx/audio_model/defeat.wav`

```text
Create a short instrumental fantasy game stinger, not a looping song. No voices. a melancholy phrase: low strings descend slowly, a soft horn sighs, ending on a hollow, quiet minor chord. Duration: about 4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 전투 — 공용 (카드 소리가 없을 때 · 능력 효과) (52)

### `swing` — 공격 유닛이 뛰쳐나갈 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/swing.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quick, clean whoosh of a body lunging forward. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `hit` — 일반 타격 (그 카드의 공격 소리가 아직 없을 때)
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/hit.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a solid, punchy impact on armour and flesh: a tight thump with a short crack. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `crit` — 치명타
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/crit.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a razor-sharp crack layered over a deep bass boom, with a short bright ring. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `block` — 막음 — 피해 0
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/block.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a solid shield block: a firm clang with a bright ringing deflection. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `miss` — 빗나감
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/miss.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a fast whoosh passing close by and missing, with a faint airy flutter. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shatter` — 유닛 카드가 부서질 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/shatter.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a stone card plaque breaking apart: a heavy low crack and chunks of stone crumbling onto a wooden table; dull, earthy and dry, no glass, no hiss. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `thorns` — [가시] 피해를 되돌려 줄 때
분류: 게임 효과음 · 약 0.4초 · 파일 `audio/inbox/sfx/audio_model/thorns.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a thorny bramble snapping back with a sharp sting and a rustle. Duration: about 0.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `guard` — [수호] 대신 맞으러 나설 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/guard.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an armoured fighter stepping in front: a heavy footstep and a shield slammed into place. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pierce` — [관통]
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/pierce.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a sharp thrust punching straight through a target and out the other side with a tearing whoosh. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `chain` — [연쇄] 피해가 옮겨 갈 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/chain.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. one strike leaping from target to target: three quick linked cracks, each a little lighter. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `throw` — [투척]
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/throw.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an object hurled overhand: a spinning whoosh and a heavy thud on impact. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `snipe` — [사격]
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/snipe.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a single sharp distant shot, a thin zip through the air and a precise, hard impact. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `summon` — 소환
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/summon.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a rune circle humming to life, a swirling rush of air and a creature landing with a soft thump. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `negate` — [무효] 마법이 지워질 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/negate.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a spell snapped in half: a sharp glassy shatter followed by a reversed, collapsing whoosh. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `steal` — 빼앗길 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/steal.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quick snatching whoosh with a short rattle of chain. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `buff` — 강화 (공 · 방 · 체가 오름)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/buff.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a rising, empowering surge of warm energy with a bright shimmer at the top. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `debuff` — 약화 · 저주
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/debuff.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a sinking, draining sound, like light being pulled down into a dark hollow. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shield` — 보호막이 생길 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/shield.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a protective dome of glassy light forming with a smooth rising hum and a soft ring. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shield_break` — 보호막이 깨질 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/shield_break.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a dome of glassy light cracking and shattering into tinkling fragments. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `heal` — 치유
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/heal.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a warm, soothing glow: soft shimmering light and a gentle, breath-like swell. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `cleanse` — 씻어냄 (강화 · 약화를 지움)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/cleanse.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a clear wave of water washing over, rinsing away a fading magical hum. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `reload` — 장전 (잿불 고블린)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/reload.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a musket being reloaded: a ramrod scraping down the barrel and a firm flintlock click. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `charge` — 충전 (번개 노움)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/charge.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a rising electric whine charging up, ending in a small crisp spark. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `rage` — 격노 (바위주먹 오크)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/rage.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a deep beastly huff and an earth-shaking stomp, with loose stones rattling. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `regrow` — 재생 (이끼 트롤)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/regrow.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. wood creaking and knitting back together with a soft rustle of new leaves. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ignite` — [점화] — 고블린이 불씨를 쏘아 날림 (v3.73)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/ignite.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a flint strikes and a small fireball is flicked away: a sharp spark snap and a quick fiery whoosh flying off. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `scorch` — 화상이 붙을 때 ([점화] · 불씨 · 화상 마법)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/scorch.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a target catches fire: a soft whump of flame igniting, then a hungry crackle and sizzle that keeps smouldering. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `flame_armor` — [화염 갑주] — 친 유닛에게 불이 옮겨붙음 (v3.73)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/flame_armor.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. heated armour flares up on contact: a hot metallic clank and a sudden burst of flame lashing back with a roaring whoosh. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `burn_burst` — 화상이 터질 때 · 불씨 피해 (전투 시작)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/burn_burst.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. smouldering embers suddenly burst into a bright flare: a sharp fiery pop and a short roaring flame that dies into crackling ash. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `bleed` — [출혈] 피가 흘러 체력이 깎일 때 (마족)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/bleed.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an open wound pulses: a low wet throb and a few heavy drops of blood dripping onto stone, dark and close. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `fear` — [공포 N] 걸림 · 발동 (마족 [저주], v3.95 — 떠오르는 글 '공포 N')
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/fear.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a chill creeps close: a cold breathy whisper hissing near the ear, a faint shivering rattle of loose armour and a sinking low hum that fades into hush. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `plague` — [역병 N] 걸림 · 발동 · 옮음 (마족 [저주], v3.95 — '역병 N' · '역병 · 능력 꺼짐')
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/plague.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. sticky rot takes hold: a wet gluey squelch, a slow bubbling ooze of decay and a damp crackling hiss spreading outward like creeping mould. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `mend` — [치유] — 인어가 맞붙은 뒤 물로 상처를 채움 (v3.68)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/mend.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. cool water flows over a wound: a soft bubbling trickle and a gentle rising watery shimmer that closes the cut. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `arcane` — [마력 공격] — 물의 마력이 방어를 뚫고 들어감 (인어)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/arcane.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a pulse of deep water magic presses through armour: a resonant liquid hum and a dense pressurised thrum that sinks inward. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `sea_guard` — [바다의 보호] — 받는 피해를 물결이 줄임 (인어 오라)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/sea_guard.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a thin wall of water catches a blow: a muffled watery slap and a soft splash that softens the impact into ripples. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `ward` — [가호] — 처음 받는 피해를 빛이 줄임 · 출혈을 줄임 (천족)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/ward.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a blessed halo of light absorbs a hit: a warm muffled thud and a soft bright bell-like chime fading out. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `regen` — [재생] — 트롤 살과 껍질이 다시 붙음 (v3.74)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/regen.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. tough troll flesh knitting closed: a wet fleshy squelch, a creak of bark-like skin pulling tight and a low satisfied grumble. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shield_bash` — [방패 반격] — 드워프가 방패로 되받아침 (v3.74)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/shield_bash.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy iron shield is slammed forward into an attacker: a short grunt-free shove, a big metallic bash and a deep ringing clang. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `firm` — [굳건] — 자리 바꾸기 · 빼앗기를 버팀 (v3.74)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/firm.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an immovable stance holds: heavy iron boots grinding into stone, a deep solid anchoring thud and a short steady metallic hum. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `purify` — [정화] — 화상 · 불씨 · 낙인 · 저주(공포 · 역병)를 지우고 출혈을 막음 (v3.74 · v3.95)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/purify.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. holy light washes a curse away: a clear rising choir-like chime and a soft hiss of dark smoke dissolving into brightness. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `intercept` — [요격] — 원거리 공격자에게도 반격 (v3.74 노움)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/intercept.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quick electric counter-shot: a sharp crackling zap leaping back along a line and a bright snapping spark at the end. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `retreat` — [후퇴] — 유닛이 맨 뒤로 물러남 (엘프 마법)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/retreat.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a light-footed withdrawal: quick soft footsteps on leaves, a swish of a cloak and a fading rustle as someone slips back into cover. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `aura` — [레어 오라] — 전투가 시작될 때 이웃 유닛을 북돋움 (v3.69)
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/aura.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a commanding aura spreads to nearby allies: a warm low swell of energy and a soft shimmering ring that radiates outward. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `huntfire` — [불꽃 사냥] — 불붙은 상대를 덮치는 불길 (v3.81 도르마크의 갈비뼈 화로)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/huntfire.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. flames leaping hungrily onto a burning target: a sudden roaring flare of fire and a fierce crackling whoosh. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `riposte` — [되받기] — 막아 낸 칼이 되튀는 쇳소리 (v3.81 소르그림의 첫 갑주)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/riposte.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy iron plate deflecting a blade and snapping back: a sharp metallic clang followed by a bright ringing ricochet. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `overload` — [과부하] — 벼락이 팔로 몰리는 소리 (v3.81 케라운의 벼락 심장)
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/overload.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. surging lightning gathering along a limb: a rising crackling electric hum ending in a sharp static snap. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `devour` — [포식] — 삼키는 듯 낮은 으르렁 (v3.81 고르바스의 부러진 송곳니)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/devour.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a primal beastly growl swelling as it devours prey: a deep rumbling snarl and a heavy guttural crunch. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `drain` — [뿌리 흡수] — 뿌리가 숨을 빨아들이는 소리 (v3.81 베르단의 첫 뿔)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/drain.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. living roots drinking life: a dry woody creak and a soft siphoning whoosh pulling inward into green foliage. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `flow` — [밀물] — 밀려드는 물결 (v3.81 마렌시아의 눈물 성배)
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/flow.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a gentle, luminous tide surging forward: a smooth rushing wave of clear water and a soft soothing shimmer. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `judge` — [심판] — 판결의 종소리 (v3.81 하르간의 양손검)
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/judge.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a solemn bell of judgment: one deep, clear bronze bell toll with a bright resonant halo fading slowly. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `sentry` — [경계의 화살] — 경계 너머에서 날아오는 화살 (v3.81 세렌의 활)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/sentry.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a warning arrow loosed from afar: a taut bowstring twang, a fast whistling zip through the air and a crisp strike. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `mark` — [표식] — 표식이 새겨지는 바람 소리 (v3.81 이벨의 깃펜)
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/mark.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a swift mark etched in mid-air: a sharp whistling sweep of wind and a crisp quill-like scratch sealing with a faint chime. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 파친코 · 크로네아의 수레바퀴 · 결정 키우기 (12)

### `pach_spin` — SPIN — 레버를 당겨 릴이 돌기 시작할 때
분류: 게임 효과음 · 약 0.9초 · 파일 `audio/inbox/sfx/audio_model/pach_spin.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy brass lever pulled down with a solid wooden clack, then a soft low rolling rumble of wooden reels starting to turn; warm, no whirring, no hiss. Duration: about 0.9 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_tick` — 릴이 도는 동안의 틱 (짧게 되풀이)
분류: 게임 효과음 · 약 0.05초 · 파일 `audio/inbox/sfx/audio_model/pach_tick.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a tiny soft wooden click, muffled and low. Duration: about 0.05 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_stop` — 릴 하나가 멈출 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/pach_stop.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a firm low wooden clunk of a reel stopping, short and dry. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_reach` — 두 칸이 맞고 마지막 릴이 돌 때 (리치)
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/pach_reach.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a tense, rising shimmer over a quickening ratchet, building anticipation. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_win1` — 단체 문양 셋 — 작은 당첨
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/pach_win1.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a cheerful payout: a short cascade of coins into a metal tray with a bright sparkling chime. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_win2` — 진영 문장 셋 — 큰 당첨
분류: 게임 효과음 · 약 2.5초 · 파일 `audio/inbox/sfx/audio_model/pach_win2.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a big payout: a long waterfall of coins, ringing bells and rising sparkles. Duration: about 2.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_win3` — 세 진영 문장이 모두 다르게 — 카드 대박 (짧은 음악)
분류: 짧은 게임 음악 스팅어 · 약 3.5초 · 파일 `audio/inbox/sfx/audio_model/pach_win3.wav`

```text
Create a short instrumental fantasy game stinger, not a looping song. No voices. a jackpot celebration: one bright orchestral hit with sparkling harp and bells over a flood of coins, ending in shimmering light. Duration: about 3.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pach_miss` — 꽝
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/pach_miss.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a soft, dull clunk and a gently deflating mechanical whir. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `grow_water` — 결정 키우기: 물을 줄 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/grow_water.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. water poured from a small clay jug onto soil: a short gentle splash and a soft round gurgle; low and warm, no hiss. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `grow_up` — 결정이 한 단계 자랄 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/grow_up.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a crystal growing: a soft crystalline creak and a rising shimmer. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `grow_ripe` — 결정이 다 여물어 상금을 받을 때
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/grow_ripe.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a crystal blooming to full size: a bright glassy bloom and a cascade of chiming sparkles. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `grow_reset` — 라운드를 걸러 결정이 처음으로 돌아갈 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/grow_reset.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a small crystal crumbling softly into fine glittering dust. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 상점 · 교역소 · 합성소 (12)

### `shop_buy` — 상점에서 카드를 살 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/shop_buy.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. coins counted out onto a wooden counter, then a card slid across with a crisp snap. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `shop_sell` — 상점에 카드를 팔 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/shop_sell.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card slid across a counter, then coins scooped into a leather pouch. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `trade_offer` — 교역소: 교환 제안을 보낼 때
분류: 게임 효과음 · 약 0.6초 · 파일 `audio/inbox/sfx/audio_model/trade_offer.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a letter folded and sealed with wax, then sent off with a soft whoosh. Duration: about 0.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `trade_done` — 교역소: 거래가 성사될 때
분류: 게임 효과음 · 약 0.9초 · 파일 `audio/inbox/sfx/audio_model/trade_done.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. two wax seals stamped one after another, then a bright clink of coins. Duration: about 0.9 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `auction_bid` — 경매에 입찰할 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/auction_bid.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. one firm tap of a wooden gavel. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `auction_win` — 경매에서 낙찰받을 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/auction_win.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. three gavel taps, the last one ringing, with a soft jingle of coins. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `forge_open` — 합성소를 열 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/forge_open.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy forge door creaking open with a warm roar of glowing coals. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `forge_merge` — 재료 카드 셋이 하나로 모일 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/forge_merge.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. three cards drawn together into a swirling vortex of light, spinning faster and faster. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `forge_hammer` — 강화의 망치질
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/forge_hammer.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. three hammer strikes on an anvil, each one ringing a little brighter, with sparks crackling. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `forge_success` — 강화 · 승화 성공
분류: 게임 효과음 · 약 1.8초 · 파일 `audio/inbox/sfx/audio_model/forge_success.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a radiant burst: a bright crystalline bloom, a resonant low bell and a card snapping into existence. Duration: about 1.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `orb_insert` — 운명의 구슬을 넣을 때
분류: 게임 효과음 · 약 0.7초 · 파일 `audio/inbox/sfx/audio_model/orb_insert.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a glass orb set into a brass socket with a click and a deep resonant hum. Duration: about 0.7 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `seal_get` — 순례의 인장을 받을 때
분류: 게임 효과음 · 약 0.5초 · 파일 `audio/inbox/sfx/audio_model/seal_get.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy iron stamp pressed onto thick parchment with a solid thunk. Duration: about 0.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 보상 · 성장 (11)

### `gold_get` — 환석 조각을 받을 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/gold_get.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a handful of crystal shards clinking into a leather pouch with a bright glassy jingle. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `card_get` — 카드 한 장을 얻을 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/card_get.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a card materialising: a rising magical swell, a soft whoosh and a crisp paper snap. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `reveal_rare` — 레어 카드가 나올 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/reveal_rare.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a cool blue shimmer rising, then one clear crystalline chime. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `reveal_epic` — 에픽 카드가 나올 때
분류: 게임 효과음 · 약 1.6초 · 파일 `audio/inbox/sfx/audio_model/reveal_epic.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a deep violet swell building, then a rich resonant bloom with sparkling tails. Duration: about 1.6 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `reveal_unique` — 유니크 카드가 나올 때
분류: 게임 효과음 · 약 2초 · 파일 `audio/inbox/sfx/audio_model/reveal_unique.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a golden surge: a rising shimmer, one deep resonant bell strike and glittering light. Duration: about 2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `reveal_special` — 스페셜 카드가 나올 때
분류: 게임 효과음 · 약 2.4초 · 파일 `audio/inbox/sfx/audio_model/reveal_special.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a mythic arrival: a deep sub-bass bloom, one great resonant bell and cascading shimmering light. Duration: about 2.4 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `levelUp` — 모험가 레벨 업 (짧은 음악)
분류: 짧은 게임 음악 스팅어 · 약 2초 · 파일 `audio/inbox/sfx/audio_model/levelUp.wav`

```text
Create a short instrumental fantasy game stinger, not a looping song. No voices. a bright level-up moment: an ascending harp sweep and a warm, celebratory orchestral chord with sparkling bells. Duration: about 2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `xp_fill` — 경험치 막대가 차오를 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/xp_fill.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a smooth rising glassy fill, like liquid light climbing a tube. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `quest_done` — 퀘스트 완료
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/quest_done.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a quill ticking off a line on parchment, followed by a soft bright chime. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `achievement` — 업적 · 칭호를 얻을 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/achievement.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a metal medal pinned on: a bright ring, a shimmer and a soft swell. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `daily_reward` — 하루 첫 승 보상을 받을 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/daily_reward.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a treasure chest lid creaking open with a warm shimmer and a jingle of crystal shards. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 순례 · 원정 · 지도 (6)

### `map_open` — 지도를 펼칠 때
분류: 게임 효과음 · 약 0.9초 · 파일 `audio/inbox/sfx/audio_model/map_open.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy oak door opening onto a quiet forest path: a low soft wooden thump, a warm breath of air and one soft footstep on moss; warm, low and muffled, no hiss. Duration: about 0.9 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `map_step` — 지도에서 다음 관문으로 걸어갈 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/map_step.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. two footsteps on a gravel road and the soft rustle of a travel cloak. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `gate_open` — 관문이 열릴 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/gate_open.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an old iron gate creaking open on rusty hinges. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `gate_clear` — 관문을 넘었을 때
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/gate_clear.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a deep bronze bell struck once, its resonance fading slowly. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `forest_enter` — 망각의 숲에 들어설 때
분류: 게임 효과음 · 약 1.5초 · 파일 `audio/inbox/sfx/audio_model/forest_enter.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. an eerie wind through dark trees, distant creaking branches and a faint unsettling hum. Duration: about 1.5 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `pilgrim_done` — 순례를 끝까지 마쳤을 때
분류: 게임 효과음 · 약 2초 · 파일 `audio/inbox/sfx/audio_model/pilgrim_done.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a great bronze bell struck twice with warm, glowing resonance and a rising shimmer. Duration: about 2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 온라인 (4)

### `match_found` — 상대를 찾았을 때 · 방에 상대가 들어왔을 때
분류: 게임 효과음 · 약 1초 · 파일 `audio/inbox/sfx/audio_model/match_found.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a crystal ball humming to life, followed by one soft, clear bell tone. Duration: about 1 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `chat` — 채팅 · 알림이 왔을 때
분류: 게임 효과음 · 약 0.3초 · 파일 `audio/inbox/sfx/audio_model/chat.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a soft wooden tick followed by a tiny glassy chime. Duration: about 0.3 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `timer_warn` — 남은 시간이 얼마 없을 때
분류: 게임 효과음 · 약 1.2초 · 파일 `audio/inbox/sfx/audio_model/timer_warn.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. three steady ticks of an old clock, the last one slightly louder. Duration: about 1.2 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

### `foe_left` — 상대가 나갔을 때
분류: 게임 효과음 · 약 0.8초 · 파일 `audio/inbox/sfx/audio_model/foe_left.wav`

```text
Create one isolated fantasy game sound effect. No music, speech, or ambience. a heavy door closing far away with a muffled thud. Duration: about 0.8 seconds. Start immediately, make the sound clear and self-contained, then let its natural tail end cleanly. Avoid extra events.
```

## 카드 효과음

카드 효과음은 별도 파일로 분류했다: 카드 706장, 개별 소리 1121개. 깃발별 프롬프트는 `cards/<깃발>.md`, 기계용 목록은 `cards.jsonl`이다.

유닛은 공격 · 방어, 마법은 발동, 아이템은 장착으로 저장한다. 출력 폴더는 `audio/inbox/sfx/audio_model/cards/`다.

- B1: [B1.md](cards/B1.md)
- B2: [B2.md](cards/B2.md)
- B3: [B3.md](cards/B3.md)
- G1: [G1.md](cards/G1.md)
- G2: [G2.md](cards/G2.md)
- G3: [G3.md](cards/G3.md)
- A1: [A1.md](cards/A1.md)
- A2: [A2.md](cards/A2.md)
- A3: [A3.md](cards/A3.md)

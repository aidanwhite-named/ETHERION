<!-- 자동 생성: node tools/sfx/build_sfx_prompts.js — 손으로 고치지 말 것. 고칠 곳은 tools/sfx/notes/ · sfx_common.json · sfx_style.json -->
# ETHERION 공용 효과음 — 3분 배치 프롬프트 (4초 간격)

> 0.1~2.5초 공용 효과음을 **4초 간격**으로 최대 44개씩 묶은 3분 곡 프롬프트다(짧은 음악 4곡 `victory`·`defeat`·`pach_win3`·`levelUp`은 `common.md`에서 따로 만든다).
> 각 곡의 헤더 표와 `tools/sfx/prompts/sfx_batches.jsonl`에 순서대로 제목·키가 기록되어 있어, 나중에 Claude가 4초 간격 곡을 쪼갤 때 어떤 효과음인지 바로 알 수 있다.

## batch_common_01 (39개 · 00:00 ~ 02:32 · 총 3분)

- **넣을 파일**: `audio/inbox/sfx/batches/batch_common_01.mp3`
- **규칙**: 4초 간격 (`00:00`부터 4초마다 1개, 총 39개, 나머지 무음)
- **분할 참조**: `tools/sfx/prompts/sfx_batches.jsonl` (`batch_id: "common_01"`)

| 순번 | 시각 | 초 | 키 | 저장 파일 | 길이 | 대상 · 설명 |
|---:|---|---:|---|---|---:|---|
| 01 | `00:00` | 0 | `ui_click` | `ui_click.mp3` | 0.2s | 메뉴 단추를 누를 때 (메뉴 · 화면) |
| 02 | `00:04` | 4 | `ui_hover` | `ui_hover.mp3` | 0.1s | 단추 위에 커서가 올라갈 때 (아주 작게) (메뉴 · 화면) |
| 03 | `00:08` | 8 | `ui_card` | `ui_card.mp3` | 0.3s | 메뉴 · 상점 · 도감에서 카드를 누를 때 (메뉴 · 화면) |
| 04 | `00:12` | 12 | `ui_deck` | `ui_deck.mp3` | 0.4s | 덱을 고를 때 (메뉴 · 화면) |
| 05 | `00:16` | 16 | `ui_open` | `ui_open.mp3` | 0.5s | 창이 열릴 때 (메뉴 · 화면) |
| 06 | `00:20` | 20 | `ui_close` | `ui_close.mp3` | 0.4s | 창이 닫힐 때 (메뉴 · 화면) |
| 07 | `00:24` | 24 | `ui_tab` | `ui_tab.mp3` | 0.2s | 탭을 바꿀 때 (메뉴 · 화면) |
| 08 | `00:28` | 28 | `ui_toggle` | `ui_toggle.mp3` | 0.2s | 설정의 켜기 · 끄기, 체크 상자 (메뉴 · 화면) |
| 09 | `00:32` | 32 | `ui_slider` | `ui_slider.mp3` | 0.1s | 음량 막대를 끌 때 (짧게 되풀이) (메뉴 · 화면) |
| 10 | `00:36` | 36 | `page_turn` | `page_turn.mp3` | 0.6s | 룰북 · 매뉴얼 · 연대기의 책장을 넘길 때 (메뉴 · 화면) |
| 11 | `00:40` | 40 | `toast` | `toast.mp3` | 0.4s | 알림 띠가 뜰 때 (메뉴 · 화면) |
| 12 | `00:44` | 44 | `deny` | `deny.mp3` | 0.4s | 안 됨 · 경고 (메뉴 · 화면) |
| 13 | `00:48` | 48 | `portal_open` | `portal_open.mp3` | 1.6s | 입장 관문이 열릴 때 (입장 · 대기실 · 덱 조정실) |
| 14 | `00:52` | 52 | `login_ok` | `login_ok.mp3` | 0.9s | 로그인 · 입장에 성공했을 때 (입장 · 대기실 · 덱 조정실) |
| 15 | `00:56` | 56 | `flag_pick` | `flag_pick.mp3` | 0.5s | 대기실에서 깃발을 고를 때 (입장 · 대기실 · 덱 조정실) |
| 16 | `01:00` | 60 | `sortie` | `sortie.mp3` | 1s | 출정 — 대전을 시작하는 단추 (입장 · 대기실 · 덱 조정실) |
| 17 | `01:04` | 64 | `deck_add` | `deck_add.mp3` | 0.3s | 덱 조정실: 카드를 덱에 넣을 때 (입장 · 대기실 · 덱 조정실) |
| 18 | `01:08` | 68 | `deck_remove` | `deck_remove.mp3` | 0.3s | 덱 조정실: 카드를 덱에서 뺄 때 (입장 · 대기실 · 덱 조정실) |
| 19 | `01:12` | 72 | `deck_full` | `deck_full.mp3` | 0.6s | 덱이 정해진 장수로 꽉 찼을 때 (입장 · 대기실 · 덱 조정실) |
| 20 | `01:16` | 76 | `deck_save` | `deck_save.mp3` | 0.6s | 덱을 저장할 때 (입장 · 대기실 · 덱 조정실) |
| 21 | `01:20` | 80 | `deck_code` | `deck_code.mp3` | 0.4s | 덱 코드를 복사하거나 읽을 때 (입장 · 대기실 · 덱 조정실) |
| 22 | `01:24` | 84 | `shuffle` | `shuffle.mp3` | 1s | 덱을 섞을 때 (전장 — 카드 다루기) |
| 23 | `01:28` | 88 | `draw` | `draw.mp3` | 0.3s | 카드를 뽑을 때 (전장 — 카드 다루기) |
| 24 | `01:32` | 92 | `mulligan` | `mulligan.mp3` | 0.8s | 시작 핸드를 바꿀 때 (멀리건) (전장 — 카드 다루기) |
| 25 | `01:36` | 96 | `handHover` | `handHover.mp3` | 0.1s | 핸드에서 카드와 카드 사이를 넘나들 때 (전장 — 카드 다루기) |
| 26 | `01:40` | 100 | `select` | `select.mp3` | 0.2s | 카드를 고를 때 (전장 — 카드 다루기) |
| 27 | `01:44` | 104 | `unselect` | `unselect.mp3` | 0.2s | 고르기를 풀 때 (전장 — 카드 다루기) |
| 28 | `01:48` | 108 | `pick` | `pick.mp3` | 0.2s | 카드를 끌기 시작할 때 (전장 — 카드 다루기) |
| 29 | `01:52` | 112 | `hover` | `hover.mp3` | 0.1s | 끌던 카드가 놓을 칸에 닿을 때 (전장 — 카드 다루기) |
| 30 | `01:56` | 116 | `back` | `back.mp3` | 0.3s | 놓을 수 없는 곳에서 카드가 제자리로 돌아갈 때 (전장 — 카드 다루기) |
| 31 | `02:00` | 120 | `place` | `place.mp3` | 0.4s | 유닛을 전장에 내려놓을 때 (전장 — 카드 다루기) |
| 32 | `02:04` | 124 | `spell_set` | `spell_set.mp3` | 0.4s | 마법을 뒷면으로 칸에 놓을 때 (전장 — 카드 다루기) |
| 33 | `02:08` | 128 | `sp_reveal` | `sp_reveal.mp3` | 0.5s | 마법 카드가 뒤집혀 발동할 때 (전장 — 카드 다루기) |
| 34 | `02:12` | 132 | `move` | `move.mp3` | 0.4s | 전장에서 자리를 바꿀 때 (전장 — 카드 다루기) |
| 35 | `02:16` | 136 | `equip` | `equip.mp3` | 0.6s | 아이템 장착 (그 아이템의 소리가 아직 없을 때) (전장 — 카드 다루기) |
| 36 | `02:20` | 140 | `crystal` | `crystal.mp3` | 0.8s | 결정화 (전장 — 카드 다루기) |
| 37 | `02:24` | 144 | `burn` | `burn.mp3` | 0.8s | 소각 (전장 — 카드 다루기) |
| 38 | `02:28` | 148 | `ether_gain` | `ether_gain.mp3` | 0.6s | 턴이 시작되며 에테르가 차오를 때 (전장 — 카드 다루기) |
| 39 | `02:32` | 152 | `upkeep` | `upkeep.mp3` | 0.5s | 유지비로 에테르가 빠질 때 (전장 — 카드 다루기) |

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
3-minute (180s) sequential sound effects pack: 39 isolated sound effects placed strictly every 4 seconds with complete silence between sounds.
Fantasy card game, interface and battle sounds.
[00:00] #01 [ui_click]: a crisp, satisfying click of a small brass switch set in dark wood, with a tiny soft low thump underneath; clean and immediate, not sharp. About 0.2 seconds.
[00:04] #02 [ui_hover]: an extremely soft, airy tick, like a fingertip brushing polished wood; barely there. About 0.1 seconds.
[00:08] #03 [ui_card]: a thick card lifted from a velvet tray: a soft papery snap and a faint warm glassy shimmer. About 0.3 seconds.
[00:12] #04 [ui_deck]: the brass latch of a leather-bound deck case clicking open with a firm, tidy double click. About 0.4 seconds.
[00:16] #05 [ui_open]: a heavy parchment panel unfolding with a soft whoosh and a gentle low wooden knock. About 0.5 seconds.
[00:20] #06 [ui_close]: a parchment panel folding shut: a short reverse whoosh ending in a muted soft thud. About 0.4 seconds.
[00:24] #07 [ui_tab]: a quick, light flick of a stiff paper tab, crisp and tidy. About 0.2 seconds.
[00:28] #08 [ui_toggle]: a small, precise metal toggle snapping into place with a clean click. About 0.2 seconds.
[00:32] #09 [ui_slider]: a tiny, fine ratchet tick of a small brass dial. About 0.1 seconds.
[00:36] #10 [page_turn]: one heavy vellum page turning in an old book: a soft papery sweep and a gentle settle. About 0.6 seconds.
[00:40] #11 [toast]: a soft, clear glassy ping of a small crystal, gentle and short. About 0.4 seconds.
[00:44] #12 [deny]: two quick, dull knocks on an iron-banded wooden door, low and firm, clearly a refusal but never harsh. About 0.4 seconds.
[00:48] #13 [portal_open]: an ancient stone gate grinding open with a deep rumble, then a rush of shimmering ethereal air pouring through. About 1.6 seconds.
[00:52] #14 [login_ok]: a warm rising shimmer of crystal blooming into one soft, low resonant bell tone. About 0.9 seconds.
[00:56] #15 [flag_pick]: a heavy cloth banner unfurling with a strong snap of fabric and a creak of its wooden pole. About 0.5 seconds.
[01:00] #16 [sortie]: a sword drawn from its scabbard with a bright ringing scrape, followed by one deep, soft drum-like boom. About 1 seconds.
[01:04] #17 [deck_add]: a card slid neatly into a stack: a quick papery swish ending in a soft, crisp tap. About 0.3 seconds.
[01:08] #18 [deck_remove]: a card pulled out of a stack with a light whisk and a soft flutter. About 0.3 seconds.
[01:12] #19 [deck_full]: a satisfying heavy latch closing, followed by one warm glassy chime. About 0.6 seconds.
[01:16] #20 [deck_save]: a wax seal pressed firmly onto parchment: a soft squish and a solid stamp. About 0.6 seconds.
[01:20] #21 [deck_code]: a quill scratching one quick flourish across parchment. About 0.4 seconds.
[01:24] #22 [shuffle]: a thick deck of stiff cards riffle-shuffled and bridged: a fast ripple of cards and a final square tap. About 1 seconds.
[01:28] #23 [draw]: a single thick card drawn from a deck: a short soft paper slide and a gentle muted tap; warm, low and dry, no hiss. About 0.3 seconds.
[01:32] #24 [mulligan]: several cards swept back into the deck with a broad papery whoosh, then new cards dealt in quick, soft snaps. About 0.8 seconds.
[01:36] #25 [handHover]: a very soft low paper touch, like a fingertip brushing thick card stock; muffled and warm, no high frequencies. About 0.1 seconds.
[01:40] #26 [select]: a card lifted with a firm, soft click and a faint airy lift. About 0.2 seconds.
[01:44] #27 [unselect]: a card set back down with a soft leathery pat. About 0.2 seconds.
[01:48] #28 [pick]: a card peeled up off the table with a faint whoosh. About 0.2 seconds.
[01:52] #29 [hover]: a tiny soft low wooden tock, muffled and gentle, no high frequencies. About 0.1 seconds.
[01:56] #30 [back]: a card sliding back into the hand with a soft reverse swish. About 0.3 seconds.
[02:00] #31 [place]: a heavy card set down firmly on a wooden table: a single deep soft thud, dry and short. About 0.4 seconds.
[02:04] #32 [spell_set]: a face-down card set gently onto stone with a hushed, mysterious low whoosh and a faint tick. About 0.4 seconds.
[02:08] #33 [sp_reveal]: a card flipped over with a bright whoosh and a burst of tiny magical sparks. About 0.5 seconds.
[02:12] #34 [move]: a card sliding across stone with a smooth scrape, ending in a soft click. About 0.4 seconds.
[02:16] #35 [equip]: a piece of gear fitted onto a fighter: a leather strap tightened and a metal buckle snapping shut. About 0.6 seconds.
[02:20] #36 [crystal]: a card dissolving into a clear crystal: a rising glassy resonance and a sprinkle of tiny sparkles. About 0.8 seconds.
[02:24] #37 [burn]: a card dropped into a fire pit: a low soft whoomp of flame and a warm gentle crackle of burning wood; muffled and low, no hiss. About 0.8 seconds.
[02:28] #38 [ether_gain]: a soft rising shimmer, like light pouring into a glass vessel. About 0.6 seconds.
[02:32] #39 [upkeep]: a faint descending glassy drain, like light seeping out of a crystal. About 0.5 seconds.
[02:36] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Every sound starts right on its 4-second timestamp and is followed by complete silence until the next timestamp.
```

## batch_common_02 (39개 · 00:00 ~ 02:32 · 총 3분)

- **넣을 파일**: `audio/inbox/sfx/batches/batch_common_02.mp3`
- **규칙**: 4초 간격 (`00:00`부터 4초마다 1개, 총 39개, 나머지 무음)
- **분할 참조**: `tools/sfx/prompts/sfx_batches.jsonl` (`batch_id: "common_02"`)

| 순번 | 시각 | 초 | 키 | 저장 파일 | 길이 | 대상 · 설명 |
|---:|---|---:|---|---|---:|---|
| 01 | `00:00` | 0 | `upkeep_burn` | `upkeep_burn.mp3` | 0.8s | 유지비가 모자라 유닛이 소각될 때 (전장 — 카드 다루기) |
| 02 | `00:04` | 4 | `banner_atk` | `banner_atk.mp3` | 1s | '공격 준비' 띠 (내 공격 차례) (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 03 | `00:08` | 8 | `banner_def` | `banner_def.mp3` | 1s | '방어 준비' 띠 (내 방어 차례) (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 04 | `00:12` | 12 | `banner_foe` | `banner_foe.mp3` | 0.8s | '상대 차례' 띠 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 05 | `00:16` | 16 | `banner_combat` | `banner_combat.mp3` | 1.2s | '전투' 띠 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 06 | `00:20` | 20 | `first_turn` | `first_turn.mp3` | 0.8s | 선공 · 후공이 정해질 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 07 | `00:24` | 24 | `confirm_atk` | `confirm_atk.mp3` | 0.4s | 공격 완료 단추 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 08 | `00:28` | 28 | `confirm_def` | `confirm_def.mp3` | 0.4s | 방어 완료 단추 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 09 | `00:32` | 32 | `confirm_ready` | `confirm_ready.mp3` | 0.6s | 준비 완료 단추 (멀리건 · 그 밖의 준비) (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 10 | `00:36` | 36 | `coin_flip` | `coin_flip.mp3` | 0.6s | 코인을 던질 때 (공중에서 도는 소리) (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 11 | `00:40` | 40 | `coinHeads` | `coinHeads.mp3` | 0.7s | 코인 앞면 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 12 | `00:44` | 44 | `coinTails` | `coinTails.mp3` | 0.4s | 코인 뒷면 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 13 | `00:48` | 48 | `coin_reflip` | `coin_reflip.mp3` | 0.7s | 에테르 1로 코인을 다시 던질 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 14 | `00:52` | 52 | `shield_coin` | `shield_coin.mp3` | 0.7s | 보호막 코인을 던질 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 15 | `00:56` | 56 | `life_hit` | `life_hit.mp3` | 0.8s | 생명(심장석)이 직접 깎일 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 16 | `01:00` | 60 | `life_heal` | `life_heal.mp3` | 0.7s | 생명이 회복될 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 17 | `01:04` | 64 | `life_low` | `life_low.mp3` | 1.2s | 생명이 위험할 때 (한 번만) (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 18 | `01:08` | 68 | `deck_low` | `deck_low.mp3` | 0.8s | 덱이 얼마 남지 않았을 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 19 | `01:12` | 72 | `surrender` | `surrender.mp3` | 0.8s | 항복할 때 (전장 — 흐름 (차례 · 코인 · 생명 · 결과)) |
| 20 | `01:16` | 76 | `swing` | `swing.mp3` | 0.3s | 공격 유닛이 뛰쳐나갈 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 21 | `01:20` | 80 | `hit` | `hit.mp3` | 0.4s | 일반 타격 (그 카드의 공격 소리가 아직 없을 때) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 22 | `01:24` | 84 | `crit` | `crit.mp3` | 0.6s | 치명타 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 23 | `01:28` | 88 | `block` | `block.mp3` | 0.5s | 막음 — 피해 0 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 24 | `01:32` | 92 | `miss` | `miss.mp3` | 0.3s | 빗나감 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 25 | `01:36` | 96 | `shatter` | `shatter.mp3` | 0.8s | 유닛 카드가 부서질 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 26 | `01:40` | 100 | `thorns` | `thorns.mp3` | 0.4s | [가시] 피해를 되돌려 줄 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 27 | `01:44` | 104 | `guard` | `guard.mp3` | 0.5s | [수호] 대신 맞으러 나설 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 28 | `01:48` | 108 | `pierce` | `pierce.mp3` | 0.5s | [관통] (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 29 | `01:52` | 112 | `chain` | `chain.mp3` | 0.7s | [연쇄] 피해가 옮겨 갈 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 30 | `01:56` | 116 | `throw` | `throw.mp3` | 0.6s | [투척] (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 31 | `02:00` | 120 | `snipe` | `snipe.mp3` | 0.6s | [사격] (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 32 | `02:04` | 124 | `summon` | `summon.mp3` | 1s | 소환 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 33 | `02:08` | 128 | `negate` | `negate.mp3` | 0.7s | [무효] 마법이 지워질 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 34 | `02:12` | 132 | `steal` | `steal.mp3` | 0.5s | 빼앗길 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 35 | `02:16` | 136 | `buff` | `buff.mp3` | 0.6s | 강화 (공 · 방 · 체가 오름) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 36 | `02:20` | 140 | `debuff` | `debuff.mp3` | 0.6s | 약화 · 저주 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 37 | `02:24` | 144 | `shield` | `shield.mp3` | 0.6s | 보호막이 생길 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 38 | `02:28` | 148 | `shield_break` | `shield_break.mp3` | 0.5s | 보호막이 깨질 때 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 39 | `02:32` | 152 | `heal` | `heal.mp3` | 0.7s | 치유 (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
3-minute (180s) sequential sound effects pack: 39 isolated sound effects placed strictly every 4 seconds with complete silence between sounds.
Fantasy card game, interface and battle sounds.
[00:00] #01 [upkeep_burn]: a fading crystal hum collapsing into a dry crackle of embers. About 0.8 seconds.
[00:04] #02 [banner_atk]: a sword drawn with a ringing metallic scrape over a deep, soft swell; confident and clear. About 1 seconds.
[00:08] #03 [banner_def]: a heavy shield raised and braced: a solid wood-and-iron thud followed by a low resonant hum. About 1 seconds.
[00:12] #04 [banner_foe]: a distant, muffled low drum hit with a soft airy tail; calm. About 0.8 seconds.
[00:16] #05 [banner_combat]: two great iron-bound doors swinging open together: a deep boom with a long metallic ring-out. About 1.2 seconds.
[00:20] #06 [first_turn]: a coin slapped down onto the back of an armoured gauntlet with a bright ring. About 0.8 seconds.
[00:24] #07 [confirm_atk]: a sword struck flat against a shield: one short decisive clang that stops quickly; dry, no ringing tail, no reverb. About 0.4 seconds.
[00:28] #08 [confirm_def]: a tower shield planted hard into the ground: one deep heavy thud with a short dull clank; dry and short, no ringing tail, no reverb. About 0.4 seconds.
[00:32] #09 [confirm_ready]: a firm double knock on a wooden table followed by a crisp brass latch. About 0.6 seconds.
[00:36] #10 [coin_flip]: a heavy gold coin tossed up with a thumb: a soft dull flick, then two muffled low metallic tumbles in the air; warm and round, no whirring, no hiss. About 0.6 seconds.
[00:40] #11 [coinHeads]: a gold coin landing face up on stone: a bright, clear ring with a short shimmering decay. About 0.7 seconds.
[00:44] #12 [coinTails]: a coin landing flat with a dull, short thud and no ring. About 0.4 seconds.
[00:48] #13 [coin_reflip]: a soft low magical swell, then a heavy coin tossed up again with a dull flick and a short muted metallic tumble; warm and round, no whirring, no hiss. About 0.7 seconds.
[00:52] #14 [shield_coin]: a coin spun on a metal shield: a metallic spin, then a glassy protective shimmer rising. About 0.7 seconds.
[00:56] #15 [life_hit]: a deep, heavy heartbeat thud with a crystal cracking sharply inside it. About 0.8 seconds.
[01:00] #16 [life_heal]: a warm rising glow, like a heartbeat steadying inside a crystal. About 0.7 seconds.
[01:04] #17 [life_low]: two slow, deep, muffled heartbeats under a faint ominous hum. About 1.2 seconds.
[01:08] #18 [deck_low]: a thin stack of cards riffled slowly with a hollow, uneasy tick. About 0.8 seconds.
[01:12] #19 [surrender]: a banner pole dropped onto stone with a hollow clatter and a soft cloth flop. About 0.8 seconds.
[01:16] #20 [swing]: a quick, clean whoosh of a body lunging forward. About 0.3 seconds.
[01:20] #21 [hit]: a solid, punchy impact on armour and flesh: a tight thump with a short crack. About 0.4 seconds.
[01:24] #22 [crit]: a razor-sharp crack layered over a deep bass boom, with a short bright ring. About 0.6 seconds.
[01:28] #23 [block]: a solid shield block: a firm clang with a bright ringing deflection. About 0.5 seconds.
[01:32] #24 [miss]: a fast whoosh passing close by and missing, with a faint airy flutter. About 0.3 seconds.
[01:36] #25 [shatter]: a stone card plaque breaking apart: a heavy low crack and chunks of stone crumbling onto a wooden table; dull, earthy and dry, no glass, no hiss. About 0.8 seconds.
[01:40] #26 [thorns]: a thorny bramble snapping back with a sharp sting and a rustle. About 0.4 seconds.
[01:44] #27 [guard]: an armoured fighter stepping in front: a heavy footstep and a shield slammed into place. About 0.5 seconds.
[01:48] #28 [pierce]: a sharp thrust punching straight through a target and out the other side with a tearing whoosh. About 0.5 seconds.
[01:52] #29 [chain]: one strike leaping from target to target: three quick linked cracks, each a little lighter. About 0.7 seconds.
[01:56] #30 [throw]: an object hurled overhand: a spinning whoosh and a heavy thud on impact. About 0.6 seconds.
[02:00] #31 [snipe]: a single sharp distant shot, a thin zip through the air and a precise, hard impact. About 0.6 seconds.
[02:04] #32 [summon]: a rune circle humming to life, a swirling rush of air and a creature landing with a soft thump. About 1 seconds.
[02:08] #33 [negate]: a spell snapped in half: a sharp glassy shatter followed by a reversed, collapsing whoosh. About 0.7 seconds.
[02:12] #34 [steal]: a quick snatching whoosh with a short rattle of chain. About 0.5 seconds.
[02:16] #35 [buff]: a rising, empowering surge of warm energy with a bright shimmer at the top. About 0.6 seconds.
[02:20] #36 [debuff]: a sinking, draining sound, like light being pulled down into a dark hollow. About 0.6 seconds.
[02:24] #37 [shield]: a protective dome of glassy light forming with a smooth rising hum and a soft ring. About 0.6 seconds.
[02:28] #38 [shield_break]: a dome of glassy light cracking and shattering into tinkling fragments. About 0.5 seconds.
[02:32] #39 [heal]: a warm, soothing glow: soft shimmering light and a gentle, breath-like swell. About 0.7 seconds.
[02:36] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Every sound starts right on its 4-second timestamp and is followed by complete silence until the next timestamp.
```

## batch_common_03 (39개 · 00:00 ~ 02:32 · 총 3분)

- **넣을 파일**: `audio/inbox/sfx/batches/batch_common_03.mp3`
- **규칙**: 4초 간격 (`00:00`부터 4초마다 1개, 총 39개, 나머지 무음)
- **분할 참조**: `tools/sfx/prompts/sfx_batches.jsonl` (`batch_id: "common_03"`)

| 순번 | 시각 | 초 | 키 | 저장 파일 | 길이 | 대상 · 설명 |
|---:|---|---:|---|---|---:|---|
| 01 | `00:00` | 0 | `cleanse` | `cleanse.mp3` | 0.7s | 씻어냄 (강화 · 약화를 지움) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 02 | `00:04` | 4 | `reload` | `reload.mp3` | 0.7s | 장전 (잿불 고블린) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 03 | `00:08` | 8 | `charge` | `charge.mp3` | 0.6s | 충전 (번개 노움) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 04 | `00:12` | 12 | `rage` | `rage.mp3` | 0.7s | 격노 (바위주먹 오크) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 05 | `00:16` | 16 | `regrow` | `regrow.mp3` | 0.7s | 재생 (이끼 트롤) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 06 | `00:20` | 20 | `ignite` | `ignite.mp3` | 0.5s | [점화] — 고블린이 불씨를 쏘아 날림 (v3.73) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 07 | `00:24` | 24 | `scorch` | `scorch.mp3` | 0.6s | 화상이 붙을 때 ([점화] · 불씨 · 화상 마법) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 08 | `00:28` | 28 | `flame_armor` | `flame_armor.mp3` | 0.6s | [화염 갑주] — 친 유닛에게 불이 옮겨붙음 (v3.73) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 09 | `00:32` | 32 | `burn_burst` | `burn_burst.mp3` | 0.7s | 화상이 터질 때 · 불씨 피해 (전투 시작) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 10 | `00:36` | 36 | `bleed` | `bleed.mp3` | 0.5s | [출혈] 피가 흘러 체력이 깎일 때 (마족) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 11 | `00:40` | 40 | `fear` | `fear.mp3` | 0.6s | [공포 N] 걸림 · 발동 (마족 [저주], v3.95 — 떠오르는 글 '공포 N') (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 12 | `00:44` | 44 | `plague` | `plague.mp3` | 0.7s | [역병 N] 걸림 · 발동 · 옮음 (마족 [저주], v3.95 — '역병 N' · '역병 · 능력 꺼짐') (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 13 | `00:48` | 48 | `mend` | `mend.mp3` | 0.7s | [치유] — 인어가 맞붙은 뒤 물로 상처를 채움 (v3.68) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 14 | `00:52` | 52 | `arcane` | `arcane.mp3` | 0.5s | [마력 공격] — 물의 마력이 방어를 뚫고 들어감 (인어) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 15 | `00:56` | 56 | `sea_guard` | `sea_guard.mp3` | 0.5s | [바다의 보호] — 받는 피해를 물결이 줄임 (인어 오라) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 16 | `01:00` | 60 | `ward` | `ward.mp3` | 0.5s | [가호] — 처음 받는 피해를 빛이 줄임 · 출혈을 줄임 (천족) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 17 | `01:04` | 64 | `regen` | `regen.mp3` | 0.7s | [재생] — 트롤 살과 껍질이 다시 붙음 (v3.74) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 18 | `01:08` | 68 | `shield_bash` | `shield_bash.mp3` | 0.5s | [방패 반격] — 드워프가 방패로 되받아침 (v3.74) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 19 | `01:12` | 72 | `firm` | `firm.mp3` | 0.5s | [굳건] — 자리 바꾸기 · 빼앗기를 버팀 (v3.74) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 20 | `01:16` | 76 | `purify` | `purify.mp3` | 0.7s | [정화] — 화상 · 불씨 · 낙인 · 저주(공포 · 역병)를 지우고 출혈을 막음 (v3.74 · v3.95) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 21 | `01:20` | 80 | `intercept` | `intercept.mp3` | 0.5s | [요격] — 원거리 공격자에게도 반격 (v3.74 노움) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 22 | `01:24` | 84 | `retreat` | `retreat.mp3` | 0.6s | [후퇴] — 유닛이 맨 뒤로 물러남 (엘프 마법) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 23 | `01:28` | 88 | `aura` | `aura.mp3` | 0.8s | [레어 오라] — 전투가 시작될 때 이웃 유닛을 북돋움 (v3.69) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 24 | `01:32` | 92 | `huntfire` | `huntfire.mp3` | 0.6s | [불꽃 사냥] — 불붙은 상대를 덮치는 불길 (v3.81 도르마크의 갈비뼈 화로) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 25 | `01:36` | 96 | `riposte` | `riposte.mp3` | 0.5s | [되받기] — 막아 낸 칼이 되튀는 쇳소리 (v3.81 소르그림의 첫 갑주) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 26 | `01:40` | 100 | `overload` | `overload.mp3` | 0.6s | [과부하] — 벼락이 팔로 몰리는 소리 (v3.81 케라운의 벼락 심장) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 27 | `01:44` | 104 | `devour` | `devour.mp3` | 0.7s | [포식] — 삼키는 듯 낮은 으르렁 (v3.81 고르바스의 부러진 송곳니) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 28 | `01:48` | 108 | `drain` | `drain.mp3` | 0.7s | [뿌리 흡수] — 뿌리가 숨을 빨아들이는 소리 (v3.81 베르단의 첫 뿔) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 29 | `01:52` | 112 | `flow` | `flow.mp3` | 0.7s | [밀물] — 밀려드는 물결 (v3.81 마렌시아의 눈물 성배) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 30 | `01:56` | 116 | `judge` | `judge.mp3` | 0.8s | [심판] — 판결의 종소리 (v3.81 하르간의 양손검) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 31 | `02:00` | 120 | `sentry` | `sentry.mp3` | 0.5s | [경계의 화살] — 경계 너머에서 날아오는 화살 (v3.81 세렌의 활) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 32 | `02:04` | 124 | `mark` | `mark.mp3` | 0.5s | [표식] — 표식이 새겨지는 바람 소리 (v3.81 이벨의 깃펜) (전투 — 공용 (카드 소리가 없을 때 · 능력 효과)) |
| 33 | `02:08` | 128 | `pach_spin` | `pach_spin.mp3` | 0.9s | SPIN — 레버를 당겨 릴이 돌기 시작할 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 34 | `02:12` | 132 | `pach_tick` | `pach_tick.mp3` | 0.1s | 릴이 도는 동안의 틱 (짧게 되풀이) (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 35 | `02:16` | 136 | `pach_stop` | `pach_stop.mp3` | 0.3s | 릴 하나가 멈출 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 36 | `02:20` | 140 | `pach_reach` | `pach_reach.mp3` | 1.5s | 두 칸이 맞고 마지막 릴이 돌 때 (리치) (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 37 | `02:24` | 144 | `pach_win1` | `pach_win1.mp3` | 1.5s | 단체 문양 셋 — 작은 당첨 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 38 | `02:28` | 148 | `pach_win2` | `pach_win2.mp3` | 2.5s | 진영 문장 셋 — 큰 당첨 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 39 | `02:32` | 152 | `pach_miss` | `pach_miss.mp3` | 0.6s | 꽝 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
3-minute (180s) sequential sound effects pack: 39 isolated sound effects placed strictly every 4 seconds with complete silence between sounds.
Fantasy card game, interface and battle sounds.
[00:00] #01 [cleanse]: a clear wave of water washing over, rinsing away a fading magical hum. About 0.7 seconds.
[00:04] #02 [reload]: a musket being reloaded: a ramrod scraping down the barrel and a firm flintlock click. About 0.7 seconds.
[00:08] #03 [charge]: a rising electric whine charging up, ending in a small crisp spark. About 0.6 seconds.
[00:12] #04 [rage]: a deep beastly huff and an earth-shaking stomp, with loose stones rattling. About 0.7 seconds.
[00:16] #05 [regrow]: wood creaking and knitting back together with a soft rustle of new leaves. About 0.7 seconds.
[00:20] #06 [ignite]: a flint strikes and a small fireball is flicked away: a sharp spark snap and a quick fiery whoosh flying off. About 0.5 seconds.
[00:24] #07 [scorch]: a target catches fire: a soft whump of flame igniting, then a hungry crackle and sizzle that keeps smouldering. About 0.6 seconds.
[00:28] #08 [flame_armor]: heated armour flares up on contact: a hot metallic clank and a sudden burst of flame lashing back with a roaring whoosh. About 0.6 seconds.
[00:32] #09 [burn_burst]: smouldering embers suddenly burst into a bright flare: a sharp fiery pop and a short roaring flame that dies into crackling ash. About 0.7 seconds.
[00:36] #10 [bleed]: an open wound pulses: a low wet throb and a few heavy drops of blood dripping onto stone, dark and close. About 0.5 seconds.
[00:40] #11 [fear]: a chill creeps close: a cold breathy whisper hissing near the ear, a faint shivering rattle of loose armour and a sinking low hum that fades into hush. About 0.6 seconds.
[00:44] #12 [plague]: sticky rot takes hold: a wet gluey squelch, a slow bubbling ooze of decay and a damp crackling hiss spreading outward like creeping mould. About 0.7 seconds.
[00:48] #13 [mend]: cool water flows over a wound: a soft bubbling trickle and a gentle rising watery shimmer that closes the cut. About 0.7 seconds.
[00:52] #14 [arcane]: a pulse of deep water magic presses through armour: a resonant liquid hum and a dense pressurised thrum that sinks inward. About 0.5 seconds.
[00:56] #15 [sea_guard]: a thin wall of water catches a blow: a muffled watery slap and a soft splash that softens the impact into ripples. About 0.5 seconds.
[01:00] #16 [ward]: a blessed halo of light absorbs a hit: a warm muffled thud and a soft bright bell-like chime fading out. About 0.5 seconds.
[01:04] #17 [regen]: tough troll flesh knitting closed: a wet fleshy squelch, a creak of bark-like skin pulling tight and a low satisfied grumble. About 0.7 seconds.
[01:08] #18 [shield_bash]: a heavy iron shield is slammed forward into an attacker: a short grunt-free shove, a big metallic bash and a deep ringing clang. About 0.5 seconds.
[01:12] #19 [firm]: an immovable stance holds: heavy iron boots grinding into stone, a deep solid anchoring thud and a short steady metallic hum. About 0.5 seconds.
[01:16] #20 [purify]: holy light washes a curse away: a clear rising choir-like chime and a soft hiss of dark smoke dissolving into brightness. About 0.7 seconds.
[01:20] #21 [intercept]: a quick electric counter-shot: a sharp crackling zap leaping back along a line and a bright snapping spark at the end. About 0.5 seconds.
[01:24] #22 [retreat]: a light-footed withdrawal: quick soft footsteps on leaves, a swish of a cloak and a fading rustle as someone slips back into cover. About 0.6 seconds.
[01:28] #23 [aura]: a commanding aura spreads to nearby allies: a warm low swell of energy and a soft shimmering ring that radiates outward. About 0.8 seconds.
[01:32] #24 [huntfire]: flames leaping hungrily onto a burning target: a sudden roaring flare of fire and a fierce crackling whoosh. About 0.6 seconds.
[01:36] #25 [riposte]: a heavy iron plate deflecting a blade and snapping back: a sharp metallic clang followed by a bright ringing ricochet. About 0.5 seconds.
[01:40] #26 [overload]: surging lightning gathering along a limb: a rising crackling electric hum ending in a sharp static snap. About 0.6 seconds.
[01:44] #27 [devour]: a primal beastly growl swelling as it devours prey: a deep rumbling snarl and a heavy guttural crunch. About 0.7 seconds.
[01:48] #28 [drain]: living roots drinking life: a dry woody creak and a soft siphoning whoosh pulling inward into green foliage. About 0.7 seconds.
[01:52] #29 [flow]: a gentle, luminous tide surging forward: a smooth rushing wave of clear water and a soft soothing shimmer. About 0.7 seconds.
[01:56] #30 [judge]: a solemn bell of judgment: one deep, clear bronze bell toll with a bright resonant halo fading slowly. About 0.8 seconds.
[02:00] #31 [sentry]: a warning arrow loosed from afar: a taut bowstring twang, a fast whistling zip through the air and a crisp strike. About 0.5 seconds.
[02:04] #32 [mark]: a swift mark etched in mid-air: a sharp whistling sweep of wind and a crisp quill-like scratch sealing with a faint chime. About 0.5 seconds.
[02:08] #33 [pach_spin]: a heavy brass lever pulled down with a solid wooden clack, then a soft low rolling rumble of wooden reels starting to turn; warm, no whirring, no hiss. About 0.9 seconds.
[02:12] #34 [pach_tick]: a tiny soft wooden click, muffled and low. About 0.1 seconds.
[02:16] #35 [pach_stop]: a firm low wooden clunk of a reel stopping, short and dry. About 0.3 seconds.
[02:20] #36 [pach_reach]: a tense, rising shimmer over a quickening ratchet, building anticipation. About 1.5 seconds.
[02:24] #37 [pach_win1]: a cheerful payout: a short cascade of coins into a metal tray with a bright sparkling chime. About 1.5 seconds.
[02:28] #38 [pach_win2]: a big payout: a long waterfall of coins, ringing bells and rising sparkles. About 2.5 seconds.
[02:32] #39 [pach_miss]: a soft, dull clunk and a gently deflating mechanical whir. About 0.6 seconds.
[02:36] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Every sound starts right on its 4-second timestamp and is followed by complete silence until the next timestamp.
```

## batch_common_04 (36개 · 00:00 ~ 02:20 · 총 3분)

- **넣을 파일**: `audio/inbox/sfx/batches/batch_common_04.mp3`
- **규칙**: 4초 간격 (`00:00`부터 4초마다 1개, 총 36개, 나머지 무음)
- **분할 참조**: `tools/sfx/prompts/sfx_batches.jsonl` (`batch_id: "common_04"`)

| 순번 | 시각 | 초 | 키 | 저장 파일 | 길이 | 대상 · 설명 |
|---:|---|---:|---|---|---:|---|
| 01 | `00:00` | 0 | `grow_water` | `grow_water.mp3` | 0.6s | 결정 키우기: 물을 줄 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 02 | `00:04` | 4 | `grow_up` | `grow_up.mp3` | 0.8s | 결정이 한 단계 자랄 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 03 | `00:08` | 8 | `grow_ripe` | `grow_ripe.mp3` | 1.5s | 결정이 다 여물어 상금을 받을 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 04 | `00:12` | 12 | `grow_reset` | `grow_reset.mp3` | 0.6s | 라운드를 걸러 결정이 처음으로 돌아갈 때 (파친코 · 크로네아의 수레바퀴 · 결정 키우기) |
| 05 | `00:16` | 16 | `shop_buy` | `shop_buy.mp3` | 0.8s | 상점에서 카드를 살 때 (상점 · 교역소 · 합성소) |
| 06 | `00:20` | 20 | `shop_sell` | `shop_sell.mp3` | 0.8s | 상점에 카드를 팔 때 (상점 · 교역소 · 합성소) |
| 07 | `00:24` | 24 | `trade_offer` | `trade_offer.mp3` | 0.6s | 교역소: 교환 제안을 보낼 때 (상점 · 교역소 · 합성소) |
| 08 | `00:28` | 28 | `trade_done` | `trade_done.mp3` | 0.9s | 교역소: 거래가 성사될 때 (상점 · 교역소 · 합성소) |
| 09 | `00:32` | 32 | `auction_bid` | `auction_bid.mp3` | 0.3s | 경매에 입찰할 때 (상점 · 교역소 · 합성소) |
| 10 | `00:36` | 36 | `auction_win` | `auction_win.mp3` | 0.8s | 경매에서 낙찰받을 때 (상점 · 교역소 · 합성소) |
| 11 | `00:40` | 40 | `forge_open` | `forge_open.mp3` | 0.8s | 합성소를 열 때 (상점 · 교역소 · 합성소) |
| 12 | `00:44` | 44 | `forge_merge` | `forge_merge.mp3` | 1.2s | 재료 카드 셋이 하나로 모일 때 (상점 · 교역소 · 합성소) |
| 13 | `00:48` | 48 | `forge_hammer` | `forge_hammer.mp3` | 1.5s | 강화의 망치질 (상점 · 교역소 · 합성소) |
| 14 | `00:52` | 52 | `forge_success` | `forge_success.mp3` | 1.8s | 강화 · 승화 성공 (상점 · 교역소 · 합성소) |
| 15 | `00:56` | 56 | `orb_insert` | `orb_insert.mp3` | 0.7s | 운명의 구슬을 넣을 때 (상점 · 교역소 · 합성소) |
| 16 | `01:00` | 60 | `seal_get` | `seal_get.mp3` | 0.5s | 순례의 인장을 받을 때 (상점 · 교역소 · 합성소) |
| 17 | `01:04` | 64 | `gold_get` | `gold_get.mp3` | 0.8s | 환석 조각을 받을 때 (보상 · 성장) |
| 18 | `01:08` | 68 | `card_get` | `card_get.mp3` | 1.2s | 카드 한 장을 얻을 때 (보상 · 성장) |
| 19 | `01:12` | 72 | `reveal_rare` | `reveal_rare.mp3` | 1.2s | 레어 카드가 나올 때 (보상 · 성장) |
| 20 | `01:16` | 76 | `reveal_epic` | `reveal_epic.mp3` | 1.6s | 에픽 카드가 나올 때 (보상 · 성장) |
| 21 | `01:20` | 80 | `reveal_unique` | `reveal_unique.mp3` | 2s | 유니크 카드가 나올 때 (보상 · 성장) |
| 22 | `01:24` | 84 | `reveal_special` | `reveal_special.mp3` | 2.4s | 스페셜 카드가 나올 때 (보상 · 성장) |
| 23 | `01:28` | 88 | `xp_fill` | `xp_fill.mp3` | 0.8s | 경험치 막대가 차오를 때 (보상 · 성장) |
| 24 | `01:32` | 92 | `quest_done` | `quest_done.mp3` | 0.8s | 퀘스트 완료 (보상 · 성장) |
| 25 | `01:36` | 96 | `achievement` | `achievement.mp3` | 1.2s | 업적 · 칭호를 얻을 때 (보상 · 성장) |
| 26 | `01:40` | 100 | `daily_reward` | `daily_reward.mp3` | 1.2s | 하루 첫 승 보상을 받을 때 (보상 · 성장) |
| 27 | `01:44` | 104 | `map_open` | `map_open.mp3` | 0.9s | 지도를 펼칠 때 (순례 · 원정 · 지도) |
| 28 | `01:48` | 108 | `map_step` | `map_step.mp3` | 0.8s | 지도에서 다음 관문으로 걸어갈 때 (순례 · 원정 · 지도) |
| 29 | `01:52` | 112 | `gate_open` | `gate_open.mp3` | 1.2s | 관문이 열릴 때 (순례 · 원정 · 지도) |
| 30 | `01:56` | 116 | `gate_clear` | `gate_clear.mp3` | 1.5s | 관문을 넘었을 때 (순례 · 원정 · 지도) |
| 31 | `02:00` | 120 | `forest_enter` | `forest_enter.mp3` | 1.5s | 망각의 숲에 들어설 때 (순례 · 원정 · 지도) |
| 32 | `02:04` | 124 | `pilgrim_done` | `pilgrim_done.mp3` | 2s | 순례를 끝까지 마쳤을 때 (순례 · 원정 · 지도) |
| 33 | `02:08` | 128 | `match_found` | `match_found.mp3` | 1s | 상대를 찾았을 때 · 방에 상대가 들어왔을 때 (온라인) |
| 34 | `02:12` | 132 | `chat` | `chat.mp3` | 0.3s | 채팅 · 알림이 왔을 때 (온라인) |
| 35 | `02:16` | 136 | `timer_warn` | `timer_warn.mp3` | 1.2s | 남은 시간이 얼마 없을 때 (온라인) |
| 36 | `02:20` | 140 | `foe_left` | `foe_left.mp3` | 0.8s | 상대가 나갔을 때 (온라인) |

```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
3-minute (180s) sequential sound effects pack: 36 isolated sound effects placed strictly every 4 seconds with complete silence between sounds.
Fantasy card game, interface and battle sounds.
[00:00] #01 [grow_water]: water poured from a small clay jug onto soil: a short gentle splash and a soft round gurgle; low and warm, no hiss. About 0.6 seconds.
[00:04] #02 [grow_up]: a crystal growing: a soft crystalline creak and a rising shimmer. About 0.8 seconds.
[00:08] #03 [grow_ripe]: a crystal blooming to full size: a bright glassy bloom and a cascade of chiming sparkles. About 1.5 seconds.
[00:12] #04 [grow_reset]: a small crystal crumbling softly into fine glittering dust. About 0.6 seconds.
[00:16] #05 [shop_buy]: coins counted out onto a wooden counter, then a card slid across with a crisp snap. About 0.8 seconds.
[00:20] #06 [shop_sell]: a card slid across a counter, then coins scooped into a leather pouch. About 0.8 seconds.
[00:24] #07 [trade_offer]: a letter folded and sealed with wax, then sent off with a soft whoosh. About 0.6 seconds.
[00:28] #08 [trade_done]: two wax seals stamped one after another, then a bright clink of coins. About 0.9 seconds.
[00:32] #09 [auction_bid]: one firm tap of a wooden gavel. About 0.3 seconds.
[00:36] #10 [auction_win]: three gavel taps, the last one ringing, with a soft jingle of coins. About 0.8 seconds.
[00:40] #11 [forge_open]: a heavy forge door creaking open with a warm roar of glowing coals. About 0.8 seconds.
[00:44] #12 [forge_merge]: three cards drawn together into a swirling vortex of light, spinning faster and faster. About 1.2 seconds.
[00:48] #13 [forge_hammer]: three hammer strikes on an anvil, each one ringing a little brighter, with sparks crackling. About 1.5 seconds.
[00:52] #14 [forge_success]: a radiant burst: a bright crystalline bloom, a resonant low bell and a card snapping into existence. About 1.8 seconds.
[00:56] #15 [orb_insert]: a glass orb set into a brass socket with a click and a deep resonant hum. About 0.7 seconds.
[01:00] #16 [seal_get]: a heavy iron stamp pressed onto thick parchment with a solid thunk. About 0.5 seconds.
[01:04] #17 [gold_get]: a handful of crystal shards clinking into a leather pouch with a bright glassy jingle. About 0.8 seconds.
[01:08] #18 [card_get]: a card materialising: a rising magical swell, a soft whoosh and a crisp paper snap. About 1.2 seconds.
[01:12] #19 [reveal_rare]: a cool blue shimmer rising, then one clear crystalline chime. About 1.2 seconds.
[01:16] #20 [reveal_epic]: a deep violet swell building, then a rich resonant bloom with sparkling tails. About 1.6 seconds.
[01:20] #21 [reveal_unique]: a golden surge: a rising shimmer, one deep resonant bell strike and glittering light. About 2 seconds.
[01:24] #22 [reveal_special]: a mythic arrival: a deep sub-bass bloom, one great resonant bell and cascading shimmering light. About 2.4 seconds.
[01:28] #23 [xp_fill]: a smooth rising glassy fill, like liquid light climbing a tube. About 0.8 seconds.
[01:32] #24 [quest_done]: a quill ticking off a line on parchment, followed by a soft bright chime. About 0.8 seconds.
[01:36] #25 [achievement]: a metal medal pinned on: a bright ring, a shimmer and a soft swell. About 1.2 seconds.
[01:40] #26 [daily_reward]: a treasure chest lid creaking open with a warm shimmer and a jingle of crystal shards. About 1.2 seconds.
[01:44] #27 [map_open]: a heavy oak door opening onto a quiet forest path: a low soft wooden thump, a warm breath of air and one soft footstep on moss; warm, low and muffled, no hiss. About 0.9 seconds.
[01:48] #28 [map_step]: two footsteps on a gravel road and the soft rustle of a travel cloak. About 0.8 seconds.
[01:52] #29 [gate_open]: an old iron gate creaking open on rusty hinges. About 1.2 seconds.
[01:56] #30 [gate_clear]: a deep bronze bell struck once, its resonance fading slowly. About 1.5 seconds.
[02:00] #31 [forest_enter]: an eerie wind through dark trees, distant creaking branches and a faint unsettling hum. About 1.5 seconds.
[02:04] #32 [pilgrim_done]: a great bronze bell struck twice with warm, glowing resonance and a rising shimmer. About 2 seconds.
[02:08] #33 [match_found]: a crystal ball humming to life, followed by one soft, clear bell tone. About 1 seconds.
[02:12] #34 [chat]: a soft wooden tick followed by a tiny glassy chime. About 0.3 seconds.
[02:16] #35 [timer_warn]: three steady ticks of an old clock, the last one slightly louder. About 1.2 seconds.
[02:20] #36 [foe_left]: a heavy door closing far away with a muffled thud. About 0.8 seconds.
[02:24] Silence until the end.
Clean, close, dry studio recording with a short natural tail. Every sound starts right on its 4-second timestamp and is followed by complete silence until the next timestamp.
```


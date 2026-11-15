# ETHERION — AI 작업 안내

브라우저 카드 대전 게임 ETHERION의 폴더다. 설명은 `README.md`, 버전 기록은 `docs/CHANGELOG.md`.

## 그림 작업 전에 반드시 읽을 것
지도, 카드, 게임 화면(UI), 아이콘, 카드 일러스트를 만들거나 고치기 전에
**`docs/STYLE_GUIDE.md`** 를 읽고 그 규칙을 따른다.

- 색, 글꼴, 문양, 지도 기호, 일러스트 구도와 프롬프트 틀이 모두 거기 있다.
- 코드와 가이드가 다르면 코드를 따르고, 가이드를 고친다.
- 새 그림 규칙을 정하면 가이드에 적고 버전을 올린다.
- 카드 일러스트는 `tools/art/inbox/`에 넣고 `python3 tools/art/artmap.py import` — `img/cards/<카드ID>.jpg`(600×750)로 들어가고 목록 `img/cards/art_index.js`가 새로 쓰인다(v3.41, 게임은 이 목록으로만 그림을 찾는다. 손으로 넣었으면 `artmap.py index`). 큰 배경을 바꾸면 폰용 작은 판(`*_m`)도 함께.
- **카드 일러스트 프롬프트는 등급별**(v3.31): 규칙서 `tools/art/PROMPT_GUIDE.md`, 문구 원본 `tools/art/art_style.json`(등급 · 레벨 · 깃발), 카드별 지시 `tools/art/art_notes.json`. 새 카드를 만들면 `node tools/art/build_prompts.js` → `python tools/art/artmap.py`. **스페셜 · 유니크는 `art_notes.json`에 그림 지시를 함께 쓴다.** 받은 그림은 `tools/art/inbox/`에 넣고 `python tools/art/artmap.py import`(장부 `art_map.csv` · 보드 `art_board.html`). 스타일 가이드 6.8.
- 이미지 생성 AI로 그릴 때는 `tools/art/`(사용법 `README.md`, 그림 AI용 지시서 `BRIEF.md`, 프롬프트 `prompts/`, 일괄 생성 `gen.py`). 스타일 가이드 6.7.

## 떠오르는 효과 글자 (v3.18.1)
- 카드 위에 떠오르는 글자에 한글 낱말이 들어가면(수호 · 보호막 · 빼앗김 · 가시 −2 …) `js/game.js`의 `floatAt`이 저절로 **효과 명판**(Hahmlet 금속 광택 글씨)으로 띄운다. 새 능력 · 마법은 엔진에서 `fl(X, uid, "낱말 숫자", cls)`만 쓰면 되고, 한글을 맨 글씨(Cinzel · 바탕체)로 띄우는 CSS를 따로 만들지 않는다. 빛깔은 cls(buff · shield · debuff · heal · miss · dmg)로 정해진다. 규칙은 `docs/STYLE_GUIDE.md` 2.9 "효과 명판".

## 그 밖에
- 결정화한 카드는 소각장(`p.burn`)에 들어간다(v3.19.2, 결정은 `p.crystals`에 따로 남음). 소각장에서 되살리는 마법은 `p.burn`에서 꺼내면 되고, 결정 수는 건드리지 않는다.
- 카드 뒷면의 ETHERION 글씨는 그림에 구워 넣은 것이다. 뒷면 그림을 바꾸면 `img/ui/deck/card_back_plain.png`에 넣고 `python tools/art/cardback_text.py`.
- 수정 전 상태는 `_backup_v<버전>/` 에 남겨 왔다. 큰 변경 전에는 같은 방식으로 백업한다.
- 세계관 이름은 모두 가칭이다. 이름과 설정은 README와 가이드에 적힌 것을 따른다.
- **v3.64 에테르 최대 13 · 마법 레벨 −2**: 결정 상한 12(`RULES.maxCrystals`, 제단 칸은 `ETHER_SLOTS`가 계산). 덱에 넣는 마법은 모두 2레벨 내렸다(최소 1, 지금 1~5레벨). 새 마법은 이 기준으로 1레벨부터 만든다 — v3.64 전 문서(`docs/RARESPELLS_v3.24.md` · `COUNTERSPELLS_v3.32.md` · `BALANCE_v4_draft.md` 등)의 마법 레벨은 2 높게 적혀 있다. 아이템 레벨은 그대로. 마법 연계 보너스(연계 시 더 셈 · 에테르 덜 듦)는 나중 일.

## 심연 마족 개편 (v3.65)
- 데이터는 `js/abyss.js`(rebalance.js 다음 · decks.js 앞, 균형 도구가 data.js · rebalance.js를 다시 써도 남는다): 고급 유닛의 하급 능력 · 아이템 · 특색 없던 마법 6장을 새 효과로 바꿈(카드 ID · 등급 그대로 — 피의 공명 · 피의 제물 · 심연의 부름 · 그림자 손아귀 · 환각 · 거울 환영) · 피의 맹약 고침 · "생명을 내는 마족 마법은 모두 아군 유닛 전체에게 [강탈]". 규칙은 `js/engine.js` 끝 "v3.65 심연 마족" 절, 능력 글은 `js/cards.js` `ITEM_KW`, 설명 `docs/ABYSS_v3.65.md`.
- 능력 4가지(abilOf의 `rob` · `leech` · `veil` · `pact`): [강탈] · [흡혈] · [그림자 걸음] · [피의 계약 N]. 유닛 gift · 아이템 · 마법 grant 어느 쪽이든 붙는다. 수치는 `ABYSS`. 규칙을 바꾸면 `ITEM_KW` 글도 함께.
- **이번 턴 낸 대가**: 마법이 생명을 내면 `X.paid[시전자]`에 쌓인다(`abPaid`). 생명을 내는 새 효과는 `castSpell`의 `cost.life`를 거치게 해 [피의 계약] · 피의 공명 · 심연의 부름이 함께 센다.
- 컴퓨터의 수 읽기(`cloneSide`)가 v3.65부터 소각장도 복제한다(되살리는 마법을 본다).
- 새 효과(engine `SPELL_OPS`): `paidHit` · `tithe` · `rebirth` · `paidSteal` · `confuse`(반격 없음 `t.noCounter`) · `phantom`(환영 `phantom: true` — 소각장에 가지 않음, sweep · uPreSweep이 건너뜀). 빼앗기 본체는 `stealCard`.
- 시험 `node tools/abyss/test.js`, 승률 `node tools/abyss/sim.js 100 [new|base]`(`ABYSS='{"robCond":"ge"}'` · `ABYSS='{"off":{"veil":true}}'`로 수치 · 능력을 바꿔 잼).

## 바위주먹 오크 연계 (v3.67)
- 데이터는 `js/orc.js`(gnome.js 다음 · decks.js 앞): 숨통 끊기(SG1-02) · 송곳니 반격(SG1-08) · 뼈 부수기(MG-13) · 오크의 문신(M2-1)을 [관통] · [치명] 연계로 바꿈(ID · 등급 · 레벨 그대로). 새 효과 `SPELL_OPS.d0Swap`(방어 0 이하 상대 중 공격 최강 n기의 방어 ↔ 남은 체력).
- 연계의 바탕: [치명]이 남긴 체력 1은 턴이 끝나야 돌아오고, 방어 마법은 앞 아군이 다 쓰러지거나 전투가 끝날 때 발동한다(`runCombatCore` `fire(true)`). [관통]이 깎은 방어도 이번 턴 그대로.
- 시험 `node tools/orc/test.js`, 승률 `node tools/orc/sim.js 150 [base|elite|덱 json] [js 폴더]`.
- **카드 이름 · 효과를 바꾸면 그림 · 소리 프롬프트를 다시 뽑고**(`node tools/art/build_prompts.js` · `node tools/sfx/build_sfx_prompts.js`, 마법 · 아이템 장면은 `tools/art/art_notes.json`), 이미 있는 그림 · 소리 파일이 옛 카드 것이면 **`tools/REMAKE.md`(다시 만들 목록)** 에 프롬프트와 함께 올린다. 만들어 넣은 항목은 거기서 지운다.

## 푸른비늘 인어 — 치유와 환상 (v3.68)
- 데이터는 `js/mermaid.js`(orc.js 다음 · decks.js 앞), 규칙은 `js/engine.js` 끝 "v3.68 푸른비늘 인어" 절(`mrArc` · `mrHeal` · `mrCalm`), 카드 글은 `js/cards.js` `ITEM_KW`.
- **옛 [마력 공격 N](방어를 N 무시)은 모든 깃발에서 [방어무시 N]** — 데이터 키는 `magic` 그대로. 새 **[마력 공격 N]**(키 `arcane`)은 인어 것: 맞붙을 때(공격 · 반격) 상대 방어 N까지는 막지 못하고 피해에 더해진다(공 4 → 방 3, N ≥ 3이면 7).
- **[치유 N]**(키 `heal`): 맞붙음에서 살아남을 때마다 받은 피해 N을 채운다. 인어의 가호는 모두 치유로 바뀌었다. 장착할 때 생명을 주던 아이템 능력은 **[생명 +N]**(evName, `game.js` 장착).
- **레어 오라**: 레어 유닛의 오라 수치 = 범위(1이면 양옆 1칸, 2면 2칸 — 마법 칸은 세지 않음). 쓰고 사라지지 않고 레어가 살아 있는 동안 늘 걸린다. 인어 레어 넬리아의 물그릇 무녀 = [바다의 보호 1](키 `calm`): 범위 안 아군이 받는 피해 −1(맞붙음 · 마법 모두, `MR_CALM_CUT`). 다른 깃발 레어 오라도 같은 틀로.
- **환상 마법**(특색 없던 카드를 바꿈, ID 그대로 · `MERMAID_GRADES`): 물빛 신기루 SG3-02(무작위 2기 공 ↔ 체, `randSwap`) · 환각의 통제 SG3-01(이 마법 바로 뒤 내 카드와 이름 글자 수가 같은 상대 카드 맨 앞 1장을 빼앗음 — 유닛은 판 끝까지, 마법은 내 마법으로, `mindCapture`) · 뒤바뀐 물길 MC-03(상대 유닛을 방+체 높은 순으로 다시 세움, `sortFoe`) · 씻김의 노래 CS-G3(무효로 했을 때만 상대 전체 해제 · 공격 −1 — 효과의 `ifNeg: true`, castSpell).
- 시험 `node tools/mermaid/test.js`, 승률 `node tools/mermaid/sim.js 150 [base|elite|덱 json] [js 폴더]`.

## 레어 유닛 = 오라만 (v3.69)
- **레어 유닛(PN-<깃발>-R) 9장은 스탯과 오라만 가진다. 자기 특수능력은 없다**(표시 ▲ · ▼는 그대로). 데이터 `js/rares.js`(mermaid.js 다음 · decks.js 앞, `RARE_AURA` = 깃발마다 이름 · 하는 일), 규칙 `js/engine.js` 끝 "v3.69 레어 오라" 절(`rareAuraSync`), 카드 글 `ITEM_KW`(RARE_AURA에서 저절로).
- 오라 수치 = 범위(인어 [바다의 보호]와 같은 셈). 고블린 포격 지휘(사격 +1) · 드워프 무쇠 방벽(방어 +1) · 노움 충전 회로(증폭 +1) · 오크 격노의 함성(공격 +2, **내 전장에 [치명] 유닛이 하나라도 있을 때만** — 범위 밖이어도 됨) · 트롤 가시덤불(가시 +1) · 인어 바다의 보호(v3.68, mermaid.js) · 마족 피의 갈증(흡혈 부여) · 천족 새벽 서약(가호 +1) · 엘프 별의 인도(방어무시 +1). 없는 능력은 그 수치로 생긴다. 오라가 여럿이면 더한다.
- 셈은 전투 시작 · `sweep` · `step`마다 다시 해서 `t.au`에 적고, 스탯 · 가호 · 가시는 지난 몫과의 차이만 `t`에 더한다. 사격 · 증폭 · 방어무시 · 흡혈은 `abilRaw`가 `t.au`를 더한다. 새 오라를 만들면 `RARE_AURA.eff`에 열쇠를 쓰고, 그 열쇠를 `rareAuraSync`(스탯형) 또는 `abilRaw`(능력형)가 읽게 한다.
- **무쇠수염 드워프의 🔒 방어는 모두 ▲ 방어**(rares.js가 바꿈) — 오라 · 마법이 올릴 수 있게.
- 시험 `node tools/rares/test.js`. 설계와 남은 일 `docs/FLAG_IDENTITY_draft.md`.

## 폭풍 하이엘프 = 바람 궁수 (v3.70)
- **엘프(A3)는 마법사가 아니라 활을 쓰는 사수 · 척후다.** 대표 능력은 [방어무시](멀리서 갑옷 틈을 꿰뚫음)와 [원거리](반격을 받지 않음), 마법은 "조준 사격"(공격)과 "치고 빠지기"(공용 · 방어). 나중에 칼을 쓰는 엘프가 나올 수 있다.
- 데이터는 `js/elf.js`(rares.js 다음 · decks.js 앞, `ELF_GRADES`는 grades.js가 맨 끝에 덮음): 마법 8장을 새 효과로(ID 그대로) · 유닛 · 아이템 이름과 설명(ID · 스탯 · 능력 · 클래스 그대로). 일반 유닛 서사는 `js/lore.js`. **엘프 카드 이름은 names.js가 아니라 elf.js에서 고친다**(elf.js가 나중에 덮음).
- 클래스는 마도 그대로(바람 마법을 실어 쏘는 활 · 아이템 종류 촉매). 그림 프롬프트는 `tools/art/art_style.json` flags.A3 — 깃발마다 `classes`로 클래스 말을 덮는다(`build_prompts.js`).
- 새 효과(`js/engine.js` 끝 "v3.70 바람 궁수 엘프" 절): `retreat`(후퇴 — 내 맨 앞 유닛이 맨 뒤로, `ab`면 그 유닛에게 이번 턴 능력) · `volley`(상대 맨 앞 `skip`기를 뺀 나머지 모두에게 피해 x).
- 시험 `node tools/elf/test.js`.

## 번개 노움 = [증폭] (v3.72)
- **노움(B3) 대표 능력은 [증폭 N]**: 전장에 있으면 내 마법이 상대 유닛에게 주는 피해 +N(맞는 유닛마다, 전장의 증폭을 모두 더함). v3.72부터 공격 마법만이 아니라 **공용 · 방어 마법 피해에도** 붙는다(핸드 마법 빼고) — `js/engine.js` `AMP_KINDS` · `ampKind` · `amplify`. CARDS의 마법 type은 공격 `atk` · 공용 `any` · 방어 `def` · 핸드 `hand`. 피해를 주는 새 SPELL_OPS는 `ampKind(C(it)) ? amplify(X.P[caster]) : 0`을 더한다.
- **[방어무시]는 엘프 것** — 노움 유닛 · 아이템에서 걷었다(`js/gnome.js` 끝 `GNOME_V372`): 피뢰탑 수리공 · 천둥 기관 오메가 · 연쇄 번개 학자 → 증폭 1, 일곱 번째 → 증폭 2 · 정전기 실험가 · 피뢰침 정비공 · 케라운 탐사원 · 번개 병기 학자 · 번개 거신 · 볼타리움 학장 → 능력 없는 일반(v3.49 전 스탯) · 아이템 5장(구리 코일 · 학술원 법전 → 증폭 1, 별을 읽는 보주 · 케라운의 뇌관 · 즈라크의 번개 병 → 방어무시만 뺌). 증폭 글(evText)은 gnome.js가 모든 깃발 카드에서 새 규칙으로 고쳐 쓴다.
- 증폭은 합이 쌓여 광역 마법에서 크게 튄다 — 증폭 유닛을 늘릴 때는 승률을 꼭 잰다(방어무시 10장을 모두 증폭으로 바꾸면 기본 덱 52 → 59%).
- 시험 `node tools/gnome/test.js`.

## 잿불 고블린 = 불붙이기 (v3.73)
- **고블린(B1) 대표 능력은 [점화 N]**(키 `ignite`): 고블린의 옛 [사격 N]을 바꿨다. 내 공격 차례에 맞붙기 바로 전에 남은 체력이 가장 높은 상대 유닛에 **화상 N**(그 자리 피해 없음). 다른 깃발의 [사격]은 그대로.
- **화상**(`keep.scorch`): 쌓이고, 다음 턴 전투가 시작될 때(불씨 다음 · 첫 마법 전) 한 번 체력이 깎이고(방어 무시) 꺼진다. 마족 [출혈](이번 전투 맞붙음마다) · 고블린 유니크 불씨 전염(꺼지지 않고 옮김)과 다르다.
- **[화염 갑주 N]**(키 `farmor`): 이 유닛을 맞붙어 공격한 상대에 화상 N(원거리도). 고블린 [가시]는 모두 이것으로. 갑주 수치는 1로 둔다 — 2~3이면 기본 덱 승률이 70%까지 올랐다(벽 하나를 여럿이 치면 모두 탄다).
- 레어 오라 [포격 지휘] = 양옆 아군 공격 +1(`js/goblin.js`가 `RARE_AURA.B1`을 덮음).
- 데이터는 `js/goblin.js`(elf.js 다음 · decks.js 앞, `GOBLIN_GRADES`는 grades.js가 맨 끝에 덮음): 유닛 14장 재구성(1 · 2레벨 포함, 일반 → 고급), 마법 4장(ID 그대로) 도화선 · 기폭(공용) · 불의 장막(방어) · 연막탄(방어). 규칙은 `js/engine.js` 끝 "v3.73 잿불 고블린" 절(`gbScorch` · `gbIgnite` · `gbArmor` · `gbBurnTick` · 효과 `scorch` · `detonate` · `scorchMod`).
- 시험 `node tools/goblin/test.js`.

## 새 특수능력 (v3.74, 사전 `docs/ABILITIES.md`)
- 능력을 새로 만들거나 바꿀 때는 먼저 `docs/ABILITIES.md`(엔진 기준 능력 사전 · 비교표)를 읽고, 바꾼 뒤 그 문서도 고친다.
- 카드 데이터 `js/newabil.js`(goblin.js 다음 · decks.js 앞), 규칙 `js/engine.js` 끝 "v3.74 새 능력" 절.
- **[재생 N]**(트롤, 키 `regen`): 맞붙음이 시작될 때마다(출혈 다음) 체력 +N · 깎인 방어 +N(카드 방어까지), 화상 · 불씨가 붙으면 멈춤. 받은 피해는 턴 끝에 어차피 나으니 회복 능력은 전투 도중에만 뜻이 있다.
- **[방패 반격]**(`bash`, 반격 + 방어) · **[수호]**(`taunt`, 유닛 능력 — resetTurn이 t.taunt를 켬) · **[굳건]**(`firm`, 자리 바꾸기 · 빼앗기 · 행동 불가 면역 — 새 자리 바꾸기 · 빼앗기 효과는 `nwFirm`/`nwFirmArrange`를 거친다)는 드워프. **[정화]**(`purify`)는 천족, **[요격]**(`intercept`)은 노움.
- [가호 N]은 [출혈]을 깎일 때마다 N 줄인다(마족 ↔ 천족 상극). 보호막 · 바다의 보호는 출혈을 못 막는다.
- 시험 `node tools/newabil/test.js` · `node tools/abyss/bleed_ward_test.js`.

## 카드 배치 · 핸드 (v3.19)
- 카드는 판타지 마스터즈식 배치다(왼쪽 위 종류 아이콘 · 왼쪽 세로 레벨 · 그림 아래 글 상자 · 오른쪽 아래 클래스와 공방체). HTML은 `js/view.js` `cardHTML` · `cardFullHTML`, 모양은 `css/fmcard.css`(맨 마지막에 읽음). 카드 모양을 고칠 때 `style.css` · `slim.css`의 옛 카드 규칙보다 이 파일을 먼저 본다.
- 전장의 내 핸드는 겹치지 않는 똑바른 한 줄(`css/hand-row.css`, 슬롯의 `--i` · `--n`). 부채꼴로 되돌리지 않는다.
- 핸드는 붙박이 자리다(v3.19.4, `js/game.js` `handSlots`, 내 핸드 · 상대 핸드 모두). 끌어서 자리 옮기기(`handReorder`, v3.32.5)도 이 자리 기준 — 옆으로 자리 폭 30%면 한 칸, 빈 자리로도 간다. 자리 배치를 바꾸면 `HSLOT.m`과 배열 순서를 함께 고친다. 카드를 내면 그 자리는 비어 있고 남은 카드는 가운데로 모이지 않는다. `--i`는 배열 순번이 아니라 자리 번호, `--n`은 자리 수. 핸드 배열 순서 = 자리 순서는 지킨다(맨 왼쪽 카드를 겨냥하는 마법).

## 투척 · 사격 (v3.34)
- 대상 고르기는 `js/engine.js` `snipeTarget`(사격: 남은 체력 낮은 → 같으면 앞, v3.57.0부터 레벨은 안 봄) · `throwTarget`(투척: 맞선 유닛에서 칸이 가장 먼 유닛, 같은 거리면 전장 번호 큰 쪽, 맞선 유닛뿐이면 없음). 투척은 공격 턴마다(`t.thrown`은 한 턴 한 번), 피해는 대상의 방어만큼 줄어든다. 사격은 방어 무시 그대로. 규칙을 바꾸면 `js/cards.js` `ITEM_KW`의 "투척" · "사격" 글도 함께.
- 화면 없는 도구(`tools/balance/harness.js`)는 `js/game.js`의 "화면" 절 앞까지만 읽는다. 규칙 함수가 부르는 함수는 그 앞에 둔다(v3.34에 `logShieldRoll`을 옮김).

## 장착 아이템의 표시 (v3.33.2)
- 아이템이 붙이는 고정 · 버팀 · 눌림은 전장 칩 줄(`equipChipsHTML`)과 크게 보기(`instLines`)에서 말로 쓰지 않고, 크게 보기의 수치 앞 기호로만 보인다(`itemTextPinned`: `+▲4` · `🔒3`). 말과 뜻은 카드를 눌러 여는 설명 패널(`focusInst`)에만. 표시 능력 글인지는 `isPinAb`.

## 카드 이름 글꼴 (v3.20.3)
- 카드 맨 위 이름은 한글 글꼴(`--kfont`)과 따로 `--nfont` · `--nweight`(`js/game.js` `NAME_FONTS`). v3.32.4부터 설정 창에서 글꼴 고르기를 뺐다 — 저장된 값(Prefs `font` · `namefont`)만 `applyFont`가 쓴다. 기본 송명 400. 새 이름 글꼴을 더하려면 `fonts/`에 woff2를 담고 `css/fonts-names.css`에 @font-face, `NAME_FONTS`에 한 줄. PC 앱 · 안드로이드 앱은 인터넷이 없을 수 있으니 Google Fonts 주소에 기대지 않는다.

## 카드 글 (v3.38)
- 마법 글의 "맨 앞 2기" · "피해 N"은 화면에 보일 때 `js/wording.js`가 "맨 앞 유닛 2개" · "체력 −N"으로 바꾼다(데이터 파일은 그대로). **피해 = 방어만큼 줄어드는 것, 체력 −N = 방어 무시**(매뉴얼 "피해와 체력 −"). 새 마법은 처음부터 새 말로 써도 된다. 바뀐 글 보기 `node tools/wording_check.js --brief`.
- 카드 서사가 없는 카드에는 `js/lore.js`(CARD_LORE, 카드 ID)에 한두 문장을 쓴다. 새 카드를 만들면 서사도 함께.
- 능력 칩은 네모 없이 글자 색만, 카드 글은 카드 이름 글꼴(`css/cardtext.css`, 맨 마지막에 읽음).

## 카드 이름과 세계관
- 세 진영의 힘의 근원(거인·용·신)과 거인 일곱은 `docs/WORLD.md`에 있다. 카드 이름을 짓거나 고칠 때 따른다.
- **카드 이름·설명 고침은 `js/names.js`에 카드 ID로 적는다.** `js/data.js`는 균형 도구가 옛 백업에서 다시 써서 직접 고친 이름이 사라진다. (스페셜 · 유니크는 `names.js`보다 늦게 더해져 NAME_FIX가 닿지 않으니 `js/specials.js` · `js/uniques.js`에서 직접 고친다.)
- **스페셜은 깃발마다 하나뿐인 존재다**(v3.59, `docs/WORLD.md` 5장): 서사는 깃발의 평범한 구성원에서 시작하지 않는다(출신 종족 · 옛 직업을 쓰지 않고 지금 무엇인지만), 작은 카드 종족 줄에 종족 낱말 없음(`raceLineHTML`), 그림은 평범한 그 종족이 아닌 거대한 존재(`tools/art/art_style.json` special · `art_notes.json`). 스페셜 카드의 그림 자리 꾸밈은 `specialFxHTML` · `css/fmcard.css` 끝 "스페셜 광휘".
- **카드를 게임에서 뺄 때는 `js/retired.js`에 카드 ID로 적는다**(= 레거시. v3.51부터 레거시는 어떤 덱에도 못 쓴다 — `deckable`이 막고, 가진 모험가는 `Store.refundGoneCards`로 상점 값을 돌려받고 덱 자리는 같은 깃발 · 같은 종류 카드로 채워짐. 기본 · 정예 덱에 레거시가 남지 않게 함께 바꾼다)(v3.20.7, 같은 까닭으로 `data.js`에서 지우지 않음). 모험가의 보유 · 덱에서도 빼야 하면(v3.29.1 8레벨 35장처럼) 이유를 `8레벨은 스페셜만…`처럼 `GONE_CARDS`가 고르는 문구로 적거나 `GONE_CARDS`에 넣는다 — `Store.refundGoneCards`가 상점 값을 돌려주고 덱 자리를 `GONE_SWAP`으로 채운다. **8레벨은 스페셜만**(v3.29.1). 주 스탯 10 초과는 괜찮다(상한 권장 공 13 · 체 14, `docs/BALANCE_v4_draft.md` 2장). 새 일반 카드는 같은 깃발 · 같은 레벨 카드와 이름 · 역할이 겹치지 않는지, 깃발의 강점 · 원소(`docs/WORLD.md` 6장)에 맞는지 먼저 본다. 뺀 까닭은 `docs/RETIRED_v3.20.7.md`.
- 마법 카드의 핸드용 짧은 문구는 `js/briefs.js`(`SPELL_BRIEF`)에 카드 ID로 적는다. 마법 글(`text`)을 고치거나 새 마법을 만들면 짧은 문구도 함께 쓴다(적는 법은 파일 맨 위).
- 이름 짓기 원칙(새 고유명사는 천천히, 마법 이름 6글자 이하, 익숙한 마법은 그대로)은 `docs/WORLD.md` 7장.

## 상점 · 교역소 (v3.21)
- 카드를 사고파는 곳은 **상점**(`js/shop.js`, 예전 이름 교역소). **교역소**는 모험가끼리 카드 · 조각을 맞바꾸는 곳(`js/trade.js` 규칙 · 서버 흉내, `js/trade-live.js` 실시간 방, `js/trade-ui.js` 화면, `css/trade.css`). 연대기 · 세계관 글의 "교역소"(린데어의 장소)는 그대로 둔다.
- 화면은 `TradeAPI`만 부른다(Promise). 거래가 보유 카드 · 지갑을 고치는 곳은 `Store.escrowTake` · `escrowGive`뿐 — 다른 곳에서 `u.collection`을 직접 고쳐 거래를 흉내 내지 않는다. 서버로 옮길 때는 `TradeAPI.backend`만 바꾼다(`docs/TRADE_API.md`).
- 덱 보호: 거래에 걸 수 있는 장수는 `Store.tradeable`(보유 − 저장한 덱 · 초안). 새로 카드가 빠지는 기능을 만들면 같은 함수를 쓴다.
- 거래로 오가는 조각의 장부 이유는 "거래…"로 시작한다(경험치에서 빠짐, `js/level.js` `noXp`).

## 룰북 (v3.55)
- 게임의 짜임(상점 · 합성 · 파친코 · 순례 · 보상 · 계정 …) 설명은 `js/rulebook.js`(대기실 명판 「룰북」). 글은 맨 아래 `RULEBOOK`, **숫자는 글에 쓰지 않고** `{값 이름}` → `RB_VALUES`(게임 상수에서 읽음), 여러 줄 표는 `RB_TABLES`. 매뉴얼은 대전 규칙 · 카드 읽기 쪽만.
- 상수 이름을 바꾸거나 새 규칙(재화 · 보상 · 확률)을 만들면 룰북 값 · 글도 함께 보고 `node tools/rulebook_check.js`를 돌린다.

## 서버 검산 (v3.40)
- 로그인한 모험가의 컴퓨터와 대전 · 순례는 서버가 판을 다시 둬서 확인한다(`server/replay.js` · `js/rewards.js` matchEnd/matchSettle). 그래서 **판 결과를 바꾸는 무작위는 GRand(또는 엔진 RNG)만** — 컴퓨터의 생각 · 코인 다시 던지기(`reflipRand`)까지. 사람이 둘 수 있는 새 행동을 만들면 `REPLAY_ACTS`(game.js 화면 절 앞) 목록에도 넣는다(온라인 `ACT_FNS`와 같이).
- 바꾼 뒤에는 `node tools/replay_check.js 40` · `node tools/replay_check.js 10 hard`가 모두 "같음"이어야 한다.

## 온라인 대전 (v3.10)
- 두 기기가 같은 시드로 같은 판을 계산한다(`js/online.js`). **판의 결과를 바꾸는 난수는 `GRand()` · `shuffleG()`만 쓴다.** `Math.random`은 연출(흔들림 · 소리)에만.
- 사람이 둘 수 있는 새 행동을 만들면 `js/online.js`의 `ACT_FNS`에 넣어 상대에게도 보낸다. 핸드 순서도 판에 영향이 있다(맨 왼쪽 카드를 겨냥하는 마법).

## 소리 프롬프트 (2026-11-14, Gemini용)
- **배경음은 Gemini(Lyria), 효과음은 이 맥에서 Stable Audio Open 1.0으로 만든다**(v3.65.1~). 효과음 도구는 `~/develop/stable-audio/gen.py`(MPS) — `tools/sfx/prompts/sfx.jsonl`의 `sounds[].single` 문장을 읽어 `<키>.ogg · .mp3`를 만든다. 일부만 다시 만들 때는 그 카드 줄만 모은 jsonl을 `SAO_SRC`로, 출력은 `SAO_OUT`, `--redo`(예: `SAO_SRC=x.jsonl SAO_OUT=dir .venv/bin/python gen.py 0 100 fp16 cards --redo`, 한 소리에 30초쯤). 만든 파일을 `audio/sfx/`에 같은 이름으로 넣는다(새 키면 `index.json` · `index.js`에도). 배경음 지시서 `tools/bgm/PROMPT_BGM.md`(15곡: 1부 서정적인 랩소디 5 + 2부 성향이 다른 10, 쓸 곳은 타이틀 1 · 대기실 쪽 7 · 대전 7 제안), 효과음 `tools/sfx/PROMPT_SFX.md`(공용 130 + 카드 705장).
- **카드마다 공격 · 방어 소리가 다르다**(마법은 발동, 아이템은 장착). 새 카드를 만들면 `tools/sfx/notes/<깃발>.json`에 소리 지시도 함께 쓰고(쓰는 법 PROMPT_SFX.md 6장) `node tools/sfx/build_sfx_prompts.js` → `tools/sfx/prompts/`. 지시가 없는 카드는 도구가 알려 준다.
- 받은 소리 파일은 `audio/inbox/bgm/` · `audio/inbox/sfx/`(카드는 `cards/`)에 들어온다. 테이크 나누기는 `prompts/sfx.jsonl`의 `takes`를 따른다.

## 단축키 (v3.32.4)
- 전장 단축키는 `js/game.js` keydown 한 곳(1~9 · Q~T · C · X · S · Enter · Esc · 코인 Space/Enter · R · **A = 코인 자동으로 봉인**). M · N은 `js/bgm.js`(음악 · 효과음). 새 키를 쓰기 전에 둘 다 보고, 한글 자판 글자(ㄱ · ㅁ …)도 받는다. 새 키는 `focusIdleHTML`의 표와 `js/manual.js` 단축키 표에도 적는다.

## 전투 로그 (v3.20.1)
- 개발용 전투 로그는 `js/battlelog.js`(`BLog`). 화면 기록 `log()`의 줄을 모두 받으므로 새 능력 · 마법은 지금처럼 `log` · 엔진의 `lg` · `fl`만 쓰면 로그에도 남는다. 칸 위치 · 수치는 엔진의 수 기록(`step`의 `fx` · `floats` · `snap`)에서 읽는다 — 새 `fx` 열쇠를 만들면 `BLog.step`에 한 줄 더한다.
- 사용자가 "로그를 봐 달라"고 하면 고른 폴더(예: `logs/`)의 `ETHERION_전투_*.txt`를 읽는다. 게임 버전을 올리면 `BLOG_VER`도 고친다.
- 서버로 옮길 때 바꿀 곳은 `docs/SERVER_PLAN.md`.

## 퀘스트 (v3.46, 화면 이름은 v3.47.1에 '모험 수첩' → '퀘스트')
- 규칙 · 수치는 `js/quests.js`(게임과 서버 EXTRA가 같이 읽음): 일일 · 주간 퀘스트 `QUEST_DAILY` · `QUEST_WEEKLY`, 별 자리 · 등급 · 도감 `QUEST`, 업적 `ACHIEVEMENTS`, 칭호 `TITLES`(이름은 웅장하게 — 흔한 말(수집가 · 노장 따위) 대신, 칭호 id는 바꾸지 않는다). 새 퀘스트 · 업적은 한 줄씩. 화면은 `js/journal.js` · `css/journal.css`.
- 진행은 서버가 확인한 판만 센다(`rewards.js` `_settle` → `Store.questMatch`, 로컬은 `screens.js` `onMatchEnd`). 판 밖의 일(강화 · 수레바퀴 · 순례 첫 승)은 quests.js 끝의 감싸기. 새로 셀 일을 만들면 `Store.questEvent`로 보낸다.
- 퀘스트 칸(`quests` · `ach` · `titles` · `title` · `book` · `rank`)은 서버만 바꾼다. 새 받기 함수는 `server.js` OPS · `net.js` NET_SYNC_OPS에 이름을 넣는다.
- 다시보기(`js/replays.js`)는 `cfg.keepLog`(사람 쪽 수 기록) + `cfg.replay` · `cfg.replayView`. 사람이 둘 수 있는 새 행동은 `REPLAY_ACTS`에 넣어야 다시보기 · 검산 모두 맞는다.
- 덱 코드는 `js/deckcode.js`(카드 ID를 그대로 써서 카드가 더해져도 예전 코드가 읽힘).
- 친구 초대 체험 덱(v3.48): 규칙은 `js/quests.js` 끝 절(`TRIAL.days` · `Store.inviteApply`는 서버 등록만 부름), 화면은 `js/deckcode.js`(초대 링크 · 대기실 띠). 내 덱을 쓰는 새 대전 방식을 만들면 체험 덱을 받을지 정하고, 받으면 `matchStart`에 `trial`을 넘기고 서버 덱 검사(`rewards.js` `_checkDecks` · `_pairEnd`)를 함께 본다.
- **폰 가볍게**: CSS를 고친 뒤 `node tools/mobile_lite.js`로 `css/mobile-lite.css`를 다시 만든다(손으로 고치지 않음). 폰에서 끝없이 도는 효과는 transform · opacity만, 큰 그림자 · 흐림 · 캔버스 효과는 `html.mobile`에서 끈다.
- 강화 카드 그림은 원래 카드 그림을 먼저 받고 그 그림을 붙여 그린다(프롬프트의 "Continuity" 줄).

## 서버 (v3.22)
- **v3.45 가볍게**: 3D 세 존재(`js/titans.js`)는 PC · 폰 모두 끄고(index.html에서 뺌), 메뉴 화면은 그림 한 장(`#menu-art`, `js/screens.js` `MENU_ART` — 지금은 타이틀 그림, 프롬프트 `tools/art/prompts/scenes.md`). 폰 · 앱(`html.mobile`)은 별 배경 절반 · 1초 30장(`Bg.lite`), 흐림 유리 빼기(`css/mobile.css` 끝). 새로 1초에 여러 번 그리는 효과를 넣으면 `html.mobile`에서 줄이거나 멈추는 길을 함께 둔다. 날씨(`js/weather.js`)는 들어냈다.
- **v3.44 악용 막기**: 서버가 받는 값은 믿지 않는다 — 카드 장수는 `cleanCount` · `cleanCards`, 카드 ID는 `isCardId`(js/store.js)로 다듬고 새 Store 함수도 같은 것을 쓴다. 실시간 거래는 서버가 양쪽 보고를 맞춰 한 번에 바꾼다(`TradeLocal.livePair`). 온라인 대전 보상은 두 사람의 판 끝 보고가 맞물려야(`Store._pairEnd`), 원정도 서버 검산. 경험치 · 전적(`xp` · `stats`)은 서버만 바꾼다. 로그인 · 등록 · 손님은 횟수 제한(server.js `LIMITS`), 새 모험가는 24시간 · 3판 뒤에 거래(`TRADE.newHours` · `newMatches`).
- **v3.39 보상은 서버가 정한다**(`js/rewards.js`): 서버 모드에서 기기는 조각 · 카드를 직접 늘리지 않는다(net.js가 `Store.addGold` · `grantCard`를 막음, 서버도 관리자 말고는 거절). 새 보상을 만들면 `rewards.js`에 서버 작업으로 넣고 `server.js` OPS · `net.js` NET_SYNC_OPS에 이름을 더한다. 로컬(파일) 모드는 예전 그대로.
- v3.37 맥미니 운영: `ETHERION 서버 (맥).command`(게임 서버 + ETHERION 전용 Tailscale `etherion` + Funnel → https://etherion.tail2be349.ts.net). PC 앱이 붙는 주소는 `tools/desktop/server.txt`. 관리자 상점 규칙은 `js/economy.js` `shopCfg` 이하(새 카드는 관리자가 공개해야 상점에 나옴), 화면은 `js/shop.js` 맨 아래.
- 서버는 `server/server.js`(Node 기본 기능만, npm 꾸러미 없음), 게임 쪽 연결은 `js/net.js`, 설명과 규칙은 **`docs/SERVER.md`**. `ETHERION 서버.bat`으로 켜면 `http://localhost:8787`에서 온라인 모드, 파일로 열면 예전처럼 로컬.
- 서버는 게임의 규칙 파일을 그대로 읽는다(`server/rules.js`: index.html의 `js/data.js` ~ `js/economy.js` + `js/trade.js` · `js/level.js`). **규칙을 서버에 따로 짜지 않는다** — Store · TradeLocal을 고치면 서버도 같다. 새 카드 데이터 파일은 index.html의 그 사이에 넣는다.
- **보유 카드 · 지갑 · 덱 · 초안 · NEW는 Store 함수로만 고친다.** 화면에서 `u.collection` · `u.gold` · `u.decks`를 바로 고치면 서버에 가지 않고 되돌아간다.
- 데이터를 바꾸는 Store 함수를 새로 만들면 `server/server.js` `OPS`와 `js/net.js` `NET_SYNC_OPS`(결과를 바로 씀) · `NET_ASYNC_OPS`(먼저 하고 알림)에 이름을 넣는다. 서버만 바꾸는 새 칸은 `PROTECTED`(server.js) · `NET_PROTECTED`(net.js) 두 곳. 새 교역소 요청 함수는 `TRADE_FNS`와 net.js의 TradeHttp 목록.
- `server/data/`(모험가 데이터)와 `server/config.json`(관리자 암호)은 지우지 않고 git에 올리지 않는다. 시험은 `node server/server.js --no-open --port 다른번호 --data 다른곳/db.json`.
- 게임 js나 서버 코드를 고치면 서버를 껐다 켠다(켤 때 규칙 파일을 읽는다). 맥미니 · 클라우드로 옮기는 법은 `docs/SERVER.md` 7장.

## 스탯 표시 (v3.20)
- 공 · 방 · 체 옆 표시는 셋: 🔒 고정(L, 체력에는 없음) · ▲ 버팀(U) · ▼ 눌림(D). 카드 데이터 `pin`, 아이템은 `pin` + 절대값 `to`. 규칙은 `js/cards.js` `pinModesOf` · `js/engine.js` `floorOf`, 설명은 `docs/PINS_v3.20.md`. 옛 `lock`은 버팀으로 읽는다.
- 마법이 스탯을 직접 바꾸면 `addStat` · `setStats`(engine.js)를 쓴다 — 표시를 지키고, 체력 0이면 쓰러뜨리고, 실제 바뀐 값을 띄운다. 새 카드는 `js/pincards.js`.

## 카드 등급
- 등급(일반·고급·레어·에픽·유니크·스페셜)과 카드별 등급은 `js/grades.js`, 나눈 방법과 새 카드 기준은 `docs/GRADES.md`. **v3.29부터 유니크는 강화 특수능력을 가진 유닛만**(v3.31: 깃발마다 2장 · 18장 · 모두 6레벨, 덱에 유니크 2종까지 `uniqueBlock`. 능력 규칙은 `js/engine.js` 맨 아래 "v3.31 강화 특수능력", 글은 `js/uniques.js` `UNIQUE_ABIL` — 둘을 함께 고친다. 시험 `node tools/uniques/test31.js`, 설명 `docs/UNIQUES_v3.31.md`)(마법 · 아이템 유니크는 에픽으로 내림). 새 수치 기준(레벨 직선 4 + 2 × 레벨 · 유지비 0 또는 1 · 강화는 최대 · 등급 배율 · 7레벨까지)은 `docs/BALANCE_v4_draft.md`, 표 계산은 `node tools/balance4/budget.js`. **v3.49 유닛 등급은 스탯으로 정한다**(고급 = 일반 기준 +8% + 하급 능력 하나) — 바뀐 값은 `js/rebalance.js`(upgrades.js 다음에 SIM_UNITS를 덮고 `REBAL_GRADES`는 grades.js가 맨 끝에 덮음, 손으로 고치지 말고 `node tools/balance4/regrade.js --write`), 깃발 덧보정 `tools/balance4/regrade_offsets.json`, 설명 `docs/GRADES.md` 9장. 새 카드 데이터 도구 목록(harness · balance4/load · art/build_prompts)에 rebalance.js가 들어 있다. **v3.50 카드 풀**: 깃발마다 유닛 일반 21~24 · 고급 6~9(레벨마다 2장까지), 뺀 카드는 레거시(`REBAL_LEGACY` → RETIRED_CARDS, 흔적만 · 바탕이 빠진 강화 카드도 레거시 · 강화 카드는 깃발마다 5장까지) — `docs/GRADES.md` 10장, 덱 바꾸기 `tools/balance4/pool_decks.js`. **v3.30에 유닛을 이 기준으로 맞췄다**(`tools/balance4/rebuild.js`) — 이 도구는 `_backup_v3.30_rebal/js`에서 시작하므로, 그 뒤 손으로 고친 유닛이 있으면 다시 돌리기 전에 `--from js`로.
- 무효 마법(v3.32)은 `js/counterspells.js`(깃발마다 1장, 모두 고급). [무효] = 엔진 `SPELL_OPS.negate`(상대 전장에서 아직 발동하지 않은 마법 중 맨 앞을 부숨). 컴퓨터는 미리 굴리기로 [무효]를 볼 수 없어 `js/game.js` `negateHope`로 어림한다 — 상대 마법을 겨누는 새 효과를 만들면 거기도 본다. 시험 `node tools/counter/test.js`, 실험실 `node tools/counter/lab.js 1500`, 설명 `docs/COUNTERSPELLS_v3.32.md`.
- 레어 마법(v3.24)은 `js/rarespells.js`(깃발마다 공격 · 방어 · 공용 1장). 새 마법의 세기는 마법 실험실 `node tools/highcards/lab_rare.js 2000 [카드 ID,...]`로 같은 레벨 기존 마법 · 유니크와 견준다(레어 목표는 `docs/RARESPELLS_v3.24.md` 2장). 새 카드 데이터 파일을 만들면 `index.html`(data.js ~ economy.js 사이)과 `tools/balance/harness.js`의 파일 목록에 함께 넣는다.

## PC 앱 — Electron (v3.20.2)
- PC 앱은 게임 폴더를 그대로 담는 Electron 껍데기다. 창 · 단축키 · 개발자 도구 막기는 `desktop/main.js`, 만들기는 `tools/desktop/build_exe.py`(파이썬 표준 라이브러리만, 사용법은 파일 맨 위). 게임 코드를 고치면 껍데기는 고칠 것 없고 exe만 다시 만든다.
- 묶는 게임 파일 목록은 안드로이드와 같다(`build_apk.py`의 `web_files`를 그대로 부름). 게임에 새 폴더를 만들면 거기 `WEB_DIRS`에 넣는다.
- 출시용(기본)은 개발자 도구 · F12 · 새로고침 · 원격 디버깅이 막힌다(Electron fuse 포함). 개발 중 확인은 브라우저(`ETHERION 실행.bat`) 또는 `--dev` 빌드.
- 게임 밖 주소(http · https)로 가는 링크는 exe 창에서 열리지 않고 기본 브라우저로 넘어간다. 게임 안에서 다른 화면으로 옮겨 가는 방식(새 html 파일 열기)을 만들면 `main.js`의 `will-navigate`를 함께 본다.
- Electron 버전은 `build_exe.py`의 `ELECTRON`. 올리면 본체를 다시 받는다. 맥 빌드(`--mac`)는 서명이 없다.

## 안드로이드 앱 (v3.15)
- 앱은 게임 폴더를 그대로 담는 WebView 껍데기다(`android/`, 설명 `android/README.md`). 게임 코드를 고치면 앱 쪽은 고칠 것 없고, `tools/android/build_apk.py`로 APK만 다시 만든다.
- v3.46.2 앱은 기본 서버 모드다: `build_apk.py`가 PC 앱과 같은 `tools/desktop/server.txt`(또는 `--server` · `--offline`)로 서버를 골라 `index.html?server=`로 연다(https만). 로컬 앱은 `--offline`. 맥 에뮬레이터 실행은 `tools/android/emulator.sh`, iOS 감싸개는 `tools/ios/`.
- 앱 코드 `android/app/src/main/java/com/etherion/game/MainActivity.java`와 `build_apk.py`의 `build_dex()`(같은 코드를 바이트코드로 직접 적은 것)는 **함께 고친다**. 매니페스트도 `AndroidManifest.xml` ↔ `manifest()`.
- 폰 화면 맞춤은 `js/mobile.js`(레이아웃 폭을 넓혀 줄여 보임). 폰 전용 배치를 새로 만들기보다 이 방식을 유지한다. 터치 손질은 `css/mobile.css`(`html.mobile`).
- PC 대기실(v3.36, 예전 PC 배치): 세 열 높이 = 덱 보관함 높이(`fitLobbyCards`가 `--lobby-h`를 주고 카드 폭을 고름, 모양은 `css/lobby.css`). 출정의 단은 오른쪽 열 아래 `#side-altar`(`altarHTML(f, true)`), 튜토리얼 · 매뉴얼은 오른쪽 열 맨 위. 대전은 온라인만(`startPvP` → `startOnline`).
- 폰 대기실 · 덱 조정실(v3.32.2): 폰 · 앱(`html.mobile`, `lobbyCompact()`)의 대기실은 깃발만, 깃발을 누르면 출정 창(`openDeckSheet`). 출정 단추를 고치면 `altarHTML` · `bindAltar` 한 곳만. 덱 조정실 폰 배치는 `css/mobile.css` 맨 아래 절.
- 앱식 배치(v3.32.3): 대기실 깃발 · 출정 창 · 덱 조정실 탭 · 시작 핸드 3+3 · 얇은 전장 띠는 PC도 쓴다(`html.appui`, 설정 "화면 배치" → `js/mobile.js` `AppUI`, 폰 · 앱은 늘 켜짐). 배치를 고치면 `css/mobile.css`의 `html.appui` 규칙, 폰에서만 필요한 크기 손질은 `html.mobile`, PC에서만은 맨 아래 `html.appui:not(.mobile)` 절. 앱식인지 JS에서 볼 때는 `lobbyCompact()`. v3.32.4: PC 전장의 준비 완료(파친코와 줄 맞춤 · 절반 높이) · 셔플 글자 · 생명 크기는 그 PC 절에만 — 폰 · 앱 배치는 건드리지 않는다. v3.32.6: PC 기본은 다시 예전 PC 배치(`html.appui` 없음 — `css/swap.css` 등). 앱식은 PC 설정 "화면 배치"로 고를 때만. 사용자가 "PC"라고 하면 대개 예전 PC 배치를 뜻한다.
- 폰 글자 크기(v3.20.4): 줄이는 정도는 설정 "폰 글자 크기"(`MobileFit`, 맞춤 높이 720 · 620 기본 · 580). 폰 · 앱의 전장 핸드 카드는 `css/mobile.css` 맨 아래에서 핸드 줄을 높여 키운다. 폰에서 글씨가 작다는 말을 들으면 PC 규칙 대신 그 절에 `html.mobile` 규칙을 더한다.
- `android/signing/` 의 서명 열쇠는 바꾸거나 지우지 않는다(바뀌면 폰에서 업데이트가 안 된다).

## 컴퓨터 (v3.24.4)
- 보통은 `js/game.js` `aiPrep`, 어려움은 `js/aihard.js`. **수를 견줄 때는 같은 씨앗으로 굴린다**(보통 `spellGain`, 어려움 `hardEval`의 seeds) — 따로 굴리면 코인 운이 이득처럼 보여 헛수를 둔다.
- 어려움의 생각하는 시간은 `THINK`(경우의 수가 많을수록 길게, 한 턴 상한). 화면 없는 도구는 `HARD.sims` 고정이라 균형 도구 결과에 닿지 않는다. 잴 때 `node tools/balance/think.js js 18 8`(8배 느린 기기인 척).
- v3.35: 컴퓨터와 대전(보통 · 어려움)과 순례 관문의 상대 덱은 내 덱 점수의 100%, 망각의 숲은 105%(`PILGRIM.forestScale`). 정예 덱 `HARD_DECKS`는 컴퓨터와 대전에서 쓰지 않는다.
- 내 덱 점수에 맞춘 컴퓨터 덱은 `js/aideck.js` `aiDeckFor`(기본 덱 대비 비율을 맞춤). 덱 점수는 `js/grades.js` `deckScore`. 확인 `node tools/balance/matchdeck.js build` · `play 0.85,1,1.15 72`.

## 성로 순례 (v3.25 · v3.26)
- **수치는 `js/pilgrim-rules.js`의 `PILGRIM`**(하루 판 수 · 첫 승 조각 · 완주 보너스 · 전투 정산 배수 · 관문별 상대 세기 · 뽑기 확률 · 이정표 · 리셋 요일). 이 파일은 게임과 서버(`server/rules.js` `EXTRA`)가 함께 읽는다 — 화면 코드를 넣지 않는다.
- 규칙 · 화면은 `js/pilgrim.js`. 글(수문장의 말 · 소문 · 망각의 숲 · 동쪽의 기록 · 주간 기억 · 출발지 · 숲의 지도 자리)은 `js/pilgrimtext.js`만 고친다. 1부라 공허의 이름은 쓰지 않는다("비친 나").
- **그날 첫 승 보상(받기 · 뽑기)은 `Store.pilgrimClaim` 한 곳에서만 준다.** 서버로 열면 서버가 부르고, 날짜를 서버 시계의 오늘 · 어제로 검사한다(`OPS.pilgrimClaim`의 `today`). 받은 날은 `u.pilClaim`(서버만 바꾸는 칸). 화면에서 `Store.addGold`로 첫 승 조각을 따로 주지 않는다.
- 그 밖의 순례 상태는 `u.pilgrim`(기기가 정하는 칸): 길 · 판 수 · 걸음 · 소문(`lore`) · 지난 주(`book`) · 기록. 이정표 · 완주 보상은 `Store.addGold` · `pilPickCard`(장부 이유는 "순례 …"). 길의 날짜는 기기 시계(자정 · 수요일 0시).
- 화면은 두 탭: 오늘의 길(지도 `pilMapHTML` — 바탕은 `Kailan.mapSVG()`, 도시 좌표는 `Kailan.places`) · 순례기(`pilBookHTML`). 지도에 장소를 더하거나 옮기면 `js/kailan.js`만 고치면 순례 지도도 따라간다.
- 화면 크기 · 관문 아치(v3.33)는 `css/pilgrim.css` 맨 위 절과 길 절. 관문 HTML은 `showPilgrim`의 `nodeHTML`.
- 순례 판은 대전 설정에 `pil: true` · `econRate`가 붙는다. 경기 끝은 `onMatchEnd` → `Pilgrim.onEnd`.
- 고치면 `node tools/pilgrim/test.js`(467개)를 돌린다. 순례 전투 조각은 1%(v3.28).

## 전투 조각 배수 (v3.26)
- 부서진 카드 2% · 승패 정산에는 모드마다 배수가 곱해진다: `js/economy.js` `ECON.rate`(v3.27: 컴퓨터 0.5% · 온라인 1% · 한 화면 0.5%), 대전 설정에 `econRate`가 있으면 그것(순례). 판정은 `econRate(g)`.
- **경험치는 배수와 상관없이 원래 값**이다(`econGain`이 모자란 만큼 `Store.addXp`). 새 보상에 배수를 붙일 때도 `econGain`을 쓰면 레벨 곡선을 건드리지 않는다.
- 판 끝의 행운(v3.27, `ECON.lucky` · `econLucky`): 0.1% 공짜 카드(순례 뽑기 확률표) · 0.7% 500 조각. `econSettle`이 한 번 굴린다.
- 대기실의 원정 자리는 순례다(v3.26). 원정(`js/expedition.js`)은 하던 것을 마칠 때만 "원정 계속"으로 보인다.

## 업그레이드 · 강화 카드 (v3.28)
- 강화 카드는 `js/upgrades.js`(`UPGRADE_UNITS` · `UPGRADE_OF`), 설명 · 잰 값은 `docs/UPGRADES_v3.28.md`. **v3.29: 강화 결과는 5레벨까지.** 강화 카드를 없앨 때는 `UPGRADE_RETIRED`(강화 → 원래 카드)에 적으면 가진 모험가가 원래 카드 3장을 돌려받는다(`Store.refundAllRetiredUpgrades`). 카드마다 `base`(원래 카드) · `anyItem`(클래스 없음, 어떤 아이템이든) · `limit: 1`. 등급 `upgrade`(강화, 덱 점수 18).
- 합치기는 `Store.upgradeCard`(js/economy.js)만 — 재료 3장(`UPGRADE_COST`)은 `Store.tradeable`로 덱 보호. 서버 `OPS.upgradeCard` · `NET_SYNC_OPS`. 화면은 `Upgrade.run` · `upgradeFX`(js/upgrade-ui.js).
- 강화 카드는 사고팔지 않는다(`buyCard` · `sellCard` · `sellable`이 막음, 재고 0). 보상 뽑기 확률표(`PILGRIM.gamble`)에도 없다.
- 강화 카드의 세기를 바꾸면 `node tools/cardsim/cardsim.js --cards <강화 ID들> --out tools/cardsim/out_v328 --games 40 --base 100 --time 140`을 여러 번(3분씩) → `report.js --out …`. 목표는 1장 넣은 승률 변화 +3%p 안팎(docs/UPGRADES_v3.28.md 3장).
- 강화 카드 모양은 `css/upgrade.css`(마지막 쪽에 읽음), 마크는 `js/view.js` `UPGRADE_MARK` · `upgradeMarkHTML`.
- **v3.52 합성소 · 레어 합성**: 같은 고급 카드 3장 → 같은 깃발 레어 1장(확률 뽑기). 규칙 · 확률은 `js/fusion.js`(`RARE_FUSE` · `rareFuseOdds` · `Store.fuseRare`, 화면 코드 없음 — 서버 EXTRA가 읽음), 뽑기는 서버(OPS `fuseRare` · NET_SYNC_OPS). 화면은 `js/upgrade-ui.js` `Forge`(강화 · 레어 두 탭), 상점 · 덱 조정실 카드의 합성 표식은 `Forge.badgeHTML`(`data-fuse`를 누르면 합성소 — 한 곳의 capture 클릭이 받고, 닫히면 `forge:done` 이벤트로 그 화면이 다시 그림). 시험 `node tools/upgrade/fuse_test.js`.
- **v3.54**: 상점 값은 등급별(`SHOP_GRADE_PRICE`, 스페셜 · 강화는 `shopTradable`이 막음). 강화에 **순례의 인장** 3개(`UPGRADE_SEALS`, `u.seals` — 순례 판 정산 `rewards.js _settle`이 `PILGRIM.seal`만큼). 고급 3장 합성은 **승화**, 파친코 · 수레바퀴의 **운명의 구슬**(`ORB`, `u.orbs`, 서버 `rewardOrb` — 하루 상한)을 넣으면 좋은 레어 · 8% 유니크. `seals` · `orbs`는 서버만 바꾸는 칸이고 기기는 `addSeals` · `addOrbs`로 늘리지 못한다(net.js). 이름을 바꾸면 화면 글(`FUSE_KIND` · `ORB.name`)만.

# ETHERION — AI 작업 안내

브라우저 카드 대전 게임 ETHERION의 폴더다. 설명은 `README.md`, 버전 기록은 `docs/CHANGELOG.md`.

## 그림 작업 전에 반드시 읽을 것
지도, 카드, 게임 화면(UI), 아이콘, 카드 일러스트를 만들거나 고치기 전에
**`docs/STYLE_GUIDE.md`** 를 읽고 그 규칙을 따른다.

- 색, 글꼴, 문양, 지도 기호, 일러스트 구도와 프롬프트 틀이 모두 거기 있다.
- 코드와 가이드가 다르면 코드를 따르고, 가이드를 고친다.
- 새 그림 규칙을 정하면 가이드에 적고 버전을 올린다.
- 카드 일러스트는 `tools/art/inbox/`에 넣고 `python3 tools/art/artmap.py import` — `img/cards/<카드ID>.jpg`(새 그림은 가로 5:4 · 750×600, 옛 세로 그림은 600×750)로 들어가고 목록 `img/cards/art_index.js`가 새로 쓰인다(v3.41, 게임은 이 목록으로만 그림을 찾는다. 손으로 넣었으면 `artmap.py index`). 큰 배경을 바꾸면 폰용 작은 판(`*_m`)도 함께.
- **카드 일러스트 프롬프트 = 카드마다 손으로 쓴 장면 + 짧은 공통 줄**(n판, 2026-11-20 처음부터 새로 씀): 규칙서 `tools/art/PROMPT_GUIDE.md`. **카드별 장면**은 `tools/art/art_scenes/<깃발>.json`(카드 ID마다 `shot · dir · place · pal · scene · light` — 무엇을 · 어디서 보고 · 어디에 놓고 · 어느 쪽을 향하고 · 빛이 어떤지, 영어), 공통 문구(깃발 한 줄 · 배색 · 등급 줄 + 사다리 한 줄 · 화풍)는 `tools/art/art_style.json`(n2, 2026-11-21 **등급 사다리** — 스페셜이 가장 신비롭고 화려하고 유니크 → 에픽 → 레어 → 고급 → 일반으로 한 단계씩 조용해진다. 등급 줄은 분위기 · 빛 · 채도 · 공기 · 재질 다섯 칸, 화려함은 장면이 아니라 등급 줄이 맡는다), 유닛 종류의 생김새 참고는 `tools/art/art_kinds.json`. **새 카드를 만들면 `node tools/art/scene_tool.js todo`(자료 · 틀 제안) → 장면을 쓰고 → `node tools/art/scene_tool.js lint <깃발>`(오류 없음) → `node tools/art/build_prompts.js` → `python3 tools/art/artmap.py`.** 지킬 것: 깃발은 원소다 — 유닛의 몸은 그 카드의 종류(`js/kinds.js` `KIND`)대로, 보이는 모습을 장면에 직접 쓴다(2026-11-21 깃발 기본 종류 · "처음 세운 무리" 줄을 들어냄). 마법은 마법 현상이, 아이템은 물건 하나가 주인공이다. 한 깃발 안에서 시점 · 방향 · 자리 · 배색이 몰리지 않게 쓴다(lint가 센다). 금지 줄을 덧붙이지 말고 장면 글을 고쳐 쓴다. 스페셜 · 레어도 같은 방식이다(스페셜 = 깃발마다 하나뿐인 신화적 존재 · 성소의 유물 — 장면에 종족 낱말을 쓰지 않는다). 옛 g4 체계는 `tools/art/legacy_g4/`에 보관만 한다. 받은 그림은 `tools/art/inbox/`에 넣고 `python3 tools/art/artmap.py import`(장부 `art_map.csv` · 보드 `art_board.html`). 스타일 가이드 6.8.
- 이미지 생성 AI로 그릴 때는 `tools/art/`(사용법 `README.md`, 그림 AI용 지시서 `BRIEF.md`, 프롬프트 `prompts/`, 일괄 생성 `gen.py`). 스타일 가이드 6.7.

## 떠오르는 효과 글자 (v3.18.1)
- 카드 위에 떠오르는 글자에 한글 낱말이 들어가면(수호 · 보호막 · 빼앗김 · 가시 −2 …) `js/game.js`의 `floatAt`이 저절로 **효과 명판**(Hahmlet 금속 광택 글씨)으로 띄운다. 새 능력 · 마법은 엔진에서 `fl(X, uid, "낱말 숫자", cls)`만 쓰면 되고, 한글을 맨 글씨(Cinzel · 바탕체)로 띄우는 CSS를 따로 만들지 않는다. 빛깔은 cls(buff · shield · debuff · heal · miss · dmg)로 정해진다. 규칙은 `docs/STYLE_GUIDE.md` 2.9 "효과 명판".

## 깃발별 스탯 · 코인 기준 (v3.77.2)
- 새 유닛은 `docs/STAT_GUIDE.md` 3장(깃발별 공 · 방 · 체 지수, 코인 수 · 자리 · 흔들림, 맞바꿈 코인)을 참고해 만든다 — 가이드이지 규칙이 아니다. 재기 `node tools/balance/stat_guide.js`.
- 기존 유닛을 기준 쪽으로 옮긴 값은 `js/statguide.js`(celestial.js 다음 · decks.js 앞, 손으로 고치지 말고 `node tools/balance/statguide_apply.js --write`). 이 파일보다 앞의 카드 파일에서 유닛 수치를 바꾸면 statguide.js가 덮어쓸 수 있으니, 그 카드가 목록에 있으면 도구의 `SKIP`에 넣고 다시 쓴다. 새 카드 데이터 파일은 이 파일 앞에 넣는다.
- 에테르 다시 굴리기는 손해인 면에서만 묻는다. **맞바꿈 코인**(한 동전에 + · − 가 함께)은 차례에 따라 손해인 면이 다르다(2026-11-22, 사용자): 공격하는 유닛은 공격 몫, 방어하는 유닛은 방어 · 체력 몫의 부호로 가리고, 그 몫이 없거나 0이면 합의 부호(강철 대장장이 방 +1 · 공 −1 = 공격할 때 앞면 · 방어할 때 뒷면). 사람 · 컴퓨터 같은 셈(`js/game.js` `coinNeg(o, who)` · `coinBad`, 시험 `tools/coin/test.js`). 카드 이름으로 가르지 않는다 — 새 맞바꿈 코인도 저절로 따른다.

## 그 밖에
- **시작 에테르 0 · 첫 턴부터 결정화 · 턴 46초(2026-11-22, 사용자 결정)**: `RULES.essence` 0(예전 위대한 정수 1) · `RULES.maxCrystals` 13(에테르 최대 13 그대로) · `mkPlayer`의 `crysBank` 1(첫 턴부터 1장). 에테르 곡선은 예전과 같고(1턴 1 · 2턴 2 …) 카드 1장을 더 바칠 뿐이다. 준비 단계 시간은 `TURN_LIMIT_MS` 46000(game.js 한 곳). 결정화 안내는 game.js `etherHTML`의 `nudge`(결정 `CRYS_NUDGE` 4개 미만이거나 에테르 0인데 그 턴에 결정화하지 않았으면 구슬 반짝임 `.nudge` + 두 줄 명판, css/crys-hint.css) · `CrysHint`(유령 카드, 어느 판에서든 결정화 3번까지) · `finishPrep`의 빈손 확인 창 · `canPlay`의 "결정화하면 에테르 +1" 꼬리 · `Guide`(`CRYS_GUIDE_TEXT`). 시험 `node tools/firstturn/test.js`.
- **CSS `:has()` 안에는 클래스 · 자식 하나처럼 단순한 것만(2026-11-22)**: `:has(#id:not([hidden]))`처럼 `:not()` · 여러 단계가 든 `:has()`는 DOM에 무엇을 넣든 문서 전체 스타일을 다시 계산하게 한다(메뉴 전환마다 30~70ms). 상태는 JS가 클래스로 붙인다. 메뉴의 카드 목록은 `css/perf.css`(content-visibility)에 넣고, 글 맞춤은 `fitBriefs`가 보이는 카드만 한다 — CHANGELOG "메뉴 전환 빠르게".
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
- **[저주] 묶음 (v3.95, 사용자 결정)**: [저주] = 상위 이름, 그 아래 [공포 N](다음 턴 공격 −N · 방어 −⌈N/3⌉, 드워프 방어 −1 더) · [역병 N](다음 턴 능력 끔, N ≥ 2면 양옆에 [역병 N−1]). [저주 면역]은 모두 막고, [정화]는 저주를 씻는다. 걸린 저주 `keep.curse`, 새 저주 능력은 engine 끝 "v3.95 마족" 절 `A1_CURSE`에 더한다. 핸드 저주는 `it.hc`(game.js `HAND_OPS.handCurse`). 지옥불 · 빙의 · 정신 지배도 같은 절. 시험 `node tools/curse/test.js`.

## 바위주먹 오크 연계 (v3.67)
- 데이터는 `js/orc.js`(gnome.js 다음 · decks.js 앞): 숨통 끊기(SG1-02) · 송곳니 반격(SG1-08) · 뼈 부수기(MG-13) · 송곳니 문신(M2-1, 전 오크의 문신)을 [관통] · [치명] 연계로 바꿈(ID · 등급 · 레벨 그대로). 새 효과 `SPELL_OPS.d0Swap`(방어 0 이하 상대 중 공격 최강 n기의 방어 ↔ 남은 체력).
- 연계의 바탕: [치명]이 남긴 체력 1은 턴이 끝나야 돌아오고, 방어 마법은 앞 아군이 다 쓰러지거나 전투가 끝날 때 발동한다(`runCombatCore` `fire(true)`). [관통]이 깎은 방어도 이번 턴 그대로.
- **피의 맹세 · 원한의 일격 (v3.87, 사용자 설계)**: 피의 맹세 RS-G1-2(전 궁지의 포효, 방어 L2 레어) — 발동할 때 살아 있는 아군마다 피 🩸 하나(`t.blood`). 결속 유닛이 쓰러지면 가진 피가 모두 바로 뒤 유닛으로(`g1OathSweep`, sweep 안 — 같이 쓰러지면 이어서 더 뒤로, 뒤가 없으면 흩어짐). 전투가 끝날 때 남의 피를 가진 생존자는 `t.keep.blood = {turn: 다음 턴, v:[{a,n}]}`(`g1OathEnd`) → 다음 턴 `resetTurn`이 공격 + 합(피 값 = 주인이 쓰러질 때 공격, 코인 몫 빼고), 그 턴 전투가 끝나면 지움. 화면: `.bd-blood` 배지, 다음 턴 준비 때 `bloodRiseFx`가 피를 하나씩 지우며 공격 숫자를 올림(연출만). 컴퓨터 점수 `evalScore`에 머금은 피 × 0.25. 원한의 일격 MG-04(전 무한한 격노, 공격 L2) — 뒤 1칸 유닛 공격 +(내 소각장의 유닛 카드 수, `g1Grudge`). 격노 NG1-1은 그대로(사용자).
- 시험 `node tools/orc/test.js`, 승률 `node tools/orc/sim.js 150 [base|elite|덱 json] [js 폴더]`.
- v3.83 고르바스의 발톱 마법 5장(새 카드 없이 겹치던 · 안 쓰이던 카드를 바꿈, `js/orc.js` 끝 · engine 끝 "v3.82" 절): 궁지의 송곳니(SG1-03 — 효과 · 글은 v3.95 `js/spelltune.js`가 채움, orc.js에는 빈 자리만) · 무한한 격노(MG-04 → v3.87 원한의 일격으로 바뀜. 옛 `g1Cornered` · `g1Rage` · `t.rage`는 2026-11-19 코드에서 지움) · 승전의 함성(PS-G1-1, `g1Victory` → 전투 끝 `g1VictoryEnd`) · 몸통 박치기(SG1-09, `g1Ram`, 2레벨) · 사냥감 몰이(SG1-01, `sortFoe` asc — 홀림 없음).
  - **v3.95 (사용자, `js/spelltune.js` `// v3.95 오크` 절)**: 사냥감 몰이는 남은 체력만 본다(`sortFoe` `by: "hp"`). 궁지의 송곳니(L3)는 아군 **공격**의 합을 몫으로 상대 맨 앞부터 공 → 방 → 체를 깎는다(트롤 숲의 무게 `g2Weight`에 `pool: "a"`). 각성(MC-01) → **웅크린 늑대**(방어 L2 고급, `g1Crouch`: 아군 공격 이번 턴 1로 고정 · 줄어든 합만큼 상대 전체 공격 −). 늑대 기습 · 대지 가르기 고급, 뼈 부수기 L2.
- **카드 이름 · 효과를 바꾸면 그림 · 소리 프롬프트를 다시 뽑고**(그림은 그 카드의 장면을 `tools/art/art_scenes/<깃발>.json`에서 다시 쓰고 `node tools/art/build_prompts.js`, 소리는 `node tools/sfx/build_sfx_prompts.js`), 이미 있는 그림 · 소리 파일이 옛 카드 것이면 **`tools/REMAKE.md`(다시 만들 목록)** 에 프롬프트와 함께 올린다. 만들어 넣은 항목은 거기서 지운다.

## 푸른비늘 인어 — 치유와 환상 (v3.68)
- 데이터는 `js/mermaid.js`(orc.js 다음 · decks.js 앞), 규칙은 `js/engine.js` 끝 "v3.68 푸른비늘 인어" 절(`mrArc` · `mrHeal` · `mrCalm`), 카드 글은 `js/cards.js` `ITEM_KW`.
- **옛 [마력 공격 N](방어를 N 무시)은 모든 깃발에서 [방어무시 N]** — 데이터 키는 `magic` 그대로. 새 **[마력 공격 N]**(키 `arcane`)은 인어 것: v3.95부터(사용자) 공격할 때만, 상대 방어에 막히지 않고 상대 방어(N까지 · 홀리면 전부)를 공격에 더해 깎는다(공 5 · 방 2, N ≥ 2이면 7). 반격에는 없다. 같은 v3.95에 [방어무시]는 반격에도 붙는다(engine `attackOne` 반격 줄).
- **[치유 N]**(키 `heal`): 맞붙음에서 살아남을 때마다 받은 피해 N을 채운다. 인어의 가호는 모두 치유로 바뀌었다. 장착할 때 생명을 주던 아이템 능력은 **[생명 +N]**(evName, `game.js` 장착).
- **레어 오라**: 레어 유닛의 오라 수치 = 범위(1이면 양옆 1칸, 2면 2칸 — 마법 칸은 세지 않음). 쓰고 사라지지 않고 레어가 살아 있는 동안 늘 걸린다. 인어 레어 넬리아의 물그릇 무녀 = [바다의 보호 1](키 `calm`): 범위 안 아군이 받는 피해 −1(맞붙음 · 마법 모두, `MR_CALM_CUT`). 다른 깃발 레어 오라도 같은 틀로.
- **환상 마법**(특색 없던 카드를 바꿈, ID 그대로 · `MERMAID_GRADES`): 물빛 신기루 SG3-02(무작위 2기 공 ↔ 체, `randSwap`) · 환각의 통제 SG3-01(이 마법 바로 뒤 내 카드와 이름 글자 수가 같은 상대 카드 맨 앞 1장을 빼앗음 — 유닛은 판 끝까지, 마법은 내 마법으로, `mindCapture`) · 뒤바뀐 물길 MC-03(상대 유닛을 방+체 높은 순으로 다시 세움, `sortFoe`) · 씻김의 노래 CS-G3(무효로 했을 때만 상대 전체 해제 · 공격 −1 — 효과의 `ifNeg: true`, castSpell).
- **콤보 (v3.78)**: 인어 마법이 상대를 흔들면 그 상대는 이번 턴 **[홀림]**(`t.charm`, engine `mrCharm` — resetTurn이 지움). 거는 곳: 코인 뒷면(`clean`, 상대 쪽) · 공방 교환(`swap`) · 공체 교환(`swapSt` · `randSwap`) · 자리 바꿈(`swapPos`, `sortFoe`는 자리가 바뀐 유닛만) · 환각(`confuse`). **[마력 공격]은 홀린 상대의 방어를 N과 상관없이 전부 피해에 더한다**(`mrArc`의 charm, 공격 · 반격). 새로 상대를 흔드는 효과를 만들면 `mrCharm`도 부른다. 카드 칩 ∿(`game.js`), 뜻 `SPELL_KW["홀림"]`, 거는 마법의 글에는 mermaid.js가 [홀림]을 적는다.
  - 뒤집힌 물거울 MG-11(전 해일): 상대 맨 앞 2기 공 ↔ 방 + 홀림 — 바뀐 방어가 마력 공격의 피해가 된다. 치유를 걸어 주는 마법: 샘물 한 모금 MG-03(맨 앞 [치유 2]) · 치유의 조수 MG-15(전체 [치유 1] · 체력 +1). 높은 레벨 · 희귀 유닛 마력 공격 2~3(`MR_ARC_UP` — 인어왕 3 · 해구의 노래꾼 · 맥박 술사 · 진주 방패 무녀 2. 무녀장 · 넬리아의 정령까지 올리면 기본 덱 60%라 뺐다).
- **물의 몸 · 정화 (v3.89, 사용자 결정)**: 마렌시아의 노래(G3) 카드인 유닛은 받는 [화상]이 붙을 때마다 −1(0이면 안 붙음, 번짐 포함 — engine `mrWet` · `MR_WET_CUT`, `gbScorch` 첫 줄). 생명을 뺀 인어 마법 11장은 아군 맨 앞 1기에게만 [치유 N](grant) 또는 [정화](engine `mrPurge` — 걸리는 순간 화상 · 불씨 · 낙인을 지우고 이번 턴 출혈 막음)로 채웠다(mermaid.js `MR_REFILL`). 대해류 L4 → L3(L2면 기본 덱 +3%p), 대해일은 [장전 3] 없이 L4 · 피해 4 뒤 아군 [치유 1]. 기본 덱 49% → 55%.
- **인어 마법은 내 생명을 늘리지 않는다 (v3.79, 사용자 결정 — 너무 셌다)**: mermaid.js 끝 `noLife`가 생명을 주던 인어 마법 16장에서 `gain.life` · 글 · 핸드 글(SPELL_BRIEF)의 생명 몫을 뺀다. 장착할 때 생명을 주는 아이템 [생명 +N]은 그대로. 새 인어 마법에도 생명 회복을 넣지 않는다.
- 시험 `node tools/mermaid/test.js`, 승률 `node tools/mermaid/sim.js 150 [base|elite|덱 json] [js 폴더]`.

## 레어 유닛 = 오라만 (v3.69)
- **레어 유닛(PN-<깃발>-R) 9장은 스탯과 오라만 가진다. 자기 특수능력은 없다**(표시 ▲ · ▼는 그대로). 데이터 `js/rares.js`(mermaid.js 다음 · decks.js 앞, `RARE_AURA` = 깃발마다 이름 · 하는 일), 규칙 `js/engine.js` 끝 "v3.69 레어 오라" 절(`rareAuraSync`), 카드 글 `ITEM_KW`(RARE_AURA에서 저절로).
- 오라 수치 = 범위(인어 [바다의 보호]와 같은 셈). 고블린 포격 지휘(사격 +1) · 드워프 무쇠 방벽(방어 +1) · 노움 충전 회로(증폭 +1) · 오크 격노의 함성(공격 +2, **내 전장에 [치명] 또는 [관통] 유닛이 하나라도 있을 때만** — 범위 밖이어도 됨) · 트롤 가시덤불(가시 +1) · 인어 바다의 보호(v3.68, mermaid.js) · 마족 피의 갈증(흡혈 부여) · 천족 새벽 서약(가호 +1) · 엘프 별의 인도(방어무시 +1). 없는 능력은 그 수치로 생긴다. 오라가 여럿이면 더한다.
- 셈은 전투 시작 · `sweep` · `step`마다 다시 해서 `t.au`에 적고, 스탯 · 가호 · 가시는 지난 몫과의 차이만 `t`에 더한다. 사격 · 증폭 · 방어무시 · 흡혈은 `abilRaw`가 `t.au`를 더한다. 새 오라를 만들면 `RARE_AURA.eff`에 열쇠를 쓰고, 그 열쇠를 `rareAuraSync`(스탯형) 또는 `abilRaw`(능력형)가 읽게 한다.
- **오라의 서순 · 색(2026-11-16)**: 준비 단계는 놓기 · 옮기기 · 소각마다 `prepAura`가 바로 다시 센다(카드가 호박빛으로 빛나고 "오라 ⚔+2"). 전투 중 새로 켜지거나 커진 오라는 `rareAuraSync`가 `X.auraFx`에 적고(`auraNote`), `step`이 그 수를 기록한 **다음**에 "오라 ⚔+2" 수(`fx.aura` · `fx.auraSrc`)를 따로 남긴다 — 마법이 발동하는 동안(`X.casting` · reveal · spell 수)은 미뤄 마법 카드가 부서진 뒤에. 셈은 예전 그대로라 서버 검산과 무관. 오라 색은 `--aura`(호박), `t.au.by`가 준 레어 이름 · 몫(마우스를 올리면 "오라 [격노의 함성] 공격 +2 (카르노를 쫓는 자)").
- **무쇠수염 드워프의 🔒 방어는 모두 ▲ 방어**(rares.js가 바꿈) — 오라 · 마법이 올릴 수 있게.
- 시험 `node tools/rares/test.js`. 설계와 남은 일 `docs/FLAG_IDENTITY_draft.md`.

## 폭풍 하이엘프 = 바람 궁수 (v3.70)
- **엘프(A3)는 마법사가 아니라 활을 쓰는 사수 · 척후다.** 대표 능력은 [방어무시](멀리서 갑옷 틈을 꿰뚫음)와 [원거리](반격을 받지 않음), 마법은 "조준 사격"(공격)과 "치고 빠지기"(공용 · 방어). 나중에 칼을 쓰는 엘프가 나올 수 있다.
- 데이터는 `js/elf.js`(rares.js 다음 · decks.js 앞, `ELF_GRADES`는 grades.js가 맨 끝에 덮음): 마법 8장을 새 효과로(ID 그대로) · 유닛 · 아이템 이름과 설명(ID · 스탯 · 능력 · 클래스 그대로). 일반 유닛 서사는 `js/lore.js`. **엘프 카드 이름은 names.js가 아니라 elf.js에서 고친다**(elf.js가 나중에 덮음).
- 클래스는 마도 그대로(바람 마법을 실어 쏘는 활 · 아이템 종류 촉매). 그림은 카드별 장면(`tools/art/art_scenes/A3.json`)에 활을 든 사수 · 척후로 쓴다(지팡이 · 책을 든 마법사로 쓰지 않는다).
- 새 효과(`js/engine.js` 끝 "v3.70 바람 궁수 엘프" 절): `retreat`(후퇴 — 내 맨 앞 유닛이 맨 뒤로, `ab`면 그 유닛에게 이번 턴 능력) · `volley`(상대 맨 앞 `skip`기를 뺀 나머지 모두에게 피해 x).
- **벨루미르의 별 콤보 = [활] (v3.93, 사용자 설계)**: [활] = 활을 든 유닛 — 활 아이템(아이콘 bow, 엘프 아이템 9장 중 7장)을 장착했거나, 활을 든 사수 유닛(`ELF_BOW_UNITS`, elf.js — 새 사수 유닛을 만들면 여기에 적는다), 또는 궁사회 무기고로 활을 받은 유닛(`keep.bow`, 쓰러질 때까지). 판정 `a3HasBow`(engine 끝 "v3.93 벨루미르의 별: 활" 절), 전장 칩 🏹(`game.js` `.bd-bow`), 뜻 `SPELL_KW["활"]`.
  궁사회 무기고(SA3-06 공격 L2, 전 급소 저격, `a3Arm`) — 아이템이 없는 아군 전체가 [활] · 이번 턴 공격 +2 · [원거리]. 별빛 연사(NA3-3 공격 L3, 전 꿰뚫는 화살, `a3Volley`) — [활] 아군 수 × 2를 상대 전체에(방어 무시, [증폭] 붙음). 두 장은 기본 · 정예 덱에 넣지 않았다.
- **v3.95 엘프 마법 (사용자)**: 혼란의 바람(SA3-02 공격 L2, 전 바람 장벽, `a3Confuse`) — 상대 맨 앞 1기 방어 ↔ 체력(방어 0이면 쓰러짐, [저주 면역]은 방어가 내려갈 때만 막음). 되쏘는 바람(SA3-05 방어 L2, 전 회오리 방벽) — 아군 맨 앞 2기 방어 +2 · 체력 +2 · [방어무시]. 같은 때 [방어무시]는 반격에도 붙게 됐다. 데이터 `js/spelltune.js` `// v3.95 엘프`. 별의 문자(US-A3-1 에픽 핸드)는 마족으로 옮겨 **그믐의 계약서**(ID · 효과 그대로) — 카드 깃발을 옮기면 저장 덱은 `Store.fixMovedCards`(economy.js)가 서버를 켤 때 다른 깃발 덱에서 빼고 같은 종류로 채운다.
- 스페셜 별을 푼 이사크(SP-A3)는 v3.93부터 10/1/10 [사격 2](코인 그대로, 사용자). 능력 3개 유닛은 이제 없다 — `tools/abilcap/test.js`는 시험용 카드로 본다.
- 시험 `node tools/elf/test.js`.

## 번개 노움 = [증폭] (v3.72)
- **노움(B3) 대표 능력은 [증폭 N]**: 전장에 있으면 내 마법이 상대 유닛에게 주는 피해 +N(맞는 유닛마다, 전장의 증폭을 모두 더함). v3.72부터 공격 마법만이 아니라 **공용 · 방어 마법 피해에도** 붙는다(핸드 마법 빼고) — `js/engine.js` `AMP_KINDS` · `ampKind` · `amplify`. CARDS의 마법 type은 공격 `atk` · 공용 `any` · 방어 `def` · 핸드 `hand`. 피해를 주는 새 SPELL_OPS는 `ampKind(C(it)) ? amplify(X.P[caster]) : 0`을 더한다.
- **[방어무시]는 엘프 것** — 노움 유닛 · 아이템에서 걷었다(`js/gnome.js` 끝 `GNOME_V372`): 피뢰탑 수리공 · 천둥 기관 오메가 · 연쇄 번개 학자 → 증폭 1, 일곱 번째 → 증폭 2 · 정전기 실험가 · 피뢰침 정비공 · 케라운 탐사원 · 번개 병기 학자 · 번개 거신 · 볼타리움 학장 → 능력 없는 일반(v3.49 전 스탯) · 아이템 5장(구리 코일 · 학술원 법전 → 증폭 1, 별을 읽는 보주 · 케라운의 뇌관 · 즈라크의 번개 병 → 방어무시만 뺌). 증폭 글(evText)은 gnome.js가 모든 깃발 카드에서 새 규칙으로 고쳐 쓴다.
- 증폭은 합이 쌓여 광역 마법에서 크게 튄다 — 증폭 유닛을 늘릴 때는 승률을 꼭 잰다(방어무시 10장을 모두 증폭으로 바꾸면 기본 덱 52 → 59%).
- 시험 `node tools/gnome/test.js`.

## 잿불 고블린 = 불붙이기 (v3.73)
- **고블린(B1) 대표 능력은 [점화 N]**(키 `ignite`): 고블린의 옛 [사격 N]을 바꿨다. 이 유닛이 **맞붙어 공격한 상대에 화상 N**을 남긴다(v3.92, 공격으로 쓰러뜨리면 없음). 화상은 붙은 그 자리에서는 피해 없음. 다른 깃발의 [사격]은 그대로. 예외: 아이템 나팔 산탄총(IB1-3, 전 고블린 산탄총)은 [사격 1](v3.77.3 사용자 결정, `js/itemtune.js`).
- **화상 (v3.88, 사용자 결정)**: `keep.burns = [{ n, t, by }]` — **[화상 N]은 [가시]처럼 따로따로 쌓인다**(N이 더해지지 않음, 칩도 따로). 다음 턴 전투가 시작될 때(불씨 다음 · 첫 마법 전) 화상마다 체력 −N(방어 무시) 뒤 꺼지고, **N ≥ 2면 양옆 유닛(대기열 바로 앞 · 뒤)에 [화상 N−1]**이 옮겨붙는다(다음 턴에 터짐). `keep.scorch`(합) · `scorchT`는 다른 규칙(재생 멈춤 · [정화] · [불꽃 사냥])이 읽도록 함께 맞춘다 — 다른 곳이 `scorch`를 0으로 지우면 `gbBurns`가 목록도 끈다. 마족 [출혈](이번 전투 맞붙음마다) · 고블린 유니크 불씨 전염(꺼지지 않고 옮김)과 다르다.
- **[화염 갑주 N]**(키 `farmor`): 이 유닛을 맞붙어 공격한 상대에 [화상 N]. **원거리 공격자는 빼고**(v3.88 사용자 결정 — 칼을 들고 붙은 자만 불을 묻힌다). 고블린 [가시]는 모두 이것으로. 갑주 수치는 1로 둔다 — 2~3이면 기본 덱 승률이 70%까지 올랐다(벽 하나를 여럿이 치면 모두 탄다).
- 레어 오라 [포격 지휘] = 양옆 아군 공격 +1(`js/goblin.js`가 `RARE_AURA.B1`을 덮음).
- **고블린 역전 콤보 = 화약통 (v3.88, 사용자 설계)**: 화약통 깔기(RB1-1 역전 · 덱에 1장, 공용 L3, 전 최후의 포격, 효과 `gbKegs`) — 이 마법 자리와 아군 빈 칸마다 불붙은 화약통(TK-U-BOMB 0/0/2, `keep.face`). 밀릴수록 빈 칸이 많아 화약통이 많다. 화약통은 다음 턴 첫 공격 전(`uBombs`)에 터져 **마주 보는 상대 유닛**(아군 전장 유닛 차례 = 상대 대기열 같은 차례, 없으면 가장 뒤 유닛)에 [화상 3]. 짝 화약고 폭파(SB1-08 공용 L2, `gbBlast`) — 아군 화약통 N개를 모두 터뜨려 **부순다**(화약통마다의 화상은 없음). 상대 맨 앞부터 N기에 체력 −N² · [화상 2], 아군 유닛 전체에 체력 −N(화약은 적 · 아군을 다 다치게 함. 화약통이 없으면 아무 일 없음, 사용자 결정). 유니크 포르탄 포병대장의 [시한 화약] 화약통(face 없음)은 예전대로 상대 앞 3기 체력 −3(`gbKegBurst`). 컴퓨터 수 읽기 점수에 다음 턴 화상(붙은 화상 + 깔린 화약통) × 0.25(`gbFireSum`).
- 데이터는 `js/goblin.js`(elf.js 다음 · decks.js 앞, `GOBLIN_GRADES`는 grades.js가 맨 끝에 덮음): 유닛 재구성 — **고급은 다른 깃발처럼 9장**(레벨마다 1~2장: [점화] 4 · [화염 갑주] 3 · [원거리] 2, v3.73.1), 일반은 능력 없음 · 겹치던 3장은 레거시(`LEGACY` → RETIRED_CARDS), 마법 4장(ID 그대로) 도화선 · 기폭(공용) · 불의 장막(방어) · 연막탄(방어). 규칙은 `js/engine.js` 끝 "v3.73 잿불 고블린" 절(`gbScorch` · `gbIgnite` · `gbArmor` · `gbBurnTick` · 효과 `scorch` · `detonate` · `scorchMod`).
- 시험 `node tools/goblin/test.js`.

## 새 특수능력 (v3.74, 사전 `docs/ABILITIES.md`)
- 능력을 새로 만들거나 바꿀 때는 먼저 `docs/ABILITIES.md`(엔진 기준 능력 사전 · 비교표)를 읽고, 바꾼 뒤 그 문서도 고친다.
- **유닛 특수능력은 3개까지(v3.84, 사용자 결정)**: 유닛 능력 먼저, 남은 칸만큼 아이템 능력을 앞에서부터 — 넘치면 잘린다. 표시 · [생명 +N] · 마법이 건 능력(✦) · 레어 오라(◎)는 세지 않는다. **같은 능력도 합치지 않고 칸마다 따로 발동**한다([가시 1][가시 1] = 피해 1 두 번, [사격 1] 두 개 = 두 발, [가호 1] 두 개 = 1 줄이고 또 1). 연출도 칸마다 차례로. 새 수치 능력의 발동 곳은 `abilPieces(it, 키)`를 돌고, 칸 사이에 `step(X, …, PIECE_MS)`. 아이템 능력을 엔진에서 읽을 때는 `itemOf`가 아니라 `itemKept`. 사전 `docs/ABILITIES.md` 0장 7 · 8, 시험 `node tools/abilcap/test.js`.
- 카드 데이터 `js/newabil.js`(goblin.js 다음 · decks.js 앞), 규칙 `js/engine.js` 끝 "v3.74 새 능력" 절.
- **[재생 N]**(트롤, 키 `regen`): 맞붙음이 시작될 때마다(출혈 다음) 체력 +N · 깎인 방어 +N(카드 방어까지), 화상 · 불씨가 붙으면 멈춤. 받은 피해는 턴 끝에 어차피 나으니 회복 능력은 전투 도중에만 뜻이 있다. **마법으로 체력이 깎인 유닛은 그 마법 바로 다음 맞붙음의 재생을 한 번 쉰다**(2026-11-22, 사용자 — 내 마법으로 낸 체력이든 상대 마법 피해든. `castSpell`이 앞뒤 체력을 견줘 `t.regenHold`를 켜고 `nwRegenTick`이 끈다. castSpell을 거치지 않고 체력을 깎는 마법 길을 새로 만들면 `nwHpMark` · `nwRegenHold`를 부른다).
- **[방패 반격]**(`bash`, 반격 + 방어) · **[수호]**(`taunt`, 유닛 능력 — resetTurn이 t.taunt를 켬) · **[굳건]**(`firm`, 자리 바꾸기 · 빼앗기 · 행동 불가 면역 — 새 자리 바꾸기 · 빼앗기 효과는 `nwFirm`/`nwFirmArrange`를 거친다)는 드워프. **[정화]**(`purify`, v3.90 자기만 씻음 · 출혈은 막지 않음)는 천족 — 대신 천족 유닛은 모두 **빛의 몸**: 받는 출혈 −1(engine `a2Holy` · `A2_HOLY_CUT`, 0이면 안 붙음). 마법이 걸어 주는 [정화](인어 `mrPurge`)는 `t.noBleed`로 그 턴 출혈을 막는다, **[요격]**(`intercept`)은 노움.
- [가호 N]은 [출혈]을 깎일 때마다 N 줄인다(마족 ↔ 천족 상극). 보호막 · 바다의 보호는 출혈을 못 막는다.
- 시험 `node tools/newabil/test.js` · `node tools/abyss/bleed_ward_test.js`.

## [방어무시] 수치 없음 · 트롤 갑옷째 조이기 (v3.75)
- **[방어무시]**(`magic`)는 수치가 없다: 공격할 때 상대 방어를 모두 무시(방어 0으로 계산, [연쇄] 둘째에도). 데이터의 magic 1 · 2 · 3 · true는 모두 "있음" — 엔진 `abilRaw`가 true로 만든다. 카드 글 · 칩에 수치를 쓰지 않는다(`itemAbilities` · `grantChipsHTML` · 레어 오라 [별의 인도]는 양옆에 [방어무시]를 줌).
- 트롤의 방어 높은 상대 답: `js/troll.js`(newabil.js 다음 · decks.js 앞) 마법 3장 덩굴 조이기(SG2-01) · 뿌리 파고들기(NG2-1) · 갑옷째 휘감기(MC-14). 효과 `armorCrush`(engine 끝 "v3.75 이끼 트롤" 절) — 피해 = 대상 방어 × mul + base(최소 min), zero면 이번 턴 방어 0.
- 트롤 콤보 한 쌍(v3.76): 수액 몰아주기(SG2-05, `hpGather`) — 체력 최고 아군 1기에게 다른 아군 체력을 1만 남기고 몰아줌(+1씩, [수호]), 몰아 받은 몫은 `t.sap`. 고목 내려찍기(SG2-08, `hpSlam`) — 체력 최고 아군의 남은 체력(+ `t.sap`을 한 번 더) ÷ 상대 유닛 수(내림)를 상대 전체에, 그 뒤 체력 1. 줄인 체력은 받은 피해로 쳐서 [재생]이 채운다. engine 끝 "v3.76 이끼 트롤" 절.
- v3.83 트롤: 고목 내려찍기(SG2-08)는 혼자 써도 된다. v3.84.1부터 `hpSlam` half · need 1 — 체력 최고 아군의 체력이 절반(내림)이 되고, 줄어든 만큼 방어 1 이상인 상대마다 피해(방어 있는 상대가 없으면 체력도 그대로). 숲의 무게(MG-14, 전 베르단의 가호, `g2Weight`) — 아군 체력 합을 몫으로 맨 앞부터 공격 → 방어 → 체력 순으로 깎고, 다 깎아 쓰러뜨리면 남은 몫은 다음으로(기본 덱 2장 +8.4%p — 덱에 넣을 때 승률을 잰다).
- 시험 `node tools/troll/test.js` · `node tools/elf/magic_floor_test.js`.

## 성광 천족 = 신성한 막기 (v3.77)
- **천족(A2)은 "막고 씻는" 깃발**: 드워프가 갑옷(방어 수치)으로 버틴다면 천족은 피해를 없애고(보호막 · [가호]) 더러움을 씻는다([정화]). 그 결을 상대에게 넓힌 마법 4장 — 상대 능력 끄기 · 구원 · 심판 · 막은 피해 되돌리기. 자리 바꾸기는 인어 것이라 쓰지 않는다(사용자 결정).
- 데이터는 `js/celestial.js`(troll.js 다음 · decks.js 앞): 침묵의 기도(SA2-03, `a2Hush`) · 구원의 빛(NA2-1, `a2Redeem` — 상대 1기가 이번 턴 **카드째** 새벽성 작은 성상 0/2/4가 된다. v3.90 `t.look` — `C(it)`가 `CARDS[t.look || id]`를 돌려 이름 · 레벨 · 그림 · 능력이 바뀌고, `resetTurn`이 지운다. 소각장 · 주인 셈은 `it.id` 그대로) · 심판의 저울(SA2-07, `a2Scale` — **상대끼리** 같은 능력 2기 이상이면 공격 − 각자의 레벨, v3.90) · 응보의 빛(RS-A2-2, `a2Retrib`). 규칙은 `js/engine.js` 끝 "v3.77 성광 천족" 절.
- 응보의 빛이 세는 "막은 피해"는 `hurt`의 보호막 · 보호막 코인 · 가호 줄에서 `a2Blk`가 쌓고(`X.a2Blk`, 마법을 쓰기 전에 막은 것도), `runCombatCore`의 `fire(true)` 다음 `a2RetribEnd`가 되돌린다(v3.90 상한 없음 — 사용자. 카드는 발동하면 바로 부서지고 막은 피해는 마지막에만 보인다). 새로 피해를 막는 효과를 만들면 `a2Blk`도 부른다.
- **천족 유닛의 공격 능력은 조금씩만**: [관통] 광신 돌격병 · [방어무시] 새벽의 천사장 · [출혈] 천벌의 집행자 각 1장. [출혈]은 마족 것을 "정화 의식이 끝날 때까지만 빌려 쓴다"는 결 — 아이템 압수한 흑요검(IA2-1, [출혈 1]). 마족의 출혈(흑요 단검)을 넘지 않게 더 늘리지 않는다. 나머지는 [가호] · [정화].
- 시험 `node tools/celestial/test.js`, 승률 `node tools/celestial/sim.js 150 [base|elite|덱 json] [js 폴더]`.
- **천족 역전 콤보 = [새벽빛] (v3.86, 사용자 결정)**: 트롤(체력) · 드워프(방어)가 지금 가진 스탯을 바로 공격으로 바꾼다면, 천족은 "버틴 시간"을 모았다가 한 번에 돌려준다. 특색 없던 3장을 바꿈(ID · 등급 그대로, `js/celestial.js` REWORK):
  인내의 기도(SA2-02, 공용 L1, `a2Vigil` — 맨 앞 2기 [가호 1] + 새벽빛 켜기) · 새벽의 해방(MA-14, 공용 L3, `a2Dawn` — 새벽빛 + 내 생명이 상대보다 적은 만큼을 모두 풀어 공격 높은 상대부터 체력 −, 쓰러뜨리면 다음으로, 남으면 내 생명 +. 밀린 생명을 더해야 역전 구간 승률이 오른다 — CHANGELOG v3.86.0) · 순교의 서약(MA-10, 방어 L2, `a2Martyr` — 이번 턴 아군이 쓰러질 때마다 양옆 아군 [보호막]. 빛 피해는 주지 않는다 — 사용자).
  v3.90 새벽빛 잇기(사용자 결정): 전투가 시작될 때 살아 있는 아군 [정화] 유닛 하나마다 새벽빛 +1(`nwPurify` — 씻을 것이 없어도). [정화]가 자기만 씻게 되어 씻기만으로는 빛이 거의 안 모이므로, 정화 유닛을 까는 것 자체를 콤보로 삼는다.
  새벽빛 `p.light`는 판 내내 남는 플레이어 몫(없음 = undefined, 최대 37 — v3.90 12 → 37): 막은 피해(`a2Blk`) · [정화]로 씻은 것 하나마다 1(`nwPurify`) · 턴마다 깎인 생명의 절반(`a2LightEnd`). **플레이어 몫을 새로 만들면 `bonus`처럼 네 곳에 싣는다** — game.js `cloneForCombat` · `applySnap`, engine `recPush` snap · `cloneSide`. 화면은 생명 칸의 `ps-light`(인내의 기도를 쓴 판에만). 규칙은 engine "v3.86 성광 천족: 새벽빛 · 순교" 절, 시험 `node tools/celestial/dawn_test.js`.

## 깃발 아래 유닛 종류 (v3.79)
- **깃발은 한 종족이 아니다.** 깃발의 유닛은 그 깃발의 절대자(거인 · 용 · 신)에게서 힘을 받거나 그 힘이 깨운 모든 존재다 — 짐승 · 정령 · 깨어난 물건 · 절대자의 몸에서 떨어져 나온 것(새벽의 "천족" = 솔란테가 부른 모든 것). **유닛마다 제 종류가 있다**(2026-11-21, 사용자 결정: 깃발 기본 종류였던 고블린 · 드워프 · 노움 · 오크 · 트롤 · 인어 · 마족 · 천족 · 하이엘프를 들어내고, 그 유닛 65장에 저마다의 종류를 적음 — 잿너구리 · 안경원숭이 · 검치호 · 어둑시니 …. 따로 적혀 있던 엘프 · 나이트엘프 · 세라프 5장과 종족 이름이 든 마법 · 아이템 4장도 같은 날 바꿈 — 새 카드도 종류 · 이름을 그 카드만의 존재로 짓는다). 종류 목록은 `docs/UNIT_RENAME.md`(바뀐 것은 맨 아래 절), 원칙은 `docs/WORLD.md` 6장.
- 깃발 이름은 "절대자의 상징": 도르마크의 심장불 · 소르그림의 방패 · 케라운의 벼락 · 고르바스의 발톱 · 베르단의 뿔 · 마렌시아의 노래 · 모르카스의 그믐 · 솔란테의 새벽 · 벨루미르의 별(`GROUPS[g].name`, 짧게 `short`). 진영은 거골 연합 · 용맥 맹약 · 신탁 성회.
- 데이터는 `js/kinds.js`(celestial.js 다음 · statguide.js 앞): `KIND`(카드 ID → 종류 — 유닛마다 적는다. 깃발 기본 종류 `KIND_DEF`는 2026-11-21에 들어냈고, 적지 않은 유닛은 종류 줄이 빈다) · `KIND_NAME`(새 이름 — names.js · elf.js · goblin.js · highcards.js · pincards.js · upgrades.js의 이름보다 나중에 덮는다) · `KIND_DESC`(새 서사 — 카드 설명 · lore.js보다 앞섬) · `KIND_CLAN`(묶음 이름, 아직 화면에 안 씀). 카드에는 `c.kin`(작은 마법의 `kind`와 겹치지 않게 kin), 카드 종류 줄 `raceLineHTML`은 `c.kin`을 쓴다. 강화 카드는 원래 카드의 종류, 스페셜은 종류 없음.
- **유니크 유닛은 신 · 용 · 마왕급의 거대한 판타지 존재다**(2026-11-22, 사용자 결정): 종류 · 서사 · 그림 장면 모두 현실 동물이 아닌 그 급의 존재로 쓴다(흡혈 군주 · 염마 · 용암룡 · 뇌신 · 별비늘 용 · 거신 …, 지어낸 존재도 좋다). 장면은 탑 · 성벽과 견줄 크기로, 작은 병사 · 건물을 곁에 두어 크기를 보인다. 바꾼 목록은 `docs/UNIT_RENAME.md` 7.2.
- **새 유닛을 만들면 `KIND`에 종류를 적고**, 같은 깃발에 없는 종류를 먼저 찾는다(거의 카드 하나에 한 종류). 골렘은 방패만, 실제 신 이름은 쓰지 않는다. 새 종류의 생김새는 `tools/art/art_kinds.json`(참고표)에 적고, 그 카드의 그림 장면(`tools/art/art_scenes/<깃발>.json`)에 그 몸을 직접 묘사한다. 다 적었는지는 `node tools/art/scene_tool.js todo <깃발>`의 "종류:" 줄로 본다.

## 카드 배치 · 핸드 (v3.19)
- 카드는 판타지 마스터즈식 배치다(왼쪽 위 종류 아이콘 · 왼쪽 세로 레벨 · 그림 아래 글 상자 · 오른쪽 아래 클래스와 공방체). HTML은 `js/view.js` `cardHTML` · `cardFullHTML`, 모양은 `css/fmcard.css`(맨 마지막에 읽음). 카드 모양을 고칠 때 `style.css` · `slim.css`의 옛 카드 규칙보다 이 파일을 먼저 본다.
- 전장의 내 핸드는 겹치지 않는 똑바른 한 줄(`css/hand-row.css`, 슬롯의 `--i` · `--n`). 부채꼴로 되돌리지 않는다.
- 핸드는 붙박이 자리다(v3.19.4, `js/game.js` `handSlots`, 내 핸드 · 상대 핸드 모두). 끌어서 자리 옮기기(`handReorder`, v3.32.5)도 이 자리 기준 — 옆으로 자리 폭 30%면 한 칸, 빈 자리로도 간다. 자리 배치를 바꾸면 `HSLOT.m`과 배열 순서를 함께 고친다. 카드를 내면 그 자리는 비어 있고 남은 카드는 가운데로 모이지 않는다. `--i`는 배열 순번이 아니라 자리 번호, `--n`은 자리 수. 핸드 배열 순서 = 자리 순서는 지킨다(맨 왼쪽 카드를 겨냥하는 마법).

## 투척 · 사격 (v3.34)
- 대상 고르기는 `js/engine.js` `snipeTarget`(사격: 남은 체력 낮은 → 같으면 앞, v3.57.0부터 레벨은 안 봄) · `throwTarget`(투척: 맞선 유닛에서 칸이 가장 먼 유닛, 같은 거리면 전장 번호 큰 쪽, 맞선 유닛뿐이면 없음). 투척은 공격 턴마다(`t.thrown`은 한 턴 한 번), 피해는 대상의 방어만큼 줄어든다. 사격은 방어 무시 그대로. 규칙을 바꾸면 `js/cards.js` `ITEM_KW`의 "투척" · "사격" 글도 함께.
- 화면 없는 도구(`tools/balance/harness.js`)는 `js/game.js`의 "화면" 절 앞까지만 읽는다. 규칙 함수가 부르는 함수는 그 앞에 둔다(v3.34에 `logShieldRoll`을 옮김).

## 아이템 수치 손질 (v3.77.3)
- `js/itemtune.js`(statguide.js 다음 · decks.js 앞): 같은 레벨 · 등급 아이템보다 많이 약한 13장은 체력 또는 공격 +1~2, 지나치게 센 골렘 핵은 방어 −1. 깃발 파일이 고친 값 위에 덮으므로 **이 13장 · 골렘 핵의 공 · 방 · 체는 여기서 고친다.** 잣대(아이템 점수)와 잰 승률은 파일 머리 주석과 CHANGELOG v3.77.3.
- 아이템은 유닛보다 약하게 두되, 레벨만 높고 스탯이 낮아 쓸 까닭이 없는 카드는 만들지 않는다(사용자).

## 아이템 등급 규칙 (v3.80, 사용자 결정 · `docs/ITEM_BALANCE.md`)
- **레벨**: 4레벨 아이템은 스페셜만. 일반 · 고급 · 레어는 3레벨까지, 에픽은 2 · 3레벨만.
- **능력 수**: 스페셜만 2개, 나머지는 1개까지(▲ · 🔒 · ▼ · 고정 스탯 to · 코인은 능력이 아님).
- **능력 순서**: 먼저 쓴 능력이 더 좋은 것이다. 1순위는 능력 점수(`docs/BALANCE_v4_draft.md` 4장), 2순위는 그 깃발을 보완하는 능력. 유닛 능력 상한(v3.84, 3개)에 걸리면 아이템 능력은 앞에서부터 붙고 뒤가 잘린다. 그래서 첫째 능력은 둘째 없이도 일하게 짠다.
- **고급**: 스탯은 그 깃발 덱에 모자란 쪽(`docs/STAT_GUIDE.md` 깃발 지수)을 채운다. 방패 · 뿔 · 노래 · 새벽은 공, 심장불 · 발톱 · 그믐 · 별 · 벼락은 방 1 + 체. 능력은 대표가 아닌 서브 능력을 고루 준다.
- **에픽**: 스탯은 깃발의 주 스탯을 키운다. 능력은 모자란 쪽을 채우는 같은 진영 다른 깃발의 능력이다(공격 깃발 ↔ 수비 깃발, 다른 진영 것은 되도록 쓰지 않음).
- 잣대(가중 = 1.2 × 공 + 방어값 + 체 + 코인 기대값): 일반 · 고급 2레벨 ≈ 2.2 · 3레벨 ≈ 4.4, 레어 ≈ 4.4 · 6.5, 에픽 ≈ 6.5 · 9.
- 데이터는 `js/itemrework.js`(itemtune.js 다음 · decks.js 앞, 등급은 `ITEMREWORK_GRADES` → grades.js). **이 파일에 있는 아이템의 레벨 · 스탯 · 능력은 여기서 고친다.** 노래 에픽 [매혹](`mesmer`)은 engine `attackOne`이 맞붙음 전에 `mrCharm`을 부른다.
- **스페셜 아이템 9장(v3.81)**: 같은 파일의 `SP_NEW`(새 6장)와 `R["SR-A1~3"]`. 능력 차례는 `abOrder`이고, 카드 글(`cards.js` `itemAbilities`)도 그 차례를 따른다. 새 능력 9가지는 engine 끝 "v3.81 스페셜 아이템 능력" 절(`sp*` 함수)과 사전 `docs/ABILITIES.md` 2.5에 있다. 시험은 `node tools/itemrework/test.js`. 새 스페셜 아이템을 만들 때도 첫째 능력은 둘째 없이 일하게 짠다.

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
- **카드 이름·설명 고침은 `js/names.js`에 카드 ID로 적는다**(유닛 이름 · 서사는 v3.79부터 `js/kinds.js`가 마지막에 덮으니 거기서 고친다). `js/data.js`는 균형 도구가 옛 백업에서 다시 써서 직접 고친 이름이 사라진다. (스페셜 · 유니크는 `names.js`보다 늦게 더해져 NAME_FIX가 닿지 않으니 `js/specials.js` · `js/uniques.js`에서 직접 고친다.)
- **스페셜은 깃발마다 하나뿐인 존재다**(v3.59, `docs/WORLD.md` 5장): 서사는 깃발의 평범한 구성원에서 시작하지 않는다(출신 종족 · 옛 직업을 쓰지 않고 지금 무엇인지만), 작은 카드 종족 줄에 종족 낱말 없음(`raceLineHTML`), 그림은 평범한 그 종족이 아닌 거대한 존재(장면에 종족 낱말을 쓰지 않는다 — `tools/art/art_scenes/<깃발>.json`). 스페셜 카드의 그림 자리 꾸밈은 `specialFxHTML` · `css/fmcard.css` 끝 "스페셜 광휘".
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
- **카드 · 전장 효과음은 v2 합성기 `tools/sfx/synth2/`로 만든다**(2026-11-21~, 프롬프트 문장을 옮기지 않는다 — 사용자: v1 소리가 둔탁했다). 카드 소리(`<ID>.atk · .def · .cast · .equip`)는 `cards.py`가 게임 자료(`dump_cards.js`: 깃발 원소 · 종류 · 레벨 · 등급 · 마법 ops · 아이템 아이콘)로 **틀 하나**(공격: 베기 · 찌르기 · 발톱 · 물기 · 내려치기 · 총 · 활 · 원소 타격 …, 방어: 쇠 · 나무 · 돌 · 껍질 · 깃 · 피함 …, 마법: 피해 · 강화 · 약화 · 보호막 · 치유 · 무효 · 속임수)를 고르고 원소의 색(`elements.py` — 깃발마다 음계 · 음색이 다르다) · 레벨의 무게 · 등급의 장식을 얹는다. `tools/sfx/notes/<깃발>.json`의 글은 틀을 가르는 낱말 힌트로만 읽는다. 전장 공용 소리 89키(카드 다루기 · 코인 · 명판 · 타격 · 능력)는 `common.py`의 손 레시피, 소리 재료는 `kit.py`. 실행 `~/develop/sfx-synth/.venv/bin/python tools/sfx/synth2/render2.py <폴더> [키 · 접두어* …] -j8`(고른 틀만 보기 `--plan`), 검사 `tools/sfx/synth/check.py <폴더>` · 밝기 통계 `tools/sfx/synth2/stats.py <폴더>`(직접 듣지 않으므로 대역 분포로 본다: 150 Hz 아래는 폰에서 안 들리니 몸통은 150~500 Hz, 2~6 kHz 가 비면 둔탁하다, 3 kHz 위 쇠 울림은 0.1초 안에 잦아들게). 만든 파일을 `audio/sfx/`에 넣고 `js/feel.js`의 `SND_ALL`(전부) 또는 `SND_VER`(몇 키)를 올린다. **새 카드를 만들면 render2.py 로 그 카드 키를 만든다.** 메뉴 · 상점 · 보상 · 미니게임 · 짧은 음악 69키는 아직 v1(아래).
- **배경음은 Gemini(Lyria), 효과음은 생성 AI 없이 코드로 직접 합성한다**(2026-11-16~, 사용자가 Stable Audio 결과를 원치 않음). v1 도구는 `tools/sfx/synth/` — `render.py`가 `tools/sfx/prompts/sfx.jsonl`의 `sounds[].single` 문장을 읽어 `<키>.ogg · .mp3`를 만든다. 손 레시피(`recipes_common.py` · 짧은 음악 `recipes_music.py`)가 있으면 그것, 없으면 문장 엔진(`recipes_text.py`: 낱말 → `layers.py`의 층, 마디 순서 = 시간)이 만든다. 실행 `~/develop/sfx-synth/.venv/bin/python tools/sfx/synth/render.py <폴더> [키 · 접두어* …] -j8`(numpy · scipy venv, ffmpeg), 고른 층만 보기 `--plan`, 검사 `check.py <폴더>`. 같은 키는 늘 같은 소리. 소리가 마음에 안 들면 그 키의 손 레시피를 `recipes_common.py`에 더한다. 만든 파일을 `audio/sfx/`에 같은 이름으로 넣는다(새 키면 `index.json` · `index.js`에도). 배경음 지시서 `tools/bgm/PROMPT_BGM_MINOR.md`(서정 · 비장 · 단조판 — 지금 기준, 같은 15곡 이름 · 쓸 곳. 옛 판 · 만드는 법은 `tools/bgm/PROMPT_BGM.md`: 15곡, 1부 서정적인 랩소디 5 + 2부 성향이 다른 10, 쓸 곳은 타이틀 1 · 대기실 쪽 7 · 대전 7 제안), 효과음 `tools/sfx/PROMPT_SFX.md`(공용 158 + 카드 706장 = 소리 1,279키).
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
- **폰 가볍게**: CSS를 고친 뒤 `node tools/mobile_lite.js`로 `css/mobile-lite.css`를 다시 만든다(손으로 고치지 않음). 폰에서 끝없이 도는 효과는 transform · opacity만, 큰 그림자 · 흐림 · 캔버스 효과는 `html.fx-low`에서 끈다.
- **연출 3단계 (2026-11-22, 사용자)**: 설정 "연출" = 저사양 · 중간(기본) · 고사양(Prefs `fx`: `low` · `lite` · `rich`), `js/impact.js` `applyFx`가 `<html>`에 붙인다 — 저사양 `fx-lite fx-low` · 중간 `fx-lite` · 고사양 `fx-high`. **폰 · 앱(`html.mobile`)은 늘 저사양**(`js/mobile.js`가 처음부터 붙임, 설정 창에는 고르는 단추 없음). 저사양 = 예전에 폰만 타던 가벼운 길 전부(`css/mobile-lite.css`의 머리말이 `html.fx-low` · 충격파 · 별 하늘 · 관문 캔버스 없음 · 기울이기 없음 · 조각은 그림 한 장 · 마법 입자 절반). 고사양 = 큰 흐림 · 그림자 필터 + `css/nopulse.css` 끔(빛 맥박) + 목록 카드 등급 광택 + 마법 입자 1.5배. **연출을 가볍게 가르는 새 코드는 `html.mobile`이 아니라 `html.fx-low` · `fxLow()`(js/game.js)로 쓴다** — `html.mobile`은 화면 줄임 · 터치 · 폰용 작은 그림에만. 상단 띠는 `fitTopbar`(js/screens.js)가 넘칠 때만 `.fitN`을 붙여 접는다(css/hud.css 맨 아래).
- 강화 카드 그림은 원래 카드 그림을 먼저 받고 그 그림을 붙여 그린다(프롬프트의 "Continuity" 줄 — 원래 그림이 있으면 `upgradeRef`, 없으면 `upgradeNoRef`를 생성기가 고른다). **강화 장면 = 원래 카드와 닮은 틀, 다음 순간**(2026-11-22, 사용자 결정): 원래 카드의 `dir · place · pal`(되도록 `shot`도) · 장소 · 대표 소품 · 생김새 낱말을 그대로 쓰고("the same …"), 그 이야기의 결실 · 더 큰 몸 · 세 장을 합친 흔적 하나("three …")를 그린다. `lint`가 원래 카드와 짝을 검사하고 강화 카드는 깃발의 쏠림 셈에서 뺀다. 규칙은 `tools/art/PROMPT_GUIDE.md` 3.2 "강화 장면 쓰는 법".

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
- **마법 등급 · 레벨 기준 (v3.94, 사용자 결정)**: 아군 전체에 거는 마법은 레어 이상(일반 · 고급은 드물게, 아군 전체에 피해만 주는 대가는 예외, 마족 제물 마법의 [강탈]은 깃발 규칙이라 예외) · **레벨 2가 주력** · 레벨 1은 약하게 · 레벨 5까지. 새 마법도 이 기준으로 만든다. 기준에 맞춰 옮긴 44장의 레벨 · 대상 · 등급은 `js/spelltune.js`(itemrework.js 다음 · decks.js 앞, 등급 `SPELLTUNE_GRADES` → grades.js)에서 고친다 — 깃발 파일에서 고쳐도 이 파일이 덮는다.
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

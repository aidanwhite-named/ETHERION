# ETHERION — AI 작업 안내

브라우저 카드 대전 게임 ETHERION의 폴더다. 설명은 `README.md`, 버전 기록은 `docs/CHANGELOG.md`.

## 그림 작업 전에 반드시 읽을 것
지도, 카드, 게임 화면(UI), 아이콘, 카드 일러스트를 만들거나 고치기 전에
**`docs/STYLE_GUIDE.md`** 를 읽고 그 규칙을 따른다.

- 색, 글꼴, 문양, 지도 기호, 일러스트 구도와 프롬프트 틀이 모두 거기 있다.
- 코드와 가이드가 다르면 코드를 따르고, 가이드를 고친다.
- 새 그림 규칙을 정하면 가이드에 적고 버전을 올린다.
- 카드 일러스트는 `img/cards/<카드ID>.png` 로 넣는다 (카드 ID는 `js/data.js`의 `id`).
- **카드 일러스트 프롬프트는 등급별**(v3.31): 규칙서 `tools/art/PROMPT_GUIDE.md`, 문구 원본 `tools/art/art_style.json`(등급 · 레벨 · 깃발), 카드별 지시 `tools/art/art_notes.json`. 새 카드를 만들면 `node tools/art/build_prompts.js` → `python tools/art/artmap.py`. **스페셜 · 유니크는 `art_notes.json`에 그림 지시를 함께 쓴다.** 받은 그림은 `tools/art/inbox/`에 넣고 `python tools/art/artmap.py import`(장부 `art_map.csv` · 보드 `art_board.html`). 스타일 가이드 6.8.
- 이미지 생성 AI로 그릴 때는 `tools/art/`(사용법 `README.md`, 그림 AI용 지시서 `BRIEF.md`, 프롬프트 `prompts/`, 일괄 생성 `gen.py`). 스타일 가이드 6.7.

## 떠오르는 효과 글자 (v3.18.1)
- 카드 위에 떠오르는 글자에 한글 낱말이 들어가면(수호 · 보호막 · 빼앗김 · 가시 −2 …) `js/game.js`의 `floatAt`이 저절로 **효과 명판**(Hahmlet 금속 광택 글씨)으로 띄운다. 새 능력 · 마법은 엔진에서 `fl(X, uid, "낱말 숫자", cls)`만 쓰면 되고, 한글을 맨 글씨(Cinzel · 바탕체)로 띄우는 CSS를 따로 만들지 않는다. 빛깔은 cls(buff · shield · debuff · heal · miss · dmg)로 정해진다. 규칙은 `docs/STYLE_GUIDE.md` 2.9 "효과 명판".

## 그 밖에
- 결정화한 카드는 소각장(`p.burn`)에 들어간다(v3.19.2, 결정은 `p.crystals`에 따로 남음). 소각장에서 되살리는 마법은 `p.burn`에서 꺼내면 되고, 결정 수는 건드리지 않는다.
- 카드 뒷면의 ETHERION 글씨는 그림에 구워 넣은 것이다. 뒷면 그림을 바꾸면 `img/ui/deck/card_back_plain.png`에 넣고 `python tools/art/cardback_text.py`.
- 수정 전 상태는 `_backup_v<버전>/` 에 남겨 왔다. 큰 변경 전에는 같은 방식으로 백업한다.
- 세계관 이름은 모두 가칭이다. 이름과 설정은 README와 가이드에 적힌 것을 따른다.

## 카드 배치 · 핸드 (v3.19)
- 카드는 판타지 마스터즈식 배치다(왼쪽 위 종류 아이콘 · 왼쪽 세로 레벨 · 그림 아래 글 상자 · 오른쪽 아래 클래스와 공방체). HTML은 `js/view.js` `cardHTML` · `cardFullHTML`, 모양은 `css/fmcard.css`(맨 마지막에 읽음). 카드 모양을 고칠 때 `style.css` · `slim.css`의 옛 카드 규칙보다 이 파일을 먼저 본다.
- 전장의 내 핸드는 겹치지 않는 똑바른 한 줄(`css/hand-row.css`, 슬롯의 `--i` · `--n`). 부채꼴로 되돌리지 않는다.
- 핸드는 붙박이 자리다(v3.19.4, `js/game.js` `handSlots`, 내 핸드 · 상대 핸드 모두). 끌어서 자리 옮기기(`handReorder`, v3.32.5)도 이 자리 기준 — 옆으로 자리 폭 30%면 한 칸, 빈 자리로도 간다. 자리 배치를 바꾸면 `HSLOT.m`과 배열 순서를 함께 고친다. 카드를 내면 그 자리는 비어 있고 남은 카드는 가운데로 모이지 않는다. `--i`는 배열 순번이 아니라 자리 번호, `--n`은 자리 수. 핸드 배열 순서 = 자리 순서는 지킨다(맨 왼쪽 카드를 겨냥하는 마법).

## 투척 · 사격 (v3.34)
- 대상 고르기는 `js/engine.js` `snipeTarget`(사격: 남은 체력 낮은 → 레벨 높은 → 앞) · `throwTarget`(투척: 맞선 유닛에서 칸이 가장 먼 유닛, 같은 거리면 전장 번호 큰 쪽, 맞선 유닛뿐이면 없음). 투척은 공격 턴마다(`t.thrown`은 한 턴 한 번), 피해는 대상의 방어만큼 줄어든다. 사격은 방어 무시 그대로. 규칙을 바꾸면 `js/cards.js` `ITEM_KW`의 "투척" · "사격" 글도 함께.
- 화면 없는 도구(`tools/balance/harness.js`)는 `js/game.js`의 "화면" 절 앞까지만 읽는다. 규칙 함수가 부르는 함수는 그 앞에 둔다(v3.34에 `logShieldRoll`을 옮김).

## 장착 아이템의 표시 (v3.33.2)
- 아이템이 붙이는 고정 · 버팀 · 눌림은 전장 칩 줄(`equipChipsHTML`)과 크게 보기(`instLines`)에서 말로 쓰지 않고, 크게 보기의 수치 앞 기호로만 보인다(`itemTextPinned`: `+▲4` · `🔒3`). 말과 뜻은 카드를 눌러 여는 설명 패널(`focusInst`)에만. 표시 능력 글인지는 `isPinAb`.

## 카드 이름 글꼴 (v3.20.3)
- 카드 맨 위 이름은 한글 글꼴(`--kfont`)과 따로 `--nfont` · `--nweight`(`js/game.js` `NAME_FONTS`). v3.32.4부터 설정 창에서 글꼴 고르기를 뺐다 — 저장된 값(Prefs `font` · `namefont`)만 `applyFont`가 쓴다. 기본 송명 400. 새 이름 글꼴을 더하려면 `fonts/`에 woff2를 담고 `css/fonts-names.css`에 @font-face, `NAME_FONTS`에 한 줄. PC 앱 · 안드로이드 앱은 인터넷이 없을 수 있으니 Google Fonts 주소에 기대지 않는다.

## 카드 이름과 세계관
- 세 진영의 힘의 근원(거인·용·신)과 거인 일곱은 `docs/WORLD.md`에 있다. 카드 이름을 짓거나 고칠 때 따른다.
- **카드 이름·설명 고침은 `js/names.js`에 카드 ID로 적는다.** `js/data.js`는 균형 도구가 옛 백업에서 다시 써서 직접 고친 이름이 사라진다.
- **카드를 게임에서 뺄 때는 `js/retired.js`에 카드 ID로 적는다**(v3.20.7, 같은 까닭으로 `data.js`에서 지우지 않음). 모험가의 보유 · 덱에서도 빼야 하면(v3.29.1 8레벨 35장처럼) 이유를 `8레벨은 스페셜만…`처럼 `GONE_CARDS`가 고르는 문구로 적거나 `GONE_CARDS`에 넣는다 — `Store.refundGoneCards`가 상점 값을 돌려주고 덱 자리를 `GONE_SWAP`으로 채운다. **8레벨은 스페셜만**(v3.29.1). 주 스탯 10 초과는 괜찮다(상한 권장 공 13 · 체 14, `docs/BALANCE_v4_draft.md` 2장). 새 일반 카드는 같은 깃발 · 같은 레벨 카드와 이름 · 역할이 겹치지 않는지, 깃발의 강점 · 원소(`docs/WORLD.md` 6장)에 맞는지 먼저 본다. 뺀 까닭은 `docs/RETIRED_v3.20.7.md`.
- 마법 카드의 핸드용 짧은 문구는 `js/briefs.js`(`SPELL_BRIEF`)에 카드 ID로 적는다. 마법 글(`text`)을 고치거나 새 마법을 만들면 짧은 문구도 함께 쓴다(적는 법은 파일 맨 위).
- 이름 짓기 원칙(새 고유명사는 천천히, 마법 이름 6글자 이하, 익숙한 마법은 그대로)은 `docs/WORLD.md` 7장.

## 상점 · 교역소 (v3.21)
- 카드를 사고파는 곳은 **상점**(`js/shop.js`, 예전 이름 교역소). **교역소**는 모험가끼리 카드 · 조각을 맞바꾸는 곳(`js/trade.js` 규칙 · 서버 흉내, `js/trade-live.js` 실시간 방, `js/trade-ui.js` 화면, `css/trade.css`). 연대기 · 세계관 글의 "교역소"(린데어의 장소)는 그대로 둔다.
- 화면은 `TradeAPI`만 부른다(Promise). 거래가 보유 카드 · 지갑을 고치는 곳은 `Store.escrowTake` · `escrowGive`뿐 — 다른 곳에서 `u.collection`을 직접 고쳐 거래를 흉내 내지 않는다. 서버로 옮길 때는 `TradeAPI.backend`만 바꾼다(`docs/TRADE_API.md`).
- 덱 보호: 거래에 걸 수 있는 장수는 `Store.tradeable`(보유 − 저장한 덱 · 초안). 새로 카드가 빠지는 기능을 만들면 같은 함수를 쓴다.
- 거래로 오가는 조각의 장부 이유는 "거래…"로 시작한다(경험치에서 빠짐, `js/level.js` `noXp`).

## 온라인 대전 (v3.10)
- 두 기기가 같은 시드로 같은 판을 계산한다(`js/online.js`). **판의 결과를 바꾸는 난수는 `GRand()` · `shuffleG()`만 쓴다.** `Math.random`은 연출(흔들림 · 소리)에만.
- 사람이 둘 수 있는 새 행동을 만들면 `js/online.js`의 `ACT_FNS`에 넣어 상대에게도 보낸다. 핸드 순서도 판에 영향이 있다(맨 왼쪽 카드를 겨냥하는 마법).

## 단축키 (v3.32.4)
- 전장 단축키는 `js/game.js` keydown 한 곳(1~9 · Q~T · C · X · S · Enter · Esc · 코인 Space/Enter · R · **A = 코인 자동으로 봉인**). M · N은 `js/bgm.js`(음악 · 효과음). 새 키를 쓰기 전에 둘 다 보고, 한글 자판 글자(ㄱ · ㅁ …)도 받는다. 새 키는 `focusIdleHTML`의 표와 `js/manual.js` 단축키 표에도 적는다.

## 전투 로그 (v3.20.1)
- 개발용 전투 로그는 `js/battlelog.js`(`BLog`). 화면 기록 `log()`의 줄을 모두 받으므로 새 능력 · 마법은 지금처럼 `log` · 엔진의 `lg` · `fl`만 쓰면 로그에도 남는다. 칸 위치 · 수치는 엔진의 수 기록(`step`의 `fx` · `floats` · `snap`)에서 읽는다 — 새 `fx` 열쇠를 만들면 `BLog.step`에 한 줄 더한다.
- 사용자가 "로그를 봐 달라"고 하면 고른 폴더(예: `logs/`)의 `ETHERION_전투_*.txt`를 읽는다. 게임 버전을 올리면 `BLOG_VER`도 고친다.
- 서버로 옮길 때 바꿀 곳은 `docs/SERVER_PLAN.md`.

## 서버 (v3.22)
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
- 등급(일반·고급·레어·에픽·유니크·스페셜)과 카드별 등급은 `js/grades.js`, 나눈 방법과 새 카드 기준은 `docs/GRADES.md`. **v3.29부터 유니크는 강화 특수능력을 가진 유닛만**(v3.31: 깃발마다 2장 · 18장 · 모두 6레벨, 덱에 유니크 2종까지 `uniqueBlock`. 능력 규칙은 `js/engine.js` 맨 아래 "v3.31 강화 특수능력", 글은 `js/uniques.js` `UNIQUE_ABIL` — 둘을 함께 고친다. 시험 `node tools/uniques/test31.js`, 설명 `docs/UNIQUES_v3.31.md`)(마법 · 아이템 유니크는 에픽으로 내림). 새 수치 기준(레벨 직선 4 + 2 × 레벨 · 유지비 0 또는 1 · 강화는 최대 · 등급 배율 · 7레벨까지)은 `docs/BALANCE_v4_draft.md`, 표 계산은 `node tools/balance4/budget.js`. **v3.30에 유닛을 이 기준으로 맞췄다**(`tools/balance4/rebuild.js`) — 이 도구는 `_backup_v3.30_rebal/js`에서 시작하므로, 그 뒤 손으로 고친 유닛이 있으면 다시 돌리기 전에 `--from js`로.
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
- 앱 코드 `android/app/src/main/java/com/etherion/game/MainActivity.java`와 `build_apk.py`의 `build_dex()`(같은 코드를 바이트코드로 직접 적은 것)는 **함께 고친다**. 매니페스트도 `AndroidManifest.xml` ↔ `manifest()`.
- 폰 화면 맞춤은 `js/mobile.js`(레이아웃 폭을 넓혀 줄여 보임). 폰 전용 배치를 새로 만들기보다 이 방식을 유지한다. 터치 손질은 `css/mobile.css`(`html.mobile`).
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

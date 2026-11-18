# 다시 만들 그림 · 소리 (REMAKE)

카드 효과 · 이름이 바뀌어서 **그림이나 소리를 새로 만들어야 하는 카드** 목록이다.
다른 세션은 이 파일을 열어 아래 항목을 만들고, 만들어 넣은 항목은 지운다(모두 끝나면 표만 남긴다).
프롬프트 원본은 `tools/art/prompts/cards/<깃발>.md` · `tools/sfx/prompts/cards/<깃발>.md` 이다. 카드를 또 바꾸면 `node tools/art/build_prompts.js` · `node tools/sfx/build_sfx_prompts.js` 로 다시 뽑고 여기에 옮긴다.

## 그리는 차례 (2026-11-17 · Gemini 할당량 아끼기)

1. **그림 없는 카드부터 먼저** — 아래 표의 카드, 새 스페셜 아이템 6장, 그 밖에 아직 그림이 없는 카드 688장.
2. **이미 그린 스페셜 다시 그리기는 맨 나중** — 할당량이 남을 때만. 지금 그림이 있어 게임은 그대로 돌아간다.
   - 꼭: SP-A1 그림자 없는 아즈라 · SP-B1 불을 삼킨 자 · SP-B2 철의 심장을 삼킨 자 · SP-G1 잿갈기 카르노 (v3.59에 "평범한 그 종족이 아닌 거대한 존재"로 지시가 바뀜)
   - 선택(그 뒤): SP-A2 솔란테의 첫 기사 · SP-A3 별을 푼 이사크 · SP-B3 일곱 번째 · SP-G2 은월 리시엘 · SP-G3 바다를 잠재우는 자 (v3.59 서사 손질로 그림 지시 · 서사가 바뀜. SP-G3은 이름도 "물이 된 무녀"에서 바뀜. 지금 그림도 쓸 만함)
   - 다시 안 그려도 됨: 스페셜 아이템 SR-A1 · SR-A2 · SR-A3, 그 밖에 그린 6장(A1-02 · EP-A1-1 · EP-A1-2 · PI-A1 · PN-A1-E · US-A1-1) — 프롬프트에서 깃발 · 진영 이름 같은 말만 바뀜.
3. 이 차례는 `node tools/art/build_prompts.js`가 장부 `tools/art/art_map.csv`의 상태 "다시"를 읽어 정한다. 프롬프트 파일(`prompts/cards/<깃발>.md` · `prompts/grades/<등급>.md`)은 **1 그림 없는 카드 → 2 맨 나중에 다시 그리기 → 3 그림 있음(그리지 않음)** 묶음으로 나뉘고, `cards.jsonl`도 같은 차례이며 줄마다 `"art": "new" | "redo" | "have"`가 붙는다. "다시" 가운데 장부 메모가 "꼭"으로 시작하면 먼저, "선택"이면 그 뒤. 다시 그린 그림을 `artmap.py import`로 넣으면 상태가 "들어감"으로 돌아가 이 묶음에서 빠진다.

## 목록

## v3.81 스페셜 아이템 9장 — 그림 6장 (장착 소리 6장 · 능력 소리 9가지는 2026-11-16 생성 완료)

새 스페셜 6장은 그림이 아직 없다(2026-11-16 장착 소리 6장 및 새 능력 9가지 전용 소리 `huntfire`·`riposte`·`overload`·`devour`·`drain`·`flow`·`judge`·`sentry`·`mark`는 생성하여 `audio/sfx/` 및 `js/game.js` `FLOAT_SFX`에 반영 완료). 프롬프트는 `tools/art/prompts/cards/<깃발>.md`에 있고, 그림 지시는 `tools/art/art_notes.json`이다. 신탁 성회 셋(하르간의 양손검 · 세렌의 활 · 이벨의 깃펜)은 능력만 바뀌고 물건은 그대로라, 그림 · 소리 모두 있는 것을 쓴다.
- **그림 새로**:
  - SR-B1 도르마크의 갈비뼈 화로
  - SR-B2 소르그림의 첫 갑주
  - SR-B3 케라운의 벼락 심장
  - SR-G1 고르바스의 부러진 송곳니
  - SR-G2 베르단의 첫 뿔
  - SR-G3 마렌시아의 눈물 성배

## 효과 · 이름이 바뀐 카드

소리는 2026-11-16에 지금 프롬프트로 모두 코드 합성해 다시 넣었다(아래 "소리" 참고) — 표의 "소리" 칸은 모두 넣음.
그림은 아직 거의 그리지 않았다 — `tools/art/prompts/cards.jsonl` 706장 가운데 그린 것은 18장(스페셜 · 일부 마족)이고, 나머지는 처음 그릴 때 지금 프롬프트를 쓰면 된다.
아래 표는 **카드 효과 · 이름이 바뀌어 예전 프롬프트로 그리면 틀리는 카드**다. 그릴 때 꼭 `node tools/art/build_prompts.js`로 다시 뽑은 프롬프트(`tools/art/prompts/cards/<깃발>.md`)를 쓴다.

| 카드 | 바뀐 것 | 그림 | 소리 |
|---|---|---|---|
| SG1-02 숨통 끊기 | v3.67 예전 바위 가죽 → 상대 전체 체력 −1 | 새로 (아직 없음) · 프롬프트 아래 | 넣음 (2026-11-15) |
| SG1-08 송곳니 반격 | v3.67 예전 산사태 → 아군 전체 체력 +2, [치명] | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| MG-13 뼈 부수기 | v3.67 예전 대지의 분노 → 방어 0인 적 1기 방어 ↔ 체력 | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| M2-1 오크의 문신 | v3.67 방어 +1 체력 +2 → 공격 +1 체력 +1 [관통] | 새로 (아직 없음) · 프롬프트 아래 | 넣음 |
| MC-03 뒤바뀐 물길 | v3.68 예전 마력 역류 → 상대 줄을 다시 세움 · 생명 +1 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| SG3-01 환각의 통제 | v3.68 예전 물보라 → 이름 글자 수가 같은 상대 카드를 빼앗음 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| SG3-02 물빛 신기루 | v3.68 예전 급류 → 무작위 2기 공격 ↔ 체력 | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 |
| CS-G3 씻김의 노래 | v3.68 맨 앞 1기 → 상대 전체 보호 끄기 · 공격 −1 | 새로 (아직 없음) · `G3.md` | 넣음 |
| SB1-03 불의 장막 | v3.73 예전 참호 사격 → 아군 2기 체력 +1 [화염 갑주 2] | 새로 (아직 없음) · `B1.md` | 넣음 |
| SB1-05 기폭 | v3.73 예전 집중포화 → 화상 2 · 화상 모두 터뜨림 | 새로 (아직 없음) · `B1.md` (그림 지시 art_notes) | 넣음 |
| MB-04 도화선 | v3.73 체력 −2 → 체력 −1 · 화상 3 | 새로 (아직 없음) · `B1.md` | 넣음 |
| NG2-3 트롤의 재생 | v3.74 [불굴] → [재생 1] | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 |
| SG2-01 덩굴 조이기 | v3.75 예전 덩굴 채찍 → 방어가 가장 높은 적 1기에 피해 방어 ×2 | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| NG2-1 뿌리 파고들기 | v3.75 예전 화살비 → 방어 있는 적 전체에 피해 방어 +1 | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| MC-14 갑옷째 휘감기 | v3.75 예전 덩굴 휘감기 → 적 전체 방어만큼 피해 · 방어 0 | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| SG2-05 수액 몰아주기 | v3.76 예전 재생의 수액 → 다른 아군 체력을 1만 남기고 체력 최고 1기에게 몰아줌 (콤보) | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| SG2-08 고목 내려찍기 | v3.76 예전 숲의 진격 → v3.83 상대마다 체력 −(체력 최고 아군의 남은 체력 ÷ 2), 그 아군은 그만큼 잃음 (내려찍는 모습 · 소리 그대로) | 새로 (아직 없음) · `G2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| SA2-03 침묵의 기도 | v3.77 예전 수호 서약 → 상대 맨 앞 2기 능력 끄기([정화] 있으면 전체) | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| NA2-1 구원의 빛 | v3.77 예전 천벌의 창 → 레벨 낮은 능력 유닛 1기를 새벽성 견습 방패(0/2/4)로 | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| SA2-07 심판의 저울 | v3.77 예전 빛의 사슬 → 같은 능력 상대 2기 이상의 공격 = 레벨 | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| RS-A2-2 응보의 빛 | v3.77 예전 수호 날개 → 아군 전체 [가호 1] · 막은 피해를 전투 끝에 되돌림 | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| IA2-1 압수한 흑요검 | v3.77 예전 기사 장검 → 마족에게서 거둔 흑요 칼 [출혈 1] | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-16) |
| SG1-03 궁지의 송곳니 | v3.83 예전 광폭화 → 맞선 상대보다 체력이 낮은 아군 공격 +3 | 새로 (아직 없음) · `G1.md` | 넣음 (2026-11-16, 직접 합성) |
| MG-04 원한의 일격 | v3.83 예전 격노의 포효 → 무한한 격노 → v3.87 뒤 1칸 아군 공격 +(내 소각장의 유닛 수), 2레벨 | 새로 (아직 없음) · `G1.md` (그림 지시 art_notes) | 넣음 (2026-11-17, 직접 합성) |
| RS-G1-2 피의 맹세 | v3.87 예전 궁지의 포효 → 아군 피의 결속 · 쓰러지면 피가 뒤로 · 살아남으면 다음 턴 공격 + | 새로 (아직 없음) · `G1.md` (그림 지시 art_notes) | 넣음 (2026-11-17, 직접 합성) |
| PS-G1-1 승전의 함성 | v3.83 예전 곰의 힘 → 전투가 끝날 때 살아남은 아군 수만큼 상대 생명 − | 새로 (아직 없음) · `G1.md` | 넣음 (2026-11-16, 직접 합성) |
| SG1-09 몸통 박치기 | v3.83 예전 용의 포효 → 상대 전체 체력 −(아군 수 × 2), 아군마다 체력 −(아군 수) | 새로 (아직 없음) · `G1.md` | 넣음 (2026-11-16, 직접 합성) |
| SG1-01 사냥감 몰이 | v3.83 예전 으르렁 위협 → 상대를 방어 + 체력이 낮은 순으로 맨 앞부터 | 새로 (아직 없음) · `G1.md` | 넣음 (2026-11-16, 직접 합성) |
| MG-14 숲의 무게 | v3.83 예전 베르단의 가호 → 아군 남은 체력 합만큼 상대 맨 앞부터 공격 → 방어 → 체력 순으로 깎음 | 새로 (아직 없음) · `G2.md` | 넣음 (2026-11-16, 직접 합성) |
| SA2-02 인내의 기도 | v3.86 예전 성광 방패 → 아군 맨 앞 2기 [가호 1] · 새벽빛 모으기 (v3.90 [정화] 유닛도 셈) | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-17) |
| MA-14 새벽의 해방 | v3.86 예전 솔란테의 심판 → 새벽빛 + 생명 차를 풀어 공격 높은 상대부터 체력 − | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-17) |
| MA-10 순교의 서약 | v3.86 예전 성광 방진 → 아군이 쓰러질 때마다 양옆 아군 [보호막] | 새로 (아직 없음) · `A2.md` (그림 지시 art_notes) | 넣음 (2026-11-17) |
| RB1-1 화약통 깔기 | v3.88 예전 최후의 포격 → 이 자리 · 아군 빈 칸마다 불붙은 화약통, 다음 턴 맞은편에 [화상 3] | 새로 (아직 없음) · `B1.md` (그림 지시 art_notes) | 넣음 (2026-11-17, 직접 합성) |
| SB1-08 화약고 폭파 | v3.88 예전 상대 전체 피해 2 → 아군 화약통 N개를 터뜨려 상대 앞 N기 체력 −N² · [화상 2], 아군 전체 −N | 새로 (아직 없음) · `B1.md` (그림 지시 art_notes) | 넣음 (2026-11-17, 직접 합성) |
| MG-11 뒤집힌 물거울 | 예전 해일(뒤 2칸 피해 2) → 상대 맨 앞 2기 공격 ↔ 방어 · [홀림] | 새로 (아직 없음) · `G3.md` (그림 지시 art_notes) | 넣음 (2026-11-17, 직접 합성) |
| MA-01 공포의 칼날 | v3.95 예전 피의 칼날 → 상대 맨 앞 2기 [공포 3] | 새로 (아직 없음) · `A1.md` (그림 지시 art_notes) | 넣음 (2026-11-18, 직접 합성) |
| PS-A1-2 역병의 족쇄 | v3.95 예전 족쇄 → 공격 최강 1기 공격 −2 · [역병 2] | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| MA-09 지옥불 | v3.95 예전 계약의 대가 → 방어 최강 1기 방어 D → −D · 체력 −D | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| CS-A1 침묵의 빙의 | v3.95 예전 피의 침묵 → [무효] · 체력 최강 1기 체력 → 최저 레벨 유닛 체력 | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| RS-A1-3 정신 지배 | v3.95 예전 피의 저주 → 저주 든 / L3 이하 공격 최강 1기를 이번 턴 내 편으로 (L3 → L2) | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| HA1-2 손끝 저주 | v3.95 체력 −2 → 상대 핸드 첫 유닛 [공포 3] | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| HA1-3 저주 전염 | v3.95 유닛 전체 공격 −1 → 상대 핸드 앞 2장 [역병 2] | 새로 (아직 없음) · `A1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| US-A3-1 그믐의 계약서 | v3.95 엘프 별의 문자 → 마족(A1)으로 옮기고 이름 바꿈(효과 그대로) | 새로 (아직 없음) · `A1.md` (art_notes, 마족 그림으로 새로) | 넣음 (2026-11-18, 직접 합성) |
| RS-A2-1 빛의 심판 | v3.95 예전 새벽 돌격 → 아군 맨 앞 2기 방어를 바쳐 그 합만큼 상대 체력 − | 새로 (아직 없음) · `A2.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| PS-A2-1 대신 속죄 | v3.95 예전 맹세의 빛 → 맨 앞이 받는 피해를 뒤 아군이 대신 · [가호 1] (고급 → 레어) | 새로 (아직 없음) · `A2.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| SA3-02 혼란의 바람 | v3.95 예전 바람 장벽 → 상대 맨 앞 1기 방어 ↔ 체력 | 새로 (아직 없음) · `A3.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| SA3-05 되쏘는 바람 | v3.95 예전 회오리 방벽 → 아군 맨 앞 2기 방 +2 · 체 +2 · [방어무시] | 새로 (아직 없음) · `A3.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| MB-05 불씨 뿌리기 | v3.95 예전 작렬탄 → 상대 맨 앞 2기 [화상 2] | 새로 (아직 없음) · `B1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| NB1-3 불바람 | v3.95 예전 박격 포격 → 상대 전체 [화상 1] · 맨 앞 [화상 3] (일반 → 레어) | 새로 (아직 없음) · `B1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| PS-B3-1 증폭 회로 | v3.95 예전 역회로 → 아군 맨 앞 2기 [증폭 1] (일반 → 레어) | 새로 (아직 없음) · `B3.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| SG2-02 새순 갑옷 | v3.95 예전 나무껍질 갑옷 → 방어 +1 · [재생 2] | 새로 (아직 없음) · `G2.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| SG3-03 물의 장막 | v3.95 [보호막] · 공격 −2 → 맨 앞 2기 받는 피해 −1 · 맨 앞 [정화] | 새로 (아직 없음) · `G3.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| MC-01 웅크린 늑대 | v3.95 예전 각성(무도 아군 공 +1 · 체 +2) → 아군 공격 1로 고정 · 줄어든 합만큼 상대 전체 공격 − (일반 → 고급, 방어 L2) | 새로 (아직 없음) · `G1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |
| SG1-03 궁지의 송곳니 | v3.95 맞선 상대보다 체력 낮은 아군 공 +3 → 아군 공격의 합으로 상대 맨 앞부터 공 → 방 → 체 깎기 (L2 → L3) | 새로 (아직 없음) · `G1.md` (art_notes) | 넣음 (2026-11-18, 직접 합성) |

**v3.95 공용 상태 소리 새 키**: `fear`([공포]) · `plague`([역병]) — 2026-11-18 합성해 넣고 `js/game.js` `FLOAT_SFX`에 배선함. 등급 · 레벨만 바뀐 RS-G1-1 · RS-G1-3 · RS-B2-1 · MG-13도 소리를 다시 합성해 넣음(그림 프롬프트는 이미 들어감, 그린 그림 없음). SG1-01 사냥감 몰이는 효과만 바뀌어 그림 · 소리 프롬프트 그대로.

**2026-11-17 소리만 다시 만든 카드**(그림 프롬프트는 이미 맞음 · 그린 그림 없음): v3.79에 종류가 바뀐 강화 유닛 26장(UP-A1-09 · A1-18 · A2-11 · A2-17 · A2-22 · A2-24 · A3-10 · A3-11 · A3-18 · A3-23 · A3-24 · B1-12 · B1-17 · B1-18 · B2-17 · B2-18 · B2-22 · B2-24 · B3-12 · B3-23 · G1-24 · G2-22 · G3-11 · G3-12 · G3-17 · G3-24)의 공격 · 방어 소리 지시가 옛 몸(약탈대장 · 공병장 · 성벽대장 …) 그대로였다 → 원래 카드의 새 종류에 맞춰 고치고 합성해 넣음. 트롤 마법 셋(RS-G2-3 끈질긴 이끼 — 상대 포자 피해가 빠짐 · RG2-1 숲의 정적 — 가시가 아니라 피해 3 · US-G2-1 재생의 숲 — 아군 1기)도 소리 지시를 효과에 맞춰 다시 넣음.

유닛 · 아이템은 능력이 바뀌어도 그림 프롬프트에 능력이 들어가지 않아(이름 · 등급 · 깃발 · 설명으로 그림) 따로 적지 않는다. 등급이 바뀐 카드(예: 노움 B3-04 · B3-10 · B3-20 · B3-25 · B3-32 · B3-33 이 일반으로)는 다시 뽑은 프롬프트에 이미 들어 있다.
이미 그린 18장 가운데 능력이 바뀐 스페셜(SP-B3 · SP-G2 · SP-G3)은 능력 때문에 다시 그릴 필요는 없다(다만 v3.59 서사 손질로 그림 지시가 바뀌어 2026-11-17부터 "선택 · 맨 나중" 다시 그리기에 들어감 — 위 "그리는 차례"). **장부(`tools/art/art_map.csv`) 상태가 "다시"인 스페셜 가운데 아래 4장은 꼭 다시 그린다 — 단 그림 없는 카드를 다 그린 뒤 맨 나중에** — v3.59에 "평범한 그 종족이 아닌 거대한 존재"로 그림 지시가 바뀌었는데 지금 그림은 그 전 것이다: SP-A1 그림자 없는 아즈라 · SP-B1 불을 삼킨 자 · SP-B2 철의 심장을 삼킨 자 · SP-G1 잿갈기 카르노(프롬프트 `tools/art/prompts/grades/special.md`, 그림 지시 `art_notes.json`).

## 받은 파일 넣는 곳

- 그림: `tools/art/inbox/<카드 ID>.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/<카드 ID>.jpg` 600×750)
- 소리: 코드로 직접 합성한다(`tools/sfx/synth/`, AGENTS.md "소리 프롬프트"). `tools/sfx/notes/<깃발>.json` 지시를 고치고 `node tools/sfx/build_sfx_prompts.js` → `~/develop/sfx-synth/.venv/bin/python tools/sfx/synth/render.py <폴더> <키들>` → `audio/sfx/<키>.ogg · .mp3` 로 바꿔 넣는다(새 키면 `audio/sfx/index.json · index.js`, `index.html` 의 `index.js?v=`).

---

# 그림 프롬프트

### SG1-02 · 숨통 끊기
고르바스의 발톱 · 방어 마법 · 레벨 1 · 일반 — 받은 그림은 `tools/art/inbox/SG1-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "숨통 끊기". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive earth attack striking the enemy ranks. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Finishing the staggering: on a rocky battlefield at dusk, several enemy soldiers (dark silhouettes) are already reeling and bloodied, barely standing after orc bites. A grim scarred orc walks down their line and drops each one with a short heavy chop of a stone-weighted fist; a thin ochre earth-glow pulses through the ground under all the wounded foes at once, as one last tremor finishes them. Mood: cold, decisive, no barrier or shield.
Scale (level 1 of 8): a small, local effect.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 오크는 비틀거리는 적에게 등을 보이지 않는다. 송곳니에 물려 버티던 자부터 차례로 숨통을 끊는다.
Game effect (Korean, mood only — never draw text or numbers): 상대 유닛 전체 체력 −1.
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### SG1-08 · 송곳니 반격
고르바스의 발톱 · 방어 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/SG1-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 반격". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering earth aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Fang counterattack: a small band of cornered Rockfist orcs, backs to a cliff wall, bracing together; their grey-green skin swells and toughens with a warm ochre earth-glow (gaining toughness), tusks bared in a snarl. The nearest orc bites back into the arm of an attacker who has just struck him — the attacker (dark silhouette) recoils, still alive but drained to a thread. Feeling: wounded but defiant, the pack bites back.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 궁지에 몰린 오크는 물러서지 않고 문다. 덤벼든 자는 살아 돌아가도 숨이 한 가닥만 남는다.
Game effect (Korean, mood only — never draw text or numbers): 아군 유닛 전체 체력 +2, [치명].
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### MG-13 · 뼈 부수기
고르바스의 발톱 · 공격 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/MG-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뼈 부수기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of earth power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Bone breaker: an enemy warrior whose armour has already been torn and peeled away (broken plates and straps hanging off, bare chest and shoulders exposed, dark silhouette) is struck by a massive orc fist encased in rough stone; at the point of impact a sharp crack of ochre earth-light spreads like fractures through the body. Close, diagonal, brutal composition; the orc mostly out of frame, only the fist and forearm.
Scale (level 3 of 8): an effect over a few targets.
Banner — Gorvath's Claw: magic of gorvath's claw, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 갑옷이 벗겨진 자에게 남은 것은 뼈뿐이다. 고르바스의 주먹은 그 뼈를 바위처럼 부순다.
Game effect (Korean, mood only — never draw text or numbers): 방어가 0인 상대 유닛 가운데 공격이 가장 높은 1기의 방어와 체력을 맞바꾼다(체력 0이 되어 쓰러진다).
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```

### M2-1 · 오크의 문신
고르바스의 발톱 · 아이템 · 레벨 2 · 일반 — 받은 그림은 `tools/art/inbox/M2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/M2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "오크의 문신". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Gorvath's Claw (engraving; if unsure, a carved stone or engraved plate). a used, practical object rendered with loving detail (wear, scratches, stitching), resting on dark stone or cloth, warm low light.
Art direction: An orc's tattooed fist: a huge grey-green orc fist, knuckles freshly tattooed with dark fang-shaped marks in ochre and black pigment, beside a bone tattoo needle and a small stone pigment bowl on dark leather; the tattoo glows faintly like it could tear through armour. Show the fist and tools, not a carved plate.
Scale (level 2 of 8): a simple object.
Banner — Gorvath's Claw: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Dragonvein Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
Lore (Korean, use for the scene): 바위송곳니 오크가 첫 사냥을 마치고 주먹에 새기는 송곳니 문신. 이 주먹은 갑옷부터 찢는다.
Camera: eye-level or slightly low medium shot, natural expressive pose with a clear action, subject about 55% of the frame.
Lighting: a warm, atmospheric element-coloured backlight with a clean rim light and a soft key light on the face, clear readable contrast; main light is earth (#b88a5a) from behind the subject, dusty ochre light and rock dust hanging in the air.
Background: very dark night-blue (#07080d) base; an intimate, painted corner of the banner's world (tall dry grass and a hide tent) with real atmosphere and soft depth, kept darker and softer than the subject; no distant landmarks; flying rock dust, cracked ground, ochre light.
Detail: fully rendered, believable gear with wear, stitching, dents and soot — practical rather than ornate; expressive face and hands.
Spectacle: none beyond the element glow — no magical ornaments, no aura, no floating particles. Each grade is one clear step more spectacular than the grade below (common → superior → rare → epic → unique → special); never more spectacular than the grade above.
Mood: lively, honest, frontline.
Stay true to the banner: no high-tech machinery, no elegant plate armour, no magic circles (shamans use drums, bones and earth).
Composition: one main subject centred within the middle 70%; keep the top 15% (card name) and bottom 20% (numbers) calm and dark; edges may be cropped; portrait 4:5.
No text, no letters, no readable runes, no numbers, no signature, no watermark, no card frame, no border, no UI.
Avoid: bright or white background, thick cartoon outlines, photorealism, 3D render look, cute chibi style, anime fan-service, gore, likeness of real people or of characters from other games or films.
```


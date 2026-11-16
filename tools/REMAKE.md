# 다시 만들 그림 · 소리 (REMAKE)

카드 효과 · 이름이 바뀌어서 **그림이나 소리를 새로 만들어야 하는 카드** 목록이다.
다른 세션은 이 파일을 열어 아래 항목을 만들고, 만들어 넣은 항목은 지운다(모두 끝나면 표만 남긴다).
프롬프트 원본은 `tools/art/prompts/cards/<깃발>.md` · `tools/sfx/prompts/cards/<깃발>.md` 이다. 카드를 또 바꾸면 `node tools/art/build_prompts.js` · `node tools/sfx/build_sfx_prompts.js` 로 다시 뽑고 여기에 옮긴다.

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

## v3.79 유닛 종류 다양화 — 소리 254장 · 그림은 새로 그릴 것 없음

깃발이 한 종족이 아니게 되면서(`docs/UNIT_RENAME.md`, `js/kinds.js`) 유닛 263장의 이름과 몸(고블린 포병 → 화서 무리 · 이프리트 …)이 바뀌었다.
- **그림**: 이미 그린 유닛 13장(스페셜 9 · 마족 4)은 종류가 그대로라 새로 그릴 것이 없다. 아직 안 그린 카드는 다시 뽑은 프롬프트(`tools/art/prompts/cards/<깃발>.md` — 종류마다 "Creature kind" 줄)로 그린다.
- **소리**: 아래 카드는 공격 · 방어 소리 지시(`tools/sfx/notes/<깃발>.json`)가 새 몸으로 바뀌었다 — 지금 `audio/sfx/<ID>.atk/.def`는 옛 몸(화승총 · 갑옷 …) 소리다. 프롬프트는 `tools/sfx/prompts/cards/<깃발>.md`. 만들어 넣으면 이 줄에서 지운다.
- **B1** (30): B1-03 타들어 가는 도화선 · B1-05 불꽃 임프 · B1-08 연막 정령 · B1-10 포르탄 불개 · B1-12 화서 무리 · B1-13 잿불 박쥐 떼 · B1-14 녹철 불원숭이 · B1-17 포대 거북 · B1-18 화약고 불개미 · B1-21 불엄니 멧돼지 · B1-22 불 뿜는 키메라 · B1-25 공성 두꺼비 · B1-26 화관의 불거인 · B1-27 폭렬 이프리트 · B1-30 용암 땅굴웜 · B1-31 화관의 불뱀 · B1-32 탈라쿠스의 역청 괴물 · B1-33 도르마크의 분화구 · B1-34 화관 베히모스 · B1-41 잿껍질 달팽이 · B1-42 끓는 용암 슬라임 · B1-43 포르탄 가마 정령 · EP-B1-2 화관의 불사조 · EP-B1-3 용을 노린 거포 · PN-B1-C1 새끼 살라만더 · PN-B1-C3 포격 폭탄벌레 · PN-B1-U1 용광로 화로령 · PN-B1-U2 도르마크의 불거미 · PN-B1-R 포연 속의 불매 · PN-B1-E 뛰는 심장불 조각
- **B2** (23): B2-02 톱니 태엽쥐 · B2-06 강철 문지기 갑옷 · B2-07 걸어 다니는 리벳 방패 · B2-16 장갑 태엽거미 · B2-17 무쇠뿔 산양 · B2-18 증기 콧김 황소 · B2-19 걸어 다니는 모루 · B2-22 쇠 먹는 불가사리 · B2-24 철골 가고일 · B2-26 소르그림의 철갑 코뿔소 · B2-28 흐르는 수은 · B2-30 철골 산맥 와이번 · B2-32 걷는 무쇠 성채 · B2-33 오르둔의 뼈 기사 · B2-34 거대 증기 거상 · B2-36 청동 수호 거인 · B2-41 폭주 태엽 인형 · EP-B2-1 가시철 고슴도치 · PN-B2-C1 리벳 집게 게 · PN-B2-C2 증기 굴착 두더지 · PN-B2-C3 철골 망치 거상 · PN-B2-U2 광맥 갑충 · PN-B2-R 소르그림의 방패령
- **B3** (24): B3-03 번개 반딧불 떼 · B3-04 정전기 요정 · B3-06 새끼 뇌조 · B3-09 전류 날다람쥐 · B3-10 피뢰침 까마귀 · B3-12 방전 요정 · B3-13 볼타리움 호문쿨루스 · B3-14 벼락 장어 · B3-15 사슬 번개 정령 · B3-16 충전 거미 · B3-20 뇌침 전갈 · B3-23 병 속의 교수 두뇌 · B3-24 섬광 나방 · B3-25 케라운의 번개 정령 · B3-29 케라운의 뇌운 · B3-32 천둥 폭풍 거인 · B3-36 천둥 뇌수 · B3-42 가시촉수 구름해파리 · EP-B3-1 볼타리움 방전 실험체 · EP-B3-2 연쇄 번개뱀 · PN-B3-C1 새끼 뇌수 · PN-B3-C3 절연 갑주 기관 · PN-B3-U1 피뢰탑 자석령 · PN-B3-U2 뇌명 고원의 뇌조
- **G1** (34): G1-03 돌 던지는 개코원숭이 · G1-04 어린 하이에나 · G1-05 초원 하이에나 · G1-07 초원 켄타우로스 · G1-08 돌발톱 가고일 · G1-10 돌엄니 멧돼지 · G1-12 돌팔매 어린 거인 · G1-13 자갈 코카트리스 · G1-14 돌격 미노타우로스 · G1-15 흑요 발톱 바실리스크 · G1-18 오우거 주술사 · G1-21 흑요 켄타우로스 궁수 · G1-23 전쟁북 오우거 · G1-24 하이에나 무리장 · G1-25 고르바스의 아이 · G1-27 어미 동굴곰 · G1-28 초원 들소 떼 · G1-29 그롬의 바위 정령 · G1-32 흑요 거수 도마뱀 · G1-33 순례하는 바위 거인 · G1-34 고르바스의 고르곤 · G1-35 대지 진동 웜 · G1-36 미노타우로스 대족장 · G1-41 방패 든 오우거 · G1-42 떨어진 고르바스의 비늘 · G1-43 장벽 바위 정령 · EP-G1-1 흑요 사이클롭스 투사 · EP-G1-2 털코뿔소 기수 · PN-G1-C3 바윗덩이 거구 · PN-G1-U2 곰가죽 광전사 · PN-G1-E 왕좌봉 맘모스 · TK-G1-1 그림자 하이에나 · TK-G1-2 우두머리 하이에나 · TK-U-WOLF 잿빛 하이에나
- **G2** (27): G2-02 이끼 코다마 · G2-04 어린 드라이어드 · G2-09 숲 사티로스 · G2-11 갓버섯 보초 · G2-13 고목 거미 · G2-15 에일렌 뿔사슴 · G2-20 실바니엘 호랑이 · G2-22 가시숲 맨드레이크 · G2-23 드리엔의 사도 · G2-25 떨어진 베르단의 뿔가지 · G2-26 에일렌의 코다마 · G2-27 베르단의 레쉬 · G2-28 장벽 뿌리 거수 · G2-30 가시등 고슴도치 · G2-31 드리엔의 그린맨 · G2-33 첫 고목의 드라이어드 · G2-34 베르단의 뿔 기사 · G2-36 에일렌의 균사 심장 · UN-G2-7 베르단의 씨앗지기 · EP-G2-1 엉겅퀴 덩굴귀 · EP-G2-2 실바니엘의 활 드라이어드 · EP-G2-3 베르단의 고목 거인 · PN-G2-C2 가시덤불 덩굴귀 · PN-G2-C3 늪가의 히드라 · PN-G2-U1 덩굴손 픽시 · PN-G2-U2 균사 뿌리지기 · PN-G2-E 태고림 이끼뿔 사슴
- **G3** (26): G3-04 진주조개 파수꾼 · G3-06 물결 해마 · G3-07 작살 든 해달 · G3-08 물결의 메아리 · G3-09 셀레네아 나가 수비병 · G3-10 어린 셀키 · G3-11 조수 점술 문어 · G3-12 산호등 거북 · G3-14 조수 상어 전사 · G3-16 해마 근위병 · G3-17 석호 치유 듀공 · G3-18 물기둥 산호 정령 · G3-24 소용돌이 켈피 · G3-27 해구 투구게 · G3-28 석호의 자장가 · G3-33 심해의 크라켄 · G3-34 마렌시아의 왕게 · G3-36 샘물의 만조 · G3-41 물살 돌격 범고래 · G3-42 해일 바다뱀 · EP-G3-1 진주빛 해파리 · EP-G3-2 심해 나가 작살 기사 · PN-G3-C1 살아 있는 물거울 · PN-G3-C3 해구의 노래 고래 · PN-G3-U2 탈라쿠스의 아귀 · PN-G3-E 우르보아 비늘 기사
- **A1** (29): A1-01 계약의 저주 인형 · A1-04 피의 박쥐 떼 · A1-05 녹타르 구울 · A1-06 값으로 떼인 그림자 · A1-07 그림자 도플갱어 · A1-08 계약의 서큐버스 · A1-09 모르크 그림자 거미 · A1-13 녹타르 듀라한 · A1-15 피를 마시는 칼 · A1-17 모르카스의 밴시 · A1-18 그림자 송곳니 · A1-21 피의 라미아 · A1-23 계약 수확 사신 · A1-24 달 없는 늑대인간 · A1-25 장막의 삼두견 · A1-28 찢기지 않는 계약서 · A1-30 모르카스의 칼 · A1-32 저주 군단의 리치 · A1-35 모르크의 나이트메어 · A1-41 사슬에 묶인 망령 · A1-42 흑요 갑주 해골 · A1-43 감긴 눈의 저울 · UN-A1-7 모르카스의 영혼 수확자 · EP-A1-3 장막의 처형자 · PN-A1-C1 어린 흡혈귀 · PN-A1-C2 모르크 협곡 셰이드 · PN-A1-C3 계약에 묶인 시체 거인 · PN-A1-U1 피의 맹세 검사 · PN-A1-U2 모르카스의 세리
- **A2** (29): A2-01 견습생의 기도 촛불 · A2-03 새벽 종다리 떼 · A2-05 문장 독수리 · A2-06 떠도는 후광 · A2-07 맹세의 발키리 · A2-11 어린 유니콘 · A2-13 성광 색유리 기사 · A2-16 새벽 순찰 사자 · A2-17 진실을 묻는 스핑크스 · A2-21 맹세를 지키는 백조 · A2-22 새벽을 울리는 성종 · A2-24 빛을 되비추는 거울 · A2-25 엘라드의 성화 · A2-27 새벽 유니콘 · A2-28 광장의 성자상 · A2-29 새벽성 발키리 대장 · A2-31 네 얼굴의 케루빔 · A2-33 대성당 색유리 수호자 · A2-34 엘라드의 샛별 · A2-41 돌격 페가수스 · A2-42 천벌의 집행자 · A2-43 불꽃 날개 순교자 · EP-A2-1 새벽성 문지기 라마수 · PN-A2-C1 새벽성 작은 성상 · PN-A2-C2 엘라드의 오파님 · PN-A2-C3 황혼 장벽 페가수스 · PN-A2-U1 맹세를 새긴 기사 · PN-A2-U2 솔란테의 성가대 · PN-A2-R 새벽빛 방패 사자
- **A3** (32): A3-02 어린 하피 · A3-04 망루 부엉이 · A3-05 바람 실프 · A3-07 돌풍 임프 · A3-09 바늘탑 조인 활잡이 · A3-10 깃화살 하피 · A3-11 새끼 그리핀 · A3-13 폭풍 히포그리프 · A3-16 갑옷 틈 송골매 · A3-18 쌍둥이자리 궁수 · A3-19 폭풍탑 조인 궁수 · A3-20 벨루미르의 펼친 책 · A3-22 바람 타는 그리핀 · A3-23 벨루미르의 별여우 · A3-24 번개 화살 텐구 · A3-26 폭풍 사냥 히포그리프 · A3-28 별똥별 임프 · A3-29 활 당기는 사수자리 · A3-30 폭풍 송골매 · A3-32 회오리 텐구 · A3-33 별을 겨누는 자 · A3-34 하피 여왕 · A3-35 하늘 찢는 로크 · A3-41 고요의 구름고래 · A3-42 폭풍의 눈동자 · EP-A3-1 바늘탑의 실프 사수 · EP-A3-2 번개구름 고래 · EP-A3-3 하늘 요람의 감시자 · PN-A3-C1 별자리 사냥개 · PN-A3-C3 장궁 그리핀 기사 · PN-A3-U1 별문자 부엉이 · PN-A3-U2 하늘 요람 그리핀


소리는 2026-11-15에 모두 다시 만들어 넣었다(Stable Audio, 아래 "소리" 참고). 그 뒤 바뀐 카드(트롤 v3.75~3.76 · 천족 v3.77)는 표의 "소리" 칸을 본다.
그림은 아직 거의 그리지 않았다 — `tools/art/prompts/cards.jsonl` 708장 가운데 그린 것은 17장(스페셜 · 일부 마족)이고, 나머지 691장은 처음 그릴 때 지금 프롬프트를 쓰면 된다.
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
| SG1-03 궁지의 송곳니 | v3.83 예전 광폭화 → 맞선 상대보다 체력이 낮은 아군 공격 +3 | 새로 (아직 없음) · `G1.md` | **다시** — 지금 `audio/sfx/SG1-03.cast`는 광폭화 소리 · 프롬프트 `tools/sfx/prompts/cards/G1.md` |
| MG-04 무한한 격노 | v3.83 예전 격노의 포효 → 뒤 1칸 아군 [관통] · 수호 · 보호막에 막히지 않음, 공격 뒤 체력 − | 새로 (아직 없음) · `G1.md` | **다시** — 지금 소리는 격노의 포효 · `G1.md` |
| PS-G1-1 승전의 함성 | v3.83 예전 곰의 힘 → 전투가 끝날 때 살아남은 아군 수만큼 상대 생명 − | 새로 (아직 없음) · `G1.md` | **다시** — 지금 소리는 곰의 힘 · `G1.md` |
| SG1-09 몸통 박치기 | v3.83 예전 용의 포효 → 상대 전체 체력 −(아군 수 × 2), 아군마다 체력 −(아군 수) | 새로 (아직 없음) · `G1.md` | **다시** — 지금 소리는 용의 포효 · `G1.md` |
| SG1-01 사냥감 몰이 | v3.83 예전 으르렁 위협 → 상대를 방어 + 체력이 낮은 순으로 맨 앞부터 | 새로 (아직 없음) · `G1.md` | **다시** — 지금 소리는 으르렁 위협 · `G1.md` |
| MG-14 숲의 무게 | v3.83 예전 베르단의 가호 → 아군 남은 체력 합만큼 상대 맨 앞부터 공격 → 방어 → 체력 순으로 깎음 | 새로 (아직 없음) · `G2.md` | **다시** — 지금 소리는 베르단의 가호 · `tools/sfx/prompts/cards/G2.md` |

유닛 · 아이템은 능력이 바뀌어도 그림 프롬프트에 능력이 들어가지 않아(이름 · 등급 · 깃발 · 설명으로 그림) 따로 적지 않는다. 등급이 바뀐 카드(예: 노움 B3-04 · B3-10 · B3-20 · B3-25 · B3-32 · B3-33 이 일반으로)는 다시 뽑은 프롬프트에 이미 들어 있다.
이미 그린 17장 가운데 능력이 바뀐 스페셜(SP-B1 · SP-B2 · SP-B3 · SP-G2 · SP-G3)은 그림 지시가 능력과 상관없는 모습이라 다시 그리지 않아도 된다.

## 받은 파일 넣는 곳

- 그림: `tools/art/inbox/<카드 ID>.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/<카드 ID>.jpg` 600×750)
- 소리: 이 맥의 Stable Audio(`~/develop/stable-audio/gen.py`, AGENTS.md "소리 프롬프트")로 만든다. `tools/sfx/notes/<깃발>.json` 지시를 고치고 `node tools/sfx/build_sfx_prompts.js` → `SAO_KEYS=<키들> SAO_OUT=<폴더> .venv/bin/python gen.py 0 100 fp16 all --redo` → `audio/sfx/<키>.ogg · .mp3` 로 바꿔 넣는다(새 키면 `audio/sfx/index.json · index.js`, `index.html` 의 `index.js?v=`).

---

# 그림 프롬프트

### SG1-02 · 숨통 끊기
바위주먹 오크 · 방어 마법 · 레벨 1 · 일반 — 받은 그림은 `tools/art/inbox/SG1-02.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-02.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "숨통 끊기". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: a destructive earth attack striking the enemy ranks. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Finishing the staggering: on a rocky battlefield at dusk, several enemy soldiers (dark silhouettes) are already reeling and bloodied, barely standing after orc bites. A grim scarred orc walks down their line and drops each one with a short heavy chop of a stone-weighted fist; a thin ochre earth-glow pulses through the ground under all the wounded foes at once, as one last tremor finishes them. Mood: cold, decisive, no barrier or shield.
Scale (level 1 of 8): a small, local effect.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
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
바위주먹 오크 · 방어 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/SG1-08.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/SG1-08.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "송곳니 반격". Depict exactly what this name describes.
Subject: defense spell — protection forming: stable, symmetrical composition, a barrier, ward or wings around allies, incoming harm deflected. The moment it takes effect: an empowering earth aura rising around allied warriors; allies rallying as one under a shared surge of power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Fang counterattack: a small band of cornered Rockfist orcs, backs to a cliff wall, bracing together; their grey-green skin swells and toughens with a warm ochre earth-glow (gaining toughness), tusks bared in a snarl. The nearest orc bites back into the arm of an attacker who has just struck him — the attacker (dark silhouette) recoils, still alive but drained to a thread. Feeling: wounded but defiant, the pack bites back.
Scale (level 3 of 8): an effect over a few targets.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
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
바위주먹 오크 · 공격 마법 · 레벨 3 · 일반 — 받은 그림은 `tools/art/inbox/MG-13.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/MG-13.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "뼈 부수기". Depict exactly what this name describes.
Subject: attack spell — the instant of impact: aggressive diagonal composition, the force travels toward the enemy (shown as dark silhouettes); the caster, if shown, is small. The moment it takes effect: a burst of earth power. Scale and finish: a single clean, beautifully rendered effect on one or two targets, small in scale but vivid, with layered light and particles.
Art direction: Bone breaker: an enemy warrior whose armour has already been torn and peeled away (broken plates and straps hanging off, bare chest and shoulders exposed, dark silhouette) is struck by a massive orc fist encased in rough stone; at the point of impact a sharp crack of ochre earth-light spreads like fractures through the body. Close, diagonal, brutal composition; the orc mostly out of frame, only the fist and forearm.
Scale (level 3 of 8): an effect over a few targets.
Banner — Rockfist Orcs: magic of rockfist orcs, signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds; palette: earth ochre #b88a5a, rust-red war paint, bone white.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
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
바위주먹 오크 · 아이템 · 레벨 2 · 일반 — 받은 그림은 `tools/art/inbox/M2-1.jpg` → `python3 tools/art/artmap.py import` (게임 사본 `img/cards/M2-1.jpg` 600×750)

```
Dark fantasy trading card illustration for the card game ETHERION, painterly digital painting, rich brushwork, dramatic lighting, theme: night sky and golden runes.
Grade: COMMON — grounded, honest, everyday. An ordinary member of the banner caught in a vivid moment of their work — characterful, believable and beautifully painted; smaller in scale than higher grades, never less finished.
Quality floor for every grade: a finished, professional card illustration — carefully rendered face, hands, materials and lighting, a character with personality caught in a clear action or story moment, a real sense of place. Higher grades add scale, spectacle and ornament, never more care.
Card name (Korean — read its meaning, never write it in the image): "오크의 문신". Depict exactly what this name describes.
Subject: the item the card name and lore describe — a single object made or kept by the Rockfist Orcs (engraving; if unsure, a carved stone or engraved plate). a used, practical object rendered with loving detail (wear, scratches, stitching), resting on dark stone or cloth, warm low light.
Art direction: An orc's tattooed fist: a huge grey-green orc fist, knuckles freshly tattooed with dark fang-shaped marks in ochre and black pigment, beside a bone tattoo needle and a small stone pigment bowl on dark leather; the tattoo glows faintly like it could tear through armour. Show the fist and tools, not a carved plate.
Scale (level 2 of 8): a simple object.
Banner — Rockfist Orcs: powerful orc warriors: huge fists, tusks, scarred grey-green skin, war paint, braided hair. Silhouette: massive shoulders and oversized fists; riders on giant wolves or bears. Materials: rough leather, furs, bone ornaments, stone- and obsidian-studded gauntlets, rope, wooden totems. Signature motifs: giant fists, wolves and bears, bone trinkets, totems, war drums, cracked ground, dust clouds.
Faction: Verdant Covenant: ancient forests, moss, grassland, lagoons, songs; power borrowed through pacts with dragons.
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


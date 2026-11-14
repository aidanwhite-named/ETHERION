# ETHERION 배경음 — Gemini용 프롬프트 15곡

> Gemini의 음악 만들기(Lyria)에 그대로 붙여 넣는 프롬프트다. 2026-11-14에 새로 썼다. 처음 다섯 곡(1부)에, 같은 날 성향이 다른 열 곡(2부)을 더했다.
> 예전 지시서 둘(합성 엔진으로 15곡을 짓던 `PROMPT_BGM.md` · `PROMPT_BGM_VARIATION.md`)은 지웠다. git 기록에 남아 있다.
> 효과음 프롬프트는 `tools/sfx/PROMPT_SFX.md`.

---

## 0. 이번 음악의 방향

**1부 (1~5) — 서정적인 랩소디.** 자유롭게 흐르되 격동적이지 않다. 선율이 홀로 한 줄로 흐르다가 둘, 셋, 여러 성부로 점점 불어나고, 다시 줄어들어 한 줄로 돌아온다. 숨을 쉬듯 짜임이 커졌다 작아져서 단조롭지 않다.

중독성은 **귀에 남는 주제 하나**에서 나온다. 흥얼거릴 수 있는 짧은 주제가 한 곡 안에서 세 번 넘게 돌아오고, 돌아올 때마다 화음과 악기가 하나씩 더해진다. 화음은 따뜻하고 잘 쌓여 있어야 하고, 오래 들어도 귀가 편해야 한다.

**2부 (6~15) — 열 가지 성향.** 1부와 갈래 · 악기 · 빠르기 · 리듬이 모두 다르다. 곡마다 성향 하나를 맡는다: 장난기, 듬직한 흥, 재기발랄, 우직한 긍지, 느긋함, 한가로움, 매혹, 숭고, 질주, 그리고 비장에서 희망으로. 6~14번은 아홉 깃발의 성격과 그 도시에서 왔고, 15번은 결전 곡이다.

1부가 루바토로 흐르며 마음을 적신다면, 2부는 박이 또렷해서 몸이 먼저 반응한다. 그래도 바뀌지 않는 것이 있다. 귀에 남는 주제가 세 번 넘게 돌아오고, 짜임이 한 줄에서 여러 성부로 불어났다가 다시 줄어들고, 화음은 그 갈래에서 가장 듣기 좋게 쌓고, 거칠거나 어지럽지 않다.

## 1. 열다섯 곡 한눈에

**1부 — 서정적인 랩소디**

| # | 받을 파일 이름 | 제목 | 쓸 곳 (제안) | 조 · 박자 · 빠르기 | 주인공 악기 | 길이 |
|---|---|---|---|---|---|---|
| 1 | `bgm_main` | **에테르의 첫 노래** — The First Song of Ether | 타이틀 · 입장 | D♭장조 4/4 · 약 70 | 피아노 → 독주 첼로 → 현악 · 호른 | 약 2:50 |
| 2 | `bgm_lantern` | **등불 거리의 왈츠** — Waltz of the Lantern Street | 대기실 · 상점 · 교역소 | G장조 3/4 왈츠 · 약 84 | 클라리넷 · 독주 바이올린 · 하프 | 약 2:40 |
| 3 | `bgm_library` | **별이 잠든 서고** — The Library Where Stars Sleep | 덱 조정실 · 보관소 · 순례 지도 | E장조(리디안 빛깔) 4/4 · 약 64 | 플루트 · 하프 · 피아노 · 독주 비올라 | 약 2:50 |
| 4 | `bgm_field` | **바람이 건너는 들판** — Where the Wind Crosses the Field | 대전 | A단조 → C장조 4/4 · 약 86 | 잉글리시 호른 · 첼로 · 피아노 오스티나토 | 약 3:00 |
| 5 | `bgm_oath` | **옛 맹세의 랩소디** — Rhapsody of an Old Oath | 대전 | G단조 → B♭장조 6/8 · 약 58 | 독주 바이올린 · 피아노 · 호른 | 약 3:00 |

**2부 — 열 가지 성향**

| # | 받을 파일 이름 | 제목 | 성향 · 갈래 | 쓸 곳 (제안) | 조 · 박자 · 빠르기 | 주인공 악기 | 길이 |
|---|---|---|---|---|---|---|---|
| 6 | `bgm_cinder` | **심지가 타들어 가는 동안** — While the Fuse Burns | 장난기 · 스윙 재즈 | 대전 | B단조 4/4 스윙 · 약 120 | 바순 · 클라리넷 · 아코디언 | 약 2:35 |
| 7 | `bgm_anvil` | **망치가 쉬는 저녁** — When the Hammers Rest | 듬직한 흥 · 민속 행진 | 대기실 · 교역소 · 대장간 | D믹솔리디안 4/4 · 약 104 | 허디거디 · 로 휘슬 · 피들 · 호른 | 약 2:45 |
| 8 | `bgm_clockwork` | **볼타리움의 태엽** — The Clockwork of Voltarium | 재기발랄 · 미니멀리즘 | 상점 · 덱 조정실 | F리디안 4/4 · 약 116 | 첼레스타 · 마림바 · 클라리넷 | 약 2:50 |
| 9 | `bgm_stonedrum` | **가르운의 북** — The Drums of Garun | 우직한 긍지 · 북과 관현악의 찬가 | 대전 | D도리안 → F장조 4/4 · 약 92 | 큰 북 · 나무 피리 · 호른 · 낮은 현 | 약 2:45 |
| 10 | `bgm_moss` | **천천히 자라는 숲** — The Slowly Growing Forest | 느긋함 · 숲 민요 | 대기실 · 순례 지도 | A장조 4/4 셔플 · 약 76 | 기타 · 알토 플루트 · 바순 · 칼림바 | 약 2:35 |
| 11 | `bgm_tide` | **셀레네아의 오후** — An Afternoon in Selenea | 한가로움 · 보사노바 | 대기실 · 교역소 | F장조(가운데 A♭) 4/4 · 약 124 | 나일론 기타 · 플루트 · 비브라폰 · 하프 | 약 2:40 |
| 12 | `bgm_abyss` | **계약의 탱고** — Tango of the Pact | 매혹 · 탱고 | 대전 | A단조 4/4 탱고 · 약 112 | 반도네온 · 독주 바이올린 · 피아노 | 약 2:40 |
| 13 | `bgm_halo` | **새벽성의 종** — The Bells of the Dawn Citadel | 숭고 · 성가 카논 | 타이틀 번갈아 · 보관소 | D장조 → E장조 4/4 · 약 62 | 가사 없는 합창 · 파이프 오르간 · 종 | 약 2:50 |
| 14 | `bgm_gale` | **돌풍의 춤** — Dance of the Gale | 질주 · 켈트 지그 | 대전 | E도리안 6/8 · 약 116 | 틴 휘슬 · 피들 · 하프 · 보드란 | 약 2:35 |
| 15 | `bgm_lastcard` | **마지막 한 장** — The Last Card | 비장 → 희망 · 영웅적 관현악 | 대전 (온라인 · 결전) | C단조 → E♭장조 4/4 · 약 120 | 피아노 · 호른 · 스피카토 현악 | 약 2:45 |

- 쓸 곳은 제안이다. 게임의 배경음 장면은 **타이틀 · 대기실 · 대전** 셋이다(상점 · 교역소 · 덱 조정실 · 보관소 · 원정은 대기실과 같은 장면). 배선은 파일을 받은 뒤 `js/bgm.js`에서 한다.
- 열다섯 곡을 나누면 이렇다(제안):
  - 타이틀: 1 (13과 번갈아도 좋다)
  - 대기실 쪽 7곡: 2 · 3 · 7 · 8 · 10 · 11 · 13 — 무작위로 이어 튼다.
  - 대전 7곡: 4 · 5 · 6 · 9 · 12 · 14 · 15 — 무작위로 이어 튼다. 15는 온라인 대전이나 결전에만 아껴 틀어도 좋다.
- 6~14번은 깃발 곡으로도 쓸 수 있다: 6 잿불 고블린 · 7 무쇠수염 드워프 · 8 번개 노움 · 9 바위주먹 오크 · 10 이끼 트롤 · 11 푸른비늘 인어 · 12 심연 마족 · 13 성광 천족 · 14 폭풍 하이엘프. 대전에서 상대 깃발의 곡을 먼저 트는 배선도 된다.
- 1부 다섯 곡은 한 사운드트랙처럼 같은 악기 · 같은 녹음 결로 맞췄다. 2부는 일부러 곡마다 다른 악단을 쓴다.

## 2. 왜 이렇게 썼나

**열다섯 곡 모두에 넣은 것**

- **짜임이 숨 쉰다.** 곡마다 시간표(`[00:00]` …)로 적었다: 홀로 한 줄 → 두 성부(대선율) → 화음이 차오름 → 정점 → 다시 줄어듦 → 홀로 한 줄로 끝. Lyria는 이런 시간표를 잘 따른다. 2부는 갈래에 맞는 길로 불어난다: 민속 악단이 한 명씩 합류하고(7 · 14), 오르골 무늬가 한 겹씩 쌓이고(8), 같은 주제를 성부마다 차례로 이어 부른다(13).
- **주제가 돌아온다.** "한 번 들으면 흥얼거릴 수 있는 짧은 주제, 적어도 세 번, 돌아올 때마다 더 풍성하게"를 곡마다 적었다.
- **끝.** 긴 화음이나 또렷한 마침으로 끝난다. 게임은 끝나기 4초 전부터 다음 곡과 겹쳐 트니, 페이드아웃은 필요 없다.
- Lyria는 빠르기 · 악기 · 짜임 지시는 잘 따르지만 **조성(키)은 틀릴 때가 있다.** 조가 달라도 곡이 좋으면 그대로 쓴다.

**1부 — 서정적인 랩소디에만**

- **화성.** 늦은 낭만파 · 영화 음악 결: 걸림음(sus)이 풀리는 화음, 장7 · 부가9 화음의 빛깔, 단조에서 빌려 온 iv 화음의 아련함, 정점 앞의 조바꿈, 부드럽게 이어지는 성부.
- **랩소디.** 루바토(템포를 조금씩 늦췄다 당김), 프레이즈 사이에 피아노나 하프가 짧게 자유로이 흐르는 카덴차.
- **격동 금지.** 북 · 타악기 · 금관의 포효 · 갑자기 큰 소리를 모두 막았다. 정점도 "포옹처럼 따뜻하게"로 적었다.
- **악기.** 콘서트 그랜드 피아노, 현악 합주, 독주 첼로 · 바이올린 · 비올라, 플루트 · 클라리넷 · 오보에 · 잉글리시 호른, 부드러운 프렌치 호른, 하프. 신시사이저 · 전자음 · 노래 · 합창은 없다.

**2부 — 열 가지 성향에서 바꾼 것**

- **갈래가 곡마다 다르다.** 스윙 재즈 · 민속 행진 · 미니멀리즘(짧은 무늬를 겹겹이 쌓는 음악) · 북과 관현악의 찬가 · 어쿠스틱 숲 민요 · 보사노바 · 탱고 · 성가 카논(같은 주제를 성부마다 차례로 이어 부르는 돌림노래) · 켈트 지그(빠른 6/8 춤곡) · 영웅적 관현악.
- **박이 또렷하다.** 빠르기는 62~124, 리듬이 곡마다 다르다: 스윙, 발 구르는 행진, 3-3-2 엇박, 큰 짐승이 걷는 듯한 무거운 박, 살짝 끄는 셔플, 보사노바, 탱고, 지그.
- **타악기를 풀었다.** 다만 모두 "따뜻하고 둥글게, 선율 뒤에"로 적었다. 드럼 세트 · 심벌 · 일렉트릭 기타는 막았다. 13번(성가)은 타악기 없이 종만 친다.
- **새 악기.** 아코디언 · 반도네온 · 허디거디 · 틴 휘슬 · 로 휘슬 · 부주키 · 보드란(켈트 북) · 나일론 기타 · 비브라폰 · 칼림바 · 첼레스타 · 마림바 · 하프시코드 · 파이프 오르간 · 가사 없는 합창(13번만) · 아주 옅은 신시사이저(8번만, 노움의 구리 코일).
- **화성은 그 갈래에서 가장 맛있는 것으로.** 재즈의 장7 · 9 · 13화음과 ii–V–I(6 · 11), 민속의 ♭VII 화음과 지속음(7 · 14), 리디안의 반짝이는 올린 4음(8), 탱고의 반음씩 내려가는 베이스 · 감7 · 나폴리 화음(12), 성가의 걸림음과 '아멘' 마침(13), 귀에 착 붙는 IV–V–iii–vi 진행(8 · 10), 단조의 i–♭VI–♭III–♭VII에서 장조로 열리기(15).
- **효과음 금지.** 심지 · 물결 · 바람 · 숲 같은 그림을 적었으니, Lyria가 곡에 진짜 물소리 · 바람 소리 · 폭발 소리를 넣지 않게 곡마다 "no sound effects"를 붙였다.

## 3. Gemini에서 만드는 법

1. Gemini 앱(또는 gemini.google.com)에서 **음악 만들기**를 고른다. 3분 길이가 되는 **Lyria 3 Pro**가 있으면 그것으로 만든다(유료 요금제 · 18세 이상).
2. 아래 곡의 **프롬프트** 상자를 통째로 복사해 붙여 넣는다. 영어 그대로가 가장 잘 먹힌다.
3. 한 곡을 3~4번 만들어 **가장 귀에 남는 것**을 고른다. 같은 프롬프트라도 매번 다른 곡이 나온다.
4. 마음에 거의 들면 이어서 짧게 고쳐 달라고 한다:
   - 더 잔잔하게: `Same piece, but softer and calmer, with a simpler accompaniment.`
   - 주제가 잘 안 들리면: `Make the main theme simpler and repeat it more clearly at each section.`
   - 정점이 너무 세면: `Make the climax warmer and gentler, not dramatic.`
   - 노래 · 합창이 들어가면(13번 말고): `Instrumental only, no vocals or choir at all.`
   - 1부에 북 · 타악기가 들어가면: `Remove all drums and percussion completely.`
   - 2부에서 북 · 타악기가 너무 크면: `Same piece, but make the drums softer, rounder and further behind the melody.`
   - 너무 빠르거나 바쁘면: `Same piece, a little slower and lighter, with fewer notes.`
   - 곡에 물소리 · 바람 소리 같은 효과음이 섞이면: `Music only, no sound effects.`
   - 13번 합창에 가사가 들리면: `Keep the choir wordless: only soft 'ah' and 'oo' vowels, no lyrics.` 그래도 들리면 합창을 뺀다: `Replace the choir with strings and organ. Instrumental.`
   - 8번 신시사이저가 거슬리면: `Replace the synthesizer with celesta and marimba. Acoustic instruments only.`
5. **30초짜리 모델만 될 때**는 곡마다 아래에 있는 "30초판"을 쓴다. 그러면 주제 하나가 홀로 나왔다가 불어나는 짧은 곡이 된다.
6. 받은 파일은 `audio/inbox/bgm/`에 위 표의 이름으로 넣는다(예: `bgm_main.mp3`). 그다음 Claude에게 "배경음 넣어줘"라고 하면 음량 맞춤(약 −16 LUFS) · 반복 이음 · `.ogg`/`.mp3` 변환 · `js/bgm.js` 배선을 한다.

---

## 4. 곡별 프롬프트 — 1부 서정적인 랩소디

### 1. 에테르의 첫 노래 — `bgm_main` (타이틀 · 입장)

**희망 · 그리움** · 신낭만 관현악 랩소디

게임의 얼굴. 텅 빈 홀에서 누군가 흥얼거리듯 피아노 한 줄로 시작해, 첼로가 이어받고, 현악이 한 파트씩 들어와 따뜻한 총주로 부풀었다가 다시 피아노 한 줄로 돌아온다. 정점에서 한 음 올려 조바꿈.

**프롬프트**
```text
Lyrical neo-romantic orchestral rhapsody, the main theme of a fantasy card game. Mood: hopeful, nostalgic, warm and calm, like the first light rising over an ancient land; sweeping but never turbulent. Instruments: concert grand piano, solo cello, string orchestra, flute, clarinet, soft French horns, harp. Key of D-flat major, 4/4, about 70 BPM with gentle rubato. One simple, singable four-bar main theme that a listener can hum after one hearing; it returns at least three times, each time with fuller harmony. Harmony: lush late-romantic voicings, suspended chords that resolve, major-seventh and added-ninth colours, a bittersweet borrowed minor iv chord, smooth voice leading.
[00:00] Solo piano, right hand alone: the main theme as a single unaccompanied melody line, slow and free, like someone humming in an empty hall.
[00:18] The left hand enters with soft open fifths and gentle broken chords; the theme repeats, now harmonised in warm thirds and sixths.
[00:38] A solo cello takes the theme while the piano ripples underneath in flowing arpeggios; a viola answers in counterpoint, two voices intertwining.
[01:02] Strings enter one section at a time (violas, second violins, first violins), building a rich harmonic bed; a flute floats a high countermelody; suspensions bloom and resolve.
[01:30] Full chamber orchestra, warm and expansive: violins sing the theme in octaves, horns hold soft sustained chords, a harp glissando leads in, and the key lifts up a whole step to E-flat major. Big but gentle, like an embrace.
[01:58] The orchestra thins to strings and piano; the theme passes between violin and cello in a tender duet.
[02:22] Only piano and a solo violin, quiet and intimate.
[02:38] Solo piano alone again with the single-line theme, slowing down, ending on a long, ringing D-flat major chord.
Never aggressive: no drums, no percussion, no brass blasts, no sudden loud hits, no synths, no vocals or choir. Warm, natural concert-hall recording. Instrumental.
```

**30초판**
```text
Lyrical neo-romantic orchestral rhapsody, hopeful, nostalgic and calm. Concert grand piano, solo cello, strings, soft French horns, harp. D-flat major, about 70 BPM, gentle rubato, a simple singable main theme.
[00:00] Solo piano plays the theme as one unaccompanied melody line.
[00:08] The left hand adds warm broken chords under the theme.
[00:15] A solo cello takes the theme over flowing piano arpeggios; strings swell in rich, suspended harmony.
[00:23] A gentle, warm peak with soft horns, then it thins back to piano and ends on a soft held chord.
No drums, no percussion, no synths, no vocals. Instrumental.
```

---

### 2. 등불 거리의 왈츠 — `bgm_lantern` (대기실 · 상점 · 교역소)

**포근함** · 실내악 왈츠

해 질 녘 돌길에 등불이 하나씩 켜지는 거리. 클라리넷 홀로 왈츠 선율을 부르다가, 하프가 왈츠 반주를 깔고, 바이올린과 클라리넷이 3도로 얽히고, 현악이 부풀어 네 성부 화음이 된다. 가운데에 하프의 자유로운 카덴차.

**프롬프트**
```text
Cozy, lyrical chamber-orchestra waltz for the lobby and market square of a fantasy card game. Mood: warm, smiling and softly nostalgic, like lanterns lighting up a cobbled street at dusk; flowing and rhapsodic but relaxed, never turbulent. Instruments: clarinet, solo violin, flute, harp, string orchestra with cellos playing soft pizzicato on the first beat, soft French horns. Key of G major, 3/4 slow waltz, about 84 BPM, swaying with gentle rubato. A catchy, lilting eight-bar waltz tune that sticks in the mind; it returns several times with new colours each time. Harmony: warm and consonant, secondary dominants, chromatic passing chords, suspensions and smooth inner voices.
[00:00] A solo clarinet plays the waltz tune alone, unaccompanied and unhurried.
[00:14] The harp enters with a gentle waltz accompaniment, a low note on beat one and soft chords on beats two and three; the tune repeats while a flute echoes the ends of phrases.
[00:36] A solo violin takes the tune while the clarinet weaves a countermelody a third below, two voices dancing together.
[01:00] Strings join and swell; the waltz blooms into rich four-part harmony with soft horn chords underneath.
[01:26] A rhapsodic interlude: the harp plays a free, flowing cadenza over a long sustained string chord, then the whole ensemble returns with the tune in octaves, the warmest and fullest moment, still gentle.
[01:56] The ensemble thins to clarinet, violin and harp, trading short phrases.
[02:20] Solo clarinet alone, the tune slowing down, ending on a soft held note over a quiet harp chord.
No drums, no percussion, no synths, no vocals. Natural, intimate recording. Instrumental.
```

**30초판**
```text
Cozy, lyrical chamber-orchestra waltz, warm and softly nostalgic. Clarinet, solo violin, flute, harp, strings. G major, 3/4, about 84 BPM, a catchy lilting waltz tune.
[00:00] Solo clarinet plays the waltz tune alone.
[00:07] Harp adds a gentle waltz accompaniment; a flute echoes the phrase endings.
[00:14] Solo violin takes the tune with the clarinet a third below; strings swell into rich four-part harmony.
[00:24] It thins back to clarinet and harp and ends on a soft held note.
No drums, no percussion, no synths, no vocals. Instrumental.
```

---

### 3. 별이 잠든 서고 — `bgm_library` (덱 조정실 · 보관소 · 순례 지도)

**고요한 경이** · 인상주의 관현악

생각하는 곳의 음악. 고요한 서고 위로 별이 하나씩 떠오르듯, 플루트 한 줄에서 시작해 하프와 높은 피아노가 반짝이는 펼침화음을 얹고, 약음기를 낀 현악이 방석처럼 깔린다. 인상주의 빛깔(장7 · 부가9 · 리디안).

**프롬프트**
```text
Calm, dreamy, lyrical orchestral piece for a quiet place of thought in a fantasy card game: building a deck, browsing an archive, studying a starlit map. Mood: peaceful, wondering and softly luminous, like stars appearing one by one over a silent library; free-flowing and rhapsodic but very gentle. Instruments: flute, clarinet, harp, grand piano in the high register, solo viola, muted string orchestra, very soft French horns. Key of E major with a bright Lydian colour (raised fourth), 4/4, about 64 BPM, floating rubato. A slow, simple, memorable theme of long notes that returns three times. Harmony: impressionist colours, major-seventh and added-ninth chords, gentle parallel chord shifts, pedal tones and soft resolutions; always consonant and soothing.
[00:00] A single flute line alone, breathy and floating: the theme in long notes.
[00:18] Harp and high piano add soft, glittering broken chords; a clarinet joins the flute in parallel thirds.
[00:44] Muted strings enter as a soft cushion; the theme moves to a solo viola, warm and low, while the harmony drifts through bright Lydian colours.
[01:12] A slow, glowing swell: the strings remove their mutes, horns softly double the theme, piano arpeggios widen; a calm, radiant peak, never loud.
[01:44] The texture dissolves: piano and harp alone exchange fragments of the theme.
[02:12] Flute and clarinet duet, then the flute alone.
[02:34] It ends on a single high flute note held over a soft, low E major chord.
No drums, no percussion, no synths, no vocals. Spacious, warm, natural recording. Instrumental.
```

**30초판**
```text
Calm, dreamy, lyrical orchestral piece, peaceful and softly luminous. Flute, clarinet, harp, high grand piano, muted strings. E major with a bright Lydian colour, about 64 BPM, a slow memorable theme of long notes.
[00:00] A single flute line alone, floating.
[00:08] Harp and high piano add glittering broken chords; a clarinet joins in parallel thirds.
[00:16] Muted strings swell softly into rich major-seventh harmony, a calm glowing peak.
[00:25] It dissolves to flute and harp and ends on a held high note over a soft low chord.
No drums, no percussion, no synths, no vocals. Instrumental.
```

---

### 4. 바람이 건너는 들판 — `bgm_field` (대전)

**조용한 결의** · 피아노 되풀이 음형과 관현악

판을 두는 동안 깔리는 곡. 피아노의 잔잔한 8분음표 펼침화음이 고른 맥박을 주어 생각에 집중하게 하고, 그 위로 잉글리시 호른이 주제를 부른다. 긴장은 없고, 조용한 결의와 희망. 가운데에 피아노가 쓸어 올라가며 C장조로 활짝 열린다.

**프롬프트**
```text
Lyrical, quietly determined orchestral piece to accompany a strategic card battle in a fantasy world. Mood: focused, hopeful and noble, with a gentle forward motion that helps concentration; rhapsodic in its sweeping phrases but never tense, aggressive or turbulent. Instruments: grand piano, English horn, oboe, solo cello, string orchestra, soft French horns, harp. Key of A minor turning to C major, 4/4, about 86 BPM, steady and flowing. A soft, steady piano ostinato of broken chords in even eighth notes keeps a calm pulse under a memorable four-bar theme that returns several times. Harmony: an Aeolian progression (i, VI, III, VII) with bright major turns at the ends of phrases, suspensions, and a warm move to the relative major for the climax.
[00:00] The soft piano ostinato alone, gentle broken chords setting a calm pulse.
[00:12] An English horn sings the theme over it as a single lyrical line.
[00:36] Cellos add a slow countermelody beneath; violas fill in the inner harmony.
[01:00] Violins take the theme; the harmony thickens into rich four-part strings with soft horn sustains, and the ostinato moves into legato strings.
[01:30] A rhapsodic bridge: the piano sweeps upward in a free, flowing run and lands in C major; the full ensemble sings the theme broadly, warm and noble, still calm.
[02:04] Thinning: the strings drop out one by one; oboe and cello play a duet over the piano ostinato.
[02:34] The piano ostinato alone with a last fragment of the theme on the English horn, settling on an open, peaceful A minor chord with an added ninth.
No drums or percussion, no brass fanfares, no sudden loud hits, no synths, no vocals. Natural concert-hall recording. Instrumental.
```

**30초판**
```text
Lyrical, quietly determined orchestral piece for a strategic card battle, focused and hopeful, never tense. Grand piano, English horn, cello, strings, soft horns. A minor turning to C major, about 86 BPM, a steady soft piano ostinato under a memorable theme.
[00:00] Soft piano ostinato of broken chords alone.
[00:06] An English horn sings the theme over it.
[00:14] Cellos and strings join with rich, warm harmony; the music turns bright toward C major.
[00:24] It thins back to the piano ostinato and settles on an open, peaceful chord.
No drums, no percussion, no synths, no vocals. Instrumental.
```

---

### 5. 옛 맹세의 랩소디 — `bgm_oath` (대전)

**애틋한 고결함** · 바이올린 · 피아노 랩소디

오래된 맹세를 떠올리는 바이올린 · 피아노 · 오케스트라의 랩소디. 독주 바이올린 홀로 → 피아노가 같은 주제로 대답 → 현악 셋이 돌림노래처럼 주제를 이어받음 → G단조에서 B♭장조로 열림 → 피아노가 폭포처럼 흐르는 정점 → 짧은 피아노 카덴차 → 바이올린 홀로.

**프롬프트**
```text
Tender orchestral rhapsody for violin, piano and orchestra, accompanying a long, thoughtful card battle in a fantasy world. Mood: noble, heartfelt and bittersweet, like an old oath remembered; sweeping rubato phrases and flowing piano figures, but calm and never stormy. Instruments: solo violin, grand piano, solo cello, string orchestra, warm French horns, harp, clarinet. Key of G minor opening into B-flat major, lilting 6/8, about 58 BPM per dotted quarter, with expressive rubato. A heartfelt eight-bar theme that is easy to remember and keeps returning, each time with richer harmony. Harmony: romantic-era progressions with suspensions, secondary dominants, a borrowed minor iv in the major section and gentle plagal cadences.
[00:00] A solo violin alone plays the theme slowly and freely, with expressive vibrato.
[00:16] The piano answers with the same theme in soft octaves, then accompanies with rolling 6/8 arpeggios; violin and piano trade phrases.
[00:42] A cello and a second violin enter: a string trio passes the theme from voice to voice in gentle imitation, the harmony growing with suspensions.
[01:08] Full strings swell beneath; horns enter with a warm, noble counter-line; the music turns from G minor to B-flat major and the theme opens into its major form.
[01:36] Rhapsodic peak: the piano plays sweeping, cascading arpeggios while the orchestra sings the theme broadly in octaves; passionate but tender, never stormy.
[02:06] The orchestra recedes; strings hold a soft chord while the piano plays a short, free cadenza.
[02:30] The solo violin returns alone with the theme over a few soft piano chords, ending on a long, quiet B-flat major chord.
No drums or percussion, no sudden loud hits, no synths, no vocals or choir. Warm, natural concert-hall recording. Instrumental.
```

**30초판**
```text
Tender orchestral rhapsody for violin and piano, noble, heartfelt and bittersweet, calm. Solo violin, grand piano, strings, warm French horns. G minor opening into B-flat major, lilting 6/8, about 58 BPM, a heartfelt memorable theme.
[00:00] A solo violin alone plays the theme freely.
[00:08] The piano answers with the theme, then rolls gentle 6/8 arpeggios under the violin.
[00:16] Strings and horns swell as the music opens into B-flat major, a warm, sweeping peak.
[00:25] It recedes to violin and piano and ends on a long, quiet chord.
No drums, no percussion, no synths, no vocals. Instrumental.
```

---

## 5. 곡별 프롬프트 — 2부 열 가지 성향

### 6. 심지가 타들어 가는 동안 — `bgm_cinder` (대전)

**장난기 · 능청** · 스윙 재즈 · 살금살금 케이퍼 · 잿불 고블린

포르탄 요새를 지키는 겁 없는 화약 천재들의 곡. 바순 하나가 살금살금 주제를 흘리면 피치카토 베이스가 따라 걷고, 클라리넷이 말대꾸하듯 받는다. 기타 · 브러시 스네어 · 손가락 튕기기 · 아코디언이 들어와 신나게 스윙하고, 마지막 후렴은 반음 올라간다. 끝은 다시 바순 하나와 '퐁' 하는 피치카토.

**프롬프트**
```text
Cheeky, playful swing-jazz caper for a card battle in a fantasy world, the theme of fearless goblin gunpowder tinkerers. Mood: mischievous, sly and fun, tiptoeing at first and then swinging, light on its feet; lively but never harsh or chaotic. Instruments: bassoon, clarinet, accordion, solo violin, muted trumpet, acoustic rhythm guitar with a bouncy off-beat strum, pizzicato upright bass, brushed snare, finger snaps, glockenspiel. Key of B minor with a Dorian flavour, 4/4 swing, about 120 BPM. One catchy, sneaky four-bar hook of short staccato notes with a cheeky chromatic run at the end; it returns at least three times, each time with more players. Harmony: minor ii-V-i turnarounds, a descending chromatic inner line under the minor chord (minor, minor-major seventh, minor seventh, minor sixth), diminished passing chords, and a tritone substitution before each return of the hook.
[00:00] A solo bassoon alone tiptoes through the hook in short staccato notes with little pauses, like someone sneaking past on tiptoe.
[00:14] A pizzicato upright bass starts walking underneath; a clarinet answers each bassoon phrase, call and response.
[00:36] The swing settles in: rhythm guitar, brushed snare and finger snaps; the accordion and clarinet play the hook together in thirds over the chromatic line.
[01:02] The whole band: the violin swings a countermelody, the muted trumpet adds playful little answers, glockenspiel sparkles at the ends of phrases; the hook returns bigger and brighter.
[01:30] A tiptoe break: only pizzicato bass and finger snaps, then the accordion plays a sly, free variation of the hook.
[01:52] The final chorus jumps up a half step; everyone swings together, clarinet and violin in octaves with the bassoon underneath; fun and bouncy, not loud.
[02:20] The players drop out one by one until the bassoon alone plays the last phrase, ending with a sly pizzicato pluck and one soft muted-trumpet note.
No full drum kit, no electric guitar, no synths, no vocals or scat singing, no sound effects. Warm, intimate live-band recording. Instrumental.
```

**30초판**
```text
Cheeky, playful swing-jazz caper, mischievous and fun, never harsh. Bassoon, clarinet, accordion, muted trumpet, rhythm guitar, pizzicato upright bass, brushed snare, finger snaps. B minor, 4/4 swing, about 120 BPM, a sneaky, catchy staccato hook.
[00:00] A solo bassoon tiptoes through the hook alone.
[00:07] A pizzicato bass walks underneath; a clarinet answers.
[00:14] Guitar, brushed snare and accordion swing in; the hook returns with the whole band.
[00:24] It drops back to the bassoon, ending with a sly pizzicato pluck.
No full drum kit, no synths, no vocals, no sound effects. Instrumental.
```

---

### 7. 망치가 쉬는 저녁 — `bgm_anvil` (대기실 · 교역소 · 대장간)

**듬직한 흥** · 북유럽 · 켈트 민속 행진 · 무쇠수염 드워프

두르크하임의 대장장이들이 하루 일을 마치고 화롯가에 모인 저녁. 허디거디의 낮은 지속음 위로 로 휘슬 하나가 흥얼거리고, 피들 · 첼로 · 만돌린 · 프레임 드럼 · 발 구르기 · 손뼉이 차례로 붙어 다 같이 발을 구르는 후렴이 된다. 가운데는 북이 멎고 고향을 떠올리듯 느려지며, 마지막 후렴은 한 음 올라간다.

**프롬프트**
```text
Hearty, warm folk-hall march for the lobby and forge of a fantasy card game, the theme of sturdy dwarf smiths resting by the hearth after a long day. Mood: proud, cheerful and comforting, like old friends stomping together in a wooden hall; strong and steady but never harsh. Instruments: hurdy-gurdy, low whistle, fiddle, mandolin, cello section, double bass, bassoon, warm French horns, frame drum, foot stomps and hand claps, a soft anvil tap. Key of D Mixolydian (D major with a lowered seventh), 4/4, about 104 BPM, a steady stomping march. One sturdy, singable eight-bar tune that rises proudly and lands firmly, easy to hum after one hearing; it returns at least three times, each time with more players. Harmony: bright folk harmony with the flat-seventh chord (I, flat VII, IV, I), a lift through IV, V and vi before each chorus, open fifths and drones.
[00:00] A hurdy-gurdy drone alone, then a low whistle plays the tune as one unhurried line, like a single smith humming at the end of the day.
[00:18] A fiddle joins an octave above; a cello adds a simple bass line; a soft anvil tap marks every second beat.
[00:40] Frame drum, foot stomps and hand claps bring a steady march; the mandolin strums; bassoon and cellos sing a hearty lower harmony under the tune.
[01:06] The whole hall: French horns play the tune broadly in warm harmony, the fiddle dances a countermelody above, the rhythm stomps proud and steady.
[01:34] A cosy middle: the drums stop; hurdy-gurdy and solo cello play a slow, tender version of the tune, like an old smith remembering home.
[02:00] The stomp returns and the final chorus lifts up a whole step; everyone plays together, joyful and solid.
[02:30] The players step out one by one until the low whistle alone plays the last phrase over the drone, ending on a big, warm open chord and one soft anvil tap.
No drum kit, no electric guitar, no synths, no vocals, chanting or shouting, no sound effects. Warm, natural live recording in a wooden hall. Instrumental.
```

**30초판**
```text
Hearty, warm folk-hall march, proud and cheerful, never harsh. Hurdy-gurdy, low whistle, fiddle, mandolin, cellos, French horns, frame drum, foot stomps. D Mixolydian, 4/4, about 104 BPM, a sturdy singable tune.
[00:00] A hurdy-gurdy drone, and a low whistle plays the tune alone.
[00:07] A fiddle and a cello join; a soft anvil tap marks the beat.
[00:14] Frame drum and stomps bring a steady march; horns play the tune in warm harmony.
[00:24] It thins to the low whistle and ends on a big, warm open chord.
No drum kit, no synths, no vocals or shouting, no sound effects. Instrumental.
```

---

### 8. 볼타리움의 태엽 — `bgm_clockwork` (상점 · 덱 조정실)

**재기발랄 · 호기심** · 미니멀리즘 · 오르골 · 번개 노움

뇌전 학술원 볼타리움의 영리한 노움 학자들. 첼레스타 하나가 오르골처럼 짧은 무늬를 돌리면 마림바가 톱니처럼 맞물리고, 피치카토 · 하프시코드 · 클라리넷 · 글로켄슈필이 한 겹씩 쌓여 반짝이는 기계가 된다. 구리 코일처럼 웅웅대는 따뜻한 신시사이저를 아주 옅게 섞었다. 태엽이 풀리듯 느려졌다가 한 음 높이 다시 감긴다.

**프롬프트**
```text
Bright, playful clockwork minimalism for the shop and workshop screens of a fantasy card game, the theme of brilliant gnome inventors who store lightning in copper coils. Mood: curious, clever and sparkling, cheerful and light; busy like ticking gears but always relaxed and never harsh. Instruments: celesta, marimba, glockenspiel, harpsichord, pizzicato strings, clarinet, bassoon, flute, legato string orchestra, a soft woodblock tick, and a faint, warm vintage synthesizer arpeggio humming deep in the mix like an electric coil. Key of F Lydian (F major with a bright raised fourth), 4/4, about 116 BPM, with playful 3-3-2 accents. One catchy two-bar music-box figure with a cheerful four-bar clarinet tune above it; both keep returning as the layers stack up. Harmony: Lydian sparkle (I to II over a pedal), interlocking patterns that click together, and a catchy chorus progression IV, V, iii, vi with added-ninth chords.
[00:00] A celesta alone plays the bright two-bar figure, ticking like a tiny wind-up toy.
[00:12] A marimba enters with an interlocking pattern and a soft woodblock ticks; the two lines click together like gears.
[00:28] Pizzicato strings and harpsichord add a bouncing bass and off-beat chords; the clarinet plays the tune, curious and cheerful, and a staccato bassoon answers.
[00:54] More layers: glockenspiel sparkles, the flute doubles the tune an octave higher, and the warm synthesizer arpeggio hums softly underneath.
[01:20] Full and shining: legato strings sing a long countermelody over all the interlocking patterns; the chorus progression rolls by, catchy and bright, never loud.
[01:48] Everything stops except the celesta figure, which slows down like a spring running out; then the layers wind up again within a few seconds, now a whole step higher.
[02:14] The last bright chorus, with every gear turning together.
[02:36] Layers drop out one by one; the celesta alone ticks the figure, slows down and stops on a single ringing high note.
No drum kit, no heavy bass, no dance beat, no vocals, no sound effects; acoustic instruments, with the synthesizer only as a faint glow. Clean, bright, close recording. Instrumental.
```

**30초판**
```text
Bright, playful clockwork minimalism, curious and sparkling, never harsh. Celesta, marimba, glockenspiel, harpsichord, pizzicato strings, clarinet, a faint warm synthesizer arpeggio. F Lydian, 4/4, about 116 BPM, a catchy music-box figure.
[00:00] A celesta alone plays the music-box figure.
[00:06] A marimba interlocks with it; a soft woodblock ticks.
[00:12] Pizzicato strings and harpsichord join; a clarinet plays the cheerful tune as the layers keep stacking.
[00:23] The layers drop away and the celesta slows to a stop on a ringing high note.
No drum kit, no dance beat, no vocals, no sound effects. Instrumental.
```

---

### 9. 가르운의 북 — `bgm_stonedrum` (대전)

**우직한 긍지** · 북과 관현악의 찬가 · 바위주먹 오크

울부짖는 초원을 떠도는 가르운 대야영지, 몰릴수록 강해지는 오크 전사들의 곡. 깊은 북 하나가 심장처럼 뛰고 나무 피리가 넓은 선율을 홀로 분다. 낮은 현의 되풀이 음형과 호른의 찬가가 더해지고 북이 굵어져, 한 깃발 아래 함께 걷는 행진이 된다. 북이 멎는 가운데에서 피리가 조용히 긍지를 노래하고, 마지막은 F장조로 환하게 열린다. 북은 크지만 둥글게, 선율 뒤에 둔다.

**프롬프트**
```text
Proud, earthy orchestral anthem with big warm drums for a card battle in a fantasy world, the theme of orc warriors who grow stronger when cornered. Mood: noble, steadfast and powerful, like a great clan marching together under one banner; a strong, steady pulse, heroic but never aggressive, chaotic or harsh. Instruments: large frame drums and deep ceremonial drums played warm and round, a breathy low wooden flute, cellos and double basses, French horns, trombones played softly, violins. Key of D Dorian (minor with a bright raised sixth) opening into F major, 4/4, about 92 BPM, steady like a great beast walking. One proud, simple four-bar anthem built on strong rising intervals and a stepwise fall, easy to hum; it returns at least three times, each time fuller. Harmony: modal and grounded (i, IV, i, flat VII), open fifths and octaves, rich horn chords, and a warm turn to the relative major at the climax.
[00:00] A single deep drum beats alone like a slow heartbeat; a low wooden flute plays the anthem as one wide-open line.
[00:18] Cellos and basses enter with a low, steady ostinato; a second drum answers the first.
[00:40] The drums settle into a mighty, steady groove, warm and round; French horns play the anthem in unison, proud and simple, and the low strings answer each phrase.
[01:06] The horns open into rich harmony; violins add a soaring counterline; the drums grow fuller as the whole clan marches together.
[01:34] A quiet middle: the drums stop; the low strings hold a drone and the wooden flute plays a slow, tender version of the anthem, a warrior's quiet pride.
[01:56] The drums return one by one; the anthem comes back in full and the music opens into F major, heroic and warm, big but controlled.
[02:28] The orchestra thins until one deep drum heartbeat and the flute's last phrase remain, ending on a single soft drum stroke under an open fifth.
No drum kit, no cymbal crashes, no electric guitar, no synths, no vocals, chanting or shouting, no sound effects. Warm, natural concert-hall recording with the drums behind the melody. Instrumental.
```

**30초판**
```text
Proud, earthy orchestral anthem with big warm drums, noble and steadfast, never aggressive. Deep frame drums, low wooden flute, cellos and basses, French horns. D Dorian opening into F major, 4/4, about 92 BPM, a simple proud anthem.
[00:00] One deep drum heartbeat; a wooden flute plays the anthem alone.
[00:07] Low strings enter with a steady ostinato; the drums settle into a mighty groove.
[00:14] French horns play the anthem in rich harmony, opening into F major.
[00:24] It thins to one drum heartbeat and ends under an open fifth.
No cymbal crashes, no synths, no vocals or chanting, no sound effects. Instrumental.
```

---

### 10. 천천히 자라는 숲 — `bgm_moss` (대기실 · 순례 지도)

**느긋함 · 포근함** · 어쿠스틱 숲 민요 · 이끼 트롤

겨울이면 이끼를 덮고 나무와 함께 잠드는 실바니엘의 트롤들, 베어도 다시 자라는 숲. 손가락으로 뜯는 기타 위에 알토 플루트가 소박한 자장가를 부르고, 바순이 느릿하고 익살스러운 낮은 선율로 대꾸한다(작은 플루트와 큰 거인이 이야기하듯). 칼림바가 이슬처럼 떨어지고 첼로 · 리코더 · 현악이 더해져 이끼 낀 빈터의 햇살처럼 따뜻해진다. 살짝 끄는 셔플 리듬이 느긋하다.

**프롬프트**
```text
Gentle, easygoing acoustic folk piece for the lobby and journey map of a fantasy card game, the theme of patient moss trolls and tree spirits who regrow whatever is cut. Mood: warm-hearted, cosy and unhurried with a touch of good humour, like sunlight drifting into a mossy clearing; very relaxing. Instruments: fingerpicked acoustic guitar, alto flute, bassoon, contrabassoon, kalimba, soprano recorder, solo cello, string section, upright bass, a soft reed organ, a soft hand drum. Key of A major, 4/4 with a laid-back, gently swung shuffle, about 76 BPM. One simple, warm, pentatonic tune that feels like a lullaby and is easy to hum; a slow, lumbering bassoon answers it like a big friendly giant; the tune returns at least three times, each time warmer. Harmony: cosy folk progressions (I, V, vi, IV and IV, V, iii, vi), added-ninth and major-seventh colours, and a tender borrowed minor iv near the end.
[00:00] A fingerpicked acoustic guitar alone, slow and gentle, like dawn light through leaves.
[00:12] An alto flute plays the tune as a single, warm line over the guitar.
[00:34] A bassoon answers each phrase with a slow, lumbering, good-humoured low melody; kalimba notes drip like dew; a soft hand drum adds a lazy pulse.
[01:00] A solo cello and a recorder join; the tune is played in warm thirds and the harmony grows rich and cosy.
[01:28] The fullest moment: strings, woodwinds, guitar and the soft reed organ swell together; flute and cellos sing the tune in octaves, warm and glowing, never loud.
[01:56] It thins to guitar, kalimba and contrabassoon playing a sleepy, funny version of the tune.
[02:20] The alto flute alone with the guitar plays the last phrase, slowing down and ending on a soft A major chord with an added ninth.
No drum kit, no electric instruments, no synths, no vocals, no birdsong or nature sound effects. Warm, close, natural recording. Instrumental.
```

**30초판**
```text
Gentle, easygoing acoustic folk, cosy and warm-hearted with a touch of humour. Fingerpicked acoustic guitar, alto flute, bassoon, kalimba, cello, soft hand drum. A major, gently swung, about 76 BPM, a simple lullaby-like tune.
[00:00] A fingerpicked acoustic guitar alone.
[00:06] An alto flute plays the tune over it.
[00:13] A bassoon answers with a lumbering, friendly melody; kalimba and cello join and the harmony grows warm.
[00:24] It thins to flute and guitar and ends on a soft added-ninth chord.
No drum kit, no synths, no vocals, no nature sound effects. Instrumental.
```

---

### 11. 셀레네아의 오후 — `bgm_tide` (대기실 · 교역소)

**한가로움 · 산뜻함** · 보사노바 · 하프 · 푸른비늘 인어

석호 위의 신전 도시 셀레네아의 한낮. 물 위에는 무녀들이, 물 밑에는 인어족이 산다. 하프가 작은 물결처럼 쓸리고 플루트가 홀로 선율을 띄우면, 나일론 기타의 보사노바 리듬과 콘트라베이스 · 비브라폰이 들어와 느긋하게 흔들린다. 현악이 풍성한 9화음으로 부풀고, 가운데에서 조가 A♭장조로 떠올랐다 돌아온다. 열다섯 곡 가운데 재즈 화성(장7 · 9 · 13화음)이 가장 풍성하다.

**프롬프트**
```text
Breezy, relaxed bossa-nova-tinged seaside piece with harp and strings for the lobby and trading post of a fantasy card game, the theme of graceful merfolk and water priestesses. Mood: carefree, sunny and elegant, swaying like waves under a warm afternoon sun; smooth and smiling, never busy. Instruments: nylon-string guitar, flute, vibraphone, harp, upright bass, soft shaker, brushed rim clicks, light string section, celesta. Key of F major with a dreamy lift to A-flat major in the bridge, 4/4, a gentle bossa-nova groove at about 124 BPM, felt in a relaxed two. One floating, gently syncopated eight-bar melody with a sweet sigh on the major seventh, easy to whistle; it returns at least three times, each time with lusher harmony. Harmony: lush jazz harmony with major-seventh, ninth and thirteenth chords, flowing ii-V-I chains, smooth chromatic descending chords and a soft modulation up a minor third.
[00:00] A harp glissando like a small wave, then a solo flute plays the melody alone, floating and breezy.
[00:12] The nylon-string guitar enters with a soft bossa-nova rhythm; the flute repeats the melody over gentle jazz chords.
[00:34] Upright bass, soft shaker and brushed rim clicks settle into a relaxed groove; a vibraphone answers the flute's phrases.
[01:00] Light strings swell into lush ninth chords; flute and vibraphone play the melody in harmony; the harp ripples like sunlight on water.
[01:28] Bridge: the key drifts up to A-flat major; a dreamy vibraphone solo over sustained strings, harp and celesta droplets.
[01:54] The melody returns at its fullest, flute and violins in octaves, the groove still relaxed and smiling.
[02:22] The band falls away to guitar and flute alone; the guitar plays a last soft major-ninth chord under a final harp glissando.
No drum kit, no brass, no synths, no vocals, no ocean, wave or seagull sound effects. Warm, intimate, natural recording. Instrumental.
```

**30초판**
```text
Breezy, relaxed bossa-nova-tinged seaside piece, sunny and elegant. Nylon-string guitar, flute, vibraphone, harp, upright bass, soft shaker, light strings. F major, a gentle bossa-nova groove at about 124 BPM, a floating syncopated melody over lush jazz chords.
[00:00] A harp glissando, then a solo flute plays the melody alone.
[00:07] The nylon guitar enters with a soft bossa-nova rhythm.
[00:14] Bass, shaker and vibraphone join; light strings swell into lush ninth chords.
[00:24] It falls back to guitar and flute and ends on a soft major-ninth chord.
No drum kit, no synths, no vocals, no ocean sound effects. Instrumental.
```

---

### 12. 계약의 탱고 — `bgm_abyss` (대전)

**매혹 · 위태로운 우아함** · 탱고 · 심연 마족

해가 들지 않는 협곡 도시 녹타르, 제 목숨을 값으로 치르고 힘을 얻는 마족의 곡. 반도네온 하나가 어둡고 달콤하게 숨을 쉬다가, 피아노와 콘트라베이스가 탱고 리듬을 박고, 바이올린이 미끄러지듯 주제를 이어받는다. 반음씩 내려가는 베이스와 감7 · 나폴리 화음이 위태롭게 끌어당긴다. 가운데에 C장조의 달콤한 쉼이 있고, 끝은 탱고다운 '짠-짠'. 무섭지 않고 멋있게.

**프롬프트**
```text
Seductive, elegant dark tango for chamber ensemble and strings, accompanying a card battle in a fantasy world, the theme of demon pact-makers who pay for power with their own life. Mood: alluring, mysterious and dangerously graceful, smoky and stylish; tense in a beautiful way, never scary or harsh. Instruments: bandoneon, solo violin, grand piano, double bass, string section, a low clarinet. Key of A minor (harmonic minor) with a tender interlude in C major, 4/4 tango at about 112 BPM, with marcato 3-3-2 accents. One sultry four-bar theme that rises slowly and snaps down with a sharp accent, instantly memorable; it returns at least three times, each time with a richer countermelody. Harmony: the descending minor cadence (i, flat VII, flat VI, V), a slowly falling chromatic bass line, diminished passing chords, a Neapolitan chord before the cadence, and secondary dominants.
[00:00] A lone bandoneon breathes the theme, slow and free, dark and sweet.
[00:16] Piano and double bass set a marcato tango rhythm; the bandoneon plays the theme in tempo.
[00:38] A solo violin takes the melody with long, sliding phrases; the bandoneon answers in counterpoint while the chromatic bass line pulls downward.
[01:04] The strings join; the full ensemble plays the theme with elegant tension and rich, shadowy harmony.
[01:32] A tender interlude in C major: violin and piano alone, slow and rubato, sweet like the moment a pact is sealed.
[01:56] The tango rhythm returns and builds; violin and bandoneon play the theme in octaves over lush strings, the most passionate moment, still controlled and elegant.
[02:24] Only bandoneon and bass remain for a last phrase; then a classic tango ending: a held dominant chord and one short, soft final accent on the tonic.
No drums, no synths, no vocals, no horror effects, no sound effects. Warm, intimate, natural recording. Instrumental.
```

**30초판**
```text
Seductive, elegant dark tango, mysterious and dangerously graceful, never scary. Bandoneon, solo violin, grand piano, double bass, strings. A minor, 4/4 tango, about 112 BPM, a sultry memorable theme.
[00:00] A lone bandoneon breathes the theme freely.
[00:07] Piano and bass set a marcato tango rhythm.
[00:14] A solo violin takes the melody over a falling chromatic bass; strings join with rich, shadowy harmony.
[00:25] It ends with a held dominant chord and one short final accent.
No drums, no synths, no vocals, no sound effects. Instrumental.
```

---

### 13. 새벽성의 종 — `bgm_halo` (타이틀 번갈아 · 보관소)

**숭고 · 경건** · 성가 카논 · 가사 없는 합창 · 성광 천족

흰 성벽의 성도 새벽성 엘라드, 동료 대신 칼을 받는 천족과 기사들. 오르간의 낮은 음 위에 바이올린 하나가 주제를 부르면, 가사 없는 합창의 소프라노 · 알토 · 테너 · 베이스가 같은 주제를 차례로 돌림노래(카논)로 받아 넷이 엮인다. "한 줄 → 여러 성부"를 가장 그대로 보여 주는 곡. 종 · 하프 · 부드러운 금관이 더해져 스테인드글라스를 지나는 햇빛처럼 환해졌다가, 목소리가 들어온 거꾸로 하나씩 빠진다. 열다섯 곡 가운데 이 곡만 사람 목소리(가사 없음)가 있다.

**프롬프트**
```text
Radiant, serene sacred choral canon with organ and strings for a fantasy card game, the theme of seraphs and knights who shield their allies with light. Mood: sublime, peaceful and uplifting, like sunrise pouring through stained glass in a vast stone cathedral; majestic and glowing, never harsh. Instruments: a soft wordless choir (sopranos, altos, tenors, basses), pipe organ, solo violin, string orchestra, harp, tubular bells, soft French horns and trombones in a gentle chorale. Key of D major lifting to E major at the climax, 4/4, slow and broad at about 62 BPM. One pure, singable four-bar theme that works as a round: each voice enters with the same theme in turn, so the music grows from one line into four. Harmony: a gentle repeating ground bass of eight chords, suspensions that resolve (4 to 3), soft plagal "amen" cadences, warm and luminous.
[00:00] A single bell, then a solo violin plays the theme alone, pure and slow, over a soft low organ note.
[00:20] The sopranos enter wordlessly with the theme while the violin moves on to a counter-line: the canon begins.
[00:42] The altos enter with the theme, then the tenors; the organ adds a slow ground bass and the voices weave gentle suspensions.
[01:08] The basses and strings enter: a full four-voice canon with harp arpeggios and a soft brass chorale; bells ring on the strong beats.
[01:38] Climax: the key lifts up a whole step to E major; full organ, choir and orchestra glow in luminous harmony, majestic and warm, never loud or harsh.
[02:10] The voices step out in reverse order, basses, tenors, then altos, until only the sopranos and the violin remain.
[02:34] The violin alone sings the theme over a soft organ chord, ending with a gentle plagal "amen" cadence and one soft bell.
Wordless choir only, singing soft "ah" and "oo" vowels: no lyrics, no words, no solo singer. No drums, no synths, no sound effects. Spacious, natural cathedral recording.
```

**30초판**
```text
Radiant, serene sacred choral canon, sublime and uplifting. Soft wordless choir, pipe organ, solo violin, strings, harp, tubular bells. D major, slow, about 62 BPM, one pure theme sung as a round.
[00:00] A bell, then a solo violin plays the theme over a soft organ note.
[00:07] The sopranos enter with the theme, then the altos, in canon.
[00:14] Tenors, basses and strings join; the harmony glows with suspensions and soft bells.
[00:24] The voices fall away to the violin, ending with a gentle "amen" cadence.
Wordless choir only, soft "ah" vowels: no lyrics, no solo singer. No drums, no synths, no sound effects.
```

---

### 14. 돌풍의 춤 — `bgm_gale` (대전)

**질주 · 자유** · 켈트 지그 · 폭풍 하이엘프

부유 군도에 닿는 첨탑, 벨루미르의 바늘에서 바람을 읽는 하이엘프 마법사들. 틴 휘슬 하나가 빠른 지그 선율을 홀로 날리면 하프 · 부주키 · 피들 · 보드란이 차례로 붙어 달려가고, 현악과 호른이 아래에서 부풀어 하늘로 솟는다. 가운데는 박이 넓어지는 느린 노래(헤미올라: 6/8이 잠깐 3/4처럼 들림), 마지막은 한 음 올라 다시 질주한다.

**프롬프트**
```text
Exhilarating Celtic-inspired jig with folk band and orchestra for a card battle in a fantasy world, the theme of proud high-elf storm mages who ride the wind. Mood: swift, free and joyful, noble and airborne, like racing the wind across high cliffs; energetic but light and never harsh. Instruments: tin whistle, fiddle, Celtic harp, bouzouki, flute, bodhran frame drum, string orchestra, warm French horns. Key of E Dorian (minor with a bright raised sixth), lifting up a whole step for the final section, 6/8 jig at about 116 BPM per dotted quarter. One spinning, circular eight-bar jig tune that is instantly catchy, with a second phrase that leaps upward; it returns at least three times, each time with more players. Harmony: bright modal folk harmony (i, IV, flat VII), a soaring lift through flat VI and flat VII to the tonic, and a broad hemiola bridge that feels like 3/4.
[00:00] A tin whistle alone plays the jig tune, quick, light and free.
[00:12] Celtic harp and bouzouki join with a bright, driving 6/8 rhythm; a fiddle doubles the tune.
[00:30] The bodhran enters; fiddle and whistle play in harmony and a flute adds a swirling counter-line.
[00:56] The string orchestra swells under the folk band; the second phrase leaps upward, soaring, while warm horns hold long chords beneath.
[01:24] Bridge: a slow, broad air in hemiola; harp and fiddle alone play a noble version of the tune in long notes, like looking out over a stormy sky.
[01:50] The bodhran kicks back in; full band and orchestra race on, the key lifting up a whole step, exhilarating and joyful.
[02:20] Harp and whistle alone race through the tune one last time, ending on a quick unison flourish and one ringing harp chord.
No drum kit, no electric guitar, no bagpipes, no synths, no vocals, no wind or thunder sound effects. Bright, natural live recording. Instrumental.
```

**30초판**
```text
Exhilarating Celtic-inspired jig, swift, free and joyful, never harsh. Tin whistle, fiddle, Celtic harp, bouzouki, bodhran frame drum, strings. E Dorian, 6/8, about 116 BPM per dotted quarter, a spinning catchy jig tune.
[00:00] A tin whistle alone plays the jig tune.
[00:06] Harp and bouzouki add a driving rhythm; a fiddle doubles the tune.
[00:12] The bodhran enters and strings swell beneath; the tune leaps upward, soaring.
[00:23] Harp and whistle race through a last phrase to a quick unison flourish.
No drum kit, no bagpipes, no synths, no vocals, no sound effects. Instrumental.
```

---

### 15. 마지막 한 장 — `bgm_lastcard` (대전 · 온라인 · 결전)

**비장에서 희망으로** · 영웅적 관현악 · 결전

승부가 마지막 카드 한 장에 걸린 순간. 피아노 하나가 심장 박동 같은 되풀이 음형을 짚고, 호른 하나가 영웅의 주제를 조용히 꺼낸다. 낮은 현 · 스피카토(활을 튕기듯 짧게 켜는) 바이올린 · 팀파니가 차례로 쌓여 단단한 총주가 되고, 한순간 고요해진 뒤 E♭장조로 열려 희망차게 솟는다. 크지만 어지럽지 않게, 선율이 늘 앞에 선다.

**프롬프트**
```text
Heroic, uplifting cinematic orchestral piece for the decisive moments of a card battle in a fantasy world, when everything rides on the last card. Mood: resolute, brave and hopeful, a steady build from quiet tension to a warm triumph; big and stirring but always melodic and controlled, never chaotic or harsh. Instruments: grand piano, string orchestra with a spiccato ostinato, French horns, trumpets played warmly, trombones, timpani, low orchestral drums. Key of C minor opening into E-flat major, 4/4, about 120 BPM, a steady driving pulse. One heroic four-bar horn theme built on a rising fourth and a determined stepwise climb, easy to remember; it returns at least three times, each time grander. Harmony: bold minor progressions (i, flat VI, flat III, flat VII) with pedal points under the ostinato and suspended fourths in the brass, then bright major progressions (I, V, vi, IV) for the hopeful turn.
[00:00] A lone piano plays a soft, ticking ostinato in C minor, like a heartbeat before the final draw.
[00:14] Low strings add a pulsing ostinato; a solo French horn plays the heroic theme quietly as a single line.
[00:36] Violins enter with driving spiccato; soft timpani rolls; the horns play the theme in harmony as the tension builds steadily.
[01:02] Full orchestra: horns and warm trumpets proclaim the theme, strings soar with a countermelody, low drums support the downbeats.
[01:30] A sudden hush: only strings and piano; the theme turns to E-flat major, tender and hopeful.
[01:52] The orchestra rebuilds to the climax: the theme in E-flat major, triumphant and noble, with a trombone chorale and racing strings, still controlled.
[02:26] It narrows to horns and strings holding a long, bright chord; the solo piano plays the opening ostinato once more in major, ending on a calm, resolute E-flat major chord.
No cymbal crashes, no trailer hits or booms, no electric guitar, no synths, no vocals or choir, no sound effects. Warm, natural concert-hall recording. Instrumental.
```

**30초판**
```text
Heroic, uplifting cinematic orchestral piece, resolute and hopeful, melodic and controlled. Grand piano, spiccato strings, French horns, warm trumpets, timpani. C minor opening into E-flat major, 4/4, about 120 BPM, a heroic horn theme.
[00:00] A lone piano ticks a soft ostinato.
[00:06] Low strings pulse; a solo horn plays the theme quietly.
[00:13] Violins drive in spiccato; horns and trumpets proclaim the theme as it turns to E-flat major.
[00:24] It narrows to a long, bright chord and the piano's last ostinato.
No cymbal crashes, no trailer hits, no synths, no vocals, no sound effects. Instrumental.
```

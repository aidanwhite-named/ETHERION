# ETHERION 배경음 다시 만들기 — 서정 · 비장 · 단조 (Gemini용 프롬프트 15곡 + 새 2곡)

> 2026-11-15에 썼다. 지금 배경음 15곡(`PROMPT_BGM.md`)은 너무 클래식 음악 같고 경쾌하다는 의견에 따라, **같은 15곡 이름 · 같은 쓸 곳**을 그대로 두고 분위기만 바꿔 다시 만드는 프롬프트다.
> 만드는 법(Gemini 음악 만들기 · Lyria 3 Pro, 한 곡 3~4번 만들어 고르기, `audio/inbox/bgm/`에 넣고 "배경음 넣어줘")은 `PROMPT_BGM.md` 3장과 같다.
> 맨 끝(5장)에 카드 보기 거르개(종류 · 등급 · 레벨)를 누를 때 나는 **클릭음 프롬프트**도 있다.
> 2026-11-21에 **새 곡 둘(16 · 17번, 서정 · 비장 랩소디)** 을 더했다. 이 둘은 다시 만드는 곡이 아니라 새 파일이다(`bgm_eve` · `bgm_banner`) — 받으면 `js/bgm.js`의 `tracks`에 이름을 더해야 한다.

---

## 0. 바꾸는 방향

**지금 곡의 문제**
- 콘서트홀 관현악 · 왈츠 · 스윙 · 보사노바 · 지그처럼 "클래식 음악회"나 "흥겨운 춤곡" 같은 결이 많다.
- 장조가 많고 밝게 튄다. 판타지 카드 대전의 긴장과 무게가 덜하다.

**새 곡이 지킬 것**
- **단조가 바탕이다.** 에올리안(자연 단음계) · 도리안 · 화성 단음계 · 프리지안의 빛깔. 곡 끝에서 잠깐 장조 화음으로 열려도 되지만(피카르디 3도), 곡 대부분은 단조로 머문다.
- **서정적이다.** 노래하듯 긴 선율 하나가 곡을 끌고 간다. 흥얼거릴 수 있는 짧은 주제가 세 번 넘게 돌아오고, 돌아올 때마다 한 겹 두꺼워진다.
- **비장하다.** 낮은 현의 지속음, 천천히 걷는 무거운 북, 가사 없는 낮은 남성 합창의 허밍, 먼 곳의 호른. 슬프지만 꺾이지 않는, "그래도 나아간다"는 마음.
- **클래식 음악회처럼 들리지 않게.** 콘서트홀 실내악 · 왈츠 · 바로크 · 경쾌한 목관 장식 대신 **영화 · 게임 음악(시네마틱 다크 판타지)** 결로 쓴다. 독주 악기(첼로 · 두둑 · 알토 플루트 · 허디거디 · 바이올린) + 낮은 현의 짧은 반복 음형(오스티나토) + 넓은 공간의 잔향 + 아주 옅은 앰비언트 패드.
- **세지 않다.** 대전 곡도 "몰아치는 액션"이 아니라 "엄숙하게 진군하는" 박이다. 심벌 · 드럼 세트 · 일렉트릭 기타 · 갑자기 쾅 하는 소리는 막는다.
- 짜임은 지금처럼 **한 줄 → 여러 겹 → 정점 → 다시 한 줄**로 숨 쉰다. 시간표(`[00:00]` …)로 적었다.
- 효과음(바람 · 물 · 불) · 노래 가사는 넣지 않는다. 합창은 가사 없는 허밍(‘mm’ · ‘oo’ · ‘ah’)만.

## 1. 열일곱 곡 한눈에

| # | 파일 | 새 제목 | 쓸 곳 | 조 · 박자 · 빠르기 | 주인공 소리 |
|---|---|---|---|---|---|
| 1 | `bgm_main` | **잿빛 하늘 아래 첫 노래** | 타이틀 | D단조 4/4 · 약 66 | 독주 첼로 · 잔향 피아노 · 낮은 허밍 합창 |
| 2 | `bgm_lantern` | **꺼져 가는 등불** | 대기실 | A단조 6/8 · 약 72 | 나일론 기타 · 독주 바이올린 · 낮은 현 |
| 3 | `bgm_library` | **잠든 별의 기록** | 대기실 (덱 조정실) | E단조(도리안) 4/4 · 약 60 | 피아노 · 알토 플루트 · 앰비언트 패드 |
| 4 | `bgm_field` | **바람이 우는 들판** | 대전 | A단조 4/4 · 약 84 | 두둑 · 첼로 · 프레임 드럼 |
| 5 | `bgm_oath` | **피로 새긴 맹세** | 대전 | G단조 4/4 · 약 76 | 독주 바이올린 · 낮은 현 오스티나토 · 호른 |
| 6 | `bgm_cinder` | **타들어 가는 심지** | 대전 | B단조 7/8 · 약 108 | 피치카토 현 · 바순 · 작은 북 |
| 7 | `bgm_anvil` | **식어 가는 모루** | 대기실 | D도리안 4/4 · 약 80 | 허디거디 · 낮은 남성 허밍 · 모루 같은 종 |
| 8 | `bgm_clockwork` | **멈춘 태엽** | 대기실 | F단조 4/4 · 약 96 | 첼레스타 · 마림바 · 낮은 현 |
| 9 | `bgm_stonedrum` | **가르운의 장송 북** | 대전 | D단조 4/4 · 약 72 | 큰 북 · 나무 피리 · 호른 · 낮은 허밍 합창 |
| 10 | `bgm_moss` | **이끼 아래 잠든 숲** | 대기실 | A에올리안 4/4 · 약 68 | 어쿠스틱 기타 · 알토 플루트 · 칼림바 |
| 11 | `bgm_tide` | **물러가는 밀물** | 대기실 | F#단조 4/4 · 약 70 | 하프 · 독주 첼로 · 물결 같은 피아노 |
| 12 | `bgm_abyss` | **계약의 비가** | 대전 | C단조(프리지안 빛깔) 4/4 · 약 88 | 반도네온 · 독주 바이올린 · 낮은 현 |
| 13 | `bgm_halo` | **무너진 새벽성의 종** | 대기실 (보관소) | B단조 4/4 · 약 58 | 가사 없는 합창 · 오르간 · 먼 종 |
| 14 | `bgm_gale` | **폭풍 앞의 질주** | 대전 | E단조 6/8 · 약 112 | 휘슬 · 피들 · 보드란 · 낮은 현 |
| 15 | `bgm_lastcard` | **마지막 한 장** | 대전 (결전) | C단조 4/4 · 약 100 | 피아노 · 호른 · 스피카토 현 · 합창 |
| 16 | `bgm_eve` | **출정 전야의 랩소디** (새 곡) | 대기실 | C#단조 4/4 · 약 58, 루바토 | 피아노 · 낮은 클라리넷 · 독주 비올라 |
| 17 | `bgm_banner` | **쓰러진 깃발의 랩소디** (새 곡) | 대전 | B♭단조 4/4 · 약 66 → 108 → 66 | 독주 호른 · 침발롬 · 낮은 현 |

- 6~14번은 지금처럼 깃발 곡이다: 6 잿불 고블린 · 7 무쇠수염 드워프 · 8 번개 노움 · 9 바위주먹 오크 · 10 이끼 트롤 · 11 푸른비늘 인어 · 12 심연 마족 · 13 성광 천족 · 14 폭풍 하이엘프. 깃발 악기는 남기고 분위기만 단조로 바꿨다.
- 16 · 17번은 깃발 곡이 아닌 **랩소디(광시곡)** 다. 루바토로 자유롭게 흐르고 구간 사이에 짧은 카덴차가 있다. 16번은 서정 쪽이 큰 느린 곡, 17번은 느린 비가 → 빨라짐 → 넓고 느린 정점으로 가는 곡이다. 주인공 악기는 5번(바이올린) · 1번(첼로)과 겹치지 않게 골랐다. 쓸 곳(대기실 하나 · 대전 하나 → 장면마다 8곡)은 제안이다.
- 길이는 모두 약 2:40~3:00. 끝은 긴 화음으로 맺는다(게임이 4초 전부터 다음 곡과 겹쳐 틀어서 페이드아웃 불필요).

## 2. 마음에 거의 들 때 고쳐 달라는 말

- 너무 밝으면: `Same piece, but darker and more melancholic, firmly in a minor key.`
- 클래식 음악회 같으면: `Less like a classical concert, more like a cinematic dark-fantasy video game score, with a solo instrument over low sustained strings and wide reverb.`
- 너무 슬프기만 하면: `Keep it in minor, but add quiet resolve and dignity, like soldiers walking on despite the grief.`
- 너무 세면: `Same piece, softer and slower; the drums distant and muffled, no loud hits.`
- 주제가 안 들리면: `Make the main theme simpler and repeat it more clearly at each section.`
- 합창에 가사가 들리면: `Keep the choir wordless: only low humming and soft 'oo' vowels, no lyrics.`
- 효과음이 섞이면: `Music only, no sound effects.`

**16 · 17번(랩소디)에만**
- 랩소디 느낌이 약하면: `More rhapsodic: freer rubato, and a short solo cadenza between sections.`
- 16번이 피아노 독주회처럼 들리면: `Less like a classical piano recital, more like a cinematic dark-fantasy game score, with low sustained strings and wide reverb.`
- 17번의 빠르기가 안 바뀌면: `Make the contrast between the slow opening and the faster middle section clearer, with a gradual accelerando.`
- 17번의 빠른 구간이 너무 세면: `Make the fast section lighter and more controlled, the drums distant and muffled.`
- 17번의 침발롬이 집시 춤곡처럼 튀면: `Keep the cimbalom dark, solemn and in the background; no folk dance feel.` 그래도 튀면 `Replace the cimbalom with harp and low piano.`

## 3. 곡별 프롬프트 — 타이틀 · 대기실

### 1. 잿빛 하늘 아래 첫 노래 — `bgm_main` (타이틀)

게임의 얼굴. 텅 빈 폐허에 첼로 한 줄이 울리고, 낮은 남성 합창이 허밍으로 받치며, 현이 한 겹씩 쌓여 장엄한 정점에 이른 뒤 다시 첼로 한 줄로 돌아온다.

```text
Lyrical, solemn cinematic dark-fantasy main theme for a fantasy card game. Mood: melancholic and heroic at once, a lament for a fallen land with quiet unbroken resolve; deeply emotional, never cheerful. Not a classical concert piece: a modern video-game film score. Instruments: solo cello, sparse grand piano with long reverb, low wordless male choir humming, low strings, distant French horns, soft deep frame drum, a very faint dark ambient pad. Key of D minor (natural minor with a raised leading tone at cadences), 4/4, about 66 BPM, slight rubato. One simple, singable four-bar minor theme that returns at least three times, each time with a thicker texture. Harmony: i - VI - III - VII, a sorrowful iv, suspended chords resolving downward, a Neapolitan colour before the climax.
[00:00] A single low drone and a solo cello alone playing the main theme, slow and aching, in a vast empty space.
[00:20] Sparse piano notes answer the cello; a low male choir hums the root and fifth underneath.
[00:45] The theme passes to violins in unison over a slow low-string ostinato; the cello sings a countermelody below.
[01:15] Strings swell in rich minor harmony, horns enter from afar, a soft deep drum beats slowly like a heartbeat.
[01:45] The climax: full strings, horns and wordless choir sing the theme in octaves, grand, mournful and defiant, still not harsh.
[02:15] Everything falls away to piano and low choir; the theme fragments.
[02:35] Solo cello alone with the theme once more, ending on a long D minor chord that briefly opens to D major.
No cymbals, no drum kit, no electric guitar, no sudden loud hits, no sound effects, no lyrics. Instrumental, wide cinematic reverb.
```

### 2. 꺼져 가는 등불 — `bgm_lantern` (대기실 · 상점 · 교역소)

해 질 녘 마지막 등불. 기타 한 대가 6/8로 흔들리고 바이올린이 쓸쓸하게 노래한다. 왈츠가 아니라 느린 민요의 흔들림.

```text
Lyrical, wistful dark-fantasy town theme for the lobby of a card game. Mood: lonely and tender, the last lanterns of a market street flickering at dusk; quiet and reflective, not cheerful, not a waltz. Instruments: nylon-string guitar, solo violin, low string section, soft cello, a distant low flute, very soft hand drum. Key of A minor, 6/8 slow folk sway, about 72 BPM. A short, haunting folk-like minor melody that returns at least three times, gaining a new voice each time. Harmony: i - iv - VII - III, the Andalusian descent i - VII - VI - V, gentle suspensions.
[00:00] Solo nylon guitar alone: a slow fingerpicked pattern and the melody in single notes.
[00:20] A solo violin takes the melody, soft and sorrowful, over the guitar.
[00:45] A cello answers in counterpoint; the two voices weave together.
[01:15] Low strings enter with sustained minor chords; a soft hand drum keeps a slow, distant pulse.
[01:45] The fullest moment: violin and cello in octaves over warm strings, aching but calm.
[02:15] The ensemble thins back to guitar and violin.
[02:35] Solo guitar alone with the melody, ending on a long A minor chord.
No cymbals, no drum kit, no brass, no sound effects, no vocals. Intimate, slightly dark room reverb. Instrumental.
```

### 3. 잠든 별의 기록 — `bgm_library` (덱 조정실 · 보관소 · 순례 지도)

먼지 쌓인 서고에서 별자리 기록을 넘기는 밤. 오래 들어도 거슬리지 않게 가장 잔잔하다.

```text
Lyrical, quiet and melancholic ambient piece for a deck-building screen in a dark-fantasy card game. Mood: contemplative, lonely and mysterious, an old library of sleeping stars at midnight; soft enough to listen to for a long time. Instruments: grand piano with long reverb, alto flute, solo viola, soft low strings, a faint warm ambient synth pad, very light celesta. Key of E Dorian minor, 4/4, about 60 BPM, floating. A simple, gentle minor motif of five or six notes that returns at least three times. Harmony: i - IV (Dorian colour) - VII - i, slow suspended chords, open fifths.
[00:00] Solo piano plays the motif alone, sparse and slow.
[00:25] A soft ambient pad and low strings hold an open drone; the alto flute repeats the motif.
[00:55] The viola sings a slow countermelody; the piano adds quiet broken chords.
[01:30] A gentle swell: strings, flute and viola in soft minor harmony, a few celesta notes like distant stars.
[02:05] It recedes to piano and pad.
[02:30] Solo piano with the motif, ending on a long, open E minor chord.
No drums, no percussion, no brass, no sound effects, no vocals. Instrumental.
```

### 7. 식어 가는 모루 — `bgm_anvil` (대기실 · 교역소 · 대장간)

드워프 대장간의 불이 꺼져 가는 밤. 흥겨운 행진 대신, 낮은 남성 허밍과 허디거디가 옛 노래를 부른다.

```text
Lyrical, solemn dwarven forge-hall theme for a dark-fantasy card game lobby. Mood: proud, heavy-hearted and nostalgic, dwarves humming an old song as the forge fires cool; dignified, not festive. Instruments: hurdy-gurdy, low wordless male choir humming, low whistle, cello, double bass, a soft anvil-like bell struck rarely, slow deep frame drum. Key of D Dorian minor, 4/4, about 80 BPM, steady and heavy. A sturdy, singable minor folk theme that returns at least three times, each time with more voices. Harmony: i - VII - IV - i, drones on D and A, modal ♭VII cadences.
[00:00] A hurdy-gurdy drone and its melody alone, slow and grave.
[00:20] Low male voices hum the theme underneath; a single bell rings.
[00:45] The low whistle takes the theme; cello and bass add a slow walking line; a deep drum marks every other beat.
[01:20] The fullest moment: choir, hurdy-gurdy, whistle and strings together, proud and sorrowful.
[01:55] It thins to hurdy-gurdy and humming.
[02:25] Hurdy-gurdy alone, ending on a long drone with one last bell.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 8. 멈춘 태엽 — `bgm_clockwork` (상점 · 덱 조정실)

노움의 시계탑이 멈춰 가는 소리. 반짝이는 오르골 무늬는 남기되 단조로, 느리게, 쓸쓸하게.

```text
Lyrical, bittersweet minimalist piece for a dark-fantasy card game shop. Mood: curious but melancholic, a gnome clock tower slowly winding down; delicate and a little eerie, not playful. Instruments: celesta, marimba, music-box-like piano, pizzicato low strings, solo clarinet in its low register, sustained cellos, very faint warm synth pad. Key of F minor, 4/4, about 96 BPM, ticking but unhurried. A short, catchy minor pattern of interlocking notes, repeated and layered, with a singable clarinet theme above that returns at least three times. Harmony: i - VI - III - VII, minimalist slow changes every two bars.
[00:00] Celesta alone with a ticking minor pattern.
[00:18] Marimba joins with an interlocking pattern; pizzicato strings tick the bass notes.
[00:40] The low clarinet sings the theme, sad and gentle, over the patterns.
[01:15] Sustained cellos add warmth; layers build to a full but soft texture.
[01:50] The patterns slow and drop out one by one, like gears stopping.
[02:30] Celesta alone again, slowing, ending on a long F minor chord.
No drum kit, no cymbals, no brass, no sound effects, no vocals. Instrumental.
```

### 10. 이끼 아래 잠든 숲 — `bgm_moss` (대기실 · 순례 지도)

트롤의 숲. 느긋함은 남기되 안개 낀 단조로. 기타와 알토 플루트가 오래된 숲 노래를 부른다.

```text
Lyrical, misty and melancholic forest theme for a dark-fantasy card game. Mood: slow, ancient and sorrowful, a sleeping forest under moss and fog; calm, not cheerful. Instruments: acoustic guitar, alto flute, kalimba, cello, soft low strings, very soft hand drum, a faint ambient pad. Key of A Aeolian minor, 4/4, about 68 BPM, gently swaying. A simple, earthy minor melody that returns at least three times. Harmony: i - VI - VII - i, i - v - iv, open voicings.
[00:00] Solo acoustic guitar with a slow fingerpicked minor pattern.
[00:20] The alto flute plays the melody, breathy and sad; a kalimba adds a few soft notes.
[00:50] A cello sings a countermelody; a soft hand drum keeps a slow pulse.
[01:25] Low strings swell under flute and cello, the fullest moment, warm but sorrowful.
[02:00] It thins to guitar and kalimba.
[02:30] Guitar alone, ending on a long A minor chord.
No cymbals, no drum kit, no brass, no sound effects, no vocals. Instrumental.
```

### 11. 물러가는 밀물 — `bgm_tide` (대기실 · 교역소)

인어의 바다. 보사노바 대신 썰물이 빠져나가는 느린 물결. 하프와 첼로가 그리움을 노래한다.

```text
Lyrical, longing ocean theme for a dark-fantasy card game lobby. Mood: nostalgic and sorrowful, the tide slowly drawing away from a moonlit shore; flowing and calm, not cheerful, not bossa nova. Instruments: harp, solo cello, piano playing rolling wave-like arpeggios, soft low strings, a distant wordless female voice humming very softly, faint ambient pad. Key of F-sharp minor, 4/4, about 70 BPM, flowing. A long, singing minor melody that returns at least three times. Harmony: i - VI - III - VII, i - iv - V, gentle suspensions.
[00:00] Harp alone with slow rolling minor arpeggios.
[00:20] A solo cello sings the melody over the harp.
[00:50] Piano joins with wave-like arpeggios; a distant soft voice hums a high line.
[01:25] Low strings swell; cello and strings carry the melody, the fullest moment, aching.
[02:00] It recedes to harp and cello.
[02:30] Harp alone, ending on a long F-sharp minor chord.
No drums, no cymbals, no brass, no sound effects, no lyrics. Instrumental.
```

### 13. 무너진 새벽성의 종 — `bgm_halo` (보관소 · 타이틀 번갈아)

천족의 성이 무너진 뒤의 성가. 숭고함은 남기되 장조의 찬란함 대신 단조의 애도.

```text
Lyrical, sacred and mournful chant for a dark-fantasy card game. Mood: solemn, holy grief, the bells of a fallen dawn citadel still ringing; reverent and vast, not bright. Instruments: wordless choir (low men's and soft women's voices, 'ah' and 'oo' only), pipe organ, distant church bells, low strings. Key of B minor, 4/4, about 58 BPM, free and slow. A simple chant-like minor theme sung in canon, each voice entering in turn; it returns at least three times. Harmony: modal minor, open fifths, suspensions, a plagal 'amen' cadence.
[00:00] A single distant bell, then low men's voices sing the theme alone.
[00:25] Women's voices enter in canon; the organ holds a low drone.
[00:55] More voices layer the canon; low strings add sustained minor chords.
[01:30] The fullest moment: choir, organ and strings, vast and grieving, bells tolling slowly.
[02:05] It thins to low voices and organ.
[02:30] Low voices alone with the theme, a last bell, ending on a long B minor chord that opens to B major.
No drums, no percussion except bells, no lyrics or words, no sound effects. Wide cathedral reverb.
```

### 16. 출정 전야의 랩소디 — `bgm_eve` (대기실) · 새 곡

싸움터로 떠나기 전날 밤. 피아노가 즉흥하듯 자유롭게 흐르고, 낮은 클라리넷과 비올라가 주제를 주고받는다. 구간 사이에 짧은 피아노 카덴차. 서정 쪽이 큰 느린 랩소디.

```text
Lyrical, solemn cinematic rhapsody for the lobby of a dark-fantasy card game, the night before a march to war. Mood: tender and grave at once, a quiet farewell with unbroken resolve; deeply emotional, never cheerful. Rhapsodic in form: free, improvisatory and episodic, with flexible rubato, phrases that surge forward and then hold back, and short free cadenzas between sections. Not a classical concert piece: a modern video-game film score. Instruments: grand piano with long reverb, low clarinet in its dark chalumeau register, solo viola, low strings, a distant solo French horn, low wordless male choir humming, a very faint dark ambient pad. Key of C-sharp minor, 4/4, about 58 BPM, very flexible. One simple, singable four-bar minor theme built on a falling sigh and a rising answer; it returns at least three times, each time with a thicker texture. Harmony: i - VI - III - VII, a sorrowful iv, suspended chords resolving downward, a Neapolitan colour before the climax.
[00:00] Solo piano alone: low octaves like a distant bell, then the theme as a single unaccompanied line, slow and free.
[00:22] The low clarinet takes the theme; the piano answers each phrase with a short rippling flourish, like someone improvising by candlelight.
[00:48] A solo viola joins in counterpoint with the clarinet; low strings hold a soft drone.
[01:12] A free piano cadenza: a sweeping arpeggio rising from the lowest register and falling back, ending on a held, unresolved chord.
[01:26] The strings enter in rich minor harmony and take the theme; the piano rolls broad arpeggios beneath; a distant horn calls; the choir hums the root and fifth.
[01:56] The climax: strings, horn and choir sing the theme in octaves over cascading piano, grand, mournful and resolute, never harsh.
[02:24] Everything falls away to piano and viola; the theme breaks into fragments, slower and slower.
[02:42] Solo piano alone with the theme once more, ending on a long C-sharp minor chord that briefly opens to C-sharp major.
No drums, no percussion, no cymbals, no electric guitar, no sudden loud hits, no sound effects, no lyrics. Instrumental, wide cinematic reverb.
```

## 4. 곡별 프롬프트 — 대전

### 4. 바람이 우는 들판 — `bgm_field` (대전)

두 군대가 마주 선 들판. 두둑의 울음과 프레임 드럼의 무거운 박.

```text
Lyrical, solemn battle theme for a dark-fantasy card game. Mood: grave and determined, two armies facing each other across a windswept field; tense and sorrowful, a steady march, not frantic action. Instruments: duduk, solo cello, low strings playing a repeated eighth-note ostinato, frame drums and a deep taiko played softly, distant horns, low wordless male choir. Key of A minor (harmonic minor colour), 4/4, about 84 BPM. A short, mournful minor theme that returns at least three times, each time heavier. Harmony: i - VI - VII - i, i - iv - V, a dark ♭II colour.
[00:00] A low string drone; the duduk plays the theme alone, aching.
[00:20] Low strings begin a quiet ostinato; frame drums enter softly with a slow steady pulse.
[00:45] The cello takes the theme; the duduk answers in counterpoint.
[01:15] Horns and low choir join; the drums grow heavier; the ostinato tightens.
[01:45] The climax: strings, horns and choir sing the theme together over the drums, grave and powerful, not chaotic.
[02:20] It drops to drums and duduk.
[02:40] The duduk alone with the theme, ending on a long A minor chord.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 5. 피로 새긴 맹세 — `bgm_oath` (대전)

옛 맹세를 지키려 싸우는 기사. 독주 바이올린의 비가 위로 낮은 현이 끊임없이 밀어붙인다.

```text
Lyrical, tragic and heroic battle theme for a dark-fantasy card game. Mood: an oath sworn in blood, grief and courage together; driving but noble, not frantic. Instruments: solo violin, low strings playing a relentless ostinato, solo cello, French horns, timpani rolls, deep soft drums, low wordless choir. Key of G minor, 4/4, about 76 BPM with a steady driving pulse. A soaring, singable minor theme that returns at least three times. Harmony: i - VI - III - VII, a sorrowful iv, a dark Neapolitan before the cadence.
[00:00] Solo violin alone with the theme, slow and grieving.
[00:20] Low strings start a quiet driving ostinato under the violin.
[00:45] Cello joins in counterpoint; deep drums mark the pulse.
[01:15] Horns enter with the theme; the choir hums; timpani rolls build.
[01:45] The climax: violins and horns in octaves, tragic and heroic.
[02:20] It falls back to the ostinato and solo violin.
[02:40] Solo violin alone, ending on a long G minor chord.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 6. 타들어 가는 심지 — `bgm_cinder` (대전)

고블린의 폭약 심지가 타 들어가는 긴장. 장난기 대신 불길한 7/8 박.

```text
Tense, dark and lyrical battle theme for a dark-fantasy card game, goblin faction. Mood: a fuse burning down in the dark, uneasy and sly but grave, not comic. Instruments: pizzicato strings, bassoon, low clarinet, a small snare played with brushes, deep soft drum, accordion in its low register, low sustained strings. Key of B minor, 7/8 (2+2+3), about 108 BPM. A short, sly minor theme that returns at least three times, growing darker each time. Harmony: i - ♭II - i, i - VI - V, harmonic minor tension.
[00:00] Pizzicato strings alone with a ticking 7/8 pattern.
[00:18] The bassoon plays the theme, low and sly.
[00:40] The accordion answers; a brushed snare and deep drum add the uneven pulse.
[01:15] Low strings and clarinet join; the texture thickens and tightens.
[01:45] The fullest moment: all instruments drive the theme, ominous and tense, not loud.
[02:20] It falls back to pizzicato and bassoon.
[02:35] A last pizzicato figure and a low held B minor chord.
No cymbals, no drum kit, no electric guitar, no sound effects, no vocals. Instrumental.
```

### 9. 가르운의 장송 북 — `bgm_stonedrum` (대전)

오크 전사들의 장송 행진. 큰 북이 무겁게 걷고, 낮은 허밍 합창이 쓰러진 자를 기린다.

```text
Lyrical, solemn war-drum theme for a dark-fantasy card game, orc faction. Mood: a funeral march of proud warriors, heavy, grieving and unbowed; powerful but slow, not wild. Instruments: large war drums and taiko, wooden flute, French horns, low strings, low wordless male choir humming and chanting 'oh' vowels. Key of D minor, 4/4, about 72 BPM, a heavy walking beat. A simple, chant-like minor theme that returns at least three times, each time with more voices. Harmony: i - VII - VI - VII, open fifths, i - iv - i.
[00:00] A single large drum beats slowly; the wooden flute plays the theme alone.
[00:20] Low male voices hum the theme; low strings hold a drone.
[00:45] More drums join in a heavy, slow pattern; horns answer the flute.
[01:15] The choir chants the theme over drums and strings, grave and proud.
[01:45] The climax: horns, choir, strings and drums together, mighty and mournful.
[02:20] It drops to one drum and the flute.
[02:40] The flute alone, a final drum hit, ending on a long D minor drone.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 12. 계약의 비가 — `bgm_abyss` (대전)

마족과의 계약. 탱고의 관능은 남기되 무겁고 어두운 비가로.

```text
Lyrical, dark and seductive lament for a dark-fantasy card game, demon faction. Mood: a pact sealed in shadow, sorrowful, dangerous and beautiful; slow and heavy, not lively. Instruments: bandoneon, solo violin, piano low register, low strings, double bass, soft deep drum. Key of C minor with Phrygian ♭II colour, 4/4 slow tango-like pulse, about 88 BPM. A sensual, aching minor theme that returns at least three times. Harmony: i - ♭II - i, a descending chromatic bass, diminished sevenths, Neapolitan chords.
[00:00] The bandoneon alone with the theme, slow and dark.
[00:20] Piano low notes and double bass mark a heavy, slow pulse.
[00:45] The solo violin answers the bandoneon; the two intertwine.
[01:15] Low strings swell; a soft deep drum joins.
[01:45] The climax: violin and bandoneon in octaves over full strings, tragic and passionate.
[02:20] It falls back to bandoneon and bass.
[02:40] The bandoneon alone, ending on a long C minor chord.
No cymbals, no drum kit, no electric guitar, no sound effects, no vocals. Instrumental.
```

### 14. 폭풍 앞의 질주 — `bgm_gale` (대전)

하이엘프의 바람. 빠른 6/8은 남기되 흥겨운 지그가 아니라 폭풍을 앞둔 비장한 질주.

```text
Lyrical, urgent and solemn battle theme for a dark-fantasy card game, high elf faction. Mood: riding hard before a great storm, fierce and sorrowful, not festive, not a jig. Instruments: low whistle, fiddle, celtic harp, bodhrán, low strings playing a rolling 6/8 ostinato, horns, low wordless choir. Key of E minor, 6/8, about 112 BPM. A sweeping minor theme that returns at least three times, each time faster in feeling and fuller. Harmony: i - VII - VI - VII, i - v - iv, modal minor.
[00:00] The low whistle alone with the theme, wistful.
[00:18] The bodhrán and low strings begin a rolling 6/8 pulse.
[00:40] The fiddle takes the theme; the harp plays fast arpeggios.
[01:10] Horns and low choir join; the pulse drives forward.
[01:40] The climax: fiddle, whistle, horns and choir sing the theme together, fierce and grieving.
[02:15] It falls back to whistle and bodhrán.
[02:35] Whistle alone, ending on a long E minor chord.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 15. 마지막 한 장 — `bgm_lastcard` (대전 · 온라인 · 결전)

모든 것을 건 마지막 한 장. 곡 대부분을 단조의 비장함으로 밀다가 맨 끝에만 잠깐 빛이 든다.

```text
Lyrical, epic and tragic final-battle theme for a fantasy card game. Mood: everything rides on the last card; desperate, heroic and sorrowful, with a single ray of hope at the very end. Instruments: grand piano, French horns, spiccato strings, low strings, timpani, deep taiko, wordless mixed choir. Key of C minor, 4/4, about 100 BPM, driving. A strong, singable minor theme that returns at least three times, each time grander. Harmony: i - VI - III - VII, i - iv - V, a Neapolitan before the climax, a final Picardy third.
[00:00] Solo piano alone with the theme, quiet and resolute.
[00:20] Spiccato strings begin a driving minor ostinato; low strings hold the bass.
[00:45] Horns take the theme; timpani and taiko mark the pulse.
[01:15] The choir enters with sustained 'ah'; the texture grows heavier and tenser.
[01:45] The climax: choir, horns and strings sing the theme fortissimo, tragic and heroic, never chaotic.
[02:20] Sudden drop to piano and soft strings, the theme fragile.
[02:35] One last swell, ending on a long C major chord: a brief light after the darkness.
No cymbals, no drum kit, no electric guitar, no sound effects, no lyrics. Instrumental.
```

### 17. 쓰러진 깃발의 랩소디 — `bgm_banner` (대전) · 새 곡

쓰러진 깃발을 다시 드는 싸움. 먼 호른 한 줄의 느린 비가로 시작해 점점 빨라져 몰아치고, 정점에서 다시 넓고 느리게 주제가 돌아온다(광시곡의 느림 → 빠름 꼴). 비장 쪽이 큰 랩소디.

```text
Lyrical, tragic and heroic cinematic rhapsody, a battle theme for a dark-fantasy card game: a fallen banner raised again. Mood: grief and defiance together, solemn, proud and unbroken; stirring but noble, never frantic or chaotic. Rhapsodic in form: a slow, free lament that gradually quickens into a fierce, driving middle section, then broadens into a grand return of the theme. Not a classical concert piece: a modern video-game film score. Instruments: solo French horn, cimbalom (hammered dulcimer) played dark and solemn, low strings, violins, deep soft war drums, timpani rolls, low wordless choir. Key of B-flat minor, 4/4, starting at about 66 BPM with rubato, accelerating to about 108 BPM, then returning to the slow tempo. One strong, singable four-bar minor theme built on a rising fifth and a slow stepwise fall; it returns at least three times, each time transformed. Harmony: i - VI - III - VII, a sorrowful iv, harmonic-minor tension at cadences, a dark Neapolitan before the climax.
[00:00] A lone French horn from afar plays the theme, slow and free, over a single low drone.
[00:20] The cimbalom answers with a trembling tremolo and a free falling flourish; low strings hold a dark chord.
[00:44] Cellos and violas sing the theme as a slow march; a deep drum beats like a heartbeat; the cimbalom ripples underneath.
[01:10] The tempo gradually quickens: low strings start a galloping ostinato, and fragments of the theme pass between horn and violins.
[01:36] The fast section, about 108 BPM: the theme transformed into a fierce, driving minor dance, violins and cimbalom in unison, drums pushing forward, horns answering; urgent but controlled.
[02:06] Suddenly broad and slow again: full strings, horns and choir sing the theme in octaves in its original form, tragic and defiant, the grandest moment.
[02:32] It falls away to a cimbalom tremolo over the low drone.
[02:46] The lone horn plays the theme once more, with one last soft deep drum, ending on a long B-flat minor chord.
No cymbals, no drum kit, no electric guitar, no trailer hits or booms, no sound effects, no lyrics. Instrumental, wide cinematic reverb.
```

## 5. 덤 — 카드 보기 거르개 클릭음 (`ui_filter`)

덱 조정실 · 보관소에서 **종류 · 등급 · 레벨** 거르개를 누를 때 나는 소리. 게임에는 이미 연결되어 있다(`js/feel.js` FILT: `.dv-k` 종류 · `.dv-g` 등급 · `.chip` 레벨 · `.cv-col` 레벨 곡선). `audio/sfx/ui_filter.*` 파일이 있으면 그것을, 없으면 탭 소리(`ui_tab`)를 낸다.

**Stable Audio Open용** (맥 `~/develop/stable-audio/extra.jsonl`, `SAO_SRC=extra.jsonl .venv/bin/python gen.py 0 100 fp16 common --redo`)
```text
a soft, low wooden tick of a small carved token being pressed into a slot of an old oak card box, with a faint muted low thud; warm, dark and quiet, short and clean, not bright, not metallic. About 0.15 seconds. Dark fantasy card game. Single isolated game sound effect, no music, no voice.
```
부정 프롬프트에 더함: `bright, high-pitched, metallic, clicky plastic, sharp`

**Gemini용** (효과음 여러 번을 한 파일로 받아 잘라 쓸 때)
```text
Sound effects only - no music, no melody, no chords, no rhythm loop, no voice or words.
Dark fantasy card game, interface sounds.
[00:00] Take 1: a soft, low wooden tick of a small carved token pressed into a slot of an old oak card box, with a faint muted low thud; warm, dark and quiet, not bright, not metallic. About 0.15 seconds.
[00:03] Take 2: the same sound, slightly varied.
[00:06] Take 3: the same sound, slightly varied.
[00:09] Silence until the end.
Clean, close, dry recording.
```

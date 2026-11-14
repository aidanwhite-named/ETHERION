/* ETHERION — 숨겨진 기록: 카일란 대륙 전도 (이스터에그)
   여는 법 (README에도 적어 둠):
     1) 타이틀 고리의 빈 자리(동쪽 "?", ETHERION의 O 안쪽)를 세 번 누른다.
     2) 게임 중이 아닐 때 키보드로 kailan 을 친다.
   지도 안에서 고리의 빈 자리를 누르면 세계관의 마지막 장(여덟 번째 자리)이 열린다.
   지명·설정은 세계관 v3(docs/WORLD.md)를 따른다 (모두 가칭). 긴 이야기는 연대기(js/chronicle.js)에 있다. 지도는 이 파일이 SVG로 그린다 (좌표 1200×900).
   발견 여부는 localStorage "etherion.kailan"에 저장한다. */
"use strict";

const Kailan = (() => {
  const PIC_MAP = "img/ui/map/kailan_map.jpg?v=1";   // v3.43 그림 지도 (그림 AI · 제미나이)
  /* v3.48.1 지도 바탕 그림(tools/art/prompts/map.md, 참고 그림과 겹쳐 맞음 — 1200×900 좌표에 그대로). 지형은 그림이 맡고, 코드는 고리 · 길 · 지점 · 이름만 얹는다.
     PC 2400×1800, 폰 · 앱 1600×1200(원본 4K는 tools/art/out/raw/ui/map/). null이면 예전처럼 코드가 지형까지 그린다 */
  const BASE_MAP = document.documentElement.classList.contains("mobile") ? "img/ui/map/kailan_base_m.jpg?v=1" : "img/ui/map/kailan_base.jpg?v=1";   // v3.43 그림 지도 (그림 AI · 제미나이)
  const KEY = "etherion.kailan";
  const W = 1200, H = 900;
  let st = {};
  try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { st = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* 저장 못 해도 진행 */ } };
  const h = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- 색 ---------- */
  const EL = { earth: "#d6a774", wind: "#9fe3d6", fire: "#ff7a4a", water: "#5fb8ff", forest: "#6fd07a", metal: "#b9c3d0", lightning: "#ffd84a" };
  const COL = { brass: "#d4893a", verdant: "#7cbc62", arcane: "#a982ea", neutral: "#cdb07a", realm: "#e8c46a", portal: "#8fdcff", terrain: "#a59c86", unknown: "#8a8699", giant: "#8b8578" };
  const KIND = { brass: "아다만트 연합", verdant: "푸른숲 맹약", arcane: "비술 성회", neutral: "중립" };

  /* ---------- 장소 (세계관 04 문서) ----------
     L 층, t 종류, f 색, x·y 좌표, lab [dx, dy, 정렬], n 이름, k 분류, d 설명, facts, g 단체, kw 카드 이름에서 찾을 말, el 원소 */
  const P = [
    { id: "brass", t: "region", f: "brass", x: 432, y: 276, n: "아다만트 연합", k: "진영 · 녹철 구릉", d: "신을 섬기지 않는 기술 진영. 이름의 아다만트는 잠든 거인의 몸이 수천 년 동안 굳어 생긴, 깨지지 않는 금속이다. 드워프, 노움, 고블린, 인간, 오토마톤이 증기와 마도공학으로 산다. 실력주의 사회라 발명 특허가 곧 신분이다.", facts: [["믿는 것", "신 없음. 승천자 「철의 심장을 삼킨 자」(브론)를 \"증명된 가능성\"으로 기림"], ["푸른숲 맹약", "인접 · 적대 (톱니 고개, 녹슨 늪)"], ["비술 성회", "단절 · 냉전 (등뼈 산맥에 막힘)"]], fac: "brass" },
    { id: "verdant", t: "region", f: "verdant", x: 470, y: 652, n: "푸른숲 맹약", k: "진영 · 에일렌 대삼림과 남서 해안", d: "오크, 트롤, 인어, 정령의 씨족 연합. 문자보다 노래로 역사를 전하고, 죽은 자는 나무 아래 묻어 숲으로 돌려보낸다.", facts: [["믿는 것", "실바레. 오크는 고르바스, 트롤은 베르단, 인어는 마렌시아와 맹약"], ["아다만트 연합", "인접 · 적대 (벌목과 오염)"], ["비술 성회", "바닷길 교역 · 우호"]], fac: "verdant" },
    { id: "arcane", t: "region", f: "arcane", x: 768, y: 340, n: "비술 성회", k: "진영 · 성좌 고원", d: "사방이 막힌 고원에서 홀로 발전한 진영. 마족과 천족, 하이엘프와 인간이 함께 산다. 별의 움직임으로 달력을 만들고 모든 계약을 문서로 남긴다. 빈 땅과 맞닿아 있어 스스로를 세계의 방패라 여긴다.", facts: [["믿는 것", "솔란테 · 모르카스 · 벨루미르"], ["땅", "성좌 고원은 거인 오르둔의 오른손바닥"], ["아다만트 연합", "단절 · 냉전"], ["푸른숲 맹약", "바닷길 교역 · 우호"]], fac: "arcane" },

    { id: "cogh", t: "capital", f: "brass", x: 370, y: 305, lab: [11, 5, "start"], n: "코그하번", k: "아다만트 연합 수도", d: "연합 의회가 있는 증기 도시. 녹물강 상류에 있어 공장 폐수가 남쪽 숲으로 흘러간다. 광장에 승천자 「철의 심장을 삼킨 자」의 거대한 기계 심장 기념비가 서 있다.", facts: [["관문", "위상 관문 (인공, 불안정)"]], kw: ["코그하번"] },
    { id: "durk", t: "city", f: "brass", x: 215, y: 365, lab: [10, 5, "start"], n: "두르크하임", k: "무쇠수염 드워프 · 강철 골렘 공방", d: "철골 산맥 동쪽 비탈을 파고 들어간 드워프 지하 도시. 광맥을 따라 점점 깊이 내려가며 용 페로스의 영역에 가까워지고 있다.", g: "B2", kw: ["두르크하임"] },
    { id: "volt", t: "city", f: "brass", x: 362, y: 236, lab: [10, 5, "start"], n: "볼타리움", k: "번개 노움 · 뇌전 학술원", d: "뇌명 고원 기슭의 피뢰탑 도시. 노움들이 고원 아래 거인 케라운의 번개를 캐고, 아스트라크의 번개까지 병에 담으려 한다. 대정령 즈라크가 이곳의 병에 갇혔다가 탈출한 적이 있다.", g: "B3", kw: ["볼타리움", "즈라크"] },
    { id: "fort", t: "city", f: "brass", x: 455, y: 372, lab: [-10, 5, "end"], n: "포르탄", k: "잿불 고블린 · 화약 포병단", d: "고블린과 인간 포병이 지키는, 톱니 고개를 내려다보는 최전선 요새. 포구가 늘 남쪽 숲을 향해 있다.", g: "B1", kw: ["포르탄"] },
    { id: "sylv", t: "capital", f: "verdant", x: 360, y: 575, lab: [-11, 5, "end"], n: "실바니엘", k: "이끼 트롤 · 고목 수호회 · 맹약의 회의 장소", d: "거목의 뿌리와 가지 사이에 지은 트롤의 숲 도시. 트롤들은 겨울이면 이끼를 덮고 나무와 함께 잠든다. 맹약의 씨족들이 모이는 회의가 이곳에서 열린다.", g: "G2", kw: ["실바니엘", "에일렌"] },
    { id: "garun", t: "city", f: "verdant", x: 505, y: 700, lab: [10, 5, "start"], n: "가르운 대야영지", k: "바위주먹 오크 · 바위송곳니 부족", d: "울부짖는 초원을 계절마다 늑대와 곰을 몰고 옮겨 다니는 오크들의 거대한 이동 야영지. 지도의 자리는 겨울 야영지다.", g: "G1", kw: ["가르운"] },
    { id: "selen", t: "city", f: "verdant", x: 338, y: 781, lab: [-10, 5, "end"], n: "셀레네아", k: "푸른비늘 인어 · 샘물 무녀단", d: "남서 해안 석호 위의 신전 도시. 물 위에는 무녀들이, 물 밑에는 인어족이 산다. 비술 성회로 가는 바닷길의 출발점이다.", g: "G3", kw: ["셀레네아", "석호"] },
    { id: "elad", t: "capital", f: "arcane", x: 765, y: 405, lab: [-15, 5, "end"], n: "새벽성 엘라드", k: "성광 천족 · 성광 기사단 · 비술 성회 수도", d: "흰 성벽의 성도. 성회 회의가 열린다. 지하에는 기사단이 봉인한 고대 관문이 있는데, 봉인한 이유는 비밀이다.", facts: [["섬기는 신", "솔란테"], ["관문", "새벽성 지하 관문 (봉인)"]], g: "A2", kw: ["엘라드", "새벽성", "솔란테"] },
    { id: "needle", t: "tower", f: "arcane", x: 812, y: 262, lab: [-10, 5, "end"], n: "벨루미르의 바늘", k: "폭풍 하이엘프 · 폭풍탑 마도회", d: "부유 군도에 닿을 만큼 높은 첨탑. 흔히 바늘탑, 또는 폭풍탑이라 부른다. 정상에서 바람을 읽고 별을 관측한다. 꼭대기의 관문은 결계령 하늘 요람으로 이어진다.", facts: [["섬기는 신", "벨루미르"]], g: "A3", kw: ["바늘탑", "벨루미르", "폭풍탑"] },
    { id: "noct", t: "city", f: "arcane", x: 784, y: 566, lab: [11, 5, "start"], n: "녹타르", k: "심연 마족 · 심연 계약단 · 모르크 협곡", d: "모르크 협곡 바닥에 있는 그림자 도시. 해가 들지 않는다. 협곡 가장 깊은 곳에 결계령 심연의 장막이 있다.", facts: [["섬기는 신", "모르카스"]], g: "A1", kw: ["녹타르", "모르크", "모르카스"] },
    { id: "linde", t: "capital", f: "neutral", x: 625, y: 764, lab: [-12, 24, "end"], n: "린데어 자유시", k: "중립 · 자유 교역 도시", d: "등뼈 산맥이 끝나는 남쪽 해안. 동서를 잇는 유일한 쉬운 길목이자 세 진영이 마주치는 곳. 상인 평의회가 다스린다. 운명의 신 크로네아의 작은 신전에서 상인과 도박사들이 기도한다.", facts: [["관문", "린데어 환석 (성로의 중심)"]] },

    { id: "spine", t: "label", f: "terrain", x: 652, y: 470, rot: 90, n: "오르둔의 등뼈", k: "산맥", d: "대륙 중앙을 남북으로 가르는 산맥. 거인 오르둔의 등뼈가 땅 위로 드러난 것이다. 동서를 막아 비술 성회를 고립시켰다.", facts: [["넘는 길", "남쪽 끝 린데어, 폐쇄된 잿바람 협로"]] },
    { id: "rib", t: "label", f: "terrain", x: 300, y: 446, n: "갈비 능선", k: "산맥", d: "등뼈에서 서쪽으로 뻗은 능선. 오르둔의 갈비뼈다. 아다만트 연합과 푸른숲 맹약을 가른다." },
    { id: "pass", t: "label", f: "terrain", x: 476, y: 424, n: "톱니 고개", k: "고개 · 최전선", d: "갈비 능선이 끊긴 틈. 녹물강이 이곳을 지나 남쪽으로 흐른다. 아다만트와 푸른숲의 군대가 가장 자주 부딪히는 곳." },
    { id: "ashpass", t: "x", f: "terrain", x: 591, y: 300, lab: [11, 5, "start"], n: "잿바람 협로", k: "산길 · 폐쇄", d: "등뼈 산맥을 가로지르는 유일한 산길. 눈사태로 막혔다고 하지만 밀수꾼들은 아직 쓴다. 아다만트와 비술의 첩자들이 오가는 길." },
    { id: "throne", t: "label", f: "terrain", x: 590, y: 142, n: "왕좌봉", k: "산 · 대륙 최고봉", d: "오르둔의 머리. 용 고르바스의 거처. 최근 이 일대에 지진이 잦다.", kw: ["왕좌봉"] },
    { id: "iron", t: "label", f: "terrain", x: 168, y: 596, n: "철골 산맥", k: "산맥", d: "서쪽의 검은 산맥. 금속 광맥이 바위 밖으로 드러나 있다. 거인 소르그림의 팔이 굳은 산맥이라, 드러난 광맥은 그의 힘줄이다. 용 페로스가 그 속 깊은 곳에 산다.", facts: [["거인", "소르그림 · 힘줄과 쇠"]], kw: ["철골", "소르그림"] },
    { id: "crown", t: "label", f: "terrain", x: 948, y: 766, n: "화관 산맥", k: "화산 산맥", d: "늘 연기를 뿜는 남동쪽 화산 산맥. 그 아래에 거인 도르마크의 가슴이 묻혀 있어, 화산의 불은 그의 식지 않은 심장불이다. 용 이그날의 거처. 재앙수 마그로스가 이곳에서 태어났다.", facts: [["거인", "도르마크 · 심장불"]], kw: ["화관", "도르마크"] },
    { id: "ancient", t: "label", f: "terrain", x: 214, y: 634, n: "태고림 산맥", k: "산맥 · 숲", d: "세계 최초의 숲이 덮은 산맥. 용 베르단의 거처.", kw: ["태고림", "첫 고목"] },
    { id: "thunder", t: "label", f: "terrain", x: 296, y: 124, n: "뇌명 고원", k: "고원", d: "번개가 멈추지 않는 고원. 고원 아래에 거인 케라운이 누워 있어, 번개가 그의 신경을 타고 땅 위로 튄다. 용 아스트라크의 거처이자 녹물강의 발원지.", facts: [["거인", "케라운 · 신경과 번개"]], kw: ["뇌명", "케라운"] },
    { id: "isles", t: "label", f: "terrain", x: 940, y: 214, anchor: "start", n: "아우라곤의 파편 군도", k: "부유 산맥", d: "하늘에 떠 있는 섬들. 거인 아우라곤의 흩어진 몸의 파편이다. 용 시렐이 산다.", kw: ["파편 군도", "아우라곤", "하늘 요람"] },
    { id: "ailen", t: "label", f: "terrain", x: 420, y: 512, n: "에일렌 대삼림", k: "숲", d: "푸른숲 맹약의 중심 숲. 한가운데에 첫 고목이 있다. 북쪽 가장자리는 아다만트의 벌목으로 해마다 줄어든다.", kw: ["에일렌"] },
    { id: "blackwood", t: "label", f: "terrain", x: 702, y: 470, n: "검은 가지 숲", k: "숲", d: "모르크 협곡 위쪽의 잎 없는 검은 숲. 심연 계약단의 수련장." },
    { id: "rust", t: "label", f: "terrain", x: 504, y: 470, anchor: "start", n: "녹슨 늪", k: "늪 · 분쟁 지대", d: "원래 맑은 습지였으나 녹물강 오염으로 붉게 변했다. 아다만트와 푸른숲이 가장 자주 부딪히는 분쟁 지대." },
    { id: "dead", t: "label", f: "terrain", x: 700, y: 655, n: "망자의 늪", k: "늪", d: "협곡 남쪽의 안개 늪. 언데드가 떠돌고, 심연 계약단이 그 일부를 부린다." },
    { id: "steppe", t: "label", f: "terrain", x: 486, y: 760, n: "울부짖는 초원", k: "초원", d: "바위주먹 오크가 떠도는 남쪽 초원. 바람이 늑대 울음처럼 분다.", kw: ["울부짖는"] },
    { id: "desert", t: "label", f: "terrain", x: 756, y: 702, n: "아샤라 사막", k: "사막", d: "린데어와 성좌 고원 사이의 붉은 사막. 성회로 가는 육로는 이 사막을 건너야 한다. 사막은 거인 아샤르의 살갗이다. 아샤르 위에는 어떤 용도 살지 않는다. 모래에 반쯤 묻힌 고대 관문이 있다.", facts: [["거인", "아샤르 · 살갗과 모래"]], kw: ["아샤르"] },
    { id: "river", t: "label", f: "terrain", x: 398, y: 672, rot: -80, n: "녹물강", k: "강", d: "뇌명 고원에서 발원해 코그하번을 지나 톱니 고개를 넘어 숲으로 흐르는 강. 하류로 갈수록 녹과 기름에 오염된다." },
    { id: "wall", t: "label", f: "terrain", x: 940, y: 424, rot: 90, n: "황혼의 장벽", k: "방어선", d: "성좌 고원 동쪽 끝을 따라 세운 거대한 성벽. 빈 땅을 마주하며 성광 기사단이 지킨다." },
    { id: "trench", t: "label", f: "terrain", x: 520, y: 878, sea: true, n: "탈라쿠스 해구", k: "해구", d: "남쪽 바다 밑의 해저 산맥과 해구. 거인 탈라쿠스의 심장이 있는 자리이자 용 마렌시아의 거처.", kw: ["탈라쿠스"] },

    { id: "gorvas", t: "dragon", el: "earth", x: 634, y: 96, lab: [16, 5, "start"], n: "고르바스", k: "칠룡 · 대지 · 북", d: "왕좌봉에 산다. 칠룡 중 가장 큰 덩치로, 등에 바위와 숲이 자란다. 느긋해서 한 번 잠들면 수백 년을 잔다.", facts: [["용역", "왕좌봉 (오르둔의 머리)"], ["필멸자", "바위주먹 오크가 조상처럼 모시고 맹약함"], ["대정령", "그롬"]], kw: ["고르바스", "그롬"] },
    { id: "sirel", t: "dragon", el: "wind", x: 870, y: 152, lab: [0, -18, "middle"], n: "시렐", k: "칠룡 · 바람 · 북동", d: "아우라곤의 파편 군도에 산다. 변덕스럽고 장난기가 많으며, 몸이 반쯤 바람이다. 결계령 하늘 요람을 지킨다.", facts: [["필멸자", "폭풍탑 마도회가 그의 바람을 연구함"], ["대정령", "실피스"]], kw: ["시렐", "실피스"] },
    { id: "ignal", t: "dragon", el: "fire", x: 905, y: 698, lab: [16, 5, "start"], n: "이그날", k: "칠룡 · 화염 · 남동", d: "화관 산맥에 산다. 격정적이고 솔직하다. 비늘 사이로 용암이 흐른다.", facts: [["필멸자", "화약 포병단은 그를 우러르지만, 그 발밑의 거인 도르마크를 캐 가는 포르탄을 이그날은 미워함"], ["대정령", "이프라"]], kw: ["이그날", "이프라"] },
    { id: "maren", t: "dragon", el: "water", x: 555, y: 836, lab: [16, 5, "start"], n: "마렌시아", k: "칠룡 · 물 · 남", d: "탈라쿠스 해구, 거인의 심장 곁에 산다. 차분하고 오래 기억한다. 날개 대신 지느러미가 있다.", facts: [["필멸자", "푸른비늘 인어와 맹약한 수호자. 샘물 무녀단과 가까움"], ["대정령", "넬리아"]], kw: ["마렌시아", "넬리아"] },
    { id: "verdan", t: "dragon", el: "forest", x: 262, y: 712, lab: [-16, 5, "end"], n: "베르단", k: "칠룡 · 숲 · 남서", d: "태고림 산맥에 산다. 온화하고 보호 본능이 강하다. 뿔이 고목 가지이고 비늘에 이끼가 덮였다.", facts: [["필멸자", "이끼 트롤의 오랜 동반자. 트롤과 맹약해 함께 숲을 지킴"], ["대정령", "드리엔"]], kw: ["베르단", "드리엔"] },
    { id: "feros", t: "dragon", el: "metal", x: 152, y: 468, lab: [0, 26, "middle"], n: "페로스", k: "칠룡 · 금속 · 서", d: "철골 산맥 깊은 광맥 속에 산다. 날지 않는 유일한 용. 과묵한 장인 기질이고, 비늘이 거울처럼 빛을 되비친다.", facts: [["필멸자", "두르크하임의 드워프들이 점점 가까이 파고드는 것을 지켜보고 있음"], ["대정령", "코발"]], kw: ["페로스", "코발"] },
    { id: "astrak", t: "dragon", el: "lightning", x: 286, y: 184, lab: [0, 26, "middle"], n: "아스트라크", k: "칠룡 · 번개 · 북서", d: "뇌명 고원에 산다. 칠룡 중 가장 빠르고 성급하다. 몸에서 늘 번개가 튄다.", facts: [["필멸자", "뇌전 학술원이 고원 아래 거인 케라운의 번개를 캐고 병에 가두려 해서 사이가 나쁨"], ["대정령", "즈라크"]], kw: ["아스트라크"] },
    { id: "eighth", t: "eighth", x: 1016, y: 452, n: "여덟 번째 자리", k: "칠룡의 고리 · 동 · 빈 자리", d: "고리의 동쪽. 용이 없는 자리다. 오블리온이 남긴 빈 땅이 그 자리를 채우고 있고, 일곱 용은 이쪽을 바라보지 않는다." },
    { id: "ordun", t: "label", f: "giant", x: 548, y: 178, anchor: "end", n: "오르둔의 잠든 몸", k: "태초의 거인 · 대지와 뼈", kw: ["오르둔"], d: "대륙 중앙에 남북으로 묻혀 잠든 거인. 머리는 왕좌봉, 등뼈는 산맥, 갈비는 갈비 능선, 오른손바닥은 성좌 고원이다. 몸은 산맥 하나 크기지만 자신이 빚은 땅 전체와 이어져 있어, 뒤척이면 대륙이 흔들린다.", facts: [["떡밥", "최근 왕좌봉 일대에 지진이 잦아짐"]] },
    { id: "talak", t: "label", f: "giant", x: 880, y: 892, sea: true, n: "탈라쿠스의 잠든 몸", k: "태초의 거인 · 바다와 피", d: "남쪽 침몰해 바닥에 누워 잠든 거인. 해구가 그의 심장이고, 조수는 그의 맥박이다.", facts: [["떡밥", "맥박이 점점 빨라지고 있음"]], kw: ["탈라쿠스"] },

    { id: "silvar", t: "realm", x: 476, y: 546, lab: [10, 5, "start"], n: "실바르온", k: "결계령 · 영원의 숲", d: "첫 고목을 통해서만 들어갈 수 있는 트롤의 숨은 숲. 시간이 바깥보다 열 배 느리게 흐른다.", facts: [["입구", "첫 고목"], ["만든 이", "이끼 트롤과 베르단"]], kw: ["실바르온"] },
    { id: "veil", t: "realm", x: 806, y: 598, lab: [10, 5, "start"], n: "심연의 장막", k: "결계령", d: "계약이 맺어지는 그림자의 세계. 들어간 자는 반드시 무언가를 두고 나온다.", facts: [["입구", "모르크 협곡 가장 깊은 곳"], ["만든 이", "모르카스"]], kw: ["장막", "심연의 문"] },
    { id: "cradle", t: "realm", x: 885, y: 96, lab: [11, 5, "start"], n: "하늘 요람", k: "결계령", d: "가장 높은 부유섬 위의 공간. 아우라곤의 심장이 있던 자리라는 설이 있다. 시렐이 지킨다.", facts: [["입구", "벨루미르의 바늘 꼭대기 관문"], ["만든 이", "미상"]], kw: ["하늘 요람"] },
    { id: "prison", t: "realm", x: 1084, y: 456, lab: [0, 24, "middle"], n: "회색 감옥", k: "결계령", d: "빈 땅 깊은 곳의 결계. 공허의 무언가를 가두고 있다. 무엇인지는 어떤 기록에도 없다.", facts: [["만든 이", "세렌과 고대의 성광 기사단"]] },
    { id: "nerea", t: "realm", x: 300, y: 858, lab: [11, 5, "start"], sea: true, n: "잠긴 왕국 네레아", k: "결계령", d: "두 용의 싸움으로 바다에 가라앉은 대륙. 칠룡이 함께 봉인했다. 아무도 들어간 적이 없다.", facts: [["만든 이", "칠룡"]], kw: ["네레아"] },
    { id: "ibel", t: "q", x: 1160, y: 34, lab: [-14, 5, "end"], n: "이벨의 서고", k: "결계령 · 위치 불명", d: "세계의 모든 기록이 있다는 끝없는 도서관. 입구가 어디인지 아무도 모른다. 폭풍탑 마도회가 수백 년째 찾고 있다.", facts: [["만든 이", "삼좌 이벨"]] },

    { id: "p_linde", t: "portal", x: 652, y: 746, lab: [12, 4, "start"], n: "린데어 환석", k: "관문 · 작동", d: "성로의 중심 관문. 대륙 곳곳의 환석과 이어진다. 자유시가 통행세를 받는다.", facts: [["성로", "누가 만들었는지 모르는 고대 관문망. 삼좌 설과 거인 설이 있음"]] },
    { id: "p_tree", t: "portal", x: 440, y: 535, lab: [-10, -6, "end"], n: "첫 고목", k: "성지 · 관문 · 작동", d: "에일렌 대삼림 한가운데의 가장 오래된 나무. 결계령 실바르온으로 가는 문이다. 이끼 트롤만 통과할 수 있다.", kw: ["첫 고목"] },
    { id: "p_needle", t: "portal", x: 836, y: 246, n: "바늘 꼭대기 관문", k: "관문 · 작동", d: "벨루미르의 바늘 꼭대기에 있는 관문. 하늘 요람으로 이어진다." },
    { id: "p_elad", t: "portal", x: 789, y: 428, n: "새벽성 지하 관문", k: "관문 · 봉인", d: "새벽성 지하의 고대 관문. 성광 기사단이 봉인했다. 이유는 비밀이다." },
    { id: "p_sand", t: "portal", x: 790, y: 728, lab: [10, 5, "start"], n: "모래 관문", k: "관문 · 잠듦", d: "아샤라 사막의 모래에 반쯤 묻힌 고대 관문. 지금은 작동하지 않는다." },
    { id: "p_foot", t: "portal", x: 232, y: 98, lab: [10, 5, "start"], n: "발자국 관문", k: "관문 · 잠듦", d: "거인의 발자국 호수 사이에 서 있는 환석. 미지 영역 안에 있어 가 본 사람이 드물다." },
    { id: "p_void", t: "portal", x: 1010, y: 360, lab: [10, 5, "start"], n: "빈 땅 관문", k: "관문 · 죽음(?)", d: "에테르가 없는 땅이라 작동할 수 없어야 하지만, 가끔 빛이 보인다. 무언가가 거꾸로 쓰고 있다는 소문이 있다." },
    { id: "p_phase", t: "portal", x: 376, y: 332, lab: [10, 12, "start"], n: "위상 관문", k: "관문 · 인공 · 불안정", d: "아다만트 연합이 환석을 흉내 내 만든 인공 관문. 신비 없이 기술로 만든 유일한 관문이다. 성로에 제대로 이어지지 않아 사고가 잦다." },

    { id: "tundra", t: "label", f: "unknown", x: 400, y: 42, cls: "unk", n: "백야의 동토", k: "미지 영역 · 북", d: "왕좌봉 너머의 얼어붙은 땅. 해가 지지 않는 계절이 있다. 돌아온 탐험대가 거의 없다." },
    { id: "foot", t: "label", f: "unknown", x: 214, y: 146, cls: "ter", n: "거인의 발자국", k: "미지 영역 · 북서", d: "거대한 발 모양의 호수들. 거인 아우라곤이 마지막으로 디딘 자리라고 전해진다." },
    { id: "noname", t: "label", f: "unknown", x: 1086, y: 66, cls: "ter", n: "무명 산맥", k: "미지 영역 · 북동 끝", d: "부유 군도 너머. 지도에 제대로 그려진 적이 없는 산맥." },
    { id: "void", t: "label", f: "unknown", x: 1094, y: 300, cls: "unk", n: "빈 땅", k: "미지 영역 · 동", d: "공허의 존재 오블리온이 남긴 땅. 색이 없고, 아무것도 자라지 않으며, 마법이 작동하지 않는다. 칠룡의 고리에서 비어 있는 동쪽 자리다.", facts: [["안에 있는 것", "회색 감옥, 빈 땅 관문"]] },
    { id: "fog", t: "label", f: "unknown", x: 50, y: 450, rot: 90, sea: true, n: "안개 바다", k: "미지 영역 · 서", d: "서쪽 대양. 나간 배가 돌아오지 않는다." },
    { id: "sunk", t: "label", f: "unknown", x: 760, y: 870, sea: true, n: "침몰해", k: "미지 영역 · 남", d: "해구 너머의 깊은 바다. 두 용의 싸움으로 가라앉은 대륙이 이 아래에 봉인되어 있다." }
  ];
  const PI = {}; P.forEach(o => { PI[o.id] = o; });
  const GROUP_CITY = { B1: "fort", B2: "durk", B3: "volt", G1: "garun", G2: "sylv", G3: "selen", A1: "noct", A2: "elad", A3: "needle" };
  const RING = ["gorvas", "sirel", "eighth", "ignal", "maren", "verdan", "feros", "astrak"];
  const colorOf = o => o.t === "dragon" ? EL[o.el] : o.t === "eighth" ? "#8a8699" : o.t === "realm" || o.t === "q" ? COL.realm : o.t === "portal" ? COL.portal : COL[o.f] || COL.terrain;

  /* ---------- 그리기 도구 ---------- */
  function rng(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const R = rng(20261104), rnd = (a, b) => a + (b - a) * R(), n1 = v => (+v).toFixed(1);
  const poly = pts => pts.map((p, i) => (i ? "L" : "M") + n1(p[0]) + "," + n1(p[1])).join("");
  function roughen(pts, levels, amp) {
    let cur = pts;
    for (let l = 0; l < levels; l++) {
      const out = [];
      for (let i = 0; i < cur.length - 1; i++) {
        const a = cur[i], b = cur[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, o = (R() - .5) * 2 * amp * L;
        out.push(a, [(a[0] + b[0]) / 2 - dy / L * o, (a[1] + b[1]) / 2 + dx / L * o]);
      }
      out.push(cur[cur.length - 1]); cur = out;
    }
    return cur;
  }
  function inPoly(x, y, pts) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function inEll(x, y, cx, cy, rx, ry) { const a = (x - cx) / rx, b = (y - cy) / ry; return a * a + b * b <= 1; }
  function scatter(cx, cy, rx, ry, n, minD) {
    const out = [];
    for (let k = 0; out.length < n && k < n * 40; k++) {
      const x = rnd(cx - rx, cx + rx), y = rnd(cy - ry, cy + ry);
      if (!inEll(x, y, cx, cy, rx, ry)) continue;
      if (minD && out.some(p => (p[0] - x) ** 2 + (p[1] - y) ** 2 < minD * minD)) continue;
      out.push([x, y]);
    }
    return out;
  }
  function along(pts, step) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / step));
      for (let j = 0; j < n; j++) { const t = j / n; out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, -(b[1] - a[1]) / L, (b[0] - a[0]) / L]); }
    }
    const l = pts[pts.length - 1]; out.push([l[0], l[1], 0, 0]);
    return out;
  }
  function blob(cx, cy, r, n, sx) {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = r * rnd(.7, 1.1); pts.push([cx + Math.cos(a) * rr * (sx || 1.4), cy + Math.sin(a) * rr]); }
    return poly(pts) + "Z";
  }
  /* 점들을 지나는 닫힌 곡선 (Catmull-Rom) → 구간별 베지어 */
  function ringSegs(pts) {
    const n = pts.length, seg = [];
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      seg.push(`M${n1(p1[0])},${n1(p1[1])}C${n1(c1[0])},${n1(c1[1])} ${n1(c2[0])},${n1(c2[1])} ${n1(p2[0])},${n1(p2[1])}`);
    }
    return seg;
  }

  /* ---------- 지도 ---------- */
  const COAST_KEY = [[1200, 752], [1150, 768], [1100, 796], [1060, 792], [1010, 786], [975, 800], [930, 796], [880, 790], [840, 782], [790, 776], [745, 786], [700, 794], [664, 788], [640, 776], [612, 790], [588, 800], [545, 806], [500, 798], [455, 802], [410, 806], [372, 800], [352, 792], [338, 798], [318, 800], [290, 793], [250, 782], [215, 768], [185, 748], [160, 720], [140, 690], [128, 650], [116, 610], [104, 570], [110, 530], [98, 490], [104, 450], [96, 410], [106, 370], [100, 330], [112, 290], [104, 250], [116, 210], [110, 170], [124, 130], [122, 90], [134, 55], [140, 25], [146, -2]];
  let COAST = null, LANDPTS = null;

  /* bare: 지점 · 이름 · 나침반 · 제목 없이 땅과 물과 고리와 성로만 (v3.26 성로 순례 화면의 바탕 지도) */
  function mapSVG(bare) {
    if (!COAST) { COAST = roughen(COAST_KEY, 3, .2); LANDPTS = [[146, -40], [1240, -40], [1240, 752]].concat(COAST); }
    const o = [];
    const add = s => o.push(s);
    const LAND = poly(LANDPTS) + "Z";

    add(`<defs>
      <radialGradient id="klSea" cx="50%" cy="48%" r="75%"><stop offset="0" stop-color="#0d1a2c"/><stop offset=".6" stop-color="#08101c"/><stop offset="1" stop-color="#04070d"/></radialGradient>
      <linearGradient id="klLand" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#1c1b1f"/><stop offset=".5" stop-color="#1b1914"/><stop offset="1" stop-color="#171812"/></linearGradient>
      <linearGradient id="klRiver" gradientUnits="userSpaceOnUse" x1="0" y1="150" x2="0" y2="792"><stop offset="0" stop-color="#7cc6e8"/><stop offset=".42" stop-color="#8fb2b8"/><stop offset=".56" stop-color="#b8744a"/><stop offset="1" stop-color="#9a5a36"/></linearGradient>
      <linearGradient id="klVoid" x1="0" x2="1"><stop offset="0" stop-color="#3a3a40" stop-opacity="0"/><stop offset=".2" stop-color="#34343a" stop-opacity=".85"/><stop offset="1" stop-color="#2c2c31" stop-opacity=".95"/></linearGradient>
      <linearGradient id="klSnow" x1="0" x2="0" y1="0" y2="1"><stop offset=".3" stop-color="#cfd8e6" stop-opacity=".2"/><stop offset="1" stop-color="#cfd8e6" stop-opacity="0"/></linearGradient>
      <radialGradient id="klTB"><stop offset="0" stop-color="#d4893a" stop-opacity=".22"/><stop offset="1" stop-color="#d4893a" stop-opacity="0"/></radialGradient>
      <radialGradient id="klTG"><stop offset="0" stop-color="#6fae55" stop-opacity=".2"/><stop offset="1" stop-color="#6fae55" stop-opacity="0"/></radialGradient>
      <radialGradient id="klTA"><stop offset="0" stop-color="#9b6ddb" stop-opacity=".24"/><stop offset="1" stop-color="#9b6ddb" stop-opacity="0"/></radialGradient>
      ${Object.entries(EL).map(([k, c]) => `<radialGradient id="klG-${k}"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset=".4" stop-color="${c}" stop-opacity=".25"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join("")}
      <clipPath id="klClip"><path d="${LAND}"/></clipPath>
      <filter id="klBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>
      <filter id="klSoft"><feGaussianBlur stdDeviation="2.2"/></filter>
    </defs>`);

    /* 바다 */
    add(`<rect x="-1400" y="-1200" width="4000" height="3300" fill="url(#klSea)"/>`);
    if (BASE_MAP) add(`<image href="${BASE_MAP}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none" pointer-events="none"/>`);
    if (!BASE_MAP) {
    let gr = "";
    for (let x = 0; x <= W; x += 100) gr += `M${x},-400V1300`;
    for (let y = 0; y <= H; y += 100) gr += `M-600,${y}H1800`;
    add(`<path d="${gr}" stroke="#d9b46a" stroke-opacity=".045" stroke-width="1" fill="none"/>`);
    let wv = "";
    for (let k = 0, made = 0; k < 400 && made < 70; k++) {
      const x = rnd(-60, W + 60), y = rnd(-20, H + 40);
      if (inPoly(x, y, LANDPTS) || inPoly(x, y - 14, LANDPTS) || inPoly(x + 18, y, LANDPTS)) continue;
      wv += `M${n1(x - 10)},${n1(y)}q5,-4 10,0q5,4 10,0`; made++;
    }
    add(`<path d="${wv}" fill="none" stroke="#5f7d99" stroke-opacity=".35" stroke-width="1" stroke-linecap="round"/>`);
    /* 해구와 잠긴 땅 */
    add(`<ellipse cx="555" cy="852" rx="96" ry="11" fill="#030509" opacity=".85"/><ellipse cx="555" cy="852" rx="120" ry="17" fill="none" stroke="#2b4a66" stroke-opacity=".6" stroke-dasharray="2 4"/>`);
    add(`<path d="${blob(250, 872, 46, 14, 1.9)}" fill="none" stroke="#2f5070" stroke-opacity=".55" stroke-dasharray="3 5"/>`);
    /* 해안선 빛 (안쪽 반은 땅이 덮는다) */
    const cpath = poly(COAST);
    add(`<path d="${cpath}" fill="none" stroke="#8fdcff" stroke-opacity=".05" stroke-width="34" stroke-linejoin="round"/>`);
    add(`<path d="${cpath}" fill="none" stroke="#8fdcff" stroke-opacity=".07" stroke-width="18" stroke-linejoin="round"/>`);
    add(`<path d="${cpath}" fill="none" stroke="#d9b46a" stroke-opacity=".22" stroke-width="7" stroke-linejoin="round"/>`);
    /* 작은 섬 */
    [[66, 640, 9], [84, 666, 6], [770, 832, 8], [808, 846, 5], [1060, 832, 10], [690, 838, 5]].forEach(([x, y, r]) => {
      add(`<path d="${blob(x, y, r, 9)}" fill="url(#klLand)" stroke="#d9b46a" stroke-opacity=".7" stroke-width="1"/>`);
    });
    /* 땅 */
    add(`<path d="${LAND}" fill="url(#klLand)"/>`);
    add(`<g clip-path="url(#klClip)">`);
    add(`<circle cx="390" cy="318" r="260" fill="url(#klTB)"/><circle cx="410" cy="650" r="280" fill="url(#klTG)"/><circle cx="772" cy="430" r="240" fill="url(#klTA)"/>`);
    add(`<rect x="0" y="-40" width="${W + 40}" height="150" fill="url(#klSnow)"/>`);
    let sn = "";
    for (let i = 0; i < 70; i++) { const x = rnd(160, 1190), y = rnd(4, 64); sn += `M${n1(x - 2.5)},${n1(y)}h5M${n1(x)},${n1(y - 2.5)}v5`; }
    add(`<path d="${sn}" stroke="#cfd8e6" stroke-opacity=".35" stroke-width=".8"/>`);
    /* 빈 땅 */
    add(`<path d="M915 212C960 202 1050 208 1240 196L1240 760C1100 668 1010 652 930 642C945 560 935 470 940 400C944 330 925 260 915 212Z" fill="url(#klVoid)"/>`);
    let ck = "";
    for (let i = 0; i < 30; i++) { const x = rnd(975, 1190), y = rnd(236, 640); ck += `M${n1(x)},${n1(y)}l${n1(rnd(-14, 14))},${n1(rnd(6, 14))}l${n1(rnd(-10, 10))},${n1(rnd(6, 12))}`; }
    add(`<path d="${ck}" fill="none" stroke="#6a6874" stroke-opacity=".7" stroke-width=".9"/>`);
    add(`</g>`);
    add(`<path d="${cpath}" fill="none" stroke="#e2c27c" stroke-opacity=".75" stroke-width="1.3" stroke-linejoin="round"/>`);
    /* 석호 (셀레네아) */
    add(`<ellipse cx="322" cy="784" rx="20" ry="8" fill="#0e2034" stroke="#8fdcff" stroke-opacity=".4"/>`);

    }

    /* 진영 경계 */
    const reg = [
      ["#d4893a", "M200 250C260 238 360 236 430 246C500 252 545 258 568 300C578 340 574 370 575 396L480 393L420 397C360 402 300 405 205 416C196 380 192 320 200 250Z"],
      ["#7cbc62", "M204 430C280 424 360 416 420 412L575 416C582 470 578 560 574 640C570 700 566 735 556 770C510 785 450 792 390 793C330 790 290 780 250 752C222 720 210 690 206 640C202 580 200 500 204 430Z"],
      ["#a982ea", "M640 252C700 232 790 228 905 255C916 330 912 420 912 500C912 545 911 575 908 592C860 606 790 612 720 600C680 590 650 568 640 540C630 480 628 400 636 330Z"]
    ];
    reg.forEach(([c, d]) => add(`<path d="${d}" fill="${c}" fill-opacity=".04" stroke="${c}" stroke-opacity=".45" stroke-width="1.2" stroke-dasharray="7 5"/>`));

    if (!BASE_MAP) {
    /* 녹물강 */
    const RIVER = "M300 150C315 190 340 245 368 300C390 340 430 360 450 402C462 428 452 445 455 458C462 500 430 530 432 565C434 610 420 650 410 690C402 730 396 760 395 794";
    add(`<path d="${RIVER}" fill="none" stroke="url(#klRiver)" stroke-width="2.8" stroke-linecap="round" opacity=".9"/>`);
    add(`<path d="M455 458C470 470 486 470 498 480" fill="none" stroke="url(#klRiver)" stroke-width="1.4" opacity=".6"/>`);
    /* 거인의 발자국 */
    [[190, 78, -20], [244, 52, -10]].forEach(([x, y, r]) => {
      add(`<g transform="rotate(${r} ${x} ${y})" fill="#0e1d2e" stroke="#8fdcff" stroke-opacity=".45" stroke-width=".9"><ellipse cx="${x}" cy="${y + 6}" rx="10" ry="17"/>${[-8, -3, 2, 7].map((d, i) => `<circle cx="${x + d}" cy="${y - 16 + (i % 3 === 0 ? 2 : 0)}" r="3"/>`).join("")}</g>`);
    });
    /* 사막 */
    add(`<g fill="#c99a5a" opacity=".55">${scatter(762, 714, 90, 42, 240).map(([x, y]) => `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(rnd(.4, 1))}"/>`).join("")}</g>`);
    add(`<path d="${[[720, 700], [780, 690], [800, 730], [740, 735], [705, 725], [818, 708]].map(([x, y]) => `M${x - 12},${y}q12,-7 24,0`).join("")}" fill="none" stroke="#c99a5a" stroke-opacity=".7" stroke-width="1"/>`);
    /* 초원 */
    add(`<path d="${scatter(522, 714, 74, 34, 50, 8).map(([x, y]) => `M${n1(x)},${n1(y)}q1,-4 3,-5M${n1(x + 3)},${n1(y)}q0,-3 -1,-5`).join("")}" fill="none" stroke="#b7a46a" stroke-opacity=".55" stroke-width=".8" stroke-linecap="round"/>`);
    /* 늪 */
    const swamp = (cx, cy, rx, ry, c) => {
      add(`<path d="${scatter(cx, cy, rx, ry, 24, 7).map(([x, y]) => `M${n1(x - 3)},${n1(y)}l1,-4M${n1(x)},${n1(y)}v-5M${n1(x + 3)},${n1(y)}l-1,-4`).join("")}" fill="none" stroke="${c}" stroke-width=".9" stroke-linecap="round"/>`);
      add(`<path d="${scatter(cx, cy, rx, ry, 8, 10).map(([x, y]) => `M${n1(x - 5)},${n1(y + 3)}h10`).join("")}" fill="none" stroke="#4d7591" stroke-width="1.1"/>`);
    };
    swamp(458, 456, 40, 19, "#c0703c"); swamp(700, 628, 42, 19, "#7c7889");
    /* 숲 */
    const trees = [];
    scatter(400, 560, 140, 78, 160, 9).forEach(p => trees.push([p[0], p[1], 0]));
    scatter(262, 700, 52, 44, 36, 8).forEach(p => trees.push([p[0], p[1], 1]));
    trees.sort((a, b) => a[1] - b[1]);
    add(`<g stroke-width=".8">${trees.map(([x, y, old]) => `<path d="M${n1(x)},${n1(y + 1)}v3.5" stroke="#4f6b3c"/><circle cx="${n1(x)}" cy="${n1(y - 1.5)}" r="${old ? 3.9 : 3.3}" fill="${old ? "#1e2f1c" : "#223421"}" stroke="${old ? "#9ad07f" : "#76b061"}"/>`).join("")}</g>`);
    add(`<path d="${scatter(705, 500, 46, 26, 22, 9).map(([x, y]) => `M${n1(x)},${n1(y + 4)}v-9M${n1(x)},${n1(y - 1)}l-3,-3M${n1(x)},${n1(y - 2)}l3,-4`).join("")}" fill="none" stroke="#9b8fb3" stroke-opacity=".8" stroke-width=".9"/>`);
    /* 모르크 협곡 */
    add(`<path d="M765 532l6 9-4 8 7 10-3 9 8 11-2 10 6 9M781 530l5 10-3 7 7 11-4 9 8 10-2 11 5 8" fill="none" stroke="#b49be0" stroke-opacity=".8" stroke-width="1.1"/>`);
    add(`<path d="M772 540l3 8-2 9 5 10-2 10 6 10" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="5" stroke-linecap="round"/>`);
    /* 뇌명 고원 */
    add(`<path d="M225 160C250 130 320 128 352 150C366 175 356 215 330 228C290 238 245 232 228 210C218 195 218 175 225 160Z" fill="#ffd84a" fill-opacity=".03" stroke="#d9b46a" stroke-opacity=".55" stroke-dasharray="1 3"/>`);
    add(`<path d="${[[255, 160], [318, 150], [332, 200], [262, 212], [300, 146]].map(([x, y]) => `M${x},${y - 8}l-4,7h6l-4,8`).join("")}" fill="none" stroke="#ffd84a" stroke-width="1.2" stroke-linejoin="round" opacity=".85"/>`);
    /* 성좌 고원 절벽 */
    let cl = "";
    along([[640, 252], [700, 234], [790, 230], [905, 255]], 14).forEach(([x, y, nx, ny]) => { cl += `M${n1(x)},${n1(y)}l${n1(-nx * 6)},${n1(-ny * 6)}`; });
    along([[636, 330], [630, 420], [634, 500], [642, 545]], 14).forEach(([x, y, nx, ny]) => { cl += `M${n1(x)},${n1(y)}l${n1(-nx * 6)},${n1(-ny * 6)}`; });
    add(`<path d="${cl}" stroke="#d9b46a" stroke-opacity=".4" stroke-width=".8"/>`);

    /* 산 */
    const peaks = [];
    const range = (pts, step, size, c, rows) => along(pts, step).forEach(([x, y, nx, ny]) => (rows || [0]).forEach((of, ri) => { const sh = ri % 2 ? step * .5 : 0; peaks.push([x + nx * of + ny * sh + rnd(-3.5, 3.5), y + ny * of - nx * sh + rnd(-3, 3), size * rnd(.72, 1.18), c]); }));
    range([[590, 128], [578, 190], [588, 270], [602, 360], [595, 450], [606, 540], [598, 630], [604, 705]], 11, 17, "#d9b46a", [-6, 6]);
    range([[590, 410], [530, 405], [482, 402]], 12, 13, "#d9b46a");
    range([[420, 404], [360, 410], [290, 418], [218, 425]], 12, 13, "#d9b46a");
    range([[168, 320], [160, 380], [170, 440], [160, 500], [170, 560]], 11, 15, "#b9c3d0", [-5, 5]);
    range([[850, 668], [890, 690], [930, 712], [962, 740]], 12, 15, "#ff7a4a", [-6, 6]);
    range([[210, 640], [245, 668], [282, 700], [312, 736]], 13, 13, "#8fcf72", [-7, 7]);
    range([[1000, 92], [1060, 118], [1120, 96], [1165, 140]], 14, 13, "#7c7889");
    peaks.push([590, 104, 42, "#f6e2a8"]);
    peaks.sort((a, b) => a[1] - b[1]);
    add(`<g stroke-linejoin="round">${peaks.map(([x, y, s, c]) => `<path d="M${n1(x - s / 2)},${n1(y)}Q${n1(x - s * .3)},${n1(y - s * .35)} ${n1(x - s * .06)},${n1(y - s * .85)}Q${n1(x + s * .2)},${n1(y - s * .45)} ${n1(x + s / 2)},${n1(y)}" fill="#141317" stroke="${c}" stroke-opacity=".9" stroke-width="1.05"/><path d="M${n1(x - s * .06)},${n1(y - s * .85)}L${n1(x + s * .1)},${n1(y - s * .35)}M${n1(x + s * .06)},${n1(y - s * .5)}L${n1(x + s * .22)},${n1(y - s * .1)}M${n1(x + s * .02)},${n1(y - s * .3)}L${n1(x + s * .12)},${n1(y - s * .02)}" fill="none" stroke="${c}" stroke-opacity=".45" stroke-width=".7"/>`).join("")}</g>`);
    add(`<path d="${[[878, 684], [928, 706], [905, 694]].map(([x, y]) => `M${x},${y - 14}q-5,-6 0,-11q5,-5 0,-10`).join("")}" fill="none" stroke="#ff9a6a" stroke-opacity=".55" stroke-width="1"/>`);
    /* 황혼의 장벽 */
    const WALL = [[916, 258], [920, 330], [915, 420], [918, 510], [912, 590]];
    let wc = "";
    along(WALL, 12).forEach(([x, y, nx, ny]) => { wc += `M${n1(x)},${n1(y)}l${n1(nx * 5)},${n1(ny * 5)}`; });
    add(`<path d="${poly(WALL)}" fill="none" stroke="#f3e6c0" stroke-width="3" stroke-linecap="square"/><path d="${wc}" stroke="#f3e6c0" stroke-width="2"/>`);
    /* 부유 군도 */
    [[830, 190, 11], [862, 168, 15], [900, 140, 10], [918, 186, 9], [885, 112, 12], [845, 140, 7]].forEach(([x, y, r]) => {
      add(`<ellipse cx="${x + 4}" cy="${y + r + 12}" rx="${n1(r * 1.3)}" ry="${n1(r * .35)}" fill="#000" opacity=".45"/><path d="${blob(x, y, r, 9)}" fill="#1f2226" stroke="#9fe3d6" stroke-opacity=".7"/><path d="M${x - 5},${y + 1}L${x},${y - 7}L${x + 5},${y + 1}" fill="none" stroke="#9fe3d6" stroke-opacity=".6"/>`);
    });
    }
    /* 잠든 거인 */
    add(`<g fill="none" stroke="#a59c86" stroke-opacity=".28" stroke-width="1.3" stroke-dasharray="5 6">
      <circle cx="590" cy="96" r="30"/>
      <path d="M566 128C548 250 560 400 570 520C576 600 580 650 572 708M614 128C634 250 626 400 626 520C626 600 624 650 630 708M622 172C680 215 722 290 736 330M558 172C520 225 505 300 498 350"/>
      <ellipse cx="778" cy="412" rx="118" ry="150"/>
      <ellipse cx="610" cy="866" rx="345" ry="20"/><circle cx="978" cy="861" r="17"/></g>`);

    /* 고리 바깥 안개 (고리를 1.16배 키운 구멍) */
    const ringPts = RING.map(id => [PI[id].x, PI[id].y]);
    const big = ringPts.map(([x, y]) => [590 + (x - 590) * 1.16, 460 + (y - 460) * 1.16]);
    const segs = ringSegs(ringPts), bsegs = ringSegs(big);
    const hole = bsegs.map((s, i) => i ? s.replace(/^M[^C]+/, "") : s).join("") + "Z";
    add(`<path d="M-1400,-1200H2600V2100H-1400Z${hole}" fill="#03040a" fill-opacity=".55" fill-rule="evenodd" filter="url(#klBlur)" pointer-events="none"/>`);

    /* 칠룡의 고리: 시렐 → (빈 자리) → 이그날 구간은 희미한 점선 */
    segs.forEach((s, i) => {
      const ghost = i === 1 || i === 2;
      add(ghost ? `<path d="${s}" fill="none" stroke="#7c7889" stroke-opacity=".55" stroke-width="1.2" stroke-dasharray="1 7" stroke-linecap="round"/>`
        : `<path d="${s}" fill="none" stroke="#e2c27c" stroke-opacity=".18" stroke-width="7"/><path d="${s}" class="kl-flow" fill="none" stroke="#f0d48c" stroke-opacity=".8" stroke-width="1.5" stroke-dasharray="2 9" stroke-linecap="round"/>`);
    });
    /* 성로 */
    const HUB = [652, 746];
    add(`<g fill="none" stroke="#8fdcff" stroke-opacity=".7" stroke-width="1.2" stroke-dasharray="1 6" stroke-linecap="round" class="kl-flow fast">${[[440, 535], [836, 246], [789, 428], [790, 728], [232, 98], [1010, 360], [376, 332]].map(([x, y]) => { const mx = (HUB[0] + x) / 2, my = (HUB[1] + y) / 2 - 30; return `<path d="M${HUB[0]},${HUB[1]}Q${n1(mx)},${n1(my)} ${x},${y}"/>`; }).join("")}</g>`);

    if (bare) return o.join("");
    /* 지점과 이름 */
    P.forEach(f => add(featureSVG(f)));

    /* 나침반: 작은 칠룡환 */
    const cx = 1128, cy = 846, cr = 28;
    const SEAT_DIR = [["earth", 0], ["wind", 45], [null, 90], ["fire", 135], ["water", 180], ["forest", 225], ["metal", 270], ["lightning", 315]];
    add(`<g transform="translate(${cx} ${cy})" pointer-events="none"><circle r="${cr + 8}" fill="#060912" fill-opacity=".7"/><circle r="${cr}" fill="none" stroke="#d9b46a" stroke-opacity=".7"/><circle r="${cr - 7}" fill="none" stroke="#d9b46a" stroke-opacity=".3" stroke-dasharray="1 3"/>
      <path d="M0,-${cr - 4}L4,0L0,${cr - 4}L-4,0Z" fill="#d9b46a" fill-opacity=".85"/>
      ${SEAT_DIR.map(([el, a]) => { const r = a * Math.PI / 180, x = Math.sin(r) * cr, y = -Math.cos(r) * cr; return el ? `<circle cx="${n1(x)}" cy="${n1(y)}" r="3.4" fill="${EL[el]}"/>` : `<circle cx="${n1(x)}" cy="${n1(y)}" r="3.4" fill="#060912" stroke="#8a8699" stroke-dasharray="1.5 1.5"/>`; }).join("")}
      <text y="-${cr + 13}" text-anchor="middle" fill="#e9dfc4" font-size="12" font-weight="700">북</text></g>`);
    add(`<g transform="translate(964 876)" pointer-events="none" font-size="10.5" fill="#a59c86"><rect width="50" height="4" fill="#d9b46a"/><rect x="50" width="50" height="4" fill="none" stroke="#d9b46a"/><text y="-5">0</text><text x="46" y="-5">100</text><text x="92" y="-5">200리</text></g>`);
    /* 제목 띠 */
    add(`<g transform="translate(30 850)" pointer-events="none"><text font-family="'Cinzel Decorative', Cinzel, serif" font-weight="900" font-size="34" letter-spacing="4" fill="#e6c47c">KAILAN</text><text y="22" font-size="12" letter-spacing="5" fill="#a59c86">카일란 대륙 전도 · 에테리온</text></g>`);
    return o.join("");
  }

  function featureSVG(f) {
    const c = colorOf(f), lb = (cls, x, y, anchor, extra) => `<text class="kl-lbl ${cls}" x="${n1(x)}" y="${n1(y)}" text-anchor="${anchor}"${extra || ""}>${h(f.n)}</text>`;
    let body = "", label = "";
    const lab = f.lab ? [f.x + f.lab[0], f.y + f.lab[1], f.lab[2]] : null;
    switch (f.t) {
      case "region": label = lb("reg", f.x, f.y, "middle", ` style="fill:${c}"`); break;
      case "label": {
        const cls = f.cls || (f.f === "giant" ? "giant" : f.sea ? "sea" : "ter");
        const rot = f.rot ? ` transform="rotate(${f.rot} ${f.x} ${f.y})"` : "";
        label = lb(cls, f.x, f.y, f.anchor || "middle", rot); break;
      }
      case "dragon":
        body = `<circle cx="${f.x}" cy="${f.y}" r="38" fill="${c}" fill-opacity=".05" stroke="${c}" stroke-opacity=".35" stroke-dasharray="3 4"/><circle cx="${f.x}" cy="${f.y}" r="26" fill="url(#klG-${f.el})" class="kl-orb"/><circle cx="${f.x}" cy="${f.y}" r="7.5" fill="${c}" stroke="#fff6dc" stroke-width="1.2"/>`;
        label = lab ? lb("dragon", lab[0], lab[1], lab[2], ` style="fill:${c}"`) : ""; break;
      case "eighth":
        body = `<circle class="c" cx="${f.x}" cy="${f.y}" r="11" fill="#060912" fill-opacity=".6" stroke="#8a8699" stroke-dasharray="2 3"/><text class="q" x="${f.x}" y="${f.y + 5}" text-anchor="middle">?</text>`; break;
      case "capital":
        body = `<circle cx="${f.x}" cy="${f.y}" r="8" fill="${c}" stroke="#fff1cf" stroke-width="1.3"/><circle cx="${f.x}" cy="${f.y}" r="2.8" fill="#14120c"/><circle cx="${f.x}" cy="${f.y}" r="12" fill="none" stroke="${c}" stroke-opacity=".5"/>`;
        label = lab ? lb("cap", lab[0], lab[1], lab[2]) : ""; break;
      case "city":
        body = `<path d="M${f.x},${f.y - 7}L${f.x + 7},${f.y}L${f.x},${f.y + 7}L${f.x - 7},${f.y}Z" fill="${c}" stroke="#fff1cf" stroke-width="1.1"/>`;
        label = lab ? lb("", lab[0], lab[1], lab[2]) : ""; break;
      case "tower":
        body = `<path d="M${f.x - 4.5},${f.y + 7}L${f.x},${f.y - 18}L${f.x + 4.5},${f.y + 7}Z" fill="${c}" stroke="#fff1cf" stroke-width="1.1"/><circle cx="${f.x}" cy="${f.y - 20}" r="2.4" fill="#9fe3d6"/>`;
        label = lab ? lb("", lab[0], lab[1], lab[2]) : ""; break;
      case "portal":
        body = `<circle cx="${f.x}" cy="${f.y}" r="6.5" fill="#060912" stroke="${c}" stroke-width="2"/><circle cx="${f.x}" cy="${f.y}" r="2.2" fill="${c}"/>`;
        label = lab ? lb("portal", lab[0], lab[1], lab[2]) : ""; break;
      case "realm":
        body = `<path d="M${f.x},${f.y - 8}L${f.x + 8},${f.y}L${f.x},${f.y + 8}L${f.x - 8},${f.y}Z" fill="#14120c" stroke="${c}" stroke-width="1.6"/><path d="M${f.x},${f.y - 3}L${f.x + 3},${f.y}L${f.x},${f.y + 3}L${f.x - 3},${f.y}Z" fill="${c}"/>`;
        label = lab ? lb("realm", lab[0], lab[1], lab[2]) : ""; break;
      case "x":
        body = `<path d="M${f.x - 5},${f.y - 5}L${f.x + 5},${f.y + 5}M${f.x + 5},${f.y - 5}L${f.x - 5},${f.y + 5}" stroke="#e9dfc4" stroke-width="2" stroke-linecap="round"/>`;
        label = lab ? lb("ter", lab[0], lab[1], lab[2]) : ""; break;
      case "q":
        body = `<circle cx="${f.x}" cy="${f.y}" r="10" fill="#14120c" stroke="${c}" stroke-width="1.4"/><text x="${f.x}" y="${f.y + 5}" text-anchor="middle" fill="${c}" font-size="14" font-weight="700">?</text>`;
        label = lab ? lb("realm", lab[0], lab[1], lab[2]) : ""; break;
    }
    const hit = body ? `<circle class="hit" cx="${f.x}" cy="${f.y}" r="${f.t === "dragon" ? 20 : 15}"/>` : "";
    return `<g class="kl-feat${f.t === "eighth" ? " kl-eighth" : ""}" data-id="${f.id}" tabindex="0" role="button" aria-label="${h(f.n)}">${body}${hit}${label}</g>`;
  }

  /* ---------- 세계관 (세계 탭) ---------- */
  function chip(gid) {
    const G = GROUPS[gid];
    return `<button type="button" class="kl-chip" data-go="${GROUP_CITY[gid]}" style="--gc:${G.color}">${typeof glyphSVG === "function" ? glyphSVG(G.glyph) : ""}${h(G.name)}</button>`;
  }
  function dragonRow(id) {
    const f = PI[id];
    if (f.t === "eighth") return `<li><button type="button" data-go="eighth"><span class="orb empty"></span><span>${st.eighth ? "여덟 번째 자리" : "?"}</span><small>동 · 비어 있음</small></button></li>`;
    return `<li><button type="button" data-go="${id}"><span class="orb" style="color:${EL[f.el]}"></span><span>${h(f.n)}</span><small>${h(f.k.split(" · ").slice(1).join(" · "))}</small></button></li>`;
  }
  function facBlock(fk, land, text) {
    const F = FACTIONS[fk];
    return `<div class="kl-fac" style="--fc:${COL[fk]}"><b>${h(F.name)}</b><span class="en">${h(F.en)}</span>
      <p class="muted" style="margin:2px 0 4px">${h(land)} · <span class="motto">“${h(F.motto)}”</span></p>
      <p>${h(text)}</p><div class="kl-chips">${F.groups.map(chip).join("")}</div></div>`;
  }
  function worldHTML() {
    const eighthCh = st.eighth
      ? `<section class="kl-ch${st.justFound ? " reveal" : ""}" id="kl-ch6"><p class="num">VI</p><h3>여덟 번째 자리</h3>
        <p>일곱 용이 절대 입에 올리지 않는 이름이 있다고 한다.</p>
        <p>칠룡의 고리는 원래 여덟 자리였고, 지금 빈 땅이 된 동쪽이 여덟 번째 용의 자리였다는 소문이 있다. 용들은 그쪽을 바라보지 않는다. 에테리온 문장을 새기는 장인들은 아무도 시키지 않았는데도 용의 고리 동쪽 자리를 비워 두고, 물음표 하나를 새겨 넣는다.</p>
        <p>황혼의 장벽 위에서 동쪽을 지키는 성광 기사들은, 에테르가 없어 죽어 있어야 할 빈 땅의 관문에서 가끔 빛이 새어 나온다고 말한다.</p>
        <h4>아직 답이 없는 물음</h4>
        <ul class="kl-rel"><li>여덟 번째 용은 누구였고, 어디로 갔는가?</li><li>동쪽 자리는 비어 있는 것인가, 지워진 것인가?</li><li>대륙 하나를 가라앉힌 두 용의 싸움. 그 두 용은 누구였는가?</li><li>빈 땅 관문의 빛은 누가 켜는가?</li></ul></section>`
      : `<section class="kl-ch locked" id="kl-ch6"><p class="num">VI</p><h3><span class="kl-redact">■■■ ■■ ■■</span></h3>
        <p><span class="kl-redact">이 장은 누군가 지워 버렸다. 남은 것은 몇 줄의 얼룩뿐이다. 고리의 동쪽을 보라.</span></p>
        <p class="muted">이 장은 지워져 있다. 고리의 빈자리를 직접 확인한 자만 읽을 수 있다.</p></section>`;
    return `
      <section class="kl-ch"><p class="num">I</p><h3>에테르가 흐르는 땅</h3>
        <p>세계의 이름은 에테리온. 에테르는 근원신 아르케가 세계를 빚을 때 쓴 근원의 힘이다. 마법도 신성도 원소도, 아다만트 연합의 증기 기관을 돌리는 동력도 모두 에테르에서 나온다. 세계 안의 모든 것은 에테르로 이루어져 있다. 경계 너머에서 온 공허의 것들만 빼고.</p>
        <p>필멸자가 사는 주 대륙은 카일란이다. 대륙은 넓고 대부분이 미지의 땅이다. 문명은 일곱 용의 영역이 둘러싼 고리 안쪽, 대륙 중남부에 모여 있다. 지도에서 밝게 보이는 곳이 그 땅이고, 어둠에 잠긴 바깥은 아직 아무도 제대로 그리지 못했다.</p></section>
      <section class="kl-ch"><p class="num">II</p><h3>몸, 뜻, 힘</h3>
        <p>태초에 근원신 아르케만이 있었다. 아르케는 세계를 기록하고, 심판하고, 지키기 위해 삼좌를 두었다. 기록자 이벨, 심판자 하르간, 문지기 세렌.</p>
        <p>아르케는 먼저 세계의 몸을 빚었다. 태초의 거인 일곱이다. 셋은 대지와 바다와 하늘의 틀을 빚고, 넷은 그 속에 불과 쇠와 번개와 모래를 채웠다. 남은 에테르는 둘로 나뉘어, 뜻은 다섯 신이 되고 힘은 일곱 용이 되었다. 거인들은 일을 마치고 지쳐 잠들었으니, 그들이 누운 자리가 지금의 산맥과 해구와 사막이다. 용들은 저마다 거인의 몸 위에 거처를 정했다. 그 뒤로 아르케는 모습을 감추었다. 다섯 신 중 누구도 아르케를 직접 본 적이 없다.</p>
        <dl class="kl-tri"><dt>거인 · 몸</dt><dd><button type="button" class="kl-back" style="margin:0" data-go="ordun">오르둔</button> 대지와 뼈 · <button type="button" class="kl-back" style="margin:0" data-go="talak">탈라쿠스</button> 바다와 피 · 아우라곤 하늘과 숨<br>도르마크 심장불 · 소르그림 힘줄과 쇠 · 케라운 신경과 번개 · 아샤르 살갗과 모래</dd>
          <dt>신 · 뜻</dt><dd>솔란테 빛 · 모르카스 어둠 · 실바레 생명 · 벨루미르 지혜 · 크로네아 운명</dd>
          <dt>용 · 힘</dt><dd>이그날 · 마렌시아 · 고르바스 · 시렐 · 아스트라크 · 베르단 · 페로스</dd></dl>
        <p class="muted">거인과 신과 용은 동격이며, 셋 사이의 우열은 밝혀지지 않았다. 빛과 암흑은 신의 영역이고, 나머지 일곱 원소가 용의 것이다.</p></section>
      <section class="kl-ch"><p class="num">III</p><h3>칠룡의 고리</h3>
        <p>일곱 용의 영역이 필멸자의 땅을 고리처럼 둘러싸고 있다. 용들은 서로 싸우지 않고 서로의 영역에 들어가지 않기로 맹세했다. 칠룡의 서약이다. 아주 먼 옛날 두 용이 싸웠을 때 대륙 하나가 바다에 가라앉았고, 칠룡은 그 땅을 함께 봉인했다. 잠긴 왕국 네레아다.</p>
        <p>필멸자도 용역에는 함부로 들어가지 않는다. 그래서 고리는 문명의 국경이 되었다. 에테리온 어디서나 보이는 에테리온 문장의 가운데 고리는 이 고리의 방위를 그대로 옮긴 것이다. 그 바깥 테에는 잠든 거인 일곱의 돌을, 안쪽에는 다섯 신의 별을 새겨 몸과 힘과 뜻을 한 문장에 담는다.</p>
        <ul class="kl-list">${RING.map(dragonRow).join("")}</ul>
        <p>고리의 동쪽은 비어 있다. 용들은 그쪽을 바라보지 않는다.</p></section>
      <section class="kl-ch"><p class="num">IV</p><h3>세 진영, 아홉 단체</h3>
        <p>진영은 종족이 아니라 힘의 원천으로 나뉜다. 아다만트는 잠든 거인의 몸을 캐고, 푸른숲은 용과 맹약해 힘을 빌리고, 비술은 신에게 서약해 뜻을 내려받는다. 오르둔의 등뼈가 대륙을 동서로 가르고, 그 갈비가 서부를 다시 둘로 나눈다. 산맥이 곧 진영의 경계다.</p>
        ${facBlock("brass", "녹철 구릉 · 북서부", "신을 섬기지 않고, 용에게서도 힘을 받지 못했다. 그래서 잠든 거인의 몸을 캐 아다만트를 얻고, 그것으로 기계의 심장을 만든다. 증기와 매연, 밤에도 꺼지지 않는 용광로. 발명 특허가 곧 신분이고, 승천자 ‘철의 심장을 삼킨 자’(브론)를 ‘증명된 가능성’으로 기린다.")}
        ${facBlock("verdant", "에일렌 대삼림과 남서 해안", "씨족과 부족의 연합. 문자보다 노래로 역사를 전하고, 죽은 자는 나무 아래 묻어 숲으로 돌려보낸다. 생명의 신 실바레를 증인으로, 오크는 고르바스와, 트롤은 베르단과, 인어는 마렌시아와 맹약을 맺었다.")}
        ${facBlock("arcane", "성좌 고원 · 동부", "거인 오르둔의 오른손바닥 위, 사방이 막힌 고원에서 홀로 자랐다. 솔란테와 모르카스와 벨루미르를 함께 섬기는, 빛과 어둠이 공존하는 유일한 진영. 빈 땅과 맞닿아 스스로를 세계의 방패라 여긴다.")}
        <h4>진영 사이</h4>
        <ul class="kl-rel">
          <li><b style="color:${COL.brass}">아다만트</b> ↔ <b style="color:${COL.verdant}">푸른숲</b><span class="kl-tag" style="color:#ef6a5c">인접 · 적대</span><br>톱니 고개와 녹슨 늪에서 벌목과 오염을 두고 싸운다.</li>
          <li><b style="color:${COL.verdant}">푸른숲</b> ↔ <b style="color:${COL.arcane}">비술</b><span class="kl-tag" style="color:${COL.verdant}">멀리 · 우호</span><br>인어족의 바닷길로 교역한다. 둘 다 신을 섬긴다.</li>
          <li><b style="color:${COL.brass}">아다만트</b> ↔ <b style="color:${COL.arcane}">비술</b><span class="kl-tag" style="color:var(--muted)">단절 · 냉전</span><br>등뼈 산맥에 막혀 있다. “신을 모르는 기계쟁이”, “하늘만 보는 광신도”라 서로를 부른다.</li>
          <li><b style="color:${COL.neutral}">린데어 자유시</b><span class="kl-tag" style="color:${COL.neutral}">중립</span><br>세 진영이 유일하게 마주치는 교역 도시이자 성로의 중심.</li></ul></section>
      <section class="kl-ch"><p class="num">V</p><h3>경계 너머</h3>
        <p>문지기 세렌이 지키는 세계의 경계 너머에서 오는 것들이 있다. 아르케가 만들지 않았고 에테르로 이루어지지 않아, 원소도 신성도 마법도 제대로 통하지 않는다. 초월자와 우열을 견줄 수조차 없다. 애초에 같은 법칙 위에 있지 않기 때문이다.</p>
        <dl class="kl-tri"><dt>오블리온</dt><dd>삼키는 자. 닿는 곳의 에테르를 지운다. 대륙 동쪽의 <button type="button" class="kl-back" style="margin:0" data-go="void">빈 땅</button>이 그 흔적이다.</dd>
          <dt>미라제</dt><dd>비추는 자. 본 것을 완벽하게 흉내 낸다. 신의 모습까지도.</dd>
          <dt>누르엘</dt><dd>속삭이는 자. 필멸자의 꿈에 말을 걸어 숭배자를 만든다.</dd></dl>
        <p>빈 땅 깊은 곳의 회색 감옥에 무엇이 갇혀 있는지는 어떤 기록에도 없다.</p></section>
      ${eighthCh}
      <p class="kl-note">모든 이름은 가칭입니다. 더 긴 이야기는 <button type="button" class="kl-back" style="margin:0" data-chronicle>에테리온 연대기</button>에 있습니다.</p>`;
  }

  /* ---------- 장소 (장소 탭) ---------- */
  const LEG = (svg, t) => `<svg viewBox="-12 -12 24 24">${svg}</svg><span>${t}</span>`;
  function legendHTML() {
    return `<h3>지도 읽는 법</h3><p class="muted">지도에서 지점이나 이름을 누르면 여기에 설정이 나옵니다. 끌어서 옮기고, 휠이나 + − 로 확대합니다.</p>
      <div class="kl-legend">
        ${LEG(`<circle r="7" fill="${COL.brass}" stroke="#fff1cf"/><circle r="2.5" fill="#14120c"/>`, "수도")}
        ${LEG(`<path d="M0,-7L7,0L0,7L-7,0Z" fill="${COL.verdant}" stroke="#fff1cf"/>`, "단체의 근거지")}
        ${LEG(`<circle r="9" fill="url(#klG-fire)"/><circle r="5" fill="${EL.fire}" stroke="#fff6dc"/>`, "용과 용역")}
        ${LEG(`<path d="M-10,4Q0,-8 10,4" fill="none" stroke="#f0d48c" stroke-dasharray="2 4" stroke-width="1.5"/>`, "칠룡의 고리 (동쪽은 비어 있음)")}
        ${LEG(`<circle r="6" fill="#060912" stroke="${COL.portal}" stroke-width="2"/><circle r="2" fill="${COL.portal}"/>`, "관문 (환석). 푸른 점선은 성로")}
        ${LEG(`<path d="M0,-7L7,0L0,7L-7,0Z" fill="#14120c" stroke="${COL.realm}" stroke-width="1.5"/>`, "결계령의 입구")}
        ${LEG(`<path d="M-9,2Q0,-10 9,2" fill="none" stroke="#a59c86" stroke-dasharray="3 3"/>`, "잠든 거인의 몸 (추정)")}
        ${LEG(`<rect x="-10" y="-8" width="20" height="16" fill="#03040a" opacity=".8"/>`, "고리 바깥, 미지의 땅")}
      </div>`;
  }
  function relatedCards(f) {
    if (!f.kw || typeof CARD_LIST === "undefined") return "";
    const list = CARD_LIST.filter(c => f.kw.some(k => c.name.includes(k))).sort((a, b) => a.lv - b.lv || a.name.localeCompare(b.name));
    if (!list.length) return "";
    const show = list.slice(0, 8);
    return `<h4>이 이름이 새겨진 카드</h4><div class="kl-chips">${show.map(c => { const G = GROUPS[c.group]; return `<button type="button" class="kl-chip" data-card="${h(c.id)}" style="--gc:${G.color}"><span class="lv">${c.lv}</span>${h(c.name)}</button>`; }).join("")}</div>${list.length > show.length ? `<p class="muted" style="font-size:12.5px">외 ${list.length - show.length}장</p>` : ""}`;
  }
  function placeHTML(id) {
    const f = PI[id];
    if (!f) return legendHTML();
    const c = colorOf(f);
    if (f.t === "eighth") {
      return `<button type="button" class="kl-back" data-tab="world">← 세계로</button><br>
        <span class="kl-kicker" style="background:#8a8699">${h(f.k)}</span><h3>${h(f.n)}</h3><p>${h(f.d)}</p>
        ${st.justFound ? `<div class="kl-found">지워진 장이 열렸습니다. <b style="color:var(--gold-hi)">세계 › VI. 여덟 번째 자리</b></div>` : ""}
        <p><button type="button" class="btn sm gold" data-read="6">VI. 여덟 번째 자리 읽기 →</button></p>`;
    }
    const facts = (f.facts || []).length ? `<dl class="kl-facts">${f.facts.map(([a, b]) => `<dt>${h(a)}</dt><dd>${h(b)}</dd>`).join("")}</dl>` : "";
    let grp = "";
    if (f.g && typeof GROUPS !== "undefined") {
      const G = GROUPS[f.g];
      grp = `<div class="kl-group" style="--gc:${G.color}">${typeof glyphSVG === "function" ? glyphSVG(G.glyph) : ""}<div><b>${h(G.name)}</b><span>${h(G.en)} · ${h(G.role)}${typeof ELEMENTS !== "undefined" ? " · " + h(ELEMENTS[G.el].name) : ""}</span><span><em>“${h(G.motto)}”</em></span><span>${h(G.blurb)}</span></div></div>`;
    }
    let fac = "";
    if (f.fac) fac = `<div class="kl-chips">${FACTIONS[f.fac].groups.map(chip).join("")}</div>`;
    return `<button type="button" class="kl-back" data-tab="world">← 세계로</button><br>
      <span class="kl-kicker" style="background:${c}">${h(f.k)}</span><h3 style="color:${f.t === "dragon" ? c : ""}">${h(f.n)}</h3>
      <p>${h(f.d)}</p>${facts}${grp}${fac}${relatedCards(f)}`;
  }

  /* ---------- 덮개 ---------- */
  let ov = null, svg = null, vb = null, full = null, sel = null, tab = "world", lastFocus = null, ro = null;
  const MARK = `<svg class="kl-mark" viewBox="-24 -24 48 48" aria-hidden="true"><circle r="19" fill="none" stroke="currentColor" stroke-opacity=".8"/><circle r="13" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-dasharray="1 3"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = a * Math.PI / 180, x = Math.sin(r) * 19, y = -Math.cos(r) * 19; return a === 90 ? `<circle cx="${n1(x)}" cy="${n1(y)}" r="3" fill="#0a0c16" stroke="currentColor" stroke-dasharray="1 1.4"/>` : `<circle cx="${n1(x)}" cy="${n1(y)}" r="3" fill="currentColor"/>`; }).join("")}</svg>`;

  function open(ox, oy) {
    if (ov) return;
    lastFocus = document.activeElement;
    const first = !st.seen;
    st.seen = 1; save();
    ov = document.createElement("div");
    ov.className = "kl-overlay";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "카일란 대륙 전도");
    ov.style.setProperty("--ox", (ox == null ? innerWidth / 2 : ox) + "px");
    ov.style.setProperty("--oy", (oy == null ? innerHeight / 2 : oy) + "px");
    ov.innerHTML = `<header class="kl-head">${MARK}<div class="kl-titles"><p class="kl-eyebrow">Sealed Record · 봉인된 기록</p><h2 class="kl-title">카일란 대륙 전도<small>Chronicles of the Seven-Dragon Ring</small></h2></div>
        <button type="button" class="kl-close" data-close><span>닫기</span> <kbd>Esc</kbd> ✕</button></header>
      <div class="kl-body">
        <div class="kl-mapbox"><svg class="kl-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="카일란 대륙 지도">${mapSVG()}</svg>
          <div class="kl-zoom"><button type="button" data-z="in" aria-label="확대">+</button><button type="button" data-z="out" aria-label="축소">−</button><button type="button" class="sm" data-z="all" aria-label="전체 보기">전체</button></div>
          <p class="kl-hint">끌어서 이동 · 휠로 확대 · 지점을 누르면 설정</p>
          <div class="kl-view" role="tablist" aria-label="지도 보기"><button type="button" data-view="map" aria-selected="true">지도</button><button type="button" data-view="pic" aria-selected="false">그림 지도</button></div>
          <div class="kl-pic" hidden><img src="${PIC_MAP}" alt="카일란 대륙 그림 지도" draggable="false"></div></div>
        <aside class="kl-side"><div class="kl-tabs" role="tablist"><button type="button" role="tab" data-tab="world">세계</button><button type="button" role="tab" data-tab="place">장소</button></div><div class="kl-pane"></div></aside>
      </div>`;
    document.body.appendChild(ov);
    svg = ov.querySelector(".kl-map");
    setTab("world");
    bindMap();
    ov.addEventListener("click", onClick);
    addEventListener("keydown", onKey, true);
    requestAnimationFrame(() => requestAnimationFrame(() => ov && ov.classList.add("on")));
    ov.addEventListener("transitionend", e => { if (e.target === ov && ov.classList.contains("on")) ov.classList.add("done"); });
    setTimeout(() => ov && ov.classList.add("done"), 1300);
    setTimeout(() => { const b = ov && ov.querySelector("[data-close]"); if (b) b.focus({ preventScroll: true }); }, 60);
    if (first && typeof toast === "function") setTimeout(() => toast("숨겨진 기록을 찾았습니다 · 카일란 대륙 전도", "ok"), 700);
  }
  function close() {
    if (!ov) return;
    removeEventListener("keydown", onKey, true);
    if (ro) { ro.disconnect(); ro = null; }
    const el = ov; ov = null; svg = null; sel = null;
    el.classList.remove("done"); void el.offsetWidth; el.classList.remove("on");
    const gone = () => el.remove();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) gone(); else { el.addEventListener("transitionend", gone, { once: true }); setTimeout(gone, 1100); }
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    st.justFound = 0; save();
  }
  /* v3.43 그림 지도: 그림 AI가 그린 한 장(img/ui/map/kailan_map.jpg)을 그대로 크게 본다 — 누를 지점 · 레이어 없음, 끌어서 이동 · 휠로 확대.
     코드 지도(좌표 1200×900)와 땅 모양이 달라 바탕으로 쓰지 않고 따로 보기로 둔다(바탕용은 tools/art/prompts/map.md로 다시 그린다) */
  function setView(v) {
    const box = ov.querySelector(".kl-mapbox"), pic = ov.querySelector(".kl-pic");
    box.classList.toggle("pic-on", v === "pic"); pic.hidden = v !== "pic";
    ov.querySelectorAll(".kl-view [data-view]").forEach(b => b.setAttribute("aria-selected", b.dataset.view === v ? "true" : "false"));
    if (v === "pic" && !pic.dataset.bound) {
      pic.dataset.bound = 1;
      const im = pic.querySelector("img"); let z = 1, x = 0, y = 0, drag = null;
      const put = () => { im.style.transform = `translate(${x}px, ${y}px) scale(${z})`; };
      const clamp = () => { const r = pic.getBoundingClientRect(), mx = r.width * (z - 1) / 2, my = r.height * (z - 1) / 2; x = Math.max(-mx, Math.min(mx, x)); y = Math.max(-my, Math.min(my, y)); };
      pic.addEventListener("wheel", e => { e.preventDefault(); const nz = Math.max(1, Math.min(4, z * (e.deltaY < 0 ? 1.18 : 1 / 1.18))); const r = pic.getBoundingClientRect(), px = e.clientX - r.left - r.width / 2, py = e.clientY - r.top - r.height / 2; x = px - (px - x) * nz / z; y = py - (py - y) * nz / z; z = nz; clamp(); put(); }, { passive: false });
      pic.addEventListener("pointerdown", e => { drag = { sx: e.clientX, sy: e.clientY, x, y }; pic.setPointerCapture(e.pointerId); pic.classList.add("drag"); });
      pic.addEventListener("pointermove", e => { if (!drag) return; x = drag.x + e.clientX - drag.sx; y = drag.y + e.clientY - drag.sy; clamp(); put(); });
      const up = () => { drag = null; pic.classList.remove("drag"); };
      pic.addEventListener("pointerup", up); pic.addEventListener("pointercancel", up);
      pic.addEventListener("dblclick", () => { z = z > 1 ? 1 : 2; x = 0; y = 0; put(); });
    }
  }
  function setTab(t) {
    tab = t;
    ov.querySelectorAll(".kl-tabs [data-tab]").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === t ? "true" : "false"));
    const pane = ov.querySelector(".kl-pane");
    pane.innerHTML = t === "world" ? worldHTML() : placeHTML(sel);
    pane.scrollTop = 0;
  }
  function select(id, fly) {
    if (!ov) return;
    const f = PI[id]; if (!f) return;
    svg.querySelectorAll(".kl-feat.sel").forEach(g => { g.classList.remove("sel"); const r = g.querySelector(".kl-selring"); if (r) r.remove(); });
    const g = svg.querySelector(`.kl-feat[data-id="${id}"]`);
    if (g) {
      g.classList.add("sel");
      if (!["region", "label"].includes(f.t)) g.insertAdjacentHTML("afterbegin", `<circle class="kl-selring" cx="${f.x}" cy="${f.y}" r="${f.t === "dragon" ? 16 : 14}"/>`);
    }
    sel = id;
    if (id === "eighth" && !st.eighth) { st.eighth = 1; st.justFound = 1; save(); }
    if (fly) flyTo(f.x, f.y, Math.min(vb.w, full.w * .55));
    setTab("place");
    if (matchMedia("(max-width: 900px)").matches && !fly) ov.querySelector(".kl-side").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function onClick(e) {
    const t = e.target;
    if (t.closest("[data-close]")) return close();
    if (t.closest("[data-chronicle]")) { close(); if (typeof Chronicle !== "undefined") setTimeout(() => Chronicle.open(), 120); return; }   /* v3.7 연대기 */
    const tb = t.closest("[data-tab]"); if (tb) return setTab(tb.dataset.tab);
    const vw = t.closest("[data-view]"); if (vw) return setView(vw.dataset.view);   // v3.43 지도 | 그림 지도
    const z = t.closest("[data-z]");
    if (z) { const k = z.dataset.z; if (k === "all") flyTo(full.x + full.w / 2, full.y + full.h / 2, full.w); else zoomBy(k === "in" ? .7 : 1 / .7); return; }
    const go = t.closest("[data-go]"); if (go) { select(go.dataset.go, true); if (matchMedia("(max-width: 900px)").matches) ov.querySelector(".kl-mapbox").scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const cd = t.closest("[data-card]");
    if (cd && typeof CARDS !== "undefined" && CARDS[cd.dataset.card]) {
      const c = CARDS[cd.dataset.card];
      if (typeof showCardModal === "function") showCardModal(c);
      else if (typeof modal === "function" && typeof cardHTML === "function") modal(`<div class="detail">${cardHTML(c, { size: "full" })}</div>`, [{ label: "닫기", value: null }], { cls: "card-modal", onOpen: typeof fitCardModal === "function" ? fitCardModal : null });
      return;
    }
    const rd = t.closest("[data-read]");
    if (rd) { setTab("world"); const ch = ov.querySelector("#kl-ch6"); if (ch) ch.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  }
  function onKey(e) {
    if (!ov) return;
    const mw = document.querySelector(".modal-wrap");    // 카드 창이 위에 떠 있으면 Esc는 그 창부터 닫는다
    if (mw) { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); mw.click(); } return; }
    e.stopPropagation();                                 // 타이틀(Enter로 시작)과 게임 단축키를 막는다
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    const f = e.target.closest && e.target.closest(".kl-feat");
    if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(f.dataset.id); return; }
    if (e.target.closest && e.target.closest(".kl-map, .kl-feat") || e.target === ov) {
      if (e.key === "+" || e.key === "=") zoomBy(.7);
      else if (e.key === "-") zoomBy(1 / .7);
    }
  }

  /* ---------- 확대·이동 ---------- */
  function apply() { svg.setAttribute("viewBox", `${n1(vb.x)} ${n1(vb.y)} ${n1(vb.w)} ${n1(vb.h)}`); }
  function clampVB() {
    vb.w = Math.min(full.w, Math.max(full.w * .2, vb.w)); vb.h = vb.w * full.h / full.w;
    vb.x = vb.w >= W ? (W - vb.w) / 2 : Math.min(W - vb.w, Math.max(0, vb.x));
    vb.y = vb.h >= H ? (H - vb.h) / 2 : Math.min(H - vb.h, Math.max(0, vb.y));
  }
  function fit() {
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const ar = r.width / r.height;
    const keep = vb && full ? { cx: vb.x + vb.w / 2, cy: vb.y + vb.h / 2, s: vb.w / full.w } : null;
    let w, hh;
    if (ar >= W / H) { hh = H; w = H * ar; } else { w = W; hh = W / ar; }
    full = { x: (W - w) / 2, y: (H - hh) / 2, w, h: hh };
    if (keep) { vb = { w: full.w * keep.s, h: full.h * keep.s }; vb.x = keep.cx - vb.w / 2; vb.y = keep.cy - vb.h / 2; }
    else if (ar < .9) { vb = { w: full.w * .62, h: full.h * .62 }; vb.x = 560 - vb.w / 2; vb.y = 470 - vb.h / 2; }
    else vb = Object.assign({}, full);
    clampVB(); apply();
  }
  function toSvg(cx, cy) { const r = svg.getBoundingClientRect(); return [vb.x + (cx - r.left) / r.width * vb.w, vb.y + (cy - r.top) / r.height * vb.h]; }
  function zoomBy(f, px, py) {
    if (px == null) { px = vb.x + vb.w / 2; py = vb.y + vb.h / 2; }
    const nw = Math.min(full.w, Math.max(full.w * .2, vb.w * f)), k = nw / vb.w;
    vb.x = px - (px - vb.x) * k; vb.y = py - (py - vb.y) * k; vb.w = nw; vb.h = nw * full.h / full.w;
    clampVB(); apply();
  }
  let flyRaf = 0;
  function flyTo(cx, cy, w) {
    cancelAnimationFrame(flyRaf);
    const from = Object.assign({}, vb), tw = Math.min(full.w, Math.max(full.w * .2, w)), th = tw * full.h / full.w;
    const to = { w: tw, h: th, x: cx - tw / 2, y: cy - th / 2 };
    const prev = vb; vb = Object.assign({}, to); clampVB(); const tgt = vb; vb = prev;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { vb = tgt; apply(); return; }
    const t0 = performance.now(), D = 520;
    const step = now => {
      if (!svg) return;
      const t = Math.min(1, (now - t0) / D), e = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      vb = { x: from.x + (tgt.x - from.x) * e, y: from.y + (tgt.y - from.y) * e, w: from.w + (tgt.w - from.w) * e, h: from.h + (tgt.h - from.h) * e };
      apply(); if (t < 1) flyRaf = requestAnimationFrame(step);
    };
    flyRaf = requestAnimationFrame(step);
  }
  function bindMap() {
    vb = null; full = null; fit();
    const box = ov.querySelector(".kl-mapbox");
    if (typeof ResizeObserver === "function") { ro = new ResizeObserver(() => svg && fit()); ro.observe(box); }
    const pts = new Map();
    let drag = null, moved = false, pinch = null;
    const narrow = () => matchMedia("(max-width: 900px)").matches;
    const touchMode = () => { svg.style.touchAction = (narrow() && vb.w >= full.w * .999) ? "pan-y" : "none"; };
    touchMode();
    svg.addEventListener("wheel", e => { e.preventDefault(); cancelAnimationFrame(flyRaf); const [x, y] = toSvg(e.clientX, e.clientY); zoomBy(e.deltaY < 0 ? .85 : 1 / .85, x, y); touchMode(); }, { passive: false });
    svg.addEventListener("dblclick", e => { const [x, y] = toSvg(e.clientX, e.clientY); zoomBy(.55, x, y); touchMode(); });
    svg.addEventListener("pointerdown", e => {
      cancelAnimationFrame(flyRaf);
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), w: vb.w, mid: toSvg((a[0] + b[0]) / 2, (a[1] + b[1]) / 2) };
        drag = null; moved = true;
      } else if (pts.size === 1) { drag = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y, id: e.pointerId }; moved = false; }
    });
    svg.addEventListener("pointermove", e => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch && pts.size >= 2) {
        const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
        const nw = pinch.w * pinch.d / d; zoomBy(nw / vb.w, pinch.mid[0], pinch.mid[1]); touchMode(); return;
      }
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!moved && Math.hypot(dx, dy) < 5) return;
      if (!moved) { moved = true; try { svg.setPointerCapture(drag.id); } catch (er) { /* 무시 */ } svg.classList.add("dragging"); }
      const r = svg.getBoundingClientRect();
      vb.x = drag.vx - dx / r.width * vb.w; vb.y = drag.vy - dy / r.height * vb.h; clampVB(); apply();
    });
    const up = e => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (!pts.size) { drag = null; svg.classList.remove("dragging"); setTimeout(() => { moved = false; }, 0); }
    };
    svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
    svg.addEventListener("click", e => { if (moved) return; const g = e.target.closest(".kl-feat"); if (g) select(g.dataset.id); });
  }

  /* ---------- 타이틀의 빈 자리 ---------- */
  function armTitle(sec) {
    if (!sec || sec.dataset.kl) return;
    sec.dataset.kl = "1";
    if (st.seen) sec.classList.add("kl-known");
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "kl-seat"; btn.setAttribute("aria-label", "빈 자리");
    sec.appendChild(btn);
    const place = () => {
      if (!sec.isConnected) { removeEventListener("resize", place); return; }
      const c = sec.querySelector(".seat.empty circle"); if (!c) return;
      const r = c.getBoundingClientRect(), s = sec.getBoundingClientRect();
      btn.style.left = (r.left + r.width / 2 - s.left) + "px"; btn.style.top = (r.top + r.height / 2 - s.top) + "px";
    };
    place(); setTimeout(place, 400); setTimeout(place, 1600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    addEventListener("resize", place);
    let n = 0, timer = 0;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      if (sec.classList.contains("leaving")) return;
      n++; clearTimeout(timer);
      timer = setTimeout(() => { n = 0; sec.classList.remove("kl-1", "kl-2"); }, 2600);
      sec.classList.remove("kl-1", "kl-2"); void sec.offsetWidth; sec.classList.add(n >= 2 ? "kl-2" : "kl-1");
      if (n < 3) { const pip = document.createElement("div"); pip.className = "kl-ripple small"; pip.style.left = btn.style.left; pip.style.top = btn.style.top; sec.appendChild(pip); setTimeout(() => pip.remove(), 800); }
      if (n >= 3) {
        n = 0; clearTimeout(timer);
        const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
        const rp = document.createElement("div"); rp.className = "kl-ripple";
        rp.style.left = btn.style.left; rp.style.top = btn.style.top; sec.appendChild(rp);
        setTimeout(() => rp.remove(), 1100);
        setTimeout(() => { sec.classList.remove("kl-1", "kl-2"); sec.classList.add("kl-known"); open(x, y); }, 260);
      }
    });
  }
  function watch() {
    const app = document.getElementById("app");
    if (!app) return;
    const check = () => { const t = document.getElementById("title"); if (t) armTitle(t); };
    check();
    new MutationObserver(check).observe(app, { childList: true });
  }
  /* 키보드: 게임 밖 화면에서 kailan */
  let typed = "";
  document.addEventListener("keydown", e => {
    if (ov || e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    const tg = e.target;
    if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
    if (typeof App !== "undefined" && App.screen === "game") return;
    typed = (typed + e.key.toLowerCase()).slice(-6);
    if (typed === "kailan") { typed = ""; open(); }
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch); else watch();

  return { open, close, armTitle, places: P, mapSVG: () => mapSVG(true) };
})();

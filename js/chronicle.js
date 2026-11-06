/* ETHERION — 에테리온 연대기 (v3.7)
   상단 띠 오른쪽 날개의 '연대기'(지도 옆)를 누르면 열린다. 세계관을 책처럼 장을 넘기며 읽는 화면.
   - 제1부 "세 갈래의 전쟁" = 지금의 게임. 서문 + 열 장.
   - 제2~4부는 봉인(자물쇠). 누르면 화면이 어두워지고 다음을 기약한다. 제목은 지워 두고 한 줄 예고만.
   - 내용은 docs/WORLD.md(세계관 v3)를 따른다. 9장 "숨은 진실"(만드는 쪽만 아는 것)과 2부 이후의 사건은 넣지 않는다.
   - 읽은 장 · 마지막 위치는 localStorage "etherion.chronicle". 지도의 여덟 번째 자리를 찾았으면(etherion.kailan) 5장에 한 문단이 더 보인다. */
"use strict";

const Chronicle = (() => {
  const KEY = "etherion.chronicle";
  let st = {};
  try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { st = {}; }
  if (!Array.isArray(st.read)) st.read = [];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* 저장 못 해도 읽기는 된다 */ } };
  const eighthFound = () => { try { return !!(JSON.parse(localStorage.getItem("etherion.kailan")) || {}).eighth; } catch (e) { return false; } };
  const h = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- 작은 조각 ---------- */
  const elc = k => (typeof ELEMENTS !== "undefined" && ELEMENTS[k] ? ELEMENTS[k].color : "#d9b46a");
  const facc = k => (typeof FACTIONS !== "undefined" && FACTIONS[k] ? FACTIONS[k].color : "#d9b46a");
  /* 이름 줄: 왼쪽에 구슬(색) · 이름 · 칭호, 아래에 설명 */
  const row = (name, tag, text, color, extra) => `<li class="cr-row"${color ? ` style="--rc:${color}"` : ""}><i class="cr-orb${color ? "" : " plain"}" aria-hidden="true"></i><div><b>${name}</b>${tag ? `<small>${tag}</small>` : ""}<p>${text}</p>${extra || ""}</div></li>`;
  const rows = items => `<ul class="cr-rows">${items.join("")}</ul>`;
  const flag = (gid, org) => {
    const G = typeof GROUPS !== "undefined" ? GROUPS[gid] : null;
    if (!G) return "";
    return `<li class="cr-flag" style="--gc:${G.color}">${typeof glyphSVG === "function" ? glyphSVG(G.glyph) : ""}<div><b>${h(G.name)}</b><small>${org}</small><p>“${h(G.motto)}”</p></div></li>`;
  };
  const faction = (fk, how, land, text, flags) => {
    const F = typeof FACTIONS !== "undefined" ? FACTIONS[fk] : { name: fk, en: "", motto: "" };
    return `<section class="cr-fac" style="--fc:${facc(fk)}"><header><b>${h(F.name)}</b><span class="en">${h(F.en)}</span><em>${how}</em></header>
      <p class="cr-land">${land} · <span>“${h(F.motto)}”</span></p><p>${text}</p><ul class="cr-flags">${flags}</ul></section>`;
  };
  /* 장식 구분선: 가운데 금 마름모 + 양쪽으로 사라지는 선 (가이드 2.5) */
  const DIV = '<svg class="cr-div" viewBox="0 0 280 12" aria-hidden="true"><defs><linearGradient id="crDivL"><stop offset="0" stop-color="#d9b46a" stop-opacity="0"/><stop offset="1" stop-color="#d9b46a" stop-opacity=".6"/></linearGradient><linearGradient id="crDivR"><stop offset="0" stop-color="#d9b46a" stop-opacity=".6"/><stop offset="1" stop-color="#d9b46a" stop-opacity="0"/></linearGradient></defs><path d="M0 6h126" stroke="url(#crDivL)"/><path d="M154 6h126" stroke="url(#crDivR)"/><path d="M140 1.5l4.5 4.5-4.5 4.5-4.5-4.5z" fill="#d9b46a"/></svg>';
  const rule = DIV;
  const quote = (t, who) => `<blockquote class="cr-quote"><p>${t}</p>${who ? `<cite>${who}</cite>` : ""}</blockquote>`;

  /* ---------- 제1부: 세 갈래의 전쟁 ---------- */
  const CH = [
    { id: "pro", n: "서문", en: "Prologue", t: "기록을 펼치며", body: () => `
      <p>이 책은 린데어 자유시의 기록관에 전해 내려오는 이야기를 한데 엮은 것이다. 세 진영 어디에도 속하지 않은 도시였기에, 이곳의 기록관만은 아다만트의 장부와 푸른숲의 노래와 비술의 계약서를 한 책상 위에 나란히 펼쳐 놓을 수 있었다.</p>
      <p>기록은 서로 어긋난다. 아다만트는 거인을 <em>광맥</em>이라 적고, 푸른숲은 <em>잠든 형제</em>라 노래하며, 비술은 <em>신보다 먼저 빚어진 그릇</em>이라 부른다. 기록관은 어느 쪽이 옳은지 가리지 않았다. 다만 셋이 모두 같은 것을 가리키고 있다는 것만은 적어 두었다.</p>
      <p>세상에서 일어난 모든 일은 기록자 이벨의 서고에 빠짐없이 적힌다고 한다. 그러나 그 서고를 본 자는 없다. 그러니 이 책은 이벨의 기록이 아니다. 필멸자가 필멸자의 눈으로 본 것, 그 가운데 지금까지 알려진 것만을 담았다.</p>
      ${quote("책의 뒷장은 비어 있다. 아니, 비어 있는 것이 아니라 아직 펼쳐지지 않았을 뿐이다.", "린데어 기록관의 머리말")}` },

    { id: "c1", n: "I", en: "The Land Where Ether Flows", t: "에테르가 흐르는 땅", body: () => `
      <p>세계의 이름은 <b>에테리온</b>, “에테르가 흐르는 땅”이다. 에테르는 근원신 아르케가 세계를 빚을 때 쓴 근원의 힘이다. 마법도 신성도 원소도, 아다만트 공방의 증기 기관을 돌리는 동력까지도 모두 에테르로 이루어져 있다.</p>
      <p>필멸자가 사는 대륙은 <b>카일란</b>이다. 대륙은 넓고 대부분이 미지의 땅이다. 문명은 일곱 용의 영역이 고리처럼 둘러싼 안쪽, 대륙 중남부에 모여 있다. 고리 바깥으로 나간 자는 적고, 돌아온 자는 더 적다.</p>
      <h4>존재의 다섯 층</h4>
      <p>학자들은 세계에 있는 것을 다섯 층으로 나눈다. 위로 갈수록 수가 적고, 아래로 갈수록 많아지며 서로 다툰다.</p>
      ${rows([
        row("근원", "아르케 · 삼좌", "모든 것의 위. 아르케는 행방을 알 수 없고, 지금도 실재하는지조차 확인된 바 없다.", "#f6e2a8"),
        row("초월", "거인 일곱 · 신 다섯 · 용 일곱", "셋은 동격이다. 누가 더 위인지는 한 번도 밝혀진 적이 없다.", "#d9b46a"),
        row("상위", "승천자 · 대정령 · 재앙수", "필멸자보다는 확실히 위, 초월자보다는 아래. 지금도 수가 늘고 있다.", "#c8a0ff"),
        row("필멸", "세 진영의 아홉 깃발과 인간", "그대가 서 있는 곳. 이 책의 대부분은 이들의 이야기다.", "#8fdcff"),
        row("바깥", "공허의 것들", "에테르로 이루어지지 않은 것들. 같은 법칙 위에 있지 않아 위아래를 잴 수조차 없다.", "#6d6a80")
      ])}
      <p>세계 안의 모든 것은 에테르로 되어 있다. 예외는 단 하나뿐이라고 기록관은 적었다. 그 이야기는 이 책의 아홉 번째 장에서 다시 하게 된다.</p>` },

    { id: "c2", n: "II", en: "Body, Will, Power", t: "몸, 뜻, 힘", body: () => `
      <p>태초에 근원신 <b>아르케</b>만이 있었다.</p>
      <p>아르케는 세계를 기록하고, 심판하고, 지키기 위해 세 자리를 두었다. 이를 <b>삼좌</b>라 부른다.</p>
      ${rows([
        row("이벨", "기록자", "세계에서 일어나는 모든 일을 기록한다. 그 기록이 어디 있는지는 아무도 모른다.", "#e8c46a"),
        row("하르간", "심판자", "신조차 심판할 수 있다. 단 한 번 신을 벌한 적이 있다는 전설만 남았고, 그 신이 누구였는지는 전해지지 않는다.", "#e8c46a"),
        row("세렌", "문지기", "세계의 경계를 지킨다. 경계를 떠난 적이 없고, 경계 너머에 대해 말한 적도 없다.", "#e8c46a")
      ])}
      <p>아르케는 먼저 세계의 <b>몸</b>을 빚었다. 태초의 거인 일곱이다. 셋은 대지와 바다와 하늘의 틀을 빚고, 넷은 그 속에 불과 쇠와 번개와 모래를 채웠다.</p>
      <p>남은 에테르는 둘로 나뉘었다. <b>뜻</b>은 다섯 신이 되어 개념을 다스리고, <b>힘</b>은 일곱 용이 되어 원소를 다스린다. 빛과 암흑은 신의 것이고, 나머지 일곱 원소 — 화염 · 물 · 대지 · 바람 · 번개 · 숲 · 금속 — 는 용의 것이다.</p>
      <dl class="cr-tri"><dt>몸</dt><dd>태초의 거인 일곱 · 세계의 재료. 잠들어 땅이 되었다.</dd><dt>뜻</dt><dd>신 다섯 · 세계의 뜻. 서약한 자에게 뜻을 내려 준다.</dd><dt>힘</dt><dd>용 일곱 · 세계의 힘. 거인의 몸 위에 산다.</dd></dl>
      <p>일을 마친 거인들은 지쳐 잠들었다. 그들이 누운 자리가 지금의 산맥과 해구와 사막이다. 용들은 저마다 거인의 몸 위에 거처를 정했고, 그 위에서 필멸의 종족들이 태어났다.</p>
      <p>그 뒤로 아르케는 모습을 감추었다. 다섯 신 가운데 누구도 아르케를 직접 본 적이 없으며, 오직 삼좌를 통해서만 뜻을 전해 받는다. 아르케의 상징은 아무것도 그려지지 않은 <b>빈 원</b>이다.</p>
      <h4>에테리온 문장</h4>
      <p>세계 어디서나 보이는 문장은 이 창세를 한 장에 새긴 것이다. 가장 바깥 테에는 거인 일곱의 돌, 그 안의 고리에는 용 일곱의 보석, 안쪽에는 신 다섯의 별, 그리고 한가운데에는 아르케의 빈 원이 있다.</p>
      <p>고리의 동쪽 홈 하나는 늘 비어 있다. 장인들은 아무도 시키지 않았는데도 그 자리를 비워 두고, 작은 물음표를 새긴다.</p>` },

    { id: "c3", n: "III", en: "The Seven Sleeping Titans", t: "잠든 일곱 거인", body: () => `
      <p>거인은 모두 잠들어 있다. 필멸자에게는 관심이 없다. 거인이 뒤척이면 땅의 모양이 바뀐다.</p>
      <p>잠든 몸은 산맥 하나 크기지만, 거인의 힘은 크기에서 나오지 않는다. 자신이 빚은 땅 전체와 이어져 있다는 데서 나온다. 오르둔이 돌아눕기만 해도 대륙 전체가 흔들린다.</p>
      <p>잠든 거인의 몸이 수천 년 굳으면 <b>아다만트</b>가 된다. 깨지지 않는 금속이다. 뼈가 굳으면 회색, 피가 굳으면 검붉은색, 숨이 굳으면 푸른빛을 띤다. 아다만트 연합이라는 이름은 여기서 왔다.</p>
      ${rows([
        row("오르둔", "뼈 · 대지", "대륙 한가운데에 남북으로 누웠다. 머리는 왕좌봉, 등뼈는 등뼈 산맥, 갈비는 갈비 능선, 오른손바닥은 성좌 고원이다. 가장 깊이 잠들었으나, 요즘 왕좌봉에 지진이 잦다.", "#8b8578"),
        row("탈라쿠스", "피 · 바다", "남쪽 바다 밑에 누웠다. 해구가 심장, 조수가 맥박이다. 검은 피가 땅 밑 핏줄을 따라 대륙 아래를 흐른다. 그 맥박이 점점 빨라지고 있다.", "#8b8578"),
        row("아우라곤", "숨 · 하늘", "몸이 흩어져 하늘의 부유 군도가 되었다. 북서의 호수들이 마지막 발자국이다. 잠든 것인지, 죽은 것인지, 떠난 것인지 아무도 모른다.", "#8b8578"),
        row("도르마크", "심장불", "화관 산맥 아래에 가슴을 묻었다. 화산의 불은 아직 식지 않은 그의 심장이다.", "#8b8578"),
        row("소르그림", "힘줄 · 쇠", "철골 산맥이 그의 팔이고, 드러난 광맥이 힘줄이다.", "#8b8578"),
        row("케라운", "신경 · 번개", "뇌명 고원 아래에 누웠다. 번개가 그의 신경을 타고 땅 위로 튄다.", "#8b8578"),
        row("아샤르", "살갗 · 모래", "용이 살지 않는 아샤라 사막이 그의 살갗이다. 모래 관문이 그 속에 묻혀 있다.", "#8b8578")
      ])}
      <p>용들은 거인을 “먼저 태어난 형제”로 대하며, 그 잠을 깨우지 않으려 한다.</p>
      ${quote("깨어난 거인은 몸을 줄인 화신을 걸어 보낸다. 화신이 입은 상처는 본체가 누운 땅에 금으로 새겨진다.", "녹철 구릉의 오래된 광부 노래 · 아직 본 자는 없다")}` },

    { id: "c4", n: "IV", en: "The Five Gods", t: "다섯 신", body: () => `
      <p>신은 직접 싸우지 않는다. 서약한 자에게 가호와 뜻을 내려 세계에 관여한다.</p>
      ${rows([
        row("솔란테", "새벽의 어머니 · 빛 · 질서 · 맹세", "떠오르는 해와 검. 여섯 날개의 빛나는 여인으로 그려진다. 자비롭지만 맹세를 어긴 자에게는 가차 없다. 성광 천족이 그 빛을 받는다.", elc("light")),
        row("모르카스", "침묵의 군주 · 어둠 · 금기 · 대가", "저울과 감긴 눈. 얼굴 없는 그림자 왕. 악이 아니라 “대가의 법칙” 그 자체이며, 맺은 거래는 반드시 지킨다. 심연 마족이 그와 계약한다.", elc("dark")),
        row("실바레", "푸른 숨결 · 생명 · 성장 · 순환", "씨앗과 해골이 맞물린 원. 봄에는 소녀, 겨울에는 노파의 모습이다. 탄생과 죽음을 같은 것으로 본다. 어느 깃발에도 힘을 내리지 않고, 푸른숲 맹약의 증인이 되었다.", elc("forest")),
        row("벨루미르", "별을 읽는 자 · 지혜 · 마법 · 진리", "펼친 책과 별. 천 개의 눈이 박힌 로브를 입었다. 호기심이 많아 필멸자와 가장 자주 대화한다. 폭풍 하이엘프가 그 앎을 받는다.", elc("wind")),
        row("크로네아", "실을 잣는 자 · 운명 · 시간", "물레와 끊어진 실. 과거와 현재와 미래, 세 얼굴을 가졌다. 어느 편도 들지 않아 다른 신들조차 경계한다. 린데어 자유시에서 돌아가는 수레바퀴가 그의 것이다.", "#cdb07a")
      ])}
      <p>솔란테와 모르카스는 대립하지만 서로를 없애려 하지 않는다. 빛과 어둠은 짝이라는 것을 둘 다 알고 있다.</p>` },

    { id: "c5", n: "V", en: "The Seven-Dragon Ring", t: "칠룡의 고리", body: () => `
      <p>일곱 용은 서로 싸우지 않고, 서로의 영역에 들어가지 않기로 맹세했다. 이것이 <b>칠룡의 서약</b>이다.</p>
      <p>아주 먼 옛날 두 용이 싸웠을 때 대륙 하나가 바다 밑으로 가라앉았다. 일곱 용은 함께 그 땅을 봉인했고, 그곳은 지금 <b>잠긴 왕국 네레아</b>라 불린다. 어느 두 용이었는지는 전해지지 않는다.</p>
      <p>그 뒤로 용들은 한 번도 우열을 가린 적이 없다. 그래서 린데어의 주점에서는 오늘 밤에도 “누가 가장 센 용인가”를 두고 주먹다짐이 벌어진다.</p>
      <p>용의 영역, 곧 <b>용역</b>은 필멸자의 땅을 고리처럼 둘러싸고 있다. 필멸자도 용역에는 함부로 들어가지 않으니, 고리는 그대로 문명의 국경이 되었다.</p>
      ${rows([
        row("고르바스", "대지 · 북 · 왕좌봉", "칠룡 가운데 가장 큰 덩치. 등에 바위와 숲이 자란다. 느긋하여 한 번 잠들면 수백 년을 잔다. 바위주먹 오크와 맹약했다.", elc("earth")),
        row("시렐", "바람 · 북동 · 아우라곤의 파편 군도", "깃털 같은 날개, 반쯤 바람인 몸. 변덕스럽고 장난기가 많다. 아직 누구와도 맹약하지 않았다.", elc("wind")),
        row("이그날", "화염 · 남동 · 화관 산맥", "비늘 사이로 용암이 흐른다. 격정적이고 솔직하다. 자기 발밑을 캐는 포르탄을 미워한다.", elc("fire")),
        row("마렌시아", "물 · 남 · 탈라쿠스 해구", "반투명한 긴 몸, 날개 대신 지느러미. 차분하고 무엇이든 오래 기억한다. 푸른비늘 인어와 맹약했다.", elc("water")),
        row("베르단", "숲 · 남서 · 태고림 산맥", "고목 가지 같은 뿔, 이끼 덮인 비늘. 온화하고 지키려는 마음이 크다. 이끼 트롤과 맹약했다.", elc("forest")),
        row("페로스", "금속 · 서 · 철골 산맥", "거울처럼 되비치는 비늘. 날지 않는 유일한 용이다. 과묵한 장인 기질로, 제 영역으로 파고드는 두르크하임을 말없이 지켜본다.", elc("metal")),
        row("아스트라크", "번개 · 북서 · 뇌명 고원", "몸에서 늘 번개가 튄다. 칠룡 중 가장 빠르고, 날카롭고 성급하다. 번개를 병에 가두는 볼타리움과는 원수다.", elc("lightning"))
      ])}
      <p>맹약하지 않은 네 용 — 시렐, 이그날, 페로스, 아스트라크 — 을 찾아가는 것은 그 용에게 <b>시험받는 일</b>이다. 고리를 따라 여섯 번 싸우는 모험가들의 길을 사람들은 <em>칠룡의 고리 원정</em>이라 부른다.</p>
      <p>고리의 동쪽은 비어 있다. 용들은 그쪽을 바라보지 않는다.</p>
      ${eighthFound() ? `<div class="cr-found"><b>지도의 빈 자리를 확인한 자에게</b><p>고리는 원래 여덟 자리였고, 지금 빈 땅이 된 동쪽이 여덟 번째 용의 자리였다는 소문이 있다. 일곱 용은 그 이름을 입에 올리지 않는다. 기록관도 그 이름을 찾지 못했다.</p></div>` : ""}` },

    { id: "c6", n: "VI", en: "Beyond Mortal", t: "필멸을 넘어선 것들", body: () => `
      <p>초월자와 필멸자 사이에는 또 하나의 층이 있다. 처음부터 그렇게 빚어진 것이 아니라 <b>올라온</b> 자들, 원소가 고여 의지를 얻은 것들, 그리고 누구의 말도 듣지 않는 거대한 짐승들이다.</p>
      <h4>승천자</h4>
      <p>필멸자가 한계를 넘어 오른 존재다. 어느 종족이든 될 수 있다. 길은 여섯이라 전해진다. 신이 들어 올리는 <em>신앙</em>, 진리를 깨닫는 <em>지혜</em>, 대가를 치르는 <em>계약</em>, 스스로를 개조하는 <em>기술</em>, 자연과 하나가 되는 <em>합일</em>, 그리고 용이나 거인에게 직접 인정받는 <em>투쟁</em>.</p>
      ${rows([
        row("철심 브론", "드워프 · 기술", "최초의 골렘을 만든 대장장이. 자기 심장을 기계로 바꿔 올랐다. 신을 섬기지 않는 아다만트는 그를 “증명된 가능성”이라 기린다.", elc("metal")),
        row("은월 리시엘", "합일", "불타는 숲을 지키다 고목과 하나가 되었다. 정령인지 승천자인지 학자들 사이에서도 의견이 갈린다.", elc("forest")),
        row("잿갈기 카르노", "오크 · 투쟁", "백 번의 결투 끝에 고르바스에게 인정받았다. 지금도 강한 자를 찾아 결투를 청한다.", elc("earth")),
        row("아즈라", "마족 · 계약", "모르카스와 거래해 올랐다. 무엇을 내주었는지는 아무도 모른다. 그녀에게는 그림자가 없다.", elc("dark")),
        row("이사크", "인간 · 지혜", "벨루미르의 제자. 별의 문자를 처음으로 읽어 냈고, 폭풍탑 마도회를 세웠다.", elc("wind")),
        row("일곱 번째", "오토마톤", "번개 노움이 만든 일곱 번째 시제품. 어느 날 스스로 생각하기 시작했다. “기계가 승천할 수 있는가”를 두고 세계가 아직 논쟁 중이다.", elc("lightning"))
      ])}
      <h4>대정령</h4>
      <p>원소가 한곳에 오래 고여 의지를 가진 존재다. 용에게서 흘러나온 원소로 생겨나 용을 “큰 근원”으로 존경하지만, 섬기지는 않는다. 빛과 암흑은 신의 것이라 정령이 없다.</p>
      <dl class="cr-tri sm">
        <dt style="color:${elc("fire")}">이프라</dt><dd>화염 · 끝없이 타오르는 춤꾼. 멈추면 꺼진다고 믿는다.</dd>
        <dt style="color:${elc("water")}">넬리아</dt><dd>물 · 형체 없이 흐른다. 담긴 그릇에 따라 성격이 바뀐다.</dd>
        <dt style="color:${elc("earth")}">그롬</dt><dd>대지 · 한 마디에 백 년이 걸린다.</dd>
        <dt style="color:${elc("wind")}">실피스</dt><dd>바람 · 소문을 실어 나르며 세상에서 가장 많은 비밀을 안다.</dd>
        <dt style="color:${elc("lightning")}">즈라크</dt><dd>번개 · 한곳에 머물지 못한다. 볼타리움의 병에 갇혔다가 탈출한 적이 있다.</dd>
        <dt style="color:${elc("forest")}">드리엔</dt><dd>숲 · 숲의 기억을 품는다. 리시엘과 가장 가깝다.</dd>
        <dt style="color:${elc("metal")}">코발</dt><dd>금속 · 정령 중 유일하게 단단한 몸. 드워프와 거래하기를 좋아한다.</dd>
      </dl>
      <h4>재앙수</h4>
      <p>필멸자의 군대로도 막기 어려운 거대한 괴물이다. 의지는 짐승에 가까워 대화도 계약도 거의 통하지 않는다.</p>
      <dl class="cr-tri sm">
        <dt>우르보아</dt><dd>탈라쿠스의 핏방울에서 태어난 심해의 거대 뱀. 나타나면 항로가 끊긴다.</dd>
        <dt>아르마돈</dt><dd>등에 숲이 자란 산만 한 거북. 오르둔의 조각이다. 천 년에 한 번 움직인다.</dd>
        <dt>마그로스</dt><dd>남부 화산에서 태어난 용암 거수. 이그날조차 귀찮아한다.</dd>
        <dt>템페스타</dt><dd>바람과 번개가 뒤엉킨 살아 있는 폭풍.</dd>
        <dt>공허먹이 바르그</dt><dd>에테르를 먹는 늑대 무리. 무리 전체가 하나의 의지처럼 움직인다.</dd>
      </dl>` },

    { id: "c7", n: "VII", en: "Three Factions, Nine Banners", t: "세 진영, 아홉 깃발", body: () => `
      <p>필멸자의 진영은 종족이 아니라 <b>힘의 근원</b>으로 나뉜다. 오르둔의 등뼈가 대륙을 동서로 가르고, 그 갈비가 서부를 다시 둘로 나눈다. 산맥이 곧 진영의 경계다.</p>
      ${faction("brass", "거인을 캔다", "녹철 구릉 · 북서부 · 수도 코그하번",
        "신을 섬기지 않고, 용에게서도 힘을 받지 못했다. 그래서 잠든 거인의 몸을 광맥처럼 파 아다만트를 얻고, 그것으로 증기와 톱니와 화약의 문명을 세웠다. 용의 원소를 기계로 흉내 내거나 훔쳐, 이그날과 아스트라크와 페로스가 불쾌해한다. 그 대가로 거인이 뒤척인다.",
        flag("B1", "화약 포병단 · 포르탄") + flag("B2", "강철 골렘 공방 · 두르크하임") + flag("B3", "뇌전 학술원 · 볼타리움"))}
      ${faction("verdant", "용에게 빌린다", "에일렌 대삼림과 남서 해안",
        "씨족과 부족의 연합. 용과 맺은 맹약으로 힘을 빌리고, 용의 영역을 지키며 되갚는다. 문자보다 노래로 역사를 전하고, 죽은 자는 나무 아래 묻어 숲과 바다로 돌려보낸다.",
        flag("G1", "바위송곳니 부족 · 가르운 대야영지") + flag("G2", "고목 수호회 · 실바니엘") + flag("G3", "샘물 무녀단 · 셀레네아"))}
      ${faction("arcane", "신에게서 받는다", "성좌 고원 · 동부 · 수도 새벽성 엘라드",
        "거인 오르둔의 오른손바닥 위, 사방이 막힌 고원에서 자랐다. 신에게 서약하고 뜻을 내려받는다. 계약은 피로, 맹세는 목숨으로, 앎은 평생으로 치른다. 빛의 천족과 어둠의 마족이 한 성회에 있는 위태로운 동맹이며, 빈 땅과 맞닿은 유일한 진영이라 스스로를 “세계의 방패”라 부른다.",
        flag("A1", "심연 계약단 · 녹타르") + flag("A2", "성광 기사단 · 새벽성 엘라드") + flag("A3", "폭풍탑 마도회 · 벨루미르의 바늘"))}
      <p class="cr-aside">인간에게는 깃발이 없다. 인간은 어느 진영에나 섞여 산다.</p>
      <h4>진영 사이</h4>
      <ul class="cr-rel">
        <li><b style="color:${facc("brass")}">아다만트</b> ↔ <b style="color:${facc("verdant")}">푸른숲</b><span class="cr-tag bad">맞닿음 · 전쟁</span><p>갈비 능선의 톱니 고개를 사이에 둔다. 벌목과 공장 폐수가 녹물강을 타고 숲을 잠식하고, 녹슨 늪이 넓어진다. 그리고 아다만트가 캐는 거인의 몸 위에, 푸른숲이 맹약한 용이 산다.</p></li>
        <li><b style="color:${facc("verdant")}">푸른숲</b> ↔ <b style="color:${facc("arcane")}">비술</b><span class="cr-tag good">멀리 · 우호</span><p>땅으로는 멀지만 인어의 바닷길로 교역한다. 둘 다 초월자에게서 힘을 얻는다는 공감대가 있다.</p></li>
        <li><b style="color:${facc("brass")}">아다만트</b> ↔ <b style="color:${facc("arcane")}">비술</b><span class="cr-tag">단절 · 냉전</span><p>등뼈 산맥에 가로막혔고, 유일한 산길인 잿바람 협로는 닫혀 있다. 서로를 “신을 모르는 기계쟁이”, “하늘만 보는 광신도”라 부른다. 첩보전은 관문으로 벌어진다.</p></li>
        <li><b style="color:#cdb07a">린데어 자유시</b><span class="cr-tag gold">중립</span><p>세 진영이 유일하게 마주치는 자유 교역 도시. 이 책이 쓰인 곳이다.</p></li>
      </ul>` },

    { id: "c8", n: "VIII", en: "Lands and Roads", t: "땅과 길", body: () => `
      <p>카일란의 지명은 거인의 몸과 용의 거처를 따라 붙었다. 자세한 위치는 <button type="button" class="cr-link" data-map>카일란 대륙 전도</button>에 그려져 있다.</p>
      <h4>린데어 자유시</h4>
      <p>남쪽 해안의 교역 도시. 상인 평의회가 다스리고, 운명의 신 크로네아의 신전이 있다. 성로의 중심 관문인 <b>린데어 환석</b>이 도시 한가운데에 서 있다. 교역소에서 돈으로 쓰는 <em>환석 조각</em>은 이 관문에서 떨어져 나온 조각이라고 한다.</p>
      <h4>성로와 관문</h4>
      <p>대륙 곳곳에 돌로 된 고리 모양의 관문, <b>환석</b>이 서 있다. 그 관문들을 잇는 보이지 않는 길이 <b>성로</b>다. 누가 만들었는지는 모른다. 삼좌가 놓았다는 설도, 거인이 놓았다는 설도 있다.</p>
      <dl class="cr-tri sm">
        <dt>린데어 환석</dt><dd>성로의 중심.</dd>
        <dt>첫 고목의 문</dt><dd>이끼 트롤의 결계령 실바르온으로 가는 문.</dd>
        <dt>바늘 꼭대기</dt><dd>벨루미르의 바늘 끝. 하늘 요람으로 이어진다.</dd>
        <dt>새벽성 지하</dt><dd>봉인되어 있다. 이유는 알려지지 않았다.</dd>
        <dt>모래 관문 · 발자국 관문</dt><dd>잠들어 있다.</dd>
        <dt>위상 관문</dt><dd>코그하번에 아다만트가 만든 인공 관문. 불안정하다.</dd>
        <dt>빈 땅 관문</dt><dd>죽어 있어야 한다. 9장을 보라.</dd>
      </dl>
      <h4>결계령</h4>
      <p>세계 안에 접혀 있는 또 하나의 세계들이다.</p>
      ${rows([
        row("실바르온", "첫 고목 · 이끼 트롤과 베르단", "시간이 열 배 느리게 흐른다.", "#e8c46a"),
        row("심연의 장막", "모르크 협곡 바닥 · 모르카스", "계약의 세계. 들어간 자는 반드시 무언가를 두고 나온다.", "#e8c46a"),
        row("하늘 요람", "벨루미르의 바늘 꼭대기 · 만든 이 모름", "아우라곤의 심장 자리라는 설이 있다. 시렐이 지킨다.", "#e8c46a"),
        row("잠긴 왕국 네레아", "침몰해 밑 · 칠룡", "두 용의 싸움으로 가라앉은 대륙.", "#e8c46a"),
        row("이벨의 서고", "위치 불명 · 이벨", "세계의 모든 기록. 폭풍탑 마도회가 수백 년째 찾고 있다.", "#e8c46a"),
        row("회색 감옥", "빈 땅 깊은 곳 · 세렌과 고대의 성광 기사단", "무언가를 가두고 있다.", "#e8c46a")
      ])}
      <h4>고리 바깥</h4>
      <p>북쪽의 <b>백야의 동토</b>, 북서쪽의 <b>거인의 발자국</b>, 북동쪽 끝의 <b>무명 산맥</b>, 서쪽의 <b>안개 바다</b> — 나간 배가 돌아오지 않는다 — , 남쪽의 <b>침몰해</b>. 그리고 동쪽의 <b>빈 땅</b>.</p>` },

    { id: "c9", n: "IX", en: "Beyond the Boundary", t: "경계 너머", body: () => `
      <p>문지기 세렌이 지키는 세계의 경계 너머에서 오는 것들이 있다.</p>
      <p>그것들은 아르케가 만들지 않았고, 에테르로 이루어져 있지 않다. 그래서 원소도 신성도 마법도 그것들에게는 제대로 통하지 않는다. 모습은 기하학적이고 때로는 금속처럼 보인다. 생물인지 기계인지, 마법인지 기술인지 아무도 알지 못한다. 사람들은 그저 <b>공허의 것들</b>이라 부른다.</p>
      ${rows([
        row("오블리온", "삼키는 자", "닿는 곳의 에테르를 지운다. 그 자리에서는 마법도 신성도 원소도 작동하지 않는다. 대륙 동쪽의 거대한 빈 땅이 그 흔적이라고 한다.", "#6d6a80"),
        row("미라제", "비추는 자", "본 것을 완벽하게 흉내 낸다. 모습과 힘과 목소리까지. 신의 모습으로 나타나 신도들을 속였다는 기록이 있다.", "#6d6a80"),
        row("누르엘", "속삭이는 자", "필멸자의 꿈에 말을 건다. 무엇을 말하는지 기억하는 자는 없다.", "#6d6a80")
      ])}
      <p>빈 땅에는 에테르가 없다. 풀도 자라지 않고 바람도 소리를 내지 않는다. 그 깊은 곳에는 아주 오래전 세렌과 고대의 성광 기사단이 만든 결계령, <b>회색 감옥</b>이 있다. 무엇이 갇혀 있는지는 어떤 기록에도 없다.</p>
      <p>황혼의 장벽 위에서 동쪽을 지키는 성광 기사들은 이상한 이야기를 한다. 관문은 에테르로 움직이니 빈 땅의 관문은 죽어 있어야 하는데, 가끔 그곳에서 빛이 새어 나온다는 것이다. 누군가 관문을 거꾸로 쓰고 있다는 소문이 돈다.</p>
      ${quote("경계에 대해 묻자 문지기는 대답하지 않았다. 다만 처음으로 등을 돌려, 동쪽을 바라보았다고 한다.", "성광 기사단의 낡은 순찰 일지")}` },

    { id: "c10", n: "X", en: "The War at Sawtooth Pass", t: "톱니 고개의 전쟁", body: () => `
      <p>그리고 지금, 그대가 깃발을 들고 서 있는 시대다.</p>
      <p>갈비 능선의 <b>톱니 고개</b>에서 포성이 그치지 않는다. 포르탄 요새의 고블린 포대가 숲을 향해 포를 걸고, 두르크하임의 골렘이 고개를 넘는다. 볼타리움의 피뢰탑은 하늘의 번개를 병에 담아 전장으로 보낸다. 아다만트는 더 깊이 캔다. 거인의 몸이 그들의 갑옷이 되고, 포탄이 된다.</p>
      <p>푸른숲은 물러서지 않는다. 바위주먹 오크가 늑대를 타고 울부짖는 초원을 달리고, 이끼 트롤은 잘려도 다시 자라며, 셀레네아의 무녀들은 다친 자를 씻어 다시 일으킨다. 그들은 용의 힘을 빌려 숲을 지킨다. 녹물강이 숲으로 흘러드는 한, 이 싸움은 끝나지 않는다.</p>
      <p>등뼈 산맥 너머 성좌 고원에서, 비술 성회는 신의 뜻으로 고원을 지킨다. 잿바람 협로는 닫혀 있지만, 관문을 오가는 첩자들은 쉬지 않는다. 녹타르의 계약자는 피를 바쳐 일격을 사고, 엘라드의 기사는 동료 대신 칼을 맞으며, 바늘탑의 마도사는 바람으로 적의 계획을 흩는다.</p>
      <p>린데어의 수레바퀴는 오늘도 돌아간다. 상인들은 양쪽 모두에게 화약과 약초를 팔고, 교역소의 저울은 어느 편에도 기울지 않는다.</p>
      ${rule}
      <h4>징조</h4>
      <p>왕좌봉에 지진이 잦아졌다. 남쪽 바다에서는 탈라쿠스의 맥박이 빨라져, 조수가 예전 같지 않다고 어부들이 말한다. 사람들은 이것을 전쟁 탓이 아니라 거인의 변덕으로 여긴다. 거인은 원래 뒤척이는 법이니까.</p>
      <p>깃발 없는 모험가들은 맹약하지 않은 네 용을 찾아 칠룡의 고리를 돈다. 용의 시험을 넘은 자가 무엇을 얻는지는 저마다 다르게 말한다.</p>
      <p>그리고 황혼의 장벽의 기사들은 요즘 들어 동쪽을 바라보는 시간이 길어졌다.</p>
      ${quote("기록은 여기서 멈춘다. 이 전쟁이 어디로 흘러갈지 나는 알지 못한다. 다음 장을 쓰는 것은 내가 아니라, 지금 깃발을 든 그대일 것이다.", "린데어 기록관")}` }
  ];

  /* ---------- 봉인된 부: 제목은 지우고 한 줄만 ---------- */
  const SEALED = [
    { id: "p2", n: "제2부", en: "Part Two", tease: "하늘에서 목소리가 내려온다. 모두가 그것을 믿었다." },
    { id: "p3", n: "제3부", en: "Part Three", tease: "잠든 것이 눈을 뜬다. 그는 우리를 보지 않는다." },
    { id: "p4", n: "제4부", en: "Part Four", tease: "동쪽에서, 빛이 아닌 것이 온다." }
  ];
  const ORDER = [...CH.map(c => c.id), ...SEALED.map(s => s.id)];
  const byId = id => CH.find(c => c.id === id) || SEALED.find(s => s.id === id);
  const isSealed = id => SEALED.some(s => s.id === id);

  /* ---------- 그림: 책 표시 · 자물쇠 · 사슬 ---------- */
  const BOOK = '<svg class="cr-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="21" stroke-opacity=".35" stroke-dasharray="1 3"/><path d="M24 15.5c-3.6-2.4-8.3-3.1-12.5-2v20c4.2-1.1 8.9-.4 12.5 2 3.6-2.4 8.3-3.1 12.5-2v-20c-4.2-1.1-8.9-.4-12.5 2z"/><path d="M24 15.5v20"/><circle cx="24" cy="10" r="1.6" fill="currentColor" stroke="none"/></svg>';
  const LOCK_SM = '<svg class="cr-lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M7.5 10.5V8a4.5 4.5 0 019 0v2.5"/><rect x="5" y="10.5" width="14" height="10" rx="1.6"/><circle cx="12" cy="15.2" r="1.7"/></svg>';
  /* 큰 자물쇠: 고리(걸쇠) · 몸통 · 몸통의 점선 룬 고리 · 열쇠 구멍 = 아르케의 빈 원(에테르 빛 한 점이 새어 나옴) */
  const LOCK_BIG = `<svg class="cr-lock" viewBox="0 0 200 240" aria-hidden="true">
    <defs>
      <linearGradient id="crGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3cc"/><stop offset=".45" stop-color="#d9b46a"/><stop offset=".55" stop-color="#8a6a2a"/><stop offset="1" stop-color="#e6c47c"/></linearGradient>
      <linearGradient id="crBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1d2c"/><stop offset="1" stop-color="#0a0b13"/></linearGradient>
      <radialGradient id="crGlow"><stop offset="0" stop-color="#e9fbff"/><stop offset=".35" stop-color="#8fdcff" stop-opacity=".75"/><stop offset="1" stop-color="#8fdcff" stop-opacity="0"/></radialGradient>
    </defs>
    <path class="shackle" d="M58 112V74a42 42 0 0184 0v38" fill="none" stroke="url(#crGold)" stroke-width="13" stroke-linecap="round"/>
    <path d="M58 112V74a42 42 0 0184 0v38" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3" stroke-linecap="round" transform="translate(0 2)"/>
    <rect x="30" y="104" width="140" height="116" rx="12" fill="url(#crBody)" stroke="url(#crGold)" stroke-width="3.5"/>
    <rect x="38" y="112" width="124" height="100" rx="8" fill="none" stroke="#d9b46a" stroke-opacity=".28"/>
    <circle cx="100" cy="162" r="34" fill="none" stroke="#d9b46a" stroke-opacity=".45" stroke-dasharray="2 5"/>
    ${[0, 51.4, 102.9, 154.3, 205.7, 257.1, 308.6].map((a, i) => `<circle cx="${(100 + 34 * Math.sin(a * Math.PI / 180)).toFixed(1)}" cy="${(162 - 34 * Math.cos(a * Math.PI / 180)).toFixed(1)}" r="${i === 2 ? 0 : 2.6}" fill="#d9b46a" fill-opacity=".7"/>`).join("")}
    <circle class="glow" cx="100" cy="162" r="30" fill="url(#crGlow)"/>
    <circle cx="100" cy="162" r="13" fill="#05060a" stroke="url(#crGold)" stroke-width="3"/>
    <path d="M100 175v18" stroke="url(#crGold)" stroke-width="3" stroke-linecap="round"/>
    <circle class="spark" cx="100" cy="162" r="2.2" fill="#e9fbff"/>
    <path d="M30 128h140M30 196h140" stroke="#d9b46a" stroke-opacity=".12"/>
  </svg>`;
  /* 사슬: 화면을 비스듬히 가로지르는 두 줄 */
  const CHAIN = (cls) => `<svg class="cr-chain ${cls}" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="crLink${cls}" width="56" height="40" patternUnits="userSpaceOnUse"><rect x="4" y="11" width="34" height="18" rx="9" fill="none" stroke="#8a6a2a" stroke-width="5"/><rect x="4" y="11" width="34" height="18" rx="9" fill="none" stroke="#e6c47c" stroke-opacity=".55" stroke-width="1.6"/><rect x="31" y="16.5" width="22" height="7" rx="3.5" fill="#3a2c12" stroke="#d9b46a" stroke-opacity=".6" stroke-width="1.4"/></pattern></defs><rect width="1200" height="40" fill="url(#crLink${cls})"/></svg>`;

  /* ---------- 목차 ---------- */
  function tocHTML(cur) {
    const read = new Set(st.read);
    const chItem = c => `<li><button type="button" class="cr-ti${c.id === cur ? " on" : ""}${read.has(c.id) ? " read" : ""}" data-ch="${c.id}"${c.id === cur ? ' aria-current="true"' : ""}><span class="n">${c.n}</span><span class="t">${h(c.t)}</span></button></li>`;
    const sealedItem = s => `<li><button type="button" class="cr-ti sealed${s.id === cur ? " on" : ""}" data-ch="${s.id}" aria-label="${s.n} · 봉인됨"><span class="n">${LOCK_SM}</span><span class="t"><b>${s.n}</b><i class="cr-redact">■■ ■■</i></span></button></li>`;
    const done = CH.filter(c => read.has(c.id)).length;
    return `<p class="cr-part-h"><span>제1부</span>세 갈래의 전쟁</p>
      <ol class="cr-toc-list">${CH.map(chItem).join("")}</ol>
      <p class="cr-part-h sealed"><span>봉인된 기록</span></p>
      <ol class="cr-toc-list">${SEALED.map(sealedItem).join("")}</ol>
      <p class="cr-progress"><i style="--p:${(done / CH.length).toFixed(3)}"></i><span>제1부 · ${done} / ${CH.length}장 읽음</span></p>
      <p class="cr-note">모든 이름은 가칭입니다.</p>`;
  }

  /* ---------- 본문 ---------- */
  function pageHTML(id) {
    const i = ORDER.indexOf(id);
    if (isSealed(id)) {
      const s = byId(id);
      return `<article class="cr-sealed" data-sealed="${id}">
        ${CHAIN("a")}${CHAIN("b")}
        <div class="cr-seal-in">
          <p class="cr-eyebrow">${h(s.en)} · Sealed</p>
          <h2 class="cr-seal-n">${s.n}</h2>
          <p class="cr-seal-t"><i class="cr-redact">■■■ ■■</i></p>
          <button type="button" class="cr-lockbtn" data-shake aria-label="자물쇠 — 아직 열리지 않습니다">${LOCK_BIG}</button>
          <p class="cr-tease">“${h(s.tease)}”</p>
          <p class="cr-seal-msg">이 기록은 아직 봉인되어 있다.<br>다음 이야기가 열리는 날, 이 자물쇠가 풀린다.</p>
          <p class="cr-tbc">To be continued</p>
          <button type="button" class="cr-back" data-ch="c10">← 제1부의 마지막 장으로</button>
        </div>
      </article>`;
    }
    const c = byId(id);
    const prev = i > 0 ? byId(ORDER[i - 1]) : null;
    const next = byId(ORDER[i + 1]);
    const nextSealed = next && isSealed(next.id);
    return `<article class="cr-ch" data-ch-id="${c.id}">
      <header class="cr-ch-h"><p class="cr-eyebrow">${c.id === "pro" ? "Prologue" : `Chapter ${c.n} · ${h(c.en)}`}</p>
        <h2>${c.id === "pro" ? "" : `<span class="num">${c.n}</span>`}${h(c.t)}</h2>${DIV}</header>
      <div class="cr-text">${c.body()}</div>
      <nav class="cr-pager" aria-label="장 넘기기">
        ${prev ? `<button type="button" class="cr-pg prev" data-ch="${prev.id}"><small>← 앞 장</small><span>${h(prev.t)}</span></button>` : "<span></span>"}
        ${next ? `<button type="button" class="cr-pg next${nextSealed ? " sealed" : ""}" data-ch="${next.id}"><small>${nextSealed ? "다음 부" : "다음 장"} →</small><span>${nextSealed ? `${LOCK_SM}${next.n} · 봉인됨` : h(next.t)}</span></button>` : ""}
      </nav>
    </article>`;
  }

  /* ---------- 덮개 ---------- */
  let ov = null, cur = null, lastFocus = null;

  function open(ox, oy) {
    if (ov) return;
    lastFocus = document.activeElement;
    cur = st.at && byId(st.at) ? st.at : "pro";
    ov = document.createElement("div");
    ov.className = "cr-overlay";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "에테리온 연대기");
    ov.style.setProperty("--ox", (ox == null ? innerWidth / 2 : ox) + "px");
    ov.style.setProperty("--oy", (oy == null ? innerHeight / 2 : oy) + "px");
    ov.innerHTML = `<header class="cr-head">${BOOK}<div class="cr-titles"><p class="cr-eyebrow">Chronicle · 연대기</p><h2 class="cr-title">에테리온 연대기<small>The Chronicle of Etherion</small></h2></div>
        <button type="button" class="cr-close" data-close><span>닫기</span> <kbd>Esc</kbd> ✕</button></header>
      <div class="cr-body">
        <nav class="cr-toc" aria-label="목차"></nav>
        <div class="cr-pagebox"><main class="cr-page" tabindex="-1"></main></div>
      </div>`;
    document.body.appendChild(ov);
    go(cur, true);
    ov.addEventListener("click", onClick);
    addEventListener("keydown", onKey, true);
    requestAnimationFrame(() => requestAnimationFrame(() => ov && ov.classList.add("on")));
    setTimeout(() => ov && ov.classList.add("done"), 1100);
    setTimeout(() => { const b = ov && ov.querySelector("[data-close]"); if (b) b.focus({ preventScroll: true }); }, 60);
  }
  function close() {
    if (!ov) return;
    removeEventListener("keydown", onKey, true);
    const el = ov; ov = null;
    el.classList.remove("done"); void el.offsetWidth; el.classList.remove("on");
    const gone = () => el.remove();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) gone(); else { el.addEventListener("transitionend", gone, { once: true }); setTimeout(gone, 900); }
    if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  function go(id, first) {
    if (!ov || !byId(id)) return;
    cur = id;
    const sealed = isSealed(id);
    if (!sealed) { st.at = id; if (!st.read.includes(id)) st.read.push(id); save(); }
    ov.classList.toggle("dark", sealed);
    const page = ov.querySelector(".cr-page");
    page.innerHTML = pageHTML(id);
    page.scrollTop = 0;
    ov.querySelector(".cr-toc").innerHTML = tocHTML(id);
    if (!first) {
      page.classList.remove("turn"); void page.offsetWidth; page.classList.add("turn");
      if (matchMedia("(max-width: 900px)").matches) page.parentNode.scrollIntoView({ block: "start" });
      page.focus({ preventScroll: true });
    }
    const on = ov.querySelector(".cr-ti.on"); if (on && on.scrollIntoView && !matchMedia("(max-width: 900px)").matches) on.scrollIntoView({ block: "nearest" });
  }
  function step(d) {
    const i = ORDER.indexOf(cur) + d;
    if (i >= 0 && i < ORDER.length) go(ORDER[i]);
  }
  function shake(btn) {
    const sec = btn.closest(".cr-sealed");
    btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake");
    if (sec) { sec.classList.remove("rattle"); void sec.offsetWidth; sec.classList.add("rattle"); }
    if (typeof toast === "function") toast("자물쇠는 꿈쩍도 하지 않는다. 아직은 때가 아니다.", "warn");
  }
  function onClick(e) {
    const t = e.target;
    if (t.closest("[data-close]")) return close();
    if (t.closest("[data-shake]")) return shake(t.closest("[data-shake]"));
    if (t.closest("[data-map]")) { close(); if (typeof Kailan !== "undefined") setTimeout(() => Kailan.open(), 120); return; }
    const c = t.closest("[data-ch]"); if (c) return go(c.dataset.ch);
  }
  function onKey(e) {
    if (!ov) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); return; }
    const tg = e.target;
    if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName))) return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  }

  return { open, close, go: id => { if (!ov) open(); go(id); } };
})();

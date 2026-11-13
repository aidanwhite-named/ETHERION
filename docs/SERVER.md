# ETHERION 서버 (v3.22)

계정 · 보유 카드 · 덱 · 지갑 · 상점 재고 · 교역소를 **서버가 정본으로 갖는** 시험 서버.
이 PC에서 켜 두고, 같은 PC의 브라우저 두 개나 같은 와이파이의 폰으로 들어와 로그인 · 덱 · 상점 · 거래를 실제처럼 해 본다.
나중에 맥미니 · 클라우드로 옮길 때도 이 폴더를 그대로 가져간다(7장).

## 1. 켜기

1. **Node.js** LTS를 한 번 설치한다(https://nodejs.org/ko/download — 기본 선택 그대로 다음, 다음). 바깥 꾸러미는 없다(npm install 필요 없음).
2. **`ETHERION 서버.bat`을 두 번 누른다.** 검은 창에 주소가 뜨고, 브라우저가 `http://localhost:8787`을 연다.
3. 끄려면 그 창을 닫거나 Ctrl + C. 데이터는 바로바로 저장된다.

- 같은 PC에서 **두 모험가로 시험**: 로그인은 브라우저마다 따로다. 크롬과 엣지, 또는 일반 창과 시크릿 창에서 각각 로그인한다.
- **같은 와이파이의 폰**: 서버 창의 `같은 와이파이 http://192.168.x.x:8787`. 처음 켤 때 윈도우 방화벽이 물으면 "개인 네트워크"를 허용한다.
- **관리자**: `admin` / `server/config.json`의 `adminPassword`(v3.45.2부터 처음 켤 때 아무도 모르는 암호를 만들어 이 파일에만 적는다. 옛 기본값 `etherion`이나 10자보다 짧은 암호면 서버 모드 관리자 로그인이 꺼진다). 관리자 기능은 숨은 주소가 아니라 서버가 계정으로 판단한다 — 일반 계정 · 손님은 화면을 꾸며도 관리자 작업이 거절된다. 관리자 보관소의 "모험가 관리"에 서버의 모든 모험가가 나온다.
- 로그인 화면 아래에 `● 서버 연결됨`이 보이면 온라인 모드다. `index.html`을 파일로 열면(ETHERION 실행.bat · PC 앱 · 안드로이드 앱) 예전처럼 이 기기 저장소만 쓴다. 서버 주소 끝에 `?offline`을 붙여도 로컬.
- 이 브라우저에 있던 옛 모험가(로컬 저장)는 서버로 옮겨지지 않는다. 서버에서는 새로 등록한다.

## 2. 무엇이 어디에 있나

| | 무엇 | 누가 정하나 |
|---|---|---|
| **서버가 정본** | 계정(암호는 scrypt 해시) · 보유 카드 · 지갑 · 지갑 장부 · 덱 · 덱 초안 · NEW 표시 · **상점 재고(모두가 하나를 나눠 씀)** · **교역소 거래 · 맡김 · 소식 · 기한 정산** | 서버가 게임과 같은 규칙으로 검사하고 바꾼다. 기기는 결과를 받아 보여 주기만 |
| **기기가 정하고 서버가 보관** | 전투 · 수레바퀴 · 원정 **보상**(조각 · 카드), 전적, 수레바퀴 표, 원정 진행, 경험치 | 지금은 기기가 정한 값을 믿고 받는다. 보상 추첨을 서버로 옮기는 일은 `SERVER_PLAN.md` 2장 |
| **기기에만** | 소리 · 화면 설정, 채팅(아직 이 기기 안에서만), 전투 로그 | — |
| **서버를 거치지 않음** | 온라인 대전 · 실시간 거래의 연결 | 예전처럼 PeerJS(인터넷 필요). 실시간 거래의 **반영**은 서버가 한다 |

## 3. 데이터 · 백업

- 모든 데이터는 **`server/data/db.json`** 한 파일(게임의 `Store.data`와 같은 모양 + 로그인 세션).
- 하루에 한 번 `server/data/backup/db-YYYY-MM-DD.json`. 최근 14개만 남긴다(`backupKeep`).
- **되살리기**: 서버를 끄고 백업 파일을 `db.json`으로 복사한 뒤 켠다. **처음부터**: 서버를 끄고 `db.json`을 지운다.
- `server/data/`와 `server/config.json`은 git에 올리지 않는다(.gitignore). 모험가 데이터와 관리자 암호가 들어 있다.

## 4. 설정 — `server/config.json` (처음 켤 때 만들어짐)

| 열쇠 | 처음 값 | 뜻 |
|---|---|---|
| `port` | 8787 | 주소의 포트. 이미 쓰는 포트면 바꾼다 |
| `host` | `0.0.0.0` | 같은 와이파이에서 들어올 수 있게. 이 PC에서만 쓰려면 `127.0.0.1` |
| `adminPassword` | (처음 켤 때 무작위) | 관리자 암호. 10자 이상, `etherion`이면 관리자 로그인이 꺼진다(v3.45.2) |
| `adminFrom` | `any` | `tailnet`이면 관리자는 이 컴퓨터와 Tailscale 안(100.64.0.0/10)에서만 — Funnel · 터널로 들어온 바깥 주소는 관리자 로그인 · 관리자 토큰 모두 거절 |
| `adminHours` | 720 | 관리자 로그인이 유지되는 시간(안 쓴 채로). 일반 모험가는 30일 |
| `openBrowser` | true | 켤 때 브라우저를 연다 |
| `backupKeep` | 14 | 남길 하루 백업 수 |

명령으로 켤 때: `node server/server.js --port 9000 --no-open --data 다른곳/db.json` (시험용 따로 설정은 `--config 다른곳/config.json`).

## 5. 짜임 — 규칙을 두 번 짜지 않는다

```text
브라우저 (게임)                                   서버 (Node)
 화면 ─ Store.buyCard(…) ─┐                        server/server.js  HTTP · 로그인 · 세션 · 저장 · 백업
                          │  js/net.js  ── /api/ops ──▶  Store.buyCard(…)   ← server/rules.js가 읽은 게임 파일 그대로
 교역소 화면 ─ TradeAPI ──┘  TradeHttp ── /api/trade ─▶ TradeLocal.offer(…)
                ◀── 응답마다 내 데이터 스냅샷(보유 · 지갑 · 덱 · 재고 · 안 읽은 소식) ──
```

- **`server/rules.js`**: `index.html`의 `js/data.js` ~ `js/economy.js`(카드 데이터 · 이름 고침 · 뺀 카드 · 덱 · 등급 · Store · 경제)와 `js/trade.js` · `js/level.js` · `js/pilgrim-rules.js`를 Node의 vm 문맥 하나에 게임과 같은 차례로 읽는다. 서버의 `Store.data` = DB, `Store.save` = 디스크에 쓰기. 그래서 덱 검사 · 사고팔기 · 맡김 · 경매 · 기한 정산이 게임과 같은 코드다.
- **`server/server.js`**: 요청 하나를 끝까지 처리한 뒤 다음 요청으로 간다(Node) — 같은 카드 마지막 1장, 같은 거래에 겹친 입찰도 차례대로 처리된다.
- **`js/net.js`**(게임 쪽): 서버에서 열렸으면 Store 함수를 감싼다.
  - 답을 기다리는 것(동기 요청): 등록 · 로그인 · 손님 · 덱 저장 · 상점 사고팔기 · 관리자 도구. 화면 코드가 결과를 바로 쓰므로(`const r = Store.buyCard(…)`) 화면은 고칠 것이 없다.
  - 먼저 하고 알리는 것(비동기): 덱 초안 · 보상(조각 · 카드).
  - 그 밖의 칸(전적 · 원정 · 경험치 …)은 `Store.save` 때 모아 보낸다(`soft`).
  - 작업마다 번호(seq)를 붙여 차례를 지키고, 다시 보낸 작업은 서버가 한 번만 처리한다.
  - 15초마다, 그리고 창으로 돌아올 때 서버에서 새로 받는다(거래 성사 · 소식 점 · 재고).

| 요청 | 하는 일 |
|---|---|
| `GET /api/hello` | 서버인지 확인(게임이 온라인 모드를 켤지 정함) |
| `POST /api/register` · `login` · `guest` · `logout` | 계정. 응답에 토큰 + 스냅샷 |
| `GET /api/me` | 스냅샷 다시 받기 |
| `POST /api/ops` `{cid, ops:[{seq, fn, target, args}]}` | Store 작업을 차례로. `fn`은 `server.js`의 `OPS` + `soft` |
| `POST /api/trade` `{fn, args}` | `TradeLocal`의 함수 이름 그대로(`TRADE_API.md` 4장의 표와 같은 일) |

## 6. 게임을 고칠 때 지킬 것

- **보유 카드 · 지갑 · 덱 · 초안 · NEW는 Store 함수로만 고친다.** 화면에서 `u.collection[id] = …`처럼 바로 고치면 서버에 가지 않고 다음 응답 때 되돌아간다.
- **Store에 데이터를 바꾸는 새 함수**를 만들면 이름을 두 곳에 넣는다: `server/server.js` `OPS`(누가 할 수 있나 — 관리자만이면 `admin: true`), `js/net.js` `NET_SYNC_OPS`(결과를 바로 쓰는 것) 또는 `NET_ASYNC_OPS`(먼저 하고 알림).
- **서버만 바꾸는 칸**을 새로 만들면 `server.js` `PROTECTED`와 `net.js` `NET_PROTECTED`에 함께 넣는다.
- **교역소 규칙**은 `js/trade.js`의 `TradeLocal`을 고치면 서버도 같은 코드다. 새 거래 요청 함수를 만들면 `server.js` `TRADE_FNS`와 `net.js`의 TradeHttp 목록에 이름을 넣는다.
- **새 카드 데이터 파일**은 `index.html`에서 `js/data.js`와 `js/economy.js` 사이에 넣으면 서버도 저절로 읽는다. 그 밖에 Store를 넓히는 파일은 `server/rules.js`의 `EXTRA`에.
- 게임 js나 서버 코드를 고치면 **서버 창을 껐다 다시 켠다**(서버는 켤 때 규칙 파일을 읽는다). 브라우저는 새로고침.

## 7. 맥미니 · 클라우드로 옮기기

1. ETHERION 폴더를 통째로 옮긴다(git으로 받거나 복사). **`server/data/db.json`도 함께**(모험가 데이터). `config.json`도.
2. 그 컴퓨터에 Node.js LTS를 설치한다.
3. `node server/server.js` (맥: 터미널에서 폴더로 가서). 계속 켜 두려면 `pm2`(`npm i -g pm2` → `pm2 start server/server.js --name etherion -- --no-open` → `pm2 save` → `pm2 startup`).
4. **바깥의 친구**에게 열 때: Cloudflare 터널 — 시험은 `cloudflared tunnel --url http://localhost:8787`(임시 https 주소가 바로 생김), 고정 주소는 도메인을 Cloudflare에 연결. 게임과 서버가 같은 주소라 그대로 된다. 열기 전에 `adminPassword`를 바꾼다.

사람이 많아지면(수백 명~): DB를 한 파일(JSON)에서 SQLite · PostgreSQL로, 동기 요청을 화면 쪽 `await`로(`SERVER_PLAN.md` 4장).

## 8. 알고 쓸 것 (시험 서버의 한계)

- **보상은 믿음에 기댄다**: 전투 · 수레바퀴 · 원정 보상은 기기가 정한다(2장). 예외(v3.26): **성로 순례의 그날 첫 승**(받기 · 뽑기)은 서버가 서버 시계로 하루 한 번을 확인하고 카드 추첨도 서버가 한다(`OPS.pilgrimClaim`, `u.pilClaim`, `js/pilgrim-rules.js`). 한 번에 1,000,000 조각을 넘는 보상만 막는다. 진짜 막으려면 `SERVER_PLAN.md` 2장 · 5장.
- **동기 요청**: 사고팔기 · 덱 저장은 서버의 답을 기다린다. 이 PC · 같은 와이파이는 몇 ms라 느껴지지 않지만, 인터넷 너머로는 누를 때 잠깐(0.1초쯤) 멈출 수 있다.
- **PC 앱 · 안드로이드 앱은 아직 서버에 붙지 않는다**(파일로 열린 게임). 붙일 자리는 있다: 그 앱의 저장소에 `localStorage["etherion.server"] = "http://주소:8787"`을 넣으면 그 서버로 붙는다(설정 화면은 아직 없음).
- **손님**은 브라우저마다 서버에 손님 계정(`손님·AB12`)이 하나씩 생긴다. 나가기를 누르면 그 손님은 다시 쓸 수 없다(관리자 보관소에 남음).
- 암호 찾기는 없다. 채팅은 아직 서버를 거치지 않는다(`ChatNet`의 자리만 있음).
- `http`라 주고받는 것이 암호화되지 않는다. 집 안 시험용이다. 바깥에 열 때는 Cloudflare 터널(https)을 쓴다.

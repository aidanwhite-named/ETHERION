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
- **관리자**: 이름 · 암호는 `node server/admin.js set <이름>`으로 정한다(암호는 물어보고, `server/config.json`에 `adminId` + `adminHash`(scrypt 해시)만 적는다 — 암호 원문은 어디에도 없다. 서버를 껐다 켜면 반영). 정하지 않았으면 예전처럼 `admin` / `config.json`의 `adminPassword`(처음 켤 때 무작위, 10자보다 짧으면 꺼짐). 관리자 기능은 숨은 주소가 아니라 서버가 계정으로 판단한다 — 일반 계정 · 손님은 화면을 꾸며도 관리자 작업이 거절된다. 자세한 것은 4.5장.
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
- `server/data/`와 `server/config.json`은 git에 올리지 않는다(.gitignore). 모험가 데이터와 관리자 암호 해시 · 계정 열쇠가 들어 있다.
- **묶음 백업**(2026-11-27, `server/backup.js`): 위의 하루 백업은 같은 디스크 · 같은 폴더라 디스크를 잃으면 함께 사라지고 `config.json`은 들어 있지 않다. 그래서 git에 없는 서버 자료 전부(`server/config.json` + `server/data/`)를 한 파일로 묶어 게임 폴더 밖에 둔다.
  - 만들기: `node server/backup.js` → `~/ETHERION-backup/etherion-server-날짜-시각.tar.gz`(나만 읽는 파일, 최근 30개만 남김). 서버가 켜진 채로 해도 된다. 다른 곳에 두려면 `--out 폴더`(외장 디스크 · 클라우드 동기화 폴더), 안드로이드 서명 열쇠까지 넣으려면 `--signing`.
  - 안 보기: `node server/backup.js list <묶음>`
  - 되살리기: 서버를 끄고 `node server/backup.js restore <묶음>` → 있던 `config.json` · `data/`는 `_backup_restore_<때>/`로 옮겨 두고 묶음의 것을 놓는다. 그다음 서버를 켠다.
  - **묶음은 비밀이다**(계정 열쇠 · 관리자 암호 해시 · 모험가 데이터). 공개 저장소 · 공유 폴더에 두지 않는다. 이 맥 밖(외장 디스크, 암호가 걸린 클라우드)에도 한 벌 둔다.

## 4. 설정 — `server/config.json` (처음 켤 때 만들어짐)

| 열쇠 | 처음 값 | 뜻 |
|---|---|---|
| `port` | 8787 | 주소의 포트. 이미 쓰는 포트면 바꾼다 |
| `host` | `0.0.0.0` | 같은 와이파이에서 들어올 수 있게. 이 PC에서만 쓰려면 `127.0.0.1` |
| `adminId` | `admin` | 관리자로 로그인하는 이름. `node server/admin.js set <이름>`이 적는다. 이 이름으로는 모험가 등록을 못 한다 |
| `adminHash` | 없음 | 관리자 암호의 scrypt 해시(소금 포함). `admin.js`가 적는다 — 손으로 고치지 않는다. 있으면 `adminPassword`는 보지 않는다 |
| `adminPassword` | (처음 켤 때 무작위) | 옛 방식(원문 암호) — `adminHash`가 없을 때만. 10자 이상, `etherion`이면 관리자 로그인이 꺼진다(v3.45.2). `admin.js set`을 하면 지워진다 |
| `adminFrom` | `any` | `tailnet`이면 관리자는 이 컴퓨터와 Tailscale 안(100.64.0.0/10)에서만 — Funnel · 터널로 들어온 바깥 주소는 관리자 로그인 · 관리자 토큰 모두 거절 |
| `adminHours` | 720 | 관리자 로그인이 유지되는 시간(안 쓴 채로). 일반 모험가는 30일 |
| `openBrowser` | true | 켤 때 브라우저를 연다 |
| `backupKeep` | 14 | 남길 하루 백업 수 |
| `secret` · `emailEncKey` | (처음 켤 때 무작위) | v3.27 계정 열쇠 — 이메일 찾기 · 암호화, 코드 해시. **잃으면 이메일 로그인을 못 한다.** db 백업과 다른 곳에 따로 보관 |
| `mail` | 없음 | `{ "provider": "resend" 또는 "brevo", "apiKey": "…", "from": "no-reply@도메인", "fromName": "ETHERION" }`. 없으면 코드를 서버 창에 찍는다 |
| `requireEmail` | (mail이 있으면 true) | 가입에 이메일 확인을 꼭 받을지 |
| `billing` | `{ "enabled": false }` | 결제 대비 틀. 켜지 않는다(`ACCOUNT_PRIVACY.md` 7.2) |

명령으로 켤 때: `node server/server.js --port 9000 --no-open --data 다른곳/db.json` (시험용 따로 설정은 `--config 다른곳/config.json`).

## 4.5 관리자 계정 (2026-11-27)

- **정하기 · 바꾸기**: 터미널에서 게임 폴더로 가서 `node server/admin.js set <이름>` → 암호를 두 번 묻는다(화면에 보이지 않음, 8자 이상) → `config.json`에 `adminId` · `adminHash`를 적는다 → **서버를 껐다 켠다**. 암호를 잊었을 때도 같은 명령. 지금 설정은 `node server/admin.js show`. 암호를 물을 수 없는 곳에서는 환경 변수 `ETHERION_ADMIN_PW`.
- **암호는 해시로만** 둔다(모험가 암호와 같은 scrypt). 코드 · 문서 · git 어디에도 암호를 적지 않는다(이 저장소는 공개다). 해시가 든 `config.json`은 `.gitignore`에 있다.
- **관리자는 역할이다**(`u.admin`, 서버만 바꾸는 칸): 카드를 계정에 넣어 두는 것이 아니라 `Store.allCards`가 그때그때 "모든 카드 · 모든 깃발"로 답한다. 그래서 새 카드를 만들어도 관리자는 바로 쓸 수 있다. 레거시 카드(`js/retired.js`)는 덱 검사가 누구에게나 막는다.
- **관리자가 할 수 있는 것**: 9개 깃발의 덱 조정실에서 모든 카드로 덱 짜기 · 컴퓨터와 대전 · 온라인 대전, **상점 관리**(상점 화면 아래 관리자 띠 · 카드의 "상점 설정…": 새 카드 공개 · 내림 · 기간 판매 · 재고 최대 · 재고 채우기, `OPS shopSet · shopStock · restock`), 상점 무료 구매, **관리자 보관소**(위쪽 메뉴): 깃발별 카드 보기 · "모험가 관리"(깃발 지급 · 회수 · 모든 카드 지급), 교역소 "지금 마감(시험)".
- **관리자가 못 하는 것 · 받지 않는 것**: 교역소 거래, 퀘스트 · 업적 · 시즌 등급(`questOk`), 초대 체험 덱, 메일 코드 로그인 · 계정 관리 화면, 결제.
- **온라인 대전**: 관리자도 방에 들어갈 수 있고 이름 옆에 `ADMIN` 표식이 붙는다. **관리자와 둔 판은 상대의 시즌 등급 점수를 바꾸지 않는다**(모든 카드 덱이라 공정하지 않으므로 — `js/rewards.js` `_pairEnd`). 상대의 조각 보상 · 전적은 보통 판과 같다.
- **이름을 바꾸면** 옛 `admin` 계정의 덱이 새 이름으로 옮겨지고(첫 로그인 때), 옛 이름으로는 못 들어온다. 이름 · 암호를 바꾸고 서버를 켜면 예전 관리자 로그인은 모두 끊긴다. 이미 있는 모험가 이름은 관리자 이름으로 쓸 수 없다.
- 더 조이려면 `"adminFrom": "tailnet"`(이 컴퓨터와 Tailscale 안에서만 관리자). 암호 대입은 같은 주소 10번 · 같은 이름 20번 틀리면 15분 쉰다(`LIMITS`).
- 시험: `node tools/admin/test.js`(임시 포트 · 임시 폴더, 관리자 로그인 · 권한 · 백업 → 옮기기까지 63개).

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
| `POST /api/register` · `login` · `guest` · `logout` | 계정. 응답에 토큰 + 스냅샷. v3.27: `register`에 `agree`(동의) · `ticket`(확인한 이메일), `login`의 id 자리에 이메일도 됨 |
| `POST /api/auth/code` · `auth/verify` | v3.27 메일 인증 코드 — 가입한 주소면 로그인, 아니면 가입 표(`server/auth.js`) |
| `GET /api/account` · `POST /api/account/code` · `email` · `password` · `logoutAll` · `delete` | v3.27 계정 관리 · 탈퇴 (화면 `js/account.js`) |
| `GET /api/billing/catalog` · `POST /api/billing/order` | 결제 대비 틀 — 꺼져 있음(`server/billing.js`) |
| `GET /api/me` | 스냅샷 다시 받기 |
| `POST /api/ops` `{cid, ops:[{seq, fn, target, args}]}` | Store 작업을 차례로. `fn`은 `server.js`의 `OPS` + `soft` |
| `POST /api/trade` `{fn, args}` | `TradeLocal`의 함수 이름 그대로(`TRADE_API.md` 4장의 표와 같은 일) |

## 5.5 온라인 대전 방 (2026-11-26) — `server/rooms.js`

- `POST /api/room { a, … }`(로그인 필요, 필멸자 거절). 방 목록 · 만들기 · 입장 · 준비 · 채팅 · 내보내기를 서버가 맡는다. 화면은 `js/rooms.js`.
- 방은 **메모리에만** 둔다 — `db.json`에 쓰지 않고, 서버를 다시 켜면 모두 사라진다(대전 중이던 판은 두 기기가 직접 이어져 있어 계속된다. 방만 없어진다).
- 실제 대전은 서버를 지나지 않는다. 방장이 시작하면 PeerJS 코드를 서버에 맡기고 도전자가 받아 두 기기가 바로 잇는다(`js/online.js`, 공개 중계 0.peerjs.com). 보상 · 전적은 예전처럼 두 사람의 판 끝 보고가 맞물려야 한다.
- 갱신: 방 안은 long-poll(`a: "poll"`, 방이 바뀌면 바로 · 아니면 20초 뒤 답), 방 목록은 기기가 5초마다 묻는다. 한 로그인 1분 300번 제한(`LIMITS.api`) 안에 넉넉히 든다.
- 제한: 방 200개 · 제목 24자 · 비밀번호 32자(scrypt 해시로만 보관) · 채팅 200자 · 방마다 채팅 60줄. 빈도는 `ROOM_LIMITS`(방 만들기 1분 6번 · 채팅 10초 8줄 · 틀린 비밀번호 1분 8번 · 입장 1분 20번).
- 정리: 소식 없는 사람은 대기 45초 · 대전 중 90초 뒤 내보낸다(5초마다 `sweep`). 방장이 나가면 남은 사람이 방장, 아무도 없으면 방을 지운다.
- 시험: `node tools/rooms/test.js` · `node tools/rooms/e2e.js`(둘 다 임시 포트 · 임시 데이터).

## 6. 게임을 고칠 때 지킬 것

- **보유 카드 · 지갑 · 덱 · 초안 · NEW는 Store 함수로만 고친다.** 화면에서 `u.collection[id] = …`처럼 바로 고치면 서버에 가지 않고 다음 응답 때 되돌아간다.
- **Store에 데이터를 바꾸는 새 함수**를 만들면 이름을 두 곳에 넣는다: `server/server.js` `OPS`(누가 할 수 있나 — 관리자만이면 `admin: true`), `js/net.js` `NET_SYNC_OPS`(결과를 바로 쓰는 것) 또는 `NET_ASYNC_OPS`(먼저 하고 알림).
- **서버만 바꾸는 칸**을 새로 만들면 `server.js` `PROTECTED`와 `net.js` `NET_PROTECTED`에 함께 넣는다.
- **교역소 규칙**은 `js/trade.js`의 `TradeLocal`을 고치면 서버도 같은 코드다. 새 거래 요청 함수를 만들면 `server.js` `TRADE_FNS`와 `net.js`의 TradeHttp 목록에 이름을 넣는다.
- **새 카드 데이터 파일**은 `index.html`에서 `js/data.js`와 `js/economy.js` 사이에 넣으면 서버도 저절로 읽는다. 그 밖에 Store를 넓히는 파일은 `server/rules.js`의 `EXTRA`에.
- 게임 js나 서버 코드를 고치면 **서버 창을 껐다 다시 켠다**(서버는 켤 때 규칙 파일을 읽는다). 브라우저는 새로고침.

## 7. 다른 컴퓨터로 옮기기 (맥미니 · 클라우드)

코드는 git에 있고, git에 없는 것은 **백업 묶음 한 파일**에 다 들어 있다(3장). 그 둘만 옮기면 된다.

**옛 서버에서**
1. 서버를 끈다(맥: `./"ETHERION 서버 (맥).command" stop`). 끄고 묶어야 마지막 순간의 데이터까지 들어간다.
2. `node server/backup.js` → `~/ETHERION-backup/etherion-server-….tar.gz`.
3. 그 파일을 새 컴퓨터로 옮긴다(USB · AirDrop · `scp`). 메일 · 메신저 · 공개 저장소로 보내지 않는다.

**새 서버에서**
4. Node.js LTS(18 이상)를 설치한다.
5. 게임 폴더를 받는다: `git clone <저장소 주소>`(또는 폴더 복사).
6. 게임 폴더에서 `node server/backup.js restore <옮겨 온 묶음.tar.gz>` → `server/config.json` · `server/data/`가 놓인다.
7. 서버를 켠다: `node server/server.js --no-open`(맥은 `ETHERION 서버 (맥).command`). 서버 창의 `관리자` 줄에 관리자 이름이, `데이터` 줄에 모험가 수가 예전대로 나오는지 본다.
8. 관리자 이름 · 암호, 모험가 계정 · 이메일 로그인이 예전 그대로다(계정 열쇠 `secret` · `emailEncKey`가 같이 왔기 때문). 묶음 없이 새로 시작했다면 `node server/admin.js set <이름>`으로 관리자를 다시 정한다.
9. 바깥 주소: Tailscale은 컴퓨터마다 따로 로그인한다(`server/tailscale/`은 옮기지 않는다). 옛 컴퓨터의 `etherion` 기기를 Tailscale 관리 화면에서 지운 뒤 새 컴퓨터에서 `.command`를 켜면 같은 `https://etherion.<tailnet>.ts.net` 주소를 다시 쓴다. 주소가 바뀌면 `tools/desktop/server.txt`를 고치고 PC · 안드로이드 앱을 다시 만든다. Cloudflare 터널을 쓰면 `cloudflared tunnel --url http://localhost:8787`.
10. 계속 켜 두려면 `pm2`(`npm i -g pm2` → `pm2 start server/server.js --name etherion -- --no-open` → `pm2 save` → `pm2 startup`).
11. 옛 컴퓨터의 `server/config.json` · `server/data/`와 묶음 파일은 새 서버가 잘 도는 것을 본 뒤에 지운다. 두 서버를 같은 데이터로 함께 켜 두지 않는다(서로 다른 정본이 된다).

평소에도 `node server/backup.js --out <이 맥 밖의 폴더>`를 가끔(카드 · 상점을 크게 고친 뒤, 옮기기 전) 돌려 둔다.

사람이 많아지면(수백 명~): DB를 한 파일(JSON)에서 SQLite · PostgreSQL로, 동기 요청을 화면 쪽 `await`로(`SERVER_PLAN.md` 4장).

## 8. 알고 쓸 것 (시험 서버의 한계)

- **보상은 믿음에 기댄다**: 전투 · 수레바퀴 · 원정 보상은 기기가 정한다(2장). 예외(v3.26): **성로 순례의 그날 첫 승**(받기 · 뽑기)은 서버가 서버 시계로 하루 한 번을 확인하고 카드 추첨도 서버가 한다(`OPS.pilgrimClaim`, `u.pilClaim`, `js/pilgrim-rules.js`). 한 번에 1,000,000 조각을 넘는 보상만 막는다. 진짜 막으려면 `SERVER_PLAN.md` 2장 · 5장.
- **동기 요청**: 사고팔기 · 덱 저장은 서버의 답을 기다린다. 이 PC · 같은 와이파이는 몇 ms라 느껴지지 않지만, 인터넷 너머로는 누를 때 잠깐(0.1초쯤) 멈출 수 있다.
- **PC 앱 · 안드로이드 앱은 아직 서버에 붙지 않는다**(파일로 열린 게임). 붙일 자리는 있다: 그 앱의 저장소에 `localStorage["etherion.server"] = "http://주소:8787"`을 넣으면 그 서버로 붙는다(설정 화면은 아직 없음).
- **손님**은 브라우저마다 서버에 손님 계정(`손님·AB12`)이 하나씩 생긴다. 나가기를 누르면 그 손님은 다시 쓸 수 없다(관리자 보관소에 남음).
- v3.27: 계정은 **메일 코드 · 비밀번호 두 가지로 로그인**한다(`docs/ACCOUNT_PRIVACY.md` 7장). 메일 업체를 `config.json`의 `mail`에 적기 전에는 **코드가 서버 창에 찍힌다**(집 안 시험용). 암호를 잊으면 메일 코드로 들어와 설정 → 계정 관리에서 다시 정한다(이메일을 연결하지 않은 계정은 암호 찾기가 없다). 시험 `node tools/auth/test.js`.
- 채팅은 아직 서버를 거치지 않는다(`ChatNet`의 자리만 있음).
- `http`라 주고받는 것이 암호화되지 않는다. 집 안 시험용이다. 바깥에 열 때는 Cloudflare 터널(https)을 쓴다.

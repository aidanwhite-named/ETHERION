# 교역소 거래 — 서버 API 설계 (v3.21 기준)

린데어 교역소(모험가끼리 카드 · 조각 맞바꾸기)의 규칙과, 서버가 생겼을 때 그대로 옮길 요청 · 응답 모양.
지금은 서버가 없어서 `js/trade.js`의 `TradeLocal`이 **서버 흉내**를 낸다(이 브라우저 저장소 `Store.data.trade`를 서버 DB처럼 씀).
화면(`js/trade-ui.js` · `js/trade-live.js`)은 `TradeAPI`만 부르고 응답을 기다린다(Promise). 서버를 붙일 때는 **`TradeAPI.backend`만 바꾼다** — 화면은 고칠 것이 없다.

> **v3.22: 서버가 생겼다** (`docs/SERVER.md`). 서버로 연 게임은 `TradeAPI.backend` = `TradeHttp`(`js/net.js`) — `POST /api/trade {fn, args}` 한 창구로 서버의 `TradeLocal`을 그대로 부른다(4장의 주소 표 대신 한 창구, 하는 일은 같다). 응답마다 내 보유 · 지갑 · 안 읽은 소식 수가 붙는다. 기한 정산은 서버가 20초마다. 거래 게시판은 서버의 모든 모험가가 함께 본다. 실시간 거래의 연결은 아직 PeerJS, 반영(`liveSettle`)은 서버가 한다. 파일로 연 게임은 예전처럼 `TradeLocal`(6장).

## 1. 층

| 층 | 파일 | 지금 | 서버 시대 |
|---|---|---|---|
| 화면 | `js/trade-ui.js` | `TradeAPI`를 부르고 그린다 | 그대로 |
| 창구 | `js/trade.js` `TradeAPI` | `backend = TradeLocal` | `backend = TradeHttp`(같은 함수 이름, `fetch`) |
| 규칙 | `js/trade.js` `TradeLocal` | 이 기기에서 처리 | **서버가 같은 규칙을 맡는다**(이 함수들이 서버 코드의 명세) |
| 보유 · 지갑 | `Store.escrowTake` · `escrowGive` · `tradeable` | 이 기기의 `u.collection` · `u.gold` | 서버 DB. 응답으로 바뀐 보유를 받아 `Store`에 반영 |
| 실시간 방 | `js/trade-live.js` `TradeLive` | PeerJS로 두 기기 직접 | 서버 WebSocket 방(4장) |

## 2. 데이터

```text
꾸러미   { cards: { 카드ID: 장수 }, shards: 조각 }          한쪽 카드 합 6장까지(TRADE.maxCards)
거래     { id, owner, kind: "offer"|"auction", created, ends, minutes, note,
           give: 꾸러미(맡겨 둠), want: 꾸러미, openWant,
           offers: [참여], state: "open"|"done"|"expired"|"cancelled", closed, result: { oid, by, why } }
참여     { id, by, at, cards, shards, meets, state: "open"|"out"|"withdrawn"|"won"|"lost" }
소식     { id, at, kind: "done"|"join"|"out"|"lost"|"expired"|"cancel", text, lid, read }
```

- `kind: "offer"`(교환 제안): `want` = 희망 조건. `meets` = 참여가 조건을 모두(카드 장수까지, 조각 이상) 채웠는지. `openWant` = 조건 없이 제안 받기(아무것도 저절로 성사되지 않음).
- `kind: "auction"`(경매): `want.shards` = 시작가(최소 10), `want.cards` = 입찰자가 꼭 함께 낼 카드. 다음 입찰 = 최고가 + max(10, 5% 올림).

## 3. 규칙 (서버가 지킬 것)

1. **맡김(에스크로)**: 올리기 · 참여는 건 것을 보유에서 **바로 뺀다**. 성사 → 상대에게, 닫힘 · 밀림 · 거둠 · 바꿈 → 돌려줌. 한 거래 안에서 카드가 두 번 쓰이는 일이 없다.
2. **덱 보호**: 걸 수 있는 장수 = 보유 − max(저장한 덱의 장수, 덱 초안의 장수). 서버는 덱 · 초안도 갖고 있으니 같은 계산을 한다.
3. **받기**: 같은 카드 최대 장수(`maxCopiesOf`)를 넘는 장수는 상점 값(`shopPrice`) × 장수의 조각으로 바꿔 준다. 새로 받은 카드는 NEW 표시(`u.fresh`).
4. **기한 정산**(서버 시계 작업 — 지금은 `sweep()`이 요청마다 · 20초마다 돈다)
   - 교환 제안: 열린 참여 중 `meets`인 것 가운데 가장 이른 것과 성사. 없으면 닫힘(모두 돌려줌).
   - 경매: 열린 입찰(늘 최고 하나)과 성사. 없으면 닫힘.
5. **올린 사람**: 교환 제안은 기한 전에 아무 열린 참여나 골라 성사(`accept`). 경매는 최고 입찰만 받을 수 있다(지금 낙찰). 내리기(`cancel`)는 교환 제안은 언제나, 경매는 입찰이 없을 때만.
6. **참여한 사람**: 한 거래에 열린 참여는 하나 — 새로 내면 앞의 것은 돌려받고 바뀐다. 교환 제안은 거둘 수 있고, 경매의 최고 입찰은 거둘 수 없다(밀리면 저절로 돌려받음).
7. **막는 계정**: 관리자 · 손님(모든 카드를 가진 계정)은 거래할 수 없다. 관리자는 시험 도구 `forceEnd`(지금 마감)만.
8. **경험치**: 거래로 오간 조각은 경험치가 아니다(`LEVEL.noXp`가 "거래…" 이유를 뺀다). 장부(`u.ledger`) 이유: `거래 맡김 #id` · `거래 받음 #id` · `거래 돌려받음 #id` · `거래(실시간) 내줌/받음 #id`.
9. **동시성**(서버에서 새로 생기는 일): 같은 거래에 두 요청이 겹치면 거래 한 건 단위로 잠그고 차례로 처리한다. 마감 시각과 겹친 입찰은 서버 시계로 판정한다.
10. **한도**: 한 사람이 동시에 올린 거래 5개, 한쪽 카드 6장, 조각 1,000,000, 한마디 60자.

## 4. 요청 · 응답 (TradeHttp가 부를 주소 제안)

모든 요청은 로그인 토큰을 머리에 싣는다(지금의 `uid` 첫 인자를 토큰이 대신함). 응답은 모두 `{ ok, msg? , … }`.
쓰기 요청의 응답에는 **내 보유 · 지갑의 바뀐 값**(`me: { gold, collection: { id: n } }`)을 붙여, 클라이언트가 `Store`에 반영한다.

| TradeAPI | HTTP | 응답 |
|---|---|---|
| `board(q)` | `GET /trade/listings?kind=` | `{ list: [거래 보기], now }` |
| `get(lid)` | `GET /trade/listings/:lid` | `{ listing, now }` |
| `mine()` | `GET /trade/mine` | `{ open, closed, now }` |
| `held()` | `GET /trade/held` | `{ held: 꾸러미 }` |
| `notices()` · `readAll()` | `GET /trade/notices` · `POST /trade/notices/read` | `{ list }` |
| `create(spec)` | `POST /trade/listings` `{ kind, minutes, note, open, give, want }` | `{ listing, me }` |
| `offer(lid, a)` | `POST /trade/listings/:lid/offers` `{ cards, shards }` | `{ listing, offer, me }` |
| `withdraw(lid)` | `DELETE /trade/listings/:lid/offers/mine` | `{ listing, me }` |
| `accept(lid, oid)` | `POST /trade/listings/:lid/accept` `{ oid }` | `{ listing, me }` |
| `cancel(lid)` | `POST /trade/listings/:lid/cancel` | `{ listing, me }` |
| `forceEnd(lid)` | `POST /admin/trade/:lid/end` (관리자) | `{ listing }` |

거래 보기(`view`)는 저장된 거래에 계산한 값을 붙인 것: `left`(남은 ms) · `mine` · `open`(열린 참여 수) · `myOffer` · `joined` · `best` · `minBid` · `top`(내놓은 카드의 가장 높은 등급).
`now`는 서버 시각 — 화면의 남은 시간은 기기 시계가 아니라 이 값과의 차이로 고치면 기기 시계가 틀려도 맞다.

푸시: 성사 · 밀림 · 참여 소식은 서버가 WebSocket(또는 다음 요청 때 `notices`)으로 보낸다. 상단 띠의 점(`TradeAPI.unread`)은 그 수를 쓴다.

## 5. 실시간 거래

지금(`js/trade-live.js`): 방 코드 다섯 글자로 PeerJS(WebRTC) 직접 연결, 주고받는 말은 `hi` · `put` · `lock{k}` · `go{k}` · `done` · `bye`.
`k` = 두 쪽 꾸러미를 합친 열쇠 — 어느 쪽이든 놓은 것이 바뀌면 열쇠가 바뀌어 확인 · 교환이 저절로 풀린다. 둘 다 같은 `k`로 `go`하면 **각 기기가 자기 쪽만** 반영한다(`TradeAPI.liveSettle`). 한쪽이 반영 직전에 끊기면 어긋날 수 있어 친선 거래로만 쓴다.

서버 시대:
- `WS /trade/live` — `create` → 방 코드, `join { code }`. 서버가 방을 갖는다.
- `put` · `lock` · `go`는 서버로 보내고 서버가 상대에게 전한다. 같은 말 모양을 그대로 써도 된다.
- 두 쪽의 `go`가 같은 `k`로 모이면 **서버가 한 번에** 양쪽 맡김 확인 → 양쪽 보유를 바꾸고(원자적으로) 두 사람에게 `done { me }`를 보낸다. `liveSettle`은 그때 서버가 돌려준 `me`를 반영하는 일만 한다.
- 놓는 순간 맡기는 방식(게시판처럼)으로 바꾸면 끊김 · 동시성 문제가 더 줄어든다(선택).

## 6. 지금의 한계 (서버 전 · 알고 쓸 것)

- 거래 게시판은 **이 브라우저의 모험가끼리**만 보인다(저장소가 기기마다 따로). 시험은 '나가기' → 다른 모험가로 로그인.
- 실시간 거래는 인터넷(PeerJS 공개 중계)이 필요하다. 같은 컴퓨터 시험은 주소 끝 `#local` + 두 탭(같은 저장소라 같은 모험가가 되므로, 다른 모험가로 시험하려면 다른 브라우저 · 프로필).
- 로컬 저장소는 고쳐 쓸 수 있으므로 지금의 거래는 믿음에 기댄다. 진짜 거래는 서버가 생긴 뒤에.

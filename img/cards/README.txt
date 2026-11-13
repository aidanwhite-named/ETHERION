카드 일러스트 자리 (v3.41).
그림은 tools/art/inbox/ 에 넣고 (이름에 카드 ID나 카드 이름이 들어 있으면 됨)
    python3 tools/art/artmap.py import
을 실행하면, 가운데를 4:5로 잘라 600×750 JPG(장당 약 60~150KB)로 이 폴더에 <카드ID>.jpg 로 넣고 목록 art_index.js를 새로 씁니다.
게임은 art_index.js 목록으로 그림이 있는 카드를 알고, 그림은 화면에 보일 때만 받습니다(폰 · 서버 접속에서도 가볍게).
이 폴더에 파일을 손으로 넣었다면 목록만 새로:  python3 tools/art/artmap.py index
카드 ID는 게임에서 카드를 눌렀을 때 "그림 파일" 줄(관리자)에 나옵니다. 예: B1-01 (유닛), MB-01 · SA1-01 (마법), IB1-1 (아이템).
카드마다 그림 AI용 프롬프트: tools/art/prompts/cards/<단체>.md · 등급별 tools/art/prompts/grades/<등급>.md (규칙 tools/art/PROMPT_GUIDE.md).

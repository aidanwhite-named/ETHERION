카드 일러스트 자리.
이 폴더에 <카드ID>.png 파일을 넣으면 그 카드의 그림으로 자동으로 보입니다 (전장·손패·소각장·도감 모두).
예: B1-01.png (유닛), MB-01.png · SA1-01.png (마법), IB1-1.png (아이템) — ID 형식은 카드마다 다르니 게임 안의 "그림 파일" 줄을 그대로 쓰세요.
카드 ID는 게임에서 카드를 눌렀을 때 "그림 파일" 줄에 나옵니다. 권장 크기: 가로:세로 = 약 4:5 (예 400×500), 세로 방향 그림.
카드마다 그림 AI용 프롬프트가 tools/art/prompts/cards/<단체>.md 에 있습니다. 한꺼번에 만들려면 tools/art/README.md.
받은 그림 이름이 카드 ID가 아니어도 됩니다: tools/art/inbox/ 에 넣고 python tools/art/artmap.py import (또는 tools/art/그림 연결.bat) — 카드 ID나 카드 이름으로 찾아 이 폴더에 넣고, 장부 tools/art/art_map.csv 와 보드 tools/art/art_board.html 을 새로 만듭니다.
등급별 프롬프트: tools/art/prompts/grades/<등급>.md, 규칙: tools/art/PROMPT_GUIDE.md

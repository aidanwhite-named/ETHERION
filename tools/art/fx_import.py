#!/usr/bin/env python3
"""전투 효과 그림 넣기 (2026-11-24, tools/art/fx_overlays.json).
tools/art/pending_fx/<id> <이름>.png (검은 바탕, Gemini 2048×2048)
  → ① 오른쪽 아래 Gemini 반짝이 워터마크를 투명도 지도(tools/art/ref/gemini_sparkle_96.png)로 거꾸로 계산해 지움
     (원본 = 그림 × (1 − a) + 흰색 × a  →  그림 = (원본 − 255a) / (1 − a), 카드 그림과 같은 방식)
  → ② 검은 바탕을 투명으로: 밝기 = 투명도, 색은 밝기로 나눠 되살림(검정 위에 screen으로 얹은 것과 같은 모습)
  → ③ 빈 테두리 잘라내고 긴 변 MAX px, img/fx/<id>.webp (투명 WebP — 게임은 그냥 <img>로 띄운다)
쓰는 법: python3 tools/art/fx_import.py [id ...]      (--check : 지운 자리 확대 시트를 tools/art/pending_fx/_wm_check.png 로)
투명도 지도는 2026-11-24 받은 26장의 같은 자리 최솟값에서 뽑았다(바탕이 검정이라 최솟값 = 255a). 2048 이 아닌 크기는 같은 비율로 늘려 쓴다.
"""
import os, re, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'pending_fx')
DST = os.path.join(HERE, '..', '..', 'img', 'fx')
WM = os.path.join(HERE, 'ref', 'gemini_sparkle_96.png')
MAX = {'weapon': 384, 'hit': 384, 'spell': 384}
WM_SIZE, WM_MARGIN, WM_REF = 96, 64, 2048   # 2048 그림에서 반짝이 = 오른쪽 · 아래 끝에서 64px 떨어진 96px 네모


def unwatermark(a):
    """a: float32 HxWx3 (0~255). 오른쪽 아래 반짝이를 거꾸로 계산해 지운다."""
    h, w, _ = a.shape
    s = min(w, h) / WM_REF
    sz, mg = max(8, round(WM_SIZE * s)), round(WM_MARGIN * s)
    m = Image.open(WM).convert('L')
    if sz != WM_SIZE:
        m = m.resize((sz, sz), Image.LANCZOS)
    al = np.clip(np.asarray(m).astype(np.float32) / 255, 0, 0.99)[..., None]
    y0, x0 = h - mg - sz, w - mg - sz
    p = a[y0:y0 + sz, x0:x0 + sz]
    a[y0:y0 + sz, x0:x0 + sz] = np.clip((p - al * 255) / (1 - al), 0, 255)
    return (x0, y0, sz)


def luma_alpha(a):
    m = a.max(axis=2)
    al = np.clip((m - 10) * 255 / 235, 0, 255)          # 검정 가까이(Gemini 바탕의 잡티)는 완전히 투명
    k = np.where(m > 0, 255 / np.maximum(m, 1), 0)[..., None]
    rgb = np.clip(a * k, 0, 255)                         # 색을 밝기로 나눠 되살림 (투명도가 어둡기를 맡는다)
    rgb[al == 0] = 0
    return Image.fromarray(np.dstack([rgb, al]).round().astype(np.uint8))


def kinds():
    import json
    d = json.load(open(os.path.join(HERE, 'fx_overlays.json'), encoding='utf-8'))
    return {it['id']: it['kind'] for it in d['items']}


def main(ids, check=False):
    os.makedirs(DST, exist_ok=True)
    kd = kinds()
    n, tot, sheet = 0, 0, []
    for f in sorted(os.listdir(SRC)):
        m = re.match(r'(FX-[A-Z0-9-]+)\s', f)
        if not m or not f.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue
        fid = m.group(1)
        if ids and fid not in ids:
            continue
        a = np.asarray(Image.open(os.path.join(SRC, f)).convert('RGB')).astype(np.float32)
        before = a.copy()
        x0, y0, sz = unwatermark(a)
        if check:
            pad = sz // 3
            box = (slice(y0 - pad, y0 + sz + pad), slice(x0 - pad, x0 + sz + pad))
            sheet.append((fid, before[box], a[box]))
        out = luma_alpha(a)
        bb = out.getchannel('A').point(lambda v: 255 if v > 6 else 0).getbbox()
        if bb:
            pad = 16
            bb = (max(0, bb[0] - pad), max(0, bb[1] - pad), min(out.width, bb[2] + pad), min(out.height, bb[3] + pad))
            out = out.crop(bb)
        mx = MAX.get(kd.get(fid, 'hit'), 384)
        out.thumbnail((mx, mx), Image.LANCZOS)
        p = os.path.join(DST, fid + '.webp')
        out.save(p, 'WEBP', quality=82, method=6, alpha_quality=90)
        old = os.path.join(DST, fid + '.png')
        if os.path.exists(old):
            os.remove(old)   # 예전 PNG 판(워터마크를 검게 칠했던 것)은 지움
        sz_kb = os.path.getsize(p)
        tot += sz_kb
        print(f'{fid}: {out.size[0]}x{out.size[1]} {sz_kb // 1024}KB')
        n += 1
    print(f'{n}장 넣음 → img/fx/ (모두 {tot // 1024}KB)')
    if check and sheet:
        from PIL import ImageDraw
        T = 160
        cols = 4
        rows = (len(sheet) + cols - 1) // cols
        W = cols * (2 * T + 12) + 12
        im = Image.new('RGB', (W, rows * (T + 26) + 12), (48, 48, 48))
        d = ImageDraw.Draw(im)
        for i, (fid, b, c) in enumerate(sheet):
            x = 12 + (i % cols) * (2 * T + 12)
            y = 12 + (i // cols) * (T + 26)
            d.text((x, y), fid + '  before | after (x4)', fill=(255, 255, 255))
            im.paste(Image.fromarray(b.astype(np.uint8)).resize((T, T), Image.NEAREST), (x, y + 14))
            im.paste(Image.fromarray(np.clip(c * 4, 0, 255).astype(np.uint8)).resize((T, T), Image.NEAREST), (x + T, y + 14))
        cp = os.path.join(SRC, '_wm_check.png')
        im.save(cp)
        print('확인 시트:', cp)


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    main(set(args), check='--check' in sys.argv)

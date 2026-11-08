# -*- coding: utf-8 -*-
"""카드 뒷면에 ETHERION 글씨 얹기 (게임 v3.19.2, 스타일 가이드 3.1)

글씨 없는 원본 img/ui/deck/card_back_plain.png 위에, 문장(메달) 아래 빈 자리에
금속 광택 'ETHERION'(Cinzel Decorative Black, 타이틀 로고 2.3과 같은 금 그라데이션)과
양옆 금 실선 · 마름모를 얹어 img/ui/deck/card_back.png 로 굽는다.

카드 뒷면 그림을 새로 바꿨으면: 새 그림을 card_back_plain.png 로 넣고 이 스크립트를 다시 돌린다.
  python tools/art/cardback_text.py            (게임 폴더 맨 위에서)
글씨 자리 · 크기는 아래 TEXT_Y · TEXT_W (그림 크기에 대한 비율).
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SRC = os.path.join(ROOT, "img", "ui", "deck", "card_back_plain.png")
OUT = os.path.join(ROOT, "img", "ui", "deck", "card_back.png")
FONT = os.path.join(ROOT, "fonts", "CinzelDecorative-Black.ttf")

WORD = "ETHERION"
TEXT_Y = 0.786      # 글씨 가운데 높이 (메달 아래 · 아래쪽 마름모 위)
TEXT_W = 0.50       # 글씨 폭 (그림 폭에 대한 비율)
TRACK = 0.16        # 자간 (글자 높이에 대한 비율)

# 타이틀 로고(2.3)와 같은 금속 광택: 위 → 아래
GOLD = [(0.00, (255, 251, 232)), (0.30, (246, 220, 150)), (0.49, (200, 150, 63)),
        (0.50, (122, 84, 24)), (0.53, (122, 84, 24)), (0.56, (217, 173, 92)), (1.00, (255, 240, 191))]


def grad(w, h, stops):
    col = Image.new("RGB", (1, h))
    px = col.load()
    for y in range(h):
        t = y / max(1, h - 1)
        for (a, ca), (b, cb) in zip(stops, stops[1:]):
            if a <= t <= b:
                k = 0 if b == a else (t - a) / (b - a)
                px[0, y] = tuple(round(ca[i] + (cb[i] - ca[i]) * k) for i in range(3))
                break
    return col.resize((w, h))


def word_mask(size, font_size):
    """자간을 넓힌 글자 모양(L). 반환: 마스크, 글자 높이"""
    font = ImageFont.truetype(FONT, font_size)
    asc = font.getbbox("E")
    cap = asc[3] - asc[1]
    track = round(cap * TRACK)
    widths = [font.getlength(c) for c in WORD]
    total = sum(widths) + track * (len(WORD) - 1)
    pad = cap
    m = Image.new("L", (int(total + pad * 2), int(cap + pad * 2)), 0)
    d = ImageDraw.Draw(m)
    x = pad
    for c, w in zip(WORD, widths):
        d.text((x, pad - asc[1]), c, font=font, fill=255)
        x += w + track
    return m.crop(m.getbbox()), cap


def main():
    src = SRC if os.path.exists(SRC) else OUT
    base = Image.open(src).convert("RGBA")
    W, H = base.size
    if src == OUT and not os.path.exists(SRC):
        base.save(SRC)   # 처음 돌릴 때: 글씨 없는 원본을 남긴다
        print("원본 보관:", SRC)

    # 원하는 폭에 맞는 글자 크기 찾기
    fs = 40
    while True:
        m, cap = word_mask(None, fs + 2)
        if m.width > W * TEXT_W:
            break
        fs += 2
    m, cap = word_mask(None, fs)
    mw, mh = m.size
    cx, cy = W // 2, round(H * TEXT_Y)
    x0, y0 = cx - mw // 2, cy - mh // 2

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    full = Image.new("L", (W, H), 0)
    full.paste(m, (x0, y0))

    # 1) 은은한 하늘빛 후광 (문장의 에테르 빛)
    glow = full.filter(ImageFilter.GaussianBlur(cap * 0.55)).point(lambda v: int(v * 0.55))
    layer = Image.alpha_composite(layer, Image.merge("RGBA", (*Image.new("RGB", (W, H), (120, 190, 255)).split(), glow)))
    # 2) 아래로 드리운 그림자
    sh = Image.new("L", (W, H), 0); sh.paste(m, (x0, y0 + max(2, round(cap * 0.07))))
    sh = sh.filter(ImageFilter.GaussianBlur(cap * 0.08)).point(lambda v: int(v * 0.85))
    layer = Image.alpha_composite(layer, Image.merge("RGBA", (*Image.new("RGB", (W, H), (6, 4, 12)).split(), sh)))
    # 3) 검은 외곽선 (작은 화면에서도 글자가 바탕에서 떨어져 보이게)
    ol = full.filter(ImageFilter.MaxFilter(2 * max(1, round(cap * 0.045)) + 1))
    layer = Image.alpha_composite(layer, Image.merge("RGBA", (*Image.new("RGB", (W, H), (7, 5, 12)).split(), ol)))
    # 4) 금속 광택 글자 + 위쪽 밝은 테두리
    g = Image.new("RGB", (W, H), (0, 0, 0)); g.paste(grad(mw, mh, GOLD), (x0, y0))
    layer = Image.alpha_composite(layer, Image.merge("RGBA", (*g.split(), full)))
    inner = ImageChops.subtract(full, ImageChops.offset(full, 0, max(1, round(cap * 0.03))))
    layer = Image.alpha_composite(layer, Image.merge("RGBA", (*Image.new("RGB", (W, H), (255, 250, 228)).split(), inner.point(lambda v: int(v * 0.7)))))

    # 5) 양옆 금 실선 + 마름모 (스타일 가이드의 장식 구분선)
    d = ImageDraw.Draw(layer)
    gap, ln = cap * 0.55, W * 0.085
    for s in (-1, 1):
        xa = cx + s * (mw / 2 + gap)
        xb = xa + s * ln
        d.line([(xa, cy), (xb, cy)], fill=(7, 5, 12, 230), width=max(3, round(cap * 0.12)))
        d.line([(xa, cy), (xb, cy)], fill=(217, 180, 106, 255), width=max(1, round(cap * 0.05)))
        r = cap * 0.16
        xm = xb + s * r * 0.9
        dm = [(xm, cy - r), (xm + r * 0.75, cy), (xm, cy + r), (xm - r * 0.75, cy)]
        d.polygon(dm, fill=(240, 208, 136, 255), outline=(7, 5, 12, 255))

    out = Image.alpha_composite(base, layer)
    out.save(OUT, optimize=True)
    print(f"{OUT}  ({W}x{H}, 글자 크기 {fs}, 글자 높이 {cap}px)")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        SRC, OUT = sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else sys.argv[1]
        if len(sys.argv) > 3:
            FONT = sys.argv[3]
    main()

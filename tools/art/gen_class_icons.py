import os, math
from PIL import Image, ImageDraw

os.makedirs('img/ui/class', exist_ok=True)
S = 512

def render_class_icon(cid, draw_fn):
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    draw_fn(img, S // 2, S // 2)
    path = f'img/ui/class/{cid}.png'
    img.save(path)
    print(f'Rendered class icon: {path}')

# martial: clenched fist seen from front, knuckles forward, ember orange glow #ff9d6a
def draw_martial(img, cx, cy):
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([(cx - 120, cy - 80), (cx + 120, cy + 90)], radius=36, fill=(240, 230, 215, 255), outline=(180, 140, 60, 255), width=10)
    for i in range(4):
        kx = cx - 90 + i * 60
        draw.rounded_rectangle([(kx - 26, cy - 140), (kx + 26, cy - 40)], radius=24, fill=(245, 235, 220, 255), outline=(180, 140, 60, 255), width=8)
    draw.rounded_rectangle([(cx - 135, cy + 10), (cx + 60, cy + 90)], radius=28, fill=(235, 220, 200, 255), outline=(180, 140, 60, 255), width=8)
    glow_col = (255, 157, 106, 255)
    draw.line([(cx - 60, cy - 30), (cx - 20, cy + 20), (cx + 40, cy - 10), (cx + 80, cy + 30)], fill=glow_col, width=8)
    draw.line([(cx - 10, cy - 80), (cx - 20, cy + 20)], fill=glow_col, width=6)

# arms: two crossed longswords forming X, blades up, steel blue #c3cfe2
def draw_arms(img, cx, cy):
    def single_sword():
        s_img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
        d = ImageDraw.Draw(s_img)
        # Blade
        d.polygon([(cx, cy - 180), (cx + 22, cy - 120), (cx + 18, cy + 50), (cx - 18, cy + 50), (cx - 22, cy - 120)], fill=(220, 230, 245, 255), outline=(110, 130, 160, 255), width=6)
        d.line([(cx, cy - 160), (cx, cy + 40)], fill=(150, 175, 205, 255), width=5)
        # Guard
        d.rounded_rectangle([(cx - 65, cy + 50), (cx + 65, cy + 68)], radius=8, fill=(215, 175, 80, 255), outline=(120, 80, 20, 255), width=5)
        # Grip
        d.rectangle([(cx - 10, cy + 68), (cx + 10, cy + 130)], fill=(80, 65, 60, 255))
        # Pommel
        d.ellipse([(cx - 22, cy + 130), (cx + 22, cy + 170)], fill=(215, 175, 80, 255), outline=(120, 80, 20, 255), width=5)
        return s_img

    sw1 = single_sword().rotate(40, resample=Image.BICUBIC)
    sw2 = single_sword().rotate(-40, resample=Image.BICUBIC)
    combined = Image.alpha_composite(sw1, sw2)
    img.paste(combined, (0, 0), combined)

# arcane: sharp 4-pointed magic star + smaller star, violet #ae92ff
def draw_arcane(img, cx, cy):
    draw = ImageDraw.Draw(img)
    def star(ox, oy, r_out, r_in, fill_col, out_col):
        pts = []
        for i in range(8):
            ang = i * math.pi / 4
            r = r_out if i % 2 == 0 else r_in
            pts.append((ox + math.cos(ang) * r, oy + math.sin(ang) * r))
        draw.polygon(pts, fill=fill_col, outline=out_col, width=6)
    star(cx - 20, cy - 20, 175, 45, (230, 220, 255, 255), (174, 146, 255, 255))
    draw.ellipse([(cx - 45, cy - 45), (cx + 5, cy + 5)], fill=(174, 146, 255, 255))
    star(cx + 105, cy + 95, 75, 22, (245, 235, 255, 255), (174, 146, 255, 255))

# prayer: two hands pressed together pointing up + radiant light, holy gold #ffd66e
def draw_prayer(img, cx, cy):
    draw = ImageDraw.Draw(img)
    for ang in range(-70, 71, 20):
        rad = math.radians(ang - 90)
        draw.line([(cx + math.cos(rad) * 110, cy - 50 + math.sin(rad) * 110), (cx + math.cos(rad) * 165, cy - 50 + math.sin(rad) * 165)], fill=(255, 214, 110, 255), width=7)
    draw.ellipse([(cx - 22, cy - 120), (cx + 22, cy - 76)], fill=(255, 245, 180, 255))
    left_hand = [(cx - 8, cy - 65), (cx - 20, cy - 25), (cx - 55, cy + 40), (cx - 85, cy + 120), (cx - 25, cy + 145), (cx - 4, cy + 110)]
    draw.polygon(left_hand, fill=(245, 235, 220, 255), outline=(195, 150, 60, 255), width=7)
    right_hand = [(cx + 8, cy - 65), (cx + 20, cy - 25), (cx + 55, cy + 40), (cx + 85, cy + 120), (cx + 25, cy + 145), (cx + 4, cy + 110)]
    draw.polygon(right_hand, fill=(245, 235, 220, 255), outline=(195, 150, 60, 255), width=7)
    draw.line([(cx, cy - 65), (cx, cy + 110)], fill=(180, 130, 45, 255), width=6)

# universal: simple gold ring with four tiny notches at N, E, S, W, antique gold #d8c48e
def draw_universal(img, cx, cy):
    draw = ImageDraw.Draw(img)
    R, r_in = 150, 105
    draw.ellipse([(cx - R, cy - R), (cx + R, cy + R)], fill=(216, 196, 142, 255), outline=(130, 105, 50, 255), width=8)
    draw.ellipse([(cx - r_in, cy - r_in), (cx + r_in, cy + r_in)], fill=(0, 0, 0, 0), outline=(130, 105, 50, 255), width=8)
    for dx, dy in [(0, -R), (R, 0), (0, R), (-R, 0)]:
        draw.ellipse([(cx + dx - 24, cy + dy - 24), (cx + dx + 24, cy + dy + 24)], fill=(255, 235, 180, 255), outline=(130, 105, 50, 255), width=5)

render_class_icon('martial', draw_martial)
render_class_icon('arms', draw_arms)
render_class_icon('arcane', draw_arcane)
render_class_icon('prayer', draw_prayer)
render_class_icon('universal', draw_universal)
print('All 5 class icons generated successfully.')

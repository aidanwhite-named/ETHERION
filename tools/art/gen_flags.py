import os, math, random
from PIL import Image, ImageDraw

os.makedirs('img/ui/flags', exist_ok=True)
W, H = 1500, 600

FACTIONS = {
    'B1': {
        'name': 'Cinder Goblins',
        'cloth_rgb': (240, 106, 72),
        'cloth_dark': (74, 21, 12),
        'trim_rgb': (212, 137, 58),
        'emblem_color': (255, 107, 61),
        'type': 'cannon'
    },
    'B2': {
        'name': 'Ironbeard Dwarves',
        'cloth_rgb': (163, 175, 189),
        'cloth_dark': (40, 48, 58),
        'trim_rgb': (169, 180, 194),
        'emblem_color': (180, 205, 230),
        'type': 'golem'
    },
    'B3': {
        'name': 'Thunder Gnomes',
        'cloth_rgb': (27, 36, 56),
        'cloth_dark': (12, 16, 28),
        'trim_rgb': (233, 189, 60),
        'emblem_color': (255, 216, 74),
        'type': 'lightning'
    },
    'G1': {
        'name': 'Rockfist Orcs',
        'cloth_rgb': (201, 146, 96),
        'cloth_dark': (65, 42, 24),
        'trim_rgb': (184, 138, 90),
        'emblem_color': (235, 215, 180),
        'type': 'fangs'
    },
    'G2': {
        'name': 'Moss Trolls',
        'cloth_rgb': (95, 191, 122),
        'cloth_dark': (22, 55, 30),
        'trim_rgb': (88, 184, 95),
        'emblem_color': (130, 225, 140),
        'type': 'tree'
    },
    'G3': {
        'name': 'Bluescale Merfolk',
        'cloth_rgb': (92, 179, 224),
        'cloth_dark': (20, 52, 78),
        'trim_rgb': (79, 179, 255),
        'emblem_color': (190, 235, 255),
        'type': 'water'
    },
    'A1': {
        'name': 'Abyssal Fiends',
        'cloth_rgb': (172, 130, 220),
        'cloth_dark': (24, 16, 38),
        'trim_rgb': (139, 92, 246),
        'emblem_color': (185, 130, 255),
        'type': 'eye'
    },
    'A2': {
        'name': 'Radiant Seraphs',
        'cloth_rgb': (245, 248, 255),
        'cloth_dark': (95, 90, 110),
        'trim_rgb': (240, 207, 106),
        'emblem_color': (255, 233, 168),
        'type': 'sun_sword'
    },
    'A3': {
        'name': 'Storm High Elves',
        'cloth_rgb': (108, 201, 193),
        'cloth_dark': (25, 62, 60),
        'trim_rgb': (159, 227, 214),
        'emblem_color': (210, 250, 245),
        'type': 'whirlwind'
    }
}

def render_banner(fid, data):
    random.seed(hash(fid) % 100000)
    top_pts = []
    bot_pts = []
    steps = 60
    for i in range(steps + 1):
        t = i / steps
        x = 60 + t * (1440 - 60)
        wave = math.sin(t * math.pi * 2.5) * 16 + math.cos(t * math.pi * 1.2) * 8
        top_y = 90 + wave + t * 15
        bot_y = 510 + wave - t * 10
        top_pts.append((x, top_y))
        bot_pts.append((x, bot_y))

    notch_tip = (1220, (top_pts[-1][1] + bot_pts[-1][1]) / 2)
    cloth_poly = top_pts + [top_pts[-1], notch_tip, bot_pts[-1]] + list(reversed(bot_pts))

    cloth_mask = Image.new('L', (W, H), 0)
    d_mask = ImageDraw.Draw(cloth_mask)
    d_mask.polygon(cloth_poly, fill=255)

    cloth_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_cloth = ImageDraw.Draw(cloth_layer)

    cr, cg, cb = data['cloth_rgb']
    dr, dg, db = data['cloth_dark']

    for y in range(H):
        t_y = y / H
        r = int(cr * (1 - t_y * 0.55) + dr * t_y * 0.55)
        g = int(cg * (1 - t_y * 0.55) + dg * t_y * 0.55)
        b = int(cb * (1 - t_y * 0.55) + db * t_y * 0.55)
        d_cloth.line([(0, y), (W, y)], fill=(r, g, b, 255))

    noise = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_noise = ImageDraw.Draw(noise)
    for _ in range(12000):
        nx = random.randint(60, 1440)
        ny = random.randint(80, 520)
        dist_left = (nx - 60) / 1380
        alpha = int(random.randint(15, 60) * (1.1 - dist_left * 0.6))
        v = random.randint(10, 45)
        d_noise.ellipse((nx - 3, ny - 2, nx + 3, ny + 2), fill=(v, v, v, alpha))

    cloth_layer = Image.alpha_composite(cloth_layer, noise)

    tr, tg, tb = data['trim_rgb']
    trim_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_trim = ImageDraw.Draw(trim_layer)
    d_trim.line(top_pts, fill=(tr, tg, tb, 240), width=6)
    d_trim.line(bot_pts, fill=(tr, tg, tb, 240), width=6)
    d_trim.line([top_pts[-1], notch_tip, bot_pts[-1]], fill=(int(tr * 0.8), int(tg * 0.8), int(tb * 0.8), 220), width=5)

    for i in range(0, len(top_pts), 3):
        px, py = top_pts[i]
        d_trim.ellipse((px - 3, py - 3, px + 3, py + 3), fill=(245, 215, 140, 255), outline=(60, 40, 20, 255))
        bx, by = bot_pts[i]
        d_trim.ellipse((bx - 3, by - 3, bx + 3, by + 3), fill=(245, 215, 140, 255), outline=(60, 40, 20, 255))

    cloth_layer = Image.alpha_composite(cloth_layer, trim_layer)
    cloth_layer.putalpha(cloth_mask)

    emblem = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_emb = ImageDraw.Draw(emblem)
    ec = data['emblem_color']
    et = data['type']
    cx, cy = 230, 310

    if et == 'cannon':
        for sx, sy, sr in [(310, 250, 42), (345, 230, 36), (360, 275, 30)]:
            d_emb.ellipse((sx - sr, sy - sr, sx + sr, sy + sr), fill=(60, 50, 55, 160))
            d_emb.ellipse((sx - sr * 0.6, sy - sr * 0.6, sx + sr * 0.6, sy + sr * 0.6), fill=(255, 107, 61, 90))
        cr_w = 52
        d_emb.ellipse((cx - cr_w, cy + 65 - cr_w, cx + cr_w, cy + 65 + cr_w), fill=(70, 55, 45, 255), outline=(212, 137, 58, 255), width=7)
        d_emb.polygon([(cx - 35, cy + 45), (cx - 20, cy + 72), (cx + 92, cy - 28), (cx + 78, cy - 52)], fill=(160, 100, 40, 255))
        d_emb.line([(cx + 78, cy - 52), (cx + 92, cy - 28)], fill=(245, 200, 110, 255), width=8)
        d_emb.ellipse((cx + 85, cy - 40, cx + 105, cy - 20), fill=ec + (240,))

    elif et == 'golem':
        d_emb.rounded_rectangle([(cx - 70, cy + 10), (cx + 70, cy + 75)], radius=10, fill=(75, 85, 95, 255), outline=ec, width=4)
        d_emb.rounded_rectangle([(cx - 45, cy - 65), (cx + 45, cy + 15)], radius=12, fill=(90, 100, 115, 255), outline=ec, width=5)
        d_emb.line([(cx - 30, cy - 20), (cx - 10, cy - 20)], fill=ec, width=6)
        d_emb.line([(cx + 10, cy - 20), (cx + 30, cy - 20)], fill=ec, width=6)
        d_emb.line([(cx, cy - 60), (cx, cy - 35)], fill=(240, 210, 120, 255), width=4)

    elif et == 'lightning':
        d_emb.ellipse((cx - 55, cy - 20, cx + 55, cy + 75), outline=(180, 220, 255, 220), width=4)
        d_emb.rectangle([(cx - 22, cy - 75), (cx + 22, cy - 20)], outline=(180, 220, 255, 220), width=4)
        pts = [(cx + 5, cy - 65), (cx - 25, cy - 5), (cx + 5, cy - 5), (cx - 20, cy + 65), (cx + 30, cy), (cx + 5, cy), (cx + 25, cy - 65)]
        d_emb.polygon(pts, fill=ec + (255,))

    elif et == 'fangs':
        for offset, scale in [(-45, 0.85), (0, 1.05), (45, 0.85)]:
            fx = cx + offset
            pts = [(fx - 16 * scale, cy - 40 * scale), (fx + 16 * scale, cy - 40 * scale), (fx + 6 * scale, cy + 15 * scale), (fx, cy + 65 * scale), (fx - 6 * scale, cy + 15 * scale)]
            d_emb.polygon(pts, fill=ec, outline=(100, 75, 45, 255), width=3)

    elif et == 'tree':
        d_emb.ellipse((cx - 65, cy - 80, cx + 65, cy + 15), fill=ec + (240,), outline=(40, 95, 45, 255), width=4)
        d_emb.ellipse((cx - 40, cy - 60, cx + 40, cy), fill=(160, 240, 170, 255))
        d_emb.polygon([(cx - 18, cy), (cx + 18, cy), (cx + 32, cy + 70), (cx - 32, cy + 70)], fill=(80, 50, 30, 255))
        d_emb.line([(cx - 32, cy + 70), (cx - 55, cy + 85)], fill=(80, 50, 30, 255), width=6)
        d_emb.line([(cx + 32, cy + 70), (cx + 55, cy + 85)], fill=(80, 50, 30, 255), width=6)

    elif et == 'water':
        drop_pts = [(cx, cy - 75), (cx + 42, cy), (cx, cy + 38), (cx - 42, cy)]
        d_emb.polygon(drop_pts, fill=ec + (250,), outline=(40, 120, 190, 255), width=4)
        for wy in [cy + 48, cy + 66, cy + 84]:
            wave_pts = [(cx - 60 + w, wy + int(math.sin(w * 0.1) * 7)) for w in range(0, 121, 6)]
            d_emb.line(wave_pts, fill=ec + (220,), width=4)

    elif et == 'eye':
        d_emb.polygon([(cx - 65, cy), (cx, cy - 45), (cx + 65, cy), (cx, cy + 45)], fill=(20, 15, 30, 255), outline=ec, width=5)
        d_emb.ellipse((cx - 30, cy - 30, cx + 30, cy + 30), fill=ec + (255,))
        d_emb.polygon([(cx - 7, cy - 26), (cx + 7, cy - 26), (cx + 4, cy + 26), (cx - 4, cy + 26)], fill=(10, 5, 15, 255))

    elif et == 'sun_sword':
        d_emb.ellipse((cx - 40, cy - 55, cx + 40, cy + 25), fill=ec, outline=(210, 160, 50, 255), width=4)
        for ang in range(0, 360, 30):
            rad = math.radians(ang)
            d_emb.line([(cx + math.cos(rad) * 44, cy - 15 + math.sin(rad) * 44), (cx + math.cos(rad) * 58, cy - 15 + math.sin(rad) * 58)], fill=ec, width=3)
        d_emb.polygon([(cx - 7, cy - 10), (cx + 7, cy - 10), (cx, cy + 85)], fill=(255, 255, 255, 255), outline=(150, 130, 90, 255), width=2)
        d_emb.line([(cx - 22, cy + 5), (cx + 22, cy + 5)], fill=(220, 175, 70, 255), width=5)

    elif et == 'whirlwind':
        for ang_offset in [0, math.pi]:
            pts = []
            for t_step in range(40):
                theta = t_step * 0.2 + ang_offset
                r = t_step * 1.5
                pts.append((cx + math.cos(theta) * r, cy + math.sin(theta) * r))
            d_emb.line(pts, fill=ec + (240,), width=6)

    pole = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d_pole = ImageDraw.Draw(pole)
    d_pole.rounded_rectangle([(38, 45), (52, 555)], radius=6, fill=(180, 130, 50, 255), outline=(245, 215, 120, 255), width=2)
    d_pole.line([(42, 50), (42, 550)], fill=(255, 235, 160, 220), width=2)
    d_pole.polygon([(45, 15), (32, 48), (58, 48)], fill=(235, 195, 90, 255), outline=(120, 80, 20, 255), width=2)
    d_pole.ellipse((39, 42, 51, 54), fill=(255, 225, 130, 255))
    d_pole.polygon([(45, 585), (34, 550), (56, 550)], fill=(210, 165, 70, 255), outline=(110, 70, 20, 255), width=2)
    for ry in [110, 210, 310, 410, 500]:
        d_pole.rounded_rectangle([(46, ry - 6), (66, ry + 6)], radius=4, fill=(230, 185, 90, 255), outline=(80, 50, 15, 255), width=2)

    final = Image.alpha_composite(cloth_layer, emblem)
    final = Image.alpha_composite(final, pole)
    final.save(f'img/ui/flags/{fid}.png')
    name = data['name']
    print(f'Rendered flag: img/ui/flags/{fid}.png ({name})')

for fid, data in FACTIONS.items():
    render_banner(fid, data)
print('All 9 faction banners generated successfully.')

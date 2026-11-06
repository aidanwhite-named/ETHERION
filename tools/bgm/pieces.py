"""ETHERION BGM — title theme + nine flag (group) themes. All melodies original.
Run: python3 pieces.py [name ...]   (no args = all)"""
import sys
from kit import Piece, GM, SUSTAIN, WIND, PAD, PLUCK, KEYS, BELL, EQ, midi

OUT = '/home/claude/bgm/out/'
PIECES = {}


def piece(fn):
    PIECES[fn.__name__] = fn
    return fn


def swell(base, lift=12, span=8, ref=72):
    import numpy as np
    return lambda t, p, d: base + lift * np.sin(np.pi * ((t % span) / span)) + (p - ref) * 0.5


# ---------------------------------------------------------------- title
@piece
def title():
    """ETHERION — 에테르가 흐르는 땅. Mystic, wide, gentle. D minor, 66 BPM, 14 bars (~51 s)."""
    P = Piece(66, 4, [('intro', ['Dm', 'Bbmaj7']),
                      ('A', ['Dm', 'Bb', 'F', 'C']),
                      ('B', ['Gm', 'Bbmaj7', 'Csus4 C', 'A7sus4 A7']),
                      ('A', ['Dm', 'Bb', 'F', 'C'])])
    P.melody('lead', GM['horn'], "D4:1 A4:2 G4:.5 F4:.5 | F4:1.5 G4:.5 D4:2 | C4:1 F4:1 A4:1.5 C5:.5 | G4:4",
             'A', pan=-0.1, gain=1.1, legato=1.05, vel_fn=swell(78, 10, 16), **WIND)
    P.melody('lead', GM['strings'], "D5:2 Bb4:1 G4:1 | F4:1.5 G4:.5 D5:2 | C5:2 G4:1 E4:1 | D4:2 C#4:2",
             'B', pan=0.15, gain=0.9, legato=1.05, vel_fn=swell(80, 10, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], "D4:2 Bb3:1 G3:1 | F3:1.5 G3:.5 D4:2 | C4:2 G3:1 E3:1 | D3:2 C#3:2",
             'B', pan=-0.1, gain=0.8, legato=1.05, vel=70, check=False, **WIND)
    # second A: strings carry the motif an octave up, horn answers below
    P.melody('lead', GM['strings'], "D5:1 A5:2 G5:.5 F5:.5 | F5:1.5 G5:.5 D5:2 | C5:1 F5:1 A5:1.5 C6:.5 | G5:4",
             'A', 1, pan=0.15, gain=0.85, legato=1.05, vel_fn=swell(82, 8, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], "r:2 D4:2 | Bb3:2 F3:2 | A3:4 | E4:2 C4:2", 'A', 1, pan=-0.1, gain=0.8,
             legato=1.05, vel=68, **WIND)
    for s, k in (('intro', 0), ('A', 0), ('B', 0), ('A', 1)):
        P.figure('harp', GM['harp'], s, k, fig=(0, 2, 3, 4, 5, 6, 5, 4), step=0.5, lo='D3', bass_lo='D2',
                 ring='half', base_vel=58, pan=0.3, gain=0.8, **PLUCK)
        P.pad('pad', GM['oohs'], s, k, lo='D4', n=3, vel=48 if s == 'intro' else 56, gain=0.45)
        P.pad('pad', GM['slowstr'], s, k, lo='A3', n=3, vel=46 + 6 * k, gain=0.45)
        P.bass('low', GM['contrabass'], s, k, lo='D2', vel=62, gain=0.6, **SUSTAIN)
    # bells and celesta glints at phrase heads
    P.add('bell', [(0, midi('D5'), 3), (P.at('A'), midi('A5'), 3), (P.at('B'), midi('D6'), 3)], GM['bells'],
          vel=50, gain=0.6, pan=0.2, **BELL)
    P.melody('bell', GM['celesta'], "r:2 A5:.5 D6:.5 F6:1 | r:2 F6:.5 E6:.5 D6:1", 'intro', check=False,
             vel=50, gain=0.7, pan=0.35, **BELL)
    P.add('low', [(P.at('A'), midi('D2'), 1), (P.at('B'), midi('G2'), 1), (P.at('B') + 12, midi('A2'), 1)],
          GM['timpani'], vel=58, gain=0.8, attack=0.002, release=1.2, decay=1.0, sustain=0.1)
    return P, dict(sends=dict(lead=0.45, harp=0.4, pad=0.6, low=0.3, bell=0.6),
                   eq=dict(lead=EQ['lead'], harp=EQ['keys'], pad=EQ['pad'], low=EQ['low'], bell=EQ['bright']),
                   rev_time=3.4, rev_mix=0.6)


# ================================================================ brass faction
@piece
def b1_goblin():
    """잿불 고블린 — 장난스러운 화약 장인들의 작업장. G mixolydian 6/8 (eighth = 156), bouncy, light."""
    A = ['G', 'F', 'C', 'G', 'G', 'F', 'C', 'D7']
    B = ['Em', 'C', 'G/B', 'D', 'Em', 'C', 'Am', 'D7']
    P = Piece(156, 6, [('intro', ['G', 'F']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['C', 'D7'])])
    melA = ("D5:2 B4:1 G4:2 A4:1 | C5:2 A4:1 F4:2 G4:1 | E5:3 D5:1 C5:1 B4:1 | D5:5 r:1 | "
            "B4:1 C5:1 D5:1 G5:2 F5:1 | A5:2 F5:1 C5:2 D5:1 | E5:2 G5:1 E5:2 C5:1 | D5:3 F#5:2 A5:1")
    melB = ("B4:3 E5:2 D5:1 | C5:2 E5:1 G5:3 | D5:3 B4:2 G4:1 | A4:5 r:1 | "
            "G4:1 A4:1 B4:1 E5:3 | E5:1 D5:1 C5:1 G4:3 | A4:2 C5:1 E5:2 D5:1 | F#5:3 E5:1 D5:1 C5:1")
    P.melody('lead', GM['clarinet'], melA, 'A', 0, pan=0.15, legato=0.95, vel_fn=swell(72, 10, 24), **WIND)
    P.melody('lead', GM['ocarina'], melA, 'A', 1, pan=0.2, legato=0.95, vel_fn=swell(70, 10, 24), **WIND)
    P.melody('lead', GM['bassoon'], melA, 'A', 1, shift=-12, pan=-0.2, gain=0.6, legato=0.9, vel=62, check=False, **WIND)
    P.melody('lead', GM['clarinet'], melB, 'B', pan=0.15, legato=1.0, vel_fn=swell(76, 10, 24), **WIND)
    P.melody('lead', GM['clarinet'], melA, 'A', 2, pan=0.15, legato=0.95, vel_fn=swell(74, 10, 24), **WIND)
    P.melody('lead', GM['bassoon'], melA, 'A', 2, shift=-12, pan=-0.2, gain=0.55, legato=0.9, vel=60, check=False, **WIND)
    P.melody('lead', GM['marimba'], "G5:1 D5:1 B4:1 G5:1 D5:1 B4:1 | F5:1 C5:1 A4:1 F5:1 C5:1 A4:1", 'intro',
             check=False, gain=0.6, pan=0.3, vel=60, **KEYS)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.bass('low', GM['pizz'], name, k, lo='D2', pattern=[(0, 1, 0), (3, 1, 7)], vel=72, gain=0.8, **PLUCK)
        P.stab('keys', GM['pizz'], name, [1.0, 2.0, 4.0, 5.0], k, lo='B3', n=3, dur=0.6, vel=48, gain=0.45, pan=0.25, **PLUCK)
        if name in ('A', 'B') and k > 0 or name == 'B':
            P.figure('keys', GM['marimba'], name, k, fig=(1, 3, 2, 4, 3, 2), step=1, lo='G4', ring=1.2,
                     base_vel=46, gain=0.35, pan=-0.3, **KEYS)
            P.perc('perc', name, {76: [0, 3], 70: [1, 2, 4, 5]}, k, vel=34, gain=0.35, pan=0.1)
    P.pad('pad', GM['accordion'], 'B', lo='E4', n=3, vel=40, gain=0.6, pan=-0.35, attack=0.2, release=0.4)
    return P, dict(sends=dict(lead=0.3, low=0.2, keys=0.3, perc=0.2, pad=0.35),
                   eq=dict(lead=EQ['lead'], low=EQ['low'], keys=EQ['keys'], perc=EQ['perc'], pad=EQ['pad']),
                   rev_time=1.8, rev_mix=0.4)


@piece
def b2_dwarf():
    """무쇠수염 드워프 — 산 아래 대장간 홀. D dorian 4/4, 72 BPM, warm low brass, steady."""
    A = ['Dm', 'C', 'Dm', 'G', 'Bb', 'F', 'Csus4 C', 'Dm']
    B = ['F', 'C', 'Dm', 'Bb', 'F', 'C', 'Gm', 'A']
    P = Piece(72, 4, [('intro', ['Dm', 'C']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['Bb', 'A'])])
    melA = ("D4:2 F4:1 A4:1 | G4:2 E4:2 | F4:1 E4:.5 D4:.5 A4:2 | B4:2 D5:1 B4:1 | "
            "D5:1.5 C5:.5 Bb4:2 | A4:1 C5:1 F4:2 | G4:2 E4:2 | D4:4")
    melB = ("A4:2 C5:2 | E5:1.5 D5:.5 C5:2 | D5:1 F5:1 A5:2 | G5:1.5 F5:.5 D5:2 | "
            "C5:1 F5:1 A5:1.5 G5:.5 | G5:2 E5:2 | Bb4:1 D5:1 G5:2 | E5:2 C#5:2")
    P.melody('lead', GM['horn'], melA, 'A', 0, pan=-0.1, legato=1.04, vel_fn=swell(74, 10, 16), **WIND)
    P.melody('lead', GM['cello'], melA, 'A', 1, shift=-12, pan=-0.25, legato=1.05, vel_fn=swell(78, 10, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], "D5:4 | E5:4 | D5:4 | D5:4 | F5:4 | C5:4 | C5:2 G4:2 | A4:4", 'A', 1,
             shift=-12, pan=0.1, gain=0.6, vel=62, **WIND)
    P.melody('lead', GM['strings'], melB, 'B', pan=0.15, legato=1.04, vel_fn=swell(80, 10, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], melB, 'B', shift=-12, pan=-0.1, gain=0.6, legato=1.04, vel=68, check=False, **WIND)
    P.melody('lead', GM['horn'], melA, 'A', 2, pan=-0.1, legato=1.04, vel_fn=swell(78, 10, 16), **WIND)
    P.melody('lead', GM['strings'], melA, 'A', 2, shift=12, pan=0.15, gain=0.55, legato=1.04, vel=66, check=False, **SUSTAIN)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.bass('low', GM['tuba'], name, k, lo='D2', vel=62, gain=0.55, **WIND)
        P.bass('low', GM['contrabass'], name, k, lo='D2', vel=60, gain=0.5, **SUSTAIN)
        P.figure('keys', GM['harp'], name, k, fig=(0, 2, 3, 4, 3, 2, 3, 4), step=0.5, lo='D3', bass_lo='D2',
                 base_vel=50, gain=0.45, pan=0.3, **PLUCK)
        P.pad('pad', GM['choir'], name, k, lo='A3', n=3, vel=44 + (8 if name == 'B' else 0), gain=0.35)
    P.figure('keys', GM['cello'], 'B', fig=(0, None, 1, None, 2, None, 1, None), step=0.5, lo='D3', bass_lo='D2',
             ring=1.0, base_vel=54, gain=0.4, pan=-0.3, **SUSTAIN)
    # distant anvil (tubular bell) at section heads, soft timpani pulse in B and last A
    P.add('bell', [(P.at(n, k), midi('D5'), 3) for n, k in [('intro', 0), ('A', 1), ('B', 0), ('A', 2)]],
          GM['bells'], vel=46, gain=0.5, pan=0.3, **BELL)
    for name, k in [('B', 0), ('A', 2)]:
        notes = [(P.at(name, k) + b * 8, midi('D2'), 1) for b in range(4)]
        P.add('low', notes, GM['timpani'], vel=48, gain=0.5, attack=0.002, release=1.0, decay=0.8, sustain=0.1)
    return P, dict(sends=dict(lead=0.4, low=0.3, keys=0.35, pad=0.55, bell=0.6),
                   eq=dict(lead=EQ['lead'], low=EQ['low'], keys=EQ['keys'], pad=EQ['pad'], bell=EQ['bright']),
                   rev_time=3.6, rev_mix=0.6)


@piece
def b3_gnome():
    """번개 노움 — 태엽과 번개병이 가득한 학술원. C lydian 4/4, 96 BPM, ticking and curious."""
    A = ['C', 'D/C', 'Em', 'Am', 'F', 'D7', 'G', 'G7']
    B = ['Am', 'F', 'C', 'G', 'Am', 'F', 'Dm7', 'G7']
    P = Piece(96, 4, [('intro', ['Cmaj7', 'D/C']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['Fmaj7', 'G7'])])
    melA = ("E5:.5 G5:.5 C6:.5 G5:.5 E5:1 G5:1 | F#5:.5 A5:.5 D6:.5 A5:.5 F#5:1 D5:1 | "
            "G5:.5 F#5:.5 E5:.5 D5:.5 E5:1 B4:1 | C5:.5 D5:.5 E5:.5 A5:.5 G5:2 | "
            "A5:.5 G5:.5 F5:.5 C5:.5 A4:1 C5:1 | F#5:1 E5:.5 D5:.5 C5:1 A4:1 | "
            "B4:.5 D5:.5 G5:.5 B5:.5 A5:1 G5:1 | F5:1 D5:1 B4:1 G4:1")
    melB = ("E5:2 A4:1 C5:1 | F5:2 C5:2 | E5:1 G5:1 E5:1 C5:1 | D5:3 r:1 | "
            "C5:1 E5:1 A5:2 | A5:1 G5:1 F5:2 | F5:1 D5:1 A4:1 C5:1 | B4:2 D5:1 F5:1")
    P.melody('lead', GM['celesta'], melA, 'A', 0, pan=0.15, gain=0.9, vel_fn=swell(70, 8, 8), **BELL)
    P.melody('lead', GM['musicbox'], melA, 'A', 1, pan=0.2, gain=0.8, vel_fn=swell(68, 8, 8), **BELL)
    P.melody('lead', GM['clarinet'], melA, 'A', 1, shift=-12, pan=-0.15, gain=0.5, legato=0.8, vel=60, check=False, **WIND)
    P.melody('lead', GM['clarinet'], melB, 'B', pan=0.1, legato=1.03, vel_fn=swell(74, 10, 16), **WIND)
    P.melody('lead', GM['bassoon'], "A3:4 | A3:4 | G3:4 | G3:2 B3:2 | A3:4 | C4:4 | A3:4 | G3:4", 'B',
             pan=-0.2, gain=0.55, legato=1.03, vel=60, **WIND)
    P.melody('lead', GM['celesta'], melA, 'A', 2, pan=0.15, gain=0.9, vel_fn=swell(72, 8, 8), **BELL)
    P.melody('lead', GM['glock'], melA, 'A', 2, pan=0.3, gain=0.35, vel=56, check=False, **BELL)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.bass('low', GM['pizz'], name, k, lo='C2', pattern=[(0, 1, 0), (1, 1, 7), (2, 1, 12), (3, 1, 7)], vel=64, gain=0.7, **PLUCK)
        P.figure('keys', GM['harpsichord'], name, k, fig=(None, 1, 2, 3, None, 2, 3, 4), step=0.5, lo='E4',
                 ring=0.45, base_vel=44, gain=1.0, pan=-0.3, attack=0.002, release=0.15, decay=0.4, sustain=0.2)
        if not (name == 'intro'):
            P.perc('perc', name, {76: [0, 2], 77: [1, 3]}, k, vel=30, gain=0.25, pan=0.25)
    for name, k in [('B', 0), ('A', 2)]:
        P.pad('pad', GM['strings'], name, k, lo='G3', n=3, vel=46, gain=0.45)
    return P, dict(sends=dict(lead=0.35, low=0.2, keys=0.25, perc=0.25, pad=0.4),
                   eq=dict(lead=EQ['bright'], low=EQ['low'], keys=EQ['keys'], perc=EQ['perc'], pad=EQ['pad']),
                   rev_time=2.0, rev_mix=0.45)


# ================================================================ verdant faction
@piece
def g1_orc():
    """바위주먹 오크 — 초원의 모닥불, 늑대가 쉬는 밤. E minor 4/4, 76 BPM, low reeds + soft frame drum."""
    A = ['Em', 'D', 'Em', 'C', 'Em', 'D', 'C', 'D']
    B = ['C', 'G', 'D', 'Em', 'C', 'G', 'Am', 'B']
    P = Piece(76, 4, [('intro', ['Em', 'D/E', 'Em', 'D/E']), ('A', A), ('B', B), ('A', A), ('outro', ['Em', 'D', 'C', 'D'])])
    melA = ("E4:2 G4:1 A4:1 | F#4:2 D4:2 | E4:1 G4:1 B4:2 | C5:1.5 B4:.5 G4:2 | "
            "B4:2 A4:1 G4:1 | A4:1 F#4:1 D4:2 | E4:1 G4:1 C5:2 | A4:2 F#4:1 D4:1")
    melB = ("G4:2 C5:2 | B4:1.5 A4:.5 G4:2 | F#4:1 A4:1 D5:2 | B4:4 | "
            "E5:2 C5:1 G4:1 | D5:2 B4:2 | C5:1 E5:1 A4:2 | F#4:2 D#5:2")
    P.melody('lead', GM['ehorn'], melA, 'A', 0, pan=0.1, legato=1.04, vel_fn=swell(74, 10, 16), **WIND)
    P.melody('lead', GM['horn'], melB, 'B', pan=-0.1, legato=1.04, vel_fn=swell(78, 10, 16), **WIND)
    P.melody('lead', GM['ehorn'], melA, 'A', 1, pan=0.1, legato=1.04, vel_fn=swell(76, 10, 16), **WIND)
    P.melody('lead', GM['horn'], melA, 'A', 1, shift=-12, pan=-0.15, gain=0.55, legato=1.04, vel=64, check=False, **WIND)
    P.melody('lead', GM['panflute'], "r:2 B4:1 E5:1 | D5:4 | r:2 G4:1 B4:1 | A4:4", 'intro', check=False,
             pan=0.25, gain=0.6, vel=58, **WIND)
    for name, k in [('intro', 0), ('A', 0), ('B', 0), ('A', 1), ('outro', 0)]:
        P.add('low', [(P.at(name, k), midi('E2'), P._sec_len(name, k) * 4)], GM['cello'], vel=50, gain=0.4,
              attack=1.0, release=1.0)
        P.bass('low', GM['contrabass'], name, k, lo='E2', pattern=[(0, 2.5, 0), (2.5, 1.5, 7)], vel=60, gain=0.5, **SUSTAIN)
        P.figure('keys', GM['nylon'], name, k, fig=(0, 1, 2, 3, 2, 1, 2, 3), step=0.5, lo='E3', bass_lo='E2',
                 base_vel=48, gain=0.5, pan=0.3, **PLUCK)
        P.perc('perc', name, {41: [0, 2.5], 43: [1.5], 70: [1, 3]}, k, vel=38 if name != 'B' else 46, gain=0.45, pan=-0.05)
    P.pad('pad', GM['choir'], 'B', lo='E3', n=3, vel=46, gain=0.35)
    P.pad('pad', GM['choir'], 'A', 1, lo='E3', n=3, vel=40, gain=0.3)
    return P, dict(sends=dict(lead=0.35, low=0.25, keys=0.3, perc=0.25, pad=0.5),
                   eq=dict(lead=EQ['lead'], low=EQ['low'], keys=EQ['keys'], perc=chain_lp(2500), pad=EQ['pad']),
                   rev_time=2.6, rev_mix=0.5)


@piece
def g2_troll():
    """이끼 트롤 — 이끼 덮인 고목 숲, 천천히 자라는 것들. A dorian 3/4, 76 BPM, woody and calm."""
    A = ['Am', 'G', 'D', 'Am', 'F', 'C', 'D', 'Esus4 E']
    B = ['C', 'G', 'D', 'Am', 'F', 'C', 'D', 'E']
    P = Piece(76, 3, [('intro', ['Am', 'D/A', 'Am', 'D/A']), ('A', A), ('A', A), ('B', B), ('A', A),
                      ('outro', ['Am', 'D/A', 'Am', 'D/A'])])
    melA = "E5:2 C5:1 | D5:2 B4:1 | F#5:2 E5:1 | E5:3 | C5:2 A4:1 | G4:1 C5:1 E5:1 | D5:2 A4:1 | E5:1.5 G#4:1.5"
    melA2 = "E5:2 C5:1 | D5:2 B4:1 | F#5:2 E5:1 | E5:3 | A5:2 F5:1 | G5:1 E5:1 C5:1 | D5:1 F#5:1 A5:1 | E5:1.5 G#4:1.5"
    melB = "E4:2 G4:1 | D4:2 B3:1 | A3:1 D4:1 F#4:1 | E4:3 | A4:2 F4:1 | G4:2 E4:1 | F#4:2 A4:1 | G#4:3"
    P.melody('lead', GM['panflute'], melA, 'A', 0, pan=0.1, legato=1.04, vel_fn=swell(70, 10, 12), **WIND)
    P.melody('lead', GM['recorder'], melA2, 'A', 1, pan=0.15, legato=1.04, vel_fn=swell(72, 10, 12), **WIND)
    P.melody('lead', GM['cello'], melB, 'B', pan=-0.25, legato=1.05, vel_fn=swell(78, 10, 12), **SUSTAIN)
    P.melody('lead', GM['panflute'], "r:3 | r:3 | A5:3 | r:3 | r:3 | r:3 | A5:2 F#5:1 | E5:3", 'B', pan=0.25,
             gain=0.6, vel=58, **WIND)
    P.melody('lead', GM['panflute'], melA2, 'A', 2, pan=0.1, legato=1.04, vel_fn=swell(72, 10, 12), **WIND)
    P.melody('lead', GM['kalimba'], "E5:.5 A5:.5 C6:1 r:1 | F#5:.5 A5:.5 D6:1 r:1 | E5:.5 A5:.5 C6:1 r:1 | F#5:3",
             'intro', check=False, pan=0.3, gain=0.5, vel=56, **PLUCK)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.figure('keys', GM['harp'], name, k, fig=(0, 2, 3, 4, 3, 2), step=0.5, lo='A3', bass_lo='A2',
                 ring='span', base_vel=50, gain=0.5, pan=0.3, **PLUCK)
        P.pad('pad', GM['slowstr'], name, k, lo='A3', n=3, vel=42 + (6 if name == 'B' else 0), gain=0.35)
        P.bass('low', GM['contrabass'], name, k, lo='E2', vel=54, gain=0.45, **SUSTAIN)
    # forest birds, far away
    P.add('bird', [(P.at('intro') + 1, midi('C6'), 1.5), (P.at('A', 1) + 4, midi('D6'), 1.2),
                   (P.at('outro') + 2, midi('C6'), 1.5)], 123, vel=40, gain=2.0, pan=0.6, attack=0.05, release=0.3)
    return P, dict(sends=dict(lead=0.4, keys=0.35, pad=0.5, low=0.3, bird=0.7),
                   eq=dict(lead=EQ['lead'], keys=EQ['keys'], pad=EQ['pad'], low=EQ['low'], bird=EQ['bright']),
                   rev_time=3.2, rev_mix=0.6)


@piece
def g3_merfolk():
    """푸른비늘 인어 — 물빛이 일렁이는 산호 신전. E major 6/8 (eighth = 138), flowing harp and flute."""
    A = ['E', 'B/D#', 'C#m', 'A', 'E/G#', 'A', 'F#m7', 'B7sus4 B7']
    B = ['A', 'B', 'G#m', 'C#m', 'A', 'B', 'C#m', 'Bsus4 B']
    P = Piece(138, 6, [('intro', ['Emaj7', 'A/E']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['A', 'B'])])
    melA = ("B4:3 E5:2 F#5:1 | D#5:3 B4:3 | C#5:2 E5:1 G#5:3 | F#5:2 E5:1 C#5:3 | "
            "B4:3 G#4:2 B4:1 | C#5:3 E5:3 | F#5:2 E5:1 C#5:2 A4:1 | B4:3 D#5:2 F#5:1")
    melB = ("C#5:2 E5:1 A5:3 | F#5:3 D#5:3 | B4:2 D#5:1 G#5:3 | E5:6 | "
            "A5:2 G#5:1 E5:3 | F#5:2 E5:1 D#5:3 | E5:3 C#5:3 | B4:3 D#5:3")
    P.melody('lead', GM['flute'], melA, 'A', 0, pan=0.1, legato=1.04, vel_fn=swell(70, 10, 24), **WIND)
    P.melody('lead', GM['flute'], melA, 'A', 1, pan=0.1, legato=1.04, vel_fn=swell(72, 10, 24), **WIND)
    P.melody('lead', GM['vibes'], melA, 'A', 1, shift=-12, pan=-0.2, gain=0.5, vel=58, check=False, **BELL)
    P.melody('lead', GM['oohs'], melB, 'B', pan=0.05, gain=0.7, legato=1.05, vel_fn=swell(70, 10, 24), attack=0.15, release=0.6)
    P.melody('lead', GM['flute'], melB, 'B', pan=0.15, gain=0.7, legato=1.04, vel_fn=swell(72, 10, 24), check=False, **WIND)
    P.melody('lead', GM['cello'], "A3:6 | B3:6 | G#3:6 | C#4:6 | A3:6 | B3:6 | C#4:3 E4:3 | B3:3 D#4:3", 'B',
             pan=-0.25, gain=0.6, legato=1.04, vel=62, **SUSTAIN)
    P.melody('lead', GM['flute'], melA, 'A', 2, pan=0.1, legato=1.04, vel_fn=swell(74, 10, 24), **WIND)
    P.melody('bell', GM['crystal'], "G#5:2 B5:2 E6:2 | r:6", 'intro', check=False, gain=0.5, pan=0.4, vel=50, **BELL)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.figure('keys', GM['harp'], name, k, fig=(0, 2, 3, 4, 5, 4), step=1, lo='E3', bass_lo='E2',
                 ring='half', base_vel=52, gain=0.55, pan=0.3, **PLUCK)
        P.pad('pad', GM['warmpad'], name, k, lo='G#3', n=3, vel=44, gain=0.35)
        P.bass('low', GM['contrabass'], name, k, lo='E2', pattern=[(0, 6, 0)], vel=52, gain=0.4, **SUSTAIN)
    for name, k in [('A', 1), ('A', 2)]:
        P.figure('bell', GM['celesta'], name, k, fig=(None, None, None, 5, None, 6), step=1, lo='E5', ring=1.5,
                 base_vel=44, gain=0.35, pan=-0.35, **BELL)
    return P, dict(sends=dict(lead=0.45, keys=0.4, pad=0.55, low=0.3, bell=0.7),
                   eq=dict(lead=EQ['lead'], keys=EQ['keys'], pad=EQ['pad'], low=EQ['low'], bell=EQ['bright']),
                   rev_time=3.4, rev_mix=0.65)


# ================================================================ arcane faction
@piece
def a1_fiend():
    """심연 마족 — 촛불 아래의 계약, 우아하고 서늘한 왈츠. C minor 3/4, 88 BPM."""
    A = ['Cm', 'Fm', 'G7', 'Cm', 'Ab', 'Fm', 'Dm7b5 G7', 'Cm']
    B = ['Ab', 'Eb', 'Fm', 'Cm', 'Ab', 'Bb', 'Fm6', 'G7']
    P = Piece(88, 3, [('intro', ['Cm', 'Ab', 'Cm', 'G7']), ('A', A), ('A', A), ('B', B), ('A', A),
                      ('outro', ['Fm', 'Cm', 'Ab', 'G7'])])
    melA = "G4:2 Eb4:1 | Ab4:2 C5:1 | B4:2 D5:.5 F5:.5 | Eb5:3 | C5:2 Ab4:1 | F4:1 Ab4:1 C5:1 | D5:1.5 B4:1.5 | C5:3"
    melB = "Eb5:2 C5:1 | Bb4:2 G4:1 | Ab4:1 C5:1 F5:1 | Eb5:3 | C5:1 Eb5:1 Ab5:1 | F5:2 D5:1 | Ab5:1 F5:1 D5:1 | B4:3"
    P.melody('lead', GM['cello'], melA, 'A', 0, shift=-12, pan=-0.2, legato=1.05, vel_fn=swell(76, 10, 12), **SUSTAIN)
    P.melody('lead', GM['violin'], melA, 'A', 1, pan=0.2, legato=1.05, vel_fn=swell(74, 10, 12), **SUSTAIN)
    P.melody('lead', GM['celesta'], melA, 'A', 1, shift=12, pan=0.35, gain=0.35, vel=52, check=False, **BELL)
    P.melody('lead', GM['violin'], melB, 'B', pan=0.2, legato=1.05, vel_fn=swell(80, 10, 12), **SUSTAIN)
    P.melody('lead', GM['cello'], "C4:3 | G3:3 | F3:3 | G3:3 | Ab3:3 | Bb3:3 | D4:3 | D4:2 F4:1", 'B', pan=-0.2,
             gain=0.6, legato=1.04, vel=64, **SUSTAIN)
    P.melody('lead', GM['cello'], melA, 'A', 2, shift=-12, pan=-0.2, legato=1.05, vel_fn=swell(78, 10, 12), **SUSTAIN)
    P.melody('lead', GM['violin'], "Eb5:3 | F5:3 | D5:3 | G5:3 | Eb5:3 | C5:3 | D5:1.5 B4:1.5 | C5:3", 'A', 2,
             pan=0.2, gain=0.55, legato=1.04, vel=62, **SUSTAIN)
    P.melody('bell', GM['musicbox'], "G5:1 C6:1 Eb6:1 | Ab5:1 C6:1 Eb6:1 | G5:1 C6:1 Eb6:1 | B5:1 D6:1 F6:1",
             'intro', check=False, pan=0.3, gain=0.6, vel=50, **BELL)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.bass('low', GM['pizz'], name, k, lo='C2', pattern=[(0, 1, 0)], vel=66, gain=0.75, **PLUCK)
        P.stab('keys', GM['harpsichord'], name, [1.0, 2.0], k, lo='G3', n=3, dur=0.7, vel=44, gain=1.0, pan=0.25,
               attack=0.002, release=0.2, decay=0.6, sustain=0.2)
        P.pad('pad', GM['oohs'], name, k, lo='G3', n=3, vel=38 + (8 if name == 'B' else 0), gain=0.5)
    P.add('bell', [(P.at(n, k), midi('C4'), 3) for n, k in [('A', 0), ('B', 0), ('outro', 0)]], GM['bells'],
          vel=44, gain=0.45, pan=-0.3, **BELL)
    return P, dict(sends=dict(lead=0.4, low=0.25, keys=0.3, pad=0.55, bell=0.6),
                   eq=dict(lead=EQ['lead'], low=EQ['low'], keys=EQ['keys'], pad=EQ['pad'], bell=EQ['bright']),
                   rev_time=3.0, rev_mix=0.55)


@piece
def a2_seraph():
    """성광 천족 — 빛이 내려앉는 기사단의 회랑. D major 4/4, 70 BPM, hymn-like."""
    A = ['D', 'A/C#', 'Bm', 'G', 'D/F#', 'G', 'Em7 A', 'D']
    B = ['G', 'A', 'F#m', 'Bm', 'G', 'D/F#', 'Em', 'Asus4 A']
    P = Piece(70, 4, [('intro', ['D', 'G/D']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['G', 'Asus4 A'])])
    melA = ("F#4:2 A4:1 D5:1 | E5:2 C#5:2 | D5:1 B4:1 F#4:2 | G4:1.5 A4:.5 B4:2 | "
            "A4:2 F#4:1 A4:1 | D5:2 B4:1 G4:1 | G4:2 A4:1 C#5:1 | D5:4")
    melB = ("B4:2 D5:1 G5:1 | A5:2 E5:2 | F#5:1 E5:1 C#5:2 | D5:2 B4:2 | "
            "G5:2 D5:1 B4:1 | A5:2 F#5:2 | G5:1 E5:1 B4:2 | D5:2 C#5:2")
    P.melody('lead', GM['horn'], melA, 'A', 0, pan=-0.1, legato=1.04, vel_fn=swell(72, 10, 16), **WIND)
    P.melody('lead', GM['strings'], melA, 'A', 1, shift=12, pan=0.15, legato=1.04, vel_fn=swell(74, 10, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], "D4:4 | E4:2 A3:2 | B3:4 | D4:4 | D4:4 | G4:2 D4:2 | E4:2 E4:2 | F#4:4", 'A', 1,
             pan=-0.1, gain=0.6, legato=1.04, vel=62, **WIND)
    P.melody('lead', GM['strings'], melB, 'B', pan=0.15, legato=1.04, vel_fn=swell(80, 10, 16), **SUSTAIN)
    P.melody('lead', GM['horn'], melB, 'B', shift=-12, pan=-0.1, gain=0.55, legato=1.04, vel=66, check=False, **WIND)
    P.melody('lead', GM['trumpet'], melA, 'A', 2, pan=0.0, gain=0.6, legato=1.03, vel_fn=swell(64, 8, 16), **WIND)
    P.melody('lead', GM['strings'], melA, 'A', 2, shift=12, pan=0.15, gain=0.7, legato=1.04, vel=68, check=False, **SUSTAIN)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.figure('keys', GM['harp'], name, k, fig=(0, 1, 2, 3, 4, 3, 2, 1), step=0.5, lo='D3', bass_lo='D2',
                 base_vel=50, gain=0.45, pan=0.3, **PLUCK)
        P.pad('pad', GM['choir'], name, k, lo='F#3', n=3, vel=44 + (8 if name in ('B',) or k == 2 else 0), gain=0.3)
        P.pad('pad', GM['halo'], name, k, lo='A3', n=3, vel=40, gain=0.18)
        P.bass('low', GM['cello'], name, k, lo='D2', vel=56, gain=0.45, **SUSTAIN)
    P.add('bell', [(P.at(n, k) + 3, midi(p), 3) for (n, k, p) in [('intro', 0, 'A5'), ('A', 1, 'D6'), ('B', 0, 'F#6'), ('A', 2, 'A6')]],
          GM['glock'], vel=46, gain=0.5, pan=0.4, **BELL)
    return P, dict(sends=dict(lead=0.45, keys=0.4, pad=0.6, low=0.3, bell=0.7),
                   eq=dict(lead=EQ['lead'], keys=EQ['keys'], pad=EQ['pad'], low=EQ['low'], bell=EQ['bright']),
                   rev_time=3.8, rev_mix=0.65)


@piece
def a3_elf():
    """폭풍 하이엘프 — 바늘탑 꼭대기, 바람이 책장을 넘기는 곳. B dorian 6/8 (eighth = 144), airy."""
    A = ['Bm', 'A', 'G', 'D', 'Bm', 'E', 'Gmaj7', 'F#sus4 F#']
    B = ['D', 'A', 'E', 'Bm', 'G', 'D', 'Em', 'F#']
    P = Piece(144, 6, [('intro', ['Bm', 'E/B']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['G', 'F#'])])
    melA = ("F#5:3 D5:2 B4:1 | C#5:3 E5:3 | D5:2 B4:1 G4:3 | A4:6 | "
            "B4:2 C#5:1 D5:3 | E5:2 G#5:1 B5:3 | F#5:3 D5:3 | B4:3 A#4:3")
    melB = ("A5:3 F#5:2 D5:1 | E5:3 C#5:3 | B4:2 E5:1 G#5:3 | F#5:6 | "
            "G5:2 F#5:1 D5:3 | A5:2 F#5:1 D5:3 | E5:3 G5:2 E5:1 | C#5:3 A#4:3")
    P.melody('lead', GM['violin'], melA, 'A', 0, pan=0.2, legato=1.05, vel_fn=swell(72, 10, 24), **SUSTAIN)
    P.melody('lead', GM['flute'], melA, 'A', 1, pan=0.1, legato=1.04, vel_fn=swell(72, 10, 24), **WIND)
    P.melody('lead', GM['violin'], "D5:6 | E5:6 | B4:6 | F#4:6 | D5:6 | B4:6 | B4:6 | C#5:6", 'A', 1,
             pan=0.25, gain=0.5, legato=1.03, vel=58, **SUSTAIN)
    P.melody('lead', GM['flute'], melB, 'B', pan=0.1, legato=1.04, vel_fn=swell(78, 10, 24), **WIND)
    P.melody('lead', GM['violin'], melB, 'B', shift=-12, pan=0.25, gain=0.55, legato=1.04, vel=64, check=False, **SUSTAIN)
    P.melody('lead', GM['violin'], melA, 'A', 2, pan=0.2, legato=1.05, vel_fn=swell(76, 10, 24), **SUSTAIN)
    P.melody('lead', GM['piccolo'], melA, 'A', 2, shift=12, pan=-0.1, gain=0.3, legato=1.0, vel=50, check=False, **WIND)
    for name, k in [('intro', 0), ('A', 0), ('A', 1), ('B', 0), ('A', 2), ('outro', 0)]:
        P.figure('keys', GM['harp'], name, k, fig=(0, 2, 3, 4, 5, 4), step=1, lo='B2', bass_lo='B1',
                 ring='half', base_vel=52, gain=0.5, pan=-0.3, **PLUCK)
        P.pad('pad', GM['tremolo'], name, k, lo='F#3', n=3, vel=40 + (8 if name == 'B' else 0), gain=0.3)
        P.bass('low', GM['cello'], name, k, lo='B1', pattern=[(0, 3, 0), (3, 3, 7)], vel=54, gain=0.45, **SUSTAIN)
    # wind: a slow sweep pad that rises and falls under the intro and outro
    for name in ('intro', 'outro'):
        P.pad('wind', GM['sweep'], name, lo='B3', n=2, vel=48, gain=1.0, attack=2.0, release=2.0)
    return P, dict(sends=dict(lead=0.45, keys=0.4, pad=0.55, low=0.3, wind=0.7),
                   eq=dict(lead=EQ['lead'], keys=EQ['keys'], pad=EQ['pad'], low=EQ['low'], wind=EQ['pad']),
                   rev_time=3.2, rev_mix=0.6)


def chain_lp(f):
    from mix import lowpass, highpass, chain
    return chain(highpass(60), lowpass(f))


def build(name):
    P, rs = PIECES[name]()
    bad = P.harmony_report()
    secs = P.render(OUT + f'bgm_{name}.wav', **rs)
    print(f'{name}: {secs:.1f}s  bars={len(P.bars)}  clashes={bad}')


if __name__ == '__main__':
    for n in (sys.argv[1:] or PIECES):
        build(n)

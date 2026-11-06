"""ETHERION BGM v2 — lyrical orchestral: violin + cello + piano lead, string-section & horn harmony.
No mallets, plucks, bells or percussion. All melodies original.
Run: python3 lyric.py [name ...]"""
import itertools, sys
import numpy as np
from kit import Piece, GM, EQ, midi, parse, chain, lowpass, highpass
from mix import nearest

OUT = '/home/claude/bgm/out2/'

VLN = dict(attack=0.13, release=0.5, vibrato=15, vib_rate=5.4, vib_delay=0.28)
VC = dict(attack=0.15, release=0.6, vibrato=12, vib_rate=4.9, vib_delay=0.3)
PNO = dict(attack=0.004, release=0.9, decay=2.2, sustain=0.25)
SECT = dict(attack=0.55, release=1.3)
HORN = dict(attack=0.35, release=0.9, vibrato=4, vib_rate=4.5, vib_delay=0.5)
WW = dict(attack=0.2, release=0.6, vibrato=8, vib_rate=5.0, vib_delay=0.3)


# ---------------------------------------------------------------- arranging helpers
def timeline(P, name, k):
    return list(P.each_chord(name, k))


def pcs_of(ch):
    root, q, bpc = ch
    return [(root + iv) % 12 for iv in q]


def voice_lead(P, name, k, lo, hi, n, prev=None):
    """chord voicings of n notes in [lo, hi] chosen to move as little as possible"""
    out = []
    for (t0, span, ch) in timeline(P, name, k):
        root, q, bpc = ch
        pcs = pcs_of(ch)
        need = {pcs[1]} if len(pcs) > 1 else set()          # the third must be there
        if len(pcs) > 3:
            need.add(pcs[3])                                    # and the 7th / 6th
        cand = [m for m in range(midi(lo), midi(hi) + 1) if m % 12 in pcs]
        best, bc = None, 1e9
        for comb in itertools.combinations(cand, n):
            if any(b - a < 3 for a, b in zip(comb, comb[1:])) or comb[-1] - comb[0] > 19:
                continue
            got = {m % 12 for m in comb}
            if not need <= got or len(got) < min(n, 3, len(pcs)):
                continue
            c = sum(abs(a - b) for a, b in zip(comb, prev)) if prev else abs(np.mean(comb) - (midi(lo) + midi(hi)) / 2)
            if c < bc:
                best, bc = comb, c
        if best is None:   # fall back: nearest close voicing without the 'must contain' rule
            best = tuple(sorted(cand, key=lambda m: abs(m - (midi(lo) + midi(hi)) / 2))[:n])
            best = tuple(sorted(best))
        prev = best
        out.append((t0, span, best))
    return out, prev


def pad(P, bus, prog, name, k, lo, hi, n=4, vel=48, gain=1.0, pan=0.0, kw=SECT, prev=None, cresc=0):
    vs, last = voice_lead(P, name, k, lo, hi, n, prev)
    notes = []
    for (t0, span, comb) in vs:
        notes += [(t0, p, span) for p in comb]
    t_start = P.at(name, k)
    L = P._sec_len(name, k) * P.meter
    vf = (lambda t, p, d: vel + cresc * (t - t_start) / L)
    P.add(bus, notes, prog, vel_fn=vf, gain=gain, pan=pan, legato=1.03, human=0.0, **kw)
    return last


def counter(P, bus, prog, name, k, lo, hi, vel=60, gain=1.0, pan=0.0, kw=VC, against=(), start=None, split=True):
    """lyrical guide-tone line: 3rds/7ths, smallest step, never a 2nd away from the melody notes sounding"""
    mel = [n for (_, ns) in P.melodies for n in ns] if not against else list(against)
    prev = midi(start) if start else (midi(lo) + midi(hi)) // 2
    notes = []
    for (t0, span, ch) in timeline(P, name, k):
        pcs = pcs_of(ch)
        pref = {pcs[1]: 0, (pcs[3] if len(pcs) > 3 else pcs[0]): 1, pcs[0]: 2}
        parts = [(t0, span)]
        if split and span >= 4 and P.meter == 4:
            parts = [(t0, span / 2), (t0 + span / 2, span / 2)]
        elif split and span >= 6 and P.meter == 6:
            parts = [(t0, 3), (t0 + 3, 3)]
        for (ts, d) in parts:
            sounding = [p for (t, p, dd) in mel if t < ts + d and t + dd > ts]
            best, bc = None, 1e9
            for m in range(midi(lo), midi(hi) + 1):
                if m % 12 not in pcs:
                    continue
                if any(((m - s) % 12) in (1, 11) or m == s for s in sounding):
                    continue
                c = abs(m - prev) + pref.get(m % 12, 3) * 1.5 + (6 if m == prev and notes and notes[-1][2] >= 4 else 0)
                if c < bc:
                    best, bc = m, c
            if best is None:
                continue
            if notes and notes[-1][1] == best and abs(notes[-1][0] + notes[-1][2] - ts) < 1e-6:
                t, p, dd = notes[-1]; notes[-1] = (t, p, dd + d)   # tie repeated notes
            else:
                notes.append((ts, best, d))
            prev = best
    t_start = P.at(name, k)
    L = P._sec_len(name, k) * P.meter
    vf = lambda t, p, d: vel + 10 * np.sin(np.pi * ((t - t_start) % 8) / 8) * 0.6
    P.add(bus, notes, prog, vel_fn=vf, gain=gain, pan=pan, legato=1.04, **kw)
    return notes


def piano(P, name, k, vel=46, lo='A3', bass_lo='D2', gain=1.45, pan=-0.15, fig=None, step=None):
    m = P.meter
    if fig is None:
        fig = {4: (0, 2, 3, 4, 5, 4, 3, 2), 3: (0, 2, 3, 4, 3, 2), 6: (0, 2, 3, 4, 3, 2)}[m]
    if step is None:
        step = {4: 0.5, 3: 0.5, 6: 1.0}[m]
    P.figure('pno', GM['piano'], name, k, fig=fig, step=step, lo=lo, bass_lo=bass_lo, ring='half',
             base_vel=vel, vel_accent=(8, 3), gain=gain, pan=pan, human=0.01, **PNO)


def bassline(P, name, k, lo='D2', vel=56, gain=0.55):
    P.bass('low', GM['contrabass'], name, k, lo=lo, vel=vel, gain=gain, legato=1.02, **VC)


def swell(base, lift=12, span=8, ref=72):
    return lambda t, p, d: base + lift * np.sin(np.pi * ((t % span) / span)) + (p - ref) * 0.4


def lead(P, prog, text, name, k, shift=0, vel=74, lift=12, span=None, pan=0.0, gain=1.0, kw=None, check=True):
    span = span or 2 * P.meter
    kw = kw or (VLN if prog == GM['violin'] else VC if prog == GM['cello'] else WW)
    return P.melody('lead', prog, text, name, k, shift=shift, pan=pan, gain=gain, legato=1.08,
                    vel_fn=swell(vel, lift, span), check=check, **kw)


SENDS = dict(lead=0.42, pno=0.3, str=0.55, brass=0.55, low=0.3, ww=0.5, cnt=0.42)
EQS = dict(lead=chain(highpass(160), lowpass(7000)), pno=chain(highpass(50), lowpass(6500)),
           str=chain(highpass(120), lowpass(5000)), brass=chain(highpass(90), lowpass(3500)),
           low=chain(highpass(35), lowpass(2500)), ww=chain(highpass(250), lowpass(6000)),
           cnt=chain(highpass(70), lowpass(5500)))


def arrange(P, melA, melB, *, low='D2', pno_lo='A3', color=None, A_lead_cello_first=False, vel=74,
            str_rng=('D3', 'A4'), horn_rng=('F3', 'D4'), cello_rng=('C3', 'A4'), vln_rng=('D5', 'A5'),
            intro='intro', outro='outro'):
    """Standard lyrical form: intro (piano) | A violin | A cello + violin counter | B tutti | A tutti | outro (piano + strings)."""
    first, second = (GM['cello'], GM['violin']) if A_lead_cello_first else (GM['violin'], GM['cello'])
    # intro: piano alone, strings enter softly in its second half
    piano(P, intro, 0, vel=50, lo=pno_lo, bass_lo=low)
    bassline(P, intro, 0, lo=low, vel=48, gain=0.4)
    # A1: first lead + piano + soft strings
    lead(P, first, melA, 'A', 0, shift=-12 if first == GM['cello'] else 0, vel=vel, pan=-0.2 if first == GM['cello'] else 0.2)
    piano(P, 'A', 0, vel=46, lo=pno_lo, bass_lo=low)
    pv = pad(P, 'str', GM['slowstr'], 'A', 0, *str_rng, n=4, vel=40, gain=0.5)
    bassline(P, 'A', 0, lo=low, vel=52, gain=0.45)
    # A2: second lead sings the tune; the first answers with a counter-line
    lead(P, second, melA, 'A', 1, shift=-12 if second == GM['cello'] else 0, vel=vel + 2, pan=-0.2 if second == GM['cello'] else 0.2)
    if second == GM['cello']:
        counter(P, 'cnt', GM['violin'], 'A', 1, *vln_rng, vel=58, gain=0.6, pan=0.25, kw=VLN)
    else:
        counter(P, 'cnt', GM['cello'], 'A', 1, *cello_rng, vel=60, gain=0.7, pan=-0.25, kw=VC)
    piano(P, 'A', 1, vel=46, lo=pno_lo, bass_lo=low)
    pv = pad(P, 'str', GM['slowstr'], 'A', 1, *str_rng, n=4, vel=44, gain=0.55, prev=pv)
    bassline(P, 'A', 1, lo=low, vel=54, gain=0.5)
    # B: tutti — violin high, cello counter, strings + horns, colour woodwind holds
    lead(P, GM['violin'], melB, 'B', 0, vel=vel + 6, lift=14, pan=0.2)
    counter(P, 'cnt', GM['cello'], 'B', 0, *cello_rng, vel=66, gain=0.75, pan=-0.25, kw=VC)
    piano(P, 'B', 0, vel=50, lo=pno_lo, bass_lo=low)
    pv = pad(P, 'str', GM['strings'], 'B', 0, *str_rng, n=4, vel=52, gain=0.6, prev=pv, cresc=8)
    pad(P, 'str', GM['slowstr'], 'B', 0, *str_rng, n=4, vel=46, gain=0.4, prev=pv)
    pad(P, 'brass', GM['horn'], 'B', 0, *horn_rng, n=2, vel=50, gain=0.45, kw=HORN, cresc=6)
    if color:
        counter(P, 'ww', GM[color], 'B', 0, 'F5', 'D6', vel=50, gain=0.6, pan=0.35, kw=WW, split=False)
    bassline(P, 'B', 0, lo=low, vel=60, gain=0.6)
    # A3: violin tune + cello counter, full strings, horns low
    lead(P, GM['violin'], melA, 'A', 2, vel=vel + 4, pan=0.2)
    counter(P, 'cnt', GM['cello'], 'A', 2, *cello_rng, vel=64, gain=0.75, pan=-0.25, kw=VC)
    piano(P, 'A', 2, vel=48, lo=pno_lo, bass_lo=low)
    pv = pad(P, 'str', GM['strings'], 'A', 2, *str_rng, n=4, vel=48, gain=0.55, prev=pv, cresc=-6)
    pad(P, 'brass', GM['horn'], 'A', 2, *horn_rng, n=2, vel=44, gain=0.35, kw=HORN)
    bassline(P, 'A', 2, lo=low, vel=58, gain=0.55)
    # outro: piano + strings settle, leads rest (loops back into the piano intro)
    piano(P, outro, 0, vel=48, lo=pno_lo, bass_lo=low)
    pad(P, 'str', GM['slowstr'], outro, 0, *str_rng, n=4, vel=40, gain=0.5, prev=pv, cresc=-8)
    bassline(P, outro, 0, lo=low, vel=48, gain=0.45)


def finish(P, name, rev=3.2, mix=0.6):
    bad = P.harmony_report()
    secs = P.render(OUT + f'{name}.wav', sends=SENDS, eq=EQS, rev_time=rev, rev_mix=mix)
    print(f'{name}: {secs:.1f}s bars={len(P.bars)} clashes={bad}')


PIECES = {}


def piece(fn):
    PIECES[fn.__name__] = fn
    return fn


# ================================================================ title (~52 s)
@piece
def title():
    """에테르가 흐르는 땅 — D minor 4/4, 64 BPM. piano opens, violin sings, orchestra swells, loops."""
    A = ['Dm', 'Bb', 'Gm', 'A']
    P = Piece(64, 4, [('intro', ['Dm', 'Bbmaj7']), ('A', A), ('B', ['Bb', 'C', 'F/A', 'Gm7 A']), ('A', A)])
    melA = "A4:3 D5:1 | F5:2 G5:1 F5:1 | D5:1.5 C5:.5 Bb4:2 | A4:4"
    melB = "D5:3 F5:1 | E5:2 G5:2 | C5:2 A4:1 C5:1 | Bb4:2 C#5:2"
    piano(P, 'intro', 0, vel=50, lo='A3')
    bassline(P, 'intro', 0, vel=46, gain=0.4)
    lead(P, GM['violin'], melA, 'A', 0, vel=72, pan=0.2, span=16)
    counter(P, 'cnt', GM['cello'], 'A', 0, 'C3', 'A4', vel=58, gain=0.65, pan=-0.25)
    piano(P, 'A', 0, vel=46)
    pv = pad(P, 'str', GM['slowstr'], 'A', 0, 'D3', 'A4', vel=40, gain=0.5, cresc=6)
    bassline(P, 'A', 0, vel=52, gain=0.5)
    lead(P, GM['violin'], melB, 'B', 0, vel=80, pan=0.2, span=16)
    counter(P, 'cnt', GM['cello'], 'B', 0, 'C3', 'A4', vel=64, gain=0.75, pan=-0.25)
    piano(P, 'B', 0, vel=50)
    pv = pad(P, 'str', GM['strings'], 'B', 0, 'D3', 'A4', vel=50, gain=0.6, prev=pv, cresc=10)
    pad(P, 'brass', GM['horn'], 'B', 0, 'F3', 'D4', n=2, vel=50, gain=0.45, kw=HORN, cresc=8)
    bassline(P, 'B', 0, vel=60, gain=0.6)
    lead(P, GM['violin'], melA, 'A', 1, shift=12, vel=74, pan=0.2, span=16)
    lead(P, GM['cello'], melA, 'A', 1, shift=-12, vel=66, pan=-0.25, gain=0.7, check=False)
    piano(P, 'A', 1, vel=48)
    pad(P, 'str', GM['strings'], 'A', 1, 'D3', 'A4', vel=50, gain=0.55, prev=pv, cresc=-10)
    pad(P, 'brass', GM['horn'], 'A', 1, 'F3', 'D4', n=2, vel=46, gain=0.35, kw=HORN, cresc=-8)
    bassline(P, 'A', 1, vel=56, gain=0.55)
    return P


# ================================================================ brass faction
@piece
def flag_B1():
    """잿불 고블린 — 잿불의 온기. G major 3/4, 84 BPM, a warm hearth waltz."""
    A = ['G', 'Em', 'C', 'D', 'Bm', 'Em', 'Am', 'D7']
    B = ['C', 'D', 'Bm', 'Em', 'Am', 'Bm', 'C', 'D']
    P = Piece(84, 3, [('intro', ['G', 'C', 'G', 'D']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['C', 'D', 'C', 'D'])])
    melA = "D5:2 B4:1 | E5:2 G5:1 | G5:1.5 F#5:.5 E5:1 | D5:3 | D5:2 F#5:1 | G5:2 E5:1 | C5:1 E5:1 A5:1 | F#5:3"
    melB = "E5:2 G5:1 | F#5:2 A5:1 | B5:2 F#5:1 | G5:3 | E5:2 C5:1 | D5:2 F#5:1 | E5:1.5 D5:.5 C5:1 | A4:3"
    arrange(P, melA, melB, low='D2', pno_lo='G3', color='clarinet', str_rng=('D3', 'B4'))
    return P


@piece
def flag_B2():
    """무쇠수염 드워프 — 모루 아래의 노래. D minor 4/4, 70 BPM, cello first, horns in the hall."""
    A = ['Dm', 'C', 'Bb', 'A', 'Dm', 'F', 'Gm', 'A']
    B = ['F', 'C', 'Dm', 'Bb', 'Gm', 'F', 'Gm', 'A7sus4 A7']
    P = Piece(70, 4, [('intro', ['Dm', 'C']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['Bb', 'A'])])
    melA = "A4:3 F4:1 | G4:2 E4:2 | F4:1 D4:1 Bb4:2 | A4:4 | F5:2 D5:1 A4:1 | C5:2 A4:1 C5:1 | Bb4:1.5 A4:.5 G4:2 | A4:2 C#5:2"
    melB = "C5:2 F5:1 A5:1 | G5:3 E5:1 | F5:3 A5:1 | Bb5:2 F5:2 | G5:2 D5:1 Bb4:1 | C5:2 A4:1 F5:1 | D5:2 Bb4:2 | D5:2 C#5:2"
    arrange(P, melA, melB, low='D2', pno_lo='A3', color='bassoon', A_lead_cello_first=True,
            horn_rng=('D3', 'A3'))
    return P


@piece
def flag_B3():
    """번개 노움 — 별을 재는 밤. C major (lydian touch) 4/4, 80 BPM, wonder and quiet curiosity."""
    A = ['C', 'D/C', 'Em', 'Am', 'F', 'Dm7', 'Gsus4 G', 'C']
    B = ['Am', 'F', 'C', 'G', 'Am', 'F', 'Dm7', 'Gsus4 G']
    P = Piece(80, 4, [('intro', ['Cmaj7', 'Fmaj7']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['Fmaj7', 'Gsus4 G'])])
    melA = "G4:2 C5:1 E5:1 | F#5:2 D5:2 | G5:1.5 F#5:.5 E5:2 | E5:2 C5:2 | A5:2 G5:1 F5:1 | F5:2 C5:1 D5:1 | C5:2 B4:2 | C5:4"
    melB = "E5:2 A5:2 | A5:1.5 G5:.5 F5:2 | E5:2 G5:2 | D5:4 | C5:1 E5:1 A5:2 | A5:2 F5:1 C5:1 | D5:2 F5:2 | G5:2 F5:1 D5:1"
    arrange(P, melA, melB, low='C2', pno_lo='G3', color='flute')
    return P


# ================================================================ verdant faction
@piece
def flag_G1():
    """바위주먹 오크 — 초원의 불씨. E minor 4/4, 70 BPM, wide and open, a long breath over the steppe."""
    A = ['Em', 'C', 'G', 'D', 'Em', 'C', 'Am', 'B7']
    B = ['C', 'G', 'D', 'Em', 'C', 'G', 'Am', 'Bsus4 B']
    P = Piece(70, 4, [('intro', ['Em', 'Cmaj7']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['Am', 'B7'])])
    melA = "B4:3 E5:1 | G5:2 E5:2 | D5:1.5 C5:.5 B4:2 | A4:4 | B4:2 E5:1 G5:1 | E5:2 C5:2 | C5:1 E5:1 A5:2 | F#5:2 D#5:2"
    melB = "E5:2 G5:1 E5:1 | D5:3 B4:1 | A4:2 D5:1 F#5:1 | G5:4 | E5:2 C5:1 E5:1 | D5:2 G5:2 | A5:2 E5:1 C5:1 | E5:2 D#5:2"
    arrange(P, melA, melB, low='E2', pno_lo='G3', color='ehorn', A_lead_cello_first=True, horn_rng=('E3', 'B3'))
    return P


@piece
def flag_G2():
    """이끼 트롤 — 이끼 숲의 오래된 숨. A dorian 3/4, 72 BPM, pastoral and slow-growing."""
    A = ['Am', 'G', 'D', 'Am', 'F', 'C', 'D', 'E']
    B = ['C', 'G', 'D', 'Am', 'F', 'C', 'D', 'E']
    P = Piece(72, 3, [('intro', ['Am', 'D/A', 'Am', 'D/A']), ('A', A), ('A', A), ('B', B), ('A', A),
                      ('outro', ['Am', 'D/A', 'Am', 'E'])])
    melA = "E5:2 C5:1 | D5:2 B4:1 | A4:1 D5:1 F#5:1 | E5:3 | A5:2 F5:1 | G5:2 E5:1 | F#5:2 D5:1 | G#4:1 B4:2"
    melB = "G5:2 E5:1 | D5:2 G5:1 | F#5:2 A5:1 | A5:2 E5:1 | F5:2 A5:1 | G5:2 E5:1 | F#5:1 A5:1 D6:1 | B5:2 G#5:1"
    arrange(P, melA, melB, low='E2', pno_lo='A3', color='oboe')
    return P


@piece
def flag_G3():
    """푸른비늘 인어 — 물빛 신전. E major 6/8 (eighth = 126), flowing like water."""
    A = ['E', 'B/D#', 'C#m', 'A', 'E/G#', 'A', 'F#m7', 'B7sus4 B7']
    B = ['A', 'B', 'G#m', 'C#m', 'A', 'B', 'C#m', 'Bsus4 B']
    P = Piece(126, 6, [('intro', ['Emaj7', 'A/E']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['A', 'B'])])
    melA = ("B4:3 E5:2 F#5:1 | D#5:3 B4:3 | C#5:2 E5:1 G#5:3 | F#5:2 E5:1 C#5:3 | "
            "B4:3 G#4:2 B4:1 | C#5:3 E5:3 | F#5:2 E5:1 C#5:2 A4:1 | B4:3 D#5:2 F#5:1")
    melB = ("C#5:2 E5:1 A5:3 | F#5:3 D#5:3 | B4:2 D#5:1 G#5:3 | E5:6 | "
            "A5:2 G#5:1 E5:3 | F#5:2 E5:1 D#5:3 | E5:3 C#5:3 | B4:3 D#5:3")
    arrange(P, melA, melB, low='E2', pno_lo='G#3', color='flute', horn_rng=('E3', 'C#4'))
    return P


# ================================================================ arcane faction
@piece
def flag_A1():
    """심연 마족 — 촛불 아래의 서약. C minor 3/4, 80 BPM, a slow melancholy waltz."""
    A = ['Cm', 'Fm', 'G7', 'Cm', 'Ab', 'Fm', 'Dm7b5 G7', 'Cm']
    B = ['Ab', 'Eb', 'Fm', 'Cm', 'Ab', 'Bb', 'Fm6', 'G7']
    P = Piece(80, 3, [('intro', ['Cm', 'Ab', 'Fm', 'G7']), ('A', A), ('A', A), ('B', B), ('A', A),
                      ('outro', ['Fm', 'Cm', 'Ab', 'G7'])])
    melA = "G4:2 Eb4:1 | Ab4:2 C5:1 | B4:2 D5:.5 F5:.5 | Eb5:3 | C5:2 Ab4:1 | F4:1 Ab4:1 C5:1 | D5:1.5 B4:1.5 | C5:3"
    melB = "Eb5:2 C5:1 | Bb4:2 G4:1 | Ab4:1 C5:1 F5:1 | Eb5:3 | C5:1 Eb5:1 Ab5:1 | F5:2 D5:1 | Ab5:1 F5:1 D5:1 | B4:3"
    arrange(P, melA, melB, low='C2', pno_lo='G3', color='clarinet', A_lead_cello_first=True,
            str_rng=('C3', 'G4'), horn_rng=('C3', 'G3'))
    return P


@piece
def flag_A2():
    """성광 천족 — 빛의 회랑. D major 4/4, 64 BPM, a quiet chorale of strings and horns."""
    A = ['D', 'A/C#', 'Bm', 'G', 'D/F#', 'G', 'Em7 A', 'D']
    B = ['G', 'A', 'F#m', 'Bm', 'G', 'D/F#', 'Em', 'Asus4 A']
    P = Piece(64, 4, [('intro', ['D', 'G/D']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['G', 'Asus4 A'])])
    melA = "F#4:2 A4:1 D5:1 | E5:2 C#5:2 | D5:1 B4:1 F#4:2 | G4:1.5 A4:.5 B4:2 | A4:2 F#4:1 A4:1 | D5:2 B4:1 G4:1 | G4:2 A4:1 C#5:1 | D5:4"
    melB = "B4:2 D5:1 G5:1 | A5:2 E5:2 | F#5:1 E5:1 C#5:2 | D5:2 B4:2 | G5:2 D5:1 B4:1 | A5:2 F#5:2 | G5:1 E5:1 B4:2 | D5:2 C#5:2"
    arrange(P, melA, melB, low='D2', pno_lo='A3', color='flute', vel=72)
    return P


@piece
def flag_A3():
    """폭풍 하이엘프 — 바람의 서고. B minor 6/8 (eighth = 132), sweeping and airy."""
    A = ['Bm', 'A', 'G', 'D', 'Bm', 'E', 'Gmaj7', 'F#sus4 F#']
    B = ['D', 'A', 'E', 'Bm', 'G', 'D', 'Em', 'F#']
    P = Piece(132, 6, [('intro', ['Bm', 'E/B']), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', ['G', 'F#'])])
    melA = ("F#5:3 D5:2 B4:1 | C#5:3 E5:3 | D5:2 B4:1 G4:3 | A4:6 | "
            "B4:2 C#5:1 D5:3 | E5:2 G#5:1 B5:3 | F#5:3 D5:3 | B4:3 A#4:3")
    melB = ("A5:3 F#5:2 D5:1 | E5:3 C#5:3 | B4:2 E5:1 G#5:3 | F#5:6 | "
            "G5:2 F#5:1 D5:3 | A5:2 F#5:1 D5:3 | E5:3 G5:2 E5:1 | C#5:3 A#4:3")
    arrange(P, melA, melB, low='B1', pno_lo='F#3', color='flute', str_rng=('D3', 'B4'), horn_rng=('D3', 'B3'))
    return P


if __name__ == '__main__':
    import os
    os.makedirs(OUT, exist_ok=True)
    for n in (sys.argv[1:] or PIECES):
        finish(PIECES[n](), n)

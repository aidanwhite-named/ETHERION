"""ETHERION BGM v3 — grand orchestral. Same melodies/harmony as lyric.py (v2), re-orchestrated with stacked chords:
melody harmonised in 3rds/6ths, divided strings (5-6 voices), horn/trombone/tuba choir, wordless choir pad,
soft timpani, harp arpeggios, piano, and music box / celesta / harpsichord colour.
Run: python3 grand.py [name ...]"""
import sys, os
import numpy as np
import lyric
from lyric import (pad, counter, piano, bassline, swell, voice_lead, pcs_of, VLN, VC, PNO, SECT, HORN, WW)
from kit import Piece, GM, midi, parse, chain, lowpass, highpass

OUT = '/home/claude/bgm/out3/'
BELL = dict(attack=0.002, release=1.6, decay=2.2, sustain=0.08)
HARP = dict(attack=0.002, release=1.0, decay=1.8, sustain=0.15)
HPSI = dict(attack=0.002, release=0.25, decay=0.7, sustain=0.2)
CHOIR = dict(attack=0.7, release=1.4)
BRASS = dict(attack=0.3, release=0.9, vibrato=3, vib_rate=4.5, vib_delay=0.5)

# per piece colour: bell instrument for sparkles, harpsichord on/off
EXTRA = dict(title=dict(bell='celesta'), flag_B1=dict(bell='musicbox'), flag_B2=dict(bell='celesta'),
             flag_B3=dict(bell='celesta', hpsi=True), flag_G1=dict(bell='musicbox'), flag_G2=dict(bell='musicbox'),
             flag_G3=dict(bell='celesta'), flag_A1=dict(bell='musicbox', hpsi=True), flag_A2=dict(bell='celesta'),
             flag_A3=dict(bell='celesta'))
CUR = {'name': None}


# ---------------------------------------------------------------- new helpers
def chord_at(P, t):
    bar = min(int(t // P.meter), len(P.bars) - 1)
    for (t0, span, ch) in P.chords_at(bar):
        if t0 - 1e-6 <= t < t0 + span:
            return ch
    return P.chords_at(bar)[-1][2]


def harmonize(P, notes, min_dur=None, lo='F3'):
    """a second voice a 3rd/6th (or 4th/5th) below each melody note, using only chord tones; passing notes hold"""
    min_dur = min_dur if min_dur is not None else (1.0 if P.meter == 6 else 0.5)
    out, prev = [], None
    for (t, p, d) in notes:
        if d < min_dur - 1e-6:
            if prev is not None and out and abs(out[-1][0] + out[-1][2] - t) < 1e-6 and (p - prev) % 12 in (3, 4, 5, 7, 8, 9):
                tt, pp, dd = out[-1]; out[-1] = (tt, pp, dd + d)
            continue
        root, q, bpc = chord_at(P, t)
        pcs = set(pcs_of((root, q, bpc))) | {bpc}
        best = None
        for iv in (3, 4, 8, 9, 5, 7):
            m = p - iv
            if m % 12 in pcs and m >= midi(lo):
                best = m; break
        if best is None:
            continue
        out.append((t, best, d)); prev = best
    return out


def wide_voice(P, name, k, lo, hi, n, prev=None):
    """like voice_lead but allows wide (orchestral) spacing for 5-6 voices"""
    import itertools
    out = []
    for (t0, span, ch) in P.each_chord(name, k):
        pcs = pcs_of(ch)
        need = {pcs[1]} | ({pcs[3]} if len(pcs) > 3 else set())
        cand = [m for m in range(midi(lo), midi(hi) + 1) if m % 12 in pcs]
        best, bc = None, 1e9
        for comb in itertools.combinations(cand, n):
            gaps = [b - a for a, b in zip(comb, comb[1:])]
            if min(gaps) < 3 or max(gaps) > 9 or gaps[0] < 5 and comb[0] < midi('C3'):
                continue
            got = {m % 12 for m in comb}
            if not need <= got or len(got) < min(3, len(pcs)):
                continue
            c = sum(abs(a - b) for a, b in zip(comb, prev)) if prev else abs(np.mean(comb) - (midi(lo) + midi(hi)) / 2)
            if c < bc:
                best, bc = comb, c
        if best is None:
            best, _ = voice_lead(P, name, k, lo, hi, min(n, 4), prev)
            best = [b for (tt, s, b) in best if tt == t0][0]
        prev = best
        out.append((t0, span, best))
    return out, prev


def big_pad(P, bus, prog, name, k, lo, hi, n=6, vel=56, gain=1.0, pan=0.0, kw=SECT, prev=None, cresc=0):
    vs, last = wide_voice(P, name, k, lo, hi, n, prev)
    notes = [(t0, p, span) for (t0, span, comb) in vs for p in comb]
    t_start, L = P.at(name, k), P._sec_len(name, k) * P.meter
    P.add(bus, notes, prog, vel_fn=lambda t, p, d: vel + cresc * (t - t_start) / L, gain=gain, pan=pan,
          legato=1.03, human=0.0, **kw)
    return last


def roots(P, name, k, prog, lo, bus='low', vel=60, gain=1.0, kw=VC, octave=False):
    notes = []
    for (t0, span, (root, q, bpc)) in P.each_chord(name, k):
        b = lyric.nearest(bpc, midi(lo))
        notes.append((t0, b, span))
        if octave:
            notes.append((t0, b + 12, span))
    P.add(bus, notes, prog, vel=vel, gain=gain, legato=1.02, **kw)


def harp(P, name, k, lo='C3', vel=50, gain=1.0, dense=False, pan=-0.35):
    m = P.meter
    if m == 4:
        fig, step = ((1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1), 0.25) if dense else ((1, 2, 3, 4, 5, 4, 3, 2), 0.5)
    elif m == 3:
        fig, step = ((1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2), 0.25) if dense else ((1, 2, 3, 4, 3, 2), 0.5)
    else:
        fig, step = ((1, 2, 3, 4, 5, 6), 1.0) if not dense else ((1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4), 0.5)
    P.figure('harp', GM['harp'], name, k, fig=fig, step=step, lo=lo, ring=1.6, base_vel=vel, vel_accent=(6, 2),
             gain=gain, pan=pan, human=0.004, **HARP)


def sparkle(P, name, k, prog, bars=None, lo='C6', vel=48, gain=1.0, pan=0.4):
    """a soft descending arpeggio of chord tones in the last beat(s) of chosen bars (music box / celesta)"""
    b0, n = P.sec[name][k], P._sec_len(name, k)
    bars = bars if bars is not None else range(n)
    notes = []
    for i in bars:
        bar = b0 + i
        (t0, span, (root, q, bpc)) = P.chords_at(bar)[-1]
        tones = sorted({lyric.nearest((root + iv) % 12, midi(lo)) for iv in q[:3]}, reverse=True)
        step = 0.5 if P.meter != 6 else 1.0
        start = bar * P.meter + P.meter - step * len(tones)
        for j, p in enumerate(tones):
            notes.append((start + j * step, p, 2.0))
    P.add('bell', notes, GM[prog], vel=vel, gain=gain, pan=pan, human=0.006, **BELL)


def hpsi(P, name, k, vel=46, gain=1.0):
    offs = {4: [1.0, 3.0], 3: [1.0, 2.0], 6: [2.0, 5.0]}[P.meter]
    P.stab('hpsi', GM['harpsichord'], name, offs, k, lo='G3', n=3, dur=0.6, vel=vel, gain=gain, pan=0.3, **HPSI)


def timpani(P, name, k, bars=(0, 4), vel=60, roll_end=False, gain=1.0):
    notes = []
    b0 = P.sec[name][k]
    for i in bars:
        (t0, span, (root, q, bpc)) = P.chords_at(b0 + i)[0]
        notes.append((t0, lyric.nearest(root, midi('F2')), 1.5))
    P.add('perc', notes, GM['timpani'], vel=vel, gain=gain, attack=0.002, release=1.6, decay=1.2, sustain=0.15)
    if roll_end:   # soft swelling roll into the next section
        last = b0 + P._sec_len(name, k) - 1
        (t0, span, (root, q, bpc)) = P.chords_at(last)[-1]
        p = lyric.nearest(root, midi('F2'))
        end = (last + 1) * P.meter
        n = 12
        roll = [(end - P.meter * 0.5 + i * (P.meter * 0.5 / n), p, 0.3) for i in range(n)]
        P.add('perc', roll, GM['timpani'], vel_fn=lambda t, pp, d: 30 + 40 * (1 - (end - t) / (P.meter * 0.5)),
              gain=gain * 0.8, human=0.0, attack=0.002, release=0.4, decay=0.3, sustain=0.2)


def lead2(P, prog, text, name, k, shift=0, vel=74, lift=12, pan=0.2, gain=1.0, kw=None, check=True):
    return lyric.lead(P, prog, text, name, k, shift=shift, vel=vel, lift=lift, pan=pan, gain=gain, kw=kw, check=check)


# ---------------------------------------------------------------- the grand arrangement
def grand_arrange(P, melA, melB, *, low='D2', pno_lo='A3', color=None, A_lead_cello_first=False, vel=74,
                  str_rng=('D3', 'A4'), horn_rng=('F3', 'D4'), cello_rng=('C3', 'A4'), vln_rng=('D5', 'A5'),
                  intro='intro', outro='outro'):
    ex = EXTRA.get(CUR['name'], {})
    bell = ex.get('bell')
    VIO, CEL = GM['violin'], GM['cello']
    first, second = (CEL, VIO) if A_lead_cello_first else (VIO, CEL)
    hi_rng = ('D3', 'D5')

    # ---- intro: piano + harp + soft strings, a bell sparkle
    piano(P, intro, 0, vel=50, lo=pno_lo, bass_lo=low)
    harp(P, intro, 0, vel=44, gain=0.8)
    pv = big_pad(P, 'str', GM['slowstr'], intro, 0, *hi_rng, n=5, vel=44, gain=0.8, cresc=8)
    roots(P, intro, 0, GM['contrabass'], low, vel=48, gain=0.5)
    if bell:
        sparkle(P, intro, 0, bell, vel=46, gain=0.9)

    # ---- A1: first lead harmonised, strings 5 voices, piano + harp
    m = lead2(P, first, melA, 'A', 0, shift=-12 if first == CEL else 0, vel=vel, pan=-0.2 if first == CEL else 0.2)
    P.add('harm', harmonize(P, m, lo='C3' if first == CEL else 'F3'), first if first == CEL else GM['viola'],
          vel=62, gain=0.6, pan=0.05, legato=1.06, **(VC if first == CEL else VLN))
    piano(P, 'A', 0, vel=46, lo=pno_lo, bass_lo=low)
    harp(P, 'A', 0, vel=42, gain=0.6)
    pv = big_pad(P, 'str', GM['slowstr'], 'A', 0, *hi_rng, n=5, vel=48, gain=0.9, prev=pv)
    roots(P, 'A', 0, GM['contrabass'], low, vel=52, gain=0.55)
    if bell:
        sparkle(P, 'A', 0, bell, bars=[3, 7], vel=44, gain=0.8)
    if ex.get('hpsi'):
        hpsi(P, 'A', 0, vel=42, gain=0.6)

    # ---- A2: second lead + harmony, first lead counter, strings 6 voices, horns enter softly
    m = lead2(P, second, melA, 'A', 1, shift=-12 if second == CEL else 0, vel=vel + 2, pan=-0.2 if second == CEL else 0.2)
    P.add('harm', harmonize(P, m, lo='C3' if second == CEL else 'F3'), second if second == CEL else GM['viola'],
          vel=62, gain=0.6, pan=0.05, legato=1.06, **(VC if second == CEL else VLN))
    if second == CEL:
        counter(P, 'cnt', VIO, 'A', 1, *vln_rng, vel=60, gain=0.65, pan=0.3, kw=VLN)
    else:
        counter(P, 'cnt', CEL, 'A', 1, *cello_rng, vel=62, gain=0.75, pan=-0.3, kw=VC)
    piano(P, 'A', 1, vel=48, lo=pno_lo, bass_lo=low)
    harp(P, 'A', 1, vel=44, gain=0.7)
    pv = big_pad(P, 'str', GM['strings'], 'A', 1, *hi_rng, n=6, vel=50, gain=0.9, prev=pv, cresc=6)
    big_pad(P, 'brass', GM['horn'], 'A', 1, *horn_rng, n=3, vel=42, gain=0.5, kw=BRASS, cresc=8)
    roots(P, 'A', 1, GM['contrabass'], low, vel=56, gain=0.6)
    roots(P, 'A', 1, CEL, low, bus='low', vel=50, gain=0.4, octave=False)
    if bell:
        sparkle(P, 'A', 1, bell, bars=[7], vel=44, gain=0.8)
    if ex.get('hpsi'):
        hpsi(P, 'A', 1, vel=44, gain=0.6)

    # ---- B: TUTTI — violins + strings unison, 3rds below, horns double an octave down, brass choir, choir, timpani
    m = lead2(P, VIO, melB, 'B', 0, vel=vel + 8, lift=14, pan=0.2)
    lead2(P, GM['strings'], melB, 'B', 0, vel=vel, lift=12, pan=0.1, gain=0.7, kw=dict(SUSTAIN_STR), check=False)
    P.add('harm', harmonize(P, m), GM['viola'], vel=66, gain=0.7, pan=0.0, legato=1.06, **VLN)
    lead2(P, GM['horn'], melB, 'B', 0, shift=-12, vel=60, lift=10, pan=-0.1, gain=0.5, kw=BRASS, check=False)
    counter(P, 'cnt', CEL, 'B', 0, *cello_rng, vel=68, gain=0.8, pan=-0.3, kw=VC)
    piano(P, 'B', 0, vel=52, lo=pno_lo, bass_lo=low)
    harp(P, 'B', 0, vel=50, gain=0.8, dense=True)
    pv = big_pad(P, 'str', GM['strings'], 'B', 0, *hi_rng, n=6, vel=58, gain=1.0, prev=pv, cresc=10)
    big_pad(P, 'str', GM['slowstr'], 'B', 0, 'A4', 'E6', n=3, vel=46, gain=0.6, cresc=8)     # high violins divisi
    big_pad(P, 'brass', GM['horn'], 'B', 0, *horn_rng, n=4, vel=54, gain=0.7, kw=BRASS, cresc=10)
    big_pad(P, 'brass', GM['trombone'], 'B', 0, 'A2', 'A3', n=2, vel=48, gain=0.45, kw=BRASS, cresc=10)
    roots(P, 'B', 0, GM['tuba'], low, bus='brass', vel=52, gain=0.4, kw=BRASS)
    big_pad(P, 'choir', GM['choir'], 'B', 0, 'D4', 'D5', n=4, vel=50, gain=0.55, kw=CHOIR, cresc=10)
    roots(P, 'B', 0, GM['contrabass'], low, vel=62, gain=0.7)
    roots(P, 'B', 0, CEL, low, vel=56, gain=0.5, octave=False)
    timpani(P, 'B', 0, bars=(0, 4), vel=62, roll_end=True, gain=0.9)
    if color:
        counter(P, 'ww', GM[color], 'B', 0, 'F5', 'D6', vel=54, gain=0.6, pan=0.35, kw=WW, split=False)
    if bell:
        sparkle(P, 'B', 0, bell, bars=[1, 3, 5], vel=48, gain=0.9)

    # ---- A3: grand return — violin octaves + harmony, cello counter, brass, choir softer
    m = lead2(P, VIO, melA, 'A', 2, vel=vel + 6, pan=0.2)
    lead2(P, GM['strings'], melA, 'A', 2, shift=12 if max(p for (_, p, _) in m) < midi('A5') else 0, vel=vel - 4,
          pan=0.1, gain=0.5, kw=dict(SUSTAIN_STR), check=False)
    P.add('harm', harmonize(P, m), GM['viola'], vel=64, gain=0.65, pan=0.0, legato=1.06, **VLN)
    counter(P, 'cnt', CEL, 'A', 2, *cello_rng, vel=66, gain=0.8, pan=-0.3, kw=VC)
    piano(P, 'A', 2, vel=50, lo=pno_lo, bass_lo=low)
    harp(P, 'A', 2, vel=46, gain=0.7)
    pv = big_pad(P, 'str', GM['strings'], 'A', 2, *hi_rng, n=6, vel=56, gain=0.95, prev=pv, cresc=-8)
    big_pad(P, 'brass', GM['horn'], 'A', 2, *horn_rng, n=4, vel=50, gain=0.6, kw=BRASS, cresc=-10)
    big_pad(P, 'choir', GM['choir'], 'A', 2, 'D4', 'D5', n=4, vel=44, gain=0.45, kw=CHOIR, cresc=-10)
    roots(P, 'A', 2, GM['contrabass'], low, vel=60, gain=0.65)
    roots(P, 'A', 2, CEL, low, vel=54, gain=0.45)
    timpani(P, 'A', 2, bars=(0,), vel=56, gain=0.8)
    if bell:
        sparkle(P, 'A', 2, bell, bars=[3, 7], vel=44, gain=0.8)
    if ex.get('hpsi'):
        hpsi(P, 'A', 2, vel=40, gain=0.5)

    # ---- outro: piano, harp and strings settle; one last sparkle
    piano(P, outro, 0, vel=48, lo=pno_lo, bass_lo=low)
    harp(P, outro, 0, vel=42, gain=0.7)
    big_pad(P, 'str', GM['slowstr'], outro, 0, *hi_rng, n=5, vel=46, gain=0.85, prev=pv, cresc=-10)
    roots(P, outro, 0, GM['contrabass'], low, vel=48, gain=0.5)
    if bell:
        sparkle(P, outro, 0, bell, vel=44, gain=0.8)


SUSTAIN_STR = dict(attack=0.18, release=0.7)


def grand_title():
    """에테르가 흐르는 땅 — grand version."""
    A = ['Dm', 'Bb', 'Gm', 'A']
    P = Piece(64, 4, [('intro', ['Dm', 'Bbmaj7']), ('A', A), ('B', ['Bb', 'C', 'F/A', 'Gm7 A']), ('A', A)])
    melA = "A4:3 D5:1 | F5:2 G5:1 F5:1 | D5:1.5 C5:.5 Bb4:2 | A4:4"
    melB = "D5:3 F5:1 | E5:2 G5:2 | C5:2 A4:1 C5:1 | Bb4:2 C#5:2"
    hi = ('D3', 'D5')
    piano(P, 'intro', 0, vel=52, lo='A3'); harp(P, 'intro', 0, vel=46, gain=0.8)
    pv = big_pad(P, 'str', GM['slowstr'], 'intro', 0, *hi, n=5, vel=46, gain=0.8, cresc=10)
    big_pad(P, 'choir', GM['choir'], 'intro', 0, 'D4', 'D5', n=3, vel=40, gain=0.4, kw=CHOIR, cresc=8)
    roots(P, 'intro', 0, GM['contrabass'], 'D2', vel=50, gain=0.55)
    sparkle(P, 'intro', 0, 'celesta', vel=48, gain=0.9)
    # A: violin + harmony, cello counter, strings & horns
    m = lead2(P, GM['violin'], melA, 'A', 0, vel=74)
    P.add('harm', harmonize(P, m), GM['viola'], vel=62, gain=0.6, legato=1.06, **VLN)
    counter(P, 'cnt', GM['cello'], 'A', 0, 'C3', 'A4', vel=60, gain=0.75, pan=-0.3)
    piano(P, 'A', 0, vel=48); harp(P, 'A', 0, vel=44, gain=0.7)
    pv = big_pad(P, 'str', GM['strings'], 'A', 0, *hi, n=6, vel=50, gain=0.9, prev=pv, cresc=6)
    big_pad(P, 'brass', GM['horn'], 'A', 0, 'F3', 'D4', n=3, vel=44, gain=0.5, kw=BRASS, cresc=8)
    roots(P, 'A', 0, GM['contrabass'], 'D2', vel=56, gain=0.6)
    timpani(P, 'A', 0, bars=(0,), vel=56)
    # B: tutti
    m = lead2(P, GM['violin'], melB, 'B', 0, vel=82, lift=14)
    lead2(P, GM['strings'], melB, 'B', 0, vel=74, pan=0.1, gain=0.7, kw=dict(SUSTAIN_STR), check=False)
    P.add('harm', harmonize(P, m), GM['viola'], vel=66, gain=0.7, legato=1.06, **VLN)
    lead2(P, GM['horn'], melB, 'B', 0, shift=-12, vel=60, pan=-0.1, gain=0.5, kw=BRASS, check=False)
    counter(P, 'cnt', GM['cello'], 'B', 0, 'C3', 'A4', vel=68, gain=0.8, pan=-0.3)
    piano(P, 'B', 0, vel=54); harp(P, 'B', 0, vel=50, gain=0.8, dense=True)
    pv = big_pad(P, 'str', GM['strings'], 'B', 0, *hi, n=6, vel=58, gain=1.0, prev=pv, cresc=10)
    big_pad(P, 'str', GM['slowstr'], 'B', 0, 'A4', 'E6', n=3, vel=46, gain=0.6, cresc=8)
    big_pad(P, 'brass', GM['horn'], 'B', 0, 'F3', 'D4', n=4, vel=56, gain=0.7, kw=BRASS, cresc=10)
    big_pad(P, 'brass', GM['trombone'], 'B', 0, 'A2', 'A3', n=2, vel=50, gain=0.45, kw=BRASS, cresc=10)
    roots(P, 'B', 0, GM['tuba'], 'D2', bus='brass', vel=52, gain=0.4, kw=BRASS)
    big_pad(P, 'choir', GM['choir'], 'B', 0, 'D4', 'D5', n=4, vel=52, gain=0.55, kw=CHOIR, cresc=10)
    roots(P, 'B', 0, GM['contrabass'], 'D2', vel=62, gain=0.7)
    timpani(P, 'B', 0, bars=(0, 2), vel=62, roll_end=True)
    sparkle(P, 'B', 0, 'celesta', bars=[1, 3], vel=48, gain=0.9)
    # A again: violin octave up + harmony, cello on the tune below, full
    m = lead2(P, GM['violin'], melA, 'A', 1, shift=12, vel=76)
    lead2(P, GM['cello'], melA, 'A', 1, shift=-12, vel=68, pan=-0.25, gain=0.75, check=False)
    P.add('harm', harmonize(P, m, lo='A4'), GM['violin'], vel=62, gain=0.55, pan=0.25, legato=1.06, **VLN)
    piano(P, 'A', 1, vel=50); harp(P, 'A', 1, vel=46, gain=0.7)
    big_pad(P, 'str', GM['strings'], 'A', 1, *hi, n=6, vel=54, gain=0.95, prev=pv, cresc=-10)
    big_pad(P, 'brass', GM['horn'], 'A', 1, 'F3', 'D4', n=4, vel=50, gain=0.6, kw=BRASS, cresc=-10)
    big_pad(P, 'choir', GM['choir'], 'A', 1, 'D4', 'D5', n=4, vel=46, gain=0.45, kw=CHOIR, cresc=-12)
    roots(P, 'A', 1, GM['contrabass'], 'D2', vel=58, gain=0.65)
    timpani(P, 'A', 1, bars=(0,), vel=58)
    sparkle(P, 'A', 1, 'celesta', bars=[3], vel=46, gain=0.8)
    return P


SENDS = dict(lead=0.42, harm=0.45, pno=0.3, str=0.55, brass=0.6, choir=0.7, low=0.3, ww=0.5, cnt=0.42,
             harp=0.45, bell=0.6, hpsi=0.3, perc=0.45)
EQS = dict(lyric.EQS, harm=chain(highpass(140), lowpass(6500)), choir=chain(highpass(200), lowpass(5000)),
           harp=chain(highpass(80), lowpass(8000)), bell=chain(highpass(400), lowpass(9000)),
           hpsi=chain(highpass(200), lowpass(7000)), perc=chain(highpass(40), lowpass(3000)),
           brass=chain(highpass(60), lowpass(3800)))


BUSGAIN = dict(str=0.8, harm=1.45, low=1.45, cnt=1.15)


def build(name):
    CUR['name'] = name
    lyric.arrange = grand_arrange
    P = grand_title() if name == 'title' else lyric.PIECES[name]()
    bad = P.harmony_report()
    for b, g in BUSGAIN.items():          # final balance: melody on top, chords full right behind it
        if b in P.song.buses:
            P.song.buses[b] *= g
    secs = P.render(OUT + f'{name}.wav', sends=SENDS, eq=EQS, rev_time=3.6, rev_mix=0.62)
    print(f'{name}: {secs:.1f}s clashes={bad}', flush=True)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for n in (sys.argv[1:] or ['title'] + [k for k in lyric.PIECES if k != 'title']):
        build(n)

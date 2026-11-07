"""ETHERION BGM v4 — orchestra (strings · woodwinds · horns), no piano / harp / bells / harpsichord / timpani.
Same melodies and harmony as lyric.py (v2) / grand.py (v3) and track1 / track2, re-orchestrated for the
modelled string sections in orch.py.
Run: python3 orchestra.py [name ...]   (no args = all 12)  -> OUT/<name>.wav"""
import os, sys
import numpy as np
import lyric, grand
from lyric import pcs_of, timeline
from grand import harmonize, wide_voice
from kit import Piece, GM, midi, parse, chain, lowpass, highpass, chord
from mix import nearest
import orch
from orch import Ensemble, winds

OUT = os.environ.get('BGM_OUT', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out4/'))
CUR = {'E': None}


# ------------------------------------------------------------------ small helpers
def swell(base, lift=10, span=8, ref=72, t_start=0.0, L=1.0, cresc=0.0):
    return lambda t, p, d: base + lift * np.sin(np.pi * ((t % span) / span)) + (p - ref) * 0.3 + cresc * (t - t_start) / L


def sec_span(P, name, k):
    return P.at(name, k), P._sec_len(name, k) * P.meter


def kind_for(p):
    return 'vln' if p >= midi('G4') else 'vla' if p >= midi('C4') else 'vc' if p >= midi('C3') else 'cb'


def counter_notes(P, name, k, lo, hi, start=None, split=True):
    """lyric.counter without playing it: guide-tone line (3rds / 7ths), never a 2nd from the melody"""
    mel = [n for (_, ns) in P.melodies for n in ns]
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
                t, p, dd = notes[-1]; notes[-1] = (t, p, dd + d)
            else:
                notes.append((ts, best, d))
            prev = best
    return notes


def melody(P, text, name, k, shift=0, check=True):
    notes, end = parse(text, P.at(name, k))
    notes = [(t, p + shift, d) for (t, p, d) in notes]
    if check:
        P.melodies.append(('lead', notes))
    return notes


# ------------------------------------------------------------------ parts
def strings_lead(P, notes, kind='vln', n=8, vel=74, lift=10, pan=0.15, bus='lead', gain=1.0, spread=0.45, **kw):
    t0 = notes[0][0] if notes else 0
    CUR['E'].line(bus, kind, notes, n=n, vel_fn=swell(vel, lift, 2 * P.meter if P.meter != 6 else 12), pan=pan,
                  spread=spread, gain=gain, glide=kw.pop('glide', 0.05), **kw)


def harmony(P, mel, name, kind='vla', n=5, vel=62, pan=0.0, lo='F3', gain=1.0, bus='harm'):
    h = harmonize(P, mel, lo=lo)
    CUR['E'].line(bus, kind, h, n=n, vel_fn=swell(vel, 8, 2 * P.meter), pan=pan, spread=0.4, gain=gain, glide=0.05)
    return h


def pad(P, name, k, lo, hi, n=5, vel=50, cresc=0, prev=None, players=3, bus='pad', gain=1.0, sample_layer=0.5):
    vs, last = wide_voice(P, name, k, lo, hi, n, prev)
    t_start, L = sec_span(P, name, k)
    vf = lambda t, p, d: vel + cresc * (t - t_start) / L
    for j in range(n):   # a fallback voicing may have fewer notes: those lines double the nearest voice
        line = [(t0, sorted(comb)[min(j, len(comb) - 1)], span) for (t0, span, comb) in vs]
        mean = np.mean([p for (_, p, _) in line])
        kind = kind_for(mean)
        pan = (-0.45 if kind in ('vc', 'cb') else 0.35 if kind == 'vln' else -0.05) + 0.1 * (j % 2)
        CUR['E'].line(bus, kind, line, n=players, vel_fn=vf, pan=pan, spread=0.3, gain=gain, glide=0.06,
                      attack=0.35, release=0.9, vib=8)
    if sample_layer:
        notes = [(t0, p, span) for (t0, span, comb) in vs for p in comb]
        winds(P, 'smp', GM['slowstr'], notes, n=1, vel_fn=vf, gain=sample_layer, attack=0.45, release=1.0,
              legato=1.04, vibrato=0)
    return last


def bass(P, name, k, lo, vel=60, cb=True, pattern=None, players=(5, 3), cresc=0):
    """cellos + basses on the chord bass. pattern: list of (offset, dur, interval) within each chord span"""
    notes = []
    for (t0, span, (root, q, bpc)) in P.each_chord(name, k):
        b = nearest(bpc, midi(lo))
        pat = pattern or [(0, span, 0)]
        for off, d, iv in pat:
            if off < span - 1e-6:
                notes.append((t0 + off, b + iv, min(d, span - off)))
    t_start, L = sec_span(P, name, k)
    vf = lambda t, p, d: vel + cresc * (t - t_start) / L
    CUR['E'].line('low', 'vc', notes, n=players[0], vel_fn=vf, pan=-0.35, spread=0.25, glide=0.06, attack=0.16)
    if cb:
        CUR['E'].line('low', 'cb', [(t, p - 12, d) for (t, p, d) in notes], n=players[1], vel_fn=vf, pan=-0.15,
                      spread=0.2, glide=0.06, attack=0.2)


def ostinato(P, name, k, lo='A3', vel=46, kind='vla', players=4, cresc=0, pan=-0.15, step=None, fig=None):
    """bowed broken chords (slurred), the motion that the piano / harp used to give"""
    m = P.meter
    step = step or {4: 0.5, 3: 0.5, 6: 1.0}[m]
    fig = fig or {4: (0, 2, 1, 2, 3, 2, 1, 2), 3: (0, 2, 1, 2, 3, 2), 6: (0, 1, 2, 3, 2, 1)}[m]
    notes = []
    for (t0, span, (root, q, bpc)) in P.each_chord(name, k):
        v = Piece.voicing(root, q[:4], midi(lo), 4)
        for s in range(int(round(span / step))):
            notes.append((t0 + s * step, v[fig[s % len(fig)]], step))
    t_start, L = sec_span(P, name, k)
    vf = lambda t, p, d: vel + (5 if (t % m) < 1e-6 else 0) + cresc * (t - t_start) / L - (p - 60) * 0.2
    CUR['E'].line('ost', kind, notes, n=players, vel_fn=vf, pan=pan, spread=0.3, glide=0.03, attack=0.08, vib=7)


def waltz(P, name, k, lo='D2', chord_lo='G3', vel=50, cresc=0):
    """3/4: low strings on 1, soft portato string chords on 2 and 3"""
    t_start, L = sec_span(P, name, k)
    vf = lambda t, p, d: vel + cresc * (t - t_start) / L
    bnotes, cnotes = [], [[], [], []]
    for (t0, span, (root, q, bpc)) in P.each_chord(name, k):
        for bar_t in np.arange(t0, t0 + span - 1e-6, 3):
            bnotes.append((bar_t, nearest(bpc, midi(lo)), 1.0))
            for o in (1, 2):
                for j, p in enumerate(Piece.voicing(root, q[:3], midi(chord_lo), 3)):
                    cnotes[j].append((bar_t + o, p, 0.62))
    E = CUR['E']
    E.line('low', 'vc', bnotes, n=5, vel_fn=lambda t, p, d: vf(t, p, d) + 8, pan=-0.35, legato=False,
           art_len=0.9, attack=0.07, release=0.35)
    E.line('low', 'cb', [(t, p - 12, d) for (t, p, d) in bnotes], n=3, vel_fn=lambda t, p, d: vf(t, p, d) + 6,
           pan=-0.15, legato=False, art_len=0.9, attack=0.08, release=0.4)
    for j in range(3):
        E.line('ost', kind_for(np.mean([p for (_, p, _) in cnotes[j]])), cnotes[j], n=3, vel_fn=vf,
               pan=0.1 + 0.15 * (j - 1), legato=False, art_len=1.0, attack=0.06, release=0.25, vib=6)


def horns(P, name, k, lo, hi, n=3, vel=48, cresc=0, players=2, gain=1.0):
    vs, _ = wide_voice(P, name, k, lo, hi, n)
    t_start, L = sec_span(P, name, k)
    notes = [(t0, p, span) for (t0, span, comb) in vs for p in comb]
    winds(P, 'brass', GM['horn'], notes, n=players, vel_fn=lambda t, p, d: vel + cresc * (t - t_start) / L,
          pan=-0.25, spread=0.35, attack=0.28, release=0.8, legato=1.03, vibrato=3, vib_rate=4.6, gain=gain)


def horn_melody(P, notes, vel=60, shift=-12, players=3, gain=1.0):
    winds(P, 'brass', GM['horn'], [(t, p + shift, d) for (t, p, d) in notes], n=players,
          vel_fn=swell(vel, 8, 2 * P.meter), pan=-0.2, spread=0.3, attack=0.12, release=0.4, legato=1.06,
          vibrato=4, gain=gain)


def choir(P, name, k, lo='D4', hi='D5', n=4, vel=44, cresc=0, gain=1.0):
    vs, _ = wide_voice(P, name, k, lo, hi, n)
    t_start, L = sec_span(P, name, k)
    notes = [(t0, p, span) for (t0, span, comb) in vs for p in comb]
    winds(P, 'choir', GM['choir'], notes, n=1, vel_fn=lambda t, p, d: vel + cresc * (t - t_start) / L,
          attack=0.7, release=1.4, legato=1.04, vibrato=0, gain=gain)


WIND = {'flute': ('s', GM['flute'], 0), 'oboe': ('s', GM['oboe'], 0), 'ehorn': ('s', GM['oboe'], 0),
        'clarinet': ('m', 'cl', 0), 'bassoon': ('m', 'bsn', -12)}


def wind(P, color, notes, vel=66, bus='ww', pan=0.3, lift=8, gain=1.0):
    how, prog, sh = WIND[color]
    notes = [(t, p + sh, d) for (t, p, d) in notes]
    vf = swell(vel, lift, 2 * P.meter)
    if how == 's':
        vib = 10 if color == 'flute' else 7
        winds(P, bus, prog, notes, n=1, vel_fn=vf, pan=pan, attack=0.07, release=0.3, legato=1.1, vibrato=vib,
              vib_rate=5.0, gain=gain)
    else:
        CUR['E'].line(bus, prog, notes, n=1, vel_fn=vf, pan=pan, glide=0.035, gain=gain)


def wind_counter(P, color, name, k, lo='F5', hi='D6', vel=58, split=False, gain=1.0):
    how, prog, sh = WIND[color]
    if sh:
        lo, hi = 'A3', 'F4'
        sh = 0
    notes = counter_notes(P, name, k, lo, hi, split=split)
    wind(P, color, notes, vel=vel, gain=gain)


# ------------------------------------------------------------------ the standard form
def orch_arrange(P, melA, melB, *, low='D2', pno_lo='A3', color=None, A_lead_cello_first=False, vel=74,
                 str_rng=('D3', 'A4'), horn_rng=('F3', 'D4'), cello_rng=('C3', 'A4'), vln_rng=('D5', 'A5'),
                 intro='intro', outro='outro'):
    """intro (strings + wind) | A strings sing | A wind or cellos sing | B tutti | A grand | outro"""
    E = CUR['E']
    m3 = P.meter == 3
    color = color or 'flute'
    hi_rng = ('D3', 'D5')
    ost_lo = pno_lo
    wind_sings = WIND[color][0] == 's'

    def accomp(name, k, vel_, cresc=0):
        if m3:
            waltz(P, name, k, lo=low, chord_lo=ost_lo, vel=vel_, cresc=cresc)
        else:
            ostinato(P, name, k, lo=ost_lo, vel=vel_, cresc=cresc)

    # ---- intro
    pv = pad(P, intro, 0, *hi_rng, n=4, vel=44, cresc=8)
    accomp(intro, 0, 40, cresc=6)
    if not m3:
        bass(P, intro, 0, low, vel=48)
    wind_counter(P, color, intro, 0, vel=52)

    # ---- A1: the first strings sing (violins, or cellos)
    if A_lead_cello_first:
        m = melody(P, melA, 'A', 0, shift=-12)
        strings_lead(P, m, 'vc', n=6, vel=vel, pan=-0.2)
        harmony(P, m, 'A', kind='vc', n=4, vel=58, lo='C3', pan=-0.3)
    else:
        m = melody(P, melA, 'A', 0)
        strings_lead(P, m, 'vln', n=8, vel=vel)
        harmony(P, m, 'A', kind='vla', n=4, vel=58)
    pv = pad(P, 'A', 0, *hi_rng, n=4, vel=44, prev=pv)
    accomp('A', 0, 44)
    if not m3:
        bass(P, 'A', 0, low, vel=52)

    # ---- A2: a woodwind sings (or the other strings), counter-line underneath
    if wind_sings:
        m = melody(P, melA, 'A', 1)
        wind(P, color, m, vel=vel + 2, bus='lead', pan=0.1, lift=10)
        cn = counter_notes(P, 'A', 1, *cello_rng)
        E.line('cnt', 'vc', cn, n=6, vel_fn=swell(64, 8, 2 * P.meter), pan=-0.3, spread=0.3, glide=0.06)
    else:
        if A_lead_cello_first:
            m = melody(P, melA, 'A', 1)
            strings_lead(P, m, 'vln', n=8, vel=vel + 2)
            harmony(P, m, 'A', kind='vla', n=4, vel=58)
            cn = counter_notes(P, 'A', 1, *cello_rng)
            E.line('cnt', 'vc', cn, n=6, vel_fn=swell(64, 8, 2 * P.meter), pan=-0.3, spread=0.3, glide=0.06)
        else:
            m = melody(P, melA, 'A', 1, shift=-12)
            strings_lead(P, m, 'vc', n=6, vel=vel + 2, pan=-0.2)
            cn = counter_notes(P, 'A', 1, *vln_rng)
            E.line('cnt', 'vln', cn, n=6, vel_fn=swell(60, 8, 2 * P.meter), pan=0.3, spread=0.3, glide=0.06)
        wind_counter(P, color, 'A', 1, vel=54)
    pv = pad(P, 'A', 1, *hi_rng, n=5, vel=48, prev=pv, cresc=6)
    horns(P, 'A', 1, *horn_rng, n=3, vel=42, cresc=10)
    accomp('A', 1, 46, cresc=4)
    if not m3:
        bass(P, 'A', 1, low, vel=56)

    # ---- B: tutti — violins in octaves, violas a 3rd below, horns with the tune, cellos counter
    m = melody(P, melB, 'B', 0)
    strings_lead(P, m, 'vln', n=10, vel=vel + 10, lift=12)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], kind_for(np.mean([p for (_, p, _) in m]) - 12), n=8,
                 vel=vel + 4, lift=10, gain=0.7, bus='lead', pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=66)
    horn_melody(P, m, vel=62, players=3, gain=0.8)
    cn = counter_notes(P, 'B', 0, *cello_rng)
    E.line('cnt', 'vc', cn, n=6, vel_fn=swell(70, 8, 2 * P.meter), pan=-0.3, spread=0.3, glide=0.06)
    pv = pad(P, 'B', 0, *hi_rng, n=5, vel=56, prev=pv, cresc=10)
    horns(P, 'B', 0, *horn_rng, n=4, vel=54, cresc=10)
    horns(P, 'B', 0, 'A2', 'A3', n=2, vel=46, cresc=10, gain=0.7)
    choir(P, 'B', 0, vel=46, cresc=10)
    if m3:
        waltz(P, 'B', 0, lo=low, chord_lo=ost_lo, vel=54, cresc=6)
    else:
        bass(P, 'B', 0, low, vel=64, cresc=6)
    wind_counter(P, color, 'B', 0, vel=60)

    # ---- A3: grand return — violins (octave up if there is room) over cellos on the tune
    m = melody(P, melA, 'A', 2)
    up = 12 if max(p for (_, p, _) in m) <= midi('A5') else 0
    strings_lead(P, [(t, p + up, d) for (t, p, d) in m], 'vln', n=10, vel=vel + 6)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vc', n=6, vel=vel, gain=0.75, pan=-0.25)
    harmony(P, [(t, p + up, d) for (t, p, d) in m], 'A', kind='vln' if up else 'vla', n=5, vel=60,
            lo='A4' if up else 'F3')
    pv = pad(P, 'A', 2, *hi_rng, n=5, vel=52, prev=pv, cresc=-10)
    horns(P, 'A', 2, *horn_rng, n=3, vel=46, cresc=-10)
    choir(P, 'A', 2, vel=40, cresc=-10)
    accomp('A', 2, 48, cresc=-6)
    if not m3:
        bass(P, 'A', 2, low, vel=60, cresc=-6)

    # ---- outro: strings settle, the wind remembers the counter-line
    pad(P, outro, 0, *hi_rng, n=4, vel=46, prev=pv, cresc=-10)
    accomp(outro, 0, 40, cresc=-6)
    if not m3:
        bass(P, outro, 0, low, vel=48)
    wind_counter(P, color, outro, 0, vel=50)


# ------------------------------------------------------------------ title (intro | A | B | A)
def orch_title():
    """에테르가 흐르는 땅 — D minor 4/4, 64"""
    A = ['Dm', 'Bb', 'Gm', 'A']
    P = Piece(64, 4, [('intro', ['Dm', 'Bbmaj7']), ('A', A), ('B', ['Bb', 'C', 'F/A', 'Gm7 A']), ('A', A)])
    CUR['E'] = E = Ensemble(P)
    melA = "A4:3 D5:1 | F5:2 G5:1 F5:1 | D5:1.5 C5:.5 Bb4:2 | A4:4"
    melB = "D5:3 F5:1 | E5:2 G5:2 | C5:2 A4:1 C5:1 | Bb4:2 C#5:2"
    hi = ('D3', 'D5')
    pv = pad(P, 'intro', 0, *hi, n=4, vel=46, cresc=10)
    ostinato(P, 'intro', 0, lo='A3', vel=42, cresc=6)
    bass(P, 'intro', 0, 'D2', vel=50)
    choir(P, 'intro', 0, n=3, vel=38, cresc=8)
    wind_counter(P, 'flute', 'intro', 0, vel=50)
    # A: violins + violas 3rd below, cellos counter, horns
    m = melody(P, melA, 'A', 0)
    strings_lead(P, m, 'vln', n=8, vel=74)
    harmony(P, m, 'A', kind='vla', n=4, vel=58)
    cn = counter_notes(P, 'A', 0, 'C3', 'A4')
    E.line('cnt', 'vc', cn, n=6, vel_fn=swell(62, 8, 8), pan=-0.3, spread=0.3)
    pv = pad(P, 'A', 0, *hi, n=5, vel=48, prev=pv, cresc=6)
    horns(P, 'A', 0, 'F3', 'D4', n=3, vel=44, cresc=8)
    ostinato(P, 'A', 0, lo='A3', vel=46)
    bass(P, 'A', 0, 'D2', vel=56)
    # B: tutti
    m = melody(P, melB, 'B', 0)
    strings_lead(P, m, 'vln', n=10, vel=84, lift=12)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vla', n=8, vel=76, gain=0.7, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=66)
    horn_melody(P, m, vel=62)
    cn = counter_notes(P, 'B', 0, 'C3', 'A4')
    E.line('cnt', 'vc', cn, n=6, vel_fn=swell(70, 8, 8), pan=-0.3, spread=0.3)
    pv = pad(P, 'B', 0, *hi, n=5, vel=58, prev=pv, cresc=10)
    horns(P, 'B', 0, 'F3', 'D4', n=4, vel=56, cresc=10)
    horns(P, 'B', 0, 'A2', 'A3', n=2, vel=48, cresc=10, gain=0.7)
    choir(P, 'B', 0, vel=48, cresc=10)
    bass(P, 'B', 0, 'D2', vel=64, pattern=[(0, 2, 0), (2, 2, 0)])
    wind_counter(P, 'flute', 'B', 0, vel=58)
    # A again: violins an octave up + cellos on the tune below, settling toward the loop
    m = melody(P, melA, 'A', 1)
    strings_lead(P, [(t, p + 12, d) for (t, p, d) in m], 'vln', n=10, vel=78)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vc', n=6, vel=70, gain=0.75, pan=-0.25)
    harmony(P, [(t, p + 12, d) for (t, p, d) in m], 'A', kind='vln', n=5, vel=60, lo='A4')
    pad(P, 'A', 1, *hi, n=5, vel=54, prev=pv, cresc=-12)
    horns(P, 'A', 1, 'F3', 'D4', n=3, vel=48, cresc=-12)
    choir(P, 'A', 1, vel=42, cresc=-12)
    ostinato(P, 'A', 1, lo='A3', vel=46, cresc=-6)
    bass(P, 'A', 1, 'D2', vel=58, cresc=-8)
    return P


# ------------------------------------------------------------------ battle pieces (were piano trios)
def bars_form(sections):
    return [(name, bars) for (name, bars) in sections]


def battle_reminiscence():
    """빛바랜 기억 — D minor 4/4, 76. strings, flute and horns (was violin/cello/piano trio)."""
    intro = ['Dm', 'Bb', 'Gm', 'A7']
    A = ['Dm', 'Bb', 'F', 'C', 'Gm', 'Dm/F', 'Em7b5', 'A7']
    A2 = ['Dm', 'Bb', 'F', 'C', 'Gm', 'Dm/F', 'A7', 'Dm']
    B = ['Bbmaj7', 'C', 'Am', 'Dm', 'Gm', 'C', 'F', 'A7']
    outro = ['Dm', 'Bb', 'Gm', 'A7']
    P = Piece(76, 4, [('intro', intro), ('A', A), ('A2', A2), ('B', B), ('A', A), ('outro', outro)])
    CUR['E'] = E = Ensemble(P)
    melA = ("A4:1.5 D5:.5 E5 F5 | F5:1.5 E5:.5 D5:2 | C5 A4 C5 F5 | E5:2.5 D5:.5 C5 | "
            "Bb4:1.5 D5:.5 G5:2 | F5 E5:.5 D5:.5 A4:2 | G4 Bb4 D5:1.5 E5:.5 | C#5:3 A4")
    melA2 = ("A4:1.5 D5:.5 E5 F5 | F5:1.5 E5:.5 D5:2 | C5 A4 C5 F5 | E5:2.5 D5:.5 C5 | "
             "Bb4:1.5 D5:.5 G5:2 | F5 E5:.5 D5:.5 A4:2 | E4 G4 A4 C#5 | D5:4")
    melB = ("D5 F5 Bb5:2 | A5:1.5 G5:.5 E5:2 | E5 A5 C6:1.5 B5:.5 | A5:3 F5 | "
            "G5:1.5 A5:.5 Bb5 D6 | C6:1.5 Bb5:.5 G5:2 | A5 G5:.5 F5:.5 C5 F5 | E5:2 C#5:2")
    echo = "r:2 A5:1 D6:1 | F6:3 E6:1 | D6:2 Bb5:2 | A5:3 C#6:1"
    hi = ('D3', 'D5')
    # intro: strings + flute echo of the tune
    pv = pad(P, 'intro', 0, *hi, n=4, vel=46, cresc=8)
    ostinato(P, 'intro', 0, lo='A3', vel=44)
    bass(P, 'intro', 0, 'D2', vel=50)
    wind(P, 'flute', [(t, p - 12, d) for (t, p, d) in parse(echo.replace('|', ' '), P.at('intro'))[0]], vel=60)
    # A: violins sing, cellos long counter
    m = melody(P, melA.replace('|', ' '), 'A', 0)
    strings_lead(P, m, 'vln', n=8, vel=72)
    pv = pad(P, 'A', 0, *hi, n=4, vel=44, prev=pv)
    ostinato(P, 'A', 0, lo='A3', vel=44)
    bass(P, 'A', 0, 'D2', vel=54)
    # A2: cellos sing an octave lower, violins answer with long notes, oboe colour
    m = melody(P, melA2.replace('|', ' '), 'A2', 0, shift=-12)
    strings_lead(P, m, 'vc', n=6, vel=78, pan=-0.2)
    cnt, _ = parse("r:2 F5:2 D5:4 A5:4 G5:4 Bb5:2 A5:2 A5:4 A5:2 G5:2 F5:4", P.at('A2'))
    E.line('cnt', 'vln', cnt, n=8, vel=60, pan=0.3, spread=0.35)
    pv = pad(P, 'A2', 0, *hi, n=5, vel=48, prev=pv, cresc=6)
    horns(P, 'A2', 0, 'F3', 'D4', n=3, vel=42, cresc=8)
    ostinato(P, 'A2', 0, lo='A3', vel=46)
    bass(P, 'A2', 0, 'D2', vel=56)
    # B: tutti
    m = melody(P, melB.replace('|', ' '), 'B', 0)
    strings_lead(P, m, 'vln', n=10, vel=84, lift=12)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vln', n=8, vel=76, gain=0.7, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=64)
    horn_melody(P, m, vel=60, shift=-24 if max(p for (_, p, _) in m) > midi('A5') else -12)
    cn = counter_notes(P, 'B', 0, 'C3', 'A4')
    E.line('cnt', 'vc', cn, n=6, vel_fn=swell(70, 8, 8), pan=-0.3, spread=0.3)
    pv = pad(P, 'B', 0, *hi, n=5, vel=56, prev=pv, cresc=10)
    horns(P, 'B', 0, 'F3', 'D4', n=4, vel=54, cresc=10)
    choir(P, 'B', 0, vel=44, cresc=10)
    bass(P, 'B', 0, 'D2', vel=64, pattern=[(0, 2.5, 0), (2.5, 1.5, 7)])
    # A3: grand
    m = melody(P, melA.replace('|', ' '), 'A', 1)
    strings_lead(P, [(t, p + 12, d) for (t, p, d) in m], 'vln', n=10, vel=80)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vc', n=6, vel=72, gain=0.75, pan=-0.25)
    harmony(P, [(t, p + 12, d) for (t, p, d) in m], 'A', kind='vln', n=5, vel=60, lo='A4')
    pv = pad(P, 'A', 1, *hi, n=5, vel=52, prev=pv, cresc=-8)
    horns(P, 'A', 1, 'F3', 'D4', n=3, vel=46, cresc=-8)
    ostinato(P, 'A', 1, lo='A3', vel=46, cresc=-4)
    bass(P, 'A', 1, 'D2', vel=60)
    # outro: flute echo again over strings
    pad(P, 'outro', 0, *hi, n=4, vel=46, prev=pv, cresc=-10)
    ostinato(P, 'outro', 0, lo='A3', vel=42, cresc=-4)
    bass(P, 'outro', 0, 'D2', vel=48)
    wind(P, 'flute', [(t, p - 12, d) for (t, p, d) in
                      parse("r:2 A5:1 D6:1 F6:2 E6:1 D6:1 D6:2 Bb5:2 A5:4", P.at('outro'))[0]], vel=56)
    return P


def battle_long_ago():
    """먼 옛날의 오후 — F major 4/4, 84. was piano/violin/cello/guitar; now oboe, strings, horns."""
    intro = ['Fmaj7', 'Bbmaj7', 'Fmaj7', 'Csus4 C']
    A = ['F', 'C/E', 'Dm', 'Bb', 'F/C', 'Bb', 'Gm7 C', 'F']
    B = ['Bb', 'C', 'Am', 'Dm', 'Gm', 'C', 'F/A Bb', 'Csus4 C']
    tag = ['Bb', 'C', 'Fmaj7', 'Csus4 C']
    P = Piece(84, 4, [('intro', intro), ('A', A), ('A', A), ('B', B), ('A', A), ('outro', tag)])
    CUR['E'] = E = Ensemble(P)
    melA = ("A4:1.5 G4:.5 F4 A4 | C5:2 G4:2 | A4 D5 C5 A4 | Bb4:1.5 A4:.5 G4:2 | "
            "A4:1.5 G4:.5 F4 A4 | D5:2 C5 Bb4 | Bb4 A4 G4 E4 | F4:3 r")
    melAv = ("A4:1.5 G4:.5 F4 A4 | C5:2 G4:1.5 G4:.5 | A4 D5 C5 F5 | E5:1.5 D5:.5 C5:2 | "
             "A4:1.5 G4:.5 F4 A4 | D5:2 C5 Bb4 | Bb4 D5 C5:1.5 E4:.5 | F4:4")
    melB = ("D5:1.5 C5:.5 Bb4 D5 | E5:1.5 D5:.5 C5:2 | C5 E5 A5:1.5 G5:.5 | F5:3 D5 | "
            "D5 Bb4 D5 G5 | G5:1.5 F5:.5 E5 C5 | F5 E5 D5 F5 | G5:2 E5:2")
    tagm = "D5:2 C5:2 | Bb4 C5 E5:2 | F5:4 | r:4"
    hi = ('C3', 'C5')
    fl = lambda s: s.replace('|', ' ')
    pv = pad(P, 'intro', 0, *hi, n=4, vel=44, cresc=6)
    ostinato(P, 'intro', 0, lo='A3', vel=42)
    bass(P, 'intro', 0, 'C2', vel=48)
    wind_counter(P, 'flute', 'intro', 0, vel=50)
    # A1: oboe sings the tune (was the piano), strings carry it
    m = melody(P, fl(melA), 'A', 0)
    wind(P, 'oboe', [(t, p + 12, d) for (t, p, d) in m], vel=72, bus='lead', pan=0.05)
    pv = pad(P, 'A', 0, *hi, n=4, vel=44, prev=pv)
    ostinato(P, 'A', 0, lo='A3', vel=44)
    bass(P, 'A', 0, 'C2', vel=52)
    # A2: violins take the tune (variation), cellos counter
    m = melody(P, fl(melAv), 'A', 1)
    strings_lead(P, [(t, p + 12, d) for (t, p, d) in m], 'vln', n=8, vel=74)
    cn = counter_notes(P, 'A', 1, 'C3', 'A4')
    E.line('cnt', 'vc', cn, n=6, vel_fn=swell(62, 8, 8), pan=-0.3, spread=0.3)
    pv = pad(P, 'A', 1, *hi, n=5, vel=46, prev=pv, cresc=6)
    horns(P, 'A', 1, 'F3', 'C4', n=3, vel=40, cresc=8)
    ostinato(P, 'A', 1, lo='A3', vel=46)
    bass(P, 'A', 1, 'C2', vel=54)
    # B: tutti, cellos' own counter-melody
    m = melody(P, fl(melB), 'B', 0)
    strings_lead(P, m, 'vln', n=10, vel=84, lift=12)
    strings_lead(P, [(t, p - 12, d) for (t, p, d) in m], 'vla', n=8, vel=74, gain=0.7, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=62)
    horn_melody(P, m, vel=58)
    vc, _ = parse(fl("Bb2:4 | C3:2 E3:2 | A2:2 C3:2 | D3:3 F3 | G2:2 Bb2:2 | C3:2 E3 G3 | A3:2 Bb3:2 | C3:2 C3:2"), P.at('B'))
    E.line('cnt', 'vc', [(t, p + 12, d) for (t, p, d) in vc], n=6, vel_fn=swell(70, 8, 8), pan=-0.3, spread=0.3)
    pv = pad(P, 'B', 0, *hi, n=5, vel=54, prev=pv, cresc=10)
    horns(P, 'B', 0, 'F3', 'C4', n=4, vel=52, cresc=10)
    choir(P, 'B', 0, 'C4', 'C5', vel=42, cresc=8)
    bass(P, 'B', 0, 'C2', vel=62)
    wind_counter(P, 'flute', 'B', 0, vel=56)
    # A3: violins + cellos duet a sixth / third below
    m = melody(P, fl(melA), 'A', 2)
    strings_lead(P, [(t, p + 12, d) for (t, p, d) in m], 'vln', n=10, vel=78)
    duet, _ = parse(fl("F3:1.5 E3:.5 D3 F3 | E3:2 C3:2 | F3 Bb3 A3 F3 | D3:1.5 F3:.5 E3:2 | "
                       "F3:1.5 E3:.5 C3 F3 | Bb3:2 A3 G3 | D3 C3 Bb2 C3 | A2:3 r"), P.at('A', 2))
    strings_lead(P, [(t, p + 12, d) for (t, p, d) in duet], 'vc', n=6, vel=72, pan=-0.3, gain=0.85, bus='cnt')
    pv = pad(P, 'A', 2, *hi, n=5, vel=50, prev=pv, cresc=-8)
    horns(P, 'A', 2, 'F3', 'C4', n=3, vel=44, cresc=-8)
    ostinato(P, 'A', 2, lo='A3', vel=46)
    bass(P, 'A', 2, 'C2', vel=58)
    # tag: oboe closes, strings settle
    m = melody(P, fl(tagm), 'outro', 0)
    wind(P, 'oboe', m, vel=64, bus='lead', pan=0.05)
    pad(P, 'outro', 0, *hi, n=4, vel=44, prev=pv, cresc=-8)
    ostinato(P, 'outro', 0, lo='A3', vel=40, cresc=-4)
    bass(P, 'outro', 0, 'C2', vel=48)
    return P


# ------------------------------------------------------------------ mix + build
LEVELS = dict(lead=0, harm=-8, cnt=-6, ost=-12, pad=-9, smp=-16, low=-6.5, brass=-10, choir=-17, ww=-7)
SENDS = dict(lead=0.32, harm=0.38, cnt=0.36, ost=0.34, pad=0.48, smp=0.5, low=0.24, brass=0.5, choir=0.62, ww=0.42)
EQS = dict(lead=highpass(120), harm=chain(highpass(140), lowpass(8000)), cnt=highpass(55),
           ost=chain(highpass(110), lowpass(7000)), pad=chain(highpass(90), lowpass(7500)),
           smp=chain(highpass(130), lowpass(5000)), low=chain(highpass(32), lowpass(5000)),
           brass=chain(highpass(70), lowpass(5000)), choir=chain(highpass(220), lowpass(6000)),
           ww=chain(highpass(200), lowpass(9000)))
BATTLE = {'bgm_reminiscence': battle_reminiscence, 'bgm_long_ago': battle_long_ago}


def make(name):
    if name == 'title':
        return orch_title()
    if name in BATTLE:
        return BATTLE[name]()

    def arr(P, *a, **kw):
        CUR['E'] = Ensemble(P)
        orch_arrange(P, *a, **kw)
    lyric.arrange = arr
    return lyric.PIECES[name]()


def build(name):
    import time
    t = time.time()
    P = make(name)
    CUR['E'].finish()
    secs = orch.render(P, OUT + f'{name}.wav', LEVELS, SENDS, EQS, rt=2.9, wet=0.55)
    print(f'{name}: {secs:.1f}s  clashes={len(P.harmony_report())}  ({time.time() - t:.0f}s)', flush=True)


ALL = ['title'] + [k for k in lyric.PIECES if k != 'title'] + list(BATTLE)

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for n in (sys.argv[1:] or ALL):
        build(n)

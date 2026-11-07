"""ETHERION BGM v5 — 비장 · 웅장 · 서정 (v3.17).
Three new battle pieces on the v4 orchestra engine (orch.py / orchestra.py), written for strong dynamics:
  - single lines: an unaccompanied solo violin or solo cello (one player) — pp
  - chamber: solo + soft divided strings
  - tutti: violins in octaves, violas, cellos + basses driving pulse, horns on the tune, tremolo strings,
    wordless choir, sforzando chord hits — ff
Dynamics are real: every bus follows a per-piece gain curve (dB, applied before the hall so the reverb
tail stays natural), the bow pressure (velocity -> brightness) follows the same plan, and the master keeps
the range (no glue compression; only a peak limiter).
Still no piano / harp / bells / timpani / drums / plucks (README 편성 원칙).
Run: python3 epic.py [name ...]   (no args = all three)  -> out5/<name>.wav"""
import os, sys
import numpy as np
from scipy.signal import fftconvolve
from scipy.ndimage import minimum_filter1d, uniform_filter1d
import orchestra as O
from orchestra import (melody, strings_lead, harmony, pad, bass, ostinato, horns, horn_melody, choir,
                       counter_notes, wind, swell, sec_span, kind_for)
from kit import Piece, GM, midi, parse, chain, lowpass, highpass
from mix import nearest
import orch, kit
from orch import Ensemble, winds, SR, hall_ir, active_rms

OUT = os.environ.get('BGM_OUT', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out5/'))


# ------------------------------------------------------------------ engine additions
class Ens(Ensemble):
    """Ensemble + bowed tremolo (fast bow strokes) when self.trem (strokes / s) is set"""
    trem = None

    def __init__(self, P):
        super().__init__(P)
        for k in ('vln', 'vla', 'vc', 'cb'):   # calibrate before any tremolo is switched on
            self.calib(k)

    def player(self, kind, phrase, rng, **kw):
        i0, y = super().player(kind, phrase, rng, **kw)
        if self.trem:
            n = len(y)
            rate = self.trem * rng.uniform(0.92, 1.08) * (1 + 0.06 * orch.smooth_noise(n, 1.0, rng))
            ph = np.cumsum(rate) / SR + rng.uniform(0, 1)
            fr = ph % 1.0
            stroke = 0.38 + 0.62 * np.minimum(1.0, np.minimum(fr / 0.12, (1 - fr) / 0.25) + 0.25)
            y = (y * stroke).astype(np.float32)
        return i0, y


def E():
    return O.CUR['E']


def section_vel(P, name, k, v0, v1, lift=8, span=None):
    """bow pressure that moves from v0 to v1 over the section, with phrase swells"""
    t0, L = sec_span(P, name, k)
    span = span or 2 * P.meter
    return lambda t, p, d: v0 + (v1 - v0) * (t - t0) / L + lift * np.sin(np.pi * ((t - t0) % span) / span) + (p - 72) * 0.2


def solo(P, notes, kind, vf, pan=0.1, vib=None, bus='solo', gain=1.0):
    """one player alone: wider vibrato, slower slides — the single melodic line"""
    E().line(bus, kind, notes, n=1, vel_fn=vf, pan=pan, gain=gain, glide=0.09,
             vib=vib or {'vln': 22, 'vc': 19, 'vla': 20}[kind], attack=0.14, release=0.7, timing=0.0)


def section_line(P, notes, kind, vf, n=8, pan=0.15, bus='lead', gain=1.0, spread=0.45):
    E().line(bus, kind, notes, n=n, vel_fn=vf, pan=pan, spread=spread, gain=gain, glide=0.05)


def pulse(P, name, k, lo, v0, v1, pattern, players=(6, 4), cb=True, nbars=None):
    """cellos (+ basses) re-bow the chord bass in a rhythm — the driving 비장 pulse.
    pattern = [(offset, dur, accent)] per bar"""
    t0s, L = sec_span(P, name, k)
    notes = []
    for (t0, span, (root, q, bpc)) in P.each_chord(name, k, nbars):
        b = nearest(bpc, midi(lo))
        for (off, d, acc) in pattern:
            bar_off = (t0 % P.meter)
            if bar_off - 1e-6 <= off < bar_off + span - 1e-6:
                notes.append((t0 - bar_off + off, b, d, acc))
    vf_acc = {(round(t, 4), p): acc for (t, p, d, acc) in notes}
    vf = lambda t, p, d: v0 + (v1 - v0) * (t - t0s) / L + vf_acc.get((round(t, 4), p), 0)
    nn = [(t, p, d) for (t, p, d, a) in notes]
    E().line('pulse', 'vc', nn, n=players[0], vel_fn=vf, pan=-0.3, spread=0.3, legato=False, art_len=0.82,
             attack=0.035, release=0.18, vib=4, timing=0.008)
    if cb:
        E().line('pulse', 'cb', [(t, p - 12, d) for (t, p, d) in nn], n=players[1],
                 vel_fn=lambda t, p, d: vf(t, p + 12, d) - 2, pan=-0.1, spread=0.2, legato=False, art_len=0.82,
                 attack=0.045, release=0.22, vib=3, timing=0.008)


def tremolo(P, name, k, lo, hi, nvoices=4, v0=60, v1=80, rate=11.0, players=4, bus='trem'):
    """divided upper strings in bowed tremolo on the chords — shimmer and tension"""
    vs, _ = O.wide_voice(P, name, k, lo, hi, nvoices)
    t0s, L = sec_span(P, name, k)
    vf = lambda t, p, d: v0 + (v1 - v0) * (t - t0s) / L
    e = E()
    e.trem = rate
    for j in range(nvoices):
        line = [(t0, sorted(comb)[min(j, len(comb) - 1)], span) for (t0, span, comb) in vs]
        kind = kind_for(np.mean([p for (_, p, _) in line]))
        e.line(bus, kind, line, n=players, vel_fn=vf, pan=0.3 - 0.2 * j, spread=0.3, glide=0.04, attack=0.12,
               release=0.6, vib=6)
    e.trem = None


def hit(P, t, sym, vel=118, dur=1.5, lo='D2'):
    """sforzando tutti chord: short, accented, all strings + horns"""
    root, q, bpc = kit.chord(sym)
    e = E()
    b = nearest(bpc, midi(lo))
    voices = [('cb', b - 12 if b - 12 >= midi('E1') else b), ('vc', b), ('vc', b + 7), ('vla', b + 12),
              ('vla', b + 12 + (q[1])), ('vln', b + 24), ('vln', b + 24 + q[1]), ('vln', b + 31), ('vln', b + 36)]
    for kind, p in voices:
        e.line('hit', kind, [(t, p, dur)], n=4, vel=vel, pan={'cb': -0.15, 'vc': -0.35, 'vla': 0.0, 'vln': 0.3}[kind],
               spread=0.35, legato=False, art_len=1.0, attack=0.02, release=0.9, vib=6, timing=0.006)
    winds(P, 'brass', GM['horn'], [(t, b + 12, dur), (t, b + 12 + q[1], dur), (t, b + 19, dur), (t, b + 24, dur)],
          n=2, vel=min(127, vel), attack=0.04, release=0.8, legato=1.0, vibrato=2, gain=0.9)


def low_horns(P, name, k, v0, v1, gain=0.8):
    vs, _ = O.wide_voice(P, name, k, 'A2', 'A3', 2)
    t0s, L = sec_span(P, name, k)
    winds(P, 'brass', GM['horn'], [(t0, p, span) for (t0, span, comb) in vs for p in comb], n=2,
          vel_fn=lambda t, p, d: v0 + (v1 - v0) * (t - t0s) / L, pan=-0.3, spread=0.3, attack=0.3, release=0.9,
          legato=1.03, vibrato=2, gain=gain)


def drone(P, name, k, pitch, kind='cb', vel=46, players=3, bus='low', cresc=0):
    """one long held bass note under a solo line (the only accompaniment)"""
    t0, L = sec_span(P, name, k)
    E().line(bus, kind, [(t0, midi(pitch), L)], n=players, vel_fn=lambda t, p, d: vel, pan=-0.2, spread=0.2,
             attack=0.6, release=1.2, vib=5)


# ------------------------------------------------------------------ dynamics
def curve_from(P, pts):
    """pts = [(beat, dB)] -> per-sample linear gain (piece length + tail)"""
    N = P.song.length + P.song.tail
    xs = np.array([b * P.song.spb * SR for (b, _) in pts])
    ys = np.array([d for (_, d) in pts])
    db = np.interp(np.arange(N), xs, ys)
    return (10 ** (db / 20)).astype(np.float32)


def sec_pts(P, plan):
    """plan = [(name, k, frac, dB)] -> [(beat, dB)]"""
    out = []
    for (name, k, frac, db) in plan:
        t0, L = sec_span(P, name, k)
        out.append((t0 + frac * L, db))
    return out


def render(P, path, levels, sends, eqs, curve, rt=3.0, wet=0.5, loud_db=-13.0):
    """like orch.render but: each bus follows the dynamics curve before the hall; no glue compression;
    loudness is set on the loud passages (top 15 % of 0.4 s windows) so the quiet ones stay quiet"""
    song = P.song
    N = song.length + song.tail
    dry = np.zeros((N, 2), np.float32)
    wet_in = np.zeros_like(dry)
    for name, buf in song.buses.items():
        x = buf
        if name in eqs:
            x = eqs[name](x)
        r = active_rms(x)
        if r > 0 and name in levels:
            x = x * (10 ** (levels[name] / 20) * 0.1 / r)
        x = x * curve[:, None]
        dry += x
        wet_in += x * sends.get(name, 0.4)
    ir = hall_ir(rt)
    wetx = np.stack([fftconvolve(wet_in[:, c], ir[:, c])[:N] for c in range(2)], axis=1)
    mixx = dry + wetx * wet
    out = mixx[:song.length].copy()
    out[:song.tail] += mixx[song.length:song.length + song.tail]
    k = int(0.4 * SR)
    m = out.mean(axis=1)
    nw = len(m) // k
    pw = (m[:nw * k].reshape(nw, k) ** 2).mean(axis=1)
    loud = np.sqrt(np.mean(np.sort(pw)[-max(1, int(nw * 0.15)):]))
    out *= 10 ** (loud_db / 20) / loud
    pk = np.abs(out).max(axis=1)
    kk = int(0.01 * SR)
    lim = np.minimum(1.0, 0.92 / np.maximum(pk, 1e-9))
    lim = uniform_filter1d(minimum_filter1d(lim, size=2 * kk), size=2 * kk)
    out *= lim[:, None]
    kit.write_wav(path, out.astype(np.float32))
    return len(out) / SR


# ------------------------------------------------------------------ 1. 최후의 서약
def oath():
    """최후의 서약 — D minor 4/4, 66.
    solo cello | solo violin (p) | cellos sing, crescendo | TUTTI ff | solo violin alone | TUTTI fff | solo cello"""
    intro = ['Dm', 'Dm', 'Bb', 'A']
    A = ['Dm', 'Bb', 'F', 'A', 'Dm', 'Gm', 'Bb A7', 'Dm']
    B = ['Bb', 'C', 'Am', 'Dm', 'Gm', 'C', 'F', 'A']
    brk = ['Gm', 'Dm/F', 'Em7b5', 'A']
    coda = ['Dm', 'Bb', 'Gm A', 'Dm']
    P = Piece(66, 4, [('intro', intro), ('A', A), ('A', A), ('B', B), ('brk', brk), ('A', A), ('coda', coda)])
    O.CUR['E'] = e = Ens(P)
    melA = "A4:2 D5:1.5 E5:.5 F5:3 E5:.5 D5:.5 C5:2 A4:1 C5:1 E5:4 F5:2 G5:1 A5:1 Bb5:2.5 A5:.5 G5:1 F5:1.5 D5:.5 E5:1 C#5:1 D5:4"
    melB = "F5:2 Bb5:2 G5:2 E5:1 C5:1 E5:1.5 F5:.5 E5:1 C5:1 D5:3 A4:1 Bb4:1 D5:1 G5:2 G5:1.5 F5:.5 E5:2 F5:1 A5:1 C6:2 A5:4"
    hi = ('D3', 'D5')

    # intro — solo cello alone over a held low D
    m = melody(P, "D3:2 F3:1 A3:1 D4:3 C4:.5 A3:.5 Bb3:2 D4:1 F4:1 E4:3 C#4:1", 'intro', 0)
    solo(P, m, 'vc', section_vel(P, 'intro', 0, 52, 60, lift=10), pan=-0.15)
    drone(P, 'intro', 0, 'D2', vel=40)

    # A1 — solo violin sings, soft divided strings underneath
    m = melody(P, melA, 'A', 0)
    solo(P, m, 'vln', section_vel(P, 'A', 0, 58, 64, lift=12), pan=0.15)
    pv = pad(P, 'A', 0, *hi, n=4, vel=40, players=3, sample_layer=0.3)
    bass(P, 'A', 0, 'D2', vel=44, players=(4, 2))

    # A2 — the cello section takes the tune, violins counter, ostinato and horns come in: crescendo
    m = melody(P, melA, 'A', 1, shift=-12)
    section_line(P, m, 'vc', section_vel(P, 'A', 1, 62, 82, lift=10), n=6, pan=-0.2)
    cn = counter_notes(P, 'A', 1, 'D5', 'A5')
    e.line('cnt', 'vln', cn, n=8, vel_fn=section_vel(P, 'A', 1, 52, 74), pan=0.3, spread=0.35, glide=0.06)
    pv = pad(P, 'A', 1, *hi, n=5, vel=46, prev=pv, cresc=18, sample_layer=0.4)
    ostinato(P, 'A', 1, lo='A3', vel=44, cresc=16)
    horns(P, 'A', 1, 'F3', 'D4', n=3, vel=40, cresc=24)
    bass(P, 'A', 1, 'D2', vel=52, cresc=16)
    pulse(P, 'A', 1, 'D2', 50, 74, [(0, .5, 8), (.5, .5, 0), (1, .5, 0), (1.5, .5, 0), (2, .5, 6), (2.5, .5, 0),
                                    (3, .5, 0), (3.5, .5, 2)], nbars=None)

    # B — TUTTI: sforzando, violins in octaves, horns on the tune, choir, driving pulse
    hit(P, P.at('B'), 'Bb', vel=122, dur=1.0)
    m = melody(P, melB, 'B', 0)
    section_line(P, m, 'vln', section_vel(P, 'B', 0, 100, 108, lift=10), n=12)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vln', section_vel(P, 'B', 0, 94, 100), n=10, gain=0.75, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=88)
    horn_melody(P, m, vel=96, shift=-12, players=4, gain=1.0)
    cn = counter_notes(P, 'B', 0, 'C3', 'A4')
    e.line('cnt', 'vc', cn, n=6, vel_fn=section_vel(P, 'B', 0, 92, 100), pan=-0.3, spread=0.3, glide=0.06)
    pv = pad(P, 'B', 0, *hi, n=5, vel=80, prev=pv, cresc=10, sample_layer=0.5)
    horns(P, 'B', 0, 'F3', 'D4', n=4, vel=86, cresc=10)
    low_horns(P, 'B', 0, 84, 96)
    choir(P, 'B', 0, vel=80, cresc=14, gain=1.0)
    pulse(P, 'B', 0, 'D2', 96, 106, [(0, .5, 10), (.5, .5, 0), (1, .5, 2), (1.5, .5, 0), (2, .5, 8), (2.5, .5, 0),
                                     (3, .5, 2), (3.5, .5, 4)])
    tremolo(P, 'B', 0, 'A4', 'A5', 3, 70, 84, rate=10)

    # break — everything stops: the solo violin alone (one held low note only)
    m = melody(P, "D6:2 Bb5:1 G5:1 A5:2 F5:2 G5:1.5 F5:.5 E5:2 E5:2 C#5:2", 'brk', 0)
    solo(P, m, 'vln', section_vel(P, 'brk', 0, 56, 70, lift=10), pan=0.1)
    drone(P, 'brk', 0, 'G1', kind='cb', vel=38, players=2)

    # A3 — TUTTI fff: grand return, explosive entrance
    hit(P, P.at('A', 2), 'Dm', vel=126, dur=1.2)
    m = melody(P, melA, 'A', 2)
    section_line(P, m, 'vln', section_vel(P, 'A', 2, 108, 98, lift=10), n=12)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vla', section_vel(P, 'A', 2, 100, 92), n=8, gain=0.8, pan=0.0)
    section_line(P, [(t, p - 24, d) for (t, p, d) in m], 'vc', section_vel(P, 'A', 2, 100, 90), n=8, gain=0.8, pan=-0.25)
    horn_melody(P, m, vel=100, shift=-12, players=4)
    pv = pad(P, 'A', 2, *hi, n=5, vel=84, prev=pv, cresc=-14, sample_layer=0.5)
    horns(P, 'A', 2, 'F3', 'D4', n=4, vel=90, cresc=-16)
    low_horns(P, 'A', 2, 96, 80)
    choir(P, 'A', 2, vel=84, cresc=-16)
    pulse(P, 'A', 2, 'D2', 108, 90, [(0, .5, 10), (.5, .5, 0), (1, .5, 2), (1.5, .5, 0), (2, .5, 8), (2.5, .5, 0),
                                     (3, .5, 2), (3.5, .5, 4)])
    tremolo(P, 'A', 2, 'D5', 'D6', 3, 84, 66, rate=11)

    # coda — solo cello remembers, everything fades
    m = melody(P, "A3:2 F3:1 D3:1 D3:2 F3:2 G3:2 E3:2 D3:4", 'coda', 0)
    solo(P, m, 'vc', section_vel(P, 'coda', 0, 56, 46, lift=8), pan=-0.15)
    pad(P, 'coda', 0, *hi, n=4, vel=38, prev=pv, cresc=-8, players=3, sample_layer=0.3)

    plan = [('intro', 0, 0, -8), ('intro', 0, 1, -6), ('A', 0, 0, -7), ('A', 0, 1, -6),
            ('A', 1, 0, -7), ('A', 1, 1, -2), ('B', 0, 0, 0), ('B', 0, 0.98, -0.5),
            ('brk', 0, 0.02, -7), ('brk', 0, 0.85, -5), ('brk', 0, 1.0, -3), ('A', 2, 0.02, 1),
            ('A', 2, 0.85, -2), ('A', 2, 1, -4), ('coda', 0, 0.08, -5), ('coda', 0, 1, -9)]
    return P, sec_pts(P, plan)


# ------------------------------------------------------------------ 2. 잿빛 깃발 아래
def banner():
    """잿빛 깃발 아래 — C minor 4/4, 88. march-like pulse that grows from nothing.
    pulse alone | solo cello over the pulse | violins + horns | TUTTI ff | solo violin alone | TUTTI fff | pulse fades"""
    intro = ['Cm', 'Cm', 'Ab', 'G']
    A = ['Cm', 'Ab', 'Eb', 'Bb', 'Fm', 'Cm', 'Ab G', 'Cm']
    B = ['Ab', 'Bb', 'Eb', 'Cm', 'Fm', 'Bb', 'Ab', 'G']
    brk = ['Cm', 'Ab', 'Fm', 'G']
    coda = ['Cm', 'Ab', 'Fm G', 'Cm']
    P = Piece(88, 4, [('intro', intro), ('A', A), ('A', A), ('B', B), ('brk', brk), ('B', B), ('coda', coda)])
    O.CUR['E'] = e = Ens(P)
    melA = "G4:1.5 C5:.5 D5:.5 Eb5:1.5 Eb5:1 D5:.5 C5:.5 Ab4:2 G4:1 Bb4:1 Eb5:1.5 F5:.5 D5:4 C5:1.5 F5:.5 Ab5:2 G5:1.5 F5:.5 Eb5:1.5 D5:.5 C5:2 B4:2 C5:4"
    melB = "Eb5:2 Ab5:2 Bb5:2 F5:1 D5:1 Eb5:1.5 F5:.5 G5:2 G5:3 Eb5:1 F5:1 Ab5:1 C6:2 Bb5:1.5 Ab5:.5 F5:2 Eb5:1 C5:1 Eb5:1 Ab5:1 G5:4"
    hi = ('C3', 'C5')
    march = [(0, 1, 8), (1, .5, 0), (1.5, .5, 0), (2, 1, 5), (3, .5, 0), (3.5, .5, 2)]

    # intro — the pulse alone, growing; a held violin harmonic-like high G joins
    pulse(P, 'intro', 0, 'C2', 50, 66, march)
    e.line('pad', 'vln', [(P.at('intro') + 8, midi('G5'), 8)], n=4, vel=40, pan=0.3, spread=0.3, attack=1.2,
           release=1.0, vib=5)

    # A1 — solo cello sings over the pulse
    m = melody(P, melA, 'A', 0, shift=-12)
    solo(P, m, 'vc', section_vel(P, 'A', 0, 64, 70, lift=10), pan=-0.1)
    pulse(P, 'A', 0, 'C2', 60, 66, march, players=(5, 3))
    pv = pad(P, 'A', 0, *hi, n=4, vel=40, players=3, sample_layer=0.3)

    # A2 — violin section, viola 3rd below, horns grow, cello counter: crescendo
    m = melody(P, melA, 'A', 1)
    section_line(P, m, 'vln', section_vel(P, 'A', 1, 70, 88, lift=10), n=10)
    harmony(P, m, 'A', kind='vla', n=5, vel=64)
    cn = counter_notes(P, 'A', 1, 'C3', 'A4')
    e.line('cnt', 'vc', cn, n=6, vel_fn=section_vel(P, 'A', 1, 62, 82), pan=-0.3, spread=0.3, glide=0.06)
    pv = pad(P, 'A', 1, *hi, n=5, vel=48, prev=pv, cresc=18, sample_layer=0.4)
    horns(P, 'A', 1, 'Eb3', 'C4', n=3, vel=44, cresc=28)
    pulse(P, 'A', 1, 'C2', 66, 88, march)

    # B — TUTTI
    hit(P, P.at('B', 0), 'Ab', vel=122, dur=1.0)
    m = melody(P, melB, 'B', 0)
    section_line(P, m, 'vln', section_vel(P, 'B', 0, 100, 108), n=12)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vln', section_vel(P, 'B', 0, 94, 100), n=10, gain=0.75, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=90)
    horn_melody(P, m, vel=98, shift=-12, players=4)
    pv = pad(P, 'B', 0, *hi, n=5, vel=82, prev=pv, cresc=10, sample_layer=0.5)
    horns(P, 'B', 0, 'Eb3', 'C4', n=4, vel=88, cresc=8)
    low_horns(P, 'B', 0, 86, 96)
    choir(P, 'B', 0, 'C4', 'C5', vel=80, cresc=12)
    pulse(P, 'B', 0, 'C2', 100, 108, march)
    tremolo(P, 'B', 0, 'G4', 'G5', 3, 70, 84, rate=11)

    # break — solo violin alone over one low C
    m = melody(P, "C6:2 G5:1 Eb5:1 Eb5:2 C5:2 F5:2 Ab5:1 C6:1 D6:2 B5:2", 'brk', 0)
    solo(P, m, 'vln', section_vel(P, 'brk', 0, 58, 72, lift=10), pan=0.1)
    drone(P, 'brk', 0, 'C2', kind='cb', vel=38, players=2)

    # B2 — TUTTI fff: violins an octave higher, cellos on the tune, tremolo, choir
    hit(P, P.at('B', 1), 'Ab', vel=127, dur=1.2)
    m = melody(P, melB, 'B', 1)
    section_line(P, m, 'vln', section_vel(P, 'B', 1, 108, 100), n=12)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vla', section_vel(P, 'B', 1, 100, 94), n=8, gain=0.8, pan=0.0)
    section_line(P, [(t, p - 24, d) for (t, p, d) in m], 'vc', section_vel(P, 'B', 1, 102, 94), n=8, gain=0.8, pan=-0.25)
    horn_melody(P, m, vel=102, shift=-12, players=4)
    pv = pad(P, 'B', 1, *hi, n=5, vel=86, prev=pv, cresc=-10, sample_layer=0.5)
    horns(P, 'B', 1, 'Eb3', 'C4', n=4, vel=92, cresc=-10)
    low_horns(P, 'B', 1, 98, 86)
    choir(P, 'B', 1, 'C4', 'C5', vel=86, cresc=-10)
    pulse(P, 'B', 1, 'C2', 108, 96, march)
    tremolo(P, 'B', 1, 'C5', 'C6', 3, 84, 70, rate=12)

    # coda — the pulse alone again, dying away; solo cello's last phrase
    pulse(P, 'coda', 0, 'C2', 70, 48, march, players=(5, 3))
    m = melody(P, "G3:2 Eb3:2 C3:2 Eb3:2 F3:2 D3:2 C3:4", 'coda', 0)
    solo(P, m, 'vc', section_vel(P, 'coda', 0, 60, 48, lift=8), pan=-0.1)

    plan = [('intro', 0, 0, -8), ('intro', 0, 1, -6), ('A', 0, 0, -7), ('A', 0, 1, -6),
            ('A', 1, 0, -7), ('A', 1, 1, -2), ('B', 0, 0, 0), ('B', 0, 0.98, -0.5),
            ('brk', 0, 0.02, -7), ('brk', 0, 0.85, -5), ('brk', 0, 1.0, -3), ('B', 1, 0.02, 1),
            ('B', 1, 0.85, -2), ('B', 1, 1, -4), ('coda', 0, 0.08, -6), ('coda', 0, 1, -13)]
    return P, sec_pts(P, plan)


# ------------------------------------------------------------------ 3. 별이 진 자리
def fallen_star():
    """별이 진 자리 — B minor 3/4, 60. elegy.
    unaccompanied solo violin | solo cello + soft strings | violin & cello duet, swelling | TUTTI ff |
    TUTTI grand, then dying | solo violin & solo cello"""
    intro = ['Bm', 'G', 'Em', 'F#']
    A = ['Bm', 'G', 'D', 'A', 'G', 'Em', 'F#7', 'Bm']
    B = ['G', 'A', 'D', 'Bm', 'Em', 'F#m', 'G', 'F#']
    coda = ['Bm', 'G', 'F#', 'Bm']
    P = Piece(60, 3, [('intro', intro), ('A', A), ('A', A), ('B', B), ('A', A), ('coda', coda)])
    O.CUR['E'] = e = Ens(P)
    melA = "F#4:1 B4:1.5 C#5:.5 D5:2 B4:1 F#5:2 E5:.5 D5:.5 E5:3 G5:2 D5:1 E5:1.5 F#5:.5 G5:1 F#5:1.5 E5:.5 C#5:1 B4:3"
    melB = "D5:1 G5:1 B5:1 A5:2 E5:1 F#5:1.5 G5:.5 A5:1 B5:2 F#5:1 G5:1.5 F#5:.5 E5:1 C#6:2 A5:1 B5:1.5 A5:.5 G5:1 F#5:3"
    hi = ('B2', 'B4')

    # intro — the violin alone, nothing else
    m = melody(P, "B5:1.5 A5:.5 F#5:1 G5:2 D5:1 E5:1 G5:1 B5:1 A#5:2 F#5:1", 'intro', 0)
    solo(P, m, 'vln', section_vel(P, 'intro', 0, 56, 64, lift=12, span=6), pan=0.1)

    # A1 — solo cello sings (an octave down), the violin answers with long notes, soft strings
    m = melody(P, melA, 'A', 0, shift=-12)
    solo(P, m, 'vc', section_vel(P, 'A', 0, 60, 66, lift=10, span=6), pan=-0.15)
    cn = counter_notes(P, 'A', 0, 'D5', 'B5', split=False)
    solo(P, cn, 'vln', section_vel(P, 'A', 0, 46, 54, lift=6, span=6), pan=0.2, bus='solo2')
    pv = pad(P, 'A', 0, *hi, n=4, vel=36, players=3, sample_layer=0.25)

    # A2 — violin section sings, cello section counter, horns and choir begin: swelling
    m = melody(P, melA, 'A', 1)
    section_line(P, m, 'vln', section_vel(P, 'A', 1, 66, 86, lift=10, span=6), n=10)
    harmony(P, m, 'A', kind='vla', n=5, vel=60)
    cn = counter_notes(P, 'A', 1, 'B2', 'G4')
    e.line('cnt', 'vc', cn, n=6, vel_fn=section_vel(P, 'A', 1, 62, 84, span=6), pan=-0.3, spread=0.3, glide=0.07)
    pv = pad(P, 'A', 1, *hi, n=5, vel=44, prev=pv, cresc=20, sample_layer=0.4)
    horns(P, 'A', 1, 'D3', 'B3', n=3, vel=40, cresc=26)
    bass(P, 'A', 1, 'B1', vel=50, cresc=18, players=(5, 3))
    ostinato(P, 'A', 1, lo='F#3', vel=40, cresc=18)

    # B — TUTTI ff
    hit(P, P.at('B'), 'G', vel=120, dur=1.0, lo='G1')
    m = melody(P, melB, 'B', 0)
    section_line(P, m, 'vln', section_vel(P, 'B', 0, 100, 108, span=6), n=12)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vln', section_vel(P, 'B', 0, 94, 100, span=6), n=10, gain=0.75, pan=0.0)
    harmony(P, m, 'B', kind='vla', n=6, vel=88)
    horn_melody(P, m, vel=96, shift=-12, players=4)
    cn = counter_notes(P, 'B', 0, 'B2', 'G4')
    e.line('cnt', 'vc', cn, n=6, vel_fn=section_vel(P, 'B', 0, 92, 100, span=6), pan=-0.3, spread=0.3, glide=0.06)
    pv = pad(P, 'B', 0, *hi, n=5, vel=80, prev=pv, cresc=8, sample_layer=0.5)
    horns(P, 'B', 0, 'D3', 'B3', n=4, vel=86, cresc=8)
    low_horns(P, 'B', 0, 84, 96)
    choir(P, 'B', 0, 'B3', 'B4', vel=80, cresc=12)
    pulse(P, 'B', 0, 'B1', 96, 106, [(0, 1, 10), (1, .5, 0), (1.5, .5, 2), (2, .5, 4), (2.5, .5, 0)])
    tremolo(P, 'B', 0, 'F#4', 'F#5', 3, 70, 84, rate=10)

    # A3 — grand: violins an octave up, cellos on the tune, choir; then it dies down to pp
    hit(P, P.at('A', 2), 'Bm', vel=124, dur=1.2, lo='B1')
    m = melody(P, melA, 'A', 2)
    up = [(t, p + 12, d) for (t, p, d) in m]
    section_line(P, up, 'vln', section_vel(P, 'A', 2, 106, 70, span=6), n=12)
    section_line(P, m, 'vln', section_vel(P, 'A', 2, 100, 66, span=6), n=8, gain=0.75, pan=0.0)
    section_line(P, [(t, p - 12, d) for (t, p, d) in m], 'vc', section_vel(P, 'A', 2, 100, 66, span=6), n=8, gain=0.8, pan=-0.25)
    horn_melody(P, m, vel=96, shift=-12, players=4, gain=0.9)
    pv = pad(P, 'A', 2, *hi, n=5, vel=84, prev=pv, cresc=-36, sample_layer=0.5)
    horns(P, 'A', 2, 'D3', 'B3', n=4, vel=88, cresc=-40)
    choir(P, 'A', 2, 'B3', 'B4', vel=84, cresc=-40)
    bass(P, 'A', 2, 'B1', vel=96, cresc=-40, players=(6, 4))
    tremolo(P, 'A', 2, 'B4', 'B5', 3, 80, 50, rate=11)

    # coda — solo cello and solo violin, a last duet
    m = melody(P, "B3:2 F#3:1 G3:2 D3:1 A#2:1.5 C#3:1.5 B2:3", 'coda', 0)
    solo(P, m, 'vc', section_vel(P, 'coda', 0, 58, 48, lift=8, span=6), pan=-0.15)
    solo(P, parse("D5:3 D5:3 C#5:3 B4:3", P.at('coda'))[0], 'vln', section_vel(P, 'coda', 0, 50, 42, lift=6, span=6),
         pan=0.2, bus='solo2')
    pad(P, 'coda', 0, *hi, n=4, vel=34, prev=pv, cresc=-6, players=3, sample_layer=0.2)

    plan = [('intro', 0, 0, -6), ('intro', 0, 1, -5), ('A', 0, 0, -7), ('A', 0, 1, -6),
            ('A', 1, 0, -7), ('A', 1, 1, -2), ('B', 0, 0, 0), ('B', 0, 0.98, -0.5),
            ('A', 2, 0.02, 1), ('A', 2, 0.4, -1), ('A', 2, 1, -6), ('coda', 0, 0, -5), ('coda', 0, 1, -9)]
    return P, sec_pts(P, plan)


# ------------------------------------------------------------------ mix + build
LEVELS = dict(O.LEVELS, solo=0, solo2=-7, pulse=-8, trem=-12, hit=-6, brass=-8, choir=-15)
SENDS = dict(O.SENDS, solo=0.42, solo2=0.45, pulse=0.2, trem=0.45, hit=0.4)
EQS = dict(O.EQS, solo=highpass(70), solo2=highpass(150), pulse=chain(highpass(35), lowpass(4500)),
           trem=chain(highpass(250), lowpass(8000)), hit=chain(highpass(35), lowpass(7000)))
PIECES = {'bgm_last_oath': oath, 'bgm_ashen_banner': banner, 'bgm_fallen_star': fallen_star}


def build(name):
    import time
    t = time.time()
    P, pts = PIECES[name]()
    O.CUR['E'].finish()
    curve = curve_from(P, pts)
    secs = render(P, OUT + f'{name}.wav', LEVELS, SENDS, EQS, curve, rt=3.1, wet=0.52)
    print(f'{name}: {secs:.1f}s  clashes={P.harmony_report()}  ({time.time() - t:.0f}s)', flush=True)


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for n in (sys.argv[1:] or list(PIECES)):
        build(n)

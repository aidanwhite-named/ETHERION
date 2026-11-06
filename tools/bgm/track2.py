"""ETHERION BGM 2 — '먼 옛날의 오후' (original). Acoustic-café style piano + violin + cello, F major, 84 BPM, seamless loop.
Mood reference: warm, nostalgic new-age instrumental. All melodies original."""
import numpy as np
from sf2 import SF2, SR
from mix import Song, parse, chord, nearest, lowpass, highpass, chain, master, write_wav, midi

sf = SF2('/usr/share/sounds/sf2/TimGM6mb.sf2')
BPM = 84
PIANO, VIOLIN, CELLO, STR, GUITAR = 0, 40, 42, 49, 24

# each bar: one chord, or two chords split at beat 3 ('Gm7 C')
intro = ['Fmaj7', 'Bbmaj7', 'Fmaj7', 'Csus4 C']
A = ['F', 'C/E', 'Dm', 'Bb', 'F/C', 'Bb', 'Gm7 C', 'F']
B = ['Bb', 'C', 'Am', 'Dm', 'Gm', 'C', 'F/A Bb', 'Csus4 C']
tag = ['Bb', 'C', 'Fmaj7', 'Csus4 C']
bars = intro + A + A + B + A + tag              # 4+8+8+8+8+4 = 40 bars
SEC = {'intro': 0, 'A1': 4, 'A2': 12, 'B': 20, 'A3': 28, 'tag': 36}
song = Song(BPM, len(bars) * 4, sf)

mel_A = ("A4:1.5 G4:.5 F4 A4 | C5:2 G4:2 | A4 D5 C5 A4 | Bb4:1.5 A4:.5 G4:2 | "
         "A4:1.5 G4:.5 F4 A4 | D5:2 C5 Bb4 | Bb4 A4 G4 E4 | F4:3 r")
mel_A_var = ("A4:1.5 G4:.5 F4 A4 | C5:2 G4:1.5 G4:.5 | A4 D5 C5 F5 | E5:1.5 D5:.5 C5:2 | "
             "A4:1.5 G4:.5 F4 A4 | D5:2 C5 Bb4 | Bb4 D5 C5:1.5 E4:.5 | F4:4")
mel_B = ("D5:1.5 C5:.5 Bb4 D5 | E5:1.5 D5:.5 C5:2 | C5 E5 A5:1.5 G5:.5 | F5:3 D5 | "
         "D5 Bb4 D5 G5 | G5:1.5 F5:.5 E5 C5 | F5 E5 D5 F5 | G5:2 E5:2")
mel_tag = "D5:2 C5:2 | Bb4 C5 E5:2 | F5:4 | r:4"


def swell(base, lift=12):
    def f(t, p, d):
        return base + lift * np.sin(np.pi * ((t % 8) / 8.0)) + (p - 72) * 0.5
    return f


VIOLIN_KW = dict(attack=0.08, release=0.35, vibrato=13, vib_rate=5.6, vib_delay=0.2)
CELLO_KW = dict(attack=0.11, release=0.45, vibrato=10, vib_rate=5.0, vib_delay=0.25)
PIANO_KW = dict(attack=0.003, release=0.55, decay=1.5, sustain=0.22)

# ---- A1: the piano sings the tune (an octave up, music-box gentle) ----
m, _ = parse(mel_A, SEC['A1'] * 4)
song.add('pno', [(t, p + 12, d + 0.4) for (t, p, d) in m], PIANO, pan=0.05, gain=4.2,
         vel_fn=swell(74, 10), human=0.01, **PIANO_KW)

# ---- A2: violin takes the tune (variation), cello long bass ----
m, _ = parse(mel_A_var, SEC['A2'] * 4)
song.add('vln', m, VIOLIN, pan=0.24, legato=1.06, vel_fn=swell(76), **VIOLIN_KW)

# ---- B: violin up high, cello counter-melody ----
m, _ = parse(mel_B, SEC['B'] * 4)
song.add('vln', m, VIOLIN, pan=0.24, legato=1.06, vel_fn=swell(86), **VIOLIN_KW)
cello_counter = "Bb2:4 | C3:2 E3:2 | A2:2 C3:2 | D3:3 F3 | G2:2 Bb2:2 | C3:2 E3 G3 | A3:2 Bb3:2 | C3:2 C3:2"
m, _ = parse(cello_counter, SEC['B'] * 4)
song.add('vc', m, CELLO, pan=-0.3, gain=1.0, legato=1.04, vel_fn=swell(78, 10), **CELLO_KW)

# ---- A3: violin tune + cello a sixth/third below in places (warm duet) ----
m, _ = parse(mel_A, SEC['A3'] * 4)
song.add('vln', m, VIOLIN, pan=0.24, legato=1.06, vel_fn=swell(80), **VIOLIN_KW)
duet = "F3:1.5 E3:.5 D3 F3 | E3:2 C3:2 | F3 Bb3 A3 F3 | D3:1.5 F3:.5 E3:2 | " \
       "F3:1.5 E3:.5 C3 F3 | Bb3:2 A3 G3 | D3 C3 Bb2 C3 | A2:3 r"
m, _ = parse(duet, SEC['A3'] * 4)
song.add('vc', m, CELLO, pan=-0.3, gain=0.95, legato=1.05, vel_fn=swell(74, 10), **CELLO_KW)

# ---- tag ----
m, _ = parse(mel_tag, SEC['tag'] * 4)
song.add('vln', m, VIOLIN, pan=0.24, legato=1.06, vel_fn=swell(70, 8), **VIOLIN_KW)

# ---- cello: soft long bass under A2 ----
def bass(chords, start_bar, vel=66):
    notes = []
    for i, c in enumerate(chords):
        parts = c.split()
        for j, cc in enumerate(parts):
            _, _, b = chord(cc)
            mm = nearest(b, midi('E2'))
            dur = 4 / len(parts)
            notes.append(((start_bar + i) * 4 + j * dur, mm, dur))
    song.add('vc', notes, CELLO, pan=-0.3, gain=0.85, legato=1.02, vel=vel, **CELLO_KW)

bass(A, SEC['A2'], vel=64)
bass(tag, SEC['tag'], vel=58)

# ---- piano accompaniment: lilting "bass – chord – 5th – chord" eighth pattern ----
def accomp(chords, start_bar, vel=58, sparse=False):
    notes = []
    for i, c in enumerate(chords):
        parts = c.split()
        for j, cc in enumerate(parts):
            root, q, b = chord(cc)
            span = 4 / len(parts)
            t0 = (start_bar + i) * 4 + j * span
            bass_n = nearest(b, midi('F2'))
            if bass_n > midi('D3'):
                bass_n -= 12
            tones = sorted({nearest((root + iv) % 12, midi('A3')) for iv in q})
            # eighth-note figure: bass, 5th above bass, chord tones rising, then back
            fig = [bass_n, bass_n + 7, tones[0], tones[1], tones[-1], tones[1], tones[0], bass_n + 12]
            steps = int(span / 0.5)
            for k in range(steps):
                if sparse and k % 2 == 1 and k not in (3, 5):
                    continue
                ring = 1.0 if k else span
                if k in (2, 3, 4):
                    ring = span - k * 0.5 + 0.1
                notes.append((t0 + k * 0.5, fig[k % 8], ring))
    def pv(t, p, d):
        k = (t % 4) / 0.5
        return vel + (9 if k == 0 else 3 if k == 4 else 0) - (p - 58) * 0.3
    song.add('pno', notes, PIANO, pan=-0.12, gain=4.0, vel_fn=pv, human=0.009, **PIANO_KW)

accomp(intro, SEC['intro'], vel=62)
accomp(A, SEC['A1'], vel=56, sparse=True)
accomp(A, SEC['A2'], vel=58)
accomp(B, SEC['B'], vel=64)
accomp(A, SEC['A3'], vel=60)
accomp(tag, SEC['tag'], vel=56)

# intro: a little piano motif in the high register (hints at the tune, not the tune itself)
m, _ = parse("r:2 C6:.5 A5:.5 F5 | r:2 D6:.5 C6:.5 Bb5 | r:2 C6:.5 A5:.5 G5:.5 A5:.5 | G5:2 r:2", SEC['intro'] * 4)
song.add('pno', [(t, p, d + 0.6) for (t, p, d) in m], PIANO, pan=0.05, gain=3.4, vel=56, **PIANO_KW)

# ---- nylon guitar: gentle off-beat strums in B and A3 for café warmth ----
def strum(chords, start_bar, vel=48):
    notes = []
    for i, c in enumerate(chords):
        parts = c.split()
        for j, cc in enumerate(parts):
            root, q, b = chord(cc)
            span = 4 / len(parts)
            t0 = (start_bar + i) * 4 + j * span
            tones = sorted({nearest((root + iv) % 12, midi('G3')) for iv in q})
            for beat in np.arange(1.0, span, 2.0):
                for k, tn in enumerate(tones):
                    notes.append((t0 + beat + k * 0.018, tn, 0.9))
    song.add('gtr', notes, GUITAR, pan=0.38, gain=1.3, vel=vel, human=0.004,
             attack=0.002, release=0.3, decay=0.8, sustain=0.3)

strum(B, SEC['B'], vel=52)
strum(A, SEC['A3'], vel=46)

# ---- string pad behind B and A3 ----
def pad(chords, start_bar, vel=50):
    notes = []
    for i, c in enumerate(chords):
        root, q, b = chord(c.split()[0])
        for iv in q[:3]:
            notes.append(((start_bar + i) * 4, nearest((root + iv) % 12, midi('F3')), 4))
    song.add('pad', notes, STR, gain=1.4, legato=1.04, vel=vel, attack=0.7, release=1.3)

pad(B, SEC['B'], vel=56)
pad(A, SEC['A3'], vel=46)

eq = {
    'vln': chain(highpass(230), lowpass(6800)),
    'vc': chain(highpass(55), lowpass(4200)),
    'pno': chain(highpass(45), lowpass(10000)),
    'gtr': chain(highpass(120), lowpass(7000)),
    'pad': chain(highpass(150), lowpass(3500)),
}
out = song.render(sends={'vln': 0.38, 'vc': 0.3, 'pno': 0.28, 'gtr': 0.25, 'pad': 0.5}, eq=eq,
                  rev_time=2.3, rev_mix=0.5)
out = master(out)
write_wav('/home/claude/bgm/out/bgm_long_ago.wav', out)
print('len', len(out) / SR, 's  peak', float(np.abs(out).max()))

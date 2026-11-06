"""ETHERION BGM 1 — '빛바랜 기억' (original). Violin + Cello + Piano trio, D minor, 76 BPM, seamless loop.
Mood reference: wistful MMORPG string-trio OST. All melodies original."""
import numpy as np
from sf2 import SF2, SR
from mix import Song, parse, chord, nearest, lowpass, highpass, chain, master, write_wav, midi

sf = SF2('/usr/share/sounds/sf2/TimGM6mb.sf2')
BPM = 76
PIANO, VIOLIN, CELLO, STR, HARP = 0, 40, 42, 49, 46

intro = ['Dm', 'Bb', 'Gm', 'A7']
A = ['Dm', 'Bb', 'F', 'C', 'Gm', 'Dm/F', 'Em7b5', 'A7']
A2 = ['Dm', 'Bb', 'F', 'C', 'Gm', 'Dm/F', 'A7', 'Dm']
B = ['Bbmaj7', 'C', 'Am', 'Dm', 'Gm', 'C', 'F', 'A7']  # last bar: sus4 -> 7 via melody
outro = ['Dm', 'Bb', 'Gm', 'A7']
bars = intro + A + A2 + B + A + outro          # 4+8+8+8+8+4 = 40 bars
SEC = {'intro': 0, 'A1': 4, 'A2': 12, 'B': 20, 'A3': 28, 'outro': 36}
song = Song(BPM, len(bars) * 4, sf)

mel_A = ("A4:1.5 D5:.5 E5 F5 | F5:1.5 E5:.5 D5:2 | C5 A4 C5 F5 | E5:2.5 D5:.5 C5 | "
         "Bb4:1.5 D5:.5 G5:2 | F5 E5:.5 D5:.5 A4:2 | G4 Bb4 D5:1.5 E5:.5 | C#5:3 A4")
mel_A2_end = "E4 G4 A4 C#5 | D5:4"   # replaces last two bars when resolving
mel_B = ("D5 F5 Bb5:2 | A5:1.5 G5:.5 E5:2 | E5 A5 C6:1.5 B5:.5 | A5:3 F5 | "
         "G5:1.5 A5:.5 Bb5 D6 | C6:1.5 Bb5:.5 G5:2 | A5 G5:.5 F5:.5 C5 F5 | E5:2 C#5:2")


def mel(s):
    return s.replace('|', ' ')


def phrase_vel(base, span=8, lift=14):
    """swell within each 2-bar phrase + overall section arc"""
    def f(t, p, d):
        ph = (t % 8) / 8.0
        return base + lift * np.sin(np.pi * ph) + (p - 72) * 0.6
    return f


VIOLIN_KW = dict(attack=0.09, release=0.35, vibrato=14, vib_rate=5.4, vib_delay=0.22)
CELLO_KW = dict(attack=0.12, release=0.45, vibrato=11, vib_rate=4.9, vib_delay=0.28)

# ---- violin melody: A1 (soft), B (full), A3 (full) ----
v, _ = parse(mel(mel_A), SEC['A1'] * 4)
song.add('vln', v, VIOLIN, pan=0.22, gain=1.0, legato=1.06, vel_fn=phrase_vel(70), **VIOLIN_KW)
v, _ = parse(mel(mel_B), SEC['B'] * 4)
song.add('vln', v, VIOLIN, pan=0.22, gain=1.0, legato=1.06, vel_fn=phrase_vel(84), **VIOLIN_KW)
v, _ = parse(mel(mel_A), SEC['A3'] * 4)
song.add('vln', v, VIOLIN, pan=0.22, gain=1.0, legato=1.06, vel_fn=phrase_vel(80), **VIOLIN_KW)

# ---- A2: cello sings the melody an octave lower, violin answers with long counter-notes ----
a2 = mel(mel_A).split()
a2_body = ' '.join(a2[:a2.index('G4')])  # first 6 bars
cm, t = parse(a2_body, SEC['A2'] * 4)
cm2, _ = parse(mel_A2_end, t)
cm = [(t0, p - 12, d) for (t0, p, d) in cm + cm2]
song.add('vc', cm, CELLO, pan=-0.28, gain=1.05, legato=1.05, vel_fn=phrase_vel(82, lift=12), **CELLO_KW)
counter = "r:2 F5:2 | D5:4 | A5:4 | G5:4 | Bb5:2 A5:2 | A5:4 | A5:2 G5:2 | F5:4"
v, _ = parse(mel(counter), SEC['A2'] * 4)
song.add('vln', v, VIOLIN, pan=0.22, gain=0.62, legato=1.0, vel=66, **VIOLIN_KW)

# ---- cello bass line (long tones following chord bass) in intro, A1, B, A3, outro ----
def bass_line(chords, start_bar, pattern='whole', vel=74):
    notes = []
    for i, c in enumerate(chords):
        _, _, b = chord(c)
        m = nearest(b, midi('C2'))
        if m < midi('D2'):
            m += 12
        t = (start_bar + i) * 4
        if pattern == 'whole':
            notes.append((t, m, 4))
        else:  # half + walk to fifth
            notes.append((t, m, 2.5))
            notes.append((t + 2.5, m + 7 if m + 7 < midi('A3') else m - 5, 1.5))
    song.add('vc', notes, CELLO, pan=-0.28, gain=0.85, legato=1.02, vel=vel, **CELLO_KW)

bass_line(intro, SEC['intro'], vel=60)
bass_line(A, SEC['A1'], vel=68)
bass_line(B, SEC['B'], pattern='walk', vel=80)
bass_line(A, SEC['A3'], pattern='walk', vel=76)
bass_line(outro, SEC['outro'], vel=62)

# ---- piano: flowing broken chords, pedal per half bar ----
def piano(chords, start_bar, dens=8, vel=60, top='A4'):
    notes = []
    for i, c in enumerate(chords):
        root, q, b = chord(c)
        bass = nearest(b, midi('D2'))
        if bass > midi('C3'):
            bass -= 12
        lo = bass + 12
        tones = sorted({nearest((root + iv) % 12, lo) for iv in q})
        if len(tones) < 4:
            tones.append(tones[0] + 12)
        up = [tones[0], tones[1], tones[2], tones[3] if len(tones) > 3 else tones[0] + 12]
        hi = up[-1] + (12 if up[-1] < midi(top) - 6 else 0)
        pat = [bass, up[0] + 7 if (up[0] + 7) not in up else up[1], up[1], up[2], hi, up[2], up[1], up[0] + 12 if up[0]+12 != hi else up[3]]
        t0 = (start_bar + i) * 4
        for k in range(8):
            ring = (4 - (k % 4) * 0.5) if k < 4 else (4 - k * 0.5)  # sustain to half-bar pedal change
            ring = (2.0 - (k % 4) * 0.5) + 0.15
            if k == 0:
                ring = 4.0
            notes.append((t0 + k * 0.5, pat[k], ring))
    def pv(t, p, d):
        k = (t % 4) / 0.5
        accent = 10 if k == 0 else (4 if k == 4 else 0)
        return vel + accent - (p - 60) * 0.25
    song.add('pno', notes, PIANO, pan=-0.08, gain=3.9, legato=1.0, vel_fn=pv, human=0.008,
             attack=0.003, release=0.5, decay=1.6, sustain=0.25)

piano(intro, SEC['intro'], vel=66)
piano(A, SEC['A1'], vel=58)
piano(A2, SEC['A2'], vel=60)
piano(B, SEC['B'], vel=66)
piano(A, SEC['A3'], vel=62)
piano(outro, SEC['outro'], vel=60)

# piano picks out a soft echo of the melody in the intro (high register, sparse)
echo, _ = parse("r:2 A5:1 D6:1 | F6:3 E6:1 | D6:2 Bb5:2 | A5:3 C#6:1", SEC['intro'] * 4)
song.add('pno', [(t, p, d + 0.6) for (t, p, d) in echo], PIANO, pan=-0.08, gain=2.6, vel=54,
         attack=0.003, release=0.8, decay=1.4, sustain=0.2)
echo, _ = parse("r:2 A5:1 D6:1 | F6:2 E6:1 D6:1 | D6:2 Bb5:2 | A5:4", SEC['outro'] * 4)
song.add('pno', [(t, p, d + 0.6) for (t, p, d) in echo], PIANO, pan=-0.08, gain=2.4, vel=50,
         attack=0.003, release=0.8, decay=1.4, sustain=0.2)

# ---- soft string pad under B and A3 for the swell ----
def pad(chords, start_bar, vel=52):
    notes = []
    for i, c in enumerate(chords):
        root, q, b = chord(c)
        for iv in q[:3]:
            notes.append(((start_bar + i) * 4, nearest((root + iv) % 12, midi('F3')), 4))
    song.add('pad', notes, STR, pan=0.0, gain=1.6, legato=1.04, vel=vel, attack=0.6, release=1.2)

pad(B, SEC['B'], vel=60)
pad(A, SEC['A3'], vel=50)

# harp glissando-ish sparkle into B
harp, _ = parse("D5:.25 F5:.25 A5:.25 Bb5:.25 D6:.25 F6:.25 A6:.25 Bb6:.25", SEC['B'] * 4 - 2)
song.add('pno', harp, HARP, pan=0.3, gain=0.35, vel=60, attack=0.002, release=1.2, decay=1.2, sustain=0.1)

eq = {
    'vln': chain(highpass(220), lowpass(6500)),
    'vc': chain(highpass(55), lowpass(4200)),
    'pno': chain(highpass(45), lowpass(9000)),
    'pad': chain(highpass(150), lowpass(3500)),
}
out = song.render(sends={'vln': 0.42, 'vc': 0.32, 'pno': 0.3, 'pad': 0.5}, eq=eq, rev_time=2.8, rev_mix=0.55)
out = master(out)
write_wav('/home/claude/bgm/out/bgm_reminiscence.wav', out)
print('len', len(out) / SR, 's  peak', float(np.abs(out).max()), 'rms', float(np.sqrt((out ** 2).mean())))

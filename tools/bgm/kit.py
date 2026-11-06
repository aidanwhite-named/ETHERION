"""Composition kit: a Piece = sections of bars (chords per bar) + parts written against them.
Time unit = one 'beat' as given by the piece (quarter for 4/4 and 3/4, eighth for 6/8)."""
import numpy as np
from sf2 import SF2, SR
import mix
from mix import Song, parse, midi, nearest, lowpass, highpass, chain, master, write_wav

mix.CHORD_Q.update({'6': [0, 4, 7, 9], 'madd9': [0, 3, 7, 14], 'maj9': [0, 4, 7, 11, 14], 'dim': [0, 3, 6],
                    'aug': [0, 4, 8], '9': [0, 4, 7, 10, 14], 'm9': [0, 3, 7, 10, 14], '5': [0, 7],
                    '7sus4': [0, 5, 7, 10], 'add2': [0, 2, 4, 7]})
chord = mix.chord
SF = SF2('/usr/share/sounds/sf2/TimGM6mb.sf2')

GM = dict(piano=0, epiano=4, harpsichord=6, celesta=8, glock=9, musicbox=10, vibes=11, marimba=12,
          xylo=13, bells=14, dulcimer=15, organ=19, reedorgan=20, accordion=21, nylon=24, abass=32,
          violin=40, viola=41, cello=42, contrabass=43, tremolo=44, pizz=45, harp=46, timpani=47,
          strings=48, slowstr=49, choir=52, oohs=53, trumpet=56, trombone=57, tuba=58, horn=60,
          oboe=68, ehorn=69, bassoon=70, clarinet=71, piccolo=72, flute=73, recorder=74, panflute=75,
          shakuhachi=77, whistle=78, ocarina=79, warmpad=89, spacevoice=91, bowedglass=92, halo=94,
          sweep=95, crystal=98, atmosphere=99, kalimba=108, bagpipe=109, fiddle=110, tinker=112,
          woodblock=115, taiko=116, mtom=117)

# expressive defaults per instrument family
SUSTAIN = dict(attack=0.09, release=0.4, vibrato=12, vib_rate=5.3, vib_delay=0.22)
WIND = dict(attack=0.05, release=0.25, vibrato=9, vib_rate=5.0, vib_delay=0.25)
PAD = dict(attack=0.7, release=1.4)
PLUCK = dict(attack=0.002, release=0.6, decay=1.3, sustain=0.18)
KEYS = dict(attack=0.003, release=0.5, decay=1.5, sustain=0.22)
BELL = dict(attack=0.002, release=1.4, decay=2.0, sustain=0.1)


class Piece:
    def __init__(self, bpm, meter, form, seed=7):
        """form: list of (section_name, [chord per bar, 'X Y' = two halves])"""
        self.meter = meter
        self.bars, self.sec = [], {}
        for name, prog in form:
            self.sec.setdefault(name, []).append(len(self.bars))
            self.bars += prog
        self.song = Song(bpm, len(self.bars) * meter, SF)
        self.song.rng = np.random.default_rng(seed)
        self.melodies = []

    # -- time helpers
    def at(self, name, k=0):
        return self.sec[name][k] * self.meter

    def chords_at(self, bar):
        parts = self.bars[bar].split()
        span = self.meter / len(parts)
        return [(bar * self.meter + i * span, span, chord(c)) for i, c in enumerate(parts)]

    def each_chord(self, name, k=0, nbars=None):
        b0 = self.sec[name][k]
        n = nbars or self._sec_len(name, k)
        for b in range(b0, b0 + n):
            yield from self.chords_at(b)

    def _sec_len(self, name, k):
        starts = sorted(s for v in self.sec.values() for s in v)
        b0 = self.sec[name][k]
        nxt = [s for s in starts if s > b0]
        return (nxt[0] if nxt else len(self.bars)) - b0

    # -- parts
    def melody(self, bus, prog, text, name, k=0, shift=0, check=True, **kw):
        notes, end = parse(text, self.at(name, k))
        want = self.at(name, k) + self._sec_len(name, k) * self.meter
        if abs(end - want) > 1e-6:
            print(f'   !! melody length {name}[{k}] {prog}: ends {end - self.at(name, k)} beats, section is {want - self.at(name, k)}')
        notes = [(t, p + shift, d) for (t, p, d) in notes]
        if check:
            self.melodies.append((bus, notes))
        self.add(bus, notes, prog, **kw)
        return notes

    NORM = {}

    @classmethod
    def norm(cls, prog, bank, notes):
        """equalize instrument loudness: gain so a typical note of this preset has the same RMS"""
        if bank:
            return 1.0
        if prog not in cls.NORM:
            keys = sorted(p for (_, p, _) in notes) or [60]
            k = int(keys[len(keys) // 2])
            x = SF.note(prog, k, 0.8, vel=100, attack=0.01, release=0.05)
            r = float(np.sqrt((x[:int(0.6 * SR)] ** 2).mean())) + 1e-6
            cls.NORM[prog] = min(8.0, 0.08 / r)
        return cls.NORM[prog]

    def add(self, bus, notes, prog, bank=0, **kw):
        kw = dict(kw)
        if bank:
            kw['bank'] = bank
        kw['gain'] = kw.get('gain', 1.0) * self.norm(prog, bank, notes)
        self.song.add(bus, notes, prog, **kw)

    @staticmethod
    def voicing(root, q, lo, n):
        pcs = {(root + iv) % 12 for iv in q}
        out, m = [], lo
        while len(out) < n:
            if m % 12 in pcs:
                out.append(m)
            m += 1
        return out

    def figure(self, bus, prog, name, k=0, fig=(0, 1, 2, 3, 4, 3, 2, 1), step=0.5, lo='C3', bass_lo='E2',
               ring='half', skip_bass=False, nbars=None, vel_accent=(10, 3), base_vel=56, **kw):
        """Broken-chord figure. fig indexes [bass, v1, v2, ...] (0 = bass)."""
        notes = []
        for (t0, span, (root, q, bpc)) in self.each_chord(name, k, nbars):
            bass = nearest(bpc, midi(bass_lo))
            v = self.voicing(root, q, midi(lo), 8)
            pool = [bass] + v
            steps = int(round(span / step))
            for s in range(steps):
                idx = fig[s % len(fig)]
                if idx is None or (skip_bass and idx == 0):
                    continue
                t = t0 + s * step
                if ring == 'half':
                    half = self.meter / 2 if span >= self.meter else span
                    end = t0 + (np.floor((t - t0) / half) + 1) * half
                    d = end - t + 0.1
                elif ring == 'span':
                    d = t0 + span - t + 0.1
                else:
                    d = float(ring)
                if idx == 0 and ring != 'short':
                    d = max(d, span)
                notes.append((t, pool[idx], d))
        m = self.meter

        def vf(t, p, d):
            ph = t % m
            return base_vel + (vel_accent[0] if ph < 1e-6 else vel_accent[1] if abs(ph - m / 2) < 1e-6 else 0) - (p - 60) * 0.25
        self.add(bus, notes, prog, vel_fn=vf, **kw)

    def pad(self, bus, prog, name, k=0, lo='F3', n=3, nbars=None, vel=50, **kw):
        notes = []
        for (t0, span, (root, q, bpc)) in self.each_chord(name, k, nbars):
            for p in self.voicing(root, q, midi(lo), n):
                notes.append((t0, p, span))
        kw.setdefault('legato', 1.04)
        self.add(bus, notes, prog, vel=vel, **{**PAD, **kw})

    def bass(self, bus, prog, name, k=0, lo='E2', pattern=None, nbars=None, vel=66, **kw):
        """pattern: list of (offset, dur, interval) within one chord span; default whole note."""
        notes = []
        for (t0, span, (root, q, bpc)) in self.each_chord(name, k, nbars):
            b = nearest(bpc, midi(lo))
            pat = pattern or [(0, span, 0)]
            for off, d, iv in pat:
                if off >= span:
                    continue
                notes.append((t0 + off, b + iv, min(d, span - off)))
        self.add(bus, notes, prog, vel=vel, **kw)

    def perc(self, bus, name, hits, k=0, nbars=None, kit=0, vel=50, gain=1.0, pan=0.0, **kw):
        """hits: {gm_drum_note: [beat offsets within bar]} repeated every bar."""
        b0 = self.sec[name][k]
        n = nbars or self._sec_len(name, k)
        notes = []
        for b in range(b0, b0 + n):
            for key, offs in hits.items():
                for o in offs:
                    notes.append((b * self.meter + o, key, 0.3))
        self.add(bus, notes, kit, bank=128, vel=vel, gain=gain, pan=pan, human=0.006,
                 attack=0.001, release=0.6, **kw)

    def stab(self, bus, prog, name, offs, k=0, lo='G3', n=3, dur=0.5, nbars=None, vel=50, **kw):
        """short chords at given offsets within each chord span (e.g. waltz 2-3, off-beats)"""
        notes = []
        for (t0, span, (root, q, bpc)) in self.each_chord(name, k, nbars):
            for o in offs:
                if o < span - 1e-6:
                    for p in self.voicing(root, q, midi(lo), n):
                        notes.append((t0 + o, p, dur))
        self.add(bus, notes, prog, vel=vel, **kw)

    # -- checks + render
    def harmony_report(self):
        bad = []
        for bus, notes in self.melodies:
            for (t, p, d) in notes:
                if d < 1.0 * (self.meter / 4 if self.meter > 4 else 1):
                    continue
                bar = int(t // self.meter)
                if bar >= len(self.bars):
                    continue
                for (t0, span, (root, q, bpc)) in self.chords_at(bar):
                    if t0 - 1e-6 <= t < t0 + span:
                        pcs = {(root + iv) % 12 for iv in q} | {bpc}
                        pc = p % 12
                        if pc in pcs:
                            continue
                        clash = any(((pc - c) % 12) in (1, 11) for c in pcs)
                        if clash:
                            bad.append((bus, bar, round(t % self.meter, 2), p, d, self.bars[bar]))
        return bad

    def render(self, out_path, sends, eq=None, rev_time=2.6, rev_mix=0.5, rms_db=-17):
        x = self.song.render(sends=sends, eq=eq, rev_time=rev_time, rev_mix=rev_mix)
        x = master(x)
        r = np.sqrt((x ** 2).mean())
        x = x * (10 ** (rms_db / 20) / r)
        if np.abs(x).max() > 0.95:
            x *= 0.95 / np.abs(x).max()
        write_wav(out_path, x)
        return len(x) / SR


EQ = dict(
    lead=chain(highpass(220), lowpass(6800)),
    low=chain(highpass(50), lowpass(4200)),
    keys=chain(highpass(45), lowpass(9500)),
    pad=chain(highpass(140), lowpass(3800)),
    perc=chain(highpass(80), lowpass(9000)),
    bright=chain(highpass(300), lowpass(10000)),
)

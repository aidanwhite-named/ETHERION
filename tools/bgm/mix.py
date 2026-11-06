"""Sequencer / mixer: tracks of notes -> stereo loop with reverb, tail folded onto start."""
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
from sf2 import SF2, SR

import os
DEBUG = os.environ.get('BUSDB')
NOTE = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}


def midi(name):
    """'C#4' -> 61, 'Bb3' -> 58"""
    n = NOTE[name[0]]
    i = 1
    while i < len(name) and name[i] in '#b':
        n += 1 if name[i] == '#' else -1
        i += 1
    return n + 12 * (int(name[i:]) + 1)


def parse(seq, t0=0.0):
    """'A4:1.5 D5:.5 E5 r:2' -> [(t, pitch, dur)], end time"""
    out, t = [], t0
    for tok in seq.split():
        if ':' in tok:
            p, d = tok.split(':'); d = float(d)
        else:
            p, d = tok, 1.0
        if p == '|':
            continue
        if p != 'r':
            out.append((t, midi(p), d))
        t += d
    return out, t


class Song:
    def __init__(self, bpm, beats, sf):
        self.bpm, self.beats, self.sf = bpm, beats, sf
        self.spb = 60.0 / bpm
        self.length = int(round(beats * self.spb * SR))
        self.tail = int(6 * SR)
        self.buses = {}
        self.rng = np.random.default_rng(7)

    def bus(self, name):
        if name not in self.buses:
            self.buses[name] = np.zeros((self.length + self.tail, 2), np.float32)
        return self.buses[name]

    def add(self, busname, notes, program, pan=0.0, gain=1.0, vel=80, legato=1.0, human=0.012,
            vel_fn=None, **kw):
        b = self.bus(busname)
        L = np.cos((pan + 1) * np.pi / 4); R = np.sin((pan + 1) * np.pi / 4)
        for (t, p, d) in notes:
            v = vel if vel_fn is None else vel_fn(t, p, d)
            v = int(np.clip(v + self.rng.normal(0, 3), 20, 127))
            ts = t * self.spb + (self.rng.normal(0, human) if t > 0 else 0)
            ts = max(0.0, ts)
            sig = self.sf.note(program, p, d * self.spb * legato, vel=v, **kw) * gain
            i0 = int(ts * SR)
            n = min(len(sig), len(b) - i0)
            b[i0:i0 + n, 0] += sig[:n] * L
            b[i0:i0 + n, 1] += sig[:n] * R

    def render(self, sends, eq=None, rev_time=2.6, rev_mix=1.0):
        dry = np.zeros((self.length + self.tail, 2), np.float32)
        wet_in = np.zeros_like(dry)
        for name, buf in self.buses.items():
            x = buf
            if eq and name in eq:
                x = eq[name](x)
            dry += x
            if DEBUG:
                print('   bus %-5s %6.1f dB' % (name, 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-9)))
            wet_in += x * sends.get(name, 0.2)
        # stereo reverb IR: decaying filtered noise with early reflections
        n = int(rev_time * SR)
        t = np.arange(n) / SR
        rng = np.random.default_rng(11)
        ir = rng.normal(0, 1, (n, 2)).astype(np.float32)
        ir *= np.exp(-6.9 * t / rev_time)[:, None]
        sos = butter(2, 5200, 'low', fs=SR, output='sos')
        ir = sosfilt(sos, ir, axis=0)
        sos2 = butter(1, 180, 'high', fs=SR, output='sos')
        ir = sosfilt(sos2, ir, axis=0)
        pre = int(0.022 * SR)
        ir = np.vstack([np.zeros((pre, 2), np.float32), ir])
        ir /= np.sqrt((ir ** 2).sum(axis=0))
        wet = np.stack([fftconvolve(wet_in[:, c], ir[:, c])[:len(dry)] for c in range(2)], axis=1)
        mix = dry + wet * rev_mix
        # fold the tail beyond loop end back onto the start => seamless loop
        out = mix[:self.length].copy()
        out[:self.tail] += mix[self.length:self.length + self.tail]
        return out


def lowpass(f, order=2):
    sos = butter(order, f, 'low', fs=SR, output='sos')
    return lambda x: sosfilt(sos, x, axis=0).astype(np.float32)


def highpass(f, order=2):
    sos = butter(order, f, 'high', fs=SR, output='sos')
    return lambda x: sosfilt(sos, x, axis=0).astype(np.float32)


def chain(*fs):
    def g(x):
        for f in fs:
            x = f(x)
        return x
    return g


def master(x, target_peak=0.89):
    # gentle soft-knee compression on envelope
    env = np.abs(x).max(axis=1)
    k = int(0.05 * SR)
    sm = np.convolve(env, np.ones(k) / k, mode='same')
    thr = np.percentile(sm, 90) * 0.9
    gain = np.where(sm > thr, (thr / np.maximum(sm, 1e-9)) ** 0.35, 1.0)
    x = x * gain[:, None]
    x = np.tanh(x / np.abs(x).max() * 1.15) / np.tanh(1.15)
    x = x * target_peak
    rms = np.sqrt((x ** 2).mean())
    x = x * min(1.0, 10 ** (-17 / 20) / rms)   # BGM sits around -17 dBFS RMS
    return x.astype(np.float32)


def write_wav(path, x):
    import wave
    y = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(y.tobytes())


# ---------- accompaniment helpers ----------
CHORD_Q = {'': [0, 4, 7], 'm': [0, 3, 7], '7': [0, 4, 7, 10], 'm7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11],
           'sus4': [0, 5, 7], 'm7b5': [0, 3, 6, 10], 'add9': [0, 4, 7, 14], 'm6': [0, 3, 7, 9], 'sus2': [0, 2, 7]}


def chord(sym):
    """'Dm', 'F/C', 'A7', 'Bbmaj7' -> (root_pc, intervals, bass_pc)"""
    bass = None
    if '/' in sym:
        sym, b = sym.split('/')
        bass = midi(b + '0') % 12
    r = sym[0]; i = 1
    if i < len(sym) and sym[i] in '#b':
        r += sym[i]; i += 1
    root = midi(r + '0') % 12
    q = CHORD_Q[sym[i:]]
    return root, q, (root if bass is None else bass)


def nearest(pc, lo):
    """lowest midi >= lo with pitch class pc"""
    m = lo + ((pc - lo) % 12)
    return m

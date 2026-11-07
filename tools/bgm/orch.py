"""ETHERION BGM v4 engine — orchestral strings & winds without plucked / struck sounds.

Why: TimGM6mb's violin / viola / cello / contrabass / clarinet / bassoon / trombone / tuba are single-cycle
loops (one waveform period repeated), which sounds like a synthesizer. Here bowed strings are modelled instead:
  - band-limited sawtooth (Helmholtz motion of a bowed string) per player,
  - an ensemble of players per section (own detune, timing, vibrato rate/depth, slow pitch wander),
  - a body resonance made of many narrow modes (vibrato sweeps the partials through them -> natural shimmer),
  - bow noise, bow-change dips, dynamic brightness, true legato (pitch glides between slurred notes).
Flute / oboe / horn / choir / string-ensemble use the long recorded loops of the soundfont.
Clarinet / bassoon are modelled the same way as strings (square / saw + formant body).
"""
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
from sf2 import SR
import kit

SF = kit.SF
RNG = np.random.default_rng(2026)


# ------------------------------------------------------------------ oscillators
def saw_blep(f):
    """band-limited sawtooth for an instantaneous-frequency array f (Hz)"""
    dt = f / SR
    ph = (RNG.uniform() + np.cumsum(dt)) % 1.0
    y = 2.0 * ph - 1.0
    m = ph < dt
    x = ph[m] / dt[m]
    y[m] -= x + x - x * x - 1.0
    m = ph > 1.0 - dt
    x = (ph[m] - 1.0) / dt[m]
    y[m] -= x * x + x + x + 1.0
    return y, ph


def square_blep(f):
    a, ph = saw_blep(f)
    # second saw half a period later -> difference = square (odd harmonics)
    dt = f / SR
    ph2 = (ph + 0.5) % 1.0
    y = 2.0 * ph2 - 1.0
    m = ph2 < dt
    x = ph2[m] / dt[m]
    y[m] -= x + x - x * x - 1.0
    m = ph2 > 1.0 - dt
    x = (ph2[m] - 1.0) / dt[m]
    y[m] -= x * x + x + x + 1.0
    return 0.5 * (a - y)


def smooth_noise(n, cutoff, rng):
    """slow random curve (unit std) with given cutoff (Hz)"""
    if n < 8:
        return np.zeros(n)
    k = max(2, int(SR / cutoff))
    m = n // k + 3
    pts = rng.normal(0, 1, m)
    xs = np.arange(m) * k
    return np.interp(np.arange(n), xs, pts)


def smoothstep(x):
    x = np.clip(x, 0.0, 1.0)
    return x * x * (3 - 2 * x)


# ------------------------------------------------------------------ bodies
def _target_db(f, kind):
    """overall tilt of the body response (relative to a 1/n sawtooth input), dB"""
    s = KIND[kind]['scale']
    g = np.maximum(f, 1.0) / s                # map to violin-size frequencies
    db = np.zeros_like(f)
    lowcut = KIND[kind]['low']
    db -= 24 * np.log2(np.maximum(lowcut / np.maximum(f, 1), 1.0))   # below the lowest string: -24 dB/oct
    db += 3.0 * np.exp(-0.5 * (np.log2(g / 280.0) / 0.35) ** 2)      # air resonance
    db += KIND[kind]['hill'] * np.exp(-0.5 * (np.log2(g / 2800.0) / 0.45) ** 2)   # bridge hill / formant
    hi = KIND[kind]['hi']
    db -= 12 * np.log2(np.maximum(f / hi, 1.0))                       # roll-off above
    db -= 18 * np.log2(np.maximum(f / 7000.0, 1.0))
    for (ff, gain, w) in KIND[kind].get('formants', []):
        db += gain * np.exp(-0.5 * (np.log2(f / ff) / w) ** 2)
    return db


def body_ir(kind, seed):
    rng = np.random.default_rng(seed)
    cfg = KIND[kind]
    n = int(0.16 * SR)
    t = np.arange(n) / SR
    h = np.zeros(n)
    s = cfg['scale']
    nm = cfg.get('modes', 110)
    if nm:
        freqs = list(np.array([275, 455, 540]) * s) + list(np.exp(rng.uniform(np.log(380 * s), np.log(min(10000, 14000 * s)), nm)))
        for f in freqs:
            Q = rng.uniform(18, 50)
            d = Q / (np.pi * f)
            h += rng.lognormal(0, 0.5) * rng.choice([-1, 1]) * np.exp(-t / d) * np.sin(2 * np.pi * f * t + rng.uniform(0, 6.3)) * d * 400
    h[0] += cfg.get('direct', 0.5) * (np.sqrt((h ** 2).sum()) if nm else 1.0)
    # flatten the smoothed magnitude, then impose the target tilt (keeps the fine, peaky structure)
    N = 1 << 16
    H = np.fft.rfft(h, N)
    f = np.fft.rfftfreq(N, 1 / SR)
    mag = np.abs(H) + 1e-9
    # 1/3-octave smoothing in log-frequency
    lf = np.log2(np.maximum(f, 20))
    grid = np.arange(lf[1], lf[-1], 1 / 24)
    sm = np.interp(grid, lf, mag)
    w = 8
    ker = np.hanning(2 * w + 1); ker /= ker.sum()
    sm = np.sqrt(np.convolve(sm ** 2, ker, mode='same'))
    smooth = np.interp(lf, grid, sm)
    tgt = 10 ** (_target_db(f, kind) / 20)
    H2 = H / smooth * tgt
    ir = np.fft.irfft(H2, N)
    ir = np.roll(ir, 256)[:int(0.2 * SR)]
    ir[:256] *= np.hanning(512)[:256]
    ir[-2000:] *= np.linspace(1, 0, 2000)
    return (ir / np.sqrt((ir ** 2).sum())).astype(np.float32)


# per kind: osc, size scale, lowest note area, high roll-off, brightness filter, vibrato, bow/breath noise
KIND = {
    'vln': dict(osc='saw', scale=1.0, low=185, hi=3300, hill=3, dark=1500, vib=(5.3, 6.0), depth=15, noise=(2500, 7500), nlev=0.010, attack=0.10),
    'vla': dict(osc='saw', scale=0.82, low=125, hi=2700, hill=2.5, dark=1150, vib=(5.0, 5.7), depth=14, noise=(1800, 6000), nlev=0.010, attack=0.11),
    'vc':  dict(osc='saw', scale=0.5, low=62, hi=2000, hill=2.5, dark=800, vib=(4.8, 5.5), depth=13, noise=(1200, 4500), nlev=0.008, attack=0.12),
    'cb':  dict(osc='saw', scale=0.32, low=36, hi=1200, hill=2, dark=450, vib=(4.6, 5.1), depth=9, noise=(700, 2600), nlev=0.006, attack=0.15),
    'cl':  dict(osc='square', scale=1.0, low=140, hi=2600, hill=0, dark=1300, vib=(4.8, 5.2), depth=3, noise=(1500, 5000), nlev=0.012,
                attack=0.05, modes=0, direct=1.0, formants=[(1500, 3, 0.5), (3200, 2, 0.4)]),
    'bsn': dict(osc='saw', scale=1.0, low=55, hi=2200, hill=0, dark=900, vib=(4.8, 5.3), depth=6, noise=(1000, 4000), nlev=0.010,
                attack=0.06, modes=0, direct=1.0, formants=[(470, 9, 0.35), (1150, 7, 0.3), (2500, 3, 0.35)]),
}
BODIES = {}


def bodies(kind):
    if kind not in BODIES:
        n = 1 if KIND[kind].get('modes', 110) == 0 else 3
        BODIES[kind] = [body_ir(kind, 100 + 17 * i + hash(kind) % 97) for i in range(n)]
    return BODIES[kind]


# ------------------------------------------------------------------ the ensemble renderer
class Ensemble:
    """collects synthesized players per (bus, kind, body) and applies bodies once at the end"""

    def __init__(self, P):
        self.P = P
        self.raw = {}
        self.cal = {}

    def _buf(self, bus, kind, b):
        key = (bus, kind, b)
        if key not in self.raw:
            self.raw[key] = np.zeros((self.P.song.length + self.P.song.tail, 2), np.float32)
        return self.raw[key]

    # one player playing one monophonic phrase (list of (start_s, end_s, midi, level, art))
    def player(self, kind, phrase, rng, detune=0.0, vib_depth=None, glide=0.07, release=0.35, attack=None,
               solo=False):
        cfg = KIND[kind]
        attack = attack or cfg['attack']
        t0 = phrase[0][0]
        t1 = phrase[-1][1]
        n = int((t1 - t0 + release * 1.6 + 0.05) * SR)
        t = np.arange(n) / SR + t0
        def ix(x):
            return int(np.clip(round((x - t0) * SR), 0, n))
        # ---- pitch in cents (piecewise constant + local glides)
        cents = np.empty(n)
        lev = np.empty(n)
        bnd = [ix(s) for (s, e, p, lv, art) in phrase] + [n]
        bnd[0] = 0
        for i, (s, e, p, lv, art) in enumerate(phrase):
            cents[bnd[i]:bnd[i + 1]] = 100.0 * p
            lev[bnd[i]:bnd[i + 1]] = lv
        for i in range(1, len(phrase)):
            s = phrase[i][0]
            c0, c1 = 100.0 * phrase[i - 1][2], 100.0 * phrase[i][2]
            if c0 != c1:
                g = glide if abs(c1 - c0) <= 1200 else glide * 1.4
                j0, j1 = ix(s - 0.6 * g), ix(s + 0.4 * g)
                cents[j0:j1] = c0 + (c1 - c0) * smoothstep((t[j0:j1] - (s - 0.6 * g)) / g)
            l0, l1 = phrase[i - 1][3], phrase[i][3]
            if l0 != l1:
                j0, j1 = ix(s - 0.04), ix(s + 0.06)
                lev[j0:j1] = l0 + (l1 - l0) * smoothstep((t[j0:j1] - s + 0.04) / 0.1)
        # vibrato: fades in on each note after ~0.2 s, depth & rate wander
        rate = rng.uniform(*cfg['vib'])
        depth = (vib_depth if vib_depth is not None else cfg['depth']) * rng.uniform(0.75, 1.2)
        vin = np.zeros(n)
        for (s, e, p, lv, art) in phrase:
            dur = e - s
            if dur < 0.28:
                continue
            on = s + min(0.22, dur * 0.35)
            j0, j1 = ix(on), ix(e + 0.2)
            vin[j0:j1] = np.maximum(vin[j0:j1], smoothstep((t[j0:j1] - on) / 0.35))
        wob = 1 + 0.25 * smooth_noise(n, 1.5, rng)
        ph = 2 * np.pi * np.cumsum(rate * (1 + 0.04 * smooth_noise(n, 0.8, rng))) / SR + rng.uniform(0, 6.3)
        cents += depth * vin * wob * np.sin(ph)
        cents += 3.0 * smooth_noise(n, 2.5, rng) + detune
        f = 440.0 * 2 ** ((cents - 6900.0) / 1200.0)
        f = np.minimum(f, SR * 0.45)
        # ---- amplitude
        ja = ix(t0 + attack * 3)
        amp = lev.copy()
        amp[:ja] *= 1 - np.exp(-(t[:ja] - t0) / (attack / 2.2))
        onset = np.zeros(n)
        for i, (s, e, p, lv, art) in enumerate(phrase):
            dur = e - s
            if i > 0:   # bow change / re-articulation dip
                same = phrase[i - 1][2] == p
                dip = 0.32 if same else (0.14 if art == 'leg' else 0.4)
                w = 0.035 if art == 'leg' else 0.05
                j0, j1 = ix(s - 4 * w), ix(s + 4 * w)
                amp[j0:j1] *= 1 - dip * np.exp(-0.5 * ((t[j0:j1] - s) / w) ** 2)
            if dur > 0.9:   # gentle messa di voce on long notes
                j0, j1 = ix(s), ix(e)
                amp[j0:j1] *= 1 + 0.10 * np.sin(np.pi * (t[j0:j1] - s) / dur)
            j0, j1 = ix(s - 0.01), ix(s + 0.35)
            onset[j0:j1] += np.exp(-np.maximum(t[j0:j1] - s, 0) / 0.06)
        jr = ix(t1)
        amp[jr:] *= np.exp(-(t[jr:] - t1) / (release / 3.0))
        amp *= 1 + 0.04 * smooth_noise(n, 3.0, rng)
        # ---- source
        if cfg['osc'] == 'square':
            src = square_blep(f)
        else:
            src, _ = saw_blep(f)
        sos = butter(1, cfg['dark'], 'low', fs=SR, output='sos')
        dark = sosfilt(sos, src)
        bright = np.clip(0.1 + 0.75 * lev * (0.7 + 0.3 * amp / np.maximum(lev, 1e-3)), 0, 1.15)
        y = dark + (src - dark) * bright
        y *= amp
        # bow / breath noise: louder at onsets
        nz = rng.normal(0, 1, n)
        lo, hi = cfg['noise']
        nz = sosfilt(butter(2, [lo, min(hi, SR * 0.45)], 'band', fs=SR, output='sos'), nz)
        y += nz * cfg['nlev'] * amp * (1 + 2.5 * onset) * (3 if cfg['osc'] != 'saw' else 1)
        return int(round(t0 * SR)), y.astype(np.float32)

    def line(self, bus, kind, notes, n=6, vel=70, vel_fn=None, pan=0.0, spread=0.5, gain=1.0, legato=True,
             glide=None, attack=None, release=None, vib=None, art_len=1.0, timing=0.014, detune=6.0, seed=None):
        """notes = [(beat, midi, dur_beats)] monophonic. n players. legato=True slurs touching notes."""
        if not notes:
            return
        spb = self.P.song.spb
        rng = np.random.default_rng(seed if seed is not None else RNG.integers(1 << 30))
        notes = sorted(notes)
        # phrases
        phrases, cur = [], []
        for (tb, p, d) in notes:
            v = vel if vel_fn is None else vel_fn(tb, p, d)
            lv = (np.clip(v, 10, 127) / 127.0) ** 1.4
            s = tb * spb
            e = s + d * spb * (art_len if not legato else 1.0)
            art = 'leg' if legato else 'port'
            if cur and legato and s - cur[-1][1] < 0.06:
                cur[-1] = (cur[-1][0], s, cur[-1][2], cur[-1][3], cur[-1][4])   # touch
                cur.append((s, e, p, lv, art))
            else:
                if cur:
                    phrases.append(cur)
                cur = [(s, e, p, lv, art)]
        if cur:
            phrases.append(cur)
        cfg = KIND[kind]
        release = release or (0.45 if legato else 0.22)
        glide = glide if glide is not None else 0.075
        g_sec = gain / np.sqrt(n) * self.calib(kind)
        nb = len(bodies(kind))
        for v in range(n):
            off = rng.normal(0, timing) if n > 1 else 0.0
            det = rng.normal(0, detune) if n > 1 else 0.0
            pn = pan + (spread * ((v + 0.5) / n - 0.5) * 2 if n > 1 else 0.0)
            pn = float(np.clip(pn + rng.normal(0, 0.05), -0.95, 0.95))
            L, R = np.cos((pn + 1) * np.pi / 4), np.sin((pn + 1) * np.pi / 4)
            buf = self._buf(bus, kind, v % nb)
            for ph in phrases:
                ph2 = [(max(0.0, s + off + rng.normal(0, timing * 0.3)), e + off, p, lv, a) for (s, e, p, lv, a) in ph]
                i0, y = self.player(kind, ph2, rng, detune=det, vib_depth=vib, glide=glide, release=release,
                                    attack=attack, solo=(n == 1))
                y *= g_sec
                m = min(len(y), len(buf) - i0)
                if m <= 0:
                    continue
                buf[i0:i0 + m, 0] += y[:m] * L
                buf[i0:i0 + m, 1] += y[:m] * R

    def calib(self, kind):
        """gain so one player at vel 100 has RMS ~0.08 after the body (same as kit.Piece.norm for samples)"""
        if kind not in self.cal:
            rng = np.random.default_rng(1)
            p = {'vln': 74, 'vla': 62, 'vc': 50, 'cb': 38, 'cl': 67, 'bsn': 50}[kind]
            lv = (100 / 127.0) ** 1.4
            i0, y = self.player(kind, [(0.0, 1.2, p, lv, 'leg')], rng)
            y = fftconvolve(y, bodies(kind)[0])[:len(y)]
            r = np.sqrt((y[int(0.3 * SR):int(1.1 * SR)] ** 2).mean()) + 1e-9
            self.cal[kind] = 0.08 / r
        return self.cal[kind]

    def finish(self):
        """convolve each (bus, kind, body) buffer with its body and add it to the piece's buses"""
        for (bus, kind, b), x in self.raw.items():
            ir = bodies(kind)[b]
            y = np.stack([fftconvolve(x[:, c], ir)[:len(x)] for c in range(2)], axis=1).astype(np.float32)
            self.P.song.bus(bus)[:] += y
        self.raw = {}


# ------------------------------------------------------------------ sampled winds with detune & legato overlap
def sample_note(program, key, dur, vel=90, cents=0.0, attack=0.05, release=0.3, vibrato=0.0, vib_rate=5.0,
                vib_delay=0.3, bank=0):
    regs = [r for r in SF.regions(program, bank) if r['lo'] <= key <= r['hi'] and r['vlo'] <= vel <= r['vhi']]
    if not regs:
        regs = [min(SF.regions(program, bank), key=lambda r: min(abs(r['lo'] - key), abs(r['hi'] - key)))]
    total = int((dur + release) * SR)
    out = np.zeros(total, np.float32)
    t = np.arange(total) / SR
    for r in regs[:2]:
        ratio = 2 ** ((key - r['root'] + r['tune'] + cents / 100.0) / 12.0) * r['rate'] / SR
        inc = np.full(total, ratio)
        if vibrato > 0:
            ramp = smoothstep((t - vib_delay) / 0.45)
            inc *= 2 ** (vibrato * ramp * np.sin(2 * np.pi * vib_rate * t + RNG.uniform(0, 6)) / 1200.0)
        pos = np.cumsum(inc) - inc[0]
        s0, s1 = r['start'], r['end']
        base = SF.samples[s0:s1 + 2]
        if r['loop'] and r['le'] > r['ls'] + 4:
            ls, le = r['ls'] - s0, r['le'] - s0
            pos = np.where(pos >= ls, ls + np.mod(pos - ls, le - ls), pos)
        else:
            pos = np.minimum(pos, s1 - s0 - 2)
        i = np.clip(pos.astype(np.int64), 0, len(base) - 2)
        fr = (pos - i).astype(np.float32)
        out += (base[i] * (1 - fr) + base[i + 1] * fr) * (10 ** (-r['atten'] / 20.0))
    n_hold = int(dur * SR)
    env = smoothstep(t / max(attack, 0.003)).astype(np.float32)
    if total > n_hold:
        lvl = env[max(n_hold - 1, 0)]
        env[n_hold:] = lvl * np.exp(-(t[n_hold:] - dur) / (release / 4.0))
    return out * env * (vel / 127.0) ** 1.5


def winds(P, bus, program, notes, n=1, vel=70, vel_fn=None, pan=0.0, spread=0.3, gain=1.0, attack=0.06,
          release=0.35, legato=1.08, vibrato=8, vib_rate=5.0, detune=7.0, timing=0.012, seed=None):
    if not notes:
        return
    rng = np.random.default_rng(seed if seed is not None else RNG.integers(1 << 30))
    b = P.song.bus(bus)
    spb = P.song.spb
    g = gain * P.norm(program, 0, notes) / np.sqrt(n)
    for v in range(n):
        off = rng.normal(0, timing) if n > 1 else 0.0
        det = rng.normal(0, detune) if n > 1 else 0.0
        pn = float(np.clip(pan + (spread * ((v + 0.5) / n - 0.5) * 2 if n > 1 else 0), -0.95, 0.95))
        L, R = np.cos((pn + 1) * np.pi / 4), np.sin((pn + 1) * np.pi / 4)
        for (tb, p, d) in notes:
            vv = vel if vel_fn is None else vel_fn(tb, p, d)
            vv = int(np.clip(vv + rng.normal(0, 2), 15, 127))
            ts = max(0.0, tb * spb + off + rng.normal(0, 0.006))
            y = sample_note(program, p, d * spb * legato, vel=vv, cents=det + rng.normal(0, 2), attack=attack,
                            release=release, vibrato=vibrato, vib_rate=vib_rate * rng.uniform(0.94, 1.06)) * g
            i0 = int(ts * SR)
            m = min(len(y), len(b) - i0)
            b[i0:i0 + m, 0] += y[:m] * L
            b[i0:i0 + m, 1] += y[:m] * R


# ------------------------------------------------------------------ hall reverb + master
def hall_ir(rt=3.0, seed=11):
    rng = np.random.default_rng(seed)
    n = int(rt * 1.3 * SR)
    t = np.arange(n) / SR
    ir = np.zeros((n, 2))
    # frequency-dependent decay: 4 bands
    bands = [((None, 250), rt * 1.15), ((250, 2000), rt), ((2000, 6000), rt * 0.7), ((6000, None), rt * 0.4)]
    for (lo, hi), T in bands:
        nz = rng.normal(0, 1, (n, 2))
        if lo is None:
            sos = butter(3, hi, 'low', fs=SR, output='sos')
        elif hi is None:
            sos = butter(3, lo, 'high', fs=SR, output='sos')
        else:
            sos = butter(3, [lo, hi], 'band', fs=SR, output='sos')
        ir += sosfilt(sos, nz, axis=0) * np.exp(-6.9 * t / T)[:, None]
    # soft build-up of the diffuse tail
    ir *= smoothstep(t / 0.06)[:, None]
    # early reflections
    for k in range(18):
        dly = rng.uniform(0.008, 0.075)
        i = int(dly * SR)
        a = rng.uniform(0.3, 1.0) * np.exp(-dly / 0.05)
        ir[i, rng.integers(2)] += a * 25 * rng.choice([-1, 1])
    ir = sosfilt(butter(1, 120, 'high', fs=SR, output='sos'), ir, axis=0)
    pre = int(0.024 * SR)
    ir = np.vstack([np.zeros((pre, 2)), ir])
    ir /= np.sqrt((ir ** 2).sum(axis=0))
    return ir.astype(np.float32)


def active_rms(x):
    m = x.mean(axis=1) if x.ndim == 2 else x
    k = int(0.4 * SR)
    nwin = len(m) // k
    if nwin == 0:
        return 0.0
    w = m[:nwin * k].reshape(nwin, k)
    pw = (w ** 2).mean(axis=1)
    pk = pw.max()
    act = pw[pw > pk * 1e-3]
    return float(np.sqrt(act.mean())) if len(act) else 0.0


def render(P, path, levels, sends, eqs, rt=3.0, wet=0.55, rms_db=-17.0):
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
        dry += x
        wet_in += x * sends.get(name, 0.4)
    ir = hall_ir(rt)
    wetx = np.stack([fftconvolve(wet_in[:, c], ir[:, c])[:N] for c in range(2)], axis=1)
    mixx = dry + wetx * wet
    out = mixx[:song.length].copy()
    out[:song.tail] += mixx[song.length:song.length + song.tail]
    # gentle glue compression (slow), then loudness, then soft peak limiting
    env = np.sqrt(np.convolve((out ** 2).mean(axis=1), np.ones(int(0.3 * SR)) / int(0.3 * SR), mode='same'))
    ref = np.percentile(env, 85)
    g = np.where(env > ref, (ref / np.maximum(env, 1e-9)) ** 0.3, 1.0)
    out *= g[:, None]
    r = np.sqrt((out ** 2).mean())
    out *= 10 ** (rms_db / 20) / r
    pk = np.abs(out).max(axis=1)
    k = int(0.01 * SR)

    lim = np.minimum(1.0, 0.9 / np.maximum(pk, 1e-9))

    # smooth the limiter gain (min-filter then smooth)
    from scipy.ndimage import minimum_filter1d, uniform_filter1d
    lim = uniform_filter1d(minimum_filter1d(lim, size=2 * k), size=2 * k)
    out *= lim[:, None]
    kit.write_wav(path, out.astype(np.float32))
    return len(out) / SR

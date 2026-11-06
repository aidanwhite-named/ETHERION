"""Minimal SoundFont2 reader + note renderer (numpy only)."""
import struct
import numpy as np

SR = 44100


class SF2:
    def __init__(self, path):
        data = open(path, 'rb').read()
        self.data = data
        assert data[:4] == b'RIFF' and data[8:12] == b'sfbk'
        self.chunks = {}
        self._walk(12, len(data))
        smpl = self.chunks['smpl']
        self.samples = np.frombuffer(data[smpl[0]:smpl[0] + smpl[1]], dtype='<i2').astype(np.float32) / 32768.0
        self._parse_pdta()
        self.cache = {}

    def _walk(self, start, end):
        p = start
        while p + 8 <= end:
            cid = self.data[p:p + 4]
            size = struct.unpack('<I', self.data[p + 4:p + 8])[0]
            if cid == b'LIST':
                self._walk(p + 12, p + 8 + size)
            else:
                self.chunks[cid.decode('latin1')] = (p + 8, size)
            p += 8 + size + (size & 1)

    def _recs(self, name, fmt):
        off, size = self.chunks[name]
        n = struct.calcsize(fmt)
        return [struct.unpack(fmt, self.data[off + i:off + i + n]) for i in range(0, size, n)]

    def _parse_pdta(self):
        self.phdr = self._recs('phdr', '<20sHHHIII')
        self.pbag = self._recs('pbag', '<HH')
        self.pgen = self._recs('pgen', '<HH')
        self.inst = self._recs('inst', '<20sH')
        self.ibag = self._recs('ibag', '<HH')
        self.igen = self._recs('igen', '<HH')
        self.shdr = self._recs('shdr', '<20sIIIIIBbHH')

    @staticmethod
    def _zones(bags, gens, b0, b1):
        zones = []
        for b in range(b0, b1):
            g0, g1 = bags[b][0], bags[b + 1][0]
            z = {}
            for g in range(g0, g1):
                op, amt = gens[g]
                z[op] = amt
            zones.append(z)
        return zones

    def preset_names(self):
        return [(h[2], h[1], h[0].split(b'\0')[0].decode('latin1')) for h in self.phdr[:-1]]

    def regions(self, program, bank=0):
        key = (bank, program)
        if key in self.cache:
            return self.cache[key]
        pi = None
        for i, h in enumerate(self.phdr[:-1]):
            if h[1] == program and h[2] == bank:
                pi = i
        assert pi is not None, key
        pz = self._zones(self.pbag, self.pgen, self.phdr[pi][3], self.phdr[pi + 1][3])
        pglobal = {}
        if pz and 41 not in pz[0]:
            pglobal = pz.pop(0)
        regs = []
        for z in pz:
            zz = dict(pglobal); zz.update(z)
            ii = zz[41]
            iz = self._zones(self.ibag, self.igen, self.inst[ii][1], self.inst[ii + 1][1])
            iglobal = {}
            if iz and 53 not in iz[0]:
                iglobal = iz.pop(0)
            pk = zz.get(43, 0x7F00)
            for z2 in iz:
                r = dict(iglobal); r.update(z2)
                kr = r.get(43, 0x7F00)
                lo, hi = max(kr & 0xFF, pk & 0xFF), min(kr >> 8, pk >> 8)
                if lo > hi:
                    continue
                s = self.shdr[r[53]]
                _, start, end, ls, le, rate, root, corr, _, stype = s
                start += r.get(0, 0) + 32768 * r.get(4, 0)
                end += r.get(1, 0) + 32768 * r.get(12, 0)
                ls += r.get(2, 0) + 32768 * r.get(45, 0)
                le += r.get(3, 0) + 32768 * r.get(50, 0)
                ork = r.get(58, 65535)
                if ork != 65535:
                    root = ork
                def s16(v):
                    return v - 65536 if v > 32767 else v
                tune = s16(r.get(51, 0)) + s16(zz.get(51, 0)) + (s16(r.get(52, 0)) + s16(zz.get(52, 0)) + corr) / 100.0
                vr = r.get(44, 0x7F00)
                regs.append(dict(lo=lo, hi=hi, vlo=vr & 0xFF, vhi=vr >> 8, start=start, end=end,
                                 ls=ls, le=le, rate=rate, root=root, tune=tune,
                                 loop=r.get(54, 0) & 1, pan=s16(r.get(17, 0)) / 500.0,
                                 atten=r.get(48, 0) / 10.0))
        self.cache[key] = regs
        return regs

    def note(self, program, key, dur, vel=90, bank=0, attack=0.005, release=0.3,
             decay=None, sustain=1.0, vibrato=0.0, vib_rate=5.2, vib_delay=0.25, bend=0.0):
        """Render one note (mono float32). dur = held seconds; release appended."""
        regs = [r for r in self.regions(program, bank) if r['lo'] <= key <= r['hi'] and r['vlo'] <= vel <= r['vhi']]
        if not regs:
            regs = [min(self.regions(program, bank), key=lambda r: min(abs(r['lo'] - key), abs(r['hi'] - key)))]
        # stereo-pair regions: just mix them mono
        total = int((dur + release) * SR)
        out = np.zeros(total, np.float32)
        for r in regs[:2]:
            ratio = 2 ** ((key - r['root'] + r['tune']) / 12.0) * r['rate'] / SR
            t = np.arange(total) / SR
            inc = np.full(total, ratio, np.float64)
            if vibrato > 0:
                ramp = np.clip((t - vib_delay) / 0.4, 0, 1)
                inc *= 2 ** (vibrato * ramp * np.sin(2 * np.pi * vib_rate * t) / 1200.0)
            if bend:
                inc *= 2 ** (bend * np.exp(-t / 0.06) / 1200.0)
            pos = np.cumsum(inc) - inc[0]
            s0, s1 = r['start'], r['end']
            if r['loop'] and r['le'] > r['ls'] + 4:
                ls, le = r['ls'] - s0, r['le'] - s0
                L = le - ls
                over = pos >= ls
                pos = np.where(over, ls + np.mod(pos - ls, L), pos)
                wrap_to = (ls, le)
            else:
                pos = np.minimum(pos, s1 - s0 - 2)
                wrap_to = None
            i = pos.astype(np.int64)
            f = (pos - i).astype(np.float32)
            base = self.samples[s0:s1 + 2]
            i = np.clip(i, 0, len(base) - 2)
            j = i + 1
            if wrap_to is not None:
                j = np.where(j >= wrap_to[1], wrap_to[0], j)
            sig = base[i] * (1 - f) + base[j] * f
            if not r['loop']:
                # natural sample end fade
                pass
            out[:len(sig)] += sig * (10 ** (-r['atten'] / 20.0))
        # envelope
        n_hold = int(dur * SR)
        env = np.ones(total, np.float32)
        a = max(1, int(attack * SR))
        env[:a] = np.linspace(0, 1, a) ** 1.5
        if decay:
            t = np.arange(total) / SR
            dec = sustain + (1 - sustain) * np.exp(-np.maximum(t - attack, 0) / decay)
            env *= dec.astype(np.float32)
        rel = total - n_hold
        if rel > 0:
            lvl = env[n_hold - 1] if n_hold > 0 else 0
            env[n_hold:] = lvl * np.exp(-np.arange(rel) / (release * SR / 5.0))
            env[n_hold:] *= np.linspace(1, 0, rel) ** 0.5
        g = (vel / 127.0) ** 1.6
        return out * env * g

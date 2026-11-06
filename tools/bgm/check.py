import sys, wave
import numpy as np
SR = 44100
path, bpm = sys.argv[1], float(sys.argv[2])
w = wave.open(path)
x = np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2).astype(np.float32) / 32768
bar = int(4 * 60 / bpm * SR)
nb = len(x) // bar
rms = [20 * np.log10(np.sqrt((x[i * bar:(i + 1) * bar] ** 2).mean()) + 1e-9) for i in range(nb)]
print('bars', nb, 'bar dBFS:', ' '.join(f'{r:.0f}' for r in rms))
print('peak', np.abs(x).max(), 'overall rms dB', 20 * np.log10(np.sqrt((x ** 2).mean())))
print('clipped samples (>0.99):', int((np.abs(x) > 0.99).sum()))
d = np.abs(np.diff(x, axis=0)).max(axis=1)
print('max sample jump', d.max(), 'at', d.argmax() / SR, 's')
# loop seam: jump between last and first sample vs typical jump
seam = np.abs(x[0] - x[-1]).max()
print('loop seam jump', seam, ' median jump', np.median(d), ' p99.9 jump', np.percentile(d, 99.9))
# spectrum balance
N = min(len(x), SR * 60)
X = np.abs(np.fft.rfft(x.mean(axis=1)[:N]))
f = np.fft.rfftfreq(N, 1 / SR)
for lo, hi in [(20, 120), (120, 500), (500, 2000), (2000, 6000), (6000, 16000)]:
    m = (f >= lo) & (f < hi)
    print(f'{lo}-{hi}Hz', round(10 * np.log10((X[m] ** 2).sum()), 1))

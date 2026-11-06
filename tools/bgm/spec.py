import sys, wave, numpy as np, matplotlib
matplotlib.use('Agg'); import matplotlib.pyplot as plt
path, bpm, meter = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
w = wave.open(path); x = np.frombuffer(w.readframes(w.getnframes()), '<i2').reshape(-1, 2).astype(np.float32).mean(1) / 32768
plt.figure(figsize=(16, 4)); plt.specgram(x, NFFT=4096, Fs=44100, noverlap=2048, cmap='magma', vmin=-120); plt.ylim(0, 2200)
bar = meter * 60 / bpm
for b in np.arange(0, len(x) / 44100, bar * 4): plt.axvline(b, color='c', lw=.6)
plt.title(path.split('/')[-1]); plt.savefig(path.replace('.wav', '.png'), dpi=60, bbox_inches='tight')

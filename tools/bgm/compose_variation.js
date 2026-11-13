/* ETHERION — BGM Variation Composer (PROMPT_BGM_VARIATION.md)
 * Supports 6 dynamic textures:
 *   1: Piano solo | 2: Single melody | 3: Chamber | 4: Lyric ensemble | 5: Grand tutti | 6: Brilliant climax
 * Outputs 44.1 kHz stereo WAV to audio/bgm/new/<name>.wav
 */
"use strict";

const path = require("path");
const { SR, makeRng, renderSection, applyHallReverb, masterAudio, writeWav } = require("./synth_new");

const PAN = {
  violin1: -0.45, violin2: -0.15, soloViolin: -0.22, tremolo: -0.10,
  viola: 0.25, cello: 0.42, soloCello: 0.18, bass: 0.30,
  flute: -0.22, oboe: 0.22, clarinet: -0.15, bassoon: 0.28,
  horn: -0.35, choir: 0.0,
  piano: 0.0, harp: 0.35, timpani: -0.25
};

const ONLY = process.argv.slice(2);

function measureSectionDynamics(L, R, winSec = 4.0) {
  const win = Math.floor(winSec * SR);
  const step = Math.floor(win * 0.5);
  let minDb = 0, maxDb = -100;
  for (let start = 0; start + win <= L.length; start += step) {
    let sum = 0;
    for (let i = start; i < start + win; i++) sum += L[i] * L[i] + R[i] * R[i];
    const rms = Math.sqrt(sum / (2 * win));
    if (rms < 1e-6) continue;
    const db = 20 * Math.log10(rms);
    if (db < minDb) minDb = db;
    if (db > maxDb) maxDb = db;
  }
  return { minDb, maxDb, rangeDb: maxDb - minDb };
}

// Build a continuous rubato/ritardando tempo lookup table (1/32 beat resolution)
function buildTempoMap(beatsPerBar, bars, baseBpm, tempoPoints) {
  const totalBeats = bars * beatsPerBar;
  const sub = 32;
  const steps = totalBeats * sub;
  const pts = (tempoPoints && tempoPoints.length ? tempoPoints : [[1, baseBpm]])
    .map(([bar, bpm]) => ({ bt: (bar - 1) * beatsPerBar, bpm }))
    .sort((a, b) => a.bt - b.bt);

  const bpmAt = (bt) => {
    if (bt <= pts[0].bt) return pts[0].bpm;
    if (bt >= pts[pts.length - 1].bt) return pts[pts.length - 1].bpm;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i], p1 = pts[i + 1];
      if (bt >= p0.bt && bt <= p1.bt) {
        const u = (bt - p0.bt) / Math.max(1e-6, p1.bt - p0.bt);
        const smooth = 0.5 - 0.5 * Math.cos(Math.PI * u);
        return p0.bpm + (p1.bpm - p0.bpm) * smooth;
      }
    }
    return baseBpm;
  };

  const times = new Float64Array(steps + 1);
  const dBt = 1 / sub;
  for (let i = 0; i < steps; i++) {
    const midBt = (i + 0.5) * dBt;
    times[i + 1] = times[i] + dBt * (60 / bpmAt(midBt));
  }
  const beatToSec = (bt) => {
    const c = Math.max(0, Math.min(totalBeats, bt));
    const idx = c * sub;
    const i0 = Math.floor(idx), i1 = Math.min(steps, i0 + 1);
    return times[i0] + (times[i1] - times[i0]) * (idx - i0);
  };
  return { totalSec: times[steps], beatToSec };
}

function renderTrack(name, bpm, beatsPerBar, bars, buildFn, seed, targetRmsDb = -17.0, wetAmt = 0.21, tempoPoints = null) {
  if (ONLY.length && !ONLY.includes(name)) return;
  const { totalSec, beatToSec } = buildTempoMap(beatsPerBar, bars, bpm, tempoPoints);
  const totalSamples = Math.floor(totalSec * SR);
  const b = (bar, bt = 0) => beatToSec((bar - 1) * beatsPerBar + bt);

  const tracks = {};
  for (const k of Object.keys(PAN)) tracks[k] = [];
  // Calm, gentle dynamic shaping: lift very soft solo notes slightly, tame intense tutti/timpani/tremolo spikes
  const calmVel = (inst, v) => {
    let x = v <= 0.42 ? 0.34 + Math.max(0, v - 0.15) * 0.55 : 0.488 + Math.tanh((v - 0.42) * 1.15) * 0.14;
    if (inst === "timpani") x *= 0.24;
    else if (inst === "tremolo") x *= 0.32;
    else if (inst === "horn" && v > 0.65) x *= 0.78;
    else if (inst === "choir" && v > 0.36) x *= 0.80;
    return x;
  };
  const add = (inst, bar, bt, lenBeats, midi, vel = 0.72, legato = false, sfz = false, extra = {}) => {
    const t0 = b(bar, bt);
    const t1 = b(bar, bt + lenBeats);
    const ex = { ...extra };
    if (ex.velEnd != null) ex.velEnd = calmVel(inst, ex.velEnd);
    tracks[inst].push({ startSec: t0, durSec: Math.max(0.02, t1 - t0), midi, vel: calmVel(inst, vel), legato, sfz: false, ...ex });
  };

  buildFn(add, bars);

  const mixL = new Float64Array(totalSamples), mixR = new Float64Array(totalSamples);
  const rng = makeRng(seed);
  for (const [inst, notes] of Object.entries(tracks)) {
    if (!notes.length) continue;
    const [sL, sR] = renderSection(inst, notes, totalSamples, PAN[inst] || 0, rng);
    for (let i = 0; i < totalSamples; i++) { mixL[i] += sL[i]; mixR[i] += sR[i]; }
  }
  const [revL, revR] = applyHallReverb(mixL, mixR, wetAmt);
  // Slow 2.5s moving-RMS gain rider to keep dynamic range calm & gentle (~7-9 dB) without pumping
  const win = Math.floor(2.5 * SR);
  const env = new Float64Array(totalSamples);
  let runSum = 0;
  for (let i = 0; i < totalSamples; i++) {
    runSum += revL[i] * revL[i] + revR[i] * revR[i];
    if (i >= win) runSum -= revL[i - win] * revL[i - win] + revR[i - win] * revR[i - win];
    const cnt = Math.min(i + 1, win);
    env[i] = Math.sqrt(Math.max(1e-10, runSum / (2 * cnt)));
  }
  let meanRms = 0;
  for (let i = 0; i < totalSamples; i++) meanRms += env[i];
  meanRms = Math.max(1e-6, meanRms / totalSamples);
  const halfWin = Math.floor(win * 0.5);
  for (let i = 0; i < totalSamples; i++) {
    const local = env[Math.min(totalSamples - 1, i + halfWin)];
    const g = Math.pow(meanRms / Math.max(local, meanRms * 0.25), 0.48);
    revL[i] *= g;
    revR[i] *= g;
  }
  const stats = masterAudio(revL, revR, targetRmsDb);
  const dyn = measureSectionDynamics(revL, revR, 4.0);
  const outPath = path.join(__dirname, `../../audio/bgm/new/${name}.wav`);
  writeWav(outPath, revL, revR);
  console.log(
    `Rendered ${name}.wav (${totalSec.toFixed(1)}s, RMS=${stats.finalRmsDb.toFixed(2)} dBFS, ` +
    `Peak=${stats.peakDb.toFixed(2)} dBFS, 4s-Range=${dyn.minDb.toFixed(1)}..${dyn.maxDb.toFixed(1)} dB [${dyn.rangeDb.toFixed(1)} dB])`
  );
}

// Helper: Harp glissando across a scale between two bar/beat positions
function addHarpGliss(add, bar, startBt, lenBeats, scaleMidis, velStart = 0.45, velEnd = 0.85) {
  const n = scaleMidis.length;
  for (let i = 0; i < n; i++) {
    const frac = i / Math.max(1, n - 1);
    const bt = startBt + frac * lenBeats;
    const v = velStart + (velEnd - velStart) * frac;
    add("harp", bar, bt, 1.8, scaleMidis[i], v);
  }
}

// Helper: Piano flowing arpeggio (8th notes across 4 beats)
function addPianoArp4(add, bar, chord, vel, pattern = [0, 1, 2, 3, 2, 1, 2, 3]) {
  for (let i = 0; i < 8; i++) {
    const bt = i * 0.5;
    const m = chord[pattern[i % pattern.length]];
    const accent = i === 0 ? 1.08 : i === 4 ? 1.0 : 0.86;
    add("piano", bar, bt, 1.8, m, vel * accent, false, false, { pedal: true });
  }
}

// Helper: Piano fast 16th-note climax arpeggio
function addPianoArp16(add, bar, chord, vel) {
  for (let i = 0; i < 16; i++) {
    const bt = i * 0.25;
    const m = chord[i % chord.length] + (i >= 8 ? 12 : 0);
    const accent = i % 4 === 0 ? 1.05 : 0.84;
    add("piano", bar, bt, 0.9, m, vel * accent, false, false, { pedal: true });
  }
}

// ============================================================================
// bgm_last_oath — 최후의 서약 (Variation v2)
// D minor -> modulates to E minor at Climax -> returns to D minor
// 4/4, 66 BPM, 48 bars = 174.5s (2:54.5)
// Flow: ② Solo Cello -> ① Piano Solo -> ③ Solo Violin + Piano -> ⑤ Grand Tutti
//       -> ② Solo Violin -> ⑥ Brilliant Climax (Em, 62.5%-79%) -> ② Solo Cello
// ============================================================================
renderTrack("bgm_last_oath", 66, 4, 48, (add) => {
  // --- [1-6] ② 단일 선율: 독주 첼로 홀로 (pp) ---
  const celloIntro = [
    [1, 0, 2.0, 50, 0.46, false], [1, 2, 2.0, 53, 0.49, true],
    [2, 0, 2.5, 57, 0.52, true],  [2, 2.5, 1.5, 55, 0.47, true],
    [3, 0, 2.0, 53, 0.49, true],  [3, 2, 2.0, 52, 0.46, true],
    [4, 0, 3.5, 50, 0.44, true],
    [5, 0, 2.0, 45, 0.47, true],  [5, 2, 2.0, 50, 0.49, true],
    [6, 0, 3.0, 49, 0.44, true]   // Beat 4 breath before Piano enters
  ];
  for (const [bar, bt, l, m, v, leg] of celloIntro) {
    add("soloCello", bar, bt, l, m, v, leg);
  }

  // --- [7-14] ① 피아노 홀로 (pp -> mp, Fmaj7 · Bbmaj7 따뜻한 화성 포함) ---
  const pChords1 = {
    7:  [38, 45, 50, 53], // Dm
    8:  [34, 41, 46, 53], // Bbmaj7
    9:  [41, 48, 53, 57], // F (따뜻한 나란한 장조)
    10: [33, 40, 45, 52], // Am7/A
    11: [38, 45, 50, 53], // Dm
    12: [36, 43, 48, 55], // Csus4 -> C
    13: [34, 41, 46, 53], // Bbmaj7 (cresc.)
    14: [33, 40, 45, 49]  // A7 (cresc. into chamber)
  };
  const pMel1 = [
    [7, 0, 2.0, 62, 0.36], [7, 2, 2.0, 65, 0.38],
    [8, 0, 2.5, 69, 0.40], [8, 2.5, 1.5, 67, 0.37],
    [9, 0, 2.0, 65, 0.38], [9, 2, 2.0, 62, 0.36],
    [10, 0, 4.0, 64, 0.35],
    [11, 0, 1.5, 62, 0.38], [11, 1.5, 0.5, 64, 0.38], [11, 2, 2.0, 65, 0.41],
    [12, 0, 2.0, 67, 0.42], [12, 2, 2.0, 64, 0.39],
    [13, 0, 2.0, 69, 0.45], [13, 2, 2.0, 70, 0.48],
    [14, 0, 2.0, 69, 0.50], [14, 2, 2.0, 64, 0.46]
  ];
  for (let bar = 7; bar <= 14; bar++) {
    const vLeft = bar >= 13 ? 0.36 + (bar - 13) * 0.05 : 0.28;
    addPianoArp4(add, bar, pChords1[bar], vLeft);
  }
  for (const [bar, bt, l, m, v] of pMel1) {
    add("piano", bar, bt, l, m, v, false, false, { pedal: true });
  }

  // --- [15-20] ③ 실내악: 독주 바이올린 + 피아노 (mp -> mf, 19-20 cello/bass bridge) ---
  const pChords2 = {
    15: [38, 45, 50, 57], // Dm
    16: [36, 43, 48, 55], // C
    17: [34, 41, 46, 53], // Bb
    18: [33, 40, 45, 52], // A
    19: [34, 41, 46, 53], // Bb (cresc.)
    20: [33, 40, 45, 49]  // A7 (cresc. into Tutti)
  };
  const vlnChamber = [
    [15, 0, 2.0, 65, 0.48], [15, 2, 2.0, 69, 0.52],
    [16, 0, 2.5, 72, 0.54], [16, 2.5, 1.5, 70, 0.50],
    [17, 0, 2.0, 69, 0.52], [17, 2, 2.0, 67, 0.49],
    [18, 0, 4.0, 64, 0.48],
    [19, 0, 2.0, 70, 0.58], [19, 2, 2.0, 72, 0.62],
    [20, 0, 2.0, 74, 0.66], [20, 2, 2.0, 73, 0.68]
  ];
  for (let bar = 15; bar <= 20; bar++) {
    const vP = bar >= 19 ? 0.46 + (bar - 19) * 0.08 : 0.38;
    addPianoArp4(add, bar, pChords2[bar], vP);
  }
  for (const [bar, bt, l, m, v] of vlnChamber) {
    add("soloViolin", bar, bt, l, m, v, bar > 15 || bt > 0);
  }
  // Cello & Bass crescendo bridge on bars 19-20
  add("cello", 19, 0, 4, 46, 0.48); add("cello", 20, 0, 4, 45, 0.62, true);
  add("bass", 19, 0, 4, 34, 0.46);  add("bass", 20, 0, 4, 33, 0.60, true);

  // --- [21-26] ⑤ 웅장한 총주 (D minor, f) ---
  const tutti1 = [
    [21, 74, 50, 38], [22, 76, 48, 36], [23, 77, 46, 34],
    [24, 81, 45, 33], [25, 79, 43, 43], [26, 74, 45, 33]
  ];
  for (const [bar, top, mid, bs] of tutti1) {
    const sf = bar === 21;
    const dim = bar === 26 ? 0.72 : 1.0;
    add("violin1", bar, 0, 2, top, 0.92 * dim, bar > 21, sf);
    add("violin1", bar, 2, 2, bar === 26 ? 73 : top + 2, 0.88 * dim, true);
    add("violin2", bar, 0, 4, top - 12, 0.80 * dim, bar > 21, sf);
    add("viola", bar, 0, 4, mid + 12, 0.68 * dim, bar > 21);
    add("horn", bar, 0, 2, mid + 12, 0.84 * dim, bar > 21, sf);
    add("horn", bar, 2, 2, mid + 14, 0.80 * dim, true);
    add("choir", bar, 0, 4, mid + 12, 0.34 * dim, bar > 21);
    add("cello", bar, 0, 4, mid, 0.80 * dim, bar > 21, sf);
    add("bass", bar, 0, 4, bs, 0.86 * dim, bar > 21, sf);
  }

  // --- [27-30] ② 단일 선율: 독주 바이올린 홀로 (pp) + Climax Bridge (bar 30) ---
  add("soloViolin", 27, 0, 3.0, 74, 0.38);
  add("soloViolin", 27, 3, 1.0, 72, 0.35, true);
  add("soloViolin", 28, 0, 4.0, 69, 0.38, true);
  add("soloViolin", 29, 0, 2.0, 67, 0.35, true);
  add("soloViolin", 29, 2, 2.0, 65, 0.33, true);
  add("soloViolin", 30, 0, 3.0, 64, 0.32, true);
  // Bridge to Climax: Timpani crescendo roll (B1/E2) + ascending E minor Harp glissando!
  add("timpani", 30, 1.0, 3.0, 40, 0.16, false, false, { roll: true, velEnd: 0.92 });
  addHarpGliss(add, 30, 2.2, 1.75, [52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72, 74, 76, 79, 83], 0.40, 0.88);

  // --- [31-38] ⑥ 화려한 클라이맥스 (E단조로 온음 조바꿈! 62.5% - 79.2%) ---
  const climaxChords = {
    31: [40, 47, 52, 55], // Em
    32: [38, 45, 50, 54], // D
    33: [36, 43, 48, 52], // C
    34: [35, 42, 47, 51], // B
    35: [40, 47, 52, 55], // Em
    36: [45, 52, 57, 60], // Am
    37: [35, 42, 47, 51], // B7 (dim.)
    38: [33, 40, 45, 49]  // A7 (modulating back to Dm)
  };
  const climaxTop = [76, 78, 79, 83, 83, 81, 79, 76]; // E5, F#5, G5, B5, B5, A5, G5, E5
  const climaxBass = [40, 38, 36, 35, 40, 45, 35, 33];

  // Timpani: downbeat of bar 31 (climax start), roll in 34->35, downbeat of 35 (peak)
  add("timpani", 31, 0, 1.5, 40, 0.98);
  add("timpani", 34, 2.0, 2.0, 35, 0.42, false, false, { roll: true, velEnd: 0.95 });
  add("timpani", 35, 0, 1.5, 40, 1.02);

  for (let bar = 31; bar <= 38; bar++) {
    const idx = bar - 31;
    const sf = bar === 31 || bar === 35;
    const dim = bar === 37 ? 0.82 : bar === 38 ? 0.56 : 1.0;
    const top = climaxTop[idx];
    const bs = climaxBass[idx];

    // Violin I & II octaves + Tremolo strings
    add("violin1", bar, 0, 2, top, 1.15 * dim, bar > 31, sf);
    add("violin1", bar, 2, 2, idx < 6 ? top + 2 : top - 2, 1.12 * dim, true);
    add("violin2", bar, 0, 4, top - 12, 1.02 * dim, bar > 31, sf);
    add("tremolo", bar, 0, 4, top - 5, 0.78 * dim, bar > 31, sf);

    // High ornamental Solo Violin counter-melody (bars 31-36)
    if (bar <= 36) {
      add("soloViolin", bar, 0, 1.0, top + 12, 0.72, bar > 31);
      add("soloViolin", bar, 1, 0.5, top + 10, 0.68, true);
      add("soloViolin", bar, 1.5, 0.5, top + 12, 0.70, true);
      add("soloViolin", bar, 2, 1.0, top + 14, 0.74, true);
      add("soloViolin", bar, 3, 1.0, top + 12, 0.70, true);
    }

    // 4 Horns + Choir + Cello + Bass
    add("horn", bar, 0, 4, bs + 24, 1.05 * dim, bar > 31, sf);
    add("choir", bar, 0, 4, 64, 0.52 * dim, bar > 31);
    add("cello", bar, 0, 4, bs + 12, 0.96 * dim, bar > 31, sf);
    add("bass", bar, 0, 4, bs, 1.05 * dim, bar > 31, sf);

    // Piano fast 16th-note arpeggios (bars 31-37)
    if (bar <= 37) {
      addPianoArp16(add, bar, climaxChords[bar], 0.36 * dim);
    } else {
      addPianoArp4(add, bar, climaxChords[bar], 0.24);
    }

    // Harp sweeping arpeggios (bars 31-37)
    if (bar <= 37) {
      const hc = climaxChords[bar];
      addHarpGliss(add, bar, 0, 2.0, [hc[0] + 12, hc[1] + 12, hc[2] + 12, hc[3] + 12, hc[1] + 24, hc[2] + 24, hc[3] + 24], 0.58 * dim, 0.76 * dim);
    }
  }

  // --- [39-48] ② 단일 선율로 가라앉음: 피아노 여리게(39-40) -> 독주 첼로 홀로(41-48, pp) ---
  // Bars 39-40: soft piano & solo cello settling back to D minor
  addPianoArp4(add, 39, [38, 45, 50, 53], 0.18);
  addPianoArp4(add, 40, [34, 41, 46, 50], 0.14);
  add("soloCello", 39, 0, 4.0, 50, 0.50);
  add("soloCello", 40, 0, 4.0, 46, 0.48, true);

  // Bars 41-48: Solo Cello alone fading seamlessly to bar 1
  const celloOutro = [
    [41, 0, 2.0, 50, 0.48], [41, 2, 2.0, 53, 0.47],
    [42, 0, 3.0, 57, 0.47], [42, 3, 1.0, 55, 0.45],
    [43, 0, 2.0, 53, 0.46], [43, 2, 2.0, 52, 0.45],
    [44, 0, 4.0, 50, 0.44],
    [45, 0, 2.0, 45, 0.44], [45, 2, 2.0, 50, 0.46],
    [46, 0, 4.0, 49, 0.43],
    [47, 0, 2.0, 50, 0.44], [47, 2, 2.0, 45, 0.43],
    [48, 0, 4.0, 50, 0.42]
  ];
  for (const [bar, bt, l, m, v] of celloOutro) {
    add("soloCello", bar, bt, l, m, v, bar > 41 || bt > 0);
  }
}, 2003, -17.0, 0.21, [
  [1, 63], [5, 63], [6.5, 57], [7, 65], [12.5, 65], [14, 60],
  [15, 66], [20, 69], [25, 69], [26.8, 58], [27, 61], [29.5, 59],
  [31, 70], [36, 70], [38.5, 58], [39, 63], [46, 60], [49, 63]
]);

// Helper: Piano flowing 6/8 arpeggio (6 eighth notes per bar)
function addPianoArp6(add, bar, chord, vel) {
  for (let i = 0; i < 6; i++) {
    const m = chord[i % chord.length];
    const accent = i === 0 ? 1.10 : i === 3 ? 0.98 : 0.82;
    add("piano", bar, i, 2.2, m, vel * accent, false, false, { pedal: true });
  }
}

// ============================================================================
// flag_G3 — 푸른비늘 인어 (푸른숲 · 물) — E major, 6/8, ♪=168 BPM (rubato), 64 bars (~138s = 2:18)
// Flow: ① Piano solo (water) -> ④ Lyric ensemble -> ② Flute solo -> ⑤ Tutti -> ⑥ Climax -> ③ Flute+Piano -> ① Piano
// ============================================================================
renderTrack("flag_G3", 168, 6, 64, (add) => {
  const ch = {
    E:     [40, 47, 52, 56, 59, 56],
    Csm7:  [37, 44, 49, 52, 56, 52],
    Amaj7: [45, 52, 57, 61, 64, 61],
    Bsus4: [35, 42, 47, 52, 54, 52],
    B:     [35, 42, 47, 51, 54, 51],
    Gsm:   [44, 51, 56, 59, 63, 59],
    Fsm7:  [42, 49, 54, 57, 61, 57]
  };
  const prog = [
    "E","Csm7","Amaj7","Bsus4", "E","Csm7","Amaj7","B",       "E","Csm7","Amaj7","B",         // 1-12: ① Piano solo
    "E","Gsm","Amaj7","B",      "Csm7","Gsm","Fsm7","B",      "Amaj7","B",                   // 13-22: ④ Lyric ensemble
    "E","Amaj7","Csm7","B",     "Amaj7","Fsm7","Bsus4","B",   "E","B",                       // 23-32: ② Flute solo
    "Csm7","Gsm","Amaj7","E",   "Fsm7","B","E","B",                                          // 33-40: ⑤ Grand tutti
    "E","B","Csm7","Gsm",       "Amaj7","E","Fsm7","B",       "Amaj7","B",                   // 41-50: ⑥ Climax (62.5%-78.1%)
    "E","Csm7","Amaj7","B",     "E","Csm7","Amaj7","B",       "E","Csm7","Amaj7","Bsus4","E","B" // 51-64: ③ -> ①
  ];

  // --- [1-12] ① 피아노 홀로 (pp, 물결 아르페지오 + 서정적 선율) ---
  const pMotif = [64,68,71,68, 69,68,66,64, 64,68,71,73, 71,69,68,64];
  for (let bar = 1; bar <= 12; bar++) {
    addPianoArp6(add, bar, ch[prog[bar - 1]], 0.25);
    const m = pMotif[(bar - 1) % pMotif.length];
    add("piano", bar, 0, 3, m, 0.35, false, false, { pedal: true });
    add("piano", bar, 3, 3, bar % 4 === 0 ? m - 2 : m + 2, 0.33, false, false, { pedal: true });
  }

  // --- [13-22] ④ 서정 합주 (현악 합주 + 피아노 물결, mp) ---
  for (let bar = 13; bar <= 22; bar++) {
    const c = ch[prog[bar - 1]];
    const m = [68,75,73,68, 76,71,69,66, 73,71][bar - 13];
    addPianoArp6(add, bar, c, 0.27);
    add("bass", bar, 0, 6, c[0], 0.44, bar > 13);
    add("cello", bar, 0, 6, c[1] + 12, 0.48, bar > 13);
    for (let i = 0; i < 6; i++) add("viola", bar, i, 1.1, c[2] + (i % 2 ? 4 : 0), 0.34, i > 0);
    add("violin1", bar, 0, 3, m, 0.54, bar > 13);
    add("violin1", bar, 3, 3, m + 2, 0.56, true);
    add("violin2", bar, 0, 6, m - 4, 0.42, bar > 13);
  }

  // --- [23-32] ② 단일 선율: 플루트 홀로 (p, 피아노 몇 음만) ---
  const flNotes = [76,73,76,75, 73,69,66,68, 71,71];
  for (let bar = 23; bar <= 32; bar++) {
    const c = ch[prog[bar - 1]];
    const m = flNotes[bar - 23];
    add("flute", bar, 0, 3, m, 0.45, bar > 23);
    add("flute", bar, 3, 3, bar % 2 ? m - 1 : m + 2, 0.43, true);
    add("piano", bar, 0, 3.5, c[0], 0.22, false, false, { pedal: true });
    add("piano", bar, 3, 3.0, c[2], 0.18, false, false, { pedal: true });
    if (bar >= 31) add("cello", bar, 0, 6, c[1], 0.36 + (bar - 31) * 0.14, bar > 31);
  }

  // --- [33-40] ⑤ 웅장한 총주 (mf -> f, 40마디 하프 글리산도·팀파니 롤) ---
  for (let bar = 33; bar <= 40; bar++) {
    const c = ch[prog[bar - 1]];
    const mTop = [76, 75, 73, 76, 73, 75, 76, 75][bar - 33];
    add("violin1", bar, 0, 6, mTop, 0.85, bar > 33);
    add("violin2", bar, 0, 6, mTop - 12, 0.74, bar > 33);
    add("horn", bar, 0, 6, c[1] + 12, 0.72, bar > 33);
    add("cello", bar, 0, 6, c[1], 0.72, bar > 33);
    add("bass", bar, 0, 6, c[0], 0.78, bar > 33);
  }
  add("timpani", 40, 1, 5, 35, 0.18, false, false, { roll: true, velEnd: 0.86 });
  addHarpGliss(add, 40, 2, 3.8, [52,54,56,59,61,64,66,68,71,73,76,78,80,83], 0.42, 0.85);

  // --- [41-50] ⑥ 화려한 클라이맥스 (62.5%-78.1%, E장조 찬란한 정점) ---
  add("timpani", 41, 0, 2, 40, 0.92);
  add("timpani", 45, 0, 2, 45, 0.94);
  const climTop = [80, 78, 76, 75, 81, 80, 78, 75, 76, 75];
  for (let bar = 41; bar <= 50; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 49 ? 0.80 : bar === 50 ? 0.56 : 1.0;
    const top = climTop[bar - 41];
    add("violin1", bar, 0, 3, top, 1.08 * dim, bar > 41, bar === 41);
    add("violin1", bar, 3, 3, top + 2, 1.04 * dim, true);
    add("violin2", bar, 0, 6, top - 12, 0.95 * dim, bar > 41, bar === 41);
    add("tremolo", bar, 0, 6, top - 5, 0.70 * dim, bar > 41);
    add("flute", bar, 0, 3, top + 12, 0.65 * dim, bar > 41);
    add("flute", bar, 3, 3, top + 7, 0.60 * dim, true);
    add("horn", bar, 0, 6, c[1] + 12, 0.94 * dim, bar > 41);
    add("choir", bar, 0, 6, 64, 0.42 * dim, bar > 41);
    add("cello", bar, 0, 6, c[1], 0.88 * dim, bar > 41);
    add("bass", bar, 0, 6, c[0], 0.96 * dim, bar > 41);
    addPianoArp6(add, bar, c.map(x => x + 12), 0.34 * dim);
    if (bar <= 49) addHarpGliss(add, bar, 0, 3.0, c.map(x => x + 12), 0.54 * dim, 0.72 * dim);
  }

  // --- [51-64] ③ 플루트 + 피아노(51-56) -> ① 피아노 홀로(57-64) ---
  for (let bar = 51; bar <= 64; bar++) {
    const vP = Math.max(0.22, 0.30 - (bar - 51) * 0.006);
    addPianoArp6(add, bar, ch[prog[bar - 1]], vP);
  }
  for (let bar = 51; bar <= 56; bar++) {
    const m = [76,75,71,69,68,66][bar - 51];
    add("flute", bar, 0, 3, m, 0.44 - (bar - 51) * 0.02, bar > 51);
    add("flute", bar, 3, 3, m - 1, 0.40 - (bar - 51) * 0.02, true);
  }
  for (let bar = 57; bar <= 64; bar++) {
    const m = [64,68,71,69, 68,66,64,64][bar - 57];
    add("piano", bar, 0, 6, m, 0.32 - (bar - 57) * 0.01, false, false, { pedal: true });
  }
}, 2013, -17.0, 0.22, [
  [1, 164], [11, 164], [12.5, 154], [13, 168], [21, 168], [22.5, 156],
  [23, 166], [32, 166], [33, 172], [40, 174], [41, 178], [48, 178],
  [50.5, 156], [51, 166], [61, 156], [65, 164]
]);

// ============================================================================
// flag_A3 — 폭풍 하이엘프 (비술 · 바람) — B Dorian (G#), 6/8, ♪=172 BPM (rubato), 64 bars (~135s = 2:15)
// Flow: ② Flute+Harp -> ① Piano solo -> ④ Lyric ensemble -> ⑤ Tutti -> ⑥ Climax (C# Dorian, Harp!) -> ② Flute
// ============================================================================
renderTrack("flag_A3", 172, 6, 64, (add) => {
  const ch = {
    Bm:    [47, 54, 59, 62, 66, 62],
    E:     [40, 47, 52, 56, 59, 56], // Dorian IV (G#!)
    A:     [45, 52, 57, 61, 64, 61],
    Fsm:   [42, 49, 54, 57, 61, 57],
    Gmaj7: [43, 50, 55, 59, 62, 59],
    D:     [38, 45, 50, 54, 57, 54],
    Csm:   [49, 56, 61, 64, 68, 64],
    Fs:    [42, 49, 54, 58, 61, 58],
    B:     [47, 54, 59, 63, 66, 63],
    Gsm:   [44, 51, 56, 59, 63, 59]
  };
  const prog = [
    "Bm","E","A","Fsm",       "Bm","E","D","Fsm",           "Bm","E","A","Fsm",          // 1-12: ② Flute + Harp
    "Bm","E","Gmaj7","Fsm",   "D","A","E","Fsm",            "Bm","Fsm",                  // 13-22: ① Piano solo
    "Bm","A","Gmaj7","Fsm",   "Bm","E","A","Fsm",           "D","Fsm",                   // 23-32: ④ Lyric ensemble
    "Bm","E","D","A",         "Gmaj7","Fsm","Bm","Fsm",                                  // 33-40: ⑤ Tutti
    "Csm","Fs","B","Gsm",     "A","B","Csm","Fsm",          "A","Fsm",                   // 41-50: ⑥ Climax (C# Dorian!)
    "Bm","E","A","Fsm",       "Bm","E","D","A",             "Bm","E","D","A","Bm","Fsm"  // 51-64: ③ -> ② Flute
  ];

  // --- [1-12] ② 단일 선율: 플루트 홀로 + 서늘한 하프 바람결 ---
  const flMotif = [74,78,73,73, 74,80,74,71, 74,76,73,71];
  for (let bar = 1; bar <= 12; bar++) {
    const c = ch[prog[bar - 1]];
    const m = flMotif[bar - 1];
    add("flute", bar, 0, 3, m, 0.45, bar > 1);
    add("flute", bar, 3, 3, m + (bar % 2 ? 2 : -2), 0.43, true);
    add("harp", bar, 0, 2.0, c[1] + 12, 0.35);
    add("harp", bar, 2, 2.0, c[2] + 12, 0.33);
    add("harp", bar, 4, 2.0, c[3] + 12, 0.31);
  }

  // --- [13-22] ① 피아노 홀로 (pp -> mp) ---
  for (let bar = 13; bar <= 22; bar++) {
    addPianoArp6(add, bar, ch[prog[bar - 1]], 0.24);
    const m = [71,76,73,69, 74,71,68,66, 71,69][bar - 13];
    add("piano", bar, 0, 3, m, 0.35, false, false, { pedal: true });
    add("piano", bar, 3, 3, m + 2, 0.33, false, false, { pedal: true });
  }

  // --- [23-32] ④ 서정 합주 (현악 + 하프 바람 오스티나토, mp) ---
  for (let bar = 23; bar <= 32; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [74, 73, 71, 69, 74, 76, 73, 71, 74, 73][bar - 23];
    add("violin1", bar, 0, 3, top, 0.56, bar > 23);
    add("violin1", bar, 3, 3, top + 2, 0.58, true);
    add("violin2", bar, 0, 6, top - 12, 0.48, bar > 23);
    add("cello", bar, 0, 6, c[1], 0.50, bar > 23);
    add("bass", bar, 0, 6, c[0], 0.46, bar > 23);
    for (let i = 0; i < 6; i++) add("harp", bar, i, 1.5, c[i % 4] + 12, 0.38);
  }

  // --- [33-40] ⑤ 웅장한 총주 (mf -> f, 40마디 하프 글리산도 + 팀파니 롤) ---
  for (let bar = 33; bar <= 40; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [74, 76, 78, 81, 79, 78, 74, 76][bar - 33];
    add("violin1", bar, 0, 6, top, 0.86, bar > 33);
    add("violin2", bar, 0, 6, top - 12, 0.74, bar > 33);
    add("horn", bar, 0, 6, c[1] + 12, 0.74, bar > 33);
    add("cello", bar, 0, 6, c[1], 0.74, bar > 33);
    add("bass", bar, 0, 6, c[0], 0.78, bar > 33);
    addHarpGliss(add, bar, 0, 3.0, c.map(x => x + 12), 0.45, 0.62);
  }
  add("timpani", 40, 1, 5, 37, 0.20, false, false, { roll: true, velEnd: 0.88 });
  addHarpGliss(add, 40, 2, 3.8, [49,52,54,56,58,61,63,64,66,68,70,73,76,80,85], 0.46, 0.90);

  // --- [41-50] ⑥ 화려한 클라이맥스 (C# 도리안 조바꿈, 62.5%-78.1%) ---
  add("timpani", 41, 0, 2, 37, 0.94);
  add("timpani", 45, 0, 2, 45, 0.92);
  const climTop = [76, 78, 80, 83, 81, 83, 80, 78, 76, 74];
  for (let bar = 41; bar <= 50; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 49 ? 0.80 : bar === 50 ? 0.56 : 1.0;
    const top = climTop[bar - 41];
    add("violin1", bar, 0, 3, top, 1.06 * dim, bar > 41, bar === 41);
    add("violin1", bar, 3, 3, top + 2, 1.02 * dim, true);
    add("violin2", bar, 0, 6, top - 12, 0.92 * dim, bar > 41);
    add("tremolo", bar, 0, 6, top - 5, 0.70 * dim, bar > 41);
    add("flute", bar, 0, 3, top + 12, 0.68 * dim, bar > 41);
    add("flute", bar, 3, 3, top + 7, 0.62 * dim, true);
    add("horn", bar, 0, 6, c[1] + 12, 0.92 * dim, bar > 41);
    add("choir", bar, 0, 6, 64, 0.44 * dim, bar > 41);
    add("cello", bar, 0, 6, c[1], 0.86 * dim, bar > 41);
    add("bass", bar, 0, 6, c[0], 0.94 * dim, bar > 41);
    addPianoArp6(add, bar, c.map(x => x + 12), 0.34 * dim);
    if (bar <= 49) {
      addHarpGliss(add, bar, 0, 2.8, c.map(x => x + 12), 0.60 * dim, 0.80 * dim);
      addHarpGliss(add, bar, 3, 2.8, c.map(x => x + 24), 0.56 * dim, 0.76 * dim);
    }
  }

  // --- [51-64] ③ 실내악(플루트+하프) -> ② 플루트 홀로 마무리 ---
  for (let bar = 51; bar <= 58; bar++) {
    const c = ch[prog[bar - 1]];
    add("harp", bar, 0, 2.0, c[1] + 12, 0.34 - (bar - 51) * 0.025);
    add("harp", bar, 3, 2.0, c[2] + 12, 0.30 - (bar - 51) * 0.025);
  }
  for (let bar = 51; bar <= 64; bar++) {
    const m = [74,76,78,73, 74,73,74,71, 69,71,74,76, 74,73][bar - 51];
    const v = Math.max(0.28, 0.46 - (bar - 51) * 0.013);
    add("flute", bar, 0, 6, m, v, bar > 51);
  }
}, 2019, -17.0, 0.22, [
  [1, 168], [11, 168], [12.5, 158], [13, 170], [21, 170], [22.5, 160],
  [23, 172], [32, 172], [33, 176], [40, 178], [41, 182], [48, 182],
  [50.5, 158], [51, 168], [61, 158], [65, 168]
]);

// ============================================================================
// title — 에테르가 흐르는 땅 (D minor, 4/4, 64 BPM rubato, 28 bars = ~104s = 1:44)
// Flow: ① Piano -> ② Cello+Piano -> ⑤ Tutti -> ⑥ Short Climax (Em, 61%-79%) -> ① Piano
// ============================================================================
renderTrack("title", 64, 4, 28, (add) => {
  const ch = {
    Dm: [38,45,50,53], Bb: [34,41,46,53], Gm: [43,50,55,58],
    C: [36,43,48,55], F: [41,48,53,57], A: [33,40,45,49],
    Em: [40,47,52,55], D: [38,45,50,54], B: [35,42,47,51]
  };
  const prog = [
    "Dm","Bb","Gm","A",   "Dm","A",        // 1-6: ① Piano solo
    "Dm","F","Bb","C",    "Gm","A",        // 7-12: ② Cello + Piano
    "Bb","C","Dm","A",                     // 13-16: ⑤ Tutti
    "Em","D","C","B",     "Em","A",        // 17-22: ⑥ Climax (61%-79%)
    "Dm","Bb","Gm","A",   "Dm","A"         // 23-28: ① Piano outro
  ];
  // 1-6: ① Piano solo
  const pMel = [62,65,67,64, 69,64];
  for (let bar = 1; bar <= 6; bar++) {
    addPianoArp4(add, bar, ch[prog[bar - 1]], 0.28);
    add("piano", bar, 0, 2, pMel[bar - 1], 0.38, false, false, { pedal: true });
    add("piano", bar, 2, 2, pMel[bar - 1] + 2, 0.36, false, false, { pedal: true });
  }
  // 7-12: ② Solo Cello + Piano
  for (let bar = 7; bar <= 12; bar++) {
    addPianoArp4(add, bar, ch[prog[bar - 1]], 0.24);
    const m = [50,53,58,55, 53,52][bar - 7];
    add("soloCello", bar, 0, 2, m, 0.52, bar > 7);
    add("soloCello", bar, 2, 2, m + 2, 0.50, true);
  }
  // 13-16: ⑤ Tutti
  for (let bar = 13; bar <= 16; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [70, 72, 74, 73][bar - 13];
    add("violin1", bar, 0, 4, top, 0.88, bar > 13, bar === 13);
    add("violin2", bar, 0, 4, top - 12, 0.76, bar > 13);
    add("horn", bar, 0, 4, c[1] + 12, 0.78, bar > 13);
    add("cello", bar, 0, 4, c[1], 0.76, bar > 13);
    add("bass", bar, 0, 4, c[0], 0.82, bar > 13);
  }
  add("timpani", 16, 1, 3, 40, 0.20, false, false, { roll: true, velEnd: 0.88 });
  addHarpGliss(add, 16, 2, 1.8, [52,55,57,59,62,64,67,71,76,79,83], 0.44, 0.88);
  // 17-22: ⑥ Climax (Em)
  add("timpani", 17, 0, 1.5, 40, 0.94);
  for (let bar = 17; bar <= 22; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 21 ? 0.80 : bar === 22 ? 0.56 : 1.0;
    const top = [76, 78, 79, 83, 81, 76][bar - 17];
    add("violin1", bar, 0, 4, top, 1.08 * dim, bar > 17, bar === 17);
    add("violin2", bar, 0, 4, top - 12, 0.94 * dim, bar > 17);
    add("tremolo", bar, 0, 4, top - 5, 0.72 * dim, bar > 17);
    add("horn", bar, 0, 4, c[1] + 12, 0.94 * dim, bar > 17);
    add("choir", bar, 0, 4, 64, 0.44 * dim, bar > 17);
    add("cello", bar, 0, 4, c[1], 0.88 * dim, bar > 17);
    add("bass", bar, 0, 4, c[0], 0.95 * dim, bar > 17);
    addPianoArp16(add, bar, c, 0.34 * dim);
    if (bar <= 21) addHarpGliss(add, bar, 0, 2.0, c.map(x => x + 12), 0.55 * dim, 0.75 * dim);
  }
  // 23-28: ① Piano outro
  for (let bar = 23; bar <= 28; bar++) {
    addPianoArp4(add, bar, ch[prog[bar - 1]], Math.max(0.22, 0.30 - (bar - 23) * 0.014));
    add("piano", bar, 0, 4, [69,67,65,64,62,62][bar - 23], 0.34 - (bar - 23) * 0.01, false, false, { pedal: true });
  }
}, 2001, -17.0, 0.21, [
  [1, 62], [5, 62], [6.5, 57], [7, 64], [12, 64], [13, 66], [16, 68],
  [17, 70], [21, 70], [22.5, 57], [23, 62], [29, 62]
]);

// ============================================================================
// bgm_reminiscence — 빛바랜 기억 (Ref: TalesWeaver - Reminiscence 결 반영)
// D minor / F major warmth, 4/4, 88 BPM rubato, 60 bars = ~164s = 2:44
// Flow: ① Flowing Piano -> ② Flute -> ④ Ensemble -> ③ Violin+Piano -> ⑥ Climax -> ① Piano
// ============================================================================
renderTrack("bgm_reminiscence", 88, 4, 60, (add) => {
  const ch = {
    Dm:[38,45,50,53], Bb:[34,41,46,53], Gm:[43,50,55,58], C:[36,43,48,55], F:[41,48,53,57], A:[33,40,45,49]
  };
  const prog = [
    "Dm","Bb","F","C",    "Dm","Bb","Gm","A",   "Dm","Bb","F","A",       // 1-12: ① Flowing Piano
    "Dm","Bb","Gm","A",   "Dm","C","Bb","A",                             // 13-20: ② Flute
    "Dm","Bb","C","F",    "Gm","Dm","Bb","A",                            // 21-28: ④ Ensemble
    "Dm","F","Bb","C",    "Dm","Bb","Gm","A",                            // 29-36: ③ Violin+Piano (lyrical)
    "Bb","C","Dm","F",    "Gm","A","Bb","C",    "Dm","Bb","Gm","A",      // 37-48: ⑥ Climax (61%-80%)
    "Dm","Bb","F","C",    "Dm","Bb","Gm","A",   "Dm","Bb","Gm","A"       // 49-60: ① Piano outro
  ];
  for (let bar = 1; bar <= 12; bar++) {
    addPianoArp4(add, bar, ch[prog[bar - 1]], 0.28, [0,1,2,3,2,3,2,1]);
    const m = [62,65,69,67, 65,62,67,64, 62,65,69,64][bar - 1];
    add("piano", bar, 0, 1.5, m, 0.39, false, false, { pedal: true });
    add("piano", bar, 1.5, 0.5, m + 2, 0.36, false, false, { pedal: true });
    add("piano", bar, 2.0, 2.0, m + 3, 0.38, false, false, { pedal: true });
  }
  for (let bar = 13; bar <= 20; bar++) {
    const c = ch[prog[bar - 1]];
    add("flute", bar, 0, 2, [69,70,67,69, 74,72,70,69][bar - 13], 0.48, bar > 13);
    add("flute", bar, 2, 2, [72,69,65,64, 72,70,69,64][bar - 13], 0.45, true);
    add("piano", bar, 0, 4, c[0], 0.24, false, false, { pedal: true });
  }
  for (let bar = 21; bar <= 28; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [65,70,72,69, 67,65,70,69][bar - 21];
    add("violin1", bar, 0, 4, top, 0.62, bar > 21);
    add("violin2", bar, 0, 4, top - 4, 0.48, bar > 21);
    add("cello", bar, 0, 4, c[1], 0.56, bar > 21);
    add("bass", bar, 0, 4, c[0], 0.52, bar > 21);
    add("oboe", bar, 2, 2, top - 5, 0.48, bar > 21);
  }
  for (let bar = 29; bar <= 36; bar++) {
    const c = ch[prog[bar - 1]];
    addPianoArp4(add, bar, c, 0.34, [0,1,2,3,2,3,2,1]);
    const m = [69,72,74,72, 69,70,67,69][bar - 29];
    add("soloViolin", bar, 0, 1.5, m, 0.56, bar > 29);
    add("soloViolin", bar, 1.5, 0.5, m + 2, 0.54, true);
    add("soloViolin", bar, 2.0, 2.0, m + 3, 0.58, true);
  }
  add("timpani", 36, 1, 3, 38, 0.18, false, false, { roll: true, velEnd: 0.85 });
  addHarpGliss(add, 36, 2, 1.8, [50,53,57,58,62,65,69,70,74,77,81], 0.42, 0.84);
  add("timpani", 37, 0, 1.5, 34, 0.92);
  add("timpani", 43, 0, 1.5, 43, 0.90);
  for (let bar = 37; bar <= 48; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 47 ? 0.80 : bar === 48 ? 0.55 : 1.0;
    const top = [74,76,77,81, 79,77,74,76, 77,74,70,73][bar - 37];
    add("violin1", bar, 0, 4, top, 1.06 * dim, bar > 37, bar === 37);
    add("violin2", bar, 0, 4, top - 12, 0.92 * dim, bar > 37);
    add("tremolo", bar, 0, 4, top - 5, 0.70 * dim, bar > 37);
    add("horn", bar, 0, 4, c[1] + 12, 0.92 * dim, bar > 37);
    add("choir", bar, 0, 4, 62, 0.42 * dim, bar > 37);
    add("cello", bar, 0, 4, c[1], 0.86 * dim, bar > 37);
    add("bass", bar, 0, 4, c[0], 0.92 * dim, bar > 37);
    addPianoArp16(add, bar, c, 0.34 * dim);
    if (bar <= 47) addHarpGliss(add, bar, 0, 2.0, c.map(x => x + 12), 0.52 * dim, 0.72 * dim);
  }
  for (let bar = 49; bar <= 60; bar++) {
    addPianoArp4(add, bar, ch[prog[bar - 1]], Math.max(0.20, 0.30 - (bar - 49) * 0.008));
    add("piano", bar, 0, 4, [69,67,65,64, 62,65,67,64, 62,65,64,62][bar - 49], 0.34 - (bar - 49) * 0.007, false, false, { pedal: true });
  }
}, 2002, -17.0, 0.21, [
  [1, 86], [11, 86], [12.5, 76], [13, 84], [20, 84], [21, 88], [28, 88],
  [29, 86], [36, 92], [37, 94], [46, 94], [48.5, 76], [49, 84], [61, 86]
]);

// ============================================================================
// bgm_long_ago — 먼 옛날의 오후 (Ref: Yuriko Nakamura - Long Long Ago 결 반영)
// F major, 4/4, 84 BPM expressive rubato, 56 bars = ~162s = 2:42
// Flow: ③ Oboe+Piano+Cello -> ④ Ensemble -> ② Clarinet -> ⑤ Tutti -> ⑥ Short Climax -> ③ Oboe+Piano+Cello
// ============================================================================
renderTrack("bgm_long_ago", 84, 4, 56, (add) => {
  const ch = {
    F:[41,48,53,57], Dm:[38,45,50,53], Bb:[34,41,46,53], C:[36,43,48,55], Gm:[43,50,55,58], Am:[45,52,57,60]
  };
  const prog = [
    "F","C","Dm","Bb",    "F","C","Dm","C",     "F","Bb","F","C",        // 1-12: ③ Oboe + Piano + Cello
    "F","Dm","Bb","C",    "Am","Dm","Gm","C",                            // 13-20: ④ Ensemble
    "Bb","C","F","Dm",    "Gm","C","F","C",                              // 21-28: ② Clarinet solo
    "Bb","C","Am","Dm",   "Gm","C","F","C",                              // 29-36: ⑤ Tutti
    "Bb","C","F","Dm",    "Gm","C","Bb","C",                             // 37-44: ⑥ Climax (64%-79%)
    "F","Dm","Bb","C",    "F","Dm","Bb","C",    "F","C","F","C"          // 45-56: ③ Oboe + Piano + Cello
  ];
  for (let bar = 1; bar <= 12; bar++) {
    const c = ch[prog[bar - 1]];
    addPianoArp4(add, bar, c, 0.28);
    add("oboe", bar, 0, 2, [65,67,69,70, 65,67,69,67, 69,70,69,67][bar - 1], 0.48, bar > 1);
    add("oboe", bar, 2, 2, [69,72,65,69, 67,69,65,64, 72,69,65,64][bar - 1], 0.46, true);
    if (bar >= 5) add("soloCello", bar, 0, 4, c[1], 0.42, bar > 5);
  }
  for (let bar = 13; bar <= 20; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [69,74,70,67, 69,74,70,72][bar - 13];
    add("violin1", bar, 0, 4, top, 0.62, bar > 13);
    add("violin2", bar, 0, 4, top - 4, 0.48, bar > 13);
    add("cello", bar, 0, 4, c[1], 0.56, bar > 13);
    add("bass", bar, 0, 4, c[0], 0.50, bar > 13);
  }
  for (let bar = 21; bar <= 28; bar++) {
    const c = ch[prog[bar - 1]];
    add("clarinet", bar, 0, 2, [65,67,69,65, 67,64,65,67][bar - 21], 0.48, bar > 21);
    add("clarinet", bar, 2, 2, [69,64,65,69, 65,67,69,64][bar - 21], 0.45, true);
    add("piano", bar, 0, 4, c[0], 0.22, false, false, { pedal: true });
  }
  for (let bar = 29; bar <= 36; bar++) {
    const c = ch[prog[bar - 1]];
    const top = [70,72,76,74, 70,72,74,72][bar - 29];
    add("violin1", bar, 0, 4, top, 0.84, bar > 29);
    add("violin2", bar, 0, 4, top - 12, 0.72, bar > 29);
    add("horn", bar, 0, 4, c[1] + 12, 0.72, bar > 29);
    add("cello", bar, 0, 4, c[1], 0.72, bar > 29);
    add("bass", bar, 0, 4, c[0], 0.78, bar > 29);
  }
  add("timpani", 36, 1, 3, 36, 0.18, false, false, { roll: true, velEnd: 0.84 });
  addHarpGliss(add, 36, 2, 1.8, [53,55,57,60,62,65,67,69,72,74,77,81], 0.42, 0.84);
  add("timpani", 37, 0, 1.5, 41, 0.90);
  for (let bar = 37; bar <= 44; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 43 ? 0.80 : bar === 44 ? 0.56 : 1.0;
    const top = [74,76,77,81, 79,77,74,72][bar - 37];
    add("violin1", bar, 0, 4, top, 1.04 * dim, bar > 37, bar === 37);
    add("violin2", bar, 0, 4, top - 12, 0.90 * dim, bar > 37);
    add("tremolo", bar, 0, 4, top - 5, 0.68 * dim, bar > 37);
    add("horn", bar, 0, 4, c[1] + 12, 0.88 * dim, bar > 37);
    add("choir", bar, 0, 4, 65, 0.40 * dim, bar > 37);
    add("cello", bar, 0, 4, c[1], 0.84 * dim, bar > 37);
    add("bass", bar, 0, 4, c[0], 0.90 * dim, bar > 37);
    addPianoArp16(add, bar, c, 0.30 * dim);
    if (bar <= 43) addHarpGliss(add, bar, 0, 2.0, c.map(x => x + 12), 0.52 * dim, 0.72 * dim);
  }
  for (let bar = 45; bar <= 56; bar++) {
    const c = ch[prog[bar - 1]];
    addPianoArp4(add, bar, c, Math.max(0.22, 0.28 - (bar - 45) * 0.005));
    if (bar <= 52) {
      add("oboe", bar, 0, 4, [69,65,67,64, 65,69,67,65][bar - 45], 0.46 - (bar - 45) * 0.015, bar > 45);
      add("soloCello", bar, 0, 4, c[1], 0.40 - (bar - 45) * 0.015, bar > 45);
    }
  }
}, 2004, -17.0, 0.21, [
  [1, 80], [11, 82], [12.5, 74], [13, 84], [20, 82], [21, 80], [28, 78],
  [29, 86], [36, 88], [37, 90], [42, 90], [44.5, 75], [45, 82], [57, 80]
]);

// ============================================================================
// bgm_ashen_banner — 잿빛 깃발 아래 (Ref: Rhapsody - Emerald Sword 결 반영)
// C minor, 4/4, 92 BPM rubato, 56 bars = ~150s = 2:30 (Baroque/symphonic fantasy drive in ⑤ & ⑥!)
// Flow: 저음 박동만 -> ② Horn solo -> ④ Ensemble -> ① Piano march -> ⑤ Tutti -> ⑥ Climax -> 저음 박동만
// ============================================================================
renderTrack("bgm_ashen_banner", 92, 4, 56, (add) => {
  const roots = [36, 36, 32, 31];
  for (let bar = 1; bar <= 56; bar++) {
    if (bar >= 21 && bar <= 26) continue;
    const r = roots[(bar - 1) % 4];
    const v = bar <= 4 ? 0.18 + bar * 0.06 : bar >= 48 ? Math.max(0.16, 0.52 - (bar - 48) * 0.045) : bar >= 35 && bar <= 44 ? 0.96 : 0.54;
    for (let bt = 0; bt < 4; bt++) {
      add("bass", bar, bt, 0.85, r, v * (bt === 0 ? 1.0 : 0.78), false, bar === 35 && bt === 0);
      if (bar >= 5 && bar <= 46) add("cello", bar, bt, 0.8, r + 12, v * 0.82);
    }
  }
  for (let bar = 5; bar <= 12; bar++) {
    const m = [48,51,55,53, 51,50,48,55][bar - 5];
    add("horn", bar, 0, 2, m, 0.52, bar > 5);
    add("horn", bar, 2, 2, m + 2, 0.50, true);
  }
  for (let bar = 13; bar <= 20; bar++) {
    const m = [60,63,67,65, 63,62,60,55][bar - 13];
    add("violin1", bar, 0, 4, m, 0.65, bar > 13);
    add("violin2", bar, 0, 4, m - 4, 0.52, bar > 13);
    add("horn", bar, 0, 4, m - 12, 0.58, bar > 13);
  }
  const pCh = { 21:[36,43,48,51], 22:[36,43,48,51], 23:[32,39,44,48], 24:[31,38,43,47], 25:[36,43,48,51], 26:[31,38,43,47] };
  for (let bar = 21; bar <= 26; bar++) {
    addPianoArp4(add, bar, pCh[bar], 0.25);
    add("piano", bar, 0, 2, [60,63,67,65, 63,62][bar - 21], 0.36, false, false, { pedal: true });
    add("piano", bar, 2, 2, [63,67,68,67, 65,60][bar - 21], 0.34, false, false, { pedal: true });
  }
  for (let bar = 27; bar <= 34; bar++) {
    const m = [67,68,72,70, 68,67,65,62][bar - 27];
    add("violin1", bar, 0, 2, m, 0.88, bar > 27);
    add("violin1", bar, 2, 2, m + 3, 0.86, true);
    add("violin2", bar, 0, 4, m - 12, 0.76, bar > 27);
    add("horn", bar, 0, 4, m - 12, 0.84, bar > 27);
    add("choir", bar, 0, 4, 60, 0.38, bar > 27);
  }
  add("timpani", 34, 1, 3, 36, 0.20, false, false, { roll: true, velEnd: 0.92 });
  addHarpGliss(add, 34, 2, 1.8, [48,50,51,55,58,60,63,67,72,75,79], 0.44, 0.86);
  add("timpani", 35, 0, 1.5, 36, 0.98);
  add("timpani", 39, 0, 1.5, 36, 0.98);
  for (let bar = 35; bar <= 44; bar++) {
    const dim = bar === 43 ? 0.80 : bar === 44 ? 0.56 : 1.0;
    const m = [79,80,84,82, 80,79,77,75, 74,72][bar - 35];
    const c = pCh[21 + ((bar - 35) % 4)];
    // Baroque/symphonic driving 8th-note string figures in Violin I!
    for (let k = 0; k < 4; k++) {
      add("violin1", bar, k, 1.0, m + (k % 2 ? 2 : 0), 1.08 * dim, bar > 35 || k > 0, bar === 35 && k === 0);
    }
    add("violin2", bar, 0, 4, m - 12, 0.96 * dim, bar > 35);
    add("tremolo", bar, 0, 4, m - 12, 0.74 * dim, bar > 35);
    add("horn", bar, 0, 4, m - 24, 1.00 * dim, bar > 35);
    add("choir", bar, 0, 4, 63, 0.52 * dim, bar > 35);
    addPianoArp16(add, bar, c, 0.34 * dim);
    if (bar <= 43) addHarpGliss(add, bar, 0, 2.0, c.map(x => x + 12), 0.54 * dim, 0.74 * dim);
  }
}, 2005, -17.0, 0.21, [
  [1, 84], [19, 86], [20.5, 76], [21, 82], [26, 80], [27, 90],
  [34, 96], [35, 100], [42, 100], [44.5, 80], [45, 86], [57, 84]
]);

// ============================================================================
// bgm_fallen_star — 별이 진 자리 (B minor, 3/4, 58 BPM rubato, 54 bars = ~168s = 2:48)
// Flow: ② Violin solo -> ① Piano -> ③ Cello+Piano -> ④ Ensemble -> ⑥ Climax (63%-78%) -> ① Piano + ② Violin
// ============================================================================
renderTrack("bgm_fallen_star", 58, 3, 54, (add) => {
  const ch = {
    Bm:[35,42,47,50], G:[43,50,55,59], D:[38,45,50,54], A:[33,40,45,49], Em:[40,47,52,55], Fs:[42,49,54,58]
  };
  const prog = [
    "Bm","G","D","A",     "Em","Fs","Bm","Fs",            // 1-8: ② Violin solo
    "Bm","G","D","A",     "Em","Bm","G","Fs",             // 9-16: ① Piano
    "Bm","D","G","A",     "Em","Fs",                      // 17-22: ③ Cello + Piano
    "Bm","G","D","A",     "Em","Fs","Bm","D",   "G","Fs", // 23-32: ④ Ensemble
    "Bm","G","D","A",     "Em","Bm","G","Fs",   "Bm","Fs",// 33-42: ⑥ Climax (61%-78%)
    "Bm","G","D","A",     "Em","Fs","Bm","G",   "D","A","Bm","Fs" // 43-54: ① Piano + ② Violin
  ];
  for (let bar = 1; bar <= 8; bar++) {
    add("soloViolin", bar, 0, 2, [71,74,69,67, 64,66,71,66][bar - 1], 0.44, bar > 1);
    add("soloViolin", bar, 2, 1, [73,71,67,66, 66,64,69,66][bar - 1], 0.41, true);
  }
  for (let bar = 9; bar <= 16; bar++) {
    const c = ch[prog[bar - 1]];
    for (let i = 0; i < 3; i++) add("piano", bar, i, 2.0, c[i], 0.25, false, false, { pedal: true });
    add("piano", bar, 0, 3, [71,74,69,67, 64,71,67,66][bar - 9], 0.37, false, false, { pedal: true });
  }
  for (let bar = 17; bar <= 22; bar++) {
    const c = ch[prog[bar - 1]];
    for (let i = 0; i < 3; i++) add("piano", bar, i, 2.0, c[i], 0.26, false, false, { pedal: true });
    add("soloCello", bar, 0, 3, [47,50,55,57, 52,49][bar - 17], 0.54, bar > 17);
  }
  for (let bar = 23; bar <= 32; bar++) {
    const c = ch[prog[bar - 1]];
    add("bass", bar, 0, 3, c[0], 0.56, bar > 23);
    add("viola", bar, 1, 0.9, c[2], 0.42); add("viola", bar, 2, 0.9, c[3], 0.40);
    add("violin1", bar, 0, 3, [71,74,78,76, 74,73,71,74, 76,73][bar - 23], 0.68, bar > 23);
    add("cello", bar, 0, 3, c[1], 0.56, bar > 23);
  }
  add("timpani", 32, 0.5, 2.5, 35, 0.18, false, false, { roll: true, velEnd: 0.86 });
  addHarpGliss(add, 32, 1.2, 1.7, [47,50,54,57,59,62,66,69,71,74,78,83], 0.42, 0.85);
  add("timpani", 33, 0, 1.5, 35, 0.92);
  add("timpani", 37, 0, 1.5, 40, 0.90);
  for (let bar = 33; bar <= 42; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === 41 ? 0.80 : bar === 42 ? 0.55 : 1.0;
    const top = [71,74,78,76, 74,73,71,70, 74,73][bar - 33];
    add("violin1", bar, 0, 3, top, 1.08 * dim, bar > 33, bar === 33);
    add("violin2", bar, 0, 3, top - 12, 0.94 * dim, bar > 33);
    add("tremolo", bar, 0, 3, top - 5, 0.68 * dim, bar > 33);
    add("horn", bar, 0, 3, c[1] + 12, 0.92 * dim, bar > 33);
    add("choir", bar, 0, 3, 62, 0.42 * dim, bar > 33);
    add("cello", bar, 0, 3, c[1], 0.86 * dim, bar > 33);
    add("bass", bar, 0, 3, c[0], 0.94 * dim, bar > 33);
    for (let i = 0; i < 6; i++) add("piano", bar, i * 0.5, 1.2, c[i % 4] + 12, 0.30 * dim, false, false, { pedal: true });
    if (bar <= 41) addHarpGliss(add, bar, 0, 1.5, c.map(x => x + 12), 0.50 * dim, 0.70 * dim);
  }
  for (let bar = 43; bar <= 54; bar++) {
    const c = ch[prog[bar - 1]];
    const fade = Math.max(0.20, 0.28 - (bar - 43) * 0.006);
    for (let i = 0; i < 3; i++) add("piano", bar, i, 2.0, c[i], fade, false, false, { pedal: true });
    add("soloViolin", bar, 0, 3, [71,69,67,66, 64,66,71,69, 67,66,64,66][bar - 43], 0.40 - (bar - 43) * 0.008, bar > 43);
  }
}, 2006, -17.0, 0.21, [
  [1, 56], [7, 56], [8.5, 52], [9, 58], [16, 56], [17, 58], [22, 58],
  [23, 60], [32, 62], [33, 64], [40, 64], [42.5, 53], [43, 56], [55, 56]
]);

// Helper for 3/4 waltz piano accompaniment
function addPianoWaltz(add, bar, chord, vel) {
  add("piano", bar, 0, 2.5, chord[0], vel * 1.05, false, false, { pedal: true });
  add("piano", bar, 1, 1.5, chord[1], vel * 0.80, false, false, { pedal: true });
  add("piano", bar, 1, 1.5, chord[2], vel * 0.78, false, false, { pedal: true });
  add("piano", bar, 2, 1.5, chord[1], vel * 0.74, false, false, { pedal: true });
  add("piano", bar, 2, 1.5, chord[3] || chord[2], vel * 0.72, false, false, { pedal: true });
}

// Generic structured builder for 4/4 and 3/4 Flag themes (40-56 bars, 2:05-2:35)
function buildFlagTheme(add, bars, bpb, cfg) {
  const { ch, prog, sec, colorInst, mel1, mel2, melEns, melTutti, melClim, melEnd, darkPiano, heavyTutti, bigChoir, brightClimax, pianoHeavy } = cfg;
  const s1 = sec[0], s2 = sec[1], s3 = sec[2], s4 = sec[3], s5 = sec[4]; // end bars of ①/②, ④, ②color, ⑤, ⑥

  // Section 1 (1..s1): ① Piano solo or ② Solo instrument
  for (let bar = 1; bar <= s1; bar++) {
    const c = ch[prog[bar - 1]];
    const m = mel1[(bar - 1) % mel1.length];
    if (cfg.openWith === "piano") {
      const pCh = darkPiano ? c.map(x => x - 12) : c;
      if (bpb === 3) addPianoWaltz(add, bar, pCh, pianoHeavy ? 0.28 : 0.25);
      else addPianoArp4(add, bar, pCh, pianoHeavy ? 0.28 : 0.25);
      add("piano", bar, 0, bpb, darkPiano ? m - 12 : m, 0.36, false, false, { pedal: true });
    } else {
      add(colorInst, bar, 0, bpb, m, 0.46, bar > 1);
      add("piano", bar, 0, bpb, c[0], 0.22, false, false, { pedal: true });
    }
  }

  // Section 2 (s1+1..s2): ④ Lyric ensemble
  for (let bar = s1 + 1; bar <= s2; bar++) {
    const c = ch[prog[bar - 1]];
    const m = melEns[(bar - s1 - 1) % melEns.length];
    add("violin1", bar, 0, bpb, m, 0.60, bar > s1 + 1);
    add("violin2", bar, 0, bpb, m - 4, 0.46, bar > s1 + 1);
    add("cello", bar, 0, bpb, c[1], 0.54, bar > s1 + 1);
    add("bass", bar, 0, bpb, c[0], 0.50, bar > s1 + 1);
    if (pianoHeavy) {
      if (bpb === 3) addPianoWaltz(add, bar, c, 0.22);
      else addPianoArp4(add, bar, c, 0.22);
    }
  }

  // Section 3 (s2+1..s3): ② Color instrument solo
  for (let bar = s2 + 1; bar <= s3; bar++) {
    const c = ch[prog[bar - 1]];
    const m = mel2[(bar - s2 - 1) % mel2.length];
    add(colorInst, bar, 0, bpb, m, 0.48, bar > s2 + 1);
    add("piano", bar, 0, bpb, c[0], 0.22, false, false, { pedal: true });
    if (bar >= s3 - 1) add("cello", bar, 0, bpb, c[1], 0.38 + (bar - (s3 - 1)) * 0.14, bar > s3 - 1);
  }

  // Section 4 (s3+1..s4): ⑤ Grand tutti
  for (let bar = s3 + 1; bar <= s4; bar++) {
    const c = ch[prog[bar - 1]];
    const m = melTutti[(bar - s3 - 1) % melTutti.length];
    const hw = heavyTutti ? 1.06 : 0.90;
    add("violin1", bar, 0, bpb, m, 0.86, bar > s3 + 1);
    add("violin2", bar, 0, bpb, m - 12, 0.74, bar > s3 + 1);
    add("horn", bar, 0, bpb, c[1] + 12, 0.78 * hw, bar > s3 + 1);
    add("cello", bar, 0, bpb, c[1], 0.78 * hw, bar > s3 + 1);
    add("bass", bar, 0, bpb, c[0], 0.84 * hw, bar > s3 + 1);
  }
  add("timpani", s4, bpb === 3 ? 0.5 : 1.0, bpb - 1, ch[prog[s4 - 1]][0], 0.18, false, false, { roll: true, velEnd: 0.86 });
  addHarpGliss(add, s4, bpb === 3 ? 1.2 : 2.0, bpb === 3 ? 1.7 : 1.8, ch[prog[s4 - 1]].map(x => x + 12), 0.42, 0.84);

  // Section 5 (s4+1..s5): ⑥ Brilliant climax (60%-80%)
  add("timpani", s4 + 1, 0, 1.5, ch[prog[s4]][0], 0.92);
  for (let bar = s4 + 1; bar <= s5; bar++) {
    const c = ch[prog[bar - 1]];
    const dim = bar === s5 - 1 ? 0.80 : bar === s5 ? 0.56 : 1.0;
    const m = melClim[(bar - s4 - 1) % melClim.length];
    add("violin1", bar, 0, bpb, m, 1.06 * dim, bar > s4 + 1, bar === s4 + 1);
    add("violin2", bar, 0, bpb, m - 12, 0.92 * dim, bar > s4 + 1);
    add("tremolo", bar, 0, bpb, m - 5, 0.68 * dim, bar > s4 + 1);
    add("horn", bar, 0, bpb, c[1] + 12, 0.92 * dim, bar > s4 + 1);
    add("choir", bar, 0, bpb, 64, (bigChoir ? 0.54 : 0.40) * dim, bar > s4 + 1);
    add("cello", bar, 0, bpb, c[1], 0.86 * dim, bar > s4 + 1);
    add("bass", bar, 0, bpb, c[0], 0.94 * dim, bar > s4 + 1);
    if (bpb === 4) addPianoArp16(add, bar, c, (brightClimax ? 0.36 : 0.28) * dim);
    else for (let i = 0; i < 6; i++) add("piano", bar, i * 0.5, 1.2, c[i % 4] + 12, 0.30 * dim, false, false, { pedal: true });
    if (brightClimax) add("flute", bar, 0, bpb, m + 12, 0.58 * dim, bar > s4 + 1);
    if (bar < s5) addHarpGliss(add, bar, 0, bpb * 0.5, c.map(x => x + 12), 0.52 * dim, 0.72 * dim);
  }

  // Section 6 (s5+1..bars): ③ Chamber -> ① Piano closing
  for (let bar = s5 + 1; bar <= bars; bar++) {
    const c = ch[prog[bar - 1]];
    const m = melEnd[(bar - s5 - 1) % melEnd.length];
    const pCh = darkPiano ? c.map(x => x - 12) : c;
    const fade = Math.max(0.20, 0.28 - (bar - s5 - 1) * 0.008);
    if (bpb === 3) addPianoWaltz(add, bar, pCh, fade);
    else addPianoArp4(add, bar, pCh, fade);
    if (bar <= s5 + 4) add(colorInst, bar, 0, bpb, m, 0.42 - (bar - s5 - 1) * 0.02, bar > s5 + 1);
    else add("piano", bar, 0, bpb, darkPiano ? m - 12 : m, 0.32 - (bar - s5 - 5) * 0.01, false, false, { pedal: true });
  }
}

// flag_B1 — 잿불 고블린 (Ref: 두번째달 - 얼음연못 결 반영: G장조 3/4 왈츠, 따뜻하고 탄력 있는 왈츠 리듬)
renderTrack("flag_B1", 86, 3, 56, (add) => {
  buildFlagTheme(add, 56, 3, {
    ch: { G:[43,50,55,59], D:[38,45,50,54], Em:[40,47,52,55], C:[36,43,48,52], Am:[45,52,57,60] },
    prog: [
      "G","D","Em","C",   "G","D","C","D",   "G","D",                   // 1-10 ① Piano
      "G","Em","C","D",   "Am","D","G","D",                             // 11-18 ④ Ensemble
      "G","C","Am","D",   "Em","C","Am","D", "G","D",                   // 19-28 ② Clarinet
      "C","D","G","Em",   "Am","D",                                     // 29-34 ⑤ Tutti
      "G","D","Em","C",   "Am","D","G","C",  "G","D",                   // 35-44 ⑥ Climax (62.5%-78.6%)
      "G","D","Em","C",   "Am","D","G","C",  "G","D","G","D"            // 45-56 ③ -> ①
    ],
    sec: [10, 18, 28, 34, 44], openWith: "piano", colorInst: "clarinet", brightClimax: true, pianoHeavy: true,
    mel1: [67,69,71,72, 74,71,69,67], melEns: [71,74,76,74, 72,69,71,69],
    mel2: [67,72,69,74, 71,72,69,66], melTutti: [72,74,79,76, 72,74],
    melClim: [79,81,83,84, 81,78,79,76, 79,74], melEnd: [67,69,71,72, 71,69,67,67]
  });
}, 2007, -17.0, 0.21, [[1,79],[10,76],[11,81],[28,81],[34,85],[35,87],[42,87],[45,78],[56,80]]);

// flag_B2 — 무쇠수염 드워프 (D minor, 4/4, 68 BPM rubato, 40 bars = ~143s = 2:23, Bassoon)
renderTrack("flag_B2", 68, 4, 40, (add) => {
  buildFlagTheme(add, 40, 4, {
    ch: { Dm:[38,45,50,53], Bb:[34,41,46,50], Gm:[43,50,55,58], C:[36,43,48,52], A:[33,40,45,49], F:[41,48,53,57] },
    prog: [
      "Dm","Bb","Gm","A",  "Dm","C","Bb","A",                           // 1-8 ② Bassoon
      "Dm","F","Bb","C",   "Gm","A",                                    // 9-14 ④ Ensemble
      "Dm","Bb","C","F",   "Gm","Dm","Bb","A",                          // 15-22 ② Bassoon
      "Bb","C","Dm","A",                                                // 23-26 ⑤ Heavy Tutti
      "Dm","Bb","C","F",   "Gm","A",                                    // 27-32 ⑥ Climax (65%-80%)
      "Dm","Bb","Gm","A",  "Dm","C","Dm","A"                            // 33-40 ③ -> ①
    ],
    sec: [8, 14, 22, 26, 32], openWith: "color", colorInst: "bassoon", heavyTutti: true,
    mel1: [50,53,55,52, 50,48,46,45], melEns: [62,65,70,67, 67,64],
    mel2: [50,53,55,53, 50,50,46,45], melTutti: [70,72,74,73],
    melClim: [74,77,79,81, 79,76], melEnd: [50,53,55,52, 62,60,62,62]
  });
}, 2008, -17.0, 0.21, [[1,66],[8,64],[9,68],[22,68],[26,70],[27,72],[31,72],[33,64],[40,66]]);

// flag_B3 — 번개 노움 (Ref: DJ Okawari - Flower Dance 결 반영: 반짝이는 고음 피아노 아르페지오 + 플루트·바이올린)
renderTrack("flag_B3", 92, 4, 52, (add) => {
  buildFlagTheme(add, 52, 4, {
    ch: { C:[48,55,60,64], D:[50,57,62,66], Em:[40,47,52,55], G:[43,50,55,59], Am:[45,52,57,60] },
    prog: [
      "C","D","Em","G",    "C","D","G","D",   "C","D",                  // 1-10 ① Sparkling Piano
      "C","D","G","Em",    "Am","D","C","D",                            // 11-18 ④ Ensemble
      "C","D","Em","D",    "C","Am","D","G",  "C","D",                  // 19-28 ② Flute
      "C","D","Em","D",                                                 // 29-32 ⑤ Tutti
      "C","D","G","Em",    "Am","D","C","D",  "G","D",                  // 33-42 ⑥ Climax (63.5%-80.8%)
      "C","D","Em","G",    "C","D","C","G",   "C","G"                   // 43-52 ③ -> ①
    ],
    sec: [10, 18, 28, 32, 42], openWith: "piano", colorInst: "flute", brightClimax: true, pianoHeavy: true,
    mel1: [76,78,79,83, 84,86,83,81], melEns: [72,74,79,76, 72,74,72,69],
    mel2: [72,74,76,78, 79,76,74,71], melTutti: [76,78,79,81],
    melClim: [76,78,79,83, 81,78,79,74, 79,78], melEnd: [72,74,71,67, 64,66,67,67]
  });
}, 2009, -17.0, 0.21, [[1,88],[10,85],[11,92],[28,92],[32,95],[33,98],[40,98],[43,86],[52,88]]);

// flag_G1 — 바위주먹 오크 (E minor, 4/4, 68 BPM rubato, 40 bars = ~143s = 2:23, Oboe)
renderTrack("flag_G1", 68, 4, 40, (add) => {
  buildFlagTheme(add, 40, 4, {
    ch: { Em:[40,47,52,55], C:[36,43,48,52], D:[38,45,50,54], G:[43,50,55,59], Am:[45,52,57,60], B:[35,42,47,51] },
    prog: [
      "Em","C","D","G",    "Em","Am","D","B",                           // 1-8 ② Oboe
      "Em","G","C","D",    "Am","B",                                    // 9-14 ④ Ensemble
      "Em","C","G","D",    "Am","Em","C","B",                           // 15-22 ② Oboe
      "C","D","Em","B",                                                 // 23-26 ⑤ Heavy Tutti
      "Em","C","D","G",    "Am","B",                                    // 27-32 ⑥ Climax (65%-80%)
      "Em","C","D","B",    "Em","C","D","Em"                            // 33-40 ③ -> ①
    ],
    sec: [8, 14, 22, 26, 32], openWith: "color", colorInst: "oboe", heavyTutti: true,
    mel1: [64,67,69,71, 67,69,66,63], melEns: [67,71,72,74, 72,71],
    mel2: [64,67,71,69, 69,67,64,63], melTutti: [72,74,76,75],
    melClim: [76,79,81,83, 81,79], melEnd: [64,67,66,63, 64,64,62,64]
  });
}, 2011, -17.0, 0.21, [[1,66],[8,64],[9,68],[22,68],[26,70],[27,72],[31,72],[33,64],[40,66]]);

// flag_G2 — 이끼 트롤 (A Dorian F#, 3/4, 70 BPM rubato, 52 bars = ~136s = 2:16, Oboe)
renderTrack("flag_G2", 70, 3, 52, (add) => {
  buildFlagTheme(add, 52, 3, {
    ch: { Am:[45,52,57,60], D:[38,45,50,54], G:[43,50,55,59], Em:[40,47,52,55], C:[36,43,48,52] },
    prog: [
      "Am","D","G","Em",   "Am","D","Em","Am",  "Am","D",               // 1-10 ① Piano (heavy)
      "Am","C","D","G",    "Em","Am","D","Em",                          // 11-18 ④ Ensemble
      "Am","D","Em","C",   "Am","D","G","Em",                           // 19-26 ② Oboe
      "C","D","Em","Am",   "D","Em",                                    // 27-32 ⑤ Tutti
      "Am","D","G","C",    "D","Em","Am","D",   "Am","Em",              // 33-42 ⑥ Climax (61.5%-80.8%)
      "Am","D","G","Em",   "Am","D","Em","Am",  "Am","Em"               // 43-52 ③ -> ①
    ],
    sec: [10, 18, 26, 32, 42], openWith: "piano", colorInst: "oboe", pianoHeavy: true,
    mel1: [69,66,67,64, 69,66,64,69], melEns: [69,72,74,71, 71,69,66,64],
    mel2: [69,74,71,72, 69,66,67,64], melTutti: [72,74,76,72, 74,71],
    melClim: [76,78,79,84, 81,79,76,74, 76,71], melEnd: [69,66,67,64, 69,66,64,64]
  });
}, 2012, -17.0, 0.22, [[1,68],[10,66],[11,70],[26,70],[32,73],[33,75],[40,75],[43,66],[52,68]]);

// flag_A1 — 심연 마족 (Ref: 이병우 - 돌이킬 수 없는 걸음 결 반영: 서늘하고 우아한 3/4 느린 왈츠, 어두운 피아노+실내악)
renderTrack("flag_A1", 76, 3, 56, (add) => {
  buildFlagTheme(add, 56, 3, {
    ch: { Cm:[36,43,48,51], Ab:[32,39,44,48], Fm:[41,48,53,56], G:[31,38,43,47], Bb:[34,41,46,50] },
    prog: [
      "Cm","Ab","Fm","G",  "Cm","Bb","Ab","G",  "Cm","G",               // 1-10 ① Dark Piano
      "Cm","Ab","Bb","G",  "Fm","Cm","Ab","G",                          // 11-18 ④ Ensemble
      "Cm","Fm","Ab","G",  "Cm","Ab","Fm","G",  "Cm","G",               // 19-28 ② Clarinet
      "Ab","Bb","Cm","Fm", "G","Cm",                                    // 29-34 ⑤ Tutti
      "Cm","Ab","Fm","G",  "Ab","Bb","Cm","G",  "Cm","G",               // 35-44 ⑥ Climax (60.7%-78.6%)
      "Cm","Ab","Fm","G",  "Cm","Ab","Fm","G",  "Cm","G","Cm","G"       // 45-56 ③ -> ①
    ],
    sec: [10, 18, 28, 34, 44], openWith: "piano", colorInst: "clarinet", darkPiano: true, pianoHeavy: true,
    mel1: [60,63,65,62, 60,58,56,55], melEns: [63,68,70,67, 65,63,68,67],
    mel2: [60,65,63,62, 60,63,65,67], melTutti: [68,70,72,68, 71,72],
    melClim: [72,75,77,79, 80,77,75,74, 72,71], melEnd: [60,63,65,62, 60,63,60,60]
  });
}, 2017, -17.0, 0.22, [[1,72],[10,67],[11,76],[28,74],[34,78],[35,80],[42,80],[45,70],[56,72]]);

// flag_A2 — 성광 천족 (D major, 4/4, 62 BPM rubato, 40 bars = ~156s = 2:36, Flute)
renderTrack("flag_A2", 62, 4, 40, (add) => {
  buildFlagTheme(add, 40, 4, {
    ch: { D:[38,45,50,54], A:[33,40,45,49], Bm:[35,42,47,50], G:[43,50,55,59], Em:[40,47,52,55] },
    prog: [
      "D","A","Bm","G",    "D","G","Em","A",                            // 1-8 ① Piano
      "D","Bm","G","A",    "Em","A",                                    // 9-14 ④ Ensemble
      "D","G","Bm","A",    "G","D","Em","A",                            // 15-22 ② Flute
      "G","A","Bm","A",                                                 // 23-26 ⑤ Tutti
      "D","A","Bm","G",    "Em","A",                                    // 27-32 ⑥ Climax (65%-80%, Big Choir!)
      "D","A","Bm","G",    "D","G","D","A"                              // 33-40 ③ -> ①
    ],
    sec: [8, 14, 22, 26, 32], openWith: "piano", colorInst: "flute", bigChoir: true,
    mel1: [66,69,71,67, 66,67,64,69], melEns: [69,74,71,73, 71,69],
    mel2: [74,71,74,73, 71,69,67,69], melTutti: [71,73,74,76],
    melClim: [74,76,78,79, 81,79], melEnd: [74,73,71,67, 66,67,66,66]
  });
}, 2018, -17.0, 0.22, [[1,60],[8,57],[9,62],[22,62],[26,64],[27,66],[31,66],[33,58],[40,60]]);

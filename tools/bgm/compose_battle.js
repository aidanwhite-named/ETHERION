/* ETHERION — Compose & Render 5 Battle BGM Tracks (PROMPT_BGM.md) */
"use strict";

const path = require("path");
const { SR, makeRng, renderSection, applyHallReverb, masterAudio, writeWav } = require("./synth_new");

const PAN = {
  violin1: -0.45, violin2: -0.15, soloViolin: -0.25, tremolo: -0.1,
  viola: 0.25, cello: 0.42, soloCello: 0.22, bass: 0.3,
  flute: -0.22, oboe: 0.22, clarinet: -0.15, bassoon: 0.28, horn: -0.35, choir: 0.0
};

const ONLY = process.argv.slice(2);

function renderTrack(name, bpm, beatsPerBar, bars, buildFn, seed, targetRmsDb = -17.0) {
  if (ONLY.length && !ONLY.includes(name)) return;
  const beat = 60 / bpm;
  const totalSec = bars * beatsPerBar * beat;
  const totalSamples = Math.floor(totalSec * SR);
  const b = (bar, bt = 0) => ((bar - 1) * beatsPerBar + bt) * beat;
  const dur = beats => beats * beat;

  const tracks = {};
  for (const k of Object.keys(PAN)) tracks[k] = [];
  const add = (inst, bar, bt, lenBeats, midi, vel = 0.72, legato = false, sfz = false) => {
    tracks[inst].push({ startSec: b(bar, bt), durSec: dur(lenBeats), midi, vel, legato, sfz });
  };

  buildFn(add, bars);

  const mixL = new Float64Array(totalSamples), mixR = new Float64Array(totalSamples);
  const rng = makeRng(seed);
  for (const [inst, notes] of Object.entries(tracks)) {
    if (!notes.length) continue;
    const [sL, sR] = renderSection(inst, notes, totalSamples, PAN[inst] || 0, rng);
    for (let i = 0; i < totalSamples; i++) { mixL[i] += sL[i]; mixR[i] += sR[i]; }
  }
  const [revL, revR] = applyHallReverb(mixL, mixR, 0.22);
  const stats = masterAudio(revL, revR, targetRmsDb);
  const outPath = path.join(__dirname, `../../audio/bgm/new/${name}.wav`);
  writeWav(outPath, revL, revR);
  console.log(`Rendered ${name}.wav (${totalSec.toFixed(1)}s, RMS=${stats.finalRmsDb.toFixed(2)} dBFS, Peak=${stats.peakDb.toFixed(2)} dBFS)`);
}

// Helper for 4-beat bowed viola ostinato
function violaArp4(add, bar, chord, vel) {
  for (let bt = 0; bt < 4; bt++) {
    add("viola", bar, bt, 0.5, chord[bt % chord.length], vel, bt > 0);
    add("viola", bar, bt + 0.5, 0.5, chord[(bt + 1) % chord.length], vel * 0.9, true);
  }
}

// 1. bgm_reminiscence — 빛바랜 기억 (D minor, 4/4, 76 BPM, 38 bars = 120.0s)
renderTrack("bgm_reminiscence", 76, 4, 38, (add) => {
  const ch = {
    Dm: [50, 57, 53, 57], Bb: [46, 53, 50, 53], Gm: [43, 50, 46, 50],
    C: [48, 55, 52, 55], F: [45, 53, 48, 53], A: [45, 52, 49, 52]
  };
  const prog = [
    "Dm","Dm","Dm","Dm", // 1-4 intro
    "Dm","Bb","Gm","A",  "Dm","C","Bb","A", // 5-12 A (Violin)
    "Dm","Bb","C","F",   "Gm","Dm","Bb","A", // 13-20 A' (Cello + Oboe)
    "Bb","C","Dm","Dm",  "Gm","A","Bb","C",  "Dm","Gm","Bb","A", // 21-32 B (Orchestra)
    "Dm","Bb","Gm","A",  "Dm","Dm" // 33-38 Outro (Flute)
  ];
  for (let i = 0; i < 38; i++) {
    const bar = i + 1, c = prog[i];
    const v = bar <= 4 ? 0.32 : bar >= 21 && bar <= 32 ? 0.56 : bar >= 33 ? 0.34 : 0.44;
    violaArp4(add, bar, ch[c], v);
    const root = { Dm: 38, Bb: 34, Gm: 43, C: 36, F: 41, A: 33 }[c];
    add("bass", bar, 0, 4, root, bar >= 21 && bar <= 32 ? 0.85 : 0.55, bar > 1);
  }
  // Intro Flute (1-4)
  add("flute", 1, 0, 2, 69, 0.44); add("flute", 1, 2, 2, 72, 0.46, true);
  add("flute", 2, 0, 3, 74, 0.48, true); add("flute", 2, 3, 1, 72, 0.44, true);
  add("flute", 3, 0, 2, 70, 0.46, true); add("flute", 3, 2, 2, 69, 0.44, true);
  add("flute", 4, 0, 4, 64, 0.40, true);
  // A (5-12): Violin I + II
  const melA = [
    [5,0,1.5,65,0.7],[5,1.5,0.5,67,0.72],[5,2,2,69,0.75],[6,0,2,70,0.76],[6,2,2,69,0.72],
    [7,0,1.5,67,0.72],[7,1.5,0.5,65,0.7],[7,2,2,64,0.68],[8,0,2,69,0.72],[8,2,2,64,0.65],
    [9,0,1.5,62,0.72],[9,1.5,0.5,65,0.74],[9,2,2,69,0.78],[10,0,2,72,0.78],[10,2,2,70,0.74],
    [11,0,2,69,0.74],[11,2,2,67,0.7],[12,0,4,64,0.68]
  ];
  for (const [bar,bt,l,m,v] of melA) {
    add("violin1", bar, bt, l, m, v, bt > 0 || bar > 5);
    add("violin2", bar, bt, l, m - 4, v * 0.68, bt > 0 || bar > 5);
  }
  // A' (13-20): Cello sings + Oboe counter
  const melC = [
    [13,0,2,50,0.75],[13,2,2,53,0.78],[14,0,2,58,0.8],[14,2,2,57,0.76],
    [15,0,2,55,0.76],[15,2,2,52,0.74],[16,0,4,53,0.74],
    [17,0,2,55,0.78],[17,2,2,58,0.8],[18,0,2,57,0.76],[18,2,2,53,0.72],
    [19,0,2,50,0.72],[19,2,2,52,0.7],[20,0,4,49,0.68]
  ];
  for (const [bar,bt,l,m,v] of melC) add("cello", bar, bt, l, m, v, bar > 13 || bt > 0);
  add("oboe", 14, 2, 2, 69, 0.55); add("oboe", 15, 0, 2, 72, 0.58, true); add("oboe", 15, 2, 2, 70, 0.55, true);
  add("oboe", 16, 0, 4, 69, 0.52, true);
  add("horn", 17, 0, 4, 50, 0.48); add("horn", 18, 0, 4, 50, 0.50, true);
  add("horn", 19, 0, 4, 46, 0.52, true); add("horn", 20, 0, 4, 45, 0.55, true);
  // B (21-32): Orchestra Tutti
  const melB = [
    [21,0,2,74,0.9],[21,2,2,77,0.92],[22,0,2,79,0.94],[22,2,2,76,0.9],
    [23,0,2,77,0.92],[23,2,2,74,0.88],[24,0,4,74,0.86],
    [25,0,2,79,0.92],[25,2,2,77,0.9],[26,0,2,76,0.9],[26,2,2,73,0.86],
    [27,0,2,74,0.9],[27,2,2,77,0.92],[28,0,4,79,0.94],
    [29,0,2,81,0.96],[29,2,2,77,0.92],[30,0,2,79,0.9],[30,2,2,74,0.86],
    [31,0,2,70,0.82],[31,2,2,74,0.8],[32,0,4,73,0.78]
  ];
  for (const [bar,bt,l,m,v] of melB) {
    add("violin1", bar, bt, l, m, v, bar > 21 || bt > 0, bar === 21 && bt === 0);
    add("violin2", bar, bt, l, m - 12, v * 0.82, bar > 21 || bt > 0);
    add("horn", bar, bt, l, m - 12, v * 0.78, bar > 21 || bt > 0);
  }
  for (let bar = 21; bar <= 32; bar++) {
    add("choir", bar, 0, 4, bar % 2 ? 62 : 65, 0.34, bar > 21);
    add("cello", bar, 0, 4, 50, 0.76, bar > 21);
  }
  // Outro Flute (33-38)
  add("flute", 33, 0, 2, 74, 0.56); add("flute", 33, 2, 2, 72, 0.52, true);
  add("flute", 34, 0, 4, 70, 0.50, true);
  add("flute", 35, 0, 2, 67, 0.48, true); add("flute", 35, 2, 2, 65, 0.46, true);
  add("flute", 36, 0, 4, 64, 0.44, true);
  add("flute", 37, 0, 4, 62, 0.40, true); add("flute", 38, 0, 4, 62, 0.35, true);
}, 1001);

// 2. bgm_long_ago — 먼 옛날의 오후 (F major, 4/4, 84 BPM, 40 bars = 114.3s)
renderTrack("bgm_long_ago", 84, 4, 40, (add) => {
  const ch = {
    F: [53, 60, 57, 60], Dm: [50, 57, 53, 57], Bb: [46, 53, 50, 53],
    C: [48, 55, 52, 55], Gm: [43, 50, 46, 50], Am: [45, 52, 48, 52]
  };
  const prog = [
    "F","C","Dm","Bb",  "F","C","Dm","C", // 1-8 Intro + A (Oboe)
    "F","Dm","Bb","C",  "Am","Dm","Gm","C", // 9-16 A'
    "Bb","C","F","Dm",  "Gm","C","F","F", // 17-24 Violin & Cello Duet
    "Bb","C","Am","Dm", "Gm","C","Bb","C", // 25-32 B Orchestra
    "F","Dm","Bb","C",  "F","C","F","F" // 33-40 Outro (Oboe)
  ];
  for (let i = 0; i < 40; i++) {
    const bar = i + 1, c = prog[i];
    violaArp4(add, bar, ch[c], bar >= 25 && bar <= 32 ? 0.52 : 0.38);
    const root = { F: 41, Dm: 38, Bb: 34, C: 36, Gm: 43, Am: 45 }[c];
    add("bass", bar, 0, 4, root, bar >= 25 && bar <= 32 ? 0.78 : 0.52, bar > 1);
  }
  // Oboe sings (3-16)
  const melO = [
    [3,0,2,65,0.68],[3,2,1,69,0.7],[3,3,1,72,0.72],[4,0,2,70,0.72],[4,2,2,69,0.68],
    [5,0,2,65,0.7],[5,2,2,67,0.72],[6,0,2,69,0.74],[6,2,2,67,0.68],
    [7,0,2,65,0.7],[7,2,2,69,0.74],[8,0,4,67,0.68],
    [9,0,1.5,69,0.74],[9,1.5,0.5,70,0.72],[9,2,2,72,0.76],[10,0,2,74,0.78],[10,2,2,69,0.72],
    [11,0,2,70,0.74],[11,2,2,69,0.7],[12,0,4,67,0.68],
    [13,0,2,64,0.7],[13,2,2,65,0.72],[14,0,2,69,0.74],[14,2,2,65,0.7],
    [15,0,2,67,0.7],[15,2,2,65,0.68],[16,0,4,64,0.65]
  ];
  for (const [bar,bt,l,m,v] of melO) add("oboe", bar, bt, l, m, v, bar > 3 || bt > 0);
  // Violin & Cello Duet (17-24)
  for (let bar = 17; bar <= 24; bar++) {
    const base = 65 + ((bar * 3) % 7);
    add("violin1", bar, 0, 2, base, 0.72, bar > 17);
    add("violin1", bar, 2, 2, base + 2, 0.74, true);
    add("cello", bar, 0, 2, base - 12, 0.72, bar > 17);
    add("cello", bar, 2, 2, base - 15, 0.70, true);
  }
  // B Orchestra (25-32)
  for (let bar = 25; bar <= 32; bar++) {
    const top = [70, 72, 76, 74, 72, 70, 74, 72][bar - 25];
    add("violin1", bar, 0, 2, top, 0.88, bar > 25);
    add("violin1", bar, 2, 2, top + 2, 0.90, true);
    add("violin2", bar, 0, 4, top - 4, 0.76, bar > 25);
    add("horn", bar, 0, 4, top - 12, 0.65, bar > 25);
    add("choir", bar, 0, 4, 65, 0.28, bar > 25);
  }
  // Outro Oboe + Flute (33-40)
  add("oboe", 33, 0, 2, 65, 0.62); add("oboe", 33, 2, 2, 69, 0.60, true);
  add("oboe", 34, 0, 4, 65, 0.56, true);
  add("flute", 35, 0, 2, 74, 0.50); add("flute", 35, 2, 2, 72, 0.46, true);
  add("flute", 36, 0, 4, 72, 0.42, true);
  add("oboe", 37, 0, 4, 65, 0.46); add("oboe", 38, 0, 4, 64, 0.40, true);
  add("oboe", 39, 0, 4, 65, 0.36, true); add("violin1", 39, 0, 4, 69, 0.32);
}, 1002);

// 3. bgm_last_oath ★ — 최후의 서약 (D minor, 4/4, 66 BPM, 44 bars = 160.0s)
// Dynamic structure: Solo Cello (pp) -> Solo Violin (p) -> Cello Ensemble cresc -> Tutti (ff, sfz, tremolo, 4 horns, choir) -> Solo Violin -> Tutti -> Solo Cello
renderTrack("bgm_last_oath", 66, 4, 44, (add) => {
  // 1-6: Solo Cello alone (pp)
  const sc1 = [
    [1,0,2,50,0.34],[1,2,2,53,0.36],[2,0,3,57,0.38],[2,3,1,55,0.34],
    [3,0,2,53,0.36],[3,2,2,52,0.34],[4,0,4,50,0.32],
    [5,0,2,45,0.34],[5,2,2,50,0.36],[6,0,4,49,0.34]
  ];
  for (const [bar,bt,l,m,v] of sc1) add("soloCello", bar, bt, l, m, v, bar > 1 || bt > 0);
  // 7-12: Solo Violin (p) + light bass pedal
  for (let bar = 7; bar <= 12; bar++) {
    add("bass", bar, 0, 4, bar % 2 ? 38 : 34, 0.24, bar > 7);
    const m = [62, 65, 69, 67, 65, 64][bar - 7];
    add("soloViolin", bar, 0, 2.5, m, 0.38, bar > 7);
    add("soloViolin", bar, 2.5, 1.5, m + 2, 0.36, true);
  }
  // 13-18: Cello Ensemble crescendo
  for (let bar = 13; bar <= 18; bar++) {
    const v = 0.45 + (bar - 13) * 0.08;
    add("cello", bar, 0, 2, 50 + (bar % 3) * 2, v, bar > 13);
    add("cello", bar, 2, 2, 53 + (bar % 2) * 4, v + 0.04, true);
    add("viola", bar, 0, 4, 57, v * 0.65, bar > 13);
    add("bass", bar, 0, 4, 38 - (bar % 2) * 4, v * 0.7, bar > 13);
  }
  // 19-26: TUTTI (ff, sforzando at bar 19, tremolo, 4 horns, choir)
  const tutti1 = [
    [19,74,50,38],[20,76,48,36],[21,77,46,34],[22,81,45,33],
    [23,79,43,43],[24,77,46,34],[25,74,50,38],[26,73,45,33]
  ];
  for (const [bar, top, mid, bs] of tutti1) {
    const sf = bar === 19;
    add("violin1", bar, 0, 2, top, 1.15, bar > 19, sf);
    add("violin1", bar, 2, 2, top + 2, 1.12, true);
    add("violin2", bar, 0, 4, top - 12, 1.0, bar > 19, sf);
    add("tremolo", bar, 0, 4, top - 5, 0.72, bar > 19, sf);
    add("horn", bar, 0, 2, mid + 12, 1.05, bar > 19, sf);
    add("horn", bar, 2, 2, mid + 14, 1.0, true);
    add("choir", bar, 0, 4, mid + 12, 0.48, bar > 19);
    add("cello", bar, 0, 4, mid, 0.95, bar > 19, sf);
    add("bass", bar, 0, 4, bs, 1.05, bar > 19, sf);
  }
  // 27-30: Solo Violin alone (pp)
  add("soloViolin", 27, 0, 3, 74, 0.34); add("soloViolin", 27, 3, 1, 72, 0.32, true);
  add("soloViolin", 28, 0, 4, 69, 0.34, true);
  add("soloViolin", 29, 0, 2, 67, 0.32, true); add("soloViolin", 29, 2, 2, 65, 0.30, true);
  add("soloViolin", 30, 0, 4, 64, 0.28, true);
  // 31-38: Second TUTTI (ff)
  for (let bar = 31; bar <= 38; bar++) {
    const sf = bar === 31;
    const top = [74, 77, 79, 81, 79, 77, 74, 73][bar - 31];
    add("violin1", bar, 0, 4, top, 1.16, bar > 31, sf);
    add("violin2", bar, 0, 4, top - 12, 1.02, bar > 31, sf);
    add("tremolo", bar, 0, 4, top - 7, 0.70, bar > 31, sf);
    add("horn", bar, 0, 4, top - 12, 1.05, bar > 31, sf);
    add("choir", bar, 0, 4, 62, 0.46, bar > 31);
    add("cello", bar, 0, 4, 50, 0.95, bar > 31, sf);
    add("bass", bar, 0, 4, bar === 38 ? 33 : 38, 1.05, bar > 31, sf);
  }
  // 39-44: Solo Cello alone fading to loop
  for (let bar = 39; bar <= 44; bar++) {
    const v = 0.40 - (bar - 39) * 0.025;
    add("soloCello", bar, 0, 2, [50, 53, 52, 50, 45, 50][bar - 39], v, bar > 39);
    add("soloCello", bar, 2, 2, [53, 57, 50, 49, 49, 50][bar - 39], v * 0.9, true);
  }
}, 1003, -19.5);

// 4. bgm_ashen_banner ★ — 잿빛 깃발 아래 (C minor, 4/4, 88 BPM, 44 bars = 120.0s)
// March: low strings pulse grows from nothing -> Solo Cello -> Violin & Horn -> Tutti -> Solo Violin -> Tutti (8va) -> pulse fades
renderTrack("bgm_ashen_banner", 88, 4, 44, (add) => {
  // Low string march pulse (bars 1-24 and 30-44)
  for (let bar = 1; bar <= 44; bar++) {
    if (bar >= 25 && bar <= 29) continue; // Solo violin break
    const v = bar <= 4 ? 0.14 + bar * 0.06
            : bar >= 40 ? Math.max(0.14, 0.55 - (bar - 40) * 0.10)
            : bar >= 17 && bar <= 24 ? 0.95
            : bar >= 30 && bar <= 39 ? 0.98
            : 0.52;
    const root = [36, 36, 32, 31][bar % 4];
    for (let bt = 0; bt < 4; bt++) {
      add("bass", bar, bt, 0.85, root, v * (bt === 0 ? 1.0 : 0.78), false, bar === 17 && bt === 0);
      if (bar >= 5 && bar <= 39) add("cello", bar, bt, 0.8, root + 12, v * 0.85);
    }
  }
  // 5-10: Solo Cello noble march theme
  const sc = [[5,0,2,48],[5,2,2,51],[6,0,2,55],[6,2,2,53],[7,0,2,51],[7,2,2,50],[8,0,4,48],[9,0,2,55],[9,2,2,58],[10,0,4,55]];
  for (const [bar,bt,l,m] of sc) add("soloCello", bar, bt, l, m, 0.52, bar > 5 || bt > 0);
  // 11-16: Violin + Horn
  for (let bar = 11; bar <= 16; bar++) {
    const m = [60, 63, 67, 65, 63, 62][bar - 11];
    add("violin1", bar, 0, 2, m, 0.68, bar > 11); add("violin1", bar, 2, 2, m + 2, 0.70, true);
    add("horn", bar, 0, 4, m - 12, 0.62, bar > 11);
  }
  // 17-24: TUTTI 1
  for (let bar = 17; bar <= 24; bar++) {
    const sf = bar === 17;
    const m = [67, 68, 72, 70, 68, 67, 65, 63][bar - 17];
    add("violin1", bar, 0, 4, m, 1.08, bar > 17, sf);
    add("violin2", bar, 0, 4, m - 12, 0.95, bar > 17, sf);
    add("tremolo", bar, 0, 4, m - 5, 0.68, bar > 17, sf);
    add("horn", bar, 0, 4, m - 12, 1.02, bar > 17, sf);
    add("choir", bar, 0, 4, 60, 0.42, bar > 17);
  }
  // 25-29: Solo Violin alone (pp)
  for (let bar = 25; bar <= 29; bar++) {
    add("soloViolin", bar, 0, 2, [72, 70, 68, 67, 65][bar - 25], 0.34, bar > 25);
    add("soloViolin", bar, 2, 2, [70, 68, 67, 65, 63][bar - 25], 0.32, true);
  }
  // 30-39: TUTTI 2 (Violin an octave higher!)
  for (let bar = 30; bar <= 39; bar++) {
    const sf = bar === 30;
    const m = [79, 80, 84, 82, 80, 79, 77, 75, 74, 72][bar - 30];
    add("violin1", bar, 0, 4, m, 1.15, bar > 30, sf);
    add("violin2", bar, 0, 4, m - 12, 1.02, bar > 30, sf);
    add("tremolo", bar, 0, 4, m - 12, 0.72, bar > 30, sf);
    add("horn", bar, 0, 4, m - 24, 1.05, bar > 30, sf);
    add("choir", bar, 0, 4, 63, 0.45, bar > 30);
  }
}, 1004, -18.6);

// 5. bgm_fallen_star ★ — 별이 진 자리 (B minor, 3/4, 60 BPM, 40 bars = 120.0s)
// Unaccompanied Solo Violin -> Cello + Violin -> Ensemble swells -> Tutti -> Subsiding -> Violin & Cello Duet
renderTrack("bgm_fallen_star", 60, 3, 40, (add) => {
  // 1-6: Unaccompanied Solo Violin (pp)
  const sv1 = [
    [1,0,2,71],[1,2,1,73],[2,0,2,74],[2,2,1,71],[3,0,3,69],
    [4,0,2,67],[4,2,1,66],[5,0,2,64],[5,2,1,66],[6,0,3,66]
  ];
  for (const [bar,bt,l,m] of sv1) add("soloViolin", bar, bt, l, m, 0.35, bar > 1 || bt > 0);
  // 7-14: Solo Cello + Solo Violin dialogue
  for (let bar = 7; bar <= 14; bar++) {
    const cm = [47, 50, 54, 52, 50, 49, 47, 46][bar - 7];
    add("soloCello", bar, 0, 3, cm, 0.44, bar > 7);
    add("soloViolin", bar, 1, 2, cm + 24, 0.42, bar > 7);
  }
  // 15-20: Ensemble swells (3/4 waltz pulse: beat 1 bass, beats 2-3 soft strings)
  for (let bar = 15; bar <= 20; bar++) {
    const v = 0.48 + (bar - 15) * 0.08;
    const root = [35, 38, 43, 42, 40, 42][bar - 15];
    add("bass", bar, 0, 3, root, v, bar > 15);
    add("viola", bar, 1, 0.9, root + 19, v * 0.65);
    add("viola", bar, 2, 0.9, root + 19, v * 0.60);
    add("violin1", bar, 0, 3, root + 36, v * 0.85, bar > 15);
  }
  // 21-28: TUTTI (ff)
  for (let bar = 21; bar <= 28; bar++) {
    const sf = bar === 21;
    const top = [71, 74, 78, 76, 74, 73, 71, 70][bar - 21];
    add("violin1", bar, 0, 3, top, 1.12, bar > 21, sf);
    add("violin2", bar, 0, 3, top - 12, 0.98, bar > 21, sf);
    add("tremolo", bar, 0, 3, top - 5, 0.68, bar > 21, sf);
    add("horn", bar, 0, 3, top - 12, 1.0, bar > 21, sf);
    add("choir", bar, 0, 3, 62, 0.44, bar > 21);
    add("cello", bar, 0, 3, 47, 0.92, bar > 21, sf);
    add("bass", bar, 0, 3, 35, 1.0, bar > 21, sf);
  }
  // 29-34: Subsiding gently
  for (let bar = 29; bar <= 34; bar++) {
    const v = 0.65 - (bar - 29) * 0.07;
    add("violin1", bar, 0, 3, [71, 69, 67, 66, 64, 62][bar - 29], v, bar > 29);
    add("cello", bar, 0, 3, [47, 45, 43, 42, 40, 42][bar - 29], v * 0.9, bar > 29);
  }
  // 35-40: Solo Violin & Solo Cello duet
  for (let bar = 35; bar <= 40; bar++) {
    const v = 0.42 - (bar - 35) * 0.02;
    add("soloViolin", bar, 0, 3, [71, 69, 67, 66, 64, 66][bar - 35], v, bar > 35);
    add("soloCello", bar, 0, 3, [47, 50, 52, 54, 49, 47][bar - 35], v, bar > 35);
  }
}, 1005);

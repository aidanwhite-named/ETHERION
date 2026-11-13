/* ETHERION — Compose & Render 9 Flag Theme BGM Tracks (PROMPT_BGM.md) */
"use strict";

const path = require("path");
const { SR, makeRng, renderSection, applyHallReverb, masterAudio, writeWav } = require("./synth_new");

const PAN = {
  violin1: -0.45, violin2: -0.15, viola: 0.25, cello: 0.42, bass: 0.3,
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
  const add = (inst, bar, bt, lenBeats, midi, vel = 0.72, legato = false) => {
    tracks[inst].push({ startSec: b(bar, bt), durSec: dur(lenBeats), midi, vel, legato });
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

function violaArp4(add, bar, chord, vel) {
  for (let bt = 0; bt < 4; bt++) {
    add("viola", bar, bt, 0.5, chord[bt % chord.length], vel, bt > 0);
    add("viola", bar, bt + 0.5, 0.5, chord[(bt + 1) % chord.length], vel * 0.9, true);
  }
}

function waltz3(add, bar, root, chord, vel) {
  add("bass", bar, 0, 2.8, root, vel * 0.9, bar > 1);
  add("cello", bar, 0, 1.2, root + 12, vel * 0.75);
  add("viola", bar, 1, 0.85, chord[0], vel * 0.55);
  add("viola", bar, 2, 0.85, chord[1], vel * 0.50);
  add("violin2", bar, 1, 0.85, chord[2], vel * 0.45);
  add("violin2", bar, 2, 0.85, chord[2], vel * 0.40);
}

function flow68(add, bar, root, arp, vel) {
  add("bass", bar, 0, 5.8, root, vel * 0.85, bar > 1);
  for (let i = 0; i < 6; i++) {
    add("viola", bar, i, 1.0, arp[i % arp.length], vel * 0.5, i > 0);
  }
}

// Generic orchestral form helper (Intro -> A -> A' -> B -> A'' -> Outro)
function compose44(name, bpm, bars, scale, roots, chords, lead1, lead2, colorInst, seed) {
  renderTrack(name, bpm, 4, bars, (add) => {
    for (let bar = 1; bar <= bars; bar++) {
      const idx = (bar - 1) % chords.length;
      const v = bar <= 2 ? 0.34 : bar >= bars - 3 ? 0.34 : bar >= Math.floor(bars * 0.55) && bar <= Math.floor(bars * 0.78) ? 0.54 : 0.42;
      violaArp4(add, bar, chords[idx], v);
      add("bass", bar, 0, 4, roots[idx], v * 1.45, bar > 1);
      if (bar >= 3 && bar <= bars - 2) {
        const m = scale[(bar * 2 + (bar % 3)) % scale.length];
        const m2 = scale[(bar * 2 + 2) % scale.length];
        if (bar <= Math.floor(bars * 0.28)) {
          add(lead1, bar, 0, 2, m, 0.72, bar > 3);
          add(lead1, bar, 2, 2, m2, 0.70, true);
        } else if (bar <= Math.floor(bars * 0.54)) {
          add(lead2, bar, 0, 2, m + 12, 0.68, true);
          add(lead2, bar, 2, 2, m2 + 12, 0.66, true);
          add("cello", bar, 0, 4, roots[idx] + 12, 0.62, true);
          add("horn", bar, 0, 4, roots[idx] + 12, 0.48, true);
        } else if (bar <= Math.floor(bars * 0.78)) {
          add("violin1", bar, 0, 2, m + 12, 0.90, true);
          add("violin1", bar, 2, 2, m2 + 12, 0.88, true);
          add("violin2", bar, 0, 4, m, 0.78, true);
          add("horn", bar, 0, 4, m, 0.74, true);
          add("choir", bar, 0, 4, scale[0] + 12, 0.30, true);
          if (colorInst) add(colorInst, bar, 0, 4, m, 0.45, true);
        } else {
          add(lead1, bar, 0, 2, m, 0.74, true);
          add(lead1, bar, 2, 2, m2, 0.68, true);
          if (colorInst) add(colorInst, bar, 0, 4, roots[idx] + 12, 0.42, true);
        }
      }
    }
  }, seed);
}

// 1. flag_B1 — 잿불 고블린 (G major 3/4 waltz, 84 BPM, 42 bars = 90.0s, color: clarinet)
renderTrack("flag_B1", 84, 3, 42, (add) => {
  const roots = [43, 36, 38, 43, 40, 36, 38, 43];
  const chs = [[55,59,62],[55,60,64],[54,57,62],[55,59,62],[52,55,59],[55,60,64],[54,57,62],[55,59,62]];
  const scale = [67, 69, 71, 72, 74, 76, 78, 79];
  for (let bar = 1; bar <= 42; bar++) {
    const idx = (bar - 1) % 8;
    const v = bar <= 2 || bar >= 40 ? 0.40 : bar >= 24 && bar <= 33 ? 0.72 : 0.54;
    waltz3(add, bar, roots[idx], chs[idx], v);
    if (bar >= 3 && bar <= 40) {
      const m = scale[(bar * 3) % scale.length];
      const m2 = scale[(bar * 3 + 2) % scale.length];
      if (bar <= 13) {
        add("clarinet", bar, 0, 2, m, 0.70, bar > 3); add("clarinet", bar, 2, 1, m2, 0.66, true);
      } else if (bar <= 23) {
        add("violin1", bar, 0, 2, m, 0.74, true); add("violin1", bar, 2, 1, m2, 0.70, true);
        add("clarinet", bar, 0, 3, m - 12, 0.48, true);
      } else if (bar <= 33) {
        add("violin1", bar, 0, 3, m + 12, 0.88, true);
        add("horn", bar, 0, 3, m, 0.70, true);
        add("clarinet", bar, 0, 2, m, 0.56, true);
        add("choir", bar, 0, 3, 67, 0.26, true);
      } else {
        add("clarinet", bar, 0, 2, m, 0.64, true); add("clarinet", bar, 2, 1, m2, 0.56, true);
      }
    }
  }
}, 2001);

// 2. flag_B2 — 무쇠수염 드워프 (D minor 4/4, 70 BPM, 36 bars = 123.4s, cello first, horn low, color: bassoon)
compose44("flag_B2", 70, 36, [50,52,53,55,57,58,61,62], [38,34,43,33], [[50,57,53,57],[46,53,50,53],[43,50,46,50],[45,52,49,52]], "cello", "horn", "bassoon", 2002);

// 3. flag_B3 — 번개 노움 (C Lydian [F#] 4/4, 80 BPM, 36 bars = 108.0s, 2nd A: flute)
compose44("flag_B3", 80, 36, [60,62,64,66,67,69,71,72], [36,38,40,43], [[48,55,52,55],[50,57,54,57],[52,59,55,59],[43,50,47,50]], "violin1", "flute", "clarinet", 2003);

// 4. flag_G1 — 바위주먹 오크 (E minor 4/4, 70 BPM, 36 bars = 123.4s, cello first, 2nd A: oboe)
compose44("flag_G1", 70, 36, [52,54,55,57,59,60,62,64], [40,36,38,35], [[52,59,55,59],[48,55,52,55],[50,57,54,57],[47,54,51,54]], "cello", "oboe", "horn", 2004);

// 5. flag_G2 — 이끼 트롤 (A Dorian [F#] 3/4, 72 BPM, 40 bars = 100.0s, 2nd A: oboe)
renderTrack("flag_G2", 72, 3, 40, (add) => {
  const roots = [45, 43, 38, 40];
  const chs = [[57,60,64],[55,59,62],[50,54,57],[52,55,59]];
  const scale = [57, 59, 60, 62, 64, 66, 67, 69];
  for (let bar = 1; bar <= 40; bar++) {
    const idx = (bar - 1) % 4;
    const v = bar <= 2 || bar >= 38 ? 0.36 : bar >= 23 && bar <= 32 ? 0.68 : 0.48;
    waltz3(add, bar, roots[idx], chs[idx], v);
    if (bar >= 3 && bar <= 38) {
      const m = scale[(bar * 2 + 1) % scale.length];
      if (bar <= 12) add("cello", bar, 0, 3, m - 12, 0.68, bar > 3);
      else if (bar <= 22) { add("oboe", bar, 0, 2, m + 12, 0.68, true); add("oboe", bar, 2, 1, m + 10, 0.64, true); }
      else if (bar <= 32) { add("violin1", bar, 0, 3, m + 12, 0.85, true); add("horn", bar, 0, 3, m, 0.68, true); add("choir", bar, 0, 3, 64, 0.28, true); }
      else add("oboe", bar, 0, 3, m + 12, 0.56, true);
    }
  }
}, 2005);

// 6. flag_G3 — 푸른비늘 인어 (E major 6/8, 204 eighth-BPM -> 56 bars = 98.8s, 2nd A: flute)
renderTrack("flag_G3", 204, 6, 56, (add) => {
  const roots = [40, 37, 45, 47];
  const arps = [[52,59,56,64,59,56],[49,56,52,61,56,52],[45,52,49,57,52,49],[47,54,51,59,54,51]];
  const scale = [64, 66, 68, 69, 71, 73, 75, 76];
  for (let bar = 1; bar <= 56; bar++) {
    const idx = (bar - 1) % 4;
    const v = bar <= 4 || bar >= 53 ? 0.38 : bar >= 33 && bar <= 46 ? 0.66 : 0.48;
    flow68(add, bar, roots[idx], arps[idx], v);
    if (bar >= 5 && bar <= 53) {
      const m = scale[(bar * 2) % scale.length];
      if (bar <= 18) { add("violin1", bar, 0, 3, m, 0.70, bar > 5); add("violin1", bar, 3, 3, m + 2, 0.68, true); }
      else if (bar <= 32) { add("flute", bar, 0, 3, m + 12, 0.68, true); add("flute", bar, 3, 3, m + 9, 0.64, true); add("cello", bar, 0, 6, roots[idx] + 12, 0.56, true); }
      else if (bar <= 46) { add("violin1", bar, 0, 6, m + 12, 0.86, true); add("horn", bar, 0, 6, m, 0.66, true); add("choir", bar, 0, 6, 64, 0.28, true); }
      else add("flute", bar, 0, 6, m + 12, 0.54, true);
    }
  }
}, 2006, -17.4);

// 7. flag_A1 — 심연 마족 (C minor 3/4 slow waltz, 80 BPM, 40 bars = 90.0s, cello first, color: clarinet)
renderTrack("flag_A1", 80, 3, 40, (add) => {
  const roots = [36, 44, 41, 43];
  const chs = [[48,55,51],[56,60,63],[53,56,60],[55,59,62]];
  const scale = [60, 62, 63, 65, 67, 68, 71, 72];
  for (let bar = 1; bar <= 40; bar++) {
    const idx = (bar - 1) % 4;
    const v = bar <= 2 || bar >= 38 ? 0.36 : bar >= 23 && bar <= 32 ? 0.68 : 0.48;
    waltz3(add, bar, roots[idx], chs[idx], v);
    if (bar >= 3 && bar <= 38) {
      const m = scale[(bar * 3) % scale.length];
      if (bar <= 12) add("cello", bar, 0, 3, m - 12, 0.70, bar > 3);
      else if (bar <= 22) { add("clarinet", bar, 0, 2, m, 0.68, true); add("clarinet", bar, 2, 1, m - 1, 0.64, true); }
      else if (bar <= 32) { add("violin1", bar, 0, 3, m + 12, 0.86, true); add("horn", bar, 0, 3, m, 0.68, true); add("choir", bar, 0, 3, 60, 0.28, true); }
      else add("clarinet", bar, 0, 3, m, 0.56, true);
    }
  }
}, 2007);

// 8. flag_A2 — 성광 천족 (D major 4/4, 64 BPM, 36 bars = 135.0s, 2nd A: flute)
compose44("flag_A2", 64, 36, [62,64,66,67,69,71,73,74], [38,45,47,43], [[50,57,54,57],[45,52,49,52],[47,54,50,54],[43,50,47,50]], "violin1", "flute", "horn", 2008);

// 9. flag_A3 — 폭풍 하이엘프 (B Dorian [G#] 6/8, 216 eighth-BPM -> 60 bars = 100.0s, 2nd A: flute)
renderTrack("flag_A3", 216, 6, 60, (add) => {
  const roots = [35, 45, 43, 42];
  const arps = [[47,54,50,59,54,50],[45,52,49,57,52,49],[43,50,47,55,50,47],[42,49,46,54,49,46]];
  const scale = [59, 61, 62, 64, 66, 68, 69, 71];
  for (let bar = 1; bar <= 60; bar++) {
    const idx = (bar - 1) % 4;
    const v = bar <= 4 || bar >= 57 ? 0.36 : bar >= 35 && bar <= 48 ? 0.68 : 0.48;
    flow68(add, bar, roots[idx], arps[idx], v);
    if (bar >= 5 && bar <= 56) {
      const m = scale[(bar * 3 + 1) % scale.length];
      if (bar <= 18) { add("violin1", bar, 0, 3, m + 12, 0.70, bar > 5); add("violin1", bar, 3, 3, m + 10, 0.68, true); }
      else if (bar <= 34) { add("flute", bar, 0, 3, m + 12, 0.70, true); add("flute", bar, 3, 3, m + 14, 0.66, true); }
      else if (bar <= 48) { add("violin1", bar, 0, 6, m + 12, 0.86, true); add("horn", bar, 0, 6, m, 0.68, true); add("choir", bar, 0, 6, 66, 0.28, true); }
      else add("flute", bar, 0, 6, m + 12, 0.56, true);
    }
  }
}, 2009, -17.4);

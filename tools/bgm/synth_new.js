/* ETHERION — Orchestral BGM Synthesizer & Composer (Node.js, zero dependencies)
 * Generates 44.1 kHz stereo WAV tracks according to tools/bgm/PROMPT_BGM.md:
 *   - Bowed strings ensemble (Violin I/II, Viola, Cello, Contrabass) with polyBLEP + body formants + legato
 *   - Woodwinds (Flute, Oboe, Clarinet, Bassoon) & French Horn ensemble & Wordless Choir
 *   - Concert hall stereo FDN reverb with seamless loop tail folding
 *   - RMS -17.0 dBFS, Peak <= -1.0 dBFS
 */
"use strict";

const fs = require("fs");
const path = require("path");

const SR = 44100;

// Deterministic PRNG (Mulberry32)
function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function midiToHz(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

// Biquad filter (in-place or out-of-place on Float64Array)
function biquadCoeffs(type, fc, Q, gainDb) {
  const w0 = 2 * Math.PI * Math.min(fc, SR * 0.45) / SR;
  const cosw = Math.cos(w0), sinw = Math.sin(w0);
  const alpha = sinw / (2 * Math.max(0.1, Q));
  let b0, b1, b2, a0, a1, a2;
  if (type === "lowpass") {
    b0 = (1 - cosw) / 2; b1 = 1 - cosw; b2 = (1 - cosw) / 2;
    a0 = 1 + alpha; a1 = -2 * cosw; a2 = 1 - alpha;
  } else if (type === "highpass") {
    b0 = (1 + cosw) / 2; b1 = -(1 + cosw); b2 = (1 + cosw) / 2;
    a0 = 1 + alpha; a1 = -2 * cosw; a2 = 1 - alpha;
  } else if (type === "bandpass") {
    b0 = alpha; b1 = 0; b2 = -alpha;
    a0 = 1 + alpha; a1 = -2 * cosw; a2 = 1 - alpha;
  } else if (type === "peaking") {
    const A = Math.pow(10, (gainDb || 0) / 40);
    b0 = 1 + alpha * A; b1 = -2 * cosw; b2 = 1 - alpha * A;
    a0 = 1 + alpha / A; a1 = -2 * cosw; a2 = 1 - alpha / A;
  } else { // lowshelf
    const A = Math.pow(10, (gainDb || 0) / 40);
    const sq = 2 * Math.sqrt(A) * alpha;
    b0 = A * ((A + 1) - (A - 1) * cosw + sq);
    b1 = 2 * A * ((A - 1) - (A + 1) * cosw);
    b2 = A * ((A + 1) - (A - 1) * cosw - sq);
    a0 = (A + 1) + (A - 1) * cosw + sq;
    a1 = -2 * ((A - 1) + (A + 1) * cosw);
    a2 = (A + 1) + (A - 1) * cosw - sq;
  }
  return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];
}

function applyBiquad(buf, c) {
  const [b0, b1, b2, a1, a2] = c;
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < buf.length; i++) {
    const x0 = buf[i];
    const y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
    x2 = x1; x1 = x0; y2 = y1; y1 = y0;
    buf[i] = y0;
  }
}

// Instrument profiles (body formants + vibrato + ensemble size)
const INST = {
  violin1:    { players: 8, spreadCents: 7, vibHz: 5.3, vibCents: 16, atk: 0.16, rel: 0.24, lp: 3600, hp: 190, formants: [[280, 0.8, 3], [520, 1.2, 2.5], [2400, 0.9, 2.5]], noise: 0.011, type: "saw" },
  violin2:    { players: 7, spreadCents: 8, vibHz: 5.1, vibCents: 14, atk: 0.17, rel: 0.25, lp: 3100, hp: 190, formants: [[275, 0.8, 3], [500, 1.1, 2.5], [2100, 0.8, 2]], noise: 0.010, type: "saw" },
  soloViolin: { players: 1, spreadCents: 0, vibHz: 5.5, vibCents: 20, atk: 0.15, rel: 0.28, lp: 3800, hp: 190, formants: [[290, 1.0, 3.2], [540, 1.4, 2.6], [2450, 0.9, 2.5]], noise: 0.012, type: "saw" },
  viola:      { players: 6, spreadCents: 8, vibHz: 4.8, vibCents: 13, atk: 0.16, rel: 0.25, lp: 2600, hp: 130, formants: [[220, 0.9, 3], [410, 1.2, 2.5], [1650, 0.7, 2]], noise: 0.011, type: "saw" },
  cello:      { players: 5, spreadCents: 7, vibHz: 4.5, vibCents: 15, atk: 0.19, rel: 0.28, lp: 2100, hp: 65,  formants: [[140, 1.0, 3.5], [280, 1.1, 2.5], [1150, 0.6, 2]], noise: 0.010, type: "saw" },
  soloCello:  { players: 1, spreadCents: 0, vibHz: 4.8, vibCents: 20, atk: 0.15, rel: 0.32, lp: 2350, hp: 65,  formants: [[145, 1.2, 3.6], [295, 1.3, 2.6], [1250, 0.8, 2]], noise: 0.011, type: "saw" },
  tremolo:    { players: 8, spreadCents: 9, vibHz: 5.0, vibCents: 10, atk: 0.10, rel: 0.24, lp: 3200, hp: 180, formants: [[280, 0.8, 3], [520, 1.1, 2.5], [2200, 0.8, 2.5]], noise: 0.015, type: "saw", tremHz: 10.5 },
  bass:       { players: 4, spreadCents: 6, vibHz: 3.8, vibCents: 9,  atk: 0.22, rel: 0.35, lp: 1050, hp: 36,  formants: [[75, 1.2, 3.5], [170, 1.0, 2.5]], noise: 0.007, type: "saw" },
  flute:      { players: 1, spreadCents: 0, vibHz: 4.9, vibCents: 12, atk: 0.14, rel: 0.20, lp: 3200, hp: 250, formants: [[680, 1.0, 2]], noise: 0.036, type: "flute" },
  oboe:       { players: 1, spreadCents: 0, vibHz: 5.2, vibCents: 14, atk: 0.11, rel: 0.18, lp: 2800, hp: 230, formants: [[1050, 1.6, 4.5], [2400, 0.9, 2]], noise: 0.013, type: "saw" },
  clarinet:   { players: 1, spreadCents: 0, vibHz: 4.5, vibCents: 8,  atk: 0.12, rel: 0.20, lp: 2450, hp: 140, formants: [[450, 1.2, 2.5], [1400, 0.7, 2]], noise: 0.012, type: "square" },
  bassoon:    { players: 1, spreadCents: 0, vibHz: 4.2, vibCents: 9,  atk: 0.15, rel: 0.24, lp: 1700, hp: 58,  formants: [[380, 1.5, 4], [1100, 0.8, 2]], noise: 0.010, type: "saw" },
  horn:       { players: 4, spreadCents: 6, vibHz: 4.1, vibCents: 7,  atk: 0.21, rel: 0.32, lp: 1550, hp: 70,  formants: [[340, 1.2, 3], [820, 0.8, 2]], noise: 0.005, type: "saw" },
  choir:      { players: 6, spreadCents: 10, vibHz: 4.7, vibCents: 14, atk: 0.55, rel: 0.60, lp: 1850, hp: 140, formants: [[680, 1.8, 4.5], [1150, 1.4, 3.5]], noise: 0.010, type: "saw" },
};

// PolyBLEP residual
function polyBlep(t, dt) {
  if (t < dt) { const x = t / dt; return x + x - x * x - 1; }
  if (t > 1 - dt) { const x = (t - 1) / dt; return x * x + x + x + 1; }
  return 0;
}

// Render a monophonic/legato track for an instrument section onto stereo buffers
// notes: [{ startSec, durSec, midi, vel, legato }]
function renderSection(instName, notes, totalSamples, pan, rng) {
  if (instName === "piano") return renderPiano(notes, totalSamples, pan, rng);
  if (instName === "harp") return renderHarp(notes, totalSamples, pan, rng);
  if (instName === "timpani") return renderTimpani(notes, totalSamples, pan, rng);
  const cfg = INST[instName];
  const mono = new Float64Array(totalSamples);
  if (!notes.length) return [mono, mono];

  // Sort notes
  const sorted = [...notes].sort((a, b) => a.startSec - b.startSec);

  for (let p = 0; p < cfg.players; p++) {
    const pBuf = new Float64Array(totalSamples);
    const detuneRatio = cfg.players === 1 ? 1 : Math.pow(2, ((rng() - 0.5) * 2 * cfg.spreadCents) / 1200);
    const vibRate = cfg.vibHz * (0.9 + rng() * 0.2);
    const vibDepth = cfg.vibCents * (0.8 + rng() * 0.4);
    const timingShift = cfg.players === 1 ? 0 : (rng() - 0.5) * 0.022;
    let phase = rng();
    let vibPhase = rng() * 2 * Math.PI;
    let wander = 0;

    for (let ni = 0; ni < sorted.length; ni++) {
      const n = sorted[ni];
      const prev = ni > 0 ? sorted[ni - 1] : null;
      const isLegato = n.legato && prev && Math.abs((prev.startSec + prev.durSec) - n.startSec) < 0.08;
      const tStart = Math.max(0, n.startSec + timingShift);
      const tEnd = Math.min(totalSamples / SR, n.startSec + n.durSec + cfg.rel + timingShift);
      const s0 = Math.floor(tStart * SR);
      const s1 = Math.min(totalSamples, Math.floor(tEnd * SR));
      if (s1 <= s0) continue;

      const fTarget = midiToHz(n.midi) * detuneRatio;
      const fFrom = isLegato ? midiToHz(prev.midi) * detuneRatio : fTarget;
      const glideSamples = isLegato ? Math.floor(0.065 * SR) : 1;
      const atkS = Math.max(1, Math.floor((isLegato ? 0.04 : cfg.atk) * SR));
      const relS = Math.max(1, Math.floor(cfg.rel * SR));
      const holdEnd = Math.floor((n.startSec + n.durSec + timingShift) * SR) - s0;
      const vel = (n.vel != null ? n.vel : 0.75) / Math.sqrt(cfg.players);

      for (let i = s0; i < s1; i++) {
        const k = i - s0;
        // Envelope
        let env = 1.0;
        if (k < atkS) env = Math.sin((k / atkS) * Math.PI * 0.5);
        if (k > holdEnd) {
          const rk = (k - holdEnd) / relS;
          env *= Math.max(0, 1 - rk * rk);
        }
        // Legato glide
        const gMix = k < glideSamples ? 0.5 - 0.5 * Math.cos(Math.PI * k / glideSamples) : 1.0;
        const fBase = fFrom + (fTarget - fFrom) * gMix;
        // Vibrato (ramps in after 0.18s)
        const vibRamp = Math.min(1, k / (0.22 * SR));
        vibPhase += 2 * Math.PI * vibRate / SR;
        if (k % 128 === 0) wander = wander * 0.92 + (rng() - 0.5) * 3.5;
        const cents = Math.sin(vibPhase) * vibDepth * vibRamp + wander;
        const f = fBase * Math.pow(2, cents / 1200);
        const dt = f / SR;

        let osc = 0;
        if (cfg.type === "flute") {
          osc = Math.sin(2 * Math.PI * phase) * 0.78
              + Math.sin(4 * Math.PI * phase) * 0.18
              + Math.sin(6 * Math.PI * phase) * 0.05;
        } else if (cfg.type === "square") {
          const s1v = 2 * phase - 1 - polyBlep(phase, dt);
          const p2 = (phase + 0.5) % 1;
          const s2v = 2 * p2 - 1 - polyBlep(p2, dt);
          osc = 0.5 * (s1v - s2v);
        } else {
          osc = 2 * phase - 1 - polyBlep(phase, dt);
        }
        phase += dt;
        if (phase >= 1) phase -= 1;

        const bowNoise = (rng() * 2 - 1) * cfg.noise;
        let dyn = env * vel;
        if (cfg.tremHz) dyn *= 0.88 + 0.12 * Math.sin(2 * Math.PI * (cfg.tremHz * (0.9 + p * 0.03)) * (i / SR));
        if (n.sfz && k < SR * 0.45) dyn *= 1 + 0.18 * Math.exp(-k / (SR * 0.16));
        pBuf[i] += (osc + bowNoise) * dyn;
      }
    }
    for (let i = 0; i < totalSamples; i++) mono[i] += pBuf[i];
  }

  // Apply body filtering
  applyBiquad(mono, biquadCoeffs("highpass", cfg.hp, 0.7, 0));
  applyBiquad(mono, biquadCoeffs("lowpass", cfg.lp, 0.7, 0));
  for (const [fc, Q, gDb] of cfg.formants) {
    applyBiquad(mono, biquadCoeffs("peaking", fc, Q, gDb));
  }

  // Stereo pan (-1..1)
  const angle = (pan + 1) * Math.PI * 0.25;
  const gL = Math.cos(angle), gR = Math.sin(angle);
  const L = new Float64Array(totalSamples), R = new Float64Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) {
    L[i] = mono[i] * gL;
    R[i] = mono[i] * gR;
  }
  return [L, R];
}

// Concert Grand Piano: 3 unison strings with beating, inharmonicity, soft felt hammer, damper pedal resonance
function renderPiano(notes, totalSamples, pan, rng) {
  const L = new Float64Array(totalSamples);
  const R = new Float64Array(totalSamples);
  if (!notes.length) return [L, R];

  const sorted = [...notes].sort((a, b) => a.startSec - b.startSec);
  for (const n of sorted) {
    const vel = Math.max(0.05, Math.min(1.15, n.vel != null ? n.vel : 0.65));
    const pedal = n.pedal !== false;
    const f0 = midiToHz(n.midi);
    const tau0 = Math.max(0.85, Math.min(5.2, 2.6 * Math.pow(2, (60 - n.midi) / 26)));
    const relTau = pedal ? Math.min(3.4, tau0 * 0.85) : 0.22;
    const totalDur = n.durSec + relTau * 2.6;
    const s0 = Math.max(0, Math.floor(n.startSec * SR));
    const s1 = Math.min(totalSamples, Math.floor((n.startSec + totalDur) * SR));
    if (s1 <= s0) continue;

    const holdS = Math.floor(n.durSec * SR);
    const atkS = Math.max(8, Math.floor((0.0055 - vel * 0.0025) * SR));
    const B = 0.00007 + 0.00024 * Math.pow(Math.max(0, (n.midi - 36) / 60), 2);
    const maxH = Math.min(12, Math.floor(Math.min(10500, SR * 0.42) / f0));
    const nStrings = n.midi < 40 ? 2 : 3;
    const detuneCents = nStrings === 2 ? [-0.45, 0.55] : [-0.72, 0.0, 0.82];

    // Precompute partial parameters
    const partials = [];
    const rolloffExp = 1.30 + Math.max(0, 1.0 - vel) * 0.95;
    for (let h = 1; h <= maxH; h++) {
      const fBaseH = h * f0 * Math.sqrt(1 + B * h * h);
      const amp = Math.pow(h, -rolloffExp) * (h === 1 ? 1.0 : h === 2 ? 0.78 : 0.68);
      const tauH = tau0 / (1 + 0.34 * (h - 1));
      const dStr = [];
      for (let st = 0; st < nStrings; st++) {
        const ratio = Math.pow(2, detuneCents[st] / 1200);
        dStr.push({
          w: 2 * Math.PI * fBaseH * ratio / SR,
          ph: rng() * 2 * Math.PI
        });
      }
      partials.push({ amp, decay: Math.exp(-1 / (tauH * SR)), env: 1.0, dStr });
    }

    const notePan = Math.max(-0.85, Math.min(0.85, pan + (n.midi - 60) * 0.011));
    const angle = (notePan + 1) * Math.PI * 0.25;
    const gL = Math.cos(angle), gR = Math.sin(angle);
    const hammerGain = 0.018 * Math.pow(vel, 1.4);
    const hammerLen = Math.floor(0.014 * SR);
    let hFilt = 0;
    const relDecay = Math.exp(-1 / (relTau * SR));
    let relEnv = 1.0;

    // Normalize string count
    const gainScale = (vel * 0.78) / Math.sqrt(nStrings);

    for (let i = s0; i < s1; i++) {
      const k = i - s0;
      let env = k < atkS ? 0.5 - 0.5 * Math.cos(Math.PI * k / atkS) : 1.0;
      if (k > holdS) {
        relEnv *= relDecay;
        env *= relEnv;
        if (relEnv < 0.0005) break;
      }

      let sig = 0;
      for (let pi = 0; pi < partials.length; pi++) {
        const pt = partials[pi];
        pt.env *= pt.decay;
        if (pt.env < 0.0003) continue;
        let sSum = 0;
        for (let st = 0; st < pt.dStr.length; st++) {
          const ds = pt.dStr[st];
          ds.ph += ds.w;
          sSum += Math.sin(ds.ph);
        }
        sig += sSum * pt.amp * pt.env;
      }

      // Soft felt hammer thump (warm, low-passed)
      if (k < hammerLen) {
        const hEnv = Math.sin(Math.PI * k / hammerLen);
        hFilt = hFilt * 0.86 + (rng() * 2 - 1) * 0.14;
        sig += hFilt * hEnv * hammerGain * 8;
      }

      const out = sig * env * gainScale;
      L[i] += out * gL;
      R[i] += out * gR;
    }
  }

  // Concert grand soundboard resonance
  for (const ch of [L, R]) {
    applyBiquad(ch, biquadCoeffs("highpass", 42, 0.7, 0));
    applyBiquad(ch, biquadCoeffs("lowpass", 4600, 0.7, 0));
    applyBiquad(ch, biquadCoeffs("peaking", 115, 1.2, 2.0));
    applyBiquad(ch, biquadCoeffs("peaking", 250, 1.1, 1.6));
    applyBiquad(ch, biquadCoeffs("peaking", 520, 1.0, 1.0));
  }
  return [L, R];
}

// Concert Harp: warm finger-plucked strings for glissandos and climax arpeggios
function renderHarp(notes, totalSamples, pan, rng) {
  const L = new Float64Array(totalSamples);
  const R = new Float64Array(totalSamples);
  if (!notes.length) return [L, R];

  for (const n of notes) {
    const vel = Math.max(0.05, Math.min(1.1, n.vel != null ? n.vel : 0.65));
    const f0 = midiToHz(n.midi);
    const tau0 = Math.max(0.9, Math.min(4.6, 2.5 * Math.pow(2, (60 - n.midi) / 24)));
    const s0 = Math.max(0, Math.floor(n.startSec * SR));
    const s1 = Math.min(totalSamples, Math.floor((n.startSec + tau0 * 3.5) * SR));
    if (s1 <= s0) continue;

    const atkS = Math.floor(0.0045 * SR);
    const maxH = Math.min(8, Math.floor(Math.min(8500, SR * 0.42) / f0));
    const rolloff = 1.48 + Math.max(0, 1.0 - vel) * 0.65;
    const partials = [];
    for (let h = 1; h <= maxH; h++) {
      partials.push({
        w: 2 * Math.PI * f0 * h / SR,
        ph: rng() * 2 * Math.PI,
        amp: Math.pow(h, -rolloff),
        decay: Math.exp(-1 / ((tau0 / (1 + 0.42 * (h - 1))) * SR)),
        env: 1.0
      });
    }

    const notePan = Math.max(-0.8, Math.min(0.8, pan + (n.midi - 62) * 0.009));
    const angle = (notePan + 1) * Math.PI * 0.25;
    const gL = Math.cos(angle), gR = Math.sin(angle);
    const gainScale = vel * 0.24;

    for (let i = s0; i < s1; i++) {
      const k = i - s0;
      const atk = k < atkS ? 0.5 - 0.5 * Math.cos(Math.PI * k / atkS) : 1.0;
      let sig = 0;
      for (let pi = 0; pi < partials.length; pi++) {
        const pt = partials[pi];
        pt.env *= pt.decay;
        if (pt.env < 0.0003) continue;
        pt.ph += pt.w;
        sig += Math.sin(pt.ph) * pt.amp * pt.env;
      }
      if (partials[0].env < 0.0005) break;
      const out = sig * atk * gainScale;
      L[i] += out * gL;
      R[i] += out * gR;
    }
  }

  for (const ch of [L, R]) {
    applyBiquad(ch, biquadCoeffs("highpass", 60, 0.7, 0));
    applyBiquad(ch, biquadCoeffs("lowpass", 5000, 0.7, 0));
    applyBiquad(ch, biquadCoeffs("peaking", 220, 1.2, 2.0));
    applyBiquad(ch, biquadCoeffs("peaking", 480, 1.1, 1.3));
  }
  return [L, R];
}

// Orchestral Timpani: tuned kettledrum for climax rolls and tutti downbeats
function renderTimpani(notes, totalSamples, pan, rng) {
  const mono = new Float64Array(totalSamples);
  if (!notes.length) return [mono, mono];

  const hits = [];
  for (const n of notes) {
    if (n.roll) {
      const v0 = n.vel != null ? n.vel : 0.25;
      const v1 = n.velEnd != null ? n.velEnd : 0.90;
      let t = n.startSec;
      const tEnd = n.startSec + n.durSec;
      while (t < tEnd) {
        const frac = Math.min(1, (t - n.startSec) / Math.max(0.01, n.durSec));
        const v = v0 + (v1 - v0) * Math.pow(frac, 1.35);
        hits.push({ startSec: t, midi: n.midi, vel: v * 0.72 });
        t += 0.046 + rng() * 0.014;
      }
    } else {
      hits.push({ startSec: n.startSec, midi: n.midi, vel: n.vel != null ? n.vel : 0.85 });
    }
  }

  const modes = [
    [1.00, 1.00, 1.00],
    [1.50, 0.42, 0.55],
    [1.98, 0.22, 0.35],
    [2.44, 0.11, 0.22],
    [2.91, 0.05, 0.14]
  ];

  for (const h of hits) {
    const f0 = midiToHz(h.midi);
    const vel = Math.max(0.05, Math.min(1.2, h.vel));
    const tau0 = Math.max(0.8, Math.min(2.6, 1.6 * Math.pow(2, (48 - h.midi) / 24)));
    const s0 = Math.max(0, Math.floor(h.startSec * SR));
    const s1 = Math.min(totalSamples, Math.floor((h.startSec + tau0 * 3.2) * SR));
    if (s1 <= s0) continue;

    const atkS = Math.floor(0.005 * SR);
    const thumpLen = Math.floor(0.018 * SR);
    const mState = modes.map(([ratio, amp, decF]) => ({
      ratio, amp,
      ph: rng() * 0.2,
      decay: Math.exp(-1 / (tau0 * decF * SR)),
      env: 1.0
    }));
    let lp = 0;

    for (let i = s0; i < s1; i++) {
      const k = i - s0;
      const t = k / SR;
      const atk = k < atkS ? 0.5 - 0.5 * Math.cos(Math.PI * k / atkS) : 1.0;
      const pitchShift = 1 + 0.045 * vel * Math.exp(-t / 0.032);
      let sig = 0;
      for (let mi = 0; mi < mState.length; mi++) {
        const ms = mState[mi];
        ms.env *= ms.decay;
        if (ms.env < 0.0004) continue;
        ms.ph += 2 * Math.PI * f0 * ms.ratio * pitchShift / SR;
        sig += Math.sin(ms.ph) * ms.amp * ms.env;
      }
      if (k < thumpLen) {
        lp = lp * 0.88 + (rng() * 2 - 1) * 0.12;
        sig += lp * Math.sin(Math.PI * k / thumpLen) * 0.35 * vel;
      }
      if (mState[0].env < 0.0005) break;
      mono[i] += sig * atk * vel * 0.42;
    }
  }

  applyBiquad(mono, biquadCoeffs("highpass", 34, 0.7, 0));
  applyBiquad(mono, biquadCoeffs("lowpass", 920, 0.7, 0));
  applyBiquad(mono, biquadCoeffs("peaking", 95, 1.2, 2.4));

  const angle = (pan + 1) * Math.PI * 0.25;
  const gL = Math.cos(angle), gR = Math.sin(angle);
  const L = new Float64Array(totalSamples), R = new Float64Array(totalSamples);
  for (let i = 0; i < totalSamples; i++) { L[i] = mono[i] * gL; R[i] = mono[i] * gR; }
  return [L, R];
}

// Stereo concert hall reverb (comb + allpass network) with tail wrapping for seamless loop
function applyHallReverb(L, R, wetAmt) {
  const N = L.length;
  const tailSamples = Math.floor(SR * 3.2);
  const tot = N + tailSamples;
  const inL = new Float64Array(tot), inR = new Float64Array(tot);
  for (let i = 0; i < N; i++) { inL[i] = L[i]; inR[i] = R[i]; }

  // 6 parallel damped comb filters per channel
  const delaysL = [1557, 1617, 1491, 1422, 1277, 1356];
  const delaysR = [1580, 1640, 1514, 1445, 1300, 1379];
  const fb = 0.84, damp = 0.36;

  function runCombs(input, delays) {
    const out = new Float64Array(tot);
    for (const d of delays) {
      const buf = new Float64Array(d);
      let idx = 0, filt = 0;
      for (let i = 0; i < tot; i++) {
        const y = buf[idx];
        filt = y * (1 - damp) + filt * damp;
        buf[idx] = input[i] + filt * fb;
        out[i] += y * 0.18;
        idx++; if (idx >= d) idx = 0;
      }
    }
    return out;
  }

  let wetL = runCombs(inL, delaysL);
  let wetR = runCombs(inR, delaysR);

  // 2 series allpass diffusers
  for (const d of [556, 441]) {
    for (const ch of [wetL, wetR]) {
      const buf = new Float64Array(d);
      let idx = 0;
      for (let i = 0; i < tot; i++) {
        const b = buf[idx], x = ch[i];
        buf[idx] = x + b * 0.5;
        ch[i] = b - x * 0.5;
        idx++; if (idx >= d) idx = 0;
      }
    }
  }

  // Fold tail back into the beginning for seamless looping!
  const outL = new Float64Array(N), outR = new Float64Array(N);
  for (let i = 0; i < N; i++) {
    outL[i] = L[i] + wetL[i] * wetAmt;
    outR[i] = R[i] + wetR[i] * wetAmt;
  }
  for (let i = 0; i < tailSamples; i++) {
    const ti = i % N;
    outL[ti] += wetL[N + i] * wetAmt;
    outR[ti] += wetR[N + i] * wetAmt;
  }
  return [outL, outR];
}

// Normalize to target RMS (-17.0 dBFS) with soft peak limiter (<= -1.0 dBFS)
function masterAudio(L, R, targetRmsDb = -17.0) {
  const N = L.length;
  let sumSq = 0;
  for (let i = 0; i < N; i++) sumSq += L[i] * L[i] + R[i] * R[i];
  const curRms = Math.sqrt(sumSq / (2 * N)) || 1e-9;
  const targetRms = Math.pow(10, targetRmsDb / 20);
  const gain = targetRms / curRms;
  const ceil = Math.pow(10, -1.0 / 20); // -1.0 dBFS = ~0.891

  let peak = 0;
  for (let i = 0; i < N; i++) {
    let l = L[i] * gain, r = R[i] * gain;
    // Soft knee limiter above 0.78
    const lim = x => {
      const ax = Math.abs(x);
      if (ax <= 0.78) return x;
      return Math.sign(x) * (0.78 + (ceil - 0.78) * Math.tanh((ax - 0.78) / (ceil - 0.78)));
    };
    L[i] = lim(l); R[i] = lim(r);
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }

  // Recalculate final RMS
  sumSq = 0;
  for (let i = 0; i < N; i++) sumSq += L[i] * L[i] + R[i] * R[i];
  const finalRmsDb = 20 * Math.log10(Math.sqrt(sumSq / (2 * N)));
  const peakDb = 20 * Math.log10(peak);
  return { finalRmsDb, peakDb };
}

function writeWav(filePath, L, R) {
  const N = L.length;
  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    const l = Math.max(-1, Math.min(1, L[i]));
    const r = Math.max(-1, Math.min(1, R[i]));
    buf.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(r * 32767), 44 + i * 4 + 2);
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buf);
}

// ============================================================================
// TRACK 1: title — "에테르가 흐르는 땅" (D minor, 4/4, 64 BPM, 16 bars = 60.0s)
// ============================================================================
function composeTitle() {
  const bpm = 64;
  const beat = 60 / bpm; // 0.9375s
  const bars = 16;
  const totalSec = bars * 4 * beat; // 60.0s
  const totalSamples = Math.floor(totalSec * SR);
  const b = (bar, bt = 0) => ((bar - 1) * 4 + bt) * beat;
  const dur = beats => beats * beat;

  const tracks = {
    bass: [], cello: [], viola: [], violin2: [], violin1: [],
    flute: [], oboe: [], horn: [], choir: []
  };

  const add = (inst, bar, bt, lenBeats, midi, vel = 0.72, legato = false) => {
    tracks[inst].push({ startSec: b(bar, bt), durSec: dur(lenBeats), midi, vel, legato });
  };

  // Harmony progression (16 bars):
  // 1-2: Dm | Dm
  // 3-6: Dm | Bb | Gm | A7
  // 7-10: Dm | C | Bb | A
  // 11-14: Bb | C | Dm | Gm -> A
  // 15-16: Dm/A | A7sus4 -> Dm (resolves seamlessly into bar 1)
  const bassLine = [
    [1, 38, 0.55], [2, 38, 0.58],
    [3, 38, 0.65], [4, 34, 0.65], [5, 43, 0.65], [6, 33, 0.68],
    [7, 38, 0.72], [8, 36, 0.72], [9, 34, 0.75], [10, 33, 0.75],
    [11, 34, 0.92], [12, 36, 0.92], [13, 38, 0.95], [14, 43, 0.85],
    [15, 38, 0.65], [16, 33, 0.55]
  ];
  for (const [bar, m, v] of bassLine) {
    if (bar === 14) { add("bass", 14, 0, 2, 43, v); add("bass", 14, 2, 2, 33, v); }
    else add("bass", bar, 0, 4, m, v, bar > 1);
  }

  // Bowed Viola ostinato (8th-note gentle undulating arpeggios, bars 1-15)
  const ostinatoChords = {
    1: [50, 57, 53, 57], 2: [50, 57, 53, 57],
    3: [50, 57, 53, 57], 4: [46, 53, 50, 53], 5: [43, 50, 46, 50], 6: [45, 52, 49, 52],
    7: [50, 57, 53, 57], 8: [48, 55, 52, 55], 9: [46, 53, 50, 53], 10: [45, 52, 49, 52],
    11: [46, 53, 50, 53], 12: [48, 55, 52, 55], 13: [50, 57, 53, 57], 14: [43, 50, 46, 50],
    15: [50, 57, 53, 57], 16: [45, 52, 50, 49]
  };
  for (let bar = 1; bar <= 16; bar++) {
    const ch = ostinatoChords[bar];
    const v = bar <= 2 ? 0.36 : bar >= 11 && bar <= 13 ? 0.58 : bar >= 15 ? 0.34 : 0.45;
    for (let bt = 0; bt < 4; bt++) {
      add("viola", bar, bt, 0.5, ch[bt % 4], v, bt > 0);
      add("viola", bar, bt + 0.5, 0.5, ch[(bt + 1) % 4], v * 0.9, true);
    }
  }

  // Intro Flute (Bar 2)
  add("flute", 2, 0, 1.5, 69, 0.42);
  add("flute", 2, 1.5, 0.5, 70, 0.40, true);
  add("flute", 2, 2, 2.0, 69, 0.38, true);

  // Section A (Bars 3-6): Violin I sings, Violin II 3rd below, Cello warm pad
  const melA = [
    [3, 0, 1.5, 62, 0.72, false], [3, 1.5, 0.5, 64, 0.70, true], [3, 2, 1.5, 65, 0.76, true], [3, 3.5, 0.5, 69, 0.78, true],
    [4, 0, 2.0, 67, 0.78, true],  [4, 2, 1.0, 65, 0.72, true],  [4, 3, 1.0, 62, 0.68, true],
    [5, 0, 1.5, 67, 0.75, true],  [5, 1.5, 0.5, 65, 0.72, true], [5, 2, 2.0, 64, 0.70, true],
    [6, 0, 1.5, 69, 0.76, true],  [6, 1.5, 0.5, 67, 0.72, true], [6, 2, 2.0, 64, 0.68, true],
  ];
  for (const [bar, bt, l, m, v, leg] of melA) {
    add("violin1", bar, bt, l, m, v, leg);
    add("violin2", bar, bt, l, m - 4, v * 0.72, leg);
  }
  add("cello", 3, 0, 4, 50, 0.55); add("cello", 4, 0, 4, 46, 0.55, true);
  add("cello", 5, 0, 4, 43, 0.55, true); add("cello", 6, 0, 4, 45, 0.58, true);

  // Section A' (Bars 7-10): Flute & Oboe duet + Cello counter-melody + French Horns
  const melA2 = [
    [7, 0, 1.5, 74, 0.68, false], [7, 1.5, 0.5, 76, 0.70, true], [7, 2, 1.5, 77, 0.74, true], [7, 3.5, 0.5, 81, 0.76, true],
    [8, 0, 2.0, 79, 0.75, true],  [8, 2, 1.0, 77, 0.70, true],  [8, 3, 1.0, 76, 0.68, true],
    [9, 0, 1.5, 74, 0.72, true],  [9, 1.5, 0.5, 72, 0.68, true], [9, 2, 2.0, 70, 0.68, true],
    [10, 0, 2.0, 69, 0.70, true], [10, 2, 2.0, 64, 0.66, true],
  ];
  for (const [bar, bt, l, m, v, leg] of melA2) {
    add("flute", bar, bt, l, m, v, leg);
    add("oboe", bar, bt, l, m - 12, v * 0.65, leg);
  }
  // Cello singing counterline
  add("cello", 7, 0, 2, 57, 0.68); add("cello", 7, 2, 2, 53, 0.68, true);
  add("cello", 8, 0, 2, 55, 0.68, true); add("cello", 8, 2, 2, 52, 0.65, true);
  add("cello", 9, 0, 2, 53, 0.70, true); add("cello", 9, 2, 2, 50, 0.68, true);
  add("cello", 10, 0, 4, 49, 0.70, true);
  // Horns enter softly
  add("horn", 7, 0, 4, 50, 0.45); add("horn", 8, 0, 4, 48, 0.48, true);
  add("horn", 9, 0, 4, 46, 0.52, true); add("horn", 10, 0, 4, 45, 0.56, true);

  // Section B (Bars 11-14): Full Orchestra Climax (Strings octaves + Horns + Choir)
  const melB = [
    [11, 0, 1.5, 70, 0.90, false], [11, 1.5, 0.5, 72, 0.88, true], [11, 2, 2.0, 74, 0.92, true],
    [12, 0, 1.5, 76, 0.94, true],  [12, 1.5, 0.5, 77, 0.92, true], [12, 2, 2.0, 79, 0.95, true],
    [13, 0, 2.0, 81, 0.98, true],  [13, 2, 1.0, 79, 0.92, true],  [13, 3, 1.0, 77, 0.88, true],
    [14, 0, 2.0, 74, 0.86, true],  [14, 2, 2.0, 73, 0.80, true],
  ];
  for (const [bar, bt, l, m, v, leg] of melB) {
    add("violin1", bar, bt, l, m, v, leg);
    add("violin2", bar, bt, l, m - 12, v * 0.85, leg);
  }
  // Horns carry bold B theme an octave below
  add("horn", 11, 0, 2, 58, 0.78); add("horn", 11, 2, 2, 62, 0.82, true);
  add("horn", 12, 0, 2, 64, 0.84, true); add("horn", 12, 2, 2, 67, 0.86, true);
  add("horn", 13, 0, 4, 69, 0.88, true);
  add("horn", 14, 0, 2, 62, 0.80, true); add("horn", 14, 2, 2, 61, 0.74, true);
  // Wordless Choir ("Ah~") subtle pad
  add("choir", 11, 0, 4, 62, 0.34); add("choir", 12, 0, 4, 64, 0.36, true);
  add("choir", 13, 0, 4, 65, 0.38, true); add("choir", 14, 0, 4, 64, 0.30, true);
  // Cello rich foundation
  add("cello", 11, 0, 4, 46, 0.82); add("cello", 12, 0, 4, 48, 0.84, true);
  add("cello", 13, 0, 4, 50, 0.86, true); add("cello", 14, 0, 2, 43, 0.80, true); add("cello", 14, 2, 2, 45, 0.74, true);

  // Outro (Bars 15-16): Subsiding into calm D minor & Flute farewell
  add("violin1", 15, 0, 4, 69, 0.56);
  add("violin2", 15, 0, 4, 65, 0.48);
  add("cello", 15, 0, 4, 50, 0.54);
  add("flute", 15, 2, 2, 74, 0.44);
  add("flute", 16, 0, 2, 72, 0.40, true);
  add("flute", 16, 2, 2, 69, 0.36, true);
  add("cello", 16, 0, 4, 45, 0.46, true);

  // Render all sections
  const panMap = { violin1: -0.45, violin2: -0.15, viola: 0.25, cello: 0.42, bass: 0.3, flute: -0.2, oboe: 0.2, horn: -0.35, choir: 0.0 };
  const mixL = new Float64Array(totalSamples), mixR = new Float64Array(totalSamples);
  const rng = makeRng(20261113);

  for (const [inst, notes] of Object.entries(tracks)) {
    if (!notes.length) continue;
    const [sL, sR] = renderSection(inst, notes, totalSamples, panMap[inst] || 0, rng);
    for (let i = 0; i < totalSamples; i++) { mixL[i] += sL[i]; mixR[i] += sR[i]; }
  }

  const [revL, revR] = applyHallReverb(mixL, mixR, 0.22);
  const stats = masterAudio(revL, revR, -17.0);
  const outPath = path.join(__dirname, "../../audio/bgm/new/title.wav");
  writeWav(outPath, revL, revR);
  console.log(`Rendered title.wav (${totalSec.toFixed(1)}s, RMS=${stats.finalRmsDb.toFixed(2)} dBFS, Peak=${stats.peakDb.toFixed(2)} dBFS)`);
}

if (require.main === module) composeTitle();
module.exports = { SR, makeRng, renderSection, applyHallReverb, masterAudio, writeWav };

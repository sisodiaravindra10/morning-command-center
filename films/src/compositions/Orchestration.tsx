import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, random} from 'remotion';
import {C, FONT, WIDTH, HEIGHT} from '../theme';
import {Atmosphere} from '../components/Atmosphere';
import {Label, Display, Body} from '../components/Type';
import {Card} from '../components/Card';
import {fade, fadeRise, fadeOut} from '../components/motion';
import {EndCard} from '../components/EndCard';

/**
 * Film 3 · orchestration — "100+ agents, one calm front door."
 * A calm drifting field of ~120 dots flows down through a filter labelled
 * "uncertain · high stakes · needs your voice", narrowing to three surfaced
 * cards. The many become the few. 780 frames @ 30fps = 26s.
 * Dots use Remotion's seeded random() so the field is identical every render.
 */

const N = 120; // "100+ agents"

type Dot = {x0: number; y0: number; xJit: number; speed: number; phase: number; surfaced: number};

// Deterministic field, seeded once.
const DOTS: Dot[] = Array.from({length: N}, (_, i) => ({
  x0: random(`x${i}`) * WIDTH,
  y0: random(`y${i}`) * 360 + 150, // top band where they drift
  xJit: (random(`j${i}`) - 0.5) * 60,
  speed: 0.5 + random(`s${i}`) * 0.8,
  phase: random(`p${i}`) * Math.PI * 2,
  // three of them are the "surfaced" ones, the rest get filtered out
  surfaced: i,
}));

// indices that pass the filter (the three that reach you)
const PASS = [17, 58, 99];
const GATE_Y = HEIGHT * 0.5;
const FUNNEL_CENTER = WIDTH / 2;

const Field: React.FC = () => {
  const frame = useCurrentFrame();
  // Phase 1 (0-90): the field drifts calmly, "100+ agents working".
  // Phase 2 (90-220): the field flows downward toward the gate; non-passing
  //   dots dim and dissolve at the gate; passing dots continue through.
  // Phase 3 (220+): the three passing dots settle into the surfaced cards.
  const driftIn = fade(frame, 4, 30);

  return (
    <AbsoluteFill>
      {DOTS.map((d, i) => {
        const passes = PASS.includes(i);

        // calm idle drift (always)
        const driftX = Math.sin(frame / 60 + d.phase) * 10 + d.xJit;
        const driftY = Math.cos(frame / 70 + d.phase) * 8;

        // flow toward gate begins at 90
        const flow = interpolate(frame, [90, 200], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        // each dot's target x converges toward the funnel neck
        const neckX = FUNNEL_CENTER + (d.x0 - FUNNEL_CENTER) * (1 - flow * 0.86) + driftX * (1 - flow);
        const flowY = interpolate(flow, [0, 1], [0, GATE_Y - d.y0 - 10]);

        let x = neckX;
        let y = d.y0 + driftY + flowY;
        let opacity: number = driftIn;
        let size = 8;
        let color: string = C.muted;
        let glow = 'none';

        if (passes) {
          // the three continue down past the gate toward their card slots
          const cont = interpolate(frame, [200, 300], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const slot = PASS.indexOf(i); // 0,1,2
          const slotX = FUNNEL_CENTER + (slot - 1) * 260;
          const slotY = HEIGHT * 0.66;
          x = interpolate(cont, [0, 1], [neckX, slotX]);
          y = interpolate(cont, [0, 1], [Math.min(y, GATE_Y), slotY]);
          color = C.accent;
          size = interpolate(frame, [180, 240], [8, 13], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          glow = `0 0 14px ${C.accent}`;
          // fade the travelling dot out as the card materializes
          opacity = driftIn * fadeOut(frame, 286, 16);
        } else {
          // non-passing dots dim and dissolve as they approach the gate
          const reach = interpolate(d.y0 + flowY, [GATE_Y - 120, GATE_Y - 10], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          opacity = driftIn * (0.35 + 0.25 * Math.sin(frame / 30 + d.phase)) * reach;
          // a few near the neck briefly glow periwinkle as "being considered"
          if (flow > 0.3 && random(`c${i}`) > 0.7) {
            color = C.accent;
            opacity *= 1.1;
          }
        }

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: '50%',
              background: color,
              opacity: Math.max(0, Math.min(1, opacity)),
              boxShadow: glow,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// The filter gate line + label.
const Gate: React.FC = () => {
  const frame = useCurrentFrame();
  const r = fade(frame, 96, 26);
  const width = interpolate(frame, [96, 140], [0, 520], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const out = fadeOut(frame, 320, 20);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: GATE_Y - 36}}>
      <div style={{opacity: r * out, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
        <div style={{width, height: 1, background: `linear-gradient(90deg, transparent, ${C.accentLine}, transparent)`}} />
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            letterSpacing: '0.06em',
            color: C.body,
            border: `1px dashed ${C.accentLine}`,
            borderRadius: 10,
            padding: '12px 20px',
            background: C.accentTint,
          }}
        >
          uncertain · high stakes · needs your voice
        </div>
      </div>
    </AbsoluteFill>
  );
};

// The three surfaced cards that settle in at the bottom.
const Surfaced: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    {t: 'Crestview, gone quiet', s: 'a soft nudge, leaning yes'},
    {t: 'Marsh deal disputed', s: 'three systems disagree'},
    {t: 'A line that reads as steering', s: 'held and rewritten'},
  ];
  const out = fadeOut(frame, 360, 20);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: HEIGHT * 0.66 - 60}}>
      <div style={{display: 'flex', gap: 28, opacity: out}}>
        {cards.map((c, i) => {
          const appear = fadeRise(frame, 286 + i * 8, 22, 18);
          return (
            <div key={i} style={appear}>
              <Card tone="accent" style={{width: 300, height: 132, padding: '22px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8}}>
                <Body size={22} color={C.ink} weight={600}>{c.t}</Body>
                <Label size={14} color={C.accentHi}>{c.s}</Label>
              </Card>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Captions that sit above the field across the phases.
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  // "100+ agents working" (early), then "so three reached you" (late)
  const c1 = fade(frame, 16, 26) * fadeOut(frame, 180, 18);
  const c2 = fade(frame, 250, 26) * fadeOut(frame, 360, 20);
  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'stretch', paddingTop: 88}}>
      <div style={{position: 'relative', textAlign: 'center', height: 110, width: '100%'}}>
        <div style={{position: 'absolute', inset: 0, opacity: c1, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center'}}>
          <Display size={50} weight={600} style={{whiteSpace: 'nowrap'}}>
            <span style={{color: C.accentHi}}>100+</span> agents, working
          </Display>
          <Label size={16} color={C.muted}>overnight, on your deals and the team's</Label>
        </div>
        <div style={{position: 'absolute', inset: 0, opacity: c2, display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
          <Display size={50} weight={600} style={{whiteSpace: 'nowrap'}}>so three reached you</Display>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Orchestration: React.FC = () => {
  return (
    <Atmosphere>
      <Sequence durationInFrames={400}>
        <Captions />
        <Field />
        <Gate />
        <Surfaced />
      </Sequence>
      <Sequence from={400}>
        <EndCard start={8} kicker="orchestration" title={<>100+ agents, one calm front door.</>} />
      </Sequence>
    </Atmosphere>
  );
};

import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {C, FONT} from '../theme';
import {Atmosphere} from '../components/Atmosphere';
import {Label, Display, Body} from '../components/Type';
import {Card, Chip} from '../components/Card';
import {fade, fadeRise, fadeOut, beat} from '../components/motion';
import {LeoMark, EndCard} from '../components/EndCard';
import {ThinkingDot, DoneTick} from '../components/StateDots';

/**
 * Film 1 · productOverview — "The morning command center."
 * A dark open, the greeting, the trust ledger assembling, the focus-card
 * triage (Crestview), Leo's Oak St counter, the team SLA breach, the thesis,
 * and an end card. 1200 frames @ 30fps = 40s. Copy is verbatim from the
 * prototype (command-center.html).
 */

// A confidence wave, frame-driven (equalizer that breathes). Emerald.
const ConfWave: React.FC<{bars?: number[]; muted?: boolean}> = ({
  bars = [6, 10, 16, 9, 13],
  muted = false,
}) => {
  const frame = useCurrentFrame();
  return (
    <span style={{display: 'inline-flex', alignItems: 'flex-end', gap: 3, height: 18}}>
      {bars.map((h, i) => {
        const s = interpolate(
          Math.sin((frame / 22 + i * 0.4) * Math.PI * 2),
          [-1, 1],
          [0.55, 1],
        );
        return (
          <span
            key={i}
            style={{
              width: 3.5,
              height: h,
              background: muted ? C.muted : C.accent,
              borderRadius: 2,
              opacity: muted ? 0.5 : 0.9,
              transform: `scaleY(${s})`,
              transformOrigin: 'bottom',
              display: 'inline-block',
            }}
          />
        );
      })}
    </span>
  );
};

// ---- Beat A: dark open + greeting -----------------------------------------
const Greeting: React.FC = () => {
  const frame = useCurrentFrame();
  const mark = fade(frame, 6, 24);
  const greet = fadeRise(frame, 24, 30, 22);
  const sub = fadeRise(frame, 44, 28, 16);
  const out = fadeOut(frame, 130, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: out}}>
        <div style={{opacity: mark}}>
          <LeoMark size={56} pulseFrom={6} />
        </div>
        <div style={greet}>
          <Display size={76} weight={600} style={{textAlign: 'center', letterSpacing: '-0.035em'}}>
            Good morning, Dana
          </Display>
        </div>
        <div style={{...sub, display: 'flex', alignItems: 'center', gap: 14}}>
          <Label size={17} color={C.muted}>sat 27 jun · 6:52</Label>
          <span style={{width: 5, height: 5, borderRadius: '50%', background: C.subtle}} />
          <Body size={22} color={C.body}>Leo worked overnight.</Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Beat B: the trust ledger assembling ----------------------------------
const Ledger: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = fadeRise(frame, 6, 22, 16);
  // assemble the three counts in sequence
  const n1 = fadeRise(frame, 26, 20, 12);
  const n2 = fadeRise(frame, 48, 20, 12);
  const n3 = fadeRise(frame, 70, 20, 12);
  const line = fade(frame, 96, 24);
  const out = fadeOut(frame, 160, 18);

  // count-up for "47"
  const count = Math.round(interpolate(frame, [26, 58], [0, 47], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

  const Cell: React.FC<{style: React.CSSProperties; n: React.ReactNode; label: string; tone?: string}> = ({style, n, label, tone = C.ink}) => (
    <div style={{...style, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
      <div style={{fontFamily: FONT.display, fontSize: 92, fontWeight: 600, color: tone, letterSpacing: '-0.04em', lineHeight: 0.95, fontVariantNumeric: 'tabular-nums'}}>{n}</div>
      <Label size={17} color={C.muted}>{label}</Label>
    </div>
  );

  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 56}}>
        <div style={intro}>
          <Label size={17} color={C.muted}>the trust ledger</Label>
        </div>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 96}}>
          <Cell style={n1} n={count} label="handled overnight" />
          <div style={{width: 1, height: 130, background: C.hair, marginTop: 6}} />
          <Cell style={n2} n={<span style={{color: C.accentHi}}>2</span>} label="need you" tone={C.accentHi} />
          <div style={{width: 1, height: 130, background: C.hair, marginTop: 6}} />
          <Cell style={n3} n="1" label="corrected" />
        </div>
        <div style={{opacity: line, maxWidth: 820, textAlign: 'center'}}>
          <Body size={24} color={C.muted}>
            It sets the honest tone before a single card is read.
          </Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Section title interstitial -------------------------------------------
const SectionTitle: React.FC<{kicker: string; title: React.ReactNode}> = ({kicker, title}) => {
  const frame = useCurrentFrame();
  const r = fadeRise(frame, 4, 22, 16);
  const out = fadeOut(frame, 56, 16);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{...r, opacity: (r.opacity ?? 1) * out, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
        <Label size={16} color={C.accentHi}>{kicker}</Label>
        <Display size={46} weight={600}>{title}</Display>
      </div>
    </AbsoluteFill>
  );
};

// ---- Beat C: the focus-card triage (Crestview) ----------------------------
const Triage: React.FC = () => {
  const frame = useCurrentFrame();
  const label = fadeRise(frame, 6, 20, 14);
  const card = fadeRise(frame, 24, 26, 26);
  const queue = fadeRise(frame, 70, 24, 18);
  const out = fadeOut(frame, 215, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div style={{width: 1120, display: 'flex', flexDirection: 'column', gap: 22}}>
        <div style={{...label, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Label size={16} color={C.muted}>needs your judgment</Label>
          <Label size={15} color={C.subtle}>one at a time</Label>
        </div>

        {/* the focus card */}
        <div style={card}>
          <Card tone="sand" style={{padding: '34px 38px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20}}>
              <Chip tone="sand">Needs you</Chip>
              <Label size={15} color={C.subtle}>deal-risk agent · 06:14</Label>
            </div>
            <Display size={40} weight={600} color={C.ink} style={{lineHeight: 1.25, marginBottom: 14}}>
              The Crestview deal has gone quiet, 4 days, no reply.
            </Display>
            <Body size={25} color={C.body} style={{marginBottom: 26}}>
              <b style={{color: C.ink}}>$635K</b> · Westlake. Warm, then silent after the inspection report.
            </Body>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28}}>
              <ConfWave />
              <Body size={21} color={C.body} style={{fontFamily: FONT.mono, letterSpacing: '0.02em'}}>
                <b style={{color: C.accentHi}}>leaning yes</b> a soft nudge helps
              </Body>
            </div>
            <div style={{display: 'flex', gap: 14}}>
              <div style={{flex: 1, textAlign: 'center', padding: '16px 0', borderRadius: 13, background: `linear-gradient(180deg, ${C.accentHi}, ${C.accent})`, color: C.accentInk, fontFamily: FONT.sans, fontWeight: 600, fontSize: 22}}>
                Send the nudge
              </div>
              <div style={{padding: '16px 28px', borderRadius: 13, border: `1px solid ${C.hair}`, color: C.body, fontFamily: FONT.sans, fontWeight: 600, fontSize: 22}}>
                Change
              </div>
            </div>
          </Card>
        </div>

        {/* the collapsed queue beneath, severity-ordered */}
        <div style={{...queue, display: 'flex', flexDirection: 'column', gap: 12}}>
          {[
            {dot: C.sand, t: '3 systems disagree on the Marsh deal', tag: 'sync'},
            {dot: C.sand, t: 'Cover for Sofia (out) · 2 need you', tag: 'handoff'},
            {dot: C.sand, t: '3 messages need your voice', tag: 'outbox'},
          ].map((r, i) => (
            <Card key={i} style={{padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16}}>
              <span style={{width: 9, height: 9, borderRadius: '50%', background: r.dot, flex: '0 0 auto'}} />
              <Body size={22} color={C.ink} weight={500} style={{flex: 1}}>{r.t}</Body>
              <Label size={14} color={C.subtle}>{r.tag}</Label>
              <span style={{color: C.subtle, fontSize: 20}}>{'▸'}</span>
            </Card>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Beat D: Leo's Oak St counter (reviewed before send) ------------------
const OakSt: React.FC = () => {
  const frame = useCurrentFrame();
  const label = fadeRise(frame, 6, 20, 14);
  const quote = fadeRise(frame, 24, 26, 22);
  const card = fadeRise(frame, 64, 26, 22);
  const reviewed = fade(frame, 120, 24);
  const out = fadeOut(frame, 180, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div style={{width: 1040, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        <div style={label}>
          <Label size={16} color={C.muted}>09:00 · oak st call · negotiator agent</Label>
        </div>
        <div style={{...quote, textAlign: 'center', maxWidth: 940}}>
          <Display size={42} weight={500} color={C.ink} style={{lineHeight: 1.28}}>
            Hold at $612K. Here are the three objections, your floor, and the comp that wins the call.
          </Display>
        </div>
        <div style={{width: '100%', ...card}}>
          <Card style={{padding: '28px 34px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <ThinkingDot size={16} />
                <Body size={22} color={C.body}>Brief assembled overnight · 3 objection-handlers ready</Body>
              </div>
              <Label size={15} color={C.muted}>negotiator</Label>
            </div>
          </Card>
        </div>
        <div style={{opacity: reviewed, display: 'flex', alignItems: 'center', gap: 14}}>
          <DoneTick size={34} drawAt={124} />
          <Body size={23} color={C.body}>You reviewed it before it ever reached the client.</Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Beat E: the team SLA breach ------------------------------------------
const TeamBreach: React.FC = () => {
  const frame = useCurrentFrame();
  const label = fadeRise(frame, 6, 20, 14);
  const card = fadeRise(frame, 24, 26, 24);
  const clock = fade(frame, 60, 20);
  const out = fadeOut(frame, 175, 18);
  // the waited-time ticking up subtly to read as "live"
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div style={{width: 1040, display: 'flex', flexDirection: 'column', gap: 24}}>
        <div style={{...label, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
          <Label size={16} color={C.muted}>your team needs you</Label>
          <Label size={15} color={C.subtle}>patterns, not 60 cards</Label>
        </div>
        <div style={card}>
          <Card tone="sand" style={{padding: '34px 38px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20}}>
              <Chip tone="sand">SLA breach</Chip>
              <Label size={15} color={C.subtle}>response-watch agent · live</Label>
            </div>
            <Display size={40} weight={600} color={C.ink} style={{lineHeight: 1.25, marginBottom: 16}}>
              A hot lead has waited{' '}
              <span style={{color: C.sandText}}>3h 12m</span> on Marcus.
            </Display>
            <Body size={25} color={C.body}>
              <b style={{color: C.ink}}>ICP 91%</b> · $720K North Hills. Marcus is in a showing. Reassign or ping him?
            </Body>
          </Card>
        </div>
        <div style={{opacity: clock}}>
          <Body size={22} color={C.muted} style={{textAlign: 'center'}}>
            Your own deals and the team's, ranked in one place.
          </Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---- Beat F: the thesis ----------------------------------------------------
const Thesis: React.FC = () => {
  const frame = useCurrentFrame();
  const l1 = fadeRise(frame, 8, 26, 20);
  const l2 = fade(frame, 38, 28);
  const out = fadeOut(frame, 112, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div style={{maxWidth: 1180, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center'}}>
        <div style={l1}>
          <Display size={62} weight={600} style={{lineHeight: 1.12, letterSpacing: '-0.03em'}}>
            A triage, not a dashboard.
          </Display>
        </div>
        <div style={{opacity: l2, maxWidth: 980}}>
          <Body size={28} color={C.body} style={{lineHeight: 1.5}}>
            The few things that need a human, ranked across your own deals and the team's.
          </Body>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProductOverview: React.FC = () => {
  // Timeline (1200 frames @ 30fps = 40s):
  //  greeting 0-145 · ledger 145-325 · section 325-395 · triage 395-630
  //  oak st 630-825 · team breach 825-1015 · thesis 1015-1145 · end 1145-1200
  return (
    <Atmosphere>
      <Sequence from={0} durationInFrames={145}><Greeting /></Sequence>
      <Sequence from={145} durationInFrames={180}><Ledger /></Sequence>

      <Sequence from={325} durationInFrames={70}><SectionTitle kicker="needs your judgment" title={<>What needs you this morning</>} /></Sequence>
      <Sequence from={395} durationInFrames={235}><Triage /></Sequence>

      <Sequence from={630} durationInFrames={195}><OakSt /></Sequence>
      <Sequence from={825} durationInFrames={190}><TeamBreach /></Sequence>

      <Sequence from={1015} durationInFrames={135}><Thesis /></Sequence>
      <Sequence from={1145}>
        <EndCard start={4} kicker="real" title={<>morning command center</>} />
      </Sequence>
    </Atmosphere>
  );
};

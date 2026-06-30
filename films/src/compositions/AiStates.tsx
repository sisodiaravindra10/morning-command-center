import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {Atmosphere} from '../components/Atmosphere';
import {Label, Display, Body} from '../components/Type';
import {Card, Chip} from '../components/Card';
import {
  ThinkingDot,
  UndoRing,
  DoneTick,
  UncertainDot,
  SilentDot,
} from '../components/StateDots';
import {fade, fadeRise, beat} from '../components/motion';
import {EndCard} from '../components/EndCard';

/**
 * Film 2 · aiStates — "The five ways Leo speaks."
 * The heaviest evaluation axis, so the most refined. Five beats, each the
 * state named with its own motion and a line in Leo's voice (verbatim from
 * the prototype). Calm fades, emerald for the AI, warm sand for what
 * needs a human. 840 frames @ 30fps = 28s.
 */

const BeatFrame: React.FC<{
  index: string;
  title: string;
  titleColor?: string;
  children: React.ReactNode;
  startFrame: number;
}> = ({index, title, titleColor = C.ink, children, startFrame}) => {
  const frame = useCurrentFrame();
  const head = fadeRise(frame, startFrame, 22, 18);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{width: 1180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, ...head}}>
          <Label size={17} color={C.muted}>{index}</Label>
          <span style={{width: 6, height: 6, borderRadius: '50%', background: C.subtle}} />
          <Display size={40} weight={600} color={titleColor} style={{lineHeight: 1}}>
            {title}
          </Display>
        </div>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// A quote block in Leo's voice (Host Grotesk), with a leading state visual.
const VoiceLine: React.FC<{children: React.ReactNode; start: number; size?: number}> = ({children, start, size = 38}) => {
  const frame = useCurrentFrame();
  const r = fadeRise(frame, start, 24, 20);
  return (
    <div style={{...r, maxWidth: 980, textAlign: 'center'}}>
      <Display size={size} weight={500} color={C.ink} style={{lineHeight: 1.28, letterSpacing: '-0.018em'}}>
        {children}
      </Display>
    </div>
  );
};

// ---- Beat 1: Thinking ------------------------------------------------------
const Thinking: React.FC = () => {
  return (
    <BeatFrame index="01" title="Thinking" startFrame={0}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
        <ThinkingDot size={26} />
        <VoiceLine start={20}>
          Market-Watch is reading 14 comps.
        </VoiceLine>
        <Body size={22} color={C.muted} style={{opacity: fade(useCurrentFrame(), 44, 22)}}>
          A calm breathing dot, never a blocking spinner.
        </Body>
      </div>
    </BeatFrame>
  );
};

// ---- Beat 2: Confident -----------------------------------------------------
const Confident: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <BeatFrame index="02" title="Confident" startFrame={0}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 42}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: fade(frame, 18, 20)}}>
          <DoneTick size={46} drawAt={26} />
          <Display size={40} weight={500} color={C.ink}>Done. Here is what changed.</Display>
        </div>
        <div style={{opacity: fade(frame, 40, 20)}}>
          <UndoRing size={132} seconds={8} startFrame={52} />
        </div>
        <Body size={22} color={C.muted} style={{opacity: fade(frame, 60, 22)}}>
          Always reversible. An 8-second undo. Confidence is never arrogance.
        </Body>
      </div>
    </BeatFrame>
  );
};

// ---- Beat 3: Uncertain -----------------------------------------------------
const Uncertain: React.FC = () => {
  const frame = useCurrentFrame();
  const optA = fadeRise(frame, 56, 22, 16);
  const optB = fadeRise(frame, 66, 22, 16);
  return (
    <BeatFrame index="03" title="Uncertain" titleColor={C.sandText} startFrame={0}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 38}}>
        <UncertainDot size={24} />
        <VoiceLine start={20} size={36}>
          I am fairly sure. A fair counter is $605K to $618K.
        </VoiceLine>
        <div style={{display: 'flex', gap: 18}}>
          <div style={optA}>
            <Card tone="accent" style={{width: 360, padding: '20px 22px'}}>
              <Label size={14} color={C.accentHi}>option a · recommended</Label>
              <Body size={23} color={C.ink} weight={600} style={{marginTop: 8}}>Counter at $612K</Body>
              <Body size={18} color={C.body} style={{marginTop: 4}}>Holds the midpoint, leaves room to close.</Body>
            </Card>
          </div>
          <div style={optB}>
            <Card style={{width: 360, padding: '20px 22px'}}>
              <Label size={14} color={C.muted}>option b</Label>
              <Body size={23} color={C.ink} weight={600} style={{marginTop: 8}}>Hold at $618K</Body>
              <Body size={18} color={C.body} style={{marginTop: 4}}>Firmer, slower, more upside.</Body>
            </Card>
          </div>
        </div>
        <Body size={21} color={C.muted} style={{opacity: fade(frame, 84, 22)}}>
          It surfaces its own doubt and two options. Judgment returns to you.
        </Body>
      </div>
    </BeatFrame>
  );
};

// ---- Beat 4: Silent --------------------------------------------------------
const Silent: React.FC = () => {
  const frame = useCurrentFrame();
  const ledger = fadeRise(frame, 40, 24, 18);
  return (
    <BeatFrame index="04" title="Silent" startFrame={0}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40}}>
        <SilentDot size={22} />
        <VoiceLine start={18} size={36}>
          47 handled overnight. I chose not to interrupt you.
        </VoiceLine>
        <div style={ledger}>
          <Card style={{width: 760, padding: '26px 30px'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <DoneTick size={36} drawAt={56} />
                <Body size={24} color={C.body}>
                  <b style={{color: C.ink, fontVariantNumeric: 'tabular-nums'}}>47</b> handled overnight
                  <span style={{color: C.subtle}}>{'  ·  '}</span>
                  <b style={{color: C.good}}>8.5h</b> saved
                </Body>
              </div>
              <Label size={14} color={C.subtle}>the count is the proof</Label>
            </div>
          </Card>
        </div>
        <Body size={21} color={C.muted} style={{opacity: fade(frame, 70, 22)}}>
          The default for most of the work. It earns trust by not interrupting.
        </Body>
      </div>
    </BeatFrame>
  );
};

// ---- Beat 5: Wrong, then corrected ----------------------------------------
const WrongCorrected: React.FC = () => {
  const frame = useCurrentFrame();
  // the caught (warm) line resolves into the fixed (cool) line
  const caught = beat(frame, 40, 96, 20, 16);
  const fixed = fade(frame, 100, 24);
  const fixedCard = fadeRise(frame, 104, 24, 16);
  return (
    <BeatFrame index="05" title="Wrong, then corrected" titleColor={C.sandText} startFrame={0}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: fade(frame, 14, 18)}}>
          <Chip tone="sand">I caught myself</Chip>
          <Label size={15} color={C.subtle}>fair housing</Label>
        </div>
        <VoiceLine start={20} size={34}>
          I almost sent a line that reads as steering. I held it and rewrote it.
        </VoiceLine>

        <div style={{position: 'relative', width: 820, height: 150}}>
          {/* caught: the risky draft, struck */}
          <div style={{position: 'absolute', inset: 0, opacity: caught}}>
            <Card tone="sand" style={{padding: '20px 24px'}}>
              <Label size={14} color={C.sandText}>held draft · logged for audit</Label>
              <Body size={23} color={C.muted} style={{marginTop: 10, textDecoration: 'line-through', textDecorationColor: C.sand}}>
                "You'll love the kind of people who live in this neighborhood."
              </Body>
            </Card>
          </div>
          {/* fixed: the compliant rewrite */}
          <div style={{position: 'absolute', inset: 0, ...fixedCard, opacity: (fixedCard.opacity ?? 1)}}>
            <Card tone="accent" style={{padding: '20px 24px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <DoneTick size={30} drawAt={108} />
                <Label size={14} color={C.accentHi}>rewritten · safe to send</Label>
              </div>
              <Body size={23} color={C.ink} style={{marginTop: 10}}>
                "This home has four bedrooms, a renovated kitchen, and a quiet, tree-lined street."
              </Body>
            </Card>
          </div>
        </div>
        <Body size={21} color={C.muted} style={{opacity: fixed}}>
          It owns the miss, you correct it, it logs the original. Warm caught, resolved to cool fixed.
        </Body>
      </div>
    </BeatFrame>
  );
};

export const AiStates: React.FC = () => {
  // Five beats. Each ~150 frames with a short cross-fade hand-off, then end card.
  const dur = 150;
  return (
    <Atmosphere>
      {/* persistent quiet header so the film reads as one piece */}
      <AbsoluteFill style={{padding: '64px 0 0 0', alignItems: 'center'}}>
        <FilmHeader />
      </AbsoluteFill>

      <Sequence from={0} durationInFrames={dur}><Thinking /></Sequence>
      <Sequence from={dur} durationInFrames={dur}><Confident /></Sequence>
      <Sequence from={dur * 2} durationInFrames={dur}><Uncertain /></Sequence>
      <Sequence from={dur * 3} durationInFrames={dur}><Silent /></Sequence>
      <Sequence from={dur * 4} durationInFrames={dur}><WrongCorrected /></Sequence>

      <Sequence from={dur * 5}>
        <EndCard
          start={6}
          kicker="real · morning command center"
          title={<>One voice, five honest states.</>}
        />
      </Sequence>
    </Atmosphere>
  );
};

const FilmHeader: React.FC = () => {
  const frame = useCurrentFrame();
  // fade the header out as we reach the end card
  const out = frame > 740 ? Math.max(0, 1 - (frame - 740) / 20) : 1;
  return (
    <div style={{opacity: fade(frame, 4, 24) * out, textAlign: 'center'}}>
      <Label size={16} color={C.muted}>how leo speaks</Label>
    </div>
  );
};

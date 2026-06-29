import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, FONT} from '../theme';
import {fade, softSpring} from './motion';

/** The Leo mark: a soft periwinkle orb with a gentle glow. The calm signature. */
export const LeoMark: React.FC<{size?: number; pulseFrom?: number}> = ({size = 64, pulseFrom = 0}) => {
  const frame = useCurrentFrame();
  const s = softSpring(frame, pulseFrom);
  return (
    <div style={{position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center', transform: `scale(${0.6 + s * 0.4})`}}>
      <div style={{position: 'absolute', width: size * 1.7, height: size * 1.7, borderRadius: '50%', background: C.accent, opacity: 0.18, filter: 'blur(14px)'}} />
      <div style={{width: size, height: size, borderRadius: '50%', background: `linear-gradient(150deg, ${C.accentHi}, ${C.accent})`, boxShadow: `0 0 28px -2px ${C.accent}`, border: `1px solid ${C.accentLine}`}} />
    </div>
  );
};

/**
 * Closing card shared by all three films: the Leo mark, a wordmark line, and
 * an optional thesis line beneath. Calm fade-up, no flash.
 */
export const EndCard: React.FC<{
  start: number;
  title: React.ReactNode;
  kicker?: string;
}> = ({start, title, kicker}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, opacity: fade(frame, start, 24)}}>
        <LeoMark size={68} pulseFrom={start} />
        {kicker ? (
          <div style={{fontFamily: FONT.mono, fontSize: 17, letterSpacing: '0.18em', color: C.muted, opacity: fade(frame, start + 8, 22)}}>
            {kicker}
          </div>
        ) : null}
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: 50,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: C.ink,
            textAlign: 'center',
            lineHeight: 1.1,
            opacity: fade(frame, start + 6, 24),
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};

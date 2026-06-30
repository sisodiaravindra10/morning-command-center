import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, FONT, FPS} from '../theme';

/** Thinking: a calm breathing emerald dot, never a blocking spinner. */
export const ThinkingDot: React.FC<{size?: number}> = ({size = 22}) => {
  const frame = useCurrentFrame();
  const t = Math.sin((frame / (FPS * 1.6)) * Math.PI * 2);
  const scale = interpolate(t, [-1, 1], [0.78, 1.22]);
  const op = interpolate(t, [-1, 1], [0.4, 1]);
  return (
    <div style={{position: 'relative', width: size * 2.6, height: size * 2.6, display: 'grid', placeItems: 'center'}}>
      <div
        style={{
          position: 'absolute',
          width: size * 2.4,
          height: size * 2.4,
          borderRadius: '50%',
          background: C.accent,
          opacity: op * 0.16,
          transform: `scale(${scale})`,
          filter: 'blur(6px)',
        }}
      />
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: C.accent,
          opacity: op,
          transform: `scale(${scale})`,
          boxShadow: `0 0 ${18 * op}px ${C.accent}`,
        }}
      />
    </div>
  );
};

/**
 * Confident: a draining undo ring. Pass total seconds and the frame the
 * action landed; the ring drains from full to empty over that window.
 */
export const UndoRing: React.FC<{
  size?: number;
  seconds?: number;
  startFrame?: number;
}> = ({size = 120, seconds = 8, startFrame = 0}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame) / FPS;
  const remaining = Math.max(0, 1 - elapsed / seconds); // 1 -> 0
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const secsLeft = Math.max(0, Math.ceil(seconds - elapsed));
  return (
    <div style={{position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center'}}>
      <svg width={size} height={size} style={{position: 'absolute', transform: 'rotate(-90deg)'}}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.hair} strokeWidth={4} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={C.accent}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - remaining)}
          style={{filter: `drop-shadow(0 0 6px ${C.accentSoft})`}}
        />
      </svg>
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: FONT.mono, color: C.accentHi, fontSize: 30, fontWeight: 600, fontVariantNumeric: 'tabular-nums', lineHeight: 1}}>
          {secsLeft}s
        </div>
        <div style={{fontFamily: FONT.mono, color: C.muted, fontSize: 12, letterSpacing: '0.1em', marginTop: 4}}>
          undo
        </div>
      </div>
    </div>
  );
};

/** A small check inside a soft good-tinted disc (for "Done"). */
export const DoneTick: React.FC<{size?: number; drawAt?: number}> = ({size = 40, drawAt = 0}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [drawAt, drawAt + 14], [26, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{width: size, height: size, borderRadius: '50%', background: C.goodSoft, display: 'grid', placeItems: 'center', border: `1px solid rgba(121,184,156,0.4)`}}>
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="none" stroke={C.good} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" strokeDasharray={26} strokeDashoffset={p} />
      </svg>
    </div>
  );
};

/** Uncertain: an amber-sand dot that pulses a soft ring outward (the hand-up). */
export const UncertainDot: React.FC<{size?: number}> = ({size = 22}) => {
  const frame = useCurrentFrame();
  const cycle = (frame % (FPS * 1.9)) / (FPS * 1.9);
  const ringScale = interpolate(cycle, [0, 1], [0.6, 1.9]);
  const ringOp = interpolate(cycle, [0, 1], [0.7, 0]);
  return (
    <div style={{position: 'relative', width: size * 3, height: size * 3, display: 'grid', placeItems: 'center'}}>
      <div
        style={{
          position: 'absolute',
          width: size * 1.8,
          height: size * 1.8,
          borderRadius: '50%',
          border: `1.5px solid ${C.sand}`,
          opacity: ringOp,
          transform: `scale(${ringScale})`,
        }}
      />
      <div style={{width: size, height: size, borderRadius: '50%', background: C.sand, boxShadow: `0 0 14px ${C.sandSoft}`}} />
    </div>
  );
};

/** Silent: a hollow dot, slowly breathing low. The work it chose not to show. */
export const SilentDot: React.FC<{size?: number}> = ({size = 20}) => {
  const frame = useCurrentFrame();
  const op = interpolate(Math.sin((frame / (FPS * 2.6)) * Math.PI * 2), [-1, 1], [0.28, 0.7]);
  return (
    <div style={{width: size, height: size, borderRadius: '50%', border: `1.5px solid ${C.muted}`, opacity: op}} />
  );
};

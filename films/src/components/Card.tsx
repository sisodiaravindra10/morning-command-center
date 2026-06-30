import React from 'react';
import {C, FONT, RAISED_CARD} from '../theme';

/** The one raised-card recipe. `tone` shifts the edge for the two poles. */
export const Card: React.FC<{
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'sand';
  style?: React.CSSProperties;
}> = ({children, tone = 'neutral', style}) => {
  const edge =
    tone === 'accent'
      ? {
          border: `1px solid ${C.accentLine}`,
          background: 'linear-gradient(178deg, #20243A 0%, #14151F 68%)',
        }
      : tone === 'sand'
        ? {
            border: `1px solid ${C.sandLine}`,
            background:
              'linear-gradient(178deg, rgba(231,199,156,0.08), #15171F 60%)',
          }
        : {};
  return (
    <div style={{...RAISED_CARD, ...edge, ...style}}>{children}</div>
  );
};

/** A small chip (mono), for state tags like "Needs you" / "I caught myself". */
export const Chip: React.FC<{
  children: React.ReactNode;
  tone?: 'accent' | 'sand' | 'good' | 'muted';
}> = ({children, tone = 'accent'}) => {
  const map = {
    accent: {color: C.accentHi, border: C.accentLine, bg: C.accentSoft, dot: C.accent},
    sand: {color: C.sandText, border: C.sandLine, bg: C.sandSoft, dot: C.sand},
    good: {color: C.good, border: 'rgba(121,184,156,0.4)', bg: C.goodSoft, dot: C.good},
    muted: {color: C.muted, border: C.hair, bg: 'transparent', dot: C.muted},
  }[tone];
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: map.color,
        border: `1px solid ${map.border}`,
        background: map.bg,
        borderRadius: 9,
        padding: '6px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: map.dot,
          display: 'inline-block',
        }}
      />
      {children}
    </span>
  );
};

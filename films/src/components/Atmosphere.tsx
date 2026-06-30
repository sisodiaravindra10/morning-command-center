import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {ATMOSPHERE, C} from '../theme';

/**
 * The still, dark, top-lit canvas every film sits on. A single very slow
 * brightness drift on the emerald glow keeps it alive without ever
 * reading as motion (the design system: the gradient is "still").
 */
export const Atmosphere: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  // a barely-there breath over ~12s, premium and calm
  const glow = interpolate(
    Math.sin((frame / 360) * Math.PI * 2),
    [-1, 1],
    [0.86, 1.04],
  );
  return (
    <AbsoluteFill style={{backgroundColor: C.canvas}}>
      <AbsoluteFill style={{background: ATMOSPHERE, opacity: glow}} />
      {/* a faint vignette to seat the frame */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(120% 120% at 50% 50%, transparent 60%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

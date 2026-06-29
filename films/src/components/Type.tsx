import React from 'react';
import {C, FONT} from '../theme';

/** Mono machine-layer label. Sentence case, tracked out. Never all-caps. */
export const Label: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({children, color = C.muted, size = 16, style}) => (
  <div
    style={{
      fontFamily: FONT.mono,
      fontSize: size,
      letterSpacing: '0.14em',
      color,
      fontWeight: 500,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Host Grotesk display — titles, the greeting, the lines Leo speaks. */
export const Display: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, size = 64, weight = 600, color = C.ink, style}) => (
  <div
    style={{
      fontFamily: FONT.display,
      fontSize: size,
      fontWeight: weight,
      letterSpacing: size > 48 ? '-0.03em' : '-0.02em',
      lineHeight: 1.05,
      color,
      textWrap: 'balance',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Inter body. */
export const Body: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({children, size = 26, color = C.body, weight = 400, style}) => (
  <div
    style={{
      fontFamily: FONT.sans,
      fontSize: size,
      fontWeight: weight,
      lineHeight: 1.5,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

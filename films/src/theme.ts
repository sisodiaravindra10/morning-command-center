/**
 * Real · morning command center — brand tokens.
 * Dark premium. Near-black canvas, emerald accent that glows on dark,
 * warm sand reserved for what needs a human. Matched to the prototype
 * (command-center.html) and the design system (09-design-system.md).
 */
export const C = {
  canvas: '#0A0B10',
  surface1: '#15171F',
  surface2: '#1C1E29',
  surface3: '#22242F',
  sunken: '#0F1016',
  ink: '#F1F3FA',
  body: '#BCC1D2',
  muted: '#828AA0',
  subtle: '#5C6378',
  hair: 'rgba(255,255,255,0.07)',
  hairSoft: 'rgba(255,255,255,0.04)',
  // emerald: the AI, the calm, the interactive
  accent: '#15C07A',
  accentHi: '#46DD9B',
  accentInk: '#0B0C12',
  accentSoft: 'rgba(21,192,122,0.14)',
  accentLine: 'rgba(21,192,122,0.32)',
  accentTint: 'rgba(21,192,122,0.12)',
  good: '#79B89C',
  goodSoft: 'rgba(121,184,156,0.12)',
  // warm sand: what needs a human
  sand: '#E7C79C',
  sandText: '#ECCBA0',
  sandSoft: 'rgba(231,199,156,0.14)',
  sandLine: 'rgba(231,199,156,0.42)',
  amber: '#C9AC85',
} as const;

export const FONT = {
  display: '"Host Grotesk", "Inter", system-ui, sans-serif',
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

// Calm, premium settle. The brand easing.
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_IO = [0.65, 0, 0.35, 1] as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// The atmospheric background: a soft dark radial gradient like the explorations
// page, top-lit and still. Never a blur, never behind running body text.
export const ATMOSPHERE =
  'radial-gradient(1400px 820px at 72% -10%, rgba(21,192,122,0.10), transparent 60%),' +
  'radial-gradient(1100px 640px at 6% 6%, rgba(231,199,156,0.045), transparent 55%),' +
  'radial-gradient(150% 95% at 50% -18%, #17191E 0%, #0B0C12 52%, #08090B 100%)';

// One raised-card recipe, used everywhere a card sits on the canvas.
export const RAISED_CARD: React.CSSProperties = {
  background: 'linear-gradient(178deg, #1C1E29 0%, #131420 100%)',
  border: `1px solid ${C.hair}`,
  boxShadow:
    '0 1px 2px rgba(0,0,0,0.4), 0 18px 40px -22px rgba(0,0,0,0.66), inset 0 1px 0 rgba(255,255,255,0.05)',
  borderRadius: 18,
};

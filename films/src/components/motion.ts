import {interpolate, spring, Easing} from 'remotion';
import {EASE, FPS} from '../theme';

const brandEasing = Easing.bezier(EASE[0], EASE[1], EASE[2], EASE[3]);

/** A calm fade + gentle rise, the house entrance. Returns {opacity, y}. */
export function fadeRise(
  frame: number,
  start: number,
  dur = 22,
  rise = 22,
): {opacity: number; transform: string} {
  const opacity = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });
  const y = interpolate(frame, [start, start + dur], [rise, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });
  return {opacity, transform: `translateY(${y.toFixed(2)}px)`};
}

/** Plain fade, no movement. */
export function fade(
  frame: number,
  start: number,
  dur = 18,
): number {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });
}

/** Fade out over a window (for clean beat-to-beat handoffs). */
export function fadeOut(frame: number, start: number, dur = 14): number {
  return interpolate(frame, [start, start + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: brandEasing,
  });
}

/** A soft spring scale-in for a single hero element. */
export function softSpring(frame: number, start: number, fps = FPS): number {
  return spring({
    frame: frame - start,
    fps,
    config: {damping: 200, mass: 0.9, stiffness: 90},
  });
}

/** Cross-fade helper for a beat that lives between [in, out]. */
export function beat(
  frame: number,
  inAt: number,
  outAt: number,
  rampIn = 18,
  rampOut = 14,
): number {
  return Math.min(fade(frame, inAt, rampIn), fadeOut(frame, outAt, rampOut));
}

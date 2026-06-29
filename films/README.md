# Real · morning command center — product films

Three short product films in the "morning command center" dark-premium brand,
built with [Remotion](https://www.remotion.dev) v4 (React + TypeScript). They
render at 1920×1080, 30fps, h264. Copy and surfaces are faithful to the
prototype (`../prototype/command-center.html`) and the design system
(`../docs/09-design-system.md`): near-black canvas, a periwinkle accent that
glows on dark, and warm sand reserved for the few things that need a human.

## The films

| File | Composition id | Length | What it is |
|---|---|---|---|
| `product-overview.mp4` | `productOverview` | 40s (1200f) | The morning command center: a dark open, "Good morning, Dana", the trust ledger assembling (47 handled overnight, 2 need you, 1 corrected), the focus-card triage (the Crestview deal gone quiet, 62% sure a nudge helps), Leo's Oak St counter (hold at $612K, reviewed before send), the team SLA breach (a hot lead waited 3h 12m on Marcus), closing on the thesis "A triage, not a dashboard." |
| `ai-states.mp4` | `aiStates` | 28s (840f) | The five ways Leo speaks, each a motion beat in Leo's voice: Thinking (a breathing dot, "reading 14 comps"), Confident ("Done. Here is what changed." with an 8-second undo ring draining), Uncertain ("I am fairly sure. A fair counter is $605K to $618K." with two options), Silent ("47 handled overnight, chose not to interrupt you"), and Wrong then corrected (the Fair-Housing save). |
| `orchestration.mp4` | `orchestration` | 26s (780f) | "100+ agents" as a calm drifting field of dots, flowing down through a filter labelled "uncertain · high stakes · needs your voice", narrowing to "so three reached you". The many become the few. Ends on "100+ agents, one calm front door." |

Each film also has a poster still for the landing page:
`product-overview-poster.jpg`, `ai-states-poster.jpg`, `orchestration-poster.jpg`.

## Re-rendering

From this folder (`submission/films/`):

```bash
npm install                       # one time; node_modules can be gitignored

# the three films (mp4, h264, 1080p)
npx remotion render productOverview product-overview.mp4
npx remotion render aiStates       ai-states.mp4
npx remotion render orchestration  orchestration.mp4

# the poster stills (jpg, a representative frame each)
npx remotion still productOverview product-overview-poster.jpg --frame=520
npx remotion still aiStates         ai-states-poster.jpg       --frame=405
npx remotion still orchestration    orchestration-poster.jpg   --frame=320
```

To preview and scrub interactively: `npm start` (opens Remotion Studio).

## How it is built

- `src/theme.ts` — brand tokens (color, type, easing, the atmosphere
  gradient, the one raised-card recipe), matched to the design system.
- `src/fonts.ts` — Host Grotesk, Inter, JetBrains Mono via
  `@remotion/google-fonts`, awaited before first render.
- `src/components/` — the shared kit: `Atmosphere` (the still dark canvas),
  the type primitives, the raised `Card` and `Chip`, the AI-state visuals
  (breathing dot, draining undo ring, uncertain hand-up, silent dot), the
  calm `motion` helpers (fade / rise on the brand easing), and the `EndCard`
  with the periwinkle Leo mark.
- `src/compositions/` — one file per film.
- `src/Root.tsx` — registers the three compositions.

Motion is calm and premium throughout: gentle fades and rises on
`cubic-bezier(.16,1,.3,1)`, a soft periwinkle glow, no harsh flashes or fast
cuts. On-screen text is plain English, sentence case, no em-dashes.

`node_modules/` can be gitignored (see `.gitignore`); run `npm install` to
restore it.

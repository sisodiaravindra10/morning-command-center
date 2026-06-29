# Design system: the morning command center

The system behind the prototype, written down. The coded prototype (`prototype/command-center.html`) is the source of truth; this document names the rules it follows so the same surface can be rebuilt in Figma or extended without drifting. One rule sits above the rest: this is a calm triage, not a dashboard, so every choice here spends attention carefully and earns trust by being honest.

## 1. Principles

1. **Dark premium, atmospheric.** A near-black canvas, light cool text, and a single periwinkle accent that glows. The mood is a quiet, expensive instrument you open before dawn. Warmth lives only where it signals: the few things that need a human.
2. **Rank by stake, show only what needs a human.** The first screen is the few things that need judgment this morning, led by the one number a team lead lives by (team response time). Inventory, feeds, and heavy modules stay off it.
3. **Two poles of meaning.** Cool periwinkle is calm: handled, confident, the AI, anything interactive. Warm sand is you: urgent, going quiet, the things that need your hand. The reader feels the difference before reading a word.
4. **Three voices, three type families.** Host Grotesk is the display voice (titles and the moments Leo speaks), Inter is the interface, JetBrains Mono is the machine layer (labels, counts, the small print). The reader can tell who is talking by the type alone.
5. **Calibrated, never certain.** Confidence is plain language and ranges, never a fake percentage. The system names the uncomfortable thing first and proves what it chose not to bother you with.
6. **Anti-slop.** No all-caps labels, no blurred shapes behind text, no colored side-stripes, no gradient text, no fake numeric precision, no em-dashes. See section 12.

## 2. Type system

Three families, each with one job. The contrast between them is the hierarchy.

| Family | Token | Role |
|---|---|---|
| Host Grotesk | `--serif` | The display voice: the greeting, the read-band paper copy, and the drafted message Leo speaks in the voice outbox. A legacy token name that holds the sans display family; despite the name, no actual serif loads. |
| Inter | `--font` | Body and interface: card titles and the lines Leo speaks on a card, screen copy, sentences, buttons, list rows. |
| JetBrains Mono | `--mono` | The machine layer: section labels, row metadata, counts, confidence tags, the big pipeline numeral. Sentence case, tracked out. |

Loaded from Google Fonts (`Host Grotesk:wght@400;500;600;700`, `Inter`, `JetBrains Mono`). `--serif` falls back to Inter, so a slow font load never breaks the layout.

### The scale

| Role | Family | Size / line height | Weight | Tracking | Color | Used on |
|---|---|---|---|---|---|---|
| Pipeline numeral | JetBrains Mono | 31 / .95 | 600 | -0.035em | ink | the $14.2M pipeline figure in the dashboard glance hero (the biggest number in the app, and it is mono, not the display family) |
| Greeting | Host Grotesk | 25 / 1.05 | 600 | -0.02em | ink | the morning greeting, "Good morning, Dana" |
| Sheet title | Inter | 18 / 1.25 | 600 | -0.015em | ink | the title in a bottom-sheet head |
| Voice | Host Grotesk | 13.5 to 15 / 1.45 to 1.5 | 400 to 500 | 0 | ink / paper-ink | the read-band paper copy and the drafted message Leo speaks in the voice outbox |
| Card title | Inter | 15 / 1.32 | 600 | -0.01em | ink | the line Leo speaks on a triage card, deal addresses |
| Body | Inter | 12.5 to 13 / 1.4 to 1.5 | 400 to 500 | 0 | ink-muted / ink | card context lines, descriptions, sentences |
| Label | JetBrains Mono | 10 | 500 | 0.14em | ink-subtle | section labels (Needs your judgment, Your team needs you) |
| Meta | JetBrains Mono | 8.5 to 11 | 400 to 600 | 0.06 to 0.12em | ink-subtle | row metadata, chips, counts, the machine layer |

Rules of thumb: Host Grotesk only on the greeting, the paper read-band, and the drafted lines Leo speaks, never on running interface text. The big pipeline numeral is mono, not the display family. Mono only on short labels and counts, never on a sentence. **Sentence case everywhere; never all-caps** (decorative caps read as AI-slop). Tighten tracking as display type gets larger; leave body and mono at their natural spacing.

## 3. Color

Dark premium. A near-black canvas with a periwinkle accent that glows on it, and a warm sand reserved for what needs a human.

### Brand palette
The five-color base everything is derived from: black `#000000`, espresso `#43342A`, taupe `#75655C`, periwinkle `#8A93C4`, light periwinkle `#AEC2F6`.

### Surfaces and ink
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0A0B10` | app background (near-black, faint cool) |
| `--p1` | `#15171F` | base surface, the resting card |
| `--p2` | `#1C1E29` | the first raised step (inset wells, the message bubble ground) |
| `--p3` | `#22242F` | a further step up (avatars, picture chips, toast ground) |
| `--p4` | `#282B37` | the top surface step |
| `--line` | `rgba(174,194,246,0.12)` | periwinkle-tinted hairlines and dividers |
| `--line-soft` | `rgba(174,194,246,0.06)` | the faintest divider, between dense rows |
| `--ink` | `#F1F3FA` | primary text, titles |
| `--ink-muted` | `#BCC1D2` | body text |
| `--ink-subtle` | `#828AA0` | labels, metadata |
| `--paper` | `#15171F` | a legacy name for the read-band surface; equal to `--p1`, not the background |

Surfaces step up through `--p1` to `--p4` rather than using a single flat token; inset wells reach for `--p2`/`--p3`. Raised cards take a subtly top-lit gradient so they feel raised on the near-black: `linear-gradient(178deg, #1C1E29 0%, #131420 100%)` plus a 1px highlight `inset 0 1px 0 rgba(255,255,255,0.05)`.

### The two poles
Cool periwinkle = calm, handled, AI, interactive. Warm sand = it needs you. Used sparingly: a dot, a tint, a single word, never a filled card.

| Token | Value | Meaning |
|---|---|---|
| `--signal` | `#AEC2F6` | confident, handled, the AI, and the one interactive fill: the primary button, links, focus rings; glows on dark |
| `--signal-hi` | `#CBD6FB` | the brighter periwinkle, for hover and the text that needs to lift off a tint |
| `--signal-ink` | `#0B0C12` | the dark text that sits on a periwinkle fill |
| `--info` | `#AEC2F6` | the thinking and learn periwinkle (the breathing chip, the learn panel); same hue as signal |
| `--good` | `#9BB4E5` | handled, healthy, the all-clear and the sent tick |
| `--warn` | `#C9AC85` | attention, going quiet, past target |
| `--danger` | `#E7C79C` | urgent, needs you now (the brighter warm sand) |

### Tints, borders, and the brighter accent
On the dark canvas these accents are already light enough to read as small text, so there is no separate text variant; where text needs to lift further it uses `--signal-hi`. The washes are low-alpha fills for chips and focus bands, and each warm or cool accent carries a matching border line.

| Wash (fill) | Line (border) |
|---|---|
| `--signal-wash` `rgba(174,194,246,0.12)` | `--signal-line` `rgba(174,194,246,0.32)` |
| `--good-wash` `rgba(155,180,229,0.12)` | a one-off `rgba(155,180,229,0.4)` border on done chips |
| `--danger-wash` `rgba(231,199,156,0.14)` | `--danger-line` `rgba(231,199,156,0.42)` |
| `--info-wash` `rgba(174,194,246,0.12)` | a one-off `rgba(174,194,246,0.3)` border on think and learn |

The brighter periwinkle for hover and lifted text is `--signal-hi` `#CBD6FB`.

Rule: text on a periwinkle-filled element (the primary button) is `--signal-ink` `#0B0C12`, not white. Washes are for backgrounds and focus bands only.

## 4. Shape, depth, spacing

| Token | Value | Use |
|---|---|---|
| `--r` | 8px | chips, buttons, segmented controls, small controls |
| `--r-md` | 13px | cards, the glance, the deck blocks |
| `--r-lg` | 18px | the hero and the larger deck blocks |
| `--r-paper` | 14px | the read-band paper |

There is no `--shadow` token. The raised-card shadow is written inline: `0 16px 36px -24px rgba(0,0,0,.66)` plus a 1px highlight `inset 0 1px 0 rgba(255,255,255,.05)`. The one focus card lifts further, to `0 24px 52px -22px rgba(0,0,0,.74)`. Sheets are the only true overlay allowed to lift, with their own `0 -26px 64px -22px rgba(0,0,0,.82)`. Sheet corners are a hardcoded 22px, outside the radius scale.

- **Raised card recipe:** the top-lit gradient (section 3) plus the inline raised-card shadow plus the 1px inset highlight. One recipe, used everywhere a card sits on the canvas; the focus card swaps in the deeper lift.
- **Gutter:** about 18px left and right (the app bar, altitude, cover chip, and scroll region all pad to 18px). There is no `.pad` class. The phone frame holds a single column.
- **Touch targets:** 44px minimum on anything tappable.
- **Hairlines** (`--line`, periwinkle-tinted) separate dense rows; cards carry the gradient and shadow instead.

## 5. Motion

CSS only. The undo-ring drain and the reconciler write-back run on a short `requestAnimationFrame` and `setTimeout`, but there are no scroll listeners and no IntersectionObserver. Content is visible by default; motion is a small settle, not a gate.

- **Easing:** the shared transition token is `--ease-out: cubic-bezier(.22,1,.36,1)` (a calm settle), alongside `--ease-snap: cubic-bezier(.19,1,.22,1)` and `--ease-io: cubic-bezier(.65,0,.35,1)` for the looping idle waves. Durations are tokens too: `--dur-fast 120ms`, `--dur-med 220ms`, `--dur-slow 360ms`, `--dur-sheet 440ms`.
- **Assemble:** on screen activation the active screen's direct children rise on an `nth-child` stagger (the `kRise` keyframe, `translateY(10px)` plus opacity, with delays of .05s, .09s, .13s, .17s, .21s), and the triage cards rise on their own `nth-child` stagger (.06s, .1s, .14s). There is no `.assemble` class and no `d1` to `d7` delay classes; the stagger is built from `:nth-child` selectors.
- **Screen switching:** there is no push or slide-from-the-right. Switching screens toggles an `.is-active` class that swaps `display` and plays a short `screenIn` fade-and-rise in place (`translateY(6px)` plus opacity). The bottom-nav tab does not carry a sliding indicator pill; the active tab simply recolors its label to `--ink` and shows its badge count. The scroll position resets to the top on each switch.
- **Onboarding paging:** a three-step image-led onboarding (`#onboarding`) plays once on open, before the command center. Its three slides sit on one horizontal track and page on `transform`, a `translateX` step of one third per slide driven by a Next button (set by a `data-ob` attribute, not by free swiping). Each slide carries a full-bleed photo in the top zone fading down a gradient into a clean dark text band, a Host Grotesk headline with one accent word (periwinkle on slides 1 and 2, warm sand on slide 3), a sub, progress dots, Skip, and Next, which becomes "Get started" on the last slide. On finish the overlay fades out on `opacity`. Under `prefers-reduced-motion` the overlay is removed entirely, so the app opens straight on Today. It plays once on load, and the guided tour re-walks the morning on demand.
- **Dynamic Island morph:** the status pill is a live Dynamic Island (`#island`), not a static decoration. It morphs into a notification capsule to carry a Leo notice, a coordinated `width`, `height`, and `border-radius` transition on `--ease-snap`, while the notice content (a breathing periwinkle dot, the line, a chevron) fades and scales in just behind the shape. It holds about four seconds, then reverses to the pill. `border-radius` is animated here alongside width and height as the one deliberate exception to the transform-and-opacity rule, confined to this single element to sell the shape change as one fluid object. It fires once automatically as the morning's first beat right after onboarding, cycles a few Leo states on tap, and is fired again by the guided tour as one of its steps.
- **Idle motion:** the live AI states breathe. The thinking chip's dot breathes and a light sweep crosses the chip; the confidence wave bars rise and fall like an equalizer; the day-spine "now" node pulses a soft periwinkle ring; the team-pulse waves animate; and the legend dots each carry their state's loop. Dana's avatar holds a static periwinkle glow (it does not animate). There is no separate Leo orb element.
- **Atmospheric gradient:** a single soft radial gradient sits behind the canvas, top-lit and still (a smooth CSS gradient, never a blur). Smooth gradients only, and only as the canvas glow, never behind body text.
- **Quiet made visible:** the deal that has gone silent surfaces as its own deal-risk card with a warm needs-you treatment, rather than buzzing. Silence is shown, never sounded.
- **Reduced motion:** `prefers-reduced-motion` collapses every animation to near-zero and shows all content. The assembly rise lands instantly, the breathing dots and waves go still, and any undo ring jumps straight to full. Nothing is gated, so nothing is lost.

## 6. The five AI states

The system makes Leo's state legible at all times, and there is a dedicated legend screen (`data-screen="legend"`, reached from the orchestration glyph, and stepped to by the guided tour) that names all five in Leo's own voice.

| State | Indicator | How it speaks |
|---|---|---|
| Thinking | a calm breathing periwinkle dot, never a blocking spinner | "Market-Watch is reading 14 comps" |
| Uncertain | a periwinkle dot with an expanding ring | surfaces its own doubt and two options, a range not a point, and what it could not check |
| Confident | a periwinkle check that draws itself | "Done, here is what changed", always with an 8-second undo |
| Silent | a faint dot that fades | the default for about 90% of the work, collapsed into "47 handled"; the count is the proof |
| Wrong or corrected | a warm dot that settles after a shake | it owns the miss, you correct it, it visibly learns and logs for audit; used rarely (the Fair-Housing save) |

## 7. Components

The catalog, all built in the prototype.

- **Onboarding overlay** (`#onboarding`): a full-bleed three-slide opening that plays once before the command center. Each slide pairs a full-bleed architectural photo in the top zone (fading into a clean dark text band) with a Host Grotesk headline carrying one accent word, a sub, progress dots, a Skip, and a Next that turns into "Get started" on the last slide. The three slides run the arc: the agents work overnight, the noise is sorted by morning, only what needs you surfaces. Plays once on load; skipped under reduced motion; the guided tour re-walks the morning on demand.
- **Live Dynamic Island** (`#island`): the status pill rebuilt as a live notice carrier. It morphs from the pill into a notification capsule (a breathing periwinkle dot, a Leo line, a chevron), holds about four seconds, then collapses back. It opens automatically as the morning's first beat after onboarding and cycles a few Leo states on tap. Not a decorative shape.
- **Guided tour** (`#tour`, launched by the one `#tour-start` "Take the tour" button under the phone): a spotlight-plus-step-card overlay that walks the product one beat at a time. A `#tour-spot` ring highlights each target while the rest of the surface dims behind a large box-shadow, and a `#tour-card` gives the step a title, a one-line explanation, and Back and Next. It drives the app into each state as it explains it (firing the Dynamic Island morph, switching the morning to its busier state, switching altitude) and steps through ten beats: the trust ledger, the altitude toggle, the focus card, the Dynamic Island, the Fair-Housing guardrail, the team SLA breach, the tab bar, the orchestration funnel, the AI-states legend, and a closing summary. The spotlight transitions on `transform`-free position and size with `opacity`; under reduced motion the moves are near-instant.
- **Premium card surface:** the shared raised-card recipe (top-lit gradient + shadow + inset highlight), applied to every card class.
- **Triage card** (`.tcard`): a card with a leading severity dot (warm sand = needs you now, periwinkle = a clean handoff), an Inter title, a mono "why" line on the collapsed row, a chevron. The dot carries the state, never a side-stripe. The team-altitude cards reuse the sibling `.card` class.
- **Team pulse rows** (`.agent-row` under the "Team pulse" section label): rows, not a hairline strip, each leading with a rep's name, a mono status line, and a right-side breathing wave or an SLA clock (warm) on a breach. Status, not an action.
- **The dashboard glance, the trust ledger, the FYI digest:** the calm overnight surfaces on Today.
- **Rows:** the team-pulse and deep-team `.agent-row` (with a "needs you" flag pill), the `.rrow` region rollup, the `.lead` row (round-robin, tap to open, long-press to bulk select), and the day-spine `.tick` rows.
- **Buttons:** primary (`.btn-amber`, periwinkle fill, dark text), ghost (`.btn-ghost`, hairline), and danger (`.btn-danger`, for the defensive security action and pause-all only).
- **Bottom nav** (`.tabbar`): four roots (Today, Day, Team, Leads). There is no sliding thumb; the active tab recolors its label to `--ink` and Today and Team carry a badge count. A frosted bar with a 1px top hairline, not a rounded floating pill.
- **Trust ledger** (`#ledger`): the line that anchors the morning, "47 handled overnight, 2 need you, 1 corrected." The "need you" count (`#lg-need`) is a live button into the triage; it sets the honest tone before any card is read.
- **Focus-card triage** (`.triage`, `#triage`): one focus card plus a collapsed, severity-ordered queue. The JS assigns `.focus` to the first visible card and `.row` to the rest. Each card is a state dot, an agent tag, the line Leo speaks, a plain-confidence read where it applies, and a primary plus a ghost action. The focus card opens; the rest stay one tap away.
- **Orchestration funnel** (`data-screen="orch"`): a slow drift of "100+ agents working" through a filter labelled confidence by stakes by needs-your-voice, down to the four that surfaced. This is "how 100+ become 4," made visible.
- **AI-states legend** (`data-screen="legend"`): the five states named in Leo's own voice, the reference for every dot in the app (section 6).
- **Undo toast ring:** every confident, reversible action drops a toast with an 8-second ring, "Done, here is what changed," then undo. The ring is the proof that confidence is never one-way.
- **Reconciler write-back shimmer:** in the source-of-truth reconciler sheet, accepting "trust dotloop" runs a shimmer across the three system logos (MLS, CRM, dotloop) as the status writes back to all three at once.
- **Pause / blast-radius sheet** (`data-sheet="pause"`): the pause-all control opens a sheet that spells out exactly what goes quiet (in-flight actions held, client replies paused) versus what stays on for safety (confirmed showings still auto-confirm), with an auto-resume chip.
- **Fair-Housing tripwire** (`data-card="fairhousing"`, `data-sheet="fairhousing"`): a standalone triage card and sheet where Leo audits its own draft, catches a line that reads as steering, holds and rewrites it, and logs the original for audit. The classifier verdict is the interaction; warm "caught" resolves to cool "fixed."
- **Team report action** (`[data-report]`): a "Download team report" ghost button on the Team altitude and the deep Team screen. It shows a preparing state and then a toast that the report is ready. There is no separate report one-pager screen and no large display numeral; the $14.2M pipeline figure lives in the dashboard glance hero on Today.

## 8. Modes

There is one theme and no light or color-mode toggle. The design carries two density modes that share the same palette and type families, set by `data-mode` on the root. The live prototype ships Signal (the calm decision surface); Pulse stays a documented density variant rather than a live toggle.

- **Signal (default, calm):** the decision surface the prototype ships. The dashboard glance is collapsed, the KPI grid shows two cells, and the per-card pulse sparklines are hidden. Attention is spent only on what needs a human.
- **Pulse (stats-dense):** the same screen turned up for numbers, a documented variant. The glance auto-expands, the KPI grid widens to four cells with sparklines, and the pulse glyphs appear. Same tokens, same type families, more on screen.

Both run on the dark palette. The mode is a density switch, not a re-skin.

## 9. Voice and copy

- Plain English. No jargon, no product names as labels.
- Lead with the uncomfortable thing. Name what needs a human first.
- Ranges and plain confidence ("fairly sure", "about 4 minutes"), never invented precision.
- Honest restraint: the ledger and the review activity prove Leo chose not to interrupt, which is what earns a skeptical user's trust.

## 10. Accessibility

- Contrast at or above 4.5:1 for text against the dark canvas.
- Visible focus: a 2px periwinkle ring with offset.
- Touch targets at 44px.
- The active screen is detected by class (`.is-active` on the `.screen` section), never by computed opacity.
- Read-only rows are not announced as buttons; interactive rows are.
- `prefers-reduced-motion` is honored throughout.

## 11. Anti-slop checklist

Run before shipping any change:

- [ ] No all-caps labels. Sentence case everywhere; keep real proper nouns, money, and acronyms (CSV, VIP).
- [ ] No em-dashes or en-dashes anywhere. Hyphen, comma, colon only.
- [ ] No blurred shapes behind text. The atmospheric gradient is a smooth CSS canvas glow only, never behind body text.
- [ ] No colored side-stripes for state. State lives in the dot, the tint, or the word.
- [ ] No gradient text, no fake numeric precision.
- [ ] No slop words ("leverage", "robust", "seamless", "cutting-edge").
- [ ] Host Grotesk only on the display tier; the body stays Inter.
- [ ] Cards use the one raised-card recipe; warm is reserved for what needs a human.
- [ ] Every tappable thing is at least 44px and has a visible focus state.

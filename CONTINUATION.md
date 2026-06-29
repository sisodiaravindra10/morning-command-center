# Continuation brief — morning command center (Real take-home)

Internal working doc (not a deliverable). Hand-off so a fresh session/account can continue
without losing context. Deeper history lives in the Claude project memory; this is the
forward-looking state + the active redesign backlog.

## The project, in one breath
Round-2 take-home for **Lead AI Product Designer (IC)** at **Real / The Real Brokerage**.
A dark-premium **mobile "morning command center"** for a real-estate **Team Lead (Dana Reyes)**
fronting **Leo** (Real's AI) + its **100+ background AI agents**. Thesis: **triage, not a
dashboard** — surface the few things that need a human, prove the rest was handled; agents
propose, the human disposes; reversible + honest about its own confidence (plain words like
"leaning yes" / "fairly sure", never fake percentages).

NOTE on "agents": the brief uses the word two ways and the submission models both — the user
is a human team lead of ~6 **human** agents (the "My deals / My team" altitude), while **Leo
runs 100+ AI agents** underneath (the ledger, the per-card agent tags, the orchestration view).
This reading was verified against the PDF and is correct.

## Where the work lives
- **Lead artifact:** `submission/prototype/command-center.html` — one self-contained file
  (HTML + CSS + vanilla JS IIFE, no build step). This is what almost all requests touch.
- **Landing page:** `submission/index.html` (the showcase front door; has a faded cobe globe hero).
- **Docs:** `submission/docs/01..09` (01-07 = the 7 required deliverables; 08 figma spec, 09 design system) + `deck.html`.
- **Films:** `submission/films/` (3 rendered mp4s; node_modules is gitignored — if you re-render, delete `films/node_modules` before deploying, it's huge).
- **Design context for the impeccable skill:** `/Users/zop.dev/rav/Real/PRODUCT.md` + `DESIGN.md` (repo root, OUTSIDE the submission git repo).
- **Git:** `submission/` is the git repo, pushed to **github.com/sisodiaravindra10/morning-command-center** (private). Everything is committed + pushed.

## Design system (source of truth = the prototype `:root`)
- Canvas `--canvas #0A0B10`; surfaces `--p1 #15171F` / `--p2 #1C1E29` / `--p3 #22242F` / `--p4 #282B37`; hairline `--line rgba(174,194,246,.12)`.
- Ink `--ink #F1F3FA` / `--ink-muted #BCC1D2` / `--ink-subtle #828AA0`.
- Periwinkle accent `--signal #AEC2F6`, `--signal-hi #CBD6FB`, on-fill `--signal-ink #0B0C12`, `--signal-wash`, `--signal-line`.
- Warm sand `--danger #E7C79C` (urgent / needs you), `--warn #C9AC85`. `--good #9BB4E5` (currently too periwinkle-ish — see backlog #1).
- Fonts: `--serif` (Host Grotesk, display) · `--font` (Inter, body) · `--mono` (JetBrains Mono, labels). Radii `--r 8` / `--r-md 13` / `--r-lg 18`. Eases `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-snap`, `--ease-io`. Device 390x844.

## Hard rules (anti-slop, enforced)
No all-caps, no em/en dashes, no gradient text, no colored side-stripe borders, no glassmorphism
by default, no fake numeric precision, no hero-metric template, no identical card grids.
**Motion is CSS-keyframe-driven** (CSS animations DO render in the Claude preview; do not rely on
rAF/IntersectionObserver/scroll-JS for visible content; a single setTimeout for sequencing is fine).
Reduced-motion safe.

## How to run + verify
Use the Claude Preview MCP tools (NOT a browser). Start a static server over `submission/`:
`preview_start` with `python3 -m http.server 4480`, cwd `/Users/zop.dev/rav/Real/submission`.
Prototype at `http://localhost:4480/prototype/command-center.html`. Cache-bust reloads with a
`?cb=<n>` query (the inline CSS caches otherwise). The boot loader + onboarding cover the app for
~2s; to reach Today fast, eval: hide `#boot-loader` (display:none), `#onboarding` (.gone +
display:none), set `#scroll`.scrollTop=0. Smoothness/animation is a 60fps feel you can't fully see
in a screenshot — verify the CSS is right and trust it; the user re-tests live.

## Deploy situation (important, currently blocked)
This environment has **intermittent DNS failures to `api.vercel.com` (`getaddrinfo ENOTFOUND`)**,
so `vercel deploy` uploads but the CLI can't finalize — deployments stick at `UNKNOWN` and never
promote. The live `submission-nine.vercel.app` is a **stale alias** to a ~hours-old deployment.
It is NOT the code (local `vercel build` passes). **Reliable fix for the user:** import the GitHub
repo at vercel.com/new, or connect Git to the existing `team-11199/submission` project (Settings →
Git), so Vercel's own infra deploys the latest commit. Do not burn cycles retrying the CLI here.

## What this session already shipped (home + onboarding + boot)
- **Boot loader** (`#boot-loader`, before onboarding, ~2s): six flush opaque dark columns that
  recede upward (scaleY 1→0 from the top, staggered) so the onboarding behind is revealed through
  the now-transparent columns (a curtain lifting in a staircase), then fades. CSS-only, reduced-motion hidden.
- **Onboarding** (`#onboarding`): 3 image-led slides, sticky globe-less, stacked full-width
  buttons (Next/Skip), opened-up spacing, smooth photo parallax (the photo layer `.ob-bg` and the
  track now share `--ease-out` — earlier they were on different curves and felt laggy), eyebrows removed.
- **Today header:** "Good morning, Dana" one line (smaller); the trust ledger is now three equal
  mini KPI cards (`.lkpi`: handled / need you / corrected); pause/orch buttons are borderless.
- **Globe banner** (top of Today): faded cobe WebGL globe (CDN, `cobe@0.6.3`) with a static
  `.globe-fallback` that is now HIDDEN once the real globe loads (no grey circle) + a smooth radial
  glow; text trimmed to 3 lines.
- **Bottom nav** (`.tabbar`): minimizes in BOTH height and width at rest (centered icon-only pill,
  178px) and expands to full width (362px) + labels on hover/focus/tap; gliding `#tab-ind` re-seats
  via `syncNav()`. (Widths are fixed px, not calc(%), so the width transition interpolates.)

---

# ACTIVE REDESIGN BACKLOG (from 2026-06-30)

## PROGRESS (updated 2026-06-30 — latest commit `d4abfb8`, all pushed)

DONE + committed + verified in preview:
- **#1 periwinkle monotony fixed.** `--good` is now sage-teal `#8FBAA4` (was near-periwinkle), so every good/done/clear/healthy state differs from the AI accent. The trust KPI cards differentiate by meaning: handled=teal, need-you=warm-sand (tinted, pops), corrected=periwinkle. The "Needs you" chip (`.chip.needs`) is now warm sand.
- **#2/#3 readability + toggle.** The altitude toggle is Inter + heavier with clear active/inactive contrast (was thin mono).
- **#4 section label removed** ("Needs your judgment / 2 to clear · one at a time").
- **#5 focus card DECLUTTERED (the swipe-stack part is still TODO).** Bigger 17px headline as the focal point; Leo's confidence + recommendation is now a distinct periwinkle-washed "Leo's take" band (the `.conf` rule); better hierarchy.
- **#6 CTA standardized.** Every triage card is now `Approve` (primary) + `Details` (secondary), one verb across all (was a different CTA each). Approve currently runs the existing dispose+toast; rewire it to open the working drawer (below).
- **#8 guardrails line readable.** "Guardrails clear" title + Inter subtitle + teal dot (was a wrapping mono string).

STILL TO BUILD, in order:
1. **#7 the "Leo working" drawer (NEXT — the centerpiece).** On Approve, a bottom drawer slides up with Leo's steps as a live timeline (CSS-driven sequence, no rAF) + Stop/Undo, then disposes the card. Wiring notes: the Approve buttons have `data-dispose data-toast='{...}'`; the click handler at ~line 1432 currently does `toast()` + `disposeCard()` — rewire to `openWork(card, opts)`. `disposeCard()` is ~line 1407; restore (undo) = `card.style.display=''` + remove `.gone` + `layoutTriage()`. Add `data-work='{"title","steps":[...],"result"}'` per card for tailored steps; fall back to deriving title/result from `data-toast`. The scrim is `#scrim`; sheets use `#sheet-host`. Recommendation already chosen (A: working drawer + swipe, B's see-details as secondary — see below).
2. **#5b the swipe card stack** — triage as a Tinder 3-card stack (front active, two peeking behind at lower opacity/scale).
3. **#9 the dashboard glance** — fix-or-cut (currently broken/hidden; header KPIs may cover it).
4. **#10 review-activity** → a single "view past actions" button opening a history view.
5. **#11 the globe → region detail view.**

The original detailed brief for each item (unchanged) follows.

---

The user gave this as a batch with screenshots. Implement in the prototype, verify in preview.

## Systemic (whole app)
1. **Break the periwinkle monotony.** One light-blue is used decoratively everywhere, so every
   element/component reads the same — hard to differentiate. Fix with discipline + a touch more
   range: **color = meaning, never decoration.** Periwinkle (`--signal`) ONLY for AI / interactive /
   the recommended path. Warm sand (`--danger`) for needs-you / urgent — it is UNDERUSED; use it
   more so urgent items pop. Neutral inks for everything else (most text should NOT be periwinkle).
   Introduce a **distinct third functional tone for good / handled / done** (a calm green or teal —
   `--good` is currently periwinkle-ish #9BB4E5 and indistinguishable). Build hierarchy with
   WEIGHT + SIZE + SURFACE, not color. Cut the thin mono-label overuse (it adds to the sameness).
2. **Type readability.** The mono (JetBrains) labels are too thin/small to read. For interactive or
   important text use Inter at a readable size + weight (≥13px, 500-600) with clear contrast.
   Reserve mono for true machine micro-labels only.

## Today screen
3. **Altitude toggle** ("My deals · 2 / My team · 3"): text is unreadable (thin mono, dim inactive).
   Use Inter, heavier + larger, with clear active vs inactive contrast.
4. **Remove the section label** "Needs your judgment / 2 to clear · one at a time" above the focus card.
5. **Focus card → swipe card STACK (Tinder-style).** The card is too cluttered (everything stacked
   vertically, boring, low readability). Reposition elements strategically across the card space
   (don't stack linearly — e.g., chip/time top, stakes/value prominent, Leo's confidence +
   recommendation as a clear band, one action). Make it a **stack of 3 cards** — the front active,
   two behind at lower opacity/scale peeking out (communicates "the few to clear"). Swipe to triage.
6. **Standardize the CTA.** Different CTA per card (Send the nudge / Reassign / Review …) confuses.
   Use ONE consistent positive CTA verb across cards (e.g., "Approve" or "Do it") meaning "execute
   Leo's recommendation"; describe the specific action in the card body. One consistent secondary too.
7. **Positive action → "Leo working" bottom DRAWER (the centerpiece, see recommendation below).**
   On approve, a drawer slides up showing Leo executing as a **timeline** — each step connects to the
   next (e.g., "Drafting the nudge in your voice → Sending → Watching for a reply"), live status, so
   it feels genuinely AI and working. The user can STOP anytime and UNDO later (the 8s undo-ring idea).
8. **Guardrails line** ("Guardrails: all clear / security · fair-housing · sync · handoff"):
   non-understandable (wrapping mono). Make it a clear readable status — a single line or the four
   checks as small tags, not a wrapping mono string.
9. **Dashboard glance** ("$14.2M pipeline · 22 live · on track" expandable, with the live-pipeline /
   need-you / AI-saved / day-rail cards): currently hidden / cut-off (broken horizontal scroll) and
   possibly redundant now that the header KPI cards carry the key counts. Decide: simplify hard OR
   remove the inline glance and move pipeline detail into a dedicated view (the globe→region view, or
   a pull-up). At minimum it's broken and must be fixed or cut.
10. **Review-activity log** ("Review activity / 47 handled overnight · 8.5h saved" expandable, with the
    "why" rows): not great + hidden. Replace with a single, strategically-placed **"View past actions"**
    button (minimal) that opens a **history page/view**.

## Bigger feature queued (asked earlier, not yet built)
- **Globe → region detail view:** clicking the globe on Today fades the other components, the globe
  animates to center, and region-by-region detail (what's happening per region) appears beneath it,
  with an exit back to Today. (Region data already exists in the Team altitude "By region" rollup:
  North Hills / Westlake / Downtown.)

---

# THE ACTION-FLOW DECISION — recommendation (user asked which is better)

The user proposed two ways to act on a triage card:
- **A:** swipe stack (Tinder) + a positive action opens the "Leo working" timeline drawer (stop/undo).
- **B:** a "See details" button opens a drawer with more info, and approve/skip there triggers the AI action.

**Recommendation: build A's working drawer as the centerpiece; fold B's "see details" in as a
secondary, optional path — not either/or.** Reasoning:
- The **"Leo working" drawer (timeline + live status + stop/undo) is the single best idea here** — it
  is the trust + genuinely-AI moment and maps straight onto the thesis (shown reasoning, reversible,
  accountable). It should anchor every positive action regardless of how it's triggered.
- The **swipe stack is the right triage mechanic** (fast, tactile, the peeking cards say "few to clear"). Keep it.
- "See details" should be **optional, not a mandatory gate** (an extra tap per item slows a calm
  triage). Make it a tap-to-expand for context when wanted; otherwise approve directly. So B becomes a
  complement, not the primary flow.
- **Flow:** card stack → (optional tap = expand details) → Approve (one consistent CTA) → working
  drawer (Leo executes, timeline, stop/undo). Swipe to skip/defer.
- **Caveat:** pure swipe-to-approve on a $635K deal can feel flippant — mitigate by having the approve
  immediately open the working drawer (you watch it work + can stop within the undo window), so the
  swipe is reversible-by-design, not a blind commit.

So: **A primary (with the working drawer as the star), B's see-details as a secondary detail-on-demand.**
Not B alone.

---

# Git / state
- Latest work is committed + pushed to GitHub (sisodiaravindra10/morning-command-center, private).
- The prototype is the file to edit: `submission/prototype/command-center.html`.
- This redesign backlog is the next body of work; nothing in it is built yet.

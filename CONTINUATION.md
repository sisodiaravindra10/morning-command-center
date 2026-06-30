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
- NOW EMERALD (migrated off periwinkle). Two themes via `data-theme` on `<html>` (default `dark`).
- DARK: Canvas `--canvas #0A0B10`; surfaces `--p1 #15171F` / `--p2 #1C1E29` / `--p3 #22242F` / `--p4 #282B37`; hairline `--line rgba(21,192,122,.12)`. Ink `--ink #F1F3FA` / `--ink-muted #BCC1D2` / `--ink-subtle #828AA0`.
- Emerald accent `--signal #15C07A`, `--signal-hi #46DD9B`, on-fill `--signal-ink #0B0C12`, `--signal-wash`, `--signal-line`. Sage `--good #79B89C`. Warm sand `--danger #E7C79C` (urgent / needs you), `--warn #C9AC85`.
- LIGHT (`html[data-theme="light"]`, just below `:root`): `--canvas #EDF0EE`, `--p1 #FFFFFF`, ink `--ink #10201A`, `--signal #0E9E66` / `--signal-hi #0A7C50` / on-fill white, sand `--danger #B0700F`. Cards/tour/altitude/tabbar have explicit light overrides (they carried hardcoded dark backgrounds). Phone bezel + Dynamic Island + modal scrim stay dark on purpose. Toggle = `#theme-toggle` (sun/moon) in the top-right `.stage-controls`.
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

## PROGRESS (updated 2026-06-30, 6:15am auto-continue — latest commit `3736766`, all pushed)
> Shipped the **priority-1 trio** (latest commit `da8bef7`): light mode + top-right theme/tour toggles (#57), transparent status bar over full-bleed onboarding (#65).
> Then began the **Today-only pivot (#71)**, on a live "continue":
>   - Day/Team/Leads now carry a calm dashed "Exploration in progress" banner (`.wip-note`) at the top, so a recruiter clicking around knows only Today is finished.
>   - Landing hero rebuilt: the decorative cobe globe is gone; it is now a split hero (copy left, a **live phone mockup** right that iframes the prototype). Added an `embed` mode to the prototype (`?embed=1`): drops stage padding/bezel/top-right controls and skips boot+onboarding straight to Today, so the host page supplies one clean phone frame (`.hp-frame`>`.hp-screen`>iframe scaled .759). Removed the dead WebGL globe `<script>`. Verified desktop + mobile, no console errors. (#81 done.)
>   - Landing prototype card now states Today is the finished pitch and Day/Team/Leads are exploration (matches the in-app banners), mentions the Dynamic Island approve flow + light/dark.
> The landing's existing "How I got here" 4-beat section already tells the design-thinking journey well, so that part of #71 is covered.
>   - **Bennett pack humanized (#78):** card now "Bennett closing / paperwork prepped overnight"; drawer opens with a plain explainer; "pack" jargon swept to "paperwork" everywhere.
>   - **Docs as readable HTML pages (#72): DONE.** `build-docs.py` converts docs/01..09 + PROCESS.md into on-brand readable HTML (dark, emerald, 760px column, styled tables/code, prev/next nav). index.html relinked to `.html` (0 raw `.md` links). Generator is committed.
>   - **Design docs synced to emerald (#59): DONE.** periwinkle/old-hex purged across docs 03,05,06,07,08,09 (0 left); false "current accent glows" claims fixed; journey narrative intact. NOTE: doc 09 still describes the OLD component set (it doesn't yet document light mode, the Dynamic-Island *approve* flow, the phone-mockup embed, the WIP banners) — documenting those new components is the remaining nicety of #59.
> **Pivot remainder:** **re-record the films** — they still show the old periwinkle app and can't be re-rendered from this environment cleanly (the user, or a dedicated render setup, should redo them); the film posters on the landing are thus stale.
> **Still open:** globe region zoom (#73, hard), the deprioritized experiment-tab items (#74/#75/#79/#80), the /impeccable audit + assignment-coverage pass, the blocked Vercel deploy + films.
> Vercel deploy still blocked account-side (CLI builds return "Not authorized"); GitHub push is the reliable path. PREVIEW NOTE: the landing's `.rise` sections reveal via IntersectionObserver, which the Claude preview does NOT fire, so lower sections screenshot black; force them visible with `document.querySelectorAll('.rise').forEach(e=>{e.style.opacity=1;e.style.transform='none'})` before screenshotting.

DONE + committed + verified in preview:
- **#1 periwinkle monotony fixed.** `--good` is now sage-teal `#8FBAA4` (was near-periwinkle), so every good/done/clear/healthy state differs from the AI accent. The trust KPI cards differentiate by meaning: handled=teal, need-you=warm-sand (tinted, pops), corrected=periwinkle. The "Needs you" chip (`.chip.needs`) is now warm sand.
- **#2/#3 readability + toggle.** The altitude toggle is Inter + heavier with clear active/inactive contrast (was thin mono).
- **#4 section label removed** ("Needs your judgment / 2 to clear · one at a time").
- **#5 focus card DECLUTTERED.** Bigger 17px headline as the focal point; Leo's confidence + recommendation is now a distinct periwinkle-washed "Leo's take" band (the `.conf` rule); better hierarchy.
- **#5b the swipe card stack is BUILT + verified (NOT yet committed).** The triage is now a real stack: `layoutTriage()` assigns `focus` + `peek`/`peek1`/`peek2` + `stash` (was `focus`/`row`). CSS (after `.tcard.gone`): `.tcard.peek{position:absolute;top:0;height:100%;transform-origin:center top}` with peek1/peek2 receding UPWARD (`translateY(-10/-20px) scale(.955/.912)`, opacity .6/.34) so the peek is height-independent (a downward peek hid under the floating nav for tall cards). Peeks are pointer-events:none, their content visibility:hidden (blank card surfaces). The front card is swipeable: a pointer-drag IIFE after `promote()` flings it sideways past a 96px threshold to "set aside for later" (a toast with a real Undo that restores it via display:'' + layoutTriage), snaps back otherwise; horizontal-intent gated (`|dx|>|dy|*1.25`), `touch-action:pan-y` on `.tcard.focus` keeps vertical scroll native, reduced-motion (`rm`) disables the swipe. CRITICAL FIX needed earlier: every triage `<article>` carried an inline `style="position:relative"` that beat `.tcard.peek{position:absolute}` and kept peeks in flow (triage height = sum of cards); stripped via sed scoped to `data-card=` lines. Verified: stack geometry exact (peek1 10px up/8px inset/.6, peek2 20px up/16px inset/.34, zero added height), swipe defers + re-layouts + Undo restores (with `clearTimeout` so a fast Undo is not re-hidden by the 320ms hide-timer), no console errors. Shows 1 peek in calm (2 cards), 2 peeks in heavy.
- **#6 CTA standardized.** Every triage card is now `Approve` (primary) + `Details` (secondary), one verb across all (was a different CTA each). Approve currently runs the existing dispose+toast; rewire it to open the working drawer (below).
- **#8 guardrails line readable.** "Guardrails clear" title + Inter subtitle + teal dot (was a wrapping mono string).
- **#7 the "Leo working" drawer is BUILT + verified (NOT yet committed).** On Approve, `openWork(btn)` slides up `#workdrawer` (a `.sheet`) showing Leo executing as a live CSS timeline (`.wstep` waiting/active/done via a setTimeout chain, ~900ms per step, the dot goes periwinkle-pulse then teal-check), then `finishWork()` -> `closeWork()` + `disposeCard()` + a toast carrying a real Undo (`o.onUndo` restores the card via `restoreCard()`). Each triage Approve now carries `data-work='{"title","steps":[...]}'` (tailored steps); falls back to deriving from `data-toast`. Reduced-motion skips the drawer (toast + dispose). Wiring done: the dispose click handler (~line 1432) -> `openWork(dp)`; `sheetClose()` now calls `clearWork()`; `toast()` gained an `o.onUndo` hook; CSS `.workdrawer/.work-*/.wstep/.wdot` added after `.sheet.show`; HTML `#workdrawer` added after `#sheet-host`. Verified in preview: mounts, tailored title + steps, the timeline runs, disposes + Undo restores, Stop cancels, no console errors. (Not committed to git yet, the user has not asked.)

- **#9 the dashboard glance: CUT (verified, NOT yet committed).** Decision was fix-or-cut; cut won because every piece was redundant: the `.glance` collapsible (an inline "$14.2M pipeline · 22 live" deck with a `.hero`, a `.kpi-grid`, and a horizontal-scroll `.day-rail`) duplicated the globe banner (pipeline), the header `.lkpi` chips (need-you count), the dedicated Day screen (a much richer `.spine` timeline of the same schedule), the Team screen `.kpi-grid` (SLA), and Review activity (handled / hours saved). It was also the "broken horizontal scroll" item. Removed the HTML block (was ~line 989-1016) and all its JS: `const glance`, the `#glance-toggle` listener, the `syncGlance()` function, and its two call sites (the `#theme-seg` handler + init). Verified: no console errors, Today now flows triage -> guardrails -> FYI -> Review activity with no gap, the `8.5h saved` trust signal survives in Review activity. (Note: `#theme-seg` mode toggle UI is not currently rendered, so the two-theme item from the 8-point list is still unbuilt if the user wants it.)

- **#10 review-activity -> "view past actions" + history sheet (verified, NOT yet committed).** The `#handled` expandable on Today is replaced by a single minimal `.pastbtn` (a resting-row matching the FYI/allclear style: green tick + "47 handled overnight · 8.5h saved" + a mono "view past actions" affordance) wired with `data-sheet="history"`. A new `history` entry in the `SHEETS` object renders a proper audit log: a 3-stat summary (`.hist-sum`: 47 handled / 8.5h saved / 3 held for you) + a scrollable `.hist` list of 9 overnight actions, each naming the agent and the standing rule that authorized it (reinforces the accountability thesis), + an "and 38 more" footer. New CSS `.pastbtn` + `.hist*` added after `.handled-list`. Removed the dead `#handled` JS (toggle + provenance click). Verified: button renders, sheet builds + opens + scrolls + closes via the standard ✕/scrim, no console errors, zero em-dashes.

- **#11 the globe to a region detail view (verified, NOT yet committed).** The globe banner (`#globe-banner`) is now clickable (cursor + a periwinkle "explore the map ->" affordance under the pipeline line) and opens `#regionview`, a full-device overlay (sibling of `#sheet-host`, `position:absolute;inset:0;z-index:70`) that fades in over Today. Inside: a centered globe (reuses `.globe-fallback` as `.rv-fb`, 6 metro dots with the North Hills one sand-colored for risk) that scale-animates in (`@keyframes rvGlobeIn`, only under `.regionview.show` so it replays on each open), then `$14.2M` + "22 live deals across 6 metros · 3 need a look", then 6 metro rows (`.rv-region`) that stagger in and sum exactly to $14.2M / 22 deals: North Hills 7/$4.9M/1 risk, Westlake 5/$3.2M/2 watch, Hawthorne 2/$1.1M/1 watch, Downtown 4/$2.4M clear, Lakeside 3/$1.9M clear, Marsh Bay 1/$0.7M clear. Status color-coded (sand risk / warm watch / teal clear). Each row taps to a toast with detail. JS `openRegion()`/`closeRegion()` after the `#pause-btn` listener; the globe-banner click opens, `#rv-back` ("‹ Today") + Escape close. Reduced-motion disables the animations (globe still visible). Verified: opens, globe + rows animate, rows toast, back + Escape return to Today, no console errors, zero em-dashes.

ALL 8-POINT + REDESIGN BACKLOG ITEMS ARE NOW BUILT, plus the onboarding-image fix and the dead-CSS cleanup. The only thing left is committing.

- **Onboarding images FIXED (verified, NOT yet committed).** They were never broken in code; the prototype just depended on an `assets/` folder sitting next to the HTML, so the photos vanished if the file was opened standalone (file://), moved, or deployed without the folder. Fix: the three photos are now resized (`sips -Z 880 -s formatOptions 60`) and embedded inline as base64 data URIs (the `.ob-N .ob-bg::before` `background-image` rules now hold `data:image/jpeg;base64,...`), so the prototype is one self-contained file that renders everywhere. HTML grew ~163KB -> ~350KB. The `assets/` folder is kept as the source but is no longer required. README line updated to say "self-contained ... embedded inline." Scripts used live in the scratchpad (`embed_onboard.py`). Verified all 3 slides render from data URIs, no console errors.
- **Dead CSS cleaned (verified, NOT yet committed).** The #9 and #10 cuts orphaned `.glance*`, `.deck`, `.hero*`, `.day-rail`, `.drc*`, `.handled*` (all confirmed 0 elements). Removed 50 dead lines + trimmed 10 shared selector lists (dropping the dead token, keeping live ones like `.allclear`, `.fyi`, `.kpi`, `.region-rollup`, `.tcard`, `.lead`, `.cover-chip`). Done via an assert-guarded literal-replace script (`clean_dead_css.py` in scratchpad). `.kpi-grid`/`.kpi`/`.region-rollup`/`.rrow` were preserved (still used on the Team screen). Verified: zero dead-token CSS refs remain, Today + Team still render correctly, `.fyi` keeps its border-top, no console errors.

NEW UX-POLISH BATCH (user request, multi-item). DONE + verified (NOT committed):
- **Safe-area discipline.** `.island` (the notch) z-index raised to 120 so it shows above every overlay. `#onboarding` and `.regionview` changed from `inset:0` to `top:48px;left:0;right:0;bottom:0`, so they start below the status-bar zone (the real status bar + notch now stay visible above them; content falls under). Verified on onboarding + region.
- **Smoother onboarding fade.** `.ob-bg::after` gradient stretched (full canvas at 88% instead of 45%) + added `@keyframes obFade` (opacity 0->1, 1.4s) onto `.ob-bg::before` alongside obDrift, gated to no-preference. Photo now blends gently into the dark.
- **Report moved to the app bar.** `#orch-btn` (orchestration funnel) replaced by `#report-btn` (download icon, `data-report`); removed its `go('orch')` listener; `runReport()` now handles icon buttons (toast, no innerHTML swap) and the old all-caps "PREPARING…" is now "Preparing…". Orch screen still reachable via the tour. In-Team report buttons left as-is.
- **Bennett + handled -> two side-by-side cards.** New `.duo` 2-col grid with `.duo-card`s (icon + title + sub): "Bennett pack ready" (doc glyph, teal, -> khanna sheet) and "47 handled overnight" (moon glyph, periwinkle, -> history sheet). Replaced the old `.fyi` + `.pastbtn` rows (those classes are now dead CSS, clean later).
- **Focus card corner stat.** The My-deals focus card (mehta/Crestview) now shows `$635K / 4 days quiet` (`.tval`) in the top-right; the 06:14 timestamp moved into the agent-tag line; `$635K · ` removed from the body. Rebalances the left-stacked data.
- **Guardrails made understandable.** `.allclear` now `data-sheet="guardrails"` (was a toast) with clearer copy ("4 safety checks watching, nothing tripped" + a "what runs here" affordance). New `guardrails` SHEET explains the four checks (security / fair-housing / source-of-truth / handoff), what each watches, their recent action, and that all are logged. This is the responsible-AI / silent-safe state the brief asks for.

COLOR + LAYOUT BATCH (user request). DONE + verified (NOT committed):
- **Accent recolored to vivid emerald** (user picked it over cobalt/amber). `--signal #15C07A`, `--signal-hi #46DD9B` (bright mint), `--signal-ink` kept dark for contrast on the bright fill; `--good` (done/handled) shifted from sage `#8FBAA4` to cyan-teal `#3FB1CE` so the two greens stay distinct. Did it via `recolor.py` (scratchpad): global literal swap of 42 periwinkle `174,194,246` rgba -> `21,192,122`, 2 sage `143,186,164` -> `63,177,206`, plus the hex tokens. cobe globe config recolored (markerColor/baseColor/glowColor to emerald). This directly addresses the "faded" complaint, the Approve button etc. now read bold.
- **Page strip removed** (`<header class="stage-top">` "Real · morning command center" above the phone, deleted).
- **Header dropped 10px** off the status bar (`.appbar` padding-top 4px -> 14px).
- **Status bar centered to the notch + transparent** (`.statusbar` align-items flex-end -> center, removed bottom padding, explicit `background:transparent`).
- **Globe no longer cut** (`.globe-stage` re-sized/re-positioned to `top:47%;right:14px;width/height:158px` so the full circle shows in the banner's top-right instead of a clipped band).
- **Gap above the card stack** (`.triage{margin-top:16px}`) so the top-peek shows below the altitude toggle.
- **Team label removed** ("Your team needs you / patterns, not 60 cards").

TEAM CLUSTER (user "enhance the my team tab" batch). DONE + verified (NOT committed):
- **#56 Team avatars = real-people photos.** Curl'd 6 gender-matched randomuser portraits + Dana, `sips -Z 76`, embedded as data-URI CSS classes `.pic.av-<name>` / `.hpic.av-elena` / `.avatar.av-dana` (background cover, letter hidden via color:transparent). Applied by initial (M->marcus etc.) across the altblock pulse, the Team-screen rows, and the roundrobin split-rows. Scripts in scratchpad (`avatars.py`).
- **#52 Nudge drawer.** New `nudge` SHEET (3 presets: "Offer to cover" [leans-here tag], "Ask for an ETA", "Check in" + "Write my own instead"), reuses `.opt`/`.opt-card`/`.takeover`. The "Nudge Marcus" button (and the teammate sheets' Nudge action) -> `data-sheet="nudge"`.
- **#53 Team pulse interactive.** Built data-driven teammate sheets from a `TEAM` array (loop merges `SHEETS['tm-'+k]` for marcus/sofia/jenna/priya/elena/diego). All 9 agent rows (altblock pulse + Team screen) repointed from `data-toast` (or nothing) to `data-sheet="tm-<k>"` -> a teammate detail sheet (status + line + "Open pipeline" + Nudge/coach). `pulse_rows.py` did the repoints.
- **#55 Type hierarchy unified.** `.tcard h3` set to match `.card h3` (15px / -.01em / 1.32) and a `.tcard .ctx` rule added (12.5px / ink-muted / 1.5) so deal cards and team cards share one heading+body scale.
- Also: **`sheetOpen` now closes any prior sheet** before opening (clean swap, so teammate -> nudge works without stacking).

GLOBE + FLAT + POLISH BATCH. DONE + verified (NOT committed):
- **Globe fixed (#60).** Reverted `.globe-stage` to the original ambient position (top:48%, right:-82px, 288px), set opacity .8, removed the `.banner-fade` element (that was the "black rectangle" overlaying the globe). The globe is now WHITE: `.globe-fallback` glow/borders/dots all white (was emerald), cobe config markerColor `[0.95,0.97,1.0]` + glowColor `[0.55,0.58,0.66]` (very light white). All via `globe_flat.py`.
- **Flat colors (#61).** Dropped accent gradients on the prominent surfaces: `.btn-amber` (Approve), `.btn-amber:hover`, `.avatar`, `.ob-next`, and the focus-card sev backgrounds (`.tcard.focus[data-sev]`, `.card.alert`) now flat (`var(--p2)` + colored border). Reads more premium.
- **Agents badge breathes (#62).** `.iconbtn .bdg` (the "14") has a `bdgLive` pulse-ring animation (RM-gated) signalling live overnight work.
- **Teammate drawer restructured (#63).** Replaced the prose `.paper` block with a structured `.tm-rows` key-value table (Status + color dot / Open deals / Right now). Driven by `tone` + `short` fields added to the `TEAM` array.
- **Empty-state copy (#64).** `#triage-empty` element ("Clear. The morning is yours." + a calm sub) shows when the triage has 0 cards; `layoutTriage` toggles it via `_te.hidden=cards.length>0`.

GREEN + POLISH BATCH. DONE + verified (NOT committed):
- **Green is the single primary (#66).** The cyan-teal "good/done" color (the "blue" the user saw) moved to a sage green `--good:#79B89C` (rgba 121,184,156). Emerald `--signal` stays the vivid primary; the two greens differ by saturation. No prominent blue left.
- **Checkmark alignment (#67).** `.wdot` is now `display:grid;place-items:center` and the `.wstep.done .wdot::after` check is centered via translate, not absolute left/top. Centered in the circle now.
- **Download = details popup (#68).** New `report` SHEET (Period / Includes / Format via `.tm-rows`, + Download PDF / Email weekly). The app-bar report button and the two in-screen ones now `data-sheet="report"` (was `data-report`->runReport toast). runReport is now dead but harmless.
- **Per-agent corner motifs (#69).** A faint geometric SVG anchored top-right of each card (`.cmotif`, opacity .16, emerald, behind content): waves (deal-risk), bubbles (comms), shield (security), balance (fair-housing), venn (reconciler), interlink (handoff), clock (SLA), dot-ring (round-robin), spark (coaching). `motifs.py` injected them; `.cmotif~content` lifted via z-index.
- **Index check (#70).** submission/index.html is content-complete: all 7 required docs + prototype + Figma spec + design system + deck + explorations + films + build journal, all links resolve. BUT it is still the OLD periwinkle style (clashes with the emerald prototype). Restyling it = the GATED landing-page item (do at the very end, ask the user first).
- **Bug fixed:** the empty-state was wrongly showing under the focus card because `layoutTriage` runs at init while Today is hidden (offsetParent->0). The empty toggle now counts non-disposed, morning-aware cards independent of visibility.

AI-SLOP PREMIUM PASS (researched: glows/decorative-shapes/wide-tracked-mono labels are the top tells). DONE + verified (NOT committed):
- Removed all 9 per-agent corner motifs (`.cmotif`) + their CSS (reverses #69, user asked to remove).
- Removed colored glow effects (`deslop.py`): avatar glow, dot halo rings (ac-dot, sevdot, isl-dot, rv-dot), bd-pdot glow, the active-tab `drop-shadow`, the ob-logo orb radial+glow -> flat. Kept the subtle alive pulses (badge, Leo dot). More premium/flat.
- Section headings (`.section-label`: Team pulse, By region, Your day, etc.) changed from tiny wide-tracked mono to readable Inter 13px/600 ink. The `.mini` secondary is sans too.
- Chips/agent-tag/bd-leo/lkpi-sublabel: reduced the wide letter-spacing (.1em -> ~.02em) + bumped sizes. Far more readable.
- Guardrails sheet: the 4 generic checks are now meaningful icons (shield = security, house = fair-housing, sync = source-of-truth, person+arrow = handoff).

REPRIORITIZATION (important): the user pivoted to pitch ONLY the Today tab; other tabs are labeled "in progress." So fully-building Team/Leads/Pause (#74/#75/#79/#80) is now LOWER priority (those tabs are "experiments"). Priority is: Today-tab polish + light mode + the pitch materials (landing design-journey, phone mockup, docs-as-readable-pages, videos). The globe (#73) is on Today so still relevant.

STILL TO DO (the heavier remaining asks):
- **#65 Status bar transparent in onboarding: DONE + verified (committed this session).** Did the LESS invasive version (no DOM move): `.statusbar` became `position:absolute;top:0;z-index:110;pointer-events:none` (kept inside `.app`; `.app` is `position:absolute` with z-index:auto so it is NOT a stacking context, so the statusbar z-110 correctly paints above onboarding z-90). `.app` got `padding-top:48px` so in-flow content still starts at 48px. `#onboarding` went `top:48px`->`top:0` (photo now full-bleed behind the floating bar). Left `.regionview` at `top:48px` + `.rv-back` at `top:14px` (already correct given the 48px). Verified: app (today) unchanged, onboarding photos full-bleed with legible white glyphs on both the grey-metal (step 0) and blue-sky (step 2) photos. This completes the user's priority-1 trio (light mode + transparent status bar + top-right toggles).
- **#57 Light mode + toggle/tour top-right: DONE + verified (committed this session).** `html[data-theme="light"]` token block sits right below `:root` (emerald-on-white). The top-right `.stage-controls` (position:fixed) holds `#theme-toggle` (sun in dark / moon in light, swaps `root.dataset.theme`) + the `#tour-start` "Tour" pill (kept the id so the existing tour JS still binds; the old big "Take the tour" CTA was replaced). Light overrides cover the hardcoded-dark surfaces: `.tcard/.card/.lead-banner/.legend`, `.tour-cta/.tour-card`, `.altitude`, `.tabbar`. Verified in preview both themes, no contrast leaks. MINOR open: on a real ~390px phone the fixed top-right controls overlap the phone's top corner (fine on the wide showcase stage); revisit if the user views the prototype direct on mobile. The dead `#theme-seg` (signal/pulse) listener was repurposed into the theme-toggle handler.
- **#58 Approve -> Dynamic Island flow: DONE + verified (NOT committed).** `openWork(btn)` rewritten: on Approve the island goes to `.island.work` (a 330x46 pill: Leo dot + cycling step text + a `#isl-stop` "Stop"), runs the steps (~1s each), then `.island.done` (shrinks to a 34px ring + spinning `.isl-spin`), then `.island.checked` (a `.isl-tick` checkmark), then `islandReset()` collapses to the notch + `disposeCard` + an Undo toast (`restoreCard`). Stop cancels mid-work, keeps the card, toasts "Stopped." Guards: islStop stopPropagation + island click ignores work/done/checked. The old `#workdrawer` HTML/CSS + `finishWork`/`closeWork` are now dead (harmless; clean later). Reduced-motion path: toast+dispose, no island. ALSO fixed **#76**: `.triage-empty{display:flex}` was overriding the `[hidden]` attr so the empty state always showed; added `.triage-empty[hidden]{display:none}`. Now it only appears when all deals are gone. Both verified, no console errors.
- **#48 Shared globe transition (HARD)**: clicking the globe must animate the EXACT banner globe to center (FLIP / reparent the `.globe-stage` node), not show a separate `.rv-fb`. Currently the region view builds its own rings+dots globe.
- **#59 Design-doc sync** (docs/09-design-system.md still says "periwinkle" everywhere): do ONE comprehensive pass after light mode lands, emerald + cyan + light theme + new components. Standing user instruction to keep docs current.
- **GATED (do only when the user says yes): a scannable QR code** that mirrors the prototype on a phone "as an app."
- Then a final dead-CSS sweep (`.fyi`, `.pastbtn`, plus earlier ones) + decide on committing the whole accumulated batch to git.

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

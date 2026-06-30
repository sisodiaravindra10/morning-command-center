# How I built this, end to end

This is the build journal: the order things actually happened in, the decisions that turned the work, and the dead ends I kept because they earned their place. [Doc 06](docs/06-design-rationale-and-dead-ends.md) holds the design rationale and what got cut; [doc 07](docs/07-ai-tool-annotation.md) is the honest account of where AI helped. This is the chronology that connects them, and it carries through the most recent craft pass that those two snapshots predate.

One person runs through all of it: Dana Reyes, a real-estate team lead who closes her own deals and carries a six-agent team at the same time, fronting Real's AI, Leo, and the 100-plus skills working behind him. Every decision below was judged by one question: does it help Dana decide the few things that need her this morning and then put the phone down, or does it just add a feature?

## The short version

I read the brief as a triage problem, not a dashboard problem, and committed to that early. Then I searched wide on purpose: many visual lanes, several interaction models, a stack of feature demos, every one scored against one anti-slop checklist before any taste was applied. A detour through warm editorial light taught the real lesson, that the slop is reaching for the category default and not the color itself, and I brought the work back to a dark done with discipline. The deliverable is one self-contained prototype that carries the five AI states with real motion and real state, plus the seven required write-ups. The most recent stretch is a screen-by-screen craft pass on that prototype, which is still in progress, and this journal stays honest about what is done and what is not.

## Phase 1: reading the brief, and the thesis

The brief asks for an AI-powered morning command center for a team lead who fronts Leo and a fleet of background skills, and it weights microinteractions, AI behavior, and orchestration the heaviest. The first real decision was a reframe: a lead like Dana is not short on information, she is drowning in it. So the product is a triage of exceptions, not a dashboard. It surfaces the few things quietly leaking that need a human, ranks her own deals and her team's deals in one list by what is at stake, and lets Leo handle the rest and say so. That thesis, triage not dashboard, is the spine everything else hangs from.

The pieces locked here and held all the way through: a unified signal currency across both altitudes, categorical confidence and never a fake percentage, review before send on anything that goes out as Dana, and five honest AI states, thinking, confident, uncertain, silent, and wrong, with the wrong state treated as a first-class recoverable path rather than an afterthought.

## Phase 2: grounding it in research

Before designing the screen I ran a cited research pass on the real domain, so decisions would be load-bearing rather than decorative. Leo is Real's actual assistant layer, and the fleet scales into the hundreds of agents. The speed-to-lead multiplier, that a reply in the first few minutes is worth many times one an hour later, is why a stalled hot lead drives the team SLA-breach card and the round-robin routing rather than living as a vanity metric. The cry-wolf finding, that a flood of false alerts trains people to ignore the real one, is why the trust ledger and the FYI digest exist at all. The soft vendor numbers were kept in the supporting case but never allowed to carry a design decision on their own. The dossier lives in the research notes; the facts that survived are the ones the screen actually rests on.

## Phase 3: searching wide, on purpose

This is where most of the volume is, and most of it was never meant to ship. I generated many distinct visual lanes (an editorial-minimal direction, a light color-as-confidence direction, a bold headline-type direction, and more) and audited each against a hard set of anti-slop bans before any human taste was applied: no dark mesh, no neon glow, no three identical feature cards, no purple-to-blue AI gradient, no fake big-number hero, no decorative motion, no em-dashes. I built several distinct interaction models so the feel was tested and not just the look: a guided one-at-a-time calm sequence, a swipe deck, and a scroll-snap story. And I built a library of more than twenty standalone feature demos to find which agentic moments were genuinely worth keeping.

Two technical disciplines were set here and never broke. Motion is CSS-keyframe driven, not JavaScript-frame driven, because a frame loop does not run in the preview these were built in and would have hidden the content; everything is reduced-motion safe. And the copy register banned the buzzword family on sight. The point of the wide search was not the buffet. It was to find out which moves were genuinely mine and which were the reflex one tier down, then to kill the rest. The whole search now lives as a clearly secondary process appendix, framed as the journey and not the destination.

## Phase 4: the warm-light detour

A product manager's feedback was blunt: dark reads as AI slop. So I took the honest opposite all the way and built a complete warm editorial light system, low density, color only ever meaning a state, every hairline exposed with no atmosphere to hide behind. That detour did its job. It forced the craft into the open and proved the surface could carry itself with no glow doing the work. It also surfaced the real lesson, which outlived the detour: the slop was never the color. It was reaching for the category default instead of making a choice.

## Phase 5: converging on a disciplined dark

With that lesson in hand I brought the work back to dark, but earned rather than defaulted: a chosen emerald-on-near-black palette instead of a generic glow, no glow at all, a warm sand reserved strictly for the things that need a human, and later a distinct a sage green for what is good and handled so the palette differentiates by meaning. Every hairline, gradient, and type weight has to justify itself because the glow that normally hides flaws is banned. Done this way the screen feels like a quiet, expensive instrument you open before dawn, which is the mood a morning command center wants. This is the call the whole surface rests on, and it is documented as the headline dead end in doc 06 precisely because the failure is worth diagnosing, not just reversing.

## Phase 6: building the prototype

The prototype is one self-contained file at a 390 by 844 device size, and it earned that effort because a morning triage product is timing and state, not pixels sitting still. You have to build it to feel whether the calm holds while the screen is doing work: the command center assembling at open, the trust ledger resolving to "47 handled overnight, 2 need you, 1 corrected," the triage ordering itself by severity, a confidence chip softening from calm to caution, an AI-state dot moving from thinking to confident, an undo bar counting down in real time.

The triage set is concrete and on-brand: a security anomaly, a Fair-Housing tripwire, a source-of-truth reconciler across MLS and CRM and the transaction system, handoff coverage on a heavy morning, the team SLA breach with round-robin routing, the voice-required outbox holding Leo's drafted counter on 142 Oak St (a fair counter is $605K to $618K, with $612K as the pick, against a $625K listing and a $590K offer, plus the things it could not verify), agent coaching, a closing pack, and the Crestview deal-risk nudge. An orchestration view shows how Leo's hundred-plus skills collapse into the four things that reached Dana, which is the orchestration story the rubric asks for, made visible.

## Phase 7: making it Real, and keeping the docs honest

An earlier reskin had left the prototype carrying placeholder names and another market's content while the docs still described Dana and Real. I reconciled the whole submission to one coherent Dana, Real, Leo, US-dollar system, reskinning content only and leaving the visual language intact, then reframed the written deliverables so the named flows and screens in the docs match what the prototype actually ships. I also reconciled the design-system doc against the prototype as the source of truth when the two had drifted on token names and a few values. The standard I held: the docs describe the thing that exists, not an earlier idea of it.

## Phase 8: the craft pass, screen by screen (most recent, in progress)

The current stretch is a senior craft pass on the prototype, taken screen by screen. Done and verified so far: a two-second boot loader built as a curtain-lift reveal rather than a spinner; an image-led three-step onboarding with smooth photo parallax; a Today header that resolves the greeting to one line and turns the trust ledger into three small KPI cards that read by meaning; a featured cobe globe banner the triage scrolls up over; and a bottom navigation that rests as a compact icon-only pill and expands to labels on interaction.

Then a deliberate fix to a real weakness, that the single emerald accent had spread until everything looked the same: I made color mean something again, a sage green for good and handled, warm sand for what needs Dana, emerald reserved for Leo and interaction, hierarchy carried by weight and size and surface rather than hue. On the back of that I decluttered the focus card to lead with one headline and a distinct band for Leo's read, and standardized every triage card onto one pair of actions, Approve and Details, so the verb never changes under Dana.

Since then the centerpiece shipped: approving a card now runs Leo's steps live in the Dynamic Island, with a Stop mid-run and an 8-second Undo after, so a positive action feels like genuine machine work and stays reversible. The globe opens into a region-by-region detail view, the My-team altitude stacks like the deals triage with every teammate one tap from their pipeline, and the app gained a full light theme alongside the dark. A swipe card stack for triage is the one exploration still on the bench.

## How I used AI to build it

The build ran on the same shape the product sells. The product argues for an orchestrator that fans work out to many workers and keeps a human on the irreversible calls; the process ran the same way, with parallel agents exploring directions at once, a fixed rule set scoring every result against the anti-slop checklist before any taste was applied, and single-point human judgment to narrow. AI was fast at the first eighty percent, the layout, the tokens, the keyframes, the event wiring, and that speed is what freed the hours for the twenty percent that decides whether this reads as a considered product or a tech demo. The judgment was in the overrides: generic dark to a disciplined dark, a fake percentage to an honest range, a generic spinner to a named wait, a happy-path animation to real reset-and-recover logic, and slop copy to plain English. Doc 07 holds each override in full. Model proposes, human disposes, which is the same deal the command center offers Dana.

## Where it stands

The lead prototype and the seven required write-ups are complete and coherent, the films are rendered, and the process appendix preserves the search. The craft pass has since landed: the Dynamic Island Approve flow, the light theme, the region-zoom map, the stacked team with teammate pipelines, and the lead routing are all built and verified; a swipe card stack is the one thing still on the bench. Deployment is the one step that is environment-blocked rather than design-blocked, and it is handed off as such. Everything is committed to one repository so the state survives.

## If I had an extra week

The single highest-value thing is still un-fakeable: put it in front of a real team lead and tune the interrupt threshold, the line between what reaches Dana and what Leo handles silently, so the ledger is calibrated on real behavior rather than hand-set. After that, wire the responsible-AI behavior onto one shared event log so Leo can audit itself, and build the desktop war room the mobile deliberately defers, to prove the altitude handoff from phone to wide screen with no context reload. Doc 06 carries the longer version.

## A map of what is here

- The lead prototype: [prototype/command-center.html](prototype/command-center.html)
- The showcase front door: [index.html](index.html)
- The seven required deliverables and two supporting docs: [the write-ups, starting at doc 01](docs/01-scope.html)
- The design rationale and dead ends: [doc 06](docs/06-design-rationale-and-dead-ends.md)
- The honest AI-tool account: [doc 07](docs/07-ai-tool-annotation.md)
- The full search, framed as process: [explorations/index.html](explorations/index.html)
- The films: [the films, on the showcase](index.html#films)

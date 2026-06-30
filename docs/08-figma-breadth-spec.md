# Figma breadth spec

The prototype (prototype/command-center.html) is the source of truth. It holds the real timing, the real reduced-motion behavior, the real accessibility wiring, and the exact look. The Figma file is the one piece left to assemble by hand, and this is the sheet to build it from: every frame, the component library, and the design tokens, laid out flat so the visual system can be put together without running the HTML. Where Figma and the prototype ever disagree, the prototype wins and Figma is the thing to fix.

Figma's job here is breadth. The prototype shows how one path feels in motion. Figma shows the whole product at once: every screen, every AI state, and every component variant on a single page, so a reviewer can read the morning command center as one system and an engineer or another designer can pick up any screen cold.

A note on the live prototype. It is phone-only: just the mockup, a small "Real, morning command center" wordmark above it, and a theme toggle plus a "Tour" button in the top-right. A guided tour does the walking through, a spotlight ring plus a step card that steps through the product one beat at a time and drives the app into each state as it explains it. Any earlier presenter scaffolding (theme and density toggles, demo buttons, a jump-to-screen nav) was a build aid for stepping through states by hand, not part of the product, and the guided tour replaces it. The frames below still cover the heavy morning and both density modes, because Figma's job is to show the full system at once even where the live prototype reveals a state through the tour rather than a toggle.

A note on theme. The genre default for an AI product is a generic dark canvas with glow, and that reads as slop. The system answers it not with light but with a disciplined dark: a chosen emerald-on-near-black palette, no glow, and a warm sand reserved for what needs a human. It ships in dark by default with a full light theme as well, both built from the same emerald token set (a `data-theme` override), flipped by a sun/moon toggle. Emerald means calm, handled, the AI, or interactive; warm sand means it needs you. Color always carries meaning, never decoration.

---

## 1. Token quick-reference

Pull these straight from the prototype's `:root`. Build them as Figma variables in a single collection named "dark", not as raw hex picked off a screenshot. The prototype uses hex and rgba for the dark system, so enter these verbatim. The five-color brand base everything derives from: black `#000000`, espresso `#43342A`, taupe `#75655C`, emerald `#0E9E66`, bright mint `#15C07A`.

### Surface (near-black, faint cool)
| Variable | Value | Use |
|---|---|---|
| `canvas` | `#0A0B10` | the near-black app background |
| `p1` | `#15171F` | the base surface, the resting card |
| `p2` | `#1C1E29` | the first raised step (insets, the range track, the message-bubble ground) |
| `p3` | `#22242F` | a further step up (avatars, picture chips, the toast ground) |
| `p4` | `#282B37` | the top surface step |
| `line` | `rgba(21,192,122,0.12)` | 1px emerald-tinted hairlines, never heavier |
| `line-soft` | `rgba(21,192,122,0.06)` | the faintest divider between dense rows |
| `paper` | `#15171F` | a legacy name for the read-band surface, equal to `p1`, not the background |

Surfaces step up through `p1` to `p4` rather than a single flat token; there is no `shadow` variable, the raised-card shadow is an effect style (below). Raised cards do not use flat `p1`. They use a top-lit gradient so they feel lifted off the canvas: `linear-gradient(178deg, #1C1E29 0%, #131420 100%)` plus a 1px highlight `inset 0 1px 0 rgba(255,255,255,0.05)` and a soft drop shadow `0 16px 36px -24px rgba(0,0,0,0.66)`. The one focus card lifts further (`0 24px 52px -22px rgba(0,0,0,0.74)`). Build these as reusable card styles. The page sits on a faint top-center emerald wash behind the phone, near-black fading darker at the edges. It is barely-there atmosphere, not a gradient effect.

### Ink (light, cool)
| Variable | Value | Use |
|---|---|---|
| `ink` | `#F1F3FA` | titles, primary text |
| `ink-muted` | `#BCC1D2` | body copy, secondary text |
| `ink-subtle` | `#828AA0` | mono meta, captions, idle nav, the silent state |

### The two poles (color always means something)
Emerald is calm: handled, confident, the AI, anything interactive. Warm sand is you: urgent, going quiet. Each is a small dot, a thin rule, or a tinted chip, never a full card fill.

| Variable | Value | Meaning |
|---|---|---|
| `signal` | `#15C07A` | confident, handled, the AI, the one primary action; a flat fill, never a glow |
| `signal-hi` | `#46DD9B` | the brighter emerald, for hover and text that lifts off a tint |
| `signal-ink` | `#0B0C12` | the dark text that sits on a emerald fill |
| `info` | `#15C07A` | the thinking and learn emerald (same hue as signal) |
| `good` | `#79B89C` | handled, healthy, the all-clear and the sent tick |
| `warn` | `#C9AC85` | uncertain, going quiet |
| `danger` | `#E7C79C` | urgent, a clock is on it (the brighter warm sand) |
| silent | use `ink-subtle` | nothing needs you, so no color |

There is no separate text variant: on dark the accents are already light enough to read as small text, and where text needs to lift further it uses `signal-hi #46DD9B`. Text on a emerald-filled element is `signal-ink #0B0C12`, not white.

Washes and lines (the only fills and borders the accents are allowed):
`signal-wash rgba(21,192,122,0.12)` with `signal-line rgba(21,192,122,0.32)`, `good-wash rgba(121,184,156,0.12)`, `danger-wash rgba(231,199,156,0.14)` with `danger-line rgba(231,199,156,0.42)`, `info-wash rgba(21,192,122,0.12)`.

The choice to use coarse color states instead of a number is deliberate. Categorical confidence reads clearest for a non-technical user, and a fake "87% urgent" is usually misread. The prototype carries Leo's confidence as words on screen, the "fairly sure" and "leaning yes" lines the agent speaks, and surfaces them as a small wave glyph next to Leo's read, never as a precision percentage on a chip. The five AI states are thinking (a calm breathing dot), confident (the review activity and the ledger), uncertain (the deal-risk nudge and the reconciler, which say "leaning yes" or "fairly sure", offer two options, and name what they could not check), wrong or corrected (the Fair-Housing save and the undo window, acknowledge-and-correct recovery), and silent (the ledger: "47 handled overnight, 1 corrected"). There is a dedicated AI-states screen that names all five in Leo's voice.

### Radii (squircle, held everywhere, no mixed systems)
`r 8` (chips, buttons, segmented controls, small controls), `r-md 13` (cards, the glance, deck blocks), `r-lg 18` (the hero and larger deck blocks), `r-paper 14` (the read band). Build each as a variable and bind it. Do not type radii by hand per layer. One intentional one-off radius sits outside this scale: the bottom-sheet corner (22). Leave that as a literal pixel value, not a bound token. The bottom nav is a floating, rounded liquid-glass capsule (30px radius, translucent with a heavy backdrop blur and a bright top edge) carrying a emerald glass pill that glides under the active tab.

### Type, the three voices
Set up three text-style families. Voice is load-bearing: it tells the reader who is speaking.

- Display, Host Grotesk (held in a legacy token literally named `--serif`; no actual serif loads). Leo's display voice and the greeting: the greeting, the read-band paper copy, and the drafted message Leo speaks in the voice outbox. This is the character of the product.
- Interface, sans, Inter. The lines Leo speaks on a card, body, labels, buttons, navigation, list titles, descriptions, sheet titles.
- Machine, mono, JetBrains Mono. Section labels, row metadata, counts, source traces, and the big pipeline numeral. Sentence case (never all-caps), around 8.5 to 11px for labels and meta, tracking +0.12em by default, the section labels a touch wider at +0.14em.

| Style name | Font | Size / line | Weight | Notes |
|---|---|---|---|---|
| `mono/pipeline-num` | JetBrains Mono | 31 / .95 | 600 | the pipeline numeral ($14.2M) in the glance hero, the biggest number in the app; -0.035em. The "100+" in orchestration is a small mono cap, not a display numeral |
| `display/greeting` | Host Grotesk | 25 / 1.05 | 600 | "Good morning, Dana."; -0.02em |
| `display/voice` | Host Grotesk | 13.5 to 15 / 1.45 to 1.5 | 400 to 500 | the read-band paper copy and the drafted line Leo speaks, "We can hold at $612K with a 30-day close." |
| `sans/sheet-title` | Inter | 18 / 1.25 | 600 | the title in a bottom-sheet head; -0.015em |
| `sans/card-title` | Inter | 15 / 1.32 | 600 | the line Leo speaks on a triage card, deal addresses; -0.01em |
| `sans/body` | Inter | 12.5 to 13 / 1.4 to 1.5 | 400 to 500 | descriptions, Leo's notes, the sheet lead line |
| `sans/label` | Inter | 13 | 600 | buttons |
| `mono/meta` | JetBrains Mono | 10 to 11 | 400 to 500 | the machine voice; sentence case, +0.12em |
| `mono/micro` | JetBrains Mono | 8.5 to 10 | 400 to 600 | why-lines, source traces, tags, chips |

---

## 2. The frames to build, in order

One device frame: 390 x 844, the canvas from the prototype. Corner radius 46 on the device shell, a Dynamic Island pinned top-center, and a status bar reading 6:52. The island is live, not decorative: draw both its states, the resting pill and the morphed notification capsule (the wider, taller, rounded form carrying a breathing emerald dot and a Leo line, e.g. "Leo, new lead at 88 Linden, pre-approved"), and bind them as a component variant. Lay the frames left to right on one page so the whole product reads as a row. One focus per frame is the rule: each screen states its single job in the first fold, then gives the rest to paper.

Spend the craft budget top-down. Today is the hero and gets the highest finish. Everything after it is built to be correct and on-system, not to out-shine Today. The frames below match the screens the prototype actually ships, in the order the morning runs: a three-step onboarding opens first (Frame 0), then the Today command center assembles itself, leads with the trust ledger, and surfaces the triage. There is no lock screen and no push-notification opening to build. The morning's first beat is the Dynamic Island morphing open to carry Leo's first notice right after onboarding, and the command center then coming together behind it.

### Frame 0, the onboarding (three slides)
The image-led opening that plays once before Today. Build it as three slide frames (or one frame with three slide states), each 390 x 844, in order:

1. Slide 1: a dark, swirling architectural photo filling the top portion and fading down into a clean dark text band. A small Leo logo lockup and a "Real · morning command center" eyebrow, then the Host Grotesk headline "A hundred agents, working through the night" with "night" in emerald, and a sub "Listing research, document prep, negotiation, scheduling. Leo runs them while you sleep." Progress dots (first active), a Skip, and a Next.
2. Slide 2: a light, faceted photo in the top zone. Eyebrow "by morning", headline "The noise, quietly sorted" with "sorted" in emerald, sub "The handled, the watched, and the few that need a human, separated before you wake." Dots (second active), Skip, Next.
3. Slide 3: an orange, angular photo in the top zone. Eyebrow "your morning", headline "You see only what needs you" with "you" in warm sand (`danger`), sub "One calm triage across your deals and your team, ranked by what is at stake." Dots (third active), Skip, and the Next button now reading "Get started".

The accent word is emerald on the first two slides and warm sand on the third; the photo always sits in the top zone and fades into the dark text zone so type is never over a busy image. Annotate the paging as a `translateX` slide driven by Next (section 5) and note that under reduced motion the onboarding is skipped and the app opens on Frame 1. The photos live at prototype/assets/onboard-1.jpg, onboard-2.jpg, onboard-3.jpg.

### Frame 1, Today, the command center, calm (the hero)
This is the front door and the whole argument, and the default calm morning. Build it to the highest craft. Top to bottom:

1. App bar. The greeting "Good morning, Dana" in `display/title-xl` with a mono sub "Sat 27 Jun", a pause-all glyph (the blast-radius control, badged 14), an orchestration glyph, and Dana's avatar. Human voice first, on purpose.
2. The trust ledger, stated before anything asks for attention: "47 handled overnight, 2 need you, 1 corrected", where "2 need you" is a emerald `signal-hi` button that scrolls to the triage. This is the quiet-by-default proof.
3. The globe banner, the calm visual header the morning opens on, filling roughly the top 40% under the appbar. On the right, a faded, slowly rotating dark world tinted to the emerald, emerald markers on the metros, the sphere bleeding off the right edge. On the left, Leo's live portfolio read: a "Leo, on watch overnight" label beside a breathing orb, the pipeline numeral "$14.2M" large, "pipeline, 22 live across 6 metros", a emerald ticker line ("North Hills warming, 3 new leads before dawn"), and "100+ agents active, as of 6:52am". This is the geographic, portfolio-wide view, distinct from the ledger's three-count tally above it. Draw the static globe state for Figma; annotate that in the prototype the live WebGL globe is a progressive enhancement layered over this static fallback and that the banner is pinned while the triage sheet scrolls over it (section 5).
4. The altitude toggle, a glass segmented control "My deals · 4" and "My team · 3" sitting just below the globe banner: a rounded pill with a translucent blurred ground and a emerald indicator pill that glides under the active segment (the active label reads over the pill, the other settles to a quieter ink). Altitude is a quiet badge here, not a separate destination.
5. The "Needs your judgment" section label (mono, sentence case) with a "one at a time" mini-note.
6. The calm triage: one focus card plus a collapsed queue, ordered by severity. On a calm morning two items need judgment, the deal-risk nudge (the Crestview deal has gone quiet four days, $635K Westlake, the wave glyph reading "leaning yes, a soft nudge helps", with "Send the nudge" and "Change") and the voice-required outbox (three messages drafted but needing Dana's actual voice, "Open outbox" and "Approve all"). The list is built to about three to five items, not to fill the screen.
7. The guardrails resting state, a calm all-clear button: a good-state dot, "Guardrails: all clear", and a mono sub "security · fair-housing · sync · handoff". This is the restraint made visible on a quiet morning.
8. The FYI, a no-action item: a good-state tick, "Bennett closing paperwork ready to sign, no action needed", routing to the closing-paperwork sheet. Resolved, not a decision.
9. The dashboard glance (collapsed by default, expands on tap): the head reads "$14.2M pipeline · 22 live · on track"; expanded it shows the pipeline hero numeral ($14.2M, up 8% week), a KPI grid (2 need you, 8.5h AI saved overnight, 94% SLA met, 1 at risk), and a day rail (now, the 9:00 Oak St call, the 11:00 Lakeside showing, the 16:00 Bennett close). The early-warning context built into the home, not a separate feature.
10. The "Review activity" section label, then the handled ledger: a `good` check tick, "47 handled overnight, 8.5h saved", a chevron that expands to four near-miss rows (fresh comps for 3 listings, 12 portal enquiries in SLA, 4 viewings booked, 6 documents chased) and "43 more, view full log". Each row carries a tappable "why" provenance stamp. Build both the collapsed and expanded states.

Above the triage, build the handoff cover chip as a labeled element: "Handoff: Sofia's out till Mon, I rerouted 9 deals, 2 need your call", opening the handoff sheet (Frame 3). It sits between the app bar and the altitude toggle.

Build a second copy of Today annotated with the morning-assembly stagger (section 5) so the order of arrival is legible without motion: number the layers 1 (greeting, ledger, and the globe banner), 2 (the triage), 3 (the guardrails and FYI), 4 (the glance), 5 (review activity). The order is the priority made physical.

### Frame 2, Today, the heavy morning
The same command center on a heavy morning. In the live prototype this busier state is revealed by the guided tour as one of its steps, surfacing the security and Fair-Housing cards; in Figma, build it as a variant of Frame 1 with the four exception-handler cards escalated into the triage above the calm two, each as a focus-or-row triage card with an agent tag and a severity dot:

1. Security anomaly (acted-then-uncertain, red dot): "I paused a 3 AM bulk export on Marcus's account and locked the session." 412 client records, an unrecognized device, "Was I right?" Actions "Keep it locked" and "Details", plus a teach line "It was actually Marcus, teach me". The safe reversible action came first, then the question; the false positive becomes a teach-loop, not a recurring nag.
2. Fair-Housing tripwire (wrong then save, red dot): "I almost sent an outreach line that reads as steering." Leo held the draft and rewrote it. Actions "Approve safe version" and "See change". The classifier verdict is the interaction; this is the responsible-AI centerpiece.
3. Source-of-truth reconciler (amber dot): "Three systems disagree on the Marsh deal's status." MLS pending, CRM active, dotloop has an unsigned addendum, the wave glyph reading "fairly sure dotloop is the truth". Actions "Trust dotloop, fix all 3" and "Review".
4. Handoff coverage (amber dot): "Sofia's out till Monday. I rerouted 9 deals, 2 need your call." The routine ones auto-covered, two are relationships. Action "Review the 2", opening the handoff sheet.

Annotate the layout note: on a heavy morning the most severe card becomes the focus card and the rest collapse to one-line rows, severity-ordered. Red is used at most twice (the anomaly and the Fair-Housing save), never as decoration.

### Frame 3, a focus-card sheet (the reconciler)
The detail sheet that the source-of-truth reconciler card opens, drawn as the pattern for all the triage sheets. A grabber, a sheet head with the agent meta "Reconciler agent · 06:08" and the title "Marsh deal, 3 systems disagree", and a body with the three-system stack: MLS (last touched 6 days ago, "Pending", stale), CRM Follow Up Boss (auto-set by a stage rule, "Active", stale), and dotloop (addendum uploaded 2h ago, unsigned, "Under contract", the trusted source). Below it, Leo's read, the wave glyph and "fairly sure dotloop is current, it's the freshest and a real document". Primary action "Trust dotloop, write back to all 3"; a quieter takeover "Let me decide each field". On accept, annotate the write-back shimmer across the three source logos (section 5). Build the reconciled resolved state as a variant. This frame doubles as the sheet template; the Crestview deal-risk sheet, the handoff sheet, the round-robin sheet, and the coaching sheet all reuse this head-plus-paper-plus-actions structure.

### Frame 4, the voice-required outbox
The sheet the outbox card opens. Job: review what needs Dana's actual voice before anything sends. A sheet head, agent meta "Comms agents · 06:31", title "Send as you, 3 held", and a lead line "Drafted, but each needs your voice. Nothing sends until you say so." Three message bubbles, each with a channel glyph, a recipient, a needs-your-voice reason tag, the drafted message, and per-item actions:

1. The counter-offer on 142 Oak St (high-stakes): "We hear you on the number. We can hold at $612K with a 30-day close, and we'd rather move fast with you than re-list." Actions "Send as me" and "Edit". This is the clearest review-before-send beat, the deal is listed $625K and they offered $590K, a fair counter is $605K to $618K and Leo would pick $612K. Nothing sends until Dana taps "Send as me". This ties to Real's Leo AiRM review-before-send pattern.
2. The Bennett condolences and close (emotional): "I know this week's been heavy. No rush at all, when you're ready, everything's set for the close. Thinking of you." Actions "Send as me" and "Edit".
3. Jenna's reply that sounds off-brand (sub-agent): "Per my last email, the home's still available, please advise." Flagged as too curt for the team's voice. Actions "Take it and rewrite" and "Leave it".

Build the resolved state as a variant: on "Send as me", the bubble settles to a sent state with a mono meta line and the 8-second undo ring. Routing here is by needs-your-voice, not by channel.

### Frame 5, Team, the altitude
The "My team" altitude, reached by the altitude toggle on Today or the Team tab. The "Your team needs you" section label with a "patterns, not 60 cards" mini-note, then:

1. SLA breach (the speed-to-lead moment, a card with a red chip "SLA breach" and the Response-watch agent): "A hot lead has waited 3h 12m on Marcus." ICP 91%, $720K North Hills, Marcus is in a showing. Actions "Reassign now" and "Nudge Marcus". This is where the speed-to-lead concept lives now.
2. Round-robin split (a tappable card): "12 new leads overnight. I round-robined them across 6." Balanced for load and ICP, 2 high-ICP held for Dana's call. Actions "Review and adjust" (opens the round-robin sheet) and "Approve all".
3. Agent-coaching nudge (a tappable card): "Jenna's lead has stalled 6 days. Want to nudge her?" Leo drafted a short, supportive message in Dana's voice. Action "Review message" (opens the coaching sheet).
4. The trusted-rep collapse: a quiet "Elena is handling 4, all within her band, nothing needs you".
5. A team pulse (six agent rows, Marcus flagged "needs you" with an SLA clock, Jenna flagged for coaching, Priya and the rest with breathing waves), a by-region rollup (North Hills 9 with 1 risk, Westlake 6 with 2 watch, Downtown 4 clear), and a "Download team report" ghost button. The deep Team tab repeats these six rows and the rollup full-screen.

### Frame 6, Leads
The redesigned lead list, round-robined across the team. A lead banner with the Lead-routing agent tag, "12 new leads, round-robined across 6", and "Balanced for load and ICP. Tap a lead to reassign, or long-press to select several for a bulk move." Actions "Review split" and "Approve". Then the "New leads" section label (mono sub "ICP-scored") and five ICP-scored rows, each with a checkbox, a name, a price and region, an assignee, and an ICP badge: Carter family ($880K, referral, unassigned, held for you, ICP 96%), Alyssa K. ($720K North Hills, Marcus, ICP 91%), Ryan S. ($540K Westlake, Sofia, ICP 74%), Frank R. ($660K Lakeside, Priya, ICP 68%), Mia J. ($310K Eastside, Jenna, ICP 38%). Build the long-press multi-select state as a variant: selected rows take a emerald `signal` outline and a filled check, and a bulk bar slides up from the bottom with "N selected", "Auto-balance", and "Reassign". Stake and fit, not arrival order, sort the list.

### Frame 7, AI states, the legend
The "How Leo speaks" screen, one voice and five states, the dedicated legend the prototype ships. A card with five rows, each a live state dot and a name plus Leo's own description:

1. Thinking, a calm breathing dot, never a blocking spinner. "Market-Watch is reading 14 comps."
2. Uncertain, the hand-up. Surfaces its own doubt and two options, never guesses on Dana's behalf.
3. Confident. "Done. Here's what changed." Always reversible, an 8-second undo. Confidence is never arrogance.
4. Silent. The default for about 90% of work, collapsed into "47 handled." Earns trust by not interrupting.
5. Wrong or corrected. Owns the miss, Dana corrects it, it visibly learns and logs for audit (the Fair-Housing save).

Add the note that the live prototype walks the nine microinteraction specs through its guided tour, driving the app into each state as it explains it.

### Frame 8, Orchestration, the funnel
The "how Leo's 100+ become 4" screen. A funnel card: a cloud of 100+ agent dots (a few live), the cap "100+ agents working", an arrow, the filter gate "confidence × stakes × needs-your-voice", an arrow, then four surfaced chips and the cap "4 surfaced to you" in amber. Below it, two explainer cards: "The rule, in one line" (an agent earns a pixel only when it is uncertain, the stakes are high, or it needs your voice; everything else is silent, watching, or routed to a teammate) and "Accountability for the silence" (every silently-handled action carries a tappable provenance stamp, and any correction tightens that policy). The signal hierarchy is enforced by the orchestrator, not by Dana scrolling.

### Frame 9, the calm edge states, collected
Put the honesty pattern on one frame so it reads as a set. Three states:

1. A send-failed edge: an amber-tint warn box, "That did not go through. Nothing was sent", a mono meta line "Lost connection, your draft is saved", and one recovery action "Try again". This is the failure mode for any "Send as me" in the voice outbox.
2. The undo window: the 8-second drain ring or bar paired with "Done. Here's what changed" and "Undo", the forgiving recovery the confident state always carries (the counter handback, the reconciler write-back, a queued nudge).
3. Reduced motion: a labeled note that with `prefers-reduced-motion` the breathing dots and team-pulse waves hold flat, any ring jumps to its static state, and the undo bar holds full, content visible by default.

All errors are calm and honest, never alarmist, and always say what was and was not done.

---

## 3. Component library, with variants

Build these as real components with variant properties so the breadth frames stay in sync. Bind every fill, radius, and type style to the variables above.

Never, collected so the restraint is impossible to miss: no colored side rules on cards, no full-color card fills, no gradient text, no glass on content surfaces, and washes capped at the listed opacities (the emerald and good washes at 0.12, the danger wash at 0.14). State lives in the dot, not the card.

### Triage card, `component: triage-card`
The signature object of the product. Auto-layout row, about 13 to 14px padding, the raised-card gradient fill, hairline `line` border, the raised-card shadow, `r-md` (13). It has two shapes: a collapsed one-line row (a leading severity dot, a title, a mono context tag, and a chevron) and an expanded focus card (a topline chip and timestamp, an agent tag, an Inter headline, a context line, an optional wave-and-sure line, and an action row). The most severe item is the focus card and lifts to the deeper shadow; the rest collapse to rows.
Variants:
- `state` = red (a red dot, used at most twice a morning, for the security anomaly and the Fair-Housing save) / amber (the deal-risk nudge, the reconciler, the handoff) / silent (a muted dot, no halo).
- `chip` = "I acted defensively" / "I caught myself" / "Needs adjudication" / "Needs you" / "Handoff" / "Send as you · 3", the topline confidence-or-stakes label.
- `tag` = the mono context tag on the row line (for example "security", "fair-housing", "sync", "handoff", "my deal", "outbox").
The dot is the state. Do not add a colored side rule as well; the prototype carries state in the dot alone.

### Confidence wave, `component: conf-wave`
The honest alternative to a precision chip. An inline row, a small animated wave glyph (four or five bars) plus a `sans/body` line in Leo's voice naming how sure he is, for example "fairly sure dotloop is the truth" or "leaning yes, a soft nudge helps". The prototype carries confidence this way, a categorical word spoken in a sentence, never as a static labeled pill and never as a bare percentage on a chip. There is no "very sure" state and no low-as-red chip; an unsure item routes to Dana's eyes instead.

### Range bar, `component: range-bar`
The honest alternative to a number, used inside the voice outbox's counter-offer. An inset `p2`/`p3` track with a hairline, a `signal-wash` fill band (the fair range), and a `signal` tick mark (Leo's pick). Above it, two mono end labels (their offer $590K and the listing $625K). Below it, a mono caption "A fair counter is $605K to $618K, I'd pick $612K." Variants: `band-width` and `mark-position`, left adjustable so the bar can be reused for other negotiations. A range, never a fake precision.

### Undo ring, `component: ring`
The 8-second reversal window the confident state always carries. A `line` track ring and a `signal` progress arc that drains over 8 seconds (in the prototype a conic-gradient fills from `signal` against `line`), paired with an "Undo" affordance. Variants: `state` = draining (the arc filling toward done) / settled (committed). This is the recovery for a queued nudge, the reconciler write-back, or a sent counter. Calm, a forgiving window, not a countdown bomb.

### Pulse sparkline, `component: pulse-row`
A row: a deal or agent name and a sparkline. Variants: `state` = healthy (a muted line that breathes softly as a smooth low-amplitude wave) / quiet (amber, flattened to a near-straight line, with a "4 days quiet" label and a faint amber focus band behind it). The quiet variant is the one that makes silence visible (the Crestview deal). The static Figma version can show the resolved flat-amber state with the flag.

### Leo-says block, `component: leo-says`
A small orb glyph and a `display/voice` line. Reused inside the voice outbox (the drafted counter, "We can hold at $612K with a 30-day close") and the coaching sheet (the human-to-human draft), both set in Host Grotesk on the `p2` bubble or the read-band paper. The reconciler's "fairly sure dotloop is current" sureness line is the exception: it is the mono confidence read, not the display voice. Keep the drafted-message lines Host Grotesk; the sureness read stays mono.

### Bottom nav, `component: bottom-nav`
Four tabs: Today, Day, Team, Leads, in a floating liquid-glass capsule (30px radius, translucent with a heavy backdrop blur, a bright top edge, and a soft drop shadow). A emerald glass pill glides under the active tab. Build the pill as a position variant `active` = today / day / team / leads so each breadth frame shows the correct tab lit (active = emerald label and icon over the glass pill; idle = ink-subtle). Today and Team carry a small badge count. Four tabs, not five or more, so the bar stays calm and one-handed. The AI states legend and Orchestration sit off the tab bar; in the live prototype the guided tour steps to each of them in turn.

### Globe banner, `component: globe-banner`
The calm visual header of Today, roughly the top 40% under the appbar. A faded, slowly rotating dark world tinted to the emerald on the right, white metro markers, the sphere bleeding off the right edge; on the left, Leo's live portfolio read (a "Leo, on watch overnight" label and breathing orb, the "$14.2M" pipeline numeral in `mono/pipeline-num`, "pipeline, 22 live across 6 metros", a emerald ticker line, "100+ agents active, as of 6:52am"). Build the static globe as the Figma component. Note on the handoff that the prototype layers a live WebGL globe (the `cobe` library) over this static fallback as a progressive enhancement, that no content depends on the globe rendering, and that the banner is pinned while the triage sheet scrolls over it (section 5). It is the geographic, portfolio-wide read, distinct from the trust ledger's three-count tally above.

### Altitude toggle, `component: altitude`
The glass segmented control on Today, two segments "My deals · 4" and "My team · 3" in a rounded glass pill (translucent with a backdrop blur, a bright top edge), `r` (8). A emerald indicator pill glides under the active segment; build it as a position variant `active` = my-deals / my-team (active = the label reads over the pill; idle = `ink-muted`). It shares the floating-glass-plus-gliding-pill language of the bottom nav, kept to the small controls that float, never on content surfaces. Altitude is a badge on one ranked list, not a separate destination.

### Buttons, `component: btn`
Variants: `kind` = primary (`btn-amber`, a emerald `signal` fill, `signal-ink` dark label, a soft emerald glow) / ghost (transparent, `ink-muted` text, hairline border) / danger (a `danger` fill, for the defensive security action and pause-all only). `width` = full / sm (for the two-up action rows). `r` (8). The rule from the system: exactly one filled primary action per screen, everything else ghost. State `pressed` = scale 0.985 (note it; Figma cannot animate it, but the handoff should say so).

### Cover and resting chips
- `cover-chip` (the handoff chip above the triage: a leading glyph, a one-line summary "Sofia's out till Mon, I rerouted 9 deals, 2 need your call", and an "open" affordance).
- `allclear` (the guardrails resting state: a good-state dot, "Guardrails: all clear", and a mono sub of the four watchers).
- `fyi` (the no-action item: a good-state tick, a one-line summary, and a "view" affordance).

### Supporting components (lower priority, still build)
- `deal-row` (an avatar or pic, a name, a mono status line, and a right-side pulse wave or SLA clock; a `flag` variant adds a "needs you" pill and turns the status amber or red). Reused for the team pulse rows.
- `lead-row` (a checkbox, a name, a mono price-and-region line, an assignee, and an ICP badge; an `icp` variant = hi / mid / lo, and a `sel` variant for the long-press multi-select state).
- `edge-box` (the warn variant: a warm `danger-wash` box with a `danger` icon, serif body, a mono meta line, one recovery link).
- `ledger-line` and `near-miss` row (the quiet-handled proof, collapsed and expanded, each near-miss carrying a tappable "why" provenance stamp).
- `sheet` (the bottom-sheet template: a grabber, a head with agent meta and a title, a paper-card body, and an action row; reused for the reconciler, deal-risk, handoff, round-robin, and coaching sheets).
- `orb` (a static component; in the prototype this maps to Dana's avatar, which is a flat emerald disc, not a breathing animation. The live idle motions are the thinking dot, the confidence waves, the day-spine "now" node, and the healthy deal-pulse lines).

---

## 4. Build order

Work in this sequence so the library exists before the frames that depend on it, and the hero gets the most attention.

1. Variables and text styles (section 1). Nothing else starts until tokens are bound.
2. Atoms: orb, dot, the confidence wave, badges, buttons, the mono meta styles.
3. The triage card (all variants, row and focus shapes). It is the product's signature object, so get it right early.
4. Frame 1, Today calm, the hero, built to the highest craft. Build the assembly-order annotated copy alongside it, and build Frame 0, the three onboarding slides, at the same finish since it is the opening and shares Today's craft level.
5. The remaining bespoke components: the globe banner (static, with the live-globe note), the glass altitude toggle, the range bar, the undo ring, the pulse sparkline, the leo-says block, the bottom nav, a floating glass capsule with a gliding active pill, the cover and resting chips, the sheet template.
6. Frame 2, Today heavy, as the variant of Frame 1 with the four exception-handler cards.
7. The focus-card sheets: Frame 3 (the reconciler, the sheet template) and Frame 4 (the voice outbox), with their resolved variants.
8. Frame 5 (Team altitude), Frame 6 (Leads, with the multi-select state), Frame 7 (AI states), and Frame 8 (Orchestration), the remaining surfaces, on-system and correct.
9. Frame 9 (the calm edge states plus the undo window and reduced motion), built as the honesty set.
10. A pass for parity: put each frame next to the matching screen in the prototype and reconcile. The prototype is the source of truth; fix Figma to match it, not the reverse.

---

## 5. Motion notes for handoff

Figma is static, so annotate the motion as redline notes rather than trying to fake it. The prototype carries nine signature microinteractions, walked one beat at a time by its guided tour; these carry the workflow, so describe each on its frame.

- Onboarding paging (Frame 0, on open): the three slides sit on one track and page on `transform`, a `translateX` step of one third per slide driven by the Next button (not free swiping); Next becomes "Get started" on the last slide and the overlay then fades out on opacity. Under reduced motion the onboarding is skipped and the app opens on Frame 1.
- Dynamic Island morph (the first beat, after onboarding): the resting pill morphs into the wider notification capsule on a coordinated `width`, `height`, and `border-radius` transition (the `--ease-snap` curve), the notice content fading and scaling in behind the shape; it holds about four seconds, then reverses to the pill. This is the one place `border-radius` is animated alongside size, confined to this element. It fires once automatically after onboarding, then cycles a few Leo states on tap.
- Globe banner and scroll-over (Today): the globe is a slowly, continuously rotating WebGL sphere (a progressive enhancement over a static fallback; the rotation is never a dependency). The banner is pinned, and the triage below, held in an opaque sheet, scrolls smoothly up over it on the native scroll, so the globe stays put as the cards rise over it. Under reduced motion the globe holds still and the scroll-over is the plain scroll.
- Altitude toggle pill (Today): on switching My deals or My team, the emerald indicator pill glides between the two segments on `transform`, the active label lifting to read over it; the list behind re-ranks to the chosen altitude. Under reduced motion the pill jumps with no glide.
- Morning assembly (Today, on open): the active screen's children rise on a roughly 40 to 50ms per-step stagger built from `:nth-child` selectors (greeting and ledger first, then the triage, then the guardrails and FYI, then the glance and review activity), and the triage cards carry their own stagger. Entrances are translateY of about 10px plus opacity on the `--ease-out` curve, cubic-bezier(.22,1,.36,1), at the `--dur-slow` 360ms duration. There is no `.assemble` class or `d1` to `d7` delay classes. The order (human voice, then the few things, then the proof of restraint) is the priority made physical.
- Silence made visible, not audible: the Crestview deal that has gone quiet surfaces as its own deal-risk card with the amber needs-you treatment, while the team-pulse wave glyphs read each rep's activity. Quiet is shown on the surface, never sounded as a beep.
- The counter handback (the voice outbox): on "Send as me", the bubble resolves to the sent state, then the 8-second undo ring drains.
- The SLA-breach reassignment (Team): on "Reassign now", the breach card resolves with a toast that the lead moved with its context, the undo window still open.
- The reconciler write-back (Frame 3): on "Trust dotloop, fix all 3", a shimmer sweeps across the three source logos as they reconcile to one status, uncertain then confident then silent.
- The round-robin split (Frame 5 and 6): the proposed split settles, the two held high-ICP leads stay pinned for Dana, and auto-balance re-flows the loads.
- The agent-coaching nudge: on "Soften", the drafted message re-renders warmer and shorter in place; "I've got context" hands it back to the human.
- The orchestration funnel: 100+ dots filter through the confidence × stakes × needs-your-voice gate down to the four surfaced chips.
- Pause-all and blast-radius: the pause glyph opens what goes quiet (in-flight actions held, client replies paused) versus what stays on for safety (confirmed showings auto-confirm).

Discipline to write on the handoff: CSS keyframes and transitions only (with a short timer driving the undo-ring drain and the reconciler write-back), content visible by default, no animation of layout properties, and `prefers-reduced-motion` honored (the breathing dots and waves go still, any ring holds its static state, the undo bar holds full). The idle motions are intentional and small: the thinking chip's dot breathes with a light sweep across the chip, the confidence wave bars rise and fall like an equalizer, the day-spine "now" node pulses a soft emerald ring, and the team-pulse waves animate while the one going quiet flattens to warm. Dana's avatar is a flat emerald disc rather than a glowing one, and there is no separate Leo orb element. Motion only orients, gives feedback, or encodes confidence. It is never decoration.

---

## 6. Handoff note

The prototype (prototype/command-center.html) is the source of truth. It holds the real timing, the real reduced-motion behavior, the real accessibility wiring (roles, tab order, keyboard activation), and the exact look. This Figma file exists to carry breadth: the full set of frames and states laid out flat, the component library with its variants, and the redesign scope a single live flow cannot show at a glance. Read Figma for the whole-product picture and open the prototype for how any one moment actually feels and behaves.

If a value, a copy line, or an interaction differs between the two, the prototype is correct and Figma is the thing to update. Keep the deliberate restraints intact in both: one focus per pane, one filled primary action per screen, color only as a confidence state, no precision percentage on a confidence chip (Leo speaks his sureness in a sentence, never as a "87% urgent" pill), plain everyday English, no emoji, and no dashes of any kind. Those constraints are the argument, not the styling.

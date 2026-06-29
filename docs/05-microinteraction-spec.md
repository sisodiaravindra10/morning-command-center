# Microinteraction and notification spec

Fewer interactions, each one carrying real meaning. The prototype annotates nine signature microinteractions, and one notification model sits underneath all of them. Together they cover the AI states the morning command center is graded on: thinking, confident, uncertain, wrong, and silent. Turn on Annotate in the prototype to read each spec pinned on the live screen. Every one of these is built in the prototype (prototype/command-center.html).

The nine, in the order the prototype numbers them: the uncertainty hand-up, the Fair-Housing tripwire, the source-of-truth reconciler, confident but reversible (the 8-second undo ring), silent then reveal with who-approved, the voice-required outbox, the security anomaly that acted then asks, round-robin lead routing, and the agent-coaching nudge. The sections below walk each one, preceded by the morning assembly that opens the day.

## Motion grammar

The same rules apply everywhere, so the surface feels like one calm system instead of a pile of effects.

- CSS only. Animate `transform` and `opacity`, nothing else. No layout-driven motion, no JavaScript timelines.
- Ease-out on entrances. The curve is `cubic-bezier(.16, 1, .3, 1)`. Never `linear`.
- Durations sit between 100ms and 500ms. Quick state changes are near 120ms to 200ms, the morning assembly is the longest single beat and stays under 500ms per element.
- `prefers-reduced-motion` is authored first, not bolted on. When it is on, motion becomes a plain cross-fade in `opacity` and every position shift is removed. Nothing breathes, nothing slides, the information arrives instantly. You can toggle this live in the prototype.
- Motion only happens when something changed that matters: a state, a confidence read, an arrival. Everything else holds still. Stillness is the default, movement is a signal.
- Confidence is always shown twice, in color and in type weight, so it reads at a glance and survives color-blindness.

## The notification model

The whole point of the morning command center is that the screen decides what matters, so the notification model must not rebuild the inbox it is meant to replace. Three rules:

1. Notify only what needs Dana. The push tier is the same logic as the feed: something is high-stakes and either uncertain or irreversible. Things Leo handled, and things that are only worth knowing, never push. They wait quietly in the morning view. The target is a small handful of pushes a day, not a stream.
2. A notification is a decision, not a status line. Every push carries one stake and one action. Never "you have 12 updates."
3. Calm, dark, honest. A push uses the same dark system as the app: Leo's voice in Host Grotesk, one line of plain metadata (the clock or the stake), one or two actions. No badge-count piles, no red dots for things that are merely new. The few pushes that do clear the tier (a hot lead that has waited too long on a teammate, a held compliance risk) open straight to the relevant card, with no app loading state and no second tap.

### The morning's first beat: the command center assembling

This is the first microinteraction of the day, the moment the app opens.

- Trigger: the app opens to the Today morning command center. There is no lock screen, no push to tap, no loading state in between.
- What it communicates: "the triage is already done, and here is the proof of how much I held back."
- The motion: the cards rise into place, the `.assemble` micro-motion, anchored by the trust ledger at the very top, which reads exactly: "47 handled overnight · 2 need you · 1 corrected." The ledger sets the tone before any single card does: most of the work is already finished, and only a small, ranked few are asking for Dana. The top focus card of the triage leads. Under reduced-motion, the cards fade in together with no rise.
- Why: the first thing Dana feels is that the work was underway while she slept and that the screen has already done the triage. That is the product promise delivered in the first two seconds, by restraint made visible, before she has read a single word of any card.

### Quiet by default

If Leo handled something on its own, there is no notification at all. It shows up only in the trust ledger and the review-activity log inside the morning view. The absence of a buzz is itself a designed, trustworthy signal: silence means handled, not asleep.

## The microinteractions

### 1. The morning assembly (thinking, on open)

- Trigger: the app opens.
- What it communicates: "the triage is already done, and here is what is still being checked."
- The motion: the serif greeting sets first. Then the three items that need Dana rise into place in a short stagger, each entering on `transform` and `opacity` about 70ms after the one before it. The quiet ledger line fades in last. If a skill is still resolving, a named skeleton shows in its place, sized to the card it will become and labeled in plain text: "Negotiation Prep, re-checking 14 comps for 142 Oak St." There is no spinner anywhere. Under reduced-motion, the greeting and the items fade in together with no rise and no stagger.
- Why: the calm, ordered arrival is the product. The order is the priority made physical: the human voice first, then the few things that matter, then the proof of restraint. A named skeleton turns load time into trust ("I can see what it is doing") where a spinner would only hide the work. A progress bar is rejected too, because it implies a known duration the system does not have.

### 2. The uncertainty hand-up (uncertain)

- Trigger: the deal-risk agent detects a four-day silence after the inspection on the Crestview deal ($635K). It is the top focus card of a calm morning.
- What it communicates: "I am not sure enough to act for you, here is my read and your two options."
- The motion: the card opens with Leo's read in Host Grotesk and a plain confidence line, in words and in weight: "I am 62% sure a nudge helps," set in a lighter type weight than a confident claim would use, with an amber edge. Two option cards rise in on `transform` and `opacity`: send a soft nudge (the one the agent leans toward, marked plainly) or hold 24 hours and keep watching. A third path, "I will call them myself," takes it off the agents. Nothing fires on its own. Under reduced-motion, the options cross-fade in with no rise.
- Why: for a user trained by flaky tools, honest uncertainty beats confident-and-wrong every time. The agent has seen this pattern 38 times: a nudge recovers it about 62% of the time, and the other 38% read a nudge as pressure and walk. Surfacing the doubt plus two reads returns the judgment to the human instead of gambling on the 38% who would leave. The lighter weight and amber edge make "fairly sure" feel different from "certain" without a single extra word.

### 3. The Fair-Housing tripwire, wrong then save (wrong / corrected)

- Trigger: an AI-drafted outreach line hits a protected-class or steering phrase before it ever sends. This is the responsible-AI centerpiece.
- What it communicates: "I almost sent this, I caught it, I held it, and here is the rewrite."
- The motion: the held draft shows struck through ("a tight-knit community of families just like yours, the right kind of people"), with the flagged phrases named in plain text. Below it, the compliant rewrite stands clean ("walkable, great schools nearby, quiet evenings"). The classifier verdict is the interaction. Red is used exactly once here, nowhere else, so the one place the system refuses itself reads as the one place that earns the color. The actions are approve and send the compliant version, or edit first. Under reduced-motion, the two drafts cross-fade in with no movement.
- Why: agents speak at scale, so they can steer at scale. The point is not that the tool is polite, it is that the guardrail runs before any send, holds high-risk language for a human every time, and logs the original either way. Catching its own near-miss in front of Dana is what turns a compliance rule into trust.

### 4. The source-of-truth reconciler (uncertain to confident to silent)

- Trigger: MLS, the CRM (Follow Up Boss), and dotloop disagree on the Marsh deal's state. MLS reads Pending, the CRM reads Active, dotloop reads Under contract.
- What it communicates: "your systems are out of sync, here is the one I trust and why, and I can fix all three."
- The motion: the three systems stack as rows, each with its state and how stale it is (MLS last touched six days ago, the CRM auto-set by a stage rule, dotloop with an addendum uploaded two hours ago). A confidence line reads "I am 78% sure dotloop is current, it is the freshest and a real document," with a small wave glyph rather than a spinner. On "Trust dotloop, write back to all three," a shimmer sweeps across the three logos in sequence, uncertain to confident to silent, and the conflict resolves. A second path, "let me decide each field," opens the three records. Under reduced-motion, the shimmer is replaced by the rows settling to the resolved state with no sweep.
- Why: no CRM adjudicates a conflict between systems, it just shows you three screens that disagree. A silent divergence like this is what kills a closing. Making the adjudication visible, with the confidence and the write-back in one move, is the interaction other tools do not have.

### 5. Confident, but reversible (confident)

- Trigger: the doc-prep agent finishes the Bennett closing pack overnight, all 11 documents assembled and cross-checked, two signature blocks fixed.
- What it communicates: "done, here is exactly what changed, and you can take it back."
- The motion: a calm confident state, in Leo's voice: "Done. Here is what changed." The send action carries a thin undo ring that drains on `transform` over an 8-second window, so Dana can see exactly how long she has to reverse it. The rest of any related batch holds while the window is open. If she taps undo, the card resolves to a caught-it state and nothing went out. Under reduced-motion, the draining ring is replaced by a plain 8-second countdown number, no sweep.
- Why: confidence without an escape hatch reads as arrogance, and a user burned by flaky tools will not grant autonomy to a system she cannot reverse. The 8-second undo is what makes "act on my behalf" safe to trust. The same pattern carries every confident auto-action in the app, so reversibility is a rule, not a one-off. A generic "something went wrong" toast is rejected, and so is silent self-correction, because a hidden action forfeits the trust the undo ring is built to earn.

### 6. Silent, then reveal with who-approved (silent)

- Trigger: roughly 90% of agent work completes overnight with no decision needed. It is collapsed into the trust ledger at the top of the morning view.
- What it communicates: "I did a lot, I chose not to interrupt you on most of it, and you can still ask what authorized each one."
- The motion: the resting state is the single ledger line, "47 handled overnight · 2 need you · 1 corrected," with "8.5h saved" alongside. Tap it and the handled items unfold downward on `transform` and `opacity`, each carrying a tappable provenance stamp, which policy authorized it. Tap again and it folds back. Any correction tightens the policy that authorized the action, it does not just dismiss the item. Under reduced-motion, the panel cross-fades open with no slide. The expand is the only place per-item detail lives, so the resting state stays one calm line.
- Why: silence is the hardest AI state to design and the strongest trust-builder for a team lead. The count says the work happened; the provenance stamp lets Dana ask "what authorized this?" of any silent action; and the fact that a correction tightens policy is what turns the ledger from a feed into accountability. Showing nothing would read as the AI being asleep, and a notification count would just rebuild the noise the product exists to remove.

### 7. The voice-required outbox (uncertain, review before send)

- Trigger: the comms agents draft messages that need the lead's actual tone, routed by needs-your-voice rather than by channel. Three are held: a counter-offer on 142 Oak St, a condolence-and-close note for the Bennetts, and a sub-agent's reply that sounds off-brand.
- What it communicates: "I did the work and I will tell you how sure I am, and you keep every call that carries your voice or cannot be taken back."
- The motion: the counter-offer leads, in Host Grotesk: "We can hold at $612K with a 30-day close." The deal is listed at $625K and they offered $590K, so Leo frames the room as a range, not a single guess, a fair counter is $605K to $618K and Leo would pick $612K, which keeps Dana from reading false precision into one number. Each message carries why it is held (high-stakes, emotional, sub-agent) in a lighter type weight than a confident claim. Nothing sends until Dana taps "Send as me," with Edit beside it; her edits teach the tone model. When she sends, the bubble resolves on `opacity`. Under reduced-motion, the resolve is a plain cross-fade with no movement.
- Why: routing by needs-your-voice, not by channel, is the differentiator, and this is the clearest review-before-send beat in the product, tied to Real's Leo review-before-send pattern. The counter is the trust moment that matters most: review-before-send keeps the irreversible call with the human, and the sub-agent item proves the same gate covers the team's voice, not just Dana's, which is the manage altitude.

### 8. The security anomaly, acted then uncertain (wrong / corrected)

- Trigger: at 3:11 AM a bulk export of 412 client records starts on Marcus's account, to an unknown device geolocated 1,400 miles away.
- What it communicates: "I took the safe, reversible action first, then I am asking, was I right?"
- The motion: a calm but serious card, in Leo's voice: "I paused the export and locked the session immediately. Nothing left your systems. This is reversible." This is the second and last place red appears. Two paths: confirm and keep it locked, or "It was Marcus," which turns the false positive into a teach-loop, "Marcus runs bulk exports Friday afternoons from his laptop, do not flag those," rather than a recurring nag. Under reduced-motion, the card and its actions appear with no movement.
- Why: the responsible default for a high-stakes irreversible-looking event is to act safely first, since waiting could cost the records, then ask, since acting silently could be wrong. Letting the correction teach the system is what keeps a one-off false positive from becoming noise Dana learns to ignore.

### 9. Round-robin lead routing, propose then dispose (silent to confident)

- Trigger: 12 leads arrive overnight; the routing agent assigns them by load and ICP across the six-person team.
- What it communicates: "I split these, I held the two highest-ICP for your call, review?"
- The motion: the split shows as agent rows with load bars and a count each, balanced for capacity and fit, Sofia's row marked out and Diego's marked new. Two high-ICP leads are held for Dana, which is the trust signal. The actions are approve the split, auto-balance (Sofia's share routes to Diego and Elena), or assign manually. On the Leads list, a tap reassigns and a long-press multi-selects for a bulk move. Under reduced-motion, the rows and counts appear with no motion.
- Why: auto-action with a held exception beats both pure automation and pure manual. The hold is what says the system knows which calls are not its to make. Manual, bulk, and auto-balance are all available so the routing is a proposal Dana can always overrule.

### 10. Handoff coverage and the agent-coaching nudge (team)

- Trigger: Sofia is out until Monday, so a handoff agent reroutes her routine deals and surfaces the two that need Dana's call. Separately, the team-coach agent notices Jenna's lead has stalled six days.
- What it communicates: "the right work goes to the right teammate, the context travels with it, and I will draft the manager's message so it stays human."
- The motion: the handoff card lists the nine routine deals it auto-routed silently and the two it held because they are relationships, not records, the $820K Hawthorne listing (route to Dana, or to Priya who knows the family) and a mid-counter on Castle Dr (Dana, or Elena with the negotiation brief). Each "I'll take it" or reassign carries the full context to whoever catches it, and a take-it-back path stays available. The coaching nudge drafts a supportive, human-to-human message in Dana's voice; "Soften" re-drafts it warmer and shorter, and "I've got context" hands it back to Dana. Under reduced-motion, the cards and their actions appear with no movement.
- Why: at team scale the lead is not always the right person to respond, and capacity, relationships, and authority all decide who is. CRMs surface rep metrics; none draft the manager's actual message. Carrying context on every handoff means a routed deal never drops what the next person needs, and drafting the coaching note keeps a stalled-lead conversation supportive instead of a number on a dashboard.

## Summary

The morning command center moves only when meaning changes. The command center assembles into the morning, the trust ledger proves the restraint up front, and the focus card leads. From there the nine signature microinteractions each carry one beat: the uncertainty hand-up returns judgment to Dana, the Fair-Housing tripwire catches its own near-miss, the reconciler adjudicates three systems, confident-but-reversible makes acting on her behalf safe with an 8-second undo, the silent ledger gives restraint a tappable surface, the voice-required outbox keeps the irreversible call with Dana, the security anomaly acts safely then asks, round-robin proposes a split and holds the exceptions, and handoff with coaching carries context to the right teammate. All of it is CSS-only `transform` and `opacity`, ease-out, between 100ms and 500ms, with reduced-motion written first.

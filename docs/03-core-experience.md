# The core experience

The morning command center is a calm mobile morning surface for a real-estate team lead, Dana Reyes, who fronts Real's AI, Leo. Leo runs as three products on the reZEN platform: CoPilot (the voice assistant), AiRM (the autonomous overnight nurture that drafts and reviews before sending), and HeyLeo (consumer search). Behind Dana there are roughly 33,500 agents today, growing toward 180,000 through the RE/MAX acquisition. This document describes the experience the prototype (prototype/command-center.html) shows, end to end.

## The one idea behind the architecture

Organize by what needs me, not by data type.

Most brokerage apps are organized by object: a Deals tab, a Leads tab, a Tasks tab, a Notifications tab. That arrangement forces the person to visit each one and do the triage themselves. The morning command center inverts it. The default surface is attention. The objects are where you go to act once attention has already been directed. Attention is the scarce resource, so attention is the architecture.

In one before-and-after line:

- Before: open the app, get a dashboard of everything, do the triage yourself.
- After: open the app, the triage is already done, you make a couple of decisions and put the phone down.

## The four tabs

A four-tab bottom bar, no more, so it stays calm and one-handed: Today, Day, Team, Leads.

- Today is the default and the home. It is the command center, the front door, not a dashboard tab among equals. It is where Leo tells you what needs you now. At the top of Today a segmented toggle switches the altitude: My deals or My team. Altitude is a quiet badge on one ranked list, not a separate destination.
- Day is the timeline of the day's stops, each one prepped by an agent: the 9:00 Oak St counter call, an 11:00 showing in Lakeside, the 16:00 Bennett close.
- Team is the deep view of the six agents and their work: KPIs, the agent rows, a by-region rollup, and a one-tap "download team report." It is where reassignment and coaching live.
- Leads is the new leads, ICP-scored and round-robined across the team. Tap a lead to reassign, long-press to multi-select for a bulk move.

Two more surfaces sit one tap away, off the daily path: AI states, the legend of how Leo speaks, and Orchestration, the funnel that shows how 100-plus agents become the few that reach Dana. Owner data (cap progress, revenue share) sits behind the header avatar, not in a main tab: it is motivation, not a daily destination. Notifications are a global layer that cross-cuts all four tabs, not a tab of their own. A notification inbox would re-create the noise the product exists to remove, so the screen decides priority and most notifications never fire.

Two design rules hold the whole thing together. Today interleaves both altitudes (Dana's own deals and the team's) into a single ranked list, not two sections, because the whole point is one triage. And every screen has exactly one primary job stated in its first fold: Today's job is "decide what needs you," the voice outbox's job is "send this one as you." If a screen has two equally weighted jobs, it is two screens. Density is spent on the one thing that matters and the rest is given to paper.

## The workflow the prototype shows

### A short opening, then straight into the morning

A three-step, image-led onboarding plays first, before the command center. It is the one piece of framing the product allows itself, and it sets up the promise the morning then keeps. Three slides page horizontally, advanced by a Next button; each is a full-bleed architectural photo in the top portion that fades down into a clean dark zone, so the type is never set over a busy image. Each slide carries a Host Grotesk headline with one accent word, a single supporting line, progress dots, and a Skip. On the last slide Next becomes "Get started." The three slides tell the arc in order: the agents work through the night, the noise is quietly sorted by morning, and you see only what needs you. Under reduced motion the onboarding is skipped entirely and the app opens directly on Today. The onboarding plays on load, and the guided tour re-walks the morning on demand. (The slides and their motion are specified in 05-microinteraction-spec.md.)

Past the onboarding there is no lock screen, no push notification to tap, no app to hunt for. The prototype lands on Today, the morning command center, at 6:52. The status pill at the top of the phone is not decorative: it is a live Dynamic Island that carries Leo's notices. The first beat after onboarding finishes is that island morphing open into a notification capsule to deliver the morning's opening notice, a breathing emerald dot beside a line such as "Leo, new lead at 88 Linden, pre-approved," which holds for about four seconds and then collapses back to the pill. Tapping it cycles through a few Leo states (the lead waiting on a teammate, the Oak St counter that went out, the overnight handled count).

The morning opens on a calm visual header. The top of Today, roughly its first 40%, is a globe banner: a faded, slowly rotating dark world tinted to the system's emerald, with emerald markers on the metros and the sphere bleeding off the right edge. Alongside it, on the left, is Leo's live read of the whole portfolio, "Leo, on watch overnight" beside a breathing orb, the pipeline figure "$14.2M" large, "pipeline, 22 live across 6 metros," an emerald ticker line ("North Hills warming, 3 new leads before dawn"), and "100+ agents active, as of 6:52am." This is the geographic, portfolio-wide view, distinct from the trust ledger's three-count tally that sits in the appbar above. The globe is a real WebGL render but a progressive enhancement only: a static globe sits behind it, so the banner reads correctly whether or not the live one loads, and nothing on the screen depends on it. The banner is pinned. The triage below sits in an opaque sheet that scrolls smoothly up over it, so the globe stays put as the cards rise over it. Then the screen assembles itself: the cards rise in with a soft settle, and the eye lands first on the greeting, "Good morning, Dana," and on the trust ledger directly under it.

The trust ledger is the morning's opening fact. It reads, exactly: "47 handled overnight · 2 need you · 1 corrected." That single line sets the contract before anything else loads. Most of the night's work is done. Two things are waiting for her judgment. One thing Leo got wrong and has already owned. The "2 need you" count is a button: it jumps her to the first item. This is the product's promise made physical. The work was done while she slept, and the screen leads with what it did, what it needs, and what it got wrong, in that order.

### The guided way in

A viewer can read the morning straight off the screen, but the prototype also offers a guided way in. A "Take the tour" button under the phone runs a spotlight-and-card walkthrough that steps through the product one beat at a time and drives the app into each state as it explains it. A ring highlights one target while the rest of the surface dims, and a small card gives that step a title, a one-line explanation, and Back and Next. Its ten steps are the trust ledger, the altitude toggle, the focus card, the Dynamic Island (which fires the morph), the Fair-Housing guardrail (which switches the morning to its busier state to reveal the security and Fair-Housing cards), the team SLA breach (which switches to the team altitude), the tab bar, the orchestration funnel, the AI-states legend, and a closing summary. The tour is the fastest path to seeing every AI state in context, and everything it lands on stays live, so a viewer can stop and act on any card.

### The triage (Today)

Below the ledger, just under the globe banner and inside the sheet that scrolls over it, sits the altitude toggle, My deals or My team: a glass segmented control, a rounded pill with a blurred translucent ground and an emerald indicator pill that glides between the two segments. Under it the triage: one focus card open, the rest collapsed into a quiet queue, ordered by severity. The section is labeled "Needs your judgment," with a soft note, "one at a time." The prototype ships the calm view, and the guided tour reveals the busier morning, surfacing the Fair-Housing and security guardrail cards, as one of its steps, so you can see how the same surface behaves on a hard day.

On a calm morning, two items need her judgment, ranked by stake across both altitudes, not by which deal is whose:

1. The Crestview deal has gone quiet, four days, no reply. It is $635K in Westlake, warm and then silent after the inspection report. Leo is "leaning yes, a soft nudge helps" and offers two reads, send a low-pressure nudge or hold and keep watching, with the recommended option marked. Judgment returns to her.
2. Three messages are drafted but need her actual voice. Leo routes them to her not by channel but because each one needs her tone: a counter-offer, a grieving seller, and one of Jenna's replies that came out off-brand. She can open the outbox to send each as herself, or approve all as drafted.

Under the two judgment items sits the resting state of the guardrails, "Guardrails: all clear," naming the four that are watching: security, fair-housing, sync, and handoff. Below that a no-action FYI, "Bennett closing paperwork ready to sign," resolved overnight and surfaced as information, not a decision. Each card shows a small colored dot and one line of why. Tapping any item opens its sheet: which agent did the work, what it checked, the source. Every claim is reachable.

On a heavy morning the same two items stay, and four exception-handler cards escalate in above them, each owned by a named guardrail:

1. Security anomaly. Leo paused a 3 AM bulk export on Marcus's account, 412 client records heading to an unrecognized device in another state, and locked the session, then asks, "Was I right?" It took the safe, reversible action first. On "It was actually Marcus," the false positive becomes a teach-loop, a rule Leo learns, not a recurring nag.
2. Fair-Housing tripwire. Leo almost sent an outreach line that reads as steering, caught it, held it, and rewrote it. The sheet shows the held draft struck through and the compliant rewrite beside it, with the original logged for audit. The classifier's verdict is the interaction. This is the responsible-AI centerpiece.
3. Source-of-truth reconciler. MLS, the CRM (Follow Up Boss), and dotloop disagree on the Marsh deal's status, Pending, Active, and an unsigned addendum. Leo is "fairly sure" dotloop is current and offers to write back to all three, with a shimmer running across the three logos on accept.
4. Handoff coverage. Sofia is out till Monday. Leo rerouted nine deals automatically and flags the two that need Dana's call, the $820K Hawthorne listing and a mid-counter, because those are relationships, not just records.

That is the triage. Two decisions on a calm morning, a handful more on a heavy one, then she can put the phone down.

### The dashboard glance

Under the triage sits a collapsible dashboard glance, closed by default so it never competes with what needs her. Its header reads "$14.2M pipeline · 22 live · on track." Tapping it expands a compact deck: a hero bar charting live pipeline across her and the six agents ($14.2M, up 8% on the week), a KPI grid (2 need you, 8.5h the AI saved overnight, 94% SLA met, 1 at risk), and a day rail that previews the day's stops, the Oak St call at 9:00, the Lakeside showing at 11:00, the Bennett close at 16:00. In the stats-dense Pulse theme the glance opens on its own and the KPI grid widens. The numbers are available on demand; they are not the front door.

### Review activity

At the foot of Today, under the label "Review activity," is the account of the work that did not need her, collapsed into one line: "47 handled overnight · 8.5h saved." Expanding it lists what the agents did, comps pulled for three listings, twelve portal enquiries answered within SLA, four viewings booked, six documents chased, with "43 more" and a link to the full log. Each line carries a tappable "why," a provenance stamp that names the policy that authorized it (a standing "refresh comps daily" rule, an "auto-reply within SLA, no commitments" rule). Restraint is not an empty inbox here. It is a reviewable, auditable count.

## The AI states and where each one lives

The hard part of an AI product is not what it does when it is right. It is how it talks across all of its moods. The legend names one voice in five states, Thinking, Uncertain, Confident, Silent, and Wrong or corrected. Each state has a structural home so the canvas reads as a state at a glance, and each owns a quiet treatment, a small dot, a thin rule, or a chip, never a full fill.

- Thinking. Leo is working, shown as a calm breathing dot, never a blocking spinner. "Market-Watch is reading 14 comps."
- Uncertain. Leo has a doubt and wants her call. This ranks higher in the triage and shows its confidence and what it could not check before she acts. It lives on the Crestview deal-risk card ("leaning yes, a nudge helps") and on the counter-offer in the voice outbox, described below.
- Confident. Leo handled it and is sure. "Done. Here's what changed." This lives in the review-activity log, where the work that did not need her is logged rather than surfaced, and in every confident action, which resolves with a single send and an 8-second undo ring. Confidence is never arrogance.
- Wrong / corrected. Leo made a mistake and owns it. This is reachable through the undo window on every confident send, and a correction never disappears quietly: the original line is shown struck and amended so the mistake stays visible, logged, and learned from. The Fair-Housing save is the clearest example, Leo caught its own draft before it sent.
- Silent. Leo had nothing worth raising, the default for roughly 90% of the night's work. This is the review-activity log on Today. Silence is a designed, visible result, not an absence, and that is the point of giving it a number.

### The counter-offer in the voice outbox, where uncertain becomes a feature

When a negotiation needs a response, Leo drafts and Dana reviews. Nothing sends itself. The clearest review-before-send beat is the counter-offer that sits inside the voice-required outbox. The deal is 142 Oak St, listed $625K, and they offered $590K. A fair counter is $605K to $618K, and Leo would pick $612K. Leo's drafted message reads, in her voice, "We hear you on the number. We can hold at $612K with a 30-day close, and we'd rather move fast with you than re-list." The item is tagged high-stakes, which is why it routes to her rather than going out on its own.

Her actions are "Send as me," not a bare "Send," and "Edit," which opens the draft so her changes also tune the tone model. This is review-before-send, the same pattern as Real's Leo AiRM: Leo drafts the whole negotiation move, names what it would do and why, and then stops and waits for the human to approve the number that leaves the building with Dana's name on it. The same outbox holds two other items that need her voice for the same reason, a condolence-and-close message to a grieving seller and one of Jenna's replies that came out too curt for the team's voice.

## Edge cases, handled in plain sight

### The response clock breaking (the speed-to-lead moment)

A new-lead clock is a promise that can be broken, so the prototype shows the broken state on the Team altitude. A live SLA-breach card from the Response-watch agent reads, "A hot lead has waited 3h 12m on Marcus." It is an ICP 91% lead, $720K in North Hills, and Marcus is in a showing. The promise has already lapsed, and Leo does not hide it. Her two actions are "Reassign now," which hands the lead to Sofia with the context carried over and Marcus notified, or "Nudge Marcus," a text asking if he wants it covered. The five-minute rule and its stakes are the load-bearing research; the surface is now this breach card and the round-robin routing beneath it, not a launch-screen countdown. The lead is never dropped; it is routed to whoever is most likely to catch it, and Dana is told who and why.

### The wrong state, with an undo window and a correction

Every confident send carries a quiet 8-second undo ring, the same affordance the legend names under Confident. Acting on her behalf is only safe to trust if there is an escape hatch, so the ring appears on each "Done. Here's what changed" confirmation, the nudge that queues to the Crestview buyers, the reconciled Marsh deal, the reassignment. This is the fast path to catching a wrong action before it lands.

When something does go wrong, the correction stays visible and owned rather than buried. The trust ledger leads with "1 corrected," and the Fair-Housing card is the worked example: Leo's held draft is shown struck through, the compliant rewrite beside it, and the original logged for audit either way. When Leo retracts or amends an action, the original line is shown struck and corrected in place, so the mistake is acknowledged, not quietly swapped.

### Routing that does not dead-end (the handoff)

Handing the right work to the right teammate, carrying the context, and staying accountable is delivered through three flows on the Team altitude, not a single named screen. When Sofia is out till Monday, Leo auto-routes the nine routine deals and surfaces only the two that need Dana's call, the $820K Hawthorne listing (route to Dana, or to Priya, who knows the family) and a Castle Dr counter due today (Dana, or Elena, with the negotiation brief). The round-robin split shows twelve overnight leads balanced across six by load and ICP, with two high-ICP leads held for Dana and the option to approve, auto-balance, or assign manually; when a teammate is at capacity their share is rebalanced to the next, never left in limbo. And the agent-coaching nudge drafts the manager's human-to-human message when Jenna's lead stalls six days, in Dana's voice, with "Soften" to re-draft and "I've got context" to hand it back to her.

## The non-obvious human-AI interaction

Two moments matter more than any single screen, because they decide whether a person can trust an AI that acts on its own overnight.

The first is the review-activity log, the surface that gives silence a number. Most AI products treat silence as nothing, an empty inbox, no badge, no signal. But for a team lead, the most valuable thing Leo does overnight is decide what not to wake her for, and an AI that makes that call invisibly is an AI you cannot trust to make it. So the morning command center gives silence a surface. The trust ledger's "47 handled overnight" and the log's "47 handled · 8.5h saved" turn restraint into something she can see, count, and audit. Expanding it lists each silently handled action, and every line carries a provenance stamp that names the policy that authorized it. Silence becomes a reviewable, accountable decision, not a void.

The second is review-before-send on the counter-offer in the voice outbox. The temptation in an autonomous product is to let the AI close the loop and tell you afterward. The morning command center refuses that for anything that leaves the building with Dana's name on it. Leo does all the work up front, the draft, the number, the range, and then stops and waits for "Send as me." The human keeps the last move. That single pause is what lets an autonomous overnight system and a human professional share one account without either one losing the thread.

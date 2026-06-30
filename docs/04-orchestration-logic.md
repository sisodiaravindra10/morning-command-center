# Agent orchestration logic: how Leo decides what reaches Dana

This is the logic under the morning command center. The other documents describe what the morning looks like and how it feels. This one describes how the system gets from "many things happened overnight" to a handful of cards and one quiet line, and where the human stays in charge. It is the trust layer turned into rules.

The whole design rests on one belief: Dana does not need more information. She needs less, ranked, and honest about its own confidence. Orchestration is how the system keeps that promise without lying to her.

## One assistant, many skills, one synthesized result

Dana talks to one assistant: Leo. She never sees the parts. Underneath, Leo is an orchestrator that fans a morning out to a set of named background skills, each one narrow and good at a single job, then synthesizes their output into the few cards she sees.

This orchestrator-worker shape is a deliberate choice over an open-ended autonomous loop: a single triage pass with a visible plan and a hard stop, not an agent that keeps going until it decides it is done. For a tool that touches a five-minute lead window and six-figure deals, predictable beats clever.

It also matches what Real already has. Leo is three products today: CoPilot (the voice assistant), AiRM (autonomous overnight nurture with review-before-send), and HeyLeo (consumer search), all on the reZEN platform, serving roughly 33.5k agents and growing toward about 180k through the RE/MAX acquisition. Real's stated direction is to fold these into one AI layer. The morning command center reads naturally as that layer's morning face, and the skills below map onto work Leo's surfaces already do.

```
                              +-------------------------------+
   overnight signals  --->    |   LEO  (the orchestrator)     |
   (leads, replies,           |   - one triage pass           |
    deal dates, team          |   - scores, ranks, gates      |
    activity, comps)          |   - synthesizes ONE result    |
                              +---------------+---------------+
                                              |
              fans out to named skills (parallel, each narrow)
                                              |
   +-------------+-------------+--------------+--------------+-------------+
   |             |             |              |              |             |
[Lead       [Negotiation  [Pipeline     [Scheduling]  [Handoff /    [Document
 Qualif.]    Prep]         Pulse]                      Routing]      & Compliance
 new-lead    drafts a      watches deals  books and    picks the     QA]
 clock,      counter,      for silence,   confirms     right         contract
 first       finds comps,  flags drift    tours and    teammate by   and
 message     names what                   follow-ups   territory     deadline
             it cannot                                 and load      checks
             verify
   |             |             |              |              |             |
   +-------------+-------------+--------------+--------------+-------------+
                                              |
              each returns: a score, a confidence band,
              a one-line reason, and a source trace
                                              |
                                              v
                              +-------------------------------+
                              |  Leo synthesizes:             |
                              |  rank, suppress, gate by risk |
                              +---------------+---------------+
                                              |
                              +---------------+---------------+
                              |                               |
                         Needs you                      everything else
                       (the few cards)             Handled / FYI / Noise
                              |                               |
                        shown to Dana              folded into the ledger
                                                   ("47 handled overnight,
                                                    chose not to interrupt
                                                    you on 6")
```

The skills carry plain working names so the system stays drillable, but Dana lives one level up. She sees "Oak St counter is due," not "Negotiation Prep returned a draft with two unverified comps." The names exist for the deepest disclosure level and for the people building the system, not for her daily view.

There is a market angle here too. Across this category, oversight is the weakest shared edge: most AI tools ask for trust without showing their work. Named, drillable skills are open ground, which is why the system keeps real names internally and lets every claim resolve back to one.

## Signal tiers: suppress by default

Every signal a skill produces lands in one of four tiers. The default is silence. A signal has to earn its way up to Dana, not the other way around.

| Tier | What it means | Where it shows | Can it interrupt? |
|---|---|---|---|
| **Needs you** | High stake AND (Leo is uncertain OR the next step is irreversible) | A card at the top of Today | Yes, but rarely |
| **FYI** | Material and worth knowing, already handled or no action today | The collapsed digest row, below the fold | No |
| **Handled** | Leo did it, low risk, logged | The quiet ledger | No |
| **Noise** | Routine, resolved, spam, or after-hours static | Nowhere. Counted, not shown | No |

Suppress-by-default is not a style choice. It is the single most important orchestration rule. One wrong "urgent" flag poisons every flag after it, the cry-wolf effect: when most alerts are not worth acting on, people learn to ignore even the rare real one. So the system spends a small interruption budget on a few high-confidence items and routes everything else to a digest or the ledger. Precision is the headline metric, not coverage. The best alert is the one that arrives once, is right, and already has the next step attached.

This is why the ledger line reads exactly: "47 handled overnight, chose not to interrupt you on 6." The absence of an interruption is itself a designed, trustworthy signal. Dana sees the work without reading it, and she learns that when Leo does speak, it is worth listening to.

All of this is really one question: how Leo communicates across its five states.

- When Leo is **confident**, it acts on the low-risk work and reports it in the ledger and the review-activity log.
- When it is **uncertain**, it surfaces the item but shows a range and what it could not check, never a false precision. The counter-offer in the voice outbox is exactly this: "fairly sure," a value range, and a named list of what it could not verify.
- When it would otherwise be **wrong**, an undo window plus an acknowledge-and-correct recovery catches it, and a "needs your eyes" card beats a confident-but-wrong one.
- When nothing needs her, Leo stays **silent**, which the ledger line makes legible as a choice, not an absence.

Two safety rules keep suppression honest:

- **When in doubt, demote, do not hide.** A signal Leo cannot confidently rank does not get silently dropped. It lands in a "needs your eyes" state inside Today rather than a confident-but-wrong card. The system would rather leave something in the list than wrongly bury it.
- **A wrong tier is one tap to correct.** Each card carries a quiet "not important" control that retrains Leo's per-user model. Dana teaches the system where her line is.

## Three disclosure levels: the card, the why, the source

Every item Leo surfaces is honest at three depths, and Dana chooses how deep to go. Each level answers the next question she would actually ask.

```
  L1  THE CARD          "Oak St counter is due"
                        a calm line and a state color (the dot or edge).
                        Answers: what is this, how urgent.

  L2  ONE LINE OF WHY   "Buyer countered at $590K overnight. A fair
                        counter is $605K to $618K."  plus a confidence band.
                        Answers: why did Leo surface this, how sure is it.

  L3  THE SOURCE        which skill ran (Negotiation Prep), what it
                        checked, what it could NOT check, the document
                        and page (for example "Inspection report, p.4").
                        Answers: can I trust it, where did it come from.
```

The discipline at each level:

- **L1 is a glyph and a status, not an empty state.** "Nothing needs you" is a designed result. The calm header and the state-colored edge on each card carry the whole top-level read.
- **L2 explains why this surfaced, not how the model works.** One line, specific to this output. Never hiding the reason is the rule here: a tool that silently files things away and lets the human miss the consequence is the failure to avoid.
- **Confidence is a coarse word, never a fake percentage.** High, Medium, Low, or a range like "$605K to $618K." Categorical framing reads cleanly for a non-technical user, where "87% urgent" gets misread. In the prototype the counter-offer in the voice outbox shows a range and the two things it could not verify, not a precision score it cannot honestly defend.
- **L3 is always reachable.** Every claim drills down to the skill name and the source document. This is the "show your work" rule, and it is the part most competitors do not offer.

One thing the design deliberately treats as a question, not a settled fact: the confidence band shows by default at L2 because the gating logic already computes it, but whether showing it to Dana actually changes her decisions is a candidate to test, not a proven win. The band ships in the prototype; what an A/B would measure is whether seeing it helps her decide, not whether Leo uses it internally. Honest about the design's own uncertainty, the same way the design asks Leo to be.

## Risk-tiered handling: the riskier the action, the more deliberate the gate

Suppression decides what Dana sees. Risk tiering decides what Leo is allowed to do on its own before she sees it. The rule across every serious AI product is the same: the model proposes, the human disposes. The system grades that by stake.

| Risk | Examples | What Leo does | Human gate |
|---|---|---|---|
| **Low** | Reorder the list, tag a lead, log an overnight AiRM reply, draft an internal note | Acts, then logs it | None. One-tap reversible. Shows up only in the ledger |
| **Medium** | Schedule a follow-up, prep a counter draft, pre-write a first text, propose a handoff | Prepares it, stages it | **Glance and approve.** A cheap "here is what I will do" step Dana accepts or rejects |
| **High and irreversible** | Anything touching money, a contract, or a client relationship: send a counter-offer, reassign a lead, archive a thread | Drafts only. Sends nothing | **Mandatory human checkpoint** before anything leaves, with Leo's reasoning and confidence exposed. Then a short undo window |

The high-stakes rule is not negotiable, and it is already Real's pattern. CoPilot generates ready-made materials an agent reviews and approves with one click before they go out, and AiRM logs every overnight conversation in a portal the agent reviews: every message is reviewed before it is sent. The design is not inventing a behavior, it is making Real's own review-before-send the spine of the morning. Nothing client-facing leaves until Dana taps, and a short send-hold catches the obvious "wrong client" mistake right after she does.

The counter-offer in the voice outbox is exactly this. Leo drafts a counter at $612K on the 142 Oak St deal (listed $625K, offered $590K), shows the fair range of $605K to $618K and the two things it could not verify, and waits. "Send as me" is the only path out, then "Saved 9:41a" with an undo window.

Two more rules sharpen the gating:

- **Gate harder when money, contracts, or law are involved.** For anything contract-, compliance-, or money-adjacent, Leo runs a document-and-compliance scan before send and shows a short "here is what I will do, here is what I found" step. The counter-offer in the voice outbox is a high-stakes negotiation, so it gets the full gate even though a draft already exists.
- **Decline over guess.** When intent is ambiguous, or the question touches pricing or legal, Leo asks instead of drafting a confident guess. A "needs your eyes" card is a better outcome than a wrong draft Dana has to catch.

On delegation: when Leo hands a thread to a teammate (handoff and routing), Dana stays the accountable party. The nudge is attributed to Leo acting for her and stays visible in her own view. The prototype keeps a "take it back" affordance for exactly this reason.

## A worked morning: many signals resolve to a few cards

This is Dana's morning in the prototype, traced through the logic above. The app opens directly on the Today command center: the cards assemble, the trust ledger reads "47 handled overnight · 2 need you · 1 corrected," and the focus card sits at the top. There is no lock screen and no notification to tap. A live new lead is not the way in; it surfaces inside the work, on the team altitude, as an SLA breach (a hot lead waiting on Marcus) and in the round-robin routing of overnight leads.

Overnight, the skills run in parallel and produce a stream of raw signals. The orchestrator classifies their outputs into a clean split:

- **47 auto-handled**, rolled into the ledger (of which 6 were near-misses Leo could have pinged on and chose not to).
- **12 FYI updates** worth knowing, collapsed into the digest row below the fold.
- **2 escalate to Needs you** on the Today altitude, the two judgment cards. A third Needs you item lives on the My-team altitude: a team SLA breach, surfaced where the team is read, not counted in Today's two.

That arithmetic is the whole story in one line: 47 handled, 12 in the digest, 2 surfaced on Today, and the rest (spam leads, duplicate inquiries, after-hours static) dropped to Noise, counted but not shown. Only 2 of everything that happened cross the bar to interrupt her on Today, with one more waiting on the team altitude.

A sample of how individual signals sort:

| Signal | Skill | Stake | Confidence | Reversible? | Tier |
|---|---|---|---|---|---|
| 142 Oak St buyer countered at $590K, response due today | Negotiation Prep | High | Medium (2 comps unverified) | No (a counter is a commitment) | **Needs you** |
| A hot lead has waited 3h 12m on Marcus, who is in a showing | Pipeline Pulse + routing | High | High | Reaching out is reversible, losing the lead is not | **Needs you** (My-team altitude) |
| Crestview deal has gone quiet 4 days, nudge or hold | Pipeline Pulse | High | Medium (leaning yes a soft nudge helps) | Reaching out is reversible | **Needs you** |
| AiRM lead replies sent and logged overnight | Lead Qualification | Low | High | Yes | Handled |
| 6 near-misses Leo could have pinged on, chose not to | various | Low | High | Yes | Handled |
| Routine status updates, comps refreshed, a tour confirmed | various | Low | High | Yes | Handled |
| 12 deal and listing updates with no action today (7 Birch Ln, 14 Cedar, 3 Harlow and others) | various | Medium | Medium | n/a today | FYI (digest) |
| Spam leads, duplicate inquiries, after-hours noise | triage | none | n/a | n/a | Noise |

**Leo synthesizes.** Three signals clear the Needs you bar (high stake AND uncertain-or-irreversible), and they land at two altitudes. Two are judgment calls for Dana on Today, ranked by what is most pressing: the drafted counter-offer waiting in the voice outbox, and the Crestview deal that has gone quiet four days. The third, the team SLA breach (a hot lead waiting on Marcus, who is in a showing), surfaces on the My-team altitude where the team is read, so it is not one of Today's two. The 12 FYI items sit in the digest row, visible without shouting. Everything else, the 47 handled and the noise, rolls into the ledger and the count, which is what produces the line: "47 handled overnight, chose not to interrupt you on 6."

**Dana acts.** Two judgment calls on Today, plus one on the team altitude, each at the right gate:

- The counter-offer opens in the voice outbox (high stake): Leo drafted $612K, showed the $605K to $618K range and the unknowns, and sent nothing. She reviews it and taps "Send as me."
- The Crestview deal opens the deal-risk nudge (uncertain): the buyers went quiet four days after the inspection, and Leo is leaning yes a soft nudge helps, so it offers two options instead of guessing. Dana picks one.
- On the My-team altitude, the SLA breach is a routing call (high stake, time-critical): a hot lead has waited 3h 12m on Marcus, who is in a showing. Leo proposes routing it to Priya, who is healthy and replies fastest, with the context attached. Dana confirms and keeps the take-it-back option.

Then she puts the phone down. The screen did the triage. She made the two Today calls, cleared the one team card, and kept every irreversible one in her own hands.

## KPIs to watch

These measure the one thing that matters for this team lead: trust made measurable, not engagement minutes. Engagement is the wrong goal for a tool whose promise is to get out of the way.

| KPI | What it tells us | Healthy direction |
|---|---|---|
| **Escalation rate** (share of overnight signals that become Needs you cards) | Is suppression working, or is Leo crying wolf | A stable band of about **5 to 15 percent**. A handful of cards a day, not a feed. Spiking up means precision is slipping; near zero for days may mean the system is over-suppressing and hiding real work |
| **Accept-without-edit rate on drafts** | Are Leo's drafts good enough to trust at a glance | Rising over time. This is calibrated trust forming, Dana leaning on Leo for the easy work. Watch the inverse too: a sudden drop flags a quality regression |
| **Undo and "not important" rate** | Are we sending or surfacing the wrong things | Low and falling, under about 5 percent. A rising undo rate on high-stakes sends is the loudest possible signal that gating is too loose |
| **Setting churn on the autonomy threshold** | Has Dana settled on how much to let Leo do | Stabilizing. Constant fiddling means trust is not yet earned |
| **Time to first decision** | Did the morning get faster and calmer | Falling toward a few minutes. The promise is a few minutes deciding, not a stretch hunting through screens |

Two guardrails on reading these. First, watch escalation rate and undo rate together: driving escalations to zero would game the first number while quietly hiding real work, which the demote-don't-hide rule exists to prevent. Second, accept-without-edit can be gamed by drafting bland, safe replies, so pair it with the undo rate and with Dana's own "not important" feedback, which is the per-user retraining loop doing its job. The numbers are honest only when read against each other, the same way Leo's confidence is only honest when it shows what it could not check.

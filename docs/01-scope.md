# Scope

One page on the slice, what it is not, and why this slice.

## The slice

**The morning triage for a real-estate team lead, on mobile, in a dark premium system.** One coded prototype (prototype/command-center.html) that resolves a real morning for Dana Reyes, who runs a small team and fronts Real's AI, Leo.

It opens before she does. There is no home screen and no menu: the app opens straight to the Today morning command center. The morning assembles in front of her, cards rising into place, anchored by the trust ledger across the top, one honest line: "47 handled overnight · 2 need you · 1 corrected." Below it the triage waits, the top focus card first. That is the front door.

From there the command center shows the few things that need her:

- The triage: one ranked list across her own deals and her team's, ordered by severity. One focus card, then a collapsed queue. The Crestview deal surfaces after going quiet for four days; the rest stay quiet.
- A collapsible dashboard glance ("$14.2M pipeline · 22 live · on track") and a review-activity log that opens the "47 handled" into who and what each agent did, each with a provenance stamp.

What the build is, the real screens and flows:

- **Today**, the morning command center: the trust ledger, an altitude toggle that switches My deals and My team over one ranked list, the triage, the dashboard glance, and the review-activity log.
- **Day**, a timeline of stops each prepped by an agent: the 9:00 Oak St counter call, the 11:00 Lakeside showing, the 16:00 Bennett close.
- **Team**, the deeper view: KPIs, six agent rows, a by-region rollup, and a downloadable team report.
- **Leads**, ICP-scored new leads round-robined across the team; tap to reassign, long-press to multi-select for a bulk move.
- **AI states**, the legend for how Leo speaks: Thinking, Uncertain, Confident, Silent, Wrong/corrected.
- **Orchestration**, how 100+ agents are filtered by confidence, stakes, and needs-your-voice down to the few that reach her.

Across these, the nine signature microinteractions carry the behavior: the uncertainty hand-up, the Fair-Housing tripwire, the source-of-truth reconciler, confident-but-reversible, silent-then-reveal, the voice-required outbox, the acted-then-uncertain anomaly, round-robin propose/dispose, and the agent-coaching nudge. Undo and quiet error states run throughout.

## The five AI states the slice has to earn

A morning surface lives or dies on how the AI behaves when it is not sure. So the slice carries all five:

- **Thinking:** the morning assembles in front of her, cards rising into place, a transient state that reads as the AI doing its work, not a spinner.
- **Confident:** the trust ledger and the review-activity log state plainly what Leo handled.
- **Uncertain:** the counter-offer in the voice outbox says "fairly sure," shows a value range ($605K to $618K against a $625K list and a $590K offer), and names what it could not check, then waits to send.
- **Wrong:** an undo window, then acknowledge-and-correct recovery, so a mistake is reversible and honest.
- **Silent:** the ledger treats restraint as a designed signal. "Chose not to interrupt you on 6" is a decision, not a gap.

## Why dark, done with discipline

A dark canvas is the genre default for an AI product, and dark plus glow plus generic cards is what every AI demo ships, so it reads as slop. The honest answer was not to flee to light but to earn the dark: a chosen emerald on near-black instead of a default, no glow doing the work, and a warm sand reserved strictly for what needs a human. Done that way the screen reads as a quiet, expensive instrument you open before dawn, the mood a morning command center wants. A full light theme ships alongside it for daylight reading, the same tokens flipped, but the disciplined dark is the considered default, not a reflex.

## The cut list (and why each is cut)

- **No listing search.** Property is the least interesting object for a team lead. HeyLeo already serves consumer search; it is not Dana's morning.
- **No agent-config or rule-builder.** The AI routes, the human supervises. A lead should not have to configure the swarm. Controls (mute a signal, mark "not important") live inline on the item they affect, never in a settings tab.
- **No vanity leaderboard.** Ranking teammates against each other is a vanity metric that turns a calm surface into a scoreboard. The team shows up only as who can act now.
- **No notification-count maximalism.** The screen decides priority; a badge that counts everything re-creates the noise we are removing. The 12-update FYI digest is one quiet line she can open, not a number screaming for attention.
- **No full chatbot as the whole UX.** Leo is one affordance, not the spine: no fake name, no avatar, no chat-buddy voice. A busy lead trusts a tool that is right, not one that is friendly. Conversation stays an option, not the architecture.
- **No onboarding or settings.** This is a glance before coffee, not an admin tool. Both are downstream of the front door, so neither is in this slice.

## Reading the brief honestly

The brief points at "100+ agents." Real's actual architecture is one Leo, many skills: CoPilot (voice assistant), AiRM (autonomous overnight nurture with review-before-send), and HeyLeo (consumer search), on the reZEN platform, roughly 33.5k agents today and growing toward 180k through the RE/MAX acquisition. Designing a 100-agent taxonomy would have been a category error. The unowned ground, the thing no competitor holds, is calm triage with the reasoning shown, for a team lead reading across her own deals and her team's. Every serious competitor races to do more. This slice competes on subtraction and judgment, and it earns the right to be the front door by being the one screen that decides what is worth her morning.

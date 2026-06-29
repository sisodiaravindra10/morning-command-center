# User Portrait: Dana Reyes, the team lead

The morning command center is built for one person, chosen on purpose and held for the whole design. Building for every agent is how a product sprawls into a feature list. This portrait fixes the aim: it is grounded in field research, with the verified facts kept separate from the directional ones, so the design that follows answers a real person and not an assumption.

## Who she is

**Dana Reyes, 41. The Reyes Group. 14 years in the business.**

She runs a 7-person team: 4 buyer's agents, 1 junior listing agent, a shared transaction coordinator, and a part-time inside sales agent. Last year she personally closed about 22 sides (around $9.5M); the team closed about 95. Her own commission is still her biggest line. The override on the team's production is the bet she is making on her next five years.

Dana is the rainmaker who became a manager without ever stopping being a producer. She became a manager by being the best agent, not the best coach, and she is not sure she is good at the second job. The trade press names this exact tension: the pull to "get out of production" and lead, against the reality that her own production is still the engine that pays the bills (reported: REDX; Inman, scaling teams; Tom Ferry, teams). It is a classic player-coach problem, and it is hard by design: selling rewards personal performance, leadership rewards getting performance out of others, and asking one person to do both means leadership gets the leftovers (reported: Sitkins).

On Real, Dana is also an owner. She is chasing her cap, which converts to a REAX stock award, and building a revenue-share network. That owner altitude is structurally Real's: her cap progress and her revenue-share network are first-class data inside the same platform that reads her morning. A tool bolted on top of Zillow or Compass would have to reconstruct that from the outside, if it could see it at all. This is the clearest reason the product is "why Real" and not "why anyone."

## She lives at two altitudes, and they fight each other

Dana takes every listing appointment that matters and runs the high-stakes negotiations herself. She also recruits, trains, and (reluctantly) holds the team accountable. These are not two jobs she does at two times of day. They fight for the same hours.

When she goes deep on her own $1.2M listing, the team's lead-response clock runs unwatched. When she stops to coach an agent who is fumbling follow-up, her own buyer is texting "are we still on for 6?" There is no altitude where she is safe to relax. And the switching itself is a tax: research the trade press cites puts the productivity cost of moving between tasks at up to 40% (reported: Sitkins, citing APA). Today that switch costs her a full context reload every time, reconstructed by hand across separate apps.

The product's real job is to make holding both altitudes cheap: one ranked list across her own deals and the team's, where altitude is a quiet badge, not a separate screen she has to go find.

## Her morning, specifically

The day starts on a phone, not a desk. Coaching culture pushes an early, planned start: Tom Ferry's "perfect day" begins at 5:00 with movement and mindset before any business, and one RE/MAX Hall of Famer describes waking at 5:00 and lead-generating by 7:00, sending texts and emails in the earliest hours before anyone is awake to call (reported: Tom Ferry; Follow Up Boss). Whether or not Dana is that disciplined, her first contact with the business is a glance at the phone.

Around 6:40, one-handed, before she is at a desk and before she has a plan for the day, she does a short triage of loose threads: overnight status changes, missed texts, new leads, and the dread question, did anything slip overnight. There is no single calm surface for this today. She reconstructs it from notification badges scattered across apps. The agent literature is blunt about the risk: the moment you open your inbox, you have handed your day to whoever shouted loudest, which is why coaches tell producers to ignore everything except true emergencies first thing and spend the first hour on planned contacts, not a reactive feed (reported: Follow Up Boss; Community Influencer). A naive notification feed is that exact problem at large scale. The win is a screen that decides the priority for her instead of letting the noisiest sender decide it.

This is the moment the prototype (prototype/command-center.html) is built for. The app opens directly to the Today morning command center: the cards assemble, anchored by the trust ledger at the top ("47 handled overnight, 2 need you, 1 corrected") and the top focus card of the triage. The speed-to-lead pressure she lives with surfaces in-product, not as a launch screen: on the team altitude it is the SLA-breach card (a hot lead waiting on Marcus) and the round-robin routing, and Leo's review-before-send shows up as the drafted counter-offer in the voice outbox. The triage glance is the product, and the command center is where it actually happens.

## What she dreads, misses, and lives with

- **Dreads:** a deal dying in silence and discovered at closing. A compliance or contingency deadline missed. A hot lead going cold while she is in a showing. Not knowing which of 30 active conversations actually needs her. These are not abstract fears: most pending deals do close, but the few that fall through die for predictable, dated reasons (inspection findings, financing, cold feet, appraisal gaps) that are largely visible days in advance (reported: NAR Confidence Index; HomeLight). The dread is real precisely because the warning signs were there and no one was watching.
- **Misses:** the early, quiet signal. The teammate's buyer who is drifting. The inspection objection nobody flagged. The lead that sat because the wrong person, or no one, responded.
- **Lives with:** the context-switching tax, being the bottleneck, and suspecting (not knowing) that two of her agents are not following up.
- **Has stopped complaining about:** flaky notifications, tools that do not talk to each other, and software that is confidently wrong. This is the emotional core. Every prior tool spent her trust, so trust is now the scarce resource. A confidently-wrong AI does not just error for Dana, it re-confirms a learned helplessness ("see, I still have to check everything myself").

## The speed-to-lead clock, all morning

The hardest time-sensitive thing in Dana's world is a new online lead. The rule practitioners live by is to make contact within 5 minutes, and top producers aim for under 2 (verified: Inman). The stakes behind the rule are heavily cited in the industry: the odds of even contacting a lead, and of qualifying it, fall sharply between a 5-minute and a 30-minute response, while the average agent takes many hours (reported, widely cited, independent re-verification cut short). For a team lead this is doubly hard. A lead can land while she is in a showing or coaching, so the real question is not "respond fast," it is "did the right person respond fast, or did it just sit." Tools already automate the first touch (auto-text, multi-step action plans, routing inbound calls to a ring group) (reported: Follow Up Boss), but she still has to trust that it happened. That gap between automated and trusted is the whole opening for this product.

## What the tools get wrong today

Dana runs the day from a CRM (Follow Up Boss or BoldTrail), transaction management (Dotloop or SkySlope), the MLS, a pile of texting threads, and Real's Leo. Each is competent on its own. None of them tells her, in one place, the three things that need a human this morning across her own deals and her team's. They show her everything (dashboards, inboxes, counts) and make her do the triage. They surface activity, not judgment. That is the one core problem the morning command center exists to solve, and everything in the design is downstream of it.

One piece of the answer already exists inside Real and is worth naming, because it is the pattern the design leans on. Real's Leo AiRM lets a lead watch every Leo-to-buyer conversation in real time and review every outbound message before it sends (verified: Real). That review-before-send behavior is exactly what Leo's drafted counter-offer models in the prototype, the one held in the voice outbox: Leo drafts a counter-offer, shows how sure it is and what it could not check, and waits for her approval before anything goes out.

## The AI reality check

Dana is a practitioner, and practitioners are skeptical. Much "AI-powered" tooling is seen as a buzzword on an unchanged product with a chatbot bolted on. As one agent put it, "Most of it is hype" (verified: Inman). Adoption is high, but the real gains concentrate among a few power users (reported: HousingWire). Today AI mostly helps with content and admin (listing descriptions, emails, market data), not the deal-making judgment that is the actual job (verified: Inman).

The lesson for the design is direct: earn trust by being calm, by being honest about how sure it is, and by reviewing before it sends, never by promising magic. Dana does not need more information. She needs less, ranked, and honest about its own confidence. The screen should name the uncomfortable thing first, and it must prove, every morning, that it considered things and chose well, including what it chose not to bother her with. The ledger line carries that proof: "47 handled overnight, chose not to interrupt you on 6." For a user trained to distrust software, that proof of restraint is the whole relationship.

## How sure we are about all this

Because the product is itself about calibrated confidence, the portrait keeps the same honesty. The strongest claims here are verified: the 5-minute speed-to-lead rule, Real's review-before-send AiRM pattern, and practitioner skepticism that most AI is hype all cleared an adversarial check. The early-morning, phone-first triage and the protected morning block come from reputable coaching and practitioner sources (Tom Ferry, Follow Up Boss) but their independent re-verification was cut short, so they are directional rather than settled. Two tempting stats (a "40,000 agents average 90-minute response" figure and a "$50,000 a month AI lead-gen" anecdote) were refuted and are deliberately left out. The portrait leads with what is verified and flags the rest.

## Who this is not for

Sharpening by exclusion keeps the design honest. The morning command center is not for:

- **A solo agent with no team.** Bigger market, but a solo agent lives at one altitude. The product's entire reason to exist is the second altitude and the daily fight between the two. Remove the team and the command center premise dissolves.
- **A brokerage admin or broker-owner.** A real buyer, but they want roll-up dashboards and compliance reporting, which is the opposite of a calm, personal morning screen. That is a desktop product for a different person, later.
- **The agent who wants to browse listings.** A listing is the least interesting thing on this screen.
- **Anyone who wants a 100-agent status grid.** No one wants to babysit a wall of statuses. Dana wants the few items that need a human, not a monitoring console.

If a screen would serve one of those people better than it serves Dana, it does not belong in this build.

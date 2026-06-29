# Feature Exploration · What we'd build next

New features for the Leo Morning Command Center, each pushed toward three goals: **lower cognitive load**, **more visual appeal**, **deeper agentic approach**. Generated across four lenses (cognitive-load, agentic-depth, novel-interaction, domain), then curated and scored. Nothing here repeats what's already built (triage feed, deal detail + trace, tabs, Silence Ledger, handback, the 5 AI states, time-aware theme).

Scoring: **Load** = how much it removes from Dana's head (Strong / Solid / Some) · **Visual** & **Agentic** (High / Med / Low) · **Effort** to prototype (S / M / L).

---

> **Prototyped:** the top 4 are built as standalone interactive demos in `../prototype/features/` (spoken-brief, pulse-strip, stake-lensing, autonomy-dial). See the README.

## ★ Top 5 to prototype first

1. **The Spoken Brief (karaoke triage)** - a 60-90s voice walk of the night, words highlighting in Leo's serif voice as each card rises under a read-cursor; tilt or swipe to bank/defer, hands-free. *Voice-first (true to Real), one-handed, pre-coffee, panel-stopping. The front door.* `Load: Strong · Visual: High · Agentic: High · L`
2. **The Pulse Strip (deal vital signs)** - every live deal as a calm EKG strip; the one going quiet doesn't beep, it **flatlines, dims, drops a hairline**. *The most precise answer to her dread (a deal dying in silence); 12 deals in one glance; pure front-end motion.* `Load: Strong · Visual: High · Agentic: High · M`
3. **Stake Lensing (watch it re-rank)** - on open, the feed shows yesterday's order then **physically re-sorts** into today's stakes (sub-second FLIP), each card tagged "why it moved"; pinch to swap the axis (Deadline / Dollars / Relationship / Owner). *Makes the ranking, which is the product, visible and earned.* `Load: Strong · Visual: High · Agentic: High · M`
4. **Standing Orders + Autonomy Dial** - per-task-type earned autonomy on a 4-stop leash (Ask → Draft → Send & log → Handle), proposed only after a clean approval streak, revocable in one tap, each showing its live track record. *The deepest agentic feature and the direct antidote to learned helplessness: Leo earns trust instead of spending it.* `Load: Strong · Visual: High · Agentic: High · M`
5. **Watch Leo Work (the glass checkpoint)** - approve a multi-step action and watch reversible steps self-execute, then **stop cold at a glass line** where the irreversible, outbound steps wait for you. *Real's review-before-send as a felt spatial moment; supervise by exception.* `Load: Solid · Visual: High · Agentic: High · M`

---

## The full set, grouped

### Entry & exit rituals (protect attention)
- **The Spoken Brief** - see above. `Strong · High · High · L`
- **Focus Mode (just the few, to zero)** - dissolve everything to one full-bleed decision at a time; a progress arc closes one notch per cleared item; ends on a "you're clear, Leo's watching the rest" exhale. A day with a closing announces itself. `Strong · High · Med · M`
- **End-of-Day Wind-Down** - an evening ritual that names the few genuinely-open threads, states Leo's overnight plan for each ("I'll watch the appraisal, wake you only if it moves"), and lets you "close the day." Bookends the morning brief. `Strong · High · High · S`
- **Batch Bundles** - when five items need the same action, Leo collapses them into one card with five tailored drafts and a single "send all" (per-row override). Kills repeated identical decisions. `Strong · Med · High · S`

### Glanceable deal health (visual + load)
- **The Pulse Strip** - see above. `Strong · High · High · M`
- **Stake Lensing** - see above. `Strong · High · High · M`
- **Sphere Tide (relationships drifting back)** - past clients as soft dots at distance; a few **drift inward** as their signal strengthens (5-7yr move window, comps spiking, rate drop, a life event), the nearest carrying Leo's reason + a drafted opener. A rainmaker's future GCI, surfaced. `Strong · High · High · M`

### Earned autonomy & trust (agentic spine)
- **Standing Orders + Autonomy Dial** - see above. `Strong · High · High · M`
- **Watch Leo Work (glass checkpoint)** - see above. `Solid · High · High · M`
- **Visible Agent Memory (teach once, fans out)** - Leo's editable first-person memory of *your judgment* ("you never send deadlines after 8pm, learned from 6 edits"), each with provenance + Keep/Tune/Forget; correcting one rule draws lines that light up every other skill that just learned it. `Med · High · High · M`
- **Quiet Hours Recap (work with receipts)** - a replayable record of the texts Leo actually sent clients overnight, including the one where it **detected anxiety and held back for you**. Trust earned by showing the labor, not claiming it. `Strong · Med · High · M`

### Orchestration made tangible
- **The Relay (where confidence broke)** - a thin skill-chain on a card showing the baton-pass between Leo skills (Inbox Watcher → Deadline Tracker → Lender Liaison → you), ending exactly where confidence dropped and it escalated. A luminous baton travels the chain and stops at your avatar. `Solid · High · High · M`
- **Night Timeline (scrub the overnight)** - a thin 10pm-to-now band; drag to **bloom** any one of the night's 100+ skill-actions into a plain line; only the 2 that escalated pulse. The spatial companion to the Silence Ledger's counts. `Med · High · High · M`

### Two-altitude & team
- **Altitude Toggle + Cap Climb** - a vertical drag handle: pull down into Producer altitude (your deals, warm/intimate), push up into Owner altitude (cap progress → REAX stock, revenue-share constellation, recruiting) as the horizon literally rises. One gesture for the two-altitude tension. `Solid · High · Med · L`
- **The Bench (coach the one who needs you)** - seven teammate avatars as a calm roster; one softly pulses because their deal went quiet and they haven't noticed, with a private nudge or a "coach me" script. Coaching as intervention timing, never a leaderboard. `Strong · Med · High · M`

---

## Honest notes (what to cut / watch)
- **Cut for the prototype:** a haptic/sound "felt-state grammar" (barely demos in a web prototype) and a static "stakes spine" (Stake Lensing's motion version replaces it).
- **Overlap fatigue:** Quiet Hours Recap, Night Timeline, and The Relay all narrate overnight work. Ship at most two of the three in one demo or they blur.
- **Share the plumbing:** Standing Orders, Visible Agent Memory, and the Autonomy Dial must share ONE event-log + rules store, or they'll feel like three separate apps instead of one colleague.

## How this maps to the assignment
This doubles as the **"what I'd build with an extra week"** material and as proof of vision. Every feature ties to Dana's real day and to Real's actual Leo (voice-first, alert-only-when-needed, review-before-send), and each is defensible on the rubric's heaviest axes: agentic orchestration and what intelligence *feels* like.

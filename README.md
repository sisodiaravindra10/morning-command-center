# Real, Lead AI Product Designer, take-home
### The morning command center for a real-estate team lead, by Ravindra Sisodia

A calm mobile surface a real-estate team lead opens each morning. Not a dashboard. The few things that actually need a human, ranked by what is at stake, with the rest provably handled overnight by Leo. It fronts Real's AI the way a good chief of staff fronts a busy team: it does the sorting, the human keeps the judgment.

## Open the showcase

The fastest way in is **[index.html](index.html)**, the visual front door that links everything: the lead prototype, the product films, the iteration story ("how I got here"), the seven required deliverables mapped to the brief, and the full range I explored. If you prefer text, the same package is laid out below.

## Start with the prototype

Open `prototype/command-center.html` in any modern browser (best on a laptop; it renders a phone). A three-step welcome sets the morning (a hundred agents overnight, the noise sorted, only what needs you), then it opens into the Today command center. The status pill is a live Dynamic Island that morphs to carry Leo's notices, starting with the new lead the moment you arrive. The command center itself:

1. A calm visual header opens it. The top of Today is a globe banner: a faded, slowly rotating periwinkle world (a real WebGL globe over a static fallback, so it reads either way) with Leo's live portfolio read alongside, "$14.2M pipeline, 22 live across 6 metros." The banner stays pinned as the triage scrolls up over it.
2. The cards rise in. Anchored at the top is the trust ledger, which reads "47 handled overnight · 2 need you · 1 corrected." That is the first beat: proof the night was handled before anything asks for you.
3. Below it, the triage. One focus card at a time, the rest collapsed, ranked by what is at stake across your own deals and your team's.
4. The few things that need judgment, in order:
   - **A deal-risk nudge on one of your own deals:** the Crestview deal has gone quiet four days. Leo is "62% sure" a soft nudge helps and offers two reads, send it or hold.
   - **A voice-required outbox:** three messages drafted but needing your actual voice, including Leo's counter on Oak St ("hold at $612K with a 30-day close") that you review before it sends. Nothing leaves until you tap "Send as me."
   - **Your team's risk, ranked alongside:** an SLA breach (a hot lead has waited 3h 12m on Marcus, in a showing) with reassign or round-robin routing in one tap.
   - **The Fair-Housing tripwire:** Leo almost sent an outreach line that reads as steering, held it, and rewrote it. The responsible-AI moment, surfaced as its own card.

Switch **My deals ↔ My team** to move altitude. For a guided way in, the **Take the tour** button under the phone walks the morning one step at a time: it steps through the trust ledger, the altitude toggle, the focus card, the Dynamic Island, the team SLA breach, the tab bar, the orchestration funnel, and the AI-states legend, driving the app into each state as it explains it, including the busier morning that reveals the Fair-Housing and security guardrail cards. Every action is live too: adjudicate the Marsh conflict, open the voice outbox, or override an agent and watch it offer to learn.

The whole thing is one self-contained HTML file: CSS, a little vanilla JavaScript, and the three onboarding photos embedded inline as data URIs, so it renders the same whether you open it from a server, straight off disk, or anywhere you move it. Motion is CSS only and honors reduced motion. There is no build step, nothing to install, and nothing external to fetch.

## The thinking (`docs/`)

| # | Deliverable | File |
|---|---|---|
| 01 | Scope (one page): the slice, the cut list, the brief interrogated | [docs/01-scope.md](docs/01-scope.md) |
| 02 | User portrait: Dana the team lead, grounded in research | [docs/02-user-portrait.md](docs/02-user-portrait.md) |
| 03 | Core experience: the screens, the AI states, the edge case, the non-obvious interaction | [docs/03-core-experience.md](docs/03-core-experience.md) |
| 04 | Agent orchestration logic: how one Leo and many skills become one calm surface | [docs/04-orchestration-logic.md](docs/04-orchestration-logic.md) |
| 05 | Microinteraction spec: the motions, by AI state | [docs/05-microinteraction-spec.md](docs/05-microinteraction-spec.md) |
| 06 | Design rationale and the honest dead ends | [docs/06-design-rationale-and-dead-ends.md](docs/06-design-rationale-and-dead-ends.md) |
| 07 | AI-tool annotation: where AI helped, and where I overrode it | [docs/07-ai-tool-annotation.md](docs/07-ai-tool-annotation.md) |
| 08 | Figma breadth spec: the screens and components to build out | [docs/08-figma-breadth-spec.md](docs/08-figma-breadth-spec.md) |
| 09 | Design system: type, color, components, motion, and the anti-slop rules | [docs/09-design-system.md](docs/09-design-system.md) |

For the walkthrough, open the slide deck: [deck.html](deck.html).

## How I built it (the process)

[PROCESS.md](PROCESS.md) is the end-to-end build journal: the order things happened in, the decisions that turned the work, and the dead ends I kept because they earned their place. It connects the rationale (doc 06) and the AI-tool account (doc 07) into one chronology, from reading the brief through the warm-light detour to the disciplined dark, and it carries through the most recent screen-by-screen craft pass, staying honest about what is done and what is still ahead.

## The range I explored (`explorations/`)

The lead is one prototype, but it came from a lot of trying and cutting. [explorations/index.html](explorations/index.html) is the appendix that shows how much changed on the way: 30 concepts across two waves, 22 built feature demos, 3 interaction models, 5 visual directions and 20 fused variants, plus 10 aesthetic studies and the keynote films. It includes the honest detour (a warm-light version a reviewer pushed for) that did not survive. The explorations are kept in their original styles on purpose, because they are the journey, not the destination.

## With another week

With another week, I would put this in front of a real team lead and tune the one number that matters, the interrupt threshold, against their actual morning. I would wire the responsible-AI behavior (the confidence read, review-before-send, the owned misses) onto one shared event log, so Leo visibly audits and corrects itself. And I would build the desktop war room the mobile deliberately defers, proving the phone-to-desktop hand-off with no context reload.

## On the prototype and Figma

The coded prototype is the source of truth for the visual system. The one piece left to assemble by hand is the Figma file, specified frame by frame in [docs/08-figma-breadth-spec.md](docs/08-figma-breadth-spec.md).

## The AI states, and where to see them

- **Confident:** the review activity and the overnight ledger ("47 handled overnight, 2 need you, 1 corrected").
- **Uncertain:** the counter-offer in the voice outbox. Leo says it is "fairly sure", gives a range ($605K to $618K, and it would pick $612K), and names what it could not check before you send.
- **Wrong:** every action has a quiet undo window, and a correction that teaches.
- **Silent:** the ledger gives silence a surface, proof Leo considered things and chose not to interrupt.

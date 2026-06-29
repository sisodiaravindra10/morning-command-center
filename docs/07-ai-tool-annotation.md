# Where AI helped build this, honestly

The morning command center argues for one deal: the model proposes, the human disposes. This document holds the build to the same standard. AI did a lot of the proposing here, and it was fast at it. The judgment, the part that decides whether a proposal ships, stayed human. Below is what the tools actually did, written as prompt, then what was kept, then what was reworked, with the specific places the model's default was wrong and was overridden. The overrides are the point.

## What AI did, and what was kept

AI was the spine of the work in three places: gathering and citing the research, authoring the design system in a form the coding model could read back, and writing the prototype (prototype/command-center.html) as one self-contained file with real motion and real state.

The prototype is mostly the reason AI earned its keep. A morning triage product is not pixels sitting still. It is timing and state: the command center assembling at open, the trust ledger resolving to "47 handled overnight, 2 need you, 1 corrected," the triage ordering itself by severity, a confidence chip softening from calm to caution, an AI-state dot moving from thinking to confident, an undo bar counting down five seconds in real time. None of that is true in a flat mockup. You have to build it to feel whether the calm holds while the screen is doing work. The model is genuinely fast at the first eighty percent of that: the layout, the color tokens, the keyframes, the event wiring. That speed is what was kept. It freed the hours for the twenty percent that decides whether this reads as a considered product or a tech demo.

The same shape ran on the exploration itself. The product argues for an orchestrator that fans work out to per-signal workers and keeps a human on the irreversible calls. The design process ran the same way on purpose: parallel agents explored many directions at once, then a fixed rule set scored every result against one anti-slop checklist (no dark mesh, no neon glow, no three identical feature cards, no purple-to-blue AI gradient, no fake big-number hero, no decorative motion, no emoji, no em-dashes). Anything that broke a rule was cut before any human taste was applied. Wide search, then single-point human judgment to narrow. That is the same trust shape the product sells to Dana.

What was kept from the research pass: well-sourced facts, used as load-bearing. The five-minute response multiplier is why a stalled hot lead drives the team SLA-breach card and the round-robin routing. Confidence is a coarse word and never a fake percentage because categorical High, Medium, Low reads clearest and a number like "87 percent" gets misread. The ledger and the digest exist because a flood of false alerts trains people to ignore the real one. What was not kept: the soft vendor numbers. Those stayed in the supporting case but never carry a design decision on their own. The tool gathered breadth. A human decided what was solid enough to build on.

## The overrides, where the model was wrong

Each override below is really about one of the four ways Leo has to speak: when it is confident, when it is unsure, when it is wrong, and when it stays silent. The model's default got at least one of those four wrong every time. In a senior review the overrides are more honest evidence than the wins, so here they are.

### From generic dark to a disciplined dark

The genre default for an "AI product" is a dark canvas with glow and generic cards. The model reached straight for it, and it read as slop. Not because dark is ugly, but because dark plus glow plus generic cards is exactly what every AI demo looks like, so it lands as none of them in particular. The first override pushed all the way to a warm editorial light, to prove the surface could carry itself with no atmosphere to hide behind. That detour did its job, it forced the craft into the open. The final system brings the atmosphere back, but earns it: a chosen periwinkle-on-near-black palette instead of a default, no glow, and a warm sand reserved for what needs a human. The lesson that survived both moves is the real one. The slop was never the color, it was reaching for the category default instead of making a choice. This is the call the whole surface rests on.

### From a fake percentage to an honest range

This is the uncertain state, and it is the heart of the counter-offer in the voice outbox. For the counter-offer on 142 Oak St, the model first produced a clean confidence number, the "87 percent confident" pattern. It looks precise and authoritative. It is also exactly the pattern that gets misread, and false precision is worse than honest vagueness for someone who has been burned by flaky tools. The override happened twice. Confidence became a coarse word, "fairly sure," not a number. And the counter itself is shown as a value range with a recommended point inside it: a fair counter is $605K to $618K, with $612K as the pick, against a listed $625K and an offer of $590K. Next to it sits a plain line naming what Leo could not check. A range that admits its own width, and a system that names its blind spots, is more honest than a single number pretending to certainty. Honesty was the feature. The percentage was theater.

### From a generic spinner to a named wait

This is the thinking moment, the seam between unsure and confident. When a Leo skill is still resolving, the model's default is a spinner: motion that says "wait" and nothing else. The override was a named skeleton that says what is being checked, for example "checking 14 comps" while the counter-offer resolves. A spinner is decorative motion, which the product forbids. A named wait does work a spinner cannot: it shows the reasoning mid-flight, so the human can see what is being checked before they ever see a result. The spinner hid the work. The named wait shows it, which is the whole trust thesis in one small detail.

### Reset and replay, built so the demo can fail safely

This is the wrong state, and it is the one the model under-built. The five AI states had to be real, reduced-motion-aware, and recoverable, not a happy-path animation. The model gave a clean structure and good easing, and that was kept. What was reworked was the reset and replay logic. "Replay morning" had to fully restore the prototype to the Today command center mid-assembly, the trust ledger and the triage back to their starting state, so the wrong-and-recover path can be shown live without reloading or leaving stale data behind. And the recovery itself had to be a live transition, not a static screen: a five-second undo window, then an acknowledge-and-correct path if the window closes. A static mockup can draw an error. It cannot show the deal stepping back from one. That recoverable motion is the part that had to be built, not drawn.

### Banning the slop register from the copy

This runs under all four states, because the voice is how Leo sounds whether it is sure, unsure, wrong, or quiet. The model reaches for "elevate," "seamless," "synergize," "unleash," "delve" without being asked. That whole register was banned. The voice is what a sharp colleague would actually say to Dana at 7am: "47 handled overnight, chose not to interrupt you on 6." "A fair counter is $605K to $618K, I'd pick $612K." "Same area, replies fastest this week." This also tracks the research: people follow advice from a tool that reads as competent, not warm or performative. Plain English is the competent register. The buzzwords were the warm-but-empty one, and they say nothing about the actual deal in front of her.

## The honest line

AI made this faster and more thorough than one person could be alone. It wrote the prototype scaffolding in hours, explored many directions in parallel, gathered and cited the research, and scored the result against one fixed rule set without tiring. That is real, and it is not worth pretending otherwise.

But every override above was the model proposing the genre default and a human disposing of it: generic dark to a disciplined dark of its own, fake percentage to honest range, spinner to named wait, a happy-path animation to reset-and-recover logic, and slop copy to plain English. The tools made the work faster. The judgment was the override. That is the same deal the morning command center offers Dana, and it is the only deal worth shipping.

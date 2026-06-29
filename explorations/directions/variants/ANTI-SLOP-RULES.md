# Anti-UI-Slop Rules

The canonical checklist every screen here is flagged against. Synthesized from the impeccable absolute bans, the rav hard/soft bans, the design-taste anti-default discipline, and the specific lessons this project learned (the dark version read as slop, the colored side-stripe, fake precision). The one-line test sits at the bottom: if someone could say "an AI made this" without doubt, it failed.

## A. Hard bans (instant fail, fix on sight)

1. **Pure black or white.** No `#000` / `#fff` / `rgb(0,0,0)` / `rgb(255,255,255)`. Tint every neutral toward the surface hue (chroma 0.005 to 0.02 is enough).
2. **AI-gradient accents.** No purple-to-blue "AI" gradient, no generic SaaS blue (`#3B82F6`) as the default accent, no neon-on-dark.
3. **Dark-mesh / aurora / glow hero.** No dark mesh background, no aurora blobs, no neon glow as atmosphere. (This is what made the first dark version read as slop.)
4. **Gradient text.** No `background-clip:text` over a gradient. Emphasis comes from weight or size, in one solid color.
5. **Glassmorphism on content.** Backdrop-blur is allowed only on system chrome (a nav pill, a notification), never on content cards or scrolling surfaces.
6. **Colored side-stripe borders.** No `border-left` / `border-right` greater than 1px used as a colored accent on a card, row, callout, or alert. Encode state with a leading dot/icon, a full hairline, a background tint, or nothing.
7. **The hero-metric template.** No "giant number + tiny label + three supporting stats + gradient accent" block. A big number is fine; the SaaS-dashboard template is not.
8. **Identical card grids.** No endless same-size icon + heading + text cards. Vary size and composition; let one element lead.
9. **Em-dashes and en-dashes.** Use a hyphen, comma, colon, semicolon, period, or parentheses. Never `-` doubled either.
10. **Fake precision.** No "99.73% confident." Confidence is categorical (high / medium / low) or a range, with the missing data shown.
11. **Bad motion.** No bounce / elastic easing, no `linear` or default `ease-in-out` for entrances, no animating layout properties (width / height / top / left / margin). Transform and opacity only.
12. **Emojis** in UI, headings, labels, or alt text.
13. **Generic display face.** Inter / Roboto / system-ui as the H1 / display face. Pair a display + a body + a mono. (Inter is fine for body.)
14. **Nested cards.** A card inside a card inside a card. Group with spacing, a hairline, or `divide-y` instead.
15. **Keyboard-inaccessible controls.** Clickable `div`/`span` with `onclick` and no `role="button"` + `tabindex` + Enter/Space handler, and no visible `:focus-visible`.
16. **Buzzword copy.** elevate, seamless, unleash, next-gen, game-changer, leverage, delve, powerful, revolutionize, supercharge.
17. **Placeholder content.** "John Doe", "Acme Corp", "Lorem Ipsum", "$0.00", "Card title".

## B. Strong principles (flag and justify, not always a hard fail)

18. **One focus per pane.** Each screen states its single job in the first fold, then gives the rest to whitespace. If two modules compete, it is two screens.
19. **Color encodes meaning, never decoration.** A hue is a state (urgent / uncertain / handled), a category, or a brand role, tied to a meaning before it is placed.
20. **Weight and brightness are the hierarchy.** A mixed-weight sentence (bright facts, dim connectors) beats boxing everything.
21. **A rendered material beats a flat panel.** An orb, a bubble, a chrome sphere, a character, or real photography carries more than a flat gradient rectangle.
22. **Motion conveys state, never decorates.** It orients, gives feedback, or shows a confidence change. If you cannot say what a motion communicates, cut it.
23. **Touch targets >= 44px; text contrast >= 4.5:1** (>= 3:1 for large). Small accent text needs a darker text-only variant.
24. **Restraint over celebration.** A confident, correct result is boring on purpose. No confetti for routine success.
25. **Earned familiarity for product UI.** Standard nav, forms, and affordances are features. Do not reinvent a scrollbar or a modal for flavor.

## C. The category-reflex check (run at two altitudes)

- **First-order:** if you can guess the palette from the category alone ("AI product → dark blue", "real estate → navy + gold"), it is the training-data reflex. Rework.
- **Second-order:** if you can guess the aesthetic from category-plus-anti-reference ("AI tool that is not dark → editorial cream"), it is the trap one tier deeper. Rework until neither answer is obvious.

## D. The one-line test

Hold the screen at arm's length. If a designer could say "an AI made that" without hesitation, it failed, rebuild the element with different structure. The goal is a screen that reads as authored: a specific point of view, a committed palette, real content, and restraint.

---

*Flag format used in the variant audits:* each rule is reported PASS or FLAG with evidence (selector / line). Hard-ban flags (A) are fixed in place. Principle flags (B) and reflex flags (C) are noted with a one-line rationale.

# Rules

Non-negotiables for anyone (human or AI agent) editing this portfolio. If a change breaks one of these, it doesn't ship.
Design values live in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md); the plan lives in [ROADMAP.md](ROADMAP.md).

## Content
1. **All copy lives in `src/data/content.ts`.** Components never hardcode names, dates, links or project text.
2. **Lead with outcomes, not adjectives.** "Mapped threat reports to MITRE ATT&CK with LLM confidence scoring" beats "passionate innovative developer".
3. **No fake numbers, no invented testimonials.** Every stat must be true and checkable.
4. Every project shows: what it is (1 line), the role, the stack, and at least one link (live, repo or video).
5. Keep the first screen scannable in 5 seconds: name, what you do, proof, how to contact.

## Visual
6. Use tokens only (`var(--…)`). No raw hex, px font sizes or ad-hoc shadows in components.
7. One accent color (`--signal`), used sparingly. No purple gradients, glassmorphism, neon glows, or emoji icons. Icons are monochrome at rest; brand colour only on hover (see DESIGN_SYSTEM §7).
8. Three font families max: Bricolage (display), Plex Sans (body), JetBrains Mono (labels). Nothing else.
9. Minimum text size 12px, minimum contrast 4.5:1.
10. Radius stays ≤ 10px on surfaces; pills only for buttons and chips.

## Motion
11. Before adding an animation, answer: *how often is it seen* and *what is it for*. "It looks cool" is only valid for things seen once.
12. Animate **only** `transform`, `opacity`, `clip-path` (and `filter` ≤ 4px blur). Never `width`, `height`, `top`, `left`, `margin`.
13. Use the easing tokens. Never `ease-in` on UI. Never `transition: all`.
14. UI transitions ≤ 300ms. Drawer/modals ≤ 500ms. Exit faster than enter.
15. Never animate from `scale(0)` — start at `0.9+` with opacity.
16. Every pressable gets `:active { transform: scale(0.97) }`.
17. Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
18. Keyboard-triggered UI (command palette) has **no** animation.
19. Everything respects `prefers-reduced-motion`: remove movement, keep short fades.
20. Scroll reveals run **once**. Scroll-*linked* effects (manifesto words, card stack, footer) must be reversible and never change scroll speed: no scroll hijacking, no smooth-scroll libraries. Pinning only via CSS `position: sticky`.
21. Pointer-driven motion uses springs or per-frame lerp; rAF loops stop when idle, off-screen or the tab is hidden.
21b. One sanctioned exception to rule 12: the hero name animates its variable-font axes (`wght`, `wdth`) under the cursor. It's 12 glyphs, reads all rects before writing, fine pointers only. Don't copy this pattern to body text.
21c. The intro plays once per session, is skipped under reduced motion, and waits for fonts — never fake loading time beyond ~1s.
21d. `useTransform` input ranges must stay inside `[0, 1]` — Motion may run them on a native ScrollTimeline, which throws otherwise.

## Code
22. React + TypeScript + Vite. Animation via `motion` (Motion for React) or plain CSS/WAAPI. No GSAP/Three.js unless the roadmap says so.
23. One component per file in `src/components`, its CSS next to it (`Component.css`). Shared tokens in `src/styles/tokens.css`.
24. No new dependency without a reason written in the PR/commit message.
25. `npm run build` must pass with zero TypeScript errors before every commit.

## Accessibility & performance
26. Semantic HTML: one `<h1>`, sections with headings, `<nav>`, `<main>`, `<footer>`.
27. Visible focus ring on every interactive element. Full keyboard navigation (including drawer and palette with focus return).
28. Images: `loading="lazy"` below the fold, explicit `width/height` or `aspect-ratio` to avoid layout shift.
29. Target Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO.
30. Test at 375px, 768px, 1024px and 1440px before shipping.

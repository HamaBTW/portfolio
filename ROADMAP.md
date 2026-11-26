# Roadmap

Goal: a portfolio that makes a recruiter stop scrolling and say "that's the one" — through proof of work and craft, not effects.

Status legend: ✅ done · 🔜 next · 🗓 later

## Phase 1 — Foundation (v1.0) ✅
- ✅ Vite + React + TypeScript scaffold, self-hosted fonts, design tokens
- ✅ `RULES.md`, `DESIGN_SYSTEM.md`, `ROADMAP.md`
- ✅ All content migrated from the old site into `src/data/content.ts`
- ✅ Sections: Hero, Stack marquee, Work (featured + index), Experience, About, Recognition, Contact
- ✅ Signature interactions: interactive dot field, masked headline reveal, cursor-follow project previews, case-study drawer, command palette (`Ctrl/⌘ K`), copy-email toast, magnetic CTA
- ✅ Reduced-motion support, keyboard navigation, focus states

## Phase 1.5 — Depth pass (v1.1) ✅
- ✅ Once-per-session boot-log intro with curtain reveal
- ✅ Blueprint column grid across the page
- ✅ Hero: cursor-reactive variable-font name, scroll-out depth, coordinates + "currently" note
- ✅ Scroll-lit manifesto with inline project thumbnails
- ✅ Four featured projects as sticky stacking cards with image parallax
- ✅ Scroll-velocity marquee
- ✅ Reveal footer with giant wordmark

## Phase 2 — Ship it 🔜
- ✅ Synced with LinkedIn (Nov 2026): Clubedge internship, AnOps / Farmy / Farmy Mini / Tâche-Lik Mobile, Certifications section, PFE availability — see `report.md`
- 🔜 Add Tunisie Telecom, Jameela and ESPRIT education to LinkedIn (`report.md` §3) — Tache-Lik dates resolved: startup 2023, phone app 2024
- 🔜 Real screenshots + links for Clubedge Mobile, AnOps, Tâche-Lik Mobile, Farmy Mini
- ✅ Images and CVs copied into `public/`, images converted to WebP (3.4 MB → 188 KB) — `npm run images` converts new ones
- 🔜 Deploy to GitHub Pages (`vite.config.ts` → `base: '/portfolio/'` or use a custom domain) or Vercel
- 🔜 Add Open Graph image, meta description, favicon set, `robots.txt`, `sitemap.xml`
- 🔜 Lighthouse pass ≥ 95 on all four scores; test on a real phone

## Phase 3 — Deepen the proof 🗓
- 🗓 Dedicated case-study pages (`/work/tache-lik`) with problem → approach → result, architecture diagram, and screenshots — recruiters for senior-track roles read these
- 🗓 Short muted autoplay video loops for Tache-Lik, Loopii and The World Within in the preview and drawer
- 🗓 "Now" block: what you're building / learning this month
- 🗓 Pull live GitHub stats (repos, last commit) at build time
- 🗓 French version (FR/EN toggle) — you already have a FR CV

## Phase 4 — Polish & delight 🗓
- 🗓 Page transitions between home and case studies (View Transitions API)
- 🗓 Sound-off-by-default micro-sounds on palette actions
- 🗓 Light "paper" theme toggle using the same token set
- 🗓 Analytics (privacy-friendly: Plausible/Umami) to see which projects recruiters open

## Definition of done for every change
- Follows [RULES.md](RULES.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- `npm run build` passes
- Checked at 375 / 768 / 1440px and with reduced motion on

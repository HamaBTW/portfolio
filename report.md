# LinkedIn → Portfolio update report

**Date:** 26 November 2026
**Source:** [linkedin.com/in/med-abidi](https://www.linkedin.com/in/med-abidi/), read while signed in (profile, Experience, Projects, Licenses & certifications, recent posts). Nothing was posted or changed on LinkedIn.
**Result:** the portfolio now reflects everything on your LinkedIn as of today. `npm run build` passes; checked in the browser at 1440px and 375px wide (no horizontal scroll, no broken images, every tech tag has an icon).

---

## 1. What was new on LinkedIn

| Type | Item | Dates | On the old portfolio? |
|---|---|---|---|
| Experience | **Clubedge** — Mobile Developer Intern (React Native), Monastir · Remote | Jun – Aug 2026 | No |
| Project | **AnOps** — AI-native business operations platform (Next.js, 144 AI tools) | Oct – Nov 2026 | No |
| Project | **Farmy Net** — agritech ecosystem (Flutter + React + Node, Hedera, Stripe), [live site](https://www.farmynet.giize.com/) | Feb – Jun 2026 | No |
| Project | **Farmy Mini** — blockchain traceability + price-cap escrow (Solidity) | Nov 2026 | No |
| Project | **Tâche-Lik Mobile** — native SwiftUI + Kotlin/Jetpack Compose apps | Nov 2025 – Jan 2026 | No |
| Certification | NVIDIA — Fundamentals of Deep Learning | Nov 2026 | No |
| Certification | NVIDIA — Applications of AI for Predictive Maintenance | Nov 2026 | No |
| Certification | NVIDIA — Generative AI with Diffusion Models | Oct 2026 | No |
| Certification | AWS Academy Graduate — Cloud Foundations | Oct 2026 | No |
| Certification | Hedera Certified Developer Associate (HCDA) | Oct 2026 | No |
| Certification | Hedera Business Foundation (HBF) | Oct 2026 | No |
| Certification | Hedera Certified Foundation (HCF) | Oct 2026 | No |
| Certification | UIK Career Day — 2 workshop participation certificates | Oct 2026 | No — **left out on purpose** (see §4) |
| Status | Your Career Day post: *looking for a PFE internship starting January 2027* | Nov 2026 | No — it said "Open to internships & freelance" |

---

## 2. What changed on the portfolio

### Hero & status
- Status pill: **"Looking for a PFE internship · Jan 2027"** (was "Open to internships & freelance"). This was the `TODO` in `content.ts`.
- "Currently" note: **"Final year at ESPRIT · PFE from Jan 2027"**.
- Pitch now leads with the newest, most concrete proof: *"…from a React Native app shipped with 298 tests to AI pipelines that read threat reports…"*

### Selected work (now 13 projects, was 8)
- **Featured (sticky cards), newest and strongest first:** Clubedge Mobile → AnOps → Tache-Lik → ADACTIM CTI.
  Loopii Player and The World Within moved down to the project list to make room.
- **Project list:** Farmy Net, Tâche-Lik Mobile, Loopii Player, Farmy Mini, The World Within, HireUp, EcoNet, Clothify, Spotipy.
- Each new project has a full case-study panel (description, your role, 3–4 highlights with numbers, stack, links).
- **Covers:** Farmy Net uses the real screenshot from its live site. Clubedge Mobile, AnOps, Tâche-Lik Mobile and Farmy Mini had no usable large image, so they get a **generated "spec sheet" cover** (title, type, year, stack icons on a blueprint grid) instead of a blank or a fake screenshot. New component: `ProjectCover`.

### Experience
- **Clubedge** added at the top with its real logo (from LinkedIn): role, dates, and the numbers that matter: 20 screens, 298 tests, offline sync, 2FA/biometrics, EN/FR/AR with RTL, every commit through reviewed PRs.
- ADACTIM's location corrected to **Remote** (LinkedIn).

### New section: 03 / Certifications
- Grouped by issuer, like the toolbox: **NVIDIA (3) · Amazon Web Services (1) · Hedera (3)**.
- Every certificate links to the issuer's own verification page (learn.nvidia.com, credly.com, certs.hashgraphdev.com), not to LinkedIn, so a recruiter can check it in one click.
- Added to the Ctrl/⌘ K menu. Sections after it were renumbered (About 04, Recognition 05, Contact 06).

### About
- New bio paragraph about the AI / cloud / blockchain direction.
- Stats: **13 projects** (was 8) and **7 certifications** (replaced "6 languages").
- Toolbox gained: React Native, Expo, Next.js, SwiftUI, Jetpack Compose, Kotlin, Swift, PyTorch, Gemini, AWS, MongoDB, Supabase, GitHub Actions, and a new **Blockchain** row (Hedera, Solidity, Ethereum). All with icons.

### Smaller fixes from LinkedIn dates
| Project | Was | Now |
|---|---|---|
| Loopii Player | 2025 | 2026 |
| Spotipy | 2024 | 2023 |
| EcoNet | 2024 | 2024–25 (web Sep–Dec 2024, desktop Jan–Jun 2025) |

### Contact
- Note now speaks to recruiters directly: *"Hiring for a final-year (PFE) internship starting January 2027…"*

### Files touched
`src/data/content.ts` (all copy) · new `Certifications.tsx/.css`, `ProjectCover.tsx/.css` · `Work.tsx/.css`, `ProjectDrawer.tsx`, `Manifesto.tsx`, `TechIcon.tsx` (19 new icons), `App.tsx`, `CommandPalette.tsx`, section labels · new assets `public/logos/clubedge.webp`, `public/images/farmy_cover.webp`.

---

## 3. Conflicts between LinkedIn and the portfolio

1. ✅ **Tache-Lik dates: resolved, no conflict.** You confirmed these are two different things:
   - **Tache-Lik the startup** began in **2023**, so the portfolio's *Founder & Lead Developer, 2023 — Now* is correct and unchanged.
   - The **2024** dates on LinkedIn (*Co-Founder, Nov 2024* in Experience, *Sep 2024* in Projects) are **the Tache-Lik phone app**.

   To stop recruiters mixing them up, the portfolio now spells it out. The Tache-Lik project is "the learning startup I founded in 2023", and its panel points to Tâche-Lik Mobile. Tâche-Lik Mobile is "the phone apps for my Tache-Lik startup".
   *Optional on LinkedIn:* the Experience entry reads like the startup itself began in Nov 2024. Renaming it to something like "Co-Founder — Tache-Lik mobile app" would make LinkedIn tell the same story.
2. **Tunisie Telecom and the Jameela freelance job are not on LinkedIn.** Both are on the portfolio (and your old site). If they're real, add them to LinkedIn; recruiters cross-check.
3. **Education is empty on LinkedIn.** Your ESPRIT degree (2022–2027) is not listed there. Add it; it's the first thing a PFE recruiter looks for.

---

## 4. Left out on purpose

- **UIK Career Day participation certificates** (2 workshops). These are attendance certificates, not skill certifications. Listed next to NVIDIA and AWS they'd weaken the section. They stay on LinkedIn.
- **Reposts by teammates** (Farmy Net launch, Tâche-Lik mobile). Used as sources for the project write-ups, not quoted.
- **Teammates' names.** The portfolio says "team project" and gives your own contributions, as LinkedIn does, without naming classmates.

---

## 5. Recommended next steps

1. **Fill the LinkedIn gaps in §3** (Tunisie Telecom, Jameela, ESPRIT education). Highest impact, 10 minutes.
2. ✅ **Real images added** (from your folders: *club edge internship*, *farmy mini*, *farmy the big project*). See §6.
   ✅ Every project now has a real cover. No generated covers are left (the fallback still exists for future projects).
3. **Add links for AnOps, Farmy Mini, Tâche-Lik Mobile** (GitHub repos or demo videos). These three currently have no links in their case-study panels.
4. **Update your CVs** (`public/cv/`). They predate Clubedge, AnOps and the certifications.
5. **Your 7-day LinkedIn series.** Your latest post (11h ago) announces a 7-day series about the certifications, projects and the internship. When it's done, the best post for each project can be linked from its case-study panel.

---

## 6. Update: project images and logos (added after the first report)

Source: the three folders you provided in `Downloads/`. Images were resized to ≤1600px and converted to WebP (1.4 MB total for 15 files) under `public/images/projects/<project>/`.

| Project | Cover | Logo | Gallery (in the case-study panel) |
|---|---|---|---|
| **Clubedge Mobile** | `c1` (portrait slide centred on a blurred backdrop so it fits the landscape card) | Clubedge | 4: case-study cover, key highlights, Meetings migration metrics, architecture |
| **Farmy Mini** | `fg 1` (the "Farmy Mini" hero) | — | 4: hero, asset registry + escrow, lot splitting, test results |
| **Farmy Net** | live-site screenshot (kept) | **Farmy** (house-and-leaf logo) | 4: app screens, app cover art, flyer, key features |
| Tache-Lik / Tâche-Lik Mobile | unchanged | Tache-Lik (new in the panel) | — |
| ADACTIM CTI | unchanged | Adactim (new in the panel) | — |

**New in the case-study panel:**
- The project's **logo** sits next to its title.
- A **Gallery** strip scrolls sideways, snaps to each image and works with touch. Click an image to open it full size. Every image has a descriptive alt text.

**Left out on purpose:** the *Bal des Projets 2026* team slide (it shows your teammates' photos and names), the "Thank you, Clubedge team" slide, and the booklet's divider and table-of-contents pages.

**Worth knowing:** that team slide carries a *Bal des Projets 2026* badge. If Farmy Net was presented or ranked there, it's a strong line to add to the project, the same way The World Within shows its 2nd places. Tell me the result and I'll add it.

### Tache-Lik: real screenshots of tache-lik.tn

Captured from the live site at full resolution (headless Edge; the cookie banner was declined with "Reject All", not accepted). Added to the **Tache-Lik** gallery (6 images, 215 KB total):

| # | Screen | Size |
|---|---|---|
| 1 | Home: "Your E-Learning Partner" | desktop 1440×900 |
| 2 | **Login** (`/auth`) | desktop |
| 3 | Classes: academic categories | desktop |
| 4 | Meetings calendar | desktop |
| 5 | **Login on a phone** | 390×844 @2x |
| 6 | Home on a phone | 390×844 @2x |

These show the **website**, not the native SwiftUI / Jetpack Compose app, so they belong to Tache-Lik and are not labelled as Tâche-Lik Mobile.
### Tâche-Lik Mobile: native app screenshot

✅ Added the **iOS (SwiftUI) sign-in screen** you sent:
- **Cover:** the screen with rounded phone corners, centred on a blurred copy of itself (same treatment as Clubedge).
- **Gallery:** the full-size screen.

**Optional:** more Tâche-Lik Mobile screens (courses, quizzes, leaderboard, the Android version) would strengthen its gallery, which has one image.

### AnOps: cover, logo, gallery and live link

- **Cover:** your "One platform. Every operation." promo image.
- **Logo:** the iOS app icon from `D:/projects/AnOps/public/brand-kit/02-app-icons/`.
- **Live link:** "Visit AnOps" → [an-ops.vercel.app](https://an-ops.vercel.app).
- **Gallery (8):** the promo image, then screenshots captured from the live site:
  - **AI Command Center** (`/apps/ai`), **Inventory** and **Manufacturing**, which are the parts you built
  - the landing page, pricing and sign-in
  - the landing page on a phone

**Status: all 13 projects now show real images.** Six have galleries: Clubedge Mobile, AnOps, Tache-Lik, Tâche-Lik Mobile, Farmy Net and Farmy Mini. The other seven (ADACTIM CTI, Loopii, The World Within, HireUp, EcoNet, Clothify, Spotipy) use the covers from your old site.

### Note on bundle size
The production JavaScript bundle is now **500 KB** minified (162 KB gzipped). Vite warns at 500 KB, and the growth comes from the brand icons added in this pass. It's fine for a portfolio. If it grows further, the first step is to lazy-load the command menu and project panel, which aren't needed on first paint.

---

## 7. Update: the Tache-Lik platform projects (27 Nov 2026)

Source: your master-profile project files (`t-agent-pipeline`, `t-agent-course-builder`, `t-agent-pipeline-editor`, `t-studio`, `t-hub`, `t-backup`). Only facts from those files were used.

**New order: Tache-Lik on top, AI next.**

| Position | Projects |
|---|---|
| Featured (sticky cards) | **Tache-Lik** → **T-Agent Pipeline** → **T-Agent Course Builder** → **T-Agent Pipeline Editor** |
| Top of the list (other AI) | AnOps, ADACTIM CTI |
| Rest of the Tache-Lik platform | T-Studio, T-Hub, T-Backup, Tâche-Lik Mobile |
| Everything else | Clubedge Mobile, Farmy Net, Farmy Mini, Loopii, EcoNet, HireUp, Clothify, The World Within, Spotipy |

**The six new projects:**
| Project | Headline number |
|---|---|
| T-Agent Pipeline | 9-agent swarm · course prep **8+ h → 15 min** · 182/183 commits · 908 tests |
| T-Agent Course Builder | course write-up **1–3 h → under 1 min** · 30–50 s per request · >50% fewer tokens |
| T-Agent Pipeline Editor | ADR-001 redesign · **≤ 4 model calls per turn** · sha256-fingerprinted approvals |
| T-Studio | Python → Rust · **1 GB → 60 MB**, 5-min lesson **10–30 min → ~20 s** |
| T-Hub | Flutter admin app · **~154k lines, 33 modules** · 643/730 commits |
| T-Backup | N sources → N destinations · in production for months |

**Covers:** none of the six had screenshots, so their covers draw the **real pipeline**: the agent stages in order with arrows, plus the outcome line (e.g. *Watcher → … → Inspector · 8+ h → 15 min per course*). T-Hub's modules are shown without arrows, since they aren't a sequence. Real screenshots can replace any of them later with a `cover:` line.

**Also updated:** the Tache-Lik project now describes the tools around it; stats show **19 projects**; the toolbox gained Rust, Tauri, Mastra, Qdrant, Groq, PostgreSQL, MinIO and FFmpeg; and there are 21 new tech icons.

**Left out on purpose:**
- T-Backup's implementation language, because your profile says it isn't confirmed.
- The T-Agent Pipeline's "5–8 h" figure, in favour of the CV's "8+ h → 15 min", as your file suggests. Both are mentioned in its case study.

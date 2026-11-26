# Design System — "Field Notes"

The portfolio reads like an engineer's field notebook: warm ink-black paper, off-white type, one signal-orange accent, monospace metadata everywhere. Editorial layout, asymmetric grid, big confident type. Motion is crisp and purposeful — it explains, gives feedback, or rewards a first visit. Nothing floats, glows or bounces for no reason.

Why this direction: recruiters skim dozens of portfolios that share the same template look (purple gradients, glass cards, centered hero, emoji). This one wins on **typography, restraint and craft details** instead of effects.

---

## 1. Color

All colors live as CSS custom properties in `src/styles/tokens.css`. Components never use raw hex.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0B0B0A` | Page background |
| `--ink-2` | `#121210` | Raised surfaces (cards, drawer, palette) |
| `--ink-3` | `#1A1A17` | Hover surface, inputs |
| `--line` | `#2A2925` | Hairlines, borders, grid |
| `--line-strong` | `#3A3934` | Focused/hovered borders |
| `--paper` | `#EDEBE4` | Primary text |
| `--paper-dim` | `#A9A69C` | Secondary text (≈ 8:1 on ink) |
| `--paper-mute` | `#7E7B72` | Metadata, captions (≈ 4.6:1 on ink — **never below this**) |
| `--signal` | `#FF5A1F` | Accent: links on hover, active states, the dot, focus ring |
| `--signal-ink` | `#0B0B0A` | Text on signal backgrounds |
| `--ok` | `#7BD88F` | Status dot "available" only |

Rules
- Accent is **scarce**: at most one signal-colored element per viewport besides the focus ring.
- No gradients on surfaces. The only gradient allowed is the image fade mask in project previews.
- Selection color: `--signal` background, `--signal-ink` text.

## 2. Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Bricolage Grotesque Variable** (`standard.css`: `wght` 200–800, `wdth` 75–100) | Headlines, name, section titles. Tracking −0.03em to −0.035em at display sizes (the optical-size cut is already tight — going lower makes glyphs collide). Weight 500–700. |
| Body | **IBM Plex Sans** | Paragraphs, UI text. 400 / 500. |
| Mono | **JetBrains Mono Variable** | Labels, dates, indices, tags, nav. Uppercase + 0.08em tracking for labels. |

All fonts self-hosted via `@fontsource` (no Google Fonts request, no layout shift from late swaps).

Fluid type scale (`clamp`, min @ 375px → max @ 1440px):

| Token | Size | Line-height | Use |
|---|---|---|---|
| `--fs-mega` | clamp(3.5rem, 13vw, 12.5rem) | 0.86 | Hero name |
| `--fs-h1` | clamp(2.5rem, 6vw, 5.5rem) | 0.95 | Section headlines / contact |
| `--fs-h2` | clamp(1.75rem, 3.2vw, 2.75rem) | 1.05 | Project titles |
| `--fs-h3` | 1.25rem | 1.25 | Card titles |
| `--fs-body` | 1.0625rem (17px) | 1.6 | Paragraphs |
| `--fs-small` | 0.9375rem | 1.5 | Secondary copy |
| `--fs-label` | 0.75rem (12px) | 1.4 | Mono labels — minimum size |

- Body copy max width `68ch`. `text-wrap: balance` on headings, `pretty` on paragraphs.
- Numbers in dates/stats use `font-variant-numeric: tabular-nums`.

## 3. Space & layout

- 4px base. Scale: `4 8 12 16 24 32 48 64 96 128 192` → `--s-1 … --s-11`.
- 12-column grid, `--gutter: clamp(16px, 2.5vw, 32px)`, max content width `1440px`, page padding `clamp(20px, 4vw, 56px)`.
- Sections are separated by a full-width hairline + a mono section label (`01 / WORK`), not by background color changes.
- Vertical rhythm: sections pad the **top only** with `--section-y` (`clamp(80px, 9vw, 144px)`). Never pad both top and bottom — the gaps stack and double. A section followed by a non-section (manifesto → marquee) closes its own gap with `padding-bottom`.
- Layout is intentionally **asymmetric**: headings start at column 1, body copy often starts at column 5 or 7.
- Breakpoints: `640`, `900`, `1200`. Mobile-first.

## 4. Shape & surface

- Radius: `--r-sm 6px` (tags, inputs), `--r-md 10px` (cards, images), `--r-pill 999px` (buttons, status chip). Nothing rounder.
- Borders over shadows. The only shadow is on floating layers (drawer, palette, cursor preview): `0 24px 80px -20px rgb(0 0 0 / .6)`.
- Film grain: a fixed 3%-opacity SVG noise overlay gives the paper texture. `pointer-events: none`.

## 5. Motion

Principles (from Emil Kowalski's design-engineering rules):
1. **Should it animate at all?** Things seen often (nav hover, command palette) are instant or near-instant. Rare things (hero entrance, first reveal of a section) may be expressive.
2. **Only `transform`, `opacity`, `clip-path`** (and `filter: blur` ≤ 4px for masking crossfades). Never width/height/top/left.
3. **Custom curves only.**

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrances, hovers, presses |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | On-screen movement, clip-path reveals |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Case-study drawer |
| `--dur-press` | `140ms` | `:active` scale |
| `--dur-fast` | `180ms` | Hover color/transform |
| `--dur-base` | `260ms` | Small UI transitions |
| `--dur-slow` | `420ms` | Drawer, image reveals |
| `--dur-hero` | `900ms` | One-time hero entrance only |

Patterns
- **Press**: every pressable scales to `0.97` on `:active`.
- **Hover**: gated behind `@media (hover: hover) and (pointer: fine)`.
- **Text reveal**: lines slide up from a mask (`translateY(105%) → 0`), stagger 40–70ms, non-uniform. Runs once.
- **Image reveal**: `clip-path: inset(100% 0 0 0) → inset(0)` with `--ease-in-out`, once on enter.
- **Cursor-follow preview** (work index): spring (`stiffness 300, damping 30`), scale `0.92 → 1` + opacity, never from scale 0.
- **Drawer**: enter 420ms `--ease-drawer`, exit 240ms ease-out — exit is always faster than enter.
- **Springs** for anything driven by the pointer (dot field, magnetic button, preview). Bounce ≤ 0.2.
- **Intro**: once per session. Mono "boot log" (3 lines, 230ms apart) + progress hairline, waits for `document.fonts.ready` (min 1050ms), then a `clip-path` curtain lifts (750ms `--ease-in-out`). The hero starts 180ms into the lift so they overlap.
- **Fluid type (hero)**: each glyph lerps `wght 640 → 240` and `wdth 100 → 78` by squared proximity to the cursor (260px radius). Reads like a lens passing over the name.
- **Hero depth**: on scroll-out the name drifts up 28% slower than the page; the dot field fades by 70% of the hero.
- **Manifesto**: words go from 14% → 100% opacity in reading order, linked to scroll (`start 85%` → `end 45%`). Inline project thumbnails scale `0.6 → 1` in the same sequence. Highlighted words use `--signal`.
- **Card stack**: featured projects are sticky (`top: 88px + i × 18px`). Card *k* lands at progress *k/(n−1)*; cards behind it scale toward `1 − depth × 0.045` and dim to 55%. Image inside drifts −6% → 6% (parallax). Disabled below 900px wide or 620px tall.
- **Marquee**: drifts by itself, speed and direction follow spring-smoothed scroll velocity.
- **Reveal footer**: `<footer>` is `position: sticky; bottom: 0` underneath `<main>`; the page lifts off it, and the wordmark rises 55% → 0 as it's uncovered. The wordmark always fills 99% of the content width: `font-size: 16cqi` as a CSS baseline, then `useFitText` measures the real text and corrects it (the optical-size axis makes glyphs wider at small sizes, so a fixed ratio overflows on phones).
- **Command palette**: **no animation** — it's a keyboard tool.

Reduced motion (`prefers-reduced-motion: reduce`): no translation/scale/parallax, no marquee, no dot field movement, no cursor preview. Opacity fades ≤ 200ms stay.

## 6. Components

| Component | File | Notes |
|---|---|---|
| `Nav` | `components/Nav.tsx` | Mono, sticky, hides on scroll down / shows on scroll up (transform only). Live Tunis clock. |
| `Hero` | `components/Hero.tsx` | Masked name reveal (cursor-reactive), "Currently" note, interactive dot field, facts + pitch + CTAs below the hairline. |
| `DotField` | `components/DotField.tsx` | Canvas, DPR-aware, rAF only while visible, idle when reduced motion. |
| `Intro` | `components/Intro.tsx` | Once-per-session boot log + curtain. |
| `Grid` | `components/Grid.tsx` | Fixed 12-column blueprint lines at 2.5% opacity. |
| `Manifesto` | `components/Manifesto.tsx` | Scroll-lit statement, copy in `content.ts` (`*hot*`, `{project-id}` thumbnails). |
| `Marquee` | `components/Marquee.tsx` | Stack ticker driven by scroll velocity. |
| `Work` | `components/Work.tsx` | Sticky stacking featured cards + numbered index with cursor-follow preview. |
| `Footer` | `components/Footer.tsx` | Sticky reveal footer with giant wordmark. |
| `ProjectDrawer` | `components/ProjectDrawer.tsx` | Case study, Esc / backdrop closes, focus returns to trigger, scroll lock. |
| `Experience` | `components/Experience.tsx` | Log-style timeline with scroll-linked progress rail and logo badges; Education as two cards (ESPRIT shows a live degree-progress bar computed from `start`/`end`). |
| `About` | `components/About.tsx` | Portrait, bio, facts grid, then the toolbox rows. |
| `Recognition` | `components/Recognition.tsx` | Quotes / awards. |
| `Contact` | `components/Contact.tsx` | Headline + note + magnetic button, then a tile grid: email (copy / write), phone + résumé, one tile per social with its handle. Email never breaks mid-word (wraps only after the `@`). |
| `CommandPalette` | `components/CommandPalette.tsx` | `Ctrl/⌘ + K`, arrow keys, Enter, Esc. |
| `Reveal` | `components/Reveal.tsx` | Shared in-view reveal wrapper. |
| `Button` | `components/Button.tsx` | `primary` (paper on ink inverted), `ghost` (hairline). Pill. |
| `TechIcon` | `components/TechIcon.tsx` | Label → brand/UI icon, brand-colour tint on hover. |
| `Tags` | `components/Tags.tsx` | Mono tech chips with icons. |
| `OrgBadge` | `components/OrgBadge.tsx` | Company/school logo tile, initials fallback. |

## 7. Iconography

- **Brand / tech logos**: `simple-icons` (CC0 SVG paths). **UI icons**: `lucide-react`, stroke 1.6. Both go through `components/TechIcon.tsx`. Add a label → icon entry in its `MAP` when you add a new tool to `content.ts` (unknown labels simply render no icon).
- Icons are **monochrome by default** (`--paper-mute` / `--paper-dim`) so the page stays calm. Inside a `.has-tint` parent they take their **brand colour on hover** (React cyan, Python blue…). Brand colours too dark for ink (Express, Symfony, GitHub…) fall back to `--paper`.
- Sizes: 13px in tags, 16px in links, 18px in toolbox tiles, 20px in the email tile, 0.8em in the marquee.
- Toolbox: one row per category (label + count on the left, chips across columns 4–12). Chips are 44px tall (38px on mobile), `--ink-2`, hairline border, `--r-md`, 18px icon. Experience and Education use 48px badges, Recognition 40px: the company's real logo on a light `--paper` tile (`OrgBadge`, files in `public/logos/`, 128px WebP), falling back to an icon (Lycée → graduation cap) or initials when there's no logo. Used in Experience, Education and Recognition; styles in `OrgBadge.css`. Square app icons (Tache-Lik) fill the tile (`fill`); landscape logos get less padding (`wide`). Logos come from each company's own website.
- LinkedIn's mark is inlined in `TechIcon.tsx` (removed from simple-icons for trademark reasons).
- No emoji as icons. The `↗` glyph has been replaced by lucide `ArrowUpRight` in links.

## 8. Responsive checklist

Every change is checked at **360×740, 390×844, 768×1024, 1024×768, 1366×650, 1440×900, 1708×714** for:
- no horizontal scroll and nothing off-screen,
- no clipped text,
- every link/button ≥ 40×40px hit area (use an invisible `::after` for inline items),
- sticky project cards don't overflow their height.

## 9. Accessibility baseline

- Text contrast ≥ 4.5:1 (all tokens above pass on `--ink`).
- Focus: `outline: 2px solid var(--signal); outline-offset: 3px` on `:focus-visible`. Never removed.
- Hit targets ≥ 44×44px.
- Every image has meaningful `alt`; decorative canvases are `aria-hidden`.
- Skip-link to `#main`.

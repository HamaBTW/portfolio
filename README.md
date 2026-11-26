# Mohamed Abidi — Portfolio

React + TypeScript + Vite + Motion. Live at **https://hamabtw.github.io/hama-new-potfolio/**

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve that build at http://localhost:4173/hama-new-potfolio/ (exactly like GitHub Pages)
npm run deploy   # build + publish to GitHub Pages (no GitHub Actions needed)
npm run images   # convert new PNG/JPGs in public/images/ to WebP
```

## Deploying (GitHub Pages, no Actions)

`npm run deploy` builds the site and force-pushes **only the built files** to the `gh-pages`
branch. `main` and your working tree are never touched.

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
Branch: **`gh-pages`**, folder **`/ (root)`** → Save. After that, every `npm run deploy` is live in about a minute.

The sub-path `/hama-new-potfolio/` is set in [`vite.config.ts`](vite.config.ts). Renamed the repo or using a
custom domain? Change it there (or build with `BASE=/`).

## Working on it

- Edit content in [`src/data/content.ts`](src/data/content.ts).
- Read [RULES.md](RULES.md) before changing anything, [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for tokens and motion, [ROADMAP.md](ROADMAP.md) for what's next.
- Press `Ctrl/⌘ + K` on the site for the command menu.

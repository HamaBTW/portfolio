import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repo at https://hamabtw.github.io/hama-new-potfolio/,
// so production assets must be requested from that sub-path.
// Using a custom domain later? Build with BASE=/ (e.g. `BASE=/ npm run deploy`).
const base = process.env.BASE ?? '/hama-new-potfolio/'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // dev server stays at http://localhost:5173/; the build and `npm run preview`
  // (which serves that build) use the GitHub Pages sub-path.
  base: command === 'build' || isPreview ? base : '/',
}))

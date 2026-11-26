// Deploys the production build to GitHub Pages without GitHub Actions.
//
//   npm run deploy
//
// What it does: builds into dist/, turns dist/ into a throw-away git repo with a single
// commit, and force-pushes it to the `gh-pages` branch of this project's `origin`.
// Your `main` branch and working tree are never touched.
//
// One-time setup on GitHub: Settings → Pages → Source: "Deploy from a branch",
// Branch: gh-pages / (root).
import { execSync } from 'node:child_process'
import { existsSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = join(root, 'dist')
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' })
const read = (cmd, cwd = root) => execSync(cmd, { cwd }).toString().trim()

const remote = read('git remote get-url origin')
const sha = read('git rev-parse --short HEAD')
const dirty = read('git status --porcelain') !== ''

console.log(`\n→ Building ${sha}${dirty ? ' (+ uncommitted changes)' : ''} for ${remote}\n`)
run('npm run build')

// GitHub Pages runs Jekyll by default, which hides files/folders starting with "_".
writeFileSync(join(dist, '.nojekyll'), '')
// Unknown URLs fall back to the app instead of GitHub's 404 page.
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))

if (existsSync(join(dist, '.git'))) rmSync(join(dist, '.git'), { recursive: true, force: true })
run('git init -q -b gh-pages', dist)
run('git add -A', dist)
run(`git -c user.name="deploy" -c user.email="deploy@localhost" commit -q -m "Deploy ${sha}${dirty ? '-dirty' : ''}"`, dist)
console.log('\n→ Pushing to gh-pages …\n')
run(`git push -f "${remote}" gh-pages`, dist)
rmSync(join(dist, '.git'), { recursive: true, force: true })

const m = remote.match(/github\.com[/:]([^/]+)\/(.+?)(\.git)?$/)
if (m) console.log(`\n✓ Deployed. Live in ~1 minute at https://${m[1].toLowerCase()}.github.io/${m[2]}/\n`)

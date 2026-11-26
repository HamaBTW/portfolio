// Converts every PNG/JPG in public/images to WebP (max 1600px wide), then removes the original.
// Usage: npm run images
import { readdir, rm, stat } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = fileURLToPath(new URL('../public/images/', import.meta.url))

for (const file of await readdir(dir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue
  const src = join(dir, file)
  const out = join(dir, file.slice(0, -extname(file).length) + '.webp')
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
  const [a, b] = await Promise.all([stat(src), stat(out)])
  console.log(`${file} ${(a.size / 1024) | 0}KB → ${(b.size / 1024) | 0}KB`)
  await rm(src)
}

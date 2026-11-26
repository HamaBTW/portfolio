import { FileText } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { profile } from '../data/content'
import { EASE_OUT, openPalette } from '../lib/motion'
import { Button } from './Button'
import { DotField } from './DotField'
import './Hero.css'

const REST = { wght: 640, wdth: 100 }
const NEAR = { wght: 240, wdth: 78 }

/**
 * Per-letter variable-font response: glyphs near the cursor thin out and condense,
 * like the name is being pressed under a lens. Values are lerped every frame so the
 * letters ease back instead of snapping. Fine pointers only; off under reduced motion.
 */
function useFluidType(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = Array.from(el.querySelectorAll<HTMLElement>('.hero__char'))
    const state = chars.map(() => ({ t: 0 }))
    const pointer = { x: -9999, y: -9999 }
    let raf = 0
    let active = false

    const tick = () => {
      let moving = false
      // Read every glyph position first, then write — one layout per frame, no thrash.
      const centers = chars.map((c) => {
        const r = c.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      })
      chars.forEach((c, i) => {
        const p = centers[i]
        const d = Math.hypot(p.x - pointer.x, p.y - pointer.y)
        const target = active ? Math.max(0, 1 - d / 260) ** 2 : 0
        const s = state[i]
        s.t += (target - s.t) * 0.12
        if (Math.abs(target - s.t) > 0.002) moving = true
        const w = REST.wght + (NEAR.wght - REST.wght) * s.t
        const wd = REST.wdth + (NEAR.wdth - REST.wdth) * s.t
        c.style.fontVariationSettings = `'wght' ${w.toFixed(0)}, 'wdth' ${wd.toFixed(1)}`
      })
      raf = moving ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      active = true
      kick()
    }
    const onLeave = () => {
      active = false
      kick()
    }

    const host = el.closest('section') ?? el
    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerleave', onLeave)
    }
  }, [root])
}

function Letters({ text, delay, ready }: { text: string; delay: number; ready: boolean }) {
  const reduce = useReducedMotion()
  return (
    <span className="hero__line" aria-hidden>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero__char"
          initial={{ y: reduce ? 0 : '108%', opacity: reduce ? 0 : 1 }}
          animate={ready ? { y: 0, opacity: 1 } : undefined}
          transition={{
            duration: reduce ? 0.3 : 0.9,
            // ease the stagger itself: first letters spaced out, later ones bunch up
            delay: reduce ? 0 : delay + Math.pow(i, 0.82) * 0.045,
            ease: EASE_OUT,
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  useFluidType(nameRef)

  // Depth on the way out: the name drifts up slower than the page and the field fades.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-28%'])
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const after = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay: reduce ? 0 : d, ease: EASE_OUT },
  })

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={sectionRef}>
      <motion.div className="hero__field" style={{ opacity: fieldOpacity }}>
        <DotField />
      </motion.div>
      <div className="hero__inner container">
        <motion.div className="hero__top" {...after(0.1)}>
          <span className="label">Portfolio · ’26</span>
          <span className="label hero__coords">{profile.coords}</span>
          <span className="hero__status">
            <span className="hero__pulse" aria-hidden />
            {profile.availability}
          </span>
        </motion.div>

        <motion.div className="hero__nameWrap" style={{ y: nameY }}>
          <h1 id="hero-title" className="hero__name" ref={nameRef}>
            <span className="sr-only">{profile.name}</span>
            <Letters text={profile.firstName} delay={0.1} ready={ready} />
            <span className="hero__line hero__line--indent">
              <Letters text={profile.lastName} delay={0.26} ready={ready} />
              <motion.span
                className="hero__period"
                aria-hidden
                initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                animate={ready ? { opacity: 1, scale: 1 } : undefined}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.3, delay: reduce ? 0 : 0.85 }}
              >
                .
              </motion.span>
            </span>
          </h1>
          <motion.p className="hero__currently" {...after(0.95)}>
            <span className="label">Currently</span>
            {profile.currently}
          </motion.p>
        </motion.div>

        <div className="hero__bottom">
          <motion.dl className="hero__facts" {...after(0.9)}>
            <div>
              <dt className="label">Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt className="label">Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="label">Studying</dt>
              <dd>{profile.school}</dd>
            </div>
          </motion.dl>

          <div className="hero__pitch">
            <motion.p className="hero__headline" {...after(1.0)}>
              {profile.headline}
            </motion.p>
            <motion.div className="hero__ctas" {...after(1.1)}>
              <Button href="#work" variant="primary">
                See selected work
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Button>
              <div className="cvsplit" role="group" aria-label="Résumé">
                <span className="cvsplit__label">
                  <FileText size={15} strokeWidth={1.6} aria-hidden />
                  Résumé
                </span>
                <a href={profile.cv.en} target="_blank" rel="noopener noreferrer" className="cvsplit__opt" aria-label="Résumé in English (PDF)">
                  EN
                </a>
                <a href={profile.cv.fr} target="_blank" rel="noopener noreferrer" className="cvsplit__opt" aria-label="Résumé en français (PDF)">
                  FR
                </a>
              </div>
              <button className="hero__hint label" onClick={openPalette}>
                or press <kbd>Ctrl</kbd> <kbd>K</kbd>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

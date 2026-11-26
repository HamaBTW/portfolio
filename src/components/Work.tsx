import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../data/content'
import { EASE_OUT, openProject } from '../lib/motion'
import { LineReveal, Reveal } from './Reveal'
import { ProjectCover } from './ProjectCover'
import { Tags } from './Tags'
import './Work.css'

const pad = (n: number) => String(n + 1).padStart(2, '0')

function StackCard({
  p,
  i,
  total,
  progress,
}: {
  p: Project
  i: number
  total: number
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  // While later cards slide over this one, it recedes: scales down and dims.
  // Card k lands on the stack at roughly progress k / (total - 1).
  const seg = 1 / Math.max(1, total - 1)
  const lands = Math.min(1, i * seg)
  const next = Math.min(1, lands + seg)
  const last = i === total - 1
  const targetScale = 1 - (total - 1 - i) * 0.045
  // Offsets must stay inside [0, 1] (Motion may run these on a native ScrollTimeline).
  const scale = useTransform(progress, last ? [0, 1] : [lands, 1], [1, reduce || last ? 1 : targetScale])
  const dim = useTransform(progress, last ? [0, 1] : [lands, next], [0, last ? 0 : 0.55])
  const imgY = useTransform(progress, [Math.max(0, lands - seg), Math.max(next, 0.001)], ['-6%', '6%'])

  return (
    <div className="stack__slot" style={{ ['--i' as string]: i }}>
      <motion.article className="card" style={{ scale }}>
        <button className="card__hit" onClick={() => openProject(p.id)} aria-label={`Open case study: ${p.title}`} />
        <div className="card__body">
          <div className="card__meta label">
            <span className="card__no">
              {pad(i)} <span>/ {String(total).padStart(2, '0')}</span>
            </span>
            <span>{p.year}</span>
          </div>
          <div>
            <span className="label card__kind">{p.kind}</span>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__summary">{p.summary}</p>
          </div>
          <div className="card__foot">
            <Tags items={p.stack} max={5} />
            <span className="card__cta">
              Open case study
              <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
                <path d="M5 13 13 5M6 5h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </div>
        </div>
        <div className="card__media">
          {p.cover ? (
            <motion.img
              src={p.cover}
              alt={`${p.title} — screenshot`}
              loading="lazy"
              style={{ y: reduce ? 0 : imgY }}
            />
          ) : (
            <ProjectCover p={p} className="card__pcover" alt={`${p.title} cover`} />
          )}
        </div>
        <motion.div className="card__dim" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  )
}

function Stack({ items }: { items: Project[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <div className="stack" ref={ref}>
      {items.map((p, i) => (
        <StackCard key={p.id} p={p} i={i} total={items.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

/** Floating preview that trails the cursor over the index (fine pointers only). */
function CursorPreview({ active }: { active: Project | null }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return (
    <motion.div className="preview" style={{ x: sx, y: sy }} aria-hidden>
      <AnimatePresence>
        {active && (
          <motion.div
            key="frame"
            className="preview__frame"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15, ease: EASE_OUT } }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {projects.map((p) => (
              <ProjectCover key={p.id} p={p} className="preview__img" data-on={active.id === p.id} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Work() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const [hovered, setHovered] = useState<Project | null>(null)
  const [canHover, setCanHover] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setCanHover(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>01 / Selected work</span>
            <span>{projects.length} projects</span>
          </div>
          <h2 id="work-title">
            <LineReveal lines={['Things I’ve built,', <em key="e">shipped and learned from.</em>]} />
          </h2>
        </header>

        <Stack items={featured} />

        <div className="index" onPointerLeave={() => setHovered(null)}>
          <div className="index__title">
            <h3 className="label">More projects</h3>
          </div>
          <div className="index__head label" aria-hidden>
            <span>No.</span>
            <span>Project</span>
            <span>Type</span>
            <span>Year</span>
          </div>
          <ul>
            {rest.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.05}>
                <button
                  className="row"
                  data-dim={hovered !== null && hovered.id !== p.id}
                  onPointerEnter={() => setHovered(p)}
                  onFocus={() => setHovered(null)}
                  onClick={() => openProject(p.id)}
                >
                  <span className="row__no label">{pad(i + featured.length)}</span>
                  <span className="row__title">
                    <span className="row__name">{p.title}</span>
                    <span className="row__summary">{p.summary}</span>
                  </span>
                  <span className="row__kind label">{p.kind}</span>
                  <span className="row__year label">{p.year}</span>
                  <span className="row__arrow" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M5 13 13 5M6 5h7v7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                  <ProjectCover p={p} className="row__thumb" />
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      {canHover && !reduce && <CursorPreview active={hovered} />}
    </section>
  )
}

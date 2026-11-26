import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Fragment, useRef } from 'react'
import { manifesto, projects } from '../data/content'
import { openProject } from '../lib/motion'
import { ProjectCover } from './ProjectCover'
import './Manifesto.css'

type Token =
  | { kind: 'word'; text: string; hot: boolean }
  | { kind: 'thumb'; id: string }

function tokenize(src: string): Token[] {
  const out: Token[] = []
  let hot = false
  for (const raw of src.split(/\s+/)) {
    const thumb = raw.match(/^\{([\w-]+)\}$/)
    if (thumb) {
      out.push({ kind: 'thumb', id: thumb[1] })
      continue
    }
    let text = raw
    const opens = text.startsWith('*')
    if (opens) text = text.slice(1)
    const closes = /\*[^\w]*$/.test(text)
    text = text.replace('*', '')
    out.push({ kind: 'word', text, hot: hot || opens })
    if (opens) hot = true
    if (closes) hot = false
  }
  return out
}

const tokens = tokenize(manifesto)

function Word({ text, hot, range, progress }: { text: string; hot: boolean; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span className={hot ? 'mf__word mf__word--hot' : 'mf__word'} style={{ opacity }}>
      {text}
    </motion.span>
  )
}

function Thumb({ id, range, progress }: { id: string; range: [number, number]; progress: MotionValue<number> }) {
  const p = projects.find((x) => x.id === id)
  const scale = useTransform(progress, range, [0.6, 1])
  const opacity = useTransform(progress, range, [0, 1])
  if (!p) return null
  return (
    <motion.button
      className="mf__thumb"
      style={{ scale, opacity }}
      onClick={() => openProject(p.id)}
      aria-label={`Open ${p.title}`}
    >
      <span className="mf__thumbInner">
        <ProjectCover p={p} />
      </span>
    </motion.button>
  )
}

/**
 * A short statement whose words light up in reading order as it scrolls through the
 * viewport. Scroll-linked, so the reader controls the pace (and can scroll back).
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const n = tokens.length

  return (
    <section className="section mf" aria-label="About my work">
      <div className="container mf__inner">
        <span className="label mf__label">( Manifesto )</span>
        <p className="mf__text" ref={ref}>
          {tokens.map((t, i) => {
            const range: [number, number] = reduce ? [0, 0.0001] : [i / n, Math.min(1, (i + 2) / n)]
            // Real spaces between tokens so lines can wrap.
            return (
              <Fragment key={i}>
                {t.kind === 'word' ? (
                  <Word text={t.text} hot={t.hot} range={range} progress={scrollYProgress} />
                ) : (
                  <Thumb id={t.id} range={range} progress={scrollYProgress} />
                )}{' '}
              </Fragment>
            )
          })}
        </p>
      </div>
    </section>
  )
}

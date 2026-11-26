import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/content'
import { EASE_DRAWER, EASE_OUT, OPEN_PROJECT } from '../lib/motion'
import { Tags } from './Tags'
import './ProjectDrawer.css'

export function ProjectDrawer() {
  const [id, setId] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const returnFocus = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const index = projects.findIndex((p) => p.id === id)
  const project = index >= 0 ? projects[index] : null

  useEffect(() => {
    const onOpen = (e: Event) => {
      returnFocus.current = document.activeElement as HTMLElement
      setId((e as CustomEvent<string>).detail)
    }
    window.addEventListener(OPEN_PROJECT, onOpen)
    return () => window.removeEventListener(OPEN_PROJECT, onOpen)
  }, [])

  const close = useCallback(() => setId(null), [])
  const step = useCallback(
    (dir: 1 | -1) => setId(projects[(index + dir + projects.length) % projects.length].id),
    [index],
  )

  const open = project !== null
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'Tab' && panelRef.current) {
        // simple focus trap
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  // Scroll the panel back to top when switching project.
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 })
  }, [id])

  return (
    <AnimatePresence onExitComplete={() => returnFocus.current?.focus({ preventScroll: true })}>
      {project && (
        <div className="drawer" key="drawer">
          <motion.div
            className="drawer__backdrop"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            ref={panelRef}
            className="drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0.15 } }
                : { x: '100%', transition: { duration: 0.26, ease: EASE_OUT } }
            }
            transition={{ duration: 0.45, ease: EASE_DRAWER }}
          >
            <div className="drawer__bar">
              <span className="label">
                {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div className="drawer__nav">
                <button onClick={() => step(-1)} aria-label="Previous project" className="drawer__icon">
                  ←
                </button>
                <button onClick={() => step(1)} aria-label="Next project" className="drawer__icon">
                  →
                </button>
                <button ref={closeRef} onClick={close} className="drawer__close label">
                  Close <kbd>Esc</kbd>
                </button>
              </div>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.article
                key={project.id}
                className="drawer__content"
                // blur masks the crossfade between two projects (reads as one morph)
                initial={{ opacity: 0, filter: 'blur(4px)', y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(4px)', transition: { duration: 0.12 } }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <div className="drawer__cover">
                  <img src={project.cover} alt={`${project.title} — screenshot`} />
                </div>

                <div className="drawer__meta label">
                  <span>{project.kind}</span>
                  <span>{project.year}</span>
                </div>
                <h2 id="drawer-title" className="drawer__title">
                  {project.title}
                </h2>
                <p className="drawer__lead">{project.description}</p>

                <dl className="drawer__grid">
                  <div>
                    <dt className="label">Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt className="label">Stack</dt>
                    <dd>
                      <Tags items={project.stack} />
                    </dd>
                  </div>
                </dl>

                <h3 className="label drawer__h">Highlights</h3>
                <ul className="drawer__list">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>

                <div className="drawer__links">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="drawer__link">
                      {l.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

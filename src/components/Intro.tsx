import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import './Intro.css'

const KEY = 'intro-seen'

/** Should the intro play? Once per browser session, never with reduced motion. */
export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return sessionStorage.getItem(KEY) !== '1'
}

const lines = [
  '> boot portfolio --user mohamed',
  '> loading fonts ........ ok',
  `> ${profile.role.toLowerCase()} · ${profile.location.toLowerCase()}`,
]

/**
 * A ~1.3s "boot log" that plays once per session, waits for fonts (so the hero never
 * reflows mid-animation), then wipes up to reveal the page.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // The intro always lands on the hero, even if the browser restored a scroll position.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.documentElement.style.overflow = 'hidden'
    const timers = lines.map((_, i) => window.setTimeout(() => setShown(i + 1), 120 + i * 230))
    const minTime = new Promise((r) => setTimeout(r, 1050))
    let cancelled = false
    Promise.all([document.fonts.ready, minTime]).then(() => {
      if (cancelled) return
      setLeaving(true)
      // Start the hero as the curtain begins to lift, so the two overlap.
      window.setTimeout(onDone, 180)
    })
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        sessionStorage.setItem(KEY, '1')
        document.documentElement.style.overflow = ''
      }}
    >
      {!leaving && (
        <motion.div
          className="intro"
          aria-hidden
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: EASE_IN_OUT }}
        >
          <div className="intro__log">
            {lines.slice(0, shown).map((l, i) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className={i === lines.length - 1 ? 'intro__last' : ''}
              >
                {l}
              </motion.p>
            ))}
            <span className="intro__caret" />
          </div>
          <div className="intro__bar">
            <motion.span
              className="intro__fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: EASE_IN_OUT }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

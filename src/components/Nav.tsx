import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { profile } from '../data/content'
import { useClock } from '../hooks/useClock'
import { EASE_OUT, openPalette } from '../lib/motion'
import './Nav.css'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const time = useClock(profile.timezone)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    // Hide when scrolling down past the hero, show as soon as the user scrolls up.
    setHidden(y > 400 && y > prev + 2)
  })

  return (
    <motion.header
      className="nav"
      data-scrolled={scrolled}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: hidden ? 0.24 : 0.32, ease: EASE_OUT }}
    >
      <div className="nav__inner container">
        <a href="#top" className="nav__mark" aria-label={`${profile.name} — back to top`}>
          <span className="nav__dot" aria-hidden />
          <span>{profile.name}</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav__link label">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__meta">
          <span className="label nav__clock" title="Local time in Tunis">
            TUN <time>{time}</time>
          </span>
          <button className="nav__k" onClick={openPalette} aria-label="Open command menu">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </button>
        </div>
      </div>
    </motion.header>
  )
}

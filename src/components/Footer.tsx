import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { profile } from '../data/content'
import { useClock } from '../hooks/useClock'
import './Footer.css'

/**
 * Scales the wordmark so it fills its container exactly. CSS (16cqi) gets close, but
 * Bricolage's optical-size axis makes glyphs wider at small sizes, so the width/size
 * ratio drifts on phones. Measure → scale → measure again (2 passes converge).
 */
function useFitText(boxRef: React.RefObject<HTMLElement | null>, textRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const box = boxRef.current
    const text = textRef.current
    if (!box || !text) return
    const fit = () => {
      const cs = getComputedStyle(box.parentElement ?? box)
      const target =
        (box.parentElement?.clientWidth ?? box.clientWidth) -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight)
      for (let i = 0; i < 2; i++) {
        const range = document.createRange()
        range.selectNodeContents(text)
        const w = range.getBoundingClientRect().width
        const fs = parseFloat(getComputedStyle(box).fontSize)
        if (!w) return
        box.style.fontSize = `${(fs * (target * 0.99)) / w}px`
      }
    }
    const ro = new ResizeObserver(fit)
    ro.observe(box.parentElement ?? box)
    document.fonts.ready.then(fit)
    return () => ro.disconnect()
  }, [boxRef, textRef])
}

/**
 * Sits underneath <main> (position: sticky; bottom: 0) so the page lifts off it at the
 * end. The wordmark rises into place as it's uncovered.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const time = useClock(profile.timezone)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['55%', '0%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const markRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  useFitText(markRef, textRef)

  return (
    <footer className="foot" ref={ref}>
      <div className="foot__inner container">
        <div className="foot__row">
          <span className="label">© {new Date().getFullYear()} {profile.name}</span>
          <span className="label">
            Tunis <time className="foot__time">{time}</time>
          </span>
          <span className="label">Designed & built in React + Motion</span>
          <a href="#top" className="label link foot__top">
            Back to top ↑
          </a>
        </div>
        <div className="foot__mark" aria-hidden ref={markRef}>
          <motion.span style={reduce ? undefined : { y, opacity }}>
            <span ref={textRef} className="foot__text">
              {profile.firstName}
              <em>{profile.lastName}</em>
            </span>
          </motion.span>
        </div>
      </div>
    </footer>
  )
}

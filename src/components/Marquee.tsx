import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'
import { marquee } from '../data/content'
import { TechIcon } from './TechIcon'
import './Marquee.css'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/**
 * Tool ticker that drifts on its own and reacts to scrolling: scroll faster and it
 * speeds up; scroll up and it reverses. Velocity is spring-smoothed so it never jerks.
 */
export function Marquee() {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * 1.6 * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = 1
    else if (f > 0) dir.current = -1
    move += dir.current * Math.abs(f) * 1.6 * (delta / 1000)
    base.set(base.get() + move)
  })

  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <li key={m}>
          <TechIcon name={m} size={28} className="marquee__icon" />
          {m}
          <span className="marquee__sep" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" aria-label="Tools I work with">
      <motion.div className="marquee__track" style={{ x: reduce ? 0 : x }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  )
}

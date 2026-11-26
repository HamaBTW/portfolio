import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'p'
}

/** Fades + lifts content once when it scrolls into view. Reduced motion → fade only. */
export function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  )
}

/** Masked line reveal for headlines: each line slides up from behind a clip. */
export function LineReveal({
  lines,
  className,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const reduce = useReducedMotion()
  // Non-uniform stagger (choreography: later lines arrive a touch closer together).
  const offsets = [0, 0.07, 0.12, 0.16, 0.19]
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }}
            {...(immediate
              ? { animate: { y: 0, opacity: 1 } }
              : { whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
            transition={{
              duration: reduce ? 0.2 : 0.8,
              delay: reduce ? 0 : delay + (offsets[i] ?? i * 0.04),
              ease: EASE_OUT,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

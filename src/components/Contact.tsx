import { ArrowUpRight, Copy, Send } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { profile } from '../data/content'
import { LineReveal, Reveal } from './Reveal'
import { TechIcon } from './TechIcon'
import { toast } from './Toast'
import './Contact.css'

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    toast('Email copied to clipboard')
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}

/** "https://github.com/HamaBTW" → "github.com/HamaBTW" */
const handle = (href: string) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** Big round CTA that leans toward the cursor (spring), then settles back. */
function Magnetic() {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 })

  const onMove = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={`mailto:${profile.email}`}
      className="magnet"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <span>Say hello</span>
      <ArrowUpRight size={22} strokeWidth={1.6} aria-hidden />
    </motion.a>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>06 / Contact</span>
            <span>{profile.availability}</span>
          </div>
        </header>

        <div className="contact__main">
          <h2 id="contact-title" className="contact__title">
            <LineReveal lines={['Have a role', 'or a project?', <em key="e">Let’s talk.</em>]} />
          </h2>
          <Reveal className="contact__aside" delay={0.15}>
            <p className="contact__note">{profile.contactNote}</p>
            <Magnetic />
          </Reveal>
        </div>

        <div className="tiles">
          {/* Email — the primary action */}
          <Reveal className="tile tile--email">
            <div className="tile__top">
              <span className="tile__icon tile__icon--lg">
                <TechIcon name="email" size={22} />
              </span>
              <span className="label">Email · preferred</span>
            </div>
            <p className="tile__email">
              {/* If it has to wrap (small phones), break after the @, never mid-word */}
              {profile.email.split('@')[0]}@<wbr />
              {profile.email.split('@')[1]}
            </p>
            <div className="tile__actions">
              <button className="tbtn tbtn--primary" onClick={copyEmail}>
                <Copy size={15} aria-hidden /> Copy address
              </button>
              <a className="tbtn" href={`mailto:${profile.email}`}>
                <Send size={15} aria-hidden /> Write an email
              </a>
            </div>
          </Reveal>

          <Reveal className="tile tile--stack" delay={0.05}>
            <a className="tile__row has-tint" href={profile.phoneHref}>
              <span className="tile__icon">
                <TechIcon name="phone" size={18} />
              </span>
              <span className="tile__text">
                <span className="label">Phone</span>
                <span className="tile__value">{profile.phone}</span>
              </span>
              <ArrowUpRight size={16} className="tile__arrow" aria-hidden />
            </a>
            <div className="tile__row tile__row--cv">
              <span className="tile__icon">
                <TechIcon name="pdf" size={18} />
              </span>
              <span className="tile__text">
                <span className="label">Résumé</span>
                <span className="tile__cv">
                  <a href={profile.cv.en} target="_blank" rel="noopener noreferrer" className="tbtn tbtn--sm">
                    English
                  </a>
                  <a href={profile.cv.fr} target="_blank" rel="noopener noreferrer" className="tbtn tbtn--sm">
                    Français
                  </a>
                </span>
              </span>
            </div>
          </Reveal>

          {profile.socials.map((s, i) => (
            <Reveal key={s.href} className="tile tile--social" delay={0.08 + i * 0.04}>
              <a className="social has-tint" href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="tile__icon">
                  <TechIcon name={s.label} size={20} />
                </span>
                <span className="tile__text">
                  <span className="social__name">{s.label}</span>
                  <span className="social__handle">{handle(s.href)}</span>
                </span>
                <ArrowUpRight size={18} className="tile__arrow" aria-hidden />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

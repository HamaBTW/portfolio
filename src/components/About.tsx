import { motion, useReducedMotion } from 'motion/react'
import { facts, profile, skills } from '../data/content'
import { EASE_IN_OUT } from '../lib/motion'
import { LineReveal, Reveal } from './Reveal'
import { TechIcon } from './TechIcon'
import './About.css'

export function About() {
  const reduce = useReducedMotion()
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>04 / About</span>
            <span>{profile.location}</span>
          </div>
          <h2 id="about-title">
            <LineReveal lines={['Engineer by training,', <em key="e">founder by habit.</em>]} />
          </h2>
        </header>

        <div className="about">
          <motion.figure
            className="about__photo"
            initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)', opacity: reduce ? 0 : 1 }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: reduce ? 0.2 : 1.1, ease: EASE_IN_OUT }}
          >
            <img src={profile.portrait} alt={`Portrait of ${profile.name}`} loading="lazy" width={800} height={1000} />
            <figcaption className="label">{profile.name} — {profile.location}</figcaption>
          </motion.figure>

          <div className="about__text">
            {profile.bio.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 0.08} className={i === 0 ? 'about__lead' : ''}>
                {p}
              </Reveal>
            ))}

            <dl className="facts">
              {facts.map((f, i) => (
                <Reveal key={f.label} className="fact" delay={0.05 * i}>
                  <dt className="fact__value">{f.value}</dt>
                  <dd className="fact__label">{f.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <div className="skills">
          <div className="skills__head label">
            <span>Toolbox</span>
            <span>{skills.reduce((n, g) => n + g.items.length, 0)} tools</span>
          </div>
          <ul className="skills__rows">
            {skills.map((g, i) => (
              <Reveal as="li" key={g.group} className="skills__row" delay={i * 0.04}>
                <h3 className="label skills__group">
                  <span className="skills__count">{String(g.items.length).padStart(2, '0')}</span>
                  {g.group}
                </h3>
                <ul className="skills__chips">
                  {g.items.map((s) => (
                    <li key={s} className="chip has-tint">
                      <TechIcon name={s} size={18} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

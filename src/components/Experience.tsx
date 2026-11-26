import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { useRef } from 'react'
import { education, experience } from '../data/content'
import { OrgBadge } from './OrgBadge'
import { LineReveal, Reveal } from './Reveal'
import { Tags } from './Tags'
import './Experience.css'

/** "Year 5 of 5 · graduating Jun 2027", with a bar that fills to today's progress. */
function DegreeProgress({ start, end }: { start: string; end: string }) {
  const reduce = useReducedMotion()
  const s = new Date(`${start}-01`)
  const e = new Date(`${end}-01`)
  const now = new Date()
  const pct = Math.min(1, Math.max(0, (now.getTime() - s.getTime()) / (e.getTime() - s.getTime())))
  const totalYears = Math.round((e.getTime() - s.getTime()) / (365.25 * 864e5))
  const year = Math.min(totalYears, Math.floor((now.getTime() - s.getTime()) / (365.25 * 864e5)) + 1)
  const done = pct >= 1
  const when = e.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
  return (
    <div className="edu__progress">
      <div className="edu__bar" role="progressbar" aria-valuenow={Math.round(pct * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Degree progress">
        <motion.span
          className="edu__fill"
          initial={{ scaleX: reduce ? pct : 0 }}
          whileInView={{ scaleX: pct }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 1.2, ease: [0.77, 0, 0.175, 1] }}
        />
      </div>
      <span className="label">
        {done ? `Graduated ${when}` : `Year ${year} of ${totalYears} · graduating ${when}`}
      </span>
    </div>
  )
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="section" id="experience" aria-labelledby="xp-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>02 / Experience</span>
            <span>2023 — now</span>
          </div>
          <h2 id="xp-title">
            <LineReveal lines={['Where I’ve put', <em key="e">it to work.</em>]} />
          </h2>
        </header>

        <div className="xp">
          <div className="xp__rail" aria-hidden>
            <motion.div className="xp__fill" style={{ scaleY: reduce ? 1 : progress }} />
          </div>
          <ol className="xp__list" ref={listRef}>
            {experience.map((job, i) => (
              <Reveal as="li" key={job.company + job.role} className="xp__item" delay={i * 0.04}>
                <span className="xp__node" aria-hidden />
                <div className="xp__when label">
                  <time>{job.period}</time>
                  <span>{job.place}</span>
                </div>
                <div className="xp__who">
                  <OrgBadge name={job.company} logo={job.logo} className="xp__badge" />
                  <div>
                    <h3>{job.company}</h3>
                    <p className="xp__role">{job.role}</p>
                  </div>
                </div>
                <div className="xp__what">
                  <p>{job.summary}</p>
                  <Tags items={job.stack} />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="edu">
          <div className="edu__head label">
            <span>Education</span>
            <span>{education.length} schools</span>
          </div>
          <ul className="edu__grid">
            {education.map((e, i) => (
              <Reveal as="li" key={e.school} className="edu__card" delay={i * 0.06}>
                <div className="edu__top">
                  <OrgBadge
                    name={e.school}
                    logo={e.logo}
                    icon={<GraduationCap size={22} strokeWidth={1.6} />}
                    className="edu__badge"
                  />
                  <span className="label edu__period">{e.period}</span>
                </div>
                <h3 className="edu__school">{e.school}</h3>
                <p className="edu__deg">{e.degree}</p>
                <p className="label edu__place">{e.place}</p>
                {e.start && e.end && <DegreeProgress start={e.start} end={e.end} />}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

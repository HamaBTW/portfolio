import { recognition } from '../data/content'
import { OrgBadge } from './OrgBadge'
import { Reveal } from './Reveal'
import './Recognition.css'

export function Recognition() {
  return (
    <section className="section recog" aria-labelledby="recog-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>04 / Recognition</span>
          </div>
          <h2 id="recog-title" className="sr-only">
            Recognition
          </h2>
        </header>
        <ul className="recog__grid">
          {recognition.map((r, i) => (
            <Reveal as="li" key={r.source} className="recog__item" delay={i * 0.07}>
              <span className="recog__mark" aria-hidden>
                “
              </span>
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
              <div className="recog__by">
                <OrgBadge name={r.source} logo={r.logo} className="recog__badge" />
                <span className="recog__who">
                  <span className="recog__src">{r.source}</span>
                  <span className="label">{r.title}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

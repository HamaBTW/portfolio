import { ArrowUpRight } from 'lucide-react'
import { certifications, type Cert } from '../data/content'
import { LineReveal, Reveal } from './Reveal'
import { TechIcon } from './TechIcon'
import './Certifications.css'

const ISSUERS: { id: Cert['issuer']; name: string; icon: string; blurb: string }[] = [
  { id: 'NVIDIA', name: 'NVIDIA', icon: 'nvidia', blurb: 'Deep Learning Institute' },
  { id: 'AWS', name: 'Amazon Web Services', icon: 'aws', blurb: 'AWS Academy' },
  { id: 'Hedera', name: 'Hedera', icon: 'hedera', blurb: 'The Hashgraph Association' },
]

/** One row per issuer: logo + name on the left, its certificates as verifiable links on the right. */
export function Certifications() {
  return (
    <section className="section" id="certifications" aria-labelledby="certs-title">
      <div className="container">
        <header className="section-head">
          <div className="label">
            <span>03 / Certifications</span>
            <span>{certifications.length} verified</span>
          </div>
          <h2 id="certs-title">
            <LineReveal lines={['Learning on purpose,', <em key="e">and it’s on record.</em>]} />
          </h2>
        </header>

        <ul className="certs">
          {ISSUERS.map((iss, i) => {
            const list = certifications.filter((c) => c.issuer === iss.id)
            if (!list.length) return null
            return (
              <Reveal as="li" key={iss.id} className="certs__row has-tint" delay={i * 0.05}>
                <div className="certs__issuer">
                  <span className="certs__logo">
                    <TechIcon name={iss.icon} size={24} />
                  </span>
                  <span className="certs__who">
                    <span className="certs__name">{iss.name}</span>
                    <span className="label">
                      {iss.blurb} · {list.length}
                    </span>
                  </span>
                </div>
                <ul className="certs__list">
                  {list.map((c) => (
                    <li key={c.href}>
                      <a className="cert" href={c.href} target="_blank" rel="noopener noreferrer">
                        <span className="cert__body">
                          <span className="cert__title">{c.name}</span>
                          <span className="cert__note">{c.note}</span>
                        </span>
                        <span className="cert__meta">
                          <span className="label">{c.date}</span>
                          <span className="cert__verify label">
                            Verify <ArrowUpRight size={13} aria-hidden />
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

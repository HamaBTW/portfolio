import type { CSSProperties } from 'react'
import type { Project } from '../data/content'
import { TechIcon } from './TechIcon'
import './ProjectCover.css'

/**
 * A project's image. Projects without a screenshot get a designed "spec sheet" cover:
 * blueprint grid, kind + year, big title, and the stack as icons — so a missing
 * screenshot never looks like a broken image.
 */
export function ProjectCover({
  p,
  className = '',
  alt,
  style,
  eager,
  'data-on': dataOn,
}: {
  p: Project
  className?: string
  alt?: string
  style?: CSSProperties
  eager?: boolean
  'data-on'?: boolean
}) {
  if (p.cover)
    return (
      <img
        src={p.cover}
        alt={alt ?? ''}
        className={className}
        style={style}
        data-on={dataOn}
        loading={eager ? undefined : 'lazy'}
      />
    )
  return (
    <div className={`pcover ${className}`} style={style} data-on={dataOn} role={alt ? 'img' : undefined} aria-label={alt} aria-hidden={alt ? undefined : true}>
      <div className="pcover__grid" aria-hidden />
      <div className="pcover__top">
        <span>{p.kind}</span>
        <span>{p.year}</span>
      </div>
      {p.flow ? (
        // Pipelines show their real stages instead of repeating the title
        <div className="pcover__flowWrap">
          <ol className={`pcover__flow ${p.flowPlain ? 'is-plain' : ''}`} aria-hidden>
            {p.flow.map((step, i) => (
              <li key={step} className={i === p.flow!.length - 1 ? 'is-last' : ''}>
                <span className="pcover__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="pcover__step">{step}</span>
              </li>
            ))}
          </ol>
          {p.flowResult && <div className="pcover__result">{p.flowResult}</div>}
        </div>
      ) : (
        <div className="pcover__title">{p.title}</div>
      )}
      <ul className="pcover__stack" aria-hidden>
        {p.stack.slice(0, 5).map((s) => (
          <li key={s}>
            <TechIcon name={s} size={16} />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

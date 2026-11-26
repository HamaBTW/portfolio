import type { ReactNode } from 'react'
import './Button.css'

type Props = {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  external?: boolean
  children: ReactNode
  className?: string
}

export function Button({ href, onClick, variant = 'primary', external, children, className = '' }: Props) {
  const cls = `btn btn--${variant} ${className}`
  if (href)
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="btn__label">{children}</span>
      </a>
    )
  return (
    <button type="button" onClick={onClick} className={cls}>
      <span className="btn__label">{children}</span>
    </button>
  )
}

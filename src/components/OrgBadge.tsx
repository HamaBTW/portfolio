import type { ReactNode } from 'react'
import type { Logo } from '../data/content'
import { monogram } from '../lib/monogram'
import './OrgBadge.css'

/**
 * Company / school badge: the real logo on a light "app icon" tile when we have one,
 * otherwise an icon if given, else the name's initials (e.g. "Tunisie Telecom" → "TT").
 */
export function OrgBadge({
  name,
  logo,
  icon,
  className = '',
}: {
  name: string
  logo?: Logo
  /** shown instead of the initials when there's no logo */
  icon?: ReactNode
  className?: string
}) {
  if (logo)
    return (
      <span className={`badge badge--logo ${logo.fill ? 'badge--fill' : ''} ${logo.wide ? 'badge--wide' : ''} ${className}`} aria-hidden>
        <img src={logo.src} alt="" width={128} height={128} loading="lazy" />
      </span>
    )
  return (
    <span className={`badge ${icon ? 'badge--icon' : ''} ${className}`} aria-hidden>
      {icon ?? monogram(name)}
    </span>
  )
}

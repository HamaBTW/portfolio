import { useEffect, useMemo, useRef, useState } from 'react'
import { profile, projects } from '../data/content'
import { OPEN_PALETTE, openProject } from '../lib/motion'
import { copyEmail } from './Contact'
import './CommandPalette.css'

type Item = { id: string; group: string; label: string; hint?: string; run: () => void }

const go = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
const ext = (href: string) => window.open(href, '_blank', 'noopener,noreferrer')

/**
 * Ctrl/⌘ + K menu. Deliberately has NO open/close animation: it's a keyboard tool
 * that gets used repeatedly, and animation would only make it feel slower.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const items: Item[] = useMemo(
    () => [
      { id: 'work', group: 'Navigate', label: 'Selected work', run: () => go('#work') },
      { id: 'xp', group: 'Navigate', label: 'Experience', run: () => go('#experience') },
      { id: 'about', group: 'Navigate', label: 'About', run: () => go('#about') },
      { id: 'contact', group: 'Navigate', label: 'Contact', run: () => go('#contact') },
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        group: 'Projects',
        label: p.title,
        hint: p.kind,
        run: () => openProject(p.id),
      })),
      { id: 'email', group: 'Actions', label: 'Copy email address', hint: profile.email, run: copyEmail },
      { id: 'cv-en', group: 'Actions', label: 'Open résumé (EN)', hint: 'PDF', run: () => ext(profile.cv.en) },
      { id: 'cv-fr', group: 'Actions', label: 'Open résumé (FR)', hint: 'PDF', run: () => ext(profile.cv.fr) },
      ...profile.socials.map((s) => ({
        id: `s-${s.label}`,
        group: 'Links',
        label: s.label,
        hint: '↗',
        run: () => ext(s.href),
      })),
    ],
    [],
  )

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return items
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ''}`.toLowerCase().includes(t))
  }, [q, items])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => {
          if (!o) returnFocus.current = document.activeElement as HTMLElement
          return !o
        })
      }
    }
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement
      setOpen(true)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_PALETTE, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_PALETTE, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      inputRef.current?.focus()
    } else {
      returnFocus.current?.focus?.({ preventScroll: true })
    }
  }, [open])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const run = (item: Item | undefined) => {
    if (!item) return
    setOpen(false)
    // let focus return before running (e.g. scroll or drawer open)
    requestAnimationFrame(() => item.run())
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(filtered[active])
    }
  }

  let lastGroup = ''
  return (
    <div className="palette" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="palette__box" role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onKeyDown}>
        <div className="palette__search">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a project, section or link…"
            aria-label="Search commands"
            aria-controls="palette-list"
            aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
            role="combobox"
            aria-expanded="true"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette__list" id="palette-list" role="listbox" ref={listRef}>
          {filtered.length === 0 && <li className="palette__empty">No results for “{q}”</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null
            lastGroup = item.group
            return (
              <li key={item.id} role="presentation">
                {header && <div className="palette__group label">{header}</div>}
                <div
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-active={i === active}
                  className="palette__item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                >
                  <span>{item.label}</span>
                  {item.hint && <span className="palette__hint">{item.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>
        <div className="palette__foot label">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> to move
          </span>
          <span>
            <kbd>Enter</kbd> to select
          </span>
        </div>
      </div>
    </div>
  )
}

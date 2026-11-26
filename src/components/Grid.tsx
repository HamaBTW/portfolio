/** Faint 12-column blueprint lines behind the whole page. Purely decorative. */
export function Grid() {
  return (
    <div className="bp" aria-hidden>
      <div className="bp__inner container">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  )
}

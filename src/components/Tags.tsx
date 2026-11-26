import { TechIcon } from './TechIcon'

/** Tech chips with brand icons. Icons tint to their brand colour when the chip is hovered. */
export function Tags({ items, max }: { items: string[]; max?: number }) {
  const list = max ? items.slice(0, max) : items
  return (
    <ul className="tags">
      {list.map((s) => (
        <li key={s} className="has-tint">
          <TechIcon name={s} size={13} />
          {s}
        </li>
      ))}
    </ul>
  )
}

import { StarIcon } from './icons.jsx'

export default function Rating({ value = 0, count, size = 15, showValue = false }) {
  const rounded = Math.round(value)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= rounded} size={size} />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-cocoa">{value.toFixed(1)}</span>}
      {count != null && <span className="text-xs text-cocoa/60">({count})</span>}
    </div>
  )
}

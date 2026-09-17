const items = [
  'Free shipping over ₹1,499',
  'Clean · Cruelty-free · Vegan',
  '10% off your first order',
  'Dermatologist tested',
  'Made with clean ingredients',
]

export default function Marquee() {
  const loop = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-beige bg-beige/40 py-3">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-xs uppercase tracking-[0.3em] text-cocoa">
            {t} <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

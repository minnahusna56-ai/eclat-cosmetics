import { reviews } from '../data/products.js'
import Rating from './Rating.jsx'
import SectionHeader from './SectionHeader.jsx'

export default function Reviews() {
  return (
    <section className="container-lux py-16 md:py-24">
      <SectionHeader
        center
        label="Loved by many"
        title="What our community says"
        subtitle="Real words from the people who wear ÉCLAT every day."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <figure
            key={r.id}
            className="reveal flex flex-col rounded-3xl bg-white/70 p-6 shadow-card"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <Rating value={r.rating} size={16} />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-cocoa">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nude/50 font-serif text-espresso">
                {r.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-espresso">{r.name}</p>
                <p className="text-xs text-cocoa/60">{r.location}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

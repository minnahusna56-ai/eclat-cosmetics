import { galleryImages } from '../data/products.js'
import SectionHeader from './SectionHeader.jsx'

export default function Gallery() {
  return (
    <section className="container-lux py-16 md:py-24">
      <SectionHeader
        center
        label="@eclat.beauty"
        title="Beauty in the everyday"
        subtitle="Tag us to be featured in our gallery."
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {galleryImages.map((src, i) => (
          <a
            key={i}
            href="#"
            className="group relative aspect-square overflow-hidden rounded-2xl bg-sand"
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 text-cream opacity-0 transition group-hover:bg-espresso/30 group-hover:opacity-100">
              <span className="font-serif text-lg">View</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'

const catImages = {
  makeup: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
  skincare: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80',
  'lip-care': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  face: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
  eyes: 'https://images.unsplash.com/photo-1583241800698-9c2e9d2a3f0f?auto=format&fit=crop&w=600&q=80',
  'body-care': 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80',
}

export default function CategoryStrip() {
  return (
    <section className="container-lux py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <Link
            key={c.id}
            to={`/shop?category=${c.id}`}
            className="reveal group flex flex-col items-center gap-3"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className="aspect-square w-full overflow-hidden rounded-full bg-sand shadow-card">
              <img
                src={catImages[c.id]}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium tracking-wide text-espresso transition group-hover:text-golddark">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

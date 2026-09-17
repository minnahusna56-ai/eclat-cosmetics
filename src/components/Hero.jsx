import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand via-cream to-cream pt-24 md:pt-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-nude/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

      <div className="container-lux grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-fadeUp">
          <span className="section-label">Clean · Elegant · Everyday</span>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-espresso sm:text-6xl lg:text-7xl">
            Beauty,<br />
            <span className="italic text-golddark">Simplified.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cocoa">
            Thoughtfully formulated skincare and makeup that lets your natural beauty lead.
            Clean ingredients, timeless design, and results you can feel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">
              Shop Now <ArrowIcon size={18} />
            </Link>
            <Link to="/shop" className="btn-outline">
              Explore Collection
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-8">
            {[
              ['50k+', 'Happy customers'],
              ['100%', 'Clean formulas'],
              ['4.8★', 'Average rating'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-serif text-2xl text-espresso">{stat}</p>
                <p className="text-xs text-cocoa/70">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fadeIn">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=80"
              alt="ÉCLAT cosmetics"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -left-4 bottom-10 hidden w-44 rounded-2xl bg-white/90 p-4 shadow-card backdrop-blur sm:block animate-float">
            <p className="font-serif text-lg text-espresso">Lumière Glow Serum</p>
            <p className="text-xs text-cocoa/70">Bestseller · ₹2,499</p>
          </div>
        </div>
      </div>
    </section>
  )
}

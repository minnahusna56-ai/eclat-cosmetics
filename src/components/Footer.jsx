import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'

export default function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-cream/90">
      <div className="container-lux grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="font-serif text-3xl tracking-[0.35em]">
            <span className="text-gold">É</span>CLAT
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Clean, elegant beauty crafted for every day. Thoughtful formulas, timeless design.
          </p>
          <div className="mt-6 flex gap-3">
            {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-cream/25 px-4 py-2 text-xs tracking-wide transition hover:border-gold hover:text-gold"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.25em] text-gold">Shop</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/shop?category=${c.id}`} className="transition hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.25em] text-gold">Company</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link to="/about" className="transition hover:text-gold">Our Story</Link></li>
            <li><Link to="/about" className="transition hover:text-gold">Clean Beauty</Link></li>
            <li><Link to="/contact" className="transition hover:text-gold">Contact</Link></li>
            <li><Link to="/shop" className="transition hover:text-gold">All Products</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm uppercase tracking-[0.25em] text-gold">Help</h4>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><a href="#" className="transition hover:text-gold">Shipping & Returns</a></li>
            <li><a href="#" className="transition hover:text-gold">Track Order</a></li>
            <li><a href="#" className="transition hover:text-gold">FAQs</a></li>
            <li><a href="#" className="transition hover:text-gold">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} ÉCLAT Beauty. All rights reserved.</p>
          <p>Made with care · Prices in ₹ INR</p>
        </div>
      </div>
    </footer>
  )
}

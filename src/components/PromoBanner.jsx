import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons.jsx'

export default function PromoBanner() {
  return (
    <section className="container-lux py-16">
      <div className="grid overflow-hidden rounded-[2.5rem] bg-nude/40 md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-14">
          <span className="section-label">Limited edition</span>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-espresso sm:text-5xl">
            The Golden Hour Edit
          </h2>
          <p className="mt-4 max-w-md text-cocoa">
            A curated ritual of glow serum, dewy moisturizer and our cult highlighter — for
            radiant, lit-from-within skin. Save up to 20% this season.
          </p>
          <div className="mt-8">
            <Link to="/shop" className="btn-primary w-fit">
              Shop the Edit <ArrowIcon size={18} />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1613966802194-d3f04a91e9ce?auto=format&fit=crop&w=1000&q=80"
            alt="Golden Hour Edit"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

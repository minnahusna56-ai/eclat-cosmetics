import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import CategoryStrip from '../components/CategoryStrip.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import PromoBanner from '../components/PromoBanner.jsx'
import Reviews from '../components/Reviews.jsx'
import Gallery from '../components/Gallery.jsx'
import Newsletter from '../components/Newsletter.jsx'
import { products } from '../data/products.js'

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const bestSellers = products.filter((p) => p.bestseller).slice(0, 4)
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4)

  return (
    <>
      <Hero />
      <Marquee />

      <section className="container-lux pt-16">
        <SectionHeader
          label="Shop by category"
          title="Find your ritual"
          subtitle="Curated edits across makeup, skincare and body."
        />
      </section>
      <CategoryStrip />

      <section className="container-lux py-8">
        <SectionHeader label="Handpicked" title="Featured Products" link="/shop" />
        <ProductGrid products={featured} />
      </section>

      <PromoBanner />

      <section className="container-lux py-8">
        <SectionHeader label="Most loved" title="Best Sellers" link="/shop" />
        <ProductGrid products={bestSellers} />
      </section>

      <section className="container-lux py-8">
        <SectionHeader label="Just in" title="New Arrivals" link="/shop" />
        <ProductGrid products={newArrivals} />
      </section>

      <Reviews />
      <Gallery />
      <Newsletter />
    </>
  )
}

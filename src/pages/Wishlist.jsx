import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { getProductById } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import { HeartIcon } from '../components/icons.jsx'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(getProductById).filter(Boolean)

  return (
    <div className="pt-24 md:pt-28">
      <div className="border-b border-beige bg-sand/50">
        <div className="container-lux py-12 text-center">
          <span className="section-label">Saved for later</span>
          <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-5xl">Your Wishlist</h1>
          <p className="mx-auto mt-3 text-sm text-cocoa/70">
            {items.length} item{items.length !== 1 && 's'} saved
          </p>
        </div>
      </div>

      <div className="container-lux py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl bg-white/60 py-24 text-center">
            <span className="text-nude"><HeartIcon size={48} /></span>
            <h2 className="mt-4 font-serif text-2xl text-espresso">Your wishlist is empty</h2>
            <p className="mt-2 text-sm text-cocoa/70">Tap the heart on any product to save it here.</p>
            <Link to="/shop" className="btn-primary mt-6">Discover Products</Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  )
}

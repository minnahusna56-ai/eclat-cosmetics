import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { formatINR } from '../data/products.js'
import { HeartIcon, BagIcon } from './icons.jsx'
import Rating from './Rating.jsx'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const wished = isWished(product.id)
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/70 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.newArrival && (
            <span className="rounded-full bg-espresso/85 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-cream">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-espresso">
              -{discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
            wished ? 'bg-white text-rose-400' : 'bg-white/80 text-cocoa hover:text-rose-400'
          }`}
        >
          <HeartIcon filled={wished} size={18} />
        </button>

        <button
          onClick={() => addToCart(product.id)}
          className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-espresso/90 py-2.5 text-xs font-medium tracking-wide text-cream opacity-0 backdrop-blur transition-all duration-500 hover:bg-gold hover:text-espresso group-hover:translate-y-0 group-hover:opacity-100"
        >
          <BagIcon size={16} /> Add to Bag
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
          {product.category.replace('-', ' ')}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg leading-tight text-espresso transition group-hover:text-golddark">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} count={product.reviews} />
        <div className="mt-auto flex items-center gap-2 pt-1">
          <span className="text-base font-medium text-espresso">{formatINR(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-cocoa/50 line-through">{formatINR(product.oldPrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

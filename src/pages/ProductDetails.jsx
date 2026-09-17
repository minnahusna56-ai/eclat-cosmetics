import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, getRelated, formatINR } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import Rating from '../components/Rating.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { HeartIcon, PlusIcon, MinusIcon, BagIcon, CheckIcon } from '../components/icons.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addToCart, toggleWishlist, isWished } = useStore()

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [shade, setShade] = useState(product?.shades ? product.shades[0] : null)
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 })

  const related = useMemo(() => (product ? getRelated(product, 4) : []), [product])

  if (!product) {
    return (
      <div className="container-lux flex flex-col items-center py-40 text-center">
        <h1 className="font-serif text-4xl text-espresso">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6">Back to Shop</Link>
      </div>
    )
  }

  const wished = isWished(product.id)

  const handleAdd = () => addToCart(product.id, { qty, shade })
  const handleBuyNow = () => {
    addToCart(product.id, { qty, shade })
    navigate('/checkout')
  }

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoom({ active: true, x, y })
  }

  return (
    <div className="pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="container-lux py-4 text-sm text-cocoa/70">
        <Link to="/" className="hover:text-golddark">Home</Link> ·{' '}
        <Link to="/shop" className="hover:text-golddark">Shop</Link> ·{' '}
        <Link to={`/shop?category=${product.category}`} className="capitalize hover:text-golddark">
          {product.category.replace('-', ' ')}
        </Link>{' '}
        · <span className="text-espresso">{product.name}</span>
      </div>

      <div className="container-lux grid gap-10 py-6 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition ${
                  activeImg === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div
            className="relative aspect-[4/5] flex-1 overflow-hidden rounded-3xl bg-sand"
            onMouseMove={onMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
          >
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-200"
              style={
                zoom.active
                  ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-[11px] text-cocoa backdrop-blur">
              Hover to zoom
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-gold">
            {product.category.replace('-', ' ')}
          </span>
          <h1 className="mt-2 font-serif text-4xl text-espresso">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviews} showValue size={18} />
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="font-serif text-3xl text-espresso">{formatINR(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-cocoa/50 line-through">{formatINR(product.oldPrice)}</span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-cocoa">{product.description}</p>

          {/* Shades */}
          {product.shades && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-espresso">
                Shade: <span className="text-cocoa">{shade}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.shades.map((s) => (
                  <button
                    key={s}
                    onClick={() => setShade(s)}
                    className={`chip ${shade === s ? 'border-gold bg-gold/15 text-espresso' : 'border-beige text-cocoa hover:border-gold'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-sm font-medium text-espresso">Quantity</p>
            <div className="flex items-center rounded-full border border-beige bg-white/70">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-cocoa hover:text-espresso" aria-label="Decrease">
                <MinusIcon size={16} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-cocoa hover:text-espresso" aria-label="Increase">
                <PlusIcon size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={handleAdd} className="btn-primary flex-1 sm:flex-none">
              <BagIcon size={18} /> Add to Bag
            </button>
            <button onClick={handleBuyNow} className="btn-gold flex-1 sm:flex-none">
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`btn-outline ${wished ? 'border-rose-300 text-rose-400' : ''}`}
              aria-label="Wishlist"
            >
              <HeartIcon filled={wished} size={18} /> {wished ? 'Saved' : 'Wishlist'}
            </button>
          </div>

          {/* Benefits + Ingredients */}
          <div className="mt-10 space-y-6 rounded-3xl bg-white/60 p-6">
            <div>
              <h3 className="font-serif text-xl text-espresso">Benefits</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-cocoa">
                    <span className="text-gold"><CheckIcon size={16} /></span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl text-espresso">Key Ingredients</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="container-lux py-16">
        <SectionHeader label="You may also love" title="Related Products" />
        <ProductGrid products={related} />
      </section>
    </div>
  )
}

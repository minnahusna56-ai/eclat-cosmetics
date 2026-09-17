import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { formatINR } from '../data/products.js'
import { PlusIcon, MinusIcon, TrashIcon, BagIcon, ArrowIcon } from '../components/icons.jsx'

const COUPONS = { LUMERA10: 0.1, GLOW20: 0.2, WELCOME: 0.15 }
const FREE_SHIP_THRESHOLD = 1499
const SHIPPING_FEE = 99

export default function Cart() {
  const { cartDetailed, subtotal, updateQty, removeFromCart } = useStore()
  const { toast } = useStore()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)

  const applyCoupon = (e) => {
    e.preventDefault()
    const code = coupon.trim().toUpperCase()
    if (COUPONS[code]) {
      setApplied({ code, rate: COUPONS[code] })
      toast(`Coupon ${code} applied — ${COUPONS[code] * 100}% off!`)
    } else {
      setApplied(null)
      toast('Invalid coupon code', 'info')
    }
  }

  const discount = applied ? Math.round(subtotal * applied.rate) : 0
  const afterDiscount = subtotal - discount
  const shipping = afterDiscount === 0 || afterDiscount >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FEE
  const total = afterDiscount + shipping

  if (cartDetailed.length === 0) {
    return (
      <div className="pt-24 md:pt-28">
        <div className="container-lux flex flex-col items-center rounded-3xl py-28 text-center">
          <span className="text-nude"><BagIcon size={52} /></span>
          <h1 className="mt-4 font-serif text-3xl text-espresso">Your bag is empty</h1>
          <p className="mt-2 text-sm text-cocoa/70">Add a little glow to get started.</p>
          <Link to="/shop" className="btn-primary mt-6">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="container-lux py-10">
        <h1 className="font-serif text-4xl text-espresso">Shopping Bag</h1>
        <p className="mt-1 text-sm text-cocoa/70">{cartDetailed.length} item(s) in your bag</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Items */}
          <div className="space-y-4">
            {cartDetailed.map((item) => (
              <div key={item.key} className="flex gap-4 rounded-3xl bg-white/70 p-4 shadow-card">
                <Link to={`/product/${item.productId}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-sand">
                  <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${item.productId}`} className="font-serif text-lg text-espresso hover:text-golddark">
                        {item.product.name}
                      </Link>
                      {item.shade && <p className="text-xs text-cocoa/70">Shade: {item.shade}</p>}
                      <p className="mt-1 text-sm text-cocoa">{formatINR(item.product.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.key)}
                      className="text-cocoa/50 transition hover:text-rose-500"
                      aria-label="Remove"
                    >
                      <TrashIcon size={18} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-beige">
                      <button onClick={() => updateQty(item.key, item.qty - 1)} className="px-3 py-2 text-cocoa hover:text-espresso" aria-label="Decrease">
                        <MinusIcon size={15} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="px-3 py-2 text-cocoa hover:text-espresso" aria-label="Increase">
                        <PlusIcon size={15} />
                      </button>
                    </div>
                    <span className="font-medium text-espresso">{formatINR(item.lineTotal)}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-golddark hover:underline">
              ← Continue shopping
            </Link>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-white/70 p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl text-espresso">Order Summary</h2>

            <form onSubmit={applyCoupon} className="mt-5 flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="input-lux flex-1"
              />
              <button type="submit" className="btn-outline">Apply</button>
            </form>
            <p className="mt-1.5 text-xs text-cocoa/60">Try LUMERA10, GLOW20 or WELCOME</p>

            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              {applied && (
                <Row label={`Discount (${applied.code})`} value={`− ${formatINR(discount)}`} accent />
              )}
              <Row label="Shipping" value={shipping === 0 ? 'Free' : formatINR(shipping)} />
              {afterDiscount < FREE_SHIP_THRESHOLD && afterDiscount > 0 && (
                <p className="text-xs text-cocoa/60">
                  Add {formatINR(FREE_SHIP_THRESHOLD - afterDiscount)} more for free shipping.
                </p>
              )}
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-beige pt-4">
              <span className="font-serif text-lg text-espresso">Total</span>
              <span className="font-serif text-2xl text-espresso">{formatINR(total)}</span>
            </div>

            <Link to="/checkout" className="btn-primary mt-6 w-full">
              Checkout <ArrowIcon size={18} />
            </Link>
            <p className="mt-3 text-center text-xs text-cocoa/60">Secure checkout · Free returns within 14 days</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-cocoa">{label}</dt>
      <dd className={accent ? 'font-medium text-golddark' : 'text-espresso'}>{value}</dd>
    </div>
  )
}

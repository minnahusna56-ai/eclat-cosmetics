import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { formatINR } from '../data/products.js'
import { CheckIcon } from '../components/icons.jsx'

const FREE_SHIP_THRESHOLD = 1499
const SHIPPING_FEE = 99

export default function Checkout() {
  const { cartDetailed, subtotal, clearCart, toast } = useStore()
  const [placed, setPlaced] = useState(false)
  const [payment, setPayment] = useState('card')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
  })
  const [errors, setErrors] = useState({})

  const shipping = subtotal >= FREE_SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit phone'
    if (!form.address.trim()) e.address = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.state.trim()) e.state = 'Required'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a 6-digit pincode'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const placeOrder = (e) => {
    e.preventDefault()
    if (cartDetailed.length === 0) {
      toast('Your bag is empty', 'info')
      return
    }
    if (!validate()) {
      toast('Please complete the highlighted fields', 'info')
      return
    }
    setPlaced(true)
    clearCart()
    toast('Order placed successfully!')
  }

  if (placed) {
    return (
      <div className="pt-24 md:pt-28">
        <div className="container-lux flex flex-col items-center py-28 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/20 text-golddark">
            <CheckIcon size={40} />
          </span>
          <h1 className="mt-6 font-serif text-4xl text-espresso">Thank you!</h1>
          <p className="mt-3 max-w-md text-cocoa">
            Your order has been placed successfully. A confirmation has been sent to your email.
            Your glow is on its way.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
            <Link to="/" className="btn-outline">Back Home</Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartDetailed.length === 0) {
    return (
      <div className="pt-24 md:pt-28">
        <div className="container-lux flex flex-col items-center py-28 text-center">
          <h1 className="font-serif text-3xl text-espresso">Your bag is empty</h1>
          <p className="mt-2 text-sm text-cocoa/70">Add products before checking out.</p>
          <Link to="/shop" className="btn-primary mt-6">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="container-lux py-10">
        <h1 className="font-serif text-4xl text-espresso">Checkout</h1>

        <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Customer info */}
            <Section title="Customer Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" error={errors.firstName}>
                  <input className="input-lux" value={form.firstName} onChange={set('firstName')} />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input className="input-lux" value={form.lastName} onChange={set('lastName')} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input className="input-lux" value={form.email} onChange={set('email')} placeholder="you@email.com" />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input className="input-lux" value={form.phone} onChange={set('phone')} placeholder="10-digit number" />
                </Field>
              </div>
            </Section>

            {/* Address */}
            <Section title="Delivery Address">
              <div className="grid gap-4">
                <Field label="Street address" error={errors.address}>
                  <input className="input-lux" value={form.address} onChange={set('address')} placeholder="House no, street, area" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="City" error={errors.city}>
                    <input className="input-lux" value={form.city} onChange={set('city')} />
                  </Field>
                  <Field label="State" error={errors.state}>
                    <input className="input-lux" value={form.state} onChange={set('state')} />
                  </Field>
                  <Field label="Pincode" error={errors.pincode}>
                    <input className="input-lux" value={form.pincode} onChange={set('pincode')} />
                  </Field>
                </div>
              </div>
            </Section>

            {/* Payment */}
            <Section title="Payment Method">
              <div className="grid gap-3">
                {[
                  ['card', 'Credit / Debit Card'],
                  ['upi', 'UPI'],
                  ['cod', 'Cash on Delivery'],
                ].map(([id, label]) => (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      payment === id ? 'border-gold bg-gold/10' : 'border-beige hover:border-gold/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                      className="accent-gold"
                    />
                    <span className="text-sm text-espresso">{label}</span>
                  </label>
                ))}
              </div>

              {payment === 'card' && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Card number">
                    <input className="input-lux" placeholder="1234 5678 9012 3456" />
                  </Field>
                  <Field label="Name on card">
                    <input className="input-lux" placeholder="Full name" />
                  </Field>
                  <Field label="Expiry">
                    <input className="input-lux" placeholder="MM/YY" />
                  </Field>
                  <Field label="CVV">
                    <input className="input-lux" placeholder="•••" />
                  </Field>
                </div>
              )}
              {payment === 'upi' && (
                <div className="mt-4">
                  <Field label="UPI ID">
                    <input className="input-lux" placeholder="yourname@upi" />
                  </Field>
                </div>
              )}
            </Section>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-3xl bg-white/70 p-6 shadow-card lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl text-espresso">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {cartDetailed.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-sand">
                    <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-espresso text-[10px] text-cream">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-espresso">{item.product.name}</p>
                    {item.shade && <p className="text-xs text-cocoa/60">{item.shade}</p>}
                  </div>
                  <span className="text-sm text-espresso">{formatINR(item.lineTotal)}</span>
                </div>
              ))}
            </div>
            <dl className="mt-5 space-y-2 border-t border-beige pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-cocoa">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-cocoa">Shipping</dt><dd>{shipping === 0 ? 'Free' : formatINR(shipping)}</dd></div>
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-beige pt-3">
              <span className="font-serif text-lg text-espresso">Total</span>
              <span className="font-serif text-2xl text-espresso">{formatINR(total)}</span>
            </div>
            <button type="submit" className="btn-primary mt-6 w-full">Place Order</button>
          </aside>
        </form>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-3xl bg-white/70 p-6 shadow-card">
      <h2 className="mb-4 font-serif text-2xl text-espresso">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-espresso">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-500">{error}</span>}
    </label>
  )
}

import { useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { toast } = useStore()

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email', 'info')
      return
    }
    toast('Welcome to ÉCLAT — check your inbox!')
    setEmail('')
  }

  return (
    <section className="container-lux py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-14 text-center text-cream sm:px-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-nude/15 blur-3xl" />
        <span className="section-label">Join the list</span>
        <h2 className="mx-auto mt-3 max-w-xl font-serif text-3xl sm:text-4xl">
          Get 10% off your first order
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
          Beauty tips, new launches and members-only offers, delivered gently to your inbox.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 rounded-full border border-cream/25 bg-cream/10 px-5 py-3 text-sm text-cream placeholder-cream/50 outline-none focus:border-gold"
          />
          <button type="submit" className="btn-gold">Subscribe</button>
        </form>
      </div>
    </section>
  )
}

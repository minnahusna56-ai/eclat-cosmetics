import { useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'

export default function Contact() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    toast('Thank you — we will be in touch soon!')
    setForm({ name: '', email: '', message: '' })
    setErrors({})
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="pt-24 md:pt-28">
      <div className="border-b border-beige bg-sand/50">
        <div className="container-lux py-12 text-center">
          <span className="section-label">Get in touch</span>
          <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cocoa/70">
            Questions about a product, an order, or a partnership? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container-lux grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {[
            ['Email', 'hello@lumera.beauty'],
            ['Phone', '+91 98765 43210'],
            ['Studio', 'Bandra West, Mumbai, India'],
            ['Hours', 'Mon–Sat · 10am – 7pm IST'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/70 p-5 shadow-card">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{label}</p>
              <p className="mt-1 text-espresso">{value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-white/70 p-7 shadow-card">
          <div className="grid gap-5">
            <Field label="Name" error={errors.name}>
              <input className="input-lux" value={form.name} onChange={set('name')} placeholder="Your name" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className="input-lux" value={form.email} onChange={set('email')} placeholder="you@email.com" />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea
                className="input-lux min-h-[140px] resize-none"
                value={form.message}
                onChange={set('message')}
                placeholder="How can we help?"
              />
            </Field>
            <button type="submit" className="btn-primary">Send Message</button>
          </div>
        </form>
      </div>
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

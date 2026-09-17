import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { GoogleIcon } from '../components/icons.jsx'

export default function Login() {
  const { toast } = useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const validate = () => {
    const e = {}
    if (mode === 'signup' && !form.name.trim()) e.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    toast(mode === 'login' ? 'Welcome back to ÉCLAT!' : 'Account created — welcome!')
    navigate('/')
  }

  return (
    <div className="pt-24 md:pt-28">
      <div className="container-lux grid min-h-[70vh] items-center gap-0 py-10 lg:grid-cols-2 lg:gap-12">
        {/* Visual */}
        <div className="relative hidden overflow-hidden rounded-[2.5rem] lg:block">
          <img
            src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80"
            alt="ÉCLAT"
            className="h-full min-h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/70 to-transparent p-10 text-cream">
            <h2 className="font-serif text-4xl">Beauty, Simplified.</h2>
            <p className="mt-2 max-w-xs text-cream/80">Join ÉCLAT for members-only offers and early access.</p>
          </div>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md rounded-[2rem] bg-white/70 p-8 shadow-card sm:p-10">
          <div className="text-center">
            <Link to="/" className="font-serif text-3xl tracking-[0.35em] text-espresso">
              <span className="text-gold">É</span>CLAT
            </Link>
            <h1 className="mt-6 font-serif text-3xl text-espresso">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="mt-1 text-sm text-cocoa/70">
              {mode === 'login' ? 'Sign in to continue' : 'Join the ÉCLAT community'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => { toast('Google sign-in (demo)'); }}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-beige bg-white py-3 text-sm font-medium text-espresso transition hover:border-gold"
          >
            <GoogleIcon size={18} /> Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4 text-xs text-cocoa/50">
            <span className="h-px flex-1 bg-beige" /> or {mode === 'login' ? 'sign in' : 'sign up'} with email
            <span className="h-px flex-1 bg-beige" />
          </div>

          <form onSubmit={submit} className="grid gap-4">
            {mode === 'signup' && (
              <Field label="Full name" error={errors.name}>
                <input className="input-lux" value={form.name} onChange={set('name')} placeholder="Your name" />
              </Field>
            )}
            <Field label="Email" error={errors.email}>
              <input className="input-lux" value={form.email} onChange={set('email')} placeholder="you@email.com" />
            </Field>
            <Field label="Password" error={errors.password}>
              <input type="password" className="input-lux" value={form.password} onChange={set('password')} placeholder="••••••••" />
            </Field>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-cocoa">
                  <input type="checkbox" className="accent-gold" /> Remember me
                </label>
                <button type="button" onClick={() => toast('Password reset link sent (demo)')} className="text-golddark hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="btn-primary mt-1 w-full">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cocoa">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}) }}
              className="font-medium text-golddark hover:underline"
            >
              {mode === 'login' ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-medium text-espresso">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-rose-500">{error}</span>}
    </label>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { SearchIcon, HeartIcon, BagIcon, UserIcon, MenuIcon, CloseIcon } from './icons.jsx'
import { categories } from '../data/products.js'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount, wishlist } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const solid = scrolled || !isHome || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCatOpen(false)
  }, [location.pathname])

  const submitSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  const linkColor = solid ? 'text-espresso' : 'text-espresso'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-cream/90 shadow-[0_1px_0_rgba(184,155,135,0.18)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-lux flex h-16 items-center justify-between md:h-20">
        {/* Left: mobile menu + nav */}
        <div className="flex items-center gap-6">
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(0, 2).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition hover:text-golddark ${linkColor} ${
                    isActive ? 'text-golddark' : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className={`text-sm tracking-wide transition hover:text-golddark ${linkColor}`}>
                Categories
              </button>
              {catOpen && (
                <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4">
                  <div className="grid gap-1 rounded-2xl border border-beige bg-cream/95 p-3 shadow-soft backdrop-blur">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/shop?category=${c.id}`}
                        className="rounded-xl px-3 py-2 text-sm text-cocoa transition hover:bg-nude/40 hover:text-espresso"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Center: logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.35em] text-espresso md:text-3xl"
        >
          <span className="text-gold">É</span>CLAT
        </Link>

        {/* Right: nav + icons */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(2).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition hover:text-golddark ${linkColor} ${
                    isActive ? 'text-golddark' : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className={linkColor}>
            <SearchIcon size={21} />
          </button>
          <Link to="/wishlist" aria-label="Wishlist" className={`relative ${linkColor}`}>
            <HeartIcon size={21} />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link to="/login" aria-label="Account" className={`hidden sm:block ${linkColor}`}>
            <UserIcon size={21} />
          </Link>
          <Link to="/cart" aria-label="Cart" className={`relative ${linkColor}`}>
            <BagIcon size={21} />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-beige bg-cream/95 backdrop-blur md:hidden">
          <nav className="container-lux flex flex-col py-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className="border-b border-beige/60 py-3 text-sm tracking-wide text-espresso"
              >
                {l.label}
              </NavLink>
            ))}
            <p className="pt-4 pb-1 text-xs uppercase tracking-[0.25em] text-gold">Categories</p>
            <div className="grid grid-cols-2 gap-2 pb-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/shop?category=${c.id}`}
                  className="rounded-xl bg-white/70 px-3 py-2 text-sm text-cocoa"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-espresso/40 backdrop-blur-sm">
          <div className="mt-24 w-full max-w-2xl px-5">
            <div className="rounded-3xl bg-cream p-6 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-xl text-espresso">Search ÉCLAT</h3>
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={submitSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/50">
                    <SearchIcon size={18} />
                  </span>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “glow serum”, “lipstick”…"
                    className="input-lux pl-11"
                  />
                </div>
                <button type="submit" className="btn-gold">Search</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function Badge({ children }) {
  return (
    <span
      className="absolute -right-2 -top-2 flex min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-espresso"
      style={{ height: 18 }}
    >
      {children}
    </span>
  )
}

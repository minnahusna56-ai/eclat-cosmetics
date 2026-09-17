import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories, formatINR } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import { SearchIcon, CloseIcon } from '../components/icons.jsx'

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const MAX_PRICE = 3000

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const [category, setCategory] = useState(params.get('category') || 'all')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [sort, setSort] = useState('popularity')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sync from URL when it changes (e.g. navbar search / category links)
  useEffect(() => {
    setSearch(params.get('search') || '')
    setCategory(params.get('category') || 'all')
  }, [params])

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice)
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival))
        break
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews)
    }
    return list
  }, [category, search, maxPrice, sort])

  const updateCategory = (id) => {
    setCategory(id)
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setParams(next, { replace: true })
  }

  const clearAll = () => {
    setSearch('')
    setCategory('all')
    setMaxPrice(MAX_PRICE)
    setSort('popularity')
    setParams({}, { replace: true })
  }

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Search</h3>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/50">
            <SearchIcon size={18} />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="input-lux pl-11"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateCategory('all')}
            className={`chip ${category === 'all' ? 'border-gold bg-gold/15 text-espresso' : 'border-beige text-cocoa hover:border-gold'}`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateCategory(c.id)}
              className={`chip ${category === c.id ? 'border-gold bg-gold/15 text-espresso' : 'border-beige text-cocoa hover:border-gold'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Max Price</h3>
        <input
          type="range"
          min="500"
          max={MAX_PRICE}
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="mt-2 flex justify-between text-sm text-cocoa">
          <span>₹500</span>
          <span className="font-medium text-espresso">Up to {formatINR(maxPrice)}</span>
        </div>
      </div>

      <button onClick={clearAll} className="btn-outline w-full">
        Clear all filters
      </button>
    </div>
  )

  return (
    <div className="pt-24 md:pt-28">
      {/* Page header */}
      <div className="border-b border-beige bg-sand/50">
        <div className="container-lux py-10 text-center">
          <span className="section-label">The Collection</span>
          <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-5xl">Shop LUMÉRA</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cocoa/70">
            {filtered.length} product{filtered.length !== 1 && 's'} · clean, cruelty-free beauty
          </p>
        </div>
      </div>

      <div className="container-lux grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl bg-white/70 p-6 shadow-card">{FilterPanel}</div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="btn-outline lg:hidden"
            >
              Filters
            </button>
            <div className="ml-auto flex items-center gap-2">
              <label className="text-sm text-cocoa">Sort by</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-beige bg-white/70 px-4 py-2 text-sm outline-none focus:border-gold"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={filtered} emptyText="No products match your filters" />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-espresso/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-cream p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-espresso">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {FilterPanel}
            <button onClick={() => setFiltersOpen(false)} className="btn-primary mt-6 w-full">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

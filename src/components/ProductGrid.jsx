import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, emptyText = 'No products found.' }) {
  if (!products.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center rounded-3xl bg-white/60 py-20 text-center">
        <p className="font-serif text-2xl text-cocoa">{emptyText}</p>
        <p className="mt-2 text-sm text-cocoa/60">Try adjusting your filters or search.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}

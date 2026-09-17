import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <span className="font-serif text-7xl text-gold">404</span>
      <h1 className="mt-4 font-serif text-3xl text-espresso">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-cocoa/70">
        The page you're looking for has wandered off. Let's get you back to the beauty.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn-primary">Back Home</Link>
        <Link to="/shop" className="btn-outline">Shop</Link>
      </div>
    </div>
  )
}

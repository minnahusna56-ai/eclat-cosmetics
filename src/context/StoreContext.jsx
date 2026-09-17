import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { getProductById } from '../data/products.js'

const StoreContext = createContext(null)

const CART_KEY = 'lumera_cart'
const WISH_KEY = 'lumera_wishlist'

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY, []))
  const [wishlist, setWishlist] = useState(() => load(WISH_KEY, []))
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const toast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2800)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const addToCart = useCallback(
    (productId, { qty = 1, shade = null } = {}) => {
      const product = getProductById(productId)
      if (!product) return
      setCart((prev) => {
        const key = `${productId}__${shade || 'default'}`
        const existing = prev.find((i) => i.key === key)
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
        }
        return [...prev, { key, productId, shade, qty }]
      })
      toast(`${product.name} added to bag`)
    },
    [toast]
  )

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQty = useCallback((key, qty) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (productId) => {
      const product = getProductById(productId)
      setWishlist((prev) => {
        if (prev.includes(productId)) {
          toast(`${product?.name || 'Item'} removed from wishlist`, 'info')
          return prev.filter((id) => id !== productId)
        }
        toast(`${product?.name || 'Item'} added to wishlist`)
        return [...prev, productId]
      })
    },
    [toast]
  )

  const isWished = useCallback((productId) => wishlist.includes(productId), [wishlist])

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProductById(item.productId)
          if (!product) return null
          return { ...item, product, lineTotal: product.price * item.qty }
        })
        .filter(Boolean),
    [cart]
  )

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart])
  const subtotal = useMemo(
    () => cartDetailed.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartDetailed]
  )

  const value = {
    cart,
    cartDetailed,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    wishlist,
    toggleWishlist,
    isWished,
    toast,
    toasts,
    dismissToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

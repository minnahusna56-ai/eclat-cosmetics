import { useStore } from '../context/StoreContext.jsx'
import { CheckIcon, CloseIcon } from './icons.jsx'

export default function Toasts() {
  const { toasts, dismissToast } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[60] flex flex-col gap-3 sm:right-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-beige bg-white/95 px-4 py-3 shadow-soft backdrop-blur animate-fadeUp"
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full ${
              t.type === 'info' ? 'bg-nude/60 text-cocoa' : 'bg-gold/25 text-golddark'
            }`}
          >
            <CheckIcon size={16} />
          </span>
          <p className="pr-2 text-sm text-espresso">{t.message}</p>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-cocoa/50 transition hover:text-espresso"
            aria-label="Dismiss"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

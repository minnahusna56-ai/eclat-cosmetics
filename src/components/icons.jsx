// Minimal inline SVG icon set (stroke-based, inherits currentColor).
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icon = ({ path, size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>
    {path}
  </svg>
)

export const SearchIcon = (p) => (
  <Icon {...p} path={<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>} />
)
export const HeartIcon = ({ filled, ...p }) => (
  <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" {...base} fill={filled ? 'currentColor' : 'none'} {...p}>
    <path d="M12 20s-7-4.6-9.3-9.1C1 7.6 2.7 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.3 0 5 3.1 3.3 6.4C19 15.4 12 20 12 20Z" />
  </svg>
)
export const BagIcon = (p) => (
  <Icon {...p} path={<><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>} />
)
export const UserIcon = (p) => (
  <Icon {...p} path={<><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" /></>} />
)
export const MenuIcon = (p) => (
  <Icon {...p} path={<><path d="M4 7h16M4 12h16M4 17h16" /></>} />
)
export const CloseIcon = (p) => (
  <Icon {...p} path={<><path d="M6 6l12 12M18 6 6 18" /></>} />
)
export const StarIcon = ({ filled, ...p }) => (
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill={filled ? '#C7A567' : 'none'} stroke="#C7A567" strokeWidth="1.4" strokeLinejoin="round" {...p}>
    <path d="m12 3 2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.9 6.6 19.5l1.2-6L3.4 9.3l6-.7L12 3Z" />
  </svg>
)
export const PlusIcon = (p) => <Icon {...p} path={<path d="M12 5v14M5 12h14" />} />
export const MinusIcon = (p) => <Icon {...p} path={<path d="M5 12h14" />} />
export const CheckIcon = (p) => <Icon {...p} path={<path d="m5 13 4 4L19 7" />} />
export const ArrowIcon = (p) => (
  <Icon {...p} path={<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>} />
)
export const TrashIcon = (p) => (
  <Icon {...p} path={<><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" /></>} />
)
export const GoogleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6C12.1 13.3 17.6 9.5 24 9.5Z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.4Z" />
    <path fill="#FBBC05" d="M10.3 28.7a14.5 14.5 0 0 1 0-9.3l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l7.8-6Z" />
    <path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.3-5.5l-7.6-5.9c-2.1 1.4-4.8 2.3-7.7 2.3-6.4 0-11.9-3.8-13.7-9.2l-7.8 6C6.4 42.6 14.6 48 24 48Z" />
  </svg>
)

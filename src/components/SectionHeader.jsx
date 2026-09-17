import { Link } from 'react-router-dom'

export default function SectionHeader({ label, title, subtitle, link, linkText = 'View all', center }) {
  return (
    <div className={`mb-8 flex flex-wrap items-end justify-between gap-4 ${center ? 'flex-col items-center text-center' : ''}`}>
      <div>
        {label && <span className="section-label">{label}</span>}
        <h2 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-sm text-cocoa/70">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-sm font-medium tracking-wide text-golddark underline-offset-4 hover:underline">
          {linkText} →
        </Link>
      )}
    </div>
  )
}

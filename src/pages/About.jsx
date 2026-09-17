import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader.jsx'
import { ArrowIcon } from '../components/icons.jsx'

const values = [
  { title: 'Clean by promise', text: 'Formulated without parabens, sulphates or needless fillers. Only what your skin loves.' },
  { title: 'Cruelty-free always', text: 'Never tested on animals. Beauty should never come at a cost to another being.' },
  { title: 'Thoughtful design', text: 'Refillable, recyclable and beautiful enough to leave on display.' },
  { title: 'Real results', text: 'Dermatologist-tested formulas backed by ingredients that actually perform.' },
]

export default function About() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand/60">
        <div className="container-lux grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <span className="section-label">Our Story</span>
            <h1 className="mt-3 font-serif text-5xl leading-tight text-espresso sm:text-6xl">
              Beauty, made simple
            </h1>
            <p className="mt-6 max-w-md leading-relaxed text-cocoa">
              ÉCLAT was born from a simple belief: that beauty should feel effortless, honest and
              kind. We craft clean formulas that celebrate your natural glow — never masking it,
              always enhancing it.
            </p>
            <Link to="/shop" className="btn-primary mt-8 w-fit">
              Explore the Collection <ArrowIcon size={18} />
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
              alt="ÉCLAT story"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-lux py-20 text-center">
        <span className="section-label">Our Mission</span>
        <p className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-snug text-espresso sm:text-4xl">
          To create beauty essentials that are clean, effective and beautifully simple — so you can
          feel confident in your own skin, every single day.
        </p>
      </section>

      {/* Values */}
      <section className="container-lux pb-8">
        <SectionHeader center label="What we stand for" title="Our Values" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="reveal rounded-3xl bg-white/70 p-7 shadow-card" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-serif text-3xl text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-xl text-espresso">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cocoa">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clean beauty philosophy */}
      <section className="container-lux py-20">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-nude/40 p-8 sm:p-14 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-card">
            <img
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
              alt="Clean beauty"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="section-label">Clean Beauty Philosophy</span>
            <h2 className="mt-3 font-serif text-4xl text-espresso">Nothing to hide</h2>
            <p className="mt-4 leading-relaxed text-cocoa">
              We believe transparency is beautiful. Every ÉCLAT formula is thoughtfully composed
              with skin-loving ingredients and free from the things you don't need. Clean, always —
              because what you put on your skin matters.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cocoa">
              {['No parabens or sulphates', 'Vegan & cruelty-free', 'Dermatologist tested', 'Recyclable packaging'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Everyday */}
      <section className="relative overflow-hidden bg-espresso py-24 text-center text-cream">
        <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="container-lux">
          <span className="section-label">The ÉCLAT way</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
            Beauty made for every day
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            Effortless rituals that fit into real life. Because the most beautiful thing you can wear
            is confidence in your own skin.
          </p>
          <Link to="/shop" className="btn-gold mt-8">Shop Now</Link>
        </div>
      </section>
    </div>
  )
}

import { m, useReducedMotion } from 'framer-motion'
import { useItems, useSection } from '../content/ContentContext.jsx'

export default function Philosophy() {
  const reduce = useReducedMotion()
  const s = useSection('philosophy')
  const lines = useItems('philosophy_lines')
  return (
    <section className="bg-ink py-24 text-white sm:py-32" aria-labelledby="philosophy-heading">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <h2 id="philosophy-heading" className="text-5xl font-bold leading-[1.02] sm:text-6xl lg:sticky lg:top-28 lg:self-start">
          {s.heading}
        </h2>

        <ul>
          {lines.map((line, i) => {
            const last = i === lines.length - 1
            return (
              <m.li
                key={line.id}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`border-b border-white/15 py-6 font-display text-3xl font-medium sm:text-4xl ${
                  last ? 'text-[#8FA6FF]' : 'text-white'
                }`}
              >
                {line.text}
              </m.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

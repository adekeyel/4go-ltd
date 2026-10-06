import { m, useReducedMotion } from 'framer-motion'

const lines = [
  'It should solve problems.',
  'It should remove friction.',
  'It should create opportunities.',
  'It should connect people.',
  'It should help businesses grow.',
  'And it should be built to evolve.',
]

export default function Philosophy() {
  const reduce = useReducedMotion()
  return (
    <section className="bg-ink py-24 text-white sm:py-32" aria-labelledby="philosophy-heading">
      <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <h2 id="philosophy-heading" className="text-5xl font-bold leading-[1.02] sm:text-6xl lg:sticky lg:top-28 lg:self-start">
          Technology should do more than work.
        </h2>

        <ul>
          {lines.map((line, i) => {
            const last = i === lines.length - 1
            return (
              <m.li
                key={line}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`border-b border-white/15 py-6 font-display text-3xl font-medium sm:text-4xl ${
                  last ? 'text-[#8FA6FF]' : 'text-white'
                }`}
              >
                {line}
              </m.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

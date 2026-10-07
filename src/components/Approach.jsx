import { useItems, useSection } from '../content/ContentContext.jsx'

export default function Approach() {
  const s = useSection('approach')
  const steps = useItems('approach_steps')
  return (
    <section className="py-24 sm:py-32" aria-labelledby="approach-heading">
      <div className="wrap">
        <h2 id="approach-heading" className="max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>

        <ol className="mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.id} className="relative border-t-2 border-ink pt-8">
              <span aria-hidden="true" className="absolute -top-[7px] left-0 h-3 w-3 bg-signal" />
              <p className="font-display text-sm font-bold text-signal">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-3xl font-bold">{step.title}</h3>
              <p className="mt-4 max-w-xs leading-relaxed text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

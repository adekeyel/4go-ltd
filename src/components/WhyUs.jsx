import { useItems, useSection } from '../content/ContentContext.jsx'

export default function WhyUs() {
  const s = useSection('why')
  const points = useItems('why_points')
  return (
    <section className="py-24 sm:py-32" aria-labelledby="why-heading">
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-20">
        <h2 id="why-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>
        <ul>
          {points.map((p) => (
            <li key={p.id} className="flex items-baseline gap-4 border-b border-line py-4 text-lg first:border-t">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-signal" />
              {p.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

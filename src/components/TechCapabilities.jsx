import { useItems, useSection } from '../content/ContentContext.jsx'

export default function TechCapabilities() {
  const s = useSection('tech')
  const areas = useItems('tech_areas')
  return (
    <section className="border-y border-line bg-mist py-24 sm:py-32" aria-labelledby="tech-heading">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-20">
          <h2 id="tech-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate">{s.text}</p>
        </div>

        <dl className="mt-16 grid border-l border-t border-line bg-paper sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div key={a.id} className="border-b border-r border-line p-8">
              <dt className="font-display text-2xl font-bold">{a.name}</dt>
              <dd className="mt-3 leading-relaxed text-slate">{a.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

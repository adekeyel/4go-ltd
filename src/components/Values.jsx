import { useItems, useSection } from '../content/ContentContext.jsx'

export default function Values() {
  const s = useSection('values')
  const values = useItems('values')
  return (
    <section className="py-24 sm:py-32" aria-labelledby="values-heading">
      <div className="wrap">
        <h2 id="values-heading" className="text-4xl font-bold sm:text-5xl">{s.heading}</h2>
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <li key={v.id} className="border-t border-ink pt-5">
              <h3 className="text-2xl font-bold">{v.name}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-slate">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

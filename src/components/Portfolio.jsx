import { useItems, useSection } from '../content/ContentContext.jsx'

const safeUrl = (u) => (typeof u === 'string' && /^https?:\/\//i.test(u.trim()) ? u.trim() : null)

export default function Portfolio() {
  const s = useSection('portfolio')
  const work = useItems('portfolio')
  return (
    <section className="border-y border-line bg-mist py-24 sm:py-32" aria-labelledby="portfolio-heading">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="portfolio-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate">{s.text}</p>
        </div>

        <ul className="border-t border-ink">
          {work.map((w) => {
            const url = safeUrl(w.url)
            return (
              <li key={w.id} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
                <div>
                  <h3 className="text-xl font-bold">
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-signal">
                        {w.name}
                      </a>
                    ) : w.name}
                  </h3>
                  <p className="text-sm text-slate">{w.area}</p>
                </div>
                <p className="leading-relaxed text-slate">{w.text}</p>
              </li>
            )
          })}
          {s.more && <li className="border-b border-line py-6 text-slate">{s.more}</li>}
        </ul>
      </div>
    </section>
  )
}

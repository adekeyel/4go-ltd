import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { useSection } from '../content/ContentContext.jsx'

// Plain-text legal page. Blank line = new paragraph. A line starting with "## " = section heading.
export default function Legal({ sectionKey }) {
  const { pathname } = useLocation()
  const s = useSection(sectionKey)
  const blocks = String(s.body || '').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)
  return (
    <>
      <Seo path={pathname} title={s.title} description={`${s.title} for 4GO Technology LTD.`} />
      <section className="wrap py-20 sm:py-28">
        <h1 className="text-4xl font-bold sm:text-5xl">{s.title}</h1>
        <div className="mt-10 max-w-2xl space-y-5 leading-relaxed text-slate">
          {blocks.map((b, i) =>
            b.startsWith('## ')
              ? <h2 key={i} className="pt-4 font-display text-2xl font-bold text-ink">{b.slice(3)}</h2>
              : <p key={i} className="whitespace-pre-line">{b}</p>
          )}
        </div>
      </section>
    </>
  )
}

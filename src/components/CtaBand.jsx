import { Link } from 'react-router-dom'
import { useSection } from '../content/ContentContext.jsx'

export default function CtaBand() {
  const s = useSection('cta')
  return (
    <section className="bg-ink py-24 text-white sm:py-28" aria-labelledby="cta-heading">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="cta-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>
          <p className="mt-5 max-w-lg text-lg text-white/80">{s.text}</p>
        </div>
        <Link to="/contact" className="btn-primary bg-white !text-ink hover:!bg-signal hover:!text-white">{s.button}</Link>
      </div>
    </section>
  )
}

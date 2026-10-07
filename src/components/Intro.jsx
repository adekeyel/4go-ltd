import { Link } from 'react-router-dom'
import { useSection } from '../content/ContentContext.jsx'

export default function Intro() {
  const s = useSection('intro')
  return (
    <section className="py-24 sm:py-32" aria-labelledby="intro-heading">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <h2 id="intro-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">{s.heading}</h2>
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-slate">{s.text}</p>
          <Link to="/about" className="btn-quiet mt-8">{s.button}</Link>
        </div>
      </div>
    </section>
  )
}

import { glyphs, Generic } from './Glyphs.jsx'
import { useItems, useSection } from '../content/ContentContext.jsx'

export default function WhatWeBuild() {
  const s = useSection('build')
  const items = useItems('capabilities')
  return (
    <section className="border-t border-line bg-mist py-24 sm:py-32" aria-labelledby="build-heading">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 id="build-heading" className="text-4xl font-bold sm:text-5xl">{s.heading}</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate">{s.text}</p>
        </div>

        <ul className="mt-16 border-t border-ink">
          {items.map((item) => {
            const Glyph = glyphs[item.icon] || Generic
            return (
              <li
                key={item.id}
                className="group grid items-center gap-5 border-b border-line py-8 transition-colors hover:bg-paper sm:grid-cols-[5rem_1fr_1.3fr] sm:gap-10 sm:px-4"
              >
                <span className="text-ink transition-colors group-hover:text-signal"><Glyph /></span>
                <h3 className="text-2xl font-bold sm:text-3xl">{item.title}</h3>
                <p className="max-w-md leading-relaxed text-slate">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

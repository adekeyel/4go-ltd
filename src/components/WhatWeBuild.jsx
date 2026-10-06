import { Software, Platforms, Infrastructure, Business, Fintech, Mobile, Consulting } from './Glyphs.jsx'

const items = [
  { Glyph: Software, title: 'Software Development', text: 'Designing and developing modern web, mobile, and enterprise software applications.' },
  { Glyph: Platforms, title: 'Digital Platforms', text: 'Building scalable platforms that connect users, businesses, services, and digital experiences.' },
  { Glyph: Infrastructure, title: 'Technology Infrastructure', text: 'Developing the technical systems, APIs, architecture, and infrastructure that power digital products.' },
  { Glyph: Business, title: 'Business Technology Solutions', text: 'Creating technology that improves business processes, productivity, operations, and customer experiences.' },
  { Glyph: Fintech, title: 'Fintech Technology', text: 'Developing technology for digital financial services, payment systems, financial platforms, and related infrastructure.' },
  { Glyph: Mobile, title: 'Mobile Technology', text: 'Building mobile-first experiences and applications for modern users.' },
  { Glyph: Consulting, title: 'Technology Consulting', text: 'Helping organizations identify technology opportunities, design solutions, and turn ideas into working digital products.' },
]

export default function WhatWeBuild() {
  return (
    <section className="border-t border-line bg-mist py-24 sm:py-32" aria-labelledby="build-heading">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <h2 id="build-heading" className="text-4xl font-bold sm:text-5xl">What We Build</h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate">
            Seven areas of work, one standard: technology that is dependable, practical, and built to grow.
          </p>
        </div>

        <ul className="mt-16 border-t border-ink">
          {items.map(({ Glyph, title, text }) => (
            <li
              key={title}
              className="group grid items-center gap-5 border-b border-line py-8 transition-colors hover:bg-paper sm:grid-cols-[5rem_1fr_1.3fr] sm:gap-10 sm:px-4"
            >
              <span className="text-ink transition-colors group-hover:text-signal"><Glyph /></span>
              <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
              <p className="max-w-md leading-relaxed text-slate">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

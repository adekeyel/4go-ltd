const areas = [
  { name: 'Web', text: 'Modern web applications and platforms.' },
  { name: 'Mobile', text: 'Android and mobile-first experiences.' },
  { name: 'Backend', text: 'APIs, databases, authentication, business logic, and scalable services.' },
  { name: 'Cloud', text: 'Cloud infrastructure, deployment, hosting, monitoring, and scalability.' },
  { name: 'Integrations', text: 'Third-party APIs, payment systems, communication services, and business integrations.' },
  { name: 'Data', text: 'Data management, analytics, reporting, and intelligent systems.' },
]

export default function TechCapabilities() {
  return (
    <section className="border-y border-line bg-mist py-24 sm:py-32" aria-labelledby="tech-heading">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-20">
          <h2 id="tech-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">
            We understand the technology behind what we build.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-slate">
            From the screen a person taps to the systems that respond, our engineering covers the full stack.
          </p>
        </div>

        <dl className="mt-16 grid border-l border-t border-line bg-paper sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <div key={a.name} className="border-b border-r border-line p-8">
              <dt className="text-2xl font-bold font-display">{a.name}</dt>
              <dd className="mt-3 leading-relaxed text-slate">{a.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

const steps = [
  { n: '01', title: 'Understand', text: 'We identify the problem, users, business objectives, and technical requirements.' },
  { n: '02', title: 'Design', text: 'We turn ideas and requirements into intuitive digital experiences and scalable system architecture.' },
  { n: '03', title: 'Build', text: 'We develop reliable software using modern technologies and engineering practices.' },
  { n: '04', title: 'Improve', text: 'We monitor, refine, and evolve products as users, businesses, and technology change.' },
]

export default function Approach() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="approach-heading">
      <div className="wrap">
        <h2 id="approach-heading" className="max-w-2xl text-4xl font-bold leading-[1.05] sm:text-5xl">
          How we approach every project.
        </h2>

        <ol className="mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {steps.map((s) => (
            <li key={s.n} className="relative border-t-2 border-ink pt-8">
              <span aria-hidden="true" className="absolute -top-[7px] left-0 h-3 w-3 bg-signal" />
              <p className="font-display text-sm font-bold text-signal">{s.n}</p>
              <h3 className="mt-3 text-3xl font-bold">{s.title}</h3>
              <p className="mt-4 max-w-xs leading-relaxed text-slate">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const values = [
  { name: 'Innovation', text: 'We continuously explore better ways to solve problems.' },
  { name: 'Simplicity', text: 'Complex technology should create simple experiences.' },
  { name: 'Reliability', text: 'The systems we build should be dependable and resilient.' },
  { name: 'Impact', text: 'We focus on technology that creates meaningful value.' },
  { name: 'Continuous Improvement', text: 'We build, learn, measure, and improve.' },
  { name: 'Responsibility', text: 'We take security, privacy, trust, and responsible technology seriously.' },
]

export default function Values() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="values-heading">
      <div className="wrap">
        <h2 id="values-heading" className="text-4xl font-bold sm:text-5xl">What we hold ourselves to.</h2>
        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <li key={v.name} className="border-t border-ink pt-5">
              <h3 className="text-2xl font-bold">{v.name}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-slate">{v.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

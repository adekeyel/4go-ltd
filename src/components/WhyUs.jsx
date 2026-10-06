const points = [
  'Technology built for real-world use',
  'Product-focused engineering',
  'Scalable architecture',
  'Modern development practices',
  'User-centered design',
  'Strong understanding of African markets',
  'Long-term technology thinking',
]

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="why-heading">
      <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-20">
        <h2 id="why-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">Why build with 4GO?</h2>
        <ul>
          {points.map((p) => (
            <li key={p} className="flex items-baseline gap-4 border-b border-line py-4 text-lg first:border-t">
              <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-signal" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

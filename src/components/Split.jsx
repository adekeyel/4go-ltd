// Heading on the left, body copy on the right. dark / tint control the background.
export default function Split({ id, title, children, dark = false, tint = false }) {
  const bg = dark ? 'bg-ink text-white' : tint ? 'border-y border-line bg-mist' : ''
  const body = dark ? 'text-white/80' : 'text-slate'
  return (
    <section className={`py-24 sm:py-28 ${bg}`} aria-labelledby={id}>
      <div className="wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <h2 id={id} className="text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h2>
        <div className={`max-w-xl space-y-5 text-lg leading-relaxed ${body}`}>{children}</div>
      </div>
    </section>
  )
}

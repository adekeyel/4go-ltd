export default function PageHero({ title, intro }) {
  return (
    <section className="hero-grid border-b border-line">
      <div className="wrap py-20 sm:py-28">
        <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] sm:text-6xl xl:text-7xl">{title}</h1>
        {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate">{intro}</p>}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

export default function CtaBand() {
  return (
    <section className="bg-ink py-24 text-white sm:py-28" aria-labelledby="cta-heading">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="cta-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">Let&rsquo;s build what comes next.</h2>
          <p className="mt-5 max-w-lg text-lg text-white/80">
            Have an idea, business challenge, or technology opportunity? We&rsquo;d like to hear about it.
          </p>
        </div>
        <Link to="/contact" className="btn-primary bg-white !text-ink hover:!bg-signal hover:!text-white">Contact 4GO</Link>
      </div>
    </section>
  )
}

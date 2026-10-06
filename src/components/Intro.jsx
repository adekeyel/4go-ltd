import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <section className="py-24 sm:py-32" aria-labelledby="intro-heading">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <h2 id="intro-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">
          Technology built around real problems.
        </h2>
        <div>
          <p className="max-w-xl text-lg leading-relaxed text-slate">
            At 4GO Technology LTD, we believe technology is most valuable when it solves meaningful problems. We design
            and develop digital solutions that help people, businesses, and organizations operate more efficiently,
            connect with their customers, and participate in an increasingly digital world.
          </p>
          <Link to="/about" className="btn-quiet mt-8">Learn More</Link>
        </div>
      </div>
    </section>
  )
}

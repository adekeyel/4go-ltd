import { Link } from 'react-router-dom'
import { m, useReducedMotion } from 'framer-motion'
import Seo from '../components/Seo.jsx'
import HeroVisual from '../components/HeroVisual.jsx'
import Intro from '../components/Intro.jsx'
import WhatWeBuild from '../components/WhatWeBuild.jsx'
import Philosophy from '../components/Philosophy.jsx'
import Approach from '../components/Approach.jsx'
import TechCapabilities from '../components/TechCapabilities.jsx'
import Future from '../components/Future.jsx'
import Values from '../components/Values.jsx'
import Portfolio from '../components/Portfolio.jsx'
import WhyUs from '../components/WhyUs.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Home() {
  const reduce = useReducedMotion()
  const enter = (delay) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' } }

  return (
    <>
      <Seo
        path="/"
        title="Home"
        description="4GO Technology LTD is a Nigerian technology company building digital products, platforms, software and technology solutions for real-world problems."
      />

      <section className="hero-grid border-b border-line">
        <div className="wrap grid items-center gap-12 py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <div>
            <m.h1 {...enter(0)} className="text-5xl font-bold leading-[1.02] sm:text-6xl xl:text-7xl">
              Building Technology for What&rsquo;s Next.
            </m.h1>
            <m.p {...enter(0.15)} className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
              4GO Technology LTD is a Nigerian technology company building digital products, platforms, software, and
              technology solutions designed to solve real-world problems and create new possibilities.
            </m.p>
            <m.div {...enter(0.3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/what-we-do" className="btn-primary">Explore What We Do</Link>
              <Link to="/contact" className="btn-quiet">Talk to Us</Link>
            </m.div>
          </div>

          <m.div {...enter(0.2)} className="mx-auto w-full max-w-xl lg:max-w-none">
            <HeroVisual />
          </m.div>
        </div>
      </section>

      <Intro />
      <WhatWeBuild />
      <Philosophy />
      <Approach />
      <TechCapabilities />
      <Future />
      <Values />
      <Portfolio />
      <WhyUs />
      <CtaBand />
    </>
  )
}

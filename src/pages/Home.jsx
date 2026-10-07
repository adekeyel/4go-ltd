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
import { useSection } from '../content/ContentContext.jsx'

export default function Home() {
  const reduce = useReducedMotion()
  const hero = useSection('hero')
  const seo = useSection('seo_home')
  const enter = (delay) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' } }

  return (
    <>
      <Seo path="/" title={seo.title} description={seo.description} />

      <section className="hero-grid border-b border-line">
        <div className="wrap grid items-center gap-12 py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <div>
            <m.h1 {...enter(0)} className="text-5xl font-bold leading-[1.02] sm:text-6xl xl:text-7xl">
              {hero.headline}
            </m.h1>
            <m.p {...enter(0.15)} className="mt-7 max-w-xl text-lg leading-relaxed text-slate">
              {hero.text}
            </m.p>
            <m.div {...enter(0.3)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/what-we-do" className="btn-primary">{hero.primary_cta}</Link>
              <Link to="/contact" className="btn-quiet">{hero.secondary_cta}</Link>
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

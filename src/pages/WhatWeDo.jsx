import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import WhatWeBuild from '../components/WhatWeBuild.jsx'
import Approach from '../components/Approach.jsx'
import Split from '../components/Split.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function WhatWeDo() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo
        path={pathname}
        title="What We Do"
        description="Software development, digital platforms, technology infrastructure and business technology solutions from 4GO Technology LTD, a technology company in Nigeria."
      />
      <PageHero
        title="What we do."
        intro="We design, build, and evolve digital products, software, platforms, and the technology infrastructure behind them."
      />
      <WhatWeBuild />
      <Approach />
      <Split id="work-heading" title="Working with us" tint>
        <p>There are three common ways organizations and individuals work with 4GO.</p>
        <p>
          <strong className="font-semibold text-ink">Build something new.</strong> Bring an idea and we help turn it
          into a working digital product.
        </p>
        <p>
          <strong className="font-semibold text-ink">Strengthen what exists.</strong> We extend, modernize, and
          integrate existing platforms and systems.
        </p>
        <p>
          <strong className="font-semibold text-ink">Get clear direction.</strong> We advise on technology
          opportunities and help shape the right solution before building begins.
        </p>
      </Split>
      <CtaBand />
    </>
  )
}

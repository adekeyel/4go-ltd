import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import TechCapabilities from '../components/TechCapabilities.jsx'
import Split from '../components/Split.jsx'
import Future from '../components/Future.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Technology() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo
        path={pathname}
        title="Technology"
        description="The engineering behind 4GO Technology LTD: web, mobile, backend, cloud, integrations and data, built for reliability and scale."
      />
      <PageHero
        title="The engineering behind what we build."
        intro="Good products rest on good foundations. This is how we think about the technology underneath."
      />
      <TechCapabilities />
      <Split id="reliable-heading" title="Built to be relied on">
        <p>
          We build for dependability first. That means clear architecture, secure authentication and data handling,
          monitoring in production, and designs that can scale as usage grows.
        </p>
        <p>
          We use modern development practices and keep systems maintainable, so a product can keep improving long
          after its first release.
        </p>
      </Split>
      <Future />
      <CtaBand />
    </>
  )
}

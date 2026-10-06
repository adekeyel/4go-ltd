import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Philosophy from '../components/Philosophy.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Portfolio from '../components/Portfolio.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function Company() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo
        path={pathname}
        title="Company"
        description="How 4GO Technology LTD thinks about technology, why organizations build with us, and the products we have built."
      />
      <PageHero
        title="The company behind the technology."
        intro="How we think, why people build with us, and the products we have built along the way."
      />
      <Philosophy />
      <WhyUs />
      <Portfolio />
      <CtaBand />
    </>
  )
}

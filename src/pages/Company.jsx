import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Philosophy from '../components/Philosophy.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Portfolio from '../components/Portfolio.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { useSection } from '../content/ContentContext.jsx'

export default function Company() {
  const { pathname } = useLocation()
  const seo = useSection('seo_company')
  const hero = useSection('company_hero')
  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={hero.title} intro={hero.intro} />
      <Philosophy />
      <WhyUs />
      <Portfolio />
      <CtaBand />
    </>
  )
}

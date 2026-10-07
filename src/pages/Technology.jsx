import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import TechCapabilities from '../components/TechCapabilities.jsx'
import Split from '../components/Split.jsx'
import Paras from '../components/Paras.jsx'
import Future from '../components/Future.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { useSection } from '../content/ContentContext.jsx'

export default function Technology() {
  const { pathname } = useLocation()
  const seo = useSection('seo_technology')
  const hero = useSection('technology_hero')
  const rel = useSection('tech_reliable')
  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={hero.title} intro={hero.intro} />
      <TechCapabilities />
      <Split id="reliable-heading" title={rel.title}><Paras text={rel.body} /></Split>
      <Future />
      <CtaBand />
    </>
  )
}

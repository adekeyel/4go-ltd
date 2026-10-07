import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Split from '../components/Split.jsx'
import Paras from '../components/Paras.jsx'
import Approach from '../components/Approach.jsx'
import Values from '../components/Values.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { useSection } from '../content/ContentContext.jsx'

export default function About() {
  const { pathname } = useLocation()
  const seo = useSection('seo_about')
  const hero = useSection('about_hero')
  const what = useSection('about_what')
  const why = useSection('about_why')
  const vision = useSection('about_vision')
  const dir = useSection('about_direction')
  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={hero.title} intro={hero.intro} />
      <Split id="what-heading" title={what.title}><Paras text={what.body} /></Split>
      <Split id="why-heading" title={why.title} tint><Paras text={why.body} /></Split>
      <Approach />
      <Split id="vision-heading" title={vision.title} dark><Paras text={vision.body} /></Split>
      <Values />
      <Split id="direction-heading" title={dir.title} tint><Paras text={dir.body} /></Split>
      <CtaBand />
    </>
  )
}

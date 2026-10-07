import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import WhatWeBuild from '../components/WhatWeBuild.jsx'
import Approach from '../components/Approach.jsx'
import Split from '../components/Split.jsx'
import CtaBand from '../components/CtaBand.jsx'
import { useItems, useSection } from '../content/ContentContext.jsx'

export default function WhatWeDo() {
  const { pathname } = useLocation()
  const seo = useSection('seo_whatwedo')
  const hero = useSection('whatwedo_hero')
  const work = useSection('whatwedo_work')
  const ways = useItems('work_ways')
  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={hero.title} intro={hero.intro} />
      <WhatWeBuild />
      <Approach />
      <Split id="work-heading" title={work.title} tint>
        <p>{work.intro}</p>
        {ways.map((w) => (
          <p key={w.id}>
            <strong className="font-semibold text-ink">{w.title}</strong> {w.text}
          </p>
        ))}
      </Split>
      <CtaBand />
    </>
  )
}

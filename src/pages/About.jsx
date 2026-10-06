import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Split from '../components/Split.jsx'
import Approach from '../components/Approach.jsx'
import Values from '../components/Values.jsx'
import CtaBand from '../components/CtaBand.jsx'

export default function About() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo
        path={pathname}
        title="About"
        description="4GO Technology LTD is a Nigerian technology company developing digital products, software, platforms, and technology solutions built for real-world use."
      />
      <PageHero
        title="We are 4GO Technology LTD."
        intro="4GO Technology LTD is a Nigerian technology company focused on developing digital products, software, platforms, and technology solutions."
      />

      <Split id="what-heading" title="What we do">
        <p>
          We build digital products and the technology behind them. Our work spans web and mobile applications, the
          backend systems and infrastructure that power them, and the integrations that connect them to the wider
          digital economy.
        </p>
        <p>
          We are a technology company, not a single-product business. Each thing we build adds to a growing body of
          engineering knowledge that we carry into the next.
        </p>
      </Split>

      <Split id="why-heading" title="Why we exist" tint>
        <p>
          Technology is most useful when people can rely on it. We exist to build technology that is practical:
          dependable in daily use, simple to understand, and designed for the conditions people and businesses actually
          work in, including those of African markets.
        </p>
        <p>We start with the problem, then choose the tools. Never the other way around.</p>
      </Split>

      <Approach />

      <Split id="vision-heading" title="Our vision" dark>
        <p>
          To be a technology company that people and organizations trust to build well: products and platforms that
          grow with the people who use them, and that hold up as the world around them changes.
        </p>
      </Split>

      <Values />

      <Split id="direction-heading" title="Where we are heading" tint>
        <p>
          We are building for the long term. That means widening the range of products and platforms we develop,
          deepening the infrastructure underneath them, and growing a company whose engineering and standards scale with
          its ambitions.
        </p>
      </Split>

      <CtaBand />
    </>
  )
}

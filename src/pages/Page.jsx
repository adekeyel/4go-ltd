import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

// Temporary placeholder. Each page gets replaced in its own step.
export default function Page({ title, desc, noindex = false }) {
  const { pathname } = useLocation()
  return (
    <>
      <Seo title={title} description={desc} path={pathname} noindex={noindex} />
      <section className="wrap py-32">
        <h1 className="text-5xl font-bold sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-slate">{desc}</p>
      </section>
    </>
  )
}

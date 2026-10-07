import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useSection } from '../content/ContentContext.jsx'

export default function Contact() {
  const { pathname } = useLocation()
  const seo = useSection('seo_contact')
  const c = useSection('contact')
  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={c.heading} intro={c.text} />
      <section className="py-20 sm:py-24" aria-label="Contact form">
        <div className="wrap grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <ContactForm />
          <aside aria-label="Company contact details" className="space-y-8 lg:pt-1">
            <div className="border-t border-ink pt-5">
              <h2 className="text-xl font-bold">Email</h2>
              <p className="mt-2 text-slate">{c.email}</p>
            </div>
            <div className="border-t border-ink pt-5">
              <h2 className="text-xl font-bold">Location</h2>
              <p className="mt-2 text-slate">{c.location}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

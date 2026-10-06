import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo
        path={pathname}
        title="Contact"
        description="Contact 4GO Technology LTD about a product idea, business challenge or technology opportunity."
      />
      <PageHero
        title="Let’s build what comes next."
        intro="Have an idea, business challenge, or technology opportunity? We’d like to hear about it."
      />
      <section className="py-20 sm:py-24" aria-label="Contact form">
        <div className="wrap grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <ContactForm />
          <aside aria-label="Company contact details" className="space-y-8 lg:pt-1">
            <div className="border-t border-ink pt-5">
              <h2 className="text-xl font-bold">Email</h2>
              <p className="mt-2 text-slate">hello@your-domain.com</p>
            </div>
            <div className="border-t border-ink pt-5">
              <h2 className="text-xl font-bold">Location</h2>
              <p className="mt-2 text-slate">Lagos, Nigeria</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

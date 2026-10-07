import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { links } from './Navbar.jsx'
import { useSection } from '../content/ContentContext.jsx'

export default function Footer() {
  const f = useSection('footer')
  const c = useSection('contact')
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-white/70">{f.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {links.filter((l) => l.to !== '/company').map((l) => (
              <li key={l.to}><Link className="hover:text-white" to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>{c.email}</li>
            <li>{c.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} 4GO Technology LTD. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link className="hover:text-white" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="hover:text-white" to="/terms">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import Logo from './Logo.jsx'

export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/technology', label: 'Technology' },
  { to: '/company', label: 'Company' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-signal' : 'text-ink hover:text-signal'}`

  return (
    <>
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link to="/" aria-label="4GO Technology LTD home"><Logo /></Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-primary hidden sm:inline-flex">Talk to 4GO</Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 5h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </div>

    </header>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <div className="wrap flex flex-col py-6">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `border-b border-line py-4 font-display text-2xl ${isActive ? 'text-signal' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn-primary mt-8">Talk to 4GO</Link>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </>
  )
}

import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
const Page = lazy(() => import('./pages/Page.jsx'))
import Home from './pages/Home.jsx'
const About = lazy(() => import('./pages/About.jsx'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo.jsx'))
const Technology = lazy(() => import('./pages/Technology.jsx'))
const Company = lazy(() => import('./pages/Company.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/company" element={<Company />} />
        {/* Privacy and Terms need real legal text. */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Page title="Privacy Policy" desc="Our privacy policy is being prepared." />} />
        <Route path="/terms" element={<Page title="Terms of Use" desc="Our terms of use are being prepared." />} />
        <Route path="*" element={<Page title="Page not found" noindex desc="That page does not exist. Use the menu to find what you need." />} />
      </Route>
    </Routes>
  )
}

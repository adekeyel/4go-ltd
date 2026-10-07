import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
const Page = lazy(() => import('./pages/Page.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo.jsx'))
const Technology = lazy(() => import('./pages/Technology.jsx'))
const Company = lazy(() => import('./pages/Company.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen bg-mist" />}><AdminApp /></Suspense>} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal sectionKey="privacy" />} />
        <Route path="/terms" element={<Legal sectionKey="terms" />} />
        <Route path="*" element={<Page title="Page not found" noindex desc="That page does not exist. Use the menu to find what you need." />} />
      </Route>
    </Routes>
  )
}

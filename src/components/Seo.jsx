import { useEffect } from 'react'

const SITE = 'https://www.4go.com.ng'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const full = path === '/' ? title : `${title} | 4GO Technology LTD`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', SITE + path)
    setMeta('property', 'og:image', SITE + '/og-image.png')
    setMeta('name', 'twitter:image', SITE + '/og-image.png')
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = SITE + path
  }, [title, description, path, noindex])
  return null
}

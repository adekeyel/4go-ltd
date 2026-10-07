import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaults } from './defaults.js'

export const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const CACHE_KEY = '4go.content.v1'
const empty = { sections: {}, collections: {} }
const Ctx = createContext(empty)

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
function writeCache(v) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(v)) } catch { /* storage unavailable */ }
}

// Shows cached (or built-in) content immediately, then refreshes from the API.
export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(() => readCache() || empty)

  useEffect(() => {
    if (!API) return undefined
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    fetch(`${API}/site/content`, { signal: ctrl.signal, headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
      .then((body) => {
        const d = body && body.data
        if (d && typeof d === 'object' && d.sections && d.collections) {
          setRemote(d)
          writeCache(d)
        }
      })
      .catch(() => { /* keep what we have */ })
      .finally(() => clearTimeout(timer))
    return () => { ctrl.abort(); clearTimeout(timer) }
  }, [])

  return <Ctx.Provider value={remote}>{children}</Ctx.Provider>
}

// Single content block. Blank fields fall back to the built-in text.
export function useSection(key) {
  const { sections } = useContext(Ctx)
  return useMemo(() => {
    const base = defaults.sections[key] || {}
    const over = sections[key]
    if (!over || typeof over !== 'object') return base
    const out = { ...base }
    for (const k of Object.keys(over)) {
      const v = over[k]
      if (typeof v === 'string' ? v.trim() !== '' : v != null) out[k] = v
    }
    return out
  }, [sections, key])
}

// List of entries. If the collection exists in the database (even with nothing published) it wins.
export function useItems(name) {
  const { collections } = useContext(Ctx)
  const remote = collections[name]
  return Array.isArray(remote) ? remote : defaults.collections[name] || []
}

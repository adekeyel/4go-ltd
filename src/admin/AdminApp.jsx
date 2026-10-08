import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as api from './api.js'
import { AdminCtx } from './AdminContext.js'
import { defaults } from '../content/defaults.js'
import { pages } from './schema.js'
import Login from './Login.jsx'
import Overview from './Overview.jsx'
import PageEditor from './PageEditor.jsx'
import Messages from './Messages.jsx'
import Logo from '../components/Logo.jsx'

const stripIds = (list) => list.map(({ id, ...rest }) => rest) // eslint-disable-line no-unused-vars

export default function AdminApp() {
  const [signedIn, setSignedIn] = useState(() => !!api.getToken())
  const [admin, setAdmin] = useState(() => api.readAdminInfo())
  const [notice, setNotice] = useState('')
  const [view, setView] = useState('overview')
  const [sections, setSections] = useState({})
  const [items, setItems] = useState({})
  const [counts, setCounts] = useState({ unread: 0, total: 0 })
  const [loaded, setLoaded] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // Keep the dashboard out of search engines.
  useEffect(() => {
    document.title = '4GO Admin'
    let m = document.head.querySelector('meta[name="robots"]')
    const created = !m
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'robots'); document.head.appendChild(m) }
    const prev = m.getAttribute('content')
    m.setAttribute('content', 'noindex, nofollow')
    return () => { if (created) m.remove(); else if (prev) m.setAttribute('content', prev) }
  }, [])

  const signOut = useCallback((message = '') => {
    api.setSession(null)
    setSignedIn(false)
    setAdmin(null)
    setLoaded(false)
    setSections({})
    setItems({})
    setNotice(message)
  }, [])

  useEffect(() => { api.setUnauthorizedHandler(() => signOut('Your session expired. Please sign in again.')) }, [signOut])

  const notify = useCallback((message, kind = 'ok') => {
    setToast({ message, kind })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 4500)
  }, [])

  const refreshCounts = useCallback(async () => {
    try {
      const d = await api.listMessages(false, 1)
      setCounts({ unread: d.unread || 0, total: d.total || 0 })
    } catch { /* counts are cosmetic */ }
  }, [])

  const reload = useCallback(async () => {
    const [s, i, m] = await Promise.all([api.listSections(), api.listItems(), api.listMessages(false, 1)])
    const secMap = {}
    for (const row of s.sections) secMap[row.key] = row.value
    const byCol = {}
    for (const row of i.items) {
      if (!byCol[row.collection]) byCol[row.collection] = []
      byCol[row.collection].push({ id: String(row.id), data: row.data, published: row.published })
    }
    setSections(secMap)
    setItems(byCol)
    setCounts({ unread: m.unread || 0, total: m.total || 0 })
  }, [])

  // Load everything once signed in.
  useEffect(() => {
    if (!signedIn) return
    let cancelled = false
    reload()
      .then(() => { if (!cancelled) setLoaded(true) })
      .catch((e) => {
        if (cancelled) return
        if (e.status === 403) signOut(e.message)
        else if (e.status !== 401) { notify(e.message, 'error'); setLoaded(true) }
      })
    return () => { cancelled = true }
  }, [signedIn, reload, signOut, notify])

  // Watch for new contact-form messages while the dashboard is open: update the unread badge and show a notice.
  const lastTotal = useRef(null)
  useEffect(() => {
    if (!signedIn) return undefined
    const check = async () => {
      if (document.hidden) return
      try {
        const d = await api.listMessages(false, 1)
        const total = d.total || 0
        if (lastTotal.current !== null && total > lastTotal.current) notify('New message received from the contact form.')
        lastTotal.current = total
        setCounts({ unread: d.unread || 0, total })
      } catch { /* counts are cosmetic */ }
    }
    check()
    const t = setInterval(check, 30 * 1000)
    document.addEventListener('visibilitychange', check)
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', check); lastTotal.current = null }
  }, [signedIn, notify])

  // Renew the session while the dashboard is open (tokens last 30 minutes).
  useEffect(() => {
    if (!signedIn) return undefined
    const t = setInterval(async () => {
      try {
        const d = await api.refresh()
        api.setSession(d.accessToken, api.readAdminInfo())
      } catch { /* an expired session is handled by the 401 handler */ }
    }, 20 * 60 * 1000)
    return () => clearInterval(t)
  }, [signedIn])

  const attempt = useCallback(async (fn, okMessage) => {
    try {
      const out = await fn()
      await reload()
      if (okMessage) notify(okMessage)
      return out === undefined ? true : out
    } catch (e) {
      notify(e.message, 'error')
      return false
    }
  }, [reload, notify])

  const actions = useMemo(() => ({
    saveSection: (key, value) => attempt(() => api.saveSection(key, value), 'Saved. The site updates within about a minute.'),
    resetSection: (key) => attempt(() => api.resetSection(key), 'Back to the original text.'),
    createItem: (collection, data) => attempt(() => api.createItem(collection, data), 'Added.'),
    updateItem: (id, patch, msg) => attempt(() => api.updateItem(id, patch), msg),
    deleteItem: (id) => attempt(() => api.deleteItem(id), 'Deleted.'),
    moveItem: (collection, id, delta) => {
      const rows = items[collection] || []
      const idx = rows.findIndex((r) => r.id === id)
      const to = idx + delta
      if (idx < 0 || to < 0 || to >= rows.length) return Promise.resolve(false)
      const ids = rows.map((r) => r.id)
      ;[ids[idx], ids[to]] = [ids[to], ids[idx]]
      return attempt(() => api.reorderItems(collection, ids))
    },
    customizeList: (collection) => attempt(
      () => api.importContent({ collections: { [collection]: stripIds(defaults.collections[collection] || []) } }),
      'List copied. You can now edit it.'
    ),
    importDefaults: async () => {
      try {
        const collections = {}
        for (const k of Object.keys(defaults.collections)) collections[k] = stripIds(defaults.collections[k])
        const out = await api.importContent({ sections: defaults.sections, collections })
        await reload()
        return out
      } catch (e) {
        notify(e.message, 'error')
        return { sectionsWritten: 0, itemsWritten: 0 }
      }
    },
  }), [attempt, items, reload, notify])

  const ctx = { sections, items, counts, notify, refreshCounts, ...actions }

  if (!signedIn) {
    return <Login notice={notice} onSignedIn={(a) => { setAdmin(a); setNotice(''); setSignedIn(true) }} />
  }

  const nav = [{ id: 'overview', label: 'Overview' }, ...pages, { id: 'messages', label: 'Messages' }]
  const page = pages.find((p) => p.id === view)

  return (
    <AdminCtx.Provider value={ctx}>
      <div className="min-h-screen bg-mist">
        <header className="border-b border-line bg-paper">
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="hidden text-sm text-slate sm:inline">Website admin</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-slate sm:inline">{admin?.fullName || admin?.email}</span>
              <Link to="/" className="btn-quiet !px-3 !py-1.5 !text-xs" target="_blank" rel="noopener noreferrer">View site</Link>
              <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" onClick={() => signOut('')}>Sign out</button>
            </div>
          </div>
        </header>

        <div className="grid gap-0 lg:grid-cols-[15rem_1fr]">
          <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto border-b border-line bg-paper p-2 lg:block lg:min-h-[calc(100vh-4rem)] lg:space-y-1 lg:border-b-0 lg:border-r lg:p-4">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                aria-current={view === n.id ? 'page' : undefined}
                onClick={() => setView(n.id)}
                className={'flex w-full shrink-0 items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-left text-sm font-medium transition-colors lg:whitespace-normal ' +
                  (view === n.id ? 'bg-ink text-white' : 'text-ink hover:bg-mist')}
              >
                {n.label}
                {n.id === 'messages' && counts.unread > 0 && (
                  <span className="ml-2 rounded-full bg-signal px-2 py-0.5 text-xs text-white">{counts.unread}</span>
                )}
              </button>
            ))}
          </nav>

          <main className="px-5 py-8 sm:px-8 lg:py-10" id="admin-main">
            {!loaded ? (
              <p className="text-slate">Loading...</p>
            ) : view === 'overview' ? (
              <Overview goTo={setView} />
            ) : view === 'messages' ? (
              <Messages />
            ) : page ? (
              <PageEditor key={page.id} page={page} />
            ) : null}
          </main>
        </div>

        {toast && (
          <p
            role={toast.kind === 'error' ? 'alert' : 'status'}
            className={'fixed bottom-5 left-1/2 z-50 -translate-x-1/2 px-5 py-3 text-sm text-white shadow-lg ' + (toast.kind === 'error' ? 'bg-[#B3261E]' : 'bg-ink')}
          >
            {toast.message}
          </p>
        )}
      </div>
    </AdminCtx.Provider>
  )
}

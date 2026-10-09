import { useCallback, useEffect, useRef, useState } from 'react'
import * as api from './api.js'
import { useAdmin } from './AdminContext.js'

const when = (iso) => {
  try { return new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return iso }
}
const size = (n) => (n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB')

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-slate">{label}</dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  )
}

export default function Applications() {
  const { notify, refreshAppCounts, appCounts } = useAdmin()
  const [data, setData] = useState(null)
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const load = useCallback(async () => {
    try {
      setError('')
      setData(await api.listApplications(unreadOnly))
    } catch (e) {
      setError(e.message)
    }
  }, [unreadOnly])

  useEffect(() => { load() }, [load])

  // When a new application arrives (the dashboard checks every 30 seconds), refresh the list without a page reload.
  const seenTotal = useRef(appCounts.total)
  useEffect(() => {
    if (appCounts.total !== seenTotal.current) { seenTotal.current = appCounts.total; load() }
  }, [appCounts.total, load])

  async function toggle(a) {
    try {
      await api.markApplication(a.id, !a.is_read)
      await Promise.all([load(), refreshAppCounts()])
    } catch (e) { notify(e.message, 'error') }
  }

  async function download(a) {
    setBusyId(a.id)
    try {
      await api.downloadCv(a.id, a.cv_filename)
      if (!a.is_read) { await api.markApplication(a.id, true); await Promise.all([load(), refreshAppCounts()]) }
    } catch (e) { notify(e.message, 'error') } finally { setBusyId(null) }
  }

  async function remove(a) {
    if (!window.confirm('Delete the application from ' + a.full_name + ' and their CV? This cannot be undone.')) return
    try {
      await api.deleteApplication(a.id)
      notify('Application deleted.')
      await Promise.all([load(), refreshAppCounts()])
    } catch (e) { notify(e.message, 'error') }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="mt-1 text-sm text-slate">Sent from the Careers page.{data ? ' ' + data.unread + ' unread of ' + data.total + '.' : ''}</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} />
          Unread only
        </label>
      </div>

      {error && <p role="alert" className="mt-6 border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">{error}</p>}
      {!data && !error && <p className="mt-6 text-slate">Loading...</p>}
      {data && data.applications.length === 0 && <p className="mt-6 text-slate">{unreadOnly ? 'No unread applications.' : 'No applications yet.'}</p>}

      <ul className="mt-6 space-y-4">
        {data && data.applications.map((a) => (
          <li key={a.id} className={'border bg-paper p-5 ' + (a.is_read ? 'border-line' : 'border-ink')}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {a.full_name}
                  {!a.is_read && <span className="ml-2 bg-signal px-2 py-0.5 text-xs font-semibold text-white">New</span>}
                </p>
                <p className="mt-1 text-sm">Applied for: <span className="font-semibold">{a.position_title}</span></p>
                <p className="mt-1 text-sm text-slate">
                  <a className="underline" href={'mailto:' + a.email}>{a.email}</a> / <a className="underline" href={'tel:' + a.phone.replace(/[^\d+]/g, '')}>{a.phone}</a>
                </p>
                <p className="mt-1 text-sm text-slate">{when(a.created_at)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-primary !px-3 !py-1.5 !text-xs disabled:opacity-60" disabled={busyId === a.id} onClick={() => download(a)}>
                  {busyId === a.id ? 'Downloading...' : 'Download CV'}
                </button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" onClick={() => toggle(a)}>{a.is_read ? 'Mark unread' : 'Mark read'}</button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs !text-[#B3261E]" onClick={() => remove(a)}>Delete</button>
              </div>
            </div>

            <dl className="mt-5 grid gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">
              <Detail label="Age">{a.age}</Detail>
              <Detail label="Highest qualification">{a.qualification}</Detail>
              <Detail label="Course of study">{a.course_of_study}</Detail>
              <Detail label="Years of experience">{a.years_experience}</Detail>
              <Detail label="Address">{a.address}, {a.state}, {a.country}</Detail>
              <Detail label="CV">{a.cv_filename} ({size(a.cv_size)})</Detail>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}

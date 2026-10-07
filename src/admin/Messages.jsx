import { useCallback, useEffect, useState } from 'react'
import * as api from './api.js'
import { useAdmin } from './AdminContext.js'

const when = (iso) => {
  try { return new Date(iso).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }) } catch { return iso }
}

export default function Messages() {
  const { notify, refreshCounts } = useAdmin()
  const [data, setData] = useState(null)
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setError('')
      setData(await api.listMessages(unreadOnly))
    } catch (e) {
      setError(e.message)
    }
  }, [unreadOnly])

  useEffect(() => { load() }, [load])

  async function toggle(m) {
    try {
      await api.markMessage(m.id, !m.is_read)
      await Promise.all([load(), refreshCounts()])
    } catch (e) { notify(e.message, 'error') }
  }

  async function remove(m) {
    if (!window.confirm('Delete the message from ' + m.name + '? This cannot be undone.')) return
    try {
      await api.deleteMessage(m.id)
      notify('Message deleted.')
      await Promise.all([load(), refreshCounts()])
    } catch (e) { notify(e.message, 'error') }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="mt-1 text-sm text-slate">Sent from the contact form.{data ? ' ' + data.unread + ' unread of ' + data.total + '.' : ''}</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} />
          Unread only
        </label>
      </div>

      {error && <p role="alert" className="mt-6 border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">{error}</p>}
      {!data && !error && <p className="mt-6 text-slate">Loading...</p>}
      {data && data.messages.length === 0 && <p className="mt-6 text-slate">No messages yet.</p>}

      <ul className="mt-6 space-y-4">
        {data && data.messages.map((m) => (
          <li key={m.id} className={'border bg-paper p-5 ' + (m.is_read ? 'border-line' : 'border-ink')}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {m.name}{m.company ? ', ' + m.company : ''}
                  {!m.is_read && <span className="ml-2 bg-signal px-2 py-0.5 text-xs font-semibold text-white">New</span>}
                </p>
                <p className="mt-1 text-sm text-slate">
                  <a className="underline" href={'mailto:' + m.email}>{m.email}</a>
                  {m.phone ? ' / ' + m.phone : ''}
                </p>
                <p className="mt-1 text-sm text-slate">{m.topic} / {when(m.created_at)}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" onClick={() => toggle(m)}>{m.is_read ? 'Mark unread' : 'Mark read'}</button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs !text-[#B3261E]" onClick={() => remove(m)}>Delete</button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line leading-relaxed">{m.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

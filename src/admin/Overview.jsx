import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from './AdminContext.js'

export default function Overview({ goTo }) {
  const { counts, sections, items, importDefaults } = useAdmin()
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)

  const editedBlocks = Object.keys(sections).length
  const customLists = Object.keys(items).filter((k) => (items[k] || []).length > 0).length

  async function load() {
    setBusy(true)
    setResult(await importDefaults())
    setBusy(false)
  }

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Website admin</h1>
        <p className="mt-2 text-slate">
          Edit the text, lists and legal pages of the 4GO website. Changes appear on the site within about a minute.
        </p>
      </div>

      <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
        <div className="bg-paper p-5"><dt className="text-sm text-slate">Edited text blocks</dt><dd className="mt-1 text-3xl font-bold font-display">{editedBlocks}</dd></div>
        <div className="bg-paper p-5"><dt className="text-sm text-slate">Customised lists</dt><dd className="mt-1 text-3xl font-bold font-display">{customLists}</dd></div>
        <div className="bg-paper p-5">
          <dt className="text-sm text-slate">Unread messages</dt>
          <dd className="mt-1 text-3xl font-bold font-display">{counts.unread}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={() => goTo('home')}>Edit the home page</button>
        <button type="button" className="btn-quiet" onClick={() => goTo('messages')}>Open messages</button>
        <Link to="/" className="btn-quiet" target="_blank" rel="noopener noreferrer">View the site</Link>
      </div>

      <section className="border border-line p-6" aria-labelledby="defaults-heading">
        <h2 id="defaults-heading" className="text-xl font-bold">Load the original content</h2>
        <p className="mt-2 text-sm text-slate">
          Copies all the original text and lists into the database so everything can be edited. Anything you have already
          edited is kept. Safe to run more than once.
        </p>
        <button type="button" className="btn-quiet mt-4 disabled:opacity-60" disabled={busy} onClick={load}>{busy ? 'Loading...' : 'Load original content'}</button>
        {result && (
          <p role="status" className="mt-4 text-sm">
            Added {result.sectionsWritten} text blocks and {result.itemsWritten} list entries.
          </p>
        )}
      </section>
    </div>
  )
}

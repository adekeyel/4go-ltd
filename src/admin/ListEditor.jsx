import { useState } from 'react'
import { defaults } from '../content/defaults.js'
import { useAdmin } from './AdminContext.js'
import { collectionsSchema } from './schema.js'
import Field from './Field.jsx'

function ItemForm({ idPrefix, fields, initial, submitLabel, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    const v = {}
    for (const f of fields) v[f.name] = initial?.[f.name] ?? ''
    return v
  })
  const [error, setError] = useState('')
  const set = (name, value) => setForm((x) => ({ ...x, [name]: value }))

  function submit(e) {
    e.preventDefault()
    const first = fields[0]
    if (!String(form[first.name] || '').trim()) {
      setError(first.label + ' is required.')
      return
    }
    setError('')
    const data = {}
    for (const f of fields) data[f.name] = String(form[f.name] || '').trim()
    onSubmit(data)
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-4 border-t border-line pt-4">
      {fields.map((f, i) => (
        <Field key={f.name} id={idPrefix + '-' + f.name} field={f} value={form[f.name]} onChange={set} error={i === 0 ? error : ''} />
      ))}
      <div className="flex gap-3">
        <button type="submit" className="btn-primary !px-4 !py-2 !text-sm disabled:opacity-60" disabled={busy}>{busy ? 'Saving...' : submitLabel}</button>
        <button type="button" className="btn-quiet !px-4 !py-2 !text-sm" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default function ListEditor({ collectionKey }) {
  const { items, customizeList, createItem, updateItem, deleteItem, moveItem } = useAdmin()
  const schema = collectionsSchema[collectionKey]
  const rows = items[collectionKey] || []
  const [editing, setEditing] = useState(null) // item id, or 'new'
  const [busy, setBusy] = useState(false)

  async function run(fn) {
    setBusy(true)
    try { await fn() } finally { setBusy(false) }
  }

  if (rows.length === 0) {
    const builtIn = defaults.collections[collectionKey] || []
    return (
      <div className="space-y-4">
        {schema.note && <p className="text-sm text-slate">{schema.note}</p>}
        <p className="text-sm text-slate">
          This list is showing the {builtIn.length} original entries from the website. To change them, copy them here first.
        </p>
        <button type="button" className="btn-primary disabled:opacity-60" disabled={busy} onClick={() => run(() => customizeList(collectionKey))}>
          {busy ? 'Copying...' : 'Edit this list'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {schema.note && <p className="text-sm text-slate">{schema.note}</p>}

      <ul className="divide-y divide-line border border-line">
        {rows.map((row, i) => (
          <li key={row.id} className="bg-paper p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={'font-semibold ' + (row.published ? '' : 'text-slate line-through')}>
                {schema.title(row.data) || '(untitled)'}
                {!row.published && <span className="ml-2 text-xs font-normal no-underline">Hidden</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" aria-label="Move up" disabled={busy || i === 0} onClick={() => run(() => moveItem(collectionKey, row.id, -1))}>Up</button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" aria-label="Move down" disabled={busy || i === rows.length - 1} onClick={() => run(() => moveItem(collectionKey, row.id, 1))}>Down</button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" onClick={() => setEditing(editing === row.id ? null : row.id)}>{editing === row.id ? 'Close' : 'Edit'}</button>
                <button type="button" className="btn-quiet !px-3 !py-1.5 !text-xs" disabled={busy} onClick={() => run(() => updateItem(row.id, { published: !row.published }, row.published ? 'Hidden from the site.' : 'Visible on the site.'))}>{row.published ? 'Hide' : 'Show'}</button>
                <button
                  type="button"
                  className="btn-quiet !px-3 !py-1.5 !text-xs !text-[#B3261E]"
                  disabled={busy}
                  onClick={() => {
                    if (window.confirm('Delete "' + (schema.title(row.data) || 'this entry') + '"? This cannot be undone.')) run(() => deleteItem(row.id))
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            {editing === row.id && (
              <ItemForm
                idPrefix={'item-' + row.id}
                fields={schema.fields}
                initial={row.data}
                submitLabel="Save changes"
                busy={busy}
                onCancel={() => setEditing(null)}
                onSubmit={(data) => run(async () => { if (await updateItem(row.id, { data }, 'Saved.')) setEditing(null) })}
              />
            )}
          </li>
        ))}
      </ul>

      {editing === 'new' ? (
        <div className="border border-line bg-paper p-4">
          <p className="font-semibold">New {schema.noun}</p>
          <ItemForm
            idPrefix={'new-' + collectionKey}
            fields={schema.fields}
            initial={{}}
            submitLabel={'Add ' + schema.noun}
            busy={busy}
            onCancel={() => setEditing(null)}
            onSubmit={(data) => run(async () => { if (await createItem(collectionKey, data)) setEditing(null) })}
          />
        </div>
      ) : (
        <button type="button" className="btn-primary" onClick={() => setEditing('new')}>Add {schema.noun}</button>
      )}
    </div>
  )
}

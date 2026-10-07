import { useEffect, useMemo, useState } from 'react'
import { defaults } from '../content/defaults.js'
import { useAdmin } from './AdminContext.js'
import { sectionsSchema } from './schema.js'
import Field from './Field.jsx'

export default function SectionEditor({ sectionKey }) {
  const { sections, saveSection, resetSection } = useAdmin()
  const schema = sectionsSchema[sectionKey]
  const stored = sections[sectionKey]
  const initial = useMemo(() => ({ ...(defaults.sections[sectionKey] || {}), ...(stored || {}) }), [stored, sectionKey])
  const [form, setForm] = useState(initial)
  const [busy, setBusy] = useState(false)

  useEffect(() => setForm(initial), [initial])

  const dirty = schema.fields.some((f) => (form[f.name] || '') !== (initial[f.name] || ''))
  const set = (name, value) => setForm((v) => ({ ...v, [name]: value }))

  async function onSave(e) {
    e.preventDefault()
    setBusy(true)
    const value = {}
    for (const f of schema.fields) value[f.name] = (form[f.name] || '').trim()
    await saveSection(sectionKey, value)
    setBusy(false)
  }

  async function onReset() {
    if (!window.confirm('Go back to the original text for this block? Your edits will be lost.')) return
    setBusy(true)
    await resetSection(sectionKey)
    setBusy(false)
  }

  return (
    <form onSubmit={onSave} className="space-y-5">
      {schema.note && <p className="text-sm text-slate">{schema.note}</p>}
      {schema.fields.map((f) => (
        <Field key={f.name} id={sectionKey + '-' + f.name} field={f} value={form[f.name]} onChange={set} />
      ))}
      <p className="text-xs text-slate">Leave a field blank to show the original text for it.</p>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary disabled:opacity-60" disabled={busy || !dirty}>{busy ? 'Saving...' : 'Save changes'}</button>
        {stored && <button type="button" className="btn-quiet" onClick={onReset} disabled={busy}>Reset to original</button>}
        <span className="text-xs text-slate">{stored ? 'Edited' : 'Showing original text'}</span>
      </div>
    </form>
  )
}

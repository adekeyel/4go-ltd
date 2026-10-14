import { useRef, useState } from 'react'
import { uploadImage } from './api.js'

export const isSafeImage = (u) => typeof u === 'string' && /^(https?:\/\/|\/)/i.test(u.trim())

function ImageField({ id, field, value, onChange, error }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState('')

  async function pick(e) {
    const file = e.target.files && e.target.files[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setProblem('')
    try { onChange(field.name, await uploadImage(file)) } catch (err) { setProblem(err.message) } finally { setBusy(false) }
  }

  const msg = problem || error
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{field.label}</label>
      {isSafeImage(value) && (
        <img src={value} alt="Preview of the uploaded image" className="mt-2 max-h-48 w-auto border border-line bg-mist object-contain" />
      )}
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <input ref={input} id={id} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={pick} />
        <button type="button" className="btn-quiet !px-4 !py-2 !text-sm disabled:opacity-60" disabled={busy} onClick={() => input.current?.click()}>
          {busy ? 'Uploading...' : value ? 'Replace image' : 'Upload image'}
        </button>
        {value && !busy && <button type="button" className="btn-quiet !px-4 !py-2 !text-sm" onClick={() => onChange(field.name, '')}>Remove</button>}
      </div>
      {field.hint && <p id={id + '-hint'} className="mt-1.5 text-xs text-slate">{field.hint}</p>}
      {msg && <p role="alert" className="mt-1.5 text-sm text-[#B3261E]">{msg}</p>}
    </div>
  )
}

export default function Field({ id, field, value, onChange, error }) {
  if (field.type === 'image') return <ImageField id={id} field={field} value={value} onChange={onChange} error={error} />
  const common = {
    id,
    name: field.name,
    value: value ?? '',
    onChange: (e) => onChange(field.name, e.target.value),
    className: 'field',
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': (field.hint ? id + '-hint ' : '') + (error ? id + '-error' : '') || undefined,
  }
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea rows={field.rows || 4} {...common} />
      ) : field.type === 'select' ? (
        <select {...common}>
          <option value="">{field.blank ?? 'Default icon'}</option>
          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'} {...common} />
      )}
      {field.hint && <p id={id + '-hint'} className="mt-1.5 text-xs text-slate">{field.hint}</p>}
      {error && <p id={id + '-error'} className="mt-1.5 text-sm text-[#B3261E]">{error}</p>}
    </div>
  )
}

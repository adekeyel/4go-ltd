import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../content/ContentContext.jsx'
import { COUNTRIES, NIGERIA, NIGERIAN_STATES } from '../data/places.js'
import {
  CV_MAX_BYTES, FIELD_ORDER, QUALIFICATIONS, buildApplicationForm, emptyApplication, validateApplication,
} from '../data/applicationRules.js'

const fid = (k) => `apply-${k}`

function Field({ name, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={fid(name)} className="text-sm font-semibold">{label}</label>
      {children}
      {hint && !error && <p id={`${fid(name)}-hint`} className="mt-2 text-xs text-slate">{hint}</p>}
      {error && <p id={`${fid(name)}-error`} className="mt-2 text-sm text-[#B3261E]">{error}</p>}
    </div>
  )
}

export default function ApplyForm({ positions, positionId, onPositionChange }) {
  const [values, setValues] = useState(emptyApplication)
  const [file, setFile] = useState(null)
  const [fileKey, setFileKey] = useState(0) // changing this resets the native file input
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')
  const successRef = useRef(null)

  const selected = positions.some((p) => p.id === positionId) ? positionId : ''
  const v = { ...values, position_id: selected }
  const isNigeria = values.country === NIGERIA

  const clear = (k) => errors[k] && setErrors((x) => ({ ...x, [k]: undefined }))
  const set = (k) => (e) => {
    const value = e.target.value
    setValues((x) => (k === 'country' ? { ...x, country: value, state: '' } : { ...x, [k]: value }))
    clear(k)
    if (k === 'country') clear('state')
  }
  const a11y = (k) => ({
    id: fid(k),
    name: k,
    value: v[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : 'false',
    'aria-describedby': errors[k] ? `${fid(k)}-error` : undefined,
    className: 'field',
  })

  function focusFirst(found) {
    const first = FIELD_ORDER.find((k) => found[k])
    if (first) document.getElementById(fid(first))?.focus()
  }

  async function onSubmit(e) {
    e.preventDefault()
    const found = validateApplication(v, file)
    setErrors(found)
    setMessage('')
    if (Object.keys(found).length) { focusFirst(found); return }
    if (values.website) { setStatus('success'); return } // honeypot filled: act as if sent

    setStatus('sending')
    try {
      if (!API) {
        if (import.meta.env.DEV) await new Promise((r) => setTimeout(r, 600))
        else throw new Error('VITE_API_URL is not set')
      } else {
        // No Content-Type header: the browser sets the multipart boundary itself.
        const res = await fetch(`${API}/site/applications`, { method: 'POST', headers: { Accept: 'application/json' }, body: buildApplicationForm(v, file) })
        let json = null
        try { json = await res.json() } catch { /* no body */ }
        if (!res.ok) {
          if (res.status === 400 && json && json.details && typeof json.details === 'object') {
            setErrors(json.details)
            setStatus('idle')
            focusFirst(json.details)
            return
          }
          setMessage(res.status === 429 && json && json.message ? json.message : '')
          throw new Error(`Request failed: ${res.status}`)
        }
      }
      setStatus('success')
      setValues(emptyApplication)
      setFile(null)
      setFileKey((k) => k + 1)
      setTimeout(() => successRef.current?.focus(), 0)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-ink bg-paper p-8 sm:p-10">
        <h3 className="text-3xl font-bold">Application sent.</h3>
        <p className="mt-4 max-w-md leading-relaxed text-slate">
          Thank you for applying to 4GO Technology LTD. We have received your application and will contact you at the email address you gave if we would like to take it further.
        </p>
        <button type="button" className="btn-quiet mt-8" onClick={() => setStatus('idle')}>Submit another application</button>
      </div>
    )
  }

  const count = Object.values(errors).filter(Boolean).length

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 bg-paper p-6 sm:p-10">
      {count > 0 && (
        <p role="alert" className="border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">
          Fix {count} {count === 1 ? 'field' : 'fields'} below, then send again.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">
          {message || 'Your application was not sent. Check your connection and try again.'}
        </p>
      )}

      <Field name="position_id" label="Position" error={errors.position_id}>
        <select {...a11y('position_id')} onChange={(e) => { onPositionChange(e.target.value); clear('position_id') }}>
          <option value="">General application (no specific role)</option>
          {positions.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="full_name" label="Full name" error={errors.full_name}>
          <input type="text" autoComplete="name" maxLength={120} {...a11y('full_name')} />
        </Field>
        <Field name="age" label="Age" error={errors.age}>
          <input type="text" inputMode="numeric" autoComplete="off" maxLength={3} {...a11y('age')} />
        </Field>
        <Field name="email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" maxLength={254} {...a11y('email')} />
        </Field>
        <Field name="phone" label="Phone number" error={errors.phone}>
          <input type="tel" autoComplete="tel" maxLength={40} {...a11y('phone')} />
        </Field>
      </div>

      <Field name="address" label="Address" error={errors.address}>
        <input type="text" autoComplete="street-address" maxLength={300} {...a11y('address')} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="country" label="Country" error={errors.country}>
          <select autoComplete="country-name" {...a11y('country')}>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field name="state" label="State" error={errors.state}>
          {isNigeria ? (
            <select autoComplete="address-level1" {...a11y('state')}>
              <option value="">Choose your state</option>
              {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          ) : (
            <input type="text" autoComplete="address-level1" maxLength={100} {...a11y('state')} />
          )}
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="qualification" label="Highest educational qualification" error={errors.qualification}>
          <select {...a11y('qualification')}>
            <option value="">Choose one</option>
            {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </Field>
        <Field name="course_of_study" label="Course of study" error={errors.course_of_study}>
          <input type="text" maxLength={160} {...a11y('course_of_study')} />
        </Field>
        <Field name="years_experience" label="Years of experience" error={errors.years_experience} hint="Enter 0 if you have none yet.">
          <input type="text" inputMode="numeric" autoComplete="off" maxLength={3} {...a11y('years_experience')} />
        </Field>
      </div>

      <Field name="cv" label="CV" error={errors.cv} hint={`PDF, DOC or DOCX, up to ${CV_MAX_BYTES / 1024 / 1024} MB.`}>
        <input
          key={fileKey}
          id={fid('cv')}
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => { setFile(e.target.files?.[0] || null); clear('cv') }}
          aria-invalid={errors.cv ? 'true' : 'false'}
          aria-describedby={errors.cv ? `${fid('cv')}-error` : `${fid('cv')}-hint`}
          className="field file:mr-4 file:rounded-md file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink"
        />
      </Field>

      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="apply-website">Leave this field empty</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <p className="text-xs leading-relaxed text-slate">
        By applying you agree that 4GO Technology LTD may use these details, including your CV, to consider your application.
        See our <Link to="/privacy" className="underline">Privacy Policy</Link>.
      </p>

      <button type="submit" className="btn-primary w-full sm:w-auto disabled:opacity-60" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Submit application'}
      </button>
    </form>
  )
}

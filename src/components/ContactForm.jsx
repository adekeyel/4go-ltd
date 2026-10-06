import { useRef, useState } from 'react'

const topics = [
  'Building a new product',
  'Improving an existing platform',
  'Technology consulting',
  'Partnership',
  'Something else',
]

const empty = { name: '', company: '', email: '', phone: '', topic: '', message: '', website: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@company.com.'
  if (v.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number, or leave this blank.'
  if (!v.topic) e.topic = 'Choose what you need help with.'
  if (v.message.trim().length < 10) e.message = 'Write at least a sentence so we can understand your request.'
  return e
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-slate"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#B3261E]">{error}</p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const successRef = useRef(null)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }
  const a11y = (k) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? 'true' : 'false',
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
    className: 'field',
  })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(first)?.focus()
      return
    }
    if (values.website) { // honeypot filled: act as if sent
      setStatus('success')
      return
    }

    setStatus('sending')
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
    try {
      if (!endpoint) {
        if (import.meta.env.DEV) {
          console.info('Contact form (no endpoint set, simulated):', values)
          await new Promise((r) => setTimeout(r, 600))
        } else {
          throw new Error('No contact endpoint configured')
        }
      } else {
        const { website, ...payload } = values
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      }
      setStatus('success')
      setValues(empty)
      setTimeout(() => successRef.current?.focus(), 0)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-ink p-8 sm:p-10">
        <h2 className="text-3xl font-bold">Message sent.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-slate">
          Thank you for contacting 4GO Technology LTD. We have received your message and will reply to the email address
          you provided.
        </p>
        <button type="button" className="btn-quiet mt-8" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    )
  }

  const count = Object.values(errors).filter(Boolean).length

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {count > 0 && (
        <p role="alert" className="border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">
          Fix {count} {count === 1 ? 'field' : 'fields'} below, then send again.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">
          Your message was not sent. Check your connection and try again, or email us directly.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input type="text" autoComplete="name" {...a11y('name')} />
        </Field>
        <Field id="company" label="Company" optional>
          <input type="text" autoComplete="organization" {...a11y('company')} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" {...a11y('email')} />
        </Field>
        <Field id="phone" label="Phone" optional error={errors.phone}>
          <input type="tel" autoComplete="tel" {...a11y('phone')} />
        </Field>
      </div>

      <Field id="topic" label="What can we help you with?" error={errors.topic}>
        <select {...a11y('topic')}>
          <option value="">Choose one</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea rows={6} {...a11y('message')} />
      </Field>

      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto disabled:opacity-60" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}

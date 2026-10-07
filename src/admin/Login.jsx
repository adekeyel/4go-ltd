import { useState } from 'react'
import * as api from './api.js'
import Logo from '../components/Logo.jsx'

export default function Login({ onSignedIn, notice }) {
  const [step, setStep] = useState('credentials') // credentials | otp
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submitCredentials(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api.login(email.trim(), password)
      setStep('otp')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function submitCode(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const data = await api.verifyOtp(email.trim(), code.trim())
      if (!data.admin || data.admin.role !== 'admin') {
        setError('Only full admin accounts can edit the website.')
        setStep('credentials')
        setPassword('')
        setCode('')
        return
      }
      api.setSession(data.accessToken, data.admin)
      onSignedIn(data.admin)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-5 py-12">
      <div className="w-full max-w-md border border-line bg-paper p-8 sm:p-10">
        <Logo />
        <h1 className="mt-8 text-3xl font-bold">Website admin</h1>
        <p className="mt-2 text-sm text-slate">
          {step === 'credentials' ? 'Sign in with your admin account.' : 'Enter the code we emailed to ' + email.trim() + '.'}
        </p>

        {notice && !error && <p role="status" className="mt-6 border-l-4 border-signal bg-mist px-4 py-3 text-sm">{notice}</p>}
        {error && <p role="alert" className="mt-6 border-l-4 border-[#B3261E] bg-mist px-4 py-3 text-sm">{error}</p>}

        {step === 'credentials' ? (
          <form onSubmit={submitCredentials} className="mt-6 space-y-5">
            <div>
              <label htmlFor="admin-email" className="text-sm font-semibold">Email</label>
              <input id="admin-email" type="email" autoComplete="username" required className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-sm font-semibold">Password</label>
              <input id="admin-password" type="password" autoComplete="current-password" required className="field" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={busy}>{busy ? 'Checking...' : 'Continue'}</button>
          </form>
        ) : (
          <form onSubmit={submitCode} className="mt-6 space-y-5">
            <div>
              <label htmlFor="admin-code" className="text-sm font-semibold">Login code</label>
              <input id="admin-code" inputMode="numeric" autoComplete="one-time-code" required className="field" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={busy}>{busy ? 'Verifying...' : 'Sign in'}</button>
            <button type="button" className="btn-quiet w-full" onClick={() => { setStep('credentials'); setCode(''); setError('') }}>Back</button>
          </form>
        )}
      </div>
    </main>
  )
}

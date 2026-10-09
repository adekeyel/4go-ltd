// Rules for the careers application form. These mirror the backend (src/modules/siteCms/validate.js), which is the
// real gatekeeper; checking here just gives instant feedback. Field names match the backend exactly.

// Keep this list identical to QUALIFICATIONS in the backend.
export const QUALIFICATIONS = [
  'SSCE / WAEC / NECO', 'OND / NCE', 'HND', "Bachelor's degree", 'PGD',
  "Master's degree", 'PhD / Doctorate', 'Professional certification', 'Other',
]

export const CV_MAX_BYTES = 5 * 1024 * 1024
export const CV_EXTENSIONS = ['pdf', 'doc', 'docx']

// Order the fields appear in the form (used to focus the first problem).
export const FIELD_ORDER = [
  'position_id', 'full_name', 'age', 'email', 'phone', 'address', 'country', 'state',
  'qualification', 'course_of_study', 'years_experience', 'cv',
]

export const emptyApplication = {
  position_id: '', full_name: '', age: '', email: '', phone: '', address: '',
  country: 'Nigeria', state: '', qualification: '', course_of_study: '', years_experience: '', website: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/
const WHOLE_RE = /^\d{1,3}$/
const t = (v) => (typeof v === 'string' ? v.trim() : '')

export function validateApplication(v, file) {
  const e = {}
  const name = t(v.full_name)
  if (name.length < 2 || name.length > 120 || !/\s/.test(name)) e.full_name = 'Enter your full name (first and last name).'
  const age = t(v.age)
  if (!WHOLE_RE.test(age) || +age < 16 || +age > 80) e.age = 'Enter your age as a number between 16 and 80.'
  const email = t(v.email)
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) e.email = 'Enter a valid email address, like name@example.com.'
  const phone = t(v.phone)
  if (!phone || phone.length > 40 || !PHONE_RE.test(phone)) e.phone = 'Enter a valid phone number, like +234 801 234 5678.'
  const address = t(v.address)
  if (address.length < 5 || address.length > 300) e.address = 'Enter your address.'
  if (!t(v.country) || t(v.country).length > 100) e.country = 'Choose your country.'
  if (!t(v.state) || t(v.state).length > 100) e.state = 'Enter your state.'
  if (!QUALIFICATIONS.includes(t(v.qualification))) e.qualification = 'Choose your highest educational qualification.'
  const course = t(v.course_of_study)
  if (!course || course.length > 160) e.course_of_study = 'Enter your course of study.'
  const years = t(v.years_experience)
  if (!WHOLE_RE.test(years) || +years > 60) e.years_experience = 'Enter your years of experience as a whole number (0 if none).'

  if (!file) e.cv = 'Attach your CV.'
  else {
    const ext = String(file.name || '').split('.').pop().toLowerCase()
    if (!CV_EXTENSIONS.includes(ext)) e.cv = 'Your CV must be a PDF, DOC or DOCX file.'
    else if (!file.size) e.cv = 'That file is empty. Choose your CV again.'
    else if (file.size > CV_MAX_BYTES) e.cv = 'Your CV must be 5 MB or smaller.'
  }
  return e
}

// The multipart body sent to POST /api/site/applications. Field names match the backend; the file field is "cv".
export function buildApplicationForm(v, file) {
  const fd = new FormData()
  for (const k of ['position_id', 'full_name', 'age', 'email', 'phone', 'address', 'state', 'country', 'qualification', 'course_of_study', 'years_experience']) {
    fd.append(k, t(v[k]))
  }
  fd.append('cv', file, file.name)
  return fd
}

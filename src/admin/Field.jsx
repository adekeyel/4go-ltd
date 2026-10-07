export default function Field({ id, field, value, onChange, error }) {
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
          <option value="">Default icon</option>
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

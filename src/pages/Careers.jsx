import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import ApplyForm from '../components/ApplyForm.jsx'
import { useItems, useSection } from '../content/ContentContext.jsx'

// One entry per line in the admin text boxes; a leading "-" or bullet is ignored.
const lines = (text) =>
  String(text || '')
    .split('\n')
    .map((l) => l.trim().replace(/^[-*\u2022]\s*/, ''))
    .filter(Boolean)

function Bullets({ title, text }) {
  const rows = lines(text)
  if (!rows.length) return null
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-slate">
        {rows.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  )
}

function Position({ p, onApply }) {
  const tags = [p.department, p.location, p.type].filter(Boolean)
  const hasDetails = lines(p.responsibilities).length > 0 || lines(p.requirements).length > 0
  return (
    <li id={`role-${p.id}`} className="py-10">
      <h3 className="text-2xl font-bold sm:text-3xl">{p.title}</h3>
      {(tags.length > 0 || p.closes) && (
        <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Role summary">
          {tags.map((t, i) => (
            <li key={t + i} className="border border-line px-3 py-1 text-xs font-medium">{t}</li>
          ))}
          {p.closes && <li className="px-1 text-xs text-slate">Apply by {p.closes}</li>}
        </ul>
      )}
      {p.summary && <p className="mt-5 max-w-2xl whitespace-pre-line leading-relaxed text-slate">{p.summary}</p>}
      {hasDetails && (
        <details className="mt-6 max-w-2xl">
          <summary className="cursor-pointer select-none text-sm font-semibold text-signal">Role details</summary>
          <div className="mt-5 space-y-6">
            <Bullets title="What you will do" text={p.responsibilities} />
            <Bullets title="What we are looking for" text={p.requirements} />
          </div>
        </details>
      )}
      <button type="button" className="btn-primary mt-8" onClick={() => onApply(p.id)} aria-label={`Apply for ${p.title}`}>Apply for this role</button>
    </li>
  )
}

export default function Careers() {
  const { pathname } = useLocation()
  const seo = useSection('seo_careers')
  const hero = useSection('careers_hero')
  const empty = useSection('careers_empty')
  const positions = useItems('positions')
  const [params] = useSearchParams()
  const wanted = params.get('position')
  const [selected, setSelected] = useState('')

  // A shared link like /careers?position=12 preselects that role in the form.
  useEffect(() => {
    if (wanted && positions.some((p) => p.id === wanted)) setSelected(wanted)
  }, [wanted, positions])

  function applyFor(id) {
    setSelected(id)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('apply')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    setTimeout(() => document.getElementById('apply-full_name')?.focus({ preventScroll: true }), reduce ? 0 : 450)
  }

  return (
    <>
      <Seo path={pathname} title={seo.title} description={seo.description} />
      <PageHero title={hero.title} intro={hero.intro} />
      <section className="py-20 sm:py-24" aria-labelledby="roles-heading">
        <div className="wrap">
          <h2 id="roles-heading" className="text-4xl font-bold sm:text-5xl">Open positions</h2>
          {positions.length === 0 ? (
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate">{empty.text}</p>
          ) : (
            <ul className="mt-12 divide-y divide-line border-y border-ink">
              {positions.map((p) => <Position key={p.id} p={p} onApply={applyFor} />)}
            </ul>
          )}
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 border-t border-line bg-mist py-20 sm:py-24" aria-labelledby="apply-heading">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="apply-heading" className="text-4xl font-bold sm:text-5xl">Apply</h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate">
              {positions.length > 0
                ? 'Choose a role and tell us about yourself. You can also send a general application.'
                : 'There are no open roles right now, but you can still send a general application.'}
            </p>
          </div>
          <ApplyForm positions={positions} positionId={selected} onPositionChange={setSelected} />
        </div>
      </section>
    </>
  )
}

import { useItems } from '../content/ContentContext.jsx'

const safeUrl = (u) => (typeof u === 'string' && /^https?:\/\//i.test(u.trim()) ? u.trim() : null)
const safeImage = (u) => typeof u === 'string' && /^(https?:\/\/|\/)/i.test(u.trim())

const LABELS = { 'About our company': 'About 4GO', 'Our product': 'From 4GO', 'Partner or sponsor': 'Sponsored' }

// Shows one promotion chosen in the admin. `page` is the page name used in the admin ("Home", "About", ...);
// `index` picks the 1st, 2nd... matching promotion, so two slots on one page never repeat the same banner.
const debugOn = () => typeof window !== 'undefined' && /[?&]adsdebug=1\b/.test(window.location.search)

export default function AdSlot({ page, index = 0 }) {
  const all = useItems('promotions')
  const matches = all.filter((p) => safeImage(p.image) && p.title && (!p.page || p.page === 'All pages' || p.page === page))
  const p = matches[index]

  // Visit any page with ?adsdebug=1 on the end of the address to see why a banner is or is not showing.
  if (debugOn()) {
    const why = (x) => (!x.title ? 'no headline' : !safeImage(x.image) ? 'no valid image address (' + String(x.image || 'empty') + ')' : x.page && x.page !== 'All pages' && x.page !== page ? 'set to "' + x.page + '", not this page' : 'ok')
    return (
      <div className="wrap my-4 border border-dashed border-ink bg-mist p-4 text-xs">
        <strong>Promotion slot: {page} #{index + 1}</strong> - promotions received from the server: {all.length}; matching this page: {matches.length}; {p ? 'showing "' + p.title + '"' : 'nothing to show in this slot'}.
        {all.map((x, i) => <div key={x.id || i}>- "{x.title || '(no headline)'}": {why(x)}</div>)}
      </div>
    )
  }
  if (!p) return null

  const url = safeUrl(p.link)
  const external = url && p.type === 'Partner or sponsor'
  const label = LABELS[p.type] || LABELS['About our company']
  const layout = p.layout || 'Wide banner'
  const side = layout !== 'Wide banner'

  const image = (
    <img
      src={p.image.trim()}
      alt={p.alt || ''}
      loading="lazy"
      decoding="async"
      className={'w-full bg-mist object-cover ' + (side ? 'h-full min-h-[14rem]' : 'aspect-[2/1] sm:aspect-[21/9]')}
    />
  )
  const copy = (
    <div className={'flex flex-col justify-center p-6 sm:p-10 ' + (side ? '' : 'sm:flex-row sm:items-center sm:justify-between sm:gap-10')}>
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate">{label}</p>
        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{p.title}</h2>
        {p.text && <p className="mt-3 leading-relaxed text-slate">{p.text}</p>}
      </div>
      {url && (
        <a
          href={url}
          className="btn-primary mt-6 shrink-0 self-start sm:mt-0"
          {...(external ? { target: '_blank', rel: 'sponsored noopener noreferrer' } : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {p.cta || 'Learn more'}
          <span className="sr-only"> about {p.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )

  return (
    <aside aria-label={label + ': ' + p.title} className="py-12 sm:py-16">
      <div className="wrap">
        <div className={'overflow-hidden border border-line bg-paper ' + (side ? 'grid md:grid-cols-2' : '')}>
          {layout === 'Image right' ? <>{copy}{image}</> : <>{image}{copy}</>}
        </div>
      </div>
    </aside>
  )
}

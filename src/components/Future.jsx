import { useSection } from '../content/ContentContext.jsx'

export default function Future() {
  const s = useSection('future')
  return (
    <section className="overflow-hidden bg-signal py-24 text-white sm:py-32" aria-labelledby="future-heading">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="future-heading" className="text-5xl font-bold leading-[1.02] sm:text-6xl">
            {s.heading}
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/85">{s.text}</p>
        </div>

        <svg viewBox="0 0 520 380" aria-hidden="true" className="h-auto w-full" fill="none" stroke="#fff" strokeWidth="1.5">
          {[60, 120, 180, 240, 300, 360].map((r, i) => (
            <g key={r}>
              <path d={`M20 360 A${r} ${r} 0 0 1 ${20 + r} ${360 - r}`} opacity={0.25 + i * 0.12} />
              <rect x={20 + r - 5} y={360 - r - 5} width="10" height="10" fill="#fff" stroke="none" opacity={0.4 + i * 0.12} />
            </g>
          ))}
          <path d="M20 360H500M20 360V20" opacity="0.5" />
        </svg>
      </div>
    </section>
  )
}

export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill={light ? '#FFFFFF' : '#0C1220'} />
        <path d="M9 9h6v14H9zM17 17h6v6h-6z" fill="#1B4DFF" />
      </svg>
      <span className={`font-display text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        4GO <span className="font-medium opacity-70">Technology</span>
      </span>
    </span>
  )
}

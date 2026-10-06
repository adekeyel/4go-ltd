const base = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'h-14 w-14',
}

export const Software = () => (
  <svg {...base}>
    <path d="M22 18L8 32l14 14M42 18l14 14-14 14" />
    <path d="M36 14L28 50" />
  </svg>
)
export const Platforms = () => (
  <svg {...base}>
    <rect x="25" y="25" width="14" height="14" rx="2" />
    <circle cx="12" cy="14" r="4" /><circle cx="52" cy="14" r="4" /><circle cx="12" cy="50" r="4" /><circle cx="52" cy="50" r="4" />
    <path d="M15 17l10 9M49 17L39 26M15 47l10-9M49 47L39 38" />
  </svg>
)
export const Infrastructure = () => (
  <svg {...base}>
    <path d="M32 10L8 22l24 12 24-12z" />
    <path d="M8 32l24 12 24-12M8 42l24 12 24-12" />
  </svg>
)
export const Business = () => (
  <svg {...base}>
    <rect x="6" y="24" width="14" height="16" rx="2" /><rect x="25" y="24" width="14" height="16" rx="2" /><rect x="44" y="24" width="14" height="16" rx="2" />
    <path d="M20 32h5M39 32h5M41 29l3 3-3 3" />
  </svg>
)
export const Fintech = () => (
  <svg {...base}>
    <path d="M8 22h48M8 42h48" />
    <circle cx="20" cy="22" r="4" /><circle cx="44" cy="42" r="4" />
    <path d="M24 22h14M26 42h14" strokeDasharray="2 5" />
  </svg>
)
export const Mobile = () => (
  <svg {...base}>
    <rect x="18" y="6" width="28" height="52" rx="5" />
    <path d="M28 12h8M28 52h8" />
    <path d="M25 24h14M25 32h14M25 40h8" />
  </svg>
)
export const Consulting = () => (
  <svg {...base}>
    <path d="M8 32h18" />
    <path d="M26 32c8 0 8-16 18-16h12M26 32c8 0 8 16 18 16h12" />
    <circle cx="26" cy="32" r="3" /><circle cx="56" cy="16" r="2" /><circle cx="56" cy="48" r="2" />
  </svg>
)

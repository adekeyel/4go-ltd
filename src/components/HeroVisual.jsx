const nodes = [
  { label: 'Web', x: 80, y: 100 },
  { label: 'Backend', x: 80, y: 260 },
  { label: 'Cloud', x: 80, y: 420 },
  { label: 'Mobile', x: 480, y: 100 },
  { label: 'Data', x: 480, y: 260 },
  { label: 'Integrations', x: 480, y: 420 },
]

// Each path runs from the core to a node. Pulses travel along them.
const paths = [
  { d: 'M220 235 H175 V100 H130', dur: '3.6s', begin: '0s' },
  { d: 'M220 260 H130', dur: '2.4s', begin: '1.1s' },
  { d: 'M220 285 H175 V420 H130', dur: '3.6s', begin: '2.2s' },
  { d: 'M340 235 H385 V100 H430', dur: '3.6s', begin: '0.6s' },
  { d: 'M340 260 H430', dur: '2.4s', begin: '1.8s' },
  { d: 'M340 285 H385 V420 H430', dur: '3.6s', begin: '2.9s' },
]

export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 560 520"
      role="img"
      aria-label="Diagram of a central 4GO core connected to web, backend, cloud, mobile, data and integrations"
      className="h-auto w-full"
    >
      <g fill="none" stroke="#0C1220" strokeWidth="1.5" strokeLinejoin="round">
        {paths.map((p) => (
          <path key={p.d} d={p.d} opacity="0.85" />
        ))}
      </g>

      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 50} y={n.y - 22} width="100" height="44" rx="4" fill="#FFFFFF" stroke="#0C1220" strokeWidth="1.5" />
          <text
            x={n.x}
            y={n.y + 5}
            textAnchor="middle"
            fontFamily="Instrument Sans, system-ui, sans-serif"
            fontSize="14"
            fontWeight="600"
            fill="#0C1220"
          >
            {n.label}
          </text>
        </g>
      ))}

      <rect x="220" y="210" width="120" height="100" rx="4" fill="#0C1220" />
      <image href="/logo-mark-light.png" x="232" y="242.4" width="96" height="35.2" preserveAspectRatio="xMidYMid meet" />

      <g className="hero-pulses" fill="#1B4DFF">
        {paths.map((p) => (
          <circle key={p.d} r="5">
            <animateMotion path={p.d} dur={p.dur} begin={p.begin} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  )
}

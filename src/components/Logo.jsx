export default function Logo({ light = false, className = '' }) {
  return (
    <img
      src={light ? '/logo-light.png' : '/logo.png'}
      alt="4GO Technology LTD"
      width="937"
      height="453"
      className={`h-10 w-auto select-none ${className}`}
      draggable="false"
    />
  )
}

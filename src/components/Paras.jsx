// Renders text with blank-line-separated paragraphs. Safe: plain text only, no HTML.
export default function Paras({ text = '' }) {
  return String(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>)
}

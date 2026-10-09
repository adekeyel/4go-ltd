import SectionEditor from './SectionEditor.jsx'
import ListEditor from './ListEditor.jsx'
import { collectionsSchema, sectionsSchema } from './schema.js'

export default function PageEditor({ page }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{page.label}</h1>
      {page.hint && <p className="mt-2 text-sm text-slate">{page.hint}</p>}

      <div className="mt-8 space-y-3">
        {page.blocks.map((b, i) => {
          const isList = b.type === 'list'
          const label = isList ? collectionsSchema[b.key].label + ' (list)' : sectionsSchema[b.key].label
          return (
            <details key={b.type + b.key} open={i === (page.defaultOpen ?? 0) || undefined} className="border border-line bg-paper">
              <summary className="cursor-pointer select-none px-5 py-4 font-semibold">{label}</summary>
              <div className="border-t border-line p-5">
                {isList ? <ListEditor collectionKey={b.key} /> : <SectionEditor sectionKey={b.key} />}
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}

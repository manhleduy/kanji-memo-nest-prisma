import { Card } from '../ui/card'

export function ReadingResult({
  title,
  values,
}: {
  title: string
  values: string[]
}) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.3em] text-sky-300">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {values.length ? (
          values.map((value) => (
            <span
              key={value}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-100"
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-400">No results found</span>
        )}
      </div>
    </Card>
  )
}

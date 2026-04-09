import { Card } from '../ui/card'

export function KanjiStatGrid({
  items,
}: {
  items: Array<{ label: string; value: string | number }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-white">{item.value}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}

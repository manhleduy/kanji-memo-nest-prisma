import { useMemo, useState } from 'react'
import { APP_COPY } from '../../data'
import type { KanjiWordEntry } from '../../types'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'

const PAGE_SIZE = 20

export function KanjiExamplesPanel({
  open,
  items,
  source,
  onClose,
}: {
  open: boolean
  items: KanjiWordEntry[]
  source: string
  onClose: () => void
}) {
  const [page, setPage] = useState(0)
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const visible = useMemo(() => items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [items, page])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/70 p-4 backdrop-blur sm:items-center">
      <Card className="max-h-[85vh] w-full max-w-5xl overflow-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-light uppercase tracking-[0.35em] text-sky-300">Word examples</p>
            <h3 className="mt-2 text-3xl font-light text-white">{source}</h3>
            <p className="mt-3 text-base font-light text-slate-400">Showing {visible.length} entries per page.</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            {APP_COPY.close}
          </Button>
        </div>
        <Separator />
        <div className="mt-4 grid gap-3">
          {visible.map((item, index) => (
            <EntryCard key={`${page}-${index}`} item={item} />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-slate-400">
            {APP_COPY.page} {page + 1} of {pageCount}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0}>
              {APP_COPY.previous}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
              disabled={page + 1 >= pageCount}
            >
              {APP_COPY.next}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function EntryCard({ item }: { item: KanjiWordEntry }) {
  const meanings = item.meanings.flatMap((meaning) => meaning.glosses)
  return (
    <Card className="space-y-3 p-4">
      <div className="flex flex-wrap gap-2">
        {meanings.slice(0, 4).map((meaning) => (
          <span
            key={meaning}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-light text-slate-200"
          >
            {meaning}
          </span>
        ))}
      </div>
      <div className="grid gap-2 text-base font-light text-slate-200">
        {item.variants.map((variant) => (
          <div
            key={`${variant.written}-${variant.pronounced}`}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <span className="text-lg font-light text-white">{variant.written}</span>
            <span className="ml-2 text-slate-300">{variant.pronounced}</span>
            <span className="ml-2 text-sm text-slate-500">
              {variant.priorities.length ? `priorities: ${variant.priorities.join(', ')}` : 'no priorities'}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}

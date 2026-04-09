import { useCallback, useEffect, useState } from 'react'
import { APP_COPY } from '../data'
import { getCharacters } from '../services/api'
import type { BackendCharacter } from '../types'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { DatabaseIcon } from '../components/ui/icons'
import { Pagination } from '../components/ui/pagination'

export function CharactersPage({
  onPickKanji,
}: {
  onPickKanji: (kanji: string) => void
}) {
  const [items, setItems] = useState<BackendCharacter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [connected, setConnected] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 20
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const visible = items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)

  const loadCharacters = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getCharacters()
      setItems(data)
      setPageIndex(0)
      setConnected(true)
    } catch {
      setError('Unable to load memorized characters.')
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadCharacters()
  }, [loadCharacters])

  return (
    <div className="grid gap-6">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-sky-300">
            <DatabaseIcon className="h-5 w-5" />
          </div>
          <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300">{APP_COPY.characters}</p>
          <h2 className="mt-1 text-3xl font-light text-white">Memorized characters</h2>
          <p className="mt-2 text-sm text-slate-300">Characters are loaded from the database and can jump back to search.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-sky-400/20 bg-sky-500/10 text-sky-100">{connected ? 'Connected' : APP_COPY.backendOffline}</Badge>
          <Badge className="border-white/10 bg-white/5 text-slate-200">{items.length} records</Badge>
        </div>
      </Card>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((item) => (
          <Card key={item.id} className="grid gap-4 md:grid-cols-[120px_1fr]">
            <button
              type="button"
              onClick={() => onPickKanji(item.character)}
              className="flex min-h-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-4xl font-light text-white transition hover:border-rose-400/40 hover:bg-rose-500/10 sm:text-5xl"
            >
              {item.character}
            </button>
            <div className="grid gap-3">
              <Row label="Meaning" value={item.meaning} />
              <Row label="Onyomi" value={item.onyomi} />
              <Row label="Kunyomi" value={item.kunyomi} />
              <Row label="Memorized count" value={item.freq} />
            </div>
          </Card>
        ))}
      </div>
      <Pagination
        page={pageIndex}
        pageCount={pageCount}
        onPrevious={() => setPageIndex((value) => Math.max(0, value - 1))}
        onNext={() => setPageIndex((value) => Math.min(pageCount - 1, value + 1))}
      />
      {!loading && !items.length ? <p className="text-sm text-slate-400">No memorized characters found.</p> : null}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-100">{value}</p>
    </div>
  )
}

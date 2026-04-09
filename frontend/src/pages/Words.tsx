import { useCallback, useEffect, useState } from 'react'
import { APP_COPY } from '../data'
import { getWords } from '../services/api'
import type { BackendWord } from '../types'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { BookIcon } from '../components/ui/icons'
import { Pagination } from '../components/ui/pagination'

export function WordsPage({
  onPickKanji,
}: {
  onPickKanji: (kanji: string) => void
}) {
  const [items, setItems] = useState<BackendWord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [connected, setConnected] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const pageSize = 20
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const visible = items.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)

  const loadWords = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getWords()
      setItems(data)
      setPageIndex(0)
      setConnected(true)
    } catch {
      setError('Unable to load memorized words.')
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadWords()
  }, [loadWords])

  return (
    <div className="grid gap-6">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-sky-300">
            <BookIcon className="h-5 w-5" />
          </div>
          <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-300">{APP_COPY.words}</p>
          <h2 className="mt-1 text-3xl font-light text-white">Memorized words</h2>
          <p className="mt-2 text-sm text-slate-300">Each saved word shows its associated kanji as clickable chips.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-sky-400/20 bg-sky-500/10 text-sky-100">{connected ? 'Connected' : APP_COPY.backendOffline}</Badge>
          <Badge className="border-white/10 bg-white/5 text-slate-200">{items.length} records</Badge>
        </div>
      </Card>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <div className="grid gap-4">
        {visible.map((item) => (
          <Card key={item.id} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-light text-white">{item.word}</h3>
              <span className="text-sm text-slate-400">{item.characters.length} characters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.characters.map((character) => (
                <a
                  key={`${item.id}-${character}`}
                  href="#search"
                  onClick={(event) => {
                    event.preventDefault()
                    onPickKanji(character)
                  }}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-base font-light text-slate-100 transition hover:border-rose-400/40 hover:bg-rose-500/10 sm:text-lg"
                >
                  {character}
                </a>
              ))}
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
      {!loading && !items.length ? <p className="text-sm text-slate-400">No memorized words found.</p> : null}
    </div>
  )
}

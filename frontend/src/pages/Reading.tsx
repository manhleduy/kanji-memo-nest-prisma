import { APP_COPY } from '../data'
import { useReadingPage } from '../hooks/use-reading-page'
import { KanjiSearchForm } from '../components/kanji/kanji-search-form'
import { ReadingResult } from '../components/kanji/reading-result'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'
import { Spinner } from '../components/ui/spinner'

export function ReadingPage() {
  const page = useReadingPage()

  return (
    <div className="grid gap-6">
      <KanjiSearchForm
        label={APP_COPY.reading}
        value={page.value}
        onChange={page.setValue}
        onSubmit={page.search}
        placeholder="がく"
        helper="Type the hiragana reading, then search for matching kanji."
        loading={page.loading}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Badge className="border-sky-400/20 bg-sky-500/10 text-sky-100">{page.source === 'api' ? 'Live API' : 'API unavailable, showing local fallback data.'}</Badge>
        <Badge className="border-white/10 bg-white/5 text-slate-200">{page.readyLabel}</Badge>
      </div>
      {page.error ? <p className="text-sm text-rose-300">{page.error}</p> : null}
      <Card className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="grid place-items-center gap-3 p-8 text-center">
          {page.loading ? <Spinner /> : <span className="text-7xl font-semibold text-white">{page.result.reading}</span>}
          <p className="text-sm text-slate-400">Current reading query</p>
        </div>
        <div className="grid gap-6">
          {page.loading ? <Skeleton className="h-28" /> : <ReadingResult title="Main kanji" values={page.result.main_kanji} />}
          {page.loading ? <Skeleton className="h-28" /> : <ReadingResult title="Name kanji" values={page.result.name_kanji} />}
        </div>
      </Card>
      <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{APP_COPY.summary}</p>
          <p className="mt-2 text-sm text-slate-300">Save the current reading as a memorized word.</p>
        </div>
        <Button variant="outline" onClick={page.memorizeWord} disabled={!page.backendReady || page.saving}>
          {page.saving ? 'Saving...' : APP_COPY.memorizeWord}
        </Button>
      </Card>
    </div>
  )
}

import { useCharacterPage } from '../hooks/use-character-page'
import { APP_COPY } from '../data'
import { KanjiDetailPanel } from '../components/kanji/kanji-detail-panel'
import { KanjiExamplesPanel } from '../components/kanji/kanji-examples-panel'
import { KanjiSearchForm } from '../components/kanji/kanji-search-form'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { SearchIcon } from '../components/ui/icons'

export function CharacterPage({
  selectedKanji,
  selectionToken,
}: {
  selectedKanji: string | null
  selectionToken: number
}) {
  const page = useCharacterPage(selectedKanji, selectionToken)

  return (
    <div className="grid gap-6">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-sky-300">
            <SearchIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-300">Kanji Atlas</p>
            <p className="text-sm text-slate-300">Search and memorize kanji.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span className={`h-2.5 w-2.5 rounded-full ${page.backendReady ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          <span>{page.backendReady ? 'Database connected' : 'Database offline'}</span>
        </div>
      </Card>
      <KanjiSearchForm
        label="Kanji input"
        value={page.value}
        onChange={page.setValue}
        onSubmit={() => page.search(page.value)}
        placeholder="学"
        helper="Paste one kanji character. The app also loads a related word list."
        loading={page.loading}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-300">The examples modal pages through 20 entries at a time.</p>
        <div className="flex flex-wrap gap-2">
          <Badge className="border-sky-400/20 bg-sky-500/10 text-sky-100">{page.source === 'api' ? 'Live API' : 'API unavailable, showing local fallback data.'}</Badge>
          <Badge className="border-white/10 bg-white/5 text-slate-200">
            {page.savedMatch ? APP_COPY.saved : `${page.savedCharacters.length} saved`}
          </Badge>
        </div>
      </div>
      {page.error ? <p className="text-sm text-rose-300">{page.error}</p> : null}
      <KanjiDetailPanel
        detail={page.detail}
        loading={page.loading}
        hasExamples={page.words.length > 0}
        onOpenExamples={page.openExamples}
        onMemorize={page.memorizeCurrentCharacter}
        canMemorize={page.backendReady}
        memorizing={page.memorizing}
      />
      <KanjiExamplesPanel
        key={page.examplesSession}
        open={page.examplesOpen}
        items={page.words}
        source={`${page.detail.kanji} examples`}
        onClose={() => page.setExamplesOpen(false)}
      />
      <Card className="grid gap-3 sm:grid-cols-3 p-4">
        <Stat label="Saved characters" value={page.savedCharacters.length} />
        <Stat label="Current kanji" value={page.detail.kanji} />
        <Stat label="Database" value={page.backendReady ? 'Connected' : 'Offline'} />
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}

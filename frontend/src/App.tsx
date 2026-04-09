import { useState } from 'react'
import { AppShell } from './components/layout/app-shell'
import { LookupTabs } from './components/kanji/lookup-tabs'
import { CharacterPage } from './pages/Character'
import { CharactersPage } from './pages/Characters'
import { ReadingPage } from './pages/Reading'
import { WordsPage } from './pages/Words'

function App() {
  const [page, setPage] = useState<'search' | 'characters' | 'words' | 'reading'>('search')
  const [selectedKanji, setSelectedKanji] = useState<string | null>(null)
  const [selectionToken, setSelectionToken] = useState(0)

  const jumpToSearch = (kanji: string) => {
    setSelectedKanji(kanji)
    setSelectionToken((value) => value + 1)
    setPage('search')
  }

  return (
    <AppShell>
      <div className="mb-6 flex items-center justify-between gap-4">
        <LookupTabs active={page} onChange={setPage} />
        <p className="hidden text-sm text-slate-400 md:block">Responsive kanji dictionary frontend</p>
      </div>
      {page === 'search' ? (
        <CharacterPage selectedKanji={selectedKanji} selectionToken={selectionToken} />
      ) : page === 'characters' ? (
        <CharactersPage onPickKanji={jumpToSearch} />
      ) : page === 'words' ? (
        <WordsPage onPickKanji={jumpToSearch} />
      ) : (
        <ReadingPage />
      )}
    </AppShell>
  )
}

export default App

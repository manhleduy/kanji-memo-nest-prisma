import { useCallback, useEffect, useMemo, useState } from 'react'
import { mockKanjiDetails, mockWordsByKanji } from '../data'
import { fetchKanji, fetchWords } from '../services/kanjiapi'
import { getCharacters, saveCharacter } from '../services/api'
import type { BackendCharacter, KanjiDetail, KanjiWordEntry } from '../types'

export function useCharacterPage(selectedKanji: string | null, selectionToken: number) {
  const [value, setValue] = useState('学')
  const [detail, setDetail] = useState<KanjiDetail>(mockKanjiDetails.学)
  const [words, setWords] = useState<KanjiWordEntry[]>(mockWordsByKanji.学)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [source, setSource] = useState<'api' | 'mock'>('mock')
  const [examplesOpen, setExamplesOpen] = useState(false)
  const [examplesSession, setExamplesSession] = useState(0)
  const [saving, setSaving] = useState(false)
  const [backendReady, setBackendReady] = useState(false)
  const [savedCharacters, setSavedCharacters] = useState<BackendCharacter[]>([])

  const savedMatch = useMemo(
    () => savedCharacters.some((item) => item.character === detail.kanji),
    [detail.kanji, savedCharacters],
  )

  const runSearch = useCallback(async (input: string) => {
    const char = input.trim().slice(0, 1)
    if (!char) return
    setValue(char)
    setLoading(true)
    setError('')
    try {
      const [kanjiRes, wordsRes] = await Promise.all([fetchKanji(char), fetchWords(char)])
      setDetail(kanjiRes.data)
      setWords(wordsRes.data)
      setSource(kanjiRes.source === 'api' && wordsRes.source === 'api' ? 'api' : 'mock')
    } catch {
      setError('Unable to load kanji details.')
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshSavedCharacters = useCallback(async () => {
    try {
      const items = await getCharacters()
      setSavedCharacters(items)
      setBackendReady(true)
    } catch {
      setBackendReady(false)
      setSavedCharacters([])
    }
  }, [])

  const memorizeCurrentCharacter = useCallback(async () => {
    if (!backendReady) return
    setSaving(true)
    try {
      await saveCharacter({
        character: detail.kanji,
        meaning: detail.meaning.join(', '),
        onyomi: detail.on_readings.join(', '),
        kunyomi: detail.kun_readings.join(', '),
        freq: 1,
      })
      await refreshSavedCharacters()
    } catch {
      setBackendReady(false)
    } finally {
      setSaving(false)
    }
  }, [backendReady, detail, refreshSavedCharacters])

  useEffect(() => {
    void refreshSavedCharacters()
  }, [refreshSavedCharacters])

  useEffect(() => {
    if (!selectedKanji) return
    void runSearch(selectedKanji)
  }, [runSearch, selectionToken, selectedKanji])

  return {
    backendReady,
    detail,
    error,
    examplesOpen,
    examplesSession,
    memorizing: saving,
    openExamples: () => {
      setExamplesSession((value) => value + 1)
      setExamplesOpen(true)
    },
    memorizeCurrentCharacter,
    savedCharacters,
    savedMatch,
    search: runSearch,
    setExamplesOpen,
    setValue,
    source,
    value,
    words,
    loading,
  }
}

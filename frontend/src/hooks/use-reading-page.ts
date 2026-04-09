import { useCallback, useEffect, useMemo, useState } from 'react'
import { mockReadingResults } from '../data'
import { fetchReading } from '../services/kanjiapi'
import { getWords, saveWord } from '../services/api'
import type { ReadingEntry } from '../types'

export function useReadingPage() {
  const [value, setValue] = useState('がく')
  const [result, setResult] = useState<ReadingEntry>(mockReadingResults.がく)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [source, setSource] = useState<'api' | 'mock'>('mock')
  const [backendReady, setBackendReady] = useState(false)
  const [savedWords, setSavedWords] = useState(0)

  const refreshBackendState = useCallback(async () => {
    try {
      const data = await getWords()
      setSavedWords(data.length)
      setBackendReady(true)
    } catch {
      setBackendReady(false)
    }
  }, [])

  const search = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetchReading(value)
      setResult(response.data)
      setSource(response.source)
    } catch {
      setError('Unable to load reading lookup.')
    } finally {
      setLoading(false)
    }
  }

  const memorizeWord = async () => {
    if (!backendReady) return
    setSaving(true)
    try {
      await saveWord({
        word: result.reading,
        characters: uniqueCharacters([...result.main_kanji, ...result.name_kanji]),
      })
      await refreshBackendState()
    } catch {
      setBackendReady(false)
    } finally {
      setSaving(false)
    }
  }

  const readyLabel = useMemo(
    () => (backendReady ? `${savedWords} saved words` : 'Backend unavailable. Memorization actions are disabled.'),
    [backendReady, savedWords],
  )

  useEffect(() => {
    void refreshBackendState()
  }, [refreshBackendState])

  return {
    backendReady,
    error,
    memorizeWord,
    readyLabel,
    result,
    saving,
    search,
    setValue,
    source,
    value,
    loading,
  }
}

function uniqueCharacters(values: string[]) {
  return Array.from(new Set(values.flatMap((value) => value.split(''))))
}

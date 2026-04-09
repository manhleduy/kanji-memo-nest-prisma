import { kanjiapi } from '../config/kanjiapi'
import {
  APP_COPY,
  mockKanjiDetails,
  mockKanjiLists,
  mockReadingResults,
  mockWordsByKanji,
} from '../data'
import type {
  KanjiApiDetail,
  KanjiDetail,
  KanjiWordEntry,
  LookupResult,
  ReadingEntry,
} from '../types'

const fallbackKanji = '学'

export async function fetchKanji(character: string): Promise<LookupResult<KanjiDetail>> {
  const key = normalizeKanji(character)
  try {
    const { data } = await kanjiapi.get<KanjiApiDetail>(`/kanji/${encodeURIComponent(key)}`)
    return { data: normalizeKanjiDetail(data, key), source: 'api' }
  } catch {
    return { data: mockKanjiDetails[key] ?? mockKanjiDetails[fallbackKanji], source: 'mock' }
  }
}

export async function fetchWords(character: string): Promise<LookupResult<KanjiWordEntry[]>> {
  const key = normalizeKanji(character)
  try {
    const { data } = await kanjiapi.get<KanjiWordEntry[]>(
      `/words/${encodeURIComponent(key)}`,
    )
    return { data: data ?? [], source: 'api' }
  } catch {
    return { data: mockWordsByKanji[key] ?? mockWordsByKanji[fallbackKanji], source: 'mock' }
  }
}

export async function fetchReading(reading: string): Promise<LookupResult<ReadingEntry>> {
  const key = normalize(reading)
  try {
    const { data } = await kanjiapi.get<ReadingEntry>(`/reading/${encodeURIComponent(key)}`)
    return { data, source: 'api' }
  } catch {
    return {
      data: mockReadingResults[key] ?? {
        reading: key,
        main_kanji: ['学', '楽'],
        name_kanji: ['学'],
      },
      source: 'mock',
    }
  }
}

export async function fetchKanjiList(list: string): Promise<LookupResult<string[]>> {
  const key = normalize(list)
  try {
    const { data } = await kanjiapi.get<string[]>(`/kanji/${encodeURIComponent(key)}`)
    return { data, source: 'api' }
  } catch {
    return { data: mockKanjiLists[key] ?? mockKanjiLists.all, source: 'mock' }
  }
}

export function getSourceLabel(source: LookupResult<unknown>['source']) {
  return source === 'api' ? 'Live API' : APP_COPY.apiUnavailable
}

function normalize(value: string) {
  return value.trim()
}

function normalizeKanji(value: string) {
  return normalize(value).slice(0, 1)
}

function normalizeKanjiDetail(data: KanjiApiDetail, key: string): KanjiDetail {
  return {
    freq_mainichi_shinbun: data.freq_mainichi_shinbun ?? 0,
    grade: data.grade ?? null,
    Heisig_en: data.heisig_en ?? '',
    jlpt: data.jlpt ?? null,
    kanji: data.kanji ?? key,
    kun_readings: data.kun_readings ?? [],
    meaning: data.meanings ?? [],
    notes: data.notes ?? '',
    on_readings: data.on_readings ?? [],
    stroke_count: data.stroke_count ?? 0,
    unicode: data.unicode ?? '',
  }
}

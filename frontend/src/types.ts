export type DataSource = 'api' | 'mock'

export interface KanjiDetail {
  freq_mainichi_shinbun: number
  grade: string | number | null
  Heisig_en: string
  jlpt: string | number | null
  kanji: string
  kun_readings: string[]
  meaning: string[]
  notes: string
  on_readings: string[]
  stroke_count: number
  unicode: string
}

export interface KanjiApiDetail {
  kanji: string
  grade?: number | null
  stroke_count?: number | null
  meanings?: string[]
  kun_readings?: string[]
  on_readings?: string[]
  name_readings?: string[]
  jlpt?: number | null
  unicode?: string
  heisig_en?: string
  freq_mainichi_shinbun?: number
  notes?: string
}

export interface KanjiWordEntry {
  meanings: { glosses: string[] }[]
  variants: { priorities: string[]; pronounced: string; written: string }[]
}

export interface ReadingEntry {
  reading: string
  main_kanji: string[]
  name_kanji: string[]
}

export interface LookupResult<T> {
  data: T
  source: DataSource
}

export interface BackendCharacter {
  id: number
  character: string
  meaning: string
  onyomi: string
  kunyomi: string
  freq: number
}

export interface BackendWord {
  id: number
  word: string
  characters: string[]
}

export interface CharacterPayload {
  character: string
  meaning: string
  onyomi: string
  kunyomi: string
  freq: number
}

export interface WordPayload {
  word: string
  characters: string[]
}

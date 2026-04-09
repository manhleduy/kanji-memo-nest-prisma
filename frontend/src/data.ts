import type { KanjiDetail, KanjiWordEntry, ReadingEntry } from './types'

export const APP_COPY = {
  brand: 'Kanji Atlas',
  title: 'Kanji memorization and lookup workspace.',
  subtitle:
    'Search kanji, save characters and words to your database, and browse memorized entries.',
  form: 'Search',
  search: 'Search',
  example: 'Example',
  memorized: 'Memorized',
  characters: 'Characters',
  words: 'Words',
  reading: 'Reading',
  chart: 'Chart',
  summary: 'Summary',
  close: 'Close',
  previous: 'Previous',
  next: 'Next',
  page: 'Page',
  save: 'Save',
  saved: 'Saved',
  loading: 'Loading...',
  backendOffline: 'Backend unavailable. Memorization actions are disabled.',
  memorizeCharacter: 'Memorize character',
  memorizeWord: 'Memorize word',
  retry: 'Retry',
  apiUnavailable: 'API unavailable, showing local fallback data.',
}

export const PAGE_TABS = [
  { id: 'search', label: 'Search' },
  { id: 'characters', label: 'Characters' },
  { id: 'words', label: 'Words' },
  { id: 'reading', label: 'Reading' },
] as const

export const CATEGORY_PRESETS = [
  'joyo',
  'jouyou',
  'jinmeiyo',
  'heisig',
  'kyouiku',
  'kyoiku',
  'grade-1',
  'grade-2',
  'grade-3',
  'grade-4',
  'grade-5',
  'grade-6',
  'grade-7',
  'grade-8',
  'jlpt-5',
  'jlpt-4',
  'jlpt-3',
  'jlpt-2',
  'jlpt-1',
  'all',
]

export const KANJI_CATEGORY_GROUPS = [
  { key: 'joyo', label: 'Joyo', characters: ['日', '一', '人', '年', '学', '水', '火', '山'] },
  { key: 'jouyou', label: 'Jouyou', characters: ['日', '月', '火', '水', '木', '金', '土', '空'] },
  { key: 'jinmeiyo', label: 'Jinmeiyo', characters: ['希', '翔', '美', '愛', '菜', '悠', '葵', '凛'] },
  { key: 'heisig', label: 'Heisig', characters: ['一', '人', '入', '力', '口', '大', '山', '川'] },
  { key: 'kyouiku', label: 'Kyouiku', characters: ['一', '二', '三', '四', '五', '六', '七', '八'] },
  { key: 'kyoiku', label: 'Kyoiku', characters: ['九', '十', '百', '千', '上', '下', '左', '右'] },
  { key: 'grade-1', label: 'Grade 1', characters: ['一', '二', '三', '四', '五', '六', '七', '八'] },
  { key: 'grade-2', label: 'Grade 2', characters: ['学', '校', '国', '生', '先', '年', '時', '行'] },
  { key: 'grade-3', label: 'Grade 3', characters: ['駅', '海', '公', '記', '聞', '農', '進', '旅'] },
  { key: 'grade-4', label: 'Grade 4', characters: ['様', '勝', '温', '陽', '電', '顔', '験', '楽'] },
  { key: 'grade-5', label: 'Grade 5', characters: ['警', '潔', '難', '豊', '鏡', '職', '録', '競'] },
  { key: 'grade-6', label: 'Grade 6', characters: ['暗', '警', '模', '潔', '磁', '複', '瞬', '憧'] },
  { key: 'grade-7', label: 'Grade 7', characters: ['鬱', '響', '驚', '艦', '騒', '躍', '贈', '藍'] },
  { key: 'grade-8', label: 'Grade 8', characters: ['鶴', '簿', '贈', '曇', '鍋', '麺', '籠', '躍'] },
  { key: 'jlpt-5', label: 'JLPT 5', characters: ['日', '一', '人', '年', '大', '学', '水', '火'] },
  { key: 'jlpt-4', label: 'JLPT 4', characters: ['会', '使', '始', '話', '聞', '読', '書', '食'] },
  { key: 'jlpt-3', label: 'JLPT 3', characters: ['感', '説', '便', '験'] },
  { key: 'jlpt-2', label: 'JLPT 2', characters: ['維', '改', '研', '判'] },
  { key: 'jlpt-1', label: 'JLPT 1', characters: ['鬱', '響', '驚', '難', '藝', '變'] },
] as const

export const CATEGORY_INFO: Record<
  string,
  { label: string; description: string }
> = {
  joyo: {
    label: 'Joyo',
    description:
      'The standard-use kanji set recommended for general Japanese literacy.',
  },
  jouyou: {
    label: 'Jouyou',
    description:
      'An alternate spelling for the standard-use jōyō kanji list used in modern Japanese.',
  },
  jinmeiyo: {
    label: 'Jinmeiyo',
    description:
      'The name-kanji list that can legally be used in Japanese personal names.',
  },
  heisig: {
    label: 'Heisig',
    description:
      'A learning order based on James Heisig’s keyword-driven Remembering the Kanji method.',
  },
  kyouiku: {
    label: 'Kyouiku',
    description:
      'The elementary-school education kanji taught as the core school-year list.',
  },
  kyoiku: {
    label: 'Kyoiku',
    description:
      'The education kanji list grouped by Japanese elementary school grade levels.',
  },
  'grade-1': {
    label: 'Grade 1',
    description: 'The first year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-2': {
    label: 'Grade 2',
    description: 'The second year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-3': {
    label: 'Grade 3',
    description: 'The third year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-4': {
    label: 'Grade 4',
    description: 'The fourth year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-5': {
    label: 'Grade 5',
    description: 'The fifth year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-6': {
    label: 'Grade 6',
    description: 'The final year of the elementary-school kyōiku kanji sequence.',
  },
  'grade-7': {
    label: 'Grade 7',
    description: 'Secondary-school jōyō kanji introduced after the elementary grades.',
  },
  'grade-8': {
    label: 'Grade 8',
    description: 'Later secondary-school jōyō kanji beyond the elementary list.',
  },
  'jlpt-5': {
    label: 'JLPT 5',
    description: 'Beginner-level kanji commonly grouped with JLPT N5 study material.',
  },
  'jlpt-4': {
    label: 'JLPT 4',
    description: 'Early-study kanji commonly grouped with JLPT N4 preparation.',
  },
  'jlpt-3': {
    label: 'JLPT 3',
    description: 'Intermediate kanji used in JLPT N3-style reading practice.',
  },
  'jlpt-2': {
    label: 'JLPT 2',
    description: 'Advanced kanji often grouped with JLPT N2-level reading material.',
  },
  'jlpt-1': {
    label: 'JLPT 1',
    description: 'The most advanced kanji grouped with JLPT N1-level study.',
  },
  all: {
    label: 'All',
    description: 'A combined browsing view for the full kanji dataset.',
  },
}

export const mockKanjiDetails: Record<string, KanjiDetail> = {
  学: {
    freq_mainichi_shinbun: 621,
    grade: 1,
    Heisig_en: 'study',
    jlpt: 5,
    kanji: '学',
    kun_readings: ['まな.ぶ', 'まな.び'],
    meaning: ['study', 'learning', 'science'],
    notes: 'Core character for education, learning, and academic contexts.',
    on_readings: ['ガク'],
    stroke_count: 8,
    unicode: '5B66',
  },
  水: {
    freq_mainichi_shinbun: 143,
    grade: 1,
    Heisig_en: 'water',
    jlpt: 5,
    kanji: '水',
    kun_readings: ['みず'],
    meaning: ['water'],
    notes: 'Frequently used in daily words, measurements, and seasons.',
    on_readings: ['スイ'],
    stroke_count: 4,
    unicode: '6C34',
  },
  日: {
    freq_mainichi_shinbun: 3,
    grade: 1,
    Heisig_en: 'day',
    jlpt: 5,
    kanji: '日',
    kun_readings: ['ひ', 'か'],
    meaning: ['day', 'sun', 'Japan'],
    notes: 'One of the most common kanji in names, dates, and expressions.',
    on_readings: ['ニチ', 'ジツ'],
    stroke_count: 4,
    unicode: '65E5',
  },
}

export const mockWordsByKanji: Record<string, KanjiWordEntry[]> = {
  学: buildMockWords('学'),
  水: buildMockWords('水'),
  日: buildMockWords('日'),
}

export const mockReadingResults: Record<string, ReadingEntry> = {
  がく: {
    reading: 'がく',
    main_kanji: ['学', '岳', '楽'],
    name_kanji: ['学', '額'],
  },
  みず: {
    reading: 'みず',
    main_kanji: ['水', '瑞', '澪'],
    name_kanji: ['水', '巳津'],
  },
}

export const mockKanjiLists: Record<string, string[]> = {
  joyo: ['日', '一', '国', '人', '年', '大', '十', '二', '本', '中', '長', '出'],
  'jlpt-5': ['日', '一', '人', '年', '大', '学', '水', '火'],
  'jlpt-1': ['鬱', '響', '驚', '難', '藝', '變'],
  'grade-1': ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '日', '月'],
  'grade-6': ['暗', '警', '模', '潔', '磁', '複', '瞬', '憧'],
  all: ['日', '月', '火', '水', '木', '金', '土', '山', '川', '空', '海', '風'],
}

function buildMockWords(character: string) {
  return Array.from({ length: 40 }, (_, index) => ({
    meanings: [{ glosses: [`${character} example meaning ${index + 1}`] }],
    variants: [
      {
        priorities: index % 3 === 0 ? ['news'] : [],
        pronounced: `${character === '学' ? 'がく' : character === '水' ? 'みず' : 'ひ'}${index}`,
        written: `${character}${index + 1}`,
      },
    ],
  }))
}

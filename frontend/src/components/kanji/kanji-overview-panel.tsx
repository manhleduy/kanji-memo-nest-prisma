import type { KanjiDetail } from '../../types'
import { KanjiListBrowser } from './kanji-list-browser'
import { KanjiStatGrid } from './kanji-stat-grid'
import { SectionCard } from '../layout/section'

export function KanjiOverviewPanel({
  notes,
  detail,
  listValue,
  onListValueChange,
  onBrowse,
  listItems,
  loading,
}: {
  notes: string
  detail: KanjiDetail
  listValue: string
  onListValueChange: (value: string) => void
  onBrowse: () => void
  listItems: string[]
  loading: boolean
}) {
  return (
    <div className="grid gap-6">
      <SectionCard title="" description="A compact summary of the current kanji.">
        <KanjiStatGrid
          items={[
            { label: 'Frequency rank', value: detail.freq_mainichi_shinbun },
            { label: 'Strokes', value: detail.stroke_count },
            { label: 'List items', value: listItems.length },
            { label: 'Browse mode', value: listValue },
            { label: 'Readings', value: detail.kun_readings.length + detail.on_readings.length },
            { label: 'Status', value: loading ? 'Loading' : 'Ready' },
          ]}
        />
      </SectionCard>
      <SectionCard title="Summary" description="Browse category endpoints and review the current note.">
        <div className="space-y-4">
          <KanjiListBrowser
            value={listValue}
            onValueChange={onListValueChange}
            onLoad={onBrowse}
            items={listItems}
            loading={loading}
          />
          <p className="text-sm text-slate-300">{notes}</p>
        </div>
      </SectionCard>
    </div>
  )
}

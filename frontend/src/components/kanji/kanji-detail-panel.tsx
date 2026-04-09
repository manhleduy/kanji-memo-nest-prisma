import type { KanjiDetail } from '../../types'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { KanjiStatGrid } from './kanji-stat-grid'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import { Spinner } from '../ui/spinner'

export function KanjiDetailPanel({
  detail,
  loading,
  onOpenExamples,
  onMemorize,
  hasExamples,
  canMemorize,
  memorizing,
}: {
  detail: KanjiDetail
  loading: boolean
  onOpenExamples: () => void
  onMemorize: () => void
  hasExamples: boolean
  canMemorize: boolean
  memorizing: boolean
}) {
  const meanings = detail.meaning ?? []
  const kunyomi = detail.kun_readings ?? []
  const onyomi = detail.on_readings ?? []

  return (
    <Card className="grid gap-5 md:grid-cols-[220px_1fr]">
      <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/15 to-rose-500/10 text-8xl font-semibold text-white">
        {loading ? <Spinner /> : detail.kanji}
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge>Unicode {detail.unicode || 'N/A'}</Badge>
          <Badge>Stroke {detail.stroke_count ?? 'N/A'}</Badge>
          <Badge>JLPT {detail.jlpt ?? 'N/A'}</Badge>
          <Badge>Grade {detail.grade ?? 'N/A'}</Badge>
        </div>
        {loading ? (
          <Skeleton className="h-32" />
        ) : (
          <KanjiStatGrid
            items={[
              { label: 'Memorized count', value: detail.freq_mainichi_shinbun ?? 0 },
              { label: 'Meaning', value: meanings.join(', ') || 'N/A' },
              { label: 'Heisig', value: detail.Heisig_en || 'N/A' },
              { label: 'Readings', value: `${kunyomi.length + onyomi.length}` },
            ]}
          />
        )}
        <Separator />
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailField label="Kunyomi" value={kunyomi.join(' ・ ')} />
          <DetailField label="Onyomi" value={onyomi.join(' ・ ')} />
          <DetailField label="Meaning" value={meanings.join(' ・ ')} />
          <DetailField label="Notes" value={detail.notes || 'N/A'} />
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="secondary" onClick={onOpenExamples} disabled={!hasExamples}>
            Example
          </Button>
          <Button variant="outline" onClick={onMemorize} disabled={!canMemorize || memorizing}>
            {memorizing ? 'Saving...' : 'Memorized'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm text-slate-100">{value || '—'}</p>
    </Card>
  )
}

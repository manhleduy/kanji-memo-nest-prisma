import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { CATEGORY_PRESETS } from '../../data'

export function KanjiListBrowser({
  value,
  onValueChange,
  onLoad,
  items,
  loading,
}: {
  value: string
  onValueChange: (value: string) => void
  onLoad: () => void
  items: string[]
  loading: boolean
}) {
  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORY_PRESETS.map((preset) => (
          <Button
            key={preset}
            variant={value === preset ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onValueChange(preset)}
          >
            {preset}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.slice(0, 24).map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-100"
          >
            {item}
          </span>
        ))}
      </div>
      <Button variant="outline" size="sm" onClick={onLoad} disabled={loading}>
        {loading ? 'Loading...' : 'Browse category'}
      </Button>
    </Card>
  )
}

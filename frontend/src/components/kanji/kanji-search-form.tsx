import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Tooltip } from '../ui/tooltip'
import { APP_COPY } from '../../data'

export function KanjiSearchForm({
  label,
  value,
  onChange,
  onSubmit,
  placeholder,
  helper,
  loading,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder: string
  helper: string
  loading: boolean
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          <span>{label}</span>
          <Tooltip label={helper}>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-[11px] text-slate-300">
              i
            </span>
          </Tooltip>
        </div>
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && onSubmit()}
        />
      </div>
      <Button className="self-end" onClick={onSubmit} disabled={loading}>
        {loading ? 'Searching...' : APP_COPY.search}
      </Button>
    </div>
  )
}

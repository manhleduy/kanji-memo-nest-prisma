import { Button } from '../ui/button'
import { PAGE_TABS } from '../../data'

export function LookupTabs({
  active,
  onChange,
}: {
  active: string
  onChange: (value: 'search' | 'characters' | 'words' | 'reading') => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {PAGE_TABS.map((tab) => (
        <Button
          key={tab.id}
          variant={active === tab.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}

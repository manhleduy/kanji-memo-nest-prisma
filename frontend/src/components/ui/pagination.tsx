import { Button } from './button'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

export function Pagination({
  page,
  pageCount,
  onPrevious,
  onNext,
}: {
  page: number
  pageCount: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="text-sm text-slate-400">
        Page {page + 1} of {pageCount}
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onPrevious} disabled={page === 0}>
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </Button>
        <Button variant="secondary" size="sm" onClick={onNext} disabled={page + 1 >= pageCount}>
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

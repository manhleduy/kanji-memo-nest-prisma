import type { ReactNode } from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {description ? <CardDescription className="mt-1">{description}</CardDescription> : null}
      <div className="mt-4">{children}</div>
    </Card>
  )
}

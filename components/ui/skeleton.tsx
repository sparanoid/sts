import * as React from 'react'
import { cn } from '@/utils/cn'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-fg/10 relative h-4 w-full animate-pulse rounded-sm leading-[inherit]', className)}
      {...props}
    />
  )
}

export { Skeleton }

import type * as React from 'react'

import { cn } from '@/utils/cn'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'placeholder:text-fg/40 focus-ring flex min-h-12 w-full rounded-sm border bg-transparent p-2 shadow-xs text-base md:text-sm field-sizing-content',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-rose-500/30 aria-invalid:border-rose-500',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

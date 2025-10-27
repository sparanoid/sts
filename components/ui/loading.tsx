import type { ComponentProps } from 'react'

import { cn } from '@/utils/cn'

export type LoadingProps = {
  size?: string
  width?: string
} & ComponentProps<'span'>

export function Loading({ size, width, className, ...props }: LoadingProps) {
  return (
    <span
      data-slot='loading'
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-[color-mix(in_oklch,currentColor_50%,transparent)] border-r-current align-[-0.125em] supports-[not(color:color-mix(in_oklch,currentColor_50%,transparent))]:border-current supports-[not(color:color-mix(in_oklch,currentColor_50%,transparent))]:border-r-transparent',
        className
      )}
      style={{
        width: `${size || `1.125em`}`,
        height: `${size || `1.125em`}`,
        borderWidth: `${width || `.15em`}`,
      }}
      {...props}
    />
  )
}

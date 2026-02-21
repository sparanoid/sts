'use client'

import { Toggle as TogglePrimitive } from 'radix-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/utils/cn'

const toggleVariants = cva(
  'focus-ring inline-flex items-center justify-center gap-1 rounded-md font-medium hover:bg-fg/5 hover:text-ac disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-ac/10 data-[state=on]:text-ac [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border border-transparent',
        outline: 'border border-fg/30 shadow-xs hover:bg-fg/5 hover:text-ac data-[state=on]:border-ac',
        // icon: 'border border-transparent',
      },
      // Should match Button
      size: {
        sm: 'h-6 rounded-sm px-2 text-xs',
        default: 'h-8 rounded-md px-3 text-sm',
        lg: 'h-10 rounded-md px-4 text-base',
        'icon-sm': 'size-6 rounded-sm text-xs [&>svg]:size-4',
        icon: 'size-8 rounded-md text-sm [&>svg]:size-5',
        'icon-lg': 'size-10 rounded-md text-base [&>svg]:size-6',
      },
    },
    // compoundVariants: [
    //   {
    //     variant: 'icon',
    //     size: 'sm',
    //     className: 'w-6 [&_svg]:size-3',
    //   },
    //   {
    //     variant: 'icon',
    //     size: 'default',
    //     className: 'w-8 [&_svg]:size-4',
    //   },
    //   {
    //     variant: 'icon',
    //     size: 'lg',
    //     className: 'w-10 [&_svg]:size-5',
    //   },
    // ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root data-slot='toggle' className={cn(toggleVariants({ variant, size, className }))} {...props} />
  )
}

export { Toggle, toggleVariants }

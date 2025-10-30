'use client'

import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/utils/cn'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium focus-ring hover:bg-fg/5 hover:text-ac disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-ac/10 data-[state=on]:text-ac [&_svg]:pointer-events-none [&_svg]:shrink-0 gap-1',
  {
    variants: {
      variant: {
        default: 'border border-transparent',
        outline: 'border hover:bg-fg/5 hover:text-ac data-[state=on]:border-ac shadow-xs',
        // icon: 'border border-transparent',
      },
      // Should match Button
      size: {
        sm: 'text-xs rounded-sm h-6 px-2',
        default: 'text-sm rounded-md h-8 px-3',
        lg: 'text-base rounded-md h-10 px-4',
        'icon-sm': 'text-xs rounded-sm size-6 [&>svg]:size-4',
        icon: 'text-sm rounded-md size-8 [&>svg]:size-5',
        'icon-lg': 'text-base rounded-md size-10 [&>svg]:size-6',
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

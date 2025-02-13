// https://ui.shadcn.com/docs/components/popover

'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/utils/cn'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverPortal = PopoverPrimitive.Portal

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPortal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={5}
      className={cn(
        'floating z-50 w-fit rounded-md p-3 text-base text-fg outline-hidden',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        '[&>hr]:-mx-3 [&>hr]:my-2',
        // pointer-events-auto is necessary to make the popover content clickable due to a Radix UI bug.
        // See: https://github.com/radix-ui/primitives/issues/3142
        'pointer-events-auto',
        className
      )}
      {...props}
    >
      {children}
      {/* <PopoverPrimitive.Close /> */}
      {/* does not work with translucent background */}
      {/* <PopoverPrimitive.Arrow className='fill-bg' /> */}
    </PopoverPrimitive.Content>
  </PopoverPortal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }

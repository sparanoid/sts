'use client'

import type * as PopoverPrimitive from '@radix-ui/react-popover'
import type * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { useState } from 'react'

import { cn } from '@/utils/cn'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip } from '@/components/ui/tooltip'

interface TooltipOrPopoverProps {
  children: React.ReactNode
  label: React.ReactNode
  /** className for trigger element */
  triggerClassName?: string
  /** className for content element */
  contentClassName?: string
  /** force use specific component */
  forceComponent?: 'tooltip' | 'popover'
  /** Additional props passed to Tooltip/Popover components */
  componentProps?: {
    tooltip?: {
      trigger?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
      content?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
    }
    popover?: {
      trigger?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
      content?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
    }
  }
}

// Helper function to detect touch device once
const getIsTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches
}

function TooltipOrPopover({
  children,
  label,
  triggerClassName,
  contentClassName,
  forceComponent,
  componentProps,
}: React.ComponentProps<'button'> & TooltipOrPopoverProps) {
  const [isTouchDevice] = useState(getIsTouchDevice)

  // Determine which component to use based on device type or force prop
  const usePopover = forceComponent === 'popover' || (!forceComponent && isTouchDevice)

  if (usePopover) {
    return (
      <Popover>
        <PopoverTrigger
          data-slot='tooltip-or-popover-trigger'
          // Make it behave like a tooltip component
          className={cn('flex items-center', triggerClassName)}
          {...componentProps?.popover?.trigger}
        >
          {children}
        </PopoverTrigger>
        <PopoverContent
          data-slot='tooltip-or-popover-content'
          className={cn('max-w-[400px] py-1.5', contentClassName)}
          side='top'
          {...componentProps?.popover?.content}
        >
          {label}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip
      data-slot='tooltip-or-popover'
      label={label}
      triggerOptions={{
        className: triggerClassName,
        ...componentProps?.tooltip?.trigger,
      }}
      contentOptions={{
        className: contentClassName,
        ...componentProps?.tooltip?.content,
      }}
    >
      {children}
    </Tooltip>
  )
}

export { TooltipOrPopover }
export type { TooltipOrPopoverProps }

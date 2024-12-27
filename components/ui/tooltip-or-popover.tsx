'use client'

import { useEffect, useState, forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils/cn'
import { Tooltip } from '@/components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

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

const TooltipOrPopover = forwardRef<HTMLButtonElement, TooltipOrPopoverProps>(
  ({ children, label, triggerClassName, contentClassName, forceComponent, componentProps }, ref) => {
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
      // Check if device supports touch events
      const mediaQuery = window.matchMedia('(hover: none) and (pointer: coarse)')
      setIsTouchDevice(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setIsTouchDevice(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)

      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }, [])

    // Determine which component to use based on device type or force prop
    const usePopover = forceComponent === 'popover' || (!forceComponent && isTouchDevice)

    if (usePopover) {
      return (
        <Popover>
          <PopoverTrigger
            ref={ref}
            // Make it behave like a tooltip component
            className={cn('flex items-center', triggerClassName)}
            {...componentProps?.popover?.trigger}
          >
            {children}
          </PopoverTrigger>
          <PopoverContent
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
        ref={ref}
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
)

TooltipOrPopover.displayName = 'TooltipOrPopover'

export { TooltipOrPopover }
export type { TooltipOrPopoverProps }

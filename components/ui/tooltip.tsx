'use client'

import { forwardRef } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils/cn'

const TooltipProvider = TooltipPrimitive.Provider

interface TooltipProps {
  children: React.ReactNode
  label: React.ReactNode
  triggerOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
  contentOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
}

const Tooltip = forwardRef<HTMLButtonElement, TooltipProps>(
  ({ children, label, triggerOptions, contentOptions }, ref) => {
    const { className: triggerClassName, ...triggerOps } = triggerOptions || {}
    const { className: contentClassName, ...contentOps } = contentOptions || {}

    return (
      <TooltipPrimitive.Root disableHoverableContent>
        <TooltipPrimitive.Trigger
          ref={ref}
          // asChild by default
          asChild
          className={cn('flex items-center', triggerClassName)}
          {...triggerOps}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            hideWhenDetached
            collisionPadding={5}
            sideOffset={4}
            className={cn(
              'floating z-50 max-w-[400px] overflow-hidden rounded-md border px-3 py-1.5 text-base font-normal text-fg',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              contentClassName
            )}
            {...contentOps}
          >
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip, TooltipProvider }

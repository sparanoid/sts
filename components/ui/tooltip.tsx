'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils/cn'

const TooltipProvider = TooltipPrimitive.Provider

interface TooltipProps {
  children: React.ReactNode
  label: React.ReactNode
  triggerOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
  contentOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
}

function Tooltip({ children, label, triggerOptions, contentOptions }: TooltipProps) {
  const { className: triggerClassName, ...triggerOps } = triggerOptions || {}
  const { className: contentClassName, ...contentOps } = contentOptions || {}

  return (
    <TooltipPrimitive.Root disableHoverableContent>
      <TooltipPrimitive.Trigger
        data-slot='tooltip-trigger'
        // asChild by default
        asChild
        className={cn('focus-ring flex items-center', triggerClassName)}
        {...triggerOps}
      >
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          hideWhenDetached
          collisionPadding={5}
          sideOffset={4}
          data-slot='tooltip-content'
          className={cn(
            'floating text-fg z-50 max-w-[400px] overflow-hidden rounded-md border px-3 py-1.5 text-base font-normal',
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

export { Tooltip, TooltipProvider }

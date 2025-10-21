'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/utils/cn'

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delayDuration={delayDuration} {...props} />
}

// The usage of the shadcn original Tooltip is too crumbsome
// I remove its original Tooltip to TooltipRoot
// Use the Tooltip wrapper below
function TooltipRoot({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        hideWhenDetached
        collisionPadding={5}
        sideOffset={sideOffset}
        data-slot='tooltip-content'
        className={cn(
          'floating text-fg w-fit max-w-[400px] rounded-md border px-3 py-1.5 text-sm',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'origin-(--radix-tooltip-content-transform-origin)',
          className
        )}
        {...props}
      >
        {children}
        {/* We're using background blur which does not work for the arrow */}
        {/* <TooltipPrimitive.Arrow
          className={cn('bg-bg fill-bg z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]')}
        /> */}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

interface TooltipProps {
  children: React.ReactNode
  label: React.ReactNode
  triggerOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
  contentOptions?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
}

/**
 * A simpler version of the original shadcn Tooltip
 */
function Tooltip({ children, label, triggerOptions, contentOptions }: TooltipProps) {
  const { className: triggerClassName, ...triggerOps } = triggerOptions || {}
  const { className: contentClassName, ...contentOps } = contentOptions || {}

  return (
    <TooltipPrimitive.Root data-slot='tooltip' disableHoverableContent>
      <TooltipTrigger
        // asChild by default
        asChild
        className={cn('focus-ring flex items-center', triggerClassName)}
        {...triggerOps}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className={cn(contentClassName)} {...contentOps}>
        {label}
      </TooltipContent>
    </TooltipPrimitive.Root>
  )
}

export { TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider, Tooltip }

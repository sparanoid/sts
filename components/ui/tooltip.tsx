import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip'

import { cn } from '@/utils/cn'

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delay={delay} {...props} />
}

function TooltipRoot({ disableHoverablePopup = true, ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot='tooltip-root' disableHoverablePopup={disableHoverablePopup} {...props} />
}

function Tooltip({ disableHoverablePopup = true, ...props }: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipRoot data-slot='tooltip' disableHoverablePopup={disableHoverablePopup} {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}

function TooltipPositioner({ className, ...props }: TooltipPrimitive.Positioner.Props) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot='tooltip-positioner'
        sideOffset={8}
        className={cn('z-50', className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}

function TooltipContent({ className, children, ...props }: TooltipPrimitive.Popup.Props) {
  return (
    <TooltipPrimitive.Popup
      data-slot='tooltip-content'
      className={cn(
        'floating w-fit max-w-[min(400px,var(--available-width))] rounded-md border px-3 py-1.5 text-fg text-sm',

        // Variable config
        'max-h-(--available-height) origin-(--transform-origin)',

        // Animations
        'fade-in-0 zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:animate-out data-instant:animate-none data-instant:transition-none',

        className
      )}
      {...props}
    >
      {children}
    </TooltipPrimitive.Popup>
  )
}

export { Tooltip, TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider, TooltipPositioner }

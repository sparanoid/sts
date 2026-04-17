import { Tooltip as TooltipPrimitive } from '@base-ui-components/react/tooltip'

import { cn } from '@/utils/cn'

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delay={delay} {...props} />
}

function TooltipRoot<Payload>({ disableHoverablePopup = true, ...props }: TooltipPrimitive.Root.Props<Payload>) {
  return <TooltipPrimitive.Root data-slot='tooltip-root' disableHoverablePopup={disableHoverablePopup} {...props} />
}

function Tooltip<Payload>({ disableHoverablePopup = true, ...props }: TooltipPrimitive.Root.Props<Payload>) {
  return (
    <TooltipProvider>
      <TooltipRoot data-slot='tooltip' disableHoverablePopup={disableHoverablePopup} {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger<Payload>(props: TooltipPrimitive.Trigger.Props<Payload>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}

function TooltipPositioner({ className, ...props }: TooltipPrimitive.Positioner.Props) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot='tooltip-positioner'
        sideOffset={8}
        // `w-(--positioner-width)`/`h-(--positioner-height)` are required by Base UI when sharing
        // one Root across multiple (detached) Triggers. The auto-resize logic anchors the Popup
        // with `position: absolute; bottom: 0; left: 0` and writes the measured popup size into
        // these CSS vars on the Positioner. Without them the Positioner is 0×0, which shifts the
        // Popup off-center and shrinks `--available-width`. For single-trigger usages the vars
        // stay unset and the declarations fall back to `auto` (no behavioral change).
        // See https://github.com/mui/base-ui/issues/3681#issuecomment-2575014069
        className={cn('z-50 w-(--positioner-width) h-(--positioner-height)', className)}
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

export { Tooltip, TooltipContent, TooltipPositioner, TooltipPrimitive, TooltipProvider, TooltipRoot, TooltipTrigger }

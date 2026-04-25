import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'

import { cn } from '@/utils/cn'

function TooltipProvider({ delay = 0, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot='tooltip-provider' delay={delay} {...props} />
}

function TooltipRoot<Payload>({ disableHoverablePopup = true, ...props }: TooltipPrimitive.Root.Props<Payload>) {
  return <TooltipPrimitive.Root data-slot='tooltip-root' disableHoverablePopup={disableHoverablePopup} {...props} />
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
        className={cn('z-50 h-(--positioner-height) w-(--positioner-width)', className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
}

function TooltipContent({
  className,
  side = 'top',
  sideOffset = 8,
  align = 'center',
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        data-slot='tooltip-positioner'
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        // `w-(--positioner-width)`/`h-(--positioner-height)` are required by Base UI when sharing
        // one Root across multiple (detached) Triggers. The auto-resize logic anchors the Popup
        // with `position: absolute; bottom: 0; left: 0` and writes the measured popup size into
        // these CSS vars on the Positioner. Without them the Positioner is 0×0, which shifts the
        // Popup off-center and shrinks `--available-width`. For single-trigger usages the vars
        // stay unset and the declarations fall back to `auto` (no behavioral change).
        // See https://github.com/mui/base-ui/issues/3681#issuecomment-2575014069
        className='isolate z-50 h-(--positioner-height) w-(--positioner-width)'
      >
        <TooltipPrimitive.Popup
          data-slot='tooltip-content'
          className={cn(
            'floating z-50 inline-flex w-fit max-w-[min(400px,var(--available-width))] items-center gap-1.5 break-all rounded-md px-3 py-1.5 text-fg text-sm',

            // Variable config
            'origin-(--transform-origin)',

            // Keyboard shortcut
            'has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm',

            // Animations
            'data-closed:fade-out-0 data-closed:zoom-out-95 data-closed:animate-out',
            className
          )}
          {...props}
        >
          {children}
          {/* <TooltipPrimitive.Arrow className='floating z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-start]:top-1/2! data-[side=left]:top-1/2! data-[side=right]:top-1/2! data-[side=inline-start]:-right-1 data-[side=left]:-right-1 data-[side=top]:-bottom-2.5 data-[side=inline-end]:-left-1 data-[side=right]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:-translate-y-1/2 data-[side=right]:-translate-y-1/2' /> */}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { TooltipContent, TooltipPositioner, TooltipPrimitive, TooltipProvider, TooltipRoot, TooltipTrigger }

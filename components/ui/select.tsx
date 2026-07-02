'use client'

import { IconCheck, IconChevronCompactDown, IconChevronCompactUp, IconChevronDown } from '@tabler/icons-react'
import type { VariantProps } from 'class-variance-authority'
import { Select as SelectPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/cn'

import { buttonVariants } from '@/components/ui/button'

// Bridge open-state between our Select wrapper and our SelectTrigger so we can
// work around a Radix bug where a synthetic click forwarded from <label htmlFor>
// fails to open the select once an internal `pointerTypeRef` has been latched
// to "mouse" by a prior real click on the trigger. See SelectTrigger below.
const SelectOpenContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
} | null>(null)

function Select({
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const [openState, setOpenState] = React.useState(defaultOpen ?? false)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : openState
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setOpenState(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )
  const ctx = React.useMemo(() => ({ open, setOpen }), [open, setOpen])
  return (
    <SelectOpenContext.Provider value={ctx}>
      <SelectPrimitive.Root data-slot='select' open={open} onOpenChange={setOpen} {...props} />
    </SelectOpenContext.Provider>
  )
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

function SelectBlankTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger data-slot='select-trigger' className={className} {...props}>
      {children}
    </SelectPrimitive.Trigger>
  )
}

function SelectTrigger({
  className,
  size = 'default',
  variant = 'outline',
  withoutIcon = false,
  icon,
  children,
  onClick,
  onPointerDown,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
  variant?: VariantProps<typeof buttonVariants>['variant']
  withoutIcon?: boolean
  icon?: React.ReactNode
}) {
  const openCtx = React.useContext(SelectOpenContext)
  // Tracks the timestamp of the last pointerdown on the trigger. We use a
  // timestamp (not a boolean) because Radix's own pointerdown handler calls
  // `event.preventDefault()`, which suppresses the follow-up click event on
  // real mouse clicks — meaning a boolean flag would never be reset and would
  // poison the next genuine label-forwarded click.
  const lastPointerDownAtRef = React.useRef(0)
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      data-size={size}
      onPointerDown={event => {
        lastPointerDownAtRef.current = event.timeStamp
        onPointerDown?.(event)
      }}
      onClick={event => {
        // A click is "from label" when no pointerdown on the trigger
        // immediately preceded it. Real user clicks always pair pointerdown
        // and click within a single event-loop tick, so any meaningful gap
        // (or no recorded pointerdown at all) means the click was
        // synthesized — typically via <label htmlFor>.
        const fromLabel = event.timeStamp - lastPointerDownAtRef.current > 50
        onClick?.(event)
        if (event.defaultPrevented) return
        // Radix-select bug: when a <label htmlFor> forwards a click to the
        // trigger, no `pointerdown` fires on the trigger so Radix's internal
        // `pointerTypeRef` stays at its last value ("mouse" after a prior
        // real mouse click). Its onClick handler then short-circuits and does
        // not call `handleOpen`, leaving the select closed. Toggle open
        // ourselves through our shared open-state context.
        if (fromLabel && openCtx) {
          openCtx.setOpen(!openCtx.open)
        }
      }}
      className={cn(
        // Refer to Button.tsx for the button styles
        // 'flex w-full items-center justify-between gap-x-1 rounded-lg border bg-transparent px-2.5 py-2 text-start text-sm font-medium whitespace-nowrap shadow-xs',
        // 'focus-ring',
        // 'placeholder:text-fg/60 data-placeholder:text-fg/60',
        // 'aria-invalid:ring-rose-500/30 aria-invalid:border-rose-500',
        // 'disabled:cursor-not-allowed disabled:opacity-50',
        // 'data-[size=default]:h-8 data-[size=sm]:h-6',
        // "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        buttonVariants({
          variant,
          size,
        }),

        'w-full justify-between',
        'placeholder:text-fg/60 data-placeholder:text-fg/60',
        'aria-invalid:border-rose-500 aria-invalid:ring-rose-500/30',

        '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2',
        className
      )}
      {...props}
    >
      {children}
      {!withoutIcon && (
        <SelectPrimitive.Icon asChild>{icon ? icon : <IconChevronDown className='size-4' />}</SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot='select-content'
        className={cn(
          'floating relative max-h-(--radix-select-content-available-height) min-w-32 overflow-hidden rounded-lg text-base text-fg',
          'data-closed:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-closed:animate-out',
          'origin-(--radix-select-content-transform-origin)',
          position === 'popper' &&
            'data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        collisionPadding={position === 'popper' ? 9 : 5}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'py-1',
            '[mask-image:linear-gradient(to_bottom,transparent,black_0.3rem,black_calc(100%-0.3rem),transparent)]',
            position === 'popper' &&
              'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      // Should sync with DropdownMenuLabel
      className={cn('px-3 py-1.5 text-fg/60 text-xs uppercase leading-none', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  plain = false,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  plain?: boolean
}) {
  return (
    <SelectPrimitive.Item
      data-slot='select-item'
      className={cn(
        'relative flex w-full cursor-default select-none items-start gap-1 px-3 py-1.5 pr-8 text-sm outline-hidden focus:bg-ac/10 focus:text-ac',
        'data-disabled:pointer-events-none data-checked:font-medium data-checked:text-ac data-disabled:opacity-50',
        "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-1',
        className
      )}
      {...props}
    >
      {!plain && (
        <span className='absolute top-2 right-2 flex size-4 items-center justify-center'>
          <SelectPrimitive.ItemIndicator>
            <IconCheck className='size-4' />
          </SelectPrimitive.ItemIndicator>
        </span>
      )}

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      // Should sync with DropdownMenuSeparator
      className={cn('-mx-1 h-1 bg-fg/5', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn(
        'absolute top-0 right-0 left-0 z-51 flex h-6 cursor-default items-center justify-center pt-2 pb-4',
        'hover:bg-linear-to-b hover:from-ac/20 hover:text-ac',
        className
      )}
      {...props}
    >
      <IconChevronCompactUp className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn(
        'absolute right-0 bottom-0 left-0 z-51 flex h-6 cursor-default items-center justify-center pt-4 pb-2',
        'hover:bg-linear-to-t hover:from-ac/20 hover:text-ac',
        className
      )}
      {...props}
    >
      <IconChevronCompactDown className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectBlankTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

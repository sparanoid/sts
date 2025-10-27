'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { IconCheck, IconChevronCompactDown, IconChevronCompactUp, IconChevronDown } from '@tabler/icons-react'
import type * as React from 'react'

import { cn } from '@/utils/cn'

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

function SelectTrigger({
  className,
  size = 'default',
  withoutIcon = false,
  icon,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
  withoutIcon?: boolean
  icon?: React.ReactNode
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot='select-trigger'
      data-size={size}
      className={cn(
        // Refer to Button.tsx for the button styles
        'flex w-full items-center justify-between gap-x-1 rounded-md border bg-transparent px-2.5 py-2 text-start text-sm font-medium whitespace-nowrap shadow-xs',
        'focus-ring',
        'placeholder:text-fg/60 data-[placeholder]:text-fg/60',
        'aria-invalid:ring-rose-500/30 aria-invalid:border-rose-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[size=default]:h-8 data-[size=sm]:h-6',
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
          'floating text-fg relative max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-hidden rounded-md text-base',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'origin-(--radix-select-content-transform-origin)',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
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
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
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
      className={cn('text-fg/60 px-3 py-1.5 text-xs leading-none uppercase', className)}
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
        'focus:bg-ac/10 focus:text-ac relative flex w-full cursor-default items-start gap-1 px-3 py-1.5 pr-8 text-sm outline-hidden select-none',
        'data-[state=checked]:text-ac data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=checked]:font-medium',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-1',
        className
      )}
      {...props}
    >
      {!plain && (
        <span className='absolute right-2 top-2 flex size-4 items-center justify-center'>
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
      className={cn('bg-fg/5 -mx-1 h-1', className)}
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
        'hover:from-ac/20 hover:text-ac hover:bg-linear-to-b',
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
        'hover:from-ac/20 hover:text-ac hover:bg-linear-to-t',
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

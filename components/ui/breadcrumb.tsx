import { Slot } from '@radix-ui/react-slot'
import { IconChevronRight, IconDots } from '@tabler/icons-react'
import Link from 'next/link'
import type * as React from 'react'

import { cn } from '@/utils/cn'

function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot='breadcrumb-list'
      className={cn('flex flex-wrap items-center gap-1.5 break-words text-fg/60 text-sm sm:gap-2.5', className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='breadcrumb-item' className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : Link

  return <Comp data-slot='breadcrumb-link' className={cn('hover:text-fg', className)} {...props} />
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: expected component
    // biome-ignore lint/a11y/useSemanticElements: expected role link
    <span
      data-slot='breadcrumb-page'
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('font-normal text-fg', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='breadcrumb-separator'
      role='presentation'
      aria-hidden='true'
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <IconChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <IconDots className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

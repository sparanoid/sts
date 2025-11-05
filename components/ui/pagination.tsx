'use client'

import { IconChevronLeft, IconChevronRight, IconDots } from '@tabler/icons-react'
import Link from 'next/link'
import { type ComponentProps, Fragment } from 'react'

import { cn } from '@/utils/cn'

import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectBlankTrigger, SelectContent, SelectItem } from '@/components/ui/select'

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return <nav aria-label='pagination' data-slot='pagination' className={cn('flex', className)} {...props} />
}

function PaginationContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='pagination-content' className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

function PaginationItem({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot='pagination-item' className={cn('text-sm', className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  disabled?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<typeof Link>

function PaginationLink({ className, isActive, size = 'icon', disabled, ...props }: PaginationLinkProps) {
  return (
    <Link
      data-slot='pagination-link'
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    />
  )
}

type PaginationButtonProps = {
  isActive?: boolean
} & ComponentProps<typeof Button>

function PaginationButton({ className, isActive, disabled, ...props }: PaginationButtonProps) {
  return (
    <Button
      data-slot='pagination-link'
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      variant={isActive ? 'outline' : 'ghost'}
      className={cn(disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    />
  )
}

function PaginationPreviousLink({
  className,
  disabled,
  ...props
}: ComponentProps<typeof PaginationLink> & {
  disabled?: boolean
}) {
  return (
    <PaginationLink
      data-slot='pagination-previous'
      aria-label='Previous Page'
      className={cn('flex items-center gap-1 px-1.5 py-1', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <IconChevronLeft className='size-4' />
    </PaginationLink>
  )
}

function PaginationPreviousButton({
  className,
  disabled,
  ...props
}: ComponentProps<typeof PaginationButton> & {
  disabled?: boolean
}) {
  return (
    <PaginationButton
      data-slot='pagination-previous'
      aria-label='Previous Page'
      className={cn('flex items-center gap-1 px-1.5 py-1', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <IconChevronLeft className='size-4' />
    </PaginationButton>
  )
}

function PaginationNextLink({
  className,
  disabled,
  ...props
}: ComponentProps<typeof PaginationLink> & {
  disabled?: boolean
}) {
  return (
    <PaginationLink
      data-slot='pagination-next'
      aria-label='Next Page'
      className={cn('flex items-center gap-1 px-1.5 py-1', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <IconChevronRight className='size-4' />
    </PaginationLink>
  )
}

function PaginationNextButton({
  className,
  disabled,
  ...props
}: ComponentProps<typeof PaginationButton> & {
  disabled?: boolean
}) {
  return (
    <PaginationButton
      data-slot='pagination-next'
      aria-label='Next Page'
      className={cn('flex items-center gap-1 px-1.5 py-1', disabled && 'pointer-events-none opacity-50', className)}
      {...props}
    >
      <IconChevronRight className='size-4' />
    </PaginationButton>
  )
}

type PaginationEllipsisProps = {
  pages?: number[]
  onPageChange?: (page: number) => void
  disabled?: boolean
} & ComponentProps<'span'>

function PaginationEllipsis({ className, pages, onPageChange, disabled, ...props }: PaginationEllipsisProps) {
  // If no hidden pages, just show the dots
  if (!pages || pages.length === 0) {
    return (
      <span
        data-slot='pagination-ellipsis'
        aria-hidden
        className={cn('flex items-center justify-center px-2 py-1', className)}
        {...props}
      >
        <IconDots className='size-4 opacity-30' />
        <span className='sr-only'>More Pages</span>
      </span>
    )
  }

  // When there are hidden pages, show a select
  return (
    <Select
      onValueChange={value => {
        if (onPageChange) {
          onPageChange(parseInt(value, 10))
        }
      }}
      disabled={disabled}
    >
      <SelectBlankTrigger className={'border-none shadow-none'} asChild>
        <Button variant='ghost' size='icon'>
          <IconDots />
        </Button>
      </SelectBlankTrigger>
      <SelectContent position='popper'>
        {pages.map(page => (
          <SelectItem key={page} value={String(page)}>
            {page}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface ButtonPaginationSingletonProps extends ComponentProps<'nav'> {
  value: number
  onPageChange: (page: number) => void
  total: number
  disabled?: boolean
  siblings?: number
}

function ButtonPaginationSingleton({
  className,
  value,
  onPageChange,
  total,
  disabled = false,
  siblings = 3,
  ...props
}: ButtonPaginationSingletonProps) {
  // Generate all page numbers
  const allPages = Array.from({ length: total }, (_, k) => k + 1)

  // Determine which pages to show
  const visiblePages = allPages.filter(
    page => page === 1 || page === total || (page >= value - siblings && page <= value + siblings)
  )

  // Render the pagination
  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousButton onClick={() => onPageChange(value - 1)} disabled={disabled || value === 1} />
        </PaginationItem>

        {visiblePages.map((page, index, arr) => {
          // Check if there's a gap that needs an ellipsis
          if (index > 0) {
            const prevPage = arr[index - 1]
            if (prevPage !== undefined && page !== prevPage + 1) {
              // Get the list of hidden pages in this gap
              const hiddenPages = allPages.filter(p => p > prevPage && p < page)

              return (
                <Fragment key={`ellipsis-${index}-${page}`}>
                  <PaginationItem>
                    <PaginationEllipsis pages={hiddenPages} onPageChange={onPageChange} disabled={disabled} />
                  </PaginationItem>
                  <PaginationItem key={`page-${page}`}>
                    <PaginationButton
                      isActive={page === value}
                      onClick={() => onPageChange(page)}
                      // className={cn('px-2 py-1', {
                      //   'bg-ac/60! text-bg': page === value,
                      // })}
                      disabled={disabled}
                    >
                      {page}
                    </PaginationButton>
                  </PaginationItem>
                </Fragment>
              )
            }
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationButton isActive={page === value} onClick={() => onPageChange(page)} disabled={disabled}>
                {page}
              </PaginationButton>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNextButton onClick={() => onPageChange(value + 1)} disabled={disabled || value === total} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

interface LinkPaginationSingletonProps extends ComponentProps<'nav'> {
  value: number
  basePath: string
  total: number
  pageParam?: string
  disabled?: boolean
  siblings?: number
}

function LinkPaginationSingleton({
  className,
  value,
  basePath,
  pageParam = 'page',
  total,
  disabled = false,
  siblings = 3,
  ...props
}: LinkPaginationSingletonProps) {
  // Generate all page numbers
  const allPages = Array.from({ length: total }, (_, k) => k + 1)

  // Determine which pages to show
  const visiblePages = allPages.filter(
    page => page === 1 || page === total || (page >= value - siblings && page <= value + siblings)
  )

  // Render the pagination
  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousLink href={`${basePath}?${pageParam}=${value - 1}`} disabled={disabled || value === 1} />
        </PaginationItem>

        {visiblePages.map((page, index, arr) => {
          // Check if there's a gap that needs an ellipsis
          if (index > 0) {
            const prevPage = arr[index - 1]
            if (prevPage !== undefined && page !== prevPage + 1) {
              // Get the list of hidden pages in this gap
              const hiddenPages = allPages.filter(p => p > prevPage && p < page)

              return (
                <Fragment key={`ellipsis-${index}-${page}`}>
                  <PaginationItem>
                    <PaginationEllipsis pages={hiddenPages} disabled={disabled} />
                  </PaginationItem>
                  <PaginationItem key={`${pageParam}-${page}`}>
                    <PaginationLink
                      isActive={page === value}
                      href={`${basePath}?${pageParam}=${page}`}
                      className={cn('px-2 py-1', {
                        'bg-ac/60 text-bg': page === value,
                      })}
                      disabled={disabled}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </Fragment>
              )
            }
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink isActive={page === value} href={`${basePath}?${pageParam}=${page}`} disabled={disabled}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNextLink href={`${basePath}?${pageParam}=${value + 1}`} disabled={disabled || value === total} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  ButtonPaginationSingleton,
  LinkPaginationSingleton,
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationButton,
  PaginationItem,
  PaginationPreviousLink,
  PaginationNextLink,
  PaginationPreviousButton,
  PaginationNextButton,
  PaginationEllipsis,
}

'use client'

import { useState } from 'react'

import { useRelativeTime } from '@/hooks/useRelativeTime'

import { FormattedTimestampDisplay } from '@/components/timestamp-display'
import { TooltipContent, TooltipRoot, TooltipTrigger } from '@/components/ui/tooltip'

interface TimestampTooltipProps {
  timestamp: number
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

/**
 * A tooltip component that shows relative time and formatted timestamp.
 * This component isolates re-renders to prevent parent component from re-rendering
 * when the relative time updates.
 */
export function TimestampTooltip({ timestamp, children, side, className }: TimestampTooltipProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

  const relativeTime = useRelativeTime(timestamp, {
    enabled: isTooltipOpen,
  })

  return (
    <TooltipRoot onOpenChange={setIsTooltipOpen} disableHoverableContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className}>
        <div className='space-y-1'>
          <div className='text-fg/60 tabular-nums'>{relativeTime}</div>
          <FormattedTimestampDisplay timestamp={timestamp} />
        </div>
      </TooltipContent>
    </TooltipRoot>
  )
}

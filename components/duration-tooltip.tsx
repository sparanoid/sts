'use client'

import { formatDurationPrecise } from '@/utils/formatDuration'

import { FormattedTimestampDisplay } from '@/components/timestamp-display'
import { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger } from '@/components/ui/tooltip'

interface DurationTooltipProps {
  startTime: number
  endTime: number
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

/**
 * A tooltip component that shows the start and end timestamps for a duration.
 */
export function DurationTooltip({ startTime, endTime, children, side }: DurationTooltipProps) {
  const preciseDuration = formatDurationPrecise(startTime, endTime)

  return (
    <TooltipRoot>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipPositioner side={side}>
        <TooltipContent>
          <div className='space-y-3'>
            <div className='space-y-1'>
              <div className='text-xs font-medium text-fg/60 uppercase tracking-wide'>Duration</div>
              <div>{preciseDuration}</div>
            </div>
            <div className='space-y-1'>
              <div className='text-xs font-medium text-fg/60 uppercase tracking-wide'>Started</div>
              <FormattedTimestampDisplay timestamp={startTime} />
            </div>
            <div className='space-y-1'>
              <div className='text-xs font-medium text-fg/60 uppercase tracking-wide'>Resolved</div>
              <FormattedTimestampDisplay timestamp={endTime} />
            </div>
          </div>
        </TooltipContent>
      </TooltipPositioner>
    </TooltipRoot>
  )
}

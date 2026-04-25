'use client'

import { IconCircleCheckFilled, IconCircleXFilled, IconInfoCircle } from '@tabler/icons-react'
import clsx from 'clsx'
import { memo, useState } from 'react'

import type { Status, StatusResult } from '@/types'

import { lazyFloat } from '@/utils/lazyFloat'
import { timeFromNow } from '@/utils/timeFromNow'

import { FormattedTimestampDisplay } from '@/components/timestamp-display'
import { TooltipContent, TooltipPrimitive, TooltipRoot, TooltipTrigger } from '@/components/ui/tooltip'

export const StatusItem = memo(function StatusItem({ data }: { data: Status }) {
  const firstResult = data.results[0]
  const lastResult = data.results[data.results.length - 1]

  // One Tooltip handle shared by every chart bar in this StatusItem.
  // Base UI's recommended pattern for many triggers with per-trigger content:
  // a single Root + Portal + Popup is mounted, and the active trigger's
  // payload drives what gets rendered. This avoids mounting N tooltip
  // state machines / portals when only one tooltip is ever visible.
  const [chartTooltip] = useState(() => TooltipPrimitive.createHandle<StatusResult>())

  return (
    <div className='mx-4 grid gap-1'>
      {/* Title */}
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center gap-1 text-base font-semibold'>
          <span className='line-clamp-1'>{data.name}</span>
          {lastResult.hostname ? (
            <span className='text-fg/50 flex items-center text-sm font-normal'>
              <TooltipRoot>
                <TooltipTrigger className='focus-ring rounded-full'>
                  <IconInfoCircle className='size-4' />
                </TooltipTrigger>
                <TooltipContent>{lastResult.hostname}</TooltipContent>
              </TooltipRoot>
            </span>
          ) : null}
        </h3>
        {data.uptime !== undefined && (
          <div
            className={clsx(
              'text-right text-sm text-nowrap',
              data.uptime > 90
                ? 'text-emerald-700'
                : data.uptime > 75
                  ? 'text-yellow-700'
                  : data.uptime > 50
                    ? 'text-amber-700'
                    : 'text-red-700'
            )}
          >
            {data.uptime?.toFixed(2)}% uptime
          </div>
        )}
      </div>

      {/* Charts: many triggers share one Tooltip via `chartTooltip` handle */}
      <div className='flex gap-px overflow-hidden rounded-sm'>
        {data.results.map(result => (
          <TooltipTrigger
            key={result.timestamp}
            handle={chartTooltip}
            payload={result}
            render={
              <button
                type='button'
                className={clsx(
                  'h-6 w-full',
                  result.success ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
                )}
              />
            }
          />
        ))}
      </div>

      {/* Single Root for all chart bars; content is driven by active trigger's payload */}
      <TooltipRoot handle={chartTooltip}>
        {({ payload: result }) => (
          <TooltipContent>
            {result ? (
              <div className='space-y-1'>
                {result.conditionResults?.length ? (
                  <div>
                    {result.conditionResults.map((condition, idx) => (
                      <div key={idx} className='flex items-center gap-1'>
                        {condition.success ? (
                          <>
                            <IconCircleCheckFilled className='size-4 fill-emerald-600' />
                            <span className='font-mono text-sm text-emerald-600'>{condition.condition}</span>
                          </>
                        ) : (
                          <>
                            <IconCircleXFilled className='size-4 fill-red-600' />
                            <span className='fill-red-600 font-mono text-sm'>{condition.condition}</span>
                          </>
                        )}
                      </div>
                    ))}
                    <hr className='m-1 border-fg/30 -mx-3' />
                  </div>
                ) : null}
                <div className='text-fg/60'>
                  {lazyFloat(result.duration / 1000 / 1000)}ms, {timeFromNow(+new Date(result.timestamp))}
                </div>
                <FormattedTimestampDisplay timestamp={+new Date(result.timestamp)} />
              </div>
            ) : null}
          </TooltipContent>
        )}
      </TooltipRoot>

      {/* Timestamps */}
      <div className='text-fg/80 flex items-center justify-between text-sm'>
        <div>{timeFromNow(+new Date(firstResult.timestamp))}</div>
        <div>{timeFromNow(+new Date(lastResult.timestamp))}</div>
      </div>
    </div>
  )
})

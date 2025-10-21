import { IconCircleCheckFilled, IconCircleXFilled, IconInfoCircle } from '@tabler/icons-react'
import clsx from 'clsx'
import { memo } from 'react'

import type { Status } from '@/types'

import formatDate from '@/utils/formatDate'
import lazyFloat from '@/utils/lazyFloat'
import timeFromNow from '@/utils/timeFromNow'

import { TooltipOrPopover } from '@/components/ui/tooltip-or-popover'

export const StatusItem = memo(function StatusItem({ data }: { data: Status }) {
  const firstResult = data.results[0]
  const lastResult = data.results[data.results.length - 1]

  return (
    <div className='mx-4 grid gap-1'>
      {/* Title */}
      <div className='flex items-center justify-between'>
        <h3 className='flex items-center gap-1 text-base font-semibold'>
          <span className='line-clamp-1'>{data.name}</span>
          {lastResult.hostname ? (
            <span className='text-fg/50 flex items-center text-sm font-normal'>
              <TooltipOrPopover label={lastResult.hostname}>
                <IconInfoCircle className='size-4' />
              </TooltipOrPopover>
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

      {/* Charts */}
      <div className='flex gap-px overflow-hidden rounded-sm'>
        {data.results.map(result => (
          <TooltipOrPopover
            key={result.timestamp}
            triggerClassName='w-full'
            label={
              <div className='grid'>
                {result.conditionResults?.length ? (
                  <div>
                    {result.conditionResults.map((result, idx) => {
                      return (
                        <div key={idx} className='flex items-center gap-1'>
                          {result.success ? (
                            <>
                              <IconCircleCheckFilled className='size-4 fill-emerald-600' />
                              <span className='font-mono text-sm text-emerald-600'>{result.condition}</span>
                            </>
                          ) : (
                            <>
                              <IconCircleXFilled className='size-4 fill-red-600' />
                              <span className='fill-red-600 font-mono text-sm'>{result.condition}</span>
                            </>
                          )}
                        </div>
                      )
                    })}
                    <hr className='m-1 -mx-3' />
                  </div>
                ) : null}
                <div>
                  {lazyFloat(result.duration / 1000 / 1000)}ms, {timeFromNow(+new Date(result.timestamp))}
                </div>
                <div className='text-fg/50 text-sm'>
                  {formatDate(new Date(result.timestamp), {
                    format: {
                      month: '2-digit',
                      day: '2-digit',
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    },
                  })}
                </div>
              </div>
            }
          >
            <span
              className={clsx(
                'h-8 w-full',
                result.success ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
              )}
            />
          </TooltipOrPopover>
        ))}
      </div>

      {/* Timestamps */}
      <div className='text-fg/80 flex items-center justify-between text-sm'>
        <div>{timeFromNow(+new Date(firstResult.timestamp))}</div>
        <div>{timeFromNow(+new Date(lastResult.timestamp))}</div>
      </div>
    </div>
  )
})

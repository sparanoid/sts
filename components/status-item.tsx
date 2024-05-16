import clsx from 'clsx'

import { Status } from '@/types'
import timeFromNow from '@/utils/timeFromNow'
import { IconCircleCheckFilled, IconCircleXFilled, IconInfoCircle } from '@tabler/icons-react'

// import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip-radix'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import lazyFloat from '@/utils/lazyFloat'
import formatDate from '@/utils/formatDate'

export function StatusItem({ data }: { data: Status }) {
  const firstResult = data.results[0]
  const lastResult = data.results[data.results.length - 1]

  return (
    <div className='grid gap-1 mx-4'>
      {/* Title */}
      <div className='flex justify-between items-center'>
        <h3 className='m-0 text-base font-semibold flex items-center gap-1'>
          <span className='line-clamp-1 '>{data.name}</span>
          {lastResult.hostname ? (
            <span className='flex items-center text-sm font-normal text-text/50'>
              <Tooltip>
                <TooltipTrigger>
                  <IconInfoCircle className='size-4' />
                </TooltipTrigger>
                <TooltipContent>{lastResult.hostname}</TooltipContent>
              </Tooltip>
            </span>
          ) : null}
        </h3>
        {data.uptime !== undefined && (
          <div
            className={clsx(
              'text-sm text-right text-nowrap',
              data.uptime > 90
                ? 'text-emerald-800'
                : data.uptime > 75
                  ? 'text-yellow-800'
                  : data.uptime > 50
                    ? 'text-amber-700'
                    : 'text-red-800'
            )}
          >
            {data.uptime?.toFixed(2)}% uptime
          </div>
        )}
      </div>

      {/* Charts */}
      <div className='flex gap-[1px] rounded overflow-hidden'>
        {data.results.map(result => (
          <Tooltip key={result.timestamp}>
            <TooltipTrigger
              className={clsx(
                'w-full h-8',
                result.success
                  ? 'bg-emerald-700 hover:bg-emerald-500'
                  : 'bg-red-700 hover:bg-red-500'
              )}
            >
              <span />
            </TooltipTrigger>
            <TooltipContent className='grid'>
              {result.conditionResults?.length ? (
                <div>
                  {result.conditionResults.map((result, idx) => {
                    return (
                      <div key={idx} className='flex items-center gap-1'>
                        {result.success ? (
                          <>
                            <IconCircleCheckFilled className='size-4 fill-emerald-700' />
                            <span className='font-mono text-sm text-emerald-700'>
                              {result.condition}
                            </span>
                          </>
                        ) : (
                          <>
                            <IconCircleXFilled className='size-4 fill-red-700' />
                            <span className='font-mono text-sm fill-red-700'>
                              {result.condition}
                            </span>
                          </>
                        )}
                      </div>
                    )
                  })}
                  <hr className='-mx-3 m-1' />
                </div>
              ) : null}
              <div>
                {lazyFloat(result.duration / 1000 / 1000)}ms,{' '}
                {timeFromNow(+new Date(result.timestamp))}
              </div>
              <div className='text-text/50 text-sm'>
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
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Timestamps */}
      <div className='flex justify-between items-center text-sm text-text/80'>
        <div>{timeFromNow(+new Date(firstResult.timestamp))}</div>
        <div>{timeFromNow(+new Date(lastResult.timestamp))}</div>
      </div>
    </div>
  )
}

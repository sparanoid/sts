import clsx from 'clsx'

import { Status } from '@/types'
import timeFromNow from '@/utils/timeFromNow'
import { IconCircleCheckFilled, IconCircleXFilled, IconInfoCircle } from '@tabler/icons-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import lazyFloat from '@/utils/lazyFloat'

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
                ? 'text-emerald-700'
                : data.uptime > 75
                  ? 'text-yellow-700'
                  : data.uptime > 50
                    ? 'text-amber-600'
                    : 'text-red-700'
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
              className={clsx('w-full h-8', result.success ? 'bg-emerald-700' : 'bg-red-700')}
            />
            <TooltipContent className='grid'>
              {result.conditionResults?.length ? (
                <div>
                  {result.conditionResults.map((result, idx) => {
                    return (
                      <div key={idx} className='flex items-center gap-1'>
                        <code>{result.condition}</code>
                        <span>
                          {result.success ? (
                            <IconCircleCheckFilled className='size-4 fill-emerald-700' />
                          ) : (
                            <IconCircleXFilled className='size-4 fill-red-700' />
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : null}
              <div>
                {lazyFloat(result.duration / 1000 / 1000)}ms,{' '}
                {timeFromNow(+new Date(result.timestamp))}
              </div>
              <div className='text-text/50 text-sm'>{result.timestamp}</div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Timestamps */}
      <div className='flex justify-between items-center text-sm text-text/50'>
        <div>{timeFromNow(+new Date(firstResult.timestamp))}</div>
        <div>{timeFromNow(+new Date(lastResult.timestamp))}</div>
      </div>
    </div>
  )
}

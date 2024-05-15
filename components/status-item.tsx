import clsx from 'clsx'

import { Status } from '@/types'
import timeFromNow from '@/utils/timeFromNow'

export function StatusItem({ data }: { data: Status }) {
  return (
    <div className='grid gap-1 mx-4'>
      {/* Title */}
      <div className='flex justify-between items-center'>
        <h3 className='m-0 text-base font-semibold'>{data.name}</h3>
        {data.uptime !== undefined && (
          <div
            className={clsx(
              'text-sm',
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
          <div
            key={result.timestamp}
            className={clsx('w-full h-8', result.success ? 'bg-emerald-700' : 'bg-red-700')}
          />
        ))}
      </div>

      {/* Timestamps */}
      <div className='flex justify-between items-center text-sm text-text/50'>
        <div>{timeFromNow(+new Date(data.results[0].timestamp))}</div>
        <div>{timeFromNow(+new Date(data.results[data.results.length - 1].timestamp))}</div>
      </div>
    </div>
  )
}

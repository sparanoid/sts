import { useMemo } from 'react'

import { formatDate } from '@/utils/formatDate'
import { getLocalTimezoneAbbr } from '@/utils/getTimezoneAbbr'

interface FormattedTimestampDisplayProps {
  timestamp: number
}

/**
 * Displays a formatted timestamp with date and time split into two columns.
 * When timezone is different from UTC, also shows UTC time as a second row.
 */
export function FormattedTimestampDisplay({ timestamp }: FormattedTimestampDisplayProps) {
  const date = useMemo(() => new Date(timestamp), [timestamp])
  const tzAbbr = useMemo(() => getLocalTimezoneAbbr(date), [date])
  const isUTC = useMemo(() => date.getTimezoneOffset() === 0, [date])

  return (
    <div className='space-y-1'>
      {/* Local time */}
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-1'>
          <div className='bg-fg/10 text-fg/60 text-xs font-mono rounded px-1 w-12 text-center'>{tzAbbr}</div>
          {formatDate(date, {
            format: {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            },
          })}
        </div>
        <div className='font-mono'>
          {formatDate(date, {
            format: {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            },
          })}
        </div>
      </div>

      {/* UTC time - only show if timezone is different from UTC */}
      {!isUTC && (
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-1'>
            <div className='bg-fg/10 text-fg/60 text-xs font-mono rounded px-1 w-12 text-center'>UTC</div>
            {formatDate(date, {
              localTime: false,
              format: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'short',
              },
            })}
          </div>
          <div className='font-mono'>
            {formatDate(date, {
              localTime: false,
              format: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              },
            })}
          </div>
        </div>
      )}
    </div>
  )
}

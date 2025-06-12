'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { IconRefresh } from '@tabler/icons-react'
import type { Status, UptimeState } from '@/types'
import useStatuses from '@/utils/useStatuses'
import { useViewportSize } from '@/utils/useViewportSize'
import timeFromNow from '@/utils/timeFromNow'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { StatusItem } from '@/components/status-item'
import { Skeleton } from '@/components/ui/skeleton'

interface GroupedData {
  [key: string]: {
    groupStatus: UptimeState
    data: Status[]
  }
}

export function StatusList() {
  const { width } = useViewportSize()
  const resolvedWidth = width > 0 ? (width < 640 ? 30 : width < 1024 ? 60 : 90) : undefined

  const { data, isLoading, isValidating, mutate } = useStatuses(resolvedWidth)
  const [resolvedData, setResolvedData] = useState<GroupedData>()
  const [globalStatus, setGlobalStatus] = useState<UptimeState>()
  const [latestTimestamp, setLatestTimestamp] = useState<number>()

  useEffect(() => {
    function resolveGroupStatus(statuses: Status[]): UptimeState {
      const upCount = statuses.reduce((count, status) => {
        return count + (status.results[status.results.length - 1].success ? 1 : 0)
      }, 0)

      const total = statuses.length
      return {
        up: upCount,
        total: total,
        percent: (upCount / total) * 100,
      }
    }

    function resolveUptime(status: Status) {
      const total = status.results.length
      const success = status.results.filter(result => result.success).length
      return (success / total) * 100
    }

    function processData(data: Status[]) {
      const groupedData = data.reduce((acc: GroupedData, status) => {
        const group = status.group
        acc[group] = acc[group] || { groupStatus: -1, data: [] }
        status.uptime = resolveUptime(status)
        acc[group].data.push(status)
        return acc
      }, {})

      Object.keys(groupedData).forEach(group => {
        groupedData[group].groupStatus = resolveGroupStatus(groupedData[group].data)
      })

      return groupedData
    }

    if (data && data.length) {
      setResolvedData(processData(data))
      setGlobalStatus(resolveGroupStatus(data))
      setLatestTimestamp(
        data.reduce((latest, item) => {
          const maxUnixTimestamp = item.results.reduce((max, result) => {
            const unixTimestamp = new Date(result.timestamp).getTime()
            return unixTimestamp > max ? unixTimestamp : max
          }, latest)
          return maxUnixTimestamp > latest ? maxUnixTimestamp : latest
        }, 0)
      )
    }
  }, [data])

  return (
    <>
      {globalStatus && latestTimestamp ? (
        <div className='my-10 grid items-center justify-items-center gap-1 text-center'>
          {globalStatus.percent === 100 ? (
            <>
              <div className='indicator up m-2 size-8 text-emerald-600' />
              <h1 className='text-2xl font-bold'>All services are online</h1>
            </>
          ) : globalStatus.percent === 0 ? (
            <>
              <div className='indicator down m-2 size-8 text-red-600' />
              <h1 className='text-2xl font-bold'>All services are offline</h1>
            </>
          ) : (
            <>
              <div className='indicator partial m-2 size-8 text-amber-600' />
              <h1 className='text-2xl font-bold'>Some services are offline</h1>
            </>
          )}
          <div className='flex items-center gap-1'>
            Updated {timeFromNow(latestTimestamp)}
            <button
              onClick={() => mutate()}
              aria-label='Refresh'
              disabled={isLoading || isValidating}
              className='focus-ring rounded-full'
            >
              <IconRefresh className={clsx('size-5', (isLoading || isValidating) && 'animate-spin')} />
            </button>
          </div>
        </div>
      ) : (
        <div className='my-10 grid items-center justify-items-center gap-1 text-center'>
          <Skeleton className='m-1 size-10 rounded-full' />
          <Skeleton className='h-8 w-[258px] rounded-md' />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-6 w-[215px] rounded-md' />
            <Skeleton className='size-5 rounded-full' />
          </div>
        </div>
      )}

      {resolvedData ? (
        <Accordion type='multiple' className='grid gap-2'>
          {Object.entries(resolvedData).map(([group, statuses]) => (
            <AccordionItem value={group} key={group}>
              <AccordionTrigger asChild>
                <h2 className='cursor-pointer text-lg'>
                  <div className='line-clamp-1 text-left'>{group}</div>
                  <div className='text-xs uppercase'>
                    {statuses.groupStatus.percent === 100 ? (
                      <div className='flex items-center gap-1'>
                        <div className='indicator up size-2.5 text-emerald-600' />
                        <span className='text-emerald-700'>Operational</span>
                      </div>
                    ) : statuses.groupStatus.percent === 0 ? (
                      <div className='flex items-center gap-1'>
                        <div className='indicator down size-2.5 text-red-600' />
                        <span className='text-red-700'>Offline</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-1'>
                        <div className='indicator partial size-2.5 text-amber-600' />
                        <span className='text-amber-700'>
                          Partial - {statuses.groupStatus.up}/{statuses.data.length}
                        </span>
                      </div>
                    )}
                  </div>
                </h2>
              </AccordionTrigger>

              <AccordionContent className='grid gap-4'>
                {statuses.data.map(status => (
                  <StatusItem data={status} key={status.key} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className='grid gap-2'>
          {[...new Array(process.env.NEXT_PUBLIC_GROUP_SIZE ? parseInt(process.env.NEXT_PUBLIC_GROUP_SIZE) : 3)].map(
            (_, idx) => {
              return <Skeleton key={idx} className='mt-[1px] h-[52px] w-full rounded-lg' />
            }
          )}
        </div>
      )}
    </>
  )
}

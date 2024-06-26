'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { IconRefresh } from '@tabler/icons-react'

import type { Status, UptimeState } from '@/types'

// import { getStatuses } from '@/lib/getStatuses'
import useStatses from '@/utils/useStatses'
import { useViewportSize } from '@/utils/useViewportSize'
import timeFromNow from '@/utils/timeFromNow'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StatusItem } from '@/components/status-item'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme-switch'

interface GroupedData {
  [key: string]: {
    groupStatus: UptimeState
    data: Status[]
  }
}

export default function Home() {
  // width can be 0 when init
  const { width } = useViewportSize()
  const resolvedWidth = width > 0 ? (width < 640 ? 30 : width < 1024 ? 60 : 90) : undefined

  // const data = await getStatuses()
  const { data, isLoading, isValidating, mutate } = useStatses(resolvedWidth)
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

  // const resolvedData = processData(data)
  // const globalStatus = resolveGroupStatus(data)
  // const latestTimestamp = data.reduce((latest, item) => {
  //   const maxUnixTimestamp = item.results.reduce((max, result) => {
  //     const unixTimestamp = new Date(result.timestamp).getTime()
  //     return unixTimestamp > max ? unixTimestamp : max
  //   }, latest)
  //   return maxUnixTimestamp > latest ? maxUnixTimestamp : latest
  // }, 0)

  return (
    <main className='container mx-auto max-w-screen-md px-2 py-4 sm:px-4'>
      <nav className='flex gap-2 items-center justify-center'>
        {process.env.NEXT_PUBLIC_SITE_BACK_URL && process.env.NEXT_PUBLIC_SITE_BACK_TITLE ? (
          <>
            <Link href={process.env.NEXT_PUBLIC_SITE_BACK_URL}>
              {process.env.NEXT_PUBLIC_SITE_LOGO ? (
                <picture>
                  <img
                    src={process.env.NEXT_PUBLIC_SITE_LOGO}
                    className='size-6'
                    alt={process.env.NEXT_PUBLIC_SITE_BACK_TITLE}
                  />
                </picture>
              ) : (
                <span>{process.env.NEXT_PUBLIC_SITE_BACK_TITLE}</span>
              )}
            </Link>
            <span className='w-[1px] h-4 bg-text/10' />
          </>
        ) : null}
        <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}>
          {process.env.NEXT_PUBLIC_SITE_TITLE}
        </Link>
      </nav>

      {globalStatus && latestTimestamp ? (
        <div className='grid gap-1 my-10 items-center text-center justify-items-center'>
          {globalStatus.percent === 100 ? (
            <>
              <div className='size-8 m-2 indicator up text-emerald-700' />
              <h1 className='m-0'>All services are online</h1>
            </>
          ) : globalStatus.percent === 0 ? (
            <>
              <div className='size-8 m-2 indicator down text-red-700' />
              <h1 className='m-0'>All services are offline</h1>
            </>
          ) : (
            <>
              <div className='size-8 m-2 indicator partial text-amber-600' />
              <h1 className='m-0'>Some services are offline</h1>
            </>
          )}
          <div className='flex items-center gap-1'>
            Updated {timeFromNow(latestTimestamp)}
            <button
              onClick={() => mutate()}
              aria-label='Refresh'
              disabled={isLoading || isValidating}
            >
              <IconRefresh
                className={clsx('size-5', (isLoading || isValidating) && 'animate-spin')}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className='grid gap-1 my-10 items-center text-center justify-items-center'>
          <Skeleton className='size-10 m-1 rounded-full' />
          <Skeleton className='h-[38.4px] w-[258px] rounded-md' />
          <div className='flex items-center gap-1'>
            <Skeleton className='h-[24px] w-[215px] rounded-md' />
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
                  <div className='text-left line-clamp-1'>{group}</div>
                  <div className='text-xs uppercase'>
                    {statuses.groupStatus.percent === 100 ? (
                      <div className='flex gap-1 items-center'>
                        <div className='indicator up size-2.5 text-emerald-700' />
                        <span className='text-emerald-800'>Operational</span>
                      </div>
                    ) : statuses.groupStatus.percent === 0 ? (
                      <div className='flex gap-1 items-center'>
                        <div className='indicator down size-2.5 text-red-700' />
                        <span className='text-red-800'>Offline</span>
                      </div>
                    ) : (
                      <div className='flex gap-1 items-center'>
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
          {[
            ...new Array(
              process.env.NEXT_PUBLIC_GROUP_SIZE ? parseInt(process.env.NEXT_PUBLIC_GROUP_SIZE) : 3
            ),
          ].map((_, idx) => {
            return <Skeleton key={idx} className='mt-[1px] h-[52px] w-full rounded-lg' />
          })}
        </div>
      )}

      <footer className='grid gap-2 justify-items-center text-center py-8 text-sm text-text/80'>
        <div>
          {process.env.NEXT_PUBLIC_FOOTER_TEXT ||
            'sts, a fully open-source status page for Gatus backend'}
        </div>
        <ThemeSwitch />
      </footer>
    </main>
  )
}

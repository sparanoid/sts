'use client'

import { useEffect, useState } from 'react'

import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconHelpCircleFilled,
} from '@tabler/icons-react'

import type { Status, UptimeState } from '@/types'

// import { getStatuses } from '@/lib/getStatuses'
import useStatses from '@/utils/useStatses'
import timeFromNow from '@/utils/timeFromNow'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { StatusItem } from '@/components/status-item'

interface GroupedData {
  [key: string]: {
    groupStatus: UptimeState
    data: Status[]
  }
}

export default function Home() {
  // const data = await getStatuses()
  const { data, isLoading, isError } = useStatses()
  const [resolvedData, setResolvedData] = useState<GroupedData>()
  const [globalStatus, setGlobalStatus] = useState<UptimeState>()
  const [latestTimestamp, setLatestTimestamp] = useState<number>()

  useEffect(() => {
    function resolveGroupStatus(statuses: Status[]): UptimeState {
      // let allUp = statuses.every(status => status.results.every(result => result.success))
      // let allDown = statuses.every(status => status.results.every(result => !result.success))
      let allUp = statuses.every(status => status.results[status.results.length - 1].success)
      let allDown = statuses.every(status => !status.results[status.results.length - 1].success)

      if (allUp) return 'up'
      if (allDown) return 'down'
      return 'partial'
    }

    function resolveUptime(status: Status) {
      const total = status.results.length
      const success = status.results.filter(result => result.success).length
      return (success / total) * 100
    }

    function processData(data: Status[]) {
      const groupedData = data.reduce((acc: GroupedData, status) => {
        const group = status.group
        acc[group] = acc[group] || { groupStatus: 'unknown', data: [] }
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

  if (!resolvedData || !globalStatus || !latestTimestamp) return

  return (
    <main className='container mx-auto max-w-screen-md px-2 py-4 sm:px-4'>
      <nav className='flex gap-2 items-center justify-center'>
        {process.env.NEXT_PUBLIC_SITE_BACK_URL && process.env.NEXT_PUBLIC_SITE_BACK_TITLE ? (
          <>
            <a href={process.env.NEXT_PUBLIC_SITE_BACK_URL}>
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
            </a>
            <span className='w-[1px] h-4 bg-text/10' />
          </>
        ) : null}
        <a href={process.env.NEXT_PUBLIC_SITE_URL || '/'}>{process.env.NEXT_PUBLIC_SITE_TITLE}</a>
      </nav>

      <div className='grid gap-2 my-10 items-center text-center justify-items-center'>
        {globalStatus === 'up' ? (
          <>
            <IconCircleCheckFilled className='size-10 fill-emerald-700' />
            <h1 className='m-0'>All services are online</h1>
          </>
        ) : globalStatus === 'partial' ? (
          <>
            <IconAlertCircleFilled className='size-10 fill-amber-600' />
            <h1 className='m-0'>Some services are offline</h1>
          </>
        ) : globalStatus === 'down' ? (
          <>
            <IconCircleXFilled className='size-10 fill-red-700' />
            <h1 className='m-0'>All services are offline</h1>
          </>
        ) : (
          <>
            <IconHelpCircleFilled className='size-10 fill-gray-600' />
            <h1 className='m-0'>Unkown service status</h1>
          </>
        )}
        <div>Last updated on {timeFromNow(latestTimestamp)}</div>
      </div>

      <Accordion type='multiple' className='grid gap-2'>
        {Object.entries(resolvedData).map(([group, statuses]) => (
          <AccordionItem value={group} key={group}>
            <AccordionTrigger>
              <div className='text-left line-clamp-1'>{group}</div>
              <div className='text-sm font-normal'>
                {statuses.groupStatus === 'up' ? (
                  <div className='flex gap-1 items-center'>
                    <IconCircleCheckFilled className='size-4 fill-emerald-700' />
                    <span>Operational</span>
                  </div>
                ) : statuses.groupStatus === 'partial' ? (
                  <div className='flex gap-1 items-center'>
                    <IconAlertCircleFilled className='size-4 fill-amber-600' />
                    <span>Partial</span>
                  </div>
                ) : statuses.groupStatus === 'down' ? (
                  <div className='flex gap-1 items-center'>
                    <IconCircleXFilled className='size-4 fill-red-700' />
                    <span>Down</span>
                  </div>
                ) : (
                  <div className='flex gap-1 items-center'>
                    <IconHelpCircleFilled className='size-4 fill-gray-600' />
                    <span>Unknown</span>
                  </div>
                )}
              </div>
            </AccordionTrigger>

            <AccordionContent className='grid gap-4'>
              {statuses.data.map(status => (
                <StatusItem data={status} key={status.key} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <footer className='text-center py-8 text-sm text-text/50'>
        {process.env.NEXT_PUBLIC_FOOTER_TEXT ||
          'sts, a fully open-source status page for Gatus backend'}
      </footer>
    </main>
  )
}

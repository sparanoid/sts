'use client'

import { IconMenuOrder, IconRefresh, IconSearch, IconX } from '@tabler/icons-react'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import type { Status, UptimeState } from '@/types'

import { timeFromNow } from '@/utils/timeFromNow'

import useStatuses from '@/hooks/useStatuses'
import { useViewportSize } from '@/hooks/useViewportSize'

import { StatusItem } from '@/components/status-item'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Skeleton } from '@/components/ui/skeleton'
import { Toggle } from '@/components/ui/toggle'

interface GroupedData {
  [key: string]: {
    groupStatus: UptimeState
    data: Status[]
  }
}

// Helper functions for data processing
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

export function StatusList() {
  const { width } = useViewportSize()
  const resolvedWidth = width > 0 ? (width < 640 ? 30 : width < 1024 ? 60 : 90) : undefined

  const { data, isLoading, isValidating, mutate } = useStatuses(resolvedWidth)
  const [filterText, setFilterText] = useState<string>('')
  const [manuallyExpandedItems, setManuallyExpandedItems] = useState<string[]>([])
  const [isExpandAll, setIsExpandAll] = useState(false)

  // Compute derived state using useMemo
  const resolvedData = useMemo(() => {
    if (!data?.length) return undefined

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
  }, [data])

  const globalStatus = data?.length ? resolveGroupStatus(data) : undefined

  const latestTimestamp = data?.length
    ? data.reduce((latest, item) => {
        const maxUnixTimestamp = item.results.reduce((max, result) => {
          const unixTimestamp = new Date(result.timestamp).getTime()
          return unixTimestamp > max ? unixTimestamp : max
        }, latest)
        return maxUnixTimestamp > latest ? maxUnixTimestamp : latest
      }, 0)
    : undefined

  // Auto-expand accordions when filtering - use derived state, not effect
  const expandedItems = useMemo(() => {
    // When filtering, auto-expand matching groups
    if (filterText && resolvedData) {
      return Object.entries(resolvedData)
        .filter(([group, statuses]) => {
          const searchText = filterText.toLowerCase()
          // Include if group name matches or any node name matches
          if (group.toLowerCase().includes(searchText)) return true
          return statuses.data.some(status => status.name.toLowerCase().includes(searchText))
        })
        .map(([group]) => group)
    }
    // When expand all is toggled, expand all groups
    if (isExpandAll && resolvedData) {
      return Object.keys(resolvedData)
    }
    // When not filtering, use manually controlled state
    return manuallyExpandedItems
  }, [filterText, resolvedData, manuallyExpandedItems, isExpandAll])

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
              type='button'
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
        <div>
          {/* Title */}
          <div className='my-10 grid items-center justify-items-center gap-1 text-center'>
            <Skeleton className='m-1 size-10 rounded-full' />
            <Skeleton className='h-8 w-[258px] rounded-md' />
            <div className='flex items-center gap-1'>
              <Skeleton className='h-6 w-50 rounded-md' />
              <Skeleton className='size-5 rounded-full' />
            </div>
          </div>

          {/* Input */}
          <div className='mb-4 flex gap-2 justify-center'>
            <Skeleton className='h-8 max-w-70 rounded-md' />
            <Skeleton className='size-8 rounded-md' />
          </div>
        </div>
      )}

      {resolvedData && (
        <div className='mb-4 flex gap-2 justify-center'>
          <InputGroup className='flex-1 max-w-70'>
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
            <InputGroupInput
              type='text'
              placeholder='Filter by group or node name…'
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
            />
            {filterText && (
              <InputGroupAddon align='inline-end'>
                <InputGroupButton size='icon-xs' onClick={() => setFilterText('')}>
                  <IconX />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          <Toggle
            pressed={isExpandAll}
            onPressedChange={setIsExpandAll}
            disabled={!!filterText}
            aria-label={isExpandAll ? 'Collapse all' : 'Expand all'}
            size='icon'
            variant='outline'
          >
            <IconMenuOrder />
          </Toggle>
        </div>
      )}

      {resolvedData ? (
        <Accordion
          type='multiple'
          className='grid gap-2'
          value={expandedItems}
          onValueChange={
            filterText
              ? undefined
              : value => {
                  setManuallyExpandedItems(value)
                  // Update expand all state based on manual changes
                  const allGroups = Object.keys(resolvedData)
                  setIsExpandAll(value.length === allGroups.length && allGroups.length > 0)
                }
          }
        >
          {Object.entries(resolvedData)
            .filter(([group, statuses]) => {
              if (!filterText) return true
              const searchText = filterText.toLowerCase()
              // Filter by group name
              if (group.toLowerCase().includes(searchText)) return true
              // Filter by any node name in the group
              return statuses.data.some(status => status.name.toLowerCase().includes(searchText))
            })
            .map(([group, statuses]) => {
              // Filter nodes within the group
              const filteredStatuses = filterText
                ? statuses.data.filter(status => status.name.toLowerCase().includes(filterText.toLowerCase()))
                : statuses.data

              // If group name matches but no nodes match, show all nodes in that group
              const displayStatuses =
                filteredStatuses.length > 0 || group.toLowerCase().includes(filterText.toLowerCase())
                  ? filteredStatuses.length > 0
                    ? filteredStatuses
                    : statuses.data
                  : []

              return (
                <AccordionItem value={group} key={group}>
                  <AccordionTrigger asChild>
                    <h2 className='cursor-pointer text-lg font-medium'>
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
                    {displayStatuses.map(status => (
                      <StatusItem data={status} key={status.key} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
        </Accordion>
      ) : (
        <div className='grid gap-2'>
          {[
            ...new Array(process.env.NEXT_PUBLIC_GROUP_SIZE ? parseInt(process.env.NEXT_PUBLIC_GROUP_SIZE, 10) : 3),
          ].map((_, idx) => {
            return <Skeleton key={idx} className='mt-px h-[52px] w-full rounded-lg' />
          })}
        </div>
      )}
    </>
  )
}

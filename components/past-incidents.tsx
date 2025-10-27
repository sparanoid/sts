'use client'

import { IconChevronRight } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Link from 'next/link'

import { useIncidents } from '@/hooks/useIncidents'

import { IncidentList } from '@/components/incident-list'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function PastIncidents() {
  const { incidents, isLoading, isError } = useIncidents()

  if (isLoading) {
    return (
      <div className='space-y-4 mt-8'>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-24 w-full' />
      </div>
    )
  }

  if (isError) {
    return null
  }

  // Filter for resolved incidents from last 14 days
  const pastIncidents = incidents.filter(incident => {
    const updates = incident.updates || []
    const latestUpdate = updates[0]
    const isResolved = latestUpdate?.type === 'resolved'
    const isRecent = dayjs().diff(dayjs(incident.createdAt), 'day') <= 14
    return isResolved && isRecent
  })

  if (pastIncidents.length === 0) {
    return null
  }

  return (
    <section className='space-y-2 mt-8'>
      <h2 className='text-xl font-semibold'>Past Incidents</h2>
      <IncidentList incidents={pastIncidents} showAllUpdates={false} />

      {/* Incident History Button */}
      <div className='text-center py-4'>
        <Button asChild>
          <Link href='/history'>
            Incident History
            <IconChevronRight />
          </Link>
        </Button>
      </div>
    </section>
  )
}

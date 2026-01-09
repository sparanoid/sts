'use client'

import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

import { useIncidents } from '@/hooks/useIncidents'

import { IncidentList } from '@/components/incident-list'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const MAX_INCIDENTS = 5

export function PastIncidents() {
  const { incidents, isLoading, isError } = useIncidents()

  if (isLoading) {
    return (
      <div className='space-y-2 mt-8'>
        <Skeleton className='h-8 w-36' />
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-30.5 w-full' />
      </div>
    )
  }

  if (isError || incidents.length === 0) {
    return null
  }

  // Filter for resolved incidents only, then take the most recent ones
  const pastIncidents = incidents
    .filter(incident => {
      const updates = incident.updates || []
      const latestUpdate = updates[0]
      return latestUpdate?.type === 'resolved'
    })
    .slice(0, MAX_INCIDENTS)

  if (pastIncidents.length === 0) {
    return null
  }

  return (
    <section className='space-y-2 mt-8'>
      <div className='flex flex-wrap items-center justify-between'>
        <h2 className='text-xl font-semibold'>Past Incidents</h2>
        <Button asChild>
          <Link href='/history'>
            Incident History
            <IconChevronRight />
          </Link>
        </Button>
      </div>

      <IncidentList type='past' incidents={pastIncidents} showAllUpdates={false} />
    </section>
  )
}

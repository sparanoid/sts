'use client'

import { useIncidents } from '@/hooks/useIncidents'

import { IncidentList } from './incident-list'
import { Skeleton } from './ui/skeleton'

export function CurrentIncidents() {
  const { incidents, isLoading, isError } = useIncidents()

  if (isLoading) {
    return (
      <div className='space-y-3 mt-8'>
        <Skeleton className='h-6 w-40' />
        <Skeleton className='h-32 w-full' />
      </div>
    )
  }

  if (isError) {
    return null
  }

  // Filter for current (unresolved) incidents only
  const currentIncidents = incidents.filter(incident => {
    const updates = incident.updates || []
    const latestUpdate = updates[0]
    return latestUpdate?.type !== 'resolved'
  })

  if (currentIncidents.length === 0) {
    return null
  }

  return (
    <section className='mt-8'>
      <IncidentList type='current' incidents={currentIncidents} showAllUpdates={true} />
    </section>
  )
}

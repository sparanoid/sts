'use client'

import { useIncidents } from '@/utils/useIncidents'

import { IncidentList } from './incident-list'
import { Skeleton } from './ui/skeleton'

export function CurrentIncidents() {
  const { incidents, isLoading, isError } = useIncidents()

  if (isLoading) {
    return (
      <div className='space-y-4 mt-8'>
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
    <section className='space-y-4 mt-8'>
      <div className='flex items-center gap-2'>
        <div className='w-3 h-3 bg-red-500 rounded-full animate-pulse' />
        <h2 className='text-xl font-semibold text-red-600'>Active Incidents</h2>
      </div>
      <IncidentList incidents={currentIncidents} showAllUpdates={true} />
    </section>
  )
}

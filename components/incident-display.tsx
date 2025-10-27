'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { useIncidents } from '@/utils/useIncidents'

import { IncidentList } from './incident-list'
import { Skeleton } from './ui/skeleton'

export function IncidentDisplay() {
  const { incidents, isLoading, isError } = useIncidents()

  if (isLoading) {
    return (
      <div className='space-y-8 mt-8'>
        <div className='space-y-4'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-24 w-full' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-24 w-full' />
        </div>
      </div>
    )
  }

  if (isError) {
    return null
  }

  // Separate current (unresolved) and past incidents
  const currentIncidents = incidents.filter(incident => {
    const updates = incident.updates || []
    const latestUpdate = updates[0]
    return latestUpdate?.type !== 'resolved'
  })

  const pastIncidents = incidents.filter(incident => {
    const updates = incident.updates || []
    const latestUpdate = updates[0]
    const isResolved = latestUpdate?.type === 'resolved'
    const isRecent = dayjs().diff(dayjs(incident.createdAt), 'day') <= 14
    return isResolved && isRecent
  })

  return (
    <div className='space-y-8 mt-8'>
      {/* Current Incidents */}
      {currentIncidents.length > 0 && (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Current Incidents</h2>
          <IncidentList incidents={currentIncidents} showAllUpdates={true} />
        </section>
      )}

      {/* Past Incidents */}
      {pastIncidents.length > 0 && (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Past Incidents</h2>
          <IncidentList incidents={pastIncidents} showAllUpdates={false} />
        </section>
      )}

      {/* Incident History Button */}
      <div className='text-center py-4'>
        <Link
          href='/history'
          className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors'
        >
          Incident History
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <title>Arrow right</title>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </Link>
      </div>
    </div>
  )
}

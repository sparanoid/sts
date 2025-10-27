'use client'

import dayjs from 'dayjs'
import Link from 'next/link'

import { useIncidents } from '@/utils/useIncidents'

import { IncidentList } from './incident-list'
import { Skeleton } from './ui/skeleton'

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
    <section className='space-y-4 mt-8'>
      <h2 className='text-xl font-semibold'>Past Incidents</h2>
      <IncidentList incidents={pastIncidents} showAllUpdates={false} />

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
    </section>
  )
}

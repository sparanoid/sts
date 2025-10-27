import dayjs from 'dayjs'
import type { Metadata } from 'next'
import Link from 'next/link'

import { queryIncidents } from '@/lib/queryIncidents'

import { IncidentList } from '@/components/incident-list'

export const metadata: Metadata = {
  title: 'Incident History',
  description: 'View past service incidents and status updates',
}

const INCIDENTS_PER_PAGE = 30

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HistoryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  // Fetch all incidents using query helper
  const incidents = await queryIncidents()

  // Filter incidents by date range for current page
  const startDate = dayjs().subtract((page - 1) * INCIDENTS_PER_PAGE, 'day')
  const endDate = dayjs().subtract(page * INCIDENTS_PER_PAGE - 1, 'day')

  const pageIncidents = incidents.filter(incident => {
    const incidentDate = dayjs(incident.createdAt)
    return incidentDate.isBefore(startDate) && incidentDate.isAfter(endDate)
  })

  const hasNextPage = incidents.some(incident => dayjs(incident.createdAt).isBefore(endDate))
  const hasPrevPage = page > 1

  return (
    <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4'>
      <div className='mb-6'>
        <Link href='/' className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <title>Arrow left</title>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Status
        </Link>
      </div>

      <h1 className='text-2xl font-bold mb-6'>Incident History</h1>

      <div className='mb-4 text-sm text-gray-600'>
        Showing incidents from {endDate.format('MMM D')} to {startDate.format('MMM D, YYYY')}
      </div>

      {pageIncidents.length > 0 ? (
        <IncidentList incidents={pageIncidents} showAllUpdates={false} />
      ) : (
        <div className='text-center text-gray-500 py-16'>No incidents found for this time period</div>
      )}

      {/* Pagination */}
      <div className='flex items-center justify-between mt-8'>
        <Link
          href={`/history?page=${page + 1}`}
          className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors ${
            !hasNextPage ? 'opacity-50 pointer-events-none' : ''
          }`}
          aria-disabled={!hasNextPage}
        >
          ← Older Incidents
        </Link>

        <span className='text-sm text-gray-600'>Page {page}</span>

        <Link
          href={hasPrevPage ? `/history?page=${page - 1}` : '/history'}
          className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors ${
            !hasPrevPage ? 'opacity-50 pointer-events-none' : ''
          }`}
          aria-disabled={!hasPrevPage}
        >
          Newer Incidents →
        </Link>
      </div>
    </main>
  )
}

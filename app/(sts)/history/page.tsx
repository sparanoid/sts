import dayjs from 'dayjs'
import type { Metadata } from 'next'
import Link from 'next/link'

import { queryIncidents } from '@/lib/queryIncidents'

import { HistoryPagination } from '@/components/history-pagination'
import { IncidentList } from '@/components/incident-list'

export const metadata: Metadata = {
  title: `Incident History - ${process.env.NEXT_PUBLIC_SITE_TITLE}`,
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

  // Calculate total pages based on oldest incident
  const oldestIncident = incidents[incidents.length - 1]
  const daysSinceOldest = oldestIncident ? dayjs().diff(dayjs(oldestIncident.createdAt), 'day') : 0
  const totalPages = Math.max(1, Math.ceil(daysSinceOldest / INCIDENTS_PER_PAGE))

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
        <IncidentList type='past' incidents={pageIncidents} showAllUpdates={false} />
      ) : (
        <div className='text-center text-gray-500 py-16'>No incidents found for this time period</div>
      )}

      {/* Pagination */}
      <HistoryPagination currentPage={page} totalPages={totalPages} />
    </main>
  )
}

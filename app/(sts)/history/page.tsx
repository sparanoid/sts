import { IconRss } from '@tabler/icons-react'
import dayjs from 'dayjs'
import type { Metadata } from 'next'
import Link from 'next/link'

import { queryIncidents } from '@/lib/queryIncidents'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { HistoryPagination } from '@/components/history-pagination'
import { IncidentList } from '@/components/incident-list'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

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
      <Header />

      <div className='space-y-2 py-6'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Incident History</h1>
          <Button asChild tint='orange'>
            <Link href='/history.atom' target='_blank'>
              <IconRss />
              Subscribe
            </Link>
          </Button>
        </div>

        <div className='text-sm text-fg/60'>
          Showing incidents from {endDate.format('MMM D')} to {startDate.format('MMM D, YYYY')}
        </div>
      </div>

      {pageIncidents.length > 0 ? (
        <IncidentList type='past' incidents={pageIncidents} showAllUpdates={false} />
      ) : (
        <div className='text-center text-fg/60 py-16'>No incidents found for this time period</div>
      )}

      {/* Pagination */}
      <HistoryPagination currentPage={page} totalPages={totalPages} />

      <Footer />
    </main>
  )
}

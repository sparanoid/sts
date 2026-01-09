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

const INCIDENTS_PER_PAGE = 10

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function HistoryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = Number(params.page) || 1

  // Fetch all incidents using query helper
  const incidents = await queryIncidents()

  // Calculate pagination based on actual incidents
  const totalIncidents = incidents.length
  const totalPages = Math.max(1, Math.ceil(totalIncidents / INCIDENTS_PER_PAGE))

  // Get incidents for current page
  const startIndex = (page - 1) * INCIDENTS_PER_PAGE
  const endIndex = startIndex + INCIDENTS_PER_PAGE
  const pageIncidents = incidents.slice(startIndex, endIndex)

  // Get date range from actual incidents on this page
  const newestIncident = pageIncidents[0]
  const oldestIncident = pageIncidents[pageIncidents.length - 1]
  const startDate = newestIncident ? dayjs(newestIncident.createdAt) : null
  const endDate = oldestIncident ? dayjs(oldestIncident.createdAt) : null

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

        {startDate && endDate && (
          <div className='text-sm text-fg/60'>
            {startDate.isSame(endDate, 'day')
              ? `Showing incidents from ${startDate.format('MMM D, YYYY')}`
              : `Showing incidents from ${endDate.format('MMM D')} to ${startDate.format('MMM D, YYYY')}`}
          </div>
        )}
      </div>

      {pageIncidents.length > 0 ? (
        <IncidentList type='past' incidents={pageIncidents} showAllUpdates={false} />
      ) : (
        <div className='text-center text-fg/60 py-16'>No incidents found</div>
      )}

      {/* Pagination */}
      <HistoryPagination currentPage={page} totalPages={totalPages} />

      <Footer />
    </main>
  )
}

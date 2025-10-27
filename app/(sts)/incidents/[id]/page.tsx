'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/formatDate'
import { renderLexicalContent } from '@/utils/renderLexicalContent'
import { useIncident } from '@/utils/useIncidents'

import { Skeleton } from '@/components/ui/skeleton'

const statusStyles = {
  investigating: 'bg-red-500',
  identified: 'bg-orange-500',
  monitoring: 'bg-yellow-500',
  update: 'bg-blue-500',
  resolved: 'bg-green-500',
}

const statusLabels = {
  investigating: 'Investigating',
  identified: 'Identified',
  monitoring: 'Monitoring',
  update: 'Update',
  resolved: 'Resolved',
}

export default function IncidentPage() {
  const params = useParams()
  const id = params?.id as string
  const { incident, isLoading, isError } = useIncident(id)

  if (isLoading) {
    return (
      <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4'>
        <div className='space-y-4'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-96 w-full' />
        </div>
      </main>
    )
  }

  if (isError || !incident) {
    return (
      <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4'>
        <p className='text-red-600'>Failed to load incident</p>
        <Link href='/' className='text-blue-600 hover:underline mt-4 inline-block'>
          ← Back to Status
        </Link>
      </main>
    )
  }

  const latestUpdate = incident.updates?.[0]
  const isResolved = latestUpdate?.type === 'resolved'

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

      {/* Incident Header */}
      <div className={cn('border rounded-lg p-6 mb-6', isResolved ? 'border-gray-200' : 'border-red-200 bg-red-50')}>
        <div className='flex items-start justify-between gap-4 mb-4'>
          <div>
            <h1 className='text-2xl font-bold mb-2'>{incident.title}</h1>
            <p className='text-gray-600'>{incident.description}</p>
          </div>
          <div className='text-right'>
            <time className='text-sm text-gray-500'>Created {formatDate(incident.createdAt)}</time>
            {isResolved && (
              <div className='mt-2'>
                <span className='inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded text-sm'>
                  <div className='w-2 h-2 bg-green-500 rounded-full' />
                  Resolved
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Updates Timeline */}
      <section>
        <h2 className='text-xl font-semibold mb-4'>Updates</h2>
        {incident.updates && incident.updates.length > 0 ? (
          <div className='space-y-4'>
            {incident.updates.map((update, index) => (
              <div key={update.id || index} className='border-l-2 border-gray-200 pl-6 pb-6 relative'>
                {/* Timeline dot */}
                <div
                  className={cn(
                    'absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white',
                    statusStyles[update.type]
                  )}
                />

                {/* Update content */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-3 flex-wrap'>
                    <span className='font-semibold'>{statusLabels[update.type]}</span>
                    <time className='text-sm text-gray-500'>{formatDate(update.timestamp)}</time>
                  </div>

                  <div className='text-gray-700 prose prose-sm max-w-none'>
                    {renderLexicalContent(update.content)
                      .split('\n')
                      .map((para, pIndex) => para.trim() && <p key={pIndex}>{para}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No updates available</p>
        )}
      </section>
    </main>
  )
}

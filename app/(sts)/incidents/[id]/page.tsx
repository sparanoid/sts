import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { queryIncidentById } from '@/lib/queryIncidents'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/formatDate'
import { renderLexicalContent } from '@/utils/renderLexicalContent'

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

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const incident = await queryIncidentById(Number(id))

  if (!incident) {
    return {
      title: 'Incident Not Found',
      description: 'The requested incident could not be found.',
    }
  }

  const updates = incident.updates || []
  const latestUpdate = updates[0]
  const status = latestUpdate?.type || 'unknown'

  return {
    title: `${incident.title} - Incident Status`,
    description: incident.description || `Incident status: ${status}`,
  }
}

export default async function IncidentPage({ params }: PageProps) {
  const { id } = await params

  // Fetch incident using query helper
  const incident = await queryIncidentById(Number(id))

  if (!incident) {
    notFound()
  }

  const updates = incident.updates || []
  const latestUpdate = updates[0]
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
        {updates.length > 0 ? (
          <div className='space-y-4'>
            {updates.map((update, index) => (
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

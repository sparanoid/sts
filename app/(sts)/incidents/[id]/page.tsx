import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { queryIncidentById } from '@/lib/queryIncidents'

import { cn } from '@/utils/cn'
import { renderLexicalContent } from '@/utils/renderLexicalContent'
import { timeFromNow } from '@/utils/timeFromNow'

import { TimestampTooltip } from '@/components/timestamp-tooltip'

const statusStyles = {
  investigating: 'bg-rose-500',
  identified: 'bg-orange-500',
  monitoring: 'bg-yellow-500',
  update: 'bg-blue-500',
  resolved: 'bg-emerald-500',
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
    <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4 space-y-6'>
      <div>
        <Link href='/' className='inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <title>Arrow left</title>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
          Back to Status
        </Link>
      </div>

      {/* Incident Header */}
      <div className='space-y-2'>
        {isResolved && (
          <span className='inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded text-sm'>
            <div className='w-2 h-2 bg-emerald-500 rounded-full' />
            Resolved
          </span>
        )}
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-2'>
            <h1 className={cn('text-2xl font-bold', !isResolved && 'text-rose-500')}>{incident.title}</h1>
            {incident.description && <p className='text-fg/60'>{incident.description}</p>}
          </div>
        </div>
        <div className='flex'>
          <TimestampTooltip timestamp={+new Date(incident.createdAt)}>
            <div className='text-fg/60 text-sm'>{timeFromNow(+new Date(incident.createdAt))}</div>
          </TimestampTooltip>
        </div>
      </div>

      {/* Updates Timeline */}
      <section className='space-y-2'>
        <h2 className='text-xl font-semibold'>Updates</h2>
        {updates.length > 0 ? (
          <div className='space-y-6'>
            {updates.map((update, index) => (
              <div key={update.id || index} className='border-l-2 border-fg/20 pl-6 ml-2.5 relative'>
                {/* Timeline dot */}
                <div
                  className={cn('absolute -left-2.5 size-5 rounded-full border-2 border-bg', statusStyles[update.type])}
                />

                {/* Update content */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-3 flex-wrap justify-between'>
                    <span className='font-semibold'>{statusLabels[update.type]}</span>
                    <TimestampTooltip timestamp={+new Date(update.timestamp)}>
                      <div className='text-fg/60 text-sm'>{timeFromNow(+new Date(update.timestamp))}</div>
                    </TimestampTooltip>
                  </div>

                  <div className='text-fg/80 prose prose-sm max-w-none'>
                    {renderLexicalContent(update.content)
                      .split('\n')
                      .map((para, pIndex) => para.trim() && <p key={pIndex}>{para}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-fg/60'>No updates available</p>
        )}
      </section>
    </main>
  )
}

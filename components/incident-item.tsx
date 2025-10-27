'use client'

import Link from 'next/link'

import type { Incident } from '@/payload-types'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/formatDate'
import { renderLexicalContent } from '@/utils/renderLexicalContent'

interface IncidentItemProps {
  incident: Incident
  showAllUpdates?: boolean
}

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

export function IncidentItem({ incident, showAllUpdates = false }: IncidentItemProps) {
  const updates = incident.updates || []
  const latestUpdate = updates[0]
  const isResolved = latestUpdate?.type === 'resolved'
  const updatesToShow = showAllUpdates ? updates : latestUpdate ? [latestUpdate] : []

  return (
    <div className={cn('border rounded-lg p-4 space-y-3', isResolved ? 'border-gray-200' : 'border-red-200 bg-red-50')}>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1'>
          <Link href={`/incidents/${incident.id}`} className='text-lg font-semibold hover:underline'>
            {incident.title}
          </Link>
          <p className='text-sm text-gray-600 mt-1'>{incident.description}</p>
        </div>
        <time className='text-sm text-gray-500 whitespace-nowrap'>{formatDate(incident.createdAt)}</time>
      </div>

      {updatesToShow.length > 0 && (
        <div className='space-y-2'>
          {updatesToShow.map((update, index) => (
            <div key={update.id || index} className='flex items-start gap-3'>
              <div className='flex items-center gap-2 min-w-fit'>
                <div className={cn('w-2 h-2 rounded-full', statusStyles[update.type])} />
                <span className='text-sm font-medium'>{statusLabels[update.type]}</span>
              </div>
              <div className='flex-1 text-sm text-gray-700'>{renderLexicalContent(update.content) || 'No content'}</div>
              <time className='text-sm text-gray-500 whitespace-nowrap'>{formatDate(update.timestamp)}</time>
            </div>
          ))}
        </div>
      )}

      {!showAllUpdates && updates.length > 1 && (
        <Link href={`/incidents/${incident.id}`} className='text-sm text-blue-600 hover:underline'>
          View all {updates.length} updates →
        </Link>
      )}
    </div>
  )
}

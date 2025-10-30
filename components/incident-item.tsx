'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'

import type { Incident, IncidentUpdate } from '@/payload-types'

import { cn } from '@/utils/cn'
import { timeFromNow } from '@/utils/timeFromNow'

import { TimestampTooltip } from '@/components/timestamp-tooltip'
import { Badge, type BadgeProps } from '@/components/ui/badge'

interface IncidentItemProps {
  incident: Incident
  showAllUpdates?: boolean
}

const statusTints: Record<NonNullable<IncidentUpdate>[number]['type'], BadgeProps['tint']> = {
  investigating: 'rose',
  identified: 'orange',
  monitoring: 'yellow',
  update: 'blue',
  resolved: 'emerald',
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
    <div
      className={cn(
        'border rounded-lg p-4 space-y-2 shadow-xs',
        isResolved ? 'border-fg/20' : 'border-rose-500 bg-rose-500/5'
      )}
    >
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-1'>
          <div>
            <Link href={`/incidents/${incident.id}`} className='text-lg font-semibold hover:underline'>
              {incident.title}
            </Link>
          </div>
          {incident.description && <p className='text-sm text-fg/60'>{incident.description}</p>}
        </div>

        <TimestampTooltip timestamp={+new Date(incident.createdAt)}>
          <div className='text-fg/60'>{timeFromNow(+new Date(incident.createdAt))}</div>
        </TimestampTooltip>
      </div>

      {updatesToShow.length > 0 && (
        <div className='space-y-2'>
          {updatesToShow.map((update, index) => (
            <div key={update.id || index} className='flex items-start gap-3'>
              <Badge variant='dot' tint={statusTints[update.type]}>
                {statusLabels[update.type]}
              </Badge>
              <div className='flex-1 text-fg/60 prose prose-sm max-w-none'>
                <RichText data={update.content} disableContainer />
              </div>

              <TimestampTooltip timestamp={+new Date(update.timestamp)}>
                <div className='text-fg/60 text-sm'>{timeFromNow(+new Date(update.timestamp))}</div>
              </TimestampTooltip>
            </div>
          ))}
        </div>
      )}

      {!showAllUpdates && updates.length > 1 && (
        <Link href={`/incidents/${incident.id}`} className='text-sm hover:underline'>
          View all {updates.length} updates →
        </Link>
      )}
    </div>
  )
}

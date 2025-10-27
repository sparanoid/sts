'use client'

import dayjs from 'dayjs'

import type { Incident } from '@/payload-types'

import { formatDate } from '@/utils/formatDate'

import { IncidentItem } from '@/components/incident-item'

interface IncidentListProps {
  type: 'current' | 'past'
  incidents: Incident[]
  showAllUpdates?: boolean
}

export function IncidentList({ type, incidents, showAllUpdates = false }: IncidentListProps) {
  // Group incidents by day
  const groupedIncidents = incidents.reduce<Record<string, Incident[]>>((groups, incident) => {
    const date = dayjs(incident.createdAt).format('YYYY-MM-DD')
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(incident)
    return groups
  }, {})

  const sortedDates = Object.keys(groupedIncidents).sort((a, b) => b.localeCompare(a))

  if (incidents.length === 0) {
    return <div className='text-center text-fg/60 py-8'>No incidents to display</div>
  }

  return (
    <div className='space-y-6'>
      {sortedDates.map(date => (
        <div key={date} className='space-y-2'>
          {type !== 'current' && (
            <h3 className='font-semibold text-fg/60'>
              {formatDate(new Date(date), {
                format: {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                },
              })}
            </h3>
          )}
          <div className='space-y-3'>
            {groupedIncidents[date].map(incident => (
              <IncidentItem key={incident.id} incident={incident} showAllUpdates={showAllUpdates} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

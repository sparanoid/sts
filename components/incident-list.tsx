'use client'

import dayjs from 'dayjs'

import type { Incident } from '@/payload-types'

import { IncidentItem } from './incident-item'

interface IncidentListProps {
  incidents: Incident[]
  showAllUpdates?: boolean
}

export function IncidentList({ incidents, showAllUpdates = false }: IncidentListProps) {
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
    return <div className='text-center text-gray-500 py-8'>No incidents to display</div>
  }

  return (
    <div className='space-y-6'>
      {sortedDates.map(date => (
        <div key={date}>
          <h3 className='text-sm font-semibold text-gray-700 mb-3'>{dayjs(date).format('MMMM D, YYYY')}</h3>
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

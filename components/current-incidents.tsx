'use client'

import { useEffect, useState } from 'react'

import { useIncidents } from '@/hooks/useIncidents'

import { IncidentList } from '@/components/incident-list'

export function CurrentIncidents() {
  const { incidents, isLoading, isError } = useIncidents()
  const [shouldRender, setShouldRender] = useState(false)

  // Filter for current (unresolved) incidents only
  const currentIncidents = incidents.filter(incident => {
    const updates = incident.updates || []
    const latestUpdate = updates[0]
    return latestUpdate?.type !== 'resolved'
  })

  useEffect(() => {
    if (!isLoading && !isError && currentIncidents.length > 0) {
      requestAnimationFrame(() => {
        setShouldRender(true)
      })
    }
  }, [isLoading, isError, currentIncidents.length])

  if (isLoading || isError || currentIncidents.length === 0) {
    return null
  }

  return (
    <section
      className='mt-8 grid transition-all duration-500 ease-out'
      style={{
        gridTemplateRows: shouldRender ? '1fr' : '0fr',
        opacity: shouldRender ? 1 : 0,
      }}
    >
      <div className='overflow-hidden'>
        <IncidentList type='current' incidents={currentIncidents} showAllUpdates={true} />
      </div>
    </section>
  )
}

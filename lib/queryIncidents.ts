import config from '@payload-config'
import { getPayload } from 'payload'

import type { Incident } from '@/payload-types'

/**
 * Query a single incident by ID
 */
export async function queryIncidentById(id: number): Promise<Incident | null> {
  try {
    const payload = await getPayload({ config })
    const incident = await payload.findByID({
      collection: 'incidents',
      id,
    })
    return incident as Incident
  } catch {
    return null
  }
}

/**
 * Query all incidents with optional limit and sorting
 */
export async function queryIncidents(options?: { limit?: number; sort?: string }): Promise<Incident[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'incidents',
    limit: options?.limit || 1000,
    sort: options?.sort || '-createdAt',
  })
  return result.docs as Incident[]
}

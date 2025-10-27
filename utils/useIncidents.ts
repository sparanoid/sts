import useSWR from 'swr'

import type { Incident } from '@/payload-types'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useIncidents(limit?: number) {
  const query = limit ? `?limit=${limit}` : ''
  const { data, error, isLoading } = useSWR<{ docs: Incident[] }>(`/api/incidents${query}`, fetcher)

  return {
    incidents: data?.docs || [],
    isLoading,
    isError: error,
  }
}

export function useIncident(id: string) {
  const { data, error, isLoading } = useSWR<Incident>(id ? `/api/incidents/${id}` : null, fetcher)

  return {
    incident: data,
    isLoading,
    isError: error,
  }
}

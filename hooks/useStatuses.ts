import useSWR, { type Fetcher } from 'swr'

import type { Status } from '@/types'

const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || ''

const fetcher: Fetcher<Status[]> = async (...args: Parameters<typeof fetch>) => {
  const resp = await fetch(...args)
  if (!resp.ok) {
    throw new Error('An error occurred while fetching status')
  }
  return resp.json()
}

function useStatuses(size: number | undefined) {
  const endpoint = size ? `${API_BASE_PATH}/api/status?size=${size}` : null
  const { data, error, isValidating, mutate } = useSWR(endpoint, fetcher, {
    refreshInterval: 1000 * 60,
    revalidateOnMount: true,
  })

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useStatuses

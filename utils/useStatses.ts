import { Status } from '@/types'
import useSWR, { Fetcher } from 'swr'

const fetcher: Fetcher<Status[]> = async (...args: Parameters<typeof fetch>) => {
  const resp = await fetch(...args)
  if (!resp.ok) {
    throw new Error('An error occurred while fetching status')
  }
  return resp.json()
}

function useStatses(size: number) {
  const { data, error, isValidating, mutate } = useSWR(
    size ? `/api/status?size=${size}` : null,
    fetcher,
    {
      refreshInterval: 1000 * 60,
    }
  )

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}

export default useStatses

import { Status } from '@/types'

export async function getStatuses(size: number) {
  const apiBase = process.env.GATUS_API_BASE

  if (!apiBase) {
    throw new Error('No API base provided')
  }

  const url = `${apiBase}/endpoints/statuses?page=1&pageSize=${size}`
  const res = await fetch(url, {
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json: Status[] = await res.json()

  return json
}

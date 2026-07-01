import type { Status } from '@/types'

import { version } from '@/package.json'

export async function getStatuses(size: number) {
  const apiBase = process.env.GATUS_API_BASE

  if (!apiBase) {
    throw new Error('No API base provided')
  }

  const url = `${apiBase}/endpoints/statuses?page=1&pageSize=${size}`
  const headers: HeadersInit = {
    "User-Agent": `sparanoid-sts/${version}`,
  };

  const { GATUS_API_USERNAME, GATUS_API_PASSWORD } = process.env;
  if (GATUS_API_USERNAME && GATUS_API_PASSWORD) {
    headers.Authorization = `Basic ${Buffer.from(`${GATUS_API_USERNAME}:${GATUS_API_PASSWORD}`).toString("base64")}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 10 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const json: Status[] = await res.json()

  return json
}

import type { NextRequest } from 'next/server'
import { getStatuses } from '@/lib/getStatuses'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const json = await getStatuses()

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

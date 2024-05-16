import type { NextRequest } from 'next/server'
import { getStatuses } from '@/lib/getStatuses'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const sizeString = searchParams.get('size')
  const size = sizeString ? Number(sizeString) : 60

  const json = await getStatuses(size)

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

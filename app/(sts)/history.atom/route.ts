import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { queryIncidents } from '@/lib/queryIncidents'

dayjs.extend(utc)

const statusLabels = {
  investigating: 'Investigating',
  identified: 'Identified',
  monitoring: 'Monitoring',
  update: 'Update',
  resolved: 'Resolved',
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function formatAtomDate(date: string): string {
  return dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
}

function formatDisplayDate(date: string): string {
  return dayjs(date).utc().format('MMM D, HH:mm')
}

export async function GET() {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Status Page'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://status.example.com'

  // Fetch all incidents
  const incidents = await queryIncidents({ limit: 50 })

  // Generate feed updated date (most recent incident update)
  const feedUpdated =
    incidents.length > 0 ? formatAtomDate(incidents[0].updatedAt) : formatAtomDate(new Date().toISOString())

  const entries = incidents
    .map(incident => {
      const updates = incident.updates || []
      const latestUpdate = updates[0]
      const incidentUrl = `${siteUrl}/incidents/${incident.id}`

      // Build update content HTML
      const updateContent = updates
        .map(update => {
          const status = statusLabels[update.type]
          const contentHtml = convertLexicalToHTML({ data: update.content })
          const timestamp = formatDisplayDate(update.timestamp)

          return `<div><h3>${timestamp} UTC - ${status}</h3>${contentHtml}</div>`
        })
        .join('')

      return `
    <entry>
      <title>${escapeXml(incident.title)}</title>
      <id>tag:${siteUrl},2005:Incident/${incident.id}</id>
      <published>${formatAtomDate(incident.createdAt)}</published>
      <updated>${formatAtomDate(latestUpdate?.timestamp || incident.updatedAt)}</updated>
      <link rel="alternate" type="text/html" href="${incidentUrl}"/>
      <content type="html"><![CDATA[${updateContent}]]></content>
    </entry>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteTitle)} - Incident History</title>
  <id>tag:${siteUrl},2005:/history</id>
  <updated>${feedUpdated}</updated>
  <link rel="alternate" type="text/html" href="${siteUrl}/history"/>
  <link rel="self" type="application/atom+xml" href="${siteUrl}/history.atom"/>
  <author>
    <name>${escapeXml(siteTitle)}</name>
  </author>${entries}
</feed>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=600',
    },
  })
}

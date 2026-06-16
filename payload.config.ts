import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Incidents } from '@/collections/Incidents'

export default buildConfig({
  admin: {
    autoRefresh: true,
  },

  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Incidents],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || process.env.TURSO_DATABASE_URL || 'file:./sqlite.db',
      authToken: process.env.AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || '',
    },
  }),
  telemetry: false,
})

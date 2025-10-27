import type { CollectionConfig } from 'payload'

export const Incidents: CollectionConfig = {
  slug: 'incidents',
  access: {
    // Allow public read access for the status page
    read: () => true,
    // Only authenticated users can create/update/delete incidents
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Incident Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Incident Description',
    },
    {
      name: 'updates',
      type: 'array',
      label: 'Status Updates',
      labels: {
        singular: 'Update',
        plural: 'Updates',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Investigating',
              value: 'investigating',
            },
            {
              label: 'Identified',
              value: 'identified',
            },
            {
              label: 'Monitoring',
              value: 'monitoring',
            },
            {
              label: 'Update',
              value: 'update',
            },
            {
              label: 'Resolved',
              value: 'resolved',
            },
          ],
          defaultValue: 'investigating',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'Update Content',
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
      admin: {
        initCollapsed: false,
      },
      interfaceName: 'IncidentUpdate',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Sort updates by timestamp in descending order (newest first)
        if (data.updates && Array.isArray(data.updates)) {
          data.updates.sort((a: { timestamp: string }, b: { timestamp: string }) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          })
        }
        return data
      },
    ],
  },
  timestamps: true,
}

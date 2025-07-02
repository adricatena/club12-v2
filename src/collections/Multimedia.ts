import type { CollectionConfig } from 'payload'

export const Multimedia: CollectionConfig = {
  slug: 'multimedia',
  labels: {
    singular: 'Multimedia',
    plural: 'Multimedia',
  },
  access: {
    create: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  upload: {
    // staticURL: process.env.PAYLOAD_PUBLIC_R2_PUBLIC_BUCKET_URL,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Descripción Corta',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Descripción',
      required: false,
    },
  ],
}

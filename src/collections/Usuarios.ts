import type { CollectionConfig } from 'payload'

export const Usuarios: CollectionConfig = {
  slug: 'usuarios',
  labels: {
    singular: 'Usuario',
    plural: 'Usuarios',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'text',
      name: 'slug',
      label: 'Slug',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

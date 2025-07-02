import type { Block } from 'payload'

export const Enlace: Block = {
  slug: 'enlace',
  labels: {
    singular: 'Enlace',
    plural: 'Enlaces',
  },
  interfaceName: 'Enlace',
  fields: [
    {
      type: 'text',
      name: 'url',
      label: 'URL',
      required: true,
    },
  ],
}

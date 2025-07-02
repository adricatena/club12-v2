import type { Block } from 'payload'

export const Eliminatoria: Block = {
  slug: 'eliminatoria',
  labels: {
    singular: 'Eliminatoria',
    plural: 'Eliminatorias',
  },
  interfaceName: 'Eliminatoria',
  fields: [
    {
      type: 'array',
      name: 'cruces',
      labels: {
        singular: 'Cruce',
        plural: 'Cruces',
      },
      interfaceName: 'Cruces',
      fields: [
        {
          type: 'text',
          name: 'equipo_a',
          label: 'Equipo A',
          required: true,
        },
        {
          type: 'upload',
          name: 'logo_equipo_a',
          label: 'Logo equipo A',
          relationTo: 'multimedia',
          required: true,
        },
        {
          type: 'number',
          name: 'puntos_a',
          label: 'Puntos A',
          required: false,
        },
        {
          type: 'text',
          name: 'equipo_b',
          label: 'Equipo B',
          required: true,
        },
        {
          type: 'upload',
          name: 'logo_equipo_b',
          relationTo: 'multimedia',
          label: 'Logo equipo B',
          required: true,
        },
        {
          type: 'number',
          name: 'puntos_b',
          label: 'Puntos B',
          required: false,
        },
      ],
    },
  ],
}

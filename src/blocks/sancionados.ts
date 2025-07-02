import type { Block } from 'payload'

export const Sancionados: Block = {
  slug: 'sancionados',
  labels: {
    singular: 'Sancionado',
    plural: 'Sancionados',
  },
  interfaceName: 'Sancionado',
  fields: [
    {
      type: 'blocks',
      name: 'jugadores',
      labels: {
        singular: 'jugador',
        plural: 'jugadores',
      },
      blocks: [
        {
          slug: 'jugador',
          labels: {
            singular: 'Jugador',
            plural: 'Jugadores',
          },
          fields: [
            {
              type: 'text',
              name: 'equipo',
              label: 'Equipo',
              required: true,
            },
            {
              type: 'text',
              name: 'sancion',
              label: 'Sancion',
              required: true,
            },
            {
              type: 'text',
              name: 'motivo',
              label: 'Motivo',
              required: true,
            },
            {
              type: 'text',
              name: 'fechas',
              label: 'Fechas',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

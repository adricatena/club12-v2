import type { Block } from 'payload'

export const TablaGoleadores: Block = {
  slug: 'tabla_goleadores',
  labels: {
    singular: 'Tabla Goleadores',
    plural: 'Tabla Goleadores',
  },
  interfaceName: 'TablaGoleadores',
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
              type: 'array',
              name: 'fechas',
              labels: {
                singular: 'Fecha',
                plural: 'Fechas',
              },
              fields: [
                {
                  type: 'number',
                  name: 'puntos',
                  label: 'Puntos',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'fechas',
      labels: {
        singular: 'Nombre de fecha',
        plural: 'Nombres de fechas',
      },
      fields: [
        {
          type: 'text',
          name: 'nombre',
          label: 'Etiqueta fecha',
          required: true,
        },
      ],
    },
  ],
}

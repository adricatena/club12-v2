import type { Block } from 'payload'

export const TablaPosiciones: Block = {
  slug: 'tabla_posiciones',
  labels: {
    singular: 'Tabla Posiciones',
    plural: 'Tablas Posiciones',
  },
  interfaceName: 'TablaPosiciones',
  fields: [
    {
      type: 'text',
      name: 'grupo',
      label: 'Grupo',
      required: false,
    },
    {
      type: 'checkbox',
      name: 'con_empate',
      label: 'Tabla con empates',
    },
    {
      type: 'blocks',
      name: 'equipos',
      labels: {
        singular: 'Equipo',
        plural: 'Equipos',
      },
      blocks: [
        {
          slug: 'equipo',
          labels: {
            singular: 'Equipo',
            plural: 'Equipos',
          },
          fields: [
            {
              type: 'number',
              name: 'partidos_jugados',
              label: 'Partidos jugados',
            },
            {
              type: 'number',
              name: 'partidos_ganados',
              label: 'Partidos ganados',
            },
            {
              type: 'number',
              name: 'partidos_empatados',
              label: 'Partidos empatados',
            },
            {
              type: 'number',
              name: 'partidos_perdidos',
              label: 'Partidos perdidos',
            },
            {
              type: 'number',
              name: 'goles_favor',
              label: 'Goles a favor',
            },
            {
              type: 'number',
              name: 'goles_contra',
              label: 'Goles en contra',
            },
            {
              type: 'number',
              name: 'puntos',
              label: 'Puntos',
            },
          ],
        },
      ],
    },
  ],
}

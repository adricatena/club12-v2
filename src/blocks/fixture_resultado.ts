import type { Block } from 'payload'

export const FixtureResultados: Block = {
  slug: 'fixture_resultados',
  labels: {
    singular: 'Fixture/Resultado',
    plural: 'Fixtures/Resultados',
  },
  interfaceName: 'FixtureResultado',
  fields: [
    {
      type: 'blocks',
      name: 'fechas',
      labels: {
        singular: 'Fecha',
        plural: 'Fechas',
      },
      blocks: [
        {
          slug: 'fecha',
          labels: {
            singular: 'Fecha',
            plural: 'Fechas',
          },
          fields: [
            {
              type: 'text',
              name: 'grupo',
              label: 'Grupo',
              required: false,
            },
            {
              type: 'array',
              name: 'partidos',
              labels: {
                singular: 'Partido',
                plural: 'Partidos',
              },
              fields: [
                {
                  type: 'text',
                  name: 'horario',
                  label: 'Horario',
                },
                {
                  type: 'text',
                  name: 'cancha',
                  label: 'Cancha',
                  required: true,
                },
                {
                  type: 'text',
                  name: 'equipo_a',
                  label: 'Equipo A',
                  required: true,
                },
                {
                  type: 'upload',
                  name: 'logo_equipo_a',
                  relationTo: 'multimedia',
                  label: 'Logo equipo A',
                  required: true,
                },
                {
                  type: 'number',
                  name: 'puntos_a',
                  label: 'Puntos A',
                },
                {
                  type: 'number',
                  name: 'penales_a',
                  label: 'Penales A',
                },
                {
                  type: 'text',
                  name: 'equipo_b',
                  label: 'Equipo B',
                },
                {
                  type: 'upload',
                  name: 'logo_equipo_b',
                  relationTo: 'multimedia',
                  label: 'Logo equipo B',
                },
                {
                  type: 'number',
                  name: 'puntos_b',
                  label: 'Puntos B',
                },
                {
                  type: 'number',
                  name: 'penales_b',
                  label: 'Penales B',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

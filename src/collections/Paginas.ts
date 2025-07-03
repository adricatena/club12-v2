import type { Subdominio as TSubdominio } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import { Contenido } from '../blocks/contenido'
import { Eliminatoria } from '../blocks/eliminatoria'
import { FixtureResultados } from '../blocks/fixture_resultado'
import { Sancionados } from '../blocks/sancionados'
import { TablaGoleadores } from '../blocks/tabla-goleadores'
import { TablaPosiciones } from '../blocks/tabla-posiciones'
import { Slug } from '../fields/Slug'
import { Subdominio } from '../fields/Subdominio'

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', '_status'],
    preview: async (doc) => {
      const slug = (doc?.subdominio as TSubdominio).slug || 'futbol'
      return `${process.env.NEXT_PUBLIC_WEB_URL}/${slug}/preview/${doc.id}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true,
  },
  fields: [
    Subdominio,
    Slug,
    {
      type: 'text',
      name: 'titulo',
      label: 'Título',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'blocks',
      name: 'bloques',
      labels: {
        singular: 'Bloque',
        plural: 'Bloques',
      },
      blocks: [
        Eliminatoria,
        TablaPosiciones,
        TablaGoleadores,
        FixtureResultados,
        Contenido,
        Sancionados,
      ],
    },
  ],
}

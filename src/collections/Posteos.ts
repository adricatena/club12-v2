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

export const Posteos: CollectionConfig = {
  slug: 'posteos',
  labels: {
    singular: 'Posteo',
    plural: 'Posteos',
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', '_status'],
    preview: async (doc) => {
      const slug = (doc?.subdominio as TSubdominio).slug || 'futbol'
      return `${process.env.NEXT_PUBLIC_WEB_URL}/${slug}/preview/noticias/${doc.id}`
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
      label: 'Titulo',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'text',
      name: 'descripcion',
      label: 'Descripcion',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'upload',
      relationTo: 'multimedia',
      name: 'imagen_destacada',
      label: 'Imagen Destacada',
    },
    {
      type: 'blocks',
      name: 'bloques',
      label: 'Bloques',
      blocks: [
        Eliminatoria,
        TablaPosiciones,
        TablaGoleadores,
        FixtureResultados,
        Contenido,
        Sancionados,
      ],
    },
    {
      type: 'relationship',
      name: 'autor',
      relationTo: 'usuarios',
      required: true,
      label: 'Autor',
    },
    {
      type: 'relationship',
      name: 'categorias',
      relationTo: 'categorias_posteos',
      hasMany: true,
    },
    {
      type: 'checkbox',
      name: 'es_viejo',
      label: 'Es viejo',
      defaultValue: false,
      admin: {
        hidden: true,
      },
    },
    {
      type: 'checkbox',
      name: 'editado',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.es_viejo,
      },
    },
    {
      type: 'textarea',
      name: 'contenido_html_raw',
      label: 'Contenido HTML Crudo',
      admin: {
        condition: (_, siblingData) => siblingData.es_viejo,
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'
import { Enlace } from '../blocks/enlace'
import { Slug } from '../fields/Slug'
import { readFromServer } from '../utils/access'

export const Subdominios: CollectionConfig = {
  slug: 'subdominios',
  labels: {
    singular: 'Subdominio',
    plural: 'Subdominios',
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'slug'],
  },
  access: {
    read: readFromServer,
  },
  fields: [
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
      unique: true,
      admin: {
        placeholder: 'Futbol 11',
        description: 'Nombre del subdominio',
        position: 'sidebar',
      },
    },
    Slug,
    {
      type: 'upload',
      name: 'logo',
      relationTo: 'multimedia',
      label: 'Icono',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Icono del subdominio',
      },
    },
    {
      type: 'upload',
      name: 'favicon',
      relationTo: 'multimedia',
      label: 'Favicon',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Favicon del subdominio',
      },
    },
    {
      type: 'blocks',
      name: 'navegacion',
      label: 'Navegación',
      blocks: [
        Enlace,
        {
          slug: 'menu',
          labels: {
            singular: 'Menu',
            plural: 'Menu',
          },
          fields: [
            {
              type: 'blocks',
              name: 'menu',
              label: 'Menu',
              blocks: [
                Enlace,
                {
                  slug: 'submenu',
                  labels: {
                    singular: 'Submenu',
                    plural: 'Submenu',
                  },
                  fields: [
                    {
                      type: 'blocks',
                      name: 'submenu',
                      label: 'Submenu',
                      blocks: [Enlace],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

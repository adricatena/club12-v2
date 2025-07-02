import type { CollectionConfig } from 'payload'
import { Subdominio } from '../fields/Subdominio'
import { readFromServer } from '../utils/access'

export const CategoriasPosteos: CollectionConfig = {
  slug: 'categorias_posteos',
  labels: {
    singular: 'Categoria de Posteo',
    plural: 'Categorias de Posteo',
  },
  admin: {
    useAsTitle: 'nombre',
  },
  access: {
    read: readFromServer,
  },
  fields: [
    Subdominio,
    {
      type: 'text',
      name: 'nombre',
      label: 'Nombre',
      required: true,
    },
  ],
}

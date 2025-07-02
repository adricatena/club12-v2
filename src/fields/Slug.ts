import type { Field } from 'payload'

export const Slug: Field = {
  type: 'text',
  name: 'slug',
  label: 'Slug',
  required: true,
  unique: true,
  index: true,
  admin: {
    description: 'Texto sin espacios. Este sera el identificador de la pagina en la URL',
    placeholder: 'futbol11',
    position: 'sidebar',
  },
}

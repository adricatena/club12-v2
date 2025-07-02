import type { Field } from 'payload'

export const Subdominio: Field = {
  type: 'relationship',
  name: 'subdominio',
  label: 'Subdominio',
  relationTo: 'subdominios',
  required: true,
  admin: {
    position: 'sidebar',
  },
}

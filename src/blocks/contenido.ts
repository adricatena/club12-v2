import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const Contenido: Block = {
  slug: 'contenido',
  labels: {
    singular: 'Contenido',
    plural: 'Contenidos',
  },
  interfaceName: 'Contenido',
  fields: [
    {
      name: 'contenido',
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('contenido', { name: 'contenido_html' }),
  ],
}

// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { es } from 'payload/i18n/es'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { CategoriasPosteos } from './collections/CategoriasPosteos'
import { Multimedia } from './collections/Multimedia'
import { Paginas } from './collections/Paginas'
import { Posteos } from './collections/Posteos'
import { Subdominios } from './collections/Subdominios'
import { Usuarios } from './collections/Usuarios'
import {
  ADMIN_URL,
  DATABASE_URI,
  NEXT_PUBLIC_WEB_URL,
  PAYLOAD_SECRET,
  R2_ACCESS_KEY_ID,
  R2_ACCOUNT_ID,
  R2_BUCKET,
  R2_SECRET_ACCESS_KEY,
} from './config'

const accountId = R2_ACCOUNT_ID
const accessKeyId = R2_ACCESS_KEY_ID
const secretAccessKey = R2_SECRET_ACCESS_KEY
const bucket = R2_BUCKET
const storagePlugin = s3Storage({
  collections: {
    multimedia: true,
  },
  config: {
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  },
  bucket,
})

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/brand/logo#Logo',
        Icon: '/brand/icon#Icon',
      },
    },
    theme: 'light',
    avatar: 'default',
    meta: {
      titleSuffix: '| Club 12',
    },
  },
  collections: [Usuarios, Multimedia, Subdominios, Paginas, CategoriasPosteos, Posteos],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  sharp,
  plugins: [payloadCloudPlugin(), storagePlugin],
  i18n: {
    fallbackLanguage: 'es',
    supportedLanguages: {
      es,
    },
  },
  cors: [NEXT_PUBLIC_WEB_URL, ADMIN_URL],
  csrf: [NEXT_PUBLIC_WEB_URL, ADMIN_URL],
})

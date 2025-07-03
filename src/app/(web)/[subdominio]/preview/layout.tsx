import { basePayload } from '@/lib/payload'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function PreviewLayout({ children }: PropsWithChildren) {
  const headersStore = await headers()
  const auth = await basePayload.auth({ headers: headersStore })

  if (!auth.user) {
    return notFound()
  }

  return children
}

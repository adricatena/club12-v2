import { basePayload } from '@/lib/payload'
import { notFound, redirect, RedirectType } from 'next/navigation'

export default async function RootPage() {
  const { docs, totalDocs } = await basePayload.find({
    collection: 'subdominios',
  })

  if (totalDocs) {
    return redirect(`/${docs[0].slug}`, RedirectType.replace) // Redirect to the first subdomain
  }

  return notFound()
}

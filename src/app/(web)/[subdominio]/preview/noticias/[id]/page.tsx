import { Posteo } from '@/components/posteo'
import { basePayload } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function NoticiasPreviewPage({ params }: Props) {
  const { id } = await params

  const posteo = await basePayload.findByID({
    collection: 'posteos',
    id,
    draft: true,
  })

  if (!posteo) {
    return notFound()
  }

  return <Posteo posteo={posteo} />
}

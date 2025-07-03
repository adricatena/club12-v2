import { Posteo } from '@/components/posteo'
import { basePayload } from '@/lib/payload'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params
  const data = await basePayload.find({
    collection: 'posteos',
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!data.docs || data.docs.length === 0) {
    return <div className="text-center">Página no encontrada</div>
  }

  return <Posteo posteo={data.docs[0]} />
}

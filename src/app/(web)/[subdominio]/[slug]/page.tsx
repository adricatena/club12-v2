import { Pagina } from '@/components/pagina'
import { basePayload } from '@/lib/payload'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const data = await basePayload.find({
    collection: 'paginas',
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

  return <Pagina pagina={data.docs[0]} />
}

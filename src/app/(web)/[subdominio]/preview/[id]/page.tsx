import { Pagina } from '@/components/pagina'
import { basePayload } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params

  const pagina = await basePayload.findByID({
    collection: 'paginas',
    id,
    draft: true,
  })

  console.log('pagina', pagina)

  if (!pagina) {
    return notFound()
  }

  return <Pagina pagina={pagina} />
}

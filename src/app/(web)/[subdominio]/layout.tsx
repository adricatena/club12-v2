import { Drawer } from '@/components/drawer'
import { Header } from '@/components/header'
import { basePayload } from '@/lib/payload'
import type { Multimedia } from '@/payload-types'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

type Props = {
  params: Promise<{ subdominio: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdominio } = await params

  const subdominios = await basePayload.find({
    collection: 'subdominios',
  })
  const currentSubdominio = subdominios.docs?.find(({ slug }) => slug === subdominio)

  return {
    icons: (currentSubdominio?.favicon as Multimedia).url,
    title: `Club12 ${currentSubdominio?.nombre}`,
  }
}

export default async function SubdominioLayout({ children, params }: PropsWithChildren & Props) {
  const { subdominio } = await params

  const subdominios = await basePayload.find({
    collection: 'subdominios',
  })

  const currentSubdominio = subdominios.docs?.find(({ slug }) => slug === subdominio)
  const otrosSubdominios = subdominios.docs?.filter(({ slug }) => slug !== subdominio)

  return (
    <>
      <div className="drawer-content flex flex-col">
        <Header subdominio={currentSubdominio!} otrosSubdominios={otrosSubdominios} />
        {children}
      </div>
      <Drawer subdominio={currentSubdominio!} otrosSubdominios={otrosSubdominios} />
    </>
  )
}

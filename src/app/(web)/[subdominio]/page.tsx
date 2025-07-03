/* eslint-disable @next/next/no-img-element */
import { basePayload } from '@/lib/payload'
import Link from 'next/link'

type Props = {
  params: Promise<{ subdominio: string }>
  searchParams: Promise<{ pagina?: string }>
}

export default async function SubdomainPage({ params, searchParams }: Props) {
  const { subdominio } = await params

  const { pagina } = await searchParams
  const currentPage = pagina ? parseInt(pagina) : 1

  const data = await basePayload.find({
    collection: 'posteos',
    depth: 2,
    page: currentPage,
    where: {
      and: [
        {
          'subdominio.slug': {
            equals: subdominio,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  })

  return (
    <main className="flex flex-col items-center justify-start gap-10 px-6 py-6">
      <section className="flex w-full max-w-screen-2xl flex-wrap items-center justify-center gap-10">
        {data?.docs?.map((posteo) => (
          <article
            key={posteo.id}
            className="bg-base-200 flex aspect-square h-96 flex-col gap-3 overflow-hidden rounded-sm p-5 shadow-xl"
          >
            <header className="h-0 flex-shrink-0 flex-grow">
              {posteo.imagen_destacada && typeof posteo.imagen_destacada !== 'string' ? (
                <Link href={`/${subdominio}/noticias/${posteo.slug.replace('/', '')}`}>
                  <img
                    alt={posteo.imagen_destacada?.alt}
                    src={posteo.imagen_destacada.url!}
                    className="h-full w-full rounded-sm object-cover object-top"
                  />
                </Link>
              ) : null}
            </header>
            <section className="flex flex-none flex-col items-start justify-start gap-2">
              <h2 className="text-left text-lg font-bold text-pretty">{posteo.titulo}</h2>
              <p className="line-clamp-4 text-sm">{posteo.descripcion}</p>
              <Link
                href={`/${subdominio}/noticias/${posteo.slug.replace('/', '')}`}
                className="btn btn-primary btn-sm self-end rounded-sm"
              >
                Ver mas
              </Link>
            </section>
          </article>
        ))}
      </section>
      {data?.totalDocs ? (
        <section className="join rounded-sm">
          {data?.hasPrevPage ? (
            <Link href={`?pagina=${data?.prevPage}`} className="btn join-item">
              «
            </Link>
          ) : null}
          {data?.page !== 1 && (
            <Link href={`?pagina=1`} className="btn join-item">
              1
            </Link>
          )}
          {(data?.prevPage ?? 0) > 2 && <button className="btn btn-disabled join-item">...</button>}
          {data?.hasPrevPage && data?.prevPage !== 1 ? (
            <Link href={`?pagina=${data?.prevPage}`} className="btn join-item">
              {data?.prevPage}
            </Link>
          ) : null}
          <Link href={`?pagina=${data?.page}`} className="btn join-item btn-active">
            {data?.page}
          </Link>
          {data?.hasNextPage && data?.nextPage !== data?.totalPages ? (
            <Link href={`?pagina=${data?.nextPage}`} className="btn join-item">
              {data?.nextPage}
            </Link>
          ) : null}
          {data?.hasNextPage && (data?.nextPage ?? data?.totalPages) < data?.totalPages - 1 ? (
            <button className="btn btn-disabled join-item">...</button>
          ) : null}
          {data?.page !== data?.totalPages && (
            <Link href={`?pagina=${data?.totalPages}`} className="btn join-item">
              {data?.totalPages}
            </Link>
          )}
          {data?.hasNextPage ? (
            <Link href={`?pagina=${data?.nextPage}`} className="btn join-item">
              »
            </Link>
          ) : null}
        </section>
      ) : null}
    </main>
  )
}

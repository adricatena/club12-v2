import type { Posteo as TPosteo } from '@/payload-types'
import { H1 } from '@/utils/classnames'
import { Bloque } from './bloque'

interface Props {
  posteo: TPosteo
}

export function Posteo({ posteo }: Props) {
  const postViejo = posteo.es_viejo && !posteo.editado

  return (
    <div>
      <main className="mx-auto flex flex-col items-center justify-center">
        <article className="flex w-full max-w-3xl flex-col gap-4 px-4 py-5">
          <h1 className={H1}>{posteo?.titulo}</h1>
          {postViejo ? (
            <div className="prose w-full">
              <section
                dangerouslySetInnerHTML={{ __html: posteo.contenido_html_raw ?? '' }}
              ></section>
            </div>
          ) : (
            posteo.bloques?.map((bloque) => <Bloque key={bloque.id} bloque={bloque} />)
          )}
        </article>
      </main>
      <aside></aside>
    </div>
  )
}

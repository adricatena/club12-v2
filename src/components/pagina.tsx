import type { Pagina as TPagina } from '@/payload-types'
import { H1 } from '@/utils/classnames'
import { Bloque } from './bloque'

interface Props {
  pagina: TPagina
}

export function Pagina({ pagina }: Props) {
  return (
    <div>
      <main className="mx-auto flex flex-col items-center justify-center">
        <article className="flex w-full max-w-3xl flex-col gap-4 px-4 py-5">
          <h1 className={H1}>{pagina?.titulo}</h1>
          {pagina.bloques?.map((bloque) => (
            <Bloque key={bloque.id} bloque={bloque} />
          ))}
        </article>
      </main>
      <aside></aside>
    </div>
  )
}

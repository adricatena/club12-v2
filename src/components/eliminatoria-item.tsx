/* eslint-disable @next/next/no-img-element */
import { twJoin } from 'tailwind-merge'

interface Props {
  alt: string
  src: string
  nombre: string
  puntos: number | string
  withoutBorder?: boolean
  penales: number | null
}

export function EliminatoriaItem({
  alt,
  src,
  nombre,
  puntos,
  withoutBorder = false,
  penales,
}: Props) {
  return (
    <span
      className={twJoin(
        'flex items-center justify-start gap-3 pr-3',
        !withoutBorder &&
          'border-neutral-content justify-between border-2 border-b-0 border-solid px-3',
      )}
    >
      <img alt={alt} src={src} className="mask mask-parallelogram h-10" />
      <p className="text-xl font-bold italic">{nombre.toUpperCase()}</p>
      <p className="text-end text-xl">{puntos ?? '-'}</p>
      {penales === null ? null : <p className="text-end text-xl">({penales})</p>}
    </span>
  )
}

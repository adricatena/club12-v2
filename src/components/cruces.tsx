import type { Multimedia, Cruces as TCruces } from '@/payload-types'
import { EliminatoriaItem } from './eliminatoria-item'

interface Props {
  cruces: TCruces
}

export function Cruces({ cruces }: Props) {
  const cantCrucesPorLado = Math.ceil((cruces?.length || 0) / 2)

  return (
    <div className="flex w-full flex-col items-start justify-center gap-5 p-4 sm:flex-row">
      <div className="flex w-full flex-col items-center justify-between gap-2">
        {cruces?.map((cruce, i) => {
          if (i >= cantCrucesPorLado) {
            return null
          }
          return (
            <div key={cruce.id} className="border-neutral-content w-full border-b-2">
              <EliminatoriaItem
                alt={(cruce?.logo_equipo_a as Multimedia).alt}
                src={(cruce.logo_equipo_a as Multimedia).url!}
                nombre={cruce.equipo_a}
                puntos={cruce.puntos_a ?? 0}
              />
              <EliminatoriaItem
                alt={(cruce.logo_equipo_b as Multimedia).alt}
                src={(cruce.logo_equipo_b as Multimedia).url!}
                nombre={cruce.equipo_b}
                puntos={cruce.puntos_b ?? 0}
              />
            </div>
          )
        })}
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-2">
        {cruces?.map((cruce, i) => {
          if (i < cantCrucesPorLado) {
            return null
          }
          return (
            <div key={cruce.id} className="border-neutral-content w-full border-b-2">
              <EliminatoriaItem
                alt={(cruce?.logo_equipo_a as Multimedia).alt}
                src={(cruce.logo_equipo_a as Multimedia).url!}
                nombre={cruce.equipo_a}
                puntos={cruce.puntos_a ?? 0}
              />
              <EliminatoriaItem
                alt={(cruce.logo_equipo_b as Multimedia).alt}
                src={(cruce.logo_equipo_b as Multimedia).url!}
                nombre={cruce.equipo_b}
                puntos={cruce.puntos_b ?? 0}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

import type {
  Eliminatoria,
  FixtureResultado,
  Multimedia,
  Sancionado,
  TablaGoleadores,
  TablaPosiciones,
  Contenido as TContenido,
} from '@/payload-types'
import { H2, H3, H4 } from '@/utils/classnames'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { Cruces } from './cruces'
import { EliminatoriaItem } from './eliminatoria-item'

interface Props {
  bloque:
    | Eliminatoria
    | TablaPosiciones
    | TablaGoleadores
    | FixtureResultado
    | TContenido
    | Sancionado
}

export function Bloque({ bloque }: Props) {
  if (bloque.blockType === 'contenido') {
    return (
      <div className="prose w-full">
        <section>
          <RichText data={bloque.contenido!} />
        </section>
      </div>
    )
  }

  if (bloque.blockType === 'eliminatoria') {
    return (
      <section className="w-full">
        <h2 className={H2}>{bloque?.blockName}</h2>
        <Cruces cruces={bloque.cruces ?? []} />
      </section>
    )
  }

  if (bloque.blockType === 'fixture_resultados') {
    const [V_CAROUSEL_H, V_CAROUSEL_MIN_H] =
      bloque?.blockType === 'fixture_resultados' && bloque?.fechas?.some((fecha) => !!fecha?.grupo)
        ? [twJoin('max-sm:h-[300px]'), twJoin('max-sm:min-h-[300px]')]
        : [twJoin('max-sm:h-72'), twJoin('max-sm:min-h-72')]

    return (
      <section className="w-full">
        <h2 className={H2}>{bloque.blockName}</h2>
        <div className={twJoin(['carousel max-sm:carousel-vertical w-full', V_CAROUSEL_H])}>
          {bloque.fechas?.map((fecha, i) => (
            <div
              key={fecha.id}
              className={twJoin([
                'carousel-item flex w-full flex-col overflow-x-auto',
                V_CAROUSEL_MIN_H,
              ])}
              id={`fecha${i + 1}`}
            >
              <h3 className={H3}>{fecha?.blockName}</h3>
              <h4 className={H4}>{fecha?.grupo}</h4>
              <table className="table overflow-x-auto">
                <thead>
                  <tr>
                    <td>Horario</td>
                    <td>Cancha</td>
                    <td>Equipo 1</td>
                    <td>Equipo 2</td>
                  </tr>
                </thead>
                <tbody>
                  {fecha.partidos?.map((partido) => (
                    <tr key={partido.id} className="hover">
                      <td>{partido.horario}</td>
                      <td>{partido.cancha}</td>
                      <td>
                        <EliminatoriaItem
                          withoutBorder
                          nombre={partido.equipo_a}
                          puntos={partido.puntos_a ?? ''}
                          src={(partido.logo_equipo_a as Multimedia).url!}
                          alt={(partido.logo_equipo_a as Multimedia).alt}
                        />
                      </td>
                      <td>
                        {partido.equipo_b && (
                          <EliminatoriaItem
                            withoutBorder
                            nombre={partido.equipo_b}
                            puntos={partido.puntos_b ?? ''}
                            src={(partido.logo_equipo_b as Multimedia)?.url ?? ''}
                            alt={(partido.logo_equipo_b as Multimedia)?.alt}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          {bloque.fechas?.map((fecha, i) => (
            <Link key={fecha.id} href={`#fecha${i + 1}`} className="btn btn-xs">
              {i + 1}
            </Link>
          ))}
        </div>
      </section>
    )
  }

  if (bloque.blockType === 'sancionados') {
    return (
      <section className="w-full overflow-x-auto">
        <h2 className={H2}>{bloque?.blockName}</h2>
        <table className="table">
          <thead>
            <tr>
              <td>Jugador</td>
              <td>Equipo</td>
              <td>Sancion</td>
              <td>Motivo</td>
              <td>Fechas</td>
            </tr>
          </thead>
          <tbody>
            {bloque.jugadores?.map((jugador) => (
              <tr key={jugador.id} className="hover">
                <td>{jugador?.blockName}</td>
                <td>{jugador.equipo}</td>
                <td>{jugador.sancion}</td>
                <td>{jugador.motivo}</td>
                <td>{jugador.fechas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }

  if (bloque.blockType === 'tabla_goleadores') {
    return (
      <section className="w-full overflow-x-auto">
        <h2 className={H2}>{bloque?.blockName}</h2>
        <table className="table">
          <thead>
            <tr>
              <td />
              <td>Jugador</td>
              <td>Equipo</td>
              {bloque.fechas?.map((fecha) => (
                <td key={fecha.id}>{fecha.nombre}</td>
              ))}
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {bloque.jugadores?.map((jugador, i) => {
              let totalPuntos = 0
              return (
                <tr key={jugador.id} className="hover">
                  <td>{i + 1}</td>
                  <td>{jugador?.blockName}</td>
                  <td>{jugador.equipo}</td>
                  {jugador.fechas?.map((fecha) => {
                    totalPuntos += fecha.puntos
                    return <td key={fecha.id}>{fecha.puntos}</td>
                  })}
                  <td>{totalPuntos}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    )
  }

  if (bloque.blockType === 'tabla_posiciones') {
    return (
      <section className="w-full overflow-x-auto">
        <h2 className={H2}>{bloque?.blockName}</h2>
        <h3 className={H3}>{bloque?.grupo}</h3>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              {bloque.con_empate ? <th>PE</th> : null}
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DIF</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {bloque.equipos?.map((equipo, i) => (
              <tr key={equipo.id} className="hover">
                <td>{i + 1}</td>
                <td>{equipo.blockName}</td>
                <td>{equipo.partidos_jugados}</td>
                <td>{equipo.partidos_ganados}</td>
                {bloque.con_empate ? <td>{equipo.partidos_empatados}</td> : null}
                <td>{equipo.partidos_perdidos}</td>
                <td>{equipo.goles_favor}</td>
                <td>{equipo.goles_contra}</td>
                <td>{(equipo.goles_favor ?? 0) - (equipo.goles_contra ?? 0)}</td>
                <td>{equipo.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }

  return 'Bloque no reconocido'
}

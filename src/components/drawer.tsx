import type { Subdominio } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { SECONDARY_LOGO_HEIGHT, SECONDARY_LOGO_HEIGHT_CLASS } from './header'

type Props = {
  subdominio: Subdominio
  otrosSubdominios: Subdominio[]
}
export function Drawer({ subdominio, otrosSubdominios }: Props) {
  return (
    <nav className="drawer-side">
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4">
        {subdominio?.navegacion?.map((navegacion) =>
          navegacion.blockType === 'enlace' ? (
            <li key={navegacion.id}>
              <Link
                href={`/${subdominio.slug}/${navegacion.url.replace('/', '')}`}
                className="rounded-sm"
              >
                {navegacion?.blockName?.toUpperCase()}
              </Link>
            </li>
          ) : (
            <li key={navegacion.id}>
              <details open>
                <summary className="rounded-sm">{navegacion?.blockName?.toUpperCase()}</summary>
                <ul>
                  {navegacion.menu?.map((menu) =>
                    menu.blockType === 'enlace' ? (
                      <li key={menu.id}>
                        <Link
                          href={`/${subdominio.slug}/${menu.url.replace('/', '')}`}
                          className="rounded-sm"
                        >
                          {menu?.blockName?.toUpperCase()}
                        </Link>
                      </li>
                    ) : (
                      <li key={menu.id}>
                        <details open>
                          <summary className="rounded-sm">{menu.blockName?.toUpperCase()}</summary>
                          <ul>
                            {menu.submenu?.map((submenu) => (
                              <li key={submenu.id}>
                                <Link
                                  href={`/${subdominio.slug}/${submenu.url.replace('/', '')}`}
                                  className="rounded-sm"
                                >
                                  {submenu?.blockName?.toUpperCase()}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    ),
                  )}
                </ul>
              </details>
            </li>
          ),
        )}
        <div className="divider"></div>
        <li className="flex flex-row items-center justify-start">
          {otrosSubdominios.map((otroSubdominio) =>
            typeof otroSubdominio.logo === 'string' ? null : (
              <Link href={`/${otroSubdominio.slug}`} key={otroSubdominio.id}>
                <Image
                  alt={otroSubdominio.logo.alt}
                  src={otroSubdominio.logo.url!}
                  height={SECONDARY_LOGO_HEIGHT}
                  width={SECONDARY_LOGO_HEIGHT}
                  className={twJoin(
                    SECONDARY_LOGO_HEIGHT_CLASS,
                    'aspect-square rounded-full object-contain',
                  )}
                />
              </Link>
            ),
          )}
        </li>
      </ul>
    </nav>
  )
}

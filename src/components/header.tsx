import type { Subdominio } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { ThemeToggle } from './theme-toggle'

const HEADER_HEIGHT = twJoin('h-16')
const LOGO_HEIGHT_CLASS = twJoin('h-14')
const LOGO_HEIGHT = 56
export const SECONDARY_LOGO_HEIGHT_CLASS = twJoin('h-10')
export const SECONDARY_LOGO_HEIGHT = 40

const LINK_BTN = twJoin('btn btn-ghost rounded-sm')
const SUBLINK_BTN = twJoin('btn rounded-sm')

const DD_CONTENT = twJoin('menu dropdown-content w-max p-0')
const DD_CONTENT_ITEM = twJoin('w-full mb-1')

type Props = { subdominio: Subdominio; otrosSubdominios: Subdominio[] }
export function Header({ subdominio, otrosSubdominios }: Props) {
  return (
    <header className="navbar bg-base-300 sticky top-0 z-50 w-full">
      <div
        className={twJoin('flex w-full items-center justify-between px-4 md:hidden', HEADER_HEIGHT)}
      >
        {typeof subdominio.logo === 'string' ? null : (
          <Link href={`/${subdominio.slug}`}>
            <Image
              alt={subdominio.logo.alt}
              src={subdominio.logo.url!}
              height={LOGO_HEIGHT}
              width={LOGO_HEIGHT}
              className={twJoin(LOGO_HEIGHT_CLASS, 'aspect-square rounded-full')}
            />
          </Link>
        )}
        <div>
          <label className="swap swap-rotate h-6 w-6 justify-self-end">
            <ThemeToggle />
          </label>
          <label
            htmlFor="my-drawer-3"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
      <nav className={twJoin(['hidden w-full items-center justify-center md:flex', HEADER_HEIGHT])}>
        {typeof subdominio.logo === 'string' ? null : (
          <Link href={`/${subdominio.slug}/`} className="mr-5">
            <Image
              alt={subdominio.logo.alt}
              src={subdominio.logo.url!}
              height={LOGO_HEIGHT}
              width={LOGO_HEIGHT}
              className={twJoin(LOGO_HEIGHT_CLASS, 'aspect-square rounded-full')}
            />
          </Link>
        )}
        {subdominio?.navegacion?.map((navegacion) =>
          navegacion.blockType === 'enlace' ? (
            <Link
              key={navegacion.id}
              href={`/${subdominio.slug}/${navegacion.url.replace('/', '')}`}
              className={LINK_BTN}
            >
              {navegacion?.blockName?.toUpperCase()}
            </Link>
          ) : (
            <div className="dropdown dropdown-hover" key={navegacion.id}>
              <div tab-index={0} role="button" className={LINK_BTN}>
                {navegacion?.blockName?.toUpperCase()}
              </div>
              <ul tab-index={0} className={DD_CONTENT}>
                {navegacion.menu?.map((menu) =>
                  menu.blockType === 'enlace' ? (
                    <li className={DD_CONTENT_ITEM} key={menu.id}>
                      <Link
                        href={`/${subdominio.slug}/${menu.url.replace('/', '')}`}
                        className={SUBLINK_BTN}
                      >
                        {menu?.blockName?.toUpperCase()}
                      </Link>
                    </li>
                  ) : (
                    <li className={DD_CONTENT_ITEM} key={menu.id}>
                      <details className="dropdown dropdown-left">
                        <summary
                          className={twJoin([SUBLINK_BTN, 'grid h-min place-content-center'])}
                        >
                          {menu?.blockName?.toUpperCase()}
                        </summary>
                        <ul className={DD_CONTENT}>
                          {menu.submenu?.map((submenu) => (
                            <li className={DD_CONTENT_ITEM} key={submenu.id}>
                              <Link
                                href={`/${subdominio.slug}/${submenu.url.replace('/', '')}`}
                                className={twJoin([SUBLINK_BTN, 'mr-1'])}
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
            </div>
          ),
        )}
        {otrosSubdominios.map((otroSubdominio) =>
          typeof otroSubdominio.logo === 'string' ? null : (
            <Link key={otroSubdominio.id} href={`/${otroSubdominio.slug}`} className="ml-3">
              <Image
                alt={otroSubdominio.logo.alt}
                src={otroSubdominio.logo.url!}
                height={SECONDARY_LOGO_HEIGHT}
                width={SECONDARY_LOGO_HEIGHT}
                className={twJoin(SECONDARY_LOGO_HEIGHT_CLASS, 'aspect-square rounded-full')}
              />
            </Link>
          ),
        )}
      </nav>
      <label className="swap-rotate md:swap hidden h-6 w-6 justify-self-end pr-5">
        <ThemeToggle />
      </label>
    </header>
  )
}

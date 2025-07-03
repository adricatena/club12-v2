import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Club12',
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

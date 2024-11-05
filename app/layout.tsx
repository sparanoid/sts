import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Gatus Frontend',
  description:
    process.env.NEXT_PUBLIC_SITE_DESC || 'A fully open-source status page for Gatus backend',
  icons: process.env.NEXT_PUBLIC_SITE_LOGO || '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // https://github.com/pacocoursey/next-themes#with-app
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

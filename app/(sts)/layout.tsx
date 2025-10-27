import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import { TooltipProvider } from '@/components/ui/tooltip'

import './globals.css'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Gatus Frontend',
  description: process.env.NEXT_PUBLIC_SITE_DESC || 'A fully open-source status page for Gatus backend',
  icons: process.env.NEXT_PUBLIC_SITE_LOGO || '',
  alternates: {
    types: {
      'application/atom+xml': '/history.atom',
    },
  },
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
        <ThemeProvider attribute='data-theme'>
          <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

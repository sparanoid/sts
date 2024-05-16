import type { Metadata } from 'next'

// import { TooltipProvider } from '@/components/ui/tooltip-radix'

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
    <html lang='en'>
      {/* <TooltipProvider delayDuration={0} disableHoverableContent={true}> */}
      <body>{children}</body>
      {/* </TooltipProvider> */}
    </html>
  )
}

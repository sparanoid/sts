import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: process.env.SITE_TITLE || 'Gatus Frontend',
  description: process.env.SITE_DESC || 'A fully open-source status page for Gatus backend',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

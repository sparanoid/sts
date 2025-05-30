import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme-switch'
import { StatusList } from '@/components/status-list'

export default function Home() {
  return (
    <main className='container mx-auto max-w-(--breakpoint-md) px-2 py-4 sm:px-4'>
      <nav className='flex items-center justify-center gap-2 font-medium'>
        {process.env.NEXT_PUBLIC_SITE_BACK_URL && process.env.NEXT_PUBLIC_SITE_BACK_TITLE ? (
          <>
            <Link href={process.env.NEXT_PUBLIC_SITE_BACK_URL}>
              {process.env.NEXT_PUBLIC_SITE_LOGO ? (
                <picture>
                  <img
                    src={process.env.NEXT_PUBLIC_SITE_LOGO}
                    className='size-6'
                    alt={process.env.NEXT_PUBLIC_SITE_BACK_TITLE}
                  />
                </picture>
              ) : (
                <span>{process.env.NEXT_PUBLIC_SITE_BACK_TITLE}</span>
              )}
            </Link>
            <span className='bg-fg/10 h-4 w-[1px]' />
          </>
        ) : null}
        <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}>{process.env.NEXT_PUBLIC_SITE_TITLE}</Link>
      </nav>

      <StatusList />

      <footer className='text-fg/80 grid justify-items-center gap-2 py-8 text-center text-sm'>
        <div>{process.env.NEXT_PUBLIC_FOOTER_TEXT || 'sts, a fully open-source status page for Gatus backend'}</div>
        <ThemeSwitch />
      </footer>
    </main>
  )
}

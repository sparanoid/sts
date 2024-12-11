import Link from 'next/link'
import { ThemeSwitch } from '@/components/theme-switch'
import { StatusList } from '@/components/status-list'

export default function Home() {
  return (
    <main className='container mx-auto max-w-screen-md px-2 py-4 sm:px-4'>
      <nav className='flex gap-2 items-center justify-center'>
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
            <span className='w-[1px] h-4 bg-fg/10' />
          </>
        ) : null}
        <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}>
          {process.env.NEXT_PUBLIC_SITE_TITLE}
        </Link>
      </nav>

      <StatusList />

      <footer className='grid gap-2 justify-items-center text-center py-8 text-sm text-fg/80'>
        <div>
          {process.env.NEXT_PUBLIC_FOOTER_TEXT ||
            'sts, a fully open-source status page for Gatus backend'}
        </div>
        <ThemeSwitch />
      </footer>
    </main>
  )
}

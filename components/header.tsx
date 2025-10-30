import Link from 'next/link'

export function Header() {
  return (
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
          <span className='bg-fg/10 h-4 w-px' />
        </>
      ) : null}
      <Link href={process.env.NEXT_PUBLIC_SITE_URL || '/'}>{process.env.NEXT_PUBLIC_SITE_TITLE}</Link>
    </nav>
  )
}

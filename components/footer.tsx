import { ThemeSwitch } from '@/components/theme-switch'

export function Footer() {
  return (
    <footer className='text-fg/80 grid justify-items-center gap-2 py-8 text-center text-sm'>
      <div>{process.env.NEXT_PUBLIC_FOOTER_TEXT || 'sts, a fully open-source status page with Gatus and Payload'}</div>
      <ThemeSwitch />
    </footer>
  )
}

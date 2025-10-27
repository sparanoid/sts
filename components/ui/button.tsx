'use client'

import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

import { Loading } from '@/components/ui/loading'

const buttonVariantsConfig = {
  // Should match Input, Toggle
  size: {
    sm: 'text-xs rounded-sm h-6 px-2 has-[>svg]:px-1.5 [&>svg]:size-3',
    default: 'text-sm rounded-md h-8 px-3 has-[>svg]:px-2 [&>svg]:size-4',
    lg: 'text-base rounded-md gap-2 h-10 px-4 has-[>svg]:px-3 [&>svg]:size-5',
    'icon-sm': 'rounded-sm size-6 [&>svg]:size-4',
    icon: 'rounded-md size-8 [&>svg]:size-5',
    'icon-lg': 'rounded-md size-10 [&>svg]:size-6',
  },
  variant: {
    // map to "secondary" in shadcn
    default: '',
    // map to "primary" in shadcn
    solid: '',
    outline: 'border bg-transparent focus-visible:border-current shadow-xs',
    ghost: 'text-fg not-disabled:hover:text-ac bg-transparent',
    link: 'underline-offset-2 hover:underline',
  },
  tint: {
    default: 'text-fg focus-visible:ring-fg/30',
    accent: 'text-ac focus-visible:ring-ac/30',
    gray: 'text-gray-500 focus-visible:ring-gray-500/30',
    red: 'text-red-500 focus-visible:ring-red-500/30',
    orange: 'text-orange-500 focus-visible:ring-orange-500/30',
    amber: 'text-amber-500 focus-visible:ring-amber-500/30',
    yellow: 'text-yellow-500 focus-visible:ring-yellow-500/30',
    lime: 'text-lime-500 focus-visible:ring-lime-500/30',
    green: 'text-green-500 focus-visible:ring-green-500/30',
    emerald: 'text-emerald-500 focus-visible:ring-emerald-500/30',
    teal: 'text-teal-500 focus-visible:ring-teal-500/30',
    cyan: 'text-cyan-500 focus-visible:ring-cyan-500/30',
    sky: 'text-sky-500 focus-visible:ring-sky-500/30',
    blue: 'text-blue-500 focus-visible:ring-blue-500/30',
    indigo: 'text-indigo-500 focus-visible:ring-indigo-500/30',
    violet: 'text-violet-500 focus-visible:ring-violet-500/30',
    purple: 'text-purple-500 focus-visible:ring-purple-500/30',
    fuchsia: 'text-fuchsia-500 focus-visible:ring-fuchsia-500/30',
    pink: 'text-pink-500 focus-visible:ring-pink-500/30',
    rose: 'text-rose-500 focus-visible:ring-rose-500/30',
    white: 'text-white focus-visible:ring-white/30',
    black: 'text-black focus-visible:ring-black/30',
  },
}

const buttonVariants = cva(
  'appearance-none inline-flex items-center gap-1 cursor-pointer justify-center whitespace-nowrap font-medium focus-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: buttonVariantsConfig,
    // prettier-ignore
    // biome-ignore format: keep long lines for readability
    compoundVariants: [
      { variant: 'default', tint: 'default', className: 'bg-fg/5 not-disabled:hover:bg-fg/10' },
      { variant: 'default', tint: 'accent', className: 'bg-ac/10 not-disabled:hover:bg-ac/20' },
      { variant: 'default', tint: 'gray', className: 'bg-gray-500/10 not-disabled:hover:bg-gray-500/20', },
      { variant: 'default', tint: 'red', className: 'bg-red-500/10 not-disabled:hover:bg-red-500/20', },
      { variant: 'default', tint: 'orange', className: 'bg-orange-500/10 not-disabled:hover:bg-orange-500/20', },
      { variant: 'default', tint: 'amber', className: 'bg-amber-500/10 not-disabled:hover:bg-amber-500/20', },
      { variant: 'default', tint: 'yellow', className: 'bg-yellow-500/10 not-disabled:hover:bg-yellow-500/20', },
      { variant: 'default', tint: 'lime', className: 'bg-lime-500/10 not-disabled:hover:bg-lime-500/20', },
      { variant: 'default', tint: 'green', className: 'bg-green-500/10 not-disabled:hover:bg-green-500/20', },
      { variant: 'default', tint: 'emerald', className: 'bg-emerald-500/10 not-disabled:hover:bg-emerald-500/20', },
      { variant: 'default', tint: 'teal', className: 'bg-teal-500/10 not-disabled:hover:bg-teal-500/20', },
      { variant: 'default', tint: 'cyan', className: 'bg-cyan-500/10 not-disabled:hover:bg-cyan-500/20', },
      { variant: 'default', tint: 'sky', className: 'bg-sky-500/10 not-disabled:hover:bg-sky-500/20', },
      { variant: 'default', tint: 'blue', className: 'bg-blue-500/10 not-disabled:hover:bg-blue-500/20', },
      { variant: 'default', tint: 'indigo', className: 'bg-indigo-500/10 not-disabled:hover:bg-indigo-500/20', },
      { variant: 'default', tint: 'violet', className: 'bg-violet-500/10 not-disabled:hover:bg-violet-500/20', },
      { variant: 'default', tint: 'purple', className: 'bg-purple-500/10 not-disabled:hover:bg-purple-500/20', },
      { variant: 'default', tint: 'fuchsia', className: 'bg-fuchsia-500/10 not-disabled:hover:bg-fuchsia-500/20', },
      { variant: 'default', tint: 'pink', className: 'bg-pink-500/10 not-disabled:hover:bg-pink-500/20', },
      { variant: 'default', tint: 'rose', className: 'bg-rose-500/10 not-disabled:hover:bg-rose-500/20', },
      { variant: 'default', tint: 'white', className: 'bg-white/10 not-disabled:hover:bg-white/20' },
      { variant: 'default', tint: 'black', className: 'bg-black/10 not-disabled:hover:bg-black/20' },

      // Solid
      { variant: 'solid', tint: 'default', className: 'bg-fg text-bg not-disabled:hover:bg-fg/80' },
      { variant: 'solid', tint: 'accent', className: 'bg-ac text-bg not-disabled:hover:bg-ac/80' },
      { variant: 'solid', tint: 'gray', className: 'bg-gray-500 text-bg not-disabled:hover:bg-gray-400', },
      { variant: 'solid', tint: 'red', className: 'bg-red-500  text-bg not-disabled:hover:bg-red-400' },
      { variant: 'solid', tint: 'orange', className: 'bg-orange-500 text-bg not-disabled:hover:bg-orange-400', },
      { variant: 'solid', tint: 'amber', className: 'bg-amber-500 text-bg not-disabled:hover:bg-amber-400', },
      { variant: 'solid', tint: 'yellow', className: 'bg-yellow-500 text-bg not-disabled:hover:bg-yellow-400', },
      { variant: 'solid', tint: 'lime', className: 'bg-lime-500 text-bg not-disabled:hover:bg-lime-400', },
      { variant: 'solid', tint: 'green', className: 'bg-green-500 text-bg not-disabled:hover:bg-green-400', },
      { variant: 'solid', tint: 'emerald', className: 'bg-emerald-500 text-bg not-disabled:hover:bg-emerald-400', },
      { variant: 'solid', tint: 'teal', className: 'bg-teal-500 text-bg not-disabled:hover:bg-teal-400', },
      { variant: 'solid', tint: 'cyan', className: 'bg-cyan-500 text-bg not-disabled:hover:bg-cyan-400', },
      { variant: 'solid', tint: 'sky', className: 'bg-sky-500 text-bg not-disabled:hover:bg-sky-400' },
      { variant: 'solid', tint: 'blue', className: 'bg-blue-500 text-bg not-disabled:hover:bg-blue-400', },
      { variant: 'solid', tint: 'indigo', className: 'bg-indigo-500 text-bg not-disabled:hover:bg-indigo-400', },
      { variant: 'solid', tint: 'violet', className: 'bg-violet-500 text-bg not-disabled:hover:bg-violet-400', },
      { variant: 'solid', tint: 'purple', className: 'bg-purple-500 text-bg not-disabled:hover:bg-purple-400', },
      { variant: 'solid', tint: 'fuchsia', className: 'bg-fuchsia-500 text-bg not-disabled:hover:bg-fuchsia-400', },
      { variant: 'solid', tint: 'pink', className: 'bg-pink-500 text-bg not-disabled:hover:bg-pink-400', },
      { variant: 'solid', tint: 'rose', className: 'bg-rose-500 text-bg not-disabled:hover:bg-rose-400', },
      { variant: 'solid', tint: 'white', className: 'bg-white text-black not-disabled:hover:bg-white/80' },
      { variant: 'solid', tint: 'black', className: 'bg-black text-white not-disabled:hover:bg-black/80' },

      // Outline
      { variant: 'outline', tint: 'default', className: 'border-fg/30 not-disabled:hover:bg-fg/5 data-[state=open]:bg-fg/5', },
      { variant: 'outline', tint: 'accent', className: 'border-ac not-disabled:hover:bg-ac/10', },
      { variant: 'outline', tint: 'gray', className: 'border-gray-500 not-disabled:hover:bg-gray-400/10', },
      { variant: 'outline', tint: 'red', className: 'border-red-500 not-disabled:hover:bg-red-400/10', },
      { variant: 'outline', tint: 'orange', className: 'border-orange-500 not-disabled:hover:bg-orange-400/10', },
      { variant: 'outline', tint: 'amber', className: 'border-amber-500 not-disabled:hover:bg-amber-400/10', },
      { variant: 'outline', tint: 'yellow', className: 'border-yellow-500 not-disabled:hover:bg-yellow-400/10', },
      { variant: 'outline', tint: 'lime', className: 'border-lime-500 not-disabled:hover:bg-lime-400/10', },
      { variant: 'outline', tint: 'green', className: 'border-green-500 not-disabled:hover:bg-green-400/10', },
      { variant: 'outline', tint: 'emerald', className: 'border-emerald-500 not-disabled:hover:bg-emerald-400/10', },
      { variant: 'outline', tint: 'teal', className: 'border-teal-500 not-disabled:hover:bg-teal-400/10', },
      { variant: 'outline', tint: 'cyan', className: 'border-cyan-500 not-disabled:hover:bg-cyan-400/10', },
      { variant: 'outline', tint: 'sky', className: 'border-sky-500 not-disabled:hover:bg-sky-400/10', },
      { variant: 'outline', tint: 'blue', className: 'border-blue-500 not-disabled:hover:bg-blue-400/10', },
      { variant: 'outline', tint: 'indigo', className: 'border-indigo-500 not-disabled:hover:bg-indigo-400/10', },
      { variant: 'outline', tint: 'violet', className: 'border-violet-500 not-disabled:hover:bg-violet-400/10', },
      { variant: 'outline', tint: 'purple', className: 'border-purple-500 not-disabled:hover:bg-purple-400/10', },
      { variant: 'outline', tint: 'fuchsia', className: 'border-fuchsia-500 not-disabled:hover:bg-fuchsia-400/10', },
      { variant: 'outline', tint: 'pink', className: 'border-pink-500 not-disabled:hover:bg-pink-400/10', },
      { variant: 'outline', tint: 'rose', className: 'border-rose-500 not-disabled:hover:bg-rose-400/10', },
      { variant: 'outline', tint: 'white', className: 'border-white not-disabled:hover:bg-white/10', },
      { variant: 'outline', tint: 'black', className: 'border-black not-disabled:hover:bg-black/10', },

      // Ghost
      { variant: 'ghost', tint: 'default', className: 'not-disabled:hover:text-ac not-disabled:hover:bg-ac/10 data-[state=open]:bg-ac/10 data-[state=open]:text-ac' },
      { variant: 'ghost', tint: 'accent', className: 'not-disabled:hover:text-ac/80 not-disabled:hover:bg-ac/10' },
      { variant: 'ghost', tint: 'gray', className: 'not-disabled:hover:text-gray-500 not-disabled:hover:bg-gray-500/10', },
      { variant: 'ghost', tint: 'red', className: 'not-disabled:hover:text-red-500 not-disabled:hover:bg-red-500/10' },
      { variant: 'ghost', tint: 'orange', className: 'not-disabled:hover:text-orange-500 not-disabled:hover:bg-orange-500/10' },
      { variant: 'ghost', tint: 'amber', className: 'not-disabled:hover:text-amber-500 not-disabled:hover:bg-amber-500/10' },
      { variant: 'ghost', tint: 'yellow', className: 'not-disabled:hover:text-yellow-500 not-disabled:hover:bg-yellow-500/10' },
      { variant: 'ghost', tint: 'lime', className: 'not-disabled:hover:text-lime-500 not-disabled:hover:bg-lime-500/10' },
      { variant: 'ghost', tint: 'green', className: 'not-disabled:hover:text-green-500 not-disabled:hover:bg-green-500/10' },
      { variant: 'ghost', tint: 'emerald', className: 'not-disabled:hover:text-emerald-500 not-disabled:hover:bg-emerald-500/10' },
      { variant: 'ghost', tint: 'teal', className: 'not-disabled:hover:text-teal-500 not-disabled:hover:bg-teal-500/10' },
      { variant: 'ghost', tint: 'cyan', className: 'not-disabled:hover:text-cyan-500 not-disabled:hover:bg-cyan-500/10' },
      { variant: 'ghost', tint: 'sky', className: 'not-disabled:hover:text-sky-500 not-disabled:hover:bg-sky-500/10' },
      { variant: 'ghost', tint: 'blue', className: 'not-disabled:hover:text-blue-500 not-disabled:hover:bg-blue-500/10' },
      { variant: 'ghost', tint: 'indigo', className: 'not-disabled:hover:text-indigo-500 not-disabled:hover:bg-indigo-500/10' },
      { variant: 'ghost', tint: 'violet', className: 'not-disabled:hover:text-violet-500 not-disabled:hover:bg-violet-500/10' },
      { variant: 'ghost', tint: 'purple', className: 'not-disabled:hover:text-purple-500 not-disabled:hover:bg-purple-500/10' },
      { variant: 'ghost', tint: 'fuchsia', className: 'not-disabled:hover:text-fuchsia-500 not-disabled:hover:bg-fuchsia-500/10' },
      { variant: 'ghost', tint: 'pink', className: 'not-disabled:hover:text-pink-500 not-disabled:hover:bg-pink-500/10' },
      { variant: 'ghost', tint: 'rose', className: 'not-disabled:hover:text-rose-500 not-disabled:hover:bg-rose-500/10' },
      { variant: 'ghost', tint: 'white', className: 'not-disabled:hover:text-white/80 not-disabled:hover:bg-white/10' },
      { variant: 'ghost', tint: 'black', className: 'not-disabled:hover:text-black/80 not-disabled:hover:bg-black/10' },

      // Link
      { variant: 'link', tint: 'default', className: 'not-disabled:hover:text-ac data-[state=open]:text-ac' },
      { variant: 'link', tint: 'accent', className: 'not-disabled:hover:text-ac/80' },
      { variant: 'link', tint: 'gray', className: 'not-disabled:hover:text-gray-500' },
      { variant: 'link', tint: 'red', className: 'not-disabled:hover:text-red-500' },
      { variant: 'link', tint: 'orange', className: 'not-disabled:hover:text-orange-500' },
      { variant: 'link', tint: 'amber', className: 'not-disabled:hover:text-amber-500' },
      { variant: 'link', tint: 'yellow', className: 'not-disabled:hover:text-yellow-500' },
      { variant: 'link', tint: 'lime', className: 'not-disabled:hover:text-lime-500' },
      { variant: 'link', tint: 'green', className: 'not-disabled:hover:text-green-500' },
      { variant: 'link', tint: 'emerald', className: 'not-disabled:hover:text-emerald-500' },
      { variant: 'link', tint: 'teal', className: 'not-disabled:hover:text-teal-500' },
      { variant: 'link', tint: 'cyan', className: 'not-disabled:hover:text-cyan-500' },
      { variant: 'link', tint: 'sky', className: 'not-disabled:hover:text-sky-500' },
      { variant: 'link', tint: 'blue', className: 'not-disabled:hover:text-blue-500' },
      { variant: 'link', tint: 'indigo', className: 'not-disabled:hover:text-indigo-500' },
      { variant: 'link', tint: 'violet', className: 'not-disabled:hover:text-violet-500' },
      { variant: 'link', tint: 'purple', className: 'not-disabled:hover:text-purple-500' },
      { variant: 'link', tint: 'fuchsia', className: 'not-disabled:hover:text-fuchsia-500' },
      { variant: 'link', tint: 'pink', className: 'not-disabled:hover:text-pink-500' },
      { variant: 'link', tint: 'rose', className: 'not-disabled:hover:text-rose-500' },
      { variant: 'link', tint: 'white', className: 'not-disabled:hover:text-white/80' },
      { variant: 'link', tint: 'black', className: 'not-disabled:hover:text-black/80' },

      // Dot variant padding adjustments
      // { variant: 'dot', size: 'default', className: 'pl-[1.125rem]' },
      // { variant: 'dot', size: 'sm', className: 'pl-[0.85rem]' },
      // { variant: 'dot', size: 'lg', className: 'pl-5' },
    ],
    defaultVariants: {
      size: 'default',
      variant: 'default',
      tint: 'default',
    },
  }
)

export interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /**
   * @link https://www.radix-ui.com/primitives/docs/utilities/slot
   */
  asChild?: boolean
  loading?: boolean
  /** @deprecated use children directly instead */
  leftSection?: React.ReactNode
  /** @deprecated use children directly instead */
  leftSectionClassName?: string
  /** @deprecated use children directly instead */
  rightSection?: React.ReactNode
  /** @deprecated use children directly instead */
  rightSectionClassName?: string
}

function Button({
  className,
  variant,
  size,
  tint,
  asChild = false,
  loading = false,
  leftSection,
  leftSectionClassName,
  rightSection,
  rightSectionClassName,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, tint, className }), loading && 'cursor-wait')}
      {...props}
    >
      {leftSection ? (
        <div className={cn('flex items-center justify-center', leftSectionClassName)}>{leftSection}</div>
      ) : null}

      <Slottable>{children}</Slottable>

      {loading && <Loading />}
      {rightSection ? (
        <div className={cn('flex items-center justify-center', rightSectionClassName)}>{rightSection}</div>
      ) : null}
    </Comp>
  )
}

export { Button, buttonVariants, buttonVariantsConfig }

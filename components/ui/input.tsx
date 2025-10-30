import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/utils/cn'

const inputVariants = cva(
  [
    'w-full appearance-none border bg-transparent',
    'text-fg shadow-xs outline-hidden placeholder:text-fg/40',
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-sm',
    'focus-ring',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    'aria-invalid:ring-rose-500/30 aria-invalid:border-rose-500',

    // Hide native spinner buttons
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  ],
  {
    variants: {
      // Should match Button
      inputSize: {
        sm: 'h-6 px-1.5 text-xs rounded-sm',
        md: 'h-8 px-2 text-sm rounded-md',
        lg: 'h-10 px-3 text-base rounded-md',
      },
    },
    defaultVariants: {
      inputSize: 'md',
    },
  }
)

export interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, type, inputSize, ...props }: InputProps) {
  return <input type={type} data-slot='input' className={cn(inputVariants({ inputSize }), className)} {...props} />
}
export { Input }

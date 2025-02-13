'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
// import { ChevronDown } from 'lucide-react'

import clsx from 'clsx'

const Accordion = AccordionPrimitive.Root

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={clsx('[&[data-state=open]+[data-state=open]]:border-text/10 border-t border-transparent', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='m-0 flex' asChild>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={clsx(
          'data-[state=closed]:bg-fg/5 flex flex-1 items-center justify-between px-4 py-3 font-semibold transition-all data-[state=closed]:rounded-lg [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        {/* <ChevronDown className='h-4 w-4 shrink-0 transition-transform duration-200' /> */}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all'
      {...props}
    >
      <div className={clsx('pb-2', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

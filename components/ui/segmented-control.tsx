'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/cn'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const segmentedControlVariants = cva('bg-fg/5 gap-0', {
  variants: {
    size: {
      sm: 'rounded-sm',
      default: 'rounded-md',
      lg: 'rounded-md',
      icon: 'rounded-md',
      'icon-sm': 'rounded-md',
      'icon-lg': 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const segmentedControlItemVariants = cva(
  'text-fg/60 hover:text-fg border border-transparent relative z-10 bg-transparent data-[state=on]:bg-transparent hover:bg-transparent',
  {
    variants: {
      tint: {
        default: 'data-[state=on]:text-fg',
        accent: 'data-[state=on]:text-bg',
      },
    },
    defaultVariants: {
      tint: 'default',
    },
  }
)

const SegmentedControlContext = React.createContext<{
  tint?: VariantProps<typeof segmentedControlItemVariants>['tint']
}>({})

function SegmentedControl({
  className,
  size,
  variant = 'default',
  tint = 'default',
  children,
  value: controlledValue,
  defaultValue,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroup>, 'type' | 'value' | 'defaultValue' | 'onValueChange'> & {
  tint?: VariantProps<typeof segmentedControlItemVariants>['tint']
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({})

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      // Prevent deselection - only update if newValue is not empty
      if (newValue) {
        if (!isControlled) {
          setInternalValue(newValue)
        }
        onValueChange?.(newValue)
      }
    },
    [onValueChange, isControlled]
  )

  // Update indicator position when value changes
  React.useLayoutEffect(() => {
    if (!containerRef.current || !value) return

    const updateIndicator = () => {
      const activeButton = containerRef.current?.querySelector('[data-state="on"]') as HTMLElement
      if (activeButton && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()

        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
          height: buttonRect.height,
        })
      }
    }

    // Small delay to ensure DOM is updated
    const timer = setTimeout(updateIndicator, 0)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <SegmentedControlContext.Provider value={{ tint }}>
      <ToggleGroup
        data-slot='segmented-control'
        ref={containerRef}
        type='single'
        className={cn(segmentedControlVariants({ size }), 'relative', className)}
        size={size}
        variant={variant}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        {/* Animated indicator */}
        {value && indicatorStyle.width && (
          <div
            data-slot='segmented-control-indicator'
            className={cn(
              'absolute top-0 z-0 transition-all duration-200 ease-out pointer-events-none border shadow-xs',
              tint === 'accent' ? 'bg-ac border-transparent' : 'bg-bg border-fg/30',
              size === 'sm' ? 'rounded-sm' : 'rounded-md'
            )}
            style={indicatorStyle}
          />
        )}
        {children}
      </ToggleGroup>
    </SegmentedControlContext.Provider>
  )
}

function SegmentedControlItem({
  className,
  children,
  tint,
  ...props
}: React.ComponentProps<typeof ToggleGroupItem> & {
  tint?: VariantProps<typeof segmentedControlItemVariants>['tint']
}) {
  const context = React.useContext(SegmentedControlContext)
  const itemTint = tint || context.tint

  return (
    <ToggleGroupItem
      data-slot='segmented-control-item'
      className={cn(
        segmentedControlItemVariants({
          tint: itemTint,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupItem>
  )
}

export { SegmentedControl, SegmentedControlItem }

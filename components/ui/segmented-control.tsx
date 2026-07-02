'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/cn'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Use useLayoutEffect on client, useEffect on server to avoid SSR warnings
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

// Pixels the pointer must travel before a press becomes a drag-to-select.
// Below this, the gesture stays a plain click that commits on release.
const DRAG_THRESHOLD = 4

const segmentedControlVariants = cva('flex-wrap gap-0 bg-fg/10', {
  variants: {
    size: {
      sm: 'rounded-md',
      default: 'rounded-lg',
      lg: 'rounded-lg',
      'icon-sm': 'rounded-md',
      icon: 'rounded-lg',
      'icon-lg': 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

const segmentedControlItemVariants = cva(
  'relative z-10 touch-pan-y border border-transparent bg-transparent text-fg/60 hover:bg-transparent hover:text-fg data-[state=on]:bg-transparent',
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
  onPointerDown: onPointerDownProp,
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

  // The value the drag last committed. Used to dedupe repeated selections of
  // the same segment without depending on DOM/React state (which can lag in
  // controlled-async usage and re-fire onValueChange on every pointermove).
  const lastSelectedRef = React.useRef<string | undefined>(value)
  // Teardown for the in-flight drag's window listeners, so we can detach them
  // on unmount or before a new drag starts.
  const activeDragCleanupRef = React.useRef<(() => void) | null>(null)

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

  // Drag-to-select: select whichever segment sits under the pointer.
  // Rect hit-testing works for both mouse and touch (via Pointer Events) and
  // clamps to the nearest segment so dragging past the edges still selects an end.
  const selectItemAtPoint = React.useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current
      if (!container) return

      const items = container.querySelectorAll<HTMLElement>('[data-slot="segmented-control-item"]')
      let hit: HTMLElement | null = null
      let hitDisabled = false
      let nearest: HTMLElement | null = null
      let nearestDistance = Infinity

      for (const item of items) {
        const rect = item.getBoundingClientRect()
        const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
        const disabled = item.hasAttribute('disabled') || item.hasAttribute('data-disabled')

        if (disabled) {
          if (inside) hitDisabled = true
          continue
        }
        if (inside) hit = item

        const dx = clientX - (rect.left + rect.width / 2)
        const dy = clientY - (rect.top + rect.height / 2)
        const distance = dx * dx + dy * dy
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearest = item
        }
      }

      // Pointer is directly over a disabled segment: don't jump to a neighbor.
      if (hitDisabled && !hit) return

      const target = hit ?? nearest
      if (!target) return

      // Dedupe against the value we last committed (not the DOM/React state,
      // which can lag in controlled-async usage) so a drag fires onValueChange
      // once per segment, not once per pointermove.
      const nextValue = target.getAttribute('data-value')
      if (!nextValue || nextValue === lastSelectedRef.current) return
      lastSelectedRef.current = nextValue
      handleValueChange(nextValue)
    },
    [handleValueChange]
  )

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      onPointerDownProp?.(event)

      // Only react to the primary pointer with the main (left) button.
      if (!event.isPrimary || event.button > 0) return

      // Tear down a previous drag whose pointerup we never received before
      // starting a new one (avoids stacking window listeners).
      activeDragCleanupRef.current?.()

      // Don't commit on press. A plain click still selects on release via the
      // native click handler (original behavior); we only take over once the
      // pointer moves past the threshold, turning it into a drag.
      const pointerId = event.pointerId
      const startX = event.clientX
      const startY = event.clientY
      let dragging = false
      const controller = new AbortController()

      const cleanup = () => {
        controller.abort()
        activeDragCleanupRef.current = null
      }

      const handlePointerMove = (e: PointerEvent) => {
        // Ignore other concurrent pointers (e.g. a second finger).
        if (e.pointerId !== pointerId) return
        if (!dragging) {
          if (Math.hypot(e.clientX - startX, e.clientY - startY) < DRAG_THRESHOLD) return
          dragging = true
        }
        selectItemAtPoint(e.clientX, e.clientY)
      }
      const handlePointerUp = (e: PointerEvent) => {
        if (e.pointerId !== pointerId) return
        cleanup()
      }

      activeDragCleanupRef.current = cleanup
      const { signal } = controller
      window.addEventListener('pointermove', handlePointerMove, { signal })
      window.addEventListener('pointerup', handlePointerUp, { signal })
      window.addEventListener('pointercancel', handlePointerUp, { signal })
    },
    [onPointerDownProp, selectItemAtPoint]
  )

  // Keep the drag dedupe ref in sync with externally-driven value changes.
  React.useEffect(() => {
    lastSelectedRef.current = value
  }, [value])

  // Detach any in-flight drag listeners if we unmount mid-drag.
  React.useEffect(() => () => activeDragCleanupRef.current?.(), [])

  // Memoized function to update indicator position.
  // Use layout-relative offsets (not getBoundingClientRect) so the indicator
  // stays aligned when items wrap onto multiple rows on narrow screens.
  const updateIndicator = React.useCallback(() => {
    const activeButton = containerRef.current?.querySelector<HTMLElement>('[data-state="on"]')
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        top: activeButton.offsetTop,
        width: activeButton.offsetWidth,
        height: activeButton.offsetHeight,
      })
    }
  }, [])

  // Update indicator position when value changes
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !value) return

    // Small delay to ensure DOM is updated
    const timer = setTimeout(updateIndicator, 0)
    return () => clearTimeout(timer)
  }, [value, updateIndicator])

  // Observe size changes (e.g., when language changes and text width changes)
  React.useEffect(() => {
    if (!containerRef.current || !value) return

    const container = containerRef.current
    let resizeObserver: ResizeObserver | null = null
    let mutationObserver: MutationObserver | null = null

    // Use ResizeObserver to detect size changes
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateIndicator()
      })

      // Observe the container for size changes
      resizeObserver.observe(container)

      // Also observe all children (buttons) for size changes
      const buttons = container.querySelectorAll('[data-slot="segmented-control-item"]')
      buttons.forEach(button => {
        resizeObserver?.observe(button)
      })
    }

    // Use MutationObserver to detect content changes (like text updates)
    mutationObserver = new MutationObserver(() => {
      updateIndicator()
    })

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      resizeObserver?.disconnect()
      mutationObserver?.disconnect()
    }
  }, [value, updateIndicator])

  return (
    <SegmentedControlContext.Provider value={{ tint }}>
      <ToggleGroup
        data-slot='segmented-control'
        ref={containerRef}
        type='single'
        className={cn(segmentedControlVariants({ size }), 'relative touch-pan-y select-none', className)}
        size={size}
        variant={variant}
        value={value}
        onValueChange={handleValueChange}
        onPointerDown={handlePointerDown}
        {...props}
      >
        {/* Animated indicator */}
        {value && indicatorStyle.width && (
          <div
            data-slot='segmented-control-indicator'
            className={cn(
              'pointer-events-none absolute z-0 border shadow-xs transition-all duration-200 ease-out',
              tint === 'accent' ? 'border-transparent bg-ac' : 'border-fg/30 bg-bg',
              size === 'sm' ? 'rounded-md' : 'rounded-lg'
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
      data-value={props.value}
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

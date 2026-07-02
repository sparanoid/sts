'use client'

import { useMemo, useSyncExternalStore } from 'react'

const eventListenerOptions = {
  passive: true,
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange, eventListenerOptions)
  window.addEventListener('orientationchange', onStoreChange, eventListenerOptions)
  return () => {
    window.removeEventListener('resize', onStoreChange)
    window.removeEventListener('orientationchange', onStoreChange)
  }
}

export function useViewportSize() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 0
  )
  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0
  )

  return useMemo(() => ({ width, height }), [width, height])
}

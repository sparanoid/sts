// https://github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-viewport-size/use-viewport-size.ts
'use client'

import { useCallback, useEffect, useState } from 'react'

const eventListerOptions = {
  passive: true,
}

export function useWindowEvent(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) {
  useEffect(() => {
    window.addEventListener(type, listener, options)
    return () => window.removeEventListener(type, listener, options)
  }, [type, listener, options])
}

export function useViewportSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  const setSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth || 0,
      height: window.innerHeight || 0,
    })
  }, [])

  useWindowEvent('resize', setSize, eventListerOptions)
  useWindowEvent('orientationchange', setSize, eventListerOptions)
  useEffect(setSize, [])

  return windowSize
}

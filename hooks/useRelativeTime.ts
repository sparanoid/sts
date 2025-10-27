import { useEffect, useRef, useState } from 'react'

import { formatRelativeTime, getUpdateInterval, parseTimestamp } from '@/utils/relativeTime'

type UseRelativeTimeOptions = {
  enabled?: boolean
}

/**
 * React hook that returns the formatted relative time and updates automatically
 * based on the appropriate interval for performance.
 *
 * @param timestamp - Unix timestamp in milliseconds
 * @param options - Optional configuration
 * @param options.enabled - Whether to enable auto-updates (default: true). Set to false to pause updates.
 */
export function useRelativeTime(timestamp: number, options: UseRelativeTimeOptions = {}): string {
  const { enabled = true } = options

  const [relativeTime, setRelativeTime] = useState(() => {
    const data = parseTimestamp(timestamp)
    return formatRelativeTime(data)
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Always update immediately when dependencies change
    const updateTime = () => {
      const data = parseTimestamp(timestamp)
      const formatted = formatRelativeTime(data)
      setRelativeTime(formatted)
      return getUpdateInterval(data)
    }

    const currentInterval = updateTime()

    // Only set up interval if enabled
    if (!enabled) {
      return
    }

    // Set up interval for updates
    const setupInterval = (interval: number) => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }

      intervalRef.current = setInterval(() => {
        const newInterval = updateTime()

        // If interval changed, restart with new interval
        if (newInterval !== interval) {
          setupInterval(newInterval)
        }
      }, interval)
    }

    setupInterval(currentInterval)

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [timestamp, enabled])

  return relativeTime
}

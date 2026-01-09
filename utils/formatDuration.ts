/**
 * Formats the duration between two timestamps into a human-readable string
 * @param startTime - Start timestamp in milliseconds
 * @param endTime - End timestamp in milliseconds
 * @returns Formatted duration string (e.g., "2 hours 30 minutes", "45 minutes", "3 days 2 hours")
 */
export function formatDuration(startTime: number, endTime: number): string {
  const diffMs = Math.abs(endTime - startTime)

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const remainingHours = hours % 24
  const remainingMinutes = minutes % 60

  const parts: string[] = []

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  }

  if (remainingHours > 0) {
    parts.push(`${remainingHours} ${remainingHours === 1 ? 'hour' : 'hours'}`)
  }

  if (remainingMinutes > 0 && days === 0) {
    // Only show minutes if less than a day
    parts.push(`${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`)
  }

  // Handle edge case: less than a minute
  if (parts.length === 0) {
    if (seconds > 0) {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
    }
    return 'less than a second'
  }

  return parts.join(' ')
}

/**
 * Formats the duration with full precision including seconds
 * @param startTime - Start timestamp in milliseconds
 * @param endTime - End timestamp in milliseconds
 * @returns Formatted duration string with full precision (e.g., "2 hours 30 minutes 15 seconds")
 */
export function formatDurationPrecise(startTime: number, endTime: number): string {
  const diffMs = Math.abs(endTime - startTime)

  const totalSeconds = Math.floor(diffMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const parts: string[] = []

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  }

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`)
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`)
  }

  return parts.join(' ')
}

export type RelativeTimeData = {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Parse a unix timestamp and calculate the time difference from now
 */
export function parseTimestamp(timestamp: number): RelativeTimeData {
  const now = Date.now()
  const diff = Math.max(0, now - timestamp)

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30) // Approximate
  const years = Math.floor(days / 365) // Approximate

  return {
    years: years,
    months: months - years * 12,
    days: days - months * 30,
    hours: hours - days * 24,
    minutes: minutes - hours * 60,
    seconds: seconds - minutes * 60,
  }
}

/**
 * Format relative time according to granularity rules:
 * - seconds/minutes: show seconds
 * - hours: show hours, minutes, seconds
 * - days: show days, hours, minutes (no seconds)
 * - months: show months, days, hours (no minutes)
 * - years: show years, months, days (no hours)
 */
export function formatRelativeTime(data: RelativeTimeData): string {
  const { years, months, days, hours, minutes, seconds } = data

  const parts: string[] = []

  // Determine the highest unit
  if (years > 0) {
    // Show: years, months, days
    if (years > 0) parts.push(formatUnit(years, 'year'))
    if (months > 0) parts.push(formatUnit(months, 'month'))
    if (days > 0) parts.push(formatUnit(days, 'day'))
  } else if (months > 0) {
    // Show: months, days, hours
    if (months > 0) parts.push(formatUnit(months, 'month'))
    if (days > 0) parts.push(formatUnit(days, 'day'))
    if (hours > 0) parts.push(formatUnit(hours, 'hour'))
  } else if (days > 0) {
    // Show: days, hours, minutes
    if (days > 0) parts.push(formatUnit(days, 'day'))
    if (hours > 0) parts.push(formatUnit(hours, 'hour'))
    if (minutes > 0) parts.push(formatUnit(minutes, 'minute'))
  } else if (hours > 0) {
    // Show: hours, minutes, seconds
    if (hours > 0) parts.push(formatUnit(hours, 'hour'))
    if (minutes > 0) parts.push(formatUnit(minutes, 'minute'))
    if (seconds > 0) parts.push(formatUnit(seconds, 'second'))
  } else if (minutes > 0) {
    // Show: minutes, seconds
    if (minutes > 0) parts.push(formatUnit(minutes, 'minute'))
    if (seconds > 0) parts.push(formatUnit(seconds, 'second'))
  } else {
    // Show: seconds only
    parts.push(formatUnit(seconds, 'second'))
  }

  const timeStr = parts.join(', ')

  // Add suffix based on locale
  // Add "ago" for longer durations (days or more)
  if (days > 0 || months > 0 || years > 0) {
    return `${timeStr} ago`
  }

  return timeStr
}

/**
 * Format a single time unit with proper singular/plural handling
 */
function formatUnit(value: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): string {
  const plural = value !== 1 ? 's' : ''
  return `${value} ${unit}${plural}`
}

/**
 * Get the update interval in milliseconds based on the time data
 * Returns how often the component should re-render to show accurate time
 */
export function getUpdateInterval(data: RelativeTimeData): number {
  const { years, months, days, hours, minutes } = data

  // If showing years or months, update every 1 hour
  if (years > 0 || months > 0) {
    return 3600000 // 1 hour
  }

  // If showing days, update every 1 minute
  if (days > 0) {
    return 60000 // 1 minute
  }

  // If showing hours, update every 1 second
  if (hours > 0) {
    return 1000 // 1 second
  }

  // If showing minutes or seconds, update every 1 second
  if (minutes > 0) {
    return 1000 // 1 second
  }

  // Default: update every second
  return 1000
}

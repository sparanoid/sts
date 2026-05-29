type FormatDateOptions = {
  locale?: string
  localTime?: boolean
  removeMinute00?: boolean
  defaultTimezone?: string
  format?: Intl.DateTimeFormatOptions
}

export function formatDate(
  timestamp: Date | string = new Date(),
  {
    locale = 'en-US',
    // Use client local time by default
    localTime = true,
    removeMinute00 = false,
    defaultTimezone = 'UTC',
    format = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    },
  }: FormatDateOptions = {}
) {
  const InitFormat = format

  InitFormat.timeZone = localTime ? Intl.DateTimeFormat().resolvedOptions().timeZone : defaultTimezone

  if (InitFormat?.minute && removeMinute00) {
    InitFormat.minute = new Date(timestamp).getMinutes() === 0 ? undefined : InitFormat.minute
  }

  return new Intl.DateTimeFormat(locale, InitFormat).format(new Date(timestamp))
}

/**
 * Get the timezone abbreviation for a given date
 * @param date - The date to get timezone for
 * @param locale - The locale to use (e.g., 'en-US', 'zh-CN')
 * @param timeZone - Optional timezone, defaults to local timezone
 * @returns Timezone abbreviation (e.g., 'PDT', 'EDT', 'CST', 'GMT+8')
 */
export function getTimezoneAbbr(date: Date, timeZone?: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short',
    })

    const parts = formatter.formatToParts(date)
    const timeZonePart = parts.find(part => part.type === 'timeZoneName')

    return timeZonePart?.value || ''
  } catch (error) {
    console.error('Error getting timezone abbreviation:', error)
    return ''
  }
}

/**
 * Get the local timezone abbreviation
 */
export function getLocalTimezoneAbbr(date: Date): string {
  return getTimezoneAbbr(date)
}

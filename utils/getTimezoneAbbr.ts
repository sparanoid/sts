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

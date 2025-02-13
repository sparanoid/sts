type FormatDateOptions = {
  locale?: string
  localTime?: boolean
  removeMinute00?: boolean
  defaultTimezone?: string
  format?: Intl.DateTimeFormatOptions
}

export default function formatDate(
  timestamp: Date | string = new Date(),
  {
    locale = 'en-US',
    // Use client local time by default
    localTime = true,
    removeMinute00 = false,
    defaultTimezone = 'Asia/Shanghai',
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

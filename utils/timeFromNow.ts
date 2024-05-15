import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin

type RelativeTimeProps = {
  locale?: string
}

export default function timeFromNow(time: number, { locale = 'en-US' }: RelativeTimeProps = {}) {
  dayjs.locale(locale)
  dayjs.extend(relativeTime)
  return dayjs(time).fromNow()
}

/**
 * Process Tailwind colors with `<alpha-value>` placeholder for client
 * @param color string
 * @param alpha string, ie. 50%
 * @returns string
 */
export function twClientColor(color: string, alpha?: string) {
  const placeholder = '<alpha-value>'
  if (color.includes(placeholder)) {
    return `${color.replace(placeholder, alpha || '100%')}`
  }
  return color
}

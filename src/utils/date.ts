const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDateShort(value: number | string | Date): string {
  const date = typeof value === 'number' ? new Date(value * 1000) : new Date(value)
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const year = String(date.getFullYear()).slice(-2)
  return `${day} ${month} ${year}`
}

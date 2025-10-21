const formatter = new Intl.RelativeTimeFormat('pt-BR', {
  numeric: 'auto',
})

export function formatRelative(date: string) {
  const value = new Date(date)
  const now = new Date()
  const diff = value.getTime() - now.getTime()
  const minutes = Math.round(diff / (1000 * 60))

  if (Math.abs(minutes) > 60) {
    const hours = Math.round(minutes / 60)
    return formatter.format(hours, 'hour')
  }

  if (Math.abs(minutes) < 1) {
    return 'agora'
  }

  return formatter.format(minutes, 'minute')
}

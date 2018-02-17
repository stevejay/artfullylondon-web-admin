const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export function formatDayNumberForDisplay (dayNumber) {
  return DAYS[parseInt(dayNumber)]
}

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

export function getTimesRangesOptions (timesRanges) {
  return (timesRanges || []).map(timesRange => {
    return {
      value: timesRange.dateFrom,
      label: 'From ' + timesRange.dateFrom
    }
  })
}

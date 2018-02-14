import moment from 'moment'
import 'moment-timezone'

import * as dateConstants from '_src/constants/date'

export function getYearNow () {
  return new Date().getFullYear()
}

// TODO backend should be taking care of this
export function getDateNowForDatabase () {
  return moment.utc().format(dateConstants.DATE_FORMAT)
}

export function mapJsDateToStringDate (date) {
  if (date === null) {
    return null
  }

  return mapMomentDateToStringDate(moment(date))
}

export function mapMomentDateToStringDate (date) {
  if (date === null) {
    return null
  }

  return date.format(dateConstants.DATE_FORMAT)
}

export function mapStringDateToJsDate (stringDate) {
  if (!stringDate || stringDate === '') {
    return null
  }

  const parts = getPartsOfStringDate(stringDate)

  return new Date(
    parseInt(parts.year),
    parseInt(parts.month - 1),
    parseInt(parts.day)
  )
}

export function getLondonNowAsJsDate () {
  return moment().tz('Europe/London').toDate()
}

// Note: returns a new Date object
export function removeTimeFromJsDate (date) {
  return moment(date).startOf('day').toDate()
}

export function getTodayDateAsString () {
  const now = getLondonNowAsJsDate()
  const today = removeTimeFromJsDate(now)
  return mapJsDateToStringDate(today)
}

export function periodIsLongerThanWeek (dateFrom, dateTo) {
  if (!dateFrom || !dateTo) {
    return false
  }

  return getCountOfDaysBetweenStringDates(dateFrom, dateTo) > 6
}

export function getCountOfDaysBetweenStringDates (dateFrom, dateTo) {
  const from = moment(dateFrom, dateConstants.DATE_FORMAT)
  const to = moment(dateTo, dateConstants.DATE_FORMAT)
  return to.diff(from, 'days')
}

export function createTimeKey (obj) {
  let dayOrDate = null

  if (obj.date) {
    dayOrDate = typeof obj.date === 'string'
      ? obj.date
      : moment(obj.date).format(dateConstants.DATE_FORMAT)
  } else {
    dayOrDate = obj.day
  }

  const time = obj.from ? obj.from + '-' + obj.to : obj.at
  const timesRange = obj.timesRangeId ? '-' + obj.timesRangeId : ''
  return dayOrDate + '-' + time + timesRange
}

export function formatTime (time) {
  const intHours = parseInt(time.substring(0, 2))
  const hoursStr = intHours % 12 === 0 ? 12 : intHours % 12
  const rawMinutes = time.substring(3, 5)
  return `${hoursStr}:${rawMinutes} ${intHours < 12 ? 'am' : 'pm'}`
}

export function formatStringDateForDisplay (date, includeDayName) {
  return moment(date, dateConstants.DATE_FORMAT).format(
    includeDayName ? 'dddd, Do MMM YYYY' : 'Do MMM YYYY'
  )
}

export function formatDateRangeForDisplay (dateFrom, dateTo) {
  if (dateFrom === dateTo) {
    return formatStringDateForDisplay(dateFrom, false)
  }

  const yearInCommon = dateFrom.substring(0, 4) === dateTo.substring(0, 4)
  const monthInCommon =
    yearInCommon && dateFrom.substring(5, 7) === dateTo.substring(5, 7)

  const fromStr = monthInCommon
    ? moment(dateFrom, dateConstants.DATE_FORMAT).format('Do')
    : yearInCommon
      ? moment(dateFrom, dateConstants.DATE_FORMAT).format('Do MMM')
      : formatStringDateForDisplay(dateFrom)

  const toStr = formatStringDateForDisplay(dateTo)

  return fromStr + ' to ' + toStr
}

// TODO seems more domain specific
export function formatOpeningTimeForDisplay (range) {
  return `${formatTime(range.from)} to ${formatTime(range.to)}`
}

// TODO seems more domain specific
export function formatPerformanceTimeForDisplay (time) {
  return formatTime(time.at)
}

const STRING_DATE_REGEX = /^(\d\d\d\d)\/(\d\d)\/(\d\d)$/

export function getPartsOfStringDate (stringDate) {
  const matches = stringDate.match(STRING_DATE_REGEX)

  if (!matches) {
    throw new Error(`failed to parse '${stringDate}' as date`)
  }

  return {
    year: matches[1],
    month: matches[2],
    day: matches[3]
  }
}

import moment from 'moment'
import 'moment-timezone'
import _ from 'lodash'

import {
  eventIsPerformance,
  eventIsOneTime,
  occurrenceTypeHasDateRange,
  occurrenceTypeIsContinuous
} from '_src/lib/event'
import {
  NAMED_CLOSURE_TYPE_DROPDOWN_OPTIONS,
  DATE_FORMAT,
  DAYS_OF_WEEK_MAPPING
} from '_src/constants/time'
import { OCCURRENCE_TYPE_BOUNDED } from '_src/constants/event'
import { ENTITY_TYPE_VENUE } from '_src/constants/entity'

export function getYearNow () {
  return new Date().getFullYear()
}

export function getMinJSDate () {
  return new Date(0)
}

export function getMaxJSDate () {
  return new Date(8640000000000000)
}

export function getLondonNowAsMomentDate () {
  return moment().tz('Europe/London')
}

export function getDateForDatabase () {
  return moment.utc().format(DATE_FORMAT)
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

  return date.format(DATE_FORMAT)
}

export function formatStringDateForDisplay (date, includeDayName) {
  return moment(date, DATE_FORMAT).format(
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
    ? moment(dateFrom, DATE_FORMAT).format('Do')
    : yearInCommon
      ? moment(dateFrom, DATE_FORMAT).format('Do MMM')
      : formatStringDateForDisplay(dateFrom)

  const toStr = formatStringDateForDisplay(dateTo)

  return fromStr + ' to ' + toStr
}

export function getTodayDateAsString () {
  const now = _getLondonNowAsJsDate()
  const today = _removeTimeFromJsDate(now)
  return mapJsDateToStringDate(today)
}

export function getYearFromTodayAsString () {
  const now = _getLondonNowAsJsDate()
  const today = _removeTimeFromJsDate(now)

  const yearToday = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )

  return mapJsDateToStringDate(yearToday)
}

export function getTodayDateAndTimeAsStrings () {
  const now = getLondonNowAsMomentDate()

  return {
    dateStr: now.format(DATE_FORMAT),
    timeStr: now.format('HH:mm')
  }
}

export function formatTime (time) {
  const intHours = parseInt(time.substring(0, 2))
  const hoursStr = intHours % 12 === 0 ? 12 : intHours % 12
  const rawMinutes = time.substring(3, 5)
  return `${hoursStr}:${rawMinutes} ${intHours < 12 ? 'am' : 'pm'}`
}

export function formatOpeningTimesOrPerformanceTimeForDisplay (timeOrRange) {
  if (timeOrRange.from && timeOrRange.from === timeOrRange.to) {
    return formatTime(timeOrRange.from)
  }

  if (timeOrRange.at) {
    return formatTime(timeOrRange.at)
  }

  return _formatOpeningTimeForDisplay(timeOrRange)
}

export function createDateRangeLabel (dateStr, dateFrom, dateTo) {
  if (!dateFrom) {
    return 'Now on'
  }

  const oneDayOnly = dateTo === dateFrom

  if (dateStr < dateFrom) {
    const daysUntilStart = getCountOfDaysBetweenStringDates(dateStr, dateFrom)

    if (daysUntilStart === 1) {
      return oneDayOnly ? 'Tomorrow only' : 'Opens tomorrow'
    } else if (daysUntilStart > 1 && daysUntilStart <= 7) {
      return oneDayOnly
        ? 'Open in ' + daysUntilStart + ' days'
        : 'Opens in ' + daysUntilStart + ' days'
    } else {
      const dateFromLabel = formatStringDateForDisplay(dateFrom)

      return oneDayOnly ? 'Open ' + dateFromLabel : 'Opens ' + dateFromLabel
    }
  } else if (dateStr === dateFrom) {
    return oneDayOnly ? 'Today only' : 'Opens today'
  } else {
    // dateStr > dateFrom
    const daysUntilEnd = getCountOfDaysBetweenStringDates(dateStr, dateTo)

    if (daysUntilEnd === 0) {
      return 'Ends today'
    } else if (daysUntilEnd === 1) {
      return 'Ends tomorrow'
    } else if (daysUntilEnd > 1 && daysUntilEnd <= 7) {
      return 'Ends in ' + daysUntilEnd + ' days'
    } else if (daysUntilEnd > 7) {
      return 'Now on'
    } else {
      return 'Ended'
    }
  }
}

export function getCountOfDaysBetweenStringDates (dateFrom, dateTo) {
  const from = moment(dateFrom, DATE_FORMAT)
  const to = moment(dateTo, DATE_FORMAT)
  return to.diff(from, 'days')
}

export function addDaysToStringDate (dateStr, days) {
  const date = moment(dateStr, DATE_FORMAT)
  return date.add(days, 'days').format(DATE_FORMAT)
}

export function formatTimesStringForGivenDate (
  entity,
  dateStr,
  timeStr,
  namedClosuresLookup
) {
  const isVenue = entity.entityType === ENTITY_TYPE_VENUE
  const isPerformance = eventIsPerformance(entity.eventType)
  let times = null

  if (isVenue) {
    if (entity.openingTimes && entity.openingTimes.length > 0) {
      times = _getTimesOnGivenDateForVenue(
        dateStr,
        timeStr,
        entity,
        namedClosuresLookup
      )
    }
  } else if (isPerformance) {
    times = _getTimesOnGivenDateForPerformanceEvent(dateStr, timeStr, entity)
  } else {
    times = _getTimesOnGivenDateForExhibitionEvent(
      dateStr,
      timeStr,
      entity,
      namedClosuresLookup
    )
  }

  if (!times) {
    return null
  }

  return times.closed
    ? isPerformance ? 'No performances' : 'Closed'
    : times.isNowClosed
      ? isPerformance ? 'No performances' : 'Now closed'
      : _formatTimesForDayDisplay(times.times)
}

function _getTimesOnGivenDateForVenue (
  dateStr,
  timeStr,
  venue,
  namedClosuresLookup
) {
  // check named closures
  if (
    _dateIsInNamedClosures(dateStr, venue.namedClosures, namedClosuresLookup)
  ) {
    return { closed: true }
  }

  const closures = _createMergedDateTimesForDate(
    [],
    venue.openingTimesClosures,
    dateStr
  )

  // check for full day closure
  if (closures.length && !closures[0].from) {
    return { closed: true }
  }

  const additions = _createMergedDateTimesForDate(
    [],
    venue.additionalOpeningTimes,
    dateStr
  )

  const dayNumber = _getDayNumberFromStringDate(dateStr)
  const regularTimes = (venue.openingTimes || [])
    .filter(x => x.day === dayNumber)

  let finalTimes = _.concat(regularTimes, additions).sort(_openingTimeSorter)
  finalTimes = _removeClosureTimes(true, finalTimes, closures)

  if (finalTimes.length) {
    const times = finalTimes.map(_formatOpeningTimeForDisplay)
    return { times, isNowClosed: _isNowClosed(timeStr, times) }
  }

  return { closed: true }
}

function _removeClosureTimes (hasOpeningTimes, times, closureTimes) {
  if (!closureTimes || closureTimes.length === 0) {
    return times
  }

  if (hasOpeningTimes) {
    let newTimes = []

    times.forEach(time => {
      if (
        _.every(
          closureTimes,
          closure =>
            time.from > closure.to ||
            time.to < closure.from ||
            !(closure.from <= time.from && closure.to >= time.to)
        )
      ) {
        newTimes.push(time)
      }
    })

    return newTimes.map(time => {
      const lowerClosure = _.find(
        closure => closure.from <= time.from && closure.to > time.from
      )

      if (lowerClosure) {
        time.from = lowerClosure.to
      }

      const upperClosure = _.find(
        closure => closure.to >= time.to && closure.from < time.to
      )

      if (upperClosure) {
        time.to = upperClosure.from
      }

      return time
    })
  } else {
    return times.filter(
      time => !_.find(closureTimes, closure => closure.at === time.at)
    )
  }
}

function _getTimesOnGivenDateForPerformanceEvent (dateStr, timeStr, event) {
  if (
    event.occurrenceType === OCCURRENCE_TYPE_BOUNDED &&
    _dateNotInRange(dateStr, event.dateFrom, event.dateTo)
  ) {
    return null
  }

  const closures = _createMergedDateTimesForDate(
    event.performancesClosures,
    [],
    dateStr
  )

  // check for full day closure
  if (closures.length && !closures[0].at) {
    return { closed: true }
  }

  const additions = _createMergedDateTimesForDate(
    event.additionalPerformances,
    [],
    dateStr
  )

  const dayNumber = _getDayNumberFromStringDate(dateStr)
  const regularTimes = (event.performances || [])
    .filter(x => x.day === dayNumber)
  let finalTimes = _.concat(regularTimes, additions).sort(
    _performanceTimeSorter
  )

  finalTimes = _removeClosureTimes(false, finalTimes, closures)

  if (finalTimes.length) {
    const times = finalTimes.map(_formatPerformanceTimeForDisplay)
    return { times, isNowClosed: _isNowClosed(timeStr, times) }
  }

  return { closed: true }
}

function _getTimesOnGivenDateForExhibitionEvent (
  dateStr,
  timeStr,
  event,
  namedClosuresLookup
) {
  if (
    event.occurrenceType === OCCURRENCE_TYPE_BOUNDED &&
    _dateNotInRange(dateStr, event.dateFrom, event.dateTo)
  ) {
    return null
  }

  // check named closures
  if (
    _dateIsInNamedClosures(
      dateStr,
      event.venue.namedClosures,
      namedClosuresLookup
    )
  ) {
    return { closed: true }
  }

  const closures = _createMergedDateTimesForDate(
    event.openingTimesClosures,
    event.useVenueOpeningTimes ? event.venue.openingTimesClosures : [],
    dateStr
  )

  // check for full day closure
  if (closures.length && !closures[0].from) {
    return { closed: true }
  }

  const additions = _createMergedDateTimesForDate(
    event.additionalOpeningTimes,
    event.useVenueOpeningTimes ? event.venue.additionalOpeningTimes : [],
    dateStr
  )

  const dayNumber = _getDayNumberFromStringDate(dateStr)

  const openingTimes = event.useVenueOpeningTimes
    ? event.venue.openingTimes
    : event.openingTimes

  const regularTimes = (openingTimes || []).filter(x => x.day === dayNumber)
  let finalTimes = _.concat(regularTimes, additions).sort(_openingTimeSorter)

  finalTimes = _removeClosureTimes(true, finalTimes, closures)

  if (finalTimes.length) {
    const times = finalTimes.map(_formatOpeningTimeForDisplay)
    return { times, isNowClosed: _isNowClosed(timeStr, times) }
  }

  return { closed: true }
}

export function getTimesDetails (entity, entityType, fromStr) {
  const toStr = getYearFromTodayAsString()
  const isVenue = entityType === ENTITY_TYPE_VENUE
  const isPerformance = eventIsPerformance(entity.eventType)
  let timesDetails = null

  if (isVenue) {
    if (entity.openingTimes && entity.openingTimes.length > 0) {
      const times = getTimesDetailsForVenue(entity, fromStr, toStr)

      timesDetails = {
        times,
        regularTimesHeader: entity.hasPermanentCollection
          ? 'Openings'
          : 'Exhibition Opening Times',
        additionalTimesHeader: 'Additional Openings'
      }
    }
  } else if (isPerformance) {
    const times = getTimesDetailsForPerformanceEvent(entity, fromStr, toStr)

    timesDetails = {
      times,
      regularTimesHeader: _.isEmpty(times.regularTimes)
        ? 'Performances'
        : 'Regular Performances',
      additionalTimesHeader: 'Additional Performances',
      specialTimesHeader: 'Special Performances'
    }
  } else {
    const times = getTimesDetailsForExhibitionEvent(entity, fromStr, toStr)

    timesDetails = {
      times,
      regularTimesHeader: _.isEmpty(times.regularTimes)
        ? 'Openings'
        : 'Regular Openings',
      additionalTimesHeader: 'Additional Openings',
      specialTimesHeader: 'Special Openings'
    }
  }

  return timesDetails
}

export function getTimesDetailsForVenue (venue, fromStr, toStr) {
  return {
    regularTimes: getRegularTimesForDisplay(venue.openingTimes),
    additionalTimes: getAdditionalOpeningTimesForDisplay(
      [],
      venue.additionalOpeningTimes,
      fromStr,
      toStr
    ),
    specialTimes: [],
    closures: getClosuresForDisplay(
      [],
      venue.openingTimesClosures,
      venue.namedClosures,
      fromStr,
      toStr
    )
  }
}

export function getTimesDetailsForExhibitionEvent (event, fromStr, toStr) {
  return {
    regularTimes: getRegularTimesForDisplay(
      event.useVenueOpeningTimes ? event.venue.openingTimes : event.openingTimes
    ),
    additionalTimes: getAdditionalOpeningTimesForDisplay(
      event.additionalOpeningTimes,
      event.useVenueOpeningTimes ? event.venue.additionalOpeningTimes : [],
      fromStr,
      toStr
    ),
    specialTimes: getSpecialTimesForDisplay(
      event.specialOpeningTimes,
      fromStr,
      toStr
    ),
    closures: getClosuresForDisplay(
      event.openingTimesClosures,
      event.useVenueOpeningTimes ? event.venue.openingTimesClosures : [],
      event.useVenueOpeningTimes ? event.venue.namedClosures : null,
      fromStr,
      toStr
    )
  }
}

export function getTimesDetailsForPerformanceEvent (event, fromStr, toStr) {
  return {
    regularTimes: getRegularTimesForDisplay(event.performances),
    additionalTimes: getAdditionalPerformancesForDisplay(
      event.additionalPerformances,
      fromStr,
      toStr
    ),
    specialTimes: getSpecialTimesForDisplay(
      event.specialPerformances,
      fromStr,
      toStr
    ),
    closures: getClosuresForDisplay(
      event.performancesClosures,
      [],
      [],
      fromStr,
      toStr
    )
  }
}

export function getAdditionalOpeningTimesForDisplay (
  eventAdditionalOpeningTimes,
  venueAdditionalOpeningTimes,
  fromStr,
  toStr
) {
  return _createMergedDateTimesForDateRange(
    eventAdditionalOpeningTimes,
    venueAdditionalOpeningTimes,
    fromStr,
    toStr
  )
}

export function getRegularTimesForDisplay (regularTimes) {
  if (!regularTimes || regularTimes.length === 0) {
    return []
  }

  const result = []

  DAYS_OF_WEEK_MAPPING.forEach(dayOfWeek => {
    const mappedTimes = regularTimes
      .filter(time => time.day === dayOfWeek.value)
      .map(time => {
        if (time.from) {
          return { from: time.from, to: time.to }
        } else {
          return { at: time.at }
        }
      })

    if (mappedTimes.length) {
      result.push({
        label: dayOfWeek.label,
        times: mappedTimes
      })
    }
  })

  return result
}

export function getAdditionalPerformancesForDisplay (
  additionalPerformances,
  fromStr,
  toStr
) {
  return _createMergedDateTimesForDateRange(
    additionalPerformances,
    [],
    fromStr,
    toStr
  )
}

export function getSpecialTimesForDisplay (specialTimes, fromStr, toStr) {
  if (!specialTimes || specialTimes.length === 0) {
    return []
  }

  const mergedSpecialTimes = _createMergedDateTimesForDateRange(
    specialTimes,
    [],
    fromStr,
    toStr
  )

  const tagsLookup = {}

  mergedSpecialTimes.forEach(special => {
    special.times.forEach(time => {
      time.audienceTags.forEach(tag => {
        if (!tagsLookup[tag.label]) {
          tagsLookup[tag.label] = []
        }

        const dateLabel = formatStringDateForDisplay(special.date)

        const timeEntry = {
          date: special.date,
          label: dateLabel
        }

        if (time.at) {
          timeEntry.at = time.at
        } else {
          timeEntry.from = time.from
          timeEntry.to = time.to
        }

        tagsLookup[tag.label].push(timeEntry)
      })
    })
  })

  const result = []

  Object.keys(tagsLookup).forEach(key => {
    result.push({
      tagLabel: key,
      times: tagsLookup[key]
    })
  })

  return result
}

export function getClosuresForDisplay (
  eventClosures,
  venueClosures,
  venueNamedClosures,
  fromStr,
  toStr
) {
  const mergedClosures = _createMergedDateTimesForDateRange(
    eventClosures,
    venueClosures,
    fromStr,
    toStr
  )

  mergedClosures.push.apply(
    mergedClosures,
    _createNamedClosuresArray(venueNamedClosures)
  )

  return mergedClosures
}

function _dateIsInNamedClosures (dateStr, namedClosures, namedClosuresLookup) {
  const namedClosuresAsArray = namedClosures || []
  const year = _getPartsOfStringDate(dateStr).year

  for (let i = 0; i < namedClosuresAsArray.length; ++i) {
    const closuresForName = namedClosuresLookup[namedClosuresAsArray[i]]

    if (closuresForName) {
      const closuresForYear = closuresForName[year] || []

      if (_.find(closuresForYear, closure => closure === dateStr)) {
        return true
      }
    }
  }

  return false
}

function _createNamedClosuresArray (namedClosures) {
  if (!namedClosures || namedClosures.length === 0) {
    return []
  }

  return namedClosures
    .map(namedClosure => {
      const match = _.find(
        NAMED_CLOSURE_TYPE_DROPDOWN_OPTIONS,
        x => x.value === namedClosure
      )

      return match ? match.label : null
    })
    .filter(label => label !== null)
    .map(label => ({ label }))
}

function _openingTimeSorter (a, b) {
  return a.from === b.from ? 0 : a.from < b.from ? -1 : 1
}

function _performanceTimeSorter (a, b) {
  return a.at === b.at ? 0 : a.at < b.at ? -1 : 1
}

function _dateNotInRange (date, dateFrom, dateTo) {
  return dateFrom && dateTo && (date < dateFrom || date > dateTo)
}

function _isNowClosed (nowStr, times) {
  if (nowStr && times.length) {
    const lastTime = times[times.length - 1]
    const timeToCheck = lastTime.to || lastTime.at

    if (timeToCheck < nowStr) {
      return true
    }
  }

  return false
}

function _getDayNumberFromStringDate (stringDate) {
  // Monday equal 0, Sunday equal 6.
  const dateDay = _mapStringDateToMoment(stringDate).day()
  return dateDay - 1 + (dateDay === 0 ? 7 : 0)
}

function _getUniqueDates (list, fromStr, toStr) {
  const dates = (list || [])
    .map(x => x.date)
    .filter(date => date >= fromStr && date <= toStr)

  return _.uniq(dates)
}

function _createMergedDateTimesForDateRange (
  eventDateTimes,
  venueDateTimes,
  fromStr,
  toStr
) {
  const uniqueEventDates = _getUniqueDates(eventDateTimes, fromStr, toStr)
  const uniqueVenueDates = _getUniqueDates(venueDateTimes, fromStr, toStr)
  const uniqueDates = _.union(uniqueEventDates, uniqueVenueDates)
  uniqueDates.sort()

  return uniqueDates.map(dateStr => {
    const label = formatStringDateForDisplay(dateStr)

    const eventTimes = (eventDateTimes || []).filter(x => x.date === dateStr)
    const venueTimes = (venueDateTimes || []).filter(x => x.date === dateStr)
    let times = _.unionBy(eventTimes, venueTimes, x => x.at || x.from)

    if (_.find(times, value => _.isNil(value.at) && _.isNil(value.from))) {
      times = []
    } else {
      times = _.sortBy(times, x => x.at || x.from)
    }

    return { date: dateStr, label, times }
  })
}

function _createMergedDateTimesForDate (
  eventDateTimes,
  venueDateTimes,
  dateStr
) {
  const eventTimes = (eventDateTimes || []).filter(x => x.date === dateStr)
  const venueTimes = (venueDateTimes || []).filter(x => x.date === dateStr)

  if (eventTimes.length === 0 && venueTimes.length === 0) {
    return []
  }

  let times = _.unionBy(eventTimes, venueTimes, x => x.at || x.from)

  if (_.find(times, value => _.isNil(value.at) && _.isNil(value.from))) {
    times = [{ date: dateStr }]
  } else {
    times = _.sortBy(times, x => x.at || x.from)
  }

  return times
}

function _getLondonNowAsJsDate () {
  return moment().tz('Europe/London').toDate()
}

// Note: returns a new Date object
function _removeTimeFromJsDate (date) {
  return moment(date).startOf('day').toDate()
}

function _mapStringDateToMoment (stringDate, dateFormat) {
  return moment(stringDate, dateFormat || DATE_FORMAT).tz('Europe/London')
}

function _formatTimesForDayDisplay (times) {
  return times ? times.join(', ') : 'Closed'
}

const STRING_DATE_REGEX = /^(\d\d\d\d)\/(\d\d)\/(\d\d)$/

function _getPartsOfStringDate (stringDate) {
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

function _formatOpeningTimeForDisplay (range) {
  return `${formatTime(range.from)} to ${formatTime(range.to)}`
}

function _formatPerformanceTimeForDisplay (time) {
  return formatTime(time.at)
}

export function getEventTimesFormDisplayFlags (
  eventType,
  occurrenceType,
  dateFrom,
  dateTo,
  venue,
  useVenueOpeningTimes
) {
  useVenueOpeningTimes = !!useVenueOpeningTimes

  const isPerformance = eventIsPerformance(eventType)
  const isOneTimePerformance = isPerformance && eventIsOneTime(occurrenceType)

  const isExhibition = !isPerformance

  const hasRange = occurrenceTypeHasDateRange(occurrenceType)
  const isSingleDay = isOneTimePerformance || (hasRange && dateFrom === dateTo)

  const isLongerThanWeek =
    (hasRange && periodIsLongerThanWeek(dateFrom, dateTo)) ||
    occurrenceTypeIsContinuous(occurrenceType)

  const venueHasOpeningTimes =
    isExhibition &&
    ((!!venue.openingTimes && venue.openingTimes.length > 0) ||
      (!!venue.openingTimesOverrides && venue.openingTimesOverrides.length > 0))

  const showSingleDayOpeningTimes =
    isExhibition && isSingleDay && !useVenueOpeningTimes

  const showOpeningTimesByDate =
    isExhibition && !isSingleDay && !isLongerThanWeek && !useVenueOpeningTimes

  const showPerformancesByDate =
    isPerformance && !isSingleDay && !isLongerThanWeek

  const showSingleDayPerformances = isPerformance && isSingleDay

  if (isExhibition) {
    return {
      showUseVenueTimesOption: venueHasOpeningTimes,
      showTimesRanges: !isSingleDay &&
        isLongerThanWeek &&
        !useVenueOpeningTimes &&
        hasRange,
      showOpeningTimes: isLongerThanWeek && !useVenueOpeningTimes,
      showAdditionalOpeningTimes: !isSingleDay &&
        (isLongerThanWeek || useVenueOpeningTimes),
      showAdditionalOpeningTimesAsOpeningTimes: showSingleDayOpeningTimes ||
        showOpeningTimesByDate,
      showSpecialOpeningTimes: !isSingleDay,
      showOpeningTimesClosures: !isSingleDay
    }
  } else {
    return {
      showTimesRanges: !isSingleDay && isLongerThanWeek && hasRange,
      showPerformances: isLongerThanWeek,
      showAdditionalPerformances: !isSingleDay && isLongerThanWeek,
      showAdditionalPerformancesAsPerformances: showSingleDayPerformances ||
        showPerformancesByDate,
      showSpecialPerformances: !isOneTimePerformance,
      showPerformancesClosures: !isSingleDay
    }
  }
}

export function periodIsLongerThanWeek (dateFrom, dateTo) {
  if (!dateFrom || !dateTo) {
    return false
  }

  return getCountOfDaysBetweenStringDates(dateFrom, dateTo) > 6
}

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

export function createTimeKey (obj) {
  let dayOrDate = null

  if (obj.date) {
    dayOrDate = typeof obj.date === 'string'
      ? obj.date
      : moment(obj.date).format(DATE_FORMAT)
  } else {
    dayOrDate = obj.day
  }

  const time = obj.from ? obj.from + '-' + obj.to : obj.at
  const timesRange = obj.timesRangeId ? '-' + obj.timesRangeId : ''
  return dayOrDate + '-' + time + timesRange
}

export function getTimesRangesOptions (timesRanges) {
  return (timesRanges || []).map(timesRange => {
    return {
      value: timesRange.dateFrom,
      label: 'From ' + timesRange.dateFrom
    }
  })
}

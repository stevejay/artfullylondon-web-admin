import moment from 'moment'
import 'moment-timezone'
import _ from 'lodash'

import * as eventLib from '_src/lib/event'
import * as dateLib from '_src/lib/date'
import * as globalConstants from '_src/constants'
import occurrenceType from '_src/entities/types/occurrence-type'
import entityType from '_src/entities/types/entity-type'

const DAYS_OF_WEEK_MAPPING = [
  { value: 0, label: 'Monday' },
  { value: 1, label: 'Tuesday' },
  { value: 2, label: 'Wednesday' },
  { value: 3, label: 'Thursday' },
  { value: 4, label: 'Friday' },
  { value: 5, label: 'Saturday' },
  { value: 6, label: 'Sunday' }
]

// opening-times component
export function formatOpeningTimesOrPerformanceTimeForDisplay (timeOrRange) {
  if (timeOrRange.from && timeOrRange.from === timeOrRange.to) {
    return dateLib.formatTime(timeOrRange.from)
  }

  if (timeOrRange.at) {
    return dateLib.formatTime(timeOrRange.at)
  }

  return dateLib.formatOpeningTimeForDisplay(timeOrRange)
}

// domain
export function createDateRangeLabel (dateStr, dateFrom, dateTo) {
  if (!dateFrom) {
    return 'Now on'
  }

  const oneDayOnly = dateTo === dateFrom

  if (dateStr < dateFrom) {
    const daysUntilStart = dateLib.getCountOfDaysBetweenStringDates(
      dateStr,
      dateFrom
    )

    if (daysUntilStart === 1) {
      return oneDayOnly ? 'Tomorrow only' : 'Opens tomorrow'
    } else if (daysUntilStart > 1 && daysUntilStart <= 7) {
      return oneDayOnly
        ? 'Open in ' + daysUntilStart + ' days'
        : 'Opens in ' + daysUntilStart + ' days'
    } else {
      const dateFromLabel = dateLib.formatStringDateForDisplay(dateFrom)

      return oneDayOnly ? 'Open ' + dateFromLabel : 'Opens ' + dateFromLabel
    }
  } else if (dateStr === dateFrom) {
    return oneDayOnly ? 'Today only' : 'Opens today'
  } else {
    // dateStr > dateFrom
    const daysUntilEnd = dateLib.getCountOfDaysBetweenStringDates(
      dateStr,
      dateTo
    )

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

// opening-times component
export function addDaysToStringDate (dateStr, days) {
  const date = moment(dateStr, globalConstants.DATE_FORMAT)
  return date.add(days, 'days').format(globalConstants.DATE_FORMAT)
}

// domain
export function formatTimesStringForGivenDate (
  entity,
  dateStr,
  timeStr,
  namedClosuresLookup
) {
  const isVenue = entity.entityType === entityType.VENUE
  const isPerformance = eventLib.eventIsPerformance(entity.eventType)
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
    const times = finalTimes.map(dateLib.formatOpeningTimeForDisplay)
    return { times, isNowClosed: _isNowClosed(timeStr, times) }
  }

  /* istanbul ignore next */
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
    event.occurrenceType === occurrenceType.BOUNDED &&
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
    const times = finalTimes.map(dateLib.formatPerformanceTimeForDisplay)
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
    event.occurrenceType === occurrenceType.BOUNDED &&
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
    const times = finalTimes.map(dateLib.formatOpeningTimeForDisplay)
    return { times, isNowClosed: _isNowClosed(timeStr, times) }
  }

  return { closed: true }
}

// domain
export function getTimesDetails (entity, entityType, fromStr) {
  const toStr = getYearFromTodayAsString()
  const isVenue = entityType === entityType.VENUE
  const isPerformance = eventLib.eventIsPerformance(entity.eventType)
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

function getYearFromTodayAsString () {
  const now = dateLib.getLondonNowAsJsDate()
  const today = dateLib.removeTimeFromJsDate(now)

  const yearToday = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )

  return dateLib.mapJsDateToStringDate(yearToday)
}

// domain
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

// domain
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

// domain
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

// domain
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

// domain
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

// domain
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

// domain
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

        const dateLabel = dateLib.formatStringDateForDisplay(special.date)

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

// domain
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
  const year = dateLib.getPartsOfStringDate(dateStr).year

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

// TODO what should this be????
const NAMED_CLOSURE_TYPE_DROPDOWN_OPTIONS = []

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
  const dateDay = _mapStringDateToMoment(stringDate, true).day()
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
    const label = dateLib.formatStringDateForDisplay(dateStr)

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

function _mapStringDateToMoment (
  stringDate,
  useLondonTimezone,
  dateFormat = globalConstants.DATE_FORMAT
) {
  if (!stringDate) {
    return null
  }

  const result = moment(stringDate, dateFormat)
  return useLondonTimezone ? result.tz('Europe/London') : result
}

function _formatTimesForDayDisplay (times) {
  return times ? times.join(', ') : 'Closed'
}

// export function getEventTimesFormDisplayFlags (
//   eventType,
//   occurrenceType,
//   dateFrom,
//   dateTo,
//   venue,
//   useVenueOpeningTimes
// ) {
//   useVenueOpeningTimes = !!useVenueOpeningTimes

//   const isPerformance = eventLib.eventIsPerformance(eventType)
//   const isOneTimePerformance =
//     isPerformance && eventLib.eventIsOneTime(occurrenceType)

//   const isExhibition = !isPerformance

//   const hasRange = eventLib.occurrenceHasDateRange(occurrenceType)
//   const isSingleDay = isOneTimePerformance || (hasRange && dateFrom === dateTo)

//   const isLongerThanWeek =
//     (hasRange && dateLib.periodIsLongerThanWeek(dateFrom, dateTo)) ||
//     eventLib.occurrenceIsContinuous(occurrenceType)

//   const venueHasOpeningTimes =
//     isExhibition &&
//     ((!!venue.openingTimes && venue.openingTimes.length > 0) ||
//       (!!venue.openingTimesOverrides && venue.openingTimesOverrides.length > 0))

//   const showSingleDayOpeningTimes =
//     isExhibition && isSingleDay && !useVenueOpeningTimes

//   const showOpeningTimesByDate =
//     isExhibition && !isSingleDay && !isLongerThanWeek && !useVenueOpeningTimes

//   const showPerformancesByDate =
//     isPerformance && !isSingleDay && !isLongerThanWeek

//   const showSingleDayPerformances = isPerformance && isSingleDay

//   if (isExhibition) {
//     return {
//       showUseVenueTimesOption: venueHasOpeningTimes,
//       showTimesRanges: !isSingleDay &&
//         isLongerThanWeek &&
//         !useVenueOpeningTimes &&
//         hasRange,
//       showOpeningTimes: isLongerThanWeek && !useVenueOpeningTimes,
//       showAdditionalOpeningTimes: !isSingleDay &&
//         (isLongerThanWeek || useVenueOpeningTimes),
//       showAdditionalOpeningTimesAsOpeningTimes: showSingleDayOpeningTimes ||
//         showOpeningTimesByDate,
//       showSpecialOpeningTimes: !isSingleDay,
//       showOpeningTimesClosures: !isSingleDay
//     }
//   } else {
//     return {
//       showTimesRanges: !isSingleDay && isLongerThanWeek && hasRange,
//       showPerformances: isLongerThanWeek,
//       showAdditionalPerformances: !isSingleDay && isLongerThanWeek,
//       showAdditionalPerformancesAsPerformances: showSingleDayPerformances ||
//         showPerformancesByDate,
//       showSpecialPerformances: !isOneTimePerformance,
//       showPerformancesClosures: !isSingleDay
//     }
//   }
// }

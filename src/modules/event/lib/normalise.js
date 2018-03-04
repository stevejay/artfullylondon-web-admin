import * as eventLib from '_src/shared/lib/event'
import * as dateLib from '_src/shared/lib/date'

export function normaliseMoney (value) {
  return value.replace(/[^\d.]/g, '')
}

export function normaliseEventValues (values) {
  const isPerformance = eventLib.eventIsPerformance(values.eventType)
  const isExhibition = !isPerformance

  const isOneTimePerformance =
    isPerformance && eventLib.eventIsOneTime(values.occurrenceType)

  const hasRange = eventLib.occurrenceHasDateRange(values.occurrenceType)

  if (hasRange) {
    if (values.dateFrom > values.dateTo) {
      values.dateTo = values.dateFrom
    }

    values.additionalOpeningTimes = (values.additionalOpeningTimes || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.additionalPerformances = (values.additionalPerformances || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.specialOpeningTimes = (values.specialOpeningTimes || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.specialPerformances = (values.specialPerformances || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.openingTimesClosures = (values.openingTimesClosures || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))

    values.performancesClosures = (values.performancesClosures || [])
      .filter(x => _filterTimeEntries(x, values.dateFrom, values.dateTo))
  } else {
    values.dateTo = values.dateFrom = null
  }

  const isSingleDay =
    isOneTimePerformance || (hasRange && values.dateFrom === values.dateTo)

  const isLongerThanWeek =
    hasRange && dateLib.periodIsLongerThanWeek(values.dateFrom, values.dateTo)

  values.useVenueOpeningTimes = isExhibition && values.useVenueOpeningTimes

  if (isExhibition) {
    values.performances = []
    values.additionalPerformances = []
    values.specialPerformances = []
    values.performancesClosures = []

    if (isSingleDay || !isLongerThanWeek || values.useVenueOpeningTimes) {
      values.openingTimes = []
    }

    if (
      isSingleDay ||
      !isLongerThanWeek ||
      values.useVenueOpeningTimes ||
      !hasRange
    ) {
      values.timesRanges = []
    }

    if (isSingleDay) {
      values.openingTimesClosures = []
    }

    if (values.timesRanges && values.timesRanges.length === 0) {
      values.openingTimes = values.openingTimes.map(openingTime => {
        if (openingTime.timesRangeId) {
          delete openingTime.timesRangeId
        }

        return openingTime
      })
    }
  } else {
    values.useVenueOpeningTimes = false
    values.openingTimes = []
    values.additionalOpeningTimes = []
    values.specialOpeningTimes = []
    values.openingTimesClosures = []

    if (isSingleDay || !isLongerThanWeek || isOneTimePerformance) {
      values.performances = []
    }

    if (isSingleDay || !isLongerThanWeek || isOneTimePerformance || !hasRange) {
      values.timesRanges = []
    }

    if (
      isOneTimePerformance &&
      values.additionalPerformances &&
      values.additionalPerformances.length > 1
    ) {
      values.additionalPerformances = values.additionalPerformances.slice(0, 1)
    }

    if (isSingleDay || isOneTimePerformance) {
      values.performancesClosures = []
    }

    if (
      values.timesRanges &&
      values.timesRanges.length === 0 &&
      values.performances
    ) {
      values.performances = values.performances.map(performance => {
        if (performance.timesRangeId) {
          delete performance.timesRangeId
        }

        return performance
      })
    }
  }
}

function _filterTimeEntries (entry, dateFrom, dateTo) {
  return entry.date >= dateFrom && entry.date <= dateTo
}

import {
  BOOKING_TYPE_REQUIRED,
  BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS,
  OCCURRENCE_TYPE_BOUNDED,
  OCCURRENCE_TYPE_ONETIME,
  OCCURRENCE_TYPE_CONTINUOUS
} from '_src/constants/event'

import React from 'react'
import {
  OCCURRENCE_TYPE_BOUNDED,
  OCCURRENCE_TYPE_CONTINUOUS,
  OCCURRENCE_TYPE_ONETIME,
  BOOKING_TYPE_REQUIRED,
  BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS,
  EVENT_TYPE_PERFORMANCE,
  COST_TYPE_PAID,
  COST_TYPE_FREE,
  COST_TYPE_UNKNOWN
} from '_src/constants/event'
import { LINK_TYPE_BOOKING } from '_src/constants/link'
import {
  formatStringDateForDisplay,
  formatTime,
  getCountOfDaysBetweenStringDates,
  formatDateRangeForDisplay
} from '_src/lib/time'

export function eventIsPerformance (eventType) {
  return eventType === EVENT_TYPE_PERFORMANCE
}

export function eventIsOneTime (occurrenceType) {
  return occurrenceType === OCCURRENCE_TYPE_ONETIME
}

export function eventIsPaid (costType) {
  return costType === COST_TYPE_PAID
}

export function formatCostForDisplay (costType, costFrom, costTo) {
  if (costType === COST_TYPE_FREE) {
    return 'Free'
  }

  if (costType === COST_TYPE_UNKNOWN) {
    return 'To Be Announced'
  }

  if (costFrom === costTo) {
    return _formatAsMoney(costFrom)
  }

  if (!costFrom) {
    return _formatAsMoney(costTo) + ' or less'
  }

  return _formatAsMoney(costFrom) + ' to ' + _formatAsMoney(costTo)
}

// Note: dates must be sorted by date and time
export function groupTimesByDate (dates) {
  if (!dates || dates.length === 0) {
    return null
  }

  const result = []

  dates.forEach(date => {
    const time = date.from ? { from: date.from, to: date.to } : { at: date.at }

    if (result.length > 0 && result[result.length - 1].date === date.date) {
      result[result.length - 1].times.push(time)
    } else {
      result.push({ date: date.date, times: [time] })
    }
  })

  return result
}

export function formatEventOccurrenceForDisplay (
  occurrenceType,
  eventType,
  dateFrom,
  dateTo,
  additionalPerformances,
  dateStr
) {
  switch (occurrenceType) {
    case OCCURRENCE_TYPE_BOUNDED:
      return formatDateRangeForDisplay(dateFrom, dateTo)
    case OCCURRENCE_TYPE_CONTINUOUS:
      return eventIsPerformance(eventType)
        ? 'Regularly showing'
        : 'Regularly open'
    case OCCURRENCE_TYPE_ONETIME: {
      // only for performances
      if (!additionalPerformances || additionalPerformances.length !== 1) {
        return 'Unknown'
      }

      const occurrence = additionalPerformances[0]
      const displayTime = formatTime(occurrence.at)

      if (occurrence.date === dateStr) {
        return 'Today at ' + displayTime
      } else if (
        getCountOfDaysBetweenStringDates(dateStr, occurrence.date) === 1
      ) {
        return 'Tomorrow at ' + displayTime
      } else {
        return (
          formatStringDateForDisplay(occurrence.date) + ' at ' + displayTime
        )
      }
    }
    default:
      throw new Error(`occurrenceType out of range: ${occurrenceType}`)
  }
}

export function formatBookingInfoForDisplay (
  bookingType,
  bookingOpens,
  links,
  today
) {
  const bookingLink = links.getLinkByType(LINK_TYPE_BOOKING)

  switch (bookingType) {
    case BOOKING_TYPE_REQUIRED:
      return (
        <span>
          Required
          {_formatBookingOpensDateForDisplay(bookingOpens, bookingLink, today)}
        </span>
      )
    case BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS:
      return (
        <span>
          Required for Non-members
          {_formatBookingOpensDateForDisplay(bookingOpens, bookingLink, today)}
        </span>
      )
    default:
      return <span>Not Required</span>
  }
}

function _formatBookingOpensDateForDisplay (bookingOpens, bookingLink, today) {
  if (!bookingOpens) {
    return <span> (Booking date pending)</span>
  } else if (bookingOpens < today) {
    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Open now')
      : <span> (Open now)</span>
  } else if (bookingOpens === today) {
    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Opens today')
      : <span> (Opens today)</span>
  } else if (getCountOfDaysBetweenStringDates(today, bookingOpens) === 1) {
    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Opens tomorrow')
      : <span> (Opens tomorrow)</span>
  } else {
    const formattedDate = formatStringDateForDisplay(bookingOpens)

    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Opens ' + formattedDate)
      : <span> (Opens {formattedDate})</span>
  }
}

function _formatBookingOpensDateWithLink (bookingLink, text) {
  return (
    <span>
      {' '}(<a href={bookingLink.url} target='_blank' rel='noopener'>{text}</a>)
    </span>
  )
}

function _formatAsMoney (cost) {
  return '£' + (cost % 1 === 0 ? cost : cost.toFixed(2))
}

export function bookingRequired (bookingType) {
  return (
    bookingType === BOOKING_TYPE_REQUIRED ||
    bookingType === BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS
  )
}

export function occurrenceTypeHasDateRange (occurrenceType) {
  return (
    occurrenceType === OCCURRENCE_TYPE_BOUNDED ||
    occurrenceType === OCCURRENCE_TYPE_ONETIME
  )
}

export function occurrenceTypeIsContinuous (occurrenceType) {
  return occurrenceType === OCCURRENCE_TYPE_CONTINUOUS
}

import React from 'react' // required

import * as eventConstants from '_src/constants/event'
import * as linkConstants from '_src/constants/link'
import * as timeLib from '_src/lib/time'

export function eventIsPerformance (eventType) {
  return eventType === eventConstants.EVENT_TYPE_PERFORMANCE
}

export function eventIsOneTime (occurrenceType) {
  return occurrenceType === eventConstants.OCCURRENCE_TYPE_ONETIME
}

export function eventIsPaid (costType) {
  return costType === eventConstants.COST_TYPE_PAID
}

export function formatCostForDisplay (costType, costFrom, costTo) {
  if (costType === eventConstants.COST_TYPE_FREE) {
    return 'Free'
  }

  if (costType === eventConstants.COST_TYPE_UNKNOWN) {
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
    case eventConstants.OCCURRENCE_TYPE_BOUNDED:
      return timeLib.formatDateRangeForDisplay(dateFrom, dateTo)
    case eventConstants.OCCURRENCE_TYPE_CONTINUOUS:
      return eventIsPerformance(eventType)
        ? 'Regularly showing'
        : 'Regularly open'
    case eventConstants.OCCURRENCE_TYPE_ONETIME: {
      // only for performances
      if (!additionalPerformances || additionalPerformances.length !== 1) {
        return 'Unknown'
      }

      const occurrence = additionalPerformances[0]
      const displayTime = timeLib.formatTime(occurrence.at)

      if (occurrence.date === dateStr) {
        return 'Today at ' + displayTime
      } else if (
        timeLib.getCountOfDaysBetweenStringDates(dateStr, occurrence.date) === 1
      ) {
        return 'Tomorrow at ' + displayTime
      } else {
        return (
          timeLib.formatStringDateForDisplay(occurrence.date) +
          ' at ' +
          displayTime
        )
      }
    }
    /* istanbul ignore next */
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
  const bookingLink = links.getLinkByType(linkConstants.LINK_TYPE_BOOKING)

  switch (bookingType) {
    case eventConstants.BOOKING_TYPE_REQUIRED:
      return (
        <span>
          Required
          {_formatBookingOpensDateForDisplay(bookingOpens, bookingLink, today)}
        </span>
      )
    case eventConstants.BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS:
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
  } else if (
    timeLib.getCountOfDaysBetweenStringDates(today, bookingOpens) === 1
  ) {
    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Opens tomorrow')
      : <span> (Opens tomorrow)</span>
  } else {
    const formattedDate = timeLib.formatStringDateForDisplay(bookingOpens)

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
    bookingType === eventConstants.BOOKING_TYPE_REQUIRED ||
    bookingType === eventConstants.BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS
  )
}

export function occurrenceTypeHasDateRange (occurrenceType) {
  return (
    occurrenceType === eventConstants.OCCURRENCE_TYPE_BOUNDED ||
    occurrenceType === eventConstants.OCCURRENCE_TYPE_ONETIME
  )
}

export function occurrenceTypeIsContinuous (occurrenceType) {
  return occurrenceType === eventConstants.OCCURRENCE_TYPE_CONTINUOUS
}

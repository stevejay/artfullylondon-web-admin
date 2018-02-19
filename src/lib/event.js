import React from 'react' // required

import eventType from '_src/domain/types/event-type'
import linkType from '_src/domain/types/link-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import occurrenceType from '_src/domain/types/occurrence-type'
import * as dateLib from '_src/lib/date'

// TODO move these all to domain

export function eventIsPerformance (type) {
  return type === eventType.PERFORMANCE
}

export function eventIsOneTime (type) {
  return type === occurrenceType.ONETIME
}

export function eventIsPaid (type) {
  return type === costType.PAID
}

export function formatCostForDisplay (type, costFrom, costTo) {
  if (type === costType.FREE) {
    return 'Free'
  }

  if (type === costType.UNKNOWN) {
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

export function formatEventOccurrenceForDisplay (
  occurrence,
  eventType,
  dateFrom,
  dateTo,
  additionalPerformances,
  dateStr
) {
  switch (occurrence) {
    case occurrenceType.BOUNDED:
      return dateLib.formatDateRangeForDisplay(dateFrom, dateTo)
    case occurrenceType.CONTINUOUS:
      return eventIsPerformance(eventType)
        ? 'Regularly showing'
        : 'Regularly open'
    case occurrenceType.ONETIME: {
      // only for performances
      if (!additionalPerformances || additionalPerformances.length !== 1) {
        return 'Unknown'
      }

      const occurrence = additionalPerformances[0]
      const displayTime = dateLib.formatTime(occurrence.at)

      if (occurrence.date === dateStr) {
        return 'Today at ' + displayTime
      } else if (
        dateLib.getCountOfDaysBetweenStringDates(dateStr, occurrence.date) === 1
      ) {
        return 'Tomorrow at ' + displayTime
      } else {
        return (
          dateLib.formatStringDateForDisplay(occurrence.date) +
          ' at ' +
          displayTime
        )
      }
    }
    /* istanbul ignore next */
    default:
      throw new Error(`occurrence out of range: ${occurrence}`)
  }
}

export function formatBookingInfoForDisplay (
  booking,
  bookingOpens,
  entity,
  today
) {
  const bookingLink = entity.getLinkByType(linkType.BOOKING)

  switch (booking) {
    case bookingType.REQUIRED:
      return (
        <span>
          Required
          {_formatBookingOpensDateForDisplay(bookingOpens, bookingLink, today)}
        </span>
      )
    case bookingType.REQUIRED_FOR_NON_MEMBERS:
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
    dateLib.getCountOfDaysBetweenStringDates(today, bookingOpens) === 1
  ) {
    return bookingLink
      ? _formatBookingOpensDateWithLink(bookingLink, 'Opens tomorrow')
      : <span> (Opens tomorrow)</span>
  } else {
    const formattedDate = dateLib.formatStringDateForDisplay(bookingOpens)

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

export function bookingRequired (type) {
  return (
    type === bookingType.REQUIRED ||
    type === bookingType.REQUIRED_FOR_NON_MEMBERS
  )
}

export function occurrenceHasDateRange (type) {
  return type === occurrenceType.BOUNDED || type === occurrenceType.ONETIME
}

export function occurrenceIsContinuous (type) {
  return type === occurrenceType.CONTINUOUS
}

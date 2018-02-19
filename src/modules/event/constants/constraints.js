import _ from 'lodash'
import eventType from '_src/domain/types/event-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import occurrenceType from '_src/domain/types/occurrence-type'

const DATE_REGEX = /^[12]\d\d\d\/[01]\d\/[0123]\d$|^$/
const MONEY_REGEX = /^[0-9]+(?:\.[0-9]{1,2})?$|^$/
const TIME_REGEX = /^(?:[01][0-9]|2[0-3]):[0-5][0-9]$|^$/

export const BASIC_CONSTRAINT = {
  name: {
    presence: { disallowEmpty: true },
    length: { maximum: 200 }
  },
  eventType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(eventType) }
  },
  occurrenceType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(occurrenceType) }
  },
  dateFrom: {
    string: true,
    format: { pattern: DATE_REGEX },
    dependency: [
      {
        test: (_, attrs) =>
          attrs.occurrenceType === occurrenceType.ONETIME ||
          attrs.occurrenceType === occurrenceType.BOUNDED,
        ensure: value => !!value,
        message: 'From date is required'
      },
      {
        test: (_, attrs) => attrs.occurrenceType === occurrenceType.CONTINUOUS,
        ensure: value => !value,
        message: 'From date is not allowed here'
      }
    ]
  },
  dateTo: {
    string: true,
    format: { pattern: DATE_REGEX },
    dependency: [
      {
        test: (_, attrs) =>
          attrs.occurrenceType === occurrenceType.ONETIME ||
          attrs.occurrenceType === occurrenceType.BOUNDED,
        ensure: value => !!value,
        message: 'To date is required'
      },
      {
        test: (_, attrs) => attrs.occurrenceType === occurrenceType.CONTINUOUS,
        ensure: value => !value,
        message: 'To date is not allowed here'
      },
      {
        test: (_, attrs) =>
          attrs.dateFrom !== '' &&
          attrs.occurrenceType === occurrenceType.ONETIME,
        ensure: (value, attrs) => value === attrs.dateFrom,
        message: 'To date must equal From date'
      },
      {
        test: (_, attrs) =>
          attrs.dateFrom !== '' &&
          attrs.occurrenceType === occurrenceType.BOUNDED,
        ensure: (value, attrs) => value >= attrs.dateFrom,
        message: 'To date must be greater than or equal to From date'
      }
    ]
  },
  costType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(costType) }
  },
  costFrom: {
    length: { maximum: 6 },
    format: { pattern: MONEY_REGEX },
    dependency: [
      {
        test: (_, attrs) => attrs.costType === costType.PAID,
        ensure: value => value >= 0,
        message: 'Cost From is required'
      },
      {
        test: (_, attrs) =>
          attrs.costType === costType.FREE ||
          attrs.costType === costType.UNKNOWN,
        ensure: value => !value,
        message: 'Cost From is not allowed here'
      }
    ]
  },
  costTo: {
    length: { maximum: 6 },
    format: { pattern: MONEY_REGEX },
    dependency: [
      {
        test: (_, attrs) => attrs.costType === costType.PAID,
        ensure: value => value >= 0,
        message: 'Cost To is required'
      },
      {
        test: (_, attrs) =>
          attrs.costType === costType.FREE ||
          attrs.costType === costType.UNKNOWN,
        ensure: value => !value,
        message: 'Cost To is not allowed here'
      },
      {
        test: (_, attrs) =>
          attrs.costFrom !== '' && attrs.costType === costType.PAID,
        ensure: (value, attrs) => Number(value) >= Number(attrs.costFrom),
        message: 'Cost To must be equal to or greater than Cost From'
      }
    ]
  },
  duration: {
    format: { pattern: TIME_REGEX }
  },
  venueGuidance: {
    length: { maximum: 200 }
  },
  summary: {
    presence: { disallowEmpty: true },
    length: { maximum: 140 }
  },
  descriptionCredit: {
    length: { maximum: 200 }
  },
  bookingType: {
    presence: { disallowEmpty: true },
    inclusion: { within: _.values(bookingType) }
  },
  bookingOpens: {
    format: { pattern: DATE_REGEX }
  },
  links: {
    length: { maximum: 4, tooLong: 'has too many elements' }
  },
  weSay: {
    length: { maximum: 300 }
  },
  rating: {
    presence: { disallowEmpty: true },
    format: /^\d$/,
    numericality: { greaterThanOrEqualTo: 1, lessThanOrEqualTo: 5 }
  }
}

export const CONSTRAINT = {
  mediumTags: { presence: true }
}

const TIMES_RANGE_DEPENDENCY = {
  test: (value, attrs) =>
    value && value.length && attrs.timesRanges && attrs.timesRanges.length,
  ensure: (value, attrs) =>
    _.every(
      value,
      element =>
        element.timesRangeId &&
        _.find(
          attrs.timesRanges,
          timesRange => timesRange.id === element.timesRangeId
        )
    )
}

export const TIMES_CONSTRAINT = {
  openingTimes: {
    dependency: {
      ...TIMES_RANGE_DEPENDENCY,
      message: 'All Opening Times must have a times range that exists'
    }
  },
  performances: {
    dependency: {
      ...TIMES_RANGE_DEPENDENCY,
      message: 'All Performances must have a times range that exists'
    }
  }

  // if there are times ranges, all opening times/performances must have times range id.
  /// / if there are no times ranges, all opening times/performances must have
}

export const TALENT_CONSTRAINT = {
  // TODO All talents must have non-null roles
}

export const IMAGE_CONSTRAINT = {
  // no-op
}

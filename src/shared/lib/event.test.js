import * as eventLib from '_src/shared/lib/event'
import eventType from '_src/domain/types/event-type'
import linkType from '_src/domain/types/link-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import occurrenceType from '_src/domain/types/occurrence-type'

describe('formatBookingInfoForDisplay', () => {
  const tests = [
    // Required; no booking link
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/22',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens 22nd Jan 2017)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/21',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens tomorrow)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/20',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens today)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/19',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Open now)</span></span>'
    },
    // Required; booking link
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/22',
        links: { type: linkType.BOOKING, url: 'https://test.com' },
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens 22nd Jan 2017</a>)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/21',
        links: { type: linkType.BOOKING, url: 'https://test.com' },
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens tomorrow</a>)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/20',
        links: { type: linkType.BOOKING, url: 'https://test.com' },
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens today</a>)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2017/01/19',
        links: { type: linkType.BOOKING, url: 'https://test.com' },
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Open now</a>)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.REQUIRED_FOR_NON_MEMBERS,
        links: { type: linkType.BOOKING, url: 'https://test.com' },
        today: '2017/01/20'
      },
      expected: '<span>Required for Non-members<span> (Booking date pending)</span></span>'
    },
    {
      args: {
        bookingType: bookingType.NOT_REQUIRED
      },
      expected: '<span>Not Required</span>'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = eventLib.formatBookingInfoForDisplay(
        test.args.bookingType,
        test.args.bookingOpens,
        { getLinkByType: () => test.args.links },
        test.args.today
      )

      const wrapper = shallow(result)
      expect(wrapper.html()).toEqual(test.expected)
    })
  })
})

describe('formatEventOccurrenceForDisplay', () => {
  const tests = [
    {
      args: {
        occurrenceType: occurrenceType.BOUNDED,
        eventType: eventType.PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2017/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th to 26th Jan 2017'
    },
    {
      args: {
        occurrenceType: occurrenceType.BOUNDED,
        eventType: eventType.EXHIBITION,
        dateFrom: '2017/01/25',
        dateTo: '2017/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th to 26th Jan 2017'
    },
    {
      args: {
        occurrenceType: occurrenceType.BOUNDED,
        eventType: eventType.PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2017/02/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th Jan to 26th Feb 2017'
    },
    {
      args: {
        occurrenceType: occurrenceType.BOUNDED,
        eventType: eventType.PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2018/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th Jan 2017 to 26th Jan 2018'
    },
    {
      args: {
        occurrenceType: occurrenceType.CONTINUOUS,
        eventType: eventType.PERFORMANCE,
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: 'Regularly showing'
    },
    {
      args: {
        occurrenceType: occurrenceType.CONTINUOUS,
        eventType: eventType.EXHIBITION,
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: 'Regularly open'
    },
    {
      args: {
        occurrenceType: occurrenceType.ONETIME,
        eventType: eventType.EXHIBITION,
        performancesOverrides: [{ date: '2017/01/20', at: '18:00' }],
        today: '2017/01/20'
      },
      expected: 'Today at 6:00 pm'
    },
    {
      args: {
        occurrenceType: occurrenceType.ONETIME,
        eventType: eventType.EXHIBITION,
        performancesOverrides: [{ date: '2017/01/21', at: '12:00' }],
        today: '2017/01/20'
      },
      expected: 'Tomorrow at 12:00 pm'
    },
    {
      args: {
        occurrenceType: occurrenceType.ONETIME,
        eventType: eventType.EXHIBITION,
        performancesOverrides: [{ date: '2017/01/25', at: '08:00' }],
        today: '2017/01/20'
      },
      expected: '25th Jan 2017 at 8:00 am'
    },
    {
      args: {
        occurrenceType: occurrenceType.ONETIME,
        eventType: eventType.EXHIBITION,
        performancesOverrides: [],
        today: '2017/01/20'
      },
      expected: 'Unknown'
    },
    {
      args: {
        occurrenceType: occurrenceType.ONETIME,
        eventType: eventType.EXHIBITION,
        performancesOverrides: [
          { date: '2017/01/25', at: '08:00' },
          { date: '2017/01/25', at: '09:00' }
        ],
        today: '2017/01/20'
      },
      expected: 'Unknown'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = eventLib.formatEventOccurrenceForDisplay(
        test.args.occurrenceType,
        test.args.eventType,
        test.args.dateFrom,
        test.args.dateTo,
        test.args.performancesOverrides,
        test.args.today
      )

      expect(result).toEqual(test.expected)
    })
  })
})

describe('formatCostForDisplay', () => {
  const tests = [
    {
      args: {
        costType: costType.FREE,
        costFrom: null,
        costTo: null
      },
      expected: 'Free'
    },
    {
      args: {
        costType: costType.PAID,
        costFrom: 1.2,
        costTo: 1.2
      },
      expected: '£1.20'
    },
    {
      args: {
        costType: costType.PAID,
        costFrom: 1,
        costTo: 999.99
      },
      expected: '£1 to £999.99'
    },
    {
      args: {
        costType: costType.PAID,
        costFrom: null,
        costTo: 999.99
      },
      expected: '£999.99 or less'
    },
    {
      args: {
        costType: costType.UNKNOWN
      },
      expected: 'To Be Announced'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = eventLib.formatCostForDisplay(
        test.args.costType,
        test.args.costFrom,
        test.args.costTo
      )

      expect(result).toEqual(test.expected)
    })
  })
})

describe('eventIsPerformance', () => {
  const tests = [
    {
      arg: eventType.PERFORMANCE,
      expected: true
    },
    {
      arg: eventType.EXHIBITION,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = eventLib.eventIsPerformance(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('eventIsOneTime', () => {
  const tests = [
    {
      arg: occurrenceType.ONETIME,
      expected: true
    },
    {
      arg: occurrenceType.CONTINUOUS,
      expected: false
    },
    {
      arg: occurrenceType.BOUNDED,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = eventLib.eventIsOneTime(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('eventIsPaid', () => {
  const tests = [
    {
      arg: costType.PAID,
      expected: true
    },
    {
      arg: costType.FREE,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = eventLib.eventIsPaid(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('bookingRequired', () => {
  const tests = [
    {
      it: 'should handle booking not required',
      arg: bookingType.NOT_REQUIRED,
      expected: false
    },
    {
      it: 'should handle booking required',
      arg: bookingType.REQUIRED,
      expected: true
    },
    {
      it: 'should handle booking required for non-members',
      arg: bookingType.REQUIRED_FOR_NON_MEMBERS,
      expected: true
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = eventLib.bookingRequired(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('occurrenceHasDateRange', () => {
  const tests = [
    {
      it: 'should handle bounded occurrence type',
      arg: occurrenceType.BOUNDED,
      expected: true
    },
    {
      it: 'should handle onetime occurrence type',
      arg: occurrenceType.ONETIME,
      expected: true
    },
    {
      it: 'should handle continuous occurrence type',
      arg: occurrenceType.CONTINUOUS,
      expected: false
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = eventLib.occurrenceHasDateRange(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('occurrenceIsContinuous', () => {
  const tests = [
    {
      it: 'should handle bounded occurrence type',
      arg: occurrenceType.BOUNDED,
      expected: false
    },
    {
      it: 'should handle onetime occurrence type',
      arg: occurrenceType.ONETIME,
      expected: false
    },
    {
      it: 'should handle continuous occurrence type',
      arg: occurrenceType.CONTINUOUS,
      expected: true
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = eventLib.occurrenceIsContinuous(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

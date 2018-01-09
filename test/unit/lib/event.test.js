import * as event from '_src/lib/event'
import * as eventConstants from '_src/constants/event'
import { shallow } from 'enzyme'
import { LinkCollection } from '_src/entities/link-collection'
import {
  EVENT_TYPE_PERFORMANCE,
  EVENT_TYPE_EXHIBITION,
  COST_TYPE_PAID,
  COST_TYPE_FREE,
  COST_TYPE_UNKNOWN,
  OCCURRENCE_TYPE_BOUNDED,
  OCCURRENCE_TYPE_CONTINUOUS,
  OCCURRENCE_TYPE_ONETIME,
  BOOKING_TYPE_REQUIRED
} from '_src/constants/event'
import { LINK_TYPE_BOOKING } from '_src/constants/link'

describe('groupTimesByDate', () => {
  it('should correctly group a mix of dates and times', () => {
    const arg = [
      { date: '2017/01/14', at: '10:00' },
      { date: '2017/01/14', at: '12:00' },
      { date: '2017/01/14', at: '18:00' },
      { date: '2017/01/15', at: '10:00' }
    ]

    const expected = [
      {
        date: '2017/01/14',
        times: [{ at: '10:00' }, { at: '12:00' }, { at: '18:00' }]
      },
      {
        date: '2017/01/15',
        times: [{ at: '10:00' }]
      }
    ]

    const actual = event.groupTimesByDate(arg)
    expect(actual).toEqual(expected)
  })
})

describe('formatBookingInfoForDisplay', () => {
  const tests = [
    // Required; no booking link
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/22',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens 22nd Jan 2017)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/21',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens tomorrow)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/20',
        links: null,
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Opens today)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/19',
        links: [],
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (Open now)</span></span>'
    },
    // Required; booking link
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/22',
        links: [{ type: LINK_TYPE_BOOKING, url: 'https://test.com' }],
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens 22nd Jan 2017</a>)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/21',
        links: [{ type: LINK_TYPE_BOOKING, url: 'https://test.com' }],
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens tomorrow</a>)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/20',
        links: [{ type: LINK_TYPE_BOOKING, url: 'https://test.com' }],
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Opens today</a>)</span></span>'
    },
    {
      args: {
        bookingType: BOOKING_TYPE_REQUIRED,
        bookingOpens: '2017/01/19',
        links: [{ type: LINK_TYPE_BOOKING, url: 'https://test.com' }],
        today: '2017/01/20'
      },
      expected: '<span>Required<span> (<a href="https://test.com" target="_blank" rel="noopener">Open now</a>)</span></span>'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = event.formatBookingInfoForDisplay(
        test.args.bookingType,
        test.args.bookingOpens,
        new LinkCollection(test.args.links),
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
        occurrenceType: OCCURRENCE_TYPE_BOUNDED,
        eventType: EVENT_TYPE_PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2017/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th to 26th Jan 2017'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_BOUNDED,
        eventType: EVENT_TYPE_EXHIBITION,
        dateFrom: '2017/01/25',
        dateTo: '2017/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th to 26th Jan 2017'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_BOUNDED,
        eventType: EVENT_TYPE_PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2017/02/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th Jan to 26th Feb 2017'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_BOUNDED,
        eventType: EVENT_TYPE_PERFORMANCE,
        dateFrom: '2017/01/25',
        dateTo: '2018/01/26',
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: '25th Jan 2017 to 26th Jan 2018'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_CONTINUOUS,
        eventType: EVENT_TYPE_PERFORMANCE,
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: 'Regularly showing'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_CONTINUOUS,
        eventType: EVENT_TYPE_EXHIBITION,
        performancesOverrides: null,
        today: '2017/01/20'
      },
      expected: 'Regularly open'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_ONETIME,
        eventType: EVENT_TYPE_EXHIBITION,
        performancesOverrides: [
          {
            date: '2017/01/20',
            at: '18:00'
          }
        ],
        today: '2017/01/20'
      },
      expected: 'Today at 6:00 pm'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_ONETIME,
        eventType: EVENT_TYPE_EXHIBITION,
        performancesOverrides: [
          {
            date: '2017/01/21',
            at: '12:00'
          }
        ],
        today: '2017/01/20'
      },
      expected: 'Tomorrow at 12:00 pm'
    },
    {
      args: {
        occurrenceType: OCCURRENCE_TYPE_ONETIME,
        eventType: EVENT_TYPE_EXHIBITION,
        performancesOverrides: [
          {
            date: '2017/01/25',
            at: '08:00'
          }
        ],
        today: '2017/01/20'
      },
      expected: '25th Jan 2017 at 8:00 am'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = event.formatEventOccurrenceForDisplay(
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
        costType: COST_TYPE_FREE,
        costFrom: null,
        costTo: null
      },
      expected: 'Free'
    },
    {
      args: {
        costType: COST_TYPE_PAID,
        costFrom: 1.2,
        costTo: 1.2
      },
      expected: '£1.20'
    },
    {
      args: {
        costType: COST_TYPE_PAID,
        costFrom: 1,
        costTo: 999.99
      },
      expected: '£1 to £999.99'
    },
    {
      args: {
        costType: COST_TYPE_PAID,
        costFrom: null,
        costTo: 999.99
      },
      expected: '£999.99 or less'
    },
    {
      args: {
        costType: COST_TYPE_UNKNOWN
      },
      expected: 'To Be Announced'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const result = event.formatCostForDisplay(
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
      arg: EVENT_TYPE_PERFORMANCE,
      expected: true
    },
    {
      arg: EVENT_TYPE_EXHIBITION,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = event.eventIsPerformance(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('eventIsOneTime', () => {
  const tests = [
    {
      arg: OCCURRENCE_TYPE_ONETIME,
      expected: true
    },
    {
      arg: OCCURRENCE_TYPE_CONTINUOUS,
      expected: false
    },
    {
      arg: OCCURRENCE_TYPE_BOUNDED,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = event.eventIsOneTime(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('eventIsPaid', () => {
  const tests = [
    {
      arg: COST_TYPE_PAID,
      expected: true
    },
    {
      arg: COST_TYPE_FREE,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const result = event.eventIsPaid(test.arg)
      expect(result).toEqual(test.expected)
    })
  })
})

describe('bookingRequired', () => {
  const tests = [
    {
      it: 'should handle booking not required',
      arg: eventConstants.BOOKING_TYPE_NOT_REQUIRED,
      expected: false
    },
    {
      it: 'should handle booking required',
      arg: eventConstants.BOOKING_TYPE_REQUIRED,
      expected: true
    },
    {
      it: 'should handle booking required for non-members',
      arg: eventConstants.BOOKING_TYPE_REQUIRED_FOR_NON_MEMBERS,
      expected: true
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = event.bookingRequired(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('occurrenceTypeHasDateRange', () => {
  const tests = [
    {
      it: 'should handle bounded occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_BOUNDED,
      expected: true
    },
    {
      it: 'should handle onetime occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_ONETIME,
      expected: true
    },
    {
      it: 'should handle continuous occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_CONTINUOUS,
      expected: false
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = event.occurrenceTypeHasDateRange(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('occurrenceTypeIsContinuous', () => {
  const tests = [
    {
      it: 'should handle bounded occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_BOUNDED,
      expected: false
    },
    {
      it: 'should handle onetime occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_ONETIME,
      expected: false
    },
    {
      it: 'should handle continuous occurrence type',
      arg: eventConstants.OCCURRENCE_TYPE_CONTINUOUS,
      expected: true
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = event.occurrenceTypeIsContinuous(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

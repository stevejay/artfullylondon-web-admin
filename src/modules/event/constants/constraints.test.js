import { ensure } from 'ensure-request'

import * as constraints from './constraints'
import eventType from '_src/domain/types/event-type'
import costType from '_src/domain/types/cost-type'
import bookingType from '_src/domain/types/booking-type'
import occurrenceType from '_src/domain/types/occurrence-type'

describe('BASIC_CONSTRAINT', () => {
  const tests = [
    {
      it: 'should allow a valid bounded event',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {}
    },
    {
      it: 'should allow a valid onetime event',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.ONETIME,
        dateFrom: '2017/01/01',
        dateTo: '2017/01/01',
        costType: costType.FREE,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {}
    },
    {
      it: 'should fail a bounded event that has a missing from date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: null,
        dateTo: '2018/01/01',
        costType: costType.PAID,
        costFrom: 23,
        costTo: 23,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateFrom: ['From date is required']
      }
    },
    {
      it: 'should fail a continuous event that has a from date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.CONTINUOUS,
        dateFrom: '2018/01/01',
        dateTo: null,
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateFrom: ['From date is not allowed here']
      }
    },
    {
      it: 'should fail a bounded event that has a missing to date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2018/01/01',
        dateTo: null,
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateTo: ['To date is required']
      }
    },
    {
      it: 'should fail a continuous event that has a to date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.CONTINUOUS,
        dateFrom: null,
        dateTo: '2018/01/01',
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateTo: ['To date is not allowed here']
      }
    },
    {
      it: 'should fail a bounded event with a to date less than from date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2016/01/01',
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateTo: ['To date must be greater than or equal to From date']
      }
    },
    {
      it: 'should fail a onetime event with to date different to from date',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.ONETIME,
        dateFrom: '2017/01/01',
        dateTo: '2017/02/02',
        costType: costType.PAID,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        dateTo: ['To date must equal From date']
      }
    },
    {
      it: 'should fail a paid event with no costings',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        costType: costType.PAID,
        costFrom: null,
        costTo: null,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        costFrom: ['Cost From is required'],
        costTo: ['Cost To is required']
      }
    },
    {
      it: 'should fail a paid event with costTo less than costFrom',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        costType: costType.PAID,
        costFrom: 100,
        costTo: 10,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        costTo: ['Cost To must be equal to or greater than Cost From']
      }
    },
    {
      it: 'should fail a free event with costings',
      values: {
        name: 'Some Name',
        eventType: eventType.PERFORMANCE,
        occurrenceType: occurrenceType.BOUNDED,
        dateFrom: '2017/01/01',
        dateTo: '2018/01/01',
        costType: costType.FREE,
        costFrom: 23,
        costTo: 25,
        duration: '02:30',
        venueGuidance: 'Some venue guidance',
        summary: 'Some summary',
        descriptionCredit: 'Some description credit',
        bookingType: bookingType.REQUIRED,
        bookingOpens: '2018/01/01',
        links: [],
        weSay: 'We Say',
        rating: '3'
      },
      expected: {
        costFrom: ['Cost From is not allowed here'],
        costTo: ['Cost To is not allowed here']
      }
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const errors = ensure(test.values, constraints.BASIC_CONSTRAINT) || {}
      expect(errors).toEqual(test.expected)
    })
  })
})

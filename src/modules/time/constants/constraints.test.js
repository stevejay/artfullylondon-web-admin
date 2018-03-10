import { ensure } from 'ensure-request'

import * as constraints from './constraints'

describe('TIMES_RANGE_CONSTRAINT', () => {
  const tests = [
    {
      it: 'should allow a valid times range',
      values: { dateFrom: '2017/01/01', dateTo: '2018/01/01' },
      expected: {}
    },
    {
      it: 'should fail a times range with a missing dateFrom',
      values: { dateFrom: null, dateTo: '2018/01/01' },
      expected: { dateFrom: ["Date From can't be blank"] }
    },
    {
      it: 'should fail a times range with a missing dateTo',
      values: { dateFrom: '2017/01/01', dateTo: null },
      expected: {
        dateTo: ["Date To can't be blank"]
      }
    },
    {
      it: 'should fail a times range with a dateTo the same as the dateFrom',
      values: { dateFrom: '2017/01/01', dateTo: '2017/01/01' },
      expected: { dateTo: ['Date To is not greater than Date From'] }
    },
    {
      it: 'should fail a times range with a dateTo before the dateFrom',
      values: { dateFrom: '2017/01/01', dateTo: '2016/01/01' },
      expected: { dateTo: ['Date To is not greater than Date From'] }
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const errors = ensure(
        test.values,
        constraints.TIMES_RANGE_CONSTRAINT
      ) || {}

      expect(errors).toEqual(test.expected)
    })
  })
})

describe('OPENING_TIME_CONSTRAINT', () => {
  const tests = [
    {
      it: 'should allow an opening time with no times',
      values: { day: '1', from: '18:00', to: '19:00' },
      expected: {}
    },
    {
      it: 'should fail an opening time with a to time the same as the from time',
      values: { day: '1', from: '18:00', to: '18:00' },
      expected: { to: ['To time is not greater than From time'] }
    },
    {
      it: 'should fail an opening time with a to time before the from time',
      values: { day: '1', from: '18:00', to: '12:00' },
      expected: { to: ['To time is not greater than From time'] }
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const errors = ensure(
        test.values,
        constraints.OPENING_TIME_CONSTRAINT
      ) || {}

      expect(errors).toEqual(test.expected)
    })
  })
})

describe('OPENING_TIME_CLOSURE_CONSTRAINT', () => {
  const tests = [
    {
      it: 'should allow a closure with no times',
      values: { date: '2017/01/01', from: null, to: null },
      expected: {}
    },
    {
      it: 'should fail a closure with no date',
      values: { date: '', from: null, to: null },
      expected: {
        date: ["Date can't be blank", 'Date is in the wrong format']
      }
    },
    {
      it: 'should allow a closure with valid times',
      values: { date: '2017/01/01', from: '18:00', to: '19:00' },
      expected: {}
    },
    {
      it: 'should fail a closure with a from date but no to date',
      values: { date: '2017/01/01', from: '18:00', to: null },
      expected: { to: ['To time is not greater than From time'] }
    },
    {
      it: 'should fail a closure with a to date but no from date',
      values: { date: '2017/01/01', from: null, to: '18:00' },
      expected: { from: ['To time given but From time missing'] }
    },
    {
      it: 'should fail a closure with a to date same as the from date',
      values: { date: '2017/01/01', from: '18:00', to: '18:00' },
      expected: { to: ['To time is not greater than From time'] }
    },
    {
      it: 'should fail a closure with a to date less than the from date',
      values: { date: '2017/01/01', from: '18:00', to: '12:00' },
      expected: { to: ['To time is not greater than From time'] }
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const errors = ensure(
        test.values,
        constraints.OPENING_TIME_CLOSURE_CONSTRAINT
      ) || {}

      expect(errors).toEqual(test.expected)
    })
  })
})

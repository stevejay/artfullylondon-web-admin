import { SubmissionError } from 'redux-form'

import * as validationLib from './validation'

describe('validateNewClosure', () => {
  describe('valid examples', () => {
    const tests = [
      {
        it: 'should allow a whole day closure when there are no existing ones',
        existing: [],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should allow a whole day closure when there are existing ones for other days',
        existing: [{ date: '2018/01/02' }, { date: '2018/01/03', at: '18:00' }],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should allow a partial day closure when there is an existing different partial closure for the same day',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01', at: '20:00' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        validationLib.validateNewClosure(test.existing, test.new)
      })
    })
  })

  describe('invalid examples', () => {
    const tests = [
      {
        it: 'should fail a whole day closure that already exists',
        existing: [{ date: '2018/01/01' }],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should fail a whole day closure for a date that has a part-day closure already',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should fail a whole day closure when a partial closure already exists for that date',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        expect(() =>
          validationLib.validateNewClosure(test.existing, test.new)
        ).toThrowError(SubmissionError)
      })
    })
  })
})

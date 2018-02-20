import { SubmissionError } from 'redux-form'

import * as validationLib from './validation'

describe('validateNewTimesRange', () => {
  describe('valid examples', () => {
    const tests = [
      {
        it: 'should allow an entry when there are no existing ones',
        existing: [],
        new: { dateFrom: '2018/01/01', dateTo: '2018/01/05', label: 'A' }
      },
      {
        it: 'should allow an entry when there is an existing one that is different',
        existing: [
          { dateFrom: '2018/01/10', dateTo: '2018/01/15', label: 'B' }
        ],
        new: { dateFrom: '2018/01/01', dateTo: '2018/01/05', label: 'A' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        validationLib.validateNewTimesRange(test.existing, test.new)
      })
    })
  })

  describe('invalid examples', () => {
    const tests = [
      {
        it: 'should fail an entry that has the same label as an existing one',
        existing: [
          { dateFrom: '2018/01/10', dateTo: '2018/01/15', label: 'A' }
        ],
        new: { dateFrom: '2018/01/01', dateTo: '2018/01/05', label: 'A' }
      },
      {
        it: 'should fail to add an entry that overlaps an existing one',
        existing: [
          { dateFrom: '2018/01/03', dateTo: '2018/01/08', label: 'A' }
        ],
        new: { dateFrom: '2018/01/01', dateTo: '2018/01/05', label: 'B' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        expect(() =>
          validationLib.validateNewTimesRange(test.existing, test.new)
        ).toThrowError(SubmissionError)
      })
    })
  })
})

describe('validateNewDateEntry', () => {
  describe('valid examples', () => {
    const tests = [
      {
        it: 'should allow an entry when there are no existing ones',
        existing: [],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should allow an entry when there are existing ones for other days',
        existing: [{ date: '2018/01/02' }, { date: '2018/01/03', at: '18:00' }],
        new: { date: '2018/01/01' }
      },
      {
        it: 'should allow an entry when there is an existing different entry for the same day',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01', at: '20:00' }
      },
      {
        it: 'should allow an entry which does not overlap an existing entry for that day',
        existing: [{ date: '2018/01/01', from: '18:00', to: '19:00' }],
        new: { date: '2018/01/01', from: '20:00', to: '21:00' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        validationLib.validateNewDateEntry(test.existing, test.new)
      })
    })
  })

  describe('invalid examples', () => {
    const tests = [
      {
        it: 'should fail an entry that already exists',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01', at: '18:00' }
      },
      {
        it: 'should fail to add an entry that overlaps an existing one',
        existing: [{ date: '2018/01/01', from: '18:00', to: '19:00' }],
        new: { date: '2018/01/01', from: '18:30', to: '19:30' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        expect(() =>
          validationLib.validateNewDateEntry(test.existing, test.new)
        ).toThrowError(SubmissionError)
      })
    })
  })
})

describe('validateNewDayEntry', () => {
  describe('valid examples', () => {
    const tests = [
      {
        it: 'should allow an entry when there are no existing ones',
        existing: [],
        new: { day: 3 }
      },
      {
        it: 'should allow an entry when there are existing ones for other days',
        existing: [{ day: 4 }, { day: 5, at: '18:00' }],
        new: { day: 3 }
      },
      {
        it: 'should allow an entry when there are existing ones for the same day but with a different times range id',
        existing: [{ day: 3, timesRangeId: 'a', at: '18:00' }],
        new: { day: 3, timesRangeId: 'b', at: '18:00' }
      },
      {
        it: 'should allow an entry when there is an existing different entry for the same day',
        existing: [{ day: 3, at: '18:00' }],
        new: { day: 3, at: '20:00' }
      },
      {
        it: 'should allow an entry which does not overlap an existing entry for that day',
        existing: [{ day: 3, from: '18:00', to: '19:00' }],
        new: { day: 3, from: '20:00', to: '21:00' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        validationLib.validateNewDayEntry(test.existing, test.new)
      })
    })
  })

  describe('invalid examples', () => {
    const tests = [
      {
        it: 'should fail an entry that already exists',
        existing: [{ day: 3, at: '18:00' }],
        new: { day: 3, at: '18:00' }
      },
      {
        it: 'should fail an entry that already exists for the same times range id',
        existing: [{ day: 3, timesRangeId: 'a', at: '18:00' }],
        new: { day: 3, timesRangeId: 'a', at: '18:00' }
      },
      {
        it: 'should fail an entry that has no times range id but an entry exists with one for the same day',
        existing: [{ day: 3, timesRangeId: 'a', at: '18:00' }],
        new: { day: 3, at: '18:00' }
      },
      {
        it: 'should fail to add an entry that overlaps an existing one',
        existing: [{ day: 3, from: '18:00', to: '19:00' }],
        new: { day: 3, from: '18:30', to: '19:30' }
      }
    ]

    tests.forEach(test => {
      it(test.it, () => {
        expect(() =>
          validationLib.validateNewDayEntry(test.existing, test.new)
        ).toThrowError(SubmissionError)
      })
    })
  })
})

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
      },
      {
        it: 'should allow a partial day closure which does not overlap an existing partial closure for that day',
        existing: [{ date: '2018/01/01', from: '18:00', to: '19:00' }],
        new: { date: '2018/01/01', from: '20:00', to: '21:00' }
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
      },
      {
        it: 'should fail a partial day closure when a full closure already exists for that date',
        existing: [{ date: '2018/01/01' }],
        new: { date: '2018/01/01', at: '18:00' }
      },
      {
        it: 'should fail to add a partial closure that already exists',
        existing: [{ date: '2018/01/01', at: '18:00' }],
        new: { date: '2018/01/01', at: '18:00' }
      },
      {
        it: 'should fail to add a partial closure that overlaps an existing one',
        existing: [{ date: '2018/01/01', from: '18:00', to: '19:00' }],
        new: { date: '2018/01/01', from: '18:30', to: '19:30' }
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

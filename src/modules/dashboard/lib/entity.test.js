import * as entityLib from './entity'
import entityType from '_src/entities/types/entity-type'

describe('getLabelForEntityType', () => {
  const tests = [
    {
      arg: entityType.EVENT,
      expected: 'Event'
    },
    {
      arg: entityType.EVENT_SERIES,
      expected: 'Event Series'
    },
    {
      arg: entityType.TALENT,
      expected: 'Talent'
    },
    {
      arg: entityType.VENUE,
      expected: 'Venue'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = entityLib.getLabelForEntityType(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

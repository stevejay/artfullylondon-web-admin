import * as entityLib from './entity'
import * as entityConstants from '_src/constants/entity'

describe('getLabelForEntityType', () => {
  const tests = [
    {
      arg: entityConstants.ENTITY_TYPE_EVENT,
      expected: 'Event'
    },
    {
      arg: entityConstants.ENTITY_TYPE_EVENT_SERIES,
      expected: 'Event Series'
    },
    {
      arg: entityConstants.ENTITY_TYPE_TALENT,
      expected: 'Talent'
    },
    {
      arg: entityConstants.ENTITY_TYPE_VENUE,
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

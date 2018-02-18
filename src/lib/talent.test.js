import * as talentLib from '_src/lib/talent'

describe('formatTalentName', () => {
  const tests = [
    {
      it: 'should handle no name',
      arg: {},
      expected: ''
    },
    {
      it: 'should handle a group name',
      arg: { lastName: 'The Group' },
      expected: 'The Group'
    },
    {
      it: 'should handle an individual name',
      arg: { firstNames: 'David Andrew', lastName: 'Hancock' },
      expected: 'David Andrew Hancock'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = talentLib.formatTalentName(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

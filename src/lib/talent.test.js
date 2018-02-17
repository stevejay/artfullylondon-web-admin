import * as talentLib from '_src/lib/talent'
import talentType from '_src/entities/talent-type'

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

describe('isIndividualTalent', () => {
  const tests = [
    {
      it: 'should handle an individual',
      arg: talentType.INDIVIDUAL,
      expected: true
    },
    {
      it: 'should handle an individual',
      arg: talentType.GROUP,
      expected: false
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = talentLib.isIndividualTalent(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

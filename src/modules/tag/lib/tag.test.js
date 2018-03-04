import * as tagLib from './tag'

describe('getTagTypeFromTagId', () => {
  const tests = [
    {
      it: 'should handle a medium tag',
      arg: 'medium/painting',
      expected: tagType.MEDIUM
    },
    {
      it: 'should handle a style tag',
      arg: 'style/contemporary',
      expected: tagType.STYLE
    },
    {
      it: 'should handle a geo tag',
      arg: 'geo/usa',
      expected: tagType.GEO
    },
    {
      it: 'should handle an audience tag',
      arg: 'audience/families',
      expected: tagType.AUDIENCE
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = tagLib.getTagTypeFromTagId(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })

  it('should handle an unknown tag type', () => {
    expect(() => tagLib.getTagTypeFromTagId('foo/bar')).toThrow()
  })
})

describe('getTagTypeFromLocation', () => {
  it('should get tag type from valid location', () => {
    const actual = tagLib.getTagTypeFromLocation({ pathname: '/foo/GEO' })
    expect(actual).toEqual(tagType.GEO)
  })

  it('should throw an error for invalid location', () => {
    expect(() => tagLib.getTagTypeFromLocation({ pathname: '' })).toThrow()
  })
})

describe('getTagTypeUrlParameter', () => {
  it('should get the parameter', () => {
    const match = { params: { type: 'Medium' } }
    const result = tagLib.getTagTypeUrlParameter(match)
    expect(result).toEqual(tagType.MEDIUM)
  })
})

describe('processReceivedTags', () => {
  it('should process multiple tags', () => {
    const actual = tagLib.processReceivedTags([{ id: 3 }, { id: 1 }, { id: 2 }])
    expect(actual).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
  })

  it('should process a null array', () => {
    const actual = tagLib.processReceivedTags(null)
    expect(actual).toEqual([])
  })
})

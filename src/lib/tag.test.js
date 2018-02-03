import * as tag from '_src/lib/tag'

describe('getTagTypeFromTagId', () => {
  const tests = [
    {
      it: 'should handle a medium tag',
      arg: 'medium/painting',
      expected: 'medium'
    },
    {
      it: 'should handle a style tag',
      arg: 'style/contemporary',
      expected: 'style'
    },
    {
      it: 'should handle a geo tag',
      arg: 'geo/usa',
      expected: 'geo'
    },
    {
      it: 'should handle an audience tag',
      arg: 'audience/families',
      expected: 'audience'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = tag.getTagTypeFromTagId(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })

  it('should handle an unknown tag type', () => {
    expect(() => tag.getTagTypeFromTagId('foo/bar')).toThrow()
  })
})

describe('getTagTypeFromLocation', () => {
  it('should get tag type from valid location', () => {
    const actual = tag.getTagTypeFromLocation({ pathname: '/foo/GEO' })
    expect(actual).toEqual('geo')
  })

  it('should throw an error for invalid location', () => {
    expect(() => tag.getTagTypeFromLocation({ pathname: '' })).toThrow()
  })
})

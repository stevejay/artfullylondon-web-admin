import * as entityLib from '_src/lib/entity'
import entityType from '_src/entities/entity-type'

describe('createEntityUrl', () => {
  const tests = [
    {
      args: {
        entityType: entityType.EVENT,
        id: 'foo/2016/bar'
      },
      expected: '/event/foo/2016/bar'
    },
    {
      args: {
        entityType: entityType.EVENT_SERIES,
        id: 'foo'
      },
      expected: '/event-series/foo'
    },
    {
      args: {
        entityType: entityType.TALENT,
        id: 'foo'
      },
      expected: '/talent/foo'
    },
    {
      args: {
        entityType: entityType.VENUE,
        id: 'foo'
      },
      expected: '/venue/foo'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = entityLib.createEntityUrl(
        test.args.entityType,
        test.args.id
      )
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createEntityEditUrl', () => {
  const tests = [
    {
      args: {
        entityType: entityType.EVENT,
        id: 'foo/2016/bar'
      },
      expected: '/event/edit/foo/2016/bar'
    },
    {
      args: {
        entityType: entityType.EVENT_SERIES,
        id: 'foo'
      },
      expected: '/event-series/edit/foo'
    },
    {
      args: {
        entityType: entityType.TALENT,
        id: 'foo'
      },
      expected: '/talent/edit/foo'
    },
    {
      args: {
        entityType: entityType.VENUE,
        id: 'foo'
      },
      expected: '/venue/edit/foo'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = entityLib.createEntityEditUrl(
        test.args.entityType,
        test.args.id
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('processDescription', () => {
  const tests = [
    {
      args: {
        description: null,
        credit: null
      },
      expected: '<p>We do not have a description.</p>'
    },
    {
      args: {
        description: '<p>A description.</p>',
        credit: null
      },
      expected: '<p>A description.</p>'
    },
    {
      args: {
        description: '<p>A description.</p>',
        credit: 'Some credit'
      },
      expected: '<p>A description.</p><p><em>(Description by Some credit.)</em></p>'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = entityLib.processDescription(
        test.args.description,
        test.args.credit
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('descriptionStringIsEmpty', () => {
  it('should handle a non-empty description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p> Some content   </p>')
    expect(actual).toEqual(false)
  })

  it('should handle an empty description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p></p>')
    expect(actual).toEqual(true)
  })

  it('should handle a whitespace-only description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p>      </p>')
    expect(actual).toEqual(true)
  })

  it('should handle a br-only description string', () => {
    const actual = entityLib.descriptionStringIsEmpty('<p><br /></p>')
    expect(actual).toEqual(true)
  })
})

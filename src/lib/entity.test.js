import * as entityLib from '_src/lib/entity'
import * as entityConstants from '_src/constants/entity'
import * as image from '_src/lib/image'

describe('getEntityTypeUrlParameter', () => {
  it('should get the parameter', () => {
    const match = { params: { entityType: 'Event' } }
    const result = entityLib.getEntityTypeUrlParameter(match)
    expect(result).toEqual('event')
  })
})

describe('getEntityCardImageDataForEntityType', () => {
  const tests = [
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_EVENT,
        image: '1234'
      },
      expected: {
        height: 175,
        url: '/1234'
      }
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_EVENT_SERIES,
        image: '1234'
      },
      expected: {
        height: 175,
        url: '/1234'
      }
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_TALENT,
        image: '1234'
      },
      expected: {
        height: 175,
        url: '/1234'
      }
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_VENUE,
        image: '1234'
      },
      expected: {
        height: 175,
        url: '/1234'
      }
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      image.createEntityCardImageUrl = jest
        .fn()
        .mockImplementation(id => `/${id}`)

      const actual = entityLib.getEntityCardImageDataForEntityType(
        test.args.entityType,
        test.args.image
      )

      expect(actual).toEqual(test.expected)
    })
  })

  it('should throw an error when getting data for an unknown entity type', () => {
    expect(() => {
      entityLib.getEntityCardImageDataForEntityType(
        'unknown-entity-type',
        '1234'
      )
    }).toThrow()
  })
})

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

describe('getColorForEntityType', () => {
  const tests = [
    {
      arg: entityConstants.ENTITY_TYPE_EVENT,
      expected: '#75CA18'
    },
    {
      arg: entityConstants.ENTITY_TYPE_EVENT_SERIES,
      expected: '#4990E2'
    },
    {
      arg: entityConstants.ENTITY_TYPE_TALENT,
      expected: '#FF632A'
    },
    {
      arg: entityConstants.ENTITY_TYPE_VENUE,
      expected: '#DB3b9C'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = entityLib.getColorForEntityType({ entityType: test.arg })
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createEntityUrl', () => {
  const tests = [
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_EVENT,
        id: 'foo/2016/bar'
      },
      expected: '/event/foo/2016/bar'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_EVENT_SERIES,
        id: 'foo'
      },
      expected: '/event-series/foo'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_TALENT,
        id: 'foo'
      },
      expected: '/talent/foo'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_VENUE,
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
        entityType: entityConstants.ENTITY_TYPE_EVENT,
        id: 'foo/2016/bar'
      },
      expected: '/event/edit/foo/2016/bar'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_EVENT_SERIES,
        id: 'foo'
      },
      expected: '/event-series/edit/foo'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_TALENT,
        id: 'foo'
      },
      expected: '/talent/edit/foo'
    },
    {
      args: {
        entityType: entityConstants.ENTITY_TYPE_VENUE,
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

describe('getValidStatuses', () => {
  const tests = [
    {
      it: 'should handle pending status',
      arg: entityConstants.PENDING_STATUS,
      expected: [
        {
          value: entityConstants.PENDING_STATUS,
          label: entityConstants.PENDING_STATUS
        },
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    },
    {
      it: 'should handle active status',
      arg: entityConstants.ACTIVE_STATUS,
      expected: [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    },
    {
      it: 'should handle deleted status',
      arg: entityConstants.DELETED_STATUS,
      expected: [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
        },
        {
          value: entityConstants.DELETED_STATUS,
          label: entityConstants.DELETED_STATUS
        }
      ]
    },
    {
      it: 'should handle merged status',
      arg: entityConstants.MERGED_STATUS,
      expected: [
        {
          value: entityConstants.MERGED_STATUS,
          label: entityConstants.MERGED_STATUS
        }
      ]
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = entityLib.getValidStatuses(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

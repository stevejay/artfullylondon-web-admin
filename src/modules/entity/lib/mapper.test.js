import RichTextEditor from 'react-rte'

import * as entityMapper from './mapper'
import statusType from '_src/domain/types/status-type'

describe('getRichTextInitialValue', () => {
  it('should handle an empty initial value', () => {
    const actual = entityMapper.getRichTextInitialValue()
    expect(actual).not.toEqual(null)
  })

  it('should handle a non-empty initial value', () => {
    const actual = entityMapper.getRichTextInitialValue('foo')
    expect(actual).not.toEqual(null)
  })
})

describe('mapSubmittedDescription', () => {
  it('should map a description', () => {
    const submitted = RichTextEditor.createValueFromString('<p>foo</p>', 'html')
    const actual = entityMapper.mapSubmittedDescription(submitted)
    expect(actual).toEqual('<p>foo</p>')
  })

  it('should map an empty description', () => {
    const submitted = RichTextEditor.createValueFromString('<p></p>', 'html')
    const actual = entityMapper.mapSubmittedDescription(submitted)
    expect(actual).toEqual(null)
  })

  it('should map a null description', () => {
    const actual = entityMapper.mapSubmittedDescription(null)
    expect(actual).toEqual(null)
  })
})

describe('getLinksInitialValue', () => {
  it('should handle a list of links', () => {
    const links = [{ type: linkType.WIKIPEDIA, url: 'http://some/url' }]

    const actual = entityMapper.getLinksInitialValue(links)

    expect(actual).toEqual([
      { key: linkType.WIKIPEDIA, type: linkType.WIKIPEDIA, url: 'http://some/url' }
    ])
  })

  it('should handle null links', () => {
    const actual = entityMapper.getLinksInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedLinks', () => {
  it('should handle a list of links', () => {
    const links = [
      { key: linkType.WIKIPEDIA, type: linkType.WIKIPEDIA, url: 'http://some/url' }
    ]

    const actual = entityMapper.mapSubmittedLinks(links)

    expect(actual).toEqual([{ type: linkType.WIKIPEDIA, url: 'http://some/url' }])
  })

  it('should handle empty links', () => {
    const actual = entityMapper.mapSubmittedLinks(null)
    expect(actual).toEqual([])
  })
})

describe('getImagesInitialValue', () => {
  it('should handle a list of images', () => {
    const links = [
      { id: '1111', copyright: 'Copyright', ratio: 2 },
      { id: '2222' }
    ]

    const actual = entityMapper.getImagesInitialValue(links)

    expect(actual).toEqual([
      {
        key: '1111',
        id: '1111',
        copyright: 'Copyright',
        previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg',
        isMain: true,
        ratio: 2
      },
      {
        key: '2222',
        id: '2222',
        previewUrl: 'https://images.test.com/22/22/2222/120x120.jpg',
        isMain: false
      }
    ])
  })

  it('should handle null images', () => {
    const actual = entityMapper.getImagesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedImages', () => {
  it('should handle a list of images', () => {
    const links = [
      {
        key: '2222',
        id: '2222',
        previewUrl: 'https://images.test.com/22/22/2222/120x120.jpg',
        isMain: false
      },
      {
        key: '1111',
        id: '1111',
        copyright: 'Copyright',
        previewUrl: 'https://images.test.com/11/11/1111/120x120.jpg',
        isMain: true,
        ratio: 2
      },
      {
        key: '3333',
        id: '3333',
        status: imageStatusType.PROCESSING
      }
    ]

    const actual = entityMapper.mapSubmittedImages(links)

    expect(actual).toEqual([
      { id: '1111', copyright: 'Copyright', ratio: 2 },
      { id: '2222' }
    ])
  })

  it('should handle empty images', () => {
    const actual = entityMapper.mapSubmittedImages(null)
    expect(actual).toEqual([])
  })
})

describe('getValidStatusesInitialValue', () => {
  const tests = [
    {
      it: 'should handle pending status',
      arg: statusType.PENDING,
      expected: [
        {
          value: statusType.PENDING,
          label: statusType.PENDING
        },
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    },
    {
      it: 'should handle active status',
      arg: statusType.ACTIVE,
      expected: [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    },
    {
      it: 'should handle deleted status',
      arg: statusType.DELETED,
      expected: [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        },
        {
          value: statusType.DELETED,
          label: statusType.DELETED
        }
      ]
    },
    {
      it: 'should handle merged status',
      arg: statusType.MERGED,
      expected: [
        {
          value: statusType.MERGED,
          label: statusType.MERGED
        }
      ]
    },
    {
      it: 'should handle not yet created status',
      arg: null,
      expected: [
        {
          value: statusType.ACTIVE,
          label: statusType.ACTIVE
        }
      ]
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = entityMapper.getValidStatusesInitialValue(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('mapSubmittedNamedClosures', () => {
  it('should handle a populated input', () => {
    const input = 'BoxingDay,NewYearsDay'
    const actual = entityMapper.mapSubmittedNamedClosures(input)
    expect(actual).toEqual(['BoxingDay', 'NewYearsDay'])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedNamedClosures(null)
    expect(actual).toEqual(null)
  })
})

describe('mapSubmittedPerformancesClosures', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01',
        date: '2018/01/01'
      },
      {
        key: '2018/02/02-18:00',
        date: '2018/02/02',
        at: '18:00'
      }
    ]

    const actual = entityMapper.mapSubmittedPerformancesClosures(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01'
      },
      {
        date: '2018/02/02',
        at: '18:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedPerformancesClosures(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedOpeningTimesClosures', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01',
        date: '2018/01/01'
      },
      {
        key: '2018/02/02-18:00-19:00',
        date: '2018/02/02',
        from: '18:00',
        to: '19:00'
      }
    ]

    const actual = entityMapper.mapSubmittedOpeningTimesClosures(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01'
      },
      {
        date: '2018/02/02',
        from: '18:00',
        to: '19:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedOpeningTimesClosures(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedSpecialPerformances', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01-18:00',
        date: '2018/01/01',
        at: '18:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      }
    ]

    const actual = entityMapper.mapSubmittedSpecialPerformances(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01',
        at: '18:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedSpecialPerformances(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedSpecialOpeningTimes', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01-18:00-19:00',
        date: '2018/01/01',
        from: '18:00',
        to: '19:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      },
      {
        key: '2018/01/01-20:00-21:00',
        date: '2018/01/01',
        from: '20:00',
        to: '21:00'
      }
    ]

    const actual = entityMapper.mapSubmittedSpecialOpeningTimes(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01',
        from: '18:00',
        to: '19:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      },
      {
        date: '2018/01/01',
        from: '20:00',
        to: '21:00',
        audienceTags: []
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedSpecialOpeningTimes(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedAdditionalPerformances', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01-18:00',
        date: '2018/01/01',
        at: '18:00'
      }
    ]

    const actual = entityMapper.mapSubmittedAdditionalPerformances(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01',
        at: '18:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedAdditionalPerformances(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedAdditionalOpeningTimes', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '2018/01/01-18:00-19:00',
        date: '2018/01/01',
        from: '18:00',
        to: '19:00'
      }
    ]

    const actual = entityMapper.mapSubmittedAdditionalOpeningTimes(input)

    expect(actual).toEqual([
      {
        date: '2018/01/01',
        from: '18:00',
        to: '19:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedAdditionalOpeningTimes(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedPerformances', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '0-18:00-times-range-id',
        day: '0',
        at: '18:00',
        timesRangeId: 'times-range-id'
      }
    ]

    const actual = entityMapper.mapSubmittedPerformances(input)

    expect(actual).toEqual([
      {
        day: 0,
        at: '18:00',
        timesRangeId: 'times-range-id'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedPerformances(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedOpeningTimes', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        key: '0-18:00-19:00-times-range-id',
        day: '0',
        from: '18:00',
        to: '19:00',
        timesRangeId: 'times-range-id'
      }
    ]

    const actual = entityMapper.mapSubmittedOpeningTimes(input)

    expect(actual).toEqual([
      {
        day: 0,
        from: '18:00',
        to: '19:00',
        timesRangeId: 'times-range-id'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.mapSubmittedOpeningTimes(null)
    expect(actual).toEqual([])
  })
})

describe('mapSubmittedTimesRanges', () => {
  it('should map a populated array', () => {
    const input = [
      {
        key: 'some-id',
        id: 'some-id',
        label: 'Some label',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      }
    ]

    const actual = entityMapper.mapSubmittedTimesRanges(input)

    expect(actual).toEqual([
      {
        id: 'some-id',
        label: 'Some label',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      }
    ])
  })

  it('should map no array', () => {
    const actual = entityMapper.mapSubmittedTimesRanges(null)
    expect(actual).toEqual([])
  })
})

describe('getPerformancesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        day: 0,
        at: '18:00',
        timesRangeId: 'times-range-id'
      }
    ]

    const actual = entityMapper.getPerformancesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '0-18:00-times-range-id',
        day: '0',
        at: '18:00',
        timesRangeId: 'times-range-id'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getPerformancesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getNamedClosuresInitialValue', () => {
  it('should handle a populated input', () => {
    const input = ['BoxingDay', 'NewYearsDay']

    const actual = entityMapper.getNamedClosuresInitialValue(input)

    expect(actual).toEqual('BoxingDay,NewYearsDay')
  })

  it('should handle no input', () => {
    const actual = entityMapper.getNamedClosuresInitialValue(null)
    expect(actual).toEqual('')
  })
})

describe('getPerformancesClosuresInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01'
      },
      {
        date: '2018/02/02',
        at: '18:00'
      }
    ]

    const actual = entityMapper.getPerformancesClosuresInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01',
        date: '2018/01/01'
      },
      {
        key: '2018/02/02-18:00',
        date: '2018/02/02',
        at: '18:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getPerformancesClosuresInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getOpeningTimesClosuresInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01'
      },
      {
        date: '2018/02/02',
        from: '18:00',
        to: '19:00'
      }
    ]

    const actual = entityMapper.getOpeningTimesClosuresInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01',
        date: '2018/01/01'
      },
      {
        key: '2018/02/02-18:00-19:00',
        date: '2018/02/02',
        from: '18:00',
        to: '19:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getOpeningTimesClosuresInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getClosuresInitialValue', () => {
  it('should handle a populated input', () => {
    const input = ['2018/01/01']

    const actual = entityMapper.getClosuresInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01',
        date: '2018/01/01'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getClosuresInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getSpecialPerformancesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01',
        at: '18:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      }
    ]

    const actual = entityMapper.getSpecialPerformancesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01-18:00',
        date: '2018/01/01',
        at: '18:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getSpecialPerformancesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getSpecialOpeningTimesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01',
        from: '18:00',
        to: '19:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      },
      {
        date: '2018/01/01',
        from: '20:00',
        to: '21:00'
      }
    ]

    const actual = entityMapper.getSpecialOpeningTimesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01-18:00-19:00',
        date: '2018/01/01',
        from: '18:00',
        to: '19:00',
        audienceTags: [{ id: 'audience/families', label: 'Families' }]
      },
      {
        key: '2018/01/01-20:00-21:00',
        date: '2018/01/01',
        from: '20:00',
        to: '21:00',
        audienceTags: []
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getSpecialOpeningTimesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getAdditionalPerformancesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01',
        at: '18:00'
      }
    ]

    const actual = entityMapper.getAdditionalPerformancesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01-18:00',
        date: '2018/01/01',
        at: '18:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getAdditionalPerformancesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getAdditionalOpeningTimesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        date: '2018/01/01',
        from: '18:00',
        to: '19:00'
      }
    ]

    const actual = entityMapper.getAdditionalOpeningTimesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '2018/01/01-18:00-19:00',
        date: '2018/01/01',
        from: '18:00',
        to: '19:00'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getAdditionalOpeningTimesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getOpeningTimesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        day: 0,
        from: '18:00',
        to: '19:00',
        timesRangeId: 'times-range-id'
      }
    ]

    const actual = entityMapper.getOpeningTimesInitialValue(input)

    expect(actual).toEqual([
      {
        key: '0-18:00-19:00-times-range-id',
        day: '0',
        from: '18:00',
        to: '19:00',
        timesRangeId: 'times-range-id'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getOpeningTimesInitialValue(null)
    expect(actual).toEqual([])
  })
})

describe('getTimesRangesInitialValue', () => {
  it('should handle a populated input', () => {
    const input = [
      {
        id: 'some-id',
        label: 'Some label',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      },
      {
        id: 'some-id',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      }
    ]

    const actual = entityMapper.getTimesRangesInitialValue(input)

    expect(actual).toEqual([
      {
        key: 'some-id',
        id: 'some-id',
        label: 'Some label',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      },
      {
        key: 'some-id',
        id: 'some-id',
        label: '',
        dateFrom: '2018/01/01',
        dateTo: '2018/02/02'
      }
    ])
  })

  it('should handle no input', () => {
    const actual = entityMapper.getTimesRangesInitialValue(null)
    expect(actual).toEqual([])
  })
})

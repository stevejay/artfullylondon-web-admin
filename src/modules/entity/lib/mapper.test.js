import RichTextEditor from 'react-rte'

import * as entityMapper from './mapper'
import * as entityConstants from '_src/constants/entity'

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
    const links = [{ type: 'Wikipedia', url: 'http://some/url' }]

    const actual = entityMapper.getLinksInitialValue(links)

    expect(actual).toEqual([
      { key: 'Wikipedia', type: 'Wikipedia', url: 'http://some/url' }
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
      { key: 'Wikipedia', type: 'Wikipedia', url: 'http://some/url' }
    ]

    const actual = entityMapper.mapSubmittedLinks(links)

    expect(actual).toEqual([{ type: 'Wikipedia', url: 'http://some/url' }])
  })

  it('should handle empty links', () => {
    const links = []
    const actual = entityMapper.mapSubmittedLinks(links)
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
        status: 'Processing'
      }
    ]

    const actual = entityMapper.mapSubmittedImages(links)

    expect(actual).toEqual([
      { id: '1111', copyright: 'Copyright', ratio: 2 },
      { id: '2222' }
    ])
  })

  it('should handle empty images', () => {
    const links = []
    const actual = entityMapper.mapSubmittedImages(links)
    expect(actual).toEqual([])
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
    },
    {
      it: 'should handle not yet created status',
      arg: null,
      expected: [
        {
          value: entityConstants.ACTIVE_STATUS,
          label: entityConstants.ACTIVE_STATUS
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

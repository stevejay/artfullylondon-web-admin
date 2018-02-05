import * as imageLib from '_src/lib/image'
import * as venueConstants from '_src/constants/venue'

describe('createPngIconUrl', () => {
  it('should create a url for a selected icon', () => {
    const actual = imageLib.createPngIconUrl('museum', true)
    expect(actual).toEqual('https://siteimages.test.com/museum-selected.png')
  })

  it('should create a url for an unselected icon', () => {
    const actual = imageLib.createPngIconUrl('museum', false)
    expect(actual).toEqual('https://siteimages.test.com/museum.png')
  })
})

describe('createVenueTypePngIconUrl', () => {
  const tests = [
    {
      it: 'should create url for selected theatre',
      args: {
        venueType: venueConstants.VENUE_TYPE_THEATRE,
        isSelected: true
      },
      expected: 'https://siteimages.test.com/theater-selected.png'
    },
    {
      it: 'should create url for unselected theatre',
      args: {
        venueType: venueConstants.VENUE_TYPE_THEATRE,
        isSelected: false
      },
      expected: 'https://siteimages.test.com/theater.png'
    },
    {
      it: 'should create url for selected museum',
      args: {
        venueType: venueConstants.VENUE_TYPE_MUSEUM,
        isSelected: true
      },
      expected: 'https://siteimages.test.com/museum-selected.png'
    },
    {
      it: 'should create url for unselected museum',
      args: {
        venueType: venueConstants.VENUE_TYPE_MUSEUM,
        isSelected: false
      },
      expected: 'https://siteimages.test.com/museum.png'
    },
    {
      it: 'should create url for selected art gallery',
      args: {
        venueType: venueConstants.VENUE_TYPE_ART_GALLERY,
        isSelected: true
      },
      expected: 'https://siteimages.test.com/artgallery-selected.png'
    },
    {
      it: 'should create url for unselected art gallery',
      args: {
        venueType: venueConstants.VENUE_TYPE_ART_GALLERY,
        isSelected: false
      },
      expected: 'https://siteimages.test.com/artgallery.png'
    },
    {
      it: 'should create url for selected other',
      args: {
        venueType: venueConstants.VENUE_TYPE_OTHER,
        isSelected: true
      },
      expected: 'https://siteimages.test.com/townhouse-selected.png'
    },
    {
      it: 'should create url for unselected other',
      args: {
        venueType: venueConstants.VENUE_TYPE_OTHER,
        isSelected: false
      },
      expected: 'https://siteimages.test.com/townhouse.png'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = imageLib.createVenueTypePngIconUrl(
        test.args.venueType,
        test.args.isSelected
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createEventTalentImageUrl', () => {
  it('should create an event talent image url', () => {
    const actual = imageLib.createEventTalentImageUrl('123456')
    expect(actual).toEqual('https://images.test.com/12/34/123456/120x120.jpg')
  })
})

describe('createPathsForImageCarousel', () => {
  it('should create the paths for an image in a carousel', () => {
    const actual = imageLib.createPathsForImageCarousel({
      id: '123456',
      ratio: 2,
      copyright: 'Almeida'
    })

    expect(actual).toEqual({
      original: 'https://images.test.com/12/34/123456/750x.jpg',
      ratio: 2,
      copyright: 'Almeida'
    })
  })
})

describe('createEntityPageImageUrl', () => {
  const tests = [
    {
      it: 'should create a square image url for a talent entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x500.jpg'
    },
    {
      it: 'should create a square image url for a venue entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x500.jpg'
    },
    {
      it: 'should create a square image url for an event entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x500.jpg'
    },
    {
      it: 'should create a square image url for an event series entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x500.jpg'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = imageLib.createEntityPageImageUrl(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createEntityEditPreviewImageUrl', () => {
  const tests = [
    {
      it: 'should create a square image url for a talent entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/120x120.jpg'
    },
    {
      it: 'should create a square image url for a venue entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/120x120.jpg'
    },
    {
      it: 'should create a square image url for an event entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/120x120.jpg'
    },
    {
      it: 'should create a square image url for an event series entity',
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/120x120.jpg'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = imageLib.createEntityEditPreviewImageUrl(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createEntityCardImageUrl', () => {
  const tests = [
    {
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x350.jpg'
    },
    {
      arg: null,
      expected: null
    },
    {
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x350.jpg'
    },
    {
      arg: null,
      expected: null
    },
    {
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x350.jpg'
    },
    {
      arg: null,
      expected: null
    },
    {
      arg: '123456',
      expected: 'https://images.test.com/12/34/123456/500x350.jpg'
    },
    {
      arg: null,
      expected: null
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = imageLib.createEntityCardImageUrl(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createHeroImageUrl', () => {
  it('should create a hero image url for mobile', () => {
    const actual = imageLib.createHeroImageUrl('museum', true)
    expect(actual).toEqual(
      'https://siteimages.test.com/hero-image/museum.mobile.jpg'
    )
  })

  it('should create a hero image url for desktop', () => {
    const actual = imageLib.createHeroImageUrl('museum', false)
    expect(actual).toEqual('https://siteimages.test.com/hero-image/museum.jpg')
  })
})

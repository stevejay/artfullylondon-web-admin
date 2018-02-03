import * as location from '_src/lib/location'

describe('convertGoogleMapBoundsToNSEWBounds', () => {
  it('should convert the bounds', () => {
    const googleMapBounds = {
      getNorthEast: () => ({ lat: () => 1, lng: () => 2 }),
      getSouthWest: () => ({ lat: () => 3, lng: () => 4 })
    }

    const actual = location.convertGoogleMapBoundsToNSEWBounds(googleMapBounds)
    expect(actual).toEqual({ north: 1, west: 4, south: 3, east: 2 })
  })
})

describe('convertGoogleMapPointToLatLngPoint', () => {
  it('should convert the point', () => {
    const googleMapPoint = { lat: () => 1, lng: () => 2 }
    const actual = location.convertGoogleMapPointToLatLngPoint(googleMapPoint)
    expect(actual).toEqual({ lat: 1, lng: 2 })
  })
})

describe('createGoogleMapLinkUrl', () => {
  it('should create the url', () => {
    const actual = location.createGoogleMapLinkUrl(1, 2, 14)
    expect(actual).toEqual('https://www.google.com/maps/place//@1,2,14z/')
  })
})

describe('convertGoogleMapZoomToInt', () => {
  it('should convert the zoom', () => {
    const actual = location.convertGoogleMapZoomToInt('14')
    expect(actual).toEqual(14)
  })
})

describe('pointIsInLondonArea', () => {
  const tests = [
    {
      arg: { lat: 51.507398, lng: -0.127675 },
      expected: true
    },
    {
      arg: { lat: 1, lng: -0.127675 },
      expected: false
    },
    {
      arg: { lat: 51.507398, lng: 22 },
      expected: false
    },
    {
      arg: { lat: 1, lng: 22 },
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = location.pointIsInLondonArea(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('secondBoundsIsContainedByFirstBounds', () => {
  const tests = [
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 55, south: 50, west: 0, east: 5 }
      },
      expected: true
    },
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 54, south: 51, west: 1, east: 4 }
      },
      expected: true
    },
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 60, south: 50, west: 0, east: 5 }
      },
      expected: false
    },
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 55, south: 45, west: 0, east: 5 }
      },
      expected: false
    },
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 55, south: 50, west: -1, east: 5 }
      },
      expected: false
    },
    {
      args: {
        first: { north: 55, south: 50, west: 0, east: 5 },
        second: { north: 55, south: 50, west: 0, east: 10 }
      },
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = location.secondBoundsIsContainedByFirstBounds(
        test.args.first,
        test.args.second
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('mergeBounds', () => {
  const tests = [
    {
      it: 'should use new bounds when existing is null',
      args: {
        existingBounds: null,
        newBounds: { north: 55, south: 50, west: 0, east: 5 }
      },
      expected: { north: 55, south: 50, west: 0, east: 5 }
    },
    {
      it: 'should deal with same bounds',
      args: {
        existingBounds: { north: 55, south: 50, west: 0, east: 5 },
        newBounds: { north: 55, south: 50, west: 0, east: 5 }
      },
      expected: { north: 55, south: 50, west: 0, east: 5 }
    },
    {
      it: 'should not alter bounds when new is within existing',
      args: {
        existingBounds: { north: 55, south: 50, west: 0, east: 5 },
        newBounds: { north: 54, south: 51, west: 1, east: 4 }
      },
      expected: { north: 55, south: 50, west: 0, east: 5 }
    },
    {
      it: 'should use new bounds when existing is contained in new',
      args: {
        existingBounds: { north: 55, south: 50, west: 0, east: 5 },
        newBounds: { north: 60, south: 45, west: -10, east: 10 }
      },
      expected: { north: 60, south: 45, west: -10, east: 10 }
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = location.mergeBounds(
        test.args.existingBounds,
        test.args.newBounds
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('isContainedBy', () => {
  const tests = [
    {
      it: 'should handle mergedBounds being null',
      args: {
        mergedBounds: null,
        bounds: { north: 55, south: 50, west: 0, east: 5 }
      },
      expected: false
    },
    {
      it: 'should deal with same bounds',
      args: {
        mergedBounds: { north: 55, south: 50, west: 0, east: 5 },
        bounds: { north: 55, south: 50, west: 0, east: 5 }
      },
      expected: true
    },
    {
      it: 'should handle bounds being in mergedBounds',
      args: {
        mergedBounds: { north: 55, south: 50, west: 0, east: 5 },
        bounds: { north: 54, south: 51, west: 1, east: 4 }
      },
      expected: true
    },
    {
      it: 'should handle bounds being partially in mergedBounds',
      args: {
        mergedBounds: { north: 55, south: 50, west: 0, east: 5 },
        bounds: { north: 60, south: 51, west: 1, east: 4 }
      },
      expected: false
    },
    {
      it: 'should handle bounds being larger than mergedBounds',
      args: {
        mergedBounds: { north: 55, south: 50, west: 0, east: 5 },
        bounds: { north: 60, south: 45, west: -10, east: 10 }
      },
      expected: false
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = location.isContainedBy(
        test.args.mergedBounds,
        test.args.bounds
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

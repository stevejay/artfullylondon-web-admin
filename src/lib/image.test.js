import * as imageLib from '_src/lib/image'

describe('createImageUrl', () => {
  it('should create an image url', () => {
    const actual = imageLib.createImageUrl('123456', '120x120')
    expect(actual).toEqual('https://images.test.com/12/34/123456/120x120.jpg')
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

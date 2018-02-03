import * as browserLib from '_src/lib/browser'
import * as browserConstants from '_src/constants/browser'

describe('calculateBrowserWidthType', () => {
  const tests = [
    {
      it: 'should handle a width below the threshold',
      arg: browserConstants.BROWSER_WIDTH_THRESHOLD - 1,
      expected: browserConstants.BROWSER_WIDTH_TYPE_NARROW
    },
    {
      it: 'should handle a width on the threshold',
      arg: browserConstants.BROWSER_WIDTH_THRESHOLD,
      expected: browserConstants.BROWSER_WIDTH_TYPE_WIDE
    },
    {
      it: 'should handle a width above the threshold',
      arg: browserConstants.BROWSER_WIDTH_THRESHOLD + 1,
      expected: browserConstants.BROWSER_WIDTH_TYPE_WIDE
    }
  ]

  tests.forEach(test => {
    it(test.it, () => {
      const actual = browserLib.calculateBrowserWidthType(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

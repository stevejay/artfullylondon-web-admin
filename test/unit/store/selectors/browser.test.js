import * as browserSelectors from '_src/store/selectors/browser'
import * as browserConstants from '_src/constants/browser'

describe('isWideBrowser', () => {
  it('should return false when is not wide', () => {
    const state = {
      browser: { widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW }
    }

    const result = browserSelectors.isWideBrowser(state)
    expect(result).toEqual(false)
  })

  it('should return true when is wide', () => {
    const state = {
      browser: { widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE }
    }

    const result = browserSelectors.isWideBrowser(state)
    expect(result).toEqual(true)
  })
})

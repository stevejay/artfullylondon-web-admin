import deepFreeze from 'deep-freeze'

import * as browserConstants from '_src/constants/browser'
import * as browserActions from '_src/store/actions/browser'
import browserReducer, { selectors } from '_src/store/reducers/browser'

it('should have the correct initial state', () => {
  const actual = browserReducer(undefined, {})

  expect(actual).toEqual({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE
  })
})

it('should handle updating the width type when the new width type is different', () => {
  const state = deepFreeze({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
  })

  const actual = browserReducer(
    state,
    browserActions.updateBrowserWidthType(
      browserConstants.BROWSER_WIDTH_TYPE_WIDE
    )
  )

  expect(actual).toEqual({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE
  })
})

it('should handle updating the width type when the new width type is not different', () => {
  const state = deepFreeze({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
  })

  const actual = browserReducer(
    state,
    browserActions.updateBrowserWidthType(
      browserConstants.BROWSER_WIDTH_TYPE_NARROW
    )
  )

  expect(actual).toEqual({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
  })
})

describe('selectors', () => {
  describe('isWideBrowser', () => {
    it('should return false when is not wide', () => {
      const state = {
        browser: { widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW }
      }

      const result = selectors.isWideBrowser(state)

      expect(result).toEqual(false)
    })

    it('should return true when is wide', () => {
      const state = {
        browser: { widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE }
      }

      const result = selectors.isWideBrowser(state)

      expect(result).toEqual(true)
    })
  })
})

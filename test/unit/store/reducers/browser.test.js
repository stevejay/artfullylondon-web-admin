import deepFreeze from 'deep-freeze'

import * as browserConstants from '_src/constants/browser'
import * as types from '_src/constants/browser'
import browserReducer from '_src/store/reducers/browser'

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

  const actual = browserReducer(state, {
    type: types.UPDATE_BROWSER_WIDTH_TYPE,
    payload: {
      widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE
    }
  })

  expect(actual).toEqual({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_WIDE
  })
})

it('should handle updating the width type when the new width type is not different', () => {
  const state = deepFreeze({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
  })

  const actual = browserReducer(state, {
    type: types.UPDATE_BROWSER_WIDTH_TYPE,
    payload: {
      widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
    }
  })

  expect(actual).toEqual({
    widthType: browserConstants.BROWSER_WIDTH_TYPE_NARROW
  })
})

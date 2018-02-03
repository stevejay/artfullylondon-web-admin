import { handleActions } from 'redux-actions'

import * as browserConstants from '_src/constants/browser'
import * as browserLib from '_src/lib/browser'
import { types } from '_src/store/actions/browser'

export const module = 'browser'

const initialState = {
  widthType: browserLib.calculateBrowserWidthType(
    browserLib.getWindowInnerWidth()
  )
}

export const reducer = handleActions(
  {
    [types.UPDATE_BROWSER_WIDTH_TYPE]: (state, action) => {
      const { widthType } = action.payload
      return widthType === state.widthType ? state : { ...state, widthType }
    }
  },
  initialState
)

export const selectors = {
  isWideBrowser: state =>
    state.widthType === browserConstants.BROWSER_WIDTH_TYPE_WIDE
}
